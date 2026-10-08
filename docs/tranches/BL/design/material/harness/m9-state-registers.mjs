#!/usr/bin/env node
// M-9 · State registers (H-6). A painted state fill must read as a state, and the focus veil must dim.
//   Fills: in the state scene (a resting plate carrying a checked Checkbox and a SegmentedTabs whose selected
//   indicator is [data-fill="selected"]; a dock with its active tab [data-fill="active"] and a hovered inactive tab
//   [data-fill="hover"], the capture's pointer resting on it), over paper and the c1 aurora, both themes: the mean
//   noink colour inside each fill (inset 25% per side, text and icons removed) differs from the surface right around
//   it (the ring 3-6 px outside the fill, inside its surface, outside every other fill) by ΔE_OK ≥ 0.02. A fill that
//   is not painted or not found is a FAIL row. This catches a plate-as-fill reader under a --card pole, which turns
//   a pill into a same-hue no-op (PF-9).
//   Veil (signed, both themes; H3-4 adds dark): an engaged .glass-focus-veil centred on an empty page region
//   ([data-veil-probe]): OKLab L inside the probe with the veil (full) is at least 0.02 below the same pixels without it
//   (raw); a veil that brightens is a FAIL. Pass 2 read the dark veil over paper at ΔL +0.006 (Chromium): it did not dim
//   and nothing reddened.
//   node m9-state-registers.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, region, mean3, dE, lch, hex, f, tag, THEMES, SCENE_GROUNDS } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const REQUIRED = ["active", "hover", "checked", "selected"];
const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: SCENE_GROUNDS.state, scenes: ["state"] });
const t = tally(); t.add(true, false, missing);
const inset = ([x, y, w, h], k) => [x + w * k, y + h * k, w * (1 - 2 * k), h * (1 - 2 * k)];
const inside = ([x, y, w, h], X, Y) => X >= x && X < x + w && Y >= y && Y < y + h;
for (const { cell, gated } of have) {
  const noink = cap.img(cell, "noink"), parts = [];
  const fills = cell.specs.flatMap((s) => s.fills.map((fl) => ({ ...fl, spec: s })));
  for (const id of REQUIRED) {
    const fl = fills.find((x) => x.id === id);
    if (!fl) { t.add(gated, false); parts.push(`${id} not found ✗`); continue; }
    const fill = mean3(region(noink, inset(fl.rect, 0.25)));
    const [x, y, w, h] = fl.rect, ring = [];
    for (let Y = Math.round(y - 6); Y <= Math.round(y + h + 6); Y++) for (let X = Math.round(x - 6); X <= Math.round(x + w + 6); X++) {
      const dx = Math.max(x - X, X - (x + w), 0), dy = Math.max(y - Y, Y - (y + h), 0), d = Math.max(dx, dy);
      if (d < 3 || d > 6 || !inside(fl.spec.rect, X, Y) || fills.some((o) => o !== fl && inside(o.rect, X, Y))) continue;
      ring.push(region(noink, [X, Y, 1, 1])[0]);
    }
    if (!ring.length) { t.add(gated, false); parts.push(`${id} has no surface around it ✗`); continue; }
    const around = mean3(ring), d = dE(fill, around), ok = d >= 0.02;
    t.add(gated, ok);
    parts.push(`${id} ${hex(fill)} on ${hex(around)} ΔE ${f(d, 3)}${ok ? "" : " ✗"}`);
  }
  for (const probe of cell.veil || []) {
    const on = mean3(region(cap.img(cell, "full"), probe)), off = mean3(region(cap.img(cell, "raw"), probe));
    const dL = lch(on)[0] - lch(off)[0];
    const ok = dL <= -0.02; t.add(gated, ok); parts.push(`focus veil ${hex(off)} → ${hex(on)} ΔL ${dL >= 0 ? "+" : ""}${f(dL, 3)} (dims ≥ 0.02)${ok ? "" : dL > 0 ? " brightens ✗" : " ✗"}`);
  }
  if (!(cell.veil || []).length) { t.add(gated, false); parts.push("focus veil probe not found ✗"); }
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
report(cap, { id: "M-9", title: "state registers (active, hover, checked and selected fills differ from their surface by ΔE_OK ≥ 0.02; the focus veil dims, both themes)", lines, ...t, gate });
