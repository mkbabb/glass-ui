#!/usr/bin/env node
// seal-staged.mjs — AUTHOR-SIDE (pass 10): run the kit's gate (gate/*, lib/law.mjs) on a linked worktree
// before S69 re-lands it, and put every byte back. It writes the kit's gate files over the tree's
// scripts/structure/seal/, runs the CLI, and restores each file (or removes one the tree did not
// hold) in a finally, so the tree's code digest is unchanged after the run (printed before and after).
//   node tools/seal-staged.mjs --root <linked worktree> [--grep <regex>]
// Exit: the CLI's exit (0, 1, 2); 2 on a throw here.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.on("uncaughtException", (e) => { console.error(`seal-staged: no verdict: ${e?.stack ?? e}`); process.exit(2); });
const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const a = process.argv.slice(2);
const opt = (k) => (a.includes(k) ? a[a.indexOf(k) + 1] : null);
if (!opt("--root")) throw new Error("seal-staged: --root is required");
const root = resolve(opt("--root"));
const re = new RegExp(opt("--grep") ?? "^(FAIL|seal)|value SCC|^\\s+cycle");
const { codeDigest } = await import(pathToFileURL(join(KIT, "lib/digest.mjs")).href);
const map = { "gate/seal.mjs": "seal.mjs", "gate/clauses.mjs": "clauses.mjs", "gate/peer.mjs": "peer.mjs", "gate/cycles.mjs": "cycles.mjs", "lib/law.mjs": "law.mjs", "gate/fallbacks.mjs": "fallbacks.mjs", "gate/walks.mjs": "walks.mjs", "gate/index.mjs": "index.mjs" };
const before = codeDigest(root).digest;
const prior = {};
let r;
try {
    for (const [k, t] of Object.entries(map)) {
        const f = join(root, "scripts/structure/seal", t);
        prior[f] = existsSync(f) ? readFileSync(f) : null;
        writeFileSync(f, readFileSync(join(KIT, k)));
    }
    r = spawnSync(process.execPath, [join(root, "scripts/structure/seal/seal.mjs"), "--root", root], { encoding: "utf8", maxBuffer: 1 << 27 });
} finally {
    for (const [f, b] of Object.entries(prior)) { if (b === null) unlinkSync(f); else writeFileSync(f, b); }
}
const after = codeDigest(root).digest;
console.log(r.stdout.split("\n").filter((l) => re.test(l)).join("\n"));
if (r.stderr.trim()) console.log(r.stderr.slice(0, 2000));
console.log(`seal-staged: exit ${r.status}; digest before ${before.slice(0, 16)}…, after ${after.slice(0, 16)}… (${before === after ? "unchanged" : "CHANGED"})`);
if (before !== after) throw new Error("seal-staged: the tree's bytes were not restored");
process.exitCode = r.status;
