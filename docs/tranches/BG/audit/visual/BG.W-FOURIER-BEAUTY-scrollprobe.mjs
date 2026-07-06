import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const BASE = "http://localhost:5200";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/?capture=${encodeURIComponent("/substrates/fourier-field")}&mode=dark`, { waitUntil: "load" });
const t0 = Date.now();
while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await page.waitForTimeout(150); }

const info = await page.evaluate(() => {
    const cv = document.querySelector(".fourier-field-canvas");
    // walk ancestors, find the scrollable one
    const chain = [];
    let el = cv;
    while (el && el !== document.documentElement) {
        const cs = getComputedStyle(el);
        const scrollable = (cs.overflowY === "auto" || cs.overflowY === "scroll" || cs.overflow === "auto" || cs.overflow === "scroll") && el.scrollHeight > el.clientHeight + 2;
        chain.push({ tag: el.tagName, cls: (el.className || "").toString().slice(0, 60), overflowY: cs.overflowY, scrollH: el.scrollHeight, clientH: el.clientHeight, scrollable });
        el = el.parentElement;
    }
    return chain;
});
console.log("ANCESTOR CHAIN of .fourier-field-canvas:");
console.log(JSON.stringify(info, null, 2));

// Try scrolling the field into view via its canvas
const after = await page.evaluate(() => {
    const cv = document.querySelector(".fourier-field-canvas");
    cv.scrollIntoView({ block: "center" });
    const r = cv.getBoundingClientRect();
    return { top: Math.round(r.top), height: Math.round(r.height), inView: r.top >= 0 && r.bottom <= window.innerHeight };
});
console.log("AFTER scrollIntoView(center):", JSON.stringify(after));
await page.close();
await browser.close();
