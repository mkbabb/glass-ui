#!/usr/bin/env node
// M-4 · Ink keeps its register, on every plate (H-7; it was the dock only), SIGNED (H3-3). For every surface of the ladder
// and dialog scenes, over all seven grounds, both themes: the painted muted ink is LIGHTER than the painted fg ink by
// ΔL_OK ≥ 0.08 in light and DARKER by ΔL_OK ≥ 0.08 in dark. An inverted hierarchy (a solved muted darker than a
// retuned fg in light, C′ critique §6.2: #3f2a15 under #564a43, |ΔL| 0.114) passed the unsigned read; it fails here.
// The inks are the painted glyph cores of the surface's "fg" run and its "muted" run. On the dock, the fg run is the
// ACTIVE tab and the muted run the label (H-2, S-9: the inactive tab paints --muted-foreground by design, so reading
// it as "fg" measured nothing); the dock's inks must also not be #000 or #fff by construction (a contrast-color pole).
// This catches a dead ink solve (C-crit §3): an invalid solve falls back to --foreground, and muted = fg in paint.
//   node m4-dock-register.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, f, hex, lch, tag, GROUNDS, THEMES } from "./lib.mjs";
import { need, tally, inkRows } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: GROUNDS, scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
// A pole within 4/255: Playwright WebKit paints a #000 ink's glyph cores at #010102-#030303 (H2 self-test; HEAD's light
// dock muted), so an exact test misses the pole there. The darkest legitimate dock ink measured is #1c1917.
const pole = (c) => c && (c.every((v) => v <= 4) || c.every((v) => v >= 251));
for (const { cell, gated } of have) {
  const rows = inkRows(cap, cell), parts = [];
  let fails = 0;
  for (const s of cell.specs) {
    const fg = rows.find((r) => r.spec === s.id && r.ink === "fg"), mu = rows.find((r) => r.spec === s.id && r.ink === "muted");
    if (!fg && !mu) continue;
    if (!fg || !mu || !fg.rgb || !mu.rgb) { t.add(gated, false); fails++; parts.push(`${s.id} fg or muted run not painted ✗`); continue; }
    // Signed: muted − fg in light, fg − muted in dark; the hierarchy's direction is the theme's.
    const dL = (lch(mu.rgb)[0] - lch(fg.rgb)[0]) * (cell.theme === "dark" ? -1 : 1), dock = s.id === "dock";
    const ok = dL >= 0.08 && (!dock || (!pole(fg.rgb) && !pole(mu.rgb)));
    t.add(gated, ok); if (!ok) fails++;
    if (dock || !ok || a.verbose) parts.push(`${s.id} fg ${hex(fg.rgb)} muted ${hex(mu.rgb)} signed ΔL_OK ${dL >= 0 ? "+" : ""}${f(dL, 3)}${dL < 0 ? " (inverted)" : ""}${dock && pole(fg.rgb) ? " · fg is a pole" : ""}${dock && pole(mu.rgb) ? " · muted is a pole" : ""}${ok ? "" : " ✗"}`);
  }
  if (cell.scene === "ladder" && !cell.specs.some((s) => s.id === "dock")) parts.push(`dock: ${cell.nodock ? "UNMEASURED (Playwright WebKit unshimmed crashes on GlassDock)" : "not painted ✗"}`);
  const n = cell.specs.filter((s) => rows.some((r) => r.spec === s.id && (r.ink === "fg" || r.ink === "muted"))).length;
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ${n - fails}/${n} surfaces keep the signed ΔL_OK ≥ 0.08 · ${parts.join(" · ")}`);
}
report(cap, { id: "M-4", title: "ink keeps its register on every plate, signed (muted lighter than fg in light, darker in dark, by ΔL_OK ≥ 0.08; the dock's fg is its active tab, and neither dock ink is #000 or #fff)", lines, ...t, gate });
