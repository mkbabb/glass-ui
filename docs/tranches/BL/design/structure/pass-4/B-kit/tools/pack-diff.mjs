#!/usr/bin/env node
// pack-diff.mjs — the ratchet row broken down (P4-R3, REGISTRY §P3-5). The ratchet measures
// the unpacked content byte total of the packed files (scripts/verify-export-types.mjs).
//   node tools/pack-diff.mjs list <tree> <out.json>      the packed files and their bytes
//                                                         (npm pack --dry-run, scripts off)
//   node tools/pack-diff.mjs diff <base.json> <now.json>  the total's delta by file class
// Classes: MIGRATION.md; a CSS door (dist/**/index.css); another shipped sheet; a declaration
// file whose source is a door (…/index.d.ts); another declaration; a JS chunk; the rest.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const [cmd, a, b] = process.argv.slice(2);
if (cmd === "list") {
    const out = execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], { cwd: a, encoding: "utf8", maxBuffer: 1 << 28 });
    const [pack] = JSON.parse(out);
    const files = pack.files.map((f) => ({ path: f.path, size: f.size })).sort((x, y) => (x.path < y.path ? -1 : 1));
    writeFileSync(b, `${JSON.stringify({ unpacked: pack.unpackedSize, files: files.length, list: files }, null, 1)}\n`);
    console.log(JSON.stringify({ unpacked: pack.unpackedSize, files: files.length }));
} else if (cmd === "diff") {
    const A = JSON.parse(readFileSync(a, "utf8")), B = JSON.parse(readFileSync(b, "utf8"));
    const cls = (p) => p === "MIGRATION.md" ? "MIGRATION.md" : /\/index\.css$/.test(p) ? "css door" : /\.css$/.test(p) ? "other css" : /\/index\.d\.ts$/.test(p) ? "door declaration" : /\.d\.ts$/.test(p) ? "other declaration" : /\.js$/.test(p) ? "js" : "other";
    const m = (x) => new Map(x.list.map((f) => [f.path, f.size]));
    const ma = m(A), mb = m(B);
    const by = {};
    const add = (p, d, k) => { const c = cls(p); by[c] ??= { delta: 0, added: 0, removed: 0, changed: 0 }; by[c].delta += d; by[c][k]++; };
    for (const [p, s] of mb) { if (!ma.has(p)) add(p, s, "added"); else if (ma.get(p) !== s) add(p, s - ma.get(p), "changed"); }
    for (const [p, s] of ma) if (!mb.has(p)) add(p, -s, "removed");
    const total = Object.values(by).reduce((n, x) => n + x.delta, 0);
    console.log(JSON.stringify({ base: A.unpacked, now: B.unpacked, delta: B.unpacked - A.unpacked, classesSum: total, files: { base: A.files, now: B.files }, byClass: by }, null, 1));
}
