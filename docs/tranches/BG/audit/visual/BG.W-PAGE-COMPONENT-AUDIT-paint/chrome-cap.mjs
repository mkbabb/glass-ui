// Chrome leg — BG.W-PAGE-COMPONENT-AUDIT cross-page 11-route dual-mode capture.
// Real on-screen Chrome.app (real Metal GPU) over the ?capture=<route>&mode=<mode> boot path
// via playwright connectOverCDP. Polls data-capture-ready (never a fixed sleep), then full-page
// screenshot. The in-pixel engine badge carries GL_RENDERER (proves real GPU, not SwiftShader).
import { chromium } from "playwright";

// [route, fileStem] — the 11 convergence rows (7 Pass-E categories + 4 C2-SENTINEL).
const ROUTES = [
    ["/display/atoms", "display-atoms"],
    ["/containers/dialog", "containers-dialog"],
    ["/data/metrics", "data-metrics"],
    ["/feedback/toast", "feedback-toast"],
    ["/navigation/tabs", "navigation-tabs"],
    ["/compositions/hero", "compositions-hero"],
    ["/motion/scroll", "motion-scroll"],
    ["/forms/inputs", "forms-inputs"],
    ["/compositions/math-paper", "compositions-math-paper"],
    ["/containers/sheet", "containers-sheet"],
    ["/data/metric-stack", "data-metric-stack"],
];
const CDP = process.env.CDP_URL || "http://localhost:9334";
const OUT = new URL(".", import.meta.url).pathname;

async function capture(ctx, route, stem, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready"),
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
        } catch (e) {
            return "err:" + e.message;
        }
    });
    // COMPUTED DOM facts for the paint-judge (animationTimeline / getAnimations / children / GL contexts)
    const dom = await page.evaluate(() => {
        const main = document.querySelector("main");
        const mainChildren = main ? main.children.length : -1;
        const glCanvases = Array.from(document.querySelectorAll("canvas")).filter((c) => {
            try {
                return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("webgpu"));
            } catch {
                return false;
            }
        }).length;
        let running = 0;
        try {
            running = document.getAnimations().filter((a) => a.playState === "running").length;
        } catch {}
        // scroll-choreography detection: any element with a scroll/view animation-timeline
        let scrollTimelineEls = 0;
        try {
            for (const el of document.querySelectorAll("*")) {
                const at = getComputedStyle(el).animationTimeline;
                if (at && at !== "auto" && at !== "none") scrollTimelineEls++;
                if (scrollTimelineEls > 50) break;
            }
        } catch {}
        return { mainChildren, glCanvases, runningAnimations: running, scrollTimelineEls };
    });
    const outPath = `${OUT}${stem}-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ route, mode, ready, elapsedMs: elapsed, glRenderer, dom, outPath }));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const [route, stem] of ROUTES) {
    await capture(ctx, route, stem, "light");
    await capture(ctx, route, stem, "dark");
}
await browser.close();
