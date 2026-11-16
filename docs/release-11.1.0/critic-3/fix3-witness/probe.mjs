// Fix 3 witness: readings for the four cures. judge.mjs turns them into verdicts.
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
const PATH = "/docs/release-11.1.0/fix-3/witness/harness/index.html";
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
const readKids = () => {
    const c = document.querySelector('[data-probe="content"]');
    const cr = c.getBoundingClientRect();
    const kids = [1, 2, 3, 4].map((i) => { const k = document.querySelector(`[data-probe="c${i}"]`).getBoundingClientRect(); return [+(k.left - cr.left).toFixed(1), +(k.top - cr.top).toFixed(1), +k.width.toFixed(1)]; });
    const before = getComputedStyle(c, "::before");
    return { contentHeight: +cr.height.toFixed(1), kids, paddingTop: getComputedStyle(c).paddingTop, before: { content: before.content, display: before.display } };
};

const browser = await engine.launch(engineName === "webkit" && wk2287() ? { executablePath: wk2287() } : {});
try {
    // A. The content as the consumer's own grid or flex container, --collapsible-gap unset.
    for (const layout of ["block", "grid", "grid2", "flex", "row"]) {
        await cell("Collapsible layout", `390-${layout}`, async () => {
            const { context, page } = await open(browser, { width: 390, scene: "collapsible", q: `&layout=${layout}` });
            try {
                await page.waitForTimeout(700);
                rec("Collapsible layout", `390-${layout}`, await page.evaluate(readKids));
                await shot(page, await page.locator('[data-probe="croot"]').boundingBox(), `collapsible-${layout}`);
            } finally { await context.close(); }
        });
    }

    // B. The same with --collapsible-gap: 12px. The gap sits above every first-row child.
    const gapCells = [["390", "light", "block"], ["390", "light", "grid"], ["390", "light", "flex"], ["390", "light", "grid2"], ["390", "dark", "grid2"], ["1440", "light", "grid2"], ["1440", "dark", "grid2"]];
    for (const [width, theme, layout] of gapCells) {
        const name = `${width}-${theme}-${layout}`;
        await cell("Collapsible gap", name, async () => {
            const { context, page } = await open(browser, { width: +width, theme, scene: "collapsible", q: `&layout=${layout}&gap=12` });
            try {
                await page.waitForTimeout(700);
                rec("Collapsible gap", name, await page.evaluate(readKids));
                await shot(page, await page.locator('[data-probe="croot"]').boundingBox(), `collapsible-gap-${name}`);
            } finally { await context.close(); }
        });
    }

    // C. The first open frame and the last close frame, gap 12px, grid content: the root
    //    is its closed height at both (no padding snap). The region's own animation is
    //    held at its first instant (open) and its last (close) and the root read there.
    for (const width of [390, 1440]) {
        await cell("Collapsible frames", `${width}`, async () => {
            const { context, page } = await open(browser, { width, scene: "collapsible", q: "&layout=grid&gap=12&closed=1" });
            try {
                const rootH = () => page.evaluate(() => +document.querySelector('[data-probe="croot"]').getBoundingClientRect().height.toFixed(2));
                const hold = (at) => page.evaluate(async (at) => {
                    const content = () => document.querySelector('[data-probe="content"]');
                    let anims = [];
                    for (let i = 0; i < 120 && !anims.length; i++) {
                        await new Promise((r) => requestAnimationFrame(r));
                        anims = content()?.getAnimations() ?? [];
                    }
                    if (!anims.length) return { error: "no animation" };
                    const a = anims[0];
                    a.pause();
                    const end = a.effect.getComputedTiming().endTime;
                    a.currentTime = at === "start" ? 0 : end - 0.5;
                    const c = content();
                    const out = { name: a.animationName, root: +document.querySelector('[data-probe="croot"]').getBoundingClientRect().height.toFixed(2), content: +c.getBoundingClientRect().height.toFixed(2), paddingTop: getComputedStyle(c).paddingTop };
                    for (const x of anims) x.finish();
                    return out;
                }, at);
                const closed = await rootH();
                await page.click('[data-probe="ctrig"]');
                const first = await hold("start");
                await page.waitForTimeout(600);
                const opened = await rootH();
                await page.click('[data-probe="ctrig"]');
                const last = await hold("end");
                await page.waitForTimeout(600);
                rec("Collapsible frames", `${width}`, { closed, first, opened, last, closedAfter: await rootH() });
            } finally { await context.close(); }
        });
    }

    // D. A controlled Slider whose consumer declines values past 60, or clamps them.
    for (const [width, mode] of [[390, "reject"], [1440, "reject"], [390, "clamp"]]) {
        await cell("Slider controlled", `${width}-${mode}`, async () => {
            const { context, page } = await open(browser, { width, scene: "slider", q: `&mode=${mode}` });
            try {
                const read = () => page.evaluate(() => {
                    const thumb = document.querySelector('[role="slider"]');
                    const track = document.querySelector('[data-probe="slider"]');
                    const tr = track.getBoundingClientRect(), th = thumb.getBoundingClientRect();
                    return { model: window.__model(), ariaValueNow: thumb.getAttribute("aria-valuenow"), thumbAt: +(((th.left + th.width / 2) - tr.left) / tr.width).toFixed(3) };
                });
                const steps = [["initial", await read()]];
                await page.locator('[role="slider"]').focus();
                for (const key of ["ArrowRight", "ArrowRight", "ArrowRight", "End"]) {
                    await page.keyboard.press(key);
                    await page.waitForTimeout(250);
                    steps.push([key, await read()]);
                }
                rec("Slider controlled", `${width}-${mode}`, { steps });
                await shot(page, await page.locator('[data-probe="slider"]').boundingBox(), `slider-${width}-${mode}`, 16);
            } finally { await context.close(); }
        });
    }

    // E. The root tempo a JS spring reads, against the root's computed value, after the
    //    page changes it four ways.
    await cell("Root tempo", "1440", async () => {
        const { context, page } = await open(browser, { width: 1440, scene: "tempo" });
        try {
            const out = {};
            const both = async () => ({ js: await page.evaluate(() => window.__tempo()), css: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--motion-tempo").trim()) });
            out.initial = await both();
            await page.evaluate(() => document.documentElement.style.setProperty("--motion-tempo", "0.5"));
            await page.waitForTimeout(100);
            out.inlineStyle = await both();
            await page.evaluate(() => document.documentElement.style.removeProperty("--motion-tempo"));
            await page.waitForTimeout(100);
            out.reset = await both();
            await page.evaluate(() => { const el = document.createElement("style"); el.id = "consumer-sheet"; document.head.append(el); });
            await page.waitForTimeout(100);
            await page.evaluate(() => window.__tempo());
            await page.evaluate(() => document.getElementById("consumer-sheet").sheet.insertRule(":root { --motion-tempo: 0.6 }"));
            await page.waitForTimeout(100);
            out.insertRule = await both();
            await page.evaluate(() => document.getElementById("consumer-sheet").sheet.deleteRule(0));
            await page.evaluate(() => { const el = document.createElement("style"); el.textContent = "@media (max-width: 600px) { :root { --motion-tempo: 0.7 } }"; document.head.append(el); });
            await page.waitForTimeout(100);
            out.beforeResize = await both();
            await page.setViewportSize({ width: 390, height: 900 });
            await page.waitForTimeout(300);
            out.afterResize = await both();
            await page.setViewportSize({ width: 1440, height: 900 });
            await page.waitForTimeout(200);
            out.beforeLink = await both();
            // A stylesheet whose sheet arrives after a spring read the tempo (a lazily
            // loaded route's CSS): served by the dev server, so it loads after the append.
            out.atAppend = await page.evaluate(() => {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = `${location.pathname.replace(/index\.html$/, "")}late.css?t=${Date.now()}`;
                window.__linkLoaded = new Promise((r) => { link.addEventListener("load", () => r("load")); link.addEventListener("error", () => r("error")); });
                document.head.append(link);
                return { js: window.__tempo(), sheetAtAppend: !!link.sheet };
            });
            out.linkEvent = await page.evaluate(() => window.__linkLoaded);
            await page.waitForTimeout(200);
            out.afterLinkLoad = await both();
            rec("Root tempo", "1440", out);
        } finally { await context.close(); }
    });

    // F. A SegmentedTabs strip on the page and inside a GlassDock, fine and coarse.
    for (const width of [390, 1440]) for (const touch of [false, true]) for (const theme of ["light", "dark"]) {
        const name = `${width}-${touch ? "coarse" : "fine"}-${theme}`;
        await cell("Tabs radius", name, async () => {
            const { context, page } = await open(browser, { width, theme, scene: "docktabs", touch });
            try {
                await page.waitForTimeout(600);
                const r = await page.evaluate(() => {
                    const px = (v) => parseFloat(v);
                    const read = (host) => {
                        const root = document.querySelector(`[data-probe="${host}"]`);
                        const tab = root.querySelector(".segmented-tab");
                        const ind = root.querySelector(".segmented-indicator");
                        const strip = root.querySelector(".segmented-tabs");
                        const part = (el) => el && { h: +el.getBoundingClientRect().height.toFixed(1), r: px(getComputedStyle(el).borderTopLeftRadius) };
                        return { tab: part(tab), indicator: part(ind), strip: part(strip) };
                    };
                    return { coarse: matchMedia("(pointer: coarse)").matches, page: read("page-strip"), dock: read("dock-host") };
                });
                rec("Tabs radius", name, r);
                await shot(page, await page.locator('[data-probe="dock-host"]').boundingBox(), `tabs-dock-${name}`, 14);
            } finally { await context.close(); }
        });
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
console.log(label, engineName, cells.length, "cells", cells.filter((c) => c.detail?.error).length, "errors");
