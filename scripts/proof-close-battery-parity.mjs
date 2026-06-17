// BB.W-CLOSE-BATTERY — proof:close-battery-parity (born-RED, local-tagged meta-gate).
//
// The structural lock that makes a `--run local`-only (or `--run release`-only)
// close impossible. BA's FINAL.md §3 claimed "gates.mjs --run local green" while
// `ci ⊂ local` carried 18 reds AND the close never ran the union siblings-absent —
// the close-class lie this gate kills. It asserts, by reading the runtime gate
// manifest + source-reading the close/release path, that the FULL set (the deduped
// union local ∪ ci ∪ release) runs siblings-absent before the irreversible tag.
//
// DEVICE-FREE meta-gate (the proof-gate-manifest-sound idiom): no browser, no
// siblings. Carries the house self-test bite — a synthetic close-path string
// declaring a `--run local`-only battery MUST be flagged (un-skippable every run).
// `local`-tagged (the meta-gate precedent — gates.mjs is imported here, so this
// gate cannot itself be in the set it walks without recursion); the BB close
// promotes it per the JUSTIFIED_LOCAL_ONLY rule once its own close runs it.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gatesFor } from "./gates.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// The self-test detector — given a close-path `gates.mjs --run <mode>` invocation
// string, does it declare a NARROWED battery (a single `--run local`/`ci`/`release`
// as the close gate set) rather than the full union? Returns the violation reason
// or null. This is the falsifiable core both the live clauses and the self-test
// bite exercise.
function narrowedBattery(invocation) {
    if (invocation == null) return "close path missing — no `gates.mjs --run` invocation found";
    if (/gates\.mjs\s+--run\s+full/.test(invocation)) return null;
    const m = invocation.match(/gates\.mjs\s+--run\s+(local|ci|release)\b/);
    if (m) return `runs '--run ${m[1]}' alone, not the full union (the BA --run-local-only over-claim class)`;
    return "declares no `gates.mjs --run full` battery";
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_CLOSE_BATTERY_PARITY_ARTIFACT",
        "BB-close-battery-parity",
    );
    const violations = [];
    const facts = {};

    // ── Clause 1 — the `--run full` union mode EXISTS + is the deduped union.
    const local = gatesFor("local").map((g) => g.id);
    const ci = gatesFor("ci").map((g) => g.id);
    const release = gatesFor("release").map((g) => g.id);
    const full = gatesFor("full").map((g) => g.id);
    const unionIds = [...new Set([...local, ...ci, ...release])];
    facts.union = {
        local: local.length, ci: ci.length, release: release.length,
        full: full.length, expectedUnion: unionIds.length,
    };
    const fullSet = new Set(full);
    const missing = unionIds.filter((id) => !fullSet.has(id));
    if (full.length === 0) {
        violations.push("[clause 1] `gates.mjs --run full` is not a real mode (gatesFor('full') is empty) — mint the deduped-union mode");
    } else {
        if (missing.length) violations.push(`[clause 1] --run full omits ${missing.length} gate(s) of the local∪ci∪release union: ${missing.slice(0, 6).join(", ")}${missing.length > 6 ? "…" : ""}`);
        if (full.length !== new Set(full).size) violations.push("[clause 1] --run full has duplicate ids (the union must dedup — a row tagged in >1 set runs ONCE)");
        if (full.length !== unionIds.length) violations.push(`[clause 1] --run full has ${full.length} gates; the deduped union has ${unionIds.length}`);
    }

    // ── Clause 2 — release.sh runs the FULL union before the tag, not `--run release` alone.
    const releaseSh = read("scripts/release.sh");
    const shInvocation = releaseSh && (releaseSh.match(/scripts\/gates\.mjs\s+--run\s+\w+/)?.[0] ?? null);
    facts.releaseSh = narrowedBattery(shInvocation);
    if (facts.releaseSh) violations.push(`[clause 2] scripts/release.sh ${facts.releaseSh}`);

    // ── Clause 3 — release.yml's gate-matrix step runs `--run full`.
    const releaseYml = read(".github/workflows/release.yml");
    const ymlInvocation = releaseYml && (releaseYml.match(/gates\.mjs\s+--run\s+\w+/)?.[0] ?? null);
    facts.releaseYml = narrowedBattery(ymlInvocation);
    if (facts.releaseYml) violations.push(`[clause 3] .github/workflows/release.yml ${facts.releaseYml}`);

    // ── Clause 4 — the close-battery canon: the `proof:full` script + the CLAUDE.md rule.
    const pkg = JSON.parse(read("package.json"));
    const hasFullScript = /gates\.mjs\s+--run\s+full/.test(pkg.scripts?.["proof:full"] ?? "");
    facts.proofFullScript = hasFullScript;
    if (!hasFullScript) violations.push("[clause 4] package.json has no `proof:full` → `node scripts/gates.mjs --run full` script");
    const claude = read("CLAUDE.md") ?? "";
    const hasCanon =
        /--run full/.test(claude) &&
        /close[- ]battery|local ?∪ ?ci ?∪ ?release/i.test(claude);
    facts.claudeCanon = hasCanon;
    if (!hasCanon) violations.push("[clause 4] CLAUDE.md gate-hygiene does not record the close-battery rule (`--run full` = local∪ci∪release siblings-absent before the tag)");

    // ── Self-test bite (un-skippable) — the detector MUST flag a synthetic
    //     `--run local`-only close path AND pass a synthetic `--run full` path.
    const biteLocalOnly = narrowedBattery("node scripts/gates.mjs --run local");
    const biteFull = narrowedBattery("node scripts/gates.mjs --run full");
    facts.selfTest = { localOnlyFlagged: Boolean(biteLocalOnly), fullPasses: biteFull === null };
    if (!biteLocalOnly) violations.push("[self-test] the detector FAILED to flag a synthetic `--run local`-only close path (the bite is broken)");
    if (biteFull !== null) violations.push("[self-test] the detector wrongly flagged a synthetic `--run full` close path");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:close-battery-parity",
        facts,
        violations,
    });

    console.log("proof:close-battery-parity — the full-set close-battery lock (BB.W-CLOSE-BATTERY; born-RED → GREEN at the close-path wiring)");
    console.log(`  --run full union     : ${facts.union.full} gates (local ${facts.union.local} ∪ ci ${facts.union.ci} ∪ release ${facts.union.release} = ${facts.union.expectedUnion} deduped)`);
    console.log(`  release.sh           : ${facts.releaseSh ? "NARROWED — " + facts.releaseSh : "runs --run full"}`);
    console.log(`  release.yml          : ${facts.releaseYml ? "NARROWED — " + facts.releaseYml : "runs --run full"}`);
    console.log(`  proof:full script    : ${facts.proofFullScript ? "present" : "MISSING"}`);
    console.log(`  CLAUDE.md canon      : ${facts.claudeCanon ? "recorded" : "MISSING"}`);
    console.log(`  self-test            : local-only flagged ${facts.selfTest.localOnlyFlagged ? "✓" : "✗"} · full passes ${facts.selfTest.fullPasses ? "✓" : "✗"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

run();
