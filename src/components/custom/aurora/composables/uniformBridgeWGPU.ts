/**
 * Aurora WGSL uniform bridge — the typed-struct SOURCE OF TRUTH for the WebGPU primary.
 *
 * The WGSL `Uniforms` struct (`aurora.wgsl.ts`) and the JS `ArrayBuffer` write offsets
 * are generated from the SAME layout table here, so a std140-vs-WGSL alignment mismatch
 * (the parity-ΔE-blowout trap the wave's §Triumvirate names) is structurally impossible:
 * the field order + the byte offsets are ONE declaration.
 *
 * The struct packs every scalar into a vec4 lane + every per-nucleus row / palette stop
 * into a vec4 so the array stride is the natural 16 bytes (no std140 16-byte-array-stride
 * surprise). The byte layout (all offsets in bytes, std140-compatible — vec4 align 16):
 *
 *   scalars0 : vec4<f32>   off   0   (uTime, uSoftmaxBeta, uValueVariance, uWarpAmount)
 *   scalars1 : vec4<f32>   off  16   (uWarpScale, uWarpDrift, uSaturation, uPaperGrain)
 *   scalars2 : vec4<f32>   off  32   (uAlpha, uNucleiDrift, uPaletteDrift, uBreathDepth)
 *   scalars3 : vec4<f32>   off  48   (uBreathPeriod, uCursorStrength, uCursorRadius, _)
 *   cursor   : vec4<f32>   off  64   (uCursor.x, uCursor.y, _, _)
 *   ints0    : vec4<i32>   off  80   (uStopCount, uNucleiCount, uWarpMode, uNoiseOctaves)
 *   ints1    : vec4<i32>   off  96   (uMedium, uHuePath, _, _)
 *   palette  : array<vec4<f32>, 8>  off 112  (rgb linear-sRGB stop + pad)
 *   nuc0     : array<vec4<f32>, 6>  off 240  (pos.x, pos.y, radius, paletteBias)
 *   nuc1     : array<vec4<f32>, 6>  off 336  (valueBias, driftRadius, driftPhase, elong)
 *   nuc2     : array<vec4<f32>, 6>  off 432  (angle, _, _, _)
 *   scalars4 : vec4<f32>   off 528  (uStrokeAmount, uStrokeScale, uStrokeAnisotropy, uCanvasGrain)
 *   scalars5 : vec4<f32>   off 544  (uWetEdge, uGranulation, uBrokenColor, uKuwaharaQ)
 *   kuwahara : vec4<f32>   off 560  (uKuwaharaRadius, uKuwaharaSectors, _, _)
 *   total    : 576 bytes (16-aligned)
 *
 * BC.W-VIZ-AURORA (T4) — the painterly-medium scalar lanes (scalars4/scalars5/kuwahara)
 * are APPENDED after the arrays, so EVERY pre-existing offset is byte-identical and the
 * smooth-default parity capture is byte-equivalent (these lanes pack 0 on a smooth config).
 * The WGSL `Uniforms` struct (`aurora.wgsl.ts`) carries the SAME three trailing lanes —
 * the typed-struct lockstep: a one-sided add reds the parity-ΔE.
 *
 * Y-origin: config authoring is CSS-top-origin (0 = top); the bridge flips Y at the
 * uniform boundary (`flipY`), exactly as the GLSL `uniformBridge` does.
 */

import { flattenPalette } from "./color";
import {
    MEDIUM_ID,
    HUE_PATH_ID,
    WARP_ID,
} from "./uniformBridge";
import { MAX_NUCLEI, MAX_STOPS, type AuroraConfig } from "../constants/presets";
import type { CursorState } from "./cursorModel";

/** The total uniform-buffer byte size (16-aligned). */
export const AURORA_WGPU_UNIFORM_BYTES = 576;

// Float32 word offsets (byte / 4) into the buffer.
const OFF = {
    scalars0: 0,
    scalars1: 4,
    scalars2: 8,
    scalars3: 12,
    cursor: 16,
    ints0: 20, // viewed as Int32
    ints1: 24, // viewed as Int32
    palette: 28, // 8 stops × 4 words
    nuc0: 28 + 8 * 4, // 60
    nuc1: 28 + 8 * 4 + 6 * 4, // 84
    nuc2: 28 + 8 * 4 + 12 * 4, // 108
    // BC.W-VIZ-AURORA (T4) — the appended painterly-medium lanes (words 132/136/140).
    scalars4: 28 + 8 * 4 + 18 * 4, // 132 → byte 528
    scalars5: 28 + 8 * 4 + 18 * 4 + 4, // 136 → byte 544
    kuwahara: 28 + 8 * 4 + 18 * 4 + 8, // 140 → byte 560
} as const;

// BC.W-VIZ-AURORA (T4) — Kuwahara recipe defaults (mirror mediums.glsl.ts mediumKuwahara):
// radius 0.010 procedural-patch units, 8 sectors (fixed soft-overlap floor), q 4.0.
const KUWAHARA_RADIUS_DEFAULT = 0.01;
const KUWAHARA_SECTORS = 8;
const KUWAHARA_Q_DEFAULT = 4.0;

const flipY = (y: number): number => 1.0 - y;

/**
 * The packed scratch buffer + the dual ArrayBuffer views. A slider drag refills this
 * in place (no per-frame allocation) — mirroring the GLSL bridge's pre-allocated
 * upload buffers. The Float32 view writes the float lanes; the Int32 view writes the
 * two int lanes (a WGSL `i32` shares the buffer at the 16-byte-aligned offsets).
 */
export interface AuroraWGPUUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
    paletteScratch: Float32Array;
}

export function createAuroraWGPUUniformScratch(): AuroraWGPUUniformScratch {
    const buffer = new ArrayBuffer(AURORA_WGPU_UNIFORM_BYTES);
    return {
        buffer,
        f32: new Float32Array(buffer),
        i32: new Int32Array(buffer),
        paletteScratch: new Float32Array(MAX_STOPS * 3),
    };
}

/**
 * Pack an {@link AuroraConfig} + the live cursor + the frame time into the uniform
 * scratch buffer. The byte layout mirrors the WGSL `Uniforms` struct EXACTLY. Returns
 * the same scratch (the caller `queue.writeBuffer`s `scratch.buffer`).
 */
export function packAuroraWGPUUniforms(
    scratch: AuroraWGPUUniformScratch,
    cfg: AuroraConfig,
    cursor: CursorState,
    timeSec: number,
): AuroraWGPUUniformScratch {
    const { f32, i32, paletteScratch } = scratch;

    // scalars0: uTime, uSoftmaxBeta, uValueVariance, uWarpAmount
    f32[OFF.scalars0 + 0] = timeSec;
    f32[OFF.scalars0 + 1] = cfg.softmaxBeta;
    f32[OFF.scalars0 + 2] = cfg.valueVariance;
    f32[OFF.scalars0 + 3] = cfg.warpAmount;

    // scalars1: uWarpScale, uWarpDrift, uSaturation, uPaperGrain
    f32[OFF.scalars1 + 0] = cfg.warpScale;
    f32[OFF.scalars1 + 1] = cfg.warpDrift;
    f32[OFF.scalars1 + 2] = cfg.saturation;
    f32[OFF.scalars1 + 3] = cfg.paperGrain;

    // scalars2: uAlpha, uNucleiDrift, uPaletteDrift, uBreathDepth
    f32[OFF.scalars2 + 0] = cfg.alpha;
    f32[OFF.scalars2 + 1] = cfg.nucleiDrift;
    f32[OFF.scalars2 + 2] = cfg.paletteDrift;
    f32[OFF.scalars2 + 3] = cfg.breathDepth;

    // scalars3: uBreathPeriod, uCursorStrength, uCursorRadius, _pad
    f32[OFF.scalars3 + 0] = cfg.breathPeriod;
    f32[OFF.scalars3 + 1] = cursor.strength;
    f32[OFF.scalars3 + 2] = cursor.radius;
    f32[OFF.scalars3 + 3] = 0;

    // cursor: uCursor.x, flipY(uCursor.y), _, _
    f32[OFF.cursor + 0] = cursor.x;
    f32[OFF.cursor + 1] = flipY(cursor.y);
    f32[OFF.cursor + 2] = 0;
    f32[OFF.cursor + 3] = 0;

    // ints0: uStopCount, uNucleiCount, uWarpMode, uNoiseOctaves
    i32[OFF.ints0 + 0] = Math.min(cfg.palette.length, MAX_STOPS);
    const n = Math.min(cfg.nuclei.length, MAX_NUCLEI);
    i32[OFF.ints0 + 1] = n;
    i32[OFF.ints0 + 2] = WARP_ID[cfg.warpMode];
    i32[OFF.ints0 + 3] = cfg.noiseOctaves;

    // ints1: uMedium, uHuePath, _, _
    i32[OFF.ints1 + 0] = MEDIUM_ID[cfg.medium];
    i32[OFF.ints1 + 1] = HUE_PATH_ID[cfg.huePath ?? "shorter"];
    i32[OFF.ints1 + 2] = 0;
    i32[OFF.ints1 + 3] = 0;

    // palette — flatten to linear-sRGB triples, write rgb into the vec4 lanes (a=0).
    flattenPalette(cfg.palette, MAX_STOPS, paletteScratch);
    for (let i = 0; i < MAX_STOPS; i++) {
        const base = OFF.palette + i * 4;
        f32[base + 0] = paletteScratch[i * 3 + 0]!;
        f32[base + 1] = paletteScratch[i * 3 + 1]!;
        f32[base + 2] = paletteScratch[i * 3 + 2]!;
        f32[base + 3] = 0;
    }

    // nuclei — nuc0 (pos.x, pos.y, radius, paletteBias), nuc1 (valueBias, driftRadius,
    // driftPhase, elong), nuc2 (angle, _, _, _). Spare slots zeroed (gated by count).
    for (let i = 0; i < MAX_NUCLEI; i++) {
        const b0 = OFF.nuc0 + i * 4;
        const b1 = OFF.nuc1 + i * 4;
        const b2 = OFF.nuc2 + i * 4;
        if (i < n) {
            const nu = cfg.nuclei[i]!;
            f32[b0 + 0] = nu.x;
            f32[b0 + 1] = flipY(nu.y);
            f32[b0 + 2] = nu.radius;
            f32[b0 + 3] = nu.paletteBias;
            f32[b1 + 0] = nu.valueBias;
            f32[b1 + 1] = nu.driftRadius;
            f32[b1 + 2] = nu.driftPhase;
            f32[b1 + 3] = nu.elongation ?? 1.0;
            // Top-origin angles invert relative to bottom-origin shader space.
            f32[b2 + 0] = (-(nu.angle ?? 0) * Math.PI) / 180;
            f32[b2 + 1] = 0;
            f32[b2 + 2] = 0;
            f32[b2 + 3] = 0;
        } else {
            f32[b0 + 0] = 0;
            f32[b0 + 1] = 0;
            f32[b0 + 2] = 0;
            f32[b0 + 3] = 0;
            f32[b1 + 0] = 0;
            f32[b1 + 1] = 0;
            f32[b1 + 2] = 0;
            f32[b1 + 3] = 1.0;
            f32[b2 + 0] = 0;
            f32[b2 + 1] = 0;
            f32[b2 + 2] = 0;
            f32[b2 + 3] = 0;
        }
    }

    // BC.W-VIZ-AURORA (T4) — the painterly-medium scalar lanes (lockstep with the WGSL
    // `scalars4`/`scalars5`/`kuwahara` struct lanes). A smooth config carries the same
    // stroke knobs at their preset values; the WGSL `applyMedium` is a no-op at uMedium 0,
    // so packing them never perturbs the smooth-default parity capture.
    // scalars4: uStrokeAmount, uStrokeScale, uStrokeAnisotropy, uCanvasGrain
    f32[OFF.scalars4 + 0] = cfg.strokeAmount;
    f32[OFF.scalars4 + 1] = cfg.strokeScale;
    f32[OFF.scalars4 + 2] = cfg.strokeAnisotropy;
    f32[OFF.scalars4 + 3] = cfg.canvasGrain;
    // scalars5: uWetEdge, uGranulation, uBrokenColor, uKuwaharaQ
    f32[OFF.scalars5 + 0] = cfg.wetEdge;
    f32[OFF.scalars5 + 1] = cfg.granulation;
    f32[OFF.scalars5 + 2] = cfg.brokenColor;
    f32[OFF.scalars5 + 3] = cfg.kuwaharaQ ?? KUWAHARA_Q_DEFAULT;
    // kuwahara: uKuwaharaRadius, uKuwaharaSectors, _, _
    f32[OFF.kuwahara + 0] = cfg.kuwaharaRadius ?? KUWAHARA_RADIUS_DEFAULT;
    f32[OFF.kuwahara + 1] = KUWAHARA_SECTORS;
    f32[OFF.kuwahara + 2] = 0;
    f32[OFF.kuwahara + 3] = 0;

    return scratch;
}
