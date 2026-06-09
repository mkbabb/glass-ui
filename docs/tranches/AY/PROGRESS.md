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
| W-CARDINAL-INFRA | mint the AY cardinal home + tranche-parameterize + slides-port the live-verified-ledger gate | complete (gate WIRED — `proof:live-verified-ledger:ay` at `package.json:696` reads `AY/PROGRESS.md` + `audit/visual/`; the visual dir + `VISUAL-ALLOWLIST.json` + 8 own-surface DELTAs landed; gate-infrastructure wave, no pixels — DELTA is the born-RED→engine-green capture in [`audit/visual/W-CARDINAL-INFRA-DELTA.md`](./audit/visual/W-CARDINAL-INFRA-DELTA.md); NOT `planned`) |
| W0-REGROUND | re-ground the AUDIT-LEDGER ↔ waves/ against HEAD + mint the falsifiable `proof:ay-w0-reground` gate | complete (re-ground LANDED — `AUDIT-LEDGER.md` RE-GROUNDED to HEAD + the four-clause `proof:ay-w0-reground` gate minted at `scripts/proof-ay-w0-reground.mjs`, wired into `proof:all`, RED-witnessed naming row 2; doc+gate wave, no pixels — NOT `planned`) |
| W-TRIAGE | residual-defect triage (ex-W8) | planned |
| W-DELTA0 | the owed-DELTA sweep — backfill the 6 AX `complete` rows + W52 re-capture (ex-W0) | planned |
| W-CONSUMER | consumer-staleness sweep (ex-W5) | planned |
| W-AUR1 | aurora research-consume + arresting NUMERIC metric | planned |
| W-BLOB1 | targeted blob open-items audit + default-identity decision | planned |
| W-FF1 | rebase the born-RED AX.W43 fourier-field spec to HEAD | planned |
| W-DOCK1 | verify-or-falsify the dock items-lag (live capture) | live-verified — VERDICT: lag captured-ABSENT (box↔scalar onset Δ = 0ms in all 12 captures; the trailing-child trail is the deliberate stagger, not a clock desync); 12 own-surface frame-series PNGs ({light,dark} × {desktop,mobile} × 3 conditions); see [`audit/visual/W-DOCK1-DELTA.md`](./audit/visual/W-DOCK1-DELTA.md) |
| W-GLASS | re-author .glass-drawer + Slider onto --glass-level; opt-in specular | planned |
| W-MOTION | re-point off-doctrine motion survivors; widen proof:animation-coherence | dev-complete (source-verified — gate GREEN + CI-promoted + born-RED fixture; no pixels changed, no live DELTA owed; see [`audit/visual/W-MOTION-DELTA.md`](./audit/visual/W-MOTION-DELTA.md)) |
| W-CON1 | constellation refitField transpose-UP + auto-drift + --constellation-alpha | live-verified — refit fills the resized box in ONE frame (covW/H 0.26/0.33 drift-out → 0.92/0.98 refit; binding π); auto-drift fires 3×/5s on the SAME warp spring (PRM-suppressed: 0 re-targets under reduce); field cools (mean node-speed within ±5%); --constellation-alpha both-mode π readback MATCHES (light 0.80 / dark 0.88); 12 own-surface PNGs (refit before/after + auto-drift × {desktop,mobile} × {light,dark}); see [`audit/visual/W-CON1-DELTA.md`](./audit/visual/W-CON1-DELTA.md) (RG-noted: DELTA re-capture owed — the engine logic is sound but the four "mobile" PNGs are 1280×721 desktop screenshots of a sparse left column with no focal ring; the W-CON1 RG2 re-capture owes a real 375×667 filled-box render — see W-CON1 §0 RE-GROUND / `audit/hardening/b2/B2-con1.md` F2/F3) |
| W-CON2 | constellation warp VERIFY + decided-scope eggs | planned |
| W-CON3 | constellation ?freeze seam + anomaly/resolved props | planned |
| W-AUR2 | aurora doc reconciliation — derive-color PROP sliver | planned |
| W-AUR-PAINTERLY | tune painterly mediums to the arresting metric + capture DELTA | planned |
| W-AUR-WEBGPU-DECIDE | retire the medium-less WGSL twin OR resurrect with a consumer | planned |
| W-BLOB2 | light OKLCh default base + atom simplification | live-verified — the cream bead the docs promised: resting body mean OKLCh-L 0.814 light / 0.775 dark (≥0.62 floor, was ≈0.53 charcoal); `proof:blob-warm-default` born-RED→GREEN (2/2); the 46-field BlobConfig folded to 8 atoms (`proof:blob-config-atoms` 8≤12 + deletion-witness); the full `proof:blob-*` fleet GREEN (render 3/3, live-truth 4/0, integration 3/3); 9 own-surface PNGs ({light,dark}×{375,1280} + 5 hover frames); see [`audit/visual/W-BLOB2-DELTA.md`](./audit/visual/W-BLOB2-DELTA.md) (RG-noted: DELTA re-capture owed — the light-default engine logic is sound but the 5 mood-hover frames are static red with no readable lean and the mood surface never shows the cream default; the W-BLOB2 RG2/RG3 re-captures owe a demonstrative mood-lean series + a cream-default mood frame — see W-BLOB2 §0 RE-GROUND / `audit/hardening/b2/B2-blob.md` F2/F3) |
| W-BLOB3 | blob interaction + frame-budget + consumer-#2 decision | planned |
| W-FF2 | land the W43 intensity model; intensity prop; 3-substrate parity | planned |
| W-DOCK2 | real entering-child onset gate + ONE DOCK_SPRING + rail | live-pending — device-free gates GREEN (HG1 born-RED witness `proof:dock-lockstep-bornred` RED-on-lag/GREEN-at-HEAD; HG2 stagger KEEP + 0.4-vs-0.55 reconcile + LOCKSTEP_BUDGET_MS≈537ms recorded; HG3 `proof:spring-tokens-synced` re-pointed to the canonical `dockMorphContext.ts` + born-RED-on-retune; HG4 FLIP fold BOOKED→W-GOD1 with `detectFlipDriftGuard`; HG5 `proof:dock-rail-cohesion` single-indicator+one-clock LANDED, persistence BOOKED→W-GOD1; HG6 CI-included + byte-relocked; HG7 §F1 documented + §F2 BOOKED→W-GOD1); own-surface light+dark frame-series capture OWED → [`audit/visual/W-DOCK2-DELTA.md`](./audit/visual/W-DOCK2-DELTA.md) |
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
| W-COHERE | the four substrates as ONE set — blob mood-register + ambient shadow, constellation recession envelope, the set-cohesion gate (B2-gestalt; runs LAST in the substrate band) | planned |
| W-UNDERLINE | GlassUnderline — the sci-report HandUnderline pen draw-on transposed UP as a first-class `/underline` component (two clocks, PRM-fenced, filter-free; slides + sci-report consumers; user-directed 2026-06-09) | planned |
| W-MOTION2 | the FULL keyframes.js suite + every curve re-exported through /motion + the CSS↔JS curve table + the curve-gallery story (user-directed 2026-06-09) | planned |
| W-ANIM1 | the first-principles animation audit — the falsifiable rubric, the element×principle conformance matrix, the routed fix list, the extended proof:animation-coherence (user-directed 2026-06-09) | planned |
| W-LIQUID | the iOS-27 Siri liquid-glass facility — useLiquidFlex amorphous flex+squish shared primitive (blob/dock/tabs-indicator consumers; SOTA research lane in the hand-challenge; extends W52/W53) (user-directed 2026-06-09) | planned |
| W-LEG1 | legibility reconcile | planned |
| W-LIVE1 | the local-only live-gate CI decision | planned |
| W-NDA | NDA / scope-clause reconcile | planned |
| W-CARRY | chronic-defer register = deferral-set | planned |
| W-CLOSE1 | FINAL + proof:ay-final + overfitting audit | planned |
| W-PUB1 | [HINGE] master-merge + push the v-tag → release.yml provenance publish | planned |
