// Critic 5 probe: the dock's run mark where no earlier witness stands (see harness.ts).
// The selected plate is painted magenta and its box read from the screenshot, then held
// against the box the current seat's own plate would fill (its background-clip box, read
// from layout once everything is at rest).
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
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
const PATH = "/docs/release-11.1.0/critic-5/probe8/harness/index.html";
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
async function magenta(page, name, is = MAGENTA) {
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
// What the page says: the current seat's plate box on screen (its clip box), and the mark's box from the run's variables.
const read = () => {
    const run = document.querySelector(".dock-run");
    const s = document.querySelector('[aria-current="page"]');
    if (!run || !s) return { run: !!run, seat: !!s };
    const r = s.getBoundingClientRect(), cs = getComputedStyle(s), clip = cs.backgroundClip;
    const p = clip === "content-box" ? [cs.paddingLeft, cs.paddingTop, cs.paddingRight, cs.paddingBottom].map(parseFloat) : [0, 0, 0, 0];
    const port = run.getBoundingClientRect();
    const v = (n) => parseFloat(run.style.getPropertyValue(`--dock-run-mark-${n}`));
    const dock = run.closest(".glass-dock");
    return {
        tab: s.getAttribute("data-tab"), clip, marked: run.hasAttribute("data-run-mark"),
        plate: { x: +(r.left + p[0]).toFixed(1), y: +(r.top + p[1]).toFixed(1), w: +(r.width - p[0] - p[2]).toFixed(1), h: +(r.height - p[1] - p[3]).toFixed(1) },
        layout: [s.offsetWidth, s.offsetHeight],
        vars: run.hasAttribute("data-run-mark") ? { x: +(port.left + run.clientLeft - run.scrollLeft + v("x")).toFixed(1), y: +(port.top + run.clientTop - run.scrollTop + v("y")).toFixed(1), w: +v("w").toFixed(1), h: +v("h").toFixed(1) } : null,
        dock: { expanded: dock?.classList.contains("expanded") ?? null, morphing: dock?.hasAttribute("data-morphing") ?? null, cls: dock?.className.replace(/\s+/g, " ").slice(0, 160) },
    };
};
const near = (a, b, tol = 1.5) => !!a && !!b && ["x", "y", "w", "h"].every((k) => Math.abs(a[k] - b[k]) <= tol);
async function open(page, how) {
    await page.goto(`${base}${PATH}?${how}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
}
const ctx = (width, touch, theme, extra = {}) => browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium", reducedMotion: "no-preference", ...extra });
async function cell(name, opts, body) {
    if (ONLY.length && !ONLY.some((o) => name.startsWith(o) || name.startsWith("cure-" + o))) return;
    const context = await ctx(...opts);
    try { const page = await context.newPage(); cells.push({ cell: name, ...(await body(page)) }); }
    catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); }
    finally { await context.close(); }
}
// One step: read the page, the paint, and judge the paint against the seat's plate.
async function step(page, name, tag, shape) {
    const page_ = await page.evaluate(read);
    const paint = await magenta(page, `${name}-${tag}`);
    // A tab seat without the mark paints its own plate; either way the paint is the judge.
    return { tag, ...page_, paint, ok: near(paint, page_.plate) };
}

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    // A. A collapsible dock with a marked run: open, close, open again, then change the seat.
    for (const [width, touch, theme] of [[1440, false, "light"], [390, true, "light"], [390, false, "dark"], [1440, true, "dark"]]) for (const shape of ["icon", "tab"]) for (const via of ["api", "pointer"]) {
        const name = `cnav-${shape}-${width}-${touch ? "coarse" : "fine"}-${theme}-${via}`;
        await cell(name, [width, touch, theme], async (page) => {
            await open(page, `scene=cnav&theme=${theme}&shape=${shape}`);
            const steps = [];
            const face = async () => { const b = await page.locator('[data-probe="nav"] .glass-dock').boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
            const doOpen = async () => {
                if (via === "api") await page.evaluate(() => { window.__docks.nav.expand(); window.__docks.nav.keepOpen(); });
                else { const [x, y] = await face(); if (touch) await page.touchscreen.tap(x, y); else await page.mouse.move(x, y, { steps: 3 }); await page.waitForTimeout(400); await page.evaluate(() => window.__docks.nav.keepOpen()); }
            };
            const doClose = async () => { if (!touch && via === "pointer") await page.mouse.move(5, 700, { steps: 3 }); await page.evaluate(() => { window.__docks.nav.release(); window.__docks.nav.collapse(); }); };
            steps.push({ tag: "closed", ...(await page.evaluate(read)) });
            await doOpen();
            // The mark's variables as the dock opens.
            const trace = [];
            for (const t of [80, 200, 400, 800]) { await page.waitForTimeout(t - (trace.at(-1)?.t ?? 0)); const r = await page.evaluate(read); trace.push({ t, marked: r.marked, vars: r.vars, plate: r.plate, morphing: r.dock?.morphing }); }
            await page.waitForTimeout(2200);
            steps.push(await step(page, name, "open-1", shape));
            await doClose(); await page.waitForTimeout(2000);
            await doOpen(); await page.waitForTimeout(3000);
            steps.push(await step(page, name, "open-2", shape));
            await page.evaluate(() => window.__select(3)); await page.waitForTimeout(2500);
            steps.push(await step(page, name, "select-3", shape));
            return { trace, steps, ok: steps.slice(1).every((s) => s.ok) };
        });
    }
    // B. `active` and `aria-current` together on a glyph seat: the plate, in the library's colours and in magenta.
    // The `cure-` cells lay one rule over the tree: the seat the run marks paints nothing of its own.
    const BOTH_CURE = '.glass-dock .dock-run[data-run-mark] [aria-current]:not([aria-current="false"])[data-active] { background: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; }';
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        // `both2-` cells (added on the resume): both cures together, so the marked seat paints nothing of its own AND the `active` rung keeps the face's clip.
        for (const cure of [false, true, 2]) await cell(`${cure === 2 ? "both2-" : cure ? "cure-both-" : "both-"}plain-${width}-${theme}`, [width, false, theme], async (page) => {
            const out = {};
            for (const both of [0, 1]) {
                await open(page, `scene=nav&theme=${theme}&shape=icon&plain=1&both=${both}`);
                if (cure) { await page.addStyleTag({ content: cure === 2 ? BOTH_CURE + " .glass-dock .dock-icon-button[data-active] { background-clip: content-box; }" : BOTH_CURE }); await page.waitForTimeout(400); }
                // The mark measures when the destination changes: move it away and back so it reads the seat under the cure.
                if (cure === 2) { await page.evaluate(() => window.__select(2)); await page.waitForTimeout(1500); await page.evaluate(() => window.__select(1)); await page.waitForTimeout(2500); }
                // mid: 14 px in on the midline. corner: 7 px in, 7 px down, inside a stadium on the cell and outside the oval a 50% radius draws on it.
                // inset: 2 px in on the midline (outside a plate inset 4 px). centre: a third of the way along the midline.
                const pts = await page.evaluate(() => { const r = document.querySelector('[data-tab="1"]').getBoundingClientRect(), o = document.querySelector('[data-tab="2"]').getBoundingClientRect(); return [[r.left + 14, r.top + r.height / 2], [r.left + 7, r.top + 7], [r.left + 2, r.top + r.height / 2], [r.left + r.width / 3, r.top + r.height / 2], [o.left + 4, o.top + o.height / 2]]; });
                const [mid, corner, inset, centre, other] = await pixels(page, `${cure === 2 ? "both2-" : cure ? "cure-both-" : "both-"}plain-${width}-${theme}-both${both}`, pts);
                const d = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
                out[both ? "activeAndCurrent" : "currentOnly"] = { mid, corner, inset, centre, other, shapes: d(mid, centre) > 3 || (d(corner, other) > 3 && d(corner, mid) > 3) ? "two" : "one", seat: await page.evaluate(() => { const s = document.querySelector('[data-tab="1"]'), cs = getComputedStyle(s), b = getComputedStyle(s, "::before"), a = getComputedStyle(s, "::after"); return { bg: cs.backgroundColor, image: cs.backgroundImage.slice(0, 90), clip: cs.backgroundClip, shadow: cs.boxShadow.slice(0, 160), backdrop: cs.backdropFilter ?? cs.webkitBackdropFilter, radius: cs.borderTopLeftRadius, before: [b.content, b.backgroundImage.slice(0, 60), b.opacity], after: [a.content, a.backgroundImage.slice(0, 60), a.opacity], pressed: s.getAttribute("aria-pressed"), cls: s.className.slice(0, 120) }; }) };
            }
            return out;
        });
        await cell(`both-magenta-${width}-${theme}`, [width, false, theme], async (page) => {
            const out = {};
            for (const both of [0, 1]) { await open(page, `scene=nav&theme=${theme}&shape=icon&both=${both}`); out[both ? "activeAndCurrent" : "currentOnly"] = await step(page, `both-magenta-${width}-${theme}-both${both}`, "rest", "icon"); }
            return out;
        });
    }
    // B2. A glyph seat with `active` alone beside a hovered one: the two plates' boxes.
    // The `cure-` cells lay one declaration over the tree: the `active` rung keeps the face's clip.
    const ACTIVE_CURE = ".glass-dock .dock-icon-button[data-active] { background-clip: content-box; }";
    for (const cure of [false, true]) for (const width of [390, 1440]) for (const theme of ["light", "dark"]) await cell(`${cure ? "cure-" : ""}active-hover-${width}-${theme}`, [width, false, theme], async (page) => {
        await open(page, `scene=nav&theme=${theme}&shape=icon&act=1&flat=1`);
        if (cure) { await page.addStyleTag({ content: ACTIVE_CURE }); await page.waitForTimeout(300); }
        const n = `${cure ? "cure-" : ""}active-hover-${width}-${theme}`;
        const active = await magenta(page, `${n}-rest`);
        const seat = await page.evaluate(() => { const s = document.querySelector('[data-tab="1"]'), r = s.getBoundingClientRect(), cs = getComputedStyle(s); return { cell: [r.width, r.height], clip: cs.backgroundClip, pressed: s.getAttribute("aria-pressed") }; });
        const pt = await page.evaluate(() => { const r = document.querySelector('[data-tab="3"]').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
        await page.mouse.move(pt[0], pt[1]); await page.waitForTimeout(700);
        const hover = await magenta(page, `${n}-hover`, GREEN);
        const hovered = await page.evaluate(() => { const s = document.querySelector('[data-tab="3"]'), r = s.getBoundingClientRect(), cs = getComputedStyle(s); return { cell: [r.width, r.height], clip: cs.backgroundClip }; });
        // The active seat hovered too.
        const pa = await page.evaluate(() => { const r = document.querySelector('[data-tab="1"]').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
        await page.mouse.move(pa[0], pa[1]); await page.waitForTimeout(700);
        const activeHover = { green: await magenta(page, `${n}-active-hover`, GREEN), magenta: await magenta(page, `${n}-active-hover-m`) };
        return { active, seat, hover, hovered, activeHover, same: !!active && !!hover && active.w === hover.w && active.h === hover.h };
    });
    // C. A consumer's gradient hover fill on a glyph seat.
    for (const theme of ["light", "dark"]) await cell(`grad-1440-${theme}`, [1440, false, theme], async (page) => {
        await open(page, `scene=nav&theme=${theme}&shape=icon&plain=1&grad=1`);
        const pt = await page.evaluate(() => { const r = document.querySelector('[data-tab="3"]').getBoundingClientRect(); return [r.left + r.width / 2 - 12, r.top + r.height / 2 - 10]; });
        const [rest] = await pixels(page, `grad-1440-${theme}-rest`, [pt]);
        await page.mouse.move(pt[0] + 12, pt[1] + 10); await page.waitForTimeout(700);
        const [hover] = await pixels(page, `grad-1440-${theme}-hover`, [pt]);
        const cs = await page.evaluate(() => { const cs = getComputedStyle(document.querySelector('[data-tab="3"]')); return { color: cs.backgroundColor, image: cs.backgroundImage.slice(0, 60) }; });
        return { rest, hover, cs, green: hover[1] > 150 && hover[0] < 80 };
    });
    // D. The mark in the frame that first paints a dock, by where the mount came from.
    for (const width of [390, 1440]) for (const shape of ["icon", "tab"]) for (const how of ["task", "raf", "ro"]) await cell(`mount-${shape}-${width}-${how}`, [width, false, "light"], async (page) => {
        await open(page, `scene=mount&theme=light&shape=${shape}`);
        const frames = await page.evaluate((how) => window.__mount(how), how);
        return { frames, first: frames[0]?.mark === true };
    });
    // E. Direction and orientation changed on a live dock; F. the viewport narrowed.
    for (const width of [390, 1440]) {
        for (const shape of ["icon", "tab"]) await cell(`dir-${shape}-${width}`, [width, false, "light"], async (page) => {
            await open(page, `scene=nav&theme=light&shape=${shape}`);
            const steps = [await step(page, `dir-${shape}-${width}`, "ltr", shape)];
            await page.evaluate(() => window.__dir("rtl")); await page.waitForTimeout(1500);
            steps.push(await step(page, `dir-${shape}-${width}`, "rtl", shape));
            return { steps, ok: steps.every((s) => s.ok) };
        });
        await cell(`orient-icon-${width}`, [width, false, "light"], async (page) => {
            await open(page, `scene=nav&theme=light&shape=icon`);
            const steps = [await step(page, `orient-icon-${width}`, "horizontal", "icon")];
            await page.evaluate(() => window.__orient("vertical")); await page.waitForTimeout(2500);
            steps.push(await step(page, `orient-icon-${width}`, "vertical", "icon"));
            await page.evaluate(() => window.__orient("horizontal")); await page.waitForTimeout(2500);
            steps.push(await step(page, `orient-icon-${width}`, "horizontal-again", "icon"));
            return { steps, ok: steps.every((s) => s.ok) };
        });
    }
    for (const shape of ["icon", "tab"]) await cell(`narrow-${shape}`, [1440, false, "light"], async (page) => {
        await open(page, `scene=nav&theme=light&shape=${shape}`);
        await page.evaluate(() => window.__select(3)); await page.waitForTimeout(2500);
        const steps = [await step(page, `narrow-${shape}`, "1440", shape)];
        await page.setViewportSize({ width: 320, height: 900 }); await page.waitForTimeout(2000);
        steps.push(await step(page, `narrow-${shape}`, "320", shape));
        await page.evaluate(() => { const run = document.querySelector(".dock-run"); run.scrollLeft = run.scrollWidth; }); await page.waitForTimeout(1200);
        steps.push(await step(page, `narrow-${shape}`, "320-scrolled", shape));
        return { steps, ok: steps.every((s) => s.ok) };
    });
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}${ONLY.length ? "-" + ONLY.join("+") : ""}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
const b = (o) => (o ? `${o.x},${o.y} ${o.w}x${o.h}` : "none");
for (const c of cells) {
    if (c.error) { console.log(c.cell, "ERROR", c.error); continue; }
    if (c.steps) console.log(c.cell, c.ok ? "ok" : "FAIL", c.steps.map((s) => `${s.tag}: marked=${s.marked} seat ${b(s.plate)} paint ${b(s.paint)} vars ${b(s.vars)}${s.ok === undefined ? "" : s.ok ? "" : " <<"}`).join(" | "));
    else if (c.frames) console.log(c.cell, `first=${c.first}`, c.frames.map((f) => `mark=${f.mark} before=${f.before} seatBg=${f.seatBg}`).join(" | "));
    else console.log(c.cell, JSON.stringify(c).slice(0, 700));
}
console.log(label, engineName, cells.length, "cells", cells.filter((c) => c.error).length, "errors");
