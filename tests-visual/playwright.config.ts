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
// The origin is `localhost`, never the `127.0.0.1` literal: the two are distinct
// origins to the engine's secure-context and storage partitioning, and the live-π
// discipline observes the same origin a user does.
const DEMO_PORT = Number(process.env.GLASS_UI_DEMO_PORT ?? 5199);
const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? `http://localhost:${DEMO_PORT}`;

// The library workspace root (one dir up — the `npm run dev` cwd).
const LIBRARY_ROOT = new URL("..", import.meta.url).pathname;

// The ANGLE backend. On a real-GPU dev box (darwin → Metal) we render on the ACTUAL
// device — the TRUE render path the cardinal lesson demands, and stable (software GL
// crashes the aurora WebGL2 shaders). A GPU-less CI runner degrades to SwiftShader
// (deterministic software rasterizer). Override with PI_ANGLE=swiftshader|metal.
const PI_ANGLE =
    process.env.PI_ANGLE ?? (process.platform === "darwin" ? "metal" : "swiftshader");
const ANGLE_ARGS =
    PI_ANGLE === "metal"
        ? ["--use-gl=angle", "--use-angle=metal"]
        : [
              "--use-gl=angle",
              "--use-angle=swiftshader",
              "--enable-unsafe-swiftshader",
              "--enable-features=Vulkan",
          ];

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
    // The machine report the gate's verdict is read from (never a piped exit code).
    // PI_REPORT names it per-ARM so the green and planted runs coexist — the banked
    // DELTA is the PAIR, and a shared path meant the second arm erased the first.
    reporter: [
        ["list"],
        ["json", { outputFile: process.env.PI_REPORT ?? ".cache/pi-report.json" }],
    ],
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
                    // Chrome-headless-new + the resolved ANGLE backend (real-GPU
                    // Metal on a dev box, SwiftShader on a GPU-less CI runner).
                    args: [
                        "--headless=new",
                        ...ANGLE_ARGS,
                        "--enable-unsafe-webgpu",
                        "--ignore-gpu-blocklist",
                    ],
                },
            },
        },
        {
            // AY.W-SCALE2 — the coarse/touch project: hasTouch + isMobile so
            // `@media (pointer: coarse)` MATCHES (the touch-hit-area ::before
            // overlay emits its 44px geometry here, NOT at fine pointer). An
            // iPhone-class 390×844 viewport, the SAME ANGLE launch args.
            name: "coarse-touch",
            use: {
                ...devices["Desktop Chrome"],
                channel: undefined,
                hasTouch: true,
                isMobile: true,
                viewport: { width: 390, height: 844 },
                launchOptions: {
                    args: [
                        "--headless=new",
                        ...ANGLE_ARGS,
                        "--enable-unsafe-webgpu",
                        "--ignore-gpu-blocklist",
                    ],
                },
            },
        },
        {
            // BC.W-SAFARI-WEBGL — the WebKit project: the FIRST cross-engine matrix in the
            // suite. Playwright's bundled WebKit is the closest CI-runnable proxy for
            // Safari/WebKit — the engine with the SAME `backdrop-filter: url()` absence
            // (WebKit bug 245510, OPEN) + the SAME context-eviction model that drives the
            // §H Safari flash. It runs the CROSS-ENGINE π subset ONLY (the safari-webgl
            // readback + the viz-paint/morph-stability/glass-degrade specs) — `testMatch`
            // scopes it so the chromium-only π corpus does not re-run on WebKit. No ANGLE
            // launch flags (WebKit drives its own WebGL/Metal path); the cross-engine
            // sentinel + the no-flash assert are the binding truth. The live real-paint
            // subset is `local`-tagged (a real GPU + demo); the context-event SOURCE facts
            // run headless-WebKit in CI (the proof:visual-runner split — CI proves the
            // WIRING, the local WebKit run proves the PAINT).
            name: "webkit",
            testMatch: ["safari-webgl.spec.ts", "aurora-swraster.spec.ts"],
            use: {
                ...devices["Desktop Safari"],
                viewport: { width: 1280, height: 800 },
            },
        },
    ],
    // Drive the demo vite dev server. `reuseExistingServer` lets the orchestrator
    // pre-start `npm run dev` (the recon's canonical spawn) and have the lane attach.
    webServer: {
        command: "npm run dev -- --host localhost --port " + DEMO_PORT,
        cwd: LIBRARY_ROOT,
        url: DEMO_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        env: { BROWSER: "none" },
    },
});
