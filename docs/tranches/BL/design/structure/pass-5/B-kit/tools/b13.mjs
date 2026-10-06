#!/usr/bin/env node
// b13.mjs — B-13: reconcile the pass-2 HEAD counts (prototype 1,902, critic 1,888) on one
// code base. The pass-2 gate (pass-2/kit/B-proto/tools/structure/{seal,index}.mjs) is run
// with --no-pin twice from a linked HEAD worktree: once over that worktree with the gate and
// its door landed at scripts/structure/ (the prototype's layout, migrate.sh's B-S17 copy), and
// once over the main checkout, read-only (the critic's layout: the gate ran from its own tree
// with --root <checkout>). Lines one run has and the other lacks are printed by clause.
//   node tools/b13.mjs --wt <linked HEAD worktree> --checkout <main checkout>
// The worktree must be a fresh HEAD worktree; the script writes only scripts/structure/ in it.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => resolve(args[args.indexOf(k) + 1]);
const wt = opt("--wt"), checkout = opt("--checkout");
const P2 = resolve(dirname(fileURLToPath(import.meta.url)), "../../../pass-2/kit/B-proto/tools/structure");
mkdirSync(join(wt, "scripts/structure"), { recursive: true });
for (const f of ["seal.mjs", "index.mjs"]) copyFileSync(join(P2, f), join(wt, "scripts/structure", f));
const tmp = mkdtempSync(join(tmpdir(), "b13-"));
const run = (root, out) => {
    try { execFileSync("node", [join(wt, "scripts/structure/seal.mjs"), "--root", root, "--no-pin", "--json", out], { stdio: "ignore" }); } catch (e) { if (e.status !== 1) throw e; }
    return JSON.parse(readFileSync(out, "utf8"));
};
const proto = run(wt, join(tmp, "wt.json"));
const crit = run(checkout, join(tmp, "co.json"));
rmSync(tmp, { recursive: true, force: true });
const total = (r) => Object.values(r.counts).reduce((a, b) => a + b, 0);
console.log(JSON.stringify({ prototypeLayout: { total: total(proto), counts: proto.counts }, criticLayout: { total: total(crit), counts: crit.counts } }));
for (const k of Object.keys(proto.V)) {
    const a = new Set(proto.V[k]), b = new Set(crit.V[k]);
    const only = [...a].filter((x) => !b.has(x)), other = [...b].filter((x) => !a.has(x));
    if (only.length || other.length) console.log(`${k}: +${only.length} in the prototype layout, +${other.length} in the critic layout\n${only.map((x) => `   wt  ${x}`).join("\n")}${other.length ? `\n${other.map((x) => `   co  ${x}`).join("\n")}` : ""}`);
}
