# The animation audit: one page

Every glass component was driven and read frame by frame (about 120 frames a second, on 11.0.1 and on the 11.0.2 branch). The middles of most motions are sound. The faults are at the beginnings and the ends, as you said, and most come from a few shared rules. The ten worst follow; the full ranked list of 61 is in `AUDIT.md`.

**1. Tabs dragged to another tab settle, stop, jump back to the old tab and glide again.** The dock's layer switcher runs the same code: there a tap does nothing and the mark vanishes.
![tabs drag](owner/01-tabs-drag-release.png)
Tiles 1 to 3 are one run, tiles 4 to 7 (starred) a second run of the same drag; the jump itself is one frame (the pill at 92 px, then at 4 px). Cure: the tab and the pill's offset change in the same frame. **11.1.1.**

**2. Every eased ending lands with a small kick.** The last frame of a tab glide, an accordion, a progress fill, a switch or a slide turn carries 2.5 % of the whole travel, four to ten times the frame before it (4 px on a tab hop, 10 px on a tall panel).
![spring tail](owner/02-spring-tail-tabs-click.png)
Cure: the six spring curves are regenerated so they reach their end without a step. One change fixes it everywhere. **11.1.1.**

**3. The dock changes size in one frame when its content changes,** and the old and new content are both legible for about 100 ms. A dock with a layer switcher also changes height in one frame as it opens and folds.
![dock face swap](owner/03-dock-face-swap.png)
Cure: the plate glides and the old content is gone before the new arrives. **11.2.0, the dock wave (W-I.8).**

**4. Choosing a dock seat that is past the edge makes the row lurch four times and slide backwards between lurches.** Three things move the row at once.
![dock run glide](owner/04-dock-run-glide.png)
Cure: one glide to where the seat will rest. **11.1.1.**

**5. A sheet with detents has no beginning and no end.** It appears at more than half its height in one frame; on close it stops for 440 ms, then it and the dimmed page vanish together; and from the second drag on, letting go drops it 166 px before it rises.
![sheet](owner/05-sheet-detent.png)
Cure: it slides in and out below its smallest height, and a release starts from where the hand left it. **11.1.1.**

**6. A menu, popover or select closed while it is still opening flashes fully open first.** Tooltips never animate in at all, and every one of these surfaces loses up to a third of its opacity in the first frame of its close.
![reveal reversed](owner/06-reveal-reversed.png)
Cure: the close starts from what is on screen; tooltips get their entrance; the close eases off its start. **11.1.1.**

**7. A slider moved by a key or by a press on its track teleports,** up to 444 px in a frame, and the lens over it appears whole. A drag itself is clean: the thumb stays within a pixel of the hand.
![slider press](owner/07-slider-track-press.png)
Cure: the lens goes in **11.1.1**; a step travels in **11.2.0, the Slider wave (W-B.18)**.

**8. Dropping a row in a sortable list makes the rows beside it jump a full row and slide back, and the dropped row's label shows twice for a third of a second.**
![sortable drop](owner/08-sortable-drop.png)
Cure: the list reorders and the rows release in the same frame; the carried copy fades as the row arrives. **11.1.1.**

**9. On a phone, picking an option turns the select's bottom sheet into a floating popover 291 px higher, in one frame, and then fades that.**
![select on a phone](owner/09-select-phone-pick.png)
Cure: the sheet leaves as a sheet. **11.1.1.**

**10. Switching theme cuts the text and the page in one frame while the cards fade over a tenth of a second,** so for three frames the text is white on cream.
![theme flip](owner/10-theme-flip.png)
Cure: the whole page cross-fades once. **Waits on question 1.**

Next after these: an accordion clicked twice quickly flashes empty or full; a toast arriving makes the others jump; the command palette's list vanishes before its dialog; the card's header jumps as it condenses and the list shows through its title; aurora and the blob change palette in one frame, and the blob flashes at full strength before it fades in.

One item is already cured on the 11.0.2 branch: seats in a dock had no hover or press fade.

## Three questions

1. **Theme change.** May the whole page cross-fade for about 200 ms when the theme flips? Today the text cuts and the cards fade, which is the worst of both. The other honest answer is that everything cuts together.
2. **Reduced motion.** Today one rule stops every fade in the library, including seven fades glass wrote for that setting, and every fade a site writes too. Should that rule keep opacity and colour on a short clock and stop only movement, for glass and for sites alike?
3. **The Switch.** Should its thumb follow a finger or a mouse drag? Today a slide on touch does nothing.

## What was not reached

Safari itself (only Playwright's WebKit build, which crashed on two of the seven families); the 11.1.0 branch; daraksha's, color's and fourier's own pages; a real phone.
