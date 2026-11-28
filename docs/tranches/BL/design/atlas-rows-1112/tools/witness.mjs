// The atlas-rows witness. Serves one tree's built witness page (harness/dist), reads every
// cell in one engine, and writes the readings as JSON. One browser per run, a new context
// per cell; every context and the browser close in finally, and the static server stops
// on exit.
//
// usage: node witness.mjs <dist-dir> <out.json> <chromium|webkit> [cell,cell...]
import { chromium, webkit } from "playwright";
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const DIST = process.argv[2];
const OUT = process.argv[3];
const ENGINE_NAME = process.argv[4] === "webkit" ? "webkit" : "chromium";
const ENGINE = ENGINE_NAME === "webkit" ? webkit : chromium;
const PICK = process.argv[5] ? new Set(process.argv[5].split(",")) : null;

const TYPES = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".woff2": "font/woff2",
    ".svg": "image/svg+xml",
};
const server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^\/+/, "");
    let file = join(DIST, path || "index.html");
    if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory()) file = join(DIST, "index.html");
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const DESKTOP = { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 };
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

// Helpers injected into every page.
const HELPERS = () => {
    const w = window;
    w.$ = (s) => document.querySelector(s);
    w.$t = (t) => document.querySelector(`[data-t="${t}"]`);
    w.desc = (el) => {
        if (!el) return null;
        if (el === document.body) return "body";
        const slot = el.getAttribute?.("data-slot");
        const t = el.getAttribute?.("data-t");
        const cls = typeof el.className === "string" ? el.className.split(/\s+/).slice(0, 3).join(".") : "";
        return `${el.tagName.toLowerCase()}${t ? `[t=${t}]` : ""}${slot ? `[slot=${slot}]` : ""}${cls ? "." + cls : ""}`;
    };
    w.shown = (el) => {
        if (!el || !el.isConnected) return false;
        const cs = getComputedStyle(el);
        return cs.display !== "none" && cs.visibility !== "hidden" && el.getClientRects().length > 0;
    };
    // The body-level box an element paints in, and whether `a` paints above `b`.
    w.bodyChild = (el) => {
        while (el && el.parentElement && el.parentElement !== document.body) el = el.parentElement;
        return el;
    };
    w.zOf = (el) => {
        const z = getComputedStyle(el).zIndex;
        return z === "auto" ? 0 : Number(z);
    };
    w.paintsAbove = (a, b) => {
        const A = w.bodyChild(a);
        const B = w.bodyChild(b);
        const za = w.zOf(A);
        const zb = w.zOf(B);
        const above = za !== zb ? za > zb : !!(B.compareDocumentPosition(A) & Node.DOCUMENT_POSITION_FOLLOWING);
        return { above, za, zb, a: w.desc(A), b: w.desc(B) };
    };
};

async function open(browser, ctxOpts, cell, query = "") {
    const context = await browser.newContext(ctxOpts);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(`${BASE}?cell=${cell}${query}`);
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
    await page.evaluate(HELPERS);
    await sleep(300);
    return { context, page, errors };
}

const flatRead = () => {
    const frost = [];
    const shadow = [];
    for (const el of document.querySelectorAll("body *")) {
        if (!shown(el)) continue;
        for (const pseudo of [null, "::before", "::after"]) {
            const cs = getComputedStyle(el, pseudo);
            if (pseudo && (cs.content === "none" || cs.content === "normal")) continue;
            const bf = cs.getPropertyValue("backdrop-filter") || cs.getPropertyValue("-webkit-backdrop-filter");
            if (bf && bf !== "none") frost.push(`${desc(el)}${pseudo ?? ""}: ${bf}`);
            if (cs.boxShadow && cs.boxShadow !== "none") shadow.push(`${desc(el)}${pseudo ?? ""}`);
        }
    }
    return { frost: frost.length, frostSample: frost.slice(0, 6), shadow: shadow.length, shadowSample: shadow.slice(0, 6) };
};

const CELLS = {
    async print(browser) {
        const { context, page, errors } = await open(browser, DESKTOP, "print");
        try {
            await sleep(700);
            const read = async () =>
                page.evaluate((flat) => {
                    const f = new Function(`return (${flat})`)();
                    const named = {
                        dock: $(".glass-dock"),
                        popover: $('[data-slot="popover-content"]'),
                        tooltip: $('[data-slot="tooltip-content"]'),
                        toast: $('[data-slot="toast"]'),
                        card: $t("card"),
                        button: $t("button"),
                    };
                    const out = {};
                    for (const [k, el] of Object.entries(named)) out[k] = el ? shown(el) : "absent";
                    return { shown: out, cardBg: getComputedStyle($t("card")).backgroundColor, ...f() };
                }, flatRead.toString());
            const screen = await read();
            await page.emulateMedia({ media: "print" });
            await sleep(400);
            const print = await read();
            return { screen, print, errors };
        } finally {
            await context.close();
        }
    },
    async "print-dialog"(browser) {
        return printModal(browser, "print-dialog", '[data-slot="dialog-content"]');
    },
    async "print-sheet"(browser) {
        return printModal(browser, "print-sheet", '[data-slot="sheet-content"]');
    },
    async toggle(browser) {
        const { context, page, errors } = await open(browser, DESKTOP, "toggle");
        try {
            const read = () =>
                page.evaluate(() => ({
                    label: $t("toggle").getAttribute("aria-label"),
                    pressed: $t("toggle").getAttribute("aria-pressed"),
                    dark: document.documentElement.classList.contains("dark"),
                }));
            const before = await read();
            await page.click('[data-t="toggle"]');
            await sleep(400);
            const after = await read();
            return { before, after, errors };
        } finally {
            await context.close();
        }
    },
    popover: (b) => popoverCell(b, "popover"),
    "popover-child": (b) => popoverCell(b, "popover-child"),
    async "dlg-scroll"(browser) {
        const out = {};
        for (const modal of ["0", "1"]) {
            const { context, page, errors } = await open(browser, DESKTOP, "dlg-scroll", `&modal=${modal}`);
            try {
                await page.evaluate(() => window.scrollTo(0, 1000));
                await sleep(200);
                const gutter = await page.evaluate(() => ({
                    bar: innerWidth - document.documentElement.clientWidth,
                    gutter: getComputedStyle(document.documentElement).scrollbarGutter,
                    markerX: $t("marker").getBoundingClientRect().left,
                }));
                await page.click('[data-t="trigger"]');
                await sleep(900);
                const before = await page.evaluate(() => {
                    const d = $t("dialog");
                    d.scrollTop = d.scrollHeight;
                    return {
                        y: scrollY,
                        overscroll: getComputedStyle(d).overscrollBehaviorY,
                        overflowY: getComputedStyle(d).overflowY,
                        markerX: $t("marker").getBoundingClientRect().left,
                        bar: innerWidth - document.documentElement.clientWidth,
                    };
                });
                await sleep(200);
                const box = await page.evaluate(() => {
                    const r = $t("dialog").getBoundingClientRect();
                    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
                });
                await page.mouse.move(box.x, box.y);
                for (let i = 0; i < 4; i++) {
                    await page.mouse.wheel(0, 300);
                    await sleep(120);
                }
                await sleep(600);
                const after = await page.evaluate(() => ({
                    y: scrollY,
                    dialogAtEnd: (() => {
                        const d = $t("dialog");
                        return Math.abs(d.scrollTop + d.clientHeight - d.scrollHeight) < 2;
                    })(),
                }));
                out[modal === "1" ? "modal" : "nonModal"] = {
                    gutter,
                    before,
                    after,
                    pageMovedBy: after.y - before.y,
                    errors,
                };
            } finally {
                await context.close();
            }
        }
        return out;
    },
    async "dlg-pos"(browser) {
        const { context, page, errors } = await open(browser, DESKTOP, "dlg-pos");
        try {
            await page.evaluate(() => window.scrollTo(0, 1000));
            await sleep(200);
            const y0 = await page.evaluate(() => scrollY);
            await page.click('[data-t="trigger"]');
            await sleep(900);
            const yOpen = await page.evaluate(() => scrollY);
            await page.keyboard.press("Escape");
            await sleep(1200);
            const yEsc = await page.evaluate(() => scrollY);
            await page.click('[data-t="trigger"]');
            await sleep(900);
            await page.click('[data-slot="dialog-close"]');
            await sleep(1200);
            const yClose = await page.evaluate(() => scrollY);
            await page.click('[data-t="trigger"]');
            await sleep(900);
            await page.mouse.click(30, 30);
            await sleep(1200);
            const yScrim = await page.evaluate(() => scrollY);
            return { y0, yOpen, yEsc, yClose, yScrim, errors };
        } finally {
            await context.close();
        }
    },
    "stack-dialog": (b) => stack(b, "stack-dialog"),
    "stack-sheet": (b) => stack(b, "stack-sheet"),
    "stack-drawer": (b) => stack(b, "stack-drawer"),
    "stack-expand": (b) => stack(b, "stack-expand"),
    "stack-sibling": (b) => stack(b, "stack-sibling"),
    async button(browser) {
        const out = {};
        for (const [name, opts] of [
            ["fine", DESKTOP],
            ["coarse", PHONE],
        ]) {
            const { context, page, errors } = await open(browser, opts, "button");
            try {
                out[name] = await page.evaluate(() => ({
                    coarse: matchMedia("(pointer: coarse)").matches,
                    sm: $t("sm").getBoundingClientRect().height,
                    md: $t("md").getBoundingClientRect().height,
                    floor: getComputedStyle(document.documentElement).getPropertyValue("--control-floor").trim(),
                    scale: getComputedStyle(document.documentElement).getPropertyValue("--ui-scale").trim(),
                }));
                out[name].errors = errors;
            } finally {
                await context.close();
            }
        }
        return out;
    },
    async select(browser) {
        const out = {};
        // Keys open the list and pick a row: the keyboard's close, with no pointer on a
        // row. A control for the arms below. Both engines.
        {
            const { context, page, errors } = await open(browser, DESKTOP, "select");
            try {
                await page.evaluate(() => window.scrollTo(0, 1000));
                await armSpy(page);
                await page.evaluate(() => $t("trigger").focus({ preventScroll: true }));
                await page.keyboard.press("Enter");
                await sleep(700);
                await page.keyboard.press("ArrowDown");
                await page.keyboard.press("ArrowDown");
                await sleep(150);
                await page.evaluate(() => (window.__mark = performance.now()));
                await page.keyboard.press("Enter");
                await sleep(1200);
                out.keys = {
                    ...(await spyRead(page)),
                    value: await page.evaluate(() => $t("trigger").textContent.trim()),
                    errors,
                };
            } finally {
                await context.close();
            }
        }
        // A real pointer picks a row and leaves it while the list leaves. A pointer that
        // rests on the Select trigger aborts the Playwright WebKit page process on 11.1.1
        // (the colour-mix crash, its own lane), so in both engines the keys open the list
        // and the pointer jumps onto the row and then to a corner far from the trigger,
        // never crossing it.
        {
            const { context, page, errors } = await open(browser, DESKTOP, "select");
            try {
                await page.evaluate(() => window.scrollTo(0, 1000));
                await armSpy(page);
                await page.evaluate(() => $t("trigger").focus({ preventScroll: true }));
                await page.keyboard.press("Enter");
                await sleep(700);
                const item = await center(page, '[data-t="item-d"]');
                await page.mouse.move(item.x, item.y);
                await sleep(150);
                await page.evaluate(() => (window.__mark = performance.now()));
                await page.mouse.down();
                await page.mouse.up();
                await page.mouse.move(1240, 40);
                await sleep(1200);
                out.pointer = { ...(await spyRead(page)), value: await page.evaluate(() => $t("trigger").textContent.trim()), errors };
            } finally {
                await context.close();
            }
        }
        // A finger: Chromium only (a tap on the trigger hovers it in WebKit).
        if (ENGINE_NAME === "chromium") {
            const phone = await open(browser, PHONE, "select");
            try {
                await phone.page.evaluate(() => window.scrollTo(0, 1000));
                await armSpy(phone.page);
                await phone.page.tap('[data-t="trigger"]');
                await sleep(800);
                const item = await center(phone.page, '[data-t="item-a"]');
                await phone.page.evaluate(() => (window.__mark = performance.now()));
                await phone.page.touchscreen.tap(item.x, item.y);
                await sleep(1200);
                out.touch = { ...(await spyRead(phone.page)), errors: phone.errors };
            } finally {
                await phone.context.close();
            }
        }
        return out;
    },
    async selgroup(browser) {
        const { context, page, errors } = await open(browser, DESKTOP, "selgroup");
        try {
            const read = () =>
                page.evaluate(() => ({
                    page: scrollY,
                    outer: $t("outer").scrollTop,
                    run: $t("run").scrollLeft,
                    selected: [...$t("run").querySelectorAll("button")].find((b) => b.getAttribute("aria-checked") === "true" || b.getAttribute("aria-pressed") === "true" || b.getAttribute("aria-selected") === "true")?.textContent.trim(),
                }));
            const before = await read();
            await page.evaluate(() => [...$t("run").querySelectorAll("button")].find((b) => b.textContent.trim() === "Option 7").click());
            await sleep(600);
            const after = await read();
            // The keys arms: Option 0 holds focus with the page and the outer scroller at
            // rest, then ArrowRight seven times (and Enter under manual activation), read
            // after every press.
            const keys = await selgroupKeys(browser, "automatic");
            const manual = await selgroupKeys(browser, "manual");
            return { before, after, errors, keys, manual };
        } finally {
            await context.close();
        }
    },
    async table(browser) {
        const out = {};
        for (const [name, opts] of [
            ["fine", DESKTOP],
            ["narrow", { viewport: { width: 320, height: 700 }, deviceScaleFactor: 1 }],
            ["coarse", PHONE],
        ]) {
            const { context, page, errors } = await open(browser, opts, "table");
            try {
                const rest = await page.evaluate(() => {
                    const th = $('[data-slot="data-table"] th');
                    const sort = $(".data-table-sort");
                    return {
                        coarse: matchMedia("(pointer: coarse)").matches,
                        thFont: parseFloat(getComputedStyle(th).fontSize),
                        sortFont: parseFloat(getComputedStyle(sort).fontSize),
                        sortHeight: sort.getBoundingClientRect().height,
                        thHeight: th.getBoundingClientRect().height,
                    };
                });
                let ring = null;
                if (name === "fine") {
                    // Safari's default Tab skips buttons; Option-Tab reaches them.
                    const tab = ENGINE_NAME === "webkit" ? "Alt+Tab" : "Tab";
                    for (let i = 0; i < 12; i++) {
                        await page.keyboard.press(tab);
                        const on = await page.evaluate(() => document.activeElement?.classList.contains("data-table-sort"));
                        if (on) break;
                    }
                    ring = await page.evaluate(() => {
                        const el = document.activeElement;
                        const cs = getComputedStyle(el);
                        return {
                            focused: el.classList.contains("data-table-sort"),
                            focusVisible: el.matches(":focus-visible"),
                            style: cs.outlineStyle,
                            width: parseFloat(cs.outlineWidth),
                            offset: parseFloat(cs.outlineOffset),
                            inset: parseFloat(cs.outlineOffset) + parseFloat(cs.outlineWidth) <= 0,
                        };
                    });
                }
                out[name] = { ...rest, ring, errors };
            } finally {
                await context.close();
            }
        }
        return out;
    },
    async "sheet-full"(browser) {
        const { context, page, errors } = await open(browser, PHONE, "sheet-full");
        try {
            let override = "not available in this engine";
            if (ENGINE_NAME === "chromium") {
                try {
                    const cdp = await context.newCDPSession(page);
                    await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { top: 47, bottom: 34, left: 0, right: 0 } });
                    override = "top 47, bottom 34";
                } catch (e) {
                    override = `refused: ${String(e).slice(0, 120)}`;
                }
                await sleep(200);
            }
            const env = await page.evaluate(() => {
                const probe = document.createElement("div");
                probe.style.cssText = "position:fixed;padding-top:env(safe-area-inset-top,0px);visibility:hidden";
                document.body.append(probe);
                const top = parseFloat(getComputedStyle(probe).paddingTop);
                probe.remove();
                return top;
            });
            await page.tap('[data-t="trigger"]');
            await sleep(1800);
            const sheet = await page.evaluate(() => {
                const r = $t("sheet").getBoundingClientRect();
                return { top: r.top, height: r.height, bottom: r.bottom, innerHeight };
            });
            const rule = await page.evaluate(() => {
                const hits = [];
                const walk = (rules) => {
                    for (const r of rules) {
                        if (r.cssRules) walk(r.cssRules);
                        if (r.selectorText && r.selectorText.includes("sheet-content") && r.selectorText.includes("data-detents") && r.cssText.includes("safe-area-inset-top")) hits.push(r.selectorText.slice(0, 120));
                    }
                };
                for (const s of document.styleSheets) {
                    try {
                        walk(s.cssRules);
                    } catch {}
                }
                return hits;
            });
            return { override, env, sheet, ruleNamesTopInset: rule.length > 0, rule: rule.slice(0, 2), errors };
        } finally {
            await context.close();
        }
    },
};

async function selgroupKeys(browser, activation) {
    const { context, page, errors } = await open(browser, DESKTOP, "selgroup", activation === "manual" ? "&act=manual" : "");
    try {
        const read = (key) =>
            page.evaluate((key) => {
                const run = $t("run");
                const focused = document.activeElement;
                const port = run.getBoundingClientRect();
                const box = focused?.getBoundingClientRect();
                return {
                    key,
                    page: scrollY,
                    outer: $t("outer").scrollTop,
                    run: Math.round(run.scrollLeft),
                    focused: run.contains(focused) ? focused.textContent.trim() : desc(focused),
                    inRun: !!box && box.left >= port.left - 1 && box.right <= port.right + 1,
                    selected: [...run.querySelectorAll("button")].find((b) => ["aria-checked", "aria-pressed", "aria-selected"].some((a) => b.getAttribute(a) === "true"))?.textContent.trim(),
                };
            }, key);
        await page.evaluate(() => [...$t("run").querySelectorAll("button")].find((b) => b.textContent.trim() === "Option 0").focus({ preventScroll: true }));
        const reads = [await read("start")];
        for (let i = 0; i < 7; i++) {
            await page.keyboard.press("ArrowRight");
            await sleep(150);
            reads.push(await read("ArrowRight"));
        }
        if (activation === "manual") {
            await page.keyboard.press("Enter");
            await sleep(150);
            reads.push(await read("Enter"));
        }
        await sleep(450);
        reads.push(await read("settled"));
        return { activation, reads, errors };
    } finally {
        await context.close();
    }
}

async function popoverCell(browser, cell) {
    const { context, page, errors } = await open(browser, DESKTOP, cell);
    try {
        const read = () =>
            page.evaluate(() => {
                const t = $t("trigger");
                const id = t.getAttribute("aria-controls");
                return {
                    tag: t.tagName.toLowerCase(),
                    has: t.hasAttribute("aria-controls"),
                    value: id,
                    target: id ? !!document.getElementById(id) : null,
                    expanded: t.getAttribute("aria-expanded"),
                    haspopup: t.getAttribute("aria-haspopup"),
                    nested: t.querySelector("button") !== null,
                    content: !!$('[data-slot="popover-content"]'),
                };
            });
        const closed = await read();
        await page.click('[data-t="trigger"]');
        await sleep(600);
        const opened = await read();
        await page.keyboard.press("Escape");
        await sleep(1500);
        const closedAgain = await read();
        const focusBack = await page.evaluate(() => document.activeElement === $t("trigger"));
        return { closed, opened, closedAgain, focusBack, errors };
    } finally {
        await context.close();
    }
}

async function printModal(browser, cell, selector) {
    const { context, page, errors } = await open(browser, DESKTOP, cell);
    try {
        await sleep(900);
        const read = () =>
            page.evaluate(
                ({ flat, selector }) => {
                    const f = new Function(`return (${flat})`)();
                    const plate = $(selector);
                    const scrim = [...document.querySelectorAll("body > *")].find((el) => (el.className || "").toString().includes("bg-overlay-scrim"));
                    const halo = $('[data-slot="glass-graded-halo"]');
                    return {
                        plate: plate ? shown(plate) : "absent",
                        plateBg: plate ? getComputedStyle(plate).backgroundColor : null,
                        scrim: scrim ? shown(scrim) : "absent",
                        scrimBg: scrim ? getComputedStyle(scrim).backgroundColor : null,
                        halo: halo ? shown(halo) : "absent",
                        ...f(),
                    };
                },
                { flat: flatRead.toString(), selector },
            );
        const screen = await read();
        await page.emulateMedia({ media: "print" });
        await sleep(400);
        const print = await read();
        return { screen, print, errors };
    } finally {
        await context.close();
    }
}

async function stack(browser, cell) {
    const { context, page, errors } = await open(browser, DESKTOP, cell);
    try {
        if (cell === "stack-expand") await page.click('[data-mode="expand"]');
        else await page.click('[data-t="lower-trigger"]');
        await sleep(1000);
        const lowerOnly = await page.evaluate(() => ({ root: document.documentElement.style.overflow || getComputedStyle(document.documentElement).overflowY }));
        await page.click('[data-t="top-trigger"]');
        await sleep(1000);
        const both = await page.evaluate(() => {
            const lower = $t("lower");
            const top = $t("top");
            const scrims = [...document.querySelectorAll("body > *")].filter((el) => (el.className || "").toString().includes("bg-overlay-scrim"));
            let topScrim = top.previousElementSibling;
            while (topScrim && !(topScrim.className || "").toString().includes("bg-overlay-scrim")) topScrim = topScrim.previousElementSibling;
            const lr = lower.getBoundingClientRect();
            const tr = top.getBoundingClientRect();
            // A point on the lower surface outside the top plate.
            const px = lr.left + 24;
            const py = lr.top + 24;
            const insideTop = px >= tr.left && px <= tr.right && py >= tr.top && py <= tr.bottom;
            return {
                plateOverLower: paintsAbove(top, lower),
                scrimOverLower: topScrim ? paintsAbove(topScrim, lower) : "no scrim",
                scrims: scrims.length,
                probe: insideTop ? "inside top" : desc(document.elementFromPoint(px, py)),
                topCentre: (() => {
                    const hit = document.elementFromPoint(tr.left + tr.width / 2, tr.top + 12);
                    return top.contains(hit) ? "top" : lower.contains(hit) ? "lower" : desc(hit);
                })(),
                root: document.documentElement.style.overflow || getComputedStyle(document.documentElement).overflowY,
                focus: top.contains(document.activeElement) ? "in top" : desc(document.activeElement),
            };
        });
        await page.keyboard.press("Escape");
        // Where focus is while the top plate leaves (its exit runs for a few hundred ms),
        // and where it is once the top plate has gone.
        await sleep(120);
        const duringExit = await page.evaluate(() => {
            const lower = $t("lower");
            return { focusInLower: !!lower && lower.contains(document.activeElement), focus: desc(document.activeElement) };
        });
        await page.waitForFunction(() => !document.querySelector('[data-t="top"]'), null, { timeout: 8000 }).catch(() => {});
        await sleep(300);
        const afterEsc = await page.evaluate((cell) => {
            const lower = $t("lower");
            const top = $t("top");
            const lowerOpen =
                cell === "stack-expand"
                    ? lower?.getAttribute("data-state") === "expanded"
                    : !!lower && shown(lower) && lower.getAttribute("data-state") === "open";
            return {
                topOpen: !!top && shown(top) && top.getAttribute("data-state") === "open",
                lowerOpen,
                root: document.documentElement.style.overflow || getComputedStyle(document.documentElement).overflowY,
                focusInLower: !!lower && lower.contains(document.activeElement),
                focus: desc(document.activeElement),
            };
        }, cell);
        return { lowerOnly, both, duringExit, afterEsc, errors };
    } finally {
        await context.close();
    }
}

async function center(page, selector) {
    return page.evaluate((s) => {
        const r = document.querySelector(s).getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, selector);
}

async function armSpy(page) {
    await page.evaluate(() => {
        window.__focusLog = [];
        window.__scroll = [];
        window.__mark = Infinity;
        const own = HTMLElement.prototype.focus;
        HTMLElement.prototype.focus = function (opts) {
            const before = document.activeElement;
            const out = own.call(this, opts);
            const moved = document.activeElement === this && before !== this;
            window.__focusLog.push({ t: performance.now(), el: desc(this), preventScroll: !!opts?.preventScroll, moved });
            return out;
        };
        const tick = () => {
            window.__scroll.push([performance.now(), scrollY]);
            if (window.__scroll.length < 600) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

async function spyRead(page) {
    return page.evaluate(() => {
        const after = window.__focusLog.filter((f) => f.t >= window.__mark);
        const ys = window.__scroll.filter(([t]) => t >= window.__mark).map(([, y]) => y);
        const y0 = window.__scroll.filter(([t]) => t < window.__mark).at(-1)?.[1] ?? scrollY;
        return {
            focusAfterPick: after.map((f) => `${f.el}${f.preventScroll ? " (preventScroll)" : " (no preventScroll)"}${f.moved ? " moved" : " did not move"}`),
            scrollingFocus: after.filter((f) => !f.preventScroll && f.moved).length,
            activeAtEnd: desc(document.activeElement),
            pageY0: y0,
            pageMin: ys.length ? Math.min(...ys) : y0,
            pageMax: ys.length ? Math.max(...ys) : y0,
            pageEnd: scrollY,
        };
    });
}

const result = { engine: ENGINE_NAME, dist: DIST, cells: {} };
let browser;
try {
    // Chromium shows its classic scrollbars, so the gutter reading has a bar to keep.
    browser = await ENGINE.launch(ENGINE_NAME === "chromium" ? { headless: true, ignoreDefaultArgs: ["--hide-scrollbars"] } : { headless: true });
    result.version = browser.version();
    for (const [name, run] of Object.entries(CELLS)) {
        if (PICK && !PICK.has(name)) continue;
        try {
            result.cells[name] = await run(browser);
        } catch (e) {
            result.cells[name] = { failed: String(e).slice(0, 400) };
        }
        process.stdout.write(`${name} `);
    }
} finally {
    await browser?.close();
    server.close();
}
writeFileSync(OUT, JSON.stringify(result, null, 2));
console.log(`\nwrote ${OUT}`);
