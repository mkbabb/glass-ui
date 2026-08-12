// The typed-struct SOURCE OF TRUTH for the compute and render uniform buffers, the
// phasor table, the colour ramp, and the view fit.
//
// The WGSL structs and the JS write offsets are generated from the SAME layout tables
// here, so a field-order or alignment mismatch is structurally impossible. Every scalar
// packs into a vec4 lane and every table entry into a vec4, so the array stride is the
// natural 16 bytes.
//
// THE COLOUR IS RESOLVED ON THE CPU. The palette is walked into a 16-entry OKLab-
// interpolated table once per palette change, chroma-floored, gamut-mapped, and uploaded
// as linear sRGB. The shader never converts a colour space; the ink, the mark, the chain
// and the head all read ONE ramp, so they cannot drift apart.

import { gamutMapStop, oklchToLinear, type OklchStop } from "../../../composables/color";
import {
    FOURIER_HEAD_DELTA_L,
    FOURIER_INK_DELTA_L,
    FOURIER_LUT_SIZE,
    FOURIER_TAIL_CHROMA_FLOOR,
    MAX_FOURIER_STOPS,
} from "../constants";
import type { BasisComponent } from "../math";
import type { MintedSpectrum } from "./mint";

/** One phasor lane in the storage buffer: (re, im, index, _pad). */
export const FOURIER_PHASOR_BYTES = 16;

export interface FourierUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

// ── COMPUTE uniform layout ─────────────────────────────────────────────────────
//   c0   : vec4<f32>  off  0  (headT, trailArc, _pad, _pad)
//   ints : vec4<i32>  off 16  (harmonicN, sampleCount, termCount, _pad)
const FOURIER_COMPUTE_UNIFORM_BYTES = 32;
const C_OFF = { c0: 0, ints: 4 } as const;

export function createFourierComputeScratch(): FourierUniformScratch {
    const buffer = new ArrayBuffer(FOURIER_COMPUTE_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

export function packFourierComputeUniforms(
    scratch: FourierUniformScratch,
    headT: number,
    trailArc: number,
    harmonicN: number,
    sampleCount: number,
    termCount: number,
): FourierUniformScratch {
    const { f32, i32 } = scratch;
    f32[C_OFF.c0 + 0] = headT;
    f32[C_OFF.c0 + 1] = trailArc;
    f32[C_OFF.c0 + 2] = 0;
    f32[C_OFF.c0 + 3] = 0;
    i32[C_OFF.ints + 0] = harmonicN;
    i32[C_OFF.ints + 1] = sampleCount;
    i32[C_OFF.ints + 2] = termCount;
    i32[C_OFF.ints + 3] = 0;
    return scratch;
}

// ── RENDER uniform layout ──────────────────────────────────────────────────────
//   r0   : vec4<f32>  off   0  (centerX, centerY, scale, aspect)
//   r1   : vec4<f32>  off  16  (markHalf, inkOffsetStrokes, scaffoldFrac, edgeMargin)
//   r2   : vec4<f32>  off  32  (peakAlpha, glow, squash, trailFadeExp)
//   r3   : vec4<f32>  off  48  (trailFloor, hueSweep, ringStrokeModel, showMachine)
//   ink  : vec4<f32>  off  64  (linear rgb, rainbowChain)
//   head : vec4<f32>  off  80  (linear rgb, _pad)
//   ints : vec4<i32>  off  96  (sampleCount, lutSize, chainCount, _pad)
//   lut  : array<vec4<f32>, FOURIER_LUT_SIZE>  off 112
const FOURIER_RENDER_UNIFORM_BYTES = 112 + FOURIER_LUT_SIZE * 16;
const R_OFF = {
    r0: 0,
    r1: 4,
    r2: 8,
    r3: 12,
    ink: 16,
    head: 20,
    ints: 24,
    lut: 28,
} as const;

export function createFourierRenderScratch(): FourierUniformScratch {
    const buffer = new ArrayBuffer(FOURIER_RENDER_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** The model→clip fit transform — computed once per spectrum, never per N edit. */
export interface FourierFit {
    centerX: number;
    centerY: number;
    /** The uniform scale s mapping (model − center)·s into clip [-1,1] with margin. */
    scale: number;
}

/** The fit margin — the fraction of the clip box the drawing is allowed to fill. */
const FIT_MARGIN = 0.82;

/**
 * The view fit, read straight off the mint. It unions the curve's own bbox with the
 * chain's reach when the machine shows, because a chain that leaves the stage is a
 * machine you cannot check. It is FIXED under N: the mint is the only input, so an N edit
 * never rescales the figure and the "N=1 is genuinely this big" claim stays true.
 */
export function computeFourierFit(
    minted: MintedSpectrum,
    showMachine: boolean,
): FourierFit {
    const halfSpan = Math.max(minted.halfSpanX, minted.halfSpanY, 1e-6);
    const reach = showMachine ? minted.chainReach : 0;
    const extent = Math.max(halfSpan, reach, 1e-6);
    return {
        centerX: minted.centerX,
        centerY: minted.centerY,
        scale: FIT_MARGIN / extent,
    };
}

/**
 * Convert a CSS-px stroke to MODEL units. The fit maps model → clip; clip spans [-1,1]
 * over the min CSS dimension, so cssPx-per-clip is `canvasCssMin/2`.
 */
export function strokeToModel(
    strokePx: number,
    scale: number,
    canvasCssMin: number,
): number {
    const cssPerClip = Math.max(canvasCssMin, 1) / 2;
    return strokePx / Math.max(scale, 1e-6) / cssPerClip;
}

/**
 * The resolved ramp: a linear-sRGB LUT plus the two derived pigments the paint law names.
 * Rebuilt only when the palette itself changes.
 */
export interface FourierRamp {
    /** `FOURIER_LUT_SIZE` linear-sRGB entries, index 0 the ramp head. */
    readonly lut: Float32Array;
    /** The ink: the ramp head one step DOWN in L, gamut-mapped at fixed L and hue. */
    readonly ink: [number, number, number];
    /** The head core: the ramp head lifted by half a step, chroma preserved. */
    readonly head: [number, number, number];
}

function lerpStop(a: OklchStop, b: OklchStop, f: number): OklchStop {
    // Interpolate hue the short way so a warm→cream ramp never travels through green.
    let dh = b.h - a.h;
    while (dh > 180) dh -= 360;
    while (dh < -180) dh += 360;
    return { L: a.L + (b.L - a.L) * f, C: a.C + (b.C - a.C) * f, h: a.h + dh * f };
}

/**
 * Resolve a palette into the shipped ramp. Chroma is floored at every entry — a ramp that
 * falls to grey paints a smear where the tail should still be pigment — and every entry
 * is gamut-mapped, so an out-of-gamut author stop becomes a real colour rather than a
 * clipped one.
 */
export function resolveFourierRamp(palette: readonly OklchStop[]): FourierRamp {
    const stops = palette.length > 0 ? palette.slice(0, MAX_FOURIER_STOPS) : [];
    const safe: OklchStop[] =
        stops.length > 0 ? stops : [{ L: 0.62, C: 0.19, h: 34 }];
    const lut = new Float32Array(FOURIER_LUT_SIZE * 4);
    for (let i = 0; i < FOURIER_LUT_SIZE; i++) {
        const t = i / (FOURIER_LUT_SIZE - 1);
        const ft = t * (safe.length - 1);
        const i0 = Math.min(Math.floor(ft), safe.length - 1);
        const i1 = Math.min(i0 + 1, safe.length - 1);
        const mixed = lerpStop(safe[i0], safe[i1], ft - i0);
        const floored = gamutMapStop({
            L: mixed.L,
            C: Math.max(mixed.C, FOURIER_TAIL_CHROMA_FLOOR),
            h: mixed.h,
        });
        const lin = oklchToLinear(floored);
        lut[i * 4 + 0] = lin[0];
        lut[i * 4 + 1] = lin[1];
        lut[i * 4 + 2] = lin[2];
        lut[i * 4 + 3] = 0;
    }
    const headStop = safe[0];
    const ink = oklchToLinear(
        gamutMapStop({
            L: Math.max(0, headStop.L - FOURIER_INK_DELTA_L),
            C: headStop.C,
            h: headStop.h,
        }),
    );
    const head = oklchToLinear(
        gamutMapStop({
            L: Math.min(1, headStop.L + FOURIER_HEAD_DELTA_L),
            C: headStop.C,
            h: headStop.h,
        }),
    );
    return { lut, ink, head };
}

export interface FourierRenderPack {
    fit: FourierFit;
    aspect: number;
    markHalfModel: number;
    inkOffsetStrokes: number;
    scaffoldFrac: number;
    edgeMargin: number;
    peakAlpha: number;
    glow: number;
    squash: number;
    trailFadeExp: number;
    trailFloor: number;
    hueSweep: number;
    ringStrokeModel: number;
    showMachine: boolean;
    rainbowChain: boolean;
    sampleCount: number;
    /** The number of chain arms this frame draws — the hue sweep's denominator. */
    chainCount: number;
    ramp: FourierRamp;
}

/**
 * Pack the render uniforms in place. `peakAlpha` arrives already multiplied by the
 * intensity envelope and CLAMPED here — the one place loudness can leave the legal range,
 * closed at pack time so no fragment can composite past 1.
 */
export function packFourierRenderUniforms(
    scratch: FourierUniformScratch,
    p: FourierRenderPack,
): FourierUniformScratch {
    const { f32, i32 } = scratch;
    f32[R_OFF.r0 + 0] = p.fit.centerX;
    f32[R_OFF.r0 + 1] = p.fit.centerY;
    f32[R_OFF.r0 + 2] = p.fit.scale;
    f32[R_OFF.r0 + 3] = p.aspect;

    f32[R_OFF.r1 + 0] = p.markHalfModel;
    f32[R_OFF.r1 + 1] = p.inkOffsetStrokes;
    f32[R_OFF.r1 + 2] = p.scaffoldFrac;
    f32[R_OFF.r1 + 3] = p.edgeMargin;

    f32[R_OFF.r2 + 0] = Math.min(Math.max(p.peakAlpha, 0), 1);
    f32[R_OFF.r2 + 1] = p.glow;
    f32[R_OFF.r2 + 2] = p.squash;
    f32[R_OFF.r2 + 3] = p.trailFadeExp;

    f32[R_OFF.r3 + 0] = p.trailFloor;
    f32[R_OFF.r3 + 1] = p.hueSweep;
    f32[R_OFF.r3 + 2] = p.ringStrokeModel;
    f32[R_OFF.r3 + 3] = p.showMachine ? 1 : 0;

    f32[R_OFF.ink + 0] = p.ramp.ink[0];
    f32[R_OFF.ink + 1] = p.ramp.ink[1];
    f32[R_OFF.ink + 2] = p.ramp.ink[2];
    f32[R_OFF.ink + 3] = p.rainbowChain ? 1 : 0;

    f32[R_OFF.head + 0] = p.ramp.head[0];
    f32[R_OFF.head + 1] = p.ramp.head[1];
    f32[R_OFF.head + 2] = p.ramp.head[2];
    f32[R_OFF.head + 3] = 0;

    i32[R_OFF.ints + 0] = p.sampleCount;
    i32[R_OFF.ints + 1] = FOURIER_LUT_SIZE;
    i32[R_OFF.ints + 2] = p.chainCount;
    i32[R_OFF.ints + 3] = 0;

    for (let i = 0; i < FOURIER_LUT_SIZE * 4; i++) {
        f32[R_OFF.lut + i] = p.ramp.lut[i];
    }
    return scratch;
}

/**
 * Pack the phasor storage table (re, im, index, _pad) from the minted spectrum. The
 * buffer is sized per-spectrum by the caller — there is no table ceiling, so a 61-term ℱ
 * and a 2-term foil each pay for exactly what they carry.
 */
export function packPhasorTable(terms: readonly BasisComponent[]): Float32Array {
    const data = new Float32Array(Math.max(terms.length, 1) * 4);
    for (let i = 0; i < terms.length; i++) {
        const c = terms[i];
        const o = i * 4;
        data[o + 0] = c.coefficient[0];
        data[o + 1] = c.coefficient[1];
        data[o + 2] = c.index;
        data[o + 3] = 0;
    }
    return data;
}
