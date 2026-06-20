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
 * Detect a SOFTWARE / CPU WebGPU adapter (SwiftShader / llvmpipe / the Microsoft
 * Basic Render Driver, or a UA-supplied `isFallbackAdapter` software fallback) — the
 * WebGPU twin of `isSoftwareWebGLRenderer` (the `renderMode.ts` WebGL software-raster
 * guard, BB.W-AURORA-SWRASTER).
 *
 * WHY this forces the WebGL2 net (the BC WebGPU re-home regression this closes): on a
 * headless / GPU-blocklisted / CI host, `navigator.gpu` exists AND `requestAdapter()`
 * SUCCEEDS — it returns a SOFTWARE adapter (SwiftShader). `requestDevice()` succeeds
 * too, so the WebGPU init does NOT reject; `setup()` builds the render pipeline, but the
 * software backend cannot validate/compile it (a metaball `RenderPipeline` is invalid
 * under SwiftShader), so the per-frame `pass.setPipeline(...)` floods
 * `[Invalid RenderPipeline] is invalid due to a previous error` — a never-ending console
 * spew with no fallback (the loop keeps trying to draw the invalid pipeline). A
 * software-rastered WebGPU surface is the same per-composite cost class the WebGL guard
 * forbids. So a software adapter is treated as a recognized INIT FAILURE: the picker's
 * `armAsync` try/catch falls to the WebGL2 net — exactly the silent W-AURORA-SWRASTER
 * degrade, never the invalid-pipeline flood.
 *
 * The signal is the `isFallbackAdapter` spec flag (a UA sets it on a software fallback —
 * the spec moved it from `GPUAdapter` to `GPUAdapterInfo`, so it is read off BOTH the
 * adapter AND its `info` for cross-UA coverage) OR a software/SwiftShader/llvmpipe/
 * basic-render string in `adapter.info` (vendor/architecture/description). On a real
 * Metal/Vulkan/D3D adapter both are false/empty, so the WebGPU path is BYTE-UNTOUCHED
 * (the cardinal ba-gestalt capture holds). The read is defensive (the fields are optional
 * across UAs); a throwing read is morally "cannot prove software" → keep WebGPU.
 */
export function isSoftwareWebGPUAdapter(adapter: GPUAdapter): boolean {
    try {
        const info = adapter.info as GPUAdapterInfo | undefined;
        // `isFallbackAdapter` lives on `GPUAdapterInfo` per the current spec; older UAs
        // expose it directly on the adapter — read both (the runtime cast covers the
        // pre-`info` location lib.dom does not type).
        if (info?.isFallbackAdapter) return true;
        if ((adapter as { isFallbackAdapter?: boolean }).isFallbackAdapter) return true;
        if (!info) return false;
        const haystack = [info.vendor, info.architecture, info.description]
            .filter((s): s is string => typeof s === "string")
            .join(" ")
            .toLowerCase();
        return (
            haystack.includes("swiftshader") ||
            haystack.includes("llvmpipe") ||
            haystack.includes("software") ||
            haystack.includes("basic render") ||
            haystack.includes("microsoft basic")
        );
    } catch {
        // fail-explicit: an env we cannot certify keeps the richer WebGPU default
        // (the conservative non-downgrade — the `isSoftwareWebGLRenderer` precedent).
        return false;
    }
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
    readonly kind:
        | "no-adapter"
        | "device-request"
        | "no-navigator-gpu"
        | "software-adapter"
        | "pipeline-validation";
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

    // The validation-scope result of the MOST RECENT buildContext — the
    // `popErrorScope("validation")` promise wrapping the consumer `setup` + a one-shot
    // PROBE draw. `armAsync` awaits it to decide whether the WebGPU pipeline is sound:
    // a non-null error means the pipeline/shader failed validation (a software-backed /
    // headless-Metal host whose adapter LIES that it is hardware — `adapter.info` reads
    // `apple/metal-3` yet the metaball `RenderPipeline` is invalid → the per-frame
    // `[Invalid RenderPipeline]` flood). On that signal `armAsync` rejects so the picker
    // falls to the WebGL2 net (the silent W-AURORA-SWRASTER degrade — the device-string
    // guard cannot catch a lying adapter, the validation PROBE can).
    let validationProbe: Promise<GPUError | null> | null = null;

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
        // the consumer `setup` AND a one-shot probe draw in an error scope + listen for
        // an uncaptured error. The probe draw forces the pipeline to be EXERCISED inside
        // the scope so a draw-time-invalid pipeline (the headless software-Metal class)
        // surfaces here, not as a per-frame console flood.
        device.pushErrorScope("validation");
        device.addEventListener("uncapturederror", onUncapturedError);
        frameHooks = setup(device, context, format);
        probePipeline();
        // The validation result feeds BOTH the legacy onInitError surface (kept) AND the
        // `armAsync` fall-decision (the new gate). One pop, two readers.
        validationProbe = device.popErrorScope();
        void validationProbe.then((err) => {
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
                validationProbe = null;
            },
        };
    }

    function onUncapturedError(e: Event): void {
        const err = (e as GPUUncapturedErrorEvent).error;
        options.onInitError?.(err);
    }

    /**
     * One-shot PROBE draw — exercises the consumer's pipeline ONCE inside the
     * `pushErrorScope("validation")` bracket so a draw-time-invalid pipeline (the headless
     * software-Metal class whose `createRenderPipeline` reports clean but whose
     * `setPipeline` is invalid) surfaces in `popErrorScope()` here, not as a never-ending
     * per-frame console flood. It calls the consumer's own `frame(0)` (the SAME render
     * path the loop uses) so the probe is faithful to the real draw. A consumer `frame`
     * that throws is caught (a `resolveFrame` returning null is a legitimate no-draw — the
     * probe is a no-op then, and the next real frame will draw); the THROW is swallowed so
     * the validation scope still pops cleanly (a JS throw is not a GPU validation error).
     */
    function probePipeline(): void {
        try {
            frameHooks?.resize();
            frameHooks?.frame(0);
        } catch {
            // A consumer-`frame` JS throw is not a GPU validation signal — the validation
            // scope owns the pipeline verdict. Swallow so the pop is clean.
        }
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
        // SOFTWARE-ADAPTER GUARD (the WebGPU twin of the WebGL software-raster guard,
        // BB.W-AURORA-SWRASTER). A SwiftShader / llvmpipe / fallback adapter creates a
        // device + arms WITHOUT rejecting, but cannot validate the metaball pipeline —
        // it would flood per-frame `[Invalid RenderPipeline]` errors with no fallback. So
        // a software adapter is a RECOGNIZED init failure: reject with the typed signal so
        // the picker's `armAsync` try/catch falls to the WebGL2 net SILENTLY (the
        // invisible insurance), never the invalid-pipeline spew. On a real GPU this is
        // false → the WebGPU path is byte-untouched.
        if (isSoftwareWebGPUAdapter(adapter)) {
            throw new WebGPUInitError(
                "software-adapter",
                "[useWebGPUCanvas] software WebGPU adapter (SwiftShader/llvmpipe/fallback) — falling to the WebGL2 net",
            );
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
                // The PIPELINE-VALIDATION gate (the lying-adapter close). `lifecycle.arm()`
                // ran `buildContext` → `setup` + the one-shot probe draw inside the
                // `pushErrorScope("validation")` bracket; `validationProbe` is the pop
                // promise. AWAIT it: a non-null error means the consumer's pipeline/shader
                // failed validation on THIS host (a headless software-Metal adapter that
                // reports `apple/metal-3` yet cannot validate the metaball pipeline). Park
                // + reject with the typed signal so the picker falls to the WebGL2 net,
                // never the per-frame `[Invalid RenderPipeline]` flood. On a real GPU the
                // pipeline validates → null → the WebGPU path is byte-untouched.
                if (validationProbe) {
                    // Hold the loop parked across the (async) validation pop so the rAF
                    // never submits an as-yet-unverified pipeline (no flood window). The
                    // resume restores the live loop only when the pipeline is clean.
                    // Capture mode already holds the `"manual"` suspension by construction
                    // (renderAt-only), so it must NOT be resumed here — only the LIVE loop
                    // is parked-then-resumed across the probe.
                    const parkAcrossProbe = options.mode !== "capture";
                    if (parkAcrossProbe) lifecycle.suspend("manual");
                    const validationError = await validationProbe;
                    if (disposed) return;
                    if (validationError) {
                        throw new WebGPUInitError(
                            "pipeline-validation",
                            `[useWebGPUCanvas] pipeline failed validation (${validationError.message}) — falling to the WebGL2 net`,
                        );
                    }
                    if (parkAcrossProbe) lifecycle.resume("manual");
                }
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
