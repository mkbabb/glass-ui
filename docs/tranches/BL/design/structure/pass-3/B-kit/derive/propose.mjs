#!/usr/bin/env node
// propose.mjs — DERIVE: run the dominance proposer (lib/dominance.mjs) over every component
// unit and every kernel module, and freeze the proposal as literal JSON: for each unit the
// dirs dominance finds (root, default name, members) and each file whose computed dir
// differs from where it lives. Names are decided in authored/names.json, not here.
//   node derive/propose.mjs --root <wt> --out frozen/S3-proposal.json [--units a,b]
import { writeFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { loadFloor, arg } from "../lib/floor.mjs";
import { proposeUnit } from "../lib/dominance.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const g = F.buildGraph(root);
const O = F.makeOrigins(g);
const doors = new Set([...g.record.js.map(([, s]) => s), ...g.record.css.map(([, t]) => t.source).filter(Boolean), ...g.record.doors, ...g.tree.files.filter((f) => /(^|\/)index\.(ts|css)$/.test(f) && f.startsWith("src/"))]);
const units = arg(args, "--units")?.split(",") ?? [...new Set(g.tree.files.filter((f) => /^src\/(components|composables)\/[^/]+\//.test(f)).map((f) => f.split("/").slice(0, 3).join("/")))].filter((u) => u !== "src/components/_shared").sort();
const out = [];
for (const U of units) {
    const p = proposeUnit(F, g, O, U, { doors, isSlot: F.isSlot });
    const moving = p.rows.filter((r) => r.moves);
    out.push({ unit: U, files: p.files, dirs: p.dirs.map((d) => ({ root: d.root, dir: d.dir, members: d.members.length })), moving: moving.map((r) => ({ file: r.file, to: `${r.dir}/${posix.basename(r.file)}`, owner: r.owner })), unreached: p.unreached });
}
writeFileSync(arg(args, "--out"), `${JSON.stringify({ step: "B-S3 dominance proposal (G's law as B's module proposer; frozen, F-9)", units: out }, null, 1)}\n`);
for (const u of out) if (u.dirs.length || u.moving.length) console.log(`${u.unit} (${u.files}): dirs ${u.dirs.map((d) => `${posix.relative(u.unit, d.dir)}[${d.members}]`).join(" ")} | moving ${u.moving.length}`);
