// the WebGPU backend's public TYPE surface, carved out of
// useWebGPUCanvas.ts to hold the 500-line no-god-module bound (ratchet-drain #4). Pure
// types — NO WebGPU bootstrap token (`navigator.gpu`/`getContext("webgpu")`/
// `requestAdapter` live ONLY in the substrate —  clause A);
// the substrate + the picker (`useGpuSubstrate`) re-import these unchanged.
import type { BackingSize, DprPolicy } from "../webgl/createCanvasLifecycle";

// Lockstep with createCanvasLifecycle's CanvasSuspendReason. `off-screen-io` is
// the IntersectionObserver fallback's own reason, distinct from
// the content-visibility path's "off-screen").
export type WebGPUSuspendReason =
    | "tab-hidden"
    | "off-screen"
    | "off-screen-io"
    | "manual";

/**
 * The per-frame hooks a consumer's `setup(device, context, format)` returns. The
 * consumer owns the WGSL pipeline + bind groups + the per-frame command-encoder
 * record/submit; the substrate owns the schedule.
 */
export interface WebGPUCanvasFrame {
    /**
     * Draw one frame at `timeSec`: the consumer records a command encoder, begins a
     * render pass against the current swap-chain texture view
     * (`context.getCurrentTexture().createView()`), draws, and submits.
     */
    frame: (timeSec: number) => void;
    /** Demand-gate: is there live motion to render next frame? `false` → park. */
    shouldContinue: () => boolean;
    /**
     * Upload the backing geometry.: when a `dprPolicy` is
     * supplied the leaf sizes the backing + passes the live `BackingSize` here (the
     * WGSL swap chain auto-tracks the backing, so the consumer body shrinks to an aspect
     * upload). The arg is optional so a legacy self-measuring consumer keeps compiling.
     */
    resize: (s?: BackingSize) => void;
    /** Frame time from elapsed seconds — the consumer owns frozen/reduced-motion. */
    time?: (elapsedSec: number) => number;
    /** Release per-instance GPU resources (pipelines/buffers/bind groups). Runs on dispose + before a restore re-setup. */
    teardown?: () => void;
}

export interface WebGPUCanvasOptions {
    /** `context.configure` alpha mode (the consumer's — default `"premultiplied"`). */
    alphaMode?: GPUCanvasAlphaMode;
    /** Extra device-request options (features/limits). */
    deviceDescriptor?: GPUDeviceDescriptor;
    /** Adapter-request options (e.g. `powerPreference`). */
    adapterOptions?: GPURequestAdapterOptions;
    /** `"capture"` pre-seeds the `manual` suspension (renderAt-only). Default `"live"`. */
    mode?: "live" | "capture";
    /**
     * Honor `prefers-reduced-motion: reduce` by painting ONE static frame then
     * parking the loop. The shared lifecycle core live-monitors the query via a
     * `matchMedia` `change` listener and re-arms (one static frame) on un-reduce.
     * Default `true` for live mode, `false` for capture mode.
     */
    respectReducedMotion?: boolean;
    /**
     * The consumer's DPR policy. When present the
     * leaf sizes the backing SYNCHRONOUSLY at mount (via `presize`, BEFORE the async
     * device acquire — the ≤6s blurry-flash close) and hands the live `BackingSize` to
     * `resize(s)`. When ABSENT the legacy path runs (the consumer self-measures).
     */
    dprPolicy?: DprPolicy;
    /** Compose the leaf IO park. Default `false`; see createCanvasLifecycle. */
    composeIntersectionPark?: boolean;
    /** `rootMargin` for the leaf IO park. */
    intersectionRootMargin?: string;
    /** Fire the one-shot cold-first-visible entrance bloom via `data-substrate-reveal`. Default `false`. */
    revealBloom?: boolean;
    /**
     * Build the WGSL pipeline + bind groups on the resolved device. Called on the
     * async arm AND on every device-restore. Returns the per-frame hooks.
     */
    setup: (
        device: GPUDevice,
        context: GPUCanvasContext,
        format: GPUTextureFormat,
    ) => WebGPUCanvasFrame;
    /** Internal lifecycle projection used by the shared renderer-status owner. */
    onContextStateChange?: (state: "lost" | "restored") => void;
    /** Surface a device-init, validation failure (no WebGPU adapter, a `setup` throw). */
    onInitError?: (error: unknown) => void;
}

export interface WebGPUCanvasHandle {
    /**
     * Run the expensive ASYNC init (adapter + device + context.configure + `setup`)
     * THEN arm the loop. Resolves once armed (or rejects-via-`onInitError` on a
     * device-unavailable, `setup` failure). Idempotent; a no-op post-dispose.
     */
    armAsync: () => Promise<void>;
    /**
     * Synchronous `arm` — a no-op until `armAsync` has resolved the device (the
     * uniform-handle parity with the synchronous backends; the picker calls
     * `armAsync` for the WebGPU path). Idempotent.
     */
    arm: () => void;
    /** Size the backing and start the leaf RO synchronously before async acquire. */
    presize: () => void;
    suspend: (reason?: WebGPUSuspendReason) => void;
    resume: (reason?: WebGPUSuspendReason) => void;
    /** Re-arm a parked loop (a setter that re-introduced motion calls this). */
    wake: () => void;
    /** Draw one frame at `timeSec` out-of-loop (capture, thumbnail). */
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    /** The live device (null before armAsync, after dispose, mid-loss). */
    readonly device: GPUDevice | null;
    /** Runtime-derived adapter identity, available once acquisition succeeds. */
    readonly adapterClass: string;
    /**
     * The live `prefers-reduced-motion: reduce` state. The shared lifecycle core
     * owns + re-monitors it; consumers read it (e.g. a viz freezes its frame time
     * at the authored offset while this is `true`).
     */
    readonly reducedMotion: boolean;
}
