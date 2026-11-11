// Critic 3 probe: readings only; the critique judges them against the v11.0.0 run.
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
const PATH = "/docs/release-11.1.0/critic-3/probe/harness/index.html";
const cells = [];
const rec = (item, cell, detail) => cells.push({ item, cell, detail });

function wk2287() {
    const p = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
    return existsSync(p) ? p : undefined;
}
async function open(browser, { width, height = 900, theme = "light", scene, q = "", touch = false, reduced = false }) {
    const context = await browser.newContext({ viewport: { width, height }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium", reducedMotion: reduced ? "reduce" : "no-preference" });
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
const readContent = () => {
    const c = document.querySelector('[data-probe="content"]');
    const cr = c.getBoundingClientRect(), k = document.querySelector('[data-probe="c1"]').getBoundingClientRect();
    const cs = getComputedStyle(c);
    return { content: [+cr.width.toFixed(1), +cr.height.toFixed(1)], first: [+(k.left - cr.left).toFixed(1), +(k.top - cr.top).toFixed(1)], padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft], boxSizing: cs.boxSizing, root: +document.querySelector('[data-probe="croot"]').getBoundingClientRect().height.toFixed(1) };
};
// Hold the region's own animation at its first instant or its last and read the root.
const hold = (page, sel, rootSel, at) => page.evaluate(async ([sel, rootSel, at]) => {
    const content = () => document.querySelector(sel);
    let anims = [];
    for (let i = 0; i < 120 && !anims.length; i++) { await new Promise((r) => requestAnimationFrame(r)); anims = content()?.getAnimations() ?? []; }
    if (!anims.length) return { error: "no animation" };
    const a = anims[0];
    a.pause();
    const end = a.effect.getComputedTiming().endTime;
    a.currentTime = at === "start" ? 0 : end - 0.5;
    const c = content();
    const out = { name: a.animationName, duration: end, root: +document.querySelector(rootSel).getBoundingClientRect().height.toFixed(2), content: +c.getBoundingClientRect().height.toFixed(2), paddingTop: getComputedStyle(c).paddingTop, paddingBottom: getComputedStyle(c).paddingBottom };
    for (const x of anims) x.finish();
    return out;
}, [sel, rootSel, at]);
const rootH = (page, sel) => page.evaluate((sel) => +document.querySelector(sel).getBoundingClientRect().height.toFixed(2), sel);

const browser = await engine.launch(engineName === "webkit" && wk2287() ? { executablePath: wk2287() } : {});
try {
    // A. A consumer's own padding on the content, written three ways, gap unset and 12 px.
    for (const cls of ["", "pad-plain", "pad-base", "pad-components", "p-4", "pad-plain sized"]) for (const gap of ["", "12"]) {
        const name = `390-${cls.replace(/ /g, "+") || "none"}-gap${gap || "0"}`;
        await cell("Collapsible padding", name, async () => {
            const { context, page } = await open(browser, { width: 390, scene: "collapsible", q: `&cls=${encodeURIComponent(cls)}${gap ? `&gap=${gap}` : ""}` });
            try {
                await page.waitForTimeout(700);
                rec("Collapsible padding", name, await page.evaluate(readContent));
                if (cls === "pad-base" || cls === "pad-plain") await shot(page, await page.locator('[data-probe="croot"]').boundingBox(), `collapsible-${name}`);
            } finally { await context.close(); }
        });
    }
    for (const theme of ["light", "dark"]) await cell("Collapsible padding", `1440-pad-base-gap0-${theme}`, async () => {
        const { context, page } = await open(browser, { width: 1440, theme, scene: "collapsible", q: "&cls=pad-base" });
        try {
            await page.waitForTimeout(700);
            rec("Collapsible padding", `1440-pad-base-gap0-${theme}`, await page.evaluate(readContent));
            await shot(page, await page.locator('[data-probe="croot"]').boundingBox(), `collapsible-1440-pad-base-gap0-${theme}`);
        } finally { await context.close(); }
    });

    // B. First open frame and last close frame with the consumer's padding, and under reduced motion.
    for (const width of [390, 1440]) await cell("Collapsible frames padded", `${width}`, async () => {
        const { context, page } = await open(browser, { width, scene: "collapsible", q: "&cls=pad-plain&closed=1" });
        try {
            const closed = await rootH(page, '[data-probe="croot"]');
            await page.click('[data-probe="ctrig"]');
            const first = await hold(page, '[data-probe="content"]', '[data-probe="croot"]', "start");
            await page.waitForTimeout(700);
            const opened = await rootH(page, '[data-probe="croot"]');
            await page.click('[data-probe="ctrig"]');
            const last = await hold(page, '[data-probe="content"]', '[data-probe="croot"]', "end");
            await page.waitForTimeout(700);
            rec("Collapsible frames padded", `${width}`, { closed, first, opened, last, closedAfter: await rootH(page, '[data-probe="croot"]') });
        } finally { await context.close(); }
    });
    await cell("Collapsible reduced motion", "390", async () => {
        const { context, page } = await open(browser, { width: 390, scene: "collapsible", q: "&gap=12&closed=1", reduced: true });
        try {
            const closed = await rootH(page, '[data-probe="croot"]');
            await page.click('[data-probe="ctrig"]');
            await page.waitForTimeout(80);
            const at80 = await rootH(page, '[data-probe="croot"]');
            await page.waitForTimeout(700);
            const opened = await rootH(page, '[data-probe="croot"]');
            const dur = await page.evaluate(() => getComputedStyle(document.querySelector('[data-probe="content"]')).animationDuration);
            rec("Collapsible reduced motion", "390", { closed, at80, opened, animationDuration: dur });
        } finally { await context.close(); }
    });

    // C. The Accordion (it shares the keyframes and the border-box rule): rest and frames.
    for (const [width, theme] of [[390, "light"], [390, "dark"], [1440, "light"], [1440, "dark"]]) await cell("Accordion rest", `${width}-${theme}`, async () => {
        const { context, page } = await open(browser, { width, theme, scene: "accordion" });
        try {
            await page.waitForTimeout(700);
            rec("Accordion rest", `${width}-${theme}`, await page.evaluate(() => {
                const c = document.querySelector('[data-slot="accordion-content"]'), cr = c.getBoundingClientRect(), k = document.querySelector('[data-probe="a1"]').getBoundingClientRect();
                return { content: [+cr.width.toFixed(1), +cr.height.toFixed(1)], first: [+(k.left - cr.left).toFixed(1), +(k.top - cr.top).toFixed(1)], root: +document.querySelector('[data-probe="aroot"]').getBoundingClientRect().height.toFixed(1), boxSizing: getComputedStyle(c).boxSizing };
            }));
            await shot(page, await page.locator('[data-probe="aroot"]').boundingBox(), `accordion-${width}-${theme}`);
        } finally { await context.close(); }
    });
    await cell("Accordion frames", "390", async () => {
        const { context, page } = await open(browser, { width: 390, scene: "accordion", q: "&closed=1" });
        try {
            const closed = await rootH(page, '[data-probe="aroot"]');
            await page.click('[data-probe="atrig"]');
            const first = await hold(page, '[data-slot="accordion-content"]', '[data-probe="aroot"]', "start");
            await page.waitForTimeout(700);
            const opened = await rootH(page, '[data-probe="aroot"]');
            await page.click('[data-probe="atrig"]');
            const last = await hold(page, '[data-slot="accordion-content"]', '[data-probe="aroot"]', "end");
            await page.waitForTimeout(700);
            rec("Accordion frames", "390", { closed, first, opened, last, closedAfter: await rootH(page, '[data-probe="aroot"]') });
        } finally { await context.close(); }
    });

    // D. The Slider under four more consumers.
    const readSlider = (page) => page.evaluate(() => {
        const thumbs = [...document.querySelectorAll('[role="slider"]')];
        const tr = document.querySelector('[data-probe="slider"]').getBoundingClientRect();
        return { model: window.__model?.(), aria: thumbs.map((t) => t.getAttribute("aria-valuenow")), thumbAt: thumbs.map((t) => { const r = t.getBoundingClientRect(); return +(((r.left + r.width / 2) - tr.left) / tr.width).toFixed(3); }), seen: window.__seen?.().length };
    });
    for (const mode of ["slow", "uncontrolled", "range"]) await cell("Slider keys", `390-${mode}`, async () => {
        const { context, page } = await open(browser, { width: 390, scene: "slider", q: `&mode=${mode}` });
        try {
            const steps = [["initial", await readSlider(page)]];
            await page.locator('[role="slider"]').last().focus();
            for (const key of ["ArrowRight", "ArrowRight", "ArrowLeft", "Home"]) {
                await page.keyboard.press(key);
                await page.waitForTimeout(20);
                const soon = await readSlider(page);
                await page.waitForTimeout(350);
                steps.push([key, { soon, settled: await readSlider(page) }]);
            }
            rec("Slider keys", `390-${mode}`, { steps });
        } finally { await context.close(); }
    });
    for (const width of [390, 1440]) await cell("Slider pointer past a declined value", `${width}`, async () => {
        const { context, page } = await open(browser, { width, scene: "slider", q: "&mode=reject" });
        try {
            const tb = await page.locator('[role="slider"]').boundingBox(), sb = await page.locator('[data-probe="slider"]').boundingBox();
            await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2);
            await page.mouse.down();
            await page.mouse.move(sb.x + sb.width * 0.8, tb.y + tb.height / 2, { steps: 8 });
            await page.mouse.move(sb.x + sb.width - 2, tb.y + tb.height / 2, { steps: 8 });
            await page.waitForTimeout(200);
            const held = await readSlider(page);
            await shot(page, sb, `slider-${width}-held`, 16);
            await page.mouse.up();
            await page.waitForTimeout(400);
            const released = await readSlider(page);
            await shot(page, sb, `slider-${width}-released`, 16);
            await page.locator('[role="slider"]').focus();
            await page.keyboard.press("ArrowLeft");
            await page.waitForTimeout(300);
            rec("Slider pointer past a declined value", `${width}`, { held, released, afterArrowLeft: await readSlider(page) });
        } finally { await context.close(); }
    });

    // E. The tempo inside one synchronous run, and across a microtask.
    await cell("Tempo in one run", "1440", async () => {
        const { context, page } = await open(browser, { width: 1440, scene: "tempo" });
        try {
            rec("Tempo in one run", "1440", await page.evaluate(async () => {
                const el = document.createElement("style"); document.head.append(el);
                await new Promise((r) => setTimeout(r, 50));
                const before = window.__tempo();
                el.sheet.insertRule(":root { --motion-tempo: 0.6 }");
                const sameRun = window.__tempo();
                const css = getComputedStyle(document.documentElement).getPropertyValue("--motion-tempo").trim();
                await Promise.resolve();
                const afterMicrotask = window.__tempo();
                document.documentElement.classList.add("x-critic");
                return { before, sameRun, css, afterMicrotask };
            }));
        } finally { await context.close(); }
    });

    // F. The tab strip's arms under a coarse pointer, in paint.
    for (const [width, orientation, touch, theme] of [[390, "horizontal", true, "light"], [390, "horizontal", true, "dark"], [1440, "horizontal", true, "light"], [1440, "horizontal", true, "dark"], [390, "horizontal", false, "light"], [390, "vertical", true, "light"], [390, "vertical", false, "light"], [1440, "vertical", true, "dark"]]) {
        const name = `${width}-${orientation}-${touch ? "coarse" : "fine"}-${theme}`;
        await cell("Tabs arms", name, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "tabs", touch, q: `&orientation=${orientation}` });
            try {
                await page.waitForTimeout(600);
                rec("Tabs arms", name, await page.evaluate(() => {
                    const root = document.querySelector('[data-probe="strip"]');
                    const part = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), r: parseFloat(getComputedStyle(el).borderTopLeftRadius) }; };
                    return { coarse: matchMedia("(pointer: coarse)").matches, tab: part(root.querySelector(".segmented-tab")), indicator: part(root.querySelector(".segmented-indicator")), strip: part(root.querySelector(".segmented-tabs")) };
                }));
                await shot(page, await page.locator('[data-probe="strip"] .segmented-tabs').boundingBox(), `tabs-${name}`, 12);
            } finally { await context.close(); }
        });
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
console.log(label, engineName, cells.length, "cells", cells.filter((c) => c.detail?.error).length, "errors");
