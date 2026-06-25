# User feedback 2026-06-23 BATCH 3 (verbatim + dispatch) — the DOCK + ANIMATION overhaul

Mode: tranche-dev + aggressive prototype "until perfected"; convergent workflow waves (research → prototype → inform the tranche; augment/prune/modify extant waves); triumvirate dispatch; paced. The CORE liquid dock animation does not work + must be GENERALIZED.

## A — THE CORE LIQUID DOCK (the dominant — "the core liquid dock animation does not work properly")
| # | Verbatim | 
|---|---|
| A1 | nav docks NOT fixed — "there's still this erroneous BROKEN RAIL element therein both" (the judge passed but the user still sees it — gestalt-vs-mechanism) |
| A2 | "Both docks should have proper SHRUNKEN STATES, with a LONGER hover/interaction window to collapse" |
| A3 | "Docks still seem to GROW FROM THE RIGHT, they should grow from the CENTRE and shrink thereto" |
| A4 | "The dock blurring is far too EXTREME" + "/dock/overview the docks are blurry for far too long" |
| A5 | "the icons in the SHRUNKEN STATE are not aligned" |
| A6 | "The ICON should not bounce back into place OUT OF SYNC with the dock — the animations should be SYNCED" + "icons should not bounce from right to left — inertia, but from the CENTRE" |
| A7 | "Why does a DROPDOWN change the color of the ENTIRE dock?" |
| A8 | "The POPOVER trigger is not aligned properly, and why are these different from the dropdown — why not just have a dropdown? At least style them the same" |
| A9 | "Does the dock change color for CONTRAST when being interacted with? Should we?" |
| A10 | /dock/dock-gallery — "none smooth, have inertia, properly grow and shrink, the docks DO NOT SPLIT. Do not use real names" + "Tab bar should NOT have TWO docks in one — ONE dock with our TABS facility" |
| A11 | "Vertical pill is ugly" + "our liquid pills need a bit bigger PADDING" |
| A12 | "These are not DRAGGABLE" (the dock items) |
| A13 (THE BIG ONE) | "Generalize the facility to handle MORPHING from the dock VERTICAL or HORIZONTAL. A dock should be SPLITTABLE into ARBITRARY parts, such that one of the icons/elements splits OFF, MORPH and GOO, into another dock that sits BESIDE/ABOVE/BELOW it. Like our ios demos." |
**→ `dock-core` triumvirate(s)** (THE priority): fix + GENERALIZE the liquid dock — grow-from-CENTER (not right), the synced icon morph (no out-of-sync bounce, inertia-from-center), the blur dialed back (too extreme), the shrunken-state icon alignment + longer hover-collapse window, the dropdown-recolors-dock bug, the popover/dropdown unify+align, the SPLIT/goo-morph facility (vertical/horizontal, arbitrary split into a beside/above/below sub-dock — wire W-DOCK-SCROLL-FISSION + W-DOCK-HUB-API), the draggable items, the bigger pill padding, the dock-gallery ONE-dock-with-tabs (no real names), Safari. The shipped `useDockFission`/`DockGooFilter` IS the split engine (engine 100%, assembly 0% — IOS27-REFERENCE T2).

## B — THE GLOBAL ANIMATION LAW (ios27 tuning — smooth/gooey/inertia/audacious, NOT tight/springy)
| B1 | "ALL of our animations should be SMOOTH, CONTROLLED, have INERTIA and be AUDACIOUS: NO overly tight and springy animations. Smooth, FLOWING, GOOEY. Subtle tuning to be more aligned with ios27. They should MORPH MORE on move." |
| B2 | frame-by-frame ScreenRecording_06-22 23-59-33 AGAIN — "notice how the elements STRETCH, have INERTIA, MORPH and SQUEEZE smoothly" |
**→ `anim-ios27-tune` triumvirate:** re-calibrate the spring/easing REGISTER globally (the SPRING_PRESETS / --spring-* clocks) toward SMOOTH-GOOEY-INERTIAL (less stiff/bouncy, more flowing/weighty — the ios27 feel), morph-more-on-move (the squish/stretch on travel everywhere). Augments W-LIQUID-ENTRANCE-GENERAL (P7) + the goo-morph. This is a GLOBAL re-tune, not per-component.

## C — THE GOO + CAROUSEL/DECK (de-dup + Safari + goo-morph)
| C1 | "the goo effect is AWFUL — needs a great deal of refinement. Does NOT work at all on SAFARI, is far too SLOW, and does not goo morph. How does the Google Gemini carousel work? It should MORPH BLOB and MEATBALL from one to another." |
| C2 | "Carousel and deck should use the SAME underlying SUBSTRATE — in fact, a carousel should likely use a DECK? Are they the same thing? Should we de-duplicate these elements?" |
| C3 | "/navigation/carousel transitions should be more GLASSY, have more DISTORTION and INERTIA" |
**→ `goo-carousel-deck` triumvirate:** rebuild the goo effect (Safari-safe — the static SVG filter; FAST; real goo-morph blob↔meatball, the Gemini-carousel reference); DE-DUPLICATE carousel/deck onto ONE substrate (does a carousel use a deck? — the embla vs deck-engine reconcile); the carousel transitions glassy+distortion+inertia.

## D — PAGE CHROME + BUTTONS (the smaller folds)
| D1 | "each page needs to fix this page ALIASING at the corners (odd SQUARED OFF)" — the page corner-radius/clip aliasing |
| D2 | "the pages standardized in PATHS, HEADER SCROLL, etc" (W-PATH-STANDARDIZE + W-STICKY-TITLE-CONDENSE) |
| D3 | "/navigation/toc-tracking TOC is UNREADABLE — needs a better glass background" |
| D4 | "The dock BUTTONS should be redolent of our glassy TABS — change those AND our DEFAULT BUTTONS to be more like the tabs (with our tabs modifications)" + "Our buttons should all be more GLASSY by default, like our tabs facility, and have better HOVER states" |
**→ fold:** D1 corner-aliasing (a page-clip fix), D2 path/header (existing waves), D3 toc glass-bg (W-GLASS-ABROGATE-GRAY + §3 field), D4 buttons-like-tabs (a button→glassy-tab register — fold into W-BUTTON-GLASS + W-IOS27-SUFFUSE + the tabs).

## Dispatch order (paced, one workflow at a time; viz-respec currently running)
1. **dock-core** (THE priority — the core liquid dock + the split/morph generalization).
2. **anim-ios27-tune** (the global smooth/gooey/inertia re-calibration).
3. **goo-carousel-deck** (the goo rebuild + carousel/deck de-dup).
4. page-chrome + buttons-like-tabs folds + the remaining Pass-E in parallel-paced.
