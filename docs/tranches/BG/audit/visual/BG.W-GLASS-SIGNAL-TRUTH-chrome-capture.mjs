// Chrome CDP capture leg for BG.W-GLASS-SIGNAL-TRUTH — proven C18 method.
import { chromium } from "playwright";

const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const OUT_DIR = process.argv[2];
const ROUTE = process.argv[3]; // e.g. /display/buttons
const SLUG = process.argv[4]; // filename slug, e.g. display-buttons

const browser = await chromium.connectOverCDP(CDP);
const results = [];

for (const mode of ["light", "dark"]) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(
        () => document.documentElement.hasAttribute("data-capture-ready"),
        { timeout: 30000 }
    );
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2");
            if (!gl) return "no-webgl2";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
        } catch (e) {
            return "err:" + e.message;
        }
    });
    const dom = await page.evaluate(() => {
        const main = document.querySelector("main");
        const glCanvases = Array.from(document.querySelectorAll("canvas")).length;
        let runningAnims = 0;
        try {
            runningAnims = document.getAnimations().filter(a => a.playState === "running").length;
        } catch {}
        const clear = document.querySelector(".glass-clear");
        let clearScrim = null;
        if (clear) {
            clearScrim = getComputedStyle(clear).getPropertyValue("--glass-clear-scrim-strength").trim() || null;
        }
        const sampled = Array.from(document.querySelectorAll("[data-backdrop-sampled]")).map(el => {
            const cs = getComputedStyle(el);
            return {
                tag: el.tagName.toLowerCase(),
                cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "",
                val: el.getAttribute("data-backdrop-sampled"),
                luma: cs.getPropertyValue("--glass-backdrop-luma").trim(),
                hue: cs.getPropertyValue("--glass-ambient-hue").trim(),
                ambientStrength: cs.getPropertyValue("--glass-ambient-strength").trim(),
                sampledVar: cs.getPropertyValue("--glass-backdrop-sampled").trim(),
            };
        });
        // Is the dead --glass-backdrop-hue channel present anywhere as a resolved value?
        const rootHue = getComputedStyle(document.documentElement).getPropertyValue("--glass-backdrop-hue").trim();
        return {
            mainChildren: main ? main.children.length : -1,
            glCanvases,
            runningAnims,
            clearScrim,
            sampledCount: sampled.length,
            sampled: sampled.slice(0, 8),
            rootBackdropHue: rootHue || "(empty/absent)",
        };
    });
    const outPng = `${OUT_DIR}/BG.W-GLASS-SIGNAL-TRUTH-chrome-${SLUG}-${mode}.png`;
    await page.screenshot({ path: outPng });
    results.push({ mode, engine: "chrome", glRenderer, outPng, dom });
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
