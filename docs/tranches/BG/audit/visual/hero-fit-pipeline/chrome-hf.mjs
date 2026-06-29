// HERO-FIT Chrome leg — CDP connect, per-config viewport, ?capture boot, DOM probe + screenshot.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/hero-fit-pipeline";
const SCRATCH = "/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/1cec2ef4-8e9b-486a-a1f7-877fa77a0ade/scratchpad";
const probeSrc = readFileSync(`${SCRATCH}/hf-probe.js`, "utf8");

const ROUTES = [
    { key: "intro", path: "/foundations/intro" },
    { key: "hero", path: "/compositions/hero" },
];
const MODES = ["light", "dark"];
const SIZES = [
    { w: 375, h: 812 },
    { w: 768, h: 1024 },
    { w: 1440, h: 820 },
    { w: 1920, h: 1080 },
];

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const route of ROUTES) {
    for (const mode of MODES) {
        for (const sz of SIZES) {
            const ctx = await browser.newContext({
                viewport: { width: sz.w, height: sz.h },
                deviceScaleFactor: 2,
                colorScheme: mode,
            });
            const page = await ctx.newPage();
            const url = `http://localhost:5200/?capture=${route.path}&mode=${mode}`;
            let probe = null,
                glRenderer = null,
                err = null;
            try {
                await page.goto(url, { waitUntil: "load", timeout: 30000 });
                await page.waitForFunction(
                    () => document.documentElement.hasAttribute("data-capture-ready"),
                    { timeout: 20000 },
                );
                glRenderer = await page.evaluate(() => {
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
                probe = await page.evaluate((src) => {
                    // eslint-disable-next-line no-eval
                    eval(src);
                    return window.__spProbe();
                }, probeSrc);
                if (typeof probe === "string") probe = JSON.parse(probe);
                const png = `${OUT}/hf-chrome-${route.key}-${mode}-${sz.w}.png`;
                await page.screenshot({
                    path: png,
                    clip: { x: 0, y: 0, width: sz.w, height: sz.h },
                });
                results.push({ engine: "chrome", route: route.key, mode, w: sz.w, h: sz.h, glRenderer, png, probe });
                console.error(`chrome ${route.key} ${mode} ${sz.w} OK gl=${(glRenderer || "").slice(0, 40)}`);
            } catch (e) {
                err = String(e).slice(0, 200);
                results.push({ engine: "chrome", route: route.key, mode, w: sz.w, h: sz.h, err });
                console.error(`chrome ${route.key} ${mode} ${sz.w} FAIL ${err}`);
            }
            await ctx.close();
        }
    }
}
await browser.close();
writeFileSync(`${OUT}/hf-chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
