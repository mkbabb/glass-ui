// BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION — the UNMASKED_RENDERER falsifier leaf.
//
// The §K.1 learning made durable: the ship-ceremony's anti-SwiftShader guard pins on
// the GL `UNMASKED_RENDERER` string (`ANGLE (Apple, Apple M-series, …)` / `Apple
// GPU` vs `Google SwiftShader` / `llvmpipe` / `Microsoft Basic Render`), NOT a
// pixel-delta. A software-rasterizer shoot certifies the WRONG ground (the headless
// CI raster paints a degraded field), so `runShip()` (Arm A) MUST refuse to write a
// ship-attestation off a software renderer (`isSoftware === true`). This leaf owns
// that classification ONCE, in volatile-`/tmp`-FREE committed disk (the §J.5 "never
// leave the falsifier in /tmp" rule), so the renderer-probe is auditable on
// `tranche/BG` and re-used by both `runShip()` and `proof:ship-attestation`'s
// renderer assertion.
//
// PURE + import-safe: `classifyRenderer` / `isSoftwareRenderer` are pure over a
// string (the renderer the Playwright `page.evaluate(UNMASKED_RENDERER_SNIPPET)`
// read in-browser passed back to Node); the in-page `UNMASKED_RENDERER_SNIPPET` is
// the browser-side reader `runShip()` injects (the `probeWebGL2Renderer` mirror, no
// second WebGL2-creating module on the library side — this is a SHIP-CEREMONY probe,
// off the `proof:webgl-substrate-single` library inventory).

// The software-rasterizer signatures (the conservative `isSoftwareWebGLRenderer` /
// `webgpuDevice.ts` `isSoftwareAdapter` set): SwiftShader (Chromium headless),
// llvmpipe (Mesa software GL), the Microsoft Basic Render Driver / WARP, and the
// generic "software" token. A renderer matching any of these CANNOT certify the
// ground — `runShip()` fail-CLOSES on it.
export const SOFTWARE_RENDERER_RE =
    /swiftshader|llvmpipe|software|basic render|microsoft basic|warp|softpipe|paravirtual.*software/i;

// The real hardware-Metal signatures the macOS `release.sh` ceremony expects: an
// ANGLE-over-Metal string (`ANGLE (Apple, Apple M3 Pro, OpenGL 4.1 Metal …)`) or the
// bare `Apple GPU` / `Apple M-series` token a non-ANGLE WebGL2 surface reports. This
// is informational (the BINDING guard is `!isSoftware`); it lets the attestation
// record WHICH GPU rendered for the audit trail.
export const HARDWARE_METAL_RE =
    /angle.*(apple|metal)|apple\s+m\d|apple\s+gpu|apple\s+paravirtual(?!.*software)/i;

/**
 * Classify a raw `UNMASKED_RENDERER_WEBGL` string. PURE — the browser read the
 * string, this Node leaf judges it. A `null`/empty/non-string renderer is "unknown"
 * (`isSoftware: null` — "cannot prove", the conservative-but-lossy fall the caller
 * fail-CLOSES on, never silently greens).
 *
 * @param {string|null|undefined} unmaskedRenderer
 * @returns {{renderer:string|null, isSoftware:boolean|null, isHardwareMetal:boolean, verdict:"software"|"hardware-metal"|"hardware-other"|"unknown"}}
 */
export function classifyRenderer(unmaskedRenderer) {
    if (typeof unmaskedRenderer !== "string" || !unmaskedRenderer.trim()) {
        return { renderer: unmaskedRenderer ?? null, isSoftware: null, isHardwareMetal: false, verdict: "unknown" };
    }
    const renderer = unmaskedRenderer.trim();
    const isSoftware = SOFTWARE_RENDERER_RE.test(renderer);
    const isHardwareMetal = !isSoftware && HARDWARE_METAL_RE.test(renderer);
    const verdict = isSoftware
        ? "software"
        : isHardwareMetal
          ? "hardware-metal"
          : "hardware-other";
    return { renderer, isSoftware, isHardwareMetal, verdict };
}

/**
 * The ship-ceremony BINDING predicate: is this renderer a software rasterizer the
 * ship-attestation must NOT be written off? Returns `true` ONLY when the string
 * positively matches a software signature; an UNKNOWN renderer (unreadable/`null`)
 * also returns `true` (cannot prove hardware → fail-CLOSED, never a silent ship off
 * an unverifiable GPU). So `runShip()` proceeds IFF `isSoftwareRenderer(str) === false`.
 *
 * @param {string|null|undefined} unmaskedRenderer
 * @returns {boolean} true ⇒ refuse the ship (software OR unprovable)
 */
export function isSoftwareRenderer(unmaskedRenderer) {
    const { isSoftware } = classifyRenderer(unmaskedRenderer);
    return isSoftware !== false; // true | null both refuse
}

// The browser-side reader `runShip()` injects via Playwright `page.evaluate(...)` —
// the `probeWebGL2Renderer` mirror (a throwaway WebGL2 context + the
// WEBGL_debug_renderer_info extension), returned to Node so `classifyRenderer` can
// judge it. A string (the renderer) or `null` (no WebGL2 / no extension — the caller
// treats `null` as "cannot prove" → fail-CLOSED). The context is released via
// WEBGL_lose_context (no leaked ship-ceremony context).
export const UNMASKED_RENDERER_SNIPPET = `(() => {
    try {
        const probe = document.createElement("canvas");
        const gl = probe.getContext("webgl2") || probe.getContext("webgl");
        if (!gl) return null;
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const out = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        try { const lc = gl.getExtension("WEBGL_lose_context"); if (lc) lc.loseContext(); } catch {}
        return out ? String(out) : null;
    } catch {
        return null;
    }
})()`;
