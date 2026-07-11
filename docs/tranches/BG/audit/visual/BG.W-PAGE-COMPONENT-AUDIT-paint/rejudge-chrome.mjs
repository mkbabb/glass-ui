// Re-judge Chrome leg — BG.W-PAGE-COMPONENT-AUDIT (post-fix suppressesShellField).
// Real Chrome.app (Metal GPU) via CDP :9466. newContext deviceScaleFactor:2 + colorScheme
// per mode => 2880x1800 shots. Polls data-capture-ready. Emits COMPUTED DOM facts
// (glCanvases / mainChildren / runningAnimations / scrollTimelineEls) for the paint judge.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

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
const CDP = process.env.CDP_URL || "http://localhost:9466";
const OUT = new URL("./rejudge/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const domProbe = () => {
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
    let scrollTimelineEls = 0;
    try {
        for (const el of document.querySelectorAll("*")) {
            const at = getComputedStyle(el).animationTimeline;
            if (at && at !== "auto" && at !== "none") scrollTimelineEls++;
            if (scrollTimelineEls > 50) break;
        }
    } catch {}
    return { mainChildren, glCanvases, runningAnimations: running, scrollTimelineEls };
};

async function capture(browser, route, stem, mode) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 20000) {
        ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
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
    const dom = await page.evaluate(domProbe);
    const outPath = `${OUT}${stem}-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ route, mode, ready, elapsedMs: elapsed, glRenderer, dom, outPath }));
    await page.close();
    await ctx.close();
}

const browser = await chromium.connectOverCDP(CDP);
for (const [route, stem] of ROUTES) {
    await capture(browser, route, stem, "light");
    await capture(browser, route, stem, "dark");
}
await browser.close();
