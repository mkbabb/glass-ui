# 11.0.2 build seat C: O-261, O-262, O-263 (atlas's three), O-271, O-270, O-282, the Slider geometry

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.0.2`, branch `release/11.0.2`,
on seat B's record (9e466fba9). Atlas's three fixes are one commit, f9c58b03f on
`u/ow-integ-glass`. The tip the orchestrator names, 155db871d on `u/b7-glass`, is that commit
plus a bundle-ratchet rebind, so the source I reviewed is f9c58b03f's. Each part was reviewed
against this branch and taken as its own row.

## Setup

- Seat A's RED trees (`.cache/red-v11.0.1/tree`, `.cache/red-v11.0.0/tree`).
  `scripts/build-C-sync.sh` copies the 11.0.2 spec, config, harnesses and any named test into
  both before a run there.
- Every visual run brings its own vite through the Playwright `webServer` on the tree's port
  (5341 branch, 5342 v11.0.1, 5343 v11.0.0), so no server of this seat outlives its run.
- Chromium runs through `scripts/build-C-chromium.sh` (`chromium-headless-new` and
  `coarse-touch`). WebKit runs through `scripts/build-C-webkit.sh` (Playwright WebKit 2287,
  `guarded --exclusive webkit`). The chains are `scripts/build-C-chain{1..9}.sh` and
  `scripts/summary.py` prints a report's cells. Every WebKit cell is 2287.
- New harnesses under `tests-visual/release-11-0-2/`: `pager`, `wheel`, `rail`, `rows`,
  `radius`, `hover`, `geometry`. New cells in `tests-visual/release-11-0-2.spec.ts`:
  `pager ·`, `wheel ·`, `rail ·`, `rows ·`, `radius ·`, `hover ·`, `geometry ·`.
- Every guarded run was admitted. Several waited, for the WebKit lock or for headroom
  (the 1-minute load reached 357 from other sessions at 17:23). The ARMED zone warning
  printed on every run; it contains the word "REFUSED" in its text, but no run was refused.

## Rows

| row | commit | disposition |
|---|---|---|
| O-261 | 065ae4240 | landed: atlas's pager part, source, unit test, cell, CHANGELOG |
| O-263 | b512568d4 | landed: atlas's run.css part, lattice test, cell, CHANGELOG |
| O-262 | 5afae24e9 | landed: atlas's dockMorphMeasure part, rebased onto 11.0.1's one-axis measure |
| O-271 | cbe498028, reverted by 648d70e59 | moved: its run.css broke WebKit's focus-ring room (release-10-1-5 k3, s2) |
| O-270 | e7f07b2c9 | landed: triggers and tab seats take the icon control's corner |
| O-282 | b38339c26 | the 0 px spec landed (test only); the cause does not reproduce in glass, see below |
| Slider geometry | 0e3cbfb3d, 8ec460733 | landed, with one open defect: O-219's minimum-contrast floor (below) |

Witness tables read v11.0.1 / branch. Logs and reports are under `logs/` by the names given.

### O-261: the pager worm's dot

- **Review.** The branch's `worm.ts` was that commit's parent text, so it was taken as is.
  Only the comment was reworded, to drop atlas's row stamp.
- **Root.** `measure()` parsed `--pager-dot-size`, an unregistered custom property that
  computes to its token text (`.75rem`), as 0.75 px, so the neck spanned gap / 0.75. D is now
  a worm body's `offsetWidth`, which the same token sizes.
- **Witness.**
  - Unit: `tests/components/pager-dots/worm-dot-px.test.ts` is RED on v11.0.1 (neck 302 > 40)
    and GREEN on the branch (`o261-unit-*`).
  - Cell `pager ·`: the widest painted neck over four hops.

  | tree | chromium | coarse | webkit |
  |---|---|---|---|
  | v11.0.1 | RED 300.6 px | RED 515 px | RED |
  | branch | GREEN 18.8 ≤ 40 | GREEN 32.3 ≤ 56 | GREEN |

  Logs `o261-o263-*`, `c-cells-branch-webkit`.

### O-263: the run's overscroll axis

- **Review.** Same rules at 11.0.1's lines. `useDockRun`'s JS end containment reads only the
  run's own axis, so it needed no change; its comment now names the per-axis property.
- **Witness.**
  - Unit: `g-dock-lattice`'s per-axis assertions are 2 RED on v11.0.1 and GREEN on the branch.
  - Cell `wheel ·`: a vertical wheel over a horizontal run moves the page (fine pointer
    only), and each run's computed axes are checked.

  | tree | chromium | coarse (axes) | webkit |
  |---|---|---|---|
  | v11.0.1 | RED (moved 0, y contain) | RED | RED |
  | branch | GREEN (moved 300) | GREEN | GREEN |

### O-262: the edge-anchored dock's morph origins

- **Review and rebase.** 11.0.1's `dockMorphMeasure.ts` measures one axis, against the layers
  box, with the band hold and the morph-frame skip. Atlas's had two axes and the growing rule.
  Parts (b) and (c), in `anchorPanes`, applied as written, with the "painted nothing" test
  read on the span (`to.size > 0`, since this branch's boxes are spans). Part (a) is
  re-expressed:
  - `capture(arming)`, with `measure: () => capture(true)`;
  - `lastExpandedPx` is recorded after the band hold, with `lastPostureExpanded`;
  - both are cleared in `attach()`.
  - A collapse arm takes the last expanded endpoint instead of re-reading the pane the
    consumer has just emptied.
- **Witness.**
  - Unit: three `dockMorphMeasure` cases from atlas, its stamps removed. RED on v11.0.1
    (`56px` for `592px`, −64.5 off the anchored edge, `277.5%` for `−60%`), GREEN on the
    branch (28/28).
  - Cell `rail ·`: atlas's rail reduced to its morph (`rail-harness`), its close and its
    open, read per frame.

  | tree | chromium | coarse | webkit |
  |---|---|---|---|
  | v11.0.1 | 2 RED (close's first frame 68 px tall from a 452 px rest) | 2 RED | 2 RED |
  | branch | 2 GREEN | 2 GREEN | 2 GREEN |

- **Re-witness.** The release-10-1-2 reversal titles and the release-10-1-5 spec are in the
  sweep (below).

### O-271: dock rows overflow 4 to 8 px (reverted, moved)

**Revert.** The sweep on 0e3cbfb3d ran WebKit 2287 over release-10-1-5 for the first time
since this row. Three cells failed there that pass in seat B's sweep:

- `k3 at 320`: the end seat's ring stands 0.94 px past the run;
- `s2 O-201` at 1440 and at 390: the home seat's ring is cut by the layer box, 0.63 to
  3.63 px, growing one pixel per pixel of cap through the fit edge.

Chromium passes all of them. With 5afae24e9's `run.css` on the same tip, all four WebKit
cells pass (`logs/bisect-o271-pre-webkit`), so this row's `run.css` is the cause. It is
reverted whole by 648d70e59 (the source, the `rows ·` cells, the harness and the CHANGELOG
clause). The reading below stands for the next seat. The likely part is the spacer's
trailing negative margin: in WebKit the run's scroll range no longer reaches the ring past
the end seat. A cure must keep the end padding counted in WebKit's scroll overflow.


- **Reading.** `rows-harness` holds fourier's three compositions:
  - `transport`: the animation dock, a face sized from glass's tokens in an inline-size
    container;
  - `editor`: `fit-content`, with a `w-full` row;
  - `stretched`.

  Each was read at 360, 390 and 1440. v11.0.1 overflows exactly as fourier reports:

  | scene | v11.0.0 | v11.0.1 |
  |---|---|---|
  | transport | 278/278, 890/890 | 286/278 and 898/894 |
  | editor | 160/160 | 172/168 |

  Only the stretched dock fits on v11.0.1.
- **Two causes, both new in 11.0.1.**
  1. The layers after a leading persistent region moved from `--dock-layer-gap` (6 px) to the
     gap plus the reserve (10 px), so every such dock's chrome grew 4 px, and fourier's face,
     sized from the 11.0.0 chrome, overflowed.
  2. The run's end padding became a spacer box with `padding-inline-end: 0`, which made the
     content box 4 px wider than the slot, so a `width: 100%` child plus the spacer overflowed
     by 4.
- **Cure (`run.css`).**
  - After a leading persistent region the room is `max(gap, reserve)`: the run's clip reaches
    into the gap the dock already had and stops 2 px short of the region's seats.
  - A vertical dock's trailing room is `max(0, reserve − gap)`, since its flex gap already
    lies there.
  - The horizontal run keeps its end padding. The spacer's trailing margin takes the
    padding's length back, so the spacer lies in that padding and still counts as overflow in
    WebKit.
  - A horizontal dock's trailing persistent region keeps the reserve: no gap lies there to
    take it from, and without it the clip would sit over the end seat.
- **Witness.** Cell `rows ·`: the root's and the run's scrollWidth equal their clientWidth,
  no element is a horizontal scroller, and the page does not scroll sideways.

  | tree | chromium | coarse | webkit |
  |---|---|---|---|
  | v11.0.0 | 9 GREEN | transport 3 RED (below), 6 GREEN | |
  | v11.0.1 | 6 RED, stretched 3 GREEN | 6 RED | 6 RED, stretched 3 GREEN |
  | branch | 9 GREEN | 6 GREEN, transport 3 skipped | 9 GREEN |

  The coarse transport cells skip, with the reason in the test: fourier's own formula counts a
  40 px layer square where coarse lays out a 44 px seat, so they are RED on v11.0.0 as well
  (283/274). That is fourier's formula, not this regression. Logs `o262-o271-*`,
  `o271-v1100-*`, `o271-o282-branch-chromium`.
- **Re-witness.** The release-10-1-5 and release-11-0-1 specs are in the sweep (below).

### O-270: every dock seat's corner is half its block size

- **Root.** `DockTrigger` (dropdown, select, popover) and `shape="tab"` DockControl rounded to
  `--radius-pill` (1rem) on 32 to 40 px seats.
- **Cure.** Both now read the icon control's value,
  `var(--dock-control-radius, calc(var(--dock-control-size, var(--size-icon-btn)) / 2))`.
  No seat is taller than the control cell (measured: triggers 32 to 36, tabs 38, controls 40,
  coarse 44), so the engine's clamp makes it half each seat's own block size. A raw length
  such as `9999px` would read the same, but token-hygiene rules raw radius lengths off the
  ladder.
- **What a critic should check.**
  - Tabs and triggers paint on the content box with inline padding larger than block padding.
    A corner of half the block size therefore leaves no flat side (the vertical inner radius
    is half the plate's height), but the ends are elliptical by the padding difference. A
    circular end would need the seat's block size in CSS, which a trigger does not have.
  - A primary-tier tab outside a dock (4rem tall) is taller than the cell and keeps a
    smaller corner.
- **Witness.** Cell `radius ·`: a static dock on one flat ground with the seats' ink hidden.
  In a screenshot, the unpainted area in each corner of each seat's plate (rest, hover, open
  and active) is compared against the area a corner of half the block size leaves, with a
  floor of 0.8 times it.

  | tree | chromium 1440 / 390 | coarse 1440 / 390 | webkit 1440 / 390 |
  |---|---|---|---|
  | v11.0.1 | RED / RED | RED / RED | RED / RED |
  | branch | GREEN / GREEN | GREEN / GREEN | GREEN / GREEN |

  RED reads trigger 49.2 to 49.7 against a floor of 55.4, and tab 49.3 to 54.7 against 62.0.
  GREEN reads trigger 63.2 and tab 70.4 to 77.1. Logs `o270-*`, `c-cells-*-webkit`.

### O-282: the dock must not shift when a seat is hovered

- **Reproduction in glass.** `hover-harness` seats:
  - DockControl: icon, labelled, compact and tab, plus one inside a Tooltip;
  - DockTrigger: dropdown, and a popover one with a text label and fourier's
    `--dock-trigger-min-height`;
  - DockBackgroundToggle and DarkModeToggle;
  - a slotted button and a slotted link;
  - a `#persistent` and a `#persistent-end` seat.

  It runs in pill, rounded and card, horizontal and vertical, expanded and collapsed (12
  cells), plus daraksha's pair of `fit-content` docks (`?site=daraksha`). Each seat is hovered
  past the tooltip's 700 ms open delay and left, and every dock root's
  `getBoundingClientRect` is sampled each frame.
- **Result.** 0 px in every frame, for every seat, in Chromium and WebKit 2287, on v11.0.1
  and on the branch. No ResizeObserver loop error was counted anywhere. Logs `o282-*`,
  `o282b-*`.
- **Static reading.** I found no seat hover rule that touches layout:
  - every dock `:hover` sets only background, colour or `box-shadow`;
  - the hover scale was deleted earlier;
  - `vSpecular` writes only `--mouse-x`/`--mouse-y`;
  - `useLiquidPress` arms only with a button down;
  - tooltip content is portalled.
- **Disposition.** The cause the owner sees is not in glass's own seats, or it is a paint
  shift that a layout box cannot see, so no source change was made. Two candidates are
  untraced:
  1. the vertical dock's hover-only `will-change: transform` (`shell.css`, `.glass-dock.vertical:hover`),
     which promotes a layer and can re-snap sub-pixel paint without moving the box;
  2. a site's own hover styles.

  I did not read any consumer page live, so no site file and line is named. Since the cause
  is not found, whether it exists on 10.1.6 cannot be said. The spec stands as the guard the
  orchestrator asked for.

### The Slider geometry (orchestrator-note-slider-geometry.md)

- **Root.** The scrubber's thumb was `--slider-thumb-size` (8/16/24 px) inside a 12/20/28 px
  band, `min()`'d to it. It sat off the fill's end-cap centre by (H − d)/2 and short of the
  track's round ends at 0 and 100. The spectrum's handle was a 0.75 × thumb bar whose corners
  stood outside the track's round end.
- **Cure (`styles.css`, the sizing comment, DESIGN.md's rung text).**
  - One height and one radius: `--slider-radius: calc(var(--slider-track-height) / 2)` on the
    root, read by the track, the fill and the thumb.
  - The scrubber's thumb is the band's height on both axes, and the lane's cut is the band
    height, so the centre travels H/2 + p(W − H).
  - The fill's cap is drawn 0.25 px short, inside the thumb (R-4).
  - The spectrum handle is a ring of the band's height, and its `corner-shape` fork goes.
  - The `min()` rule goes.
  - No prop, token name or DOM node changes. `--slider-thumb-bg` stays. The press deform and
    the paint stay for 11.2.0.
- **Witness.** Cell `geometry ·`, over `geometry-harness`:
  - sm, md and lg, horizontal and vertical, scrubber and spectrum, plus inverted, RTL and
    vertical inverted;
  - at 0, 1, 5, 25, 50, 95, 99 and 100, in light and dark;
  - thumb diameter, centre on the line, cross centre, fill cap and fill height, each within
    0.5 px.

  | tree | chromium | coarse | webkit |
  |---|---|---|---|
  | v11.0.1 | RED (diameter −4, line up to 9, cap 2) | RED | RED |
  | branch | GREEN (worst 0.25, the cap drawn short) | GREEN | GREEN |

  - `slider.size-tokens` was restated to the one-height law (3 RED on v11.0.1, GREEN on the
    branch).
  - The radius canon's corner-shape fork register now counts two.
  - `slider-forced-colors.spec.ts` (O-267) is GREEN on the branch in both engines.
  - Logs `geo-*`, `geo2-*`, `geo-fc-*`, `slider-geo-unit-*`.
- **Open defect: O-219's floor.** The sweep's `slider · a scrubber at its minimum draws its
  value` (seat B's guard for O-219) fails at every rung, in chromium-headless-new,
  coarse-touch and WebKit:

  | rung | diff (floor 8) |
  |---|---|
  | sm | 7.95 |
  | md | 6.90 (WebKit 7.05) |
  | lg | 6.32 (WebKit 6.44) |

  The structural checks pass: the value is 50, the thumb is painted at opacity 1, and the
  fill is the thumb wide less 0.25. What changed is paint. At the minimum the fill now lies
  wholly under the thumb (R-3 puts the thumb in the track's round end), so the leading end
  shows the `--card` disc on the light `--muted-medium` track and the fill's ring no longer
  shows round it. The prototype answers this with paint: 87b3d259c gives the track a
  `currentColor` ink and the dark thumb `--foreground`, and fe30f9882 adds knob and shell
  tones. The orchestrator's note limits this release to geometry, so I did not take that
  paint, and I did not lower the floor. The orchestrator must rule: admit the prototype's
  track ink and thumb tone into 11.0.2, or restate O-219's floor for a thumb that fills
  the band.
- `tests/components/a11y/coarse-target.test.ts` checked the source text of the old
  inscribed disc. It was restated by 8ec460733: the thumb is the track's height and the
  lane's cut is the same height, so the target is still the track.
- **Harness note.** The RTL cell passes `dir="rtl"` to the Slider as well as to its wrapper.
  With the wrapper's `dir` alone, reka places the thumb left to right while the lane's
  logical insets follow the page. That is how reka reads direction, on v11.0.1 as on the
  branch, not a geometry fault.

## The ResizeObserver-loop check (atlas's WebKit speedtest note)

No hover, rows or rail cell counted a "ResizeObserver loop" error in either engine. One path
in `dockMorphMeasure.ts` can produce WebKit's message:

1. A seat in a vertical run resizes, which is a child entry, one level below the run.
2. `capture()` runs `publishYield`, which writes `--dock-run-room-block`.
3. That changes the run's `padding-block` and so its content box.
4. The run is observed at the default content box and is shallower than the seat that
   triggered the round, so its new size is undelivered in that frame and arrives in the next.

The write is idempotent the second time, so it settles in one frame. The candidate is not yet
traced on atlas's page. Toggling `data-run-fits` changes only the spacers' shrink inside the
run, so the horizontal run is not exposed this way. No other glass ResizeObserver callback
writes a size on a box it observes.

## Not taken

- **O-288 / O-300** (`orchestrator-note-dock-fold-content.md`, the fold lets content stand
  outside the plate; a slotted control's transition) is placed with "the next free build or
  fix seat". This seat did not take it.

## The sweep and the final gates

**On 0e3cbfb3d** (`scripts/build-C-chain8.sh`, then `build-C-chain10.sh` after I stopped
chain8 by PID following its Chromium leg):

- **Chromium.** chromium-headless-new and coarse-touch over release-11-0-2, 10-1-2,
  10-1-5, 11-0-1 and 11-0-1-daraksha: 417 passed, 19 skipped (each with its fine-pointer
  or one-cell reason) and 6 failed, all of them O-219's floor.
- **WebKit 2287.**
  - Over 11-0-2, 10-1-2 and 10-1-5: 202 passed and 3 skipped; 5 failed, O-219 md and lg
    plus O-271's three.
  - Over 11-0-1 and daraksha: 11 passed.
- **Gates.** `demo:dist:build` exit 0 and typecheck exit 0. Vitest had one failure, the
  coarse-target source-text check (restated in 8ec460733).

**On the tip after the revert** (`build-C-chain11.sh`): unfinished. The chain did not
complete its Chromium leg (`logs/chain11-C.out` is empty); critic 1's runs on 648d70e59
cover what it owed (`critique-1.md`, sections 1 to 5).
