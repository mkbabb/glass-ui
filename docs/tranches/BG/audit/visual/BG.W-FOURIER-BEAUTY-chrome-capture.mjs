// BG.W-FOURIER-BEAUTY — Chrome CDP fullPage capture (all routes × modes) + layout measure.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname + "BG.W-FOURIER-BEAUTY-paint/";
const BASE = "http://localhost:5200";

const ROUTES = [
    ["/substrates/fourier-field", "ff"],
    ["/motion/curve-gallery", "cg"],
];

async function cap(ctx, route, tag, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    let ready = false;
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
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
    const layout = await page.evaluate(() => {
        const doc = document.documentElement;
        const total = Math.max(doc.scrollHeight, document.body.scrollHeight);
        const canvases = [...document.querySelectorAll("canvas")].map((c) => {
            const r = c.getBoundingClientRect();
            return { cls: c.className, top: Math.round(r.top + window.scrollY), h: Math.round(r.height), w: Math.round(r.width) };
        });
        // curve gallery plot elements (svg/canvas inside cards)
        const plots = [...document.querySelectorAll("svg, canvas")].length;
        return { totalHeight: total, canvases, plots };
    });
    const outPath = `${OUT}${tag}-chrome-${mode}-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ tag, mode, ready, elapsed: Date.now() - t0, glRenderer, layout, outPath }));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const [route, tag] of ROUTES) {
    for (const mode of ["light", "dark"]) {
        await cap(ctx, route, tag, mode);
    }
}
await browser.close();
