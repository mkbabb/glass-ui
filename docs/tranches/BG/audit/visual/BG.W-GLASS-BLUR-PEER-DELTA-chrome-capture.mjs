// BG.W-GLASS-BLUR-PEER — Chrome leg (CDP → real Chrome.app, real Metal GPU).
// Routes: /foundations/paper-glass (5-rung glass ladder, 8px-peer-lock) + /dock/overview (--dock-surface-blur).
// ?capture boot over BUILT :5200, poll data-capture-ready, GL_RENDERER probe + screenshot + computed-blur probe.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GLASS-BLUR-PEER-paint";
const ROUTES = [
    { route: "/foundations/paper-glass", slug: "glass-ladder" },
    { route: "/dock/overview", slug: "dock" },
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const { route, slug } of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const fileslug = `${slug}-chrome-${mode}-desktop`;
        let glRenderer = null, probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            // let any aurora/backdrop settle
            await page.waitForTimeout(1200);
            glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) { return "err:" + e.message; }
            });
            probe = await page.evaluate(() => {
                const r = document.documentElement;
                const rs = getComputedStyle(r);
                const read = (v) => rs.getPropertyValue(v).trim();
                // resolve the 5 glass tier blur radii primitives + composed backdrop-filters
                const tiers = ["wash", "quiet", "resting", "floating", "overlay"];
                const radii = {};
                const composed = {};
                for (const t of tiers) {
                    radii[t] = read(`--glass-blur-${t}-radius`);
                    composed[t] = read(`--glass-blur-${t}`);
                }
                const dockSurfaceBlur = read("--dock-surface-blur");
                const glassLevel = read("--glass-level");
                // find actual painted glass surfaces + their computed backdrop-filter
                const surfSel = ".glass-wash,.glass-quiet,.glass-resting,.glass-floating,.glass-overlay,.glass-card,.glass-dock";
                const surfs = Array.from(document.querySelectorAll(surfSel)).slice(0, 12).map((el) => {
                    const cs = getComputedStyle(el);
                    return {
                        cls: el.className.toString().slice(0, 60),
                        backdrop: cs.backdropFilter || cs.webkitBackdropFilter || "",
                        rect: (() => { const b = el.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height) }; })(),
                    };
                }).filter((s) => s.rect.w > 0 && s.rect.h > 0);
                const dock = document.querySelector(".glass-dock");
                const dockBackdrop = dock ? (getComputedStyle(dock).backdropFilter || getComputedStyle(dock).webkitBackdropFilter) : null;
                const glCanvas = document.querySelector("canvas");
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    glassLevel, radii, composed, dockSurfaceBlur, dockBackdrop,
                    paintedGlassSurfaceCount: surfs.length,
                    surfs,
                    hasGlCanvas: !!glCanvas,
                };
            });
            const png = `${OUT}/${fileslug}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "chrome", route, mode, w: SIZE.w, h: SIZE.h, dpr: 2, glRenderer, png, probe });
            console.error(`chrome ${fileslug} OK gl=${(glRenderer || "").slice(0, 50)} glassSurf=${probe.paintedGlassSurfaceCount} dockBlur=${probe.dockSurfaceBlur}`);
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", route, mode, err });
            console.error(`chrome ${fileslug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
