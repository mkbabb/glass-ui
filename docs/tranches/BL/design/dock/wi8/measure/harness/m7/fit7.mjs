// fit7.mjs <port> <tag> [--engine chromium|webkit] [--host h]: MEASURE-7, RU-54's cells. One browser, a context per
// cell, closed in finally. Log: logs/m7-fit-<tag>.<engine>.json.
//   sweep   RU-39's sweep (m6/sweep.mjs) on w-many, its clause restated by RU-54 (C6-M1): the flag at each width is
//           the same in both directions and equals `span <= port` read at rest (the run's client box as the dock left
//           it); the lifted read (cap lifted, inset as left) is printed beside it.
//   rest    at the sweep's flip width and on each side, 2 s with nothing happening: writes of the fit flag, the
//           whole-seat flag and the inset (MutationObserver), which must be 0.
//   pwords  the capped dock whose #persistent seat changes width (C6-M8): at each stage cap from 6 px over the short
//           word's natural width down 56 px under it by 2, the word made longer and shorter again; at each read the flag against the lifted
//           read and the rest read. The cell must cross the fit edge on the word's change alone.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const HOST = val("--host", "127.0.0.1");
const out = { engine, sweep: null, rest: null, pwords: null };
const READ = async ([id]) => {
    const two = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))));
    await two();
    const d = document.querySelector(`[data-testid=${id}]`);
    const run = d.querySelector(".dock-layers > .dock-run");
    const fitsFlag = d.hasAttribute("data-run-fits");
    const wholeFlag = run.hasAttribute("data-run-whole");
    const kids = [...run.children].filter((c) => c instanceof HTMLElement && c.offsetParent !== null && !c.hasAttribute("data-dock-leaving"));
    const first = Math.min(...kids.map((c) => c.offsetLeft)), last = Math.max(...kids.map((c) => c.offsetLeft + c.offsetWidth));
    const span = last - first;
    const rest = run.clientWidth;
    if (wholeFlag) run.removeAttribute("data-run-whole");
    const lifted = run.clientWidth;
    if (wholeFlag) run.setAttribute("data-run-whole", "");
    const pers = d.querySelector(".dock-persistent:not(.dock-persistent-end)");
    return { span, rest, lifted, fitsFlag, wholeFlag, inset: d.style.getPropertyValue("--dock-curve-inset") || "", pers: pers ? pers.offsetWidth : null, dock: +d.getBoundingClientRect().width.toFixed(2), expanded: d.classList.contains("expanded") };
};
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    const cell = async (id, fn) => {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=${id}`);
            await page.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 });
            await page.waitForSelector(`[data-testid=${id}]`);
            await page.waitForTimeout(500);
            return await fn(page);
        } catch (e) {
            return { error: String(e).slice(0, 300) };
        } finally {
            await ctx.close();
        }
    };
    const capTo = (page, w) => page.evaluate((w) => { const s = document.querySelector("[data-testid=wi8-stage]"); s.style.marginInline = "auto"; s.style.maxInlineSize = w + "px"; }, w);
    // sweep and rest, on w-many opened by hover
    const sw = await cell("w-many", async (page) => {
        const s = await page.locator("[data-testid=w-many] .dock-layer--summary").boundingBox();
        await page.mouse.move(s.x + s.width / 2, s.y + s.height / 2, { steps: 4 });
        await page.waitForTimeout(1400);
        const read = async (w) => { await capTo(page, w); return page.evaluate(READ, ["w-many"]); };
        let flip = null, prev = null;
        for (let w = 420; w >= 200; w--) {
            const r = await read(w);
            if (prev && prev.fitsFlag && !r.fitsFlag) { flip = w; break; }
            prev = r;
        }
        const res = { flip, steps: [], bad: [], dirBad: [] };
        if (flip == null) { res.bad.push("no flip between 420 and 200 px"); return { sweep: res, rest: null }; }
        const ws = []; for (let w = flip - 3; w <= flip + 3; w++) ws.push(w);
        const byW = {};
        for (const [k, w] of [...ws, ...[...ws].reverse()].entries()) {
            const r = await read(w);
            r.w = w; r.dir = k < ws.length ? "up" : "down";
            res.steps.push(r);
            if (!r.expanded) res.bad.push(`${w} ${r.dir}: the dock folded`);
            if (r.fitsFlag !== r.span <= r.rest) res.bad.push(`${w} ${r.dir}: fits ${r.fitsFlag}, span ${r.span}, port at rest ${r.rest}`);
            (byW[w] ||= []).push(r.fitsFlag);
        }
        for (const [w, fl] of Object.entries(byW)) if (new Set(fl).size > 1) res.dirBad.push(`${w}: ${fl.join(" / ")}`);
        res.pass = !res.bad.length && !res.dirBad.length;
        const rest = [];
        for (const w of [flip - 1, flip, flip + 1]) {
            await capTo(page, w);
            await page.waitForTimeout(700);
            const r = await page.evaluate(async () => {
                const d = document.querySelector("[data-testid=w-many]"), run = d.querySelector(".dock-layers > .dock-run");
                let n = 0;
                const ins = (x) => ((x || "").match(/--dock-curve-inset:\s*([^;]+)/) || [])[1] || "";
                const mo = new MutationObserver((ms) => { for (const m of ms) if (m.attributeName !== "style" || ins(m.oldValue) !== ins(m.target.getAttribute("style"))) n++; });
                mo.observe(d, { attributes: true, attributeFilter: ["data-run-fits", "style"], attributeOldValue: true });
                mo.observe(run, { attributes: true, attributeFilter: ["data-run-whole"] });
                await new Promise((r) => setTimeout(r, 2000));
                mo.disconnect();
                return n;
            });
            rest.push({ w, writes: r });
        }
        return { sweep: res, rest: { cells: rest, pass: rest.every((x) => x.writes === 0) } };
    });
    out.sweep = sw.sweep ?? sw; out.rest = sw.rest ?? null;
    // pwords
    out.pwords = await cell("w-pwords", async (page) => {
        const natural = Math.ceil(await page.evaluate(() => document.querySelector("[data-testid=w-pwords]").getBoundingClientRect().width));
        const res = { natural, reads: [], bad: [], crossed: 0 };
        const press = async () => { await page.locator("[data-testid=w-pwords-longer]").click(); await page.waitForTimeout(500); };
        // The stage pads its content by 8 px a side, so a stage of natural + 16 holds the dock at its natural width.
        for (let w = natural + 22; w >= natural - 40; w -= 2) {
            await capTo(page, w);
            await page.waitForTimeout(400);
            const r0 = await page.evaluate(READ, ["w-pwords"]);
            await press();
            const r1 = await page.evaluate(READ, ["w-pwords"]);
            await press();
            const r2 = await page.evaluate(READ, ["w-pwords"]);
            for (const [k, r] of [["short", r0], ["long", r1], ["short again", r2]]) {
                res.reads.push({ w, k, ...r });
                if (r.fitsFlag !== r.span <= r.lifted) res.bad.push(`${w} ${k}: fits ${r.fitsFlag}, span ${r.span}, lifted ${r.lifted}, persistent ${r.pers}`);
            }
            if (r0.fitsFlag !== r1.fitsFlag) res.crossed++;
        }
        res.pass = !res.bad.length && res.crossed > 0;
        return res;
    });
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m7-fit-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, tag, sweep: out.sweep && { flip: out.sweep.flip, pass: out.sweep.pass, bad: out.sweep.bad?.slice(0, 4), dirBad: out.sweep.dirBad }, rest: out.rest, pwords: out.pwords && { natural: out.pwords.natural, crossed: out.pwords.crossed, pass: out.pwords.pass, bad: out.pwords.bad?.slice(0, 4), error: out.pwords.error } }));
}
