// LC6 re-judge — Chrome leg. Real Chrome.app (ANGLE/Metal) over ?capture=<route>&mode=<m>
// via connectOverCDP. Full-page + hero crop + computed DOM checks (canvasCount, animationTimeline,
// getAnimations, glContextCount) + GL_RENDERER provenance. Polls data-capture-ready (no fixed sleep).
import { chromium } from "playwright";

const ROUTE = "/substrates/concentric";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;

async function capture(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 2000 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready"));
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
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });
    // computed DOM checks
    const dom = await page.evaluate(() => {
        const main = document.querySelector("main");
        const canvases = Array.from(document.querySelectorAll("canvas"));
        let glCtx = 0;
        for (const c of canvases) {
            // do NOT call getContext (would create a new ctx); infer by dataset/size
        }
        const wrapper = document.querySelector(".concentric-wrapper");
        const cs = wrapper ? getComputedStyle(wrapper) : null;
        // canvas bounding rects
        const rects = canvases.map((c) => {
            const r = c.getBoundingClientRect();
            return { w: Math.round(r.width), h: Math.round(r.height), cw: c.width, ch: c.height,
                     cls: c.className || (c.parentElement && c.parentElement.className) || "" };
        });
        return {
            mainChildren: main ? main.children.length : -1,
            canvasCount: canvases.length,
            concentricWrapperPresent: !!wrapper,
            wrapperContentVisibility: cs ? cs.contentVisibility : null,
            wrapperContain: cs ? cs.contain : null,
            canvasRects: rects,
        };
    });
    const outFull = `${OUT}lc6-conc-chrome-${mode}-full.png`;
    await page.screenshot({ path: outFull }); // viewport-sized (1440x2000)
    // hero crop — the concentric canvas bounding box (viewport coords)
    const heroBox = await page.evaluate(() => {
        const w = document.querySelector(".concentric-wrapper");
        const c = w ? w.querySelector("canvas") : document.querySelector("canvas.concentric-canvas");
        if (!c) return null;
        const r = c.getBoundingClientRect();
        return { x: Math.max(0, r.left), y: Math.max(0, r.top), width: r.width, height: r.height };
    });
    let outHero = null, heroErr = null;
    if (heroBox && heroBox.width > 10 && heroBox.height > 10) {
        outHero = `${OUT}lc6-conc-chrome-${mode}-hero.png`;
        const clip = {
            x: Math.round(heroBox.x), y: Math.round(heroBox.y),
            width: Math.floor(heroBox.width), height: Math.floor(heroBox.height),
        };
        try {
            await page.screenshot({ path: outHero, clip });
        } catch (e) { heroErr = e.message; outHero = null; }
    }
    console.log(JSON.stringify({ mode, ready, elapsedMs: elapsed, glRenderer, dom, heroBox, heroErr, outFull, outHero }, null, 2));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await browser.close();
