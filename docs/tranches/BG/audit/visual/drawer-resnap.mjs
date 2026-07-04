// Re-snap test: open at half, then click Full (external activeSnapPoint write) →
// does the spring animate 0.5→1.0? Isolates whether the open-pop is open-specific.
import { chromium } from "playwright";
const MODE = process.argv[2] === "dark" ? "dark" : "light";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, MODE);
const page = await ctx.newPage();
await page.goto("http://localhost:5200/compositions/drawer-live-behind", { waitUntil: "networkidle" });
await page.evaluate((m) => document.documentElement.classList.toggle("dark", m === "dark"), MODE);
await sleep(900);
await page.click("#detent-half");
await sleep(1000); // seated at half
// start recorder, then re-snap to Full
await page.evaluate(() => {
    window.__s = []; window.__on = true;
    const loop = () => {
        const el = document.querySelector("[data-glass-drawer]");
        const stage = getComputedStyle(document.documentElement).getPropertyValue("--stage-t").trim();
        window.__s.push({ t: performance.now(), st: stage === "" ? null : parseFloat(stage),
            sheet: el ? (el.style.getPropertyValue("--glass-drawer-t").trim() || null) : null });
        if (window.__on) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
});
await page.click("#detent-full");
await sleep(1200);
await page.evaluate(() => { window.__on = false; });
const s = await page.evaluate(() => window.__s);
const stages = s.filter(f => f.st != null).map(f => f.st);
const distinctInBand = new Set(stages.filter(v => v > 0.51 && v < 0.99).map(v => v.toFixed(3))).size;
console.log(JSON.stringify({
    mode: MODE,
    samples: s.length,
    stageFirst: stages[0], stageLast: stages[stages.length - 1],
    stageMax: Math.max(...stages),
    distinctIntermediate_0p5_to_1: distinctInBand,
    resnapAnimates: distinctInBand >= 6,
    overshootPastFull: Math.max(...stages) > 1.0001,
    // sample the mid-band series
    midBand: stages.filter(v => v > 0.51 && v < 0.99).slice(0, 20).map(v => +v.toFixed(3)),
}, null, 2));
await browser.close();
