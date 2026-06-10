// proof-instrument-scope.mjs — AY.W-IC1 · reconciled at AY.W-CLOSE1
//
// Machine-locks the instrument-chassis FAMILY scope: `InstrumentChassis` RETAINED
// on binary-consumer evidence; `InstrumentRail` RETIRED-FULL (component dir + demo
// composition deleted). W-IC1's Disposition A retired the rail to demo-private (keep
// the component file + the demo story); the later USER-AUDIT-2026-06-10 C4
// "ruthless/leaner" directive (PRUNE-LEDGER R5) SUPERSEDED that to RETIRE-FULL — the
// rail had 0 binary consumers + 1 filler demo + no evidence doc, so the whole surface
// (dir + demo + subpath + public re-export) is gone. This gate is reconciled to the
// executed RETIRE-FULL reality (Arm A-FULL): the rail must be ABSENT everywhere.
// Pure-given-source: parse + fs + the shipped constellation.mjs consumer-walk
// (CONSUMERS / resolveSibling / skipSibling) — NO new scan harness.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, CONSUMERS, resolveSibling, skipSibling } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact, snapshotStamp } from "./gate-output.mjs";

const ARTIFACT = gateArtifactPath("GLASS_UI_INSTRUMENT_SCOPE_ARTIFACT", "AY-instrument-scope");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

import { execFileSync } from "node:child_process";

function grepCount(dir, substr) {
    if (!existsSync(dir)) return { count: 0, files: [] };
    let out = "";
    try {
        out = execFileSync("grep", ["-rln", "--include=*.vue", "--include=*.ts", substr, dir], {
            encoding: "utf8",
        });
    } catch {
        out = "";
    }
    const files = out.split("\n").filter(Boolean);
    return { count: files.length, files };
}

function run() {
    const violations = [];
    const facts = { skips: [] };

    // ── Clause 1 — CHASSIS-RETAINED (always asserted) ───────────────────────
    const chassisBarrel = read("src/components/custom/instrument-chassis/index.ts") ?? "";
    if (!/InstrumentChassis/.test(chassisBarrel))
        violations.push("instrument-chassis/index.ts does not re-export InstrumentChassis");
    if (!/ChassisDivider/.test(chassisBarrel))
        violations.push("instrument-chassis/index.ts does not re-export ChassisDivider");
    const pkg = read("package.json") ?? "{}";
    if (!/"\.\/instrument-chassis"/.test(pkg))
        violations.push("package.json is missing the ./instrument-chassis subpath export");

    // Binary consumer via the speedtest consumer-walk (logged skip if absent).
    const speedtest = CONSUMERS.find((c) => c.id === "speedtest");
    let chassisBinaryConsumers = 0;
    const stResolved = resolveSibling(speedtest);
    if (!stResolved.present) {
        skipSibling("proof:instrument-scope", speedtest);
        facts.skips.push("speedtest");
    } else {
        const hit = grepCount(resolve(speedtest.dir, "src"), "@mkbabb/glass-ui/instrument-chassis");
        chassisBinaryConsumers = hit.count;
        facts.chassisBinaryConsumerFiles = hit.files.map((f) => f.replace(resolve(speedtest.dir) + "/", ""));
        if (chassisBinaryConsumers < 1)
            violations.push("InstrumentChassis has 0 binary consumers — fails the retention bar");
    }
    facts.chassisBinaryConsumers = chassisBinaryConsumers;

    // ── Clause 2 — RAIL-DISPOSITION (Arm A-FULL — RETIRE-FULL) ───────────────
    // The leaner directive (PRUNE-LEDGER R5) deleted the WHOLE rail surface. The
    // binding signal: InstrumentRail must be ABSENT everywhere — no public
    // re-export, no subpath mirror, no component dir, no demo composition.
    const rootBarrel = read("src/index.ts") ?? "";
    if (/instrument-rail/.test(rootBarrel))
        violations.push(
            "InstrumentRail re-exported on the public surface (src/index.ts) — the rail is RETIRE-FULL (PRUNE-LEDGER R5)"
        );
    if (existsSync(resolve(ROOT, "src/subpaths/instrument-rail.ts")))
        violations.push("src/subpaths/instrument-rail.ts still exists (the retired subpath mirror barrel)");

    // RETIRE-FULL: the component dir must be GONE (the leaner directive, not the
    // earlier demo-private keep). A surviving dir is an incomplete retire.
    if (existsSync(resolve(ROOT, "src/components/custom/instrument-rail/index.ts")))
        violations.push(
            "src/components/custom/instrument-rail/ still exists — the rail is RETIRE-FULL (PRUNE-LEDGER R5 superseded W-IC1's demo-private keep)"
        );
    // RETIRE-FULL: the filler demo composition must be GONE too (no orphaned
    // demo-private consumer — the component it mounted is deleted).
    if (existsSync(resolve(ROOT, "demo/stories/compositions/instrument-rail.vue")))
        violations.push(
            "demo/stories/compositions/instrument-rail.vue still exists — its mounted component is RETIRE-FULL deleted; the filler story goes with it"
        );

    // package.json exports block: the orchestrator-owned shared-file delta. Record
    // (don't fail) whether it still carries the ./instrument-rail block — a
    // pending shared-file delta the orchestrator applies (package.json is not
    // agent-editable in this lane). The BINDING signal is the source surface above.
    if (/"\.\/instrument-rail"/.test(pkg)) {
        facts.packageJsonRailBlockPending = true;
        console.log(
            "[proof:instrument-scope] NOTE: package.json still carries the ./instrument-rail exports block — pending the orchestrator-owned shared-file delta (the binding source-surface removal is complete)"
        );
    }

    // ── AY.md / EXECUTION-DAG consistency — the W-IC1 row names the chosen arm ─
    const decisionDoc = "docs/tranches/AY/audit/W-IC1-scope-decision.md";
    if (!existsSync(resolve(ROOT, decisionDoc)))
        violations.push(`${decisionDoc} (the decision doc) does not exist`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:instrument-scope",
        chosenArm: "A-FULL (RETIRE-FULL InstrumentRail — PRUNE-LEDGER R5)",
        facts,
        violations,
    });

    console.log("proof:instrument-scope — the instrument-chassis family scope (CHASSIS keep · RAIL retire-FULL)");
    console.log(`  chassis binary consumers : ${facts.chassisBinaryConsumers}${facts.skips.includes("speedtest") ? " (speedtest skipped)" : ""}`);
    console.log(`  rail on public surface   : ${/instrument-rail/.test(rootBarrel) ? "YES (violation)" : "no (retired)"}`);
    console.log(`  rail subpath file        : ${existsSync(resolve(ROOT, "src/subpaths/instrument-rail.ts")) ? "present (violation)" : "deleted"}`);
    console.log(`  rail component dir        : ${existsSync(resolve(ROOT, "src/components/custom/instrument-rail/index.ts")) ? "present (violation)" : "deleted (RETIRE-FULL)"}`);
    console.log(`  rail demo composition     : ${existsSync(resolve(ROOT, "demo/stories/compositions/instrument-rail.vue")) ? "present (violation)" : "deleted (RETIRE-FULL)"}`);
    console.log(`  pkg ./instrument-rail    : ${facts.packageJsonRailBlockPending ? "pending shared-delta" : "removed"}`);
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
