// The GooBlob per-frame uniform-upload leaf — a pure write of the resolved frame
// state into the metaball program's uniforms. `blobSimulation` resolves the frame
// (advancing the mood/pointer/satellite systems and the tempo-scaled clock) and the
// renderer's WebGL2 bridge hands those resolved values here;
// this leaf does ONLY the uniform writes + the draw call. NO Vue, NO substrate,
// NO closure-state mutation — every value it reads is a parameter.

import type { BlobConfig } from "../types";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";
import {
    MAX_SATS,
    TRAIL_N,
    MAX_BLOB_STOPS,
    POS_SCALE,
    FISSION_REACH_MAX,
} from "../constants";
import type { UniformName } from "../constants";
import { resolveBlobSurface } from "./resolveBlobSurface";
import type { BlobFrameState } from "./blobSimulation";

/** The cached uniform-location set the GL setup builds once per context. */
export interface MetaballUniformLocations {
    U: Record<UniformName, WebGLUniformLocation | null>;
    satPosLocs: (WebGLUniformLocation | null)[];
    satRadLocs: (WebGLUniformLocation | null)[];
    satOpLocs: (WebGLUniformLocation | null)[];
    // Per-satellite explicit shade and weight
    // element locations (the GL color-seam widen).
    satColorLocs: (WebGLUniformLocation | null)[];
    satColorAmtLocs: (WebGLUniformLocation | null)[];
    trailPosLocs: (WebGLUniformLocation | null)[];
    trailRadLocs: (WebGLUniformLocation | null)[];
    paletteLocs: (WebGLUniformLocation | null)[];
}

/**
 * Write the resolved frame state into the metaball program's uniforms and issue
 * the draw call. Pure: it mutates GL state only (the bound program/VAO + the
 * uniform values) and never reads the renderer's closure. The body performs the
 * `drawFrame` uniform-upload writes.
 */
export function uploadBlobUniforms(
    gl: WebGL2RenderingContext,
    prog: WebGLProgram,
    vao: WebGLVertexArrayObject,
    locs: MetaballUniformLocations,
    canvas: HTMLCanvasElement,
    config: BlobConfig,
    pointer: BlobPointer,
    satellites: BlobSatelliteSystem,
    frame: BlobFrameState,
): void {
    const {
        U,
        satPosLocs,
        satRadLocs,
        satOpLocs,
        satColorLocs,
        satColorAmtLocs,
        trailPosLocs,
        trailRadLocs,
        paletteLocs,
    } = locs;
    const { params, rgb, simTimeMs, timeSec, resolveColor, rimColor, paletteStops } = frame;

    // BlobConfig atom destructure. The flat ~50-knob
    // surface collapsed to eight cohesive atoms (types.ts); the per-frame
    // upload reads the same field NAMES off the atom they belong to, so
    // the upload math is byte-identical to the flat read.
    const {
        geometry: cGeo,
        membrane: cMem,
        color: cCol,
        surface: cSurf,
        interaction: cInt,
    } = config;

    gl.useProgram(prog);
    gl.bindVertexArray(vao);

    gl.uniform2f(U.uResolution, canvas.width, canvas.height);
    // uTime is the tempo-INTEGRATED motion clock (seconds), NOT the
    // substrate's absolute clock — so the FBM noise scroll slows with
    // tempo and freezes at tempo=0 WITHOUT a discontinuity.
    gl.uniform1f(U.uTime, simTimeMs / 1000);
    gl.uniform3f(U.uBaseColor, rgb[0], rgb[1], rgb[2]);

    // Multi-stop palette — 2-4 in-family stops. EMPTY falls
    // back to uBaseColor (uStopCount <= 1). The stops arrive ALREADY
    // CONCRETE (the SFC un-wrapped any var()-token via resolveTokenColor
    // before the renderer resolves them through the `resolveColor`
    // memo (the `/color` leaf), never the DOM.
    const stops = paletteStops;
    const stopCount = Math.min(stops.length, MAX_BLOB_STOPS);
    gl.uniform1i(U.uStopCount, stopCount);
    for (let i = 0; i < MAX_BLOB_STOPS; i++) {
        const loc = paletteLocs[i] ?? null;
        const css = stops[i];
        if (css) {
            const p = resolveColor(css);
            gl.uniform3f(loc, p[0], p[1], p[2]);
        } else {
            gl.uniform3f(loc, rgb[0], rgb[1], rgb[2]);
        }
    }

    // Per-satellite explicit shade (the GL
    // color-seam widen). DEFAULT OFF: no satColors → uSatColorActive 0 → the shader's
    // blendSatColor early-returns → the derived palette is UNCHANGED. When a consumer supplies
    // explicit shades (index-aligned to the satellite array), upload each + the per-
    // satellite blend weight (1 where a shade is set, 0 where the satellite stays on the
    // derived palette). The shade strings arrive CONCRETE (the SFC un-wrapped any
    // var()-token), resolved through the SAME `resolveColor` memo as uBaseColor/uPalette.
    const satColors = frame.satColors ?? [];
    const satColorActive = satColors.some((c) => !!c) ? 1 : 0;
    gl.uniform1i(U.uSatColorActive, satColorActive);
    for (let i = 0; i < MAX_SATS; i++) {
        const colLoc = satColorLocs[i] ?? null;
        const amtLoc = satColorAmtLocs[i] ?? null;
        const css = satColors[i];
        if (css) {
            const c = resolveColor(css);
            gl.uniform3f(colLoc, c[0], c[1], c[2]);
            gl.uniform1f(amtLoc, 1.0);
        } else {
            gl.uniform3f(colLoc, rgb[0], rgb[1], rgb[2]);
            gl.uniform1f(amtLoc, 0.0);
        }
    }

    // Pointer. The NET attraction is the config lean + the mood
    // additive; compute it ONCE so the body-lean uniform AND the trail
    // pseudopod reach (below) read the SAME signed value.
    const ptr = pointer.pointer.value;
    const netAttraction = cInt.pointerAttraction + params.pointerAttraction;
    gl.uniform2f(U.uPointer, ptr.x * 0.5 * POS_SCALE, ptr.y * 0.5 * POS_SCALE);
    gl.uniform1f(U.uPointerActive, pointer.active.value ? 1.0 : 0.0);
    gl.uniform1f(U.uPointerAttraction, netAttraction);
    gl.uniform1f(U.uPointerStrength, cInt.pointerStrength * POS_SCALE);

    // The sign of the lean reaches the trail too.
    // The body uv-shift (shader, sign-fixed) now leans the BODY the right
    // way, but the decaying-radius pseudopod (the trail below) reaches
    // toward the cursor on MOVEMENT ALONE, sign-independent — so a
    // shy-away (negative) attraction would still extend a pseudopod toward
    // the cursor, and that toward-reach keeps the net centroid LEANING IN
    // even as the body shies. A shy-away creature RETRACTS its reach: gate
    // the pseudopod base radius by the POSITIVE part of the net attraction
    // (reach ~1 at the default lean, 0 once the net goes negative), so a
    // negative attraction shies the WHOLE creature — body AND pseudopod —
    // away as one. The trail count stays; the zero-radius samples paint
    // nothing.
    const reachFactor = Math.max(0, Math.min(1, netAttraction));

    // Velocity-driven squash-and-stretch. The spring velocity
    // (normalized [-1,1]/s) maps into body space like the pointer.
    const vel = pointer.velocity.value;
    gl.uniform2f(
        U.uVelocity,
        vel.x * 0.5 * POS_SCALE,
        vel.y * 0.5 * POS_SCALE,
    );
    gl.uniform1f(U.uStretch, cInt.stretch);

    // Pointer trail — decaying-radius pseudopod. The trail is
    // in the same normalized [-1,1] space as the pointer, so map it
    // exactly like uPointer (`* 0.5 * POS_SCALE`). The base radius rides
    // `reachFactor` (D2) so the pseudopod reaches toward the cursor ONLY
    // while the net lean is positive.
    const trail = pointer.trailSources(
        cGeo.satelliteRadius * 0.7 * reachFactor,
    );
    gl.uniform1i(U.uTrailCount, trail.count);
    for (let i = 0; i < TRAIL_N; i++) {
        const posLoc = trailPosLocs[i] ?? null;
        const radLoc = trailRadLocs[i] ?? null;
        const t = trail.sources[i];
        if (t) {
            gl.uniform2f(
                posLoc,
                t.x * 0.5 * POS_SCALE,
                t.y * 0.5 * POS_SCALE,
            );
            gl.uniform1f(radLoc, t.radius * POS_SCALE);
        } else {
            gl.uniform2f(posLoc, 0, 0);
            gl.uniform1f(radLoc, 0);
        }
    }

    // Body — config is the base, mood params modulate.
    gl.uniform1f(U.uBodyRadius, cGeo.bodyRadius * POS_SCALE);
    gl.uniform1f(
        U.uPulsePhase,
        timeSec * cMem.pulseFreq * params.pulseFreq * Math.PI * 2,
    );
    // normalize to idle baseline + the one-shot click impulse.
    // The pulse rings ± so it transiently fattens/thins the throb
    // amplitude — the click is FELT through the EXISTING uPulseAmp
    // channel (no parallel pulse path).
    const clickPulse = pointer.pulse.value * cInt.clickImpulse;
    gl.uniform1f(
        U.uPulseAmp,
        (((cMem.pulseAmp * params.pulseAmp) / 0.015) + clickPulse) *
            POS_SCALE,
    );

    // Surface noise — config controls shape, mood scales amplitude.
    gl.uniform1f(
        U.uNoiseAmp,
        ((cMem.noiseAmp * params.noiseAmp) / 0.025) * POS_SCALE,
    );
    gl.uniform1f(U.uNoiseFreq, cMem.noiseFreq);
    gl.uniform1f(U.uNoiseSpeed, cMem.noiseSpeed);
    gl.uniform1f(U.uWarpAmp, cMem.warpAmp);

    // Gooey — `uSmoothK` is a TRUE blend-band in the shader's UV
    // space: the smin is IQ-normalized (`k *= 4.0` in
    // sdf-body.glsl.ts) so the band == k (the seam dip at a==b is
    // exactly the uploaded k). The `/0.22` normalizer stayed deleted
    // The right deletion), but the smin band RIDES `POS_SCALE`
    // like every other length-like uniform (uBodyRadius/satRadius/
    // uPointer/noiseAmp all carry the 0.625 inner-region compression):
    // the merge inflation is measured in the SAME UV space as the
    // radii, so it must carry the same compression or it is 1.6×
    // oversized relative to every other length (the second half of
    // the previous flood). The mood `smoothK` is now a unitless,
    // 1.0-centred MULTIPLIER (idle ≈ 1.0): the config holds the ONE
    // absolute band, mood scales it — there is no split-length regime,
    // so no `/DEFAULTS` ratio normalization is needed.
    //
    // Worst-case-orbit bridge widening. The nominal band rides POS_SCALE but
    // NOT the orbit random worst case: `useBlobSatellites` inflates each
    // satellite's orbit by an uncapped ×0.8..1.2 (`baseR`) on the Y-long
    // eccentric axis, so the worst-case satellite CENTER sits at
    // `orbitRadius × 1.2 × (1+ecc)` (the SAME `satWorst` term the uMaxReach
    // bounding-discard below already sums). At the high excursion the
    // satellite NEAR-EDGE (`worstOrbitDist − satelliteRadius`) leaves the
    // body edge by a GAP the nominal band cannot bridge → an instantaneous
    // fully-detached disc with no gooey neck (the fail state). The
    // fix scales the band by the worst-case orbit GAP so the smin neck
    // persists across the WHOLE orbit envelope, not only the nominal frame.
    //
    // SELF-TARGETING + LEAN-SAFE: the widen is keyed off `bridgeGap` — how
    // far the worst-case satellite near-edge sits BEYOND the body edge —
    // which is NEGATIVE (clamped to 0) when the satellite is well-inside the
    // body (the library BLOB_CONFIG_DEFAULTS: orbit 0.17, near-edge ≈ 0.132
    // INSIDE body 0.22 → gap 0, factor 1.0, the band BYTE-IDENTICAL so the
    // the body lean does not move) and grows only when there
    // IS a gap to bridge (the studio Calm bead: orbit 0.30, near-edge ≈
    // 0.274 BEYOND body 0.22 → gap ≈ 0.054). The factor adds band toward the
    // gap and is CLAMPED to `MAX_BRIDGE_WIDEN` (×1.25) so the widen can never
    // run the resting body lean away from the gated calm-lean ceiling
    // nor over-inflate the painted footprint past its containment ceiling. The
    // capped per-satellite orbit-random/wobble envelope (useBlobSatellites.ts)
    // carries the rest of the bridge-hold, so the band only needs a gentle
    // worst-case lift. All terms ride POS_SCALE in the SAME inner-region UV
    // space as the radii (no split-length regime). NO orbit/length constant is
    // edited here — this is a READ of the worst-case excursion the orbit atoms
    // already define.
    const MAX_BRIDGE_WIDEN = 1.25;
    const worstOrbitDist = cGeo.orbitRadius * 1.2 * (1 + cGeo.eccentricity);
    const nominalBand = cMem.smoothK * params.smoothK;
    const bridgeGap = Math.max(
        0,
        worstOrbitDist - cGeo.satelliteRadius - cGeo.bodyRadius,
    );
    // The band must span ~the gap to keep a neck across it; add the gap on
    // top of the nominal band, clamped so the body self-seam never over-leans.
    const orbitWiden =
        nominalBand > 0
            ? Math.min(MAX_BRIDGE_WIDEN, 1 + bridgeGap / nominalBand)
            : 1;
    gl.uniform1f(U.uSmoothK, nominalBand * orbitWiden * POS_SCALE);
    gl.uniform1f(U.uMerge, cMem.merge === "circular" ? 1.0 : 0.0);

    // The single clamped surface axis. `uStage` is derived: the flat endpoint skips
    // dressing work; every value above it runs and interpolates the dressed surface.
    const { morphT, dressed: isDressed } = resolveBlobSurface(config);
    gl.uniform1f(U.uMorphT, morphT);
    gl.uniform1f(U.uStage, morphT <= 0 ? 1.0 : 0.0);

    // Pre-FBM bounding-discard radius in UV space.
    // The fragment early-outs to a transparent write for any pixel
    // OUTSIDE this radius BEFORE the two 3-octave FBM calls + the OKLCh
    // round-trip — the oversized canvas runs the full ALU on a large
    // transparent border otherwise. uMaxReach is the worst-case painted
    // reach PADDED so it NEVER clips the wet meniscus (IQ: inflate the
    // bounding radius to match any outward-expanding op). It sums every
    // outward term — body + the eccentric satellite orbit (the Y-long
    // axis, ×1.2 random baseR × (1+ecc)) + the satellite radius + the
    // smin blend band + the FBM edge amplitude + the click-pulse — all
    // riding POS_SCALE (the same inner-region compression the radii ride),
    // plus a 0.10 UV safety pad for the pointer-lean excursion and the
    // squash stretch. NO length constant is edited (own those);
    // this is a READ of them.
    //
    // The pad sums the widened smin band (`nominalBand *
    // orbitWiden`, computed above), not the nominal, so the worst-case-orbit
    // bridge widen can NEVER push the wet meniscus past the bounding-discard
    // and get clipped (the scope-2 pad-confirm: the widened band exceeds the
    // nominal, so the pad must track it).
    // When the colony register is armed
    // (surface.fissionAmp > 0) the fissioning satellite breathes OUT to the
    // bounded apex FISSION_REACH_MAX (0.40) with a ~12% snap overshoot — FURTHER
    // than the bonded `worstOrbitDist`. The bounding-discard radius must cover that
    // pinch reach or the freed bead clips the pre-FBM early-out. A READ of the
    // config register (no new uniform); zero when fissionAmp is 0 so the calm
    // default's maxReach is UNCHANGED at fissionAmp 0 (the zero-delta-default contract).
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
    gl.uniform1f(U.uMaxReach, maxReach);

    // Color perturbation
    gl.uniform1f(U.uHueRange, cCol.hueRange + params.hueRange);
    gl.uniform1f(U.uSatShift, cCol.satShift + params.satShift);
    gl.uniform1f(
        U.uBrightnessShift,
        cCol.brightnessShift + params.brightnessShift,
    );
    gl.uniform1f(U.uColorNoiseFreq, cCol.colorNoiseFreq);
    gl.uniform1f(U.uColorNoiseSpeed, cCol.colorNoiseSpeed);

    // Lit glass surface — Blinn-Phong glint + Fresnel rim.
    // `uRimColor` arrives ALREADY CONCRETE (the SFC un-wrapped any
    // var()-token via resolveTokenColor) and resolves through
    // the SAME `resolveColor` memo (the `/color` leaf) as `uBaseColor`,
    // never the DOM. Gated behind `uLit` (default lit).
    // Dressing uniforms flip on for any morph in progress
    // (morphT > 0), so an intermediate morph
    // frame HAS the dressed surface to LERP toward (the shader's `mix(flatRgb, rgb,
    // morphT)`). At morphT == 0 (pure blob) the shader early-returns before reaching the
    // lit/shadow blocks (zero cost), so leaving uLit/uShadow on for morphT == 0 is moot,
    // but we gate them off there anyway for clarity + a true byte-identical blob upload.
    gl.uniform1f(U.uLit, isDressed && cSurf.lit ? 1.0 : 0.0);
    const rim = resolveColor(rimColor);
    gl.uniform3f(U.uRimColor, rim[0], rim[1], rim[2]);
    gl.uniform3f(
        U.uLightDir,
        cSurf.lightDir[0],
        cSurf.lightDir[1],
        cSurf.lightDir[2],
    );
    gl.uniform1f(U.uSpecStrength, cSurf.specStrength);
    gl.uniform1f(U.uSpecShininess, cSurf.specShininess);
    gl.uniform1f(U.uRimPower, cSurf.rimPower);
    gl.uniform1f(U.uRimStrength, cSurf.rimStrength);
    // Procedural soft-shadow march (the GLSL twin). The
    // EXPENSIVE secondary march is on only when dressing (morphT > 0 — the SLOW-fix:
    // a pure blob pays zero shadow-march cost via the morphT == 0 early-return).
    gl.uniform1f(U.uShadow, isDressed && cSurf.shadow ? 1.0 : 0.0);
    gl.uniform1f(U.uShadowSoftness, cSurf.shadowSoftness);

    // Iridescence + fake-SSS. iridHue is degrees in config,
    // radians in-shader. Mood routes the sheen intensity (excited =
    // stronger shimmer, sleepy = nearly flat) via params.iridScale.
    gl.uniform1f(
        U.uIridescence,
        cSurf.iridescence * params.iridScale,
    );
    gl.uniform1f(U.uIridHue, cSurf.iridHue * (Math.PI / 180));
    gl.uniform1f(U.uIridSpeed, cSurf.iridSpeed);
    gl.uniform1f(U.uSssScale, cSurf.sssScale * params.iridScale);
    gl.uniform1f(U.uSssPower, cSurf.sssPower);
    gl.uniform1f(U.uCoreGlow, cSurf.coreGlow);

    // Satellites
    const sats = satellites.sources;
    gl.uniform1i(U.uSatCount, sats.length);
    for (let i = 0; i < MAX_SATS; i++) {
        const posLoc = satPosLocs[i] ?? null;
        const radLoc = satRadLocs[i] ?? null;
        const opLoc = satOpLocs[i] ?? null;
        const sat = sats[i];
        if (sat) {
            gl.uniform2f(posLoc, sat.x * POS_SCALE, sat.y * POS_SCALE);
            gl.uniform1f(radLoc, sat.radius * POS_SCALE);
            gl.uniform1f(opLoc, sat.opacity);
        } else {
            gl.uniform2f(posLoc, 0, 0);
            gl.uniform1f(radLoc, 0);
            gl.uniform1f(opLoc, 0);
        }
    }

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindVertexArray(null);
}
