#!/usr/bin/env node
// edits.mjs — DERIVE: apply an AUTHORED list of exact-text edits (authored/*.mjs exporting
// `why` and `edits`, each edit with its own `why`) as one frozen row (lib/row.mjs) and record
// the step. An edit is
//   { file, from, to }            `from` matches exactly once
//   { file, from, to, all: true } every match, at least one
//   { file, from, until, to }     the span from `from` through the end of `until`, each once
//   { file, create }              a new file
//   { file, remove: true }        the file leaves
// Anything else stops the run before a row exists, so a drifted tree never takes half a row.
//   node derive/edits.mjs --root <wt> --authored authored/x.mjs --id S7 --out frozen/S7-x.json
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const doc = await import(pathToFileURL(join(KIT, arg(args, "--authored"))).href);
const files = {};
const stop = [];
const count = (t, s) => t.split(s).length - 1;
for (const { file, from, until, to, all, create, remove } of doc.edits) {
    if (remove) { if (!existsSync(join(root, file))) stop.push(`${file}: absent`); else files[file] = null; continue; }
    if (create !== undefined) { if (existsSync(join(root, file)) || file in files) stop.push(`${file}: exists`); else files[file] = create; continue; }
    const text = (files[file] ??= readFileSync(join(root, file), "utf8"));
    const n = count(text, from);
    if (until !== undefined) {
        if (n !== 1 || count(text, until) !== 1) { stop.push(`${file}: span ${JSON.stringify(from.slice(0, 50))} (${n}) .. ${JSON.stringify(until.slice(0, 50))} (${count(text, until)})`); continue; }
        const i = text.indexOf(from), j = text.indexOf(until) + until.length;
        if (j <= i) { stop.push(`${file}: span ends before it starts`); continue; }
        files[file] = text.slice(0, i) + to + text.slice(j);
        continue;
    }
    if (all ? n < 1 : n !== 1) { stop.push(`${file}: ${n} match(es) for ${JSON.stringify(from.slice(0, 70))}`); continue; }
    files[file] = all ? text.split(from).join(to) : text.replace(from, () => to);
}
if (stop.length) { console.error(`stopped\n  ${stop.join("\n  ")}`); process.exit(1); }
const id = arg(args, "--id");
const row = { ...makeRow(root, doc.why, files), reasons: doc.edits.map(({ file, why }) => ({ file, why })) };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id, kind: "row", file, why: doc.why });
