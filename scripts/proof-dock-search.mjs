#!/usr/bin/env node
// BC.W-DOCK-SEARCH — proof:dock-search, the born-RED DOCK-as-native-dynamic-search-bar
// SOURCE gate.
//
// The DOCK becomes a SEARCH BAR: tap the collapsed pill → it MORPHS (continuously, via
// the dock's OWN `--dock-morph-t` glide + the byte-untouched morph-bridge metaball) into
// a fuzzy command/search field. `useDockSearch` is the CONSUMING SEAM — it composes the
// SHIPPED /search fuzzy pipeline (useFuzzySearch, the VSCode scorer — NO re-fork) + the
// dock state machine + the optional useScrollChrome shrink + the virtual-window/ToC
// scroll-to-and-warm. A seam BESIDE the morph engine (dockMorphContext/DOCK_SPRING
// byte-untouched — the box-inviolate fence, the W-DOCKMORPH-CTA precedent).
//
// PURE DEVICE-FREE static src-scan (source + DOM-template scans, no browser, no GPU).
// Runs on EVERY runner → `tags: ["local","ci","release"]`. The BINDING painted truth is
// the π readback (tests-visual/dock-search.spec.ts) + the W-DOCK-SEARCH-DELTA capture +
// the proof:ba-gestalt dock+search verdict (the AZ P-1 source-green/visually-broken
// close-class — this gate proves the WIRING, the local close proves the PAINT).
//
// CLAUSES (born-RED on the pre-wave tree — no useDockSearch at HEAD):
//   DS1 — the searchable register morphs via the SHARED metaball + `--dock-morph-t` (no
//         second engine). useDockSearch composes the dock's own morph; it does NOT import
//         dockMorphContext/dockMorphMeasure/DOCK_SPRING for an EDIT, does NOT define a
//         second goo @keyframes/filter, does NOT mint a second SpringProgress.
//   DS2 — persistent-default; the morph fires on user intent. `search` defaults false;
//         armSearch (tap/focus) fires the morph, NEVER a passive scroll tick (the scroll
//         path is useScrollChrome — a DISTINCT compositor shrink, persistent-default).
//   DS3 — the field consumes the existing fuzzy + the results consume the windowing (no
//         second matcher, no second windowing). useDockSearch composes useFuzzySearch (no
//         re-implemented subsequence scorer); the results ride useVirtualSectionWindow.
//   DS4 — the active field reads ≥4.5:1 (the legibility assert, no pale-fade). The active
//         field surface composes the W55 element-level oklab tint (color-mix(in oklab,
//         <rung>, var(--glass-tint-source) var(--glass-tint-strength))), NOT the raw
//         pre-substituted --glass-bg-dock; field text --foreground, muted --on-glass-muted.
//   DS5 — autocomplete ghost-text + keyboard-nav + result-select wired. autocompleteText
//         derives off results[0]; acceptAutocomplete fills it; the keyboard nav is
//         useFuzzySearch.onKeydown; onResultSelect wires ensureTargetWindow + scrollTo.
//   DS6 — the box-inviolate fence + ≥2-consumer record. dockMorphContext/DOCK_SPRING
//         byte-unchanged (no edit from useDockSearch); the consumer-evidence doc names #1
//         the demo story + #2 the words SearchBar retirement; the optional shrink composes
//         useScrollChrome (no hand-rolled addEventListener("scroll")).
//
// Bite-check (a self-test per clause, run every invocation): a planted second
// @keyframes/SpringProgress/DOCK_SPRING-edit (DS1) · a scroll-triggered morph (DS2) · an
// inline fuzzyMatch re-roll / hand-rolled windowing (DS3) · a raw --glass-bg-dock on the
// field (DS4) · a result-select skipping ensureTargetWindow/scrollTo (DS5) · a raw
// addEventListener("scroll") in useDockSearch (DS6) — each MUST flag.

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripComments(text, kind) {
    let out = text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(m.length - p1.length));
    if (kind === "vue") {
        out = out.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
    }
    return out;
}

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        DOCK_SEARCH: resolve(ROOT, "src/components/custom/dock/composables/useDockSearch.ts"),
        GLASS_DOCK: resolve(ROOT, "src/components/custom/dock/GlassDock.vue"),
        SHELL_PROPS: resolve(ROOT, "src/components/custom/dock/composables/useDockShellProps.ts"),
        DOCK_INDEX: resolve(ROOT, "src/components/custom/dock/index.ts"),
        API: resolve(ROOT, "src/api/index.ts"),
        SEARCH_CSS: resolve(ROOT, "src/styles/dock/search.css"),
        DENSITY_CSS: resolve(ROOT, "src/styles/dock/density.css"),
        STORY: resolve(ROOT, "demo/stories/dock/dock-search.vue"),
        EVIDENCE: resolve(ROOT, "docs/consumer-evidence/dock-search.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_SEARCH_ARTIFACT", "BC-dock-search"),
    };
    return _cliPaths;
}

/**
 * The PURE detector (injected) — exported so a born-RED self-test can feed a synthetic
 * mutation (a second morph engine, a scroll-triggered morph, an inline matcher re-roll, a
 * raw dock-bg field, a missing ToC wire, a raw scroll listener) and assert exit 1.
 *
 * @param {object} fs the source texts (see loadFs)
 */
export function detectDockSearch(fs) {
    const violations = [];
    const facts = {};

    const seam = stripComments(fs.dockSearchText ?? "", "code");
    const glassDock = stripComments(fs.glassDockText ?? "", "vue");
    const shellProps = stripComments(fs.shellPropsText ?? "", "code");
    const dockIndex = stripComments(fs.dockIndexText ?? "", "code");
    const api = stripComments(fs.apiText ?? "", "code");
    const searchCss = stripComments(fs.searchCssText ?? "", "code");
    const densityCss = stripComments(fs.densityCssText ?? "", "code");
    const story = stripComments(fs.storyText ?? "", "vue");
    const evidence = fs.evidenceText ?? "";

    const seamExists = (fs.dockSearchText ?? "").length > 0;
    facts.seamExists = seamExists;
    if (!seamExists) {
        violations.push(
            "DS0: useDockSearch.ts is absent — the dock-search seam does not exist (born-RED at HEAD)",
        );
    }

    // ── DS1 — morphs via the SHARED metaball + --dock-morph-t (no second engine) ──
    // The seam must NOT import dockMorphContext/dockMorphMeasure/DOCK_SPRING for an EDIT
    // (a relative READ-import for a type is allowed; but the seam must own NO morph-engine
    // edit). The conservative SOURCE rule: the seam imports NONE of the three morph-engine
    // modules (it is a BESIDE seam — it composes useDockState + useFuzzySearch only).
    const importsMorphContext = /\bfrom\s+["'][^"']*dockMorphContext["']/.test(seam);
    const importsMorphMeasure = /\bfrom\s+["'][^"']*dockMorphMeasure["']/.test(seam);
    const importsDockSpringEdit = /\bDOCK_SPRING\b/.test(seam);
    // No second goo/morph spring engine minted INSIDE the seam.
    const secondKeyframes = /@keyframes\b/.test(seam);
    const secondSpring = /\bnew\s+SpringProgress\b/.test(seam) || /\bSpringProgress\s*\(/.test(seam);
    // The dock's OWN morph is the data-search aperture (GlassDock renders #search inside
    // .dock-layers, riding --dock-morph-t); the seam composes useDockState.
    const composesDockState = /\buseDockState\b/.test(seam) || /UseDockStateReturn\b/.test(seam);
    const dockRendersSearchAperture =
        /data-search/.test(glassDock) && /name=["']search["']/.test(glassDock);
    facts.ds1ImportsMorphEngine = importsMorphContext || importsMorphMeasure || importsDockSpringEdit;
    facts.ds1SecondEngine = secondKeyframes || secondSpring;
    facts.ds1ComposesDockState = composesDockState;
    facts.ds1DockRendersSearchAperture = dockRendersSearchAperture;
    if (importsMorphContext || importsMorphMeasure || importsDockSpringEdit) {
        violations.push(
            "DS1: useDockSearch imports the morph engine (dockMorphContext/dockMorphMeasure/DOCK_SPRING) — the box-inviolate fence forbids it; the dock-search is a seam BESIDE the morph, not an edit to it",
        );
    }
    if (secondKeyframes || secondSpring) {
        violations.push(
            "DS1: useDockSearch mints a SECOND morph engine (a @keyframes / a SpringProgress) — the pill→field morph must reuse the dock's OWN --dock-morph-t + the morph-bridge metaball (no second goo filter, no second spring)",
        );
    }
    if (!composesDockState) {
        violations.push(
            "DS1: useDockSearch does NOT compose useDockState — armSearch/disarmSearch must ride the existing state machine (onClickCollapsed + keepOpen/release), not a fork",
        );
    }
    if (!dockRendersSearchAperture) {
        violations.push(
            "DS1: GlassDock.vue does NOT render the #search aperture on a [data-search] dock — the field must seat INSIDE the existing morph aperture (the box shrink-wraps; the morph is the dock's own --dock-morph-t)",
        );
    }

    // ── DS2 — persistent-default; the morph fires on user intent ──
    // `search` defaults false (additive, byte-identical to HEAD); armSearch fires the
    // morph (tap/focus). The morph must NOT fire on a scroll tick — the scroll path is the
    // DISTINCT useScrollChrome shrink (persistent-default). The conservative SOURCE rule:
    // armSearch is NOT called from a scroll handler / collapseOnScroll branch.
    const searchPropDefaultFalse =
        /\bsearch\?\s*:\s*boolean\b/.test(shellProps) &&
        // the prop is OPTIONAL (no withDefaults forcing true) — Vue coerces an absent
        // boolean to false, so the optional `search?` IS the persistent-default.
        !/\bsearch\s*:\s*true\b/.test(shellProps);
    const armOnUserIntent = /\barmSearch\b/.test(seam) && /\bonClickCollapsed\b/.test(seam);
    // The scroll path must be the useScrollChrome shrink, NOT armSearch.
    const collapseOnScrollComposesChrome =
        /\buseScrollChrome\b/.test(seam) && /\bcollapseOnScroll\b/.test(seam);
    // A planted scroll-triggered morph: armSearch reachable from a scroll context. We flag
    // a literal armSearch call inside a scroll/onScroll/collapseOnScroll handler body.
    const scrollTriggeredMorph =
        /(?:onScroll|handleScroll|scroll[A-Za-z]*Tick)[^{]*\{[^}]*\barmSearch\b/.test(seam) ||
        /\bcollapseOnScroll\b[^;{]*\{[^}]*\barmSearch\b/.test(seam);
    facts.ds2SearchPropDefaultFalse = searchPropDefaultFalse;
    facts.ds2ArmOnUserIntent = armOnUserIntent;
    facts.ds2CollapseComposesChrome = collapseOnScrollComposesChrome;
    facts.ds2ScrollTriggeredMorph = scrollTriggeredMorph;
    if (!searchPropDefaultFalse) {
        violations.push(
            "DS2: the `search?: boolean` prop is not the additive default-false mode (a non-search dock must be byte-identical to HEAD; the persistent-default is the optional prop)",
        );
    }
    if (!armOnUserIntent) {
        violations.push(
            "DS2: armSearch does not fire the morph on user intent (it must compose onClickCollapsed — tap/focus → expand; the morph is intent-driven, never a passive scroll)",
        );
    }
    if (!collapseOnScrollComposesChrome) {
        violations.push(
            "DS2: the optional collapse-on-scroll does not compose useScrollChrome — the scroll path must be the DISTINCT compositor shrink (persistent-default), not the morph",
        );
    }
    if (scrollTriggeredMorph) {
        violations.push(
            "DS2: the morph fires on a SCROLL side-effect (armSearch reached from a scroll handler) — the iOS-27 fence: the morph fires on user intent ONLY, the scroll path is the shrink",
        );
    }

    // ── DS3 — composes the existing fuzzy + windowing (no second matcher/windowing) ──
    const composesFuzzy = /\buseFuzzySearch\b/.test(seam);
    // No re-implemented subsequence scorer inline (a local fuzzyMatch/scoreEntry def).
    const inlineMatcherReroll =
        /\bfunction\s+fuzzyMatch\b/.test(seam) ||
        /\bconst\s+fuzzyMatch\s*=/.test(seam) ||
        /\bfunction\s+scoreEntry\b/.test(seam);
    // The results consume the windowing leaf (composed in the seam OR wired through it +
    // exercised by the story's useVirtualSectionWindow). The seam threads ensureTargetWindow.
    const wiresWindowing =
        /\bensureTargetWindow\b/.test(seam) &&
        /\buseVirtualSectionWindow\b/.test(story);
    // No hand-rolled windowing (a local spacer/slice computation) in the seam.
    const handRolledWindowing =
        /\bfunction\s+resolveSectionWindow\b/.test(seam) ||
        /\btopSpacerPx\b.*=.*\bfunction\b/.test(seam);
    facts.ds3ComposesFuzzy = composesFuzzy;
    facts.ds3InlineMatcherReroll = inlineMatcherReroll;
    facts.ds3WiresWindowing = wiresWindowing;
    facts.ds3HandRolledWindowing = handRolledWindowing;
    if (!composesFuzzy) {
        violations.push(
            "DS3: useDockSearch does NOT compose useFuzzySearch — the field must consume the SHIPPED VSCode subsequence scorer (no re-fork)",
        );
    }
    if (inlineMatcherReroll) {
        violations.push(
            "DS3: useDockSearch re-implements the subsequence scorer inline (a fuzzyMatch/scoreEntry def) — the ONE matcher is fuzzyMatch; compose it, never re-roll it",
        );
    }
    if (!wiresWindowing) {
        violations.push(
            "DS3: the results do NOT ride useVirtualSectionWindow — the seam must thread ensureTargetWindow + the story renders the windowed slice (only the windowed items paint; the spacers hold scroll height)",
        );
    }
    if (handRolledWindowing) {
        violations.push(
            "DS3: useDockSearch hand-rolls the windowing (a local resolveSectionWindow/spacer computation) — the ONE windowing is useVirtualSectionWindow; compose it",
        );
    }

    // ── DS4 — the active field reads ≥4.5:1 (the legibility assert, no pale-fade) ──
    // The active field surface composes the W55 element-level oklab tint, NOT the raw
    // pre-substituted --glass-bg-dock. The field text is --foreground; the
    // placeholder/result-muted reads --on-glass-muted.
    const fieldComposesOklabTint =
        /color-mix\(\s*in oklab/.test(searchCss) &&
        /var\(--glass-tint-source\)\s+var\(--glass-tint-strength\)/.test(searchCss);
    // The field must NOT read the raw pre-substituted --glass-bg-dock (the pale-fade
    // trap — the pre-baked 0%-strength token cannot darken). We flag a `background:
    // var(--glass-bg-dock)` RAW (not wrapped in the oklab tint mix) on the field.
    const rawDockBgOnField =
        /background\s*:\s*var\(--glass-bg-dock\)\s*;/.test(searchCss);
    const fieldTextForeground = /color\s*:\s*var\(--foreground\)/.test(searchCss);
    const mutedOnGlass = /var\(--on-glass-muted\)/.test(searchCss);
    facts.ds4FieldComposesOklabTint = fieldComposesOklabTint;
    facts.ds4RawDockBgOnField = rawDockBgOnField;
    facts.ds4FieldTextForeground = fieldTextForeground;
    facts.ds4MutedOnGlass = mutedOnGlass;
    if (!fieldComposesOklabTint) {
        violations.push(
            "DS4: the active field surface does NOT compose the W55 element-level oklab tint (color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))) — the active field must darken-over-light so it reads ≥4.5:1 (no pale-fade)",
        );
    }
    if (rawDockBgOnField) {
        violations.push(
            "DS4: the active field reads the RAW pre-substituted --glass-bg-dock (the substitution-vs-inheritance trap — the pre-baked 0%-strength token cannot darken) → the pale-fade trap. Compose the element-level oklab tint instead",
        );
    }
    if (!fieldTextForeground) {
        violations.push(
            "DS4: the active field text does NOT read --foreground — the field text must be the full warm ink for AA legibility",
        );
    }
    if (!mutedOnGlass) {
        violations.push(
            "DS4: the placeholder/result-muted does NOT read --on-glass-muted — the page-calibrated --muted-foreground collapses on a translucent darkened plate; the on-glass rung clears 4.5:1 vs the composited plate",
        );
    }

    // ── DS5 — autocomplete ghost-text + keyboard-nav + result-select wired ──
    const autocompleteOffTop =
        /\bautocompleteText\b/.test(seam) &&
        /results\.value\[0\]|results\.value\[\s*0\s*\]|\bresults\b\[?0\]?/.test(seam);
    const acceptAutocomplete = /\bacceptAutocomplete\b/.test(seam);
    // the keyboard nav is the composed useFuzzySearch.onKeydown (story wires it).
    const keyboardNavComposed = /\bonKeydown\b/.test(story) || /\bfuzzy\.onKeydown\b/.test(story);
    // result-select wires ensureTargetWindow + scrollTo (the ToC subsume). We require
    // BOTH leaves threaded in the result-select path.
    const resultSelectWiresToC =
        /\bensureTargetWindow\b/.test(seam) && /\bscrollTo\b/.test(seam);
    facts.ds5AutocompleteOffTop = autocompleteOffTop;
    facts.ds5AcceptAutocomplete = acceptAutocomplete;
    facts.ds5KeyboardNavComposed = keyboardNavComposed;
    facts.ds5ResultSelectWiresToC = resultSelectWiresToC;
    if (!autocompleteOffTop) {
        violations.push(
            "DS5: autocompleteText does NOT derive off results[0] — the ghost-text is the prefix-completion of the top match (the words useAutocomplete generalized)",
        );
    }
    if (!acceptAutocomplete) {
        violations.push(
            "DS5: acceptAutocomplete is absent — Tab/Space/ArrowRight must fill the ghost-text into the query",
        );
    }
    if (!keyboardNavComposed) {
        violations.push(
            "DS5: the keyboard nav is not the composed useFuzzySearch.onKeydown (Arrow/Enter/Escape — composed, never re-rolled)",
        );
    }
    if (!resultSelectWiresToC) {
        violations.push(
            "DS5: the result-select does NOT wire ensureTargetWindow + scrollTo — a result-select must warm the window THEN scroll-to-and-land (the ToC subsume)",
        );
    }

    // ── DS6 — the box-inviolate fence + ≥2-consumer record + no raw scroll listener ──
    // dockMorphContext/DOCK_SPRING byte-unchanged is asserted by DS1 (the seam owns no
    // edit). Here we assert the consumer-evidence doc + the no-hand-rolled-scroll fence +
    // the publication surface (the /dock re-export + the /api type).
    const noRawScrollListener =
        !/addEventListener\(\s*["']scroll["']/.test(seam);
    const evidenceNamesConsumers =
        evidence.length > 0 &&
        /demo/i.test(evidence) &&
        /words/i.test(evidence) &&
        /SearchBar/.test(evidence);
    const dockExportsSeam =
        /export\s*\{\s*useDockSearch\b/.test(dockIndex) &&
        /UseDockSearchOptions/.test(dockIndex);
    const apiPublishesTypes =
        /UseDockSearchOptions/.test(api) && /UseDockSearchReturn/.test(api);
    // the shrink trigger-points are tokenized (the words scrollInflectionPoint generalized).
    const triggerPointTokens =
        /--dock-search-shrink-start\b/.test(densityCss) &&
        /--dock-search-shrink-end\b/.test(densityCss);
    facts.ds6NoRawScrollListener = noRawScrollListener;
    facts.ds6EvidenceNamesConsumers = evidenceNamesConsumers;
    facts.ds6DockExportsSeam = dockExportsSeam;
    facts.ds6ApiPublishesTypes = apiPublishesTypes;
    facts.ds6TriggerPointTokens = triggerPointTokens;
    if (!noRawScrollListener) {
        violations.push(
            "DS6: useDockSearch hand-rolls a raw addEventListener(\"scroll\") — the optional shrink must compose useScrollChrome (the native dual-path reader); the words useSearchBarScroll supersession is onto the ONE reader, not a second listener",
        );
    }
    if (!evidenceNamesConsumers) {
        violations.push(
            "DS6: docs/consumer-evidence/dock-search.md does NOT name #1 the demo story + #2 the words SearchBar retirement — the ≥2-consumer record is absent",
        );
    }
    if (!dockExportsSeam) {
        violations.push(
            "DS6: the /dock barrel does NOT re-export useDockSearch + UseDockSearchOptions — the seam must be reachable on @mkbabb/glass-ui/dock",
        );
    }
    if (!apiPublishesTypes) {
        violations.push(
            "DS6: the /api discovery surface does NOT publish UseDockSearchOptions/UseDockSearchReturn",
        );
    }
    if (!triggerPointTokens) {
        violations.push(
            "DS6: the --dock-search-shrink-start/-end trigger-point tokens are absent (the words scrollInflectionPoint generalized into dock-scoped tunable tokens)",
        );
    }

    // The demo story exercises the seam (consumer #1).
    const storyExercisesSeam = /\buseDockSearch\b/.test(story) && /\bsearch\b/.test(story);
    facts.storyExercisesSeam = storyExercisesSeam;
    if (!storyExercisesSeam) {
        violations.push(
            "DS: the demo story does NOT exercise <GlassDock search> bound to useDockSearch (consumer #1 absent)",
        );
    }

    return { violations, facts };
}

/**
 * The self-test bites (born-RED, run every invocation). Each plants a synthetic mutation
 * that MUST flag; if the detector greens on any, the clause is not load-bearing.
 *
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function selfTest() {
    const errors = [];

    // A GREEN baseline fs (the shape the real tree carries) — every clause passes.
    const green = {
        dockSearchText: `
            import { useDockState, type UseDockStateReturn } from "./useDockState";
            import { useFuzzySearch } from "../../search/composables";
            import { useScrollChrome } from "../../../../composables/motion/useScrollChrome";
            export function useDockSearch(options) {
              const { dockState } = options;
              const fuzzy = useFuzzySearch({ items });
              const autocompleteText = computed(() => { const top = results.value[0]; return ""; });
              function acceptAutocomplete() {}
              function armSearch() { dockState.onClickCollapsed(); dockState.keepOpen(); }
              function disarmSearch() { dockState.release(); }
              function handleSelect(r) { options.ensureTargetWindow?.(r.item.id); options.scrollTo?.(r.item.id); }
              if (options.collapseOnScroll) { useScrollChrome(c, { collapseOnScroll: true }); }
              return { fuzzy, autocompleteText, armSearch, disarmSearch, acceptAutocomplete };
            }`,
        glassDockText: `<template><div :data-search="search || undefined"><div class="dock-search-field"><slot name="search" /></div></div></template>`,
        shellPropsText: `export interface DockProps { search?: boolean; }`,
        dockIndexText: `export { useDockSearch } from "./composables";\nexport type { UseDockSearchOptions, UseDockSearchReturn } from "./composables";`,
        apiText: `export type { UseDockSearchOptions, UseDockSearchReturn } from "../components/custom/dock/composables/useDockSearch";`,
        searchCssText: `.dock-search-field .input-bar { background: color-mix(in oklab, var(--glass-bg-floating), var(--glass-tint-source) var(--glass-tint-strength)); color: var(--foreground); } .dock-search-ghost { color: var(--on-glass-muted); }`,
        densityCssText: `:root { --dock-search-shrink-start: 0; --dock-search-shrink-end: 7.25rem; }`,
        storyText: `import { useDockSearch } from "../../../src/components/custom/dock"; import { useVirtualSectionWindow } from "../../../src/composables/virtual"; const s = useDockSearch({}); function onKeydown(e){ fuzzy.onKeydown(e); } <GlassDock search>`,
        evidenceText: `#1 the demo dock-search story, #2 the words SearchBar retirement`,
    };
    const base = detectDockSearch(green);
    if (base.violations.length) {
        errors.push(
            `baseline self-test BROKE — the GREEN fixture flagged ${base.violations.length} violation(s): ${base.violations[0]}`,
        );
    }

    // DS1 bite — a planted second SpringProgress morph in the seam must flag.
    const ds1 = detectDockSearch({
        ...green,
        dockSearchText: green.dockSearchText + "\nconst s = new SpringProgress(DOCK_SPRING);",
    });
    if (!ds1.violations.some((v) => v.startsWith("DS1"))) {
        errors.push("DS1 self-test BROKE — a planted SpringProgress/DOCK_SPRING edit was NOT flagged");
    }

    // DS2 bite — a planted scroll-triggered morph must flag.
    const ds2 = detectDockSearch({
        ...green,
        dockSearchText: green.dockSearchText + "\nfunction handleScroll(){ armSearch(); }",
    });
    if (!ds2.violations.some((v) => v.startsWith("DS2"))) {
        errors.push("DS2 self-test BROKE — a scroll-triggered armSearch was NOT flagged");
    }

    // DS3 bite — a planted inline fuzzyMatch re-roll must flag.
    const ds3 = detectDockSearch({
        ...green,
        dockSearchText: green.dockSearchText + "\nfunction fuzzyMatch(q, t){ return 0; }",
    });
    if (!ds3.violations.some((v) => v.startsWith("DS3"))) {
        errors.push("DS3 self-test BROKE — a planted inline fuzzyMatch re-roll was NOT flagged");
    }

    // DS4 bite — a planted raw --glass-bg-dock on the field must flag.
    const ds4 = detectDockSearch({
        ...green,
        searchCssText: `.dock-search-field .input-bar { background: var(--glass-bg-dock); color: var(--foreground); } .dock-search-ghost { color: var(--on-glass-muted); }`,
    });
    if (!ds4.violations.some((v) => v.startsWith("DS4"))) {
        errors.push("DS4 self-test BROKE — a planted raw --glass-bg-dock field background was NOT flagged");
    }

    // DS5 bite — a result-select that skips ensureTargetWindow/scrollTo must flag.
    const ds5 = detectDockSearch({
        ...green,
        dockSearchText: green.dockSearchText.replace(
            "function handleSelect(r) { options.ensureTargetWindow?.(r.item.id); options.scrollTo?.(r.item.id); }",
            "function handleSelect(r) { options.onResultSelect?.(r); }",
        ),
    });
    if (!ds5.violations.some((v) => v.startsWith("DS5"))) {
        errors.push("DS5 self-test BROKE — a result-select skipping ensureTargetWindow/scrollTo was NOT flagged");
    }

    // DS6 bite — a planted raw scroll listener in the seam must flag.
    const ds6 = detectDockSearch({
        ...green,
        dockSearchText: green.dockSearchText + "\nwindow.addEventListener('scroll', () => {});",
    });
    if (!ds6.violations.some((v) => v.startsWith("DS6"))) {
        errors.push("DS6 self-test BROKE — a planted raw addEventListener(\"scroll\") was NOT flagged");
    }

    return { ok: errors.length === 0, errors };
}

function loadFs() {
    const P = cliPaths();
    const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
    return {
        dockSearchText: read(P.DOCK_SEARCH),
        glassDockText: read(P.GLASS_DOCK),
        shellPropsText: read(P.SHELL_PROPS),
        dockIndexText: read(P.DOCK_INDEX),
        apiText: read(P.API),
        searchCssText: read(P.SEARCH_CSS),
        densityCssText: read(P.DENSITY_CSS),
        storyText: read(P.STORY),
        evidenceText: read(P.EVIDENCE),
    };
}

function run() {
    const P = cliPaths();
    const fs = loadFs();
    const { violations: detectorViolations, facts } = detectDockSearch(fs);

    const self = selfTest();
    const violations = [...detectorViolations, ...self.errors];
    facts.selfTest = self.ok;
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-search",
        note: "BC.W-DOCK-SEARCH — the DOCK-as-native-dynamic-search-bar SOURCE gate. useDockSearch composes the SHIPPED /search fuzzy pipeline (useFuzzySearch, the VSCode scorer — NO re-fork) + the dock state machine + the optional useScrollChrome shrink + the virtual-window/ToC scroll-to-and-warm; a consuming seam BESIDE the morph engine (dockMorphContext/DOCK_SPRING byte-untouched — the box-inviolate fence). DS1 morphs via the SHARED metaball + --dock-morph-t (no second engine: no morph-context import, no second @keyframes/SpringProgress); DS2 persistent-default + intent-driven morph (search? default-false, armSearch on onClickCollapsed, the scroll path is the DISTINCT useScrollChrome shrink — never a scroll-triggered morph); DS3 composes useFuzzySearch + useVirtualSectionWindow (no inline matcher re-roll, no hand-rolled windowing); DS4 the active field reads the W55 element-level oklab tint (NOT the raw --glass-bg-dock — the pale-fade trap) + --foreground text + --on-glass-muted; DS5 autocomplete-off-results[0] + acceptAutocomplete + the composed onKeydown nav + the ensureTargetWindow/scrollTo result-select; DS6 the box-inviolate fence + the ≥2-consumer evidence + the /dock+/api publication + the --dock-search-shrink-start/-end tokens + no raw scroll listener. A self-test bite per clause bites every run. The BINDING painted truth is the π readback + the W-DOCK-SEARCH-DELTA capture + the proof:ba-gestalt dock+search verdict.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-search — the DOCK-as-native-dynamic-search-bar SOURCE gate (BC.W-DOCK-SEARCH)");
    console.log(
        `  DS1 morph via shared --dock-morph-t : composes-dockstate=${facts.ds1ComposesDockState} aperture=${facts.ds1DockRendersSearchAperture} no-engine-import=${!facts.ds1ImportsMorphEngine} no-second-engine=${!facts.ds1SecondEngine} ${ok(facts.ds1ComposesDockState && facts.ds1DockRendersSearchAperture && !facts.ds1ImportsMorphEngine && !facts.ds1SecondEngine)}`,
    );
    console.log(
        `  DS2 persistent-default + intent     : prop-default-false=${facts.ds2SearchPropDefaultFalse} arm-on-intent=${facts.ds2ArmOnUserIntent} scroll=shrink=${facts.ds2CollapseComposesChrome} no-scroll-morph=${!facts.ds2ScrollTriggeredMorph} ${ok(facts.ds2SearchPropDefaultFalse && facts.ds2ArmOnUserIntent && facts.ds2CollapseComposesChrome && !facts.ds2ScrollTriggeredMorph)}`,
    );
    console.log(
        `  DS3 fuzzy + windowing composed      : fuzzy=${facts.ds3ComposesFuzzy} no-reroll=${!facts.ds3InlineMatcherReroll} windowing=${facts.ds3WiresWindowing} no-hand-roll=${!facts.ds3HandRolledWindowing} ${ok(facts.ds3ComposesFuzzy && !facts.ds3InlineMatcherReroll && facts.ds3WiresWindowing && !facts.ds3HandRolledWindowing)}`,
    );
    console.log(
        `  DS4 active field ≥4.5:1 (no fade)   : oklab-tint=${facts.ds4FieldComposesOklabTint} no-raw-dock-bg=${!facts.ds4RawDockBgOnField} fg=${facts.ds4FieldTextForeground} on-glass-muted=${facts.ds4MutedOnGlass} ${ok(facts.ds4FieldComposesOklabTint && !facts.ds4RawDockBgOnField && facts.ds4FieldTextForeground && facts.ds4MutedOnGlass)}`,
    );
    console.log(
        `  DS5 autocomplete + nav + select     : ghost=${facts.ds5AutocompleteOffTop} accept=${facts.ds5AcceptAutocomplete} keynav=${facts.ds5KeyboardNavComposed} toc=${facts.ds5ResultSelectWiresToC} ${ok(facts.ds5AutocompleteOffTop && facts.ds5AcceptAutocomplete && facts.ds5KeyboardNavComposed && facts.ds5ResultSelectWiresToC)}`,
    );
    console.log(
        `  DS6 box-inviolate + ≥2-consumer     : no-raw-scroll=${facts.ds6NoRawScrollListener} evidence=${facts.ds6EvidenceNamesConsumers} /dock=${facts.ds6DockExportsSeam} /api=${facts.ds6ApiPublishesTypes} tokens=${facts.ds6TriggerPointTokens} ${ok(facts.ds6NoRawScrollListener && facts.ds6EvidenceNamesConsumers && facts.ds6DockExportsSeam && facts.ds6ApiPublishesTypes && facts.ds6TriggerPointTokens)}`,
    );
    console.log(`  self-test (bite-per-clause)         : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(P.ROOT, P.ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
