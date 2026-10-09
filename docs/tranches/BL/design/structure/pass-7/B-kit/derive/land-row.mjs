#!/usr/bin/env node
// land-row.mjs — DERIVE (pass 5): land a row a zone's own derive tool computed on this tree
// (the tests and tests-visual split tools, the scripts and demo gen-row tools write B's row
// shape, lib/row.mjs), frozen as literal JSON (F-9) and recorded on the chain. The row is
// applied by the kit's writer, so every staged text is parsed first (P5-F4) and a partly
// applied row refuses. A row that changes nothing is refused: a step records a change.
//   node derive/land-row.mjs --root <wt> --row <row.json> --id S42 --out frozen/S42-x.json --why "…"
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const src = JSON.parse(readFileSync(resolve(arg(args, "--row")), "utf8"));
const why = arg(args, "--why") ?? src.step;
if (!why) throw new Error("land-row: a row needs its why (--why or the row's step)");
const row = { ...src, step: src.step ?? why };
if (!Object.keys(row.files ?? {}).length) throw new Error(`land-row: ${arg(args, "--row")} changes nothing`);
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id: arg(args, "--id"), kind: "row", file, why });
