// nested.mjs — the third round's cells: a surface opened inside another, a Select inside
// a Dialog, a chip row in a detented body, and a mouse press on a detented body.
//
//   node nested.mjs <chromium|webkit> <port> <out.json> [part,...]
//
// parts (default all that the engine can drive):
//   nested  dlg-menu, dlg-pop, fsheet-menu, pop-menu, pop-pop. The parent opens by a tap on
//           its trigger, the child by a tap on its own. Then, each read 1 s later:
//           (a) a tap on the parent's plate beside the child (the first of the parent's
//               `far1..5` lines that the child's plate does not cover);
//           (b) the child opened again, a tap on the page's press target (top right);
//           (c) a second tap on the press target.
//           Each read records the parent's and the child's state, the element at the tap
//           point just before the tap, and the press target's click count.
//   dsel    dlg-sel (modal Dialog) and ndlg-sel (`modal=false`) with a 6-row Select: a
//           tap on the last option; the read says whether it was picked.
//   chips   Chromium only (CDP touch). A chip row (`overflow-x: auto`, 24 chips) at the
//           top of a detented body; a 240 px swipe to the left with 0 or 8 px of vertical
//           drift; the row's scrollLeft and the sheet's rung after it.
//   mouse   Chromium only, 390 and 1280 wide. det-chips: a press on a body row, one move
//           to 60 px above the sheet, a lift there; then a hover down across the body with
//           no button; then a press on a body row dragged down 150 px.
//   scrim   dlg-field: a modal Dialog with a text field, `dismiss` locked and free. The
//           field is focused by a tap, then one tap on the scrim at (30, 120); the read
//           1 s later gives the dialog's state, its rebuff rung and the focused element.
//           Then the same at 390 and 1280 wide with a mouse click (a desktop context).
//   nopan   Chromium only (CDP touch). A swipe that the browser does not pan, as iOS
//           WebKit does not pan a page whose root is `overflow: hidden` while nothing
//           under the finger scrolls: a 150 px swipe up from the second option of an
//           open 4-option Select, and a 150 px swipe down from a Select's trigger at the
//           top of the phone drawer's 3-row body. Each runs twice: as Chromium pans it,
//           and with a document `touchmove` listener that cancels every move (no pan).
//           The read: whether an option was picked, whether the Select is open.
// The nested part also reads paint when the child opens: the element at the centre of
// the child's plate, and whether it lies in the child or in the parent.
//
// 390x844, device scale 3, isMobile and hasTouch, an iPhone user agent (the mouse part:
// a plain desktop context). One browser per run, a new context per cell, closed in finally.
// Under the guard: guarded [--exclusive webkit] --timeout 20 -- node nested.mjs ...
import { chromium, webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";

const [engine, port, out, partsArg] = process.argv.slice(2);
const parts = new Set((partsArg ?? "nested,dsel,chips,mouse,scrim,nopan").split(","));
const UA = devices["iPhone 13"].userAgent;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];

async function phone(browser) {
    const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent: UA,
    });
    return { ctx, page: await ctx.newPage() };
}

async function load(page, query) {
    await page.goto(`http://127.0.0.1:${port}/?ps=1&${query}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__psReady === true, null, { timeout: 20000 });
    await page.evaluate(() => {
        const st = document.querySelector('[data-testid="stage"]');
        window.scrollTo(0, st.getBoundingClientRect().top + window.scrollY - 300);
    });
    await sleep(400);
}

async function centre(page, q) {
    return page.evaluate((q) => {
        const el = document.querySelector(q);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)];
    }, q);
}

// The parent is the layer that holds the second trigger; the child is the open plate
// (menu or popover) that does not. Outside layers are counted apart.
function stateFn(pt) {
    const t2 = document.querySelector('[data-testid="trigger2"]');
    const parent = t2?.closest('[data-dismissable-layer]:not([data-slot="overlay-outside"])');
    const children = [
        ...document.querySelectorAll('[role="menu"], [data-slot="popover-content"]'),
    ].filter((m) => !m.contains(t2));
    const hit = pt ? document.elementFromPoint(pt[0], pt[1]) : null;
    const name = (el) =>
        el
            ? `${el.tagName.toLowerCase()}${el.dataset.slot ? "[" + el.dataset.slot + "]" : ""}${el.dataset.testid ? "#" + el.dataset.testid : ""}`
            : null;
    return {
        parent: parent ? (parent.getAttribute("data-state") ?? "present") : "gone",
        child: children.map((m) => m.getAttribute("data-state")).join(",") || "gone",
        outsideLayers: document.querySelectorAll('[data-slot="overlay-outside"]').length,
        hit: name(hit),
        pressed: window.__psPressed ?? 0,
        rootOverflow: getComputedStyle(document.documentElement).overflowY,
        scrollY: Math.round(window.scrollY),
    };
}

// Paint at the centre of the open child plate: what is on top there.
function paintFn() {
    const t2 = document.querySelector('[data-testid="trigger2"]');
    const parent = t2?.closest('[data-dismissable-layer]:not([data-slot="overlay-outside"])');
    const child = [
        ...document.querySelectorAll('[role="menu"], [data-slot="popover-content"]'),
    ].find((m) => !m.contains(t2) && m.getAttribute("data-state") === "open");
    if (!child) return null;
    const r = child.getBoundingClientRect();
    const p = [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)];
    const hit = document.elementFromPoint(p[0], p[1]);
    const z = (el) => {
        for (let n = el; n && n !== document.body; n = n.parentElement) {
            const v = getComputedStyle(n).zIndex;
            if (v !== "auto") return v;
        }
        return "auto";
    };
    return {
        at: p,
        hit: hit ? `${hit.tagName.toLowerCase()}${hit.dataset.slot ? "[" + hit.dataset.slot + "]" : ""}${hit.dataset.testid ? "#" + hit.dataset.testid : ""}` : null,
        inChild: !!hit && child.contains(hit),
        inParent: !!hit && !!parent && parent.contains(hit),
        childZ: z(child),
        parentZ: parent ? z(parent) : null,
    };
}

// The first `far` line of the parent that no open child plate covers.
function farPoint() {
    const t2 = document.querySelector('[data-testid="trigger2"]');
    const plates = [
        ...document.querySelectorAll('[role="menu"], [data-slot="popover-content"]'),
    ].filter((m) => !m.contains(t2) && m.getAttribute("data-state") !== "closed");
    for (let i = 1; i <= 6; i++) {
        const el = document.querySelector(`[data-testid="far${i}"]`);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const p = [Math.round(r.left + Math.min(40, r.width / 2)), Math.round(r.top + r.height / 2)];
        if (p[1] <= 0 || p[1] >= innerHeight) continue;
        const covered = plates.some((m) => {
            const b = m.getBoundingClientRect();
            return p[0] >= b.left - 4 && p[0] <= b.right + 4 && p[1] >= b.top - 4 && p[1] <= b.bottom + 4;
        });
        if (!covered) return { p, line: i };
    }
    return null;
}

async function nestedCell(browser, s) {
    const { ctx, page } = await phone(browser);
    const res = { part: "nested", cell: s, engine, steps: [] };
    const read = (pt) => page.evaluate(stateFn, pt);
    try {
        await load(page, `s=${s}`);
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.touchscreen.tap(tr[0], tr[1]);
        await sleep(900);
        res.steps.push({ step: "parent open", ...(await read(null)) });
        const openChild = async (label) => {
            const t2 = await centre(page, '[data-testid="trigger2"]');
            await page.touchscreen.tap(t2[0], t2[1]);
            await sleep(900);
            res.steps.push({ step: label, ...(await read(null)) });
        };
        await openChild("child open");
        res.paint = await page.evaluate(paintFn);
        const far = await page.evaluate(farPoint);
        res.far = far;
        if (far) {
            const before = await read(far.p);
            await page.touchscreen.tap(far.p[0], far.p[1]);
            await sleep(1000);
            res.steps.push({ step: `(a) tap on the parent's plate (far${far.line})`, hitBefore: before.hit, ...(await read(null)) });
        }
        await openChild("child open again");
        const press = await centre(page, '[data-testid="press"]');
        const b1 = await read(press);
        await page.touchscreen.tap(press[0], press[1]);
        await sleep(1000);
        res.steps.push({ step: "(b) tap on the press target", hitBefore: b1.hit, ...(await read(null)) });
        const b2 = await read(press);
        await page.touchscreen.tap(press[0], press[1]);
        await sleep(1000);
        res.steps.push({ step: "(c) second tap on the press target", hitBefore: b2.hit, ...(await read(null)) });
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 600);
    } finally {
        await ctx.close();
    }
    return res;
}

async function dselCell(browser, s) {
    const { ctx, page } = await phone(browser);
    const res = { part: "dsel", cell: s, engine, steps: [] };
    const read = () =>
        page.evaluate(() => {
            const opts = [...document.querySelectorAll('[role="option"]')];
            const last = opts.at(-1);
            let hit = null;
            let onOption = null;
            let box = null;
            if (last) {
                const r = last.getBoundingClientRect();
                box = [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)];
                const h = document.elementFromPoint(box[0], box[1]);
                hit = h ? `${h.tagName.toLowerCase()}${h.dataset.slot ? "[" + h.dataset.slot + "]" : ""}` : null;
                onOption = !!h && last.contains(h);
            }
            return {
                dialog: document.querySelector('[role="dialog"]')?.getAttribute("data-state") ?? null,
                selectOpen: document.querySelector('[data-testid="trigger2"]')?.getAttribute("aria-expanded") ?? null,
                lastBox: box,
                hit,
                onOption,
                picked: document.querySelector('[data-testid="picked"]')?.textContent ?? null,
                outsideLayers: document.querySelectorAll('[data-slot="overlay-outside"]').length,
            };
        });
    try {
        await load(page, `s=${s}`);
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.touchscreen.tap(tr[0], tr[1]);
        await sleep(900);
        const t2 = await centre(page, '[data-testid="trigger2"]');
        await page.touchscreen.tap(t2[0], t2[1]);
        await sleep(900);
        const st = await read();
        res.steps.push({ step: "select open", ...st });
        if (st.lastBox) {
            await page.touchscreen.tap(st.lastBox[0], st.lastBox[1]);
            await sleep(1000);
        }
        res.steps.push({ step: "after a tap on the last option", ...(await read()) });
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 600);
    } finally {
        await ctx.close();
    }
    return res;
}

function sheetFn() {
    const sheet = document.querySelector('[data-slot="sheet-content"]');
    const chips = document.querySelector('[data-testid="chips"]');
    return {
        open: sheet?.getAttribute("data-state") ?? null,
        t: sheet ? Number(sheet.style.getPropertyValue("--detent-t") || "NaN") : null,
        sheetTop: sheet ? Math.round(sheet.getBoundingClientRect().top) : null,
        dragging: sheet ? sheet.hasAttribute("data-dragging") : null,
        chipsLeft: chips ? Math.round(chips.scrollLeft) : null,
        scrollY: Math.round(window.scrollY),
    };
}

async function cdpSwipe(cdp, [x, y], dx, dy) {
    const steps = 14;
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let i = 1; i <= steps; i++) {
        await sleep(16);
        await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x: x + (dx * i) / steps, y: y + (dy * i) / steps }],
        });
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
}

async function chipsCell(browser, s, dy, topRung) {
    const { ctx, page } = await phone(browser);
    const res = { part: "chips", cell: s, dy, topRung, engine, steps: [] };
    try {
        await load(page, `s=${s}&n=30`);
        const cdp = await ctx.newCDPSession(page);
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.touchscreen.tap(tr[0], tr[1]);
        await sleep(1200);
        if (topRung) {
            // The grip raises the sheet to its top rung, where only a move toward
            // dismissal is the sheet's.
            const grip = await centre(page, '[data-slot="sheet-detent-handle"]');
            await cdpSwipe(cdp, grip, 0, -400);
            await sleep(1200);
        }
        res.steps.push({ step: "open", ...(await page.evaluate(sheetFn)) });
        const c = await centre(page, '[data-testid="chips"]');
        res.from = c;
        await cdpSwipe(cdp, [c[0] + 120, c[1]], -240, dy);
        await sleep(900);
        res.steps.push({ step: `swipe left 240, drift ${dy}`, ...(await page.evaluate(sheetFn)) });
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 600);
    } finally {
        await ctx.close();
    }
    return res;
}

async function mouseCell(browser, width) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await ctx.newPage();
    const res = { part: "mouse", cell: "det-chips", width, engine, steps: [] };
    const read = () => page.evaluate(sheetFn);
    const rowAt = () =>
        page.evaluate(() => {
            const r = [...document.querySelectorAll(".ps-row")][1].getBoundingClientRect();
            return [Math.round(r.left + 30), Math.round(r.top + r.height / 2)];
        });
    try {
        await load(page, "s=det-chips&n=30");
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.mouse.click(tr[0], tr[1]);
        await sleep(1200);
        res.steps.push({ step: "open", ...(await read()) });
        const row = await rowAt();
        const top = (await read()).sheetTop;
        await page.mouse.move(row[0], row[1]);
        await page.mouse.down();
        await page.mouse.move(row[0], Math.max(4, top - 60), { steps: 1 });
        await page.mouse.up();
        await sleep(900);
        res.steps.push({ step: "body press, one move to 60 px above the sheet, lift there", ...(await read()) });
        await page.mouse.move(Math.round(width / 2), 500, { steps: 2 });
        await page.mouse.move(Math.round(width / 2), 760, { steps: 12 });
        await sleep(150);
        res.steps.push({ step: "hover down across the body, no button", ...(await read()) });
        await sleep(1200);
        res.steps.push({ step: "1.2 s later", ...(await read()) });
        const row2 = await rowAt();
        await page.mouse.move(row2[0], row2[1]);
        await page.mouse.down();
        await page.mouse.move(row2[0], row2[1] + 150, { steps: 10 });
        await sleep(100);
        res.steps.push({ step: "body press dragged down 150, before the lift", ...(await read()) });
        await page.mouse.up();
        await sleep(1200);
        res.steps.push({ step: "after the lift", ...(await read()) });
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 600);
    } finally {
        await ctx.close();
    }
    return res;
}

function focusFn() {
    const el = document.activeElement;
    const dlg = document.querySelector('[data-slot="dialog-content"]');
    return {
        dialog: dlg?.getAttribute("data-state") ?? "gone",
        rebuff: dlg?.getAttribute("data-rebuff") ?? null,
        active: el ? `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.dataset?.testid ? "[" + el.dataset.testid + "]" : ""}` : null,
        hitScrim: (() => {
            const h = document.elementFromPoint(30, 120);
            return h ? `${h.tagName.toLowerCase()}${h.className && typeof h.className === "string" && h.className.includes("bg-overlay-scrim") ? ".scrim" : ""}` : null;
        })(),
    };
}

async function scrimTouchCell(browser, dismiss) {
    const { ctx, page } = await phone(browser);
    const res = { part: "scrim", cell: "dlg-field", dismiss, input: "touch", engine, steps: [] };
    try {
        await load(page, `s=dlg-field&dismiss=${dismiss}`);
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.touchscreen.tap(tr[0], tr[1]);
        await sleep(900);
        const f = await centre(page, '[data-testid="field"]');
        await page.touchscreen.tap(f[0], f[1]);
        await sleep(400);
        res.steps.push({ step: "field tapped", ...(await page.evaluate(focusFn)) });
        await page.touchscreen.tap(30, 120);
        await sleep(1000);
        res.steps.push({ step: "after one tap on the scrim at (30, 120)", ...(await page.evaluate(focusFn)) });
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 600);
    } finally {
        await ctx.close();
    }
    return res;
}

async function scrimMouseCell(browser, dismiss, width) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 } });
    const page = await ctx.newPage();
    const res = { part: "scrim", cell: "dlg-field", dismiss, input: "mouse", width, engine, steps: [] };
    try {
        await load(page, `s=dlg-field&dismiss=${dismiss}`);
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.mouse.click(tr[0], tr[1]);
        await sleep(900);
        const f = await centre(page, '[data-testid="field"]');
        await page.mouse.click(f[0], f[1]);
        await sleep(300);
        res.steps.push({ step: "field clicked", ...(await page.evaluate(focusFn)) });
        await page.mouse.click(30, 120);
        await sleep(1000);
        res.steps.push({ step: "after one click on the scrim at (30, 120)", ...(await page.evaluate(focusFn)) });
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 600);
    } finally {
        await ctx.close();
    }
    return res;
}

// A document listener that cancels every touchmove: the browser starts no pan.
function cancelEveryMove() {
    document.addEventListener("touchmove", (e) => e.cancelable && e.preventDefault(), {
        passive: false,
        capture: true,
    });
}

function selectFn() {
    return {
        listbox: document.querySelector('[data-slot="select-content"]')?.getAttribute("data-state") ?? "gone",
        value: (document.querySelector('[data-testid="trigger2"]') ?? document.querySelector('[data-testid="trigger"]'))?.textContent?.trim() ?? null,
        scrollY: Math.round(window.scrollY),
    };
}

async function nopanCell(browser, kind, cancel) {
    const { ctx, page } = await phone(browser);
    const res = { part: "nopan", cell: kind, cancel, engine, steps: [] };
    try {
        const cdp = await ctx.newCDPSession(page);
        if (kind === "option") {
            await load(page, "s=select&n=4");
            const tr = await centre(page, '[data-testid="trigger"]');
            await page.touchscreen.tap(tr[0], tr[1]);
            await sleep(1000);
            if (cancel) await page.evaluate(cancelEveryMove);
            res.steps.push({ step: "select open", ...(await page.evaluate(selectFn)) });
            const o = await page.evaluate(() => {
                const r = document.querySelectorAll('[role="option"]')[1].getBoundingClientRect();
                return [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)];
            });
            res.from = o;
            await cdpSwipe(cdp, o, 0, -150);
            await sleep(900);
            res.steps.push({ step: "swipe up 150 from option 2", ...(await page.evaluate(selectFn)) });
        } else {
            await load(page, "s=pdrawer&sel=1&n=3");
            const tr = await centre(page, '[data-testid="trigger"]');
            await page.touchscreen.tap(tr[0], tr[1]);
            await sleep(1200);
            if (cancel) await page.evaluate(cancelEveryMove);
            res.steps.push({ step: "drawer open", ...(await page.evaluate(selectFn)) });
            const t2 = await centre(page, '[data-testid="trigger2"]');
            res.from = t2;
            await cdpSwipe(cdp, t2, 0, 150);
            await sleep(900);
            res.steps.push({ step: "swipe down 150 from the Select's trigger", ...(await page.evaluate(selectFn)) });
        }
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 600);
    } finally {
        await ctx.close();
    }
    return res;
}

const browser = await (engine === "webkit" ? webkit : chromium).launch({ headless: true });
results.push({ meta: { engine, browser: browser.version(), port, date: new Date().toISOString() } });
try {
    if (parts.has("nested"))
        for (const s of ["dlg-menu", "dlg-pop", "fsheet-menu", "pop-menu", "pop-pop"])
            results.push(await nestedCell(browser, s));
    if (parts.has("dsel")) for (const s of ["dlg-sel", "ndlg-sel"]) results.push(await dselCell(browser, s));
    if (parts.has("chips") && engine === "chromium")
        for (const [s, dy, top] of [
            ["det-chips", 0, false],
            ["det-chips", 8, false],
            ["det-chips", -8, false],
            ["det-chips", 8, true],
            ["det-chips", -8, true],
            ["pdrawer-chips", 8, false],
            ["pdrawer-chips", -8, false],
        ])
            results.push(await chipsCell(browser, s, dy, top));
    if (parts.has("mouse") && engine === "chromium")
        for (const w of [390, 1280]) results.push(await mouseCell(browser, w));
    if (parts.has("scrim"))
        for (const d of ["locked", "free"]) {
            results.push(await scrimTouchCell(browser, d));
            for (const w of [390, 1280]) results.push(await scrimMouseCell(browser, d, w));
        }
    if (parts.has("nopan") && engine === "chromium")
        for (const kind of ["option", "trigger"])
            for (const cancel of [false, true]) results.push(await nopanCell(browser, kind, cancel));
} finally {
    await browser.close();
    writeFileSync(out, JSON.stringify(results, null, 1));
}
for (const r of results.slice(1)) {
    console.log(`${engine} ${r.part} ${r.cell}${r.dy !== undefined ? " dy=" + r.dy + (r.topRung ? " top" : "") : ""}${r.dismiss ? " " + r.dismiss + " " + r.input : ""}${r.cancel !== undefined ? " cancel=" + r.cancel : ""}${r.width ? " w=" + r.width : ""}${r.error ? " ERROR " + r.error.slice(0, 200) : ""}`);
    if (r.paint) console.log("    paint", JSON.stringify(r.paint));
    for (const st of r.steps) console.log("   ", JSON.stringify(st));
}
