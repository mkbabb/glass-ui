// NON-AUTHORING Chrome leg — concentric level-curves paint judge.
// CDP → real Chrome.app / Metal GPU. Boots ?capture over BUILT :5200.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-CONCENTRIC-LEVELCURVES-paint";
const ROUTE = "/substrates/concentric";
const MODES = ["light", "dark"];
const CDP = process.env.CDP_URL || "http://localhost:9333";

const browser = await chromium.connectOverCDP(CDP);
const result = {};

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(
        () => document.documentElement.hasAttribute("data-capture-ready"),
        { timeout: 25000 },
    );
    await page.waitForTimeout(1500);

    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const dbg = gl.getExtension("WEBGL_debug_renderer_info");
            return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
        } catch (e) { return "err:" + e.message; }
    });

    // full page
    await page.screenshot({ path: `${OUT}/conc-chrome-${mode}-full.png`, fullPage: false });

    // locate the concentric canvas + hero stage geometry
    const geo = await page.evaluate(() => {
        const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => {
            const r = c.getBoundingClientRect();
            return { cls: c.className, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), backW: c.width, backH: c.height, opacity: getComputedStyle(c).opacity };
        });
        return { canvasCount: canvases.length, canvases };
    });

    // hero crop: the concentric canvas element screenshot (composited GL)
    const concEl = page.locator("canvas.concentric-canvas").first();
    let heroExists = await concEl.count();
    if (heroExists) {
        await concEl.screenshot({ path: `${OUT}/conc-chrome-${mode}-hero.png` });
    }

    result[mode] = { glRenderer, geo, heroExists };
    await ctx.close();
}

console.log(JSON.stringify(result, null, 2));
await browser.close();
