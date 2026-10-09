#!/usr/bin/env node
// browser-select.mjs — the browser seat's selection arguments, derived from the committed chain
// alone (pass 7, P6-G4), so the graph-selected run is re-derivable from committed bytes.
// Every frozen move list's moves, and every row's file: a row path the final tree holds is a
// `--changed` file; a row path the final tree does not hold (a file a row removed: a cut test, a
// row-moved spec, the scroll spine leaving src) is carried as a move onto the row-created file of
// the same stem when there is exactly one, else onto itself, so its old path and name still
// select the specs that name it. The floor rows (S1) are the base's own and select nothing.
//   node tools/browser-select.mjs --root <final tree> --out <dir>
// writes <dir>/moved.json ({ moves }) and <dir>/changed.txt (one path per line), and prints the
// browser.mjs argument list that reads them.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { KIT, readSeq } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const out = resolve(arg(args, "--out"));
const stem = (p) => basename(p).replace(/\.(spec|visual|test|test-d)\.ts$/, "").replace(/\.[^.]+$/, "");
const moves = [], changed = new Set();
for (const s of readSeq().steps) {
    if (!s.file) continue;
    const f = JSON.parse(readFileSync(join(KIT, s.file), "utf8"));
    if (f.moves) { for (const { from, to } of f.moves) moves.push({ from, to, step: s.id }); continue; }
    if (!f.files) continue;
    const created = Object.entries(f.files).filter(([, op]) => op.create !== undefined).map(([p]) => p);
    for (const [p, op] of Object.entries(f.files)) {
        if (existsSync(join(root, p))) { changed.add(p); continue; }
        if (!op.remove) continue;
        const hits = created.filter((c) => stem(c) === stem(p));
        moves.push({ from: p, to: hits.length === 1 ? hits[0] : p, step: s.id });
    }
}
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "moved.json"), `${JSON.stringify({ note: "every move the chain makes (frozen move lists, and row removals onto their same-stem creation), from frozen/SEQUENCE.json", moves }, null, 1)}\n`);
const list = [...changed].sort();
writeFileSync(join(out, "changed.txt"), `${list.join("\n")}\n`);
console.log(JSON.stringify({ moves: moves.length, changed: list.length }));
