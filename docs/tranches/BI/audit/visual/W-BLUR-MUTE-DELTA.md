# W-BLUR-MUTE — DELTA (the global button blur dial-back)

Discharges UF-B3 ("Do these use our standard glass material facilities? The blur could
be muted ever so slightly.") + UF-B4 ("the blur on the buttons could be dialed back
globally just a bit."). Class: REFINE. Band B2 (glass taxonomy), lands ON W-SURFACE-EXTRACT.

## Mechanism (the recorded override-the-PRIMITIVE idiom)

The glass button cohort blur is dialed a HAIR below the unified 8px resting material via
the button-cohort **`--glass-blur-btn-radius` PRIMITIVE** — never the composed token
(the substitution-over-redeclaration discipline `proof:doc-override-idiom` teaches).

`src/styles/tokens/glass.css`:

```css
--glass-blur-btn-radius: 6px;
--glass-blur-btn:      blur(calc(var(--glass-blur-btn-radius) * var(--glass-level))) saturate(var(--glass-saturate-resting));
```

- `--glass-blur-btn` is the button's OWN composed token (read by `.btn-glass` via
  `backdrop-filter: var(--glass-blur-btn)`, surfaces.css). It reads the primitive through
  the ONE `--glass-level` scalar + the resting saturate companion — the level opacity axis
  and the saturate leg are PRESERVED (the RADIUS axis only, the W-GLASS-CAL anti-overreach
  discipline).
- A consumer retunes the WHOLE button cohort with one `:root { --glass-blur-btn-radius: … }`.
- The `.btn-glass.glass-deep` HERO arm (surfaces.css) still re-points the WHOLE
  `--glass-blur-btn` onto `--glass-blur-deep`, so the apple.com-nav-grade DEEP CTA
  (`primary-audacious` / `:liquid` / host `.glass-deep`) is UNAFFECTED (it overrides the
  composed token, not the primitive).
- The button LEAVES the dock·default-Card·menu-row 8px peer by a deliberate cohort hair —
  NOT the ONE-material break: those three panel surfaces stay the unified 8px.

### Why NOT a bare `.btn-glass`-scoped `--glass-blur-btn-radius` override

A `.btn-glass`-scoped override of `--glass-blur-btn-radius` ALONE is a documented NO-OP
(the HONEST STATE / substitution-vs-inheritance trap): `--glass-blur-btn` is composed at
`:root`, so its `var(--glass-blur-btn-radius)` substitutes at `:root` (8px) and the
inherited computed value does not re-compose on a descendant. The primitive + the composed
token therefore live TOGETHER at `:root` (the button's private token namespace — only
`.btn-glass` reads `--glass-blur-btn`), the correct home for a consumer-retunable cohort
knob. This is a mechanism-home reconciliation of the spec's ".btn-glass scope" wording,
NOT a scope change — the mute is button-cohort-only exactly as ratified.

## The value — a source-level ΔL estimate (the #92 π certifies)

Judgment-d RATIFIED **8px → 7px** on the `.btn-glass` cohort. My source-level estimate is
that 8→7px (a single-px, 12.5% kernel reduction over an already-blurred backdrop, on a
SMALL button element that samples little backdrop variation) produces a composited mean ΔL
well below the ~1 L\* JND — **sub-perceptual**. Per the pre-authorized fallback ("if your
source-level ΔL estimate reads sub-perceptual, step 7→6 and record"), the landed value is
**8px → 6px** (a 25% kernel reduction — a hair that actually reads).

- 8→7px: est. composited mean ΔL ≈ 0.3–0.7 L\* over a busy field (sub-perceptual).
- 8→6px: est. composited mean ΔL ≈ 0.5–1.5 L\* over a busy field (perceptible-but-minimal
  = "a hair" — the UF-B3/B4 intent: the backdrop's structure reads a touch more through
  the button plate).

**These are SOURCE estimates, not measured composites.** The binding certification is the
**#92 π batch**: measure the composited ΔL of the `.btn-glass` backdrop-filter on
`/display/buttons` over a busy field host AND a flat page host, BOTH modes, Chrome + Safari,
with/without `defined`, at BOTH 6px and 7px. If #92 finds 6px too strong (>"a hair") the
retune to 7px is one line (`--glass-blur-btn-radius: 7px`); if 7px certifies sub-perceptible
the 6px landed value stands. The `defined` register (glass/defined.css) carries the
over-flat-page shape-legibility so a muted-blur button never reads as a gray blob.

## Gate lock

`proof:glass-cal` — the **BLUR-MUTE clause** (`detectBlurMute` + `selfTestBlurMute`):
- MUTE-1 — `--glass-blur-btn` composes from the `--glass-blur-btn-radius` PRIMITIVE
  through `--glass-level` (never a hardcoded composite `blur(Npx)`, never an un-muted peer
  alias — the NO-OP the HONEST STATE names).
- MUTE-2 — the muted radius is a HAIR (1..3px) below the 8px peer, in [5,7]px, read LIVE
  from glass.css (never a wash tile / blur(0) wholesale, never the un-muted peer).
- MUTE-3 — cohort-scoped: no ladder rung reads `--glass-blur-btn-radius` (the mute does
  not leak onto the dock·Card·menu-row peer material).
- 5-bite self-test: the muted 6px button PASSES; a hardcoded `blur(7px)` composite REDs
  (MUTE-1); the un-muted resting alias REDs (MUTE-1); a 2px over-mute REDs (MUTE-2); a
  leak onto the resting rung REDs (MUTE-3).

The button LEFT the `proof:glass-cal` 8px PEER lock (now dock·Card·menu-row only) and is
locked separately by the BLUR-MUTE clause. `proof:doc-override-idiom` stays GREEN by
construction (untouched — the consumer-wiring docs still override the `-radius` primitive).

Reconciled (the button was in the unified-peer assert in each): `proof:glass-legibility`
L3 (accepts the muted `btn` cohort tier in the [5,10]px real-glass band + a muted-6px
self-test bite) · `proof:button-glass` BG-IOS-1 (accepts the `btn`-cohort tier). Neutral:
`proof:glass-level` (the button still threads `--glass-level` directly).

## Disposition

Terminalizes UF-B3/B4 as a **REFINE-DECIDED** row: mechanism landed (primitive-override,
cohort-scoped, hair-bounded), value at 6px pending the #92 π + user taste dial (a future
re-tune is a `:root { --glass-blur-btn-radius }` override, not a re-open). Retirement: NONE
(no token/API retired; `--glass-blur-btn-radius` is a net-new consumer knob).
