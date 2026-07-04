// Focused open-settle probe: read :root --stage-t (the single-writer scene scalar the
// spring writes EVERY frame regardless of sheet mount) to see the TRUE open slide-in.
import { chromium } from "playwright";
const MODE = process.argv[2] === "dark" ? "dark" : "light";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await ctx.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, MODE);
const page = await ctx.newPage();
await page.goto("http://localhost:5200/compositions/drawer-live-behind", { waitUntil: "networkidle" });
await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); }, MODE);
await sleep(1000);
// Start a tight :root --stage-t recorder BEFORE clicking.
await page.evaluate(() => {
    window.__st = [];
    window.__on = true;
    const loop = () => {
        const v = getComputedStyle(document.documentElement).getPropertyValue("--stage-t").trim();
        const el = document.querySelector("[data-glass-drawer]");
        let sheetScalar = null, ty = null;
        if (el) {
            sheetScalar = el.style.getPropertyValue("--glass-drawer-t").trim() || null;
            const m = new DOMMatrixReadOnly(getComputedStyle(el).transform === "none" ? "" : getComputedStyle(el).transform);
            ty = m.m42;
        }
        window.__st.push({ t: performance.now(), stage: v === "" ? null : parseFloat(v), sheet: sheetScalar, ty, present: !!el });
        if (window.__on) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
});
await page.click("#detent-half");
await sleep(1300);
await page.evaluate(() => { window.__on = false; });
const frames = await page.evaluate(() => window.__st);
// Trim to the window around the open (first frame stage becomes non-null → settle).
const active = frames.filter((f) => f.stage != null);
const stages = active.map((f) => f.stage);
const distinct = new Set(stages.map((s) => s.toFixed(3)));
const firstPresentIdx = frames.findIndex((f) => f.present && f.sheet != null);
console.log(JSON.stringify({
    mode: MODE,
    totalFrames: frames.length,
    stageWrittenFrames: active.length,
    stageDistinctValues: distinct.size,
    stageFirst: stages[0], stageLast: stages[stages.length - 1],
    stageMin: Math.min(...stages), stageMax: Math.max(...stages),
    // first 12 stage samples of the open climb
    openClimb: active.slice(0, 14).map((f) => ({ st: +f.stage.toFixed(3), present: f.present, sheet: f.sheet, ty: f.ty == null ? null : Math.round(f.ty) })),
    sheetFirstPaintedScalar: firstPresentIdx >= 0 ? frames[firstPresentIdx].sheet : null,
    overshootPastFull: Math.max(...stages) > 1.0001,
}, null, 2));
await browser.close();
