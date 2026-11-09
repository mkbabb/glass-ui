# 10.1.3 — critique, round 7 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `d6601c83c` (30 commits
over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. I read every commit,
`implement.md`, `critique-1.md` to `critique-6.md`, the `src/` diff (`dockMorphMeasure.ts`,
`useDockMorph.ts`, `useDockState.ts`, `GlassDock.vue`, `styles/{dock,index,layers,shape,shell}.css`)
and the click guard (`useDockClickIntegrity.ts`, unchanged from `v10.1.2`).

Verdict: **the cure holds against every attack the earlier rounds did not make, in paint and by
geometry, in both engines. One minor defect reproduced: under an ancestor CSS `zoom`, WebKit
paints the summary pane off its box during the morph (D-1).**

- Every asked gate is GREEN on the branch: the 77 release cells in each engine, with the O-101
  no-overflow cells among them, and the 10.1.3 spec.
- The new attacks are RED on v10.1.2 and GREEN on the branch, apart from the guard-parity cells,
  which are GREEN on both trees as they should be.
- D-1 is the only branch failure. It is not a regression: v10.1.2 is far worse in the same
  cell (summary jump 227 px).

## How I attacked it

The harness lives outside the tree, in `.claude/worktrees/critic7-10.1.3/harness/`. It extends
critique-6's.

- **Scene.** fourier's dock shape: a `fit-content` collapsible `GlassDock` pinned by one edge in
  a stage, with "Edit" in the persistent slot on the anchored side.
- **New query parameters.**
  - `shape=rounded|card`
  - `fit=0`
  - `rtl=1` with an explicit `slot`, so the seat still sits on the anchored side
  - `scale=0.75`: an ancestor `transform`
  - `zoom=1.25`: an ancestor CSS `zoom`
  - `play=1`: the collapsed summary carries a live control
  - `swap=1`: Edit is swapped for an Imposter on Edit's own `pointerdown`
- **Trees.** One Vite server on 5309 served both.
  - `branch` is this worktree's `src/`.
  - `red` is `git archive v10.1.2 src demo`, extracted beside it.
  - The harness was mounted at `tests-visual/_critic7/` and removed afterwards. The worktree
    status is clean.
- **Engines.**
  - Chromium: Playwright's default headless shell for my harness, and the repo's
    `chromium-headless-new` for the release specs.
  - WebKit: build 2287 (`webkit-2287.config.ts`), always under `guarded --exclusive webkit`.
  - Every run went through `guarded`, one at a time.
- **Records.**
  - `data/*.json` holds per-cell data, tagged by tree and engine.
  - `data/png/` holds the frozen-frame captures.
  - `*.log` holds the runs, and `chain2.sh` the serial chain.

## Results

| attack | branch Chromium | branch WebKit 2287 | v10.1.2 Chromium | v10.1.2 WebKit 2287 |
|---|---|---|---|---|
| **F.** Dock forms and contexts at 390, expand read per frame, plus Playwright's click on the anchored seat. Forms: `rounded`/`card` right, `card` left, `rounded` bottom (vertical), `card` top (vertical), `fit=0` right, RTL right and left, ancestor `scale(0.75)`, ancestor `zoom: 1.25` | 20/20. First morph frame = rest box (0 px), anchored edge drift 0, seat 3-5 px from the pointer, 1 click each | 19/20. **`zoom` right fails on the summary jump (60.9 px), D-1.** Its anchored edge (0.17 px) and seat (5 px) hold | RED on all 10 expand cells (first frame 91-122 px off, seat 76-101 px off) and on all 10 click cells (0 clicks) | RED on all 10 expand cells. The click cells are GREEN (WebKit does not focus on press) |
| **Q.** Paint. The page's rAF and animations are frozen on the first `[data-morphing]` frame. Pixels outside the rest dock box (+3 px) are compared with the rest capture (max channel delta > 48 counts). Light and dark; right, left, bottom and centre at 390; right at 1440 | 10/10: 0 ink pixels (max delta 13-26) | 10/10: 0 ink pixels (max delta 22-36) | 10/10 RED: 102-225 ink pixels. The plate is centred in the reserved box and the full pane paints on the stage (`data/png/red-chromium-Q-light-right-390-first.png`) | 10/10 RED: 316-788 ink pixels |
| **R.** Second expand (expand, leave, settle collapsed, expand again) per frame, right and bottom at 360 | 2/2 | 2/2 | 2/2 RED | 2/2 RED |
| **T.** A real touch tap on the collapsed anchored seat. Right at 360/390/430; left, bottom and top at 390 | 6/6, Edit activated once | 6/6 | 6/6 RED (0 activations) | 6/6 GREEN (no focus on press) |
| **P.** The collapsed summary carries a live "Play" control, hit by a mouse click and by a touch tap (the iOS one-tap contract through the expand it triggers) | 2/2, Play once, nothing else activated | 2/2 | 2/2 | 2/2 |
| **G.** Guard race (b), unchanged. Hover the summary, then press 90 ms into the morph where an arriving full-pane control now paints ("Fullscreen" right, "View layers" left) | 2/2 not activated | 2/2 | 2/2 | 2/2 |
| **S.** Guard, non-morph identity change. Edit is swapped for Imposter on its own `pointerdown`; mouse, right and left | 2/2 Imposter not activated | 2/2 | 2/2 | 2/2 |

G and S show the guard's behaviour is unchanged: a click whose target changed for a reason
other than the dock's own morph is still dropped. The press rule did not open a pass-through.
No tolerance is widened, and `useDockClickIntegrity.ts` and `constants.ts` are unchanged.

## The asked gates, re-run on `d6601c83c`

| gate | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts` | 77/77 GREEN | 77/77 GREEN |
| O-101 no-overflow cells (1440->390, 390->1440; horizontal and vertical; pinned, collapsed, reversal, mid-expand) | GREEN, among the 77 | GREEN, among the 77 |
| `release-10-1-3.spec.ts` | 57/57 GREEN | 55 passed, 2 skipped (the CDP-swipe cells are Chromium's) |
| total (`rel-chromium.log`, `rel-webkit.log`) | 134 passed | 132 passed, 2 skipped |

## Defects

### D-1 (minor, WebKit only): under an ancestor CSS `zoom`, the summary pane is painted off its box during the morph

Set-up: the right-anchored dock at 390 inside a stage with `zoom: 1.25`.

- **Expand** (`F · zoom-right`, `data/branch-webkit-F-expand-zoom-right.json`).
  - The leaving summary glyph rests at x 272.
  - On the first `[data-morphing]` frame, at opacity 1, WebKit paints it at 332.9: a 60.9 px
    jump. It fades out from there.
  - Chromium holds it at 272.0, a 0.5 px maximum frame-to-frame step.
  - The plate is not affected: the first frame is the rest box (0.17 px) and the anchored edge
    and seat hold. Only the pane shift is off.
- **Collapse** (`zoomk.spec.ts`, `data/branch-webkit-zoomk.json`).
  - The entering summary is painted up to 71.3 px from its rest while its opacity is above 0.5.
  - It takes a 62.2 px frame-to-frame jump.
  - Chromium: 9.9 px and 1.1 px.
- **Without zoom.** With an ancestor `transform: scale(0.75)` or in RTL, WebKit is exact: the
  summary jump is 0.4-0.5 px.

So the leaving-pane and entering-pane shift (`--dock-pane-shift`, `dockMorphMeasure.ts`
`anchor()`, the closing `for (const pane of panes())` loop) does not land where WebKit paints
when an ancestor sets `zoom`.

- The ratio `k` is not the culprit. My probe read `getBoundingClientRect().width` 120 and
  `offsetWidth` 96 in both engines, so `k` = 1.25 in both.
- The error is elsewhere in how WebKit 2287 resolves the pane's laid box or its `translate`
  under legacy zoom. I did not isolate it.

`implement.md` claims the shift holds under "an ancestor transform (the viewport-per-local ratio
`k`)". That is true for a transform. `zoom` is not a transform and is not covered.

Severity: minor.

- It needs an ancestor `zoom`, which WebKit/Safari supports and some consumers use for UI
  scaling.
- It is cosmetic: the plate, the seats and the clicks are right.
- It is not a regression: v10.1.2 jumps the same glyph 227 px in the same cell, in both
  engines.

A cure would read the pane's painted box after writing the shift and correct by the residual,
or derive the shift from painted boxes on both ends. A tolerance is not a cure. A witness is
`zoomk.spec.ts` in WebKit 2287: RED on `d6601c83c`, GREEN in Chromium.

Evidence:

- `c7-branch-webkit.log` (cell 19; 33/34 passed)
- `zoomk-webkit.log`, `zoomk-chromium.log`
- `data/{branch,red}-{chromium,webkit}-F-expand-zoom-right.json`
- `data/branch-{chromium,webkit}-zoomk.json`

## Attacked and held (not defects)

- **Dock forms.**
  - `shape` `rounded` and `card`, horizontal and vertical, and `fitContent` off: the first
    frame is the rest box, and the anchored edge and seat hold.
  - RTL, both anchors: the origin is read from layout, so RTL's physical slot order holds.
  - An ancestor `transform`: the `k` term works.
  - The same `zoom` cell in Chromium.
- **Paint, light and dark.**
  - On the branch, the frozen first frame paints nothing outside the rest box in either engine.
  - On v10.1.2 it paints the centred plate and full-pane glyphs on the bare stage.
- **A second expand** after a full collapse starts at rest.
- **Touch.** A real tap on the anchored seat at 360/390/430 and on vertical docks activates it
  once in both engines. A tap or click on a live summary control activates it once, through
  the expand it causes.
- **The guard.**
  - Race (b), a press mid-morph on an arriving control, is still dropped.
  - A non-morph identity swap is still dropped.
  - Both match v10.1.2 cell for cell.

## Housekeeping

- My harness was removed from `tests-visual/_critic7/`; a copy is in `critic7-10.1.3/harness/`.
- `git status` in the worktree is clean. No server is left on 5309.
- `red-10.1.2` was read-only for this round: I did not touch it, and used `git archive` instead.
