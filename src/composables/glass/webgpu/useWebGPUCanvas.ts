// BB.W-VIZ-SUITE (W-GPU-SUBSTRATE) — `useWebGPUCanvas`: the WebGPU backend over the
// shared `createCanvasLifecycle` core (AU.W6). The THIRD thin wrapper, beside the
// WebGL2 backend (`useWebGLCanvas`) and the Canvas2D backend (`useCanvas2D`).
//
// The backend-AGNOSTIC lifecycle (the three-reason suspend Set, the rAF tick/wake
// demand gate, the document-visibility owner, the content-visibility offscreen-park,
// and the live `prefers-reduced-motion` re-monitor) lives ONCE in
// `createCanvasLifecycle.ts`; this module re-implements ZERO scheduling. It owns ONLY
// the WebGPU-specific concerns the agnostic core threads through the
// `buildContext`/`resize`/`bindContextEvents` seam:
//
//   - the ASYNC device-acquisition PRELUDE (`armAsync()`). `createCanvasLifecycle.arm()`
//     is synchronous; the WebGPU device request is a Promise. So this wrapper owns the
//     async prelude — it awaits `navigator.gpu.requestAdapter()` → `adapter.requestDevice()`
//     ONCE, configures the `webgpu` context against the resolved device + preferred
//     format, runs the consumer's `setup(device, ctx, format)`, THEN calls the leaf's
//     synchronous `arm()`. The leaf's `buildContext()` runs SYNCHRONOUSLY off the
//     already-resolved device (closed over) — the leaf seam is UNTOUCHED, exactly the
//     way `useCanvas2D` owns its `toValue`/deferred-arm prelude without a leaf change.
//   - DPR-aware RESIZE — `canvas.width = clientWidth * dpr` (the consumer owns its DPR
//     policy — the leaf does NOT bake DPR). WebGPU has no `gl.viewport`; the swap chain
//     auto-resizes to the backing store, so no `context.configure` is needed on resize.
//   - the DEVICE-LOSS SELF-HEAL — the WebGPU twin of `webglcontextlost`/`restored`.
//     WebGPU has no DOM event pair; `device.lost` is a Promise resolving with
//     `{ reason, message }`. On a NON-`"destroyed"` loss (a driver TDR timeout) the
//     wrapper marks the surface blank (the leaf nulls its hooks + parks the rAF) then
//     re-acquires the adapter+device and rebuilds (the self-heal); `reason: "destroyed"`
//     (intentional dispose) does NOT re-acquire. A `pushErrorScope`/`popErrorScope`
//     bracket + an `uncapturederror` listener around setup surface validation errors
//     deterministically (not silent garbage).
//
// Lazy-arm + capture: `armAsync()` runs the expensive async init (device + context +
// `setup`); it is idempotent and a no-op after `dispose()`. `mode:"capture"` pre-seeds
// the `manual` suspension in the leaf so the loop never auto-runs (a capture consumer
// draws deterministic frames via `renderAt`). The picker (`useGpuSubstrate`) feature-
// detects `navigator.gpu` and degrades to the WebGL2 backend when WebGPU is absent.

import {
    createCanvasLifecycle,
    type CanvasFrameHooks,
} from "../webgl/createCanvasLifecycle";

/**
 * The ONE `navigator.gpu` capability probe (the single-bootstrap rule — mirrors
 * `probeWebGL2Renderer`). SSR-safe (returns `false` with no `navigator`). The picker
 * (`useGpuSubstrate`) reads it to decide the backend; a consumer NEVER touches
 * `navigator.gpu` directly (it composes the substrate — `proof:gpu-substrate-single`
 * clause A reds a direct call).
 */
export function supportsWebGPU(): boolean {
    return (
        typeof navigator !== "undefined" &&
        "gpu" in navigator &&
        navigator.gpu != null
    );
}

/**
 * The recognizable WebGPU INIT-FAILURE signal (BC.W-WEBGPU-EVERYWHERE — the D8/D8'
 * close). A no-adapter host (`requestAdapter()` returns null), a `requestDevice()`
 * reject, or a device-lost-at-birth is NOT a contract violation — it is a recognized
 * substrate decision the picker (`createGpuSubstrate`) catches to fall to the WebGL2
 * net. `armAsync()` REJECTS with this typed signal (it does NOT `throw` an uncaught
 * error to the page, and it does NOT fire the consumer's `onInitError` — that contract
 * is reserved for a genuine POST-arm shader/OOM/validation violation). The picker's
 * `try`/`catch` recognizes it; a consumer never sees a `no GPU adapter` PAGEERROR.
 */
export class WebGPUInitError extends Error {
    readonly kind: "no-adapter" | "device-request" | "no-navigator-gpu";
    constructor(kind: WebGPUInitError["kind"], message: string, cause?: unknown) {
        super(message);
        this.name = "WebGPUInitError";
        this.kind = kind;
        if (cause !== undefined) this.cause = cause;
    }
}

// Lockstep with createCanvasLifecycle's CanvasSuspendReason (the AX.W16 F6
// "off-screen-io" key — the IntersectionObserver fallback's OWN reason, distinct from
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
    /** Size the canvas backing store. The consumer owns its DPR policy. */
    resize: () => void;
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
     * Build the WGSL pipeline + bind groups on the resolved device. Called on the
     * async arm AND on every device-restore. Returns the per-frame hooks.
     */
    setup: (
        device: GPUDevice,
        context: GPUCanvasContext,
        format: GPUTextureFormat,
    ) => WebGPUCanvasFrame;
    /** Surface a device-init / validation failure (no WebGPU adapter, a `setup` throw). */
    onInitError?: (error: unknown) => void;
}

export interface WebGPUCanvasHandle {
    /**
     * Run the expensive ASYNC init (adapter + device + context.configure + `setup`)
     * THEN arm the loop. Resolves once armed (or rejects-via-`onInitError` on a
     * device-unavailable / `setup` failure). Idempotent; a no-op post-dispose.
     */
    armAsync: () => Promise<void>;
    /**
     * Synchronous `arm` — a no-op until `armAsync` has resolved the device (the
     * uniform-handle parity with the synchronous backends; the picker calls
     * `armAsync` for the WebGPU path). Idempotent.
     */
    arm: () => void;
    suspend: (reason?: WebGPUSuspendReason) => void;
    resume: (reason?: WebGPUSuspendReason) => void;
    /** Re-arm a parked loop (a setter that re-introduced motion calls this). */
    wake: () => void;
    /** Draw one frame at `timeSec` out-of-loop (capture / thumbnail). */
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    /** The live device (null before armAsync / after dispose / mid-loss). */
    readonly device: GPUDevice | null;
    /**
     * The live `prefers-reduced-motion: reduce` state. The shared lifecycle core
     * owns + re-monitors it; consumers read it (e.g. a viz freezes its frame time
     * at the authored offset while this is `true`).
     */
    readonly reducedMotion: boolean;
}

export function createWebGPUCanvas(
    canvas: HTMLCanvasElement,
    options: WebGPUCanvasOptions,
): WebGPUCanvasHandle {
    const { setup } = options;
    const alphaMode: GPUCanvasAlphaMode = options.alphaMode ?? "premultiplied";

    let device: GPUDevice | null = null;
    let context: GPUCanvasContext | null = null;
    let format: GPUTextureFormat = "bgra8unorm";
    let ro: ResizeObserver | null = null;
    let frameHooks: WebGPUCanvasFrame | null = null;
    let disposed = false;
    let acquiring: Promise<void> | null = null;

    // The leaf-supplied self-heal callbacks (set by `bindContextEvents`). On a device
    // loss the wrapper marks the surface blank (the leaf nulls its hooks + parks the
    // rAF), then re-acquires the device + rebuilds.
    let rebuildFromLeaf: (() => void) | null = null;
    let markContextLostFromLeaf: (() => void) | null = null;

    // ── the WebGPU BACKEND seam — the one backend-specific concern the agnostic
    // lifecycle core threads through `buildContext`. By the time the leaf calls this
    // (on `arm()` / on the self-heal `rebuild`) the device is ALREADY resolved (the
    // async prelude in `armAsync`/`reacquireDevice` ran first), so `buildContext` is
    // SYNCHRONOUS — the leaf seam is untouched.
    function buildContext(): CanvasFrameHooks {
        if (!device) throw new Error("[useWebGPUCanvas] device not acquired");
        // `getContext("webgpu")` is typed `RenderingContext | null` in lib.dom; the
        // "webgpu" literal narrows to GPUCanvasContext at runtime — the cast is the
        // one unavoidable narrowing the union does not carry.
        const ctx = canvas.getContext("webgpu") as GPUCanvasContext | null;
        if (!ctx) throw new Error("[useWebGPUCanvas] WebGPU context unavailable");
        context = ctx;
        format = navigator.gpu.getPreferredCanvasFormat();
        ctx.configure({ device, format, alphaMode });
        // Surface validation errors deterministically (not silent garbage): bracket
        // the consumer `setup` in an error scope + listen for an uncaptured error.
        device.pushErrorScope("validation");
        device.addEventListener("uncapturederror", onUncapturedError);
        frameHooks = setup(device, context, format);
        void device.popErrorScope().then((err) => {
            if (err) options.onInitError?.(err);
        });
        if (!ro) {
            ro = new ResizeObserver(() => frameHooks?.resize());
            ro.observe(canvas);
        }
        return {
            frame: (t) => frameHooks?.frame(t),
            shouldContinue: () => frameHooks?.shouldContinue() ?? false,
            time: (e) => frameHooks?.time?.(e) ?? e,
            teardown: () => {
                frameHooks?.teardown?.();
                device?.removeEventListener("uncapturederror", onUncapturedError);
                ro?.disconnect();
                ro = null;
                context = null;
                frameHooks = null;
            },
        };
    }

    function onUncapturedError(e: Event): void {
        const err = (e as GPUUncapturedErrorEvent).error;
        options.onInitError?.(err);
    }

    const lifecycle = createCanvasLifecycle({
        canvas,
        mode: options.mode,
        respectReducedMotion: options.respectReducedMotion,
        buildContext,
        resize: () => frameHooks?.resize(),
        // Bind the WebGPU device-loss self-heal (the twin of the WebGL
        // `webglcontextlost`/`restored` pair). The leaf hands us `rebuild`
        // (re-runs buildContext on a fresh context + re-arms) + `markLost` (nulls
        // the leaf's hooks + parks the rAF). `wireDeviceLoss` arms the
        // `device.lost` promise; on a non-"destroyed" loss it re-acquires the
        // device THEN calls the leaf's rebuild.
        bindContextEvents: (rebuild, markLost) => {
            rebuildFromLeaf = rebuild;
            markContextLostFromLeaf = markLost;
        },
        unbindContextEvents: () => {
            rebuildFromLeaf = null;
            markContextLostFromLeaf = null;
        },
    });

    /**
     * Acquire `adapter` → `device` ONCE + wire the device-loss self-heal. On a
     * no-adapter host it REJECTS with the typed `WebGPUInitError` (NOT a bare uncaught
     * `throw new Error("no GPU adapter")` spewed to the page — the picker recognizes
     * the typed signal and falls to the WebGL2 net silently, the D8/D8' close).
     */
    async function acquireDevice(): Promise<void> {
        if (!supportsWebGPU()) {
            throw new WebGPUInitError(
                "no-navigator-gpu",
                "[useWebGPUCanvas] navigator.gpu unavailable",
            );
        }
        const adapter = await navigator.gpu.requestAdapter(options.adapterOptions);
        if (!adapter) {
            // The recognizable no-adapter signal — the picker catches it to fall to the
            // WebGL2 net. NEVER a bare uncaught throw to the page (D8').
            throw new WebGPUInitError("no-adapter", "[useWebGPUCanvas] no GPU adapter");
        }
        let dev: GPUDevice;
        try {
            dev = await adapter.requestDevice(options.deviceDescriptor);
        } catch (err) {
            throw new WebGPUInitError(
                "device-request",
                "[useWebGPUCanvas] requestDevice rejected",
                err,
            );
        }
        device = dev;
        wireDeviceLoss(dev);
    }

    /**
     * The DEVICE-LOSS self-heal. `device.lost` resolves once per device with
     * `{ reason, message }`. A `reason: "destroyed"` is an intentional dispose — do
     * NOT re-acquire. Anything else (a driver TDR timeout) is the self-heal: mark the
     * surface blank (the leaf parks the rAF), re-acquire a fresh adapter+device, then
     * call the leaf's `rebuild` (re-runs buildContext on the fresh context + re-arms).
     */
    function wireDeviceLoss(dev: GPUDevice): void {
        void dev.lost.then((info) => {
            if (disposed) return;
            // The dead device's hooks are stale — park the surface.
            markContextLostFromLeaf?.();
            device = null;
            if (info.reason === "destroyed") return; // intentional dispose
            // Driver TDR / unexpected loss — re-acquire then rebuild.
            void acquireDevice()
                .then(() => {
                    if (!disposed) rebuildFromLeaf?.();
                })
                .catch((err) => options.onInitError?.(err));
        });
    }

    async function armAsync(): Promise<void> {
        if (disposed) return;
        if (acquiring) return acquiring;
        if (device) {
            lifecycle.arm();
            return;
        }
        acquiring = (async () => {
            try {
                await acquireDevice();
                if (disposed) return;
                lifecycle.arm();
            } catch (err) {
                // A recognized init failure (no adapter / device reject / no
                // navigator.gpu) is a SUBSTRATE DECISION the picker handles — REJECT so
                // the picker's `try` falls to the WebGL2 net, but do NOT fire
                // `onInitError` (that contract is for a genuine POST-arm shader/OOM/
                // validation violation; a no-adapter fall is the W-AURORA-SWRASTER
                // recognized degrade). A NON-init error (a `setup` throw on a host that
                // DID get a device — the shader/OOM class) still surfaces via
                // `onInitError` AND rejects.
                if (!(err instanceof WebGPUInitError)) {
                    options.onInitError?.(err);
                }
                throw err;
            } finally {
                acquiring = null;
            }
        })();
        return acquiring;
    }

    return {
        armAsync,
        // The synchronous `arm` is a no-op until the device resolves (the
        // uniform-handle parity). A consumer/picker that wants the live loop on the
        // WebGPU path calls `armAsync`; `arm` only arms once the device is present.
        arm: () => {
            if (device) lifecycle.arm();
        },
        suspend: lifecycle.suspend,
        resume: lifecycle.resume,
        wake: lifecycle.wake,
        renderAt: lifecycle.renderAt,
        dispose: () => {
            disposed = true;
            lifecycle.dispose();
            // Releasing the device resolves `device.lost` with reason "destroyed";
            // `wireDeviceLoss` short-circuits the re-acquire on that reason.
            device?.destroy?.();
            device = null;
        },
        get device() {
            return device;
        },
        get reducedMotion() {
            return lifecycle.reducedMotion;
        },
    };
}
