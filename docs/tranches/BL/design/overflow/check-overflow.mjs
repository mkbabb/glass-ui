#!/usr/bin/env node
// check-overflow.mjs: finds sideways overflow on your own pages.
//
// It reads three faults on each page, in each cell (a viewport and a colour scheme):
//   (a) content wider than its box: an element whose scrollWidth passes its clientWidth
//       where nothing means to scroll sideways, with the children that run past its edge;
//   (b) a scroller that pans sideways under a vertical swipe (Chromium touch cells), and
//       one that pans under a horizontal swipe when it is not a deliberate strip;
//   (c) a page wider than the viewport.
// A deliberate horizontal strip (a carousel, a dock run, a tab strip, a table, a code
// block, anything with `touch-action: pan-x` or `scroll-snap-type: x`, and whatever you
// pass with --strip) may scroll sideways by a horizontal swipe. It is still checked under
// vertical swipes.
//
// Run it from a project that has Playwright installed, through the machine guard:
//   ~/.claude/guard/guarded --timeout 30 -- node check-overflow.mjs \
//       --url http://127.0.0.1:5173/ --url http://127.0.0.1:5173/filters \
//       --click '[data-testid=filters-open]' --cells 390t-light,390t-dark,1440-light
//   ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- node check-overflow.mjs \
//       --engine webkit --url http://127.0.0.1:5173/
// Options:
//   --url <u>        a page to read (repeat for more)
//   --click <sel>    after load, tap or click each element matching <sel> in turn and read
//                    the page again with it open (repeat; Escape closes it between clicks)
//   --strip <sel>    a box of yours that is meant to scroll sideways (repeat)
//   --cells <list>   390t-light (390x844, touch, scale 2), 390t-dark, 1440-light,
//                    1440-dark; any WxH or W with a t for touch; default 390t-light,1440-light
//   --engine <e>     chromium (default) or webkit. Playwright's WebKit is not Safari, and it
//                    has no touch-move input, so (b) runs in Chromium only.
//   --settle <ms>    wait after load and after each click (default 1200)
//   --json <file>    also write every reading as JSON
// Exit status: 0 when every page reads clean, 1 when any fault is found, 2 on a usage error.
// One browser per run, one context per cell, a page per URL; all closed when it ends.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const many = (name) => argv.flatMap((v, i) => (v === `--${name}` && argv[i + 1] ? [argv[i + 1]] : []));
const one = (name, dflt) => many(name).at(-1) ?? dflt;
const URLS = many("url");
const CLICKS = many("click");
const STRIPS = many("strip");
const ENGINE = one("engine", "chromium");
const SETTLE = +one("settle", 1200);
const CELLS = one("cells", "390t-light,1440-light").split(",");
const JSON_OUT = one("json", null);
if (!URLS.length || !["chromium", "webkit"].includes(ENGINE)) {
    console.error("usage: node check-overflow.mjs --url <page> [--url ...] [--click <sel>] [--strip <sel>] [--cells 390t-light,1440-light] [--engine chromium|webkit] [--json out.json]");
    process.exit(2);
}
// Playwright comes from the project you run this in (the current directory).
const require = createRequire(join(process.cwd(), "package.json"));
const playwright = (() => {
    for (const name of ["playwright", "@playwright/test", "playwright-core"]) {
        try {
            return require(name);
        } catch {}
    }
    console.error("no Playwright here: run this from a project that has playwright or @playwright/test installed");
    process.exit(2);
})();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cellOf(name) {
    const [size, scheme = "light"] = name.split("-");
    const touch = size.endsWith("t");
    const [w, h] = size.replace(/t$/, "").split("x").map(Number);
    const height = h || (w <= 500 ? 844 : 900);
    return { name, touch, scheme, viewport: { width: w, height } };
}

// ── the in-page reader ──────────────────────────────────────────────────────
function inPage(strips) {
    const r1 = (n) => Math.round(n * 10) / 10;
    let next = 1;
    const key = (el) => el.getAttribute("data-ovf-key") || (el.setAttribute("data-ovf-key", String(next++)), el.getAttribute("data-ovf-key"));
    const name = (el) => {
        let s = el.tagName.toLowerCase();
        const slot = el.getAttribute("data-slot");
        if (slot) s += `[data-slot=${slot}]`;
        if (el.id) s += `#${el.id}`;
        const cls = (typeof el.className === "string" ? el.className : el.className?.baseVal || "").trim().split(/\s+/).filter((c) => c && !/[:[\]/]/.test(c)).slice(0, 3);
        if (cls.length) s += "." + cls.join(".");
        return s;
    };
    const path = (el, depth = 4) => {
        const out = [];
        for (let e = el, i = 0; e && e.nodeType === 1 && i < depth; e = e.parentElement, i++) out.unshift(name(e));
        return out.join(" > ");
    };
    const text = (el) => (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 50);
    const strip = (el, cs) => {
        for (const s of strips) if (el.matches(s)) return s;
        if (el.matches(".dock-run, .segmented-tabs, [data-slot=table-container], [data-slot=carousel-content], pre, code, .fading-scroll--x")) return "strip";
        if (cs.scrollSnapType.startsWith("x")) return "x snap";
        if (cs.touchAction === "pan-x") return "pan-x";
        return null;
    };
    const shown = (el, cs) => cs.display !== "none" && cs.visibility !== "hidden" && (el.getBoundingClientRect().width > 0 || el.getBoundingClientRect().height > 0);
    const field = (el) => el.matches("input, textarea, select, [contenteditable=''], [contenteditable=true]");
    // The children that run past a box's padding edge while their own parent does not.
    const past = (box) => {
        const br = box.getBoundingClientRect();
        const bcs = getComputedStyle(box);
        // The box's padding edges, and every child read as if the box were not scrolled.
        const left = br.left + parseFloat(bcs.borderLeftWidth);
        const right = left + box.clientWidth;
        const sl = box.scrollLeft;
        const hits = [];
        const walk = document.createTreeWalker(box, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (n) => {
                const p = n.parentElement;
                if (p !== box && getComputedStyle(p).overflowX !== "visible") return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            },
        });
        for (let n = walk.nextNode(), i = 0; n && i < 3000; n = walk.nextNode(), i++) {
            const q = n.getBoundingClientRect();
            if (!q.width) continue;
            const r = { left: q.left + sl, right: q.right + sl, width: q.width };
            const pq = n.parentElement.getBoundingClientRect();
            const pr = { left: pq.left + sl, right: pq.right + sl, width: pq.width };
            const over = Math.max(r.right - right, left - r.left);
            const parentIn = n.parentElement === box || (pr.right <= right + 0.5 && pr.left >= left - 0.5);
            if (over > 0.5 && parentIn) hits.push({ node: n, el: path(n, 3), text: text(n), over: r1(over), width: r1(r.width), parentWidth: r1(pr.width) });
        }
        return hits.sort((a, b) => b.over - a.over).slice(0, 4);
    };
    function measure() {
        const vw = innerWidth;
        const doc = document.documentElement;
        const out = { vw, docWidth: doc.scrollWidth, boxes: [], scrollers: [] };
        const sx = scrollX;
        scrollTo({ left: 400, top: scrollY, behavior: "instant" });
        out.pagePans = scrollX - sx;
        scrollTo({ left: sx, top: scrollY, behavior: "instant" });
        for (const el of document.body.querySelectorAll("*")) {
            if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) continue;
            const cs = getComputedStyle(el);
            if (!shown(el, cs) || el.classList.contains("sr-only") || cs.clip.startsWith("rect(0")) continue;
            const ox = cs.overflowX;
            const scroller = ox === "auto" || ox === "scroll";
            if (scroller && el.scrollWidth > el.clientWidth + 1) out.scrollers.push({ key: key(el), el: path(el), strip: strip(el, cs), sw: el.scrollWidth, cw: el.clientWidth });
            if (el.clientWidth > 0 && el.scrollWidth >= el.clientWidth + 2 && !field(el)) {
                const ellipsis = cs.textOverflow === "ellipsis" && (ox === "hidden" || ox === "clip");
                if (ellipsis || (scroller && strip(el, cs))) continue;
                const kind = scroller ? "scroller" : ox === "visible" && !/paint|strict|content/.test(cs.contain) ? "spill" : "clipped";
                out.boxes.push({ node: el, key: key(el), kind, el: path(el), text: text(el), excess: el.scrollWidth - el.clientWidth, sw: el.scrollWidth, cw: el.clientWidth, past: past(el) });
            }
        }
        // A box that is too wide makes every box around it read too wide as well, up to
        // the first that scrolls or clips. Keep the scrollers, and of the others only those
        // whose excess starts at them: a child past their edge with no faulting box between.
        const faulting = new Set(out.boxes.map((b) => b.node));
        const echo = (b) => b.past.length > 0 && b.past.every((h) => {
            for (let e = h.node; e && e !== b.node; e = e.parentElement) if (faulting.has(e)) return true;
            return false;
        });
        out.boxes = out.boxes
            .filter((b) => b.kind === "scroller" || !echo(b))
            .map(({ node, past: hits, ...b }) => ({ ...b, past: hits.map(({ node: _n, ...h }) => h) }));
        return out;
    }
    function pointIn(k) {
        const el = document.querySelector(`[data-ovf-key="${k}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const x0 = Math.max(r.left, 4), x1 = Math.min(r.right, innerWidth - 4), y0 = Math.max(r.top, 4), y1 = Math.min(r.bottom, innerHeight - 4);
        return x1 - x0 < 4 || y1 - y0 < 4 ? null : { x: (x0 + x1) / 2, y: (y0 + y1) / 2 };
    }
    const lefts = () => {
        const s = { window: scrollX };
        for (const el of document.querySelectorAll("[data-ovf-key]")) s[el.getAttribute("data-ovf-key")] = el.scrollLeft;
        return s;
    };
    const put = (s) => {
        for (const [k, v] of Object.entries(s)) {
            if (k === "window") continue;
            const el = document.querySelector(`[data-ovf-key="${k}"]`);
            if (el) el.scrollLeft = v;
        }
        scrollTo({ left: s.window, top: scrollY, behavior: "instant" });
    };
    window.__checkOverflow = { measure, pointIn, lefts, put };
}

// ── gestures (Chromium touch cells) ─────────────────────────────────────────
async function swipe(cdp, x0, y0, x1, y1) {
    const t = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
    await t("touchStart", x0, y0);
    for (let i = 1; i <= 12; i++) {
        await t("touchMove", x0 + ((x1 - x0) * i) / 12, y0 + ((y1 - y0) * i) / 12);
        await sleep(16);
    }
    await t("touchEnd");
    await sleep(500);
}

async function gestures(page, cdp, cell, scrollers) {
    const found = [];
    for (const s of scrollers.slice(0, 8)) {
        const p = await page.evaluate((k) => window.__checkOverflow.pointIn(k), s.key);
        if (!p) continue;
        const tries = [["vertical", 0], ["vertical, 16 px drift", 16], ["vertical, 48 px drift", 48]];
        if (!s.strip) tries.push(["horizontal", null]);
        for (const [gesture, drift] of tries) {
            const before = await page.evaluate(() => window.__checkOverflow.lefts());
            if (drift === null) {
                const hx = Math.min(100, cell.viewport.width / 2 - 8);
                await swipe(cdp, Math.min(p.x + hx, cell.viewport.width - 4), p.y, Math.max(p.x - hx, 4), p.y);
            } else {
                // The touch starts on the scroller: that is where the engine picks the box
                // a gesture moves.
                const y1 = p.y - 240 >= 4 ? p.y - 240 : Math.min(p.y + 240, cell.viewport.height - 4);
                await swipe(cdp, p.x, p.y, p.x + drift, y1);
            }
            const after = await page.evaluate(() => window.__checkOverflow.lefts());
            const moved = Object.keys(after).filter((k) => Math.abs((after[k] ?? 0) - (before[k] ?? 0)) > 0.5);
            if (moved.length) found.push({ gesture, on: s.el, strip: s.strip, moved: moved.map((k) => ({ key: k, by: Math.round((after[k] - (before[k] ?? 0)) * 10) / 10 })) });
            await page.evaluate((b) => window.__checkOverflow.put(b), before);
            await sleep(150);
        }
    }
    // A horizontal swipe may pan a strip; a vertical one may not. A horizontal swipe on a
    // box that is not a strip may not pan anything.
    return found.filter((g) => g.gesture !== "horizontal" || !g.strip);
}

async function read(page, cdp, cell, label) {
    const m = await page.evaluate(() => window.__checkOverflow.measure());
    const faults = [];
    if (m.docWidth > cell.viewport.width + 1 || m.pagePans > 0) faults.push({ class: "c", what: `the page is ${m.docWidth} px wide in a ${cell.viewport.width} px viewport${m.pagePans > 0 ? `, and pans ${m.pagePans} px` : ""}` });
    for (const b of m.boxes) faults.push({ class: "a", what: `${b.kind} ${b.el}: ${b.sw}/${b.cw} (+${b.excess})`, past: b.past });
    if (cdp && cell.touch) for (const g of await gestures(page, cdp, cell, m.scrollers)) faults.push({ class: "b", what: `${g.gesture} swipe on ${g.on} panned ${g.moved.map((x) => `${x.key === "window" ? "the window" : "a box"} by ${x.by} px`).join(", ")}` });
    return { label, faults, scrollers: m.scrollers.map((s) => ({ el: s.el, strip: s.strip, sw: s.sw, cw: s.cw })) };
}

const engine = playwright[ENGINE];
const browser = await engine.launch({ headless: true });
const report = { engine: ENGINE, version: browser.version(), pages: [] };
let total = 0;
try {
    for (const cellName of CELLS) {
        const cell = cellOf(cellName);
        const context = await browser.newContext({
            viewport: cell.viewport,
            hasTouch: cell.touch,
            isMobile: cell.touch,
            deviceScaleFactor: cell.touch ? 2 : 1,
            colorScheme: cell.scheme === "dark" ? "dark" : "light",
            reducedMotion: "no-preference",
        });
        try {
            await context.addInitScript(`(${inPage.toString()})(${JSON.stringify(STRIPS)})`);
            for (const url of URLS) {
                const page = await context.newPage();
                const cdp = ENGINE === "chromium" ? await context.newCDPSession(page) : null;
                const rec = { url, cell: cellName, readings: [], errors: [] };
                page.on("pageerror", (e) => rec.errors.push(String(e).slice(0, 160)));
                try {
                    await page.goto(url, { waitUntil: "load", timeout: 30000 });
                    await sleep(SETTLE);
                    rec.readings.push(await read(page, cdp, cell, "as it loads"));
                    for (const sel of CLICKS) {
                        const handles = await page.$$(sel);
                        for (const [i, h] of handles.entries()) {
                            if (!(await h.isVisible().catch(() => false))) continue;
                            try {
                                if (cell.touch) await h.tap({ timeout: 3000 });
                                else await h.click({ timeout: 3000 });
                            } catch {
                                await h.click({ force: true, timeout: 3000 }).catch((e) => rec.errors.push(`${sel}: ${String(e).slice(0, 100)}`));
                            }
                            await sleep(SETTLE);
                            rec.readings.push(await read(page, cdp, cell, `${sel} #${i + 1} open`));
                            for (let k = 0; k < 2; k++) await page.keyboard.press("Escape").catch(() => {});
                            await sleep(500);
                        }
                    }
                } catch (e) {
                    rec.errors.push(String(e).slice(0, 200));
                } finally {
                    await cdp?.detach().catch(() => {});
                    await page.close().catch(() => {});
                }
                report.pages.push(rec);
                const n = rec.readings.reduce((a, r) => a + r.faults.length, 0);
                total += n;
                console.log(`\n${n ? "FAULTS" : "clean "}  ${url}  [${ENGINE} ${cellName}]`);
                for (const r of rec.readings) {
                    for (const f of r.faults) {
                        console.log(`  (${f.class}) ${r.label}: ${f.what}`);
                        for (const p of f.past || []) console.log(`        past the edge by ${p.over} px: ${p.el}${p.text ? ` "${p.text}"` : ""}`);
                    }
                }
                for (const e of rec.errors) console.log(`  error: ${e}`);
            }
        } finally {
            await context.close().catch(() => {});
        }
    }
} finally {
    await browser.close();
}
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(report, null, 1));
console.log(`\n${total} fault reading${total === 1 ? "" : "s"} on ${report.pages.length} page reading${report.pages.length === 1 ? "" : "s"} (${ENGINE} ${report.version}${ENGINE === "webkit" ? ", Playwright's WebKit, not Safari" : ""}).`);
process.exit(total ? 1 : 0);
