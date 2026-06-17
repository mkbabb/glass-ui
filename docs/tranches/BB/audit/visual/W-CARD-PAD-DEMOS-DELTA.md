# W-CARD-PAD — Arm 3: the demo bypasses re-pointed onto the golden ladder (P2)

## The defect

The 5 named composition demos ran a PARALLEL, ad-hoc `--density-pad`/`--density-gap`
density axis baked into arbitrary Tailwind values of the shape
`p-[calc(Nrem + var(--density-pad,0rem))]`. The static `Nrem` base BYPASSED the
token system entirely: the demo padding was a hand-picked rem literal (`1.5rem`,
`2rem`, `2.5rem`, …) the density override layered on TOP of, so retuning the
library's golden card ladder (the ONE `--card-pad-inline` knob) would NOT have
reached these surfaces. The density axis was REPLACING the base instead of
composing ON TOP of it.

## The fix — the density axis composes ON TOP of the golden base

Re-point each card-like surface's static base off the rem literal and onto the
golden ladder token (minted by Arm 1 on the `<Card>` root,
`Card.vue:179` — `[--card-pad-inline:--spacing(6)]` + the sqrt-φ/φ/φ² calc
chain). The density override KEEPS its additive role:
`p-[calc(Nrem + var(--density-pad,0rem))]` → `p-[calc(var(--card-pad-TOKEN) + var(--density-pad,0rem))]`.
The golden value retunes from the ONE knob; the density axis still layers on top.

## Per-file ledger (re-grounded at HEAD `6b0ba06f`)

The prompt-cited line numbers DRIFTED (the eyebrow wave + W-CARVE3 moved offsets);
every line was re-grepped at HEAD before editing.

| File | Line(s) @HEAD | Surface | Verdict | Re-point |
|------|---------------|---------|---------|----------|
| `settings.vue` | 85, 119, 213, 251 | 4× `<CardContent>` inside `<Card>` | RE-POINT | `p-[calc(1.5rem + …)]` → `p-[calc(var(--card-pad-inline) + var(--density-pad,0rem))]` |
| `empty-states.vue` | 130 | `<CardContent>` inside `<Card>` (near-golden) | RE-POINT (made EXACT sqrt-φ) | `px-[calc(1.5rem + …)] py-[calc(2.5rem + …)]` → `px-[calc(var(--card-pad-inline) + …)] py-[calc(var(--card-pad-block) + …)]` |
| `hero.vue` | 189 | claim cells inside `<Card><CardContent grid p-0>` | RE-POINT | `p-[calc(2rem + …)]` → `p-[calc(var(--card-pad-block) + var(--density-pad,0rem))]` |
| `auth-shell.vue` | 110 | form panel `bg-card/70` — card-like but NOT a `<Card>` | RE-POINT (with golden calc fallback) | `p-[calc(2.5rem + …)]` → `p-[calc(var(--card-pad-block,calc(--spacing(6) * 1.272)) + var(--density-pad,0rem))]` |
| `auth-shell.vue` | 53 | `.auth-brand-panel` — Aurora-over-glass painterly TILE | **LEAVE** (glass tile divergence) | unchanged `p-[calc(2.5rem + …)]` |
| `intro.vue` | 87 | `glass-resting` RouterLink TILE (no `bg-card` plate) | **LEAVE** (glass tile divergence) | unchanged `p-[calc(1.25rem + …)]` |

settings.vue carried **4** CardContent overrides (the prompt named "4"); the 4th
(line 251, Accessibility section) was found by full re-grep — all 4 share the
identical `p-[calc(1.5rem + var(--density-pad,0rem))]` padding token, so the
re-point was a single `replace_all` on that exact substring (the `gap-x`/`gap-y`
rhythm strings differ but were left untouched — see the gap-axis note below).

## The two divergences (glass TILE, NOT a content card — LEFT per the prompt rule)

1. **`auth-shell.vue:53` — `.auth-brand-panel`.** This panel paints a
   purple→tomato `<Aurora>` BEHIND its translucent content (the brand side reads
   as glass-over-painterly); the `.auth-brand-panel` style block (`:207`) only
   re-declares the `--foreground`/`--muted-foreground`/`--card-foreground` ink
   for AA over the aurora — there is **no `bg-card` plate**. It is a glass/painterly
   tile, not a content card. The golden CARD ladder is the wrong register here, so
   the `2.5rem`/`3.5rem` painterly inset is LEFT verbatim.
2. **`intro.vue:87` — the category RouterLink tiles.** `glass-resting
   paper-grain-overlay … rounded-card` — a GLASS tier surface (the 5-rung
   `--glass-*` ladder), not the opaque `bg-card` content plate. A glass tile's
   inset is a glass-register choice, not a card-section padding rung; LEFT verbatim.

## Two house-discipline notes

- **The cross-arm inheritance boundary + the calc fallback (auth-shell:110).**
  Arm 1 mints the golden ladder ON THE `<Card>` ROOT (`Card.vue:179`), NOT at
  `:root`. CSS customs inherit, so the in-`<Card>` surfaces
  (settings/empty-states/hero) resolve `var(--card-pad-*)` directly by
  inheritance. The auth-shell form panel (`:110`) is a bare `<div bg-card/70>`
  OUTSIDE any `<Card>` subtree — a bare `var(--card-pad-block)` would be
  UNDEFINED there and collapse the `calc()` to 0 (a padding regression). It
  therefore carries a `var(--card-pad-block, calc(--spacing(6) * 1.272))`
  fallback: it tracks the token when nested in a Card subtree, and otherwise
  resolves the SAME sqrt-φ golden value (~30.5px) from the EXPRESSED constants.
  The fallback EXPRESSES `--spacing(6) * 1.272` — it is NOT a flat resolved-rem
  rebake (house discipline preserved).

- **The `--density-gap` (interior rhythm) axis was LEFT untouched.** The golden
  ladder defines interior breath via `--card-pad-section-gap`/`-title-gap`/
  `-footer` on the Card's OWN header→content→footer structure. The demos'
  `gap-[calc(Nrem + var(--density-gap,0rem))]` flex/grid gaps are arbitrary
  interior layout rhythm with no golden-ladder equivalent rung, and the prompt
  scoped Arm 3 to the PADDING (`--density-pad`) base re-point only. Re-pointing
  the gap axis is out of bounds and was not done.

## Verification

- `npm run typecheck` — GREEN (exit 0; `vue-tsc --noEmit` + test tsconfig).
- The consolidated build + the binding π capture (whole-page padding readback,
  both modes) is owned by the orchestrator's single build + W-REFLECT capture;
  this arm edits only the 5 demo composition files + this DELTA.

## Bounds touched (DISJOINT from sibling arms)

- `demo/stories/compositions/settings.vue`
- `demo/stories/compositions/empty-states.vue`
- `demo/stories/compositions/hero.vue`
- `demo/stories/compositions/auth-shell.vue`
- `demo/stories/foundations/intro.vue`
- `docs/tranches/BB/audit/visual/W-CARD-PAD-DEMOS-DELTA.md` (this file, CREATE)
