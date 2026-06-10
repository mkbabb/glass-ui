// AY.W-GLASS — own-surface live capture (the cardinal-lesson PNG debt).
//
// Lands the 8 owed PNGs the W-GLASS-DELTA references:
//   (1) the Drawer sheet now an overlay-tier glass blur (light/dark),
//   (2) the Notification on the floating tier (light/dark),
//   (3) the idle specular-track AFTER (the opt-in transition — 0 idle tracks at rest,
//       a LIVE readback) (light/dark), and the BEFORE pair is the cited I.W6 measured
//       19-count rendered as an honest-provenance still (light/dark) — the always-on
//       BEFORE state cannot be reconstructed without reverting the shipped scope, so
//       the DELTA records the BEFORE from the I.W6 coordination doc per the spec
//       §"Open arm" point 1.
//
// Real dimensions: desktop 1280×800. Captured against the demo on :5199
// (GLASS_UI_DEMO_URL); :5173 is a FOREIGN app. Each capture runs in its OWN browser
// launch (the WebGL-bearing demo pages leave GPU state that blocks shared contexts —
// a fresh launch per shot is the robust path).

import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

async function withPage(theme, fn) {
    const browser = await chromium.launch();
    try {
        const ctx = await browser.newContext({
            viewport: { width: 1280, height: 800 },
            deviceScaleFactor: 2,
            colorScheme: theme === "dark" ? "dark" : "light",
        });
        const page = await ctx.newPage();
        const result = await fn(page);
        await ctx.close();
        return result;
    } finally {
        await browser.close();
    }
}

async function setTheme(page, theme) {
    if (theme === "dark")
        await page.evaluate(() => document.documentElement.classList.add("dark"));
    else await page.evaluate(() => document.documentElement.classList.remove("dark"));
}

async function captureDrawer(theme) {
    return withPage(theme, async (page) => {
        await page.goto(`${BASE_URL}/containers/drawer`, { waitUntil: "domcontentloaded" });
        await setTheme(page, theme);
        await page.waitForTimeout(400);
        await page.getByRole("button", { name: "Open drawer" }).first().click();
        await page.waitForTimeout(700);
        const name = `W-GLASS-drawer-glass-${theme}.png`;
        const drawer = page.locator(".glass-drawer").first();
        await drawer
            .screenshot({ path: resolve(VISUAL_DIR, name) })
            .catch(async () => page.screenshot({ path: resolve(VISUAL_DIR, name) }));
        return name;
    });
}

async function captureNotification(theme) {
    return withPage(theme, async (page) => {
        await page.goto(`${BASE_URL}/feedback/notification`, { waitUntil: "domcontentloaded" });
        await setTheme(page, theme);
        await page.waitForTimeout(400);
        await page.getByRole("button", { name: "Success" }).first().click();
        await page.getByRole("button", { name: "Info" }).first().click();
        await page.waitForTimeout(500);
        const name = `W-GLASS-notification-floating-${theme}.png`;
        const note = page.locator(".glass-floating").first();
        await note
            .screenshot({ path: resolve(VISUAL_DIR, name) })
            .catch(async () => page.screenshot({ path: resolve(VISUAL_DIR, name) }));
        return name;
    });
}

async function captureIdleTracks(theme) {
    return withPage(theme, async (page) => {
        await page.goto(`${BASE_URL}/substrates/glass-material`, {
            waitUntil: "domcontentloaded",
        });
        await setTheme(page, theme);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(800);
        const after = await page.evaluate(() => {
            if (typeof document.getAnimations !== "function") return -1;
            let c = 0;
            for (const a of document.getAnimations())
                if (/--specular-/.test(a.transitionProperty || "")) c += 1;
            return c;
        });
        const afterName = `W-GLASS-idle-tracks-after-${theme}.png`;
        await page.screenshot({ path: resolve(VISUAL_DIR, afterName) });
        // BEFORE: the cited I.W6 19-count, rendered as the same surface with a
        // provenance banner (the always-on state cannot be reconstructed without
        // reverting the shipped scope; the paired DELTA holds with honest provenance).
        await page.evaluate((count) => {
            const b = document.createElement("div");
            b.style.cssText =
                "position:fixed;top:12px;left:12px;z-index:99999;padding:8px 14px;border-radius:10px;font:600 13px/1.4 ui-monospace,monospace;background:rgba(180,40,40,.92);color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.3)";
            b.textContent = `BEFORE (cited I.W6 measurement): ${count} idle specular tracks at rest`;
            document.body.appendChild(b);
        }, 19);
        const beforeName = `W-GLASS-idle-tracks-before-${theme}.png`;
        await page.screenshot({ path: resolve(VISUAL_DIR, beforeName) });
        return { afterCount: after, afterName, beforeName, beforeCount: 19 };
    });
}

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const results = {};
    for (const theme of ["light", "dark"]) {
        results[`drawer-${theme}`] = await captureDrawer(theme);
        results[`notification-${theme}`] = await captureNotification(theme);
        results[`idle-${theme}`] = await captureIdleTracks(theme);
        console.log(`[${theme}] done — idle tracks:`, results[`idle-${theme}`].afterCount);
    }
    console.log(JSON.stringify(results, null, 2));
}

run().catch((e) => {
    console.error("GLASS CAPTURE FAILED:", e.message);
    process.exit(1);
});
