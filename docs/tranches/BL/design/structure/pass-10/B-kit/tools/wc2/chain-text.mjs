#!/usr/bin/env node
// chain-text.mjs — P9-6.3 "route · MIGRATION" (P9-R2 (a)): W-C.2's C2-G1 and C2-G4 read over the text
// the chain writes into MIGRATION.md. The floor base's MIGRATION.md carries hundreds of META hits and
// 26 shape misses that are W-C.2's own landing work (its §2), so the whole-file readings are printed
// beside the chain's delta, and the verdict is on the delta:
//   C2-G1 (appendix A's META set, copied verbatim from W-C.2 appendix A): every line the chain adds or
//         re-words (git diff --no-index, base -> route, `+` lines) has 0 hits;
//   C2-G4 (appendix B, tools/wc2/migration-shape.mjs, run in each tree): the route's misses minus the
//         base's misses is 0, and every heading the chain adds is a bare version.
//   node tools/wc2/chain-text.mjs --base <floor-base tree> --route <route tree> [--published v1,v2,…]
// Exit 0 when both deltas are 0, 1 when either is not, 2 on any throw.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

process.on("uncaughtException", (e) => { console.error(`chain-text: no verdict: ${e?.stack ?? e}`); process.exit(2); });
const HERE = dirname(fileURLToPath(import.meta.url));
const a = process.argv.slice(2);
const opt = (k) => { const i = a.indexOf(k); if (i < 0 || !a[i + 1]) throw new Error(`chain-text: ${k} is required`); return resolve(a[i + 1]); };
const base = opt("--base"), route = opt("--route");
// appendix B's second argument: the registry's published versions, comma-separated; the seat has no
// registry read, so it is passed empty and the published-version check is off (stated in the output)
const published = a.includes("--published") ? a[a.indexOf("--published") + 1] : "";
for (const t of [base, route]) if (!existsSync(join(t, "MIGRATION.md"))) throw new Error(`chain-text: ${t}/MIGRATION.md is missing`);

const META = [
  ["row-ref", /\b(?:A[A-Z]|B[A-Z])\s?#\d+/g], ["dated-bracket", /\[20\d\d-\d\d-\d\d\b/g], ["strike", /~~/g], ["oplus", /⊕/g],
  ["wave-id", /\b(?:[A-Z]{1,2}|IOS27-MICRO)\.(?:W|B|P)[0-9][A-Za-z0-9-]*|\bW-[A-Z][A-Z0-9-]{2,}/g],
  ["finding-id", /\bO-\d{2}\b|\bRT-\d+[A-Z]?\b|\bTR#\d+|\bL\d\d[ab]?-(?:F)?\d\d\b|\bR\d{1,2}-\d\d-\d\d\b|\bUIA-[A-Z]+-\d+\b/g],
  ["proof-script", /\bproof:[a-z][a-z0-9-]*/g], ["sha", /`[0-9a-f]{8}`/g], ["claude-md", /CLAUDE\.md/g], ["record-cite", /docs\/tranches\//g],
];
// the tranche-id words P9-R2 names: a tranche id in a heading or the word "tranche"
const TRANCHE = /\bBL\b|\btranche\b/i;

const d = spawnSync("git", ["diff", "--no-index", "--unified=0", join(base, "MIGRATION.md"), join(route, "MIGRATION.md")], { encoding: "utf8", maxBuffer: 1 << 28 });
if (d.status !== 0 && d.status !== 1) throw new Error(`chain-text: git diff exit ${d.status}: ${d.stderr}`);
const added = d.stdout.split("\n").filter((l) => l.startsWith("+") && !l.startsWith("+++")).map((l) => l.slice(1));
const removed = d.stdout.split("\n").filter((l) => l.startsWith("-") && !l.startsWith("---")).map((l) => l.slice(1));
if (!added.length) throw new Error("chain-text: the route's MIGRATION.md adds no line to the base's; this is not the chain's tree");
// a line the chain re-words keeps the META hits the base's line already had: the chain's own hits are
// the added lines' hits less the removed lines' hits, as a multiset of (class, match)
const left = new Map();
for (const line of removed) for (const [k, re] of META) for (const m of line.matchAll(re)) left.set(`${k} ${m[0]}`, (left.get(`${k} ${m[0]}`) ?? 0) + 1);
const hits = [], kept = [];
added.forEach((line, i) => { for (const [k, re] of META) for (const m of line.matchAll(re)) {
    const key = `${k} ${m[0]}`, n = left.get(key) ?? 0;
    if (n > 0) { left.set(key, n - 1); kept.push(`+${i + 1} ${key} | ${line.slice(0, 90)}`); } else hits.push(`+${i + 1} ${key} | ${line.slice(0, 90)}`);
} });
const tranche = added.filter((l) => TRANCHE.test(l));
const heads = added.filter((l) => /^## /.test(l));
const badHeads = heads.filter((l) => !/^## \d+\.\d+\.\d+$/.test(l));

const shape = (t) => {
    const r = spawnSync(process.execPath, [join(HERE, "migration-shape.mjs"), "MIGRATION.md", published, "--list"], { cwd: t, encoding: "utf8" });
    if (r.status !== 0 && r.status !== 1) throw new Error(`migration-shape exit ${r.status}: ${r.stderr}`);
    const m = /(\d+) headings · (\d+) misses/.exec(r.stdout);
    if (!m) throw new Error(`chain-text: migration-shape printed no count in ${t}`);
    return { headings: +m[1], misses: +m[2], lines: r.stdout.trim().split("\n").slice(1) };
};
const sb = shape(base), sr = shape(route);
const newMisses = sr.lines.filter((l) => !sb.lines.includes(l));

console.log(`chain-text: the chain adds ${added.length} MIGRATION.md lines (${heads.length} heading(s): ${heads.join(" | ") || "none"})`);
console.log(`C2-G1 over the chain's lines: META ${hits.length} added by the chain (${kept.length} carried on base lines it re-words); lines naming BL or "tranche": ${tranche.length}`);
for (const h of kept) console.log(`  CARRIED ${h}`);
for (const h of hits) console.log(`  META ${h}`);
for (const l of tranche) console.log(`  TRANCHE ${l.slice(0, 120)}`);
console.log(`C2-G4 (published list: ${published || "none passed; the published-version arm is off"}): base ${sb.headings} headings · ${sb.misses} misses; route ${sr.headings} headings · ${sr.misses} misses; misses the route adds: ${newMisses.length}; chain headings not a bare version: ${badHeads.length}`);
for (const l of newMisses) console.log(`  NEW-MISS ${l}`);
const red = hits.length + tranche.length + newMisses.length + badHeads.length;
console.log(`chain-text: ${red ? "RED" : "GREEN"}`);
process.exitCode = red ? 1 : 0;
