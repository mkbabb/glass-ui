/**
 * Aurora adaptive render substrate (AM.W1; `aurora-lazy-init §3.1`).
 *
 * Aurora is NEVER retired — the warm wash composites under every branch. Only
 * the *substrate* adapts: the animated WebGL field on capable devices, the
 * static CSS-gradient placeholder (a complete render of the same palette) on
 * low-power / reduced-motion / save-data devices.
 */
export type AuroraRenderMode = "webgl" | "css" | "auto";

/**
 * AW.W7b — the resolved render SUBSTRATE after the async WebGPU probe. `"webgpu"` is
 * the capability-gated enhancement; `"webgl"` the universal fallback; `"css"` the
 * placeholder floor.
 */
export type AuroraSubstrate = "webgpu" | "webgl" | "css";

/**
 * Resolve `"auto"` to a concrete substrate per device tier. `"webgl"` and
 * `"css"` pass through unchanged.
 *
 * `"auto"` resolves to `"css"` when ANY low-power signal is present:
 *   - `navigator.hardwareConcurrency <= 4` (few logical cores),
 *   - `prefers-reduced-motion: reduce`,
 *   - `navigator.connection.saveData === true` (Data Saver on).
 * Otherwise `"webgl"`.
 *
 * SSR / missing-API safe: if `navigator` / `window` / the probes are
 * unavailable we ASSUME a capable device and resolve `"webgl"` (the warm wash
 * still composites either way — the only question is whether it animates).
 * `navigator.connection` is non-standard, so it is feature-probed via an
 * optional-chained cast rather than a typed accessor.
 *
 * Called ONCE at component setup — the device tier is a mount-time decision,
 * not a reactive one (a connection-type flip mid-session does not re-resolve;
 * the consumer remounts to re-evaluate, matching the deferred-arm contract).
 */
export function resolveRenderMode(mode: AuroraRenderMode): "webgl" | "css" {
    if (mode !== "auto") return mode;

    // SSR / non-browser — assume capable; the WebGL arm is itself deferred to
    // a browser-only idle tick, so this only decides the schedule's intent.
    if (typeof navigator === "undefined" || typeof window === "undefined") {
        return "webgl";
    }

    const lowConcurrency =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;

    const reducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // `NetworkInformation` is not in the standard DOM lib; probe defensively.
    const saveData =
        (navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection?.saveData === true;

    return lowConcurrency || reducedMotion || saveData ? "css" : "webgl";
}

/**
 * AW.W7b — the ASYNC WebGPU-first probe. The synchronous {@link resolveRenderMode}
 * STAYS for the low-power-tier `"auto"` → `"webgl"`/`"css"` decision (it decides
 * whether to animate at all); this async form is ADDITIVE and decides the BACKEND.
 *
 * It first runs the sync `resolveRenderMode` — a `"css"` floor (low-power /
 * reduced-motion / save-data) short-circuits to `"css"` with NO WebGPU probe (a
 * placeholder-floor device should not pay the adapter request). Otherwise it probes
 * `navigator.gpu.requestAdapter({ powerPreference: "high-performance" })`:
 *
 *   - `requestAdapter` NEVER rejects — it RESOLVES `null` when WebGPU is unsupported.
 *     Guard the null → `"webgl"`.
 *   - A software / FALLBACK adapter (`adapter.isFallbackAdapter === true`) is SLOWER
 *     than the WebGL2 fragment path, so it drops to `"webgl"`, NOT `"webgpu"`.
 *   - Otherwise `requestDevice()` and resolve `"webgpu"` (the consumer reuses the
 *     returned `device`). A `requestDevice` failure also drops to `"webgl"`.
 *
 * The probe runs behind the SAME deferred idle-tick the WebGL arm uses (the CSS
 * placeholder paints FIRST), so it can never block first paint. SSR-safe (returns the
 * sync mode without touching `navigator.gpu`).
 */
/**
 * Read `isFallbackAdapter` across spec revisions — it moved from `GPUAdapter` (legacy
 * top-level) to `GPUAdapter.info` (current). A fallback (software) adapter is slower
 * than the WebGL2 fragment path, so it must NOT resolve `"webgpu"`.
 */
function isFallbackAdapter(adapter: GPUAdapter): boolean {
    const a = adapter as GPUAdapter & { isFallbackAdapter?: boolean };
    if (typeof a.isFallbackAdapter === "boolean") return a.isFallbackAdapter;
    return adapter.info?.isFallbackAdapter === true;
}

export async function resolveRenderModeAsync(
    mode: AuroraRenderMode,
): Promise<{ substrate: AuroraSubstrate; device: GPUDevice | null }> {
    // The sync tier decides whether to animate; a `"css"` floor skips the WebGPU probe.
    const syncMode = resolveRenderMode(mode);
    if (syncMode === "css") return { substrate: "css", device: null };

    // SSR / no WebGPU — the WebGL2 fragment path is the universal fallback.
    if (typeof navigator === "undefined" || !navigator.gpu) {
        return { substrate: "webgl", device: null };
    }

    try {
        const adapter = await navigator.gpu.requestAdapter({
            powerPreference: "high-performance",
        });
        // `requestAdapter` resolves null when unsupported; a software/fallback adapter
        // is slower than the WebGL2 fragment path → drop to webgl. `isFallbackAdapter`
        // moved from `GPUAdapter` to `GPUAdapter.info` across spec revisions — read both
        // (the `.info` location is current; the top-level is the legacy fallback).
        if (!adapter || isFallbackAdapter(adapter)) {
            return { substrate: "webgl", device: null };
        }
        const device = await adapter.requestDevice();
        return { substrate: "webgpu", device };
    } catch {
        // fail-explicit: any adapter/device acquisition failure falls back to the
        // tested WebGL2 path (the universal floor) — WebGPU is the enhancement, never
        // a hard requirement, so a probe failure is a graceful downgrade, not an error.
        return { substrate: "webgl", device: null };
    }
}
