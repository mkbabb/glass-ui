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
// FAIL-CLOSED is the cardinal property: EVERY `src/components/<dir>` and EVERY
// `src/composables/<subtree>` present on disk MUST carry an EXPLICIT
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
// THE TWO POLICY MAPS — the EXHAUSTIVE, EXPLICIT, fail-closed classification.
// Every dir on disk MUST appear in its tier's map.
// ===========================================================================

// --- src/components/<dir> ---
export const COMPONENT_CLASS = {
    // PUBLISH (21) — the shadcn-shaped set.
    badge: "PUBLISH", button: "PUBLISH", card: "PUBLISH", collapsible: "PUBLISH",
    command: "PUBLISH", "data-table": "PUBLISH",
    dialog: "PUBLISH", drawer: "PUBLISH", "dropdown-menu": "PUBLISH",
    label: "PUBLISH",
    "number-field": "PUBLISH", popover: "PUBLISH",
    progress: "PUBLISH", select: "PUBLISH", separator: "PUBLISH",
    // BI.W-DIALOG-PLACEMENT retired sheet (folded onto <DialogContent placement>).
    // BI.W-SURFACE-EXTRACT — the extracted bare (tier × decoration) glass plate.
    surface: "PUBLISH",
    slider: "PUBLISH", switch: "PUBLISH", toast: "PUBLISH", "toggle-group": "PUBLISH",
    tooltip: "PUBLISH",
    // INTERNAL (12) — reached via the root barrel / a curated subpath / substrate.
    _shared: "INTERNAL", accordion: "INTERNAL", alert: "INTERNAL", avatar: "INTERNAL",
    carousel: "INTERNAL", checkbox: "INTERNAL", input: "INTERNAL",
    "radio-group": "INTERNAL",
    skeleton: "INTERNAL", table: "INTERNAL",
    "tags-input": "INTERNAL", textarea: "INTERNAL",
    // INTERNAL (1)
    "infinite-scroll": "INTERNAL",
    // PUBLISH (29) — the custom/glass-native set.
    "animated-digit": "PUBLISH", aurora: "PUBLISH",
    "completion-seal": "PUBLISH",
    // BI.W-CHIP-FOLD: the one explicit-mode <Chip> family.
    chip: "PUBLISH",
    // BI.W-DIALOG-PLACEMENT demoted confirm-dialog to a consumer Dialog preset.
    configurator: "PUBLISH", constellation: "PUBLISH",
    "dark-mode-toggle": "PUBLISH", deck: "PUBLISH", dock: "PUBLISH",
    easing: "PUBLISH", "expandable-container": "PUBLISH",
    // BI.W-GLASS-DEDUP retired glass-panel (FAM-10; the Surface/Card axis is the one plate).
    "fading-scroll": "PUBLISH", "fourier-field": "PUBLISH",
    blob: "PUBLISH", handmark: "PUBLISH",
    // BI.W-OVERLAY-UNION retired hover-popover (folded onto <Popover trigger="hover">).
    "header-ribbon": "PUBLISH",
    "instrument-chassis": "PUBLISH", "labeled-field": "PUBLISH",
    metric: "PUBLISH",
    "pager-dots": "PUBLISH", "paper-backdrop": "PUBLISH",
    search: "PUBLISH", "scroll-progress-rim": "PUBLISH",
    // BI.W-SPEEDTEST-ONLY-PAIR: scrolling-text RETIRED (speedtest-only; the ask-row offers the mechanism).
    "sortable-list": "PUBLISH",
    "status-dot": "PUBLISH", tabs: "PUBLISH",
    timeline: "PUBLISH", typewriter: "PUBLISH",
    "watercolor-dot": "PUBLISH",
};

// --- src/composables/<subtree> ---
export const COMPOSABLE_CLASS = {
    // PUBLISH (3) — published through their own index.ts.
    color: "PUBLISH", dom: "PUBLISH", reactive: "PUBLISH",
    // CURATED (4) — the vueuse/keyframes-bearing SCC-trap surfaces published via a
    // hand-curated flat barrel at src/<name>.ts, NOT this subtree's index.ts.
    dark: "CURATED", keyboard: "CURATED", motion: "CURATED", sidebar: "CURATED",
    // INTERNAL (2) — substrate (context DI factory / glass GL substrate).
    context: "INTERNAL", glass: "INTERNAL",
};

export const TIERS = [
    { tier: "component", relBase: "src/components", classMap: COMPONENT_CLASS },
    { tier: "composable", relBase: "src/composables", classMap: COMPOSABLE_CLASS },
];

// ===========================================================================
// HAND-MAPPED SOURCE MAPS — the curated multi-line barrels + the nested-leaf
// composable subpaths whose NAME ≠ on-disk leaf. Used for BOTH the entry map AND
// the symbol-fidelity existence check.
// ===========================================================================

// The 11 curated barrels at src/ top level (`index` → the root "." key).
// BH.B2.2 W-api-fold — the `/api` discovery subpath is DROPPED (clean break, no
// alias): its 203 canonical symbols re-home onto the root barrel + the per-family
// subpaths (MIGRATION.md ## 5.0.0 table), and the types-only `/axes` grammar
// subpath is the honest successor for the four axis vocabularies. No `api:` entry
// → the regen emits no `./api` export key + no `typesVersions.api`.
export const CURATED = {
    index: "src/index.ts",
    tokens: "src/styles/tokens.ts",
    forms: "src/forms.ts",
    dark: "src/composables/dark/index.ts",
    keyboard: "src/composables/keyboard/index.ts",
    carousel: "src/components/carousel/index.ts",
    motion: "src/composables/motion/index.ts",
    "motion-core": "src/composables/motion/core/index.ts",
    sidebar: "src/composables/sidebar/index.ts",
    "infinite-scroll": "src/components/infinite-scroll/index.ts",
    // BH.W-AXIS-GRAMMAR — the types-only `/axes` discovery subpath (the honest
    // `/api` successor: the four grammar axes + their frozen tuples, GENERATED).
    axes: "src/components/_shared/axes.ts",
    // BI.W-BLOB-SEAMS (RP-2 / L20) — the value.js-FREE `/blob-config` config leaf.
    // This maps directly to the real config barrel so `namedExports` + fidelity
    // read the concrete surface
    // (the `canvas`/`fourier-math` name≠leaf pattern). A config-only consumer imports
    // the `BlobConfig` shape + hero preset WITHOUT Blob.vue's value.js `/color` eager
    // weight (~−33 KiB), the established dynamic color-leaf discipline.
    "blob-config": "src/components/blob/config.ts",
};

// Additional composable entries whose source is not a curated root barrel.
export const COMPOSABLE_SUBPATHS = {
    color: "src/composables/color/index.ts",
    dom: "src/composables/dom/index.ts",
    reactive: "src/composables/reactive/index.ts",
    canvas: "src/composables/glass/canvas2d/index.ts", // name "canvas" ≠ leaf "canvas2d"
    "fourier-math": "src/components/fourier-field/math.ts", // nested, name ≠ leaf
};

// The non-JS export keys — verbatim, never derived.
export const CSS_FONT_EXPORTS = {
    "./styles": "./dist/styles/index.css",
    // BG.W-CSS-MINIFY (F8.4) — the `./styles/critical` + `./styles/deferred`
    // split exports RETIRED: after the publish-time minify the ~13KB saving was
    // not worth its wave + gate + manifest + two exports. The `./styles` union
    // stays the one byte-complete entry (a splitter consumer folds onto it).
    "./styles/fonts": "./dist/styles/fonts.css",
    // Q060 / ATLAS-N C4 — Tailwind v4 registration only: the @theme aliases
    // and dark variant, without the component cascade or resolved base tokens.
    "./styles/theme": "./dist/styles/theme.css",
    "./styles.css": "./dist/glass-ui.css",
    "./fonts/*": "./dist/fonts/*",
};

// Per-name `.d.ts` overrides (a subpath whose types live in a nested dir). Empty
// since BH.B2.2 dropped `/api` (its `./dist/api/index.d.ts` override was the sole
// member); kept as the extension seam for a future nested-types subpath.
export const TYPES_OVERRIDE = {};

// ===========================================================================
// DISK READ — the dir name list per tier. `injectUnclassified` appends a
// SYNTHETIC phantom dir to the in-memory component list (the self-test bite — emulates a
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
    const component = dirsWithIndex("src/components", repoRoot);
    const composable = dirsWithIndex("src/composables", repoRoot);
    if (injectUnclassified) component.push(PHANTOM_DIR);
    return { component, composable };
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
    const component = classifyTier(tree.component, COMPONENT_CLASS, "component");
    const composable = classifyTier(tree.composable, COMPOSABLE_CLASS, "composable");
    const unclassified = [
        ...component.unclassified.map((d) => `components/${d}`),
        ...composable.unclassified.map((d) => `composables/${d}`),
    ];
    const stale = [
        ...component.stale.map((d) => `components/${d}`),
        ...composable.stale.map((d) => `composables/${d}`),
    ];
    return { tiers: { component, composable }, unclassified, stale, pass: unclassified.length === 0 };
}

export function publishSets(tree) {
    const publishComponents = tree.component.filter((d) => COMPONENT_CLASS[d] === "PUBLISH").sort();
    return { publishComponents };
}

// ===========================================================================
// ENTRY SET — name → SOURCE rel path. The PUBLISH classification drives the
// component glob (NOT a deny-list). This is the data both the package generator
// and the declaration entry generator consume.
// ===========================================================================

export function buildEntrySet(tree) {
    const { publishComponents } = publishSets(tree);
    const entries = {}; // name -> source rel
    for (const [n, s] of Object.entries(CURATED)) entries[n] = s;
    for (const [n, s] of Object.entries(COMPOSABLE_SUBPATHS)) entries[n] = s;
    for (const d of publishComponents) {
        if (entries[d]) throw new Error(`subpath-policy: duplicate entry name ${d}`);
        entries[d] = `src/components/${d}/index.ts`;
    }
    return { entries, collisions: [], publishComponents };
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
    const { publishComponents } = publishSets(tree);
    const checks = [];
    for (const [name, rel] of Object.entries(CURATED)) checks.push({ kind: "curated", name, ...fileFidelity(rel, repoRoot) });
    for (const [name, rel] of Object.entries(COMPOSABLE_SUBPATHS)) checks.push({ kind: "composable", name, ...fileFidelity(rel, repoRoot) });
    if (breakFidelity) checks.push({ kind: "curated", name: "phantom", ...fileFidelity(PHANTOM_SOURCE, repoRoot) });
    for (const d of publishComponents) checks.push({ kind: "component-barrel", name: d, ...fileFidelity(`src/components/${d}/index.ts`, repoRoot) });
    const failed = checks.filter((c) => !c.ok);
    return { total: checks.length, failed, checks };
}
