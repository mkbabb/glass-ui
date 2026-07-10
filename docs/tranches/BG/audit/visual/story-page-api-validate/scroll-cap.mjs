// Supplementary SCROLL capture — the /compositions/chassis inner main scroller is a
// fixed-viewport scroller (docHeight == viewport), so the canonical fullPage shot shows
// only the top (the Stage KIND). This scrolls the inner scroller and captures the four
// below-fold KINDS (Matrix · Specimen · Interaction · Composition) for the paint judge's
// visual verification. NON-canonical (the four canonical PNGs remain the deliverable).
import { chromium } from "playwright";

const ROUTE = "/compositions/chassis";
const CDP = process.env.CDP_URL || "http://localhost:9334";
const OUT = new URL(".", import.meta.url).pathname;
const mode = process.argv[2] || "light";

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
    await page.waitForTimeout(150);
}

// Find the deepest scrollable element (the inner main scroller).
const scrollInfo = await page.evaluate(() => {
    let best = null, bestH = 0;
    for (const el of document.querySelectorAll("*")) {
        const sh = el.scrollHeight, ch = el.clientHeight;
        const st = getComputedStyle(el);
        const scrolls = (st.overflowY === "auto" || st.overflowY === "scroll") && sh > ch + 20;
        if (scrolls && sh > bestH) { best = el; bestH = sh; }
    }
    if (!best) return { found: false };
    best.setAttribute("data-scroll-probe", "1");
    return { found: true, scrollHeight: best.scrollHeight, clientHeight: best.clientHeight, tag: best.tagName, cls: best.className };
});
console.log(JSON.stringify({ mode, scrollInfo }));

if (scrollInfo.found) {
    const total = scrollInfo.scrollHeight;
    const step = scrollInfo.clientHeight - 80;
    let shot = 0;
    for (let y = 0; y < total; y += step) {
        await page.evaluate((yy) => {
            const el = document.querySelector("[data-scroll-probe='1']");
            if (el) el.scrollTop = yy;
        }, y);
        await page.waitForTimeout(400);
        const path = `${OUT}chassis-scroll-${mode}-${String(shot).padStart(2, "0")}.png`;
        await page.screenshot({ path });
        shot++;
    }
    console.log(JSON.stringify({ mode, shots: shot, total }));
}
await page.close();
await browser.close();
