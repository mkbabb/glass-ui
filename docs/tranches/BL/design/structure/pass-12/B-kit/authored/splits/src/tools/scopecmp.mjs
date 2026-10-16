#!/usr/bin/env node
// scopecmp.mjs <base.seq> <now.seq> — compare two flattened rule sequences written by
// `scripts/structure/cascade.mjs snapshot` with the Vue scope ids erased.
//
// cascade.mjs verify numbers scope ids by first appearance, so an SFC whose styles move
// into a child SFC reads "content changed" even when every rule survives. This tool asks
// the two questions that verdict hides: is the multiset of rules equal once scope ids are
// erased, and which rules fall outside the longest run that keeps its relative order.
// Used on row 03 (Timeline → TimelineMarks); every other row is identical under verify.
import { readFileSync } from "node:fs";

const [a, b] = process.argv.slice(2).map((f) => readFileSync(f, "utf8").split("\n").filter(Boolean));
const strip = (l) => l.replace(/\[data-v-#\d+\]/g, "[data-v]");
const A = a.map(strip), B = b.map(strip);
const count = (xs) => xs.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
const ca = count(A), cb = count(B);
let same = ca.size === cb.size;
for (const [k, v] of ca) if (cb.get(k) !== v) { same = false; console.log("MULTISET", v, cb.get(k) || 0, k.slice(0, 160)); }
console.log("rules", A.length, B.length, "multiset equal (scope ids erased):", same);
if (!same) process.exit(1);

// Each base rule's position in the new sequence; the rules that keep their relative
// order are the longest increasing subsequence of those positions.
const posB = new Map();
B.forEach((x, k) => { if (!posB.has(x)) posB.set(x, []); posB.get(x).push(k); });
const idxInB = A.map((x) => posB.get(x).shift());
const n = idxInB.length, tails = [], prev = new Array(n), tailIdx = [];
for (let k = 0; k < n; k++) {
    let lo = 0, hi = tails.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < idxInB[k]) lo = m + 1; else hi = m; }
    tails[lo] = idxInB[k]; tailIdx[lo] = k; prev[k] = lo ? tailIdx[lo - 1] : -1;
}
const keep = new Set();
for (let k = tailIdx[tails.length - 1]; k >= 0; k = prev[k]) keep.add(k);
const out = A.map((x, k) => [k, x]).filter(([k]) => !keep.has(k));
console.log("rules outside the longest kept order:", out.length);
for (const [k, x] of out) console.log("  moved", k, "->", idxInB[k], x.slice(0, 140));
