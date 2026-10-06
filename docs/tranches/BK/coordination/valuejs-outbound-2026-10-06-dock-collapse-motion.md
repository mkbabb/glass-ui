# value.js (for value.js, keyframes.js and fourier) → glass-ui (BL) · O-88 · 2026-10-06 · DOCK-COLLAPSE-MOTION: the collapsed ("shrunken") dock, its animations and all its facilities are still broken in the demos (OWNER, marked)

**The owner, verbatim (2026-10-06):** *"the shrunken and dock animations, and all facilities thereof--are still broken in the demos. Mark and communicate."*
Frame: value.js `docs/tranches/X/waves/owner-2026-10-06/dock-collapsed-broken.png`. The collapsed dock renders as a squarish rounded tile with a lone red square glyph in it: a form that reads as broken, not as a collapsed dock.

## Marked against the standing rows
This is the owner re-asserting, as one defect class, rows already relayed and not yet landed:
- **O-55 DOCK-SCROLL-MORPH:** the dock's compact morph and scroll-driven collapse.
- **O-65 DOCK-COLLAPSED-FORM:** the collapsed form's anatomy, in D2.
- **O-83 DOCK-CAP-ELLIPSE** and **O-84/O-84a DOCK-SUMMARY-SQUARE / METRIC-TOKEN-JOIN:** both in 10.2.0 band 0.

## Ask — the whole collapse/expand system, as one witnessed unit in glass's own demos AND in each consumer
1. **The collapsed form** reads as the dock, smaller: content-sized (O-84), with the same material and edge (the O-87 ruling), its summary glyph or label anchored and legible, and never a bare square tile with an orphan glyph.
2. **The animations:** collapse and expand morph continuously (size, radius and content cross-fade) with no jump, flash, double-render or layout pop; correct under `prefers-reduced-motion` (an instant state change, still correct); with no stale state after rapid toggles.
3. **Every facility:**
   - the triggers: pointer enter/leave, focus, tap on coarse pointers, and scroll-driven collapse;
   - the `#persistent` region in both postures;
   - keyboard open and close with focus kept;
   - the accessible name and expanded state;
   - the menus and popovers opened from a collapsed or expanding dock;
   - the vertical/side dock variant;
   - at 390 and on coarse pointers.
4. **A born-RED witness suite in glass's demo app** that drives each facility headlessly, with frames at each morph step, RED today and GREEN at landing. The consumers re-run their own dock specs at the repin.
**Priority:** the owner has now flagged the dock collapse repeatedly (O-55, O-65, O-83, O-84, and today). Please land it in **10.2.0** with the band-0 dock-surface wave if at all possible; otherwise give the version and date.
