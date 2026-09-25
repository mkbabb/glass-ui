#!/usr/bin/env node
// g-on-b.mjs — the merge test, direction G-on-B (REGISTRY §P2-6.4, S-13). G's gate, staged
// from G-kit/eponym/ with its authored names.json (stage-g.mjs), judges a tree: every clause
// is computed, and the verdict is read on the merge set (E0, E1, E1K, E2, E3, E3N, E3P, and
// B1, B8, B12, B14 as G adopted them). The other clauses (E4-E7, A1, S1, S2) are reported
// apart, as information: the merge test does not name them.
//   node g-on-b.mjs --tree <judged tree> --stage <scratch dir> --out <result.json> [--full <full.json>]
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { MERGE, stageG } from "./stage-g.mjs";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? resolve(args[args.indexOf(k) + 1]) : null);
const tree = opt("--tree"), stage = opt("--stage"), out = opt("--out"), full = opt("--full");
const G = await stageG(tree, stage);
const t0 = Date.now();
const r = G.judge(tree);
const merge = Object.fromEntries(MERGE.map((k) => [k, r.counts[k]]));
const rest = Object.fromEntries(G.CLAUSES.filter((k) => !MERGE.includes(k)).map((k) => [k, r.counts[k]]));
const red = MERGE.filter((k) => r.counts[k] > 0);
const result = {
    tree, files: r.files, edges: r.edges, ms: Date.now() - t0, rewired: G.rewired,
    merge, mergeTotal: Object.values(merge).reduce((a, b) => a + b, 0), verdict: red.length ? `RED (${red.join(", ")})` : "GREEN",
    rest, info: r.info,
    V: Object.fromEntries(MERGE.map((k) => [k, r.V[k]])),
};
writeFileSync(out, `${JSON.stringify(result, null, 1)}\n`);
if (full) writeFileSync(full, `${JSON.stringify({ counts: r.counts, V: r.V }, null, 1)}\n`);
console.log(JSON.stringify({ files: r.files, edges: r.edges, merge, verdict: result.verdict, rest }));
