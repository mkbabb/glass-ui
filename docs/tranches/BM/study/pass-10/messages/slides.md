# To slides

Hi,

The decks are on glass-ui 10.1.4, so this note covers what you'd gain by moving to 11.2.0 and later. The move from 10 to 11 is its own step.

**11.2.0.** The DarkModeToggle in DeckView is redrawn, in colour: a warm sun draws its rays in under its disc, and a cool night slides across to carve the crescent, over 200 ms. Its hover becomes the plate the dock's controls use, and a press is answered by the glyph itself. With Reduce Motion on it crossfades over the same 200 ms.

**11.3.0.**
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- The Popover and DropdownMenu grow from their trigger, as today, and leave by a 120 ms fade.
- A Dialog keeps one blur.

**12.0.0.** The dock's fold changes so the glass's edge cuts each seat as it passes, and its per-frame script goes.

What you'd do: move to 11.2.0 when you next touch the decks, and check the toggle in both themes on the projector. If its colours fight a deck, `--toggle-tone` on the dock draws it in one ink. Nothing else needs changing.

Questions:

1. Does the deck's DarkModeToggle sit inside the dock in DeckView, or on its own beside it?
2. Does any deck page, the parkway deck included, set `--sheet-enter-skew`? It stays, at 0 by default.

Thanks,
Mike
