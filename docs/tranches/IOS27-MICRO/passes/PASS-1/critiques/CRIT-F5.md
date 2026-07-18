# CRIT-F5 — adversarial critique of family F5 OPTICAL-MEDIUM (pass 1)

verified-model: claude-fable-5 (system-context model ID, verbatim). Adversarial critic seat,
IOS27-MICRO pass 1, 2026-07-18. Non-author. Inputs read whole: SPEC-F5, the F5 research digest,
the prototype (`prototypes/f5-optical-medium/index.html`, 896 lines) + PROBE-NOTES including
VERIFIED, all five PNGs (viewed), MARKS, REGISTRY, and the family's cited kin in `src/`.

## What survived challenge (verified against the tree, not taken on faith)

- The platform-forced-decomposition defense is sound and correctly sourced; the in-tree proofs
  are real: `PagerDots.vue` names the σ8 whole-layer-filter annihilation in its header and ships
  the three-layer split; `material.css` carries the `--glass-cell-backdrop-filter: none`
  cell-suppression seam; `ModalOverlay.vue` is the `fixed inset-0` wash.
- Kin numbers reproduce: `useLeadTrail.ts` response 0.68/ζ0.64, τ≈270ms, emergent park;
  `useSelectionIndicator.ts` caps 1.11/1.045; `springPresets.ts` "dock" row; the five-rung
  ladder (.30/.50/.65/.80/.95 α; 1/7/7/11/11 px) in `tokens/glass.css`; `glass-fx.css` tint
  tokens with the AA clamp; exactly 9 `-webkit-backdrop-filter` occurrences.
- `glass-refract.css` does gate on `@supports (backdrop-filter: url("#glass-refract"))` — the
  U1 lying-gate concern is real shipped CSS, not a strawman.
- The prototype exists, runs, and is line-faithful where it claims to be (the `leadTrail` port
  matches the shipped constants and park semantics; the layer contract is literal in the
  markup). The U1/U3 board capture (`f5-u3-u1.png`) genuinely shows what VERIFIED claims for
  Chrome. The dishonesty ledger in PROBE-NOTES is specific and mostly complete.
- The lens hosts named as consumers exist in the tree: `tabs`, `dock`, `pager-dots`,
  `toggle-group` — the facility is not consumer-less.

## Open gaps

Enumerated; each with what would close it. Severity ordered.

**G1 — Safari was never driven, and Safari is the family's risk engine.** Every
family-specific unknown (U1 parse-vs-drop, U3 nested sampling, the blink test, the `-webkit-`
belt, PRM paint) is Safari-shaped; the charter's floor is Safari 2026; the cross-family
invariant reads "Chrome+Safari both verified in paint". The VERIFIED verdict "PROVES (Chrome
paint; Safari arm open)" proves the easy neighbor. U1 on Chrome tells us nothing the shipped
gate didn't already assume; U3's probe exists FOR WebKit. CLOSE: drive real Safari 26 on the
serialized browser seat across the full judging list (phase captures, U1 chips, U3 board, PRM,
U2 pair); append per-engine verdicts to VERIFIED. Until then the family's riskiest claim is
unproven on the only engine where it was ever in doubt.

**G2 — No paint evidence of any transient lens state, on any engine — and two captures are
mislabeled.** `f5-charge-travel-held.png` and `f5-morph-travel-b.png` both show `lens state:
rest` with a completed press→settle readout (1623ms 3-slot; 1653ms 4-slot); neither shows any
cyan wash, barbell, or bloom; the orange body beside the capsule in both is the drifting ferry
— the exact confound VERIFIED itself warns about for `f5-idle.png`, reproduced in its own
evidence row ("wash=1 during early travel", "capsule re-formed with the bloom still hot beside
it" — neither is in the pixels). Consequences: (a) the blink test was never run in paint
anywhere — the PASS rests on computed-style/geometry samplers that by the notes' own admission
cannot see blend- or filter-annihilated paint (the σ8 class), and the goo layer is precisely
the at-risk construction (an SVG-filtered, plus-lighter-blended layer over a dark scene);
(b) the best-iOS sibling-legibility gate has no paint read — 4.7:1 is an analytic model with
declared constants; (c) goo anatomy (one body spanning ~2.3–2.5 slots mid-travel) is
unobserved. CLOSE: capture the holdable states (charge is holdable by construction —
pointerdown without release; add a debug freeze or a 20× clock-scale toggle for mid-travel and
arrival), on both engines; pixel-sample a sibling label at bloom peak against the analytic
pair; add a ferry-off toggle so no future capture can be confounded; relabel or replace the two
mislabeled PNGs.

**G3 — U2's perceptual and compositing claims are unverified on any engine; the medium panel
has no capture at all.** The rest/mid-relax screenshot pair (blur decays by opacity only, no
radius pump) and the re-raster trace are both open; the held featureless scrim — the family's
signature state — has no paint artifact; the Chrome-side pair was skipped without being named
in "Not verified here". The U2 PASS row is wall-clock transition timing only. CLOSE: the pair +
a performance trace across open/close on both engines + a held-state capture.

**G4 — The moving-backdrop cost is resolved only for H3; H1/H2 silently re-pay it.** R1's
"the expensive moving backdrop re-sample never happens — resolved by architecture" is scoped to
the lens. Dock-to-card growth and overpull animate a live backdrop-sampling body
(translate/scale on container glass for ~600ms of every gesture) — exactly the per-frame
backdrop re-sample the family celebrates avoiding, now on the largest surface. No unknown row
prices it; WebKit's behavior for animated transforms over `backdrop-filter` (sample alignment,
re-raster) is unprobed. CLOSE: add the U-row; paint/perf-probe an animated-scale glass body
over a live scene on Safari; if red, state the mitigation or hand the cost to the physics
family's boundary explicitly.

**G5 — PRM invariant violated in the observed artifact.** The seat measured: commit deferred
~250ms by the charge floor (capsule jumps at ~270ms, not instantly) and the charge light RAMPS
0.23→1.0 over ~250ms — animated opacity, not "charge surviving as a non-motion state". The
cross-family invariant demands zero in-between frames. The fix is prescribed in PROBE-NOTES but
not applied. CLOSE: a PRM branch seating charge+commit in one style flip; re-verify with an
in-between-frame check.

**G6 — Harness defects contaminate the cited readouts.** Found by the seat, still unfixed:
flick-from-closed records interrupt floor 0.00 FAIL; the cliff cell displays the relax duration
after a close (cell reuse); a pointerdown with no click runs a phantom full cycle that writes
into press→settle with wrong slot accounting. Evidence quoted from these cells inherits the
contamination. CLOSE: patch the page (guard flick when closed; separate cells; make the
abandoned-press path discharge, not commit), re-run, re-capture.

**G7 — The U1 probe under-covers the shipped syntax.** `glass-refract.css`'s actual value is a
data-URI `url("data:…#glass-refract")` behind a fragment-form `@supports`; the prototype probes
the fragment form only (`url(#f5-u1probe)` in both the gate and the chips). Safari may diverge
between fragment and data-URI url() forms at parse or paint — the probe could exonerate the
gate while the shipped value still dies. CLOSE: add a chip D carrying an inline data-URI filter
value in the shipped form, plus its own `@supports` readout.

**G8 — Spec/prototype drift and missing contract artifacts.** (a) SPEC-F5 §1 mandates
`isolation: isolate` on the light layer; the prototype omits it and VERIFIED checked `contain`
but not isolation — reconcile (mandate and add, or strike with a reason). (b) The z/DOM
contract against arbitrary consumer content (the research digest's own §6 shape) is absent from
the spec — z 1/2/3/4 lives only hard-coded in the prototype. (c) "Effect-free ancestor
(enumerated, lintable)" names no lint/probe artifact for pass 2. (d) The medium's "one writer
per region" names no writer-contract mechanism. CLOSE: one spec revision carrying all four.

**G9 — Deferred unknowns, open by design but open.** U4 positional hue sampling (design
decision pending: hint token vs sampled swatch); U5 concurrent-blur budget trace on a CC-like
screen; U6 progressive-blur ladder inside budget; the F1/F3 light-clock boundary (who drives
the barbell's charge/hold states — joint round-2 call with F3's U11). CLOSE: pass-2 items as
scoped; the boundary call needs an owner named at agglomeration.

**G10 — Metrology nits.** The "120 backdrop-filter declarations across 54 files" count does not
reproduce under any obvious cut of the current tree (unprefixed declarations 58; total mentions
133 across 62 files; the -webkit- count 9 is exact) — state the cut or re-measure. "Zero
per-component DOM additions" (SPEC §1) overstates: light hosts (~4 components) and per-region
mediums do add elements — bounded, but nonzero; say bounded. The analytic contrast constants
(scene L≈.10, additive plus-lighter) are uncalibrated against any paint sample — calibrate once
against a pixel read (folds into G2). CLOSE: three small edits plus the G2 calibration.

## Failure-mode checklist, disposed

- Vacuous convergence: not vacuous — the claims are concrete and measured; but the PASS table
  overstates what was measured (G2, G3).
- Spec-cites-itself: no — external citations check out where checkable; kin claims reproduce.
- Gates that cannot fail: the continuity monitor (≥0.35 on computed style) is close to one —
  it trivially reports 1.00 in the dry-run and cannot see paint annihilation; the notes admit
  this, and the paint-true gate it defers to was not run (G2).
- Elegant-reduction trap: present once — the H3 "resolved by architecture" elides that H1/H2
  still pay the moving-sample cost (G4).
- Legacy aliases: none found.
- Masked fallbacks: none — Arm B degrades visibly; refraction stays a garnish; the U1 gate is
  under test rather than papered over.
- Unverified gestalt: the Safari half of every paint claim (G1); the transient choreography in
  paint (G2).
- Consumer-less substrate: passes — tabs/dock/pager-dots/toggle-group exist in-tree.
- Safari claims without version-cited evidence: the research table is version-cited; the
  prototype's Safari claims are correctly marked open — but then the family cannot be called
  proven (G1).
- Prototype dishonesty: the dishonesty ledger is good; the mislabeled captures (G2) are the one
  place the evidence says more than the pixels do.

## Convergence

**55%.** The architecture argument, the research grounding, and the prototype's mechanics are
real and verified against the tree; Chrome-side U1/U3 and the state machine are genuinely
proven. But the family's riskiest claim has no paint proof of any transient state on any
engine, Safari — the engine the floor is named for — was never driven, two evidence captures
mislabel rest as travel/arrival, the medium's signature state has no artifact, and one spec
hole (G4) touches two of the six hallmarks. Zero of that is elegance-discountable.
