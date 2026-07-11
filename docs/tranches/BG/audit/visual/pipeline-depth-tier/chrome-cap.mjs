// Chrome leg (CDP → real Chrome.app / Metal GPU) for BG.W-GLASS-DEPTH-TIER route.
// Boots ?capture over BUILT :5200, polls data-capture-ready, records GL_RENDERER, screenshots.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/pipeline-depth-tier";
const ROUTE = "/display/buttons";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

const browser = await chromium.connectOverCDP(CDP);
for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    const out = `${OUT}/depth-tier-chrome-${mode}-desktop-full.png`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    let ready = false;
    try {
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        ready = true;
    } catch (e) {
        ready = false;
    }
    await page.waitForTimeout(1200);
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const dbg = gl.getExtension("WEBGL_debug_renderer_info");
            return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
        } catch (e) { return "err:" + e.message; }
    });
    await page.screenshot({ path: out, fullPage: false });
    console.log(JSON.stringify({ mode, out, ready, glRenderer }));
    await ctx.close();
}
await browser.close();
