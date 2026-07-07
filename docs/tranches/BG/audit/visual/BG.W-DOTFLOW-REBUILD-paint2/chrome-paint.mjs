// Non-authoring paint judge (RE-JUDGE) — Chrome/Metal leg for BG.W-DOTFLOW-REBUILD.
// Real Chrome.app 149 over CDP :9333 (real Metal GPU). Selects the ACTUAL viz canvas,
// scrolls it into view inside the internal scroller, clips it, censuses, motion + pointer-bend.
import { chromium } from "playwright";
import { PNG } from "pngjs";
import { readFileSync } from "node:fs";

const OUT = new URL(".", import.meta.url).pathname;
const ROUTE = "/substrates/dot-flow-field";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const SEL = ".rounded-card canvas";

function census(path) {
    const png = PNG.sync.read(readFileSync(path));
    const { width: w, height: h, data } = png;
    let sum = 0, sq = 0, n = 0, colored = 0, max = 0; const lumArr = [];
    const cols = 24; const colLum = new Array(cols).fill(0); const colN = new Array(cols).fill(0);
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
            if (lumArr.length < 300000) lumArr.push(lum);
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
    const cMean = colProfile.reduce((a, b) => a + b, 0) / cols;
    const cStd = Math.sqrt(colProfile.reduce((a, b) => a + (b - cMean) ** 2, 0) / cols);
    // count row-luma bands crossing above (mean + 0.6*stdevOfRows) = streamline band proxy
    const rMean = rowProfile.reduce((a, b) => a + b, 0) / rows;
    const rStd = Math.sqrt(rowProfile.reduce((a, b) => a + (b - rMean) ** 2, 0) / rows);
    const thr = rMean + 0.5 * rStd;
    let bands = 0, above = false;
    for (const v of rowProfile) { if (v > thr && !above) { bands++; above = true; } else if (v <= thr) above = false; }
    return {
        w, h, meanLum: +mean.toFixed(2), stdevLum: +stdev.toFixed(2),
        p50: +p50.toFixed(1), p99: +p99.toFixed(1), max: +max.toFixed(1),
        coloredPct: +((colored / n) * 100).toFixed(2),
        colCoefVar: +(cStd / Math.max(1, cMean)).toFixed(3),
        rowBandsAboveThr: bands,
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
    // Live-canvas channel probe: read the ACTUAL rendering context of the viz canvas
    // by testing which getContext the existing canvas already holds (webgpu vs webgl2).
    const probe = await page.evaluate((sel) => {
        const cv = document.querySelector(sel);
        let liveChannel = "unknown";
        if (cv) {
            // A canvas already bound to a context returns that same context type; a mismatched
            // getContext returns null. Probe non-destructively in priority order.
            try { if (cv.getContext("webgpu")) liveChannel = "webgpu"; } catch (e) {}
            if (liveChannel === "unknown") { try { if (cv.getContext("webgl2")) liveChannel = "webgl2"; } catch (e) {} }
            if (liveChannel === "unknown") { try { if (cv.getContext("2d")) liveChannel = "2d"; } catch (e) {} }
        }
        let renderer = "n/a";
        try { const c3 = document.createElement("canvas"); const gl = c3.getContext("webgl2"); const ext = gl && gl.getExtension("WEBGL_debug_renderer_info"); renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : (gl ? gl.getParameter(gl.RENDERER) : "no-gl"); } catch (e) { renderer = "err"; }
        return { hasCanvas: !!cv, wgpu: !!navigator.gpu, liveChannel, renderer, nCanvas: document.querySelectorAll("canvas").length };
    }, SEL);
    // scroll the viz canvas to center inside the internal scroller
    await page.evaluate((sel) => {
        const cv = document.querySelector(sel);
        if (cv) cv.scrollIntoView({ block: "center", inline: "center" });
    }, SEL);
    await page.waitForTimeout(4000); // viz warm-up after scroll
    const rect = await page.evaluate((sel) => {
        const cv = document.querySelector(sel); if (!cv) return null;
        const r = cv.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height };
    }, SEL);
    const fullPath = `${OUT}chrome-${mode}-full.png`;
    await page.screenshot({ path: fullPath, fullPage: false });
    let canvasPath = null, motion = null, ptrBend = null, c = null;
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
        await page.mouse.move(clip.x + clip.width * 0.75, cy, { steps: 12 }); await page.waitForTimeout(500);
        const p2 = `${OUT}chrome-${mode}-canvas-ptr2.png`; await page.screenshot({ path: p2, clip });
        ptrBend = frameDiff(p1, p2);
        c = census(canvasPath);
    }
    console.log(JSON.stringify({ mode, ready, elapsedMs: Date.now() - t0, probe, rect, motion, ptrBend, census: c, canvasPath }, null, 2));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await browser.close();
