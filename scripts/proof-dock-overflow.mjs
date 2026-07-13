#!/usr/bin/env node
// BI.W-DOCK-OVERFLOW — proof:dock-overflow, the born-RED native-scroll + fisheye-iff-fits
// gate (PASS-1 §2.5, PASS-4B ruling 1, G4/G9 CLOSED; discharges UF-C8).
//
// The overflow defect (UF-C8 — "click an element in a scrolled dock, it should scroll you
// to see more … how many elements remain and are hidden"): the module had NO `scrollIntoView`
// call anywhere, the cross axis was clipped by an `overflow-clip-margin` band-aid + a NO-OP
// `overflow-y: clip` pin, and the mask shaved flush focus-ring arcs at rest (T-52 a). The
// greenfield fix is a DISTINCT native inline scroll track (`overflow-x: auto`) + the
// `<FadingScroll>` edge mask + `scrollIntoView`-on-select (the CALL in useSelectionGroup,
// the FACILITY here) + `scroll-padding-inline` gutter; fisheye is the EXCLUSIVE-mode
// enhancement (iff the row FITS — never composed with scroll).
//
// PURE DEVICE-FREE static src-scan (CSS + TS scans; no browser, no GPU). Runs on EVERY
// runner → `tags: ["local","ci"]`.
//
// CLAUSES (born-RED on the pre-wave tree — no scrollIntoView, `overflow-clip-margin` live,
// no fisheye.css, no `--dock-pill-h`):
//   O1 scroll-into-view    — useSelectionGroup fires `scrollIntoView({inline:'nearest'})`
//                            AND the scroll port carries `scroll-padding-inline` (the gutter).
//   O2 native-scroll-facility — `overflow-x: auto` + the FadingScroll mask, ZERO
//                            `overflow-clip-margin`, ZERO cross-axis clip on the interactive
//                            run (cross axis honestly `visible`), + `mask-image: none` at
//                            rest (T-52 a) + the `--dock-scroll-safe-inset` ring-room (T-52 b).
//   O3 fisheye-iff-fits    — the fisheye Gaussian scale engages ONLY under
//                            `:not([data-dock-overflow])`; a scrollable row carries NO
//                            magnify scale (exclusive-mode ruling, never composed).
//   O4 fisheye-hit-box-invariant — the fisheye is transform/scale ONLY (ZERO layout
//                            property), `(hover: hover) and (pointer: fine)`-gated, PRM → off.
//   O5 indicator-is-scroll-child (G9) — ZERO `scroll` listener in the overflow/fit/fisheye/
//                            indicator path; the fit measure is RO-driven; the indicator
//                            measures in CONTENT coords (offsetLeft/offsetTop → travels with
//                            scroll, no ancestor-positioned overlay clipping at port ends).
//   T-52 c — `--dock-pill-h` is declared at `:root` (the ONE authoritative exported rung).
//
// Self-test bites (each planted defect MUST flag): a synthetic fisheye-on-a-scrollable-row
// REDs O3; a synthetic re-added `overflow-clip-margin` REDs O2; a synthetic layout-property
// fisheye REDs O4.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const ROOT = resolve(HERE, "../..");

const PATHS = {
    ROOT,
    OVERFLOW_CSS: resolve(ROOT, "src/styles/dock/overflow.css"),
    FISHEYE_CSS: resolve(ROOT, "src/styles/dock/fisheye.css"),
    SIZING_CSS: resolve(ROOT, "src/styles/tokens/sizing.css"),
    SELECTION_GROUP: resolve(ROOT, "src/composables/motion/useSelectionGroup.ts"),
    SELECTION_INDICATOR: resolve(ROOT, "src/composables/motion/useSelectionIndicator.ts"),
    OVERFLOW_FIT: resolve(ROOT, "src/components/custom/dock/composables/useDockOverflowFit.ts"),
    FISHEYE_TS: resolve(ROOT, "src/components/custom/dock/composables/useDockFisheye.ts"),
    ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_OVERFLOW_ARTIFACT", "dock-overflow"),
};

/** Blank CSS comments (the house stripComments idiom). */
function stripCssComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}
/** Blank TS line + block comments (URL-safe `//` strip — the clause-7 house idiom). */
function stripTsComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}
const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/** Extract `{ selector, body }` rule pairs from CSS (comments stripped). Selectors start
 *  with `.`/`#`/`[`, so `@media`/`@property` wrappers are skipped and their inner rules are
 *  captured individually (the fisheye Gaussian rule keeps its real selector). */
function cssRules(text) {
    const out = [];
    for (const m of text.matchAll(/([.#\[][^{}]*?)\{([^{}]*?)\}/g)) {
        out.push({ sel: m[1].replace(/\s+/g, " ").trim(), body: m[2] });
    }
    return out;
}

// ── O1 — scroll-into-view (the CALL + the FACILITY gutter) ───────────────────────
function checkO1({ selectionGroupText, overflowCssText }) {
    const violations = [];
    const facts = {};
    const grp = stripTsComments(selectionGroupText);
    const css = stripCssComments(overflowCssText);

    const firesScrollIntoView =
        /scrollIntoView\s*\(/.test(grp) && /inline\s*:\s*["']nearest["']/.test(grp);
    facts.o1FiresScrollIntoView = firesScrollIntoView;
    if (!firesScrollIntoView) {
        violations.push(
            "O1 — useSelectionGroup does NOT fire `scrollIntoView({inline:'nearest'})` on select; the recenter CALL is the UF-C8 cure (a selection past the fold pulls itself into view)",
        );
    }

    const hasScrollPadding = /scroll-padding-inline\s*:/.test(css);
    facts.o1HasScrollPaddingInline = hasScrollPadding;
    if (!hasScrollPadding) {
        violations.push(
            "O1 — the scroll port has NO `scroll-padding-inline` gutter; the recenter must land a selected member with ≥1px port slack (never jammed flush)",
        );
    }
    return { violations, facts };
}

// ── O2 — native-scroll-facility ──────────────────────────────────────────────────
function checkO2({ overflowCssText, sizingCssText }) {
    const violations = [];
    const facts = {};
    const css = stripCssComments(overflowCssText);
    const sizing = stripCssComments(sizingCssText);

    const hasAutoScroll = /overflow-x\s*:\s*auto/.test(css);
    const hasFadeMask =
        /mask-image\s*:\s*linear-gradient/.test(css) &&
        /gl-fade-start-in/.test(css) &&
        /gl-fade-end-out/.test(css);
    const hasMaskNone = /mask-image\s*:\s*none/.test(css); // T-52(a) honest rest
    const clipMargin = /overflow-clip-margin\s*:/.test(css); // band-aid must be ABSENT
    const crossAxisClip = /overflow-y\s*:\s*(clip|hidden)/.test(css); // cross axis must be visible
    const crossAxisVisible = /overflow-y\s*:\s*visible/.test(css);
    const readsSafeInset = /--dock-scroll-safe-inset/.test(css); // T-52(b)
    const safeInsetDeclared = /--dock-scroll-safe-inset\s*:/.test(sizing);

    Object.assign(facts, {
        o2AutoScroll: hasAutoScroll,
        o2FadeMask: hasFadeMask,
        o2MaskNoneAtRest: hasMaskNone,
        o2ClipMarginAbsent: !clipMargin,
        o2CrossAxisVisible: crossAxisVisible && !crossAxisClip,
        o2SafeInsetRouted: readsSafeInset && safeInsetDeclared,
    });

    if (!hasAutoScroll)
        violations.push("O2 — the scroll port is NOT `overflow-x: auto` (the native inline scroll track)");
    if (!hasFadeMask)
        violations.push("O2 — the FadingScroll edge mask is absent (mask-image linear-gradient off the gl-fade-start-in/gl-fade-end-out keyframes)");
    if (!hasMaskNone)
        violations.push("O2 / T-52(a) — the mask is NOT `none` at rest; the 0px-fade transparent stop shaves a flush item's focus-ring arc (mask must compute `none` when neither fade is active)");
    if (clipMargin)
        violations.push("O2 — `overflow-clip-margin` band-aid is LIVE; the clip-era cross-axis fudge must be DEFINITION-ABSENT (the SPINE plate clips the silhouette, the L1 run is overflow: visible)");
    if (crossAxisClip)
        violations.push("O2 — the interactive scroll run carries a cross-axis clip (`overflow-y: clip`/`hidden`); the cross axis must be honestly `visible`");
    if (!crossAxisVisible)
        violations.push("O2 — the scroll port does not declare `overflow-y: visible` (the honest cross axis)");
    if (!readsSafeInset || !safeInsetDeclared)
        violations.push("O2 / T-52(b) — the `--dock-scroll-safe-inset` ring-room (declared in sizing.css, read as padding/negative-margin in overflow.css) is missing; a flush item's focus ring must render WHOLE mid-scroll");

    return { violations, facts };
}

// ── O3 — fisheye-iff-fits (exclusive mode, never composed) ───────────────────────
function checkO3({ fisheyeCssText }) {
    const violations = [];
    const facts = {};
    const css = stripCssComments(fisheyeCssText);
    const rules = cssRules(css);

    // A "magnify" rule GROWS the scale (the Gaussian) — body has `exp(` or a non-1 scale.
    const magnifyRules = rules.filter(
        (r) => /exp\s*\(/.test(r.body) || /scale\s*:\s*calc\(\s*1\s*\+/.test(r.body),
    );
    facts.o3MagnifyRuleCount = magnifyRules.length;

    // Every magnify rule MUST be gated by `:not([data-dock-overflow])`.
    const ungated = magnifyRules.filter((r) => !/:not\(\[data-dock-overflow\]\)/.test(r.sel));
    facts.o3UngatedMagnifyRules = ungated.map((r) => r.sel).slice(0, 3);
    if (magnifyRules.length === 0) {
        violations.push("O3 — no fisheye Gaussian magnify rule found (the fits-branch enhancement is absent)");
    }
    for (const r of ungated) {
        violations.push(
            `O3 — a fisheye magnify rule is NOT gated by \`:not([data-dock-overflow])\` (\`${r.sel}\`); fisheye must engage ONLY when the row FITS (never composed with scroll)`,
        );
    }

    // A scrollable-row (positive [data-dock-overflow], NOT :not(...)) magnify rule is the
    // composition break the ruling forbids.
    const composed = magnifyRules.filter(
        (r) => /\[data-dock-overflow\]/.test(r.sel) && !/:not\(\[data-dock-overflow\]\)/.test(r.sel),
    );
    facts.o3ComposedOnScroll = composed.map((r) => r.sel).slice(0, 3);
    for (const r of composed) {
        violations.push(
            `O3 — a fisheye magnify scale is applied on a SCROLLABLE row (\`${r.sel}\`); the exclusive-mode ruling forbids composing fisheye with native scroll`,
        );
    }

    return { violations, facts };
}

// ── O4 — fisheye-hit-box-invariant (transform-only; ≥44px; PRM/hover-none off) ────
const LAYOUT_PROP_RX =
    /\b(width|height|min-width|max-width|min-height|max-height|inline-size|block-size|min-inline-size|max-inline-size|min-block-size|max-block-size|padding|padding-[\w-]+|margin|margin-[\w-]+|top|left|right|bottom|inset|inset-[\w-]+|gap|row-gap|column-gap|font-size|line-height|flex-basis|border-[\w-]*width)\s*:/;

function checkO4({ fisheyeCssText }) {
    const violations = [];
    const facts = {};
    const css = stripCssComments(fisheyeCssText);
    const rules = cssRules(css);

    // Every fisheye rule body must touch ONLY compositor channels (scale/transition/
    // transform-origin) — NEVER a layout property (the hit box holds base geometry).
    const layoutRules = rules.filter((r) => LAYOUT_PROP_RX.test(r.body));
    facts.o4LayoutPropRules = layoutRules.map((r) => r.sel).slice(0, 3);
    for (const r of layoutRules) {
        violations.push(
            `O4 — a fisheye rule writes a LAYOUT property (\`${r.sel}\`); the fisheye must be transform/scale-only so the hit box holds base geometry (≥44px touch floor)`,
        );
    }

    const hoverGated = /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/.test(css);
    facts.o4HoverFineGated = hoverGated;
    if (!hoverGated)
        violations.push("O4 — the fisheye scale is NOT `(hover: hover) and (pointer: fine)`-gated; a coarse/hover-none pointer must paint flat (no hump)");

    const prmOff =
        /@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(css) &&
        /scale\s*:\s*1/.test(css);
    facts.o4PrmOff = prmOff;
    if (!prmOff)
        violations.push("O4 — the fisheye is NOT disabled under `prefers-reduced-motion: reduce` (a `scale: 1` flat arm); non-essential magnification must be PRM-off");

    return { violations, facts };
}

// ── O5 — indicator-is-scroll-child (G9): ZERO scroll listener + content-coord indicator ──
function hasScrollListener(text) {
    const t = stripTsComments(text);
    return /addEventListener\s*\(\s*["']scroll["']/.test(t) || /\.onscroll\s*=/.test(t);
}

function checkO5({ overflowFitText, fisheyeTsText, selectionIndicatorText, selectionGroupText }) {
    const violations = [];
    const facts = {};

    const scrollListenerSites = [];
    if (hasScrollListener(overflowFitText)) scrollListenerSites.push("useDockOverflowFit");
    if (hasScrollListener(fisheyeTsText)) scrollListenerSites.push("useDockFisheye");
    if (hasScrollListener(selectionIndicatorText)) scrollListenerSites.push("useSelectionIndicator");
    if (hasScrollListener(selectionGroupText)) scrollListenerSites.push("useSelectionGroup");
    facts.o5ScrollListenerSites = scrollListenerSites;
    for (const site of scrollListenerSites) {
        violations.push(
            `O5 / G9 — ${site} attaches a \`scroll\` listener; the indicator travels WITH scroll in content coordinates (a scroll child), so ZERO scroll listener is needed`,
        );
    }

    // The fit measure is RESIZE-driven (RO), not a scroll loop.
    const fitUsesRO = /new\s+ResizeObserver\s*\(/.test(stripTsComments(overflowFitText));
    facts.o5FitUsesResizeObserver = fitUsesRO;
    if (!fitUsesRO)
        violations.push("O5 — useDockOverflowFit does not use a ResizeObserver (the mode signal must be resize/content-driven, never a scroll loop)");

    // The indicator measures in CONTENT coordinates (offsetLeft/offsetTop) so it travels
    // with scroll as a scroll child — no ancestor-positioned overlay compensating for scroll.
    const ind = stripTsComments(selectionIndicatorText);
    const contentCoords = /offsetLeft/.test(ind) && /offsetTop/.test(ind);
    facts.o5IndicatorContentCoords = contentCoords;
    if (!contentCoords)
        violations.push("O5 — the traveling indicator does not measure in content coordinates (offsetLeft/offsetTop); it must be a scroll CHILD that travels with scroll, not a scroll-listening overlay");

    return { violations, facts };
}

// ── T-52(c) — `--dock-pill-h` exported at :root ──────────────────────────────────
function checkPillH({ sizingCssText }) {
    const violations = [];
    const facts = {};
    const sizing = stripCssComments(sizingCssText);
    const declared = /--dock-pill-h\s*:/.test(sizing);
    facts.tPillHExported = declared;
    if (!declared)
        violations.push("T-52(c) — `--dock-pill-h` is NOT declared (the ONE authoritative exported dock-pill height rung; ends the consumer band-reservation re-derivation drift)");
    return { violations, facts };
}

// ── self-test bites ──────────────────────────────────────────────────────────────
function selfTest() {
    const errors = [];

    // O3 bite — a synthetic fisheye-on-a-scrollable-row MUST flag.
    const o3 = checkO3({
        fisheyeCssText:
            ".glass-dock[data-dock-fisheye][data-dock-overflow] .dock-fisheye-item { scale: calc(1 + var(--amp) * exp(-1)); }",
    });
    if (!o3.violations.some((v) => v.startsWith("O3") && /SCROLLABLE|composed|composing/i.test(v))) {
        errors.push("O3 self-test BROKE — a synthetic fisheye-on-a-scrollable-row was NOT flagged (the exclusive-mode fence not load-bearing)");
    }

    // O2 bite — a synthetic re-added `overflow-clip-margin` MUST flag.
    const o2 = checkO2({
        overflowCssText:
            ".dock-layer--full { overflow-x: auto; overflow-clip-margin: 4px; mask-image: none; mask-image: linear-gradient(); gl-fade-start-in gl-fade-end-out overflow-y: visible; --dock-scroll-safe-inset: 3px; scroll-padding-inline: 3px; }",
        sizingCssText: "--dock-scroll-safe-inset: 3px;",
    });
    if (!o2.violations.some((v) => v.startsWith("O2") && /overflow-clip-margin/.test(v))) {
        errors.push("O2 self-test BROKE — a synthetic `overflow-clip-margin` band-aid was NOT flagged");
    }

    // O4 bite — a synthetic layout-property fisheye MUST flag.
    const o4 = checkO4({
        fisheyeCssText:
            "@media (hover: hover) and (pointer: fine) { .dock-fisheye-item { width: calc(40px * 1.6); scale: 1.6; } } @media (prefers-reduced-motion: reduce) { .dock-fisheye-item { scale: 1; } }",
    });
    if (!o4.violations.some((v) => v.startsWith("O4") && /LAYOUT property/.test(v))) {
        errors.push("O4 self-test BROKE — a synthetic layout-property fisheye (`width:`) was NOT flagged (the hit-box-invariant fence not load-bearing)");
    }

    return { ok: errors.length === 0, errors };
}

function run() {
    const overflowCssText = read(PATHS.OVERFLOW_CSS);
    const fisheyeCssText = read(PATHS.FISHEYE_CSS);
    const sizingCssText = read(PATHS.SIZING_CSS);
    const selectionGroupText = read(PATHS.SELECTION_GROUP);
    const selectionIndicatorText = read(PATHS.SELECTION_INDICATOR);
    const overflowFitText = read(PATHS.OVERFLOW_FIT);
    const fisheyeTsText = read(PATHS.FISHEYE_TS);

    const o1 = checkO1({ selectionGroupText, overflowCssText });
    const o2 = checkO2({ overflowCssText, sizingCssText });
    const o3 = checkO3({ fisheyeCssText });
    const o4 = checkO4({ fisheyeCssText });
    const o5 = checkO5({ overflowFitText, fisheyeTsText, selectionIndicatorText, selectionGroupText });
    const pill = checkPillH({ sizingCssText });
    const self = selfTest();

    const violations = [
        ...o1.violations,
        ...o2.violations,
        ...o3.violations,
        ...o4.violations,
        ...o5.violations,
        ...pill.violations,
        ...self.errors,
    ];
    const facts = {
        ...o1.facts,
        ...o2.facts,
        ...o3.facts,
        ...o4.facts,
        ...o5.facts,
        ...pill.facts,
        selfTest: self.ok,
    };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(PATHS.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-overflow",
        note: "BI.W-DOCK-OVERFLOW — native scroll + scrollIntoView + fisheye-iff-fits (UF-C8; PASS-4B ruling 1; T-52 a/b/c). O1 scroll-into-view (the CALL in useSelectionGroup + the scroll-padding-inline gutter FACILITY) · O2 native-scroll-facility (overflow-x: auto + FadingScroll mask, ZERO overflow-clip-margin, cross axis honestly visible, mask none at rest T-52a, safe-inset T-52b) · O3 fisheye-iff-fits (Gaussian gated on :not([data-dock-overflow]), never composed with scroll) · O4 fisheye-hit-box-invariant (transform-only, ≥44px, hover:none/PRM off) · O5 indicator-is-scroll-child G9 (ZERO scroll listener, RO fit measure, content-coord indicator) · T-52c --dock-pill-h exported. + 3 self-test bites.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-overflow — native scroll + scrollIntoView + fisheye-iff-fits (BI.W-DOCK-OVERFLOW; UF-C8)");
    console.log(
        `  O1 scroll-into-view       : scrollIntoView=${facts.o1FiresScrollIntoView} scroll-padding-inline=${facts.o1HasScrollPaddingInline} ${ok(o1.violations.length === 0)}`,
    );
    console.log(
        `  O2 native-scroll-facility : auto=${facts.o2AutoScroll} fade-mask=${facts.o2FadeMask} mask-none-rest=${facts.o2MaskNoneAtRest} clip-margin-absent=${facts.o2ClipMarginAbsent} cross-visible=${facts.o2CrossAxisVisible} safe-inset=${facts.o2SafeInsetRouted} ${ok(o2.violations.length === 0)}`,
    );
    console.log(
        `  O3 fisheye-iff-fits       : magnify-rules=${facts.o3MagnifyRuleCount} ungated=${facts.o3UngatedMagnifyRules?.length ?? "?"} composed-on-scroll=${facts.o3ComposedOnScroll?.length ?? "?"} ${ok(o3.violations.length === 0)}`,
    );
    console.log(
        `  O4 fisheye-hit-box-inv    : layout-prop-rules=${facts.o4LayoutPropRules?.length ?? "?"} hover-fine-gated=${facts.o4HoverFineGated} prm-off=${facts.o4PrmOff} ${ok(o4.violations.length === 0)}`,
    );
    console.log(
        `  O5 indicator-scroll-child : scroll-listeners=${facts.o5ScrollListenerSites?.length ?? "?"} fit-RO=${facts.o5FitUsesResizeObserver} content-coords=${facts.o5IndicatorContentCoords} ${ok(o5.violations.length === 0)}`,
    );
    console.log(
        `  T-52c --dock-pill-h       : exported=${facts.tPillHExported} ${ok(pill.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)    : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, PATHS.ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkO1, checkO2, checkO3, checkO4, checkO5, checkPillH, selfTest };
