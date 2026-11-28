// probe-sci4.mjs <engine> <out.json> <name>=<url> ...
// The fifth critic's probe (2026-11-27, on v8). One browser per run, a context per cell and
// build, each closed in finally. Chromium's 390 cell swipes by CDP touch; WebKit is read for
// sizes, computed styles, offsets and frames only.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium, webkit } = require("playwright");
const [engineName, out, ...specs] = process.argv.slice(2);
const builds = specs.map((s) => { const i = s.indexOf("="); return { name: s.slice(0, i), url: s.slice(i + 1) }; });
const engine = engineName === "webkit" ? webkit : chromium;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CELLS = [
    { name: "390t", viewport: { width: 390, height: 844 }, touch: true },
    { name: "1440", viewport: { width: 1440, height: 900 }, touch: false },
];
const rec = { engine: engineName, rows: [] };
const row = (r) => { rec.rows.push(r); console.log(JSON.stringify(r)); };
const r1 = (v) => Math.round(v * 10) / 10;

async function fresh(context, url) {
    const page = await context.newPage();
    await page.goto(url + "/sci4.html", { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await sleep(900);
    return page;
}

async function place(page, sel, y = 300) {
    return page.evaluate(([sel, y]) => {
        const el = document.querySelector(sel);
        const r0 = el.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + r0.top - y, behavior: "instant" });
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
    }, [sel, y]);
}

async function swipe(cdp, x0, y0, x1, y1, n = 12, gap = 16) {
    const t = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
    await t("touchStart", x0, y0);
    for (let i = 1; i <= n; i++) {
        await t("touchMove", x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n);
        await sleep(gap);
    }
    await t("touchEnd");
    await sleep(700);
}

// A ConfiguratorLayer cell: the column, the region's wrapper, the body and the probed parts.
const cfgState = (page, id) => page.evaluate((id) => {
    const r1 = (v) => Math.round(v * 10) / 10;
    const col = document.querySelector(`[data-testid="${id}"]`);
    const wrap = col.querySelector(".configurator-layer-region > div");
    const body = col.querySelector(".configurator-layer-body");
    const cs = getComputedStyle(wrap);
    const o = { col: `${col.scrollWidth}/${col.clientWidth}`, sl: col.scrollLeft, wrap: `${cs.overflowX}/${cs.overflowY}`, wrapMinW: cs.minWidth, wrapW: r1(wrap.getBoundingClientRect().width), bodyW: r1(body.getBoundingClientRect().width) };
    const cut = (el) => el ? { w: r1(el.getBoundingClientRect().width), sw: el.scrollWidth, cw: el.clientWidth, truncated: el.scrollWidth > el.clientWidth } : null;
    if (id === "cfg-row") {
        const spans = [...col.querySelectorAll(".configurator-row .truncate")];
        o.parts = spans.map((s) => ({ text: s.textContent.trim().slice(0, 24), ...cut(s) }));
        o.rowW = r1(col.querySelector(".configurator-row").getBoundingClientRect().width);
    }
    if (id === "cfg-trunc") o.trunc = cut(col.querySelector('[data-probe="trunc"]'));
    if (id === "cfg-break") {
        const dd = col.querySelector('[data-probe="dd"]');
        const rr = dd.getBoundingClientRect();
        o.dd = { w: r1(rr.width), h: r1(rr.height), lineH: parseFloat(getComputedStyle(dd).lineHeight) };
    }
    if (id === "cfg-tabs") {
        const s = col.querySelector(".segmented-tabs");
        o.strip = { w: r1(s.getBoundingClientRect().width), sw: s.scrollWidth, cw: s.clientWidth, flag: s.hasAttribute("data-overflow"), ox: getComputedStyle(s).overflowX };
    }
    return o;
}, id);

const stripState = (page, id) => page.evaluate((id) => {
    const r1 = (v) => Math.round(v * 10) / 10;
    const box = document.querySelector(`[data-testid="${id}"]`);
    const s = box.querySelector(".segmented-tabs");
    const sr = s.getBoundingClientRect();
    const a = s.querySelector(".segmented-tab[data-active]");
    const ar = a.getBoundingClientRect();
    const inside = Math.max(0, Math.min(ar.right, sr.right) - Math.max(ar.left, sr.left));
    return {
        boxH: r1(box.getBoundingClientRect().height), stripTop: r1(sr.top - box.getBoundingClientRect().top), stripW: r1(sr.width), stripH: r1(sr.height),
        flag: s.hasAttribute("data-overflow"), sl: r1(s.scrollLeft), sw: s.scrollWidth, cw: s.clientWidth,
        share: Math.round((inside / ar.width) * 100), maxW: getComputedStyle(s).maxWidth,
    };
}, id);

try {
    var browser = await engine.launch({ headless: true });
    rec.version = browser.version();
    for (const cell of CELLS) {
        for (const b of builds) {
            const context = await browser.newContext({ viewport: cell.viewport, hasTouch: cell.touch, isMobile: cell.touch && engineName === "chromium", deviceScaleFactor: 2, colorScheme: "light", reducedMotion: "no-preference" });
            try {
                const touch = cell.touch && engineName === "chromium";
                const page = await fresh(context, b.url);
                const cdp = touch ? await context.newCDPSession(page) : null;
                const base = { cell: cell.name, build: b.name };

                // ── A. ConfiguratorLayer bodies ──
                for (const id of ["cfg-row", "cfg-trunc", "cfg-break", "cfg-tabs", "cfg-wide"]) {
                    const r = await place(page, `[data-testid="${id}"]`);
                    const s = await cfgState(page, id);
                    let pan = null;
                    if (cdp) {
                        const y = r.y + Math.min(r.h - 10, 60);
                        await swipe(cdp, r.x + 170, y, r.x + 20, y);
                        pan = await page.evaluate((id) => document.querySelector(`[data-testid="${id}"]`).scrollLeft, id);
                        await page.evaluate((id) => document.querySelector(`[data-testid="${id}"]`).scrollTo({ left: 0, behavior: "instant" }), id);
                    }
                    row({ ...base, case: id, ...s, pan });
                }

                // ── B. A strip set inline in a block box: the box's height with and without the flag ──
                {
                    const a = await stripState(page, "inl");
                    await page.evaluate(() => { document.querySelector('[data-testid="inl"]').style.inlineSize = "1200px"; });
                    await sleep(500);
                    const b2 = await stripState(page, "inl");
                    await page.evaluate(() => { document.querySelector('[data-testid="inl"]').style.inlineSize = "267px"; });
                    await sleep(700);
                    const c = await stripState(page, "inl");
                    row({ ...base, case: "inline strip: 267, 1200, 267", at267: a, at1200: b2, back: c });
                }

                // ── C. The reader pans, then a tab that is not chosen changes its label ──
                {
                    const a = await stripState(page, "pan");
                    await page.evaluate(() => document.querySelector('[data-testid="pan"] .segmented-tabs').scrollTo({ left: 300, behavior: "instant" }));
                    await sleep(600);
                    const panned = await stripState(page, "pan");
                    await page.evaluate(() => window.__relabel(5, "Transportation · 12"));
                    await sleep(1000);
                    const after = await stripState(page, "pan");
                    row({ ...base, case: "panned, then a label changes", atLoad: a, panned, after });
                }

                // ── D. Right to left, the last tab chosen at load ──
                row({ ...base, case: "rtl, last chosen", ...(await stripState(page, "rtl")) });

                // ── E. The vertical strip in a 100 px box ──
                row({ ...base, case: "vertical in 100 px", ...(await page.evaluate(() => {
                    const r1 = (v) => Math.round(v * 10) / 10;
                    const s = document.querySelector('[data-testid="vert"] .segmented-tabs');
                    const tabs = [...s.querySelectorAll(".segmented-tab")];
                    const tt = tabs.find((x) => x.textContent.includes("Transportation"));
                    const range = document.createRange();
                    range.selectNodeContents(tt);
                    const txt = range.getBoundingClientRect();
                    const tr = tt.getBoundingClientRect();
                    return { stripW: r1(s.getBoundingClientRect().width), maxW: getComputedStyle(s).maxWidth, tabW: r1(tr.width), textPastTab: r1(txt.right - tr.right), flag: s.hasAttribute("data-overflow") };
                })) });

                // ── F. The box's width animates (267 → 200 over 400 ms) with the last tab chosen ──
                {
                    const a = await stripState(page, "anim");
                    const fr = page.evaluate(() => window.__frames('[data-testid="anim"]', 45));
                    await page.evaluate(() => { document.querySelector('[data-testid="anim"]').style.inlineSize = "200px"; });
                    const frames = await fr;
                    await sleep(400);
                    const end = await stripState(page, "anim");
                    const t0 = frames[0].t;
                    let maxStep = 0;
                    for (let i = 1; i < frames.length; i++) maxStep = Math.max(maxStep, Math.abs(frames[i].sl - frames[i - 1].sl));
                    row({ ...base, case: "box width animates 267 → 200", atLoad: a, end, minShare: Math.min(...frames.map((f) => f.share)), maxStep: r1(maxStep), frames: frames.filter((_, i) => i % 3 === 0).map((f) => `${f.t - t0}:${f.sl}:${f.share}`).join(" ") });
                }

                // ── G. The three-seat dock ──
                row({ ...base, case: "dock fit", ...(await page.evaluate(() => {
                    const root = document.querySelector('[data-testid="d-fit"] .glass-dock');
                    const run = document.querySelector('[data-testid="d-fit"] .dock-run.is-active') || document.querySelector('[data-testid="d-fit"] .dock-run');
                    return { fits: root.hasAttribute("data-run-fits"), ta: getComputedStyle(run).touchAction, run: `${run.scrollWidth}/${run.clientWidth}` };
                })) });

                await page.close();
            } finally {
                await context.close();
            }
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(out, JSON.stringify(rec, null, 1));
}
