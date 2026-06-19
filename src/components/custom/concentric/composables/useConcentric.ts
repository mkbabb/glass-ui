// BC.W-VIZ-CONCENTRIC — the public composable: the studio handle + the lifecycle wiring
// over the WebGPU-first substrate (with the WebGL2 GLSL fallback) + the shared pointer field.
//
// `useConcentric(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` fullscreen-fragment primary WHERE WebGPU is supported, else the `setupGL`
// WebGL2 fragment fallback. It wires the offscreen pause + the `DockBackgroundToggle`
// WCAG-2.2.2 pause/resume seam + `wake()` on demand, and exposes the uniform
// `ConcentricHandle`. The renderer owns the frame loop (the canvas lifecycle leaf); this
// composable re-implements ZERO scheduling.
//
// THE POINTER (BC.W-VIZ-INTERACTION). When `config.interactive`, the rings warp toward the
// cursor: useConcentric composes the SHARED `usePointerVelocityField` (NEVER a second rAF —
// the field is FED `tick(delta)` from inside the renderer's existing `frame` callback via the
// `onFrame` setup hook) and injects a TRANSIENT ring-family center about the pointer
// (position → center, velocity → off-axis stretch, burst → an expanding ripple). The
// pointermove/enter/leave listeners are bound on the canvas; PRM freezes the field (the
// usePointerVelocityField `tick(0)` discipline).

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";
import type { OklchStop } from "../../../../composables/color";
import type { ConcentricConfig } from "../constants";
import { MAX_CENTERS as MAX_CONCENTRIC_CENTERS } from "../constants";
import type { RingCenter } from "./ringField";
import { createConcentricWGPUSetup } from "./concentricWGPUSetup";
import { createConcentricGLSetup } from "./concentricGLSetup";

export interface UseConcentricOptions {
    config: ConcentricConfig;
    /** Resolve the field-value palette as OKLCh (the demo themes it; default warm-identity). */
    getPalette: () => OklchStop[];
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface ConcentricHandle {
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
    /** Tear down the renderer + release GPU/GL resources. */
    dispose: () => void;
}

/**
 * Mount the concentric renderer on `canvasRef`. The WebGPU primary + the WebGL2 fallback are
 * BOTH pure fullscreen fragment passes evaluating the SAME radial-Fourier field (the ONE
 * math source `ringField.ts`), so the picker is the only seam. Returns the uniform lifecycle
 * handle.
 */
export function useConcentric(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseConcentricOptions,
): ConcentricHandle {
    const { config, getPalette } = options;
    const mode = options.mode ?? "live";

    // The shared pointer-physics field (NO own rAF — fed by the renderer frame via onFrame).
    const pointer = usePointerVelocityField({
        respectReducedMotion: config.respectReducedMotion,
    });

    // The INTERNAL render-centers array — the setups read THIS, never the consumer's
    // reactive `config.centers` directly, so the transient cursor center is appended here
    // WITHOUT mutating the consumer's config (no reactive feedback churn).
    let renderCenters: RingCenter[] = config.centers.slice();
    let lastFrameSec = 0;

    // Bind the pointer listeners on the canvas. A first hover wakes a parked loop on the
    // SAME frame (the no-delayed-response discipline — the GooBlob pointer-wake precedent).
    const onEnter = (): void => {
        pointer.onPointerEnter();
        if (config.interactive) handle?.wake();
    };
    const onMove = (e: Event): void => {
        pointer.onPointerMove(e as PointerEvent);
        if (config.interactive) handle?.wake();
    };
    // The pointer events bind on the WRAPPER (the canvas is `pointer-events: none` so the
    // gleam never eats the page's hit-testing; the wrapper carries the listeners).
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

    // The per-frame pointer hook the setups invoke from inside their frame callback. It
    // advances the field one renderer frame (the push-API tick) and injects/removes the
    // transient cursor ring-family center.
    function onFrame(timeSec: number): void {
        const deltaMs = lastFrameSec > 0 ? (timeSec - lastFrameSec) * 1000 : 16.7;
        lastFrameSec = timeSec;
        pointer.tick(deltaMs);

        // Re-read the AUTHOR centers from the (live) config each frame so a configurator edit
        // reaches the buffer; the transient cursor center is appended to OUR array only.
        renderCenters = config.centers.slice(0, MAX_CONCENTRIC_CENTERS);
        if (!config.interactive || !pointer.active.value) return;
        if (renderCenters.length >= MAX_CONCENTRIC_CENTERS) return;

        // Map the normalized pointer (0..1, y-down) → domain space (-1..1, y-up). The
        // velocity tilts the transient family (off-axis stretch via rotAlpha); the burst
        // lifts its weight (an expanding ripple as a flick fires).
        const sp = pointer.smoothedPosition.value;
        const vel = pointer.velocity.value;
        const cx = sp.x * 2 - 1;
        const cy = -(sp.y * 2 - 1);
        const rot = Math.atan2(vel.y, vel.x);
        const ripple = 0.35 + Math.min(0.65, pointer.burst.value);
        renderCenters.push({ x: cx, y: cy, weight: ripple, rotAlpha: rot });
    }
    const getCenters = (): RingCenter[] => renderCenters;

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
        const canvas = canvasRef.value;
        if (!canvas) return null;
        if (!handle) {
            bindPointer(canvas);
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                setupWGPU: createConcentricWGPUSetup({
                    canvas,
                    config,
                    getPalette,
                    getCenters,
                    shouldContinue: () => true,
                    onFrame,
                }),
                setupGL: createConcentricGLSetup({
                    canvas,
                    config,
                    getPalette,
                    getCenters,
                    shouldContinue: () => true,
                    onFrame,
                }),
            });
            void handle.armAsync();
        }
        return handle;
    };
    // Arm once the canvas resolves (microtask — the ref is set after mount).
    queueMicrotask(() => ensure());

    const h: ConcentricHandle = {
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
