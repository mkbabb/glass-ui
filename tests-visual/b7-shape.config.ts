// U/B7 G1 — the shape-and-glide witnesses, in Chromium (Playwright's headless shell) and
// Firefox. One worker, one browser per project run, a new context per test. The demo dev
// server serves `b7-shape/harness.html` on the lane's port:
//   GLASS_UI_DEMO_PORT=7800 npx playwright test -c tests-visual/b7-shape.config.ts
import { devices } from "@playwright/test";
import base from "./playwright.config";

export const B7_SPECS = [
    "SegmentedTabs.glide.spec.ts",
    "Sheet.position.spec.ts",
    "DropdownMenu.scroll-lock.spec.ts",
    "Select.bound.spec.ts",
    "overlay-sizing.spec.ts",
    "radius-scale.spec.ts",
    "press-scale.spec.ts",
    "CommandDialog.b7c.spec.ts",
];

export default {
    ...base,
    testMatch: B7_SPECS,
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
        { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: { width: 1280, height: 800 } } },
    ],
};
