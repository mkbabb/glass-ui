#!/usr/bin/env node
// T · Transmission per rung (H-12). Reported for every route; NOT gated until the owner rules §5 Q-2 and Q-3.
// Per engine × theme, per surface of the ladder and dialog scenes:
//   T = 1 − α, α the painted veil from the composites over black and white (lib.mjs paintedAlpha: exact for any
//        affine composite, with no blur or saturate of a flat ground to confound it);
//   T_c1 = how much of the c1 aurora reaches the composite: the least-squares slope of (composite − pole) on
//        (raw field − pole) over the sample region's mean colour, pole from the black/white read. Blur preserves the
//        mean over the region; saturate and any non-affine step show up as T_c1 ≠ T.
// The report exits 0. With --expect <json> ({ "<theme>": { "<spec>": α } }) it becomes the instrument's own check:
// exit 1 when any measured α misses its expected value by more than 0.01 (the self-test's fixture PASS and plant).
//   node t-transmission.mjs <capdir> [--expect <json>] [--gate chromium[,webkit]]
import fs from "node:fs";
import { cli, loadCapture, gateEngines, report, paintedAlpha, composite, region, mean3, pick, f, THEMES } from "./lib.mjs";
import { tally } from "./rows.mjs";

const a = cli({ expect: { type: "string" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const expect = a.expect ? JSON.parse(fs.readFileSync(a.expect, "utf8")) : null;
const t = tally(), lines = [];
for (const engine of [...new Set(cap.cells.map((c) => c.engine))]) for (const theme of THEMES) for (const scene of ["ladder", "dialog"]) {
  const gated = gate.includes(engine);
  const B = pick(cap, { engine, theme, ground: "black", scene, variant: "base" })[0], W = pick(cap, { engine, theme, ground: "white", scene, variant: "base" })[0];
  const C1 = pick(cap, { engine, theme, ground: "aurora", scene, variant: "base" })[0];
  if (!B || !W || B.crashed || W.crashed) { if (expect && gated) { t.add(true, false); lines.push(`T ${engine} ${theme} ${scene}: black or white cell missing ✗`); } continue; }
  const parts = [];
  for (const s of B.specs.filter((x) => x.sample)) {
    const { alpha, pole } = paintedAlpha(cap, B, W, s);
    let tc1 = null;
    const s1 = C1 && !C1.crashed && C1.specs.find((z) => z.id === s.id);
    if (pole && s1?.sample) {
      const comp = composite(cap, C1, s1), raw = mean3(region(cap.img(C1, "raw"), s1.sample));
      let num = 0, den = 0; for (let k = 0; k < 3; k++) { num += (comp[k] - pole[k]) * (raw[k] - pole[k]); den += (raw[k] - pole[k]) ** 2; }
      tc1 = den > 1 ? num / den : null;
    }
    let mark = "";
    const want = expect?.[theme]?.[s.id];
    if (want != null) { const ok = Math.abs(alpha - want) <= 0.01; t.add(gated, ok); mark = ` (expected α ${f(want, 3)}${ok ? "" : " ✗"})`; }
    parts.push(`${s.id} T ${f(1 - alpha, 3)} T_c1 ${f(tc1, 3)}${mark}`);
  }
  lines.push(`T ${engine}${B.shim ? "+shim" : ""} ${theme} ${scene}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
if (!expect) { t.gateRows = Math.max(1, t.gateRows); t.gateFails = 0; }
report(cap, { id: "T", title: `transmission per rung (T = 1 − painted α; T_c1 over the c1 aurora)${expect ? " against --expect" : "; reported, not gated (§5 Q-2, Q-3)"}`, lines, ...t, gate });
