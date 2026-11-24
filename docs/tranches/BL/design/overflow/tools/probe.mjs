#!/usr/bin/env node
// probe.mjs: the overflow study's sweep (docs/tranches/BL/design/overflow/).
//
//   node probe.mjs --engine chromium|webkit --port 5391 --tag base|cure --cell 390t-light
//                  [--routes all|/a,/b] [--passes base,opens,variants,stress] --out <dir>
//
// One headless browser per run; one context per cell (width x scheme); a new page per
// route; everything closed in finally. For each route it reads, on the settled page:
//   (a) every box whose scrollWidth passes its clientWidth (measure.js), with the
//       descendants where the excess starts;
//   (b) Chromium touch cells only: a vertical swipe (straight, and with a 16 px drift)
//       on every sideways scroller, on the page's scroller and on each open part, and a
//       horizontal swipe on every scroller the design does not mean to pan; every
//       scrollLeft and the window's scrollX before and after;
//   (c) the document's scrollWidth against innerWidth, and whether the window pans.
// Passes: base (the route as it loads), opens (every popup trigger in <main>, each
// menu's first submenu, the context menu, tooltips by hover, toasts, long field
// values), variants (every option of every variant row), stress (long labels written
// into the interactive parts, and the stage narrowed to 240 px).
// Rows: <out>/<tag>.<engine>.<cell>.json
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const TREE = resolve(ROOT, "trees/v11.1.1");
const require = createRequire(join(TREE, "package.json"));
const { chromium, webkit } = require("playwright");

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]);
        return acc;
    }, []),
);
const ENGINE = args.engine || "chromium";
const PORT = +(args.port || 5391);
const TAG = args.tag || "base";
const CELL = args.cell || "390t-light";
const OUT = resolve(args.out || join(ROOT, "record/raw"));
const PASSES = new Set(String(args.passes || "base,opens,variants,stress").split(","));
const BASE = `http://127.0.0.1:${PORT}`;
const MEASURE = readFileSync(join(HERE, "measure.js"), "utf8");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Every demo route, read from the tree's manifest sections.
function allRoutes() {
    const dir = join(TREE, "demo/stories");
    const order = ["foundations", "substrates", "display", "forms", "containers", "navigation", "dock", "data", "feedback", "motion", "compositions"];
    const out = ["/"];
    for (const sec of order) {
        const src = readFileSync(join(dir, sec, "routes.ts"), "utf8");
        const ids = [...src.slice(src.indexOf("routes:")).matchAll(/\{\s*id:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
        out.push(`/${sec}`);
        for (const id of ids) out.push(`/${sec}/${id}`);
    }
    // the semantic 404 and the stress page
    out.push("/no-such-page", "/ovf.html");
    return out;
}
const ROUTES = args.routes && args.routes !== "all" ? String(args.routes).split(",") : allRoutes();

const [w, scheme] = CELL.split("-");
const touch = w.endsWith("t");
const width = parseInt(w, 10);
const viewport = width === 390 ? { width: 390, height: 844 } : { width: 1440, height: 900 };

async function settle(page, ms = 900) {
    await page.waitForFunction(() => document.readyState === "complete", null, { timeout: 15000 }).catch(() => {});
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await sleep(ms);
}

async function measure(page) {
    return page.evaluate(() => window.__ovf.measure());
}

// ── gestures (Chromium only) ────────────────────────────────────────────────
async function swipe(cdp, x0, y0, x1, y1, steps = 12) {
    const t = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
    await t("touchStart", x0, y0);
    for (let i = 1; i <= steps; i++) {
        await t("touchMove", x0 + ((x1 - x0) * i) / steps, y0 + ((y1 - y0) * i) / steps);
        await sleep(16);
    }
    await t("touchEnd");
    await sleep(500);
}

async function readAll(page) {
    return page.evaluate(() => {
        const s = { __window: window.scrollX };
        for (const el of document.querySelectorAll("body *")) {
            if (el.scrollLeft !== 0 || el.hasAttribute("data-ovf")) s[window.__ovf.key(el)] = el.scrollLeft;
        }
        return s;
    });
}
async function topState(page) {
    return page.evaluate(() => {
        const s = {};
        for (const el of document.querySelectorAll("body *")) if (el.scrollTop !== 0) s[window.__ovf.key(el)] = el.scrollTop;
        return s;
    });
}
async function putBack(page, left, top) {
    await page.evaluate(
        ([left, top]) => {
            for (const el of document.querySelectorAll("[data-ovf]")) {
                const k = el.getAttribute("data-ovf");
                if (k in left && el.scrollLeft !== left[k]) el.scrollLeft = left[k];
                el.scrollTop = top[k] ?? 0;
            }
            window.scrollTo({ left: left.__window || 0, top: window.scrollY, behavior: "instant" });
        },
        [left, top],
    );
}
function diff(a, b, page) {
    const moved = [];
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
        const d = (b[k] ?? 0) - (a[k] ?? 0);
        if (Math.abs(d) > 0.5) moved.push({ key: k, d: Math.round(d * 10) / 10 });
    }
    return moved;
}
async function describeKeys(page, keys) {
    return page.evaluate((keys) => keys.map((k) => {
        if (k === "__window") return { key: k, el: "window" };
        const el = document.querySelector(`[data-ovf="${k}"]`);
        return el ? { key: k, el: window.__ovf.path(el, 3), part: window.__ovf.part(el), sw: el.scrollWidth, cw: el.clientWidth } : { key: k, el: "(gone)" };
    }), keys);
}

// Swipe tests on the given keyed targets: vertical straight, vertical with drift, and
// (for targets the design does not mean to pan sideways) horizontal.
async function gestures(page, cdp, targets) {
    const rows = [];
    for (const t of targets) {
        const p = await page.evaluate((k) => window.__ovf.pointIn(k), t.key);
        if (!p) {
            rows.push({ target: t, skipped: "no visible point" });
            continue;
        }
        const tries = [
            { name: "vertical", dx: 0 },
            { name: "vertical+drift16", dx: 16 },
            { name: "vertical+drift48", dx: 48 },
        ];
        if (!t.designed) tries.push({ name: "horizontal", horizontal: true });
        for (const g of tries) {
            const left = await readAll(page);
            const top = await topState(page);
            const half = Math.min(120, viewport.height / 2 - 8);
            if (g.horizontal) {
                const hx = Math.min(100, viewport.width / 2 - 8);
                await swipe(cdp, Math.min(p.x + hx, viewport.width - 4), p.y, Math.max(p.x - hx, 4), p.y);
            } else {
                // The touch starts on the box (the engine picks the scroller at the touch's
                // start), and travels 2 x half up, or down where the box is near the top.
                const y1 = p.y - 2 * half >= 4 ? p.y - 2 * half : Math.min(p.y + 2 * half, viewport.height - 4);
                await swipe(cdp, p.x, p.y, p.x + g.dx, y1);
            }
            const after = await readAll(page);
            const moved = diff(left, after);
            const row = { target: t, gesture: g.name, at: { x: Math.round(p.x), y: Math.round(p.y) } };
            if (moved.length) row.moved = (await describeKeys(page, moved.map((m) => m.key))).map((d, i) => ({ ...d, d: moved[i].d }));
            rows.push(row);
            await putBack(page, left, top);
            await sleep(150);
        }
    }
    return rows;
}

async function openParts(page) {
    return page.evaluate(() => {
        const sel = "[data-reka-popper-content-wrapper], [role=dialog], [role=alertdialog], [role=menu], [role=listbox], [role=tooltip], [data-slot=toast], [data-slot=sheet-content], [data-slot=dialog-content], [data-slot=select-content], [data-slot=command]";
        const out = [];
        for (const el of document.querySelectorAll(sel)) {
            const r = el.getBoundingClientRect();
            if (r.width < 2 || r.height < 2) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === "hidden" || cs.display === "none") continue;
            out.push({ key: window.__ovf.key(el), el: window.__ovf.path(el, 2), part: window.__ovf.part(el), designed: null });
        }
        return out;
    });
}

function scrollTargets(scr, parts) {
    const seen = new Set();
    const out = [];
    for (const s of [...scr, ...parts]) {
        if (seen.has(s.key)) continue;
        seen.add(s.key);
        out.push({ key: s.key, el: s.el, part: s.part, designed: s.designed || null });
    }
    return out;
}

async function reading(page, cdp, label, baseKeys, extra = {}) {
    const m = await measure(page);
    const scr = await page.evaluate(() => window.__ovf.scrollers());
    const parts = await openParts(page);
    const row = { step: label, ...extra, m, scrollers: scr, parts };
    if (baseKeys) row.newBoxes = m.boxes.filter((b) => !baseKeys.has(b.key)).map((b) => b.key);
    // A swipe can change a scrollLeft only where a box has sideways room, so the swipes
    // go to every box that has it now (the page's scroller included when it has).
    if (cdp && touch) row.gestures = await gestures(page, cdp, scrollTargets(scr.filter((s) => s.sw > s.cw + 1).slice(0, 6), []));
    return row;
}

async function press(page, handle) {
    if (touch) await handle.tap({ timeout: 3000 }).catch(() => handle.click({ timeout: 3000, force: true }));
    else await handle.click({ timeout: 3000 });
}

async function closeAll(page) {
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press("Escape").catch(() => {});
        await sleep(160);
    }
    await sleep(500);
}

const LONG_PHRASE = "Quarterly enrollment by district and program, all years";
const LONG_TOKEN = "district_enrollment_by_program_quarterly_2019-2026.csv";

// The route's page, for the watchdog in main(): a page that crashes (Playwright WebKit
// did, opening a Select) can leave an evaluate pending for good.
let currentPage = null;
let currentRec = null;
const ROUTE_LIMIT_MS = 180000;

async function runRoute(context, route) {
    const page = await context.newPage();
    currentPage = page;
    const cdp = ENGINE === "chromium" ? await context.newCDPSession(page) : null;
    const rec = { route, steps: [], errors: [] };
    currentRec = rec;
    page.on("pageerror", (e) => rec.errors.push(String(e).slice(0, 200)));
    page.on("crash", () => rec.errors.push("page crashed"));
    try {
        await page.goto(BASE + route, { waitUntil: "load", timeout: 30000 });
        await page.waitForSelector("main", { timeout: 15000 });
        await settle(page, 1000);
        const base = await reading(page, cdp, "base", null);
        rec.steps.push(base);
        const baseKeys = new Set(base.m.boxes.map((b) => b.key));

        if (PASSES.has("opens")) {
            // popup triggers in <main>
            // the shell's own popups (the pager dock's category sheet, the rail's menus) once, on /
            const shell = route === "/" ? "nav.demo-bottom-dock [aria-haspopup]:not([aria-haspopup=false]), .demo-sidebar-rail [aria-haspopup]:not([aria-haspopup=false]), " : "";
            const triggers = await page.$$(
                shell + "main [aria-haspopup]:not([aria-haspopup=false]), main [data-slot=select-trigger], main [data-slot=collapsible-trigger][data-state=closed], main [data-slot=accordion-trigger][data-state=closed]",
            );
            let n = 0;
            for (const h of triggers) {
                if (n >= 7) break;
                const ok = await h.evaluate((el) => {
                    const r = el.getBoundingClientRect();
                    return r.width > 0 && r.height > 0 && !el.closest("[data-ovf-done]") && !el.disabled;
                }).catch(() => false);
                if (!ok) continue;
                n++;
                const name = await h.evaluate((el) => window.__ovf.path(el, 2) + " :: " + (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40));
                await h.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
                await sleep(200);
                try {
                    await press(page, h);
                } catch (e) {
                    rec.errors.push(`press ${name}: ${String(e).slice(0, 120)}`);
                    continue;
                }
                await sleep(900);
                rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: name }));
                // the first submenu of an open menu
                const sub = await page.$("[role=menu] [data-slot=menu-sub-trigger], [role=menu] [aria-haspopup=menu]");
                if (sub) {
                    try {
                        if (touch) await sub.tap({ timeout: 2000 });
                        else await sub.hover({ timeout: 2000 });
                        await sleep(900);
                        rec.steps.push(await reading(page, cdp, "open-sub", baseKeys, { trigger: name + " > submenu" }));
                    } catch (e) {
                        rec.errors.push(`submenu: ${String(e).slice(0, 120)}`);
                    }
                }
                await closeAll(page);
            }
            // context menus: any menu trigger without aria-haspopup takes a contextmenu event
            const ctx = await page.$$("main [data-slot=menu-trigger]:not([aria-haspopup])");
            for (const h of ctx.slice(0, 2)) {
                const box = await h.boundingBox();
                if (!box) continue;
                await h.evaluate((el) => {
                    const r = el.getBoundingClientRect();
                    el.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, button: 2 }));
                });
                await sleep(900);
                rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: "contextmenu" }));
                const sub = await page.$("[role=menu] [data-slot=menu-sub-trigger]");
                if (sub) {
                    try {
                        if (touch) await sub.tap({ timeout: 2000 });
                        else await sub.hover({ timeout: 2000 });
                        await sleep(900);
                        rec.steps.push(await reading(page, cdp, "open-sub", baseKeys, { trigger: "contextmenu > submenu" }));
                    } catch (e) {
                        rec.errors.push(`ctx submenu: ${String(e).slice(0, 120)}`);
                    }
                }
                await closeAll(page);
            }
            // tooltips: hover (fine) or focus (touch) each button on the tooltip page
            if (route === "/containers/tooltip") {
                const btns = await page.$$("main .story-stage button, main [data-story-stage] button");
                for (const h of btns.slice(0, 4)) {
                    if (touch) await h.focus().catch(() => {});
                    else await h.hover().catch(() => {});
                    await sleep(900);
                    rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: "tooltip" }));
                }
            }
            // the stress page (/ovf.html): the tooltip, the toast, and the select inside the
            // open Filters sheet
            if (route.startsWith("/ovf")) {
                const tip = await page.$("[data-testid=ovf-open-tooltip]");
                if (tip) {
                    if (touch) await tip.focus().catch(() => {});
                    else await tip.hover().catch(() => {});
                    await sleep(900);
                    rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: "ovf tooltip" }));
                    await closeAll(page);
                }
                const toastBtn = await page.$("[data-testid=ovf-open-toast]");
                if (toastBtn) {
                    await press(page, toastBtn).catch(() => {});
                    await sleep(1000);
                    rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: "ovf toast" }));
                    await closeAll(page);
                }
                const filters = await page.$("[data-testid=ovf-open-filters]");
                if (filters) {
                    await press(page, filters).catch(() => {});
                    await sleep(1000);
                    const sel = await page.$("[data-testid=ovf-filters-select]");
                    if (sel) {
                        await sel.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
                        await press(page, sel).catch((e) => rec.errors.push(`filters select: ${String(e).slice(0, 100)}`));
                        await sleep(1000);
                        rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: "ovf filters > select" }));
                    }
                    await closeAll(page);
                }
            }
            // toasts: every button on the toast page
            if (route === "/feedback/toast") {
                const btns = await page.$$("main button");
                for (const h of btns.slice(0, 6)) {
                    const vis = await h.isVisible().catch(() => false);
                    if (!vis) continue;
                    await press(page, h).catch(() => {});
                    await sleep(300);
                }
                await sleep(900);
                rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: "toasts" }));
            }
            // long values in every field
            const fields = await page.$$("main input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=hidden]), main textarea");
            if (fields.length) {
                let filled = 0;
                for (const f of fields.slice(0, 8)) {
                    const ok = await f.evaluate((el) => !el.disabled && !el.readOnly && el.getBoundingClientRect().width > 0).catch(() => false);
                    if (!ok) continue;
                    const numeric = await f.evaluate((el) => el.inputMode === "numeric" || el.inputMode === "decimal" || el.closest("[data-slot=number-field]") !== null || el.type === "number");
                    await f.fill(numeric ? "123456789012345678901234" : `${LONG_PHRASE} ${LONG_TOKEN}`).catch(() => {});
                    filled++;
                }
                if (filled) {
                    await page.keyboard.press("Tab").catch(() => {});
                    await sleep(700);
                    rec.steps.push(await reading(page, cdp, "long-values", baseKeys, { trigger: `${filled} fields` }));
                }
            }
        }

        if (PASSES.has("variants")) {
            const rows = await page.$$("main .story-variant-row");
            for (const row of rows) {
                const label = await row.evaluate((el) => el.querySelector(".story-variant-label")?.textContent?.trim() || "?");
                const opts = await row.$$(".segmented-tab");
                for (const o of opts) {
                    const active = await o.evaluate((el) => el.hasAttribute("data-active"));
                    if (active) continue;
                    const text = await o.evaluate((el) => el.textContent.trim());
                    await closeAll(page);
                    await o.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
                    try {
                        await press(page, o);
                    } catch (e) {
                        rec.errors.push(`variant ${label}=${text}: ${String(e).slice(0, 100)}`);
                        continue;
                    }
                    await sleep(1100);
                    rec.steps.push(await reading(page, cdp, "variant", baseKeys, { trigger: `${label}=${text}` }));
                }
                // mobile Select form of a variant row
                const sel = await row.$("[data-slot=select-trigger]");
                if (sel) {
                    await closeAll(page);
                    await press(page, sel).catch(() => {});
                    await sleep(900);
                    rec.steps.push(await reading(page, cdp, "open", baseKeys, { trigger: `${label} (select form)` }));
                    await closeAll(page);
                }
            }
        }

        if (PASSES.has("stress")) {
            await closeAll(page);
            // long labels: rewrite the text of every interactive part's label leaves
            const n = await page.evaluate(
                ([phrase, token]) => {
                    const sel = "main button, main [role=tab], main [data-slot=toggle-group-item], main [data-slot=badge], main .chip, main [data-slot=select-trigger], main [data-slot=label], main [data-slot=accordion-trigger], main [data-slot=menu-item], main th, main td, main [data-slot=carousel-item] h3, main .glass-dock button, main [data-slot=pager-dot]";
                    let n = 0;
                    for (const el of document.querySelectorAll(sel)) {
                        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
                        const leaves = [];
                        let t = walker.nextNode();
                        while (t) {
                            if (t.textContent.trim().length > 1) leaves.push(t);
                            t = walker.nextNode();
                        }
                        if (!leaves.length) continue;
                        const leaf = leaves.sort((a, b) => b.textContent.length - a.textContent.length)[0];
                        leaf.textContent = n % 2 ? token : phrase;
                        n++;
                    }
                    return n;
                },
                [LONG_PHRASE, LONG_TOKEN],
            );
            await sleep(700);
            rec.steps.push(await reading(page, cdp, "stress-labels", baseKeys, { trigger: `${n} labels` }));
            // narrow parent: the stage's inner box at 240 px
            const narrowed = await page.evaluate(() => {
                const stage = document.querySelector("main [data-story-stage], main .story-stage");
                const inner = stage?.firstElementChild;
                if (!inner) return false;
                inner.style.maxWidth = "240px";
                inner.style.width = "240px";
                return true;
            });
            if (narrowed) {
                await sleep(700);
                rec.steps.push(await reading(page, cdp, "stress-narrow", baseKeys, { trigger: "stage child at 240px" }));
            }
        }
    } catch (e) {
        rec.errors.push(String(e).slice(0, 300));
    } finally {
        await cdp?.detach().catch(() => {});
        await page.close().catch(() => {});
    }
    return rec;
}

async function main() {
    mkdirSync(OUT, { recursive: true });
    const engine = ENGINE === "webkit" ? webkit : chromium;
    let browser = await engine.launch({ headless: true });
    const out = { tag: TAG, engine: ENGINE, version: browser.version(), cell: CELL, viewport, touch, scheme, passes: [...PASSES], started: new Date().toISOString(), routes: [] };
    const file = join(OUT, `${TAG}.${ENGINE}.${CELL}${args.suffix ? "." + args.suffix : ""}.json`);
    // --resume keeps the routes a stopped run already read (those that ran clean)
    const done = new Set();
    if (args.resume && existsSync(file)) {
        const prev = JSON.parse(readFileSync(file, "utf8"));
        for (const r of prev.routes) {
            if (r.errors.length === 0 || r.steps.length > 1) {
                out.routes.push(r);
                done.add(r.route);
            }
        }
        out.resumed = new Date().toISOString();
    }
    let context;
    const openContext = async () => {
        context = await browser.newContext({
            viewport,
            deviceScaleFactor: touch ? 2 : 1,
            hasTouch: touch,
            isMobile: touch,
            colorScheme: scheme === "dark" ? "dark" : "light",
            reducedMotion: "no-preference",
        });
        await context.addInitScript(MEASURE);
    };
    try {
        await openContext();
        for (const route of ROUTES) {
            if (done.has(route)) continue;
            // A page crash in Playwright's WebKit (opening a Select) can take the whole
            // browser down: launch a new one, still one at a time, before the next route.
            if (!browser.isConnected()) {
                await browser.close().catch(() => {});
                browser = await engine.launch({ headless: true });
                await openContext();
                console.log(`${new Date().toISOString().slice(11, 19)} the browser had exited; launched a new one`);
            }
            const t0 = Date.now();
            let rec = await Promise.race([
                runRoute(context, route).catch((e) => ({ route, steps: [], errors: [String(e).slice(0, 300)] })),
                new Promise((res) => setTimeout(() => res(null), ROUTE_LIMIT_MS).unref()),
            ]);
            if (!rec) {
                // Closing a crashed page can itself wait for good: give it 5 s.
                await Promise.race([currentPage?.close().catch(() => {}), sleep(5000)]);
                // Keep the steps read before the page went.
                const msg = `stopped after ${ROUTE_LIMIT_MS / 1000} s: the page crashed or hung, and was closed`;
                rec = currentRec?.route === route ? { ...currentRec, steps: [...currentRec.steps], errors: [...currentRec.errors, msg] } : { route, steps: [], errors: [msg] };
            }
            rec.ms = Date.now() - t0;
            out.routes.push(rec);
            const nb = rec.steps.reduce((a, s) => a + s.m.boxes.filter((b) => b.kind !== "clipped" && !b.designed && !b.ellipsis).length, 0);
            console.log(`${new Date().toISOString().slice(11, 19)} ${ENGINE} ${CELL} ${route} steps=${rec.steps.length} boxes=${nb} errs=${rec.errors.length} ${rec.ms}ms`);
            writeFileSync(file, JSON.stringify(out));
        }
    } finally {
        await context?.close().catch(() => {});
        await browser.close().catch(() => {});
    }
    out.finished = new Date().toISOString();
    writeFileSync(file, JSON.stringify(out));
    console.log("wrote", file);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
