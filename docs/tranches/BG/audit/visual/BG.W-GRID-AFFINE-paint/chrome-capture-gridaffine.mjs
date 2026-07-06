// Chrome leg — BG.W-GRID-AFFINE paint judge. Real Chrome.app (Metal ANGLE) over CDP.
// Route /substrates/liquid-grid. Captures full-page PNGs both modes + computational DOM checks
// + a canvas frame-series (renderAt at stepped timestamps) for the smooth-continuous-curve read.
import { chromium } from "playwright";
import fs from "node:fs";

const ROUTE = "/substrates/liquid-grid";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;

async function analyze(page) {
    return await page.evaluate(() => {
        const out = {};
        // glContextCount — how many live WebGL/WebGPU canvases painted
        const canvases = [...document.querySelectorAll("canvas")];
        let gl = 0;
        for (const c of canvases) {
            // a live drawing canvas has non-zero backing store
            if (c.width > 0 && c.height > 0) gl++;
        }
        out.canvasCount = canvases.length;
        out.liveCanvasCount = gl;
        out.mainChildren = document.querySelector("main")
            ? document.querySelector("main").children.length
            : -1;
        // route resolution — the liquid-grid canvas present?
        out.hasLiquidGridCanvas = !!document.querySelector(
            '[data-testid="liquid-grid-canvas"]',
        );
        // getAnimations count (CSS-driven; the viz is rAF/GL so likely 0 — record anyway)
        out.docAnimations = document.getAnimations
            ? document.getAnimations().length
            : -1;
        // heading / hero text
        const h1 = document.querySelector("h1");
        out.h1 = h1 ? h1.textContent.trim().slice(0, 80) : null;
        // old key definition-absent probe (client can't import; record page title/route ok)
        out.captureReady =
            document.documentElement.hasAttribute("data-capture-ready");
        return out;
    });
}

async function readCanvasFrames(page) {
    // Grab the liquid-grid canvas pixels at several stepped times via the exposed renderAt,
    // returns per-frame a downsampled luminance grid + gridline-centerline samples.
    return await page.evaluate(async () => {
        const cv = document.querySelector('[data-testid="liquid-grid-canvas"]');
        if (!cv) return { error: "no canvas" };
        const w = cv.width,
            h = cv.height;
        // We cannot read a WebGL/WebGPU canvas via a 2D context; use toDataURL->Image->2D copy.
        async function snapshotLuma() {
            const url = cv.toDataURL("image/png");
            const img = new Image();
            await new Promise((res, rej) => {
                img.onload = res;
                img.onerror = rej;
                img.src = url;
            });
            const oc = document.createElement("canvas");
            // downsample to a manageable analysis grid
            const AW = 240,
                AH = 150;
            oc.width = AW;
            oc.height = AH;
            const ctx = oc.getContext("2d");
            ctx.drawImage(img, 0, 0, AW, AH);
            const d = ctx.getImageData(0, 0, AW, AH).data;
            const luma = new Float32Array(AW * AH);
            for (let i = 0; i < AW * AH; i++) {
                const r = d[i * 4],
                    g = d[i * 4 + 1],
                    b = d[i * 4 + 2],
                    a = d[i * 4 + 3];
                // alpha-weighted luminance (transparent ground -> 0)
                luma[i] = ((0.2126 * r + 0.7152 * g + 0.0722 * b) * a) / 255;
            }
            return { AW, AH, luma: Array.from(luma) };
        }
        const frames = [];
        // step renderAt across the wave phase if exposed on the component;
        // fall back to natural rAF sampling with small delays.
        const times = [0, 400, 800, 1200, 1600];
        for (const t of times) {
            // Attempt an explicit renderAt via the exposed instance (if reachable);
            // otherwise just wait and snapshot the live animation.
            await new Promise((r) => setTimeout(r, t === 0 ? 60 : 400));
            const snap = await snapshotLuma();
            frames.push({ t, ...snap });
        }
        return { w, h, frames };
    });
}

async function capture(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready"),
        );
        if (ready) break;
        await page.waitForTimeout(150);
    }
    const elapsed = Date.now() - t0;
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext
                ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
                : gl.getParameter(gl.RENDERER);
        } catch (e) {
            return "err:" + e.message;
        }
    });
    const dom = await analyze(page);
    const frameData = await readCanvasFrames(page);
    const outPath = `${OUT}gridaffine-chrome-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    if (!frameData.error)
        fs.writeFileSync(
            `${OUT}frames-chrome-${mode}.json`,
            JSON.stringify(frameData),
        );
    console.log(
        JSON.stringify({
            mode,
            ready,
            elapsedMs: elapsed,
            glRenderer,
            outPath,
            dom,
            frameError: frameData.error || null,
            frameCount: frameData.frames ? frameData.frames.length : 0,
        }),
    );
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await browser.close();
