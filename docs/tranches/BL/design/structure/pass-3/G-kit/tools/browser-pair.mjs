#!/usr/bin/env node
// browser-pair.mjs — pair a migrated-tree browser-seat report (F-10, floor/browser.mjs --out)
// with one or more base-tree reports over the same specs. A failure counts against the
// migration only when the migrated tree fails a test more times than the base did. Specs no
// base report ran are listed as unpaired.
//   node browser-pair.mjs --migrated m.json --base b1.json [--base b2.json …]
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const all = (k) => args.flatMap((a, i) => (a === k ? [args[i + 1]] : []));
const load = (p) => JSON.parse(readFileSync(p, "utf8"));
const m = load(all("--migrated")[0]);
const bases = all("--base").map(load);
const baseSpecs = new Set(bases.flatMap((b) => b.specs));
const count = (xs) => xs.reduce((acc, x) => acc.set(x, (acc.get(x) ?? 0) + 1), new Map());
const specOf = (f) => f.split(" :: ")[0];
const mf = count(m.failures.filter((f) => baseSpecs.has(specOf(f))));
const bf = count(bases.flatMap((b) => b.failures));
const newFail = [];
let shared = 0;
for (const [k, n] of mf) { const b = bf.get(k) ?? 0; shared += Math.min(n, b); if (n > b) newFail.push(`${k} ×${n - b}`); }
const fixed = [];
for (const [k, n] of bf) { if (!m.specs.includes(specOf(k))) continue; const g = mf.get(k) ?? 0; if (n > g) fixed.push(`${k} ×${n - g}`); }
const unpaired = m.specs.filter((s) => !baseSpecs.has(s));
console.log(JSON.stringify({
    migrated: { ran: m.ran, passed: m.passed, failed: m.failed, specs: m.specs.length },
    base: bases.map((b) => ({ ran: b.ran, passed: b.passed, failed: b.failed, specs: b.specs.length })),
    pairedFailures: [...mf.values()].reduce((a, b) => a + b, 0),
    sharedWithBase: shared,
    newOnMigrated: newFail,
    passOnMigratedOnly: fixed,
    unpairedSpecs: unpaired,
}, null, 1));
process.exitCode = newFail.length || unpaired.length ? 1 : 0;
