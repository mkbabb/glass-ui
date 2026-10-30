// sisum.mjs <si dir>: the display-frame slot probe per engine, theme and sequence: longest empty run / minInk @ load for
// each of the three runs, bp8 | bp7; then runs with any empty frame per build, and the largest one-frame rise per build.
import fs from "node:fs";
import path from "node:path";
const dir = process.argv[2], by = {}, tot = { bp8: [0, 0], bp7: [0, 0] }, rise = {};
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const [b, e, t, r] = f.replace(".json", "").split("-");
  for (const x of JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))) {
    const k = `${e} ${t} ${x.seq}`;
    ((by[k] ??= { bp8: [], bp7: [] })[b] ??= []).push(`${x.worstRun}/${x.minInk}@${x.load}`);
    tot[b][0]++; if (x.worstRun > 0) tot[b][1]++;
    if (/expand/.test(x.seq)) { const m = (rise[`${b} ${e} ${t}`] ??= [9, 0]); m[0] = Math.min(m[0], x.rise); m[1] = Math.max(m[1], x.rise); }
  }
}
for (const [k, v] of Object.entries(by)) console.log(`${k.padEnd(32)} bp8: ${v.bp8.join(" ")} | bp7: ${v.bp7.join(" ")}`);
console.log(JSON.stringify({ runs_with_empty_frame: { bp8: `${tot.bp8[1]}/${tot.bp8[0]}`, bp7: `${tot.bp7[1]}/${tot.bp7[0]}` } }));
console.log("largest one-frame rise, first-/warm-expand (min-max):", JSON.stringify(rise));
