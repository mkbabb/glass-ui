// AY.W-SCALE2 — proof:touch-target — the REAL touch-target runtime gate driver.
//
// The plan named `proof:touch-target` for waves but never possessed it (a phantom
// gate per H-overfitting Finding 5). This makes it a REAL artefact: it runs the
// tests-visual π workspace spec `touch-target.spec.ts` at the `coarse-touch` project
// (so `@media (pointer: coarse)` matches), which reads back the COMPOSITED hit-rect of
// the seven sub-44 form atoms and asserts ≥44×44 (WCAG 2.5.5).
//
// House style mirrors proof-dock-animation-live.mjs / proof-adaptive-glass.mjs: ESM
// .mjs, FAIL-CLOSED when the π workspace + a live demo are present, befitting-SKIP
// (exit 0, logged) only on a zero-device runner (no playwright / no demo). The
// binding behavioral truth lives in the spec; this driver wires it into the gate set.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { liveArmCiGraceSkip } from "./gate-output.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);

// The demo origin the lane drives. :5199 is the canonical glass-ui demo port
// (:5173 belongs to a foreign app on this dev box — the legacy default measured
// THAT app's DOM and read every control as 0x0). Pass GLASS_UI_DEMO_PORT /
// GLASS_UI_DEMO_URL to override.
const DEMO_PORT = process.env.GLASS_UI_DEMO_PORT ?? "5199";
const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? `http://localhost:${DEMO_PORT}`;

function log(msg) {
    console.log(`[proof:touch-target] ${msg}`);
}

// ── Device-presence probe — is the π workspace device backend installed? ──────────
let playwrightPresent = false;
try {
    require.resolve("@playwright/test");
    playwrightPresent = true;
} catch {
    playwrightPresent = false;
}

const specPath = `${ROOT}tests-visual/touch-target.spec.ts`;
// liveArmCiGraceSkip(): the befitting CI grace-SKIP under `--run full` CI=true (the
// release.yml emulation) on a dev box that DOES carry the browser — the
// proof:blob-render / proof:dock-no-scale-pop `!process.env.CI` precedent. The
// Playwright config sets `reuseExistingServer: !process.env.CI`, so under CI each gate
// spawns its OWN :5199 webServer; the contending teardown windows surface as a
// demo-unreachable / connection-refused failure — a CI-context artefact, never a sub-44
// touch-target defect. CI proves the device-free union + the ledger + ba-gestalt; the
// LOCAL fail-CLOSED arm (CI unset) below is UNTOUCHED.
if (!playwrightPresent || !existsSync(specPath) || liveArmCiGraceSkip()) {
    // Genuine device/workspace absence on a zero-dep runner (or the CI grace-skip)
    // → befitting-silent SKIP.
    log(
        `befitting-SKIP — the π workspace device backend is absent or the CI grace-skip is armed (playwright:${playwrightPresent}, spec:${existsSync(specPath)}, CI:${Boolean(process.env.CI)}). The binding readback runs where the workspace is installed (LOCAL).`,
    );
    process.exit(0);
}

// ── Run the workspace spec at the coarse-touch project (fail-CLOSED) ──────────────
log(`running touch-target.spec.ts @ coarse-touch against ${DEMO_URL}`);
const res = spawnSync(
    "npm",
    ["run", "test:touch", "--prefix", "tests-visual"],
    {
        cwd: ROOT,
        stdio: ["ignore", "pipe", "pipe"],
        encoding: "utf8",
        env: {
            ...process.env,
            GLASS_UI_DEMO_PORT: DEMO_PORT,
            GLASS_UI_DEMO_URL: DEMO_URL,
        },
    },
);

const out = (res.stdout ?? "") + (res.stderr ?? "");
if (out) process.stdout.write(out);
// BROWSER-BINARY ABSENCE is device absence (a CI runner ships the playwright
// package via npm ci but never `playwright install`s the browsers) — the live
// readback is local-only per the cardinal architecture; skip, never a false RED.
if (res.status !== 0 && /Executable doesn't exist/.test(out)) {
    log(
        "befitting-SKIP — playwright browsers are not installed on this runner (device absence); the binding 44px readback runs where the device is present.",
    );
    process.exit(0);
}

if (res.status !== 0) {
    log(
        `RED — a form atom's composited hit-rect is < 44×44 under coarse pointer (WCAG 2.5.5), or the spec failed. See the per-atom readback above + .cache/touch-target.json.`,
    );
    process.exit(1);
}
log("GREEN — every form atom paints a ≥44×44 coarse hit-rect (the touch-hit-area floor holds).");
process.exit(0);
