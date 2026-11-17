// m8/g13.mjs: MEASURE-8 H12 (RU-86, C7-1): g13.mjs with the glyph read in three forms (svg, img, picture), the
// `[data-dock-glyph]` form gone. Otherwise g13.mjs as MEASURE-7 ran it.
// g13.mjs <port> [--engine chromium|webkit]: W-I.8 G-13 (census, focus, hit, forced colours).
// One browser, a new context per cell, everything closed in finally.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const port = a[0];
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const out = {};
let browser;
const VP = { 360: { width: 360, height: 780 }, 390: { width: 390, height: 844 }, 1440: { width: 1440, height: 900 } };
async function cell(w, coarse, url, fn, extra = {}) {
    const ctx = await browser.newContext({ viewport: VP[w], deviceScaleFactor: 1, ...(coarse ? { hasTouch: true, ...(engine === "chromium" ? { isMobile: true } : {}) } : {}), ...extra });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&${url}`);
        await page.waitForTimeout(700);
        return await fn(page);
    } finally {
        await ctx.close();
    }
}
const openByHover = async (page, sel) => {
    const b = await page.locator(sel).first().boundingBox();
    await page.mouse.move(b.x - 20, b.y + b.height / 2);
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
    await page.mouse.move(b.x + b.width / 2 + 2, b.y + b.height / 2);
};
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    // 1. ariaSnapshot and the persistent seat's census: collapsed, mid-travel, open, back.
    for (const w of [360, 390, 1440]) {
        out[`census-${w}`] = await cell(w, w !== 1440, "cell=w-seat", async (page) => {
            const L = page.locator("[data-testid=w-seat]");
            const snap = async () => ({ aria: await L.ariaSnapshot(), home: await page.locator("[data-testid=w-seat-home]").evaluate((e) => [e.getAttribute("aria-label"), e.hasAttribute("inert") || !!e.closest("[inert]"), e.tabIndex].join("|")) });
            const s0 = await snap();
            if (w === 1440) await openByHover(page, "[data-testid=w-seat]"); else await page.locator("[data-testid=w-seat] .dock-layer--summary").tap();
            await page.waitForTimeout(w === 1440 ? 100 : 40);
            const sMid = await snap();
            await page.waitForTimeout(700);
            const s1 = await snap();
            await page.mouse.click(4, 4);
            await page.waitForTimeout(800);
            const s2 = await snap();
            return { collapsedEqualsBack: s0.aria === s2.aria && s0.home === s2.home, homeCensusSame: new Set([s0.home, sMid.home, s1.home, s2.home]).size === 1, midEqualsOpen: sMid.aria === s1.aria, collapsedAria: s0.aria.split("\n").length, openAria: s1.aria.split("\n").length };
        });
    }
    // 2. A coarse pointer: every seat's hit box is 44 by 44 or more (site dock and controls dock).
    for (const [id, url] of [["w-seat", "cell=w-seat"], ["w-ctl", "cell=w-ctl&corner=bottom-end"]]) {
        out[`hit-${id}-390`] = await cell(390, true, url, async (page) => {
            await page.locator(`[data-testid=${id}] .dock-layer--summary`).tap();
            await page.waitForTimeout(800);
            const boxes = await page.$$eval(`[data-testid=${id}] [data-glass-dock-seat]`, (els) => els.map((e) => { const r = e.getBoundingClientRect(); const g = e.querySelector(":scope > svg, :scope > img, :scope > picture")?.getBoundingClientRect(); return [e.getAttribute("aria-label"), +r.width.toFixed(1), +r.height.toFixed(1), g ? +g.width.toFixed(1) : null]; }));
            // RU-45 (MEASURE-6): each seat's glyph width is recorded beside its box (the share at 390 coarse).
            return { seats: boxes.length, under44: boxes.filter((b) => b[1] < 44 || b[2] < 44), glyphs: boxes.map((b) => `${b[0]} ${b[1]}x${b[2]} glyph ${b[3]}`) };
        });
    }
    // 3. The layer group's roving (PROTOTYPE-3: w-lseats, whose faces hold seats): one stop in
    //    the active face; Arrow, Home and End move inside it with no wrap; a swap re-derives it.
    out["roving-layers-1440"] = await cell(1440, false, "cell=w-lseats", async (page) => {
        await openByHover(page, "[data-testid=w-lseats]");
        await page.waitForTimeout(800);
        const row = "[data-testid=w-lseats] .dock-face.is-active > .dock-face-content";
        const read = () => page.evaluate((row) => { const r = document.querySelector(row); const s = [...r.querySelectorAll(":scope > [data-glass-dock-seat]")]; return { role: r.getAttribute("role"), seats: s.length, stops: s.filter((e) => e.tabIndex === 0).length, focusIdx: s.indexOf(document.activeElement) }; }, row);
        const r0 = await read();
        await page.locator(`${row} > [data-glass-dock-seat][tabindex="0"]`).first().focus();
        const keys = {};
        for (const k of ["ArrowRight", "End", "ArrowRight", "Home", "ArrowLeft"]) { await page.keyboard.press(k); keys[`${Object.keys(keys).length}:${k}`] = (await read()).focusIdx; }
        await page.locator("[data-testid=w-lseats] [role=tab]:not([aria-selected=true])").first().click();
        await page.waitForTimeout(700);
        const r1 = await read();
        return { before: r0, keys, afterSwap: r1 };
    });
    // 3b. At rest the face that is not showing has no box (RU-17): collapsed, every seat of the
    //     open face returns no client rectangle; open, the folded face returns none; at both the
    //     dock adds nothing to the document's scrollable overflow.
    for (const [w, id] of [[390, "w-seat"], [1440, "w-seat"], [390, "w-ctl"]]) {
        out[`facebox-${id}-${w}`] = await cell(w, w !== 1440, `cell=${id}${id === "w-ctl" ? "&corner=bottom-end" : ""}`, async (page) => {
            const read = () => page.evaluate((id) => {
                const d = document.querySelector(`[data-testid=${id}]`);
                const seats = [...d.querySelectorAll(".dock-layer--full [data-glass-dock-seat]")];
                const summary = d.querySelector(".dock-layer--summary");
                return { open: d.classList.contains("expanded"), seatsWithRects: seats.filter((e) => e.getClientRects().length > 0).length, seats: seats.length, summaryRects: summary.getClientRects().length, overflowX: document.documentElement.scrollWidth - innerWidth, overflowY: document.documentElement.scrollHeight - innerHeight };
            }, id);
            const folded = await read();
            if (w === 1440) await openByHover(page, `[data-testid=${id}]`); else await page.locator(`[data-testid=${id}] .dock-layer--summary`).tap();
            await page.waitForTimeout(900);
            const open = await read();
            return { folded, open };
        });
    }
    // 3c. Two controls docks and the site dock on one page: no two plates meet (folded rest).
    for (const w of [360, 390, 1440]) {
        out[`two-${w}`] = await cell(w, w !== 1440, "cell=w-two", async (page) =>
            page.evaluate(() => {
                const r = ["w-two-site", "w-two-a", "w-two-b"].map((id) => document.querySelector(`[data-testid=${id}] .dock-plate`).getBoundingClientRect());
                const meet = (a, b) => !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
                return { siteA: meet(r[0], r[1]), siteB: meet(r[0], r[2]), aB: meet(r[1], r[2]), names: [...document.querySelectorAll("[data-testid^=w-two] [role=toolbar]")].map((e) => e.getAttribute("aria-label")) };
            }),
        );
    }
    // 4. The controls dock: a named toolbar, no seat clipped at 360, and on daraksha's page its
    //    box meets neither the site dock nor another controls dock.
    out["controls-360"] = await cell(360, true, "cell=w-daraksha", async (page) => {
        const tb = await page.$$eval("[data-testid=w-daraksha] [role=toolbar]", (els) => els.map((e) => e.getAttribute("aria-label")));
        await page.locator("[data-testid=w-daraksha] .dock-layer--summary").tap().catch(() => {});
        await page.waitForTimeout(800);
        const tbOpen = await page.$$eval("[data-testid=w-daraksha] [role=toolbar]", (els) => els.map((e) => e.getAttribute("aria-label")));
        const clip = await page.$$eval("[data-testid=w-daraksha] [data-glass-dock-seat]", (els) => els.map((e) => { const r = e.getBoundingClientRect(); const p = e.closest(".dock-run").getBoundingClientRect(); return r.left < p.left - 0.5 || r.right > p.right + 0.5 || r.top < p.top - 0.5 || r.bottom > p.bottom + 0.5; }).filter(Boolean).length);
        const meet = await page.evaluate(() => { const a = document.querySelector("[data-testid=w-daraksha] .dock-plate").getBoundingClientRect(); const b = document.querySelector("[data-testid=w-daraksha-site] .dock-plate").getBoundingClientRect(); return !(a.right < b.left || b.right < a.left || a.bottom < b.top || b.bottom < a.top); });
        return { toolbarNamesFolded: tb, toolbarNamesOpen: tbOpen, seatsClipped: clip, meetsSiteDock: meet };
    });
    // 5. Focus held on a seat when a fold starts moves to the folded face.
    out["focus-fold-1440"] = await cell(1440, false, "cell=w-pill", async (page) => {
        await page.keyboard.press("Tab");
        await page.waitForTimeout(600);
        const before = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
        await page.keyboard.press("Escape");
        await page.waitForTimeout(700);
        const after = await page.evaluate(() => ({ cls: document.activeElement?.className, inert: !!document.activeElement?.closest("[inert]") }));
        return { focusBefore: before, focusAfterIsSummary: /dock-layer--summary/.test(after.cls || ""), onInert: after.inert };
    });
    // 6. Forced colours (Chromium only), light and dark: one closed outline on the plate, no
    //    edge round the root.
    if (engine === "chromium") {
        for (const scheme of ["light", "dark"]) {
            out[`forced-${scheme}`] = await cell(1440, false, `cell=w-pill${scheme === "dark" ? "&scheme=dark" : ""}`, async (page) => {
                return page.evaluate(() => {
                    const d = document.querySelector("[data-testid=w-pill]"), p = d.querySelector(".dock-plate");
                    const cs = (e) => getComputedStyle(e);
                    const edge = (s) => ({ border: `${s.borderTopStyle} ${s.borderTopWidth}`, outline: `${s.outlineStyle} ${s.outlineWidth}` });
                    return { root: edge(cs(d)), plate: edge(cs(p)) };
                });
            }, { forcedColors: "active", colorScheme: scheme });
        }
    }
} finally {
    if (browser) await browser.close();
    const f = new URL(`../../logs/m8-g13${process.env.LOG_TAG ? "-" + process.env.LOG_TAG : ""}.${engine}.json`, import.meta.url);
    writeFileSync(f, JSON.stringify(out, null, 1));
    console.log(JSON.stringify(out));
}
