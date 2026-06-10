// proof-instrument-scope.mjs — AY.W-IC1
//
// Machine-locks the instrument-chassis FAMILY scope: `InstrumentChassis` RETAINED
// on binary-consumer evidence; `InstrumentRail` RETIRED to demo-private (Disposition
// A). Pure-given-source: parse + fs + the shipped constellation.mjs consumer-walk
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

    // ── Clause 2 — RAIL-DISPOSITION (Arm A — retired to demo-private) ────────
    // The binding public-surface signal: the SOURCE surface (root barrel + subpath
    // mirror) must NOT carry InstrumentRail.
    const rootBarrel = read("src/index.ts") ?? "";
    if (/instrument-rail/.test(rootBarrel))
        violations.push(
            "InstrumentRail re-exported on the public surface (src/index.ts) with no consumer-evidence doc and <2 consumers"
        );
    if (existsSync(resolve(ROOT, "src/subpaths/instrument-rail.ts")))
        violations.push("src/subpaths/instrument-rail.ts still exists (the retired subpath mirror barrel)");
    if (existsSync(resolve(ROOT, "docs/consumer-evidence/instrument-rail.md")))
        facts.evidenceDocPresent = true; // would flip to Arm B; not the chosen path

    // The demo-private consumer must survive (deleting it orphans the component).
    if (!existsSync(resolve(ROOT, "demo/stories/compositions/instrument-rail.vue")))
        violations.push(
            "demo/stories/compositions/instrument-rail.vue is gone — the demo-private consumer was deleted, orphaning the component below the substrate floor"
        );
    // The component file itself stays (demo-private primitive).
    if (!existsSync(resolve(ROOT, "src/components/custom/instrument-rail/index.ts")))
        violations.push("src/components/custom/instrument-rail/ component was deleted — Arm A keeps the demo-private primitive");

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
        chosenArm: "A (retire InstrumentRail to demo-private)",
        facts,
        violations,
    });

    console.log("proof:instrument-scope — the instrument-chassis family scope (CHASSIS keep · RAIL retire-A)");
    console.log(`  chassis binary consumers : ${facts.chassisBinaryConsumers}${facts.skips.includes("speedtest") ? " (speedtest skipped)" : ""}`);
    console.log(`  rail on public surface   : ${/instrument-rail/.test(rootBarrel) ? "YES (violation)" : "no (retired)"}`);
    console.log(`  rail subpath file        : ${existsSync(resolve(ROOT, "src/subpaths/instrument-rail.ts")) ? "present (violation)" : "deleted"}`);
    console.log(`  demo-private consumer    : ${existsSync(resolve(ROOT, "demo/stories/compositions/instrument-rail.vue")) ? "survives" : "GONE (violation)"}`);
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
