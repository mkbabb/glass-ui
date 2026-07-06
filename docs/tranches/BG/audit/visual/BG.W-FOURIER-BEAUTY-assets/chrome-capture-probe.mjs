// BG.W-FOURIER-BEAUTY — Chrome (real Metal M5 Max) leg of the dual-engine paint judge.
// Drives a REAL on-screen Chrome.app over ?capture=<route>&mode=<mode> via CDP.
// For /substrates/fourier-field it ALSO runs the binding B3 pointer-follow probe:
//   (A) a scripted figure-eight pointer sweep, sampling --ff-head-xy every rAF, and
//   (B) a hold-and-measure L/R/T/B centroid-follow test (the measured, bounded, no-snap
//       critically-damped follow).
// Emits fullPage PNGs + a canvas-clip PNG (ribbon cross-section scan) + the probe JSON.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = "http://localhost:5200";

async function bootRoute(page, route, mode) {
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    let ready = false;
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        );
        if (ready) break;
        await page.waitForTimeout(150);
    }
    return { ready, elapsedMs: Date.now() - t0 };
}

async function readDiag(page) {
    return await page.evaluate(() => {
        const out = {};
        // GL renderer provenance (throwaway ctx).
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
            out.glRenderer = ext
                ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
                : gl
                  ? gl.getParameter(gl.RENDERER)
                  : "no-webgl";
        } catch (e) {
            out.glRenderer = "err:" + e.message;
        }
        out.canvasCount = document.querySelectorAll("canvas").length;
        out.mainChildren = document.querySelector("main")
            ? document.querySelector("main").children.length
            : -1;
        const ff = document.querySelector(".fourier-field");
        if (ff) {
            const cs = getComputedStyle(ff);
            out.ffHeadXY = cs.getPropertyValue("--ff-head-xy").trim();
            out.ffHeadHue = cs.getPropertyValue("--ff-head-hue").trim();
            const cv = ff.querySelector("canvas");
            if (cv) {
                const r = cv.getBoundingClientRect();
                out.canvasRect = {
                    x: Math.round(r.x),
                    y: Math.round(r.y),
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                };
                out.canvasBacking = { w: cv.width, h: cv.height };
            }
        }
        // Engine badge text (top-left) for provenance.
        const badge = document.querySelector("[data-capture-badge], .capture-engine-badge");
        out.badgeText = badge ? badge.textContent.trim().slice(0, 120) : null;
        return out;
    });
}

// The B3 pointer-follow probe — runs entirely in-page over the render loop.
async function pointerFollowProbe(page) {
    return await page.evaluate(async () => {
        const wrap = document.querySelector(".fourier-field");
        if (!wrap) return { error: "no .fourier-field" };
        const rect = wrap.getBoundingClientRect();
        const cs = () => getComputedStyle(wrap).getPropertyValue("--ff-head-xy").trim();
        const parseXY = (s) => {
            const p = s.split(/\s+/).map(Number);
            return p.length === 2 && p.every((n) => Number.isFinite(n))
                ? { x: p[0], y: p[1] }
                : null;
        };
        const dispatch = (type, ux, uy) => {
            const clientX = rect.left + ux * rect.width;
            const clientY = rect.top + uy * rect.height;
            wrap.dispatchEvent(
                new PointerEvent(type, {
                    clientX,
                    clientY,
                    pointerId: 1,
                    pointerType: "mouse",
                    bubbles: true,
                    cancelable: true,
                })
            );
        };
        const raf = () => new Promise((r) => requestAnimationFrame(r));

        // Activate the field's interactive follow.
        dispatch("pointerenter", 0.5, 0.5);
        dispatch("pointermove", 0.5, 0.5);
        for (let i = 0; i < 10; i++) await raf(); // settle to center

        // ── Part 0: field-is-animating check (hold pointer, head must sweep) ──
        const animSamples = [];
        for (let i = 0; i < 40; i++) {
            dispatch("pointermove", 0.5, 0.5);
            await raf();
            const v = parseXY(cs());
            if (v) animSamples.push(v);
        }
        let animRange = { x: 0, y: 0 };
        if (animSamples.length > 2) {
            const xs = animSamples.map((s) => s.x),
                ys = animSamples.map((s) => s.y);
            animRange = {
                x: Math.max(...xs) - Math.min(...xs),
                y: Math.max(...ys) - Math.min(...ys),
            };
        }

        // ── Part A: figure-eight sweep, sample every rAF ──
        const series = [];
        const FRAMES = 360;
        const PERIOD = 180; // frames per full Lissajous loop
        for (let f = 0; f < FRAMES; f++) {
            const t = (f % PERIOD) / PERIOD;
            const ux = 0.5 + 0.38 * Math.sin(2 * Math.PI * t);
            const uy = 0.5 + 0.38 * Math.sin(4 * Math.PI * t); // 1:2 → figure-eight
            dispatch("pointermove", ux, uy);
            await raf();
            const v = parseXY(cs());
            if (v) series.push({ f, px: ux, py: uy, hx: v.x, hy: v.y });
        }
        // Frame-to-frame head-xy jumps (raw = comet sweep + lean).
        let rawJumps = [];
        for (let i = 1; i < series.length; i++) {
            rawJumps.push(
                Math.hypot(series[i].hx - series[i - 1].hx, series[i].hy - series[i - 1].hy)
            );
        }
        rawJumps.sort((a, b) => a - b);
        const q = (arr, p) => (arr.length ? arr[Math.floor(p * (arr.length - 1))] : 0);
        // EMA (centroid proxy) smoothness — the critically-damped follow signal.
        let ema = null;
        const emaJumps = [];
        for (const s of series) {
            if (!ema) ema = { x: s.hx, y: s.hy };
            else {
                const nx = ema.x + (s.hx - ema.x) * 0.08;
                const ny = ema.y + (s.hy - ema.y) * 0.08;
                emaJumps.push(Math.hypot(nx - ema.x, ny - ema.y));
                ema = { x: nx, y: ny };
            }
        }
        emaJumps.sort((a, b) => a - b);

        // ── Part B: hold-and-measure centroid follow (L/R/T/B) ──
        async function holdMean(ux, uy, holdFrames) {
            // ramp frames first (let the damped follow settle), then measure a full window.
            for (let i = 0; i < 45; i++) {
                dispatch("pointermove", ux, uy);
                await raf();
            }
            const acc = [];
            for (let i = 0; i < holdFrames; i++) {
                dispatch("pointermove", ux, uy);
                await raf();
                const v = parseXY(cs());
                if (v) acc.push(v);
            }
            const n = acc.length || 1;
            return {
                x: acc.reduce((a, s) => a + s.x, 0) / n,
                y: acc.reduce((a, s) => a + s.y, 0) / n,
                n: acc.length,
            };
        }
        const cL = await holdMean(0.12, 0.5, 90);
        const cR = await holdMean(0.88, 0.5, 90);
        const cT = await holdMean(0.5, 0.12, 90);
        const cB = await holdMean(0.5, 0.88, 90);

        // Transition smoothness L→R: record EMA path, max single-frame EMA jump.
        for (let i = 0; i < 30; i++) {
            dispatch("pointermove", 0.12, 0.5);
            await raf();
        }
        let tema = null;
        let transMaxEmaJump = 0;
        const transPath = [];
        for (let i = 0; i < 120; i++) {
            const ux = i < 15 ? 0.12 : 0.88; // step L→R at frame 15
            dispatch("pointermove", ux, 0.5);
            await raf();
            const v = parseXY(cs());
            if (!v) continue;
            if (!tema) tema = { x: v.x, y: v.y };
            else {
                const nx = tema.x + (v.x - tema.x) * 0.12;
                const ny = tema.y + (v.y - tema.y) * 0.12;
                transMaxEmaJump = Math.max(transMaxEmaJump, Math.hypot(nx - tema.x, ny - tema.y));
                tema = { x: nx, y: ny };
                if (i % 4 === 0) transPath.push({ i, ex: +nx.toFixed(4) });
            }
        }

        dispatch("pointerleave", 0.5, 0.5);

        return {
            animRange,
            series: { count: series.length },
            rawJump: { median: q(rawJumps, 0.5), p95: q(rawJumps, 0.95), max: rawJumps[rawJumps.length - 1] || 0 },
            emaJump: { median: q(emaJumps, 0.5), p95: q(emaJumps, 0.95), max: emaJumps[emaJumps.length - 1] || 0 },
            centroids: { L: cL, R: cR, T: cT, B: cB },
            followX: +(cR.x - cL.x).toFixed(4), // right-pointer minus left-pointer centroid
            followY: +(cB.y - cT.y).toFixed(4),
            transMaxEmaJump: +transMaxEmaJump.toFixed(4),
            transPath,
        };
    });
}

async function shots(page, route, mode) {
    const tag = route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
    const full = `${OUT}${tag}-chrome-${mode}-full.png`;
    await page.screenshot({ path: full, fullPage: true });
    const out = { full };
    // Canvas element screenshot (auto-scrolls) for the ribbon scan (fourier-field only).
    const diag = await readDiag(page);
    try {
        const loc = page.locator(".fourier-field canvas").first();
        if ((await loc.count()) > 0) {
            const clip = `${OUT}${tag}-chrome-${mode}-canvas.png`;
            await loc.screenshot({ path: clip, timeout: 8000 });
            out.canvas = clip;
        }
    } catch (e) {
        out.canvasErr = e.message.slice(0, 100);
    }
    out.diag = diag;
    return out;
}

const ROUTES = ["/substrates/fourier-field", "/motion/curve-gallery"];
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const report = {};
for (const route of ROUTES) {
    report[route] = {};
    for (const mode of ["light", "dark"]) {
        const page = await ctx.newPage();
        const boot = await bootRoute(page, route, mode);
        const s = await shots(page, route, mode);
        const rec = { boot, ...s };
        if (route === "/substrates/fourier-field") {
            rec.probe = await pointerFollowProbe(page);
        }
        report[route][mode] = rec;
        await page.close();
        console.error(`done ${route} ${mode} ready=${boot.ready}`);
    }
}
console.log(JSON.stringify(report, null, 2));
await browser.close();
