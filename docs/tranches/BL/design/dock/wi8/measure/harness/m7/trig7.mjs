// trig7.mjs <port> <tag> [--engine chromium|webkit] [--host h]: MEASURE-7, G-8's trigger clause (RU-62, required) on
// w-g8: each of DropdownMenu, Select, a click Popover and a Sheet opened from its seat, then its trigger pressed again,
// by mouse (1440, the dock opened by hover) and by touch (390 coarse, opened by a tap on the folded face). It reads
// the transitions themselves: m6/cells6.mjs's `reopened` counted every mutation callback while the content was still
// open, so a menu that closed once read as 2 reopens (step 3's event-order reading shows one close and no reopen).
// Pass: the surface opened, closed after the second press, is closed 1 s later, entered the open state 0 times after
// the second press, and the dock is still open. One browser, a context per cell. Log: logs/m7-trig-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const HOST = val("--host", "127.0.0.1");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SURF = [["menu", "w-g8-menu", "w-g8-menu-content"], ["select", "w-g8-select", "w-g8-select-content"], ["popover", "w-g8-pop", "w-g8-pop-content"], ["sheet", "w-g8-sheet", "w-g8-sheet-content"]];
const out = { engine, cells: {}, bad: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) for (const [name, trig, content] of SURF) {
        const key = `${name}-${coarse ? "touch" : "mouse"}`;
        const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
        try {
            const page = await ctx.newPage();
            await page.addInitScript((content) => {
                window.__st = [];
                addEventListener("DOMContentLoaded", () => new MutationObserver(() => {
                    const e = document.querySelector(`[data-testid=${content}]`);
                    const s = e ? e.getAttribute("data-state") || "present" : "absent";
                    if (window.__st.at(-1)?.[1] !== s) window.__st.push([performance.now(), s]);
                }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-state"] }));
            }, content);
            await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-g8`);
            await page.waitForSelector("[data-testid=w-g8]");
            await sleep(800);
            const center = async (sel) => { const b = await page.locator(sel).first().boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
            const press = async (x, y) => { if (coarse) await page.touchscreen.tap(x, y); else await page.mouse.click(x, y); };
            const dockOpen = () => page.evaluate(() => document.querySelector("[data-testid=w-g8]").classList.contains("expanded"));
            const shown = () => page.evaluate((c) => { const e = document.querySelector(`[data-testid=${c}]`); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && e.getAttribute("data-state") !== "closed"; }, content);
            if (coarse) { const [x, y] = await center("[data-testid=w-g8] .dock-layer--summary"); await page.touchscreen.tap(x, y); await sleep(900); }
            else { const [x, y] = await center("[data-testid=w-g8]"); await page.mouse.move(x - 8, y); await page.mouse.move(x, y, { steps: 4 }); await sleep(1000); }
            const dock0 = await dockOpen();
            const [tx, ty] = await center(`[data-testid=${trig}]`);
            await press(tx, ty);
            await sleep(700);
            const opened = await shown();
            const t1 = await page.evaluate(() => performance.now());
            await press(tx, ty);
            await sleep(500);
            const closed = !(await shown());
            await sleep(1000);
            const stillClosed = !(await shown());
            const st = await page.evaluate((t1) => window.__st.filter((x) => x[0] >= t1).map((x) => x[1]), t1);
            const reopened = st.filter((s, i) => s === "open" && i > 0).length + (st[0] === "open" ? 1 : 0);
            const dock = await dockOpen();
            const r = { dock0, opened, closed, stillClosed, reopened, states: st, dockOpen: dock, pass: dock0 && opened && closed && stillClosed && reopened === 0 && dock };
            out.cells[key] = r;
            if (!r.pass) out.bad.push(`${key}: ${JSON.stringify(r)}`);
        } catch (e) {
            out.cells[key] = { error: String(e).slice(0, 200) };
            out.bad.push(`${key}: ${String(e).slice(0, 120)}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    out.pass = !out.bad.length;
    writeFileSync(new URL(`../../logs/m7-trig-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, tag, pass: out.pass, cells: Object.fromEntries(Object.entries(out.cells).map(([k, v]) => [k, v.pass ?? v.error])), bad: out.bad.slice(0, 8) }));
}
