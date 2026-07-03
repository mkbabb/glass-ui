// CAPTURE-PIPELINE VALIDATOR — Chrome CDP leg (fresh, independent).
// Route: /display/buttons (BG.W-GLASS-DEFAULT-DEFINITION primary cohort .btn-glass), both modes.
// Proves: real Chrome.app on real Metal GPU renders full route content over BUILT :5200,
// data-capture-ready polled (no fixed sleep), in-pixel engine badge painted.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/capture-pipeline-validation";
const ROUTE = "/display/buttons";
const SLUG = "buttons";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    const fname = `validate-${SLUG}-chrome-${mode}`;
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
        probe = await page.evaluate(() => {
            const r = document.documentElement;
            const txt = (document.body.innerText || "").replace(/\s+/g, " ").trim();
            // Decode the top-left engine badge: read the magenta fiducial + the badge text region.
            // The badge is DOM (canvas/div) painted by engine-badge.ts at fixed top-left.
            const badgeEl = document.querySelector("[data-capture-badge]");
            return {
                captureReady: r.hasAttribute("data-capture-ready"),
                captureMode: r.getAttribute("data-capture-mode"),
                isDark: r.classList.contains("dark"),
                bodyTextLen: txt.length,
                bodyTextHead: txt.slice(0, 120),
                canvasCount: document.querySelectorAll("canvas").length,
                btnGlassCount: document.querySelectorAll(".btn-glass").length,
                badgePresent: !!badgeEl,
                badgeText: badgeEl ? (badgeEl.innerText || "").replace(/\s+/g, " ").trim().slice(0, 200) : null,
            };
        });
        const png = `${OUT}/${fname}.png`;
        await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        results.push({ engine: "chrome", route: ROUTE, mode, glRenderer, png, probe });
        console.error(`chrome ${fname} OK gl=${(glRenderer || "").slice(0, 60)} textLen=${probe.bodyTextLen} btnGlass=${probe.btnGlassCount} badge=${probe.badgePresent}`);
    } catch (e) {
        err = String(e).slice(0, 300);
        results.push({ engine: "chrome", route: ROUTE, mode, err });
        console.error(`chrome ${fname} FAIL ${err}`);
    }
    await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}/chrome-validate-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
