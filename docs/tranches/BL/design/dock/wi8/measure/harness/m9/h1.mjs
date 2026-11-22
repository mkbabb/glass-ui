// h1.mjs <port> <tag> [--engine chromium|webkit] [--only k,k2,finger,menu]: MEASURE-9 part H, item H1 (RU-89, RU-114).
// clock2.mjs's (k) moved to a run seat and (k2) new on the persistent seat; cells6.mjs's held finger and g8.mjs's menu
// hold run on the controls preset. Each case in a new context of one browser, closed in finally; times are read in the
// page from a MutationObserver on the dock's class against the step's own page time (clock2's method).
//   k       w-seat hover-opened at 1440 fine, its run seat Search clicked, the pointer leaves: the fold after the leave.
//           Clause: the linger (--dock-linger, 6 s, with half the dwell up to --dock-linger-max), so not before 6,000 ms
//           and not after 6,000 + 9,000 / 2 ms. Plant g1-linger (a fixed 3.6 s) fails it.
//   k2      the same with the persistent seat Home clicked: the fold starts within one 60 Hz frame of the leave
//           (16.7 ms). Plant g1-afterseat (the branch removed: the dock lingers) fails it.
//   finger  w-ctl (the controls preset, ControlsDock) at 390 coarse: a tap opens it; a finger held 9 s on a run seat folds
//           nothing; after the lift one linger. Chromium: a real touch (CDP Input.dispatchTouchEvent). WebKit 2287 has no
//           held touch in Playwright: pointerdown and pointerup with pointerType touch are dispatched on the seat, and the
//           result says so. Plant g1-presshold fails it.
//   menu    w-ctlm (the preset with a DropdownMenu seat) hover-opened at 1440 fine, the menu opened from its seat, the
//           pointer leaves for 7.2 s: the dock and the menu are both still open. Plant g8-nohold fails it.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const only = (val("--only", "") || "").split(",").filter(Boolean);
const out = { engine, port: +port, at: new Date().toISOString() };
const INIT = `
window.__cls = [];
const arm = () => {
  const d = document.querySelector('[data-testid="__ID__"]');
  if (!d) return requestAnimationFrame(arm);
  window.__dock = d;
  new MutationObserver(() => window.__cls.push([performance.now(), d.classList.contains('expanded') ? 'open' : 'collapsed', d.hasAttribute('data-morphing')])).observe(d, { attributes: true, attributeFilter: ['class', 'data-morphing'] });
};
addEventListener('DOMContentLoaded', arm);
`;
let browser;
async function withPage(coarse, id, extra, fn) {
    const ctx = await browser.newContext({ viewport: { width: coarse ? 390 : 1440, height: coarse ? 844 : 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
    try {
        await ctx.addInitScript(INIT.replace("__ID__", id));
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${id}${extra}`);
        await page.waitForSelector(`[data-testid=${id}]`);
        await page.waitForTimeout(600);
        const now = () => page.evaluate(() => performance.now());
        const cls = () => page.evaluate(() => window.__cls);
        const center = async (sel) => { const b = await page.locator(sel).first().boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
        const st = () => page.evaluate(() => ({ open: window.__dock.classList.contains("expanded"), pinned: window.__dock.classList.contains("pinned") }));
        return await fn({ page, ctx, now, cls, center, st });
    } catch (e) {
        return { error: String(e).slice(0, 300) };
    } finally {
        await ctx.close();
    }
}
const firstAfter = (log, t0, state) => log.find((x) => x[0] >= t0 && x[1] === state);
async function seatLeave(seat) {
    return withPage(false, "w-seat", "", async ({ page, now, cls, center, st }) => {
        const [x, y] = await center("[data-testid=w-seat]");
        await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 });
        await page.waitForTimeout(800);
        const opened = (await st()).open;
        await page.click(`[data-testid=w-seat-${seat}]`);
        await page.waitForTimeout(200);
        const openAtLeave = (await st()).open;
        const t0 = await now();
        await page.mouse.move(8, 400);
        await page.waitForTimeout(13000);
        const f = firstAfter(await cls(), t0, "collapsed");
        return { seat, opened, openAtLeave, foldAfterLeaveMs: f ? +(f[0] - t0).toFixed(1) : null };
    });
}
const cases = {
    async k() {
        const r = await seatLeave("search");
        r.pass = r.opened && r.openAtLeave && r.foldAfterLeaveMs != null && r.foldAfterLeaveMs >= 6000 && r.foldAfterLeaveMs <= 10500;
        return r;
    },
    async k2() {
        const r = await seatLeave("home");
        r.pass = r.opened && r.openAtLeave && r.foldAfterLeaveMs != null && r.foldAfterLeaveMs <= 16.7;
        return r;
    },
    async finger() {
        return withPage(true, "w-ctl", "&corner=bottom-end", async ({ page, ctx, now, cls, center, st }) => {
            const folded = !(await st()).open;
            const [x, y] = await center("[data-testid=w-ctl] .dock-layer--summary");
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(900);
            const opened = (await st()).open;
            const [sx, sy] = await center("[data-testid=w-ctl] .dock-run > *");
            const tDown = await now();
            let how, held, tUp;
            if (engine === "chromium") {
                how = "CDP touchStart/touchEnd";
                const cdp = await ctx.newCDPSession(page);
                await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: sx, y: sy }] });
                await page.waitForTimeout(9000);
                held = firstAfter(await cls(), tDown, "collapsed");
                tUp = await now();
                await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            } else {
                how = "dispatched pointerdown/pointerup, pointerType touch (WebKit 2287 has no held touch in Playwright)";
                await page.evaluate(([px, py]) => { const el = document.elementFromPoint(px, py); el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true, pointerType: "touch", isPrimary: true, pointerId: 7, clientX: px, clientY: py, buttons: 1 })); }, [sx, sy]);
                await page.waitForTimeout(9000);
                held = firstAfter(await cls(), tDown, "collapsed");
                tUp = await now();
                await page.evaluate(([px, py]) => { const el = document.elementFromPoint(px, py); el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, composed: true, pointerType: "touch", isPrimary: true, pointerId: 7, clientX: px, clientY: py })); }, [sx, sy]);
            }
            await page.waitForTimeout(13000);
            const f = firstAfter(await cls(), tUp, "collapsed");
            const foldAfterLiftMs = f ? +(f[0] - tUp).toFixed(0) : null;
            return { how, restsFolded: folded, opened, foldedWhileHeld: !!held, heldFoldAtMs: held ? +(held[0] - tDown).toFixed(0) : null, foldAfterLiftMs, pass: folded && opened && !held && foldAfterLiftMs != null && foldAfterLiftMs >= 3000 };
        });
    },
    async menu() {
        return withPage(false, "w-ctlm", "&corner=bottom-end", async ({ page, st }) => {
            const folded = !(await st()).open;
            const b = await page.locator("[data-testid=w-ctlm]").boundingBox();
            await page.mouse.move(b.x - 30, b.y + b.height / 2);
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
            await page.mouse.move(b.x + b.width / 2 + 2, b.y + b.height / 2);
            await page.waitForTimeout(900);
            const opened = (await st()).open;
            await page.locator("[data-testid=w-ctlm-menu]").click();
            await page.waitForTimeout(600);
            const vis = () => page.evaluate(() => { const e = document.querySelector("[data-testid=w-ctlm-menu-content]"); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 0 && getComputedStyle(e).visibility !== "hidden" && +getComputedStyle(e).opacity > 0.05; });
            const menuOpened = await vis();
            await page.mouse.move(8, 880);
            await page.waitForTimeout(7200);
            const after = { dockOpen: (await st()).open, menuOpen: await vis() };
            return { restsFolded: folded, opened, menuOpened, after72s: after, pass: folded && opened && menuOpened && after.dockOpen && after.menuOpen };
        });
    },
};
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const [k, fn] of Object.entries(cases)) {
        if (only.length && !only.includes(k)) continue;
        out[k] = await fn();
        console.log(JSON.stringify({ [k]: out[k] }));
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-h1.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
