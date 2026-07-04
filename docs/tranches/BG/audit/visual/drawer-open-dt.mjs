// Decisive open-settle timing: sample :root --stage-t at MAX rate and report the
// dt between the last-zero frame and the first-nonzero frame + the full climb series.
import { chromium } from "playwright";
const MODE = process.argv[2] === "dark" ? "dark" : "light";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, MODE);
const page = await ctx.newPage();
await page.goto("http://localhost:5200/compositions/drawer-live-behind", { waitUntil: "networkidle" });
await page.evaluate((m) => document.documentElement.classList.toggle("dark", m === "dark"), MODE);
// report PRM state
const prm = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
await sleep(900);
await page.evaluate(() => {
    window.__s = []; window.__on = true;
    const loop = () => {
        const v = getComputedStyle(document.documentElement).getPropertyValue("--stage-t").trim();
        window.__s.push({ t: performance.now(), st: v === "" ? null : parseFloat(v) });
        if (window.__on) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
});
const clickT = await page.evaluate(() => performance.now());
await page.click("#detent-half");
await sleep(1100);
await page.evaluate(() => { window.__on = false; });
const s = await page.evaluate(() => window.__s);
// find the open climb: first index where st transitions from (null|0) to >0
let idx = -1;
for (let i = 1; i < s.length; i++) {
    const prev = s[i - 1].st, cur = s[i].st;
    if ((prev == null || prev < 0.01) && cur != null && cur > 0.01) { idx = i; break; }
}
const climb = idx >= 0 ? s.slice(Math.max(0, idx - 2), idx + 20) : [];
const meanDt = (arr) => {
    const d = []; for (let i = 1; i < arr.length; i++) d.push(arr[i].t - arr[i - 1].t);
    return d.length ? (d.reduce((a, b) => a + b, 0) / d.length) : null;
};
console.log(JSON.stringify({
    mode: MODE, prmReduce: prm,
    totalSamples: s.length,
    meanFrameDtMs: meanDt(s) == null ? null : +meanDt(s).toFixed(1),
    transitionFoundIdx: idx,
    // dt across the 0→nonzero jump:
    jumpDtMs: idx >= 1 ? +(s[idx].t - s[idx - 1].t).toFixed(1) : null,
    firstNonZeroStage: idx >= 0 ? s[idx].st : null,
    climbSeries: climb.map((f) => ({ dtSinceClick: +(f.t - clickT).toFixed(0), st: f.st })),
    distinctStageValuesInClimb: new Set(s.filter(f => f.st != null && f.st > 0.001 && f.st < 0.499).map(f => f.st.toFixed(3))).size,
}, null, 2));
await browser.close();
