// Chrome leg — dual-engine paint capture for BG.W-HANDMARK-PERFECT (/motion/handmark).
// Real on-screen Chrome.app (real Metal GPU) via CDP. Polls data-capture-ready, then full-page shot.
import { chromium } from "playwright";

const ROUTE = "/motion/handmark";
const CDP = process.env.CDP_URL || "http://localhost:9334";
const OUT = process.env.OUT_DIR;

async function capture(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
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
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });
    // Computed DOM probes for the criteria
    const probes = await page.evaluate(() => {
        const main = document.querySelector("main");
        const marks = Array.from(document.querySelectorAll("svg.hm, .hm svg, [class*='handmark'] svg, svg[aria-hidden='true']"));
        // gather HandMark SVG viewBoxes + path counts
        const hm = Array.from(document.querySelectorAll("[aria-hidden='true']"))
            .filter(el => el.tagName.toLowerCase() === "svg")
            .map(svg => ({
                vb: svg.getAttribute("viewBox"),
                paths: svg.querySelectorAll("path").length,
                pathHasD: Array.from(svg.querySelectorAll("path")).every(p => (p.getAttribute("d") || "").length > 4),
            }));
        return {
            mainChildren: main ? main.children.length : -1,
            glCanvasCount: document.querySelectorAll("canvas").length,
            hmSvgCount: hm.length,
            hmAllPathsHaveD: hm.length ? hm.every(h => h.pathHasD) : null,
            hmSamples: hm.slice(0, 6),
        };
    });
    const outPath = `${OUT}/chrome-handmark-${mode}.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ mode, ready, elapsedMs: elapsed, glRenderer, outPath, probes }, null, 2));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await browser.close();
