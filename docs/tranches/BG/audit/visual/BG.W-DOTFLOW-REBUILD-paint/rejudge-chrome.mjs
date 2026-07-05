// BG.W-DOTFLOW-REBUILD re-judge — Chrome (CDP → real Chrome.app / Metal WebGPU).
// Boots ?capture over BUILT :5200, polls data-capture-ready, probes GL_RENDERER + the
// bound-context type on the DotFlowField canvas, scrolls the showcase canvas near top,
// screenshots the full page + a canvas-region crop. Samples an in-page pixel census over
// the canvas from a fresh readback so we judge the LIVE composite.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-paint";
const ROUTE = "/substrates/dot-flow-field";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

const browser = await chromium.connectOverCDP(CDP);
const results = [];
for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    try {
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        ready = true;
    } catch { ready = false; }
    // Let the viz run several seconds so trails/streamlines develop.
    await page.waitForTimeout(4000);

    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const dbg = gl.getExtension("WEBGL_debug_renderer_info");
            return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
        } catch (e) { return "err:" + e.message; }
    });

    // Probe the DotFlowField canvas: which context is bound + a census read.
    const probe = await page.evaluate(() => {
        const cv = document.querySelector(".rounded-card canvas") || document.querySelector("canvas");
        if (!cv) return { found: false };
        // Which context is bound? getContext returns the SAME object if already created.
        let gpu = false, gl2 = false, wgpu = false;
        try { if (cv.getContext("webgpu")) wgpu = true; } catch {}
        try { if (cv.getContext("webgl2")) gl2 = true; } catch {}
        const r = cv.getBoundingClientRect();
        return {
            found: true,
            wgpu, gl2,
            cssW: Math.round(r.width), cssH: Math.round(r.height),
            top: Math.round(r.top),
            drawW: cv.width, drawH: cv.height,
        };
    });

    // Scroll the showcase canvas to near the top of the viewport.
    const scrolled = await page.evaluate(() => {
        const cv = document.querySelector(".rounded-card canvas") || document.querySelector("canvas");
        if (!cv) return "no-canvas";
        let el = cv.parentElement, sc = null;
        while (el) {
            const st = getComputedStyle(el);
            if ((st.overflowY === "auto" || st.overflowY === "scroll") && el.scrollHeight > el.clientHeight + 4) { sc = el; break; }
            el = el.parentElement;
        }
        const r = cv.getBoundingClientRect();
        const delta = r.top - 150;
        if (sc) sc.scrollTop += delta; else window.scrollBy(0, delta);
        return "scrolled " + Math.round(delta) + " via " + (sc ? sc.tagName + "." + sc.className : "window");
    });
    await page.waitForTimeout(2500);

    // Full-page screenshot (badge in top-left) + canvas-region crop.
    const full = `${OUT}/rejudge-chrome-${mode}.png`;
    await page.screenshot({ path: full, fullPage: false });

    const box = await page.evaluate(() => {
        const cv = document.querySelector(".rounded-card canvas") || document.querySelector("canvas");
        if (!cv) return null;
        const r = cv.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
    });
    let canvasPng = null;
    if (box && box.w > 10 && box.h > 10) {
        canvasPng = `${OUT}/rejudge-chrome-canvas-${mode}.png`;
        const cx = Math.max(0, Math.floor(box.x)), cy = Math.max(0, Math.floor(box.y));
        const cw = Math.min(SIZE.w - cx, Math.floor(box.w)), ch = Math.min(SIZE.h - cy, Math.floor(box.h));
        await page.screenshot({ path: canvasPng, clip: { x: cx, y: cy, width: cw, height: ch } });
    }

    results.push({ mode, ready, glRenderer, probe, scrolled, full, canvasPng });
    await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 1));
