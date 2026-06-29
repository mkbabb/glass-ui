#!/usr/bin/env node
// proof:subpath-classify — the fail-CLOSED subpath-classification mechanism gate
// (BH.B2.1-mech).
// ============================================================================
// Locks the regen mechanism that re-derives the published-subpath surface from
// ONE explicit classification (`scripts/lib/subpath-policy.mjs`) feeding BOTH the
// vite entry map (`libraryEntryMap()`) and the generator (`scripts/regen-exports.mjs`).
//
// The binding evidence is THREE RAN cases (the self-test bite — the regen is
// spawned as a subprocess in each mode, the EXIT CODE + machine report asserted):
//   C1  real (--json)         => exit 0  AND  fail-closed PASS  AND  symbol-
//                                fidelity 0-fail  AND  EXACT_REPRODUCTION
//                                (the regen reproduces package.json exports +
//                                typesVersions with zero add/drop/mismatch).
//   C2  --inject-unclassified => exit 1  (the fail-CLOSED teeth — a synthetic
//                                BG-added dir with no classification MUST be a
//                                HARD ERROR, never a silent publish).
//   C3  --break-fidelity      => exit 1  (the fidelity teeth — a hand-mapped
//                                source that vanished MUST be flagged).
// If C2 or C3 came back exit 0, the regen is fail-OPEN and this gate REDs —
// proving the gate is not vacuous.
//
// Plus the STRUCTURAL single-source assert: the shared policy module exports the
// three classification maps + the entry-map/emit helpers, so `libraryEntries()`
// and the generator can never drift from two hand-lists.
//
// Born-RED on HEAD (the mechanism is absent → C1 cannot run → RED); GREEN once
// the policy module + generator land. Device-free (pure node subprocess).
// ============================================================================

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_SUBPATH_CLASSIFY_ARTIFACT", "BH-subpath-classify");
const REGEN = resolve(ROOT, "scripts/regen-exports.mjs");
const POLICY = resolve(ROOT, "scripts/lib/subpath-policy.mjs");

const REQUIRED_POLICY_EXPORTS = [
    // the three policy maps (the single-source classification)
    "UI_CLASS",
    "CUSTOM_CLASS",
    "COMPOSABLE_CLASS",
    // the hand-mapped source maps
    "CURATED",
    "COMPOSABLE_SUBPATHS",
    // the shared helpers feeding BOTH libraryEntries() and the generator
    "libraryEntryMap",
    "buildEntrySet",
    "emitExports",
    "classifyAll",
    "symbolFidelity",
];

/** Run the generator in a given mode; return { code, report }. */
function runRegen(flags) {
    const r = spawnSync(process.execPath, [REGEN, ...flags], { encoding: "utf8" });
    let report = null;
    if (flags.includes("--json") && r.stdout) {
        try {
            report = JSON.parse(r.stdout);
        } catch {
            report = null;
        }
    }
    return { code: r.status, report, stderr: r.stderr };
}

async function run() {
    const violations = [];
    const cases = {};

    // --- mechanism present ---
    if (!existsSync(POLICY)) violations.push("MECHANISM-ABSENT: scripts/lib/subpath-policy.mjs missing");
    if (!existsSync(REGEN)) violations.push("MECHANISM-ABSENT: scripts/regen-exports.mjs missing");

    // --- STRUCTURAL single-source assert: the policy module exports the maps + helpers ---
    let policyExports = [];
    if (existsSync(POLICY)) {
        try {
            const mod = await import(pathToFileURL(POLICY).href);
            policyExports = Object.keys(mod);
            const missing = REQUIRED_POLICY_EXPORTS.filter((k) => typeof mod[k] === "undefined");
            if (missing.length) violations.push(`POLICY-INCOMPLETE: subpath-policy.mjs missing exports [${missing.join(", ")}]`);
            // the single-source identity: libraryEntryMap + buildEntrySet derive the
            // SAME entry NAME set (the entry map and the export keys cannot diverge).
            if (typeof mod.libraryEntryMap === "function" && typeof mod.buildEntrySet === "function" && typeof mod.readTree === "function") {
                const mapNames = Object.keys(mod.libraryEntryMap()).sort();
                const entryNames = Object.keys(mod.buildEntrySet(mod.readTree()).entries).sort();
                if (JSON.stringify(mapNames) !== JSON.stringify(entryNames))
                    violations.push("SINGLE-SOURCE-DRIFT: libraryEntryMap() name set ≠ buildEntrySet() entry name set");
            }
        } catch (e) {
            violations.push(`POLICY-IMPORT-FAILED: ${e.message}`);
        }
    }

    // --- C1: real (--json) => exit 0 + classified + fidelity + EXACT_REPRODUCTION ---
    if (existsSync(REGEN)) {
        const c1 = runRegen(["--json"]);
        cases.real = { exit: c1.code, EXACT_REPRODUCTION: c1.report?.regen?.EXACT_REPRODUCTION ?? null, failClosed: c1.report?.failClosed?.pass ?? null, fidelityFailed: c1.report?.symbolFidelity?.failedCount ?? null };
        if (c1.code !== 0) violations.push(`C1-REAL: expected exit 0, got ${c1.code}`);
        if (c1.report?.failClosed?.pass !== true) violations.push("C1-REAL: fail-closed did not PASS");
        if (c1.report?.symbolFidelity?.failedCount !== 0) violations.push(`C1-REAL: symbol-fidelity failures = ${c1.report?.symbolFidelity?.failedCount}`);
        if (c1.report?.regen?.EXACT_REPRODUCTION !== true) violations.push("C1-REAL: regen does NOT reproduce package.json EXACTLY");

        // --- C2: --inject-unclassified => exit 1 (fail-closed teeth) ---
        const c2 = runRegen(["--inject-unclassified"]);
        cases.injectUnclassified = { exit: c2.code };
        if (c2.code !== 1) violations.push(`C2-INJECT: expected exit 1 (fail-closed), got ${c2.code} — the regen is fail-OPEN`);

        // --- C3: --break-fidelity => exit 1 (fidelity teeth) ---
        const c3 = runRegen(["--break-fidelity"]);
        cases.breakFidelity = { exit: c3.code };
        if (c3.code !== 1) violations.push(`C3-BREAK-FIDELITY: expected exit 1, got ${c3.code} — fidelity check has no teeth`);
    } else {
        violations.push("C1/C2/C3 NOT RUN — generator absent");
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:subpath-classify",
        facts: { policyExports: policyExports.length, requiredPolicyExports: REQUIRED_POLICY_EXPORTS.length, cases },
        violations,
    });

    console.log("proof:subpath-classify — the fail-CLOSED subpath-classification mechanism gate (BH.B2.1-mech)");
    console.log(`  policy module exports     : ${policyExports.length} (${REQUIRED_POLICY_EXPORTS.length} required)`);
    console.log(`  C1 real (--json)          : exit ${cases.real?.exit ?? "-"}  EXACT_REPRODUCTION=${cases.real?.EXACT_REPRODUCTION ?? "-"}  failClosed=${cases.real?.failClosed ?? "-"}  fidelityFailed=${cases.real?.fidelityFailed ?? "-"}`);
    console.log(`  C2 --inject-unclassified  : exit ${cases.injectUnclassified?.exit ?? "-"}  (expect 1 — fail-closed teeth)`);
    console.log(`  C3 --break-fidelity       : exit ${cases.breakFidelity?.exit ?? "-"}  (expect 1 — fidelity teeth)`);
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

export { run };
