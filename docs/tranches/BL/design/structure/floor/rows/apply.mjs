#!/usr/bin/env node
// rows/apply.mjs — apply every floor row, in order, to a linked worktree: the one cut
// every route starts from (REGISTRY §3.2 F-8). Fail-fast: a row that throws stops the run
// before the next row touches the tree. Idempotent (P3-F6): every row, and the move list,
// reads its own applied state, so a replay of the whole chain writes nothing; the tree
// digest printed last is the evidence (equal across a replay).
// Run it from the checkout's floor (never from the tree it cuts: fd11 moves that copy).
//   node <checkout>/docs/tranches/BL/design/structure/floor/rows/apply.mjs --root <linked worktree>
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { floorIn, rootArg } from "./lib.mjs";
import { openTree } from "../lib/tree.mjs";
import { treeDigest } from "../lib/move.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const root = rootArg();
const run = (script, ...extra) => {
    process.stdout.write(execFileSync("node", [script.startsWith("/") ? script : join(HERE, script), ...extra, "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 }));
};
run("f3-entry-record.mjs"); // the one entry record; subpath-policy + regen-exports deleted
run("f4-terminal-role.mjs"); // the declared cascade terminal; the masked fallback deleted
run("m02-overlay-host.mjs"); // M02: overlay owns OverlayHost, dock provides it
// M03 runs on the tree's own move engine: a landed tree carries its floor at scripts/structure
run(join(root, floorIn(root), "move.mjs"), join(HERE, "m03-roving-move.json")); // M03: useTabRovingFocus → motion/morph
run("f9-wire.mjs"); // the floor gates under `npm test`
run("fd6-harness.mjs"); // FD-6: tests/harness/source.ts; the two slot-breaking walkers read through it
run("fd7-programs.mjs"); // FD-7: entry-rooted declarations, __tests__ collected, @source excludes them
run("fd11-land.mjs"); // FD-11: the floor runtime lands at scripts/structure; import-dag.mjs deleted
console.log("floor rows applied: f3-entry-record, f4-terminal-role, m02-overlay-host, m03-roving-move, f9-wire, fd6-harness, fd7-programs, fd11-land");
console.log(`tree digest ${treeDigest(root, openTree(root).files)}`);
