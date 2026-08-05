// WebGPU-preferred procedural substrate with one declared WebGL2 path. Presence of
// `navigator.gpu` is only an optimistic hint: `armAsync()` performs the real adapter
// and device acquisition. Recognized acquisition failures happen before a WebGPU canvas
// context exists, so the original element can safely host WebGL2. Once WebGPU owns the
// canvas, setup and pipeline-validation failures remain attributed WebGPU errors; the
// substrate never replaces the consumer's DOM node or paints through an unrelated engine.
//
// Both engines expose the same lifecycle handle and compose `createCanvasLifecycle`
// for backing size, visibility, reduced motion, scheduling, and teardown.

import {
    createWebGLCanvas,
    type WebGLCanvasFrame,
    type WebGLCanvasOptions,
} from "../webgl/useWebGLCanvas";
import type { BackingSize, DprPolicy } from "../webgl/createCanvasLifecycle";

export type { BackingSize, DprPolicy } from "../webgl/createCanvasLifecycle";
import {
    createWebGPUCanvas,
    supportsWebGPU,
    type WebGPUCanvasFrame,
    type WebGPUCanvasHandle,
    type WebGPUCanvasOptions,
} from "./useWebGPUCanvas";
import { WebGPUInitError } from "./webgpuDevice";
import {
    describeWebGL2Adapter,
    pendingRenderer,
    rendererFailure,
    type RendererStatus,
} from "./rendererStatus";
export type { RendererStatus, RendererEngine } from "./rendererStatus";

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
    /**
     * The consumer's DPR policy: a flat multiplier
     * or a box-aware resolver). REQUIRED: the leaf owns the backing-store measurement
     * + sizes it SYNCHRONOUSLY at mount (the ONE sizer; before the async acquire on the
     * WebGPU path), handing the live `BackingSize` to each `setup`'s `resize(s)`.
     */
    dprPolicy: DprPolicy;
    /**
     * Compose the leaf IntersectionObserver park so a consumer inherits the
     * off-screen IO-park ORed with content-visibility, no per-viz `useIntersectionPause`
     * wiring). Default `false` (OPT-IN): several consumers already write `"off-screen-io"`
     * from their own `useIntersectionPause` and a leaf IO default-on would double-write
     * that reason. A viz with NO IO wiring (concentric/fourier/dot-flow) opts IN.
     */
    composeIntersectionPark?: boolean;
    /** `rootMargin` for the leaf IO park. Default `"256px"`. */
    intersectionRootMargin?: string;
    /**
     * fire the one-shot cold-first-VISIBLE entrance bloom (a
     * one-shot `data-substrate-reveal` attr on the canvas the CSS `@keyframes
     * substrate-reveal-bloom` reads to ramp `filter: brightness()` from a dim floor,
     * overshoot past 1.0 on `--ease-cartoon-punch`, then settle). Fires at first-visible,
     * one-shot (zero second bloom), PRM-instant. Default `false` (opt-in per viz).
     */
    revealBloom?: boolean;
    /** WebGPU `context.configure` alpha mode (default `"premultiplied"`). */
    alphaMode?: WebGPUCanvasOptions["alphaMode"];
    /** WebGPU adapter/device request options. */
    adapterOptions?: WebGPUCanvasOptions["adapterOptions"];
    deviceDescriptor?: WebGPUCanvasOptions["deviceDescriptor"];
    /** WebGL2 `getContext("webgl2", …)` attributes. */
    contextAttrs?: WebGLCanvasOptions["contextAttrs"];
    /** Surface a device-init, validation failure (the WebGPU path). */
    onInitError?: WebGPUCanvasOptions["onInitError"];
    /**
     * Notified when the picker FALLS from WebGPU to the WebGL2 net (the invisible
     * insurance fired). The user never sees a "downgrade" — this is a diagnostic hook
     * (e.g. record the tier-readout for the substrate DELTA), NOT an error. The error
     * (if any) that triggered the fall is passed for telemetry.
     */
    onBackendFallback?: (info: {
        from: "webgpu";
        to: "webgl2";
        error: unknown;
    }) => void;
    onStatus?: (status: RendererStatus) => void;
}

/**
 * The uniform substrate handle. A viz consumer wires its lifecycle (offscreen pause,
 * pause/resume, pointer-`wake`, capture-`renderAt`) against THIS — identical across the
 * WebGPU and WebGL2 backends. `armAsync` is the start seam (it tries WebGPU then falls
 * to the WebGL2 net on a no-adapter/init failure); `arm` is the synchronous twin (it
 * arms the WebGL2 net immediately so a consumer that does not await still paints).
 */
export interface GpuSubstrateHandle {
    /**
     * The resolved backend. Starts at the OPTIMISTIC choice (`"webgpu"` where the
     * platform allows it + a WGSL path is provided, else `"webgl2"`); after
     * `armAsync()` it reflects the ACTUAL backend (it falls to `"webgl2"` if the
     * WebGPU init failed — the no-adapter/device-lost-at-birth tail).
     */
    readonly backend: GpuBackend;
    /** Acquire the device/context + `setup` + arm the loop (try WebGPU, fall to the WebGL2 net). Resolves once armed. */
    armAsync: () => Promise<void>;
    /** Synchronous arm (the WebGL2 net arms immediately; the WebGPU path is a no-op until the device resolves). */
    arm: () => void;
    /**
     * Size the backing store and start the leaf RO
     * SYNCHRONOUSLY, decoupled from the (async) backend acquire. Call it the instant the
     * canvas is in the DOM so the field is sharp from frame 0 while the device resolves
     * (the ≤6s blurry-flash close). `armAsync` already calls it internally on both legs;
     * exposed so a consumer can presize even earlier (e.g. immediately on mount, before
     * the awaited `armAsync`). Idempotent — a no-op once the backing is already sized.
     */
    presize: () => void;
    suspend: (
        reason?: "tab-hidden" | "off-screen" | "off-screen-io" | "manual",
    ) => void;
    resume: (reason?: "tab-hidden" | "off-screen" | "off-screen-io" | "manual") => void;
    wake: () => void;
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    readonly reducedMotion: boolean;
}

/** Build + arm the WebGL2 net (the invisible insurance path). Synchronous by construction. */
function buildWebGL2(
    canvas: HTMLCanvasElement,
    options: GpuSubstrateOptions,
): ReturnType<typeof createWebGLCanvas> {
    let handle: ReturnType<typeof createWebGLCanvas>;
    handle = createWebGLCanvas(canvas, {
        mode: options.mode,
        respectReducedMotion: options.respectReducedMotion,
        contextAttrs: options.contextAttrs,
        dprPolicy: options.dprPolicy,
        composeIntersectionPark: options.composeIntersectionPark,
        intersectionRootMargin: options.intersectionRootMargin,
        revealBloom: options.revealBloom,
        onContextStateChange: (state) => {
            options.onStatus?.(
                state === "lost"
                    ? pendingRenderer("webgl2")
                    : {
                          phase: "ready",
                          engine: "webgl2",
                          adapter: describeWebGL2Adapter(handle.gl),
                      },
            );
        },
        setup: options.setupGL,
        onContextError: (error) => {
            options.onStatus?.(rendererFailure("webgl2", "WebGL 2 context", error));
            options.onInitError?.(error);
        },
    });
    return handle;
}

/**
 * Pick the backend + return the uniform handle. WebGPU-first (`supportsWebGPU()` AND a
 * `setupWGPU` callback is provided); otherwise the WebGL2 net. The decision is NO
 * LONGER committed at construction off a presence check — `armAsync()` ATTEMPTS the
 * WebGPU init and falls to WebGL2 only for recognized acquisition failures that occur
 * before a WebGPU context is acquired. Setup/pipeline validation stays an explicit
 * WebGPU error. The WebGL2 leaf is built lazily, so a Baseline host pays no fallback
 * context cost.
 */
export function createGpuSubstrate(
    canvas: HTMLCanvasElement,
    options: GpuSubstrateOptions,
): GpuSubstrateHandle {
    // The OPTIMISTIC choice — `supportsWebGPU()` is a PRESENCE check (no `requestAdapter`),
    // so it is only a hint that WebGPU is WORTH ATTEMPTING. The REAL decision is made
    // async in `armAsync()` (try WebGPU, fall to the WebGL2 net), so the picker can no
    // longer be fooled by a `navigator.gpu` that has no adapter behind it.
    const attemptWebGPU = supportsWebGPU() && options.setupWGPU != null;

    let webgpu: WebGPUCanvasHandle | null = null;
    let webgl2: ReturnType<typeof createWebGLCanvas> | null = null;
    let backend: GpuBackend = attemptWebGPU ? "webgpu" : "webgl2";
    let disposed = false;
    const emitStatus = (status: RendererStatus): void => options.onStatus?.(status);
    const emitRendererContextState = (
        state: "lost" | "restored",
        engine: GpuBackend,
        adapter: () => string,
    ): void =>
        emitStatus(
            state === "lost"
                ? pendingRenderer(engine)
                : { phase: "ready", engine, adapter: adapter() },
        );
    emitStatus(pendingRenderer(backend));

    // Build the WebGL2 net NOW only when WebGPU is not even attempted (no WGSL path,     // platform absent) — a Baseline WebGPU host never pays the WebGL2-context cost
    // (the net is built lazily on the FALL).
    if (!attemptWebGPU) {
        webgl2 = buildWebGL2(canvas, options);
    } else {
        webgpu = createWebGPUCanvas(canvas, {
            mode: options.mode,
            respectReducedMotion: options.respectReducedMotion,
            dprPolicy: options.dprPolicy,
            composeIntersectionPark: options.composeIntersectionPark,
            intersectionRootMargin: options.intersectionRootMargin,
            revealBloom: options.revealBloom,
            setup: options.setupWGPU as WebGPUCanvasOptions["setup"],
            alphaMode: options.alphaMode,
            adapterOptions: options.adapterOptions,
            deviceDescriptor: options.deviceDescriptor,
            onContextStateChange: (state) => {
                emitRendererContextState(
                    state,
                    "webgpu",
                    () => webgpu?.adapterClass ?? "Hardware adapter",
                );
            },
            // The picker OWNS the init-error contract on the WebGPU path: a recognized
            // init failure (no adapter, device reject) is caught by `armAsync`'s try
            // and routed to the WebGL2 net — it is NOT surfaced as `onInitError` (that
            // is reserved for a genuine shader/OOM violation AFTER the device armed,
            // the precedent: a no-adapter fall is a recognized
            // substrate decision, not a contract violation). A POST-arm validation/
            // device-loss error still reaches the consumer's `onInitError`.
            onInitError: (error) => {
                emitStatus(
                    rendererFailure(
                        "webgpu",
                        webgpu?.adapterClass ?? "Hardware adapter",
                        error,
                    ),
                );
                options.onInitError?.(error);
            },
        });
    }

    /** Fall from a recognized pre-context WebGPU acquisition failure to WebGL2. */
    function fallToWebGL2(error: unknown): void {
        // Dispose the half-built WebGPU leaf (releases the device, unbinds the
        // device-loss promise) before standing up the net.
        webgpu?.dispose();
        webgpu = null;
        backend = "webgl2";
        emitStatus(pendingRenderer("webgl2"));
        options.onBackendFallback?.({ from: "webgpu", to: "webgl2", error });
        try {
            webgl2 = buildWebGL2(canvas, options);
            webgl2.arm();
            emitStatus({
                phase: "ready",
                engine: "webgl2",
                adapter: describeWebGL2Adapter(webgl2.gl),
            });
        } catch (netErr) {
            // The host has NEITHER a working WebGPU pipeline NOR a WebGL2 context (a
            // genuinely GL-less env). Surface for telemetry, never spew an uncaught throw.
            webgl2 = null;
            emitStatus(rendererFailure("webgl2", "WebGL 2 context", netErr));
            options.onInitError?.(netErr);
            throw netErr;
        }
    }

    async function armAsync(): Promise<void> {
        if (disposed) return;
        // Size the backing when arm starts, before any await, so the field
        // is sharp through the (≤6s) cold device acquire on the WebGPU leg.
        presize();
        if (webgpu) {
            try {
                // The WebGPU leaf's `armAsync()` runs the async adapter → device →
                // configure → setup prelude. On a no-adapter host it REJECTS (the leaf
                // no longer throws an uncaught error to the page — D8'); the reject is
                // caught HERE and routed to the net.
                await webgpu.armAsync();
                emitStatus({
                    phase: "ready",
                    engine: "webgpu",
                    adapter: webgpu.adapterClass,
                });
                return;
            } catch (err) {
                if (disposed) return;
                // Recognized acquisition failures occur before WebGPU owns the canvas,
                // so the same element can safely host the WebGL2 path. Setup/pipeline
                // validation errors remain attributed WebGPU failures.
                if (
                    err instanceof WebGPUInitError &&
                    err.kind !== "pipeline-validation"
                ) {
                    fallToWebGL2(err);
                    return;
                }
                emitStatus(rendererFailure("webgpu", webgpu.adapterClass, err));
                throw err;
            }
        }
        // The WebGL2 net is synchronous — arm it immediately.
        try {
            webgl2?.arm();
            emitStatus({
                phase: "ready",
                engine: "webgl2",
                adapter: describeWebGL2Adapter(webgl2?.gl ?? null),
            });
        } catch (err) {
            emitStatus(rendererFailure("webgl2", "WebGL 2 context", err));
            options.onInitError?.(err);
            throw err;
        }
    }

    function presize(): void {
        if (disposed) return;
        // Size the backing on whichever leg is live,
        // decoupled from the acquire. Idempotent on both legs (a no-op once the backing
        // is sized). On the WebGPU leg this sizes BEFORE the device request so the
        // canvas is sharp during the cold acquire window.
        webgpu?.presize();
        webgl2?.presize();
    }

    function arm(): void {
        if (disposed) return;
        // Size synchronously first so a consumer that arms without awaiting still gets
        // a sharp backing from frame 0.
        presize();
        // The synchronous twin: the WebGL2 net arms immediately; the WebGPU path is a
        // no-op until `armAsync` resolves the device (the uniform-handle parity). If
        // the net was already built (no WGSL path, a prior fall), arm it now so a
        // consumer that does not await still paints.
        webgpu?.arm();
        webgl2?.arm();
    }

    // The handle delegates to whichever backend is live (the WebGPU leaf until a fall,
    // the WebGL2 net after). The lifecycle controls reach the resolved backend.
    return {
        get backend() {
            return backend;
        },
        armAsync,
        arm,
        presize,
        suspend: (reason) => {
            webgpu?.suspend(reason);
            webgl2?.suspend(reason);
        },
        resume: (reason) => {
            webgpu?.resume(reason);
            webgl2?.resume(reason);
        },
        wake: () => {
            webgpu?.wake();
            webgl2?.wake();
        },
        renderAt: (t) => {
            webgpu?.renderAt(t);
            webgl2?.renderAt(t);
        },
        dispose: () => {
            disposed = true;
            webgpu?.dispose();
            webgl2?.dispose();
            webgpu = null;
            webgl2 = null;
        },
        get reducedMotion() {
            return (webgpu ?? webgl2)?.reducedMotion ?? false;
        },
    };
}

export type { WebGPUCanvasFrame, WebGLCanvasFrame };
