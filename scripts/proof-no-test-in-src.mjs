#!/usr/bin/env node
// AV.W14 — the test-in-src structure-lock (proof:no-test-in-src).
//
// Born-RED at open (60 tests + a test-d + the glsl-port fixture lived under 27
// in-src `__tests__/` dirs). The relocation moves the whole tree to a top-level
// `tests/` mirror of `src/`. This gate forbids the regression: ZERO
// `*.{test,spec,test-d}.{ts,tsx,vue}` files and ZERO `__tests__/` directories
// under `src/`. The source/test boundary is a deliberate policy (no test files
// in src), not a correctness fix.
//
// bite-check: drop a `useFoo.test.ts` (or a `__tests__/` dir) back under `src/`
// → RED.

import { readdirSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        SRC: resolve(ROOT, "src"),
        TESTS: resolve(ROOT, "tests"),
        ARTIFACT: gateArtifactPath("GLASS_UI_NO_TEST_IN_SRC_ARTIFACT", "AV-no-test-in-src"),
    };
}

const TEST_FILE = /\.(test|spec|test-d)\.(ts|tsx|vue)$/;

/** Walk a dir; collect test files + __tests__ dirs (relative paths). */
function walk(dir, ROOT, testFiles, testDirs) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        const rel = relative(ROOT, full).split(sep).join("/");
        if (entry.isDirectory()) {
            if (entry.name === "node_modules") continue;
            if (entry.name === "__tests__") testDirs.push(rel);
            walk(full, ROOT, testFiles, testDirs);
        } else if (entry.isFile() && TEST_FILE.test(entry.name)) {
            testFiles.push(rel);
        }
    }
}

/** Walk a dir; collect ALL files (for the tests/ mirror inventory). */
function collectFiles(dir, ROOT, acc) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "node_modules") continue;
            collectFiles(full, ROOT, acc);
        } else if (entry.isFile()) {
            acc.push(relative(ROOT, full).split(sep).join("/"));
        }
    }
    return acc;
}

export function detect(ROOT, SRC, TESTS) {
    const srcTestFiles = [];
    const srcTestDirs = [];
    walk(SRC, ROOT, srcTestFiles, srcTestDirs);

    const violations = [];
    for (const f of srcTestFiles) violations.push(`test file under src/: ${f}`);
    for (const d of srcTestDirs) violations.push(`__tests__/ dir under src/: ${d}`);

    let testsMirror = [];
    try {
        testsMirror = collectFiles(TESTS, ROOT, []).filter((p) => TEST_FILE.test(p)).sort();
    } catch {
        // tests/ absent is itself a violation if src/ still has tests; reported above.
    }

    return { srcTestFiles, srcTestDirs, violations, testsMirror };
}

function run() {
    const { ROOT, SRC, TESTS, ARTIFACT } = cliPaths();
    const { srcTestFiles, srcTestDirs, violations, testsMirror } = detect(ROOT, SRC, TESTS);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-test-in-src",
        facts: {
            srcTestFileCount: srcTestFiles.length,
            srcTestDirCount: srcTestDirs.length,
            testsMirrorCount: testsMirror.length,
            testsMirror,
        },
        violations,
    });

    console.log("proof:no-test-in-src — zero test files / __tests__ dirs under src/ (AV.W14)");
    console.log(`  src/ test files: ${srcTestFiles.length}   src/ __tests__ dirs: ${srcTestDirs.length}`);
    console.log(`  tests/ mirror test files: ${testsMirror.length}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
