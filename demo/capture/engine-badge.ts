// engine-badge.ts — BG C18 capture harness · the in-pixel engine badge.
//
// The SOLE provenance source per the real-paint protocol §6: a deterministic,
// high-contrast, fixed-position DOM element painted INTO the capture that
// encodes the rendering engine + the live GL renderer + the viewport + the
// mode. The gate (and the human eye) decode it FROM THE PIXELS — a JSON sidecar
// is forgeable beyond a re-stamp; the in-pixel badge proves which engine
// produced the bytes the eye saw.
//
// Zero animation, zero random seed — the text is a pure function of the
// environment, so two captures of the same engine/mode/viewport carry an
// identical badge. Demo-private (never exported from the library); reached ONLY
// by the `?capture=` boot path in `demo/main.ts`.

/** The decoded engine-provenance fields the badge renders (one line each). */
export interface EngineBadgeInfo {
    /** CHROME · WEBKIT · SAFARI · FIREFOX · UNKNOWN — parsed off navigator.userAgent. */
    engine: string;
    /** The live GL_RENDERER (real-GPU vs SwiftShader/llvmpipe/Software). */
    glRenderer: string;
    /** The device-pixel viewport `W×H@<dpr>x` (proves Retina double-scale). */
    viewport: string;
    /** light · dark — the captured color scheme. */
    mode: string;
}

/**
 * Parse the rendering engine off the user-agent string. The three load-bearing
 * discriminations:
 *  - CHROME  — any Chrome/Chromium (incl. headless + the Edge fork), the CDP leg.
 *  - SAFARI  — real Safari.app (carries the `Version/<n>` token).
 *  - WEBKIT  — an off-screen WKWebView (system WebKit.framework, no `Version/`),
 *              the `wkshot-live` off-screen capture leg.
 * Chrome must be tested BEFORE Safari (Chrome's UA also carries "Safari").
 */
export function detectEngine(ua: string): string {
    const s = ua || "";
    // Edge/Opera are Chromium forks but report their own brand; still CHROME engine.
    if (/\bEdg\//.test(s) || /\bOPR\//.test(s)) return "CHROME";
    if (/\bChrome\//.test(s) || /\bChromium\//.test(s) || /\bHeadlessChrome\//.test(s)) {
        return "CHROME";
    }
    if (/\bFirefox\//.test(s) || /\bGecko\//.test(s)) return "FIREFOX";
    if (/AppleWebKit\//.test(s)) {
        // Real Safari.app carries `Version/<n> … Safari/<n>`; a bare WKWebView
        // (system WebKit.framework, the off-screen snapshot path) does not.
        return /\bVersion\/\d/.test(s) && /\bSafari\//.test(s) ? "SAFARI" : "WEBKIT";
    }
    return "UNKNOWN";
}

/**
 * Read the live `GL_RENDERER` from a throwaway WebGL2 context. This is the
 * real-GPU-vs-SwiftShader discriminator: a real Metal/ANGLE backend reports e.g.
 * `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`, a software fall reports
 * `ANGLE Software`/`SwiftShader`/`llvmpipe`. The unmasked renderer (behind the
 * `WEBGL_debug_renderer_info` extension) is preferred; some engines restrict it,
 * so we fall back to the plain `RENDERER` parameter. The context is created,
 * read, and discarded (no leak, no retained GL surface).
 */
export function readGlRenderer(): string {
    try {
        const canvas = document.createElement("canvas");
        const gl =
            (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ??
            (canvas.getContext("webgl") as WebGLRenderingContext | null);
        if (!gl) return "no-webgl";
        let renderer = "";
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        if (dbg) {
            renderer = String(
                gl.getParameter(
                    (dbg as { UNMASKED_RENDERER_WEBGL: number }).UNMASKED_RENDERER_WEBGL,
                ) ?? "",
            );
        }
        if (!renderer) renderer = String(gl.getParameter(gl.RENDERER) ?? "");
        // Release the context promptly (Chromium caps live GL contexts).
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return renderer || "unknown-renderer";
    } catch (e) {
        return `gl-error:${(e as Error)?.message ?? "?"}`;
    }
}

/** Gather the full provenance set (pure read — no DOM mutation). */
export function gatherEngineBadgeInfo(mode: string): EngineBadgeInfo {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);
    return {
        engine: detectEngine(navigator.userAgent),
        glRenderer: readGlRenderer(),
        viewport: `${window.innerWidth}×${window.innerHeight} @${dpr}x (${w}×${h}px)`,
        mode,
    };
}

/** The badge element id (idempotent mount — a second call replaces it). */
const BADGE_ID = "gl-capture-engine-badge";

/**
 * Mount the in-pixel engine badge — a deterministic, high-contrast, fixed
 * top-left panel decodable from the captured PNG. Returns the gathered info (so
 * the boot path can log it). Idempotent: a re-mount replaces the prior badge.
 *
 * The badge is painted with explicit inline styles (no dependency on the demo
 * cascade) so it reads identically regardless of the captured route's theme,
 * and carries `animation: none` so it never promotes a compositing layer of its
 * own (it must survive the off-screen WKWebView snapshot like the de-promoted
 * route content).
 */
export function mountEngineBadge(mode: string): EngineBadgeInfo {
    const info = gatherEngineBadgeInfo(mode);

    document.getElementById(BADGE_ID)?.remove();

    const badge = document.createElement("div");
    badge.id = BADGE_ID;
    badge.setAttribute("data-capture-badge", info.engine);
    badge.setAttribute("aria-hidden", "true");

    // A deterministic, high-contrast panel. Inline styles only — no cascade
    // dependency, no animation, no transition (so the snapshot never drops it).
    Object.assign(badge.style, {
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "2147483647",
        margin: "0",
        padding: "8px 12px",
        maxWidth: "70vw",
        background: "#000000",
        color: "#00ff66",
        font: "600 13px/1.5 ui-monospace, 'Fira Code', Menlo, monospace",
        letterSpacing: "0.02em",
        whiteSpace: "pre",
        textAlign: "left",
        border: "2px solid #ff00ff", // magenta edge — a deterministic locator the gate can find
        borderRadius: "0",
        boxShadow: "none",
        pointerEvents: "none",
        animation: "none",
        transition: "none",
        willChange: "auto",
        contain: "none",
        textShadow: "none",
        textRendering: "geometricPrecision",
    } satisfies Partial<CSSStyleDeclaration>);

    badge.textContent = [
        `ENGINE  ${info.engine}`,
        `GPU     ${info.glRenderer}`,
        `VIEW    ${info.viewport}`,
        `MODE    ${info.mode.toUpperCase()}`,
    ].join("\n");

    document.body.appendChild(badge);
    return info;
}
