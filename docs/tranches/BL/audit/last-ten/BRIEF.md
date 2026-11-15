# The last ten percent: glass's own pass

## The owner's order (15 Nov 2026, to all sites, relayed by value.js)

"Many fine details, like dropdown timings, mobile views, page transitions, modal popups, scrolling, panning, dragging--are jittery, or partially broken. We need a 10x audit of the last 10%--all fine details, animations, should be smooth and apple like. For all of our sites."

## What already exists

`docs/tranches/BL/audit/animation/` (2026-11-13): every component read frame by frame in seven families, 25 ranked faults (INBOUND O-311 to O-335), the shared causes named (AUDIT.md section 2), a harness (`harness/`). Do not repeat it.

## What this pass adds (AUDIT.md section 7 lists what that audit could not reach)

The shared rubric is `~/.dev-logs/owner-1112/LAST-TEN/RUBRIC.md` (value.js's; four site audits use it). This pass covers the rubric's items the first audit did not:

1. **Frame budget under a 4x CPU throttle** at phone sizes, for every open, close, drag and morph: dropped frames, longest frame, percent over 16.7 and 33 ms.
2. **Interruption and reversal.** For every component that opens and closes or travels (Select, DropdownMenu, Popover, Tooltip, Dialog, Sheet and its detents, Accordion, Collapsible, the dock's collapse and layer change, Tabs indicator, Switch, Toast, Carousel, Pager): trigger the reverse at 25, 50 and 75 % of the travel and read whether it reverses from its current position with no restart and no jump (sample the animated property per frame across the reversal). State, per component, whether glass guarantees it.
3. **Phone viewports beyond 390**: 360x780, 430x932, 844x390 landscape, 820x1180, with touch.
4. **Scroll and pan**: inner scrollers (Select list, Command, DataTable, Sheet body, FadingScroll, InfiniteScroll), scroll chaining and overscroll, body scroll lock and release on Dialog and Sheet, sticky headers, the scroll-progress rim; Slider and Tabs drag out of bounds and on pointercancel; input response time from pointerdown to the first changed frame.
5. **Inside the real demo shell** (dock and aurora live), not only on stories: every route to every route, back and forward, theme change, resize.
6. **On the release tips**: `release/11.1.0` and `release/11.0.2`, since both rebuilt parts of the dock and the Slider.
7. **Timing consistency**: one table of every animated interaction's duration, easing and properties (TIMINGS.tsv), grouped by kind, so "the same kind of thing has the same timing" can be read off it.

Output here: INVENTORY.md, FINDINGS.md (one row per fault, with component, file and line, numbers, the release it should land in by the rules in `driver/glass-11.1.1-scope.md`), TIMINGS.tsv, strips under films/ (only frames a row cites).
