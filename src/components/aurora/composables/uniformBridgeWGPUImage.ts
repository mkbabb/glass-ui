/**
 * Aurora WGSL IMAGE uniform bridge — the typed-struct source-of-truth for the
 * `source:"image"` WebGPU program.
 *
 * DISTINCT from `uniformBridgeWGPU.ts` (the 672-byte palette struct): the image program
 * is a SEPARATE compiled pipeline with its OWN, smaller uniform buffer + its own bind
 * group (uniform + texture + sampler). The image lane never touches the palette struct —
 * the construction-time permutation's isolation, so the palette parity capture is
 * byte-untouched.
 *
 * The byte layout (all offsets in bytes, std140-compatible — vec4 align 16) MIRRORS the
 * `ImageUniforms` WGSL struct (`aurora-image.wgsl.ts`) EXACTLY:
 *
 *   scalars0: vec4<f32>            off   0   (uTime, uWarpAmount, uWarpScale, uWarpDrift)
 *   scalars1: vec4<f32>            off  16   (uSoftmaxBeta, uNucleiDrift, uCursorStrength, uCursorRadius)
 *   scalars2: vec4<f32>            off  32   (uSaturation, uPaperGrain, uAlpha, uVividness)
 *   image: vec4<f32>            off  48   (uBlurMin, uBlurMax, uImageAspect, _)
 *   cursor: vec4<f32>            off  64   (uCursor.x, uCursor.y, _, _)
 *   ints: vec4<i32>            off  80   (uNucleiCount, uNoiseOctaves, _, _)
 *   nuc0: array<vec4<f32>, 8>  off  96   (pos.x, pos.y, radius, valueBias)
 *   nuc1: array<vec4<f32>, 8>  off 224   (driftRadius, driftPhase, elong, angle)
 *   total: 352 bytes (16-aligned)
 */

import {
    DEFAULT_VIVIDNESS,
    IMAGE_BLUR_MIN_DEFAULT,
    IMAGE_BLUR_MAX_DEFAULT,
    MAX_NUCLEI,
    type AuroraConfig,
} from "../constants/presets";
import type { AuroraCursorUniforms } from "./uniformBridge";

/** The total image-uniform-buffer byte size (16-aligned). */
export const AURORA_IMAGE_WGPU_UNIFORM_BYTES = 352;

// Float32 word offsets (byte, 4) into the buffer.
const OFF = {
    scalars0: 0,
    scalars1: 4,
    scalars2: 8,
    image: 12,
    cursor: 16,
    ints: 20, // viewed as Int32
    nuc0: 24, // 8 rows × 4 words
    nuc1: 56, // 8 rows × 4 words
} as const;

const flipY = (y: number): number => 1.0 - y;

export interface AuroraImageWGPUScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

export function createAuroraImageWGPUScratch(): AuroraImageWGPUScratch {
    const buffer = new ArrayBuffer(AURORA_IMAGE_WGPU_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/**
 * Pack an {@link AuroraConfig} + the live cursor + the frame time + the live canvas
 * aspect into the image-uniform scratch buffer. The byte layout mirrors the
 * `ImageUniforms` WGSL struct EXACTLY.
 */
export function packAuroraImageWGPUUniforms(
    scratch: AuroraImageWGPUScratch,
    cfg: AuroraConfig,
    cursor: AuroraCursorUniforms,
    timeSec: number,
    aspect: number,
    outputAlpha = cfg.alpha,
): AuroraImageWGPUScratch {
    const { f32, i32 } = scratch;

    // scalars0: uTime, uWarpAmount, uWarpScale, uWarpDrift
    f32[OFF.scalars0 + 0] = timeSec;
    f32[OFF.scalars0 + 1] = cfg.warpAmount;
    f32[OFF.scalars0 + 2] = cfg.warpScale;
    f32[OFF.scalars0 + 3] = cfg.warpDrift;

    // scalars1: uSoftmaxBeta, uNucleiDrift, uCursorStrength, uCursorRadius
    f32[OFF.scalars1 + 0] = cfg.softmaxBeta;
    f32[OFF.scalars1 + 1] = cfg.nucleiDrift;
    f32[OFF.scalars1 + 2] = cursor.strength;
    f32[OFF.scalars1 + 3] = cursor.radius;

    // scalars2: uSaturation, uPaperGrain, uAlpha, uVividness
    f32[OFF.scalars2 + 0] = cfg.saturation;
    f32[OFF.scalars2 + 1] = cfg.paperGrain;
    f32[OFF.scalars2 + 2] = outputAlpha;
    f32[OFF.scalars2 + 3] = cfg.vividness ?? DEFAULT_VIVIDNESS;

    // image: uBlurMin, uBlurMax, uImageAspect, _
    f32[OFF.image + 0] = cfg.imageBlur?.min ?? IMAGE_BLUR_MIN_DEFAULT;
    f32[OFF.image + 1] = cfg.imageBlur?.max ?? IMAGE_BLUR_MAX_DEFAULT;
    f32[OFF.image + 2] = aspect;
    f32[OFF.image + 3] = 0;

    // cursor: uCursor.x, flipY(uCursor.y), _, _
    f32[OFF.cursor + 0] = cursor.x;
    f32[OFF.cursor + 1] = flipY(cursor.y);
    f32[OFF.cursor + 2] = 0;
    f32[OFF.cursor + 3] = 0;

    // ints: uNucleiCount, uNoiseOctaves, _, _
    const n = Math.min(cfg.nuclei.length, MAX_NUCLEI);
    i32[OFF.ints + 0] = n;
    i32[OFF.ints + 1] = cfg.noiseOctaves;
    i32[OFF.ints + 2] = 0;
    i32[OFF.ints + 3] = 0;

    // nuc0 (pos.x, pos.y, radius, valueBias); nuc1 (driftRadius, driftPhase, elong, angle).
    for (let i = 0; i < MAX_NUCLEI; i++) {
        const b0 = OFF.nuc0 + i * 4;
        const b1 = OFF.nuc1 + i * 4;
        if (i < n) {
            const nu = cfg.nuclei[i]!;
            f32[b0 + 0] = nu.x;
            f32[b0 + 1] = flipY(nu.y);
            f32[b0 + 2] = nu.radius;
            f32[b0 + 3] = nu.valueBias;
            f32[b1 + 0] = nu.driftRadius;
            f32[b1 + 1] = nu.driftPhase;
            f32[b1 + 2] = nu.elongation ?? 1.0;
            f32[b1 + 3] = (-(nu.angle ?? 0) * Math.PI) / 180;
        } else {
            f32[b0 + 0] = 0;
            f32[b0 + 1] = 0;
            f32[b0 + 2] = 0;
            f32[b0 + 3] = 0;
            f32[b1 + 0] = 0;
            f32[b1 + 1] = 0;
            f32[b1 + 2] = 1.0;
            f32[b1 + 3] = 0;
        }
    }

    return scratch;
}
