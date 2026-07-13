#!/usr/bin/env node
// AV.W3 — the motion-value-free seam gate (proof:motion-value-free).
//
// The W3-lifted/adopted motion composables consume the keyframes LIGHT tier
// ONLY (`NumericAnimation`/`SpringProgress`/`ElementMorph` — value.js-free) and
// NEVER a value.js edge or a HEAVY keyframes import (`loadAnimationEngine` /
// `animate` / `CSSKeyframesAnimation`), which cross the `./engine` boundary and
// pull value.js into the static graph. Sibling of proof:blob-value-free.
//
// Bite: import value.js (or `loadAnimationEngine`/`animate`/
// `CSSKeyframesAnimation`) into one of the guarded files → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        // The W3-touched motion composables — the lift (useCountup), the
        // dependency-free directive (vReveal), and the hand-rolled stagger.
        // useStaggerReveal stays hand-rolled (the D1 BOOK), so it must stay
        // value.js-free. `useStagger.ts` was MOVED to the speedtest owner at AV.W17
        // (zero genuine glass-ui consumer — see proof:speedtest-boundary), so it is
        // no longer a glass-ui-guarded file. `useLayerTransition.ts` is
        // DEFINITION-ABSENT (BI.W-DOCK-CROSSFADE — its FLIP folded to the
        // `<DockCrossfade>` opacity overlap; there is no file to guard).
        FILES: [
            "src/composables/motion/useCountup.ts",
            "src/composables/motion/vReveal.ts",
            "src/composables/motion/useStaggerReveal.ts",
        ].map((p) => resolve(ROOT, p)),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_AV_W3_MOTION_VALUE_FREE_ARTIFACT",
            "AV-w3-motion-value-free",
        ),
    };
    return _cliPaths;
}

function stripComments(t) {
    return t
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .split("\n")
        .map((l) => {
            const i = l.indexOf("//");
            return i === -1 ? l : l.slice(0, i);
        })
        .join("\n");
}

// The HEAVY keyframes edges that pull value.js across the `./engine` boundary.
const HEAVY_EDGES = [
    /\bloadAnimationEngine\b/,
    /\bCSSKeyframesAnimation\b/,
    // `animate` as a named keyframes import (the HEAVY orchestrator) — match the
    // import specifier, not an arbitrary `animate` identifier.
    /\bimport\s*\{[^}]*\banimate\b[^}]*\}\s*from\s*["']@mkbabb\/keyframes\.js/,
];
const VALUE_JS = /from\s*["']@mkbabb\/value\.js/;

function run() {
    const { ROOT, FILES, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = { filesChecked: 0, missing: [] };

    for (const file of FILES) {
        const rel = file.slice(ROOT.length + 1);
        if (!existsSync(file)) {
            facts.missing.push(rel);
            violations.push(`guarded file absent: ${rel}`);
            continue;
        }
        facts.filesChecked++;
        const src = stripComments(readFileSync(file, "utf8"));
        if (VALUE_JS.test(src)) {
            violations.push(`${rel} imports @mkbabb/value.js (the LIGHT seam forbids the value.js edge)`);
        }
        for (const edge of HEAVY_EDGES) {
            if (edge.test(src)) {
                violations.push(`${rel} reaches a HEAVY keyframes edge (${edge.source}) — LIGHT tier only`);
            }
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:motion-value-free",
        facts,
        violations,
    });

    console.log("proof:motion-value-free — the W3 motion lift consumes the keyframes LIGHT tier only (AV.W3)");
    console.log(`  files checked : ${facts.filesChecked}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    } else {
        console.log("  value.js / HEAVY-edge imports : none ✓");
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
