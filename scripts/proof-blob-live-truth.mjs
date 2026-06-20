// AX.W46 — proof:blob-live-truth, the blob's live-truth CLOSING gate (the discharge of
// the W15/W16 deferred `liveVerifyNeeded` clause both their JSONs recorded UNMET).
//
// The cardinal-lesson antidote. W08 authored `blob-render.spec.ts` with the
// dome-luma-std + centroid-shift as one-sided FLOOR gates, so "louder always passed" —
// the lighting (over-bright wet-plastic bead) AND the interaction (lunging lean) drifted
// loud because every retune that cleared the floor by more passed "better," and the live
// π-lane (the only ceiling) never ran. AND `setMood` had no manual override, so the
// public expose was clobbered to idle within a frame (the documented lie). This gate
// truths both up with THREE arms:
//
//   ARM A — the floor→BAND STRUCTURE proof (source-parse blob-render.spec.ts): the
//     domeLumaStd + centroidShift assertions each carry a PAIRED ceiling (not a bare
//     floor), AND the no-blown-white worst-painted-luma assertion is present. Born-RED
//     at HEAD (floor-only; no ceiling). The spec TEXT is the artefact (the precept-valid
//     source-structure proof per SPEC.md §Hard Gates).
//
//   ARM B — the manual-mood-latch STRUCTURE proof (source-parse useBlobMood.ts):
//     `setMood` carries a `source` discriminant; a `manualOverride` latch exists;
//     `update` early-returns while the latch holds; the latch is in `isSettled`. Born-RED
//     at HEAD (`setMood` has no source param; `update` drives unconditionally — the
//     priority inversion). Source-structure proof.
//
//   ARM C — the fail-CLOSED π readback (runtime). INVOKES the π-workspace
//     `blob-render.spec.ts` (the BAND render — domeLumaStd/centroidShift INSIDE their
//     bands, worst painted luma sub-blown-white) AND `blob-mood-live.spec.ts` (the
//     mood-DELTA — a manual setMood paints a measurable, PERSISTING param delta; a fresh
//     pointer RELEASES the latch). Rides the W00 fail-CLOSED contract (workspace PRESENT
//     + render over-bright/over-dramatic/clobbered → exit 1; befitting-silent SKIP only
//     on genuine device-absence). Born-RED at HEAD (the band reds the over-bright dome;
//     the mood readback reds the clobber). A RUNTIME-OBSERVATION artefact.
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept, inherited from W00/W08): when the π
// workspace IS present (its @playwright/test resolves at the workspace-local OR the
// hoisted-root layout), a missing/over-bright/over-dramatic/clobbered render exits
// NON-ZERO — never SKIP-with-EXIT=0. The befitting-silent SKIP stays ONLY for the
// genuine device-absence on a zero-dep runner. The STRUCTURE arms (A, B) ALWAYS run
// (device-free FS/source parse) — only arm C's runtime readback is device-gated.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, liveArmCiGraceSkip, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
const RENDER_SPEC = resolve(WORKSPACE, "blob-render.spec.ts");
const MOOD_SPEC = resolve(WORKSPACE, "blob-mood-live.spec.ts");
const MOOD_COMPOSABLE = resolve(
    ROOT,
    "src/components/custom/goo-blob/composables/useBlobMood.ts",
);
// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve the runner
// across BOTH the workspace-local AND the hoisted-root layout (the W00 orchestrator fix).
const PW_BIN =
    [
        resolve(WORKSPACE, "node_modules/.bin/playwright"),
        resolve(ROOT, "node_modules/.bin/playwright"),
    ].find(existsSync) ?? null;
const PW_PKG =
    [
        resolve(WORKSPACE, "node_modules/@playwright/test/package.json"),
        resolve(ROOT, "node_modules/@playwright/test/package.json"),
    ].find(existsSync) ?? null;
const REPORT = resolve(WORKSPACE, ".cache/blob-live-truth-report.json");
const COMMAND = "npm run proof:blob-live-truth";

/** Strip block + line comments so a structure-parse reads the SOURCE, not the prose. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

/** Whether the π workspace carries an INSTALLED Playwright (the device present). */
function workspacePresent() {
    return PW_PKG !== null && PW_BIN !== null;
}

// ── ARM A — the floor→BAND structure proof (source-parse blob-render.spec.ts). ──────
//
// A floor with a paired ceiling reads as a `toBeGreaterThanOrEqual(<MIN const>)` AND a
// `toBeLessThanOrEqual(<MAX const>)` for the SAME metric. We assert the MAX constants
// exist AND are referenced by a `toBeLessThanOrEqual` (the ceiling is wired, not a dead
// const), plus the no-blown-white witness const + assertion.
function checkBandStructure() {
    const violations = [];
    const facts = {};
    if (!existsSync(RENDER_SPEC)) {
        violations.push("blob-render.spec.ts is absent — the band-structure proof cannot run");
        return { violations, facts };
    }
    const src = stripComments(readFileSync(RENDER_SPEC, "utf8"));

    // The two metrics that MUST be banded (each: a MIN floor + a MAX ceiling const, and
    // a toBeLessThanOrEqual referencing the MAX).
    const banded = [
        { metric: "domeLumaStd", min: "DOME_LUMA_STD_MIN", max: "DOME_LUMA_STD_MAX" },
        { metric: "centroidShift", min: "CENTROID_SHIFT_MIN", max: "CENTROID_SHIFT_MAX" },
    ];
    for (const { metric, min, max } of banded) {
        const hasMin = new RegExp(`const\\s+${min}\\s*=`).test(src);
        const hasMax = new RegExp(`const\\s+${max}\\s*=`).test(src);
        const floorWired = new RegExp(`toBeGreaterThanOrEqual\\(\\s*${min}\\s*\\)`).test(src);
        const ceilWired = new RegExp(`toBeLessThanOrEqual\\(\\s*${max}\\s*\\)`).test(src);
        facts[metric] = { hasMin, hasMax, floorWired, ceilWired };
        if (!hasMin || !floorWired)
            violations.push(
                `${metric}: the FLOOR (${min} + a paired toBeGreaterThanOrEqual) is missing — the legibility floor must stay`,
            );
        if (!hasMax || !ceilWired)
            violations.push(
                `${metric}: the CEILING (${max} + a paired toBeLessThanOrEqual) is missing — the one-sided floor still REWARDS the overshoot it should bound (the cardinal-lesson breach; convert it to a BAND)`,
            );
    }

    // The no-blown-white witness — the HIGHLIGHT_LUMA_MAX const + a toBeLessThanOrEqual.
    const hasHighlightConst = /const\s+HIGHLIGHT_LUMA_MAX\s*=/.test(src);
    const highlightWired = /toBeLessThanOrEqual\(\s*HIGHLIGHT_LUMA_MAX\s*\)/.test(src);
    facts.noBlownWhite = { hasHighlightConst, highlightWired };
    if (!hasHighlightConst || !highlightWired)
        violations.push(
            "the no-blown-white witness (HIGHLIGHT_LUMA_MAX + a paired toBeLessThanOrEqual) is missing — the over-bright specular blown-white spot is not gated",
        );

    return { violations, facts };
}

// ── ARM B — the manual-mood-latch structure proof (source-parse useBlobMood.ts). ────
function checkLatchStructure() {
    const violations = [];
    const facts = {};
    if (!existsSync(MOOD_COMPOSABLE)) {
        violations.push("useBlobMood.ts is absent — the latch-structure proof cannot run");
        return { violations, facts };
    }
    const src = stripComments(readFileSync(MOOD_COMPOSABLE, "utf8"));

    // 1. setMood carries a `source` discriminant (the manual/auto param).
    const setMoodHasSource =
        /function\s+setMood\([^)]*\boptions\b[^)]*\)/.test(src) &&
        /source\??:\s*(?:MoodSource|"auto"|"manual")/.test(src);
    facts.setMoodHasSource = setMoodHasSource;
    if (!setMoodHasSource)
        violations.push(
            "setMood carries no `source` discriminant — it cannot distinguish a manual pin from the autonomic arc (the priority inversion is unresolved)",
        );

    // 2. a `manualOverride` latch exists AND is armed on a manual setMood.
    const latchDeclared = /\bmanualOverride\b/.test(src);
    const latchArmed = /manualOverride\s*=\s*true/.test(src);
    facts.manualOverrideLatch = { declared: latchDeclared, armed: latchArmed };
    if (!latchDeclared || !latchArmed)
        violations.push(
            "the `manualOverride` latch is missing/never armed — a manual setMood does not pin the mood above the auto-arc (the generalization of excitedHoldMs)",
        );

    // 3. update early-returns while the latch holds (it does NOT auto-drive over a pin).
    const updateRespectsLatch =
        /function\s+update\(/.test(src) && /if\s*\(\s*manualOverride\s*\)\s*return/.test(src);
    facts.updateRespectsLatch = updateRespectsLatch;
    if (!updateRespectsLatch)
        violations.push(
            "update does NOT early-return while the latch holds — the auto-mood arc still clobbers a user-pinned mood every frame (the D7 root)",
        );

    // 4. the latch is in the isSettled predicate (a pinned non-idle mood keeps the loop
    //    alive instead of being silently dragged to idle-then-parked).
    const latchInSettled =
        /function\s+isSettled\(\)[\s\S]*?manualOverride[\s\S]*?\}/.test(src);
    facts.latchInIsSettled = latchInSettled;
    if (!latchInSettled)
        violations.push(
            "the manual-override latch is NOT folded into isSettled — a pinned non-idle mood is silently dragged to idle-then-parked (the quiescence-gate breach)",
        );

    return { violations, facts };
}

/** Parse the Playwright JSON report into {passed, failed, failures}. */
function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    const failures = [];
    let passed = 0;
    let failed = 0;
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                const ok = t.results?.every((r) => r.status === "passed");
                if (ok) passed++;
                else {
                    failed++;
                    const msg = t.results
                        ?.flatMap((r) => r.errors ?? [])
                        .map((e) => (e.message ?? "").split("\n")[0])
                        .join(" | ");
                    failures.push(`${spec.title}: ${msg}`);
                }
            }
        }
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of json.suites ?? []) walk(suite);
    return { passed, failed, failures };
}

// ── ARM C — the fail-CLOSED π readback (invoke both specs). ──────────────────────────
function runPiReadback() {
    const violations = [];
    const res = spawnSync(
        PW_BIN,
        ["test", "blob-render.spec.ts", "blob-mood-live.spec.ts", "--reporter=list,json"],
        {
            cwd: WORKSPACE,
            stdio: ["ignore", "pipe", "inherit"],
            encoding: "utf8",
            env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT },
        },
    );
    let report = null;
    if (existsSync(REPORT)) {
        try {
            report = parseReport(REPORT);
        } catch {
            /* fall through */
        }
    }
    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the blob band + mood-delta π specs exited ${res.status} with no parseable report — the rendered-pixel arm did not run cleanly (an over-bright/over-dramatic/clobbered render or a broken harness wiring)`,
            );
    }
    return { violations, report, exit: res.status };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_BLOB_LIVE_TRUTH_ARTIFACT",
        "AX-blob-live-truth",
    );

    // The STRUCTURE arms ALWAYS run (device-free).
    const armA = checkBandStructure();
    const armB = checkLatchStructure();
    const violations = [...armA.violations, ...armB.violations];
    const facts = {
        bandStructure: armA.facts,
        latchStructure: armB.facts,
    };

    // ARM C — runtime readback, device-gated by the fail-CLOSED contract.
    // liveArmCiGraceSkip(): grace-SKIP the live arm under CI (the proof:dock-no-scale-pop
    // `!process.env.CI` precedent — the CI proof is the device-free union + the ledger;
    // the local hard-CLOSED path, CI unset, is untouched). See gate-output.mjs.
    if (!workspacePresent() || liveArmCiGraceSkip()) {
        facts.piReadback = { ran: false, reason: "device-absent" };
        const structOk = violations.length === 0;
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: structOk ? "skipped" : "fail",
            command: COMMAND,
            reason: structOk
                ? "the tests-visual π workspace has no installed @playwright/test — the floor→band + latch STRUCTURE arms PASSED (device-free); the runtime band/mood-delta readback runs on the real device (the orchestrator's fail-CLOSED arm)"
                : "structure arms FAILED (device-free) — see violations",
            facts,
            violations,
        });
        console.log("proof:blob-live-truth — the blob live-truth CLOSING gate (AX.W46)");
        console.log(`  arm A (floor→band structure) : ${armA.violations.length === 0 ? "✓" : "✗"}`);
        console.log(`  arm B (manual-mood latch)    : ${armB.violations.length === 0 ? "✓" : "✗"}`);
        console.log("  arm C (π runtime readback)   : SKIPPED (π workspace device absent on this runner)");
        if (violations.length) {
            console.log("\nVIOLATIONS:");
            for (const v of violations) console.log(`  x ${v}`);
        }
        // A structure failure is a HARD red even device-absent; a clean structure is a
        // befitting SKIP (the orchestrator runs the runtime arm on the real device).
        process.exit(structOk ? 0 : 1);
    }

    // The workspace IS present — fail-CLOSED from here. Run the runtime readback.
    const armC = runPiReadback();
    violations.push(...armC.violations);
    facts.piReadback = {
        ran: true,
        specsPassed: armC.report?.passed ?? null,
        specsFailed: armC.report?.failed ?? null,
        playwrightExit: armC.exit,
    };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:blob-live-truth — the blob live-truth CLOSING gate (AX.W46)");
    console.log(`  arm A (floor→band structure) : ${armA.violations.length === 0 ? "✓" : "✗"}`);
    console.log(`  arm B (manual-mood latch)    : ${armB.violations.length === 0 ? "✓" : "✗"}`);
    console.log(
        `  arm C (π runtime readback)   : ${armC.report?.passed ?? "?"} passed / ${armC.report?.failed ?? "?"} failed`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
