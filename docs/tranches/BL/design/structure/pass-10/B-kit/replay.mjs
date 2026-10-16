#!/usr/bin/env node
// replay.mjs — the non-author replay of route D1-B's migration, from committed artifacts only.
//
//   node <checkout>/docs/tranches/BL/design/structure/pass-10/B-kit/replay.mjs --root <linked worktree> [--twice]
//
// The chain is frozen/SEQUENCE.json: the floor rows (floor/rows/apply.mjs), then every B step
// in order. A step is a frozen move list (applied by the tree's own floor engine,
// scripts/structure/move.mjs, never by hand) or a frozen row (lib/row.mjs: exact text,
// all-or-nothing). Each step carries the code digest the tree must hold after it
// (lib/digest.mjs), and the chain carries the base digest.
//
// Whole-chain idempotence: the driver reads the tree's code digest first. The base digest
// starts the chain at step 0; a step's recorded digest resumes after that step; the final
// digest means the chain is applied and the run writes nothing. Any other digest is refused
// before a write (a tree that is neither the base nor a point on the chain is not replayed
// onto). After every step the digest must equal the recorded one, or the run stops.
// --twice applies every step a second time straight after the first and requires the
// digest unchanged (per-step idempotence).
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { codeDigest } from "./lib/digest.mjs";
import { applyRow } from "./lib/row.mjs";

const KIT = dirname(fileURLToPath(import.meta.url));
const FLOOR_ROWS = resolve(KIT, "../../floor/rows/apply.mjs");
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const twice = args.includes("--twice");
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("replay.mjs refuses the main checkout"); process.exit(2); }

const SEQ = JSON.parse(readFileSync(join(KIT, "frozen/SEQUENCE.json"), "utf8"));
const t0 = Date.now();
const now = () => codeDigest(root).digest;

function runStep(s) {
    if (s.kind === "floor-rows") {
        execFileSync("node", [FLOOR_ROWS, "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 });
        return "floor rows";
    }
    if (s.kind === "moves") {
        // the engine exits 1 on any refusal (execFileSync throws); its report is the first JSON object
        const out = execFileSync("node", [join(root, "scripts/structure/move.mjs"), join(KIT, s.file), "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 });
        const r = JSON.parse(out.slice(out.indexOf("{"), out.indexOf("\n}") + 2));
        return `moves ${r.pending ?? 0} pending, ${r.alreadyApplied ?? 0} applied`;
    }
    if (s.kind === "row") {
        const r = applyRow(root, JSON.parse(readFileSync(join(KIT, s.file), "utf8")));
        return `row ${r.written} written, ${r.applied} applied`;
    }
    throw new Error(`step ${s.id}: unknown kind ${s.kind}`);
}

let d = now();
let start;
if (d === SEQ.base) start = 0;
else {
    const i = SEQ.steps.findIndex((s) => s.digest === d);
    if (i < 0) { console.error(`replay: the tree's code digest ${d.slice(0, 16)}… is neither the base ${SEQ.base.slice(0, 16)}… nor a step on the chain; refusing to write`); process.exit(1); }
    start = i + 1;
}
console.log(`replay: ${start === SEQ.steps.length ? "the chain is applied" : start ? `resuming after step ${SEQ.steps[start - 1].id}` : "from the base"} (digest ${d.slice(0, 16)}…)`);
for (let i = start; i < SEQ.steps.length; i++) {
    const s = SEQ.steps[i];
    const what = runStep(s);
    d = now();
    if (d !== s.digest) { console.error(`replay: after ${s.id} the digest is ${d.slice(0, 16)}…, the chain records ${s.digest.slice(0, 16)}…; stopping`); process.exit(1); }
    let again = "";
    if (twice) {
        again = ` · again: ${runStep(s)}`;
        if (now() !== s.digest) { console.error(`replay: applying ${s.id} a second time changed the tree`); process.exit(1); }
    }
    console.log(`  ${s.id} [${s.kind}] ${what}${again} → ${d.slice(0, 16)}…`);
}
const fin = codeDigest(root);
console.log(`replay done in ${((Date.now() - t0) / 1000).toFixed(1)} s; code digest ${fin.digest} over ${fin.files} files; chain final ${SEQ.steps.at(-1)?.digest === fin.digest ? "MATCH" : "DIFFERS"}`);
process.exitCode = SEQ.steps.at(-1)?.digest === fin.digest ? 0 : 1;
