// Disambiguation: force Chrome (real Metal) onto the WebGL2 GLSL fallback (setupGL) by
// stubbing navigator.gpu OFF before boot. If the figure renders here, setupGL works and the
// blank Playwright-WebKit capture is a headless-GPU tooling artifact, not a real defect.
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
    // Stub WebGPU OFF so createGpuSubstrate picks the setupGL WebGL2 fallback.
    await page.addInitScript(() => {
        try {
            Object.defineProperty(navigator, "gpu", { value: undefined, configurable: true });
        } catch (e) {}
    });
    await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
        await page.waitForTimeout(150);
    }
    const gpuOff = await page.evaluate(() => navigator.gpu === undefined);
    const loc = page.locator(".fourier-field canvas").first();
    await loc.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(600);
    const shot = `${OUT}ff-chrome-webgl2fallback-${mode}-canvas.png`;
    try { await loc.screenshot({ path: shot, timeout: 8000 }); } catch (e) {}
    // Non-blank check + head-xy liveness
    const live = await page.evaluate(async () => {
        const wrap = document.querySelector(".fourier-field");
        const raf = () => new Promise((r) => requestAnimationFrame(r));
        const read = () => getComputedStyle(wrap).getPropertyValue("--ff-head-xy").trim();
        const samples = [];
        for (let i = 0; i < 30; i++) { await raf(); samples.push(read()); }
        const uniq = [...new Set(samples)].filter(Boolean);
        return { headXYset: !!read(), headXYchanges: uniq.length };
    });
    console.log(JSON.stringify({ mode, gpuOff, shot, ...live }));
    await page.close();
}
await browser.close();
