# Deck

`@mkbabb/glass-ui/deck` — the full-viewport, keyboard-paged, aria-live PRESENTATION
register (BC.W-DECK). DISTINCT from `/carousel`'s embla item-scroller: a deck pages
between whole slides via the keyboard, announces each step, and renders a windowed
dot pager — the headless core a slides deck or a survey-deck composes.

## Anatomy

- **`useDeck(total, opts)` — the headless state core.** A pure reactive `index` +
  `progress` with ZERO DOM. `go`/`next`/`prev`/`first`/`last` clamp to `[0, total-1]`;
  `onChange(to, from)` fires after a navigation commits. `liveMessage` is the portable
  WCAG step announcer ("Slide N of M", optionally "… : <name>" via `opts.label`) the
  consumer surfaces in an `sr-only` `aria-live="polite"` region.
- **`useDeckKeyboard(deck, opts)` — the focus-guarded keyboard contract.** A plain
  `keydown` listener (NOT the vueuse-bearing `/keyboard` registry — keeping `/deck`
  vueuse-free). Arrows / PageUp / PageDown / Home / End are GLOBAL; Space + digit jumps
  are FOCUS-GUARDED (`CONTROL_SELECTOR` test) so a focused control gets its native
  activation, never hijacked. `handleDeckKey` is the pure one-key handler (happy-dom
  testable).
- **`installDeckSpring()` / `deckEase` — the dogfooded motion curve.** `DECK_SPRING`
  is SwiftUI `.smooth` (response 0.5, ζ 0.85) — the SAME family `--spring-smooth`
  derives from. The CSS half is the `--spring-deck: var(--spring-smooth)` token (a
  slide transition reads it). The JS half is the count-up easing: `deckEase.fn`
  defaults to a monotone cubic, swapped to keyframes.js `springTimingFunction(.smooth)`
  by `installDeckSpring()` — a LAZY dynamic import, so `/deck` stays keyframes-FREE on
  the static graph (the SCC-trap discipline; the chunk degrades to the cubic if it
  fails).
- **`<DeckPager>` — the windowed dot register.** A THIN wrapper over `<PagerDots>`'s
  already-factored `pagerWindow` oracle, carrying ONLY the deck's PRESENTATION aria
  register (`role="group"`/`aria-current` via the `pattern="group"` axis). ZERO
  re-implementation of `pagerWindow` — the math is sourced from ONE place
  (`pager-dots/pagerWindow.ts`). The 24px WCAG-2.5.8 hit target, the active-dot
  elongation, the window cues, and the focus-survival across a recompute all ride the
  composed PagerDots machinery.

## Usage

```vue
<script setup lang="ts">
import { useDeck, useDeckKeyboard, installDeckSpring, DeckPager } from "@mkbabb/glass-ui/deck";

const deck = useDeck(slides.length, {
    label: (i) => slides[i].title,
    onChange: (to) => { history.replaceState(null, "", `#${to + 1}`); },
});
useDeckKeyboard(deck);
installDeckSpring();
</script>

<template>
    <main>
        <section
            v-for="(s, i) in slides"
            :key="i"
            :data-state="i === deck.index.value ? 'active' : 'inactive'"
        >…</section>

        <DeckPager v-model:index="deck.index.value" :total="deck.total" :window-fit="9" />

        <p class="sr-only" aria-live="polite" aria-atomic="true">{{ deck.liveMessage.value }}</p>
    </main>
</template>
```

## The lift boundary

The lifted register is the HEADLESS PRESENTATION CORE. The deck-APP glue stays
consumer-local: capture/print modes, edge-hover arrows, hash-sync, the settings panel,
the app shell, the swipe handler. A consumer writes its own thin nav glue over the
lifted core — the over-lift (dragging the app glue into the primitive) is the
visual-load-bearing-ness violation the wave forbids.

Off the root barrel — reached only via `@mkbabb/glass-ui/deck`. The headless core is
vueuse-FREE + keyframes-FREE on the static graph.
