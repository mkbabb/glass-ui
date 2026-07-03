// BG.W-CHASSIS-ADOPT-OR-RETIRE — Chrome CDP dual-mode paint judge.
// Non-authoring: connects to a real-GPU Chrome over CDP, captures the 5 wave
// routes in both modes, records GL_RENDERER for provenance, and runs the
// COMPUTED DOM checks the paint criterion demands (StoryHeader unified cluster:
// IconChip/eyebrow/accent rendered ONCE, 0 inline <header>; VizStudio anatomy).
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const pw = require("playwright-core");
const { chromium } = pw;

const BASE = "http://localhost:5200";
const OUT = resolve(
    "docs/tranches/BG/audit/visual/BG.W-CHASSIS-ADOPT-OR-RETIRE-paint",
);
mkdirSync(OUT, { recursive: true });

const ROUTES = [
    "/foundations/intro",
    "/substrates/aurora",
    "/substrates/glass-material",
    "/substrates/paper-grid",
    "/substrates/dot-flow-field", // route slug for /substrates/dotflow
];
const MODES = ["light", "dark"];

const results = {};

const browser = await chromium.connectOverCDP("http://localhost:9456");
const ctx = browser.contexts()[0] || (await browser.newContext());

// Record GL_RENDERER off a throwaway webgl2 context for provenance.
const glProbe = await ctx.newPage();
await glProbe.goto("about:blank");
const glRenderer = await glProbe.evaluate(() => {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return "NO_WEBGL";
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        return dbg
            ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
            : gl.getParameter(gl.RENDERER);
    } catch (e) {
        return "PROBE_ERR:" + e.message;
    }
});
await glProbe.close();
console.log("GL_RENDERER:", glRenderer);

for (const route of ROUTES) {
    for (const mode of MODES) {
        const key = `${route}::${mode}`;
        const page = await ctx.newPage();
        await page.setViewportSize({ width: 1440, height: 1024 });
        const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        try {
            await page.goto(url, {
                waitUntil: "domcontentloaded",
                timeout: 30000,
            });
            await page.waitForFunction(
                () =>
                    document.documentElement.hasAttribute(
                        "data-capture-ready",
                    ),
                { timeout: 25000 },
            );
            // settle a beat for GL/entrance frames
            await page.waitForTimeout(1200);

            const checks = await page.evaluate(() => {
                const q = (s) => Array.from(document.querySelectorAll(s));
                // The surviving StoryHeader unified cluster (real markup:
                // .story-header-cluster > .story-header-eyebrow / .story-header-subpath / <h1> / .story-header-blurb).
                const clusters = q(".story-header-cluster");
                const eyebrows = q(".story-header-eyebrow");
                const subpaths = q(".story-header-subpath");
                const blurbs = q(".story-header-blurb");
                // Inline <header> that would restate the identity ABOVE the card
                // (the reading-order INVERSION the wave killed). 0 = correct.
                const inlineHeaders = q("header");
                // IconChip pops anywhere on the page (identity accent vehicle)
                const iconChips = q(".icon-chip, [class*='icon-chip']");
                // anatomy
                const main =
                    document.querySelector("main") ||
                    document.querySelector("[data-capture-root]") ||
                    document.body;
                const mainChildren = main ? main.children.length : -1;
                // canvas / GL presence
                let canvasCount = 0;
                q("canvas").forEach((c) => {
                    if (c.width > 0 && c.height > 0) canvasCount++;
                });
                const h1s = q("h1");
                // Duplication witness: eyebrow text appearing >1 = split cluster
                const eyebrowTexts = eyebrows.map((e) =>
                    (e.textContent || "").trim(),
                );
                const dupEyebrow =
                    new Set(eyebrowTexts).size < eyebrowTexts.length;
                return {
                    clusterCount: clusters.length,
                    eyebrowCount: eyebrows.length,
                    subpathCount: subpaths.length,
                    blurbCount: blurbs.length,
                    inlineHeaderCount: inlineHeaders.length,
                    iconChipCount: iconChips.length,
                    dupEyebrow,
                    eyebrowTexts,
                    mainChildren,
                    canvasCount,
                    h1Count: h1s.length,
                    h1Texts: h1s.map((h) =>
                        (h.textContent || "").trim().slice(0, 60),
                    ),
                    subpathTexts: subpaths.map((s) =>
                        (s.textContent || "").trim(),
                    ),
                };
            });

            const png = resolve(
                OUT,
                `chrome_${route.replace(/\//g, "_")}_${mode}.png`,
            );
            await page.screenshot({ path: png, fullPage: false });
            results[key] = { ok: true, checks, png, glRenderer };
            console.log(
                `OK ${key} cluster=${checks.clusterCount} eyebrow=${checks.eyebrowCount} subpath=${checks.subpathCount} blurb=${checks.blurbCount} inlineHdr=${checks.inlineHeaderCount} dupEyebrow=${checks.dupEyebrow} chips=${checks.iconChipCount} mainKids=${checks.mainChildren} canvas=${checks.canvasCount} h1=${checks.h1Count}`,
            );
        } catch (e) {
            results[key] = { ok: false, error: e.message };
            console.log(`FAIL ${key}: ${e.message}`);
        } finally {
            await page.close();
        }
    }
}

await browser.close();

console.log("\n=== SUMMARY JSON ===");
console.log(JSON.stringify({ glRenderer, results }, null, 2));
