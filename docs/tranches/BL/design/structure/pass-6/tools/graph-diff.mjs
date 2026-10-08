#!/usr/bin/env node
// graph-diff.mjs <a.json> <b.json> — pass 6 · the multiset difference of two graph dumps
// (graph-dump.mjs), per section. Prints every row only one side holds, `-` for a, `+` for b,
// and one count line per section. Exit 0 always: the reading is the rows, judged by the caller.
import { readFileSync } from "node:fs";

const [a, b] = process.argv.slice(2).map((p) => JSON.parse(readFileSync(p, "utf8")));
for (const key of ["edges", "violations", "census"]) {
    const count = (xs) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map());
    const ca = count(a[key]), cb = count(b[key]);
    const only = (x, y) => [...x].flatMap(([k, n]) => Array(Math.max(0, n - (y.get(k) ?? 0))).fill(k));
    const minus = only(ca, cb), plus = only(cb, ca);
    console.log(`${key}: a ${a[key].length}, b ${b[key].length}; only a ${minus.length}, only b ${plus.length}`);
    for (const x of minus) console.log(`  - ${x}`);
    for (const x of plus) console.log(`  + ${x}`);
}
