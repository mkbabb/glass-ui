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
//       12-category fixture below EXACTLY (order is load-bearing).
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

// ── The frozen AX-reinvented 12-category IA fixture ──────────────────────────
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
        "paper-glass", "icons", "surface-tints", "overlays-scrims",
        "chart-chassis-palette", "paper-backdrop-texture-system",
        "paper-backdrop", "css-utilities",
    ]],
    // Render backgrounds. The three GooBlob facet rows collapse to ONE `blob`;
    // `fourier-field` is the new Canvas2D render-background sibling. `glass-panel`
    // retired at AY.W-SB1 (a demo-only published component — the renderer-tier
    // lesson lives on at `glass-material` + the use-glass-renderer composable).
    ["substrates", ["aurora", "blob", "constellation", "fourier-field", "glass-material"]],
    // The Primitives bin split: form-controls.
    ["forms", [
        "inputs", "textarea", "checks", "slider", "number-field", "select",
        "combobox", "multi-select", "toggle", "toggle-chip", "label",
    ]],
    // The Primitives bin split: display atoms.
    ["display", [
        "buttons", "card", "badge", "separator", "section", "metric-badge",
        "metric-pill", "status-dot", "pulse", "stacked-icons",
        "dark-mode-toggle",
    ]],
    // Command folds in from the dissolved single-story Tools bin. The standalone
    // `native-top-layer` probe folded into the Dialog + HoverPopover stories as a
    // native opt-in section at AY.W-SB1 (the FIX-ROUTE execution).
    ["containers", [
        "dialog", "sheet", "drawer", "popover",
        "dropdown-menu", "context-menu", "hover-card", "tooltip", "accordion",
        "collapsible", "hover-popover", "expandable-container", "command",
    ]],
    // `header-ribbon` retired at AY.W-SB1 (a published component with 0 non-self
    // consumers — the route prune was finally made component-deep). `deck-progress`
    // retired at AY.W-PRUNE (the declined BOOK — slides ships its own deck-local
    // progress bar; 0 real consumers, RETIRE-FULL public-surface delete).
    ["navigation", [
        "tabs", "carousel",
    ]],
    // The headline primitive's own first-class category.
    ["dock", ["overview", "layers", "rail"]],
    ["data", [
        "table", "data-table", "tags-input", "avatar", "sortable-list",
        "infinite-scroll", "timeline", "timeline-segmented",
        "timeline-continuous", "search", "scrolling-text",
        "metric-cell", "metric-stack",
    ]],
    ["feedback", [
        "alert", "toast", "toaster", "notification", "progress", "skeleton",
        "confirm-dialog",
    ]],
    // `underline` (the GlassUnderline draw-on pen) joined motion at AY.W-UNDERLINE
    // (finished-and-published — the `/underline` subpath ships with its consumer).
    ["motion", [
        "springs", "countup", "reveal", "typewriter", "animated-digit",
        "curve-gallery", "underline",
    ]],
    // `dashboard` retired at AY.W-PRUNE (pure-recipe filler — every primitive it
    // composed has its own story + real consumers). `instrument-rail` +
    // `dock-with-slider` retired with the instrument-rail RETIRE-FULL (the
    // never-published cockpit-rail sibling; instrument-chassis is the shipped chassis).
    ["compositions", [
        "hero", "math-paper", "auth-shell", "settings",
        "empty-states", "drawer-live-behind",
        "configurator", "instrument-chassis",
        "form-validation", "labeled-field", "icon-tooltip", "gate-pattern",
    ]],
    ["composables", [
        "use-token-color",
        "use-global-dark", "use-keyboard-shortcuts", "use-resize-observer",
        "use-glass-renderer", "use-animated-number", "use-dark-mode-sync",
        "use-intersection-pause", "use-raf-loop", "use-scroll-progress",
        "use-spring-orchestrator", "use-stagger-reveal", "use-sortable",
        "use-scroll-tracker", "use-sidebar-follow", "use-sidebar-state",
        "use-tree-index", "use-touch-gate", "use-timer", "use-interval",
        "use-infinite-scroll", "use-clipboard",
    ]],
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
