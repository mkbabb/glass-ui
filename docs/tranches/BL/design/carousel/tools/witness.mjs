#!/usr/bin/env node
// witness.mjs — the carousel cure's logic witness (docs/tranches/BL/design/carousel/ROOT.md).
//
//   node witness.mjs --engine chromium|webkit --port 5381 --label red|green [--out dir]
//
// One headless browser per run, a new context per cell, everything closed in finally.
// Chromium runs on the GPU lane flags the probe uses; WebKit is Playwright's build (run
// it under guarded --exclusive webkit). Three cells, each at 1440 and 390:
//
//   race   the demo's chevron pager (CarouselPager, the peek exhibit): Next, then Previous
//          `lag` ms later, lag swept 760 to 900 ms. A Previous pressed while Next's
//          900 ms floor is still pending used to have its hold dropped by that floor, and
//          the member it was leaving committed back. Holds: the strip ends on member 0,
//          member 0 is active, and no member other than 0 turns active after Previous.
//   model  the hero page (atlas's shape: a PagerDots bound to the Carousel's v-model):
//          press the dot two ahead. Holds: the strip rests on that member (scrollLeft
//          within 1 px of 2 pitches) and that member is active.
//   held   the demo's chevron pager: Next, then 60 ms later the page's own smooth
//          scrollTo back to member 0, while Next's hold is up. Holds: the strip rests on
//          member 0 and member 0 is active (the counter reads 1).
//
// Added by the fold (fold.md), selected with --cells:
//   resize    the hero page: turn to member 1, change the viewport's width (1440 to
//             1000 with the chevrons, or 390 to 844, a phone turned on its side, with
//             the dots), then press for member 2. Holds: the strip rests on member 2's
//             own offset, member 2 is active and the dots say 3.
//   keyboard  the hero page at 1440, with (link=1) and without a link in each slide:
//             Tab until focus is in the strip, then ArrowRight three times. Holds: the
//             strip turns three members and member 3 is active.
//   reduce    the hero page under prefers-reduced-motion: reduce: press for member 1.
//             Holds: the strip reaches member 1 in one frame (no intermediate offset).
//   noend     an engine without `scrollend`, made by deleting `onscrollend` and
//             stopping the engine's own (trusted) event: the held cell again.
//   frozen    the near-snap tree only (hero, svg, live=slot) without `scrollend`: press
//             Next and wait. Holds: the landed member's figure runs again.
//
// Added by the second fold (fold.md, the 2026-11-24 section):
//   start     the hero page mounted with v-model:active already 2 (start=2). Holds: the
//             strip rests on member 2's own offset, member 2 is active, the dots and the
//             caption say 3, and the strip reaches it with no offset in between.
//   reduce    also counts the strip's `scrollend` events after the instant press.
//
// The third fix seat's reduce cell read only the member left and the member pressed
// for, on the hero; the fourth fold replaced it (below).
//
// Rewritten by the fourth fold (critique-r3.md, the third critic), selected with --cells.
// Every cell below films each frame the strip's offset and opacity and every member's
// ink (the share of its width inside the strip, times its content's opacity, its own
// and the strip's), and presses by a click in the page, so two presses are exact:
//   reduce    under reduced motion, one press for member 1 on three pages: the hero,
//             glass's own Carousel page (centred slides, neighbours peeking) and a strip
//             shaped like fourier's featured row (projection none, 16rem members, a
//             1rem gutter). Holds: the strip rests on member 1 with member 1 active,
//             takes no offset between its start and member 1, seats once, and no
//             member's ink moves more than two fifths in any 17 ms (one 60 Hz frame).
//   retarget  the same, on glass's Carousel page: dots for member 1, then member 2
//             60 ms later, inside the first press's fade-out. Holds also when the strip
//             seats once, on member 2.
//   turn      the same, on the hero: member 1, then member 2 160 ms later, inside the
//             first press's fade-in. Holds with two seats.
//   motion    with motion allowed, one press on the hero and the 16rem strip. Holds
//             when the strip rests on member 1 with member 1 active.
//
// Changed by the fifth fold (critique-r3.md, the fourth critic; the owner's ratified
// choice 8 A: 11.1.2's reduced press arrives at once, and the dip is 11.3.0's):
//   reduce, retarget, turn  still film every member's ink, but hold when the strip seats
//             in one frame (no offset in between), at most one seat a press, on the last
//             member pressed for with that member active, and the active member never
//             steps back. The ink at the seat frame is recorded, not held to two fifths.
// Added by the fifth fold, each recording every offset the strip takes, every change of
// the active member and every scrollend, and holding when the strip rests on the member
// last pressed for with that member active and the active member, once pressed, never
// steps back:
//   swipe     Chromium only (a moving touch): a touch swipe toward member 1 (80 % to
//             20 % of the strip in 150 ms) on the hero, then the press for member 2,
//             `lag` ms after the lift (Next at 1440, the dot at 390), under reduced
//             motion and with motion allowed.
//   wheel     a trackpad-like wheel of 60 % of the strip on the hero (WebKit: bare steps
//             every 16 ms; Chromium: the engine's own phased gesture, since its bare
//             steps snap back to the start), then a press `lag` ms after the last wheel
//             event (Next at 1440, for the member after the one active then; the dot for
//             member 2 at 390), under reduced motion. Lag "none" presses nothing and
//             films where the strip goes by itself; "none-nofade" does the same with the
//             neighbours' dimming transition set to none inline.
//   seatend   under reduced motion, the press for member 1, and inside the strip's first
//             scrollend after it, the press for member 2: the hero and the 16rem strip.
// Writes <out>/witness.<label>.<engine>.json and prints one line per cell.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
// Playwright from the main checkout's node_modules (each tree links it there).
const require = createRequire(join(resolve(HERE, "../../../../../.."), "package.json"));
const pw = require("playwright");

const opt = { engine: "chromium", port: 5381, label: "red", out: resolve(HERE, "../witness"), cells: "race,model,held" };
const a = process.argv.slice(2);
for (let i = 0; i < a.length; i++) {
    if (a[i] === "--engine") opt.engine = a[++i];
    else if (a[i] === "--port") opt.port = +a[++i];
    else if (a[i] === "--label") opt.label = a[++i];
    else if (a[i] === "--out") opt.out = resolve(a[++i]);
    else if (a[i] === "--cells") opt.cells = a[++i];
}
const CELLS = new Set(opt.cells.split(","));
const BASE = `http://127.0.0.1:${opt.port}`;
// An engine without `scrollend`: the handler properties go, and the engine's own event
// is stopped before any listener sees it. A page's synthetic one still passes.
const NO_SCROLLEND = `(() => { for (const o of [window, Window.prototype, Document.prototype, HTMLElement.prototype, Element.prototype, SVGElement.prototype]) { try { delete o.onscrollend; } catch {} } window.addEventListener("scrollend", (e) => { if (e.isTrusted) e.stopImmediatePropagation(); }, true); })();`;
const NO_AUTOPLAY = `(() => { const si = window.setInterval; window.setInterval = function (f, ms, ...r) { if (ms === 4200) return 0; return si.call(this, f, ms, ...r); }; })();`;
const LAGS = [760, 800, 840, 860, 880, 890, 900];
const SWIPE_LAGS = [0, 40, 60, 80, 120, 160, 200, 300];
const WHEEL_LAGS = [0, 100, 200, 300];
const WIDTHS = [
    { w: 1440, h: 900 },
    { w: 390, h: 844 },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function ctxOptions(v) {
    const phone = v.w <= 500;
    const o = { viewport: { width: v.w, height: v.h }, deviceScaleFactor: phone ? 3 : 2, colorScheme: "light", reducedMotion: v.reduce ? "reduce" : "no-preference", hasTouch: phone };
    if (phone && opt.engine === "chromium") o.isMobile = true;
    return o;
}

// In-page: watch the strip's members' data-state and log every change of the active one.
const WATCH = (stripSel) => {
    const strip = document.querySelector(stripSel);
    const kids = () => [...strip.children];
    const act = () => kids().findIndex((k) => k.getAttribute("data-state") === "active");
    window.__w = { log: [{ t: performance.now(), active: act(), sl: strip.scrollLeft }], strip };
    new MutationObserver(() => {
        const i = act();
        const last = window.__w.log[window.__w.log.length - 1];
        if (i !== last.active) window.__w.log.push({ t: performance.now(), active: i, sl: Math.round(strip.scrollLeft) });
    }).observe(strip, { subtree: true, attributes: true, attributeFilter: ["data-state"] });
};

// In-page: wait until scrollLeft and the active member hold still for `quiet` ms.
const SETTLE = async ([stripSel, quiet, max]) => {
    const strip = document.querySelector(stripSel);
    const act = () => [...strip.children].findIndex((k) => k.getAttribute("data-state") === "active");
    const t0 = performance.now();
    let last = [strip.scrollLeft, act()];
    let since = t0;
    for (;;) {
        await new Promise((r) => setTimeout(r, 40));
        const now = [strip.scrollLeft, act()];
        if (now[0] !== last[0] || now[1] !== last[1]) {
            last = now;
            since = performance.now();
        }
        if (performance.now() - since >= quiet || performance.now() - t0 > max) break;
    }
    const kids = [...strip.children];
    return { sl: strip.scrollLeft, pitch: kids[1] ? kids[1].offsetLeft - kids[0].offsetLeft : null, active: act(), n: kids.length };
};

async function open(browser, v, url, init) {
    const context = await browser.newContext(ctxOptions(v));
    for (const s of [].concat(init || [])) await context.addInitScript(s);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
    return { context, page, errors };
}

async function cellRace(browser, v, lag) {
    const root = "[data-testid=carousel-1]";
    const strip = `${root} [data-slot=carousel-content]`;
    const { context, page, errors } = await open(browser, v, `${BASE}/?c=carousel`, NO_AUTOPLAY);
    try {
        await page.waitForSelector(strip, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), root);
        await sleep(700);
        await page.evaluate(WATCH, strip);
        const t = await page.evaluate(
            ([root, lag]) => {
                const next = document.querySelector(`${root} [data-slot=carousel-pager-next]`);
                const prev = document.querySelector(`${root} [data-slot=carousel-pager-prev]`);
                const t0 = performance.now();
                next.click();
                setTimeout(() => {
                    window.__w.prevAt = performance.now();
                    prev.click();
                }, lag);
                return t0;
            },
            [root, lag],
        );
        await sleep(lag + 50);
        const end = await page.evaluate(SETTLE, [strip, 700, 5000]);
        const w = await page.evaluate(() => ({ log: window.__w.log, prevAt: window.__w.prevAt }));
        const counter = await page.evaluate((s) => document.querySelector(s)?.textContent?.trim() ?? null, `${root} [data-slot=carousel-pager-counter]`);
        const log = w.log.map((e) => ({ ...e, t: +(e.t - t).toFixed(1) }));
        const prevAt = +(w.prevAt - t).toFixed(1);
        const afterPrev = log.filter((e) => e.t > prevAt);
        const backToOne = afterPrev.some((e) => e.active !== 0);
        const holds = end.active === 0 && Math.abs(end.sl) <= 1 && !backToOne;
        return { cell: "race", w: v.w, lag, prevAt, end, counter, log, holds, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

async function cellModel(browser, v) {
    const root = "[data-testid=hero-carousel]";
    const strip = `${root} [data-slot=carousel-content]`;
    const { context, page, errors } = await open(browser, v, `${BASE}/?c=carousel-hero&content=none`);
    try {
        await page.waitForSelector(strip, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), root);
        await sleep(700);
        await page.evaluate(WATCH, strip);
        const dot = page.locator(`[data-testid=hero-dock] [data-slot=pager-dots] .pager-dot[aria-label="Go to slide 3"]`);
        const t = await page.evaluate(() => performance.now());
        if (v.w <= 500) await dot.tap();
        else await dot.click();
        await sleep(100);
        const end = await page.evaluate(SETTLE, [strip, 700, 5000]);
        const current = await page.evaluate(() => {
            const dots = [...document.querySelectorAll("[data-testid=hero-dock] .pager-dot")];
            return dots.findIndex((d) => d.getAttribute("aria-current") === "true");
        });
        const log = (await page.evaluate(() => window.__w.log)).map((e) => ({ ...e, t: +(e.t - t).toFixed(1) }));
        const holds = end.active === 2 && end.pitch != null && Math.abs(end.sl - 2 * end.pitch) <= 1;
        return { cell: "model", w: v.w, end, dot: current, log, holds, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

async function cellHeld(browser, v, noEnd = false) {
    const root = "[data-testid=carousel-1]";
    const strip = `${root} [data-slot=carousel-content]`;
    const { context, page, errors } = await open(browser, v, `${BASE}/?c=carousel`, noEnd ? [NO_AUTOPLAY, NO_SCROLLEND] : NO_AUTOPLAY);
    try {
        await page.waitForSelector(strip, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), root);
        await sleep(700);
        await page.evaluate(WATCH, strip);
        const t = await page.evaluate(
            ([root, strip]) => {
                const next = document.querySelector(`${root} [data-slot=carousel-pager-next]`);
                const s = document.querySelector(strip);
                const t0 = performance.now();
                next.click();
                setTimeout(() => s.scrollTo({ left: 0, behavior: "smooth" }), 60);
                return t0;
            },
            [root, strip],
        );
        await sleep(150);
        const end = await page.evaluate(SETTLE, [strip, 700, 5000]);
        const counter = await page.evaluate((s) => document.querySelector(s)?.textContent?.trim() ?? null, `${root} [data-slot=carousel-pager-counter]`);
        const log = (await page.evaluate(() => window.__w.log)).map((e) => ({ ...e, t: +(e.t - t).toFixed(1) }));
        const holds = end.active === 0 && Math.abs(end.sl) <= 1;
        const scrollend = await page.evaluate(() => "onscrollend" in window);
        return { cell: noEnd ? "noend" : "held", w: v.w, end, counter, log, holds, scrollend, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

const HERO = "[data-testid=hero-carousel]";
const HERO_STRIP = `${HERO} [data-slot=carousel-content]`;
// In-page: the strip's state, with each member's own offset from the first.
const STATE = (stripSel) => {
    const strip = document.querySelector(stripSel);
    const kids = [...strip.children];
    const dots = [...document.querySelectorAll("[data-testid=hero-dock] .pager-dot")];
    const f = document.activeElement;
    return {
        sl: Math.round(strip.scrollLeft),
        offsets: kids.map((k) => k.offsetLeft - kids[0].offsetLeft),
        active: kids.findIndex((k) => k.getAttribute("data-state") === "active"),
        dot: dots.findIndex((d) => d.getAttribute("aria-current") === "true"),
        focus: !f || f === document.body ? "body" : f === strip ? "strip" : strip.contains(f) ? `${f.tagName.toLowerCase()} in member ${kids.findIndex((k) => k.contains(f))}` : f.tagName.toLowerCase(),
    };
};

async function heroOpen(browser, v, query = "", init) {
    const r = await open(browser, v, `${BASE}/?c=carousel-hero&content=none${query}`, init);
    await r.page.waitForSelector(HERO_STRIP, { timeout: 20000 });
    await r.page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), HERO);
    await sleep(700);
    return r;
}

// Press for member k: the chevron where it shows, else the dot.
async function pressFor(page, k, from) {
    const next = page.locator("[data-testid=hero-next]");
    if (k === from + 1 && (await next.isVisible())) return next.click();
    const dot = page.locator(`[data-testid=hero-dock] .pager-dot[aria-label="Go to slide ${k + 1}"]`);
    const phone = (page.viewportSize()?.width ?? 1440) <= 500;
    return phone ? dot.tap() : dot.click();
}

async function cellResize(browser, v) {
    const to = v.w <= 500 ? { width: 844, height: 390 } : { width: 1000, height: 900 };
    const { context, page, errors } = await heroOpen(browser, v);
    try {
        await pressFor(page, 1, 0);
        await page.evaluate(SETTLE, [HERO_STRIP, 600, 4000]);
        const before = await page.evaluate(STATE, HERO_STRIP);
        await page.setViewportSize(to);
        await sleep(800);
        const resized = await page.evaluate(STATE, HERO_STRIP);
        await pressFor(page, 2, 1);
        await page.evaluate(SETTLE, [HERO_STRIP, 700, 5000]);
        const end = await page.evaluate(STATE, HERO_STRIP);
        const holds = end.active === 2 && end.dot === 2 && Math.abs(end.sl - end.offsets[2]) <= 1;
        return { cell: "resize", w: v.w, to: to.width, before: { ...before, offsets: before.offsets.slice(0, 3) }, resized: { ...resized, offsets: resized.offsets.slice(0, 3) }, end: { ...end, offsets: end.offsets.slice(0, 3) }, holds, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

async function cellKeyboard(browser, v, link) {
    const { context, page, errors } = await heroOpen(browser, v, link ? "&link=1" : "");
    try {
        await page.mouse.click(4, 4);
        const tabs = [];
        let inStrip = false;
        for (let k = 0; k < 8 && !inStrip; k++) {
            await page.keyboard.press("Tab");
            const st = await page.evaluate(STATE, HERO_STRIP);
            tabs.push(st.focus);
            inStrip = st.focus === "strip" || st.focus.includes(" in member ");
        }
        const steps = [];
        if (inStrip) {
            for (let k = 0; k < 3; k++) {
                await page.keyboard.press("ArrowRight");
                await page.evaluate(SETTLE, [HERO_STRIP, 600, 4000]);
                const st = await page.evaluate(STATE, HERO_STRIP);
                steps.push({ sl: st.sl, active: st.active, focus: st.focus });
            }
        }
        const last = steps[steps.length - 1];
        const holds = !!last && last.active === 3;
        return { cell: link ? "keyboard-link" : "keyboard", w: v.w, tabs, steps, holds, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

// In-page: from now on, each frame, the strip's offset and opacity and every member's
// ink. A member's ink is the share of its width inside the strip, times its content's
// opacity, its own and the strip's: what of it the reader sees.
const FILM = (stripSel) => {
    const strip = document.querySelector(stripSel);
    const t0 = performance.now();
    window.__film = { t0, rows: [], ends: [] };
    strip.addEventListener("scrollend", () => window.__film.ends.push(+(performance.now() - t0).toFixed(1)));
    const op = (e) => (e ? parseFloat(getComputedStyle(e).opacity) : 1);
    const tick = () => {
        const box = strip.getBoundingClientRect();
        const so = op(strip);
        const inks = [...strip.children].map((m) => {
            const r = m.getBoundingClientRect();
            const share = r.width > 0 ? Math.max(0, Math.min(r.right, box.right) - Math.max(r.left, box.left)) / r.width : 0;
            return +(share * so * op(m) * op(m.querySelector(".carousel-item-content"))).toFixed(3);
        });
        window.__film.rows.push([+(performance.now() - t0).toFixed(1), strip.scrollLeft, +so.toFixed(3), inks]);
        if (performance.now() - t0 < 1400) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

// The ink cells' pages: the hero (atlas's shape, full-width members), glass's own Carousel
// page (centred slides, neighbours peeking at both edges) and a strip shaped like
// fourier's featured row (projection none, 16rem members, a 1rem gutter).
const INK_PAGES = {
    hero: { url: "/?c=carousel-hero&content=none", root: HERO },
    stage: { url: "/?c=carousel", root: "[data-testid=carousel-0]" },
    strip16: { url: "/?c=carousel-hero&content=none&projection=none&member=16rem&gutter=1rem", root: HERO },
};

// One ink cell under reduced motion: open `page`, film, and press for each target in
// `presses` ([member, ms after the first press]). A press is the chevron where the page
// shows one and the press is one ahead, else the dot; it is clicked in the page, so the
// gap between two presses is exact.
async function cellInk(browser, v, name, presses, cell, reduce = true) {
    const p = INK_PAGES[name];
    const strip = `${p.root} [data-slot=carousel-content]`;
    const { context, page, errors } = await open(browser, { ...v, reduce }, `${BASE}${p.url}`, NO_AUTOPLAY);
    try {
        await page.waitForSelector(strip, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), p.root);
        await sleep(700);
        const before = await page.evaluate((s) => [...document.querySelector(s).children].findIndex((k) => k.getAttribute("data-state") === "active"), strip);
        await page.evaluate(FILM, strip);
        await page.evaluate(WATCH, strip);
        await sleep(60);
        await page.evaluate(
            ([root, presses, from]) => {
                const target = (k, prev) => {
                    const next = document.querySelector(`${root} [data-testid=hero-next]`);
                    if (k === prev + 1 && next && next.offsetParent !== null) return next;
                    return document.querySelectorAll(`${root} .pager-dot`)[k];
                };
                const at = [];
                let prev = from;
                for (const [k, ms] of presses) {
                    const el = target(k, prev);
                    prev = k;
                    setTimeout(() => {
                        at.push(+(performance.now() - window.__film.t0).toFixed(1));
                        el.click();
                    }, ms);
                }
                window.__pressAt = at;
            },
            [p.root, presses, before],
        );
        await sleep(1500);
        const film = await page.evaluate(() => ({ rows: window.__film.rows, ends: window.__film.ends, at: window.__pressAt }));
        const log = await page.evaluate(() => window.__w.log.map((e) => ({ t: +(e.t - window.__film.t0).toFixed(1), active: e.active })));
        const end = await page.evaluate(SETTLE, [strip, 300, 3000]);
        const offsets = await page.evaluate((s) => { const k = [...document.querySelector(s).children]; return k.map((m) => m.offsetLeft - k[0].offsetLeft); }, strip);
        const goal = presses[presses.length - 1][0];
        const rows = film.rows;
        const start = rows[0][1];
        const to = offsets[goal];
        // Every distinct offset the strip takes after the first press, and any between.
        const seats = [];
        for (let i = 1; i < rows.length; i++) if (Math.abs(rows[i][1] - rows[i - 1][1]) > 1) seats.push(+rows[i][0].toFixed(1));
        const stops = [start, ...presses.map(([k]) => offsets[k])];
        const between = rows.filter(([, x]) => stops.every((y) => Math.abs(x - y) > 1)).length;
        // The largest change of any member's ink between two frames, and within any
        // 17 ms (one 60 Hz frame, so a 120 Hz film is read at the same scale).
        let step = 0;
        let step60 = 0;
        let worst = null;
        const n = rows[0][3].length;
        for (let m = 0; m < n; m++) {
            for (let i = 1; i < rows.length; i++) {
                const d = Math.abs(rows[i][3][m] - rows[i - 1][3][m]);
                if (d > step) step = d;
                for (let j = i - 1; j >= 0 && (j === i - 1 || rows[i][0] - rows[j][0] <= 17.5); j--) {
                    const w = Math.abs(rows[i][3][m] - rows[j][3][m]);
                    if (w > step60) {
                        step60 = w;
                        worst = { member: m, from: [rows[j][0], rows[j][3][m]], to: [rows[i][0], rows[i][3][m]] };
                    }
                }
            }
        }
        // The legs: from the first press to the seat, from the seat until no ink moves.
        const press0 = film.at?.[0] ?? null;
        const seatAt = seats.length ? seats[seats.length - 1] : null;
        let still = null;
        for (let i = rows.length - 1; i > 0; i--) {
            if (rows[i][3].some((x, m) => Math.abs(x - rows[i - 1][3][m]) > 0.001) || Math.abs(rows[i][2] - rows[i - 1][2]) > 0.001) {
                still = rows[i][0];
                break;
            }
        }
        const dim = Math.min(...rows.map((r) => r[2]));
        // Members on screen (ink over 0.01) in the frame before the first press and
        // in the last frame, with their ink.
        const shown = (r) => r[3].map((x, m) => [m, x]).filter(([, x]) => x > 0.01);
        const pre = rows.filter((r) => press0 === null || r[0] < press0).at(-1) ?? rows[0];
        const seated = end.active === goal && Math.abs(end.sl - to) <= 1 && between === 0;
        // Under reduced motion: seated with nothing between, at most one seat a press, and
        // no member's ink moving more than two fifths in a 60 Hz frame. With motion the
        // strip travels, so only the seat is read.
        const stepsBack = backSteps(log, film.at, presses);
        const holds = reduce ? seated && seats.length <= presses.length && stepsBack === 0 : end.active === goal && Math.abs(end.sl - to) <= 1;
        const sample = rows.filter((r, i) => i % 2 === 0 && press0 !== null && r[0] >= press0 - 20 && r[0] <= (still ?? press0) + 20).map(([t, x, so, inks]) => [t, Math.round(x), so, inks.filter((y) => y > 0.005).length ? inks : []]);
        return { cell, page: name, w: v.w, presses, pressAt: film.at, end: { sl: end.sl, active: end.active }, target: to, seats, between, stripMin: dim, outMs: press0 !== null && seatAt !== null ? +(seatAt - press0).toFixed(1) : null, inMs: seatAt !== null && still !== null ? +(still - seatAt).toFixed(1) : null, stillMs: press0 !== null && still !== null ? +(still - press0).toFixed(1) : null, frames: rows.length, step: +step.toFixed(3), step60: +step60.toFixed(3), worst, before: shown(pre), after: shown(rows.at(-1)), scrollends: film.ends, acts: log.map((e) => `${e.t}:${e.active}`).join(" "), stepsBack, seated, holds, sample, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

// In-page, from the first script: every distinct scrollLeft the hero strip takes in
// its first two seconds, so a seat that animates shows its steps.
const TRACK_START = `(() => { window.__seat = []; const t0 = performance.now(); const tick = () => { const s = document.querySelector("[data-testid=hero-carousel] [data-slot=carousel-content]"); if (s) { const x = Math.round(s.scrollLeft); const l = window.__seat[window.__seat.length - 1]; if (!l || l[1] !== x) window.__seat.push([+(performance.now() - t0).toFixed(1), x]); } if (performance.now() - t0 < 2000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); })();`;

async function cellStart(browser, v) {
    const { context, page, errors } = await open(browser, v, `${BASE}/?c=carousel-hero&content=none&start=2`, TRACK_START);
    try {
        await page.waitForSelector(HERO_STRIP, { timeout: 20000 });
        await sleep(2200);
        const end = await page.evaluate(STATE, HERO_STRIP);
        const caption = await page.evaluate(() => document.querySelector(".hero-stage__caption")?.textContent?.trim() ?? null);
        const seat = await page.evaluate(() => window.__seat);
        const target = end.offsets[2];
        const between = seat.filter(([, x]) => x !== 0 && Math.abs(x - target) > 1);
        const holds = end.active === 2 && end.dot === 2 && Math.abs(end.sl - target) <= 1 && between.length === 0;
        return { cell: "start", w: v.w, end: { sl: end.sl, active: end.active, dot: end.dot }, target, caption, seat, between: between.length, holds, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

async function cellFrozen(browser, v) {
    const { context, page, errors } = await open(browser, v, `${BASE}/?c=carousel-hero&content=svg&live=slot`, NO_SCROLLEND);
    try {
        await page.waitForSelector(HERO_STRIP, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), HERO);
        await sleep(700);
        await pressFor(page, 1, 0);
        await sleep(1500);
        const a = await page.evaluate(() => ({ ...(window.__figureStats?.[1] ?? {}) }));
        await sleep(500);
        const b = await page.evaluate(() => ({ ...(window.__figureStats?.[1] ?? {}) }));
        const end = await page.evaluate(STATE, HERO_STRIP);
        const scrollend = await page.evaluate(() => "onscrollend" in window);
        const ran = (b.frames ?? 0) - (a.frames ?? 0);
        const holds = end.active === 1 && ran > 0;
        return { cell: "frozen", w: v.w, end: { sl: end.sl, active: end.active }, framesIn500ms: ran, scrollend, holds, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

// After each press (at `at[i]`, for member presses[i][0]), the number of times the
// active member changes to one that is neither that press's member nor a later press's.
function backSteps(log, at, presses) {
    if (!at?.length) return 0;
    let n = 0;
    for (const e of log) {
        let i = -1;
        for (let j = 0; j < at.length; j++) if (e.t >= at[j]) i = j;
        if (i < 0) continue;
        const allowed = presses.slice(i).map(([k]) => k);
        if (!allowed.includes(e.active)) n++;
    }
    return n;
}

// In-page: from now on, every offset the strip takes, every change of its active member
// and every scrollend, with times from now.
const TRACE = (stripSel) => {
    const strip = document.querySelector(stripSel);
    const t0 = performance.now();
    const now = () => +(performance.now() - t0).toFixed(1);
    const act = () => [...strip.children].findIndex((k) => k.getAttribute("data-state") === "active");
    const tr = (window.__tr = { t0, xs: [], acts: [[0, act()]], ends: [], at: [], from: [], lift: null, lastWheel: null });
    tr.act = act;
    strip.addEventListener("scrollend", () => tr.ends.push(now()));
    strip.addEventListener("wheel", () => (tr.lastWheel = performance.now()), { passive: true });
    new MutationObserver(() => {
        const i = act();
        if (i !== tr.acts[tr.acts.length - 1][1]) tr.acts.push([now(), i]);
    }).observe(strip, { subtree: true, attributes: true, attributeFilter: ["data-state"] });
    const tick = () => {
        const x = Math.round(strip.scrollLeft);
        const l = tr.xs[tr.xs.length - 1];
        if (!l || l[1] !== x) tr.xs.push([now(), x]);
        if (performance.now() - t0 < 5000) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

// In-page: the control that presses for member k (Next, or the dot).
const PRESS_EL = `window.__pressEl = (root, k, dot) => dot ? document.querySelectorAll(root + " .pager-dot")[k] : document.querySelector(root + " [data-testid=hero-next]");`;

async function traceEnd(page, strip, goal, cellName, extra) {
    // goal is reassigned below for a Next press
    await sleep(400);
    const end = await page.evaluate(SETTLE, [strip, 500, 4000]);
    const tr = await page.evaluate(() => window.__tr);
    const offsets = await page.evaluate((s) => { const k = [...document.querySelector(s).children]; return k.map((m) => m.offsetLeft - k[0].offsetLeft); }, strip);
    const pressAt = tr.at.length ? tr.at[tr.at.length - 1] : null;
    // A Next press is for the member after the one active when it is pressed.
    if (extra.press === "next" && tr.from.length) goal = tr.from[tr.from.length - 1] + 1;
    const after = pressAt === null ? [] : tr.acts.filter(([t]) => t >= pressAt);
    const back = after.filter(([, a]) => a !== goal).length;
    const rests = offsets.findIndex((o) => Math.abs(o - end.sl) <= 1);
    const lands = goal === null ? null : end.active === goal && Math.abs(end.sl - offsets[goal]) <= 1;
    const holds = goal === null ? null : lands && back === 0;
    const verdict = goal === null ? `rests on ${rests}, member ${end.active} active` : holds ? `member ${goal}` : rests === end.active ? `lost (rests on ${rests}, member ${end.active} active)` : `rests on ${rests}, member ${end.active} active`;
    return { cell: cellName, ...extra, goal, pressAt, lift: tr.lift, lastWheel: tr.lastWheel, end: { sl: Math.round(end.sl), active: end.active }, rests, acts: tr.acts.map(([t, a]) => `${t}:${a}`).join(" "), ends: tr.ends, xs: tr.xs, lands, back, holds, verdict };
}

// A touch swipe toward member 1, then the press for member 2 `lag` ms after the lift.
async function cellSwipe(browser, v, lag, reduce) {
    const { context, page, errors } = await open(browser, { ...v, reduce }, `${BASE}/?c=carousel-hero&content=none`, [NO_AUTOPLAY, PRESS_EL]);
    try {
        await page.waitForSelector(HERO_STRIP, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), HERO);
        await sleep(700);
        const cdp = await context.newCDPSession(page);
        const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }, HERO_STRIP);
        const y = b.y + Math.min(b.h / 2, 300);
        await page.evaluate(TRACE, HERO_STRIP);
        await page.evaluate(([root, lag, dot]) => {
            const el = window.__pressEl(root, 2, dot);
            window.addEventListener("touchend", () => {
                const tr = window.__tr;
                tr.lift = +(performance.now() - tr.t0).toFixed(1);
                setTimeout(() => {
                    tr.at.push(+(performance.now() - tr.t0).toFixed(1));
                    tr.from.push(tr.act());
                    el.click();
                }, lag);
            }, { once: true, capture: true, passive: true });
        }, [HERO, lag, v.w <= 500]);
        const touch = (type, x) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
        const from = b.x + b.w * 0.8;
        const to = b.x + b.w * 0.2;
        const n = 9;
        await touch("touchStart", from);
        const t0 = Date.now();
        for (let k = 1; k <= n; k++) {
            await touch("touchMove", from + ((to - from) * k) / n);
            const wait = t0 + (k * 150) / n - Date.now();
            if (wait > 0) await sleep(wait);
        }
        await touch("touchEnd", to);
        await sleep(lag);
        return { ...(await traceEnd(page, HERO_STRIP, 2, "swipe", { w: v.w, lag, reduce, press: v.w <= 500 ? "dot" : "next" })), errors };
    } finally {
        await context.close().catch(() => {});
    }
}

// A trackpad-like wheel of 60 % of the strip, then the press for member 2 `lag` ms after
// the last wheel event, or no press (lag null).
async function cellWheel(browser, v, lag, nofade = false) {
    const { context, page, errors } = await open(browser, { ...v, reduce: true }, `${BASE}/?c=carousel-hero&content=none`, [NO_AUTOPLAY, PRESS_EL]);
    try {
        await page.waitForSelector(HERO_STRIP, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), HERO);
        await sleep(700);
        if (nofade) await page.evaluate((s) => { for (const m of document.querySelector(s).children) m.style.setProperty("transition", "none", "important"); }, HERO_STRIP);
        const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + Math.min(r.height / 2, 300), w: r.width }; }, HERO_STRIP);
        await page.mouse.move(b.x, b.y);
        await page.evaluate(TRACE, HERO_STRIP);
        if (opt.engine === "chromium") {
            // Chromium's bare wheel steps snap back to the start; its trackpad-like input
            // is the engine's own phased gesture, as in the probe's Chromium wheel cell.
            const cdp = await context.newCDPSession(page);
            await cdp.send("Input.synthesizeScrollGesture", { x: b.x, y: b.y, xDistance: -Math.round(b.w * 0.6), yDistance: 0, speed: 1200, gestureSourceType: "mouse", preventFling: false });
        } else {
            const shape = [];
            for (let k = 1; k <= 8; k++) shape.push(k);
            let s = 8;
            for (let k = 0; k < 26; k++) shape.push((s *= 0.86));
            const sum = shape.reduce((x, y) => x + y, 0);
            const total = b.w * 0.6;
            const start = Date.now();
            let acc = 0;
            for (let k = 0; k < shape.length; k++) {
                const step = (shape[k] / sum) * total;
                acc += step;
                const dx = Math.round(acc) - Math.round(acc - step);
                if (dx) await page.mouse.wheel(dx, 0);
                const wait = start + (k + 1) * 16 - Date.now();
                if (wait > 0) await sleep(wait);
            }
        }
        if (lag !== null) {
            await page.evaluate(([root, lag, dot]) => {
                const tr = window.__tr;
                const el = window.__pressEl(root, 2, dot);
                setTimeout(() => {
                    tr.at.push(+(performance.now() - tr.t0).toFixed(1));
                    tr.from.push(tr.act());
                    el.click();
                }, Math.max(0, tr.lastWheel + lag - performance.now()));
            }, [HERO, lag, v.w <= 500]);
            await sleep(lag);
        }
        await sleep(600);
        const r = await traceEnd(page, HERO_STRIP, lag === null ? null : 2, "wheel", { w: v.w, lag: lag === null ? (nofade ? "none-nofade" : "none") : lag, press: v.w <= 500 ? "dot" : "next" });
        r.lastWheel = r.lastWheel === null ? null : +(r.lastWheel - (await page.evaluate(() => window.__tr.t0))).toFixed(1);
        return { ...r, errors };
    } finally {
        await context.close().catch(() => {});
    }
}

// Under reduced motion: the press for member 1, and inside the strip's first scrollend
// after it, the press for member 2.
async function cellSeatEnd(browser, v, name) {
    const p = INK_PAGES[name];
    const strip = `${p.root} [data-slot=carousel-content]`;
    const { context, page, errors } = await open(browser, { ...v, reduce: true }, `${BASE}${p.url}`, [NO_AUTOPLAY, PRESS_EL]);
    try {
        await page.waitForSelector(strip, { timeout: 20000 });
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), p.root);
        await sleep(700);
        await page.evaluate(TRACE, strip);
        await page.evaluate(([root, s, dot]) => {
            const tr = window.__tr;
            const first = window.__pressEl(root, 1, dot);
            const second = window.__pressEl(root, 2, dot);
            document.querySelector(s).addEventListener("scrollend", () => {
                tr.at.push(+(performance.now() - tr.t0).toFixed(1));
                second.click();
            }, { once: true });
            tr.at.push(+(performance.now() - tr.t0).toFixed(1));
            first.click();
        }, [p.root, strip, v.w <= 500]);
        return { ...(await traceEnd(page, strip, 2, "seatend", { w: v.w, page: name })), errors };
    } finally {
        await context.close().catch(() => {});
    }
}

async function main() {
    mkdirSync(opt.out, { recursive: true });
    let browser;
    const rows = [];
    try {
        browser = await pw[opt.engine].launch({ headless: true, args: opt.engine === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [] });
        const err = (cell, v, e) => ({ cell, w: v.w, error: String(e.message || e).slice(0, 300) });
        for (const v of WIDTHS) {
            if (CELLS.has("race")) for (const lag of LAGS) rows.push(await cellRace(browser, v, lag).catch((e) => ({ ...err("race", v, e), lag })));
            if (CELLS.has("model")) rows.push(await cellModel(browser, v).catch((e) => err("model", v, e)));
            if (CELLS.has("held")) rows.push(await cellHeld(browser, v).catch((e) => err("held", v, e)));
            if (CELLS.has("resize")) rows.push(await cellResize(browser, v).catch((e) => err("resize", v, e)));
            if (CELLS.has("keyboard") && v.w > 500) {
                rows.push(await cellKeyboard(browser, v, false).catch((e) => err("keyboard", v, e)));
                rows.push(await cellKeyboard(browser, v, true).catch((e) => err("keyboard-link", v, e)));
            }
            if (CELLS.has("reduce")) for (const name of ["hero", "stage", "strip16"]) rows.push(await cellInk(browser, v, name, [[1, 0]], "reduce").catch((e) => ({ ...err("reduce", v, e), page: name })));
            if (CELLS.has("retarget")) rows.push(await cellInk(browser, v, "stage", [[1, 0], [2, 60]], "retarget").catch((e) => ({ ...err("retarget", v, e), page: "stage" })));
            if (CELLS.has("motion")) for (const name of ["hero", "strip16"]) rows.push(await cellInk(browser, v, name, [[1, 0]], "motion", false).catch((e) => ({ ...err("motion", v, e), page: name })));
            if (CELLS.has("turn")) rows.push(await cellInk(browser, v, "hero", [[1, 0], [2, 160]], "turn").catch((e) => ({ ...err("turn", v, e), page: "hero" })));
            if (CELLS.has("noend")) rows.push(await cellHeld(browser, v, true).catch((e) => err("noend", v, e)));
            if (CELLS.has("frozen")) rows.push(await cellFrozen(browser, v).catch((e) => err("frozen", v, e)));
            if (CELLS.has("start")) rows.push(await cellStart(browser, v).catch((e) => err("start", v, e)));
            if (CELLS.has("swipe") && opt.engine === "chromium") for (const reduce of [true, false]) for (const lag of SWIPE_LAGS) rows.push(await cellSwipe(browser, v, lag, reduce).catch((e) => ({ ...err("swipe", v, e), lag, reduce })));
            if (CELLS.has("wheel")) {
                rows.push(await cellWheel(browser, v, null).catch((e) => ({ ...err("wheel", v, e), lag: "none" })));
                rows.push(await cellWheel(browser, v, null, true).catch((e) => ({ ...err("wheel", v, e), lag: "none-nofade" })));
                for (const lag of WHEEL_LAGS) rows.push(await cellWheel(browser, v, lag).catch((e) => ({ ...err("wheel", v, e), lag })));
            }
            if (CELLS.has("seatend")) for (const name of ["hero", "strip16"]) rows.push(await cellSeatEnd(browser, v, name).catch((e) => ({ ...err("seatend", v, e), page: name })));
        }
        const meta = { engine: opt.engine, browserVersion: browser.version(), label: opt.label, port: opt.port, cells: opt.cells, when: new Date().toISOString() };
        writeFileSync(join(opt.out, `witness.${opt.label}.${opt.engine}.json`), JSON.stringify({ meta, rows }, null, 1));
        for (const r of rows) console.log(JSON.stringify({ label: opt.label, engine: opt.engine, ...r, log: r.log?.map((e) => `${e.t}:${e.active}`).join(" "), sample: undefined, xs: r.xs ? r.xs.length : undefined }));
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}

main().catch((e) => {
    console.error("witness failed:", e && e.stack ? e.stack : e);
    process.exit(1);
});
