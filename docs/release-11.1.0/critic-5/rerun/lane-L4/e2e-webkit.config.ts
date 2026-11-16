// Lane L4 — the e2e specs these items touch, in Playwright WebKit build 2287 (the build
// the dock renders in; 2311 crashes every page that mounts a GlassDock). One worker:
//   L4_ROOT=<tree> GLASS_UI_DEMO_PORT=… guarded --exclusive webkit -- \
//     npx playwright test -c docs/release-11.1.0/lane-L4/e2e-webkit.config.ts --workers=1
import { defineConfig, devices } from "@playwright/test";

const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 7931);
const DEMO_URL = `http://localhost:${DEMO_PORT}`;
const ROOT = process.env.L4_ROOT ?? new URL("../../..", import.meta.url).pathname;
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;

export default defineConfig({
    testDir: `${ROOT}/tests-visual`,
    testMatch: ["blob-render.spec.ts", "blob-pause-seam.spec.ts", "dark-semantic-contrast.spec.ts", "font-cascade-live.spec.ts", "dock-plate-clearance.spec.ts"],
    retries: 0,
    fullyParallel: false,
    workers: 1,
    timeout: 90_000,
    reporter: [["list"], ["json", { outputFile: process.env.PI_REPORT ?? ".cache/l4-e2e-webkit.json" }]],
    use: { baseURL: DEMO_URL, reducedMotion: "no-preference", colorScheme: "light" },
    projects: [
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"], viewport: { width: 1280, height: 800 }, launchOptions: { executablePath: WEBKIT_2287 } },
        },
    ],
    webServer: {
        command: `npx vite --host localhost --port ${DEMO_PORT} --strictPort`,
        cwd: ROOT,
        url: DEMO_URL,
        reuseExistingServer: false,
        timeout: 120_000,
        env: { BROWSER: "none" },
    },
});
