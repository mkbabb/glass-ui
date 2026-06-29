import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const route = process.argv[2] || "/forms";
const mode = process.argv[3] || "light";
const browser = await chromium.connectOverCDP("http://localhost:9456");
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
const page = await ctx.newPage();
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
const g = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(".section-preview-card")).slice(0, 3);
    const bento = document.querySelector(".section-bento");
    return {
        bento: bento ? (() => { const r = bento.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })() : null,
        cards: cards.map((el) => {
            const r = el.getBoundingClientRect();
            // direct children regions to avoid: title row + inner preview window
            const kids = Array.from(el.children).map((k) => { const kr = k.getBoundingClientRect(); return { cls: (k.className || "").toString().slice(0, 30), x: kr.x, y: kr.y, w: kr.width, h: kr.height }; });
            return { x: r.x, y: r.y, w: r.width, h: r.height, kids };
        }),
    };
});
console.log(JSON.stringify(g, null, 2));
await ctx.close();
await browser.close();
