#!/usr/bin/env node
// AY.W-CON1 — proof:constellation-refit-live, the π-lane resize-refit + auto-drift
// render gate DRIVER.
//
// The INTERACTION truth lives in the π workspace spec
// (tests-visual/constellation-refit-live.spec.ts): it mounts the REAL
// <Constellation wander> on a real device, drives a PROGRAMMATIC RO resize via the
// demo `__constellationRefit.resizeTo` seam, and reads back the ENGINE-OWNED node
// bbox + focalIndex per frame — a runtime observation, NOT a grep. This driver
// INVOKES that spec via the workspace's Playwright runner, parses the JSON report,
// and emits a byte-stable gate artefact.
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept; the W01 lesson): when the π
// workspace IS present (Playwright resolves), a drifting/non-refitting field — or a
// wander that never fires / fires under reduced-motion — exits NON-ZERO, never
// SKIP-with-EXIT=0. The befitting-silent SKIP stays ONLY for the genuine
// device-absence on a zero-dep runner (no installed Playwright binary).
// Born-RED at HEAD: with no `refitField`/`field.wander` seam the
// `window.__constellationRefit` handle is absent → the handlePresent assert REDs.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve the
// runner across BOTH layouts (a hoisted install else false-SKIPs the fail-CLOSED
// arm — the AX.W00 orchestrator integration fix).
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
const REPORT = resolve(WORKSPACE, ".cache/pi-refit-report.json");
const COMMAND = "npm run proof:constellation-refit-live";

function workspacePresent() {
    return PW_PKG !== null && PW_BIN !== null;
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

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_CONSTELLATION_REFIT_LIVE_ARTIFACT",
        "AY-constellation-refit-live",
    );

    if (!workspacePresent()) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no installed @playwright/test — run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo dev server, for the resize-refit + auto-drift render assert",
            command: COMMAND,
        });
        console.log(
            "proof:constellation-refit-live — SKIPPED (π workspace device absent on this runner).",
        );
        console.log(
            "  The resize-refit + auto-drift render truth is asserted on the real device (the orchestrator runs the fail-CLOSED arm).",
        );
        process.exit(0);
    }

    const res = spawnSync(
        PW_BIN,
        ["test", "constellation-refit-live.spec.ts", "--reporter=list,json"],
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
            /* fall through to stdout parse */
        }
    }
    if (!report && res.stdout) {
        try {
            const start = res.stdout.indexOf("{");
            const json = JSON.parse(res.stdout.slice(start));
            writeGateArtifact(REPORT, json, { volatile: [] });
            report = parseReport(REPORT);
        } catch {
            /* no parseable report */
        }
    }

    const violations = [];
    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the constellation-refit-live spec exited ${res.status} with no parseable report — the resize-refit/auto-drift readback did not run cleanly (a drift-out field, a non-firing cadence, or a broken harness wiring)`,
            );
    }

    const status = violations.length === 0 && res.status === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            workspacePresent: true,
            specsPassed: report?.passed ?? null,
            specsFailed: report?.failed ?? null,
            playwrightExit: res.status,
        },
        violations,
    });

    console.log(
        "proof:constellation-refit-live — the resize-refit + auto-drift render gate (fills-box-in-one-frame + field-cools + auto-drift-cadence + PRM-suppress + alpha-both-mode) (AY.W-CON1)",
    );
    console.log(`  specs passed/failed : ${report?.passed ?? "?"} / ${report?.failed ?? "?"}`);
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
