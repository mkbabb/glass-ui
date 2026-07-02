// BG.W-COMPOSITED-GESTALT-GATE — Chrome (CDP, real Metal) capture leg.
// Captures the 9 in-repo enrolled roster surfaces over BUILT :5200 bytes, both modes,
// polls data-capture-ready, decodes GL_RENDERER for provenance. Non-authoring paint judge.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-DELTA-assets";
const SIZE = { w: 1440, h: 900 };
const MODES = ["light", "dark"];

// surface -> route (the roster's first concrete /cat/story token; shell/page-band pick a
// representative content route where the shell chrome + page card composite over the field).
const SURFACES = [
    { surface: "dock", route: "/dock/overview" },
    { surface: "configurators-goo", route: "/substrates/blob" },
    { surface: "aurora", route: "/substrates/aurora" },
    { surface: "glass-feedback", route: "/feedback/toast" },
    { surface: "shell", route: "/foundations/intro" },
    { surface: "motion-fourier", route: "/motion/curve-gallery" },
    { surface: "dark-register", route: "/substrates/glass-material" },
    { surface: "tabs-segmented", route: "/navigation/tabs" },
    { surface: "page-band", route: "/foundations/colors" },
];

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const { surface, route } of SURFACES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const slug = `${surface}-chrome-${mode}-desktop-full`;
        let glRenderer = null,
            probe = null,
            err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) {
                    return "err:" + e.message;
                }
            });
            probe = await page.evaluate(() => {
                const r = document.documentElement;
                const txt = (document.body.innerText || "").replace(/\s+/g, " ").trim();
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    bodyTextLen: txt.length,
                    bodyTextHead: txt.slice(0, 90),
                    mainChildren: document.querySelector("main")?.children.length ?? null,
                    glContextCount: document.querySelectorAll("canvas").length,
                };
            });
            const png = `${OUT}/${slug}.png`;
            await page.screenshot({
                path: png,
                clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h },
            });
            results.push({
                engine: "chrome",
                surface,
                route,
                mode,
                w: SIZE.w,
                h: SIZE.h,
                dpr: 2,
                glRenderer,
                png,
                probe,
            });
            console.error(
                `chrome ${slug} OK gl=${(glRenderer || "").slice(0, 42)} main=${probe.mainChildren} gl#=${probe.glContextCount} textLen=${probe.bodyTextLen}`,
            );
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", surface, route, mode, err });
            console.error(`chrome ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "captures");
