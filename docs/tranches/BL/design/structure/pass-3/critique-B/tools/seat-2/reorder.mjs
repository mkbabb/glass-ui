// critique-B seat 2 · judge the ./styles reorder the route lists (B-kit LAW §6 "listed reorders"): for every rule
// whose position relative to the others changed, find the rules it swapped order with, and report any swap pair
// that could change the cascade: the same selector text (after the layer prefix), or a shared declared property
// on selectors that share a class/element token. The seq files are cascade.mjs snapshot output (one rule a line).
//   node reorder.mjs <base.seq> <final.seq>
import { readFileSync } from "node:fs";
const [A, B] = process.argv.slice(2).map((p) => readFileSync(p, "utf8").split("\n").filter(Boolean));
const idx = new Map(); B.forEach((r, i) => { if (!idx.has(r)) idx.set(r, []); idx.get(r).push(i); });
const used = new Map(); const pos = A.map((r) => { const l = idx.get(r) ?? []; const k = used.get(r) ?? 0; used.set(r, k + 1); return l[k] ?? -1; });
// longest increasing subsequence of pos = the rules that kept their relative order; the rest moved
const n = pos.length, tails = [], prev = new Array(n).fill(-1), tailIdx = [];
for (let i = 0; i < n; i++) { let lo = 0, hi = tails.length; while (lo < hi) { const m = (lo + hi) >> 1; if (tails[m] < pos[i]) lo = m + 1; else hi = m; } tails[lo] = pos[i]; tailIdx[lo] = i; prev[i] = lo ? tailIdx[lo - 1] : -1; }
const keep = new Set(); for (let i = tailIdx[tails.length - 1]; i >= 0; i = prev[i]) keep.add(i);
const moved = [...Array(n).keys()].filter((i) => !keep.has(i));
const parse = (r) => { const m = /^(.*?)::\s*(.*?)\s*\{(.*)\}\s*$/.exec(r); if (!m) return { ctx: "", sel: r, props: new Set() };
  return { ctx: m[1].trim(), sel: m[2], props: new Set([...m[3].matchAll(/(?:^|;)\s*([-a-z]+)\s*:/g)].map((x) => x[1])) }; };
const toks = (sel) => new Set((sel.match(/[.#]?[-_a-zA-Z][-_a-zA-Z0-9]*/g) ?? []).filter((t) => t.startsWith(".") || t.startsWith("#") || /^[a-z]+$/.test(t)));
const risks = [], anyShared = [];
for (const i of moved) {
  const ri = parse(A[i]);
  for (let j = 0; j < n; j++) {
    if (j === i || pos[j] < 0) continue;
    const swapped = (j < i) !== (pos[j] < pos[i]); if (!swapped) continue;
    const rj = parse(A[j]); if (ri.ctx !== rj.ctx && ri.ctx && rj.ctx && !ri.ctx.startsWith(rj.ctx) && !rj.ctx.startsWith(ri.ctx)) continue;
    const shared = [...ri.props].filter((p) => rj.props.has(p)); if (!shared.length) continue;
    anyShared.push({ moved: A[i].slice(0, 90), swappedWith: A[j].slice(0, 110), sharedProps: shared.slice(0, 6) });
    const ti = toks(ri.sel), tj = toks(rj.sel); const common = [...ti].filter((t) => tj.has(t));
    if (ri.sel === rj.sel || common.length || rj.sel.includes(":root") && ri.sel.includes(":root")) risks.push({ moved: A[i].slice(0, 140), swappedWith: A[j].slice(0, 140), sharedProps: shared.slice(0, 6), commonTokens: common.slice(0, 6) });
  }
}
console.log(JSON.stringify({ rules: n, moved: moved.length, movedRules: moved.slice(0, 20).map((i) => A[i].slice(0, 100)), riskPairs: risks.length, risks: risks.slice(0, 20), sharedPropPairs: anyShared.length, shared: anyShared.slice(0, 12) }, null, 1));
