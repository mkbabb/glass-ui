// Discriminator: is the sporadic >50ms longtask a BACKGROUND cost (present at IDLE)
// or the GESTURE mechanism? Records idle windows (no interaction) then morph windows
// on the same page, plus an idle baseline on dock/rail (no live aurora) for contrast.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const route = process.argv[2] || "/dock/morph-showcase";
const mode = process.argv[3] || "light";
const doGesture = process.argv[4] === "gesture";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, mode);
await page.goto(`http://localhost:5200${route}`, { waitUntil: "load" });
await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); }, mode);
await page.waitForTimeout(1800);
await page.evaluate(() => {
    window.__f = []; window.__l = [];
    try { const po = new PerformanceObserver(l => { for (const e of l.getEntries()) window.__l.push({ t: e.startTime, dur: e.duration }); }); po.observe({ entryTypes: ["longtask"] }); window.__po = po; } catch {}
    window.__run = true;
    (function loop(n) { window.__f.push(n); if (window.__run) requestAnimationFrame(loop); })(performance.now());
});
const marks = [];
if (!doGesture) {
    // 6 IDLE windows of 1100ms — no interaction at all
    for (let i = 0; i < 6; i++) { const t0 = await page.evaluate(() => performance.now()); marks.push(["idle" + i, t0]); await page.waitForTimeout(1100); }
} else {
    for (let i = 0; i < 8; i++) {
        await page.waitForTimeout(250);
        const t0 = await page.evaluate(() => performance.now());
        await page.getByRole("button", { name: /morph to (horizontal|vertical)/i }).first().click();
        marks.push(["morph" + i, t0]);
        await page.waitForTimeout(1100);
    }
}
const data = await page.evaluate(() => { window.__run = false; try { window.__po.disconnect(); } catch {} return { f: window.__f, l: window.__l }; });
function stats(t0, t1) {
    const w = data.f.filter(t => t >= t0 && t <= t1);
    const d = []; for (let i = 1; i < w.length; i++) d.push(w[i] - w[i - 1]);
    const long = data.l.filter(x => x.t + x.dur >= t0 && x.t <= t1 && x.dur > 50);
    return { frames: w.length, fps: +(d.length ? 1000 / (d.reduce((a, b) => a + b, 0) / d.length) : 0).toFixed(1), maxGap: +(d.length ? Math.max(...d) : 0).toFixed(1), dropped33: d.filter(x => x > 33.34).length, long50: long.length, longMax: long.length ? +Math.max(...long.map(x => x.dur)).toFixed(1) : 0 };
}
let jankWins = 0;
for (const [n, t0] of marks) { const s = stats(t0, t0 + 1100); if (s.long50 > 0 || s.dropped33 > 0) jankWins++; console.log(n, JSON.stringify(s)); }
console.log("SUMMARY", JSON.stringify({ route, mode, mode2: doGesture ? "gesture" : "idle", windows: marks.length, jankWindows: jankWins, totalLongtasks: data.l.filter(x => x.dur > 50).length }));
await page.close();
await browser.close();
