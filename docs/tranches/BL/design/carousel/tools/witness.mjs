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
// Writes <out>/witness.<label>.<engine>.json and prints one line per cell.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(resolve(HERE, "../trees/red"), "package.json"));
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
        const maxSeats = cell === "retarget" ? 1 : presses.length;
        const holds = reduce ? seated && step60 <= 0.4 && seats.length <= maxSeats : end.active === goal && Math.abs(end.sl - to) <= 1;
        const sample = rows.filter((r, i) => i % 2 === 0 && press0 !== null && r[0] >= press0 - 20 && r[0] <= (still ?? press0) + 20).map(([t, x, so, inks]) => [t, Math.round(x), so, inks.filter((y) => y > 0.005).length ? inks : []]);
        return { cell, page: name, w: v.w, presses, pressAt: film.at, end: { sl: end.sl, active: end.active }, target: to, seats, between, stripMin: dim, outMs: press0 !== null && seatAt !== null ? +(seatAt - press0).toFixed(1) : null, inMs: seatAt !== null && still !== null ? +(still - seatAt).toFixed(1) : null, stillMs: press0 !== null && still !== null ? +(still - press0).toFixed(1) : null, frames: rows.length, step: +step.toFixed(3), step60: +step60.toFixed(3), worst, before: shown(pre), after: shown(rows.at(-1)), scrollends: film.ends, seated, holds, sample, errors };
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
        }
        const meta = { engine: opt.engine, browserVersion: browser.version(), label: opt.label, port: opt.port, cells: opt.cells, when: new Date().toISOString() };
        writeFileSync(join(opt.out, `witness.${opt.label}.${opt.engine}.json`), JSON.stringify({ meta, rows }, null, 1));
        for (const r of rows) console.log(JSON.stringify({ label: opt.label, engine: opt.engine, ...r, log: r.log?.map((e) => `${e.t}:${e.active}`).join(" "), sample: undefined }));
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}

main().catch((e) => {
    console.error("witness failed:", e && e.stack ? e.stack : e);
    process.exit(1);
});
