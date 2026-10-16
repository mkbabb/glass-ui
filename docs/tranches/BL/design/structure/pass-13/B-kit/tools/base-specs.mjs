#!/usr/bin/env node
// base-specs.mjs — the base run's spec list, derived (pass 8): the floor base runs the same specs
// the route's graph selection names, each under the base program's own key. A base program
// spec is in the list when the chain carries it (lib/follow.mjs) to a spec the route selection
// holds; a selected route spec no base spec reaches is one the chain creates, and is listed as
// such (it has no base key, so no base-green test).
//   node tools/base-specs.mjs --base <floor-base tree> --selection <route selection.json> --out <base-specs.txt>
import { readFileSync, writeFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { arg, loadProgram } from "../lib/floor.mjs";
import { chainFollow } from "../lib/follow.mjs";

const args = process.argv.slice(2);
const base = resolve(arg(args, "--base"));
const sel = JSON.parse(readFileSync(arg(args, "--selection"), "utf8"));
const routeKey = (repo) => posix.relative(sel.testDir, repo);
const follow = chainFollow();
const program = await loadProgram(base);
const picked = [], reached = new Set();
for (const s of program.specs) {
    const k = routeKey(follow(s));
    if (sel.specs.includes(k)) { picked.push(program.keyOf(s)); reached.add(k); }
}
const created = sel.specs.filter((k) => !reached.has(k));
writeFileSync(resolve(arg(args, "--out")), `${picked.sort().join("\n")}\n`);
console.log(JSON.stringify({ baseTestDir: program.rootDir, baseProgram: program.specs.length, routeSelected: sel.specs.length, baseSpecs: picked.length, routeOnly: created }));
