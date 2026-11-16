// Critic round 1 probe: the critic-note items (G13, G14, O-212, O-213, O-214, K12).
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, contexts and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
const { PNG } = createRequire(import.meta.url)("pngjs");
const inkCount = (buf) => { const png = PNG.sync.read(buf); let n = 0; for (let i = 0; i < png.data.length; i += 4) { const [r, g, b] = [png.data[i], png.data[i + 1], png.data[i + 2]]; if (Math.max(r, g, b) - Math.min(r, g, b) > 40) n++; } return n; };

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/critic-1/harness/index.html";
const cells = [];
let cur = "?";
const v = (item, cell, pass, detail) => cells.push({ item, cell, pass, detail });

function wk2287() {
    const p = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
    return existsSync(p) ? p : undefined;
}

async function open(browser, { width, theme = "light", scene, q = "", touch = false }) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium" });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}${q}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    return { context, page };
}

async function shot(page, box, name) {
    if (!box) return;
    await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: box.width + 16, height: box.height + 16 } });
}

const browser = await engine.launch(engineName === "webkit" && wk2287() ? { executablePath: wk2287() } : {});
try {
    cur = "O-212";
    // O-212: rows inside the plate, for triggers 200 / 352 / 386 / 600.
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) for (const tw of [200, 352, 386, 600]) {
        if (width === 390 && tw === 600) continue;
        const { context, page } = await open(browser, { width, theme, scene: "select", q: `&tw=${tw}` });
        try {
            await page.click('[data-probe="trigger"]');
            await page.waitForTimeout(900);
            const r = await page.evaluate(() => {
                const plate = document.querySelector('[data-slot="select-content"]');
                if (!plate) return { plate: null };
                const pr = plate.getBoundingClientRect();
                const rows = [...plate.querySelectorAll('[data-probe="row"]')];
                let outside = 0, misses = 0, worst = 0;
                for (const row of rows) {
                    const rr = row.getBoundingClientRect();
                    const over = Math.max(rr.right - pr.right, pr.left - rr.left);
                    if (over > 0.5) { outside++; worst = Math.max(worst, over); }
                    const hit = document.elementFromPoint(rr.right - 12, rr.top + rr.height / 2);
                    if (!hit || !row.contains(hit)) misses++;
                }
                return { plate: [pr.left, pr.width], rows: rows.length, outside, misses, worst: +worst.toFixed(1), viewport: document.querySelector('[data-slot="select-viewport"]')?.getBoundingClientRect().width };
            });
            v("O-212", `${width}-${theme}-tw${tw}`, r.plate && r.outside === 0 && r.misses === 0, r);
            if (theme === "light" && tw === 386) await shot(page, await page.locator('[data-slot="select-content"]').boundingBox(), `o212-${width}-tw${tw}`);
        } catch (e) { v(cur, 'error', false, String(e).slice(0, 300)); } finally { await context.close(); }
    }

    cur = "O-214";
    // O-214: after a mouse open, no row paints a ring.
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        const { context, page } = await open(browser, { width, theme, scene: "select", q: "&tw=240" });
        try {
            await page.mouse.click(...(await (async () => { const b = await page.locator('[data-probe="trigger"]').boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; })()));
            await page.waitForTimeout(900);
            const r = await page.evaluate(() => {
                const rows = [...document.querySelectorAll('[data-slot="select-content"] [data-probe="row"]')];
                const ringed = rows.filter((row) => { const cs = getComputedStyle(row); return cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0; }).map((row) => ({ text: row.textContent, outline: `${getComputedStyle(row).outlineStyle} ${getComputedStyle(row).outlineWidth} ${getComputedStyle(row).outlineColor}`, focusVisible: row.matches(":focus-visible") }));
                return { active: document.activeElement?.textContent?.slice(0, 30), ringed };
            });
            v("O-214", `${width}-${theme}`, r.ringed.length === 0, r);
            if (theme === "light") await shot(page, await page.locator('[data-slot="select-content"]').boundingBox(), `o214-${width}`);
        } catch (e) { v(cur, 'error', false, String(e).slice(0, 300)); } finally { await context.close(); }
    }

    cur = "G13";
    // G13: at 1440 the stage is the larger column on either side.
    for (const theme of ["light", "dark"]) for (const side of ["right", "left"]) {
        const { context, page } = await open(browser, { width: 1440, theme, scene: "config", q: `&side=${side}` });
        try {
            const r = await page.evaluate(() => {
                const s = document.querySelector(".configurator-stage")?.getBoundingClientRect();
                const a = document.querySelector(".configurator-aside")?.getBoundingClientRect();
                return { stage: s && [Math.round(s.left), Math.round(s.width)], aside: a && [Math.round(a.left), Math.round(a.width)] };
            });
            v("G13", `1440-${theme}-${side}`, r.stage && r.aside && r.stage[1] > r.aside[1] && r.aside[1] <= 400, r);
            if (theme === "light") await shot(page, await page.locator('[data-slot="configurator"]').boundingBox(), `g13-${side}`);
        } catch (e) { v(cur, 'error', false, String(e).slice(0, 300)); } finally { await context.close(); }
    }

    cur = "O-213";
    // O-213: the shell's border box stays inside its column.
    for (const width of [320, 360, 390]) for (const m of [0, 16]) {
        const { context, page } = await open(browser, { width, scene: "shell", q: `&m=${m}` });
        try {
            const r = await page.evaluate(() => {
                const col = document.querySelector('[data-probe="column"]').getBoundingClientRect();
                const s = document.querySelector('[data-slot="configurator"]').getBoundingClientRect();
                return { column: [col.left, col.right], shell: [s.left, s.right], over: +(s.right - col.right).toFixed(1), docScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth };
            });
            v("O-213", `${width}-m${m}`, r.over <= 0.5, r);
        } catch (e) { v(cur, 'error', false, String(e).slice(0, 300)); } finally { await context.close(); }
    }

    cur = "G14";
    // G14: under a coarse pointer every tab is at least 44 px tall.
    for (const width of [390]) for (const theme of ["light", "dark"]) {
        const { context, page } = await open(browser, { width, theme, scene: "tabs", touch: true });
        try {
            const r = await page.evaluate(() => ({
                coarse: matchMedia("(pointer: coarse)").matches,
                tabs: [...document.querySelectorAll('[data-probe="tabs"] [role="tab"], [data-probe="tabs"] button, [data-probe="tabs"] [role="radio"]')].map((t) => +t.getBoundingClientRect().height.toFixed(1)),
            }));
            v("G14", `${width}-${theme}-coarse`, r.coarse && r.tabs.length > 0 && r.tabs.every((x) => x >= 44), r);
            if (theme === "light") await shot(page, await page.locator('[data-probe="tabs"]').boundingBox(), "g14");
        } catch (e) { v(cur, 'error', false, String(e).slice(0, 300)); } finally { await context.close(); }
    }

    cur = "K12";
    // K12: during 2 s of clock-driven playback, per-frame writes on the range and thumb.
    for (const width of [390, 1440]) {
        const { context, page } = await open(browser, { width, scene: "slider" });
        try {
            const r = await page.evaluate(async () => {
                const range = document.querySelector(".slider-range");
                const thumb = document.querySelector(".slider-thumb");
                const seen = { range: 0, thumb: 0, props: new Set() };
                const mo = new MutationObserver((recs) => {
                    for (const rec of recs) {
                        const el = rec.target;
                        if (range && (el === range || range.contains(el))) seen.range++;
                        if (thumb && (el === thumb || thumb.contains(el) || el.contains(thumb))) seen.thumb++;
                        for (const p of (el.getAttribute("style") ?? "").split(";")) { const k = p.split(":")[0].trim(); if (k) seen.props.add(k); }
                    }
                });
                for (const el of [range, thumb, thumb?.parentElement].filter(Boolean)) mo.observe(el, { attributes: true, attributeFilter: ["style"] });
                await new Promise((res) => setTimeout(res, 2000));
                mo.disconnect();
                return { range: seen.range, thumb: seen.thumb, props: [...seen.props], hasRange: !!range, hasThumb: !!thumb, rangeStyle: range?.getAttribute("style"), thumbWrapStyle: thumb?.parentElement?.getAttribute("style") };
            });
            const layoutProps = r.props.filter((p) => /^(left|right|top|bottom|width|height|inset|inline-size|margin)/.test(p));
            v("K12", `${width}`, layoutProps.length === 0, { ...r, layoutProps });
        } catch (e) { v(cur, 'error', false, String(e).slice(0, 300)); } finally { await context.close(); }
    }
    // Consumer CSS against the 11.0.0 Collapsible: --reka-collapsible-content-height and a `>` rule.
    {
        const { context, page } = await open(browser, { width: 390, scene: "collapsible" });
        try {
            cur = "CONSUMER-collapsible";
            await page.click('[data-probe="ctrig"]');
            await page.waitForTimeout(800);
            const r = await page.evaluate(() => {
                const c = document.querySelector('[data-probe="content"]');
                const p = document.querySelector('[data-probe="para"]');
                return { rekaHeight: getComputedStyle(c).getPropertyValue("--reka-collapsible-content-height").trim(), directChildRule: getComputedStyle(p).color, paraParent: p.parentElement.className };
            });
            v("CONSUMER-collapsible", "390", r.rekaHeight !== "" && r.directChildRule === "rgb(200, 0, 0)", r);
        } catch (e) { v(cur, 'error', false, String(e).slice(0, 300)); } finally { await context.close(); }
    }
    // HandMark on HEAD (lane L5's harness, fold scene): off-screen waits undrawn, draws in on
    // entry in paint, and with retrigger undraws and redraws. Paint: ink pixels in the mark's
    // crop with every animation paused at its start on entry, then at rest.
    cur = "O-190";
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) for (const retrigger of [false, true]) {
        const context = await browser.newContext({ viewport: { width, height: 800 }, colorScheme: theme });
        const page = await context.newPage();
        try {
            await page.goto(`${base}/docs/release-11.1.0/lane-L5/harness/index.html?scene=fold&theme=${theme}${retrigger ? "&retrigger=1" : ""}`, { waitUntil: "load" });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(1500);
            const sel = '[data-probe="below-mark"]';
            const off = await page.evaluate((sel) => { const h = document.querySelector(sel); return { top: Math.round(h.getBoundingClientRect().top), vh: innerHeight, ink: h.dataset.ink ?? null, running: h.getAnimations({ subtree: true }).filter((a) => a.playState === "running").length }; }, sel);
            await page.evaluate((sel) => { document.querySelector(sel).scrollIntoView({ block: "center" }); }, sel);
            await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
            const entry = await page.evaluate((sel) => { const h = document.querySelector(sel); const as = h.getAnimations({ subtree: true }); for (const a of as) { a.pause(); a.currentTime = 0; } return { anims: as.length, names: [...new Set(as.map((a) => a.animationName ?? a.constructor.name))], ink: h.dataset.ink ?? null }; }, sel);
            const box = await page.locator(sel).boundingBox();
            const clip = { x: Math.max(0, box.x - 6), y: Math.max(0, box.y - 6), width: box.width + 12, height: box.height + 16 };
            const inkStart = inkCount(await page.screenshot({ clip }));
            await page.evaluate((sel) => { for (const a of document.querySelector(sel).getAnimations({ subtree: true })) a.finish(); }, sel);
            await page.waitForTimeout(300);
            const restBuf = await page.screenshot({ clip });
            const inkRest = inkCount(restBuf);
            if (!retrigger) writeFileSync(join(pngDir, `${label}-${engineName}-o190-rest-${width}-${theme}.png`), restBuf);
            const r = { off, entry, inkStart, inkRest };
            let pass = off.top > off.vh && off.running === 0 && entry.anims > 0 && inkRest > 50 && inkStart < inkRest * 0.2;
            if (retrigger) {
                await page.evaluate(() => window.scrollTo(0, 0));
                await page.waitForTimeout(600);
                r.away = await page.evaluate((sel) => document.querySelector(sel).dataset.ink ?? null, sel);
                await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), sel);
                await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
                r.again = await page.evaluate((sel) => document.querySelector(sel).getAnimations({ subtree: true }).filter((a) => a.playState === "running").length, sel);
                pass = pass && r.away === "wait" && r.again > 0;
            }
            v(retrigger ? "O-190 retrigger" : "O-190", `${width}-${theme}`, pass, r);
        } catch (e) { v(cur, `${width}-${theme}`, false, String(e).slice(0, 300)); } finally { await context.close(); }
    }
} finally {
    await browser.close();
}
const failed = cells.filter((c) => !c.pass);
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
const by = {};
for (const c of cells) { by[c.item] ??= [0, 0]; by[c.item][1]++; if (c.pass) by[c.item][0]++; }
console.log(label, engineName, JSON.stringify(by));
process.exit(failed.length ? 1 : 0);
