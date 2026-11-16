// Critic 4 fourth probe: the run mark's size after a pointer activation, once the pointer
// has left. The third probe read the mark 8 px larger on each axis after a click on a glyph
// seat than after a keyboard activation. Here the selected plate is painted magenta (the
// second probe's `nav` scene) and measured from the screenshot on both trees, so the
// branch's mark is read against v11.0.0's own selected plate, by pixels, not by the
// composable's variables.
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
const PATH = "/docs/release-11.1.0/critic-4/probe4/harness/index.html";
const cells = [];
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

async function magenta(page, name) {
    const nav = await page.locator('[data-probe="nav"]').boundingBox();
    const vp = page.viewportSize();
    const clip = { x: Math.max(0, nav.x - 8), y: Math.max(0, nav.y - 8), width: Math.min(nav.width + 16, vp.width - Math.max(0, nav.x - 8)), height: nav.height + 16 };
    const png = PNG.sync.read(await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip }));
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        if (png.data[i] > 200 && png.data[i + 2] > 200 && png.data[i + 1] < 90) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return x1 < 0 ? null : { w: x1 - x0 + 1, h: y1 - y0 + 1, left: +(x0 + clip.x).toFixed(1), top: +(y0 + clip.y).toFixed(1) };
}
const seat = (i) => {
    const s = document.querySelector(`[data-tab="${i}"]`), r = s.getBoundingClientRect(), cs = getComputedStyle(s), run = document.querySelector(".dock-run");
    return { current: s.getAttribute("aria-current"), hover: s.matches(":hover"), focus: document.activeElement === s, bgClip: cs.backgroundClip, padding: cs.paddingLeft, cell: [+r.width.toFixed(1), +r.height.toFixed(1)], left: +r.left.toFixed(1), top: +r.top.toFixed(1), markVars: run ? [run.style.getPropertyValue("--dock-run-mark-w"), run.style.getPropertyValue("--dock-run-mark-h")] : null };
};

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    // A cure candidate, read as plain CSS on top of the branch: the glyph seat's hover rule sets its fill
    // with the `background` shorthand, which resets `background-clip` to `border-box`; the candidate
    // keeps the clip, so the seat's plate box is the same hovered or not.
    const CURE = '.glass-dock .dock-icon-button:hover { background-clip: content-box; }';
    const matrix = [];
    for (const [width, touch] of [[1440, false], [390, true], [390, false], [1440, true]]) for (const theme of ["light", "dark"]) for (const how of ["keyboard", "click-leave", "click-stay", "hover-then-script"]) matrix.push([width, touch, theme, how, false]);
    for (const [width, touch, theme] of [[1440, false, "light"], [390, true, "dark"], [1440, false, "dark"], [390, true, "light"]]) for (const how of ["click-leave", "click-stay", "hover-then-script"]) matrix.push([width, touch, theme, how, true]);
    for (const [width, touch, theme, how, cure] of matrix) {
        const name = `${cure ? "cure-" : ""}${width}-${touch ? "coarse" : "fine"}-${theme}-${how}`;
        const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium", reducedMotion: "no-preference" });
        try {
            const page = await context.newPage();
            await page.goto(`${base}${PATH}?scene=nav&theme=${theme}&shape=icon`, { waitUntil: "load" });
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
            await page.evaluate(() => document.fonts.ready);
            if (cure) await page.addStyleTag({ content: CURE });
            await page.waitForTimeout(900);
            const rest = { seat: await page.evaluate(seat, 1), plate: await magenta(page, `${name}-rest`) };
            const r = await page.evaluate(() => { const b = document.querySelector('[data-tab="0"]').getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; });
            if (how === "keyboard") { await page.evaluate(() => document.querySelector('[data-tab="0"]').focus()); await page.keyboard.press("Enter"); }
            else if (how === "hover-then-script") { if (touch) await page.touchscreen.tap(r[0], r[1] + 300); else await page.mouse.move(r[0], r[1]); await page.waitForTimeout(300); await page.evaluate(() => window.__select(0)); }
            else if (touch) await page.touchscreen.tap(r[0], r[1]);
            else { await page.mouse.move(r[0], r[1]); await page.mouse.down(); await page.waitForTimeout(90); await page.mouse.up(); }
            await page.waitForTimeout(2500);
            const settledSeat = await page.evaluate(seat, 0);
            if (how === "click-leave" || how === "hover-then-script") { if (touch) await page.touchscreen.tap(r[0], r[1] + 400); else await page.mouse.move(r[0], r[1] + 400, { steps: 4 }); await page.waitForTimeout(2500); }
            const after = { seat: await page.evaluate(seat, 0), plate: await magenta(page, `${name}-after`) };
            cells.push({ cell: name, rest, settledSeat, after });
        } catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); } finally { await context.close(); }
    }
    // In the library's own colours: does a glyph seat that carries only `aria-current` paint a selected plate?
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) for (const shape of ["icon", "tab"]) {
        const name = `natural-${width}-${theme}-${shape}`;
        const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "no-preference" });
        try {
            const page = await context.newPage();
            await page.goto(`${base}${PATH}?scene=nav&theme=${theme}&shape=${shape}&plain=1`, { waitUntil: "load" });
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(900);
            const nav = await page.locator('[data-probe="nav"]').boundingBox();
            const clip = { x: Math.max(0, nav.x - 8), y: Math.max(0, nav.y - 8), width: Math.min(nav.width + 16, width - Math.max(0, nav.x - 8)), height: nav.height + 16 };
            const png = PNG.sync.read(await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip }));
            const pts = await page.evaluate(() => [1, 2].map((i) => { const r = document.querySelector(`[data-tab="${i}"]`).getBoundingClientRect(); return [r.left + 14, r.top + r.height / 2]; }));
            const at = ([x, y]) => { const i = (Math.round(y - clip.y) * png.width + Math.round(x - clip.x)) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
            const current = at(pts[0]), other = at(pts[1]);
            cells.push({ cell: name, current, other, plate: Math.max(...current.map((v, i) => Math.abs(v - other[i]))) > 3 });
        } catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); } finally { await context.close(); }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
for (const c of cells) console.log(c.cell, c.error ?? (c.current ? `current seat ${c.current} other seat ${c.other} plate=${c.plate}` : null) ?? `rest plate ${c.rest.plate?.w}x${c.rest.plate?.h} | settled hover=${c.settledSeat.hover} clip=${c.settledSeat.bgClip} | after hover=${c.after.seat.hover} clip=${c.after.seat.bgClip} cell ${c.after.seat.cell} plate ${c.after.plate?.w}x${c.after.plate?.h} vars ${c.after.seat.markVars}`);
console.log(label, engineName, cells.length, "cells", cells.filter((c) => c.error).length, "errors");
