# The animation audit — brief

The owner, direct, 2026-11-12 21:52:

> Subtle animations, like endings, tabs toggling, dock ending and starting--animations throughout the UI components need refinement at the beginning and end. A fastidious and greater animation study should be performed frame by frame, and as a gestalt, on each and every glass component. Things like our sliders, tabs toggle with drag, etc, should be scrupulously examined for jitter, jank, and error

What it asks for: every glass component, every animation it has, read twice. Once frame by frame, with numbers: where the first frames jump, where the last frames snap or creep, where a value goes backwards, where a frame is dropped. Once as a whole: does the motion read as one gesture with a beginning and an end. Dragged interactions (the Slider, the Tabs indicator dragged between tabs, a Sheet dragged, the dock's run scrolled or dragged, the sortable list, the carousel) are named and come first.

The laws it is held to (docs/precepts): motion-canon P0 (every change is tweened from its beginning to its end), affordance-map "Intent first", restraint ("NO overuse of shading, transition, or markup"). The measured grammar in `../../design/intent-motion/STUDY.md` gives the ranges for in and out.

Already known, not to be rediscovered but to be confirmed and placed in the ranking: `../../design/intent-motion/CENSUS.md` (the snaps read from source, the twenty worst), `../inbound-critiques/` (fourier's and color's findings with frames), W-I.8's measured dock faults (content outside the closing plate; the one-frame drop; the sibling jump), W-B.18's Slider measurements.

What comes out: one record per component family with strips and a per-frame table for each fault; one ranked list across the library; each fault placed in a release (a patch if it is a cure with no API change, else the wave that owns it); one page for the owner with the worst ten as strips.
