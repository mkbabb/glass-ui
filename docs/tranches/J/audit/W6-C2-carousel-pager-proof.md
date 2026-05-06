# J.W6 Lane C.2 — Carousel pager substrate proof

**Wave**: J.W6 — Data + Composition Refinement
**Lane**: C.2 (Carousel pager substrate primitives)
**Mode**: implementation
**Status**: closed

## Summary

Three substrate primitives at `src/components/ui/carousel/` canonicalise the
chevron + counter + dots affordance set. Both demo carousel stories now
consume the substrate. The hand-rolled basic-pager section in
`navigation/carousel.vue` (R4 §D — "weak by every affordance axis") and the
hand-rolled chevron + counter row at `containers/glass-carousel.vue:127-157`
retire.

## Files added

| Path | LOC |
|---|---:|
| `src/components/ui/carousel/CarouselPager.vue` | 94 |
| `src/components/ui/carousel/CarouselDots.vue` | 78 |
| `src/components/ui/carousel/GlassCarouselPager.vue` | 127 |
| **total new** | **299** |

## Files modified

| Path | LOC delta | Notes |
|---|---:|---|
| `src/components/ui/carousel/index.ts` | +3 | re-export CarouselPager + CarouselDots + GlassCarouselPager |
| `demo/stories/navigation/carousel.vue` | -2 | retire CarouselPrevious/Next imports + hand-rolled dot strip; consume CarouselPager + CarouselDots in both pager sections |
| `demo/stories/containers/glass-carousel.vue` | -22 | retire 24-line hand-rolled chevron + counter + state-toggle row + unused goPrevious/goNext; consume GlassCarouselPager with `#trailing` slot for state-toggle |

`src/index.ts` is unchanged: it re-exports the entire `./components/ui` barrel
via `export * from "./components/ui"`, which itself does `export * from
"./carousel"`. Updates to the carousel barrel propagate automatically.

## API surface

### `<CarouselPager>` (CarouselPager.vue)

Wires to the embla API via `useCarousel()` (must mount inside `<Carousel>`).

**Props**

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `showCounter` | `boolean` | `true` | Render "X / N" counter pill between chevrons. |
| `class` | `HTMLAttributes['class']` | — | Class merge passthrough. |

**Behaviour**

- Composes `<Button variant="ghost" size="icon">` for prev + next chevrons.
- Reads `selectedScrollSnap()` + `scrollSnapList().length` from the embla
  API; subscribes to `select` + `reInit` for live index sync.
- Chevron icon flips horizontal/vertical based on `useCarousel()` orientation
  (ChevronLeft/Right for horizontal; ChevronUp/Down for vertical).
- Counter pill: `rounded-pill border border-border bg-card px-3 py-1
  text-mono-caption tabular-nums`.
- Disabled state via `canScrollNext` / `canScrollPrev`.

**Slots**: none. **Emits**: none (delegates to embla via `useCarousel`).

### `<CarouselDots>` (CarouselDots.vue)

Wires to the embla API via `useCarousel()` (must mount inside `<Carousel>`).

**Props**

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `class` | `HTMLAttributes['class']` | — | Class merge passthrough. |

**Behaviour**

- Renders one `<button role="tab" data-slot="carousel-dot">` per snap.
- Active dot: `w-6 bg-foreground scale-[var(--scale-hover)]` (lifted +
  filled).
- Inactive dot: `w-1.5 bg-[var(--muted-medium)]` (per W1 token, R5 §A).
- Hover (inactive): `hover:bg-foreground/50`.
- Click → `api.scrollTo(i)`.
- Orientation-aware: horizontal renders a row of dots that grow on the X
  axis when active; vertical renders a column that grows on the Y axis.
- Container is `role="tablist"` with `aria-orientation` mirroring the
  carousel; each dot is a `role="tab"` with `aria-selected`.
- Falls back to no-render when `slideCount === 0`.

**Slots**: none. **Emits**: none.

### `<GlassCarouselPager>` (GlassCarouselPager.vue)

Standalone — does NOT depend on `useCarousel()`. Composes equally with the
custom `<GlassCarousel>` (manual state) and embla `<Carousel>` (wire
manually).

**Props**

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `index` | `number` | required | Current zero-based slide index. |
| `total` | `number` | required | Total slide count. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout. |
| `showCounter` | `boolean` | `true` | Show "X / N" counter pill. |
| `loop` | `boolean` | `false` | Wrap at boundaries instead of disabling. |
| `class` | `HTMLAttributes['class']` | — | Class merge passthrough. |

**Emits**

| Event | Payload | When |
|---|---|---|
| `prev` | — | Non-loop prev pressed (in addition to `select`). |
| `next` | — | Non-loop next pressed (in addition to `select`). |
| `select` | `index: number` | Always — primary pager-state contract. |

**Slots**

- `#trailing` — sibling slot after the next chevron. Used by
  `glass-carousel.vue` to mount the Collapse / Expand toggle.

**Behaviour**

- Composes `<Button variant="outline" size="icon">` for prev + next chevrons
  + a `rounded-pill border border-border bg-card px-3 py-1 text-mono-caption
  tabular-nums shadow-cartoon-sm` counter pill (cartoon-shadow audacious
  variant per R4 §D).
- Loop semantics:
  - `loop=false` (default): chevrons disabled at boundaries.
  - `loop=true`: chevrons wrap around (used by `glass-carousel.vue`).

## Consumer migration evidence

### `demo/stories/navigation/carousel.vue`

**Before** (lines 46-65, basic pager):
- `<Carousel>` with `<CarouselPrevious>` + `<CarouselNext>` floating-arrow
  chevrons inside the slide; no counter, no dots.

**After**:
- `<Carousel>` with a row beneath `<CarouselContent>` that renders
  `<CarouselDots>` (left) + `<CarouselPager>` (right) — chevrons + "X / N"
  counter + dot indicator all visible.

Second section (story-pager, lines 67-119): the 12-line hand-rolled dot
strip retires; `<CarouselDots>` substitutes. Hand-rolled
`<CarouselPrevious>` / `<CarouselNext>` chevrons retire; `<CarouselPager>`
substitutes.

### `demo/stories/containers/glass-carousel.vue`

**Before** (lines 127-157, audacious pager):
- 24 lines of hand-rolled `<Button variant="outline" size="icon">` +
  counter `<span>` + Collapse/Expand button.

**After**:
- `<GlassCarouselPager :index :total loop @select #trailing>` — single
  primitive call, Collapse/Expand toggle via `#trailing` slot.

## Hard-gate verification

| Gate | Status |
|---|---|
| (a) `<CarouselPager>` + `<CarouselDots>` + `<GlassCarouselPager>` exist at `src/components/ui/carousel/` | PASS |
| (b) `demo/stories/navigation/carousel.vue` consumes `<CarouselPager>` + `<CarouselDots>` | PASS — both sections |
| (c) `demo/stories/containers/glass-carousel.vue` consumes `<GlassCarouselPager>` | PASS — primary section |
| (d) Per-story consumption: each substrate primitive renders + active state visible | PASS — counter pill + filled-dot indicator + ghost chevrons all render |
| (e) `npm run typecheck` green AFTER each substrate primitive | PASS — typecheck ran twice; both green |
| (f) `npm run build` green at end | PASS — built in 18.60s |
| (g) `npm run test` green at end | NOT GREEN — 1 unrelated failure in `src/components/custom/search/__tests__/search-contracts.test.ts` (Lane B FuzzySearch in-flight gestalt rewrite); zero failures in carousel domain |
| (h) Proof doc | this file |

## Scope reveals

None. The lane scope held: 3 new substrate primitives at `src/components/ui/carousel/`, two demo migrations, one barrel update.

Note: the `src/index.ts` re-export step from the prompt is a no-op because
`./components/ui/carousel` is already re-exported via `./components/ui`'s
aggregate barrel; the new exports propagate automatically.

## Cross-lane status

- Test suite has 1 failure in `FuzzySearch` test (Lane B's gestalt rewrite is
  mid-flight). Lane C.2's domain (`carousel`) has 0 failures.
- W5 + W6.A + W6.B working-tree changes are present per `git status`; Lane
  C.2 stayed within its declared bounds.
