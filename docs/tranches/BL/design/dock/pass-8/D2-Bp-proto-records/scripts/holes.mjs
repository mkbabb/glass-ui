// holes.mjs: per FM.json under a dir, each B2 cell's H7-1 hole frames, its longest run, and the lowest ink seat 2's
// slot (and its partner 8, the leaving "P") reads in any cast frame of the move. node holes.mjs <dir>
import fs from "node:fs"; import path from "node:path";
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name === "FM.json" ? [path.join(d, e.name)] : []);
for (const f of walk(process.argv[2]).sort()) {
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  const row = (j.cells ?? j.results).map((c) => {
    const h = c.hole ?? {}; let mn = Infinity;
    for (const fr of h.frames ?? []) { const m = new Map(fr[3]); const v = Math.max(m.get(2) ?? 0, m.get(8) ?? 0); if (m.has(2) || m.has(8)) mn = Math.min(mn, v); }
    return `${c.cell.replace("film·", "")} ${h.holeFrames ?? "?"}/${h.worst?.run ?? h.worst?.length ?? 0} min2 ${Number.isFinite(mn) ? mn.toFixed(2) : "-"} (${c.load})`;
  });
  console.log(path.relative(process.argv[2], f).replace("/runs/FM-bp8/FM.json", ""), "|", row.join(" · "));
}
