// glass-ui 11.0.0 — the U line's engine witnesses in Playwright WebKit build 2287 (the
// build the dock renders in; see tests-visual/webkit-2287.config.ts). The line ran them
// in Chromium and Firefox; the 11.0.0 merge runs them in WebKit too. One worker, under
//   GLASS_UI_DEMO_PORT=… guarded --exclusive webkit -- \
//     npx playwright test -c docs/release-11.0.0/u-line-webkit.config.ts --workers=1
import { defineConfig, devices } from "@playwright/test";
import { B7_SPECS } from "../../tests-visual/b7-shape.config";

const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 7887);
const DEMO_URL = `http://127.0.0.1:${DEMO_PORT}`;
const LIBRARY_ROOT = new URL("../..", import.meta.url).pathname;
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;
const safari = (viewport: { width: number; height: number }, touch = false) => ({
    ...devices["Desktop Safari"],
    viewport,
    hasTouch: touch,
    launchOptions: { executablePath: WEBKIT_2287 },
});

export default defineConfig({
    testDir: `${LIBRARY_ROOT}tests-visual`,
    retries: 0,
    fullyParallel: false,
    workers: 1,
    timeout: 90_000,
    reporter: [["list"], ["json", { outputFile: process.env.PI_REPORT ?? ".cache/u-line-webkit.json" }]],
    use: { baseURL: DEMO_URL, reducedMotion: "no-preference", colorScheme: "light" },
    projects: [
        { name: "webkit-desk", testMatch: ["u-b7.spec.ts"], use: safari({ width: 1440, height: 900 }) },
        { name: "webkit-phone", testMatch: ["u-b7.spec.ts"], use: safari({ width: 390, height: 844 }, true) },
        { name: "webkit", testMatch: B7_SPECS, use: safari({ width: 1280, height: 800 }) },
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
