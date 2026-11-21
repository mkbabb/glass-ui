// ru61read.mjs <port> <tag> [--engine chromium|webkit] [--cells w-atlas,w-inflow,w-kf,w-kfs]: S7's first reading
// (RU-84: "the legend's 28 px is read against the anchored edge's arithmetic before it is cured"). Each cell at 1440 by
// 900, light, fine pointer: the dock opened by hover. Every animation frame from 100 ms before the open to 1.5 s after
// reads the dock root's layout box (offsetLeft and offsetWidth up the offset chain, so no carry translate counts), its
// inline margins as computed, its posture class and [data-morphing], and each watched neighbour's layout box. Printed
// per cell: the folded and open root boxes, the open width less the folded width (what the open posture adds, dw), the
// margins the carrier wrote, the root's start and end edges against the folded box (the anchored edge's arithmetic:
// with `anchor="end"` the end edge should hold and the start edge move by dw), and each neighbour's largest move with
// the frame it happened in. One browser, a context per cell, closed in finally. Output: logs/s8-ru61-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const WATCH = {
    "w-atlas": { dock: "w-atlas", watch: ["w-atlas-title", "w-atlas-legend", "w-atlas-link", "w-atlas-table", "w-atlas-row"] },
    "w-inflow": { dock: "w-inflow", watch: ["w-inflow-beside", "w-inflow-below"] },
    "w-kf": { dock: "w-kf", watch: ["w-kf-play"] },
    "w-kfs": { dock: "w-kf", watch: ["w-kf-play"] },
};
const CELLS = val("--cells", "w-atlas,w-inflow,w-kf,w-kfs").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, cells: {} };
let browser;
try {
    browser = engine === "webkit"
        ? await pw.webkit.launch({ headless: true, executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await pw.chromium.launch({ headless: true });
    for (const cell of CELLS) {
        const w = WATCH[cell];
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}`, { waitUntil: "load" });
            await page.waitForSelector(`[data-testid=${w.dock}]`, { timeout: 30000 });
            await page.mouse.move(2, 2);
            await sleep(1200);
            await page.evaluate(({ dock, watch }) => {
                const box = (el) => { let x = 0, y = 0; for (let n = el; n; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return [x, x + el.offsetWidth, y, y + el.offsetHeight]; };
                const d = document.querySelector(`[data-testid=${dock}]`);
                window.__f = [];
                window.__on = true;
                const t0 = performance.now();
                const tick = () => {
                    const cs = getComputedStyle(d);
                    const row = { t: +(performance.now() - t0).toFixed(1), open: d.classList.contains("expanded"), morphing: d.hasAttribute("data-morphing"), root: box(d), ms: cs.marginInlineStart, me: cs.marginInlineEnd, n: {} };
                    for (const id of watch) { const e = document.querySelector(`[data-testid=${id}]`); if (e) row.n[id] = box(e); }
                    window.__f.push(row);
                    if (window.__on) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }, w);
            await sleep(100);
            const b = await page.locator(`[data-testid=${w.dock}]`).boundingBox();
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
            await sleep(1500);
            const frames = await page.evaluate(() => { window.__on = false; return window.__f; });
            const first = frames[0], last = frames[frames.length - 1];
            const dw = (last.root[1] - last.root[0]) - (first.root[1] - first.root[0]);
            const moves = {};
            for (const id of w.watch) {
                if (!first.n[id]) continue;
                let worst = 0, at = null;
                for (const f of frames) {
                    const q = f.n[id]; if (!q) continue;
                    const m = Math.max(Math.abs(q[0] - first.n[id][0]), Math.abs(q[1] - first.n[id][1]), Math.abs(q[2] - first.n[id][2]));
                    if (m > worst) { worst = m; at = f.t; }
                }
                moves[id] = { largest: +worst.toFixed(2), atMs: at, rest: last.n[id].map((v, i) => +(v - first.n[id][i]).toFixed(2)) };
            }
            const opened = frames.find((f) => f.open);
            out.cells[cell] = {
                frames: frames.length,
                folded: { root: first.root, ms: first.ms, me: first.me },
                firstOpenFrame: opened ? { t: opened.t, root: opened.root, ms: opened.ms, me: opened.me } : null,
                open: { root: last.root, ms: last.ms, me: last.me },
                dw: +dw.toFixed(2),
                startEdgeMoved: +(last.root[0] - first.root[0]).toFixed(2),
                endEdgeMoved: +(last.root[1] - first.root[1]).toFixed(2),
                moves,
                trace: frames.filter((f, i) => i < 4 || (opened && Math.abs(f.t - opened.t) < 60)).map((f) => ({ t: f.t, open: f.open, root: f.root, ms: f.ms, me: f.me, n: Object.fromEntries(Object.entries(f.n).map(([k, v]) => [k, [v[0], v[1]]])) })),
            };
        } catch (e) {
            out.cells[cell] = { error: String(e).slice(0, 300) };
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser?.close();
}
console.log(JSON.stringify(Object.fromEntries(Object.entries(out.cells).map(([k, v]) => [k, v.error ?? { dw: v.dw, start: v.startEdgeMoved, end: v.endEdgeMoved, ms: v.open?.ms, me: v.open?.me, moves: Object.fromEntries(Object.entries(v.moves).map(([i, m]) => [i, m.largest])) }]))));
writeFileSync(new URL(`../../logs/s8-ru61-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
