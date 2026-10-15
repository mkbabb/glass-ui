#!/usr/bin/env node
// browser-diff.mjs — attribute F-10 browser-seat failures to the migration: the same spec list
// run on the floor base (HEAD + S1) and on the migrated tree, compared by `spec :: title`
// (each report's `failures` list; a title that repeats per parametrised case is counted by
// multiplicity). New = failing only on the migrated tree; cured = failing only on the base.
//   node tools/browser-diff.mjs <base report.json> <migrated report.json>
import { readFileSync } from "node:fs";

const [a, b] = process.argv.slice(2).map((p) => JSON.parse(readFileSync(p, "utf8")));
const bag = (r) => { const m = new Map(); for (const f of r.failures) m.set(f, (m.get(f) ?? 0) + 1); return m; };
const A = bag(a), B = bag(b);
const diff = (x, y) => [...x].flatMap(([k, n]) => Array(Math.max(0, n - (y.get(k) ?? 0))).fill(k));
const added = diff(B, A), cured = diff(A, B);
const sameSpecs = JSON.stringify([...a.specs].sort()) === JSON.stringify([...b.specs].sort());
console.log(JSON.stringify({ sameSpecs, base: { ran: a.ran, passed: a.passed, failed: a.failed, skipped: a.skipped }, migrated: { ran: b.ran, passed: b.passed, failed: b.failed, skipped: b.skipped }, newFailures: added.length, cured: cured.length }, null, 1));
for (const f of added) console.log(`  NEW   ${f}`);
for (const f of cured) console.log(`  CURED ${f}`);
process.exitCode = added.length ? 1 : 0;
