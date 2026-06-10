// D3-color-pops — live capture for the increase-within-proportion color audit.
// Captures the color-pop MODEL (icons-page chips, empty-states chips) + the
// MIS-spent and MONOCHROME-FLAT candidate surfaces (motion red, curve-gallery
// ink, dock active red register, data pages). Captured against :5199.

import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const GROUND = resolve(ROOT, "docs/tranches/AZ/audit/ground");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

const ROUTES = [
    ["foundations/icons", "D3-model-icons-chips"],
    ["compositions/empty-states", "D3-model-empty-states-chips"],
    ["foundations/motion", "D3-misspent-motion-red"],
    ["motion/curve-gallery", "D3-flat-curve-gallery-ink"],
    ["motion/springs", "D3-flat-springs"],
    ["dock/layers", "D3-misspent-dock-red"],
    ["dock/overview", "D3-dock-overview"],
    ["data/metric-cell", "D3-flat-metric-cell"],
    ["data/timeline", "D3-flat-timeline"],
    ["display/section", "D3-flat-section-markers"],
    ["compositions/settings", "D3-flat-settings"],
    ["feedback/notification", "D3-notification-color"],
];

async function withPage(theme, fn) {
    const browser = await chromium.launch();
    try {
        const ctx = await browser.newContext({
            viewport: { width: 1280, height: 900 },
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

async function capture(route, name, theme) {
    return withPage(theme, async (page) => {
        await page.goto(`${BASE_URL}/${route}`, { waitUntil: "domcontentloaded" });
        if (theme === "dark")
            await page.evaluate(() => document.documentElement.classList.add("dark"));
        // Park any live WebGL surface before the still.
        await page.evaluate(() => {
            Object.defineProperty(document, "hidden", { value: true, configurable: true });
            document.dispatchEvent(new Event("visibilitychange"));
        });
        await page.mouse.move(0, 0);
        await page.waitForTimeout(700);
        const file = `${name}-${theme}.png`;
        await page.screenshot({ path: resolve(GROUND, file), fullPage: true });
        return file;
    });
}

async function run() {
    mkdirSync(GROUND, { recursive: true });
    const done = [];
    for (const [route, name] of ROUTES) {
        try {
            const f = await capture(route, name, "light");
            done.push(f);
            console.log(`captured ${f}`);
        } catch (e) {
            console.error(`FAILED ${route}:`, e.message);
        }
    }
    console.log(JSON.stringify(done, null, 2));
}

run().catch((e) => {
    console.error("D3 CAPTURE FAILED:", e.message);
    process.exit(1);
});
