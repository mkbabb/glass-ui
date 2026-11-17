// cross8.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-8 H10 (RU-84 as amended for C7-7, O-386). The plate's
// cross extent (its block size, the dock being horizontal) folded and open, on value.js's composition (w-valuejs:
// collapse "open" at 1024 px and over, false under, as value.js writes it) and on w-inflow (collapse "closed"), at 1440
// fine and 390 coarse. Each posture read settled (no [data-morphing], no running animation in the dock, up to 3 s),
// with the root's block size and every seat's block size beside it. The other posture is reached the way a person
// reaches it: a folded dock is opened by hover (fine) or a tap on its folded face (coarse); an open dock that folds is
// left (the pointer moved off, then up to 9 s for its linger) and, if still open, pressed outside. A dock that has one
// posture at a width is recorded so.
// One browser, a context per cell, closed in finally. Log: logs/m8-cross-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, cells: {} };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const id of ["w-valuejs", "w-inflow"]) for (const coarse of [false, true]) {
        const key = `${id}@${coarse ? "390-coarse" : "1440-fine"}`;
        const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
        try {
            const p = await ctx.newPage();
            await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${id}`);
            await p.waitForSelector(`[data-testid=${id}]`, { timeout: 60000 });
            if (!coarse) await p.mouse.move(4, 880);
            await sleep(1500);
            const settle = () => p.evaluate(async (id) => { const d = document.querySelector(`[data-testid=${id}]`); const t0 = performance.now(); while (performance.now() - t0 < 3000) { if (!d.hasAttribute("data-morphing") && !d.getAnimations({ subtree: true }).some((x) => x.playState === "running")) return +(performance.now() - t0).toFixed(0); await new Promise((r) => setTimeout(r, 50)); } return -1; }, id);
            const read = async () => { const settled = await settle(); return { settled, ...(await p.evaluate((id) => { const d = document.querySelector(`[data-testid=${id}]`); const pl = d.querySelector(".dock-plate") ?? d; const r = pl.getBoundingClientRect(), rr = d.getBoundingClientRect(); const seats = [...d.querySelectorAll("[data-glass-dock-seat]")].filter((s) => s.checkVisibility?.() ?? true).map((s) => +s.getBoundingClientRect().height.toFixed(2)); return { posture: d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest", plateBlock: +r.height.toFixed(2), plateInline: +r.width.toFixed(2), rootBlock: +rr.height.toFixed(2), seats: [...new Set(seats)], orientation: d.getAttribute("aria-orientation") ?? d.dataset.orientation ?? null }; }, id)) }; };
            const first = await read();
            const cell = { first };
            const face = async () => p.evaluate((id) => { const d = document.querySelector(`[data-testid=${id}]`); const f = d.querySelector(".dock-layer--summary"); const r = (f && f.getBoundingClientRect().width > 2 ? f : d).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, id);
            if (first.posture === "folded") {
                const [x, y] = await face();
                if (coarse) await p.touchscreen.tap(x, y); else { await p.mouse.move(x - 6, y); await p.mouse.move(x, y, { steps: 3 }); }
                await sleep(1200);
                cell.second = await read();
            } else {
                const [x, y] = await face();
                if (!coarse) { await p.mouse.move(x, y, { steps: 3 }); await sleep(300); await p.mouse.move(4, 880, { steps: 3 }); }
                let folded = false;
                for (let k = 0; k < 18 && !folded; k++) { await sleep(500); folded = await p.evaluate((id) => document.querySelector(`[data-testid=${id}]`).classList.contains("collapsed"), id); }
                if (!folded) { if (coarse) await p.touchscreen.tap(195, 820); else await p.mouse.click(4, 880); await sleep(1500); }
                cell.second = await read();
                cell.howFolded = folded ? "left, its linger" : "pressed outside";
            }
            const pf = [cell.first, cell.second].find((r) => r.posture === "folded"), po = [cell.first, cell.second].find((r) => r.posture !== "folded");
            cell.folded = pf?.plateBlock ?? null; cell.open = po?.plateBlock ?? null;
            cell.differs = pf && po ? +(po.plateBlock - pf.plateBlock).toFixed(2) : null;
            cell.note = pf ? "" : "one posture at this width (never folded)";
            out.cells[key] = cell;
            console.log(key, JSON.stringify({ folded: cell.folded, open: cell.open, differs: cell.differs, postures: [cell.first.posture, cell.second.posture], seats: [cell.first.seats, cell.second.seats], note: cell.note }));
        } catch (e) {
            out.cells[key] = { error: String(e).slice(0, 300) };
            console.log(key, "error", String(e).slice(0, 200));
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m8-cross-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
