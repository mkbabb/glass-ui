// probe2.mjs <engine> <out.json> <name>=<url> ...: static readings of the vertical strip in a
// narrow box and of an overflowing strip whose last tab is selected at load and after a resize.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium, webkit } = require("playwright");
const [engineName, out, ...specs] = process.argv.slice(2);
const builds = specs.map((s) => { const i = s.indexOf("="); return { name: s.slice(0, i), url: s.slice(i + 1) }; });
const engine = engineName === "webkit" ? webkit : chromium;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CELLS = [
    { name: "390t", viewport: { width: 390, height: 844 }, touch: true },
    { name: "1440", viewport: { width: 1440, height: 900 }, touch: false },
];
const rec = { engine: engineName, rows: [] };
const row = (r) => { rec.rows.push(r); console.log(JSON.stringify(r)); };
try {
    var browser = await engine.launch({ headless: true });
    for (const cell of CELLS) {
        for (const b of builds) {
            const context = await browser.newContext({ viewport: cell.viewport, hasTouch: cell.touch, isMobile: cell.touch && engineName === "chromium", deviceScaleFactor: 2, colorScheme: "light", reducedMotion: "no-preference" });
            try {
                const page = await context.newPage();
                await page.goto(b.url + "/sci.html", { waitUntil: "load" });
                await page.evaluate(() => document.fonts.ready);
                await sleep(1000);
                const v = await page.evaluate(() => {
                    const box = document.querySelector('[data-testid="vert-narrow"]');
                    const strip = box.querySelector(".segmented-tabs");
                    const sr = strip.getBoundingClientRect();
                    let textRight = -Infinity, worst = null;
                    for (const tab of strip.querySelectorAll(".segmented-tab")) {
                        const g = document.createRange();
                        g.selectNodeContents(tab);
                        const r = g.getBoundingClientRect();
                        if (r.right > textRight) { textRight = r.right; worst = { label: tab.textContent.trim(), tabW: tab.offsetWidth, textW: Math.round(r.width * 10) / 10 }; }
                    }
                    return { boxW: box.getBoundingClientRect().width, stripW: Math.round(sr.width * 10) / 10, flag: strip.hasAttribute("data-overflow"), ox: getComputedStyle(strip).overflowX, textPastStrip: Math.round((textRight - sr.right) * 10) / 10, textPastBox: Math.round((textRight - box.getBoundingClientRect().right) * 10) / 10, worst };
                });
                row({ cell: cell.name, build: b.name, case: "vert-narrow", ...v });
                const sel = () => page.evaluate(() => {
                    const box = document.querySelector('[data-testid="sel-last"]');
                    const strip = box.querySelector(".segmented-tabs");
                    const sr = strip.getBoundingClientRect();
                    const tab = strip.querySelector(".segmented-tab[data-active]");
                    const tr = tab.getBoundingClientRect();
                    const ind = strip.querySelector(".segmented-indicator").getBoundingClientRect();
                    const vis = Math.max(0, Math.min(tr.right, sr.right) - Math.max(tr.left, sr.left)) / tr.width;
                    return { stripW: Math.round(sr.width), flag: strip.hasAttribute("data-overflow"), sl: Math.round(strip.scrollLeft), selVisible: Math.round(vis * 100) / 100, selLeftInStrip: Math.round(tr.left - sr.left), indLeftInStrip: Math.round(ind.left - sr.left) };
                });
                row({ cell: cell.name, build: b.name, case: "sel-last at load", ...(await sel()) });
                await page.evaluate(() => { document.querySelector('[data-testid="sel-last"]').style.inlineSize = "1200px"; });
                await sleep(700);
                row({ cell: cell.name, build: b.name, case: "sel-last widened to 1200", ...(await sel()) });
                await page.evaluate(() => { document.querySelector('[data-testid="sel-last"]').style.inlineSize = "267px"; });
                await sleep(900);
                row({ cell: cell.name, build: b.name, case: "sel-last back to 267", ...(await sel()) });
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
