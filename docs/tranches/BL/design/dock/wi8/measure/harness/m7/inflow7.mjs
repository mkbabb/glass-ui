// inflow7.mjs <port> <tag> [--engine chromium|webkit] [--host h] [--shots dir]: MEASURE-7 step 6, RU-61's gate on its
// prototype cells (w-inflow, w-atlas, w-kf, w-kfs, w-dk), at 1440 fine (opened by hover, then the pointer leaves:
// the linger) and 390 coarse (opened by a tap on the folded face). Every frame from before the open to 1.5 s after:
//   shift   each neighbour's layout box (w-inflow: beside, below; w-atlas: title, legend, below) and the dock's own
//           persistent seat (w-atlas: Table; w-kf, w-kfs: Play; w-dk: Play) against its box before the open, largest
//           move; RU-61's gate: 0.25 px or less on hover, focus and tap (focus: Tab onto the folded face at 1440)
//   cover   with the dock open and settled: the px of each neighbour under the open plate (box intersection), and
//           whether a focusable element lies under the plate (a 6 px grid of elementsFromPoint, the dock's own
//           subtree excluded); printed, not gated (the owner's, question 14)
// One browser, a context per cell, closed in finally. Log: logs/m7-inflow-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const HOST = val("--host", "127.0.0.1");
const SHOTS = val("--shots", null);
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const CELLS = {
    "w-inflow": { dock: "w-inflow", watch: ["w-inflow-beside", "w-inflow-below"] },
    "w-atlas": { dock: "w-atlas", watch: ["w-atlas-title", "w-atlas-legend", "w-atlas-below", "w-atlas-table"] },
    "w-kf": { dock: "w-kf", watch: ["w-kf-play"] },
    "w-kfs": { dock: "w-kf", watch: ["w-kf-play"] },
    "w-dk": { dock: "w-dk", watch: ["w-dk-play"] },
};
const out = { engine, cells: {}, bad: [] };
let browser;
const ARM = (watch) => {
    window.__boxes = [];
    window.__arm = () => {
        const els = watch.map((id) => [id, document.querySelector(`[data-testid=${id}]`)]);
        const t0 = performance.now();
        const tick = () => {
            const row = { t: performance.now() - t0 };
            for (const [id, e] of els) if (e) { const r = e.getBoundingClientRect(); row[id] = [r.left, r.top, r.width, r.height]; }
            window.__boxes.push(row);
            if (performance.now() - t0 < 4000) requestAnimationFrame(tick);
        };
        tick();
    };
};
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const [cell, spec] of Object.entries(CELLS)) {
        for (const mode of ["hover", "focus", "tap"]) {
            const coarse = mode === "tap";
            const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(coarse ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
            try {
                const page = await ctx.newPage();
                await page.goto(`http://${HOST}:${port}/?c=dock-wi8&cell=${cell}`);
                await page.waitForSelector(`[data-testid=${spec.dock}]`);
                await page.waitForTimeout(900);
                await page.evaluate(ARM, spec.watch);
                const face = page.locator(`[data-testid=${spec.dock}] .dock-layer--summary`).first();
                const fb = await face.boundingBox();
                if (!fb) { out.cells[`${cell} ${mode}`] = { error: "no folded face" }; continue; }
                await page.mouse.move(2, 2);
                await page.evaluate(() => window.__arm());
                await page.waitForTimeout(150);
                if (mode === "hover") { await page.mouse.move(fb.x - 6, fb.y + fb.height / 2); await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2, { steps: 4 }); }
                else if (mode === "focus") {
                    for (let i = 0; i < 8; i++) {
                        await page.keyboard.press("Tab");
                        if (await page.evaluate((id) => document.querySelector(`[data-testid=${id}]`).contains(document.activeElement), spec.dock)) break;
                    }
                }
                else await page.touchscreen.tap(fb.x + fb.width / 2, fb.y + fb.height / 2);
                await page.waitForTimeout(1500);
                const open = await page.evaluate((id) => document.querySelector(`[data-testid=${id}]`).classList.contains("expanded"), spec.dock);
                // the cover, open and settled
                const cover = await page.evaluate(({ id, watch }) => {
                    const d = document.querySelector(`[data-testid=${id}]`);
                    const plate = d.querySelector(":scope > .dock-plate") ?? d;
                    const p = plate.getBoundingClientRect();
                    const under = {};
                    for (const w of watch) { const e = document.querySelector(`[data-testid=${w}]`); if (!e || d.contains(e)) continue; const r = e.getBoundingClientRect(); const x = Math.max(0, Math.min(p.right, r.right) - Math.max(p.left, r.left)), y = Math.max(0, Math.min(p.bottom, r.bottom) - Math.max(p.top, r.top)); under[w] = +(x * y).toFixed(0); }
                    const focusables = new Set();
                    for (let x = p.left + 2; x < p.right - 1; x += 6) for (let y = p.top + 2; y < p.bottom - 1; y += 6) for (const e of document.elementsFromPoint(x, y)) { if (d.contains(e)) continue; const f = e.closest("a[href], button, input, select, textarea, [tabindex]:not([tabindex='-1'])"); if (f && !d.contains(f)) focusables.add(f.getAttribute("data-testid") || f.tagName); }
                    return { plate: [p.left, p.top, p.width, p.height].map((v) => +v.toFixed(1)), under, focusables: [...focusables] };
                }, { id: spec.dock, watch: spec.watch });
                if (SHOTS && mode !== "focus") await page.screenshot({ path: `${SHOTS}/${tag}-${engine}-${cell}-${mode}.png` });
                // the linger: the pointer leaves (fine) and the dock folds
                if (!coarse) { await page.mouse.move(2, 2); await page.waitForTimeout(2500); }
                const boxes = await page.evaluate(() => window.__boxes);
                const b0 = boxes[0] ?? {};
                const moves = {};
                for (const w of spec.watch) {
                    let worst = 0;
                    for (const r of boxes) { const A = b0[w], B = r[w]; if (!A || !B) continue; worst = Math.max(worst, ...A.map((v, i) => Math.abs(B[i] - v))); }
                    moves[w] = +worst.toFixed(2);
                }
                const worst = Math.max(0, ...Object.values(moves));
                const res = { open, frames: boxes.length, moves, worst, cover, pass: open && worst <= 0.25 };
                out.cells[`${cell} ${mode}`] = res;
                if (!res.pass) out.bad.push(`${cell} ${mode}: ${open ? "" : "did not open; "}largest move ${worst} px (${JSON.stringify(moves)})`);
            } catch (e) {
                out.cells[`${cell} ${mode}`] = { error: String(e).slice(0, 200) };
                out.bad.push(`${cell} ${mode}: ${String(e).slice(0, 120)}`);
            } finally {
                await ctx.close();
            }
        }
    }
} finally {
    if (browser) await browser.close();
    out.pass = !out.bad.length;
    writeFileSync(new URL(`../../logs/m7-inflow-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
    console.log(JSON.stringify({ engine, tag, pass: out.pass, bad: out.bad.slice(0, 12), cover: Object.fromEntries(Object.entries(out.cells).map(([k, v]) => [k, v.cover && { under: v.cover.under, focusables: v.cover.focusables }])) }));
}
