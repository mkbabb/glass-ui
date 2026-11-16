// step3.mjs <what> <port> <engine> [--tag t] [--host h]: MEASURE-7, RULINGS-6's step 3, readings that decide a cure
// (no source change; the reach stub is applied and reverted by step3.sh around one run). One browser per run, a
// context per cell, closed in finally. Prints JSON lines.
//   reach      RU-52 (C6-M5): on the site dock (w-seat, 1440 fine), the run's scrollLeft when a seat takes focus,
//              at `focus` (capture, on the seat), at `focusin` (capture on the document, before the run's own
//              listener runs reach) and 600 ms after; through the keyboard cell's keys (Tab, ArrowRight x6, Home,
//              End) and a press on each seat (the press cell). The run's fit flag and scroll range beside it.
//   trigorder  RU-62: on the overlays dock (w-g8, 1440 mouse and 390 touch), each surface opened from its seat and
//              its trigger pressed again; the order of pointerdown, pointerup, click and every data-state change of
//              the content and the trigger, in page time.
//   s2inset    RU-54 (C6-M1): s2's page (critic-11, o201 at end), capped at each width; as the dock left it, then
//              in one task (no observer can run) the cap lifted with the inset forced on (the value the dock
//              writes when the run fits) and forced off: the run's client box and the seats' span each way.
//   touchname  RU-60: a seat wrapped in Tooltip (canvas tools composition, 390 coarse): a press held 900 ms on it;
//              the pointer and touch events, whether any tooltip content appears, and Tooltip's open state.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [what, port, engine = "chromium"] = a;
const HOST = val("--host", "127.0.0.1");
const TAG = val("--tag", "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
const launch = () => pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
async function ctxPage(coarse, w = coarse ? 390 : 1440) {
    const ctx = await browser.newContext({ viewport: { width: w, height: coarse ? 844 : 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
    return { ctx, page: await ctx.newPage() };
}
const out = (o) => console.log(JSON.stringify({ what, engine, tag: TAG, ...o }));
try {
    browser = await launch();
    if (what === "reach") {
        for (const mode of ["keys", "press"]) {
            const { ctx, page } = await ctxPage(false);
            try {
                await page.addInitScript(() => {
                    window.__fx = [];
                    const runOf = () => document.querySelector("[data-testid=w-seat] .dock-layer--full");
                    const lab = (e) => e?.getAttribute?.("aria-label") || e?.getAttribute?.("data-testid") || e?.tagName;
                    addEventListener("focus", (e) => { const r = runOf(); if (!r || !r.contains(e.target)) return; const rec = { seat: lab(e.target), atFocus: r.scrollLeft, fits: r.closest(".glass-dock")?.hasAttribute("data-run-fits"), range: r.scrollWidth - r.clientWidth, t: performance.now() }; window.__fx.push(rec); }, true);
                    addEventListener("focusin", (e) => { const r = runOf(); if (!r || !r.contains(e.target)) return; const rec = window.__fx[window.__fx.length - 1]; if (rec && rec.seat === lab(e.target)) rec.atFocusin = r.scrollLeft; }, true);
                });
                await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-seat`);
                await page.waitForSelector("[data-testid=w-seat]");
                await sleep(800);
                const after = async () => { await sleep(600); await page.evaluate(() => { const r = document.querySelector("[data-testid=w-seat] .dock-layer--full"); const rec = window.__fx[window.__fx.length - 1]; if (rec && rec.after === undefined) rec.after = r.scrollLeft; }); };
                if (mode === "keys") {
                    await page.mouse.move(8, 8);
                    await page.evaluate(() => document.activeElement && document.activeElement.blur());
                    await page.keyboard.press("Tab"); await sleep(900); await after();
                    for (const k of ["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight", "Home", "End"]) { await page.keyboard.press(k); await after(); }
                } else {
                    const b = await page.locator("[data-testid=w-seat]").boundingBox();
                    await page.mouse.move(b.x - 6, b.y + b.height / 2); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 }); await sleep(1000);
                    for (const s of ["home", "read", "search", "library", "marks", "settings"]) {
                        const sb = await page.locator(`[data-testid=w-seat-${s}]`).boundingBox();
                        if (!sb) continue;
                        await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2, { steps: 3 }); await sleep(150);
                        await page.mouse.down(); await sleep(250); await page.mouse.move(sb.x + sb.width / 2, sb.y - 60, { steps: 3 }); await page.mouse.up();
                        await after();
                    }
                }
                const fx = await page.evaluate(() => window.__fx);
                out({ mode, focuses: fx.map((r) => ({ seat: r.seat, fits: r.fits, range: r.range, atFocus: r.atFocus, atFocusin: r.atFocusin, after: r.after })), moved: fx.filter((r) => r.after !== r.atFocus || r.atFocusin !== r.atFocus).length });
            } finally { await ctx.close(); }
        }
    } else if (what === "trigorder") {
        const surfaces = [["menu", "[data-testid=w-g8-menu]", "[data-testid=w-g8-menu-content]"], ["select", "[data-testid=w-g8-select]", "[data-testid=w-g8-select-content]"], ["popover", "[data-testid=w-g8-pop]", "[data-testid=w-g8-pop-content]"], ["sheet", "[data-testid=w-g8-sheet]", "[data-testid=w-g8-sheet-content]"]];
        for (const coarse of [false, true]) for (const [name, trig, content] of surfaces) {
            const { ctx, page } = await ctxPage(coarse);
            try {
                await page.addInitScript(() => {
                    window.__log = [];
                    const T = () => +performance.now().toFixed(1);
                    for (const k of ["pointerdown", "pointerup", "click", "touchstart", "touchend"]) addEventListener(k, (e) => window.__log.push([T(), k, (e.target?.closest?.("[data-testid]")?.getAttribute("data-testid")) || e.target?.tagName]), true);
                    addEventListener("DOMContentLoaded", () => {
                        new MutationObserver((ms) => { for (const m of ms) { const e = m.target; if (m.type === "attributes" && (m.attributeName === "data-state" || m.attributeName === "aria-expanded")) window.__log.push([T(), `${m.attributeName}=${e.getAttribute(m.attributeName)}`, e.getAttribute("data-testid") || e.className?.toString().slice(0, 30)]); } }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-state", "aria-expanded"] });
                        const d = () => document.querySelector("[data-testid=w-g8]");
                        const arm = () => { const x = d(); if (!x) return requestAnimationFrame(arm); new MutationObserver(() => window.__log.push([T(), x.classList.contains("expanded") ? "dock open" : "dock folded", "w-g8"])).observe(x, { attributes: true, attributeFilter: ["class"] }); };
                        arm();
                    });
                });
                await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-g8`);
                await page.waitForSelector("[data-testid=w-g8]");
                await sleep(800);
                const center = async (sel) => { const b = await page.locator(sel).first().boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
                const press = async (x, y) => { if (coarse) await page.touchscreen.tap(x, y); else await page.mouse.click(x, y); };
                if (coarse) { const [x, y] = await center("[data-testid=w-g8] .dock-layer--summary"); await page.touchscreen.tap(x, y); await sleep(900); }
                else { const [x, y] = await center("[data-testid=w-g8]"); await page.mouse.move(x - 8, y); await page.mouse.move(x, y, { steps: 4 }); await sleep(1000); }
                const [tx, ty] = await center(trig);
                await press(tx, ty);
                await sleep(700);
                const t1 = await page.evaluate(() => performance.now());
                await press(tx, ty);
                await sleep(1200);
                const log = await page.evaluate((t1) => window.__log.filter((x) => x[0] >= t1 - 1).map((x) => [+(x[0] - t1).toFixed(1), x[1], x[2]]), t1);
                out({ surface: name, input: coarse ? "touch" : "mouse", second: log.filter((x) => !/^(dock-|w-g8-[a-z]+-item)/.test(x[2] || "") || /dock/.test(x[1])) });
            } finally { await ctx.close(); }
        }
    } else if (what === "s2inset") {
        const caps = val("--caps", engine === "webkit" ? "270,269,268" : "268,267,266").split(",").map(Number);
        const { ctx, page } = await ctxPage(false);
        try {
            await page.goto(`http://${HOST}:${port}/tests-visual/release-10-1-5/critic-11.html?scene=o201&at=end`);
            await page.waitForFunction(() => window.__ready);
            await sleep(1200);
            let insetFit = null;
            for (const cap of caps) {
                const r = await page.evaluate(async ({ cap, insetFit }) => {
                    const d = document.querySelector(".glass-dock"), run = d.querySelector(".dock-layers > .dock-run");
                    d.style.maxInlineSize = cap + "px";
                    await new Promise((r) => setTimeout(r, 800));
                    const kids = () => [...run.children].filter((c) => c.offsetParent !== null);
                    const spanOf = () => { const k = kids(); return Math.max(...k.map((c) => c.offsetLeft + c.offsetWidth)) - Math.min(...k.map((c) => c.offsetLeft)); };
                    const cs = getComputedStyle(d);
                    const asLeft = { fits: d.hasAttribute("data-run-fits"), whole: run.hasAttribute("data-run-whole"), inset: d.style.getPropertyValue("--dock-curve-inset") || null, padL: cs.paddingLeft, padR: cs.paddingRight, client: run.clientWidth, span: spanOf(), region: run.parentElement.clientWidth, dockW: +d.getBoundingClientRect().width.toFixed(2) };
                    // One task: nothing the dock observes can run between these writes and reads.
                    const wasWhole = run.hasAttribute("data-run-whole"), wasInset = d.style.getPropertyValue("--dock-curve-inset");
                    run.removeAttribute("data-run-whole");
                    const want = insetFit ?? wasInset;
                    const on = {};
                    if (want) { d.style.setProperty("--dock-curve-inset", want); on.inset = want; on.client = run.clientWidth; on.span = spanOf(); on.padL = getComputedStyle(d).paddingLeft; on.region = run.parentElement.clientWidth; }
                    d.style.removeProperty("--dock-curve-inset");
                    const off = { client: run.clientWidth, span: spanOf(), padL: getComputedStyle(d).paddingLeft, region: run.parentElement.clientWidth };
                    if (wasInset) d.style.setProperty("--dock-curve-inset", wasInset); else d.style.removeProperty("--dock-curve-inset");
                    if (wasWhole) run.setAttribute("data-run-whole", "");
                    return { cap, asLeft, liftedInsetOn: on, liftedInsetOff: off };
                }, { cap, insetFit });
                if (r.asLeft.fits && r.asLeft.inset) insetFit = r.asLeft.inset;
                out(r);
            }
        } finally { await ctx.close(); }
    } else if (what === "touchname") {
        const { ctx, page } = await ctxPage(true);
        try {
            await page.addInitScript(() => {
                window.__log = [];
                const T = () => +performance.now().toFixed(1);
                for (const k of ["pointerdown", "pointerup", "pointercancel", "pointerenter", "pointerleave", "pointermove", "touchstart", "touchend", "click", "contextmenu", "focusin"]) addEventListener(k, (e) => window.__log.push([T(), k, e.pointerType || "", e.target?.getAttribute?.("aria-label") || e.target?.tagName]), true);
                addEventListener("DOMContentLoaded", () => new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 && (n.matches?.("[role=tooltip], [data-reka-popper-content-wrapper]") || n.querySelector?.("[role=tooltip]"))) window.__log.push([T(), "tooltip added", n.textContent.trim().slice(0, 20)]); }).observe(document.body, { childList: true, subtree: true }));
            });
            await page.goto(`http://${HOST}:${port}/?c=dock-comp&page=canvas-tools&ground=field`);
            await page.waitForSelector("[data-story-stage] .glass-dock");
            await sleep(2000);
            const face = await page.locator("[data-story-stage] .glass-dock .dock-layer--summary").first().boundingBox();
            await page.touchscreen.tap(face.x + face.width / 2, face.y + face.height / 2);
            await sleep(1000);
            const seat = page.locator("[data-story-stage] .glass-dock [aria-label=Layers]").first();
            const sb = await seat.boundingBox();
            const t0 = await page.evaluate(() => performance.now());
            // a held touch: CDP in Chromium; WebKit has no held touch in Playwright (dispatched pointer events)
            if (engine === "chromium") {
                const cdp = await ctx.newCDPSession(page);
                const pt = [{ x: sb.x + sb.width / 2, y: sb.y + sb.height / 2 }];
                await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: pt });
                await sleep(900);
                const during = await page.evaluate(() => ({ tooltips: [...document.querySelectorAll("[role=tooltip]")].map((e) => e.textContent.trim()), triggerState: document.querySelector("[data-story-stage] [aria-label=Layers]")?.getAttribute("data-state") }));
                await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
                await sleep(300);
                const log = await page.evaluate((t0) => window.__log.filter((x) => x[0] >= t0).map((x) => [+(x[0] - t0).toFixed(0), ...x.slice(1)]), t0);
                out({ during, log: log.filter((x) => x[1] !== "pointermove").slice(0, 40) });
            } else {
                out({ note: "WebKit 2287 has no held touch in Playwright; not read" });
            }
        } finally { await ctx.close(); }
    }
} finally {
    if (browser) await browser.close();
}
