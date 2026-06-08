// AX.W07 — proof:aurora-webgpu-render, the gate DRIVER.
//
// The π-lane DEVICE render-and-readback gate for the aurora WGSL twin (the black-canvas
// class). The behavioral truth lives in the π workspace spec
// (tests-visual/aurora-webgpu-render.spec.ts): it builds the REAL `aurora.wgsl.ts`
// pipeline + the REAL `packGPUUniforms` on a real `GPUDevice`, draws the DEFAULT config
// at t=1, and reads back the centre pixel + the raw uniform buffer (per-i32-field
// decode) + the WebGL2-vs-WebGPU delta + the `WEBGPU_PARITY`-resolves-"webgl" routing.
// This driver INVOKES that spec via the workspace's Playwright runner, parses the JSON
// report, and emits a byte-stable gate artefact through gate-output.mjs.
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept). When the π workspace IS present
// (the Playwright binary resolves), a present-device-renders-BLACK exits NON-ZERO. The
// befitting-silent SKIP stays ONLY for the genuine device-absence: a zero-dep runner
// with no installed Playwright binary, OR a present runner whose `navigator.gpu` is
// absent (headless Chromium has NO WebGPU even with --enable-unsafe-webgpu, per
// W00-orchestrator-integration.md PoC #1 — the spec test.skips that case INTERNALLY, so
// the Playwright report shows the specs as SKIPPED, not failed). The two failure modes
// are NEVER collapsed: a wiring break / black render has the workspace PRESENT and the
// spec FAILED → exit 1; a device-absent run has the spec SKIPPED → exit 0 with a
// recorded reason. The binding 1b (Metal var<uniform> miscompile) close is the dev-Mac
// VISUAL-TRUTH live audit, NOT this CI gate (a non-Metal runner goes green with only
// fix 1a — see the wave spec HardGate backend-coverage note).

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
const REPORT = resolve(WORKSPACE, ".cache/aurora-webgpu-report.json");
const COMMAND = "npm run proof:aurora-webgpu-render";

/** Whether the π workspace carries an INSTALLED Playwright (the device present). */
function workspacePresent() {
    return PW_PKG !== null && PW_BIN !== null;
}

/** Parse the Playwright JSON report into {passed, failed, skipped, failures}. */
function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    const failures = [];
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                // A test.skip()'d spec reports status "skipped" on its result.
                const results = t.results ?? [];
                const anySkipped = results.some(
                    (r) => r.status === "skipped",
                );
                const allPassed =
                    results.length > 0 &&
                    results.every((r) => r.status === "passed");
                if (anySkipped) skipped++;
                else if (allPassed) passed++;
                else {
                    failed++;
                    const msg = results
                        .flatMap((r) => r.errors ?? [])
                        .map((e) => (e.message ?? "").split("\n")[0])
                        .join(" | ");
                    failures.push(`${spec.title}: ${msg}`);
                }
            }
        }
        for (const child of suite.suites ?? []) walk(child);
    };
    for (const suite of json.suites ?? []) walk(suite);
    return { passed, failed, skipped, failures };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_AURORA_WEBGPU_RENDER_ARTIFACT",
        "AX-aurora-webgpu-render",
    );

    if (!workspacePresent()) {
        // Genuine device absence — befitting-silent SKIP (the zero-dep runner does not
        // carry the Playwright browser binary). NOT a false GREEN, NOT a hard RED. The
        // orchestrator runs the fail-CLOSED arm on a real-WebGPU Chrome (the dev-Mac
        // Metal box is the binding 1b close). Distinct from a wiring break — that would
        // have the workspace PRESENT and the render broken → exit 1 below.
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no installed @playwright/test — run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo dev server on a WebGPU-capable browser, for the device render-and-readback assert",
            command: COMMAND,
        });
        console.log(
            "proof:aurora-webgpu-render — SKIPPED (π workspace device absent on this runner).",
        );
        console.log(
            "  The WGSL black-canvas truth is asserted on a real WebGPU device (the orchestrator runs the fail-CLOSED arm on the dev-Mac Metal box).",
        );
        process.exit(0);
    }

    // The workspace IS present — fail-CLOSED from here. Run the spec. The json reporter
    // writes the report to REPORT deterministically via PLAYWRIGHT_JSON_OUTPUT_NAME (a
    // bare --reporter=json streams to stdout, which the list lines corrupt — the parse
    // must read the FILE).
    const res = spawnSync(
        PW_BIN,
        ["test", "aurora-webgpu-render.spec.ts", "--reporter=list,json"],
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
            const tmp = resolve(WORKSPACE, ".cache/aurora-webgpu-report.json");
            writeGateArtifact(tmp, json, { volatile: [] });
            report = parseReport(tmp);
        } catch {
            /* no parseable report */
        }
    }

    // The device-absent disposition: every spec test.skip'd on a headless (no WebGPU)
    // runner reports SKIPPED — a befitting-silent CI SKIP, NOT a black-render RED.
    const allSkipped =
        report && report.failed === 0 && report.passed === 0 && report.skipped > 0;

    const violations = [];
    if (allSkipped) {
        // navigator.gpu absent — the spec skipped internally. Befitting-silent.
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "navigator.gpu absent on this runner (headless Chromium has no WebGPU, even with --enable-unsafe-webgpu — W00 PoC #1). The device render-and-readback is asserted on the orchestrator real-WebGPU run; the dev-Mac Metal live audit is the binding 1b close.",
            command: COMMAND,
            facts: {
                workspacePresent: true,
                specsPassed: report.passed,
                specsFailed: report.failed,
                specsSkipped: report.skipped,
                playwrightExit: res.status,
            },
        });
        console.log(
            "proof:aurora-webgpu-render — SKIPPED (navigator.gpu absent — headless Chromium has no WebGPU).",
        );
        console.log(
            "  The WGSL render truth is the orchestrator real-WebGPU run (dev-Mac Metal). A PRESENT device rendering black would FAIL here.",
        );
        process.exit(0);
    }

    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the aurora-webgpu-render spec exited ${res.status} with no parseable report — the device render-and-readback arm did not run cleanly (a black render or a broken harness wiring)`,
            );
    }

    const status =
        violations.length === 0 && res.status === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            workspacePresent: true,
            specsPassed: report?.passed ?? null,
            specsFailed: report?.failed ?? null,
            specsSkipped: report?.skipped ?? null,
            playwrightExit: res.status,
        },
        violations,
    });

    console.log(
        "proof:aurora-webgpu-render — the WGSL black-canvas device render-and-readback gate (AX.W07)",
    );
    console.log(
        `  specs passed/failed/skipped : ${report?.passed ?? "?"} / ${report?.failed ?? "?"} / ${report?.skipped ?? "?"}`,
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
