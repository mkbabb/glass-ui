#!/usr/bin/env node
// M-1x · No grey off paper (H3-1; O-62's frame read where M-1 cannot see: the light veil over black, the 16 px checker
// and the glass-material story's deep canvas #193b59). Light theme, ladder and dialog. A plate composite reads "not grey"
// when it holds M-1's paper predicate against the page's own paper (L ≥ L_paper − 0.01 and ΔE_OK ≤ 0.02: a cream card
// everywhere) OR carries colour (OKLCh C ≥ 0.02, the floor W-0.1 G3 uses for an accent tint). A composite that is
// neither is grey: the bound's 0.11 transmission over a dark ground pulls L to 0.90 at C ≈ 0.01 (pass 2: #e2dcd7 over
// black, #e3e3e3 C 0.000 over the deep canvas).
// The paper reference is the light paper ladder cell's raw bare region (the page the owner's O-62 frame names).
// REPORTED until the owner rules Q-11 (REGISTRY P2-5): without --q11 every row prints and the check exits 0.
//   --q11 a   O-62 is a paper ruling; off-paper grey is accepted: rows print, exit 0 (REPORTED, ruled)
//   --q11 b   the light chrome and content go opaque off paper: every row gated
//   --q11 c   only plates under a claim that knows the ground are gated (cell specs carrying a claim; none at HEAD)
//   --q11 d   a new pole, unresearched: the check refuses (exit 2) until the harness is revised for it
//   node m1x-off-paper.mjs <capdir> [--gate chromium[,webkit]] [--q11 a|b|c]
import { cli, loadCapture, gateEngines, report, composite, bare, lch, dE, hex, f, tag, pick, OFF_PAPER } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli({ q11: { type: "string" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const ruling = a.q11 || null;
if (ruling === "d" || (ruling && !["a", "b", "c"].includes(ruling))) { console.log(`M-1x · Q-11 ruling "${ruling}" is not built into this check: revise the harness first`); process.exit(2); }
const gatedBy = (spec) => ruling === "b" || (ruling === "c" && !!spec.claim);
const { have, lines, missing } = need(cap, gate, { themes: ["light"], grounds: OFF_PAPER, scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
let would = 0, rowsN = 0;
for (const { cell, gated } of have) {
  const ref = pick(cap, { engine: cell.engine, theme: "light", ground: "paper", scene: "ladder", variant: "base" })[0];
  if (!ref || ref.crashed) { t.add(gated, false); lines.push(`${tag(cell)}: no light paper ladder cell for the paper reference ✗`); continue; }
  const paper = bare(cap, ref), Lp = lch(paper)[0], ground = bare(cap, cell);
  const parts = cell.specs.filter((s) => s.sample).map((s) => {
    const c = composite(cap, cell, s), [L, C] = lch(c), d = dE(c, paper);
    const cream = L >= Lp - 0.01 && d <= 0.02, colour = C >= 0.02, ok = cream || colour;
    rowsN++; if (!ok) would++;
    if (gatedBy(s)) t.add(gated, ok);
    return `${s.id} ${hex(c)} L ${f(L, 3)} C ${f(C, 4)} ΔE paper ${f(d, 3)}${ok ? (cream ? "" : " (colour)") : " grey ✗"}`;
  });
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ground ${hex(ground)} · paper ${hex(paper)} L ${f(Lp, 3)}`);
  for (const p of parts) lines.push("    " + p);
}
const reported = !ruling || ruling === "a" || (ruling === "c" && t.gateRows === 0);
if (reported) { lines.push(`REPORTED (Q-11 ${ruling ? "ruled (" + ruling + ")" : "unruled"}): ${would} of ${rowsN} off-paper light composites read grey`); t.gateRows = Math.max(1, missing); t.gateFails = missing; }
report(cap, { id: "M-1x", title: `no grey off paper (light, over black, checker and the deep canvas: cream (M-1's predicate against paper) or C ≥ 0.02)${reported ? "; REPORTED until Q-11" : `; gated under Q-11 (${ruling})`}`, lines, ...t, gate });
