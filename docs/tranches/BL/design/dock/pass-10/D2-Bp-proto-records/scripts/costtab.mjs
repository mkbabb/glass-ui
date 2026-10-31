// costtab.mjs <cost dir>: the four 4× rows per build and round: frames over 25 ms / worst ms / main-thread ms per frame (load); totals per build.
import fs from "node:fs";
const dir = process.argv[2], tab = {}, sum = {};
for (const f of fs.readdirSync(dir).filter((f) => /^cost-.*\.json$/.test(f)).sort()) {
  const [, b, , r] = f.replace(".json", "").split("-");
  const j = JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8"));
  for (const c of j.cells.filter((c) => c.arm === "pcost" && c.throttle === 4 && (c.seats === 20 || c.seats === 40))) {
    const k = `4x ${c.seats} ${c.mode}`;
    ((tab[k] ??= {})[b] ??= []).push(`${r} ${c.over25ms}/${c.dtMax} (${c.trace?.mainTaskMsPerFrame}; ${c.load})`);
    sum[b] = (sum[b] ?? 0) + c.over25ms;
  }
}
for (const [k, v] of Object.entries(tab)) { console.log(k); for (const [b, l] of Object.entries(v)) console.log(`  ${b.padEnd(5)} ${l.join(" · ")}`); }
console.log("frames over 25 ms, the four rows:", JSON.stringify(sum));
