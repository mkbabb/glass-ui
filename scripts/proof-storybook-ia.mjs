#!/usr/bin/env node
// AX.W18 — the storybook-IA gate (proof:storybook-ia).
//
// SUPERSEDES the AV.W10 11-category snapshot. The IA was reinvented from first
// principles into a coherent 12-category tree: Substrates reframed as render
// backgrounds (the three GooBlob facet rows folded to ONE `blob`, the new
// `fourier-field` primitive surfaced), the overloaded Primitives bin split into
// Forms + Display, the single-story Tools bin dissolved (Command folds into
// Containers), and the headline Dock primitive lifted into its OWN first-class
// top-level category (overview · layers · rail) instead of scattering across
// Navigation. This gate FREEZES the NEW tree so it cannot silently drift:
//
//   (1) CATEGORY ORDER — the manifest's category id sequence matches the
//       11-category fixture below EXACTLY (order is load-bearing). (The
//       reference-only `composables` category was deleted at AZ.W-SHELL-CONFIG —
//       12 → 11; the count is auto-derived from EXPECTED_TREE.length.)
//   (2) STORY SET — each category's story id SET matches the fixture EXACTLY
//       (no missing/extra/recategorized row).
//   (3) NO MISSING-STORY — every `<category>/<id>` row resolves to an existing
//       `demo/stories/<category>/<id>.vue` file (the `lazy()` MissingStory
//       render-fallback never fires).
//
// The expected tree is the frozen fixture below. The manifest parse +
// glob-existence check are pure given injected source/fs. NOTE: the fixture is
// the AX-reinvented tree; it SUPERSEDES the AV.W10 snapshot — it is not
// immutable, only re-baselined when the IA is deliberately re-authored.
//
// inv ε / bite-check: reorder a category off the order → RED (1); add/drop a
// story id in a category → RED (2); add a row pointing at a nonexistent file →
// RED (3); re-introduce a single-story `tools` bin or a second GooBlob row → RED
// (1)/(2).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── The frozen AX-reinvented IA fixture (11 categories post-AZ.W-SHELL-CONFIG) ──
// Category order is asserted as a sequence; each category's story ids are
// asserted as a SET (intra-category order is presentational). This SUPERSEDES
// the AV.W10 11-category snapshot (the blob trio folded to one, fourier-field
// surfaced, Primitives split into Forms + Display, Tools dissolved into
// Containers, and the first-class Dock category lifted out of Navigation).
export const EXPECTED_TREE = [
    ["foundations", [
        // `motion` is the unified motion-vocabulary tour: the named easing +
        // spring curve register AND the Vue <Transition> class-sets (the former
        // motion/transitions row folded in — no duplicate motion page).
        "intro", "colors", "typography", "radii", "shadows", "motion",
        "paper-glass", "icons", "surface-tints",
        // BI.W-SURFACE-EXTRACT — the tier × decoration matrix on the ONE
        // <Surface> primitive (discharges UF-J3: every card variant + the veil
        // card render correctly on the matrix).
        "surface-taxonomy",
        "overlays-scrims",
        "chart-chassis-palette", "paper-texture",
        "css-utilities",
    ]],
    // Render backgrounds. The three GooBlob facet rows collapse to ONE `blob`;
    // `fourier-field` is the new Canvas2D render-background sibling. `glass-panel`
    // RETURNED at AZ.W-PRUNE2 (the restore: a live keyframes.js binary consumer —
    // the published subpath ships again WITH its story). `fourier-studio` joined at
    // BA.W-FOURIER-STUDIO (the FOREGROUND studio — the aurora-studio idiom over a
    // Canvas2D stage; studio chrome paired with the ambient `fourier-field` sibling,
    // declares a calm paper background not a self-demo'd field — page-redesign exempt).
    // BC: `fourier-studio` RETIRED (BC.W-VIZ-FOURIER merged the Canvas2D three-view
    // split into the ONE WebGPU `fourier-field` view). `liquid-grid` (BC.W-VIZ-PAPERGRID)
    // is the KEEPER grid viz.
    // (`goo-dot` (BC.W-VIZ-HYBRID) RETIRED at BG.W-GOODOT-PRUNE — 0 external consumers;
    //  `dot-flow-field` / `concentric` / `dot-matrix` DELETED at BI.W-VIZ-DELETIONS — the
    //  user-ordered clean-break prune of the 30+-attempt viz family.)
    ["substrates", ["aurora", "blob", "constellation", "fourier-field", "glass-material", "glass-panel", "liquid-grid"]],
    // The Primitives bin split: form-controls.
    // BI.W-MULTISELECT-FOLD — `multi-select` FOLDED onto `<Combobox multiple>` (the
    // combobox story carries the multiple / chips-in-trigger arm); the standalone
    // multi-select story RETIRED.
    // BI.W-COMPOSITIONS-PRUNE — `labeled-field` relocated in from the compositions band
    // (the LabeledField forms family — a single-family control demo, not a composed scene).
    ["forms", [
        "inputs", "textarea", "checks", "slider", "number-field", "select",
        "combobox", "toggle", "toggle-chip", "selectable-chip", "label",
        "labeled-field",
    ]],
    // The Primitives bin split: display atoms. `atoms` joined at BG.W-DEMO-IA-REDESIGN
    // (the display ATOMS family page — separator/pulse/status-dot/stacked-icons/
    // dark-mode-toggle/avatar composed as members via <FamilyTabs>).
    ["display", [
        "buttons", "card", "badge", "separator", "section", "metric-badge",
        // `metric-pill` DELETED at BI.W-S-METRIC-PILL-DELETE (AD4 — DP-A: 0 consumers
        // anywhere, muster invariant-9 bans it; metric-badge/cell/stack SHARED-KEEP).
        "status-dot", "pulse", "stacked-icons",
        "dark-mode-toggle", "atoms",
    ]],
    // Command folds in from the dissolved single-story Tools bin. The standalone
    // `native-top-layer` probe folded into the Dialog + HoverPopover stories as a
    // native opt-in section at AY.W-SB1 (the FIX-ROUTE execution).
    ["containers", [
        "dialog", "sheet", "drawer", "popover",
        "dropdown-menu", "context-menu", "hover-card", "tooltip", "accordion",
        "collapsible", "hover-popover", "expandable-container", "command",
        // `spa-view` joined at BB.B7 (W-SPAVIEW-CACHE — the <SpaView :max>
        // bounded view-cache router pane over Vue's <KeepAlive> + out-in).
        "spa-view",
        // `card-pressable` joined at BI.W-DEMO-CARD-DECLARE (the :pressable
        // interaction facet — a distinct Card facet from display/card).
        "card-pressable",
        // BI.W-COMPOSITIONS-PRUNE — `configurator` (studio shell) + `icon-tooltip` (the
        // Tooltip auto-provider preset) relocated in from the compositions band: each a
        // single-library-family surface demo, not a composed scene.
        "configurator", "icon-tooltip",
    ]],
    // `header-ribbon` RETURNED at AZ.W-PRUNE2 (the restore: a live keyframes.js
    // binary consumer — the published subpath ships again WITH its story).
    // `deck-progress` stays retired (AY.W-PRUNE — slides ships its own deck-local
    // progress bar; 0 real consumers, RETIRE-FULL public-surface delete).
    ["navigation", [
        "tabs", "carousel", "header-ribbon", "toc-tracking",
    ]],
    // The headline primitive's own first-class category.
    // `sections` demonstrates the declarative tripartite `<DockSection>` chassis
    // (BA.W-DOCK-SECTIONS — the descriptor-driven rail-core | section | nav zones over
    // the in-flow controls). `cta-receive` joined at BB.B2 (W-DOCKMORPH-CTA — the
    // external-CTA-morphs-into-dock receive seam). `dock-search` joined at BC.W-DOCK-SEARCH
    // (the dock-as-native-dynamic-search-bar). `controls` (BI.W-DOCK-CONTROLS — the dock IS
    // SegmentedTabs/ToggleGroup wearing chrome, the useSelectionGroup reference) + `overflow`
    // (BI.W-DOCK-OVERFLOW — native scroll + scrollIntoView + fisheye-iff-fits) are the B3
    // greenfield reference stories.
    // BI.W-DOCK-RETIRES — `liquid-playground` / `dock-gallery` (the fission/goo spectacle,
    // the prime UF-C3 Safari suspect), `morph-showcase` (the V↔H goo morph — the platform
    // cannot interpolate a flex-column→row topology change; the swap is <DockCrossfade>), and
    // `siri-island` (the Siri capability, ruling 18 terminal) are RETIRED decided-terminal
    // (clean break, no alias — off the manifest, off this roster).
    ["dock", ["overview", "layers", "rail", "sections", "cta-receive", "dock-search", "controls", "overflow"]],
    // BG.W-DEMO-DUP-MERGE (F7.3) — the timeline segmented/continuous member routes are
    // MERGED into `data/timeline` (the 3-<StorySection> family page); `metrics` is the
    // BG.W-DEMO-IA-REDESIGN metric-family page (metric-cell/stack/badge/pill). The
    // scrolling-text member RETIRE-RELOCATED to speedtest at BI.W-SPEEDTEST-ONLY-PAIR.
    // BI.W-COMPOSITIONS-PRUNE — `instrument-chassis` relocated in from the compositions
    // band (the ping/jitter/download telemetry metric-strip host — a data instrument).
    ["data", [
        "table", "data-table", "tags-input", "avatar", "sortable-list",
        "infinite-scroll", "timeline", "search",
        "metric-cell", "metric-stack", "metrics", "virtual-section",
        "instrument-chassis",
    ]],
    ["feedback", [
        "alert", "toast", "toaster", "notification", "progress", "skeleton",
        "confirm-dialog", "completion-seal",
    ]],
    // `handmark` is the hand-voice family story (BA.W-HANDMARK). The prior
    // `underline` row (the GlassUnderline draw-on pen, AY.W-UNDERLINE) RETIRED onto
    // `<HandMark shape="underline">` at the DEC-8 fold — the `/underline` subpath +
    // `GlassUnderline` folded into `<HandMark>`, so the story id is now `handmark`.
    // `scroll-vt` joined at AZ.W-MOTION-SUITE (the native scroll-driven +
    // View-Transitions facilities demo). `scroll-choreography` joined at
    // BB.W-SCROLL-MOTION (the SOTA scroll-CHOREOGRAPHY register — .scroll-build
    // page-build / .scroll-cascade section-cascade / .scroll-pin scroll-pinned +
    // the native .smooth-scroll opt-in on the native scroll()/view()/timeline-scope
    // substrate; NO Lenis/GSAP dep). `scroll-system` joined at BC.W-SCROLL-TRIGGER
    // (the ONE scroll reader — useScrollTrigger: continuous progress + discrete
    // onCross/onEnter/onLeave trigger-points off the SAME rAF-coalesced read, the
    // §3.2 trigger-point gap closed; BC.W-SCROLL-CHROME consumes it).
    // `deck` joined at BC.W-DECK (the full-viewport keyboard-paged aria-live
    // PRESENTATION register — useDeck + useDeckKeyboard + <DeckPager>, DISTINCT
    // from /carousel's item-scroller).
    // BG.W-DEMO-DUP-MERGE (F7.3) — the scroll vt/system/choreography member routes are
    // MERGED into `scroll` (the native→reader→choreography 3-<StorySection> family page);
    // `text-motion` is the BG.W-DEMO-IA-REDESIGN type-&-number family (typewriter/
    // split-chars/animated-digit/countup composed as members).
    ["motion", [
        "springs", "countup", "reveal", "deck", "typewriter", "animated-digit",
        "curve-gallery", "handmark", "scroll", "text-motion", "split-chars",
        // `tempo` joined at BI.W-TEMPO (the --motion-tempo one-clock knob —
        // one write co-scales every CSS clock + the JS springs).
        "tempo",
    ]],
    // `dashboard` retired at AY.W-PRUNE (pure-recipe filler — every primitive it
    // composed has its own story + real consumers). `instrument-rail` +
    // `dock-with-slider` retired with the instrument-rail RETIRE-FULL (the
    // never-published cockpit-rail sibling; instrument-chassis is the shipped chassis).
    // BI.W-COMPOSITIONS-PRUNE — the compositions band keeps ONLY composed scenes (a
    // story that carries a `/compositions/*` route path, not an `@mkbabb/glass-ui/*`
    // library subpath). The four single-library-family demos left: `configurator` +
    // `icon-tooltip` → containers, `instrument-chassis` → data, `labeled-field` → forms;
    // `drawer-live-behind` folded its mode into containers/drawer.
    // BI.W-MATH-PAPER-REMOVE (UF-K3) — `math-paper` dropped: a single-idiom specimen
    // (fira-code math block + `.paper-ink-mark` section rail on a `.paper-grid` ground),
    // a CSS idiom already carried by the paper/grid vocabulary, not a composed scene.
    // BI.W-HERO-DEMOTE (UF-K2) — `hero` dropped: the standalone story duplicated the
    // `/compositions` D1 section landing (the chassis renders the real-scene bento), so it
    // is DEMOTED to that landing. auth-shell is the surviving marquee (the D2 main).
    ["compositions", [
        "auth-shell", "settings",
        "empty-states", "form-validation", "gate-pattern",
        // `chassis` joined at BG.W-STORY-PAGE-API (§4-D — the five demo KINDS
        // side by side over the one StoryPage chassis).
        "chassis",
    ]],
    // The reference-only `composables` category was DELETED at AZ.W-SHELL-CONFIG
    // (the demo IA no longer carries the 22-story reference shelf — clean break, no
    // alias). The category count drops 12 → 11 (auto-derived from EXPECTED_TREE.length).
];

// The category count asserted in the human summary header (truthful to the
// fixture above). A single-story category is forbidden — every category carries
// ≥ 2 rows (the `tools`-dissolution invariant).
const EXPECTED_CATEGORY_COUNT = EXPECTED_TREE.length;

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        MANIFEST: resolve(ROOT, "demo/stories/manifest.ts"),
        STORIES_DIR: resolve(ROOT, "demo/stories"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_STORYBOOK_IA_ARTIFACT",
            "AV-storybook-ia",
        ),
    };
    return _cliPaths;
}

/**
 * Derive the ordered tree from the manifest source: an array of
 * `[categoryId, storyIds[]]` in declaration order. Pure — source injected.
 */
export function deriveTree(src) {
    const catRe =
        /id:\s*"([^"]+)",\s*\n\s*title:[^\n]*\n\s*icon:[^\n]*\n(?:\s*reference:[^\n]*\n)?\s*stories:\s*\[([\s\S]*?)\n\s*\],/g;
    const tree = [];
    let m;
    while ((m = catRe.exec(src))) {
        const cat = m[1];
        const ids = [...m[2].matchAll(/s\(\s*"[^"]+"\s*,\s*"([^"]+)"/g)].map(
            (x) => x[1],
        );
        tree.push([cat, ids]);
    }
    return tree;
}

function setDiff(a, b) {
    const A = new Set(a);
    const B = new Set(b);
    return {
        missing: [...B].filter((x) => !A.has(x)),
        extra: [...A].filter((x) => !B.has(x)),
    };
}

function run() {
    const P = cliPaths();
    const violations = [];
    const facts = {};

    const tree = deriveTree(readFileSync(P.MANIFEST, "utf8"));
    facts.derivedOrder = tree.map(([c]) => c);
    facts.expectedOrder = EXPECTED_TREE.map(([c]) => c);

    // (1) CATEGORY ORDER — exact sequence.
    if (facts.derivedOrder.join(",") !== facts.expectedOrder.join(",")) {
        violations.push(
            `category order drifted from the §1 tree:\n      expected: [${facts.expectedOrder.join(", ")}]\n      derived : [${facts.derivedOrder.join(", ")}]`,
        );
    }

    // (2) STORY SET — per-category id set.
    const derivedMap = new Map(tree);
    for (const [cat, expectedIds] of EXPECTED_TREE) {
        const derivedIds = derivedMap.get(cat);
        if (!derivedIds) {
            violations.push(`category "${cat}" missing from the manifest`);
            continue;
        }
        const { missing, extra } = setDiff(derivedIds, expectedIds);
        if (missing.length)
            violations.push(`category "${cat}" missing story id(s): ${missing.join(", ")}`);
        if (extra.length)
            violations.push(`category "${cat}" has unexpected story id(s): ${extra.join(", ")}`);
    }

    // (3) NO MISSING-STORY — every row resolves to an existing file.
    const missingFiles = [];
    for (const [cat, ids] of tree) {
        for (const id of ids) {
            const file = resolve(P.STORIES_DIR, cat, `${id}.vue`);
            if (!existsSync(file)) missingFiles.push(`${cat}/${id}`);
        }
    }
    facts.missingFiles = missingFiles;
    for (const mf of missingFiles) {
        violations.push(`row ${mf} resolves no SFC → lazy() MissingStory fallback would fire`);
    }

    // (4) TRUTHFUL CATEGORY COUNT — the derived count matches the fixture count.
    facts.categoryCount = facts.derivedOrder.length;
    facts.expectedCategoryCount = EXPECTED_CATEGORY_COUNT;
    if (facts.categoryCount !== EXPECTED_CATEGORY_COUNT) {
        violations.push(
            `category COUNT drifted: derived ${facts.categoryCount}, fixture asserts ${EXPECTED_CATEGORY_COUNT}`,
        );
    }

    // (5) NO SINGLE-STORY CATEGORY — the `tools`-dissolution invariant. Every
    // category carries ≥ 2 rows; a one-story category is a debris bin.
    const singleStory = tree.filter(([, ids]) => ids.length < 2).map(([c]) => c);
    facts.singleStoryCategories = singleStory;
    for (const c of singleStory) {
        violations.push(
            `category "${c}" holds a single story — a debris bin (the tools-dissolution invariant: every category carries ≥ 2 rows)`,
        );
    }

    // (6) NO MANY-ROWS-FOR-ONE-SUBSTRATE — the D6 blob-fold invariant: the three
    // GooBlob facet rows MUST be one `blob` row, never resurface as a trio.
    const subs = derivedMap.get("substrates") ?? [];
    const blobFacetRows = subs.filter((id) =>
        ["goo-blob", "blob-interaction", "blob-mood"].includes(id),
    );
    facts.blobFacetRows = blobFacetRows;
    if (blobFacetRows.length > 0) {
        violations.push(
            `Substrates ships per-facet GooBlob row(s) [${blobFacetRows.join(", ")}] — the blob facets MUST be ONE \`blob\` row (no many-rows-for-one-primitive debris bin)`,
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:storybook-ia",
        facts,
        violations,
    });

    console.log(`proof:storybook-ia — the manifest matches the AX-reinvented ${EXPECTED_CATEGORY_COUNT}-category IA exactly (AX.W18, supersedes AV.W10)`);
    console.log(`  categories : ${facts.derivedOrder.length} (${facts.derivedOrder.join(", ")})`);
    console.log(`  single-story bins: ${singleStory.length}`);
    console.log(`  missing SFCs: ${missingFiles.length}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
