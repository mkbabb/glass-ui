#!/usr/bin/env node
// hunk-row.mjs — generation-time only: turn an AUTHORED hunk spec into a frozen row. The spec
// ({ step, why, hunks: [{ file, find, replace }] | files: { path: { create | delete } } }) names
// each edit by exact text; every `find` must match exactly once in the tree it is generated
// on, or nothing is written. The row (exact before/after text per file, applied all-or-nothing
// and idempotently by apply-row.mjs) is what the replay applies; the spec is its reviewed source.
//   node hunk-row.mjs <spec.json> --root <wt> --out <row.json>
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const spec = JSON.parse(readFileSync(args[0], "utf8"));
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : null);
const files = {};
for (const h of spec.hunks ?? []) {
    const before = files[h.file]?.before ?? read(h.file);
    if (before === null) throw new Error(`${h.file}: absent`);
    const cur = files[h.file]?.after ?? before;
    const n = cur.split(h.find).length - 1;
    if (n !== 1) throw new Error(`${h.file}: \`${h.find.slice(0, 60)}\` matches ${n} times`);
    files[h.file] = { before, after: cur.replace(h.find, () => h.replace) };
}
for (const [p, f] of Object.entries(spec.files ?? {})) {
    if ("create" in f) { if (read(p) !== null) throw new Error(`${p}: exists`); files[p] = { before: null, after: f.create }; }
    if (f.delete) { const before = read(p); if (before === null) throw new Error(`${p}: absent`); files[p] = { before, after: null }; }
}
writeFileSync(opt("--out"), `${JSON.stringify({ step: spec.step, why: spec.why, files }, null, 1)}\n`);
console.log(JSON.stringify({ step: spec.step, files: Object.keys(files) }));
