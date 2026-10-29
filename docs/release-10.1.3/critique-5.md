# 10.1.3 — critique, round 5 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `b8d77a933` (21
commits over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. I read every commit,
`implement.md`, `critique-1.md` to `critique-4.md`, the `src/` diff (`dockMorphMeasure.ts`,
`useDockMorph.ts`, `useDockState.ts`, `GlassDock.vue`, `styles/{index,layers,shape,shell}.css`)
and the click guard, which is unchanged.

Verdict: **the cure holds in both engines.** Every asked gate is GREEN on the branch, and
the fourier cells are RED on v10.1.2. The round-4 change, a morph-time `overflow: clip`, adds
no paint regression that I could find. No functional defect reproduced. Two record defects
reproduced, and neither touches behaviour:

- R-1: two code comments still say the dock box never clips.
- R-2: the CHANGELOG still says WebKit cells are owed.

## How I attacked it

The harness is my own and lives outside the tree. It extends critique-4's harness:

- **Scene.** fourier's dock shape: a `fit-content` collapsible `GlassDock` pinned by one edge
  in a stage, with "Edit" in a persistent slot on the anchored or the open side.
- **Anchors.** `?anchor=` right, left, center, top, bottom, vcenter.
- **Forms.** card, rounded, `fit=0`, `pin=fixed` (the detached, viewport-pinned dock),
  `canvas=1` (`backgroundCanvas`), `static=1`, `mount=open`.
- **New this round.** `dir=rtl`, and `xf=0.75`, which puts a `transform: scale(0.75)` on an
  ancestor.

The run setup:

- **Trees.** One Vite server (port 5305) served two trees: `branch` (this worktree's `src/`)
  and `red` (`git archive v10.1.2 src demo`).
- **Engines.** Chromium, Playwright's default headless shell. WebKit build 2287, under
  `guarded --exclusive webkit`.
- **Guard.** Every run went through `guarded`.
- **Records.** In `.claude/worktrees/critic5-10.1.3/`:
  - `harness/`: the specs, config and template.
  - `data/`: 777 per-cell JSON and PNG files, tagged by tree and engine.
  - `*.log`: the runs.

  The harness was removed from the worktree afterwards.

## Results

| attack | branch Chromium | branch WebKit 2287 | v10.1.2 Chromium | v10.1.2 WebKit |
|---|---|---|---|---|
| **A.** Hover expand, read per frame: 6 anchors × 360/390/430/1440 light, plus 390 dark. Checks: the first morph frame is the rest box, the anchored edge holds, the seat stays under the pointer, nothing leaves the viewport | GREEN 30/30. First frame 0 px off, drift 0, seat ≤ 4 px off the pointer | GREEN 30/30 | RED on every edge-anchored cell. First frame 116 to 121 px off, seat 94 to 101 px off | RED (`release-10-1-3.spec` per-frame cells) |
| **A.** The fourier gesture: `locator.click()` on the collapsed seat, anchored and open side | GREEN 60/60. 390 right: `pointerdown`, `pointerup` and `click` all on Edit at x 326 | GREEN 60/60 | RED. 390 right: `pointerdown` on Edit at 326, then `pointerup` and `click` on the anchor box at 225. This is fourier's 317 -> 215 | GREEN by engine (WebKit does not focus on press) |
| **F.** Forms × right/left/bottom at 390, right at 1440: expand and click | GREEN 48/48 | GREEN 48/48 | RED 48/48 | — |
| **X.** RTL (right, left) and the ancestor transform (right, left, bottom) at 390: expand per frame, anchored and open click | GREEN 15/15. First frame 0, seat 3 to 4 px off | GREEN 15/15 | RED 15/15. First frame 87 to 121 px off, seat 70 to 101 px off | — |
| **V.** Per frame, every visible control (opacity > 0.1), cut by its clipping ancestors, lies inside the plate. Run for 5 anchors × expand, collapse and in-out-in at 390 | GREEN 15/15 | GREEN 15/15 | RED 15/15. The summary is opaque up to 91 px outside the plate | — |
| **VR.** critique-4's double reversal, with the V predicate: right, left, bottom × 390/1440 | GREEN 6/6 | GREEN 6/6 | RED 6/6 | RED 6/6 |
| **C.** Collapse per frame from a settled expand (mounted open, and hover then `collapse()`): 5 anchors × 390/1440 | GREEN 20/20. The vertical cells settle with no snap, which closes critique-4 D-2 | GREEN 20/20 | RED 20/20 | — |
| **T.** Touch tap on the collapsed seat: right/left/bottom/center × anchored/open | GREEN 8/8 | GREEN 8/8 | RED 7/8 | — |
| **P.** Press and hold for 1.2 s, then release | GREEN 4/4 | GREEN 4/4 | RED 2/4 | — |
| **P2.** Chase an open-side seat that rides the growing edge: press it where it paints 100 ms into a hover expand, release 90 ms later | Lands. Seat moved 16 px during the press. 1 click | Lands (1.8 px) | Lands (9.5 px) | Lands |
| **K.** Keyboard focus on the collapsed seat expands at once. Enter 120 ms into the morph activates it once (right, left, bottom) | GREEN 3/3. The focused seat moves ≤ 4 px | GREEN 3/3 | RED 1/3 (left: 6.8 px) | — |
| **M / RM.** Under a real reduce (`contextOptions`): the click lands, the hover expand and collapse go rest to rest with no `[data-morphing]` frame, and the anchored edge holds | GREEN 4/4 | GREEN 4/4 | GREEN | GREEN |
| **G.** Guard race (b): press and release on the arriving control mid-morph (right, left, center) | Dropped 3/3 | Dropped 3/3 | Dropped | Dropped |
| **G-reflow / GR.** A move that is not the morph: at `pointerdown` the page moves the dock's anchor (140 px collapsed, at rest and mid-expand; 56 px on a settled expanded dock, so the release lands over another control) | Not activated 6/6 | Not activated 6/6 | Not activated | Not activated |
| **Paint probe.** Freeze the rAF at 40 % of the expand's travel. Screenshot the dock, lift the morph clip, and screenshot again. The difference is what the clip hides. Run for right, bottom and left × hover and keyboard × light and dark | Only on the open side, past the plate's moving edge. Nothing on the anchored edge: the hovered seat's plate and the focused seat's ring (2 px + 2 px offset, inside the dock's padding) paint whole | Only on the open side | — | — |

The 6 RED cells in R (critique-4's raw-rect double reversal) are a predicate artefact:

- That predicate reads `getBoundingClientRect` without the clip. The full pane's raw box
  lies past the plate on 11 to 33 frames.
- Under clip-aware reading (VR, V) nothing visible lies outside the plate.
- In paint (the probe and the branch's frozen-frame cells) nothing visible lies outside it
  either.
- On the same cells the anchored edge drift is 0, and the summary and seat are never
  outside.

## The asked gates, re-run on `b8d77a933`

| gate | Chromium | WebKit 2287 |
|---|---|---|
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts` (77) | 77/77 GREEN | 77/77 GREEN |
| O-101 no-overflow cells (1440->390 and 390->1440; horizontal and vertical; pinned, collapsed, reversal, mid-expand) | GREEN | GREEN |
| `release-10-1-3.spec.ts` on the branch | 50/50 GREEN | 48 passed, 2 skipped (the CDP-swipe cells are Chromium-only) |
| `release-10-1-3.spec.ts` on v10.1.2 (`red-10.1.2`, `src` checked clean against `v10.1.2`) | 44 RED, 6 GREEN. Every fourier cell is RED: L2-15 at 360/390/430 and G-h at 1440, right and left (click, per-frame and mid-expand-press) | 29 RED, 19 GREEN, 2 skipped. The per-frame cells are RED. The click cells are GREEN, because WebKit does not focus on press, so that gesture is Chromium's |

Logs:

- Chromium release run: `rel-chromium.log` (127 passed).
- WebKit release run: `rel-webkit.log` (125 passed, 2 skipped).
- The 10.1.3 spec on v10.1.2: `red-1013spec-{chromium,webkit}.log`.
- My matrix: `c5-{branch,red}-chromium.log`, `c5-branch-webkit.log`,
  `c5b-{branch,red}-{chromium,webkit}.log`, `probe-webkit.log`.

`useDockClickIntegrity.ts` and `constants.ts` are byte-identical to `v10.1.2`. No tolerance
was widened, and no movement exemption was added. Ask 2 is met by the press rule in
`useDockState.ts`, which is exact.

## Defects

### R-1 (records, minor): two comments still say the dock box never clips while it morphs

Round 4 added the clip at `src/components/dock/styles/shell.css:322-327`:
`.glass-dock[data-morphing]:not(.vertical):not(:has(.is-press-keepalive)) { overflow-x: clip }`,
and its vertical twin. Two comments now say the opposite:

- **`shell.css:287-299`, directly above the new rule.** It says the morph aperture is
  "DELETED" and "`.glass-dock` NEVER clips its descendants now … a hover/press plate at the
  dock edge overhangs UN-CLIPPED".
- **`dock.css:180-183`.** It says "NO ancestor clips it, so 'Dock hover items clip' defects
  are structurally impossible".

Both statements are false while `[data-morphing]` is set. I reproduced this in the paint
probe: in Chromium and WebKit, lifting the clip on a frozen 40 % frame changes 46 to 110
pixels on the open side. That is a control's paint the clip cuts there, which by design is
past the plate.

The behaviour is correct. The record of it is not single-sourced: a reader of either comment
is told the opposite of what the rule beside it does. A fix is to strike the "NEVER clips"
and "structurally impossible" sentences and point both at the new rule, with its scope:
morph axis only, `[data-morphing]` only, suspended under the press keepalive.

### R-2 (records, minor): the CHANGELOG still says the critique-3 WebKit cells are owed

`CHANGELOG.md:119-121`, in the critique-3 bullet, reads: "The WebKit cells are owed:
Playwright WebKit 2287 crashes on every dock page at load".

Round 4's gates ran them GREEN in WebKit 2287, and so did mine:

- `rel-webkit.log`: 125 passed, the three critique-3 reversal cells among them.
- Every dock page loaded in WebKit across my 215 + 15 + 12-cell runs.

The 10.1.3 entry as written tells a reader that a witness is unproven when it is proven.
The sentence should be struck or replaced with the WebKit result.

## Attacked and held (not defects)

- **The round-4 clip.**
  - It never cuts the anchored side. The hovered seat's plate and the keyboard-focused
    seat's outline paint whole through the morph, in light and dark, in both engines.
  - It forms no new backdrop root. The plate's `backdrop-filter` paints the stage through
    every frozen frame.
  - The dock's own `box-shadow` is not clipped, because it sits on the box, not on a
    descendant.
  - Clicks through it land: A, F, T, P, X and K are GREEN.
- **RTL and an ancestor transform.**
  - In RTL the measured origin follows the painted box. `persistent` is the anchored side
    of a right pin, and the first frame and the seat hold.
  - Under `scale(0.75)` the origin's viewport-per-local ratio holds the edge at 0 px.
- **An open-side seat in motion (P2).** A press that chases it mid-expand lands on both
  trees. The seat moves 2 to 16 px during a 90 ms press, under half its width, so this is
  no regression.
- **Reduced motion.** It is real, and the page reads `reduce`. Both legs jump rest to rest
  with no morph frame, and the anchored edge holds.
- **No public API changed.** `index.ts` and the prop contract are untouched. The new custom
  properties (`--dock-morph-origin`, `--dock-pane-shift`) are internal.

## Housekeeping

- `git status` on the branch shows this file and `fix5/`. `fix5/` is two untracked
  Playwright JSON reports (`pre-chromium.json`, `post-chromium.json`) dated 16:48 to 16:49.
  They predate this round: a fix seat left them, and they are not mine to remove. They
  should go before the tag.
- My harness (`tests-visual/_critic5/`) is removed from the worktree; a copy is in
  `critic5-10.1.3/harness/`. No server is left on 5305 or 5306.
- The red WebKit run of my own A/X/V subset was stopped while it waited on the WebKit lock
  (`red webkit exit 143`). Other repos' runs held that lock for over an hour. v10.1.2 is
  shown RED in WebKit by the official `release-10-1-3.spec` run and by my VR cells (6/6
  RED).
