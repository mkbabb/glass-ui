# W-DECK-DELTA — the `@mkbabb/glass-ui/deck` sibling subpath (BC.W-DECK)

The π + gestalt capture for the full-viewport keyboard-paged aria-live PRESENTATION
register. Source arm GREEN (`proof:deck` born-RED → GREEN); the BINDING live-π capture
(the frame-series below, both modes) rides the orchestrator's W-REFLECT3 live-π pass
(the browser profile is orchestrator-owned — the BC.W-GESTALT-FIRST per-wave live cadence).

## What landed (the lift, MOVE not re-author)

- `src/components/custom/deck/` — the colocated `/deck` feature-dir:
  - `composables/useDeck.ts` — the headless `DeckCore` (`index`/`total`/`progress`/
    `liveMessage` + `go`/`next`/`prev`/`first`/`last`), vueuse-free, zero-DOM. Donor
    semantics byte-faithful: the clamp `[0, total-1]`, the 1-based `progress`
    `((index+1)/total)*100`. The aria-live announcer seam folded onto the return as
    `liveMessage` ("Slide N of M", optionally "… : <name>").
  - `composables/useDeckKeyboard.ts` — the focus-guarded `keydown` listener (Arrows /
    PageUp/Down / Home / End global; Space + digit reach a focused control's native
    activation via the `CONTROL_SELECTOR` test — the C6 fix). NOT the vueuse `/keyboard`
    registry.
  - `composables/useDeckSpring.ts` — `installDeckSpring()` → keyframes.js
    `springTimingFunction(DECK_SPRING)` as the LAZY dynamic import (the count-up easing);
    `deckEase` degrades to the monotone cubic. `/deck` stays keyframes-FREE on the static
    graph (verified: `dist/deck.js` carries ONLY `import("@mkbabb/keyframes.js")`).
  - `DeckPager.vue` — a THIN wrapper over `<PagerDots pattern="group">` (the deck
    PRESENTATION aria axis: role=group / aria-current). ZERO re-implementation of
    `pagerWindow` — the math is sourced from the ONE `pager-dots/pagerWindow.ts` leaf
    (extracted from PagerDots.vue's inline private fn; PagerDots now imports it).
  - `constants.ts` (`DECK_SPRING` + `CONTROL_SELECTOR`), `index.ts`, `README.md`.
- `--spring-deck: var(--spring-smooth)` (scheme-motion.css) — an ALIAS, NOT a new spring
  family.
- The `/deck` SIBLING subpath: `src/subpaths/deck.ts` mirror + the `package.json`
  `./deck` export + `typesVersions["deck"]` + the `src/api/index.ts` DeckCore/DeckMoves/
  PagerWindow publication. NOT a `/carousel` fold. OFF the root barrel.
- The `deck-subpath` disposition book FLIPPED `resolved: true` (the three-tranche
  perpetual reservation DISCHARGED; the ≥2-consumer bar met by construction — speedtest
  survey-deck + the slides consume-back = two REPOS).

## The PagerDots reconcile (the `aria` pattern axis — path a, no third fork)

`PagerDots` gained `pattern?: "tabs" | "group"` (default `tabs`, byte-identical: the
carousel's `role=tablist`/`aria-selected`). `pattern="group"` emits the deck register
(`role=group` on the root, `aria-current` on the active dot, `aria-orientation` dropped).
`<DeckPager>` selects it. The `pagerWindow` math + the per-index focus-survival watch +
the 24px WCAG-2.5.8 hit target ride the ONE PagerDots machinery — the boundary fence
(NO third `pagerWindow` fork) holds.

## Source-arm verdict (device-free, GREEN)

`proof:deck` — D1 (subpath exists as a SIBLING + colocation + publication, no carousel
fold, off-root) · D2 (the lift is a MOVE — donor clamp/progress/moves preserved) · D3
(NO third pagerWindow fork — ONE leaf, PagerDots imports it) · D4 (focus-guarded Space +
digit) · D5 (`<DeckPager>` over PagerDots' group register, focus-survival, 24px hit) · D6
(the liveMessage announcer) · D7 (`--spring-deck = var(--spring-smooth)`, lazy kf
consume) · D8 (9 self-test bites RED + base GREEN). The publication is binary
(`verify-export-types` + `proof:resolution` GREEN — `@mkbabb/glass-ui/deck` resolves +
typechecks).

## Binding π (rides the orchestrator's live-π pass — W-REFLECT3 / BC.W-GESTALT-FIRST)

`tests-visual/deck.spec.ts` (booked) + the live capture over `/motion/deck`, both modes:

1. **Keyboard-paging works** — Arrow/Space/digit advances the deck; the slide transition
   rides the `--spring-deck` calm settle (no bounce). _(capture: deck-keyboard-page-{light,dark}.png)_
2. **Focus-guard** — Tab to the in-slide control, press Space: it activates, the deck does
   NOT page (the C6 fix). _(capture: deck-focus-guard-{light,dark}.png)_
3. **`<DeckPager>` focus SURVIVES a window recompute** — never drops to `<body>` (the
   per-`dotEls` identity check). _(capture: deck-pager-focus-survival-{light,dark}.png)_
4. **The aria-live announcer fires** "Slide N of M" per step. _(capture: assert the
   `sr-only` polite region textContent.)_

The `demo/stories/motion/deck.vue` story compiles clean through the dev server (verified:
the Vite-transformed module + the `/motion/deck` route both resolve 200).
