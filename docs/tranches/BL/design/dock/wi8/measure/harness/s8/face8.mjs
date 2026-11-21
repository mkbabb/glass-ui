// face8.mjs <port> <tag> [--engine chromium|webkit]: S5's folded-face line (RU-76 as amended for R7-8 and RU-87), G-13's
// composition line extended to folded faces. On dock-comp's pages (the compositions of m6/comp, m7/comp and m8/comp,
// flat ground, light) at 1440 by 900 fine and 390 by 844 coarse, 1.5 s after load with the pointer away: every docked
// folded face (`.glass-dock.collapsed .dock-layer--summary`) and its direct glyph (`> :is(svg, img, picture)`), the
// glyph's box against `--dock-control-glyph-size` read from a probe inside the same dock (the share times the layer
// height, floored). A glyph carrying a size class (h-*, w-*, size-*) is the site's size and is listed apart; a face
// with no direct glyph (a composed face, words, a progress bar) is listed as read and not judged. The line: every
// unsized direct glyph within 0.5 px of the probe on both sides. One browser, a context per cell, closed in finally.
// Output: logs/s8-face-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const PAGES = ["nav", "chrome", "rail", "figure-tools", "canvas-tools", "transport", "pager", "corner-controls", "action-row", "pill"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, rows: [], fails: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) {
        for (const pg of PAGES) {
            const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light", ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
            try {
                const page = await ctx.newPage();
                await page.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=${pg}&ground=flat`);
                await page.waitForSelector("[data-story-stage] .glass-dock", { timeout: 60000 });
                await page.mouse.move(2, 2);
                await sleep(1500);
                const rows = await page.evaluate(() => [...document.querySelectorAll("[data-story-stage] .glass-dock")].map((d) => {
                    const face = d.querySelector(":scope .dock-layer--summary");
                    const folded = d.classList.contains("collapsed");
                    const g = face?.querySelector(":scope > :is(svg, img, picture)") ?? null;
                    const p = document.createElement("div");
                    p.style.cssText = "position:absolute;visibility:hidden;block-size:var(--dock-control-glyph-size);inline-size:0";
                    d.appendChild(p);
                    const want = p.getBoundingClientRect().height;
                    p.remove();
                    const r = g?.getBoundingClientRect();
                    const cls = g ? (g.getAttribute("class") || "") : "";
                    return {
                        dock: d.getAttribute("aria-label"),
                        folded,
                        face: face ? (g ? g.tagName.toLowerCase() : face.firstElementChild ? `composed (${face.firstElementChild.tagName.toLowerCase()}.${(face.firstElementChild.getAttribute("class") || "").split(" ")[0]})` : "empty") : "none",
                        sized: /(^|\s)(h|w|size)-\S+/.test(cls),
                        cls: cls.slice(0, 60),
                        box: r ? [+r.width.toFixed(2), +r.height.toFixed(2)] : null,
                        want: +want.toFixed(2),
                    };
                }));
                for (const r of rows) {
                    const row = { page: pg, pointer: coarse ? "coarse 390" : "fine 1440", ...r };
                    row.judged = r.folded && !!r.box && !r.sized;
                    row.pass = row.judged ? Math.abs(r.box[0] - r.want) <= 0.5 && Math.abs(r.box[1] - r.want) <= 0.5 : null;
                    out.rows.push(row);
                    if (row.pass === false) out.fails.push(`${pg} ${row.pointer} ${r.dock}: ${r.box} against ${r.want}`);
                }
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    await browser?.close();
}
out.summary = { read: out.rows.length, judged: out.rows.filter((r) => r.judged).length, pass: out.rows.filter((r) => r.pass === true).length, fail: out.fails.length, sized: out.rows.filter((r) => r.folded && r.sized).map((r) => `${r.page} ${r.pointer} ${r.dock}`), notJudged: out.rows.filter((r) => !r.judged && !r.sized).map((r) => `${r.page} ${r.pointer} ${r.dock}: ${r.folded ? r.face : "rests open"}`) };
const L = new URL("../../logs/", import.meta.url).pathname;
writeFileSync(`${L}s8-face-${tag}.${engine}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.summary), out.fails.slice(0, 12));
