# Input to the dock loop: daraksha's dock at the owner's 2x (value.js, 2026-11-15)

A measured data point for O-368 (glyphs twice as big, less padding) and O-370 (the dock a bit too transparent). Site PR #63, not yet live. Frames, read-only: `~/.dev-logs/owner-1112/frames-dock-2x/` (`compare-119-before-after-1440-dark.png`; hover and press crops `after-1440-*-hover-crop2x.png`, `*-press-crop2x.png`). It extends `INPUT-glyph-ratio-2026-11-15.md` and `INPUT-plate-opacity-2026-11-15.md`.

## What the site settled on
- Glyph box 40 px in a 44 px seat (0.91 of the seat; each drawing fills 0.73 to 0.87 of the seat's height). His frame had 20 px; master had 30.
- Gap between glyph boxes 8 px at desk, 4 px at 430, 390 and 360; five seats fit at 360 with 44 px targets.
- Open plate 56 px tall (was 64 desk, 69 phone).
- Plate veil raised ONE step: open plate alpha 0.10 to 0.14 light, 0.14 to 0.18 dark; blur unchanged. Two steps (0.18 / 0.22) read no clearer over the busiest ground, only greyer.
- Glyph contrast against the plate hardly moved with opacity (dark about 2.1 to 11.7; light pinks and creams 1.0 to 2.4): **opacity alone does not buy legibility.** The redesign's legibility comes from the glyph's ink and the plate's firm tier, read against the ground, not from alpha.

## What the site needed and glass does not expose (each a row for the redesign)
1. A glyph size that reaches a site's own pictures and marks in a seat, not only an svg placed directly in a DockControl.
2. A glyph size for tab-shaped controls in a dock (the controls seat's actions stayed 16 px).
3. A documented seat-padding setting (the site used `--dock-icon-padding`, undocumented).
4. A resting (folded) veil setting separate from the open one: the folded plate uses the lighter wash level, which `--glass-veil-dock` does not reach.
5. A published resting plate height, so a page's floor can read it (the site derives its own).
6. Room for the hover and press fill: at 40 in 44 the fill hugs the glyph. The fill needs its own inset rule at a high glyph share (see the crops).
7. A label slot on a seat that never re-lays the row: the owner's rule (O-366) is that hovering one seat moves no other; daraksha's hover-name reveal slid neighbours aside and is becoming a label above the seat.

## For the ruling pass
The default glyph share and the default veil are the owner's to see as strips (owed). This point says: about 0.9 of the seat reads as his "2x"; one veil step is enough; the second step is waste.

## Added 2026-11-15 23:15 (value.js, second note): three points RULINGS-5 has not seen

1. **RU-47's gap on touch.** The site moved names to glass's Tooltip above the seat (no re-layout, boxes held to 0.5 px). But the dock turns tooltips off on touch, so a phone now shows NO page name at all. RU-47 ("the name is shown above by Tooltip") does not close on touch as ruled. The next ruling pass must say what names a seat on a phone: the name shown above on press-and-hold, the current seat's name shown briefly on selection, or the name kept in the run on coarse pointers only.
2. **Selection at a high glyph share.** At 40 px in a 44 px seat there is no room for the hover fill or an under-mark; the site marks the selected seat with a 1.5 px ring through `--dock-active-shadow`. An active-ring option would make that first-class. Bears on RU-41 (selection is the seat's mark) and on RU-46's gap 6 (deferred to 12.0.0): at the new default share of 0.9 this is no longer an edge case, so it cannot wait for 12.0.0.
3. **Fit law.** Narrowing the dock's inline padding at desk pushed a control 0.1 px past the closing plate during the fold fade (one red in five). A sub-pixel overhang during the fold: RU-39's one-comparison law should be read in layout integers, as ruled, and the fold's clip should cover the fade.
