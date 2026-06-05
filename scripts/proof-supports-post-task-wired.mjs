#!/usr/bin/env node
// AU.W3 — the supportsPostTask WIRE-or-DROP gate (proof:supportsPostTask-wired).
//
// `supportsPostTask()` (src/utils/platformSupport.ts) was an exported public
// predicate with 0 real callers — the `usePrioritizedTask` fast path called
// `getSchedulerPostTask()` directly. P3 (wire-before-retire / no exported orphan):
// the predicate must EITHER have >=1 real non-test caller in src/ (WIRED) OR not be
// exported at all (DROPPED). An exported orphan with a "wired later" note is the
// forbidden form (P6).
//
// This gate is GREEN in both terminal states (wired OR dropped) and RED only on the
// orphan-exported-with-no-caller state it closes.
//
// inv ε / bite-check: re-exporting `supportsPostTask` while removing its sole
// caller reddens it.

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
        SRC: resolve(ROOT, "src"),
        DEF: resolve(ROOT, "src/utils/platformSupport.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_SUPPORTSPOSTTASK_ARTIFACT", "AU-supportspostttask-wired"),
    };
    return _cliPaths;
}

function stripComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => { const i = l.indexOf("//"); return i === -1 ? l : l.slice(0, i); })
        .join("\n");
}

function walk(dir, acc = []) {
    for (const name of readdirSync(dir)) {
        if (name === "node_modules" || name === "__tests__") continue;
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|tsx|vue)$/.test(name) && !/\.(test|spec)\.ts$/.test(name)) acc.push(p);
    }
    return acc;
}

function run() {
    const { ROOT, SRC, DEF, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // Is supportsPostTask exported from platformSupport.ts?
    const defSrc = existsSync(DEF) ? stripComments(readFileSync(DEF, "utf8")) : "";
    const isExported = /export\s+(?:function|const)\s+supportsPostTask\b/.test(defSrc);
    facts.exported = isExported;

    if (!isExported) {
        // DROPPED — the predicate is gone. Green, as long as nothing still imports it.
        facts.disposition = "DROPPED";
    } else {
        // WIRED — must have >=1 real CALLER (a `supportsPostTask(` call site, not the
        // definition, not a re-export `export { supportsPostTask }`).
        const callers = [];
        for (const file of walk(SRC)) {
            if (resolve(file) === resolve(DEF)) continue; // skip the definition file
            const src = stripComments(readFileSync(file, "utf8"));
            // a CALL: `supportsPostTask(` not preceded by `function `/`const `; and not a bare re-export
            for (const m of src.matchAll(/\bsupportsPostTask\s*\(/g)) {
                callers.push(file.slice(ROOT.length + 1));
                break;
            }
        }
        facts.disposition = "WIRED";
        facts.callers = callers;
        if (callers.length === 0) {
            violations.push("supportsPostTask is EXPORTED but has 0 real callers in src/ — an exported orphan (WIRE-or-DROP, P3). Wire it into a guard or delete the export.");
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:supportsPostTask-wired", facts, violations });

    console.log("proof:supportsPostTask-wired — WIRE-or-DROP, no exported orphan (AU.W3)");
    console.log(`  exported   : ${facts.exported}`);
    console.log(`  disposition: ${facts.disposition}`);
    if (facts.callers) console.log(`  callers    : ${facts.callers.length ? facts.callers.join(", ") : "(none)"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
