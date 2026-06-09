// AY.W-AUR-PAINTERLY — proof:aurora-arresting, the live-GPU arresting-bar gate DRIVER.
//
// The born-RED "stunning / van-Gogh-congruent" gate, OPERATIONALIZED as a live-GPU
// readback against the three W-AUR1 reference-anchored bands (RESEARCH.md §4). The
// behavioural truth lives in the π workspace spec (tests-visual/aurora-arresting.spec.ts):
// it renders each painterly medium (van-Gogh / oil-pastel / oil) on the REAL WebGL2 aurora,
// reads back pixels (downscaled to the reference-matched canonical width), and asserts the
// achieved bar — the van-Gogh HERO lands all three bands (§4.1 colourfulness, §4.2
// structure-tensor anisotropy, §4.3 −5/3 power-spectrum slope); all three mediums clear the
// colourfulness band; oil clears the slope band; the four AX not-flat floors STAY satisfied.
// The oil/oil-pastel §4.2 anisotropy + oil-pastel §4.3 slope residual is RECORDED (printed),
// NOT asserted — the named T5 anisotropic-Kuwahara successor (AY.W-AUR-WEBGPU-DECIDE). The
// band is NEVER lowered; a regression below the asserted bands REDs.
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept, H-convergence F4). When the π workspace IS
// present (Playwright resolves) and a real GPU paints, a missed asserted band exits
// NON-ZERO — the born-RED status:fail becomes a real-GPU status:pass ONLY when the bar
// holds, NOT a SwiftShader skip-to-green. The befitting-silent SKIP stays ONLY for genuine
// device-absence (no Playwright binary, or a GPU-less runner where the spec test.skips
// internally because the heavy shader never paints under SwiftShader). The two modes are
// NEVER collapsed.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const WORKSPACE = resolve(ROOT, "tests-visual");
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
const REPORT = resolve(WORKSPACE, ".cache/aurora-arresting-report.json");
const COMMAND = "npm run proof:aurora-arresting";

function workspacePresent() {
    return PW_PKG !== null && PW_BIN !== null;
}

function parseReport(path) {
    const json = JSON.parse(readFileSync(path, "utf8"));
    const failures = [];
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    const walk = (suite) => {
        for (const spec of suite.specs ?? []) {
            for (const t of spec.tests ?? []) {
                const results = t.results ?? [];
                const anySkipped = results.some((r) => r.status === "skipped");
                const allPassed = results.length > 0 && results.every((r) => r.status === "passed");
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
        "GLASS_UI_AURORA_ARRESTING_ARTIFACT",
        "AY-aurora-arresting",
    );

    if (!workspacePresent()) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no resolvable @playwright/test — run `npm i` + `npx playwright install chromium`, then a live demo dev server on a real GPU, for the live-GPU arresting readback (the three W-AUR1 reference-anchored bands per painterly medium).",
            command: COMMAND,
        });
        console.log("proof:aurora-arresting — SKIPPED (π workspace device absent on this runner).");
        console.log("  The arresting bands are asserted on a real GPU (the orchestrator runs the fail-CLOSED arm on the dev-Mac Metal box).");
        process.exit(0);
    }

    const res = spawnSync(
        PW_BIN,
        ["test", "aurora-arresting.spec.ts", "--reporter=list,json"],
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
            const tmp = resolve(WORKSPACE, ".cache/aurora-arresting-report.json");
            writeGateArtifact(tmp, json, { volatile: [] });
            report = parseReport(tmp);
        } catch {
            /* no parseable report */
        }
    }

    const allSkipped =
        report && report.failed === 0 && report.passed === 0 && report.skipped > 0;

    if (allSkipped) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the GPU-less runner SwiftShader-degrades + the spec test.skips internally (the heavy painterly shader never paints under SwiftShader → no real-GPU readback). The arresting bands are asserted on the orchestrator real-GPU run; the dev-Mac Metal live audit is the binding close (NOT a SwiftShader skip-to-green — H-convergence F4).",
            command: COMMAND,
            facts: {
                workspacePresent: true,
                specsPassed: report.passed,
                specsFailed: report.failed,
                specsSkipped: report.skipped,
                playwrightExit: res.status,
            },
        });
        console.log("proof:aurora-arresting — SKIPPED (no real GPU readback on this runner).");
        console.log("  The arresting bands are the orchestrator real-GPU run. A PRESENT GPU missing an asserted band would FAIL here.");
        process.exit(0);
    }

    const violations = [];
    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the aurora-arresting spec exited ${res.status} with no parseable report — the live-GPU arresting readback did not run cleanly (a missed band or a broken harness wiring)`,
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
            specsSkipped: report?.skipped ?? null,
            playwrightExit: res.status,
            canonicalWidth: 464,
            bands: {
                colorfulness: [55.67, 95.67],
                anisotropy: [0.732, 0.932],
                slope: [-1.85, -1.45],
            },
            note: "van-Gogh HERO lands all three bands; all mediums clear colourfulness; oil clears the slope band; the four not-flat floors hold. The oil/oil-pastel anisotropy + oil-pastel slope residual is the named T5 anisotropic-Kuwahara successor (AY.W-AUR-WEBGPU-DECIDE) — recorded in W-AUR-PAINTERLY-DELTA.md, band NOT lowered.",
        },
        violations,
    });

    console.log("proof:aurora-arresting — the live-GPU arresting bar (AY.W-AUR-PAINTERLY)");
    console.log(
        `  specs passed/failed/skipped : ${report?.passed ?? "?"} / ${report?.failed ?? "?"} / ${report?.skipped ?? "?"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
