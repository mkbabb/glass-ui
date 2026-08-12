// THE ONE CLOCK.
//
// A single parameter `head_t ∈ [0,1)` advanced by frame time inside the substrate's own
// frame callback. There is no second rAF, no second scheduler, and no second place a
// frame can come from.
//
// LAW 2 — TOUCH MEANS TIME. The pointer scrubs and flicks this clock and nothing else.
// The figure never translates, leans, or chases the cursor: a drawing machine that slides
// around under your finger is not showing you a transform, it is showing you a toy.
//
// THE RATE FLOOR. `rate = max(0, base + scrub + momentum)`. The clock may PAUSE — a hard
// scrub against the travel stops it dead — but it can never un-draw, because a curve that
// erases itself under a flick is telling the reader something false about the integral.
// The scrubber's own hand is the only backward path there is.
//
// THE FLICK is velocity-seeded and edge-latched: ONE impulse per gesture, sprung on the
// substrate-travel row by JOB (`springPreset("world")`), never on a remembered pair. The
// invariant this module owns is the CONSUMED damping fraction — at ζ ≥ 0.82 a flick has
// zero backward frames at any flick speed a hand can produce. The advance is capped at
// `FOURIER_FLICK_TURNS`: `|∫flick| = v/ω² ≤ 0.5` turns, so a full flick moves the head by
// at most half a figure and the machine stays checkable.

import { onScopeDispose, readonly, shallowRef, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
    type RendererStatus,
} from "../../composables/glass/webgpu/useGpuSubstrate";
import { pendingRenderer } from "../../composables/glass/webgpu/rendererStatus";
import { usePointerVelocityField } from "../../composables/motion/pointer/usePointerVelocityField";
import type { OklchStop } from "../../composables/color";
import { FOURIER_DPR_CAP, type FourierFieldConfig } from "./constants";
import { createFourierClock } from "./clock";
import { createFourierWGPUSetup, createFourierUnsupportedSetup } from "./renderer/wgpu";
import type { MintedSpectrum } from "./renderer/mint";

export interface UseFourierFieldOptions {
    config: FourierFieldConfig;
    /** The minted spectrum (identity-stable until the source or seed changes). */
    getSpectrum: () => MintedSpectrum;
    /** The resolved palette stops as OKLCh. */
    getPalette: () => OklchStop[];
    /**
     * Whether the pointer drives the clock. ONE authority — the component's own
     * `interactive` prop — read live rather than copied into the config.
     */
    interactive: () => boolean;
    /** Hold the clock at its current parameter and never advance. */
    freeze?: () => boolean;
    /** `"capture"` → renderAt-only (the deterministic capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The handle a consumer wires its lifecycle and its transport against. */
export interface FourierFieldHandle {
    /** The resolved backend. Always `"webgpu"` where the field paints at all. */
    readonly backend: GpuBackend;
    /** Park the loop (the pause seam). */
    pause: () => void;
    /** Re-arm the loop. */
    resume: () => void;
    /** Re-arm a parked loop on demand. */
    wake: () => void;
    /** The live `prefers-reduced-motion: reduce` state. */
    readonly reducedMotion: boolean;
    /** The current loop parameter `head_t ∈ [0,1)`. */
    readonly headT: number;
    /**
     * The same parameter as a REACTIVE read, refreshed off the one clock at a rate a
     * reader (or a screen reader) can follow. It is a sample of the frame loop, never a
     * second one.
     */
    readonly headTLive: Readonly<Ref<number>>;
    readonly rendererStatus: Readonly<Ref<RendererStatus>>;
    /** Scrub the clock directly. Takes no spring — a hand's position is not a physics event. */
    setHeadT: (t: number) => void;
    /** Inject one flick impulse, in turns per second. Capped and floored like any other. */
    flick: (turnsPerSec: number) => void;
    dispose: () => void;
}

export function useFourierField(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseFourierFieldOptions,
): FourierFieldHandle {
    const { config, getSpectrum, getPalette } = options;
    const mode = options.mode ?? "live";
    const isInteractive = options.interactive;

    // ── The clock — ONE implementation, shared with its own gate. ──
    const clock = createFourierClock();
    let lastFrameSec = -1;
    /** The reactive sample of `headT`, republished at most this often (ms). */
    const HEAD_PUBLISH_MS = 100;
    const headTLive = shallowRef(0);
    let lastPublishMs = -Infinity;

    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    /** Frozen means the CLOCK holds. Reduced motion is the same event, not a second one. */
    const isFrozen = (): boolean =>
        (options.freeze?.() ?? false) || (handle?.reducedMotion ?? false);

    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec >= 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);

        const engaged = isInteractive() && pointer.active.value;
        clock.step({
            dt: deltaMs / 1000,
            speed: config.speed,
            scrubVelocity: engaged ? pointer.velocity.value.x : 0,
            burst: engaged ? pointer.burst.value : 0,
            engaged,
            frozen: isFrozen(),
        });

        const nowMs = timeSec * 1000;
        if (nowMs - lastPublishMs >= HEAD_PUBLISH_MS) {
            lastPublishMs = nowMs;
            headTLive.value = clock.headT;
        }
    }

    // ── Pointer listeners on the host (the canvas itself never listens). ──
    const onMove = (e: Event): void => {
        pointer.onPointerMove(e as PointerEvent);
        if (isInteractive()) handle?.wake();
    };
    const onEnter = (): void => {
        pointer.onPointerEnter();
        if (isInteractive()) handle?.wake();
    };
    const onLeave = (): void => {
        pointer.onPointerLeave();
    };
    const pointerHost = (canvas: HTMLCanvasElement): HTMLElement =>
        canvas.parentElement ?? canvas;
    function bindPointer(canvas: HTMLCanvasElement): void {
        const host = pointerHost(canvas);
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);
    }
    function unbindPointer(canvas: HTMLCanvasElement): void {
        const host = pointerHost(canvas);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", onLeave);
    }

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    const rendererStatus = shallowRef<RendererStatus>(pendingRenderer("webgpu"));
    let disposed = false;
    const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
        if (disposed) return null;
        const canvas = canvasRef.value;
        if (!canvas) return null;
        if (!handle) {
            bindPointer(canvas);
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                dprPolicy: () => FOURIER_DPR_CAP,
                composeIntersectionPark: true,
                revealBloom: true,
                setupWGPU: createFourierWGPUSetup({
                    canvas,
                    config,
                    getSpectrum,
                    getPalette,
                    getHeadT: () => clock.headT,
                    shouldContinue: () => true,
                    onFrame,
                }),
                // Declared closed — see `createFourierUnsupportedSetup`. There is one
                // renderer; where it cannot run, the field says so and paints nothing.
                setupGL: createFourierUnsupportedSetup(),
                onStatus: (status) => (rendererStatus.value = status),
            });
            void handle.armAsync().catch(() => undefined);
        }
        return handle;
    };
    queueMicrotask(() => ensure());

    const h: FourierFieldHandle = {
        get backend(): GpuBackend {
            return ensure()?.backend ?? "webgpu";
        },
        pause: () => ensure()?.suspend("manual"),
        resume: () => ensure()?.resume("manual"),
        wake: () => ensure()?.wake(),
        get reducedMotion() {
            return handle?.reducedMotion ?? false;
        },
        get headT() {
            return clock.headT;
        },
        headTLive: readonly(headTLive),
        rendererStatus: readonly(rendererStatus),
        setHeadT: (t: number) => {
            clock.set(t);
            headTLive.value = clock.headT;
            ensure()?.wake();
        },
        flick: (turnsPerSec: number) => {
            clock.flick(turnsPerSec);
            ensure()?.wake();
        },
        dispose: () => {
            if (disposed) return;
            disposed = true;
            const canvas = canvasRef.value;
            if (canvas) unbindPointer(canvas);
            pointer.dispose();
            handle?.dispose();
        },
    };
    onScopeDispose(() => h.dispose());
    return h;
}
