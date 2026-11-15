# Orchestrator note: the Slider's lens and the reka-ui peer range (BINDING)

Two rows join 11.0.2 by the orchestrator's ruling, 2026-11-14. Both are defects on the published line that block a consumer's adoption; the owner called the first "totally broken" in his review.

## 1. The Slider's held-drag lens does not show unless asked for

On 11.0.1 every horizontal Slider raises the lens on grasp (`loupeShown` in `Slider.vue`: grasping and not vertical). In a consumer's layout it mis-renders: the row fades almost out, the track disappears, and a split capsule with no thumb, ticks or value floats about 90 px from the value, half-clipped in light. Frames: `~/.dev-logs/owner-1112/frames-o16/color/slider-lens.png`, `slider-lens-crop.png`, `slider-lens-light-crop.png`. There is no prop or token to switch it off.

Cure, smallest at the root: add a boolean prop `loupe` (default `false`); the lens mounts and shows only when it is `true`; the row's fade-out while grasping happens only with the lens. Nothing is removed or renamed; the lens's classes and tokens stay. The lens itself is repaired or deleted later, not here.

Witness: one Chromium cell and one WebKit cell: a slow held drag on a default Slider leaves the row's opacity at 1, the track painted, and no `.glass-loupe` in the document; RED on v11.0.1. A unit test that `loupe` gates the mount. CHANGELOG, in consumer prose: the magnifying lens during a drag is now opt-in with `loupe`.

## 2. reka-ui peer range

`package.json` declares the peer `reka-ui` as `^2.0`, but the Dialog overlay needs 2.10.1 or later (a consumer saw 39 unit failures on 2.9.9). Read which reka export or behaviour the overlay uses and the first version that has it; set the peer range to that floor (expected `^2.10.1`) and the dev dependency to match if it is lower. Witness: static (the range), and the unit suite green on the floor version installed once in a scratch copy inside the worktree, deleted after. CHANGELOG names the new floor.

One commit each, before the sweep's WebKit legs, so the sweep covers them.
