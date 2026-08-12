// Per-story viz-preview stills. Each substrate card rasterizes a characteristic
// generator, so preview identity follows the substrate rather than its category.
//
// THE ONE-GL BUDGET: every still is a device-free Canvas2D raster → `data:` URI
// (the `auroraFallbackGround` pattern — pure raster into a throwaway
// offscreen canvas, never a live substrate), so the landing adds ZERO WebGL/WebGPU
// contexts — a still is a parked frame, not a live context. Module-memoized: each
// route rasters its data-URI ONCE globally (not per card mount, per landing visit).
//
// A demo-private helper — NOT a library export.

import { makeHarmonicFigure, positionsAt } from "@glass/components/fourier-field";

/** The characteristic generator — DISTINCT per viz (a shared pattern → a shared still). */
export type VizPattern =
    | "nuclei"
    | "metaball"
    | "graph"
    | "epicycle"
    | "glass-plate"
    | "glass-ladder";

/** The frozen recipe a story's still rasters from — a DISTINCT (pattern,hue,seed) triple. */
export interface VizStillSpec {
    /** The characteristic generator (the viz's signature). Unique per story. */
    pattern: VizPattern;
    /** The warm signature hue (25–95, the warm-cream identity band — no teal/navy). */
    hue: number;
    /** The deterministic seed (the still is reproducible; distinct per story). */
    seed: number;
}

/**
 * The per-ROUTE registry — keyed on the full `/substrates/<id>` route so the
 * dispatch is per-STORY, never the per-category smear. Six entries (the surviving
 * substrate set), each a DISTINCT (pattern,hue,seed) triple, so
 * each card resolves a distinct still without relying on device rendering.
 */
export const VIZ_PREVIEW_STILLS: Readonly<Record<string, VizStillSpec>> = {
    "/substrates/aurora": { pattern: "nuclei", hue: 58, seed: 101 },
    "/substrates/blob": { pattern: "metaball", hue: 30, seed: 202 },
    "/substrates/constellation": { pattern: "graph", hue: 45, seed: 303 },
    "/substrates/fourier-field": { pattern: "epicycle", hue: 40, seed: 404 },
    "/substrates/glass-material": { pattern: "glass-plate", hue: 62, seed: 505 },
    "/substrates/glass-panel": { pattern: "glass-ladder", hue: 68, seed: 606 },
};

// ── the raster canvas (φ ratio ≈ 1.61 — the card preview aspect) ──
const W = 132;
const H = 82;

/** The warm-cream palette (legacy hsla — universally canvas-safe; no oklch dependence). */
const warm = (h: number, l: number, a = 1): string => `hsla(${h}, 48%, ${l}%, ${a})`;

/** The shared seeded PRNG (mulberry32 — the house prng leaf's algorithm). */
function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** The warm-cream floor every still paints over (the warm identity, never gray). */
function warmFloor(ctx: CanvasRenderingContext2D, hue: number): void {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, warm(hue + 8, 92));
    g.addColorStop(1, warm(hue - 6, 86));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
}

function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// ── the eleven characteristic generators — each recognizable by its viz's signature ──

/** aurora — soft warm nuclei blobs (the multi-nuclei composition). */
function drawNuclei(ctx: CanvasRenderingContext2D, hue: number, rng: () => number): void {
    warmFloor(ctx, hue);
    for (let i = 0; i < 6; i++) {
        const x = rng() * W;
        const y = rng() * H;
        const r = 18 + rng() * 30;
        const h = hue - 20 + rng() * 50;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, warm(h, 70, 0.55));
        g.addColorStop(1, warm(h, 70, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }
}

/** goo-blob — a merged metaball (body + two satellites), blurred so the necks weld. */
function drawMetaball(ctx: CanvasRenderingContext2D, hue: number, _rng: () => number): void {
    warmFloor(ctx, hue);
    const cx = W * 0.52;
    const cy = H * 0.55;
    const blobs: number[][] = [
        [cx, cy, 24],
        [cx + 26, cy - 12, 12],
        [cx - 22, cy + 12, 11],
    ];
    ctx.filter = "blur(3px)";
    for (const [x, y, r] of blobs) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = warm(hue, 58, 0.92);
        ctx.fill();
    }
    ctx.filter = "none";
    ctx.beginPath();
    ctx.arc(cx - 8, cy - 8, 6, 0, Math.PI * 2);
    ctx.fillStyle = warm(hue + 12, 82, 0.6);
    ctx.fill();
}

/** constellation — a scattered proximity graph (near nodes linked). */
function drawGraph(ctx: CanvasRenderingContext2D, hue: number, rng: () => number): void {
    warmFloor(ctx, hue);
    const N = 14;
    const pts: [number, number][] = [];
    for (let i = 0; i < N; i++) pts.push([8 + rng() * (W - 16), 8 + rng() * (H - 16)]);
    ctx.strokeStyle = warm(hue, 55, 0.35);
    ctx.lineWidth = 0.8;
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const dx = pts[i][0] - pts[j][0];
            const dy = pts[i][1] - pts[j][1];
            if (dx * dx + dy * dy < 34 * 34) {
                ctx.beginPath();
                ctx.moveTo(pts[i][0], pts[i][1]);
                ctx.lineTo(pts[j][0], pts[j][1]);
                ctx.stroke();
            }
        }
    }
    for (const [x, y] of pts) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = warm(hue + 6, 45, 0.9);
        ctx.fill();
    }
}

/**
 * fourier-field — the partial sum and one of its own orbits, drawn by the library's own
 * evaluator rather than a hand-rolled copy of it. The still and the live field therefore
 * cannot disagree about what the transform draws.
 */
function drawEpicycle(ctx: CanvasRenderingContext2D, hue: number, _rng: () => number): void {
    warmFloor(ctx, hue);
    const cx = W * 0.5;
    const cy = H * 0.5;
    const scale = 20;
    const spectrum = makeHarmonicFigure([
        { index: 1, mag: 1, phase: 0 },
        { index: 3, mag: 0.4, phase: 1.2 / (2 * Math.PI) },
        { index: 5, mag: 0.2, phase: 2.4 / (2 * Math.PI) },
    ]);
    ctx.strokeStyle = warm(hue, 50, 0.85);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
        const chain = positionsAt(spectrum, i / 200);
        const [x, y] = chain[chain.length - 1];
        const px = cx + x * scale;
        const py = cy + y * scale;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    // The first orbit, taken from the same chain the curve came from.
    ctx.strokeStyle = warm(hue, 60, 0.3);
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, spectrum[0].amplitude * scale, 0, Math.PI * 2);
    ctx.stroke();
}

/** glass-material — a single rounded glass plate + a specular streak over the warm field. */
function drawGlassPlate(ctx: CanvasRenderingContext2D, hue: number, rng: () => number): void {
    drawNuclei(ctx, hue, rng);
    const px = W * 0.2;
    const py = H * 0.24;
    const pw = W * 0.6;
    const ph = H * 0.52;
    roundRect(ctx, px, py, pw, ph, 10);
    ctx.fillStyle = warm(hue, 88, 0.35);
    ctx.fill();
    ctx.strokeStyle = warm(hue + 6, 96, 0.7);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.save();
    roundRect(ctx, px, py, pw, ph, 10);
    ctx.clip();
    ctx.strokeStyle = "hsla(0, 0%, 100%, 0.5)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(px - 4, py + ph * 0.7);
    ctx.lineTo(px + pw * 0.7, py - 4);
    ctx.stroke();
    ctx.restore();
}

/** glass-panel — the five-rung glass tier ladder (increasing opacity) over the field. */
function drawGlassLadder(ctx: CanvasRenderingContext2D, hue: number, rng: () => number): void {
    drawNuclei(ctx, hue, rng);
    const n = 5;
    const rung = (H - 16) / n;
    for (let i = 0; i < n; i++) {
        const y = 8 + i * rung;
        roundRect(ctx, 12, y, W - 24, rung - 3, 4);
        ctx.fillStyle = warm(hue, 86, 0.16 + i * 0.14);
        ctx.fill();
        ctx.strokeStyle = warm(hue + 6, 96, 0.4);
        ctx.lineWidth = 0.6;
        ctx.stroke();
    }
}

const GENERATORS: Record<
    VizPattern,
    (ctx: CanvasRenderingContext2D, hue: number, rng: () => number) => void
> = {
    nuclei: drawNuclei,
    metaball: drawMetaball,
    graph: drawGraph,
    epicycle: drawEpicycle,
    "glass-plate": drawGlassPlate,
    "glass-ladder": drawGlassLadder,
};

// Module-level memo — each route rasters its data-URI ONCE globally.
const cache = new Map<string, string | null>();

function render(spec: VizStillSpec): string | null {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    GENERATORS[spec.pattern](ctx, spec.hue, mulberry32(spec.seed));
    return canvas.toDataURL("image/png");
}

/**
 * The per-STORY still for a card's route (`/substrates/<id>`). Returns the parked
 * `data:` URI for a known viz story (memoized), or `null` for any other route (the
 * card then falls back to its `#preview` slot — the component-specimen path).
 */
export function vizPreviewStill(route: string): string | null {
    const spec = VIZ_PREVIEW_STILLS[route];
    if (!spec) return null;
    if (cache.has(route)) return cache.get(route) ?? null;
    const uri = render(spec);
    cache.set(route, uri);
    return uri;
}
