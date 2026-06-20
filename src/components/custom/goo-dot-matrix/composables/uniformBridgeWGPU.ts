// BC.W-VIZ-HYBRID — the goo-dot-matrix typed-struct SOURCE OF TRUTH for the dot-grid lanes
// (the §T5 SoT EXTEND, never a re-fork).
//
// The hybrid's WGSL primary rides TWO uniform bindings: @group(0)@binding(0) is the
// byte-untouched goo-blob FIELD struct (packed by the goo-blob `packBlobWGPUUniforms` — the
// SHARED field SoT, REUSED not re-forked), and @group(0)@binding(1) is the NEW dot-grid
// struct (the s8/s9/s10/s11 lanes this module owns). Splitting the dot params onto a SECOND
// binding keeps the goo-blob field struct byte-identical (the extend discipline — a re-fork
// of the 592-byte field layout would red the parity-ΔE blowout).
//
// The WGSL `DotUniforms` struct (`goo-dot.wgsl.ts`) and the JS write offsets are generated
// from the SAME layout table here, so a std140-vs-WGSL alignment mismatch is structurally
// impossible — the field order + the byte offsets are ONE declaration.
//
//   s8  : vec4<f32>  off  0  (uDotMode, uDotPixelSize, uFieldFloor, uDotBrightFloor)
//   s9  : vec4<f32>  off 16  (uDotMin, uDotMax, uPointerRadius, uPointerMode)
//   s10 : vec4<f32>  off 32  (uResX, uResY, uDpr, _pad)
//   s11 : vec4<f32>  off 48  (uPointerActive, uPointerX, uPointerY, uBloom)
//   total : 64 bytes (16-aligned)

import type { GooDotConfig } from "../constants";
import { MIN_DOT_PIXEL_SIZE } from "../constants";

/** The total dot-grid uniform-buffer byte size (16-aligned). */
export const GOO_DOT_UNIFORM_BYTES = 64;

// Float32 word offsets (byte / 4) into the buffer.
const OFF = {
    s8: 0,
    s9: 4,
    s10: 8,
    s11: 12,
} as const;

/** The dot-mode int the shader branches on (0 = smooth field dot, 1 = Bayer dither). */
export function dotModeFor(variant: GooDotConfig["variant"]): number {
    return variant === "dot-dither" ? 1 : 0;
}

/** The repel/attract sign for a pointer mode (repel pushes out, attract pulls in). */
export function pointerModeSign(mode: GooDotConfig["pointerMode"]): number {
    return mode === "attract" ? -1 : 1;
}

/** The transient dot-cursor state the interactive arm writes (closed over, never the config). */
export interface GooDotPointerState {
    /** Field-uv cursor [-0.5, 0.5] (0,0 = canvas center). */
    x: number;
    y: number;
    /** 1 while the pointer is over the host, 0 at rest (decays the influence). */
    active: number;
    /** The accel-burst brightness/scale bloom 0..1 (the flick term). */
    bloom: number;
}

/** A fresh resting dot-cursor state. */
export function restingDotPointer(): GooDotPointerState {
    return { x: 0, y: 0, active: 0, bloom: 0 };
}

export interface GooDotUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
}

export function createGooDotScratch(): GooDotUniformScratch {
    const buffer = new ArrayBuffer(GOO_DOT_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer) };
}

/**
 * Pack the per-frame dot-grid uniforms in place. `resolutionPx` drives the cell grid;
 * `pointer` carries the §T7 dot-cursor influence (parallax/swell/bloom). The field lanes are
 * packed SEPARATELY by the goo-blob `packBlobWGPUUniforms` into binding0 — this module owns
 * ONLY the dot-grid lanes (the extend).
 */
export function packGooDotUniforms(
    scratch: GooDotUniformScratch,
    config: GooDotConfig,
    resolutionPx: { w: number; h: number },
    dpr: number,
    pointer: GooDotPointerState,
): GooDotUniformScratch {
    const { f32 } = scratch;

    // s8: uDotMode, uDotPixelSize, uFieldFloor, uDotBrightFloor
    f32[OFF.s8 + 0] = dotModeFor(config.variant);
    f32[OFF.s8 + 1] = Math.max(config.dotPixelSize * dpr, MIN_DOT_PIXEL_SIZE);
    f32[OFF.s8 + 2] = config.fieldFloor;
    f32[OFF.s8 + 3] = config.dotBrightFloor;

    // s9: uDotMin, uDotMax, uPointerRadius, uPointerMode
    f32[OFF.s9 + 0] = config.dotMin;
    f32[OFF.s9 + 1] = config.dotMax;
    f32[OFF.s9 + 2] = config.pointerRadius;
    f32[OFF.s9 + 3] = pointerModeSign(config.pointerMode);

    // s10: uResX, uResY, uDpr, _pad
    f32[OFF.s10 + 0] = resolutionPx.w;
    f32[OFF.s10 + 1] = resolutionPx.h;
    f32[OFF.s10 + 2] = dpr;
    f32[OFF.s10 + 3] = 0;

    // s11: uPointerActive, uPointerX, uPointerY, uBloom
    f32[OFF.s11 + 0] = config.interactive ? pointer.active : 0;
    f32[OFF.s11 + 1] = pointer.x;
    f32[OFF.s11 + 2] = pointer.y;
    f32[OFF.s11 + 3] = pointer.bloom;

    return scratch;
}

export { restingDotPointer as restingPointer };
