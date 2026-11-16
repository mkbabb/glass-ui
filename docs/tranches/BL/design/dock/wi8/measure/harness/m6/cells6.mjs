// cells6.mjs: MEASURE-6. m4/cells.mjs with RU-42: G-1 (f)'s WebKit cell is retired (WebKit's finger
// was dispatched pointer events, which is what a unit test sends; clause (f) is read there by the unit
// witness on useDockState and in Chromium on a real touch). Logs logs/m4-cells.<tag>.<engine>.json.
// RU-43's cells, added:
//   G-1 390 railp  a vertical rail whose folded face is only its persistent seats, at 390 coarse: it rests
//                  open (R-2: a dock with nothing to tap), and does not fold in 8 s
//   G-8 trig       the overlays dock (w-g8) open; each of DropdownMenu, Select, a click Popover and a Sheet
//                  opened from its seat, then its trigger pressed again, by mouse (1440) and by touch (390
//                  coarse): the surface closes once, is still closed 1 s later, and the dock is still open
// cells.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-4, the cells MEASURE-3 did not run,
// each with an action that reaches the state it reads. One browser, a new context per cell,
// everything closed in finally. Times are read in the page (performance.now()) from a
// MutationObserver on the dock's class against the action's own page time.
//
//   G-1 (l)        a mouse press on the folded face, then the pointer leaves for 15 s: pinned, no fold
//   G-1 (f) finger a tap opens (390 coarse); a finger then held down on a seat for 9 s: no fold;
//                  lifted: one linger after the lift. Chromium: a real touch (CDP
//                  Input.dispatchTouchEvent). WebKit has no held-touch input in Playwright; its
//                  cell dispatches pointerdown/pointerup (pointerType touch) on the seat, and says so.
//   G-1 (h) collapse()  hover-opened (1440 fine) and tap-opened (390 coarse): the fold starts at once
//   G-1 390        (g) a tap opens and lifts: one linger after the lift, not pinned; (h) a tap outside
//   G-8 hover-esc  the dock opened by Tab (focus inside), a hover popover opened on its seat, then
//                  Escape twice: the first closes the popover with the dock still; the second folds
//                  it with focus on the folded face. Also read with focus on <body> (focus never
//                  entered the dock): Escape is element-scoped, so the dock does not hear it.
//   G-8 sheet-out  a sheet opened from a hover-opened dock; a press outside the sheet (on its scrim,
//                  top of the page): the sheet closes; read when the dock folds
//   G-13 safe area Chromium: Emulation.setSafeAreaInsetsOverride, bottom 34 px; a controls dock at
//                  bottom-end, within="viewport" and within="parent": its bottom inset from the
//                  viewport (or its parent), with and without the inset
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const only = (val("--only", "") || "").split(",").filter(Boolean);
const out = {};
let browser;
const INIT = (id) => `
window.__cls = [];
window.__ev = [];
for (const k of ["pointerdown", "pointerup", "pointercancel", "contextmenu", "click", "touchend", "touchcancel", "focusin"]) addEventListener(k, (e) => window.__ev.push([Math.round(performance.now()), k, e.pointerType || ""]), true);
const arm = () => {
  const d = document.querySelector('[data-testid="${id}"]');
  if (!d) return requestAnimationFrame(arm);
  window.__dock = d;
  new MutationObserver(() => window.__cls.push([performance.now(), d.classList.contains('expanded') ? 'open' : 'collapsed'])).observe(d, { attributes: true, attributeFilter: ['class'] });
};
addEventListener('DOMContentLoaded', arm);
`;
async function withPage(coarse, id, extra, fn) {
    const ctx = await browser.newContext({
        viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}),
    });
    try {
        await ctx.addInitScript(INIT(id));
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${id}${extra}`);
        await page.waitForSelector(`[data-testid=${id}]`);
        await page.waitForTimeout(600);
        const now = () => page.evaluate(() => performance.now());
        const cls = () => page.evaluate(() => window.__cls);
        const center = async (sel) => { const b = await page.locator(sel).first().boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
        const st = () => page.evaluate(() => {
            const d = window.__dock; const ae = document.activeElement;
            return { open: d.classList.contains("expanded"), pinned: d.classList.contains("pinned"), focus: ae?.getAttribute("data-testid") || ae?.getAttribute("aria-label") || ae?.className?.toString().slice(0, 40) || ae?.tagName, focusSummary: !!ae?.classList?.contains("dock-layer--summary"), fv: !!d.querySelector(":focus-visible"), held: !!window.__dockApi?.value?.isHeld, exp: window.__dockApi?.value?.expanded };
        });
        return await fn({ page, ctx, now, cls, center, st });
    } catch (e) {
        return { error: String(e).slice(0, 300) };
    } finally {
        await ctx.close();
    }
}
const firstAfter = (log, t0, s) => log.find((x) => x[0] >= t0 && x[1] === s);
const collapseNow = (page) => page.evaluate(() => {
    const t = performance.now();
    window.__dockApi.value.collapse();
    return t;
});
const hoverOpen = async (page, center, id) => {
    const [x, y] = await center(`[data-testid=${id}]`);
    await page.mouse.move(x - 40, y); await page.mouse.move(x, y, { steps: 3 }); await page.mouse.move(x + 2, y);
    await page.waitForTimeout(900);
};
const cells = {
    async l() {
        return withPage(false, "w-pill", "", async ({ page, now, cls, st }) => {
            await page.mouse.move(8, 400);
            await page.waitForTimeout(200);
            await page.locator("[data-testid=w-pill] .dock-layer--summary").click();
            await page.waitForTimeout(700);
            const after = await st();
            const t0 = await now();
            await page.mouse.move(8, 400);
            await page.waitForTimeout(15000);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { pinned: after.pinned, open: after.open, foldedIn15s: !!f, at: f ? +(f[0] - t0).toFixed(0) : null };
        });
    },
    async finger() {
        return withPage(true, "w-pill", "", async ({ page, ctx, now, cls, center, st }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(900);
            const opened = (await st()).open;
            const [sx, sy] = await center("[data-testid=w-pill] .dock-run > *");
            let how;
            const tDown = await now();
            if (engine === "chromium") {
                how = "CDP touchStart/touchEnd";
                const cdp = await ctx.newCDPSession(page);
                await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: sx, y: sy }] });
                await page.waitForTimeout(9000);
                const held = firstAfter(await cls(), tDown, "collapsed");
                const tUp = await now();
                await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
                const lifted = await st();
                await page.waitForTimeout(15000);
                const f = firstAfter(await cls(), tUp, "collapsed");
                return { how, opened, foldedWhileHeld: !!held, lifted, foldAfterLiftMs: f ? +(f[0] - tUp).toFixed(0) : null, end: await st(), events: await page.evaluate(() => window.__ev.slice(-12)), tDown: Math.round(tDown), tUp: Math.round(tUp) };
            }
            how = "dispatched pointerdown/pointerup, pointerType touch (WebKit has no held-touch input)";
            await page.evaluate(([px, py]) => { const el = document.elementFromPoint(px, py); el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true, pointerType: "touch", isPrimary: true, pointerId: 7, clientX: px, clientY: py, buttons: 1 })); }, [sx, sy]);
            await page.waitForTimeout(9000);
            const held = firstAfter(await cls(), tDown, "collapsed");
            const tUp = await now();
            await page.evaluate(([px, py]) => { const el = document.elementFromPoint(px, py); el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, composed: true, pointerType: "touch", isPrimary: true, pointerId: 7, clientX: px, clientY: py })); }, [sx, sy]);
            await page.waitForTimeout(9000);
            const f = firstAfter(await cls(), tUp, "collapsed");
            return { how, opened, foldedWhileHeld: !!held, foldAfterLiftMs: f ? +(f[0] - tUp).toFixed(0) : null };
        });
    },
    async tapseat() {
        // a control: a tap opens, then a short tap on a seat; read the fold after that tap
        return withPage(true, "w-pill", "", async ({ page, now, cls, center, st }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(900);
            const [sx, sy] = await center("[data-testid=w-pill] .dock-run > *");
            const t0 = await now();
            await page.touchscreen.tap(sx, sy);
            await page.waitForTimeout(12000);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { foldAfterSeatTapMs: f ? +(f[0] - t0).toFixed(0) : null, end: await st() };
        });
    },
    async hcollapse() {
        const fine = await withPage(false, "w-pill", "", async ({ page, cls, center, st }) => {
            await hoverOpen(page, center, "w-pill");
            const opened = (await st()).open;
            const t0 = await collapseNow(page);
            await page.waitForTimeout(800);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { opened, foldAfterMs: f ? +(f[0] - t0).toFixed(1) : null };
        });
        const coarse = await withPage(true, "w-pill", "", async ({ page, cls, center, st }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(900);
            const opened = (await st()).open;
            const t0 = await collapseNow(page);
            await page.waitForTimeout(800);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { opened, foldAfterMs: f ? +(f[0] - t0).toFixed(1) : null };
        });
        return { fine1440: fine, coarse390: coarse };
    },
    // INPUT-hover-shift (reading only): how far the in-flow dock's neighbours move on hover and on focus.
    async inflow() {
        const res = {};
        for (const coarse of [false, true]) {
            res[coarse ? "390-touch" : "1440-fine"] = await withPage(coarse, "w-inflow", "", async ({ page, center, st }) => {
                const boxes = () => page.evaluate(() => Object.fromEntries(["w-inflow", "w-inflow-beside", "w-inflow-below"].map((k) => { const r = document.querySelector(`[data-testid=${k}]`).getBoundingClientRect(); return [k, { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) }]; })));
                const d = (a, b, k) => ({ dx: +(b[k].x - a[k].x).toFixed(2), dy: +(b[k].y - a[k].y).toFixed(2), dw: +(b[k].w - a[k].w).toFixed(2), dh: +(b[k].h - a[k].h).toFixed(2) });
                const rest = await boxes();
                const [x, y] = await center("[data-testid=w-inflow]");
                if (coarse) await page.touchscreen.tap(x, y);
                else { await page.mouse.move(x - 200, y); await page.mouse.move(x, y, { steps: 3 }); }
                await page.waitForTimeout(1200);
                const hov = await boxes(); const openH = (await st()).open;
                const out = { open: openH, [coarse ? "tap" : "hover"]: { dock: d(rest, hov, "w-inflow"), beside: d(rest, hov, "w-inflow-beside"), below: d(rest, hov, "w-inflow-below") } };
                if (!coarse) {
                    await page.mouse.move(2, 2); await page.evaluate(() => window.__dockApi?.value?.collapse()); await page.waitForTimeout(1200);
                    const rest2 = await boxes();
                    await page.evaluate(() => document.querySelector("[data-testid=w-inflow] .dock-layer--summary, [data-testid=w-inflow] [tabindex], [data-testid=w-inflow] button")?.focus());
                    await page.keyboard.press("Shift"); await page.waitForTimeout(1200);
                    const foc = await boxes();
                    out.focus = { open: (await st()).open, dock: d(rest2, foc, "w-inflow"), beside: d(rest2, foc, "w-inflow-beside"), below: d(rest2, foc, "w-inflow-below") };
                }
                return out;
            });
        }
        return res;
    },
    // INPUT-daraksha-2x, 23:15 point 1 (reading only): a seat's name on touch. Hover (fine) and a tap and a
    // press-and-hold (touch, 390) on w-seat's Search seat; whether any tooltip with a name is shown.
    async touchname() {
        const tip = (page) => page.evaluate(() => [...document.querySelectorAll("[role=tooltip], [data-dock-tooltip], [data-reka-popper-content-wrapper]")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && +getComputedStyle(e).opacity > 0.05; }).map((e) => e.textContent.trim().slice(0, 30)));
        const fine = await withPage(false, "w-seat", "", async ({ page, center }) => {
            await hoverOpen(page, center, "w-seat");
            const [x, y] = await center("[data-testid=w-seat-search]");
            await page.mouse.move(x, y, { steps: 3 }); await page.waitForTimeout(1200);
            return { hoverNames: await tip(page) };
        });
        const touch = await withPage(true, "w-seat", "", async ({ page, center }) => {
            const [dx, dy] = await center("[data-testid=w-seat]");
            await page.touchscreen.tap(dx, dy); await page.waitForTimeout(900);
            const [x, y] = await center("[data-testid=w-seat-search]");
            const cdp = engine === "chromium" ? await page.context().newCDPSession(page) : null;
            let held = null;
            if (cdp) {
                await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
                await page.waitForTimeout(1200); held = await tip(page);
                await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            }
            await page.waitForTimeout(300);
            const afterHold = await tip(page);
            return { holdNames: held ?? "press-and-hold not dispatchable in this engine (Playwright WebKit has no touch-hold)", afterRelease: afterHold };
        });
        return { fine, touch, namesOnTouch: Array.isArray(touch.holdNames) ? touch.holdNames.length > 0 : null };
    },
    async railp() {
        return withPage(true, "w-railp", "", async ({ page, now, cls, st }) => {
            await page.waitForTimeout(900);
            const first = await st();
            const t0 = await now();
            await page.waitForTimeout(8000);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { restsOpen: first.open, foldedIn8s: !!f, pass: first.open && !f };
        });
    },
    async trig() {
        const surfaces = [["menu", "[data-testid=w-g8-menu]", "[data-testid=w-g8-menu-content]"], ["select", "[data-testid=w-g8-select]", "[data-testid=w-g8-select-content]"], ["popover", "[data-testid=w-g8-pop]", "[data-testid=w-g8-pop-content]"], ["sheet", "[data-testid=w-g8-sheet]", "[data-testid=w-g8-sheet-content]"]];
        const out = {};
        for (const coarse of [false, true]) for (const [name, trig, content] of surfaces) {
            out[`${name}-${coarse ? "touch" : "mouse"}`] = await withPage(coarse, "w-g8", "", async ({ page, center, st }) => {
                const shown = () => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && +getComputedStyle(e).opacity > 0.05 && e.getAttribute("data-state") !== "closed"; }, content);
                const press = async (x, y) => { if (coarse) await page.touchscreen.tap(x, y); else await page.mouse.click(x, y); };
                if (coarse) { const [x, y] = await center("[data-testid=w-g8]"); await page.touchscreen.tap(x, y); await page.waitForTimeout(900); }
                else await hoverOpen(page, center, "w-g8");
                const dockOpen0 = (await st()).open;
                const [tx, ty] = await center(trig);
                await press(tx, ty);
                await page.waitForTimeout(700);
                const opened = await shown();
                let opens = 0; await page.evaluate((s) => { window.__opens = 0; const mo = new MutationObserver(() => { const e = document.querySelector(s); if (e && e.getAttribute("data-state") === "open") window.__opens++; }); mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-state"] }); }, content);
                await press(tx, ty);
                await page.waitForTimeout(500);
                const closed = !(await shown());
                await page.waitForTimeout(1000);
                const stillClosed = !(await shown());
                opens = await page.evaluate(() => window.__opens);
                const dockOpen = (await st()).open;
                return { dockOpen0, opened, closed, stillClosed, reopened: opens, dockOpen, pass: opened && closed && stillClosed && dockOpen && opens === 0 };
            });
        }
        return out;
    },
    async c390() {
        const g = await withPage(true, "w-pill", "", async ({ page, now, cls, center, st }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            const t0 = await now();
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(12000);
            const log = await cls();
            const o = firstAfter(log, t0, "open");
            const f = o ? firstAfter(log, o[0], "collapsed") : null;
            return { opened: !!o, pinned: (await st()).pinned, foldAfterTapMs: f ? +(f[0] - t0).toFixed(0) : null };
        });
        const h = await withPage(true, "w-pill", "", async ({ page, now, cls, center, st }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(900);
            const opened = (await st()).open;
            const t0 = await now();
            await page.touchscreen.tap(12, 12);
            await page.waitForTimeout(800);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { opened, foldAfterTapOutsideMs: f ? +(f[0] - t0).toFixed(1) : null };
        });
        return { g: g, hOutside: h };
    },
    async hoveresc() {
        const D = "[data-testid=w-g8]";
        const pop = "[data-testid=w-g8-hover-pop]";
        const visible = (page) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && +getComputedStyle(e).opacity > 0.05; }, pop);
        const focusIn = await withPage(false, "w-g8", "", async ({ page, st }) => {
            await page.mouse.move(8, 880);
            await page.keyboard.press("Tab");
            await page.waitForTimeout(800);
            const byTab = await st();
            await page.locator("[data-testid=w-g8-hover]").hover();
            await page.waitForTimeout(900);
            const opened = await visible(page);
            const b0 = await page.locator(`${D} .dock-plate`).boundingBox();
            await page.keyboard.press("Escape");
            await page.waitForTimeout(500);
            const b1 = await page.locator(`${D} .dock-plate`).boundingBox();
            const e1 = { ...(await st()), overlay: await visible(page), plateMoved: Math.max(Math.abs(b1.x - b0.x), Math.abs(b1.width - b0.width)) };
            await page.keyboard.press("Escape");
            await page.waitForTimeout(800);
            return { openedByTab: byTab.open, focusAfterTab: byTab.focus, popoverOpened: opened, esc1: e1, esc2: await st() };
        });
        const focusBody = await withPage(false, "w-g8", "", async ({ page, center, st }) => {
            await hoverOpen(page, center, "w-g8");
            await page.locator("[data-testid=w-g8-hover]").hover();
            await page.waitForTimeout(900);
            const opened = await visible(page);
            await page.keyboard.press("Escape");
            await page.waitForTimeout(500);
            const e1 = { ...(await st()), overlay: await visible(page) };
            await page.keyboard.press("Escape");
            await page.waitForTimeout(800);
            return { popoverOpened: opened, esc1: e1, esc2: await st() };
        });
        return { focusInside: focusIn, focusOnBody: focusBody };
    },
    async sheetout() {
        return withPage(false, "w-g8", "", async ({ page, now, cls, center, st }) => {
            await hoverOpen(page, center, "w-g8");
            await page.locator("[data-testid=w-g8-sheet]").click();
            await page.waitForTimeout(700);
            const sheet = "[data-testid=w-g8-sheet-content]";
            const vis = () => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.top < innerHeight && +getComputedStyle(e).opacity > 0.05; }, sheet);
            const opened = await vis();
            const sb = await page.locator(sheet).boundingBox();
            // the press lands on the scrim above the sheet, at the top of the page
            const px = 720, py = 20;
            const onSheet = sb ? py >= sb.y && py <= sb.y + sb.height : null;
            const t0 = await now();
            await page.mouse.click(px, py);
            await page.waitForTimeout(800);
            const f = firstAfter(await cls(), t0, "collapsed");
            const after = { ...(await st()), sheet: await vis() };
            await page.waitForTimeout(7500);
            const later = await st();
            return { opened, pressOnSheet: onSheet, foldAfterPressMs: f ? +(f[0] - t0).toFixed(1) : null, after, after8s: later };
        });
    },
    async safearea() {
        if (engine !== "chromium") return { unread: "no safe-area override in WebKit 2287 (env() cannot be set from a page)" };
        const res = {};
        for (const within of ["viewport", "parent"]) {
            for (const inset of [0, 34]) {
                res[`${within}-${inset}`] = await withPage(true, "w-ctl", `&corner=bottom-end&within=${within}`, async ({ page, ctx }) => {
                    const cdp = await ctx.newCDPSession(page);
                    let ok = true;
                    try { await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { top: 0, left: 0, right: 0, bottom: inset } }); } catch (e) { ok = String(e).slice(0, 120); }
                    await page.waitForTimeout(500);
                    return { override: ok, ...(await page.evaluate(() => {
                        const d = document.querySelector("[data-testid=w-ctl]");
                        const p = d.querySelector(".dock-plate").getBoundingClientRect();
                        const host = document.querySelector("[data-testid=w-ctl-host]").getBoundingClientRect();
                        const probe = document.createElement("div"); probe.style.cssText = "position:fixed;height:env(safe-area-inset-bottom,0px)"; document.body.append(probe);
                        const env = probe.getBoundingClientRect().height; probe.remove();
                        return { env, fromViewportBottom: +(innerHeight - p.bottom).toFixed(2), fromHostBottom: +(host.bottom - p.bottom).toFixed(2), fromViewportRight: +(innerWidth - p.right).toFixed(2), safeVar: getComputedStyle(d).getPropertyValue("--dock-safe-block-end").trim() };
                    })) };
                });
            }
        }
        return res;
    },
};
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const [k, fn] of Object.entries(cells)) {
        if (only.length && !only.includes(k)) continue;
        if (k === "finger" && engine === "webkit") { out[k] = { retired: "RU-42: WebKit's finger is dispatched pointer events; (f) is read by the unit witness" }; continue; }
        out[k] = await fn();
        console.log(JSON.stringify({ [k]: out[k] }));
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m4-cells.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
