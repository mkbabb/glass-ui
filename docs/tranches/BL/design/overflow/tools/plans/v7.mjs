// Round 3 readings (v7), on /ovf.html?v7: the SegmentedTabs strip's touch-action (a
// detented Sheet's drag from a tab; a strip in a `none`, `pan-x` or `pan-y` box), the
// strip as a flex item, an in-flow dock's vertical swipe, ConfiguratorLayer's clip, and
// a Chip and a Button in the rows the line law reaches.
//
// node v7.mjs <engine> <out.json> <name:port>...
// One browser per run, one context per cell and build, each closed in finally. Touch
// gestures run in Chromium's 390 touch cell only (CDP touch input); WebKit reads sizes,
// computed styles and wheel pans at 1440.
//
// Every touch on a strip starts on a tab that is not selected. With motion allowed the
// strip's indicator is draggable (`touch-action: none`) and the selected tab hands its
// press to it (tabs/styles/drag.css), so a gesture begun on the selected tab never
// reaches the browser on any build.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const TREE = new URL(`../../trees/${process.env.OVF_TREE || "r3b"}/package.json`, import.meta.url).pathname;
const pw = createRequire(TREE)("playwright");

const [ENGINE, OUT, ...BUILD_ARGS] = process.argv.slice(2);
// A build read with one rule taken back, injected at document start: `v7-nohdr` is v7
// without the detented Sheet header's `pan-x` on its descendants.
const INJECT = {
    "v7-nohdr": '[data-slot="dialog-header"] * { touch-action: auto; }',
};
const BUILDS = BUILD_ARGS.map((a) => {
    const [name, port] = a.split(":");
    return { name, port: +port, css: INJECT[name] ?? null };
});
const CELLS = [
    { name: "390t", viewport: { width: 390, height: 844 }, touch: true },
    { name: "1440", viewport: { width: 1440, height: 900 }, touch: false },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rec = { engine: ENGINE, builds: BUILDS, rows: [] };
const push = (row) => {
    rec.rows.push(row);
    console.log(JSON.stringify(row));
};

const STRIPS = ["v7-none", "v7-none-tight", "v7-none-over", "v7-panx", "v7-pany", "v7-over", "v7-row", "v7-row-over", "v7-col", "v7-col-over", "v7-vert", "v7-scaled"];

// ── in-page helpers ──────────────────────────────────────────────────────────
function install() {
    const r1 = (n) => Math.round(n * 10) / 10;
    const lines = (el) => {
        if (!el) return null;
        const g = document.createRange();
        g.selectNodeContents(el);
        return new Set([...g.getClientRects()].filter((q) => q.width > 0).map((q) => Math.round(q.top))).size;
    };
    const ev = { down: 0, moves: 0, cancel: 0, up: 0 };
    addEventListener("pointerdown", (e) => e.pointerType === "touch" && ev.down++, true);
    addEventListener("pointermove", (e) => e.pointerType === "touch" && ev.moves++, true);
    addEventListener("pointercancel", () => ev.cancel++, true);
    addEventListener("pointerup", (e) => e.pointerType === "touch" && ev.up++, true);
    const strip = (id) => document.querySelector(`[data-testid="${id}"] .segmented-tabs`);
    window.__v7 = {
        ev,
        reset() {
            Object.keys(ev).forEach((k) => (ev[k] = 0));
        },
        strip(id) {
            const s = strip(id);
            if (!s) return { error: "no strip" };
            const box = document.querySelector(`[data-testid="${id}"]`);
            const cs = getComputedStyle(s);
            const sr = s.getBoundingClientRect();
            const pad = { l: sr.left + s.clientLeft, r: sr.left + s.clientLeft + s.clientWidth, t: sr.top + s.clientTop, b: sr.top + s.clientTop + s.clientHeight };
            let start = Infinity, end = -Infinity, hidden = 0;
            const tabs = [...s.querySelectorAll(".segmented-tab")];
            for (const t of tabs) {
                const q = t.getBoundingClientRect();
                start = Math.min(start, q.left);
                end = Math.max(end, q.right);
                if (q.right > pad.r + 0.5 || q.left < pad.l - 0.5 || q.bottom > pad.b + 0.5) hidden++;
            }
            const room = s.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            const h = box.querySelector("h3, p");
            return {
                flag: s.hasAttribute("data-overflow"),
                ox: cs.overflowX,
                ta: cs.touchAction,
                w: r1(sr.width),
                h: r1(sr.height),
                sw: s.scrollWidth,
                cw: s.clientWidth,
                sh: s.scrollHeight,
                ch: s.clientHeight,
                span: r1(end - start),
                room: r1(room),
                tabsPastClip: hidden,
                tabH: r1(tabs[0]?.getBoundingClientRect().height ?? 0),
                box: { sw: box.scrollWidth, cw: box.clientWidth, sh: box.scrollHeight, ch: box.clientHeight },
                sibling: h ? { w: r1(h.getBoundingClientRect().width), lines: lines(h), right: r1(h.getBoundingClientRect().right - box.getBoundingClientRect().right) } : null,
            };
        },
        dock(id) {
            const d = document.querySelector(`[data-testid="${id}"] .glass-dock`);
            const run = d?.querySelector(":scope .dock-layers > .dock-run");
            if (!run) return { error: "no run" };
            return { fits: d.hasAttribute("data-run-fits"), ta: getComputedStyle(run).touchAction, sw: run.scrollWidth, cw: run.clientWidth, sl: run.scrollLeft };
        },
        cfg() {
            const box = document.querySelector('[data-testid="v7-cfg"]');
            const wide = document.querySelector('[data-testid="v7-cfg-wide"]');
            const wrap = wide.closest(".configurator-layer-region").firstElementChild;
            const layer = wide.closest(".configurator-layer-region").parentElement;
            const wr = wide.getBoundingClientRect();
            const lr = layer.getBoundingClientRect();
            const hid = document.querySelector('[data-testid="v7-cfg-hidden"]');
            const hidRegion = hid.closest(".configurator-layer-region");
            const hr = hid.getBoundingClientRect();
            const x = Math.min(lr.right + 10, innerWidth - 2);
            const y = wr.top + wr.height / 2;
            const at = document.elementFromPoint(x, y);
            const hx = hr.left + 10, hy = hr.top + Math.max(2, Math.min(hr.height / 2, 8));
            const atHidden = document.elementFromPoint(hx, hy);
            const ws = getComputedStyle(wrap);
            return {
                wrap: { ox: ws.overflowX, oy: ws.overflowY },
                layerW: r1(lr.width),
                widePast: r1(wr.right - lr.right),
                wideHitPastLayer: at === wide,
                box: { sw: box.scrollWidth, cw: box.clientWidth },
                closed: { regionH: r1(hidRegion.getBoundingClientRect().height), rowHit: atHidden === hid, wrapOy: getComputedStyle(hidRegion.firstElementChild).overflowY },
            };
        },
        row(id) {
            const row = document.querySelector(`[data-testid="${id}"]`);
            if (!row) return { error: "no row" };
            const chip = row.querySelector(".glass-chip");
            const btn = row.querySelector(".button");
            const rr = row.getBoundingClientRect();
            const one = (el) => el && {
                w: r1(el.getBoundingClientRect().width),
                h: r1(el.getBoundingClientRect().height),
                lines: lines(el),
                wrap: getComputedStyle(el).overflowWrap,
                textPast: r1(Math.max(0, el.scrollWidth - el.clientWidth)),
            };
            return { rowW: r1(rr.width), rowH: r1(rr.height), rowWrap: getComputedStyle(row).overflowWrap, chip: one(chip), button: one(btn) };
        },
    };
}

async function touch(cdp, pts, gap = 16) {
    const t = (type, p) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x: p.x, y: p.y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
    await t("touchStart", pts[0]);
    for (const p of pts.slice(1)) {
        await t("touchMove", p);
        await sleep(gap);
    }
}
const touchEnd = (cdp) => cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
const path = (x0, y0, dx, dy, n) => Array.from({ length: n + 1 }, (_, i) => ({ x: x0 + (dx * i) / n, y: y0 + (dy * i) / n }));

async function center(page, sel) {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        el.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" });
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, sel);
}

// A swipe from the first tab (or the given element): what moved, and what the engine did.
async function swipe(page, cdp, sel, dx, dy, { scrollers = [] } = {}) {
    const p = await center(page, sel);
    if (!p) return { error: `nothing at ${sel}` };
    await sleep(150);
    const read = () => page.evaluate((scrollers) => ({ y: scrollY, x: scrollX, s: scrollers.map((q) => { const el = document.querySelector(q); return el ? [el.scrollLeft, el.scrollTop] : null; }) }), scrollers);
    const a = await read();
    await page.evaluate(() => window.__v7.reset());
    await touch(cdp, path(p.x, p.y, dx, dy, 12));
    await touchEnd(cdp);
    await sleep(700);
    const b = await read();
    const ev = await page.evaluate(() => ({ ...window.__v7.ev }));
    const out = { pageY: Math.round(b.y - a.y), pageX: Math.round(b.x - a.x), ...ev };
    scrollers.forEach((q, i) => {
        if (a.s[i] && b.s[i]) out[q] = { x: Math.round(b.s[i][0] - a.s[i][0]), y: Math.round(b.s[i][1] - a.s[i][1]) };
    });
    // put everything back at once
    await page.evaluate(([a, scrollers]) => {
        scrollers.forEach((q, i) => { const el = document.querySelector(q); if (el && a.s[i]) el.scrollTo({ left: a.s[i][0], top: a.s[i][1], behavior: "instant" }); });
        scrollTo({ left: a.x, top: a.y, behavior: "instant" });
    }, [a, scrollers]);
    await sleep(150);
    return out;
}

// Each drag reads a sheet freshly opened on a freshly loaded page, so no drag inherits
// the rung, the focus or the dismissal of the one before it.
async function openSheet(page, cell, url) {
    await page.goto(url, { waitUntil: "load" });
    await page.evaluate(install);
    await sleep(1200);
    const o = page.locator('[data-testid="v7-open-sheet"]');
    await o.scrollIntoViewIfNeeded();
    if (cell.touch && ENGINE === "chromium") await o.tap();
    else await o.click();
    // wait for the sheet to come to rest at its first rung
    let last = null;
    for (let i = 0; i < 30; i++) {
        await sleep(200);
        const t = await sheetTop(page);
        if (t !== null && t === last) break;
        last = t;
    }
}
const sheetTop = (page) => page.evaluate(() => {
    const s = document.querySelector('[data-testid="v7-sheet"]');
    return s ? Math.round(s.getBoundingClientRect().top * 10) / 10 : null;
});

// A drag from the strip's first tab in the sheet's header: the moves the page saw, any
// cancel, how far the sheet followed by the last move, and where it rests after.
async function sheetDrag(page, cdp, cell, url, id, dx, dy, n, gap) {
    await openSheet(page, cell, url);
    const sel = `[data-testid="${id}"] .segmented-tab:not([data-active])`;
    const p = await page.evaluate((sel) => { const r = document.querySelector(sel)?.getBoundingClientRect(); return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null; }, sel);
    if (!p) return { error: "no tab" };
    const t0 = await sheetTop(page);
    const s0 = await page.evaluate((id) => document.querySelector(`[data-testid="${id}"] .segmented-tabs`).scrollLeft, id);
    await page.evaluate(() => window.__v7.reset());
    await touch(cdp, path(p.x, p.y, dx, dy, n), gap);
    await sleep(60);
    const t1 = await sheetTop(page);
    await touchEnd(cdp);
    await sleep(1500);
    const t2 = await sheetTop(page);
    const s2 = await page.evaluate((id) => document.querySelector(`[data-testid="${id}"] .segmented-tabs`)?.scrollLeft ?? null, id);
    const ev = await page.evaluate(() => ({ ...window.__v7.ev }));
    return { gesture: `${dx ? `${dx} px sideways` : `${dy} px down`} in ${n} moves, ${gap} ms apart`, ...ev, followed: t1 === null || t0 === null ? null : Math.round(t1 - t0), rest: t2 === null ? "closed" : Math.round(t2 - t0), stripPanned: s2 === null ? null : Math.round(s2 - s0) };
}

const browser = await pw[ENGINE].launch({ headless: true });
rec.version = browser.version();
try {
    for (const cell of CELLS) {
        for (const build of BUILDS) {
            const context = await browser.newContext({ viewport: cell.viewport, hasTouch: cell.touch, isMobile: cell.touch && ENGINE === "chromium", deviceScaleFactor: 2, reducedMotion: "no-preference" });
            const at = { build: build.name, cell: cell.name };
            try {
                if (build.css) {
                    await context.addInitScript((css) => {
                        const add = () => {
                            const st = document.createElement("style");
                            st.textContent = css;
                            document.head.appendChild(st);
                        };
                        if (document.head) add();
                        else document.addEventListener("DOMContentLoaded", add);
                    }, build.css);
                }
                const page = await context.newPage();
                const cdp = ENGINE === "chromium" && cell.touch ? await context.newCDPSession(page) : null;
                const url = `http://127.0.0.1:${build.port}/ovf.html?v7`;
                await page.goto(url, { waitUntil: "load" });
                await page.evaluate(install);
                await sleep(1800);
                // The document must stay the viewport's width: a mobile viewport shrinks a
                // wider page to fit, and the touch points would land off their targets.
                push({ case: "page", ...at, ...(await page.evaluate(() => ({ docW: document.documentElement.scrollWidth, vw: innerWidth, scale: visualViewport?.scale ?? null }))) });

                // A. each strip, at rest
                for (const id of STRIPS) push({ case: "strip", id, ...at, ...(await page.evaluate((id) => window.__v7.strip(id), id)) });

                // A2. the flag holds while the overflowing strip is scrolled: the tabs'
                // offsets do not move with the scroll, so the reading does not either
                push({ case: "scroll-steady", id: "v7-over", ...at, ...(await page.evaluate(async () => {
                    const s = document.querySelector('[data-testid="v7-over"] .segmented-tabs');
                    const two = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    const t = s.querySelector(".segmented-tab");
                    const before = { flag: s.hasAttribute("data-overflow"), off: t.offsetLeft, sl: s.scrollLeft };
                    s.scrollTo({ left: 300, behavior: "instant" });
                    await two();
                    await new Promise((r) => setTimeout(r, 100));
                    const after = { flag: s.hasAttribute("data-overflow"), off: t.offsetLeft, sl: s.scrollLeft };
                    s.scrollTo({ left: 0, behavior: "instant" });
                    return { before, after };
                })) });

                // B. the docks at rest
                for (const id of ["v7-dock3", "v7-dock8"]) push({ case: "dock", id, ...at, ...(await page.evaluate((id) => window.__v7.dock(id), id)) });

                // C. ConfiguratorLayer
                await page.evaluate(() => document.querySelector('[data-testid="v7-cfg"]').scrollIntoView({ block: "center", behavior: "instant" }));
                await sleep(200);
                push({ case: "cfg", ...at, ...(await page.evaluate(() => window.__v7.cfg())) });

                // D. a Chip and a Button in the law's rows; the menu opened for its row
                for (const id of ["v7-row-command", "v7-row-accordion", "v7-row-select"]) push({ case: "row", id, ...at, ...(await page.evaluate((id) => window.__v7.row(id), id)) });
                const m = page.locator('[data-testid="v7-open-menu"]');
                await m.scrollIntoViewIfNeeded();
                if (cdp) await m.tap();
                else await m.click();
                await sleep(1200);
                push({ case: "row", id: "v7-row-menu", ...at, ...(await page.evaluate(() => window.__v7.row("v7-row-menu"))) });
                await page.keyboard.press("Escape");
                await sleep(600);

                // E. the strip's flag follows its box (1440: the eight-tab box widened, then back)
                if (!cell.touch) {
                    const follow = await page.evaluate(async () => {
                        const box = document.querySelector('[data-testid="v7-over"]');
                        const s = box.querySelector(".segmented-tabs");
                        const two = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                        const read = () => ({ w: box.style.inlineSize, flag: s.hasAttribute("data-overflow"), ox: getComputedStyle(s).overflowX });
                        const out = [read()];
                        box.style.inlineSize = "900px";
                        await two();
                        out.push(read());
                        box.style.inlineSize = "267px";
                        await two();
                        out.push(read());
                        return out;
                    });
                    push({ case: "flag-follows", ...at, steps: follow });
                    // a sideways wheel on the eight-tab strip
                    const p = await center(page, '[data-testid="v7-over"] .segmented-tabs');
                    const before = await page.evaluate(() => ({ s: document.querySelector('[data-testid="v7-over"] .segmented-tabs').scrollLeft, x: scrollX }));
                    await page.mouse.move(p.x, p.y);
                    await page.mouse.wheel(150, 0);
                    await sleep(700);
                    const after = await page.evaluate(() => ({ s: document.querySelector('[data-testid="v7-over"] .segmented-tabs').scrollLeft, x: scrollX }));
                    push({ case: "wheel", id: "v7-over", ...at, strip: Math.round(after.s - before.s), page: Math.round(after.x - before.x) });
                }

                // F. touch: swipes on the strips and the docks; the detented Sheet's drag
                if (cdp) {
                    const tab = (id) => `[data-testid="${id}"] .segmented-tab:not([data-active])`;
                    const st = (id) => `[data-testid="${id}"] .segmented-tabs`;
                    push({ case: "swipe", id: "v7-none", gesture: "240 px up", ...at, ...(await swipe(page, cdp, tab("v7-none"), 0, -240, { scrollers: [st("v7-none")] })) });
                    push({ case: "swipe", id: "v7-none-tight", gesture: "240 px up", ...at, ...(await swipe(page, cdp, tab("v7-none-tight"), 0, -240, { scrollers: [st("v7-none-tight")] })) });
                    push({ case: "swipe", id: "v7-none-over", gesture: "240 px up", ...at, ...(await swipe(page, cdp, tab("v7-none-over"), 0, -240, { scrollers: [st("v7-none-over")] })) });
                    push({ case: "swipe", id: "v7-none-over", gesture: "150 px left", ...at, ...(await swipe(page, cdp, tab("v7-none-over"), -150, 0, { scrollers: [st("v7-none-over")] })) });
                    push({ case: "swipe", id: "v7-panx", gesture: "240 px up", ...at, ...(await swipe(page, cdp, tab("v7-panx"), 0, -240, { scrollers: [st("v7-panx")] })) });
                    push({ case: "swipe", id: "v7-pany", gesture: "240 px up", ...at, ...(await swipe(page, cdp, tab("v7-pany"), 0, -240, { scrollers: ['[data-testid="v7-pany"]', st("v7-pany")] })) });
                    push({ case: "swipe", id: "v7-pany", gesture: "150 px left", ...at, ...(await swipe(page, cdp, tab("v7-pany"), -150, 0, { scrollers: ['[data-testid="v7-pany"]', st("v7-pany")] })) });
                    push({ case: "swipe", id: "v7-pany", gesture: "150 px up", ...at, ...(await swipe(page, cdp, tab("v7-pany"), 0, -150, { scrollers: ['[data-testid="v7-pany"]', st("v7-pany")] })) });
                    push({ case: "swipe", id: "v7-over", gesture: "240 px up", ...at, ...(await swipe(page, cdp, tab("v7-over"), 0, -240, { scrollers: [st("v7-over")] })) });
                    push({ case: "swipe", id: "v7-over", gesture: "150 px left", ...at, ...(await swipe(page, cdp, tab("v7-over"), -150, 0, { scrollers: [st("v7-over")] })) });
                    const run = (id) => `[data-testid="${id}"] .dock-layers > .dock-run`;
                    const seat = (id) => `[data-testid="${id}"] .dock-layers > .dock-run > :not(.dock-run-mark):nth-child(2)`;
                    for (const id of ["v7-dock3", "v7-dock8"]) {
                        push({ case: "swipe", id, gesture: "240 px up, from a seat", ...at, ...(await swipe(page, cdp, seat(id), 0, -240, { scrollers: [run(id)] })) });
                        push({ case: "swipe", id, gesture: "150 px left, from a seat", ...at, ...(await swipe(page, cdp, seat(id), -150, 0, { scrollers: [run(id)] })) });
                    }
                    push({ case: "swipe", id: "v7-cfg", gesture: "150 px left", ...at, ...(await swipe(page, cdp, '[data-testid="v7-cfg-wide"]', -150, 0, { scrollers: ['[data-testid="v7-cfg"]'] })) });

                    // the sheet: slow and fast drags down from each header strip's first tab, and
                    // a sideways swipe on the strip that does not fit
                    for (const id of ["v7-hdr-fit", "v7-hdr-over"]) {
                        push({ case: "sheet", id, ...at, ...(await sheetDrag(page, cdp, cell, url, id, 0, 70, 30, 16)) });
                        push({ case: "sheet", id, ...at, ...(await sheetDrag(page, cdp, cell, url, id, 0, 220, 6, 16)) });
                    }
                    push({ case: "sheet", id: "v7-hdr-over", ...at, ...(await sheetDrag(page, cdp, cell, url, "v7-hdr-over", -150, 0, 12, 16)) });
                    push({ case: "sheet-strips", ...at, ...(await page.evaluate(() => {
                        const out = {};
                        for (const id of ["v7-hdr-fit", "v7-hdr-over"]) {
                            const s = document.querySelector(`[data-testid="${id}"] .segmented-tabs`);
                            if (s) out[id] = { flag: s.hasAttribute("data-overflow"), ox: getComputedStyle(s).overflowX, ta: getComputedStyle(s).touchAction, sw: s.scrollWidth, cw: s.clientWidth, headerTa: getComputedStyle(s.closest('[data-slot="dialog-header"]')).touchAction };
                        }
                        return out;
                    })) });
                } else {
                    // the sheet's strips at rest, opened by click
                    await openSheet(page, cell, url);
                    push({ case: "sheet-strips", ...at, ...(await page.evaluate(() => {
                        const out = {};
                        for (const id of ["v7-hdr-fit", "v7-hdr-over"]) {
                            const s = document.querySelector(`[data-testid="${id}"] .segmented-tabs`);
                            if (s) out[id] = { flag: s.hasAttribute("data-overflow"), ox: getComputedStyle(s).overflowX, ta: getComputedStyle(s).touchAction, sw: s.scrollWidth, cw: s.clientWidth, headerTa: getComputedStyle(s.closest('[data-slot="dialog-header"]')).touchAction };
                        }
                        return out;
                    })) });
                }
                await cdp?.detach().catch(() => {});
                await page.close();
            } catch (e) {
                push({ error: String(e).slice(0, 400), ...at });
            } finally {
                await context.close().catch(() => {});
            }
        }
    }
} finally {
    await browser.close();
}
writeFileSync(OUT, JSON.stringify(rec, null, 1));
