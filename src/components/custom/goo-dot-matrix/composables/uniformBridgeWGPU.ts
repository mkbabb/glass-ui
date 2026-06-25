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
//   s10 : vec4<f32>  off 32  (uResX, uResY, uDpr, uShadowGate)
//   s11 : vec4<f32>  off 48  (uPointerActive, uPointerX, uPointerY, uBloom)
//   s12 : vec4<f32>  off 64  (uPresenceFloor, uWeldLo, uWeldHi, uTime)
//   s13 : vec4<f32>  off 80  (uWeldSwell, uWeldSpecular, uFlowAmt, uLatticeSquash)
//   total : 96 bytes (16-aligned)
//
// BD.W-GOODOT-LIQUID-FIELD — the s12/s13 lanes carry the liquid-field read: the φ-banded
// presence floor (Move 1), the neck-ridge weld band + swell + specular (Move 2), the live sim
// time for the φ-twinkle, the liquid-lattice flow + volume-preserving squash (Move 4b). The
// field struct (binding0) stays byte-identical; the dot struct extends in place (the SoT
// extend, never a re-fork). The GLSL twin sets the matching N named `gl.uniform1f` scalars; a
// unit asserts the GLSL `dU.*` count == the WGSL lane-field count (a dropped uniform reds).

import type { GooDotConfig } from "../constants";
import { MIN_DOT_PIXEL_SIZE } from "../constants";

/** The total dot-grid uniform-buffer byte size (16-aligned — 6 vec4 lanes). */
export const GOO_DOT_UNIFORM_BYTES = 96;

// The weld band — the rim/iso `fCell` window where two membranes meet (the merge waist sits
// just inside the silhouette). The weld gates on this band, NOT on `core` (which is lower at
// the waist and would suppress the weld exactly where it must be loudest).
export const WELD_LO = 0.1;
export const WELD_HI = 0.45;

// Float32 word offsets (byte / 4) into the buffer.
const OFF = {
    s8: 0,
    s9: 4,
    s10: 8,
    s11: 12,
    s12: 16,
    s13: 20,
} as const;

/** The dot-mode int the shader branches on (0 = smooth field dot, 1 = Bayer dither). */
export function dotModeFor(variant: GooDotConfig["variant"]): number {
    return variant === "dot-dither" ? 1 : 0;
}

/** The repel/attract sign for a pointer mode (repel pushes out, attract pulls in). */
export function pointerModeSign(mode: GooDotConfig["pointerMode"]): number {
    return mode === "attract" ? -1 : 1;
}

/** The transient dot-cursor + liquid-field state the renderer writes per-frame (closed over,
 * never the config). The cursor push (Move 3 shadow offset, the cursor swell) AND the
 * liquid-lattice clock (Move 4b twinkle + squash) ride here so the per-frame pack reads ONE
 * transient struct. */
export interface GooDotPointerState {
    /** Field-uv cursor [-0.5, 0.5] (0,0 = canvas center). */
    x: number;
    y: number;
    /** 1 while the pointer is over the host, 0 at rest (decays the influence). */
    active: number;
    /** The accel-burst brightness/scale bloom 0..1 (the flick term, the velocity tell). */
    bloom: number;
    /** The live sim clock (s) for the φ-twinkle breathing — the field's `breath`/`hash21` phase. */
    timeSec: number;
    /** The volume-preserving lattice squash (Move 4b): the X scale on the pulse + a fast drag;
     * the shader applies `1/squash` on Y so the cell area ≈ 1 (a liquid lean, not a balloon). */
    latticeSquash: number;
}

/** A fresh resting dot-cursor state. */
export function restingDotPointer(): GooDotPointerState {
    return { x: 0, y: 0, active: 0, bloom: 0, timeSec: 0, latticeSquash: 1 };
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

    // s10: uResX, uResY, uDpr, uShadowGate (the cartoon shadow needs an opaque ground to cast
    // onto — gated on fieldGround != "transparent", per the no-dark-halos-on-a-light-host fold).
    f32[OFF.s10 + 0] = resolutionPx.w;
    f32[OFF.s10 + 1] = resolutionPx.h;
    f32[OFF.s10 + 2] = dpr;
    f32[OFF.s10 + 3] = config.fieldGround === "transparent" ? 0 : 1;

    // s11: uPointerActive, uPointerX, uPointerY, uBloom
    f32[OFF.s11 + 0] = config.interactive ? pointer.active : 0;
    f32[OFF.s11 + 1] = pointer.x;
    f32[OFF.s11 + 2] = pointer.y;
    f32[OFF.s11 + 3] = pointer.bloom;

    // s12: uPresenceFloor, uWeldLo, uWeldHi, uTime (Move 1 + Move 2 band + the twinkle clock)
    f32[OFF.s12 + 0] = config.presenceFloor;
    f32[OFF.s12 + 1] = WELD_LO;
    f32[OFF.s12 + 2] = WELD_HI;
    f32[OFF.s12 + 3] = pointer.timeSec;

    // s13: uWeldSwell, uWeldSpecular, uFlowAmt, uLatticeSquash (Move 2 ridge + Move 4b lattice)
    f32[OFF.s13 + 0] = config.weldSwell;
    f32[OFF.s13 + 1] = config.weldSpecular;
    f32[OFF.s13 + 2] = config.flowAmt;
    f32[OFF.s13 + 3] = pointer.latticeSquash;

    return scratch;
}

export { restingDotPointer as restingPointer };
