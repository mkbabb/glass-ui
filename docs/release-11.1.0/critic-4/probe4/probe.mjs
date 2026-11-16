// Critic 4 second probe: readings only; the critique judges them against the v11.0.0 run.
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
const rec = (item, cell, detail) => cells.push({ item, cell, detail });
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

async function open(browser, { width, height = 900, theme = "light", scene, q = "", touch = false, reduced = false }) {
    const context = await browser.newContext({ viewport: { width, height }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium", reducedMotion: reduced ? "reduce" : "no-preference" });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}${q}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    return { context, page };
}
async function cell(item, name, fn) {
    try { await fn(); } catch (e) { rec(item, name, { error: String(e).slice(0, 400) }); }
}
// The bounding box of near-magenta pixels in a full-viewport screenshot (CSS px at dpr 1).
async function magentaBox(page, name) {
    const buf = await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`) });
    const png = PNG.sync.read(buf);
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1, n = 0;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        const r = png.data[i], g = png.data[i + 1], b = png.data[i + 2];
        if (r > 200 && b > 200 && g < 90) { n++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return n ? { left: x0, top: y0, right: x1 + 1, bottom: y1 + 1, n } : null;
}
const seatBox = (page, i) => page.evaluate((i) => { const r = document.querySelector(`[data-tab="${i}"]`).getBoundingClientRect(); return { left: +r.left.toFixed(1), top: +r.top.toFixed(1), right: +r.right.toFixed(1), bottom: +r.bottom.toFixed(1) }; }, i);

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    // A. A Blob whose box ends at the viewport edge, or ends the page: does its wider paint scroll the page?
    for (const width of [390, 1440]) for (const at of ["edge", "last"]) for (const dir of ["ltr", "rtl"]) {
        const name = `${width}-${at}-${dir}`;
        await cell("Blob page scroll", name, async () => {
            const { context, page } = await open(browser, { width, scene: "blob", q: `&at=${at}&dir=${dir}` });
            try {
                await page.waitForTimeout(1500);
                rec("Blob page scroll", name, await page.evaluate(() => {
                    const d = document.documentElement, host = document.querySelector('[data-probe="blob-host"]').getBoundingClientRect();
                    const canvas = document.querySelector(".goo-blob-canvas")?.getBoundingClientRect();
                    window.scrollTo(10000, 100000);
                    return { scrollW: d.scrollWidth, clientW: d.clientWidth, scrollH: d.scrollHeight, clientH: d.clientHeight, scrolledTo: [window.scrollX, window.scrollY], host: [Math.round(host.left), Math.round(host.right), Math.round(host.bottom + window.scrollY)], canvas: canvas ? [Math.round(canvas.left), Math.round(canvas.right)] : null };
                }));
            } finally { await context.close(); }
        });
    }

    // B. The run mark in paint: right to left, vertical, and under reduced motion.
    for (const [width, dir, orientation, theme, reduced] of [[390, "ltr", "horizontal", "light", false], [390, "rtl", "horizontal", "light", false], [1440, "rtl", "horizontal", "dark", false], [390, "ltr", "vertical", "light", false], [1440, "rtl", "vertical", "dark", false], [390, "rtl", "horizontal", "light", true]]) {
        const name = `${width}-${dir}-${orientation}-${theme}${reduced ? "-reduced" : ""}`;
        await cell("Run mark", name, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "nav", reduced, q: `&dir=${dir}&orientation=${orientation}` });
            try {
                await page.waitForTimeout(900);
                const rest = { mark: await magentaBox(page, `mark-${name}-rest`), seat: await seatBox(page, 1) };
                await page.evaluate(() => window.__select(3));
                await page.waitForTimeout(reduced ? 60 : 120);
                const mid = { mark: await magentaBox(page, `mark-${name}-mid`), from: rest.seat, to: await seatBox(page, 3) };
                await page.waitForTimeout(1500);
                const settled = { mark: await magentaBox(page, `mark-${name}-settled`), seat: await seatBox(page, 3) };
                rec("Run mark", name, { rest, mid, settled, hasAttr: await page.evaluate(() => !!document.querySelector(".dock-run[data-run-mark]")) });
            } finally { await context.close(); }
        });
    }

    // C. A menu whose trigger ends at the viewport's far edge.
    for (const width of [390, 1440]) for (const align of ["start", "end"]) {
        const name = `${width}-${align}`;
        await cell("Menu at the edge", name, async () => {
            const { context, page } = await open(browser, { width, scene: "menu", q: `&align=${align}` });
            try {
                await page.click('[data-probe="mtrig"]');
                await page.waitForTimeout(1200);
                rec("Menu at the edge", name, await page.evaluate(() => {
                    const m = document.querySelector('[data-probe="menu"]'); if (!m) return { error: "no menu" };
                    const r = m.getBoundingClientRect(), t = document.querySelector('[data-probe="mtrig"]').getBoundingClientRect(), cs = getComputedStyle(m);
                    const row = m.querySelector('[role="menuitem"]');
                    return { menu: [+r.left.toFixed(1), +r.right.toFixed(1), +r.width.toFixed(1)], trigger: [+t.left.toFixed(1), +t.right.toFixed(1)], maxInline: cs.maxInlineSize, minInline: cs.minInlineSize, rowScroll: row ? [row.scrollWidth, row.clientWidth] : null, viewport: document.documentElement.clientWidth };
                }));
                const box = await page.locator('[data-probe="menu"]').boundingBox();
                if (box) await page.screenshot({ path: join(pngDir, `${label}-${engineName}-menu-${name}.png`), clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 48), width: Math.min(box.width + 16, width - Math.max(0, box.x - 8)), height: box.height + 56 } });
            } finally { await context.close(); }
        });
    }

    // D. A Slider dragged vertically and right to left with the mouse.
    for (const [orientation, dir] of [["horizontal", "ltr"], ["horizontal", "rtl"], ["vertical", "ltr"]]) {
        const name = `${orientation}-${dir}`;
        await cell("Slider axes", name, async () => {
            const { context, page } = await open(browser, { width: 390, scene: "slider", q: `&orientation=${orientation}&dir=${dir}` });
            try {
                const box = await page.locator('[data-probe="slider"]').boundingBox();
                const thumb = await page.locator('[data-probe="slider"] [role="slider"]').boundingBox();
                const cx = thumb.x + thumb.width / 2, cy = thumb.y + thumb.height / 2;
                await page.mouse.move(cx, cy);
                await page.mouse.down();
                const [dx, dy] = orientation === "vertical" ? [0, -60] : [60, 0];
                for (let i = 1; i <= 12; i++) { await page.mouse.move(cx + (dx * i) / 12, cy + (dy * i) / 12); await page.waitForTimeout(16); }
                const held = await page.evaluate(() => ({ model: window.__model(), now: document.querySelector('[role="slider"]').getAttribute("aria-valuenow") }));
                await page.mouse.up();
                await page.waitForTimeout(300);
                const after = await page.evaluate(() => { const t = document.querySelector('[role="slider"]').getBoundingClientRect(); return { model: window.__model(), now: document.querySelector('[role="slider"]').getAttribute("aria-valuenow"), seen: window.__seen().length, lastSeen: window.__seen().at(-1), commits: window.__commits(), thumb: [+(t.left + t.width / 2).toFixed(1), +(t.top + t.height / 2).toFixed(1)] }; });
                rec("Slider axes", name, { box: [Math.round(box.width), Math.round(box.height)], start: [+cx.toFixed(1), +cy.toFixed(1)], hand: [+(cx + dx).toFixed(1), +(cy + dy).toFixed(1)], held, after });
            } finally { await context.close(); }
        });
    }

    // E. A Collapsible nested in one that sets the gap.
    await cell("Collapsible nested gap", "390", async () => {
        const { context, page } = await open(browser, { width: 390, scene: "nested" });
        try {
            await page.waitForTimeout(700);
            rec("Collapsible nested gap", "390", await page.evaluate(() => {
                const pt = (s) => getComputedStyle(document.querySelector(s)).paddingTop;
                const t = document.querySelector('[data-probe="inner-trig"]').getBoundingClientRect(), p = document.querySelector('[data-probe="inner-p"]').getBoundingClientRect();
                return { outerPaddingTop: pt('[data-probe="outer-content"]'), innerPaddingTop: pt('[data-probe="inner-content"]'), innerTriggerToBody: +(p.top - t.bottom).toFixed(1) };
            }));
        } finally { await context.close(); }
    });
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
console.log(label, engineName, cells.length, "cells", cells.filter((c) => c.detail?.error).length, "errors");
