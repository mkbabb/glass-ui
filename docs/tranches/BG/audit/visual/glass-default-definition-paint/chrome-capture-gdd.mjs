// BG.W-GLASS-DEFAULT-DEFINITION paint judge — Chrome CDP leg.
// Captures the control-cohort routes + the transmissive-over-field negative arm,
// BOTH modes, over BUILT :5200. Poll data-capture-ready (no fixed sleep).
// Also probes the DEFINED calibration: the .btn-glass/.input-pill/.control-surface
// resolved --glass-definition scalar + the computed floor-fill/border-defined alpha,
// vs a plain content .glass-card (must stay transmissive: definition==0).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/glass-default-definition-paint";
const ROUTES = [
    { route: "/display/buttons", slug: "buttons", cohort: ".btn-glass" },
    { route: "/forms/inputs", slug: "inputs", cohort: ".input-pill" },
    { route: "/forms/select", slug: "select", cohort: ".control-surface" },
    { route: "/substrates/glass-material", slug: "glass-material", cohort: ".glass-card" },
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const { route, slug, cohort } of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const fname = `gdd-${slug}-chrome-${mode}`;
        let glRenderer = null, probe = null, err = null;
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
                } catch (e) { return "err:" + e.message; }
            });
            probe = await page.evaluate((cohortSel) => {
                const r = document.documentElement;
                const txt = (document.body.innerText || "").replace(/\s+/g, " ").trim();
                // Sample the FIRST cohort element + a plain content .glass-card (negative arm).
                const readEl = (sel) => {
                    const el = document.querySelector(sel);
                    if (!el) return { found: false, sel };
                    const cs = getComputedStyle(el);
                    return {
                        found: true,
                        sel,
                        definition: cs.getPropertyValue("--glass-definition").trim(),
                        floorFill: cs.getPropertyValue("--glass-floor-fill").trim(),
                        borderDefined: cs.getPropertyValue("--glass-border-defined").trim(),
                        backgroundColor: cs.backgroundColor,
                        backgroundImage: cs.backgroundImage.slice(0, 160),
                        borderColor: cs.borderTopColor,
                        borderWidth: cs.borderTopWidth,
                    };
                };
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    bodyTextLen: txt.length,
                    bodyTextHead: txt.slice(0, 90),
                    canvasCount: document.querySelectorAll("canvas").length,
                    cohort: readEl(cohortSel),
                    contentCard: readEl(".glass-card:not(.btn-glass):not(.input-pill):not(.control-surface)"),
                };
            }, cohort);
            const png = `${OUT}/${fname}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "chrome", route, mode, cohort, glRenderer, png, probe });
            console.error(`chrome ${fname} OK gl=${(glRenderer || "").slice(0, 40)} def=${probe.cohort.definition} floor=${probe.cohort.floorFill} textLen=${probe.bodyTextLen}`);
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", route, mode, cohort, err });
            console.error(`chrome ${fname} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results-gdd.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
