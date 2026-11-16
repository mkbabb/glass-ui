// census7.mjs <port> <tag> [--engine chromium|webkit] [--host h]: MEASURE-7, G-13's two census lines (the final
// ready list; RU-55, RU-58, RU-65) on w-glyphs, at 1440 fine and 390 coarse, at each share 0.5 to 0.9
// (`--dock-icon-glyph-ratio` on each dock root):
//   seat    every seat's block extent equals `--dock-control-size` (read from a probe box inside the dock), 0.5 px
//   glyph   every unsized glyph box, in each of the four forms: in an icon seat holding only the glyph,
//           max(share x `--dock-layer-height`, `--dock-icon-glyph-floor`); beside a word (a tab seat, or o1's labelled
//           icon seat), 1.5 em of the seat's font size; both sides within 0.5 px.
// One browser, a context per cell, closed in finally. Log: logs/m7-census-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const HOST = val("--host", "127.0.0.1");
const out = { engine, cells: {}, bad: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) {
        const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=w-glyphs`);
            await page.waitForSelector("[data-testid=w-glyphs-tab]");
            await page.waitForTimeout(800);
            for (const share of [0.5, 0.6, 0.7, 0.8, 0.9]) {
                const r = await page.evaluate(async (share) => {
                    const rows = [];
                    for (const id of ["w-glyphs-icon", "w-glyphs-tab"]) {
                        const d = document.querySelector(`[data-testid=${id}]`);
                        d.style.setProperty("--dock-icon-glyph-ratio", String(share));
                        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                        const probe = (v) => { const p = document.createElement("div"); p.style.cssText = `position:absolute;visibility:hidden;block-size:${v};inline-size:0`; d.appendChild(p); const h = p.getBoundingClientRect().height; p.remove(); return h; };
                        const control = probe("var(--dock-control-size)");
                        const layer = probe("var(--dock-layer-height)");
                        const floor = probe("var(--dock-icon-glyph-floor, 1rem)");
                        for (const seat of d.querySelectorAll("[data-glyph]")) {
                            const g = seat.querySelector(":scope > :is(svg, img, picture, [data-dock-glyph])");
                            const gb = g.getBoundingClientRect();
                            const worded = seat.hasAttribute("data-worded");
                            const fs = parseFloat(getComputedStyle(seat).fontSize);
                            const want = worded ? 1.5 * fs : Math.max(layer * share, floor);
                            rows.push({ dock: id, seat: seat.getAttribute("aria-label") || seat.textContent.trim(), form: seat.getAttribute("data-glyph"), worded, seatH: +seat.getBoundingClientRect().height.toFixed(2), control: +control.toFixed(2), glyph: [+gb.width.toFixed(2), +gb.height.toFixed(2)], want: +want.toFixed(2) });
                        }
                    }
                    return rows;
                }, share);
                const key = `${coarse ? "390 coarse" : "1440 fine"} share ${share}`;
                out.cells[key] = r;
                for (const x of r) {
                    if (Math.abs(x.seatH - x.control) > 0.5) out.bad.push(`${key} ${x.dock} ${x.seat}: seat ${x.seatH} against control ${x.control}`);
                    if (Math.abs(x.glyph[0] - x.want) > 0.5 || Math.abs(x.glyph[1] - x.want) > 0.5) out.bad.push(`${key} ${x.dock} ${x.seat} (${x.form}${x.worded ? ", worded" : ""}): glyph ${x.glyph.join("x")} against ${x.want}`);
                }
            }
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    out.pass = !out.bad.length;
    writeFileSync(new URL(`../../logs/m7-census-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, tag, pass: out.pass, bad: out.bad.length, first: out.bad.slice(0, 8) }));
}
