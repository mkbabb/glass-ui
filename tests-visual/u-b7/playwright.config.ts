// glass-ui U/B7 engine witnesses (atlas, proposed 10.2.0): Chromium (headless shell,
// desk and coarse) and Firefox. One worker. The demo dev server is the harness host,
// on the port GLASS_UI_DEMO_PORT names (the atlas formation runs it on 7812).
import { defineConfig, devices } from "@playwright/test";

const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 7812);
const DEMO_URL = `http://127.0.0.1:${DEMO_PORT}`;
const LIBRARY_ROOT = new URL("../..", import.meta.url).pathname;

export default defineConfig({
    testDir: "..",
    testMatch: "u-b7.spec.ts",
    retries: 0,
    fullyParallel: false,
    workers: 1,
    timeout: 90_000,
    reporter: [["list"], ["json", { outputFile: process.env.PI_REPORT ?? ".cache/u-b7-report.json" }]],
    use: { baseURL: DEMO_URL, reducedMotion: "no-preference", colorScheme: "light" },
    projects: [
        { name: "chromium-desk", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
        {
            name: "chromium-coarse",
            use: { ...devices["Desktop Chrome"], hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } },
        },
        { name: "firefox-desk", use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } } },
        {
            name: "firefox-phone",
            use: { ...devices["Desktop Firefox"], hasTouch: true, viewport: { width: 390, height: 844 } },
        },
    ],
    webServer: {
        command: `npx vite --host 127.0.0.1 --port ${DEMO_PORT} --strictPort`,
        cwd: LIBRARY_ROOT,
        url: DEMO_URL,
        reuseExistingServer: false,
        timeout: 120_000,
        env: { BROWSER: "none" },
    },
});
