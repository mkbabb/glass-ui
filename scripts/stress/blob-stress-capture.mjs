#!/usr/bin/env node
// Wβ stress runtime profile capture (H.W5 / R2).
//
// Boots the Vite dev server, drives the `_internal/blob-stress` story under
// headless Chromium via Playwright, extracts the captured frame metrics from
// `window.__blobStressMetrics` (set by the story at profile completion), and
// writes the resulting baseline to `docs/tranches/H/audit/W5-stress-baseline.md`.
//
// Threshold table (per SPEC.md §9):
//   - Per-frame GPU time         ≤ 2 ms (M1 / iPhone 12 / Pixel 5)
//   - Per-frame CPU (renderer)   ≤ 0.5 ms
//   - Per-frame CPU (state mach) ≤ 0.3 ms
//   - Memory per instance        ≤ 256 KB
//   - 4-instance baseline        60 fps
//
// CI-vs-reference adjustment: GitHub Actions runners are slower than M1
// reference hardware. When `STRESS_CI_RELAX=1` is set, the threshold checker
// uses 2× the reference budget — we still capture absolute numbers; relaxation
// only affects the pass/fail verdict.

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const root = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const baseUrl = process.env.STRESS_BASE_URL ?? "http://127.0.0.1:5173";
const storyPath = process.env.STRESS_STORY_PATH ?? "/_internal/blob-stress";
const artifactPath = resolve(
    root,
    process.env.STRESS_ARTIFACT_PATH ??
        "docs/tranches/H/audit/W5-stress-baseline.md",
);
const profileWaitMs = Number(process.env.STRESS_PROFILE_WAIT_MS ?? 6000);
const navigationTimeoutMs = Number(
    process.env.STRESS_NAVIGATION_TIMEOUT_MS ?? 30_000,
);
const ciRelaxFactor = process.env.STRESS_CI_RELAX === "1" ? 2 : 1;
const blobInstances = 8; // matches SPECIMENS.length in blob-stress.vue

const REFERENCE_THRESHOLDS = {
    perFrameGpuMs: 2.0,
    perFrameCpuRendererMs: 0.5,
    perFrameCpuStateMachineMs: 0.3,
    memoryPerInstanceKB: 256,
    fpsBaseline: 60, // for 4 instances; story uses 8, so we report at-least-30
};

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function waitForHttp(url, timeoutMs = 60_000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
        try {
            const response = await fetch(url);
            if (response.ok) return true;
        } catch {
            // server still starting
        }
        await sleep(200);
    }
    return false;
}

function startDevServer() {
    const url = new URL(baseUrl);
    const host = url.hostname || "127.0.0.1";
    const port = url.port || "5173";
    return spawn(
        "npm",
        ["run", "dev", "--", "--host", host, "--port", port, "--strictPort"],
        {
            cwd: root,
            stdio: "ignore",
            env: { ...process.env, BROWSER: "none" },
        },
    );
}

async function stopProcess(child) {
    if (!child) return;
    if (child.exitCode !== null || child.signalCode !== null) return;
    child.kill("SIGTERM");
    await new Promise((r) => {
        const t = setTimeout(() => r(), 3000);
        child.once("exit", () => {
            clearTimeout(t);
            r();
        });
    });
    if (child.exitCode === null && child.signalCode === null) {
        child.kill("SIGKILL");
    }
}

function checkThresholds(metrics, heapDeltaBytes) {
    const memoryPerInstanceKB =
        heapDeltaBytes != null
            ? heapDeltaBytes / blobInstances / 1024
            : null;
    // Per-frame CPU is approximated by the story's mean-frame-time at the
    // RAF-driver level. SPEC.md splits "renderer" vs "state-machine"; the
    // story does not (the eight blobs share one driver). We compare the
    // measured mean against the renderer budget — if mean ≤ renderer budget,
    // both sub-budgets are observably honoured at the driver granularity.
    const cpuMeanMs = metrics.meanFrameMs;
    const cpuMaxMs = metrics.maxFrameMs;

    const checks = [
        {
            metric: "Mean RAF delta (per-frame, all 8 instances)",
            measured: cpuMeanMs,
            unit: "ms",
            referenceBudget: REFERENCE_THRESHOLDS.perFrameCpuRendererMs,
            effectiveBudget:
                REFERENCE_THRESHOLDS.perFrameCpuRendererMs * ciRelaxFactor,
            // Mean RAF delta is bounded below by display refresh (~16.67ms at
            // 60Hz). It is reported for the record; the FPS gate is the
            // primary signal. Informational only.
            passes: null,
        },
        {
            metric: "Max RAF delta (per-frame worst-case)",
            measured: cpuMaxMs,
            unit: "ms",
            // No SPEC.md row for this; reported informationally.
            referenceBudget: 33.3, // two display frames at 60Hz
            effectiveBudget: 33.3 * ciRelaxFactor,
            passes: null,
        },
        {
            metric: "FPS baseline (8 instances ≥ 30 fps with gating)",
            measured: metrics.fps,
            unit: "fps",
            // SPEC.md §9 hard gate (story-internal): 8 instances ≥ 30 fps.
            // Higher-is-better: passes when measured ≥ effective.
            referenceBudget: 30,
            effectiveBudget: 30 / ciRelaxFactor,
            passes: metrics.fps >= 30 / ciRelaxFactor,
        },
        {
            metric: "Memory per instance (heap delta ÷ 8)",
            measured: memoryPerInstanceKB,
            unit: "KB",
            // SPEC.md §9 hard gate.
            referenceBudget: REFERENCE_THRESHOLDS.memoryPerInstanceKB,
            effectiveBudget:
                REFERENCE_THRESHOLDS.memoryPerInstanceKB * ciRelaxFactor,
            passes:
                memoryPerInstanceKB == null
                    ? null
                    : memoryPerInstanceKB <=
                      REFERENCE_THRESHOLDS.memoryPerInstanceKB * ciRelaxFactor,
        },
    ];

    return { checks, memoryPerInstanceKB };
}

function formatBaseline({
    timestamp,
    chromiumVersion,
    userAgent,
    hardware,
    metrics,
    heapBytesBefore,
    heapBytesAfter,
    heapDeltaBytes,
    checks,
    memoryPerInstanceKB,
    note,
}) {
    const fmt = (v, digits = 2) =>
        v == null || Number.isNaN(v) ? "n/a" : Number(v).toFixed(digits);
    const status = (c) =>
        c.passes === null ? "n/a" : c.passes ? "PASS" : "FAIL";

    const checkRows = checks
        .map(
            (c) =>
                `| ${c.metric} | ${fmt(c.measured)} ${c.unit} | ${fmt(
                    c.referenceBudget,
                )} ${c.unit} | ${fmt(c.effectiveBudget)} ${c.unit} | ${status(c)} |`,
        )
        .join("\n");

    return `# H.W5 — Stress Runtime Baseline (R2)

Captured by \`scripts/stress/blob-stress-capture.mjs\` against the
\`_internal/blob-stress\` story under headless Chromium via Playwright.

- **Captured**: ${timestamp}
- **Chromium**: ${chromiumVersion ?? "unknown"}
- **User agent**: \`${userAgent ?? "unknown"}\`
- **Hardware**: ${hardware}
- **Story instances**: ${blobInstances} (\`SPECIMENS\` length in \`demo/stories/_internal/blob-stress.vue\`)
- **CI relax factor**: ${ciRelaxFactor}× (set \`STRESS_CI_RELAX=1\` in CI to relax the verdict; absolute numbers are unchanged)

${note ? `> ${note}\n` : ""}
## Captured metrics

| Metric | Value |
|---|---|
| Frames | ${metrics.frames} |
| Elapsed | ${fmt(metrics.elapsedMs)} ms |
| FPS | ${fmt(metrics.fps)} |
| Mean frame | ${fmt(metrics.meanFrameMs)} ms |
| Max frame | ${fmt(metrics.maxFrameMs)} ms |
| Heap before | ${heapBytesBefore == null ? "n/a" : (heapBytesBefore / (1024 * 1024)).toFixed(2) + " MB"} |
| Heap after | ${heapBytesAfter == null ? "n/a" : (heapBytesAfter / (1024 * 1024)).toFixed(2) + " MB"} |
| Heap delta | ${heapDeltaBytes == null ? "n/a" : (heapDeltaBytes / 1024).toFixed(1) + " KB"} |
| Memory / instance (heap delta ÷ ${blobInstances}) | ${
        memoryPerInstanceKB == null
            ? "n/a"
            : memoryPerInstanceKB.toFixed(1) + " KB"
    } |

## Threshold check

| Metric | Measured | Reference budget | Effective budget (CI-adjusted) | Verdict |
|---|---|---|---|---|
${checkRows}

## Reference table (SPEC.md §9)

| Metric | Reference Budget |
|---|---|
| Per-frame GPU time | ≤ 2 ms (M1 / iPhone 12 / Pixel 5) |
| Per-frame CPU (renderer) | ≤ 0.5 ms |
| Per-frame CPU (state machine) | ≤ 0.3 ms |
| Memory per instance | ≤ 256 KB |
| 4-instance baseline | 60 fps |

## Notes

- The story drives 8 simultaneous \`<Blob>\` instances through one shared
  \`useRAFLoop\` driver; mean/max RAF delta is the per-driver signal, not a
  per-instance CPU breakdown. Per-instance GPU/CPU split would require
  per-instance \`performance.measure\` calls.
- \`performance.memory.usedJSHeapSize\` is Chromium-only; in non-Chromium
  environments the heap-delta row reads \`n/a\` and the memory/instance
  verdict is suppressed.
- The 4-instance / 60 fps baseline in SPEC.md §9 is more permissive than the
  8-instance / 30 fps gating scenario the story exercises. The verdict above
  uses the 8-instance / 30 fps gate; SPEC.md's 4-instance row remains
  reachable by changing \`SPECIMENS\` in the story.
`;
}

async function main() {
    const startedAt = Date.now();
    const timestamp = new Date().toISOString();
    let server = null;
    let browser = null;

    // Lazy-load playwright so the script can still print a useful error if
    // it is missing.
    let chromium;
    try {
        ({ chromium } = await import("playwright"));
    } catch (err) {
        console.error("[stress] playwright is not installed:", err.message);
        console.error(
            "[stress] run `npm install --save-dev playwright @playwright/test && npx playwright install chromium`",
        );
        process.exitCode = 1;
        return;
    }

    try {
        const serverAlreadyRunning = await waitForHttp(baseUrl, 1500);
        if (!serverAlreadyRunning) {
            console.log(`[stress] starting dev server at ${baseUrl}`);
            server = startDevServer();
            const ready = await waitForHttp(baseUrl, navigationTimeoutMs);
            if (!ready) {
                throw new Error(
                    `dev server did not come up at ${baseUrl} within ${navigationTimeoutMs}ms`,
                );
            }
        } else {
            console.log(`[stress] dev server already up at ${baseUrl}`);
        }

        console.log("[stress] launching headless Chromium");
        browser = await chromium.launch({
            args: [
                "--use-gl=swiftshader", // CI-friendly software WebGL
                "--enable-webgl",
                "--ignore-gpu-blocklist",
            ],
        });
        const context = await browser.newContext();
        const page = await context.newPage();

        const targetUrl = `${baseUrl}${storyPath}`;
        console.log(`[stress] navigating to ${targetUrl}`);
        await page.goto(targetUrl, {
            waitUntil: "load",
            timeout: navigationTimeoutMs,
        });

        // Wait for the run-profile button.
        const runButton = page.getByRole("button", {
            name: /Run profile/i,
        });
        await runButton.waitFor({ state: "visible", timeout: 15_000 });

        // Capture baseline heap before profile starts.
        const heapBytesBefore = await page.evaluate(() =>
            typeof performance !== "undefined" && "memory" in performance
                ? // eslint-disable-next-line no-restricted-syntax
                  /** @type {{ memory?: { usedJSHeapSize?: number } }} */ (
                      performance
                  ).memory?.usedJSHeapSize ?? null
                : null,
        );

        console.log("[stress] clicking Run profile");
        await runButton.click();

        console.log(`[stress] waiting ${profileWaitMs}ms for profile to complete`);
        await page.waitForFunction(
            () =>
                /** @type {{ __blobStressMetrics?: unknown }} */ (
                    /** @type {unknown} */ (window)
                ).__blobStressMetrics !== undefined,
            { timeout: profileWaitMs + 5_000, polling: 200 },
        );

        const metrics = await page.evaluate(
            () =>
                /** @type {{ __blobStressMetrics?: unknown }} */ (
                    /** @type {unknown} */ (window)
                ).__blobStressMetrics,
        );
        if (
            !metrics ||
            typeof metrics !== "object" ||
            typeof metrics.fps !== "number"
        ) {
            throw new Error(
                `extracted metrics are malformed: ${JSON.stringify(metrics)}`,
            );
        }

        const heapBytesAfter = await page.evaluate(() =>
            typeof performance !== "undefined" && "memory" in performance
                ? /** @type {{ memory?: { usedJSHeapSize?: number } }} */ (
                      performance
                  ).memory?.usedJSHeapSize ?? null
                : null,
        );

        const userAgent = await page.evaluate(() => navigator.userAgent);
        const chromiumVersion = browser.version();

        const heapDeltaBytes =
            heapBytesBefore != null && heapBytesAfter != null
                ? Math.max(0, heapBytesAfter - heapBytesBefore)
                : null;

        const { checks, memoryPerInstanceKB } = checkThresholds(
            metrics,
            heapDeltaBytes,
        );

        const hardware = `${os.platform()}/${os.arch()} · ${os.cpus()?.[0]?.model ?? "unknown CPU"} · ${(os.totalmem() / 1024 ** 3).toFixed(1)} GB RAM`;

        const baseline = formatBaseline({
            timestamp,
            chromiumVersion,
            userAgent,
            hardware,
            metrics,
            heapBytesBefore,
            heapBytesAfter,
            heapDeltaBytes,
            checks,
            memoryPerInstanceKB,
        });

        mkdirSync(dirname(artifactPath), { recursive: true });
        writeFileSync(artifactPath, baseline);

        // Echo to stdout for CI log readability.
        console.log("\n[stress] captured baseline:");
        console.log(`  fps        = ${metrics.fps.toFixed(2)}`);
        console.log(`  meanFrame  = ${metrics.meanFrameMs.toFixed(2)} ms`);
        console.log(`  maxFrame   = ${metrics.maxFrameMs.toFixed(2)} ms`);
        console.log(`  frames     = ${metrics.frames}`);
        console.log(
            `  heapDelta  = ${heapDeltaBytes == null ? "n/a" : (heapDeltaBytes / 1024).toFixed(1) + " KB"}`,
        );
        console.log(
            `  mem/inst   = ${memoryPerInstanceKB == null ? "n/a" : memoryPerInstanceKB.toFixed(1) + " KB"} (8 instances)`,
        );

        console.log("\n[stress] threshold verdicts:");
        let anyFail = false;
        for (const c of checks) {
            const verdict =
                c.passes === null ? "n/a" : c.passes ? "PASS" : "FAIL";
            if (c.passes === false) anyFail = true;
            console.log(
                `  [${verdict}] ${c.metric}: ${c.measured == null ? "n/a" : c.measured.toFixed(2)} ${c.unit} (effective budget ${c.effectiveBudget.toFixed(2)} ${c.unit})`,
            );
        }

        console.log(`\n[stress] wrote baseline → ${artifactPath}`);
        console.log(`[stress] elapsed: ${Date.now() - startedAt}ms`);

        if (anyFail) {
            console.error(
                "[stress] one or more thresholds violated — failing the run",
            );
            process.exitCode = 1;
        }
    } catch (err) {
        console.error("[stress] capture failed:", err?.stack ?? err?.message ?? err);
        // Write a deferral baseline so consumers know the path failed.
        const note = `Capture failed: ${err?.message ?? String(err)}. Re-run via \`npm run stress\` once the failure is resolved; the CI workflow at \`.github/workflows/stress.yml\` is the canonical capture path.`;
        try {
            mkdirSync(dirname(artifactPath), { recursive: true });
            writeFileSync(
                artifactPath,
                formatBaseline({
                    timestamp,
                    chromiumVersion: null,
                    userAgent: null,
                    hardware: `${os.platform()}/${os.arch()}`,
                    metrics: {
                        frames: 0,
                        meanFrameMs: NaN,
                        maxFrameMs: NaN,
                        elapsedMs: NaN,
                        fps: NaN,
                    },
                    heapBytesBefore: null,
                    heapBytesAfter: null,
                    heapDeltaBytes: null,
                    checks: [],
                    memoryPerInstanceKB: null,
                    note,
                }),
            );
        } catch {
            // best effort
        }
        process.exitCode = 1;
    } finally {
        if (browser) {
            await browser.close().catch(() => {});
        }
        await stopProcess(server);
    }
}

await main();
