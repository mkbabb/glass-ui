// Isolation probes: (1) morph repeated 3x on ONE page (first-invocation vs steady),
// (2) press navigation check, (3) collapse/expand repeated.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const which = process.argv[2];
const mode = process.argv[3] || "light";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, mode);

async function recStart() {
    await page.evaluate(() => {
        window.__f = []; window.__l = [];
        try { const po = new PerformanceObserver(l => { for (const e of l.getEntries()) window.__l.push({ t: e.startTime, dur: e.duration }); }); po.observe({ entryTypes: ["longtask"] }); window.__po = po; } catch {}
        window.__run = true;
        (function loop(n) { window.__f.push(n); if (window.__run) requestAnimationFrame(loop); })(performance.now());
    });
}
async function mark() { return await page.evaluate(() => performance.now()); }
async function recRead() { return await page.evaluate(() => { window.__run = false; try { window.__po.disconnect(); } catch {} return { f: window.__f, l: window.__l }; }); }
function stats(f, l, t0, t1) {
    const w = f.filter(t => t >= t0 && t <= t1);
    const d = []; for (let i = 1; i < w.length; i++) d.push(w[i] - w[i - 1]);
    const long = l.filter(x => x.t + x.dur >= t0 && x.t <= t1 && x.dur > 50);
    return { frames: w.length, fps: +(d.length ? 1000 / (d.reduce((a, b) => a + b, 0) / d.length) : 0).toFixed(1), maxGap: +(d.length ? Math.max(...d) : 0).toFixed(1), dropped33: d.filter(x => x > 33.34).length, long50: long.length, longMax: long.length ? +Math.max(...long.map(x => x.dur)).toFixed(1) : 0 };
}

if (which === "morph") {
    await page.goto("http://localhost:5200/dock/morph-showcase", { waitUntil: "load" });
    await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); }, mode);
    await page.waitForTimeout(1800);
    await recStart();
    const res = [];
    for (let i = 0; i < 4; i++) {
        await page.waitForTimeout(300);
        const t0 = await mark();
        await page.getByRole("button", { name: /morph to (horizontal|vertical)/i }).first().click();
        await page.waitForTimeout(1100);
        res.push([i, t0]);
    }
    const { f, l } = await recRead();
    for (const [i, t0] of res) console.log("morph#" + i, JSON.stringify(stats(f, l, t0, t0 + 1100)));
}

if (which === "press") {
    await page.goto("http://localhost:5200/dock/overview", { waitUntil: "load" });
    await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); }, mode);
    await page.waitForTimeout(1800);
    const urlBefore = page.url();
    // block navigation to isolate the press animation from a nav route-change
    await page.evaluate(() => { window.__navs = 0; window.addEventListener("click", e => { /* observe only */ }, true); });
    await recStart();
    const btn = page.locator(".dock-icon-button").first();
    const box = await btn.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
    await page.waitForTimeout(400);
    const t0 = await mark();
    await page.mouse.down();
    await page.waitForTimeout(250);
    await page.mouse.up();
    await page.waitForTimeout(700);
    const { f, l } = await recRead();
    const urlAfter = page.url();
    console.log("press", JSON.stringify({ ...stats(f, l, t0, t0 + 950), navigated: urlBefore !== urlAfter, urlBefore: urlBefore.slice(-30), urlAfter: urlAfter.slice(-30) }));
}

if (which === "press-safe") {
    // press the dock BACKGROUND-toggle / a non-nav control — use the morph-showcase morph button as a stable pressable
    await page.goto("http://localhost:5200/dock/overview", { waitUntil: "load" });
    await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); }, mode);
    await page.waitForTimeout(1800);
    await recStart();
    // hover + press on the LAST dock icon on the collapsible showcase dock (index chosen to avoid the home/nav-left)
    const btns = page.locator(".dock-icon-button");
    const n = await btns.count();
    const btn = btns.nth(Math.min(2, n - 1));
    const box = await btn.boundingBox();
    const urlBefore = page.url();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
    await page.waitForTimeout(400);
    const t0 = await mark();
    await page.mouse.down();
    await page.waitForTimeout(250);
    await page.mouse.up();
    await page.waitForTimeout(700);
    const { f, l } = await recRead();
    console.log("press-safe", JSON.stringify({ ...stats(f, l, t0, t0 + 950), navigated: urlBefore !== page.url() }));
}

if (which === "collapse") {
    await page.goto("http://localhost:5200/dock/overview", { waitUntil: "load" });
    await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); }, mode);
    await page.waitForTimeout(1800);
    await recStart();
    const dock = page.locator(".demo-sidebar-dock").first();
    const box = await dock.boundingBox();
    const res = [];
    for (let i = 0; i < 3; i++) {
        await page.waitForTimeout(300);
        let t0 = await mark();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
        await page.waitForTimeout(850);
        res.push(["expand" + i, t0]);
        t0 = await mark();
        await page.mouse.move(1300, 850, { steps: 3 });
        await page.waitForTimeout(850);
        res.push(["collapse" + i, t0]);
    }
    const { f, l } = await recRead();
    for (const [n, t0] of res) console.log(n, JSON.stringify(stats(f, l, t0, t0 + 850)));
}
await page.close();
await browser.close();
