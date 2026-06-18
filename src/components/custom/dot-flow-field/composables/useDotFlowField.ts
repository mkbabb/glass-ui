// BB.W-VIZ-SUITE (W-FLOWFIELD) — the public composable: the studio handle + the
// lifecycle wiring over the WebGPU-first substrate (with the Canvas2D fallback).
//
// `useDotFlowField(canvasRef, options)` composes the backend picker — `createGpuSubstrate`
// (the `setupWGPU` compute+render two-pass primary) WHERE WebGPU is supported, else
// `useCanvas2D` (the §3a CPU-stepped point-cloud fallback over the SAME lifecycle leaf).
// It wires the offscreen pause + the `DockBackgroundToggle` WCAG-2.2.2 pause/resume seam +
// `wake()` on pointer, and exposes the uniform `DotFlowFieldHandle`. The renderer owns the
// frame loop (the canvas lifecycle leaf); this composable re-implements ZERO scheduling.

import { onScopeDispose, type Ref } from "vue";
import {
    createGpuSubstrate,
    supportsWebGPU,
    type GpuBackend,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { useCanvas2D } from "../../../../composables/glass/canvas2d/useCanvas2D";
import { oklchStopToHex, type OklchStop } from "../../../../composables/color";
import type { FlowFieldConfig } from "../constants";
import { createFlowWGPUSetup } from "./useFlowParticles";
import { createCpuFlowField } from "../shaders/flow-field.glsl";

export interface UseDotFlowFieldOptions {
    config: FlowFieldConfig;
    /** Resolve the dot-color palette as OKLCh (the demo themes it; default warm-identity). */
    getPalette: () => OklchStop[];
    /** `"capture"` → renderAt-only (the deterministic π capture path). Default `"live"`. */
    mode?: "live" | "capture";
}

/** The uniform handle a consumer wires its lifecycle against (backend-agnostic). */
export interface DotFlowFieldHandle {
    /** The resolved backend (`"webgpu"` where supported, else the Canvas2D fallback as `"webgl2"`). */
    readonly backend: GpuBackend;
    /** Park the loop (the WCAG-2.2.2 pause seam — `DockBackgroundToggle` wires this). */
    pause: () => void;
    /** Re-arm the loop. */
    resume: () => void;
    /** Re-arm a parked loop on demand (a pointer/setter that re-introduced motion). */
    wake: () => void;
    /** Draw one frame out-of-loop (capture / thumbnail). */
    renderAt: (timeSec: number) => void;
    /** The live `prefers-reduced-motion: reduce` state. */
    readonly reducedMotion: boolean;
    /** Tear down the renderer + release GPU/2D resources. */
    dispose: () => void;
}

/**
 * Mount the dot-flow-field renderer on `canvasRef`. The WebGPU primary runs the
 * compute+render two-pass; the Canvas2D fallback steps the SAME `flowField.ts` evaluator
 * (the ONE math source). Returns the uniform lifecycle handle.
 */
export function useDotFlowField(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseDotFlowFieldOptions,
): DotFlowFieldHandle {
    const { config, getPalette } = options;
    const mode = options.mode ?? "live";

    // ── WebGPU primary path ──
    if (supportsWebGPU()) {
        let handle: ReturnType<typeof createGpuSubstrate> | null = null;
        const ensure = (): ReturnType<typeof createGpuSubstrate> | null => {
            const canvas = canvasRef.value;
            if (!canvas) return null;
            if (!handle) {
                handle = createGpuSubstrate(canvas, {
                    mode,
                    respectReducedMotion: config.respectReducedMotion,
                    setupWGPU: createFlowWGPUSetup({
                        canvas,
                        config,
                        getPalette,
                        shouldContinue: () => true,
                        getReducedMotion: () => handle?.reducedMotion ?? false,
                    }),
                    // The picker requires a `setupGL` (the WebGL2 path); a flow viz that
                    // reaches the WebGPU branch never invokes it, but the picker contract
                    // demands it. On a no-WebGPU device this composable takes the Canvas2D
                    // fallback branch below (NOT this WebGL2 stub) per §3a.
                    setupGL: () => ({
                        frame: () => {},
                        shouldContinue: () => false,
                        resize: () => {},
                    }),
                });
                void handle.armAsync();
            }
            return handle;
        };
        // Arm once the canvas resolves (microtask — the ref is set after mount).
        queueMicrotask(() => ensure());

        const h: DotFlowFieldHandle = {
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

    // ── Canvas2D fallback path (the §3a CPU-stepped point cloud) ──
    const field = createCpuFlowField(config);
    let lastNow = -1;
    const canvas2d = useCanvas2D({
        canvas: () => canvasRef.value,
        respectReducedMotion: config.respectReducedMotion,
        autoStart: mode === "live",
        setup: (ctx) => {
            return {
                render: (c, now) => {
                    const timeSec = now / 1000;
                    const dt =
                        lastNow < 0
                            ? 0
                            : Math.min(Math.max((now - lastNow) / 1000, 0), 0.05);
                    lastNow = now;
                    if (dt > 0) field.step(dt, timeSec);
                    const cv = canvasRef.value;
                    const wCss = cv?.clientWidth || 320;
                    const hCss = cv?.clientHeight || 320;
                    const stop = getPalette()[0] ?? config.palette[0];
                    field.paint(c, wCss, hCss, timeSec, oklchStopToHex(stop));
                },
            };
        },
    });

    const h: DotFlowFieldHandle = {
        backend: "webgl2",
        pause: () => canvas2d.suspend("manual"),
        resume: () => canvas2d.resume("manual"),
        wake: () => canvas2d.wake(),
        renderAt: () => {
            // The Canvas2D fallback paints through its own arm; a manual renderAt re-arms
            // a single static frame (the capture path).
            canvas2d.wake();
        },
        get reducedMotion() {
            return canvas2d.reducedMotion;
        },
        dispose: () => canvas2d.dispose(),
    };
    onScopeDispose(() => h.dispose());
    return h;
}
