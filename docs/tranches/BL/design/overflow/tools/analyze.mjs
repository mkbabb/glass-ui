#!/usr/bin/env node
// analyze.mjs <raw-dir> [--tag base] [--out faults.json]
// Folds the probe's rows (<tag>.<engine>.<cell>.json) into fault rows, one per distinct
// box signature (its path with the data-ovf keys dropped) and class:
//   a-scroller   a box that pans sideways (overflow-x auto|scroll, scrollWidth > clientWidth)
//                where the design means no horizontal strip
//   a-spill      a box whose content paints past its side (overflow-x visible), excess >= 2
//   a-clipped    content wider than a box that clips it (no ellipsis), excess >= 2
//   a-edge       a box past the viewport's side that no ancestor clips
//   b-vertical   a vertical swipe (straight or with 16 px drift) changed some scrollLeft
//   b-horizontal a horizontal swipe panned a box the design does not mean to pan
//   c-page       the document is wider than the viewport, or the window pans sideways
// Each row carries every cell it was seen in, with the numbers.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
const opt = Object.fromEntries(process.argv.slice(3).reduce((a, v, i, all) => (v.startsWith("--") && a.push([v.slice(2), all[i + 1]]), a), []));
const tag = opt.tag || "base";
const files = readdirSync(dir).filter((f) => f.startsWith(tag + ".") && f.endsWith(".json"));
const sig = (s) => (s || "").replace(/#[-\w]+/g, "#id").replace(/\[data-ovf=\d+\]/g, "");
const faults = new Map();
function add(cls, part, el, route, cellId, step, nums) {
    const k = `${cls}|${part}|${sig(el)}`;
    if (!faults.has(k)) faults.set(k, { cls, part, el: sig(el), seen: [] });
    faults.get(k).seen.push({ route, cell: cellId, step, ...nums });
}
for (const f of files) {
    const run = JSON.parse(readFileSync(join(dir, f), "utf8"));
    const cellId = `${run.engine}:${run.cell}`;
    for (const r of run.routes) {
        for (const s of r.steps) {
            const step = s.trigger ? `${s.step}:${s.trigger}` : s.step;
            const m = s.m;
            // The cell's own width: under isMobile innerWidth grows to a page that is too wide.
            const VW = parseInt(run.cell, 10);
            if (m.docSW > VW + 1 || m.pagePan > 0) add("c-page", "document", "html", r.route, cellId, step, { docSW: m.docSW, vw: VW, innerWidth: m.vw, pagePan: m.pagePan });
            for (const b of m.boxes) {
                if (b.ellipsis) continue;
                if (b.kind === "scroller" && !b.designed) add("a-scroller", b.part, b.el, r.route, cellId, step, { sw: b.sw, cw: b.cw, excess: b.excess, ox: b.ox, oy: b.oy, breakers: b.breakers.slice(0, 2) });
                else if (b.kind === "spill" && b.excess >= 2) add("a-spill", b.part, b.el, r.route, cellId, step, { sw: b.sw, cw: b.cw, excess: b.excess, breakers: b.breakers.slice(0, 2) });
                else if (b.kind === "clipped" && b.excess >= 2) add("a-clipped", b.part, b.el, r.route, cellId, step, { sw: b.sw, cw: b.cw, excess: b.excess, ox: b.ox, breakers: b.breakers.slice(0, 2) });
            }
            for (const e of m.edge) add("a-edge", e.part, e.el, r.route, cellId, step, { left: e.left, right: e.right, vw: m.vw, fixed: e.fixed, text: e.text });
            for (const g of s.gestures || []) {
                if (!g.moved) continue;
                const cls = g.gesture === "horizontal" ? "b-horizontal" : "b-vertical";
                for (const mv of g.moved) add(cls, mv.part, mv.el, r.route, cellId, step, { gesture: g.gesture, d: mv.d, sw: mv.sw, cw: mv.cw, target: sig(g.target.el), designed: g.target.designed });
            }
        }
    }
}
const rows = [...faults.values()].map((f) => {
    const routes = [...new Set(f.seen.map((s) => s.route))];
    const cells = [...new Set(f.seen.map((s) => s.cell))];
    return { ...f, routes, cells, n: f.seen.length };
});
rows.sort((a, b) => a.cls.localeCompare(b.cls) || b.n - a.n);
if (opt.out) writeFileSync(opt.out, JSON.stringify(rows, null, 1));
for (const r of rows) {
    const ex = r.seen.map((s) => s.excess ?? s.d ?? s.right ?? s.docSW).filter((x) => x !== undefined);
    console.log(`${r.cls.padEnd(12)} n=${String(r.n).padStart(3)} part=${r.part} max=${ex.length ? Math.max(...ex.map(Math.abs)) : "-"} cells=${r.cells.join(",")}\n   ${r.el}\n   routes: ${r.routes.slice(0, 8).join(" ")}${r.routes.length > 8 ? ` +${r.routes.length - 8}` : ""}`);
}
