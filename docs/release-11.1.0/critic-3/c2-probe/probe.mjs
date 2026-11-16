// Critic 2 probe: cells the lane and fix witnesses do not hold.
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/critic-2/probe/harness/index.html";
const cells = [];
const rec = (item, cell, detail) => cells.push({ item, cell, detail });

function wk2287() {
    const p = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
    return existsSync(p) ? p : undefined;
}
async function open(browser, { width, height = 900, theme = "light", scene, q = "", touch = false }) {
    const context = await browser.newContext({ viewport: { width, height }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium" });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}${q}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    return { context, page };
}
async function shot(page, box, name, pad = 8) {
    if (!box) return;
    const vp = page.viewportSize();
    const x = Math.max(0, box.x - pad), y = Math.max(0, box.y - pad);
    await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip: { x, y, width: Math.min(box.width + 2 * pad, vp.width - x), height: Math.min(box.height + 2 * pad, vp.height - y) } });
}
async function cell(item, name, fn) {
    try { await fn(); } catch (e) { rec(item, name, { error: String(e).slice(0, 400) }); }
}
const ringsIn = () => {
    const rows = [...document.querySelectorAll('[data-slot="select-content"] [data-probe="row"]')];
    return rows.map((el) => {
        const cs = getComputedStyle(el);
        return { text: el.textContent.trim().slice(0, 12), focused: el === document.activeElement, highlighted: el.hasAttribute("data-highlighted"), ring: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0 };
    }).filter((r) => r.focused || r.highlighted || r.ring);
};

const browser = await engine.launch(engineName === "webkit" && wk2287() ? { executablePath: wk2287() } : {});
try {
    // A. The Collapsible's content as the consumer's own grid or flex container with a
    //    gap, no --collapsible-gap set: where the children sit inside the content.
    for (const layout of ["block", "grid", "grid2", "flex", "row"]) {
        await cell("Collapsible layout", `390-${layout}`, async () => {
            const { context, page } = await open(browser, { width: 390, scene: "collapsible", q: `&layout=${layout}` });
            try {
                await page.waitForTimeout(700);
                const r = await page.evaluate(() => {
                    const c = document.querySelector('[data-probe="content"]');
                    const cr = c.getBoundingClientRect();
                    const kids = [1, 2, 3, 4].map((i) => { const k = document.querySelector(`[data-probe="c${i}"]`).getBoundingClientRect(); return [+(k.left - cr.left).toFixed(1), +(k.top - cr.top).toFixed(1), +k.width.toFixed(1)]; });
                    const before = getComputedStyle(c, "::before");
                    return { contentHeight: +cr.height.toFixed(1), kids, before: { content: before.content, display: before.display, height: before.height } };
                });
                rec("Collapsible layout", `390-${layout}`, r);
                await shot(page, await page.locator('[data-probe="croot"]').boundingBox(), `collapsible-${layout}`);
            } finally { await context.close(); }
        });
    }

    // B. The Select's ring across a sequence of opens.
    for (const width of [390, 1440]) {
        await cell("Select ring sequence", `${width}`, async () => {
            const { context, page } = await open(browser, { width, scene: "select" });
            try {
                const out = {};
                await page.click('[data-probe="trigger"]');
                await page.waitForTimeout(700);
                out.pointerOpen = await page.evaluate(ringsIn);
                await page.keyboard.press("ArrowDown");
                await page.waitForTimeout(250);
                out.afterArrowDown = await page.evaluate(ringsIn);
                await page.keyboard.press("Escape");
                await page.waitForTimeout(700);
                await page.locator('[data-probe="trigger"]').focus();
                await page.keyboard.press("Enter");
                await page.waitForTimeout(700);
                out.keyboardOpenAfterPointer = await page.evaluate(ringsIn);
                await page.keyboard.press("Escape");
                await page.waitForTimeout(700);
                await page.click('[data-probe="trigger"]');
                await page.waitForTimeout(700);
                out.pointerOpenAfterKeyboard = await page.evaluate(ringsIn);
                rec("Select ring sequence", `${width}`, out);
            } finally { await context.close(); }
        });
    }
    await cell("Select ring sequence", "390-touch", async () => {
        const { context, page } = await open(browser, { width: 390, scene: "select", touch: true });
        try {
            await page.tap('[data-probe="trigger"]');
            await page.waitForTimeout(900);
            rec("Select ring sequence", "390-touch", { tapOpen: await page.evaluate(ringsIn), form: await page.evaluate(() => document.querySelector('[data-slot="select-content"]')?.getAttribute("data-form") ?? null) });
        } finally { await context.close(); }
    });

    // C. A Table inside a Dialog, a side Sheet and a Popover.
    for (const host of ["dialog", "sheet", "popover"]) for (const theme of ["light", "dark"]) {
        await cell("Table host", `1440-${host}-${theme}`, async () => {
            const { context, page } = await open(browser, { width: 1440, theme, scene: "tablehost", q: `&host=${host}` });
            try {
                await page.waitForTimeout(900);
                const r = await page.evaluate(() => {
                    const c = document.querySelector('[data-probe="host-table"] .table-container, [data-probe="host-table"] [data-slot="table-container"]');
                    if (!c) return null;
                    const cs = getComputedStyle(c);
                    const tiers = [];
                    for (let n = c.parentElement; n; n = n.parentElement) for (const k of n.classList) if (/^glass-(wash|quiet|resting|floating|overlay)$/.test(k)) tiers.push(`${n.getAttribute("data-slot") ?? n.tagName.toLowerCase()}.${k}`);
                    return { background: cs.backgroundColor, shadow: cs.boxShadow, radius: cs.borderTopLeftRadius, overflow: cs.overflow, tiers };
                });
                rec("Table host", `1440-${host}-${theme}`, r);
                const box = await page.locator('[data-probe="host-table"]').boundingBox();
                await shot(page, box, `tablehost-${host}-${theme}`, 28);
            } finally { await context.close(); }
        });
    }

    // D. A submenu's inline size and its rows.
    for (const width of [390, 1440]) {
        await cell("Submenu bound", `${width}`, async () => {
            const { context, page } = await open(browser, { width, scene: "menu" });
            try {
                await page.click('[data-probe="mtrig"]');
                await page.waitForTimeout(700);
                await page.locator('[data-probe="subtrig"]').focus();
                await page.keyboard.press("ArrowRight");
                await page.waitForTimeout(900);
                const r = await page.evaluate(() => {
                    const box = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [+b.left.toFixed(1), +b.top.toFixed(1), +b.width.toFixed(1), +b.height.toFixed(1)]; };
                    const menu = document.querySelector('[data-probe="menu"]');
                    const sub = document.querySelector('[data-probe="submenu"]');
                    const rows = [...document.querySelectorAll('[data-probe="subrow"]')].map((el) => ({ box: box(el), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
                    const cs = sub && getComputedStyle(sub);
                    return { clientWidth: document.documentElement.clientWidth, menu: box(menu), sub: box(sub), maxInline: cs?.maxInlineSize, avail: cs?.getPropertyValue("--reka-popper-available-width"), anchor: cs?.getPropertyValue("--reka-popper-anchor-width"), rows };
                });
                rec("Submenu bound", `${width}`, r);
                await page.screenshot({ path: join(pngDir, `${label}-${engineName}-submenu-${width}.png`), clip: { x: 0, y: 60, width: Math.min(width, 700), height: 260 } });
            } finally { await context.close(); }
        });
    }

    // F. A SegmentedTabs strip on the page and inside a GlassDock, fine and coarse: the
    //    tab, indicator and strip boxes and radii, and the dock's plate around the strip.
    for (const touch of [false, true]) for (const theme of ["light", "dark"]) {
        const name = `390-${touch ? "coarse" : "fine"}-${theme}`;
        await cell("Tabs in a dock", name, async () => {
            const { context, page } = await open(browser, { width: 390, theme, scene: "docktabs", touch });
            try {
                await page.waitForTimeout(600);
                const r = await page.evaluate(() => {
                    const box = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [+b.left.toFixed(1), +b.top.toFixed(1), +b.width.toFixed(1), +b.height.toFixed(1)]; };
                    const read = (host) => {
                        const root = document.querySelector(`[data-probe="${host}"]`);
                        const tab = root.querySelector(".segmented-tab");
                        const ind = root.querySelector(".segmented-indicator");
                        const strip = tab?.closest('[role="tablist"]') ?? tab?.parentElement;
                        return { tab: box(tab), tabRadius: tab && getComputedStyle(tab).borderTopLeftRadius, indicator: box(ind), indicatorRadius: ind && getComputedStyle(ind).borderTopLeftRadius, strip: box(strip), stripRadius: strip && getComputedStyle(strip).borderTopLeftRadius };
                    };
                    const dock = document.querySelector('[data-probe="dock-host"] .glass-dock');
                    const plate = document.querySelector('[data-probe="dock-host"] .dock-plate');
                    return { coarse: matchMedia("(pointer: coarse)").matches, page: read("page-strip"), dock: read("dock-host"), dockBox: box(dock), plateBox: box(plate), seat: box(document.querySelector('[data-probe="seat"]')) };
                });
                rec("Tabs in a dock", name, r);
                await shot(page, await page.locator('[data-probe="page-strip"]').boundingBox(), `tabs-page-${touch ? "coarse" : "fine"}-${theme}`);
                await shot(page, await page.locator('[data-probe="dock-host"]').boundingBox(), `tabs-dock-${touch ? "coarse" : "fine"}-${theme}`, 14);
            } finally { await context.close(); }
        });
    }

    // G. A controlled Slider whose consumer clamps at 60: after each key step, the value
    //    the thumb announces and paints against the model the consumer holds.
    for (const mode of ["reject", "clamp"]) await cell("Slider controlled", `390-${mode}`, async () => {
        const { context, page } = await open(browser, { width: 390, scene: "slider", q: `&mode=${mode}` });
        try {
            const read = () => page.evaluate(() => {
                const thumb = document.querySelector('[data-probe="slider"] [role="slider"], [role="slider"]');
                const track = thumb.closest('[data-slot="slider"]') ?? document.querySelector('[data-probe="slider"]');
                const tr = track.getBoundingClientRect(), th = thumb.getBoundingClientRect();
                return { model: window.__model(), ariaValueNow: thumb.getAttribute("aria-valuenow"), thumbAt: +(((th.left + th.width / 2) - tr.left) / tr.width).toFixed(3) };
            });
            const out = { initial: await read() };
            await page.locator('[role="slider"]').focus();
            for (const key of ["ArrowRight", "ArrowRight", "ArrowRight", "End"]) {
                await page.keyboard.press(key);
                await page.waitForTimeout(250);
                out[`after${key}${Object.keys(out).length}`] = await read();
            }
            rec("Slider controlled", `390-${mode}`, out);
            await shot(page, await page.locator('[data-probe="slider"]').boundingBox(), `slider-${mode}`, 16);
        } finally { await context.close(); }
    });

    // E. The root tempo a JS spring reads, after the page changes it three ways. The CSS
    //    clocks follow the cascade in every case; the reading is what the JS half takes.
    await cell("Root tempo", "1440", async () => {
        const { context, page } = await open(browser, { width: 1440, scene: "tempo" });
        try {
            const out = {};
            const css = () => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--motion-tempo").trim());
            out.initial = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            // 1. an inline style on <html>
            await page.evaluate(() => document.documentElement.style.setProperty("--motion-tempo", "0.5"));
            await page.waitForTimeout(100);
            out.inlineStyle = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            await page.evaluate(() => document.documentElement.style.removeProperty("--motion-tempo"));
            await page.waitForTimeout(100);
            out.reset = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            // 2. a rule added to a sheet already in the page (CSSOM insertRule)
            await page.evaluate(() => {
                const el = document.createElement("style");
                el.id = "consumer-sheet";
                document.head.append(el);
            });
            await page.waitForTimeout(100);
            await page.evaluate(() => window.__tempo());
            await page.evaluate(() => document.getElementById("consumer-sheet").sheet.insertRule(":root { --motion-tempo: 0.6 }"));
            await page.waitForTimeout(100);
            out.insertRule = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            // 3. a width media query the consumer keys the tempo on
            await page.evaluate(() => {
                const sheet = document.getElementById("consumer-sheet").sheet;
                sheet.deleteRule(0);
            });
            await page.evaluate(() => {
                const el = document.createElement("style");
                el.textContent = "@media (max-width: 600px) { :root { --motion-tempo: 0.7 } }";
                document.head.append(el);
            });
            await page.waitForTimeout(100);
            out.beforeResize = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            await page.setViewportSize({ width: 390, height: 900 });
            await page.waitForTimeout(300);
            out.afterResize = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            // 4. a stylesheet that finishes loading after a spring was built (a lazily
            //    loaded route's CSS): the link is appended, a spring reads the tempo in
            //    the same task, and the sheet arrives a moment later.
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.waitForTimeout(200);
            out.beforeLink = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            out.atAppend = await page.evaluate(() => {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "data:text/css," + encodeURIComponent(":root { --motion-tempo: 0.8 }");
                window.__linkLoaded = new Promise((r) => link.addEventListener("load", r));
                document.head.append(link);
                return { js: window.__tempo() };
            });
            await page.evaluate(() => window.__linkLoaded);
            await page.waitForTimeout(200);
            out.afterLinkLoad = { js: await page.evaluate(() => window.__tempo()), css: await css() };
            rec("Root tempo", "1440", out);
        } finally { await context.close(); }
    });
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
console.log(label, engineName, cells.length, "cells", cells.filter((c) => c.detail?.error).length, "errors");
