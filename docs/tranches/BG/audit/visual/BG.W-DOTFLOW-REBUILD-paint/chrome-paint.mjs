// Non-authoring paint judge — Chrome/Metal leg for BG.W-DOTFLOW-REBUILD.
// Real Chrome.app 149 over CDP :9334 (real Metal GPU). Selects the ACTUAL viz canvas
// (.dot-flow-field-canvas), scrolls it into view inside .demo-main-scroller, clips it.
import { chromium } from "playwright";
import { PNG } from "pngjs";
import { readFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const ROUTE = "/substrates/dot-flow-field";
const CDP = process.env.CDP_URL || "http://localhost:9334";
const SEL = ".dot-flow-field-canvas";

function census(path) {
    const png = PNG.sync.read(readFileSync(path));
    const { width: w, height: h, data } = png;
    let sum = 0, sq = 0, n = 0, colored = 0, max = 0; const lumArr = [];
    const cols = 24; const colLum = new Array(cols).fill(0); const colN = new Array(cols).fill(0);
    // row-luma profile to count horizontal streamline bands
    const rows = 40; const rowLum = new Array(rows).fill(0); const rowN = new Array(rows).fill(0);
    for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
            const i = (y * w + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            sum += lum; sq += lum * lum; n++;
            if (lum > max) max = lum;
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
            if (mx - mn > 24) colored++;
            if (lumArr.length < 200000) lumArr.push(lum);
            const c = Math.min(cols - 1, Math.floor((x / w) * cols));
            colLum[c] += lum; colN[c]++;
            const rr = Math.min(rows - 1, Math.floor((y / h) * rows));
            rowLum[rr] += lum; rowN[rr]++;
        }
    }
    lumArr.sort((a, b) => a - b);
    const mean = sum / n;
    const stdev = Math.sqrt(Math.max(0, sq / n - mean * mean));
    const p99 = lumArr[Math.floor(lumArr.length * 0.99)];
    const p50 = lumArr[Math.floor(lumArr.length * 0.5)];
    const colProfile = colLum.map((s, i) => +(s / Math.max(1, colN[i])).toFixed(1));
    const rowProfile = rowLum.map((s, i) => +(s / Math.max(1, rowN[i])).toFixed(1));
    // column evenness: coefficient of variation across cols (low = no L→R wash)
    const cMean = colProfile.reduce((a, b) => a + b, 0) / cols;
    const cStd = Math.sqrt(colProfile.reduce((a, b) => a + (b - cMean) ** 2, 0) / cols);
    return {
        w, h, meanLum: +mean.toFixed(2), stdevLum: +stdev.toFixed(2),
        p50: +p50.toFixed(1), p99: +p99.toFixed(1), max: +max.toFixed(1),
        coloredPct: +((colored / n) * 100).toFixed(2),
        colCoefVar: +(cStd / Math.max(1, cMean)).toFixed(3),
        colProfile, rowProfile,
    };
}

function frameDiff(a, b) {
    const pa = PNG.sync.read(readFileSync(a)); const pb = PNG.sync.read(readFileSync(b));
    if (pa.width !== pb.width || pa.height !== pb.height) return -1;
    let d = 0, n = 0;
    for (let i = 0; i < pa.data.length; i += 16) {
        const la = 0.299 * pa.data[i] + 0.587 * pa.data[i + 1] + 0.114 * pa.data[i + 2];
        const lb = 0.299 * pb.data[i] + 0.587 * pb.data[i + 1] + 0.114 * pb.data[i + 2];
        d += Math.abs(la - lb); n++;
    }
    return +(d / n).toFixed(3);
}

async function capture(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false; const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
        if (ready) break; await page.waitForTimeout(150);
    }
    // channel probe on the ACTUAL viz canvas + count live GL contexts
    const probe = await page.evaluate((sel) => {
        const cv = document.querySelector(sel);
        let ctxKind = "none";
        if (cv) {
            // do not steal the live context; infer from the wrapper's data or a fresh probe
            try { const c2 = document.createElement("canvas"); const g2 = c2.getContext("webgl2"); ctxKind = g2 ? "webgl2-avail" : "no-gl2"; } catch (e) { ctxKind = "err"; }
        }
        let renderer = "n/a";
        try { const c3 = document.createElement("canvas"); const gl = c3.getContext("webgl2"); const ext = gl && gl.getExtension("WEBGL_debug_renderer_info"); renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : (gl ? gl.getParameter(gl.RENDERER) : "no-gl"); } catch (e) { renderer = "err"; }
        return { hasCanvas: !!cv, wgpu: !!navigator.gpu, ctxKind, renderer, nCanvas: document.querySelectorAll("canvas").length };
    }, SEL);
    // scroll the viz canvas to center inside the internal scroller
    await page.evaluate((sel) => {
        const cv = document.querySelector(sel);
        if (cv) cv.scrollIntoView({ block: "center", inline: "center" });
    }, SEL);
    await page.waitForTimeout(3500); // viz warm-up after scroll
    const rect = await page.evaluate((sel) => {
        const cv = document.querySelector(sel); if (!cv) return null;
        const r = cv.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    }, SEL);
    const fullPath = `${OUT}chrome-${mode}-full.png`;
    await page.screenshot({ path: fullPath, fullPage: false });
    let canvasPath = null, motion = null, ptrBend = null;
    if (rect && rect.w > 10 && rect.h > 10 && rect.y >= -50 && rect.y < 900) {
        const clip = {
            x: Math.max(0, Math.round(rect.x)),
            y: Math.max(0, Math.round(rect.y)),
            width: Math.round(Math.min(rect.w, 1440 - Math.max(0, rect.x))),
            height: Math.round(Math.min(rect.h, 900 - Math.max(0, rect.y))),
        };
        canvasPath = `${OUT}chrome-${mode}-canvas.png`;
        await page.screenshot({ path: canvasPath, clip });
        await page.waitForTimeout(800);
        const t2 = `${OUT}chrome-${mode}-canvas-t2.png`;
        await page.screenshot({ path: t2, clip });
        motion = frameDiff(canvasPath, t2);
        const cy = clip.y + clip.height / 2;
        await page.mouse.move(clip.x + clip.width * 0.25, cy); await page.waitForTimeout(300);
        const p1 = `${OUT}chrome-${mode}-canvas-ptr1.png`; await page.screenshot({ path: p1, clip });
        await page.mouse.move(clip.x + clip.width * 0.75, cy, { steps: 10 }); await page.waitForTimeout(450);
        const p2 = `${OUT}chrome-${mode}-canvas-ptr2.png`; await page.screenshot({ path: p2, clip });
        ptrBend = frameDiff(p1, p2);
    }
    const c = canvasPath ? census(canvasPath) : null;
    console.log(JSON.stringify({ mode, ready, elapsedMs: Date.now() - t0, probe, rect, motion, ptrBend, census: c, canvasPath }, null, 2));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await browser.close();
