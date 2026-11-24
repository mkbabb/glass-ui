// compare.mjs <filmerDir> <checkDir> engine:cell ...   prints per-motion numbers side by side
import fs from "node:fs"; import path from "node:path";
const [A, B, ...cells] = process.argv.slice(2);
const r1 = (v) => (v == null ? "-" : Math.round(v * 10) / 10);
const ab = Math.abs;
function sum(a) {
  if (!a || a.err) return a?.err ? "ERR " + a.err.slice(0, 60) : "-";
  const o = a.outer ?? {}; const outer = Math.max(ab(o.l ?? 0), ab(o.c ?? 0), ab(o.r ?? 0), ab(o.t ?? 0), ab(o.w ?? 0));
  const p = a.plate ?? {}; const plate = Math.max(ab(p.l ?? 0), ab(p.c ?? 0), ab(p.r ?? 0), ab(p.t ?? 0), ab(p.w ?? 0));
  const ss = Object.entries(a.seats ?? {}).filter(([, s]) => Math.max(ab(s.dcx), ab(s.dw)) > 0.5);
  const seat = ss.length ? `${ss.length}seats dcx${r1(Math.max(...ss.map(([, s]) => s.dcx), ...ss.map(([, s]) => -ab(s.dcx))))}/${r1(Math.min(...ss.map(([, s]) => s.dcx)))} dw${r1(Math.min(...ss.map(([, s]) => s.dw)))}` : "none";
  const t = Object.entries(a.toggles ?? {}).map(([k, v]) => `${k}:dw${r1(v.dw)},dcx${v.dcx},n${v.framesOver05}`).join(" ");
  const mo = (a.overshoot ?? []).find(([k]) => k === "mark.l");
  const run = a.run ? `ov${a.run.overflow} sl${a.run.restScrollLeft}->${a.run.endScrollLeft} d${a.run.maxScrollChange}` : "";
  return `outer ${r1(outer)} plate ${r1(plate)} | seats ${seat} | run ${run} | tog ${t || "-"} | settle ${r1(a.settle)} dock ${r1(a.dockSettle)} | mark ${mo ? r1(mo[2]) : "-"} | lf ${r1(a.longestFrame)}`;
}
for (const ec of cells) {
  const [eng, cell] = ec.split(":");
  const fa = JSON.parse(fs.readFileSync(path.join(A, "runs", eng, cell + ".json"), "utf8"));
  const fb = JSON.parse(fs.readFileSync(path.join(B, "runs", eng, cell + ".json"), "utf8"));
  console.log(`\n### ${eng} ${cell}  (load1 filmer ${r1(fa.load1)}, check ${r1(fb.load1)})`);
  const ld = (c) => c.load ? `first ${r1(c.load.firstDockAt)} ms op ${c.load.firstDockOpacity} moving ${c.load.dockMovingFrames} outer ${r1(Math.max(ab(c.load.outer?.l ?? 0), ab(c.load.outer?.t ?? 0), ab(c.load.outer?.w ?? 0)))}` : "-";
  console.log(`a-load\n  F ${ld(fa)}\n  C ${ld(fb)}`);
  for (const m of new Set([...Object.keys(fa.motions), ...Object.keys(fb.motions)])) {
    console.log(`${m}\n  F ${sum(fa.motions[m])}\n  C ${sum(fb.motions[m])}`);
  }
  console.log(`faults F: ${(fa.faults ?? []).map((f) => f.motion + ":" + f.kind).join(", ")}`);
  console.log(`faults C: ${(fb.faults ?? []).map((f) => f.motion + ":" + f.kind).join(", ")}`);
}
