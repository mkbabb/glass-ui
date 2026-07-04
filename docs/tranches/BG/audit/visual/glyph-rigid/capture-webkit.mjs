// WebKit leg of the dual-engine glyph-rigid witness. Same frame-series measure as
// the Chrome leg, launched on Playwright WebKit 26.4 (the Safari engine), so the
// mid-morph glyph-bbox aspect is measured on BOTH engines.
import { webkit } from "playwright-core";

const MODE = process.argv[2] || "light";
const ROUTE = "/dock/overview";
const BASE = "http://localhost:5200";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await webkit.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${MODE}`, {
    waitUntil: "load",
    timeout: 30000,
});
for (let i = 0; i < 120; i++) {
    if (
        await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        )
    )
        break;
    await sleep(100);
}
const readyPresent = await page.evaluate(() =>
    document.documentElement.hasAttribute("data-capture-ready")
);
const engine = "WEBKIT (Playwright " + browser.version() + ")";

const idx = await page.evaluate(() => {
    const docks = [...document.querySelectorAll(".glass-dock")];
    for (let i = 0; i < docks.length; i++) {
        const d = docks[i];
        if (
            d.querySelector(".dock-persistent") &&
            !d.classList.contains("vertical") &&
            d.getBoundingClientRect().width < 300
        )
            return i;
    }
    return -1;
});

async function measure() {
    return page.evaluate((i) => {
        const d = [...document.querySelectorAll(".glass-dock")][i];
        if (!d) return null;
        const r = d.getBoundingClientRect();
        const p = d.querySelector(".dock-persistent");
        const g = p ? p.querySelector("svg") : null;
        const gr = g ? g.getBoundingClientRect() : null;
        const cs = getComputedStyle(d);
        return {
            w: +r.width.toFixed(2),
            h: +r.height.toFixed(2),
            pillAspect: +(r.width / r.height).toFixed(4),
            morphing: d.getAttribute("data-morphing"),
            collapsed:
                d.classList.contains("collapsed") ||
                d.getAttribute("data-collapsed"),
            rootScale: cs.scale,
            glyphAspect: gr ? +(gr.width / gr.height).toFixed(4) : null,
            glyphW: gr ? +gr.width.toFixed(3) : null,
            borderRadius: cs.borderRadius,
        };
    }, idx);
}
async function rafSeries(durationMs) {
    return page.evaluate(
        async ({ i, durationMs }) => {
            const d = [...document.querySelectorAll(".glass-dock")][i];
            const p = d ? d.querySelector(".dock-persistent") : null;
            const frames = [];
            const start = performance.now();
            return await new Promise((res) => {
                function tick() {
                    const now = performance.now();
                    const r = d.getBoundingClientRect();
                    const cs = getComputedStyle(d);
                    const g = p ? p.querySelector("svg") : null;
                    const gr = g ? g.getBoundingClientRect() : null;
                    frames.push({
                        t: +(now - start).toFixed(1),
                        morphing: d.getAttribute("data-morphing"),
                        punching: d.getAttribute("data-punching"),
                        pillW: +r.width.toFixed(2),
                        rootScale: cs.scale,
                        glyphAspect: gr
                            ? +(gr.width / gr.height).toFixed(4)
                            : null,
                        glyphW: gr ? +gr.width.toFixed(3) : null,
                    });
                    if (now - start < durationMs) requestAnimationFrame(tick);
                    else res(frames);
                }
                requestAnimationFrame(tick);
            });
        },
        { i: idx, durationMs }
    );
}
async function pillCentre() {
    return page.evaluate((i) => {
        const d = [...document.querySelectorAll(".glass-dock")][i];
        const r = d.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, idx);
}

const restExpanded = await measure();
// COLLAPSE
let c = await pillCentre();
await page.mouse.move(c.x, c.y);
await sleep(60);
await page.mouse.move(30, 860);
let collapseSeries = null,
    collapseFired = false;
for (let i = 0; i < 90; i++) {
    const m = await measure();
    if (m && (m.morphing != null || m.pillW < 200)) {
        collapseFired = true;
        collapseSeries = await rafSeries(650);
        break;
    }
    await sleep(60);
}
await sleep(600);
const restCollapsed = await measure();
// EXPAND
c = await pillCentre();
let expandSeries = null,
    expandFired = false;
await page.mouse.move(c.x, c.y);
for (let i = 0; i < 60; i++) {
    const m = await measure();
    if (m && (m.morphing != null || m.pillW > 120)) {
        expandFired = true;
        expandSeries = await rafSeries(650);
        break;
    }
    await page.mouse.move(c.x + (i % 2), c.y);
    await sleep(50);
}
await sleep(600);
const restAfterExpand = await measure();

console.log(
    JSON.stringify({
        mode: MODE,
        engine,
        readyPresent,
        idx,
        restExpanded,
        restCollapsed,
        restAfterExpand,
        collapseFired,
        expandFired,
        collapseSeries,
        expandSeries,
    })
);
await page.close();
await browser.close();
