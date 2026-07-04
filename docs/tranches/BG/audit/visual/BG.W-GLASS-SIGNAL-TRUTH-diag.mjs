import { chromium } from "playwright";
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const MODE = process.argv[2] || "light";
const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: MODE });
const page = await ctx.newPage();
await page.goto(`${BASE}/?capture=${encodeURIComponent("/dock/overview")}&mode=${MODE}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 30000 });
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
    // Take dock #1 (a small horizontal dock, fully on screen, top ~475)
    const docks = Array.from(document.querySelectorAll(".glass-dock"));
    const d = docks[1];
    const r = d.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const stack = document.elementsFromPoint(cx, cy).map(n => ({
        tag: n.tagName?.toLowerCase(),
        cls: (typeof n.className === "string" ? n.className : "").slice(0, 50),
        bg: getComputedStyle(n).backgroundColor,
    }));
    return {
        glassSample: d.dataset.glassSample ?? "(unset)",
        center: { cx: Math.round(cx), cy: Math.round(cy) },
        stack: stack.slice(0, 8),
        bodyBg: getComputedStyle(document.body).backgroundColor,
        // does the dock have a --glass-backdrop-luma inline style set at all?
        inlineLuma: d.style.getPropertyValue("--glass-backdrop-luma") || "(none)",
        inlineSampled: d.style.getPropertyValue("--glass-backdrop-sampled") || "(none)",
        attrSampled: d.hasAttribute("data-backdrop-sampled"),
    };
});
console.log(JSON.stringify({ mode: MODE, ...out }, null, 2));
await ctx.close();
await browser.close();
