// clock2.mjs (PROTOTYPE-3: (m) leaves above the dock and is scrolled under it. PROTOTYPE-2: (b) adds the 2 px move after the scroll, (k) reads w-seat's Home, (m) added)
// clock.mjs <port> <tag> [--engine chromium|webkit] [--only a,c,...]
// G-1 on the real clock: each case in a new context, timing read from a MutationObserver on
// the dock root's class (performance.now() in the page) against the step's own page time.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const only = val("--only", "")?.split(",").filter(Boolean);
const OUT = new URL("../logs/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const results = [];
const INIT = `
window.__cls = [];
const arm = () => {
  const d = document.querySelector('[data-testid="${"__ID__"}"]');
  if (!d) return requestAnimationFrame(arm);
  window.__dock = d;
  new MutationObserver(() => window.__cls.push([performance.now(), d.classList.contains('expanded') ? 'open' : 'collapsed', d.hasAttribute('data-morphing')])).observe(d, { attributes: true, attributeFilter: ['class', 'data-morphing'] });
};
addEventListener('DOMContentLoaded', arm);
`;
async function withPage(cell, id, extra, fn, ctxExtra = {}) {
    const ctx = await browser.newContext({ viewport: { width: cell === "coarse" ? 390 : 1440, height: cell === "coarse" ? 844 : 900 }, deviceScaleFactor: 1, ...(cell === "coarse" && engine === "chromium" ? { hasTouch: true, isMobile: true } : cell === "coarse" ? { hasTouch: true } : {}), ...ctxExtra });
    try {
        await ctx.addInitScript(INIT.replace("__ID__", id));
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${id}${extra}`);
        await page.waitForSelector(`[data-testid=${id}]`);
        await page.waitForTimeout(500);
        const now = () => page.evaluate(() => performance.now());
        const cls = () => page.evaluate(() => window.__cls);
        const center = async (sel) => { const b = await page.locator(sel).first().boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
        return await fn({ page, now, cls, center });
    } finally {
        await ctx.close();
    }
}
const firstAfter = (log, t0, state) => log.find((x) => x[0] >= t0 && x[1] === state);
let browser;
const cases = {
    async a() {
        // the pointer enters and rests: open at --dock-intent after the first move
        return withPage("fine", "w-pill", "", async ({ page, now, cls, center }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            await page.mouse.move(x - 40, y - 60);
            await page.waitForTimeout(200);
            const t0 = await now();
            await page.mouse.move(x, y, { steps: 3 });
            await page.waitForTimeout(600);
            const o = firstAfter(await cls(), t0, "open");
            return { openAfterMs: o ? +(o[0] - t0).toFixed(1) : null };
        });
    },
    async b() {
        // a dock scrolled under a still pointer, 2 s
        return withPage("fine", "w-pill", "", async ({ page, now, cls, center }) => {
            await page.evaluate(() => { const s = document.createElement("div"); s.style.height = "2000px"; document.querySelector(".anim-root").appendChild(s); const t = document.createElement("div"); t.style.height = "600px"; document.querySelector(".anim-root").prepend(t); });
            await page.waitForTimeout(200);
            const [x, y] = await center("[data-testid=w-pill]");
            await page.mouse.move(x, y - 300);
            await page.waitForTimeout(200);
            const t0 = await now();
            for (let i = 0; i < 30; i++) { await page.evaluate(() => scrollBy(0, 10)); await page.waitForTimeout(16); }
            await page.waitForTimeout(2000);
            const o = firstAfter(await cls(), t0, "open");
            // then the pointer moves 2 px: opens one intent after the move
            const t1 = await now();
            const overDock = await page.evaluate(([px, py]) => !!document.elementFromPoint(px, py)?.closest(".glass-dock"), [x, y - 300]);
            await page.mouse.move(x + 2, y - 300);
            await page.waitForTimeout(600);
            const o2 = firstAfter(await cls(), t1, "open");
            return { pointerOverDockAfterScroll: overDock, openedUnderStillPointer: !!o, at: o ? +(o[0] - t0).toFixed(0) : null, openAfterMoveMs: o2 ? +(o2[0] - t1).toFixed(0) : null };
        });
    },
    async c() {
        return lingerCase("w-pill", 1000, "");
    },
    async d() {
        // MEASURE: once with the tokens untouched (12 s expected), once with the cap at 6 s.
        return { untouched: await lingerCase("w-pill", 12000, ""), max6s: await lingerCase("w-pill", 12000, "", "--dock-linger-max: 6s") };
    },
    async e() {
        // leave and return at half the linger: no fold; then a full linger after the next leave
        return withPage("fine", "w-pill", "", async ({ page, now, cls, center }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 });
            await page.waitForTimeout(800);
            await page.mouse.move(8, 8);
            const linger = await page.evaluate(() => getComputedStyle(window.__dock).getPropertyValue("--dock-linger").trim() || "3600ms");
            const L = linger.endsWith("ms") ? parseFloat(linger) : parseFloat(linger) * 1000;
            const lingerMs = Number.isFinite(L) ? L : 3600;
            await page.waitForTimeout(lingerMs / 2);
            const [x2, y2] = await center("[data-testid=w-pill]");
            await page.mouse.move(x2 - 5, y2); await page.mouse.move(x2, y2, { steps: 3 });
            await page.waitForTimeout(400);
            const t1 = await now();
            await page.mouse.move(8, 8);
            await page.waitForTimeout(lingerMs + 3000);
            const log = await cls();
            const folds = log.filter((q) => q[1] === "collapsed");
            const f = firstAfter(log, t1, "collapsed");
            return { foldsBeforeReturn: folds.filter((q) => q[0] < t1).length, foldAfterSecondLeaveMs: f ? +(f[0] - t1).toFixed(0) : null };
        });
    },
    async f() {
        // holds: an overlay open (Popover keep-dock-open, contributed through the outlet),
        // keyboard focus inside, a finger held down
        const out = {};
        out.overlay = await withPage("fine", "w-outlet", "", async ({ page, now, cls, center }) => {
            const [x, y] = await center("[data-testid=w-outlet]");
            await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 });
            await page.waitForTimeout(700);
            await page.click("[data-testid=w-outlet-options]");
            await page.waitForTimeout(300);
            const popOpen = await page.evaluate(() => !!document.querySelector("[data-testid=w-outlet-pop]"));
            const t0 = await now();
            await page.mouse.move(8, 400);
            await page.waitForTimeout(9000);
            const f = firstAfter(await cls(), t0, "collapsed");
            const stillOpen = await page.evaluate(() => !!document.querySelector("[data-testid=w-outlet-pop]"));
            return { popOpen, foldedWhileOpen: !!f, foldAtMs: f ? +(f[0] - t0).toFixed(0) : null, popStillOpen: stillOpen };
        });
        out.focus = await withPage("fine", "w-pill", "", async ({ page, now, cls }) => {
            await page.keyboard.press("Tab");
            await page.waitForTimeout(600);
            const open = await page.evaluate(() => window.__dock.classList.contains("expanded"));
            const t0 = await now();
            await page.mouse.move(8, 8);
            await page.waitForTimeout(8000);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { openByKey: open, foldedWithFocusInside: !!f, at: f ? +(f[0] - t0).toFixed(0) : null };
        });
        return out;
    },
    async g() {
        // a tap opens, the finger lifts: folds one linger after the lift
        return withPage("coarse", "w-pill", "", async ({ page, now, cls, center }) => {
            const [x, y] = await center("[data-testid=w-pill]");
            const t0 = await now();
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(12000);
            const log = await cls();
            const o = firstAfter(log, t0, "open");
            const f = o ? firstAfter(log, o[0], "collapsed") : null;
            return { opened: !!o, foldAfterLiftMs: f ? +(f[0] - t0).toFixed(0) : null };
        });
    },
    async h() {
        const out = {};
        for (const how of ["outside", "escape"]) {
            out[how] = await withPage("fine", "w-pill", "", async ({ page, now, cls, center }) => {
                if (how === "escape") { await page.keyboard.press("Tab"); } else { const [x, y] = await center("[data-testid=w-pill]"); await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 }); }
                await page.waitForTimeout(800);
                const t0 = await now();
                if (how === "outside") await page.mouse.click(8, 8); else await page.keyboard.press("Escape");
                await page.waitForTimeout(800);
                const f = firstAfter(await cls(), t0, "collapsed");
                return { foldAfterMs: f ? +(f[0] - t0).toFixed(1) : null };
            });
        }
        return out;
    },
    async i() {
        // release() with the pointer outside: the Popover holds and is closed by Escape
        return withPage("fine", "w-outlet", "", async ({ page, now, cls, center }) => {
            const [x, y] = await center("[data-testid=w-outlet]");
            await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 });
            await page.waitForTimeout(700);
            await page.click("[data-testid=w-outlet-options]");
            await page.waitForTimeout(300);
            await page.mouse.move(8, 400);
            await page.waitForTimeout(500);
            const t0 = await now();
            // MEASURE: the Popover is closed from script with the pointer outside, so the
            // dock hears release() and no dismissal (Escape is itself a dismissal, R-2).
            await page.evaluate(() => document.querySelector("[data-testid=w-outlet-options]").click());
            await page.waitForTimeout(15000);
            const log = await cls();
            const f = firstAfter(log, t0, "collapsed");
            // a fold is an open -> collapsed change of the class, not a mutation entry
            let folds = 0, prev = "open";
            for (const q of log) { if (q[0] < t0) { prev = q[1]; continue; } if (prev === "open" && q[1] === "collapsed") folds++; prev = q[1]; }
            const popStillOpen = await page.evaluate(() => !!document.querySelector("[data-testid=w-outlet-pop]"));
            return { foldAfterReleaseMs: f ? +(f[0] - t0).toFixed(0) : null, folds, popStillOpen };
        });
    },
    async j() {
        return withPage("fine", "w-pill", "", async ({ page, now, cls, center }) => {
            await page.click("[data-testid=w-pill] .dock-layer--summary");
            await page.waitForTimeout(600);
            const pinned = await page.evaluate(() => window.__dock.classList.contains("pinned"));
            const t0 = await now();
            await page.mouse.move(8, 400);
            await page.waitForTimeout(15000);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { pinned, foldedIn15s: !!f };
        });
    },
    async k() {
        return withPage("fine", "w-seat", "", async ({ page, now, cls, center }) => {
            const [x, y] = await center("[data-testid=w-seat]");
            await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 });
            await page.waitForTimeout(800);
            await page.click("[data-testid=w-seat-home]");
            await page.waitForTimeout(200);
            const t0 = await now();
            await page.mouse.move(8, 400);
            await page.waitForTimeout(9000);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { foldAfterLeaveMs: f ? +(f[0] - t0).toFixed(0) : null };
        });
    },
    async m() {
        // an open, lingering dock scrolled under the still pointer: no fold while under it
        return withPage("fine", "w-pill", "", async ({ page, now, cls, center }) => {
            await page.evaluate(() => { const s = document.createElement("div"); s.style.height = "2000px"; document.querySelector(".anim-root").appendChild(s); });
            const [x, y] = await center("[data-testid=w-pill]");
            await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 });
            await page.waitForTimeout(800);
            // PROTOTYPE-3: the pointer leaves ABOVE the dock, so scrolling the page down
            // carries the dock up under it (the PROTOTYPE-2 cell left it below, and the
            // scroll carried the dock away from it).
            await page.mouse.move(x, y - 120);
            const t0 = await now();
            for (let i = 0; i < 12; i++) { await page.evaluate(() => scrollBy(0, 10)); await page.waitForTimeout(16); }
            const under = await page.evaluate(([px, py]) => !!document.elementFromPoint(px, py)?.closest(".glass-dock"), [x, y - 120]);
            await page.waitForTimeout(9000);
            const f = firstAfter(await cls(), t0, "collapsed");
            return { pointerOverDockAfterScroll: under, foldedUnderPointer: !!f, at: f ? +(f[0] - t0).toFixed(0) : null };
        });
    },
};
async function lingerCase(id, visitMs, extra, style) {
    return withPage("fine", id, extra, async ({ page, now, cls, center }) => {
        if (style) await page.evaluate((s) => window.__dock.setAttribute("style", (window.__dock.getAttribute("style") || "") + ";" + s), style);
        const [x, y] = await center(`[data-testid=${id}]`);
        await page.mouse.move(x - 5, y); await page.mouse.move(x, y, { steps: 3 });
        await page.waitForTimeout(visitMs);
        const t0 = await now();
        await page.mouse.move(8, 8);
        await page.waitForTimeout(15000);
        const f = firstAfter(await cls(), t0, "collapsed");
        return { visitMs, foldAfterLeaveMs: f ? +(f[0] - t0).toFixed(0) : null };
    });
}
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const [k, fn] of Object.entries(cases)) {
        if (only.length && !only.includes(k)) continue;
        try { results.push([k, await fn()]); } catch (e) { results.push([k, { error: String(e).slice(0, 200) }]); }
        console.log(JSON.stringify(results[results.length - 1]));
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`clock2.${tag}.${engine}.json`, OUT), JSON.stringify(Object.fromEntries(results), null, 1));
}
