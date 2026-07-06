// BG.W-FOURIER-BEAUTY — phase-invariant follow re-probe. The bbox-CENTER of head-xy over
// a long window is invariant to the comet sweep phase, so it isolates the LEAN (the follow)
// from the clock sweep. Confirms the follow is real + correctly-signed in BOTH modes, and
// separately checks whether the clock advances (the comet sweeps) with no pointer input.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const BASE = "http://localhost:5200";
const ROUTE = "/substrates/fourier-field";

async function boot(page, mode) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, {
        waitUntil: "load",
        timeout: 30000,
    });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready")))
            break;
        await page.waitForTimeout(150);
    }
}

async function probe(page) {
    return await page.evaluate(async () => {
        const wrap = document.querySelector(".fourier-field");
        const rect = wrap.getBoundingClientRect();
        const raf = () => new Promise((r) => requestAnimationFrame(r));
        const read = () => {
            const s = getComputedStyle(wrap).getPropertyValue("--ff-head-xy").trim().split(/\s+/).map(Number);
            return s.length === 2 && s.every(Number.isFinite) ? { x: s[0], y: s[1] } : null;
        };
        const dispatch = (type, ux, uy) =>
            wrap.dispatchEvent(
                new PointerEvent(type, {
                    clientX: rect.left + ux * rect.width,
                    clientY: rect.top + uy * rect.height,
                    pointerId: 1,
                    pointerType: "mouse",
                    bubbles: true,
                })
            );

        // bbox-center + mean of head-xy over N frames at a held pointer position.
        async function held(ux, uy, N) {
            dispatch("pointerenter", ux, uy);
            for (let i = 0; i < 60; i++) {
                dispatch("pointermove", ux, uy);
                await raf();
            } // settle
            const pts = [];
            for (let i = 0; i < N; i++) {
                dispatch("pointermove", ux, uy);
                await raf();
                const v = read();
                if (v) pts.push(v);
            }
            const xs = pts.map((p) => p.x),
                ys = pts.map((p) => p.y);
            return {
                n: pts.length,
                cx: (Math.min(...xs) + Math.max(...xs)) / 2, // bbox center X (phase-invariant)
                cy: (Math.min(...ys) + Math.max(...ys)) / 2,
                rangeX: Math.max(...xs) - Math.min(...xs), // sweep extent = clock activity
                rangeY: Math.max(...ys) - Math.min(...ys),
                meanX: xs.reduce((a, b) => a + b, 0) / (xs.length || 1),
                meanY: ys.reduce((a, b) => a + b, 0) / (ys.length || 1),
            };
        }

        const L = await held(0.12, 0.5, 200);
        const R = await held(0.88, 0.5, 200);
        const T = await held(0.5, 0.12, 200);
        const B = await held(0.5, 0.88, 200);

        // Clock-advance check: no pointer input for 120 frames, does head sweep?
        dispatch("pointerleave", 0.5, 0.5);
        for (let i = 0; i < 20; i++) await raf();
        const ambient = [];
        for (let i = 0; i < 120; i++) {
            await raf();
            const v = read();
            if (v) ambient.push(v);
        }
        const axs = ambient.map((p) => p.x),
            ays = ambient.map((p) => p.y);
        const ambientRange = ambient.length
            ? { x: Math.max(...axs) - Math.min(...axs), y: Math.max(...ays) - Math.min(...ays), n: ambient.length }
            : { x: 0, y: 0, n: 0 };

        return {
            bboxCenter: { L, R, T, B },
            followX_bbox: +(R.cx - L.cx).toFixed(4),
            followY_bbox: +(B.cy - T.cy).toFixed(4),
            followX_mean: +(R.meanX - L.meanX).toFixed(4),
            followY_mean: +(B.meanY - T.meanY).toFixed(4),
            ambientRange,
        };
    });
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const out = {};
for (const mode of ["light", "dark"]) {
    const page = await ctx.newPage();
    await boot(page, mode);
    out[mode] = await probe(page);
    await page.close();
    console.error("done", mode);
}
console.log(JSON.stringify(out, null, 2));
await browser.close();
