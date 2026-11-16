// sweep.mjs <port> <tag> [--engine chromium|webkit] [--cell w-many] [--scheme light]: MEASURE-6, RU-39's
// new cell. The seven-seat dock (O-358) open at 1440 by hover; its host's width (the stage's
// max-inline-size) is swept one pixel at a time from 3 px under the width where the seats stop
// fitting to 3 px over it and back down. Before the fine sweep a coarse one (1 px from the host's
// open width down) finds the flip. At every step, after two frames: the flag (`data-run-fits` on
// the root, `data-run-whole` on the run) against `span <= clientWidth` read with the cap lifted by
// this script, and the flag at each width is the same in both directions. One browser, one context,
// closed in finally. Log: logs/m6-sweep-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const cellId = val("--cell", "w-many");
// --law room (RU-50): the flag is judged against the room the host gives the run; the default is RU-39's client box.
const LAW = val("--law", "client");
const out = { engine, cell: cellId, law: LAW, steps: [], bad: [], dirBad: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://${val("--host", "localhost")}:${port}/?c=dock-wi8&cell=${cellId}`);
        await page.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 });
        await page.waitForSelector(`[data-testid=${cellId}]`);
        await page.waitForTimeout(500);
        const s = await page.locator(`[data-testid=${cellId}] .dock-layer--summary`).boundingBox();
        await page.mouse.move(s.x + s.width / 2, s.y + s.height / 2, { steps: 4 });
        await page.waitForTimeout(1400);
        const read = (w) =>
            page.evaluate(
                async ([id, w, process_room]) => {
                    const stage = document.querySelector("[data-testid=wi8-stage]");
                    stage.style.marginInline = "auto";
                    stage.style.maxInlineSize = w + "px";
                    const two = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))));
                    await two();
                    const d = document.querySelector(`[data-testid=${id}]`);
                    const run = d.querySelector(".dock-layers > .dock-run");
                    const fitsFlag = d.hasAttribute("data-run-fits");
                    const wholeFlag = run.hasAttribute("data-run-whole");
                    // the reading the flag must equal: the seats' layout span against the uncapped client box
                    const kids = [...run.children].filter((c) => c instanceof HTMLElement && c.offsetParent !== null && !c.hasAttribute("data-dock-leaving"));
                    const first = Math.min(...kids.map((c) => c.offsetLeft)), last = Math.max(...kids.map((c) => c.offsetLeft + c.offsetWidth));
                    const span = last - first;
                    if (wholeFlag) run.removeAttribute("data-run-whole");
                    const cw = run.clientWidth;
                    if (wholeFlag) run.setAttribute("data-run-whole", "");
                    // RU-50's room: the run's host's content box less the run's margins and border (no box the flag styles)
                    const hs = getComputedStyle(run.parentElement), rs = getComputedStyle(run), px = (x) => parseFloat(x) || 0;
                    const room = Math.floor(run.parentElement.clientWidth - px(hs.paddingLeft) - px(hs.paddingRight) - px(rs.marginLeft) - px(rs.marginRight) - px(rs.borderLeftWidth) - px(rs.borderRightWidth) + 0.01);
                    return { w, span, cw, room, fitsFlag, wholeFlag, truthClient: span <= cw, truth: process_room ? span <= room : span <= cw, dock: +d.getBoundingClientRect().width.toFixed(2), expanded: d.classList.contains("expanded") };
                },
                [cellId, w, LAW === "room"],
            );
        // coarse: down from 420 until the flag flips
        let flip = null, prev = null;
        for (let w = 420; w >= 200; w--) {
            const r = await read(w);
            if (prev && prev.fitsFlag && !r.fitsFlag) { flip = w; break; }
            prev = r;
        }
        out.flip = flip;
        if (flip != null) {
            const ws = [];
            for (let w = flip - 3; w <= flip + 3; w++) ws.push(w);
            const seq = [...ws, ...[...ws].reverse()];
            const byW = {};
            for (const [k, w] of seq.entries()) {
                const r = await read(w);
                r.dir = k < ws.length ? "up" : "down";
                out.steps.push(r);
                if (!r.expanded) out.bad.push(`${w} ${r.dir}: the dock folded`);
                if (r.fitsFlag !== r.truth) out.bad.push(`${w} ${r.dir}: fits ${r.fitsFlag} but span ${r.span} against ${LAW === "room" ? "room " + r.room : "client " + r.cw}`);
                if (r.wholeFlag === r.fitsFlag) out.bad.push(`${w} ${r.dir}: whole ${r.wholeFlag} with fits ${r.fitsFlag}`);
                (byW[w] ||= []).push(r.fitsFlag);
            }
            for (const [w, fl] of Object.entries(byW)) if (new Set(fl).size > 1) out.dirBad.push(`${w}: ${fl.join(" / ")}`);
        } else out.bad.push("no flip found between 420 and 200 px");
        out.pass = !out.bad.length && !out.dirBad.length;
    } finally {
        await ctx.close();
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m6-sweep-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, flip: out.flip, pass: out.pass, bad: out.bad.slice(0, 6), dirBad: out.dirBad }));
}
