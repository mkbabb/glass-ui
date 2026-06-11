#!/usr/bin/env node
// AZ.R5-5 — the scoped `:global()` DROP trap lock (proof:no-scoped-global).
//
// The trap (THREE production recurrences, consumer-verified): a `:global(.dark)
// .x` selector inside a Vue `<style scoped>` block is MIS-COMPILED — the local
// leg after the `:global()` segment is DROPPED and the scope id is lost, so the
// rule lands on the bare `.dark` ROOT and leaks every override to the whole
// document. The working idiom is the plain ancestor form `.dark .x`, which
// compiles to `.dark .x[data-v-…]` (codified in
// docs/precepts/design-idioms.md §8).
//
// This gate is a STATIC SWEEP: zero `:global(` inside ANY `<style scoped>` block
// across `src/` + `demo/`. The allowlist is EMPTY at birth.
//
// Born-RED demonstration: run with `--fixture` to inject a synthetic scoped
// `:global()` survivor and assert the detector flags it (proves the gate has
// teeth even after the real tree is clean).
//
// bite-check: drop a `:global(.dark) .x` into any `<style scoped>` block → RED.

import { readdirSync, readFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        ROOTS: [resolve(ROOT, "src"), resolve(ROOT, "demo")],
        ARTIFACT: gateArtifactPath("GLASS_UI_NO_SCOPED_GLOBAL_ARTIFACT", "AZ-no-scoped-global"),
    };
}

const SCOPED_GLOBAL = /:global\s*\(/g;

/** Extract every `<style ... scoped ...>...</style>` block body + its 0-based
 *  line offset within the SFC source. */
function scopedStyleBlocks(source) {
    const blocks = [];
    // Match the opening <style ...> tag, capture its attrs, then the body up to </style>.
    const re = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = re.exec(source)) !== null) {
        const attrs = m[1];
        if (!/\bscoped\b/i.test(attrs)) continue;
        const body = m[2];
        const bodyStart = m.index + m[0].indexOf(m[2], m[1].length);
        const lineOffset = source.slice(0, bodyStart).split("\n").length - 1;
        blocks.push({ body, lineOffset });
    }
    return blocks;
}

/** Scan one SFC source for `:global(` inside a scoped style block. */
function scanSource(source, relPath, violations) {
    for (const { body, lineOffset } of scopedStyleBlocks(source)) {
        const lines = body.split("\n");
        for (let i = 0; i < lines.length; i++) {
            SCOPED_GLOBAL.lastIndex = 0;
            if (SCOPED_GLOBAL.test(lines[i])) {
                violations.push(
                    `scoped :global() at ${relPath}:${lineOffset + i + 1} — ${lines[i].trim()}`,
                );
            }
        }
    }
}

function walk(dir, ROOT, violations) {
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return;
    }
    for (const entry of entries) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === "node_modules" || entry.name === "dist") continue;
            walk(full, ROOT, violations);
        } else if (entry.isFile() && entry.name.endsWith(".vue")) {
            const rel = relative(ROOT, full).split(sep).join("/");
            scanSource(readFileSync(full, "utf8"), rel, violations);
        }
    }
}

export function detect(ROOT, ROOTS) {
    const violations = [];
    for (const root of ROOTS) walk(root, ROOT, violations);
    return { violations };
}

/** Born-RED demonstration: the synthetic survivor MUST be flagged. */
function fixtureCheck() {
    const synthetic = `<template><div /></template>
<style scoped>
:global(.dark) .synthetic-specimen { color: white; }
</style>`;
    const violations = [];
    scanSource(synthetic, "<synthetic-fixture>.vue", violations);
    const caught = violations.length === 1;
    console.log("proof:no-scoped-global — synthetic born-RED fixture check");
    console.log(`  injected one scoped :global() → detector flagged ${violations.length} (expect 1)`);
    if (caught) console.log(`  ✓ ${violations[0]}`);
    console.log(`\n  status: ${caught ? "PASS (gate has teeth)" : "FAIL (gate is toothless)"}`);
    process.exit(caught ? 0 : 1);
}

function run() {
    if (process.argv.includes("--fixture")) return fixtureCheck();

    const { ROOT, ROOTS, ARTIFACT } = cliPaths();
    const { violations } = detect(ROOT, ROOTS);
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-scoped-global",
        facts: {
            scannedRoots: ROOTS.map((r) => relative(ROOT, r)),
            violationCount: violations.length,
        },
        violations,
    });

    console.log("proof:no-scoped-global — zero `:global(` inside <style scoped> across src/ + demo/ (AZ.R5-5)");
    console.log(`  scanned roots: src/, demo/   scoped :global() survivors: ${violations.length}`);
    if (violations.length) {
        console.log("\nVIOLATIONS (the DROP trap — use the plain ancestor `.dark .x` form; see design-idioms.md §8):");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
