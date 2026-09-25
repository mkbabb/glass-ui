#!/usr/bin/env node
// snap-row.mjs — generation-time only: freeze what a floor tool writes as an exact-text row. The
// generator snapshots the files a step will touch (--save), runs the floor tool that computes the
// change in the worktree (entries.mjs write, surface.mjs pin), then writes the row from the
// snapshot and the files as they now stand (--out). The replay applies the row (apply-row.mjs),
// never the tool: the change is literal JSON before any gate judges it (SPECS-v2 §1.4).
//   node snap-row.mjs --root <wt> --save <snap.json> --files a,b,…
//   node snap-row.mjs --root <wt> --from <snap.json> --out <row.json> --step "<what>" [--why "<why>"]
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : null);
if (opt("--save")) {
    const files = Object.fromEntries(opt("--files").split(",").map((p) => [p, read(p)]));
    writeFileSync(opt("--save"), JSON.stringify(files));
    console.log(JSON.stringify({ saved: Object.keys(files) }));
} else {
    const snap = JSON.parse(readFileSync(opt("--from"), "utf8"));
    const files = {};
    for (const [p, before] of Object.entries(snap)) { const after = read(p); if (after !== before) files[p] = { before, after }; }
    if (!Object.keys(files).length) throw new Error("snap-row: the tool changed nothing");
    writeFileSync(opt("--out"), `${JSON.stringify({ step: opt("--step"), why: opt("--why") ?? undefined, files }, null, 1)}\n`);
    console.log(JSON.stringify({ step: opt("--step"), files: Object.keys(files) }));
}
