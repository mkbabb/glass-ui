// Scroll-capture the LOWER sections + a computational geometry probe of every HandMark SVG.
// Chrome via CDP. The demo main scroller is scrolled; a shot per band captures the lower voices.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9334";
const OUT = process.env.OUT_DIR;
const mode = process.env.MODE || "light";

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/motion/handmark")}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
    await page.waitForTimeout(150);
}

// Find the scroller (the element with the largest scrollHeight overflow)
const scrollerInfo = await page.evaluate(() => {
    const cands = Array.from(document.querySelectorAll("*")).filter(el => {
        const s = getComputedStyle(el);
        return (s.overflowY === "auto" || s.overflowY === "scroll") && el.scrollHeight > el.clientHeight + 50;
    });
    cands.sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight));
    const el = cands[0];
    if (!el) return null;
    el.setAttribute("data-probe-scroller", "1");
    return { tag: el.tagName, cls: el.className?.toString().slice(0, 60), scrollHeight: el.scrollHeight, clientHeight: el.clientHeight };
});

// Computational geometry probe of every HandMark SVG overlay.
// HandMark roots carry class "hm" (the SFC .hm root); the mark <svg> is inside, aria-hidden.
const geom = await page.evaluate(() => {
    const roots = Array.from(document.querySelectorAll(".hm, [class*='handmark']"));
    const out = [];
    for (const root of roots) {
        const svg = root.querySelector("svg");
        if (!svg) continue;
        const paths = Array.from(svg.querySelectorAll("path"));
        const r = svg.getBoundingClientRect();
        out.push({
            vb: svg.getAttribute("viewBox"),
            nPaths: paths.length,
            dLens: paths.map(p => (p.getAttribute("d") || "").length),
            anyEmptyD: paths.some(p => (p.getAttribute("d") || "").trim().length < 3),
            fillNone: paths.map(p => p.getAttribute("fill") || getComputedStyle(p).fill),
            strokeW: paths.map(p => p.getAttribute("stroke-width") || getComputedStyle(p).strokeWidth),
            rectW: Math.round(r.width), rectH: Math.round(r.height),
            visible: r.width > 1 && r.height > 1,
            text: (root.textContent || "").trim().slice(0, 20),
        });
    }
    return out;
});
console.log("SCROLLER:", JSON.stringify(scrollerInfo));
console.log("HANDMARK_GEOM:", JSON.stringify(geom, null, 1));

// Scroll through and capture bands
const sh = scrollerInfo ? scrollerInfo.scrollHeight : 900;
const step = 760;
let i = 0;
for (let y = 0; y < sh; y += step) {
    await page.evaluate((yy) => {
        const el = document.querySelector("[data-probe-scroller]");
        if (el) el.scrollTop = yy; else window.scrollTo(0, yy);
    }, y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/scroll-${mode}-${String(i).padStart(2, "0")}.png` });
    i++;
}
console.log("captured bands:", i);
await page.close();
await browser.close();
