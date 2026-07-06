// BG.W-FOURIER-BEAUTY — Chrome CDP: scroll the target into the viewport, settle, viewport screenshot.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname + "BG.W-FOURIER-BEAUTY-paint/";
const BASE = "http://localhost:5200";

// [route, tag, scrollSelector, settleMs]
const JOBS = [
    ["/substrates/fourier-field", "ff", ".fourier-field-canvas", 1500],
    ["/motion/curve-gallery", "cg", "main .story-page-article", 1200],
];

async function ready(page) {
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) return Date.now() - t0;
        await page.waitForTimeout(150);
    }
    return -1;
}

async function run(ctx, route, tag, sel, settle, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const rd = await ready(page);
    const s2 = await page.evaluate((s) => {
        const t = document.querySelector(s);
        if (!t) return "no-target";
        t.scrollIntoView({ block: "center" });
        const r = t.getBoundingClientRect();
        return { top: Math.round(r.top), h: Math.round(r.height) };
    }, sel);
    await page.waitForTimeout(settle);
    const outPath = `${OUT}${tag}-chrome-${mode}.png`;
    await page.screenshot({ path: outPath });
    console.log(JSON.stringify({ tag, mode, ready: rd, scroll: s2, outPath }));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const [route, tag, sel, settle] of JOBS) {
    for (const mode of ["light", "dark"]) {
        await run(ctx, route, tag, sel, settle, mode);
    }
}
await browser.close();
