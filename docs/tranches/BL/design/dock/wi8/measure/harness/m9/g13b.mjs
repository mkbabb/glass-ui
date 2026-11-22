// g13b.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-9 part H (H2; RU-104 as amended for C8-15). G-13's face-box
// clause read as daraksha filed O-357 (3): at rest the posture face that is not showing reports no rectangle outside the
// plate. Folded, every element of the open face; open, every element of the folded face: each client rectangle of any
// size is compared with the plate's box, and one that reaches past it by more than 0.5 px on any side is counted. Also
// recorded: how many of the hidden face's seats report a rectangle at all (the eighth pass's leaf) and the document's
// overflow. Cells: w-seat at 1440 fine (hover) and 390 coarse (tap), w-ctl at 390 coarse, and daraksha's composition
// (w-daraksha: the site dock and the ControlsDock with the outlet's seats) at 1440 fine and 390 coarse, its ControlsDock
// read. A dock open at load is folded by a press outside first (recorded as openAtLoad). One browser, a context per
// cell, closed in finally. Pass: no rectangle outside the plate at either rest.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const out = { engine };
let browser;
const read = (page, id) => page.evaluate((id) => {
    const d = document.querySelector(`[data-testid=${id}]`);
    const p = d.querySelector(".dock-plate").getBoundingClientRect();
    const open = d.classList.contains("expanded");
    const hidden = [...d.querySelectorAll(":scope > .dock-controls > .dock-layers > .dock-layer:not(.is-active)")];
    let rects = 0, outside = 0, worst = 0;
    const where = [];
    for (const f of hidden) for (const el of [f, ...f.querySelectorAll("*")]) for (const r of el.getClientRects()) {
        rects++;
        const past = Math.max(p.left - r.left, r.right - p.right, p.top - r.top, r.bottom - p.bottom);
        if (past > 0.5) { outside++; if (past > worst) worst = past; if (where.length < 4) where.push(`${el.getAttribute("aria-label") || el.tagName.toLowerCase()} ${past.toFixed(1)}px`); }
    }
    const seats = hidden.flatMap((f) => [...f.querySelectorAll("[data-glass-dock-seat]")]);
    return { open, hiddenFaces: hidden.map((f) => f.className.split(" ").find((c) => c.startsWith("dock-layer--")) ?? "dock-layer"), rects, outside, worstPx: +worst.toFixed(1), where, seatsWithRects: seats.filter((e) => e.getClientRects().length > 0).length, seats: seats.length, overflowX: document.documentElement.scrollWidth - innerWidth, overflowY: document.documentElement.scrollHeight - innerHeight };
}, id);
async function cell(name, coarse, url, id) {
    const ctx = await browser.newContext({ viewport: { width: coarse ? 390 : 1440, height: coarse ? 844 : 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&${url}`);
        await page.waitForSelector(`[data-testid=${id}]`);
        await page.waitForTimeout(900);
        // A dock that rests open at load (w-daraksha's ControlsDock counts one control at its first render and five once
        // the outlet's seats arrive) is folded by a press outside first, and that is recorded.
        const atLoad = (await read(page, id)).open;
        if (atLoad) { await page.mouse.click(coarse ? 4 : 1436, coarse ? 4 : 4); await page.waitForTimeout(1200); }
        const folded = await read(page, id);
        folded.openAtLoad = atLoad;
        if (coarse) await page.locator(`[data-testid=${id}] .dock-layer--summary`).tap();
        else {
            const b = await page.locator(`[data-testid=${id}]`).boundingBox();
            await page.mouse.move(b.x - 30, b.y + b.height / 2);
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
            await page.mouse.move(b.x + b.width / 2 + 2, b.y + b.height / 2);
        }
        await page.waitForTimeout(1200);
        const open = await read(page, id);
        const pass = !folded.open && open.open && folded.outside === 0 && open.outside === 0;
        out[name] = { folded, open, pass };
    } catch (e) {
        out[name] = { error: String(e).slice(0, 300) };
    } finally {
        await ctx.close();
    }
    console.log(name, JSON.stringify(out[name]));
}
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    await cell("w-seat-1440", false, "cell=w-seat", "w-seat");
    await cell("w-seat-390", true, "cell=w-seat", "w-seat");
    await cell("w-ctl-390", true, "cell=w-ctl&corner=bottom-end", "w-ctl");
    await cell("daraksha-1440", false, "cell=w-daraksha", "w-daraksha");
    await cell("daraksha-390", true, "cell=w-daraksha", "w-daraksha");
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-g13b.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
