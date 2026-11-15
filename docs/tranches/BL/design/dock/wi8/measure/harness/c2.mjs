// c2.mjs <port> <tag> [--engine chromium|webkit] [--only a,b]: FOLD-2, the cells the second
// challenge names that the probe pass does not carry. One browser, a new context per cell,
// everything closed in finally. Writes ../logs/c2.<tag>.<engine>.json.
//   rtl      C2-8  the site dock (Home in #persistent) in a right-to-left page: the run's
//                  lane through an unfold and a fold
//   sci      C2-1  the worded folded face: the words' box against the face's
//   ctl1     C2-2  the one-seat controls dock's two extents; an end seat's three gaps
//   count    C2-11 one control that is the consumer's own element; a button and a slider
//   hold     C2-10 a menu, a select, a plain popover: held through the linger, Escape twice
//   dismiss  C2-13 Escape with the pointer inside, then a move mid-fold and after it
//   two      C2-14 a brush on one of two controls docks: when it folds
//   resize   C2-17 a window resize 100 ms into a fold
//   park     C2-18 the plate within 0.5 px of rest against the window closing
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const engine = val("--engine", "chromium");
const only = val("--only", "").split(",").filter(Boolean);
const out = {};
let browser;
const T = (id) => `[data-testid=${id}]`;

// In the page: one requestAnimationFrame recorder over a dock.
const REC = `(() => {
  const R = (window.__rec = { rows: [], on: false, t0: 0 });
  const box = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [+b.x.toFixed(2), +b.y.toFixed(2), +b.width.toFixed(2), +b.height.toFixed(2)]; };
  const inset = (e) => { const m = /inset\\(([^)]*)\\)/.exec(e?.style.clipPath || ""); if (!m) return null; const p = m[1].split(" round ")[0].trim().split(/\\s+/).map(parseFloat); const [t, r = t, b = t, l = r] = p; return [t, r, b, l]; };
  window.__recStart = (sel) => {
    const d = document.querySelector(sel);
    R.rows = []; R.on = true; R.t0 = performance.now();
    const tick = () => {
      if (!R.on) return;
      const layers = d.querySelector(".dock-layers");
      R.rows.push({ t: +(performance.now() - R.t0).toFixed(1), m: d.hasAttribute("data-morphing"), open: d.classList.contains("expanded"),
        plate: box(d.querySelector(":scope > .dock-plate")), layers: box(layers), clip: inset(layers),
        pers: box(d.querySelector(":scope > .dock-controls > .dock-persistent:not(.dock-persistent-end)")) });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  window.__recMark = (name) => R.rows.push({ t: +(performance.now() - R.t0).toFixed(1), mark: name });
  window.__recStop = () => { R.on = false; return R.rows; };
})()`;

async function cell(name, q, vp, fn) {
    if (only.length && !only.includes(name.split(".")[0])) return;
    const coarse = vp.coarse;
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1, ...(coarse ? { hasTouch: true, ...(engine === "chromium" ? { isMobile: true } : {}) } : {}) });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${q}`);
        await page.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 });
        await page.waitForTimeout(600);
        await page.evaluate(REC);
        out[name] = await fn(page);
    } catch (e) {
        out[name] = { error: String(e).slice(0, 400) };
    } finally {
        await ctx.close();
    }
    console.log(name, JSON.stringify(out[name]).slice(0, 900));
}
const FINE = { w: 1440, h: 900 };
const PHONE = { w: 390, h: 844, coarse: true };
const open = (page, sel) => page.evaluate((s) => document.querySelector(s).classList.contains("expanded"), sel);
async function hoverOpen(page, sel) {
    const b = await page.locator(`${sel} > .dock-plate`).boundingBox();
    await page.mouse.move(b.x - 40, b.y + b.height / 2);
    await page.mouse.move(b.x + b.width / 2 - 3, b.y + b.height / 2, { steps: 4 });
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 2 });
    await page.waitForTimeout(900);
    return b;
}
const esc = (page, sel) => page.evaluate((s) => document.querySelector(`${s} .dock-run`).dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })), sel);

try {
    browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [], ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });

    // C2-8: right to left. The direction is set after mount so the same cell runs on a build
    // whose page has no &dir parameter.
    await cell("rtl", "w-seat", FINE, async (page) => {
        const D = T("w-seat");
        await page.evaluate(() => { document.documentElement.dir = "rtl"; });
        await page.waitForTimeout(600);
        const lane = (rows) => {
            const mv = rows.filter((r) => !r.mark && r.m && r.layers && r.clip);
            const vis = mv.map((r) => r.layers[2] - r.clip[1] - r.clip[3]);
            return { rows: mv.length, emptyRows: vis.filter((v) => v <= 0.5).length, minVisible: mv.length ? +Math.min(...vis).toFixed(1) : null, maxVisible: mv.length ? +Math.max(...vis).toFixed(1) : null };
        };
        await page.evaluate((s) => window.__recStart(s), D);
        await hoverOpen(page, D);
        const unfold = lane(await page.evaluate(() => window.__recStop()));
        const rest = await page.evaluate((s) => { const d = document.querySelector(s); const b = (e) => { const r = e?.getBoundingClientRect(); return r ? [Math.round(r.x), Math.round(r.width)] : null; }; return { dir: getComputedStyle(d).direction, open: d.classList.contains("expanded"), plate: b(d.querySelector(":scope > .dock-plate")), persistent: b(d.querySelector(".dock-persistent")), layers: b(d.querySelector(".dock-layers")) }; }, D);
        await page.evaluate((s) => window.__recStart(s), D);
        await page.mouse.click(5, 5);
        await page.waitForTimeout(900);
        const fold = lane(await page.evaluate(() => window.__recStop()));
        return { rest, unfold, fold };
    });

    // C2-1: the worded folded face.
    for (const [n, vp] of [["sci.fine", FINE], ["sci.coarse", PHONE]]) {
        await cell(n, "w-sci", vp, (page) => page.evaluate(() => {
            const d = document.querySelector("[data-testid=w-sci]");
            const r = (e) => { const b = e.getBoundingClientRect(); return [+b.x.toFixed(1), +b.y.toFixed(1), +b.width.toFixed(1), +b.height.toFixed(1)]; };
            const plate = d.querySelector(":scope > .dock-plate"), sum = d.querySelector(".dock-layer--summary"), span = sum.querySelector("span");
            const p = r(plate), s = r(sum), w = r(span);
            return { open: d.classList.contains("expanded"), plate: p, summary: s, words: w, wordsOverflowPx: +Math.max(0, w[2] - s[2]).toFixed(1), wordsInsidePlate: w[0] >= p[0] && w[0] + w[2] <= p[0] + p[2], capClearPx: +(w[0] - p[0]).toFixed(1), radius: getComputedStyle(plate).borderTopLeftRadius };
        }));
    }

    // C2-2: the one-seat controls dock is a circle; an end seat is concentric with the cap.
    for (const [n, vp] of [["ctl1.fine", FINE], ["ctl1.coarse", PHONE]]) {
        await cell(n, "w-ctl1", vp, (page) => page.evaluate(() => {
            const d = document.querySelector("[data-testid=w-ctl1]");
            const r = (e) => { const b = e.getBoundingClientRect(); return [+b.width.toFixed(2), +b.height.toFixed(2)]; };
            return { open: d.classList.contains("expanded"), plate: r(d.querySelector(":scope > .dock-plate")), seat: r(d.querySelector("[data-glass-dock-seat]")) };
        }));
    }
    await cell("ctlgaps.fine", "w-ctl&corner=bottom-end&within=viewport", FINE, async (page) => {
        await hoverOpen(page, T("w-ctl"));
        return page.evaluate(() => {
            const d = document.querySelector("[data-testid=w-ctl]");
            const p = d.querySelector(":scope > .dock-plate").getBoundingClientRect();
            const seats = [...d.querySelectorAll("[data-glass-dock-seat]")].map((e) => e.getBoundingClientRect()).filter((b) => b.width > 0);
            const last = seats[seats.length - 1], first = seats[0];
            return { open: d.classList.contains("expanded"), plate: [+p.width.toFixed(1), +p.height.toFixed(1)], seat: [+last.width.toFixed(1), +last.height.toFixed(1)], gapEnd: +(p.right - last.right).toFixed(1), gapStart: +(first.left - p.left).toFixed(1), gapTop: +(last.top - p.top).toFixed(1), gapBottom: +(p.bottom - last.bottom).toFixed(1) };
        });
    });

    // C2-11: what the one-control rule counts.
    for (const c of ["w-ctl-own", "w-ctl-mix", "w-ctl1"]) {
        await cell(`count.${c}`, c, PHONE, (page) => page.evaluate((c) => {
            const d = document.querySelector(`[data-testid=${c}]`);
            if (!d) return { absent: true };
            return { open: d.classList.contains("expanded"), alwaysOpen: d.classList.contains("always-expanded"), children: d.querySelector(".dock-run")?.children.length };
        }, c));
    }

    // C2-10: a menu, a select and a plain popover hold the dock through the linger.
    for (const kind of ["menu", "select", "pop"]) {
        await cell(`hold.${kind}`, "w-g8", FINE, async (page) => {
            const D = T("w-g8");
            await page.evaluate((s) => { const d = document.querySelector(s); d.style.setProperty("--dock-linger", "1s"); d.style.setProperty("--dock-linger-max", "1s"); }, D);
            await hoverOpen(page, D);
            const res = { openedByHover: await open(page, D) };
            await page.locator(T(`w-g8-${kind}`)).click();
            await page.waitForTimeout(500);
            const content = T(`w-g8-${kind}-content`);
            const shown = () => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const b = e.getBoundingClientRect(); return b.width > 0 && +getComputedStyle(e).opacity > 0.05; }, content);
            res.overlayOpen = await shown();
            await page.mouse.move(20, 880, { steps: 6 });
            await page.waitForTimeout(2600);
            res.dockOpenAfterLinger = await open(page, D);
            res.overlayOpenAfterLinger = await shown();
            await page.keyboard.press("Escape");
            await page.waitForTimeout(500);
            res.esc1 = { dockOpen: await open(page, D), overlayOpen: await shown(), focus: await page.evaluate(() => document.activeElement?.getAttribute("data-testid") || document.activeElement?.tagName) };
            await page.keyboard.press("Escape");
            await page.waitForTimeout(700);
            res.esc2 = { dockOpen: await open(page, D), focusOnFoldedFace: await page.evaluate(() => !!document.activeElement?.classList?.contains("dock-layer--summary")) };
            return res;
        });
    }

    // C2-13: a dismissal with the pointer inside.
    await cell("dismiss", "w-pill", FINE, async (page) => {
        const D = T("w-pill");
        const b = await hoverOpen(page, D);
        const x = b.x + b.width / 2, y = b.y + b.height / 2;
        const res = { openedByHover: await open(page, D) };
        await esc(page, D);
        await page.waitForTimeout(60);
        await page.mouse.move(x + 3, y);
        await page.waitForTimeout(700);
        res.afterMoveMidFold = await open(page, D);
        const over = await page.evaluate(([s, x, y]) => !!document.elementFromPoint(x, y)?.closest(s), [D, x + 3, y]);
        res.pointerOverFoldedPlate = over;
        await page.mouse.move(x + 6, y);
        await page.waitForTimeout(500);
        res.afterMoveAtRest = await open(page, D);
        await page.mouse.move(8, 8, { steps: 4 });
        await page.waitForTimeout(200);
        await page.mouse.move(x - 4, y, { steps: 4 });
        await page.mouse.move(x, y, { steps: 2 });
        await page.waitForTimeout(500);
        res.afterLeaveAndReturn = await open(page, D);
        return res;
    });

    // C2-14: two controls docks; a brush on one.
    await cell("two", "w-two&closed=1", FINE, async (page) => {
        const A = T("w-two-a");
        const has = await page.evaluate((s) => !!document.querySelector(s), A);
        if (!has) return { absent: true };
        const startOpen = await open(page, A);
        const b = await page.locator(`${A} > .dock-plate`).boundingBox();
        await page.mouse.move(b.x - 60, b.y + b.height / 2);
        await page.mouse.move(b.x + b.width / 2 - 3, b.y + b.height / 2, { steps: 3 });
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 2 });
        await page.waitForTimeout(260);
        const opened = await open(page, A);
        const t0 = Date.now();
        await page.mouse.move(700, 450, { steps: 4 });
        let foldedAt = null;
        while (Date.now() - t0 < 8000) {
            if (!(await open(page, A))) { foldedAt = Date.now() - t0; break; }
            await page.waitForTimeout(40);
        }
        return { startOpen, opened, foldMsAfterLeave: foldedAt, linger: await page.evaluate((s) => getComputedStyle(document.querySelector(s)).getPropertyValue("--dock-linger").trim(), A) };
    });

    // C2-17: a window resize 100 ms into a fold.
    await cell("resize", "w-pill", FINE, async (page) => {
        const D = T("w-pill");
        await hoverOpen(page, D);
        const openW = (await page.locator(`${D} > .dock-plate`).boundingBox()).width;
        await page.evaluate((s) => window.__recStart(s), D);
        await page.mouse.click(5, 5);
        await page.waitForTimeout(100);
        await page.evaluate(() => window.__recMark("resize"));
        await page.setViewportSize({ width: 1200, height: 900 });
        await page.waitForTimeout(900);
        const rows = await page.evaluate(() => window.__recStop());
        const i = rows.findIndex((r) => r.mark === "resize");
        const before = rows.slice(0, i).filter((r) => r.plate).pop();
        const after = rows.slice(i + 1).filter((r) => r.plate);
        const final = after[after.length - 1].plate[2];
        let prev = before.plate[2], maxStep = 0, maxAt = null;
        const widths = [];
        for (const r of after.slice(0, 12)) { const st = Math.abs(r.plate[2] - prev); if (st > maxStep) { maxStep = st; maxAt = r.t; } prev = r.plate[2]; widths.push([r.t, r.plate[2]]); }
        return { openW: +openW.toFixed(1), atResize: before.plate[2], final, remaining: +(before.plate[2] - final).toFixed(1), maxStepAfterResizePx: +maxStep.toFixed(1), maxStepShareOfRemaining: +(maxStep / Math.max(1, before.plate[2] - final)).toFixed(2), maxAt, tResize: rows[i].t, widths };
    });

    // C2-18: the window against the landing.
    await cell("park", "w-pill", FINE, async (page) => {
        const D = T("w-pill");
        const res = {};
        for (const leg of ["unfold", "fold"]) {
            if (leg === "fold") { await page.evaluate((s) => window.__recStart(s), D); await page.mouse.click(5, 5); await page.waitForTimeout(1000); }
            else { await page.mouse.move(8, 8); await page.evaluate((s) => window.__recStart(s), D); await hoverOpen(page, D); }
            const rows = (await page.evaluate(() => window.__recStop())).filter((r) => r.plate);
            const final = rows[rows.length - 1].plate;
            const firstM = rows.find((r) => r.m);
            const lastM = [...rows].reverse().find((r) => r.m);
            const landed = rows.find((r) => r.t >= (firstM?.t ?? 0) && Math.abs(r.plate[2] - final[2]) <= 0.5 && Math.abs(r.plate[3] - final[3]) <= 0.5);
            res[leg] = { windowOpens: firstM?.t, within05px: landed?.t, windowCloses: lastM?.t, tailMs: lastM && landed ? +(lastM.t - landed.t).toFixed(0) : null };
        }
        return res;
    });
} finally {
    if (browser) await browser.close().catch(() => {});
}
writeFileSync(new URL(`../logs/c2.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
