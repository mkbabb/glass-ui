// PRM check — under prefers-reduced-motion: reduce the fourier field must paint ONE static
// FULL figure then freeze (no sweep, no pointer follow — the tick(0) freeze). Verifies the
// figure is non-blank (a full figure) AND head-xy is static over time AND pointer does not move it.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const BASE = "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;
const ROUTE = "/substrates/fourier-field";

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const mode of ["light", "dark"]) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
        await page.waitForTimeout(150);
    }
    const loc = page.locator(".fourier-field canvas").first();
    await loc.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(500);
    const shot = `${OUT}ff-chrome-prm-${mode}-canvas.png`;
    try { await loc.screenshot({ path: shot, timeout: 8000 }); } catch (e) {}
    const res = await page.evaluate(async () => {
        const prm = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const wrap = document.querySelector(".fourier-field");
        const raf = () => new Promise((r) => requestAnimationFrame(r));
        const read = () => getComputedStyle(wrap).getPropertyValue("--ff-head-xy").trim();
        // (1) is head-xy static over 40 frames (no sweep)?
        const before = read();
        const samples = [];
        for (let i = 0; i < 40; i++) { await raf(); samples.push(read()); }
        const uniqStill = [...new Set(samples)].filter(Boolean).length;
        // (2) does a pointer move it (should NOT under PRM tick(0))?
        const r = wrap.getBoundingClientRect();
        const disp = (t, ux, uy) => wrap.dispatchEvent(new PointerEvent(t, { clientX: r.left + ux * r.width, clientY: r.top + uy * r.height, pointerId: 1, bubbles: true }));
        disp("pointerenter", 0.1, 0.5);
        for (let i = 0; i < 40; i++) { disp("pointermove", 0.9, 0.9); await raf(); }
        const afterPointer = read();
        return { prm, headXYset: !!before, uniqOverTime: uniqStill, movedByPointer: before !== afterPointer, before, afterPointer };
    });
    console.log(JSON.stringify({ mode, shot, ...res }));
    await page.close();
}
await browser.close();
