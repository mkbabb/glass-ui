// BC.W-CARVE6 — the WebGPU device-classification leaf, carved out of useWebGPUCanvas.ts to
// hold the 500-line no-god-module bound. ONE cohesive sub-concern: the recognizable typed
// INIT-FAILURE signal (`WebGPUInitError`) + the software/CPU-adapter classifier
// (`isSoftwareWebGPUAdapter`). Both are pure, closure-free, and carry NO WebGPU BOOTSTRAP
// token (`navigator.gpu` / `getContext("webgpu")` / `requestAdapter` live ONLY in the
// substrate — proof:gpu-substrate-single clause A); the substrate re-imports + re-exports
// them so the picker + the package barrel reach them unchanged.

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
        | "pipeline-validation"
        // The adapter/device acquisition HUNG past the bound — `requestAdapter()` or
        // `requestDevice()` never settled (a known headless/virtualized-Metal + some-Chrome
        // class where the device request resolves NEITHER way). A timeout is a recognized
        // init failure the picker falls to the WebGL2 net on, exactly like a no-adapter host.
        | "acquire-timeout";
    constructor(kind: WebGPUInitError["kind"], message: string, cause?: unknown) {
        super(message);
        this.name = "WebGPUInitError";
        this.kind = kind;
        if (cause !== undefined) this.cause = cause;
    }
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
 * The bound on the adapter/device acquisition (ms). The adapter/device request can
 * resolve NEITHER way on a hanging host (a headless / virtualized-Metal + some-Chrome
 * class). A REAL cold acquire on a healthy Metal-3 host was live-measured at ~3478ms
 * (the FIRST device request on a cold GPU process) — well over the prior tight 2500ms
 * ceiling, which converted a slow-but-fine cold acquire into a FALSE hang so the WGSL
 * primary was never exercised (every viz silently downgraded to WebGL2 forever — the
 * Safari-primary surface the "broken TOTALLY" reports live on, masked by the
 * always-winning fallback). 6000ms lets the real cold acquire through while a genuine
 * wedge (a device that never settles) still falls to the WebGL2 net before the user
 * perceives a permanent blank. With the SHARED device warm the ceiling is hit at most
 * ONCE per page, not N-times-per-canvas — a single ≤6s race, never N.
 *
 * BG.W-COLOCATE — carved into this device-acquisition-support leaf beside the typed
 * failure signal it throws (ratchet-drain #4). The substrate re-imports + re-exports it.
 */
export const WEBGPU_ACQUIRE_TIMEOUT_MS = 6000;

/**
 * Race a WebGPU acquisition promise against a timeout. On a hang the timeout wins and
 * rejects with the recognized typed `acquire-timeout` signal (the picker falls to the
 * WebGL2 net on it, exactly like a no-adapter host). The timer is cleared the instant
 * the acquisition settles (resolve OR reject), so a healthy device leaves no dangling
 * timeout. SSR-safe: with no `setTimeout` the bare promise passes through (a non-DOM
 * runtime has no WebGPU surface to hang anyway).
 *
 * `label` is the acquisition-step name used in the timeout message (the caller in the
 * substrate passes the concrete step name — the bootstrap tokens stay in the substrate
 * per proof:gpu-substrate-single clause A).
 */
export function withAcquireTimeout<T>(
    promise: Promise<T>,
    label: string,
): Promise<T> {
    if (typeof setTimeout === "undefined") return promise;
    let timer: ReturnType<typeof setTimeout>;
    const timeout = new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => {
            reject(
                new WebGPUInitError(
                    "acquire-timeout",
                    `[useWebGPUCanvas] ${label}() did not settle within ${WEBGPU_ACQUIRE_TIMEOUT_MS}ms — falling to the WebGL2 net`,
                ),
            );
        }, WEBGPU_ACQUIRE_TIMEOUT_MS);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
