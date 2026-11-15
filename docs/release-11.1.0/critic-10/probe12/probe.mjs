// Critic 10 probe12: the run's selected plate under the ancestors fix 9's record left
// unread (its open gap: "a non-uniform ... ancestor transform was not read"), and under a
// zoom combined with right-to-left, a vertical dock and reduced motion. Same method as
// probe11: the plate is painted magenta and its box read from the screenshot against the
// current control's own plate box (viewport px, within 2), at rest and after a navigation.
//   nonuni-*   an ancestor with transform: scale(0.8, 1.2)
//   nested-*   an ancestor with transform: scale(0.8) around one with zoom: 1.25
//   rtlzoom-*  a right-to-left page, an ancestor with zoom: 1.25
//   vertzoom-* a vertical dock under zoom: 1.25
//   rmzoom-*   reduced motion, an ancestor with zoom: 0.8
//   inslot-*   (a reading, not counted) a #collapsed slot that is always passed and whose
//              content is emptied: what the summary is then
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/critic-10/probe12/harness/index.html";
const cells = [];
const readings = [];
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

async function shot(page, name, pad = 10) {
    const nav = await page.locator('[data-probe="nav"]').first().boundingBox();
    const vp = page.viewportSize();
    const x = Math.max(0, Math.floor(nav.x - pad)), y = Math.max(0, Math.floor(nav.y - pad));
    const clip = { x, y, width: Math.min(Math.ceil(nav.width + 2 * pad), vp.width - x), height: Math.min(Math.ceil(nav.height + 2 * pad), vp.height - y) };
    return { clip, png: PNG.sync.read(await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip })) };
}
const MAGENTA = (r, g, b) => r > 200 && b > 200 && g < 90;
function bbox(png, clip) {
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        if (MAGENTA(png.data[i], png.data[i + 1], png.data[i + 2])) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return x1 < 0 ? null : { x: x0 + clip.x, y: y0 + clip.y, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
// The current control's plate box in viewport px: its border box, less its padding when
// its fill is clipped to the content box (a glyph control). The padding is scaled per
// axis by the control's own visual scale (rect over layout box).
const seatRead = () => {
    const s = document.querySelector('[data-probe="nav"] [aria-current="page"]');
    const run = document.querySelector('[data-probe="nav"] .dock-run');
    const mark = run?.querySelector(":scope > .dock-run-mark");
    const out = { markEl: !!mark, vars: run ? ["x", "y", "w", "h", "r"].map((k) => run.style.getPropertyValue(`--dock-run-mark-${k}`)).join(" ") : "" };
    if (!s || !run) return out;
    const r = s.getBoundingClientRect(), cs = getComputedStyle(s), port = run.getBoundingClientRect();
    const kx = s.offsetWidth ? r.width / s.offsetWidth : 1, ky = s.offsetHeight ? r.height / s.offsetHeight : 1;
    const content = cs.backgroundClip === "content-box";
    const p = content ? [parseFloat(cs.paddingLeft) * kx, parseFloat(cs.paddingTop) * ky, parseFloat(cs.paddingRight) * kx, parseFloat(cs.paddingBottom) * ky] : [0, 0, 0, 0];
    const plate = { x: r.left + p[0], y: r.top + p[1], w: r.width - p[0] - p[2], h: r.height - p[1] - p[3] };
    const x0 = Math.max(plate.x, port.left), x1 = Math.min(plate.x + plate.w, port.right), y0 = Math.max(plate.y, port.top), y1 = Math.min(plate.y + plate.h, port.bottom);
    const fix = (o) => Object.fromEntries(Object.entries(o).map(([key, v]) => [key, +v.toFixed(1)]));
    return { ...out, k: [+kx.toFixed(3), +ky.toFixed(3)], layout: [s.offsetLeft, s.offsetTop, s.offsetWidth, s.offsetHeight], plate: fix(plate), visible: x1 > x0 && y1 > y0 ? fix({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 }) : null };
};
const near = (a, b, tol = 2) => !!a && !!b && ["x", "y", "w", "h"].every((key) => Math.abs(a[key] - b[key]) <= tol);
async function step(page, name, tag) {
    await page.evaluate(() => document.querySelector('[data-probe="nav"] [aria-current="page"]')?.scrollIntoView({ inline: "center", block: "nearest" }));
    await page.waitForTimeout(900);
    const seat = await page.evaluate(seatRead);
    const s = await shot(page, `${name}-${tag}`);
    const paint = bbox(s.png, s.clip);
    return { tag, ...seat, paint, on: near(paint, seat.visible) };
}
async function markCell(name, [width, theme], how, reducedMotion = "no-preference") {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion });
    try {
        const page = await context.newPage();
        await page.goto(`${base}${PATH}?${how}&theme=${theme}`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(1600);
        const steps = [await step(page, name, "rest")];
        await page.evaluate(() => window.__select(3));
        await page.waitForTimeout(1400);
        steps.push(await step(page, name, "moved"));
        cells.push({ cell: name, steps, allOn: steps.every((s) => s.on) });
    } catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); }
    finally { await context.close(); }
}

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        const t = `${width}-${theme}`, vp = [width, theme];
        for (const shape of ["tab", "icon"]) {
            const q = `shape=${shape}`;
            await markCell(`nonuni-${shape}-${t}`, vp, `${q}&tf=${encodeURIComponent("scale(0.8, 1.2)")}`);
            await markCell(`nested-${shape}-${t}`, vp, `${q}&tf=${encodeURIComponent("scale(0.8)")}&z2=1.25`);
            await markCell(`rtlzoom-${shape}-${t}`, vp, `${q}&z=1.25&dir=rtl`);
            await markCell(`vertzoom-${shape}-${t}`, vp, `${q}&z=1.25&orientation=vertical`);
            await markCell(`rmzoom-${shape}-${t}`, vp, `${q}&z=0.8`, "reduce");
        }
        if (theme === "light") {
            const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
            try {
                const page = await context.newPage();
                await page.goto(`${base}${PATH}?scene=inslot&theme=${theme}`, { waitUntil: "load" });
                await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
                await page.waitForTimeout(900);
                const summary = () => { const s = document.querySelector(".dock-layer--summary"); const r = s.getBoundingClientRect(); const d = document.querySelector(".glass-dock").getBoundingClientRect(); return { role: s.getAttribute("role"), tabindex: s.getAttribute("tabindex"), label: s.getAttribute("aria-label"), box: [+r.width.toFixed(1), +r.height.toFixed(1)], dock: [+d.width.toFixed(1), +d.height.toFixed(1)] }; };
                const before = await page.evaluate(summary);
                await shot(page, `inslot-${width}-before`);
                await page.evaluate(() => window.__content(false));
                await page.waitForTimeout(1200);
                const after = await page.evaluate(summary);
                await shot(page, `inslot-${width}-after`);
                readings.push({ cell: `inslot-${width}`, before, after });
            } catch (e) { readings.push({ cell: `inslot-${width}`, error: String(e).slice(0, 300) }); }
            finally { await context.close(); }
        }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells, readings }, null, 1));
const b = (o) => (o ? `${o.x},${o.y} ${o.w}x${o.h}` : "none");
let on = 0, errors = 0;
for (const c of cells) {
    if (c.error) { errors++; console.log(c.cell, "ERROR", c.error); continue; }
    if (c.allOn) on++;
    console.log(c.cell, c.allOn ? "on" : "OFF", c.steps.map((s) => `${s.tag}: plate ${b(s.visible)} paint ${b(s.paint)}${s.on ? "" : " <<"}`).join(" | "));
}
for (const r of readings) console.log("READING", JSON.stringify(r));
console.log(`VERDICT ${label} ${engineName} ${on}/${cells.length - errors} on, ${errors} errors`);
