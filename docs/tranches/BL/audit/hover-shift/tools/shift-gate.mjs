#!/usr/bin/env node
// shift-gate.mjs <url> [--engine chromium|webkit] [--cell fine|touch390] [--root <css>]
//                [--cap N] [--no-press] [--json out.json]
//
// Release gate: hovering, focusing or pressing a component must not move a layout box.
// Loads ONE url, takes every interactive or state-styled element in the root region
// (default #demo-main, else <body>), drives it through hover, away, keyboard focus, blur,
// press, release and away, and compares the layout box of every measured element
// (offsetLeft/Top/Width/Height up the offset-parent chain, plus computed border widths,
// padding, margin, font-weight, font-size, line-height, and scroll-container client size)
// against rest. Transforms are allowed and only reported. A release (click) may change
// content; there only a computed state-style change on the target counts.
// Exit 0 = no shift; 1 = shift(s), listed; 2 = the page did not load.
// Run per route, under the guard, one at a time:
//   ~/.claude/guard/guarded --timeout 10 -- node shift-gate.mjs http://127.0.0.1:5441/components/card
import { writeFileSync } from "node:fs";
import { withBrowser, withContext, CELLS, exercise, classify, gotoRoute } from "./lib.mjs";

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const url = args.find((a) => /^https?:/.test(a));
if (!url) { console.error("usage: shift-gate.mjs <url> [--engine chromium] [--cell fine] [--root sel] [--cap N] [--no-press] [--json f]"); process.exit(2); }
const engine = flag("--engine", "chromium");
const cell = CELLS[flag("--cell", "fine")];
const rootSel = flag("--root", null);
const CAP = Number(flag("--cap", 200));
const press = !args.includes("--no-press");
const jsonOut = flag("--json", null);
const u = new URL(url);

let code = 0;
const report = { url, engine, cell: flag("--cell", "fine"), shifts: [], moves: [], exercised: 0 };
try {
    await withBrowser(engine, (b) => withContext(b, engine, cell, async (P) => {
        if (rootSel) await P.context.addInitScript((s) => { window.__HS_ROOT = s; }, rootSel);
        try { await gotoRoute(P, u.origin, u.pathname + u.search); }
        catch (e) { console.error("page did not load:", e.message); code = 2; return; }
        const cands = (await P.page.evaluate(() => window.__hs.candidates())).slice(0, CAP);
        for (const c of cands) {
            const res = await exercise(P, c, { crops: false, press });
            const cl = await classify(P.page, c, res);
            report.exercised++;
            for (const s of cl.shifts) report.shifts.push({ target: c.label, state: s.state, items: s.items, adds: s.adds, scroll: !!s.scroll, culprits: s.culprits });
            for (const m of cl.moves) if (m.rel === "target") report.moves.push({ target: c.label, state: m.state, dR: m.dR, overlap: m.overlap });
            if (res.states?.navigated) await gotoRoute(P, u.origin, u.pathname + u.search);
        }
    }));
} catch (e) { console.error("gate error:", e.message); code = 2; }
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(report, null, 1));
if (code === 0 && report.shifts.length) code = 1;
console.log(`shift-gate ${url} [${engine} ${report.cell}] exercised=${report.exercised} shifts=${report.shifts.length} transforms=${report.moves.length}`);
for (const s of report.shifts) {
    const what = s.items.slice(0, 4).map((i) => `${i.rel}:${i.kind === "box" ? "box " + i.detail.dO.join("/") : i.detail.join("; ")}`).join(" | ");
    console.log(`  SHIFT ${s.state} ${s.target} -> ${what}${s.adds.length ? " +in-flow " + s.adds.map((a) => a.label).join(",") : ""}${s.scroll ? " +scrollbar/scroll-size" : ""}`);
    for (const c of s.culprits.slice(0, 2)) for (const r of c.rules.slice(0, 2)) console.log(`      rule ${r.sel} { ${r.decls.join("; ")} }`);
}
const over = report.moves.filter((m) => m.overlap?.length);
for (const m of over) console.log(`  OVERLAP ${m.state} ${m.target} transform ${m.dR.join("/")} over ${m.overlap.length} neighbour(s)`);
process.exit(code);
