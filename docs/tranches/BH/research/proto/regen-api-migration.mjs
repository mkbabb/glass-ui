#!/usr/bin/env node
// BH P3.1 PROTOTYPE — regen-api-migration.mjs
//
// Builds the /api 164-row migration map for the 5.0.0 clean-break export reshape.
// /api is FOLD-DELETED; every symbol it re-exports must re-home onto its OWNING
// published subpath so consumers migrate the import PATH with ZERO symbol loss.
//
// MECHANISM: api/index.ts + api/types-extra.ts are PURE re-export barrels. Parse
// every `export [type] { ... } from "<src>"` (+ the `export type * from
// "./types-extra"` re-join) → a {symbol | kind | source | owning-subpath} row.
// Resolve EVERY source to the published subpath whose dir/barrel owns it; flag any
// whose source is NOT under a published subpath (a no-home orphan).
//
// SOURCE-OF-TRUTH for "published subpath": the same 3 policy maps regen-exports.mjs
// proved reproduce package.json EXACTLY (CURATED 11 + COMPOSABLE 7 + GLOB ui/custom
// minus INTERNAL). The motion/motion-core split is resolved from the two live
// composable barrels (parsed at runtime — no hand-list).
//
// READ-ONLY on the repo. Writes artifacts ONLY to the proto dir.

import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "/Users/mkbabb/Programming/glass-ui";
const OUT = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(REPO, "src");

// ───────────────────────────────────────────────────────────────────────────
// 1. PUBLISHED-SUBPATH MAP (the 3 policy maps — verbatim from regen-exports.mjs)
// ───────────────────────────────────────────────────────────────────────────
const CURATED = {
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
};
const COMPOSABLE_SUBPATHS = {
    color: "src/composables/color",
    dom: "src/composables/dom",
    reactive: "src/composables/reactive",
    virtual: "src/composables/virtual",
    canvas: "src/composables/glass/canvas2d",
    "motion-curves": "src/composables/motion/curves.ts",
    "fourier-math": "src/components/custom/fourier-field/math.ts",
};
const INTERNAL_UI = new Set([
    "_shared", "accordion", "alert", "avatar", "carousel", "checkbox", "combobox",
    "input", "metric-pill", "multi-select", "radio-group", "section", "skeleton",
    "table", "tabs", "tags-input", "textarea", "toggle",
]);
const INTERNAL_CUSTOM = new Set(["goo-filter", "infinite-scroll", "split-chars"]);

// the GLOB — every ui/custom dir with an index.ts minus INTERNAL → published name
function globComponentSubpaths() {
    const published = new Set(); // subpath leaf names
    const dirOf = {}; // name -> "components/{tier}/{name}"
    for (const tier of ["ui", "custom"]) {
        const base = resolve(SRC, "components", tier);
        const internal = tier === "ui" ? INTERNAL_UI : INTERNAL_CUSTOM;
        for (const dir of readdirSync(base, { withFileTypes: true })) {
            if (!dir.isDirectory()) continue;
            const name = dir.name;
            if (internal.has(name)) continue;
            if (!existsSync(resolve(base, name, "index.ts"))) continue;
            published.add(name);
            // custom wins a ui/custom collision (e.g. tabs)
            dirOf[name] = `components/${tier}/${name}`;
        }
    }
    return { published, dirOf };
}
const { published: GLOB_PUBLISHED, dirOf: GLOB_DIR } = globComponentSubpaths();

// ───────────────────────────────────────────────────────────────────────────
// 2. motion vs motion-core split — parse the two live composable barrels
// ───────────────────────────────────────────────────────────────────────────
function barrelLeaves(rel) {
    const txt = readFileSync(resolve(SRC, rel), "utf8");
    const leaves = new Set();
    for (const m of txt.matchAll(/from\s+"(?:\.\.?\/)+([A-Za-z0-9_-]+)"/g)) leaves.add(m[1]);
    // also catch core/useHaptic-style nested ./X under a core dir
    for (const m of txt.matchAll(/from\s+"\.\/([A-Za-z0-9_-]+)"/g)) leaves.add(m[1]);
    return leaves;
}
const MOTION_LEAVES = barrelLeaves("composables/motion/index.ts");
const MOTION_CORE_LEAVES = barrelLeaves("composables/motion/core/index.ts");

// ── root barrel reach: which component dirs src/index.ts re-exports ──────────
// An INTERNAL ui/custom dir (no flat subpath) whose COMPONENT is re-exported by
// the root barrel is NOT homeless — its types re-home onto the root "." import.
const ROOT_COMPONENT_DIRS = new Set();
{
    const idxTxt = readFileSync(resolve(SRC, "index.ts"), "utf8");
    for (const m of idxTxt.matchAll(/export\s+\*\s+from\s+"\.\/components\/(ui|custom)\/([A-Za-z0-9_-]+)"/g)) {
        ROOT_COMPONENT_DIRS.add(`${m[1]}/${m[2]}`);
    }
}

// ───────────────────────────────────────────────────────────────────────────
// 3. RESOLVER — source rel path (under src/) → owning published subpath
// returns { subpath, orphan, note } ; subpath null IFF orphan
// ───────────────────────────────────────────────────────────────────────────
function resolveOwningSubpath(srcRel) {
    // srcRel like "components/custom/aurora", "composables/motion/useCountup",
    // "components/ui/_shared", "composables/color/useAccentTone"
    const parts = srcRel.split("/");

    // (a) component sources
    if (parts[0] === "components" && (parts[1] === "ui" || parts[1] === "custom")) {
        const name = parts[2];
        if (GLOB_PUBLISHED.has(name)) {
            // verify the dir matches the winning tier (custom wins collisions)
            return { subpath: name, orphan: false, note: GLOB_DIR[name] };
        }
        // INTERNAL ui/custom dir, BUT re-exported by the root barrel → re-homes
        // onto root "." (a consumer reaches it via `import ... from "@mkbabb/glass-ui"`).
        if (ROOT_COMPONENT_DIRS.has(`${parts[1]}/${name}`)) {
            return { subpath: ".", orphan: false, note: `root-barrel ${parts[1]}/${name}` };
        }
        // INTERNAL ui/custom dir NOT on root barrel → true no-home ORPHAN
        if (INTERNAL_UI.has(name) || INTERNAL_CUSTOM.has(name)) {
            return { subpath: null, orphan: true, note: `INTERNAL ${parts[1]}/${name} (off root barrel)` };
        }
        return { subpath: null, orphan: true, note: `unpublished ${parts[1]}/${name}` };
    }

    // (b) composable sources
    if (parts[0] === "composables") {
        const subtree = parts[1];
        // glass/canvas2d → /canvas
        if (subtree === "glass" && parts[2] === "canvas2d") return { subpath: "canvas", orphan: false, note: "glass/canvas2d" };
        // motion family
        if (subtree === "motion") {
            const leaf = parts[parts.length - 1].replace(/\.ts$/, "");
            if (leaf === "curves") return { subpath: "motion-curves", orphan: false, note: "composables/motion/curves.ts" };
            if (srcRel.includes("/core/")) return { subpath: "motion-core", orphan: false, note: "motion/core leaf" };
            if (MOTION_CORE_LEAVES.has(leaf)) return { subpath: "motion-core", orphan: false, note: `core barrel re-exports ${leaf}` };
            if (MOTION_LEAVES.has(leaf)) return { subpath: "motion", orphan: false, note: `motion barrel re-exports ${leaf}` };
            return { subpath: null, orphan: true, note: `motion leaf ${leaf} in NEITHER barrel` };
        }
        // direct composable-subtree subpaths
        for (const [name, p] of Object.entries(COMPOSABLE_SUBPATHS)) {
            const norm = p.replace(/^src\//, "");
            if (srcRel === norm || srcRel.startsWith(norm + "/")) return { subpath: name, orphan: false, note: p };
        }
        // dark / keyboard etc. resolved via CURATED below
        if (subtree === "dark") return { subpath: "dark", orphan: false, note: "composables/dark (curated /dark)" };
        if (subtree === "keyboard") return { subpath: "keyboard", orphan: false, note: "curated /keyboard" };
        if (subtree === "sidebar") return { subpath: "sidebar", orphan: false, note: "curated /sidebar" };
        return { subpath: null, orphan: true, note: `composables/${subtree} no subpath` };
    }

    return { subpath: null, orphan: true, note: `unrecognized source ${srcRel}` };
}

// ───────────────────────────────────────────────────────────────────────────
// 4. PARSER — extract every re-export statement from an /api file
// ───────────────────────────────────────────────────────────────────────────
function stripComments(s) {
    return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}
function normSrc(fromPath) {
    // fromPath relative to src/api/ → rel under src/
    // "../components/custom/aurora" -> "components/custom/aurora"
    // "../composables/motion/useCountup" -> "composables/motion/useCountup"
    // "./types-extra" -> "@types-extra" sentinel (handled by caller)
    if (fromPath === "./types-extra") return "@types-extra";
    return fromPath.replace(/^\.\.\//, "").replace(/^\.\//, "api/");
}

function parseApiFile(rel) {
    const raw = readFileSync(resolve(SRC, rel), "utf8");
    const txt = stripComments(raw);
    const rows = [];
    let reJoin = false;

    // export type * from "./types-extra"
    if (/export\s+type\s+\*\s+from\s+"\.\/types-extra"/.test(txt)) reJoin = true;

    // block form:  export [type] { A, B, type C, ... } from "<src>"
    const blockRe = /export\s+(type\s+)?\{([\s\S]*?)\}\s*from\s+"([^"]+)"/g;
    let m;
    while ((m = blockRe.exec(txt)) !== null) {
        const isTypeBlock = !!m[1];
        const body = m[2];
        const fromPath = m[3];
        const srcRel = normSrc(fromPath);
        for (let tok of body.split(",")) {
            tok = tok.trim();
            if (!tok) continue;
            // handle "type Foo" inline + "Foo as Bar"
            let kindLocal = isTypeBlock ? "type" : "value";
            let mm = tok.match(/^(type\s+)?([A-Za-z0-9_$]+)(?:\s+as\s+([A-Za-z0-9_$]+))?$/);
            if (!mm) continue;
            if (mm[1]) kindLocal = "type";
            const symbol = mm[3] || mm[2]; // exported name (after `as`)
            rows.push({ symbol, kind: kindLocal, fromPath, srcRel, file: rel });
        }
    }
    return { rows, reJoin };
}

// ───────────────────────────────────────────────────────────────────────────
// 5. RUN
// ───────────────────────────────────────────────────────────────────────────
const idx = parseApiFile("api/index.ts");
const extra = parseApiFile("api/types-extra.ts");

// /api surface = index.ts own rows + (via `export type * from "./types-extra"`)
// every types-extra row. The re-join carries them all as types.
const allRows = [...idx.rows.filter((r) => r.srcRel !== "@types-extra"), ...extra.rows];

// resolve owning subpath + classify
for (const r of allRows) {
    const res = resolveOwningSubpath(r.srcRel);
    r.owningSubpath = res.subpath ? (res.subpath === "." ? "." : `/${res.subpath}`) : null;
    r.orphan = res.orphan;
    r.resolveNote = res.note;
    // const detection: VALUE-kind symbols that are SCREAMING_CASE are constants
    r.kindFinal = r.kind === "value" ? (/^[A-Z0-9_]+$/.test(r.symbol) ? "const" : "value") : "type";
}

// dedupe (a symbol should appear once) + detect dup
const seen = new Map();
const dups = [];
for (const r of allRows) {
    if (seen.has(r.symbol)) dups.push({ symbol: r.symbol, a: seen.get(r.symbol).file, b: r.file });
    else seen.set(r.symbol, r);
}

const orphans = allRows.filter((r) => r.orphan);
const byKind = allRows.reduce((a, r) => ((a[r.kindFinal] = (a[r.kindFinal] || 0) + 1), a), {});
const bySubpath = {};
for (const r of allRows) {
    const k = r.owningSubpath || "(ORPHAN)";
    (bySubpath[k] = bySubpath[k] || []).push({ symbol: r.symbol, kind: r.kindFinal });
}

// ───────────────────────────────────────────────────────────────────────────
// 6. ORPHAN RE-HOME DECISIONS
// ───────────────────────────────────────────────────────────────────────────
const ORPHAN_REHOMES = {
    Surface: {
        decision: "/card",
        rationale:
            "Surface is the SHARED {glass·veil·opaque} surface-decoration union threaded onto Card/GlassPanel/Dialog/Sheet/Drawer/Popover/Command/Expandable/Skeleton/Toast/Button. /card already publishes CardSurface (its superset) + CardTier; Card is the canonical surface-axis exemplar. Re-export Surface (+ surfaceClass value if a consumer needs the resolver) from components/ui/card/index.ts. ALT: a NEW published /surface-axis subpath off ui/_shared — heavier (new subpath for 3 types). Recommend /card (zero new subpath; Card is where Surface is documented).",
    },
    MenuItemVariants: {
        decision: "/command",
        rationale:
            "MenuItemVariants is the CVA-union for the 11-site menu/picker item four-state contract (command/dropdown-menu/context-menu/combobox/select). All 5 consumers are published subpaths; the cleanest single home is /command (the richest menu surface). Re-export MenuItemVariants from components/ui/command/index.ts (it already composes menuItemVariants). ALT: publish from EACH of the 5 menu subpaths (DRY-violating). Recommend /command as the canonical menu-item home; the other 4 LINK in docs.",
    },
    ControlSize: {
        decision: "/forms",
        rationale:
            "ControlSize is the shared control-size union ('sm'|'default'|'lg') threaded by Input/Switch/Textarea/NumberFieldInput. /forms already publishes Input+Textarea (its primary consumers) + their props; it is the form-family barrel. Re-export ControlSize (+ controlSizeClass) from src/forms.ts. ALT: /input — but /input is INTERNAL (folded into /forms). Recommend /forms (the form-family canonical home).",
    },
};

// ───────────────────────────────────────────────────────────────────────────
// 7. PER-SUBPATH NEW-EXPORT DELTAS (what each owning subpath must ADD)
// ───────────────────────────────────────────────────────────────────────────
// For each owning subpath, the symbols it must guarantee are exported from its
// barrel so a consumer migrating off /api loses nothing. NOTE: most already are
// (api re-exports FROM the barrel) — the "delta" is the set the consumer reaches
// via /api today and must reach via <subpath> after the fold. We mark whether the
// symbol is sourced from the subpath's OWN dir-barrel (already exported) vs a
// nested/curated re-home (orphans + the 3 motion-core/color/dom verifications).
const perSubpathDelta = {};
for (const [sp, syms] of Object.entries(bySubpath)) {
    perSubpathDelta[sp] = syms.sort((a, b) => a.symbol.localeCompare(b.symbol));
}

// ───────────────────────────────────────────────────────────────────────────
// 8. COMPLETENESS CROSS-CHECK
// ───────────────────────────────────────────────────────────────────────────
const completeness = {
    totalRows: allRows.length,
    uniqueSymbols: seen.size,
    duplicates: dups,
    orphanCount: orphans.length,
    resolvedCount: allRows.filter((r) => !r.orphan).length,
    everyRowResolvedOrOrphan: allRows.every((r) => r.owningSubpath || r.orphan),
    everySymbolExactlyOnce: dups.length === 0,
};

// ───────────────────────────────────────────────────────────────────────────
// 9. EMIT
// ───────────────────────────────────────────────────────────────────────────
const table = allRows
    .map((r) => ({
        symbol: r.symbol,
        kind: r.kindFinal,
        source: r.fromPath,
        sourceRel: `src/${r.srcRel}`,
        owningSubpath: r.owningSubpath || "(ORPHAN — see re-home)",
        apiFile: r.file,
        note: r.resolveNote,
    }))
    .sort((a, b) => (a.owningSubpath + a.symbol).localeCompare(b.owningSubpath + b.symbol));

const summary = {
    totalApiSymbols: allRows.length,
    uniqueSymbols: seen.size,
    byKind,
    subpathCount: Object.keys(bySubpath).filter((k) => k !== "(ORPHAN)").length,
    symbolsPerSubpath: Object.fromEntries(
        Object.entries(bySubpath)
            .map(([k, v]) => [k, v.length])
            .sort((a, b) => b[1] - a[1])
    ),
    orphans: orphans.map((o) => o.symbol),
    orphanRehomes: ORPHAN_REHOMES,
    completeness,
};

writeFileSync(resolve(OUT, "api-migration-table.json"), JSON.stringify(table, null, 2));
writeFileSync(
    resolve(OUT, "api-migration-summary.json"),
    JSON.stringify({ summary, perSubpathDelta }, null, 2)
);

// ── console report ──
console.log("=== /api 164-ROW MIGRATION MAP ===\n");
console.log("total /api symbols (rows):", allRows.length);
console.log("unique symbols          :", seen.size);
console.log("by kind                 :", JSON.stringify(byKind));
console.log("owning subpaths         :", summary.subpathCount);
console.log("orphans                 :", orphans.length, "→", orphans.map((o) => o.symbol).join(", ") || "(none)");
console.log("\n--- symbols per owning subpath (desc) ---");
for (const [k, n] of Object.entries(summary.symbolsPerSubpath)) console.log(`  ${String(n).padStart(3)}  ${k}`);
console.log("\n--- ORPHAN RE-HOMES ---");
for (const [s, d] of Object.entries(ORPHAN_REHOMES)) console.log(`  ${s.padEnd(18)} → ${d.decision}`);
console.log("\n--- COMPLETENESS ---");
console.log("  every row resolved-or-orphan :", completeness.everyRowResolvedOrOrphan);
console.log("  every symbol exactly once    :", completeness.everySymbolExactlyOnce);
console.log("  duplicates                   :", dups.length, dups.length ? JSON.stringify(dups) : "");
console.log("  resolved                     :", completeness.resolvedCount, "/", allRows.length);
console.log("\nartifacts: api-migration-table.json, api-migration-summary.json");

// expose for the cross-check step
writeFileSync(
    resolve(OUT, "api-migration-rows.json"),
    JSON.stringify(allRows.map((r) => ({ symbol: r.symbol, srcRel: r.srcRel, owningSubpath: r.owningSubpath, kind: r.kindFinal, orphan: r.orphan })), null, 2)
);
