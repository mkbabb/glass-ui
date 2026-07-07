// Locate the liquid-grid viz canvas + capture a tight frame-series for the smooth-bow read.
import { chromium } from "playwright";
const CDP = "http://localhost:9333";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/";
const ROUTE = "/substrates/liquid-grid";

async function pollReady(page, ms = 15000) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) return Date.now() - t0;
        await page.waitForTimeout(150);
    }
    return -1;
}

async function run(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    await pollReady(page);
    // find the viz canvas (the ~673x700 one, not the full-bleed shell aurora)
    const box = await page.evaluate(() => {
        const cs = Array.from(document.querySelectorAll("canvas"));
        // pick the canvas whose CSS box is NOT full-viewport-width (that one is the shell aurora)
        const cand = cs.map(c => { const r = c.getBoundingClientRect(); return { w: c.width, h: c.height, x: r.x, y: r.y, cw: r.width, ch: r.height }; });
        return cand;
    });
    // scroll the smaller canvas into view then capture tight clips over time
    const target = await page.evaluate(() => {
        const cs = Array.from(document.querySelectorAll("canvas"));
        // the viz stage canvas: the one that is NOT position:fixed full-bleed
        let pick = null;
        for (const c of cs) {
            const r = c.getBoundingClientRect();
            const style = getComputedStyle(c);
            const parentFixed = style.position === "fixed";
            if (r.width > 0 && r.width < window.innerWidth - 50) { pick = c; break; }
        }
        if (!pick) pick = cs[cs.length - 1];
        pick.scrollIntoView({ block: "center" });
        return true;
    });
    await page.waitForTimeout(600);
    const clip = await page.evaluate(() => {
        const cs = Array.from(document.querySelectorAll("canvas"));
        let pick = null;
        for (const c of cs) { const r = c.getBoundingClientRect(); if (r.width > 0 && r.width < window.innerWidth - 50) { pick = c; break; } }
        if (!pick) pick = cs[cs.length - 1];
        const r = pick.getBoundingClientRect();
        return { x: Math.max(0, Math.round(r.x)), y: Math.max(0, Math.round(r.y)), width: Math.round(r.width), height: Math.round(r.height) };
    });
    const frames = [];
    for (let i = 0; i < 4; i++) {
        const fp = `${OUT}liquid-grid-chrome-${mode}-viz${i}.png`;
        await page.screenshot({ path: fp, clip });
        frames.push(fp);
        if (i < 3) await page.waitForTimeout(500);
    }
    console.log(JSON.stringify({ mode, box, clip, frames }, null, 0));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await run(ctx, "light");
await run(ctx, "dark");
await browser.close();
