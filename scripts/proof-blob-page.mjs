// AZ.W-BLOB-PAGE — proof:blob-page, the TRUE blob-page defect's π DRIVER.
//
// The wave's §0 RE-GROUND BINDING re-attribution: the GL renderer is NOT re-opened
// (C6-1 / F2-R3-9-pixelation REFUTED — the bead is crisp). The TRUE defect surface is
// three things this gate measures on the LIVE /substrates/blob page:
//   1. SWATCH-EDGE-CRISP — the static WatercolorDot SVG swatch edge flung isolated dark
//      specks into the light margin at high DPR (the "pixelated/low-res" reading lived
//      HERE — CSS-px feTurbulence, not the GL bead). Measured at MAX contrast (the
//      largest swatch forced pure black, the shipped filter unchanged).
//   2. SATELLITES-SEPARATE — the page-default bead's satellites orbited INSIDE the body
//      (orbitRadius 0.17 < bodyRadius 0.22) → the orbit show was invisible. The
//      page-local orbit override (0.30 > body 0.22, 4 satellites) lifts them OUTSIDE the
//      skin → the metaball pseudopod/neck show reads (silhouette CV ≫ the swallowed
//      baseline) AND/OR a satellite separates. Source-witness: orbitRadius > bodyRadius.
//      Four-side containment HOLDS.
//   3. HERO-FIRST IA — the living GL <GooBlob> hero LEADS in DOM order; the static
//      WatercolorDot swatch row is DEMOTED below it.
//
// This driver INVOKES the π workspace spec (tests-visual/blob-page.spec.ts) via the
// workspace's Playwright runner, parses the JSON report, and emits a byte-stable gate
// artefact. The device-free GL-fence is the SEPARATE proof:blob-page-fence (ci-tagged) —
// this gate carries the three live visual π bites only.
//
// RUNNER-TRUTH (the AY W-LIVE1 lesson, NON-OPTIONAL): bites LOAD :5199, so this gate is
// auto-detected LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]) and is enumerated in
// gates.mjs HEADER_LIVE_VERIFIED. On a clean CI runner with no installed Playwright the
// gate grace-SKIPs (exit 0) via the fail-closed playwright-presence probe (the
// proof-blob-render precedent); the CI-side proof is proof:live-verified-ledger over the
// W-BLOB-PAGE DELTA. When the workspace IS present, a broken page/render exits NON-ZERO
// (fail-CLOSED — never SKIP-with-EXIT=0).

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
const REPORT = resolve(WORKSPACE, ".cache/blob-page-report.json");
const COMMAND = "npm run proof:blob-page";

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
    const ARTIFACT = gateArtifactPath("GLASS_UI_BLOB_PAGE_ARTIFACT", "AZ-blob-page");

    if (!workspacePresent()) {
        // Genuine device absence — befitting-silent SKIP (the zero-dep CI runner does
        // not carry the Playwright browser binary). NOT a false GREEN and NOT a hard RED
        // on a missing optional device. The W-BLOB-PAGE visual truth is the captured
        // DELTA backstopped by proof:live-verified-ledger; the device-free GL-fence is
        // the separate proof:blob-page-fence (which DOES run on CI).
        writeGateArtifact(ARTIFACT, {
            generatedAt: snapshotStamp(),
            status: "skipped",
            reason:
                "the tests-visual π workspace has no installed @playwright/test — run `npm i` in tests-visual + `npx playwright install chromium`, then a live demo dev server on :5199, for the rendered-pixel blob-page asserts (swatch-edge-crisp + satellites-separate + hero-first IA)",
            command: COMMAND,
        });
        console.log(
            "proof:blob-page — SKIPPED (π workspace device absent on this runner).",
        );
        console.log(
            "  The blob-page visual truth is asserted on the real device (the orchestrator runs the fail-CLOSED arm) + the ledger DELTA. The device-free GL-fence runs separately as proof:blob-page-fence.",
        );
        process.exit(0);
    }

    // The workspace IS present — fail-CLOSED. Run the spec on the chromium-headless-new
    // project only (the live π device; the coarse-touch project is for touch-geometry
    // gates, not this one). The json reporter writes to REPORT via
    // PLAYWRIGHT_JSON_OUTPUT_NAME (a bare --reporter=json streams to stdout, which the
    // list lines corrupt — the parse must read the FILE).
    const res = spawnSync(
        PW_BIN,
        ["test", "blob-page.spec.ts", "--project=chromium-headless-new", "--reporter=list,json"],
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
            const tmp = resolve(WORKSPACE, ".cache/blob-page-report.json");
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
                `the blob-page spec exited ${res.status} with no parseable report — the rendered-pixel arm did not run cleanly (a broken page, a flooded/blank render, or a harness wiring break)`,
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

    console.log("proof:blob-page — the TRUE blob-page defect's π gate (AZ.W-BLOB-PAGE)");
    console.log(`  specs passed/failed : ${report?.passed ?? "?"} / ${report?.failed ?? "?"}`);
    console.log("  bites: SWATCH-EDGE-CRISP (device-px swatch edge) + SATELLITES-SEPARATE (orbit show) + HERO-FIRST IA");
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
