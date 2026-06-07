#!/usr/bin/env node
// AW.W6 — the resolveAtoms total-function + default-roundtrip gate
// (proof:aurora-atoms-roundtrip).
//
// resolveAtoms is the ≤7-atom door over the full AuroraConfig schema. Two binding
// properties, both born-RED:
//   (1) TOTAL — a fuzz over the FULL atom-combination matrix (seed × harmony × mood
//       × medium × textureAmount × motion × zones, INCLUDING out-of-range inputs)
//       yields a valid in-range config respecting every budget.ts cap (no NaN, no
//       out-of-range field).
//   (2) DEFAULT-PRESERVING — resolveAtoms(DEFAULT_ATOMS) deep-equals
//       DEFAULT_AURORA_CONFIG (the wispy-sky default survives the new door).
//
// Mechanism: import the SOURCE atoms/presets/budget modules via the vitest/tsx
// loader (vite-node) is heavy; instead this gate runs the dedicated vitest spec
// (the same shape as proof:aurora-derive-gamut) AND writes a byte-stable artefact.
//
// bite-check: change a DEFAULT_ATOMS value so the default no longer resolves to the
// wispy-sky default → the roundtrip property REDs; OR remove a budget clamp in
// resolveAtoms so a vivid×6-zone combination overflows → the total property REDs.

import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SPEC: "tests/components/custom/aurora/atoms.test.ts",
        ARTIFACT: gateArtifactPath("GLASS_UI_AURORA_ATOMS_ROUNDTRIP_ARTIFACT", "AW-aurora-atoms-roundtrip"),
    };
    return _cliPaths;
}

function run() {
    const { ROOT, SPEC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    let testPassed = false;
    let output = "";
    try {
        output = execFileSync("npx", ["vitest", "run", SPEC], {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        });
        testPassed = true;
    } catch (err) {
        // fail-explicit: a non-zero vitest exit is a property failure (total-function
        // or default-roundtrip RED); surface its tail in the gate output.
        output = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
        testPassed = false;
    }
    facts.atomsSpecGreen = testPassed;
    if (!testPassed) {
        violations.push(
            "the resolveAtoms total-function fuzz OR the default-roundtrip deep-equal FAILED (atoms.test.ts) — resolveAtoms is not total or DEFAULT_ATOMS no longer resolves to the wispy-sky default",
        );
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aurora-atoms-roundtrip",
        facts,
        violations,
    });

    console.log("proof:aurora-atoms-roundtrip — resolveAtoms total + default-preserving (AW.W6)");
    console.log(`  atoms.test.ts green       : ${facts.atomsSpecGreen ? "yes ✓" : "NO ✗"}`);
    if (!testPassed) {
        const tail = output.split("\n").slice(-30).join("\n");
        console.log("\n--- vitest tail ---\n" + tail);
    }
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
