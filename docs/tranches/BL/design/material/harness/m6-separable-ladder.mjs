#!/usr/bin/env node
// M-6 · A separable ladder. Adjacent levels differ by ΔE_OK ≥ 0.01 over paper and over the dark page, and every
// plate separates from the dark page by ΔE_OK ≥ 0.05 AND sits at or above it: OKLab L(plate) ≥ L(page) (H-9, signed;
// a plate that sinks below the page reads as a hole, D-crit §5.3). Adjacent: wash→quiet→resting→floating→overlay.
// Every plate: every spec of the dark paper cells (ladder and the real Dialog).
// H4-3 (I-3): every VARIANT captured over paper is read, not only `base`: the colour retunes (retune-bg, retune-fg,
// retune-card, H3-8) and any other variant a run carries, each against its own page. A retune that collapses the
// dark lift or the adjacency is a red row here, where H3 read it only through ../pass-3/D3-Cpp-variant-view.mjs.
// The base cells are required (a missing one is a FAIL row); every other variant is read where it was captured.
// FV3 (D3 pass 4, floor v3): --q1 reads the row as Q-1's options word it (REGISTRY P2-6.3 row 9). With no flag the
// instrument's own text is gated (every adjacency and the signed leg), as H2-H4 read it.
//   --q1 a   light and dark adjacency struck (printed, not gated); the signed leg gated.
//   --q1 c   three materials: content (wash, quiet, resting, card), chrome (floating, overlay, popover, dock) and the
//            room (dialog-rung, dialog); the escape is no material. Inside a material the rungs are one paint, so their
//            adjacency is struck and each material's spread (largest pairwise ΔE) is printed. The signed leg is gated.
//            Between materials, the room separates from each glass material by ΔE ≥ 0.01 on the dark page (gated). In
//            light, paint cannot separate a cream plate from cream paper while M-1 holds (Q-1's own premise), so the
//            light room rows print. Content against chrome prints: both sit at the bound, so their paint is one
//            colour by construction, and what separates them is the band's optics (blur radius, the one floating cast),
//            which M-6 does not read over paper.
//   node m6-separable-ladder.mjs <capdir> [--gate chromium[,webkit]] [--q1 a|c]
import { cli, loadCapture, gateEngines, report, composite, bare, dE, lch, hex, f, tag, THEMES, LADDER } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli({ q1: { type: "string" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const q1 = a.q1 || null;
if (q1 && !["a", "c"].includes(q1)) { console.log(`M-6 · Q-1 option "${q1}" is not built into this check: revise the harness first`); process.exit(2); }
const MATERIAL = { wash: "content", quiet: "content", resting: "content", card: "content", floating: "chrome", overlay: "chrome", popover: "chrome", dock: "chrome", "dialog-rung": "room", dialog: "room" };
const avg = (cs) => cs[0].map((_, i) => cs.reduce((s, c) => s + c[i], 0) / cs.length);
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
        const d = dE(comp[rungs[i - 1]], comp[rungs[i]]), ok = d >= 0.01;
        if (!q1) t.add(gated, ok);
        parts.push(`${rungs[i - 1]}→${rungs[i]} ${f(d, 3)}${ok ? "" : q1 ? " (struck)" : " ✗"}`);
      }
    }
    if (q1 === "c") {
      const by = {};
      for (const [id, c] of Object.entries(comp)) if (MATERIAL[id]) (by[MATERIAL[id]] ||= []).push([id, c]);
      for (const [m, xs] of Object.entries(by)) {
        let spread = 0; for (const [, x] of xs) for (const [, y] of xs) spread = Math.max(spread, dE(x, y));
        parts.push(`${m} {${xs.map(([id]) => id).join(", ")}} spread ${f(spread, 3)}`);
      }
      const mean = Object.fromEntries(Object.entries(by).map(([m, xs]) => [m, avg(xs.map(([, c]) => c))]));
      if (mean.content && mean.chrome) parts.push(`content↔chrome ${f(dE(mean.content, mean.chrome), 3)} (optics, printed)`);
      if (mean.room) for (const m of ["content", "chrome"]) if (mean[m]) {
        const d = dE(mean[m], mean.room), ok = d >= 0.01, g = cell.theme === "dark";
        if (g) t.add(gated, ok);
        parts.push(`${m}↔room ${f(d, 3)}${g ? (ok ? "" : " ✗") : " (light, printed)"}`);
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
const title = q1 === "a" ? "a separable ladder under Q-1 (a): adjacency struck; every dark plate ≥ 0.05 from the page and L ≥ the page's, every variant"
  : q1 === "c" ? "three materials under Q-1 (c): the room ≥ 0.01 from each glass material on the dark page; every dark plate ≥ 0.05 from the page and L ≥ the page's, every variant"
  : "a separable ladder in every variant (adjacent ΔE_OK ≥ 0.01 on paper and the dark page; every dark plate ≥ 0.05 from the page and L ≥ the page's)";
report(cap, { id: "M-6", title, lines, ...t, gate });
