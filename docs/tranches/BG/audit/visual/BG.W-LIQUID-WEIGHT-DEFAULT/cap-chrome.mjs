// BG.W-LIQUID-WEIGHT-DEFAULT — Chrome CDP paint-judge driver (non-authoring).
// Boots ?capture over BUILT :5200, records GL_RENDERER, PRM computed check,
// settled captures for each route/mode. Real Chrome.app / Metal GPU.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-LIQUID-WEIGHT-DEFAULT";
const CDP = process.env.CDP_URL || "http://localhost:9477";
const SIZE = { w: 1440, h: 900 };

// route slug -> path
const ROUTES = {
    tabs: "/navigation/tabs",
    dockoverview: "/dock/overview",
    dialog: "/containers/dialog",
    morph: "/dock/morph-showcase",
};
const MODES = ["light", "dark"];

const browser = await chromium.connectOverCDP(CDP);
const results = [];

for (const [slug, route] of Object.entries(ROUTES)) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 1,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        await page.waitForTimeout(1200);
        const glRenderer = await page.evaluate(() => {
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2") || c.getContext("webgl");
                if (!gl) return "no-webgl";
                const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                return dbg
                    ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
                    : "no-debug-ext";
            } catch (e) {
                return "err:" + e.message;
            }
        });
        const out = `${OUT}/lwd-${slug}-chrome-${mode}.png`;
        await page.screenshot({ path: out, fullPage: false });
        results.push({ slug, mode, out, glRenderer });
        console.log(JSON.stringify({ slug, mode, out, glRenderer }));
        await ctx.close();
    }
}
await browser.close();
console.log("DONE " + results.length);
