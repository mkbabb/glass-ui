# BB.W-CARD-PAD — the golden sqrt-φ/φ card padding DELTA

## The diagnosis (HEAD)

At HEAD every Card section was a uniform `p-(--card-spacing)` = **24px on ALL four
sides** (axis ratio 1:1 — NO golden relationship). Two visible defects fell out of the
uniform pad:

1. **The heading HUGGED the top edge.** Because the top pad equalled the side pad
   (24px == 24px), the CardTitle sat the same distance from the top as from the side —
   it read as cramped against the border.
2. **The header→content gap was a 48px DOUBLE-PAD artifact.** `CardHeader` ended with
   `pb-24` and `CardContent` began with `pt-24`, so the interior breath between the
   header and the body was the SUM (~48px) — a yawning gap with no proportional logic.

## The fix — the golden ladder (token-first, calc-expressed)

ONE anchor (`--card-pad-inline` = `--spacing(6)` = 24px; `data-size=sm` → 16px) drives
four φ-derived rungs. The sqrt-φ (1.272) / φ (1.618) / φ² (2.618) constants are
EXPRESSED in the calc() chains on `Card.vue` — never a flat resolved-rem rebake:

| token                    | calc                                    | ≈ value | role                                       |
| ------------------------ | --------------------------------------- | ------- | ------------------------------------------ |
| `--card-pad-inline`      | `--spacing(6)` (sm: `--spacing(4)`)     | 24px    | the ANCHOR (preserved side margin)         |
| `--card-pad-block`       | `calc(var(--card-pad-inline) * 1.272)`  | 30.5px  | sqrt-φ-lifted top/bottom (heading clears)  |
| `--card-pad-section-gap` | `var(--card-pad-block)`                 | 30.5px  | the SINGLE interior header→content breath  |
| `--card-pad-footer`      | `calc(var(--card-pad-block) / 1.618)`   | 18.9px  | φ-stepped footer settling cadence          |
| `--card-pad-title-gap`   | `calc(var(--card-pad-inline) / 2.618)`  | 9.2px   | φ²-tight intra-header gap (was gap-y-1.5)  |

### The axis split (the family consumes the ladder)

- `CardHeader` → `gap-y-(--card-pad-title-gap) px-(--card-pad-inline) pt-(--card-pad-block) pb-0`
  — the sqrt-φ top lift PLUS a ZEROED block-end so the interior gap is owned solely by
  CardContent (this kills the 48px double-pad: the header no longer contributes pb).
- `CardContent` → `px-(--card-pad-inline) pt-(--card-pad-section-gap) pb-(--card-pad-block)`
  — the section-gap is the SINGLE interior breath; the bottom rounds out at block.
- `CardFooter` → `px-(--card-pad-inline) pt-(--card-pad-footer) pb-(--card-pad-block)`
  — the footer gap steps down by φ for a settling cadence.

## The clean break

`--card-spacing` is GONE — no alias. Every consumer re-points. The dead orphan
`--panel-padding-roomy` (zero `var()` readers — the prose-popover register it claimed
to back never read it) is deleted from `src/styles/tokens/offsets.css` (NOTE: the
declared bounds named `sizing.css`, but the W-CARVE3 carve placed the token in
`offsets.css` — the §0 RE-GROUND drift, recorded).

## The painted truth (the π gestalt, both modes)

`tests-visual/card-padding.spec.ts` is the binding readback on `/display/card`:

- **P1** — the first CardHeader resolves `paddingTop/paddingLeft ≈ 1.272` (±0.04),
  `paddingLeft == paddingRight`, `paddingTop > paddingLeft`, `paddingBottom ≈ 0`.
- **P2** — the CardTitle top clears the Card top by ≥ block (~30.5px) — the heading no
  longer hugs the border.
- **P3** — the header→content interior gap ≈ section-gap (~30.5px), NOT ~48px.
- **P5** — the scroll-shrink sticky header gains the sqrt-φ top lift.
- **P6** — the overlay band (Dialog + Popover) resolves the same sqrt-φ ratio (arm 2,
  verified at the consolidated π once the overlay band merges).
- **P7** — both light + dark.

## The gate

`scripts/proof-card-padding.mjs` (`proof:card-padding`, tag `ci`) — born-RED at HEAD
(C1-C4 all RED on the uniform-pad tree, verified against `git show HEAD:` content),
GREEN after the Card-family edits. C5/C6 stay RED until the orchestrator merges arm 2's
overlay band (at capture: the overlay tokens are already minted on Dialog/Popover/
HoverCard/Toast — only Sheet is pending, so C5 reads "missing: sheet"). C7 self-test
bites: a flat-rem rebake reds C1, a re-introduced `--card-spacing` reds C2, a uniform
`p-(--card-pad-*)` reds C3, an ad-hoc `p-N` on a non-allowlisted demo card reds C4.

## Allowlisted exceptions (the roster)

`card-padding-roster.md` records the three deliberate ad-hoc pads C4 exempts: the
scroll-shrink Card-root `p-0` (the scroll-port architecture) and the two raw scroll-pane
cards `p-4` (a tight-pane choice). The layout `<div>` wrappers carrying `p-6`/`p-10`/
`p-16` are positioning containers, NOT cards, and are out of C4 scope.
