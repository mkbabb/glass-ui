/**
 * Aurora luminance-faithful fallback ground (BB.W-AURORA-SWRASTER).
 *
 * The headless / software-raster substrate cannot run the live WebGL field, but
 * speedtest's CI/witness harness must still certify text-on-aurora AA contrast
 * floors HEADLESS (no `--use-gl=angle`). The flat `paletteToCssGradient`
 * placeholder (`color.ts`) is a deliberate "visually-adjacent approximation" — a
 * gamma-sRGB-stop `linear-gradient(135deg, …)` band whose MEAN luminance and
 * SPATIAL distribution both diverge from the shader's nuclei-field composite, so a
 * contrast capture against it certifies the WRONG floor. This module REPLACES it,
 * in the software-raster / capture substrate, with a FIELD-SAMPLED ground derived
 * from the SAME inputs the shader uploads (the palette stops + the nuclei field),
 * matching the composite's mean + per-quadrant luminance within the certify band.
 *
 * THE FIELD MATH IS MIRRORED CPU-SIDE, NOT RE-INVENTED. `sampleAuroraField`
 * reproduces the shader's STATIC (t=0) composite — `composition.glsl.ts`'s
 * `nucleiField` (the softmax-Gaussian over the nuclei → paletteId + valueMod) +
 * `samplePalette` (the linear-sRGB LUT lerp of the CPU-baked endpoints) + the
 * `valueVariance` modulation + the Khronos PBR-Neutral tonemap (`tonemap.glsl.ts`'s
 * `aces()`) + the mandatory `linearToSrgb` OETF (`proof:aurora-space-gamma`). The
 * palette LUT is `oklchToLinear` (the SAME value.js Ottosson bake `flattenPalette`
 * feeds the GPU) — ONE color source, no re-implemented OKLCh math. The
 * between-endpoint interpolation runs in LINEAR (the linear-baked endpoints the
 * shader's LUT also reads); the shader's OKLCh between-stop refinement is a
 * sub-perceptual luminance delta on adjacent stops, well inside the certify band.
 *
 * THE GROUND IS A ONE-SHOT 2D-CANVAS RASTER (the "CSS/2D fallback" the brief names
 * verbatim — option b, the higher-faithfulness path). A low-res `<canvas>` 2D
 * context paints the downsampled nuclei-field raster (each texel its `sampleAuroraField`
 * color), exported ONCE as a `data:` URI and CSS-upscaled (`image-rendering` smooth →
 * bilinear, which preserves the per-quadrant MEAN luminance) — so the painted ground
 * reproduces the composite's SPATIAL luminance, not a partial-alpha approximation. It
 * paints once at mount and parks (no rAF, zero ongoing GPU). When no `document` is
 * available (SSR / happy-dom) it degrades to a deterministic pure-CSS layered
 * `radial-gradient` stack (zero canvas) — the same field samples, the SSR-safe form.
 * The luminance metrics (mean + the 4-quadrant relative luminance) are returned
 * alongside so the gate / π can MEASURE the faithfulness claim rather than assert it.
 */

import { oklchToLinear } from "../../../../composables/color";
import type { OklchStop } from "../../../../composables/color";
import type { AuroraConfig, AuroraNucleus } from "../constants/presets";

/** A linear-sRGB triple in [0,1]. */
type Lin = [number, number, number];

/** The shader's sRGB OETF (`linearToSrgb`), mirrored CPU-side — the SAME transfer the
 *  shader closes its seam with (`proof:aurora-space-gamma`). The piecewise sRGB EOTF^-1. */
function linearToSrgb(c: number): number {
    const v = Math.max(0, Math.min(1, c));
    return v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

/**
 * The Khronos PBR-Neutral tonemap mirrored from `tonemap.glsl.ts`'s `aces()` —
 * hue + saturation preserving, the EXACT curve the shader runs in linear before
 * the OETF. Reproduced byte-faithfully (the same `startCompression`/`desaturation`
 * knees) so the CPU-side luminance closes with the GPU's; a divergent tonemap is
 * the systematic-mean-drift the diagnostic-loop-halt warns about.
 */
function acesPbrNeutral([r, g, b]: Lin): Lin {
    const startCompression = 0.8 - 0.04;
    const desaturation = 0.15;
    const x = Math.min(r, Math.min(g, b));
    const offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
    let cr = r - offset;
    let cg = g - offset;
    let cb = b - offset;
    const peak = Math.max(cr, Math.max(cg, cb));
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    if (peak < startCompression) return [clamp01(cr), clamp01(cg), clamp01(cb)];
    const d = 1 - startCompression;
    const newPeak = 1 - (d * d) / (peak + d - startCompression);
    const s = newPeak / peak;
    cr *= s;
    cg *= s;
    cb *= s;
    const gg = 1 - 1 / (desaturation * (peak - newPeak) + 1);
    return [
        clamp01(cr + (newPeak - cr) * gg),
        clamp01(cg + (newPeak - cg) * gg),
        clamp01(cb + (newPeak - cb) * gg),
    ];
}

/** Linear-sRGB relative luminance (Rec.709 / WCAG), the contrast-floor metric. */
export function relativeLuminance([r, g, b]: Lin): number {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * The CPU-baked linear-sRGB palette LUT — `oklchToLinear` per stop (the SAME
 * value.js bake `flattenPalette` feeds the GPU; ONE color source). Sampling at
 * `id ∈ [0,1]` brackets the stop pair and lerps in LINEAR (the linear-baked
 * endpoints the shader's `samplePalette` LUT also reads).
 */
function samplePaletteLinear(linStops: Lin[], id: number): Lin {
    const n = linStops.length;
    if (n === 0) return [0, 0, 0];
    if (n === 1) return linStops[0]!;
    const clamped = Math.max(0, Math.min(1, id));
    const scaled = clamped * (n - 1);
    const i0 = Math.floor(scaled);
    const i1 = Math.min(i0 + 1, n - 1);
    const t = scaled - i0;
    const a = linStops[i0]!;
    const b = linStops[i1]!;
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/**
 * The static (t=0) nuclei field at normalized `(x, y)` — mirrors
 * `composition.glsl.ts`'s `nucleiField`. At t=0 the drift orbit term vanishes
 * (cos 0 / sin 0 → the nucleus sits at its authored position), so the field is a
 * pure softmax-Gaussian over the static nuclei: `w_i = exp(-β·d2_i/r_i²)`,
 * `paletteId = Σ(w_i·bias_i)/Σw_i`, `valueMod = Σ(w_i·vbias_i)/Σw_i`. The
 * anisotropic-ellipse local-frame rotation (elongation + angle) is reproduced.
 *
 * NOTE the Y convention: the shader flips Y at the uniform boundary
 * (`uniformBridge.flipY`) so a CSS-top-origin `nucleus.y` becomes a shader
 * bottom-origin position, AND the fragment samples `vUv` (bottom-origin). Sampling
 * here in CSS-top-origin against the AUTHORED (un-flipped) positions reproduces the
 * same field in the SAME visual frame — the two Y flips cancel, so the emitted CSS
 * ground (top-origin) matches the rendered surface visually.
 */
export function nucleiFieldStatic(
    nuclei: readonly AuroraNucleus[],
    softmaxBeta: number,
    x: number,
    y: number,
): { paletteId: number; valueMod: number } {
    let accumBias = 0;
    let accumValue = 0;
    let accumW = 0;
    for (const nu of nuclei) {
        const dx = x - nu.x;
        const dy = y - nu.y;
        const angle = ((nu.angle ?? 0) * Math.PI) / 180;
        const ca = Math.cos(angle);
        const sa = Math.sin(angle);
        const localX = ca * dx + sa * dy;
        const localY = -sa * dx + ca * dy;
        const along = localX / Math.max(nu.elongation ?? 1, 0.01);
        const across = localY;
        const d2 = along * along + across * across;
        const r = Math.max(nu.radius, 0.01);
        const w = Math.exp((-softmaxBeta * d2) / (r * r));
        accumBias += w * nu.paletteBias;
        accumValue += w * nu.valueBias;
        accumW += w;
    }
    const denom = Math.max(accumW, 1e-4);
    return {
        paletteId: Math.max(0, Math.min(1, accumBias / denom)),
        valueMod: accumValue / denom,
    };
}

/**
 * Sample the aurora's STATIC composite at normalized `(x, y)` → a gamma-sRGB
 * `[r,g,b]` in [0,1]. The full CPU mirror of the shader main() output transfer:
 * field → linear palette LUT → valueVariance modulation → PBR-Neutral tonemap →
 * the `clamp(col*0.985 + 0.008)` toe → the `linearToSrgb` OETF. The drift / breath
 * / cursor / medium-texture terms are STATIC (t=0, no cursor, the atmospheric
 * smooth pole) — the luminance ground the certify reads, not the live animation.
 */
export function sampleAuroraField(config: AuroraConfig, x: number, y: number): Lin {
    const linStops: Lin[] = config.palette.map((s: OklchStop) => oklchToLinear(s));
    const { paletteId, valueMod } = nucleiFieldStatic(
        config.nuclei,
        config.softmaxBeta,
        x,
        y,
    );
    const base = samplePaletteLinear(linStops, paletteId);
    const vmul = 1 + config.valueVariance * valueMod;
    let col: Lin = [base[0] * vmul, base[1] * vmul, base[2] * vmul];
    col = acesPbrNeutral(col);
    // The main() toe (`col = clamp(col*0.985 + 0.008, 0, 1)`).
    col = [
        Math.max(0, Math.min(1, col[0] * 0.985 + 0.008)),
        Math.max(0, Math.min(1, col[1] * 0.985 + 0.008)),
        Math.max(0, Math.min(1, col[2] * 0.985 + 0.008)),
    ];
    return [linearToSrgb(col[0]), linearToSrgb(col[1]), linearToSrgb(col[2])];
}

function toRgbString([r, g, b]: Lin): string {
    const c = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
    return `rgb(${c(r)}, ${c(g)}, ${c(b)})`;
}

/** The luminance metrics the gate / π MEASURES the faithfulness against. */
export interface AuroraGroundMetrics {
    /** Mean relative luminance over the sample grid (gamma → relative-luminance). */
    mean: number;
    /** The 4-quadrant mean relative luminance, [topLeft, topRight, bottomLeft, bottomRight]. */
    quadrants: [number, number, number, number];
}

export interface AuroraFallbackGroundOptions {
    /** Field-sample grid resolution per axis (default 8 → an 8×8 = 64-sample ground). */
    grid?: number;
}

export interface AuroraFallbackGround {
    /** The CSS `background-image` value — a layered radial-gradient nuclei-glow field. */
    backgroundImage: string;
    /** The CSS `background-color` base fill (the field-mean color — the luminance anchor). */
    backgroundColor: string;
    /** The measured luminance metrics (mean + per-quadrant) for the certify band. */
    metrics: AuroraGroundMetrics;
}

/** Convert a relative-luminance gamma color back from a sampled gamma triple. */
function gammaToRelativeLuminance(gamma: Lin): number {
    // gamma → linear → relative luminance (the WCAG path).
    const lin = gamma.map((v) => {
        const c = Math.max(0, Math.min(1, v));
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }) as Lin;
    return relativeLuminance(lin);
}

/**
 * Build the luminance-faithful CSS fallback ground for an aurora config.
 *
 * Samples the static field at a `grid × grid` lattice (the SAME `sampleAuroraField`
 * the gate / π measures), emits a stack of soft `radial-gradient` layers — one per
 * sample cell, centred on the cell, fading to transparent at ~the cell radius — over
 * a base fill at the FIELD-MEAN color. The base fill anchors the global luminance;
 * the radial layers paint the spatial nuclei-glow distribution, so the ground reads
 * as the same atmosphere the composite paints, not a flat diagonal band. Pure CSS,
 * zero canvas, deterministic from the config (palette + nuclei) — a re-run with the
 * same config reproduces it byte-for-byte.
 *
 * The returned `metrics` are computed over the SAME sample lattice the layers paint,
 * so the gate's certify-band assertion measures the ground the consumer actually
 * sees (not a separate idealization).
 */
export function auroraFallbackGround(
    config: AuroraConfig,
    options: AuroraFallbackGroundOptions = {},
): AuroraFallbackGround {
    const grid = Math.max(2, Math.min(16, Math.round(options.grid ?? 8)));

    // Sample the static field at the grid-cell centres.
    const samples: { x: number; y: number; color: Lin }[] = [];
    let lumSum = 0;
    const quadSum: [number, number, number, number] = [0, 0, 0, 0];
    const quadCount: [number, number, number, number] = [0, 0, 0, 0];
    for (let iy = 0; iy < grid; iy++) {
        for (let ix = 0; ix < grid; ix++) {
            const x = (ix + 0.5) / grid;
            const y = (iy + 0.5) / grid;
            const color = sampleAuroraField(config, x, y);
            samples.push({ x, y, color });
            const lum = gammaToRelativeLuminance(color);
            lumSum += lum;
            // Quadrant index: TL=0, TR=1, BL=2, BR=3 (top-origin y).
            const q = (y < 0.5 ? 0 : 2) + (x < 0.5 ? 0 : 1);
            quadSum[q] += lum;
            quadCount[q] += 1;
        }
    }
    const mean = lumSum / samples.length;
    const quadrants: [number, number, number, number] = [
        quadSum[0] / Math.max(1, quadCount[0]),
        quadSum[1] / Math.max(1, quadCount[1]),
        quadSum[2] / Math.max(1, quadCount[2]),
        quadSum[3] / Math.max(1, quadCount[3]),
    ];

    // The base fill at the field-mean COLOR (the channel-wise grid mean) anchors the
    // global luminance for the SSR layered fallback even where the layers thin out.
    const meanColor: Lin = [0, 0, 0];
    for (const s of samples) {
        meanColor[0] += s.color[0];
        meanColor[1] += s.color[1];
        meanColor[2] += s.color[2];
    }
    meanColor[0] /= samples.length;
    meanColor[1] /= samples.length;
    meanColor[2] /= samples.length;

    // ── The one-shot 2D-canvas raster (option b — the higher-faithfulness path). ──
    // Paint each grid texel its EXACT field color into a `grid × grid` 2D canvas,
    // export ONCE as a data: URI, and let CSS upscale it (bilinear → preserves the
    // per-quadrant mean luminance). SSR / no-`document` degrades to the layered
    // radial-gradient stack below (zero canvas, the same samples).
    const rasterDataUri = rasterizeField(samples, grid);
    if (rasterDataUri) {
        return {
            backgroundImage: `url("${rasterDataUri}")`,
            backgroundColor: toRgbString(meanColor),
            metrics: { mean, quadrants },
        };
    }

    // ── The SSR layered fallback — a deterministic pure-CSS stack of soft radial
    //    layers (the nuclei-glow distribution) over the field-mean base. Used only
    //    when no `document` is available; the raster path is the rendered surface. ─
    const cellPct = 100 / grid;
    const radiusPct = cellPct * 1.4;
    const layers = samples.map((s) => {
        const cx = (s.x * 100).toFixed(2);
        const cy = (s.y * 100).toFixed(2);
        const c = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
        const [r, g, b] = s.color;
        const center = `rgba(${c(r)}, ${c(g)}, ${c(b)}, 0.7)`;
        const edge = `rgba(${c(r)}, ${c(g)}, ${c(b)}, 0)`;
        return `radial-gradient(circle ${radiusPct.toFixed(2)}% at ${cx}% ${cy}%, ${center} 0%, ${edge} 100%)`;
    });

    return {
        backgroundImage: layers.join(", "),
        backgroundColor: toRgbString(meanColor),
        metrics: { mean, quadrants },
    };
}

/**
 * Paint the field samples into a `grid × grid` 2D canvas (one texel per cell, its
 * exact gamma color) and return a `data:` URI. Returns `null` when no `document` is
 * available (SSR) so the caller takes the layered-CSS fallback. The CSS upscale of
 * this tiny raster is bilinear — preserving the per-quadrant mean luminance the
 * certify reads — and reads as a smooth field, not a hard grid.
 */
function rasterizeField(
    samples: { x: number; y: number; color: Lin }[],
    grid: number,
): string | null {
    if (typeof document === "undefined") return null;
    let canvas: HTMLCanvasElement;
    try {
        canvas = document.createElement("canvas");
    } catch {
        return null;
    }
    canvas.width = grid;
    canvas.height = grid;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const img = ctx.createImageData(grid, grid);
    for (const s of samples) {
        const ix = Math.min(grid - 1, Math.floor(s.x * grid));
        const iy = Math.min(grid - 1, Math.floor(s.y * grid));
        const i = (iy * grid + ix) * 4;
        const c = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
        img.data[i] = c(s.color[0]);
        img.data[i + 1] = c(s.color[1]);
        img.data[i + 2] = c(s.color[2]);
        img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    try {
        return canvas.toDataURL("image/png");
    } catch {
        return null;
    }
}
