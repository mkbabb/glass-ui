#!/usr/bin/env node
// land.mjs — step G-S0b: land the D1-G gate in a linked worktree. The law, the gate, the
// dominance module and the authored names go to scripts/structure/eponym/ (beside the landed
// floor, FD-11); the npm-test wiring goes to tests/gates/eponym.test.ts. Idempotent: a file that
// already holds the kit's bytes is reported `applied`.
//   node land.mjs --root <linked worktree>
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("land refuses the main checkout"); process.exit(2); }
const FILES = [
    ["eponym/index.mjs", "scripts/structure/eponym/index.mjs"],
    ["eponym/units.mjs", "scripts/structure/eponym/units.mjs"],
    ["eponym/stage1.mjs", "scripts/structure/eponym/stage1.mjs"],
    ["eponym/stage2.mjs", "scripts/structure/eponym/stage2.mjs"],
    ["eponym/zones.mjs", "scripts/structure/eponym/zones.mjs"],
    ["eponym/eponym.mjs", "scripts/structure/eponym/eponym.mjs"],
    ["eponym/dominance.mjs", "scripts/structure/eponym/dominance.mjs"],
    ["eponym/names.json", "scripts/structure/eponym/names.json"],
    ["wire/eponym.test.ts", "tests/gates/eponym.test.ts"],
];
let written = 0, applied = 0;
for (const [from, to] of FILES) {
    const want = readFileSync(join(KIT, from), "utf8");
    const at = join(root, to);
    if (existsSync(at) && readFileSync(at, "utf8") === want) { applied++; continue; }
    mkdirSync(dirname(at), { recursive: true });
    writeFileSync(at, want);
    written++;
}
console.log(JSON.stringify({ step: "G-S0b land", written, applied }));
