// marks9.mjs <port> <tag> [--engine chromium|webkit]: S2's reading of the hold build's trace marks (RU-109 as amended for
// R8-4). On w-seat at 1440 fine, a hover open and a fold by a press outside, then w-tallrow's open (a deciding fit frame):
// every `dock:*` mark name the carrier left, counted, and whether `__dockHold` is still on the window. The marks a ruled
// witness reads are dock:read, dock:write (m8/cost8.mjs, m9/trace9.mjs) and dock:reread (G-11's RU-54 bound). One browser,
// a context per cell. Log: logs/s9-marks-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, cells: {} };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const cell of ["w-seat", "w-tallrow", "w-words"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}`);
            await page.waitForSelector(`[data-testid=${cell}]`, { timeout: 60000 });
            await page.mouse.move(2, 2); await sleep(1200);
            await page.evaluate(() => performance.clearMarks());
            const b = await page.evaluate((id) => { const d = document.querySelector(`[data-testid=${id}]`); const r = (d.querySelector(".dock-layer--summary") ?? d).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, cell);
            await page.mouse.move(b[0], b[1]); await sleep(1400);
            if (cell === "w-words") { await page.locator("[data-testid=w-words-swap], button:has-text('longer')").first().click().catch(() => {}); await sleep(800); }
            await page.mouse.move(2, 2); await page.mouse.click(2, 2); await sleep(1400);
            const r = await page.evaluate(() => { const c = {}; for (const m of performance.getEntriesByType("mark")) if (m.name.startsWith("dock:")) c[m.name] = (c[m.name] ?? 0) + 1; return { marks: c, hold: typeof window.__dockHold, cls: document.querySelector(".glass-dock")?.className }; });
            out.cells[cell] = r;
            console.log(cell, JSON.stringify(r));
        } catch (e) { out.cells[cell] = { error: String(e).slice(0, 200) }; } finally { await ctx.close(); }
    }
} finally { await browser?.close(); }
const names = new Set(Object.values(out.cells).flatMap((c) => Object.keys(c.marks ?? {})));
out.summary = { names: [...names].sort(), unexpected: [...names].filter((n) => !["dock:read", "dock:write", "dock:reread"].includes(n)), holdOnWindow: Object.values(out.cells).some((c) => c.hold && c.hold !== "undefined") };
console.log("summary", JSON.stringify(out.summary));
writeFileSync(new URL(`../../logs/s9-marks-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
