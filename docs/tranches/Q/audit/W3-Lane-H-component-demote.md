# Q.W3 Lane H — component DEMOTE: retire `<ScrollPane>` + `<CartoonCard>` to Card recipes

## Charter

`<ScrollPane>` (`src/components/ui/scroll-pane/`, 43 LOC, 1 own prop) and
`<CartoonCard>` (`src/components/ui/cartoon-card/`, 36 LOC, 0 own props) are both
100% styling-only wrappers — zero behaviour, zero four-state contract, **1 consumer
each** (their own demo story). Both fail L invariant 8 (substrate ships only with
≥ 2 consumers, or retires with rationale). They were lifted out of Card's `variant`
enum together at `3a43a8f`/`e017d53`; per the Qπ and Qχ adjudications they retire
together at Q.W3.

- **Qπ** (`research/Qpi-scrollpane-architecture-adjudication.md`) — DEMOTE-TO-VARIANT.
  ScrollPane is field-for-field `<Card tier="wash" :grain="false">` + two static
  utilities; `wash` IS a ladder rung Card already exposes. No new component, no new
  prop — purely a recipe.
- **Qχ** (`research/Qchi-cartooncard-architecture-adjudication.md`) — DEMOTE-TO-VARIANT.
  Cartoon is off the *opacity-monotonic ladder* but its advertised `--glass-{bg,
  blur,border}-cartoon` tokens were never defined — it falls through to the `quiet`
  rung. Its real delta is three orthogonal decorations (2px border, offset-stamp
  shadow, hover-lift). Folds into Card as a new **orthogonal `surface` prop** (Shape
  B), NOT a `tier` rung (Shape A — rejected: would force/override sibling props).

## H.2 — Card gains the orthogonal `surface` prop

`src/components/ui/card/Card.vue`:

```ts
export type CardSurface = "glass" | "cartoon";

interface Props extends PrimitiveProps {
    tier?: CardTier;
    surface?: CardSurface;   // NEW — default "glass"
    shadow?: boolean;
    grain?: boolean;
    class?: HTMLAttributes["class"];
}
```

`surface` is orthogonal to `tier`/`shadow`/`grain` — exactly as `shadow` and
`grain` are. It is NOT a `tier` rung (Qχ §3 Shape A: a `tier="cartoon"` would have
to force `shadow` and suppress `grain`, the same API-corruption Qξ rejected for
`pane`). Card has no CVA — `surface` is a plain `defineProps` member resolved by a
class-binding:

```ts
cn(
    'rounded-card text-card-foreground scrollbar-hidden',
    `glass-${tier}`,
    surface === 'cartoon' && 'cartoon-surface',
    shadow && surface === 'glass' && 'shadow-[var(--shadow-card)]',
    !grain && '[&::after]:hidden',
    props.class,
)
```

`surface="cartoon"` layers the `@utility cartoon-surface` decoration (landed by the
sibling W3 Lane B in `src/styles/cards.css` — 2px border, offset-stamp shadow,
hover-lift) on top of the resolved `glass-${tier}` class. The `--shadow-card` drop
shadow is suppressed when `surface="cartoon"` (`shadow && surface === 'glass'`
guard) so the two shadows do not stack — `cartoon-surface` carries its own
offset-stamp `box-shadow`. `:data-surface="surface"` joins `:data-tier`/`:data-grain`
on the root for consumer/test targeting.

`CardSurface` is exported from `card/index.ts` (next to `CardTier`) and added to the
`@mkbabb/glass-ui/api` discovery layer's surface-enum block (next to `CardTier`).

## H.1 — `<ScrollPane>` → Card recipe (no new component)

ScrollPane is field-for-field `<Card tier="wash" :grain="false">` + `overflow-auto`
+ `transition-shadow` — all consumer-side `class` content. Card already emits
`scrollbar-hidden` unconditionally. **Nothing to add for H.1** — it is purely the
retirement (H.3) plus the demo-story fold. The canonical recipe:

```vue
<Card tier="wash" :grain="false" tabindex="0" class="overflow-auto max-h-80 p-4">
```

## H.3 — joint retirement (clean break, no aliases)

### Files deleted (filesystem `rm -rf`, not `git rm`)

- `src/components/ui/scroll-pane/` (`ScrollPane.vue` + `index.ts`)
- `src/components/ui/cartoon-card/` (`CartoonCard.vue` + `index.ts`)
- `demo/stories/primitives/scroll-pane.vue`
- `demo/stories/primitives/cartoon-card.vue`

The W2 Lane A `useStalePropWarning("ScrollPane"|"CartoonCard")` calls vanish with
the dir deletion. The shared `_shared/useStalePropWarning.ts` composable STAYS —
Card still uses it. Its header comment + the `variant` recipe string were updated:
`(variant="cartoon" → use <CartoonCard>)` → `(variant="cartoon" → surface="cartoon")`.

### Barrels

- `src/components/ui/index.ts` — removed `export * from "./scroll-pane"` + `"./cartoon-card"`.
- `src/index.ts` — removed `export * from "./components/ui/scroll-pane"` + `"./cartoon-card"`.

### Subpaths

`package.json` had **no** `/scroll-pane` or `/cartoon-card` subpath in `exports` or
`typesVersions` — both components were root-barrel-only. Nothing to retire there.
`grep 'scroll-pane\|cartoon-card' package.json` returns nothing (confirmed).

### Demo-story fold + a11y fix

Both stories folded into `demo/stories/primitives/card.vue`:

- A **"surface — the cartoon decoration"** section: a 3-up grid of
  `<Card tier="quiet" surface="cartoon">` (the faithful legacy CartoonCard tier per
  Qχ §2b) plus a default-tier `<Card surface="cartoon">` proving `surface` composes
  onto any tier.
- A **"recipe — scroll-pane surface"** section: `<Card tier="wash" :grain="false"
  tabindex="0" class="overflow-auto max-h-80 p-4">` and a nested `:shadow="false"`
  variant.

**a11y fix carried forward**: Qπ §3 flagged that ScrollPane shipped a latent a11y
regression — `scrollbar-hidden` + `overflow-auto` with NO `tabindex` is a scroll
container that cannot be scrolled by keyboard and exposes no scrollbar. The folded
Card recipe names `tabindex="0"` on every scroll region — the retirement FIXES the
bug the standalone component shipped.

`demo/stories/manifest.ts` — the two standalone story entries (`scroll-pane`,
`cartoon-card`) removed; the `card` entry blurb updated to name the `surface=cartoon`
decoration and the scroll-pane recipe.

### Doc edits

- `CLAUDE.md` — `ui/` dir count `44 → 42 dirs total`; "43 shadcn-vue base component
  packages" → "41"; the `scroll-pane/` and `cartoon-card/` dir lines removed.
- `src/styles/index.css` — the stale cascade-comment `7. cards.css — .cartoon-card,
  .elevated-card, .paper-texture` corrected to `.cartoon-surface, .paper-texture`
  (`.cartoon-card`/`.elevated-card` were removed at C.W5).
- `src/styles/tokens.css` — the `--shadow-card` comment pointing consumers at
  `<CartoonCard>` / `.glass-cartoon` retargeted to `<Card surface="cartoon">` +
  `.cartoon-surface`.

## Test added

`src/components/ui/card/__tests__/Card.test.ts`:

- The `ScrollPane`/`CartoonCard` imports + the two stale-prop tests that mounted
  those components were removed (the components no longer exist). Card's own
  `variant`/`flush` stale-prop tests stay — Card still uses `useStalePropWarning`.
- Four new `surface` assertions:
  - `surface="glass"` (default) does NOT apply `cartoon-surface`; `data-surface="glass"`.
  - `surface="cartoon"` applies `cartoon-surface`; `data-surface="cartoon"`.
  - `surface="cartoon"` composes onto `tier="floating"` — both `glass-floating` and
    `cartoon-surface` resolve (proves orthogonality).
  - `surface="cartoon"` suppresses the `--shadow-card` drop (the cartoon stamp
    shadow takes over — no stacking).

## Verification

| Gate | Result |
|---|---|
| `grep -rn 'ScrollPane\|CartoonCard' src/` | only 2 prose doc-comment mentions (migration context in `Card.vue` + `Card.test.ts`) — zero live code references, zero imports/exports |
| `grep -rn 'scroll-pane\|cartoon-card' package.json` | nothing — no subpaths existed |
| `npm run typecheck` | GREEN (`vue-tsc --noEmit`) |
| `npx vitest run` | GREEN — 32 files, 379 tests passed |

## Verdict

H.1 + H.2 + H.3 LANDED. Card gains the orthogonal `surface?: "glass" | "cartoon"`
prop (default `"glass"`); `surface="cartoon"` composes the Lane B `cartoon-surface`
decoration utility onto the resolved glass tier. `<ScrollPane>` and `<CartoonCard>`
— two styling-only, sub-2-consumer packages — are retired with a clean break (no
aliases per `feedback_no_backwards_compat`). Both demo stories folded into the Card
story; the scroll-pane recipe FIXES the latent keyboard-scroll a11y regression
ScrollPane shipped. The `ui/` package count drops 43 → 41 (44 → 42 dirs incl.
`_shared`).
