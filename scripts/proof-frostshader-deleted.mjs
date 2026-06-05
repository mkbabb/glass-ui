#!/usr/bin/env node
// AU.W6 — the frostShader-deleted no-legacy gate (proof:frostShader-deleted).
//
// `frostShader.ts` was a zero-consumer orphan under `glass/webgl/`. AU deletes it
// (P1 — no legacy: deleted, not deprecated, not behind a flag). The gate is
// FILE-ABSENCE + an IMPORT-GRAPH check — NOT a name-grep:
//
//   a `rg frostShader src/ = 0` is born-GREEN at HEAD WHILE the orphan still
//   exists (the file's own body cites the literal `frostShader` zero times, and
//   nothing imports it) — so the name-grep form is born-green on the unfixed
//   state, which violates P6/inv-ε. It is REJECTED for this gate.
//
// The gate REDDENS on the unfixed state (the orphan present) and greens only once
// the file is gone AND no module resolves `glass/webgl/frostShader`.
//
// inv ε / bite-check: restoring the orphan file reddens the file-absence clause;
// re-adding `import … "glass/webgl/frostShader"` anywhere reddens the import clause.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        ORPHAN: resolve(ROOT, "src/composables/glass/webgl/frostShader.ts"),
        SRC: resolve(ROOT, "src"),
        ARTIFACT: gateArtifactPath("GLASS_UI_FROSTSHADER_DELETED_ARTIFACT", "AU-frostshader-deleted"),
    };
    return _cliPaths;
}

function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|tsx|vue|mjs)$/.test(n)) acc.push(p);
    }
    return acc;
}

function run() {
    const { ROOT, ORPHAN, SRC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // (1) FILE-ABSENCE
    facts.filePresent = existsSync(ORPHAN);
    if (facts.filePresent) {
        violations.push(`the orphan ${ORPHAN.slice(ROOT.length + 1)} still exists — DELETE it (P1, no legacy)`);
    }

    // (2) IMPORT-GRAPH — no module resolves `glass/webgl/frostShader`
    const importers = [];
    const importRe = /from\s*["'][^"']*glass\/webgl\/frostShader["']|import\(\s*["'][^"']*glass\/webgl\/frostShader["']/;
    for (const file of walk(SRC)) {
        if (importRe.test(readFileSync(file, "utf8"))) importers.push(file.slice(ROOT.length + 1));
    }
    facts.importers = importers;
    if (importers.length) {
        violations.push(`a module still resolves glass/webgl/frostShader: ${importers.join(", ")}`);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:frostShader-deleted", facts, violations });

    console.log("proof:frostShader-deleted — the orphan is gone (file-absence + import-graph; AU.W6)");
    console.log(`  file present : ${facts.filePresent}`);
    console.log(`  importers    : ${importers.length ? importers.join(", ") : "(none)"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
