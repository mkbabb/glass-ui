#!/usr/bin/env node
// css-doors-single.mjs — B-S4 (B3): a component whose CSS the `./styles` aggregate imports at ONE
// rung gets an `index.css` door over that leaf, and the aggregate imports the door in the leaf's
// place (order unchanged). A component the aggregate enters at two rungs (card, tabs, _shared)
// cannot take one door without reordering the cascade: it is listed, not touched (R-7 collapse).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const out = args[args.indexOf("--out") + 1];
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const AGG = "src/styles/index.css";
const lines = seal(root).V.B3.filter((l) => l.startsWith(`${AGG}:`)).map((l) => { const m = /^(\S+):(\d+) -> (\S+) \(css door (\S+)\)$/.exec(l); return { line: +m[2], to: m[3], door: m[4] }; });
const byDoor = new Map();
for (const x of lines) { if (!byDoor.has(x.door)) byDoor.set(x.door, []); byDoor.get(x.door).push(x); }
let agg = readFileSync(join(root, AGG), "utf8");
const files = {}; const skipped = [];
for (const [door, xs] of byDoor) {
    if (xs.length > 1 || existsSync(join(root, door))) { skipped.push(`${door}: ${xs.length} rung(s)${existsSync(join(root, door)) ? ", door exists" : ""}`); continue; }
    const leaf = posix.relative(posix.dirname(door), xs[0].to);
    const oldSpec = posix.relative(posix.dirname(AGG), xs[0].to), newSpec = posix.relative(posix.dirname(AGG), door);
    const a = `@import "${oldSpec.startsWith(".") ? oldSpec : `./${oldSpec}`}";`, b = `@import "${newSpec.startsWith(".") ? newSpec : `./${newSpec}`}";`;
    if (agg.split(a).length !== 2) throw new Error(`not one match: ${a}`);
    agg = agg.replace(a, b);
    files[door] = { before: null, after: `@import "./${leaf}";\n` };
}
files[AGG] = { before: readFileSync(join(root, AGG), "utf8"), after: agg };
writeFileSync(out, `${JSON.stringify({ step: "B-S4 single-rung component CSS doors (B3)", skipped, files }, null, 1)}\n`);
console.log(JSON.stringify({ doors: Object.keys(files).filter((f) => f !== AGG), skipped }, null, 1));
