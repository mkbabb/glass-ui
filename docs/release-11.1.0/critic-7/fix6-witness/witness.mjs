// Fix 6 witness: the dock's run mark and a glyph control's plate (critique 5, findings 1-3).
//   one-*    a current glyph control with `active` as well as `aria-current` paints what the
//            same control with `aria-current` alone paints: the plate's box (magenta) and
//            four pixels in the library's colours (14 px in, 7/7 px in, 2 px in, a third along)
//   dir-*    after `dir="rtl"` on a live page, and back to "ltr", the plate (magenta) is on the
//            current control's plate box, glyph and tab controls
//   plate-*  one plate box on a glyph control: `active` (magenta), hovered (flat green),
//            `active` and hovered, and the run's mark on an `aria-current` control (the open,
//            wider seat: the same height, on that control's clip box); a pressed control keeps
//            the face's clip (computed style)
// Every cell is a pass or a fail.
//   node witness.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const ONLY = (process.env.ONLY ?? "").split(",").filter(Boolean);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/critic-7/fix6-witness/harness/index.html";
const cells = [];
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

async function shot(page, name) {
    const nav = await page.locator('[data-probe="nav"]').boundingBox();
    const vp = page.viewportSize();
    const x = Math.max(0, nav.x - 8), y = Math.max(0, nav.y - 8);
    const clip = { x, y, width: Math.min(nav.width + 16, vp.width - x), height: Math.min(nav.height + 16, vp.height - y) };
    return { clip, png: PNG.sync.read(await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip })) };
}
const MAGENTA = (r, g, b) => r > 200 && b > 200 && g < 90;
const GREEN = (r, g, b) => g > 150 && r < 90 && b < 90;
async function boxOf(page, name, is = MAGENTA) {
    const { clip, png } = await shot(page, name);
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        if (is(png.data[i], png.data[i + 1], png.data[i + 2])) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return x1 < 0 ? null : { x: +(x0 + clip.x).toFixed(1), y: +(y0 + clip.y).toFixed(1), w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
async function pixels(page, name, pts) {
    const { clip, png } = await shot(page, name);
    return pts.map(([x, y]) => { const i = (Math.round(y - clip.y) * png.width + Math.round(x - clip.x)) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; });
}
// The current control's plate box on screen: its background-clip box.
const plateRead = () => {
    const s = document.querySelector('[aria-current="page"]');
    if (!s) return null;
    const r = s.getBoundingClientRect(), cs = getComputedStyle(s);
    const p = cs.backgroundClip === "content-box" ? [cs.paddingLeft, cs.paddingTop, cs.paddingRight, cs.paddingBottom].map(parseFloat) : [0, 0, 0, 0];
    return { x: +(r.left + p[0]).toFixed(1), y: +(r.top + p[1]).toFixed(1), w: +(r.width - p[0] - p[2]).toFixed(1), h: +(r.height - p[1] - p[3]).toFixed(1), clip: cs.backgroundClip };
};
const near = (a, b, tol = 1.5) => !!a && !!b && ["x", "y", "w", "h"].every((k) => Math.abs(a[k] - b[k]) <= tol);
const sameSize = (a, b, tol = 1) => !!a && !!b && Math.abs(a.w - b.w) <= tol && Math.abs(a.h - b.h) <= tol;
const d = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
async function open(page, how) {
    await page.goto(`${base}${PATH}?${how}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
}
const ctx = (width, theme) => browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "no-preference" });
async function cell(name, opts, body) {
    if (ONLY.length && !ONLY.some((o) => name.startsWith(o))) return;
    const context = await ctx(...opts);
    try { const page = await context.newPage(); cells.push({ cell: name, ...(await body(page)) }); }
    catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300), ok: false }); }
    finally { await context.close(); }
}

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        // 1. `active` with `aria-current`: the same plate as `aria-current` alone.
        await cell(`one-${width}-${theme}`, [width, theme], async (page) => {
            const out = {};
            for (const both of [0, 1]) {
                const key = both ? "activeAndCurrent" : "currentOnly";
                await open(page, `scene=nav&theme=${theme}&shape=icon&plain=1&both=${both}`);
                const pts = await page.evaluate(() => { const r = document.querySelector('[data-tab="1"]').getBoundingClientRect(); return [[r.left + 14, r.top + r.height / 2], [r.left + 7, r.top + 7], [r.left + 2, r.top + r.height / 2], [r.left + r.width / 3, r.top + r.height / 2]]; });
                const px = await pixels(page, `one-${width}-${theme}-both${both}-plain`, pts);
                await open(page, `scene=nav&theme=${theme}&shape=icon&both=${both}`);
                out[key] = { px, box: await boxOf(page, `one-${width}-${theme}-both${both}-magenta`) };
            }
            const a = out.currentOnly, b = out.activeAndCurrent;
            const pxSame = a.px.every((p, i) => d(p, b.px[i]) <= 3);
            return { ...out, pxSame, boxSame: near(a.box, b.box, 1), ok: pxSame && near(a.box, b.box, 1) };
        });
        // 2. A runtime change of direction, and back.
        for (const shape of ["icon", "tab"]) await cell(`dir-${shape}-${width}-${theme}`, [width, theme], async (page) => {
            await open(page, `scene=nav&theme=${theme}&shape=${shape}`);
            const steps = [];
            for (const dir of ["ltr", "rtl", "ltr"]) {
                if (steps.length) { await page.evaluate((v) => window.__dir(v), dir); await page.waitForTimeout(1500); }
                const plate = await page.evaluate(plateRead);
                const paint = await boxOf(page, `dir-${shape}-${width}-${theme}-${steps.length}-${dir}`);
                steps.push({ dir, plate, paint, ok: near(paint, plate) });
            }
            return { steps, ok: steps.every((s) => s.ok) };
        });
        // 3. One plate box on a glyph control.
        await cell(`plate-${width}-${theme}`, [width, theme], async (page) => {
            await open(page, `scene=nav&theme=${theme}&shape=icon&act=1&flat=1&press=1`);
            const active = await boxOf(page, `plate-${width}-${theme}-active`);
            const centre = (i) => page.evaluate((i) => { const r = document.querySelector(`[data-tab="${i}"]`).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, i);
            const [hx, hy] = await centre(3);
            await page.mouse.move(hx, hy); await page.waitForTimeout(700);
            const hover = await boxOf(page, `plate-${width}-${theme}-hover`, GREEN);
            await page.mouse.down(); await page.waitForTimeout(250);
            const pressClip = await page.evaluate(() => { const cs = getComputedStyle(document.querySelector('[data-tab="3"]')); return { clip: cs.backgroundClip, bg: cs.backgroundColor }; });
            await page.mouse.up();
            const [ax, ay] = await centre(1);
            await page.mouse.move(ax, ay); await page.waitForTimeout(700);
            const activeHover = await boxOf(page, `plate-${width}-${theme}-active-hover`, GREEN);
            await page.mouse.move(5, 700); await page.waitForTimeout(300);
            await open(page, `scene=nav&theme=${theme}&shape=icon`);
            // The current control is the open (wider) seat, so the mark shares the plate's
            // height and inset, and lies on that control's clip box.
            const mark = await boxOf(page, `plate-${width}-${theme}-mark`);
            const markPlate = await page.evaluate(plateRead);
            const ok = sameSize(active, hover) && sameSize(active, activeHover) && !!mark && Math.abs(mark.h - active.h) <= 1 && near(mark, markPlate) && pressClip.clip === "content-box";
            return { active, hover, activeHover, mark, markPlate, pressClip, ok };
        });
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}${ONLY.length ? "-" + ONLY.join("+") : ""}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
const b = (o) => (o ? `${o.x},${o.y} ${o.w}x${o.h}` : "none");
for (const c of cells) {
    if (c.error) console.log(c.cell, "FAIL ERROR", c.error);
    else if (c.steps) console.log(c.cell, c.ok ? "PASS" : "FAIL", c.steps.map((s) => `${s.dir}: plate ${b(s.plate)} paint ${b(s.paint)}${s.ok ? "" : " <<"}`).join(" | "));
    else if (c.currentOnly) console.log(c.cell, c.ok ? "PASS" : "FAIL", `current ${b(c.currentOnly.box)} ${JSON.stringify(c.currentOnly.px)} | both ${b(c.activeAndCurrent.box)} ${JSON.stringify(c.activeAndCurrent.px)}`);
    else console.log(c.cell, c.ok ? "PASS" : "FAIL", `active ${b(c.active)} hover ${b(c.hover)} activeHover ${b(c.activeHover)} mark ${b(c.mark)} press ${JSON.stringify(c.pressClip)}`);
}
console.log(label, engineName, `${cells.filter((c) => c.ok).length}/${cells.length}`, "pass");
