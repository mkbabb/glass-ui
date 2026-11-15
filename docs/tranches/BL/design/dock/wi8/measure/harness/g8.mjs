// g8.mjs <port> [--engine chromium|webkit]: W-I.8 G-8 cells the probe pass does not cover
// (PROTOTYPE-3): a menu, a hover popover, a dialog and a sheet opened from run seats of a
// hover-opened dock (cell w-g8), and a dialog and a sheet from a press-opened dock
// (&press=1). Per overlay: the linger holds while it is open; the first Escape closes it,
// leaves the dock and puts focus on its trigger; the second folds the dock and puts focus
// on the folded face; a press outside folds the dock at once (time from the press to the
// class change, read in the page). Dialog and sheet: focus moving into them folds nothing,
// and on close focus is on the seat that opened them, which is not inert.
// One browser, a new context per cell, everything closed in finally.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const port = a[0];
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const quick = a.includes("--quick");
const out = {};
let browser;
const D = "[data-testid=w-g8]";
async function cell(url, fn) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-g8${url}`);
        await page.waitForTimeout(700);
        return await fn(page);
    } catch (e) {
        return { error: String(e).slice(0, 300) };
    } finally {
        await ctx.close();
    }
}
const state = (page) =>
    page.evaluate((D) => {
        const d = document.querySelector(D);
        const ae = document.activeElement;
        return {
            open: d.classList.contains("expanded"),
            focus: ae?.getAttribute("data-testid") || ae?.getAttribute("aria-label") || ae?.className?.toString().slice(0, 40) || ae?.tagName,
            focusInert: !!ae?.closest("[inert]"),
            focusSummary: !!ae?.classList?.contains("dock-layer--summary"),
        };
    }, D);
const visible = (page, sel) => page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && getComputedStyle(e).visibility !== "hidden" && +getComputedStyle(e).opacity > 0.05; }, sel);
async function openDock(page, press) {
    if (press) {
        await page.locator(`${D} .dock-layer--summary`).click();
    } else {
        const b = await page.locator(D).boundingBox();
        await page.mouse.move(b.x - 30, b.y + b.height / 2);
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
        await page.mouse.move(b.x + b.width / 2 + 2, b.y + b.height / 2);
    }
    await page.waitForTimeout(700);
}
async function openOverlay(page, kind) {
    const trig = `[data-testid=w-g8-${kind}]`;
    if (kind === "hover") {
        await page.locator(trig).hover();
        await page.waitForTimeout(900);
    } else {
        await page.locator(trig).click();
        await page.waitForTimeout(600);
    }
}
const content = { menu: "[data-testid=w-g8-menu-content]", hover: "[data-testid=w-g8-hover-pop]", dialog: "[data-testid=w-g8-dialog-content]", sheet: "[data-testid=w-g8-sheet-content]" };
async function pressOutsideTimed(page) {
    // Arm a recorder of the dock's class change, then press outside; read the delay in-page.
    await page.evaluate((D) => {
        const d = document.querySelector(D);
        window.__g8 = { t0: null, fold: null };
        new MutationObserver(() => { if (window.__g8.fold === null && d.classList.contains("collapsed")) window.__g8.fold = performance.now(); }).observe(d, { attributes: true, attributeFilter: ["class"] });
        document.addEventListener("pointerdown", () => { window.__g8.t0 ??= performance.now(); }, { capture: true, once: true });
    }, D);
    await page.mouse.click(1430, 890);
    await page.waitForTimeout(700);
    return page.evaluate(() => (window.__g8.fold != null && window.__g8.t0 != null ? +(window.__g8.fold - window.__g8.t0).toFixed(1) : null));
}
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const kind of ["menu", "hover", "dialog", "sheet"]) {
        // Escape twice, and the linger (hover-opened dock).
        out[`${kind}-esc`] = await cell("", async (page) => {
            await openDock(page, false);
            await openOverlay(page, kind);
            const opened = await visible(page, content[kind]);
            let linger = null;
            if (!quick && kind !== "hover") {
                await page.mouse.move(8, 880);
                await page.waitForTimeout(7200);
                linger = { stillOpen: (await state(page)).open, overlayStillOpen: await visible(page, content[kind]) };
            }
            await page.keyboard.press("Escape");
            await page.waitForTimeout(500);
            const e1 = { ...(await state(page)), overlay: await visible(page, content[kind]) };
            await page.keyboard.press("Escape");
            await page.waitForTimeout(700);
            const e2 = await state(page);
            return { opened, linger, esc1: e1, esc2: e2 };
        });
        out[`${kind}-outside`] = await cell("", async (page) => {
            await openDock(page, false);
            await openOverlay(page, kind);
            const opened = await visible(page, content[kind]);
            const foldMs = await pressOutsideTimed(page);
            return { opened, foldMs, after: { ...(await state(page)), overlay: await visible(page, content[kind]) } };
        });
    }
    for (const kind of ["dialog", "sheet"]) {
        out[`${kind}-press`] = await cell("&press=1", async (page) => {
            await openDock(page, true);
            const openedDock = (await state(page)).open;
            await page.locator(`[data-testid=w-g8-${kind}]`).click();
            await page.waitForTimeout(700);
            const inside = { ...(await state(page)), overlay: await visible(page, content[kind]) };
            await page.locator(`[data-testid=w-g8-${kind}-close]`).click();
            await page.waitForTimeout(800);
            const closed = { ...(await state(page)), overlay: await visible(page, content[kind]) };
            return { openedDock, whileOpen: inside, afterClose: closed };
        });
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../logs/g8-p3.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify(out));
}
