// AX.W00 — the π visual-runtime Playwright config.
//
// RATIFY-BEFORE-IMPL (the §FileBounds one-decision): the workspace is
// `tests-visual/` (a `package.json` workspaces member, off the publish surface);
// the headless device is **Chrome-headless-new** — Playwright's bundled Chromium
// in the new headless mode, which carries BOTH a WebGL2 backend (ANGLE → SwiftShader
// software-rasterizer, deterministic on a GPU-less CI runner) AND a WebGPU backend
// (Dawn). The aurora WebGL2 + blob WebGL2 surfaces need a real device backend; the
// `--use-gl=angle` + `--enable-unsafe-swiftshader` launch flags give a deterministic
// software GL when no GPU is present. The aurora WebGPU arm (W07) layers its own
// `--enable-unsafe-webgpu` on top in its sibling spec.
//
// PORT: the demo `dev` script is bare `vite`, serving the SPA at the vite default
// :5173 (the root vite.config.ts sets no server.port; proof-runtime.mjs spawns
// `--port 5173`). We standardize on 5173 and export it as GLASS_UI_DEMO_URL so the
// promoted `proof:dock-animation-live` driver (which the spec invokes) reaches the
// SAME origin (the legacy 5175 default in the .mjs is overridden here).

import { defineConfig, devices } from "@playwright/test";

// The demo origin the whole lane drives. `npm run dev` (bare `vite`) serves it.
const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 5173);
const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? `http://127.0.0.1:${DEMO_PORT}`;

// The library workspace root (one dir up — the `npm run dev` cwd).
const LIBRARY_ROOT = new URL("..", import.meta.url).pathname;

export default defineConfig({
    testDir: ".",
    testMatch: "*.spec.ts",
    // π lane is fail-CLOSED — no retries masking a real broken render. The 3-run
    // anti-flake tolerance is INSIDE each spec (it samples the named region N times
    // and takes a robust verdict), NOT a Playwright-level retry.
    retries: 0,
    fullyParallel: false,
    workers: 1,
    timeout: 60_000,
    reporter: [["list"], ["json", { outputFile: ".cache/pi-report.json" }]],
    use: {
        baseURL: DEMO_URL,
        // Keep the WebGL rAF live (the substrate freezes one static frame under
        // reduce; the paints-color floor still reads, but the dock morph needs
        // the animation arm live).
        reducedMotion: "no-preference",
        colorScheme: "light",
        viewport: { width: 1280, height: 800 },
    },
    projects: [
        {
            name: "chromium-headless-new",
            use: {
                ...devices["Desktop Chrome"],
                channel: undefined,
                launchOptions: {
                    // Chrome-headless-new + a deterministic software GL backend so
                    // the WebGL2 substrate paints on a GPU-less runner.
                    args: [
                        "--headless=new",
                        "--use-gl=angle",
                        "--use-angle=swiftshader",
                        "--enable-unsafe-swiftshader",
                        "--enable-unsafe-webgpu",
                        "--enable-features=Vulkan",
                        "--ignore-gpu-blocklist",
                    ],
                },
            },
        },
    ],
    // Drive the demo vite dev server. `reuseExistingServer` lets the orchestrator
    // pre-start `npm run dev` (the recon's canonical spawn) and have the lane attach.
    webServer: {
        command: "npm run dev -- --host 127.0.0.1 --port " + DEMO_PORT,
        cwd: LIBRARY_ROOT,
        url: DEMO_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: { BROWSER: "none" },
    },
});
