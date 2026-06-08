// AX.W16 — proof:blob-integration, the gate DRIVER (the blob's INTEGRATION close).
//
// The blob's glass-ui integration contract made REAL + LOCKED: the WCAG-2.2.2
// `DockBackgroundToggle` pause seam actually PARKS the rAF loop, the multi-instance
// grid stays under the WebGL-context cap, and the README "Exposed" table matches the
// shipped defineExpose surface. The behavioral truth lives in the π workspace spec
// (tests-visual/blob-pause-seam.spec.ts): it mounts the REAL interactive <GooBlob>
// wired to a DockBackgroundToggle via v-model:paused on a real device, observes the
// ACTUAL loop parking on pause (a screenshot frame-delta — NOT a defineExpose-string
// regex; the AX gate-philosophy lesson), counts the live WebGL2 contexts, and checks
// the README↔code defineExpose consistency. This driver INVOKES that spec via the
// workspace's Playwright runner, parses the JSON report, and emits a byte-stable gate
// artefact through gate-output.mjs.
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept): when the π workspace IS present
// (tests-visual/node_modules/@playwright/test resolves OR the hoisted-root copy
// does), a dead pause seam / unbounded context count / drifted README exits NON-ZERO
// — never SKIP-with-EXIT=0. The befitting-silent SKIP stays ONLY for the genuine
// device-absence on a zero-dep runner (the workspace's Playwright binary is not
// installed) — distinct from a real wiring break (workspace PRESENT, seam dead →
// exit 1), per the fail-explicit-vs-browser-API-degradation edict.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
// npm workspaces HOIST @playwright/test to the ROOT node_modules; resolve the runner
// across BOTH the workspace-local AND the hoisted-root layout (else a hoisted install
// false-SKIPs the fail-CLOSED arm — the AX.W00 orchestrator integration fix).
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
const REPORT = resolve(WORKSPACE, ".cache/blob-integration-report.json");
const COMMAND = "npm run proof:blob-integration";

/** Whether the π workspace carries an INSTALLED Playwright (the device present). */
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
        "GLASS_UI_BLOB_INTEGRATION_ARTIFACT",
        "AX-blob-integration",
    );

    if (!workspacePresent()) {
        // Genuine device absence — befitting-silent SKIP (the zero-dep runner does not
        // carry the Playwright browser binary). NOT a false GREEN and NOT a hard RED on
        // a missing optional device; the orchestrator runs the fail-CLOSED arm on the
        // real Chrome. (Distinct from a wiring break — that would have the workspace
        // PRESENT and the pause seam dead → exit 1 below.)
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no installed @playwright/test — run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo dev server, for the rAF-park pause-seam + context-bound + README-consistency assert",
            command: COMMAND,
        });
        console.log(
            "proof:blob-integration — SKIPPED (π workspace device absent on this runner).",
        );
        console.log(
            "  The pause-seam-parks-the-loop truth is asserted on the real device (the orchestrator runs the fail-CLOSED arm). Install the workspace + a demo dev server to run it here.",
        );
        process.exit(0);
    }

    // The workspace IS present — fail-CLOSED from here. Run the spec. The json reporter
    // writes the report to REPORT deterministically via PLAYWRIGHT_JSON_OUTPUT_NAME (a
    // bare `--reporter=json` streams to stdout, which the `list` lines corrupt — the
    // parse must read the FILE).
    const res = spawnSync(
        PW_BIN,
        ["test", "blob-pause-seam.spec.ts", "--reporter=list,json"],
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
            const tmp = resolve(WORKSPACE, ".cache/blob-integration-report.json");
            writeGateArtifact(tmp, json, { volatile: [] });
            report = parseReport(tmp);
        } catch {
            /* no parseable report */
        }
    }

    const violations = [];
    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the blob-pause-seam spec exited ${res.status} with no parseable report — the integration arm did not run cleanly (a dead pause seam, an unbounded context count, a drifted README, or a broken harness wiring)`,
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
        "proof:blob-integration — the blob's INTEGRATION gate: pause parks the rAF + context bound + README consistency (AX.W16)",
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
