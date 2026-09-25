#!/usr/bin/env node
// p3r1a.mjs — P3-R1(a) on a migrated tree: no kernel entry re-exports a file outside the
// global zone. For every entry whose source is in the global zone (lib/law.mjs GLOBAL_ROOTS),
// every exported name is traced to its origin files (F-1's symbol origins); an origin outside
// the global zone is a violation. Read-only.
//   node tools/p3r1a.mjs <migrated tree>
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.argv[2]);
const lib = (p) => import(pathToFileURL(join(root, "scripts/structure", p)).href);
// the floor runtime through its door (S20), the route's law beside the gate (S19)
const { buildGraph, makeOrigins } = await lib("lib/index.mjs");
const { inGlobal } = await lib("seal/law.mjs");
const g = buildGraph(root);
const O = makeOrigins(g);
let kernel = 0, names = 0;
const bad = [];
for (const [name, src] of g.record.js) {
    if (!inGlobal(src)) continue;
    kernel++;
    for (const [n, os] of O.exportsOf(src)) { names++; for (const o of os) if (!inGlobal(o.file)) bad.push(`./${name} ${n} <- ${o.file}`); }
}
console.log(JSON.stringify({ kernelEntries: kernel, names, outside: bad.length, bad: bad.slice(0, 20) }));
process.exitCode = bad.length ? 1 : 0;
