#!/usr/bin/env node
// M-7 · Halos whole. A capsule (32 px shadow reach) seated 2 px inside the left edge of every content rung paints
// its full shadow. The halo scene seats a real .glass-capsule 2 px inside wash, quiet, resting and card, and one on
// the open page (the reference). Reach: the farthest column left of the capsule's own left edge where the
// capsule-on and capsule-off captures differ by ≥ 2/255 on any channel, over the capsule's middle rows. PASS when
// each host's reach ≥ the reference's reach − 2 px.
//   node m7-halos-whole.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, THEMES, tag } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: ["paper"], scenes: ["halo"] });
const t = tally(); t.add(true, false, missing);
function reach(on, off, capsule) {
  const [cx, cy, , ch] = capsule, x0 = Math.round(cx), y0 = Math.round(cy + ch / 2);
  let far = 0;
  for (let d = 1; d <= 64; d++) {
    const x = x0 - d; if (x < 0) break;
    for (let y = y0 - 4; y <= y0 + 4; y++) {
      const i = (on.width * y + x) * 4;
      if (Math.max(Math.abs(on.data[i] - off.data[i]), Math.abs(on.data[i + 1] - off.data[i + 1]), Math.abs(on.data[i + 2] - off.data[i + 2])) >= 2) { far = d; break; }
    }
  }
  return far;
}
for (const { cell, gated } of have) {
  const on = cap.img(cell, "on"), off = cap.img(cell, "off");
  const ref = cell.halo.find((h) => h.ref);
  const r0 = ref ? reach(on, off, ref.capsule) : 0;
  if (!r0) { t.add(gated, false); lines.push(`${tag(cell)}${gated ? "" : " [info]"}: the reference capsule paints no shadow ✗`); continue; }
  const parts = cell.halo.filter((h) => !h.ref).map((h) => { const r = reach(on, off, h.capsule), ok = r >= r0 - 2; t.add(gated, ok); return `${h.id} ${r} px${ok ? "" : " ✗"}`; });
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: reference reach ${r0} px · ${parts.join(" · ")}`);
}
report(cap, { id: "M-7", title: "halos whole (a capsule 2 px inside every content rung paints its full shadow)", lines, ...t, gate });
