// Chrome leg — dual-engine paint judge for BG.W-CHASSIS-ADOPT-OR-RETIRE.
// Real on-screen Chrome.app (real Metal GPU) over ?capture=<route>&mode=<mode> via CDP.
// Polls data-capture-ready, does the COMPUTED-DOM header-anatomy probe, then full-page shot.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;

const ROUTES = [
    "/foundations/intro",
    "/substrates/aurora",
    "/substrates/glass-material",
    "/substrates/paper-grid",
    "/substrates/dot-flow-field",
];

function slug(route) {
    return route.replace(/^\//, "").replace(/\//g, "_");
}

async function probe(page) {
    return page.evaluate(() => {
        const main = document.querySelector("main") || document.body;
        // Count display-scale <h1> titles anywhere in the route content
        const h1s = Array.from(document.querySelectorAll("main h1, [data-story-root] h1, h1"));
        // Inline <header> elements INSIDE the route content (the criterion: 0 inline <header>)
        const scope = document.querySelector("main") || document.body;
        const inlineHeaders = Array.from(scope.querySelectorAll("header"));
        // StoryHeader cluster markers — the unified header cluster class
        const clusters = document.querySelectorAll(".story-header, [data-story-header]");
        const eyebrows = document.querySelectorAll(".section-label, [data-eyebrow]");
        // subpath chips
        const subpathChips = Array.from(document.querySelectorAll("*")).filter(
            (e) => /@mkbabb\/glass-ui\//.test(e.textContent || "") && e.children.length === 0
        );
        // Any "Studio" restatement title at display scale?
        const studioTitles = Array.from(document.querySelectorAll("h1,h2,h3,[class*='display']"))
            .filter((e) => /studio/i.test((e.textContent || "").trim()) && (e.textContent || "").trim().length < 40)
            .map((e) => ({ tag: e.tagName, cls: e.className, text: (e.textContent || "").trim() }));
        // WebGL/GPU context count (canvas count as a proxy)
        const canvases = document.querySelectorAll("canvas");
        // Display h1 text list
        const h1texts = h1s.map((e) => (e.textContent || "").trim()).filter(Boolean);
        // inline header texts (first 60 chars each)
        const headerTexts = inlineHeaders.map((h) => (h.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80));
        return {
            mainChildren: main.children.length,
            h1Count: h1s.length,
            h1texts,
            inlineHdr: inlineHeaders.length,
            headerTexts,
            clusterCount: clusters.length,
            eyebrowCount: eyebrows.length,
            subpathChipCount: subpathChips.length,
            studioTitles,
            canvasCount: canvases.length,
        };
    });
}

async function capture(ctx, route, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `${ORIGIN}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let gotoOk = false;
    for (let attempt = 0; attempt < 5 && !gotoOk; attempt++) {
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            gotoOk = true;
        } catch (e) {
            console.error(`goto retry ${attempt} for ${route}/${mode}: ${e.message.split("\n")[0]}`);
            await page.waitForTimeout(1500);
        }
    }
    let ready = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        ready = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        );
        if (ready) break;
        await page.waitForTimeout(150);
    }
    const elapsed = Date.now() - t0;
    // let vizzes settle a beat for a representative frame
    await page.waitForTimeout(600);
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
    const dom = await probe(page);
    const outPath = `${OUT}chrome__${slug(route)}_${mode}.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ route, mode, ready, elapsedMs: elapsed, glRenderer, outPath, dom }));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const route of ROUTES) {
    for (const mode of ["light", "dark"]) {
        await capture(ctx, route, mode);
    }
}
await browser.close().catch(() => {});
