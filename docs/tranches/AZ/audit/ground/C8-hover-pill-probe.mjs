// LANE C8 — what element paints the hover/shadow pill around the ℱ, and is the
// glyph centered within THAT element (not just the 40x40 RouterLink)?  (R3-15)
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";
const { chromium } = pw;
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=metal"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(`${BASE}/foundations/intro`, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(1500);
await page.evaluate(() => { try { Object.defineProperty(document, "hidden", { value: true, configurable: true }); document.dispatchEvent(new Event("visibilitychange")); } catch {} });
await page.waitForTimeout(300);

const info = await page.evaluate(() => {
    const link = document.querySelector('a[aria-label="glass-ui home"]');
    // Walk up to find the #persistent wrapper / the element that paints the pill bg.
    function chain(el, n = 6) {
        const out = [];
        let cur = el;
        for (let i = 0; i < n && cur; i++) {
            const cs = getComputedStyle(cur);
            const r = cur.getBoundingClientRect();
            out.push({
                tag: cur.tagName.toLowerCase(),
                cls: cur.className && typeof cur.className === "string" ? cur.className.slice(0, 80) : "",
                rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
                bg: cs.backgroundColor,
                br: cs.borderRadius,
                boxShadow: cs.boxShadow.slice(0, 60),
                padding: cs.padding,
            });
            cur = cur.parentElement;
        }
        return out;
    }
    return { linkChain: chain(link) };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
