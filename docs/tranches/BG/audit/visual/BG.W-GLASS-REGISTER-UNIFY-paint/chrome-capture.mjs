// BG.W-GLASS-REGISTER-UNIFY — Chrome (real Metal GPU) leg.
// CDP connect to real Chrome.app on :9456, ?capture boot over BUILT :5200, poll
// data-capture-ready, GL_RENDERER probe + computed-style probes + screenshot.
// Routes: /foundations/paper-glass, /substrates/glass-material, /display/card, /dock/overview.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GLASS-REGISTER-UNIFY-paint";
const ROUTES = [
    { route: "/foundations/paper-glass", slug: "paper-glass" },
    { route: "/substrates/glass-material", slug: "glass-material" },
    { route: "/display/card", slug: "card" },
    { route: "/dock/overview", slug: "dock-overview" },
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

// Parse an oklab/oklch/rgb computed color into an approx L + chroma (for no-gray).
// Chrome returns oklab tokens as "oklab(L a b)" or "oklch(L C H)" or "color(...)"
// or rgb(...). We probe raw string + a canvas-decoded rgb → OKLab chroma.
const PROBE = () => {
    const r = document.documentElement;
    const main = document.querySelector("main");
    const txt = (document.body.innerText || "").replace(/\s+/g, " ").trim();
    const canvases = Array.from(document.querySelectorAll("canvas"));
    const badge = document.querySelector(
        "[data-capture-badge], [id*='capture-badge'], [data-engine-badge]",
    );
    // count live WebGL/WebGPU contexts (heuristic: canvases with gl context)
    let glContextCount = 0;
    for (const c of canvases) {
        try {
            // Do NOT re-getContext (would create a new one); infer from size + attr.
            if (c.width > 1 && c.height > 1) glContextCount++;
        } catch {}
    }
    // Sample glass surfaces' computed backdrop-filter + background for the tint/blur read.
    const glassSel = [
        ".glass-card",
        ".glass-quiet",
        ".glass-resting",
        ".glass-floating",
        ".glass-overlay",
        ".glass-wash",
        ".glass-dock",
        ".dock-icon-button",
    ];
    const surfaces = {};
    for (const sel of glassSel) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const cs = getComputedStyle(el);
        surfaces[sel] = {
            backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter || "",
            background: cs.backgroundColor,
            borderColor: cs.borderTopColor,
        };
    }
    return {
        captureReady: r.hasAttribute("data-capture-ready"),
        captureMode: r.getAttribute("data-capture-mode"),
        isDark: r.classList.contains("dark"),
        mainChildren: main ? main.children.length : -1,
        bodyTextLen: txt.length,
        bodyTextHead: txt.slice(0, 140),
        canvasCount: canvases.length,
        canvasDims: canvases.map((c) => `${c.width}x${c.height}`).slice(0, 6),
        glContextCount,
        hasBadgeNode: !!badge,
        badgeText: badge ? (badge.innerText || "").slice(0, 40) : null,
        surfaces,
    };
};

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
        const pslug = `glass-register-chrome-${slug}-${mode}`;
        let glRenderer = null,
            probe = null,
            err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            // settle a beat for WebGL first frames
            await page.waitForTimeout(1200);
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
            probe = await page.evaluate(PROBE);
            const png = `${OUT}/${pslug}.png`;
            await page.screenshot({
                path: png,
                clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h },
            });
            results.push({
                engine: "chrome",
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
                `chrome ${pslug} OK gl=${(glRenderer || "").slice(0, 60)} main.children=${probe.mainChildren} canvas=${probe.canvasCount} textLen=${probe.bodyTextLen}`,
            );
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", route, mode, err });
            console.error(`chrome ${pslug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
