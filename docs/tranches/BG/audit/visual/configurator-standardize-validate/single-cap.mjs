// Single-capture Chrome leg — one route+mode per fresh Chrome (robust vs GPU crashes).
// argv: <route> <mode>  ; connects to CDP_URL (a fresh Chrome launched by the orchestrator).
import { chromium } from "playwright";
import { writeFileSync, appendFileSync } from "node:fs";

const route = process.argv[2];
const mode = process.argv[3];
const CDP = process.env.CDP_URL || "http://localhost:9334";
const OUT = new URL(".", import.meta.url).pathname;
const slug = route.replace(/^\//, "").replace(/\//g, "-");

async function readback(page) {
    return await page.evaluate(() => {
        const q = (sel) => document.querySelector(sel);
        const rect = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
        };
        const cfg = q('[data-slot="configurator"]');
        const stage = cfg ? cfg.querySelector(".configurator-stage") : null;
        const aside = cfg ? cfg.querySelector(".configurator-aside") : null;
        const gallery = cfg ? cfg.querySelector("[data-gallery-dock]") : null;
        const sectionLabel = q(".configurator-section-label") || q("h2.text-subheading");
        const cfgDisplayHeaders = cfg
            ? cfg.querySelectorAll("[class*='text-display'], [class*='masthead']").length
            : -1;
        const canvases = Array.from(document.querySelectorAll("canvas"));
        const main = document.querySelector("main");
        const cfgRoot = rect(cfg);
        const asideBox = rect(aside);
        const stageBox = rect(stage);
        return {
            innerWidth: window.innerWidth,
            cfgRoot,
            stage: stageBox,
            aside: asideBox,
            gallery: rect(gallery),
            galleryPlacement: cfg ? cfg.getAttribute("data-gallery") : null,
            asideSide: cfg ? cfg.getAttribute("data-aside-side") : null,
            hasSectionLabel: !!sectionLabel,
            sectionLabelText: sectionLabel ? sectionLabel.textContent.trim().slice(0, 40) : null,
            cfgDisplayHeaders,
            canvasCount: canvases.length,
            mainChildren: main ? main.children.length : -1,
            asideFracOfRoot: cfgRoot && asideBox ? +(asideBox.w / cfgRoot.w).toFixed(4) : null,
            stageFracOfRoot: cfgRoot && stageBox ? +(stageBox.w / cfgRoot.w).toFixed(4) : null,
            asideRightGap: cfgRoot && asideBox ? +((cfgRoot.x + cfgRoot.w) - (asideBox.x + asideBox.w)).toFixed(1) : null,
            stageLeftGap: cfgRoot && stageBox ? +(stageBox.x - cfgRoot.x).toFixed(1) : null,
        };
    });
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
await page.goto(url, { waitUntil: "load", timeout: 30000 });
let ready = false;
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
    if (ready) break;
    await page.waitForTimeout(150);
}
const elapsed = Date.now() - t0;
await page.waitForTimeout(700);
const glRenderer = await page.evaluate(() => {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return "no-webgl";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    } catch (e) {
        return "err:" + e.message;
    }
});
const rb = await readback(page);
const outPath = `${OUT}configurator-${slug}-chrome-${mode}-desktop-full.png`;
await page.screenshot({ path: outPath, fullPage: true });
const rec = { route, mode, ready, elapsedMs: elapsed, glRenderer, outPath: outPath.split("/").pop(), readback: rb };
appendFileSync(`${OUT}chrome-readback.ndjson`, JSON.stringify(rec) + "\n");
console.log(JSON.stringify({ route, mode, ready, gl: glRenderer, out: rec.outPath }));
await page.close();
await browser.close();
