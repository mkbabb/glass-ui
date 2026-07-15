// BC.W-VIZ-CONSTELLATION — the JS-side render leaf: the palette/legibility read + the
// visual-size floor, relocated off the RETIRED Canvas2D `constellationDraw.ts` (the four
// `ctx`-bound draw passes are GONE — no `getContext("2d")` anywhere in the tree).
//
// The lattice now renders on `createGpuSubstrate` (WebGPU instanced-points + instanced-
// lines primary, the WebGL2 instanced-arrays twin fallback). The RASTERIZER moved to the
// GPU; the COLOR SOURCE stays JS — `readPalette` resolves the FULL `--constellation-*`
// legibility set off the canvas (node/node-dim/line/accent + the edge-alpha multipliers +
// the field-yields-to-type `--constellation-alpha` knob) and the render loop writes it into
// the uniform buffer, so a dark-mode flip + a consumer override re-tint the lattice via ONE
// color path. The tokens stay PLAIN-hsl per arm (the `:root`/`.dark` cascade carries two
// literals); the Canvas2D `light-dark()`-rejection that forced that is MOOT now the
// substrate is uniform-resolved, but the plain-hsl authoring stays the consumer-override
// seam (warm-cream identity default — `DEFAULT_PALETTE`, already correct, NO teal/navy).

import type { ConstellationField, ConstellationPalette } from "./constellationField";
import { DEFAULT_PALETTE, DEFAULT_K_FLOOR } from "./constants";

/** R5-8 — the visual-SIZE draw scale: `max(k, kFloor)`. The instanced disc/segment
 *  geometry sizes on this; positions/reach stay on TRUE `field.k`. Exported so a
 *  consumer skin floors its own marks on the same axis. */
export function kVisOf(field: ConstellationField): number {
    return Math.max(field.k, field.kFloor ?? DEFAULT_K_FLOOR);
}

// The neutral palette fallback lives in the feature-dir constants home; re-exported
// here for the package barrel path.
export { DEFAULT_PALETTE };

/**
 * Resolve the FULL neutral palette + legibility weights off a canvas's resolved custom
 * properties (the `--constellation-*` set). The colors AND the alpha multipliers route
 * through the same `getComputedStyle` probe, so a dark-mode flip re-resolves BOTH the
 * `:root`/`.dark` color arms AND the per-mode alpha defaults in one read. SSR-safe
 * (returns the warm-cream defaults with no `window`).
 */
export function readPalette(canvas: HTMLCanvasElement): ConstellationPalette {
    if (typeof window === "undefined") return { ...DEFAULT_PALETTE };
    const cs = getComputedStyle(canvas);
    const read = (name: string, fallback: string): string =>
        cs.getPropertyValue(name).trim() || fallback;
    const readNum = (name: string, fallback: number): number => {
        const raw = cs.getPropertyValue(name).trim();
        if (!raw) return fallback;
        const n = Number.parseFloat(raw);
        return Number.isFinite(n) ? n : fallback;
    };
    return {
        node: read("--constellation-node", DEFAULT_PALETTE.node),
        nodeDim: read("--constellation-node-dim", DEFAULT_PALETTE.nodeDim),
        line: read("--constellation-line", DEFAULT_PALETTE.line),
        edgeAlpha: readNum("--constellation-edge-alpha", DEFAULT_PALETTE.edgeAlpha),
        edgeFocusAlpha: readNum(
            "--constellation-edge-focus-alpha",
            DEFAULT_PALETTE.edgeFocusAlpha,
        ),
        alpha: readNum("--constellation-alpha", DEFAULT_PALETTE.alpha),
        accent: read("--constellation-accent", DEFAULT_PALETTE.accent),
        edgeFloor: readNum("--constellation-edge-floor", DEFAULT_PALETTE.edgeFloor),
        edgeAccentAlpha: readNum(
            "--constellation-edge-accent-alpha",
            DEFAULT_PALETTE.edgeAccentAlpha,
        ),
    };
}

/**
 * Parse a CSS color string (the `--constellation-*` hsl/hex literals the palette carries)
 * into a linear-ish premultiplied-ready RGBA in `[0,1]` for the GPU uniform write. A small
 * sRGB parser: it reads `#rgb`/`#rrggbb`/`#rrggbbaa`, `rgb()/rgba()`, and `hsl()/hsla()` —
 * the forms the `--constellation-*` token authoring uses (PLAIN-hsl per arm). The shader
 * outputs premultiplied alpha over the transparent clear, so the render loop multiplies the
 * `a` into the uniform color at upload (kept here so there is ONE color parse seam). Falls
 * back to opaque warm-ink on an unparseable value (never a NaN garbage write).
 */
export function parseColorRGBA(input: string): [number, number, number, number] {
    const s = (input || "").trim();
    // #rgb / #rrggbb / #rrggbbaa
    const hex = s.match(/^#([0-9a-fA-F]{3,8})$/);
    if (hex) {
        const h = hex[1];
        if (h.length === 3) {
            return [
                parseInt(h[0] + h[0], 16) / 255,
                parseInt(h[1] + h[1], 16) / 255,
                parseInt(h[2] + h[2], 16) / 255,
                1,
            ];
        }
        if (h.length === 6 || h.length === 8) {
            const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
            return [
                parseInt(h.slice(0, 2), 16) / 255,
                parseInt(h.slice(2, 4), 16) / 255,
                parseInt(h.slice(4, 6), 16) / 255,
                a,
            ];
        }
    }
    // rgb()/rgba()
    const rgb = s.match(
        /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/i,
    );
    if (rgb) {
        const a = rgb[4] != null ? parseAlpha(rgb[4]) : 1;
        return [
            clamp01(Number(rgb[1]) / 255),
            clamp01(Number(rgb[2]) / 255),
            clamp01(Number(rgb[3]) / 255),
            a,
        ];
    }
    // hsl()/hsla()
    const hsl = s.match(
        /^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)$/i,
    );
    if (hsl) {
        const a = hsl[4] != null ? parseAlpha(hsl[4]) : 1;
        const [r, g, b] = hslToRgb(Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100);
        return [r, g, b, a];
    }
    // Unparseable — opaque warm-ink (never a NaN write).
    return [0.11, 0.09, 0.08, 1];
}

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}
function parseAlpha(raw: string): number {
    return clamp01(raw.endsWith("%") ? Number(raw.slice(0, -1)) / 100 : Number(raw));
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    const hh = ((h % 360) + 360) % 360;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (hh < 60) [r, g, b] = [c, x, 0];
    else if (hh < 120) [r, g, b] = [x, c, 0];
    else if (hh < 180) [r, g, b] = [0, c, x];
    else if (hh < 240) [r, g, b] = [0, x, c];
    else if (hh < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return [clamp01(r + m), clamp01(g + m), clamp01(b + m)];
}
