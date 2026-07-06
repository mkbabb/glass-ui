// BG.W-FOURIER-BEAUTY — Chrome CDP capture + computed-DOM/pointer/pixel analysis.
// Non-authoring paint judge. Drives REAL Chrome.app (Metal) over ?capture= boot path.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname + "BG.W-FOURIER-BEAUTY-paint/";
const BASE = "http://localhost:5200";

async function boot(ctx, route, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    let ready = false;
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready"),
        );
        if (ready) break;
        await page.waitForTimeout(150);
    }
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });
    return { page, ready, glRenderer, elapsed: Date.now() - t0 };
}

// DOM/state probe for the fourier field.
async function probeFourier(page) {
    return await page.evaluate(() => {
        const dpr = window.devicePixelRatio;
        const fields = [...document.querySelectorAll(".fourier-field")];
        const canvases = [...document.querySelectorAll("canvas")];
        const glCount = canvases.filter((c) => {
            try {
                // probing getContext returns the existing context if already created of that type
                return !!(c.getContext("webgl2") || c.getContext("webgl") || c.__glctx);
            } catch { return false; }
        }).length;
        const main = document.querySelector("main");
        const info = fields.map((f) => {
            const cv = f.querySelector("canvas");
            const r = cv ? cv.getBoundingClientRect() : null;
            const cs = getComputedStyle(f);
            return {
                interactive: f.classList.contains("fourier-field--interactive"),
                pointerEvents: cs.pointerEvents,
                headXY: cs.getPropertyValue("--ff-head-xy").trim(),
                headHue: cs.getPropertyValue("--ff-head-hue").trim(),
                cssW: r ? +r.width.toFixed(1) : null,
                cssH: r ? +r.height.toFixed(1) : null,
                backingW: cv ? cv.width : null,
                backingH: cv ? cv.height : null,
            };
        });
        return {
            dpr,
            fieldCount: fields.length,
            canvasCount: canvases.length,
            glCanvasCount: glCount,
            mainChildren: main ? main.children.length : null,
            fields: info,
        };
    });
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const { page, ready, glRenderer, elapsed } = await boot(ctx, "/substrates/fourier-field", "dark");
console.log(JSON.stringify({ ready, glRenderer, elapsed }));
const probe = await probeFourier(page);
console.log(JSON.stringify(probe, null, 2));

// Sample --ff-head-xy over ~1s to confirm the comet traces (liveness).
const samples = [];
for (let i = 0; i < 20; i++) {
    const v = await page.evaluate(() => {
        const f = document.querySelector(".fourier-field");
        return f ? getComputedStyle(f).getPropertyValue("--ff-head-xy").trim() : "";
    });
    samples.push(v);
    await page.waitForTimeout(50);
}
console.log("HEAD_XY_SAMPLES:", JSON.stringify(samples));
await page.close();
await browser.close();
