// sisum.mjs <si dir> (after the pass-9 critic's, builds bp10 | bp8): the display-frame slot probe per engine, theme and sequence: longest empty
// run / minInk @ load for each run; runs with any empty frame per build; the lowest minInk per build; the largest one-frame rise per build.
import fs from "node:fs";
import path from "node:path";
const dir = process.argv[2], by = {}, tot = {}, low = {}, rise = {};
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const [b, e, t] = f.replace(".json", "").split("-");
  for (const x of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))) {
    const k = `${e} ${t} ${x.seq}`;
    ((by[k] ??= {})[b] ??= []).push(`${x.worstRun}/${x.minInk}@${x.load}`);
    const T = (tot[b] ??= [0, 0]); T[0]++; if (x.worstRun > 0) T[1]++;
    if (x.minInk != null && (low[b] == null || x.minInk < low[b][0])) low[b] = [x.minInk, k, x.load];
    if (/expand/.test(x.seq)) { const m = (rise[`${b} ${e} ${t}`] ??= [9, 0]); m[0] = Math.min(m[0], x.rise); m[1] = Math.max(m[1], x.rise); }
  }
}
for (const [k, v] of Object.entries(by)) console.log(`${k.padEnd(30)} bp10: ${(v.bp10 ?? []).join(" ")} | bp8: ${(v.bp8 ?? []).join(" ")}`);
console.log(JSON.stringify({ runs_with_empty_frame: Object.fromEntries(Object.entries(tot).map(([b, T]) => [b, `${T[1]}/${T[0]}`])), lowest_minInk: low }));
console.log("largest one-frame rise, first-/warm-expand (min-max):", JSON.stringify(rise));
