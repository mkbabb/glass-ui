# BI.W-P019 — Proportional editorial type pair

**Status:** IMPLEMENTED — NATIVE VISUAL REVIEW PENDING
**Terminal owner:** glass-ui

## Product contract

- `--type-proportional-headline-size` is the pair's one fluid size authority.
- `--type-proportional-kicker-size` derives from it at exactly `1/√φ`
  (`0.7861513777574233`) across the clamp floor, fluid arm, and ceiling.
- Both utilities use `--type-proportional-leading`, the same unitless leading, so
  their computed pixel line heights preserve the size ratio.
- `.text-proportional-headline` and `.text-proportional-kicker` set only size and
  line-height. Font family, weight, and tracking remain consumer decisions.
- The existing display ladder, font assets, range subsets, and metric fallbacks stay
  intact.

## Implementation

- `src/styles/typography/scale.css` owns the four proportional tokens.
- `src/styles/typography/semantic.css` owns the two semantic utilities.
- `/foundations/typography` shows one serif/mono consumer composition, demonstrating
  that the geometry remains independent of type voice.
- `tests/styles/typography.test.ts` checks only the single-source derivation — the exact
  `1/√φ` ratio, headline = `var(--type-display-2)`, kicker = `calc(headline * ratio)`, and
  `--type-proportional-leading: 1` — by reading `scale.css`. Shared-leading application
  across both utilities, family neutrality, and the live specimen are NOT asserted by this
  test; they are covered only by the native in-app review below.

## Acceptance

- Focused typography tests and source typecheck are green.
- Native in-app Browser review checks the specimen at 390px (floor), 768px (fluid),
  and 1440px (ceiling). At each width, computed kicker/headline font-size and
  line-height ratios must equal `0.7861513777574233` within `0.5 CSS px`.
- No Playwright suite or tranche-specific gate is added.
