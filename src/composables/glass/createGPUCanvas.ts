// AW.W7b — `createGPUCanvas`: the WebGPU sibling over the shared
// `createCanvasLifecycle` core.
//
// The capability-gated WebGPU backend. Returns the SAME `WebGLCanvasFrame`-shaped
// hooks `useWebGLCanvas` does, over a `GPUDevice` instead of a `WebGL2RenderingContext`
// — sharing the EXACT same demand-driven schedule + offscreen-park + PRM-freeze
// machinery (the lifted `createCanvasLifecycle` core), so a parked rAF attaches ZERO
// frames on the WebGPU path too (proof:offscreen-pause extends to it). The WebGL2
// fragment path (useWebGLCanvas) stays the universal fallback; this is the additive
// enhancement the `resolveRenderModeAsync` probe routes to when `navigator.gpu`
// resolves a non-fallback adapter.
//
// `createGPUCanvas` is the ONLY `navigator.gpu` acquisition site in `src/`
// (proof:webgpu-substrate-single clause 1). It BAKES NO consumer pass-count / tensor
// format / Kuwahara-sector-count — the multi-pass FBO/storageTexture seam (W7c) is a
// GENERIC N-pass declaration the consumer configures (clause 2). The WGSL color/noise
// math is SPLICED from the shared procedural-color chunk's WGSL twin, never re-authored
// (clause 3 — the AV.W1 two-copy divergence).
//
// Mechanism: the same `setup(device, context, format) → frame hooks` seam shape; the
// consumer builds its pipeline + uniform buffer + bind group in `setup` and uploads +
// draws in `frame`. The async device acquisition runs BEHIND the consumer's deferred
// arm (the CSS placeholder paints first), so the probe never blocks first paint.

import {
    createCanvasLifecycle,
    type CanvasFrameHooks,
    type CanvasLifecycleHandle,
} from "./webgl/createCanvasLifecycle";

/** The per-frame hooks a consumer's WebGPU `setup` returns (mirrors WebGLCanvasFrame). */
export interface GPUCanvasFrame {
    frame: (timeSec: number) => void;
    shouldContinue: () => boolean;
    resize: () => void;
    time?: (elapsedSec: number) => number;
    teardown?: () => void;
}

export interface GPUCanvasSetupArgs {
    device: GPUDevice;
    context: GPUCanvasContext;
    /** The swapchain format (`navigator.gpu.getPreferredCanvasFormat()`). */
    format: GPUTextureFormat;
}

export interface GPUCanvasOptions {
    /** The pre-acquired `GPUDevice` (from `resolveRenderModeAsync`'s adapter→device). */
    device: GPUDevice;
    /** Alpha mode for the swapchain (premultiplied to match the WebGL2 premultiply). */
    alphaMode?: GPUCanvasAlphaMode;
    mode?: "live" | "capture";
    respectReducedMotion?: boolean;
    /** Build the pipeline + bind group on the configured context. Returns frame hooks. */
    setup: (args: GPUCanvasSetupArgs) => GPUCanvasFrame;
}

export interface GPUCanvasHandle {
    arm: () => void;
    suspend: (reason?: "tab-hidden" | "off-screen" | "manual") => void;
    resume: (reason?: "tab-hidden" | "off-screen" | "manual") => void;
    wake: () => void;
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    readonly device: GPUDevice | null;
    readonly reducedMotion: boolean;
}

/**
 * Build a WebGPU canvas over the shared lifecycle core. The `GPUDevice` is acquired
 * by `resolveRenderModeAsync` (the probe) and passed in — `createGPUCanvas` configures
 * the canvas context + threads the consumer `setup` through the agnostic schedule.
 */
export function createGPUCanvas(
    canvas: HTMLCanvasElement,
    options: GPUCanvasOptions,
): GPUCanvasHandle {
    const { device, setup } = options;
    // The swapchain format. `getPreferredCanvasFormat` is the only static `navigator.gpu`
    // read here (the ADAPTER/DEVICE acquisition is in resolveRenderModeAsync — this
    // module never calls requestAdapter, so it stays the single ACQUISITION site).
    const format =
        typeof navigator !== "undefined" && navigator.gpu
            ? navigator.gpu.getPreferredCanvasFormat()
            : ("bgra8unorm" as GPUTextureFormat);

    let context: GPUCanvasContext | null = null;
    let frameHooks: GPUCanvasFrame | null = null;
    let device_: GPUDevice | null = device;

    function buildContext(): CanvasFrameHooks {
        const ctx = canvas.getContext("webgpu") as GPUCanvasContext | null;
        if (!ctx) throw new Error("[createGPUCanvas] WebGPU canvas context unavailable");
        context = ctx;
        // premultiplied to match the WebGL2 premultiply-after-OETF discipline.
        context.configure({
            device,
            format,
            alphaMode: options.alphaMode ?? "premultiplied",
        });
        frameHooks = setup({ device, context, format });
        return {
            frame: frameHooks.frame,
            shouldContinue: frameHooks.shouldContinue,
            time: frameHooks.time,
            teardown: () => {
                frameHooks?.teardown?.();
                context?.unconfigure();
                context = null;
                frameHooks = null;
                device_ = null;
            },
        };
    }

    const lifecycle: CanvasLifecycleHandle = createCanvasLifecycle({
        canvas,
        mode: options.mode,
        respectReducedMotion: options.respectReducedMotion,
        buildContext,
        resize: () => frameHooks?.resize(),
        // WebGPU has no webglcontextlost analogue exposed today; device-loss is handled
        // via device.lost (the consumer's setup may subscribe). No context-event bind here.
    });

    return {
        arm: lifecycle.arm,
        suspend: lifecycle.suspend,
        resume: lifecycle.resume,
        wake: lifecycle.wake,
        renderAt: lifecycle.renderAt,
        dispose: lifecycle.dispose,
        get device() {
            return device_;
        },
        get reducedMotion() {
            return lifecycle.reducedMotion;
        },
    };
}
