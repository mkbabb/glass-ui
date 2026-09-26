#!/usr/bin/env node
// move.mjs — F-2 CLI. Applies a move list inside a LINKED git worktree only (never the
// main checkout), rewrites every reference, and fails on residue. FD-2 is a stop: a list
// that would add a co-cyclic module pair (moduleSccs over dirUnits) is refused.
//   node move.mjs <moves.json> --root <worktree> [--dry] [--out report.json]
// moves.json: {"moves": [{"from": "src/a.ts", "to": "src/b/a.ts"}, {"from": "dir/", "to": "dir2/"}],
//              "scanDeltas": [{"scanner": "tests/x.test.ts", "spec": "join(DIR, n)", "file": "src/a.ts", "reason": "…"}],
//              "globDeltas": [{"scanner": "demo/demo.css", "glob": "../src/components/_shared/**/*.ts", "file": "src/…/x.ts", "reason": "…"}]}
// Every file the engine would write is parsed first (P5-F4: a parse failure refuses the step,
// nothing written), and classified move-only (FD-5) before the step is kept.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { runMoves } from "./lib/move.mjs";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const list = args[0];
const root = opt("--root");
if (!list || !root) { console.error("usage: move.mjs <moves.json> --root <linked worktree> [--dry] [--out f]"); process.exit(2); }
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("move.mjs refuses the main checkout: run it in a linked worktree"); process.exit(2); }
const doc = JSON.parse(readFileSync(list, "utf8"));
const t0 = Date.now();
const r = runMoves(resolve(root), doc.moves, { dry: args.includes("--dry"), declaredScanDeltas: doc.scanDeltas ?? [], declaredGlobDeltas: doc.globDeltas ?? [] });
r.ms = Date.now() - t0;
if (opt("--out")) writeFileSync(opt("--out"), JSON.stringify(r, null, 1));
const { image, residue, violations, scanDeltas, globDeltas, classified, ...head } = r;
const { scc, ...rest } = head;
const tally = (d) => (d ? { total: d.total, declared: d.declared, undeclared: d.undeclared.length, stale: d.stale.length } : 0);
console.log(JSON.stringify({ ...rest, scc: scc ? { before: scc.before, after: scc.after, addedPairs: scc.addedPairs, refused: scc.grown.length > 0 } : null, residue: residue?.length ?? 0, scanDeltas: tally(scanDeltas), globDeltas: tally(globDeltas), classified: classified ? { counts: classified.counts, failed: classified.failed } : null, lost: image?.lost.length ?? 0, gained: image?.gained.length ?? 0, violations: Array.isArray(violations) ? violations.length : violations }, null, 1));
for (const x of residue ?? []) console.log("RESIDUE", JSON.stringify(x));
for (const x of scanDeltas?.undeclared ?? []) console.log("SCAN-DELTA undeclared", JSON.stringify(x));
for (const x of scanDeltas?.stale ?? []) console.log("SCAN-DELTA stale declaration", JSON.stringify(x));
for (const x of globDeltas?.undeclared ?? []) console.log("GLOB-DELTA undeclared", JSON.stringify(x));
for (const x of globDeltas?.stale ?? []) console.log("GLOB-DELTA stale declaration", JSON.stringify(x));
for (const x of globDeltas?.carried ?? []) console.log("GLOB-DELTA carried", JSON.stringify(x));
for (const x of r.unparsed ?? []) console.log("PARSE refused", JSON.stringify(x));
for (const x of classified?.rows?.filter((x) => x.class === "unclassified") ?? []) console.log("FD-5 UNCLASSIFIED", JSON.stringify(x));
for (const x of image?.lost ?? []) console.log("LOST", x);
for (const x of image?.gained ?? []) console.log("GAINED", x);
for (const x of Array.isArray(violations) ? violations : []) console.log("VIOLATION", JSON.stringify(x));
for (const [a, b] of scc?.grown?.length ? scc.firstAdded : []) console.log("FD-2 CO-CYCLIC (new)", a, "↔", b);
process.exit(r.ok ? 0 : 1);
