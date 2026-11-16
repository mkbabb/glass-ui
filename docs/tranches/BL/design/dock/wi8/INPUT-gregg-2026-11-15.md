# Input to the dock loop: three rows from Gregg's twenty docks on 11.1.0 (2026-11-15)

Probes, read-only: `~/Programming/gregg/.shots/p44s-open-probe.mjs` and its siblings.

1. **A persistent-end that yields while open.** A folded dock at 320 and 360 cannot give its run the persistent-end pair's room. Moving `#persistent-end` out of flow makes the morph latch the closed chrome, hold 238 px, then step to 199 px at the settle. The redesign's many-seats rule must say what the trailing persistent seats do when the open run needs their room on a narrow screen.
2. **The run snaps its direct children**, so a group of tabs is one snap point and WebKit pins the row at 0. Snap points belong to seats, not to the run's direct children.
3. **ScrollProgressRim edge="border" as a scroll-timeline mode** with a hard edge that works in WebKit: today it cuts at its value prop, so following the scroll re-renders every frame.
