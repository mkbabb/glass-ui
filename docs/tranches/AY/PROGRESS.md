# AY tranche — PROGRESS

The perfect-the-library tranche: a ~34-wave, two-repo, cross-published engagement
(glass-ui primary; slides under tranche L). The cardinal-lesson forcing function is
carried forward as the machine floor under every visual close — `W-CARDINAL-INFRA`
(Batch 0) tranche-parameterizes `proof:live-verified-ledger` so the gate reads THIS
tranche's `docs/tranches/AY/PROGRESS.md` + `AY/audit/visual/`, covers `complete` on
the curated `audit/visual/VISUAL-ALLOWLIST.json`, matches the referenced PNG to the
wave's own surface, and lints the {light,dark} depth floor.

**Binding done-definition + run order: [`EXECUTION-DAG.md`](./EXECUTION-DAG.md).**
The DAG is the source of truth for the wave SET, the 6-batch order, and the two
user-domain hinges (W-PUB1 publish, L.W5 deploy). "Perfected" is the DAG's
close-criteria GREEN with falsifying gates, NOT a row count.

Status legend (the reconciled vocabulary — `(DEVELOPED)` RETIRED, gate-rejected by
`proof:live-verified-ledger`, see W-CARDINAL-INFRA):
- `planned` — spec authored or not yet authored; no code landed. `planned (spec authored)`
  marks a wave whose tranche-format wave-doc exists under `waves/` but is unbuilt.
- `in-progress` — code landing.
- `dev-complete` — the device-free gates closed GREEN; no live DELTA owed (a non-visual
  wave — a doc/gate/decision wave that changed no pixels).
- `live-pending` — the device-free gates closed GREEN but the binding on-disk `.png`
  DELTA capture is OWED (a visual wave whose code landed but whose own-surface capture
  has not been written), OR the real-device audit surfaced a CONTRADICTION (the wave
  re-opens until the live truth is GREEN).
- `live-verified` — GATE-DEFINED (a fresh on-disk own-surface capture exists), never
  author-asserted. A visual wave is "done" ONLY at this state (the cardinal lesson: a
  green headless proof over a black/broken live canvas is NOT done; `complete` never
  collapses to `headless-green`).
- `complete` — a non-visual wave whose device-free gates closed GREEN. A `complete`
  wave that CHANGED PIXELS adds its wave-id to `audit/visual/VISUAL-ALLOWLIST.json` and
  is then held to the SAME own-surface DELTA bar as `live-verified` (the gate covers
  `complete`, so no visual wave hides behind the token).

The DELTA-owed contract: every `live-pending` row owes a captured before/after `.png`
to `audit/visual/W<NN>-DELTA.md` before it can flip to `live-verified`; an allowlisted
`complete` row owes the same own-surface light+dark capture. The capture IS the close
criterion (see [`audit/visual/CAPTURE-PROTOCOL.md`](./audit/visual/CAPTURE-PROTOCOL.md)).

Run order is `EXECUTION-DAG.md §3` (6 batches), NOT alphabetical. **Batch 0 lands
FIRST: W-DAG (author the DAG + every spec) + W-CARDINAL-INFRA (the close-gate floor) +
W0-REGROUND + W-TRIAGE — nothing downstream closes its visual DELTA until the gate is
parameterized + reading the AY home.** The table is wave-named for reference; the
Status column reflects each wave's reconciled state. The AY waves are NET-NEW (this
tranche has no past); the table fills as waves close.

| Wave | Title | Status |
|---|---|---|
| W-DAG | author the execution DAG + every wave spec + L reconcile | planned |
| W-CARDINAL-INFRA | mint the AY cardinal home + tranche-parameterize + slides-port the live-verified-ledger gate | planned |
| W0-REGROUND | re-ground AY.md ↔ AY-DRAFT.md ↔ waves/ against HEAD | planned |
| W-TRIAGE | residual-defect triage (ex-W8) | planned |
| W-DELTA0 | the owed-DELTA sweep — backfill the 6 AX `complete` rows + W52 re-capture (ex-W0) | planned |
| W-CONSUMER | consumer-staleness sweep (ex-W5) | planned |
| W-AUR1 | aurora research-consume + arresting NUMERIC metric | planned |
| W-BLOB1 | targeted blob open-items audit + default-identity decision | planned |
| W-FF1 | rebase the born-RED AX.W43 fourier-field spec to HEAD | planned |
| W-DOCK1 | verify-or-falsify the dock items-lag (live capture) | live-verified — VERDICT: lag captured-ABSENT (box↔scalar onset Δ = 0ms in all 12 captures; the trailing-child trail is the deliberate stagger, not a clock desync); 12 own-surface frame-series PNGs ({light,dark} × {desktop,mobile} × 3 conditions); see [`audit/visual/W-DOCK1-DELTA.md`](./audit/visual/W-DOCK1-DELTA.md) |
| W-GLASS | re-author .glass-drawer + Slider onto --glass-level; opt-in specular | planned |
| W-MOTION | re-point off-doctrine motion survivors; widen proof:animation-coherence | dev-complete (source-verified — gate GREEN + CI-promoted + born-RED fixture; no pixels changed, no live DELTA owed; see [`audit/visual/W-MOTION-DELTA.md`](./audit/visual/W-MOTION-DELTA.md)) |
| W-CON1 | constellation refitField transpose-UP + auto-drift + --constellation-alpha | planned |
| W-CON2 | constellation warp VERIFY + decided-scope eggs | planned |
| W-CON3 | constellation ?freeze seam + anomaly/resolved props | planned |
| W-AUR2 | aurora doc reconciliation — derive-color PROP sliver | planned |
| W-AUR-PAINTERLY | tune painterly mediums to the arresting metric + capture DELTA | planned |
| W-AUR-WEBGPU-DECIDE | retire the medium-less WGSL twin OR resurrect with a consumer | planned |
| W-BLOB2 | light OKLCh default base + atom simplification | planned |
| W-BLOB3 | blob interaction + frame-budget + consumer-#2 decision | planned |
| W-FF2 | land the W43 intensity model; intensity prop; 3-substrate parity | planned |
| W-DOCK2 | real entering-child onset gate + ONE DOCK_SPRING + rail | planned |
| W-DOCK3 | author the dock-with-slider story; capture the drag | planned |
| W-SLD1 | reconcile the rounded-knob-vs-cylinder slider contradiction | planned |
| W-SLD2 | slider consumer-boundary gate clause | planned |
| W-SCALE1 | extend --ui-scale to form-atom hit-area | planned |
| W-SCALE2 | desktop-fluid scale ladder | planned |
| W-A11Y-PERF | engage W55 by default; webkit prefix; rAF-coalesce specular; contrast oracle | planned |
| W-SB1 | storybook per-route KEEP/FIX/RETIRE | planned |
| W-SB2 | storybook orphan component-retire | planned |
| W-SB3 | storybook native-top-layer FOLD + language gate | planned |
| W-DOC1 | quality-uplift the 4 existing READMEs | planned |
| W-IC1 | instrument-chassis scope decision | planned |
| W-CONVERGE | per-major-component glass-ui ↔ slides FIT audit | planned |
| W-CSS1 | CSS partial reconcile | planned |
| W-COLOCATE | test/source co-location reconcile | planned |
| W-GOD1 | god-module carve (after W-CON1/W-BLOB2 land) | planned |
| W-LEG1 | legibility reconcile | planned |
| W-LIVE1 | the local-only live-gate CI decision | planned |
| W-NDA | NDA / scope-clause reconcile | planned |
| W-CARRY | chronic-defer register = deferral-set | planned |
| W-CLOSE1 | FINAL + proof:ay-final + overfitting audit | planned |
| W-PUB1 | [HINGE] master-merge + push the v-tag → release.yml provenance publish | planned |
