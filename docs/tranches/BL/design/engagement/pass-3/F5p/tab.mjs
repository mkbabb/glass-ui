// F5' tabulator: per witness and engine, HEAD against F5' (counts), and every cell whose status moved.
//   node tab.mjs [--engine chromium|webkit] [--a head] [--b f5p] [--cells E-4,E-7] (print every cell of those witnesses)
import fs from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const eng = arg("engine", "chromium"), A = arg("a", "head"), B = arg("b", "f5p"), show = (arg("cells", "") || "").split(",").filter(Boolean);
const W = ["E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9", "E-10", "E-11"];
const rd = (lab, w) => { try { return JSON.parse(fs.readFileSync(path.join(HERE, "json", lab, `${w}-${eng}.json`), "utf8")); } catch { return null; } };
const cnt = (j) => { if (!j) return "not read"; const c = {}; for (const x of j.cells) c[x.status] = (c[x.status] ?? 0) + 1; return `${j.verdict} ${c.PASS ?? 0} P / ${c.FAIL ?? 0} F / ${c.UNMEASURED ?? 0} U / ${c.REPORT ?? 0} R (load ${j.loadStart}→${j.loadEnd})`; };
console.log(`| witness | ${A} ${eng} | ${B} ${eng} |\n|---|---|---|`);
const moved = [];
for (const w of W) {
  const a = rd(A, w), b = rd(B, w);
  console.log(`| ${w} | ${cnt(a)} | ${cnt(b)} |`);
  if (a && b) { const m = new Map(a.cells.map((x) => [x.name, x])); for (const x of b.cells) { const y = m.get(x.name); if (!y || y.status !== x.status) moved.push(`${x.name}: ${y?.status ?? "absent"} → ${x.status} · ${A}: ${(y?.line ?? "").slice(0, 160)} · ${B}: ${x.line.slice(0, 200)}`); } }
  if (show.includes(w)) for (const lab of [A, B]) for (const x of (rd(lab, w)?.cells ?? [])) console.log(`    [${lab}] ${x.status} ${x.name} · ${x.line.slice(0, 260)} · load ${x.load}`);
}
console.log(`\nmoved (${moved.length}):`); for (const l of moved) console.log(`- ${l}`);
