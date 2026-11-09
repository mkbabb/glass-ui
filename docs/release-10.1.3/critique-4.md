# 10.1.3 — critique, round 4 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `fa096339a` (17
commits over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. Read: every commit,
`implement.md`, `critique-1.md` to `critique-3.md`, the full `src/` diff
(`dockMorphMeasure.ts`, `useDockMorph.ts`, `useDockState.ts`, `GlassDock.vue`,
`styles/{index,layers,shape}.css`), the unchanged `useDockClickIntegrity.ts`, and fourier's
`web/e2e/f-w14v-au2.spec.ts` (read only).

Verdict: **the cure holds. Every asked gate is GREEN in both engines on the final source,
including the WebKit cells round 3 left owed.** No regression of an ask reproduced. Two
minor defects reproduced, both in paint during the morph, neither touching the click:

- D-1 is a degree regression against 10.1.2.
- D-2 predates the branch, and the branch's D-2 witness has a blind spot that hides it.

## How I attacked it

I wrote my own harness and spec rather than reuse earlier rounds'. One Vite server
(port 5298) served this worktree. Two trees were mounted from it:

- `branch`: this worktree's `src/` and `demo/`.
- `red`: `git archive v10.1.2 src demo`, extracted beside it. Only the seven cure files
  differ.

The harness is fourier's dock shape: a `fit-content` collapsible `GlassDock`, pinned in a
stage by one edge, with "Edit" in the persistent slot on the anchored or the open side. It
takes these query parameters:

- `?anchor=` right, left, center, top, bottom or vcenter.
- The forms, new this round: `shape=card|rounded`, `fit=0`, `pin=fixed`, `canvas=1` (a
  `backgroundCanvas` canvas dock), `static=1` (`backdropMode: "static"`), `mount=open`
  (`collapse: "open"`).
- A wide-summary variant: the summary is wider than the full pane, so the expand starts at
  scale > 1.

Each cell reads `getBoundingClientRect` and the painted opacity chain on every rAF. Paint
was checked with frozen-frame screenshots: the page's rAF is frozen after N morph frames,
so the screenshot is that exact frame.

Every run went through `guarded`:

- Chromium: Playwright's default headless shell.
- WebKit: build 2287, under `guarded --exclusive webkit`.

The WebKit crash `implement.md` records (12:37 onward) did not recur: every dock page
loaded.

The record is out of the tree, in `.claude/worktrees/critic4-10.1.3/`:

- `harness/`: the specs, configs and harness templates.
- `data/`: per-cell JSON and PNGs, tagged by tree and engine.
- `*.log`: the runs.

## Results

`critic4.spec.ts` ran 185 cells per tree in each engine. The red tree's WebKit run was a
58-cell subset, because the WebKit lock was held for hours by other repos' runs.

| attack | branch Chromium | branch WebKit 2287 | v10.1.2 Chromium | v10.1.2 WebKit |
|---|---|---|---|---|
| A. Hover expand per frame, 6 anchors × 360/390/430/1440 light, 390 dark (page reads dark): the first morph frame is the rest box, the anchored edge holds, the anchored seat stays under the pointer, nothing leaves the viewport | GREEN 30/30 (first frame 0 px off, seat ≤ 4 px off the pointer) | GREEN 30/30 | RED on every edge-anchored cell (first frame up to 121 px off, seat up to 101 px off) | RED (expand cells of the subset) |
| A. The fourier gesture: `locator.click()` on the collapsed dock's seat, anchored and open side, every cell above | GREEN 60/60 | GREEN 60/60 | RED 55/60 (only the centred anchored cells pass). 390 right: `pointerdown` on Edit at x 326, `pointerup` and `click` on the anchor box at x 225, fourier's 317 -> 215 | GREEN (WebKit does not focus on press) |
| F. Forms × right/left/bottom at 390, right at 1440: card, rounded, fit=0, fixed, canvas, static. Expand per frame and click | GREEN 48/48 | GREEN 48/48 | RED | — |
| W. Wide summary (scale > 1 at the first frame): expand per frame, right/left/center/bottom × 390/1440 | GREEN 8/8 | — | RED 4/8 (right and left) | — |
| T. Touch tap on the collapsed seat: right/left/bottom/center × anchored/open at 390 | GREEN 8/8 | GREEN 8/8 | RED 7/8 | GREEN |
| P. Press and hold 1.2 s on the collapsed seat, then release: the click lands once and the dock then expands | GREEN 4/4 (the dock stays collapsed during the hold, then expands) | GREEN 4/4 | RED 2/4 (the open-side clicks are lost) | RED 2/4 |
| M. Real reduce (`contextOptions`; the page reads reduce): the click lands and the expand jumps to rest | GREEN 2/2 | GREEN 2/2 | GREEN | — |
| C. Collapse per frame from a settled expand (mounted open, and hover then `collapse()`), right/left/center at 390/1440: the anchored edge holds, the seat and summary stay inside the plate, no jump | GREEN 12/12 | GREEN 12/12 | RED (drift 121 px, summary 60 frames outside the plate) | RED |
| R. Double reversal: hover expand, `collapse()` 120 ms in, re-hover 120 ms into the collapse. Anchored edge, summary and seat | anchored edge 0 px, summary 0 frames outside, seat 0 frames outside (fails only D-1's pane check) | same | RED (drift 121 px, summary 58 frames outside) | — |
| G. Guard race (b): approach the summary, then press and release on the arriving control mid-morph (right/left/center). No arriving control's handler runs | GREEN 3/3 | GREEN 3/3 | GREEN | GREEN |
| G-reflow. A non-morph move: at `pointerdown` on Edit the page moves the dock's anchor by 140 px, at rest and mid-expand. The seat's handler does not run | GREEN 4/4 | GREEN 4/4 | GREEN | GREEN |
| C (vertical: top, bottom) | RED 8/8, D-2 below | RED 8/8 | RED, identical settle | RED |

`useDockClickIntegrity.ts` and `constants.ts` are byte-identical to `v10.1.2`. Nothing in
the guard was widened, and no movement exemption was added. Ask (2) is met by the press
rule in `useDockState.ts`: an environmental expand waits for an in-flight press to
resolve. It is exact, with no timeout or tolerance. Every guard attack above behaves as
on 10.1.2.

These attacks did not hold up as defects:

- **The wide-summary cells.** The left-anchored click cell fails, and the left, right and
  centre collapse cells report the summary outside the plate. Both trees fail them
  identically, because the 260 px nowrap summary overflows the collapsed plate at rest and
  covers the seat. This is a harness artefact, not a morph defect.
- **WebKit, vertical, `collapse()` while the pointer rests on the dock.** The dock ends
  expanded, because the hover re-expands it. That is a gesture artefact.
- **A long press now holds the collapsed dock collapsed until release.** This is the
  intended ask-2 behaviour, not a defect. On 10.1.2 the dwell expanded the dock under the
  held press and lost the open-side click.

## The asked gates, re-run by me on the final source

| gate | Chromium | WebKit 2287 |
|---|---|---|
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts` (77) | 77/77 GREEN | 77/77 GREEN |
| The O-101 no-overflow cells among them (1440->390 and 390->1440; horizontal and vertical; pinned, collapsed, reversal, mid-expand; O-101a host change) | GREEN | GREEN |
| `release-10-1-3.spec.ts` (fourier's L2-15 at 360/390/430 and G-h at 1440, right and left, plus the critique-1, -2 and -3 cells) | 41/41 GREEN | 39 passed, 2 skipped (the CDP-touch cells are Chromium-only), including the 3 critique-3 reversal cells round 3 left unproven in WebKit |
| The fourier gesture on v10.1.2 (my A-click cells) | RED | GREEN by engine, since WebKit does not focus on press; its per-frame cells are RED |

Logs: `critic4-10.1.3/rel-chromium.log` (118 passed) and `rel-webkit.log` (116 passed, 2
skipped).

## Defects

### D-1 (minor; a degree regression against 10.1.2): an edge-anchored morph paints the full pane's open-side controls on the bare stage, ahead of the plate on expand and behind it on collapse

On an expand, the new origins lay the entering full pane at its rest from the first frame.
The plate grows from the anchored edge, so on the open side the pane's controls fade in
before the plate reaches them.

Expand, Chromium, 390, right-anchored, frozen frame 6
(`data/branch-chromium-headless-new-S3-right-f6-light.png`):

- The plate spans x 148-374.
- "View layers" (47-87), the first separator and "Publish" (116-156) paint fully opaque
  on the stage, left of the plate.

v10.1.2 at the same frame (`red-…-S3-right-f6-light.png`):

- The plate spans 89-321.
- Only "View layers" (53-93) pokes past its left end. The overhang there is symmetric and
  smaller.

Frame 3 tells the same story (both trees, light and dark): the branch has two controls
fully outside, 10.1.2 has one.

A collapse mirrors it. The leaving pane holds the box it painted and fades there while the
plate retracts toward the anchored edge.

Collapse, Chromium, 390, right-anchored, 60 ms in (`branch-…-S-collapse-60.png`):

- Ghosts of four controls show on the stage left of the plate.
- "Publish" is fully outside the plate on 8 frames at up to 0.44 opacity. v10.1.2: 0
  frames.
- Bottom-anchored: 7 frames at 0.44.
- WebKit: 4 frames at 0.50 (right) and 0.58 (bottom). v10.1.2: 0.

The double reversal (R) makes it worst: 18 frames at up to opacity 1 (right) and 13 at
0.92 (bottom).

"Publish" fully outside the plate on the expand, by anchor, against 10.1.2:

| case | branch Chromium | branch WebKit | v10.1.2, both engines |
|---|---|---|---|
| right-anchored, hover expand, 390 | 5 frames, opacity up to 1 | 1 frame at 0.77 | 0 frames |
| bottom-anchored, hover expand, 390 | 4 frames, opacity up to 1 | 2 frames at 0.77 | 0 frames |
| every right- and bottom-anchored A and F cell, 360 to 1440 | 1 to 6 frames each | — | 0 frames |
| left-anchored and centred cells | 0 frames | — | 0 frames |

Not affected: the anchored seat, the summary and the click. Every A, F and T cell is
GREEN.

The claim this contradicts: `implement.md` says the pane "lays out where it rests, inside
the reserved box; no frame paints content outside it". That is true of the reserved box,
which is the O-101 gate. It is not true of the plate the user sees. Nothing clips the
layers to the plate: the probe read `overflow: visible` and `clip-path: none` on the dock,
`.dock-controls` and `.dock-layers`, and the layer's own overflow clip is the reserved
width.

Critique-3 D-1 cured exactly this class for the summary pane, by holding its rest at the
end scalar. The full pane on an edge-anchored morph has the same class, and the branch
makes it larger. A cure could:

- clip the layers to the plate's visible extent during `[data-morphing]`; or
- extend the full pane's opacity ramp on the open side so nothing is opaque outside the
  plate.

The witnesses should then assert "every visible control inside the plate" per frame, on
expand and collapse, which is fourier's L2-15 predicate applied to every frame.

### D-2 (minor; predates the branch, identical on v10.1.2): a vertical collapse snaps at settle, and the branch's D-2 witness cannot see it

Reproduction (Chromium and WebKit, 390 and 1440, top- or bottom-anchored vertical dock),
from a settled expand to `collapse()`:

- Through the morph the anchored edge holds exactly: bottom 554, then 450 to 554 at the
  last morph frame.
- On the first settled frame the box paints at 485.9 to 518.1. That is 32 % of its
  height, centred. The anchored bottom edge jumps 36 px, and top-anchored 37 px.
- It then re-grows to its rest over about 200 ms.
- v10.1.2 paints the same settle frames (top: 53.3 to 88.7 on both trees).

Cause, read in the computed style (`data/*-S-vsettle.json`):

- `shell.css:401-411` gives the vertical dock a `scale var(--dock-motion-resize)`
  transition and suppresses it only under `[data-morphing]`.
- At settle the attribute clears, the reservation and the morph's `scale: 1 0.3216` drop
  together, and the transition re-arms.
- `scale` therefore eases from 0.32 to `none` over the already-collapsed 110 px box.

A horizontal dock has no such leg, so it does not snap.

Why the witness misses it: the branch's
`D-2 · the collapse shrinks toward the anchored edge and settles without a snap` (bottom,
390) checks only the morph frames and compares the last one with a box read 1.7 s later,
after the re-grow. It passes while the snap paints. Its own title claims "settles without
a snap".

A cure could leave `scale` out of the vertical at-rest transition for the frame the morph
releases, or move the hover/press polish onto `transform`. The witness should also read
the first frames after `[data-morphing]` clears.

## Not defects (attacked, held)

- **The jump** reproduces on v10.1.2 (Edit x 326 -> 225 at 390, fourier's 317 -> 215) and
  is gone on the branch:
  - every anchor (right, left, top, bottom, both centred);
  - every form (pill, card, rounded, fit=0, fixed, canvas, static);
  - light and dark, 360 to 1440, both engines;
  - including a summary wider than the full pane, an expand that starts above scale 1,
    which no earlier round tried.
- **Clicks on a seat land through the expand**, by pointer (60/60 per engine), by touch
  (8/8), and under a 1.2 s hold (4/4), on the anchored and open sides.
- **The guard** still drops race (b), and a seat moved by a page reflow, at rest or
  mid-morph, does not activate. Its source is byte-identical, with no tolerance and no
  exemption.
- **Morph regressions**:
  - The horizontal collapse holds its anchored edge (0 px) and settles with no snap.
  - The reversal and the double reversal hold the anchored edge, with the summary inside
    the plate.
  - Reduced motion jumps to rest and the click lands.
- **The O-101 gate and the 77-cell release spec** are GREEN in both engines on the final
  source.
- **No public API changed:** `index.ts` and the prop contract are untouched, and the new
  custom properties are internal.

## Housekeeping

- The harness (`tests-visual/_critic4/`, untracked) was removed from the branch worktree
  after the runs. A copy is in `critic4-10.1.3/harness/`.
- `git status` on the branch shows only this file.
- No Vite server is left on 5298.
- Some of my short Chromium probes (S, S3, W) ran while my own queued WebKit run was
  waiting for, or briefly holding, its lock.
