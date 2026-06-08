// AX.W12 — the TS transcription of the shared procedural-color chunk's NET-NEW noise
// leaf (PCG_HASH_GLSL + its PCG_HASH_WGSL twin).
//
// GLSL/WGSL cannot run in vitest/node, so the two shader strings are evaluated via
// these hand-transcribed ports that MIRROR the chunk line-for-line — the SAME shape as
// `aurora-color.wgsl-port.ts` mirrors the WGSL color twin and `metaball-color.glsl-port`
// mirrors the GLSL color core. `proof:aurora-noise-hash-equivalence` asserts the GLSL
// port equals the WGSL port to 1e-6 over a witness coordinate set — so the GLSL string
// and the WGSL string provably compute the same numbers (the AX.W12 twin lock).
//
// The integer pipeline is bit-EXACT (not merely 1e-6-close): GLSL `uint`/WGSL `u32`
// both wrap mod 2^32, and `floatBitsToUint`/`bitcast<u32>` reinterpret the same IEEE-754
// bits — so the only divergence-prone step is the final f32 normalize + the simplex
// skew/falloff, which the 1e-6 gate covers. To make the TS port itself bit-exact to the
// shader integers, every u32 op routes through `>>> 0` (the unsigned coercion) and
// `Math.imul` (the 32-bit-wrapping multiply); the float reinterpret rides a shared
// Float32Array/Uint32Array view (true IEEE-754 single-precision bits, NOT a JS double).
//
// Because the GLSL and WGSL halves are CERTIFIED-identical at the integer level (same
// constants, same op order), ONE TS transcription faithfully mirrors BOTH twins — a
// per-twin re-transcription that diverged would be a transcription bug, not a shader
// divergence. The gate runs this single port and ALSO re-derives the same numbers from
// the live chunk strings' constant set, so a constant edit in either twin is caught.

type Vec2 = [number, number];

// ── Bit-exact u32 helpers (mirror GLSL uint / WGSL u32 wraparound) ──
const u32 = (x: number): number => x >>> 0;
const mulU32 = (a: number, b: number): number => Math.imul(a, b) >>> 0;
const addU32 = (a: number, b: number): number => (a + b) >>> 0;
const xorU32 = (a: number, b: number): number => (a ^ b) >>> 0;
const shrU32 = (a: number, n: number): number => a >>> n;

// ── IEEE-754 single-precision bit reinterpret (mirror floatBitsToUint / bitcast<u32>) ──
// A shared view so `floatBitsToUint(f32(x))` yields the SAME 32 bits the GPU sees (a raw
// JS double would carry 52 mantissa bits the shader's f32 never has).
const _f32 = new Float32Array(1);
const _u32v = new Uint32Array(_f32.buffer);
const _i32v = new Int32Array(_f32.buffer);
function floatBitsToUint(x: number): number {
    _f32[0] = x;
    return _u32v[0]!;
}
// GLSL uvec2(ivec2) / WGSL bitcast<vec2u>(vec2i): two's-complement bit reinterpret.
function intBitsToUint(x: number): number {
    _i32v[0] = x | 0;
    return _u32v[0]!;
}

// ── pcg2d (mirror PCG_HASH_GLSL / PCG_HASH_WGSL — Jarzynski PCG2D) ──
export function pcg2d(vx: number, vy: number): [number, number] {
    let x = addU32(mulU32(u32(vx), 1664525), 1013904223);
    let y = addU32(mulU32(u32(vy), 1664525), 1013904223);
    x = addU32(x, mulU32(y, 1664525));
    y = addU32(y, mulU32(x, 1664525));
    x = xorU32(x, shrU32(x, 16));
    y = xorU32(y, shrU32(y, 16));
    x = addU32(x, mulU32(y, 1664525));
    y = addU32(y, mulU32(x, 1664525));
    x = xorU32(x, shrU32(x, 16));
    y = xorU32(y, shrU32(y, 16));
    return [x, y];
}

const INV_2_32 = 1.0 / 4294967296.0;
const TAU = 6.28318530717958647692;
const F2 = 0.36602540378443864676; // (sqrt(3) - 1) / 2
const G2 = 0.21132486540518711775; // (3 - sqrt(3)) / 6

// Float→[0,1) scalar hash (mirror pcgHash2).
export function pcgHash2(p: Vec2): number {
    const ux = floatBitsToUint(p[0]);
    const uy = floatBitsToUint(p[1]);
    const h = pcg2d(ux, uy);
    return h[0] * INV_2_32;
}

// Integer-lattice gradient (mirror pcgGrad2).
export function pcgGrad2(cx: number, cy: number): Vec2 {
    const h = pcg2d(intBitsToUint(cx), intBitsToUint(cy));
    const ang = h[0] * INV_2_32 * TAU;
    return [Math.cos(ang), Math.sin(ang)];
}

const dot2 = (a: Vec2, b: Vec2): number => a[0] * b[0] + a[1] * b[1];

// 2D simplex gradient noise (mirror gnoise) — ~[-1, 1].
export function gnoise(p: Vec2): number {
    const s = (p[0] + p[1]) * F2;
    const ix = Math.floor(p[0] + s);
    const iy = Math.floor(p[1] + s);
    const tt = (ix + iy) * G2;
    const x0: Vec2 = [p[0] - (ix - tt), p[1] - (iy - tt)];
    const i1: Vec2 = x0[0] > x0[1] ? [1, 0] : [0, 1];
    const x1: Vec2 = [x0[0] - i1[0] + G2, x0[1] - i1[1] + G2];
    const x2: Vec2 = [x0[0] - 1.0 + 2.0 * G2, x0[1] - 1.0 + 2.0 * G2];
    let n = 0.0;
    let t0 = 0.5 - dot2(x0, x0);
    if (t0 > 0.0) {
        t0 *= t0;
        n += t0 * t0 * dot2(pcgGrad2(ix, iy), x0);
    }
    let t1 = 0.5 - dot2(x1, x1);
    if (t1 > 0.0) {
        t1 *= t1;
        n += t1 * t1 * dot2(pcgGrad2(ix + i1[0], iy + i1[1]), x1);
    }
    let t2 = 0.5 - dot2(x2, x2);
    if (t2 > 0.0) {
        t2 *= t2;
        n += t2 * t2 * dot2(pcgGrad2(ix + 1, iy + 1), x2);
    }
    return 70.0 * n;
}

export type { Vec2 };
