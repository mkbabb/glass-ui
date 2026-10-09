#!/usr/bin/env node
// tokens-door.mjs — DERIVE step B-S4e (LAW §5, clause B7): the tokens module holds script code
// (tokens.ts, manifest.ts), so it needs a JS door. The door re-exports tokens.ts whole and
// becomes the `./tokens` entry source (the export key and its dist names are keyed by name,
// so the surface does not change). One frozen row.
//   node derive/tokens-door.mjs --root <wt> --out frozen/S4e-tokens-door.json
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";
const root = resolve(arg(process.argv.slice(2), "--root"));
const REC = "scripts/structure/records/entry-record.json";
const rec = readFileSync(join(root, REC), "utf8");
const from = `"src/styles/tokens/tokens.ts"`;
if (rec.split(from).length !== 2) throw new Error("tokens entry not found once in the record");
const row = makeRow(root, "B-S4e the tokens module door is the ./tokens entry source (LAW §5, B7)", {
    "src/styles/tokens/index.ts": `// styles/tokens — module door and the ./tokens entry source: the runtime token projection.\nexport * from "./tokens";\n`,
    [REC]: rec.replace(from, `"src/styles/tokens/index.ts"`),
});
const file = arg(process.argv.slice(2), "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id: "S4e", kind: "row", file, why: "B7: the tokens module holds script code; its door re-exports tokens.ts and is the ./tokens entry source" });
