import { watch, onUnmounted, type Ref } from "vue";
import { createWebGLCanvas } from "../../../../composables/glass/webgl/useWebGLCanvas";
import { useIntersectionPause } from "../../../../composables/motion/useIntersectionPause";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { cssToOklch, oklchToGammaRgb } from "../../../../composables/color";
import type { BlobConfig } from "../types";
import type { BlobMoodSystem } from "./useBlobMood";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";
import { buildMetaballProgram } from "./buildMetaballProgram";
import { uploadBlobUniforms, type BlobFrameState } from "./uploadBlobUniforms";

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
}

/** The renderer's public control surface — pause/resume + wake the demand loop. */
export interface UseMetaballRendererReturn {
    pause: () => void;
    resume: () => void;
    /**
     * BA.W-GOO-REDRESS — re-arm the demand-parked loop on demand (the public twin
     * of the internal `color`/`paletteStops` wake watchers). The SFC's pointer-wake
     * wire calls this so a first hover over a fully-parked blob (all satellites
     * orbiting → the AX.W16 quiescence gate has parked the rAF) repaints on the
     * SAME frame instead of waiting up to an orbit horizon for the next scheduled
     * satellite wake (root cause 2 / BA-goo-3). It is the EXISTING substrate wake
     * handle — NO new rAF, NO second wake path (the single-substrate-loop invariant).
     */
    wake: () => void;
}

/**
 * The GooBlob WebGL renderer — composes the `useWebGLCanvas` substrate (AU.W6).
 *
 * This module owns ONLY the metaball-specific concerns: compiling the shader,
 * building the quad + uniform cache (the `buildMetaballProgram` leaf), and
 * uploading the per-frame uniforms (the `uploadBlobUniforms` leaf) derived from the
 * mood / pointer / satellite systems and the resolved base color. The generic
 * WebGL2 lifecycle — context creation, the suspend/resume model, the demand-driven
 * rAF loop, the tab-visibility owner, the ResizeObserver, and the
 * webglcontextlost/restored robustness — lives in the substrate; this renderer
 * threads its behaviour through the substrate's
 * `setup`/`frame`/`shouldContinue`/`resize`/`teardown` callbacks. It does NOT call
 * `getContext("webgl2")` itself (the single-bootstrap contract).
 *
 * Color is resolved INTERNALLY through the `/color` leaf (`cssToOklch →
 * oklchToGammaRgb`) — the GAMMA-sRGB triple fed straight into the base-color uniform
 * (the faithful AU.W7 lift paints gamma). The renderer is DOM-FREE: it never un-wraps
 * a `var(--token)` — the SFC's `resolveTokenColor` leaf does that BEFORE handing
 * concrete strings here (inv-K-3 seam); the value.js 1×1-canvas DOM probe is gone.
 */
export function useMetaballRenderer(
    options: UseMetaballRendererOptions,
): UseMetaballRendererReturn {
    const {
        canvasRef,
        color,
        rimColor,
        paletteStops,
        mood,
        pointer,
        satellites,
        config,
    } = options;

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

    // Resolve a CONCRETE CSS color string to a GAMMA-sRGB triple via the `/color`
    // leaf (`cssToOklch → oklchToGammaRgb` — the faithful AU.W7 gamma exit; ONE shared
    // color core, inv J-10, no parallel math). Memoised: the consumer cycles through a
    // handful of stable color strings, so the resolve runs once per unique color rather
    // than every frame. Cap defensively against unbounded growth from synthesized values.
    //
    // AX.W16 (arm 4) — the renderer is DOM-FREE: every string handed here is already
    // CONCRETE (the SFC's `resolveTokenColor` leaf un-wrapped any `var(--token)` via
    // the ONE cached cascade read). The renderer's prior `resolveRimColor` + `rimCache`
    // — which reached BACK into the canvas element for a `getComputedStyle` the inv-K-3
    // seam forbade — are DELETED. ONE `resolveColor` cache remains; it never touches the
    // DOM (`getComputedStyle` no longer appears in this file).
    const colorCache = new Map<string, [number, number, number]>();
    function resolveColor(css: string): [number, number, number] {
        const cached = colorCache.get(css);
        if (cached) return cached;
        const rgb = oklchToGammaRgb(cssToOklch(css));
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
            // `gl` + the freshly-built program handles each time.
            setup: (gl) => {
                const { prog, vs, fs, vao, buf, locs } = buildMetaballProgram(gl);

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
                    const cssW = canvas.clientWidth || config.geometry.canvasSize;
                    const cssH = canvas.clientHeight || config.geometry.canvasSize;
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
                    // Raw per-frame delta CLAMPED to [0, 50]ms (AY.W-BLOB-CONFIG D4).
                    // The first post-resume frame is the divergence hazard: a `manual`
                    // resume rebases the substrate clock (`startTime = now - 1000`), so
                    // `timeSec` snaps back to ~1.0 while `lastTimeSec` still holds the
                    // pre-pause elapsed (often tens of seconds). The raw delta is then
                    // strongly NEGATIVE (`-1178`, `-2017`ms measured), and a negative dt
                    // run BACKWARD through the symplectic click-pulse integrator
                    // (`pulseVel += accel·dt; pulse += pulseVel·dt`) flips its sign and
                    // diverges — the strobe-to-charcoal-slab wreck the page's own pause
                    // control produced (RA-blob §C.1). `Math.min(raw, 50)` clamped only
                    // the UPPER bound (the offscreen/PRM seconds-long re-arm), letting the
                    // negative half through. The lower clamp (`Math.max(.., 0)`) makes a
                    // resume rebase a no-op step (dt 0 → simTime/springs/pulse advance
                    // zero this frame, then resume normally next frame) so the simulation
                    // CANNOT run backward. The clean off-screen-park path hits the SAME
                    // rebase, so this also hardens that resume.
                    const rawDtMs = lastTimeSec ? (timeSec - lastTimeSec) * 1000 : 16;
                    lastTimeSec = timeSec;
                    const dtMs = Math.max(0, Math.min(rawDtMs, 50));

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

                    // Resolve the frame state, then hand it to the uniform-upload
                    // leaf (the byte-identical write + draw). The resolve order —
                    // advance the systems above, then read their settled values —
                    // is unchanged; the leaf does ONLY the uniform writes.
                    const frame: BlobFrameState = {
                        params: mood.params.value,
                        rgb: resolveColor(color.value),
                        simTimeMs,
                        timeSec,
                        resolveColor,
                        rimColor: rimColor.value,
                        paletteStops: paletteStops.value,
                    };
                    uploadBlobUniforms(gl, prog, vao, locs, canvas, config, pointer, satellites, frame);
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
    // color lands without the perpetual loop. AY.W-BLOB-CONFIG D1 — the palette stops
    // wake the loop too, so a seed/harmony-driven `paletteStops` change repaints the
    // hero body even when the demand loop has parked at rest.
    watch(color, () => canvasHandle?.wake());
    watch(paletteStops, () => canvasHandle?.wake(), { deep: true });

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
        // BA.W-GOO-REDRESS — the public wake handle (the SFC's pointer-wake wire).
        // Re-arms the demand-parked loop via the SAME substrate `wake()` the
        // color/paletteStops watchers above call (no parallel rAF). A wake on an
        // already-running loop is a no-op; a wake on a parked-at-rest loop re-arms
        // it so the first hover repaints same-frame.
        wake: () => canvasHandle?.wake(),
    };
}
