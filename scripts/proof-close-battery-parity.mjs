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
// siblings. `local`-tagged (the meta-gate precedent — gates.mjs is imported here, so
// this gate cannot itself be in the set it walks without recursion).
//
// BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION hardens the close-path clauses:
//   - matchAll BOTH clauses (the `.match()?.[0]` first-match bug that false-RED any
//     close path running `--run ship` BEFORE `--run full` is replaced by a matchAll
//     that collects EVERY `gates.mjs --run <mode>` invocation in the file).
//   - prefix-anchor consistently: a `scripts/gates.mjs --run X` AND a bare
//     `gates.mjs --run X` both match (the optional-prefix form), so a bare invocation
//     is never silently dropped (clause-3 read no prefix before; clause-2 required one).
//   - the per-file REQUIRED/FORBIDDEN policy: clause-2 (release.sh, the Mac ceremony
//     path) requires the FULL union; clause-3 (release.yml, the CI publish path) is
//     RATIFIED FULL-ONLY — it must NEVER demand `--run ship` (release.yml is
//     SwiftShader CI, it CANNOT paint Metal, so a `--run ship` requirement would
//     fail-close every publish). DO NOT "fix" clause-3 to require ship.
//   - clause-5 is a STRUCTURAL self-test: the gate's verdict core is spawned as a
//     SUBPROCESS over a synthetic BROKEN close-path (REDs) and a synthetic CLEAN one
//     (GREENs), the exit-code differential asserted (the proof:strict-freshness-armed
//     precedent), NOT a string-fed inline detector bite.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gatesFor } from "./gates.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SELF = fileURLToPath(import.meta.url);

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// ── The per-file close-path policy (RATIFIED — §L.0b) ───────────────────────────
// release.sh (the Mac ceremony) requires the FULL union; release.yml (the
// SwiftShader CI publish path) is FULL-ONLY and must NEVER demand `--run ship`.
//
// RATIFIED (BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION → LANDED BG.W-CUT): release.sh's
// REQUIRED set is now `["ship", "full"]` — BG.W-CUT landed the release.sh ship-block
// (Arm A, `gates.mjs --run ship`, the live-Metal ceremony BEFORE the `--run full`
// union) AND upgrades this requirement IN THE SAME cut, so a future edit dropping the
// ship-block REDs clause-2. clause-3 (release.yml) is FULL-ONLY FOREVER — a future
// agent "fixing" release.yml to run `--run ship` would fail-close every CI publish
// (no Metal in CI; the `forbidden: ["ship"]` on release.yml locks that).
const CLOSE_PATH_POLICY = {
    releaseSh: { label: "scripts/release.sh", required: ["ship", "full"], forbidden: [] },
    releaseYml: { label: ".github/workflows/release.yml", required: ["full"], forbidden: ["ship"] },
};

/**
 * Collect EVERY `gates.mjs --run <mode>` invocation in a close-path file (matchAll,
 * NOT first-match). The optional `scripts/` prefix is anchored so a bare
 * `gates.mjs --run X` is not silently dropped. Returns the list of `<mode>` tokens
 * (in source order), or `null` when the file is absent.
 *
 * @param {string|null} text
 * @returns {string[]|null}
 */
function collectRunModes(text) {
    if (text == null) return null;
    return [...text.matchAll(/(?:scripts\/)?gates\.mjs\s+--run\s+(\w+)/g)].map((m) => m[1]);
}

/**
 * The close-path verdict over a file's collected `--run` modes against its policy.
 * Returns the violation reason or `null`. The falsifiable core both the live clauses
 * and the structural self-test exercise.
 *
 * @param {string[]|null} modes the collected `--run <mode>` tokens (null = file absent)
 * @param {{label:string, required:string[], forbidden:string[]}} policy
 * @returns {string|null}
 */
function closePathVerdict(modes, policy) {
    if (modes == null) return `${policy.label}: file absent — no \`gates.mjs --run\` invocation found`;
    if (modes.length === 0)
        return `${policy.label}: no \`gates.mjs --run\` invocation found (the close path runs no gate battery)`;
    const missing = policy.required.filter((r) => !modes.includes(r));
    if (missing.length)
        return `${policy.label}: missing required --run ${missing.join("/")} (runs: ${modes.join(", ")}) — a narrowed close (the BA --run-local-only over-claim class)`;
    const present = policy.forbidden.filter((f) => modes.includes(f));
    if (present.length)
        return `${policy.label}: runs FORBIDDEN --run ${present.join("/")} (RATIFIED full-only — release.yml is SwiftShader CI and CANNOT --run ship; it would fail-close every publish)`;
    return null;
}

/**
 * Evaluate the close-battery clauses over INJECTABLE inputs (the real run reads disk;
 * the structural self-test injects synthetic hermetic inputs). PURE — no disk read, no
 * gatesFor call inside (the caller passes the union arrays). Returns `{violations, facts}`.
 *
 * @param {{
 *   union: {local:string[], ci:string[], release:string[], full:string[]},
 *   releaseShModes: string[]|null,
 *   releaseYmlModes: string[]|null,
 *   proofFullScript: boolean,
 * }} input
 */
function evaluate(input) {
    const violations = [];
    const facts = {};

    // ── Clause 1 — the `--run full` union mode EXISTS + is the deduped union.
    const { local, ci, release, full } = input.union;
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

    // ── Clause 2 — release.sh runs the FULL union (matchAll, prefix-anchored).
    facts.releaseSh = closePathVerdict(input.releaseShModes, CLOSE_PATH_POLICY.releaseSh);
    if (facts.releaseSh) violations.push(`[clause 2] ${facts.releaseSh}`);

    // ── Clause 3 — release.yml runs `--run full` ONLY (RATIFIED — never ship).
    facts.releaseYml = closePathVerdict(input.releaseYmlModes, CLOSE_PATH_POLICY.releaseYml);
    if (facts.releaseYml) violations.push(`[clause 3] ${facts.releaseYml}`);

    // ── Clause 4 — the close-battery canon: the `proof:full` script exists.
    // (BH.B5e: the doc-presence `claudeCanon` sub-check DROPPED — the functional
    // `proof:full` script assert is kept; canon-home authoring rides proof:claude-deletable.)
    facts.proofFullScript = input.proofFullScript;
    if (!input.proofFullScript) violations.push("[clause 4] package.json has no `proof:full` → `node scripts/gates.mjs --run full` script");

    return { violations, facts };
}

/** Build the real-tree input (disk + gatesFor). */
function realInput() {
    const pkg = JSON.parse(read("package.json"));
    return {
        union: {
            local: gatesFor("local").map((g) => g.id),
            ci: gatesFor("ci").map((g) => g.id),
            release: gatesFor("release").map((g) => g.id),
            full: gatesFor("full").map((g) => g.id),
        },
        releaseShModes: collectRunModes(read("scripts/release.sh")),
        releaseYmlModes: collectRunModes(read(".github/workflows/release.yml")),
        proofFullScript: /gates\.mjs\s+--run\s+full/.test(pkg.scripts?.["proof:full"] ?? ""),
    };
}

// ── The `--selftest <broken|clean>` verdict CORE (clause-5 subprocess target) ───────
// A HERMETIC synthetic close-path (no disk read of the real tree) — the CLEAN fixture
// satisfies every clause; the BROKEN fixture narrows release.sh to `--run local`. The
// gate's `evaluate` runs over it and exits 0/1, so clause-5 can assert the differential
// as a real subprocess (the proof:strict-freshness-armed precedent), NOT a string bite.
function syntheticInput(kind) {
    const union = { local: ["a", "b"], ci: ["a"], release: ["b"], full: ["a", "b"] };
    const base = {
        union,
        releaseShModes: ["ship", "full"],
        releaseYmlModes: ["full"],
        proofFullScript: true,
    };
    if (kind === "clean") return base;
    // broken: narrow release.sh to a single `--run local` (the over-claim class).
    return { ...base, releaseShModes: ["local"] };
}

function runSelfTestCli(kind) {
    if (kind !== "broken" && kind !== "clean") {
        console.error("usage: proof-close-battery-parity.mjs --selftest <broken|clean>");
        process.exit(2);
    }
    const { violations } = evaluate(syntheticInput(kind));
    if (violations.length) {
        console.error(`[--selftest ${kind}] ${violations.length} violation(s):`);
        for (const v of violations) console.error(`  x ${v}`);
    } else {
        console.log(`[--selftest ${kind}] clean — every clause passes`);
    }
    process.exit(violations.length ? 1 : 0);
}

function spawnSelfTest(kind) {
    const res = spawnSync(process.execPath, [SELF, "--selftest", kind], {
        cwd: ROOT,
        encoding: "utf8",
        env: { ...process.env },
    });
    return { status: res.status ?? 1, out: `${res.stdout ?? ""}\n${res.stderr ?? ""}` };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_CLOSE_BATTERY_PARITY_ARTIFACT",
        "BB-close-battery-parity",
    );
    const { violations, facts } = evaluate(realInput());

    // ── Clause 5 — the STRUCTURAL self-test (subprocess differential, un-skippable).
    //    A synthetic BROKEN close-path MUST RED (exit 1) and a synthetic CLEAN one MUST
    //    GREEN (exit 0), proven as real subprocesses. If the differential collapses, the
    //    detector mechanism is broken — RED naming clause-5.
    const broken = spawnSelfTest("broken");
    const clean = spawnSelfTest("clean");
    facts.selfTest = {
        brokenExit: broken.status,
        cleanExit: clean.status,
        brokenNamesClause2: /\[clause 2\]/.test(broken.out),
    };
    if (broken.status !== 1)
        violations.push(`[clause 5] the synthetic BROKEN close-path subprocess exited ${broken.status} (expect 1) — the detector failed to RED a narrowed close`);
    if (clean.status !== 0)
        violations.push(`[clause 5] the synthetic CLEAN close-path subprocess exited ${clean.status} (expect 0) — the detector wrongly RED a valid close (the differential is meaningless)`);
    if (broken.status === 1 && !facts.selfTest.brokenNamesClause2)
        violations.push("[clause 5] the BROKEN subprocess RED for the wrong reason (did not name [clause 2] — the narrowed-release.sh violation)");

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:close-battery-parity",
        facts,
        violations,
    });

    console.log("proof:close-battery-parity — the full-set close-battery lock (BB.W-CLOSE-BATTERY + BG.W-SHIP-DISCIPLINE matchAll/RATIFIED/structural-self-test)");
    console.log(`  --run full union     : ${facts.union.full} gates (local ${facts.union.local} ∪ ci ${facts.union.ci} ∪ release ${facts.union.release} = ${facts.union.expectedUnion} deduped)`);
    console.log(`  release.sh           : ${facts.releaseSh ? "NARROWED — " + facts.releaseSh : "runs --run full (RATIFIED: BG.W-CUT adds --run ship)"}`);
    console.log(`  release.yml          : ${facts.releaseYml ? "NARROWED — " + facts.releaseYml : "runs --run full (RATIFIED full-only, no ship)"}`);
    console.log(`  proof:full script    : ${facts.proofFullScript ? "present" : "MISSING"}`);
    console.log(`  self-test (subproc)  : broken exit ${facts.selfTest.brokenExit} (expect 1) · clean exit ${facts.selfTest.cleanExit} (expect 0) · broken names [clause 2] ${facts.selfTest.brokenNamesClause2 ? "✓" : "✗"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

// CLI dispatch: `--selftest <broken|clean>` is the verdict CORE clause-5 spawns (it
// runs ONLY evaluate, never clause-5 — no recursion). The bare run is the gate.
const arg = process.argv[2];
if (arg === "--selftest") runSelfTestCli(process.argv[3]);
else run();
