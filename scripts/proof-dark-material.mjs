#!/usr/bin/env node
// BA.W-DARK-MATERIAL — proof:dark-material, the luminous-dark transmissive-material
// SOURCE gate (device-free; the comment-strip + pure-detector house pattern, mirroring
// proof-adaptive-glass.mjs / proof-dark-semantic-contrast.mjs).
//
// The dark register at HEAD is a charcoal slab on a dead void: a 4-L page↔card gap
// collapses the five glass rungs into a 0.003-luma band, the dark glass OCCLUDES its
// backdrop (no luminosity-lift companion), the W55 tint-seam washes the plate the WRONG
// direction in dark (toward light cream), the dark --primary is achromatic cream, the
// --surface-tint-* ramp has no dark arm, and the contrast-color() refinement INVERTS
// selection inside glass cards. This gate asserts the six dark-register mechanisms +
// the scope-7 calm-light recalibration are present in source; the BINDING painted truth
// is the π arm (tests-visual/dark-material.spec.ts), NEVER this gate alone (the A1-1/P-1
// source-green/visually-broken gap is exactly the AZ close-class failure BA exists to fix).
//
// BORN-RED at HEAD on the seven witnesses (W1 the 4-L collapse; W2 no saturate/brightness
// lift on the dark rungs; W3 the cream-wash wrong-direction self-engage with no dark arm;
// W4 the achromatic --primary; W5 no --surface-tint-* dark arm; W6 the contrast-color()
// active/muted inversion; W7 the unconditional 20% content-tier darken). The asserts
// below invert each.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — tokens.css/glass.css/typography.css became thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order so the dark-arm
// scan resolves post-carve.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dark-material";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS comments so a prose mention (a comment naming a token/value) is not a false hit
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// The carved cascade roots (post-AY.W-CSS1 + BA.W-CARVE2 carves).
const tokens = strip(readMonolith(ROOT, "tokens"));
const glass = strip(readMonolith(ROOT, "glass"));
// Raw partials for line-anchored / per-file asserts (the dark-arm floor + the light-dark()
// enhancement arm live in the carved tokens/ partials).
const darkArm = strip(read("src/styles/tokens/dark-arm.css"));
const lightDark = strip(read("src/styles/tokens/light-dark.css"));
const colorRadius = strip(read("src/styles/tokens/color-radius.css"));
const ladder = strip(read("src/styles/glass/ladder.css"));

// ── WCAG / chroma plumbing (hsl + oklch → rgb → luminance) ──────────────────────────

/** Parse `hsl(H S% L%)` (space-separated) → [h,s,l]. */
function parseHsl(str) {
    const m = str.trim().match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
/** Parse `oklch(L C H[ / α])` → [L,C,H]. */
function parseOklch(str) {
    const m = str
        .trim()
        .match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)$/i);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}
/** oklch → sRGB [0..255] (Ottosson's oklab → linear-sRGB matrices). */
function oklchToRgb(Lp, C, h) {
    const hr = (h * Math.PI) / 180;
    const a = C * Math.cos(hr);
    const b = C * Math.sin(hr);
    const l_ = Lp + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = Lp - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = Lp - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    const enc = (c) => {
        const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
        return Math.round(Math.min(1, Math.max(0, x)) * 255);
    };
    return [enc(r), enc(g), enc(bl)];
}
/** Any supported color string → rgb (hsl or oklch), else null. */
function colorToRgb(str) {
    if (!str) return null;
    const hsl = parseHsl(str);
    if (hsl) return hslToRgb(hsl[0], hsl[1], hsl[2]);
    const ok = parseOklch(str);
    if (ok) return oklchToRgb(ok[0], ok[1], ok[2]);
    return null;
}
function linearize(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function relLuminance([r, g, b]) {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrastRatio(a, b) {
    const lA = relLuminance(a);
    const lB = relLuminance(b);
    const hi = Math.max(lA, lB);
    const lo = Math.min(lA, lB);
    return (hi + 0.05) / (lo + 0.05);
}
/** Alpha-composite a translucent plate (opaque rgb + α) over an opaque base. */
function composite(plate, alpha, base) {
    return [0, 1, 2].map((i) => Math.round(plate[i] * alpha + base[i] * (1 - alpha)));
}

// ── token resolvers (the §2c lockstep pair) ──────────────────────────────────────────

/** The DARK half of a `light-dark(light, dark)` declaration — balance-scan the body. */
function darkArgFromLightDark(src, token) {
    const decl = src.match(new RegExp(`--${token}\\s*:\\s*(light-dark\\([^;]+);`));
    if (!decl) return null;
    const value = decl[1].trim();
    const open = value.indexOf("light-dark(");
    if (open === -1) return null;
    let depth = 0;
    let commaAt = -1;
    let end = -1;
    for (let i = open + "light-dark(".length - 1; i < value.length; i++) {
        const ch = value[i];
        if (ch === "(") depth++;
        else if (ch === ")") {
            depth--;
            if (depth === 0) {
                end = i;
                break;
            }
        } else if (ch === "," && depth === 1 && commaAt === -1) commaAt = i;
    }
    if (commaAt === -1 || end === -1) return null;
    return value.slice(commaAt + 1, end).trim();
}
/** A token's value from the `.dark {}` class fallback block. */
function darkClassValue(src, token) {
    const block = src.match(/\.dark\s*\{([\s\S]*?)\n\}/);
    if (!block) return null;
    const m = block[1].match(new RegExp(`--${token}\\s*:\\s*([^;]+?)\\s*;`));
    return m ? m[1].trim() : null;
}

// The five glass rung opacities (dark arm — the dark-arm.css block re-declares them).
function darkRungOpacity(rung) {
    const m = darkArm.match(new RegExp(`--glass-opacity-${rung}\\s*:\\s*([\\d.]+)\\s*;`));
    return m ? Number(m[1]) : null;
}

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });
const facts = {};

// ════════════════════════════════════════════════════════════════════════════════════
// W1 — the dark elevation ladder is WIDENED (lockstep, both arms; the composited band)
// ════════════════════════════════════════════════════════════════════════════════════
const pageClass = darkClassValue(darkArm, "neutral-0");
const cardClass = darkClassValue(darkArm, "card");
const pageLD = darkArgFromLightDark(lightDark, "neutral-0");
const cardLD = darkArgFromLightDark(lightDark, "card");
facts.darkPage = { class: pageClass, lightDark: pageLD };
facts.darkCard = { class: cardClass, lightDark: cardLD };

// Lockstep — the .dark floor and the light-dark() enhancement arm must agree (§2c).
add(
    "elevation-lockstep",
    pageClass && pageLD && cardClass && cardLD && pageClass === pageLD && cardClass === cardLD,
    `page/card agree across both arms (class page ${pageClass} / ld ${pageLD}; class card ${cardClass} / ld ${cardLD})`,
);

const pageRgb = colorToRgb(pageClass ?? "");
const cardRgb = colorToRgb(cardClass ?? "");
let pageLuma = null;
let cardLuma = null;
let pageCardRatio = null;
if (pageRgb && cardRgb) {
    pageLuma = relLuminance(pageRgb);
    cardLuma = relLuminance(cardRgb);
    pageCardRatio = contrastRatio(pageRgb, cardRgb);
}
facts.pageLuma = pageLuma;
facts.cardLuma = cardLuma;
facts.pageCardRatio = pageCardRatio ? Number(pageCardRatio.toFixed(3)) : null;
// The keystone: the page↔card gap must WIDEN past the HEAD 4-L collapse. The HEAD pair
// is page relL 0.0049 / card 0.0100 (ratio ≈ 1.10:1). The luminous-dark target lifts the
// card to ≥ 3.5× the page relL (a clearly distinct surface; the Material/macOS dark-
// elevation references run a card-over-page luminance ratio of ~2–5×, the eye is Weber-
// sensitive at low luminance so a 1.3–1.5:1 WCAG ratio reads as a real surface step). The
// HEAD card/page relL ratio is 0.0100/0.0049 ≈ 2.0×; the widen targets ≥ 3.5×.
const cardOverPage = pageLuma && cardLuma ? cardLuma / pageLuma : null;
facts.cardOverPageLumaRatio = cardOverPage ? Number(cardOverPage.toFixed(2)) : null;
add(
    "elevation-page-card-gap-widened",
    cardOverPage !== null && cardOverPage >= 3.5,
    `dark card relL / page relL = ${cardOverPage ? cardOverPage.toFixed(2) : "?"}× (≥ 3.5× — the widened distinct-surface step; HEAD was ≈ 2.0×)`,
);

// The composited five-rung band must span a perceptible range over the deepened page.
// Each rung is the card composited over the page at the rung opacity (--glass-level: 1).
// The HEAD band is wash 0.0067 → overlay 0.0100 (span ratio ≈ 1.06×). The widen targets a
// wash→overlay band span ≥ 1.8× (a real ladder; the live π measures the painted band incl.
// the dark tint-seam lift).
let bandSpan = null;
if (pageRgb && cardRgb) {
    const washA = darkRungOpacity("wash");
    const overlayA = darkRungOpacity("overlay");
    if (washA !== null && overlayA !== null) {
        const washBg = composite(cardRgb, washA, pageRgb);
        const overlayBg = composite(cardRgb, overlayA, pageRgb);
        const washL = relLuminance(washBg);
        const overlayL = relLuminance(overlayBg);
        bandSpan = overlayL / washL;
        facts.rungBand = {
            washLuma: Number(washL.toFixed(4)),
            overlayLuma: Number(overlayL.toFixed(4)),
            spanRatio: Number(bandSpan.toFixed(3)),
        };
    }
}
add(
    "elevation-rung-band-spans",
    bandSpan !== null && bandSpan >= 1.8,
    `the composited wash→overlay band span ratio = ${bandSpan ? bandSpan.toFixed(2) : "?"}× (≥ 1.8× — a perceptible substrate ladder before the tint-seam lift; HEAD ≈ 1.06×)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W2 — dark glass is TRANSMISSIVE (the luminosity-lift companion + the edge silhouette)
// ════════════════════════════════════════════════════════════════════════════════════
// The dark rung backdrop-filter carries a saturate/brightness LIFT so the backdrop GLOWS
// through (the iOS-dark "dark glass glows where light passes" model). The companion is a
// .dark re-declaration of the --glass-blur-* tokens (the radius primitive is UNTOUCHED —
// W-GLASS-CAL owns the radius dial-back; this is the saturate/brightness companion only).
// Detect a .dark block that lifts at least the resting + floating rungs' saturate.
const darkBlurResting = darkClassValue(darkArm, "glass-blur-resting");
const darkBlurFloating = darkClassValue(darkArm, "glass-blur-floating");
facts.darkBlurResting = darkBlurResting;
facts.darkBlurFloating = darkBlurFloating;
// Extract the saturate() multiplier from a blur token value.
const satOf = (v) => {
    const m = (v ?? "").match(/saturate\(\s*([\d.]+)\s*\)/);
    return m ? Number(m[1]) : null;
};
const britOf = (v) => {
    const m = (v ?? "").match(/brightness\(\s*([\d.]+)\s*\)/);
    return m ? Number(m[1]) : null;
};
// The dark rung must carry a LIFT above the light baseline (light resting saturate 1.05).
// A dark-transmissive lift is saturate ≥ 1.2 (the backdrop reads through with chroma) AND
// a brightness ≥ 1.0 companion present (the glow). The radius (blur()) stays untouched.
const darkRestingSat = satOf(darkBlurResting);
const darkFloatingSat = satOf(darkBlurFloating);
add(
    "transmissive-luminosity-lift",
    darkRestingSat !== null &&
        darkFloatingSat !== null &&
        darkRestingSat >= 1.2 &&
        darkFloatingSat >= 1.2 &&
        britOf(darkBlurResting) !== null,
    `the dark rung backdrop-filter carries a luminosity lift (resting saturate ${darkRestingSat ?? "?"} + brightness ${britOf(darkBlurResting) ?? "?"}, floating saturate ${darkFloatingSat ?? "?"} — the backdrop glows through; radius untouched)`,
);
// The dark edge/rim is calibrated UP as the silhouette device (the dark fill barely
// separates, so the edge carries it). HEAD --glass-edge-light-dark α 0.10 is below the
// reading threshold; the lift raises it (the dark edge is the PRIMARY silhouette device).
const darkEdge = (() => {
    // the dark arm re-points --glass-edge-light → --glass-edge-light-dark; the lifted alpha
    // lives on --glass-edge-light-dark in tokens/glass.css (part of the `tokens` monolith).
    const m = tokens.match(
        /--glass-edge-light-dark:\s*inset[^;]*?hsl\([^)]*\/\s*([\d.]+)\s*\)/,
    );
    return m ? Number(m[1]) : null;
})();
facts.darkEdgeAlpha = darkEdge;
add(
    "transmissive-edge-silhouette",
    darkEdge !== null && darkEdge >= 0.16,
    `--glass-edge-light-dark α = ${darkEdge ?? "?"} (≥ 0.16 — the dark edge lifted to be the primary silhouette device; HEAD α 0.10 below threshold)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W3 — the dark tint-seam arm LIFTS, no third fork (the SAME --glass-tint-* seam)
// ════════════════════════════════════════════════════════════════════════════════════
// In dark the self-engage seam must resolve a LIFT (a gentle, bounded luminous-dark lift)
// rather than the HEAD cream-wash wrong-direction at the full 20%. The mechanism rides the
// EXISTING tokens: a .dark arm of --glass-tint-strength-aa (the bounded AA strength) AND a
// .dark unconditional content-tier floor strength, reconciled into the SAME self-engage
// block. NO new --glass-tint-*-dark parallel family (the no-third-fork bite).
const darkTintStrengthAa = darkClassValue(darkArm, "glass-tint-strength-aa");
facts.darkTintStrengthAa = darkTintStrengthAa;
const darkTintAaVal = darkTintStrengthAa
    ? Number((darkTintStrengthAa.match(/([\d.]+)%/) ?? [])[1])
    : null;
// The dark tint-seam arm exists (a .dark re-declaration of the bounded strength), and it
// resolves a GENTLE bounded lift (> 0%, ≤ 14% — a luminous-dark lift, never the HEAD 20%
// over-wash that flattened the silhouette toward cream).
add(
    "dark-tint-seam-arm-lifts",
    darkTintAaVal !== null && darkTintAaVal > 0 && darkTintAaVal <= 14,
    `the .dark arm re-declares --glass-tint-strength-aa = ${darkTintStrengthAa ?? "(absent)"} (a gentle bounded luminous-dark lift > 0%, ≤ 14% — not the HEAD cream-wash 20%)`,
);
// NO third fork: no --glass-tint-*-dark parallel family was minted (the dark arm rides the
// SAME --glass-tint-ink / --glass-tint-strength-aa tokens, re-declared under .dark).
add(
    "dark-tint-no-third-fork",
    !/--glass-tint-(?:ink|strength|source)-dark\b/.test(tokens),
    "no --glass-tint-*-dark parallel family minted (the dark arm rides the SAME seam tokens, re-declared under .dark)",
);
// The in-srgb --surface-tint-* family is UNTOUCHED on the oklab axis (the AW.W26 fence).
add(
    "surface-tint-stays-srgb",
    !/--surface-tint-[a-z0-9-]+:[^;]*color-mix\(\s*in oklab/.test(colorRadius) &&
        !/--surface-tint-[a-z0-9-]+:[^;]*color-mix\(\s*in oklab/.test(darkArm),
    "the --surface-tint-* family stays in-srgb (the AW.W26 brand-identity fence — the dark arm mixes in srgb, never oklab)",
);

// ════════════════════════════════════════════════════════════════════════════════════
// W4 — dark --primary is CHROMATIC (a real brand chroma, lockstep, fg clears the floor)
// ════════════════════════════════════════════════════════════════════════════════════
const primaryClass = darkClassValue(darkArm, "primary");
const primaryLD = darkArgFromLightDark(lightDark, "primary");
const primaryFgClass = darkClassValue(darkArm, "primary-foreground");
facts.darkPrimary = { class: primaryClass, lightDark: primaryLD };
facts.darkPrimaryFg = primaryFgClass;
add(
    "primary-chroma-lockstep",
    primaryClass && primaryLD && primaryClass === primaryLD,
    `dark --primary agrees across both arms (class ${primaryClass} / ld ${primaryLD})`,
);
// The chroma must be NON-achromatic (HEAD hsl(48 10% 90%) ≈ 0 chroma — a washed cream).
// Measure chroma: for oklch read C directly; for hsl convert and read the oklab a/b
// magnitude. Floor the chroma above an achromatic threshold.
let primaryChroma = null;
const primaryRgb = colorToRgb(primaryClass ?? "");
{
    const ok = parseOklch(primaryClass ?? "");
    if (ok) primaryChroma = ok[1];
    else {
        const hsl = parseHsl(primaryClass ?? "");
        // hsl saturation is NOT perceptual chroma; a washed hsl(48 10% 90%) has s=10 but
        // near-zero perceptual chroma. Approximate the oklab chroma from the rgb.
        if (hsl && primaryRgb) {
            // crude oklab a/b magnitude from rgb (the gate's chroma floor is coarse).
            const [r, g, b] = primaryRgb.map((c) => c / 255);
            const lin2 = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
            const [lr, lg, lb] = [lin2(r), lin2(g), lin2(b)];
            const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
            const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
            const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
            const oa = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
            const ob = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
            primaryChroma = Math.hypot(oa, ob);
        }
    }
}
facts.darkPrimaryChroma = primaryChroma ? Number(primaryChroma.toFixed(4)) : null;
// Achromatic floor: HEAD hsl(48 10% 90%) measures oklab chroma ≈ 0.012. A deliberate brand
// chroma sits ≥ 0.08 (the legendre-violet / section ramp register).
add(
    "primary-is-chromatic",
    primaryChroma !== null && primaryChroma >= 0.08,
    `dark --primary oklab chroma = ${primaryChroma ? primaryChroma.toFixed(3) : "?"} (≥ 0.08 — a deliberate brand chroma, not the HEAD achromatic cream ≈ 0.012)`,
);
// --primary-foreground clears its filled-state contrast floor over the new chromatic accent.
let pfRatio = null;
const pfRgb = colorToRgb(primaryFgClass ?? "");
if (pfRgb && primaryRgb) pfRatio = contrastRatio(pfRgb, primaryRgb);
facts.primaryFgOverPrimary = pfRatio ? Number(pfRatio.toFixed(2)) : null;
add(
    "primary-fg-clears-floor",
    pfRatio !== null && pfRatio >= 4.5,
    `--primary-foreground over the chromatic --primary = ${pfRatio ? pfRatio.toFixed(2) : "?"}:1 (≥ 4.5:1 text floor — the filled control's label/graphic reads)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W5 — the --surface-tint-* dark arm exists (mixes toward a LIGHT ink, reads on the floor)
// ════════════════════════════════════════════════════════════════════════════════════
// A .dark re-declaration of the --surface-tint-* family mixes toward a LIGHT ink (the
// inverse of light's dark-ink tint) so a chip/hairline reads against the near-black card.
// Detect the .dark block carrying the family + a light-ink mix source (NOT --foreground,
// which in dark IS the light ink — but the source must be an explicit light tint anchor;
// allow --surface-tint-ink or a white/light hsl).
// Capture the tint SOURCE color (an hsl(...)/oklch(...)/var(...) — balance the inner parens),
// then the rung percentage. The naive `[^,]+?\s+\d` stops inside `hsl(48 12% 96%)`.
// BB.W-DARK-INK-WARM re-expressed the dark tint INK as a relative-color recipe
// `oklch(from var(--foreground) 0.975 c h)` (the foreground-derived light ink, the
// css-relative-color chronic's first live consumer). The nested `var(...)` paren
// + the from-syntax's multiple tokens break the naive `oklch\([^)]*\)` capture
// (it truncates at the inner `var(...)` `)`), so the relative-color form is the
// FIRST alternative — captured whole, then resolved through the `var(--foreground)`
// fallback below (the recipe IS the foreground at a lifted L, so the foreground is
// the correct lifting-ink proxy for the source-arm lift check; the π reads the
// exact browser-resolved oklch).
const darkSurfaceTintBlock = darkArm.match(
    /--surface-tint-4\s*:\s*color-mix\(\s*in srgb,\s*(oklch\(from\s+var\([^)]*\)[^)]*\)|(?:hsl|oklch|rgb)\([^)]*\)|var\([^)]*\))\s+[\d.]+%/,
);
const darkSurfaceTintSource = darkSurfaceTintBlock ? darkSurfaceTintBlock[1].trim() : null;
facts.darkSurfaceTintSource = darkSurfaceTintSource;
// The dark arm must re-declare the family (at least the canonical rungs 4/8/15) AND the
// tint source must be a LIGHT ink that lifts off the dark card (a measurable lift).
const darkSurfaceTintPresent =
    /--surface-tint-4\s*:/.test(darkArm) &&
    /--surface-tint-8\s*:/.test(darkArm) &&
    /--surface-tint-15\s*:/.test(darkArm);
add(
    "surface-tint-dark-arm-present",
    darkSurfaceTintPresent,
    `the .dark arm re-declares the --surface-tint-* family (rungs 4/8/15 present: ${darkSurfaceTintPresent}; source ${darkSurfaceTintSource ?? "?"})`,
);
// The dark tint must LIFT off the card (the source ink composited at a representative rung
// reads ABOVE the dark card luminance — a visible hairline, not the light-ink collapse).
let surfaceTintLifts = false;
let tintSwatchLuma = null;
if (darkSurfaceTintSource && cardRgb) {
    // resolve the source (a token alias → assume the warm-off-white --foreground-class, or
    // a literal). The gate resolves a literal hsl/oklch; a var() source is resolved to the
    // dark --foreground (the light cream) as the lifting ink.
    let srcRgb = colorToRgb(darkSurfaceTintSource);
    if (!srcRgb && /var\(--foreground\)/.test(darkSurfaceTintSource)) {
        srcRgb = colorToRgb(darkClassValue(darkArm, "foreground") ?? "");
    }
    if (!srcRgb && /var\(/.test(darkSurfaceTintSource)) {
        // an explicit light-ink alias — resolve to the dark --foreground cream as the floor.
        srcRgb = colorToRgb(darkClassValue(darkArm, "foreground") ?? "");
    }
    if (srcRgb) {
        // a surface-tint-15 chip composited over the dark card.
        const swatch = composite(srcRgb, 0.15, cardRgb);
        tintSwatchLuma = relLuminance(swatch);
        surfaceTintLifts = tintSwatchLuma > cardLuma * 1.4;
    }
}
facts.surfaceTintSwatchLuma = tintSwatchLuma ? Number(tintSwatchLuma.toFixed(4)) : null;
add(
    "surface-tint-dark-lifts-off-card",
    surfaceTintLifts,
    `a --surface-tint-15 chip composited over the dark card reads relL ${tintSwatchLuma ? tintSwatchLuma.toFixed(4) : "?"} vs card ${cardLuma ? cardLuma.toFixed(4) : "?"} (lifts ≥ 1.4× — a visible hairline, not the light-ink collapse)`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W6 — the contrast-color() selection inversion is FIXED (active ≥ inactive, lockstep)
// ════════════════════════════════════════════════════════════════════════════════════
// At HEAD the @supports self-engage block lifts --muted-foreground to contrast-color(--card)
// (white, L100) but the ACTIVE control register (the SegmentedTabs active tab, the curve-
// picker selected label) reads var(--foreground) DIRECTLY (L90, un-lifted) — so selected is
// DIMMER than unselected (the inversion). `color: contrast-color()` on the surface does NOT
// reach the active register (the active control sets its OWN `color: var(--foreground)`,
// which wins over the inherited surface `color`). The fix is at the LIBRARY seam: either
// (A) lift --foreground itself in lockstep with --muted-foreground (so a consumer reading
// --foreground for its active state matches the lifted inactive), OR (B) narrow/remove the
// muted→white lift off the self-engaged selection surfaces. Detect the FULL @supports body
// via a balanced-brace scan (the naive `[\s\S]*?\}` stops at the first inner block close).

/** Capture a balanced `{...}` body following the FIRST occurrence of `head` in `src`. */
function balancedBody(src, headRe) {
    const m = src.match(headRe);
    if (!m) return "";
    let i = src.indexOf("{", m.index);
    if (i === -1) return "";
    let depth = 0;
    const start = i;
    for (; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") {
            depth--;
            if (depth === 0) return src.slice(start + 1, i);
        }
    }
    return src.slice(start + 1);
}
const supportsBlock = balancedBody(
    ladder,
    /@supports\s*\(\s*color:\s*contrast-color\([^)]*\)\s*\)/,
);
// The LOCKSTEP invariant (approach A): across the WHOLE @supports body, EVERY block that
// re-points --muted-foreground to contrast-color() MUST ALSO re-point --foreground to
// contrast-color() — so an ACTIVE register reading var(--foreground) resolves the SAME
// anchored ink as the lifted inactive (selected ≥ unselected). Count the two re-point sites:
// the lockstep holds iff #foreground-lifts ≥ #muted-lifts (no muted lift is left un-paired).
// At HEAD: 1 muted lift, 0 foreground lift → un-paired → the inversion → RED.
const mutedLiftCount = (supportsBlock.match(/--muted-foreground:\s*contrast-color\(/g) ?? [])
    .length;
const fgLiftCount = (supportsBlock.match(/--foreground:\s*contrast-color\(/g) ?? []).length;
facts.contrastColorMutedLiftCount = mutedLiftCount;
facts.contrastColorForegroundLiftCount = fgLiftCount;
add(
    "contrast-color-active-lockstep",
    mutedLiftCount === 0 || fgLiftCount >= mutedLiftCount,
    `every --muted-foreground→contrast-color lift is paired with a --foreground→contrast-color lift (${fgLiftCount} fg-lifts ≥ ${mutedLiftCount} muted-lifts — the active register matches the lifted inactive, selected ≥ unselected; the inversion gone)`,
);
// The fix is at the LIBRARY seam (ladder.css), not a demo-local curve-picker patch.
add(
    "contrast-color-fix-at-library-seam",
    /@supports\s*\(\s*color:\s*contrast-color/.test(ladder),
    "the contrast-color() lockstep fix is at the library ladder.css seam (holds for ANY --muted-foreground/--foreground selection pairing inside a glass card, not a curve-picker one-off)",
);

// ════════════════════════════════════════════════════════════════════════════════════
// W7 — the calm-light self-engage is RECALIBRATED (R9-1; the conditional structure)
// ════════════════════════════════════════════════════════════════════════════════════
// The content-tier self-engage no longer applies the FULL AA darken unconditionally: the
// FULL strength is gated on the declared/sampled bright signal with a sub-perceptual
// unconditional floor (--glass-tint-strength-floor), and the --muted-foreground lift fires
// ONLY where the plate actually darkens. Detect: (1) a sub-perceptual floor token minted;
// (2) the unconditional content-tier self-engage reads the FLOOR (not the AA strength);
// (3) the bright-bucket block reads the AA strength (the conditional full darken survives);
// (4) the muted lift moved off the unconditional floor into the bright-bucket condition.
const floorTokenMatch = tokens.match(/--glass-tint-strength-floor:\s*([\d.]+)%/);
const floorVal = floorTokenMatch ? Number(floorTokenMatch[1]) : null;
facts.tintStrengthFloor = floorVal;
add(
    "calm-light-floor-token-minted",
    floorVal !== null && floorVal > 0 && floorVal <= 10,
    `--glass-tint-strength-floor = ${floorVal ?? "(absent)"}% (a sub-perceptual unconditional silhouette floor > 0%, ≤ 10% — the calm-light plate stays warm, not gray)`,
);
// The UNCONDITIONAL content-tier self-engage reads the FLOOR (not the full AA strength).
const contentSelfEngage = ladder.match(
    /:where\(\s*\.glass-card,\s*\.glass-resting,\s*\.glass-quiet,\s*\.glass-wash\s*\)\s*\{([\s\S]*?)\}/,
);
facts.contentSelfEngageBlock = contentSelfEngage
    ? contentSelfEngage[1].replace(/\s+/g, " ").trim()
    : null;
add(
    "content-tiers-self-engage-floor",
    contentSelfEngage
        ? /--glass-tint-strength:\s*var\(--glass-tint-strength-floor\)/.test(contentSelfEngage[1])
        : false,
    "the UNCONDITIONAL content-tier self-engage reads --glass-tint-strength-floor (the sub-perceptual silhouette, NOT the full AA darken — the slides gray-slab fixed)",
);
// The bright-bucket / overlay band STILL drives the full AA strength (the G2 floor survives).
add(
    "bright-bucket-full-aa-survives",
    /@container\s+style\(\s*--glass-backdrop:\s*light\s*\)\s*\{[\s\S]*?--glass-tint-strength:\s*var\(--glass-tint-strength-aa\)/.test(
        ladder,
    ),
    "the bright-bucket @container block STILL drives the full --glass-tint-strength-aa darken (the busy-bright G2 AA floor survives)",
);
// The --muted-foreground lift fires ONLY under the bright bucket (where the plate darkens),
// NOT on the unconditional calm-light content-tier floor.
add(
    "muted-lift-conditionalized",
    contentSelfEngage
        ? !/--muted-foreground:\s*var\(--foreground\)/.test(contentSelfEngage[1])
        : false,
    "the --muted-foreground → --foreground lift NO LONGER fires on the unconditional content-tier floor (it moves into the bright-bucket condition where the plate actually darkens — the calm-light caption keeps the muted register)",
);

// ── The π readback spec is wired (the BINDING close) ────────────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/dark-material.spec.ts")),
    "tests-visual/dark-material.spec.ts exists (the π DARK readback — rung-ΔL band + tier-over-aurora + selected>unselected; the BINDING truth)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:dark-material — the luminous-dark transmissive material (BA.W-DARK-MATERIAL)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_DARK_MATERIAL_OUT", "BA-dark-material");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:dark-material",
    command: COMMAND,
    note: "SOURCE arm only — the painted DARK luminance ladder + tier-over-aurora + selected>unselected truth is proven by tests-visual/dark-material.spec.ts (the π arm), never this gate alone (the BA P-1 close-class fix).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:dark-material] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:dark-material] the dark register is a luminous transmissive material — the elevation ladder widened, the glass glows its backdrop through, the tint-seam lifts, --primary carries chroma, the surface-tint reads on the deep floor, selection is not inverted, and the calm-light read stays glass. The π arm proves the painted DARK truth.",
);
