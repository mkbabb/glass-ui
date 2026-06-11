// proof:adaptive-glass-live — AZ.W-ADAPTIVE-AUTO G1 (born-RED, the IN-SITU π arm).
//
// THE BINDING 4.5:1 + ΔL silhouette truth. The π readback (adaptive-glass-live.spec.ts)
// walks the enrolled dock + content-glass routes and asserts EVERY in-situ glass surface
// clears 4.5:1 body (the --muted-foreground tier, lifted to --foreground by the self-
// engage) AND the surface-silhouette ΔL clears a visibility floor over the worst-case-
// LIGHT (synthetic-white) backdrop — with NO injected --glass-backdrop ANCESTOR bucket
// (the banned C5-4 cheat). The self-engage must fire via the surface's OWN `:where()`
// rule, which is exactly the Arm-1 behaviour under test.
//
// THE C5-4 BLIND SPOT CLOSED: the prior π arm injected the bucket on a synthetic ancestor
// (so the ancestor-querying @container block falsely self-matched in test while the in-
// situ render stayed broken). This spec reads each surface's OWN resolved background and
// composites over synthetic white — a route's incidental DARK page backdrop cannot mask a
// broken-over-light render.
//
// RUNNER-TRUTH: this gate LOADS :5199 (it reads PAINTED contrast over the live dock/
// content) → auto-detected LIVE_VERIFIED_LOCAL_ONLY, tags ["local"], added to the
// gates.mjs HEADER_LIVE_VERIFIED enumeration. On CI it grace-SKIPs (the AX.W00 fail-
// closed Playwright-presence probe) and is backstopped by proof:live-verified-ledger over
// the W-ADAPTIVE-AUTO DELTA — it is NEVER re-run server-side (no real-GPU/real-paint
// contrast on a headless runner). Born-RED on the pre-edit tree (dock ΔL≈0.01, content
// wash 1.61:1); GREEN after Arm 1 + Arm 2.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
const SPEC = "adaptive-glass-live.spec.ts";
const SPEC_PATH = resolve(WORKSPACE, SPEC);
const COMMAND = "npm run proof:adaptive-glass-live";

// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve across BOTH
// the workspace-local AND the hoisted-root layout (the W00 orchestrator fix).
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
const REPORT = resolve(WORKSPACE, ".cache/adaptive-glass-live-report.json");

/** Whether the π workspace carries an INSTALLED Playwright (the device present). */
function workspacePresent() {
    return PW_PKG !== null && PW_BIN !== null;
}

/** Parse a Playwright JSON report → {passed, failed, failures[]}. */
function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    let passed = 0;
    let failed = 0;
    const failures = [];
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                const okT = (t.results ?? []).every(
                    (r) => r.status === "passed" || r.status === "skipped",
                );
                if (okT) passed++;
                else {
                    failed++;
                    failures.push(spec.title);
                }
            }
        }
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of json.suites ?? []) walk(suite);
    return { passed, failed, failures };
}

function run() {
    const ARTIFACT = gateArtifactPath("GATE_ADAPTIVE_GLASS_LIVE_OUT", "AZ-adaptive-glass-live");
    const violations = [];

    if (!existsSync(SPEC_PATH)) {
        violations.push(`${SPEC} is absent — the in-situ π readback cannot run`);
    }

    // Device-absent → befitting-silent SKIP (the orchestrator runs the readback on the
    // real device; backstopped by proof:live-verified-ledger over the DELTA).
    if (!workspacePresent()) {
        const ok = violations.length === 0;
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: ok ? "skipped" : "fail",
            command: COMMAND,
            reason: ok
                ? "the tests-visual π workspace has no installed @playwright/test on this runner — the in-situ 4.5:1 + ΔL readback runs on the real device (LIVE_VERIFIED_LOCAL_ONLY; backstopped by proof:live-verified-ledger over the W-ADAPTIVE-AUTO DELTA)"
                : "the spec is absent — see violations",
            violations,
        });
        console.log("proof:adaptive-glass-live — the IN-SITU π readback (AZ.W-ADAPTIVE-AUTO G1)");
        console.log("  π in-situ readback : SKIPPED (π workspace device absent on this runner — local-only)");
        if (violations.length) for (const v of violations) console.log(`  x ${v}`);
        process.exit(ok ? 0 : 1);
    }

    // The workspace IS present — fail-CLOSED. Run the in-situ readback against :5199.
    const res = spawnSync(PW_BIN, ["test", SPEC, "--reporter=list,json"], {
        cwd: WORKSPACE,
        stdio: ["ignore", "pipe", "inherit"],
        encoding: "utf8",
        env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: REPORT },
    });

    let report = null;
    if (existsSync(REPORT)) {
        try {
            report = parseReport(REPORT);
        } catch {
            /* fall through to the exit-code path */
        }
    }

    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the in-situ adaptive-glass-live π spec exited ${res.status} with no parseable report — the painted-contrast arm did not run cleanly (an illegible/invisible in-situ glass surface or a broken harness wiring; ensure a :5199 demo server is up)`,
            );
    }

    const ok = violations.length === 0;
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: ok ? "pass" : "fail",
        command: COMMAND,
        playwrightExit: res.status,
        specsPassed: report?.passed ?? null,
        specsFailed: report?.failed ?? null,
        violations,
    });

    console.log("proof:adaptive-glass-live — the IN-SITU π readback (AZ.W-ADAPTIVE-AUTO G1)");
    console.log(`  π in-situ readback : ${ok ? "✓ GREEN" : "✗ RED"} (passed ${report?.passed ?? "?"}, failed ${report?.failed ?? "?"})`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    process.exit(ok ? 0 : 1);
}

run();
