// authored/scripts-doors.mjs — AUTHORED input to derive/edits.mjs (step S20; LAW §1, §5,
// §10; B1, B7, B11).
//
// Every code dir in the scripts zone is a module with a door (B7), and a reference from
// outside a module enters through its door (B1). After S19 the zone's modules are
// scripts/minify, scripts/structure, scripts/structure/lib, scripts/structure/lib/graph and
// scripts/structure/seal. Each door carries exactly the names read from outside its module
// (B11), measured on F-1 after S19:
//   - lib/graph: the graph and its measures, read by lib/move, lib/classify and the lib door;
//   - lib: what the floor's CLIs, the gate and the structure door read;
//   - seal: `seal`, read by its test through the structure door;
//   - structure: what the build configs, the harness and the gates' tests read;
//   - minify: `minifyCss` (vite.style-fold.ts) and `hasCommentOutsideString` (its test).
// The minify module is TypeScript, so its door is `index.ts` (LAW §1, "befitting their
// languages"); every other scripts door is `index.mjs`.
//
// Two readers crossed scripts/structure by PATH, which no door carries, and each is cured
// at its cause:
//   - the two gate tests executed a floor CLI by path (`gates.mjs`, `seal/seal.mjs`); the
//     floor gates become a function (`runGates`) and both tests call through the door;
//   - the build's watch list named the record and its reader by path; the floor states its
//     own watch inputs (`recordInputs`), read through the door.

import { readFileSync } from "node:fs";

export const why = "B7/B1 in the scripts zone: a door for every scripts module, every crossing through it; path reads of the floor replaced by door functions";

const SEAL_TEST = readFileSync(new URL("../gate/seal.test.ts", import.meta.url), "utf8");

const lib = (file, from, to) => ({ file: `scripts/structure/${file}`, why: "B1: a floor CLI reads lib through its door", from, to });

export const edits = [
    // ---- lib/graph
    {
        file: "scripts/structure/lib/graph/index.mjs",
        why: "B7: the graph module's door; the names lib/move, lib/classify and the lib door read",
        create: `// graph/ — F-1: the one graph (graph.mjs), its per-language scanners (script, CSS, text,
// Vue, Playwright) and the evaluator that folds path expressions. graph.mjs is the root; nothing outside
// this module reads the scanners except through it.
export { scanCss } from "./css.mjs";
export { buildGraph, countBy, loadDeps, moduleSccs, valueSccs, VALUE_KINDS } from "./graph.mjs";
export { playwrightProgram, SEAT_REPORT } from "./playwright.mjs";
`,
    },
    { file: "scripts/structure/lib/move.mjs", why: "B1: lib reads its graph module through the door", from: `import { buildGraph, loadDeps, moduleSccs } from "./graph/graph.mjs";`, to: `import { buildGraph, loadDeps, moduleSccs } from "./graph/index.mjs";` },
    { file: "scripts/structure/lib/classify.mjs", why: "B1: lib reads its graph module through the door", from: `import { buildGraph, loadDeps } from "./graph/graph.mjs";`, to: `import { buildGraph, loadDeps } from "./graph/index.mjs";` },
    // ---- lib
    {
        file: "scripts/structure/lib/index.mjs",
        why: "B7: the floor library's door; the names its CLIs, the gate and the structure door read",
        create: `// lib/ — the floor library: the file set (tree), the graph (F-1), symbol origins, placement
// (F-7), the move engine (F-2), the step classifier (FD-5), the specifier resolver, the
// class recipes FD-4 and F-10 read, and the entry record (F-3).
export { classifyStep } from "./classify.mjs";
export {
    compareToPackage,
    declarationProgram,
    libraryEntryMap,
    loadRecord,
    readJson,
    recordCssTargets,
    recordEntries,
    recordInputs,
    recordTerminal,
    validateRecord,
} from "./entries.mjs";
export { buildGraph, countBy, loadDeps, playwrightProgram, scanCss, SEAT_REPORT, valueSccs, VALUE_KINDS } from "./graph/index.mjs";
export { runMoves, sccGrowth } from "./move.mjs";
export { CONTAINERS, dirUnits, isSlot, placeAll, proposedPath, publicationAnchor } from "./placement.mjs";
export { classesOf, classOwners, classRecipes, coOccurrence, impliedBy } from "./recipes.mjs";
export { makeOrigins } from "./symbols.mjs";
export { DEFAULT_ROOT, openTree, pinPath, recordPath, ZONES, zoneOf } from "./tree.mjs";
`,
    },
    {
        file: "scripts/structure/lib/entries.mjs",
        why: "the floor states its own watch inputs, so the build names no floor path",
        from: `import { join } from "node:path";
import { DEFAULT_ROOT, recordPath } from "./tree.mjs";
`,
        to: `import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_ROOT, recordPath } from "./tree.mjs";
`,
    },
    {
        file: "scripts/structure/lib/entries.mjs",
        why: "the floor states its own watch inputs, so the build names no floor path",
        from: `/** \`{ name: "src/…" }\` for the declaration projector. */`,
        to: `/** The files a build watches so an edit to the record, or to this reader, rebuilds. */
export function recordInputs(root = DEFAULT_ROOT) {
    return [join(root, recordPath(root)), fileURLToPath(import.meta.url)];
}

/** \`{ name: "src/…" }\` for the declaration projector. */`,
    },
    lib("bounds.mjs", `import { DEFAULT_ROOT, ZONES, openTree } from "./lib/tree.mjs";
import { isSlot } from "./lib/placement.mjs";`, `import { DEFAULT_ROOT, isSlot, openTree, ZONES } from "./lib/index.mjs";`),
    lib("classify.mjs", `import { classifyStep } from "./lib/classify.mjs";`, `import { classifyStep } from "./lib/index.mjs";`),
    lib("entries.mjs", `import { DEFAULT_ROOT, openTree, recordPath } from "./lib/tree.mjs";
import { compareToPackage, loadRecord, readJson, validateRecord } from "./lib/entries.mjs";`, `import { compareToPackage, DEFAULT_ROOT, loadRecord, openTree, readJson, recordPath, validateRecord } from "./lib/index.mjs";`),
    lib("fixpoint.mjs", `import { buildGraph, countBy } from "./lib/graph/graph.mjs";
import { runMoves } from "./lib/move.mjs";
import { dirUnits, placeAll, proposedPath, publicationAnchor } from "./lib/placement.mjs";`, `import { buildGraph, countBy, dirUnits, placeAll, proposedPath, publicationAnchor, runMoves } from "./lib/index.mjs";`),
    lib("graph.mjs", `import { DEFAULT_ROOT } from "./lib/tree.mjs";
import { buildGraph, countBy, valueSccs } from "./lib/graph/graph.mjs";`, `import { buildGraph, countBy, DEFAULT_ROOT, valueSccs } from "./lib/index.mjs";`),
    lib("move.mjs", `import { runMoves } from "./lib/move.mjs";`, `import { runMoves } from "./lib/index.mjs";`),
    lib("placement.mjs", `import { DEFAULT_ROOT } from "./lib/tree.mjs";
import { buildGraph, countBy } from "./lib/graph/graph.mjs";
import { dirUnits, placeAll, proposedPath, publicationAnchor } from "./lib/placement.mjs";`, `import { buildGraph, countBy, DEFAULT_ROOT, dirUnits, placeAll, proposedPath, publicationAnchor } from "./lib/index.mjs";`),
    lib("surface.mjs", `import { DEFAULT_ROOT, pinPath } from "./lib/tree.mjs";`, `import { DEFAULT_ROOT, pinPath } from "./lib/index.mjs";`),
    lib("cascade.mjs", `import { DEFAULT_ROOT, openTree } from "./lib/tree.mjs";
import { classRecipes, classOwners, coOccurrence, impliedBy } from "./lib/recipes.mjs";
import { SEAT_REPORT } from "./lib/graph/playwright.mjs";`, `import { classOwners, classRecipes, coOccurrence, DEFAULT_ROOT, impliedBy, openTree, SEAT_REPORT } from "./lib/index.mjs";`),
    // pass 6: the P6 floor's seat reads the Playwright program and loadDeps (P6-F2)
    lib("browser.mjs", `import { buildGraph, loadDeps } from "./lib/graph/graph.mjs";
import { zoneOf } from "./lib/tree.mjs";
import { classOwners, classRecipes, classesOf, impliedBy } from "./lib/recipes.mjs";
import { playwrightProgram, SEAT_REPORT } from "./lib/graph/playwright.mjs";`, `import { buildGraph, classesOf, classOwners, classRecipes, impliedBy, loadDeps, playwrightProgram, SEAT_REPORT, zoneOf } from "./lib/index.mjs";`),
    lib("cascade.mjs", `    const { buildGraph } = await import("./lib/graph/graph.mjs");`, `    const { buildGraph } = await import("./lib/index.mjs");`),
    // ---- gates: a function behind the door; the CLI prints it
    lib("gates.mjs", `//   node gates.mjs [--root R] [--json]
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { DEFAULT_ROOT, openTree, pinPath } from "./lib/tree.mjs";
import { buildGraph, countBy } from "./lib/graph/graph.mjs";
import { compareToPackage, loadRecord, validateRecord } from "./lib/entries.mjs";
import { contract } from "./cascade.mjs";
import { diffSurface, readSurface } from "./surface.mjs";

const args = process.argv.slice(2);
const root = resolve(args.includes("--root") ? args[args.indexOf("--root") + 1] : DEFAULT_ROOT);
const checks = [];
`, `//   node gates.mjs [--root R] [--json]      (runGates(root) is the same run, read through the door)
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildGraph, compareToPackage, countBy, DEFAULT_ROOT, loadRecord, openTree, pinPath, validateRecord } from "./lib/index.mjs";
import { contract } from "./cascade.mjs";
import { diffSurface, readSurface } from "./surface.mjs";

export async function runGates(root = DEFAULT_ROOT) {
const checks = [];
`),
    lib("gates.mjs", `const pass = checks.every((x) => x.pass);
if (args.includes("--json")) console.log(JSON.stringify({ pass, checks }, null, 1));
else for (const x of checks) console.log(\`\${x.pass ? "PASS" : "FAIL"}  \${x.id}  \${JSON.stringify(x.detail).slice(0, 240)}\`);
process.exit(pass ? 0 : 1);
`, `return { pass: checks.every((x) => x.pass), checks };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.dirname, "gates.mjs")) {
    const args = process.argv.slice(2);
    const { pass, checks } = await runGates(resolve(args.includes("--root") ? args[args.indexOf("--root") + 1] : DEFAULT_ROOT));
    if (args.includes("--json")) console.log(JSON.stringify({ pass, checks }, null, 1));
    else for (const x of checks) console.log(\`\${x.pass ? "PASS" : "FAIL"}  \${x.id}  \${JSON.stringify(x.detail).slice(0, 240)}\`);
    process.exit(pass ? 0 : 1);
}
`),
    // ---- seal
    {
        file: "scripts/structure/seal/index.mjs",
        why: "B7: the gate module's door; `seal` is read by its test",
        create: `// seal/ — route D1-B's gate: seventeen clauses over one F-1 graph (seal.mjs) and the route's
// law they share with the B-kit planners (law.mjs).
export { seal } from "./seal.mjs";
`,
    },
    {
        file: "scripts/structure/seal/seal.mjs",
        why: "B1: the gate reads the floor library through its door",
        from: `import { buildGraph, VALUE_KINDS } from "../lib/graph/graph.mjs";
import { makeOrigins } from "../lib/symbols.mjs";
import { CONTAINERS as FLOOR_CONTAINERS, isSlot as floorIsSlot, placeAll, proposedPath } from "../lib/placement.mjs";
import { sccGrowth } from "../lib/move.mjs";`,
        to: `import { buildGraph, CONTAINERS as FLOOR_CONTAINERS, isSlot as floorIsSlot, makeOrigins, placeAll, proposedPath, sccGrowth, VALUE_KINDS } from "../lib/index.mjs";`,
    },
    // ---- structure
    {
        file: "scripts/structure/index.mjs",
        why: "B7: the floor runtime's door; the names the build configs, the harness and the gate tests read",
        create: `// scripts/structure/ — the D1 floor runtime (FD-11): the graph, the move engine, the entry
// record, the cascade contract and the gates. Its CLIs sit beside this door; everything a
// build config, the test harness or a gate test reads comes through here.
export { runGates } from "./gates.mjs";
export {
    buildGraph,
    declarationProgram,
    libraryEntryMap,
    openTree,
    recordCssTargets,
    recordEntries,
    recordInputs,
    recordTerminal,
    scanCss,
} from "./lib/index.mjs";
export { seal } from "./seal/index.mjs";
`,
    },
    { file: "scripts/flatten-subpath-types.mjs", why: "B1: through the floor's door", from: `import { recordEntries } from "../scripts/structure/lib/entries.mjs";`, to: `import { recordEntries } from "../scripts/structure/index.mjs";` },
    { file: "vite.library.ts", why: "B1: through the floor's door", from: `import { libraryEntryMap } from "./scripts/structure/lib/entries.mjs";`, to: `import { libraryEntryMap } from "./scripts/structure/index.mjs";` },
    { file: "vite.style-fold.ts", why: "B1/B11: through the floor's door, naming what it reads", from: `import * as entryRecord from "./scripts/structure/lib/entries.mjs";`, to: `import { recordCssTargets, recordEntries, recordTerminal } from "./scripts/structure/index.mjs";` },
    { file: "vite.style-fold.ts", why: "the named import", from: `String(entryRecord.recordTerminal(root))`, to: `String(recordTerminal(root))` },
    { file: "vite.style-fold.ts", why: "the named import", from: `= entryRecord.recordCssTargets(root) as {`, to: `= recordCssTargets(root) as {` },
    { file: "vite.style-fold.ts", why: "the named import", from: `Object.values(entryRecord.recordEntries(root))`, to: `Object.values(recordEntries(root))` },
    { file: "vite.style-assets.ts", why: "B1/B11: through the floor's door, naming what it reads", from: `import * as entryRecord from "./scripts/structure/lib/entries.mjs";`, to: `import { declarationProgram, recordInputs } from "./scripts/structure/index.mjs";` },
    { file: "vite.style-assets.ts", why: "the named import", from: `entryRecord.declarationProgram(repositoryRoot, outputRoot)`, to: `declarationProgram(repositoryRoot, outputRoot)` },
    {
        file: "vite.style-assets.ts",
        why: "the floor names its own watch inputs",
        from: `        "scripts/structure/records/entry-record.json",
        "scripts/structure/lib/entries.mjs",
`,
        to: "",
    },
    {
        file: "vite.style-assets.ts",
        why: "the floor names its own watch inputs",
        from: `    for (const path of fixed) plugin.addWatchFile(resolve(root, path));
`,
        to: `    for (const path of fixed) plugin.addWatchFile(resolve(root, path));
    for (const path of recordInputs(root) as string[]) plugin.addWatchFile(path);
`,
    },
    { file: "vite.style-fold.ts", why: "B1: minify-css through its module's door", from: `import { minifyCss } from "./scripts/minify/minify-css";`, to: `import { minifyCss } from "./scripts/minify";` },
    { file: "vite.style-fold.ts", why: "the prose names the module where it now lives", from: `(\`scripts/lib/\n * minify-css.ts\` \`minifyCss\`)`, to: `(\`scripts/minify/\n * minify-css.ts\` \`minifyCss\`)` },
    { file: "tests/styles/minify-css.test.ts", why: "B1: through the module's door", from: `from "../../scripts/minify/minify-css";`, to: `from "../../scripts/minify";` },
    {
        file: "scripts/minify/index.ts",
        why: "B7: the minify module's door (TypeScript, so index.ts)",
        create: `// minify/ — the conservative, string-aware CSS minifier the style fold runs on every
// published sheet.
export { hasCommentOutsideString, minifyCss } from "./minify-css";
`,
    },
    // ---- tests read the floor through its door
    { file: "tests/gates/orphan-css-partial.test.ts", why: "B1: through the floor's door", from: `import { libraryEntryMap } from "../../scripts/structure/lib/entries.mjs";`, to: `import { libraryEntryMap } from "../../scripts/structure/index.mjs";` },
    { file: "tests/gates/overfit-structure.test.ts", why: "B1: through the floor's door", from: `import { libraryEntryMap } from "../../scripts/structure/lib/entries.mjs";`, to: `import { libraryEntryMap } from "../../scripts/structure/index.mjs";` },
    {
        file: "tests/harness/source.ts",
        why: "B1: the harness reads the floor through its door",
        from: `// @ts-ignore — the floor's tree reader is an untyped ESM leaf.
import { openTree } from "../../scripts/structure/lib/tree.mjs";
// @ts-ignore — the floor's graph is an untyped ESM leaf.
import { buildGraph } from "../../scripts/structure/lib/graph/graph.mjs";
// @ts-ignore — the floor's CSS scanner is an untyped ESM leaf.
import { scanCss } from "../../scripts/structure/lib/graph/css.mjs";`,
        to: `import { buildGraph, openTree, scanCss } from "../../scripts/structure/index.mjs";`,
    },
    {
        file: "tests/gates/floor.test.ts",
        why: "B1: the floor gates run through the door, in process",
        from: `// entry record, cascade contract, surface pin. One child process, one verdict per gate.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(__dirname, "../..");
const GATES = resolve(ROOT, "scripts/structure/gates.mjs");

function run(): { pass: boolean; checks: { id: string; pass: boolean; detail: unknown }[] } {
    try {
        return JSON.parse(execFileSync("node", [GATES, "--root", ROOT, "--json"], { encoding: "utf8", maxBuffer: 1 << 26 }));
    } catch (error) {
        const out = (error as { stdout?: string }).stdout;
        if (!out) throw error;
        return JSON.parse(out);
    }
}

describe("floor gates", () => {
    const verdict = run();`,
        to: `// entry record, cascade contract, surface pin. One run through the floor's door, one verdict
// per gate.
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { runGates } from "../../scripts/structure/index.mjs";

const ROOT = resolve(__dirname, "../..");
const verdict: { pass: boolean; checks: { id: string; pass: boolean; detail: unknown }[] } = await runGates(ROOT);

describe("floor gates", () => {`,
    },
    { file: "tests/gates/seal.test.ts", why: "B1: the gate runs through the floor's door, in process (the kit's gate/seal.test.ts)", from: "// tests/gates/seal.test.ts — the D1-B seal", until: "\n});\n", to: SEAL_TEST },
];
