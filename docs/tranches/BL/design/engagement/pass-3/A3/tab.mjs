// P-A3 tabulator: per witness and engine, P/F/U/R counts and every non-PASS cell, from json/<label>/.
//   node tab.mjs <label> [engine] [--fails]
import fs from "node:fs";
const [label, engine] = process.argv.slice(2).filter((x) => !x.startsWith("--"));
const fails = process.argv.includes("--fails");
const dir = new URL(`./json/${label}/`, import.meta.url).pathname;
for (const f of fs.readdirSync(dir).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)))) {
  if (engine && !f.includes(engine)) continue;
  const j = JSON.parse(fs.readFileSync(dir + f, "utf8"));
  const n = (s) => j.cells.filter((c) => c.status === s).length;
  console.log(`${f.replace(".json", "")}: ${j.verdict} · ${n("PASS")} P / ${n("FAIL")} F / ${n("UNMEASURED")} U / ${n("REPORT")} R · load ${j.loadStart} → ${j.loadEnd}`);
  if (fails) for (const c of j.cells) if (c.status === "FAIL" || c.status === "UNMEASURED") console.log(`   ${c.status} ${c.name} :: ${String(c.line).slice(0, 230)}`);
}
