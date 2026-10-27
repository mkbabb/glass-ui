import fs from "node:fs";
const cols = [["C·l","bp-chromium/main"],["C·d","bp-chromium/dark"],["W·l","bp-webkit/main"],["W·d","bp-webkit/dark"]];
const rd = (p) => { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return null; } };
const cellsOf = (j) => (j?.cells ?? j ?? []).filter((c) => c.cell && !c.cell.startsWith("__"));
for (const [k, d] of cols) {
  const w3 = cellsOf(rd(`${d}/runs/W3-bp/W3.json`));
  let vmax = 0, vcell = "", stub = 0, rampMin = Infinity, hole = 0, inkMax = 0;
  for (const c of w3) { const v = c.leaving?.vanish?.drop ?? 0; if (v > vmax) { vmax = v; vcell = c.cell; } stub += c.stub?.stubFrames ?? 0; if (c.stub?.rampPx != null) rampMin = Math.min(rampMin, c.stub.rampPx); hole += c.hole?.holeFrames ?? c.hole?.frames ?? 0; inkMax = Math.max(inkMax, c.leaving?.inkMax ?? c.ink?.max ?? 0); }
  const rev = w3.find((c) => c.cell === "reversal"); const q = rev?.window?.q4c;
  console.log(k, `W3 vanish max ${vmax} (${vcell}); stub frames ${stub}; narrowest ramp ${rampMin} px; hole frames ${hole}; reversal q4c ${q ? JSON.stringify(q).slice(0,160) : "-"}; load ${w3[0]?.load}`);
  const fm = cellsOf(rd(`${d}/runs/FM-bp/FM.json`)); console.log(k, "FM", fm.map((c) => `${c.cell}:${c.pass ? "P" : "F"} stub ${c.stub?.stubFrames ?? "?"} ramp ${c.stub?.rampPx ?? "-"} hole ${c.hole?.holeFrames ?? c.hole?.frames ?? "?"}`).join(" | "));
  const cf = cellsOf(rd(`${d}/runs/CF-bp/CF.json`)); for (const c of cf.filter((c) => /^c8|^c9|^c2·prm|^c1·shape·h/.test(c.cell))) console.log(k, "CF", c.cell, (c.summary ?? c.why ?? "").toString().slice(0, 260));
  const r5 = cellsOf(rd(`${d}/runs/R5-bp/R5.json`)); console.log(k, "R5", r5.map((c) => `${c.cell}:${c.pass ? "P" : "F"}`).join(" "));
  const st = cellsOf(rd(`${d}/runs/ST-bp/ST.json`)); console.log(k, "ST", st.map((c) => `${c.cell}:${c.pass ? "P" : c.unmeasured ? "UM" : "F"}${c.videoScale ? "@" + c.videoScale : ""}`).join(" "));
}
