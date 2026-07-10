#!/usr/bin/env node
// BG.W-GESTALT-ROSTER-RE-POINT — the surface paint-closure leaf (the real P6 leaf).
//
// The roster's `routes` cells are no longer a hand-list of surface-paths a typo can
// silently drop — they are DERIVED from the real demo route files. This leaf is the
// transitive paint-closure machinery `proof:ba-gestalt` (routeSeeds HARD-RED) and the
// ship-attestation spine (`surfaceClosure` → the freshness file-list) both read:
//
//   - `routeSeeds(rosterSource)` parses the `/cat/story` tokens out of the roster's
//     `routes` column ONLY (the capture-path / ground-anchor cells carry path-shaped
//     text that is NOT a route — scanning the whole doc would false-RED on them) and
//     resolves each to its demo SFC. A 2-segment `/cat/story` whose
//     `demo/stories/<cat>/<story>.vue` does NOT exist on disk is a HARD-RED surfaced
//     at route-RESOLUTION as a `[ROUTE-RESOLVES]` violation in `proof-ba-gestalt`
//     (NOT a closure-emptiness guard — `SHELL_SEED` always makes the closure
//     non-empty, defeating an emptiness check). A 1-segment `/cat` resolves the
//     generic `SectionLanding.vue` (always present) and never HARD-REDs; free prose
//     WITHOUT the slash-pattern produces no match (the legit "the shell BottomDock"
//     case). The token alphabet `[a-z0-9-]` lowercase-excludes the PascalCase helper
//     SFCs (`StoryPage`, `SectionLanding`) so a prose mention never resolves.
//
//   - `collectPaintClosure(seeds)` BFS-walks the import / `@import` edges from the
//     seed SFCs (+ `SHELL_SEED`) into the real paint sources they reach — the demo
//     imports the library by RELATIVE path (`../../../src/...`), so the closure walks
//     genuinely into `src/`. The result is a deterministic sorted repo-relative file
//     list — the content-hash freshness mechanism's source-of-truth (a new surface
//     added / a paint file moved changes the LIST, drifting the ship-attestation
//     surfaceHash). `isPaintSource` / `resolvePaintEdge` are the closure's two halves.
//
// PURE + import-safe: every export is a pure function over (rosterSource, root). The
// `import.meta.url` run-guard prints a closure summary for debugging when invoked as
// a CLI, and never runs when imported.

import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve, join, dirname, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = resolve(fileURLToPath(new URL("../../", import.meta.url)));

// The demo SHELL is on every route — the AppShell + the two nav docks + the library
// style entry. It seeds the closure so a prose-only roster still produces a non-empty
// closure (the routeSeeds HARD-RED, NOT an emptiness check, is the discriminator).
export const SHELL_SEED = Object.freeze([
    "demo/App.vue",
    "demo/shell/AppShell.vue",
    "demo/shell/BottomDock.vue",
    "demo/shell/SidebarDock.vue",
    "src/styles/index.css",
]);

// The route token in a `routes` cell: `/cat` or `/cat/story`. Lowercase alphabet so a
// PascalCase prose mention (`BottomDock`) never matches; the optional second segment
// captures the 2-segment story slug. Global so a multi-route cell yields every token.
const ROUTE_TOKEN_RE = /\/([a-z0-9][a-z0-9-]*)(?:\/([a-z0-9][a-z0-9-]*))?/g;

// The paint-source extension set the closure walks + hashes. A `.ts` (incl.
// `.glsl.ts` / `.wgsl.ts` shaders, composables, the manifest) paints the surface; a
// `.vue` / `.css` paints directly. Tests/specs are excluded (they do not paint).
const PAINT_EXT = [".vue", ".css", ".ts"];

/**
 * Is the absolute path a paint source the closure walks + hashes? Scoped to the
 * `src/` + `demo/` paint trees; tests/specs/node_modules excluded.
 * @param {string} absPath
 * @param {string} [root]
 * @returns {boolean}
 */
export function isPaintSource(absPath, root = ROOT) {
    const rel = relative(root, absPath);
    if (rel.startsWith("..") || rel.includes("node_modules")) return false;
    if (!(rel.startsWith("src/") || rel.startsWith("demo/"))) return false;
    if (
        rel.includes("/__tests__/") ||
        rel.endsWith(".test.ts") ||
        rel.endsWith(".spec.ts") ||
        rel.endsWith(".d.ts")
    )
        return false;
    return PAINT_EXT.some((ext) => rel.endsWith(ext));
}

/**
 * Resolve one import / `@import` spec from `fromAbs` to an on-disk paint source, or
 * null. Only LOCAL specs resolve — a relative (`./` / `../`) or `@/`-aliased path;
 * a bare package spec (`vue`, `@mkbabb/glass-ui`, `@lucide/vue`) is not a local paint
 * source (its bytes live in node_modules) and returns null.
 * @param {string} fromAbs the importing file's absolute path
 * @param {string} spec the import string
 * @param {string} [root]
 * @returns {string|null}
 */
export function resolvePaintEdge(fromAbs, spec, root = ROOT) {
    let base;
    if (spec.startsWith("@/")) base = join(root, "src", spec.slice(2));
    else if (spec.startsWith(".")) base = resolve(dirname(fromAbs), spec);
    else return null; // bare package — not a local paint source
    const tries = [
        base,
        ...PAINT_EXT.map((ext) => base + ext),
        join(base, "index.ts"),
        join(base, "index.css"),
    ];
    for (const t of tries) {
        if (existsSync(t) && statSync(t).isFile() && isPaintSource(t, root)) return t;
    }
    return null;
}

/**
 * Extract the local import / `@import` specs from a file's text. JS/TS/Vue `import`/
 * `export … from`/dynamic `import()` forms + CSS/`<style>` `@import` forms; bounded to
 * one statement span so a shader template-literal string is never read as an edge.
 * @param {string} text
 * @returns {string[]}
 */
function extractSpecs(text) {
    const specs = [];
    const js =
        /\b(?:import|export)\b[^;\n]*?["']([^"']+)["']|\bimport\(\s*["']([^"']+)["']\s*\)/g;
    const css = /@import\s+(?:url\(\s*)?["']([^"']+)["']/g;
    let m;
    while ((m = js.exec(text))) specs.push(m[1] ?? m[2]);
    while ((m = css.exec(text))) specs.push(m[1]);
    return specs;
}

/**
 * BFS the transitive paint-closure of the seed files over their import edges. Returns
 * the deterministic sorted repo-relative paint-source list (the seeds included). The
 * walk is bounded by `maxFiles` (a runaway guard; the real closure is in the hundreds)
 * and reads each file once.
 * @param {string[]} seedAbs absolute seed paths (filtered to existing files)
 * @param {{root?:string, maxFiles?:number}} [opts]
 * @returns {string[]} sorted repo-relative paths
 */
export function collectPaintClosure(seedAbs, { root = ROOT, maxFiles = 4000 } = {}) {
    const seen = new Set();
    const queue = [];
    for (const abs of seedAbs)
        if (existsSync(abs) && statSync(abs).isFile() && isPaintSource(abs, root)) {
            if (!seen.has(abs)) {
                seen.add(abs);
                queue.push(abs);
            }
        }
    let head = 0;
    while (head < queue.length && seen.size < maxFiles) {
        const abs = queue[head++];
        let text;
        try {
            text = readFileSync(abs, "utf8");
        } catch {
            continue;
        }
        for (const spec of extractSpecs(text)) {
            const edge = resolvePaintEdge(abs, spec, root);
            if (edge && !seen.has(edge)) {
                seen.add(edge);
                queue.push(edge);
            }
        }
    }
    return [...seen].map((abs) => relative(root, abs)).sort();
}

/**
 * Parse the roster's `routes` column out of the markdown table. Strips HTML comments
 * first (the schema doc-block names columns), then returns each data row's `routes`
 * cell (column index 1). NEVER scans the capture-path / ground-anchor cells.
 * @param {string} rosterSource
 * @returns {string[]} the routes cells
 */
function routesCells(rosterSource) {
    const noComments = rosterSource.replace(/<!--[\s\S]*?-->/g, "");
    const cells = [];
    for (const raw of noComments.split("\n")) {
        const line = raw.trim();
        if (!line.startsWith("|")) continue;
        const parts = line
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
        if (parts.length < 2) continue;
        if (parts[0] === "surface") continue; // header
        if (parts.every((c) => /^:?-+:?$/.test(c))) continue; // separator
        cells.push(parts[1]);
    }
    return cells;
}

/**
 * Derive the route seeds + HARD-REDs from the roster's `routes` cells. A 2-segment
 * `/cat/story` resolves to `demo/stories/<cat>/<story>.vue` — present → a seed, absent
 * → a HARD-RED (`{ token, expected }`). A 1-segment `/cat` resolves the generic
 * `SectionLanding.vue`. Free prose without the slash-pattern yields nothing.
 * @param {string} rosterSource
 * @param {{root?:string}} [opts]
 * @returns {{tokens:string[], seeds:string[], hardReds:{token:string, expected:string}[]}}
 */
export function routeSeeds(rosterSource, { root = ROOT } = {}) {
    const tokens = [];
    const seeds = new Set();
    const hardReds = [];
    const landing = join("demo", "stories", "SectionLanding.vue");
    for (const cell of routesCells(rosterSource)) {
        ROUTE_TOKEN_RE.lastIndex = 0;
        let m;
        while ((m = ROUTE_TOKEN_RE.exec(cell))) {
            const [, cat, story] = m;
            if (story) {
                const token = `/${cat}/${story}`;
                tokens.push(token);
                const sfc = join("demo", "stories", cat, `${story}.vue`);
                if (existsSync(join(root, sfc))) seeds.add(sfc);
                else hardReds.push({ token, expected: sfc });
            } else {
                tokens.push(`/${cat}`);
                if (existsSync(join(root, landing))) seeds.add(landing);
            }
        }
    }
    return { tokens, seeds: [...seeds].sort(), hardReds };
}

/**
 * The full surface paint-closure for a roster: the SHELL_SEED + the route seeds →
 * the transitive paint-closure, plus the route HARD-REDs. The ship-attestation
 * freshness mechanism hashes (this leaf's SOURCE bytes + `closure`); `proof:ba-gestalt`
 * reads `hardReds` for the `[ROUTE-RESOLVES]` arm.
 * @param {string} rosterSource
 * @param {{root?:string, maxFiles?:number}} [opts]
 * @returns {{tokens:string[], seeds:string[], hardReds:{token:string, expected:string}[], closure:string[]}}
 */
export function surfaceClosure(rosterSource, { root = ROOT, maxFiles = 4000 } = {}) {
    const { tokens, seeds, hardReds } = routeSeeds(rosterSource, { root });
    const seedAbs = [...SHELL_SEED, ...seeds].map((p) => join(root, p));
    const closure = collectPaintClosure(seedAbs, { root, maxFiles });
    return { tokens, seeds, hardReds, closure };
}

// ── CLI run-guard — a debug summary; importing the leaf never runs it ─────────────
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const rosterArg =
        process.argv[2] ??
        "docs/tranches/BG/audit/reflect/bg-gestalt-roster.md";
    const abs = resolve(ROOT, rosterArg);
    if (!existsSync(abs)) {
        console.error(`surface-closure: roster not found at ${rosterArg}`);
        process.exit(2);
    }
    const { tokens, seeds, hardReds, closure } = surfaceClosure(readFileSync(abs, "utf8"));
    console.log(`surface-closure — ${rosterArg}`);
    console.log(`  route tokens : ${tokens.length} (${tokens.join(", ")})`);
    console.log(`  seeds        : ${seeds.length}`);
    console.log(`  HARD-REDs    : ${hardReds.length}${hardReds.length ? " → " + hardReds.map((h) => `${h.token} (no ${h.expected})`).join("; ") : " (every route resolves)"}`);
    console.log(`  paint-closure: ${closure.length} files`);
    process.exit(hardReds.length ? 1 : 0);
}
