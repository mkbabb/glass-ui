#!/usr/bin/env node
// css-group.mjs — B-S4's style-kernel carve (B §7.1 authored names): leaves an aggregator
// imports as one contiguous run become a module `<base>/<name>/` with an `index.css` door
// holding that run (its comments included), and the aggregator imports the door in the run's
// place. Moves go through F-2 (frozen list with its scan-delta declarations); the door row is
// frozen as exact before/after text. A group whose imports are not one contiguous run in the
// aggregator is refused (the cascade order would change).
//   node css-group.mjs --root WT --agg src/styles/tokens/index.css --base src/styles/tokens \
//        --groups '{"motion":["scheme-motion.css",…]}' --tag S4d-tokens --frozen DIR
import { readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const agg = opt("--agg"), base = opt("--base"), tag = opt("--tag"), frozen = opt("--frozen");
const groups = JSON.parse(opt("--groups"));
const { runMoves } = await import(pathToFileURL(join(root, "docs/tranches/BL/design/structure/floor/lib/move.mjs")));
const read = (p) => readFileSync(join(root, p), "utf8");
const relFromAgg = (f) => { const r = posix.relative(posix.dirname(agg), f); return r.startsWith(".") ? r : `./${r}`; };

// preflight: each group is one contiguous run of @import lines in the aggregator
const text0 = read(agg);
const lines0 = text0.split("\n");
const importIdx = (spec) => lines0.findIndex((l) => l.trim() === `@import "${spec}";`);
const imports = lines0.map((l, i) => (/^@import /.test(l.trim()) ? i : -1)).filter((i) => i >= 0);
for (const [name, list] of Object.entries(groups)) {
    const idx = list.map((f) => importIdx(relFromAgg(`${base}/${f}`)));
    if (idx.some((i) => i < 0)) throw new Error(`${name}: an import is missing from ${agg}`);
    const pos = idx.map((i) => imports.indexOf(i));
    for (let k = 1; k < pos.length; k++) if (pos[k] !== pos[k - 1] + 1) throw new Error(`${name}: not one contiguous run in ${agg}`);
}
// 1 · moves through F-2
const moves = Object.entries(groups).flatMap(([name, list]) => list.map((f) => ({ from: `${base}/${f}`, to: `${base}/${name}/${f}` })));
const dry = runMoves(root, moves, { dry: true });
if (dry.residue?.length) { console.log(JSON.stringify({ phase: "dry", residue: dry.residue })); process.exit(1); }
const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `${tag}: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
const r = runMoves(root, moves, { declaredScanDeltas: scanDeltas });
writeFileSync(join(frozen, `${tag}-moves.json`), `${JSON.stringify({ step: `${tag} moves`, moves, scanDeltas }, null, 1)}\n`);
console.log(JSON.stringify({ moves: moves.length, ok: r.ok, phase: r.phase, filesEdited: r.filesEdited, rewrites: r.rewrites, scanDeltas: scanDeltas.length, lost: r.image?.lost, gained: r.image?.gained }));
if (!r.ok) process.exit(1);
// 2 · the door row: the run moves into <name>/index.css, the aggregator imports the door
const text = read(agg);
const lines = text.split("\n");
const files = {};
let out = [...lines];
for (const [name, list] of Object.entries(groups)) {
    const specs = list.map((f) => relFromAgg(`${base}/${name}/${f}`));
    const idx = specs.map((s) => out.findIndex((l) => l.trim() === `@import "${s}";`));
    const a = Math.min(...idx), b = Math.max(...idx);
    const run = out.slice(a, b + 1).join("\n");
    const prefix = relFromAgg(`${base}/${name}`).replace(/^\.\//, "");
    const door = `${run.split(`"./${prefix}/`).join('"./')}\n`;
    files[`${base}/${name}/index.css`] = { before: null, after: door };
    out = [...out.slice(0, a), `@import "./${prefix}/index.css";`, ...out.slice(b + 1)];
}
files[agg] = { before: text, after: out.join("\n") };
writeFileSync(join(frozen, `${tag}-doors.json`), `${JSON.stringify({ step: `${tag} doors`, files }, null, 1)}\n`);
for (const [p, { after }] of Object.entries(files)) writeFileSync(join(root, p), after);
console.log(JSON.stringify({ doors: Object.keys(files) }));
