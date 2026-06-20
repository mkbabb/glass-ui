// BC.W-VIZ-HYBRID — the Register-B lattice math (the SINGLE pure-JS source the WGSL
// transcribes line-for-line; round-tripped by `proof:viz-hybrid` clause 3).
//
// Register A (the DEFAULT) is a pure FRAGMENT swap of the metaball pass — the dot grid is
// quantized off `fragCoord` in the shader, so it needs NO JS lattice (the field IS the
// shader-only `sceneDistG`). Register B (the OPT-IN instanced dot-lattice + the dot-sphere)
// is the one path with a JS↔WGSL lattice: the per-instance anchor position.
//
// THE ONE MATH SOURCE. `gridOrigin(index, cols, pitch)` is the deterministic SCREEN lattice
// (a row-major grid in NDC). `fibonacciDot` (the phyllotaxis sphere lattice) is the
// dot-sphere anchor — IMPORTED from the dot-matrix evaluator (`dotMatrixField.ts`), NOT
// re-authored (the ONE-rasterizer / ONE-math-source fence; a duplicate `fibonacciDot` reds
// `proof:viz-hybrid` clause 2). Both are pure functions of `instance_index`, recomputed each
// frame from `f(ii, t)` — no storage buffer of evolving state (the anchored-grid discipline,
// strictly simpler than the dot-flow compute kernel).

import { fibonacciDot, type Vec3 } from "../../dot-matrix";

// Re-export the phyllotaxis sphere lattice so the dot-sphere register reads the ONE source.
export { fibonacciDot, type Vec3 };

/** A 2-vector — the NDC lattice anchor. */
export interface Vec2 {
    x: number;
    y: number;
}

/**
 * The §T3 deterministic SCREEN lattice anchor for instance `index` of a `cols`-wide row-major
 * grid at `pitch` NDC spacing, centred on the origin. `rows` is derived so the grid is roughly
 * square (the instance fan-out `cols × rows ≥ count`); the WGSL `gridOrigin(ii, uCols, uPitch)`
 * transcribes this EXACTLY (the round-trip parity anchor):
 *
 *   col    = index % cols
 *   row    = floor(index / cols)
 *   x      = (col - (cols-1)/2) · pitch
 *   y      = (row - (cols-1)/2) · pitch   // a square grid centred on origin
 *
 * The anchors fill a centred `cols × cols` lattice in NDC; the field is sampled AT each anchor
 * for the dot size+brightness, with an opt-in `-grad` flow displacement toward the merging core.
 */
export function gridOrigin(index: number, cols: number, pitch: number): Vec2 {
    const c = Math.max(cols, 1);
    const col = index % c;
    const row = Math.floor(index / c);
    const half = (c - 1) / 2;
    return { x: (col - half) * pitch, y: (row - half) * pitch };
}

/** The Register-B instance count for a `cols`-wide square lattice. */
export function latticeInstanceCount(cols: number): number {
    const c = Math.max(cols, 1);
    return c * c;
}
