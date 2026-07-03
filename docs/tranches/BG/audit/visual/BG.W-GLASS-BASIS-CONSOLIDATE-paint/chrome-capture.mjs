// BG.W-GLASS-BASIS-CONSOLIDATE — NON-AUTHORING Chrome leg (CDP → real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5201, polls data-capture-ready, records GL_RENDERER, screenshots.
// 5 glass-band routes × 2 modes.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GLASS-BASIS-CONSOLIDATE-paint";
const ROUTES = [
    ["paper-glass", "/foundations/paper-glass"],
    ["glass-material", "/substrates/glass-material"],
    ["glass-panel", "/substrates/glass-panel"],
    ["dialog", "/containers/dialog"],
    ["dock-overview", "/dock/overview"],
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";
const BASE = process.env.BASE || "http://localhost:5201";

const browser = await chromium.connectOverCDP(CDP);
const results = [];
for (const [slug, route] of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const out = `${OUT}/gbc-${slug}-chrome-${mode}.png`;
        let ready = false;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            ready = true;
        } catch (e) {
            // fall through — snapshot anyway, record not-ready
        }
        await page.waitForTimeout(1400);
        const probe = await page.evaluate(() => {
            let glRenderer = "n/a";
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2") || c.getContext("webgl");
                if (gl) {
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    glRenderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } else glRenderer = "no-webgl";
            } catch (e) { glRenderer = "err:" + e.message; }
            const main = document.querySelector("main");
            return {
                glRenderer,
                mainChildren: main ? main.children.length : -1,
                glCanvases: document.querySelectorAll("canvas").length,
                title: (document.querySelector("h1")?.textContent || "").slice(0, 60),
            };
        });
        await page.screenshot({ path: out, fullPage: false });
        results.push({ slug, mode, out, ready, ...probe });
        console.log(JSON.stringify({ slug, mode, ready, glRenderer: probe.glRenderer, mainChildren: probe.mainChildren, glCanvases: probe.glCanvases, title: probe.title }));
        await ctx.close();
    }
}
await browser.close();
require("node:fs").writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.log("DONE chrome");
