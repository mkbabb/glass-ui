#!/usr/bin/env node
// AV.W5.A — the subpath-enumeration gate (proof:subpath-enumeration).
//
// W5 Lane A collapsed the 58 trivial one-line subpath barrels from `src/<name>.ts`
// into `src/subpaths/<name>.ts` and replaced the hand-listed `vite.library.ts`
// entry map with a programmatic batch-resolve over `src/subpaths/*.ts` (merged
// with the 11 curated multi-line barrels that stay at `src/` top level). The move
// is a SOURCE-only transposition — the published surface (`package.json` exports
// + the `dist/<name>.js` chunk set) must be BYTE-UNCHANGED. This gate proves that
// invariant holds, three ways:
//
//   (1) ENUM-COMPLETE — every JS subpath in `package.json` exports maps to a
//       `dist/<name>.js` that EXISTS after `npm run build` (no dangling export →
//       no chunk).
//   (2) NO-ORPHAN-CHUNK — every `dist/<name>.js` library chunk (the entry-point
//       set, NOT the shared-leaf chunks) has a corresponding `exports` entry (no
//       published chunk without a publication).
//   (3) BATCH-EQUIV — the `libraryEntries()` map (after the batch-resolve) has
//       the SAME key set as the JS subpath publication (`package.json` exports),
//       name-for-name. This is the heart: the batch-resolve must be PROVABLY
//       equivalent to the prior hand-list — a dropped or added entry here is a
//       silent surface drift.
//
// House style mirrors proof-package.mjs (the dist-inventory form): ESM .mjs, a
// pure exported detector, a byte-stable JSON artefact via gate-output, a human
// summary, process.exit(1) on any violation.
//
// Bite: drop a `src/subpaths/<name>.ts` (so its chunk vanishes) while leaving the
// `exports` entry → ENUM-COMPLETE fails RED (dangling export).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { libraryEntries } from "../vite.library.ts";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath(
    "GLASS_UI_SUBPATH_ENUMERATION_ARTIFACT",
    "AV-subpath-enumeration",
);

/**
 * The JS subpath publication: every `package.json` exports key whose `import`
 * target is a `dist/<name>.js` chunk. The CSS/font entries (`./styles`,
 * `./fonts/*`, `./styles.css`) and the `.` root (→ `glass-ui.js`) are excluded —
 * this gate guards the per-subpath chunk surface, keyed by the entry NAME.
 */
export function jsSubpathExports(pkg) {
    const out = new Map(); // name -> dist relative path
    for (const [key, value] of Object.entries(pkg.exports ?? {})) {
        if (key === ".") continue; // the root barrel (glass-ui.js) — not a flat subpath
        if (key.includes("*")) continue; // glob entries (./fonts/*)
        const imp = typeof value === "object" ? value.import : value;
        if (typeof imp !== "string") continue;
        const m = imp.match(/^\.\/dist\/(.+)\.js$/);
        if (!m) continue; // CSS (.css) / non-dist-js entries are not subpath chunks
        const name = key.replace(/^\.\//, "");
        out.set(name, imp.replace(/^\.\//, ""));
    }
    return out;
}

/**
 * The pure detector. Inputs: the parsed package.json, the libraryEntries key set,
 * and an `exists(relPath)` probe (so the unit form can stub the filesystem).
 * Returns { facts, violations }.
 */
export function detectEnumeration(pkg, entryNames, exists) {
    const violations = [];
    const facts = {};

    const exports = jsSubpathExports(pkg);
    const exportNames = new Set(exports.keys());

    // The libraryEntries map keys minus `index` (it publishes as `.` → glass-ui.js,
    // NOT a flat subpath) — the entry NAMES that should each carry a flat subpath.
    const entrySet = new Set(entryNames.filter((n) => n !== "index"));

    facts.exportSubpathCount = exportNames.size;
    facts.entryChunkCount = entrySet.size;

    // (1) ENUM-COMPLETE — every exported subpath chunk exists on disk.
    const danglingExports = [];
    for (const [name, rel] of exports) {
        if (!exists(rel)) danglingExports.push(`${name} → ${rel}`);
    }
    if (danglingExports.length) {
        violations.push(
            `ENUM-COMPLETE: ${danglingExports.length} export(s) point at a missing dist chunk: ${danglingExports.join(", ")}`,
        );
    }
    facts.enumComplete = danglingExports.length === 0;

    // (3) BATCH-EQUIV — the libraryEntries key set equals the JS subpath export
    // set, name-for-name (the batch-resolve produced the same publication).
    const missingFromEntries = [...exportNames].filter((n) => !entrySet.has(n));
    const orphanEntries = [...entrySet].filter((n) => !exportNames.has(n));
    if (missingFromEntries.length) {
        violations.push(
            `BATCH-EQUIV: exports publish subpath(s) with NO libraryEntries chunk: ${missingFromEntries.join(", ")}`,
        );
    }
    if (orphanEntries.length) {
        // (2) NO-ORPHAN-CHUNK — a libraryEntries chunk with no exports entry.
        violations.push(
            `NO-ORPHAN-CHUNK: libraryEntries emit(s) chunk(s) with NO exports publication: ${orphanEntries.join(", ")}`,
        );
    }
    facts.batchEquiv = missingFromEntries.length === 0 && orphanEntries.length === 0;

    return { facts, violations };
}

function run() {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
    const entryNames = Object.keys(libraryEntries(ROOT));
    const exists = (rel) => existsSync(resolve(ROOT, rel));

    const { facts, violations } = detectEnumeration(pkg, entryNames, exists);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:subpath-enumeration",
        facts,
        violations,
    });

    console.log(
        "proof:subpath-enumeration — the exports↔dist↔libraryEntries surface-invariance gate (AV.W5.A)",
    );
    console.log(`  JS subpath exports        : ${facts.exportSubpathCount}`);
    console.log(`  libraryEntries chunks     : ${facts.entryChunkCount}`);
    console.log(`  ENUM-COMPLETE (no dangle) : ${facts.enumComplete ? "YES" : "NO"}`);
    console.log(`  BATCH-EQUIV (name-for-name): ${facts.batchEquiv ? "YES" : "NO"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
