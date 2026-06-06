#!/usr/bin/env node
// AU.W5 — the single-color-core gate (proof:single-color-core).
//
// inv-AT-color / inv-K-2: ONE runtime-JS color source — value.js's Ottosson
// primitives. glass-ui's `/color` leaf + aurora COMPOSE those primitives; they do
// NOT re-implement the OKLab/OKLCh/sRGB math. This gate asserts no glass-ui source
// re-DEFINES a value.js color primitive (a 2nd hand-rolled math path is the drift
// this closes — orthogonal to `proof:color-acyclic`, which catches a CYCLE: this
// catches acyclic-but-DUPLICATED). The CSS token tier is EXEMPT by construction —
// the gate scans `.ts`/`.vue` (runtime JS), never `.css`, so `color-mix()`/
// `oklch()` in tokens.css/theme.css are untouched (they ARE the SOTA token engine,
// guarded to STAY native).
//
// inv ε / bite-check: re-defining `srgbToOKLab` (or any guarded primitive) as a
// local `function`/`const` anywhere in non-test src/ reddens it. Asserts the
// equivalence canary exists (the value.js-agreement drift guard).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

// The value.js color primitives glass-ui must IMPORT, never re-define.
const PRIMITIVES = [
    "srgbToOKLab", "oklabToLinearSRGB", "oklabToRgb255", "rawOklabToOklch",
    "rawOklchToOklab", "gamutMapOKLab", "isInSRGBGamut", "oklabToOklch",
    "oklchToOklab", "linearToSRGB", "srgbToLinear",
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SRC: resolve(ROOT, "src"),
        CANARY: resolve(ROOT, "tests/components/custom/aurora/color-equivalence.test.ts"),
        ARTIFACT: gateArtifactPath("GLASS_UI_SINGLE_COLOR_CORE_ARTIFACT", "AU-single-color-core"),
    };
    return _cliPaths;
}

function stripComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ").split("\n").map((l) => { const i = l.indexOf("//"); return i === -1 ? l : l.slice(0, i); }).join("\n");
}

function walk(dir, acc = []) {
    for (const n of readdirSync(dir)) {
        if (n === "node_modules") continue;
        const p = join(dir, n);
        const st = statSync(p);
        if (st.isDirectory()) walk(p, acc);
        else if (/\.(ts|tsx|vue)$/.test(n) && !/\.(test|spec)\.ts$/.test(n) && !p.includes("__tests__")) acc.push(p);
    }
    return acc;
}

function run() {
    const { ROOT, SRC, CANARY, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = { redefinitions: [] };

    const defRe = new RegExp(`(?:export\\s+)?(?:async\\s+)?(?:function|const|let|var)\\s+(${PRIMITIVES.join("|")})\\b`);
    for (const file of walk(SRC)) {
        const src = stripComments(readFileSync(file, "utf8"));
        for (const line of src.split("\n")) {
            const m = line.match(defRe);
            if (m) {
                facts.redefinitions.push(`${file.slice(ROOT.length + 1)}: redefines ${m[1]}`);
                violations.push(`${file.slice(ROOT.length + 1)} re-DEFINES the value.js primitive "${m[1]}" — there must be ONE color core (value.js); import it, do not re-implement (inv-AT-color)`);
            }
        }
    }

    // the equivalence canary must exist (the value.js-agreement drift guard).
    facts.canary = existsSync(CANARY);
    if (!facts.canary) {
        violations.push("the color-equivalence canary (tests/components/custom/aurora/color-equivalence.test.ts) is absent — the value.js-agreement drift guard is gone");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:single-color-core", facts, violations });

    console.log("proof:single-color-core — ONE runtime-JS color source (value.js); token tier exempt (AU.W5)");
    console.log(`  guarded primitives   : ${PRIMITIVES.length}`);
    console.log(`  re-definitions found : ${facts.redefinitions.length}`);
    console.log(`  equivalence canary   : ${facts.canary ? "present ✓" : "ABSENT"}`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
