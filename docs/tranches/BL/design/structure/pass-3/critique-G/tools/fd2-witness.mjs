#!/usr/bin/env node
// fd2-witness.mjs — for a pair of dir units (the floor's R-2 dirUnits), print one static
// value-edge path each way, so a co-cyclic pair is shown by its edges, not asserted.
//   node fd2-witness.mjs --root <tree> --a <unit> --b <unit>
import { resolve } from "node:path";
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const { buildGraph } = await import(`${root}/scripts/structure/lib/graph.mjs`);
const { dirUnits } = await import(`${root}/scripts/structure/lib/placement.mjs`);
const G = await import(`${root}/scripts/structure/lib/graph.mjs`);
const g = (G.buildGraph ?? buildGraph)(root);
const du = dirUnits().unitOf;
// --split-tests: a test is a node of its own (read by nothing, it closes no cycle of its own)
const isTest = (f) => /\/__tests__\/|\.(test|spec|test-d)\.(ts|tsx|mts)$|\.visual\.ts$/.test(f);
const unitOf = args.includes("--split-tests") ? (f) => (isTest(f) ? `test:${f}` : du(f)) : du;
const VALUE = new Set(["import", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "require", "sfc-script-src"]);
const adj = new Map();
for (const e of g.edges) {
    if (!e.to || e.dir || e.typeOnly || !VALUE.has(e.kind)) continue;
    if (!/^(src|demo)\//.test(e.from) || !/^(src|demo)\//.test(e.to)) continue;
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from).push(e);
}
function path(fromUnit, toUnit) {
    // unit-level BFS: a step is any static value edge from a file of the current unit
    const uadj = new Map();
    for (const [f, es] of adj) for (const e of es) {
        const u = unitOf(f), v = unitOf(e.to);
        if (u === v) continue;
        if (!uadj.has(u)) uadj.set(u, new Map());
        if (!uadj.get(u).has(v)) uadj.get(u).set(v, e);
    }
    const prev = new Map([[fromUnit, null]]);
    const q = [fromUnit];
    while (q.length) {
        const u = q.shift();
        for (const [v, e] of uadj.get(u) ?? []) {
            if (prev.has(v)) continue;
            prev.set(v, [u, e]);
            if (v === toUnit) {
                const out = []; let x = v;
                while (prev.get(x)) { const [pu, pe] = prev.get(x); out.unshift(`[${pu}] ${pe.from}:${pe.line ?? ""} -[${pe.kind}]-> ${pe.to} [${x}]`); x = pu; }
                return out;
            }
            q.push(v);
        }
    }
    return null;
}
const a = opt("--a"), b = opt("--b");
console.log(`${a} → ${b}:\n  ${(path(a, b) ?? ["none"]).join("\n  ")}`);
console.log(`${b} → ${a}:\n  ${(path(b, a) ?? ["none"]).join("\n  ")}`);
