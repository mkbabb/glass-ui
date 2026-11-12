# Inbound O-201: the owner sees a seat's outline clipped by the dock (owner 2026-11-09 17:19, color.babb.dev, via value-js-63)

The frame is `inbound-O-201/owner-frame.png`. On color.babb.dev (glass 10.1.3), the "Home ⌃" menu trigger seated in the dock shows its pill outline (the selected or active ring) cut off at both its left and right edges by its container. The owner's words: "there's still a clipping issue with the glass-ui dock".

## Ruling

The owner's frame reverses fix 8's N3 acceptance. **No seat's ring, outline or focus indicator may be clipped by any dock region, at any edge, in any state: rest, hover, focus, selected, open, or mid-yield.** A bound of "up to 3 px" is a clip, and the owner sees it. Cure it at the root. The dock's clip (the run's scroll container, the yield, the fit edge, the morph clip) must reserve the seat's full outline extent, or the outline must paint where no ancestor clips it. A per-seat inset patch does not count as a cure.

## Gates

In Chromium and WebKit, at 390 and 1440, light and dark, fine and coarse, cover:
- a menu trigger with a chevron (value's Home ⌃) seated in a dock at the run's start and end, both open and selected;
- an end seat at the fit edge, under keyboard focus (fix 8's N3 case);
- a run that has scrolled to each end.

In every cell, the seat's outline box (`outline` plus `outline-offset`, or the ring's own box) lies wholly inside every clipping ancestor's clip rect, and paint shows the full ring with no flat cut. Each cell is RED on v10.1.4 where it reproduces there. If the Home-trigger cell does not reproduce on the branch, record the exact geometry you tried and say so; do not mark it cured by assumption.
