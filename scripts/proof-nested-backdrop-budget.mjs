// AY.W-A11Y-PERF G4 — proof:nested-backdrop-budget — the nested-backdrop DEPTH +
// frame-budget gate driver.
//
// Runs the tests-visual π workspace spec `nested-backdrop-budget.spec.ts` (Chromium,
// the resident π engine) which mounts the glass-Button-in-glass-Card-in-glass-Dialog
// stack on the live demo, measures the nested backdrop-filter DEPTH + a frame-time
// series under a scroll/resize jiggle, and asserts the depth ≤ the documented ceiling,
// `contain: paint` present on the glass stacking surfaces, and the median frame under
// the 60fps budget.
//
// House style mirrors proof-touch-target.mjs: FAIL-CLOSED when the π workspace + a live
// demo are present, befitting-SKIP (exit 0, logged) only on a zero-device runner.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);

const DEMO_PORT = process.env.GLASS_UI_DEMO_PORT ?? "5173";
const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? `http://localhost:${DEMO_PORT}`;

function log(msg) {
    console.log(`[proof:nested-backdrop-budget] ${msg}`);
}

let playwrightPresent = false;
try {
    require.resolve("@playwright/test");
    playwrightPresent = true;
} catch {
    playwrightPresent = false;
}

const specPath = `${ROOT}tests-visual/nested-backdrop-budget.spec.ts`;
if (!playwrightPresent || !existsSync(specPath)) {
    log(
        `befitting-SKIP — the π workspace device backend is absent (playwright:${playwrightPresent}, spec:${existsSync(specPath)}). The binding frame-budget readback runs where the workspace is installed.`,
    );
    process.exit(0);
}

log(`running nested-backdrop-budget.spec.ts against ${DEMO_URL}`);
const res = spawnSync(
    "npx",
    [
        "playwright",
        "test",
        "nested-backdrop-budget.spec.ts",
        "--project=chromium-headless-new",
    ],
    {
        cwd: `${ROOT}tests-visual`,
        stdio: "inherit",
        env: {
            ...process.env,
            GLASS_UI_DEMO_PORT: DEMO_PORT,
            GLASS_UI_DEMO_URL: DEMO_URL,
        },
    },
);

if (res.status !== 0) {
    log(
        `RED — the nested-backdrop stack exceeds the depth ceiling, lacks paint containment, or blows the frame budget. See the readout above + .cache/nested-backdrop-budget.json.`,
    );
    process.exit(1);
}
log("GREEN — the nested-glass stack stays within the depth + frame budget; paint containment present.");
process.exit(0);
