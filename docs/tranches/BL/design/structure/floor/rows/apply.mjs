#!/usr/bin/env node
// rows/apply.mjs — apply every floor row, in order, to a linked worktree: the one cut
// every pass-2 route starts from (REGISTRY §3.2 F-8). Fail-fast: a row that throws stops
// the run before the next row touches the tree.
//   node rows/apply.mjs --root <linked worktree>
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { rootArg } from "./lib.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const root = rootArg();
const run = (script, ...extra) => {
    process.stdout.write(execFileSync("node", [join(HERE, script), ...extra, "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 }));
};
run("f3-entry-record.mjs"); // the one entry record; subpath-policy + regen-exports deleted
run("f4-terminal-role.mjs"); // the declared cascade terminal; the masked fallback deleted
run("m02-overlay-host.mjs"); // M02: overlay owns OverlayHost, dock provides it
run("../move.mjs", join(HERE, "m03-roving-move.json")); // M03: useTabRovingFocus → motion/morph
run("f9-wire.mjs"); // the floor gates under `npm test`
console.log("floor rows applied: f3-entry-record, f4-terminal-role, m02-overlay-host, m03-roving-move, f9-wire");
