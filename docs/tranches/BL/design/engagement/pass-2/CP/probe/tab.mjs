#!/usr/bin/env node
// tab.mjs · tabulates the bake-off probe's JSON across reps: per cell × build × engine, the verdicts of every rep and
// the cell's deciding numbers (min–max over reps and themes).   node tab.mjs <json dir> rep1 rep2 rep3
import fs from "node:fs";
import path from "node:path";
const [dir, ...reps] = process.argv.slice(2);
const rows = [];
for (const r of reps) for (const f of fs.readdirSync(path.join(dir, r)).filter((x) => x.startsWith("cp-"))) {
  const d = JSON.parse(fs.readFileSync(path.join(dir, r, f), "utf8"));
  for (const c of d.cells) rows.push({ rep: r, build: d.label, engine: d.engine, ...c });
}
const rng = (v) => { v = v.filter(Number.isFinite); return v.length ? `${Math.min(...v).toFixed(4)}–${Math.max(...v).toFixed(4)}` : "—"; };
const key = (c) => `${c.cellId}|${c.kind ?? ""}|${c.scene}|${c.theme}|${c.build}|${c.engine}`;
const g = new Map(); for (const c of rows) { const k = key(c); if (!g.has(k)) g.set(k, []); g.get(k).push(c); }
const out = [];
for (const [k, cs] of [...g.entries()].sort()) {
  const [cell, kind, scene, theme, build, engine] = k.split("|");
  if (kind === "single") continue;
  const v = cs.map((c) => `${c.rep.replace("rep", "r")}:${c.status}`).join(" ");
  let nums = "";
  if (cell === "c1") nums = `cut ${rng(cs.map((c) => c.cut))} · drop ${rng(cs.map((c) => c.drop2))} vs ref ${rng(cs.map((c) => c.dropRef))} · rise2 ${rng(cs.map((c) => c.rise2))} of single ${rng(cs.map((c) => c.rise1))}`;
  if (cell === "c2") nums = `drop ${rng(cs.map((c) => c.drop))}${kind === "re-press" ? ` vs ref ${rng(cs.map((c) => c.ref))}` : ` · rise ${rng(cs.map((c) => c.rise))} · scale step ${rng(cs.map((c) => c.sStep))}`}`;
  if (cell === "c3") nums = `k ${rng(cs.map((c) => c.k))} · rise ${rng(cs.map((c) => c.rise))} of in-app ${rng(cs.map((c) => c.riseApp))}`;
  if (cell === "c4") nums = `iii ${cs.map((c) => (c.iii ? 1 : 0)).join("")} · rise ${rng(cs.map((c) => c.rise))} · scale ${rng(cs.map((c) => c.sRange))} · anims ${[...new Set(cs.flatMap((c) => c.anims ?? []))].join(",").slice(0, 90)}`;
  out.push(`${cell} ${kind.padEnd(12)} ${scene.padEnd(9)} ${theme.padEnd(5)} ${build.padEnd(7)} ${engine.padEnd(8)} ${v} · ${nums}`);
}
console.log(out.join("\n"));
