// Chrome leg of the dual-engine capture pipeline validation (BG.W-DARK-READABILITY-REPAIR route).
// Drives a REAL on-screen Chrome.app (real Metal GPU, NOT headless SwiftShader) over the
// SAME `?capture=<route>&mode=<mode>` boot path via playwright connectOverCDP. Polls
// document.documentElement[data-capture-ready] (never a fixed sleep), then full-page screenshot.
// The in-pixel engine badge carries GL_RENDERER (ANGLE Metal … proves the real GPU).
import { chromium } from "playwright";

const ROUTE = "/foundations/typography";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;

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
            return ext
                ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
                : gl.getParameter(gl.RENDERER);
        } catch (e) {
            return "err:" + e.message;
        }
    });
    const outPath = `${OUT}dark-readability-chrome-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(
        JSON.stringify({ mode, ready, elapsedMs: elapsed, glRenderer, outPath })
    );
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
await capture(ctx, "light");
await capture(ctx, "dark");
await browser.close();
