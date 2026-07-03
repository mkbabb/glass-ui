// BG.W-VIZ-REVEAL-BLOOM — NON-AUTHORING Chrome leg (CDP → real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5200, polls data-capture-ready, records GL_RENDERER,
// screenshots each substrate viz route in both modes (settled-frame gestalt).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-REVEAL-BLOOM-paint";
const ROUTES = [
    ["substrates", "/substrates"],
    ["aurora", "/substrates/aurora"],
    ["blob", "/substrates/blob"],
    ["constellation", "/substrates/constellation"],
    ["fourier-field", "/substrates/fourier-field"],
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

const browser = await chromium.connectOverCDP(CDP);
const log = [];
for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    for (const [slug, route] of ROUTES) {
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const out = `${OUT}/chrome-${slug}-${mode}.png`;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            await page.waitForTimeout(1000);
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
            // count live GL contexts on the settled route (one-GL-per-route budget)
            const glContextCount = await page.evaluate(() => {
                const cvs = Array.from(document.querySelectorAll("canvas"));
                let n = 0;
                for (const c of cvs) {
                    const w = c.width || 0;
                    const h = c.height || 0;
                    if (w > 1 && h > 1) n++; // a painted canvas
                }
                return { totalCanvas: cvs.length, paintedCanvas: n };
            });
            await page.screenshot({ path: out, fullPage: false });
            log.push({ route, mode, out, glRenderer, ...glContextCount });
            console.log(
                `chrome ${slug.padEnd(14)} ${mode.padEnd(5)} -> ${out.split("/").pop()} gpu=${glRenderer.slice(0, 42)} canvas=${glContextCount.paintedCanvas}/${glContextCount.totalCanvas}`,
            );
        } catch (e) {
            log.push({ route, mode, out, error: String(e).slice(0, 120) });
            console.log(`chrome ${slug} ${mode} FAILED: ${String(e).slice(0, 120)}`);
        }
        await page.close();
    }
    await ctx.close();
}
await browser.close();
console.log("\n===JSON===\n" + JSON.stringify(log, null, 2));
