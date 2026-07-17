// `useWebGPUCanvas`: the WebGPU backend over the shared `createCanvasLifecycle` core.
// It is the third thin wrapper, beside the
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
    type BackingSize,
    type DprPolicy,
} from "../webgl/createCanvasLifecycle";

export type { BackingSize, DprPolicy } from "../webgl/createCanvasLifecycle";
// Typed initialization failures, adapter classification, and acquisition timing live
// in `webgpuDevice.ts`. Those helpers carry no bootstrap state; `navigator.gpu`,
// `getContext`, and `requestAdapter` stay here.
import {
    WebGPUInitError,
    isSoftwareWebGPUAdapter,
    withAcquireTimeout,
    WEBGPU_ACQUIRE_TIMEOUT_MS,
} from "./webgpuDevice";
import { describeWebGPUAdapter } from "./rendererStatus";
// Re-export so the picker + the package barrel reach them through this substrate
// unchanged (the barrel re-exports from "./useWebGPUCanvas").
export { WebGPUInitError, WEBGPU_ACQUIRE_TIMEOUT_MS } from "./webgpuDevice";
// The public type surface lives in `webgpuCanvasTypes.ts` and is re-exported so
// `useGpuSubstrate` and the barrel reach it through this substrate unchanged.
export type {
    WebGPUSuspendReason,
    WebGPUCanvasFrame,
    WebGPUCanvasOptions,
    WebGPUCanvasHandle,
} from "./webgpuCanvasTypes";
import type {
    WebGPUCanvasFrame,
    WebGPUCanvasOptions,
    WebGPUCanvasHandle,
} from "./webgpuCanvasTypes";

/**
 * The ONE `navigator.gpu` capability probe (the single-bootstrap rule — mirrors
 * `probeWebGL2Renderer`). SSR-safe (returns `false` with no `navigator`). The picker
 * (`useGpuSubstrate`) reads it to decide the backend; a consumer NEVER touches
 * `navigator.gpu` directly because it composes the substrate
 * clause A reds a direct call).
 */
export function supportsWebGPU(): boolean {
    return (
        typeof navigator !== "undefined" && "gpu" in navigator && navigator.gpu != null
    );
}

// ── The PROCESS-SHARED device warm (pay the cold acquire ONCE, not per-canvas). ──
//
// Without sharing, each `createWebGPUCanvas.armAsync()` would call `requestAdapter()` + `requestDevice()`
// itself and race EACH against the timeout. With N viz on a page, the cold acquire is
// re-paid + re-raced N times, and the FIRST slow one (a cold GPU process at ~3.5s) trips
// a tight ceiling → every viz silently downgrades to WebGL2, the WGSL
// primary never exercised. The standard WebGPU pattern instead: ONE device, MANY
// contexts. The FIRST canvas pays the cold acquire (raced ONCE against the relaxed ceiling);
// every subsequent canvas `await`s the SAME resolved device (instant — no re-race). A
// `device.lost` invalidates the cache so the next acquire re-warms it (the self-heal stays);
// a rejected warm clears the cache so a later page can retry (a transient failure is never
// pinned). The memo lives in THIS substrate (the single WebGPU-bootstrap home).
interface SharedGPUDevice {
    device: GPUDevice;
    adapterClass: string;
}
let sharedDevicePromise: Promise<SharedGPUDevice> | null = null;

/**
 * Reset the PROCESS-SHARED device memo. The shared-device warm (D3a) is a module-level
 * singleton — the first canvas on a page pays the cold `requestAdapter` → `requestDevice`
 * and every later canvas reuses it. That is correct in production (one device per page),
 * but it makes the memo leak ACROSS isolated unit tests in the same file (a prior test's
 * resolved device satisfies a later test's `armAsync`, so `requestAdapter` is never called
 * + the no-adapter path never runs). A test calls this in `beforeEach` to restore a clean
 * per-test acquire. NOT part of the runtime API surface — exported only for the substrate's
 * own test isolation (no consumer reaches for it).
 */
export function __resetSharedGpuDeviceForTest(): void {
    sharedDevicePromise = null;
}

/**
 * Acquire the PROCESS-SHARED WebGPU device — memoised so every canvas on a page shares the
 * single cold `requestAdapter` → `requestDevice`. Rejects with the typed `WebGPUInitError`
 * on a no-adapter / software-adapter / hung host (the picker falls to the WebGL2 net on it).
 * The per-canvas CONTEXT configure + `setup` stay per-canvas (each canvas owns its own swap
 * chain + pipeline); only the DEVICE is shared.
 */
function acquireSharedDevice(
    adapterOptions?: GPURequestAdapterOptions,
    deviceDescriptor?: GPUDeviceDescriptor,
): Promise<SharedGPUDevice> {
    if (sharedDevicePromise) return sharedDevicePromise;
    if (!supportsWebGPU()) {
        return Promise.reject(
            new WebGPUInitError(
                "no-navigator-gpu",
                "[useWebGPUCanvas] navigator.gpu unavailable",
            ),
        );
    }
    const warm = (async (): Promise<SharedGPUDevice> => {
        const adapter = await withAcquireTimeout(
            navigator.gpu.requestAdapter(adapterOptions),
            "requestAdapter",
        );
        if (!adapter) {
            throw new WebGPUInitError("no-adapter", "[useWebGPUCanvas] no GPU adapter");
        }
        // SOFTWARE-ADAPTER GUARD (the WebGPU twin of the WebGL software-raster guard,
        // A SwiftShader, llvmpipe, or fallback adapter cannot validate
        // the metaball pipeline (the per-frame `[Invalid RenderPipeline]` flood); reject so
        // the picker falls to the WebGL2 net SILENTLY. On a real GPU this is false.
        if (isSoftwareWebGPUAdapter(adapter)) {
            throw new WebGPUInitError(
                "software-adapter",
                "[useWebGPUCanvas] software WebGPU adapter (SwiftShader/llvmpipe/fallback) — falling to the WebGL2 net",
            );
        }
        let device: GPUDevice;
        try {
            device = await withAcquireTimeout(
                adapter.requestDevice(deviceDescriptor),
                "requestDevice",
            );
        } catch (err) {
            if (err instanceof WebGPUInitError) throw err;
            throw new WebGPUInitError(
                "device-request",
                "[useWebGPUCanvas] requestDevice rejected",
                err,
            );
        }
        // Invalidate the shared cache on a device loss so the next acquire re-warms it
        // (the self-heal: a driver TDR / browser-evicted device re-acquires fresh).
        void device.lost.then(() => {
            if (sharedDevicePromise === warm) sharedDevicePromise = null;
        });
        return { device, adapterClass: describeWebGPUAdapter(adapter.info) };
    })();
    warm.catch(() => {
        if (sharedDevicePromise === warm) sharedDevicePromise = null;
    });
    sharedDevicePromise = warm;
    return warm;
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
    let frameHooks: WebGPUCanvasFrame | null = null;
    let disposed = false;
    let acquiring: Promise<void> | null = null;
    let fatalError: unknown = null;
    let adapterClass = "Acquiring adapter";

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
    // falls to the WebGL2 net (the device-string
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
        // The per-backend ResizeObserver is absent.
        // The ONE engine-agnostic RO lives in `createCanvasLifecycle` (the leaf); a
        // backend RO here would be a triple-observe parallel path the BINDING LAW
        // forbids. The WebGPU swap chain auto-tracks the backing the leaf sizes.
        return {
            frame: (t) => frameHooks?.frame(t),
            shouldContinue: () => frameHooks?.shouldContinue() ?? false,
            time: (e) => frameHooks?.time?.(e) ?? e,
            teardown: releaseContext,
        };
    }

    function onUncapturedError(e: Event): void {
        const err = (e as GPUUncapturedErrorEvent).error;
        options.onInitError?.(err);
    }

    /** Release this canvas's presentation resources without destroying the shared device. */
    function releaseContext(): void {
        frameHooks?.teardown?.();
        device?.removeEventListener("uncapturederror", onUncapturedError);
        context?.unconfigure();
        context = null;
        frameHooks = null;
        validationProbe = null;
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
        dprPolicy: options.dprPolicy,
        composeIntersectionPark: options.composeIntersectionPark,
        intersectionRootMargin: options.intersectionRootMargin,
        revealBloom: options.revealBloom,
        onContextStateChange: (state) => {
            if (state === "lost") {
                options.onContextStateChange?.(state);
                return;
            }

            // A rebuilt context is not ready until its pipeline probe settles cleanly.
            // Keep the existing renderer-status channel pending across that promise;
            // `buildContext` already projects a failed probe through `onInitError`.
            const probe = validationProbe;
            if (!probe) {
                options.onContextStateChange?.(state);
                return;
            }
            void probe.then((error) => {
                if (!disposed && !error && validationProbe === probe) {
                    options.onContextStateChange?.(state);
                }
            });
        },
        onContextError: (error) => options.onInitError?.(error),
        buildContext,
        // Forward the leaf's freshly-computed BackingSize to the consumer.
        resize: (s) => frameHooks?.resize(s),
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
     *
     * The acquisition is TIMEOUT-BOUNDED (`WEBGPU_ACQUIRE_TIMEOUT_MS`). `requestAdapter()`
     * and especially `requestDevice()` can HANG indefinitely — resolving NEITHER way — on
     * some headless / virtualized-Metal hosts + certain Chrome builds (the live-found
     * class: an `apple/metal-3` adapter resolves, then `requestDevice()` never settles, so
     * `armAsync` never reaches `lifecycle.arm()` → the canvas backing never resizes off its
     * 300×150 default → a blank, un-sized viz). A hang is a recognized init failure exactly
     * like a no-adapter host: the timeout rejects with the typed signal so the picker falls
     * to the WebGL2 net. The bound is generous (a real Metal/Vulkan/D3D device resolves in
     * well under it), so a healthy host never trips it.
     */
    async function acquireDevice(): Promise<void> {
        if (!supportsWebGPU()) {
            throw new WebGPUInitError(
                "no-navigator-gpu",
                "[useWebGPUCanvas] navigator.gpu unavailable",
            );
        }
        // D3a — the PROCESS-SHARED device warm. The cold `requestAdapter` → software-guard
        // → `requestDevice` (each timeout-raced) lives ONCE in `acquireSharedDevice`: the
        // FIRST canvas on a page pays the cold acquire, every subsequent canvas `await`s the
        // SAME resolved device (instant — no re-race against the ceiling). A no-adapter /
        // software-adapter / hung host rejects with the typed `WebGPUInitError` the picker
        // recognizes (it falls to the WebGL2 net). On a real GPU the warm resolves once and
        // the WebGPU path is byte-untouched. The per-canvas CONTEXT + `setup` stay below.
        const acquired = await acquireSharedDevice(
            options.adapterOptions,
            options.deviceDescriptor,
        );
        device = acquired.device;
        adapterClass = acquired.adapterClass;
        wireDeviceLoss(acquired.device);
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
            releaseContext();
            device = null;
            if (info.reason === "destroyed") {
                const error = new Error(
                    `[useWebGPUCanvas] device destroyed${info.message ? ` (${info.message})` : ""}`,
                );
                fatalError = error;
                options.onInitError?.(error);
                return;
            }
            // Driver TDR / unexpected loss — re-acquire then rebuild.
            void acquireDevice()
                .then(() => {
                    if (!disposed) rebuildFromLeaf?.();
                })
                .catch((err) => {
                    fatalError = err;
                    options.onInitError?.(err);
                });
        });
    }

    async function armAsync(): Promise<void> {
        if (disposed) return;
        if (fatalError) throw fatalError;
        if (acquiring) return acquiring;
        if (device) {
            lifecycle.arm();
            return;
        }
        // Size the backing synchronously here, before
        // the async device acquire. On the WebGPU path `lifecycle.arm()` (which would
        // size) is only reached AFTER `acquireDevice()` resolves (a cold acquire ≤6s),
        // so without this the canvas sat at the un-laid-out 300×150 default for the whole
        // acquire window (the live blurry-flash / stuck-canvas). `presize()` runs the ONE
        // sizer + starts the leaf RO now; the device then resolves behind a sharp,
        // correctly-sized, transparent surface. Idempotent (a no-op once `arm()` re-runs
        // it; a no-op when no `dprPolicy` was supplied).
        lifecycle.presize();
        acquiring = (async () => {
            try {
                await acquireDevice();
                if (disposed) return;
                lifecycle.arm();
                // The PIPELINE-VALIDATION gate (the lying-adapter close). `lifecycle.arm()`
                // ran `buildContext` → `setup` + the one-shot probe draw inside the
                // `pushErrorScope("validation")` bracket; `validationProbe` is the pop
                // promise. AWAIT it: a non-null error means the consumer's pipeline/shader
                // failed validation on THIS host. Park + reject with the typed signal so
                // the attributed pipeline failure remains explicit and the per-frame
                // `[Invalid RenderPipeline]` flood never starts.
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
                            `[useWebGPUCanvas] pipeline failed validation (${validationError.message})`,
                        );
                    }
                    if (parkAcrossProbe) lifecycle.resume("manual");
                }
            } catch (err) {
                fatalError = err;
                releaseContext();
                // A recognized init failure (no adapter / device reject / no
                // navigator.gpu) is a SUBSTRATE DECISION the picker handles — REJECT so
                // the picker's `try` falls to the WebGL2 net, but do NOT fire
                // `onInitError` (that contract is for a genuine POST-arm shader/OOM/
                // validation violation; a no-adapter result is the software-raster
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
        presize: lifecycle.presize,
        suspend: lifecycle.suspend,
        resume: lifecycle.resume,
        wake: lifecycle.wake,
        renderAt: lifecycle.renderAt,
        dispose: () => {
            disposed = true;
            lifecycle.dispose();
            // D3a — the device is PROCESS-SHARED (acquireSharedDevice): a single canvas
            // dispose must NOT `device.destroy()` it (that would kill the GPU device for
            // every OTHER live viz on the page). The per-canvas GPU resources (pipeline /
            // buffers / bind groups) are released by the consumer `teardown` the leaf's
            // `lifecycle.dispose()` runs; the shared device is owned by the leaf memo and is
            // reclaimed on process teardown / a real `device.lost`. Just drop the local ref.
            device = null;
        },
        get device() {
            return device;
        },
        get adapterClass() {
            return adapterClass;
        },
        get reducedMotion() {
            return lifecycle.reducedMotion;
        },
    };
}
