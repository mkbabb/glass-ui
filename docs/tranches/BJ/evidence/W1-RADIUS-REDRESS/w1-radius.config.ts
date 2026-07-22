// BJ.W1 RADIUS REDRESS — the dedicated cross-engine paint-proof runner.
//
// This config exists so the W1 radius paint-proof runs on BOTH engines the
// adjudication mandates (current Chromium + Safari/WebKit) WITHOUT editing the
// shared tests-visual/playwright.config.ts (whose `webkit` project is
// testMatch-scoped to the WebGL cross-engine subset and would otherwise exclude
// this spec). It is OWNED by the W1 evidence lane — it drives exactly one spec,
// reuses the already-running demo dev server, and writes nothing to the publish
// surface.
//
// Engines:   chromium  (Desktop Chrome)  — fine pointer
//            webkit    (Desktop Safari)  — fine pointer, the Safari cascade truth
//            chromium-coarse             — hasTouch + isMobile 390×844 so
//                                          `@media (pointer: coarse)` matches for the
//                                          TagsInput 44px hit-floor inset check.
// Viewports: 1440×900 and 390×844 are iterated INSIDE the spec (setViewportSize)
//            so every engine covers both; the project default is the desktop rung.

import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";

// tests-visual/ is five directories up from this file
// (…/BJ/evidence/W1-RADIUS-REDRESS/ → root → tests-visual).
const TESTS_VISUAL_DIR = fileURLToPath(
    new URL("../../../../../tests-visual", import.meta.url),
);
const LIBRARY_ROOT = fileURLToPath(new URL("../../../../..", import.meta.url));

const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 5199);
const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? `http://localhost:${DEMO_PORT}`;

export default defineConfig({
    testDir: TESTS_VISUAL_DIR,
    // Both arms: the live Chromium painted-receiver matrix + the WebKit compiled-CSS
    // cascade harness. Each project scopes to its own spec via `testMatch` below.
    testMatch: /(w1-radius-redress(\.webkit)?|_capture_css)\.spec\.ts/,
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
            // One-shot helper: unions every route's injected CSS for the WebKit harness.
            name: "chromium-capture",
            testMatch: "_capture_css.spec.ts",
            use: {
                ...devices["Desktop Chrome"],
                channel: undefined,
                viewport: { width: 1440, height: 900 },
                launchOptions: { args: ["--headless=new"] },
            },
        },
        {
            // The binding live painted-receiver matrix.
            name: "chromium",
            testMatch: "w1-radius-redress.spec.ts",
            use: {
                ...devices["Desktop Chrome"],
                channel: undefined,
                viewport: { width: 1440, height: 900 },
                launchOptions: { args: ["--headless=new"] },
            },
        },
        {
            name: "chromium-coarse",
            testMatch: "w1-radius-redress.spec.ts",
            use: {
                ...devices["Desktop Chrome"],
                channel: undefined,
                hasTouch: true,
                isMobile: true,
                viewport: { width: 390, height: 844 },
                launchOptions: { args: ["--headless=new"] },
            },
        },
        {
            // Safari/WebKit — the CSS-cascade + corner-paint arm. It drives the
            // compiled-CSS harness spec (setContent, no demo server) because the live
            // demo's JS shell crashes bundled WebKit (see the webkit spec header).
            name: "webkit",
            testMatch: "w1-radius-redress.webkit.spec.ts",
            use: {
                ...devices["Desktop Safari"],
                viewport: { width: 1440, height: 900 },
            },
        },
    ],
    webServer: {
        command:
            "npm run demo:serve -- --host localhost --port " + DEMO_PORT,
        cwd: LIBRARY_ROOT,
        url: DEMO_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: { BROWSER: "none" },
    },
});
