#!/usr/bin/env node
// M-2 · Rendered text contrast. On a 1 px glyph ring, p05 ≥ 4.5 for muted and for fg, every level, every ground,
// both themes. Rows: every [data-ink] of every spec (plate text, the field wells' value and placeholder, the dock
// tab and label, the popover, the real Dialog's title, description and caption).
//   node m2-text-contrast.mjs <capdir> [--gate chromium[,webkit]] [--verbose]
import { cli, loadCapture, gateEngines, report, f, hex, tag, GROUNDS, THEMES } from "./lib.mjs";
import { need, tally, inkRows, span } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: GROUNDS, scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
const all = [];
for (const { cell, gated } of have) {
  const rows = inkRows(cap, cell);
  let fails = 0;
  for (const r of rows) { const ok = r.p05 != null && r.p05 >= 4.5; t.add(gated, ok); if (!ok) fails++; all.push({ cell: tag(cell), gated, ...r, ok }); }
  const plate = rows.filter((r) => !r.well && r.spec !== "dock"), well = rows.filter((r) => r.well), dock = rows.filter((r) => r.spec === "dock");
  const cls = (rs, c) => span(rs.filter((r) => r.cls === c));
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: fg ${cls(plate, "fg")} · muted ${cls(plate, "muted")}` +
    (well.length ? ` · well fg ${cls(well, "fg")} muted ${cls(well, "muted")}` : "") +
    (dock.length ? ` · dock fg ${cls(dock, "fg")} muted ${cls(dock, "muted")}` : cell.scene === "ladder" && cell.nodock ? " · dock UNMEASURED (Playwright WebKit crashes on GlassDock)" : "") +
    ` · ${fails ? `${fails}/${rows.length} under 4.5` : `all ${rows.length} ≥ 4.5`}`);
  if (a.verbose) for (const r of rows) lines.push(`    ${r.spec}·${r.ink} p05 ${f(r.p05)} med ${f(r.med)} ring px ${r.n} ink ${r.rgb ? hex(r.rgb) : "—"}`);
}
report(cap, { id: "M-2", title: "rendered text contrast (1 px glyph ring, p05 ≥ 4.5 for fg and muted, every level and ground)", lines, ...t, gate,
  extra: [`rows: ${all.length} (${all.filter((r) => !r.ok).length} under 4.5)`] });
