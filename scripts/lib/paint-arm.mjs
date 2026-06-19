// paint-arm — the SHARED computed-style PAINT probe leaf (BC.W-PAINT-GATE).
//
// The live-surface twin of reflect-capture-verify.mjs's PNG reader: where the
// gestalt gate reads a CAPTURED PNG region (pngRegionStats), the paint arm reads the
// LIVE surface's resolved background via getComputedStyle over a real :5199 page. Both
// share the ONE OKLab decompose (oklabFromRgb, minted in reflect-capture-verify.mjs by
// BC.W-GESTALT-FIRST) — a second colour-math source REDs by the canvas-unify single-
// source fence. This leaf authors NO decompose of its own; it imports it.
//
// Two pure-ish exports:
//   - paintProbe(page, route, selector) → {oklabL, chroma, alpha} | null
//       navigate the Playwright/dev-tools page to `route`, read the FIRST `selector`
//       match's resolved backgroundColor, parse the sRGB triple + alpha, decompose to
//       OKLab. The READ happens in the browser (getComputedStyle); the OKLab decompose
//       happens in Node over the returned 0-255 triple (the ONE math source). null when
//       no element matches or the bg cannot be parsed.
//   - paintBand(stats, {L:[lo,hi], chroma:lo, alpha:hi}) → {pass, reasons}
//       the band verdict: oklabL ∈ [L.lo, L.hi] AND chroma ≥ chroma AND alpha < alpha.
//       PURE over a stats object so a gate's self-test exercises both arms with no live
//       page (a synthetic grey {oklabL:0.695, chroma:0.002, alpha:0.536} → fail; a warm-
//       translucent {oklabL:0.93, chroma:0.04, alpha:0.55} → pass).
//
// The cardinal split: paintProbe runs LOCAL on a real device (it needs a live :5199
// surface); paintBand is device-free (the band logic + the self-test).

import { oklabFromRgb } from "../reflect-capture-verify.mjs";

export { oklabFromRgb } from "../reflect-capture-verify.mjs";

/**
 * Parse a CSS resolved-color string (the getComputedStyle backgroundColor form) to an
 * {r,g,b,alpha} record (r/g/b ∈ 0-255, alpha ∈ [0,1]). Handles the three forms a real
 * computed style emits: `rgb(r g b)` / `rgb(r, g, b)`, `rgba(r, g, b, a)`, and
 * `color(srgb r g b / a)` (the wide-gamut serialization Chromium emits for oklab()
 * authored colours). Returns null for a form it cannot read (e.g. `transparent` with no
 * channels, an oklab() left un-resolved — getComputedStyle resolves to one of the three).
 * @param {string} str
 * @returns {{r:number, g:number, b:number, alpha:number} | null}
 */
export function parseResolvedColor(str) {
    if (!str || typeof str !== "string") return null;
    if (/^transparent$/i.test(str.trim())) return { r: 0, g: 0, b: 0, alpha: 0 };
    // color(srgb r g b / a) — channels are 0..1 floats; alpha optional (default 1).
    const srgb = str.match(
        /color\(\s*srgb\s+(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
    );
    if (srgb) {
        const a = srgb[4] == null ? 1 : srgb[4].endsWith("%") ? Number(srgb[4].slice(0, -1)) / 100 : Number(srgb[4]);
        return {
            r: Math.round(Math.max(0, Math.min(1, Number(srgb[1]))) * 255),
            g: Math.round(Math.max(0, Math.min(1, Number(srgb[2]))) * 255),
            b: Math.round(Math.max(0, Math.min(1, Number(srgb[3]))) * 255),
            alpha: a,
        };
    }
    // rgb(r g b) / rgb(r, g, b) / rgba(r, g, b, a) — channels 0..255, alpha 0..1.
    const rgb = str.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/i,
    );
    if (rgb) {
        const a = rgb[4] == null ? 1 : rgb[4].endsWith("%") ? Number(rgb[4].slice(0, -1)) / 100 : Number(rgb[4]);
        return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]), alpha: a };
    }
    return null;
}

/**
 * Decompose a CSS resolved background string to {oklabL, chroma, alpha} via the ONE
 * shared OKLab decompose. PURE — the live read happens in paintProbe; this is the Node-
 * side math (so a gate's self-test feeds it a synthetic computed-style string with no
 * live page). null when the colour cannot be parsed.
 * @param {string} resolvedBg the getComputedStyle backgroundColor string
 * @returns {{oklabL:number, chroma:number, alpha:number} | null}
 */
export function statsFromResolvedBg(resolvedBg) {
    const c = parseResolvedColor(resolvedBg);
    if (!c) return null;
    const ok = oklabFromRgb(c.r, c.g, c.b);
    return { oklabL: ok.L, chroma: ok.chroma, alpha: c.alpha };
}

/**
 * The LIVE computed-style paint probe (BC.W-PAINT-GATE) — navigate `page` to `route`,
 * read the FIRST `selector` match's resolved backgroundColor, decompose to
 * {oklabL, chroma, alpha}. Runs LOCAL on a real device (the cardinal split — it needs a
 * live :5199 surface). Returns null when no element matches the selector OR the resolved
 * bg cannot be parsed (the caller treats null as a degenerate read, not a pass).
 *
 * @param {import("@playwright/test").Page} page a Playwright/dev-tools page
 * @param {string} route the app route to navigate (e.g. "/dock/overview")
 * @param {string} selector the glass surface selector (e.g. ".glass-dock")
 * @returns {Promise<{oklabL:number, chroma:number, alpha:number, resolvedBg:string} | null>}
 */
export async function paintProbe(page, route, selector) {
    if (route) await page.goto(route, { waitUntil: "networkidle" });
    const resolvedBg = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!(el instanceof HTMLElement)) return null;
        return getComputedStyle(el).backgroundColor;
    }, selector);
    if (resolvedBg == null) return null;
    const stats = statsFromResolvedBg(resolvedBg);
    if (!stats) return null;
    return { ...stats, resolvedBg };
}

/**
 * The PAINT BAND verdict (BC.W-PAINT-GATE) — pass IFF the stats fall in the band:
 * oklabL ∈ [band.L[0], band.L[1]] AND chroma ≥ band.chroma AND alpha < band.alpha.
 * PURE over a stats object (so a gate's self-test exercises it with synthetic stats, no
 * live page). The asymmetry is load-bearing: chroma is a FLOOR (warm, not grey), alpha
 * is a CEILING (translucent, not opaque), L is a closed window (light but not blown-out).
 *
 * @param {{oklabL:number, chroma:number, alpha:number} | null} stats
 * @param {{L:[number,number], chroma:number, alpha:number}} band
 * @returns {{pass:boolean, reasons:string[]}}
 */
export function paintBand(stats, band) {
    const reasons = [];
    if (!stats) return { pass: false, reasons: ["no stats (degenerate read — selector missing or bg unparseable)"] };
    const [lo, hi] = band.L;
    if (!(stats.oklabL >= lo && stats.oklabL <= hi))
        reasons.push(`oklabL ${stats.oklabL.toFixed(3)} not in [${lo}, ${hi}]`);
    if (!(stats.chroma >= band.chroma))
        reasons.push(`chroma ${stats.chroma.toFixed(4)} < ${band.chroma} (too grey/neutral)`);
    if (!(stats.alpha < band.alpha))
        reasons.push(`alpha ${stats.alpha.toFixed(3)} ≥ ${band.alpha} (too opaque — lost the glass)`);
    return { pass: reasons.length === 0, reasons };
}
