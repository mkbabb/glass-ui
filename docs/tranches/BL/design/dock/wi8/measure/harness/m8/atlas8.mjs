// atlas8.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-8, the atlas session's cell (w-atlas-preset). One figure
// plate 375 px wide (the viewport 375 by 812, the stage's padding taken off so the plate is the viewport's width), title,
// legend, legend link and the tools seat as lt-integ's ChartFrame lays them, with PlateDock's dock moved onto
// ControlsDock (corner="top-end", within="parent", expand-on="hover", Table and Filters its two controls). Both schemes;
// a fine pointer (hover opens it, the pointer then leaves) and a coarse one (a tap on the folded face opens it, the
// finger lifts). Read: the folded dock's box (the plate's), the open dock's at rest (1.2 s after it opened) and while it
// lingers (0.4 s after the pointer left, fine; 0.6 s after the lift with nothing else pressed, coarse), each against the
// title's, the legend's and the legend link's boxes: the overlap in px² each; and every neighbour's box (title, legend,
// link, the plate's body, the plate itself) before the dock opens and at each read, the largest shift in px.
// Two parents for within="parent": PlateDock's own seat (position: relative) kept in the head row's tools slot, and
// the figure plate itself (&parent=plate, the tools slot gone). Each read also lists the dock's seats past its plate or
// past the figure plate's edge.
// One browser, a context per cell, closed in finally. Log: logs/m8-atlas-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = { engine, cells: {} };
// titleText: the title's words (a Range over its text), beside its block box
const NB = { title: "w-atlas-preset-title", legend: "w-atlas-preset-legend", link: "w-atlas-preset-link", body: "w-atlas-preset-body", plate: "w-atlas-plate" };
const READ = (NB) => {
    const box = (id) => { const e = document.querySelector(`[data-testid=${id}]`); if (!e) return null; const r = e.getBoundingClientRect(); return [+r.left.toFixed(2), +r.top.toFixed(2), +r.right.toFixed(2), +r.bottom.toFixed(2)]; };
    const d = document.querySelector("[data-testid=w-atlas-preset]");
    const plate = d?.querySelector(".dock-plate") ?? d;
    const r = plate?.getBoundingClientRect();
    return {
        posture: d ? (d.classList.contains("collapsed") ? "folded" : d.classList.contains("expanded") ? "open" : "rest") : "absent",
        morphing: d?.hasAttribute("data-morphing") ?? false,
        dock: r ? [+r.left.toFixed(2), +r.top.toFixed(2), +r.right.toFixed(2), +r.bottom.toFixed(2)] : null,
        nb: { ...Object.fromEntries(Object.entries(NB).map(([k, id]) => [k, box(id)])), titleText: (() => { const e = document.querySelector("[data-testid=w-atlas-preset-title]"); if (!e) return null; const rg = document.createRange(); rg.selectNodeContents(e); const r = rg.getBoundingClientRect(); return [+r.left.toFixed(2), +r.top.toFixed(2), +r.right.toFixed(2), +r.bottom.toFixed(2)]; })() },
        position: d ? getComputedStyle(d).position : null,
        seats: d ? [...d.querySelectorAll("[data-glass-dock-seat], .dock-icon-button")].map((e) => { const q = e.getBoundingClientRect(); return [+q.left.toFixed(1), +q.top.toFixed(1), +q.right.toFixed(1), +q.bottom.toFixed(1)]; }).filter((b) => b[2] > b[0]) : [],
        viewport: innerWidth,
    };
};
const overlap = (p, q) => (p && q ? Math.max(0, Math.min(p[2], q[2]) - Math.max(p[0], q[0])) * Math.max(0, Math.min(p[3], q[3]) - Math.max(p[1], q[1])) : null);
const judge = (base, s) => {
    const ov = Object.fromEntries(["title", "titleText", "legend", "link"].map((k) => [k, +(overlap(s.dock, s.nb[k]) ?? 0).toFixed(1)]));
    const shifts = Object.fromEntries(Object.keys(NB).map((k) => [k, base.nb[k] && s.nb[k] ? +Math.max(...s.nb[k].map((v, i) => Math.abs(v - base.nb[k][i]))).toFixed(2) : null]));
    const fig = s.nb.plate;
    const past = s.seats.filter((b) => (s.dock && (b[0] < s.dock[0] - 0.5 || b[2] > s.dock[2] + 0.5)) || (fig && (b[0] < fig[0] - 0.5 || b[2] > fig[2] + 0.5)));
    return { posture: s.posture, morphing: s.morphing, dock: s.dock, seats: s.seats, seatsPastPlateOrFigure: past.length, overlapPx2: ov, shiftPx: shifts, maxShift: Math.max(...Object.values(shifts).filter((x) => x != null)) };
};
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    // two parents: PlateDock's own seat kept in the tools slot (seat), and the figure plate itself (plate)
    for (const parent of ["seat", "plate"]) for (const scheme of ["light", "dark"]) for (const pointer of ["fine", "coarse"]) {
        const key = `${parent}-${scheme}-${pointer}`;
        const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, colorScheme: scheme, ...(pointer === "coarse" ? (engine === "chromium" ? { hasTouch: true, isMobile: true } : { hasTouch: true }) : {}) });
        try {
            const p = await ctx.newPage();
            await p.addInitScript(() => addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.textContent = `[data-cell="w-atlas-preset"] { padding: 0 !important; align-items: stretch !important; } .wi8-plate { inline-size: 375px !important; }`; document.head.appendChild(st); }));
            await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-atlas-preset${parent === "plate" ? "&parent=plate" : ""}${scheme === "dark" ? "&scheme=dark" : ""}`);
            await p.waitForSelector("[data-testid=w-atlas-preset]", { timeout: 60000 });
            if (scheme === "dark") await p.evaluate(() => document.documentElement.classList.add("dark"));
            await p.mouse.move(2, 790).catch(() => {});
            await sleep(1500);
            const base = await p.evaluate(READ, NB);
            const cell = { schemeRead: await p.evaluate(() => (document.documentElement.classList.contains("dark") ? "dark" : "light")), plateWidth: base.nb.plate ? +(base.nb.plate[2] - base.nb.plate[0]).toFixed(2) : null, position: base.position, folded: judge(base, base) };
            // the largest shift while it opens: each neighbour's box every frame from the press for 1.2 s
            await p.evaluate(({ NB, base }) => {
                window.__atl = { max: {}, frames: 0 };
                const t0 = performance.now();
                const tick = () => {
                    for (const [k, id] of Object.entries(NB)) { const e = document.querySelector(`[data-testid=${id}]`); if (!e || !base[k]) continue; const r = e.getBoundingClientRect(); const m = Math.max(Math.abs(r.left - base[k][0]), Math.abs(r.top - base[k][1]), Math.abs(r.right - base[k][2]), Math.abs(r.bottom - base[k][3])); window.__atl.max[k] = Math.max(window.__atl.max[k] ?? 0, +m.toFixed(2)); }
                    window.__atl.frames++;
                    if (performance.now() - t0 < 1200) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }, { NB, base: base.nb });
            const face = await p.evaluate(() => { const d = document.querySelector("[data-testid=w-atlas-preset]"); const f = d.querySelector(".dock-layer--summary") ?? d; const r = f.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
            if (pointer === "fine") { await p.mouse.move(face[0] - 6, face[1] + 2); await p.mouse.move(face[0], face[1], { steps: 3 }); }
            else await p.touchscreen.tap(face[0], face[1]);
            await sleep(1200);
            cell.openRest = judge(base, await p.evaluate(READ, NB));
            cell.whileOpening = await p.evaluate(() => window.__atl);
            if (pointer === "fine") { await p.mouse.move(face[0], 790, { steps: 3 }); await sleep(400); }
            else await sleep(600);
            cell.openLinger = judge(base, await p.evaluate(READ, NB));
            out.cells[key] = cell;
            console.log(key, JSON.stringify({ plateWidth: cell.plateWidth, folded: [cell.folded.dock, cell.folded.overlapPx2], openRest: [cell.openRest.posture, cell.openRest.dock, cell.openRest.overlapPx2, cell.openRest.maxShift, "seats past " + cell.openRest.seatsPastPlateOrFigure], openLinger: [cell.openLinger.posture, cell.openLinger.overlapPx2, cell.openLinger.maxShift], whileOpening: cell.whileOpening }));
        } catch (e) {
            out.cells[key] = { error: String(e).slice(0, 300) };
            console.log(key, "error", String(e).slice(0, 200));
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m8-atlas-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
