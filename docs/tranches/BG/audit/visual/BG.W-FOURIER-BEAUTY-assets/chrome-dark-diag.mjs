// Isolated DARK-first liveness + follow diagnostic. Fresh page, dark only. Checks PRM,
// whether the render loop advances head-xy (ambient + on pointer wake), and the follow.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const BASE = "http://localhost:5200";
const ROUTE = "/substrates/fourier-field";
const RUN = process.argv[2] || "dark";

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${RUN}`, {
    waitUntil: "load",
    timeout: 30000,
});
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
    await page.waitForTimeout(150);
}

const res = await page.evaluate(async () => {
    const prm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = document.querySelector(".fourier-field");
    const rect = wrap.getBoundingClientRect();
    const raf = () => new Promise((r) => requestAnimationFrame(r));
    const read = () => {
        const s = getComputedStyle(wrap).getPropertyValue("--ff-head-xy").trim().split(/\s+/).map(Number);
        return s.length === 2 && s.every(Number.isFinite) ? { x: s[0], y: s[1] } : null;
    };
    const disp = (type, ux, uy) =>
        wrap.dispatchEvent(new PointerEvent(type, { clientX: rect.left + ux * rect.width, clientY: rect.top + uy * rect.height, pointerId: 1, pointerType: "mouse", bubbles: true }));

    // (1) ambient — no pointer, 90 frames
    const amb = [];
    for (let i = 0; i < 90; i++) { await raf(); const v = read(); if (v) amb.push(v); }
    const range = (a, k) => (a.length ? Math.max(...a.map(p => p[k])) - Math.min(...a.map(p => p[k])) : 0);
    const ambRange = { x: +range(amb, "x").toFixed(4), y: +range(amb, "y").toFixed(4) };

    // (2) wake + hold LEFT, then RIGHT — bbox follow
    async function held(ux, uy, N) {
        disp("pointerenter", ux, uy);
        for (let i = 0; i < 50; i++) { disp("pointermove", ux, uy); await raf(); }
        const pts = [];
        for (let i = 0; i < N; i++) { disp("pointermove", ux, uy); await raf(); const v = read(); if (v) pts.push(v); }
        const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
        return { n: pts.length, cx: (Math.min(...xs) + Math.max(...xs)) / 2, cy: (Math.min(...ys) + Math.max(...ys)) / 2, rx: +(Math.max(...xs) - Math.min(...xs)).toFixed(3), ry: +(Math.max(...ys) - Math.min(...ys)).toFixed(3) };
    }
    const L = await held(0.12, 0.5, 150);
    const R = await held(0.88, 0.5, 150);
    const T = await held(0.5, 0.12, 150);
    const B = await held(0.5, 0.88, 150);
    return {
        prm, ambRange,
        L, R, T, B,
        followX: +(R.cx - L.cx).toFixed(4),
        followY: +(B.cy - T.cy).toFixed(4),
    };
});
console.log(JSON.stringify({ mode: RUN, ...res }, null, 2));
await page.close();
await browser.close();
