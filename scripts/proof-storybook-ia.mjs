#!/usr/bin/env node
// AV.W10 — the storybook-IA gate (proof:storybook-ia).
//
// The storybook re-invention collapses 16 messy categories to a coherent
// 11-category IA: Substrates rises to 2nd (aurora · goo-blob · glass-panel),
// the dock consolidates into Navigation, the single-story debris bins dissolve,
// and configurator / hover-popover leave Primitives. This gate FREEZES that tree
// so it cannot silently drift:
//
//   (1) CATEGORY ORDER — the manifest's category id sequence matches the §1
//       11-category fixture EXACTLY (order is load-bearing: Substrates 2nd).
//   (2) STORY SET — each category's story id SET matches the §1 fixture EXACTLY
//       (no missing/extra/recategorized row).
//   (3) NO MISSING-STORY — every `<category>/<id>` row resolves to an existing
//       `demo/stories/<category>/<id>.vue` file (the `lazy()` MissingStory
//       render-fallback never fires).
//
// The expected tree is the frozen §1 fixture below. The manifest parse +
// glob-existence check are pure given injected source/fs.
//
// inv ε / bite-check: reorder a category off the §1 order → RED (1); add/drop a
// story id in a category → RED (2); add a row pointing at a nonexistent file →
// RED (3).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── The frozen §1 11-category IA fixture ─────────────────────────────────────
// Category order is asserted as a sequence; each category's story ids are
// asserted as a SET (intra-category order is presentational).
export const EXPECTED_TREE = [
    ["foundations", [
        "intro", "colors", "typography", "radii", "shadows", "motion",
        "paper-glass", "icons", "surface-tints", "overlays-scrims",
        "chart-chassis-palette", "paper-backdrop-texture-system",
        "paper-backdrop", "dock-active-tokens", "css-utilities",
    ]],
    ["substrates", ["aurora", "goo-blob", "glass-panel"]],
    ["primitives", [
        "buttons", "card", "inputs", "textarea", "checks", "slider",
        "number-field", "select", "combobox", "multi-select", "toggle",
        "toggle-chip", "label", "badge", "separator", "section",
        "metric-badge", "metric-pill", "status-dot", "pulse", "stacked-icons",
        "dark-mode-toggle", "glyph-face", "disco-glyph",
    ]],
    ["containers", [
        "dialog", "native-top-layer", "sheet", "drawer", "popover",
        "dropdown-menu", "context-menu", "hover-card", "tooltip", "accordion",
        "collapsible", "hover-popover", "expandable-container",
    ]],
    ["navigation", [
        "tabs", "dock", "dock-layers", "rail", "carousel", "glass-carousel",
    ]],
    ["data", [
        "table", "data-table", "tags-input", "avatar", "sortable-list",
        "infinite-scroll", "timeline", "timeline-segmented",
        "timeline-continuous", "search", "scrolling-text",
    ]],
    ["feedback", [
        "alert", "toast", "toaster", "notification", "progress", "skeleton",
        "confirm-dialog",
    ]],
    ["motion", ["transitions", "springs", "countup", "reveal", "typewriter"]],
    ["tools", ["command"]],
    ["compositions", [
        "hero", "math-paper", "dashboard", "auth-shell", "settings",
        "empty-states", "dock-with-slider", "drawer-live-behind",
        "configurator", "instrument-chassis", "form-validation",
        "labeled-field", "icon-tooltip",
    ]],
    ["composables", [
        "use-token-color", "use-stagger", "use-animated-number-map",
        "use-global-dark", "use-keyboard-shortcuts", "use-resize-observer",
        "use-glass-renderer", "use-animated-number", "use-dark-mode-sync",
        "use-intersection-pause", "use-raf-loop", "use-scroll-progress",
        "use-spring-orchestrator", "use-stagger-reveal", "use-sortable",
        "use-scroll-tracker", "use-sidebar-follow", "use-sidebar-state",
        "use-tree-index", "use-touch-gate", "use-timer", "use-interval",
        "use-infinite-scroll", "use-clipboard",
    ]],
];

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

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:storybook-ia",
        facts,
        violations,
    });

    console.log("proof:storybook-ia — the manifest matches the §1 11-category IA exactly (AV.W10)");
    console.log(`  categories : ${facts.derivedOrder.length} (${facts.derivedOrder.join(", ")})`);
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
