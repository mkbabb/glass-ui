#!/usr/bin/env node
// repin.mjs — DERIVE: re-pin the floor's surface pin (F-9, records/surface-pin.json) after a
// reviewed surface change, as a frozen row. It runs the floor's own `surface.mjs check`
// first and refuses any GROWTH (a `+` line): a route never converges by widening a door.
// Only the losses the authored rows name are admitted: every `-` line must name a symbol in
// the --expect list (authored, e.g. the one-door row's MIGRATION table). Needs a dist built
// from the current tree.
//   node derive/repin.mjs --root <wt> --expect authored/one-door.mjs --id S12 --out frozen/S12-surface-pin.json
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const SURFACE = join(root, "scripts/structure/surface.mjs");
const PIN = "scripts/structure/records/surface-pin.json";
let out;
try { out = execFileSync("node", [SURFACE, "check", "--root", root], { encoding: "utf8" }); }
catch (e) { if (e.status !== 1) throw e; out = e.stdout; }
const lines = out.split("\n").filter((l) => l.startsWith("  "));
const growth = lines.filter((l) => / \+ /.test(l) || /added|order changed/.test(l));
if (growth.length) { console.error(`repin: the surface GREW\n${growth.join("\n")}`); process.exit(1); }
const { edits } = await import(pathToFileURL(join(KIT, arg(args, "--expect"))).href);
const table = edits.find((e) => e.file === "MIGRATION.md").to;
const named = new Set([...table.matchAll(/^\| `([^`]+)` \|/gm)].map((m) => m[1]));
const unnamed = lines.filter((l) => !named.has(l.split(" - ")[1]?.trim()));
if (unnamed.length) { console.error(`repin: losses no authored row names\n${unnamed.join("\n")}`); process.exit(1); }
const before = readFileSync(join(root, PIN), "utf8");
execFileSync("node", [SURFACE, "pin", "--root", root], { stdio: "ignore" });
const after = readFileSync(join(root, PIN), "utf8");
writeFileSync(join(root, PIN), before);
const row = { ...makeRow(root, `B-${arg(args, "--id")} surface re-pin: ${lines.length} losses, each a MIGRATION row, 0 growth`, { [PIN]: after }), losses: lines.map((l) => l.trim()) };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ ...applyRow(root, row), losses: lines.length, growth: 0 }));
recordStep(root, { id: arg(args, "--id"), kind: "row", file, why: `the floor surface pin follows the one-door row: ${lines.length} name losses across 6 entries, each named by a MIGRATION row; 0 growth` });
