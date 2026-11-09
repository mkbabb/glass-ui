// Fix 4 — tests-visual/shell-identity.spec.ts in Playwright WebKit build 2287, one worker:
//   GLASS_UI_DEMO_PORT=… guarded --exclusive webkit -- \
//     npx playwright test -c docs/release-11.0.0/fix-4/shell-identity-webkit.config.ts --workers=1
import { defineConfig, devices } from "@playwright/test";

const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 7887);
const DEMO_URL = `http://127.0.0.1:${DEMO_PORT}`;
const LIBRARY_ROOT = new URL("../../..", import.meta.url).pathname;
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;

export default defineConfig({
    testDir: `${LIBRARY_ROOT}tests-visual`,
    retries: 0,
    fullyParallel: false,
    workers: 1,
    timeout: 90_000,
    reporter: [["list"], ["json", { outputFile: process.env.PI_REPORT ?? ".cache/shell-identity-webkit.json" }]],
    use: { baseURL: DEMO_URL, reducedMotion: "no-preference", colorScheme: "light" },
    projects: [
        {
            name: "webkit",
            testMatch: ["shell-identity.spec.ts"],
            use: { ...devices["Desktop Safari"], viewport: { width: 1280, height: 800 }, launchOptions: { executablePath: WEBKIT_2287 } },
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
