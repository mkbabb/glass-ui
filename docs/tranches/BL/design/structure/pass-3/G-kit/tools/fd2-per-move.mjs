#!/usr/bin/env node
// fd2-per-move.mjs — FD-2 measured one move at a time, under G's unit function (LAW.md L0.3):
// for each move of a list, alone, the co-cyclic module pairs it would add on the image graph.
//   node fd2-per-move.mjs <list.json> --root <tree>
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const { sccGrowth } = await import(`${root}/scripts/structure/lib/move.mjs`);
const L = await import(`${root}/scripts/structure/eponym/law.mjs`);
const ctx = L.context(root);
const { unitOf } = L.gUnits(ctx);
const moves = JSON.parse(readFileSync(args[0], "utf8")).moves;
const mapOf = (list) => { const fm = new Map(list.map((m) => [m.from, m.to])); return { fileMap: fm, file: (x) => fm.get(x) ?? x, dir: (d) => d }; };
const image = (M) => ({ edges: ctx.g.edges.map((e) => ({ ...e, from: M.file(e.from), to: e.to && !e.dir ? M.file(e.to) : e.to })), tree: { files: ctx.T.files.map(M.file) } });
const all = sccGrowth(ctx.g, image(mapOf(moves)), mapOf(moves), { moduleOf: unitOf });
console.log(JSON.stringify({ moves: moves.length, together: { before: all.before, after: all.after, addedPairs: all.addedPairs } }));
for (const m of moves) {
    const M = mapOf([m]);
    const r = sccGrowth(ctx.g, image(M), M, { moduleOf: unitOf });
    console.log(`${String(r.addedPairs).padStart(4)}  ${m.from} → ${m.to}${r.addedPairs ? `   e.g. ${r.firstAdded.map((p) => p.join(" ↔ ")).join("; ")}` : ""}`);
}
