#!/usr/bin/env node
// W-S · A claim whose ground knowledge is out of scope, ambiguous or gone says so (H3-7; C″'s C-3 and C-6; Q-7 (b)).
// Three field-claim scenes over the c1 aurora, both themes, each captured claimed (variant base: <main
// data-glass-ground="field">) and unclaimed (variant noclaim, ?claim=none):
//   fieldout   the Aurora is mounted outside every ancestor of <main>: its publication is out of the claim's scope
//   fieldtwo   two Auroras: c1 page-wide and c0.5 under the content row (one page, two substrates)
//   fieldgone  the Aurora unmounts 1.2 s after mount; the claim stays
// Per content plate (wash, quiet, resting, card):
//   acts   the claim changes the paint: ΔE_OK(claimed composite, unclaimed composite) > 0.006 (paint-read noise; a
//          library with no claim, or a claim that falls to the bound, reads ≤ 0.006 and is fail-safe by construction)
//   stamp  lib.mjs GROUND_STATE_ATTR on the plate or an ancestor
//   fieldout, fieldgone: PASS when the claim does not act, or when it acts AND carries a stamp that is not a live state
//          (LIVE_STATES: "published", "live"). Acting with no stamp is the silent dead arm (C′ critique §4.2: the wash
//          solved to 0.624 with 0 console messages); acting under a live stamp is a stamp that lies.
//   fieldtwo:  PASS when every ink on the plate keeps M-2 (R 1 and R 3 ≥ 4.5) AND (the claim does not act, or it acts and
//          carries a stamp). Which substrate's tones are right is the route's to say; that it said something is read here.
//   node ws-claim-stamp.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, composite, dE, hex, f, tag, pick, THEMES, CONTENT, FIELD_CLAIM_SCENES, LIVE_STATES, GROUND_STATE_ATTR } from "./lib.mjs";
import { need, tally, inkRows } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const t = tally(), lines = [];
const n = need(cap, gate, { themes: THEMES, grounds: ["aurora"], scenes: FIELD_CLAIM_SCENES });
t.add(true, false, n.missing); lines.push(...n.lines);
for (const { cell, gated } of n.have) {
  const ref = pick(cap, { engine: cell.engine, theme: cell.theme, ground: cell.ground, scene: cell.scene, variant: "noclaim" })[0];
  if (!ref || ref.crashed) { t.add(gated, false); lines.push(`${tag(cell)}: no unclaimed reference (variant noclaim) ✗`); continue; }
  const rows = cell.scene === "fieldtwo" ? inkRows(cap, cell) : [];
  const parts = [];
  for (const id of CONTENT) {
    const s = cell.specs.find((x) => x.id === id), r = ref.specs.find((x) => x.id === id);
    if (!s?.sample || !r?.sample) { t.add(gated, false); parts.push(`${id} missing ✗`); continue; }
    const c = composite(cap, cell, s), u = composite(cap, ref, r), d = dE(c, u), acts = d > 0.006;
    const stamp = s.stamp, live = stamp != null && LIVE_STATES.includes(stamp);
    let ok, why = "";
    if (!s.claim) { ok = false; why = " (the specimen's claim is missing)"; }
    else if (cell.scene === "fieldtwo") {
      const inkOk = rows.filter((x) => x.spec === id).every((x) => x.p05 >= 4.5 && x.p05r3 >= 4.5);
      ok = inkOk && (!acts || stamp != null);
      if (!inkOk) why = " (an ink under 4.5)"; else if (!ok) why = " (acts with no stamp)";
    } else { ok = !acts || (stamp != null && !live); if (!ok) why = stamp == null ? " (acts with no stamp: silent)" : ` (acts under a live stamp "${stamp}": the stamp lies)`; }
    t.add(gated, ok);
    parts.push(`${id} ${hex(c)} vs unclaimed ${hex(u)} ΔE ${f(d, 3)} ${acts ? "acts" : "inert"} · ${GROUND_STATE_ATTR}=${stamp ?? "—"}${ok ? "" : why + " ✗"}`);
  }
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
report(cap, { id: "W-S", title: "a field claim with its publication out of scope, shared by two substrates or unmounted either does not act or is stamped (truthfully)", lines, ...t, gate });
