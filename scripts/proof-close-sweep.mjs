// BG.W-CLOSE-SWEEP — proof:close-sweep (born-RED, local-tagged armed witness).
//
// THE DISEASE. "A wave greens its OWN gate while leaving a SHARED close gate RED."
// It re-mints with DIFFERENT artifacts every batch: 12 reds at ff0933a3 → a SYNTH
// cured all 12 → WS3/WS4 re-seeded 4 NEW (R1–R4) → subsequent live-fix commits
// landed WITHOUT re-checking the close. A hand-picked red-list is STRUCTURALLY
// brittle (the 12→4→? re-mint proves it). The cure is a STANDING per-band sweep
// enrolling the whole CLASS via a manifest flag — a future close-disease gate is a
// member the moment it registers `closeDisease: true`, not when a human remembers
// to add it to a list.
//
// THE MECHANISM (two legs, one witness):
//   1. SWEEP_SET  = GATES.filter(g => g.closeDisease === true)  — DERIVED, not a
//      hand-list. SWEEP_SET_FAST excludes the sole 112s close-only member
//      (`gate-manifest-sound`, `closeDiseaseSlow: true`).
//   2. `gates.mjs --run sweep`/`--run sweep-fast` is a spawn-ALL dispatch (it names
//      EVERY red, NOT runMode's fail-fast-at-the-first) that delegates to this
//      gate's `--sweep`/`--sweep-fast` mode — ONE sweep implementation, no fork.
//
// THE DUAL-SIGNAL VERDICT (both legs empirically necessary):
//   - the EXIT leg (spawnSync status): catches `gen-ci-fresh`, which writes NO
//     `.cache/gates/*.json` and signals ONLY via `process.exit(1)`.
//   - the JSON leg (the `.cache/gates/<cacheName>.json` `status`): catches a future
//     exit-0-on-fail regression the exit leg alone would miss.
//   The DEFECT-A/B fix (the P-SWEEP crit): each member's artifact is UNLINKED
//   before its spawn and read ONLY AFTER (never a persisted/stale JSON — the exact
//   R6-PERSISTED staleness that false-reds gate-manifest-sound). Absent JSON after
//   a run ⇒ exit-leg-only + a recorded `jsonMissing` note, never a silent degrade.
//
// THE COMPLETENESS FLOOR (honest half-structural — CRIT-1 resolve-(b)). This is a
// HAND-AUDITED registry MADE VISIBLE, not a self-completing derivation. 5 tight
// BOOKKEEPING_SIGNATURES net the close-disease class; every gate matching ≥1
// signature MUST carry an EXPLICIT `closeDisease` decision (true=member, or
// false + `closeDiseaseReason`=opt-out). A signature-match with `closeDisease`
// UNSET reds (the forgot-the-flag catch). The residual — a bookkeeping gate that
// matches NONE of the 5 signatures — is SURFACED as a fact (`completenessResidual`),
// never silently claimed complete: the signatures are the net, the hand-audit owns
// the tail the net cannot infer from source.
//
// BORN-RED anchored to R1–R4 (the live sweep reds at HEAD). It is the THIRD
// born-RED-by-design gate beside `proof:ba-gestalt` + `proof:ship-attestation` —
// DO NOT "fix" it mid-tranche: it GREENs at the close when R1–R4 clear AND the
// gates.mjs dispatch/flags + the canon + the commit-hook arm all land. `["local"]`
// (a ci tag would re-seed R3 — a ci-tagged gate needs ci.yml re-emission, a circular
// re-seed) so it never blocks headless CI; it rides `--run full` (local ∈ the union).
//
// DEVICE-FREE (imports GATES; it cannot be a swept member without recursion). The
// 9-bite `--selftest` is HERMETIC — synthetic fixtures, independent of the live
// manifest — so it proves the mechanism even while the live run is born-RED.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GATES } from "./gates.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SELF = fileURLToPath(import.meta.url);
const CACHE_DIR = resolve(ROOT, ".cache/gates");

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// ── The robust line-based JS comment strip (the executed-read detector floor) ────
// Block-mode is entered ONLY on a line whose trim START is `/*`, so a regex literal
// or a message string that contains `/*` NEVER swallows real code (the naive
// /\/\*[\s\S]*?\*\// strip eats a `/\/\*/`-bearing gate whole — verified on
// gate-manifest-sound/storybook-complete). Trailing `//` comments are trimmed. A
// signature then matches an EXECUTED read, not a `//`-comment mention of the path.
export function stripJs(src) {
    const out = [];
    let inBlock = false;
    for (const line of src.split("\n")) {
        const t = line.trim();
        if (inBlock) {
            if (t.includes("*/")) inBlock = false;
            continue;
        }
        if (t.startsWith("/*")) {
            if (!t.includes("*/")) inBlock = true;
            continue;
        }
        if (t.startsWith("//")) continue;
        out.push(line.replace(/\/\/.*$/, ""));
    }
    return out.join("\n");
}

// ── The 5 BOOKKEEPING_SIGNATURES (the close-disease completeness net) ────────────
// Each is anchored to an EXECUTED read of a SHARED registration/cascade-bookkeeping
// artifact a wave-diff can clobber — the class defining property. The set covers
// every one of the 8 members with a small, human-decided false-include tail.
export const BOOKKEEPING_SIGNATURES = {
    // The gate MANIFEST — imports the gatesFor/GATES registry (tag↔aggregate,
    // cmd↔script, the union). tag-parity · gate-manifest-sound · gate-script-parity
    // · close-battery-parity · gen-ci-fresh.
    GATE_REGISTRATION: (s) => /from\s+["']\.\/gates\.mjs["']/.test(s),
    // The CI/RELEASE WORKFLOW — renders or reads .github/workflows/{ci,release}.yml
    // (an EXECUTED renderCiYaml() call / readFileSync of the workflow path, NOT a
    // message-string mention). gen-ci-fresh · close-battery-parity.
    CI_WORKFLOW: (s) => /renderCiYaml\(|readFileSync\([^)]*workflows\/(?:ci|release)\.yml/.test(s),
    // The god-module LINE BUDGET — the cross-file RATCHET_BASELINES ledger. A wave
    // that re-grows a carved file past 500 clobbers it. no-god-module.
    RATCHET_BUDGET: (s) => /RATCHET_BASELINES\b/.test(s),
    // The token DEAD-SET — the declared-but-unread `--*` cascade + KEEP_ALLOWLIST. A
    // token-band wave leaves a dead byte. no-dead-token.
    TOKEN_DEADSET: (s) => /KEEP_ALLOWLIST/.test(s),
    // The public EXPORT-SURFACE ↔ story completeness — reads src/index.ts AND walks
    // demo/stories (the fleet registration loop). storybook-complete.
    EXPORT_SURFACE: (s) => /src\/index\.ts/.test(s) && /demo\/stories/.test(s),
};

/** The bookkeeping signatures a gate's (comment-stripped) source matches. */
export function matchSignatures(src) {
    const clean = stripJs(src);
    return Object.entries(BOOKKEEPING_SIGNATURES)
        .filter(([, fn]) => fn(clean))
        .map(([k]) => k);
}

/** Resolve a manifest row's `cmd` to its `scripts/proof-*.mjs` file (or null). */
function resolveScript(cmd, pkg) {
    const scriptLine = pkg.scripts?.[cmd];
    if (!scriptLine) return null;
    const m = scriptLine.match(/scripts\/(proof-[\w.-]+\.mjs)/);
    if (!m) return null;
    const p = resolve(ROOT, "scripts", m[1]);
    return existsSync(p) ? p : null;
}

/** Parse a gate script's `gateArtifactPath("ENV", "cache")` call → {env, cache}. */
export function parseArtifactCall(src) {
    const clean = stripJs(src);
    // gateArtifactPath("ENV", "cache")  — one-line or wrapped over ≤3 lines.
    const m = clean.match(
        /gateArtifactPath\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/,
    );
    return m ? { env: m[1], cache: m[2] } : null;
}

// ── The dual-signal per-member verdict ──────────────────────────────────────────
/**
 * A swept member is RED iff its process exited non-zero OR (a JSON artifact exists
 * AND its `status` is not "pass"). A member with NO artifact after its run is
 * exit-leg-only (gen-ci-fresh) — never a silent single-signal degrade.
 * @param {{exit:number, jsonStatus:string|null}} r
 * @returns {boolean} red
 */
export function sweepVerdict(r) {
    if (r.exit !== 0) return true;
    if (r.jsonStatus != null && r.jsonStatus !== "pass") return true;
    return false;
}

/** SWEEP_SET (all closeDisease members) + SWEEP_SET_FAST (minus the slow member). */
export function deriveSweepSet(gates) {
    const members = gates.filter((g) => g.closeDisease === true);
    const fast = members.filter((g) => g.closeDiseaseSlow !== true);
    return { members, fast };
}

/**
 * Run a sweep: spawn each member node-direct (unlink-its-artifact-before, read-
 * after — the DEFECT-A/B stale-JSON fix), dual-signal each, name EVERY red. This
 * is the `--run sweep`/`--sweep` body AND the gate's born-RED anchor arm.
 * @param {{id:string, script:string|null, cache:string|null}[]} members
 * @returns {{results:object[], reds:string[]}}
 */
function runSweep(members) {
    const results = [];
    const reds = [];
    for (const m of members) {
        if (!m.script) {
            results.push({ id: m.id, exit: 2, jsonStatus: null, note: "script absent" });
            reds.push(`${m.id} (script absent)`);
            continue;
        }
        const artifact = m.cache ? resolve(CACHE_DIR, `${m.cache}.json`) : null;
        // Unlink the stale artifact so the JSON leg reads ONLY this run's write.
        if (artifact && existsSync(artifact)) {
            try {
                unlinkSync(artifact);
            } catch {
                /* fail-explicit: a locked artifact degrades to exit-leg-only below */
            }
        }
        const proc = spawnSync(process.execPath, [m.script], {
            cwd: ROOT,
            encoding: "utf8",
            env: { ...process.env },
        });
        const exit = proc.status ?? 1;
        let jsonStatus = null;
        let jsonMissing = false;
        if (artifact) {
            if (existsSync(artifact)) {
                try {
                    jsonStatus = JSON.parse(readFileSync(artifact, "utf8")).status ?? null;
                } catch {
                    jsonStatus = null;
                }
            } else {
                jsonMissing = true;
            }
        }
        const r = { id: m.id, exit, jsonStatus, jsonMissing };
        results.push(r);
        if (sweepVerdict(r)) {
            reds.push(`${m.id} (exit ${exit}${jsonStatus ? `, json ${jsonStatus}` : ""})`);
        }
    }
    return { results, reds };
}

// ── The PURE clause evaluator (the `--selftest` core; no disk read inside) ───────
/**
 * @param {{
 *   dispatchSweep: boolean, dispatchSweepFast: boolean,
 *   gates: {id:string, closeDisease?:boolean, closeDiseaseReason?:string,
 *           closeDiseaseArtifact?:string, closeDiseaseArtifactEnv?:string,
 *           closeDiseaseSlow?:boolean, _sigs:string[], _srcArtifact:object|null}[],
 *   canonHasSweep: boolean,
 *   commitHookLedgerArm: boolean, commitHookSweepArm: boolean,
 * }} input
 */
export function evaluate(input) {
    const violations = [];
    const facts = {};

    // ── C1 — the spawn-ALL `--run sweep`/`--run sweep-fast` dispatch exists.
    facts.dispatch = { sweep: input.dispatchSweep, sweepFast: input.dispatchSweepFast };
    if (!input.dispatchSweep)
        violations.push("[C1] gates.mjs has no `--run sweep` dispatch (the spawn-all names-all-reds sweep — NOT runMode's fail-fast)");
    if (!input.dispatchSweepFast)
        violations.push("[C1] gates.mjs has no `--run sweep-fast` dispatch (the 7-member sub-second arm the commit-hook runs)");

    // ── C2 — SWEEP_SET DERIVED + the completeness floor (forward + inverse).
    const { members, fast } = deriveSweepSet(input.gates);
    facts.sweepSet = { members: members.map((g) => g.id), fast: fast.length };
    if (members.length === 0)
        violations.push("[C2] SWEEP_SET is EMPTY — no manifest row carries `closeDisease: true` (the sweep is un-armed; the flags are owed)");
    // forward: every flagged member must match ≥1 bookkeeping signature.
    for (const g of members) {
        if (!g._sigs || g._sigs.length === 0)
            violations.push(`[C2] ${g.id} carries closeDisease:true but matches NO bookkeeping signature (a mis-flag — the flag must sit on a real close-disease gate)`);
    }
    // inverse: every signature-match must carry an EXPLICIT closeDisease decision.
    const candidates = input.gates.filter((g) => g._sigs && g._sigs.length > 0);
    facts.candidates = candidates.length;
    for (const g of candidates) {
        if (typeof g.closeDisease !== "boolean")
            violations.push(`[C2] ${g.id} matches ${g._sigs.join("/")} but carries no explicit closeDisease decision — DECIDE it (closeDisease:true member, or false + closeDiseaseReason opt-out)`);
        else if (g.closeDisease === false && !(g.closeDiseaseReason ?? "").trim())
            violations.push(`[C2] ${g.id} opts out (closeDisease:false) with no closeDiseaseReason — the opt-out must carry a rationale`);
    }

    // ── C3 — the close-disease-sweep canon (parent-tracked build-and-gates.md).
    facts.canonHasSweep = input.canonHasSweep;
    if (!input.canonHasSweep)
        violations.push("[C3] docs/canon/build-and-gates.md does not record the close-disease-sweep canon (the parent-tracked resolver home — a fresh /tmp worktree does not recurse the docs/precepts submodule)");

    // ── C4 — the commit-msg hook carries BOTH the B0 ledger arm AND the sweep arm.
    facts.commitHook = { ledgerArm: input.commitHookLedgerArm, sweepArm: input.commitHookSweepArm };
    if (!input.commitHookLedgerArm)
        violations.push("[C4] .githooks/commit-msg dropped the BH.B0 live-verified-ledger arm (the sweep arm APPENDS, it must not clobber)");
    if (!input.commitHookSweepArm)
        violations.push("[C4] .githooks/commit-msg has no env-gated sweep-fast arm (under the SAME GLASS_UI_ACTIVE_TRANCHE gate as the ledger arm)");

    // ── C5 — PATH-MATCH: each member's declared artifact ≡ its source's actual call.
    facts.pathMatch = [];
    for (const g of members) {
        const declared = g.closeDiseaseArtifact
            ? { env: g.closeDiseaseArtifactEnv, cache: g.closeDiseaseArtifact }
            : null;
        const src = g._srcArtifact;
        if (declared == null) {
            // exit-leg-only member (gen-ci-fresh): source writes no artifact.
            if (src != null)
                violations.push(`[C5] ${g.id} declares no closeDiseaseArtifact but its source WRITES ${src.cache} — declare it (cacheName + env) or the JSON leg goes blind`);
            facts.pathMatch.push({ id: g.id, mode: "exit-only" });
            continue;
        }
        if (src == null) {
            violations.push(`[C5] ${g.id} declares closeDiseaseArtifact "${declared.cache}" but its source has no gateArtifactPath() call (a phantom artifact)`);
        } else if (declared.cache !== src.cache || declared.env !== src.env) {
            violations.push(`[C5] ${g.id} artifact DRIFT — manifest declares (${declared.env}, ${declared.cache}) but source writes (${src.env}, ${src.cache})`);
        }
        facts.pathMatch.push({ id: g.id, mode: "json", declared, src });
    }

    return { violations, facts };
}

// ── The real-tree input builder (disk + GATES) ──────────────────────────────────
function realInput() {
    const gatesSrc = read("scripts/gates.mjs") ?? "";
    const canon = read("docs/canon/build-and-gates.md") ?? "";
    const hook = read(".githooks/commit-msg") ?? "";
    const pkg = JSON.parse(read("package.json") ?? "{}");

    const gates = GATES.map((g) => {
        const script = resolveScript(g.cmd, pkg);
        const src = script ? readFileSync(script, "utf8") : "";
        return {
            id: g.id,
            closeDisease: g.closeDisease,
            closeDiseaseReason: g.closeDiseaseReason,
            closeDiseaseArtifact: g.closeDiseaseArtifact,
            closeDiseaseArtifactEnv: g.closeDiseaseArtifactEnv,
            closeDiseaseSlow: g.closeDiseaseSlow,
            _script: script,
            _sigs: script ? matchSignatures(src) : [],
            _srcArtifact: script ? parseArtifactCall(src) : null,
        };
    });

    return {
        // The spawn-all dispatch (a `runSweep`/spawn-ALL branch that names EVERY red,
        // NOT a runMode delegation — the fail-fast for-loop is the WRONG primitive).
        dispatchSweep: /--run["'\s].{0,40}sweep\b|argv\[3\]\s*===\s*["']sweep["']/.test(gatesSrc),
        dispatchSweepFast: /sweep-fast/.test(gatesSrc),
        gates,
        canonHasSweep: /close-disease[- ]sweep|proof:close-sweep|closeDisease:true[- ]manifest/i.test(canon),
        commitHookLedgerArm: /proof-live-verified-ledger\.mjs/.test(hook),
        commitHookSweepArm: /proof-close-sweep\.mjs|gates:sweep-fast|--run\s+sweep-fast/.test(hook),
    };
}

// ── The 9-bite HERMETIC self-test (synthetic fixtures; the mechanism proof) ──────
function baseGate(over = {}) {
    return {
        id: "proof:x",
        closeDisease: true,
        closeDiseaseArtifact: "X-cache",
        closeDiseaseArtifactEnv: "X_ENV",
        _sigs: ["GATE_REGISTRATION"],
        _srcArtifact: { env: "X_ENV", cache: "X-cache" },
        ...over,
    };
}
function baseInput(over = {}) {
    return {
        dispatchSweep: true,
        dispatchSweepFast: true,
        gates: [baseGate()],
        canonHasSweep: true,
        commitHookLedgerArm: true,
        commitHookSweepArm: true,
        ...over,
    };
}
/** Each bite: mutate ONE thing, assert the EXPECTED clause fires (and a clean base does not). */
function selfTestBites() {
    const has = (input, needle) => evaluate(input).violations.some((v) => v.includes(needle));
    const clean = evaluate(baseInput()).violations.length === 0;
    return [
        ["B0 clean base passes", clean],
        ["B1 C1 no --run sweep dispatch reds", has(baseInput({ dispatchSweep: false }), "[C1]")],
        ["B2 C2 empty SWEEP_SET reds", has(baseInput({ gates: [baseGate({ closeDisease: false, closeDiseaseReason: "n/a" })] }), "SWEEP_SET is EMPTY")],
        ["B3 C2 forward mis-flag reds", has(baseInput({ gates: [baseGate({ _sigs: [] })] }), "matches NO bookkeeping signature")],
        ["B4 C2 inverse forgot-the-flag reds", has(baseInput({ gates: [baseGate(), baseGate({ id: "proof:y", closeDisease: undefined, _sigs: ["RATCHET_BUDGET"] })] }), "no explicit closeDisease decision")],
        ["B5 C3 canon missing reds", has(baseInput({ canonHasSweep: false }), "[C3]")],
        ["B6 C4 sweep arm missing reds", has(baseInput({ commitHookSweepArm: false }), "no env-gated sweep-fast arm")],
        ["B7 C5 artifact path drift reds", has(baseInput({ gates: [baseGate({ closeDiseaseArtifact: "WRONG-cache" })] }), "artifact DRIFT")],
        ["B8 dual-signal JSON-leg catches exit-0-on-fail", sweepVerdict({ exit: 0, jsonStatus: "fail" }) === true && sweepVerdict({ exit: 1, jsonStatus: null }) === true && sweepVerdict({ exit: 0, jsonStatus: "pass" }) === false],
        ["B9 residual surfaced — a novel bookkeeping read matches NO signature", matchSignatures('readFileSync(resolve(ROOT, "docs/some-novel-registry.json"));').length === 0],
    ];
}
function runSelfTestCli() {
    const bites = selfTestBites();
    let failed = 0;
    for (const [label, ok] of bites) {
        console.log(`  ${ok ? "✓" : "✗"} ${label}`);
        if (!ok) failed++;
    }
    console.log(`\n[--selftest] ${bites.length - failed}/${bites.length} bites pass`);
    process.exit(failed ? 1 : 0);
}

// ── The gate (bare) + the sweep runner modes ────────────────────────────────────
function buildSweepMembers(fastOnly) {
    const pkg = JSON.parse(read("package.json") ?? "{}");
    const { members, fast } = deriveSweepSet(GATES);
    const set = fastOnly ? fast : members;
    return set.map((g) => ({
        id: g.id,
        script: resolveScript(g.cmd, pkg),
        cache: g.closeDiseaseArtifact ?? null,
    }));
}

/** `--sweep`/`--sweep-fast`: the spawn-all runner gates.mjs --run sweep delegates to. */
function runSweepCli(fastOnly) {
    const members = buildSweepMembers(fastOnly);
    if (members.length === 0) {
        // UN-ARMED — the closeDisease flags are not yet on the manifest (the P-SWEEP
        // wiring window). This is a WIRING gap, not a red close-gate: the bare gate's
        // C2 reds it at the close; the per-commit hook GRACE-passes (a manifest with
        // nothing to sweep is not a reason to brick `git commit` — the B0 ledger arm's
        // "no PROGRESS ledger ⇒ skip" philosophy). Once the flags land the sweep arms.
        console.warn("[close-sweep] UN-ARMED — no manifest row carries `closeDisease: true` yet (the flags are owed by BG.W-CLOSE-SWEEP; the bare gate's C2 reds this at the close). Grace-passing the per-commit sweep.");
        process.exit(0);
    }
    console.log(`[close-sweep] running ${fastOnly ? "sweep-fast" : "sweep"} (${members.length} closeDisease members, spawn-all, names EVERY red)`);
    const { results, reds } = runSweep(members);
    for (const r of results) {
        const red = sweepVerdict(r);
        console.log(`  ${red ? "RED " : "ok  "} ${r.id.padEnd(30)} exit ${r.exit}${r.jsonStatus ? ` · json ${r.jsonStatus}` : r.jsonMissing ? " · json ABSENT (exit-leg)" : ""}`);
    }
    if (reds.length) {
        console.log(`\n[close-sweep] ${reds.length} close gate(s) RED — the close is NOT clean:`);
        for (const r of reds) console.log(`  x ${r}`);
        process.exit(1);
    }
    console.log(`\n[close-sweep] all ${members.length} closeDisease members GREEN — the close is clean.`);
    process.exit(0);
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_CLOSE_SWEEP_ARTIFACT", "BG-close-sweep");
    const { violations, facts } = evaluate(realInput());

    // ── The born-RED anchor: the FAST sweep (spawn-all, dual-signal). Any member
    //    RED (R1–R4 at HEAD) reds this gate. When SWEEP_SET is un-armed (the flags
    //    are owed) C2 already reds; the sweep arm records the un-armed state.
    const fastMembers = buildSweepMembers(true);
    if (fastMembers.length === 0) {
        facts.sweep = { armed: false };
    } else {
        const { results, reds } = runSweep(fastMembers);
        facts.sweep = { armed: true, ran: results.length, reds };
        if (reds.length)
            violations.push(`[sweep] ${reds.length} closeDisease member(s) RED (the born-RED anchor — clears when R1–R4 land): ${reds.join("; ")}`);
    }

    // ── The honest completeness residual (surfaced, never claimed complete).
    facts.completenessResidual =
        "signature-bounded: a bookkeeping gate matching NONE of the 5 BOOKKEEPING_SIGNATURES is hand-audit-owned, not auto-netted (CRIT-1 resolve-(b) — the visible inverse-bite + the self-test, not elimination of the hand-list).";

    // ── The 9-bite self-test as a subprocess differential (un-skippable).
    const st = spawnSync(process.execPath, [SELF, "--selftest"], { cwd: ROOT, encoding: "utf8", env: { ...process.env } });
    facts.selfTest = { exit: st.status ?? 1 };
    if ((st.status ?? 1) !== 0)
        violations.push(`[self-test] the 9-bite hermetic self-test did not pass (exit ${st.status}) — the detector mechanism is broken:\n${st.stdout ?? ""}${st.stderr ?? ""}`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:close-sweep",
        facts,
        violations,
    });

    console.log("proof:close-sweep — the standing closeDisease-manifest completeness sweep (BG.W-CLOSE-SWEEP, born-RED-by-design)");
    console.log(`  --run sweep dispatch : ${facts.dispatch.sweep ? "present" : "MISSING"} · --run sweep-fast: ${facts.dispatch.sweepFast ? "present" : "MISSING"}`);
    console.log(`  SWEEP_SET            : ${facts.sweepSet.members.length} members (fast ${facts.sweepSet.fast}) · signature candidates ${facts.candidates}`);
    console.log(`  canon (build-and-gates): ${facts.canonHasSweep ? "recorded" : "MISSING"}`);
    console.log(`  commit-hook          : ledger ${facts.commitHook.ledgerArm ? "✓" : "✗"} · sweep-fast ${facts.commitHook.sweepArm ? "✓" : "✗"}`);
    console.log(`  born-RED sweep arm   : ${facts.sweep.armed ? `${facts.sweep.ran} ran, ${facts.sweep.reds.length} RED` : "UN-ARMED (flags owed)"}`);
    console.log(`  self-test (subproc)  : exit ${facts.selfTest.exit} (expect 0)`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    process.exit(status === "pass" ? 0 : 1);
}

// CLI dispatch: `--selftest` (the 9-bite core), `--sweep`/`--sweep-fast` (the
// spawn-all runner gates.mjs delegates to), else the bare gate.
const arg = process.argv[2];
if (arg === "--selftest") runSelfTestCli();
else if (arg === "--sweep") runSweepCli(false);
else if (arg === "--sweep-fast") runSweepCli(true);
else run();
