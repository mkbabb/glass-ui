// fails.mjs · print each cell of a witness JSON: verdict, failed checks, and the why of stub / leaving / vanish / blank / splice / lanes.
//   node fails.mjs <W.json> [--all]
import fs from "node:fs";
const j = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const all = process.argv.includes("--all");
for (const c of j.cells ?? j) {
  if (!c.cell || c.cell.startsWith("__")) continue;
  const v = c.verdict ?? (c.pass ? "PASS" : "FAIL");
  if (!all && c.pass) continue;
  const f = c.failed ?? [];
  const bits = [];
  const a = c.analysis ?? c;
  for (const k of f) {
    const x = a[k] ?? c[k] ?? a.checks?.[k];
    if (x && typeof x === "object" && x.why) bits.push(`${k}: ${x.why}`.slice(0, 300));
    else if (k === "vanish") bits.push(`vanish: ${JSON.stringify(c.vanish ?? a.vanish)} leaving.vanish ${JSON.stringify((c.leaving ?? a.leaving)?.vanish)}`);
    else bits.push(k);
  }
  console.log(`${v} ${c.cell} [${f.join(",")}] load ${c.load ?? ""}\n   ${bits.join("\n   ")}`);
}
