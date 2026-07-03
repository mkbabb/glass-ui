// BG.W-CORNER-ALIAS-KILL — Chrome CDP dual-mode capture over BUILT :5200 bytes.
// Non-authoring paint judge. Routes: /display/card, /substrates/glass-material, /display/buttons.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pw = require("playwright-core");
const { chromium } = pw;
import fs from "node:fs";
import path from "node:path";

const OUT = "docs/tranches/BG/audit/visual/BG.W-CORNER-ALIAS-KILL-paint";
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
    { route: "/display/card", slug: "card" },
    { route: "/substrates/glass-material", slug: "glass-material" },
    { route: "/display/buttons", slug: "buttons" },
];
const MODES = ["light", "dark"];

const results = [];

const browser = await chromium.connectOverCDP("http://localhost:9456");
const ctx = browser.contexts()[0] || (await browser.newContext());

for (const { route, slug } of ROUTES) {
    for (const mode of MODES) {
        const page = await ctx.newPage();
        await page.setViewportSize({ width: 1440, height: 900 });
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 20000 }
        );
        // let GL + transitions settle
        await page.waitForTimeout(1400);

        // GL_RENDERER provenance
        const glRenderer = await page.evaluate(() => {
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2");
                const ext = gl.getExtension("WEBGL_debug_renderer_info");
                return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
            } catch (e) {
                return "GL-PROBE-FAIL:" + e.message;
            }
        });

        // Corner-backplate discipline: for every rounded card/glass surface, walk its
        // ::before / child backplate layers and check they don't paint an opaque
        // square-corner box behind the radius. We report the computed evidence.
        const cornerAudit = await page.evaluate(() => {
            const out = { surfaces: [], routeChildren: 0, glContexts: 0 };
            out.routeChildren = document.querySelectorAll("main > *, [data-route] > *").length;
            out.glContexts = document.querySelectorAll("canvas").length;

            // Sample rounded glass/card surfaces
            const sel = ".glass-card, .glass-material, [data-slot='card'], .story-hero, [class*='glass-'], .glass-panel";
            const els = Array.from(document.querySelectorAll(sel)).slice(0, 40);
            for (const el of els) {
                const cs = getComputedStyle(el);
                const br = cs.borderRadius;
                if (!br || br === "0px") continue;
                const rect = el.getBoundingClientRect();
                if (rect.width < 40 || rect.height < 40) continue;
                const before = getComputedStyle(el, "::before");
                const beforeContent = before.content;
                const hasBefore = beforeContent && beforeContent !== "none" && beforeContent !== "normal";
                out.surfaces.push({
                    cls: el.className?.toString().slice(0, 60),
                    br,
                    overflow: cs.overflow,
                    beforeRadius: hasBefore ? before.borderRadius : null,
                    beforeBg: hasBefore ? before.backgroundColor : null,
                    rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
                });
            }
            return out;
        });

        // Find the primary rounded card to do corner close-ups on
        const cardBox = await page.evaluate(() => {
            // Prefer a visible glass-card / card / glass-material with a corner over the field
            const cand = Array.from(document.querySelectorAll(
                ".glass-card, [data-slot='card'], .glass-material, .story-hero, .glass-panel, [class*='glass-floating'], [class*='glass-resting']"
            ));
            let best = null;
            for (const el of cand) {
                const cs = getComputedStyle(el);
                const br = parseFloat(cs.borderRadius) || 0;
                if (br < 6) continue;
                const r = el.getBoundingClientRect();
                if (r.width < 120 || r.height < 80) continue;
                if (r.top < -50 || r.top > 850) continue;
                if (!best || r.top < best.top || (Math.abs(r.top - best.top) < 30 && r.width > best.width)) {
                    best = { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, br };
                }
            }
            return best;
        });

        const full = path.join(OUT, `${slug}-chrome-${mode}-full.png`);
        await page.screenshot({ path: full });

        let tl = null, tr = null;
        if (cardBox) {
            const cx = Math.max(0, Math.floor(cardBox.x));
            const cy = Math.max(0, Math.floor(cardBox.y));
            const cw = Math.min(90, Math.floor(cardBox.width));
            const ch = Math.min(90, Math.floor(cardBox.height));
            const trx = Math.max(0, Math.floor(cardBox.x + cardBox.width - 90));
            try {
                tl = path.join(OUT, `${slug}-chrome-${mode}-cornerTL.png`);
                await page.screenshot({ path: tl, clip: { x: cx, y: cy, width: cw, height: ch } });
                tr = path.join(OUT, `${slug}-chrome-${mode}-cornerTR.png`);
                await page.screenshot({ path: tr, clip: { x: trx, y: cy, width: 90, height: ch } });
            } catch (e) {
                console.error("corner clip fail", slug, mode, e.message);
            }
        }

        results.push({ route, mode, glRenderer, cornerAudit, cardBox, full, tl, tr });
        console.error(`[captured] ${slug} ${mode}  gl=${glRenderer}  card=${cardBox ? `${Math.round(cardBox.width)}x${Math.round(cardBox.height)}@${Math.round(cardBox.top)} br=${cardBox.br}` : "NONE"}  surfaces=${cornerAudit.surfaces.length}`);
        await page.close();
    }
}

await browser.close();
fs.writeFileSync(path.join(OUT, "chrome-audit.json"), JSON.stringify(results, null, 2));
console.log("DONE chrome capture");
