// BG.W-COMPOSITED-GESTALT-GATE — NON-AUTHORING PAINT-JUDGE close capture (Chrome, CDP, real Metal).
// The 4 wave routes over BUILT :5200 bytes, both modes, poll data-capture-ready, decode
// GL_RENDERER + the COMPUTED-DOM checks (main.children, glContextCount, getAnimations,
// scroll-driven timelines). NON-AUTHORING — verification only.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-close";
const SIZE = { w: 1440, h: 900 };
const MODES = ["light", "dark"];

const ROUTES = [
    { slug: "foundations-intro", route: "/foundations/intro" },
    { slug: "substrates-aurora", route: "/substrates/aurora" },
    { slug: "dock-overview", route: "/dock/overview" },
    { slug: "compositions-configurator", route: "/compositions/configurator" },
];

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const { slug: base, route } of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const slug = `${base}-chrome-${mode}-desktop-full`;
        let glRenderer = null,
            probe = null,
            err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            await page.waitForTimeout(900);
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
                const anims = document.getAnimations?.() ?? [];
                const scrollDriven = anims.filter(
                    (a) =>
                        a.timeline &&
                        a.timeline.constructor &&
                        /Scroll|View/.test(a.timeline.constructor.name),
                ).length;
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    bodyTextLen: txt.length,
                    bodyTextHead: txt.slice(0, 100),
                    mainChildren: document.querySelector("main")?.children.length ?? null,
                    glContextCount: document.querySelectorAll("canvas").length,
                    anims: anims.length,
                    scrollDrivenAnims: scrollDriven,
                };
            });
            const png = `${OUT}/${slug}.png`;
            await page.screenshot({
                path: png,
                clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h },
            });
            results.push({
                engine: "chrome",
                slug: base,
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
                `chrome ${slug} OK gl=${(glRenderer || "").slice(0, 46)} main=${probe.mainChildren} gl#=${probe.glContextCount} anims=${probe.anims} sd=${probe.scrollDrivenAnims} textLen=${probe.bodyTextLen}`,
            );
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", slug: base, route, mode, err });
            console.error(`chrome ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "captures");
