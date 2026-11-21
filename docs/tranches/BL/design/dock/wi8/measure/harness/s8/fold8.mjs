// fold8.mjs <port> <tag> [--engine chromium|webkit]: S3's read (RU-79). Each ControlsDock cell of dock-wi8.vue at 1440 by
// 900 and 390 by 844 (fine pointer, light), 1.5 s after load with the pointer away: the dock's posture class, its
// controls (the run's children, the mark and DockSeparator aside), and its box. RU-79: two or more controls rest
// folded at every width, one control rests open and never folds. One browser, a context per cell, closed in finally.
// Output: logs/s8-fold-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const CELLS = ["w-ctl", "w-ctl1", "w-ctl-own", "w-ctl-mix", "w-ctlout", "w-fourier", "w-daraksha", "w-sci", "w-ctl6", "w-kfcode"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, rows: [] };
let browser;
try {
    browser = engine === "webkit"
        ? await pw.webkit.launch({ headless: true, executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await pw.chromium.launch({ headless: true });
    for (const [w, h] of [[1440, 900], [390, 844]]) {
        for (const cell of CELLS) {
            const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light" });
            try {
                const page = await ctx.newPage();
                await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}`, { waitUntil: "load" });
                await page.waitForSelector(`[data-testid=${cell}]`, { timeout: 30000 });
                await page.mouse.move(2, 2);
                await sleep(1500);
                const r = await page.evaluate((cell) => {
                    const d = document.querySelector(`[data-testid=${cell}]`);
                    const run = d.querySelector(".dock-run");
                    const controls = run ? [...run.children].filter((c) => !c.classList.contains("dock-run-mark") && !c.classList.contains("dock-separator")).length : null;
                    const b = (d.querySelector(".dock-plate") ?? d).getBoundingClientRect();
                    return { collapsed: d.classList.contains("collapsed"), expanded: d.classList.contains("expanded"), alwaysExpanded: d.classList.contains("always-expanded"), controls, box: [Math.round(b.width), Math.round(b.height)] };
                }, cell);
                const want = r.controls === 1 ? "open" : "folded";
                const got = r.collapsed ? "folded" : "open";
                out.rows.push({ cell, viewport: w, ...r, want, got, ok: want === got });
            } catch (e) {
                out.rows.push({ cell, viewport: w, error: String(e).slice(0, 200) });
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    await browser?.close();
}
out.summary = { rows: out.rows.length, ok: out.rows.filter((r) => r.ok).length, wrong: out.rows.filter((r) => r.ok === false).map((r) => `${r.cell}@${r.viewport}`) };
console.log(JSON.stringify(out.summary));
writeFileSync(new URL(`../../logs/s8-fold-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
