// BG.W-GLASS-CLIP-DISCIPLINE — Chrome leg. CDP connect to real Chrome.app (real Metal GPU),
// ?capture boot over BUILT :5200, poll data-capture-ready, GL_RENDERER probe + screenshot +
// COMPUTED clip/dock-plate-clearance DOM probes (non-authoring paint judge).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GLASS-CLIP-DISCIPLINE-DELTA-assets";
const ROUTES = ["/containers", "/dock/overview"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const route of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const routeSlug = route.replace(/[\/]/g, "-").replace(/^-/, "");
        const slug = `clip-${routeSlug}-chrome-${mode}-desktop-full`;
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
                const cs = (el) => el ? getComputedStyle(el) : null;
                // ── Clip-discipline: glass surfaces must NOT carry `overflow: clip/hidden`
                //    that lozenges the rounded plate. The narrowed clip register lives on
                //    .glass-material paint-box ONLY. Overlay band (.glass-floating/.glass-overlay)
                //    + dock controls must be UN-clipped.
                const glassSurfaces = Array.from(document.querySelectorAll(
                    ".glass-card, .glass-floating, .glass-overlay, .glass-resting, .glass-quiet, .glass-panel, [class*='glass-']"
                )).slice(0, 400);
                const clipAudit = [];
                for (const el of glassSurfaces) {
                    const s = getComputedStyle(el);
                    const cls = el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className || "");
                    // A lozenge = a rounded plate whose overflow clips at the box edge
                    // AND has a non-trivial border-radius, so the corner paint slices.
                    const radius = parseFloat(s.borderTopLeftRadius) || 0;
                    const clips = (s.overflowX === "hidden" || s.overflowX === "clip" ||
                                   s.overflowY === "hidden" || s.overflowY === "clip");
                    // Only flag OVERLAY-band + dock surfaces that must stay un-clipped.
                    const isOverlayBand = /glass-floating|glass-overlay/.test(cls);
                    if (isOverlayBand && clips) {
                        clipAudit.push({ cls: cls.slice(0, 80), overflowX: s.overflowX, overflowY: s.overflowY, radius });
                    }
                }
                // ── Dock plate-clearance: the dock control plates must clear their track cell.
                const dockControls = Array.from(document.querySelectorAll(
                    ".dock-icon-button, .dock-tab-button, .dock-select-trigger, .dock-dropdown-trigger, .dark-mode-toggle-button"
                ));
                const dockAudit = dockControls.slice(0, 20).map((el) => {
                    const s = getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    return {
                        cls: (String(el.className || "")).slice(0, 50),
                        w: Math.round(rect.width), h: Math.round(rect.height),
                        bgClip: s.backgroundClip || s.webkitBackgroundClip,
                        padL: s.paddingLeft, padT: s.paddingTop,
                    };
                });
                // ── The single clip register: assert .glass-material carries the paint-box clip.
                const gm = document.querySelector(".glass-material");
                const gmClip = gm ? getComputedStyle(gm).contain : null;
                // Dock present?
                const dock = document.querySelector(".glass-dock");
                const dockContain = dock ? getComputedStyle(dock).contain : null;
                const txt = (document.body.innerText || "").replace(/\s+/g, " ").trim();
                // GL context count (aurora / viz) — one-per-route budget sanity
                const canvases = document.querySelectorAll("canvas");
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    bodyTextLen: txt.length,
                    bodyTextHead: txt.slice(0, 100),
                    glassSurfaceCount: glassSurfaces.length,
                    overlayBandClipViolations: clipAudit,
                    dockControlCount: dockControls.length,
                    dockAudit,
                    glassMaterialContain: gmClip,
                    dockContain,
                    dockPresent: !!dock,
                    canvasCount: canvases.length,
                    mainChildren: (document.querySelector("main")?.children.length) ?? null,
                };
            });
            const png = `${OUT}/${slug}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "chrome", route, mode, w: SIZE.w, h: SIZE.h, dpr: 2, glRenderer, png, probe });
            console.error(`chrome ${slug} OK gl=${(glRenderer || "").slice(0, 50)} glass=${probe.glassSurfaceCount} dock=${probe.dockControlCount} clipViol=${probe.overlayBandClipViolations.length} textLen=${probe.bodyTextLen}`);
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", route, mode, err });
            console.error(`chrome ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/clip-chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
