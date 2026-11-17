// trig8.mjs <port> <tag> [--engine chromium|webkit] [--only a,b]: MEASURE-8 H2 (RU-72 as amended for C7-M13 and C7-8)
// and H3's tap reading (RU-73, C7-M12). m7/trig7.mjs's trigger clause on w-g8 (DropdownMenu, Select, a click Popover and a
// Sheet opened from a run seat, then the trigger pressed again; by mouse at 1440 and by touch at 390 coarse), with the
// reading RU-72 asks at every press: document.elementFromPoint at the press point, the target seat's box against the
// plate's and the run's port, the order of the events the page receives (pointer, touch, mouse, click, focusin, each
// with its target) and the surface's and the dock's open state after it.
//   - A seat past the run's cut is brought into view first, the way a person would: in Chromium a touch swipe on the
//     run (CDP touch events); WebKit has no touch drag, so there the run's port is scrolled by script to the same end
//     and the log says so (RU-72: the harness's cure).
//   - On touch the clause also reads what a person can press when the open surface covers its trigger (RU-72): the
//     Select by a tap on an item (select-touch-item) and the Sheet by a tap on its scrim (sheet-touch-scrim). A tap that
//     reaches the trigger or the scrim and does nothing is the build's.
//   - tapseat (H3, C7-M12): at 390 coarse on w-pill, the folded face tapped open, then a seat tapped: the event order and
//     document.activeElement (with :focus-visible) after the tap.
//   - fourier (C7-8, O-380): fourier's AppDock composition (w-fourier-app) at 390 coarse: after each of four taps (the
//     folded face; then the theme seat; then the Sections trigger and a menu item; then About and a tap outside it), the
//     dock's open state each second for 8 s once the finger is up.
// Each press's event list also names a pointer or touch event a handler cancelled (`<type>:prevented`, read at the window
// as it bubbles), since WebKit sends no compatibility mouse events or click after a cancelled touch.
// One browser, a context per cell, closed in finally. Log: logs/m8-trig-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const ONLY = val("--only", "") ? val("--only").split(",") : null;
const HOST = val("--host", "127.0.0.1");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SURF = [["menu", "w-g8-menu", "w-g8-menu-content"], ["select", "w-g8-select", "w-g8-select-content"], ["popover", "w-g8-pop", "w-g8-pop-content"], ["sheet", "w-g8-sheet", "w-g8-sheet-content"]];
const out = { engine, cells: {}, bad: [] };
const INIT = () => {
    window.__ev = [];
    const d = (e) => { if (!(e instanceof Element)) return String(e?.nodeName ?? e); const t = e.closest("[data-testid]"); const id = t?.getAttribute("data-testid") ?? ""; const own = e.getAttribute("data-testid"); return (own ? own : `${e.tagName.toLowerCase()}${e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/).slice(0, 2).join(".") : ""}${id ? " in " + id : ""}`).slice(0, 90); };
    window.__desc = d;
    for (const ty of ["pointerdown", "pointerup", "touchstart", "touchend", "mousedown", "mouseup", "click", "focusin", "pointercancel"]) addEventListener(ty, (e) => window.__ev.push([+performance.now().toFixed(1), ty, d(e.target)]), true);
    // who cancels: preventDefault on a pointer or touch event records the canceller's stack (its first frames)
    const _pd = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function () { if (/^(pointer|touch)/.test(this.type)) window.__ev.push([+performance.now().toFixed(1), this.type + ":preventDefault by", (new Error().stack || "").split("\n").filter((l) => !/preventDefault|^Error/.test(l)).slice(0, 4).map((l) => l.trim().replace(/https?:\/\/[^/]+\/assets\//, "").slice(0, 80)).join(" < ")]); return _pd.call(this); };
    // whether a handler on the way cancelled the event (read at the window, bubbling, after every listener below it)
    for (const ty of ["pointerdown", "pointerup", "touchstart", "touchend"]) addEventListener(ty, (e) => { if (e.defaultPrevented) window.__ev.push([+performance.now().toFixed(1), ty + ":prevented", d(e.target)]); }, false);
};
const rectOf = (page, sel) => page.evaluate((sel) => { const e = typeof sel === "string" ? document.querySelector(sel) : null; if (!e) return null; const r = e.getBoundingClientRect(); return [+r.left.toFixed(1), +r.top.toFixed(1), +r.right.toFixed(1), +r.bottom.toFixed(1)]; }, sel);
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    const mk = async (coarse) => browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
    const want = (k) => !ONLY || ONLY.some((o) => k.startsWith(o));
    // ── the trigger clause, with the reading at every press ──
    const cases = [];
    for (const coarse of [false, true]) for (const [name, trig, content] of SURF) cases.push({ key: `${name}-${coarse ? "touch" : "mouse"}`, coarse, name, trig, content, second: "trigger" });
    cases.push({ key: "select-touch-item", coarse: true, name: "select", trig: "w-g8-select", content: "w-g8-select-content", second: "item" });
    cases.push({ key: "sheet-touch-scrim", coarse: true, name: "sheet", trig: "w-g8-sheet", content: "w-g8-sheet-content", second: "scrim" });
    for (const c of cases.filter((c) => want(c.key))) {
        const ctx = await mk(c.coarse);
        try {
            const page = await ctx.newPage();
            await page.addInitScript(INIT);
            await page.addInitScript((content) => {
                window.__st = [];
                addEventListener("DOMContentLoaded", () => new MutationObserver(() => {
                    const e = document.querySelector(`[data-testid=${content}]`);
                    const s = e ? e.getAttribute("data-state") || "present" : "absent";
                    if (window.__st.at(-1)?.[1] !== s) window.__st.push([performance.now(), s]);
                }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-state"] }));
            }, c.content);
            await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-g8`);
            await page.waitForSelector("[data-testid=w-g8]");
            await sleep(800);
            const center = async (sel) => { const b = await page.locator(sel).first().boundingBox(); return b ? [b.x + b.width / 2, b.y + b.height / 2] : null; };
            const dockOpen = () => page.evaluate(() => document.querySelector("[data-testid=w-g8]").classList.contains("expanded"));
            const shown = () => page.evaluate((cn) => { const e = document.querySelector(`[data-testid=${cn}]`); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && e.getAttribute("data-state") !== "closed"; }, c.content);
            if (c.coarse) { const p = await center("[data-testid=w-g8] .dock-layer--summary"); await page.touchscreen.tap(p[0], p[1]); await sleep(900); }
            else { const p = await center("[data-testid=w-g8]"); await page.mouse.move(p[0] - 8, p[1]); await page.mouse.move(p[0], p[1], { steps: 4 }); await sleep(1000); }
            const dock0 = await dockOpen();
            // the seat against the plate and the run's port; a seat past the cut is brought into view first
            const geo = async () => ({ seat: await rectOf(page, `[data-testid=${c.trig}]`), plate: await rectOf(page, "[data-testid=w-g8] .dock-plate"), port: await rectOf(page, "[data-testid=w-g8] .dock-run") });
            const g0 = await geo();
            let swipe = null;
            const inPort = (g) => g.seat && g.port && g.seat[0] >= g.port[0] - 0.5 && g.seat[2] <= g.port[2] + 0.5;
            if (c.coarse && !inPort(g0) && g0.seat && g0.port) {
                const dx = g0.seat[2] > g0.port[2] ? g0.seat[2] - g0.port[2] + 4 : g0.seat[0] - g0.port[0] - 4;
                if (engine === "chromium") {
                    const cdp = await ctx.newCDPSession(page);
                    const y = (g0.port[1] + g0.port[3]) / 2, x0 = (g0.port[0] + g0.port[2]) / 2;
                    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x0, y }] });
                    for (let k = 1; k <= 8; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x0 - (dx * k) / 8, y }] }); await sleep(16); }
                    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
                    swipe = { by: "touch swipe", dx: +dx.toFixed(1) };
                } else {
                    await page.evaluate((dx) => { const r = document.querySelector("[data-testid=w-g8] .dock-run"); r.scrollLeft += dx; }, dx);
                    swipe = { by: "script scroll (WebKit has no touch drag)", dx: +dx.toFixed(1) };
                }
                await sleep(500);
                swipe.after = await geo();
                swipe.dockOpen = await dockOpen();
            }
            const read = async (x, y) => page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return window.__desc(e); }, [x, y]);
            const press = async (x, y) => { if (c.coarse) await page.touchscreen.tap(x, y); else await page.mouse.click(x, y); };
            const step = async (label, x, y) => {
                const at = await read(x, y);
                const g = await geo();
                const n0 = await page.evaluate(() => window.__ev.length);
                await press(x, y);
                await sleep(600);
                const ev = await page.evaluate((n0) => window.__ev.slice(n0), n0);
                return { label, at: [+x.toFixed(1), +y.toFixed(1)], elementFromPoint: at, seat: g.seat, plate: g.plate, port: g.port, events: ev.map((e) => `${e[1]}@${e[2]}`), surfaceOpen: await shown(), dockOpen: await dockOpen(), active: await page.evaluate(() => { const e = document.activeElement; return e ? `${window.__desc(e)}${e.matches?.(":focus-visible") ? " :focus-visible" : ""}` : null; }) };
            };
            const tp = await center(`[data-testid=${c.trig}]`);
            const s1 = await step("open", tp[0], tp[1]);
            const opened = await shown();
            const t1 = await page.evaluate(() => performance.now());
            let s2;
            if (c.second === "trigger") s2 = await step("second press on the trigger", tp[0], tp[1]);
            else if (c.second === "item") {
                const it = await page.evaluate(() => { const items = [...document.querySelectorAll("[data-testid=w-g8-select-content] [role=option]")]; const e = items.find((i) => i.getAttribute("data-state") !== "checked") ?? items[0]; if (!e) return null; const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
                s2 = it ? await step("a tap on an item", it[0], it[1]) : { label: "no item", surfaceOpen: await shown() };
            } else {
                // the scrim: the sheet is side="bottom", so a point near the viewport's top is scrim, not content
                s2 = await step("a tap on the scrim", 195, 60);
            }
            await sleep(400);
            const closed = !(await shown());
            await sleep(1000);
            const stillClosed = !(await shown());
            const st = await page.evaluate((t1) => window.__st.filter((x) => x[0] >= t1).map((x) => x[1]), t1);
            const reopened = st.filter((s, i) => s === "open" && i > 0).length + (st[0] === "open" ? 1 : 0);
            const dock = await dockOpen();
            const r = { dock0, geo0: g0, swipe, opened, steps: [s1, s2], closed, stillClosed, reopened, states: st, dockOpen: dock, pass: dock0 && opened && closed && stillClosed && reopened === 0 && dock };
            out.cells[c.key] = r;
            if (!r.pass) out.bad.push(`${c.key}: opened ${opened} closed ${closed} stillClosed ${stillClosed} reopened ${reopened} dock ${dock}`);
        } catch (e) {
            out.cells[c.key] = { error: String(e).slice(0, 300) };
            out.bad.push(`${c.key}: ${String(e).slice(0, 160)}`);
        } finally {
            await ctx.close();
        }
    }
    // ── H3: a seat tap's event order and the active element ──
    if (want("tapseat")) {
        const ctx = await mk(true);
        try {
            const page = await ctx.newPage();
            await page.addInitScript(INIT);
            await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-pill`);
            await page.waitForSelector("[data-testid=w-pill]");
            await sleep(800);
            const f = await page.locator("[data-testid=w-pill] .dock-layer--summary").boundingBox();
            await page.touchscreen.tap(f.x + f.width / 2, f.y + f.height / 2);
            await sleep(900);
            const open0 = await page.evaluate(() => document.querySelector("[data-testid=w-pill]").classList.contains("expanded"));
            const s = await page.locator("[data-testid=w-pill-search]").boundingBox();
            const n0 = await page.evaluate(() => window.__ev.length);
            await page.touchscreen.tap(s.x + s.width / 2, s.y + s.height / 2);
            await sleep(300);
            const ev = await page.evaluate((n0) => window.__ev.slice(n0), n0);
            const active = await page.evaluate(() => { const e = document.activeElement; return e ? `${window.__desc(e)}${e.matches?.(":focus-visible") ? " :focus-visible" : ""}` : null; });
            const fold = [];
            for (let k = 0; k < 9; k++) { await sleep(1000); fold.push(await page.evaluate(() => document.querySelector("[data-testid=w-pill]").classList.contains("expanded"))); }
            out.cells.tapseat = { opened: open0, events: ev.map((e) => `${e[0]} ${e[1]}@${e[2]}`), activeAfterTap: active, openEachSecondAfterTap: fold, foldsWithin9s: fold.includes(false) };
        } catch (e) {
            out.cells.tapseat = { error: String(e).slice(0, 300) };
        } finally {
            await ctx.close();
        }
    }
    // ── C7-8: fourier's AppDock at 390 coarse ──
    if (want("fourier")) {
        const seqs = [
            ["face", []],
            ["theme", ["[data-testid=w-fourier-app-theme]"]],
            ["menu", ["[data-testid=w-fourier-app-nav]", "[data-testid=w-fourier-app-nav-item]"]],
            ["about", ["[data-testid=w-fourier-app-about]", "@outside"]],
        ];
        out.cells.fourier = {};
        for (const [name, taps] of seqs) {
            const ctx = await mk(true);
            try {
                const page = await ctx.newPage();
                await page.addInitScript(INIT);
                await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-fourier-app`);
                await page.waitForSelector("[data-testid=w-fourier-app]");
                await sleep(900);
                const isOpen = () => page.evaluate(() => document.querySelector("[data-testid=w-fourier-app]").classList.contains("expanded"));
                const f = await page.locator("[data-testid=w-fourier-app] .dock-layer--summary").boundingBox();
                await page.touchscreen.tap(f.x + f.width / 2, f.y + f.height / 2);
                await sleep(900);
                const log = [{ tap: "folded face", open: await isOpen() }];
                for (const t of taps) {
                    let x, y;
                    if (t === "@outside") { x = 195; y = 700; }
                    else { const b = await page.locator(t).first().boundingBox(); if (!b) { log.push({ tap: t, missing: true }); continue; } x = b.x + b.width / 2; y = b.y + b.height / 2; }
                    const at = await page.evaluate(([x, y]) => window.__desc(document.elementFromPoint(x, y)), [x, y]);
                    await page.touchscreen.tap(x, y);
                    await sleep(700);
                    log.push({ tap: t, at, open: await isOpen() });
                }
                const each = [];
                for (let k = 0; k < 8; k++) { await sleep(1000); each.push(await isOpen()); }
                out.cells.fourier[name] = { taps: log, openEachSecond: each, folds: each.includes(false), pinned: !each.includes(false) };
            } catch (e) {
                out.cells.fourier[name] = { error: String(e).slice(0, 300) };
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    if (browser) await browser.close();
    out.pass = !out.bad.length;
    writeFileSync(new URL(`../../logs/m8-trig-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, tag, pass: out.pass, cells: Object.fromEntries(Object.entries(out.cells).map(([k, v]) => [k, v.pass ?? v.error ?? (k === "fourier" ? Object.fromEntries(Object.entries(v).map(([n, x]) => [n, x.pinned ? "pinned" : "folds"])) : k === "tapseat" ? v.activeAfterTap : "-")])), bad: out.bad.slice(0, 10) }));
}
