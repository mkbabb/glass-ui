// BC.W-VIZ-DOTMATRIX — the Fibonacci-phyllotaxis dot-sphere evaluator (the SINGLE
// math source the WGSL/GLSL transcribe line-for-line).
//
// The dot-matrix is a globe of N fine dots laid on a sphere SURFACE via the
// Martin-Roberts area-centered Fibonacci-lattice spiral (extremelearning.com.au;
// arXiv 0912.4540) — the irrational golden ratio gives each point near-equal AREA with
// no resonance gaps, so it beats lat-long (which clusters at the poles → banded rings).
// A SOFT depth-fade (the Will-Howard / COBE / Stripe lineage — NOT a binary back-face
// cull) modulates per-dot opacity + size by the rotated-normal's camera-facing-ness, so
// the globe reads as a translucent dot-SHELL even when the spin is stopped.
//
// This module is the CITED-SOTA math, pure + node-testable. The WGSL `dot-matrix.wgsl`
// `instance_index → unit position` mapping transcribes `fibonacciDot()` EXACTLY, and
// `proof:dot-matrix` clause 3 round-trips the JS evaluator vs the transcribed WGSL/GLSL
// structure at a fixed `(i, t)` sample set (the std140-alignment / transcription-drift
// trap closed by a round-trip, not a per-line edit loop). The four pure functions:
//
//   1. fibonacciDot(i, N) → Vec3  — the §T1 phyllotaxis position on the UNIT sphere.
//   2. facingFade(normal, spin)   — the §T2 depth-fade opacity + size ramps.
//   3. spinMatrix(t, tilt, rate)  — the §T3 slow tilted Y-rotation (a renderAt(t) drives
//                                    it deterministically for the π capture).
//   4. breathRadius(t, depth, rate) — the §T3 sub-perceptual radius pulse.

/** A 3-vector. */
export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

/** A row-major 3×3 matrix (the spin matrix the WGSL transcribes column-for-column). */
export type Mat3 = readonly [
    number, number, number,
    number, number, number,
    number, number, number,
];

/** The depth-fade result — the per-dot opacity + size multipliers. */
export interface FacingFade {
    /** The camera-facing opacity multiplier ∈ [facingLo, facingLo+facingHi]. */
    opacity: number;
    /** The depth-of-field size taper ∈ [0.6, 1.0]. */
    size: number;
    /** The raw facing term ∈ [0,1] (1 = dead-front, 0 = dead-back). */
    facing: number;
}

// ── The golden-angle constants (the §T1 phyllotaxis core) ───────────────────────
/** The golden ratio φ = (1+√5)/2 ≈ 1.6180339887. */
export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
/** The golden angle = 2π/φ = π·(3−√5) ≈ 2.39996 rad ≈ 137.508° (the irrational azimuth). */
export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * The Fibonacci-phyllotaxis position for dot `i` of `N` on the UNIT sphere — the
 * area-centered half-offset variant (admits ANY `N`, the cheaper no-`acos` `y = cos(polar)`
 * form). The WGSL `instance_index → unit position` mapping transcribes this EXACTLY (the
 * F3 round-trip anchor):
 *
 *   y     = 1 − 2·(i + 0.5) / N      // y ∈ (−1,1), the cos(polar) — even by AREA
 *   r     = sqrt(1 − y²)             // ring radius at that latitude
 *   theta = i · goldenAngle          // the golden-angle azimuth spiral
 *   pos   = (cos(theta)·r, y, sin(theta)·r)
 *
 * This beats lat-long (`theta = 2πi/cols, phi = πj/rows`, which clusters at the poles →
 * banded rings) because the irrational golden ratio gives near-equal AREA with no
 * resonance gaps (extremelearning.com.au; arXiv 0912.4540).
 */
export function fibonacciDot(i: number, n: number): Vec3 {
    const count = Math.max(n, 1);
    const y = 1 - (2 * (i + 0.5)) / count; // the cos(polar), even by area
    const r = Math.sqrt(Math.max(0, 1 - y * y)); // ring radius at that latitude
    const theta = i * GOLDEN_ANGLE; // the golden-angle azimuth
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
}

// ── The depth-fade pinned ramps (the §T2 procedural-refs values) ────────────────
/** The opacity floor (a dead-back dot stays a faint shell point, never fully gone). */
export const FACING_LO = 0.15;
/** The opacity facing-gain (dead-front lifts to facingLo + facingHi). */
export const FACING_HI = 0.85;
/** The size depth-of-field taper base (a dead-back dot is 0.6× the dead-front size). */
export const SIZE_TAPER_BASE = 0.6;
/** The size depth-of-field taper gain. */
export const SIZE_TAPER_GAIN = 0.4;

/**
 * The §T2 depth-fade — the part that makes the dot field READ as a sphere. After the spin,
 * modulate per-dot opacity + size by the rotated-normal's camera-facing-ness (a SOFT
 * falloff, NOT a binary back-face cull — the soft fade is what reads as a translucent
 * shell vs a flat disc). For a sphere centered at origin the surface normal IS the
 * normalized dot position, so the facing term is the rotated-normal's z:
 *
 *   facing  = clamp(n.z · 0.5 + 0.5, 0, 1)            // 1 = dead-front, 0 = dead-back
 *   opacity = facingLo + facingHi · facing            // 0.15 + 0.85·facing
 *   size    = 0.6 + 0.4 · facing                      // the DOF dot-size taper
 *
 * `depthFade` ∈ [0,1] scales the facing GAIN (depthFade=1 → the full 0.85 shell read;
 * depthFade=0 → flat uniform opacity, the no-shell degenerate the gate's clause-6 flat-
 * uniform bite catches).
 */
export function facingFade(normal: Vec3, depthFade = 1): FacingFade {
    const facing = clamp01(normal.z * 0.5 + 0.5); // 1 = dead-front
    const opacity = FACING_LO + FACING_HI * depthFade * facing;
    const size = SIZE_TAPER_BASE + SIZE_TAPER_GAIN * facing;
    return { opacity, size, facing };
}

// ── The slow tilted rotation (the §T3 spin matrix) ──────────────────────────────
/**
 * The spin matrix at time `t` — a slow Y-rotation about a gently TILTED axis (a tilted
 * globe reads more alive than a dead-vertical spin). The axis is the Y-axis tilted by
 * `axisTilt` (radians) toward +x; the rotation angle is `rate · t`. Returns a row-major
 * mat3 the WGSL transcribes column-for-column (mat3x3 is column-major → the transpose is
 * written as the SAME columns). A fixed `renderAt(t)` drives it deterministically for the
 * π capture (the spin reads at the same `t` on every host).
 */
export function spinMatrix(t: number, axisTilt: number, rate: number): Mat3 {
    const angle = rate * t;
    // The tilted rotation axis (unit): Y tilted by `axisTilt` toward +x.
    const ax = Math.sin(axisTilt);
    const ay = Math.cos(axisTilt);
    const az = 0;
    // Rodrigues' rotation of angle `angle` about the unit axis (ax, ay, az).
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t1 = 1 - c;
    // Row-major R = I·c + (1−c)·(a⊗a) + s·[a]×
    return [
        c + ax * ax * t1,
        ax * ay * t1 - az * s,
        ax * az * t1 + ay * s,

        ay * ax * t1 + az * s,
        c + ay * ay * t1,
        ay * az * t1 - ax * s,

        az * ax * t1 - ay * s,
        az * ay * t1 + ax * s,
        c + az * az * t1,
    ];
}

/** Apply a row-major mat3 to a Vec3 (the rotated surface normal `n = spin · unitPos`). */
export function applyMat3(m: Mat3, v: Vec3): Vec3 {
    return {
        x: m[0] * v.x + m[1] * v.y + m[2] * v.z,
        y: m[3] * v.x + m[4] * v.y + m[5] * v.z,
        z: m[6] * v.x + m[7] * v.y + m[8] * v.z,
    };
}

// ── The breathing scalar (the §T3 sub-perceptual radius pulse) ──────────────────
/**
 * The breathing radius scalar at time `t` — a gentle `R·(1 + breathDepth·sin(t·breathRate))`
 * pulse, the calmest non-dead register (`breathDepth ≈ 0.02`, far below the dot-flow sweep).
 * Returns the multiplier on the base radius (1 at rest when `depth=0`). The WGSL transcribes
 * the SAME `1 + depth·sin(t·rate)` form.
 */
export function breathRadius(t: number, depth: number, rate: number): number {
    return 1 + depth * Math.sin(t * rate);
}

/** Clamp into [0,1]. */
function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}
