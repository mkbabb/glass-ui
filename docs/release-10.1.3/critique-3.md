# 10.1.3 — critique, round 3 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `10234c77c` (13
commits over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. Read: every commit,
`implement.md`, `critique-1.md`, `critique-2.md`, the full `src/` diff
(`dockMorphMeasure.ts`, `useDockMorph.ts`, `useDockState.ts`, `GlassDock.vue`,
`styles/{index,layers,shape}.css`) and the unchanged `useDockClickIntegrity.ts`.

Verdict: **the cure holds and every asked gate is GREEN in both engines. No regression
against 10.1.2 reproduced.** One defect reproduced, and it predates this branch (D-1
below). A collapse that reverses an expand mid-morph leaves the summary glyph painted
outside the plate, then snaps it at settle. `implement.md` lists it under "Open", but
understates it.

## How I attacked it

I used my own harness and spec, not the implementer's or the earlier critics'. Both were
run unchanged against two trees, served by one Vite server (port 5297) from this
worktree:

- `branch`: this worktree's `src/` and `demo/`.
- `red`: `git archive v10.1.2 src demo`, extracted beside it. Only the seven cure files
  differ.

The harness is one collapsible `GlassDock`, set by query parameters:

- `?anchor=` right, left, center, top, bottom or vcenter
- `?seat=` anchored or open
- `?fit`, `?shape`, `?pin`
- `?dir=rtl`, which is new
- `?xform=0.75`, new: a scaled ancestor, which exercises the cure's `k` ratio
- `window.__dock`, the component ref, which drives the public `collapse()`

Each cell reads `getBoundingClientRect` on every rAF. That gives painted geometry,
transforms included. Each cell also records the events its gesture dispatched.

- Chromium ran in Playwright's default headless shell.
- WebKit was 2287, under `guarded --exclusive webkit`.
- Every run went through `guarded`.

The record is out of the tree, in `.claude/worktrees/critic3-10.1.3/`:

- `harness/`: the spec, config and harness template.
- `data/`: per-cell JSON, tagged by tree and engine, plus the two `X1p` screenshots.
- `*.log`: the runs.

## Results (148 cells per tree in Chromium, 139 in WebKit)

| attack | branch Chromium | branch WebKit 2287 | v10.1.2 Chromium | v10.1.2 WebKit |
|---|---|---|---|---|
| A. Hover expand, per frame: the first morph frame equals the rest box, the anchored edge holds, the anchored seat stays under the pointer, no frame leaves the viewport or widens the document. 6 anchors × 360/390/430/1440, light; 390/1440 also dark (page reads dark) | GREEN 36/36 (first-frame distance 0, drift 0, seat offset ≤ 4 px) | GREEN 36/36 | RED 30/30 edge-anchored (first frame 116 to 121 px off, seat up to 101 px off the pointer); centred: same geometry | RED 30/30 edge-anchored |
| A. Playwright `click()` on the collapsed dock's persistent seat, anchored and open side, every anchor/width/scheme above | GREEN 72/72 | GREEN 72/72 | RED 72/72 except the centred anchored cells | GREEN (WebKit does not focus on press) |
| T. Touch tap on the seat: right, left, bottom, centre × anchored, open (390) | GREEN 8/8 | GREEN 8/8 | RED 7/8 | GREEN |
| X4. Scaled ancestor (`scale(0.75)`): right 390/1440, bottom 390. RTL: right 390/1440, left 390. Expand per frame and click | GREEN 12/12 | GREEN 12/12 | RED 12/12 | RED 6/6 expand cells |
| M. Real reduce (`contextOptions`, page reads reduce): the click lands | GREEN | GREEN | GREEN | GREEN |
| G. Guard race (b): approach the summary, then press and release mid-morph on the arriving control (right, left, centre). The handler of every control except Edit ran 0 times | GREEN 3/3 | GREEN 3/3 | GREEN 3/3 | GREEN 3/3 |
| G2. A non-morph move: the stage reflows 130 px at `pointerdown` on the collapsed seat. The seat's handler does not run | GREEN | GREEN | GREEN | GREEN |
| **X1. `collapse()` mid-expand (a reversal). The summary glyph: frame-to-frame jump, and frames where it paints visibly outside the plate** | **RED 4/6** (right, bottom; left GREEN) | **RED 4/6** | RED 6/6 | RED 6/6 |

`useDockClickIntegrity.ts`, `constants.ts` and the dock's `index.ts` are byte-identical to
`v10.1.2`. No tolerance was widened and no exemption was added. The only `package.json`
change is the version.

### Attacks that did not hold up as defects

- **X11: press a collapsed seat, drag off, release outside.** The dock ends `expanded`,
  with focus on the seat, and no click. This is the same on v10.1.2 and on the branch,
  so it is not a regression.
- **Reversal by Escape, by click-away from hover, or by pin-then-click-away mid-expand.**
  None of these gestures collapses the dock in either tree, so none produces a reversal.
  These cells measured nothing and are excluded.

## The asked gates, re-run by me on the branch

| gate | Chromium | WebKit 2287 |
|---|---|---|
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts` (77) | 77/77 GREEN | 77/77 GREEN |
| The O-101 no-overflow cells among them (1440->390 and 390->1440; horizontal and vertical; pinned, collapsed, reversal, mid-expand) | 24/24 GREEN | 24/24 GREEN |
| `release-10-1-3.spec.ts` (the four fourier cells ported: L2-15 at 360/390/430, G-h at 1440, right and left; plus the critique-1 and critique-2 cells) | 38/38 GREEN | 36 passed, 2 skipped (the CDP-touch cells are Chromium-only) |
| The fourier gesture on v10.1.2: my A-click cells, right and left at 360/390/430/1440 | RED (above) | GREEN: WebKit does not focus on press; its per-frame cells are RED |

Logs: `critic3-10.1.3/rel-chromium.log` and `rel-webkit.log`.

## Defects

### D-1 (minor; pre-existing, RED on v10.1.2 as well; not a 10.1.3 gate): a collapse that reverses an expand leaves the summary glyph painted outside the plate, then snaps it into place at settle

Reproduction (Chromium, branch, 390, right-anchored):

1. Hover the summary.
2. 120 ms into the expand, call the dock's public `collapse()`.

What paints:

- The plate holds its anchored edge: its right edge stays at 374, and its left edge goes
  from 65 back to its rest at 278.
- The summary glyph re-enters at x 57 and drifts to 48.5. It is fully opaque from about
  frame 33. On 74 frames it is visibly outside the plate.
- At settle it jumps 245 px, to its rest at 294.
- Bottom-anchored (vertical) the jump is 253 px. Left-anchored it is fine (3 px), because
  there the reserved layout's start is the rest.
- WebKit 2287 matches: right 246 px with 54 frames outside, bottom 251 px with 48.

The paint confirms it (`data/branch-chromium-headless-new-X1p.png`): mid-collapse, the
summary circle sits alone near the stage's left edge, and the shrinking plate is at the
right.

v10.1.2 strands it too (228 px jump, 86 frames outside, `red-…-X1p.png`), at the
reserved box's centre-mapped position. So this is no regression, and the anchored edge
itself is better on the branch.

Cause, from the cure's own code (`dockMorphMeasure.ts`, `anchor`):

- A reversal starts scaled, so `unit(s)` is false and `end` stays `null`.
- The pane loop shifts only the leaving pane (`boxes.get(pane)`). The entering summary's
  target is `end?.get(pane)`, which is `undefined`, so it gets no `--dock-pane-shift`.
- The summary therefore lays out where the reserved, expanded layout puts it: the reserved
  box's start.
- This contradicts the header comment's "the entering pane of a collapse to its rest".
  That holds only for an unscaled collapse.

`implement.md`'s Open item describes this as the summary "drops its leave shift … partly
faded". Measured, it is opaque for most of the collapse.

Reach:

- A consumer's `collapse()` (or anything routed to it) during an expand. The natural user
  gestures I tried don't produce it: hover-leave waits 3.6 s, and Escape, click-away and
  pin-then-click-away mid-expand don't collapse.
- So it is rare. It is visible when it happens.

What a cure must satisfy: on a scaled start, the entering pane of a collapse is shifted to
its rest, as the unscaled path already does. For example, read `end` whenever the
morph's direction is a collapse, not only when `s = 1`.

## Not defects (attacked, held)

- **The jump** reproduces on v10.1.2 and is gone on the branch in every anchor and form:
  right, left, top, bottom and both centred, fit-content, light and dark, 360 to 1440.
  That includes under a scaled ancestor and in RTL, which no earlier round tried. First
  frame 0 px, anchored drift 0, seat ≤ 4 px off the pointer.
- **A click on a seat lands** through the expand, by pointer and touch, on the anchored
  and the open side, in both engines.
- **The guard is byte-identical.** It still drops race (b), and a seat moved by a page
  reflow still does not activate. Both behave exactly as on v10.1.2.
- **Reduced motion** (a real reduce): the click lands.
- **The O-101 gate and the 77-cell release spec** are GREEN in both engines.

## Housekeeping

- The harness (`tests-visual/_critic3/`, untracked) was removed from the branch worktree
  after the runs. A copy is in `critic3-10.1.3/harness/`.
- `git status` on the branch shows only this file.
