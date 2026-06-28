#!/usr/bin/env node
// BH P1 PROTOTYPE — regen-exports.mjs
// Proves the 5.0.0 export-reshape: DELETE src/subpaths/ (79 mirror barrels) + the
// 11 curated flat barrels stay; regenerate package.json "exports" + "typesVersions"
// from a GLOB over the real colocated *.index.ts barrels.
//
// SOURCE OF TRUTH = the glob, with two explicit policy maps:
//   EXPORT_NAME : the name≠dir override cases (subpath key ≠ source-dir leaf)
//   INTERNAL    : dirs that have an index.ts but are NOT published (root-barrel-only
//                 / internal substrate). A blind glob would publish them — this set
//                 is the explicit "deliberately not a subpath" allowlist.
//
// READ-ONLY on the repo. Writes its emitted block + diff ONLY to the proto dir.

import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const OUT = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// POLICY MAP 1 — the 11 CURATED flat barrels (hand-curation, stay at src/ top
// level OR src/api/). In 5.0.0 they move to src/entries/ per the plan, but the
// EXPORT KEY + dist chunk name are unchanged. `index` → root `.`.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// POLICY MAP 2 — the composable-subtree + nested publications (name → source).
// These are NOT a ui/custom component dir; they publish a composables leaf or a
// nested file. EXPORT_NAME-style overrides where the key ≠ the dir leaf.
// ---------------------------------------------------------------------------
const COMPOSABLE_SUBPATHS = {
    color: "src/composables/color/index.ts",
    dom: "src/composables/dom/index.ts",
    reactive: "src/composables/reactive/index.ts",
    virtual: "src/composables/virtual/index.ts",
    canvas: "src/composables/glass/canvas2d/index.ts", // name "canvas" ≠ leaf "canvas2d"
    "motion-curves": "src/composables/motion/curves.ts", // nested file, name≠leaf "curves"
    "fourier-math": "src/components/custom/fourier-field/math.ts", // nested, name≠leaf "math"
};

// ---------------------------------------------------------------------------
// POLICY MAP 3 — INTERNAL: ui/custom dirs WITH an index.ts that are NOT published
// as a flat subpath (reach consumers only via the root barrel, or pure internal
// substrate). The glob would otherwise publish them. This is the explicit
// "deliberately not a subpath" allowlist — the clean-break decision surface.
// ---------------------------------------------------------------------------
const INTERNAL_UI = new Set([
    "_shared", // ModalOverlay/menuItemVariants — internal shared, never a subpath
    "accordion",
    "alert",
    "avatar",
    "carousel", // ui/carousel is the reka substrate; the CURATED /carousel barrel publishes
    "checkbox",
    "combobox",
    "input", // /forms curated barrel
    "metric-pill",
    "multi-select",
    "radio-group",
    "section",
    "skeleton",
    "table",
    "tabs", // ui/tabs reka substrate INTERNAL; the published ./tabs = custom/tabs
    "tags-input",
    "textarea", // /forms curated barrel
    "toggle",
]);
const INTERNAL_CUSTOM = new Set([
    "goo-filter", // BD.W-MORPH-FIELD-WELD: the single goo <filter> mount, internal
    "infinite-scroll", // CURATED /infinite-scroll barrel publishes (component+composable pair)
    "split-chars", // root barrel + /motion-core, no own flat subpath
    "tabs", // custom/tabs IS published as ./tabs (handled below) — NOT internal
]);
// custom/tabs publishes as ./tabs; remove it from the internal mistake above:
INTERNAL_CUSTOM.delete("tabs");

// ---------------------------------------------------------------------------
// The GLOB — every ui/custom dir with an index.ts, minus the INTERNAL set.
// ---------------------------------------------------------------------------
function globComponentSubpaths() {
    const out = {}; // name -> source rel path
    for (const tier of ["ui", "custom"]) {
        const base = resolve(REPO, "src/components", tier);
        const internal = tier === "ui" ? INTERNAL_UI : INTERNAL_CUSTOM;
        for (const dir of readdirSync(base, { withFileTypes: true })) {
            if (!dir.isDirectory()) continue;
            const name = dir.name;
            if (internal.has(name)) continue;
            const idx = resolve(base, name, "index.ts");
            if (!existsSync(idx)) continue;
            if (out[name]) {
                // ui vs custom collision (e.g. "tabs"): custom wins the public key
                // (the published ./tabs = SegmentedTabs). Record the collision.
                out[name] = { rel: `src/components/${tier}/${name}/index.ts`, COLLISION: out[name] };
            } else {
                out[name] = `src/components/${tier}/${name}/index.ts`;
            }
        }
    }
    return out;
}

// ---------------------------------------------------------------------------
// Assemble the full name→source map (the entry set), then emit exports.
// ---------------------------------------------------------------------------
function buildEntrySet() {
    const entries = {}; // name -> source rel
    const collisions = [];
    for (const [n, s] of Object.entries(CURATED)) entries[n] = s;
    for (const [n, s] of Object.entries(COMPOSABLE_SUBPATHS)) entries[n] = s;
    for (const [n, s] of Object.entries(globComponentSubpaths())) {
        if (s && typeof s === "object" && s.COLLISION) {
            collisions.push(n);
            entries[n] = s.rel; // custom/ wins
        } else {
            entries[n] = s;
        }
    }
    return { entries, collisions };
}

// CSS/font + glob entries are constant (not glob-derived). Preserved verbatim
// (copied from package.json — these are NOT regenerated by the glob).
const CSS_FONT_EXPORTS = {
    "./styles": "./dist/styles/index.css",
    "./styles/critical": "./dist/styles/critical.css",
    "./styles/deferred": "./dist/styles/deferred.css",
    "./styles/fonts": "./dist/styles/fonts.css",
    "./styles.css": "./dist/glass-ui.css",
    "./fonts/*": "./dist/fonts/*",
};

// The ONLY non-flat dts case: api is src/api/index.ts → dts emits nested.
// (In 5.0.0 ./api is FOLDED/deleted — kept here for reproduction fidelity.)
const TYPES_OVERRIDE = { api: "./dist/api/index.d.ts" };

function emitExports(entries) {
    const exp = {};
    // root
    exp["."] = {
        types: "./dist/index.d.ts",
        import: "./dist/glass-ui.js",
        default: "./dist/glass-ui.js",
    };
    const typesVersions = {};
    for (const name of Object.keys(entries)) {
        if (name === "index") continue; // root, already emitted
        const chunk = `./dist/${name}.js`;
        const dts = TYPES_OVERRIDE[name] ?? `./dist/${name}.d.ts`;
        exp[`./${name}`] = { types: dts, import: chunk };
        typesVersions[name] = [dts.replace(/^\.\//, "")];
    }
    // CSS/font appended
    for (const [k, v] of Object.entries(CSS_FONT_EXPORTS)) exp[k] = v;
    return { exports: exp, typesVersions: { "*": typesVersions } };
}

// ---------------------------------------------------------------------------
// RUN + DIFF against current package.json.
// ---------------------------------------------------------------------------
const { entries, collisions } = buildEntrySet();
const emitted = emitExports(entries);

const pkg = JSON.parse(readFileSync(resolve(REPO, "package.json"), "utf8"));
const curKeys = new Set(Object.keys(pkg.exports));
const newKeys = new Set(Object.keys(emitted.exports));

const drops = [...curKeys].filter((k) => !newKeys.has(k)).sort();
const adds = [...newKeys].filter((k) => !curKeys.has(k)).sort();

// verify chunk-target parity on shared keys
const targetMismatches = [];
for (const k of curKeys) {
    if (!newKeys.has(k)) continue;
    const a = JSON.stringify(pkg.exports[k]);
    const b = JSON.stringify(emitted.exports[k]);
    if (a !== b) targetMismatches.push({ key: k, current: pkg.exports[k], emitted: emitted.exports[k] });
}

const report = {
    counts: {
        currentExportKeys: curKeys.size,
        emittedExportKeys: newKeys.size,
        emittedJsSubpaths: Object.keys(entries).filter((n) => n !== "index").length,
        cssFontEntries: Object.keys(CSS_FONT_EXPORTS).length,
        root: 1,
    },
    collisions,
    drops,
    adds,
    targetMismatchCount: targetMismatches.length,
    targetMismatches,
};

writeFileSync(resolve(OUT, "regen-output.json"), JSON.stringify(emitted, null, 2));
writeFileSync(resolve(OUT, "regen-diff.json"), JSON.stringify(report, null, 2));

console.log("=== REGEN-EXPORTS PROTOTYPE — diff vs current package.json ===\n");
console.log("current export keys :", curKeys.size);
console.log("emitted export keys :", newKeys.size);
console.log("emitted JS subpaths :", report.counts.emittedJsSubpaths, "(+1 root +", report.counts.cssFontEntries, "css/font)");
console.log("ui/custom collisions:", collisions.join(", ") || "(none)");
console.log("\nDROPS (current key NOT in emitted) [", drops.length, "]:");
for (const d of drops) console.log("  -", d);
console.log("\nADDS (emitted key NOT in current) [", adds.length, "]:");
for (const a of adds) console.log("  +", a);
console.log("\nTARGET MISMATCHES on shared keys [", targetMismatches.length, "]:");
for (const m of targetMismatches) console.log("  ~", m.key, "\n     current:", JSON.stringify(m.current), "\n     emitted:", JSON.stringify(m.emitted));

// typesVersions diff
const curTV = pkg.typesVersions["*"];
const newTV = emitted.typesVersions["*"];
const tvDrops = Object.keys(curTV).filter((k) => !(k in newTV)).sort();
const tvAdds = Object.keys(newTV).filter((k) => !(k in curTV)).sort();
const tvMismatch = Object.keys(curTV)
    .filter((k) => k in newTV && JSON.stringify(curTV[k]) !== JSON.stringify(newTV[k]))
    .map((k) => ({ key: k, current: curTV[k], emitted: newTV[k] }));
console.log("\n=== typesVersions diff ===");
console.log("current entries:", Object.keys(curTV).length, " emitted:", Object.keys(newTV).length);
console.log("tv drops:", tvDrops.length ? tvDrops.join(", ") : "(none)");
console.log("tv adds :", tvAdds.length ? tvAdds.join(", ") : "(none)");
console.log("tv mismatches:", tvMismatch.length);
for (const m of tvMismatch) console.log("  ~", m.key, JSON.stringify(m.current), "->", JSON.stringify(m.emitted));

const PERFECT = drops.length === 0 && adds.length === 0 && targetMismatches.length === 0 && tvDrops.length === 0 && tvAdds.length === 0 && tvMismatch.length === 0;
console.log("\n>>> EXACT REPRODUCTION:", PERFECT ? "YES — zero unexplained delta" : "NO");
console.log("artifacts: regen-output.json, regen-diff.json");
