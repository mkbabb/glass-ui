// NON-AUTHORING Chrome leg — all 4 BG.W-GLASS-DYNAMICS routes over BUILT :5200.
// CDP → real Chrome.app / Metal GPU. Polls data-capture-ready, records GL_RENDERER,
// probes computed glass-dynamics facts (specular hairline reads, press channel default),
// screenshots both modes.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GLASS-DYNAMICS-paint";
const ROUTES = [
    { id: "paper-glass", route: "/foundations/paper-glass" },
    { id: "glass-material", route: "/substrates/glass-material" },
    { id: "buttons", route: "/display/buttons" },
    { id: "card", route: "/display/card" },
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

const browser = await chromium.connectOverCDP(CDP);
const results = [];
for (const { id, route } of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const out = `${OUT}/gd-chrome-${id}-${mode}.png`;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            await page.waitForTimeout(1400);

            const glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) { return "err:" + e.message; }
            });

            // Computed glass-dynamics facts — the read-carrier probe.
            const facts = await page.evaluate(() => {
                const out = {};
                // main content count + glContext count (recessive-aurora / one-context checks)
                const main = document.querySelector("main");
                out.mainChildren = main ? main.children.length : -1;
                out.glContextCount = document.querySelectorAll("canvas").length;
                // find a glass-material / glass tier surface and read its ::before specular facts
                const sel = ".glass-material, .glass-resting, .glass-quiet, .glass-wash, .glass-floating, .glass-card, .glass-btn";
                const els = Array.from(document.querySelectorAll(sel)).slice(0, 40);
                let probed = null;
                for (const el of els) {
                    const cs = getComputedStyle(el, "::before");
                    const op = cs.opacity;
                    const bs = cs.boxShadow;
                    if (bs && bs !== "none") {
                        probed = {
                            tag: el.className.toString().slice(0, 60),
                            beforeOpacity: op,
                            beforeBoxShadow: bs.slice(0, 200),
                            beforeContent: cs.content,
                            specX: cs.getPropertyValue("--specular-x"),
                            specIntensity: cs.getPropertyValue("--specular-intensity"),
                        };
                        break;
                    }
                }
                out.beforeProbe = probed;
                out.glassBtnPressT = getComputedStyle(document.documentElement).getPropertyValue("--glass-btn-press-t") || "(unset→default 0)";
                return out;
            });

            await page.screenshot({ path: out, fullPage: false });
            results.push({ id, mode, out, glRenderer, facts, ok: true });
            console.log(JSON.stringify({ id, mode, glRenderer, mainChildren: facts.mainChildren, glCanvas: facts.glContextCount, beforeOpacity: facts.beforeProbe?.beforeOpacity, hairline: (facts.beforeProbe?.beforeBoxShadow||"").includes("inset") }));
        } catch (e) {
            results.push({ id, mode, out, error: String(e), ok: false });
            console.log(JSON.stringify({ id, mode, error: String(e).slice(0, 120) }));
        }
        await ctx.close();
    }
}
const fs = require("node:fs");
fs.writeFileSync(`${OUT}/chrome-facts.json`, JSON.stringify(results, null, 2));
await browser.close();
console.log("DONE chrome; facts → chrome-facts.json");
