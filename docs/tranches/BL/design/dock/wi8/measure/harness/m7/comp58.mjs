// comp58.mjs <port> <tag> [--engine chromium|webkit] [--host h]: MEASURE-7, RU-58's census line (G-13): in glass's ten
// compositions every icon seat's glyph box is the share (`--dock-icon-glyph-ratio`) times the layer height
// (`--dock-layer-height`), floored at `--dock-icon-glyph-floor`, within 0.5 px. Each page open (`open=1`), at 1440 fine and
// 390 coarse, flat ground, light. An icon seat is a `.dock-icon-button` whose only element child is its glyph (svg, img,
// picture or [data-dock-glyph]); DarkModeToggle's dock seat is read the same way (its svg). A seat with a word, or a
// glyph inside a site's own wrapper, is not an icon seat here (RU-55's proportion and the site's own size).
// One browser, a context per cell, closed in finally. Log: logs/m7-comp58-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const HOST = val("--host", "127.0.0.1");
const PAGES = "nav,chrome,rail,figure-tools,dials,canvas-tools,transport,pager,corner-controls,action-row".split(",");
const out = { engine, cells: {}, bad: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) {
        for (const pg of PAGES) {
            const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
            const key = `${coarse ? "390 coarse" : "1440 fine"} ${pg}`;
            try {
                const page = await ctx.newPage();
                await page.goto(`http://${HOST}:${port}/?c=dock-comp&page=${pg}&ground=flat&open=1`);
                await page.waitForSelector("[data-story-stage] .glass-dock", { timeout: 60000 });
                await page.waitForTimeout(1500);
                const rows = await page.evaluate(() => {
                    const res = [];
                    for (const d of document.querySelectorAll("[data-story-stage] .glass-dock")) {
                        const probe = (v) => { const p = document.createElement("div"); p.style.cssText = `position:absolute;visibility:hidden;block-size:${v};inline-size:0`; d.appendChild(p); const h = p.getBoundingClientRect().height; p.remove(); return h; };
                        const share = parseFloat(getComputedStyle(d).getPropertyValue("--dock-icon-glyph-ratio")) || null;
                        const layer = probe("var(--dock-layer-height)");
                        const floor = probe("var(--dock-icon-glyph-floor, 1rem)");
                        const want = Math.max(layer * (share ?? 0.9), floor);
                        const seats = [...d.querySelectorAll(".dock-icon-button, .dark-mode-toggle-button")].filter((s) => s.getClientRects().length && s.children.length === 1 && s.children[0].matches("svg, img, picture, [data-dock-glyph]") && !s.textContent.trim());
                        for (const s of seats) {
                            const g = s.children[0].getBoundingClientRect();
                            res.push({ dock: d.getAttribute("aria-label"), seat: s.getAttribute("aria-label") || s.className.split(" ")[0], cls: s.children[0].getAttribute("class") || "", share, glyph: [+g.width.toFixed(2), +g.height.toFixed(2)], want: +want.toFixed(2) });
                        }
                    }
                    return res;
                });
                out.cells[key] = rows;
                for (const x of rows) if (Math.abs(x.glyph[0] - x.want) > 0.5 || Math.abs(x.glyph[1] - x.want) > 0.5) out.bad.push(`${key} ${x.dock} ${x.seat}: glyph ${x.glyph.join("x")} against ${x.want} (${x.cls.slice(0, 40)})`);
            } catch (e) {
                out.bad.push(`${key}: ${String(e).slice(0, 120)}`);
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    if (browser) await browser.close();
    out.pass = !out.bad.length;
    writeFileSync(new URL(`../../logs/m7-comp58-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, tag, pass: out.pass, seats: Object.values(out.cells).flat().length, bad: out.bad.length, first: out.bad.slice(0, 8) }));
}
