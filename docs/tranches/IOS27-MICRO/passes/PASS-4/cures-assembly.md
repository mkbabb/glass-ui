# CURES-ASSEMBLY — pass 4 (IOS27-MICRO)

Seat: p4:ASSEMBLY. Verified-model: claude-fable-5 (the system-context model ID, returned
verbatim). 2026-07-19. Work orders: PASS-3 `AGGLOMERATION.md` §6.1 batch 2 (A5 → A7 → A4 →
A9+n4 → n3 → A2 remainder → D8 adjudication), executed under the owner's terminal-pass
ruling (`OWNER-RULING-TERMINAL-PASS.md`: pass 4 is the LAST design pass).

Provenance, stated plainly: the owner-pause bank (`cdc322b9`) committed this batch's code
cures AS WIP mid-flight. This seat's session (a) re-verified EVERY banked cure against its
CRIT-ASSEMBLY pin on disk, (b) fixed the one FAIL the banked state carried (the n4 gate
tripping on its own comment literal), (c) landed the un-landed halves — the A2 both-model
fit, the D8 hypothesis adjudication with measured numbers, the D8 integrator-rate raise +
convergence gate, and the PROBE-NOTES truth-up (the beat-anchor description, the fit
routing, limits 8/9 the page already cited, the QP-row instrumentation notes) — and (d)
re-ran the battery after every code-touching edit. No browser was driven (singleton
honored); every paint demand below is a named re-run for the serialized paint arm.

**BATTERY: `node check.mjs` → 189/189 PASS, exit 0** (155 at the pass-3 write; +33 pass-4
cure gates banked at the pause + 1 D8 convergence gate added here). Analysis reproducible:
`scratchpad/p4-assembly-analysis.mjs` (extracts the page's own ASM block; no
re-implementation).

---

## Outcomes per batch item

### A5 — the unguarded return-snap two-writer window on `--vap-t` · CURED, verified

- Per-organ generation guards (the m8 lesson, scoped — a shared counter would lie across
  the seam): `index.html:892` (`dockGen`/`vapGen`).
- The return drain `back` is generation-guarded: `index.html:1227` — a commit mid-drain
  kills the second writer BEFORE it writes.
- The handoff listener cancels `vRaf` at the seam: `index.html:1240` — `run` and `back`
  can never both live; the two-writer window at the commit's onset is closed.
- Gates: `check.mjs:320-322` (all three failable pattern-locks). **This is the ledger D6
  re-run's named precondition — SATISFIED**; the stamp-impossible 367/397ms hot-seed reads
  can no longer come from the interleave. D6 re-run itself: PAINT ARM (queued, QP row 7 as
  re-annotated in PROBE-NOTES).

### A7 — the handoff beat out of band (256–397ms vs 80–140) + the tautology gates · CURED, verified + MEASURED

- **Re-clocked to the measured register at the PAINTED anchor**: the medium delay is
  stamped per commit as `text + contentOut(v, d0) + beat` — the content-out crossing
  (every vapor layer under `VIS_EPS` 0.06) inverted from `firedD`, seed- AND d0-aware:
  `index.html:579-598` (VIS_EPS, `contentOutD`, `contentOutMs`, `mediumDelayForMs`); the
  commit path stamps it live at `index.html:1255`. Zero-seed stamped delay 287ms (was 365
  at the clock-end anchor); the erosion clock's empty ease-out tail (its final ~37% of
  wall time) no longer inflates the beat.
- **The three tautologies are dead; the replacement gates CAN fail** — gated on the
  DERIVED painted-beat quantity via two INDEPENDENT computations (forward opacity scan vs
  the closed-form inverse): sim `index.html:799-815`; gates `check.mjs:152,157-161`
  (zero-seed / hot-seed / caught-at-d0=0.4 each in [80,140], sign-positive, seed-invariant
  |Δ|≤3ms).
- **Negative control, MEASURED (falsifiability demonstrated)**: re-anchoring at the clock
  end on the same opacity model reads **188ms (v=0), 175ms (v=3), 202ms (d0=0.4)** — all
  FAIL the [80,140] gates. The analytic painted beat under the old anchor matches the
  ledger's 256/285ms class direction; the new painted beat is 110ms across the grid, Δ=0
  under seed.

### A4 — the uncatchable dock glide · CURED, verified

- The Organ-B seize pattern on every g-flight: `pointerdown` during ANY deploying flight
  (fired deploy, velocity arrival, under-thrown return) seizes the spring's x as `dragG0`
  and nulls `gSpring` with a generation bump — `index.html:1052-1064` (`:1058` the seize;
  pending fired-ladder legs die with the old gen, so no orphan channels and no two-writer
  band on `--asm-g`); a caught fired deploy scrubbed home clears the ladder classes
  (`index.html:952-954`).
- **Down-scrub scope DECLARED in writing** at the listener (`index.html:1050`) and now as
  PROBE-NOTES **limit 8**: live-session down-scrub is OUT of this page's scope (the live
  exit is the commit ladder or Reset); the kernel's `s.scrub(g)`-at-any-regime stays the
  union's obligation. Gates: `check.mjs:324-326`.
- The QP-5 k·v ladder no longer hits a dead zone when the paint arm runs it.

### A9 + n4 — painted grammar ≠ modeled grammar outside the mirror locks; token hygiene · CURED, verified

- Ghost drift LOCKED to the one token: both axes stamped from `drift.magPx` on the unit
  corner ray (`index.html:909-910`); both ghosts consume the stamped vars
  (`index.html:141-142,151-152`); the 22.6px-diagonal breach class is gate-locked out
  (`check.mjs:176-178` — hand literals in ghost transforms fail).
- Darkmass interior ON the gated profile: the CSS gradient is now 5 stops each sitting on
  `occlusion.at(u)` = 0.85·(1−u/0.55)^1.2 (`index.html:249-254`); the battery PARSES the
  painted literals against the model, max |err| ≤ 0.005 (`check.mjs:241-245`) — the
  convicted 0.55@30% (0.33 modeled) fails there, and **POW now PAINTS** (POW=1 fails the
  stop-match).
- `rimFlare.gain` PAINTS: plateau opacity 0.476 = 1/gain vs flare 1.0
  (`index.html:273-277`), painted ratio gated == 2.1 ±0.02 (`check.mjs:249-251`).
- n4 hygiene: `--asm-level` DELETED (written-never-consumed; the HUD relays the level for
  QP-3) — the residual comment literal that tripped the gate in the banked state is
  reworded this session (`index.html:935`), gate `check.mjs:332` now green; `CHIP.lumDelta`
  claim-token DELETED (the +12–15 lum claim lives in MARKS-E §5, paint-verified at the QP
  row — `check.mjs:141`); hand literals became consumed tokens: `gClamp` 1.12
  (`index.html:493`), release thresholds `underG/underV` (`:494`), commit thresholds
  `commitAt {d, v}` (`:600`), and the last hand CLOCK `returnMs: 180` (`:569`) — all with
  consumption gates (`check.mjs:333-338`).

### n3 — the control tier dead to law 20 · CURED, verified

- Engagement light is STATE: Summon + Commit ride the `pressDrain` envelope row for the
  hold's whole life via `makeHoldLight` (`index.html:1130-1149`), consumed as sustained
  scale + ring light (`--ctl-press`, `index.html:204-210,313-319`); release runs on the
  envelope's own clock. Gates: `check.mjs:328-330`.
- Harness controls (world-tap, Reset) DECLARED out of the organ grammar — PROBE-NOTES
  **limit 9** (the page's citation now resolves).

### A2 remainder — the both-model fit vs the 7 measured velocity samples · MEASURED, routed

Fit run this session against BOTH tracker passes (MARKS-C-APPS.md:251 pass 1 + :396-397
independent redo; 60fps frame averages; alignment free ±16.7ms; v0 gridded 0–6000 px/s at
50; ζ0.97 per the measured no-bounce, which excludes low-ζ members; D=663px; the page's own
integrator). Inter-tracker point-RMS ≈ 100 px/s.

| model | best v0 | RMS (px/s) | ×tracker | t90 |
|---|---|---|---|---|
| Z zero-seed press-row {0.20, ζ0.97} (the page's build) | 0 | **1223** | 12.2 | 119ms |
| S-press seeded press-row (v0 free) | 50 (≈0) | 1223 | 12.2 | 119ms |
| S-dock seeded dock-row {0.35, ζ0.97} (the OUR-LANGUAGE recipe) | 6000 (rail) | 2114 | 21.1 | 174ms |
| Z-dock zero-seed dock-row | 0 | 2593 | 25.9 | 208ms |

Findings, honestly graded: (i) **NO admitted member fits point-wise** — the measured
mid-bell 10.2k frame-average exceeds the press-row family's ~7.8k instantaneous peak at
D=663 (BOUNDED: sample 1 may carry veil-frame contamination, MARKS-C-APPS 7.4 item 1); the
page's build remains A valid band-level model (t90 119 vs the ~117ms window; accel-first;
no-wobble; peak/mean inside the gated class). (ii) **The RESPONSE class is decided**: the
dock row misses the window at EVERY seed — no seed buys it back. (iii) **The seed is
UNDECIDABLE**: the free seed collapses to ≈0 at identical RMS. **ROUTED (the only
survivor), one census/H-4 row: the condense-bell register is the press-row response class
(~0.20), NOT `springPreset("dock")` as MARKS-C-APPS OUR-LANGUAGE (:286) names it; seed left
free.** The seeded-vs-zero-seed conviction routes NOWHERE; "cannot be built as written"
stays struck. Ledger + PROBE-NOTES finding 1 amended in place; the HALT on the census/H-4
routing is LIFTED for this one row only.

### D8 — the 2.63%-vs-4.15% sim/paint overshoot gap · ADJUDICATED (MEASURED) + CURED

Hypotheses from the minted D8 row (PAINT-LEDGER.md:246), each given its number this
session:

| hypothesis | measured term | verdict |
|---|---|---|
| integrator dt | old single-step Euler per 16.7ms rAF tick (the pass-3 paint path, verified at `4053ac10`) paints **1.74%** vs the certified **4.15%** — a −2.41pp term | **DOMINANT — CURED**: `makeSpring.step` substeps at the certification rate (h ≤ 1/2400s, `index.html:456-468`); 60fps ticks now paint 4.148% (240Hz would read 3.59%, 960Hz 4.06% — the banked 240 floor was NOT converged and was raised here); convergence gate `check.mjs:352` fails a single-step revert by 2.4pp |
| measurement base | 4.15% of the 274px g-travel = 11.4px = **3.55%** against the 320px full height — a −0.60pp term if the tracker divided by height | **OPEN — decided at the re-run**: the ledger row 4 re-run must PRINT its base (QP row 4 re-annotated) |
| 25fps sampling quantization | worst-phase 40ms sampling reads 3.98% of the true 4.15% — a −0.17pp term | REAL but minor |
| capture path | unquantified here | residual only if the re-run still disagrees |

Prediction for the post-cure paint re-run: ≈3.4–4.1% (travel base) / ≈2.9–3.5% (height
base) under worst-phase 25fps sampling. Note the honest residual: the OLD integrator
predicts 1.74% painted, BELOW the measured 2.63% — the base+capture terms must have read
generously in pass 3; the re-run with a printed base closes the question. PAINT ARM owns
the re-run.

### D7 — the world-dim defect (−13/−30% vs the ±2% no-scrim law) · PAGE-SIDE HALF DONE; re-run is the PAINT ARM's

> **`[P4-AGG 2026-07-19 SUPERSEDED — CRIT-COVERAGE minor 3]`: the re-run RAN hours after
> this section was written and the page is EXONERATED** — PAINT-LEDGER order 2: Chromium
> lossless, probes strictly outside the printed fence, **Δ 0.00% everywhere**; the pass-3
> −13/−30% was probe-inside-the-GROWN-extent + VP8 edge class (the fence trap is now O-4
> method law). The "stands un-exonerated" and "stay convicted" clauses below are the
> honest words of their hour and are HISTORY only — the ledger wins by recency.

Focus stays dark-mass + rim, NEVER a scrim — verified again on disk: zero scrim exists
(backdrop-filter census exactly 3, `check.mjs:290`); `.darkmass` is clipped inside the
dock's `overflow: hidden`; no filter touches `.world`. The page-side cure the A6 route
demands: `ASM.dock.clampedExtent` (`index.html:498-503`) computes the maximal painted dock
extent at the 1.12 clamp, and the battery gates AND PRINTS the probe fence — x strictly
outside center±172.8px, y strictly outside [300, 652.9]px (+ grow·150px)
(`check.mjs:340-344`). The Chromium LOSSLESS re-run with printed rect arithmetic runs
BEFORE any further cure, per the re-issued ledger route; the pass-3 reading stands
un-exonerated until then, and the page's "scrimless by construction" comments stay
convicted with it. QP row 1 re-annotated.

### A3/A1 — the engine-divergent perch seat at the R-9 re-ruled band · VERIFIED IN PLACE (cured at P3-AGG)

Re-verified this session against the re-ruled charter text (CHARTER.md:180): `.vcard`
AUTHORS `corner-shape: squircle` (`index.html:108`) so n derives from the AUTHORED shape
per engine (Chromium squircle n=4 seat 4.45px; engines without it drop the declaration and
the probe honestly seats n=2 at 8.20px against round paint); the authorship gate
(`check.mjs:143`) and the re-banded telltale [0.55, 0.63] (`check.mjs:137`, value 0.586)
are both green and both failable. QP-12's Chromium straddle re-run: PAINT ARM.

### The remaining CRIT-ASSEMBLY rows — verified disposition, nothing silent

- **A6** (unsafe D7 diagnosis): cured at P3-AGG in the ledger route; page-side fence above.
- **A8** (roll-up words vs rows): cured at P3-AGG (charter §O-3 vocabulary + the
  NOT-DRAINED restatement) — not this seat's surface; nothing re-opened.
- **n1** (drain bookkeeping), **n5** (grading consistency), **n6(ii)** (charter's own
  sequencing tension): cured at P3-AGG in ledger/charter; verified present.
- **n2** (dropped sub-claims + tiling risk): record cured at P3-AGG; the QP-13 tiling read
  + QP-4 filter-cost note ride the pass-4 paint queue (unchanged by this batch).
- **n6(i)**: became D8 — adjudicated above.

---

## What carries out of this batch (owners named)

1. **PAINT ARM (serialized)**: D6 re-run (instrumented anchors; preconditions SATISFIED) ·
   D7 lossless re-run (printed rects, the battery's fence) · D8 re-measure (printed base) ·
   QP-12 Chromium straddle · QP rows 1–14 as re-annotated in PROBE-NOTES.
2. **SPINE-CONDUCTOR census + H-4 registry**: the ONE routed A2 row (press-row response
   class for the condense bell; seed free).
3. **m9 stands**: until this page runs on the WebKit VIDEO path, no adoption language says
   "proven together."

## Honesty line

This seat drove no browser. The A2 fit, the D8 terms, and the A7 negative control are
node-side arithmetic on the page's own extracted physics — MEASURED as simulation, named
as re-run orders where paint must judge. The banked WIP was not taken on faith: every cure
above was re-pinned on disk this session, the one banked FAIL was found and fixed, the
banked D8 substep floor (240Hz → 3.59%, not converged) was raised to the certification
rate with a gate that fails a revert, and the battery ran green after every edit —
**189/189 PASS, exit 0**, final run post-edits. Files touched this session:
`proto-assembly/index.html` (D8 rate + comment truth ×2), `proto-assembly/check.mjs` (the
D8 convergence gate), `proto-assembly/PROBE-NOTES.md` (header count, beat anchor, finding
1 fit + routing, finding 2 stamp, QP rows 1/4/7, limits 8/9), this file. Everything is
modified-uncommitted; the commit is the user's gate.
