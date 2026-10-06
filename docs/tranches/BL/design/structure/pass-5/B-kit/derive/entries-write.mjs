#!/usr/bin/env node
// entries-write.mjs — DERIVE (pass 4): package.json follows the entry record (F-3). The
// floor's own `entries.mjs write` regenerates `exports` and `typesVersions` from the record;
// the change is frozen as one exact-text row and recorded, so the replay never runs the tool.
//   node derive/entries-write.mjs --root <wt> --id S33b --why "…" --out frozen/S33b-entries.json
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const PKG = "package.json";
const before = readFileSync(join(root, PKG), "utf8");
execFileSync("node", [join(root, "scripts/structure/entries.mjs"), "write", "--root", root], { stdio: "inherit" });
const after = readFileSync(join(root, PKG), "utf8");
writeFileSync(join(root, PKG), before);
if (after === before) { console.error("entries-write: package.json already follows the record"); process.exit(1); }
const why = arg(args, "--why");
const row = makeRow(root, why, { [PKG]: after });
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
execFileSync("node", [join(root, "scripts/structure/entries.mjs"), "check", "--root", root], { stdio: "inherit" });
recordStep(root, { id: arg(args, "--id"), kind: "row", file, why });
