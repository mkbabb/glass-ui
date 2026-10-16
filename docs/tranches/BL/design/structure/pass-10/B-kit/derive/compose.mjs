#!/usr/bin/env node
// compose.mjs — DERIVE (pass 6): land an AUTHORED composition as one frozen row. The authored
// module exports `why`, `reasons` ({ path: why }) and `compose({ read, ts, splitTests })`,
// which returns the intended text of every path it touches (null: the file leaves). `read`
// reads the tree as it stands, so a composition is a function of the tree it lands on: test
// splits (authored/p6/b2/split.mjs, every test landing in exactly one part), files moved by
// row and the edits that follow them. Every touched path must carry a reason; the row is
// lib/row.mjs's exact-text row (parse-checked, all-or-nothing).
//   node derive/compose.mjs --root <wt> --authored authored/x.mjs --id S67 --out frozen/S67-x.json
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";
import { splitTests } from "../authored/p6/b2/split.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const doc = await import(pathToFileURL(join(KIT, arg(args, "--authored"))).href);
const ts = createRequire(join(root, "package.json"))("typescript");
const read = (p) => { const abs = join(root, p); if (!existsSync(abs)) throw new Error(`compose: ${p} is not in the tree`); return readFileSync(abs, "utf8"); };
const intended = await doc.compose({ read, ts, splitTests });
const unreasoned = Object.keys(intended).filter((p) => !doc.reasons[p]);
if (unreasoned.length) { console.error(`compose: no reason for\n  ${unreasoned.join("\n  ")}`); process.exit(1); }
const row = { ...makeRow(root, doc.why, intended), reasons: Object.entries(doc.reasons).map(([file, why]) => ({ file, why })) };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id: arg(args, "--id"), kind: "row", file, why: doc.why });
