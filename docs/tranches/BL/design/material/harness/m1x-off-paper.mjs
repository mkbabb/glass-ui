#!/usr/bin/env node
// M-1x · No grey off paper (H3-1; O-62's frame read where M-1 cannot see: the light veil over black, the 16 px checker
// and the glass-material story's deep canvas #193b59). Light theme, ladder and dialog.
// Q-11's text (REGISTRY P2-5): "Must the light veil not read grey over dark grounds too?" H4-2 (I-2) reads it so:
//   cream    the plate holds its own paper reading off paper: M-1's predicate (L ≥ L_ref − 0.01 and ΔE_OK ≤ 0.02) with
//            the reference the SAME plate's composite in the light paper cell. Whether that paper reading is itself
//            grey is M-1's row (P-3), so an opaque card a hair under M-1's L floor no longer reds here as well (H3 read
//            the opaque escape #fdf5ec 0.001 under, in every cell).
//   colour   OKLCh C ≥ 0.02 (W-0.1 G3's accent floor) AND the colour is the plate's: the raw ground under the same
//            sample is achromatic (C < 0.02), or the composite's hue sits more than HUE_THROUGH (10°, W-G's number) from
//            the ground's. A plate that only transmits a coloured ground (HEAD's wash #0d3c66 over the deep canvas
//            #193b59) carries the ground's hue, not its own, and no longer passes (H3 had no hue term).
// A composite that is neither is grey (C < 0.02) or the ground showing through (C ≥ 0.02 at the ground's hue).
// The gate follows the ruling's text; with no ruling the default (a) applies (REGISTRY P3-4.1):
//   (none), --q11 a   "O-62 is a paper ruling: off paper, the bound's grey over dark grounds is accepted for chrome."
//                     Every row prints; a grey chrome row prints "accepted for chrome (Q-11 a)"; exit 0 (REPORTED)
//   --q11 b           "the light chrome goes opaque, a card everywhere": the chrome rows and the opaque escape are
//                     gated; content rows print, and the tally names the content rungs still grey off paper
//   --q11 c           chrome thins only where a claim knows the ground: the plates under a claim are gated
//   --q11 d           a new pole, unresearched: the check refuses (exit 2) until the harness is revised for it
//   node m1x-off-paper.mjs <capdir> [--gate chromium[,webkit]] [--q11 a|b|c]
import { cli, loadCapture, gateEngines, report, composite, rawUnder, lch, dE, hueDiff, hex, f, tag, pick, OFF_PAPER, HUE_THROUGH } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli({ q11: { type: "string" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const ruling = a.q11 || null, text = ruling || "a";
if (ruling === "d" || (ruling && !["a", "b", "c"].includes(ruling))) { console.log(`M-1x · Q-11 ruling "${ruling}" is not built into this check: revise the harness first`); process.exit(2); }
const gatedBy = (spec) => (text === "b" && spec.band !== "content") || (text === "c" && !!spec.claim);
const { have, lines, missing } = need(cap, gate, { themes: ["light"], grounds: OFF_PAPER, scenes: ["ladder", "dialog"] });
const t = tally(); t.add(true, false, missing);
let would = 0, rowsN = 0, acceptedN = 0;
const greyContent = new Set();
for (const { cell, gated } of have) {
  const ref = pick(cap, { engine: cell.engine, theme: "light", ground: "paper", scene: cell.scene, variant: cell.variant || "base" })[0];
  if (!ref || ref.crashed) { t.add(gated, false); lines.push(`${tag(cell)}: no light paper ${cell.scene} cell for the plates' paper reading ✗`); continue; }
  const parts = cell.specs.filter((s) => s.sample).map((s) => {
    const rs = ref.specs.find((x) => x.id === s.id);
    if (!rs?.sample) { if (gatedBy(s)) t.add(gated, false); return `${s.id}: no paper reading for this plate ✗`; }
    const c = composite(cap, cell, s), own = composite(cap, ref, rs), g = rawUnder(cap, cell, s);
    const [L, C, h] = lch(c), [Lo] = lch(own), [, Cg, hg] = lch(g), d = dE(c, own), dh = hueDiff(h, hg);
    const cream = L >= Lo - 0.01 && d <= 0.02, own_colour = C >= 0.02 && (Cg < 0.02 || dh > HUE_THROUGH), ok = cream || own_colour;
    rowsN++; if (!ok) { would++; if (s.band === "content") greyContent.add(s.id); }
    const accepted = !ok && text === "a" && s.band === "chrome"; if (accepted) acceptedN++;
    if (gatedBy(s)) t.add(gated, ok);
    const why = ok ? (cream ? "" : ` (colour, Δh ${f(dh, 0)}° from the ground)`) : C >= 0.02 ? ` the ground's hue (Δh ${f(dh, 0)}° ≤ ${HUE_THROUGH}°)` : " grey";
    return `${s.id} [${s.band}] ${hex(c)} L ${f(L, 3)} C ${f(C, 4)} · on paper ${hex(own)} ΔE ${f(d, 3)} · ground ${hex(g)}${why}${ok ? "" : accepted ? ": accepted for chrome (Q-11 a)" : " ✗"}`;
  });
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}:`);
  for (const p of parts) lines.push("    " + p);
}
const reported = text === "a" || (text === "c" && t.gateRows === 0);
const tallyLine = `${would} of ${rowsN} off-paper light composites read grey or the ground's hue (${acceptedN} chrome, accepted under (a)'s text); content rungs grey off paper: ${[...greyContent].join(", ") || "none"}`;
if (reported) { lines.push(`REPORTED (Q-11 ${ruling ? "ruled (" + ruling + ")" : "unruled: the default (a)"}): ${tallyLine}`); t.gateRows = Math.max(1, missing); t.gateFails = missing; }
else lines.push(`Q-11 (${ruling}): ${tallyLine}`);
report(cap, { id: "M-1x", title: `no grey off paper (light, over black, checker and the deep canvas: the plate keeps its paper reading, or carries a colour that is not the ground's)${reported ? "; REPORTED until Q-11" : `; gated under Q-11 (${ruling})`}`, lines, ...t, gate });
