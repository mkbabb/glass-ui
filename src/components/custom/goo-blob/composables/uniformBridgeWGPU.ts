// GooBlob WGSL uniform bridge — the typed-struct SOURCE OF TRUTH for the WebGPU
// primary (BB.W-VIZ-SUITE / W-GOOBLOB-WGPU — serial migration #2).
//
// The WGSL `Uniforms` struct (`metaball.wgsl.ts`) and the JS `ArrayBuffer` write offsets
// are generated from the SAME layout table here, so a std140-vs-WGSL alignment mismatch
// (the parity-ΔE-blowout trap the wave's §Triumvirate names) is structurally impossible:
// the field order + the byte offsets are ONE declaration. The aurora migration (#1)
// established this pattern; this is its goo-blob twin.
//
// The struct packs every scalar into a vec4 lane + every per-satellite / per-trail /
// per-palette row into a vec4 so the array stride is the natural 16 bytes (no std140
// 16-byte-array-stride surprise). The byte layout (all offsets in bytes, std140-
// compatible — vec4 align 16):
//
//   s0   : vec4<f32>  off    0  (uTime, uBodyRadius, uPulsePhase, uPulseAmp)
//   s1   : vec4<f32>  off   16  (uNoiseAmp, uNoiseFreq, uNoiseSpeed, uWarpAmp)
//   s2   : vec4<f32>  off   32  (uSmoothK, uMerge, uMaxReach, uLit)
//   s3   : vec4<f32>  off   48  (uSpecStrength, uSpecShininess, uRimPower, uRimStrength)
//   s4   : vec4<f32>  off   64  (uIridescence, uIridHue, uIridSpeed, uSssScale)
//   s5   : vec4<f32>  off   80  (uSssPower, uCoreGlow, uHueRange, uSatShift)
//   s6   : vec4<f32>  off   96  (uBrightnessShift, uColorNoiseFreq, uColorNoiseSpeed, uStretch)
//   s7   : vec4<f32>  off  112  (uPointerActive, uPointerAttraction, uPointerStrength, _pad)
//   ptr  : vec4<f32>  off  128  (uPointer.x, uPointer.y, uVelocity.x, uVelocity.y)
//   base : vec4<f32>  off  144  (uBaseColor.rgb, _pad)
//   rim  : vec4<f32>  off  160  (uRimColor.rgb, _pad)
//   light: vec4<f32>  off  176  (uLightDir.xyz, _pad)
//   res  : vec4<f32>  off  192  (uResolution.x, uResolution.y, uShadow, uShadowSoftness)
//   ints : vec4<i32>  off  208  (uStopCount, uSatCount, uTrailCount, _pad)
//   palette  : array<vec4<f32>, 4>   off  224  (rgb gamma-sRGB stop + _pad)
//   satPos   : array<vec4<f32>, 4>   off  288  (pos.x, pos.y, radius, opacity)
//   trailPos : array<vec4<f32>, 15>  off  352  (pos.x, pos.y, radius, _pad)
//   total    : 352 + 15*16 = 592 bytes (16-aligned)
//
// The pos/vel/pointer mapping mirrors `uploadBlobUniforms.ts` EXACTLY (the `* 0.5 *
// POS_SCALE` and `* POS_SCALE` per-channel scaling, the `reachFactor`-gated trail base
// radius, the worst-case-orbit smin band widen) so the WGSL primary reads the IDENTICAL
// resolved geometry as the WebGL2 fallback.

import {
    MAX_SATS,
    TRAIL_N,
    MAX_BLOB_STOPS,
    POS_SCALE,
    FISSION_REACH_MAX,
} from "../constants";
import type { BlobConfig, MoodParams } from "../types";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";
import type { BlobFrameState } from "./uploadBlobUniforms";

/** The total uniform-buffer byte size (16-aligned). */
export const BLOB_WGPU_UNIFORM_BYTES = 352 + TRAIL_N * 16; // 592

// Float32 word offsets (byte / 4) into the buffer.
const OFF = {
    s0: 0,
    s1: 4,
    s2: 8,
    s3: 12,
    s4: 16,
    s5: 20,
    s6: 24,
    s7: 28,
    ptr: 32,
    base: 36,
    rim: 40,
    light: 44,
    res: 48,
    ints: 52, // viewed as Int32
    palette: 56, // 4 stops × 4 words
    satPos: 56 + MAX_BLOB_STOPS * 4, // 72
    trailPos: 56 + MAX_BLOB_STOPS * 4 + MAX_SATS * 4, // 88
} as const;

/**
 * The packed scratch buffer + the dual ArrayBuffer views. A frame refills this in place
 * (no per-frame allocation) — mirroring the GLSL bridge's per-frame `gl.uniformNf` writes.
 */
export interface BlobWGPUUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

export function createBlobWGPUUniformScratch(): BlobWGPUUniformScratch {
    const buffer = new ArrayBuffer(BLOB_WGPU_UNIFORM_BYTES);
    return {
        buffer,
        f32: new Float32Array(buffer),
        i32: new Int32Array(buffer),
    };
}

/**
 * Pack the resolved blob frame state into the uniform scratch buffer. The byte layout
 * mirrors the WGSL `Uniforms` struct EXACTLY, and the resolved-value math is the
 * BYTE-IDENTICAL twin of `uploadBlobUniforms.ts` (the same `* 0.5 * POS_SCALE` mapping,
 * the same `reachFactor`/`orbitWiden`/`maxReach` derivations). Returns the same scratch
 * (the caller `queue.writeBuffer`s `scratch.buffer`).
 */
export function packBlobWGPUUniforms(
    scratch: BlobWGPUUniformScratch,
    canvas: HTMLCanvasElement,
    config: BlobConfig,
    pointer: BlobPointer,
    satellites: BlobSatelliteSystem,
    frame: BlobFrameState,
): BlobWGPUUniformScratch {
    const { f32, i32 } = scratch;
    const { params, rgb, simTimeMs, timeSec, resolveColor, rimColor, paletteStops } = frame;

    const {
        geometry: cGeo,
        membrane: cMem,
        color: cCol,
        surface: cSurf,
        interaction: cInt,
    } = config;

    // ── Pointer / velocity / trail derivations (byte-identical to uploadBlobUniforms) ──
    const ptr = pointer.pointer.value;
    const netAttraction = cInt.pointerAttraction + params.pointerAttraction;
    const reachFactor = Math.max(0, Math.min(1, netAttraction));
    const vel = pointer.velocity.value;

    // ── Pulse / noise ──
    const clickPulse = pointer.pulse.value * cInt.clickImpulse;
    const pulseAmp =
        ((cMem.pulseAmp * params.pulseAmp) / 0.015 + clickPulse) * POS_SCALE;
    const pulsePhase = timeSec * cMem.pulseFreq * params.pulseFreq * Math.PI * 2;
    const noiseAmp = ((cMem.noiseAmp * params.noiseAmp) / 0.025) * POS_SCALE;

    // ── Worst-case-orbit smin band widen (BA.W-GOO-REDRESS, byte-identical) ──
    const MAX_BRIDGE_WIDEN = 1.25;
    const worstOrbitDist = cGeo.orbitRadius * 1.2 * (1 + cGeo.eccentricity);
    const nominalBand = cMem.smoothK * params.smoothK;
    const bridgeGap = Math.max(
        0,
        worstOrbitDist - cGeo.satelliteRadius - cGeo.bodyRadius,
    );
    const orbitWiden =
        nominalBand > 0
            ? Math.min(MAX_BRIDGE_WIDEN, 1 + bridgeGap / nominalBand)
            : 1;
    const smoothK = nominalBand * orbitWiden * POS_SCALE;

    // ── maxReach (byte-identical) ──
    // BD.W-GOOBLOB-MERCURY-COLONY — the colony-register fission-apex pad (the WGSL twin
    // of uploadBlobUniforms): when surface.fissionAmp > 0 the freed bead reaches the
    // bounded apex FISSION_REACH_MAX + the snap overshoot, further than worstOrbitDist;
    // the bounding-discard radius must cover it. Zero (byte-identical to HEAD) at amp 0.
    const fissionWorst =
        (config.surface.fissionAmp ?? 0) > 0 ? FISSION_REACH_MAX * 1.12 : 0;
    const satWorst = Math.max(worstOrbitDist, fissionWorst) + cGeo.satelliteRadius;
    const maxReach =
        (Math.max(cGeo.bodyRadius, satWorst) +
            nominalBand * orbitWiden +
            (cMem.noiseAmp * params.noiseAmp) / 0.025 +
            Math.abs(pointer.pulse.value) * cInt.clickImpulse) *
            POS_SCALE +
        0.1;

    // s0: uTime, uBodyRadius, uPulsePhase, uPulseAmp
    // uTime is the tempo-integrated motion clock (seconds), like the GLSL path.
    f32[OFF.s0 + 0] = simTimeMs / 1000;
    f32[OFF.s0 + 1] = cGeo.bodyRadius * POS_SCALE;
    f32[OFF.s0 + 2] = pulsePhase;
    f32[OFF.s0 + 3] = pulseAmp;

    // s1: uNoiseAmp, uNoiseFreq, uNoiseSpeed, uWarpAmp
    f32[OFF.s1 + 0] = noiseAmp;
    f32[OFF.s1 + 1] = cMem.noiseFreq;
    f32[OFF.s1 + 2] = cMem.noiseSpeed;
    f32[OFF.s1 + 3] = cMem.warpAmp;

    // BD.W-GOO-CAROUSEL-DECK — the blob↔meatball SHADING-MORPH scalar (the WGSL twin).
    // `morphT` resolves from `config.morphT` (explicit) or `variant` (back-compat: blob →
    // 0, meatball → 1). The dressing uniforms (uLit/uShadow) flip ON for ANY morph in
    // progress (morphT > 0) so an intermediate frame HAS the dressed surface to lerp
    // toward; uStage is DERIVED (1.0 at morphT <= 0 = the flat floor, else 0.0).
    const morphT =
        typeof config.morphT === "number"
            ? Math.max(0, Math.min(1, config.morphT))
            : config.variant === "blob"
              ? 0
              : 1;
    const isDressed = morphT > 0;

    // s2: uSmoothK, uMerge, uMaxReach, uLit
    f32[OFF.s2 + 0] = smoothK;
    f32[OFF.s2 + 1] = cMem.merge === "circular" ? 1.0 : 0.0;
    f32[OFF.s2 + 2] = maxReach;
    f32[OFF.s2 + 3] = isDressed && cSurf.lit ? 1.0 : 0.0;

    // s3: uSpecStrength, uSpecShininess, uRimPower, uRimStrength
    f32[OFF.s3 + 0] = cSurf.specStrength;
    f32[OFF.s3 + 1] = cSurf.specShininess;
    f32[OFF.s3 + 2] = cSurf.rimPower;
    f32[OFF.s3 + 3] = cSurf.rimStrength;

    // s4: uIridescence, uIridHue, uIridSpeed, uSssScale
    f32[OFF.s4 + 0] = cSurf.iridescence * params.iridScale;
    f32[OFF.s4 + 1] = cSurf.iridHue * (Math.PI / 180);
    f32[OFF.s4 + 2] = cSurf.iridSpeed;
    f32[OFF.s4 + 3] = cSurf.sssScale * params.iridScale;

    // s5: uSssPower, uCoreGlow, uHueRange, uSatShift
    f32[OFF.s5 + 0] = cSurf.sssPower;
    f32[OFF.s5 + 1] = cSurf.coreGlow;
    f32[OFF.s5 + 2] = cCol.hueRange + params.hueRange;
    f32[OFF.s5 + 3] = cCol.satShift + params.satShift;

    // s6: uBrightnessShift, uColorNoiseFreq, uColorNoiseSpeed, uStretch
    f32[OFF.s6 + 0] = cCol.brightnessShift + params.brightnessShift;
    f32[OFF.s6 + 1] = cCol.colorNoiseFreq;
    f32[OFF.s6 + 2] = cCol.colorNoiseSpeed;
    f32[OFF.s6 + 3] = cInt.stretch;

    // s7: uPointerActive, uPointerAttraction, uPointerStrength, uStage
    // BC.W-GOOBLOB-PLAIN — uStage rides the spare s7.w lane the SoT reserved (the
    // typed-struct extend, never a re-fork). 1.0 = the STAGE-1 plain floor
    // (variant="blob"); 0.0 = the full lit pipeline (variant="meatball").
    f32[OFF.s7 + 0] = pointer.active.value ? 1.0 : 0.0;
    f32[OFF.s7 + 1] = netAttraction;
    f32[OFF.s7 + 2] = cInt.pointerStrength * POS_SCALE;
    // uStage DERIVED from morphT (BD.W-GOO-CAROUSEL-DECK): 1.0 = the flat STAGE-1 floor.
    f32[OFF.s7 + 3] = morphT <= 0 ? 1.0 : 0.0;

    // ptr: uPointer.xy, uVelocity.xy (the `* 0.5 * POS_SCALE` mapping)
    f32[OFF.ptr + 0] = ptr.x * 0.5 * POS_SCALE;
    f32[OFF.ptr + 1] = ptr.y * 0.5 * POS_SCALE;
    f32[OFF.ptr + 2] = vel.x * 0.5 * POS_SCALE;
    f32[OFF.ptr + 3] = vel.y * 0.5 * POS_SCALE;

    // base: uBaseColor.rgb, uMorphT (the base.w lane — BD.W-GOO-CAROUSEL-DECK SHADING
    // morph scalar; the WGSL fragment reads `u.base.w`).
    f32[OFF.base + 0] = rgb[0];
    f32[OFF.base + 1] = rgb[1];
    f32[OFF.base + 2] = rgb[2];
    f32[OFF.base + 3] = morphT;

    // rim: uRimColor.rgb (resolved through the SAME /color memo as uBaseColor)
    const rim = resolveColor(rimColor);
    f32[OFF.rim + 0] = rim[0];
    f32[OFF.rim + 1] = rim[1];
    f32[OFF.rim + 2] = rim[2];
    f32[OFF.rim + 3] = 0;

    // light: uLightDir.xyz
    f32[OFF.light + 0] = cSurf.lightDir[0];
    f32[OFF.light + 1] = cSurf.lightDir[1];
    f32[OFF.light + 2] = cSurf.lightDir[2];
    f32[OFF.light + 3] = 0;

    // res: uResolution.xy, uShadow, uShadowSoftness
    // BC.W-GOOBLOB-MEATBALL — the soft-shadow march rides the spare res.z/res.w lanes the
    // typed-struct SoT reserved (the EXTEND, never a re-fork). variant=meatball flips
    // uShadow on (T1); variant=blob keeps it OFF (the STAGE-1 shadowless floor). The
    // surface.shadow flag owns the on/off WITHIN the meatball register.
    f32[OFF.res + 0] = canvas.width;
    f32[OFF.res + 1] = canvas.height;
    f32[OFF.res + 2] = isDressed && cSurf.shadow ? 1.0 : 0.0;
    f32[OFF.res + 3] = cSurf.shadowSoftness;

    // ── palette (W11.b) — write rgb into the vec4 lanes (a=0); empty → uBaseColor. ──
    const stops = paletteStops;
    const stopCount = Math.min(stops.length, MAX_BLOB_STOPS);
    for (let i = 0; i < MAX_BLOB_STOPS; i++) {
        const base = OFF.palette + i * 4;
        const css = stops[i];
        if (css) {
            const p = resolveColor(css);
            f32[base + 0] = p[0];
            f32[base + 1] = p[1];
            f32[base + 2] = p[2];
        } else {
            f32[base + 0] = rgb[0];
            f32[base + 1] = rgb[1];
            f32[base + 2] = rgb[2];
        }
        f32[base + 3] = 0;
    }

    // ── satellites — satPos[i] = (pos.x, pos.y, radius, opacity) ──
    const sats = satellites.sources;
    for (let i = 0; i < MAX_SATS; i++) {
        const b = OFF.satPos + i * 4;
        const sat = sats[i];
        if (sat) {
            f32[b + 0] = sat.x * POS_SCALE;
            f32[b + 1] = sat.y * POS_SCALE;
            f32[b + 2] = sat.radius * POS_SCALE;
            f32[b + 3] = sat.opacity;
        } else {
            f32[b + 0] = 0;
            f32[b + 1] = 0;
            f32[b + 2] = 0;
            f32[b + 3] = 0;
        }
    }

    // ── trail (W10) — trailPos[i] = (pos.x, pos.y, radius, _pad). The base radius
    //    rides reachFactor exactly as the GLSL path. ──
    const trail = pointer.trailSources(cGeo.satelliteRadius * 0.7 * reachFactor);
    for (let i = 0; i < TRAIL_N; i++) {
        const b = OFF.trailPos + i * 4;
        const t = trail.sources[i];
        if (t) {
            f32[b + 0] = t.x * 0.5 * POS_SCALE;
            f32[b + 1] = t.y * 0.5 * POS_SCALE;
            f32[b + 2] = t.radius * POS_SCALE;
        } else {
            f32[b + 0] = 0;
            f32[b + 1] = 0;
            f32[b + 2] = 0;
        }
        f32[b + 3] = 0;
    }

    // ── ints: uStopCount, uSatCount, uTrailCount, _pad ──
    i32[OFF.ints + 0] = stopCount;
    i32[OFF.ints + 1] = sats.length;
    i32[OFF.ints + 2] = trail.count;
    i32[OFF.ints + 3] = 0;

    return scratch;
}
