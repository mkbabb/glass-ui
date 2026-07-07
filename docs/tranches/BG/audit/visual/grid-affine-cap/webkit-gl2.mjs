// Playwright WebKit engine — NO WebGPU, so useGpuSubstrate falls to the byte-identical WebGL2
// (GLSL twin) channel: the exact path a non-WebGPU WebKit user hits AND the channel a
// locator.screenshot() CAN flatten (unlike the WKWebView takeSnapshotWithConfiguration WebGPU-layer
// limit — BG.W-DOTFLOW-REBUILD / W-FOURIER-BEAUTY precedent). Captures the liquid-grid viz canvas
// directly + probes the live channel (wgpu vs webgl2) + a pixel-variance readback.
import { webkit } from "playwright";
import { PNG } from "pngjs";
import fs from "fs";

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/";
const ROUTE = "/substrates/liquid-grid";

async function pollReady(page, ms = 15000) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) return Date.now() - t0;
        await page.waitForTimeout(150);
    }
    return -1;
}

async function run(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const readyMs = await pollReady(page);
    // probe live channel + canvas binding
    const probe = await page.evaluate(() => {
        const cs = Array.from(document.querySelectorAll("canvas"));
        let viz = null;
        for (const c of cs) { const r = c.getBoundingClientRect(); if (r.width > 0 && r.width < window.innerWidth - 50) { viz = c; break; } }
        if (!viz) viz = cs[cs.length - 1];
        let webgl2Bound = false, webgpuAvail = !!navigator.gpu;
        try { webgl2Bound = !!viz.getContext("webgl2"); } catch (e) { webgl2Bound = false; }
        const r = viz.getBoundingClientRect();
        return { canvasCount: cs.length, vizW: viz.width, vizH: viz.height, cssW: Math.round(r.width), cssH: Math.round(r.height), webgpuAvail, getWebgl2NotNull: webgl2Bound };
    });
    // scroll viz into view + screenshot the viz canvas directly (locator flattens WebGL2)
    const loc = page.locator("canvas").filter({ has: undefined });
    // pick the viz canvas via handle
    const vizHandle = await page.evaluateHandle(() => {
        const cs = Array.from(document.querySelectorAll("canvas"));
        for (const c of cs) { const r = c.getBoundingClientRect(); if (r.width > 0 && r.width < window.innerWidth - 50) return c; }
        return cs[cs.length - 1];
    });
    await vizHandle.asElement().scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const outPath = `${OUT}liquid-grid-webkit-gl2-${mode}-viz.png`;
    await vizHandle.asElement().screenshot({ path: outPath });
    // variance readback: sample the PNG for grid signal (stdev of luminance)
    const png = PNG.sync.read(fs.readFileSync(outPath));
    let sum = 0, sum2 = 0, n = 0, mn = 255, mx = 0;
    for (let y = 0; y < png.height; y += 3) for (let x = 0; x < png.width; x += 3) {
        const i = (y * png.width + x) * 4;
        const L = 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
        sum += L; sum2 += L * L; n++; mn = Math.min(mn, L); mx = Math.max(mx, L);
    }
    const mean = sum / n, sd = Math.sqrt(sum2 / n - mean * mean);
    console.log(JSON.stringify({ mode, readyMs, probe, outPath, pngW: png.width, pngH: png.height, lum: { mean: +mean.toFixed(1), sd: +sd.toFixed(2), min: +mn.toFixed(1), max: +mx.toFixed(1) } }, null, 0));
    await page.close();
}

const browser = await webkit.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
await run(ctx, "light");
await run(ctx, "dark");
await browser.close();
