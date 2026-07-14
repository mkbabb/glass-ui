import { test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

// FIX-GLASSUI-DARK own-surface capture (FD-R2 #1/#2/#3 + the icons pops thread).
// Runs on the tests-visual ANGLE-metal config (real-GPU, --headless=new) so the
// aurora + constellation WebGL surfaces produce stable capturable frames. Reuses
// the orchestrator's :5199 dev server (GLASS_UI_DEMO_PORT=5199 + reuseExistingServer).
const OUT = resolve(import.meta.dirname, "../docs/tranches/AY/audit/visual");
mkdirSync(OUT, { recursive: true });

async function setScheme(page: import("@playwright/test").Page, scheme: "light" | "dark") {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((sc) => {
        sc === "dark"
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark");
    }, scheme);
}

const surfaces = [
    { id: "auth-shell", route: "/compositions/auth-shell", sel: ".auth-brand-panel" },
    { id: "configurator", route: "/containers/configurator", sel: ".configurator-specimen" },
    { id: "icons-pops", route: "/foundations/icons", sel: ".rounded-full" },
    { id: "404-egg", route: "/this-route-does-not-exist", sel: ".constellation-canvas" },
];

// vp tag is derived from the project's viewport (desktop1440 vs mobile390). The
// desktop project carries 1280 in config; we resize to 1440 for the ≥1280 floor.
for (const scheme of ["light", "dark"] as const) {
    for (const s of surfaces) {
        test(`${s.id} ${scheme}`, async ({ page }, testInfo) => {
            const isMobile = testInfo.project.name === "coarse-touch";
            const vpTag = isMobile ? "mobile390" : "desktop1440";
            if (!isMobile) await page.setViewportSize({ width: 1440, height: 900 });
            await page.goto(s.route, { waitUntil: "networkidle" });
            await setScheme(page, scheme);
            await page.waitForSelector(s.sel, { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(1500);
            await page.screenshot({
                path: `${OUT}/FIX-GLASSUI-DARK-${s.id}-${vpTag}-${scheme}.png`,
                fullPage: false,
            });
        });
    }
}
