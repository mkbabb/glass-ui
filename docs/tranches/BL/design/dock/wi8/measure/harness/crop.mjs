// crop.mjs <port> <out-dir> [--engine chromium|webkit]: FOLD-2 (C2-6, C2-19). Pixels of a
// travel held at given points, with no test hook: requestAnimationFrame is gated in the
// page, so the carrier's loop stops on the frame that crosses a threshold, a crop is shot
// with the dock and with the dock hidden (their difference is what the dock paints), and
// the loop is released. One browser, a new context per cell, everything closed in finally.
// Writes <out>/<cell>.<engine>.<n>.png (+ .bare.png for the analysis pairs) and
// <out>/crops.<engine>.json; analyse.py reads them, composes the strips and deletes the pairs.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, outDir] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
mkdirSync(outDir, { recursive: true });
const GATE = `(() => {
  const raf = window.requestAnimationFrame.bind(window);
  const q = [];
  const G = (window.__gate = { frozen: false, want: null });
  window.requestAnimationFrame = (cb) => raf((t) => {
    if (G.frozen) { q.push(cb); return; }
    cb(t);
    if (G.want && G.want()) { G.frozen = true; G.want = null; }
  });
  window.__release = () => { G.frozen = false; const c = q.splice(0); raf((t) => c.forEach((f) => f(t))); };
  window.__want = (sel, dim, target, dir) => { const e = document.querySelector(sel); G.want = () => { const b = e.getBoundingClientRect(); const v = dim === "w" ? b.width : b.height; return dir < 0 ? v <= target : v >= target; }; };
})()`;
const meta = [];
let browser;
async function cell(name, q, fn) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    try {
        await ctx.addInitScript(GATE);
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${q}`);
        await page.waitForFunction(() => window.__animReady === true, null, { timeout: 15000, polling: 50 });
        await page.waitForTimeout(700);
        await fn(page, name);
    } catch (e) {
        meta.push({ name, error: String(e).slice(0, 300) });
        console.log(name, "error", String(e).slice(0, 200));
    } finally {
        await ctx.close();
    }
}
const box = (page, sel) => page.evaluate((s) => { const b = document.querySelector(s).getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, r: getComputedStyle(document.querySelector(s)).borderTopLeftRadius }; }, sel);
/** Shoots the clip with the dock, and (pair) with the dock hidden. */
async function shoot(page, name, n, dock, clip, pair) {
    const plate = await box(page, `${dock} > .dock-plate`);
    const file = `${outDir}/${name}.${engine}.${n}.png`;
    await page.screenshot({ path: file, clip });
    if (pair) {
        await page.evaluate((s) => { document.querySelector(s).style.visibility = "hidden"; }, dock);
        await page.screenshot({ path: file.replace(/\.png$/, ".bare.png"), clip });
        await page.evaluate((s) => { document.querySelector(s).style.removeProperty("visibility"); }, dock);
    }
    meta.push({ name, n, engine, file: file.split("/").pop(), pair: !!pair, clip, plate });
}
const frozen = (page) => page.waitForFunction(() => window.__gate.frozen === true, null, { timeout: 4000, polling: 10 });
async function hoverOpen(page, dock) {
    const b = await page.locator(`${dock} > .dock-plate`).boundingBox();
    await page.mouse.move(b.x - 40, b.y + b.height / 2);
    await page.mouse.move(b.x + b.width / 2 - 3, b.y + b.height / 2, { steps: 4 });
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 2 });
    await page.waitForTimeout(900);
}
/** A travel of `dim` from its value now to `to`, held at each fraction. */
async function travel(page, name, dock, clip, trigger, dim, to, fractions, pair) {
    const from = (await box(page, `${dock} > .dock-plate`))[dim];
    const dir = Math.sign(to - from);
    await shoot(page, name, 0, dock, clip, pair);
    let n = 1;
    await page.evaluate(([s, d, t, dr]) => window.__want(s, d, t, dr), [`${dock} > .dock-plate`, dim, from + (to - from) * fractions[0], dir]);
    await trigger();
    for (let i = 0; i < fractions.length; i++) {
        await frozen(page);
        await shoot(page, name, n++, dock, clip, pair);
        if (i + 1 < fractions.length) await page.evaluate(([s, d, t, dr]) => window.__want(s, d, t, dr), [`${dock} > .dock-plate`, dim, from + (to - from) * fractions[i + 1], dir]);
        await page.evaluate(() => window.__release());
    }
    await page.waitForTimeout(900);
    await shoot(page, name, n, dock, clip, pair);
}
const around = (b, pad) => ({ x: Math.max(0, Math.floor(b.x - pad)), y: Math.max(0, Math.floor(b.y - pad)), width: Math.ceil(b.w + 2 * pad), height: Math.ceil(b.h + 2 * pad) });
try {
    browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [], ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    const F = [0.1, 0.3, 0.5, 0.7, 0.9];
    // The pill's fold, for the owner's strip (the page's own ground) and for the outline
    // (stripes behind, so the glass differs from its ground everywhere).
    for (const [name, q, pair] of [["fold", "w-pill", false], ["fold-out", "w-pill&ground=stripes", true]]) {
        await cell(name, q, async (page) => {
            const D = "[data-testid=w-pill]";
            await hoverOpen(page, D);
            const open = await box(page, `${D} > .dock-plate`);
            await travel(page, name, D, around(open, 28), () => page.mouse.click(5, 5), "w", 56, F, pair);
        });
    }
    // A layer change through the crossfade, 2 rows to 4.
    for (const [name, q, pair] of [["swap", "w-xf", false], ["swap-out", "w-xf&ground=stripes", true]]) {
        await cell(name, q, async (page) => {
            const D = "[data-testid=w-xf]";
            const b0 = await box(page, `${D} > .dock-plate`);
            // The target height is read from a dry run in this same context.
            await page.locator("[data-testid=w-xf-layers]").click();
            await page.waitForTimeout(900);
            const b1 = await box(page, `${D} > .dock-plate`);
            await page.locator("[data-testid=w-xf-assets]").click();
            await page.waitForTimeout(900);
            const clip = around({ x: Math.min(b0.x, b1.x), y: Math.min(b0.y, b1.y), w: Math.max(b0.w, b1.w), h: Math.max(b0.h, b1.h) }, 28);
            await travel(page, name, D, clip, () => page.evaluate(() => document.querySelector("[data-testid=w-xf-layers]").click()), "h", b1.h, F, pair);
        });
    }
    // Rests: the two-row layer dock open (a tall stadium and its content), the worded
    // folded face, the one-seat controls dock.
    for (const [name, q, D, hover] of [["tall", "w-layers&ground=stripes", "[data-testid=w-layers]", true], ["tall-page", "w-layers", "[data-testid=w-layers]", true], ["sci", "w-sci&ground=stripes", "[data-testid=w-sci]", false], ["ctl1", "w-ctl1&ground=stripes", "[data-testid=w-ctl1]", false]]) {
        await cell(name, q, async (page) => {
            if (hover) await hoverOpen(page, D);
            const b = await box(page, `${D} > .dock-plate`);
            await shoot(page, name, 0, D, around(b, 28), name !== "tall-page");
            if (name === "tall") {
                // Where the open face's content box lies against the plate.
                const info = await page.evaluate((s) => { const d = document.querySelector(s); const p = d.querySelector(":scope > .dock-plate").getBoundingClientRect(); const f = d.querySelector(".dock-layer--full").getBoundingClientRect(); return { plate: [p.x, p.y, p.width, p.height], face: [f.x, f.y, f.width, f.height] }; }, D);
                meta.push({ name: "tall-info", engine, ...info });
            }
        });
    }
} finally {
    if (browser) await browser.close().catch(() => {});
}
writeFileSync(`${outDir}/crops.${engine}.json`, JSON.stringify(meta, null, 1));
console.log("shot", meta.filter((m) => m.file).length, "errors", meta.filter((m) => m.error).length);
