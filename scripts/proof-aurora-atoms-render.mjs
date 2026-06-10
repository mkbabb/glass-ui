// AX.W10 / AY.W-AUR-STUDIO — proof:aurora-atoms-render, the gate DRIVER.
//
// The π-lane PER-ATOM visible-change device gate (AX.W10 RED witness 6). The behavioural
// truth lives in the π workspace spec (tests-visual/aurora-atoms-render.spec.ts): it routes
// to the LIVE atoms story (/substrates/aurora), drives EACH atom control
// (seed/colorEnergy/zones/noise/medium), reads back the canvas centre region, and asserts it
// VISIBLY changes between atom states — the atoms are WIRED, not dead.
//
// W-AUR-STUDIO re-skin: the drivers route onto the library's own LabeledSelect (reka Select —
// role=combobox/listbox/option) + LabeledSlider (reka SliderRoot — role=slider thumb), NOT the
// native <select>/<input type=range> the panel re-skin removed. Before the re-skin the spec
// timed out at locator.selectOption / input.fill against absent native markup (born-RED).
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept). When the π workspace IS present (the
// Playwright binary resolves) and a real GPU paints, an inert (unwired) atom measuring a
// below-floor delta exits NON-ZERO. The befitting-silent SKIP stays ONLY for genuine
// device-absence (no Playwright binary). The served-app sentinel (D7) FAILS-not-skips when a
// foreign app holds the port, so a wrong-app run cannot clobber status:pass → status:skipped.

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
const REPORT = resolve(WORKSPACE, ".cache/aurora-atoms-render-report.json");
const COMMAND = "npm run proof:aurora-atoms-render";

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
                const allPassed =
                    results.length > 0 && results.every((r) => r.status === "passed");
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
        "GLASS_UI_AURORA_ATOMS_RENDER_ARTIFACT",
        "AX-aurora-atoms-render",
    );

    if (!workspacePresent()) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no installed @playwright/test — run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo dev server on a real GPU, for the per-atom visible-change readback (the atoms are WIRED, not dead).",
            command: COMMAND,
        });
        console.log(
            "proof:aurora-atoms-render — SKIPPED (π workspace device absent on this runner).",
        );
        console.log(
            "  The per-atom visible change is asserted on a real GPU (the orchestrator runs the fail-CLOSED arm on the dev-Mac Metal box).",
        );
        process.exit(0);
    }

    const res = spawnSync(
        PW_BIN,
        ["test", "aurora-atoms-render.spec.ts", "--reporter=list,json"],
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
            const tmp = resolve(WORKSPACE, ".cache/aurora-atoms-render-report.json");
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
                "the GPU-less runner SwiftShader-degrades + the spec test.skips internally (no real GPU readback). The per-atom visible change is asserted on the orchestrator real-GPU run; the dev-Mac Metal live audit is the binding close.",
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
            "proof:aurora-atoms-render — SKIPPED (no real GPU readback on this runner).",
        );
        process.exit(0);
    }

    const violations = [];
    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the aurora-atoms-render spec exited ${res.status} with no parseable report — the per-atom readback arm did not run cleanly (an inert atom or a broken harness wiring)`,
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
        },
        violations,
    });

    console.log("proof:aurora-atoms-render — the per-atom visible-change device gate (AX.W10)");
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
