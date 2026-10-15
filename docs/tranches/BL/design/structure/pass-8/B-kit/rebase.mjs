#!/usr/bin/env node
// rebase.mjs — AUTHOR-SIDE (pass 6): carry the pass-5 chain onto a new floor cut. It starts
// pass 6's frozen/SEQUENCE.json at the tree's base, lands S1 (the floor rows of the checkout's
// floor, the P6 floor), then applies each later pass-5 step's frozen file, as it is, through the
// same writers the replay uses (lib/row.mjs, the tree's own move engine), and records the
// digest the tree then holds. It stops at the first step whose frozen text no longer applies:
// that step is re-derived by its tool (derive/chain.sh), and the rebase resumes after it.
//   node rebase.mjs --root <wt> --start            (base + S1, then every step it can)
//   node rebase.mjs --root <wt> --from <id>        (resume with step <id> of the pass-5 chain)
//   node rebase.mjs --root <wt> --only <id>        (one step)
//   --until <id>                                   (stop before <id>)
// The pass-5 chain is read from the committed pass-5 kit; a step id this pass re-derived or
// added is recorded by its own tool, never here.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { applyRow } from "./lib/row.mjs";
import { codeDigest } from "./lib/digest.mjs";
import { KIT, readSeq, recordStep, startSeq } from "./lib/sequence.mjs";

const a = process.argv.slice(2);
const opt = (k) => (a.includes(k) ? a[a.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const P5 = JSON.parse(readFileSync(join(KIT, "../../pass-5/B-kit/frozen/SEQUENCE.json"), "utf8"));
const FLOOR_ROWS = resolve(KIT, "../../floor/rows/apply.mjs");

function apply(s) {
    if (s.kind === "floor-rows") { execFileSync("node", [FLOOR_ROWS, "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 }); return "floor rows"; }
    if (s.kind === "moves") {
        const out = execFileSync("node", [join(root, "scripts/structure/move.mjs"), join(KIT, s.file), "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 });
        const r = JSON.parse(out.slice(out.indexOf("{"), out.indexOf("\n}") + 2));
        return `moves ${r.pending ?? 0} pending`;
    }
    const r = applyRow(root, JSON.parse(readFileSync(join(KIT, s.file), "utf8")));
    return `row ${r.written} written`;
}

let steps = P5.steps;
if (a.includes("--start")) {
    const sha = execFileSync("git", ["-C", root, "rev-parse", "--short=8", "HEAD"], { encoding: "utf8" }).trim();
    const seq = startSeq(root, sha);
    console.log(`chain started at ${sha}, base ${seq.base.slice(0, 16)}…`);
} else if (opt("--from")) {
    const i = steps.findIndex((s) => s.id === opt("--from"));
    if (i < 0) throw new Error(`no pass-5 step ${opt("--from")}`);
    steps = steps.slice(i);
} else if (opt("--only")) steps = steps.filter((s) => s.id === opt("--only"));
const until = opt("--until");
for (const s of steps) {
    if (s.id === until) break;
    const t0 = Date.now();
    let what;
    try { what = apply(s); } catch (e) { console.error(`REBASE STOP at ${s.id}: ${String(e.stderr || e.message).slice(0, 1500)}`); process.exit(1); }
    // a step whose change the P6 floor cut already holds writes nothing: it leaves the chain
    const seqNow = readSeq();
    if (seqNow.steps.length && seqNow.steps.at(-1).digest === codeDigest(root).digest) { console.log(`  ${s.id} [${s.kind}] LEAVES THE CHAIN: ${what}, nothing changed (the cut already holds it)`); continue; }
    const d = recordStep(root, { id: s.id, kind: s.kind, file: s.file, why: s.why });
    console.log(`  ${s.id} [${s.kind}] ${what} → ${d.slice(0, 16)}… (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
    if (opt("--only")) break;
}
console.log(`rebase: ${readSeq().steps.length} steps recorded`);
