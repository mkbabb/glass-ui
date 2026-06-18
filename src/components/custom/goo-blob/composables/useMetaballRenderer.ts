import { watch, onUnmounted, type Ref } from "vue";
import { createGpuSubstrate } from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { useIntersectionPause } from "../../../../composables/motion/useIntersectionPause";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { cssToOklch, oklchToGammaRgb } from "../../../../composables/color";
import type { BlobConfig } from "../types";
import type { BlobMoodSystem } from "./useBlobMood";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";
import { buildMetaballProgram } from "./buildMetaballProgram";
import { uploadBlobUniforms, type BlobFrameState } from "./uploadBlobUniforms";
import { createBlobWGPUSetup } from "./wgpuSetup";

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
 * The GooBlob renderer — composes the `createGpuSubstrate` picker (BB.W-VIZ-SUITE /
 * W-GOOBLOB-WGPU): the WebGPU-first `metaball.wgsl` primary OR the WebGL2
 * `metaball.frag.ts` fallback, selected ONCE by `navigator.gpu` feature-detect. Both
 * backends compose the SAME `createCanvasLifecycle` leaf (AU.W6), so the demand-driven
 * scheduling + offscreen-park + live-PRM-freeze are byte-identical across backends.
 *
 * This module owns ONLY the metaball-specific concerns: compiling the shader, building
 * the quad + uniform cache (the WebGL2 `buildMetaballProgram` leaf) OR the WGSL pipeline
 * + the typed-struct uniform buffer (the WGSL `createBlobWGPUSetup` leaf), and the
 * per-frame SIMULATION advance + uniform upload derived from the mood / pointer /
 * satellite systems and the resolved base color. The simulation advance is SHARED — the
 * `resolveFrame(timeSec)` closure advances the systems and returns the settled
 * `BlobFrameState`; the WebGL2 `drawFrame` and the WGSL `frame` both call it, so the
 * physics is substrate-agnostic and only the upload+draw leg differs. The generic
 * lifecycle (context creation, the suspend/resume model, the demand-driven rAF loop, the
 * tab-visibility owner, the ResizeObserver, and the context-loss self-heal) lives in the
 * substrate; this renderer threads its behaviour through the substrate's
 * `setupGL`/`setupWGPU`/`frame`/`shouldContinue`/`resize`/`teardown` callbacks. It does
 * NOT call `getContext("webgl2")`/`navigator.gpu` itself (the single-bootstrap contract).
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

    let canvasHandle: ReturnType<typeof createGpuSubstrate> | null = null;
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

    // ── The SHARED simulation advance (substrate-agnostic) ──────────────────────
    //
    // `resolveFrame(timeSec)` advances the mood / pointer / satellite systems on the
    // tempo-scaled step and returns the settled `BlobFrameState`. BOTH backends call it
    // (the WebGL2 `drawFrame` then `uploadBlobUniforms`; the WGSL `frame` then
    // `packBlobWGPUUniforms`), so the physics is identical regardless of backend — the
    // ONLY divergence is the upload+draw leg. The simulation closures (`lastTimeSec` /
    // `simTimeMs` / `paused`) are renderer-scoped, owned once here.
    function resolveFrame(timeSec: number): BlobFrameState {
        // Raw per-frame delta CLAMPED to [0, 50]ms (AY.W-BLOB-CONFIG D4). The first
        // post-resume frame is the divergence hazard: a `manual` resume rebases the
        // substrate clock, so `timeSec` snaps back while `lastTimeSec` holds the
        // pre-pause elapsed. The raw delta is then strongly NEGATIVE, and a negative dt
        // run BACKWARD through the symplectic click-pulse integrator flips its sign and
        // diverges. `Math.max(0, ...)` makes a resume rebase a no-op step so the
        // simulation CANNOT run backward; `Math.min(.., 50)` clamps the seconds-long
        // offscreen/PRM re-arm.
        const rawDtMs = lastTimeSec ? (timeSec - lastTimeSec) * 1000 : 16;
        lastTimeSec = timeSec;
        const dtMs = Math.max(0, Math.min(rawDtMs, 50));

        // ── The ONE master tempo scalar (W11.c) ──────────────────────
        // `tempo` multiplies every INTEGRATED dt — NEVER the clock (scaling the
        // absolute clock makes the FBM noise JUMP). The SUBSTRATE owns PRM + the pause;
        // here we only READ them to drive tempo (no parallel matchMedia).
        const reduced = canvasHandle?.reducedMotion ?? false;
        const tempo = reduced || paused ? 0 : config.tempo;
        const stepMs = tempo * dtMs;
        simTimeMs += stepMs;

        // Advance the simulation on the tempo-scaled step. Under reduced-motion (tempo
        // 0) the interaction layer COMPOSES the deterministic rest pose rather than
        // advancing — the substrate then paints ONE static frame and parks. `update`
        // tags its internal setMood `source: "auto"` and early-returns while a manual
        // mood is pinned, so it never clobbers a user-pinned mood.
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

        return {
            params: mood.params.value,
            rgb: resolveColor(color.value),
            simTimeMs,
            timeSec,
            resolveColor,
            rimColor: rimColor.value,
            paletteStops: paletteStops.value,
        };
    }

    /**
     * Demand gate (AX.W16 arm 2 — the EVENT-SCHEDULED quiescence signal), SHARED by both
     * backends. The loop runs IFF something is actually changing (mood mid-transition,
     * pointer spring moving / trail non-empty / click pulse non-zero, or a satellite
     * mid-merge); otherwise it parks and arms a `setTimeout` wake at the next satellite
     * phase / auto-mood horizon so the loop re-arms on the scheduler, never by polling.
     */
    function shouldContinue(): boolean {
        if (paused) return false;
        const live =
            !mood.isSettled() || !pointer.isAtRest() || !satellites.isQuiescent();
        if (live) {
            clearWakeTimer();
            return true;
        }
        const satHorizonMs = satellites.nextEventMs(simTimeMs);
        const moodDelayMs = mood.nextAutoMoodMs();
        const moodHorizonMs = Number.isFinite(moodDelayMs)
            ? simTimeMs + moodDelayMs
            : Infinity;
        scheduleWake(Math.min(satHorizonMs, moodHorizonMs));
        return false;
    }

    /** The DPR-aware backing-store resize (shared math; the WebGL2 path also sets the
     *  viewport, the WGSL path's render-pass carries the full canvas by default). */
    function resizeBacking(canvas: HTMLCanvasElement): { w: number; h: number } {
        // AV.W7 F6 — the DPR≤2 clamp is the named `AV_DPR_MAX` ceiling. The `half`
        // quality axis halves the backing buffer (~4× fragment savings; the soft FBM/AA
        // edge hides the interpolation). `full` (default) renders at the clamped DPR.
        const dpr = resolveBudgetDpr();
        const qScale = config.quality === "half" ? 0.5 : 1.0;
        const cssW = canvas.clientWidth || config.geometry.canvasSize;
        const cssH = canvas.clientHeight || config.geometry.canvasSize;
        const w = Math.max(1, Math.round(cssW * dpr * qScale));
        const h = Math.max(1, Math.round(cssH * dpr * qScale));
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
        return { w, h };
    }

    function start(canvas: HTMLCanvasElement) {
        canvasHandle = createGpuSubstrate(canvas, {
            contextAttrs: {
                alpha: true,
                premultipliedAlpha: true,
                antialias: false,
                preserveDrawingBuffer: false,
            },
            // BB.W-VIZ-SUITE (W-GOOBLOB-WGPU) — the WGSL primary path (`metaball.wgsl`).
            // The picker arms this when `navigator.gpu` is present; the renderer's SHARED
            // `resolveFrame`/`shouldContinue` closures drive the simulation identically
            // across backends. `metaball.frag.ts` stays the byte-untouched WebGL2
            // fallback.
            setupWGPU: createBlobWGPUSetup({
                canvas,
                config,
                pointer,
                satellites,
                resolveFrame,
                shouldContinue,
                getReducedMotion: () => canvasHandle?.reducedMotion ?? false,
            }),
            // Build the program + quad + uniform cache on a fresh context. The substrate
            // calls this on arm() AND on every webglcontextrestored, so a GPU context loss
            // self-heals — the closures below close over the fresh `gl` + program handles.
            setupGL: (gl) => {
                const { prog, vs, fs, vao, buf, locs } = buildMetaballProgram(gl);

                function resize() {
                    const { w, h } = resizeBacking(canvas);
                    gl.viewport(0, 0, w, h);
                }

                function drawFrame(timeSec: number) {
                    const frame = resolveFrame(timeSec);
                    uploadBlobUniforms(gl, prog, vao, locs, canvas, config, pointer, satellites, frame);
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

        // The WebGPU path needs the async device-acquire (`armAsync`); the WebGL2
        // fallback's `armAsync` resolves immediately off the synchronous `arm()`, so this
        // one call arms BOTH backends. Fire-and-forget — a device-init failure is
        // surfaced by the substrate's own `onInitError`; the loop simply never arms.
        void canvasHandle.armAsync();
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
