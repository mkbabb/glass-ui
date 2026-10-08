#!/usr/bin/env node
// M-2 · Rendered text contrast. On the glyph ring at R 1 AND at R 3 (H-8), p05 ≥ 4.5 for muted and for fg, every
// level, every ground, both themes. Rows: every [data-ink] of every spec (plate text, the field wells' value and
// placeholder, the dock's active tab (fg), inactive tab and label (muted), the popover, the real Dialog's title,
// description and caption), in these cells:
//   ladder, dialog   all seven grounds (lib.mjs GROUNDS)
//   held      (H-5)  a held dock (a real press-and-hold on a Slider inside it), a held wash and a held floating
//                    rung (the consumer grasp contract), and a collapsed dock, over black, white and the c1 aurora.
//                    A held surface whose register is not engaged at capture is a FAIL row (never a rest read).
//                    H3-5: a held rung is read only where the library declares its host graspable (rows.mjs heldUnread);
//                    a rung the library does not declare graspable prints as not read (its carriers blur nothing).
//   hostile   (H-10) an opaque band interposed between the field and the dock and the first plate row, and a
//                    teleported Popover over a declared region, over the aurora at ceilings 1 and 0.5.
//   claim     (H3-6) a "page" claim over library paint: the content rungs over an opaque --secondary tray, and a
//                    wash and a quiet nested in an opaque card, over paper.
// Every content plate carries a "muted-strong" run and the ladder a .glass-capsule (H3-2): both are muted runs here.
// The motion read (H-11) is M-2m (m2-motion.mjs).
//   node m2-text-contrast.mjs <capdir> [--gate chromium[,webkit]] [--verbose]
import { cli, loadCapture, gateEngines, report, f, hex, tag, GROUNDS, THEMES, SCENE_GROUNDS } from "./lib.mjs";
import { need, tally, inkRows, span, heldUnread } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const sets = [
  { themes: THEMES, grounds: GROUNDS, scenes: ["ladder", "dialog"] },
  { themes: THEMES, grounds: SCENE_GROUNDS.held, scenes: ["held"] },
  { themes: THEMES, grounds: SCENE_GROUNDS.hostile, scenes: ["hostile"] },
  { themes: THEMES, grounds: SCENE_GROUNDS.claim, scenes: ["claim"] },
];
const t = tally(), lines = [], all = [];
for (const want of sets) {
  const n = need(cap, gate, want); t.add(true, false, n.missing); lines.push(...n.lines);
  for (const { cell, gated } of n.have) {
    const unread = new Set();
    if (cell.scene === "held") for (const s of cell.specs.filter((x) => x.id.includes("held"))) {
      const why = heldUnread(s);
      if (why) { unread.add(s.id); lines.push(`${tag(cell)}: ${s.id} ${why}: not read`); continue; }
      const on = cell.heldAfter ? cell.heldAfter[s.id] : s.held;
      if (!on || !s.held) { t.add(gated, false); lines.push(`${tag(cell)}: ${s.id} held register not engaged at capture (held ${s.held}, after ${on}) ✗`); }
    }
    const rows = inkRows(cap, cell).filter((r) => !unread.has(r.spec));
    let fails = 0;
    for (const r of rows) {
      const ok = r.p05 != null && r.p05 >= 4.5 && r.p05r3 != null && r.p05r3 >= 4.5;
      t.add(gated, ok); if (!ok) fails++; all.push({ cell: tag(cell), gated, ...r, ok });
    }
    const dockish = (r) => r.spec.startsWith("dock");
    const plate = rows.filter((r) => !r.well && !dockish(r)), well = rows.filter((r) => r.well), dock = rows.filter(dockish);
    const cls = (rs, c) => `${span(rs.filter((r) => r.cls === c))} | R3 ${span(rs.filter((r) => r.cls === c), "p05r3")}`;
    lines.push(`${tag(cell)}${gated ? "" : " [info]"}: fg ${cls(plate, "fg")} · muted ${cls(plate, "muted")}` +
      (well.length ? ` · well fg ${cls(well, "fg")} muted ${cls(well, "muted")}` : "") +
      (dock.length ? ` · dock fg ${cls(dock, "fg")} muted ${cls(dock, "muted")}` : cell.nodock ? " · dock UNMEASURED (Playwright WebKit unshimmed crashes on GlassDock)" : "") +
      ` · ${fails ? `${fails}/${rows.length} under 4.5 at R 1 or R 3` : `all ${rows.length} ≥ 4.5 at R 1 and R 3`}`);
    if (a.verbose) for (const r of rows) lines.push(`    ${r.spec}·${r.ink} R1 p05 ${f(r.p05)} R3 p05 ${f(r.p05r3)} med ${f(r.med)} ring px ${r.n}/${r.nr3} ink ${r.rgb ? hex(r.rgb) : "—"}${r.ok === false ? " ✗" : ""}`);
  }
}
const r1only = all.filter((r) => r.p05 >= 4.5 && !(r.p05r3 >= 4.5)).length;
report(cap, { id: "M-2", title: "rendered text contrast (glyph ring at R 1 and R 3, p05 ≥ 4.5 for fg and muted; ladder, dialog, held, collapsed and hostile cells)", lines, ...t, gate,
  extra: [`rows: ${all.length} (${all.filter((r) => !r.ok).length} under 4.5; ${r1only} of them pass at R 1 and fail only at R 3)`] });
