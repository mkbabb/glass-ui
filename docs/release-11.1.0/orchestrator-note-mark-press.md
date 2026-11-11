# Orchestrator note for the fix seat and the critics: the run mark measures a pressed seat (O-246, Gregg 2026-11-11)

This is a defect of an item 11.1.0 ships (O-188), not a new item.

Gregg built the same gliding mark by hand on 11.0.0 and found that a mark measured with `getBoundingClientRect` while the control is still scaled by its press bakes the pressed scale (0.96) into its size, and nothing measures it again. `useDockRunMark.ts:75-76` reads `run.getBoundingClientRect()` and `seat.getBoundingClientRect()`, so the 11.1.0 mark has the same door: click a seat, and the selection changes while the seat is still pressed.

- Reproduce first, both engines, 390 coarse and 1440 fine: in a run of DockControls whose current seat changes on click, click a seat and, once everything has settled, compare the mark's width and height with the seat's `offsetWidth` and `offsetHeight`. Report the numbers on the branch.
- If it reproduces, the cure is at the measure: the mark reads layout boxes (`offsetLeft`, `offsetTop`, `offsetWidth`, `offsetHeight` against the run), which a transform does not change. No second measure after the press, and no timer.
- Witness: the settled mark equals the seat's layout box within 0.5 px after a click, a keyboard activation and a route change, both engines. RED on the branch as it stands if the defect reproduces.
- If it does not reproduce on the branch, record the reading and why (for example, the press no longer scales a dock seat), and leave the code alone.

## Also read the mark's first measure (O-247, Gregg 2026-11-11)

Gregg found that a selection mark which measures as soon as its container exists forces the new dock's layout inside the mount task. Read the 11.1.0 run mark for the same cost: one Chromium trace at 4x CPU of a dock mounting with a marked run, and say whether `useDockRunMark` forces layout in the mount task. If it does, the first measure waits for the frame after paint (one `requestAnimationFrame`, no timer), and the mark still shows on its seat at first paint in both engines. If it does not, record the reading and leave the code alone.
