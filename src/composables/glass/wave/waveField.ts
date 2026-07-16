// the shared traveling-wave CELL-WARP leaf (the JS evaluator).
//
// paper-grid + concentric are ONE mechanism, two renders: a traveling-wave-gated
// CELL-LOCAL coordinate deformation (NOT a uniform line-displacement) + the shared
// curl-flow direction field. The user names the shared basis three times ("the SAME
// wave-based math", "function as essentially the paper grid", "level set, gradient
// topology"). This leaf owns the basis-agnostic math so a tune lands ONCE and the two
// viz move together; the `flow.{glsl,wgsl}.ts` precedent extended to a wave chunk.
//
// THE CARDINAL DISTINCTION (the C3 root-cause cure). The shipped warp displaces the
// coordinate UNIFORMLY (`g = uv + h(uv,t)`, h LOW-freq → the local deformation gradient
// F = I + ∂h/∂uv ≈ I → the cell translates rigidly → the LINES bow). The cure makes the
// local Jacobian DEPART from identity at the CELL scale by applying a per-cell affine
// rotation/shear about each cell's own center: the box stays in place but TWISTS as a
// traveling Gaussian crest sweeps over it. This is the deformation-gradient model — the
// local distortion is the GRADIENT of the displacement field, not the displacement.
//
// THE SINGLE MATH SOURCE. `cellTwist`, `travelingEnvelope`, `curlScalar`, `heightField`
// below are transcribed line-for-line into `waveField.glsl.ts` + `waveField.wgsl.ts`; the
// host shaders splice those chunks. The leaf imports NO value.js, declares no uniforms — a
// pure JS twin + two pure string chunks. It SPLICES the existing `curlFBM` (does not re-fork
// the curl operator — `curlFBM` stays the ONE curl source per backend).

/** A 2-vector. */
export interface Vec2 {
    x: number;
    y: number;
}

/** Two-pi. */
const TAU = Math.PI * 2;

/**
 * The directed-twist magnitude FLOOR (the visibility cure — shared across JS↔GLSL↔WGSL).
 * The curl scalar alone sits ~|0.3|, damping the crest twist to a whisper; a cell in the
 * crest band always rotates at least this fraction of `twistMax` so the wave READS.
 */
export const TWIST_FLOOR = 0.62;

function clamp(x: number, lo: number, hi: number): number {
    return Math.min(Math.max(x, lo), hi);
}

// ── The traveling-wave envelope ────────────────────────────────────────────────
/**
 * A moving Gaussian crest band sweeping along `waveDir` at angular speed `waveOmega`.
 * Returns the envelope in [0,1]: ~0 where the wave has NOT reached, ~1 at the crest,
 * relaxing back to ~0 behind it. `coord` is the wave phase at a point; `crest` wraps it
 * to a single 0..1 cycle and `env` is the Gaussian about the cycle midpoint. The crest
 * "passes OVER and THROUGH" the field — the cells are calm ahead, twist HARD at the
 * crest, relax behind.
 */
export function travelingEnvelope(
    pivot: Vec2,
    t: number,
    waveDir: Vec2,
    waveK: number,
    waveOmega: number,
    waveSigma: number,
): number {
    const coord = (pivot.x * waveDir.x + pivot.y * waveDir.y) * waveK - t * waveOmega;
    let crest = coord / TAU;
    crest = crest - Math.floor(crest); // fract → 0..1 along the wave
    const z = (crest - 0.5) * 2.0;
    return Math.exp(-(z * z) / Math.max(waveSigma, 1e-3));
}

// ── The curl-direction scalar (the twist director) ─────────────────────────────
/**
 * The curl-noise vorticity read at the cell center — a smooth low-frequency scalar in
 * roughly [-1,1] that DIRECTS the per-cell twist so adjacent cells lean TOGETHER (a
 * flowing read, never per-cell noise). The host supplies `curlFn(p) -> Vec2` (the shared
 * divergence-free curl of its own noise basis); this takes the x-component as the signed
 * director and folds a slow time drift so the flow itself evolves. Basis-agnostic.
 */
export function curlScalar(curlFn: (p: Vec2) => Vec2, cc: Vec2, t: number): number {
    const f = curlFn({ x: cc.x * 0.5 + t * 0.08, y: cc.y * 0.5 - t * 0.06 });
    return clamp(f.x, -1.0, 1.0);
}

// ── The directed-twist FLOOR (the visibility cure) ──────────────────────────────
/**
 * The per-cell rotational director with a magnitude FLOOR — the curl scalar alone sits
 * around |0.3| in practice, damping the crest twist to a whisper. This keeps the curl's
 * SIGN (so adjacent cells still lean together, the flowing read) but floors the magnitude
 * so a cell in the crest band ALWAYS rotates decisively (`sign(s)·max(floor, |s|)`). The
 * sign is softened near zero so the lean direction does not snap discontinuously across a
 * curl zero-crossing. Returns a director in roughly [-1,1].
 */
function directedTwist(s: number, floor: number): number {
    const mag = Math.max(floor, Math.abs(s));
    // soften the sign across the zero-crossing so neighbours don't flip hard.
    const sign = Math.tanh(s * 6.0);
    return sign * mag;
}

// ── The pre-twist driver (FOLD A — the cell pivot + envelope the twist AND the face ride) ──
/** The cell pivot `cc` + the spring-eased crest envelope `env` a cell rides. */
export interface CellDriver {
    /** The PRE-twist cell center (the per-cell pivot the twist rotates about). */
    cc: Vec2;
    /** The traveling-Gaussian crest envelope × amp at that pivot ([0,1] · amp). */
    env: number;
}

/**
 * The pre-twist driver for the grid coordinate `g`: floor `g` to its cell, return that cell's
 * center `cc` + the traveling-wave crest envelope `env` evaluated AT that center (= `cellHeight`,
 * so there is provably ONE envelope). FOLD A: the face must sample its height/relief at THIS
 * pre-twist `cc`, NOT at `floor(twisted_g)` (the crest twist crosses the cell boundary → the
 * face would light a NEIGHBOUR cell). `cellTwist` rides the SAME driver, so twist and face fuse.
 */
export function cellDriver(
    g: Vec2,
    cellSize: number,
    t: number,
    waveDir: Vec2,
    waveK: number,
    waveOmega: number,
    waveSigma: number,
    amp: number,
): CellDriver {
    const cs = Math.max(cellSize, 1e-3);
    const cellX = Math.floor(g.x / cs);
    const cellY = Math.floor(g.y / cs);
    const cc: Vec2 = { x: (cellX + 0.5) * cs, y: (cellY + 0.5) * cs };
    const env = cellHeight(cc, t, waveDir, waveK, waveOmega, waveSigma, amp);
    return { cc, env };
}

// ── The cell-local twist operator (the binding math) ───────────────────────────
/**
 * Twist the grid coordinate `g` about its OWN cell center, gated by the traveling wave
 * and directed by the curl flow. The pivot is the cell center (a per-cell constant) so the
 * box rotates about its middle — the cell stays in place but TWISTS (a windmill of warped
 * boxes where the crest passes; calm square cells elsewhere). `amp` is the spring-eased
 * envelope amplitude the JS host drives (the liquid-weight inertia). Returns the twisted
 * coordinate (still in grid space; the host evaluates its extraction at it).
 *
 * FOLD C — the `TWIST_FLOOR` is CREST-GATED: the floor is multiplied by the crest envelope so
 * OFF-crest cells relax to near-flat (calm paper) and only the crest band crinkles. Without
 * this every cell crinkles regardless of the wave (static foil, no traveling read).
 */
export function cellTwist(
    curlFn: (p: Vec2) => Vec2,
    g: Vec2,
    cellSize: number,
    t: number,
    waveDir: Vec2,
    waveK: number,
    waveOmega: number,
    waveSigma: number,
    twistMax: number,
    shearMax: number,
    amp: number,
): Vec2 {
    const { cc, env } = cellDriver(g, cellSize, t, waveDir, waveK, waveOmega, waveSigma, amp);
    // FOLD C: crest-gate the floor by `env` so off-crest cells relax to flat calm paper. The
    // curl SIGN still coheres adjacent cells (a flowing read, never per-cell noise).
    const floor = TWIST_FLOOR * env;
    const theta = twistMax * env * directedTwist(curlScalar(curlFn, cc, t), floor);
    const shear =
        shearMax * env * directedTwist(curlScalar(curlFn, { x: cc.x + 17.3, y: cc.y + 9.1 }, t), floor);
    const lx = g.x - cc.x;
    const ly = g.y - cc.y;
    const ct = Math.cos(theta);
    const st = Math.sin(theta);
    let rx = ct * lx - st * ly;
    let ry = st * lx + ct * ly;
    rx += shear * ry; // a small skew so the box MORPHS, not just rotates
    return { x: cc.x + rx, y: cc.y + ry };
}

// ── The FACE — height-lit filled cell interior (the structurally-absent RE-INVENT) ─────────
/**
 * The sheet displacement at a cell center `cc` — the EXACT traveling-wave scalar the twist
 * rides (`travelingEnvelope · amp`), surfaced as a named leaf fn so the face reads ONE
 * envelope. Range [0,1]·amp: ~0 ahead of, behind the crest, ~amp at the crest. `cellTwist`
 * (via `cellDriver`) calls this, so a sign drift reds the numeric parity gate everywhere.
 */
export function cellHeight(
    cc: Vec2,
    t: number,
    waveDir: Vec2,
    waveK: number,
    waveOmega: number,
    waveSigma: number,
    amp: number,
): number {
    return travelingEnvelope(cc, t, waveDir, waveK, waveOmega, waveSigma) * amp;
}

/**
 * The central-difference slope of `cellHeight` across a cell (`ε = 0.5·cellSize`) — the lit-fold
 * normal source. Pure, derivative-FREE (NO `dFdx` on the height) → Safari WebGL2-safe by
 * construction (only the Golus AA uses `fwidth`). Returns ∇H = (∂H/∂x, ∂H/∂y) at `cc`.
 */
export function faceRelief(
    cc: Vec2,
    cellSize: number,
    t: number,
    waveDir: Vec2,
    waveK: number,
    waveOmega: number,
    waveSigma: number,
    amp: number,
): Vec2 {
    const eps = Math.max(cellSize, 1e-3) * 0.5;
    const hxp = cellHeight({ x: cc.x + eps, y: cc.y }, t, waveDir, waveK, waveOmega, waveSigma, amp);
    const hxm = cellHeight({ x: cc.x - eps, y: cc.y }, t, waveDir, waveK, waveOmega, waveSigma, amp);
    const hyp = cellHeight({ x: cc.x, y: cc.y + eps }, t, waveDir, waveK, waveOmega, waveSigma, amp);
    const hym = cellHeight({ x: cc.x, y: cc.y - eps }, t, waveDir, waveK, waveOmega, waveSigma, amp);
    return { x: (hxp - hxm) / (2 * eps), y: (hyp - hym) / (2 * eps) };
}

/**
 * Soft inset-square coverage inside a (warped) cell — the filled FACE plateau. `d` is the
 * distance into the cell from the nearest gutter (per axis, on the triangle-wave the Golus
 * grid already uses); `smoothstep(inset, inset+2·aa, d)` floors the face to a soft-edged tile
 * that retreats as `inset` grows (the squash). The shaders pass `aa = fwidth(g)` (crisp at any
 * DPR — the Golus precedent); the JS round-trip passes a fixed `uvDeriv` (reproducible).
 * Returns face coverage [0..1].
 */
export function facePlateau(g: Vec2, inset: number, uvDeriv: Vec2): number {
    // triangle wave per axis: 0 at a gutter, 1 at the cell center (the Golus gridUV).
    const dx = 1 - Math.abs((g.x - Math.floor(g.x)) * 2 - 1);
    const dy = 1 - Math.abs((g.y - Math.floor(g.y)) * 2 - 1);
    const d = Math.min(dx, dy);
    const aa = Math.max(uvDeriv.x, uvDeriv.y) * 1.5;
    const lo = inset;
    const hi = inset + 2 * aa;
    const span = Math.max(hi - lo, 1e-6);
    const tt = Math.min(Math.max((d - lo) / span, 0), 1);
    return tt * tt * (3 - 2 * tt);
}

// ── The local cursor swirl (the finger twists the cells around it) ─────────────
/**
 * A LOCAL Gaussian-gated rotation about the cursor — the finger twists the cells around
 * it (the re-aimed `cursorBulge`: a swirl, not a radial push). `strength` is the peak
 * twist angle at the cursor; `radius` the Gaussian falloff (grid units). Returns the
 * swirled coordinate.
 */
export function cursorSwirl(
    g: Vec2,
    cursor: Vec2,
    strength: number,
    radius: number,
): Vec2 {
    const tx = g.x - cursor.x;
    const ty = g.y - cursor.y;
    const d2 = tx * tx + ty * ty;
    const r = Math.max(radius, 1e-4);
    const theta = strength * Math.exp(-d2 / (2 * r * r));
    const ct = Math.cos(theta);
    const st = Math.sin(theta);
    return {
        x: cursor.x + (ct * tx - st * ty),
        y: cursor.y + (st * tx + ct * ty),
    };
}

// ── The smooth traveling-wave FLOW warp (continuous — for the level-set contours) ─
/**
 * The `waveFlow` second-flow FREQUENCY RATIO (shared across JS↔GLSL↔WGSL — the round-trip fence).
 * The secondary counter-flow term samples the curl at `warpFreq · this` so it drifts on a slightly
 * different spatial scale (the anti-loop variety) while staying the SAME order of magnitude as the
 * primary. `0.6 · 1.833333 ≈ 1.1` reproduces concentric's unit-scale pair; the GLSL/WGSL
 * transcriptions carry the identical literal.
 */
export const WAVE_FLOW_SECOND_RATIO = 1.833333;

/**
 * A CONTINUOUS divergence-free flow warp gated by the traveling wave — the SMOOTH twin of
 * `cellTwist` for surfaces that need an unbroken coordinate (the level-set contours shatter
 * into a mesh under the per-cell discontinuity; they need this continuous warp). The curl
 * flow direction is read at `g` itself (no per-cell pivot → no seam), its magnitude gated by
 * the SAME traveling Gaussian crest sweeping along `waveDir`. So the contours flow + twist as
 * the wave passes OVER and THROUGH them, with NO cell-boundary discontinuity. Returns the
 * warped coordinate.
 *
 * the LOCALLY-AFFINE frequency law. `warpFreq` is the HOST-supplied spatial
 * frequency (in the caller's OWN coordinate units) at which the curl-flow potential is sampled.
 * The caller passes a frequency an ORDER OF MAGNITUDE BELOW its own grid/contour frequency, so
 * the warp-displacement gradient is ~constant across any ONE cell (the warp Jacobian is locally
 * affine): the major gridlines bow as ONE smooth continuous curve across the frame, NEVER the
 * per-cell crackle a cell-scale sampling frequency produces. liquid-grid feeds a CELL-scale
 * coordinate (`uv · gridScale`, span ~14–40 cells) so it passes a tiny `warpFreq` (~0.03 →
 * wavelength of MANY cells); concentric feeds a UNIT-scale domain (`vUv`, span ~1) so it passes
 * the unit-scale `0.6`. The amplitude is UNCHANGED (the curl magnitude is the intrinsic q-space
 * gradient at the fixed `CURL_EPS`, independent of `warpFreq` — only the spatial frequency drops,
 * the bow amplitude `twistMax · env` is preserved). The `t·` drift coefficients are host-agnostic
 * (they set the flow's temporal evolution rate in q-space, independent of `warpFreq`).
 */
export function waveFlow(
    curlFn: (p: Vec2) => Vec2,
    g: Vec2,
    t: number,
    waveDir: Vec2,
    waveK: number,
    waveOmega: number,
    waveSigma: number,
    twistMax: number,
    amp: number,
    warpFreq = 0.6,
): Vec2 {
    const env = travelingEnvelope(g, t, waveDir, waveK, waveOmega, waveSigma) * amp;
    const f = curlFn({ x: g.x * warpFreq + t * 0.05, y: g.y * warpFreq - t * 0.04 });
    // a second slow counter-flow (a slightly different spatial scale + opposite drift) so the
    // warp never visibly loops — still an order of magnitude below the grid frequency.
    const wf2 = warpFreq * WAVE_FLOW_SECOND_RATIO;
    const f2 = curlFn({ x: g.x * wf2 - t * 0.03, y: g.y * wf2 + t * 0.035 });
    const k = twistMax * env;
    return {
        x: g.x + (f.x + f2.x * 0.5) * k,
        y: g.y + (f.y + f2.y * 0.5) * k,
    };
}

// ── The level-set height field (concentric topography) ─────────────────────────
/**
 * A LOW-octave value-noise topography H(p) — the scalar field concentric extracts level-set
 * contours of. `octaves` LOW (3) keeps the nested loops CLEAN (not high-freq speckle — the
 * legibility floor). The host supplies its `noiseFn(x,y)` (the SAME value-noise basis its
 * `potentialFBM` uses, basis-agnostic). Returns the un-normalized height.
 */
export function heightField(
    noiseFn: (x: number, y: number) => number,
    p: Vec2,
    octaves: number,
    seed: number,
): number {
    let v = 0;
    let amp = 0.5;
    let freq = 1;
    let px = p.x + seed;
    let py = p.y - seed;
    const n = Math.max(1, Math.min(6, Math.floor(octaves)));
    for (let i = 0; i < n; i++) {
        v += amp * noiseFn(px * freq, py * freq);
        const rx = 0.8 * px - 0.6 * py;
        const ry = 0.6 * px + 0.8 * py;
        px = rx;
        py = ry;
        freq *= 2.0;
        amp *= 0.5;
    }
    return v;
}

/**
 * The ω=√(g·k) breathing swell — a slow global rise/fall the topography rides so basins
 * inflate/deflate with weight (the deep-water dispersion the suite shares). A pure
 * f(t) the host adds onto H. `phase` lets a host offset its own swell.
 */
export function waveSwell(t: number, phase: number): number {
    // k≈1 normalized → ω≈√9.81; a slow breathing carrier.
    return Math.sin(t * 0.35 + phase) * 0.5 + Math.sin(t * 0.21 + phase * 1.7) * 0.5;
}

/**
 * The cell-warp applied BEFORE the height eval (concentric's `cellWarpBeforeHeight`). It
 * is the SAME `cellTwist` paper-grid runs — concentric warps the SAMPLING coordinate so
 * the contours twist/flow as the traveling wave crosses (kinship with paper-grid). A thin
 * alias for the gate's by-name assert + the host's call-site clarity.
 */
export function cellWarpBeforeHeight(
    curlFn: (p: Vec2) => Vec2,
    g: Vec2,
    cellSize: number,
    t: number,
    waveDir: Vec2,
    waveK: number,
    waveOmega: number,
    waveSigma: number,
    twistMax: number,
    shearMax: number,
    amp: number,
): Vec2 {
    return cellTwist(
        curlFn,
        g,
        cellSize,
        t,
        waveDir,
        waveK,
        waveOmega,
        waveSigma,
        twistMax,
        shearMax,
        amp,
    );
}
