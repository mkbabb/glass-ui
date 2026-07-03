// vizPreviewStill — the per-STORY distinct viz-preview-still registry
// (BG.W-VIZ-PREVIEW-LIVE — D6 / WS5-01: the 11-identical-frozen-aurora-stills cure).
//
// THE DEFECT the /substrates bento carried: every card shared the ONE category
// `fieldStill` (SectionLanding derives a single aurora still per category and hands
// it to all 11 cards) — eleven IDENTICAL stills, the user's "not-live/all-the-same"
// defect. The cure is a per-STORY dispatch: each of the 11 substrates viz cards
// rasters its OWN recognizable still off a DISTINCT characteristic generator (the
// viz's signature math — the golden angle for the phyllotaxis dot-sphere, sum-of-
// sines for the fourier curve, a sum-of-inverse-squares SDF for the metaball, a
// curl-ish advection for the flow ribbons), so per-card pixel-hash differs BY
// CONSTRUCTION (7 leaf-signature / 2 SDF-approx / 2 glass-over-field — the item-5
// still decision).
//
// THE ONE-GL BUDGET (CLAUDE.md §BA.W-STAGE): every still is a device-free Canvas2D
// raster → `data:` URI (the shipped `auroraFallbackGround` pattern — pure raster
// into a THROWAWAY offscreen canvas, never a live substrate), so the landing adds
// ZERO WebGL/WebGPU contexts — a still is a parked frame, not a live context.
// Module-memoized: each route rasters its data-URI ONCE globally (proto2 #6 — not
// per card mount / per landing visit).
//
// A demo-private helper — NOT a library export.

/** The characteristic generator — DISTINCT per viz (a shared pattern → a shared still). */
export type VizPattern =
    | "nuclei"
    | "metaball"
    | "graph"
    | "epicycle"
    | "glass-plate"
    | "glass-ladder"
    | "flow"
    | "rings"
    | "warp-grid"
    | "phyllotaxis"
    | "dot-halftone";

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
 * dispatch is per-STORY, never the per-category smear. Eleven entries, each a
 * DISTINCT (pattern,hue,seed) triple, so `proof:viz`'s preview arm proves the
 * 11-cards-11-hashes bar device-free (two entries with the same triple RED).
 */
export const VIZ_PREVIEW_STILLS: Readonly<Record<string, VizStillSpec>> = {
    "/substrates/aurora": { pattern: "nuclei", hue: 58, seed: 101 },
    "/substrates/blob": { pattern: "metaball", hue: 30, seed: 202 },
    "/substrates/constellation": { pattern: "graph", hue: 45, seed: 303 },
    "/substrates/fourier-field": { pattern: "epicycle", hue: 40, seed: 404 },
    "/substrates/glass-material": { pattern: "glass-plate", hue: 62, seed: 505 },
    "/substrates/glass-panel": { pattern: "glass-ladder", hue: 68, seed: 606 },
    "/substrates/dot-flow-field": { pattern: "flow", hue: 50, seed: 707 },
    "/substrates/concentric": { pattern: "rings", hue: 35, seed: 808 },
    "/substrates/paper-grid": { pattern: "warp-grid", hue: 72, seed: 909 },
    "/substrates/dot-matrix": { pattern: "phyllotaxis", hue: 55, seed: 110 },
    "/substrates/goo-dot": { pattern: "dot-halftone", hue: 38, seed: 121 },
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

/** fourier-field — a partial-sum harmonic curve + one epicycle circle. */
function drawEpicycle(ctx: CanvasRenderingContext2D, hue: number, _rng: () => number): void {
    warmFloor(ctx, hue);
    const cx = W * 0.5;
    const cy = H * 0.5;
    const harm: number[][] = [
        [1, 20, 0],
        [3, 8, 1.2],
        [5, 4, 2.4],
    ];
    ctx.strokeStyle = warm(hue, 50, 0.85);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    let first = true;
    for (let t = 0; t <= 1.0001; t += 0.005) {
        let x = cx;
        let y = cy;
        for (const [k, amp, ph] of harm) {
            x += amp * Math.cos(2 * Math.PI * k * t + ph);
            y += amp * Math.sin(2 * Math.PI * k * t + ph);
        }
        if (first) {
            ctx.moveTo(x, y);
            first = false;
        } else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = warm(hue, 60, 0.3);
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
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

/** dot-flow-field — advected dotted ribbons through a curl-ish sin/cos field. */
function drawFlow(ctx: CanvasRenderingContext2D, hue: number, rng: () => number): void {
    warmFloor(ctx, hue);
    const lines = 20;
    for (let l = 0; l < lines; l++) {
        let x = rng() * W;
        let y = rng() * H;
        for (let s = 0; s < 26; s++) {
            const vx = Math.cos(y * 0.09 + x * 0.02) + 0.4;
            const vy = Math.sin(x * 0.08 - y * 0.015);
            x += vx * 2.2;
            y += vy * 2.2;
            const a = 1 - s / 26;
            ctx.fillStyle = warm(hue, 55, a * 0.7);
            ctx.fillRect(x, y, 1.6, 1.6);
        }
    }
}

/** concentric — warped concentric interference rings (the level-set survey). */
function drawRings(ctx: CanvasRenderingContext2D, hue: number, rng: () => number): void {
    warmFloor(ctx, hue);
    const cx = W * 0.5 + (rng() - 0.5) * 10;
    const cy = H * 0.5;
    for (let r = 4; r < W * 0.7; r += 5) {
        const warp = Math.sin(r * 0.28) * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r + warp, 0, Math.PI * 2);
        ctx.strokeStyle = warm(hue, 40 + (r % 15), 0.5);
        ctx.lineWidth = 1.1;
        ctx.stroke();
    }
}

/** paper-grid — a curl-warped grid (the cells twist toward the crest). */
function drawWarpGrid(ctx: CanvasRenderingContext2D, hue: number, _rng: () => number): void {
    warmFloor(ctx, hue);
    ctx.strokeStyle = warm(hue, 45, 0.5);
    ctx.lineWidth = 0.8;
    const step = 11;
    const cx = W * 0.55;
    const cy = H * 0.5;
    const warp = (x: number, y: number): [number, number] => {
        const dx = x - cx;
        const dy = y - cy;
        const d = Math.hypot(dx, dy);
        const w = Math.exp((-d * d) / 900) * 9;
        return [x + (dy / (d + 1)) * w, y - (dx / (d + 1)) * w];
    };
    for (let x = 0; x <= W; x += step) {
        ctx.beginPath();
        let first = true;
        for (let y = 0; y <= H; y += 2) {
            const [wx, wy] = warp(x, y);
            if (first) {
                ctx.moveTo(wx, wy);
                first = false;
            } else ctx.lineTo(wx, wy);
        }
        ctx.stroke();
    }
    for (let y = 0; y <= H; y += step) {
        ctx.beginPath();
        let first = true;
        for (let x = 0; x <= W; x += 2) {
            const [wx, wy] = warp(x, y);
            if (first) {
                ctx.moveTo(wx, wy);
                first = false;
            } else ctx.lineTo(wx, wy);
        }
        ctx.stroke();
    }
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** dot-matrix — the Fibonacci phyllotaxis dot-SPHERE (golden angle, depth-shaded). */
function drawPhyllotaxis(ctx: CanvasRenderingContext2D, hue: number, _rng: () => number): void {
    warmFloor(ctx, hue);
    const cx = W * 0.5;
    const cy = H * 0.5;
    const R = Math.min(W, H) * 0.42;
    const N = 150;
    for (let i = 0; i < N; i++) {
        const sy = 1 - (i / (N - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - sy * sy));
        const th = GOLDEN_ANGLE * i;
        const sx = Math.cos(th) * ring;
        const sz = Math.sin(th) * ring;
        const facing = (sz + 1) / 2;
        const px = cx + sx * R;
        const py = cy - sy * R;
        const size = 0.6 + 1.4 * facing;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = warm(hue, 55 + 20 * facing, 0.15 + 0.8 * facing);
        ctx.fill();
    }
}

/** goo-dot — the metaball field drawn as a DOT MATRIX (dot size tracks the SDF). */
function drawDotHalftone(ctx: CanvasRenderingContext2D, hue: number, _rng: () => number): void {
    warmFloor(ctx, hue);
    const cx = W * 0.52;
    const cy = H * 0.55;
    const balls: number[][] = [
        [cx, cy, 22],
        [cx + 24, cy - 10, 11],
        [cx - 20, cy + 11, 10],
    ];
    const step = 6;
    for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
            let f = 0;
            for (const [bx, by, br] of balls) {
                const dx = x - bx;
                const dy = y - by;
                f += (br * br) / (dx * dx + dy * dy + 1);
            }
            const v = Math.min(1, f);
            if (v > 0.12) {
                ctx.beginPath();
                ctx.arc(x, y, 0.6 + v * 2.4, 0, Math.PI * 2);
                ctx.fillStyle = warm(hue, 50, 0.25 + v * 0.65);
                ctx.fill();
            }
        }
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
    flow: drawFlow,
    rings: drawRings,
    "warp-grid": drawWarpGrid,
    phyllotaxis: drawPhyllotaxis,
    "dot-halftone": drawDotHalftone,
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
