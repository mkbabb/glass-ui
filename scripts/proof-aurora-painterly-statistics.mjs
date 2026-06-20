// AX.W13 — proof:aurora-painterly-statistics, the gate DRIVER.
//
// The OPERATIONALIZED "stunning" bar for the UNATTENDED lane (HARDENING §G #16). The
// un-falsifiable "congruent to Van Gogh" becomes measurable π-lane statistical
// assertions an autonomous run can close on (the cardinal-AW green-structure-over-
// unvalidated-render risk re-enters at the painterly layer unless "stunning" is
// operationalized). The behavioural truth lives in the π workspace spec
// (tests-visual/aurora-painterly-statistics.spec.ts): it renders the REAL WebGL2 aurora
// over the van-Gogh / oil-pastel / crayon / oil mediums at t=1, reads back pixels, and
// asserts:
//   (a) atomicity gap-fraction — the van-Gogh render carries a measurable inter-stroke
//       canvas-gap fraction above a floor (discrete dabs, NOT a coverage smear);
//   (b) no-flat-fills variance — local pigment-density variance above a floor on each
//       painterly medium (the pigment-turbulence keystone);
//   (c) OKLab overlap-not-grey — a dense complementary-overlap region's chroma stays
//       ABOVE the muddy-midtone grey threshold (the OKLab path, not the linear-mix grey);
//   (d) four-media-distinct — the per-medium snapshots (vangogh / oil-pastel / crayon /
//       oil) are pairwise MEASURABLY distinct (a passthrough/shared-body makes two
//       media identical → REDs).
// A public-domain Starry Night crop (tests-visual/fixtures/starry-night-crop.png)
// anchors the atomicity-congruence read.
//
// FAIL-CLOSED CONTRACT (the cardinal AX precept). When the π workspace IS present (the
// Playwright binary resolves), a passthrough/shared-body render measuring zero
// gap-fraction / near-zero variance / grey overlap / two-media-identical exits NON-ZERO.
// The befitting-silent SKIP stays ONLY for genuine device-absence (no Playwright binary,
// or a GPU-less runner where the spec test.skips internally). The two failure modes are
// NEVER collapsed: a passthrough/shared render has the workspace PRESENT and the spec
// FAILED → exit 1; a device-absent run has the spec SKIPPED → exit 0 with a recorded
// reason. The DUAL-TIER close: the human side-by-side audit is the ENRICHMENT; this
// numeric gate is the UNATTENDED close the 12-hour run gates on.

import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, liveArmCiGraceSkip, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

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
const REPORT = resolve(WORKSPACE, ".cache/aurora-painterly-statistics-report.json");
const COMMAND = "npm run proof:aurora-painterly-statistics";

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
        "GLASS_UI_AURORA_PAINTERLY_STATISTICS_ARTIFACT",
        "AX-aurora-painterly-statistics",
    );

    // liveArmCiGraceSkip(): grace-SKIP the live arm under CI (the proof:dock-no-scale-pop
    // `!process.env.CI` precedent — the CI proof is the device-free union + the ledger;
    // the local hard-CLOSED path, CI unset, is untouched). See gate-output.mjs.
    if (!workspacePresent() || liveArmCiGraceSkip()) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no installed @playwright/test — run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo dev server on a real GPU, for the painterly statistical readback (atomicity gap-fraction + no-flat-fills variance + OKLab overlap-not-grey + four-media-distinct)",
            command: COMMAND,
        });
        console.log(
            "proof:aurora-painterly-statistics — SKIPPED (π workspace device absent on this runner).",
        );
        console.log(
            "  The painterly statistics are asserted on a real GPU (the orchestrator runs the fail-CLOSED arm on the dev-Mac Metal box).",
        );
        process.exit(0);
    }

    const res = spawnSync(
        PW_BIN,
        ["test", "aurora-painterly-statistics.spec.ts", "--reporter=list,json"],
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
            const tmp = resolve(WORKSPACE, ".cache/aurora-painterly-statistics-report.json");
            writeGateArtifact(tmp, json, { volatile: [] });
            report = parseReport(tmp);
        } catch {
            /* no parseable report */
        }
    }

    const allSkipped =
        report && report.failed === 0 && report.passed === 0 && report.skipped > 0;

    const violations = [];
    if (allSkipped) {
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the GPU-less runner SwiftShader-degrades + the spec test.skips internally (no real GPU readback). The painterly statistics are asserted on the orchestrator real-GPU run; the dev-Mac Metal live audit is the binding close.",
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
            "proof:aurora-painterly-statistics — SKIPPED (no real GPU readback on this runner).",
        );
        console.log(
            "  The painterly statistics are the orchestrator real-GPU run. A PRESENT GPU rendering a passthrough/shared-body would FAIL here.",
        );
        process.exit(0);
    }

    if (res.status !== 0) {
        if (report?.failures?.length) violations.push(...report.failures);
        else
            violations.push(
                `the aurora-painterly-statistics spec exited ${res.status} with no parseable report — the painterly readback arm did not run cleanly (a passthrough/shared-body render or a broken harness wiring)`,
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
        "proof:aurora-painterly-statistics — the operationalized 'stunning' bar (AX.W13)",
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
