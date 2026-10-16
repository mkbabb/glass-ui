#!/usr/bin/env node
// base-paths.mjs — the floor-base path of each migrated-tree path (pass 8), for a control run of
// the same tests on the floor base. A base file is listed when the chain carries it
// (lib/follow.mjs) to a path named on the command line; a named path no base file reaches is one
// the chain creates, printed to stderr as such.
//   node tools/base-paths.mjs --base <floor-base tree> <migrated path>…
// Prints one base path per line (stdout).
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { chainFollow } from "../lib/follow.mjs";

const args = process.argv.slice(2);
const base = resolve(arg(args, "--base"));
const wanted = new Set(args.filter((a, i) => a !== "--base" && args[i - 1] !== "--base"));
const follow = chainFollow();
const files = execFileSync("git", ["-C", base, "ls-files", "-co", "--exclude-standard"], { encoding: "utf8", maxBuffer: 1 << 26 }).split("\n").filter(Boolean);
const reached = new Set();
for (const f of files) {
    const to = follow(f);
    if (wanted.has(to)) { console.log(f); reached.add(to); }
}
for (const w of wanted) if (!reached.has(w)) console.error(`created by the chain (no base path): ${w}`);
