// BD.W-CONCENTRIC-RELIEF — the level-set topography evaluator (the SINGLE math source the
// WGSL + GLSL concentric shaders transcribe) + the finishing-layer oracle twins.
//
// concentric = liquid-grid with level-set contours. The field is a LOW-octave value-noise
// topography H(p) (clean nested loops — NOT high-freq speckle) sampled at the SAME cell-warped
// coordinate liquid-grid twists, plus the ω=√(g·k) breathing swell; the render extracts the
// level-set contours of H via the IQ gradient-free contour DE (`contourInk`, the KEPT
// extraction). The contour density tracks 1/|∇H| (bunched on steep ground — a topographic map),
// the wave flows the contours as it crosses, and the cursor bulges the topography toward/away
// the pointer. The warm-cream height ramp paints basins cool-cream, ridges warm-amber.
//
// THE SHARED BASIS. `heightField` / `waveSwell` / the cell-warp are the SAME `waveField` leaf
// liquid-grid splices — a tune lands ONCE and the two viz move together (the `proof:wave-field`
// round-trip binds the JS↔GLSL↔WGSL numeric identity). This module owns concentric's noise
// basis (`valueNoise`/`potentialFBM`) + the cursor-well + the level-set composition; the cell
// twist + the height field math live in the shared leaf.

import { waveFlow, cursorSwirl, heightField, waveSwell, type Vec2 } from "../../../../composables/glass/wave/waveField";
import { curlFBM } from "../../liquid-grid/composables/liquidGrid";

export type { Vec2 };

// The host noise basis fed to `heightField` — a single quintic-faded value-noise matching the
// shader's `valueNoise` EXACTLY (the round-trip single-math-source; the shader's heightField
// octave loop owns the fractal sum, so this is ONE octave).
function hash21(x: number, y: number): number {
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
    const lerp = (p: number, q: number, t: number): number => p + (q - p) * t;
    return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

/** The Hermite smoothstep the shader's `smoothstepEdge` uses — mirrored here so the JS oracle's
 *  cursor-heave term transcribes the WGSL/GLSL feathered Gaussian EXACTLY (the L6 parity). */
function smoothstepEdge(e0: number, e1: number, x: number): number {
    const t = Math.max(0, Math.min(1, (x - e0) / Math.max(e1 - e0, 1e-6)));
    return t * t * (3 - 2 * t);
}

/** The level-set sample params (the round-trip anchor; mirrors the shader uniforms). */
export interface LevelFieldParams {
    /** The traveling-wave front direction. */
    waveDir: Vec2;
    waveK: number;
    waveOmega: number;
    waveSigma: number;
    twistMax: number;
    shearMax: number;
    /** The spring-eased envelope amplitude (0..1; PRM → 0). */
    amp: number;
    /** The topography cell pitch (domain units per cell — the contour-warp granularity). */
    cellSize: number;
    /** LOW octaves → clean nested loops. */
    heightOctaves: number;
    heightSeed: number;
    /** The ω=√(g·k) breathing swell depth. */
    swellAmp: number;
    /** Per-contour wobble depth. */
    perturbAmp: number;
    /** The contour-level count. */
    levels: number;
    /** The cursor (domain space). */
    cursor: Vec2;
    /** The cursor Gaussian peak depth (the topography bulges under the pointer). */
    cursorWell: number;
    /** 1 = cursor on. */
    interactive: number;
}

/**
 * The warped level-set height at domain `p` and time `t` — the SINGLE math source. The
 * sampling coordinate is twisted by the SHARED `cellTwist` (the kinship with liquid-grid:
 * the same wave flows both); the height is a low-octave fbm topography + the swell; the cursor
 * adds a Gaussian peak. Returns the un-normalized height (the shader contours + tints it).
 */
export function sampleHeight(p: Vec2, t: number, q: LevelFieldParams): number {
    // The CONTINUOUS traveling-wave flow warp twists the sampling coordinate (the contours
    // flow/twist as the wave crosses — the SAME wave that twists the liquid-grid cells).
    let g = waveFlow(curlFBM, p, t, q.waveDir, q.waveK, q.waveOmega, q.waveSigma, q.twistMax, q.amp);
    if (q.interactive > 0.5) {
        g = cursorSwirl(g, q.cursor, q.cursorWell * 0.6, q.cellSize * 2.5);
    }
    // LOW base frequency → BROAD nested loops (a readable contour map). Octaves carry detail.
    let H = heightField(valueNoise, { x: g.x * 0.9, y: g.y * 0.9 }, q.heightOctaves, q.heightSeed);
    H += q.swellAmp * waveSwell(t, q.heightSeed);
    if (q.interactive > 0.5) {
        const dx = p.x - q.cursor.x;
        const dy = p.y - q.cursor.y;
        const d2 = dx * dx + dy * dy;
        // The cursor HEAVE — the feathered Gaussian bulge (a Gaussian peak × a smoothstep
        // falloff → C1-smooth, NOT a hard-edged quad). Transcribes the WGSL/GLSL sampleHeight
        // cursor term EXACTLY (the L6 numeric-parity source; the well depth carries the
        // engage envelope + velocity-heave scale, packed JS-side into q.cursorWell).
        const g0 = Math.exp(-d2 / 0.22);
        const fall = smoothstepEdge(0.0, 0.55, Math.exp(-d2 / 0.6));
        H += q.cursorWell * g0 * fall;
    }
    return H;
}

// ── The finishing-layer JS oracle twins (the numeric-parity source for the shaders) ──
//
// These transcribe the fragment's recomposed `main()` finishing reads so `proof:concentric`
// L6 (`assertParity`) can close JS↔WGSL↔GLSL ΔE ≈ 0 at the level-boundary lattice. They are
// PURE functions of the sampled height (no field-math change) — the shaders read the SAME
// `sampleHeight`, expand it through `tanh` tone, hillshade it at the SHARED `e`, and index it.

/** The SHARED hillshade finite-diff epsilon — pinned ONCE, consumed by both shaders + this
 *  oracle (challenge R8: a per-backend `e` drift would red L6). */
export const HILLSHADE_EPSILON = 0.012;

/** The hypsometric tone — expands the compressed height band so basins+ridges hit the ramp
 *  ENDS. `tone = 0.5 + 0.5·tanh(H·toneGain)`. Maps un-normalized H → [0,1] palette param. */
export function toneFromHeight(H: number, toneGain: number): number {
    return 0.5 + 0.5 * Math.tanh(H * toneGain);
}

/** The analytic hillshade at domain `p` — one ∇H finite-diff at the SHARED `e`, dotted with
 *  the fixed cel light → [0,1] (0.5 = flat). A read-only re-sample of `sampleHeight`. */
export function hillshade(
    p: Vec2,
    t: number,
    q: LevelFieldParams,
    lightDir: Vec2,
): number {
    const e = HILLSHADE_EPSILON;
    const hx = sampleHeight({ x: p.x + e, y: p.y }, t, q) - sampleHeight({ x: p.x - e, y: p.y }, t, q);
    const hy = sampleHeight({ x: p.x, y: p.y + e }, t, q) - sampleHeight({ x: p.x, y: p.y - e }, t, q);
    const gx = hx / (2 * e);
    const gy = hy / (2 * e);
    const gl = Math.hypot(gx, gy) + 1e-5;
    const ll = Math.hypot(lightDir.x, lightDir.y) + 1e-5;
    const dot = (gx / gl) * (lightDir.x / ll) + (gy / gl) * (lightDir.y / ll);
    return 0.5 + 0.5 * Math.max(-1, Math.min(1, dot));
}

/** The two-tier index test — a PURE `f(level)` (floor + mod + threshold), stateless, no
 *  buffer. Returns 1.0 on an index (every `indexEvery`th) level, else 0.0. */
export function isIndexLevel(fN: number, indexEvery: number): number {
    const lvl = Math.floor(fN);
    const m = lvl / indexEvery - Math.floor(lvl / indexEvery);
    return m < 0.5 / indexEvery ? 1.0 : 0.0;
}
