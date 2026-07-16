# BI.W-P121 — Deck

**Status:** DONE

## Shipped contract

`Deck` remains a public headless spatial stack with one active-card authority and a small pager composition.

- `useDeck`, Deck primitives, and `DeckPager` remain the public consumer surface.
- Atlas directly consumes the headless Deck contract.
- Pager-window internals are not exported from Deck.
- Demo-only goo and filter treatment is localized to the Deck story and is not a public morph or filter API.
- Deck and Carousel may share `PagerDots` without sharing their layout or transition authorities.

## Evidence

The Deck contract tests cover its public state and assert that demo goo/morph implementation does not leak into the package surface.
