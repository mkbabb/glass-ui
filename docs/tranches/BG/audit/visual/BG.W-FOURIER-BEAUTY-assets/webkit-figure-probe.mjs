// WebKit-engine (Playwright WebKit, WebGL2 fallback path — no WebGPU) figure capture +
// follow probe for /substrates/fourier-field. Complements the wkshot system-WebKit/Metal
// route-boot captures (which snapshot only the top viewport). Scrolls the figure into view,
// screenshots the canvas, runs the B3 follow probe, and pixel-scans the ribbon width.
import { webkit } from "playwright";
const BASE = "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;

async function boot(page, route, mode) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
        await page.waitForTimeout(150);
    }
}

async function followProbe(page) {
    return await page.evaluate(async () => {
        const wrap = document.querySelector(".fourier-field");
        if (!wrap) return { error: "no wrap" };
        const raf = () => new Promise((r) => requestAnimationFrame(r));
        const rectOf = () => wrap.getBoundingClientRect();
        const read = () => {
            const s = getComputedStyle(wrap).getPropertyValue("--ff-head-xy").trim().split(/\s+/).map(Number);
            return s.length === 2 && s.every(Number.isFinite) ? { x: s[0], y: s[1] } : null;
        };
        const disp = (type, ux, uy) => {
            const r = rectOf();
            wrap.dispatchEvent(new PointerEvent(type, { clientX: r.left + ux * r.width, clientY: r.top + uy * r.height, pointerId: 1, pointerType: "mouse", bubbles: true }));
        };
        const prm = matchMedia("(prefers-reduced-motion: reduce)").matches;
        async function held(ux, uy, N) {
            disp("pointerenter", ux, uy);
            for (let i = 0; i < 55; i++) { disp("pointermove", ux, uy); await raf(); }
            const pts = [];
            for (let i = 0; i < N; i++) { disp("pointermove", ux, uy); await raf(); const v = read(); if (v) pts.push(v); }
            const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
            return { n: pts.length, cx: (Math.min(...xs) + Math.max(...xs)) / 2, cy: (Math.min(...ys) + Math.max(...ys)) / 2, rx: +(Math.max(...xs) - Math.min(...xs)).toFixed(3) };
        }
        const L = await held(0.12, 0.5, 130), R = await held(0.88, 0.5, 130);
        const T = await held(0.5, 0.12, 130), B = await held(0.5, 0.88, 130);
        // ambient sweep after release
        disp("pointerleave", 0.5, 0.5);
        for (let i = 0; i < 15; i++) await raf();
        const amb = [];
        for (let i = 0; i < 80; i++) { await raf(); const v = read(); if (v) amb.push(v); }
        const rng = (a, k) => a.length ? Math.max(...a.map(p => p[k])) - Math.min(...a.map(p => p[k])) : 0;
        return { prm, followX: +(R.cx - L.cx).toFixed(4), followY: +(B.cy - T.cy).toFixed(4), ambRange: { x: +rng(amb, "x").toFixed(3), y: +rng(amb, "y").toFixed(3) }, headXY: read() };
    });
}

const browser = await webkit.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
const report = {};
for (const mode of ["light", "dark"]) {
    // fourier-field: figure capture + follow
    const page = await ctx.newPage();
    await boot(page, "/substrates/fourier-field", mode);
    const loc = page.locator(".fourier-field canvas").first();
    await loc.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(500);
    const canvasShot = `${OUT}ff-webkit-${mode}-canvas.png`;
    try { await loc.screenshot({ path: canvasShot, timeout: 8000 }); } catch (e) { /* */ }
    const probe = await followProbe(page);
    report[`ff-${mode}`] = { canvasShot, probe };
    await page.close();

    // curve-gallery plots (WebKit SVG)
    const p2 = await ctx.newPage();
    await boot(p2, "/motion/curve-gallery", mode);
    await p2.evaluate(() => { const s = [...document.querySelectorAll("svg")].find(s => s.getBoundingClientRect().width > 60); if (s) s.scrollIntoView({ block: "center" }); });
    await p2.waitForTimeout(400);
    const cg = `${OUT}cg-webkit-${mode}-plots.png`;
    await p2.screenshot({ path: cg, fullPage: false });
    report[`cg-${mode}`] = { plotsShot: cg };
    await p2.close();
    console.error("done", mode);
}
console.log(JSON.stringify(report, null, 2));
await browser.close();
