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
