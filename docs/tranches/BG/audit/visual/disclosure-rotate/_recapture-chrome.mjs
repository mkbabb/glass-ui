// Re-capture Chrome shots with inline luminance verify + retry. Each shot uses a
// FRESH page, clears localStorage before boot, polls data-capture-ready, then
// samples a content-band luminance to confirm the mode actually applied
// (light must be cream ~>180, dark must be ~<70). Retries once on mismatch.
import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/disclosure-rotate/";
const ROUTES = [
    { key: "accordion", route: "/containers/accordion" },
    { key: "select", route: "/forms/select" },
    { key: "configurator", route: "/compositions/configurator" },
];

function bandLum(path) {
    const png = PNG.sync.read(fs.readFileSync(path));
    let n = 0, s = 0;
    for (let y = 300; y < 340; y++)
        for (let x = 300; x < 1100; x++) {
            const i = (png.width * y + x) * 4;
            s += 0.299 * png.data[i] + 0.587 * png.data[i + 1] + 0.114 * png.data[i + 2];
            n++;
        }
    return Math.round(s / n);
}

async function shot(ctx, key, route, mode, attempt = 1) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    // hard-clear persisted scheme BEFORE the capture boot reads it
    await page.goto("http://localhost:5200/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
        await page.waitForTimeout(150);
    }
    const dom = await page.evaluate(() => ({
        hasDark: document.documentElement.classList.contains("dark"),
        htmlBg: getComputedStyle(document.documentElement).backgroundColor,
    }));
    const glRenderer = await page.evaluate(() => {
        try { const c = document.createElement("canvas"); const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl"; const e = gl.getExtension("WEBGL_debug_renderer_info");
            return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (x) { return "err"; }
    });
    const outPath = `${OUT}disclosure-chrome-${key}-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    await page.close();
    const lum = bandLum(outPath);
    const wantLight = mode === "light";
    const ok = wantLight ? lum > 150 : lum < 90;
    console.log(JSON.stringify({ key, mode, attempt, lum, hasDark: dom.hasDark, htmlBg: dom.htmlBg, glRenderer, ok }));
    if (!ok && attempt < 3) {
        await new Promise((r) => setTimeout(r, 400));
        return shot(ctx, key, route, mode, attempt + 1);
    }
    return { key, mode, lum, ok };
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const results = [];
for (const { key, route } of ROUTES)
    for (const mode of ["light", "dark"])
        results.push(await shot(ctx, key, route, mode));
await browser.close();
console.log("SUMMARY", JSON.stringify(results));
