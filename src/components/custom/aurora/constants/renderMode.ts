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
 * Detect a SOFTWARE / CPU WebGL renderer (SwiftShader, llvmpipe, the Microsoft
 * Basic Render Driver) via a throwaway WebGL2 context's `WEBGL_debug_renderer_info`.
 *
 * WHY this is a `"css"` signal (the N.W5 Defect-A root cause, proven live under
 * the playwright SwiftShader harness): a full-viewport WebGL2 surface is a
 * compositor layer the rasteriser must re-raster on every composite. On a
 * software rasteriser that per-composite cost is so high that a REAL pointer
 * interaction — which forces a composite — starves the renderer's input ack and
 * the page goes UNRESPONSIVE (the headless-Chromium hang; the same severe jank a
 * GPU-blocklisted user feels). Neither a frame-cadence cap, a backing-store
 * shrink, nor a reduced-motion park cures it (all keep the live GL layer);
 * ONLY *not creating the WebGL surface* does. So a software renderer takes the
 * `"css"` substrate — the static gradient placeholder is a complete render of the
 * same palette, composites cheaply, and never stalls input. A blocklisted-GPU
 * user gets a smooth atmosphere instead of a janky/hanging one.
 *
 * Failing the probe (no WebGL2 / extension masked / throw) returns `false` — we
 * never downgrade a renderer we cannot PROVE is software (the `"css"` path is the
 * conservative-but-lossy choice, so a false miss keeps the richer default). The
 * throwaway context is released via `WEBGL_lose_context` under the per-page cap.
 */
function isSoftwareWebGLRenderer(): boolean {
    if (typeof document === "undefined") return false;
    let gl: WebGL2RenderingContext | null = null;
    try {
        const probe = document.createElement("canvas");
        gl = probe.getContext("webgl2");
        if (!gl) return false;
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        if (!ext) return false;
        const r = String(
            gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "",
        ).toLowerCase();
        return (
            r.includes("swiftshader") ||
            r.includes("llvmpipe") ||
            r.includes("software") ||
            r.includes("basic render") ||
            r.includes("microsoft basic")
        );
    } catch {
        return false;
    } finally {
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
    }
}

/**
 * Resolve `"auto"` to a concrete substrate per device tier. `"webgl"` and
 * `"css"` pass through unchanged.
 *
 * `"auto"` resolves to `"css"` when ANY low-power signal is present:
 *   - a SOFTWARE WebGL renderer (SwiftShader / llvmpipe / MS Basic Render — the
 *     GPU-blocklisted path; see {@link isSoftwareWebGLRenderer}),
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

    return lowConcurrency || reducedMotion || saveData || isSoftwareWebGLRenderer()
        ? "css"
        : "webgl";
}
