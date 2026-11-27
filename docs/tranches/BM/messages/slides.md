# To slides

Hi,

The decks are on glass-ui 10.1.4 (`package.json:25` on `npig`), so this note covers what you'd gain by moving to the next releases. The move from 10 to 11 is its own step, and none of what follows needs doing before it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The minor that brings the dock redesign

The DarkModeToggle in the deck's dock (`src/deck/DeckView.vue:164`) and on the home page (`src/views/HomeView.vue:27`) gets its new face, in colour: a warm sun draws its rays in under its disc, and a cool night slides across to carve the crescent, over 200 ms. Its hover becomes the flat plate the dock's controls use, and a press is answered by the glyph itself. With Reduce Motion on it crossfades over the same 200 ms. The same minor brings a seat that stands beside the dock, which a deck could use for its toggle if you'd like (my first question).

## The minor with the new springs and menus

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- The Popover and DropdownMenu grow from their trigger as today and leave by a short fade.
- A Dialog keeps one blur, the veil's.
- The FourierField on the feedback-coder deck's first slide (`src/decks/feedback-coder/slides/Slide01.vue:35`) starts computing its series through fourier's own published package. It draws exactly as it does now.

## 12.0.0

The dock's fold changes so the glass's edge cuts each seat as it passes, and its per-frame script goes. Nothing the decks import from glass is removed.

## What you'd do

Move to the dock-redesign minor when you next touch the decks, and check the toggle in both themes on the projector. If its colours fight a deck, setting `--toggle-tone` on the dock draws it in one ink. Nothing else needs changing.

## Questions

1. The deck's toggle sits inside the dock after its separator (`DeckView.vue:164`). Would you like it to move into the seat beside the dock once that ships, or stay where it is? It stays in the dock unless you'd like it moved.
2. You asked for `--sheet-enter-skew` for the drawer's shear, and it arrived in 11.1.0. From 12.0.0 a side sheet enters with no shear by default, and the token stays, at 0. No deck on `npig` sets it yet; will the parkway-lab deck set it once you're on 11? It stays at 0 unless a deck sets it.

Thanks,
Mike
