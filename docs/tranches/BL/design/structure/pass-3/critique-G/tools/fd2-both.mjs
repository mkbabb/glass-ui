#!/usr/bin/env node
// fd2-both.mjs — FD-2's static module SCCs on one tree under two unit functions: the floor's
// R-2 `dirUnits` (the reading FD-2 was specified in, P3-F2) and G's L0.3 `gUnits` (doors and
// tests as nodes of their own). Also counts parent↔child dir cycles among the pairs.
//   node fd2-both.mjs --root <tree> [--eponym <tree with scripts/structure/eponym>]
import { resolve } from "node:path";
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const ep = resolve(opt("--eponym") ?? root);
const { moduleSccs } = await import(`${root}/scripts/structure/lib/graph.mjs`);
const { dirUnits } = await import(`${root}/scripts/structure/lib/placement.mjs`);
const L = await import(`${ep}/scripts/structure/eponym/index.mjs`);
const ctx = L.context(root);
const summary = (sccs) => {
    const pairs = [];
    for (const c of sccs) { const ms = [...new Set(c)].sort(); for (let i = 0; i < ms.length; i++) for (let j = i + 1; j < ms.length; j++) pairs.push([ms[i], ms[j]]); }
    const pc = pairs.filter(([a, b]) => b.startsWith(`${a}/`) || a.startsWith(`${b}/`));
    return { sccs: sccs.length, members: sccs.reduce((n, c) => n + new Set(c).size, 0), pairs: pairs.length, parentChildPairs: pc.length, parentChild: pc.map((p) => p.join(" ↔ ")) };
};
const floor = summary(moduleSccs(ctx.g, { moduleOf: dirUnits().unitOf }));
const g = summary(moduleSccs(ctx.g, { moduleOf: L.gUnits(ctx).unitOf }));
const floorAll = summary(moduleSccs(ctx.g, { moduleOf: dirUnits().unitOf, kinds: "all" }));
// the floor's units with only tests split off (a test is read by nothing, so it closes no cycle
// of its own; doors stay members of their dir) — isolates L0.3's door clause from its test clause
const du = dirUnits().unitOf;
const testsOnly = summary(moduleSccs(ctx.g, { moduleOf: (f) => (L.isTest(f) ? `test:${f}` : du(f)) }));
console.log(JSON.stringify({ root, floorDirUnits: { ...floor, parentChild: floor.parentChild.slice(0, 40) }, gUnits: g, floorDirUnitsAllKinds: { ...floorAll, parentChild: floorAll.parentChild.slice(0, 40) }, floorUnitsTestsSplit: testsOnly }, null, 1));
