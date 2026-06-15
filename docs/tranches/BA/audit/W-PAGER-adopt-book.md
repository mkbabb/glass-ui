# W-PAGER — the slides DeckPager → `<PagerDots>` adopt note (the 2nd consumer)

`<PagerDots>` (`@mkbabb/glass-ui/pager-dots`) is the ONE position-dot register the
carousel ships (consumer #1, this batch) and the slides deck adopts (consumer #2).
The ≥2-consumer bar (J inv-10 / L inv-8) is met BY CONSTRUCTION: the carousel dots
and the slides `DeckPager` were ALREADY one recipe (`CarouselDots` was "re-authored
from first principles against the slides DeckPager oracle"); BA.W-PAGER harvests
that convergence into the shipped primitive.

This note names the 2nd consumer's path. **The slides edit itself is the slides
session's** (inv-10 — this wave edits NOTHING in the slides tree). W-CLOSE scope 11
folds this row into `docs/tranches/BA/audit/slides-adopt-deploy-book.md` at close.

## The adopt (slides-side, on the 4.0.0 bump)

`slides/src/deck/DeckPager.vue` (139 LOC) RETIRES onto `<PagerDots>`:

```vue
<!-- before (deck-local DeckPager.vue) -->
<div class="deck-pager" role="group" aria-label="Slides"> … per-dot buttons … </div>

<!-- after (the library primitive) -->
<PagerDots
    :count="total"
    :active="index"
    :window-fit="fitFromRung"
    :ring="false"
    @select="(i) => emit('select', i)"
/>
```

Three adopt facts:

1. **The active-fill PRESET stays slides-local.** The deck sets
   `--pager-dot-active: var(--ncsu-red)` on the rail (the Wolfpack brand —
   presets-in-consumers; the red NEVER enters library tokens). Every other token
   (`--pager-dot-inactive` 52%, `--pager-dot-hover` 72%, the 24px hit-box, the 6px
   pip, the elongate-on-active morph on `--spring-dock`) is the shipped default —
   the dots look identical.
2. **`windowFit` generalizes `--deck-pager-fit`.** The deck's `@media`-published
   `--deck-pager-fit` rung (the dock-gutter overflow ladder, `deck.css §8`) feeds
   `<PagerDots :window-fit>` — the windowing math (`pagerWindow`) shipped INTO the
   primitive (pure + DOM-free; the boundary verdict rides the math with the dots,
   never the deck engine). The `is-edge` clipped-window cues paint via
   `[data-edge]`. The deck keeps READING its own `--deck-pager-fit` rung (the
   CSS→JS getComputedStyle bridge is deck-local — the dock-gutter @media ladder is
   slides chrome) and passes the resolved integer as `:window-fit`.
3. **`ring="false"` — flush on the dock host.** The deck dock owns the only glass
   surface (`DeckPager.vue:92-96`: "FLUSH on the dock glass — no inset well"), so
   the deck drops the `.glass-pager-ring` and sits the dots flush. The carousel
   (no ambient host) keeps `ring` default-true.

## The boundary (the "within reason" cut — r10-deck-boundary, binding)

The DOTS + the windowing math are FIRST-CLASS glass-ui (shipped here). The deck
ENGINE stays slides-local / BOOK'd: the slide chassis (`DeckView`/`useDeckNav`/
`deckKeys`/`captureMode`), the `.slide`/`.deck` stage + `cqi`-@1280 scale-fit, the
page-turn (`[data-state]`+`--turn-*`, cross-linked to directional-VT), and the
headless `useDeck` core — none fire alone, all re-stamped BOOK'd on the deck-subpath
2-repo trigger at W-CLOSE. glass-ui ships NO `/deck` subpath (retired AY.W-CLOSE1).
