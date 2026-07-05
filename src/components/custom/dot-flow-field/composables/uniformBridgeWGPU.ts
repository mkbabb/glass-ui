// BG.W-DOTFLOW-REBUILD — the typed-struct SOURCE OF TRUTH for the STREAMLINE render uniforms.
//
// ONE derivation (`deriveStreamUniforms`) maps the author `FlowFieldConfig` → the flat scalar
// set BOTH backends read: the WGPU packer (`packFlowUniforms`) writes them into the 13-vec4
// std140 buffer the WGSL `struct U` reads by lane; the WebGL2 setup uploads the SAME scalars via
// `gl.uniform*`. So the field the WGSL fragment and the GLSL fragment (and the JS round-trip)
// evaluate is byte-identical — a std140-vs-WGSL alignment / transcription drift is structurally
// impossible (the field order + the byte offsets are ONE declaration).
//
// The compute + storage-particle + trail-ping-pong buffers are GONE (the streamline render is a
// single fullscreen-fragment pass — no compute uniforms, no particle seed).

import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import { MAX_FLOW_STOPS, type FlowFieldConfig } from "../constants";
import type { StreamFieldParams } from "./flowField";
import { FLOW_LINE_SPACING } from "./flowField";

/** The live pointer state the renderer feeds the stream field each frame (domain space). */
export interface FlowPointerState {
    /** Cursor in domain space (x aspect-scaled: [-aspect,aspect] × [-1,1]). */
    cursorX: number;
    cursorY: number;
    /** The velocity-scaled push strength (0 at rest). */
    strength: number;
    /** Pointer active (1) / inert (0). */
    active: number;
}

/** A rest (pointer-inert) state — the streamlines sit un-bent. */
export const FLOW_POINTER_REST: FlowPointerState = {
    cursorX: 0,
    cursorY: 0,
    strength: 0,
    active: 0,
};

/** Fixed spatial/temporal constants the derivation reads (the proportion ladder). */
export const FLOW_UND_FREQ = 4.0; // ~2-3 undulation crests across the width
export const FLOW_WEAVE_FREQ = 3.0; // the interweave spatial frequency
export const FLOW_WEAVE_ANGLE_DEG = 35; // the 2nd-direction weave angle
export const FLOW_CURL_SCALE = 1.6; // the curl-noise domain scale
export const FLOW_CURL_DRIFT_MUL = 0.25; // curlDrift = flowSpeed × this
export const FLOW_UND_SPEED_MUL = 0.8; // undSpeed = flowSpeed × this
export const FLOW_WEAVE_SPEED_MUL = 1.1; // weaveSpeed = flowSpeed × this

/** The full derived scalar set the WGPU buffer + the GL uniforms + the JS round-trip read. */
export interface StreamUniforms {
    time: number;
    aspect: number;
    /** p-space size of one device pixel (2 / backingHeightPx) — drives the AA feather. */
    px: number;
    flowSlope: number;
    undAmp: number;
    undFreq: number;
    undSpeed: number;
    weaveAmp: number;
    weaveFreq: number;
    weaveSpeed: number;
    weaveDirX: number;
    weaveDirY: number;
    curlWarp: number;
    curlScale: number;
    curlDrift: number;
    lineSpacing: number;
    /** thread half-width in p-space (already dpr-corrected to CSS px). */
    lineHalfWidth: number;
    lineStrength: number;
    beadSlope: number;
    beadDrift: number;
    /** bead dot radius in p-space (already dpr-corrected to CSS px). */
    beadRadius: number;
    contrast: number;
    pointerX: number;
    pointerY: number;
    pointerStrength: number;
    pointerRadius: number;
    pointerActive: number;
    stopCount: number;
    /** floor.rgb (linear-sRGB). */
    floorLin: [number, number, number];
    /** palette stops baked to linear-sRGB (MAX_FLOW_STOPS entries). */
    paletteLin: [number, number, number][];
}

/**
 * The ONE derivation: author `FlowFieldConfig` → the flat scalar set both backends read.
 * `aspect` = backingW/backingH; `backingHeightPx` sizes the AA feather; `dpr` maps the CSS-px
 * dot/thread sizes to p-space. `pointer` is the live cursor (rest = un-bent).
 */
export function deriveStreamUniforms(
    config: FlowFieldConfig,
    timeSec: number,
    aspect: number,
    backingHeightPx: number,
    dpr: number,
    palette: OklchStop[],
    pointer: FlowPointerState = FLOW_POINTER_REST,
): StreamUniforms {
    const flowSpeed = config.flowSpeed;
    // flowSlope: #contours over y∈[-1,1] ≈ 2·flowSlope / lineSpacing → flowSlope ≈ lineCount/2.
    const flowSlope = Math.max(config.lineCount, 2) / 2;
    const px = 2 / Math.max(backingHeightPx, 1);
    // CSS-px in p-space: px × dpr = 2 / cssHeightPx (a dot/thread stays a constant CSS size).
    const cssPx = px * Math.max(dpr, 1);
    const weaveRad = (FLOW_WEAVE_ANGLE_DEG * Math.PI) / 180;

    const stopCount = Math.min(Math.max(palette.length, 1), MAX_FLOW_STOPS);
    const paletteLin: [number, number, number][] = [];
    for (let i = 0; i < MAX_FLOW_STOPS; i++) {
        const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
        const lin = oklchToLinear(stop);
        paletteLin.push([lin[0], lin[1], lin[2]]);
    }
    const floor = oklchToLinear(config.floor);

    return {
        time: timeSec,
        aspect,
        px,
        flowSlope,
        undAmp: config.undulation,
        undFreq: FLOW_UND_FREQ,
        undSpeed: flowSpeed * FLOW_UND_SPEED_MUL,
        weaveAmp: config.interweave,
        weaveFreq: FLOW_WEAVE_FREQ,
        weaveSpeed: flowSpeed * FLOW_WEAVE_SPEED_MUL,
        weaveDirX: Math.cos(weaveRad),
        weaveDirY: Math.sin(weaveRad),
        curlWarp: config.curlWarp,
        curlScale: FLOW_CURL_SCALE,
        curlDrift: flowSpeed * FLOW_CURL_DRIFT_MUL,
        lineSpacing: FLOW_LINE_SPACING,
        lineHalfWidth: config.lineWidth * cssPx * 0.5,
        lineStrength: config.lineStrength,
        // beadSlope: #beads across the width (span 2·aspect) = 2·aspect·beadSlope → beadSlope.
        beadSlope: config.beadDensity / Math.max(2 * aspect, 1e-3),
        beadDrift: config.beadDrift,
        beadRadius: config.dotSize * cssPx * 0.5,
        contrast: config.contrast,
        pointerX: config.interactive ? pointer.cursorX : 0,
        pointerY: config.interactive ? pointer.cursorY : 0,
        pointerStrength: config.interactive ? pointer.strength : 0,
        pointerRadius: config.pointerRadius,
        pointerActive: config.interactive && pointer.active > 0.5 ? 1 : 0,
        stopCount,
        floorLin: [floor[0], floor[1], floor[2]],
        paletteLin,
    };
}

/** Project the derived render uniforms onto the field-only `StreamFieldParams` (the JS twin the
 *  WGSL/GLSL `sampleStreamField` transcribe — the S3 round-trip anchor). */
export function toStreamFieldParams(u: StreamUniforms): StreamFieldParams {
    return {
        time: u.time,
        flowSlope: u.flowSlope,
        undAmp: u.undAmp,
        undFreq: u.undFreq,
        undSpeed: u.undSpeed,
        weaveAmp: u.weaveAmp,
        weaveFreq: u.weaveFreq,
        weaveSpeed: u.weaveSpeed,
        weaveDirX: u.weaveDirX,
        weaveDirY: u.weaveDirY,
        curlWarp: u.curlWarp,
        curlScale: u.curlScale,
        curlDrift: u.curlDrift,
        pointerX: u.pointerX,
        pointerY: u.pointerY,
        pointerStrength: u.pointerStrength,
        pointerRadius: u.pointerRadius,
        pointerActive: u.pointerActive,
    };
}

// ── The WGPU uniform buffer (13 × vec4<f32> = 208 bytes) ─────────────────────────
//   v0     (time, aspect, px, flowSlope)
//   v1     (undAmp, undFreq, undSpeed, _)
//   v2     (weaveAmp, weaveFreq, weaveSpeed, _)
//   v3     (weaveDirX, weaveDirY, curlWarp, curlScale)
//   v4     (curlDrift, lineSpacing, lineHalfWidth, lineStrength)
//   v5     (beadSlope, beadDrift, beadRadius, contrast)
//   v6     (pointerX, pointerY, pointerStrength, pointerRadius)
//   v7     (pointerActive, stopCount, _, _)
//   floorC (floor.rgb, _)
//   palette array<vec4, 4>
export const FLOW_WGPU_UNIFORM_BYTES = 13 * 16;

export interface FlowUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
}

export function createFlowScratch(): FlowUniformScratch {
    const buffer = new ArrayBuffer(FLOW_WGPU_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer) };
}

/** Pack the derived stream uniforms into the WGPU std140 buffer, lane-for-lane with `struct U`. */
export function packFlowUniforms(
    scratch: FlowUniformScratch,
    u: StreamUniforms,
): FlowUniformScratch {
    const f = scratch.f32;
    // v0
    f[0] = u.time; f[1] = u.aspect; f[2] = u.px; f[3] = u.flowSlope;
    // v1
    f[4] = u.undAmp; f[5] = u.undFreq; f[6] = u.undSpeed; f[7] = 0;
    // v2
    f[8] = u.weaveAmp; f[9] = u.weaveFreq; f[10] = u.weaveSpeed; f[11] = 0;
    // v3
    f[12] = u.weaveDirX; f[13] = u.weaveDirY; f[14] = u.curlWarp; f[15] = u.curlScale;
    // v4
    f[16] = u.curlDrift; f[17] = u.lineSpacing; f[18] = u.lineHalfWidth; f[19] = u.lineStrength;
    // v5
    f[20] = u.beadSlope; f[21] = u.beadDrift; f[22] = u.beadRadius; f[23] = u.contrast;
    // v6
    f[24] = u.pointerX; f[25] = u.pointerY; f[26] = u.pointerStrength; f[27] = u.pointerRadius;
    // v7
    f[28] = u.pointerActive; f[29] = u.stopCount; f[30] = 0; f[31] = 0;
    // floorC
    f[32] = u.floorLin[0]; f[33] = u.floorLin[1]; f[34] = u.floorLin[2]; f[35] = 0;
    // palette (4 stops)
    for (let i = 0; i < MAX_FLOW_STOPS; i++) {
        const base = 36 + i * 4;
        const s = u.paletteLin[i] ?? u.paletteLin[0];
        f[base] = s[0]; f[base + 1] = s[1]; f[base + 2] = s[2]; f[base + 3] = 0;
    }
    return scratch;
}
