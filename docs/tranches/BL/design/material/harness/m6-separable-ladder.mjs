#!/usr/bin/env node
// M-6 · A separable ladder. Adjacent levels differ by ΔE_OK ≥ 0.01 over paper and over the dark page, and every
// plate separates from the dark page by ΔE_OK ≥ 0.05. Adjacent: wash→quiet→resting→floating→overlay. Every
// plate: every spec of the dark paper cells (ladder and the real Dialog).
//   node m6-separable-ladder.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, composite, bare, dE, hex, f, tag, THEMES, LADDER } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: ["paper"], scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
for (const { cell, gated } of have) {
  const page = bare(cap, cell), comp = Object.fromEntries(cell.specs.filter((s) => s.sample).map((s) => [s.id, composite(cap, cell, s)]));
  const parts = [];
  if (cell.scene === "ladder") {
    const rungs = LADDER.filter((id) => comp[id]);
    for (let i = 1; i < rungs.length; i++) {
      const d = dE(comp[rungs[i - 1]], comp[rungs[i]]), ok = d >= 0.01; t.add(gated, ok);
      parts.push(`${rungs[i - 1]}→${rungs[i]} ${f(d, 3)}${ok ? "" : " ✗"}`);
    }
  }
  const sep = [];
  if (cell.theme === "dark") for (const [id, c] of Object.entries(comp)) {
    const d = dE(c, page), ok = d >= 0.05; t.add(gated, ok);
    sep.push(`${id} ${hex(c)} ${f(d, 3)}${ok ? "" : " ✗"}`);
  }
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: page ${hex(page)}${parts.length ? ` · adjacent ΔE ${parts.join(", ")}` : ""}${sep.length ? ` · ΔE from the page: ${sep.join(", ")}` : ""}`);
}
report(cap, { id: "M-6", title: "a separable ladder (adjacent ΔE_OK ≥ 0.01 on paper and the dark page; every dark plate ≥ 0.05 from the page)", lines, ...t, gate });
