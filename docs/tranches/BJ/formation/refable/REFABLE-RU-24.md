# REFABLE RU-24—the glass-subtlety layer (redo, retrospective adjudication)

- **Unit**: RU-24 SUBTLETY—framework-wide glass subtlety as shipped in 7.0.0
  (BI.W-GLASS-SUBTLETY + its sibling BI.W-GRADED-BACKDROP, the gradient-blur half of the
  same edict): the blur ladder made slightly more subtle, dialog rounding bound to the
  card, and the gradient-blur experiments per the OpenAI exemplars—judged at HEAD
  against the edict and against the NOW-MEASURED exemplar truth (RU-15 stills:
  IMG_2287/2288 = a ~70pt, 0→~20pt progressive blur RADIUS ramp + co-applied dim and
  luminance backplate; web mechanism = 3-5 stacked masked backdrop-filter layers).
- **Verified model**: this seat is powered by `claude-fable-5` (read verbatim from the
  system context: "The exact model ID is claude-fable-5"). The scrutinized wave docs are
  opus-authored per the REFABLE demarcation.
- **Protocol trace**: (1) ANEW at HEAD `16e72a49`—tokens, components, tests, demo, and
  git history read with both wave docs unread; every shipped value measured from
  primary sources. (2) Boundary moment recorded: **2026-07-18T06:44:08-0400**, ANEW
  verdicts fixed before the first wave-doc Read. (3) SCRUTINY assume-incorrect—both
  wave docs read and every load-bearing claim re-verified on disk and in history.
  Paint-only severity claims are LIVE-DEFER throughout (no browser this seat).

## ANEW baseline (the independent picture at HEAD, pre-scrutiny)

**The shipped subtlety layer, measured.** One integer-rounded ~15% pull landed at
`e9589654` (07-17 03:02): quiet/resting 8→7, floating/overlay 13→11, high-DPI overlay
restore 20→17 (`light-dark.css:36`), native `::backdrop` 8→7 (`scroll-tokens.css:75`),
immersive stage scrim 16→14, side-sheet graded field 40→34. Wash floor (1px) and deep
ceiling (16px) held; radius-only; the dark arm tracks through the shared `-radius`
primitives. Source-resolution tests (`tests/styles/glass-subtlety.test.ts`) assert the
composed outcome, honestly noting happy-dom runs no cascade. This is the SECOND pull in
the lineage (24→20→17 / 15→13→11 per the light-dark.css trajectory prose). The Button
rides `glass-wash` (1px) at HEAD—the quietest surface in the system.

**Dialog rounding.** `--radius-dialog: var(--radius-card)` (= `--radius-2xl` = 1rem) at
`theme/radius.css:34`; `--corner-shape-dialog` retired (the F6 = A' note—the dialog
leaves the squircle set, round on both engines; sheet keeps its squircle); the
concentric relay (`--radius-ctx`/`--radius-inset`) wired in DialogContent; bound by
`tests/styles/radius-dialog-bind.test.ts`. The dialog-nested single-line input rides
`--radius-field` via a dialog-scoped override (`_shared/field-control.css:46-47`).

**The gradient-blur surface.** ONE slot, two forms (`dialog/placement.css`):
- FORM 1—side-sheet per-edge graded field: one fixed `blur(calc(34px * var(--glass-level)))`
  sample, mask-alpha 0.325 → 0.45 → 1 over 0/40/120px from the viewport-facing edge.
- FORM 2—the `backdrop="graded"` opt-in box-following bloom: `blur(var(--glass-halo-blur))`
  (20px) + `--glass-bg-overlay` dim (50% light / 40% dark, plain per-mode arms), masked
  by an x/y double-ramp INTERSECT product (`--glass-halo-core: 13rem`,
  `--glass-halo-bloom: 7rem`), PRT/forced-colors → `display: none`, default `scrim`
  byte-identical, demo knob in `demo/stories/containers/dialog.vue`.

**ANEW verdict against the edict + the measured exemplar model:**
- Blur-subtlety arm: **ACHIEVED**—a coherent, censused, dark-iso ~15% pull with
  principled floor/ceiling holds.
- Dialog-rounding arm: **ACHIEVED**—bind + round + inner-control harmonization, tested.
- Gradient-blur arm: **APPROXIMATED, not achieved.** The endpoints and geometry match
  the measured model—terminal radius 20px lands exactly on the measured ~20pt; bloom
  travel 112px vs ~70pt (same order, softer); dim co-applied; concentric boundaryless
  pooling matches "the control floats on the ramp." But the INTERIOR misses: both forms
  are a single fixed-radius plate under an alpha mask—an opacity crossfade in the
  transition band (sharp page + one heavy-blurred copy superimposed at partial alpha),
  not a radius progression (mid-band content at intermediate ~8-12pt radius). The
  stills-prescribed mechanism—3-5 stacked masked layers, radius roughly doubling per
  band—exists nowhere in src/. Mid-band ghosting severity is LIVE-DEFER; the structural
  gap is disk-fact.

## SCRUTINY (both wave docs, assume-incorrect)

Boundary: the wave docs were read only after the ANEW verdicts above were fixed.

### RATIFIED (12)

- **R1—the 10-row census.** Every row landed exactly at the S≈0.85 primary column
  (1-HOLD / 7 / 7 / 11 / 11 / 17 / 16-HOLD / 7 / 14 / 34); radius-only; saturate/
  opacity/tint/brightness/rim/specular/shadow untouched; dark arm byte-isomorphic via
  shared primitives. Disk-true at HEAD.
- **R2—C2-BIND.** `--radius-dialog: var(--radius-card)` shipped, value-invariant,
  concentric relay intact, BORN-RED test now green.
- **R3—C2-SHAPE resolved A'.** Exactly the doc's lean: `--corner-shape-dialog` retired,
  `--corner-shape-sheet` kept, cards untouched (`radius.css` F6 = A' note).
- **R4—C2-INNER adopted as respecified.** The r2-corrected form is what shipped: a
  dialog-scoped `.field-control[data-kind="input"]` → `--radius-field` override; the
  textarea already-correct claim verified (`field-control.css`).
- **R5—the focused-test discipline.** Both new test files exist, assert composition
  outcomes (not bare literals), and state the happy-dom limitation honestly.
- **R6—the r4 precision census executed.** C1-PRESTALE (`utilities/components.css` now
  reads "≈ 11px"), C1-DERIVED (deep interpolants recomputed to ~13/~14/16 at
  `glass/deep.css:52,91,92`), C1-REGISTER (`--enter-transient-blur: 8px` HELD—verified
  a standalone motion literal, no ladder reference), trajectory-vs-present-tense
  appends all landed as ruled (`light-dark.css` "24→20→17px", "15→13→11").
- **R7—ladder-derive BOOKED, not smuggled.** `2a6d1d41` forms the co-location follow,
  ruled post-tag—the C1-STRUCTURE re-drift risk was named and routed, exactly as the
  doc committed.
- **R8—MIGRATION arms A + B and the atlas outbound.** Both 7.0.0 rows present with the
  consumer re-verify flag; `coordination/atlas-outbound-2026-07-16-glass-subtlety.md`
  exists.
- **R9—the graded opt-in floor.** `backdrop` defaults `scrim` byte-identical; PRT +
  forced-colors disable; ONE `aria-hidden` non-interactive span; popover halo
  default-decline honored (zero popover consumers); tests at `71892b9e`; demo knob at
  `55f5170d`.
- **R10—the co-equal dim, the proven ink, the trap honored.** The dim rides
  `color-mix(in oklab, var(--glass-bg-overlay) …)` on the same mask geometry, per-mode
  via a plain `.dark` ancestor arm—never a light-dark() fold.
- **R11—band and tokens in contract.** Bloom 7rem = 112px sits inside the spec'd
  ~80-120px band; the `--glass-halo-*` cohort is `:root`-overridable.
- **R12—the crossfade honesty.** The graded doc itself states the mechanism truth
  ("a fixed-radius blurred layer composites at partial alpha … a cross-fade"; keep the
  band tight "so the partial-alpha zone does not double-image")—the single-plate limit
  was known and written down, not hidden.

### OPUS-WRONG (5)

- **W1—D1's normative mechanism is geometrically broken; the implementation departed
  and was right to.** The doc mandates "the four-edge linear composite is the SINGLE
  primary … one gradient per side, each black at the surface edge fading to
  transparent," overlapping "additively." Four such masks union to approximately the
  whole viewport—the flood `placement.css` itself names ("NOT four additive half-planes
  (which flood the viewport)"). What shipped is a different geometry: a two-axis
  double-ramp INTERSECT product—which also dissolves the doc's predicted corner hazard
  (the "45° diagonal blend" becomes a soft product-pool roughly concentric with the
  modal corner). The normative spec was unimplementable as written; the corner-risk
  prediction was wrong for the mechanism that actually ships.
- **W2—the "uniform-radius plate, NOT a graded blur kernel" provenance ruling is
  contradicted by the measured truth.** The doc's r3/r4 correction struck the
  progressive-blur reading of IMG_2287/2288 as borrowed authority and re-declared the
  reference "substantially a graded DIM … at uniform radius." RU-15's measurement of
  the same stills finds a genuine ~70pt, 0→~20pt progressive RADIUS ramp, and the
  amended codex law 1 now attests exactly that as form (a)—with the stacked 3-4-layer
  web mechanism prescribed and the in-surface `--glass-halo-*` gradient re-framed as a
  declared BEST-iOS divergence "judged against (a)+(b)." Temporal caveat, stated
  fairly: the codex text available at formation may have read uniform-radius; the
  amendment post-dates the wave. Adjudicated against the now-measured truth per the
  REFABLE charter: the strike over-corrected. The dim-co-equal half of the same passage
  is RATIFIED (R10)—RU-15 measures dim + luminance backplate alongside the ramp.
- **W3—the BLUR-MUTE lineage claim is history-false.** The doc: BLUR-MUTE "is a
  *proposed* wave … it is **not built** … there is no override home to hunt for or
  delete." Git history: BLUR-MUTE EXECUTED 07-13 (`3c2f6e79`—`--glass-blur-btn-radius`
  6px in glass-fx.css, its own W-BLUR-MUTE-DELTA.md filed), then the Glass 7 land
  (`490cc46e`, 07-16 10:49) deleted the button cohort wholesale. The doc's grep-empty
  was true at its verification HEADs (07-16 23:48 / 07-17 01:17) only because the
  built thing had been REMOVED—"never built" erases an executed, paint-judged wave
  from the record. No paint consequence at HEAD (Button rides wash 1px).
- **W4—the adopt gate the wave defined was not executed; the API froze anyway.** The
  graded doc's own words: "This DELTA, resolved, is what gates whether the wave rides
  7.0.0 or defers," with ADOPT-4 (Safari outset seam + nested halo+modal composite) a
  HARD DECLINE GATE and a mobile-GPU frame trace required. Neither
  `W-GRADED-BACKDROP-DELTA.md` nor `W-GLASS-SUBTLETY-DELTA.md` exists anywhere in the
  repo; no capture/paint commit sits between the halo land (`189ae15c`) and the tag.
  The halo IS inside v7.0.0. The F1-F7 subtlety battery (retina no-op, 0.68 bleed,
  smear, tier-distinctness, corner parity, the two eye-forks) is likewise unrecorded—
  the A'/C2-INNER choices exist as code with no evidenced judgment. Context, stated
  fairly: the user's CUT-NOW publish order collapsed the pre-tag lane, and the BJ
  chronic adjudication already names a "halo freeze reality" correction. The wrongness
  adjudicated here is the wave-protocol breach as shipped fact: an experimental API
  frozen into an immutable major with its decline gate unrun. Whether Safari actually
  mis-composites is LIVE-DEFER.
- **W5—the adopted-API MIGRATION obligation unfulfilled.** The manifest requires a
  7.0.0 MIGRATION row for the `backdrop` axis + `--glass-halo-*` cohort "ONLY if
  adopted before the freeze." It adopted (in-tag); MIGRATION.md's 7.0.0 section carries
  the arm-A and arm-B rows but NO graded-backdrop row—a shipped public surface
  undocumented in the migration contract.

### FABLE-NEW (5)

- **N1—the interior of the ramp is the missing half of the exemplar model (the unit's
  central adjudication).** Endpoint (20px ≈ ~20pt, exact), travel (112px vs ~70pt),
  and dim all approximate the measured model; the progressive-radius interior does
  not exist—both halo forms are one fixed kernel under an alpha mask, and the
  codex-prescribed stacked 3-4 masked bands (radius roughly doubling per band) are
  unimplemented anywhere in src/. The coming ENGAGE-AFFORD slider modal—the direct
  IMG_2287/2288 recreation, registered post-tag at `ae29b00f`—is precisely the surface
  that needs the true ramp. Mid-band double-image severity LIVE-DEFER.
- **N2—the two forms of one slot diverge on the level-knob discipline.** FORM 1
  composes `--glass-level` into its blur; FORM 2 does not
  (`blur(var(--glass-halo-blur))` bare). Full PRT is covered by `display: none`, but a
  consumer's partial `--glass-level` dial reaches the side-sheet field and not the
  modal halo—an inconsistency inside a single `data-slot`.
- **N3—"box-following" is nominal.** `--glass-halo-core: 13rem` is a fixed half-extent
  on BOTH axes of a viewport-centered mask. It hugs the shipped `sm:max-w-sm` dialog's
  width (~12rem half) but ignores the modal's actual height—a short or tall modal gets
  a square-ish pool, and D4's "core ≈ the surface half-extent" cannot hold with a
  fixed token. Correct for the one shipped consumer; not the claimed geometry.
- **N4—the halo cohort's own overfitting bar was not met at ship.** D4: every
  `--glass-halo-*` token has ≥2 opt-in sites (immersive Dialog + ENGAGE-AFFORD "at
  minimum") "or is held until a second consumer arrives." Shipped with one consumer;
  the second is formed but unbuilt.
- **N5—the shipped 20px default sits OUTSIDE the doc's option set and ON the measured
  exemplar.** D4 offered exactly two candidates (11px or 34px, "the experiment picks
  which"); the implementation chose 20px with an on-disk rationale ("18-20px sweet
  spot; 11 reads too close … 34 is unnecessarily heavy")—landing on the exemplar's
  measured ~20pt terminal that the doc never named. The VALUE is ratified; the doc's
  option framing was wrong.

## ROUTING (PROPOSE only—no src/, band, or shipped-wave edits from this seat)

1. **DEFECT (from W4)—retro-run the frozen halo's adopt battery.** Safari outset-seam +
   nested halo+modal composite (the hard gate), mobile-GPU frame trace, both schemes,
   plus the F1-F7 subtlety battery; file the two missing DELTAs
   (`W-GLASS-SUBTLETY-DELTA.md`, `W-GRADED-BACKDROP-DELTA.md`). If ADOPT-4 fails at
   paint, the no-masking law demands fix-or-retire of a now-frozen API—urgent, and
   aligned with BJ's existing "halo freeze reality" correction.
2. **DEFECT (from W5)—add the missing 7.0.0 MIGRATION row** for the `backdrop` axis +
   `--glass-halo-*` cohort (docs-only, additive, post-tag safe).
3. **DESIGN-DEBT (from N1/W2)—the stacked-band progressive ramp.** Implement the
   codex-law-1 web mechanism (3-4 stacked masked backdrop-filter bands, radius roughly
   doubling, one dim layer) as the shared graded-halo interior, judged live A/B against
   the shipped single plate—and land it before or with ENGAGE-AFFORD, whose exemplar is
   the measured ramp itself. If the single plate wins at paint, record THAT as the
   declared divergence; either way the judgment finally gets captured.
4. **DEFECT (from N2)—compose `--glass-level` into FORM 2's halo blur** (one-line:
   `blur(calc(var(--glass-halo-blur) * var(--glass-level)))`), restoring level-knob
   parity across the slot's two forms.
5. **DESIGN-DEBT (from N3)—derive the halo core per-axis from the actual surface box**
   (measured box or anchor positioning) when the second consumer arrives; retire the
   fixed square core with it (also clears N4's two-site bar).
6. **DOC-TRUTH (from W3)—correct the BLUR-MUTE lineage** in the wave-doc record:
   executed-then-removed-by-the-Glass-7-cut, not never-built.
7. **DOC-TRUTH (from W2)—reconcile the graded wave's §Provenance with amended codex
   law 1 + the RU-15 measurement**: the reference ramp is attested progressive
   (form (a)); the in-surface gradient stays a declared BEST-iOS divergence, not a
   uniform-radius equivalence claim.

## Verdict

The subtlety edict's two deterministic arms shipped true to their contract—the census,
the bind, the A' fork, and the r4-grade prose discipline all verify on disk, and the
follow was booked rather than smuggled. The experimental arm is the inversion: the
implementation is BETTER than its spec (W1) and its one judgment-chosen value lands on
the measured exemplar (N5), but it froze into the immutable major with its own decline
gate unrun (W4), its MIGRATION row missing (W5), and the exemplar's defining property—
the progressive-radius interior—approximated by a crossfade the standing canon now
prescribes replacing with stacked bands (N1). Counts: 5 OPUS-WRONG / 5 FABLE-NEW /
12 RATIFIED.
