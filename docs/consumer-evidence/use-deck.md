# useDeck + useDeckKeyboard + DeckPager

## Artefact path

`src/components/deck/` publishes the headless presentation core off the root barrel at
`@mkbabb/glass-ui/deck`: `useDeck` owns index/progress/live announcements,
`useDeckKeyboard` owns focus-guarded paging, and `<DeckPager>` composes PagerDots' single
windowing oracle. It remains distinct from `/carousel`'s item scroller.

Deck ships no JavaScript easing installer or private spring preset. Motion is a consumer concern;
the in-repo story's real transform transition reads the canonical `--spring-smooth` token directly.

## Current runtime consumers

A source audit across tracked sibling worktrees found one external package import:

- **atlas** imports `useDeck` from `@mkbabb/glass-ui/deck` in
  `src/stage/useStageDeck.ts`.
- **slides** retains a separate local editorial deck and local `deckSpring.ts`; it does not import
  Glass's removed motion facility.
- **speedtest** has no Deck import.

The glass-ui demo exercises the public headless core, keyboard contract, pager, focus behavior, and
announcement seam. Vendored declaration/bundle snapshots in design-lab archives are artifacts, not
runtime consumers.

## Disposition

**KEEP the Deck mechanism; delete the inert motion fork.** Keyboard-paged, aria-live presentation
navigation is not byte-equivalent to carousel scrolling. `installDeckSpring`, `deckEase`, and
`DECK_SPRING` had no Glass or external runtime reader, so their deletion changes no Deck navigation,
pager, focus, or announcement owner.
