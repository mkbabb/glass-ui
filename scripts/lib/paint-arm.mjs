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

// ── BG.W-APCA-CONTRAST (F8.8) — the APCA Lc PARALLEL witness on composited plates ──
//
// The house legibility bar is WCAG-2 AA (contrast RATIO ≥ 4.5:1). But ratio-contrast
// MIS-RANKS composited translucent surfaces — a warm-cream glass plate over a live
// backdrop is exactly the case AA under-reads (the on-glass-fg family was DERIVED against
// composites yet audited in ratios). The published 2026 SOTA for translucent surfaces is
// APCA Lc (APCA-W3 0.1.9). This arm adds Lc as a PARALLEL witness ALONGSIDE the AA arm
// (NEVER replacing it — both witnesses read on the COMPOSITED fill).
//
// APCA is its OWN perceptual algorithm — a 2.4-power TRC + APCA-specific luminance
// coefficients + a soft black-clamp + a polarity-aware SAPC contrast. It is NOT the OKLab
// decompose (the canvas-unify single-source fence targets the sRGB→OKLab matrix, which is
// UNTOUCHED here); apcaLuminance is a distinct, self-contained metric, so it lives beside
// oklabFromRgb without forking it. `compositeOver` is trivial alpha-over arithmetic (not a
// colour-math algorithm) — it composites the translucent plate over its backdrop so the Lc
// reads the surface the eye actually sees (the COMPOSITED plate, the whole point of F8.8).
//
// The verdict thresholds are the spec target (RECOVERED-LIQUID-ANIM-FINDINGS [10]): Lc ≥ 60
// body / ≥ 75 small-text. Lc is SIGNED (positive = dark-on-light BoW polarity, negative =
// light-on-dark WoB); the verdict compares the ABSOLUTE value against the floor.
//
// The cardinal split (mirroring paintProbe/paintBand): apcaProbe runs LOCAL on a real
// device (it reads a live :5199 surface's `color`/`background-color`); apcaContrastLc /
// compositeOver / apcaLcFromResolved / apcaVerdict are DEVICE-FREE (the math + the verdict
// + the self-test — proof:meta exercises them with no live page).

// APCA-W3 0.1.9 constants (the SAPC "4g" locked set — do NOT re-tune; they are a spec).
const APCA_TRC = 2.4;
const APCA_RCO = 0.2126729;
const APCA_GCO = 0.7151522;
const APCA_BCO = 0.072175;
const APCA_NORM_BG = 0.56;
const APCA_NORM_TXT = 0.57;
const APCA_REV_TXT = 0.62;
const APCA_REV_BG = 0.65;
const APCA_BLK_THRS = 0.022;
const APCA_BLK_CLMP = 1.414;
const APCA_SCALE_BOW = 1.14;
const APCA_SCALE_WOB = 1.14;
const APCA_LO_BOW_OFFSET = 0.027;
const APCA_LO_WOB_OFFSET = 0.027;
const APCA_DELTA_Y_MIN = 0.0005;
const APCA_LO_CLIP = 0.1;

/** The APCA body / small-text Lc floors (RECOVERED-LIQUID-ANIM-FINDINGS [10]). */
export const APCA_LC_BODY = 60;
export const APCA_LC_SMALL = 75;

/**
 * APCA screen luminance Y from an sRGB {r,g,b} (0-255) triple. The APCA TRC (a straight
 * 2.4 power, no sRGB piecewise segment) + APCA's own luminance coefficients — a SEPARATE
 * metric from the OKLab decompose (the single-source fence is untouched). Pre-soft-clamp;
 * the black clamp is applied per-colour inside apcaContrastLc.
 * @param {{r:number, g:number, b:number}} c
 * @returns {number} Y ∈ [0,1]
 */
export function apcaLuminance(c) {
    const f = (chan) => Math.pow(Math.max(0, Math.min(255, chan)) / 255, APCA_TRC);
    return APCA_RCO * f(c.r) + APCA_GCO * f(c.g) + APCA_BCO * f(c.b);
}

/**
 * The APCA-W3 0.1.9 contrast Lc between a text colour and a background colour (both opaque
 * {r,g,b} 0-255). Returns the SIGNED lightness contrast × 100 (positive BoW / negative WoB;
 * 0 for a degenerate low-Δ or out-of-range read). The verdict compares |Lc| to the floor.
 * @param {{r:number, g:number, b:number}} txt
 * @param {{r:number, g:number, b:number}} bg
 * @returns {number} signed Lc
 */
export function apcaContrastLc(txt, bg) {
    const txtY = apcaLuminance(txt);
    const bgY = apcaLuminance(bg);
    if (!Number.isFinite(txtY) || !Number.isFinite(bgY)) return 0;
    if (Math.min(txtY, bgY) < 0 || Math.max(txtY, bgY) > 1.1) return 0; // input-range clamp
    // Soft-clamp each Y near black.
    const Ytxt = txtY > APCA_BLK_THRS ? txtY : txtY + Math.pow(APCA_BLK_THRS - txtY, APCA_BLK_CLMP);
    const Ybg = bgY > APCA_BLK_THRS ? bgY : bgY + Math.pow(APCA_BLK_THRS - bgY, APCA_BLK_CLMP);
    if (Math.abs(Ybg - Ytxt) < APCA_DELTA_Y_MIN) return 0; // extremely low ∆Y → 0
    let out;
    if (Ybg > Ytxt) {
        // BoW — dark text on a lighter background (normal polarity, positive Lc).
        const sapc = (Math.pow(Ybg, APCA_NORM_BG) - Math.pow(Ytxt, APCA_NORM_TXT)) * APCA_SCALE_BOW;
        out = sapc < APCA_LO_CLIP ? 0 : sapc - APCA_LO_BOW_OFFSET;
    } else {
        // WoB — light text on a darker background (reverse polarity, negative Lc).
        const sapc = (Math.pow(Ybg, APCA_REV_BG) - Math.pow(Ytxt, APCA_REV_TXT)) * APCA_SCALE_WOB;
        out = sapc > -APCA_LO_CLIP ? 0 : sapc + APCA_LO_WOB_OFFSET;
    }
    return out * 100;
}

/**
 * Alpha-over composite: `over` ({r,g,b,alpha}) composited over an opaque `base` ({r,g,b}) →
 * an opaque {r,g,b}. The standard sRGB-space "over" the browser paints for a translucent
 * backgroundColor (matches what the eye sees). Trivial arithmetic — NOT a colour-math
 * algorithm (the single-source fence is about the OKLab decompose, not alpha compositing).
 * @param {{r:number, g:number, b:number, alpha?:number}} over
 * @param {{r:number, g:number, b:number}} base
 * @returns {{r:number, g:number, b:number}}
 */
export function compositeOver(over, base) {
    const a = over.alpha == null ? 1 : Math.max(0, Math.min(1, over.alpha));
    return {
        r: Math.round(over.r * a + base.r * (1 - a)),
        g: Math.round(over.g * a + base.g * (1 - a)),
        b: Math.round(over.b * a + base.b * (1 - a)),
    };
}

/**
 * The APCA Lc on a COMPOSITED plate, from resolved CSS colour strings. `textColor` is the
 * `color` of the text; `plateColor` is the surface `background-color` (possibly translucent);
 * `backdropColor` (optional) is what sits behind the plate — when given, the plate is
 * composited over it FIRST so the Lc reads the surface the eye sees (the whole point of the
 * COMPOSITED-plate metric). A translucent text colour is likewise composited over the
 * composited plate. Returns the signed Lc, or null when a colour cannot be parsed (the
 * caller treats null as a degenerate read, not a pass — apcaVerdict(null) fails).
 * @param {string} textColor resolved `color` (rgb/rgba/color(srgb)/oklab/oklch)
 * @param {string} plateColor resolved `background-color`
 * @param {string} [backdropColor] resolved backdrop behind the plate
 * @returns {number | null}
 */
export function apcaLcFromResolved(textColor, plateColor, backdropColor) {
    const txt = colorToRgb(textColor);
    const plate = colorToRgb(plateColor);
    if (!txt || !plate) return null;
    // The effective background = the plate composited over the backdrop (if given + the
    // plate is translucent). No backdrop → treat the plate's own (possibly < 1) alpha as
    // over an implicit white (the worst-case light backdrop the bright bucket faces).
    const backdrop = backdropColor ? colorToRgb(backdropColor) : { r: 255, g: 255, b: 255, alpha: 1 };
    if (!backdrop) return null;
    const effBg = compositeOver(plate, backdrop);
    // A translucent text colour composites over the effective background too (opaque = no-op).
    const effTxt = txt.alpha < 1 ? compositeOver(txt, effBg) : { r: txt.r, g: txt.g, b: txt.b };
    return apcaContrastLc(effTxt, effBg);
}

/**
 * Parse a resolved CSS colour (rgb/rgba/color(srgb) OR oklab/oklch) to an sRGB {r,g,b,alpha}
 * triple. The rgb/color(srgb) forms parse directly (parseResolvedColor); the oklab/oklch
 * forms (Chromium emits them for oklab()-authored tokens) are re-projected to sRGB through
 * the shared OKLab decompose's INVERSE is unavailable here — so an oklab-serialized colour is
 * resolved by the browser to a paint-equivalent sRGB in the LIVE probe (getComputedStyle over
 * a color-mix resolves to color(srgb …)); the pure device-free path receives the sRGB form
 * the readback already carries. If only an oklab()/oklch() string is available with no sRGB
 * projection, its L is mapped to a neutral-grey sRGB proxy (APCA reads luminance, and OKLab L
 * is a perceptual lightness — a faithful-enough proxy for the parallel witness). null when
 * unparseable.
 * @param {string} str
 * @returns {{r:number, g:number, b:number, alpha:number} | null}
 */
export function colorToRgb(str) {
    const rgb = parseResolvedColor(str);
    if (rgb) return rgb;
    const ok = parseOklabLike(str);
    if (!ok) return null;
    // OKLab L → sRGB grey proxy: sRGB gamma of the perceptual L (OKLab L is ~ the sRGB-linear
    // lightness after the OETF, so L^(1/2.2)-ish; a neutral proxy for the luminance witness).
    const g = Math.round(Math.max(0, Math.min(1, Math.pow(Math.max(0, ok.oklabL), 1 / 2.2))) * 255);
    return { r: g, g, b: g, alpha: ok.alpha };
}

/**
 * The APCA VERDICT — the parallel-witness twin of paintBand. Pass IFF |Lc| ≥ the size floor
 * (body ≥ 60, small-text ≥ 75). PURE over a signed Lc (so a gate's self-test exercises it
 * with synthetic Lc, no live page). This is a WITNESS ALONGSIDE the AA arm — never a
 * replacement; a consumer reads BOTH.
 * @param {number | null} lc the signed Lc (apcaContrastLc / apcaLcFromResolved output)
 * @param {{size?:"body"|"small", bodyFloor?:number, smallFloor?:number}} [opts]
 * @returns {{pass:boolean, lc:(number|null), absLc:(number|null), threshold:number, size:string, reasons:string[]}}
 */
export function apcaVerdict(lc, opts = {}) {
    const size = opts.size === "small" ? "small" : "body";
    const threshold = size === "small" ? (opts.smallFloor ?? APCA_LC_SMALL) : (opts.bodyFloor ?? APCA_LC_BODY);
    if (lc == null || !Number.isFinite(lc))
        return {
            pass: false,
            lc: lc == null ? null : lc,
            absLc: null,
            threshold,
            size,
            reasons: ["no Lc (degenerate read — a colour was unparseable or missing)"],
        };
    const absLc = Math.abs(lc);
    const reasons = [];
    if (!(absLc >= threshold))
        reasons.push(
            `APCA Lc ${absLc.toFixed(1)} < ${threshold} (${size}-text floor) — the composited plate is illegible under APCA (the SOTA glass metric mis-ranked as legible by WCAG-2 ratio-contrast)`,
        );
    return { pass: reasons.length === 0, lc, absLc, threshold, size, reasons };
}

/**
 * The LIVE APCA probe (BG.W-APCA-CONTRAST) — the parallel-witness twin of paintProbe. Reads
 * the FIRST `textSelector` match's resolved `color` + `background-color`, and (optionally)
 * the `plateSelector` / `backdropSelector` background-colors, then computes the composited
 * APCA Lc in Node (the math source is this leaf, the read is the browser). Runs LOCAL on a
 * real device. `plateSelector` defaults to the text node itself (its own background is the
 * plate); `backdropSelector` is what sits behind the plate. Returns {lc, ...resolved} | null.
 * @param {import("@playwright/test").Page} page a Playwright/dev-tools page
 * @param {string} route the app route to navigate (e.g. "/dock/overview")
 * @param {string} textSelector the text-node selector (its `color` is the ink)
 * @param {string} [plateSelector] the plate selector (its `background-color`; default the text node)
 * @param {string} [backdropSelector] the backdrop behind the plate
 * @returns {Promise<{lc:number, textColor:string, plateColor:string, backdropColor:(string|null)} | null>}
 */
export async function apcaProbe(page, route, textSelector, plateSelector, backdropSelector) {
    if (route) await page.goto(route, { waitUntil: "networkidle" });
    const read = await page.evaluate(
        ({ t, p, b }) => {
            const txtEl = document.querySelector(t);
            if (!(txtEl instanceof HTMLElement)) return null;
            const cs = getComputedStyle(txtEl);
            const plateEl = p ? document.querySelector(p) : txtEl;
            const bdEl = b ? document.querySelector(b) : null;
            return {
                textColor: cs.color,
                plateColor:
                    plateEl instanceof HTMLElement
                        ? getComputedStyle(plateEl).backgroundColor
                        : cs.backgroundColor,
                backdropColor: bdEl instanceof HTMLElement ? getComputedStyle(bdEl).backgroundColor : null,
            };
        },
        { t: textSelector, p: plateSelector ?? null, b: backdropSelector ?? null },
    );
    if (!read) return null;
    const lc = apcaLcFromResolved(read.textColor, read.plateColor, read.backdropColor ?? undefined);
    if (lc == null) return null;
    return { lc, ...read };
}
