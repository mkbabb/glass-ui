// BB.W-VIZ-SUITE (W-GPU-SUBSTRATE) — `useGpuSubstrate`: the transparent feature-detect
// picker. WebGPU-first WHERE THE PLATFORM ALLOWS IT (the June-2026 Baseline fact); the
// WebGL2 substrate is the graceful fallback (NOT retired — the ~5-10% tail: Linux
// Firefox, pre-A12 iPhones, flagged Firefox-Android).
//
// A viz consumer authors TWO `setup` callbacks — one WGSL pipeline (`setupWGPU`), one
// GLSL program (`setupGL`) — and reaches for `createGpuSubstrate(canvas, options)`. The
// picker reads `supportsWebGPU()` ONCE and selects the backend; everything downstream is
// substrate-AGNOSTIC. Both backends already expose the identical
// `CanvasLifecycleHandle`-derived surface (`arm`/`suspend`/`resume`/`wake`/`renderAt`/
// `dispose`/`reducedMotion`), so a viz's lifecycle wiring (offscreen pause via
// `useIntersectionPause`, the `DockBackgroundToggle` pause/resume, `wake()` on pointer)
// is byte-identical regardless of backend.
//
// The ONE seam difference: the WebGPU device request is async, so the picker exposes
// `armAsync()` (the WebGPU path awaits the device; the WebGL2 fallback resolves
// immediately off the synchronous `arm()`). A consumer calls `armAsync()` to start the
// loop; the returned `arm()` is the synchronous twin (a no-op on the WebGPU path until
// the device resolves — the uniform-handle parity for a consumer that does not await).

import {
    createWebGLCanvas,
    type WebGLCanvasFrame,
    type WebGLCanvasOptions,
} from "../webgl/useWebGLCanvas";
import {
    createWebGPUCanvas,
    supportsWebGPU,
    type WebGPUCanvasFrame,
    type WebGPUCanvasOptions,
} from "./useWebGPUCanvas";

export { supportsWebGPU };

/** Which backend the picker resolved. */
export type GpuBackend = "webgpu" | "webgl2";

export interface GpuSubstrateOptions {
    /** `"capture"` → renderAt-only (no auto-loop). Default `"live"`. */
    mode?: "live" | "capture";
    /** Honor `prefers-reduced-motion: reduce` (one static frame then park). Default `true`. */
    respectReducedMotion?: boolean;
    /**
     * The WGSL pipeline builder (the WebGPU primary path). Omitting it forces the
     * WebGL2 fallback even where WebGPU is supported (a viz with no WGSL path yet).
     */
    setupWGPU?: WebGPUCanvasOptions["setup"];
    /** The GLSL program builder (the WebGL2 fallback path — always required). */
    setupGL: WebGLCanvasOptions["setup"];
    /** WebGPU `context.configure` alpha mode (default `"premultiplied"`). */
    alphaMode?: WebGPUCanvasOptions["alphaMode"];
    /** WebGPU adapter/device request options. */
    adapterOptions?: WebGPUCanvasOptions["adapterOptions"];
    deviceDescriptor?: WebGPUCanvasOptions["deviceDescriptor"];
    /** WebGL2 `getContext("webgl2", …)` attributes. */
    contextAttrs?: WebGLCanvasOptions["contextAttrs"];
    /** Surface a device-init / validation failure (the WebGPU path). */
    onInitError?: WebGPUCanvasOptions["onInitError"];
}

/**
 * The uniform substrate handle. A viz consumer wires its lifecycle (offscreen pause,
 * pause/resume, pointer-`wake`, capture-`renderAt`) against THIS — identical across the
 * WebGPU and WebGL2 backends. `armAsync` is the start seam (the WebGPU path awaits the
 * device; the WebGL2 path resolves immediately); `arm` is the synchronous twin.
 */
export interface GpuSubstrateHandle {
    /** The resolved backend (`"webgpu"` where supported + a WGSL path is provided, else `"webgl2"`). */
    readonly backend: GpuBackend;
    /** Acquire the device/context + `setup` + arm the loop. Resolves once armed. */
    armAsync: () => Promise<void>;
    /** Synchronous arm (the WebGL2 path arms immediately; the WebGPU path is a no-op until the device resolves). */
    arm: () => void;
    suspend: (reason?: "tab-hidden" | "off-screen" | "off-screen-io" | "manual") => void;
    resume: (reason?: "tab-hidden" | "off-screen" | "off-screen-io" | "manual") => void;
    wake: () => void;
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    readonly reducedMotion: boolean;
}

/**
 * Pick the backend + return the uniform handle. WebGPU-first (`supportsWebGPU()` AND a
 * `setupWGPU` callback is provided); otherwise the WebGL2 fallback. The decision is
 * made ONCE at construction (a mount-time device-tier choice, not a reactive one).
 */
export function createGpuSubstrate(
    canvas: HTMLCanvasElement,
    options: GpuSubstrateOptions,
): GpuSubstrateHandle {
    const useGpu = supportsWebGPU() && options.setupWGPU != null;

    if (useGpu) {
        const handle = createWebGPUCanvas(canvas, {
            mode: options.mode,
            respectReducedMotion: options.respectReducedMotion,
            // `useGpu` is true only when setupWGPU is present.
            setup: options.setupWGPU as WebGPUCanvasOptions["setup"],
            alphaMode: options.alphaMode,
            adapterOptions: options.adapterOptions,
            deviceDescriptor: options.deviceDescriptor,
            onInitError: options.onInitError,
        });
        return {
            backend: "webgpu",
            armAsync: handle.armAsync,
            arm: handle.arm,
            suspend: handle.suspend,
            resume: handle.resume,
            wake: handle.wake,
            renderAt: handle.renderAt,
            dispose: handle.dispose,
            get reducedMotion() {
                return handle.reducedMotion;
            },
        };
    }

    const handle = createWebGLCanvas(canvas, {
        mode: options.mode,
        respectReducedMotion: options.respectReducedMotion,
        contextAttrs: options.contextAttrs,
        setup: options.setupGL,
    });
    return {
        backend: "webgl2",
        // The WebGL2 backend is synchronous — `armAsync` resolves immediately off the
        // sync `arm()`, so a consumer's `await substrate.armAsync()` works on BOTH
        // backends (the uniform start seam).
        armAsync: async () => {
            handle.arm();
        },
        arm: handle.arm,
        suspend: handle.suspend,
        resume: handle.resume,
        wake: handle.wake,
        renderAt: handle.renderAt,
        dispose: handle.dispose,
        get reducedMotion() {
            return handle.reducedMotion;
        },
    };
}

export type { WebGPUCanvasFrame, WebGLCanvasFrame };
