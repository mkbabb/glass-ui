#!/usr/bin/env node
// AZ.W-GATES — proof:gate-manifest-sound, the gate-manifest-soundness meta-gate.
//
// `proof:all` was CRASHABLE at HEAD: a malformed `{ tags: ["local"] }` row (no id,
// no cmd) made `runMode("local")` run `npm run undefined` → exit 1 → the LOCAL
// aggregate died. The two parity meta-gates were BLIND to it (the cmd-literal parse
// + the scriptFor() continue both silently skip a cmd-less row). And four live-gate
// scripts + the playwright config still DEFAULTED to the foreign-app `:5173` port;
// one gate navigated a dead route; two blob gates were dangling-by-disuse + read a
// stale post-split shader path; the freshness model was a git-ancestry TREADMILL;
// and a ci-tagged font gate read a moved token file (false RED on every runner).
//
// This DEVICE-FREE meta-gate makes the manifest structurally sound + self-defending.
// Every clause is a manifest-array structural assertion, a subprocess gate run
// (gates.mjs --run local / proof:gate-script-parity / proof:tag-parity /
// proof:font-cascade-live), a grep over the live-gate script set, or a READ of a
// persisted .cache/gates/*.json artefact — NOT a browser spawn. It runs on EVERY
// runner; it is a `local`-only META-gate by the JUSTIFIED_LOCAL_ONLY precedent
// (an active-tranche meta-gate, promoted to ci by its own wave at AZ close).
//
// BORN-RED at open: the malformed row exists (clause 1) AND the content-hash
// freshness model is unimplemented (clause 7). GREEN only at the discharged
// terminal state.
//
// CLAUSE 4 — the live-demo-URL default sweep. Every live-gate `??`-nullish default
// resolves the canonical demo origin :5199; the env-var OVERRIDE (the `??` LHS) is
// never matched. The CHR-1 chronic (the stray non-:5199 dock-gate defaults) is GONE
// from source — the surviving non-canonical residue is comment prose only. The
// detector carries TWO arms: the live-demo-URL string form (`?? "scheme://host:<port>"`)
// AND a bare-port form (`?? <port>`) checked against a recorded service-port allowlist
// (BB.W-DEAD-SWEEP closes the URL-string-only blind spot the BA widen's own scope
// comment admitted — a future `GLASS_UI_DEMO_URL ?? 5175` bare-port default now reds).
//
// CLAUSE 10 — proof:gate-manifested (BB.W-DEAD-SWEEP). Every package.json `proof:*`
// key resolves to a `gatesFor()` manifest row OR is on the recorded
// COMPOSITE_OR_RUNNER allowlist (the aggregate runners + the per-tranche ledger
// sub-keys, each carrying a non-empty rationale). The 24 registered-but-unmanifested
// gates (a key + a live script but NO aggregate row — manifest dark matter that
// passes parity yet runs nowhere) are tagged-or-removed; a future unmanifested gate
// reds. The allowlist's non-empty-rationale discipline forbids parking a bare key.
//
// CLAUSE 11 — MANIFEST-EXTRACTED (BH.B5b-gate-manifest-extract). The 349-row gate
// table + its per-row `note` rationale were carved OUT of gates.mjs into the DATA
// manifest `scripts/gates.manifest.mjs`; gates.mjs shrank to the thin ~300L runner
// that IMPORTS GATES from it (and re-exports it for the downstream consumers). The
// clause asserts the manifest exists + exports a non-empty GATES, the runner imports
// from it AND carries NO inline `export const GATES = [` row-literal, the runner is
// under the thin-runner line ceiling, and — the wave's binding hard-gate — the live
// SPAWNED `--list local|ci|release|full` output byte-equals `gatesFor(mode)` through
// the real import chain (the byte-identical-pre/post proof, standing). Born-RED on
// the pre-extract HEAD (no manifest + the runner still carries the table); GREEN once
// the verbatim move lands. + a self-test bite (a re-inlined literal / severed import /
// absent manifest / list-drift each flag; the clean extracted shape does not).

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { GATES, gatesFor } from "./gates.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCRIPTS = resolve(ROOT, "scripts");
const PKG_PATH = resolve(ROOT, "package.json");
const COMMAND = "npm run proof:gate-manifest-sound";

// THE COMPOSITE_OR_RUNNER ALLOWLIST (clause 10, proof:gate-manifested). A package.json
// `proof:*` key that is NOT a `gatesFor()` manifest row is manifest dark matter UNLESS
// it is an aggregate RUNNER (it invokes the manifest, it cannot be IN the set it runs)
// or a per-tranche LEDGER SUB-KEY (a composite arm invoked by its parent ledger gate).
// Map<key, rationale>; a NON-EMPTY rationale is REQUIRED per entry (the anti-evasion
// bite — a bare key cannot be parked here to dodge a tag). NOT a fail-open wildcard.
const COMPOSITE_OR_RUNNER = new Map([
    ["proof:all", "the LOCAL aggregate runner (node scripts/gates.mjs --run local) — it invokes the manifest, it cannot be a row in the set it runs"],
    ["proof:full", "the FULL deduped-union aggregate runner (--run full; local ∪ ci ∪ release) — the close-battery runner, not a manifest row"],
    ["proof:live-verified-ledger:ax", "the AX ledger composite arm — invoked by the parent proof:live-verified-ledger gate, not a standalone aggregate row"],
    ["proof:live-verified-ledger:ay", "the AY ledger composite arm — invoked by the parent ledger gate"],
    ["proof:live-verified-ledger:az", "the AZ ledger composite arm — invoked by the parent ledger gate"],
    ["proof:live-verified-ledger:ba", "the BA ledger composite arm — invoked by the parent ledger gate"],
    ["proof:live-verified-ledger:bb", "the BB ledger composite arm — invoked by the parent ledger gate"],
    ["proof:live-verified-ledger:strict", "the --strict-freshness close arm (BB.W-DELTA-RESHOOT) — runs the frozen-AY + active-BB ledger under --strict-freshness at the close; a named variant arm of the parent ledger gate (the :ax/:ay/:az/:ba/:bb sub-key precedent), load-bearing-witnessed by the gatesFor()-tagged proof:strict-freshness-armed self-test, not a standalone aggregate row"],
    ["proof:coherence-census", "the WS12 coherence/congruence audit-of-record CLAUSE ARM of proof:meta (BG.W-COHERENCE-CENSUS-GATE, F8 capstone 17.1) — coherenceCensus is imported into proof-meta.mjs's CLAUSES set + coherenceCensusSelfBites folded into its self-test; it is RUN by the parent proof:meta family gate (['local','ci']), NOT a standalone aggregate row (the cursor's recorded 'no standalone gates row' design; the composite-arm-invoked-by-its-parent-gate precedent the ledger sub-keys establish). The package.json key exists solely to satisfy the proof:gate-script-parity file↔key bijection over its standalone --self-test."],
    ["proof:glass-paper-congruence", "the WS12 --glass-key-* bevel SPINE machine-lock CLAUSE ARM of proof:meta (BG.W-GLASS-PAPER-CONGRUENCE, F8 capstone 17.5) — glassPaperCongruence is imported into proof-meta.mjs's CLAUSES set + glassPaperCongruenceSelfBites folded into its self-test; it is RUN by the parent proof:meta family gate (['local','ci']), NOT a standalone aggregate row (the coherence-census precedent, cursor-recorded 'no standalone gates row'). The package.json key exists solely to satisfy the proof:gate-script-parity file↔key bijection over its standalone --self-test."],
    ["proof:meta:operative-close", "the B10 close-ceremony VERDICT ORACLE (BI.W-GESTALT-LEDGER-FILE) — the --operative-close TIER of the parent proof:meta gate (born-RED at HEAD: 12 gestalt surfaces x 3 edict axes all PENDING; G2 demands filed PASS/FAIL Fable verdicts, G3 captures-resolve-on-disk, G4 distinct-Fable-author). Invoked by the close battery/release ceremony as a HARD tag-blocker AFTER the Fable verdict flip — a ceremony oracle, not an aggregate row (the :strict named-variant-arm precedent); the bare proof:meta manifest row stays the local+ci completeness gate."],
]);

/**
 * Clause 10 — proof:gate-manifested. Every package.json `proof:*` key resolves to a
 * `gatesFor()` manifest row (any tag, incl. the empty-tag historical-close rows) OR is
 * on the COMPOSITE_OR_RUNNER allowlist (each carrying a non-empty rationale). A key
 * with a live script but NO manifest row + NO allowlist entry is manifest dark matter.
 * PURE over injectable inputs so the self-test can drive a synthetic key + a synthetic
 * bare-rationale allowlist entry.
 */
export function manifestedViolations({ extraKeys = [], extraAllowlist = [] } = {}) {
    const pkg = JSON.parse(readFileSync(PKG_PATH, "utf8"));
    const proofKeys = [
        ...Object.keys(pkg.scripts ?? {}).filter((k) => k.startsWith("proof:")),
        ...extraKeys,
    ];
    const manifestCmds = new Set(GATES.map((g) => g.cmd));
    const allowlist = new Map([...COMPOSITE_OR_RUNNER, ...extraAllowlist]);
    const violations = [];
    const unmanifested = [];
    for (const key of proofKeys) {
        if (manifestCmds.has(key)) continue;
        if (allowlist.has(key)) {
            const rationale = allowlist.get(key);
            if (typeof rationale !== "string" || rationale.trim().length === 0)
                violations.push(
                    `[GATE-MANIFESTED] the COMPOSITE_OR_RUNNER allowlist entry ${key} carries no rationale — a bare key cannot be parked here to dodge a tag (the anti-evasion bite)`,
                );
            continue;
        }
        unmanifested.push(key);
        violations.push(
            `[GATE-MANIFESTED] ${key} is registered (a live proof:* script) but resolves to NO gatesFor() manifest row + is not on the COMPOSITE_OR_RUNNER allowlist — manifest dark matter (passes parity, runs in no aggregate); tag it into a gatesFor() row or remove it`,
        );
    }
    return { violations, unmanifested, allowlist: [...allowlist.keys()] };
}

// CLAUSE 11 — MANIFEST-EXTRACTED (BH.B5b-gate-manifest-extract). The 349-row gate
// table + its per-row `note` rationale live in scripts/gates.manifest.mjs; gates.mjs
// is the thin ~300L orchestrator that IMPORTS GATES from it. The runner carries NO
// inline `export const GATES = [` row-literal (the table is extracted, not
// duplicated), and `--list local|ci|release|full` is byte-identical to the manifest
// data end-to-end (the extract was a verbatim move). The RUNNER_LINE_CEILING is a
// generous thin-runner bound — the point is not the exact count but that the 2400-line
// table cannot creep back into the runner (a re-inline blows past it AND trips the
// inline-literal bite).
const MANIFEST_FILE = "gates.manifest.mjs";
const RUNNER_LINE_CEILING = 450;

/**
 * Clause 11 — MANIFEST-EXTRACTED. PURE over injectable inputs so the self-test can
 * drive synthetic runner sources / a missing manifest / a byte-drift `--list` mode.
 * `listChecks` is the end-to-end byte-identity witness: each `{ mode, ok, detail }`
 * records whether the SPAWNED `--list <mode>` stdout byte-equals `gatesFor(mode)`
 * (through the real import chain — a broken manifest import or a re-inlined stale
 * array diverges).
 */
export function extractionViolations({
    manifestExists,
    manifestExportsGates,
    runnerSrc = "",
    runnerLineCount,
    listChecks = [],
    lineCeiling = RUNNER_LINE_CEILING,
} = {}) {
    const violations = [];
    if (!manifestExists)
        violations.push(
            `[MANIFEST-EXTRACTED] scripts/${MANIFEST_FILE} is absent — the gate-row table must live in the extracted data manifest`,
        );
    else if (!manifestExportsGates)
        violations.push(
            `[MANIFEST-EXTRACTED] scripts/${MANIFEST_FILE} does not export a non-empty GATES array`,
        );
    // The runner must IMPORT GATES from the manifest (consume, not re-define)…
    const importsManifest =
        /import\s*\{[^}]*\bGATES\b[^}]*\}\s*from\s*["']\.\/gates\.manifest\.mjs["']/.test(runnerSrc);
    if (!importsManifest)
        violations.push(
            `[MANIFEST-EXTRACTED] scripts/gates.mjs does not import { GATES } from "./${MANIFEST_FILE}" — the runner must consume the extracted manifest`,
        );
    // …and must NOT carry the inline row-literal table (the 2400-line essay is GONE).
    if (/export\s+const\s+GATES\s*=\s*\[/.test(runnerSrc))
        violations.push(
            `[MANIFEST-EXTRACTED] scripts/gates.mjs still defines an inline \`export const GATES = [\` row-literal — the table must be extracted, not duplicated`,
        );
    // The runner is thin (the ~300L orchestrator; a re-inlined table blows the bound).
    if (typeof runnerLineCount === "number" && runnerLineCount > lineCeiling)
        violations.push(
            `[MANIFEST-EXTRACTED] scripts/gates.mjs is ${runnerLineCount} lines (> ${lineCeiling}) — the runner is no longer thin (the table crept back in?)`,
        );
    // Byte-identity: each mode's live --list byte-equals gatesFor(mode).
    for (const c of listChecks)
        if (!c.ok)
            violations.push(
                `[MANIFEST-EXTRACTED] \`--list ${c.mode}\` output diverges from gatesFor("${c.mode}") ${c.detail ?? ""} — the extracted runner's list is not byte-identical to the manifest data`,
            );
    return violations;
}

// The standing user-domain dirt the clean-tree guard allowlists (the docs/precepts
// submodule pointer the user owns). Any OTHER dirty tracked entry means a gate
// mutated source during the run (inv-θ) → RED.
const CLEAN_TREE_ALLOWLIST = new Set(["docs/precepts"]);

/** Run an npm script as a subprocess; return { ok, out }. */
function runNpm(script) {
    try {
        const out = execFileSync("npm", ["run", script], {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        });
        return { ok: true, out };
    } catch (e) {
        return { ok: false, out: `${e.stdout ?? ""}${e.stderr ?? ""}` };
    }
}

/** Run a node script as a subprocess; return { ok, out }. */
function runNode(args, extraEnv) {
    try {
        const out = execFileSync("node", args, {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
            ...(extraEnv ? { env: { ...process.env, ...extraEnv } } : {}),
        });
        return { ok: true, out };
    } catch (e) {
        return { ok: false, out: `${e.stdout ?? ""}${e.stderr ?? ""}` };
    }
}

/** The live-gate script set + the playwright config (the live-demo-default sweep
 *  targets). This meta-gate's OWN file is EXCLUDED — it is the detector, not a
 *  live-demo gate, and it carries the clause-4 self-test fixture literals (`?? 5175`,
 *  `?? 9337`) that would false-trip the scan it performs (the detector cannot scan
 *  itself for the pattern it tests). BB.W-DEAD-SWEEP. */
const SELF_FILE = "proof-gate-manifest-sound.mjs";
function liveGateScripts() {
    const set = readdirSync(SCRIPTS)
        .filter((f) => /^proof-.*\.mjs$/.test(f) && f !== SELF_FILE)
        .map((f) => resolve(SCRIPTS, f));
    set.push(resolve(ROOT, "tests-visual/playwright.config.ts"));
    return set;
}

function detectSound() {
    const violations = [];
    const facts = {};

    // ── Clause 1: MANIFEST-WELL-FORMED ──────────────────────────────────────
    // Every row in the union of the three aggregate sets carries a non-empty id
    // AND cmd. A cmd-less row can no longer exist (it would crash proof:all).
    const aggregateRows = new Set([
        ...gatesFor("local"),
        ...gatesFor("ci"),
        ...gatesFor("release"),
    ]);
    const malformed = [...aggregateRows].filter((g) => {
        const hasId = typeof g.id === "string" && g.id.trim().length > 0;
        const hasCmd = typeof g.cmd === "string" && g.cmd.trim().length > 0;
        return !hasId || !hasCmd;
    });
    facts.malformedRows = malformed.length;
    for (const g of malformed)
        violations.push(
            `[MANIFEST-WELL-FORMED] manifest row ${JSON.stringify(g)} has no id/cmd — every gatesFor() row must carry both (a cmd-less row crashes proof:all)`,
        );

    // ── Clause 2: PARITY-HARDENED ───────────────────────────────────────────
    // Both parity gates exit 0 (their structural pre-pass is in place). The
    // SELF-TEST inside each gate already injects a synthetic cmd-less row and
    // asserts BOTH detectors flag it — so a green subprocess here IS the
    // blind-spot-closed proof (a reverted pre-pass reds the gate's own self-test).
    const gsp = runNpm("proof:gate-script-parity");
    const tp = runNpm("proof:tag-parity");
    facts.gateScriptParity = gsp.ok;
    facts.tagParity = tp.ok;
    if (!gsp.ok)
        violations.push("[PARITY-HARDENED] proof:gate-script-parity did not exit 0 (the D2 structural well-formed pre-pass is not load-bearing)");
    if (!tp.ok)
        violations.push("[PARITY-HARDENED] proof:tag-parity did not exit 0 (the D2 well-formed presence assert is not load-bearing)");

    // ── Clause 3: PROOF-ALL-RUNS ────────────────────────────────────────────
    // The load-bearing end-to-end: `node scripts/gates.mjs --run local` COMPLETES —
    // the malformed-row crash class is dead (a row with no id/cmd ran
    // `npm run undefined` and died). BA.W-HYGIENE reconcile: the runner fails FAST
    // at the first red gate, and DURING tranche development an in-flight wave's
    // born-RED gate is the house discipline — an honest named-gate red is NOT the
    // crash class this clause exists to kill. The clause now reds ONLY on the
    // malformed-row signatures (`Missing script: "undefined"` / `FAIL at
    // 'undefined'`); an honest red is recorded as a fact (the first failing gate
    // named) and the full-green demand stays where it belongs — the W-CLOSE battery
    // and the release arm.
    // RECURSION GUARD (the all-green-cut close). This gate is tags:["local"], so it is a
    // ROW in the `--run local` set this clause spawns. During tranche dev an in-flight
    // born-RED gate stops the inner battery before it reaches this gate; but at the
    // ALL-GREEN cut there is no red, so the inner `--run local` reaches gate-manifest-sound
    // → which would spawn ANOTHER `--run local` → unbounded recursion (the close-time hang
    // that never surfaced mid-tranche). The spawn carries GLASS_UI_GATE_MANIFEST_NESTED=1;
    // the NESTED invocation SKIPS its own spawn (the OUTER invocation owns the completeness
    // check), bounding recursion to exactly one level.
    if (process.env.GLASS_UI_GATE_MANIFEST_NESTED === "1") {
        facts.proofAllRuns = true;
        facts.proofAllNested = true;
    } else {
        const proofAll = runNode([resolve(SCRIPTS, "gates.mjs"), "--run", "local"], {
            GLASS_UI_GATE_MANIFEST_NESTED: "1",
        });
        const malformedCrash =
            /Missing script: "undefined"/.test(proofAll.out) || /FAIL at 'undefined'/.test(proofAll.out);
        const failAt = proofAll.out.match(/\[gates\] FAIL at '([^']+)'/);
        facts.proofAllRuns = proofAll.ok;
        facts.proofAllFirstRed = proofAll.ok ? null : failAt ? failAt[1] : "(unparsed)";
        if (malformedCrash || (!proofAll.ok && !failAt))
            violations.push(
                `[PROOF-ALL-RUNS] the local aggregate did not COMPLETE${malformedCrash ? " (the malformed-row crash survives)" : " (no named FAIL-at gate — an unstructured death)"}`,
            );
    }

    // ── Clause 4: NON-:5199 DEFAULT ─────────────────────────────────────────
    // ZERO live-demo nullish-default sites resolving a port OTHER than :5199 in the
    // live-gate script set + the config. BA.W-GESTALT-GATE widened the detector off
    // the `:5173`-only `DEFAULT_5173` regex to flag ANY non-:5199 port in a live-demo-URL
    // `??`-default; the chronic (CHR-1) is now closed at source (every live-demo default
    // uniformly resolves :5199 — the surviving non-canonical residue is comment prose).
    //
    // BB.W-DEAD-SWEEP — the URL-string-only BLIND SPOT closed. The BA widen's own scope
    // comment ADMITTED it matched the URL-string form `?? "scheme://host:<port>"` ONLY,
    // justified by a SNAPSHOT census ("every live-demo default IS the URL-string form").
    // That is not a STRUCTURAL guarantee — a future `GLASS_UI_DEMO_URL ?? 5175` bare-port
    // default sails past the URL regex (the chronic's next mutation). The detector now
    // carries a SECOND arm: a bare-port `?? <port>` form. A bare-port default flags
    // UNLESS the port is on the recorded SERVICE_PORT_ALLOWLIST — the proven-legitimate
    // service ports the W-GESTALT-GATE census named: `9337` (proof-runtime.mjs's Chrome
    // DevTools remote-debug port) + `9347` (profile-aurora.mjs's profile twin), NEITHER a
    // live-demo target. The allowlist is a finite recorded Set WITH the per-port rationale
    // — NOT a fail-open wildcard; a new debug/profile port a sibling wave adds joins it
    // explicitly. The env-var OVERRIDE (the `??` LHS) is never matched; line comments are
    // stripped first (the URL-safe `(^|[^:])//` strip preserving `://`).
    const CANONICAL_LIVE_PORT = "5199";
    // The proven-legitimate non-live-demo service ports (the W-GESTALT-GATE census set).
    // A bare-port `?? <port>` resolving one of these is correct-by-design, NOT a stray
    // live-demo default. Recorded WITH rationale — never fail-open.
    const SERVICE_PORT_ALLOWLIST = new Map([
        ["9337", "Chrome DevTools remote-debug port (proof-runtime.mjs GLASS_UI_CHROME_DEBUG_PORT)"],
        ["9347", "the profile-aurora.mjs profile twin of the Chrome debug port"],
    ]);
    // Arm 1 — the live-demo-URL nullish-default `?? "scheme://host:<port>…"`.
    const NULLISH_DEFAULT_PORT = /\?\?\s*["']https?:\/\/[^"']*:(\d{4,5})["']/g;
    // Arm 2 — a BARE-PORT nullish-default `?? <port>` (4-5 digits). The BB.W-DEAD-SWEEP
    // blind-spot close: a live-demo default smuggled in as a bare integer port.
    const BARE_PORT_DEFAULT = /\?\?\s*(\d{4,5})\b/g;
    const nonCanonicalDefaults = [];
    for (const f of liveGateScripts()) {
        if (!existsSync(f)) continue;
        const src = readFileSync(f, "utf8");
        src.split("\n").forEach((line, i) => {
            // Drop the trailing line comment, but NOT the `//` in a `scheme://` URL
            // (the `(^|[^:])` guard preserves `://` — the clause-7 house idiom). The
            // inherited naive `/\/\/.*$/` strip ATE the URL's `//`, so the AZ NO-5173
            // URL-arm was a latent no-op; this URL-safe strip restores the detection.
            const code = line.replace(/(^|[^:])\/\/.*$/, "$1");
            for (const m of code.matchAll(NULLISH_DEFAULT_PORT)) {
                const port = m[1];
                if (port && port !== CANONICAL_LIVE_PORT)
                    nonCanonicalDefaults.push(`${relative(ROOT, f)}:${i + 1} (url :${port})`);
            }
            // Arm 2: a bare-port `?? <port>` default that is neither :5199 nor a
            // recorded service port is a stray live-demo bare-port default — reds.
            for (const m of code.matchAll(BARE_PORT_DEFAULT)) {
                const port = m[1];
                if (port && port !== CANONICAL_LIVE_PORT && !SERVICE_PORT_ALLOWLIST.has(port))
                    nonCanonicalDefaults.push(
                        `${relative(ROOT, f)}:${i + 1} (bare-port :${port} — not :5199 and not a recorded service port)`,
                    );
            }
        });
    }
    facts.nonCanonicalPortDefaults = nonCanonicalDefaults;
    facts.servicePortAllowlist = [...SERVICE_PORT_ALLOWLIST.keys()];
    for (const o of nonCanonicalDefaults)
        violations.push(`[NON-:5199 DEFAULT] a non-:5199 live-demo DEFAULT survives at ${o} — the live-demo origin is uniformly :5199 (BB.W-DEAD-SWEEP: the bare-port form is now caught against the recorded service-port allowlist)`);

    // ── Clause 4b: CLAUSE-4 SELF-TEST (the bare-port blind-spot bite) ────────
    // BB.W-DEAD-SWEEP anti-evasion: a synthetic `GLASS_UI_DEMO_URL ?? 5175` bare-port
    // default MUST be flagged by Arm 2, AND the `9337`/`9347` service ports MUST stay
    // GREEN. If the detector mis-fires either way, red loudly — the widen is not
    // load-bearing. (The bite the BA URL-string-only regex could not demonstrate.)
    const synthRedLine = 'const u = process.env.GLASS_UI_DEMO_URL ?? 5175;';
    const synthGreenLine = 'const p = process.env.GLASS_UI_CHROME_DEBUG_PORT ?? 9337;';
    const flags = (line) => {
        const out = [];
        const code = line.replace(/(^|[^:])\/\/.*$/, "$1");
        for (const m of code.matchAll(BARE_PORT_DEFAULT)) {
            const port = m[1];
            if (port && port !== CANONICAL_LIVE_PORT && !SERVICE_PORT_ALLOWLIST.has(port))
                out.push(port);
        }
        return out;
    };
    const synthRedFlagged = flags(synthRedLine).includes("5175");
    const synthGreenFlagged = flags(synthGreenLine).length > 0;
    facts.clause4SelfTest = { synthRedFlagged, synthGreenFlagged };
    if (!synthRedFlagged)
        violations.push(
            "[NON-:5199 DEFAULT] SELF-TEST FAILED: a synthetic `?? 5175` bare-port live-demo default was NOT flagged by Arm 2 — the BB.W-DEAD-SWEEP blind-spot close is not load-bearing",
        );
    if (synthGreenFlagged)
        violations.push(
            "[NON-:5199 DEFAULT] SELF-TEST FAILED: a recorded service port (`?? 9337`) was flagged — the service-port allowlist is broken",
        );

    // ── Clause 10: GATE-MANIFESTED (proof:gate-manifested) ──────────────────
    // Every package.json `proof:*` key resolves to a `gatesFor()` manifest row OR is on
    // the recorded COMPOSITE_OR_RUNNER allowlist (aggregate runners + the per-tranche
    // ledger sub-keys). A key with a live script but NO aggregate row + NO allowlist
    // entry is manifest dark matter (passes parity, runs nowhere) → RED. The allowlist
    // is a Map<key, rationale> with a NON-EMPTY rationale per entry (the anti-evasion
    // bite: a bare key cannot be parked here to dodge a tag). BB.W-DEAD-SWEEP tags-or-
    // removes the 24 registered-but-unmanifested gates; a future unmanifested gate reds.
    const manifested = manifestedViolations();
    facts.unmanifestedGates = manifested.unmanifested;
    facts.compositeOrRunnerAllowlist = manifested.allowlist;
    for (const v of manifested.violations) violations.push(v);
    // SELF-TEST: a synthetic unmanifested key MUST be flagged, AND a bare-rationale
    // allowlist entry MUST be flagged — the two anti-evasion bites.
    const synthManifest = manifestedViolations({
        extraKeys: ["proof:synthetic-unmanifested-fixture", "proof:bare-allowlist-fixture"],
        extraAllowlist: [["proof:bare-allowlist-fixture", ""]],
    });
    const caughtUnmanifested = synthManifest.violations.some((v) =>
        v.includes("proof:synthetic-unmanifested-fixture"),
    );
    const caughtBareRationale = synthManifest.violations.some((v) =>
        v.includes("proof:bare-allowlist-fixture"),
    );
    if (!caughtUnmanifested)
        violations.push(
            "[GATE-MANIFESTED] SELF-TEST FAILED: a synthetic unmanifested `proof:*` key was NOT flagged — the manifested clause is not load-bearing",
        );
    if (!caughtBareRationale)
        violations.push(
            "[GATE-MANIFESTED] SELF-TEST FAILED: a bare-rationale COMPOSITE_OR_RUNNER allowlist entry was NOT flagged — the rationale bite is broken",
        );

    // ── Clause 11: MANIFEST-EXTRACTED (BH.B5b) ──────────────────────────────
    // The gate-row DATA table lives in scripts/gates.manifest.mjs; scripts/gates.mjs
    // is the thin runner that IMPORTS GATES from it (no inline row-literal), and the
    // live `--list <mode>` output byte-equals gatesFor(mode) end-to-end. Born-RED on
    // the pre-extract HEAD (no manifest + the runner carries the inline table); GREEN
    // once the extract lands. The `--list` spawns are cheap (they only PRINT the cmd
    // list — no gate runs, no recursion risk).
    const manifestPath = resolve(SCRIPTS, MANIFEST_FILE);
    const manifestExists = existsSync(manifestPath);
    let manifestExportsGates = false;
    if (manifestExists) {
        const mSrc = readFileSync(manifestPath, "utf8");
        manifestExportsGates = /export\s+const\s+GATES\s*=\s*\[/.test(mSrc) && GATES.length > 0;
    }
    const runnerSrc = readFileSync(resolve(SCRIPTS, "gates.mjs"), "utf8");
    const runnerLineCount = runnerSrc.split("\n").length;
    const listChecks = ["local", "ci", "release", "full"].map((mode) => {
        const res = runNode([resolve(SCRIPTS, "gates.mjs"), "--list", mode]);
        const expected = gatesFor(mode)
            .map((g) => g.cmd)
            .join("\n");
        // console.log appends a trailing newline — strip exactly one for the compare.
        const got = (res.out ?? "").replace(/\n$/, "");
        return {
            mode,
            ok: res.ok && got === expected,
            detail: res.ok ? `(got ${got.length}B vs manifest ${expected.length}B)` : "(runner spawn failed)",
        };
    });
    const extractionV = extractionViolations({
        manifestExists,
        manifestExportsGates,
        runnerSrc,
        runnerLineCount,
        listChecks,
    });
    facts.manifestExtracted = {
        manifestExists,
        manifestExportsGates,
        runnerLineCount,
        runnerLineCeiling: RUNNER_LINE_CEILING,
        listChecks: listChecks.map((c) => ({ mode: c.mode, ok: c.ok })),
    };
    for (const v of extractionV) violations.push(v);
    // SELF-TEST bite: the pure detector must FLAG a re-inlined literal / a severed
    // manifest import / an absent manifest / a `--list` drift, and must NOT flag the
    // clean extracted shape (the anti-hollow guard — the clause is load-bearing).
    const stClean = extractionViolations({
        manifestExists: true,
        manifestExportsGates: true,
        runnerSrc: 'import { GATES } from "./gates.manifest.mjs";\nexport { GATES };',
        runnerLineCount: 300,
        listChecks: [{ mode: "local", ok: true }],
    });
    const stInline = extractionViolations({
        manifestExists: true,
        manifestExportsGates: true,
        runnerSrc: 'export const GATES = [ { id: "x", cmd: "x", tags: ["ci"] } ];',
        runnerLineCount: 2800,
        listChecks: [],
    });
    const stNoImport = extractionViolations({
        manifestExists: true,
        manifestExportsGates: true,
        runnerSrc: "const x = 1;",
        runnerLineCount: 300,
        listChecks: [],
    });
    const stNoManifest = extractionViolations({
        manifestExists: false,
        manifestExportsGates: false,
        runnerSrc: 'import { GATES } from "./gates.manifest.mjs";',
        runnerLineCount: 300,
        listChecks: [],
    });
    const stDrift = extractionViolations({
        manifestExists: true,
        manifestExportsGates: true,
        runnerSrc: 'import { GATES } from "./gates.manifest.mjs";',
        runnerLineCount: 300,
        listChecks: [{ mode: "ci", ok: false, detail: "(synthetic drift)" }],
    });
    const clause11SelfTest =
        stClean.length === 0 &&
        stInline.some((v) => v.includes("inline")) &&
        stNoImport.some((v) => v.includes("does not import")) &&
        stNoManifest.some((v) => v.includes("is absent")) &&
        stDrift.some((v) => v.includes("--list ci"));
    facts.clause11SelfTest = clause11SelfTest;
    if (!clause11SelfTest)
        violations.push(
            "[MANIFEST-EXTRACTED] SELF-TEST FAILED: the extraction detector did not flag a synthetic inline-literal / severed-import / absent-manifest / list-drift (or false-flagged the clean extracted shape) — the clause is not load-bearing",
        );

    // ── Clause 5: DOCK-ROUTE-LIVE ───────────────────────────────────────────
    // proof-dock-orchestrator-single.mjs carries DOCK_ROUTE = "/dock/layers" (a
    // real route — the demo manifest produces /dock/layers) AND the gates.mjs:665
    // NOTE no longer contains /navigation/dock-layers.
    // BA.W-HYGIENE reconcile: the clause asserts the gate's DOCK_ROUTE is a REAL
    // manifest route (parsed, whitespace-tolerant — the prior /dock/layers literal
    // went stale when the AZ skip-by-policy demotion deliberately moved the gate to
    // /dock/overview, and the s("dock","layers") regex broke when prettier put the
    // call multi-line). The dead /navigation/dock-layers assert is unchanged.
    // BI.W-DOCK-GATE-CULL RETIREMENT (orchestrator reconcile, 2026-07-13): the clause's
    // subject — proof-dock-orchestrator-single.mjs + its DOCK_ROUTE constant — was DELETED
    // by the census-backed cull (the greenfield dock's 10-script roster carries no
    // orchestrator-single gate; proof:dock-gate-roster GC1-GC4 owns the roster's liveness).
    // The surviving half of the clause is the gates.mjs dead-route hygiene assert alone.
    const gatesSrc = readFileSync(resolve(SCRIPTS, "gates.mjs"), "utf8");
    const noteHasDeadRoute = /\/navigation\/dock-layers/.test(gatesSrc);
    facts.dockRouteLive = true;
    facts.dockRoute = "(retired with BI.W-DOCK-GATE-CULL — roster liveness owned by proof:dock-gate-roster)";
    facts.gatesNoteHasDeadRoute = noteHasDeadRoute;
    if (noteHasDeadRoute)
        violations.push("[DOCK-ROUTE-LIVE] the gates.mjs NOTE still names the dead /navigation/dock-layers route");

    // ── Clause 6: BLOB-GATES-WIRED ──────────────────────────────────────────
    // proof:blob-interaction-prm + proof:blob-tempo-suppression are BOTH gates.mjs
    // rows (present in gatesFor("local")) AND proof-blob-interaction-prm.mjs reads
    // metaball-uniforms.glsl.ts (via readBlobShaders) AND its :213 message names
    // blob.vue not the retired blob-interaction.vue.
    const localIds = new Set(gatesFor("local").map((g) => g.id));
    const interactionWired = localIds.has("proof:blob-interaction-prm");
    const tempoWired = localIds.has("proof:blob-tempo-suppression");
    const interSrc = readFileSync(resolve(SCRIPTS, "proof-blob-interaction-prm.mjs"), "utf8");
    const readsUniforms = /readBlobShaders/.test(interSrc);
    const messageFixed = !/blob-interaction\.vue is absent/.test(interSrc) && /substrates\/blob\.vue is absent/.test(interSrc);
    facts.blobInteractionWired = interactionWired;
    facts.blobTempoWired = tempoWired;
    facts.blobInteractionReadsUniforms = readsUniforms;
    facts.blobMessageFixed = messageFixed;
    if (!interactionWired)
        violations.push("[BLOB-GATES-WIRED] proof:blob-interaction-prm is not a gatesFor(\"local\") row (still dangling-by-disuse)");
    if (!tempoWired)
        violations.push("[BLOB-GATES-WIRED] proof:blob-tempo-suppression is not a gatesFor(\"local\") row (still dangling-by-disuse)");
    if (!readsUniforms)
        violations.push("[BLOB-GATES-WIRED] proof-blob-interaction-prm.mjs does not read the shader-split authority (readBlobShaders over metaball-uniforms.glsl.ts) — the trail asserts read the frag alone");
    if (!messageFixed)
        violations.push("[BLOB-GATES-WIRED] proof-blob-interaction-prm.mjs still names the retired blob-interaction.vue (the :213 message must name demo/stories/substrates/blob.vue)");

    // ── Clause 7: FRESHNESS-CONTENT-HASH ────────────────────────────────────
    // proof-live-verified-ledger.mjs carries the surface-hash parse + recompute
    // path AND no longer carries the git-ancestry freshness arm (the clean break,
    // asserted by absence of the `git merge-base --is-ancestor` execSync CALL). The
    // 3 AZ DELTA docs each carry a surface-hash header that recomputes FRESH.
    const ledgerSrc = readFileSync(resolve(SCRIPTS, "proof-live-verified-ledger.mjs"), "utf8");
    const hasContentHash = /surface-hash/.test(ledgerSrc) && /createHash\("sha256"\)/.test(ledgerSrc);
    // The git-ancestry ARM is a CALL to `git merge-base --is-ancestor` inside an
    // execSync/execFileSync (a comment naming it is fine — match only an executed call).
    const codeNoComments = ledgerSrc
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
    const gitAncestryArmSurvives = /merge-base\s+--is-ancestor/.test(codeNoComments);
    facts.ledgerContentHash = hasContentHash;
    facts.ledgerGitAncestryArmSurvives = gitAncestryArmSurvives;
    if (!hasContentHash)
        violations.push("[FRESHNESS-CONTENT-HASH] proof-live-verified-ledger.mjs lacks the surface-hash parse + sha256 recompute path (the content-hash model is unimplemented)");
    if (gitAncestryArmSurvives)
        violations.push("[FRESHNESS-CONTENT-HASH] the git-ancestry freshness arm (git merge-base --is-ancestor) survives in code — the D6 clean break is incomplete");

    // The 3 AZ DELTA docs recompute FRESH against current surface bytes.
    const deltaFresh = checkDeltaHashes();
    facts.azDeltaFreshness = deltaFresh.map((d) => ({ wave: d.wave, state: d.state }));
    for (const d of deltaFresh)
        if (d.state !== "fresh" && d.state !== "retired")
            violations.push(`[FRESHNESS-CONTENT-HASH] ${d.wave}-DELTA.md ${d.reason}`);

    // ── Clause 8: R6-PERSISTED ──────────────────────────────────────────────
    // The persisted dock-animation-live artefact must read a NON-fail status. The
    // original problem this kills is status:"fail" (the server-down false-fail). A
    // LOCAL quiet-server re-run (CI unset) persists "pass" (the §2c binding paint); a
    // CI run (CI=true, GitHub Actions) cannot launch a real-GPU π against a live :5199,
    // so dock-animation-live befittingly SKIPS and persists "skipped" — the
    // cardinal-lesson split (CI proves device-free + the ledger/ba-gestalt; LOCAL proves
    // paint). So: require "pass" locally, accept "skipped" under CI, reject "fail" (and
    // any absent/garbage) in BOTH.
    const r6 = readGateArtifactStatus("AX-dock-animation-live");
    facts.r6DockAnimationStatus = r6;
    const r6Ok = r6 === "pass" || (process.env.CI && r6 === "skipped");
    if (!r6Ok)
        violations.push(
            `[R6-PERSISTED] .cache/gates/AX-dock-animation-live.json reads status:"${r6}" (expected "pass" from a quiet-server run${process.env.CI ? ' or "skipped" under CI' : ""} — a "fail" is the server-down false-fail this kills)`,
        );

    // ── Clause 9: FONT-PATH-LIVE ────────────────────────────────────────────
    // proof:font-cascade-live exits 0 (it reads the carved tokens/scheme-motion.css
    // font-token partial, not the stale tokens.css path — D7).
    const font = runNpm("proof:font-cascade-live");
    facts.fontCascadeLive = font.ok;
    if (!font.ok)
        violations.push("[FONT-PATH-LIVE] proof:font-cascade-live did not exit 0 — the gate still reads the stale src/styles/tokens.css for --font-stack-* (the D7 moved-file false RED)");

    // ── The clean-tree allowlist guard (the proof-au-final idiom) ───────────
    const dirt = unallowedDirt();
    facts.unallowedDirt = dirt;
    if (dirt.length)
        violations.push(
            `[CLEAN-TREE] unexpected dirty tracked entries (a gate may have mutated source — inv-θ): ${dirt.join(", ")}`,
        );

    return { facts, violations };
}

/** Recompute the surface-hash of each AZ DELTA doc against current bytes. */
function checkDeltaHashes() {
    const docs = [
        ["W-DOCK1", "docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md"],
        ["W-DOCK2", "docs/tranches/AY/audit/visual/W-DOCK2-DELTA.md"],
        ["W-CON1", "docs/tranches/AY/audit/visual/W-CON1-DELTA.md"],
    ];
    const out = [];
    for (const [wave, rel] of docs) {
        const abs = resolve(ROOT, rel);
        if (!existsSync(abs)) {
            out.push({ wave, state: "absent", reason: "DELTA doc is absent" });
            continue;
        }
        const doc = readFileSync(abs, "utf8");
        // BA.W-HYGIENE DC-REC-9: a RETIRED-SUPERSEDED DELTA legitimately carries NO
        // freshness header (the captured AY-form surface no longer exists; the banner
        // names the superseding AZ wave). The exemption requires the banner, not mere
        // header absence — a header-less doc WITHOUT the banner still reds.
        if (/RETIRED-SUPERSEDED/.test(doc)) {
            out.push({ wave, state: "retired", reason: "RETIRED-SUPERSEDED banner present — freshness exempt (DC-REC-9)" });
            continue;
        }
        const sp = doc.match(/<!--\s*surface-paths:\s*([^>]*?)\s*-->/);
        const sh = doc.match(/<!--\s*surface-hash:\s*([0-9a-fA-F]{64})\s*-->/);
        if (!sp || !sh) {
            out.push({ wave, state: "no-header", reason: "lacks the surface-paths + surface-hash header" });
            continue;
        }
        const paths = sp[1].split(",").map((s) => s.trim()).filter(Boolean);
        const declared = sh[1].trim().toLowerCase();
        const current = surfaceHashOf(paths);
        if (current === declared) out.push({ wave, state: "fresh" });
        else
            out.push({
                wave,
                state: "stale",
                reason: `surface-hash recomputes stale (declared ${declared.slice(0, 12)} → current ${current.slice(0, 12)}) — re-capture`,
            });
    }
    return out;
}

/** The same concat+sha256 the ledger's surfaceHash uses (kept local to avoid
 *  importing the ledger module, which runs its CLI body at import). */
function surfaceHashOf(paths) {
    const bufs = [];
    for (const p of paths) {
        const abs = resolve(ROOT, p);
        if (!existsSync(abs)) return "";
        bufs.push(readFileSync(abs));
    }
    return createHash("sha256").update(bufs.join("\n")).digest("hex");
}

/** Read a persisted gate artefact's status (or "absent"). */
function readGateArtifactStatus(id) {
    const p = resolve(ROOT, ".cache/gates", `${id}.json`);
    if (!existsSync(p)) return "absent";
    try {
        return JSON.parse(readFileSync(p, "utf8")).status ?? "absent";
    } catch {
        return "absent";
    }
}

/** `git status --porcelain`, minus the documented user-domain allowlist. */
function unallowedDirt() {
    let out = "";
    try {
        out = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" });
    } catch {
        return [];
    }
    return out
        .split("\n")
        .filter((l) => l.trim() !== "")
        .map((l) => {
            const path = l.slice(3).trim();
            const arrow = path.indexOf(" -> ");
            return arrow === -1 ? path : path.slice(arrow + 4);
        })
        .filter((p) => !CLEAN_TREE_ALLOWLIST.has(p));
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_GATE_MANIFEST_SOUND_ARTIFACT",
        "AZ-gate-manifest-sound",
    );
    const { facts, violations } = detectSound();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:gate-manifest-sound",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:gate-manifest-sound — the gate-manifest-soundness meta-gate (AZ.W-GATES)");
    console.log(`  1 MANIFEST-WELL-FORMED : ${facts.malformedRows === 0 ? "OK" : facts.malformedRows + " malformed"}`);
    console.log(`  2 PARITY-HARDENED      : gate-script-parity ${facts.gateScriptParity ? "✓" : "✗"} | tag-parity ${facts.tagParity ? "✓" : "✗"}`);
    console.log(`  3 PROOF-ALL-RUNS       : ${facts.proofAllRuns ? "✓ (local aggregate completes)" : "✗ (did not complete)"}`);
    console.log(`  4 NON-:5199 DEFAULT     : ${facts.nonCanonicalPortDefaults.length === 0 ? "OK (zero non-:5199 defaults)" : facts.nonCanonicalPortDefaults.join(", ")}`);
    console.log(`  5 DOCK-ROUTE-LIVE      : route ${facts.dockRouteLive ? "✓" : "✗"} | manifest-story ${facts.dockLayersStoryPresent ? "✓" : "✗"} | note-clean ${!facts.gatesNoteHasDeadRoute ? "✓" : "✗"}`);
    console.log(`  6 BLOB-GATES-WIRED     : interaction ${facts.blobInteractionWired ? "✓" : "✗"} | tempo ${facts.blobTempoWired ? "✓" : "✗"} | reads-uniforms ${facts.blobInteractionReadsUniforms ? "✓" : "✗"} | msg ${facts.blobMessageFixed ? "✓" : "✗"}`);
    console.log(`  7 FRESHNESS-HASH       : content-hash ${facts.ledgerContentHash ? "✓" : "✗"} | git-arm-gone ${!facts.ledgerGitAncestryArmSurvives ? "✓" : "✗"} | AZ deltas ${facts.azDeltaFreshness.map((d) => `${d.wave}:${d.state}`).join(" ")}`);
    console.log(`  8 R6-PERSISTED         : dock-animation-live status "${facts.r6DockAnimationStatus}"`);
    console.log(`  9 FONT-PATH-LIVE       : ${facts.fontCascadeLive ? "✓ (reads the carved partial)" : "✗ (stale tokens.css path)"}`);
    console.log(`  10 GATE-MANIFESTED     : ${facts.unmanifestedGates.length === 0 ? "OK (every proof:* key manifested or allowlisted)" : facts.unmanifestedGates.length + " unmanifested: " + facts.unmanifestedGates.join(", ")}`);
    console.log(`  11 MANIFEST-EXTRACTED  : manifest ${facts.manifestExtracted.manifestExists && facts.manifestExtracted.manifestExportsGates ? "✓" : "✗"} | runner ${facts.manifestExtracted.runnerLineCount}L (≤${facts.manifestExtracted.runnerLineCeiling}) | --list ${facts.manifestExtracted.listChecks.map((c) => `${c.mode}:${c.ok ? "✓" : "✗"}`).join(" ")} | self-test ${facts.clause11SelfTest ? "✓" : "✗"}`);
    console.log(`  4b CLAUSE-4 SELF-TEST  : bare-port-5175-red ${facts.clause4SelfTest.synthRedFlagged ? "✓" : "✗"} | service-port-green ${!facts.clause4SelfTest.synthGreenFlagged ? "✓" : "✗"}`);
    console.log(`  clean tree             : ${facts.unallowedDirt.length === 0 ? "YES" : "NO — " + facts.unallowedDirt.join(", ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
