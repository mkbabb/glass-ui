#!/usr/bin/env node
// BH.B2.0 — the `@glass` source-alias depth-decouple lock (proof:alias-codemod).
//
// The demo (492) + tests (227) trees imported `src/` via DEEP-RELATIVE paths
// (`(../)+src/X`), so every src move was a 700+-site rewrite. B2.0 mints the
// 3-plane `@glass` alias (`@glass/* -> src/*`: tsconfig `paths` + vite
// `resolve.alias` + vitest `resolve.alias` — vitest does NOT read vite's) and
// codemods the 719 deep-relative import/export SPECIFIERS onto `@glass/X`. This
// gate LOCKS the result so the depth-coupling cannot regress:
//
//   1. THE ALIAS IS WIRED in all three planes (type + the two runtime planes).
//   2. ZERO deep-relative `(../)+src/` import/export SPECIFIERS survive in
//      demo/ + tests/ (fs-path literals like `resolve(__dirname, "../../src/…")`
//      are NOT module specifiers — the `@glass` alias is module-resolution-only
//      — so they STAY relative by construction and are NOT counted).
//
// Born-RED on HEAD: pre-codemod the alias is absent in all three planes AND
// 719 deep-relative specifiers live in demo/ + tests/. GREEN after B2.0.
//
// Self-test bite (always runs): the SPECIFIER detector MUST flag a synthetic
// deep-relative src import AND MUST NOT flag a synthetic `resolve(__dirname,
// "(../)+src/…")` fs-path, an already-aliased `@glass/…` import, or a non-src
// relative import. A detector that lost its teeth (or grew a false positive on
// the fs-path) REDs the gate even on a clean tree.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, extname, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const CODE_EXT = new Set([".ts", ".vue", ".js", ".mts", ".cts", ".tsx", ".jsx"]);

// Import/export SPECIFIER position ONLY — static `from`, side-effect `import`,
// dynamic `import(`, the explicit `export … from` arms, and `require(`. The
// `\bfrom` arm subsumes every `… from "…"`; the explicit export arms are
// belt-and-suspenders. fs-path calls (resolve/readFileSync/…) are NEVER reached
// (no `from`/`import(`/`require(` precedes their quote).
const SPECIFIER_RE =
    /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+|\bexport\s+\*\s+from\s*|\bexport\s+\{[^}]*\}\s+from\s*|\brequire\s*\(\s*)(["'])((?:\.\.\/)+src\/[^"']+)\2/g;

/** Every deep-relative `(../)+src/…` module specifier in a file's text. */
function findSpecifiers(text) {
    const hits = [];
    for (const m of text.matchAll(SPECIFIER_RE)) hits.push(m[3]);
    return hits;
}

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        DEMO: resolve(ROOT, "demo"),
        TESTS: resolve(ROOT, "tests"),
        TSCONFIG: resolve(ROOT, "tsconfig.json"),
        VITE: resolve(ROOT, "vite.config.ts"),
        VITEST: resolve(ROOT, "vitest.config.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_ALIAS_CODEMOD_ARTIFACT", "BH-alias-codemod"),
    };
}

function walk(dir, acc = []) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return acc;
    }
    for (const e of entries) {
        if (e.name === "node_modules" || e.name === "dist") continue;
        const full = resolve(dir, e.name);
        if (e.isDirectory()) walk(full, acc);
        else if (e.isFile() && CODE_EXT.has(extname(e.name))) acc.push(full);
    }
    return acc;
}

/** Scan a tree; return the per-file specifier survivors. */
function scanTree(ROOT, dir) {
    const survivors = [];
    for (const file of walk(dir)) {
        const hits = findSpecifiers(readFileSync(file, "utf8"));
        if (hits.length) {
            const rel = relative(ROOT, file).split(sep).join("/");
            for (const spec of hits) survivors.push(`${rel}: ${spec}`);
        }
    }
    return survivors;
}

/** The 3-plane alias-wired check. Returns {plane: ok} + a violations list. */
function checkAliasWired(paths) {
    const planes = {};
    const violations = [];

    // `paths` resolves relative to the tsconfig dir under `moduleResolution:
    // bundler` — NO `baseUrl` (TS5101: baseUrl is deprecated, errors on this TS).
    const ts = readFileSync(paths.TSCONFIG, "utf8");
    planes.tsconfigPaths = /"@glass\/\*"\s*:\s*\[\s*"\.\/src\/\*"\s*\]/.test(ts);
    if (!planes.tsconfigPaths)
        violations.push('tsconfig.json: missing `"@glass/*":["./src/*"]` paths mapping');

    // The alias value points at `src` — match `src` anywhere on the key's line
    // (the value forms carry an internal comma: `resolve(__dirname, "src")` /
    // `fileURLToPath(new URL("./src", import.meta.url))`).
    const vite = readFileSync(paths.VITE, "utf8");
    planes.viteAlias =
        /\bresolve\s*:/.test(vite) && /\balias\s*:/.test(vite) && /["']@glass["']\s*:[^\n]*src/.test(vite);
    if (!planes.viteAlias)
        violations.push("vite.config.ts: missing `resolve.alias` mapping `@glass` -> src");

    const vitest = readFileSync(paths.VITEST, "utf8");
    planes.vitestAlias =
        /\balias\s*:/.test(vitest) && /["']@glass["']\s*:[^\n]*src/.test(vitest);
    if (!planes.vitestAlias)
        violations.push("vitest.config.ts: missing `resolve.alias` mapping `@glass` -> src");

    return { planes, violations };
}

/** The detector-teeth self-test. Returns a violations list (empty = teeth OK). */
function selfTest() {
    const v = [];
    // (a) a real deep-relative src import MUST be flagged.
    const imp = findSpecifiers('import { X } from "../../../src/components/foo";');
    if (imp.length !== 1 || imp[0] !== "../../../src/components/foo")
        v.push("self-test: SPECIFIER detector failed to flag a deep-relative src import (lost teeth)");
    // (b) a dynamic import MUST be flagged.
    const dyn = findSpecifiers('const m = await import("../../src/a/b");');
    if (dyn.length !== 1) v.push("self-test: detector missed a dynamic import()");
    // (c) an fs-path literal MUST NOT be flagged (it is not a module specifier).
    const fs = findSpecifiers('const css = readFileSync(resolve(__dirname, "../../../../src/styles/x.css"));');
    if (fs.length !== 0) v.push("self-test: detector FALSE-flagged an fs-path literal (would force a broken rewrite)");
    // (d) an already-aliased import MUST NOT be flagged.
    const aliased = findSpecifiers('import { Y } from "@glass/components/bar";');
    if (aliased.length !== 0) v.push("self-test: detector false-flagged an already-aliased @glass import");
    // (e) a non-src relative import MUST NOT be flagged.
    const sibling = findSpecifiers('import { Z } from "../shared/util";');
    if (sibling.length !== 0) v.push("self-test: detector false-flagged a non-src relative import");
    return v;
}

export function detect(paths) {
    const { planes, violations: aliasViolations } = checkAliasWired(paths);
    const demoSurvivors = scanTree(paths.ROOT, paths.DEMO);
    const testsSurvivors = scanTree(paths.ROOT, paths.TESTS);
    const selfTestViolations = selfTest();

    const violations = [
        ...aliasViolations,
        ...demoSurvivors.map((s) => `demo deep-relative src specifier survives: ${s}`),
        ...testsSurvivors.map((s) => `tests deep-relative src specifier survives: ${s}`),
        ...selfTestViolations,
    ];

    return {
        planes,
        demoSurvivorCount: demoSurvivors.length,
        testsSurvivorCount: testsSurvivors.length,
        demoSurvivors: demoSurvivors.slice(0, 20),
        testsSurvivors: testsSurvivors.slice(0, 20),
        selfTestViolations,
        violations,
    };
}

function run() {
    const paths = cliPaths();
    const r = detect(paths);
    const status = r.violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(paths.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:alias-codemod",
        facts: {
            planes: r.planes,
            demoSurvivorCount: r.demoSurvivorCount,
            testsSurvivorCount: r.testsSurvivorCount,
            selfTestPass: r.selfTestViolations.length === 0,
        },
        violations: r.violations,
    });

    console.log("proof:alias-codemod — @glass source-alias depth-decouple lock (BH.B2.0)");
    console.log(
        `  alias planes: tsconfig=${r.planes.tsconfigPaths} vite=${r.planes.viteAlias} vitest=${r.planes.vitestAlias}`,
    );
    console.log(
        `  deep-relative src specifiers — demo: ${r.demoSurvivorCount}   tests: ${r.testsSurvivorCount}   (target 0)`,
    );
    console.log(`  self-test teeth: ${r.selfTestViolations.length === 0 ? "OK" : "BROKEN"}`);
    if (r.violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of r.violations.slice(0, 30)) console.log(`  ✗ ${v}`);
        if (r.violations.length > 30) console.log(`  … +${r.violations.length - 30} more`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${paths.ARTIFACT.slice(paths.ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
