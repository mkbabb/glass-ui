// BJ.W2 BLUR REDRESS — the dedicated cross-engine paint-proof runner.
//
// This config exists so the W2 blur paint-proof runs on BOTH engines the
// adjudication mandates (current Chromium + Safari/WebKit) WITHOUT editing the shared
// tests-visual/playwright.config.ts (whose `webkit` project is testMatch-scoped to
// the WebGL cross-engine subset and would otherwise exclude this spec). It is OWNED by
// the W2 evidence lane — it drives exactly the two W2 specs, reuses the running demo
// dev server, and writes nothing to the publish surface.
//
// Engines / projects:
//   chromium       — the LIVE painted-receiver matrix (real Dialog + Drawer immersive
//                    scrim, synthetic calm/overlay/deep plates, the 2dppx overlay proof
//                    + mutation bite). Also CAPTURES w2-compiled.css for the WebKit arm,
//                    so it must run before the webkit projects.
//   webkit         — the bundled-WebKit static-cascade harness at 1dppx.
//   webkit-2dppx   — the same harness at deviceScaleFactor:2, carrying the overlay
//                    every-DPR proof + the mutation bite on WebKit.
// Viewports: 1440×900 and 390×844 are iterated INSIDE each spec (setViewportSize) so
//            every engine covers both; the project default is the desktop rung.
//
// Run (chromium first — it writes w2-compiled.css the webkit arm reads):
//   npx playwright test --config docs/tranches/BJ/evidence/W2-BLUR-REDRESS/w2-blur.config.ts

import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

// …/BJ/evidence/W2-BLUR-REDRESS/ → root → tests-visual (five dirs up).
const TESTS_VISUAL_DIR = fileURLToPath(
    new URL("../../../../../tests-visual", import.meta.url),
);
const LIBRARY_ROOT = fileURLToPath(new URL("../../../../..", import.meta.url));

const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 5199);
const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? `http://localhost:${DEMO_PORT}`;

export default defineConfig({
    testDir: TESTS_VISUAL_DIR,
    testMatch: /w2-blur-redress(\.webkit)?\.spec\.ts/,
    retries: 0,
    fullyParallel: false,
    workers: 1,
    timeout: 60_000,
    reporter: [
        ["list"],
        [
            "json",
            {
                outputFile:
                    process.env.PI_REPORT ??
                    fileURLToPath(new URL("./run-report.json", import.meta.url)),
            },
        ],
    ],
    use: {
        baseURL: DEMO_URL,
        reducedMotion: "no-preference",
        colorScheme: "light",
        viewport: { width: 1440, height: 900 },
    },
    projects: [
        {
            // The binding live painted-receiver matrix + the compiled-CSS capture.
            name: "chromium",
            testMatch: "w2-blur-redress.spec.ts",
            use: {
                ...devices["Desktop Chrome"],
                channel: undefined,
                viewport: { width: 1440, height: 900 },
                launchOptions: { args: ["--headless=new"] },
            },
        },
        {
            // Safari/WebKit — the captured-cascade harness at 1dppx (the demo SPA
            // crashes bundled WebKit, so setContent over w2-compiled.css, no server).
            name: "webkit",
            testMatch: "w2-blur-redress.webkit.spec.ts",
            dependencies: ["chromium"],
            use: {
                ...devices["Desktop Safari"],
                viewport: { width: 1440, height: 900 },
                // Pin 1dppx explicitly — the Desktop Safari descriptor defaults to a
                // Retina deviceScaleFactor of 2, which would collapse both WebKit
                // projects onto 2dppx and lose the genuine 1-vs-2 every-DPR comparison.
                deviceScaleFactor: 1,
            },
        },
        {
            // WebKit at 2dppx — the overlay every-DPR proof + the mutation bite.
            name: "webkit-2dppx",
            testMatch: "w2-blur-redress.webkit.spec.ts",
            dependencies: ["chromium"],
            use: {
                ...devices["Desktop Safari"],
                viewport: { width: 1440, height: 900 },
                deviceScaleFactor: 2,
            },
        },
    ],
    webServer: {
        command: "npm run demo:serve -- --host localhost --port " + DEMO_PORT,
        cwd: LIBRARY_ROOT,
        url: DEMO_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: { BROWSER: "none" },
    },
});
