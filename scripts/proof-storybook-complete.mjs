// AW.W28.a — the storybook-COMPLETENESS gate (proof:storybook-complete).
//
// This is the DISTINCT totality gate over the public EXPORT surface — NOT the
// manifest-tree freeze (proof:storybook-ia) nor the file↔row bijection
// (proof:no-orphan-demo-route). Those freeze the EXISTING tree; this one closes
// the export-surface → story loop: every COMPONENT reachable from the public
// surface must be demonstrated by ≥1 live story SFC.
//
// WHAT IT MEASURES:
//   1. ENUMERATE the public component surface. A "component export" is the
//      precise shape `export { default as <Name> } from "<...>.vue"` — a Vue SFC
//      re-exported from a barrel reachable from the public surface (src/index.ts
//      + every flat subpath barrel under src/subpaths/ + the curated top-level
//      subpath barrels forms/dark/keyboard/carousel). The `export { default as
//      X } from "*.vue"` discriminator distinguishes a Vue COMPONENT from a CVA
//      variant fn, a composable, a constant, or a type — those are EXCLUDED by
//      construction (they live on the reference Composables shelf or are pure
//      type/constant surfaces; §3 of the wave spec).
//   2. ENUMERATE the demonstrated set. Walk every story SFC under
//      demo/stories/<category>/ and collect every identifier IMPORTED from a
//      `.../src/...` path (named imports + default `*.vue` imports). The story
//      import graph IS the story→component mapping (no manifest row declares
//      `sourceFiles`).
//   3. ASSERT TOTALITY. Every component export must appear in the demonstrated
//      set OR in the documented COMPOSED_BY allowlist (an internal sub-component
//      a parent variant-dispatcher renders — barrel-exported for typing/forwarding
//      but never independently consumed; the parent's story IS its demonstration).
//
// inv ε / bite-check: export a new component package with no story → RED (the
// enumeration finds it, the demonstrated set does not cover it). The `--selftest`
// flag injects a synthetic phantom export to prove the gate is born-RED against a
// missing demonstration (the wave's born-RED obligation when HEAD has zero gaps).

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// ── COMPOSED_BY allowlist ────────────────────────────────────────────────────
// Internal sub-components a parent variant-dispatcher renders. They are
// barrel-exported (so consumers can type a wrapper / the parent can re-forward),
// but they are NEVER independently consumed — the parent's story renders them
// through its variant prop, which IS their demonstration. Each entry names the
// PARENT component whose story composes it; the gate verifies that parent is
// itself demonstrated.
export const COMPOSED_BY = {
    // The <Progress variant="…"> dispatcher routes to these three SFCs.
    ProgressDefault: "Progress",
    ProgressGradient: "Progress",
    ProgressSectioned: "Progress",
    // <DataTable> composes its own pagination footer sub-component.
    DataTablePagination: "DataTable",
    // <MetricStack> hosts a column of <MetricRow> children (the row IS the stack's
    // unit; the metric-stack story renders the rows through the stack).
    MetricRow: "MetricStack",
    // <DrawerContent> renders the scrim sub-component internally (the BB.W-DRAWER-ABROGATE
    // reka rebuild; `<DrawerOverlay v-if="showOverlay">`); the drawer stories demonstrate
    // it through DrawerContent's `showOverlay` default, never independently.
    DrawerOverlay: "DrawerContent",
};

// ── DEMONSTRATED_AS_MATERIAL allowlist (BC.W-STORYBOOK-META) ──────────────────
// A published component whose NAMED story route demonstrates the SURFACE IT
// RENDERS by composing the library MATERIAL CLASSES directly rather than the
// component tag. This is the Band-1 W-GLASS-PRUNE design decision recorded as a
// gate fact: `<GlassPanel>` paints the five-rung `.glass-{wash..overlay}` ladder
// over a live aurora; `substrates/glass-panel.vue` teaches that EXACT material by
// composing the `.glass-{rung}` classes bare (the "which glass do I reach for?"
// binary answer — a bare surface is a `.glass-{rung}` MATERIAL, a content container
// is a `<Card>`). The component stays a PUBLISHED surface (the AZ.W-PRUNE2 RESTORE
// for the keyframes consumer — subpath `/glass-panel` + the `GlassPanelVariant`/
// `GlassPanelProps` api seats), so its export is real; its DEMONSTRATION is the
// material it renders, shown on its own named route. Each entry names the route SFC
// whose body teaches the surface (the gate verifies the SFC exists on disk).
export const DEMONSTRATED_AS_MATERIAL = {
    // GlassPanel renders the five-rung glass ladder; the substrates/glass-panel
    // route demonstrates that ladder bare (the W-GLASS-PRUNE MATERIALS gallery).
    GlassPanel: "demo/stories/substrates/glass-panel.vue",
};

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        INDEX: resolve(ROOT, "src/index.ts"),
        SUBPATHS_DIR: resolve(ROOT, "src/subpaths"),
        STORIES_DIR: resolve(ROOT, "demo/stories"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_STORYBOOK_COMPLETE_ARTIFACT",
            "AW-storybook-complete",
        ),
    };
    return _cliPaths;
}

// Curated top-level subpath barrels that are NOT mirrored under src/subpaths/
// (the vueuse-bearing flat subpaths). They reach component exports the
// src/index.ts root barrel intentionally excludes (the SCC-trap leaves).
const CURATED_SUBPATHS = ["forms", "dark", "keyboard", "carousel"];

/** Resolve a relative module specifier to its barrel/SFC file on disk. */
function resolveModule(fromFile, spec) {
    const base = resolve(dirname(fromFile), spec);
    if (existsSync(base) && statSync(base).isDirectory()) {
        return resolve(base, "index.ts");
    }
    if (existsSync(base)) return base; // e.g. a `*.vue` or an explicit `*.ts`
    const withTs = `${base}.ts`;
    if (existsSync(withTs)) return withTs;
    return base; // non-existent — caller guards with existsSync
}

/** The set of public barrel files: src/index.ts export* targets + subpaths. */
export function collectPublicBarrels(P, fs) {
    const barrels = new Set();

    // 1. src/index.ts — every `export * from "./components/…"` target.
    const indexSrc = fs.readFileSync(P.INDEX, "utf8");
    for (const m of indexSrc.matchAll(/export \* from "(\.\/[^"]+)"/g)) {
        const file = resolveModule(P.INDEX, m[1]);
        if (fs.existsSync(file)) barrels.add(file);
    }

    // 2. Every flat per-package subpath barrel under src/subpaths/.
    if (fs.existsSync(P.SUBPATHS_DIR)) {
        for (const f of fs.readdirSync(P.SUBPATHS_DIR)) {
            if (!f.endsWith(".ts")) continue;
            const sp = resolve(P.SUBPATHS_DIR, f);
            const spSrc = fs.readFileSync(sp, "utf8");
            for (const m of spSrc.matchAll(/from "(\.\.\/[^"]+)"/g)) {
                const file = resolveModule(sp, m[1]);
                if (fs.existsSync(file)) barrels.add(file);
            }
        }
    }

    // 3. The curated vueuse-bearing top-level subpath barrels.
    for (const c of CURATED_SUBPATHS) {
        const f = resolve(P.SRC, `${c}.ts`);
        if (fs.existsSync(f)) barrels.add(f);
    }

    return barrels;
}

/**
 * Walk the barrels (recursing through `export * from "…"` re-exports) and
 * collect every component export: `export { default as <Name> } from "<…>.vue"`.
 * Returns Map<name, sfcPath>. Pure given fs injection.
 */
export function collectComponentExports(barrels, fs) {
    const comps = new Map();
    const seen = new Set();
    const visit = (barrel) => {
        if (seen.has(barrel)) return;
        seen.add(barrel);
        if (!fs.existsSync(barrel)) return;
        const src = fs.readFileSync(barrel, "utf8");
        for (const m of src.matchAll(
            /export \{\s*default as (\w+)\s*\} from "([^"]+\.vue)"/g,
        )) {
            comps.set(m[1], resolve(dirname(barrel), m[2]));
        }
        for (const m of src.matchAll(/export \* from "([^"]+)"/g)) {
            visit(resolveModule(barrel, m[1]));
        }
    };
    for (const b of barrels) visit(b);
    return comps;
}

/**
 * Walk demo/stories/** and collect every identifier imported from a `…/src/…`
 * path (named imports + default `*.vue` imports). The story import graph is the
 * story → component mapping. Pure given fs injection.
 */
export function collectDemonstrated(storiesDir, fs) {
    const demonstrated = new Set();
    const walk = (dir) => {
        for (const entry of fs.readdirSync(dir)) {
            const full = resolve(dir, entry);
            const st = fs.statSync(full);
            if (st.isDirectory()) walk(full);
            else if (entry.endsWith(".vue")) collectFromFile(full);
        }
    };
    const collectFromFile = (file) => {
        const src = fs.readFileSync(file, "utf8");
        // Named imports from any src path: import { A, B as C } from ".../src/…"
        for (const m of src.matchAll(
            /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+"([^"]*\/src\/[^"]+)"/g,
        )) {
            for (const id of m[1].split(",")) {
                const name = id.trim().split(/\s+as\s+/).pop()?.trim();
                if (name) demonstrated.add(name);
            }
        }
        // Default import from a src .vue: import X from ".../src/….vue"
        for (const m of src.matchAll(
            /import\s+(\w+)\s+from\s+"([^"]*\/src\/[^"]+\.vue)"/g,
        )) {
            demonstrated.add(m[1]);
        }
    };
    walk(storiesDir);
    return demonstrated;
}

/** The pure detector: {facts, violations} over the enumerated sets. */
export function detect(comps, demonstrated, composedBy, materialBy = {}, fileExists = () => false) {
    const violations = [];
    const facts = {};
    facts.componentExports = comps.size;
    facts.demonstratedIdentifiers = demonstrated.size;

    const undemonstrated = [];
    for (const name of comps.keys()) {
        if (demonstrated.has(name)) continue;
        const parent = composedBy[name];
        if (parent) {
            // The sub-component rides its parent's story; the parent must itself
            // be demonstrated, else the allowlist entry is a dead claim.
            if (!demonstrated.has(parent)) {
                violations.push(
                    `${name} is allowlisted as composed-by ${parent}, but ${parent} is itself undemonstrated — the allowlist entry is a dead claim`,
                );
            }
            continue;
        }
        // DEMONSTRATED_AS_MATERIAL: a published surface demonstrated by composing
        // its material classes on its named route. The route SFC must exist on disk
        // (an absent route is a dead claim — the same anti-evasion floor as the
        // composed-by parent check).
        const route = materialBy[name];
        if (route) {
            if (!fileExists(route)) {
                violations.push(
                    `${name} is allowlisted as demonstrated-as-material on ${route}, but that route SFC is absent on disk — the allowlist entry is a dead claim`,
                );
            }
            continue;
        }
        undemonstrated.push(name);
    }
    undemonstrated.sort();
    facts.undemonstrated = undemonstrated;
    facts.composedByCount = Object.keys(composedBy).length;
    facts.materialByCount = Object.keys(materialBy).length;
    for (const name of undemonstrated) {
        violations.push(
            `component export "${name}" has zero demonstration — no story SFC imports it and it is not a composed-by / demonstrated-as-material allowlist entry`,
        );
    }
    return { facts, violations };
}

function run({ selftest = false } = {}) {
    const P = cliPaths();
    const fs = { existsSync, readdirSync, readFileSync, statSync };

    const barrels = collectPublicBarrels(P, fs);
    const comps = collectComponentExports(barrels, fs);
    const demonstrated = collectDemonstrated(P.STORIES_DIR, fs);

    // Born-RED self-test: inject a synthetic phantom component export with no
    // story. The gate MUST go RED — proving it falsifies a missing demonstration
    // (the wave's born-RED obligation when HEAD is already complete).
    if (selftest) {
        comps.set("__PhantomUndemoComponent", "<synthetic>");
    }

    const fileExists = (rel) => existsSync(resolve(P.ROOT, rel));
    const { facts, violations } = detect(
        comps,
        demonstrated,
        COMPOSED_BY,
        DEMONSTRATED_AS_MATERIAL,
        fileExists,
    );
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:storybook-complete",
        command: "npm run proof:storybook-complete",
        selftest,
        facts,
        violations,
    });

    console.log(
        "proof:storybook-complete — every public component export resolves to ≥1 live story (AW.W28.a)",
    );
    console.log(`  public barrels         : ${barrels.size}`);
    console.log(`  component exports      : ${facts.componentExports}`);
    console.log(`  demonstrated ids       : ${facts.demonstratedIdentifiers}`);
    console.log(`  composed-by allowlist  : ${facts.composedByCount}`);
    console.log(`  material-by allowlist  : ${facts.materialByCount ?? 0}`);
    console.log(`  undemonstrated         : ${facts.undemonstrated.length}`);
    if (selftest) console.log("  (SELFTEST: synthetic phantom export injected)");
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(P.ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run({ selftest: process.argv.includes("--selftest") });
}
