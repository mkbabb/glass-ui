// BB.W-VIZ-SUITE (W-CONCENTRIC) — the public composable: the studio handle + the
// lifecycle wiring over the WebGPU-first substrate (with the WebGL2 GLSL fallback).
//
// `useConcentric(canvasRef, options)` composes the `createGpuSubstrate` picker — the
// `setupWGPU` fullscreen-fragment primary WHERE WebGPU is supported, else the `setupGL`
// WebGL2 fragment fallback (the aurora-class clean port, parity `verified`). It wires the
// offscreen pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume seam + `wake()` on
// demand, and exposes the uniform `ConcentricHandle`. The renderer owns the frame loop
// (the canvas lifecycle leaf); this composable re-implements ZERO scheduling.

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import type { OklchStop } from "../../../../composables/color";
import type { ConcentricConfig } from "../constants";
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
 * Mount the concentric renderer on `canvasRef`. The WebGPU primary + the WebGL2 fallback
 * are BOTH pure fullscreen fragment passes evaluating the SAME radial-Fourier field (the
 * ONE math source `ringField.ts`), so the picker is the only seam. Returns the uniform
 * lifecycle handle.
 */
export function useConcentric(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseConcentricOptions,
): ConcentricHandle {
    const { config, getPalette } = options;
    const mode = options.mode ?? "live";

    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
        const canvas = canvasRef.value;
        if (!canvas) return null;
        if (!handle) {
            handle = createGpuSubstrate(canvas, {
                mode,
                respectReducedMotion: config.respectReducedMotion,
                setupWGPU: createConcentricWGPUSetup({
                    canvas,
                    config,
                    getPalette,
                    shouldContinue: () => true,
                }),
                setupGL: createConcentricGLSetup({
                    canvas,
                    config,
                    getPalette,
                    shouldContinue: () => true,
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
        dispose: () => handle?.dispose(),
    };
    onScopeDispose(() => h.dispose());
    return h;
}
