#!/usr/bin/env node
// scc-arms.mjs: critique-G run 2, written after the battery hash (disclosed). The static module SCCs
// (floor moduleSccs, src + demo) of one tree under four unit readings, to separate what the floor's
// R-2 unit (dirUnits) counts from what G's L0.3 unit (doors and tests as nodes of their own) counts:
//   floor        dirUnits().unitOf (the unit FD-2 / P3-F2 counts by default)
//   doorsOwn     doors (entry sources, CSS entry sources, record.doors) as their own node
//   testsOwn     tests as their own node
//   L0.3         both (G's reading)
// For each: SCC count, members, co-cyclic pairs, parent↔child (nesting) pairs, and pairs that
// cross zones. Also the chain of edges from src into demo that closes the cross-zone cycle.
//   node scc-arms.mjs --tree T [--out O.json]
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const T = resolve(opt("--tree"));
const G = await import(join(T, "scripts/structure/lib/graph.mjs"));
const P = await import(join(T, "scripts/structure/lib/placement.mjs"));
const g = G.buildGraph(T);
const u = P.dirUnits().unitOf;
const r = g.record;
const doors = new Set([...r.js.map(([, s]) => s), ...r.css.map(([, t]) => t.source).filter(Boolean), ...r.doors]);
const isTest = (f) => /(^|\/)__tests__\/|\.(test|spec|test-d)\.(ts|tsx|mts)$|\.visual\.ts$/.test(f);
const arms = {
    floor: (f) => u(f),
    doorsOwn: (f) => (doors.has(f) ? `DOOR:${f}` : u(f)),
    testsOwn: (f) => (isTest(f) ? `TEST:${f}` : u(f)),
    "L0.3": (f) => (doors.has(f) ? `DOOR:${f}` : isTest(f) ? `TEST:${f}` : u(f)),
};
const out = {};
for (const [k, fn] of Object.entries(arms)) {
    const s = G.moduleSccs(g, { moduleOf: fn, zones: ["src", "demo"], kinds: "static" });
    const pairs = [];
    for (const c of s) for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) pairs.push([c[i], c[j]]);
    const strip = (m) => m.replace(/^(DOOR|TEST):/, "");
    const nest = pairs.filter(([a, b]) => { const x = strip(a), y = strip(b); return !a.includes(":") && !b.includes(":") && (x.startsWith(y + "/") || y.startsWith(x + "/")); });
    const cross = pairs.filter(([a, b]) => strip(a).split("/")[0] !== strip(b).split("/")[0]);
    out[k] = { sccs: s.length, members: s.reduce((n, c) => n + c.length, 0), sizes: s.map((c) => c.length), pairs: pairs.length, nestingPairs: nest.length, crossZonePairs: cross.length, nestingFirst: nest.slice(0, 10), sccsSmall: s.filter((c) => c.length <= 6) };
}
console.log(JSON.stringify(Object.fromEntries(Object.entries(out).map(([k, v]) => [k, { ...v, sccsSmall: v.sccsSmall.slice(0, 6) }])), null, 1));
if (opt("--out")) writeFileSync(opt("--out"), JSON.stringify(out, null, 1));
