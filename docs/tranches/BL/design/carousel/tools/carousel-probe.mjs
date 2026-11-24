#!/usr/bin/env node
// carousel-probe.mjs — the carousel study's frame recorder (docs/tranches/BL/design/carousel/).
//
//   node carousel-probe.mjs --engine chromium|webkit --cells <id,id,...|all> [--out dir]
//        [--trace <id,...>] [--port 5381] [--inspect <source>@<w>]
//
// One headless browser per run, a new context per cell, everything closed in finally.
// Chromium is Playwright's headless shell on the GPU lane (--use-angle=metal
// --enable-gpu-rasterization, as harness/probe.mjs); WebKit is Playwright's WebKit build
// (run it under guarded --exclusive webkit). Each cell injects the harness frame sampler
// (harness/sampler.js, patched to read each tracked element's scrollLeft and its
// picture's load state) and recorder.js, drives one input sequence, and writes
// <out>/<cell id>.<engine>.json: the per-frame series in columns, the marks, the scroll
// calls, the attribute writes, the strip's events, picture timing, long tasks and long
// animation frames, the animations that ran, and under --trace the Chromium trace counts.
//
// Sources: atlas (the live home deck), demo (glass's demo carousel, v11.1.0), hero (the
// heavy test page on v11.1.0; variant = content), daraksha (the live portraits page).
// Inputs: touch (a one-slide swipe, then a fast flick; Chromium only), wheel (trackpad
// steps), pager (next, previous, a dot), drag (a mouse drag and flick; daraksha in WebKit).
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const TREE = resolve(HERE, "../trees/red");
const HARNESS = resolve(HERE, "../../../audit/animation/harness");
const require = createRequire(join(TREE, "package.json"));
const pw = require("playwright");

const args = process.argv.slice(2);
const opt = { engine: "chromium", out: resolve(HERE, "../record"), cells: "all", trace: "", port: 5381 };
for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--engine") opt.engine = args[++i];
    else if (a === "--cells") opt.cells = args[++i];
    else if (a === "--out") opt.out = resolve(args[++i]);
    else if (a === "--trace") opt.trace = args[++i];
    else if (a === "--port") opt.port = +args[++i];
    else if (a === "--inspect") opt.inspect = args[++i];
}
const LOCAL = `http://127.0.0.1:${opt.port}`;

// The harness sampler, patched: each tracked row also carries the element's scrollLeft
// (sl) and, for an element holding a picture, whether it has loaded (ic: 1 loaded, 0 not,
// -1 no picture). Nothing else in it changes.
const SAMPLER = readFileSync(join(HARNESS, "sampler.js"), "utf8").replace(
    'vis: cs.visibility === "visible"',
    'sl: el.scrollLeft, ic: ((q) => (q ? (q.complete && q.naturalWidth > 0 ? 1 : 0) : -1))(el.querySelector ? el.querySelector("img") : null), vis: cs.visibility === "visible"',
);
if (!SAMPLER.includes("sl: el.scrollLeft")) throw new Error("sampler patch did not apply");
const RECORDER = readFileSync(join(HERE, "recorder.js"), "utf8");
// The demo story ticks its own 4200 ms autoplay (demo/stories/navigation/carousel.vue);
// it moves the dots between our gestures. Dropped in that page only, as the
// apple-homeview gap study did (GAP.md section 0).
const DEMO_NO_AUTOPLAY = `(() => { const si = window.setInterval; window.setInterval = function (f, ms, ...a) { if (ms === 4200) return 0; return si.call(this, f, ms, ...a); }; })();`;

const GLASS = {
    member: ":scope > [data-slot=carousel-item]",
};
// Selectors per source. strip: the scroll container; members: its children; pager: the
// dot rail; next/prev: the chevrons (null where the source has none at that width).
const SOURCES = {
    atlas: {
        url: () => "https://a5eecbdb.atlas-dg2.pages.dev/",
        root: "[data-testid=hero-carousel]",
        strip: "[data-testid=hero-carousel] [data-slot=carousel-content]",
        pager: "[data-testid=hero-dock] [data-slot=pager-dots]",
        next: "[data-testid=hero-next]",
        prev: "[data-testid=hero-prev]",
        caption: "[data-testid=hero-caption] .hero-stage__words",
        kind: "snap",
    },
    demo: {
        url: () => `${LOCAL}/?c=carousel`,
        root: "[data-testid=carousel-0]",
        strip: "[data-testid=carousel-0] [data-slot=carousel-content]",
        pager: "[data-testid=carousel-0] [data-slot=pager-dots]",
        // The hero exhibit has no chevrons; the peek exhibit's CarouselPager is the
        // library's own chevron pager. Pager cells drive that exhibit (strip below).
        pagerStrip: "[data-testid=carousel-1] [data-slot=carousel-content]",
        pagerRoot: "[data-testid=carousel-1]",
        next: "[data-testid=carousel-1] [data-slot=carousel-pager-next]",
        prev: "[data-testid=carousel-1] [data-slot=carousel-pager-prev]",
        counter: "[data-testid=carousel-1] [data-slot=carousel-pager-counter]",
        init: DEMO_NO_AUTOPLAY,
        kind: "snap",
    },
    hero: {
        url: (v) => `${LOCAL}/?c=carousel-hero&content=${v || "none"}`,
        root: "[data-testid=hero-carousel]",
        strip: "[data-testid=hero-carousel] [data-slot=carousel-content]",
        pager: "[data-testid=hero-dock] [data-slot=pager-dots]",
        next: "[data-testid=hero-next]",
        prev: "[data-testid=hero-prev]",
        kind: "snap",
    },
    daraksha: {
        url: () => "https://daraksha.babb.dev/portraits",
        root: "figure.portrait",
        strip: null,
        frames: "figure.portrait .pair > .frame",
        windowKids: "figure.portrait .pair .window > *",
        drawing: "figure.portrait .pair .stage .drawing",
        pager: "figure.portrait .rail [data-slot=pager-dots]",
        number: "figure.portrait .number",
        kind: "glide",
    },
};

// The selector fields of a source, for page.evaluate (functions do not serialise).
const plain = (S) => Object.fromEntries(Object.entries(S).filter(([k, v]) => typeof v === "string" && k !== "init"));

const GPU_ARGS = ["--use-angle=metal", "--enable-gpu-rasterization"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── the cell list ───────────────────────────────────────────────────────────
function allCells() {
    const cells = [];
    const widths = [
        { w: 1440, h: 900 },
        { w: 390, h: 844 },
    ];
    const add = (source, variant, input) => {
        for (const v of widths) cells.push({ id: `${source}${variant ? "-" + variant : ""}.${input}.${v.w}`, source, variant, input, ...v });
    };
    for (const input of ["touch", "wheel", "wheelraw", "pager"]) add("atlas", "", input);
    for (const input of ["touch", "wheel", "pager"]) add("demo", "", input);
    for (const c of ["none", "webp", "svg", "canvas"]) for (const input of ["touch", "wheel", "pager"]) add("hero", c, input);
    add("hero", "none", "wheelraw");
    // controls: the platform's snap alone (bare), and the Carousel without its projection (flat)
    for (const c of ["none-bare", "none-flat"]) for (const input of ["touch", "wheel"]) add("hero", c, input);
    for (const c of ["svg", "canvas"]) for (const input of ["touch", "pager"]) add("hero", c + "-active", input);
    // the near-snap prototype (ROOT.md §4), on a tree that has it: the slot's `moving`
    // with all eight mounted, and with the page's own near window
    for (const input of ["touch", "pager"]) add("hero", "svg-moving", input);
    for (const input of ["touch", "pager"]) add("hero", "svg-slot", input);
    for (const input of ["touch", "drag", "wheel", "pager"]) add("daraksha", "", input);
    return cells;
}

// ── run ─────────────────────────────────────────────────────────────────────
async function main() {
    mkdirSync(opt.out, { recursive: true });
    const browserType = pw[opt.engine];
    const launchArgs = opt.engine === "chromium" ? GPU_ARGS : [];
    let browser;
    try {
        browser = await browserType.launch({ headless: true, args: launchArgs });
        if (opt.inspect) {
            const [src, w] = opt.inspect.split("@");
            const [source, variant] = src.split(":");
            await inspect(browser, { source, variant, w: +w || 1440, h: +w === 390 ? 844 : 900 });
            return;
        }
        const want = opt.cells === "all" ? null : new Set(opt.cells.split(","));
        const traced = new Set(opt.trace ? opt.trace.split(",") : []);
        // A cell named in --trace runs a second time, traced (hook raf), to <id>.<engine>.trace.json.
        const cells = allCells()
            .filter((c) => !want || want.has(c.id) || traced.has(c.id))
            .flatMap((c) => [...(!want || want.has(c.id) ? [{ ...c, traced: false }] : []), ...(traced.has(c.id) && opt.engine === "chromium" ? [{ ...c, traced: true }] : [])]);
        for (const cell of cells) {
            const t = Date.now();
            try {
                const r = await runCell(browser, cell, cell.traced, launchArgs);
                console.log(JSON.stringify({ cell: cell.id, traced: cell.traced, ok: true, ms: Date.now() - t, ...r }));
            } catch (e) {
                console.log(JSON.stringify({ cell: cell.id, traced: cell.traced, ok: false, ms: Date.now() - t, error: String(e && e.message ? e.message : e).slice(0, 400) }));
            }
        }
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}

function contextOptions(cell) {
    const phone = cell.w <= 500;
    const o = {
        viewport: { width: cell.w, height: cell.h },
        deviceScaleFactor: phone ? 3 : 2,
        colorScheme: "light",
        reducedMotion: "no-preference",
        // 1440 is a desktop (fine pointer, no touch screen); its touch cells still send
        // touch through CDP, which Chromium turns into a gesture scroll either way.
        hasTouch: phone,
    };
    if (phone && opt.engine === "chromium") o.isMobile = true;
    return o;
}

async function openPage(browser, cell) {
    const S = SOURCES[cell.source];
    const context = await browser.newContext(contextOptions(cell));
    await context.addInitScript(SAMPLER);
    await context.addInitScript(RECORDER);
    if (S.init) await context.addInitScript(S.init);
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 240)));
    page.on("pageerror", (e) => consoleErrors.push("pageerror: " + String(e).slice(0, 240)));
    const variant = (cell.variant || "").replace(/-(active|moving|slot|bare|flat)$/, "");
    let url = S.url(variant);
    if (cell.source === "hero" && /-active$/.test(cell.variant || "")) url += "&live=active";
    if (cell.source === "hero" && /-moving$/.test(cell.variant || "")) url += "&live=moving";
    if (cell.source === "hero" && /-slot$/.test(cell.variant || "")) url += "&live=slot";
    if (cell.source === "hero" && /-bare$/.test(cell.variant || "")) url += "&bare=1";
    if (cell.source === "hero" && /-flat$/.test(cell.variant || "")) url += "&projection=none";
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
    await page.waitForSelector(S.root, { timeout: 20000 });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { context, page, url, consoleErrors };
}

async function inspect(browser, cell) {
    const { context, page, url } = await openPage(browser, cell);
    try {
        const S = SOURCES[cell.source];
        const info = await page.evaluate((S) => {
            const box = (e) => {
                if (!e) return null;
                const r = e.getBoundingClientRect();
                return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)];
            };
            const q = (s) => (s ? document.querySelector(s) : null);
            const strip = q(S.strip);
            const out = {
                scrollY: scrollY,
                docH: document.documentElement.scrollHeight,
                root: box(q(S.root)),
                strip: box(strip),
                stripScroll: strip ? [strip.scrollLeft, strip.scrollWidth, strip.clientWidth, getComputedStyle(strip).scrollSnapType] : null,
                members: strip ? [...strip.children].map((m) => ({ box: box(m), state: m.getAttribute("data-state"), inert: m.hasAttribute("inert"), ah: m.getAttribute("aria-hidden"), img: (m.querySelector("img") || {}).currentSrc })) : null,
                pager: box(q(S.pager)),
                dots: q(S.pager) ? [...q(S.pager).querySelectorAll(".pager-dot")].map((d) => ({ box: box(d), cur: d.getAttribute("aria-current") })) : null,
                next: box(q(S.next)),
                prev: box(q(S.prev)),
                nextVisible: q(S.next) ? getComputedStyle(q(S.next)).display : null,
                frames: S.frames ? [...document.querySelectorAll(S.frames)].map(box) : null,
                windowKids: S.windowKids ? [...document.querySelectorAll(S.windowKids)].map((e) => [e.tagName, e.className && e.className.baseVal === undefined ? e.className : "", box(e)]) : null,
                drawing: box(q(S.drawing)),
                number: q(S.number) ? q(S.number).textContent.trim() : null,
            };
            return out;
        }, plain(S));
        console.log(JSON.stringify({ url, info }, null, 1));
    } finally {
        await context.close().catch(() => {});
    }
}

// Tracked elements for the sampler, per source. Colours are left out (colors: []) to
// keep each frame's reads short.
function trackFor(cell) {
    const S = SOURCES[cell.source];
    const none = { colors: [] };
    if (S.kind === "glide") {
        return [
            { as: "frame", sel: S.frames, all: true, ...none },
            // the drawing's window and the photo's window, apart (a neighbour is a bare div)
            { as: "dpic", sel: "figure.portrait .pair .stage .window > *", all: true, attrs: ["data-neighbour", "data-leaving", "data-departed", "class"], ...none },
            { as: "ppic", sel: "figure.portrait .pair .source .window > *", all: true, attrs: ["data-neighbour", "data-leaving", "data-departed", "class"], ...none },
            { as: "dot", sel: `${S.pager} .pager-dot`, all: true, attrs: ["aria-current", "data-active"], ...none },
            { as: "body", sel: `${S.pager} .goo-body`, all: true, ...none },
            { as: "neck", sel: `${S.pager} .goo-neck`, ...none },
            { as: "num", sel: `${S.number} .now > span`, all: true, ...none },
        ];
    }
    const strip = cell.input === "pager" && S.pagerStrip ? S.pagerStrip : S.strip;
    const t = [
        { as: "strip", sel: strip, ...none },
        { as: "m", sel: `${strip} > [data-slot=carousel-item]`, all: true, attrs: ["data-state", "inert", "aria-hidden"], ...none },
        { as: "mc", sel: `${strip} > [data-slot=carousel-item] > .carousel-item-content`, all: true, ...none },
    ];
    if (!(cell.input === "pager" && S.pagerStrip)) {
        t.push(
            { as: "dot", sel: `${S.pager} .pager-dot`, all: true, attrs: ["aria-current", "data-active"], ...none },
            { as: "pip", sel: `${S.pager} .goo-dot`, all: true, attrs: ["data-active", "data-flip"], ...none },
            { as: "body", sel: `${S.pager} .goo-body`, all: true, ...none },
            { as: "neck", sel: `${S.pager} .goo-neck`, ...none },
        );
    } else if (S.counter) {
        t.push({ as: "counter", sel: S.counter, attrs: [], ...none });
    }
    if (S.caption) t.push({ as: "cap", sel: S.caption, all: true, ...none });
    return t;
}

// ── input driver ────────────────────────────────────────────────────────────
function driver(page, cdp, cell) {
    const d = { log: [], pos: { x: 0, y: 0 } };
    const touch = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
    const mark = (name) => page.evaluate((n) => window.__sampler.mark(n), name);
    d.mark = mark;
    d.box = (sel) =>
        page.evaluate((s) => {
            const e = document.querySelector(s);
            if (!e) return null;
            const r = e.getBoundingClientRect();
            const cs = getComputedStyle(e);
            return { x: r.x, y: r.y, w: r.width, h: r.height, display: cs.display, vis: cs.visibility };
        }, sel);
    // A straight press-move-release on an absolute 60 Hz clock: touch (CDP) or mouse.
    d.stroke = async (from, to, ms, kind, holdMs = 0) => {
        const hz = 60;
        const n = Math.max(1, Math.round((ms / 1000) * hz));
        if (kind === "touch") await touch("touchStart", from.x, from.y);
        else {
            await page.mouse.move(from.x, from.y);
            await page.mouse.down();
        }
        const t0 = Date.now();
        for (let k = 1; k <= n; k++) {
            const f = k / n;
            const x = from.x + (to.x - from.x) * f;
            const y = from.y + (to.y - from.y) * f;
            if (kind === "touch") await touch("touchMove", x, y);
            else await page.mouse.move(x, y);
            const wait = t0 + (k * 1000) / hz - Date.now();
            if (wait > 0) await sleep(wait);
        }
        if (holdMs) await sleep(holdMs);
        if (kind === "touch") await touch("touchEnd", to.x, to.y);
        else await page.mouse.up();
        d.log.push({ do: "stroke", kind, from, to, ms, holdMs, moves: n, took: Date.now() - t0 });
    };
    d.tap = async (p) => {
        if (cdp && cell.w <= 500) {
            await touch("touchStart", p.x, p.y);
            await sleep(40);
            await touch("touchEnd", p.x, p.y);
        } else await page.mouse.click(p.x, p.y);
        d.log.push({ do: "tap", p, touch: !!(cdp && cell.w <= 500) });
    };
    // Trackpad-like wheel: a rise then a decaying tail (the momentum phase), in small
    // pixel steps every 16 ms, summing to `total` px along x.
    d.wheel = async (at, total) => {
        await page.mouse.move(at.x, at.y);
        const shape = [];
        for (let k = 1; k <= 8; k++) shape.push(k);
        let v = 8;
        for (let k = 0; k < 26; k++) shape.push((v *= 0.86));
        const sum = shape.reduce((a, b) => a + b, 0);
        const steps = shape.map((s) => (s / sum) * total);
        const t0 = Date.now();
        let acc = 0;
        for (let k = 0; k < steps.length; k++) {
            acc += steps[k];
            const dx = Math.round(acc) - Math.round(acc - steps[k]);
            if (dx) await page.mouse.wheel(dx, 0);
            const wait = t0 + (k + 1) * 16 - Date.now();
            if (wait > 0) await sleep(wait);
        }
        d.log.push({ do: "wheel", total, events: steps.length, took: Date.now() - t0 });
    };
    // Settle: the tracked values changed, then held still for quietMs (or maxMs passed).
    d.settle = async (quietMs = 450, maxMs = 3500) => {
        const begin = await page.evaluate(() => performance.now());
        for (;;) {
            const q = await page.evaluate(() => window.__sampler.quiet());
            if (q.lastChange >= begin && q.now - q.lastChange >= quietMs) break;
            if (q.lastChange < begin && q.now - begin >= quietMs + 300) break;
            if (q.now - begin > maxMs) {
                d.log.push({ do: "settle", timeout: true });
                break;
            }
            await sleep(30);
        }
    };
    return d;
}

async function activeIndex(page, cell) {
    const S = SOURCES[cell.source];
    return page.evaluate((S) => {
        const pager = document.querySelector(S.pager);
        const dots = pager ? [...pager.querySelectorAll(".pager-dot")] : [];
        const i = dots.findIndex((d) => d.getAttribute("aria-current") === "true" || d.hasAttribute("data-active"));
        return { dot: i, dots: dots.length, label: i >= 0 ? dots[i].getAttribute("aria-label") : null };
    }, plain(S));
}

async function dotPoint(page, cell, index) {
    const S = SOURCES[cell.source];
    return page.evaluate(
        ([S, k]) => {
            const pager = document.querySelector(S.pager);
            const dots = pager ? [...pager.querySelectorAll(".pager-dot")] : [];
            // by its label where the rail names dots "Go to slide N"; else by order
            const d = dots.find((b) => b.getAttribute("aria-label") === `Go to slide ${k + 1}`) || dots[k] || null;
            if (!d) return null;
            const r = d.getBoundingClientRect();
            return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
        },
        [plain(S), index],
    );
}

async function runSteps(page, cdp, cell, drv) {
    const S = SOURCES[cell.source];
    const L = drv.log;
    const target = S.kind === "glide" ? S.drawing : cell.input === "pager" && S.pagerStrip ? S.pagerStrip : S.strip;
    const b = await drv.box(target);
    if (!b) throw new Error("no target " + target);
    const mid = { x: b.x + b.w / 2, y: b.y + Math.min(b.h / 2, 300) };
    if (cell.input === "touch" || cell.input === "drag") {
        const kind = cell.input === "touch" ? "touch" : "mouse";
        if (kind === "touch" && !cdp) throw new Error("touch needs CDP (Chromium)");
        // one slide: from 78% to 22% of the target's width over 320 ms, then release
        await drv.mark("swipe");
        await drv.stroke({ x: b.x + b.w * 0.78, y: mid.y }, { x: b.x + b.w * 0.22, y: mid.y }, 320, kind);
        await drv.mark("swipe-up");
        await drv.settle();
        await sleep(250);
        // a fast flick: 130 px in 80 ms (1.6 px/ms), released moving
        await drv.mark("flick");
        await drv.stroke({ x: b.x + b.w * 0.62, y: mid.y }, { x: b.x + b.w * 0.62 - 130, y: mid.y }, 80, kind);
        await drv.mark("flick-up");
        await drv.settle(450, 4000);
        await sleep(250);
        // a slow carry past the commit point, held, then let go: 80% of the width over
        // 700 ms, a 200 ms hold with the finger down, release (the index commits while held)
        await drv.mark("carry");
        await drv.stroke({ x: b.x + b.w * 0.9, y: mid.y }, { x: b.x + b.w * 0.1, y: mid.y }, 700, kind, 200);
        await drv.mark("carry-up");
        await drv.settle(450, 4000);
        return;
    }
    if (cell.input === "wheel" || cell.input === "wheelraw") {
        // 60% of the target's width toward the next slide. Chromium "wheel": the
        // engine's own synthetic wheel gesture (Input.synthesizeScrollGesture, mouse
        // source), whose wheel events carry begin/update/end phases as a trackpad's do.
        // "wheelraw" (and every WebKit wheel cell): bare wheel events in small pixel
        // steps every 16 ms, a rise then a decaying tail, with no phase.
        await page.mouse.move(mid.x, mid.y);
        await drv.mark("wheel");
        if (cdp && cell.input === "wheel") {
            const t0 = Date.now();
            await cdp.send("Input.synthesizeScrollGesture", { x: mid.x, y: mid.y, xDistance: -Math.round(b.w * 0.6), yDistance: 0, speed: 1200, gestureSourceType: "mouse", preventFling: false });
            L.push({ do: "synthesizeScrollGesture", source: "mouse", px: Math.round(b.w * 0.6), speed: 1200, took: Date.now() - t0 });
        } else await drv.wheel(mid, b.w * 0.6);
        await drv.mark("wheel-end");
        await drv.settle(500, 4000);
        return;
    }
    if (cell.input === "pager") {
        if (S.kind === "glide") {
            await page.mouse.move(4, 4);
            await drv.mark("next");
            await page.keyboard.press("ArrowRight");
            L.push({ do: "key", key: "ArrowRight" });
            await drv.settle(450, 4000);
            await sleep(250);
            await drv.mark("prev");
            await page.keyboard.press("ArrowLeft");
            L.push({ do: "key", key: "ArrowLeft" });
            await drv.settle(450, 4000);
            await sleep(250);
        } else {
            const nb = S.next ? await drv.box(S.next) : null;
            const chevrons = nb && nb.display !== "none" && nb.w > 0;
            for (const [name, sel, step] of [
                ["next", S.next, 1],
                ["prev", S.prev, -1],
            ]) {
                await drv.mark(name);
                if (chevrons) {
                    const bb = await drv.box(sel);
                    await drv.tap({ x: bb.x + bb.w / 2, y: bb.y + bb.h / 2 });
                } else {
                    const a = await activeIndex(page, cell);
                    const p = await dotPoint(page, cell, a.dot + step);
                    if (!p) throw new Error("no dot for " + name);
                    L.push({ do: "dot-for", name, from: a.dot });
                    await drv.tap(p);
                }
                await drv.settle(450, 4000);
                await sleep(250);
            }
            if (S.pagerStrip) return; // the peek exhibit's pager has no dots
        }
        // a dot two ahead of the active one
        const a = await activeIndex(page, cell);
        const p = await dotPoint(page, cell, a.dot + 2);
        if (!p) throw new Error("no dot two ahead of " + a.dot);
        await drv.mark("dot");
        L.push({ do: "dot", from: a.dot, to: a.dot + 2 });
        await drv.tap(p);
        await drv.settle(450, 4000);
        return;
    }
    throw new Error("unknown input " + cell.input);
}

async function runCell(browser, cell, trace, launchArgs) {
    const S = SOURCES[cell.source];
    const { context, page, url, consoleErrors } = await openPage(browser, cell);
    try {
        // Bring the stage into view (before recording), then let it rest.
        await page.evaluate((sel) => {
            const e = document.querySelector(sel);
            if (e) e.scrollIntoView({ block: "center", behavior: "instant" });
        }, cell.input === "pager" && S.pagerRoot ? S.pagerRoot : S.root);
        await sleep(700);
        const strip = cell.input === "pager" && S.pagerStrip ? S.pagerStrip : S.strip;
        const watch = await page.evaluate(([s, p]) => window.__crec.watch(s, p), [strip, S.kind === "glide" ? S.root : S.pager]);
        const before = await activeIndex(page, cell);
        const cdp = opt.engine === "chromium" ? await context.newCDPSession(page) : null;
        const drv = driver(page, cdp, cell);
        if (trace && opt.engine === "chromium") {
            await browser.startTracing(page, {
                categories: [
                    "devtools.timeline",
                    "disabled-by-default-devtools.timeline",
                    "disabled-by-default-devtools.timeline.frame",
                    "blink.user_timing",
                    "cc",
                    "loading",
                ],
            });
        }
        const track = trackFor(cell);
        const start = await page.evaluate(([t, hook]) => window.__sampler.start(t, { hook, anims: true }), [track, trace ? "raf" : "ro"]);
        await page.evaluate((t0) => window.__crec.start(t0), start.t0);
        await sleep(120);
        await runSteps(page, cdp, cell, drv);
        await sleep(150);
        const rec = await page.evaluate(() => window.__sampler.stop());
        const extra = await page.evaluate(() => window.__crec.stop());
        let traceSum = null;
        if (trace && opt.engine === "chromium") {
            const buf = await browser.stopTracing();
            traceSum = traceCounts(JSON.parse(buf.toString("utf8")), rec);
        }
        const after = await activeIndex(page, cell);
        const figures = await page.evaluate(() => window.__figureStats || null);
        const out = {
            meta: {
                cell,
                engine: opt.engine,
                browserVersion: browser.version(),
                browserArgs: launchArgs,
                url,
                hook: trace ? "raf" : "ro",
                ctx: contextOptions(cell),
                watch,
                activeBefore: before,
                activeAfter: after,
                steps: drv.log,
                consoleErrors,
                figures,
                frames: rec.rows.length,
                load: (await import("node:os")).loadavg().map((x) => +x.toFixed(1)),
                when: new Date().toISOString(),
            },
            track,
            series: columns(rec.rows),
            marks: rec.marks.map((m) => ({ name: m.name, t: m.t, frame: m.frame })),
            ptrLog: rec.ptrLog,
            long: rec.long,
            loaf: rec.loaf,
            anims: rec.anims,
            calls: extra.calls,
            muts: extra.muts,
            evs: extra.evs,
            img: { loads: extra.loads, paint: extra.et, fetch: extra.res, atStart: watch.imgs, atEnd: extra.imgsAtEnd },
            trace: traceSum,
        };
        const file = join(opt.out, `${cell.id}.${opt.engine}${trace ? ".trace" : ""}.json`);
        writeFileSync(file, JSON.stringify(out));
        return { file: file.split("/").pop(), frames: rec.rows.length, calls: extra.calls.length, muts: extra.muts.length, before: before.dot, after: after.dot, errors: consoleErrors.length };
    } finally {
        await context.close().catch(() => {});
    }
}

// The rows as columns: one array per channel, one entry per frame. Per element:
// x (box left), w, op (opacity), sc (the scale property, first number), tr (the translate
// property, x), tf (the transform's x translation), sl (scrollLeft, the strip only), ic
// (picture loaded) and each tracked attribute.
function columns(rows) {
    const t = rows.map((r) => r.t);
    const now = rows.map((r) => r.now);
    const ch = {};
    const keys = new Set();
    for (const r of rows) for (const k of Object.keys(r.el)) keys.add(k);
    const num = (v) => {
        const f = parseFloat(v);
        return Number.isFinite(f) ? +f.toFixed(3) : null;
    };
    const tfx = (tf) => {
        if (!tf || tf === "none") return 0;
        const m = tf.match(/matrix(3d)?\(([^)]+)\)/);
        if (!m) return null;
        const p = m[2].split(",").map(Number);
        return +(m[1] ? p[12] : p[4]).toFixed(3);
    };
    const tfs = (tf) => {
        if (!tf || tf === "none") return 1;
        const m = tf.match(/matrix\(([^)]+)\)/);
        if (!m) return null;
        return +Number(m[1].split(",")[0]).toFixed(4);
    };
    for (const k of keys) {
        const col = { x: [], w: [], op: [], sc: [], tr: [], tf: [], tfs: [] };
        let sl = null,
            ic = null;
        const attrs = {};
        for (const r of rows) {
            const o = r.el[k];
            col.x.push(o ? o.x : null);
            col.w.push(o ? o.w : null);
            col.op.push(o ? num(o.op) : null);
            col.sc.push(o ? (o.sc === "none" ? 1 : num(o.sc)) : null);
            col.tr.push(o ? (o.tr === "none" ? 0 : num(o.tr)) : null);
            col.tf.push(o ? tfx(o.tf) : null);
            col.tfs.push(o ? tfs(o.tf) : null);
            if (o && o.sl) (sl ||= Array(t.length).fill(0))[col.x.length - 1] = o.sl;
            if (o && o.ic !== -1 && o.ic !== undefined) (ic ||= Array(t.length).fill(-1))[col.x.length - 1] = o.ic;
            for (const [ak, av] of Object.entries(o || {})) if (ak.startsWith("a:")) (attrs[ak.slice(2)] ||= Array(t.length).fill(null))[col.x.length - 1] = av;
        }
        // drop flat channels to keep the file small
        for (const c of Object.keys(col)) {
            const v = col[c];
            if (v.every((x) => x === v[0])) col[c] = { const: v[0] };
        }
        if (sl) col.sl = sl;
        if (ic) col.ic = ic;
        if (Object.keys(attrs).length) col.attrs = attrs;
        // y and h once (members do not move vertically)
        const first = rows.find((r) => r.el[k]);
        if (first) {
            col.y0 = first.el[k].y;
            col.h0 = first.el[k].h;
        }
        ch[k] = col;
    }
    return { t, now, changed: rows.map((r) => (r.changed ? 1 : 0)), ch };
}

// Chromium trace: per frame (between consecutive rows) the main thread's style recalcs,
// layouts, paints and pre-paints, plus image decodes on any thread of the page's process.
function traceCounts(trace, rec) {
    const ev = trace.traceEvents || trace;
    const mark = ev.find((e) => e.name === "anim:start" && (e.cat || "").includes("blink.user_timing"));
    if (!mark) return { error: "no anim:start mark in trace" };
    const { pid, tid } = mark;
    const off = mark.ts / 1000;
    const main = { UpdateLayoutTree: "style", Layout: "layout", Paint: "paint", PrePaint: "prepaint", "Document::updateStyle": "style2", FunctionCall: "js", EventDispatch: "event", HitTest: "hittest", IntersectionObserverController_computeIntersections: "io" };
    const decodeNames = new Set(["Decode Image", "ImageDecodeTask", "Decode LazyPixelRef", "ImageFrameGenerator::decode", "ImageDecoder::decode"]);
    const rows = rec.rows;
    const per = rows.map(() => ({}));
    const decodes = [];
    const totals = {};
    const findRow = (t) => {
        let lo = 0,
            hi = rows.length - 1,
            k = -1;
        while (lo <= hi) {
            const m = (lo + hi) >> 1;
            if (rows[m].now >= t) {
                k = m;
                hi = m - 1;
            } else lo = m + 1;
        }
        return k;
    };
    for (const e of ev) {
        if (e.pid !== pid || (e.ph !== "X" && e.ph !== "B")) continue;
        const t = e.ts / 1000 - off;
        if (e.tid === tid && main[e.name]) {
            const k = findRow(t);
            const key = main[e.name];
            totals[key] = (totals[key] || 0) + 1;
            totals[key + "Ms"] = +((totals[key + "Ms"] || 0) + (e.dur || 0) / 1000).toFixed(3);
            if (k >= 0) {
                per[k][key] = (per[k][key] || 0) + 1;
                per[k][key + "Ms"] = +((per[k][key + "Ms"] || 0) + (e.dur || 0) / 1000).toFixed(3);
            }
        } else if (decodeNames.has(e.name)) {
            decodes.push({ t: +t.toFixed(3), dur: +((e.dur || 0) / 1000).toFixed(3), name: e.name, main: e.tid === tid, frame: findRow(t) });
        }
    }
    return { totals, perFrame: per, decodes, note: "counted between consecutive rows on the page's main thread (hook raf); decodes on every thread of the page's process" };
}

main().catch((e) => {
    console.error("probe failed:", e && e.stack ? e.stack : e);
    process.exit(1);
});
