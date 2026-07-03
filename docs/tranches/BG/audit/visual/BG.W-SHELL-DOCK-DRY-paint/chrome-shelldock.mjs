// BG.W-SHELL-DOCK-DRY — Chrome CDP leg (non-authoring paint judge).
// Route: /dock/overview (canonical shell-dock capture route; the shell nav docks
// BottomDock + SidebarDock render on every route inside the demo shell).
// Proves: the DRY unification onto useShellNavDock paints the shell nav dock correctly,
// real Chrome.app on real Metal GPU over BUILT :5200, data-capture-ready polled.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-SHELL-DOCK-DRY-paint";
const ROUTE = "/dock/overview";
const SLUG = "dock-overview";
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
    const fname = `shelldock-chrome-${mode}`;
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
            const badgeEl = document.querySelector("[data-capture-badge]");
            // Shell-dock DRY probes.
            const bottomDock = document.querySelector(".demo-bottom-dock, [class*='bottom-dock']");
            const sidebarDock = document.querySelector(".demo-sidebar-dock, [class*='sidebar-dock']");
            const shellDocks = document.querySelectorAll(".glass-dock");
            const facetChips = document.querySelectorAll(".dock-facet-chip, [class*='facet-chip']");
            const main = document.querySelector("main");
            // Count live WebGL/canvas contexts actually rendering.
            let glContexts = 0;
            for (const cv of document.querySelectorAll("canvas")) {
                try {
                    if (cv.getContext("webgl2") || cv.getContext("webgl")) glContexts++;
                } catch (e) { /* already a 2d/none */ }
            }
            let animTimelineSupported = false;
            try { animTimelineSupported = CSS.supports("animation-timeline: scroll()"); } catch (e) {}
            const runningAnims = (document.getAnimations ? document.getAnimations() : []).length;
            return {
                captureReady: r.hasAttribute("data-capture-ready"),
                captureMode: r.getAttribute("data-capture-mode"),
                isDark: r.classList.contains("dark"),
                bodyTextLen: txt.length,
                bodyTextHead: txt.slice(0, 120),
                canvasCount: document.querySelectorAll("canvas").length,
                glContexts,
                glassDockCount: shellDocks.length,
                bottomDockPresent: !!bottomDock,
                sidebarDockPresent: !!sidebarDock,
                facetChipCount: facetChips.length,
                mainChildrenLen: main ? main.children.length : -1,
                animTimelineSupported,
                runningAnims,
                badgePresent: !!badgeEl,
                badgeText: badgeEl ? (badgeEl.innerText || "").replace(/\s+/g, " ").trim().slice(0, 220) : null,
            };
        });
        const png = `${OUT}/${fname}.png`;
        await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        results.push({ engine: "chrome", route: ROUTE, mode, glRenderer, png, probe });
        console.error(`chrome ${fname} OK gl=${(glRenderer || "").slice(0, 50)} textLen=${probe.bodyTextLen} docks=${probe.glassDockCount} facets=${probe.facetChipCount} gl#=${probe.glContexts} mainKids=${probe.mainChildrenLen}`);
    } catch (e) {
        err = String(e).slice(0, 300);
        results.push({ engine: "chrome", route: ROUTE, mode, err });
        console.error(`chrome ${fname} FAIL ${err}`);
    }
    await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}/chrome-shelldock-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
