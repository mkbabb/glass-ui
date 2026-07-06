// PRM-static check: under prefers-reduced-motion:reduce the liquid-grid must paint ONE static
// frame (no animation). Emulate reduce, scroll into view, capture two element screenshots ~1.2s
// apart, compare byte-equality. Static => identical.
import { chromium } from "playwright";
import crypto from "node:crypto";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ROUTE = "/substrates/liquid-grid";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
const page = await ctx.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=light`, {
    waitUntil: "load",
});
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready")))
        break;
    await page.waitForTimeout(150);
}
const h = await page.$('[data-testid="liquid-grid-canvas"]');
await h.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
const a = await h.screenshot({ path: `${OUT}prm-frame-a.png` });
await page.waitForTimeout(1200);
const b = await h.screenshot({ path: `${OUT}prm-frame-b.png` });
const ha = crypto.createHash("sha256").update(a).digest("hex").slice(0, 16);
const hb = crypto.createHash("sha256").update(b).digest("hex").slice(0, 16);
console.log(JSON.stringify({ prmReduce: true, hashA: ha, hashB: hb, static: ha === hb }));
await page.close();
await browser.close();
