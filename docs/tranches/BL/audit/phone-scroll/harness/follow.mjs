// follow.mjs — does a detented sheet's list follow a finger, and does the sheet still drag
// from the list's top? Chromium only: Playwright WebKit has no touch-move input.
//
//   node follow.mjs <port> <out.json> [part,...]     parts: follow, try (default both)
//
// Playwright Chromium (headless shell), 390x844, isMobile, hasTouch, iPhone UA; swipes are
// CDP Input.dispatchTouchEvent sequences (14 moves, 16 ms apart). One browser per run, a
// new context per cell, closed in finally.
//
// follow: two sheets with 40 rows in their body.
//   pdrawer  atlas's phone drawer (non-modal, detents 0.9 and 1, opens at 0.9).
//   detents  a modal sheet with detents 0.4, 0.7 and 1, opened at 0.7.
// Steps, each read 900 ms after the lift: up1 (finger up 220 px on the list at its top:
// the sheet is below its top rung, so the sheet should rise), then the list is set to its
// top by script and up-top (finger up on the list at its top with the sheet at its top
// rung: the list should scroll), down-scrolled (finger down on the scrolled list: the list
// scrolls back), then the list is set to its top again and down-top (finger down on the
// list at its top: the sheet should follow down). Each step records the sheet's rung
// scalar (`--detent-t`), the list's scrollTop, the page's scrollY and whether it is open.
//
// try: what shape two's plate-scoped hold would do, on the phone drawer with a Select at
// the top of a body that fits (`s=pdrawer&sel=1&n=3`). The hold is a script one (CSS has
// no hold for a fitting box in WebKit, webkit.org/b/243452): a touchmove listener on the
// plate that cancels any move no scroller between the finger and the plate can take. A
// finger set on the Select's trigger moves down 150 px; the cell reads whether the Select
// opened. Run once without the listener (control) and once with it.
import { chromium, devices } from "playwright";
import { writeFileSync } from "node:fs";

const [port, out, partsArg] = process.argv.slice(2);
const parts = new Set((partsArg ?? "follow,try").split(","));
const UA = devices["iPhone 13"].userAgent;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function swipe(cdp, [x, y], dy) {
    const steps = 14;
    const y1 = Math.max(8, Math.min(836, y + dy));
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    for (let i = 1; i <= steps; i++) {
        await sleep(16);
        await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x, y: y + ((y1 - y) * i) / steps }],
        });
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    return y1 - y;
}

function readFn(listSel) {
    const sheet = document.querySelector('[data-slot="sheet-content"]');
    const list = document.querySelector(listSel);
    const r = list?.getBoundingClientRect();
    return {
        scrollY: Math.round(window.scrollY),
        open: !!sheet && sheet.getAttribute("data-state") === "open",
        t: sheet ? Number(sheet.style.getPropertyValue("--detent-t") || "NaN") : null,
        sheetTop: sheet ? Math.round(sheet.getBoundingClientRect().top) : null,
        listTop: list ? Math.round(list.scrollTop) : null,
        listOverflows: list ? list.scrollHeight > list.clientHeight + 1 : null,
        listBox: r ? [Math.round(r.top), Math.round(r.bottom)] : null,
        root: getComputedStyle(document.documentElement).overflowY,
    };
}

async function newPage(browser) {
    const ctx = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent: UA,
    });
    const page = await ctx.newPage();
    return { ctx, page };
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

async function centre(page, q, pick = 0.5) {
    return page.evaluate(
        ([q, pick]) => {
            const el = document.querySelector(q);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const top = Math.max(r.top, 0);
            const bottom = Math.min(r.bottom, innerHeight);
            return [Math.round(r.left + r.width / 2), Math.round(top + (bottom - top) * pick)];
        },
        [q, pick],
    );
}

async function followCell(browser, s, listSel) {
    const { ctx, page } = await newPage(browser);
    const res = { cell: s, steps: [] };
    try {
        await load(page, `s=${s}&n=40`);
        const cdp = await ctx.newCDPSession(page);
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.touchscreen.tap(tr[0], tr[1]);
        await sleep(1200);
        const read = () => page.evaluate(readFn, listSel);
        res.steps.push({ step: "open", ...(await read()) });
        const toTop = async () => {
            await page.evaluate((q) => (document.querySelector(q).scrollTop = 0), listSel);
            await sleep(300);
            res.steps.push({ step: "list set to its top by script", ...(await read()) });
        };
        for (const [step, pick, dy] of [
            ["up1", 0.8, -220],
            ["top"],
            ["up-top", 0.8, -220],
            ["down-scrolled", 0.2, 220],
            ["top"],
            ["down-top", 0.2, 220],
        ]) {
            if (step === "top") {
                await toTop();
                continue;
            }
            const p = await centre(page, listSel, pick);
            const travel = await swipe(cdp, p, dy);
            await sleep(900);
            res.steps.push({ step, from: p, travel, ...(await read()) });
        }
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 500);
    } finally {
        await ctx.close();
    }
    return res;
}

async function tryCell(browser, withHold) {
    const { ctx, page } = await newPage(browser);
    const res = { cell: "try", hold: withHold };
    try {
        await load(page, "s=pdrawer&sel=1&n=3");
        const cdp = await ctx.newCDPSession(page);
        const tr = await centre(page, '[data-testid="trigger"]');
        await page.touchscreen.tap(tr[0], tr[1]);
        await sleep(1200);
        if (withHold)
            await page.evaluate(() => {
                const plate = document.querySelector('[data-slot="sheet-content"]');
                let start = null;
                plate.addEventListener("touchstart", (e) => (start = e.touches[0]), { passive: true });
                plate.addEventListener(
                    "touchmove",
                    (e) => {
                        if (!e.cancelable || !start) return;
                        const t = e.touches[0];
                        const dx = t.clientX - start.clientX;
                        const dy = t.clientY - start.clientY;
                        for (let n = e.target; n && n !== plate.parentElement; n = n.parentElement) {
                            const c = getComputedStyle(n);
                            if (Math.abs(dy) >= Math.abs(dx) && /auto|scroll/.test(c.overflowY)) {
                                if (dy > 0 && n.scrollTop > 0) return;
                                if (dy < 0 && n.scrollTop + n.clientHeight < n.scrollHeight - 1) return;
                            }
                        }
                        e.preventDefault();
                    },
                    { passive: false },
                );
            });
        const p = await centre(page, '[data-testid="trigger2"]');
        res.from = p;
        res.before = await page.evaluate(() => ({
            scrollY: Math.round(scrollY),
            listbox: document.querySelector('[data-slot="select-content"]')?.getAttribute("data-state") ?? "none",
        }));
        res.travel = await swipe(cdp, p, 150);
        await sleep(800);
        res.after = await page.evaluate(() => ({
            scrollY: Math.round(scrollY),
            listbox: document.querySelector('[data-slot="select-content"]')?.getAttribute("data-state") ?? "none",
        }));
    } catch (e) {
        res.error = String(e?.stack ?? e).slice(0, 500);
    } finally {
        await ctx.close();
    }
    return res;
}

const browser = await chromium.launch({ headless: true });
const results = [{ meta: { browser: browser.version(), port, date: new Date().toISOString() } }];
try {
    if (parts.has("follow")) {
        for (const [s, list] of [
            ["pdrawer", ".ps-pdrawer-body"],
            ["detents", '[data-slot="sheet-content-region"] > .ps-rows'],
        ]) {
            const r = await followCell(browser, s, list);
            results.push(r);
            for (const st of r.steps ?? [])
                console.log(`${s} ${st.step}: t=${st.t} list=${st.listTop} page=${st.scrollY} open=${st.open}`);
            if (r.error) console.log(`${s} ERROR ${r.error.slice(0, 200)}`);
        }
    }
    if (parts.has("try")) {
        for (const hold of [false, true]) {
            const r = await tryCell(browser, hold);
            results.push(r);
            console.log(`try hold=${hold}: listbox ${r.before?.listbox} -> ${r.after?.listbox}, page ${r.before?.scrollY} -> ${r.after?.scrollY}${r.error ? " ERROR " + r.error.slice(0, 200) : ""}`);
        }
    }
} finally {
    await browser.close();
    writeFileSync(out, JSON.stringify(results, null, 1));
}
