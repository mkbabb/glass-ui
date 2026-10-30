// fmsum.mjs <battery dir> [build]: every FM read of the six B2 cells, per column (engine × theme), battery (main, re-run 1,
// re-run 2) and fmlow (r1-r3): hole frames and worst run (slot, offset), stub frames with slot (glyph, seat), offset and
// the hard edge's x (px), load. Reading only; enters no row (the digest's film·hole·column and H7-3 are the row witnesses).
import fs from "node:fs";
import path from "node:path";
const bat = process.argv[2], build = process.argv[3] ?? "bp8";
const rows = [], col = {};
for (const eng of ["chromium", "webkit"]) for (const [stage, theme] of [["main", "light"], ["dark", "dark"], ["fmlow-light", "light"], ["fmlow-dark", "dark"]]) {
  for (const [sub, run] of [["runs", stage.startsWith("fmlow") ? "r1" : "main"], ["rerun1/runs", stage.startsWith("fmlow") ? "r2" : "rerun1"], ["rerun2/runs", stage.startsWith("fmlow") ? "r3" : "rerun2"]]) {
    const f = path.join(bat, "json", `${build}-${eng}`, stage, sub, `FM-${build}`, "FM.json");
    if (!fs.existsSync(f)) continue;
    const j = JSON.parse(fs.readFileSync(f, "utf8"));
    for (const c of j.cells.filter((c) => /^film·(first-expand|warm-expand|warm-collapse|content-add|swap-short|swap-long)$/.test(c.cell))) {
      const k = `${eng === "webkit" ? "W" : "C"}·${theme[0]}`;
      const h = c.hole ?? {}, s = c.stub ?? {};
      const r = { col: k, src: stage.startsWith("fmlow") ? "fmlow" : "battery", run, cell: c.cell.replace("film·", ""), verdict: c.pass ? "PASS" : "FAIL",
        hole: h.holeFrames ?? null, worst: h.worst ? JSON.stringify(h.worst) : "", stub: s.stubFrames ?? 0,
        stubAt: s.first ? `"${s.first.ch}" in ${s.first.label} ${Math.round(s.first.frac * 100)} % at +${s.first.atMs} ms, edge ${s.first.edgePx} px (${s.first.edgeWidthPx} px wide)` : "", load: c.load };
      rows.push(r);
      const t = (col[k] ??= { reads: 0, holeFrames: 0, holeReads: 0, stubReads: [], loads: [] });
      t.reads++; t.holeFrames += r.hole ?? 0; if ((r.hole ?? 0) > 0) t.holeReads++; t.loads.push(r.load);
      if (r.stub) t.stubReads.push(`${r.src} ${r.run} ${r.cell}: ${r.stubAt} [load ${r.load}]`);
    }
  }
}
for (const r of rows) console.log(`${r.col} ${r.src} ${r.run} ${r.cell} ${r.verdict} hole=${r.hole}${r.worst ? " worst=" + r.worst : ""} stub=${r.stub}${r.stub ? " " + r.stubAt : ""} load=${r.load}`);
console.log("\n== per column");
for (const [k, t] of Object.entries(col)) console.log(`${k}: ${t.reads} reads, ${t.holeFrames} hole frames in ${t.holeReads} reads, ${t.stubReads.length} stub reads; load ${Math.min(...t.loads)}-${Math.max(...t.loads)}${t.stubReads.length ? "\n  " + t.stubReads.join("\n  ") : ""}`);
