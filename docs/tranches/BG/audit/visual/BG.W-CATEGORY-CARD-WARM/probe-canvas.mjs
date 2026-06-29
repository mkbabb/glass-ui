import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const browser = await chromium.connectOverCDP("http://localhost:9456");
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5200/?capture=%2Fforms&mode=light", { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
const info = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("canvas")).map((c) => {
        const rect = c.getBoundingClientRect();
        const cs = getComputedStyle(c);
        let glLive = false;
        try { glLive = !!(c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) || c.getContext("webgl")); } catch {}
        return {
            id: c.id, cls: c.className, dataset: JSON.stringify(c.dataset),
            attrW: c.width, attrH: c.height,
            cssW: Math.round(rect.width), cssH: Math.round(rect.height),
            pos: cs.position, top: cs.top, left: cs.left, zIndex: cs.zIndex,
            parent: c.parentElement ? (c.parentElement.id || c.parentElement.className).toString().slice(0, 40) : null,
        };
    });
});
console.log(JSON.stringify(info, null, 2));
await ctx.close();
await browser.close();
