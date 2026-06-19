// BC.W-VIZ-PAPERGRID — the ONE math source (pure, node-testable) the WGSL primary +
// the WebGL2 GLSL fallback transcribe line-for-line.
//
// The paper-grid is the composition of THREE cited techniques on the proven substrate
// (research/viz/paper-grid.md §3):
//   1. The Ben Golus derivative-AA grid distance function (the crisp-line fix — kills
//      the CSS sub-pixel blur). `gridCoverage` computes line coverage from the
//      screen-space DERIVATIVE of the (warped) UV, so a line is exactly N device-pixels
//      wide at ANY DPR/zoom (Ben Golus, *The Best Darn Grid Shader (Yet)*; Evan Wallace,
//      *Anti-Aliased Grid Shader*).
//   2. The Iñigo Quílez domain warp of the UV before the grid eval (the "liquid" fix).
//      The grid is computed at a WARPED coordinate g(uv) = uv + warp(uv,t) — the IQ
//      substitution f(p) → f(g(p)), g(p) = p + h(p) (iquilezles.org/articles/warp/).
//      Because h is a smooth LOW-frequency field, adjacent cells warp TOGETHER — the
//      whole sheet bows and flows (liquid), never a per-line jitter (noise).
//   3. The Bridson divergence-free curl flow driving the warp coherently (WHY it's
//      liquid not noise — `curlWarp` is the 2D curl of an fbm potential, area-preserving
//      by construction, so the grid folds + stretches like fluid advection rather than
//      the source-y bulge a raw fbm gradient produces).
//
// THE SINGLE MATH SOURCE. The WGSL `fs_main` + the GLSL fragment transcribe `potentialFBM`
// / `curlWarp` / `cursorBulge` / `gridCoverage` EXACTLY; `proof:viz-papergrid` clause P3
// round-trips JS↔WGSL↔GLSL at a FIXED `(uv, t, cursor, uvDeriv)` sample set. JS has no
// fragment derivatives, so the round-trip passes a FIXED `uvDeriv` into `gridCoverage` (the
// caller computes it analytically from the pitch) — the Golus path is then reproducible.

/** A 2-vector. */
export interface Vec2 {
    x: number;
    y: number;
}

/** Two-pi. */
const TAU = Math.PI * 2;

/** The curl central-difference epsilon (matches `flow.glsl.ts` / `flow.wgsl.ts`). */
export const CURL_EPS = 0.012;

// ── The host noise basis: a quintic-faded 2D value-noise fbm potential ────────────
// The SAME basis the dot-flow-field's `flowField.ts` carries (so the suite speaks ONE
// noise basis); the curl operator wraps it (basis-agnostic). The WGSL/GLSL transcribe
// `hash21` / `valueNoise` / `potentialFBM` line-for-line.

function hash21(x: number, y: number): number {
    // The blob-local 3D-p3 hash mirror (the WGSL `hash21`), so the JS noise basis
    // matches the kernel's exactly.
    let px = (x * 0.1031) % 1;
    let py = (y * 0.1031) % 1;
    let pz = (x * 0.1031) % 1;
    if (px < 0) px += 1;
    if (py < 0) py += 1;
    if (pz < 0) pz += 1;
    const d = px * (py + 33.33) + py * (pz + 33.33) + pz * (px + 33.33);
    px += d;
    py += d;
    pz += d;
    let v = ((px + py) * pz) % 1;
    if (v < 0) v += 1;
    return v;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/** Quintic-faded 2D value noise (matches the WGSL/GLSL `valueNoise`). */
function valueNoise(x: number, y: number): number {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    const a = hash21(ix, iy);
    const b = hash21(ix + 1, iy);
    const c = hash21(ix, iy + 1);
    const d = hash21(ix + 1, iy + 1);
    return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

/** A 3-octave scalar fbm potential (the host noise basis the curl operator wraps). */
export function potentialFBM(p: Vec2): number {
    let v = 0;
    let amp = 0.5;
    let freq = 1;
    let px = p.x;
    let py = p.y;
    for (let i = 0; i < 3; i++) {
        v += amp * valueNoise(px * freq, py * freq);
        // FBM_ROT mat2(0.8, 0.6, -0.6, 0.8) — same rotation as the shared chunk.
        const rx = 0.8 * px - 0.6 * py;
        const ry = 0.6 * px + 0.8 * py;
        px = rx;
        py = ry;
        freq *= 2.0;
        amp *= 0.5;
    }
    return v;
}

/** The 2D curl of the scalar fbm potential (the JS twin of `curlFBM`). */
export function curlFBM(p: Vec2): Vec2 {
    const dx = potentialFBM({ x: p.x + CURL_EPS, y: p.y }) - potentialFBM({ x: p.x - CURL_EPS, y: p.y });
    const dy = potentialFBM({ x: p.x, y: p.y + CURL_EPS }) - potentialFBM({ x: p.x, y: p.y - CURL_EPS });
    const gx = dx / (2 * CURL_EPS);
    const gy = dy / (2 * CURL_EPS);
    // ∇×ψ in 2D — rotate the gradient 90°: (∂ψ/∂y, −∂ψ/∂x).
    return { x: gy, y: -gx };
}

// ── §3 The "liquid": the global curl-flow domain warp ─────────────────────────────
/**
 * The IQ domain warp displacement at `g` (in grid space) at time `t`. TWO counter-flowing
 * curl terms at different scales/speeds (Alex Harri counter-flow — never visibly loops):
 *
 *   g += curlFBM(g·warpScale  + t·warpSpeed ) · amplitude
 *   g += curlFBM(g·warpScale2 − t·warpSpeed2) · (amplitude·0.5)
 *
 * Returns the warp DISPLACEMENT (the caller adds it onto `g`). A SHALLOW warp (one level,
 * LOW amplitude, LOW spatial frequency) keeps the lines a clearly-readable grid — the
 * inverse-coherence target (LARGE structures from LOW spatial frequency).
 */
export function curlWarp(
    g: Vec2,
    t: number,
    warpScale: number,
    warpSpeed: number,
    warpScale2: number,
    warpSpeed2: number,
    amplitude: number,
): Vec2 {
    const a = curlFBM({ x: g.x * warpScale + t * warpSpeed, y: g.y * warpScale + t * warpSpeed });
    const b = curlFBM({ x: g.x * warpScale2 - t * warpSpeed2, y: g.y * warpScale2 - t * warpSpeed2 });
    return {
        x: a.x * amplitude + b.x * amplitude * 0.5,
        y: a.y * amplitude + b.y * amplitude * 0.5,
    };
}

// ── §4 The pointer bulge: a LOCAL Gaussian warp added on top ───────────────────────
/**
 * The LOCAL cursor-bulge displacement at `g` (grid space). A Gaussian falloff about
 * `cursor` presses the grid AWAY from (repel, strength > 0) or TOWARD (attract, strength
 * < 0) the cursor inside `radius`, coherent everywhere else (the iOS-control-centre feel):
 *
 *   bulge = strength · exp(−d²/(2·radius²)); g += normalize(g−cursor) · bulge
 *
 * Returns the bulge DISPLACEMENT (the caller adds it onto `g`). The sign of `strength`
 * picks repel (+) vs attract (−).
 */
export function cursorBulge(g: Vec2, cursor: Vec2, strength: number, radius: number): Vec2 {
    const tx = g.x - cursor.x;
    const ty = g.y - cursor.y;
    const d = Math.hypot(tx, ty);
    const r = Math.max(radius, 1e-4);
    const bulge = strength * Math.exp(-(d * d) / (2 * r * r));
    if (d < 1e-5) return { x: 0, y: 0 };
    const inv = 1 / d;
    return { x: tx * inv * bulge, y: ty * inv * bulge };
}

// ── §1 The crisp line: Ben Golus derivative-AA grid coverage ──────────────────────
/**
 * A scalar smoothstep matching the GPU built-in EXACTLY — including the INVERTED-edge case
 * (`edge0 > edge1`) the Golus stroke relies on (`smoothstep(drawWidth+aa, drawWidth−aa, …)`
 * is high near a line). The span `edge1 − edge0` is used DIRECTLY (the GPU does no positive-
 * floor clamp; flooring it broke the inverted form to 0 — the round-trip-divergence bug). A
 * vanishing span guards against a div-by-zero only when the edges genuinely coincide.
 */
function smoothstep(edge0: number, edge1: number, x: number): number {
    const span = edge1 - edge0;
    const denom = Math.abs(span) < 1e-9 ? (span < 0 ? -1e-9 : 1e-9) : span;
    const t = Math.min(Math.max((x - edge0) / denom, 0), 1);
    return t * t * (3 - 2 * t);
}

function clamp(x: number, lo: number, hi: number): number {
    return Math.min(Math.max(x, lo), hi);
}

/**
 * The Ben Golus derivative-AA grid line coverage at `g` (grid space). `targetWidth` is the
 * desired line half-width in GRID UNITS (the caller passes `lineWidthPx / minorPitchPx` so
 * the line is N device-pixels wide); `uvDeriv` is the per-axis screen-space derivative of
 * `g` (in the shaders `length(vec2(dFdx(g), dFdy(g)))`; in JS the caller passes it
 * analytically so the path is reproducible). Returns line coverage [0..1].
 *
 * The Golus pipeline (transcribed by the WGSL/GLSL EXACTLY):
 *   gridUV   = 1 − |fract(g)·2 − 1|                 (triangle wave: 0 at line, 1 at center)
 *   drawW    = clamp(targetWidth, uvDeriv, 0.5)
 *   lineAA   = uvDeriv·1.5
 *   grid2    = smoothstep(drawW+lineAA, drawW−lineAA, gridUV)
 *   grid2   *= clamp(targetWidth/drawW, 0, 1)        (preserve thin-line intensity)
 *   grid2    = mix(grid2, targetWidth, clamp(uvDeriv·2−1, 0, 1))   (Moiré suppression)
 *   line     = max(grid2.x, grid2.y)
 */
export function gridCoverage(g: Vec2, targetWidth: number, uvDeriv: Vec2): number {
    // triangle wave per axis: 0 at a line, 1 at the cell center.
    const gridUVx = 1 - Math.abs((g.x - Math.floor(g.x)) * 2 - 1);
    const gridUVy = 1 - Math.abs((g.y - Math.floor(g.y)) * 2 - 1);
    const drawWx = clamp(targetWidth, uvDeriv.x, 0.5);
    const drawWy = clamp(targetWidth, uvDeriv.y, 0.5);
    const lineAAx = uvDeriv.x * 1.5;
    const lineAAy = uvDeriv.y * 1.5;
    // smoothstep with edge0 > edge1 (Golus) → a falling edge.
    let grid2x = smoothstep(drawWx + lineAAx, drawWx - lineAAx, gridUVx);
    let grid2y = smoothstep(drawWy + lineAAy, drawWy - lineAAy, gridUVy);
    // preserve thin-line intensity where the line is sub-`drawWidth`.
    grid2x *= clamp(targetWidth / Math.max(drawWx, 1e-6), 0, 1);
    grid2y *= clamp(targetWidth / Math.max(drawWy, 1e-6), 0, 1);
    // Moiré suppression: fade to the average where the cell packs tighter than a pixel.
    grid2x = lerp(grid2x, targetWidth, clamp(uvDeriv.x * 2 - 1, 0, 1));
    grid2y = lerp(grid2y, targetWidth, clamp(uvDeriv.y * 2 - 1, 0, 1));
    return Math.max(grid2x, grid2y);
}

// ── §5 The full per-pixel kernel (the JS round-trip anchor) ───────────────────────
/**
 * The complete paper-grid sample at a domain `uv` (the round-trip anchor). Composes the
 * warp + the bulge + the two-tier Golus coverage EXACTLY as the WGSL/GLSL `fs_main` does,
 * returning the premultiplied-alpha (the page reads through the troughs). `uvDeriv` is the
 * FIXED analytic per-axis derivative (JS has no fragment derivatives); the shaders compute
 * it from `dpdx`/`dpdy`. Returns `{ line, alpha }` — the line coverage + the global alpha.
 */
export interface PaperGridSampleParams {
    /** The grid scale (view / minorPitch → LARGER cells = smaller scale). */
    gridScale: number;
    warpScale: number;
    warpSpeed: number;
    warpScale2: number;
    warpSpeed2: number;
    amplitude: number;
    /** The cursor in GRID space. */
    cursor: Vec2;
    bulgeStrength: number;
    bulgeRadius: number;
    /** +1 repel, −1 attract. */
    bulgeMode: number;
    /** Golus target half-widths in grid units (minor + major). */
    targetWidth: number;
    targetWidthMajor: number;
    /** How many minor cells per major rule. */
    majorEvery: number;
    minorAlpha: number;
    majorAlpha: number;
    /** The GLOBAL subtlety knob (suffusion → tiny). */
    fieldAlpha: number;
    /** The FIXED per-axis derivative (the JS round-trip; shaders use dpdx/dpdy). */
    uvDeriv: Vec2;
}

export function samplePaperGrid(uv: Vec2, t: number, p: PaperGridSampleParams): { line: number; alpha: number } {
    let g: Vec2 = { x: uv.x * p.gridScale, y: uv.y * p.gridScale };
    const warp = curlWarp(g, t, p.warpScale, p.warpSpeed, p.warpScale2, p.warpSpeed2, p.amplitude);
    g = { x: g.x + warp.x, y: g.y + warp.y };
    const bulge = cursorBulge(g, p.cursor, p.bulgeStrength * p.bulgeMode, p.bulgeRadius);
    g = { x: g.x + bulge.x, y: g.y + bulge.y };
    const minor = gridCoverage(g, p.targetWidth, p.uvDeriv);
    // The major tier evals at g/majorEvery with its own derivative scaling (Golus major).
    const me = Math.max(p.majorEvery, 1);
    const gMajor: Vec2 = { x: g.x / me, y: g.y / me };
    const dvMajor: Vec2 = { x: p.uvDeriv.x / me, y: p.uvDeriv.y / me };
    const major = gridCoverage(gMajor, p.targetWidthMajor, dvMajor);
    const line = Math.max(minor * p.minorAlpha, major * p.majorAlpha);
    return { line, alpha: line * p.fieldAlpha };
}

/** The grid scale from the view + minor pitch (LARGER cells = smaller scale). */
export function gridScaleFor(viewExtentPx: number, minorPitchPx: number): number {
    return viewExtentPx / Math.max(minorPitchPx, 1);
}
