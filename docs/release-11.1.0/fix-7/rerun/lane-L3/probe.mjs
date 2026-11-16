// Lane L3 witness probe: the bare Badge, the rounded table container, the popover on a
// virtual point, the side sheet's entry shear.
//
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label> <tree:green|red>
//
// One browser per run, a new context per cell, every context and the browser closed in
// `finally`. Headless shell for Chromium (Playwright's default); WebKit is Playwright's
// build 2287, the build the 11.0.0 records and lanes L1/L2 use (2311 crashes on the
// glass stack). Each run writes <out-dir>/<label>-<engine>.json and cropped paint to png/.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [engineName, base, outDir, label, tree = "green"] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });

const PATH = "/docs/release-11.1.0/lane-L3/harness/index.html";
const WIDTHS = [390, 1440];
const THEMES = ["light", "dark"];
const results = { engine: engineName, label, tree, base, cells: [] };
const verdicts = [];
const verdict = (item, cell, pass, detail) => verdicts.push({ item, cell, pass, detail });

async function open(browser, { width, theme, scene, reduce = false, coarse = false, query = "" }) {
    const context = await browser.newContext({
        viewport: { width, height: 800 },
        deviceScaleFactor: 1,
        reducedMotion: reduce ? "reduce" : "no-preference",
        colorScheme: theme,
        hasTouch: coarse,
        isMobile: coarse && engineName === "chromium",
    });
    const page = await context.newPage();
    await page.goto(`${base}${PATH}?scene=${scene}&theme=${theme}${query}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    return { context, page };
}

const clipOf = (box, pad) => ({ x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 });
const shot = (page, name, box, pad = 8) => page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip: clipOf(box, pad) });
const raf2 = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))));

// ── O-158 · the bare Badge: the box is the glyph, the glyph is the cap height ──────────
async function badge(browser, width, theme) {
    const cell = `${width}-${theme}-coarse`;
    const { context, page } = await open(browser, { width, theme, scene: "badge", coarse: true });
    try {
        const m = await page.evaluate(() => {
            const b = document.querySelector('[data-probe="bare"]');
            const g = b.querySelector("svg");
            const label = b.querySelector('[data-probe="bare-label"]');
            const cs = getComputedStyle(b);
            const probe = document.createElement("span");
            probe.style.cssText = `display:inline-block;block-size:1cap;inline-size:1px;font:${cs.font};font-weight:${cs.fontWeight}`;
            b.parentElement.appendChild(probe);
            const cap = probe.getBoundingClientRect().height;
            probe.remove();
            const r = (el) => { const x = el.getBoundingClientRect(); return { x: x.x, y: x.y, w: x.width, h: x.height }; };
            return {
                coarse: matchMedia("(pointer: coarse)").matches,
                badge: r(b),
                glyph: r(g),
                cap,
                padding: cs.padding,
                boxShadow: cs.boxShadow,
                background: [cs.backgroundColor, cs.backgroundImage],
                minInlineSize: cs.minInlineSize,
                labelDisplay: getComputedStyle(label).display,
                labelBox: r(label),
                name: document.querySelector(".card-name").getBoundingClientRect().width,
            };
        });
        const aria = await page.locator('[data-probe="card"]').ariaSnapshot();
        const card = await page.locator('[data-probe="card"]').boundingBox();
        await shot(page, `o158-${cell}`, card);
        const transparent = /rgba\(0, 0, 0, 0\)|transparent/.test(m.background[0]) && m.background[1] === "none";
        const pass =
            Math.abs(m.badge.w - m.glyph.w) <= 0.5 &&
            Math.abs(m.badge.h - m.glyph.h) <= 0.5 &&
            Math.abs(m.glyph.h - m.cap) <= 0.5 &&
            /^0px( 0px)*$/.test(m.padding) &&
            m.boxShadow === "none" &&
            transparent &&
            m.labelDisplay !== "none" &&
            /Featured/.test(aria);
        verdict("O-158", cell, pass, { ...m, aria });
    } finally {
        await context.close();
    }
}

// ── O-184 · the rounded table container ─────────────────────────────────────────────
// Pixels in each corner square that lie outside the radius arc (with a 1.5 px band left
// for anti-aliasing) must be the page ground, sampled just outside the container.
async function cornerReading(page, sel, name) {
    // in view first: a clip past the viewport comes back short, and a short image would
    // read `undefined` pixels (which must never count as clean; `px` throws on them)
    await page.locator(sel).scrollIntoViewIfNeeded();
    await raf2(page);
    const box = await page.locator(sel).boundingBox();
    const pad = 8;
    const buf = await page.screenshot({ clip: clipOf(box, pad) });
    await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip: clipOf(box, pad) });
    const png = PNG.sync.read(buf);
    const px = (x, y) => {
        if (x < 0 || y < 0 || x >= png.width || y >= png.height) throw new Error(`pixel (${x}, ${y}) outside the ${png.width}x${png.height} capture of ${name}`);
        const i = (png.width * y + x) * 4;
        return [png.data[i], png.data[i + 1], png.data[i + 2]];
    };
    const R = await page.evaluate(() => {
        const t = document.createElement("div");
        t.style.borderRadius = "var(--radius-card)";
        document.body.appendChild(t);
        const v = parseFloat(getComputedStyle(t).borderTopLeftRadius);
        t.remove();
        return v;
    });
    const x0 = Math.round(box.x) - Math.max(0, Math.round(box.x) - pad);
    const y0 = Math.round(box.y) - Math.max(0, Math.round(box.y) - pad);
    const W = Math.round(box.width), H = Math.round(box.height);
    const ground = px(Math.max(0, x0 - 4), y0 + Math.round(H / 2));
    let worst = 0, outside = 0, samples = 0;
    const corners = [[0, 0, 1, 1], [W - 1, 0, -1, 1], [0, H - 1, 1, -1], [W - 1, H - 1, -1, -1]];
    for (const [cx, cy, sx, sy] of corners) {
        for (let i = 0; i < R; i++) {
            for (let j = 0; j < R; j++) {
                const dx = R - (i + 0.5), dy = R - (j + 0.5);
                if (Math.hypot(dx, dy) <= R + 1.5) continue;
                const p = px(x0 + cx + sx * i, y0 + cy + sy * j);
                const d = Math.max(...p.map((v, k) => Math.abs(v - ground[k])));
                samples++;
                if (d > 6) outside++;
                worst = Math.max(worst, d);
            }
        }
    }
    return { R, ground, samples, outside, worst };
}

async function table(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, theme, scene: "table" });
    try {
        const readings = {};
        // at rest: the component table and the plain sticky table
        readings.componentRest = await cornerReading(page, '[data-probe="tbl-component"] [data-slot="table-container"]', `o184-component-${cell}`);
        const stickySel = '[data-probe="tbl-sticky"]';
        readings.stickyRest = await cornerReading(page, stickySel, `o184-sticky-rest-${cell}`);
        // header stuck mid-scroll
        await page.evaluate((s) => { const el = document.querySelector(s); el.scrollTop = (el.scrollHeight - el.clientHeight) / 2; }, stickySel);
        await raf2(page);
        readings.stickyMid = await cornerReading(page, stickySel, `o184-sticky-mid-${cell}`);
        readings.stickyScroll = await page.evaluate((s) => { const el = document.querySelector(s); return { scrollTop: el.scrollTop, scrollHeight: el.scrollHeight, clientHeight: el.clientHeight }; }, stickySel);
        // horizontal scroll, both ends
        const wideSel = '[data-probe="tbl-wide"] [data-slot="table-container"]';
        readings.wideStart = await cornerReading(page, wideSel, `o184-wide-start-${cell}`);
        await page.evaluate((s) => { const el = document.querySelector(s); el.scrollLeft = el.scrollWidth; }, wideSel);
        await raf2(page);
        readings.wideEnd = await cornerReading(page, wideSel, `o184-wide-end-${cell}`);
        readings.wideScroll = await page.evaluate((s) => { const el = document.querySelector(s); return { scrollLeft: el.scrollLeft, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }; }, wideSel);
        // no doubled border: the container draws none, the edge rows draw none on the edge
        readings.borders = await page.evaluate(() => {
            const out = {};
            for (const [k, s] of [["component", '[data-probe="tbl-component"] [data-slot="table-container"]'], ["sticky", '[data-probe="tbl-sticky"]']]) {
                const c = document.querySelector(s);
                const cs = getComputedStyle(c);
                const lastCells = [...c.querySelectorAll("tbody tr:last-child td")];
                out[k] = {
                    container: [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth],
                    radius: cs.borderTopLeftRadius,
                    overflow: cs.overflow,
                    table: getComputedStyle(c.querySelector("table")).borderTopWidth,
                    lastRow: getComputedStyle(c.querySelector("tbody tr:last-child")).borderBottomWidth,
                    lastCells: [...new Set(lastCells.map((td) => getComputedStyle(td).borderBottomWidth))],
                };
            }
            return out;
        });
        const clean = (r) => r.outside === 0 && r.samples > 0;
        const noDouble = Object.values(readings.borders).every((b) => b.container.every((v) => v === "0px") && b.table === "0px" && b.lastRow === "0px" && b.lastCells.every((v) => v === "0px"));
        const scrolled = readings.stickyScroll.scrollTop > 0 && readings.wideScroll.scrollLeft > 0;
        const pass = ["componentRest", "stickyRest", "stickyMid", "wideStart", "wideEnd"].every((k) => clean(readings[k])) && noDouble && scrolled;
        verdict("O-184", cell, pass, readings);
    } finally {
        await context.close();
    }
}

// ── O-178 · a popover on a virtual point: follows, flips, dismisses, no polling ─────
async function popover(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, theme, scene: "popover" });
    try {
        const pop = page.locator('[data-probe="pop"]');
        await pop.waitFor({ state: "visible", timeout: 5000 });
        await page.waitForTimeout(300);
        const rect = () => page.evaluate(() => {
            const el = document.querySelector('[data-probe="pop"]');
            const r = el.getBoundingClientRect();
            return { top: r.top, bottom: r.bottom, cx: r.left + r.width / 2, side: el.getAttribute("data-side") };
        });
        const at0 = await rect();
        const calls0 = await page.evaluate(() => window.__pop.calls());
        await page.waitForTimeout(600);
        const idleCalls = (await page.evaluate(() => window.__pop.calls())) - calls0;
        // follow: the point moves; the card follows on the next frames. The point sits at
        // the viewport's centre, where the 16 px collision padding never shifts the card,
        // so its centre must be the point's x.
        const p1 = { x: Math.round(width / 2), y: 340 };
        const before = await page.evaluate(() => window.__pop.calls());
        await page.evaluate(({ x, y }) => window.__pop.move(x, y), p1);
        await raf2(page);
        await raf2(page);
        const at1 = await rect();
        const updateCalls = (await page.evaluate(() => window.__pop.calls())) - before;
        const followed = Math.abs(at1.top - (p1.y + 4)) <= 1.5 && Math.abs(at1.cx - p1.x) <= 1.5 && at1.side === "bottom";
        const box1 = await pop.boundingBox();
        await shot(page, `o178-follow-${cell}`, box1, 24);
        // flip: near the viewport's foot there is no room below
        const p2 = { x: Math.round(width * 0.5), y: 800 - 14 };
        await page.evaluate(({ x, y }) => window.__pop.move(x, y), p2);
        await raf2(page);
        await raf2(page);
        const at2 = await rect();
        const flipped = at2.side === "top" && at2.bottom <= p2.y - 4 + 1.5;
        await shot(page, `o178-flip-${cell}`, await pop.boundingBox(), 24);
        // dismiss on an outside press
        await page.mouse.click(8, 8);
        await page.waitForTimeout(400);
        const openAfter = await page.evaluate(() => window.__pop.isOpen());
        const pass = followed && flipped && openAfter === false && idleCalls === 0;
        verdict("O-178", cell, pass, { at0, p1, at1, p2, at2, followed, flipped, openAfterOutsidePress: openAfter, idleCalls, updateCalls });
    } finally {
        await context.close();
    }
}

// ── O-179 · the entry shear: whole angle on the first frame, none at rest ───────────
async function sheet(browser, width, theme, { skew = 8, reduce = false } = {}) {
    const cell = `${width}-${theme}${skew ? `-skew${skew}` : "-default"}${reduce ? "-reduced" : ""}`;
    const { context, page } = await open(browser, { width, theme, scene: "sheet", reduce, query: skew ? `&skew=${skew}` : "" });
    try {
        const frames = await page.evaluate(() => new Promise((resolve) => {
            const out = [];
            window.__sheet.open();
            let n = 0;
            const tick = () => {
                const el = document.querySelector('[data-slot="sheet-content"]');
                if (el) {
                    const r = el.getBoundingClientRect();
                    const t = getComputedStyle(el).transform;
                    const m = t === "none" ? [1, 0, 0, 1] : t.match(/matrix\(([^)]+)\)/)?.[1].split(",").map(Number) ?? [1, 0, 0, 1];
                    // skewY(a) → matrix(1, tan a, 0, 1); skewX(a) → matrix(1, 0, tan a, 1)
                    const deg = (Math.atan(Math.abs(m[1]) > Math.abs(m[2]) ? m[1] : m[2]) * 180) / Math.PI;
                    out.push({ n, left: Math.round(r.left * 10) / 10, deg: Math.round(deg * 1000) / 1000, visible: r.left < innerWidth - 1 });
                }
                if (++n < 120) requestAnimationFrame(tick);
                else resolve(out);
            };
            requestAnimationFrame(tick);
        }));
        await page.waitForTimeout(600);
        const settled = await page.evaluate(() => {
            const el = document.querySelector('[data-slot="sheet-content"]');
            return { transform: getComputedStyle(el).transform, inline: el.style.transform };
        });
        const sheetBox = await page.locator('[data-slot="sheet-content"]').boundingBox();
        await shot(page, `o179-rest-${cell}`, sheetBox, 0);
        const visible = frames.filter((f) => f.visible);
        const first = visible[0] ?? null;
        const maxDeg = Math.max(0, ...frames.map((f) => Math.abs(f.deg)));
        const settledFlat = settled.transform === "none" || /^matrix\(1, 0, 0, 1, 0, 0\)$/.test(settled.transform);
        let pass;
        if (skew && !reduce) pass = first !== null && Math.abs(first.deg) >= skew * 0.5 && maxDeg <= skew + 0.5 && settledFlat;
        else pass = maxDeg < 0.01 && settledFlat; // the default token and reduced motion draw no shear
        verdict("O-179", cell, pass, { first, maxDeg, settled, visibleFrames: visible.length, frames: frames.filter((f, i) => i < 40) });
    } finally {
        await context.close();
    }
}

// A mid-entry paint, separate from the frame trace so the trace stays unperturbed.
async function sheetMidShot(browser, width, theme) {
    const { context, page } = await open(browser, { width, theme, scene: "sheet", query: "&skew=8" });
    try {
        await page.evaluate(() => window.__sheet.open());
        await page.waitForTimeout(70);
        await page.screenshot({ path: join(pngDir, `${label}-${engineName}-o179-mid-${width}-${theme}.png`), clip: { x: Math.max(0, width - 420), y: 0, width: Math.min(420, width), height: 800 } });
    } finally {
        await context.close();
    }
}

// WebKit runs on Playwright's build 2287 (see the header).
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;
const browser = await engine.launch(engineName === "webkit" ? { headless: true, executablePath: WEBKIT_2287 } : { headless: true });
let failed = 0;
try {
    for (const width of WIDTHS) {
        for (const theme of THEMES) {
            for (const [name, fn] of [["O-158", badge], ["O-184", table], ["O-178", popover], ["O-179", sheet]]) {
                try {
                    await fn(browser, width, theme);
                } catch (error) {
                    verdict(name, `${width}-${theme}`, false, { error: String(error).slice(0, 400) });
                }
            }
            try {
                await sheetMidShot(browser, width, theme);
            } catch {}
        }
    }
    for (const [cell, opts] of [["390-light-default", { skew: 0 }], ["390-light-reduced", { skew: 8, reduce: true }]]) {
        try {
            await sheet(browser, 390, "light", opts);
        } catch (error) {
            verdict("O-179", cell, false, { error: String(error).slice(0, 400) });
        }
    }
} finally {
    await browser.close();
}
results.verdicts = verdicts;
const summary = {};
for (const v of verdicts) {
    summary[v.item] ??= { pass: 0, total: 0 };
    summary[v.item].total++;
    if (v.pass) summary[v.item].pass++;
    else failed++;
}
results.summary = summary;
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(results, null, 2));
console.log(JSON.stringify(summary));
process.exit(failed ? 1 : 0);
