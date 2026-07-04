// Chrome CDP capture for BG.W-DOCK-LEGIBILITY-RECAL
// usage: node chrome-cap-bg-dock.mjs <route> <mode> <outPng>
import { chromium } from "playwright";

const [route, mode, outPng] = process.argv.slice(2);
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";

const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: mode,
});
const page = await ctx.newPage();
const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
await page.goto(url, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(
    () => document.documentElement.hasAttribute("data-capture-ready"),
    { timeout: 20000 }
);
const glRenderer = await page.evaluate(() => {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return "NO-GL";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "NO-EXT";
    } catch (e) {
        return "ERR:" + e.message;
    }
});
await page.waitForTimeout(1500);
await page.screenshot({ path: outPng, animations: "disabled" });
console.log(JSON.stringify({ route, mode, outPng, glRenderer }));
await ctx.close();
await browser.close();
