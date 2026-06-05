#!/usr/bin/env node
// AU.W7 — the blob-value-free + no-value-default gates (one script, two ids via
// the manifest pointing at the two npm scripts below; this file backs
// `proof:blob-value-free`). DEC-AT-2.
//
// The goo-blob + watercolor-dot are substrate-shaped, NOT value.js-coupled — the
// proof is the INJECTED `ColorResolver` seam: the blob takes a resolver, it does
// NOT reach value.js itself (value.js is the CONSUMER's choice, supplied via the
// resolver). Two-tier (P6):
//   SOURCE — neither `/goo-blob` nor `/watercolor-dot` (the component graphs)
//            imports `@mkbabb/value.js`.
//   DIST   — `dist/goo-blob.js` / `dist/watercolor-dot.js` name `@mkbabb/value.js`
//            ZERO times (the built blob carries no value.js).
//
// inv ε / bite-check: importing value.js into a blob composable reddens the SOURCE
// tier even before the dist is rebuilt.

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
        DIRS: [
            resolve(ROOT, "src/components/custom/goo-blob"),
            resolve(ROOT, "src/components/custom/watercolor-dot"),
        ],
        DIST: [resolve(ROOT, "dist/goo-blob.js"), resolve(ROOT, "dist/watercolor-dot.js")],
        ARTIFACT: gateArtifactPath("GLASS_UI_BLOB_VALUE_FREE_ARTIFACT", "AU-blob-value-free"),
    };
    return _cliPaths;
}

function stripComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ").split("\n").map((l) => { const i = l.indexOf("//"); return i === -1 ? l : l.slice(0, i); }).join("\n");
}
function walk(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const n of readdirSync(dir)) {
        if (n === "node_modules" || n === "__tests__") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|tsx|vue)$/.test(n)) acc.push(p);
    }
    return acc;
}

function vueScript(src) { let b = ""; for (const m of src.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) b += m[1] + "\n"; return b; }

function run() {
    const { ROOT, DIRS, DIST, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    // SOURCE tier
    const srcHits = [];
    for (const dir of DIRS) {
        for (const file of walk(dir)) {
            let s = readFileSync(file, "utf8");
            if (file.endsWith(".vue")) s = vueScript(s);
            if (/from\s*["']@mkbabb\/value\.js/.test(stripComments(s))) srcHits.push(file.slice(ROOT.length + 1));
        }
    }
    facts.sourceHits = srcHits;
    if (srcHits.length) violations.push(`SOURCE: blob composables import @mkbabb/value.js (${srcHits.join(", ")}) — the blob takes an INJECTED resolver, it must not reach value.js`);

    // DIST tier
    facts.dist = {};
    for (const d of DIST) {
        if (!existsSync(d)) { violations.push(`DIST: ${d.slice(ROOT.length + 1)} absent — build first`); continue; }
        const n = (readFileSync(d, "utf8").match(/@mkbabb\/value\.js/g) ?? []).length;
        facts.dist[d.slice(ROOT.length + 1)] = n;
        if (n > 0) violations.push(`DIST: ${d.slice(ROOT.length + 1)} names @mkbabb/value.js ${n}× (the built blob must be value.js-free)`);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:blob-value-free", facts, violations });

    console.log("proof:blob-value-free — the blob is substrate-shaped, not value.js-coupled (AU.W7)");
    console.log(`  SOURCE value.js imports : ${srcHits.length ? srcHits.join(", ") : "none ✓"}`);
    console.log(`  DIST value.js refs      : ${JSON.stringify(facts.dist)}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
