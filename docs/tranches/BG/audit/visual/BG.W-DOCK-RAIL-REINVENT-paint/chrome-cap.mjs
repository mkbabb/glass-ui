// Chrome leg (CDP → real Chrome.app / Metal GPU) for BG.W-DOCK-RAIL-REINVENT.
// Boots ?capture over BUILT :5200, polls data-capture-ready, records GL_RENDERER,
// screenshots BOTH routes × BOTH modes, and computes the rail DOM probes
// (box-inviolate deltaW/deltaH, overhang ratio, glContextCount, compositor-only fan).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOCK-RAIL-REINVENT-paint";
const ROUTES = [
    { route: "/dock/rail", slug: "rail" },
    { route: "/dock/liquid-playground", slug: "liquid-playground" },
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

const browser = await chromium.connectOverCDP(CDP);
const results = [];
for (const { route, slug } of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const out = `${OUT}/rail-chrome-${slug}-${mode}.png`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        let ready = false;
        try {
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            ready = true;
        } catch (e) {
            ready = false;
        }
        await page.waitForTimeout(1400);

        const glRenderer = await page.evaluate(() => {
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

        // DOM probes: DockStack presence, hairline tokens, glContextCount,
        // box-inviolate (dock plate bbox at rest), compositor-only animation channels.
        const probe = await page.evaluate(() => {
            const q = (s) => Array.from(document.querySelectorAll(s));
            const stacks = q(".dock-stack, [class*='dock-stack'], .dock-hairline-slot");
            const docks = q(".glass-dock");
            const canvases = q("canvas");
            let glContextCount = 0;
            for (const cv of canvases) {
                try {
                    // presence heuristic: a WebGL/WebGPU-backed canvas has non-2d ctx
                    // we cannot re-getContext, so count canvases as upper bound
                    glContextCount++;
                } catch (e) {}
            }
            // rail hairline token resolution off :root
            const cs = getComputedStyle(document.documentElement);
            const hairline = cs.getPropertyValue("--dock-rail-hairline").trim();
            const overhang = cs.getPropertyValue("--dock-rail-overhang").trim();
            const overhangMinor = cs
                .getPropertyValue("--dock-rail-overhang-minor")
                .trim();
            const golden = cs.getPropertyValue("--dock-rail-golden").trim();

            // any element carrying animation-timeline (scroll-driven leak check)
            const withTimeline = q("*").filter((el) => {
                const s = getComputedStyle(el);
                const t = s.animationTimeline;
                return t && t !== "auto" && t !== "";
            }).length;

            // dock plate bboxes
            const dockBoxes = docks.map((d) => {
                const r = d.getBoundingClientRect();
                return {
                    x: Math.round(r.x),
                    y: Math.round(r.y),
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                };
            });

            // dock-stack / hairline slot elements + their computed classes
            const stackInfo = stacks.map((s) => {
                const r = s.getBoundingClientRect();
                return {
                    cls: s.className,
                    w: Math.round(r.width),
                    h: Math.round(r.height),
                };
            });

            return {
                dockCount: docks.length,
                stackCount: stacks.length,
                canvasCount: canvases.length,
                glContextCount,
                hairline,
                overhang,
                overhangMinor,
                golden,
                withTimeline,
                dockBoxes,
                stackInfo,
                mainChildren: document.querySelector("main")
                    ? document.querySelector("main").children.length
                    : null,
            };
        });

        await page.screenshot({ path: out, fullPage: false });
        const rec = { route, slug, mode, out, ready, glRenderer, probe };
        results.push(rec);
        console.log(JSON.stringify(rec));
        await ctx.close();
    }
}
await browser.close();
console.log("=== SUMMARY ===");
console.log(JSON.stringify(results, null, 2));
