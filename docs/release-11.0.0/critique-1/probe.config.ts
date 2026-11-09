// glass-ui 11.0.0 critique 1 — probe config. Chromium headless (desk + coarse phone) and
// Playwright WebKit 2287 (desk + touch phone). WebKit runs only under
// `guarded --exclusive webkit`.
import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 7941);
const ROOT = new URL("../../..", import.meta.url).pathname;
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;
const chrome = { ...devices["Desktop Chrome"], channel: undefined, launchOptions: { args: ["--headless=new"] } };
const safari = { ...devices["Desktop Safari"], launchOptions: { executablePath: WEBKIT_2287 } };

export default defineConfig({
    testDir: ".",
    testMatch: "probe.spec.ts",
    retries: 0,
    workers: 1,
    timeout: 60_000,
    reporter: [["list"], ["json", { outputFile: process.env.PI_REPORT ?? "probe.json" }]],
    use: { baseURL: `http://127.0.0.1:${PORT}`, reducedMotion: "no-preference", colorScheme: "light" },
    projects: [
        { name: "chromium-1440-fine", use: { ...chrome, viewport: { width: 1440, height: 900 } } },
        { name: "chromium-390-coarse", use: { ...chrome, viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
        { name: "webkit-1440-fine", use: { ...safari, viewport: { width: 1440, height: 900 } } },
        { name: "webkit-390-coarse", use: { ...safari, viewport: { width: 390, height: 844 }, hasTouch: true } },
    ],
    webServer: {
        command: `npx vite --host 127.0.0.1 --port ${PORT} --strictPort`,
        cwd: ROOT,
        url: `http://127.0.0.1:${PORT}`,
        reuseExistingServer: false,
        timeout: 120_000,
        env: { BROWSER: "none" },
    },
});
