#!/usr/bin/env node
// rebase.mjs — AUTHOR-SIDE (pass 11, P10-R1 (a)): carry the pass-10 chain onto the re-cut floor. The
// docs floor now carries the root-relative `./`-lead cure (FLOOR.md P11-F1), so S1 lands it and
// S74c, the chain step that patched the landed copy, leaves the chain. The tool starts pass 11's
// frozen/SEQUENCE.json at the tree's base, lands S1 (the floor rows of the checkout's floor), then
// applies each later pass-10 step's frozen file, as it is, through the same writers the replay uses
// (lib/row.mjs, the tree's own move engine), and records the digest the tree then holds. It stops at
// the first step whose frozen text no longer applies, and at a step that changes nothing (a step the
// cut already holds must be dropped by name, never skipped in silence).
//   node rebase.mjs --root <wt> --start --drop S74c    (base + S1, then every step it can)
//   node rebase.mjs --root <wt> --from <id> --drop S74c (resume with step <id> of the pass-10 chain)
//   --until <id>                                        (stop before <id>)
// The pass-10 chain is read from the committed pass-10 kit; the steps it names are this kit's
// copies of the same frozen files (frozen/ was copied unchanged).
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { applyRow } from "./lib/row.mjs";
import { codeDigest } from "./lib/digest.mjs";
import { KIT, readSeq, recordStep, startSeq } from "./lib/sequence.mjs";

const a = process.argv.slice(2);
const opt = (k) => {
    const i = a.indexOf(k);
    if (i < 0) return null;
    if (i + 1 >= a.length || a[i + 1].startsWith("--")) throw new Error(`rebase: ${k} takes a value`);
    return a[i + 1];
};
if (!opt("--root")) throw new Error("rebase: --root is required");
const root = resolve(opt("--root"));
const P10 = JSON.parse(readFileSync(join(KIT, "../../pass-10/B-kit/frozen/SEQUENCE.json"), "utf8"));
const FLOOR_ROWS = resolve(KIT, "../../floor/rows/apply.mjs");
const drop = new Set(a.flatMap((x, i) => (x === "--drop" ? [a[i + 1]] : [])));
for (const id of drop) if (!P10.steps.some((s) => s.id === id)) throw new Error(`rebase: --drop ${id} names no pass-10 step`);

function apply(s) {
    if (s.kind === "floor-rows") { execFileSync("node", [FLOOR_ROWS, "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 }); return "floor rows"; }
    if (s.kind === "moves") {
        const out = execFileSync("node", [join(root, "scripts/structure/move.mjs"), join(KIT, s.file), "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 });
        const r = JSON.parse(out.slice(out.indexOf("{"), out.indexOf("\n}") + 2));
        return `moves ${r.pending ?? 0} pending`;
    }
    if (s.kind !== "row") throw new Error(`rebase: step ${s.id} has unknown kind ${s.kind}`);
    const r = applyRow(root, JSON.parse(readFileSync(join(KIT, s.file), "utf8")));
    return `row ${r.written} written`;
}

let steps = P10.steps.filter((s) => !drop.has(s.id));
if (a.includes("--start")) {
    const sha = execFileSync("git", ["-C", root, "rev-parse", "--short=8", "HEAD"], { encoding: "utf8" }).trim();
    const seq = startSeq(root, sha);
    console.log(`chain started at ${sha}, base ${seq.base.slice(0, 16)}… (pass-10 base ${P10.base.slice(0, 16)}…: ${seq.base === P10.base ? "equal" : "DIFFERS"}); dropped: ${[...drop].join(", ") || "none"}`);
} else if (opt("--from")) {
    const i = steps.findIndex((s) => s.id === opt("--from"));
    if (i < 0) throw new Error(`rebase: no kept pass-10 step ${opt("--from")}`);
    steps = steps.slice(i);
} else throw new Error("rebase: --start or --from <id> is required");
const until = opt("--until");
for (const s of steps) {
    if (s.id === until) break;
    const t0 = Date.now();
    let what;
    try { what = apply(s); } catch (e) { console.error(`REBASE STOP at ${s.id}: ${String(e.stderr || e.message).slice(0, 1500)}`); process.exit(1); }
    const d = recordStep(root, { id: s.id, kind: s.kind, file: s.file, why: s.why });
    const p10 = P10.steps.find((x) => x.id === s.id).digest;
    console.log(`  ${s.id} [${s.kind}] ${what} → ${d.slice(0, 16)}… (pass 10 ${p10.slice(0, 16)}…: ${d === p10 ? "equal" : "differs"}; ${((Date.now() - t0) / 1000).toFixed(1)} s)`);
}
console.log(`rebase: ${readSeq().steps.length} steps recorded`);
