// Chrome leg — BG.W-CONCENTRIC-LEVELCURVES paint judge. Targets the .concentric-canvas HERO
// (not the recessive full-viewport aurora background). Real Chrome.app (ANGLE/Metal). Element
// screenshots decoded with pngjs (WebGL buffers clear post-composite → drawImage returns black).
import { chromium } from "playwright";
import { PNG } from "pngjs";

const ROUTE = "/substrates/concentric";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;

function statsFromPng(buf) {
    const png = PNG.sync.read(buf);
    const d = png.data, W = png.width, H = png.height;
    let s = 0;
    const luma = new Float64Array(W * H);
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
        const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        luma[p] = l; s += l;
    }
    let edge = 0, cnt = 0;
    for (let y = 0; y < H; y++)
        for (let x = 1; x < W; x++) { edge += Math.abs(luma[y * W + x] - luma[y * W + x - 1]); cnt++; }
    return { mean: +(s / (W * H) / 255).toFixed(5), edge: +(edge / cnt / 255).toFixed(5), w: W, h: H };
}

async function pollReady(page, budget = 15000) {
    const t0 = Date.now();
    while (Date.now() - t0 < budget) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
        await page.waitForTimeout(150);
    }
    return Date.now() - t0;
}

async function captureMode(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const elapsed = await pollReady(page);

    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });

    const checks = await page.evaluate(() => {
        const canvases = Array.from(document.querySelectorAll("canvas"));
        const conc = document.querySelector(".concentric-canvas");
        const aurora = document.querySelector(".aurora-canvas");
        const main = document.querySelector("main");
        const r = conc ? conc.getBoundingClientRect() : null;
        const pr = conc && conc.parentElement ? conc.parentElement.getBoundingClientRect() : null;
        return {
            canvasCount: canvases.length,
            mainChildren: main ? main.children.length : -1,
            docAnimations: (() => { try { return document.getAnimations().length; } catch (e) { return "err"; } })(),
            hasConcentric: !!conc, hasAurora: !!aurora,
            auroraOpacity: aurora ? getComputedStyle(aurora).opacity : null,
            concentricRect: r ? { w: Math.round(r.width), h: Math.round(r.height) } : null,
            fitsEnvelope: (r && pr) ? (r.width <= pr.width + 2 && r.height <= pr.height + 2) : null,
        };
    });

    const conc = page.locator(".concentric-canvas");
    await conc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // full page (context) + concentric-only element captures
    const fullPath = `${OUT}concentric-chrome-${mode}-full.png`;
    await page.screenshot({ path: fullPath, fullPage: true });
    const heroPath = `${OUT}concentric-chrome-${mode}-hero.png`;
    await conc.screenshot({ path: heroPath });

    // 10s unattended frame-series on the concentric hero
    const series = [];
    for (let i = 0; i < 18; i++) {
        series.push(statsFromPng(await conc.screenshot()));
        await page.waitForTimeout(550);
    }
    const means = series.map((s) => s.mean);
    const deltas = [];
    for (let i = 1; i < means.length; i++) deltas.push(+Math.abs(means[i] - means[i - 1]).toFixed(5));
    const maxDelta = deltas.length ? Math.max(...deltas) : null;
    const totalVar = deltas.length ? +deltas.reduce((a, b) => a + b, 0).toFixed(5) : null;
    const distinctFrames = new Set(means).size;
    const avgEdge = +(series.reduce((a, s) => a + s.edge, 0) / series.length).toFixed(5);

    // pointer gesture over the concentric hero (viewport coords)
    const box = await conc.boundingBox();
    const gesture = [];
    const shot = async () => statsFromPng(await conc.screenshot());
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.3, { steps: 3 });
    await page.waitForTimeout(200); gesture.push({ step: "enter", ...(await shot()) });
    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.6, { steps: 25 });
    await page.waitForTimeout(200); gesture.push({ step: "sweep", ...(await shot()) });
    await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.25, { steps: 2 });
    await page.waitForTimeout(150); gesture.push({ step: "flick", ...(await shot()) });
    await page.mouse.move(box.x - 40, box.y - 40, { steps: 5 });
    await page.waitForTimeout(450); gesture.push({ step: "leave", ...(await shot()) });
    const a2 = await shot(); await page.waitForTimeout(700); const b2 = await shot();
    const residual = +Math.abs(b2.mean - a2.mean).toFixed(5);

    const result = { mode, elapsedMs: elapsed, glRenderer, checks, fullPath, heroPath,
        series, maxDelta, totalVar, distinctFrames, avgEdge,
        gesture: gesture.map((g) => ({ step: g.step, mean: g.mean, edge: g.edge })), residual };
    console.log("RESULT " + JSON.stringify(result));
    await page.close();
    return result;
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await captureMode(ctx, "light");
await captureMode(ctx, "dark");
await browser.close();
