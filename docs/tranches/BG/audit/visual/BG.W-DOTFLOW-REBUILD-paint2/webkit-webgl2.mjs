// Non-authoring paint judge — WebKit-ENGINE / WebGL2-fallback leg for BG.W-DOTFLOW-REBUILD.
// Playwright WebKit has NO WebGPU, so useGpuSubstrate falls to the byte-identical WebGL2 (GLSL)
// channel. This is the criterion's explicitly-permitted "WebGL2 channel painting the SAME gestalt"
// AND it is snapshottable via locator.screenshot() (unlike the WebGPU canvas in the WKWebView
// takeSnapshotWithConfiguration path). It proves the shared streamline MATH (sampleStreamField /
// deriveStreamUniforms → flow-field.glsl.ts) paints the reference gestalt on the WebKit rasterizer.
import { webkit } from "playwright";
import { PNG } from "pngjs";
import { readFileSync } from "node:fs";

const BASE = "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;
const ROUTE = "/substrates/dot-flow-field";
const SEL = ".rounded-card canvas";

function census(path) {
    const png = PNG.sync.read(readFileSync(path));
    const { width: w, height: h, data } = png;
    let sum = 0, sq = 0, n = 0, colored = 0, max = 0;
    const cols = 24; const colLum = new Array(cols).fill(0); const colN = new Array(cols).fill(0);
    const rows = 40; const rowLum = new Array(rows).fill(0); const rowN = new Array(rows).fill(0);
    const lumArr = [];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            sum += lum; sq += lum * lum; n++;
            if (lum > max) max = lum;
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
            if (mx - mn > 24) colored++;
            if (lumArr.length < 400000) lumArr.push(lum);
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

async function boot(page, mode) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
        await page.waitForTimeout(150);
    }
    return Date.now() - t0;
}

const browser = await webkit.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
for (const mode of ["light", "dark"]) {
    const page = await ctx.newPage();
    const elapsed = await boot(page, mode);
    const probe = await page.evaluate((sel) => {
        const cv = document.querySelector(sel);
        let liveChannel = "unknown";
        if (cv) {
            try { if (cv.getContext("webgpu")) liveChannel = "webgpu"; } catch (e) {}
            if (liveChannel === "unknown") { try { if (cv.getContext("webgl2")) liveChannel = "webgl2"; } catch (e) {} }
            if (liveChannel === "unknown") { try { if (cv.getContext("2d")) liveChannel = "2d"; } catch (e) {} }
        }
        let renderer = "n/a";
        try { const c3 = document.createElement("canvas"); const gl = c3.getContext("webgl2"); const ext = gl && gl.getExtension("WEBGL_debug_renderer_info"); renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : (gl ? gl.getParameter(gl.RENDERER) : "no-gl"); } catch (e) { renderer = "err"; }
        return { hasCanvas: !!cv, wgpu: !!navigator.gpu, liveChannel, renderer, nCanvas: document.querySelectorAll("canvas").length, cw: cv ? cv.width : 0, chh: cv ? cv.height : 0 };
    }, SEL);
    const loc = page.locator(SEL).first();
    await loc.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(3500); // viz warm-up
    const canvasShot = `${OUT}webkit-gl2-${mode}-canvas.png`;
    let c = null, motion = null, ptrBend = null;
    try {
        await loc.screenshot({ path: canvasShot, timeout: 8000 });
        c = census(canvasShot);
        await page.waitForTimeout(800);
        const t2 = `${OUT}webkit-gl2-${mode}-t2.png`;
        await loc.screenshot({ path: t2, timeout: 8000 });
        motion = frameDiff(canvasShot, t2);
        // pointer bend
        const box = await loc.boundingBox();
        if (box) {
            await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5);
            await page.waitForTimeout(300);
            const p1 = `${OUT}webkit-gl2-${mode}-ptr1.png`; await loc.screenshot({ path: p1, timeout: 8000 });
            await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5, { steps: 12 });
            await page.waitForTimeout(500);
            const p2 = `${OUT}webkit-gl2-${mode}-ptr2.png`; await loc.screenshot({ path: p2, timeout: 8000 });
            ptrBend = frameDiff(p1, p2);
        }
    } catch (e) { c = { error: String(e) }; }
    console.log(JSON.stringify({ mode, elapsed, probe, canvasShot, motion, ptrBend, census: c }, null, 2));
    await page.close();
}
await browser.close();
