// The typed-struct SOURCE OF TRUTH for the WebGPU compute + render
// uniform buffers + the phasor table + the CPU view-fit.
//
// The WGSL `ComputeUniforms` / `RenderUniforms` structs and the JS `ArrayBuffer` write
// offsets are generated from the SAME layout tables here, so a std140-vs-WGSL alignment
// mismatch (the parity-ΔE-blowout trap) is structurally impossible — the field order + the
// byte offsets are ONE declaration. Every scalar packs into a vec4 lane + each phasor +
// palette stop into a vec4 so the array stride is the natural 16 bytes (no std140 trap).
//
// The phasor table is CPU-minted (makeEllipticSpectrum/dftFromPoints run ONCE in JS, the
// spectrum source-swap); the WGSL only SUMS it per frame. The CPU view-fit (the model
// bbox → clip transform) is computed once per spectrum here too.

import type { OklchStop } from "../../../composables/color";
import { oklchToLinear } from "../../../composables/color";
import { positionsAt, type BasisComponent } from "../math";
import {
    MAX_PHASORS,
    MAX_FOURIER_STOPS,
    FOURIER_FIT_SAMPLES,
    RIBBON_HEAD_FLOOR_PX,
} from "../constants";

/** One phasor lane in the storage buffer: (re, im, index, _pad). */
export const FOURIER_PHASOR_BYTES = 16;

// ── COMPUTE uniform layout ─────────────────────────────────────────────────────
//   c0   : vec4<f32>  off  0  (headT, trailArc, _pad, _pad)
//   ints : vec4<i32>  off 16  (harmonicN, epicycleArmN, sampleCount, phasorCount)
//   total: 32 bytes
export const FOURIER_COMPUTE_UNIFORM_BYTES = 32;

const C_OFF = { c0: 0, ints: 4 } as const;

export interface FourierUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

export function createFourierComputeScratch(): FourierUniformScratch {
    const buffer = new ArrayBuffer(FOURIER_COMPUTE_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** Pack the compute uniforms in place. */
export function packFourierComputeUniforms(
    scratch: FourierUniformScratch,
    headT: number,
    trailArc: number,
    harmonicN: number,
    epicycleArmN: number,
    sampleCount: number,
    phasorCount: number,
): FourierUniformScratch {
    const { f32, i32 } = scratch;
    f32[C_OFF.c0 + 0] = headT;
    f32[C_OFF.c0 + 1] = trailArc;
    f32[C_OFF.c0 + 2] = 0;
    f32[C_OFF.c0 + 3] = 0;
    i32[C_OFF.ints + 0] = harmonicN;
    i32[C_OFF.ints + 1] = epicycleArmN;
    i32[C_OFF.ints + 2] = sampleCount;
    i32[C_OFF.ints + 3] = phasorCount;
    return scratch;
}

// ── RENDER uniform layout ──────────────────────────────────────────────────────
//   r0      : vec4<f32>  off   0  (centerX, centerY, scale, aspect)
//   r1      : vec4<f32>  off  16  (trailWidth, peakAlpha, headGlowAlpha, trailFadeExp)
//   r2      : vec4<f32>  off  32  (trailFloor, intensity, showEpicycles, rainbowChain)
//   r3      : vec4<f32>  off  48  (squashGain, celGain, edgeMargin, _pad)  ← FOURIER-LOOM §2b/§3b
//             (the head tangent + speed are derived IN-shader from curveSamples[0] vs [1] —
//              the SAME evaluator on both engines, so the anisotropy is parity-safe by
// construction; only the two scalar GAINS are uploaded; it also adds
//              `edgeMargin` — the instanced-quad AA-feather slop in MODEL units.)
//   ints    : vec4<i32>  off  64  (sampleCount, armCount, stopCount, _pad)
//   palette : array<vec4<f32>, 4>  off 80  (linear-sRGB rgb + _pad)
//   total   : 80 + 4*16 = 144 bytes
export const FOURIER_RENDER_UNIFORM_BYTES = 80 + MAX_FOURIER_STOPS * 16;

const R_OFF = { r0: 0, r1: 4, r2: 8, r3: 12, ints: 16, palette: 20 } as const;

export function createFourierRenderScratch(): FourierUniformScratch {
    const buffer = new ArrayBuffer(FOURIER_RENDER_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** The model→clip fit transform (center + uniform scale) — computed once per spectrum. */
export interface FourierFit {
    centerX: number;
    centerY: number;
    /** The uniform scale s such that (model − center)·s maps the curve into clip [-1,1] with margin. */
    scale: number;
}

/**
 * Stable view-fit: sample the FULL reconstruction once over the period, bound its bbox,
 * and derive the center + a margin-padded uniform scale. The render's fullscreen pass
 * inverts this transform per fragment so the curve never clips and the scale is fixed.
 */
export function computeFourierFit(spectrum: readonly BasisComponent[]): FourierFit {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const comps = spectrum as BasisComponent[];
    for (let i = 0; i < FOURIER_FIT_SAMPLES; i++) {
        const pts = positionsAt(comps, i / FOURIER_FIT_SAMPLES);
        const [x, y] = pts[pts.length - 1];
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
    if (!isFinite(minX)) {
        return { centerX: 0, centerY: 0, scale: 1 };
    }
    const spanX = Math.max(1e-3, maxX - minX);
    const spanY = Math.max(1e-3, maxY - minY);
    // Fit the larger span into the [-1,1] clip box with an 0.82 margin (the Canvas2D
    // renderer's margin). The aspect is applied at render time (the x clip is scaled by
    // aspect), so the fit uses the unit clip and scales by the worst span.
    const margin = 0.82;
    const scale = (2 * margin) / Math.max(spanX, spanY);
    return {
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
        scale,
    };
}

/**
 * Convert a CSS-px stroke width to MODEL units (the shader's space). The fit `scale` maps
 * model → clip; clip spans [-1,1] over the min CSS dimension → cssPx-per-clip = canvasCssMin/2.
 * model-per-cssPx = (1/scale)·(2/canvasCssMin).
 */
export function trailWidthToModel(
    trailWidthPx: number,
    scale: number,
    canvasCssMin: number,
): number {
    // FLOOR the head width so the tapered MID-BODY clears
    // RIBBON_MID_FLOOR_PX (2.5px CSS) at every DPR: even a consumer setting `trailWidth: 1`
    // paints a ≥2.5px mid-body ribbon, never a 1px hairline polyline.
    const headPx = Math.max(trailWidthPx, RIBBON_HEAD_FLOOR_PX);
    const cssPerClip = Math.max(canvasCssMin, 1) / 2;
    return (headPx / Math.max(scale, 1e-6)) / cssPerClip;
}

/** Pack the render uniforms in place. */
export function packFourierRenderUniforms(
    scratch: FourierUniformScratch,
    fit: FourierFit,
    aspect: number,
    trailWidthModel: number,
    peakAlpha: number,
    headGlowAlpha: number,
    trailFadeExp: number,
    trailFloor: number,
    intensity: number,
    showEpicycles: boolean,
    rainbowChain: boolean,
    squashGain: number,
    celGain: number,
    edgeMargin: number,
    sampleCount: number,
    armCount: number,
    palette: OklchStop[],
): FourierUniformScratch {
    const { f32, i32 } = scratch;
    f32[R_OFF.r0 + 0] = fit.centerX;
    f32[R_OFF.r0 + 1] = fit.centerY;
    f32[R_OFF.r0 + 2] = fit.scale;
    f32[R_OFF.r0 + 3] = aspect;

    // trailWidthModel is already in MODEL units (converted CPU-side via trailWidthToModel).
    f32[R_OFF.r1 + 0] = trailWidthModel;
    f32[R_OFF.r1 + 1] = peakAlpha;
    f32[R_OFF.r1 + 2] = headGlowAlpha;
    f32[R_OFF.r1 + 3] = trailFadeExp;

    f32[R_OFF.r2 + 0] = trailFloor;
    f32[R_OFF.r2 + 1] = intensity;
    f32[R_OFF.r2 + 2] = showEpicycles ? 1 : 0;
    f32[R_OFF.r2 + 3] = rainbowChain ? 1 : 0;

    // r3 — FOURIER-LOOM §2b/§3b: the squash + cel gains (the tangent is derived in-shader) +
    // The instanced-quad AA-feather slop (model units) padding each bbox.
    f32[R_OFF.r3 + 0] = squashGain;
    f32[R_OFF.r3 + 1] = celGain;
    f32[R_OFF.r3 + 2] = edgeMargin;
    f32[R_OFF.r3 + 3] = 0;

    const stopCount = Math.min(palette.length, MAX_FOURIER_STOPS);
    i32[R_OFF.ints + 0] = sampleCount;
    i32[R_OFF.ints + 1] = armCount;
    i32[R_OFF.ints + 2] = stopCount;
    i32[R_OFF.ints + 3] = 0;

    for (let i = 0; i < MAX_FOURIER_STOPS; i++) {
        const base = R_OFF.palette + i * 4;
        const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
        const lin = oklchToLinear(stop);
        f32[base + 0] = lin[0];
        f32[base + 1] = lin[1];
        f32[base + 2] = lin[2];
        f32[base + 3] = 0;
    }
    return scratch;
}

/**
 * Pack the phasor storage table (re, im, index, _pad) from the CPU-minted spectrum. The
 * WGSL SUMS this per frame — it is the ONLY spectrum upload (no WGSL-side mint).
 */
export function packPhasorTable(spectrum: readonly BasisComponent[]): Float32Array {
    const n = Math.min(spectrum.length, MAX_PHASORS);
    const data = new Float32Array(MAX_PHASORS * 4);
    for (let i = 0; i < n; i++) {
        const c = spectrum[i];
        const o = i * 4;
        data[o + 0] = c.coefficient[0];
        data[o + 1] = c.coefficient[1];
        data[o + 2] = c.index;
        data[o + 3] = 0;
    }
    return data;
}
