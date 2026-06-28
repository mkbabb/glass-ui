#!/usr/bin/env node
// BH P3.2 PROTOTYPE — regen-exports-failclosed.mjs
// ============================================================================
// FIXES the fail-OPEN flaw in regen-exports.mjs (P1): there the glob walked
// every ui/custom dir and PUBLISHED any dir NOT in an INTERNAL deny-list — so a
// BG-added dir during the interleave would silently auto-publish onto the 5.0.0
// semver export surface (the C2 blocker). The deny-list defaults a stranger to
// PUBLIC. That is the wrong default for a semver-bearing surface.
//
// THIS prototype is fail-CLOSED:
//   1. EVERY src/components/{ui,custom}/<dir> + EVERY src/composables/<subtree>
//      MUST carry an EXPLICIT classification: PUBLISH | INTERNAL | CURATED.
//      A dir present on disk with NO classification entry is a HARD ERROR
//      (exit 1) — never a silent publish.
//   2. A SYMBOL-FIDELITY existence check over all 18 hand-mapped sources
//      (11 curated + 7 composable) AND every globbed PUBLISH barrel: each
//      source file/barrel must EXIST and be NON-EMPTY (the gate proves the
//      barrel is THERE; verify-export-types post-BUILD proves the symbol SET —
//      see the spec emitted at the end + the re-baseline report).
//   3. The PUBLISH set drives the regen — and the regen still reproduces
//      package.json EXACTLY (zero add/drop/mismatch), proving the explicit
//      classification is a faithful re-expression of the deny-list surface,
//      not a behaviour change.
//
// READ-ONLY on the repo. Writes artifacts ONLY to the proto dir.
// Two RUN MODES (CLI arg):
//   (default)            — real tree; MUST pass (every dir classified, regen 0-delta)
//   --inject-unclassified — real tree + a synthetic phantom dir; MUST error fail-closed
// ============================================================================

import { readdirSync, existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const OUT = dirname(fileURLToPath(import.meta.url));
const MODE = process.argv.includes("--inject-unclassified") ? "inject" : "real";

// ===========================================================================
// CLASSIFICATION — the EXHAUSTIVE, EXPLICIT, fail-closed maps.
// Every dir on disk MUST appear here. Buckets:
//   PUBLISH  — emits a flat ./<name> subpath via the component glob.
//   INTERNAL — has an index.ts but is reached ONLY via the root barrel / a
//              curated barrel / is pure substrate; NOT a subpath. (deny)
//   CURATED  — published, but through a hand-curated flat barrel at src/<name>.ts
//              (the SCC-trap surfaces) NOT through this dir's index.ts. The dir
//              must still be named so it is not flagged unclassified.
// ===========================================================================

// --- src/components/ui/<dir> (43 dirs) ---
const UI_CLASS = {
    // PUBLISH (25)
    badge: "PUBLISH", button: "PUBLISH", card: "PUBLISH", collapsible: "PUBLISH",
    command: "PUBLISH", "context-menu": "PUBLISH", "data-table": "PUBLISH",
    dialog: "PUBLISH", drawer: "PUBLISH", "dropdown-menu": "PUBLISH",
    "focus-scope": "PUBLISH", "hover-card": "PUBLISH", label: "PUBLISH",
    notification: "PUBLISH", "number-field": "PUBLISH", popover: "PUBLISH",
    progress: "PUBLISH", select: "PUBLISH", separator: "PUBLISH", sheet: "PUBLISH",
    slider: "PUBLISH", switch: "PUBLISH", toast: "PUBLISH", "toggle-group": "PUBLISH",
    tooltip: "PUBLISH",
    // INTERNAL (18)
    _shared: "INTERNAL", accordion: "INTERNAL", alert: "INTERNAL", avatar: "INTERNAL",
    carousel: "INTERNAL", checkbox: "INTERNAL", combobox: "INTERNAL", input: "INTERNAL",
    "metric-pill": "INTERNAL", "multi-select": "INTERNAL", "radio-group": "INTERNAL",
    section: "INTERNAL", skeleton: "INTERNAL", table: "INTERNAL", tabs: "INTERNAL",
    "tags-input": "INTERNAL", textarea: "INTERNAL", toggle: "INTERNAL",
};

// --- src/components/custom/<dir> (50 dirs) ---
const CUSTOM_CLASS = {
    // INTERNAL (3)
    "goo-filter": "INTERNAL", "infinite-scroll": "INTERNAL", "split-chars": "INTERNAL",
    // PUBLISH (47)
    "animated-digit": "PUBLISH", aurora: "PUBLISH", "border-progress": "PUBLISH",
    "color-swatch": "PUBLISH", "completion-seal": "PUBLISH", concentric: "PUBLISH",
    configurator: "PUBLISH", "confirm-dialog": "PUBLISH", constellation: "PUBLISH",
    controls: "PUBLISH", deck: "PUBLISH", dock: "PUBLISH", "dot-flow-field": "PUBLISH",
    "dot-matrix": "PUBLISH", easing: "PUBLISH", "expandable-container": "PUBLISH",
    "fading-scroll": "PUBLISH", "fourier-field": "PUBLISH", "glass-panel": "PUBLISH",
    "goo-blob": "PUBLISH", "goo-dot-matrix": "PUBLISH", handmark: "PUBLISH",
    "header-ribbon": "PUBLISH", "hover-popover": "PUBLISH", "icon-chip": "PUBLISH",
    "icon-tooltip": "PUBLISH", "instrument-chassis": "PUBLISH", "labeled-field": "PUBLISH",
    "metric-badge": "PUBLISH", "metric-cell": "PUBLISH", "metric-stack": "PUBLISH",
    "pager-dots": "PUBLISH", "paper-backdrop": "PUBLISH", "paper-grid": "PUBLISH",
    pulse: "PUBLISH", "scrolling-text": "PUBLISH", search: "PUBLISH",
    "selectable-chip": "PUBLISH", "sortable-list": "PUBLISH", "spa-view": "PUBLISH",
    "stacked-icons": "PUBLISH", "status-dot": "PUBLISH", tabs: "PUBLISH",
    timeline: "PUBLISH", "toggle-chip": "PUBLISH", typewriter: "PUBLISH",
    "watercolor-dot": "PUBLISH",
};

// --- src/composables/<subtree> (11 subtrees) ---
const COMPOSABLE_CLASS = {
    color: "PUBLISH", dom: "PUBLISH", reactive: "PUBLISH", virtual: "PUBLISH",
    dark: "CURATED", keyboard: "CURATED", motion: "CURATED", sidebar: "CURATED",
    context: "INTERNAL", glass: "INTERNAL", sortable: "INTERNAL",
};

// ===========================================================================
// HAND-MAPPED SOURCE MAPS (the 18 — used both for the regen AND the
// symbol-fidelity existence check).
// ===========================================================================
const CURATED = {
    index: "src/index.ts", // → root "."
    api: "src/api/index.ts",
    tokens: "src/tokens.ts",
    forms: "src/forms.ts",
    dark: "src/dark.ts",
    keyboard: "src/keyboard.ts",
    carousel: "src/carousel.ts",
    motion: "src/motion.ts",
    "motion-core": "src/motion-core.ts",
    sidebar: "src/sidebar.ts",
    "infinite-scroll": "src/infinite-scroll.ts",
};
const COMPOSABLE_SUBPATHS = {
    color: "src/composables/color/index.ts",
    dom: "src/composables/dom/index.ts",
    reactive: "src/composables/reactive/index.ts",
    virtual: "src/composables/virtual/index.ts",
    canvas: "src/composables/glass/canvas2d/index.ts", // name "canvas" ≠ leaf "canvas2d"
    "motion-curves": "src/composables/motion/curves.ts", // nested file, name ≠ leaf
    "fourier-math": "src/components/custom/fourier-field/math.ts", // nested, name ≠ leaf
};

const CSS_FONT_EXPORTS = {
    "./styles": "./dist/styles/index.css",
    "./styles/critical": "./dist/styles/critical.css",
    "./styles/deferred": "./dist/styles/deferred.css",
    "./styles/fonts": "./dist/styles/fonts.css",
    "./styles.css": "./dist/glass-ui.css",
    "./fonts/*": "./dist/fonts/*",
};
const TYPES_OVERRIDE = { api: "./dist/api/index.d.ts" };

// ===========================================================================
// DISK READ — returns the dir name list per tier. Injectable for the synthetic
// run (read-only: the phantom is appended to the in-memory list, never created).
// ===========================================================================
function dirsWithIndex(relBase) {
    const base = resolve(REPO, relBase);
    return readdirSync(base, { withFileTypes: true })
        .filter((d) => d.isDirectory() && existsSync(resolve(base, d.name, "index.ts")))
        .map((d) => d.name);
}
function readTree() {
    const ui = dirsWithIndex("src/components/ui");
    const custom = dirsWithIndex("src/components/custom");
    const composable = dirsWithIndex("src/composables");
    if (MODE === "inject") {
        // SYNTHETIC unclassified dir — emulates a BG-added dir mid-interleave.
        // It carries an index.ts on the (emulated) disk but appears in NO
        // classification map. Fail-closed MUST flag it. (No real dir created.)
        ui.push("zzz-bg-added-unclassified");
    }
    return { ui, custom, composable };
}

// ===========================================================================
// FAIL-CLOSED CLASSIFICATION CHECK.
// For each tier, EVERY disk dir must have a classification entry; collect the
// unclassified. Also report stale entries (classified but absent from disk).
// ===========================================================================
function classifyTier(diskDirs, classMap, tierLabel) {
    const unclassified = [];
    const counts = { PUBLISH: 0, INTERNAL: 0, CURATED: 0 };
    for (const d of diskDirs) {
        const c = classMap[d];
        if (!c) { unclassified.push(d); continue; }
        counts[c]++;
    }
    const diskSet = new Set(diskDirs);
    const stale = Object.keys(classMap).filter((k) => !diskSet.has(k)).sort();
    return { tier: tierLabel, total: diskDirs.length, counts, unclassified: unclassified.sort(), stale };
}

// ===========================================================================
// SYMBOL-FIDELITY EXISTENCE CHECK.
// Asserts every PUBLISH/CURATED/COMPOSABLE source file/barrel EXISTS + is
// NON-EMPTY. This is the EXISTENCE half of fidelity; the SYMBOL-SET half is
// proven post-build by verify-export-types (specced below). A barrel that
// exists but re-exports the WRONG symbol set passes HERE and FAILS the build
// gate — the two are complementary, neither alone is sufficient.
// ===========================================================================
function fileFidelity(rel) {
    const abs = resolve(REPO, rel);
    if (!existsSync(abs)) return { rel, ok: false, reason: "ABSENT" };
    const sz = statSync(abs).size;
    if (sz === 0) return { rel, ok: false, reason: "EMPTY" };
    const lines = readFileSync(abs, "utf8").split("\n").length;
    return { rel, ok: true, bytes: sz, lines };
}

function symbolFidelity(publishUi, publishCustom) {
    const checks = [];
    // 18 hand-mapped sources
    for (const [name, rel] of Object.entries(CURATED)) checks.push({ kind: "curated", name, ...fileFidelity(rel) });
    for (const [name, rel] of Object.entries(COMPOSABLE_SUBPATHS)) checks.push({ kind: "composable", name, ...fileFidelity(rel) });
    if (process.argv.includes("--break-fidelity")) {
        // SELF-TEST BITE: a hand-mapped source that vanished (e.g. a carve moved
        // it without updating the map). The existence check MUST flag it.
        checks.push({ kind: "curated", name: "phantom", ...fileFidelity("src/this-source-was-deleted.ts") });
    }
    // every globbed PUBLISH barrel
    for (const d of publishUi) checks.push({ kind: "ui-barrel", name: d, ...fileFidelity(`src/components/ui/${d}/index.ts`) });
    for (const d of publishCustom) checks.push({ kind: "custom-barrel", name: d, ...fileFidelity(`src/components/custom/${d}/index.ts`) });
    const failed = checks.filter((c) => !c.ok);
    return { total: checks.length, failed, checks };
}

// ===========================================================================
// REGEN — drive the component glob from the PUBLISH classification (NOT a
// deny-list). Assemble the full entry set + emit exports/typesVersions.
// ===========================================================================
function buildEntrySet(publishUi, publishCustom) {
    const entries = {}; // name -> source rel
    const collisions = [];
    for (const [n, s] of Object.entries(CURATED)) entries[n] = s;
    for (const [n, s] of Object.entries(COMPOSABLE_SUBPATHS)) entries[n] = s;
    for (const d of publishUi) entries[d] = `src/components/ui/${d}/index.ts`;
    for (const d of publishCustom) {
        if (entries[d]) { collisions.push(d); } // custom wins the public key on collision
        entries[d] = `src/components/custom/${d}/index.ts`;
    }
    return { entries, collisions };
}
function emitExports(entries) {
    const exp = {};
    exp["."] = { types: "./dist/index.d.ts", import: "./dist/glass-ui.js", default: "./dist/glass-ui.js" };
    const typesVersions = {};
    for (const name of Object.keys(entries)) {
        if (name === "index") continue;
        const chunk = `./dist/${name}.js`;
        const dts = TYPES_OVERRIDE[name] ?? `./dist/${name}.d.ts`;
        exp[`./${name}`] = { types: dts, import: chunk };
        typesVersions[name] = [dts.replace(/^\.\//, "")];
    }
    for (const [k, v] of Object.entries(CSS_FONT_EXPORTS)) exp[k] = v;
    return { exports: exp, typesVersions: { "*": typesVersions } };
}

// ===========================================================================
// RUN
// ===========================================================================
const tree = readTree();
const uiC = classifyTier(tree.ui, UI_CLASS, "ui");
const customC = classifyTier(tree.custom, CUSTOM_CLASS, "custom");
const compC = classifyTier(tree.composable, COMPOSABLE_CLASS, "composable");

const allUnclassified = [
    ...uiC.unclassified.map((d) => `ui/${d}`),
    ...customC.unclassified.map((d) => `custom/${d}`),
    ...compC.unclassified.map((d) => `composables/${d}`),
];
const allStale = [
    ...uiC.stale.map((d) => `ui/${d}`),
    ...customC.stale.map((d) => `custom/${d}`),
    ...compC.stale.map((d) => `composables/${d}`),
];

const FAIL_CLOSED = allUnclassified.length === 0;

// derive PUBLISH sets (only meaningful when fail-closed passes)
const publishUi = tree.ui.filter((d) => UI_CLASS[d] === "PUBLISH").sort();
const publishCustom = tree.custom.filter((d) => CUSTOM_CLASS[d] === "PUBLISH").sort();

// symbol-fidelity
const fidelity = symbolFidelity(publishUi, publishCustom);

// regen + zero-delta diff (skip the package.json reproduction assert under inject
// — the injected phantom would itself add a spurious ./zzz key; the point of the
// inject run is the fail-closed ERROR, not reproduction)
let regenReport = null;
if (FAIL_CLOSED) {
    const { entries, collisions } = buildEntrySet(publishUi, publishCustom);
    const emitted = emitExports(entries);
    const pkg = JSON.parse(readFileSync(resolve(REPO, "package.json"), "utf8"));
    const curKeys = new Set(Object.keys(pkg.exports));
    const newKeys = new Set(Object.keys(emitted.exports));
    const drops = [...curKeys].filter((k) => !newKeys.has(k)).sort();
    const adds = [...newKeys].filter((k) => !curKeys.has(k)).sort();
    const targetMismatches = [];
    for (const k of curKeys) {
        if (!newKeys.has(k)) continue;
        if (JSON.stringify(pkg.exports[k]) !== JSON.stringify(emitted.exports[k]))
            targetMismatches.push({ key: k, current: pkg.exports[k], emitted: emitted.exports[k] });
    }
    const curTV = pkg.typesVersions["*"];
    const newTV = emitted.typesVersions["*"];
    const tvDrops = Object.keys(curTV).filter((k) => !(k in newTV)).sort();
    const tvAdds = Object.keys(newTV).filter((k) => !(k in curTV)).sort();
    const tvMismatch = Object.keys(curTV).filter((k) => k in newTV && JSON.stringify(curTV[k]) !== JSON.stringify(newTV[k]));
    regenReport = {
        currentExportKeys: curKeys.size, emittedExportKeys: newKeys.size,
        jsSubpaths: Object.keys(entries).filter((n) => n !== "index").length,
        publishUi: publishUi.length, publishCustom: publishCustom.length,
        collisions, drops, adds, targetMismatchCount: targetMismatches.length, targetMismatches,
        tvDrops, tvAdds, tvMismatchCount: tvMismatch.length,
        EXACT_REPRODUCTION: drops.length === 0 && adds.length === 0 && targetMismatches.length === 0 && tvDrops.length === 0 && tvAdds.length === 0 && tvMismatch.length === 0,
    };
}

// ---------------------------------------------------------------------------
// REPORT
// ---------------------------------------------------------------------------
const report = {
    mode: MODE,
    failClosed: { pass: FAIL_CLOSED, unclassified: allUnclassified, stale: allStale },
    tiers: { ui: uiC, custom: customC, composable: compC },
    symbolFidelity: {
        total: fidelity.total,
        failedCount: fidelity.failed.length,
        failed: fidelity.failed,
    },
    regen: regenReport,
};
const outFile = MODE === "inject" ? "failclosed-inject-report.json" : "failclosed-real-report.json";
writeFileSync(resolve(OUT, outFile), JSON.stringify(report, null, 2));

console.log(`=== regen-exports-failclosed — MODE=${MODE} ===\n`);
for (const t of [uiC, customC, compC]) {
    console.log(`[${t.tier}] disk=${t.total}  PUBLISH=${t.counts.PUBLISH} INTERNAL=${t.counts.INTERNAL} CURATED=${t.counts.CURATED}  unclassified=${t.unclassified.length} stale=${t.stale.length}`);
    if (t.unclassified.length) console.log(`    UNCLASSIFIED: ${t.unclassified.join(", ")}`);
    if (t.stale.length) console.log(`    STALE(classified-but-absent): ${t.stale.join(", ")}`);
}
console.log(`\nFAIL-CLOSED CHECK: ${FAIL_CLOSED ? "PASS — every dir classified" : "FAIL — unclassified dir(s) present"}`);
if (!FAIL_CLOSED) console.log(`  >>> ${allUnclassified.length} unclassified: ${allUnclassified.join(", ")}`);

console.log(`\nSYMBOL-FIDELITY EXISTENCE: ${fidelity.total} sources checked, ${fidelity.failed.length} failed`);
if (fidelity.failed.length) for (const f of fidelity.failed) console.log(`  MISSING/EMPTY [${f.kind}] ${f.name}: ${f.rel} (${f.reason})`);
else console.log(`  all 18 hand-mapped + ${publishUi.length + publishCustom.length} globbed barrels EXIST + NON-EMPTY`);

if (regenReport) {
    console.log(`\nREGEN (PUBLISH-driven): exportKeys ${regenReport.emittedExportKeys}/${regenReport.currentExportKeys}  jsSubpaths=${regenReport.jsSubpaths} (ui ${regenReport.publishUi} + custom ${regenReport.publishCustom} + curated/composable)`);
    console.log(`  drops=${regenReport.drops.length} adds=${regenReport.adds.length} targetMismatch=${regenReport.targetMismatchCount} tvDrops=${regenReport.tvDrops.length} tvAdds=${regenReport.tvAdds.length} collisions=${regenReport.collisions.join(",") || "(none)"}`);
    if (regenReport.adds.length) console.log(`  ADDS: ${regenReport.adds.join(", ")}`);
    if (regenReport.drops.length) console.log(`  DROPS: ${regenReport.drops.join(", ")}`);
    console.log(`  >>> EXACT REPRODUCTION: ${regenReport.EXACT_REPRODUCTION ? "YES" : "NO"}`);
}

// ---------------------------------------------------------------------------
// EXIT CONTRACT (the fail-explicit gate semantics):
//   - unclassified dir  => exit 1 (HARD ERROR — the fail-closed fix)
//   - fidelity failure  => exit 1
//   - regen non-exact   => exit 1
//   - all green         => exit 0
// ---------------------------------------------------------------------------
let exit = 0;
if (!FAIL_CLOSED) { console.log("\nEXIT 1 — fail-closed: unclassified dir is a HARD ERROR, never a silent publish."); exit = 1; }
else if (fidelity.failed.length) { console.log("\nEXIT 1 — symbol-fidelity existence failure."); exit = 1; }
else if (regenReport && !regenReport.EXACT_REPRODUCTION) { console.log("\nEXIT 1 — regen no longer reproduces package.json."); exit = 1; }
else console.log("\nEXIT 0 — fail-closed PASS + fidelity PASS + regen exact.");
console.log(`artifact: ${outFile}`);
process.exit(exit);
