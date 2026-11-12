# Inbound O-205: the cut cap fires on a collapsed dock (daraksha via value-js-63, measured on 11.0.0)

## Setup

daraksha's one dock (branch o1109-dock), as copied into `inbound-O-205/` (`probe2.mjs`, the run's `result.json`):
- GlassDock `fit-content`, `collapse="closed"`.
- The khatam in `#persistent` and the page glyph in `#collapsed`.
- The default slot holds `DockLayerGroup :show-switcher="false"` with two DockLayer faces (the drill-in pattern).

## What was measured

In Chromium, collapsed at rest and not morphing:
- `.glass-dock` has a 30 px radius on a 56–60 px box, so the shell is a stadium.
- The `.dock-plate` corners are [30, 4, 4, 30], meaning the inline-end arm of the cut cap is live. The collapsed pill shows one square end.

The cause: the hidden full run is still a live scroll container while the dock is collapsed. `.dock-run` scrollWidth − clientWidth is 214 px at 360–430 and 460–476 px at 820 and 1440. The active `.dock-face` is `inline-size: max-content` (`crossfade.css`), so it never shrinks into the collapsed box. The run's timeline then reports "more this way" on a run nobody can see or scroll.

Open, the dock is correct: [30, 30, 30, 30] at 430 and above. At 360 and 390 the open reader row really does overflow (by 70 and 40 px), and the cut there is the intended signal.

## Law and gates

This is O-187's law seen from the collapse side: **the plate reads exactly one timeline, the active visible run's, and only while that run is visible and scrollable.**
- A collapsed dock's hidden run is no scroll container and drives no cap.
- A collapsed plate holds its rest corner.
- The cure is at the root, in the same place as O-187's. Gating one keyframe is not the cure.

Gates, in Chromium and WebKit at 360, 390, 430, 820 and 1440, light and dark:
- The collapsed dock above (with the layer group, and with a plain run) has all four plate corners equal to the rest corner at rest.
- No collapsed dock has a scrolling `.dock-run`.
- The open dock's cut still fires exactly where the row truly overflows (360 and 390) and nowhere else.

Each gate must be RED on v10.1.4 where it reproduces there. If it does not reproduce on v10.1.4, say so, and keep the gate as a forward guard for 11.0.1.

## Second trigger (value-js-63, measured on 11.0.0): an OPEN dock with a hidden layer face

Repro: daraksha `/scripture/93` at 390×844, DPR 2, touch. The dock is open on its reader layer, and every active control fits. Even so, `.dock-run` scrollWidth − clientWidth = 43 px and the plate's inline-end corner is cut.

All of the overflow comes from the INACTIVE, inert DockLayer face. `.dock-face:not(.is-active)` is `position: absolute; inset: 0`, and its `.pages` content (four seats, one carrying a word) runs 43 px past the run's right edge. Absolute descendants count toward a scroll container's scrollable overflow.

**One root covers both triggers.** The run's timeline reads overflow nobody can see: the collapsed run, or a hidden layer face. The law sharpens to this: **the run's scrollable overflow is exactly the active face's content.** An inactive or leaving face contributes none, at rest and mid-crossfade. The cut still fires when the active face truly overflows.

Neither of value's suggestions is binding. They are `overflow: clip` or `contain: paint` on the inactive face, and gating the cap to the expanded state. Measure which root holds without clipping a leaving face's crossfade paint, and record why.

Added gates, in both engines at 360, 390, 430, 820 and 1440, light and dark:
- An open dock whose active face fits, and whose inactive face is wider, has `.dock-run` scrollWidth equal to clientWidth and all four corners at rest.
- Mid-crossfade between faces of different widths, the corner never cuts unless the incoming face truly overflows.
- The leaving face's crossfade paint is not clipped.
