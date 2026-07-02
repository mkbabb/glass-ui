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

// BG.W-COMPOSITED-GESTALT-GATE — the paint-arm color probe gains the DOMINANT-HUE mode.
// The old probe read a MEAN-L box (paintBand/bandForTier below); the composited-gestalt
// gate reads a DOMINANT-HUE HISTOGRAM over a route REGION (measure the WHOLE, not the
// part — a warm token over a flat achromatic page still reads grey, GF1). The histogram
// + hue-family classifier live in the ONE colour-math home (reflect-capture-verify.mjs —
// no import cycle); paint-arm RE-EXPORTS them so the probe surface is one place, and adds
// warmIdentityVerdict (the widened-predicate band, the twin of paintBand) below.
export {
    hueFamily,
    dominantHue,
    pngRegionHueHistogram,
} from "../reflect-capture-verify.mjs";

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
    // An oklab()/oklch() computed value is ALREADY in OKLab — read its channels directly
    // (modern Chromium does NOT down-convert oklab()-authored colours to srgb, so the
    // warm-cream glass tokens resolve to oklab(L a b / α) on the live surface). This is a
    // PARSE, not a second colour-math source — the rgb→oklab decompose fence is untouched.
    const direct = parseOklabLike(resolvedBg);
    if (direct) return direct;
    const c = parseResolvedColor(resolvedBg);
    if (!c) return null;
    const ok = oklabFromRgb(c.r, c.g, c.b);
    return { oklabL: ok.L, chroma: ok.chroma, alpha: c.alpha };
}

/**
 * Parse an `oklab()` / `oklch()` resolved-color string DIRECTLY to {oklabL, chroma,
 * alpha}. The value is already in OKLab; we only READ its channels (chroma = hypot(a,b)
 * for oklab, C directly for oklch). NOT a second sRGB→OKLab matrix (the one-source fence
 * lives on the rgb→oklab path in reflect-capture-verify's oklabFromRgb).
 * @param {string} str
 * @returns {{oklabL:number, chroma:number, alpha:number} | null}
 */
export function parseOklabLike(str) {
    if (!str || typeof str !== "string") return null;
    const num = (s) => (s == null ? null : s.endsWith("%") ? Number(s.slice(0, -1)) / 100 : Number(s));
    const ok = str.match(
        /oklab\(\s*([\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
    );
    if (ok) {
        const a = num(ok[2]);
        const b = num(ok[3]);
        return { oklabL: num(ok[1]), chroma: Math.hypot(a, b), alpha: ok[4] == null ? 1 : num(ok[4]) };
    }
    const ch = str.match(
        /oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+(-?[\d.]+)(?:deg)?(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
    );
    if (ch) {
        // CSS oklch C-as-% references 0.4 (100% = 0.4); a bare number is the chroma itself.
        const cRaw = ch[2];
        const chroma = cRaw.endsWith("%") ? (Number(cRaw.slice(0, -1)) / 100) * 0.4 : Number(cRaw);
        return { oklabL: num(ch[1]), chroma, alpha: ch[4] == null ? 1 : num(ch[4]) };
    }
    return null;
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

// ── BC.W-PAINT-RECONCILE — the ONE per-tier calm-light band set (the shared identity) ──
//
// The warm-cream ladder is alpha-MONOTONIC by design (tokens/glass.css §8): each tier's
// resolved alpha is its OWN opacity rung composited over the warm page, and the dark arm
// (tokens/dark-arm.css) lifts every rung ~+0.08 for read-weight over the deeper canvas.
// A SINGLE flat alpha ceiling therefore cannot be the translucency bound for the whole
// ladder — the content rungs (wash/quiet/resting/card/dock) sit low, the OVERLAY band
// (.glass-floating/.glass-overlay — the Dialog/Sheet/Popover/Dropdown register) rides
// heavier by design ("modal-heavy, the topmost scrim is allowed to read more solid").
//
// THE PROBED TRUTH (the live :5199 readback, viewport-INVARIANT — the SAME tokens resolve
// identically at 1280×800 and 390×844; only an adaptive-darken route shifts a plate):
//   tier      light-α  dark-α     classification
//   wash      0.328    0.454      content
//   dock      0.443    0.490      content (chrome)
//   quiet     0.520    0.630      content
//   card      0.600    0.630      content
//   resting   0.664    0.754      content      ← dark lift pushes past the old 0.72 ceil
//   floating  0.808    0.894      overlay band ← past the content ceil BY DESIGN (the L6 register)
//   overlay   0.952    0.965      overlay band ← the heaviest modal-over-modal rung
//
// THE PER-TIER CEILINGS (the smallest bound that admits the design ladder yet still REDs a
// went-opaque 1.0 slab) — THREE classes, because the alpha-monotonic ladder spans three
// design registers:
//   • CONTENT (wash/quiet/resting/card/dock): the translucent body register —
//       α < 0.72 light / < 0.82 dark (covers the +0.08 dark resting lift to 0.754).
//   • FLOATING (.glass-floating — the Dialog/Sheet/Popover/Dropdown "let content through"
//       overlay): the iOS L6 clamp — α < 0.86 light / < 0.90 dark (the +0.09 dark lift to
//       0.894). This is the canonical "overlay clamp" the device-free proof-glass-legibility
//       gate names (0.86) — its overlay fixture is the dropdown register, a .glass-floating.
//   • OVERLAY (.glass-overlay — the HEAVIEST `--glass-opacity-overlay: 0.95` modal-over-modal
//       rung, near-opaque BY DESIGN, tokens/glass.css §8 "NEW; modal-over-modal"): its own
//       ceiling — α < 0.97 light (the 0.952 design rung) / < 0.98 dark (the 0.965 dark lift).
//       This rung is intentionally the most solid scrim; the bound only excludes a full 1.0
//       slab. Asserting "reads THROUGH" on the 0.95 rung would contradict its design role.
// The chroma floor is 0.004 (the warm-cream identity floor — every tier reads ~0.0063-0.0066;
// the over-tight 0.01 was never what the warm-cream tokens produce). The L window is the
// light/dark twin ([0.85,0.99] light, [0.10,0.55] dark — the warm material re-resolving the
// deep-canvas register).
//
// THE ANTI-DISEASE INVARIANT (unbroken): the grey slab oklab(0.695 0.002 0.006 / 0.536) —
// chroma 0.0063, IDENTICAL to the warm-cream dock — REDs EVERY tier's band on L (0.695 <
// 0.85 light floor / > 0.55 dark ceiling), regardless of the alpha ceiling. Chroma alone
// cannot separate grey from cream here (same 0.0063); the separation is L (+ the warm-hue
// direction). No tier's L floor drops below 0.85 in light — the grey slab can never pass.

/**
 * The per-tier, per-mode calm-light identity band (BC.W-PAINT-RECONCILE) — the ONE band
 * resolver the three live π specs share. Keyed by the surface SELECTOR (the tier) and the
 * MODE (light|dark — the dark arm lifts each rung's alpha ~+0.08 for read-weight over the
 * deeper canvas, so the ceilings rise per-mode). Three alpha registers: content (translucent
 * body), .glass-floating (the L6 "let content through" overlay), .glass-overlay (the heaviest
 * modal-over-modal rung, near-opaque by design). Returns {L, chroma, alpha} for paintBand. An
 * unknown selector falls back to the content band (fail-tight).
 *
 * The optional `opts.darkenTolerant` relaxes the LIGHT content ceiling to the dark-mode
 * value (0.82). The calm-REST identity (glass-identity + adaptive-glass-live's calm arm)
 * leaves it OFF — light content sits ≤ 0.664 at rest, so the tight 0.72 holds the rest
 * identity. The legibility spec turns it ON: it runs over BUSY-aurora routes too, where the
 * adaptive darken legitimately lifts a light content rung to ~0.72 (the dynamic-range shift
 * — still glassy, not opaque); its "glassy" bound is "didn't go opaque to win contrast", a
 * design register the +0.056 darken rides. The dark ceiling already carries this headroom.
 *
 * @param {string} selector the glass surface selector (e.g. ".glass-floating")
 * @param {"light"|"dark"} [mode="light"]
 * @param {{darkenTolerant?:boolean}} [opts]
 * @returns {{L:[number,number], chroma:number, alpha:number}}
 */
export function bandForTier(selector, mode = "light", opts = {}) {
    const dark = mode === "dark";
    const L = dark ? [0.1, 0.55] : [0.85, 0.99];
    let alpha;
    if (selector === ".glass-overlay") alpha = dark ? 0.98 : 0.97; // the heaviest modal rung
    else if (selector === ".glass-floating") alpha = dark ? 0.9 : 0.86; // the L6 overlay clamp
    else alpha = dark || opts.darkenTolerant ? 0.82 : 0.72; // the translucent content register
    return { L: /** @type {[number,number]} */ (L), chroma: 0.004, alpha };
}

// ── BG.W-COMPOSITED-GESTALT-GATE — the WARM-IDENTITY widened-predicate band ───────
// The dominant-hue-histogram twin of paintBand. Where paintBand reads a MEAN over a box
// (fooled by a warm plate + a grey field averaging neutral), warmIdentityVerdict reads
// the histogram stats (dominant family + warmFraction) so the composited WHOLE must read
// warm, not the part. SIX named widened predicates (the spec's list: hue band + chroma
// ceiling + edge-cast + top-bar-present + corner-clip-absent + route-navigates):
//   1. hueBand       — the dominant hue family is warm (chroma-weight above a floor gives
//                      the region a dominant hue at all; a flat achromatic page → NEUTRAL
//                      → not warm) AND warmFraction ≥ floor (a two-peaked warm+cold field,
//                      whose MEAN is neutral, still REDs — the histogram's value).
//   2. chromaCeiling — meanChroma ≤ ceiling (the D2 metallic/over-saturated over-correction).
//   3. edgeCast      — edge↔field OKLab ΔE ≤ ceiling (no divergent cold cast at the edge).
//   4. topBar        — top-bar↔field OKLab ΔE ≤ ceiling (the top bar composes INTO the
//                      field — the D5 aberrant-slab, present-and-composed).
//   5. cornerClip    — corner L ≥ floor (no hard rounded-clip black-notch corner).
//   6. routeNavigates — captureReal === true (a real dimension-correct PNG — the served-
//                      app sentinel proxy; a blank/error page reads degenerate).
// hueBand + chromaCeiling ALWAYS evaluate (they DEFINE warm-identity); the widened four
// evaluate ONLY when their stat is finite/present (so a self-test may exercise a subset).

/**
 * The warm-identity band verdict (BG.W-COMPOSITED-GESTALT-GATE). PURE over a stats
 * object (so a gate self-test feeds synthetic stats with no PNG — the born-RED synthetic
 * gray/cerulean routes). Returns {pass, reasons, predicates}. `stats` carries the
 * histogram (dominantFamily/warm/warmFraction/meanChroma) plus the optional delta axes
 * (edgeDelta/topDelta/cornerL) + captureReal. `band` overrides the default bounds.
 * @param {{dominantFamily?:string, warm?:boolean, warmFraction?:number, meanChroma?:number, edgeDelta?:number, topDelta?:number, cornerL?:number, captureReal?:boolean} | null} stats
 * @param {{warmFractionFloor?:number, chromaCeiling?:number, edgeCastCeiling?:number, topBarCeiling?:number, cornerClipFloor?:number}} [band]
 * @returns {{pass:boolean, reasons:string[], predicates:Record<string,boolean>}}
 */
export function warmIdentityVerdict(stats, band = {}) {
    const reasons = [];
    /** @type {Record<string, boolean>} */
    const predicates = {};
    const B = {
        warmFractionFloor: band.warmFractionFloor ?? 0.55,
        chromaCeiling: band.chromaCeiling ?? 0.3,
        edgeCastCeiling: band.edgeCastCeiling ?? 0.16,
        topBarCeiling: band.topBarCeiling ?? 0.14,
        cornerClipFloor: band.cornerClipFloor ?? 0.04,
    };
    if (!stats)
        return {
            pass: false,
            reasons: ["no stats (degenerate read — region missing or PNG undecodable)"],
            predicates,
        };
    // 1. hueBand — dominant family warm AND warmFraction floor
    const warmDom = stats.warm === true;
    const warmFrac = Number.isFinite(stats.warmFraction) ? Number(stats.warmFraction) : 0;
    predicates.hueBand = warmDom && warmFrac >= B.warmFractionFloor;
    if (!predicates.hueBand)
        reasons.push(
            `[hueBand] dominant hue family is ${stats.dominantFamily ?? "?"} (warmFraction ${warmFrac.toFixed(2)} vs floor ${B.warmFractionFloor}) — the composited region does not read WARM (a grey/cerulean/metallic field, not the warm-cream identity)`,
        );
    // 2. chromaCeiling
    if (Number.isFinite(stats.meanChroma)) {
        predicates.chromaCeiling = Number(stats.meanChroma) <= B.chromaCeiling;
        if (!predicates.chromaCeiling)
            reasons.push(
                `[chromaCeiling] meanChroma ${Number(stats.meanChroma).toFixed(4)} > ${B.chromaCeiling} — the field over-saturates (the gray→metallic over-correction), not warm-translucent glass`,
            );
    }
    // 3. edgeCast
    if (Number.isFinite(stats.edgeDelta)) {
        predicates.edgeCast = Number(stats.edgeDelta) <= B.edgeCastCeiling;
        if (!predicates.edgeCast)
            reasons.push(
                `[edgeCast] edge↔field OKLab ΔE ${Number(stats.edgeDelta).toFixed(3)} > ${B.edgeCastCeiling} — a divergent colour cast bleeds from the edge (a cold rim / a clip artifact)`,
            );
    }
    // 4. topBar (present-and-composed)
    if (Number.isFinite(stats.topDelta)) {
        predicates.topBar = Number(stats.topDelta) <= B.topBarCeiling;
        if (!predicates.topBar)
            reasons.push(
                `[topBar] top-bar↔field OKLab ΔE ${Number(stats.topDelta).toFixed(3)} > ${B.topBarCeiling} — the top bar reads as a divergent slab (the D5 aberrant top bar), not composed INTO the field`,
            );
    }
    // 5. cornerClip (absent)
    if (Number.isFinite(stats.cornerL)) {
        predicates.cornerClip = Number(stats.cornerL) >= B.cornerClipFloor;
        if (!predicates.cornerClip)
            reasons.push(
                `[cornerClip] corner L ${Number(stats.cornerL).toFixed(3)} < ${B.cornerClipFloor} — a hard rounded-clip corner reads as a black notch (a corner-clip artifact)`,
            );
    }
    // 6. routeNavigates
    if (stats.captureReal !== undefined) {
        predicates.routeNavigates = stats.captureReal === true;
        if (!predicates.routeNavigates)
            reasons.push(
                `[routeNavigates] the capture is not a real dimension-correct PNG — the route did not navigate/render (a blank/error page, a truncated capture)`,
            );
    }
    return { pass: reasons.length === 0, reasons, predicates };
}
