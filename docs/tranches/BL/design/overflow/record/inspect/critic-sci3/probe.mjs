// probe.mjs <engine> <out.json> <name>=<url> ...
// The critic's witness: one browser per run, a context per cell and build, closed in finally.
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

async function fresh(context, url) {
    const page = await context.newPage();
    await page.goto(url + "/sci.html", { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await sleep(900);
    await page.evaluate(() => {
        window.__pe = { move: 0, cancel: 0 };
        document.addEventListener("pointermove", () => window.__pe.move++, true);
        document.addEventListener("pointercancel", () => window.__pe.cancel++, true);
    });
    return page;
}

// Bring a cell to y ~ 520 so a 240 px upward swipe stays on screen; return its rect.
async function place(page, sel, y = 520) {
    return page.evaluate(([sel, y]) => {
        const el = document.querySelector(sel);
        const r0 = el.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + r0.top - y, behavior: "instant" });
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
    }, [sel, y]);
}

async function swipe(cdp, x0, y0, x1, y1, n = 12, gap = 16, mid) {
    const t = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
    await t("touchStart", x0, y0);
    for (let i = 1; i <= n; i++) {
        await t("touchMove", x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n);
        await sleep(gap);
    }
    const atEnd = mid ? await mid() : null;
    await t("touchEnd");
    await sleep(700);
    return atEnd;
}

const resetPe = (page) => page.evaluate(() => { window.__pe.move = 0; window.__pe.cancel = 0; });
const pe = (page) => page.evaluate(() => ({ ...window.__pe }));

function dockState(page, sel) {
    return page.evaluate((sel) => {
        const root = document.querySelector(sel + " .glass-dock");
        const run = document.querySelector(sel + " .dock-run.is-active") || document.querySelector(sel + " .dock-run");
        const cs = getComputedStyle(run);
        const seats = [...run.children].filter((c) => c instanceof HTMLElement && c.offsetParent === run);
        return {
            fits: root.hasAttribute("data-run-fits"),
            ta: cs.touchAction,
            sw: run.scrollWidth, cw: run.clientWidth, sl: run.scrollLeft,
            rootW: Math.round(root.getBoundingClientRect().width * 10) / 10,
            seat: seats[1] ? (() => { const r = seats[1].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })() : null,
        };
    }, sel);
}

try {
    var browser = await engine.launch({ headless: true });
    rec.version = browser.version();
    for (const cell of CELLS) {
        for (const b of builds) {
            const context = await browser.newContext({ viewport: cell.viewport, hasTouch: cell.touch, isMobile: cell.touch && engineName === "chromium", deviceScaleFactor: 2, colorScheme: "light", reducedMotion: "no-preference" });
            try {
                const touch = cell.touch && engineName === "chromium";
                // ── A. the three-seat dock that fits ──
                {
                    const page = await fresh(context, b.url);
                    const cdp = touch ? await context.newCDPSession(page) : null;
                    await place(page, '[data-testid="d-fit"]');
                    const s = await dockState(page, '[data-testid="d-fit"]');
                    row({ cell: cell.name, build: b.name, case: "dock-fit static", ...s, seat: undefined });
                    if (cdp) {
                        for (const drift of [0, 16, 48]) {
                            await place(page, '[data-testid="d-fit"]');
                            const st = await dockState(page, '[data-testid="d-fit"]');
                            const y0 = await page.evaluate(() => window.scrollY);
                            await resetPe(page);
                            await swipe(cdp, st.seat.x, st.seat.y, st.seat.x + drift, st.seat.y - 240);
                            const after = await dockState(page, '[data-testid="d-fit"]');
                            const y1 = await page.evaluate(() => window.scrollY);
                            row({ cell: cell.name, build: b.name, case: `dock-fit up240 drift${drift}`, page: Math.round(y1 - y0), runPan: after.sl - st.sl, ...(await pe(page)) });
                            await page.evaluate(() => { for (const r of document.querySelectorAll(".dock-run")) r.scrollTo({ left: 0, behavior: "instant" }); });
                        }
                    }
                    await page.close();
                }
                // ── B. the three-seat dock squeezed k px under what it asks ──
                {
                    const page = await fresh(context, b.url);
                    const cdp = touch ? await context.newCDPSession(page) : null;
                    await place(page, '[data-testid="d-sq"]');
                    const natural = (await dockState(page, '[data-testid="d-sq"]')).rootW;
                    for (const k of [2, 4, 8, 12]) {
                        await page.evaluate(([w]) => { document.querySelector('[data-testid="d-sq"]').style.inlineSize = w + "px"; }, [natural - k]);
                        await sleep(600);
                        await page.evaluate(() => { for (const r of document.querySelectorAll(".dock-run")) r.scrollTo({ left: 0, behavior: "instant" }); });
                        await place(page, '[data-testid="d-sq"]');
                        const s = await dockState(page, '[data-testid="d-sq"]');
                        row({ cell: cell.name, build: b.name, case: `dock-sq k${k} static`, natural, ...s, seat: undefined });
                        if (cdp) {
                            for (const drift of [0, 16, 48]) {
                                await place(page, '[data-testid="d-sq"]');
                                await page.evaluate(() => { for (const r of document.querySelectorAll(".dock-run")) r.scrollTo({ left: 0, behavior: "instant" }); });
                                await sleep(100);
                                const st = await dockState(page, '[data-testid="d-sq"]');
                                const y0 = await page.evaluate(() => window.scrollY);
                                await resetPe(page);
                                await swipe(cdp, st.seat.x, st.seat.y, st.seat.x + drift, st.seat.y - 240);
                                const after = await dockState(page, '[data-testid="d-sq"]');
                                const y1 = await page.evaluate(() => window.scrollY);
                                row({ cell: cell.name, build: b.name, case: `dock-sq k${k} up240 drift${drift}`, page: Math.round(y1 - y0), runPan: after.sl - st.sl, ...(await pe(page)) });
                            }
                        }
                    }
                    await page.close();
                }
                // ── C. ConfiguratorLayer columns ──
                {
                    const page = await fresh(context, b.url);
                    const cdp = touch ? await context.newCDPSession(page) : null;
                    for (const id of ["cfg-chip", "cfg-code", "cfg-closed"]) {
                        const r = await place(page, `[data-testid="${id}"]`, 300);
                        const s = await page.evaluate((id) => {
                            const col = document.querySelector(`[data-testid="${id}"]`);
                            const wrap = col.querySelector(".configurator-layer-region > div");
                            const cs = getComputedStyle(wrap);
                            return { sw: col.scrollWidth, cw: col.clientWidth, ox: cs.overflowX, oy: cs.overflowY };
                        }, id);
                        let pan = null;
                        if (cdp) {
                            const yy = r.y + Math.min(r.h, 120) - 30;
                            await swipe(cdp, r.x + 180, yy, r.x + 30, yy);
                            pan = await page.evaluate((id) => document.querySelector(`[data-testid="${id}"]`).scrollLeft, id);
                        }
                        row({ cell: cell.name, build: b.name, case: id, ...s, colPan: pan });
                    }
                    await page.close();
                }
                // ── D. the strip in a none box, fitting and overflowing; the plain box ──
                {
                    for (const id of ["none-fit", "none-over", "plain-over"]) {
                        const page = await fresh(context, b.url);
                        const cdp = touch ? await context.newCDPSession(page) : null;
                        await place(page, `[data-testid="${id}"]`);
                        const s = await page.evaluate((id) => {
                            const strip = document.querySelector(`[data-testid="${id}"] .segmented-tabs`);
                            const tab = strip.querySelectorAll(".segmented-tab")[1];
                            const r = tab.getBoundingClientRect();
                            return { flag: strip.hasAttribute("data-overflow"), ox: getComputedStyle(strip).overflowX, ta: getComputedStyle(tab).touchAction, sw: strip.scrollWidth, cw: strip.clientWidth, tab: { x: r.left + Math.min(r.width / 2, 20), y: r.top + r.height / 2 } };
                        }, id);
                        let g = {};
                        if (cdp) {
                            const y0 = await page.evaluate(() => window.scrollY);
                            await resetPe(page);
                            await swipe(cdp, s.tab.x, s.tab.y, s.tab.x, s.tab.y - 240);
                            const y1 = await page.evaluate(() => window.scrollY);
                            g = { page: Math.round(y1 - y0), ...(await pe(page)) };
                        }
                        row({ cell: cell.name, build: b.name, case: id, ...s, tab: undefined, ...g });
                        await page.close();
                    }
                }
                // ── E. the detented bottom Sheet: a slow 70 px drag down from a header tab ──
                for (const id of ["hdr-fit", "hdr-over"]) {
                    const page = await fresh(context, b.url);
                    const cdp = touch ? await context.newCDPSession(page) : null;
                    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
                    await page.click('[data-testid="open-sheet"]');
                    await sleep(1400);
                    const s = await page.evaluate((id) => {
                        const sheet = document.querySelector('[data-testid="sheet"]');
                        const strip = document.querySelector(`[data-testid="${id}"] .segmented-tabs`);
                        const tab = strip.querySelectorAll(".segmented-tab")[1];
                        const hdr = sheet.querySelector('[data-slot="dialog-header"]');
                        const r = tab.getBoundingClientRect();
                        return { top: sheet.getBoundingClientRect().top, flag: strip.hasAttribute("data-overflow"), ox: getComputedStyle(strip).overflowX, taStrip: getComputedStyle(strip).touchAction, taTab: getComputedStyle(tab).touchAction, taHdr: getComputedStyle(hdr).touchAction, sw: strip.scrollWidth, cw: strip.clientWidth, tab: { x: r.left + Math.min(r.width / 2, 20), y: r.top + r.height / 2 } };
                    }, id);
                    let g = {};
                    if (cdp) {
                        await resetPe(page);
                        const follows = await swipe(cdp, s.tab.x, s.tab.y, s.tab.x, s.tab.y + 70, 30, 16, () => page.evaluate(() => document.querySelector('[data-testid="sheet"]').getBoundingClientRect().top));
                        g = { follows: Math.round(follows - s.top), ...(await pe(page)) };
                    }
                    row({ cell: cell.name, build: b.name, case: `sheet ${id}`, ...s, tab: undefined, top: undefined, ...g });
                    await page.close();
                }
            } finally {
                await context.close();
            }
        }
    }
} finally {
    await browser?.close();
    writeFileSync(out, JSON.stringify(rec, null, 1));
}
