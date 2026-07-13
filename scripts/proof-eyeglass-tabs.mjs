#!/usr/bin/env node
// BG.W-EYEGLASS-TABS + BI.W-TABS-FACTOR — the iOS-27 eye-glass tabs register
// (proof:eyeglass-tabs).
//
// The eyeglass tabs are the PROUD LIQUID-GLASS LOUPE that COMPOSES house primitives — not
// a new component, not a new engine, not a hand-rolled spring. At BI.W-TABS-FACTOR the
// register became THE tabs DEFAULT (UF-H1: "eyeglass should become the default tabs
// option … we don't need a million variants"; ratified judgment (e)): the PILL material IS
// the loupe by construction, the flat capsule survives ONLY as the honest degrade / PRM
// floor, and the pill is a TWO-REST-STATE machine (SETTLED inset ⇄ LIVE proud) whose
// release CONSUMES `useLeadTrail` (the ONE lead/trail integrator — no second integrator).
// This is the composition + fence gate (device-free, ["local","ci"]); the BINDING painted
// truth is the DRIVEN 60fps frame-series π (both engines, both modes) — per-mechanism
// greens alone do NOT close the visual wave (BG inv-4; the π rides W-DOCK-DEVICE).
//
// The comment-strip + pure-detector house pattern (mirroring proof-tabs-ios.mjs /
// proof-lensing.mjs). Ten falsifiable device-free SOURCE clauses, each carrying a
// self-test bite proving the detector is not hollow. E1–E6 are the BG register (E1/E3/E4
// RECONCILED to the BI.W-DOCK-CONTROLS JS-only-writer carve + the BI.W-TABS-FACTOR
// two-rest-state); E7–E10 are the BI.W-TABS-FACTOR extension (born-RED on HEAD):
//
//   E1 — the axis is pill-gated. `eyeglassOn` references `isUnderline` (a paper hairline
//        has no plate to loupe); the host binds `:data-eyeglass` to it.
//   E2 — the lens is COMPOSED, @supports-gated, baked. The plate COMPOSES `.glass-lens`
//        (gated by `eyeglassOn`); the shipped `.glass-lens` + the eyeglass blur-rung
//        re-point ride INSIDE `@supports (backdrop-filter: url(#glass-refract))` reading
//        the BAKED `--glass-refract-filter`; no refraction leaks outside the gate.
//   E3 — the geometry is COMPOSITOR, not layout. The proud is a `scaleY` on
//        `.segmented-indicator__plate` (its OWN channel, no transition — useLeadTrail is
//        the animator); NO `[data-eyeglass]` rule drives a LAYOUT property off
//        `--eyeglass-proud` (a length outset would animate layout — proof:no-layout-anim).
//   E4 — the kinematics read the calibrated clock, distinct caps. `--tab-indicator-duration`
//        = `--spring-snappy-duration`; the caps live in the PROMOTED writer
//        (useSelectionIndicator.ts, constants.ts re-exports) — STRETCH ≤1.2, BLOB area
//        (blob²) ≤1.14; the eyeglass block re-times nothing (the glide rides the
//        --spring-eyeglass TOKEN, never a hand curve).
//   E5 — the accent is FLOOD+RIM + the CONTRAST-SPLIT ink. The LABEL stays --foreground
//        (AA); the GLYPH tints via `--tab-selected-ink` on a DESCENDANT `svg` selector.
//   E6 — the honest-degrade posture recorded. No pre-baked "magnified" image / broken
//        url() fake; the honest-degrade + booked-successor record present.
//   E7 — DEFAULT-is-eyeglass. `eyeglassOn` is `!isUnderline` with NO `props.eyeglass`
//        term; the `eyeglass` SPRING_PRESETS row exists in the measured band (response
//        ∈[0.32,0.40], ζ∈[0.6,0.85]).
//   E8 — the sizing axis resolves + bounds. `--eyeglass-settled` (∈[0.75,0.95]) +
//        `--eyeglass-proud` (∈[1.05,1.25]) bare ratios; `--eyeglass-live-t` registered
//        @property <number> initial 0; `--eyeglass-y` interpolates on live-t; the plate
//        reads scaleY(var(--eyeglass-y)).
//   E9 — the culled variants are DEFINITION-ABSENT. No `eyeglass?: boolean` prop, no
//        `props.eyeglass`, no `eyeglass: false` default; SegmentedTabsVariant is EXACTLY
//        the two materials `"pill" | "underline"`.
//   E10 — useLeadTrail CONSUMED, no second integrator. useEyeglassLive imports + drives
//        + seats + onFrames useLeadTrail, reads `springPreset("eyeglass")` (the ONE
//        table), owns NO requestAnimationFrame/setInterval (the dual-path bite); the SFC
//        wires it.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

// Strip JS/TS comments (block + line) so a CODE-presence check never false-trips on
// PROSE describing the retired construct (the E9 `eyeglass?: boolean` retirement note is
// legitimate doc — a scan for a live prop must not match the sentence saying it is gone).
// The `(^|[^:])//` guard preserves `://` in any URL (the CLAUDE.md clause-7 house idiom).
function stripJsComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

const SFC = "src/components/custom/tabs/SegmentedTabs.vue";
const TABS_CSS = "src/styles/segmented-tabs.css";
const DRAG_CSS = "src/styles/tabs/segmented-tabs-drag.css";
const REFRACT_CSS = "src/styles/glass-refract.css";
const CONSTANTS = "src/components/custom/tabs/constants.ts";
// BI.W-DOCK-CONTROLS — the indicator caps were PROMOTED to the ONE writer; constants.ts
// re-exports. The gate reads the literals at the writer (reader-follows-the-carve).
const INDICATOR_WRITER = "src/composables/motion/useSelectionIndicator.ts";
const SCALE_PAPER = "src/styles/tokens/scale-paper.css";
const PROPERTY_REGS = "src/styles/tokens/property-regs.css";
const EYEGLASS_LIVE = "src/components/custom/tabs/composables/useEyeglassLive.ts";
const SPRING_PRESETS = "src/composables/motion/springPresets.ts";

// The combined tabs CSS (the grammar + the eyeglass/drag decoration tail).
function combinedTabsCss() {
    return readFile(TABS_CSS) + "\n" + readFile(DRAG_CSS);
}

// ── E1 — the eyeglass axis is pill-gated + binds data-eyeglass.
export function detectEyeglassAxis(sfcRaw) {
    const violations = [];
    const facts = {};
    const sfc = sfcRaw ?? readFile(SFC);

    // The pill-only gate: `eyeglassOn` references `isUnderline` (pill-ONLY — a paper
    // hairline has no plate to loupe). BI.W-TABS-FACTOR retired the opt-in prop, so the
    // gate is `!isUnderline` (E9 asserts the prop's absence; E7 asserts default-on).
    const gateM = sfc.match(/eyeglassOn\s*=\s*computed\(\s*\(\)\s*=>\s*([^;]+)\)/);
    facts.eyeglassGate = gateM ? gateM[1].replace(/\s+/g, " ").trim() : null;
    facts.pillGated = !!facts.eyeglassGate && /isUnderline/.test(facts.eyeglassGate);
    if (!facts.pillGated) {
        violations.push("E1: the eyeglass axis is not pill-gated — the `eyeglassOn` computed must reference `isUnderline` (eyeglass is pill-ONLY; a paper hairline has no plate to loupe)");
    }

    facts.bindsDataAttr = /:data-eyeglass=/.test(sfc);
    if (!facts.bindsDataAttr) {
        violations.push("E1: the strip host does not bind `:data-eyeglass` (the CSS-read axis attribute)");
    }
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
    const tabs = stripCss(tabsRaw ?? combinedTabsCss());
    const refract = stripCss(refractRaw ?? readFile(REFRACT_CSS));

    // The SFC composes `.glass-lens` on the plate, gated by the eyeglass computed.
    facts.composesLens = /eyeglassOn\s*&&\s*['"]glass-lens['"]/.test(sfc);
    if (!facts.composesLens) {
        violations.push("E2: SegmentedTabs.vue does not compose `.glass-lens` onto the plate gated by `eyeglassOn` (the refraction is the shipped composed class, not a forked filter)");
    }

    facts.refractSupportsGate = /@supports\s*\(backdrop-filter:\s*url\(/.test(refract);
    if (!facts.refractSupportsGate) {
        violations.push("E2: glass-refract.css has no `@supports (backdrop-filter: url(#…))` gate — the honest degrade floor is gone (L3 mirror)");
    }

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

    facts.readsBakedFilter = /backdrop-filter:[^;]*var\(--glass-refract-filter\)/.test(tabs);
    if (facts.composesLens && facts.tabsSupportsGate && !facts.readsBakedFilter) {
        violations.push("E2: the eyeglass lens re-point does not read the shipped baked `var(--glass-refract-filter)` (compose the shipped lens; never re-author the filter graph)");
    }
    facts.hasScaleSplice =
        /url\([^)]*var\(--glass-refract\)/.test(tabs) || /url\(\s*["']?data:/.test(tabs);
    if (facts.hasScaleSplice) {
        violations.push("E2: segmented-tabs.css revives a var()-spliced/hand-authored refraction filter (DDR-LENS-BAKE — the scale is a baked literal; compose the shipped `--glass-refract-filter`)");
    }

    return { facts, violations };
}

// ── E3 — the geometry is COMPOSITOR (the plate scaleY), not a layout inset.
export function detectCompositorGeometry(dragRaw, tabsRaw) {
    const violations = [];
    const facts = {};
    const drag = stripCss(dragRaw ?? readFile(DRAG_CSS));
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));

    // A `[data-eyeglass]` rule that drives a LAYOUT property (inset/padding/size) off
    // `--eyeglass-proud` is the retired static-length proud (or a revived one) — a
    // per-frame LAYOUT animation proof:no-layout-animation forbids. The plate `scaleY`
    // is the ONLY loupe-outset path.
    facts.layoutProud =
        /\[data-eyeglass\][^{]*\{[^}]*(?:inset-block|inset|padding|block-size|inline-size|\bheight|\bwidth)[^;}]*var\(--eyeglass-proud/.test(drag);
    if (facts.layoutProud) {
        violations.push("E3: a `[data-eyeglass]` rule drives a LAYOUT property (inset/padding/size) off `--eyeglass-proud` — the two-rest-state proud is a COMPOSITOR `scaleY` on `.segmented-indicator__plate` ONLY (a length outset animates layout, forbidden)");
    }

    // The compositor channel: the plate `transform: scaleY(...)` on its OWN transform.
    facts.plateScaleY = /\.segmented-indicator__plate\s*\{[^}]*transform:\s*scaleY\(/.test(tabs);
    if (!facts.plateScaleY) {
        violations.push("E3: the `.segmented-indicator__plate` has no `transform: scaleY(...)` (the compositor magnify channel — the proud must NOT ride the outer squish `scale` / glide `transform`)");
    }

    // No CSS transition on the plate transform — useLeadTrail is the live animator; a
    // transition would double-filter the per-frame `--eyeglass-live-t` writes into a lag.
    const plateM = tabs.match(/\.segmented-indicator__plate\s*\{([^}]*)\}/);
    const plateBody = plateM ? plateM[1] : "";
    facts.plateNoTransition = !!plateM && !/transition:/.test(plateBody);
    if (plateM && !facts.plateNoTransition) {
        violations.push("E3: the `.segmented-indicator__plate` carries a `transition:` — the eyeglass magnify must have NO CSS transition (useLeadTrail is the live animator; a transition lags the per-frame live-t writes)");
    }

    return { facts, violations };
}

// ── E4 — the kinematics read the calibrated clock, distinct caps (caps at the promoted writer).
export function detectFrozenKinematics(writerRaw, constantsRaw, scalePaperRaw, dragRaw) {
    const violations = [];
    const facts = {};
    const writer = writerRaw ?? readFile(INDICATOR_WRITER);
    const constants = constantsRaw ?? readFile(CONSTANTS);
    const scalePaper = stripCss(scalePaperRaw ?? readFile(SCALE_PAPER));
    const drag = stripCss(dragRaw ?? readFile(DRAG_CSS));

    facts.tokenDuration =
        /--tab-indicator-duration:\s*var\(--spring-snappy-duration\)\s*;/.test(scalePaper);
    if (!facts.tokenDuration) {
        violations.push("E4: --tab-indicator-duration is not `var(--spring-snappy-duration)` (the calibrated clock token — the underline reads it; the eyeglass mode does NOT re-time the clock)");
    }

    // The caps live in the PROMOTED writer; constants.ts re-exports them (the ONE source).
    const stretchConstM = writer.match(/DEFAULT_INDICATOR_MAX_STRETCH\s*=\s*([\d.]+)\b/);
    const blobConstM = writer.match(/DEFAULT_INDICATOR_BLOB_MAX\s*=\s*([\d.]+)\b/);
    facts.stretchConst = stretchConstM ? Number(stretchConstM[1]) : null;
    facts.blobConst = blobConstM ? Number(blobConstM[1]) : null;
    facts.constantsReExports =
        /DEFAULT_INDICATOR_MAX_STRETCH/.test(constants) && /useSelectionIndicator/.test(constants);
    if (!facts.constantsReExports) {
        violations.push("E4: constants.ts does not re-export the caps from useSelectionIndicator (the ONE source — the promoted writer owns the literals; BI.W-DOCK-CONTROLS)");
    }

    const stretchTokenM = scalePaper.match(/--tab-indicator-max-stretch:\s*([\d.]+)\s*;/);
    const blobTokenM = scalePaper.match(/--tab-indicator-blob-max:\s*([\d.]+)\s*;/);
    facts.stretchToken = stretchTokenM ? Number(stretchTokenM[1]) : null;
    facts.blobToken = blobTokenM ? Number(blobTokenM[1]) : null;

    const BLOB_AXIS_CAP = Math.sqrt(1.14); // ≈ 1.0677
    if (facts.stretchConst == null || facts.stretchToken == null) {
        violations.push("E4: the stretch cap (DEFAULT_INDICATOR_MAX_STRETCH / --tab-indicator-max-stretch) is missing");
    } else {
        if (facts.stretchConst !== facts.stretchToken) {
            violations.push(`E4: the stretch cap FORKED — writer ${facts.stretchConst} ≠ --tab-indicator-max-stretch ${facts.stretchToken} (the SOLE cap source, never a fork)`);
        }
        if (facts.stretchConst > 1.2 || facts.stretchConst < 1.0) {
            violations.push(`E4: the stretch cap ${facts.stretchConst} is out of the [1.0, 1.2] anti-taffy band`);
        }
    }
    if (facts.blobConst == null || facts.blobToken == null) {
        violations.push("E4: the blob cap (DEFAULT_INDICATOR_BLOB_MAX / --tab-indicator-blob-max) is missing");
    } else {
        if (facts.blobConst !== facts.blobToken) {
            violations.push(`E4: the blob cap FORKED — writer ${facts.blobConst} ≠ --tab-indicator-blob-max ${facts.blobToken} (the SOLE cap source)`);
        }
        if (facts.blobConst > BLOB_AXIS_CAP + 1e-9) {
            violations.push(`E4: the blob cap ${facts.blobConst} exceeds the per-axis AREA cap √1.14 ≈ ${BLOB_AXIS_CAP.toFixed(4)} (blob² would exceed the 1.14 anti-taffy fence — STRETCH ≤1.2 and BLOB area ≤1.14 are DISTINCT caps)`);
        }
    }

    // The eyeglass block re-times NOTHING: no --tab-indicator-duration override / hand
    // linear()/cubic-bezier under [data-eyeglass] (the glide rides the --spring-eyeglass
    // TOKEN in the BASE --js rule, a generated curve, never a hand-authored one).
    const eyeglassRules = [...drag.matchAll(/\[data-eyeglass\][^{]*\{([^}]*)\}/g)]
        .map((m) => m[1])
        .join("\n");
    facts.eyeglassReTimes =
        /--tab-indicator-duration:/.test(eyeglassRules) ||
        /\blinear\(/.test(eyeglassRules) ||
        /\bcubic-bezier\(/.test(eyeglassRules);
    if (facts.eyeglassReTimes) {
        violations.push("E4: the eyeglass block overrides the clock / introduces a hand linear()/cubic-bezier spring (the clock/curve are token-sourced — the pill glide rides --spring-eyeglass, a generated token)");
    }

    return { facts, violations };
}

// ── E5 — the accent is FLOOD+RIM + the CONTRAST-SPLIT glyph ink (label AA, glyph on descendant svg).
export function detectAccentInk(tabsRaw) {
    const violations = [];
    const facts = {};
    const tabs = stripCss(tabsRaw ?? combinedTabsCss());

    facts.labelColor = null;
    const activeRe = /\.segmented-tab\[aria-pressed="true"\]([^{]*)\{([^}]*)\}/g;
    let am;
    while ((am = activeRe.exec(tabs)) !== null) {
        const tail = am[1];
        const body = am[2];
        const colorM = body.match(/(?:^|[^-])color:\s*([^;]+);/);
        if (!colorM) continue;
        const isGlyphRule = /\bsvg\b/.test(tail);
        if (isGlyphRule) {
            facts.glyphColor = colorM[1].trim();
            if (!/var\(--tab-selected-ink\s*,\s*var\(--foreground\)\s*\)/.test(colorM[1])) {
                violations.push(`E5: the selected-glyph ink is not var(--tab-selected-ink, var(--foreground)) (the no-op default): '${colorM[1].trim()}'`);
            }
            continue;
        }
        if (facts.labelColor == null) facts.labelColor = colorM[1].trim();
        if (/var\(--tab-selected-ink/.test(colorM[1])) {
            violations.push("E5: `--tab-selected-ink` is written on the TAB's own `color` (the LABEL) — AC4 forbids it; the glyph tint MUST live on a DESCENDANT `svg` selector, the label stays --foreground");
        }
    }
    if (!facts.labelColor) {
        violations.push("E5: the active-tab LABEL color rule (.segmented-tab[aria-pressed=\"true\"] { color }) not found");
    } else if (!/var\(--foreground\)/.test(facts.labelColor)) {
        violations.push(`E5: the active-tab LABEL is not --foreground (the AA 4.5:1 anchor / T5): '${facts.labelColor}'`);
    }

    facts.glyphSeam =
        /\.segmented-tabs\[data-eyeglass\][^{]*\.segmented-tab\[aria-pressed="true"\][^{]*\bsvg\b[^{]*\{[^}]*var\(--tab-selected-ink/.test(tabs);
    if (!facts.glyphSeam) {
        violations.push("E5: the selected-GLYPH accent-ink seam is not on a `[data-eyeglass] .segmented-tab[aria-pressed=\"true\"] svg` descendant rule reading `--tab-selected-ink` (C7/AC4 — the CONTRAST-SPLIT glyph ink)");
    }

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
    const tabs = stripCss(tabsRaw ?? combinedTabsCss());
    const withComments = tabsRawWithComments ?? combinedTabsCss();

    facts.fakedImage = /background(?:-image)?:[^;]*url\(\s*["']?data:image/.test(tabs);
    if (facts.fakedImage) {
        violations.push("E6: segmented-tabs.css paints a pre-baked `url(data:image…)` background/mask (a faked 'magnified' loupe — NO-MASKING-FALLBACK)");
    }
    facts.brokenUrl = /(?<!backdrop-filter:[^;]{0,200})filter:\s*url\(#glass-refract/.test(tabs);
    if (facts.brokenUrl) {
        violations.push("E6: segmented-tabs.css uses a REGULAR `filter: url(#glass-refract)` (WebKit bug 245510 — the lens is a `backdrop-filter` composed via `.glass-lens`, never a regular filter fake)");
    }

    facts.recordPresent =
        /BG\.W-EYEGLASS-TABS/.test(withComments) &&
        /HONEST DEGRADE/i.test(withComments) &&
        /BOOKED/.test(withComments);
    if (!facts.recordPresent) {
        violations.push("E6: the honest-degrade + booked-successor record is missing from segmented-tabs.css (the NF-honest posture: the Safari capsule floor + the booked successors)");
    }

    return { facts, violations };
}

// ── E7 — DEFAULT-is-eyeglass (no opt-in prop) + the eyeglass SPRING_PRESETS row.
export function detectDefault(sfcRaw, springRaw) {
    const violations = [];
    const facts = {};
    const sfc = sfcRaw ?? readFile(SFC);
    const spring = springRaw ?? readFile(SPRING_PRESETS);

    const gateM = sfc.match(/eyeglassOn\s*=\s*computed\(\s*\(\)\s*=>\s*([^;]+)\)/);
    const gate = gateM ? gateM[1] : "";
    facts.defaultOn = !!gateM && /!\s*isUnderline/.test(gate) && !/props\.eyeglass/.test(gate);
    if (!facts.defaultOn) {
        violations.push("E7: the pill is not eyeglass-by-DEFAULT — `eyeglassOn` must be `!isUnderline` with NO `props.eyeglass` term (the default flip; the flat pill is only the degrade/PRM floor, not an opt-in)");
    }

    // The eyeglass SPRING_PRESETS row in the measured band (TABS-GLASS-LADDER §8.2).
    const rowM = spring.match(
        /name:\s*["']eyeglass["']\s*,\s*response:\s*([\d.]+)\s*,\s*dampingFraction:\s*([\d.]+)/,
    );
    facts.springResponse = rowM ? Number(rowM[1]) : null;
    facts.springDamping = rowM ? Number(rowM[2]) : null;
    if (!rowM) {
        violations.push("E7: the `eyeglass` SPRING_PRESETS row is missing (the loupe travel is its OWN measured register — POST-M1, the row is honest)");
    } else {
        if (facts.springResponse < 0.32 || facts.springResponse > 0.4) {
            violations.push(`E7: the eyeglass response ${facts.springResponse} is out of the measured [0.32, 0.40] band (TABS-GLASS-LADDER §8.2)`);
        }
        if (facts.springDamping < 0.6 || facts.springDamping > 0.85) {
            violations.push(`E7: the eyeglass ζ ${facts.springDamping} is out of the measured [0.6, 0.85] band`);
        }
    }
    return { facts, violations };
}

// ── E8 — the sizing axis resolves + bounds (ratios + @property + interpolation + read).
export function detectSizingAxis(dragRaw, tabsRaw, regsRaw) {
    const violations = [];
    const facts = {};
    const drag = stripCss(dragRaw ?? readFile(DRAG_CSS));
    const tabs = stripCss(tabsRaw ?? readFile(TABS_CSS));
    const regs = stripCss(regsRaw ?? readFile(PROPERTY_REGS));

    // A LENGTH `--eyeglass-proud` is the retired layout-inset form.
    facts.proudIsLength = /--eyeglass-proud:\s*[\d.]+(?:rem|px|em)\s*;/.test(drag);
    if (facts.proudIsLength) {
        violations.push("E8: `--eyeglass-proud` is a LENGTH — the two-rest-state is a COMPOSITOR scale RATIO (a length inset is a LAYOUT property proof:no-layout-animation forbids animating)");
    }

    const settledM = drag.match(/--eyeglass-settled:\s*([\d.]+)\s*;/);
    const proudM = drag.match(/--eyeglass-proud:\s*([\d.]+)\s*;/);
    facts.settled = settledM ? Number(settledM[1]) : null;
    facts.proud = proudM ? Number(proudM[1]) : null;
    if (facts.settled == null) {
        violations.push("E8: `--eyeglass-settled` (the SETTLED inset ratio) is not declared");
    } else if (facts.settled < 0.75 || facts.settled > 0.95) {
        violations.push(`E8: --eyeglass-settled ${facts.settled} out of the measured [0.75, 0.95] band (§1: 0.80–0.88×)`);
    }
    if (facts.proud == null) {
        violations.push("E8: `--eyeglass-proud` (the LIVE proud ratio; the retune knob) is not declared as a bare ratio");
    } else if (facts.proud < 1.05 || facts.proud > 1.25) {
        violations.push(`E8: --eyeglass-proud ${facts.proud} out of the measured [1.05, 1.25] band (§1: 1.07–1.18×)`);
    }

    // --eyeglass-live-t registered @property <number>, inherits, initial 0.
    const regM = regs.match(/@property\s+--eyeglass-live-t\s*\{([^}]*)\}/);
    const regBody = regM ? regM[1] : "";
    facts.liveTRegistered =
        !!regM && /syntax:\s*"<number>"/.test(regBody) && /initial-value:\s*0\b/.test(regBody);
    if (!facts.liveTRegistered) {
        violations.push("E8: `--eyeglass-live-t` is not registered as `@property { syntax: \"<number>\"; initial-value: 0 }` (the safe SETTLED rest — a bare unregistered var snaps + a non-supporting engine paints broken)");
    }

    // --eyeglass-y calc interpolates SETTLED→PROUD on --eyeglass-live-t.
    const yM = drag.match(/--eyeglass-y:\s*calc\(([^;]+)\)\s*;/);
    const yBody = yM ? yM[1] : "";
    facts.yInterpolates =
        !!yM &&
        /var\(--eyeglass-live-t\)/.test(yBody) &&
        /var\(--eyeglass-settled\)/.test(yBody) &&
        /var\(--eyeglass-proud\)/.test(yBody);
    if (!facts.yInterpolates) {
        violations.push("E8: `--eyeglass-y` does not interpolate SETTLED→PROUD on `--eyeglass-live-t` (the calc must read all three: --eyeglass-live-t, --eyeglass-settled, --eyeglass-proud)");
    }

    // The plate transform CONSUMES --eyeglass-y (the axis is wired, not dead-on-mint).
    facts.plateReadsY =
        /\.segmented-indicator__plate\s*\{[^}]*transform:\s*scaleY\(\s*var\(--eyeglass-y/.test(tabs);
    if (!facts.plateReadsY) {
        violations.push("E8: the `.segmented-indicator__plate` transform does not read `scaleY(var(--eyeglass-y))` (the sizing axis is declared but dead — the plate must consume it)");
    }

    return { facts, violations };
}

// ── E9 — the culled variants are DEFINITION-ABSENT (the opt-in prop retired; two materials).
export function detectCulledVariants(sfcRaw) {
    const violations = [];
    const facts = {};
    // Strip comments — the presence of a RETIRED prop is a CODE fact, never a prose fact
    // (the SFC doc-comment names `eyeglass?: boolean` to record its retirement).
    const sfc = stripJsComments(sfcRaw ?? readFile(SFC));

    facts.hasProp = /eyeglass\?\s*:\s*boolean/.test(sfc);
    if (facts.hasProp) {
        violations.push("E9: the `eyeglass?: boolean` opt-in prop SURVIVES — it is RETIRED (clean break; eyeglass is the default per E7). A named opt-in is the 'million variants' the mandate kills");
    }
    facts.readsProp = /props\.eyeglass\b/.test(sfc);
    if (facts.readsProp) {
        violations.push("E9: `props.eyeglass` is still referenced (the retired prop) — the pill is eyeglass by construction, no prop read");
    }
    facts.defaultFalse = /eyeglass:\s*false/.test(sfc);
    if (facts.defaultFalse) {
        violations.push("E9: `eyeglass: false` survives in withDefaults (the retired prop default)");
    }

    const variantM = sfc.match(/export type SegmentedTabsVariant\s*=\s*([^;]+);/);
    facts.variantUnion = variantM ? variantM[1].replace(/\s+/g, " ").trim() : null;
    facts.twoMaterialsOnly =
        !!facts.variantUnion &&
        /"pill"/.test(facts.variantUnion) &&
        /"underline"/.test(facts.variantUnion) &&
        !/segmented|scroll|solid|flat|proud|loupe/i.test(facts.variantUnion);
    if (!facts.twoMaterialsOnly) {
        violations.push('E9: SegmentedTabsVariant is not EXACTLY the two materials `"pill" | "underline"` (the variant cull — every "essentially the same" intermediate retires with MIGRATION rows)');
    }

    return { facts, violations };
}

// ── E10 — useLeadTrail CONSUMED, no second integrator (the dual-path bite).
export function detectLeadTrail(liveRaw, sfcRaw) {
    const violations = [];
    const facts = {};
    const live = liveRaw ?? readFile(EYEGLASS_LIVE);
    const sfc = sfcRaw ?? readFile(SFC);

    facts.composableExists = live.length > 0;
    if (!facts.composableExists) {
        violations.push("E10: useEyeglassLive.ts is missing (the eyeglass two-rest-state release composable)");
        return { facts, violations };
    }

    facts.importsLeadTrail =
        /import\s*\{[^}]*useLeadTrail[^}]*\}\s*from\s*["'][^"']*useLeadTrail/.test(live);
    if (!facts.importsLeadTrail) {
        violations.push("E10: useEyeglassLive does not import `useLeadTrail` (the ONE lead/trail integrator — consumer #2; the R9 dual-path fence)");
    }
    facts.usesLeadTrail =
        /useLeadTrail\s*\(/.test(live) &&
        /\.drive\(/.test(live) &&
        /\.seat\(/.test(live) &&
        /onFrame\s*[({]/.test(live);
    if (!facts.usesLeadTrail) {
        violations.push("E10: useEyeglassLive does not CONSUME useLeadTrail (must call it + drive() + seat() + onFrame — the two-edge integrator, not a shim)");
    }

    facts.readsSpringRow = /springPreset\(\s*["']eyeglass["']\s*\)/.test(live);
    if (!facts.readsSpringRow) {
        violations.push('E10: useEyeglassLive does not read `springPreset("eyeglass")` (the (response, ζ) MUST come from the ONE SPRING_PRESETS table — a hand-inlined pair is the M1 fork)');
    }

    // THE DUAL-PATH BITE — no own rAF/interval integrator (a dwell `setTimeout` is a
    // discrete hold, NOT an integrator, and is allowed).
    facts.noSecondIntegrator =
        !/requestAnimationFrame\s*\(/.test(live) && !/setInterval\s*\(/.test(live);
    if (!facts.noSecondIntegrator) {
        violations.push("E10: useEyeglassLive owns a `requestAnimationFrame`/`setInterval` integrator — the release MUST route through useLeadTrail's ONE rAF (no second integrator)");
    }

    facts.sfcWires = /useEyeglassLive\s*\(/.test(sfc);
    if (!facts.sfcWires) {
        violations.push("E10: SegmentedTabs.vue does not wire `useEyeglassLive` (the release is unwired)");
    }

    return { facts, violations };
}

// ── Self-test bites — each planted defect MUST flag its clause (the anti-evasion floor).
export function selfTest() {
    const fails = [];

    const goodSfc = `
        export type SegmentedTabsVariant = "pill" | "underline";
        const eyeglassOn = computed(() => !isUnderline.value);
        :data-eyeglass="eyeglassOn ? '' : undefined"
        eyeglassOn && 'glass-lens',
        const eyeglass = useEyeglassLive({ indicatorRef, enabled: eyeglassOn });
    `;
    const goodRefract = '@supports (backdrop-filter: url("#glass-refract")) { .glass-lens { backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter); } }';
    const goodDrag = `
        .segmented-tabs[data-eyeglass] { --eyeglass-settled: 0.84; --eyeglass-proud: 1.12; --eyeglass-track-blur: var(--glass-blur-floating); backdrop-filter: var(--eyeglass-track-blur); }
        .segmented-tabs[data-eyeglass] .segmented-indicator__plate { --eyeglass-y: calc(var(--eyeglass-settled) + var(--eyeglass-live-t) * (var(--eyeglass-proud) - var(--eyeglass-settled))); }
        @media (prefers-reduced-motion: reduce) { .segmented-tabs[data-eyeglass] .segmented-indicator__plate { --eyeglass-y: 1; } }
        @supports (backdrop-filter: url("#glass-refract")) { .segmented-tabs[data-eyeglass] .segmented-indicator__plate.glass-lens { backdrop-filter: var(--glass-blur-floating) var(--glass-refract-filter); } }
        .segmented-tabs[data-eyeglass] .segmented-tab[aria-pressed="true"] svg { color: var(--tab-selected-ink, var(--foreground)); }
        HONEST DEGRADE BG.W-EYEGLASS-TABS BOOKED --tab-flood-t
    `;
    const goodTabs = `
        .segmented-indicator__plate { position: absolute; inset: 0; border-radius: inherit; transform-origin: center; transform: scaleY(var(--eyeglass-y, 1)); }
        .segmented-tab[aria-pressed="true"] { color: var(--foreground); }
        @supports (backdrop-filter: url("#glass-refract")) { .segmented-tabs[data-eyeglass] .segmented-indicator__plate.glass-lens { backdrop-filter: var(--glass-blur-floating) var(--glass-refract-filter); } }
    `;
    const goodWriter = "export const DEFAULT_INDICATOR_MAX_STRETCH = 1.11;\nexport const DEFAULT_INDICATOR_BLOB_MAX = 1.045;";
    const goodConstants = 'export { DEFAULT_INDICATOR_MAX_STRETCH, DEFAULT_INDICATOR_BLOB_MAX } from "../../../composables/motion/useSelectionIndicator";';
    const goodScale = "--tab-indicator-max-stretch: 1.11;\n--tab-indicator-blob-max: 1.045;\n--tab-indicator-duration: var(--spring-snappy-duration);";
    const goodRegs = '@property --eyeglass-live-t { syntax: "<number>"; inherits: true; initial-value: 0; }';
    const goodSpring = '{ name: "eyeglass", response: 0.36, dampingFraction: 0.64, comment: "x" },';
    const goodLive = `
        import { useLeadTrail } from "../../../../composables/motion/useLeadTrail";
        import { springPreset } from "../../../../composables/motion/springPresets";
        const EYEGLASS_SPRING = springPreset("eyeglass");
        const live = useLeadTrail({ onFrame({ hi }) { el.style.setProperty("--eyeglass-live-t", String(hi)); } });
        live.drive(1); live.seat(0); setTimeout(() => {}, 320);
    `;

    // The good fixtures pass every clause.
    if (detectEyeglassAxis(goodSfc).violations.length !== 0) fails.push("self-test E1: the good SFC unexpectedly red");
    if (detectLensCompose(goodSfc, goodTabs + goodDrag, goodRefract).violations.length !== 0) fails.push("self-test E2: the good compose unexpectedly red");
    if (detectCompositorGeometry(goodDrag, goodTabs).violations.length !== 0) fails.push("self-test E3: the good compositor geometry unexpectedly red");
    if (detectFrozenKinematics(goodWriter, goodConstants, goodScale, goodDrag).violations.length !== 0) fails.push("self-test E4: the good kinematics unexpectedly red");
    if (detectAccentInk(goodTabs + goodDrag).violations.length !== 0) fails.push("self-test E5: the good accent-ink unexpectedly red");
    if (detectHonestDegrade(goodTabs + goodDrag, goodTabs + goodDrag).violations.length !== 0) fails.push("self-test E6: the good honest-degrade unexpectedly red");
    if (detectDefault(goodSfc, goodSpring).violations.length !== 0) fails.push("self-test E7: the good default+spring unexpectedly red");
    if (detectSizingAxis(goodDrag, goodTabs, goodRegs).violations.length !== 0) fails.push("self-test E8: the good sizing axis unexpectedly red");
    if (detectCulledVariants(goodSfc).violations.length !== 0) fails.push("self-test E9: the good culled-variants unexpectedly red");
    if (detectLeadTrail(goodLive, goodSfc).violations.length !== 0) fails.push("self-test E10: the good lead-trail unexpectedly red");

    // E1 — a gate not referencing isUnderline reds.
    const noGateSfc = `const eyeglassOn = computed(() => props.eyeglass); :data-eyeglass="eyeglassOn ? '' : undefined"`;
    if (detectEyeglassAxis(noGateSfc).violations.length === 0) fails.push("self-test E1: a non-pill-gated eyeglassOn did NOT red");

    // E2 — a refraction backdrop-filter OUTSIDE the @supports gate reds.
    const leakTabs = ".segmented-indicator__plate.glass-lens { backdrop-filter: var(--glass-blur-floating) var(--glass-refract-filter); } @supports (backdrop-filter: url(#glass-refract)) { .x { color: red; } }";
    if (detectLensCompose(goodSfc, leakTabs, goodRefract).violations.length === 0) fails.push("self-test E2: a refraction backdrop-filter OUTSIDE the @supports gate did NOT red");

    // E3 — a LAYOUT proud (inset-block off --eyeglass-proud) reds.
    const layoutProudDrag = goodDrag + "\n.segmented-tabs[data-eyeglass] .segmented-indicator--js { inset-block: calc(var(--bouncy-track-trim) - var(--eyeglass-proud)); }";
    if (detectCompositorGeometry(layoutProudDrag, goodTabs).violations.length === 0) fails.push("self-test E3: a LAYOUT inset proud off --eyeglass-proud did NOT red");
    // E3b — a transition on the plate reds.
    const platedTransition = goodTabs.replace("transform: scaleY(var(--eyeglass-y, 1));", "transform: scaleY(var(--eyeglass-y, 1)); transition: transform 300ms;");
    if (detectCompositorGeometry(goodDrag, platedTransition).violations.length === 0) fails.push("self-test E3: a transition on the plate did NOT red");

    // E4 — a blob-max past its area cap reds.
    const bigBlobWriter = "export const DEFAULT_INDICATOR_MAX_STRETCH = 1.11;\nexport const DEFAULT_INDICATOR_BLOB_MAX = 1.09;";
    const bigBlobScale = "--tab-indicator-max-stretch: 1.11;\n--tab-indicator-blob-max: 1.09;\n--tab-indicator-duration: var(--spring-snappy-duration);";
    if (detectFrozenKinematics(bigBlobWriter, goodConstants, bigBlobScale, goodDrag).violations.length === 0) fails.push("self-test E4: a blob-max 1.09 past √1.14 did NOT red");
    // E4b — an eyeglass-block clock override reds.
    const clockDrag = goodDrag + "\n.segmented-tabs[data-eyeglass] { --tab-indicator-duration: 999ms; }";
    if (detectFrozenKinematics(goodWriter, goodConstants, goodScale, clockDrag).violations.length === 0) fails.push("self-test E4: an eyeglass-block --tab-indicator-duration override did NOT red");

    // E5 — a glyph tint on the TAB color (not a descendant svg) reds.
    const tabColorTint = `.segmented-tabs[data-eyeglass] .segmented-tab[aria-pressed="true"] { color: var(--tab-selected-ink, var(--foreground)); }\n--tab-flood-t: 0;`;
    if (detectAccentInk(tabColorTint).violations.length === 0) fails.push("self-test E5: a --tab-selected-ink on the TAB color did NOT red");

    // E6 — a pre-baked magnified-image fake reds.
    const fakeImage = goodTabs + goodDrag + '\n.segmented-indicator__plate { background-image: url("data:image/svg+xml,..."); }';
    if (detectHonestDegrade(fakeImage, fakeImage).violations.length === 0) fails.push("self-test E6: a pre-baked url(data:image…) fake did NOT red");

    // E7 — a props.eyeglass-bearing gate (opt-in default) reds default-on; an out-of-band spring reds.
    const optInSfc = `const eyeglassOn = computed(() => props.eyeglass && !isUnderline.value);`;
    if (detectDefault(optInSfc, goodSpring).violations.length === 0) fails.push("self-test E7: an opt-in (props.eyeglass) gate did NOT red default-on");
    const badSpring = '{ name: "eyeglass", response: 0.6, dampingFraction: 0.64 },';
    if (detectDefault(goodSfc, badSpring).violations.length === 0) fails.push("self-test E7: an out-of-band eyeglass response did NOT red");

    // E8 — a LENGTH --eyeglass-proud reds; a missing @property reds; a dead calc reds.
    const lengthProudDrag = goodDrag.replace("--eyeglass-proud: 1.12;", "--eyeglass-proud: 0.3rem;");
    if (detectSizingAxis(lengthProudDrag, goodTabs, goodRegs).violations.length === 0) fails.push("self-test E8: a LENGTH --eyeglass-proud did NOT red");
    if (detectSizingAxis(goodDrag, goodTabs, "").violations.length === 0) fails.push("self-test E8: a missing @property --eyeglass-live-t did NOT red");
    const deadY = goodDrag.replace(/--eyeglass-y:\s*calc\([^;]+\);/, "--eyeglass-y: 1;");
    if (detectSizingAxis(deadY, goodTabs, goodRegs).violations.length === 0) fails.push("self-test E8: a dead --eyeglass-y (no live-t) did NOT red");

    // E9 — a surviving eyeglass?: boolean prop reds; a third variant reds.
    const propSfc = goodSfc + "\n    eyeglass?: boolean;\n    eyeglass: false,";
    if (detectCulledVariants(propSfc).violations.length === 0) fails.push("self-test E9: a surviving eyeglass?: boolean prop did NOT red");
    const threeVariantSfc = `export type SegmentedTabsVariant = "pill" | "segmented" | "underline";`;
    if (detectCulledVariants(threeVariantSfc).violations.length === 0) fails.push("self-test E9: a third (segmented) variant did NOT red");

    // E10 — a second integrator (requestAnimationFrame) reds; a hand-inlined pair reds.
    const rafLive = goodLive + "\nrequestAnimationFrame(step);";
    if (detectLeadTrail(rafLive, goodSfc).violations.length === 0) fails.push("self-test E10: a requestAnimationFrame in useEyeglassLive did NOT red");
    const noSpringLive = goodLive.replace('springPreset("eyeglass")', "{ response: 0.36, dampingFraction: 0.64 }");
    if (detectLeadTrail(noSpringLive, goodSfc).violations.length === 0) fails.push("self-test E10: a hand-inlined (response, ζ) pair (no springPreset) did NOT red");

    return fails;
}

export function detect() {
    const axis = detectEyeglassAxis();
    const lens = detectLensCompose();
    const geometry = detectCompositorGeometry();
    const kinematics = detectFrozenKinematics();
    const accent = detectAccentInk();
    const degrade = detectHonestDegrade();
    const dflt = detectDefault();
    const sizing = detectSizingAxis();
    const culled = detectCulledVariants();
    const leadTrail = detectLeadTrail();
    const selfTestFails = selfTest();
    const violations = [
        ...axis.violations,
        ...lens.violations,
        ...geometry.violations,
        ...kinematics.violations,
        ...accent.violations,
        ...degrade.violations,
        ...dflt.violations,
        ...sizing.violations,
        ...culled.violations,
        ...leadTrail.violations,
        ...selfTestFails.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            axis: axis.facts,
            lens: lens.facts,
            geometry: geometry.facts,
            kinematics: kinematics.facts,
            accent: accent.facts,
            degrade: degrade.facts,
            default: dflt.facts,
            sizing: sizing.facts,
            culled: culled.facts,
            leadTrail: leadTrail.facts,
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

    console.log("proof:eyeglass-tabs — the iOS-27 eye-glass loupe as THE tabs default (BG.W-EYEGLASS-TABS + BI.W-TABS-FACTOR)");
    console.log(`  E1 pill-gated axis: gate=${facts.axis.pillGated} data-attr=${facts.axis.dataAttrFromGate}`);
    console.log(`  E2 lens composed  : composes=${facts.lens.composesLens} @supports=${facts.lens.tabsSupportsGate} baked=${facts.lens.readsBakedFilter} no-leak=${!facts.lens.refractOutsideGate}`);
    console.log(`  E3 compositor geo : plate-scaleY=${facts.geometry.plateScaleY} no-layout-proud=${!facts.geometry.layoutProud} no-transition=${facts.geometry.plateNoTransition}`);
    console.log(`  E4 clock + caps   : clock=${facts.kinematics.tokenDuration} stretch=${facts.kinematics.stretchConst} blob=${facts.kinematics.blobConst} re-times=${facts.kinematics.eyeglassReTimes}`);
    console.log(`  E5 accent ink     : label=${facts.accent.labelColor ?? "MISSING"} glyph-seam=${facts.accent.glyphSeam} flood=${facts.accent.floodRegister}`);
    console.log(`  E6 honest degrade : no-fake-image=${!facts.degrade.fakedImage} record=${facts.degrade.recordPresent}`);
    console.log(`  E7 default+spring : default-on=${facts.default.defaultOn} spring=(${facts.default.springResponse}, ${facts.default.springDamping})`);
    console.log(`  E8 sizing axis    : settled=${facts.sizing.settled} proud=${facts.sizing.proud} @property=${facts.sizing.liveTRegistered} interp=${facts.sizing.yInterpolates} plate-reads=${facts.sizing.plateReadsY}`);
    console.log(`  E9 variant cull   : no-prop=${!facts.culled.hasProp} two-materials=${facts.culled.twoMaterialsOnly}`);
    console.log(`  E10 lead/trail    : imports=${facts.leadTrail.importsLeadTrail} consumes=${facts.leadTrail.usesLeadTrail} spring-row=${facts.leadTrail.readsSpringRow} no-2nd-integrator=${facts.leadTrail.noSecondIntegrator} wired=${facts.leadTrail.sfcWires}`);
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
