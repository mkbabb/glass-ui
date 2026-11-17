# The orchestrator's addition: atlas's two sheet rows (2026-11-17). BINDING for fix seat 7 and critics 7 on.

atlas's final judge of its candidate found two faults in a detented `Sheet` that keep it from landing (`/Users/mkbabb/Programming/sci-report/atlas/docs/tranches/U/design/LAST-TEN-GLASS-ROWS-2026-11-15.md`, rows 2 and 3; evidence paths are in that file). Both are this patch's kind of fault, a surface that does not move from where it is with weight, so they join fix seat 7's list as two rows, after the disclosure ruling (`orchestrator-note-after-fix-6.md`).

## Row A: a detented sheet rises at its size, by a translate

Today a detented bottom sheet opens by growing its `block-size` from the floor to its rung (11.1.1 now slides it from past the edge to the floor first). At 430x932 by touch, opening to the 0.9 rung, the head and its close button travel about 600 px over about half a second, and a press on the close button 190 ms after `data-state="open"` lands on the head 5 times in 9; the growth also forces layout on every frame (frames over 33 ms at 4x CPU).

- The sheet takes its rung's `block-size` on its first open frame and rises by `translate` from past its edge to 0 on the entrance curve; `block-size` changes only when the rung changes (a drag, a snap, a programmatic rung). The top-edge sheet mirrors it. The floor rule stays for rungs below it.
- The close is untouched: 11.1.1's exit slides past the edge as now.
- Reduced motion: the entrance is the fade row 8 already rules, at the rung's size.
- Witness, RED on v11.1.0 and GREEN on the tip, Chromium 390 touch and WebKit 390 touch: (1) atlas's sequence on a sheet opening to the 0.9 rung at 430x932: from `data-state="open"` plus 190 ms, the close button's box is within 4 px of its resting box, and a tap at its centre hits the button (`elementFromPoint`) 20 times in 20; (2) during the rise the sheet's `block-size` reads one value on every frame; (3) the frame table of the head's top shows no step over a fifth of its travel and no cut at either end.

## Row B: a drag released upward springs from where the finger left it

Dragging the handle up from the half rung and letting go makes the sheet jump from 340 px to 739 px in one frame (`sheet/detents/use.ts`, about lines 177 to 200). Fix 3's commit `0fec2b3f3` seats the spring at the drag's place and speed for a drag that dismisses; every release does the same, up or down, to any rung.

- Witness, RED on v11.1.0 and GREEN on the tip, both engines at 390 by touch: a drag from the half rung up past the midpoint, released at speed and at rest; the sheet's edge moves on from the release point with no frame step over a fifth of the remaining travel, and settles on the rung it snaps to.

Both rows: one commit each, the CHANGELOG sentence for each, the ratchet rebound once after the last source commit.
