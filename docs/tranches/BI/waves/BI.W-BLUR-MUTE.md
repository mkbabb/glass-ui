# BI.W-BLUR-MUTE — the global button blur dial-back (the user-judgment delta)

Band B2 (glass taxonomy). Lands ON W-SURFACE-EXTRACT. Design: D-GLASS GLASS-A (PASS-1 §5; PASS-4B glass
proto — blur-mute finalized honestly as a measured primitive delta, USER-deferred value).

## §Mandate

Discharges: UF-B3 ("Do these use our standard glass material facilities? The blur could be muted ever so
slightly."), UF-B4 ("the blur on the buttons could be dialed back globally just a bit."). Class: REFINE.

## §Design

Decided mechanism (PASS-1 §5, the recorded CLAUDE.md override idiom): override the
`--glass-blur-*-radius` **PRIMITIVE** on the button cohort (`.btn-glass` scope) — the composite
`--glass-blur-*` reads it through `--glass-level` + saturate; NEVER the composed token directly (the
substitution-over-redeclaration discipline `proof:doc-override-idiom` teaches). Free micro-win: a smaller
kernel is cheaper rasterization on every button.

HONEST STATE (PASS-4B): the naive candidate was a NO-OP (blurA=blurB=blur(8px) — sub-perceptual). A REAL
"hair" delta must produce a measurable ΔL. The exact delta + cohort scope is a TASTE DIAL — USER-GATED,
not gate-forced. The `defined` register already carries over-flat-page shape-legibility so a muted-blur
button never reads as a gray blob.

## §Work

- `src/styles/utilities.css` (or the `.btn-glass` scope) — declare the muted `--glass-blur-*-radius`
  override on the button cohort (the calibrated delta from the π, e.g. resting 8px → ~7px). Scope decision
  (`.btn-glass` only vs all interactive controls) is Open-Gap-9, resolved by the π + the user A/B.
- NO composed-token edit (the `:root` `--glass-blur-*` stays generated).

## §Acceptance

Gate: **`proof:glass-cal`** — a blur-mute clause (the override rides the `-radius` PRIMITIVE, not the
composite; `proof:doc-override-idiom` stays GREEN by construction) + a `.btn-glass` cohort-scope assert.
- NOT born-RED (a calibration refinement — there is no live defect gate; the deciding artifact is the π
  delta + the user judgment). The clause locks the MECHANISM (primitive-override, cohort-scoped), not a
  magic number.
- Self-test bite: a synthetic composite `--glass-blur-resting: blur(7px)` override (the forbidden form) REDs.

## §π/DELTA

**The blur-mute calibration** (Open-Gap-9): the `-radius` primitive delta on the button cohort, measured
LIVE on `/display/buttons` over a busy field host AND a flat page host, BOTH modes, Chrome + Safari,
with/without `defined`. Report the composited ΔL so "a hair" is a NUMBER derived at the primitive.
DELTA: `docs/tranches/BI/audit/visual/W-BLUR-MUTE-DELTA.md`.

## §Obligations

- **USER JUDGMENT (gated):** the exact delta + cohort scope go to the user with the paired A/B capture
  (the recommended value delivered; the decision is the user's — a taste dial). The wave lands the
  mechanism; the number is user-confirmed at the return.

## §Dispositions

- Terminalizes UF-B3/B4 as a **REFINE-DECIDED** row: mechanism landed (primitive-override, cohort-scoped),
  value user-gated. No re-book (a future re-tune is a `:root` override, not a re-open).
