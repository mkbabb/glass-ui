#!/usr/bin/env node
// base-repin.mjs — DERIVE (pass 4, the rebase): the floor's surface pin
// (floor/records/surface-pin.json, landed at scripts/structure/records/ by fd11) was pinned on
// 10.0.1 code. On a later base the release's own exports read as growth before any route move,
// so the chain's surface check would be RED at its first step. This row re-pins the floor base
// to the base's surface. It admits ONLY growth whose names the authored list
// (authored/base-surface.json) ties to a release commit on the base; any other growth, and
// any loss, stops the run (a route never converges by widening a door; a base never loses a
// name without its own row). Needs a dist built from the current tree.
//   node derive/base-repin.mjs --root <wt> --authored authored/base-surface.json --id S1c --out frozen/S1c-base-surface.json
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const A = JSON.parse(readFileSync(join(KIT, arg(args, "--authored")), "utf8"));
const SURFACE = join(root, "scripts/structure/surface.mjs");
const PIN = "scripts/structure/records/surface-pin.json";
let out;
try { out = execFileSync("node", [SURFACE, "check", "--root", root], { encoding: "utf8" }); }
catch (e) { if (e.status !== 1) throw e; out = e.stdout; }
const lines = out.split("\n").filter((l) => l.startsWith("  "));
const admitted = new Set(A.growth.map((g) => g.name));
const growth = lines.filter((l) => / \+ /.test(l));
const bad = lines.filter((l) => !/ \+ /.test(l) || !admitted.has(l.split(" + ")[1]?.trim()));
if (bad.length) { console.error(`base-repin: lines the authored list does not admit\n${bad.join("\n")}`); process.exit(1); }
if (!growth.length) { console.error("base-repin: the base surface already equals the pin; no row"); process.exit(1); }
const before = readFileSync(join(root, PIN), "utf8");
execFileSync("node", [SURFACE, "pin", "--root", root], { stdio: "ignore" });
const after = readFileSync(join(root, PIN), "utf8");
writeFileSync(join(root, PIN), before);
const row = { ...makeRow(root, A.why, { [PIN]: after }), growth: growth.map((l) => l.trim()) };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ ...applyRow(root, row), growth: growth.length }));
recordStep(root, { id: arg(args, "--id"), kind: "row", file, why: A.why });
