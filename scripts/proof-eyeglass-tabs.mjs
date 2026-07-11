#!/usr/bin/env node
// BG.W-EYEGLASS-TABS — the iOS-27 eye-glass tabs register (proof:eyeglass-tabs).
//
// The eyeglass tabs are a PROUD LIQUID-GLASS LOUPE that COMPOSES house primitives — not a
// new component, not a new engine, not a new spring. The register is an ADDITIVE boolean
// mode on the ONE SegmentedTabs engine: `.glass-lens` (Chromium refraction) + `.glass-capsule`
// (the honest cross-engine plate) + the proud geometry + the accent/glyph-ink seam + the
// FROZEN snappy kinematics. This is the composition + fence gate (device-free, ["local","ci"]);
// the BINDING painted truth is the DRIVEN 60fps frame-series π (both engines, both modes) vs
// the bar60/ ladder — per-mechanism greens alone do NOT close the visual wave (BG inv-4).
//
// The comment-strip + pure-detector house pattern (mirroring proof-tabs-ios.mjs /
// proof-lensing.mjs). Six falsifiable device-free SOURCE clauses, born-RED on HEAD → GREEN
// on the wave's edit, each carrying a self-test bite proving the detector is not hollow:
//
//   E1 — the axis exists ONCE. SegmentedTabs.vue declares `eyeglass?: boolean` (additive
//        default-off), pill-ONLY (the `eyeglassOn` computed combines `props.eyeglass` with
//        `!isUnderline`), binds `:data-eyeglass` to that pill-gated computed on the host.
//        A `data-eyeglass` NOT pill-gated (would engage the loupe on the underline paper
//        material) REDs.
//   E2 — the lens is COMPOSED, @supports-gated, baked. The indicator COMPOSES `.glass-lens`
//        (gated by eyeglass — not a forked filter); the shipped `.glass-lens` rides inside
//        `@supports (backdrop-filter: url(#glass-refract))` (L3 mirror); the eyeglass
//        blur-rung re-point sits INSIDE that same gate reading the BAKED
//        `--glass-refract-filter` (DDR-LENS-BAKE — no revived var()-scale-splice); no
//        refraction backdrop-filter leaks OUTSIDE the gate in segmented-tabs.css.
//   E3 — the proud geometry is a STATIC LENGTH outset on BOTH position paths. `--eyeglass-proud`
//        is a LENGTH (rem/px, no bare ratio, no border-radius — T1-safe), applied on BOTH the
//        JS `inset-block` AND the anchor `inset-block-start`/`-end` longhands (C3), re-declared
//        at BOTH breakpoints (AC7 — the base + the @640 density bump). A proud on ONLY one
//        path REDs; a proud that vanishes at @640 REDs; a bare-ratio/border-radius proud REDs.
//   E4 — the kinematics read the FROZEN clock, distinct caps. `--tab-indicator-duration` =
//        `--spring-snappy-duration` (frozen); the STRETCH cap constant==token ≤1.2 AND the
//        BLOB cap constant==token with AREA (blob²) ≤1.14 (per-axis ≤~1.068 — distinct caps,
//        C5); the eyeglass block introduces NO new spring / linear() / clock override.
//   E5 — the accent is FLOOD+RIM + the CONTRAST-SPLIT ink. The selected LABEL stays
//        `--foreground` (T5, AA 4.5:1); the selected GLYPH tints via `--tab-selected-ink` on
//        a DESCENDANT `svg` selector (AC4 — NEVER the tab's own `color`) with a --foreground
//        no-op default; the `--tab-flood-t` accent-flood register survives. A glyph tint on
//        the TAB `color` REDs; a saturated-LABEL default REDs.
//   E6 — the honest-degrade posture recorded. No pre-baked "magnified" image / broken url()
//        fakes the refraction in segmented-tabs.css; the honest-degrade + booked-successor
//        record is present. A pre-baked/broken-url masking fake REDs.
//
// bite-check (each planted defect flags its clause): an unconditional data-eyeglass → E1;
// a refraction decl outside the @supports gate → E2; a proud on only one path / vanishing at
// @640 / a bare-ratio proud → E3; a blob-max past its area cap / a clock override → E4; a
// glyph tint on the tab color → E5; a pre-baked magnified-image fake → E6.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

const SFC = "src/components/custom/tabs/SegmentedTabs.vue";
const TABS_CSS = "src/styles/segmented-tabs.css";
const REFRACT_CSS = "src/styles/glass-refract.css";
const CONSTANTS = "src/components/custom/tabs/constants.ts";
const SCALE_PAPER = "src/styles/tokens/scale-paper.css";

// ── E1 — the eyeglass axis exists ONCE, pill-only, additive default-off.
export function detectEyeglassAxis(sfcRaw) {
    const violations = [];
    const facts = {};
    const sfc = sfcRaw ?? readFile(SFC);

    facts.hasProp = /eyeglass\?\s*:\s*boolean/.test(sfc);
    if (!facts.hasProp) {
        violations.push("E1: SegmentedTabs.vue does not declare the `eyeglass?: boolean` prop (the additive axis)");
    }

    facts.defaultFalse = /eyeglass:\s*false/.test(sfc);
    if (!facts.defaultFalse) {
        violations.push("E1: the `eyeglass` prop is not defaulted `false` in withDefaults (additive default-off — a bare pill must stay byte-identical)");
    }

    // The pill-only gate: the `eyeglassOn` computed combines props.eyeglass with !isUnderline.
    const gateM = sfc.match(/eyeglassOn\s*=\s*computed\(\s*\(\)\s*=>\s*([^;]+)\)/);
    facts.eyeglassGate = gateM ? gateM[1].replace(/\s+/g, " ").trim() : null;
    const pillOnly =
        !!facts.eyeglassGate &&
        /props\.eyeglass/.test(facts.eyeglassGate) &&
        /isUnderline/.test(facts.eyeglassGate);
    facts.pillOnly = pillOnly;
    if (!pillOnly) {
        violations.push("E1: the eyeglass axis is not pill-gated — the `eyeglassOn` computed must combine `props.eyeglass` with `!isUnderline` (eyeglass is pill-ONLY; a paper hairline has no plate to loupe)");
    }

    facts.bindsDataAttr = /:data-eyeglass=/.test(sfc);
    if (!facts.bindsDataAttr) {
        violations.push("E1: the strip host does not bind `:data-eyeglass` (the CSS-read axis attribute)");
    }
    // The data-attr must be bound to the pill-gated computed — an unconditional
    // `:data-eyeglass="true"` / a raw prop bind would engage the loupe on the underline arm.
    facts.dataAttrFromGate = /:data-eyeglass="\s*eyeglassOn/.test(sfc);
    if (facts.bindsDataAttr && !facts.dataAttrFromGate) {
        violations.push("E1: `:data-eyeglass` is not bound to the pill-gated `eyeglassOn` computed — an unconditional data-eyeglass engages the loupe on the underline paper material");
    }

    return { facts, violations };
}

// ── E2 — the lens is COMPOSED, @supports-gated, baked (no forked filter, no leak, no splice).
export function detectLensCompose(sfcRaw, tabsRaw, refractRaw) {
    const violations = [];
    const facts = {};
    const sfc = sfcRaw ?? readFile(SFC);
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));
    const refract = stripCss(refractRaw ?? readFile(REFRACT_CSS));

    // The SFC composes `.glass-lens` on the indicator, gated by the eyeglass computed.
    facts.composesLens = /eyeglassOn\s*&&\s*['"]glass-lens['"]/.test(sfc);
    if (!facts.composesLens) {
        violations.push("E2: SegmentedTabs.vue does not compose `.glass-lens` onto the indicator gated by `eyeglassOn` (the refraction is the shipped composed class, not a forked filter)");
    }

    // The shipped `.glass-lens` rides inside the @supports (backdrop-filter: url(#…)) gate
    // (L3 mirror — the off-Chromium honest degrade floor).
    facts.refractSupportsGate = /@supports\s*\(backdrop-filter:\s*url\(/.test(refract);
    if (!facts.refractSupportsGate) {
        violations.push("E2: glass-refract.css has no `@supports (backdrop-filter: url(#…))` gate — the honest degrade floor is gone (L3 mirror)");
    }

    // The eyeglass blur-rung re-point in segmented-tabs.css sits INSIDE the same @supports
    // gate. Mirror the proof-lensing L3 split: no refraction backdrop-filter leaks BEFORE the
    // first @supports.
    facts.tabsSupportsGate = /@supports\s*\(backdrop-filter:\s*url\(/.test(tabs);
    if (!facts.tabsSupportsGate) {
        violations.push("E2: segmented-tabs.css has no `@supports (backdrop-filter: url(#…))` gate around the eyeglass lens re-point (the honest degrade floor)");
    }
    const supportsIdx = tabs.indexOf("@supports (backdrop-filter: url(");
    const before = supportsIdx >= 0 ? tabs.slice(0, supportsIdx) : tabs;
    facts.refractOutsideGate = /backdrop-filter:[^;]*--glass-refract-filter/.test(before);
    if (facts.refractOutsideGate) {
        violations.push("E2: a refraction `backdrop-filter` (reading --glass-refract-filter) sits OUTSIDE the @supports gate in segmented-tabs.css (a non-supporting engine would hit a broken url())");
    }

    // The re-point reads the BAKED `--glass-refract-filter` (DDR-LENS-BAKE) — NOT a revived
    // var()-in-url() scale-splice, NOT a hand-authored data:-URI fake in the tabs css.
    facts.readsBakedFilter = /backdrop-filter:[^;]*var\(--glass-refract-filter\)/.test(tabs);
    if (facts.composesLens && facts.tabsSupportsGate && !facts.readsBakedFilter) {
        violations.push("E2: the eyeglass lens re-point does not read the shipped baked `var(--glass-refract-filter)` (compose the shipped lens; never re-author the filter graph)");
    }
    // No revived var()-driven scale splice: a bare `var(--glass-refract)` (the retired axis)
    // spliced into a url() literal, or a hand-authored `url("data:` in the tabs css.
    facts.hasScaleSplice =
        /url\([^)]*var\(--glass-refract\)/.test(tabs) || /url\(\s*["']?data:/.test(tabs);
    if (facts.hasScaleSplice) {
        violations.push("E2: segmented-tabs.css revives a var()-spliced/hand-authored refraction filter (DDR-LENS-BAKE — the scale is a baked literal; compose the shipped `--glass-refract-filter`)");
    }

    return { facts, violations };
}

// ── E3 — the proud geometry is a STATIC LENGTH outset on BOTH position paths, both breakpoints.
export function detectProudGeometry(tabsRaw) {
    const violations = [];
    const facts = {};
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));

    // `--eyeglass-proud` declared as a LENGTH (rem/px), NOT a bare ratio / percentage.
    const proudDecls = [...tabs.matchAll(/--eyeglass-proud:\s*([^;]+);/g)].map((m) => m[1].trim());
    facts.proudDecls = proudDecls;
    if (proudDecls.length === 0) {
        violations.push("E3: `--eyeglass-proud` is not declared (the proud-outset geometry token is missing)");
    } else {
        for (const v of proudDecls) {
            if (!/^-?[\d.]+(rem|px|em)$/.test(v)) {
                violations.push(`E3: --eyeglass-proud: ${v} is not a LENGTH (rem/px/em) — a bare ratio / percentage / border-radius is forbidden (the proud is an inset LENGTH; the stadium radius is untouched, T1-safe)`);
            }
        }
    }

    // Re-declared at BOTH breakpoints (AC7): the base `.segmented-tabs[data-eyeglass]` block
    // AND a `@media (min-width: 640px)` re-declaration (the density bump) — so it never
    // vanishes at desktop.
    facts.declaredAtBothBreakpoints = proudDecls.length >= 2;
    // Confirm one of the declarations lives inside a min-width:640px media block.
    const mediaBlock = tabs.match(/@media\s*\(min-width:\s*640px\)\s*\{[\s\S]*?--eyeglass-proud:/);
    facts.proudAt640 = !!mediaBlock;
    if (proudDecls.length > 0 && !facts.proudAt640) {
        violations.push("E3: `--eyeglass-proud` is not re-declared inside a `@media (min-width: 640px)` block (AC7 — a base-only proud that vanishes at desktop is the silent-absent-at-desktop class)");
    }

    // Applied on the JS path (`inset-block` reads var(--eyeglass-proud)) under [data-eyeglass].
    facts.jsProud =
        /\.segmented-tabs\[data-eyeglass\][^{]*\.segmented-indicator--js\s*\{[^}]*inset-block:[^;]*var\(--eyeglass-proud\)/.test(tabs);
    if (!facts.jsProud) {
        violations.push("E3: the proud outset is not applied on the JS `.segmented-indicator--js` `inset-block` path (C3 — Safari-26 gets a flat capsule if the proud only lands on one path)");
    }

    // Applied on the anchor path (inset-block-start AND inset-block-end read var(--eyeglass-proud))
    // under [data-eyeglass].
    const anchorBlockM = tabs.match(
        /\.segmented-tabs\[data-eyeglass\][^{]*\.segmented-indicator--anchor\s*\{([^}]*)\}/,
    );
    const anchorBlock = anchorBlockM ? anchorBlockM[1] : "";
    facts.anchorStartProud = /inset-block-start:[^;]*var\(--eyeglass-proud\)/.test(anchorBlock);
    facts.anchorEndProud = /inset-block-end:[^;]*var\(--eyeglass-proud\)/.test(anchorBlock);
    if (!facts.anchorStartProud || !facts.anchorEndProud) {
        violations.push("E3: the proud outset is not applied on BOTH the anchor `inset-block-start` AND `inset-block-end` longhands (C3 — the Safari-26 + Chrome anchor-primary path)");
    }

    return { facts, violations };
}

// ── E4 — the kinematics read the FROZEN clock, distinct caps; the eyeglass block re-times nothing.
export function detectFrozenKinematics(constantsRaw, scalePaperRaw, tabsRaw) {
    const violations = [];
    const facts = {};
    const constants = constantsRaw ?? readFile(CONSTANTS);
    const scalePaper = stripCss(scalePaperRaw ?? readFile(SCALE_PAPER));
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));

    // The frozen clock: --tab-indicator-duration = var(--spring-snappy-duration).
    facts.tokenDuration =
        /--tab-indicator-duration:\s*var\(--spring-snappy-duration\)\s*;/.test(scalePaper);
    if (!facts.tokenDuration) {
        violations.push("E4: --tab-indicator-duration is not `var(--spring-snappy-duration)` (the frozen calibrated clock — the eyeglass mode does NOT re-time the spring)");
    }

    // STRETCH cap: constant == token, in the visible-but-anti-taffy band [1.0, 1.2].
    const stretchConstM = constants.match(/DEFAULT_INDICATOR_MAX_STRETCH\s*=\s*([\d.]+)\b/);
    const stretchTokenM = scalePaper.match(/--tab-indicator-max-stretch:\s*([\d.]+)\s*;/);
    facts.stretchConst = stretchConstM ? Number(stretchConstM[1]) : null;
    facts.stretchToken = stretchTokenM ? Number(stretchTokenM[1]) : null;
    if (facts.stretchConst == null || facts.stretchToken == null) {
        violations.push("E4: the stretch cap (DEFAULT_INDICATOR_MAX_STRETCH / --tab-indicator-max-stretch) is missing");
    } else {
        if (facts.stretchConst !== facts.stretchToken) {
            violations.push(`E4: the stretch cap FORKED — DEFAULT_INDICATOR_MAX_STRETCH=${facts.stretchConst} ≠ --tab-indicator-max-stretch=${facts.stretchToken} (the SOLE cap source, never a fork)`);
        }
        if (facts.stretchConst > 1.2 || facts.stretchConst < 1.0) {
            violations.push(`E4: the stretch cap ${facts.stretchConst} is out of the [1.0, 1.2] anti-taffy band`);
        }
    }

    // BLOB cap: constant == token, AREA (blob², volume-preserving) ≤ 1.14 → per-axis ≤ ~1.068.
    const blobConstM = constants.match(/DEFAULT_INDICATOR_BLOB_MAX\s*=\s*([\d.]+)\b/);
    const blobTokenM = scalePaper.match(/--tab-indicator-blob-max:\s*([\d.]+)\s*;/);
    facts.blobConst = blobConstM ? Number(blobConstM[1]) : null;
    facts.blobToken = blobTokenM ? Number(blobTokenM[1]) : null;
    const BLOB_AXIS_CAP = Math.sqrt(1.14); // ≈ 1.0677
    if (facts.blobConst == null || facts.blobToken == null) {
        violations.push("E4: the blob cap (DEFAULT_INDICATOR_BLOB_MAX / --tab-indicator-blob-max) is missing");
    } else {
        if (facts.blobConst !== facts.blobToken) {
            violations.push(`E4: the blob cap FORKED — DEFAULT_INDICATOR_BLOB_MAX=${facts.blobConst} ≠ --tab-indicator-blob-max=${facts.blobToken} (the SOLE cap source)`);
        }
        if (facts.blobConst > BLOB_AXIS_CAP + 1e-9) {
            violations.push(`E4: the blob cap ${facts.blobConst} exceeds the per-axis AREA cap √1.14 ≈ ${BLOB_AXIS_CAP.toFixed(4)} (the composed area blob² would exceed the 1.14 anti-taffy fence — the STRETCH ≤1.2 and BLOB area ≤1.14 caps are DISTINCT, C5)`);
        }
    }

    // The eyeglass block re-times NOTHING: no --tab-indicator-duration override, no hand
    // linear()/cubic-bezier spring introduced under [data-eyeglass].
    const eyeglassRules = [...tabs.matchAll(/\.segmented-tabs\[data-eyeglass\][^{]*\{([^}]*)\}/g)]
        .map((m) => m[1])
        .join("\n");
    facts.eyeglassReTimes =
        /--tab-indicator-duration:/.test(eyeglassRules) ||
        /\blinear\(/.test(eyeglassRules) ||
        /\bcubic-bezier\(/.test(eyeglassRules);
    if (facts.eyeglassReTimes) {
        violations.push("E4: the eyeglass block overrides the clock / introduces a hand linear()/cubic-bezier spring (the spring/clock are FROZEN — W-GLASS-CAL fence)");
    }

    return { facts, violations };
}

// ── E5 — the accent is FLOOD+RIM + the CONTRAST-SPLIT glyph ink (label AA, glyph on descendant svg).
export function detectAccentInk(tabsRaw) {
    const violations = [];
    const facts = {};
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));

    // The active LABEL stays --foreground (T5) — scan every `.segmented-tab[aria-pressed="true"]`
    // rule that sets `color:` and is NOT the descendant-svg glyph rule.
    facts.labelColor = null;
    const activeRe = /\.segmented-tab\[aria-pressed="true"\]([^{]*)\{([^}]*)\}/g;
    let am;
    while ((am = activeRe.exec(tabs)) !== null) {
        const tail = am[1];
        const body = am[2];
        const colorM = body.match(/(?:^|[^-])color:\s*([^;]+);/);
        if (!colorM) continue;
        const isGlyphRule = /\bsvg\b/.test(tail); // the descendant-svg glyph rule — skip it
        if (isGlyphRule) {
            facts.glyphColor = colorM[1].trim();
            // The glyph ink must be `--tab-selected-ink` with a --foreground no-op fallback,
            // NEVER a saturated brand hue / a bare accent that paints transparent at default.
            if (!/var\(--tab-selected-ink\s*,\s*var\(--foreground\)\s*\)/.test(colorM[1])) {
                violations.push(`E5: the selected-glyph ink is not var(--tab-selected-ink, var(--foreground)) (the no-op default — a bare var(--glass-accent) paints transparent at the default and a saturated hue breaks register-ios): '${colorM[1].trim()}'`);
            }
            continue;
        }
        // A non-glyph active rule that sets `color:` is the LABEL — it MUST stay --foreground.
        if (facts.labelColor == null) facts.labelColor = colorM[1].trim();
        if (!/var\(--foreground\)/.test(colorM[1]) && !/var\(--tab-selected-ink/.test(colorM[1])) {
            // (a --tab-selected-ink write on the LABEL rule would be the AC4 violation caught below)
        }
        if (/var\(--tab-selected-ink/.test(colorM[1])) {
            violations.push("E5: `--tab-selected-ink` is written on the TAB's own `color` (the LABEL) — AC4 forbids it (it drives the LABEL below AA in lockstep); the glyph tint MUST live on a DESCENDANT `svg` selector, the label stays --foreground");
        }
    }
    if (!facts.labelColor) {
        violations.push("E5: the active-tab LABEL color rule (.segmented-tab[aria-pressed=\"true\"] { color }) not found");
    } else if (!/var\(--foreground\)/.test(facts.labelColor)) {
        violations.push(`E5: the active-tab LABEL is not --foreground (the AA 4.5:1 anchor / T5): '${facts.labelColor}'`);
    }

    // The glyph-ink seam exists on a DESCENDANT svg selector under [data-eyeglass].
    facts.glyphSeam =
        /\.segmented-tabs\[data-eyeglass\][^{]*\.segmented-tab\[aria-pressed="true"\][^{]*\bsvg\b[^{]*\{[^}]*var\(--tab-selected-ink/.test(tabs);
    if (!facts.glyphSeam) {
        violations.push("E5: the selected-GLYPH accent-ink seam is not on a `[data-eyeglass] .segmented-tab[aria-pressed=\"true\"] svg` descendant rule reading `--tab-selected-ink` (C7/AC4 — the CONTRAST-SPLIT glyph ink)");
    }

    // The commit FLOOD register (`--tab-flood-t`) survives (the shipped accent-flood).
    facts.floodRegister = /--tab-flood-t/.test(tabs);
    if (!facts.floodRegister) {
        violations.push("E5: the `--tab-flood-t` accent-flood register is gone (the FLOOD half of the accent — a consumer no-op at 0)");
    }

    return { facts, violations };
}

// ── E6 — the honest-degrade posture recorded (no faked bend; the record + booked successors).
export function detectHonestDegrade(tabsRaw, tabsRawWithComments) {
    const violations = [];
    const facts = {};
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));
    const withComments = tabsRawWithComments ?? readFile(TABS_CSS);

    // No pre-baked "magnified" image / broken url() FAKES the refraction in segmented-tabs.css
    // — the only lens is the composed shipped class (E2). A hand-authored `url("data:image`
    // background/mask that fakes a magnified backdrop, or a `background-image:` reading a
    // refract-like data URI, is the masking crime.
    facts.fakedImage = /background(?:-image)?:[^;]*url\(\s*["']?data:image/.test(tabs);
    if (facts.fakedImage) {
        violations.push("E6: segmented-tabs.css paints a pre-baked `url(data:image…)` background/mask (a faked 'magnified' loupe — NO-MASKING-FALLBACK: the primary refracts or degrades to the honest capsule, never a pre-baked image)");
    }
    // A broken bare `url(#glass-refract)` sitting outside a backdrop-filter (a broken ref).
    facts.brokenUrl = /(?<!backdrop-filter:[^;]{0,200})filter:\s*url\(#glass-refract/.test(tabs);
    if (facts.brokenUrl) {
        violations.push("E6: segmented-tabs.css uses a REGULAR `filter: url(#glass-refract)` (WebKit bug 245510 — the lens is a `backdrop-filter` composed via `.glass-lens`, never a regular filter fake)");
    }

    // The honest-degrade + booked-successor record is present (the NF-honest posture).
    facts.recordPresent =
        /BG\.W-EYEGLASS-TABS/.test(withComments) &&
        /HONEST DEGRADE/i.test(withComments) &&
        /BOOKED/.test(withComments);
    if (!facts.recordPresent) {
        violations.push("E6: the honest-degrade + booked-successor record is missing from segmented-tabs.css (the NF-honest posture: the Safari capsule floor + the booked T1 clone-loupe / chromatic-aberration / live-observer successors)");
    }

    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause (the anti-evasion floor).
export function selfTest() {
    const fails = [];

    // A good SFC + CSS pair the detectors pass — the fixtures the bites perturb.
    const goodSfc = `
        eyeglass?: boolean;
        withDefaults(defineProps(), { eyeglass: false });
        const eyeglassOn = computed(() => props.eyeglass && !isUnderline.value);
        :data-eyeglass="eyeglassOn ? '' : undefined"
        eyeglassOn && 'glass-lens',
    `;
    const goodRefract = '@supports (backdrop-filter: url("#glass-refract")) { .glass-lens { backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter); } }';
    const goodTabs = `
        .segmented-tabs[data-eyeglass] { --eyeglass-proud: 0.3rem; --eyeglass-track-blur: var(--glass-blur-floating); backdrop-filter: var(--eyeglass-track-blur); }
        @media (min-width: 640px) { .segmented-tabs[data-eyeglass] { --eyeglass-proud: 0.36rem; } }
        .segmented-tabs[data-eyeglass] .segmented-indicator--js { inset-block: calc(var(--bouncy-track-trim) - var(--eyeglass-proud)); }
        @supports (position-anchor: --x) { .segmented-tabs[data-eyeglass] .segmented-indicator--anchor { inset-block-start: calc(anchor(top) + var(--bouncy-track-trim) - var(--eyeglass-proud)); inset-block-end: calc(anchor(bottom) + var(--bouncy-track-trim) - var(--eyeglass-proud)); } }
        @supports (backdrop-filter: url("#glass-refract")) { .segmented-tabs[data-eyeglass] .segmented-indicator.glass-lens { backdrop-filter: var(--glass-blur-floating) var(--glass-refract-filter); } }
        .segmented-tab[aria-pressed="true"] { color: var(--foreground); }
        .segmented-tabs[data-eyeglass] .segmented-tab[aria-pressed="true"] svg { color: var(--tab-selected-ink, var(--foreground)); }
        HONEST DEGRADE BG.W-EYEGLASS-TABS BOOKED --tab-flood-t
    `;
    const goodConstants = "export const DEFAULT_INDICATOR_MAX_STRETCH = 1.11; export const DEFAULT_INDICATOR_BLOB_MAX = 1.045;";
    const goodScale = "--tab-indicator-max-stretch: 1.11;\n--tab-indicator-blob-max: 1.045;\n--tab-indicator-duration: var(--spring-snappy-duration);";

    // The good fixtures pass every clause.
    if (detectEyeglassAxis(goodSfc).violations.length !== 0) fails.push("self-test E1: the good SFC unexpectedly red");
    if (detectLensCompose(goodSfc, goodTabs, goodRefract).violations.length !== 0) fails.push("self-test E2: the good compose unexpectedly red");
    if (detectProudGeometry(goodTabs).violations.length !== 0) fails.push("self-test E3: the good proud unexpectedly red");
    if (detectFrozenKinematics(goodConstants, goodScale, goodTabs).violations.length !== 0) fails.push("self-test E4: the good kinematics unexpectedly red");
    if (detectAccentInk(goodTabs).violations.length !== 0) fails.push("self-test E5: the good accent-ink unexpectedly red");
    if (detectHonestDegrade(goodTabs, goodTabs).violations.length !== 0) fails.push("self-test E6: the good honest-degrade unexpectedly red");

    // E1 — an unconditional data-eyeglass (not pill-gated) reds.
    const uncondSfc = `eyeglass?: boolean; withDefaults(defineProps(), { eyeglass: false }); const eyeglassOn = computed(() => props.eyeglass); :data-eyeglass="props.eyeglass ? '' : undefined"`;
    if (detectEyeglassAxis(uncondSfc).violations.length === 0) fails.push("self-test E1: an unconditional (non-pill-gated) data-eyeglass did NOT red");

    // E2 — a refraction backdrop-filter OUTSIDE the @supports gate reds.
    const leakTabs = ".segmented-indicator.glass-lens { backdrop-filter: var(--glass-blur-floating) var(--glass-refract-filter); } @supports (backdrop-filter: url(#glass-refract)) { .x { color: red; } }";
    if (detectLensCompose(goodSfc, leakTabs, goodRefract).violations.length === 0) fails.push("self-test E2: a refraction backdrop-filter OUTSIDE the @supports gate did NOT red");

    // E3a — a proud on ONLY the JS path (no anchor) reds.
    const oneProudTabs = `
        .segmented-tabs[data-eyeglass] { --eyeglass-proud: 0.3rem; }
        @media (min-width: 640px) { .segmented-tabs[data-eyeglass] { --eyeglass-proud: 0.36rem; } }
        .segmented-tabs[data-eyeglass] .segmented-indicator--js { inset-block: calc(var(--bouncy-track-trim) - var(--eyeglass-proud)); }
    `;
    if (detectProudGeometry(oneProudTabs).violations.length === 0) fails.push("self-test E3: a proud on ONLY the JS path (no anchor) did NOT red");

    // E3b — a proud that vanishes at @640 (base-only) reds.
    const baseOnlyProud = `
        .segmented-tabs[data-eyeglass] { --eyeglass-proud: 0.3rem; }
        .segmented-tabs[data-eyeglass] .segmented-indicator--js { inset-block: calc(var(--bouncy-track-trim) - var(--eyeglass-proud)); }
        @supports (position-anchor: --x) { .segmented-tabs[data-eyeglass] .segmented-indicator--anchor { inset-block-start: calc(anchor(top) - var(--eyeglass-proud)); inset-block-end: calc(anchor(bottom) - var(--eyeglass-proud)); } }
    `;
    if (detectProudGeometry(baseOnlyProud).violations.length === 0) fails.push("self-test E3: a base-only proud (vanishes at @640) did NOT red");

    // E3c — a bare-ratio proud reds.
    const ratioProud = oneProudTabs.replace("0.3rem", "1.14").replace("0.36rem", "1.14");
    if (detectProudGeometry(ratioProud).violations.length === 0) fails.push("self-test E3: a bare-ratio `--eyeglass-proud: 1.14` did NOT red");

    // E4 — a blob-max pushed past its area cap reds.
    const bigBlobScale = "--tab-indicator-max-stretch: 1.11;\n--tab-indicator-blob-max: 1.09;\n--tab-indicator-duration: var(--spring-snappy-duration);";
    const bigBlobConst = "export const DEFAULT_INDICATOR_MAX_STRETCH = 1.11; export const DEFAULT_INDICATOR_BLOB_MAX = 1.09;";
    if (detectFrozenKinematics(bigBlobConst, bigBlobScale, goodTabs).violations.length === 0) fails.push("self-test E4: a blob-max 1.09 past the √1.14 area cap did NOT red");

    // E4b — an eyeglass-block clock override reds.
    const clockOverrideTabs = goodTabs + "\n.segmented-tabs[data-eyeglass] { --tab-indicator-duration: 999ms; }";
    if (detectFrozenKinematics(goodConstants, goodScale, clockOverrideTabs).violations.length === 0) fails.push("self-test E4: an eyeglass-block --tab-indicator-duration override did NOT red");

    // E5 — a glyph tint on the TAB color (not a descendant svg) reds.
    const tabColorTint = `
        .segmented-tabs[data-eyeglass] .segmented-tab[aria-pressed="true"] { color: var(--tab-selected-ink, var(--foreground)); }
        --tab-flood-t: 0;
    `;
    if (detectAccentInk(tabColorTint).violations.length === 0) fails.push("self-test E5: a `--tab-selected-ink` on the TAB color (AC4 violation) did NOT red");

    // E6 — a pre-baked magnified-image fake reds.
    const fakeImageTabs = goodTabs + "\n.segmented-indicator.glass-lens { background-image: url(\"data:image/svg+xml,...\"); }";
    if (detectHonestDegrade(fakeImageTabs, fakeImageTabs).violations.length === 0) fails.push("self-test E6: a pre-baked `url(data:image…)` magnified fake did NOT red");

    return fails;
}

export function detect() {
    const axis = detectEyeglassAxis();
    const lens = detectLensCompose();
    const proud = detectProudGeometry();
    const kinematics = detectFrozenKinematics();
    const accent = detectAccentInk();
    const degrade = detectHonestDegrade();
    const selfTestFails = selfTest();
    const violations = [
        ...axis.violations,
        ...lens.violations,
        ...proud.violations,
        ...kinematics.violations,
        ...accent.violations,
        ...degrade.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            axis: axis.facts,
            lens: lens.facts,
            proud: proud.facts,
            kinematics: kinematics.facts,
            accent: accent.facts,
            degrade: degrade.facts,
            selfTestFails,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_EYEGLASS_TABS_ARTIFACT", "BG-eyeglass-tabs");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:eyeglass-tabs",
        facts,
        violations,
    });

    console.log("proof:eyeglass-tabs — the iOS-27 eye-glass loupe register on SegmentedTabs (BG.W-EYEGLASS-TABS, F2 Glass)");
    console.log(`  E1 axis exists    : prop=${facts.axis.hasProp} default-off=${facts.axis.defaultFalse} pill-only=${facts.axis.pillOnly} data-attr=${facts.axis.dataAttrFromGate}`);
    console.log(`  E2 lens composed  : composes=${facts.lens.composesLens} @supports=${facts.lens.tabsSupportsGate} baked=${facts.lens.readsBakedFilter} no-leak=${!facts.lens.refractOutsideGate}`);
    console.log(`  E3 proud geometry : decls=[${facts.proud.proudDecls?.join(", ") ?? ""}] @640=${facts.proud.proudAt640} js=${facts.proud.jsProud} anchor=${facts.proud.anchorStartProud && facts.proud.anchorEndProud}`);
    console.log(`  E4 frozen clock   : clock=${facts.kinematics.tokenDuration} stretch=${facts.kinematics.stretchConst} blob=${facts.kinematics.blobConst} re-times=${facts.kinematics.eyeglassReTimes}`);
    console.log(`  E5 accent ink     : label=${facts.accent.labelColor ?? "MISSING"} glyph-seam=${facts.accent.glyphSeam} flood=${facts.accent.floodRegister}`);
    console.log(`  E6 honest degrade : no-fake-image=${!facts.degrade.fakedImage} record=${facts.degrade.recordPresent}`);
    console.log(`  self-tests        : ${facts.selfTestFails.length === 0 ? "all bites fire ✓" : `BROKEN ✗ (${facts.selfTestFails.length})`}`);

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
