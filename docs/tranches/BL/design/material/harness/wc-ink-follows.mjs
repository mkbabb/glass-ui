#!/usr/bin/env node
// W-C · The cascade ink's witness (C″; REGISTRY P2-6.3 row 17): ink holds over every ground, and a consumer's colour
// retune is followed or refused loud.
//   Leg 1: every muted run (plate captions, the -strong runs, the capsule, the wells' placeholders, the dock label, the
//          popover, the Dialog caption) in every base cell: p05 ∈ [4.5, ∞) at R 1 (the band's floor at the worst tone;
//          pass 1's [4.5, 5.5] ceiling is struck: a thinned plate's surplus contrast is not a defect).
//   Leg 2 (H3-8): three colour retunes over paper (lib.mjs RETUNES: --background, --foreground, --card each written as a
//          colour; variants retune-bg, retune-fg, retune-card). Per cell the retune is FOLLOWED when every fg and muted
//          run keeps p05 ≥ 4.5 at R 1 and every plate keeps the signed hierarchy (M-4: muted lighter than fg in light,
//          darker in dark, ΔL_OK ≥ 0.08), or REFUSED LOUD when the retuned cell logged more console errors or warnings
//          than the base paper cell. Otherwise it is a silent desync (C′ critique §4.3: a colour write to --background
//          left --background-l stale, claimed light paper wash muted 4.37; §6.2: --foreground as a colour inverted the
//          hierarchy at |ΔL| 0.114).
//   node wc-ink-follows.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, f, tag, lch, pick, GROUNDS, THEMES, RETUNES } from "./lib.mjs";
import { need, tally, inkRows, span } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const t = tally(), lines = [];
const n = need(cap, gate, { themes: THEMES, grounds: GROUNDS, scenes: ["ladder", "dialog"] });
t.add(true, false, n.missing); lines.push(...n.lines);
for (const { cell, gated } of n.have) {
  const rows = inkRows(cap, cell).filter((r) => r.cls === "muted");
  const bad = rows.filter((r) => !(r.p05 >= 4.5));
  for (const r of rows) t.add(gated, r.p05 >= 4.5);
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: muted ${span(rows)} · ${rows.length - bad.length}/${rows.length} ≥ 4.5${bad.length ? ` · under: ${bad.slice(0, 6).map((r) => `${r.spec}·${r.ink} ${f(r.p05)}`).join(", ")}${bad.length > 6 ? " …" : ""} ✗` : ""}`);
}
for (const variant of Object.keys(RETUNES)) {
  const m = need(cap, gate, { themes: THEMES, grounds: ["paper"], scenes: ["ladder", "dialog"], variant });
  t.add(true, false, m.missing); lines.push(...m.lines);
  for (const { cell, gated } of m.have) {
    const rows = inkRows(cap, cell), low = rows.filter((r) => !(r.p05 >= 4.5)), inverted = [];
    for (const s of cell.specs) {
      const fg = rows.find((r) => r.spec === s.id && r.ink === "fg"), mu = rows.find((r) => r.spec === s.id && r.ink === "muted");
      if (!fg?.rgb || !mu?.rgb) continue;
      const dL = (lch(mu.rgb)[0] - lch(fg.rgb)[0]) * (cell.theme === "dark" ? -1 : 1);
      if (dL < 0.08) inverted.push(`${s.id} ${dL >= 0 ? "+" : ""}${f(dL, 3)}`);
    }
    const base = pick(cap, { engine: cell.engine, theme: cell.theme, ground: "paper", scene: cell.scene, variant: "base" })[0];
    const loud = (x) => (x?.console ? x.console.error + x.console.warning : 0);
    const followed = !low.length && !inverted.length, refused = base && loud(cell) > loud(base), ok = followed || refused;
    t.add(gated, ok);
    lines.push(`${variant} ${tag(cell)}${gated ? "" : " [info]"}: ${followed ? "followed" : refused ? `refused loud (${loud(cell)} console errors/warnings against ${loud(base)}: ${cell.console.sample[0] || ""})` : "silent desync"} · ${rows.length - low.length}/${rows.length} runs ≥ 4.5${low.length ? ` (under: ${low.slice(0, 4).map((r) => `${r.spec}·${r.ink} ${f(r.p05)}`).join(", ")})` : ""} · hierarchy ${inverted.length ? `under 0.08 signed on ${inverted.slice(0, 4).join(", ")}` : "kept on every plate"}${ok ? "" : " ✗"}`);
  }
}
report(cap, { id: "W-C", title: "C″ · ink holds (muted p05 ≥ 4.5 everywhere) and a colour retune of --background, --foreground or --card is followed or refused loud", lines, ...t, gate });
