// Capture the curve-gallery PLOT region (below the fold) in both modes to judge the
// "reads beautiful" gestalt (thick confident purple curve plots over the real JS twins).
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const BASE = "http://localhost:5200";
const ROUTE = "/motion/curve-gallery";
const OUT = new URL(".", import.meta.url).pathname;

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const mode of ["light", "dark"]) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
        await page.waitForTimeout(150);
    }
    // Find the first curve plot (svg) and screenshot a region around the plots.
    const info = await page.evaluate(() => {
        const svgs = [...document.querySelectorAll("svg")].filter((s) => {
            const r = s.getBoundingClientRect();
            return r.width > 60 && r.height > 60;
        });
        const paths = document.querySelectorAll("svg path").length;
        // scroll the first sizeable plot group into view
        const target = svgs[0];
        let box = null;
        if (target) {
            target.scrollIntoView({ block: "center" });
            const host = target.closest("section, .story-section, div") || target;
            const r = host.getBoundingClientRect();
            box = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
        }
        return { svgCount: svgs.length, pathCount: paths, box, plotStroke: (() => {
            const p = document.querySelector("svg path");
            if (!p) return null;
            const cs = getComputedStyle(p);
            return { stroke: cs.stroke, strokeWidth: cs.strokeWidth };
        })() };
    });
    await page.waitForTimeout(400);
    const shot = `${OUT}curve-gallery-plots-chrome-${mode}.png`;
    await page.screenshot({ path: shot, fullPage: false });
    console.log(JSON.stringify({ mode, ...info, shot }));
    await page.close();
}
await browser.close();
