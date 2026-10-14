#!/usr/bin/env node
// W-G · D3-G's witness (H-15): hue through, lightness pinned. Born RED on HEAD.
//   Leg 1: over the c1 aurora and over UIA-V-198's red (#761617), both themes, every content rung (wash, quiet,
//          resting, card) and the dock keep their composite hue within 10° of the raw ground's hue under the same
//          sample region (OKLCh, mean colours), with composite chroma ≥ 0.5 × the sRGB gamut's largest chroma at the
//          composite's own L and hue, while M-2 holds on the same surface in the same cell (every ink, R 1 and R 3).
//   Leg 2: the same surfaces inside an isolated group (the `isolated` scene: the page wraps them in
//          isolation: isolate) either keep leg 1, or carry the flat-pole stamp (lib.mjs FLAT_ATTR, on the plate or
//          an ancestor) that tells a reader the pole went flat. A silent flat plate is a FAIL. The stamp does not
//          excuse a plate outside an isolated group.
//   node wg-hue-through.mjs <capdir> [--gate chromium[,webkit]] [--verbose]
import { cli, loadCapture, gateEngines, report, composite, rawUnder, lch, gamutMaxC, hueDiff, hex, f, tag, HUE_THROUGH, THEMES, SCENE_GROUNDS, FLAT_ATTR } from "./lib.mjs";
import { need, tally, inkRows } from "./rows.mjs";

const IDS = ["wash", "quiet", "resting", "card", "dock"];
const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const t = tally(), lines = [];
for (const scene of ["ladder", "isolated"]) {
  const n = need(cap, gate, { themes: THEMES, grounds: SCENE_GROUNDS.isolated, scenes: [scene] });
  t.add(true, false, n.missing); lines.push(...n.lines);
  for (const { cell, gated } of n.have) {
    const rows = inkRows(cap, cell), parts = [];
    for (const id of IDS) {
      const s = cell.specs.find((x) => x.id === id);
      if (!s) { if (id !== "dock" || !cell.nodock) { t.add(gated, false); parts.push(`${id} not painted ✗`); } continue; }
      const comp = composite(cap, cell, s), raw = rawUnder(cap, cell, s);
      const [L, C, h] = lch(comp), [, Cr, hr] = lch(raw), Cmax = gamutMaxC(L, h);
      const dh = hueDiff(h, hr), hueOk = dh <= HUE_THROUGH, chromaOk = C >= 0.5 * Cmax;
      const inks = rows.filter((r) => r.spec === id), m2 = inks.length > 0 && inks.every((r) => r.p05 >= 4.5 && r.p05r3 >= 4.5);
      const worst = inks.reduce((x, y) => (Math.min(y.p05 ?? 0, y.p05r3 ?? 0) < Math.min(x.p05 ?? 0, x.p05r3 ?? 0) ? y : x), inks[0] || {});
      const through = hueOk && chromaOk && m2;
      const ok = through || (scene === "isolated" && s.flat);
      t.add(gated, ok);
      parts.push(`${id} ${hex(comp)} over ${hex(raw)} Δh ${f(dh, 1)}° C ${f(C, 3)}/${f(Cmax, 3)} (${f(C / Math.max(Cmax, 1e-6), 2)} of gamut) M-2 worst ${worst.ink || "—"} ${f(Math.min(worst.p05 ?? 0, worst.p05r3 ?? 0))}${s.flat ? ` [${FLAT_ATTR}]` : ""}${ok ? "" : ` ✗${!hueOk ? " hue" : ""}${!chromaOk ? " chroma" : ""}${!m2 ? " M-2" : ""}${scene === "isolated" && !s.flat ? " (silent flat)" : ""}`}`);
    }
    lines.push(`${tag(cell)}${gated ? "" : " [info]"}:`); for (const p of parts) lines.push("    " + p);
  }
}
report(cap, { id: "W-G", title: "D3-G · hue through, lightness pinned (Δh ≤ 10°, C ≥ 0.5 × gamut max, M-2 on the same cells; an isolated plate keeps it or is stamped flat)", lines, ...t, gate });
