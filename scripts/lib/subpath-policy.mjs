// subpath-policy.mjs — the SINGLE-SOURCE subpath classification + entry-map leaf
// (BH.B2.1-mech).
// ============================================================================
// The published-subpath surface (`package.json` exports + the `dist/<name>.js`
// chunk set + the vite `libraryEntries()` map) is re-derived from ONE explicit,
// fail-CLOSED classification of the colocated component/composable barrels — NOT
// from the 79 hand-written `src/subpaths/*.ts` mirror lines NOR from a deny-list
// that defaults a stranger to PUBLIC.
//
// THIS module is the single source feeding BOTH:
//   • `libraryEntries()` (the vite entry map — `libraryEntryMap()` below), and
//   • the fail-CLOSED generator `scripts/regen-exports.mjs`.
// so the entry NAME set and the export key set can never drift from one hand-list.
//
// FAIL-CLOSED is the cardinal property: EVERY `src/components/{ui,custom}/<dir>`
// and EVERY `src/composables/<subtree>` present on disk MUST carry an EXPLICIT
// bucket — PUBLISH | INTERNAL | CURATED. A dir on disk with NO classification
// entry is a HARD ERROR (the generator exits 1), never a silent auto-publish onto
// the semver-bearing export surface (the fail-OPEN flaw a deny-list carries: a
// BG-added dir mid-interleave would silently publish).
//
// Buckets:
//   PUBLISH  — emits a flat `./<name>` subpath via the component glob (its own
//              `index.ts` barrel is the entry source).
//   INTERNAL — has an `index.ts` but is reached ONLY via the root barrel / a
//              curated barrel / is pure substrate; NOT a subpath. (deny)
//   CURATED  — published, but through a hand-curated flat barrel (the SCC-trap
//              surfaces — `dark`/`keyboard`/`motion`/`sidebar`) NOT through this
//              dir's `index.ts`. The dir must still be NAMED so it is not flagged
//              unclassified.
//
// READ-ONLY on the repo. Pure data + pure helpers; no side effects on import.
// ============================================================================

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// REPO_ROOT — this leaf lives at <root>/scripts/lib/, so up two.
export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// ===========================================================================
// THE THREE POLICY MAPS — the EXHAUSTIVE, EXPLICIT, fail-closed classification.
// Every dir on disk MUST appear in its tier's map.
// ===========================================================================

// --- src/components/ui/<dir> ---
export const UI_CLASS = {
    // PUBLISH (25)
    badge: "PUBLISH", button: "PUBLISH", card: "PUBLISH", collapsible: "PUBLISH",
    command: "PUBLISH", "context-menu": "PUBLISH", "data-table": "PUBLISH",
    dialog: "PUBLISH", drawer: "PUBLISH", "dropdown-menu": "PUBLISH",
    "focus-scope": "PUBLISH", "hover-card": "PUBLISH", label: "PUBLISH",
    notification: "PUBLISH", "number-field": "PUBLISH", popover: "PUBLISH",
    progress: "PUBLISH", select: "PUBLISH", separator: "PUBLISH", sheet: "PUBLISH",
    slider: "PUBLISH", switch: "PUBLISH", toast: "PUBLISH", "toggle-group": "PUBLISH",
    tooltip: "PUBLISH",
    // INTERNAL (18) — reached via the root barrel / a curated subpath / substrate.
    _shared: "INTERNAL", accordion: "INTERNAL", alert: "INTERNAL", avatar: "INTERNAL",
    carousel: "INTERNAL", checkbox: "INTERNAL", combobox: "INTERNAL", input: "INTERNAL",
    "metric-pill": "INTERNAL", "multi-select": "INTERNAL", "radio-group": "INTERNAL",
    section: "INTERNAL", skeleton: "INTERNAL", table: "INTERNAL", tabs: "INTERNAL",
    "tags-input": "INTERNAL", textarea: "INTERNAL", toggle: "INTERNAL",
};

// --- src/components/custom/<dir> ---
export const CUSTOM_CLASS = {
    // INTERNAL (3)
    "goo-filter": "INTERNAL", "infinite-scroll": "INTERNAL", "split-chars": "INTERNAL",
    // PUBLISH (46) — goo-dot-matrix RETIRED at BG.W-GOODOT-PRUNE (0 external consumers).
    "animated-digit": "PUBLISH", aurora: "PUBLISH", "border-progress": "PUBLISH",
    "color-swatch": "PUBLISH", "completion-seal": "PUBLISH", concentric: "PUBLISH",
    configurator: "PUBLISH", "confirm-dialog": "PUBLISH", constellation: "PUBLISH",
    controls: "PUBLISH", deck: "PUBLISH", dock: "PUBLISH", "dot-flow-field": "PUBLISH",
    "dot-matrix": "PUBLISH", easing: "PUBLISH", "expandable-container": "PUBLISH",
    "fading-scroll": "PUBLISH", "fourier-field": "PUBLISH", "glass-panel": "PUBLISH",
    "goo-blob": "PUBLISH", handmark: "PUBLISH",
    "header-ribbon": "PUBLISH", "hover-popover": "PUBLISH", "icon-chip": "PUBLISH",
    "icon-tooltip": "PUBLISH", "instrument-chassis": "PUBLISH", "labeled-field": "PUBLISH",
    "metric-badge": "PUBLISH", "metric-cell": "PUBLISH", "metric-stack": "PUBLISH",
    "pager-dots": "PUBLISH", "paper-backdrop": "PUBLISH", "liquid-grid": "PUBLISH",
    pulse: "PUBLISH", "scrolling-text": "PUBLISH", search: "PUBLISH",
    "selectable-chip": "PUBLISH", "sortable-list": "PUBLISH", "spa-view": "PUBLISH",
    "stacked-icons": "PUBLISH", "status-dot": "PUBLISH", tabs: "PUBLISH",
    timeline: "PUBLISH", "toggle-chip": "PUBLISH", typewriter: "PUBLISH",
    "watercolor-dot": "PUBLISH",
};

// --- src/composables/<subtree> ---
export const COMPOSABLE_CLASS = {
    // PUBLISH (4) — published through their own index.ts.
    color: "PUBLISH", dom: "PUBLISH", reactive: "PUBLISH", virtual: "PUBLISH",
    // CURATED (4) — the vueuse/keyframes-bearing SCC-trap surfaces published via a
    // hand-curated flat barrel at src/<name>.ts, NOT this subtree's index.ts.
    dark: "CURATED", keyboard: "CURATED", motion: "CURATED", sidebar: "CURATED",
    // INTERNAL (3) — substrate (context DI factory / glass GL substrate / sortable).
    context: "INTERNAL", glass: "INTERNAL", sortable: "INTERNAL",
};

export const TIERS = [
    { tier: "ui", relBase: "src/components/ui", classMap: UI_CLASS },
    { tier: "custom", relBase: "src/components/custom", classMap: CUSTOM_CLASS },
    { tier: "composable", relBase: "src/composables", classMap: COMPOSABLE_CLASS },
];

// ===========================================================================
// HAND-MAPPED SOURCE MAPS — the curated multi-line barrels + the nested-leaf
// composable subpaths whose NAME ≠ on-disk leaf. Used for BOTH the entry map AND
// the symbol-fidelity existence check.
// ===========================================================================

// The 12 curated barrels at src/ top level (`index` → the root "." key).
export const CURATED = {
    index: "src/index.ts",
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
    // BH.W-AXIS-GRAMMAR — the types-only `/axes` discovery subpath (the honest
    // `/api` successor: the four grammar axes + their frozen tuples, GENERATED).
    axes: "src/axes.ts",
};

// The 7 composable subpaths whose entry source is a nested leaf (name ≠ leaf).
export const COMPOSABLE_SUBPATHS = {
    color: "src/composables/color/index.ts",
    dom: "src/composables/dom/index.ts",
    reactive: "src/composables/reactive/index.ts",
    virtual: "src/composables/virtual/index.ts",
    canvas: "src/composables/glass/canvas2d/index.ts", // name "canvas" ≠ leaf "canvas2d"
    "motion-curves": "src/composables/motion/curves.ts", // nested file, name ≠ leaf
    "fourier-math": "src/components/custom/fourier-field/math.ts", // nested, name ≠ leaf
};

// The non-JS export keys — verbatim, never derived.
export const CSS_FONT_EXPORTS = {
    "./styles": "./dist/styles/index.css",
    // BG.W-CSS-MINIFY (F8.4) — the `./styles/critical` + `./styles/deferred`
    // split exports RETIRED: after the publish-time minify the ~13KB saving was
    // not worth its wave + gate + manifest + two exports. The `./styles` union
    // stays the one byte-complete entry (a splitter consumer folds onto it).
    "./styles/fonts": "./dist/styles/fonts.css",
    "./styles.css": "./dist/glass-ui.css",
    "./fonts/*": "./dist/fonts/*",
};

// Per-name `.d.ts` overrides (the one subpath whose types live in a nested dir).
export const TYPES_OVERRIDE = { api: "./dist/api/index.d.ts" };

// ===========================================================================
// DISK READ — the dir name list per tier. `injectUnclassified` appends a
// SYNTHETIC phantom dir to the in-memory ui list (the self-test bite — emulates a
// BG-added dir mid-interleave that carries an index.ts but no classification);
// nothing is created on disk.
// ===========================================================================

export function dirsWithIndex(relBase, repoRoot = REPO_ROOT) {
    const base = resolve(repoRoot, relBase);
    return readdirSync(base, { withFileTypes: true })
        .filter((d) => d.isDirectory() && existsSync(resolve(base, d.name, "index.ts")))
        .map((d) => d.name);
}

export const PHANTOM_DIR = "zzz-bg-added-unclassified";

export function readTree({ injectUnclassified = false, repoRoot = REPO_ROOT } = {}) {
    const ui = dirsWithIndex("src/components/ui", repoRoot);
    const custom = dirsWithIndex("src/components/custom", repoRoot);
    const composable = dirsWithIndex("src/composables", repoRoot);
    if (injectUnclassified) ui.push(PHANTOM_DIR);
    return { ui, custom, composable };
}

// ===========================================================================
// FAIL-CLOSED CLASSIFICATION. For each tier, EVERY disk dir must have a
// classification entry; collect the unclassified (HARD ERROR) + the stale
// (classified but absent from disk — a soft, reported drift).
// ===========================================================================

export function classifyTier(diskDirs, classMap, tierLabel) {
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

export function classifyAll(tree) {
    const ui = classifyTier(tree.ui, UI_CLASS, "ui");
    const custom = classifyTier(tree.custom, CUSTOM_CLASS, "custom");
    const composable = classifyTier(tree.composable, COMPOSABLE_CLASS, "composable");
    const unclassified = [
        ...ui.unclassified.map((d) => `ui/${d}`),
        ...custom.unclassified.map((d) => `custom/${d}`),
        ...composable.unclassified.map((d) => `composables/${d}`),
    ];
    const stale = [
        ...ui.stale.map((d) => `ui/${d}`),
        ...custom.stale.map((d) => `custom/${d}`),
        ...composable.stale.map((d) => `composables/${d}`),
    ];
    return { tiers: { ui, custom, composable }, unclassified, stale, pass: unclassified.length === 0 };
}

export function publishSets(tree) {
    const publishUi = tree.ui.filter((d) => UI_CLASS[d] === "PUBLISH").sort();
    const publishCustom = tree.custom.filter((d) => CUSTOM_CLASS[d] === "PUBLISH").sort();
    return { publishUi, publishCustom };
}

// ===========================================================================
// ENTRY SET — name → SOURCE rel path. The PUBLISH classification drives the
// component glob (NOT a deny-list). This is the data BOTH `libraryEntries()` and
// the generator consume. `custom` wins a name collision against `ui` (the public
// key is the custom family's).
// ===========================================================================

export function buildEntrySet(tree) {
    const { publishUi, publishCustom } = publishSets(tree);
    const entries = {}; // name -> source rel
    const collisions = [];
    for (const [n, s] of Object.entries(CURATED)) entries[n] = s;
    for (const [n, s] of Object.entries(COMPOSABLE_SUBPATHS)) entries[n] = s;
    for (const d of publishUi) entries[d] = `src/components/ui/${d}/index.ts`;
    for (const d of publishCustom) {
        if (entries[d]) collisions.push(d); // custom wins the public key on collision
        entries[d] = `src/components/custom/${d}/index.ts`;
    }
    return { entries, collisions, publishUi, publishCustom };
}

/**
 * The vite-consumable entry map: `{ name: absolutePath }`, re-derived from the
 * colocated barrels. This is the form `libraryEntries()` consumes once the
 * `src/subpaths/` mirror dir is retired (B2.1-swap). Throws fail-closed if any
 * disk dir is unclassified — the entry map is never silently incomplete.
 */
export function libraryEntryMap(repoRoot = REPO_ROOT) {
    const tree = readTree({ repoRoot });
    const cls = classifyAll(tree);
    if (!cls.pass) {
        throw new Error(
            `subpath-policy: ${cls.unclassified.length} unclassified dir(s) — ${cls.unclassified.join(", ")}`,
        );
    }
    const { entries } = buildEntrySet(tree);
    const map = {};
    for (const [name, rel] of Object.entries(entries)) map[name] = resolve(repoRoot, rel);
    return map;
}

// ===========================================================================
// EXPORTS EMIT — the package.json `exports` + `typesVersions["*"]` shape.
// `index` is the root "." key; every other entry name emits `./<name>` →
// `dist/<name>.js` (+ its `.d.ts`, with the per-name TYPES_OVERRIDE).
// ===========================================================================

export function emitExports(entries) {
    const exp = {};
    exp["."] = { types: "./dist/index.d.ts", import: "./dist/glass-ui.js", default: "./dist/glass-ui.js" };
    const typesVersions = {};
    for (const name of Object.keys(entries)) {
        if (name === "index") continue;
        const dts = TYPES_OVERRIDE[name] ?? `./dist/${name}.d.ts`;
        exp[`./${name}`] = { types: dts, import: `./dist/${name}.js` };
        typesVersions[name] = [dts.replace(/^\.\//, "")];
    }
    for (const [k, v] of Object.entries(CSS_FONT_EXPORTS)) exp[k] = v;
    return { exports: exp, typesVersions: { "*": typesVersions } };
}

// ===========================================================================
// SYMBOL-FIDELITY EXISTENCE CHECK — every PUBLISH/CURATED/COMPOSABLE source
// file/barrel EXISTS + is NON-EMPTY. This is the EXISTENCE half of fidelity; the
// SYMBOL-SET half is proven post-build by `verify-export-types`. A barrel that
// exists but re-exports the WRONG symbol set passes HERE and FAILS the build gate
// — the two are complementary, neither alone is sufficient.
// `breakFidelity` injects a phantom hand-mapped source (the self-test bite —
// emulates a carve that moved a source without updating the map).
// ===========================================================================

export function fileFidelity(rel, repoRoot = REPO_ROOT) {
    const abs = resolve(repoRoot, rel);
    if (!existsSync(abs)) return { rel, ok: false, reason: "ABSENT" };
    const sz = statSync(abs).size;
    if (sz === 0) return { rel, ok: false, reason: "EMPTY" };
    const lines = readFileSync(abs, "utf8").split("\n").length;
    return { rel, ok: true, bytes: sz, lines };
}

export const PHANTOM_SOURCE = "src/this-source-was-deleted.ts";

export function symbolFidelity(tree, { breakFidelity = false, repoRoot = REPO_ROOT } = {}) {
    const { publishUi, publishCustom } = publishSets(tree);
    const checks = [];
    for (const [name, rel] of Object.entries(CURATED)) checks.push({ kind: "curated", name, ...fileFidelity(rel, repoRoot) });
    for (const [name, rel] of Object.entries(COMPOSABLE_SUBPATHS)) checks.push({ kind: "composable", name, ...fileFidelity(rel, repoRoot) });
    if (breakFidelity) checks.push({ kind: "curated", name: "phantom", ...fileFidelity(PHANTOM_SOURCE, repoRoot) });
    for (const d of publishUi) checks.push({ kind: "ui-barrel", name: d, ...fileFidelity(`src/components/ui/${d}/index.ts`, repoRoot) });
    for (const d of publishCustom) checks.push({ kind: "custom-barrel", name: d, ...fileFidelity(`src/components/custom/${d}/index.ts`, repoRoot) });
    const failed = checks.filter((c) => !c.ok);
    return { total: checks.length, failed, checks };
}
