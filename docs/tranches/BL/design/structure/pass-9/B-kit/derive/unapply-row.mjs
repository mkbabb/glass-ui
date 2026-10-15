#!/usr/bin/env node
// unapply-row.mjs — AUTHOR-SIDE: put a tree back to the state before a frozen row, by the
// row's exact inverse (a create is removed, a removal re-created from its `before`, each
// hunk swapped, in reverse order), through the kit's writer (parsed, all-or-nothing). Used to
// step the derive tree back one row when a later step must be derived before it.
//   node derive/unapply-row.mjs --root <wt> --row frozen/S43a-x.json
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow } from "../lib/row.mjs";
const args = process.argv.slice(2);
const row = JSON.parse(readFileSync(resolve(arg(args, "--row")), "utf8"));
const inv = { step: `inverse of ${row.step}`, files: {} };
for (const [p, op] of Object.entries(row.files)) {
    if (op.create !== undefined) inv.files[p] = { remove: true, before: op.create };
    else if (op.remove) inv.files[p] = { create: op.before };
    else inv.files[p] = { hunks: [...op.hunks].reverse().map(([f, t]) => [t, f]) };
}
console.log(JSON.stringify(applyRow(resolve(arg(args, "--root")), inv)));
