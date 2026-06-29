#!/usr/bin/env node
// BC.W-GLASS-LEGIBILITY-MEASURED — the BIDIRECTIONAL legibility-AND-glassiness gate
// (more glass AND more legible at once; the iOS-27 dynamic-range shift, MEASURED). The
// SOURCE/MECHANISM arm of proof:glass-legibility (device-free over computable composited
// fixtures; the PAINT arm is the bc-gestalt-roster glass-adaptive/dock/shell pixel-read
// over a live :5199 capture the orchestrator owns + the π readback tests-visual/glass-
// legibility.spec.ts). Per-mechanism greens alone do NOT close the visual wave — the
// captured DELTA is the binding truth (BC anti-disease law).
//
// THE DISEASE-ROOT (postmortem/az.md §2): proof:adaptive-glass-live is MONOTONIC — it
// asserts only `contrastRatio >= 4.5` + `deltaL >= 0.08`, BOTH monotonic in the darken
// direction. A grey slab over white scores BETTER on every metric than the correct warm-
// cream plate (darkening RAISES contrast + ENLARGES the silhouette ΔL). ZERO upper bound,
// ZERO "is the glass still glassy while legible?" measure. The gate certified the
// regression as the feature.
//
// THE FIX (this gate): the BIDIRECTIONAL contrast-AND-glassiness bound the monotonic gate
// never had. Over the realistic composited plate (the rung bg over the page through the
// driven strength) a surface must clear 4.5:1 (legible) WHILE staying translucent (glassy,
// α below the iOS clamp) AND warm (chroma > 0) — SIMULTANEOUSLY. A grey opaque slab fails
// the α/chroma bound; a too-thin invisible plate fails the contrast bound; only the iOS
// dynamic-range-shift (the driven tint + the right ink register) passes BOTH.
//
// ONE colour-math source for OKLab: the SHARED paint-arm.mjs leaf (statsFromResolvedBg →
// reflect-capture-verify's oklabFromRgb) — the SAME decompose the device-free source gate
// and the live π arm read (the canvas-unify single-source fence). The WCAG contrast +
// alpha-composite is standard sRGB math (NOT OKLab — not a duplicate of the fenced
// decompose); it is the same relative-luminance the live spec computes, kept local + minimal.
//
// The clauses (each born-RED on the monotonic-blind-spot / the HEAD source state, each
// self-tested):
//   L1 — the SIMULTANEITY bound. Over a calm-light backdrop a content/button rung clears
//        4.5:1 AND α < 0.72 AND oklab-chroma > 0. Born-RED on the grey slab (chroma fail)
//        AND a synthetic α-0.95 near-opaque plate (glassy fail). The bound the monotonic
//        gate never had.
//   L2 — the bright bucket clears 4.5:1 WHILE α < the rung's iOS clamp (the ≤24%-AA darken
//        stays translucent — "let content through"). A darken that pushes α to the clamp to
//        win contrast reds (the slab-to-win escape closed).
//   L3 — the button glass-morphism lifted + measured. `--glass-blur-btn` resolves blur ≥
//        10px AND saturate ≥ 1.18 (the floating-tier "more glass"); born-RED on the 8px/1.05
//        HEAD. The lifted button still clears L1's contrast bound (more glass did not cost
//        legibility).
//   L4 — the deep-tier budget call recorded. `--glass-blur-deep-radius` is ≥ 18px (budget
//        cleared) OR 16px WITH a recorded budget booking; the deep saturate ≤ the 1.8
//        apple.com-nav ceiling. A silent stay-at-16-with-no-booking reds.
//   L5 — the specular gleam opacity in [0.2, 0.5] (the SOTA band W-LIQUIDHOVER rides).
//   L6 — the OVERLAY plate is ON the measured-AA roster (the fourier-M Tier-1 #1 fold's OWN
//        measure-half mechanism — born-RED on the roster's overlay absence). The overlay
//        (floating/overlay) rung clears the bidirectional bar both modes; a roster that
//        SKIPS the overlay rung reds (the overlay-not-on-the-roster evasion).
//   L7 — the per-rung `--glass-saturate-{tier}` keystone knob minted + READ-THROUGH (the
//        speedtest-AX BC-W10 fold's OWN mechanism — born-RED on the HEAD baked literal). The
//        composed `--glass-blur-{tier}` reads saturate(var(--glass-saturate-{tier})); a token
//        minted but unread (the mint-without-read no-op) reds; a per-rung saturate exceeding
//        the deep 1.8 ceiling reds.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { statsFromResolvedBg } from "./lib/paint-arm.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}
function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ── WCAG contrast + alpha-composite (standard sRGB; NOT the fenced OKLab decompose) ───────
//   The SAME relative-luminance the live π arm computes — kept local + minimal so the source
//   gate composites + measures a `color(srgb r g b / a)` fixture with no live page.
function parseSrgb(str) {
    const m = (str ?? "").match(
        /color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i,
    );
    if (!m) return null;
    return {
        r: Math.round(Number(m[1]) * 255),
        g: Math.round(Number(m[2]) * 255),
        b: Math.round(Number(m[3]) * 255),
        alpha: m[4] == null ? 1 : Number(m[4]),
    };
}
/** Composite a `color(srgb r g b / a)` over an opaque sRGB base → an opaque [r,g,b]. */
function composite(overStr, base) {
    const o = parseSrgb(overStr);
    if (!o) return null;
    const a = o.alpha;
    return [
        Math.round(o.r * a + base[0] * (1 - a)),
        Math.round(o.g * a + base[1] * (1 - a)),
        Math.round(o.b * a + base[2] * (1 - a)),
    ];
}
function linearize(c) {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function relLuminance([r, g, b]) {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrastRatio(a, b) {
    const lA = relLuminance(a);
    const lB = relLuminance(b);
    return (Math.max(lA, lB) + 0.05) / (Math.min(lA, lB) + 0.05);
}

// ── The compositing backdrops + the AA body floor ─────────────────────────────────────────
const CALM_PAGE = [251, 249, 245]; // --neutral-0 warm-cream page (the calm-light backdrop)
const BRIGHT_BACKDROP = [255, 255, 255]; // the bright worst-case (synthetic white)
const BUSY_BACKDROP = [150, 140, 120]; // a mid-luminance busy aurora (the thin-plate biting field)
const AA_BODY = 4.5;
// the warm-cream CALM L-window (the warm-cream identity; the grey slab at L 0.695 reds it).
// On the calm floor the surface is light (warm-cream, NOT darkened) — the same window the
// glass-identity bidirectional band carries. The BRIGHT bucket intentionally darkens (the
// driven dynamic-range shift lowers L), so the L-window is a CALM-only bound.
const CALM_L_WINDOW = [0.85, 0.99];

// ── The BIDIRECTIONAL measured-AA ROSTER ──────────────────────────────────────────────────
//   Each rung carries: the resolved `--glass-bg-{tier}` over the page (the CALM composite,
//   floor-tinted) + the BRIGHT composite (the AA-driven darken over white), the body-register
//   ink, and the rung-appropriate alpha bounds. The content/button rungs (resting 0.65, quiet
//   0.50) hold the calm α < 0.72 simultaneity bound; the OVERLAY band (the dropdown/menu/
//   Select-content plate — the `floating` 0.80 tier) holds the iOS "let content through"
//   clamp α < 0.86 (L6 — the modal-heavy register is glassier than near-opaque but heavier
//   than a content card). All clear 4.5:1 + chroma > 0, both backdrops.
//   The body ink: content rungs read --on-glass-muted (the muted caption tier over the cream
//   plate); the bright bucket lifts it to --foreground (the self-engage). Resolved as srgb.
const ON_GLASS_MUTED = "color(srgb 0.439 0.349 0.259)"; // --on-glass-muted hsl(30 26% 35%)
const FOREGROUND = "color(srgb 0.110 0.098 0.090)"; // --foreground hsl(24 10% 10%)

const ROSTER = [
    {
        rung: "resting",
        kind: "content",
        // calm: --card 0.65 + 4% floor tint, over the warm page → warm-cream translucent.
        calmBg: "color(srgb 0.984 0.976 0.961 / 0.65)",
        calmInk: ON_GLASS_MUTED,
        calmAlphaCeil: 0.72,
        // bright: 20%-tinted card 0.65 over white → driven-darken, ink lifted to --foreground.
        brightBg: "color(srgb 0.808 0.796 0.784 / 0.65)",
        brightInk: FOREGROUND,
        brightAlphaCeil: 0.86,
    },
    {
        rung: "quiet",
        kind: "content",
        calmBg: "color(srgb 0.984 0.976 0.961 / 0.50)",
        calmInk: ON_GLASS_MUTED,
        calmAlphaCeil: 0.72,
        brightBg: "color(srgb 0.808 0.796 0.784 / 0.50)",
        brightInk: FOREGROUND,
        brightAlphaCeil: 0.86,
    },
    {
        rung: "button",
        kind: "button", // the glass Button — the quiet-opacity capsule, lifted blur (L3).
        calmBg: "color(srgb 0.984 0.976 0.961 / 0.50)",
        calmInk: FOREGROUND, // the button LABEL is the full ink.
        calmAlphaCeil: 0.72,
        brightBg: "color(srgb 0.808 0.796 0.784 / 0.50)",
        brightInk: FOREGROUND,
        brightAlphaCeil: 0.86,
    },
    {
        rung: "overlay",
        kind: "overlay", // L6 — the dropdown/menu/Select-content plate (the floating 0.80 tier).
        calmBg: "color(srgb 0.957 0.945 0.933 / 0.80)",
        calmInk: ON_GLASS_MUTED,
        calmAlphaCeil: 0.86, // the iOS clamp: glassier than near-opaque, heavier than a card.
        brightBg: "color(srgb 0.847 0.835 0.827 / 0.80)",
        brightInk: FOREGROUND,
        brightAlphaCeil: 0.86,
    },
];

// ── The disease-root FIXTURES (each MUST RED) ─────────────────────────────────────────────
//   The historical grey slab as resolved srgb (oklab(0.695 0.002 0.006) → near-neutral grey);
//   a synthetic near-opaque plate (α 0.95 to win contrast — the glassy bound bites); a
//   synthetic invisible-thin plate (α 0.05 — the contrast bound bites, the both-directions).
const GREY_SLAB = "color(srgb 0.625 0.613 0.599 / 0.536)";
const NEAR_OPAQUE = "color(srgb 0.984 0.976 0.961 / 0.95)";
const THIN_PLATE = "color(srgb 0.984 0.976 0.961 / 0.05)";

/**
 * The bidirectional verdict for ONE composited surface: pass IFF it clears 4.5:1 (legible)
 * WHILE staying glassy (α < alphaCeil) AND warm (chroma > 0). The asymmetry is the
 * disease-root fix: contrast is a FLOOR, alpha is a CEILING, chroma is a FLOOR — a grey
 * opaque slab fails alpha+chroma even as it wins contrast (the monotonic blind spot).
 */
function bidirectionalVerdict(bgStr, inkStr, backdrop, alphaCeil, lWindow = null) {
    const reasons = [];
    const stats = statsFromResolvedBg(bgStr); // {oklabL, chroma, alpha}
    const effBg = composite(bgStr, backdrop);
    const ink = composite(inkStr, effBg ?? backdrop); // ink is near-opaque; composite is ~itself
    if (!stats || !effBg || !ink) {
        return { pass: false, reasons: ["degenerate composite (unparseable fixture)"], ratio: null, alpha: null, chroma: null };
    }
    const ratio = contrastRatio(ink, effBg);
    if (!(ratio >= AA_BODY)) reasons.push(`contrast ${ratio.toFixed(2)}:1 < ${AA_BODY} (illegible — the bound the thin plate fails)`);
    if (!(stats.alpha < alphaCeil)) reasons.push(`α ${stats.alpha.toFixed(3)} ≥ ${alphaCeil} (too opaque — lost the glass; the bound the slab fails)`);
    if (!(stats.chroma > 0)) reasons.push(`chroma ${stats.chroma.toFixed(4)} ≤ 0 (greyed to neutral — the bound the grey slab fails)`);
    // the CALM warm-cream L-window (NOT applied to the bright bucket — the driven darken
    // legitimately lowers L). The grey slab at L 0.695 reds this on the calm floor.
    if (lWindow && !(stats.oklabL >= lWindow[0] && stats.oklabL <= lWindow[1])) {
        reasons.push(`oklabL ${stats.oklabL.toFixed(3)} not in [${lWindow[0]}, ${lWindow[1]}] (too dark/greyed on the calm floor — the bound the grey slab fails)`);
    }
    return { pass: reasons.length === 0, reasons, oklabL: Number(stats.oklabL.toFixed(3)), ratio: Number(ratio.toFixed(2)), alpha: stats.alpha, chroma: Number(stats.chroma.toFixed(4)) };
}

// ── L1/L2/L6 — the roster clears the bidirectional bar both backdrops ─────────────────────
export function detectRoster({ roster } = {}) {
    const violations = [];
    const facts = { calm: {}, bright: {} };
    const set = roster ?? ROSTER;
    // L6 self-bite: the OVERLAY rung MUST be on the roster (the fold's own clause).
    if (!set.some((r) => r.kind === "overlay")) {
        violations.push("L6: the OVERLAY plate (the dropdown/menu/Select-content rung) is NOT on the measured-AA roster — the fourier-M Tier-1 #1 fold owes a clause NAMING the overlay surface (a content/button-only roster is the overlay-not-on-the-roster evasion)");
    }
    for (const r of set) {
        // L1 (content/button) / L6(a) (overlay) — the CALM simultaneity bound (with the
        // warm-cream L-window: the calm plate is light + warm + translucent, NOT a darkened slab).
        const calm = bidirectionalVerdict(r.calmBg, r.calmInk, CALM_PAGE, r.calmAlphaCeil, CALM_L_WINDOW);
        facts.calm[r.rung] = { ratio: calm.ratio, alpha: calm.alpha, chroma: calm.chroma, pass: calm.pass };
        if (!calm.pass) {
            const clause = r.kind === "overlay" ? "L6(a)" : "L1";
            violations.push(`${clause}: the ${r.rung} (${r.kind}) rung FAILED the calm-light simultaneity bound — ${calm.reasons.join("; ")} (more glass AND more legible at once must hold on the warm-cream floor)`);
        }
        // L2 (content/button) / L6(b) (overlay) — the BRIGHT bucket clears 4.5:1 while glassy.
        const bright = bidirectionalVerdict(r.brightBg, r.brightInk, BRIGHT_BACKDROP, r.brightAlphaCeil);
        facts.bright[r.rung] = { ratio: bright.ratio, alpha: bright.alpha, chroma: bright.chroma, pass: bright.pass };
        if (!bright.pass) {
            const clause = r.kind === "overlay" ? "L6(b)" : "L2";
            violations.push(`${clause}: the ${r.rung} (${r.kind}) rung FAILED the bright-bucket bound — ${bright.reasons.join("; ")} (the driven darken must clear 4.5:1 WHILE α < ${r.brightAlphaCeil} — the iOS 'let content through' clamp, never a slab-to-win)`);
        }
    }
    return { facts, violations };
}

// ── The disease-root bites: the grey slab / near-opaque / thin plate MUST RED ─────────────
export function detectDiseaseRoot() {
    const violations = [];
    const facts = {};
    // (i) the grey opaque slab MUST fail — the monotonic blind spot closed. The AZ grey slab
    //     (L 0.695, greyed) is tested over the CALM floor with the warm-cream L-window: it
    //     reds the L-window (too dark/greyed) the monotonic gate scored GREEN.
    const grey = bidirectionalVerdict(GREY_SLAB, FOREGROUND, CALM_PAGE, 0.72, CALM_L_WINDOW);
    facts.greySlab = { fixture: GREY_SLAB, oklabL: grey.oklabL, pass: grey.pass, reasons: grey.reasons };
    if (grey.pass) violations.push(`disease-root: the historical grey slab ${GREY_SLAB} PASSED the bidirectional bound — the monotonic blind spot is NOT closed (a grey slab at L 0.695 must fail the warm-cream L-window it scored GREEN on the monotonic gate)`);
    // (ii) a synthetic near-opaque plate MUST fail (the slab-to-win-contrast escape). Tested
    //     over the BRIGHT bucket where a darken-to-opaque would win contrast — the α ceiling reds it.
    const opaque = bidirectionalVerdict(NEAR_OPAQUE, FOREGROUND, BRIGHT_BACKDROP, 0.86);
    facts.nearOpaque = { fixture: NEAR_OPAQUE, alpha: opaque.alpha, pass: opaque.pass, reasons: opaque.reasons };
    if (opaque.pass) violations.push(`disease-root: the near-opaque plate ${NEAR_OPAQUE} PASSED — a darken-to-opaque-to-win-contrast escapes the bound (the α ceiling must red it; the slab-to-win escape closed)`);
    // (iii) a synthetic invisible-thin plate MUST fail the contrast floor (the both-directions
    //     bound). Tested over the BUSY mid-tone backdrop with the calm muted ink: the α-0.05
    //     plate can't establish the cream surface the muted caption is calibrated against, so
    //     the body register drops below 4.5:1 (the contrast FLOOR, not only the α ceiling).
    const thin = bidirectionalVerdict(THIN_PLATE, ON_GLASS_MUTED, BUSY_BACKDROP, 0.72);
    facts.thinPlate = { fixture: THIN_PLATE, ratio: thin.ratio, pass: thin.pass, reasons: thin.reasons };
    if (thin.pass) violations.push(`disease-root: the invisible-thin plate ${THIN_PLATE} PASSED — a too-thin plate must fail the contrast FLOOR over a busy backdrop (the bound is bidirectional, not only an upper α ceiling)`);
    return { facts, violations };
}

// ── L3 — the button glass-morphism is the UNIFIED RESTING PEER ──────────────────────────────
// BG.W-GLASS-BLUR-PEER demoted the glass button OFF the floating-tier "more glass" register
// onto the ONE unified 8px material: `--glass-blur-btn` is now an ALIAS of
// `--glass-blur-resting`, so the calm glass button reads the SAME radius leg the dock, the
// default-Card, and the menu-row read (the resolved-radius peer lock, proof:glass-cal). L3
// is ALIAS-FOLLOWING + asserts the button reads a CALM CONTENT-TIER peer (resting/quiet,
// 8-10px band) — REAL glass, NOT the sub-perceptual wash 1px tile AND NOT a per-button
// divergent floating/deep slab. The MORE-glass register now lives on the HERO deep tier only
// (`.btn-glass.glass-deep` → `--glass-blur-deep`, measured by L4 / proof:glass-depth). The
// button still CONCENTRATES light (saturate ≥ 1.18 — resting's 1.4 clears it).
function followBlurAlias(glass, value, depth = 0) {
    if (depth > 4) return value;
    const alias = value.match(/^var\(\s*--(glass-blur-[a-z]+)\s*\)$/);
    if (!alias) return value;
    const m = glass.match(new RegExp(`--${alias[1]}:\\s*([^;]+);`));
    return m ? followBlurAlias(glass, m[1].trim(), depth + 1) : value;
}

export function detectButtonGlass({ glassOverride } = {}) {
    const violations = [];
    const facts = {};
    const glass = stripCss(glassOverride ?? readFile("src/styles/tokens/glass.css"));
    const m = glass.match(/--glass-blur-btn:\s*([^;]+);/);
    const rawValue = m ? m[1].trim() : null;
    facts.btn = rawValue;
    if (!rawValue) {
        violations.push("L3: --glass-blur-btn not found in tokens/glass.css");
        return { facts, violations };
    }
    // ALIAS-FOLLOW the btn token to its resolved composite (`--glass-blur-btn` →
    // `--glass-blur-resting`), then read the radius tier + saturate off the composite.
    const value = followBlurAlias(glass, rawValue);
    facts.btnResolved = value;
    // the blur radius the btn composes (it reads --glass-blur-{tier}-radius × --glass-level).
    const radTok = value.match(/--glass-blur-(\w+)-radius/);
    const radTier = radTok ? radTok[1] : null;
    const radPx = radTier ? Number((glass.match(new RegExp(`--glass-blur-${radTier}-radius:\\s*([\\d.]+)px`)) ?? [])[1]) : null;
    facts.btnRadiusTier = radTier;
    facts.btnRadiusPx = radPx;
    // The unified peer: a CALM CONTENT tier (resting | quiet) in the 8-10px band — real glass,
    // the dock/Card/menu-row material. A wash (1px) tile reds (sub-perceptual); a floating/deep
    // per-button slab reds (the un-collapsed BC state — more-glass is the hero deep tier only).
    const isPeerTier = radTier === "resting" || radTier === "quiet";
    if (radPx == null || !isPeerTier || !(radPx >= 8 && radPx <= 10)) {
        violations.push(`L3: --glass-blur-btn resolves the ${radTier}-tier radius (${radPx}px) — not the unified 8px content-tier resting/quiet peer (real glass, the dock·Card·menu-row material; a wash 1px tile or a per-button floating/deep slab reds)`);
    }
    // the saturate the btn reads (the named --glass-saturate-{tier} knob, L7-threaded).
    const satTok = value.match(/saturate\(var\(--glass-saturate-(\w+)\)\)/);
    const satTier = satTok ? satTok[1] : null;
    const satVal = satTier ? Number((glass.match(new RegExp(`--glass-saturate-${satTier}:\\s*([\\d.]+)`)) ?? [])[1]) : null;
    // tolerate a baked literal too (a future re-bake); the concentrate-light floor stays 1.18.
    const bakedSat = value.match(/saturate\(([\d.]+)\)/);
    const resolvedSat = satVal ?? (bakedSat ? Number(bakedSat[1]) : null);
    facts.btnSaturate = resolvedSat;
    if (resolvedSat == null || !(resolvedSat >= 1.18)) {
        violations.push(`L3: --glass-blur-btn saturate resolves ${resolvedSat} — below the 1.18 concentrate-light floor (the glass button must still concentrate light)`);
    }
    return { facts, violations };
}

// ── L4 — the deep-tier budget call recorded, against the apple.com nav ceiling ────────────
export function detectDeepBudget({ deepOverride } = {}) {
    const violations = [];
    const facts = {};
    const deepRaw = deepOverride ?? readFile("src/styles/tokens/glass-deep.css");
    const deep = stripCss(deepRaw);
    const radPx = Number((deep.match(/--glass-blur-deep-radius:\s*([\d.]+)px/) ?? [])[1]);
    const sat = Number((deep.match(/--glass-saturate-deep:\s*([\d.]+)/) ?? [])[1]);
    const ceiling = Number((deep.match(/--glass-saturate-deep-ceiling:\s*([\d.]+)/) ?? [])[1]);
    facts.deepRadiusPx = radPx;
    facts.deepSaturate = sat;
    facts.deepSaturateCeiling = ceiling;
    if (Number.isNaN(radPx)) {
        violations.push("L4: --glass-blur-deep-radius not found in tokens/glass-deep.css");
    } else if (radPx >= 18) {
        // budget cleared — the push toward the apple.com nav 20px ceiling landed.
        facts.budgetCall = "cleared (>=18px)";
        if (radPx > 20) violations.push(`L4: --glass-blur-deep-radius is ${radPx}px — past the apple.com nav 20px ceiling (the booked successor is the LIMIT, not an overshoot)`);
    } else {
        // stayed at 16px — the budget booking MUST be recorded (the honest 16px-stay).
        facts.budgetCall = "stayed (16px, booking recorded?)";
        // The booking is recorded in the budget-call comment on the UNSTRIPPED source (the
        // recorded throttle/booking narrative the L4 honest-gate requires).
        const booking = /BUDGET CALL|booked|book(s|ed)?\s+the\s+(18-20|full 20|18-20px)/i.test(deepRaw) &&
            /profile:budget/i.test(deepRaw);
        facts.budgetBookingRecorded = booking;
        if (!booking) {
            violations.push("L4: --glass-blur-deep-radius stayed at 16px with NO recorded budget booking — a silent stay reds (the honest gate: stay at 16px ONLY with a recorded profile:budget booking of the 18-20px push toward the apple.com nav ceiling, apple-ios27.md §1.4)");
        }
        if (!(radPx >= 14 && radPx <= 20)) violations.push(`L4: --glass-blur-deep-radius ${radPx}px outside the [14,20] Apple band`);
    }
    // the deep saturate ≤ the 1.8 apple.com-nav ceiling (never over-shot).
    if (Number.isNaN(sat)) {
        violations.push("L4: --glass-saturate-deep not found");
    } else if (Number.isNaN(ceiling)) {
        violations.push("L4: --glass-saturate-deep-ceiling (the apple.com-nav 1.8 bound) not BAKED — the deep-tier saturate ceiling must be a named bound (research/apple-glass.md §4)");
    } else {
        if (ceiling > 1.8) violations.push(`L4: --glass-saturate-deep-ceiling is ${ceiling} — above the apple.com nav 1.8 measured term (the ceiling is the apple measure, not a higher fancy)`);
        if (sat > ceiling) violations.push(`L4: --glass-saturate-deep ${sat} exceeds its ceiling ${ceiling} — the deep saturate over-shot the apple.com-nav bound (the warm-cream identity forbids a garish over-saturation)`);
    }
    return { facts, violations };
}

// ── L5 — the specular gleam opacity in the SOTA band [0.2, 0.5] ────────────────────────────
//   The static `--glass-specular` catch-light gleam (an `inset … hsl(0 0% 100% / α)` ring);
//   the gleam OPACITY is the inset's α. [The interactive moving-specular tracking is
//   W-LIQUIDHOVER's; this wave PINS the band the measure ratifies, apple-ios27.md §1.2.]
export function detectSpecularBand({ fxOverride } = {}) {
    const violations = [];
    const facts = {};
    const fx = stripCss(fxOverride ?? readFile("src/styles/tokens/glass-fx.css"));
    // the gleam catch-light opacity — the inset ring's hsl(… / α) alpha.
    const m = fx.match(/--glass-specular:\s*inset[^;]*hsl\([^)]*\/\s*([\d.]+)\s*\)/);
    const opacity = m ? Number(m[1]) : null;
    facts.specularOpacity = opacity;
    if (opacity == null) {
        violations.push("L5: the --glass-specular gleam catch-light opacity not found in tokens/glass-fx.css (the specular band the measure ratifies)");
    } else if (!(opacity >= 0.2 && opacity <= 0.5)) {
        violations.push(`L5: the --glass-specular gleam opacity is ${opacity} — outside the SOTA band [0.2, 0.5] (apple-ios27.md §1.2)`);
    }
    return { facts, violations };
}

// ── L7 — the per-rung --glass-saturate-{tier} keystone knob minted + READ-THROUGH ─────────
const SATURATE_RUNGS = ["wash", "quiet", "resting", "floating", "overlay"];
export function detectPerRungSaturate({ glassOverride } = {}) {
    const violations = [];
    const facts = { minted: {}, readThrough: {} };
    const glass = stripCss(glassOverride ?? readFile("src/styles/tokens/glass.css"));
    // the deep ceiling (L4) — every per-rung saturate must stay ≤ it (the apple.com bound).
    const deep = stripCss(readFile("src/styles/tokens/glass-deep.css"));
    const ceiling = Number((deep.match(/--glass-saturate-deep-ceiling:\s*([\d.]+)/) ?? [])[1]) || 1.8;
    facts.ceiling = ceiling;
    for (const tier of SATURATE_RUNGS) {
        // (a) the per-rung saturate token is MINTED (born-RED on the HEAD baked literal).
        const mintM = glass.match(new RegExp(`--glass-saturate-${tier}:\\s*([\\d.]+)`));
        const mintVal = mintM ? Number(mintM[1]) : null;
        facts.minted[tier] = mintVal;
        if (mintVal == null) {
            violations.push(`L7: --glass-saturate-${tier} is NOT minted in tokens/glass.css — the per-rung saturate knob is BAKED into the composed blur literal (the HEAD state; the speedtest-AX BC-W10 fold mints it as a :root-overridable token)`);
            continue;
        }
        // (b) the composed --glass-blur-{tier} READS it through (the mint-without-read no-op bite).
        const composedRe = new RegExp(`--glass-blur-${tier}:\\s*[^;]*saturate\\(var\\(--glass-saturate-${tier}\\)\\)`);
        const readThrough = composedRe.test(glass);
        facts.readThrough[tier] = readThrough;
        if (!readThrough) {
            violations.push(`L7: --glass-blur-${tier} does NOT read saturate(var(--glass-saturate-${tier})) — the per-rung token is MINTED but UNREAD (the mint-without-read no-op; the composed blur still reads a baked literal — the substitution-vs-inheritance trap)`);
        }
        // (c) the per-rung saturate ≤ the deep 1.8 ceiling (L4's bound held).
        if (mintVal > ceiling) {
            violations.push(`L7: --glass-saturate-${tier} is ${mintVal} — exceeds the deep apple.com-nav ${ceiling} ceiling (no rung over-saturates past the measured Apple term, L4)`);
        }
    }
    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause ────────────────────────────
export function selfTest() {
    const fails = [];

    // disease-root: each disease fixture reds in its biting context (no fixture passes).
    const dr = detectDiseaseRoot();
    if (dr.violations.length) fails.push(`self-test disease-root: a disease fixture unexpectedly PASSED (${dr.violations.join("; ")})`);
    // each clean disease verdict MUST be a fail verdict (the bite fires).
    const greyV = bidirectionalVerdict(GREY_SLAB, FOREGROUND, CALM_PAGE, 0.72, CALM_L_WINDOW);
    if (greyV.pass) fails.push("self-test disease-root: the grey slab PASSED the calm bidirectional verdict (the warm-cream L-window is broken)");
    const opaqueV = bidirectionalVerdict(NEAR_OPAQUE, FOREGROUND, BRIGHT_BACKDROP, 0.86);
    if (opaqueV.pass) fails.push("self-test disease-root: the near-opaque plate PASSED (the α ceiling is broken — the slab-to-win escape is open)");
    const thinV = bidirectionalVerdict(THIN_PLATE, ON_GLASS_MUTED, BUSY_BACKDROP, 0.72);
    if (thinV.pass) fails.push("self-test disease-root: the invisible-thin plate PASSED over busy (the contrast floor is broken — the bound is not bidirectional)");

    // L6: a roster that OMITS the overlay rung reds (the overlay-not-on-the-roster evasion).
    const contentOnly = detectRoster({ roster: ROSTER.filter((r) => r.kind !== "overlay") });
    if (!contentOnly.violations.some((v) => /L6:/.test(v))) fails.push("self-test L6: a content/button-only roster did NOT red (the overlay-not-on-the-roster fold-gap evasion)");

    // L6 (the synthetic opaque overlay): a near-opaque overlay rung reds the simultaneity bound.
    const opaqueOverlay = detectRoster({
        roster: [{ rung: "overlay", kind: "overlay", calmBg: NEAR_OPAQUE, calmInk: ON_GLASS_MUTED, calmAlphaCeil: 0.86, brightBg: NEAR_OPAQUE, brightInk: FOREGROUND, brightAlphaCeil: 0.86 }],
    });
    if (!opaqueOverlay.violations.some((v) => /L6/.test(v))) fails.push("self-test L6: a near-opaque (α 0.95) overlay rung did NOT red the simultaneity bound");

    // L3 (BG.W-GLASS-BLUR-PEER): the unified 8px resting-peer button (the alias to
    // --glass-blur-resting) PASSES — it is the dock/Card/menu-row material.
    const peerBtn = detectButtonGlass({ glassOverride: ":root { --glass-blur-resting-radius: 8px; --glass-blur-resting: blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(var(--glass-saturate-resting)); --glass-saturate-resting: 1.4; --glass-blur-btn: var(--glass-blur-resting); }" });
    if (peerBtn.violations.some((v) => /L3:/.test(v))) fails.push(`self-test L3: the unified 8px resting-peer button (alias) unexpectedly RED (${peerBtn.violations.filter((v) => /L3:/.test(v)).join("; ")})`);
    // L3: a sub-perceptual WASH 1px tile button reds (it is not real glass / not the peer).
    const washBtn = detectButtonGlass({ glassOverride: ":root { --glass-blur-wash-radius: 1px; --glass-blur-wash: blur(calc(var(--glass-blur-wash-radius) * var(--glass-level))) saturate(1.4); --glass-blur-btn: var(--glass-blur-wash); }" });
    if (!washBtn.violations.some((v) => /L3:/.test(v))) fails.push("self-test L3: a wash 1px tile button did NOT red the real-glass content-tier peer floor");
    // L3: the un-collapsed BC floating-tier (13px) per-button slab reds (more-glass is the hero deep tier only).
    const floatingBtn = detectButtonGlass({ glassOverride: ":root { --glass-blur-floating-radius: 13px; --glass-blur-floating: blur(calc(var(--glass-blur-floating-radius) * var(--glass-level))) saturate(1.6); --glass-blur-btn: blur(calc(var(--glass-blur-floating-radius) * var(--glass-level))) saturate(1.6) brightness(1.02); }" });
    if (!floatingBtn.violations.some((v) => /L3:/.test(v))) fails.push("self-test L3: the un-collapsed floating-tier (13px) per-button slab did NOT red the unified-peer floor");
    // L3: a content-tier 8px button with a too-low saturate reds the concentrate-light floor.
    const lowSatBtn = detectButtonGlass({ glassOverride: ":root { --glass-blur-resting-radius: 8px; --glass-blur-resting: blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(var(--glass-saturate-resting)); --glass-saturate-resting: 1.05; --glass-blur-btn: var(--glass-blur-resting); }" });
    if (!lowSatBtn.violations.some((v) => /saturate/.test(v))) fails.push("self-test L3: a 1.05-saturate button did NOT red the concentrate-light floor");

    // L4: a silent 16px-stay with NO budget booking reds.
    const silentDeep = detectDeepBudget({ deepOverride: ":root { --glass-blur-deep-radius: 16px; --glass-saturate-deep: 1.5; --glass-saturate-deep-ceiling: 1.8; }" });
    if (!silentDeep.violations.some((v) => /L4:.*NO recorded budget/.test(v))) fails.push("self-test L4: a silent 16px-stay with no budget booking did NOT red");
    // L4: a deep saturate over the 1.8 ceiling reds.
    const overSat = detectDeepBudget({ deepOverride: "/* BUDGET CALL profile:budget booked the full 20px */ :root { --glass-blur-deep-radius: 16px; --glass-saturate-deep: 2.0; --glass-saturate-deep-ceiling: 1.8; }" });
    if (!overSat.violations.some((v) => /exceeds its ceiling/.test(v))) fails.push("self-test L4: a deep saturate 2.0 over the 1.8 ceiling did NOT red");

    // L7: a per-rung saturate token MINTED but UNREAD (the mint-without-read no-op) reds.
    const unread = detectPerRungSaturate({ glassOverride: ":root { --glass-saturate-quiet: 1.05; --glass-saturate-wash: 1.05; --glass-saturate-resting: 1.05; --glass-saturate-floating: 1.18; --glass-saturate-overlay: 1.2; --glass-blur-quiet: blur(calc(var(--glass-blur-quiet-radius) * var(--glass-level))) saturate(1.05) brightness(1.02); }" });
    if (!unread.violations.some((v) => /L7: --glass-blur-quiet does NOT read/.test(v))) fails.push("self-test L7: a minted-but-unread per-rung saturate (the no-op) did NOT red");
    // L7: a missing per-rung saturate token (the HEAD baked literal) reds.
    const baked = detectPerRungSaturate({ glassOverride: ":root { --glass-blur-quiet: blur(8px) saturate(1.05) brightness(1.02); }" });
    if (!baked.violations.some((v) => /L7: --glass-saturate-quiet is NOT minted/.test(v))) fails.push("self-test L7: the HEAD baked-literal saturate (no per-rung token) did NOT red");
    // L7: a per-rung saturate over the 1.8 deep ceiling reds.
    const overRung = detectPerRungSaturate({ glassOverride: ":root { --glass-saturate-wash: 1.05; --glass-saturate-quiet: 2.0; --glass-saturate-resting: 1.05; --glass-saturate-floating: 1.18; --glass-saturate-overlay: 1.2; --glass-blur-wash: blur(1px) saturate(var(--glass-saturate-wash)); --glass-blur-quiet: blur(8px) saturate(var(--glass-saturate-quiet)) brightness(1.02); --glass-blur-resting: blur(10px) saturate(var(--glass-saturate-resting)); --glass-blur-floating: blur(13px) saturate(var(--glass-saturate-floating)); --glass-blur-overlay: blur(13px) saturate(var(--glass-saturate-overlay)); }" });
    if (!overRung.violations.some((v) => /exceeds the deep apple.com-nav/.test(v))) fails.push("self-test L7: a per-rung saturate 2.0 over the 1.8 deep ceiling did NOT red");

    return fails;
}

export function detect() {
    const roster = detectRoster();
    const disease = detectDiseaseRoot();
    const button = detectButtonGlass();
    const deep = detectDeepBudget();
    const specular = detectSpecularBand();
    const perRung = detectPerRungSaturate();
    const selfTestFails = selfTest();
    const violations = [
        ...roster.violations,
        ...disease.violations,
        ...button.violations,
        ...deep.violations,
        ...specular.violations,
        ...perRung.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            roster: roster.facts,
            disease: disease.facts,
            button: button.facts,
            deep: deep.facts,
            specular: specular.facts,
            perRung: perRung.facts,
            selfTestFails,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_LEGIBILITY_ARTIFACT", "BC-glass-legibility");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-legibility",
        facts,
        violations,
    });

    console.log("proof:glass-legibility — the BIDIRECTIONAL legibility-AND-glassiness gate (BC.W-GLASS-LEGIBILITY-MEASURED)");
    console.log(`  L1/L2 calm  : ${Object.entries(facts.roster.calm).map(([k, v]) => `${k}=${v.ratio}:1/α${v.alpha}${v.pass ? "✓" : "✗"}`).join(" ")}`);
    console.log(`  L1/L2 bright: ${Object.entries(facts.roster.bright).map(([k, v]) => `${k}=${v.ratio}:1/α${v.alpha}${v.pass ? "✓" : "✗"}`).join(" ")}`);
    console.log(`  disease-root: grey ${facts.disease.greySlab?.pass ? "PASSED ✗" : "REDs ✓"}  opaque ${facts.disease.nearOpaque?.pass ? "PASSED ✗" : "REDs ✓"}  thin ${facts.disease.thinPlate?.pass ? "PASSED ✗" : "REDs ✓"}`);
    console.log(`  L3 button   : ${facts.button.btnRadiusPx}px (${facts.button.btnRadiusTier} peer) / saturate ${facts.button.btnSaturate} (8px content-tier peer / ≥1.18)`);
    console.log(`  L4 deep     : ${facts.deep.deepRadiusPx}px / sat ${facts.deep.deepSaturate} (ceiling ${facts.deep.deepSaturateCeiling}) — ${facts.deep.budgetCall}`);
    console.log(`  L5 specular : ${facts.specular.specularOpacity} (band [0.2, 0.5])`);
    console.log(`  L7 per-rung : ${Object.entries(facts.perRung.minted).map(([k, v]) => `${k}=${v}${facts.perRung.readThrough[k] ? "→" : "✗"}`).join(" ")} (≤${facts.perRung.ceiling})`);
    console.log(`  self-tests  : ${facts.selfTestFails.length === 0 ? "all bites fire ✓" : `BROKEN ✗ (${facts.selfTestFails.length})`}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
