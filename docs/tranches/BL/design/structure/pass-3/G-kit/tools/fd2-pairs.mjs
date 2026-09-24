#!/usr/bin/env node
// fd2-pairs.mjs — FD-2 across a row (LAW.md L0.3). A row edits text, so the F-2 engine's FD-2
// stop never sees it; this is the same stop for rows. `--save` writes the tree's co-cyclic
// module pairs (static moduleSccs over src and demo, G's unit function); `--against` compares
// the tree with a saved set and exits 1 when any pair was added (a pair whose module a row
// deleted is read through no rename: rows move no file).
//   node fd2-pairs.mjs --root <wt> --save <pairs.json>
//   node fd2-pairs.mjs --root <wt> --against <pairs.json>
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const { moduleSccs } = await import(`${root}/scripts/structure/lib/graph.mjs`);
const L = await import(`${root}/scripts/structure/eponym/law.mjs`);
const ctx = L.context(root);
const sccs = moduleSccs(ctx.g, { moduleOf: L.gUnits(ctx).unitOf });
const pairs = [];
for (const c of sccs) { const ms = [...new Set(c)].sort(); for (let i = 0; i < ms.length; i++) for (let j = i + 1; j < ms.length; j++) pairs.push(`${ms[i]} ↔ ${ms[j]}`); }
const doc = { sccs: sccs.length, members: sccs.reduce((n, c) => n + c.length, 0), pairs: pairs.sort() };
if (opt("--save")) { writeFileSync(opt("--save"), `${JSON.stringify(doc, null, 1)}\n`); console.log(JSON.stringify({ saved: opt("--save"), sccs: doc.sccs, members: doc.members, pairs: pairs.length })); }
if (opt("--against")) {
    const before = new Set(JSON.parse(readFileSync(opt("--against"), "utf8")).pairs);
    const added = pairs.filter((p) => !before.has(p));
    console.log(JSON.stringify({ sccs: doc.sccs, members: doc.members, pairs: pairs.length, before: before.size, added }));
    process.exit(added.length ? 1 : 0);
}
