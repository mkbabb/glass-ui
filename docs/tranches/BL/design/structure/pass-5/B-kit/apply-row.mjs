#!/usr/bin/env node
// apply-row.mjs — apply one frozen B row (lib/row.mjs), all-or-nothing and idempotent.
//   node apply-row.mjs <row.json> --root <linked worktree> [--dry]
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { applyRow } from "./lib/row.mjs";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("apply-row.mjs refuses the main checkout"); process.exit(2); }
const row = JSON.parse(readFileSync(args[0], "utf8"));
const r = applyRow(root, row, { dry: args.includes("--dry") });
console.log(JSON.stringify(r));
