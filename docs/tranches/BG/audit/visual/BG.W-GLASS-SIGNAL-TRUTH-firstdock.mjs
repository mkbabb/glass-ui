import { chromium } from "playwright";
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const MODE = process.argv[2] || "light";
const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: MODE });
const page = await ctx.newPage();
await page.goto(`${BASE}/?capture=${encodeURIComponent("/dock/overview")}&mode=${MODE}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 30000 });
await page.waitForTimeout(2000);
const out = await page.evaluate(() => {
    const docks = Array.from(document.querySelectorAll(".glass-dock"));
    return docks.map((d, i) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        return {
            i,
            onScreen: r.top < 900 && r.bottom > 0 && r.width > 0,
            rect: { top: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) },
            sampled: d.hasAttribute("data-backdrop-sampled"),
            luma: cs.getPropertyValue("--glass-backdrop-luma").trim(),
            hue: cs.getPropertyValue("--glass-ambient-hue").trim(),
            backdrop: cs.getPropertyValue("--glass-backdrop").trim(),
        };
    });
});
// also: does the aurora canvas in DockStage have nonzero dims?
const canvasInfo = await page.evaluate(() => Array.from(document.querySelectorAll("canvas")).map(c => ({ w: c.width, h: c.height, cw: Math.round(c.getBoundingClientRect().width) })));
console.log(JSON.stringify({ mode: MODE, docks: out, canvases: canvasInfo }, null, 2));
await ctx.close();
await browser.close();
