#!/usr/bin/env node
// replay.mjs — the D1-G migration from committed artifacts only. It reads ../SEQUENCE.json and
// applies each step in order to a linked worktree that already carries the floor rows
// (floor/rows/apply.mjs): `land` lands the gate; a `list` step goes through the floor's F-2
// engine (apply-list.mjs: preflight, image check, FD-2 as a stop); a `row` step is an exact-text
// row (apply-row.mjs) with FD-2 judged across it (fd2-pairs.mjs: a row that adds a co-cyclic
// module pair stops the replay). Nothing is computed: every list and row is frozen JSON.
//
// The chain is digest-anchored. SEQUENCE.json carries `base` (the code digest of HEAD plus the
// floor rows) and, per step, the code digest the tree holds after it (code = every file outside
// docs/). The run reads the tree's digest first: the base starts at step 0, a step's digest
// resumes after it, the last step's digest means the chain is applied and nothing is written,
// and any other digest is refused before a write. After every step the digest must equal the
// recorded one or the run stops. --twice applies each step a second time straight after the
// first and requires the digest unchanged (per-step idempotence); running the whole replay a
// second time is whole-chain idempotence (it writes nothing).
// --record (generation only, by the route's author) writes the digests into SEQUENCE.json.
//   node replay.mjs --root <linked worktree> [--twice] [--record]
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const twice = args.includes("--twice");
const record = args.includes("--record");
const gitDir = execFileSync("git", ["-C", root, "rev-parse", "--git-dir"], { encoding: "utf8" }).trim();
const common = execFileSync("git", ["-C", root, "rev-parse", "--git-common-dir"], { encoding: "utf8" }).trim();
if (resolve(root, gitDir) === resolve(root, common)) { console.error("replay refuses the main checkout"); process.exit(2); }
const SEQ_PATH = join(KIT, "SEQUENCE.json");
const SEQ = JSON.parse(readFileSync(SEQ_PATH, "utf8"));
const node = (script, ...a) => execFileSync("node", [join(KIT, "tools", script), ...a], { encoding: "utf8", maxBuffer: 1 << 28 });
const pairs = join(tmpdir(), `g-replay-pairs-${process.pid}.json`);
const t0 = Date.now();

const { treeDigest } = await import(`${root}/scripts/structure/lib/move.mjs`);
const { openTree } = await import(`${root}/scripts/structure/lib/tree.mjs`);
function code() {
    const files = openTree(root).files.filter((f) => !f.startsWith("docs/"));
    return { digest: treeDigest(root, files), files: files.length };
}

function step(s) {
    if (s.kind === "land") return node("land.mjs", "--root", root).trim();
    if (s.kind === "list") {
        let out;
        try { out = node("apply-list.mjs", join(KIT, s.file), "--root", root); } catch (e) { process.stdout.write(e.stdout ?? ""); throw new Error(`${s.id}: the engine refused ${s.file}`); }
        const r = JSON.parse(out.split("\n")[0]);
        return `list ${s.file}: moves ${r.moves}, pending ${r.pending}, applied ${r.alreadyApplied}, rewrites ${r.rewrites}, residue ${r.residue}, lost ${r.lost}, gained ${r.gained}, FD-2 +${r.fd2?.addedPairs ?? 0}`;
    }
    if (s.kind === "row") {
        node("fd2-pairs.mjs", "--root", root, "--save", pairs);
        let r;
        try { r = JSON.parse(node("apply-row.mjs", join(KIT, s.file), "--root", root).trim()); } catch (e) { throw new Error(`${s.id}: row ${s.file} does not match the tree: ${e.stdout}`); }
        try { node("fd2-pairs.mjs", "--root", root, "--against", pairs); } catch (e) { throw new Error(`${s.id}: FD-2 stop — the row adds a co-cyclic pair: ${e.stdout}`); }
        return `row ${s.file}: written ${r.written}, applied ${r.alreadyApplied}, FD-2 +0`;
    }
    throw new Error(`unknown step kind ${s.kind}`);
}

let d = code().digest;
let start;
if (record) { SEQ.base = d; start = 0; }
else if (d === SEQ.base) start = 0;
else {
    const i = SEQ.steps.findIndex((s) => s.digest === d);
    if (i < 0) { console.error(`replay: the tree's code digest ${d} is neither the base nor a step on the chain; refusing to write`); process.exit(1); }
    start = i + 1;
}
console.log(`replay: ${start === SEQ.steps.length ? "the chain is applied; nothing to write" : start ? `resuming after ${SEQ.steps[start - 1].id}` : "from the base"} (code digest ${d})`);
for (let i = start; i < SEQ.steps.length; i++) {
    const s = SEQ.steps[i];
    const what = step(s);
    d = code().digest;
    if (record) s.digest = d;
    else if (d !== s.digest) { console.error(`replay: after ${s.id} the code digest is ${d}; the chain records ${s.digest}; stopping`); process.exit(1); }
    let again = "";
    if (twice) {
        again = ` · again: ${step(s)}`;
        if (code().digest !== d) { console.error(`replay: applying ${s.id} a second time changed the tree`); process.exit(1); }
    }
    console.log(`  ${s.id} ${what}${again} → ${d.slice(0, 16)}`);
}
if (record) writeFileSync(SEQ_PATH, `${JSON.stringify(SEQ, null, 4)}\n`);
const fin = code();
const tree = openTree(root).files;
const final = SEQ.steps.at(-1).digest;
console.log(`replay done in ${((Date.now() - t0) / 1000).toFixed(1)} s; code digest ${fin.digest} over ${fin.files} files (docs/ left out); tree digest ${treeDigest(root, tree)} over ${tree.length}; chain final ${final === fin.digest ? "MATCH" : "DIFFERS"}`);
process.exitCode = final === fin.digest ? 0 : 1;
