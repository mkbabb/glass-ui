// Live dock-hover-press gesture instrumentation (defect B): connects to the real
// Metal Chrome via CDP, presses a .dock-icon-button, samples --dock-press-t + inline
// scale per rAF, and reports answer-latency + rebound + BUTTERY frame-cadence.
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

// Locate a dock-icon-button and set up a per-rAF sampler on it.
const box = await page.evaluate(() => {
    const els = [...document.querySelectorAll(".dock-icon-button")].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 8 && r.height > 8 && r.top > 0 && r.top < window.innerHeight;
    });
    if (!els.length) return null;
    const el = els[0];
    window.__pressEl = el;
    window.__samples = [];
    window.__marks = {};
    window.__mark = (n) => { window.__marks[n] = performance.now(); };
    let running = true;
    window.__stop = () => { running = false; };
    const tick = () => {
        if (!running) return;
        const t = performance.now();
        const pressT = parseFloat(getComputedStyle(el).getPropertyValue("--dock-press-t")) || 0;
        // INLINE scale ONLY — the JS press writes inline; the CSS hover scale (stylesheet)
        // must NOT contaminate the release-rebound measurement. Empty inline = omitted (settled).
        const scale = el.style.scale || "";
        window.__samples.push({ t, pressT, scale });
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height, cls: el.className.toString().slice(0, 50) };
});
if (!box) { console.log(JSON.stringify({ error: "no dock-icon-button found" })); await browser.close(); process.exit(1); }
console.log("target:", JSON.stringify(box));

// Real press gesture: move → down → hold → up → settle.
await page.mouse.move(box.x, box.y);
await page.waitForTimeout(120);
await page.evaluate(() => window.__mark("down"));
await page.mouse.down();
await page.waitForTimeout(260);
await page.evaluate(() => window.__mark("up"));
await page.mouse.up();
await page.waitForTimeout(650);
await page.evaluate(() => window.__stop());

const data = await page.evaluate(() => ({ samples: window.__samples, marks: window.__marks }));
await ctx.close();
await browser.close();

// Analyze
const { samples, marks } = data;
const tDown = marks.down, tUp = marks.up;
const FRAME = 1000 / 60;
// inter-frame gaps across the whole gesture window (down..settle)
const gaps = [];
for (let i = 1; i < samples.length; i++) {
    if (samples[i].t >= tDown - 50) gaps.push(samples[i].t - samples[i - 1].t);
}
const maxGap = Math.max(...gaps);
const longFrames = gaps.filter((g) => g > 50).length;
const bigGaps = gaps.filter((g) => g > 2 * FRAME).length; // >33ms
const fps = 1000 / (gaps.reduce((a, b) => a + b, 0) / gaps.length);

const parseScale = (s) => {
    if (!s) return 1;
    const nums = s.match(/-?[\d.]+/g);
    if (!nums) return 1;
    return Math.max(...nums.map(Number));
};
// answer latency: first sample after down with pressT > 0.01
const afterDown = samples.filter((s) => s.t >= tDown);
const firstMove = afterDown.find((s) => s.pressT > 0.01);
const answerMs = firstMove ? firstMove.t - tDown : null;
const answerFrames = answerMs != null ? answerMs / FRAME : null;
// press depth: min scale during hold (down..up)
const holdSamples = samples.filter((s) => s.t >= tDown && s.t <= tUp);
const pressPeakT = Math.max(...holdSamples.map((s) => s.pressT), 0);
const holdMinScale = Math.min(...holdSamples.map((s) => parseScale(s.scale)), 1);
// rebound: max scale after up (overshoot past 1)
const afterUp = samples.filter((s) => s.t >= tUp);
const reboundMax = Math.max(...afterUp.map((s) => parseScale(s.scale)), 0);
const reboundPct = (reboundMax - 1) * 100;

console.log(JSON.stringify({
    nSamples: samples.length,
    answerMs: answerMs?.toFixed(1), answerFrames: answerFrames?.toFixed(2),
    pressPeakT: pressPeakT.toFixed(3), holdMinScale: holdMinScale.toFixed(4),
    reboundMaxScale: reboundMax.toFixed(4), reboundPct: reboundPct.toFixed(2) + "%",
    buttery: { fps: fps.toFixed(1), maxGapMs: maxGap.toFixed(1), longFrames_gt50ms: longFrames, gaps_gt33ms: bigGaps },
}, null, 2));
