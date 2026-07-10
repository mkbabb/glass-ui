// Chrome leg — BG.W-CONFIGURATOR-STANDARDIZE dual-engine paint + cross-studio ALIGNMENT readback.
// Real on-screen Chrome.app (real Metal GPU) over the ?capture=<route>&mode=<mode> boot path via
// playwright connectOverCDP. Polls data-capture-ready, full-page screenshot, then a COMPUTED DOM
// readback of the configurator root/stage/aside/gallery/header boxes for the alignment proof.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ROUTES = ["/substrates/aurora", "/substrates/blob", "/substrates/fourier-field"];
const CDP = process.env.CDP_URL || "http://localhost:9334";
const OUT = new URL(".", import.meta.url).pathname;

function slug(route) {
    return route.replace(/^\//, "").replace(/\//g, "-");
}

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
        // header rung: the StorySection heading (the section label rung) is the studio identity line
        const sectionLabel = q(".configurator-section-label") || q("h2.text-subheading, h2[class*='subheading']");
        // count masthead-style display headers INSIDE the configurator (must be 0 — the double-header class)
        const cfgDisplayHeaders = cfg
            ? cfg.querySelectorAll("[class*='text-display'], [class*='masthead']").length
            : -1;
        // gl contexts on the page (one-GL-per-route budget; the stage canvas)
        const canvases = Array.from(document.querySelectorAll("canvas"));
        let glContextCount = 0;
        for (const c of canvases) {
            // heuristic: a canvas with non-zero paint area that the viz drew into
            if (c.width > 0 && c.height > 0) glContextCount++;
        }
        // main children (the StoryPage body shape)
        const main = document.querySelector("main");
        const mainChildren = main ? main.children.length : -1;
        const cfgRoot = rect(cfg);
        const asideBox = rect(aside);
        const stageBox = rect(stage);
        // aside offset relative to configurator root left edge + its fractional width
        const vw = window.innerWidth;
        return {
            innerWidth: vw,
            innerHeight: window.innerHeight,
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
            glContextCount,
            mainChildren,
            // proportion metrics for cross-studio agreement
            asideFracOfRoot: cfgRoot && asideBox ? +(asideBox.w / cfgRoot.w).toFixed(4) : null,
            stageFracOfRoot: cfgRoot && stageBox ? +(stageBox.w / cfgRoot.w).toFixed(4) : null,
            asideRightGap: cfgRoot && asideBox ? +((cfgRoot.x + cfgRoot.w) - (asideBox.x + asideBox.w)).toFixed(1) : null,
            stageLeftGap: cfgRoot && stageBox ? +(stageBox.x - cfgRoot.x).toFixed(1) : null,
        };
    });
}

async function capture(ctx, route, mode) {
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
    // let the viz paint a couple frames
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
    const outPath = `${OUT}configurator-${slug(route)}-chrome-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    await page.close();
    return { route, mode, ready, elapsedMs: elapsed, glRenderer, outPath: outPath.split("/").pop(), readback: rb };
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const results = [];
for (const route of ROUTES) {
    for (const mode of ["light", "dark"]) {
        const r = await capture(ctx, route, mode);
        console.log(JSON.stringify({ route: r.route, mode: r.mode, ready: r.ready, gl: r.glRenderer, out: r.outPath }));
        results.push(r);
    }
}
await browser.close();
writeFileSync(`${OUT}chrome-readback.json`, JSON.stringify(results, null, 2));
console.log("WROTE chrome-readback.json");
