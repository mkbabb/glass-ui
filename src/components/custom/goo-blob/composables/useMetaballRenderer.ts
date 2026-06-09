import { watch, onUnmounted, type Ref } from "vue";
import { createWebGLCanvas } from "../../../../composables/glass/webgl/useWebGLCanvas";
import { useIntersectionPause } from "../../../../composables/motion/useIntersectionPause";
// AV.W14 — the error-checked compile/link is the shared `glass/webgl/compile`
// leaf; goo-blob keeps its `[GooBlob]` diagnostic label via the `label` arg.
import { compileShader, linkProgram } from "../../../../composables/glass/webgl/compile";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { ColorResolver } from "../../../../composables/color";
import { METABALL_VERTEX_SRC } from "../shaders/metaball.vert";
import { METABALL_FRAGMENT_SRC } from "../shaders/metaball.frag";
import type { BlobConfig } from "../types";
import type { BlobMoodSystem } from "./useBlobMood";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";

const MAX_SATS = 4;
/** Compile-time trail length — mirrors `TRAIL_N` in metaball.frag.ts + useBlobPointer.ts. */
const TRAIL_N = 15;
/** Compile-time palette cap — mirrors `MAX_BLOB_STOPS` in metaball.frag.ts. */
const MAX_BLOB_STOPS = 4;

/** Diagnostic label for the shared compile/link error path (AV.W14). */
const BLOB_LABEL = "[GooBlob]";

/**
 * Canvas is CSS-sized 1.6x its layout wrapper (see GooBlob.vue). Positions are in
 * [-0.5, 0.5] normalized space mapped to canvas UVs. To make the layout footprint
 * represent the "visible blob region" and have the extra 60% of canvas serve as
 * overflow margin for satellite orbits, scale all length-like uniforms by
 * 1/1.6 = 0.625.
 */
const POS_SCALE = 1 / 1.6;

const UNIFORM_NAMES = [
    "uResolution",
    "uTime",
    "uBaseColor",
    "uPointer",
    "uPointerActive",
    "uPointerAttraction",
    "uPointerStrength",
    "uBodyRadius",
    "uPulsePhase",
    "uPulseAmp",
    "uNoiseAmp",
    "uNoiseFreq",
    "uNoiseSpeed",
    "uWarpAmp",
    "uSmoothK",
    "uMerge",
    "uMaxReach",
    "uLit",
    "uRimColor",
    "uLightDir",
    "uSpecStrength",
    "uSpecShininess",
    "uRimPower",
    "uRimStrength",
    "uIridescence",
    "uIridHue",
    "uIridSpeed",
    "uSssScale",
    "uSssPower",
    "uCoreGlow",
    "uHueRange",
    "uSatShift",
    "uBrightnessShift",
    "uColorNoiseFreq",
    "uColorNoiseSpeed",
    "uStopCount",
    "uSatCount",
    "uTrailCount",
    "uVelocity",
    "uStretch",
] as const;

type UniformName = (typeof UNIFORM_NAMES)[number];

export interface UseMetaballRendererOptions {
    canvasRef: Ref<HTMLCanvasElement | null>;
    /** The base color, ALREADY un-wrapped to a CONCRETE string by the SFC (DOM-free). */
    color: Ref<string>;
    /**
     * The Fresnel rim color, ALREADY un-wrapped to a CONCRETE string by the SFC
     * (AX.W16 — the renderer no longer reaches the DOM for the `var()`-cascade read;
     * the SFC's `resolveTokenColor` leaf does ALL un-wrapping before the renderer sees
     * it). A `var(--token)` rim arrives here already resolved to `rgb(...)`.
     */
    rimColor: Ref<string>;
    /**
     * The multi-stop palette, ALREADY un-wrapped to CONCRETE strings by the SFC
     * (AX.W16). EMPTY falls back to the base color (uStopCount <= 1).
     */
    paletteStops: Ref<string[]>;
    mood: BlobMoodSystem;
    pointer: BlobPointer;
    satellites: BlobSatelliteSystem;
    config: BlobConfig;
    /**
     * The injected color seam (DEC-AT-2). Resolves a CONCRETE CSS color string to a
     * GAMMA-sRGB triple in [0,1] fed straight into the shader's base-color uniform —
     * the faithful AU.W7 lift paints gamma. REQUIRED: a no-resolver mount throws (the
     * loud failure, not a silent gray) instructing the consumer to pass
     * `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` (or their own). The
     * renderer is DOM-FREE: it never un-wraps a `var(--token)` — the SFC's
     * `resolveTokenColor` leaf does that BEFORE handing strings here (inv-K-3 seam).
     */
    colorResolver: ColorResolver;
}

/**
 * The GooBlob WebGL renderer — composes the `useWebGLCanvas` substrate (AU.W6).
 *
 * This module owns ONLY the metaball-specific concerns: compiling the shader,
 * building the quad + uniform cache, and uploading the per-frame uniforms derived
 * from the mood / pointer / satellite systems and the injected color resolver. The
 * generic WebGL2 lifecycle — context creation, the suspend/resume model, the
 * demand-driven rAF loop, the tab-visibility owner, the ResizeObserver, and the
 * webglcontextlost/restored robustness — lives in the substrate; this renderer
 * threads its behaviour through the substrate's
 * `setup`/`frame`/`shouldContinue`/`resize`/`teardown` callbacks. It does NOT call
 * `getContext("webgl2")` itself (the single-bootstrap contract).
 *
 * Colors arrive ALREADY resolved to a gamma-sRGB triple via the injected
 * `colorResolver`; the value.js 1×1-canvas DOM probe is gone (the seam replaces it).
 */
export function useMetaballRenderer(options: UseMetaballRendererOptions) {
    const {
        canvasRef,
        color,
        rimColor,
        paletteStops,
        mood,
        pointer,
        satellites,
        config,
        colorResolver,
    } = options;

    if (typeof colorResolver !== "function") {
        throw new Error(
            "[GooBlob] a `colorResolver` is required. Pass `defaultBlobColorResolver` " +
                "from `@mkbabb/glass-ui/color` (or your own `ColorResolver`) — the blob " +
                "resolves its base CSS color through this seam and will not paint without it.",
        );
    }

    // AV.W7 G1 — the reduced-motion freeze is LIFTED into the `useWebGLCanvas`
    // substrate, which OWNS + LIVE-MONITORS the query (a `matchMedia` `change`
    // listener that re-arms one static frame on un-reduce, then parks). The blob
    // no longer reads `matchMedia` once at init and never re-monitors — toggling
    // reduced-motion at runtime now freezes/wakes the blob, not just aurora.
    // `shouldContinue` therefore drops its PRM branch; the substrate's reschedule
    // gate draws the one static frame then parks.

    // Per-frame timing — `frame(timeSec)` gives elapsed seconds; the mood system
    // needs a millisecond delta and the satellite system a millisecond `now`, so
    // derive both from the substrate's seconds clock.
    let lastTimeSec = 0;
    // The tempo-INTEGRATED motion clock (ms) — `simTimeMs += tempo * dt`. Every
    // motion axis (FBM scroll, satellite phase, orbit) reads THIS, not the absolute
    // clock, so a tempo change (pause / PRM) freezes motion without a discontinuity.
    let simTimeMs = 0;

    // Memoise the resolver: the consumer cycles through a handful of stable color
    // strings, so the resolve runs once per unique color rather than every frame.
    // Cap defensively against unbounded growth from synthesized values.
    //
    // AX.W16 (arm 4) — the renderer is DOM-FREE: every string handed here is already
    // CONCRETE (the SFC's `resolveTokenColor` leaf un-wrapped any `var(--token)` via
    // the ONE cached cascade read). The renderer's prior `resolveRimColor` + `rimCache`
    // — which reached BACK into the canvas element for a `getComputedStyle`, coupling
    // the pure-fn ColorResolver to a DOM read the inv-K-3 seam forbade — are DELETED.
    // ONE `resolveColor` cache (the ColorResolver memo) remains; it never touches the
    // DOM (`getComputedStyle` no longer appears in this file).
    const colorCache = new Map<string, [number, number, number]>();
    function resolveColor(css: string): [number, number, number] {
        const cached = colorCache.get(css);
        if (cached) return cached;
        const rgb = colorResolver(css);
        if (colorCache.size > 256) colorCache.clear();
        colorCache.set(css, rgb);
        return rgb;
    }

    let canvasHandle: ReturnType<typeof createWebGLCanvas> | null = null;
    let paused = false;

    // AX.W16 (arm 2) — the satellite-phase WAKE scheduler. When the quiescence gate
    // parks a fully-at-rest blob, a `setTimeout` re-arms the loop exactly when the next
    // orbit/merge phase is due (the demand-loop wake, not a poll). `simTimeMs` is the
    // tempo-integrated clock; `nextEventMs` returns the next phase horizon in that same
    // clock, so the delta is the real-time wall delay (tempo === 1 at rest).
    let wakeTimer: ReturnType<typeof setTimeout> | null = null;
    function clearWakeTimer(): void {
        if (wakeTimer !== null) {
            clearTimeout(wakeTimer);
            wakeTimer = null;
        }
    }
    function scheduleWake(nextEventMs: number): void {
        clearWakeTimer();
        if (typeof setTimeout === "undefined") return;
        // The horizon is in the tempo-integrated clock; at rest tempo === 1 so the
        // wall delay == the sim delta. Floor at one frame, cap at a long idle ceiling
        // so a far-future or NaN horizon can't strand the loop parked.
        const delayMs = Math.min(Math.max(nextEventMs - simTimeMs, 16), 30_000);
        wakeTimer = setTimeout(() => {
            wakeTimer = null;
            canvasHandle?.wake();
        }, delayMs);
    }

    // AV.W7 F4 — wire the RAF through the viewport-intersection seam so a blob
    // scrolled out of the viewport (the `rootMargin:200px` warm band) parks its
    // loop; this is the IntersectionObserver fallback for engines without
    // `contentvisibilityautostatechange` (the substrate's F1 content-visibility path).
    // The substrate owns `tab-hidden` itself, so `pauseWhenHidden:false`.
    //
    // AX.W16 F6 — the IO fallback writes its OWN reason key `off-screen-io`, DISTINCT
    // from the content-visibility path's `off-screen` (createCanvasLifecycle owns that
    // key). Both gate the same empty-`Set` `isRunning()` check, ORed — so the loop runs
    // ONLY when BOTH detectors agree the surface is visible. Before this split both
    // wrote `off-screen`, so an IO `resume` could lift a legitimately-skipped CV
    // suspend (the one-writer-per-reason breach this closes).
    useIntersectionPause(
        canvasRef,
        {
            pause: () => canvasHandle?.suspend("off-screen-io"),
            resume: () => canvasHandle?.resume("off-screen-io"),
        },
        { rootMargin: "200px", pauseWhenHidden: false },
    );

    function start(canvas: HTMLCanvasElement) {
        canvasHandle = createWebGLCanvas(canvas, {
            contextAttrs: {
                alpha: true,
                premultipliedAlpha: true,
                antialias: false,
                preserveDrawingBuffer: false,
            },
            // Build the program + quad + uniform cache on a fresh context. The
            // substrate calls this on arm() AND on every webglcontextrestored, so a
            // GPU context loss self-heals — the closures below close over the fresh
            // `gl`/`prog`/`U` each time.
            setup: (gl) => {
                const vs = compileShader(
                    gl,
                    gl.VERTEX_SHADER,
                    METABALL_VERTEX_SRC,
                    BLOB_LABEL,
                );
                const fs = compileShader(
                    gl,
                    gl.FRAGMENT_SHADER,
                    METABALL_FRAGMENT_SRC,
                    BLOB_LABEL,
                );
                const prog = linkProgram(gl, vs, fs, BLOB_LABEL);
                gl.useProgram(prog);

                // Full-quad (two triangles) — the source's six-vertex quad.
                const vao = gl.createVertexArray()!;
                gl.bindVertexArray(vao);
                const buf = gl.createBuffer()!;
                gl.bindBuffer(gl.ARRAY_BUFFER, buf);
                gl.bufferData(
                    gl.ARRAY_BUFFER,
                    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
                    gl.STATIC_DRAW,
                );
                const aPos = gl.getAttribLocation(prog, "aPosition");
                gl.enableVertexAttribArray(aPos);
                gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

                // Uniform location cache (scalar/vector uniforms).
                const U = {} as Record<UniformName, WebGLUniformLocation | null>;
                for (const n of UNIFORM_NAMES) U[n] = gl.getUniformLocation(prog, n);

                // Per-satellite array-element locations.
                const satPosLocs: (WebGLUniformLocation | null)[] = [];
                const satRadLocs: (WebGLUniformLocation | null)[] = [];
                const satOpLocs: (WebGLUniformLocation | null)[] = [];
                for (let i = 0; i < MAX_SATS; i++) {
                    satPosLocs.push(gl.getUniformLocation(prog, `uSatPos[${i}]`));
                    satRadLocs.push(gl.getUniformLocation(prog, `uSatRadius[${i}]`));
                    satOpLocs.push(gl.getUniformLocation(prog, `uSatOpacity[${i}]`));
                }

                // Per-trail-element locations (mirrors the satellite plumbing; the
                // trail is a separate COMPILE-TIME-SIZED uTrail[TRAIL_N] array).
                const trailPosLocs: (WebGLUniformLocation | null)[] = [];
                const trailRadLocs: (WebGLUniformLocation | null)[] = [];
                for (let i = 0; i < TRAIL_N; i++) {
                    trailPosLocs.push(gl.getUniformLocation(prog, `uTrailPos[${i}]`));
                    trailRadLocs.push(gl.getUniformLocation(prog, `uTrailRadius[${i}]`));
                }

                // Per-palette-stop locations (W11.b — uPalette[MAX_BLOB_STOPS]).
                const paletteLocs: (WebGLUniformLocation | null)[] = [];
                for (let i = 0; i < MAX_BLOB_STOPS; i++) {
                    paletteLocs.push(gl.getUniformLocation(prog, `uPalette[${i}]`));
                }

                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                function resize() {
                    // AV.W7 F6 — the DPR≤2 clamp is the named `AV_DPR_MAX` ceiling.
                    const dpr = resolveBudgetDpr();
                    // AX.W16 (arm 2) — the quality axis: `half` renders the metaball
                    // pass at HALF the backing-store resolution (the CSS box stays the
                    // same, so the browser bilinear-upsamples the smaller buffer on
                    // composite) for ~4× fragment savings on weak GPUs. The blob is the
                    // IDEAL candidate — the soft FBM/AA edge HIDES the interpolation;
                    // ONE blit, never a multi-pass chain. `full` (default) renders at
                    // the clamped DPR. The fwidth-AA self-adjusts to the lower buffer
                    // resolution (the edge stays ~1px in buffer space).
                    const qScale = config.quality === "half" ? 0.5 : 1.0;
                    // Size from the rendered element, not config — the blob fills its
                    // container.
                    const cssW = canvas.clientWidth || config.canvasSize;
                    const cssH = canvas.clientHeight || config.canvasSize;
                    const w = Math.max(1, Math.round(cssW * dpr * qScale));
                    const h = Math.max(1, Math.round(cssH * dpr * qScale));
                    if (canvas.width !== w || canvas.height !== h) {
                        canvas.width = w;
                        canvas.height = h;
                    }
                    gl.viewport(0, 0, w, h);
                }

                function drawFrame(timeSec: number) {
                    // Raw per-frame delta. The first post-park dt can be SECONDS
                    // (after an offscreen/hidden/PRM re-arm) — CLAMP it to ~50ms on
                    // EVERY integrated axis so the tempo/rest-pose composition never
                    // jumps (the W11 extension of the W10 spring-only clamp).
                    const rawDtMs = lastTimeSec ? (timeSec - lastTimeSec) * 1000 : 16;
                    lastTimeSec = timeSec;
                    const dtMs = Math.min(rawDtMs, 50);

                    // ── The ONE master tempo scalar (W11.c) ──────────────────────
                    //
                    // `tempo` multiplies every INTEGRATED dt — NEVER the clock.
                    // Scaling the absolute clock makes the FBM noise JUMP when tempo
                    // changes; integrating a tempo-scaled `simTimeMs` keeps the noise
                    // scroll CONTINUOUS across a tempo change (it resumes from the
                    // accumulated value). The SUBSTRATE owns PRM + the pause; here we
                    // only READ them to drive tempo (no parallel matchMedia).
                    const reduced = canvasHandle?.reducedMotion ?? false;
                    const tempo = reduced || paused ? 0 : config.tempo;
                    const stepMs = tempo * dtMs; // the tempo-scaled integration step
                    simTimeMs += stepMs;         // the tempo-integrated motion clock

                    // Advance the simulation systems on the tempo-scaled step. Under
                    // reduced-motion (tempo 0) the interaction layer COMPOSES the
                    // deterministic rest pose (spring at centre, zero velocity, trail
                    // collapsed, pulse zero) rather than advancing — the SUBSTRATE
                    // then paints ONE static frame and parks. Every axis reads the
                    // SAME tempo-scaled clock so the whole creature breathes as one.
                    // Drive the AUTONOMIC mood arc from the interaction/idle state
                    // (W11.c wires setMood: curious on approach, excited on click,
                    // sleepy after inactivity). `update` IS the auto source — it tags
                    // every internal `setMood` with `source: "auto"` and EARLY-RETURNS
                    // while a manual `setMood` pins the mood (AX.W46 D7), so this call
                    // never clobbers a user-pinned mood; a fresh live click/pointer-over
                    // releases the pin back to the arc. Under reduced-motion (tempo 0)
                    // the mood holds — no retargeting on a parked frame.
                    if (!reduced) {
                        mood.update({
                            pointerActive: pointer.active.value,
                            clicked: pointer.consumeClick(),
                            idleMs: pointer.idleMs(),
                        });
                    }
                    mood.tick(stepMs);
                    if (reduced) {
                        pointer.rest();
                    } else {
                        pointer.tick(stepMs);
                    }
                    satellites.tick(simTimeMs, mood.params.value);

                    const params = mood.params.value;
                    const rgb = resolveColor(color.value);

                    gl.useProgram(prog);
                    gl.bindVertexArray(vao);

                    gl.uniform2f(U.uResolution, canvas.width, canvas.height);
                    // uTime is the tempo-INTEGRATED motion clock (seconds), NOT the
                    // substrate's absolute clock — so the FBM noise scroll slows with
                    // tempo and freezes at tempo=0 WITHOUT a discontinuity.
                    gl.uniform1f(U.uTime, simTimeMs / 1000);
                    gl.uniform3f(U.uBaseColor, rgb[0], rgb[1], rgb[2]);

                    // Multi-stop palette (W11.b) — 2-4 in-family stops. EMPTY falls
                    // back to uBaseColor (uStopCount <= 1). The stops arrive ALREADY
                    // CONCRETE (the SFC un-wrapped any var()-token via resolveTokenColor
                    // — AX.W16); the renderer parses them through the ColorResolver memo,
                    // never the DOM.
                    const stops = paletteStops.value;
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

                    // Pointer
                    const ptr = pointer.pointer.value;
                    gl.uniform2f(U.uPointer, ptr.x * 0.5 * POS_SCALE, ptr.y * 0.5 * POS_SCALE);
                    gl.uniform1f(U.uPointerActive, pointer.active.value ? 1.0 : 0.0);
                    gl.uniform1f(
                        U.uPointerAttraction,
                        config.pointerAttraction + params.pointerAttraction,
                    );
                    gl.uniform1f(U.uPointerStrength, config.pointerStrength * POS_SCALE);

                    // Velocity-driven squash-and-stretch (W10). The spring velocity
                    // (normalized [-1,1]/s) maps into body space like the pointer.
                    const vel = pointer.velocity.value;
                    gl.uniform2f(
                        U.uVelocity,
                        vel.x * 0.5 * POS_SCALE,
                        vel.y * 0.5 * POS_SCALE,
                    );
                    gl.uniform1f(U.uStretch, config.stretch);

                    // Pointer trail (W10) — decaying-radius pseudopod. The trail is
                    // in the same normalized [-1,1] space as the pointer, so map it
                    // exactly like uPointer (`* 0.5 * POS_SCALE`).
                    const trail = pointer.trailSources(config.satelliteRadius * 0.7);
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
                    gl.uniform1f(U.uBodyRadius, config.bodyRadius * POS_SCALE);
                    gl.uniform1f(
                        U.uPulsePhase,
                        timeSec * config.pulseFreq * params.pulseFreq * Math.PI * 2,
                    );
                    // normalize to idle baseline + the one-shot click impulse (W10).
                    // The pulse rings ± so it transiently fattens/thins the throb
                    // amplitude — the click is FELT through the EXISTING uPulseAmp
                    // channel (no parallel pulse path).
                    const clickPulse = pointer.pulse.value * config.clickImpulse;
                    gl.uniform1f(
                        U.uPulseAmp,
                        (((config.pulseAmp * params.pulseAmp) / 0.015) + clickPulse) *
                            POS_SCALE,
                    );

                    // Surface noise — config controls shape, mood scales amplitude.
                    gl.uniform1f(
                        U.uNoiseAmp,
                        ((config.noiseAmp * params.noiseAmp) / 0.025) * POS_SCALE,
                    );
                    gl.uniform1f(U.uNoiseFreq, config.noiseFreq);
                    gl.uniform1f(U.uNoiseSpeed, config.noiseSpeed);
                    gl.uniform1f(U.uWarpAmp, config.warpAmp);

                    // Gooey — `uSmoothK` is a TRUE blend-band in the shader's UV
                    // space: the smin is IQ-normalized (`k *= 4.0` in
                    // sdf-body.glsl.ts) so the band == k (the seam dip at a==b is
                    // exactly the uploaded k). The `/0.22` normalizer stayed deleted
                    // (W9.a — the right deletion), but the smin band RIDES `POS_SCALE`
                    // like every other length-like uniform (uBodyRadius/satRadius/
                    // uPointer/noiseAmp all carry the 0.625 inner-region compression):
                    // the merge inflation is measured in the SAME UV space as the
                    // radii, so it must carry the same compression or it is 1.6×
                    // oversized relative to every other length (the second half of
                    // the AW.W9 flood). The mood `smoothK` is now a unitless,
                    // 1.0-centred MULTIPLIER (idle ≈ 1.0): the config holds the ONE
                    // absolute band, mood scales it — there is no split-length regime,
                    // so no `/DEFAULTS` ratio normalization is needed.
                    gl.uniform1f(U.uSmoothK, config.smoothK * params.smoothK * POS_SCALE);
                    gl.uniform1f(U.uMerge, config.merge === "circular" ? 1.0 : 0.0);

                    // AX.W16 (arm 5) — the PRE-FBM bounding-discard radius (UV space).
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
                    // squash stretch. NO length constant is edited (W08/W15 own those);
                    // this is a READ of them.
                    const satWorst =
                        config.orbitRadius * 1.2 * (1 + config.eccentricity) +
                        config.satelliteRadius;
                    const maxReach =
                        (Math.max(config.bodyRadius, satWorst) +
                            config.smoothK * params.smoothK +
                            (config.noiseAmp * params.noiseAmp) / 0.025 +
                            Math.abs(pointer.pulse.value) * config.clickImpulse) *
                            POS_SCALE +
                        0.1;
                    gl.uniform1f(U.uMaxReach, maxReach);

                    // Color perturbation
                    gl.uniform1f(U.uHueRange, config.hueRange + params.hueRange);
                    gl.uniform1f(U.uSatShift, config.satShift + params.satShift);
                    gl.uniform1f(
                        U.uBrightnessShift,
                        config.brightnessShift + params.brightnessShift,
                    );
                    gl.uniform1f(U.uColorNoiseFreq, config.colorNoiseFreq);
                    gl.uniform1f(U.uColorNoiseSpeed, config.colorNoiseSpeed);

                    // Lit glass surface (W9.b) — Blinn-Phong glint + Fresnel rim.
                    // `uRimColor` arrives ALREADY CONCRETE (the SFC un-wrapped any
                    // var()-token via resolveTokenColor — AX.W16) and parses through the
                    // SAME injected ColorResolver memo as `uBaseColor`, never the DOM.
                    // Gated behind `uLit` (default lit).
                    gl.uniform1f(U.uLit, config.lit ? 1.0 : 0.0);
                    const rim = resolveColor(rimColor.value);
                    gl.uniform3f(U.uRimColor, rim[0], rim[1], rim[2]);
                    gl.uniform3f(
                        U.uLightDir,
                        config.lightDir[0],
                        config.lightDir[1],
                        config.lightDir[2],
                    );
                    gl.uniform1f(U.uSpecStrength, config.specStrength);
                    gl.uniform1f(U.uSpecShininess, config.specShininess);
                    gl.uniform1f(U.uRimPower, config.rimPower);
                    gl.uniform1f(U.uRimStrength, config.rimStrength);

                    // Iridescence + fake-SSS (W11.a). iridHue is degrees in config,
                    // radians in-shader. Mood routes the sheen intensity (excited =
                    // stronger shimmer, sleepy = nearly flat) via params.iridScale.
                    gl.uniform1f(
                        U.uIridescence,
                        config.iridescence * params.iridScale,
                    );
                    gl.uniform1f(U.uIridHue, config.iridHue * (Math.PI / 180));
                    gl.uniform1f(U.uIridSpeed, config.iridSpeed);
                    gl.uniform1f(U.uSssScale, config.sssScale * params.iridScale);
                    gl.uniform1f(U.uSssPower, config.sssPower);
                    gl.uniform1f(U.uCoreGlow, config.coreGlow);

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

                /**
                 * Demand gate (AX.W16 arm 2 — the EVENT-SCHEDULED quiescence signal).
                 *
                 * The prior gate `return !paused` defeated the substrate's demand loop
                 * for the onscreen-idle case — an idle ambient blob burned a full 60fps
                 * rAF (FBM×2 + OKLCh-per-fragment) forever (the `:512` "perpetually
                 * animated" comment). This replaces it with a REAL at-rest predicate:
                 * the loop runs IFF SOMETHING is actually changing —
                 *   • the mood is mid-transition or has a pending auto-mood arc, OR
                 *   • the pointer spring is moving / the trail is non-empty / the click
                 *     pulse is non-zero, OR
                 *   • a satellite is mid-merge/absorbed/emerging (not in steady orbit).
                 * When ALL are at rest the gate returns false and the substrate STOPS
                 * rescheduling — the blob renders ZERO frames between phase transitions.
                 *
                 * NO false-park: the predicate ORs EVERY motion source (a frozen-mid-
                 * gesture blob is the hazard); the first-post-park dt clamp (drawFrame's
                 * `Math.min(rawDtMs, 50)` + the spring/pointer clamps) keeps the re-arm
                 * smooth. While paused (G2) OR reduced (the substrate's reschedule gate)
                 * the loop parks regardless — this gate is the MOTION quiescence layer.
                 *
                 * The WAKE: a parked-at-rest blob must RE-ARM when its next satellite
                 * orbit/merge phase is due (a pending idle→sleepy auto-mood arc fires on
                 * the same wake). The satellite system knows its phase horizon
                 * (`nextEventMs`); we schedule a `setTimeout` wake at that horizon so the
                 * loop re-arms on the scheduler (glass-ui's invalidate()/R3F demand
                 * model), never by polling.
                 */
                function shouldContinue(): boolean {
                    if (paused) return false;
                    const live =
                        !mood.isSettled() ||
                        !pointer.isAtRest() ||
                        !satellites.isQuiescent();
                    if (live) {
                        clearWakeTimer();
                        return true;
                    }
                    // About to park at rest — arm a wake at the SOONER of the next
                    // satellite phase boundary and the pending auto-mood (idle→sleepy)
                    // arc, so the parked loop re-renders exactly when the next scheduled
                    // event is due (the orbit/merge resumes OR the mood drifts).
                    const satHorizonMs = satellites.nextEventMs(simTimeMs);
                    const moodDelayMs = mood.nextAutoMoodMs();
                    const moodHorizonMs = Number.isFinite(moodDelayMs)
                        ? simTimeMs + moodDelayMs
                        : Infinity;
                    scheduleWake(Math.min(satHorizonMs, moodHorizonMs));
                    return false;
                }

                return {
                    frame: drawFrame,
                    shouldContinue,
                    resize,
                    teardown: () => {
                        gl.deleteProgram(prog);
                        gl.deleteShader(vs);
                        gl.deleteShader(fs);
                        gl.deleteBuffer(buf);
                        gl.deleteVertexArray(vao);
                        // The WEBGL_lose_context release is the substrate's job.
                    },
                };
            },
        });

        canvasHandle.arm();
    }

    watch(
        canvasRef,
        (canvas) => {
            if (canvas && !canvasHandle) start(canvas);
        },
        { immediate: true },
    );

    // Repaint on a color change while parked (reduced-motion / paused) so the new
    // color lands without the perpetual loop.
    watch(color, () => canvasHandle?.wake());

    onUnmounted(() => {
        clearWakeTimer();
        canvasHandle?.dispose();
        canvasHandle = null;
    });

    return {
        pause: () => {
            paused = true;
            canvasHandle?.suspend("manual");
        },
        resume: () => {
            paused = false;
            canvasHandle?.resume("manual");
        },
    };
}

