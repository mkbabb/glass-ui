#!/usr/bin/env node
// apply-row.mjs (taken from pass-2/kit/B-proto/tools) — a frozen row ({files: {path: {before, after}}}) applied all-or-nothing: every
// file must hold exactly `before` (null = absent) or already hold `after` (idempotent), or
// nothing is written. `after: null` deletes.
//   node apply-row.mjs <row.json> --root WT
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const row = JSON.parse(readFileSync(args[0], "utf8"));
if (args.includes("--revert")) for (const f of Object.values(row.files)) [f.before, f.after] = [f.after, f.before];
const now = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : null);
let todo = 0, done = 0; const bad = [];
for (const [p, { before, after }] of Object.entries(row.files)) { const n = now(p); if (n === after) done++; else if (n === before) todo++; else bad.push(p); }
if (bad.length) { console.log(JSON.stringify({ ok: false, mismatched: bad })); process.exit(1); }
for (const [p, { after }] of Object.entries(row.files)) { if (now(p) === after) continue; if (after === null) unlinkSync(join(root, p)); else { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), after); } }
console.log(JSON.stringify({ ok: true, step: row.step, written: todo, alreadyApplied: done }));
