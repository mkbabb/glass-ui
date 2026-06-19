// BC.W-VIZ-FOURIER — the public composable: the studio handle + the lifecycle wiring over
// the WebGPU-first substrate (with the WebGL2 GLSL fallback) + the shared pointer field +
// the ONE head_t clock.
//
// `useFourierField(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` compute+fullscreen-fragment primary WHERE WebGPU is supported, else the
// `setupGL` WebGL2 SDF fallback (the §E "WebGPU everywhere" mandate — the Canvas2D renderer
// is RETIRED; this composable carries NO `useCanvas2D` import and NO `getContext("2d")`).
// It wires the offscreen pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume seam +
// `wake()` on demand, and exposes the uniform `FourierFieldHandle`. The renderer owns the
// frame loop (the canvas lifecycle leaf); this composable re-implements ZERO scheduling.
//
// THE ONE CLOCK (head_t). The single loop parameter `head_t ∈ [0,1)` is advanced by frame
// time inside the substrate's `onFrame` hook (NO second rAF — the §6.1 one-clock discipline,
// coordinated with W-VIZ-CHOREOGRAPHY). `freeze`/PRM short-circuit to the deterministic
// `frozenT`; the pointer SCRUB re-seats head_t directly (pointer X → head_t); a flick injects
// a velocity-continuous momentum impulse that decays back to ambient speed.
//
// THE POINTER (BC.W-VIZ-INTERACTION). When `config.interactive`, useFourierField composes the
// SHARED `usePointerVelocityField` (NEVER a second rAF — the field is FED `tick(delta)` from
// inside the renderer's `onFrame` hook): pointer X scrubs head_t, the flick burst injects clock
// momentum, the accel term blooms the head/swells the chain (a sub-perceptual cap). PRM keeps
// the scrub (a position read) but drops the momentum (the `tick(0)` discipline).

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import type { OklchStop } from "../../../../composables/color";
import type { FourierFieldConfig } from "../constants";
import type { BasisComponent } from "../math";
import { createFourierWGPUSetup } from "./fourierFieldWGPUSetup";
import { createFourierGLSetup } from "./fourierFieldGLSetup";

export interface UseFourierFieldOptions {
    config: FourierFieldConfig;
    /** The active phasor spectrum (CPU-minted; re-read each frame so a source-swap reaches the buffer). */
    getSpectrum: () => readonly BasisComponent[];
    /** Resolve the curve-color palette as OKLCh (the demo themes it; default warm-identity). */
    getPalette: () => OklchStop[];
    /** When true, hold the deterministic best-frame and never advance (the capture / freeze lever). */
    freeze?: () => boolean;
    /** The static deterministic best-frame parameter under `freeze`/PRM. Default 0.34. */
    frozenT?: number;
    /** Base forward period for one full traversal at 1× speed, in seconds. Default 16. */
    periodS?: number;
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface FourierFieldHandle {
    /** The resolved backend (`"webgpu"` where supported, else the WebGL2 GLSL fallback). */
    readonly backend: GpuBackend;
    /** Park the loop (the WCAG-2.2.2 pause seam — `DockBackgroundToggle` wires this). */
    pause: () => void;
    /** Re-arm the loop. */
    resume: () => void;
    /** Re-arm a parked loop on demand. */
    wake: () => void;
    /** Draw one frame out-of-loop (capture / thumbnail). */
    renderAt: (timeSec: number) => void;
    /** The live `prefers-reduced-motion: reduce` state. */
    readonly reducedMotion: boolean;
    /** The current loop parameter `head_t ∈ [0,1)` (the scrubber reads/writes it). */
    readonly headT: number;
    /** Scrub the clock directly (the transport scrubber / a pointer drag). */
    setHeadT: (t: number) => void;
    /** Tear down the renderer + release GPU/GL resources. */
    dispose: () => void;
}

export function useFourierField(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseFourierFieldOptions,
): FourierFieldHandle {
    const { config, getSpectrum, getPalette } = options;
    const mode = options.mode ?? "live";
    const frozenT = options.frozenT ?? 0.34;
    const periodS = options.periodS ?? 16;

    // ── The ONE head_t clock (no second rAF — advanced by the substrate frame). ──
    let headT = 0;
    let lastFrameSec = -1;
    let momentum = 0; // a flick-injected velocity-continuous impulse (1/s), decaying to 0.

    // ── The shared pointer-physics field (FED by the renderer frame via onFrame). ──
    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    const isFrozen = (): boolean =>
        (options.freeze?.() ?? false) || (handle?.reducedMotion ?? false);

    // The per-frame hook the setups invoke from inside their frame callback. It advances the
    // shared pointer field (the push-API tick) + the head_t clock (the ONE clock).
    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec >= 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);

        if (isFrozen()) {
            headT = frozenT;
            momentum = 0;
            return;
        }

        const dt = Math.min(Math.max(deltaMs / 1000, 0), 0.05);

        if (config.interactive && pointer.active.value) {
            // SCRUB: pointer X → head_t directly (left rewinds, right fast-forwards). The
            // smoothed X is the loop parameter; the chain assembles/disassembles under the finger.
            headT = pointer.smoothedPosition.value.x % 1;
            if (headT < 0) headT += 1;
            // A fast flick injects a momentum impulse (velocity-continuous fling-and-settle).
            momentum = pointer.burst.value * 4.0;
            return;
        }

        // Free advance at the config speed + the decaying flick momentum.
        const baseRate = config.speed / periodS; // turns per second
        const rate = baseRate + momentum;
        headT = (headT + rate * dt) % 1;
        if (headT < 0) headT += 1;
        // Decay the flick momentum back to ambient speed (iOS fling settle).
        momentum *= Math.pow(0.92, dt * 60);
        if (Math.abs(momentum) < 1e-4) momentum = 0;
    }

    const getHeadT = (): number => headT;

    // ── Pointer listeners on the wrapper (the canvas is pointer-events:none). ──
    const onMove = (e: Event): void => {
        pointer.onPointerMove(e as PointerEvent);
        if (config.interactive) handle?.wake();
    };
    const onEnter = (): void => {
        pointer.onPointerEnter();
        if (config.interactive) handle?.wake();
    };
    const pointerHost = (canvas: HTMLCanvasElement): HTMLElement =>
        canvas.parentElement ?? canvas;
    function bindPointer(canvas: HTMLCanvasElement): void {
        const host = pointerHost(canvas);
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", pointer.onPointerLeave);
    }
    function unbindPointer(canvas: HTMLCanvasElement): void {
        const host = pointerHost(canvas);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", pointer.onPointerLeave);
    }

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
        const canvas = canvasRef.value;
        if (!canvas) return null;
        if (!handle) {
            bindPointer(canvas);
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                setupWGPU: createFourierWGPUSetup({
                    canvas,
                    config,
                    getSpectrum,
                    getPalette,
                    getHeadT,
                    shouldContinue: () => true,
                    onFrame,
                }),
                setupGL: createFourierGLSetup({
                    canvas,
                    config,
                    getSpectrum,
                    getPalette,
                    getHeadT,
                    shouldContinue: () => true,
                    onFrame,
                }),
            });
            void handle.armAsync();
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
        renderAt: (t) => ensure()?.renderAt(t),
        get reducedMotion() {
            return handle?.reducedMotion ?? false;
        },
        get headT() {
            return headT;
        },
        setHeadT: (t: number) => {
            headT = ((t % 1) + 1) % 1;
            ensure()?.wake();
        },
        dispose: () => {
            const canvas = canvasRef.value;
            if (canvas) unbindPointer(canvas);
            pointer.dispose();
            handle?.dispose();
        },
    };
    onScopeDispose(() => h.dispose());
    return h;
}
