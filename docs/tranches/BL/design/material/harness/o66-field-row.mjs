#!/usr/bin/env node
// O-66 · O-66 §1 in D3's battery (H3-9): W-0.1's G2 and G3 (waves/W-0.1.md §3), read from the specimen app's o66field
// and o66menu scenes with W-0.1 measure.mjs's own strips, so the 10.2.0 veil recut is judged by the loop that specifies it.
//   G2 (field, both themes): a filled SelectTrigger beside a filled Input, on paper and inside a .glass-floating pane.
//      The mean `full` colour of an empty strip right of each value (x + 0.55·w, y + 0.3·h, 0.2·w × 0.4·h) on the
//      trigger and on the Input: ΔE_OK(trigger, Input) ≤ 0.01. Four rows per engine. HEAD (W-0.1 §2, Chromium): 0.028,
//      0.191, 0.175, 0.167.
//   G3 (row, light gated, dark recorded): an open DropdownMenu whose first row holds focus (data-highlighted). The
//      strip x + 0.7·w, y + 0.25·h, 0.2·w × 0.5·h of the highlighted row against the same strip of the third row (the
//      menu plate): the row's fill has OKLCh C ≥ 0.02 (an accent tint) or L ≥ the plate's L − 0.005 (no darkening).
//      A row that is not highlighted at capture is a FAIL row (the instrument did not engage it). HEAD (W-0.1 §2,
//      Chromium light): C 0.0107, ΔL −0.0553.
//   node o66-field-row.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, region, mean3, lch, dE, hex, f, tag, THEMES } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const t = tally(), lines = [];
const strip = ([x, y, w, h], fx, fy, fw, fh) => [x + w * fx, y + h * fy, w * fw, h * fh];
const fn = need(cap, gate, { themes: THEMES, grounds: ["paper"], scenes: ["o66field"] });
t.add(true, false, fn.missing); lines.push(...fn.lines);
for (const { cell, gated } of fn.have) {
  const img = cap.img(cell, "full"), parts = [];
  for (const where of ["paper", "pane"]) {
    const tp = cell.probes?.[`trigger-${where}`], ip = cell.probes?.[`input-${where}`];
    if (!tp || !ip) { t.add(gated, false); parts.push(`${where}: trigger or Input probe missing ✗`); continue; }
    const ct = mean3(region(img, strip(tp.rect, 0.55, 0.3, 0.2, 0.4))), ci = mean3(region(img, strip(ip.rect, 0.55, 0.3, 0.2, 0.4)));
    const d = dE(ct, ci), ok = d <= 0.01; t.add(gated, ok);
    parts.push(`${where}: trigger ${hex(ct)} L ${f(lch(ct)[0], 3)} · Input ${hex(ci)} L ${f(lch(ci)[0], 3)} · ΔE ${f(d, 3)}${ok ? "" : " ✗"}`);
  }
  lines.push(`G2 ${tag(cell)}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
const mn = need(cap, gate, { themes: THEMES, grounds: ["paper"], scenes: ["o66menu"] });
t.add(true, false, mn.missing); lines.push(...mn.lines);
for (const { cell, gated } of mn.have) {
  const img = cap.img(cell, "full"), r0 = cell.probes?.["row-0"], r2 = cell.probes?.["row-2"];
  const g = gated && cell.theme === "light", lab = `G3 ${tag(cell)}${gated ? (g ? "" : " [dark: recorded]") : " [info]"}`;
  if (!r0 || !r2) { t.add(g, false); lines.push(`${lab}: row probes missing ✗`); continue; }
  if (!r0.highlighted) { t.add(g, false); lines.push(`${lab}: the first row is not highlighted at capture (pointer ${cell.pointer}) ✗`); continue; }
  const hi = mean3(region(img, strip(r0.rect, 0.7, 0.25, 0.2, 0.5))), rest = mean3(region(img, strip(r2.rect, 0.7, 0.25, 0.2, 0.5)));
  const [Lh, Ch] = lch(hi), [Lr] = lch(rest), ok = Ch >= 0.02 || Lh >= Lr - 0.005;
  if (cell.theme === "light") t.add(g, ok);
  lines.push(`${lab}: row ${hex(hi)} L ${f(Lh, 3)} C ${f(Ch, 4)} · plate ${hex(rest)} L ${f(Lr, 3)} · ΔL ${Lh - Lr >= 0 ? "+" : ""}${f(Lh - Lr, 4)} · ΔE ${f(dE(hi, rest), 3)}${cell.theme === "light" ? (ok ? "" : " (grey: darkens the plate, no tint) ✗") : ""}`);
}
report(cap, { id: "O-66", title: "O-66 §1 (W-0.1 G2: trigger and Input composites within ΔE_OK 0.01, light and dark, paper and pane; G3: the light highlighted row tints (C ≥ 0.02) or does not darken (ΔL ≥ −0.005))", lines, ...t, gate });
