// BG.W-COMPOSITED-GESTALT-GATE — NON-AUTHORING PAINT-JUDGE re-judge2 capture (Chrome, CDP, real Metal).
// The full enrolled route set over BUILT :5200 bytes (dist-demo built 21:06, current HEAD), both
// modes, poll data-capture-ready, decode GL_RENDERER + COMPUTED-DOM checks (main.children,
// glContextCount, getAnimations, scroll-driven timelines). NON-AUTHORING — verification only.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-rejudge2";
const SIZE = { w: 1440, h: 900 };
const MODES = ["light", "dark"];

// The full task route list. slug = flattened route for filenames; surface = enrolled roster surface.
const ROUTES = [
    { slug: "dock-overview", route: "/dock/overview", surface: "dock+shell" },
    { slug: "dock-layers", route: "/dock/layers", surface: "dock" },
    { slug: "dock-rail", route: "/dock/rail", surface: "dock" },
    { slug: "substrates-blob", route: "/substrates/blob", surface: "configurators-goo" },
    { slug: "substrates-aurora", route: "/substrates/aurora", surface: "aurora+configurators-goo" },
    { slug: "feedback-toast", route: "/feedback/toast", surface: "glass-feedback" },
    { slug: "feedback-notification", route: "/feedback/notification", surface: "glass-feedback" },
    { slug: "display-buttons", route: "/display/buttons", surface: "glass-feedback" },
    { slug: "motion-curve-gallery", route: "/motion/curve-gallery", surface: "motion-fourier" },
    { slug: "motion-springs", route: "/motion/springs", surface: "motion-fourier" },
    { slug: "substrates-fourier-field", route: "/substrates/fourier-field", surface: "motion-fourier" },
    { slug: "substrates-glass-material", route: "/substrates/glass-material", surface: "dark-register" },
    { slug: "navigation-tabs", route: "/navigation/tabs", surface: "tabs-segmented" },
    { slug: "foundations-intro", route: "/foundations/intro", surface: "page-band" },
];

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const { slug: base, route, surface } of ROUTES) {
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
                    bodyTextHead: txt.slice(0, 90),
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
                engine: "chrome", slug: base, route, surface, mode,
                w: SIZE.w, h: SIZE.h, dpr: 2, glRenderer, png, probe,
            });
            console.error(
                `chrome ${slug} OK gl=${(glRenderer || "").slice(0, 40)} main=${probe.mainChildren} gl#=${probe.glContextCount} anims=${probe.anims} sd=${probe.scrollDrivenAnims} txt=${probe.bodyTextLen}`,
            );
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", slug: base, route, surface, mode, err });
            console.error(`chrome ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "captures");
