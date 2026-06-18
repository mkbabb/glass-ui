// proof:strict-freshness-armed — BB.W-DELTA-RESHOOT W4: the ARM-BITES self-test.
//
// The cardinal-lesson at the harness layer: the `--strict-freshness` arm has
// existed in proof-live-verified-ledger.mjs since AZ.W-GATES (`:100`) but was
// invoked by ZERO registered gate row / CI job / close script — a latent flag that
// never fired at a real close (the L14 no-op class: arming a flag that nothing
// exercises). BB.W-DELTA-RESHOOT ARMS it (the `proof:live-verified-ledger:strict`
// named arm + the close-battery invocation) and THIS gate is the load-bearing
// witness that the armed invocation genuinely BITES a stale row, not merely parses
// the flag.
//
// The binding differential (run as a SUBPROCESS over a synthetic fixture tranche —
// a PROGRESS + a deliberately-STALE own-surface DELTA + an allowlist + a real
// own-surface light/dark PNG pair):
//   • ARMED   (`--strict-freshness`) over the stale row → exit 1 (the bite fires).
//   • BARE    (no flag)             over the stale row → exit 0 (graced — the
//     documented backfill window).
// The exit-code DIFFERENTIAL proves the flag is load-bearing, not decorative: a
// regression that drops `--strict-freshness` from the close arm re-passes the stale
// row (the no-op the audit caught), which this gate's `armedExit === 1` assertion
// reds. So the arm cannot silently un-arm.
//
// A self-test BITE (every run): the SAME fixture run BARE must NOT bite (exit 0) —
// the differential, not a flat "always reds". If the bare arm ALSO exited 1 the
// differential would be meaningless (the flag would not be the cause), so the gate
// asserts BOTH legs of the differential.
//
// Device-free + deterministic: the fixture is a temp dir under `.cache/`, the stale
// DELTA declares `package.json` as its surface-path with an all-zero surface-hash
// that can never match the real content hash (the proof-live-verified-ledger
// `:643` synthetic-stale idiom, here exercised THROUGH the armed CLI invocation).

import { spawnSync } from "node:child_process";
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:strict-freshness-armed";
const LEDGER = join(ROOT, "scripts/proof-live-verified-ledger.mjs");

// ── Build the synthetic fixture tranche ────────────────────────────────────────
// A tranche `ZZSTRICT` under `.cache/` with a single allowlisted `live-verified`
// row whose own-surface DELTA carries a STALE freshness header (surface-paths =
// package.json, surface-hash = all-zero — can never equal the real content hash).
const FIX_TRANCHE = "ZZSTRICT";
const FIX_DIR = join(ROOT, ".cache/strict-freshness-armed-fixture/docs/tranches", FIX_TRANCHE);
const FIX_VISUAL = join(FIX_DIR, "audit/visual");
const FIX_ROOT = join(ROOT, ".cache/strict-freshness-armed-fixture");

/**
 * Write the fixture tree. The DELTA must satisfy EVERY clause EXCEPT freshness —
 * own-surface `^W-STALE-` PNGs at a light/dark pair (both real, >1KiB) — so the ONLY
 * thing standing between bare-GREEN and strict-RED is the stale freshness header.
 * @returns {void}
 */
function buildFixture() {
    rmSync(FIX_ROOT, { recursive: true, force: true });
    mkdirSync(FIX_VISUAL, { recursive: true });

    // A real own-surface light/dark PNG pair (copy a known real PNG so isRealPng's
    // >1024-byte + magic floor + the R1 fidelity clause hold — no fabricated viewport).
    const realPng = join(
        ROOT,
        "docs/tranches/AY/audit/visual/W-DOCK1-dock-overview-click-collapse-desktop-light.png",
    );
    if (!existsSync(realPng)) {
        throw new Error(`fixture seed PNG missing: ${realPng}`);
    }
    copyFileSync(realPng, join(FIX_VISUAL, "W-STALE-fixture-desktop-light.png"));
    copyFileSync(realPng, join(FIX_VISUAL, "W-STALE-fixture-desktop-dark.png"));

    // The stale own-surface DELTA: declares package.json with an all-zero hash that
    // can NEVER equal the real content hash → freshnessVerdict → "stale".
    const delta = [
        "<!-- surface-paths: package.json -->",
        `<!-- surface-hash: ${"0".repeat(64)} -->`,
        "",
        "# W-STALE — the synthetic stale-row fixture (BB.W-DELTA-RESHOOT arm-bites self-test)",
        "",
        "Own-surface captures: `W-STALE-fixture-desktop-light.png` + `W-STALE-fixture-desktop-dark.png`.",
        "The declared surface-hash (all-zero) can never match package.json's real content hash, so this",
        "DELTA is STALE — graced on the bare arm (a NOTE), RED under `--strict-freshness` (the bite).",
        "",
    ].join("\n");
    writeFileSync(join(FIX_VISUAL, "W-STALE-DELTA.md"), delta, "utf8");

    // The allowlist (the row is a pixel-changing wave held to the own-surface bar).
    writeFileSync(join(FIX_VISUAL, "VISUAL-ALLOWLIST.json"), JSON.stringify(["W-STALE"]), "utf8");

    // The PROGRESS with ONE allowlisted live-verified row (column-by-header parser).
    const progress = [
        "# ZZSTRICT — strict-freshness-armed fixture PROGRESS",
        "",
        "| wave | status | gate | note |",
        "|---|---|---|---|",
        "| W-STALE | live-verified | proof:fixture | the synthetic stale row |",
        "",
    ].join("\n");
    writeFileSync(join(FIX_DIR, "PROGRESS.md"), progress, "utf8");
}

/**
 * Run the ledger gate as a SUBPROCESS over the staged fixture tranche, optionally
 * armed. The ledger reads `docs/tranches/<X>/PROGRESS.md` + `<X>/audit/visual/`
 * relative to ROOT (constellation.mjs's repo root), so `stageFixture()` copies the
 * fixture into a temp `docs/tranches/ZZSTRICT` (owned + removed in `cleanup()`) —
 * the only place the gate looks. No gate edit, no env override.
 *
 * @param {boolean} armed pass `--strict-freshness`
 * @returns {{status:number, stdout:string, stderr:string}}
 */
function runLedger(armed) {
    const args = [LEDGER, `--tranche=${FIX_TRANCHE}`];
    if (armed) args.push("--strict-freshness");
    const res = spawnSync(process.execPath, args, {
        cwd: ROOT,
        encoding: "utf8",
        env: { ...process.env },
    });
    return { status: res.status ?? 1, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
}

// The gate reads docs/tranches/<X> relative to ROOT, so we stage the fixture there
// (a temp tranche dir we own + remove). This is the only place the gate looks.
const STAGED = join(ROOT, "docs/tranches", FIX_TRANCHE);

function stageFixture() {
    rmSync(STAGED, { recursive: true, force: true });
    mkdirSync(join(STAGED, "audit/visual"), { recursive: true });
    // copy from the built fixture
    for (const f of [
        "audit/visual/W-STALE-fixture-desktop-light.png",
        "audit/visual/W-STALE-fixture-desktop-dark.png",
        "audit/visual/W-STALE-DELTA.md",
        "audit/visual/VISUAL-ALLOWLIST.json",
        "PROGRESS.md",
    ]) {
        copyFileSync(join(FIX_DIR, f), join(STAGED, f));
    }
}

function cleanup() {
    rmSync(FIX_ROOT, { recursive: true, force: true });
    rmSync(STAGED, { recursive: true, force: true });
}

const checks = [];
let armedRes, bareRes;
try {
    buildFixture();
    stageFixture();
    armedRes = runLedger(true);
    bareRes = runLedger(false);
} finally {
    cleanup();
}

// ── The binding differential ───────────────────────────────────────────────────
// W1 — the ARMED invocation BITES the stale row (exit 1).
checks.push({
    id: "armed-bites-stale-row",
    ok: armedRes.status === 1,
    detail: `armed (--strict-freshness) over the synthetic stale row exited ${armedRes.status} (expect 1 — the bite fires)`,
});

// W2 — the BARE invocation GRACES the stale row (exit 0). The differential, not a
// flat always-reds: the stale row is graced WITHOUT the flag, so the flag is the
// load-bearing cause of the bite.
checks.push({
    id: "bare-graces-stale-row",
    ok: bareRes.status === 0,
    detail: `bare (no flag) over the SAME stale row exited ${bareRes.status} (expect 0 — graced, the backfill window)`,
});

// W3 — the differential is LOAD-BEARING: armed ≠ bare exit codes. If a regression
// dropped the flag from the close arm, armed would equal bare (both 0) and the bite
// would silently un-arm — this assertion reds that.
checks.push({
    id: "differential-load-bearing",
    ok: armedRes.status !== bareRes.status && armedRes.status === 1 && bareRes.status === 0,
    detail: `armed=${armedRes.status} vs bare=${bareRes.status} — the flag is load-bearing IFF armed bites (1) AND bare graces (0)`,
});

// W4 — the armed bite is the FRESHNESS clause specifically (a stale-DELTA violation
// in the armed stderr/stdout), not an unrelated red. Confirms the bite is the
// content-hash freshness assertion the wave arms, not a parser/IO accident.
const armedOut = `${armedRes.stdout}\n${armedRes.stderr}`;
checks.push({
    id: "armed-bite-is-freshness",
    ok: /stale|freshness/i.test(armedOut) && /violation/i.test(armedOut),
    detail: `the armed bite names the freshness/stale violation (the content-hash clause), not an unrelated red`,
});

const failed = checks.filter((c) => !c.ok);
const pass = failed.length === 0;

console.log("proof:strict-freshness-armed — the --strict-freshness ARM-BITES self-test (BB.W-DELTA-RESHOOT W4)");
console.log(`  ledger gate           : scripts/proof-live-verified-ledger.mjs`);
console.log(`  fixture tranche       : ${FIX_TRANCHE} (a synthetic stale own-surface DELTA, cleaned up)`);
console.log(`  armed exit            : ${armedRes?.status} (--strict-freshness — expect 1, the bite)`);
console.log(`  bare exit             : ${bareRes?.status} (no flag — expect 0, graced)`);
for (const c of checks) {
    console.log(`  ${c.ok ? "OK  " : "FAIL"} ${c.id}: ${c.detail}`);
}
console.log(`  result                : ${pass ? "PASS" : "FAIL"} — ${checks.length} checks, ${failed.length} failing`);

if (!pass) {
    console.error(
        `[proof:strict-freshness-armed] the armed differential is BROKEN — ${failed.map((c) => c.id).join(", ")}. The --strict-freshness arm is not load-bearing at the close (the no-op the audit caught).`,
    );
}

const ARTIFACT = gateArtifactPath("GATE_STRICT_FRESHNESS_ARMED_OUT", "strict-freshness-armed");
writeGateArtifact(ARTIFACT, {
    command: COMMAND,
    status: pass ? "pass" : "fail",
    armedExit: armedRes?.status ?? null,
    bareExit: bareRes?.status ?? null,
    checks,
});

process.exit(pass ? 0 : 1);
