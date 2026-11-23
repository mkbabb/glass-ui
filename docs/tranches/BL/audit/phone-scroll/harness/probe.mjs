// probe.mjs — the page's scroll position under each glass phone surface, by touch at 390x844.
//
//   node probe.mjs <lane> <port> <out.json> [cell,cell,...]
//
// Lanes (one browser per run, a new context per cell, everything closed in finally):
//   chromium          Playwright Chromium (headless shell), isMobile + hasTouch, iPhone UA.
//                     Swipes are CDP Input.dispatchTouchEvent sequences: real touch input
//                     that the compositor scrolls with.
//   chromium-oldrule  The same, launched with the Finch feature
//                     OverscrollBehaviorRespectedOnAllScrollContainers disabled: Chromium's
//                     rule before 144, which is Safari's rule today (webkit.org/b/243452):
//                     overscroll-behavior has no effect on a box with no scrollable overflow.
//   webkit-touch      Playwright WebKit, isMobile + hasTouch, iPhone UA. Taps are
//                     touchscreen.tap. Playwright WebKit cannot drive a touch scroll (its
//                     protocol has Input.dispatchTapEvent only), so a swipe is a synthetic
//                     TouchEvent sequence: it reads whether a script cancels the gesture,
//                     never whether the page would scroll.
//   webkit-wheel      Playwright WebKit, isMobile false (mobile WebKit refuses mouse.wheel),
//                     hasTouch, 390x844. The swipe is a wheel over the same point: not touch,
//                     but WebKit's own scrolling tree deciding where the scroll lands.
//
// Run under the guard: guarded [--exclusive webkit] --timeout 30 -- node probe.mjs ...
import { chromium, webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";

const [lane, port, out, cellArg] = process.argv.slice(2);
if (!lane || !port || !out) {
    console.error("usage: node probe.mjs <lane> <port> <out.json> [cells]");
    process.exit(2);
}
const IPHONE_UA = devices["iPhone 13"].userAgent;

const CELLS = [
    ["page", 0],
    ["ob-control", 0],
    ["select", 4],
    ["select", 40],
    ["dock-select", 4],
    ["dock-select", 40],
    ["command", 4],
    ["command", 40],
    ["sheet", 3],
    ["sheet", 40],
    ["drawer", 3],
    ["drawer", 40],
    ["detents", 40],
    ["dialog", 2],
    ["dialog", 40],
    ["popover", 2],
    ["popover", 30],
    ["dropdown", 4],
    ["dropdown", 40],
];
const wanted = cellArg ? new Set(cellArg.split(",")) : null;
const cells = CELLS.filter(([s, n]) => !wanted || wanted.has(`${s}:${n}`) || wanted.has(s));

// Per surface: the plate, the list (the box that should scroll), a point on the plate that
// is not inside the list (null where the list fills the plate), and how it is closed by touch.
const SURFACE = {
    page: { plate: null, list: null, platePoint: null, close: null },
    "ob-control": { plate: ".ps-ob", list: ".ps-ob", platePoint: null, close: null },
    select: {
        plate: '[data-slot="select-content"]',
        list: '[data-slot="select-viewport"]',
        platePoint: null,
        close: { tap: '[data-slot="select-viewport"] [role="option"]' },
    },
    "dock-select": {
        plate: '[data-slot="select-content"]',
        list: '[data-slot="select-viewport"]',
        platePoint: null,
        close: { tap: '[data-slot="select-viewport"] [role="option"]' },
    },
    command: {
        plate: '[data-slot="dialog-content"]',
        list: '[data-slot="command-list"]',
        platePoint: ".command__input-icon",
        close: { tap: '[data-slot="command-list"] [role="option"]' },
    },
    sheet: {
        plate: '[data-slot="sheet-content"]',
        list: '[data-slot="sheet-content-region"]',
        platePoint: '[data-slot="dialog-close"]',
        close: { tap: '[data-slot="dialog-close"]' },
    },
    drawer: {
        plate: '[data-slot="sheet-content"]',
        list: ".ps-drawer-body",
        platePoint: ".ps-drawer-foot",
        close: { tap: '[data-slot="dialog-close"]' },
    },
    detents: {
        plate: '[data-slot="sheet-content"]',
        list: '[data-slot="sheet-content-region"] > .ps-rows',
        platePoint: '[data-slot="dialog-footer"]',
        close: { tap: '[data-slot="dialog-close"]' },
    },
    dialog: {
        plate: '[data-slot="dialog-content"]',
        list: '[data-slot="dialog-content"]',
        platePoint: null,
        close: { tap: '[data-slot="dialog-close"]' },
    },
    popover: {
        plate: '[data-slot="popover-content"]',
        list: '[data-slot="popover-content"]',
        platePoint: null,
        close: { point: [20, 60] },
    },
    dropdown: {
        plate: '[data-slot="menu-content"]',
        list: '[data-slot="menu-content"]',
        platePoint: null,
        close: { tap: '[data-slot="menu-content"] [role="menuitem"]' },
    },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch() {
    if (lane === "chromium") return chromium.launch({ headless: true });
    if (lane === "chromium-oldrule")
        return chromium.launch({
            headless: true,
            args: [
                "--disable-features=OverscrollBehaviorRespectedOnAllScrollContainers",
                "--disable-blink-features=OverscrollBehaviorRespectedOnAllScrollContainers",
            ],
        });
    if (lane === "webkit-touch" || lane === "webkit-wheel") return webkit.launch({ headless: true });
    throw new Error(`unknown lane ${lane}`);
}

function contextOptions() {
    return {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: lane !== "webkit-wheel",
        hasTouch: true,
        userAgent: IPHONE_UA,
    };
}

// The page's state, read in the page.
function stateFn(sel) {
    const se = document.scrollingElement;
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const box = (q) => {
        if (!q) return null;
        const el = document.querySelector(q);
        if (!el) return { present: false };
        const c = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
            present: true,
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
            scrollTop: Math.round(el.scrollTop),
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
            overflows: el.scrollHeight > el.clientHeight + 1,
            overflowY: c.overflowY,
            overscrollY: c.overscrollBehaviorY,
            touchAction: c.touchAction,
            state: el.getAttribute("data-state"),
            form: el.getAttribute("data-form"),
        };
    };
    return {
        scrollY: Math.round(window.scrollY),
        scrollingElement: se ? se.tagName : null,
        rootOverflow: cs(document.documentElement).overflowY,
        rootInline: document.documentElement.style.overflow || "",
        bodyOverflow: cs(document.body).overflowY,
        bodyInline: document.body.style.overflow || "",
        bodyPointer: document.body.style.pointerEvents || "",
        plate: box(sel.plate),
        list: box(sel.list),
    };
}

async function centerOf(page, q, pick = "center") {
    return page.evaluate(
        ([q, pick]) => {
            const el = document.querySelector(q);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const top = Math.max(r.top, 0);
            const bottom = Math.min(r.bottom, window.innerHeight);
            const h = bottom - top;
            const y = pick === "upper" ? top + h / 4 : pick === "lower" ? top + (3 * h) / 4 : top + h / 2;
            return [Math.round((Math.max(r.left, 0) + Math.min(r.right, window.innerWidth)) / 2), Math.round(y)];
        },
        [q, pick],
    );
}

// One swipe from [x, y] by dy (finger travel; negative = finger up).
async function swipe(page, cdp, [x, y], dy, sel) {
    const steps = 14;
    const y1 = Math.max(8, Math.min(836, y + dy));
    const travel = y1 - y;
    const read = () => page.evaluate(stateFn, sel);
    const pre = await read();
    let mid = null;
    let prevented = null;
    if (cdp) {
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
        for (let i = 1; i <= steps; i++) {
            await sleep(16);
            await cdp.send("Input.dispatchTouchEvent", {
                type: "touchMove",
                touchPoints: [{ x, y: y + (travel * i) / steps }],
            });
            if (i === Math.ceil(steps * 0.6)) mid = await read();
        }
        await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    } else if (lane === "webkit-touch") {
        // Playwright WebKit has no touch-move input (Input.dispatchTapEvent only), and
        // WebKit refuses a script-made Touch ("Illegal constructor"), so no swipe is driven
        // in this lane: it reads the page and the lock through open and close only.
        return { from: [x, y], dy: travel, pre, mid: null, post: pre, skipped: "no touch-move input in Playwright WebKit" };
    } else if (lane === "webkit-wheel") {
        await page.mouse.move(x, y);
        // Finger up (travel < 0) scrolls content down: a positive wheel delta.
        for (let i = 0; i < 5; i++) {
            await page.mouse.wheel(0, -travel / 5);
            await sleep(30);
        }
        mid = await read();
    }
    await sleep(800);
    const post = await read();
    return { from: [x, y], dy: travel, pre, mid, post, prevented };
}

async function runCell(browser, s, n) {
    const ctx = await browser.newContext(contextOptions());
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    const sel = SURFACE[s];
    const res = { surface: s, n, lane };
    try {
        await page.goto(`http://127.0.0.1:${port}/?ps=1&s=${s}&n=${n}`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__psReady === true, null, { timeout: 20000 });
        // Park the page so the stage sits 300px from the top: the page can move both ways.
        await page.evaluate(() => {
            const st = document.querySelector('[data-testid="stage"]');
            window.scrollTo(0, st.getBoundingClientRect().top + window.scrollY - 300);
        });
        await sleep(400);
        res.before = await page.evaluate(stateFn, sel);
        const cdp = lane.startsWith("chromium") ? await ctx.newCDPSession(page) : null;

        if (s !== "page" && s !== "ob-control") {
            const t = await centerOf(page, '[data-testid="trigger"]');
            res.triggerAt = t;
            await page.touchscreen.tap(t[0], t[1]);
            await sleep(1100);
        }
        res.afterOpen = await page.evaluate(stateFn, sel);
        res.swipes = [];
        const points = [];
        if (s === "page") points.push(["page", [195, 300], [195, 600]]);
        if (sel.platePoint) {
            const p = await centerOf(page, sel.platePoint);
            if (p) points.push(["plate", p, p]);
        }
        if (sel.list) {
            const up = await centerOf(page, sel.list, "upper");
            const low = await centerOf(page, sel.list, "lower");
            if (up && low) points.push(["list", up, low]);
        }
        for (const [where, pDown, pUp] of points) {
            // Finger down first (the list sits at its top, so this is the pull past the
            // boundary), then finger up (a long list scrolls; a short one cannot). The
            // pull starts in the upper part of the box and the push in the lower part, so
            // each has room to travel.
            for (const [dy, p] of [[220, pDown], [-220, pUp]]) {
                const sw = await swipe(page, cdp, p, dy, sel);
                res.swipes.push({ where, ...sw });
                await sleep(200);
            }
        }
        if (sel.close) {
            // The swipes may have scrolled the list; put it back at its top (a script
            // scroll of the list, not of the page) so the row or the close button that
            // closes it is in view, then read the page just before the close.
            if (sel.list)
                await page.evaluate((q) => {
                    const el = document.querySelector(q);
                    if (el) el.scrollTop = 0;
                }, sel.list);
            await sleep(300);
            res.beforeClose = await page.evaluate(stateFn, sel);
            let p = null;
            if (sel.close.tap) p = await centerOf(page, sel.close.tap);
            if (sel.close.point) p = sel.close.point;
            res.closeAt = p;
            if (p) {
                await page.touchscreen.tap(p[0], p[1]);
                await sleep(1200);
            }
        }
        res.afterClose = await page.evaluate(stateFn, sel);
    } catch (e) {
        res.error = String(e && e.stack ? e.stack : e).slice(0, 600);
    } finally {
        res.pageErrors = errors;
        await ctx.close();
    }
    return res;
}

const browser = await launch();
const results = [];
try {
    results.push({ meta: { lane, browser: browser.version(), ua: IPHONE_UA, date: new Date().toISOString() } });
    for (const [s, n] of cells) {
        const r = await runCell(browser, s, n);
        results.push(r);
        const sw = (r.swipes || []).map((w) => `${w.where}${w.dy > 0 ? "v" : "^"}:${w.post.scrollY - w.pre.scrollY}`).join(" ");
        console.log(
            `${lane} ${s}:${n} before=${r.before?.scrollY} open=${r.afterOpen?.scrollY} root=${r.afterOpen?.rootOverflow} ${sw} close=${r.afterClose?.scrollY}${r.error ? " ERROR " + r.error.slice(0, 160) : ""}`,
        );
    }
} finally {
    await browser.close();
    writeFileSync(out, JSON.stringify(results, null, 1));
}
