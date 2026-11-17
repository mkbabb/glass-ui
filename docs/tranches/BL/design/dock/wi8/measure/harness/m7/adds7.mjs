// adds7.mjs <port> <tag> [--engine chromium|webkit] [--host h]: MEASURE-7 step 7, the two small adds on their sites'
// cells, at 1440 fine and 390 coarse. One browser, a context per cell, closed in finally. Log: logs/m7-adds-<tag>.<engine>.json.
//   trig    w-trig (Home Assistant's GlassTabs, LF-11): the worded DockTrigger's border box against the icon seat's:
//           block extent equal within 0.5 px, and its inline padding the tab seat's (`--dock-tab-padding-inline`)
//   group   w-group (gregg's PageDock): a run whose direct child is a role="group" box of worded seats, capped to
//           overflow. The run scrolled by 60 px steps to its end by scrollBy (smooth off) and left to settle: it rests
//           past 0 (WebKit pinned it at 0 when the group was one snap area wider than the port), every rest is a seat's
//           snap position (a seat's start less the scroll padding, or the end), and the group snaps nothing itself.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const HOST = val("--host", "127.0.0.1");
const out = { engine, trig: {}, group: {}, bad: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) {
        const vp = coarse ? "390 coarse" : "1440 fine";
        const mk = () => browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
        let ctx = await mk();
        try {
            const page = await ctx.newPage();
            await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-trig`);
            await page.waitForSelector("[data-testid=w-trig-trigger]");
            await page.waitForTimeout(800);
            const r = await page.evaluate(() => {
                const t = document.querySelector("[data-testid=w-trig-trigger]"), s = document.querySelector("[data-testid=w-trig-seat]");
                const tb = t.getBoundingClientRect(), sb = s.getBoundingClientRect(), cs = getComputedStyle(t);
                const probe = document.createElement("div"); probe.style.cssText = "position:absolute;visibility:hidden;inline-size:var(--dock-tab-padding-inline, 0.75rem)"; t.closest(".glass-dock").appendChild(probe); const tabPad = probe.getBoundingClientRect().width; probe.remove();
                return { trigger: [+tb.width.toFixed(2), +tb.height.toFixed(2)], seat: [+sb.width.toFixed(2), +sb.height.toFixed(2)], padInline: parseFloat(cs.paddingLeft), tabPad };
            });
            r.pass = Math.abs(r.trigger[1] - r.seat[1]) <= 0.5 && Math.abs(r.padInline - r.tabPad) <= 0.5;
            out.trig[vp] = r;
            if (!r.pass) out.bad.push(`trig ${vp}: ${JSON.stringify(r)}`);
        } finally {
            await ctx.close();
        }
        ctx = await mk();
        try {
            const page = await ctx.newPage();
            await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-group`);
            await page.waitForSelector("[data-testid=w-group-frame]");
            await page.waitForTimeout(800);
            const rests = [];
            for (let i = 0; i < 12; i++) {
                const r = await page.evaluate(async () => {
                    const run = document.querySelector("[data-testid=w-group] .dock-layers > .dock-run");
                    run.scrollBy({ left: 60, behavior: "instant" });
                    await new Promise((r) => setTimeout(r, 450));
                    const pad = parseFloat(getComputedStyle(run).scrollPaddingLeft) || 0;
                    const seats = [...run.querySelectorAll("[role=group] > *")];
                    const rr = run.getBoundingClientRect();
                    const snaps = seats.map((s) => Math.max(0, Math.min(run.scrollWidth - run.clientWidth, s.getBoundingClientRect().left - rr.left + run.scrollLeft - run.clientLeft - pad)));
                    const max = run.scrollWidth - run.clientWidth;
                    const at = run.scrollLeft;
                    const onSnap = snaps.some((x) => Math.abs(x - at) <= 1) || Math.abs(at - max) <= 1 || at === 0;
                    return { at: +at.toFixed(1), max, onSnap, groupAlign: getComputedStyle(run.querySelector("[role=group]")).scrollSnapAlign, seatAlign: getComputedStyle(seats[0]).scrollSnapAlign };
                });
                rests.push(r);
                if (r.at >= r.max - 1) break;
            }
            const moved = rests.some((x) => x.at > 0);
            const res = { rests, moved, pass: moved && rests.every((x) => x.onSnap) && rests[0].groupAlign === "none" };
            out.group[vp] = res;
            if (!res.pass) out.bad.push(`group ${vp}: moved ${moved}, rests ${rests.map((x) => x.at + (x.onSnap ? "" : "!")).join(" ")}, group ${rests[0]?.groupAlign}, seat ${rests[0]?.seatAlign}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    out.pass = !out.bad.length;
    writeFileSync(new URL(`../../logs/m7-adds-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, tag, pass: out.pass, trig: out.trig, bad: out.bad }));
}
