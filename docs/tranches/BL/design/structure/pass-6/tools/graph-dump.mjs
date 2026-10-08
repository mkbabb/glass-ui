#!/usr/bin/env node
// graph-dump.mjs --root <tree> --out <file.json> — pass 6 · the graph a tree's own landed
// floor (scripts/structure) reads, as sorted sets: every edge (from, kind, via, to | external,
// spec), every violation and every census row (line numbers dropped: they move with any edit
// above them). Two dumps of one commit under two floors diff by `graph-diff.mjs`.
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const { buildGraph } = await import(pathToFileURL(join(root, "scripts/structure/lib/graph.mjs")).href);
const g = buildGraph(root);
const edge = (e) => [e.from, e.kind, e.via, e.to ?? e.external ?? "", e.spec ?? ""].join(" | ");
const row = (v) => [v.kind, v.from, v.spec ?? "", v.target ?? "", v.base ?? ""].join(" | ");
const doc = { root, edges: g.edges.map(edge).sort(), violations: g.violations.map(row).sort(), census: g.census.map(row).sort() };
writeFileSync(resolve(arg("--out")), `${JSON.stringify(doc, null, 1)}\n`);
console.log(JSON.stringify({ edges: doc.edges.length, violations: doc.violations.length, census: doc.census.length }));
