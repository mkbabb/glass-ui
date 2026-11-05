# 10.1.3 — critique, round 8 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `9e11e5081` (34 commits
over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. I read every commit, `implement.md`,
`critique-1.md` to `critique-7.md`, the `src/` diff (`dockMorphMeasure.ts`, `useDockMorph.ts`,
`useDockState.ts`, `GlassDock.vue`, `styles/{dock,index,layers,shape,shell}.css`), the click
guard (`useDockClickIntegrity.ts` and `constants.ts`, both unchanged from `v10.1.2`), and
fourier's L2-15 cell (`fourier-analysis/web/e2e/f-w14v-au2.spec.ts`, read only).

Verdict: **no defect reproduced.** Every attack below that discriminates is RED on v10.1.2 and
GREEN on the branch, in Chromium and Playwright WebKit 2287. The asked gates are GREEN in both
engines. The guard-parity cells are GREEN on both trees, as they should be.

## How I attacked it

- **Scene.** fourier's canvas dock: a `fit-content` collapsible `GlassDock` in a positioned
  anchor box pinned by one edge of a 560 px stage, "Edit" in the persistent slot on the anchored
  side (`#persistent-end` for right, bottom and centre; `#persistent` for left and top). Query
  parameters:
  - `anchor=right|left|center|top|bottom`
  - `pin=fixed`: the detached, viewport-pinned dock
  - `move=1`: Edit's own `pointerdown` inserts an "Imposter" seat where Edit painted, pushing
    Edit toward the open side. This is a non-morph reflow.
  - `two=1`: a second dock on the stage.
- **Trees.** One Vite server on 5318 served both trees.
  - `branch` is this worktree's `src/`.
  - `red` is `git archive v10.1.2 src demo`, extracted beside it. `demo/` is unchanged since
    v10.1.2.
  - The harness was mounted at `tests-visual/_critic8/` and removed afterwards.
- **Engines.**
  - Chromium: Playwright's default headless shell for my harness, and the repo's
    `chromium-headless-new` for the release specs.
  - WebKit: build 2287 (`webkit-2287.config.ts`), always under `guarded --exclusive webkit`.
  - Every run went through `guarded`, serially.
- **Per frame.** One rAF sample per frame records the dock box and Edit's box. It also records
  every `[data-witness]` element whose painted opacity is above 0.1 (the product up to the
  anchor box), cut by every ancestor whose computed overflow clips. "Ink outside" counts frames
  where such an element lies more than 1 px past the plate on the morph axis.
- **Records.** In `.claude/worktrees/critic8-10.1.3/`:
  - `harness/` holds `h.tpl.ts`, `critic8.spec.ts`, `paint.spec.ts` (critique-7's frozen-frame
    paint cell, re-pointed) and `critic8.config.ts`.
  - `data/*.json` holds per-cell data, tagged by tree and engine.
  - The logs are `c8-*.log`, `f-*.log`, `q-*.log` and `rel-*.log`, with `chain2.sh` the serial
    chain.

## Results

`first` is the first `[data-morphing]` frame's distance from the rest box. `drift` is the
anchored edge's largest move. `seat` is Edit's centre's largest distance from the resting
pointer. `ink` is frames with visible content outside the plate. Ranges are over the cells,
centre excluded from `first`, `drift` and `seat`; see the note below.

| attack | branch Chromium | branch WebKit 2287 | v10.1.2 Chromium | v10.1.2 WebKit 2287 |
|---|---|---|---|---|
| **M.** Hover expand per frame. 5 anchors × 360/390/430/1440 light, plus 5 anchors at 390 dark (25 cells) | 25/25. first 0, drift 0, seat 4 px (the posture padding delta), pointer inside Edit on every frame, ink 0, no frame leaves the viewport | 25/25, same figures | RED 25/25: first 116-121 px, drift 116-121, seat up to 101 px, pointer outside Edit on up to 17 frames, ink up to 58 frames. The centre cells fail on ink only: their first frame is the rest box | RED 25/25: the same, ink up to 48 frames |
| **M.** Playwright `locator.click()` on the collapsed anchored seat (25 cells) | 25/25, Edit once | 25/25 | RED 20/25 (0 clicks). The 5 centre cells are GREEN | 25/25 GREEN (WebKit does not focus on press) |
| **D.** Detached dock (`position: fixed`), right, left, bottom at 390: per frame, then click | 3/3 | 3/3 | 3/3 RED (first 116-121 px) | 3/3 RED |
| **F.** A focus with no press (`Edit.focus()`, as a keyboard or AT focus lands), right, left, bottom at 390: the dock expands at once. Per frame, then Enter | 3/3. The focused seat holds, and Enter activates it once | 3/3 | 3/3 RED (seat 101 px away, ink 56 frames) | 3/3 RED |
| **T.** Touch tap at `deviceScaleFactor: 3`, right, left, bottom at 390 | 3/3, Edit once | 3/3 | 3/3 RED (0 activations) | 3/3 GREEN |
| **P.** Pen press and release (CDP `pointerType: "pen"`, 120 ms down), right, left, bottom at 390 | 3/3 | skipped (CDP) | 3/3 GREEN: does not discriminate | n/a |
| **R.** Resize mid-collapse: expand at 1440, `collapse()`, resize to 390 120 ms in; and 390->1440. Right and bottom | no frame leaves the viewport, ink 0, settles on the anchor's edge | the same | ink up to 119 frames, drift 121 | ink up to 90 frames |
| **X.** Hover thrash: 6 in/out at 90/50 ms, then rest. Right, left, bottom at 390 | 3/3. drift 0, ink 0, settles at rest | 3/3 | 3/3 RED (drift 116-121, ink up to 226 frames) | 3/3 RED (ink up to 172) |
| **G.** Guard, non-morph move. Imposter inserted where Edit painted on Edit's `pointerdown`, collapsed and mid-expand, right and left | 4/4: Imposter never activated | 4/4 | 4/4 | 4/4 |
| **B.** Two docks. A press on dock A dragged off and released over dock B; dock B then hover-expands | 1/1 | 1/1 | 1/1 | 1/1 |
| **RM.** Reduced motion (a real reduce, `contextOptions`; the page reads `reduce`), right at 390 | click lands, drift 0 | the same | the same | the same |
| **Q.** Paint, dark. The page's rAF and animations are frozen on the first morph frame, and no pixel outside the rest box (+3 px) may change by more than 48 in a channel. Right, left, bottom, centre at 390; right at 1440 | 5/5 | 5/5 | not rerun (critique-7: 10/10 RED) | not rerun |

Notes on the harness, not the dock:

- **Centre.** In a centred dock, a seat in `#persistent-end` rides the growing edge on both
  trees. Edit moves 117 px on both. That was the behaviour on 10.1.1 and is not the anchored
  case, so the cell records it and does not assert it. The first frame is the rest box on both
  trees.
- **R, bottom.** The settled dock's bottom is 6 px above the anchor box's bottom on both trees,
  at rest as well. That gap is the anchor box's line box under an `inline-flex` dock. The
  corrected cell compares the anchored edge for right only.
- **K.** Shift+Tab from outside reaches Edit in Chromium (2/2 GREEN, RED on v10.1.2). WebKit's
  default keyboard navigation skips buttons, and lands on the summary's "Expand dock" instead.
  F replaces K in WebKit.
- **First thrash run.** The first run waited 3.2 s, which is under `DOCK_COLLAPSE_DELAY_MS`
  (3600). The rerun waits 5.2 s.

## The asked gates, re-run on `9e11e5081`

| gate | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| `release-10-1-1.spec.ts` (25) + `release-10-1-2.spec.ts` (52): the 77 release cells | 77/77 GREEN | 77/77 GREEN |
| O-101 no-overflow cells (1440->390, 390->1440; horizontal and vertical; pinned, collapsed, reversal, mid-expand) | GREEN, among the 77 | GREEN, among the 77 |
| `release-10-1-3.spec.ts`: the fourier ports and the critique cells | 60/60 GREEN | 58 passed, 2 skipped (the CDP-swipe cells are Chromium's) |
| total (`rel-chromium.log`, `rel-webkit.log`) | 137 passed | 135 passed, 2 skipped |

## Defects

None reproduced.

## Attacked and held (not defects)

- **The jump.** It reproduces on v10.1.2 for every edge anchor (left, right, top, bottom), at
  every width, in light and dark, attached and detached, in both engines. The worst case is
  Edit moving 101 px at 390 right, beside fourier's 317 -> 215. On the branch it is gone:
  - the first morph frame is the rest box;
  - the anchored edge holds;
  - the pointer stays inside the seat on every frame.
- **Clicks through the expand.** They land by mouse (Playwright click), by touch (a tap at
  DSF 3), by pen, and by a focus with no press followed by Enter, in both engines.
- **The guard is exact.** `useDockClickIntegrity.ts` and `constants.ts` are byte-identical to
  v10.1.2.
  - A click whose target the consumer moved, collapsed or mid-morph, never reaches the control
    that took its place. Both trees agree, cell for cell.
  - The press rule does not open a pass-through: a press on dock A released over dock B leaves
    dock B's hover intact.
  - No tolerance is widened.
- **Morph regressions.**
  - A resize mid-collapse lands on the anchored rest with no frame past the viewport.
  - A hover thrash settles at rest with the anchored edge held.
  - Vertical docks and the detached dock behave like the horizontal one.
  - Reduced motion goes from rest to rest and the click lands.
  - No ink spills outside the plate on any frame.
- **Code read, not exercised.** `onPressStart` drops an unresolved press, with what it
  deferred, at any new `pointerdown` inside the dock, including a non-primary one. The window
  listener's comment says a second finger "leaves the first press holding".
  - The only thing a touch press can defer in its `down` phase is nothing: touch neither focuses
    on `pointerdown` nor sends a hover dwell before the tap. So a second finger drops an empty
    deferral and re-arms the hold.
  - I found no input that makes the gap observable, so this is not a defect. The comment
    overstates the code by one case.

## Housekeeping

- `tests-visual/_critic8/` is removed. `git status` in the worktree is clean apart from this
  file. No server is left on 5318.
- A copy of the harness is in `.claude/worktrees/critic8-10.1.3/harness/`.
- `red-10.1.2` was not touched; I used `git archive` instead.
- The first chain (`chain.sh`) was stopped while it waited on another workflow's WebKit lock. It
  was rerun as `chain2.sh`, Chromium first. Its `c8-branch-chromium.log` was overwritten by the
  rerun.
