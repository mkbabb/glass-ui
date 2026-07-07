// BC.W-VIZ-PAPERGRID — the ONE math source (pure, node-testable) the WGSL primary +
// the WebGL2 GLSL fallback transcribe line-for-line.
//
// The liquid-grid is the composition of THREE cited techniques on the proven substrate
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
// THE AFFINE SHEET WARP (BG.W-GRID-AFFINE). The ripple is a SMOOTH continuous domain transform
// of the grid coordinate BEFORE the grid eval — `waveFlow` (the shared `waveField` leaf, the SAME
// warp concentric reads): a low-order curl-flow displacement gated by the traveling wave, locally
// affine at the cell scale (the warp Jacobian is ~constant across any one cell). So MAJOR
// gridlines BOW/SHEAR as ONE coherent transformation of the sheet — no per-cell seam, no
// per-pixel wobble (the retired per-cell `cellTwist` twisted each box about its own center → a
// kinked crest-band; `waveFlow` is the continuous twin). A leaf tune moves both viz (the DRY
// coupling recorded).
//
// THE SINGLE MATH SOURCE. The WGSL `fs_main` + the GLSL fragment transcribe `potentialFBM` /
// `gridCoverage` here + the SHARED `waveFlow` / `cellHeight` / `faceRelief` / `facePlateau` /
// `cursorSwirl` (the `waveField` leaf) EXACTLY; `proof:viz-papergrid` clause P3 round-trips
// JS↔WGSL↔GLSL at a FIXED `(uv, t, cursor, uvDeriv)` sample set. JS has no fragment derivatives,
// so the round-trip passes a FIXED `uvDeriv` into `gridCoverage`/`facePlateau` (the caller
// computes it analytically from the pitch) — the Golus + the face-plateau paths are reproducible.

import {
    waveFlow,
    cursorSwirl,
    cellHeight,
    faceRelief,
    facePlateau,
} from "../../../../composables/glass/wave/waveField";

/** A 2-vector. */
export interface Vec2 {
    x: number;
    y: number;
}

/** Two-pi. */
const TAU = Math.PI * 2;

/** The curl central-difference epsilon (matches `flow.glsl.ts` / `flow.wgsl.ts`). */
export const CURL_EPS = 0.012;

/**
 * BG.W-GRID-AFFINE — the liquid-grid curl-sampling spatial frequency (in CELL units).
 * `g0 = uv · gridScale` is CELL-scale (span ~14–40 cells), so the warp must sample the curl
 * potential at a frequency an ORDER OF MAGNITUDE below the grid frequency for the warp to be
 * locally affine at the cell scale — the sheet bows as ONE smooth curve (base wavelength 1/0.03 ≈
 * 33 cells), never the sub-cell crackle a cell-scale `~1` frequency produced. Concentric's own
 * `waveFlow` call passes the unit-scale `0.6` (its `p` is unit-scale). The shaders carry the same
 * `0.03` literal (the round-trip fence). NOT a config tunable — the affine-frequency FLOOR.
 */
export const LIQUID_GRID_WARP_FREQ = 0.03;

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

// ── §3/§4 RETIRED — the LINE-warp `curlWarp`, the radial `cursorBulge`, AND the per-cell
// `cellTwist` are GONE (clean break, no alias). The "liquid" is now the SMOOTH continuous
// AFFINE sheet warp (`waveFlow`) + the cursor SWIRL (`cursorSwirl`), both from the shared
// `waveField` leaf; `sampleLiquidGrid` composes them (BG.W-GRID-AFFINE: the sheet bows/shears
// as ONE coherent transform, major lines a single smooth curve, no per-cell kink).

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
 * The complete liquid-grid sample at a domain `uv` (the round-trip anchor). Composes the
 * warp + the bulge + the two-tier Golus coverage EXACTLY as the WGSL/GLSL `fs_main` does,
 * returning the premultiplied-alpha (the page reads through the troughs). `uvDeriv` is the
 * FIXED analytic per-axis derivative (JS has no fragment derivatives); the shaders compute
 * it from `dpdx`/`dpdy`. Returns `{ line, alpha }` — the line coverage + the global alpha.
 */
export interface LiquidGridSampleParams {
    /** The grid scale (view / minorPitch → LARGER cells = smaller scale). */
    gridScale: number;
    /** The traveling-wave front direction. */
    waveDir: Vec2;
    /** The crest-band spatial frequency. */
    waveK: number;
    /** The front speed (ω). */
    waveOmega: number;
    /** The crest-band width. */
    waveSigma: number;
    /** The affine sheet-warp displacement magnitude at the crest (grid units). */
    twistMax: number;
    /** The spring-eased envelope amplitude (0..1; PRM snaps to 0). */
    amp: number;
    /** The cursor in GRID space. */
    cursor: Vec2;
    /** The cursor-swirl peak twist (rad). */
    bulgeStrength: number;
    bulgeRadius: number;
    /** +1 repel, −1 attract (signs the swirl). */
    bulgeMode: number;
    /** 1 = cursor swirl on. */
    interactive: number;
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
    // ── The FACE (BD.W-PAPERGRID-FACE) — the height-lit filled cell interior ──────────────
    // OPTIONAL: a line-only caller (e.g. the parity capture) omits them → the face evaporates
    // (faceAlpha→0), line-identical. The live SFC path always supplies them from the config.
    /** The filled-FACE opacity (0 → the face evaporates → byte-identical to HEAD). */
    faceAlpha?: number;
    /** The slope-shade ∇H Lambert gain. */
    faceReliefGain?: number;
    /** The volume-preserving squash (the inset retreats at the crest). */
    squashK?: number;
    /** The base inset-square coverage. */
    baseInset?: number;
    /** The fixed cel key-light direction. */
    lightDir?: Vec2;
}

/** The face-shade scalars the FACE composite reads (the numeric-parity witness — FOLD B/C/D). */
export interface LiquidGridFace {
    /** The crest envelope at the pre-twist driver cc (FOLD A). */
    env: number;
    /** The sheet height at the driver cc (= env; the named leaf scalar). */
    h: number;
    /** The Lambert slope-shade [0,1] against the fixed key-light. */
    shade: number;
    /** The squashed inset-square face coverage [0,1]. */
    faceCov: number;
    /** The composited face alpha (FOLD D — face·faceAlpha·fieldAlpha, NO h-term). */
    faceA: number;
    /** The ramp parameter mix(shade, h) keying the multi-stop warm-divergent ink (FOLD B). */
    rampT: number;
}

export function sampleLiquidGrid(
    uv: Vec2,
    t: number,
    p: LiquidGridSampleParams,
): { line: number; alpha: number; face: LiquidGridFace } {
    const g0: Vec2 = { x: uv.x * p.gridScale, y: uv.y * p.gridScale };
    // BG.W-GRID-AFFINE — the AFFINE sheet warp: a SMOOTH continuous domain transform of the grid
    // coordinate BEFORE the grid eval (`waveFlow`, the SAME warp concentric reads). The low-order
    // curl-flow displacement is gated by the traveling wave + locally affine at the cell scale, so
    // the whole sheet bows/shears as ONE coherent transform — major lines a single smooth curve,
    // no per-cell seam (the retired `cellTwist` kinked at every cell boundary), no per-pixel wobble.
    let g = waveFlow(
        curlFBM,
        g0,
        t,
        p.waveDir,
        p.waveK,
        p.waveOmega,
        p.waveSigma,
        p.twistMax,
        p.amp,
        LIQUID_GRID_WARP_FREQ,
    );
    if (p.interactive > 0.5) {
        g = cursorSwirl(g, p.cursor, p.bulgeStrength * p.bulgeMode, p.bulgeRadius);
    }
    const minor = gridCoverage(g, p.targetWidth, p.uvDeriv);
    // The major tier evals at g/majorEvery with its own derivative scaling (Golus major).
    const me = Math.max(p.majorEvery, 1);
    const gMajor: Vec2 = { x: g.x / me, y: g.y / me };
    const dvMajor: Vec2 = { x: p.uvDeriv.x / me, y: p.uvDeriv.y / me };
    const major = gridCoverage(gMajor, p.targetWidthMajor, dvMajor);
    const line = Math.max(minor * p.minorAlpha, major * p.majorAlpha);

    // ── The FACE (BD.W-PAPERGRID-FACE) — height-lit filled cell interior ──────────────────
    // Sample height/relief at the WARPED-space cell center (`floor(g)+0.5`, the cell the fragment
    // actually lands in under the affine warp); Lambert the ∇H slope against the fixed cel
    // key-light; squash the inset (the crest face inflates); composite UNDER the line,
    // premultiplied over transparent. FOLD D: faceA = face·faceAlpha·fieldAlpha (NO h-term — the
    // SHADE carries brightness, the SQUASH carries inflation).
    // The face params default to the calm/off values (faceAlpha→0) so a line-only caller (the
    // parity capture passes only the line params) never NaN-poisons or throws — the face simply
    // evaporates, line-identical.
    const faceAlpha = p.faceAlpha ?? 0;
    const faceReliefGain = p.faceReliefGain ?? 0;
    const squashK = p.squashK ?? 0;
    const baseInset = p.baseInset ?? 0;
    const lightDir = p.lightDir ?? { x: 0.6, y: 0.8 };
    const cc: Vec2 = { x: Math.floor(g.x) + 0.5, y: Math.floor(g.y) + 0.5 };
    const h = cellHeight(cc, t, p.waveDir, p.waveK, p.waveOmega, p.waveSigma, p.amp);
    const grad = faceRelief(cc, 1.0, t, p.waveDir, p.waveK, p.waveOmega, p.waveSigma, p.amp);
    // n = normalize(-grad·gain, 1); shade = 0.5 + dot(n, normalize(light))·0.5.
    const nx = -grad.x * faceReliefGain;
    const ny = -grad.y * faceReliefGain;
    const nl = Math.hypot(nx, ny, 1);
    const ll = Math.hypot(lightDir.x, lightDir.y) || 1;
    const dotNL = (nx * lightDir.x + ny * lightDir.y) / (nl * ll);
    const shade = clamp(0.5 + dotNL * 0.5, 0, 1);
    const inset = baseInset * (1 - squashK * h); // squash & stretch
    const faceCov = facePlateau(g, inset, p.uvDeriv);
    const faceA = faceCov * faceAlpha * p.fieldAlpha; // FOLD D — one field-blend scalar
    const rampT = clamp(shade * 0.5 + h * 0.5, 0, 1); // FOLD B — height-keyed crest

    return {
        line,
        alpha: line * p.fieldAlpha,
        face: { env: h, h, shade, faceCov, faceA, rampT },
    };
}

/** The grid scale from the view + minor pitch (LARGER cells = smaller scale). */
export function gridScaleFor(viewExtentPx: number, minorPitchPx: number): number {
    return viewExtentPx / Math.max(minorPitchPx, 1);
}
