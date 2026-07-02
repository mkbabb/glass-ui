// Pipeline-validation Chrome leg — CDP connect to real Chrome.app (real Metal GPU),
// ?capture boot over BUILT :5200, poll data-capture-ready, GL_RENDERER probe + screenshot.
// Route: BG.W-GATE-FIELD-AURORA → /substrates/aurora (the field-aurora surface).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/pipeline-validation";
const ROUTE = "/substrates/aurora";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    const slug = `gate-field-aurora-chrome-${mode}-desktop-full`;
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
            const auroraCanvas = Array.from(document.querySelectorAll("canvas"));
            const badge = document.querySelector("[data-capture-badge], [id*='capture-badge']");
            return {
                captureReady: r.hasAttribute("data-capture-ready"),
                captureMode: r.getAttribute("data-capture-mode"),
                isDark: r.classList.contains("dark"),
                bodyTextLen: txt.length,
                bodyTextHead: txt.slice(0, 120),
                canvasCount: auroraCanvas.length,
                canvasDims: auroraCanvas.map((c) => `${c.width}x${c.height}`).slice(0, 4),
                hasBadgeNode: !!badge,
            };
        });
        const png = `${OUT}/${slug}.png`;
        await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        results.push({ engine: "chrome", route: ROUTE, mode, w: SIZE.w, h: SIZE.h, dpr: 2, glRenderer, png, probe });
        console.error(`chrome ${slug} OK gl=${(glRenderer || "").slice(0, 70)} canvas=${probe.canvasCount} textLen=${probe.bodyTextLen}`);
    } catch (e) {
        err = String(e).slice(0, 300);
        results.push({ engine: "chrome", route: ROUTE, mode, err });
        console.error(`chrome ${slug} FAIL ${err}`);
    }
    await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}/chrome-results-aurora.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
