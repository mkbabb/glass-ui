#!/usr/bin/env node
// floor-cycles.mjs --root <tree> — the P5-F1 plant's reader: file-grain cycles among the
// floor's own runtime, read by the tree's own F-1 graph. The floor is `scripts/structure/`
// once row fd11 has landed it, else its docs home. Value edges only (the kinds B4 and
// valueSccs read, type-only excluded; the floor is .mjs, so it has none). Prints every SCC
// and exits 1 when there is one.
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const home = existsSync(join(root, "scripts/structure/lib/graph.mjs")) ? "scripts/structure" : "docs/tranches/BL/design/structure/floor";
const { buildGraph, tarjan, VALUE_KINDS } = await import(pathToFileURL(join(root, home, "lib/graph.mjs")).href);
const g = buildGraph(root);
const inFloor = (f) => f.startsWith(`${home}/`) && !/\/(rows|plants|samples)\//.test(f);
const adj = new Map();
let edges = 0;
for (const e of g.edges) {
    if (!VALUE_KINDS.has(e.kind) || e.typeOnly || !e.to || e.dir || !inFloor(e.from) || !inFloor(e.to)) continue;
    (adj.get(e.from) ?? adj.set(e.from, new Set()).get(e.from)).add(e.to);
    edges++;
}
const sccs = tarjan(adj);
console.log(JSON.stringify({ floor: home, files: g.tree.files.filter(inFloor).length, valueEdges: edges, sccs: sccs.length }));
for (const c of sccs) console.log(`CYCLE ${c.join(" ↔ ")}`);
process.exit(sccs.length ? 1 : 0);
