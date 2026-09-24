#!/usr/bin/env node
// scc-per-move.mjs <tree> — FD-2 measured one move at a time: pass 1 of the placement
// fixpoint (R-2 units, the FD-1 publication anchor), and for each proposed move alone, the
// co-cyclic module pairs it would add (the image graph under that one move). Run with the
// tree's own floor: node scc-per-move.mjs <tree> [floor dir, default <tree>/scripts/structure]
import { join, resolve } from "node:path";
const root = resolve(process.argv[2]);
const F = resolve(process.argv[3] ?? join(root, "scripts/structure"));
const { buildGraph, countBy } = await import(join(F, "lib/graph.mjs"));
const { sccGrowth } = await import(join(F, "lib/move.mjs"));
const { dirUnits, placeAll, proposedPath, publicationAnchor } = await import(join(F, "lib/placement.mjs"));
const g = buildGraph(root);
const p = placeAll(g, dirUnits(), { zones: ["src"], anchor: publicationAnchor(g) });
const proposed = p.rows.filter((r) => r.class === "move" || r.class === "global").map((r) => ({ from: r.file, to: proposedPath(g.tree, r), class: r.class }));
const claims = countBy(proposed, "to");
const moves = proposed.filter((m) => !(claims[m.to] > 1 || g.tree.isFile(m.to)));
const image = (M) => ({ edges: g.edges.map((e) => ({ ...e, from: M.file(e.from), to: e.to && !e.dir ? M.file(e.to) : e.to })), tree: { files: g.tree.files.map(M.file) } });
const mapOf = (list) => { const fm = new Map(list.map((m) => [m.from, m.to])); return { fileMap: fm, file: (x) => fm.get(x) ?? x, dir: (d) => d }; };
const all = sccGrowth(g, image(mapOf(moves)), mapOf(moves));
console.log(JSON.stringify({ moves: moves.length, together: { before: all.before, after: all.after, addedPairs: all.addedPairs } }));
for (const m of moves) {
    const M = mapOf([m]);
    const r = sccGrowth(g, image(M), M);
    console.log(`${String(r.addedPairs).padStart(4)}  ${m.class.padEnd(6)} ${m.from} → ${m.to}${r.addedPairs ? `   e.g. ${r.firstAdded[0].join(" ↔ ")}` : ""}`);
}
