import { ref, watch, onUnmounted, readonly, shallowRef, type Ref } from "vue";
import {
    createGpuSubstrate,
    type BackingSize,
    type RendererStatus,
} from "../../../composables/glass/webgpu/useGpuSubstrate";
import { pendingRenderer } from "../../../composables/glass/webgpu/rendererStatus";
import { useIntersectionPause } from "../../../composables/motion/useIntersectionPause";
import { usePointerVelocityField } from "../../../composables/motion/usePointerVelocityField";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import { cssToOklch, oklchToGammaRgb } from "../../../composables/color";
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
    /**
     * F9.R1 (BG.W-BLOB-SATELLITE-SHADE) — the OPTIONAL per-satellite explicit shades,
     * ALREADY un-wrapped to CONCRETE strings by the SFC (mirroring `paletteStops`).
     * Absent/EMPTY → the derived palette shade (the GL seam stays OFF, byte-identical).
     */
    satelliteColors?: Ref<string[]>;
    mood: BlobMoodSystem;
    pointer: BlobPointer;
    satellites: BlobSatelliteSystem;
    config: BlobConfig;
    /**
     * BI.W-E10-AURORA-ENTRANCE (value.js T-60) — the reveal-bloom CONSUMER DOOR
     * (the twin of `AuroraRuntimeOptions.revealBloom`; the door lands on BOTH
     * chromatic runtimes). The one-shot cold-first-VISIBLE `filter`-bloom
     * (`data-substrate-reveal` → `@keyframes substrate-reveal-bloom`). Defaults
     * `true` — the blob keeps a materialize entrance, but the keyframe is now
     * PALETTE-HONEST (brightness/saturate never dip below 1, viz-reveal.css), so it
     * never transits the `brightness<1`/`saturate<1` gray veil T-60 condemned over
     * the chromatic field. A consumer (BI.W-BLOB-SEAMS, or an arrival-sync host)
     * opts out with `false`.
     */
    revealBloom?: boolean;
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
    /**
     * BI.W-BLOB-SEAMS (GAP-L5 / value.js T-49) — the public QUIESCENCE seam. `true`
     * IFF the engine is at rest: the mood is settled, the pointer is at rest, AND no
     * satellite is mid-transition (merging / absorbed / emerging / FISSIONING) —
     * i.e. zero in-flight fission beat. Derived from the SAME predicate the demand
     * gate (`shouldContinue`) reads to decide whether to park — NO parallel busy-flag
     * (the U3 single-signal discipline; the seam READS what the engine already knows,
     * no second physics). A consumer parks ITS OWN idle/arming logic only while
     * `settled` is true, so an armed-but-idle hero never freezes mid-split (the
     * value.js 2.7s-idle-vs-5.2s-fission-beat mismatch this closes). READ-ONLY — a
     * consumer observes it, never writes it.
     */
    settled: Readonly<Ref<boolean>>;
    readonly rendererStatus: Readonly<Ref<RendererStatus>>;
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
        satelliteColors,
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

    // BC.W-VIZ-GOOBLOB-MEATBALL — the shared viz-pointer-physics field (BB.B4). The
    // fold is ADDITIVE + byte-faithful: the existing `useBlobPointer` swirl/trail (the
    // attraction model) stays the baseline; this field adds the ACCELERATION
    // (second-derivative) term for the iOS-27 gel snap-back — a fast flick that
    // DECELERATES (the accel OPPOSES the velocity) injects a transient burst into the
    // mood click-pulse so the blob springs toward the pointer. The field owns NO own
    // rAF — it is FED `tick(deltaMs)` from inside the EXISTING `resolveFrame` callback
    // (the createCanvasLifecycle one-loop / proof:offscreen-pause discipline), and
    // FREEZES under PRM/pause (tick(0)). The pointer POSITION is fed from the existing
    // `BlobPointer` model (`setPointer`, PRM-gated); velocity + acceleration are DERIVED
    // in tick. The fold KEEPS useBlobPointer intact (the W-VIZ-POINTER not-re-point rule).
    const pointerField = usePointerVelocityField();

    // BD.W-GOOBLOB-MERCURY-COLONY — wire the pinch-off SNAP to the body-pulse spring. A
    // fission pinch (the mercury bead snapping free, useBlobSatellites) kicks the EXISTING
    // underdamped click-impulse oscillator (`pointer.click`) so the body squash-settles
    // with a cartoon follow-through recoil — the SAME `pulseVel` channel a decel-flick
    // kicks (no new spring, no new clock; the recoil inherits the BD.W-BLOB-MOTION-TUNE ζ).
    // The split rides MOTION; the recoil is the body's reaction to losing a bead.
    satellites.onPinch((impulse) => pointer.click(impulse));

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
    const rendererStatus = shallowRef<RendererStatus>(pendingRenderer("webgpu"));
    let paused = false;

    // BI.W-BLOB-SEAMS — the public quiescence seam (the T-49 `settled` GAP-L5 owner).
    // ONE signal: `shouldContinue` writes it from the SAME `mood.isSettled() &&
    // pointer.isAtRest() && satellites.isQuiescent()` predicate it reads to decide the
    // demand-loop park — there is NO parallel busy-flag (the U3 single-signal
    // discipline). Starts `false`: a cold mount is materializing/armed, not at rest.
    const settled = ref(false);

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

        // BI.W-FIELD-CORE — feed the shared pointer-velocity field from THIS frame callback
        // (NO own rAF — the createCanvasLifecycle one-loop discipline). THE DOUBLE-SMOOTH IS
        // DEAD: the field reads the RAW pointer ([-1,1] → [0,1]) ONCE (not the already-smoothed
        // `pointer.pointer` spring output — feeding a pre-smoothed signal into the field's
        // own smoother was the compound-lag "not smooth" complaint). The blob's own body
        // spring reads the same raw target (parallel, not serial), so no lag compounds. The
        // engagement envelope tracks the SDF hit-test `active`. `tick(0)` under PRM/pause
        // freezes it. We READ BOTH derivative axes (velocity AND acceleration — the accel ask):
        // the iOS-27 GEL SNAP-BACK kicks the mood click-pulse so the body springs toward the
        // pointer on a fast decelerating flick.
        pointerField.setActive(pointer.active.value);
        if (tempo > 0 && pointer.active.value) {
            const raw = pointer.rawPointer();
            pointerField.setPointer(raw.x * 0.5 + 0.5, raw.y * 0.5 + 0.5);
        }
        pointerField.tick(tempo === 0 ? 0 : dtMs);
        const accel = pointerField.acceleration.value;
        const vel = pointerField.velocity.value;
        const decel = -(accel.x * vel.x + accel.y * vel.y);
        if (decel > 0 && tempo > 0) {
            // The decel impulse kicks the EXISTING body pulse oscillator (the one-shot
            // `click` channel — body overshoots toward the pointer then rings back); the
            // flick `burst` scales the amplitude. No new uniform, no new channel.
            pointer.click(Math.min(0.5, decel * 4.0 + pointerField.burst.value * 0.2));
        }

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
            // F9.R1 — the per-satellite explicit shades (absent → the GL seam stays OFF).
            satColors: satelliteColors?.value,
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
        // The engine's OWN quiescence — the SINGLE predicate. The public `settled` seam
        // (BI.W-BLOB-SEAMS) and the demand-loop park decision read this ONE expression,
        // so the consumer-visible seam can never drift from the loop's own belief (the
        // U3 single-signal discipline). `quiescent` is `true` IFF the mood is settled,
        // the pointer is at rest, AND no satellite is mid-transition (isQuiescent is
        // false for any phase !== "orbiting", so a mid-FISSIONING beat holds it live —
        // zero-in-flight-fission-beat by construction). Written before the `paused`
        // short-circuit so the seam reflects the real physics state even while paused.
        const quiescent =
            mood.isSettled() && pointer.isAtRest() && satellites.isQuiescent();
        settled.value = quiescent;
        if (paused) return false;
        if (!quiescent) {
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

    // BG.W-VIZ-RESIZE-ADOPT — the DPR policy the LEAF sizer consumes. The focal
    // goo-blob KEEPS resolveBudgetDpr() (2×, sharp silhouette — distinct from aurora's
    // sub-2× wash ceiling); the `half` quality axis halves the backing buffer (~4×
    // fragment savings, the soft FBM/AA edge hides the interpolation). The leaf measures
    // the LAID-OUT box (gBCR, never clientWidth/300×150) and sizes the backing to
    // round(gBCR × dprPolicy) — the consumer no longer self-measures.
    const blobDprPolicy = (): number =>
        resolveBudgetDpr() * (config.quality === "half" ? 0.5 : 1.0);

    function start(canvas: HTMLCanvasElement) {
        canvasHandle = createGpuSubstrate(canvas, {
            dprPolicy: blobDprPolicy,
            // BI.W-E10-AURORA-ENTRANCE (value.js T-60) — the reveal-bloom door (twin of
            // the aurora runtime's). DEFAULT ON: the blob keeps a materialize entrance,
            // but the `substrate-reveal-bloom` keyframe is now PALETTE-HONEST (no
            // brightness<1/saturate<1 veil over the chromatic field — viz-reveal.css).
            // A consumer opts out via `revealBloom: false`.
            revealBloom: options.revealBloom ?? true,
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

                // BG.W-VIZ-RESIZE-ADOPT — upload-only: the leaf already sized the backing
                // (round(gBCR × blobDprPolicy)); the closure only uploads the viewport.
                function resize(s?: BackingSize) {
                    gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
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
            onStatus: (status) => (rendererStatus.value = status),
        });

        // The WebGPU path needs the async device-acquire (`armAsync`); the WebGL2
        // fallback's `armAsync` resolves immediately off the synchronous `arm()`, so this
        // one call arms BOTH backends. Fire-and-forget — a device-init failure is
        // surfaced by the substrate's own `onInitError`; the loop simply never arms.
        void canvasHandle.armAsync().catch(() => undefined);
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
    watch(rimColor, () => canvasHandle?.wake());
    watch(paletteStops, () => canvasHandle?.wake(), { deep: true });
    if (satelliteColors) {
        watch(satelliteColors, () => canvasHandle?.wake(), { deep: true });
    }

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
        // BI.W-BLOB-SEAMS — the read-only quiescence seam (see the interface doc). A
        // plain ref widened to `Readonly<Ref<boolean>>` so the consumer observes
        // `.value` but the type forbids writing it (the single writer is
        // `shouldContinue`, the U3 single-signal discipline).
        settled,
        rendererStatus: readonly(rendererStatus),
    };
}
