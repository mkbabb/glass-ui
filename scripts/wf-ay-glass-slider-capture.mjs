// AY.W-GLASS — Slider level-0 flatten own-surface capture (the prompt's owed Slider arm).
//
// Captures the Slider range surface at --glass-level:1 (default, glass blur present) and
// --glass-level:0 (the OPAQUE flatten — blur(0)), at desktop + mobile, light. Plus reads
// the .slider-range backdrop-filter at each level so the flatten is a MEASURED π readback,
// not only a pixel diff. Lands W-GLASS-slider-level1/level0-{desktop,mobile}-light.png.

import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const ROUTE = "/forms/slider";
const SEL = ".slider-range";

const VIEWPORTS = [
    { id: "desktop", width: 1440, height: 900 },
    { id: "mobile", width: 390, height: 844 },
];

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch({ args: ["--disable-gpu"] });
    const shot = [];
    const readback = {};
    try {
        for (const vp of VIEWPORTS) {
            const ctx = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: 2,
                colorScheme: "light",
            });
            const page = await ctx.newPage();
            await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "load", timeout: 25000 });
            await page.waitForTimeout(3500);
            await page.waitForSelector(SEL, { timeout: 8000 });

            // level 1 (default) — read the range backdrop-filter + shoot the first slider's host
            const readFilter = async () =>
                page.evaluate((sel) => {
                    const el = document.querySelector(sel);
                    if (!el) return null;
                    const cs = getComputedStyle(el);
                    return cs.backdropFilter || cs.webkitBackdropFilter || "none";
                }, SEL);

            // locate the first slider container for a tight own-surface crop
            const target = page.locator('[data-slot="slider"], .slider-range').first();

            const f1 = await readFilter();
            const l1 = `W-GLASS-slider-level1-${vp.id}-light.png`;
            await target.screenshot({ path: resolve(VISUAL_DIR, l1) }).catch(async () => {
                await page.screenshot({ path: resolve(VISUAL_DIR, l1) });
            });
            shot.push(l1);

            // level 0 — flatten via :root override, re-read + shoot
            await page.evaluate(() => {
                document.documentElement.style.setProperty("--glass-level", "0");
            });
            await page.waitForTimeout(400);
            const f0 = await readFilter();
            const l0 = `W-GLASS-slider-level0-${vp.id}-light.png`;
            await target.screenshot({ path: resolve(VISUAL_DIR, l0) }).catch(async () => {
                await page.screenshot({ path: resolve(VISUAL_DIR, l0) });
            });
            shot.push(l0);

            readback[vp.id] = { level1Filter: f1, level0Filter: f0 };
            await ctx.close();
        }
    } finally {
        await browser.close();
    }
    console.log("captured:", shot.join(", "));
    console.log("readback:", JSON.stringify(readback, null, 2));
}

run().catch((e) => {
    console.error(e.message);
    process.exit(1);
});
