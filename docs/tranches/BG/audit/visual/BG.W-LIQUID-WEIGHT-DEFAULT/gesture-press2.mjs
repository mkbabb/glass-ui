// Live dock-hover-press — steady-state (warmup + in-page marks, no CDP stall) + CDP trace.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const CDP = process.env.CDP_URL || "http://localhost:9477";

const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5200/?capture=" + encodeURIComponent("/dock/overview") + "&mode=light", { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
await page.waitForTimeout(1000);

const box = await page.evaluate(() => {
    const els = [...document.querySelectorAll(".dock-icon-button")].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 8 && r.height > 8 && r.top > 0 && r.top < window.innerHeight;
    });
    if (!els.length) return null;
    const el = els[0];
    window.__el = el;
    window.__samples = [];
    window.__marks = {};
    // In-page pointer listeners record marks WITHOUT a CDP round-trip (no sampler stall).
    el.addEventListener("pointerdown", () => { window.__marks.down = performance.now(); }, true);
    el.addEventListener("pointerup", () => { window.__marks.up = performance.now(); }, true);
    let running = true;
    window.__stop = () => { running = false; };
    window.__reset = () => { window.__samples = []; window.__marks = {}; };
    const tick = () => {
        if (!running) return;
        const t = performance.now();
        const pressT = parseFloat(getComputedStyle(el).getPropertyValue("--dock-press-t")) || 0;
        window.__samples.push({ t, pressT, scale: el.style.scale || "" });
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});
if (!box) { console.log(JSON.stringify({ error: "no button" })); await browser.close(); process.exit(1); }

// WARMUP press (warm JIT + first --dock-press-t @property recalc), then settle + reset.
await page.mouse.move(box.x, box.y);
await page.waitForTimeout(150);
await page.mouse.down(); await page.waitForTimeout(250); await page.mouse.up();
await page.waitForTimeout(700);
await page.evaluate(() => window.__reset());

// MEASURED press — start a CDP performance trace around it.
const client = await page.context().newCDPSession(page);
await client.send("Performance.enable").catch(() => {});
await page.evaluate(() => performance.mark("gesture-start"));
await page.mouse.down();
await page.waitForTimeout(260);
await page.mouse.up();
await page.waitForTimeout(650);
await page.evaluate(() => window.__stop());

const data = await page.evaluate(() => ({ samples: window.__samples, marks: window.__marks }));
await ctx.close();
await browser.close();

const { samples, marks } = data;
const FRAME = 1000 / 60;
const tDown = marks.down, tUp = marks.up;
const parseScale = (s) => { if (!s) return 1; const n = s.match(/-?[\d.]+/g); return n ? Math.max(...n.map(Number)) : 1; };
const parseScaleMin = (s) => { if (!s) return 1; const n = s.match(/-?[\d.]+/g); return n ? Math.min(...n.map(Number)) : 1; };
const gaps = [];
for (let i = 1; i < samples.length; i++) if (samples[i].t >= tDown - 30) gaps.push(samples[i].t - samples[i - 1].t);
const maxGap = Math.max(...gaps);
const longFrames = gaps.filter((g) => g > 50).length;
const bigGaps = gaps.filter((g) => g > 2 * FRAME).length;
const fps = 1000 / (gaps.reduce((a, b) => a + b, 0) / gaps.length);
const afterDown = samples.filter((s) => s.t >= tDown);
const firstMove = afterDown.find((s) => s.pressT > 0.01);
const answerMs = firstMove ? firstMove.t - tDown : null;
const hold = samples.filter((s) => s.t >= tDown && s.t <= tUp);
const pressPeakT = Math.max(...hold.map((s) => s.pressT), 0);
const holdDeepestAxis = Math.min(...hold.map((s) => parseScaleMin(s.scale)), 1);
const afterUp = samples.filter((s) => s.t >= tUp);
const reboundMax = Math.max(...afterUp.map((s) => parseScale(s.scale)), 0);
console.log(JSON.stringify({
    nSamples: samples.length,
    answerMs: answerMs?.toFixed(1), answerFrames: (answerMs / FRAME).toFixed(2),
    pressPeakT: pressPeakT.toFixed(3), holdDeepestAxis: holdDeepestAxis.toFixed(4),
    reboundMaxInlineScale: reboundMax.toFixed(4),
    buttery: { fps: fps.toFixed(1), maxGapMs: maxGap.toFixed(1), longFrames_gt50ms: longFrames, gaps_gt33ms: bigGaps, nGaps: gaps.length },
}));
