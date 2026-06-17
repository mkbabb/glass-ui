# BB.W-CARD-PAD — the enrolled card-surface roster (`proof:card-padding` C4)

The golden sqrt-φ/φ padding ladder is applied EXACTLY at the Card-family seam (the
`--card-pad-*` tokens minted on `Card.vue`'s root, consumed by
`CardHeader`/`CardContent`/`CardFooter`). The P0 screenshot surface is
`/display/card`; this roster enumerates every `<Card>` site on that route and its
disposition. `proof:card-padding` C4 reads this file: an enrolled card carrying an
ad-hoc `p-N` Tailwind literal REDS unless it is on the ALLOWLIST below.

## The ladder (the single anchor + the four φ-derived rungs)

| token                     | value                                   | role                                                              |
| ------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| `--card-pad-inline`       | `--spacing(6)` = 24px (sm: 16px)        | the ANCHOR — the preserved side margin; the ONE knob that retunes |
| `--card-pad-block`        | `calc(var(--card-pad-inline) * 1.272)`  | ~30.5px — the sqrt-φ-lifted top/bottom (heading clears the edge)  |
| `--card-pad-section-gap`  | `var(--card-pad-block)`                 | ~30.5px — the SINGLE interior header→content breath (no 48px dbl) |
| `--card-pad-footer`       | `calc(var(--card-pad-block) / 1.618)`   | ~18.9px — the φ-stepped footer settling cadence                   |
| `--card-pad-title-gap`    | `calc(var(--card-pad-inline) / 2.618)`  | ~9.2px — the φ²-tight intra-header gap (replaces gap-y-1.5)        |

The sqrt-φ (1.272) / φ (1.618) / φ² (2.618) constants are EXPRESSED in the calc
chains on `Card.vue` — never a flat resolved-rem rebake (a rebake REDS C1's
self-test bite).

## The Card family axis split (C3)

- `CardHeader` — `px-(--card-pad-inline) pt-(--card-pad-block) pb-0` (the sqrt-φ top
  lift + a zeroed block-end so the interior gap is owned solely by CardContent) +
  `gap-y-(--card-pad-title-gap)`.
- `CardContent` — `px-(--card-pad-inline) pt-(--card-pad-section-gap) pb-(--card-pad-block)`.
- `CardFooter` — `px-(--card-pad-inline) pt-(--card-pad-footer) pb-(--card-pad-block)`.

A UNIFORM `p-(--card-pad-*)` on Header/Content/Footer would re-introduce the 1:1 axis
defect — C3 REDS it.

## The enrolled `/display/card` surfaces

Every `<Card>` (and Card-family subcomponent) on the route inherits the ladder
automatically through the family seam (NO per-site edit) EXCEPT the off-system
bypasses collapsed below.

| site (demo/stories/display/card.vue)             | disposition                                                 |
| ------------------------------------------------ | ----------------------------------------------------------- |
| the 5-rung tier matrix `<Card v-for>`            | inherits the ladder (Header/Content) — no edit              |
| the polymorphic `<Card as="article">`            | inherits the ladder (Header/Content/Footer) — no edit       |
| the outer nested `<Card tier="resting">`         | inherits the ladder — no edit                               |
| the inner nested `<Card tier="wash">`            | `p-4 text-sm` → `text-sm` (the ad-hoc pad dropped)          |
| the cartoon-accent grid `<Card v-for>`           | `p-6` → `p-(--card-pad-inline)`                             |
| the cartoon header `<Card surface="cartoon">`    | `p-6` → `p-(--card-pad-inline)`; its `<CardHeader p-0>` workaround DROPPED (uses the token) |
| the veil HERO `<Card surface="veil">`            | `p-8` → `p-(--card-pad-block)`                              |
| the veil CLOSER `<Card surface="veil">`          | `p-6` → `p-(--card-pad-inline)`                             |
| the CardAction `<Card tier="resting">`           | inherits the ladder — no edit                               |

## ALLOWLIST — the recorded exceptions (NOT a C4 violation)

These three carry an ad-hoc literal BY DESIGN; C4 exempts them by exact line-shape:

1. **The scroll-shrink Card root** keeps `p-0` — the scroll-port architecture: the
   `.card-scroll-host` Card is a flush scroll container whose padding lives on the
   sticky `<CardHeader>` + the `<CardContent>`, not the host. (Its `<CardHeader>` IS
   re-pointed to the sqrt-φ ladder: `px-(--card-pad-inline) pt-(--card-pad-block)
   pb-0`.)
2. **The two raw scroll-pane cards** keep `p-4` — a deliberate TIGHT-PANE choice: a
   dense scrollable result list reads better at the tighter inset than the
   comfortable card rung (the retired `<ScrollPane>` recipe shipped at `p-4`).

These are the ONLY ad-hoc card pads on the route. The layout `<div>`s that carry
`p-6`/`p-10`/`p-16` (the aurora-staging + veil-staging wrappers) are NOT cards — they
are positioning containers and are out of C4 scope.
