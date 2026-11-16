# glass-ui 11.1.0 · critique 4

A fresh adversarial critic (round 4), run by claude-fable-5-2 as the owner ordered, on
`release/11.1.0`. It built nothing on the branch. It began at `98dad372e` (fix 4) and read
every commit in `master..release/11.1.0`, every record in `docs/release-11.1.0/`, and
`orchestrator-note-fable-review.md` first, as binding. Two orchestrator commits landed while
it ran (`a9345dffa` at 10:25 and `b929b6733` at 11:32, both `orchestrator-note-mark-press.md`,
docs only); it read both and did what they ask. No source changed under it: `src/` at
`b929b6733` is `src/` at `98dad372e`.

Every browser run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. **The guard refused nothing.** WebKit is Playwright's
build 2287 throughout. Two trees: the branch, and `git archive v11.0.0` at `.cache/c1-v1100`
(its `src/` checked identical to the tag with `diff -rq` before any run); fix 3's and fix 4's
witnesses also ran on their pre-fix trees (`.cache/f3-pre`, `.cache/f4-pre`).

Records, all under `critic-4/`:

- `fix4-witness/`, `fix3-witness/`, `fix2-witness/`, `c2-probe/`, `probe/` (critic 3's),
  `rerun/lane-L{1..7}/`: every earlier witness and probe, copied unchanged (only output paths
  differ), rerun on both trees in both engines.
- `probe4/` (harness and probe): this critic's own cells for what those do not hold. A Blob
  at the viewport edge, the run mark right to left and vertical and under reduced motion, a
  menu at the far edge, a Slider dragged vertically and right to left, a nested Collapsible.
- `probe5/`, `probe6/`, `probe7/`: the three probes the mark-press note asks for (they use
  `probe4/harness`). `probe6/out/first-chromium/` keeps probe6's first Chromium pass, taken
  before its cure and natural-colour cells were added.
- `api/`: the public surface of the branch's `dist` against the 11.0.0 tarball.
- `gates/`, `e2e/` (with `e2e-compare.py`): the committed-tree gates and the touched specs.
- `sheets/`: contact sheets of the captures cited below (PNGs are ignored by git, as before).
- `chain.log`: every run and its exit, in order; `summary.txt`: the verdict line of every
  witness. Drivers: `run.sh` (critic 3's, with a fix-4 stage) under `run-all.sh` to
  `run-all4.sh`, then `run-e.sh` and `run-f.sh`. The driver was swapped three times to let a
  new probe join the queue without two runs overlapping. The third swap caught one WebKit run
  mid-flight and one waiting on the lock; guarded ended both when their caller stopped
  (`KILLED: caller died`, not a refusal), and `run-all4.sh` took both again to a logged exit.

## Verdict

Not ready to tag. Fix 4 cured both of critique 3's findings, and every lane's claim
reproduced again on both trees in both engines. The mark-press note sent this critic to the
dock's run mark, and that is where the three findings are:

1. On a glyph seat the mark keeps the box of a hovered seat: it is 8 px larger on each axis
   after a click or a tap than after a keyboard activation or a route change, and stays so
   (medium, both engines).
2. The mark's first measure forces the new dock's layout inside the mount task (low; the
   note's second question, answered yes with one qualification).
3. The CHANGELOG does not say that a glyph seat which carries only `aria-current` now draws
   a selected plate where 11.0.0 drew none (low).

The pressed scale the note names does **not** reproduce; the reading and the reason are
under finding 1.

## What ran

| run | branch Chromium | branch WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- |
| fix 4 witness | 17/17 | 17/17 | 11/17 | 11/17 |
| fix 4 witness on its pre-fix tree `ae46ed477` | 11/17 | 11/17 | | |
| fix 3 witness | 26/26 | 26/26 | layout 5/5, gap 0/7, frames 2/2, Slider 3/3, tempo 1/1, tabs 4/8 | the same |
| fix 3 witness on its pre-fix tree | layout 1/5, gap 1/7, Slider 1/3, tempo 0/1, tabs 4/8 | the same | | |
| fix 2 witness | 60/60 | 60/60 | 36/60 | 36/60 |
| critic 2's probe | 23 cells, 0 errors | 23 cells, 0 errors | same | same |
| critic 3's probe | 36 cells, 0 errors | 36 cells, 0 errors | same | same |
| lane L1 (O-164, O-188, O-169) | 27/27 | 27/27 | exit 1 | exit 1 |
| lane L2 (O-181, O-196, O-189, O-171, O-168, O-173, O-180) | 33/33 | 29/29 + 4 unmeasurable | exit 1 (3/29 + 4 unmeasurable) | the same |
| lane L3 (O-158, O-184, O-178, O-179) | 18/18 | 18/18 | 6/18 | 6/18 |
| lane L4 (O-175, O-185, O-204, O-173 G2, O-163) | 28 pass, 0 fail | 26 pass, 2 n/a | 6 pass, 22 fail | 4 pass, 22 fail, 2 n/a |
| lane L5 (O-183, O-190) | 60/60 | 60/60 | 26/60 | 26/60 |
| lane L6 (O-194, O-197, O-198, O-199) | 161/161 | 155/155 | exit 1 | exit 1 |
| lane L7 (O-206) | 80/80 | 64/80 | 4/64 | 15/64 |
| this critic's `probe4` | 22 cells, 0 errors | 22 cells, 0 errors | same | same |

Fix 4's table reproduced cell for cell. Critic 3's `Collapsible padding` cells now read the
`pad-base` rows with the gap unset equal to v11.0.0 (16 px, first child at y 16, content
71.2 px at 390 and 77.9 px at 1440, light and dark, both engines); every other cell of that
probe reads as critic 3 read it. Lane L2's WebKit O-171 cell passed this run (5/5). Lane L7's
WebKit `drawn` cells read 0/16 for the fifth run and its stall cells were unmeasurable, as
recorded; Chromium reads 16/16. Neither is reopened.

## Defects (reproduced)

### 1. On a glyph seat the run mark keeps a hovered seat's box (medium)

**What the note asked.** Click a seat in a run whose current seat changes on click and, once
settled, compare the mark with the seat's layout box, 390 coarse and 1440 fine, both engines.
`probe5`: 40 cells per engine (390 and 1440, fine and coarse, tab seats and glyph seats;
a 90 ms click or a tap in light and dark, a 600 ms hold, a keyboard Enter, a change by
script).

**The pressed scale does not bake.** While held, a tab seat's rect is 81.8 × 36.5 on a
layout box of 85 × 38 (`scale: 0.96`), and a glyph seat's is 40.3 × 36.6 on 40 × 40
(`scale: 1.0066 0.9156`), so the press does scale a seat. Settled, a tab seat's mark is its
layout box exactly in all 20 cells per engine (136 × 38 fine, 148 × 38 coarse). The reason is
in the composable: the selection changes on `click`, which follows the release; the mark
then reads the arriving seat every frame of its spring and once more when it settles
(`useDockRunMark.ts:152-158`), by which time the press has let go. Samples at 60, 120, 250
and 500 ms show the mark converging on the live rect.

**What does bake is the hovered seat's plate box.** A glyph seat (the default
`DockControl`) paints its plate inside a 4 px inset: `background-clip: content-box` over its
padding (`glass-capsule.css:140-145`). Its hover rule sets the fill with the `background`
shorthand (`controls/icon-button.css:116-117`), which resets `background-clip` to
`border-box`. `plateOf` reads the clip live (`useDockRunMark.ts:79-82`). A click or a tap
leaves the pointer on the seat, so the last measure is taken hovered, at the full cell, and
nothing measures again when the pointer leaves (a hover changes no size, so the resize
observer never fires).

`probe6` paints the plate magenta and reads its box from the screenshot. Chromium and WebKit
2287 read every cell the same, light and dark:

| how the seat became current | 1440 fine, 390 fine (cell 136 × 40) | 390 coarse, 1440 coarse (cell 148 × 44) |
| --- | --- | --- |
| at rest on load | 128 × 32 | 138 × 34 |
| keyboard Enter | 128 × 32 | 138 × 34 |
| a route change with the pointer elsewhere | 128 × 32 | 138 × 34 |
| click or tap, pointer stays | **136 × 40** | **148 × 44** |
| click or tap, then the pointer leaves (2.5 s later) | **136 × 40** | **148 × 44** |
| a route change while the pointer rests on the arriving seat, then it leaves | **136 × 40** | 138 × 34 (a touch screen has no resting hover) |

So the same mark on the same seat has two sizes, and the larger one is what a mouse or a
finger leaves behind, which is how most people change tab. Paint:
`critic-4/sheets/run-mark-size-chromium.png` (keyboard beside click-then-leave, 1440 fine and
390 coarse, light and dark) and `critic-4/sheets/run-mark-webkit.png`, lower half. Tab seats
are unaffected: their clip is `border-box` hovered or not.

**The note's witness needs one amendment.** "The settled mark equals the seat's layout box
within 0.5 px" is true of a tab seat and false by design of a glyph seat, whose plate sits
4 px inside its cell. The witness that holds for both is: after a click, a tap, a keyboard
activation and a route change, with the pointer staying and leaving, the mark's painted box
is the box it has at rest on load, within 0.5 px, both engines. That is RED on the branch
as it stands (8 of 20 glyph cells per engine in `probe5`; the bold rows above).

**A cure candidate, read in both engines.** Reading layout boxes instead of rects, as the
note proposes, would not cure this: the size that bakes comes from the clip, not from a
transform. The root is the shorthand resetting the clip. With one declaration laid over the
branch, `.glass-dock .dock-icon-button:hover { background-clip: content-box; }`, every one of
the twelve cure cells per engine reads the rest box (128 × 32 fine, 138 × 34 coarse) after a
click, with the pointer staying or leaving, and after a hovered route change
(`probe6`, cells named `cure-`; `critic-4/sheets/run-mark-webkit.png`, third and fourth
rows). In the source that is `background-color` in place of `background` in the hover rule.
It also changes what a hovered glyph seat paints: its hover fill insets to the plate box
instead of filling the cell, which is what the comment at `glass-capsule.css:131-133` says
the hover register does already. If the fix seat would rather not touch the hover fill in
this release, the other cure is at the measure: `plateOf` takes the inset from the seat's
padding without asking the live clip. Either way the amended witness above is the gate.

### 2. The mark's first measure forces the new dock's layout inside the mount task (low)

**What the note asked.** One Chromium trace at 4x CPU of a dock mounting with a marked run:
does `useDockRunMark` force layout in the mount task? `probe7` mounts a dock on demand, with
and without a current seat, three times at each width, on both trees, and reads the task two
ways: every `getBoundingClientRect`, `getClientRects` and `getComputedStyle` call between the
state change and the end of Vue's flush, with the file that made it; and, in Chromium, the
`Layout` events of a trace between two user-timing marks, with the frames that forced each.

**It does.** In the branch's trace the first layout of the mount task is forced by
`useDockRunMark.ts: destinationOf ← sync` (its `getClientRects`), 1.65 ms at 390 and 1.85 ms
at 1440 at 4x. The mark makes four reads in the task (rects, style and rect calls),
where an unmarked run makes none; the only other read on either tree is one root
style read by `motionTempo.ts`.

**The qualification.** The dock forces a layout in that task without the mark, on both
trees: `dockMorphMeasure.ts: getSize ← capture` (1.7 to 1.9 ms on the branch unmarked, 1.1
to 2.7 ms on v11.0.0). With the mark, the mark's read pays for that layout first and the
dock's own measure then finds it clean (0.08 to 0.11 ms). So moving the mark's first measure
to the next frame takes the mark's reads out of the mount task; it does not make the task
free of forced layout.

| Chromium, 4x CPU | reads in the mount task | task, three runs (ms) | Layout events in the task |
| --- | --- | --- | --- |
| branch, marked, 390 | 5 (4 by the mark) | 50.7, 47.0, 44.0 | 1.65 ms forced by the mark, 0.11 ms by the dock's measure |
| branch, unmarked, 390 | 1 | 48.4, 38.3, 40.3 | 1.86 ms forced by the dock's measure |
| branch, marked, 1440 | 5 (4 by the mark) | 50.9, 44.5, 42.2 | 1.85 ms by the mark, 0.08 ms by the dock's measure |
| branch, unmarked, 1440 | 1 | 39.6, 35.6, 37.9 | 1.74 ms by the dock's measure |
| v11.0.0, either, 390 and 1440 | 1 | 39.3 to 45.7 | 1.1 to 2.7 ms by the dock's measure |

The marked task runs about 6 ms longer at the median than the unmarked one at 4x. Part of
that is this probe's own cost (it captures a stack on each of the four reads), so it is an
upper bound, not a figure to quote. WebKit 2287, unthrottled and with no trace: the same
four reads by the mark; tasks of 13 to 18 ms marked and 12 to 15 ms unmarked on the branch,
11 to 14 ms on v11.0.0.

By the note's rule this is the "it does" branch: the first measure waits one frame (one
`requestAnimationFrame`, no timer). The gate then needs both halves the note names: zero
reads by `useDockRunMark.ts` in the mount task (`probe7`'s `byOwner`), and the mark on its
seat in the first painted frame in both engines. `probe7` reads `data-run-mark` three frames
after the mount (true in every marked cell today); it does not read the first paint, so that
cell is new work for the fix seat's witness. This is the class lane L2's O-180 holds
pressable controls to (zero rect reads on the mount path); the mark was not in that scene.

### 3. The CHANGELOG does not say a glyph seat gains a selected plate (low)

The Dock entry reads "the dock draws one selected plate and moves it from the old tab to the
new one on the dock's spring, instead of switching instantly", and the headline's list of
defaults that change a page's look does not name the mark at all. For tab seats that is
right: 11.0.0 painted a selected plate on a tab seat with `aria-current`, and the mark
replaces it in place. For glyph seats it is not: on 11.0.0 a glyph seat that carried only
`aria-current` (a `RouterLink` sets it) opened wide and painted no plate; its plate came
from the `active` prop. On the branch the run draws the mark on it.

`probe6`, the library's own colours, one pixel 14 px inside the current seat, Chromium and
WebKit 2287 the same at 390 and 1440:

| | light | dark |
| --- | --- | --- |
| v11.0.0, current glyph seat | 253, 245, 236 (the dock's own plate) | 53, 42, 34 (the dock's own plate) |
| branch, current glyph seat | 216, 208, 197 (a selected plate) | 46, 36, 27 (a selected plate) |

Paint: `critic-4/sheets/run-mark-webkit.png`, first two rows. A consumer whose dock is a row
of glyph links sees a new selected plate after upgrading, with nothing changed on their
side. The change is the item's design and not a break; the entry and the headline should
say it. One sentence in the entry (a control marked with `aria-current` now always shows the
selected plate, glyph controls included, where before a glyph control showed it only with
`active`) and one line in the headline list cure it. Everything else in the entry was read
in full against the tree and the readings above and is accurate, and a scan for row and wave
ids, lane, seat, critic, witness, tranche, "build" and record paths finds none.

## What the ruling asked this critic to check

- **Item 1, the Collapsible.** `CollapsibleContent.vue` has no diff against `v11.0.0`:
  reka's content, no phase engine, no observer, no glass-written `--reka-*` name. The change
  is CSS alone (`disclosure.css`): no opacity in the shared keyframes, `padding-block` riding
  the height from zero, `box-sizing: border-box`, and the gap rule whose unset fallback is
  now `revert-layer`. The built sheet carries it as written, inside
  `@layer theme, base, components, utilities` (`dist/collapsible.css`). The reversal claim is
  gone from the CHANGELOG.
- **Item 2, the lateral swap.** `overflow: visible` on the window group under `lateral`; the
  recede keyframe is `scale` alone. Chromium: the arriving card whole with four round corners
  at 390 and 1440, light and dark, 4/4 (`critic-4/sheets/l2-chromium.png`, first row).
  WebKit: unmeasurable with its control, 4 cells, as recorded.
- **Item 3, one commit per row.** `617d62f73` (O-212 with O-213's cap) and `b6393d385`
  (O-214) hold source and tests only.
- **K12 and O-211, reverted whole.** No `SliderThumb.vue`, no `DockLayerSwitcher.vue`; the
  CHANGELOG claims neither. **G13 and G14, gated in both engines:** 4/4 each on the branch,
  2/4 each on v11.0.0.
- **Item 4 and the nested-table ruling.** Table one surface 4/4 on the branch, 0/4 on
  v11.0.0, both engines (`critic-4/sheets/fix2-chromium.png`, first row).
- **Item 5.** The observer acts on `aria-current` and the run's own child list. Findings 1
  and 2 are new measurements on the mark, asked for by the later note; nothing else about
  it is reopened.
- **Item 6.** `backwards` on `.viz-bar` and `.viz-ripple`; O-168 is 5/5 in both engines.
- **Items 7 and 8.** Nothing was added to the long press; the grain bullet has its clause.
- **Item 9.** Not reopened. No reading here contradicts a lane's on any item in that list.

## This critic's own cells (`probe4`), all negative

Each was a guess at a break, and each read clean in both engines:

- **Does the Blob's wider paint scroll the page?** A 112 px Blob whose box ends 16 px from
  the viewport's edge (its canvas runs 18 px past it), left to right and right to left, and
  one that ends the page, at 390 and 1440: `scrollWidth` equals `clientWidth` and
  `scrollHeight` equals `clientHeight` on both trees. `contain: layout` keeps the overflow
  as ink.
- **The run mark right to left and vertical.** Painted magenta and read from the screenshot:
  the mark sits on its seat within 1 px at rest and after a glide in a right-to-left dock at
  390 and 1440, in a vertical dock in both directions, and with reduced motion it is on the
  new seat within 60 ms with no intermediate frame.
- **A menu whose trigger ends at the far edge**, rows longer than 22rem, `align` start and
  end, 390 and 1440: the plate is 352 px wide, 16 px from the edge, identical to v11.0.0.
- **A Slider dragged with the mouse**, horizontal, right to left and vertical: the model,
  `aria-valuenow`, the last update, the commit and the thumb's position are identical to
  v11.0.0 in each.

## The dock, every posture

Lane L6's witness holds every posture at 390 and 1440, fine and coarse, light and dark:
161/161 in Chromium and 155/155 in WebKit on the branch. Read in paint
(`critic-4/sheets/dock-postures-chromium.png`, `-webkit.png`): open horizontal and vertical,
collapsed to one control, to two, to a glyph with a reading, the persistent face at rest and
opened by hover and by the long press, the trailing gap, the morph's mid-frame, and the
`--radius-dock: 1rem` bar. Capsules and circles throughout, no flattened or cut corner, in
both engines. Lane L1's collapsed seat, run mark (tab seats) and border rim read as recorded
(`critic-4/sheets/l1-chromium.png`, `items-webkit.png`). The one regression found on the
dock is finding 1.

## A consumer of 11.0.0

`critic-4/api/compare.mjs` against the 11.0.0 tarball, on the `dist` the committed-tree
build made: `compare.json` is byte-identical to critic 3's. No export, entry, `.d.ts` file or
class is gone (but Tailwind's `overflow-auto`, which the table container's own rule
replaces); `./styles/font-files`, `PopoverVirtualElement`, `ScrollProgressRimEdge` and seven
`./motion-core` names are added; the custom properties gone are `--hm-h` (still read where a
consumer sets it) and the two route variables the CHANGELOG headline names. The layered
Collapsible padding, critique 3's one behavioural break, reads as on v11.0.0 again.
`dist/fonts/ibm-plex-sans/` and `dist/fonts/plus-jakarta-sans/` hold the files the CHANGELOG
points at.

## Gates (committed tree; `src/` and `.bundle-ratchet` as at `98dad372e`)

`critic-4/gates.sh`, one guarded run, started at `a9345dffa`: build 0, typecheck 0,
demo:dist:build 0, vitest 0 (279 files; 2574 passed, 10 expected fail, 1 skipped),
verify:package 0 and CLEAN with the bundle ratchet at 3014787 as committed.

**e2e**, the same thirteen specs critic 3 ran, one worker, reports in `critic-4/e2e/`: 57
passed, 22 failed, 2 skipped on each tree in each engine; the failed title sets are identical
between the branch and v11.0.0 in Chromium and in WebKit (`e2e-compare.py`).
`handmark.spec.ts` is 10/10 on each tree in each engine. The runs rewrote four tracked PNGs
and dropped six untracked ones under `docs/tranches/`; this critic restored the four and
deleted its six.

## For INBOUND (not defects of this release's items)

- **`--collapsible-gap` inherits.** Set on a `Collapsible`, it reaches a `Collapsible` nested
  in its content: the inner content takes the same 12 px top padding with nothing set on it
  (`probe4`, `Collapsible nested gap`, both engines; 0 px on v11.0.0, where the token does
  not exist). A consumer may want that or not; registering the property with
  `inherits: false`, or saying so in the README, would settle it.
- **A glyph seat's focus ring and hover fill are ovals on the open seat.** The wide current
  glyph seat keeps a 50 % radius, so its ring is an ellipse cut by the run's edge. The same
  on v11.0.0 (`critic-4/sheets/run-mark-v1100-chromium.png`).
- **A source comment is stale.** `view-transition.css:199-200` still says the departing
  card "shrinks a little, sinks a little and dims"; it recedes by scale alone.
- **`--overlay-inline-cap` has no fallback.** It is built from two reka popper variables. Every
  plate the library renders sits in a popper, so nothing is wrong today; a plate rendered
  outside one would have no inline cap where 11.0.0 had `min(22rem, 100vw - 2rem)`.
- **Every witness server still shares one Vite optimize cache** (critique 3's first note).
  The warm-then-serve guard in the runners held for every run here.
- **Lane L7's `drawn` cell cannot be read in Playwright WebKit on this machine** (five runs),
  and real Safari is unmeasured for it.
- **`package.json` still reads 11.0.0** and the CHANGELOG heading reads "unreleased". The
  close bumps both.
- **Four e2e specs write into the tranche records** (`tabs-std`, `disclosure-rotate`,
  `handmark`), and `docs/tranches/BI/audit/visual/W-SHEET-RADIUS-readback.json` still sits
  untracked in this worktree from an earlier seat.
- **The 22 e2e cases that fail on both trees** cannot go red on a regression.
- **A guarded run ends when the shell that started it stops**, including one that is only
  waiting on the WebKit lock. A driver should not be stopped while a run it started is live.

## For the fix seat

1. The run mark's box on a glyph seat does not depend on hover: either the hover rule keeps
   the clip (`background-color` for `background` at `controls/icon-button.css:117`; read in
   both engines above, and it insets the hover fill) or `plateOf` stops reading the live
   clip. Gate: `probe6`'s rows all equal to the rest box, both engines, 390 and 1440, fine
   and coarse, light and dark; lane L1's O-188 still 6/6.
2. The mark's first measure waits one frame. Gate: `probe7` reads no call owned by
   `useDockRunMark.ts` in the mount task, and a new cell shows the mark on its seat in the
   first painted frame, both engines.
3. The CHANGELOG's nav-mark entry and headline say that a glyph control with `aria-current`
   now shows the selected plate.
