// BC.W-WEBGPU-EVERYWHERE — `useGpuSubstrate`: the transparent feature-detect picker
// that NEVER crashes to black. WebGPU-first WHERE THE PLATFORM ALLOWS IT (the
// June-2026 Baseline fact: Chrome/Edge 113+, Safari 26+ on Metal no-flags, Firefox
// 141+); the WebGL2 substrate is the INVISIBLE don't-crash-to-black insurance for the
// ~5-10% tail (Linux Firefox where WebGPU is still flagged, pre-A12 iPhones, headless/
// software-raster CI where `requestAdapter()` returns null).
//
// THE KEYSTONE FIX (the BB disease): the picker USED to commit the backend
// SYNCHRONOUSLY off a `supportsWebGPU()` PRESENCE check ("the decision made ONCE at
// construction"). But `supportsWebGPU()` only reads `"gpu" in navigator` — it NEVER
// calls `requestAdapter()`. On a host where `navigator.gpu` EXISTS but
// `requestAdapter()` returns null (headless, SwiftShader, GPU-blocklisted, a
// locked-down VM, the live demo CI), the WebGPU backend was already committed and its
// `armAsync()` THREW `no GPU adapter` to the page with no fallback path — the literal
// `no GPU adapter` PAGEERROR + the pure-black void the audit observed (D8/D8'/D9).
//
// THE TRY-WebGPU-THEN-REBUILD-WebGL2 SHAPE (procedural-refs.md §0 form 2, the more
// robust of the two — it also catches a device that creates then immediately loses,
// the Safari device-lost-at-birth class): the backend is no longer chosen at
// construction. `armAsync()` ATTEMPTS the WebGPU leaf's async init inside a `try`; on
// ANY init failure (`requestAdapter()` null, `requestDevice()` reject, a device.lost
// at birth, a validation throw) the picker DISPOSES the WebGPU leaf + REBUILDS on the
// WebGL2 leaf (`setupGL`) + arms it. The fallback is INVISIBLE — the user never sees a
// "downgrade", the SAME viz just renders via the WebGL2 net. NO blank canvas on any
// tier, no uncaught throw spewed to the console.
//
// A viz consumer authors TWO `setup` callbacks — one WGSL pipeline (`setupWGPU`), one
// GLSL program (`setupGL`) — and reaches for `createGpuSubstrate(canvas, options)`.
// The handle surface (`arm`/`armAsync`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/
// `reducedMotion`) is byte-identical across the WebGPU and WebGL2 backends, so a viz's
// lifecycle wiring (offscreen pause via `useIntersectionPause`, the
// `DockBackgroundToggle` pause/resume, `wake()` on pointer) is substrate-AGNOSTIC. The
// `backend` field starts at the OPTIMISTIC choice (`"webgpu"` where the platform allows
// it + a WGSL path is provided) and resolves to the ACTUAL backend after `armAsync()`
// (it falls to `"webgl2"` if the WebGPU init failed).
//
// The shared `createCanvasLifecycle` leaf carries the demand-gate, the three-reason
// suspend Set, the offscreen-park, the live-PRM re-monitor, the device-loss self-heal —
// all sound. BD.W-SUBSTRATE-SIZE-UNIFY adds the ONE backing-store sizer + the leaf RO/IO
// to that leaf; the PICKER threads the consumer's `dprPolicy` to both legs so a viz that
// adopts the leaf sizer is sized SYNCHRONOUSLY at mount before the async acquire, on
// either backend, identically.
//
// ── BD.W-SUBSTRATE-SIZE-UNIFY (G4) — THE READBACK CONTRACT (documented, not folklore) ──
//
// All live consumers create their context with `preserveDrawingBuffer:false`. So a live
// `getImageData`/`readPixels` after the compositor has cleared returns ALL-ZERO — this is
// CORRECT behaviour in BOTH engines (and it AVOIDS WebKit's always-allocated readback
// buffer), NOT a substrate defect. A live π-gate therefore reads pixels via the COMPOSITOR
// (`locator.screenshot()`), never `getImageData`. The EXACT-PIXEL in-page read is
// `captureFrame(timeSec)`: in `mode:"capture"` the substrate auto-flips
// `preserveDrawingBuffer:true` at context creation (free only there), `renderAt(timeSec)`,
// then reads back. The all-zero live `readPixels` is a FEATURE; capture-mode is the read.

import {
    createWebGLCanvas,
    canvasCanHostWebGL2,
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
    /**
     * BD.W-SUBSTRATE-SIZE-UNIFY (G1/G2) — the consumer's DPR policy (a flat multiplier
     * or a box-aware resolver). When PRESENT the leaf owns the backing-store measurement
     * + sizes it SYNCHRONOUSLY at mount (the ONE sizer; before the async acquire on the
     * WebGPU path), handing the live `BackingSize` to each `setup`'s `resize(s)`. When
     * ABSENT the legacy path runs (the consumer self-measures) — the per-viz adoption
     * seam, identical on both backends.
     */
    dprPolicy?: DprPolicy;
    /**
     * G3 — compose the leaf IntersectionObserver park (a consumer inherits the
     * off-screen IO-park ORed with content-visibility, no per-viz `useIntersectionPause`
     * wiring). Default `false` (OPT-IN): several consumers already write `"off-screen-io"`
     * from their own `useIntersectionPause` and a leaf IO default-on would double-write
     * that reason. A viz with NO IO wiring (concentric/fourier/dot-flow) opts IN.
     */
    composeIntersectionPark?: boolean;
    /** `rootMargin` for the leaf IO park (G3). Default `"256px"`. */
    intersectionRootMargin?: string;
    /**
     * BG.W-VIZ-REVEAL-BLOOM — fire the one-shot cold-first-VISIBLE entrance bloom (a
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
    /** Surface a device-init / validation failure (the WebGPU path). */
    onInitError?: WebGPUCanvasOptions["onInitError"];
    /**
     * Notified when the picker FALLS from WebGPU to the WebGL2 net (the invisible
     * insurance fired). The user never sees a "downgrade" — this is a diagnostic hook
     * (e.g. record the tier-readout for the substrate DELTA), NOT an error. The error
     * (if any) that triggered the fall is passed for telemetry.
     */
    onBackendFallback?: (info: { from: "webgpu"; to: "webgl2"; error: unknown }) => void;
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
     * BD.W-SUBSTRATE-SIZE-UNIFY (G2) — size the backing store + start the leaf RO
     * SYNCHRONOUSLY, decoupled from the (async) backend acquire. Call it the instant the
     * canvas is in the DOM so the field is sharp from frame 0 while the device resolves
     * (the ≤6s blurry-flash close). `armAsync` already calls it internally on both legs;
     * exposed so a consumer can presize even earlier (e.g. immediately on mount, before
     * the awaited `armAsync`). A no-op when no `dprPolicy` was supplied (legacy).
     */
    presize: () => void;
    suspend: (reason?: "tab-hidden" | "off-screen" | "off-screen-io" | "manual") => void;
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
    return createWebGLCanvas(canvas, {
        mode: options.mode,
        respectReducedMotion: options.respectReducedMotion,
        contextAttrs: options.contextAttrs,
        dprPolicy: options.dprPolicy,
        composeIntersectionPark: options.composeIntersectionPark,
        intersectionRootMargin: options.intersectionRootMargin,
        revealBloom: options.revealBloom,
        setup: options.setupGL,
    });
}

/**
 * Replace a WebGPU-POISONED canvas with a fresh clone in the SAME DOM position — the
 * prerequisite for the WebGL2 fall (BC.W-WEBGPU-EVERYWHERE the lying-adapter close).
 *
 * The HTML canvas one-context-type rule: once `getContext("webgpu")` is called on a
 * canvas, `getContext("webgl2")` on the SAME element returns `null` forever (the canvas
 * is locked to the `webgpu` context type). So when the picker falls from a failed-to-
 * validate WebGPU pipeline to the WebGL2 net, that canvas can NEVER host WebGL2 — the net
 * would throw `WebGL2 unavailable` even on a WebGL2-capable host (the headless software-
 * Metal class). The fix: clone the canvas (copying its attributes + class + inline style
 * so the layout/aria are byte-identical) and swap it in place, returning the fresh
 * un-poisoned element for the WebGL2 net to acquire.
 *
 * BUT THE SWAP IS ONLY DONE WHEN THE CANVAS IS ACTUALLY POISONED. A fall triggered BEFORE
 * `getContext("webgpu")` ever ran — a no-adapter host, a `requestDevice()` reject, or the
 * acquire-TIMEOUT (the device-hang class) — never poisoned the canvas: it can host WebGL2
 * directly. Swapping it anyway was a LIVE BUG: the swap orphans the original element, and a
 * consumer's `setup`/`resize` closure that captured the ORIGINAL canvas reference (e.g.
 * `resizeBacking(canvas)` in `useMetaballRenderer`) then sizes the now-detached original
 * (its `clientWidth` is 0 → the backing falls to a tiny default) while the live clone's
 * backing is never written — the canvas renders into the untouched 300×150 default that CSS
 * upscales (the blurry-viz defect). So we SWAP ONLY when the original cannot host WebGL2
 * (genuinely poisoned). The probe `getContext("webgl2")` is the canonical poison test (a
 * poisoned canvas returns null); on a clean canvas it returns the very context the net will
 * re-acquire (getContext is idempotent for the same type), so the probe costs nothing.
 *
 * SSR / detached-canvas safe: with no `parentNode` (never mounted) the clone cannot swap
 * — the original is returned unchanged (a never-mounted canvas was never poisoned anyway).
 */
function freshCanvasForFallback(poisoned: HTMLCanvasElement): HTMLCanvasElement {
    const parent = poisoned.parentNode;
    if (!parent || typeof document === "undefined") return poisoned;
    // Not actually poisoned (the fall came before getContext("webgpu") — no-adapter /
    // device-reject / acquire-timeout): the original can host WebGL2, so KEEP it. Swapping
    // would orphan the consumer's captured canvas reference (the blurry-viz clone-mismatch).
    // The poison probe lives in the WebGL2 substrate (`canvasCanHostWebGL2` — the sole
    // webgl2-bootstrap home, proof:webgl-substrate-single clause B); the picker composes it.
    if (canvasCanHostWebGL2(poisoned)) return poisoned;
    // Genuinely poisoned (a `getContext("webgpu")` ran — the pipeline-validation fall): the
    // original is locked to the webgpu context type and can never host WebGL2. Clone + swap.
    const fresh = poisoned.cloneNode(false) as HTMLCanvasElement;
    // cloneNode(false) copies attributes (class/aria-hidden/data-*/inline style) but the
    // backing-store width/height are reset by the next `resize()`; the CSS box is carried
    // by the copied class/style.
    parent.replaceChild(fresh, poisoned);
    return fresh;
}

/**
 * Pick the backend + return the uniform handle. WebGPU-first (`supportsWebGPU()` AND a
 * `setupWGPU` callback is provided); otherwise the WebGL2 net. The decision is NO
 * LONGER committed at construction off a presence check — `armAsync()` ATTEMPTS the
 * WebGPU init and FALLS to the WebGL2 net on ANY failure (no adapter, device reject,
 * device-lost-at-birth, validation throw). The WebGL2 leaf is built lazily — only if
 * the WebGPU path fails OR no WGSL path was provided — so a Baseline host pays no
 * WebGL2-context cost.
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
    // The live canvas — swapped for a fresh clone on the WebGPU→WebGL2 fall (the WebGPU
    // context-type poison forbids reusing the original for the net; see `freshCanvasForFallback`).
    let liveCanvas = canvas;

    // Build the WebGL2 net NOW only when WebGPU is not even attempted (no WGSL path /
    // platform absent) — a Baseline WebGPU host never pays the WebGL2-context cost
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
            // The picker OWNS the init-error contract on the WebGPU path: a recognized
            // init failure (no adapter / device reject) is caught by `armAsync`'s try
            // and routed to the WebGL2 net — it is NOT surfaced as `onInitError` (that
            // is reserved for a genuine shader/OOM violation AFTER the device armed,
            // the W-AURORA-SWRASTER precedent: a no-adapter fall is a recognized
            // substrate decision, not a contract violation). A POST-arm validation/
            // device-loss error still reaches the consumer's `onInitError`.
            onInitError: options.onInitError,
        });
    }

    /**
     * Fall from a failed WebGPU init to the WebGL2 net (the invisible insurance). The
     * WebGPU leaf may have already poisoned the canvas (`getContext("webgpu")` ran inside
     * `buildContext` before the pipeline-validation reject), so the net is built on a
     * FRESH cloned canvas swapped in place — the original can never host WebGL2 again. The
     * net build + arm is guarded: a genuine WebGL2-unavailable (a host with NEITHER
     * working substrate) surfaces via `onInitError`, never an uncaught page throw (the
     * D8' no-spew floor extends to the second-leg failure).
     */
    function fallToWebGL2(error: unknown): void {
        // Dispose the half-built WebGPU leaf (releases the device, unbinds the
        // device-loss promise) before standing up the net.
        webgpu?.dispose();
        webgpu = null;
        backend = "webgl2";
        // Swap the WebGPU-poisoned canvas for a fresh clone so the WebGL2 net can acquire
        // a context (the canvas one-context-type rule — see `freshCanvasForFallback`).
        liveCanvas = freshCanvasForFallback(liveCanvas);
        options.onBackendFallback?.({ from: "webgpu", to: "webgl2", error });
        try {
            webgl2 = buildWebGL2(liveCanvas, options);
            webgl2.arm();
        } catch (netErr) {
            // The host has NEITHER a working WebGPU pipeline NOR a WebGL2 context (a
            // genuinely GL-less env). Surface for telemetry, never spew an uncaught throw.
            webgl2 = null;
            options.onInitError?.(netErr);
        }
    }

    async function armAsync(): Promise<void> {
        if (disposed) return;
        // G2 — size the backing the instant arm starts, before any await, so the field
        // is sharp through the (≤6s) cold device acquire on the WebGPU leg.
        presize();
        if (webgpu) {
            try {
                // The WebGPU leaf's `armAsync()` runs the async adapter → device →
                // configure → setup prelude. On a no-adapter host it REJECTS (the leaf
                // no longer throws an uncaught error to the page — D8'); the reject is
                // caught HERE and routed to the net.
                await webgpu.armAsync();
                return;
            } catch (err) {
                if (disposed) return;
                // The WebGPU path could not arm (no adapter, device reject,
                // device-lost-at-birth, validation throw) — fall to the net, silently.
                // `fallToWebGL2` builds + arms the net (on a fresh canvas) inside its own
                // guard, so the net is live on return.
                fallToWebGL2(err);
                return;
            }
        }
        // The WebGL2 net is synchronous — arm it immediately.
        webgl2?.arm();
    }

    function presize(): void {
        if (disposed) return;
        // BD.W-SUBSTRATE-SIZE-UNIFY (G2) — size the backing on whichever leg is live,
        // decoupled from the acquire. Idempotent on both legs (a no-op once armed / when
        // no dprPolicy). On the WebGPU leg this sizes BEFORE the device request so the
        // canvas is sharp during the cold acquire window.
        webgpu?.presize();
        webgl2?.presize();
    }

    function arm(): void {
        if (disposed) return;
        // Size synchronously first (G2) so a consumer that arms-without-await still gets
        // a sharp backing from frame 0.
        presize();
        // The synchronous twin: the WebGL2 net arms immediately; the WebGPU path is a
        // no-op until `armAsync` resolves the device (the uniform-handle parity). If
        // the net was already built (no WGSL path / a prior fall), arm it now so a
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
