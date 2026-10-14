#!/usr/bin/env node
// M-6 · A separable ladder. Adjacent levels differ by ΔE_OK ≥ 0.01 over paper and over the dark page, and every
// plate separates from the dark page by ΔE_OK ≥ 0.05 AND sits at or above it: OKLab L(plate) ≥ L(page) (H-9, signed;
// a plate that sinks below the page reads as a hole, D-crit §5.3). Adjacent: wash→quiet→resting→floating→overlay.
// Every plate: every spec of the dark paper cells (ladder and the real Dialog).
// H4-3 (I-3): every VARIANT captured over paper is read, not only `base`: the colour retunes (retune-bg, retune-fg,
// retune-card, H3-8) and any other variant a run carries, each against its own page. A retune that collapses the
// dark lift or the adjacency is a red row here, where H3 read it only through ../pass-3/D3-Cpp-variant-view.mjs.
// The base cells are required (a missing one is a FAIL row); every other variant is read where it was captured.
//   node m6-separable-ladder.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, composite, bare, dE, lch, hex, f, tag, THEMES, LADDER } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const SCENES = ["ladder", "dialog"];
const variants = ["base", ...new Set(cap.cells.filter((c) => c.ground === "paper" && SCENES.includes(c.scene) && (c.variant || "base") !== "base").map((c) => c.variant))];
const t = tally(), lines = [], read = {};
for (const variant of variants) {
  const n = need(cap, gate, { themes: THEMES, grounds: ["paper"], scenes: SCENES, variant });
  if (variant === "base") { t.add(true, false, n.missing); lines.push(...n.lines); }
  read[variant] = n.have.length;
  for (const { cell, gated } of n.have) {
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
      const dL = lch(c)[0] - lch(page)[0], up = dL >= 0; t.add(gated, up);
      sep.push(`${id} ${hex(c)} ${f(d, 3)}${ok ? "" : " ✗"} ΔL ${dL >= 0 ? "+" : ""}${f(dL, 3)}${up ? "" : " (below the page) ✗"}`);
    }
    lines.push(`${tag(cell)}${gated ? "" : " [info]"}: page ${hex(page)}${parts.length ? ` · adjacent ΔE ${parts.join(", ")}` : ""}${sep.length ? ` · ΔE from the page: ${sep.join(", ")}` : ""}`);
  }
}
lines.push(`variants read: ${variants.map((v) => `${v} (${read[v]} cells)`).join(", ")}`);
report(cap, { id: "M-6", title: "a separable ladder in every variant (adjacent ΔE_OK ≥ 0.01 on paper and the dark page; every dark plate ≥ 0.05 from the page and L ≥ the page's)", lines, ...t, gate });
