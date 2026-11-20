# Orchestrator note — O-288 and O-300: the fold lets content stand outside the plate (owner, 2026-11-12)

The owner on daraksha: "there's a bug with the slider if you interact with it and the dock collapses, the slider doesn't too. All should animate."

daraksha measured the cause on 11.0.1 (frames `~/.dev-logs/owner-1112/frames-4th/`): it is the fold itself. The dock's content holds full strength for about the first 45 % of the fold (`--child-reveal` stays at 1) and the plate clips only its own glass, so a wide control stands 13 px past the closing plate's edge at 1440 at full opacity, then drops from 1 to 0 in one frame.

BINDING, joins this release; the next free build or fix seat takes it; a critic that finds it absent files a blocking defect.

1. Reproduce: a dock holding a wide control (a Slider at full run width, and a row of seats), fold it, and sample every frame: the content's painted box against the plate's painted box, and the content's opacity.
2. Cure at the root: through the whole fold, in and out, no content pixel paints outside the plate, and content opacity never changes by more than an eased step between two frames. Either the plate clips its content (one clip on the element that already morphs; no new wrapper unless measured necessary) or the content's reveal follows the plate from the fold's first frame. Say which and why. Do not break the O-101, p1, p2, s2 and fit-edge cells.
3. O-300 (a): a control slotted directly into the dock's run keeps its own transitions. The run's seat rule must not overwrite a slotted control's `transition` (it replaces the list today with `inline-size`). Witness: a slotted button's hover tween runs inside a dock as it does outside.
4. Gates, Chromium and WebKit, 390 and 1440, light and dark, both orientations: content-inside-plate at every sampled frame of fold and unfold; no one-frame opacity drop; RED on v11.0.1, GREEN on the branch.
