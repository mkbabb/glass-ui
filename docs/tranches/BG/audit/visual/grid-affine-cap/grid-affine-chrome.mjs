// Chrome leg — BG.W-GRID-AFFINE. Real on-screen Chrome.app (Metal GPU) via CDP.
// Captures /substrates/liquid-grid both modes + probes: route resolves, old key absent,
// GL context count, computed DOM affine checks, and a 3-frame series for smooth-bow read.
import { chromium } from "playwright";

const CDP = "http://localhost:9333";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/";
const ROUTE = "/substrates/liquid-grid";

async function pollReady(page, ms = 15000) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
        const r = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        );
        if (r) return Date.now() - t0;
        await page.waitForTimeout(150);
    }
    return -1;
}

async function glRenderer(page) {
    return page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });
}

async function domProbe(page) {
    return page.evaluate(() => {
        const out = {};
        const main = document.querySelector("main");
        out.mainChildren = main ? main.children.length : -1;
        // count live GL/GPU contexts (canvas count as proxy)
        const canvases = Array.from(document.querySelectorAll("canvas"));
        out.canvasCount = canvases.length;
        out.canvasSizes = canvases.map(c => `${c.width}x${c.height}`);
        // is a canvas actually painting (non-empty)? sample a webgl2 one's drawingBuffer
        out.glContexts = canvases.filter(c => {
            try { return !!(c.getContext("webgl2") || c.__ctx); } catch { return false; }
        }).length;
        // any element with animation-timeline / running animations on the viz host
        out.runningAnims = document.getAnimations ? document.getAnimations().filter(a => a.playState === "running").length : -1;
        return out;
    });
}

async function capture(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const readyMs = await pollReady(page);
    const gl = await glRenderer(page);
    const dom = await domProbe(page);
    const outPath = `${OUT}liquid-grid-chrome-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    // 3-frame viz-crop series (the canvas region) for smooth-bow read — 400ms apart
    const frames = [];
    for (let i = 0; i < 3; i++) {
        const fp = `${OUT}liquid-grid-chrome-${mode}-frame${i}.png`;
        // clip to top ~900px region (the viz stage)
        await page.screenshot({ path: fp, clip: { x: 0, y: 0, width: 1440, height: 720 } });
        frames.push(fp);
        if (i < 2) await page.waitForTimeout(450);
    }
    console.log(JSON.stringify({ mode, readyMs, gl, dom, outPath, frames }, null, 0));
    await page.close();
}

// old-key resolution probe
async function oldKeyProbe(ctx) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent("/substrates/paper-grid")}&mode=light`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => ({
        ready: document.documentElement.hasAttribute("data-capture-ready"),
        bodyText: (document.querySelector("main")?.innerText || document.body.innerText || "").slice(0, 400),
        canvasCount: document.querySelectorAll("canvas").length,
    }));
    console.log("OLD_KEY_PROBE:" + JSON.stringify(info, null, 0));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await oldKeyProbe(ctx);
await browser.close();
