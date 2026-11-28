// probe-v8.mjs <engine> <out.json> <name>=<url> ...
// M1 and M2 on Witness.vue: the vertical strip in a narrow box and beside a paragraph; the
// selected tab of a strip that scrolls, at load (each frame from mount), after the box is
// widened and narrowed back, after it narrows while scrolling, after a choice made from
// code, after the reader pans away, after a press on a half-shown tab, and in a detented
// Sheet's header at open; and a choice from code under reduced motion.
// One browser per run, a context per cell and build, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium, webkit } = require("playwright");
const [engineName, out, ...specs] = process.argv.slice(2);
const builds = specs.map((s) => { const i = s.indexOf("="); return { name: s.slice(0, i), url: s.slice(i + 1) }; });
const engine = engineName === "webkit" ? webkit : chromium;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CELLS = [
    { name: "390t", viewport: { width: 390, height: 844 }, touch: true, motion: "no-preference" },
    { name: "1440", viewport: { width: 1440, height: 900 }, touch: false, motion: "no-preference" },
    { name: "390t-reduce", viewport: { width: 390, height: 844 }, touch: true, motion: "reduce" },
];
const rec = { engine: engineName, rows: [] };
const row = (r) => { rec.rows.push(r); console.log(JSON.stringify(r)); };

// The selected tab of the strip in `id`: how much of it lies inside the strip's box, and
// how far its ends lie from the strip's padding edges (the ring's room).
const sel = (page, id) => page.evaluate((id) => {
    const strip = document.querySelector(`[data-testid="${id}"] .segmented-tabs`);
    const sr = strip.getBoundingClientRect();
    const tab = strip.querySelector(".segmented-tab[data-active]");
    const tr = tab.getBoundingClientRect();
    const ind = strip.querySelector(".segmented-indicator").getBoundingClientRect();
    const br = document.querySelector(`[data-testid="${id}"]`).getBoundingClientRect();
    const over = (l, r) => Math.round((Math.max(0, Math.min(tr.right, r) - Math.max(tr.left, l)) / tr.width) * 100) / 100;
    const vis = over(sr.left, sr.right);
    const r1 = (v) => Math.round(v * 10) / 10;
    return {
        tab: tab.textContent.trim(), stripW: r1(sr.width), flag: strip.hasAttribute("data-overflow"),
        ox: getComputedStyle(strip).overflowX, sl: r1(strip.scrollLeft), max: strip.scrollWidth - strip.clientWidth,
        selVisible: vis, inBox: over(br.left, br.right), onScreen: over(0, innerWidth), roomL: r1(tr.left - sr.left), roomR: r1(sr.right - tr.right),
        indOnTab: Math.abs(ind.left - tr.left) < 1.5 && Math.abs(ind.width - tr.width) < 1.5,
    };
}, id);

// Frames: [ms since the first, scrollLeft] where the offset changes, plus the first and last.
const squeeze = (fr) => {
    const t0 = fr[0]?.t ?? 0;
    const outv = [];
    fr.forEach((f, i) => { if (i === 0 || i === fr.length - 1 || f.sl !== fr[i - 1].sl) outv.push([f.t - t0, f.sl, f.flag ? 1 : 0, i]); });
    return outv;
};
const framesOf = (page, id, n = 40) => page.evaluate(([id, n]) => window.__frames(`[data-testid="${id}"]`, n), [id, n]);

try {
    var browser = await engine.launch({ headless: true });
    rec.version = browser.version();
    for (const cell of CELLS) {
        for (const b of builds) {
            const touch = cell.touch;
            const context = await browser.newContext({ viewport: cell.viewport, hasTouch: touch, isMobile: touch && engineName === "chromium", deviceScaleFactor: 2, colorScheme: "light", reducedMotion: cell.motion });
            try {
                const page = await context.newPage();
                await page.goto(b.url + "/sci.html", { waitUntil: "load" });
                const loadFrames = await page.evaluate(() => window.__loadFrames);
                await page.evaluate(() => document.fonts.ready);
                await sleep(1000);
                if (cell.motion === "no-preference") {
                    // ── M1: the vertical strip in a 100 px box (the critic's reading) and beside a paragraph ──
                    const v = await page.evaluate(() => {
                        const box = document.querySelector('[data-testid="vert-narrow"]');
                        const strip = box.querySelector(".segmented-tabs");
                        const sr = strip.getBoundingClientRect();
                        let textRight = -Infinity, worst = null;
                        for (const tab of strip.querySelectorAll(".segmented-tab")) {
                            const g = document.createRange();
                            g.selectNodeContents(tab);
                            const r = g.getBoundingClientRect();
                            if (r.right > textRight) { textRight = r.right; worst = { label: tab.textContent.trim(), tabW: tab.offsetWidth, textW: Math.round(r.width * 10) / 10, textPastTab: Math.round((r.right - tab.getBoundingClientRect().right) * 10) / 10 }; }
                        }
                        const cs = getComputedStyle(strip);
                        return { boxW: box.getBoundingClientRect().width, stripW: Math.round(sr.width * 10) / 10, maxW: cs.maxWidth, minW: cs.minWidth, flag: strip.hasAttribute("data-overflow"), ox: cs.overflowX, textPastStrip: Math.round((textRight - sr.right) * 10) / 10, textPastBox: Math.round((textRight - box.getBoundingClientRect().right) * 10) / 10, worst };
                    });
                    row({ cell: cell.name, build: b.name, case: "vert-narrow", ...v });
                    const vr = await page.evaluate(() => {
                        const box = document.querySelector('[data-testid="vert-row"]');
                        const strip = box.querySelector(".segmented-tabs");
                        const p = box.querySelector("p");
                        const lh = parseFloat(getComputedStyle(p).lineHeight) || 20;
                        return { stripW: Math.round(strip.getBoundingClientRect().width * 10) / 10, flag: strip.hasAttribute("data-overflow"), pW: Math.round(p.getBoundingClientRect().width * 10) / 10, pLines: Math.round(p.getBoundingClientRect().height / lh), boxSW: box.scrollWidth, boxCW: box.clientWidth };
                    });
                    row({ cell: cell.name, build: b.name, case: "vert-row", ...vr });
                }

                // ── M2: the last tab selected at load ──
                row({ cell: cell.name, build: b.name, case: "sel-last at load", ...(await sel(page, "sel-last")), frames: squeeze(loadFrames) });
                const box = (w) => page.evaluate((w) => { document.querySelector('[data-testid="sel-last"]').style.inlineSize = w + "px"; }, w);
                await box(1200);
                await sleep(700);
                row({ cell: cell.name, build: b.name, case: "sel-last widened to 1200", ...(await sel(page, "sel-last")) });
                const fBack = framesOf(page, "sel-last", 45);
                await box(267);
                const back = await fBack;
                await sleep(400);
                row({ cell: cell.name, build: b.name, case: "sel-last back to 267", ...(await sel(page, "sel-last")), frames: squeeze(back) });
                const fNarrow = framesOf(page, "sel-last", 45);
                await box(200);
                const narrow = await fNarrow;
                await sleep(400);
                row({ cell: cell.name, build: b.name, case: "sel-last narrowed to 200 while scrolling", ...(await sel(page, "sel-last")), frames: squeeze(narrow) });

                // ── M2: a choice made from code, then the reader pans away ──
                row({ cell: cell.name, build: b.name, case: "sel-prog at load (first chosen)", ...(await sel(page, "sel-prog")) });
                let f = framesOf(page, "sel-prog", 45);
                await page.evaluate(() => window.__prog("facilities"));
                let fr = await f;
                await sleep(400);
                row({ cell: cell.name, build: b.name, case: "sel-prog: code chooses the last", ...(await sel(page, "sel-prog")), frames: squeeze(fr) });
                await page.evaluate(() => document.querySelector('[data-testid="sel-prog"] .segmented-tabs').scrollTo({ left: 0, behavior: "instant" }));
                await sleep(800);
                row({ cell: cell.name, build: b.name, case: "sel-prog: panned back to 0 by script, 800 ms later", ...(await sel(page, "sel-prog")) });
                f = framesOf(page, "sel-prog", 45);
                await page.evaluate(() => window.__prog("transportation"));
                fr = await f;
                await sleep(400);
                row({ cell: cell.name, build: b.name, case: "sel-prog: code chooses Transportation", ...(await sel(page, "sel-prog")), frames: squeeze(fr) });

                if (cell.motion === "no-preference") {
                    // ── a press on the tab the strip's right edge cuts ──
                    await page.evaluate(() => { const el = document.querySelector('[data-testid="plain-over"]'); window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 300, behavior: "instant" }); });
                    await sleep(300);
                    const cut = await page.evaluate(() => {
                        const strip = document.querySelector('[data-testid="plain-over"] .segmented-tabs');
                        const sr = strip.getBoundingClientRect();
                        // The edge that cuts a tab: the strip's own where it scrolls, else its box's.
                        const edge = Math.min(sr.right, strip.parentElement.getBoundingClientRect().right, innerWidth);
                        const tabs = [...strip.querySelectorAll(".segmented-tab")];
                        const i = tabs.findIndex((t) => t.getBoundingClientRect().right > edge - 1);
                        if (i < 0) return null;
                        const r = tabs[i].getBoundingClientRect();
                        return { i, label: tabs[i].textContent.trim(), x: Math.min(r.left + 12, edge - 8), y: r.top + r.height / 2, flag: strip.hasAttribute("data-overflow") };
                    });
                    if (!cut) throw new Error("no cut tab in plain-over");
                    f = framesOf(page, "plain-over", 45);
                    if (touch && engineName === "chromium") await page.touchscreen.tap(cut.x, cut.y);
                    else await page.mouse.click(cut.x, cut.y);
                    fr = await f;
                    await sleep(400);
                    row({ cell: cell.name, build: b.name, case: `plain-over: press on the cut tab (${cut.label})`, pressed: cut.label, ...(await sel(page, "plain-over")), frames: squeeze(fr) });

                    // ── the Sheet's header strip whose last tab is chosen, at open ──
                    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
                    f = framesOf(page, "hdr-last", 60);
                    await page.click('[data-testid="open-sheet"]');
                    fr = await f;
                    await sleep(900);
                    const firstSeen = fr.findIndex((x) => x.sl !== null);
                    row({ cell: cell.name, build: b.name, case: "sheet hdr-last at open", ...(await sel(page, "hdr-last")), firstSeen, frames: squeeze(fr.slice(Math.max(0, firstSeen))) });
                }
                await page.close();
            } finally {
                await context.close();
            }
        }
    }
} finally {
    await browser?.close();
    writeFileSync(out, JSON.stringify(rec, null, 1));
}
