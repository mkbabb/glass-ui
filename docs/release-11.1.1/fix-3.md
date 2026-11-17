# 11.1.1 fix seat 3 (before critic 3)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`235b80e4c` (critique 2). Every orchestrator note in this directory was read; none rules on these
four defects beyond what the defect list says (no tolerance widened; the ratchet rebound once,
after the last source commit; the dock entry measured). Nothing outside the list was built.

Runs: `fix-3/run.sh <tree> <project> <log> [grep] [config]`, chained by `fix-3/chain{1..5}.sh`;
verdicts and attached readings by `fix-3/att.py`. Three trees: the branch on port 5351, v11.1.0
at `.cache/red-v11.1.0/tree` on 5352 (byte-compared against the tag before use: 864 files of
`src`, `demo` and `package.json`, none differ), and the **pre-fix tip** `235b80e4c`, a
`git archive` without `docs/` at `.cache/tip-235b80e/tree` on 5353, so each new witness is read
red on the tree it was filed against. A red or tip run copies the 11.1.1 specs, config and
harnesses into that tree first. Every run went through `guarded`, WebKit under `--exclusive
webkit`. **The guard refused nothing.** One WebKit lock wait, about 11 minutes behind another
session's run (the first probe); none passed an hour.

Cells: chromium-phone (390 × 844, touch), chromium-desktop (1440 × 900), webkit-phone and
webkit-desktop (Playwright WebKit 2287). R = red, G = green; "tip" is `235b80e4c`.

## Commits

| defect | commit | what |
|---|---|---|
| 1 | b32eb36b8 | under reduced motion `.dock-trigger:active` keeps its darken and takes `scale: 1` (`dock/styles/controls/triggers.css`) |
| 2 | fb43904d7 | the slider's sheet zeroes its own transitions under reduced motion (`slider/styles.css`); the `still` cell, a Slider in `reduce-harness`, `still` in the gate's fourth part |
| 3 | 0fec2b3f3 | the detent engine seats its spring at the drag's place and speed on release (`sheet/detents/use.ts`); the `routes` drag cell |
| — | 3e3b76f94 | `.bundle-ratchet` 3054190 to 3054556 (+366 B), once, after the last source commit |
| 4 | 5a48119d0 | CHANGELOG 11.1.1, the six points below |

## 1. The dock Select's first frame in WebKit under reduced motion

**Cause, measured.** `fix-3/probe/dsel.probe.ts` films the trigger's box and computed `scale`
beside the plate, WebKit 2287 at 1440 under reduced motion (`logs/dsel-probe-1.log`). In WebKit
the press's `pointerdown`, `pointerup` and `click` carry one timestamp, and the frame the plate
mounts in still paints the trigger `:active`: scale `0.96`, left 680.9, bottom 61.2, width 83.7
(at rest 679.2, 61.9, 87.1). reka places the plate against that pressed box, at (681, 65); the
next frame the trigger is at rest and the plate is at (681, 65) at opacity 0.052, then (679, 66)
on the frame after. With the trigger's press scale held at 1 (same probe, a style tag), the plate
is at (679, 66) from its first frame. Under reduced motion the dock trigger's press scale lands at
once (on a zero clock), where without reduced motion it has barely begun on its spring when the
plate is placed; `.tap-squish`, which the plain `SelectTrigger` wears, already retires its press
scale under reduced motion, which is why the plain Select never showed it. The trigger is 87 px
wide, not the 130 px critique 2 estimated; the offset is its 0.96 press (`--scale-press-dock`).

**Cure** (b32eb36b8). Under `prefers-reduced-motion: reduce`, `.dock-trigger:active` (the
Select, DropdownMenu and Popover triggers of a dock) takes `scale: 1`, keeping its press darken,
as `.tap-squish` does. The dock's icon and tab buttons, which open no overlay through
`DockTrigger`, keep their press scale as on 11.1.0. No tolerance changed.

**Witness**: `fade · a dock Select appears and leaves on a fade` (reduce spec, unchanged).

| tree | ch-phone | ch-desktop | wk-phone | wk-desktop |
|---|---|---|---|---|
| v11.1.0 | R | R | R | R (appears in one frame) |
| tip | G | G | G | **R**: frames at 73 and 83 ms, opacity 0.142 and 0.186, at (681, 65) |
| branch | G | G | G | **G in 3 of 3** (`w-branch-webkit-desktop`, `dsel-branch-2`, `dsel-branch-3`), plus the gate |

Logs `w-{red,tip,branch}-*`, `dsel-branch-{2,3}`.

## 2. The Slider moves under reduced motion

**Cause.** As critique 2 found: `slider/styles.css` is unlayered, and the reduced-motion fallback
is now a normal rule in the `reduced-motion` layer, which an unlayered rule outranks.

**Cure** (fb43904d7), in the slider's own sheet. Under reduced motion every rule there that sets
a transition is named again after it, at its own specificity, with `transition-duration: 0s`: the
root, the track, the thumb, the fill held, pressed and at rest, the loupe engaged and released,
and the loupe's clone (whose `filter: none` stays). The loupe's `0.01ms` becomes `0s`, the value
11.1.0 computed. This restores 11.1.0's still slider; the press's plain `scale(1, 0.97)` under
reduced motion lands at once, as it did.

**Witness**: `still · a Slider holds still under reduced motion` (reduce spec; the harness gains
a Slider). It reads the computed clock of the root, track, fill and thumb (each `0s`), and at
1440, with the mouse, films the fill's computed transform through a 500 ms held press and its
release: the press must reach the fill and the release return it, and no frame may hold a value
other than the leg's two ends. At 390 the clocks are the read (a held press needs a mouse; the
clocks are what moved).

| tree | ch-phone | ch-desktop | wk-phone | wk-desktop |
|---|---|---|---|---|
| tip | **R** | **R**: root 0.2 s, track 0.2 s, fill 0.3 / 0.21 / 0.2 s, thumb 0.12 s; press 16 values, 16 between; release 37, 35 between | **R** | **R**: press 13 values, 12 between; release 31, 29 |
| branch | G | G: every clock 0 s; press none to `matrix(1, 0, 0, 0.97, 0, 0)` with none between; release back with none between | G | G (same) |
| v11.1.0 | G | G (same as the branch) | G | G |

Green on v11.1.0 by design: the cell guards the default 11.1.0 had, and is red on the tree that
broke it. Logs `w-*`, `still-{branch,tip,red}-*`.

## 3. A detented Sheet dragged off jumps back up before it leaves

**Cause.** `useSheetDetents` stops its spring on `pointerdown` and the drag writes the scalar `t`
directly, so the spring still holds the rung the drag began at. On release `settle()` reuses the
spring whenever its leg matches the one asked for. A sheet opened on the `travel` leg and dragged
off asks for `travel` again, so the stale spring resumes from the rung: one frame back up to it,
then the exit runs from there. On v11.1.0 the plate also stopped at its floor through the drag,
so the jump was smaller and the sheet was removed at the floor. A drag released onto a rung after
an earlier rung settle reuses a `rung` spring the same way.

**Cure** (0fec2b3f3). On release the engine seats the spring on the leg the release will ride
(`travel` for a dismiss, `rung` otherwise) at the drag's `t` and its release velocity, then
settles. The close, or the settle, carries on from where the finger left the sheet, moving as it
moved.

**Witness**: `routes · a detented Sheet dragged off leaves from where the drag left it` (main
spec, gate part one). Opened at its 0.5 rung, the sheet is dragged by its grip twelve steps of
30 px, one a frame (a finger through Chromium's CDP touch input at 390, the mouse at 1440), and
let go. What is seen of it (opacity times the share of its resting height on screen) is read
from the release: no frame above what the drag left (+0.02), no frame above the one before
(+0.02), and at most 0.05 on its last painted frame. No per-frame bound: a thrown sheet carries
on at the finger's speed. WebKit at 390 is skipped: Playwright's WebKit touchscreen can tap but
not drag.

| tree | ch-phone | ch-desktop | wk-desktop |
|---|---|---|---|
| v11.1.0 | **R**: 0.405 at release, 0.973 next frame, back to 0.405, removed there | **R**: 0.46, 0.973, back to 0.46, removed | **R**: the same at 0.46 |
| tip | **R**: 0.147, then 0.973 | **R**: 0.2, then 0.973 | **R**: 0.2, then 0.973 |
| branch | G: 0.147, 0.105, 0.089 … last seen 0.013 | G: 0.2, 0.159, 0.141 … last seen 0.01 | G: 0.2, 0.152, 0.129 … last seen 0.01 |

Logs `w-*`, `try-branch-cd`.

## 4. The CHANGELOG (5a48119d0)

- (a) The reduced-motion paragraph's "nothing travels" and "in its place … from the first frame"
  are now true of the Slider and the dock Select (defects 1 and 2). It adds: a `Select`, menu or
  popover trigger seated in a dock darkens on a press without shrinking, so what it opens is
  placed against the trigger at rest.
- (b) It adds the other half of the layer change: glass no longer stills a site's own unlayered or
  inline animations and transitions under reduced motion, movement included, so a site that
  relied on that needs its own `prefers-reduced-motion` rule.
- (c) The popover paragraph adds that a `Toast` arrives the same way (it wears
  `data-reveal="overlay"`), and so does an element that wears `.glass-reveal` with no
  `data-reveal` or with `"overlay"`; and that `--enter-overlay-scale` and `--enter-overlay-blur`
  are still defined but no longer shape these entrances (read: `reveal.css` base and overlay
  register set `--glass-reveal-enter-scale: 1` and `--glass-reveal-blur: 0px`; the two tokens
  now reach only `--top-layer-enter-*`).
- (d) The ExpandableContainer paragraph adds that it no longer runs the
  `expandable-container-birth` and `expandable-container-arrive` keyframes, both still defined
  (read: on the tip both are only `@keyframes` blocks; on v11.1.0 `styles.css:43` and `:114` ran
  them).
- (e) The reversal sentence now says only what the v11.1.0 films show: closing a `Popover`,
  `DropdownMenu`, `Select` or `Toast` while it opened jumped to fully open, as did reopening a
  `Popover` or a tooltip while it left (critique 2's `redB-chromium-desktop`: the Popover
  0.16 to 1, the tooltip 0.002 to 1). The `DropdownMenu` (it fell to 0.227 and grew) and the
  `Select` (it emptied and stayed shut; the trigger-press sentence after it covers that) are no
  longer in the reopen half.
- (f) The detented sheet clause adds the drag: let go, it jumped back up to its rung before it
  closed; it now carries on down from where the finger left it.

One em dash in the entry (its heading); no internal ids. The six size figures are unchanged
(below).

## Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 (before the commits, same sources; `logs/typecheck-1.log`) |
| `npx vitest run --maxWorkers=2` on the 16 files that read the changed sources | 0: 190 passed, 1 expected fail |
| `npm run build` | 0 |
| `npm run verify:package` | 1 before the rebind (`3054556 > 3054190`), 0 after 3e3b76f94: `CLEAN`, 3,054,556 B |
| `npm run demo:dist:build` | 0 |
| `CI=true npx vitest run --maxWorkers=2` | 0: 285 files, 2,600 passed, 10 expected fail, 1 skipped |
| `npm -w tests-visual run gate:exits` (as `scripts/release.sh` runs it) | **0**, all sixteen parts (`logs/gate-1.log`): chromium-phone 123 passed, 17 skipped; chromium-desktop 130, 10; webkit-phone 99, 41; webkit-desktop 130, 10. Critique 2's tip read 121/17, 128/10, 98/40 and 127/10 with one failure; the difference is the two new cells and the dock Select cell |

**The 11.0.x and 11.1.0 release specs: read in part only.** `fix-3/reg-inner.sh` (critique 2's
list) read release-10-1-5 part A in Chromium on the branch: **84 passed** (`logs/chain.txt`).
Then, from about 19:05, every long-running process this workflow's Claude process started
was held stopped (`SIGSTOP`, state `T`) from outside the guard. That covered this seat's
background chains, a foreground run, and other seats' runs under the same parent (a `.p14`
check, the dock `m7` measurement, the demo preview on 5471). A run under another Claude
session was untouched. Nothing in `~/.claude/guard` sends a stop, and the guard logged no
refusal. Three attempts froze within seconds to minutes (`logs/reg-branch-partB-ch-frozen*.log`,
`runs.out`). Each was killed by PID, ports 5351 to 5356 were left free, and no process of this
seat remains. Part B and the other seven steps in Chromium, and all eight in WebKit, are left
for critic 3. This seat's source changes are a reduced-motion rule on the dock trigger, the
slider's reduced-motion clocks and the detent engine's release, and those specs run without
reduced motion and drag no detented sheet.

## Sizes

`critic-1/closure.mjs` on the branch's fresh `dist` and on v11.1.0's (`logs/sizes-branch-1.txt`,
`sizes-all-*.txt`): **dock 40,541 B gzipped, unchanged**; dialog 14,494, select 9,517, popover
9,385, tooltip 6,607, menu 12,555, each the CHANGELOG's figure. This seat's source added nothing
to them (the trigger and slider cures are stylesheet rules; the detent cure is in the sheet
chunk). The +366 B of the ratchet is those rules and the sheet chunk.

## Open, for critic 3 and the close

- **Entries that grew more than 0.5 KB gzipped and have no CHANGELOG line**, against v11.1.0
  (the dock-size note gives this line to the close; this seat's list does not name it): the root
  `glass-ui.js` 104,776 to 108,681 (+3,905), `command` 16,804 to 18,864 (+2,060), `sheet` 14,306
  to 16,337 (+2,031), `tabs` 19,091 to 20,154 (+1,063), `easing` 36,889 to 37,951 (+1,062),
  `motion` 12,599 to 13,477 (+878), `toast` 5,093 to 5,879 (+786). Not broken down here;
  this seat's changes add nothing to the six entries the CHANGELOG lists.
- The drag route is not read at WebKit 390 (Playwright's WebKit touchscreen cannot drag).
- Under reduced motion a drag-dismissed Sheet still snaps on release (its spring respects reduced
  motion by snapping), as on 11.1.0; not on this list.
- Real Safari is unmeasured for defect 1. The cure removes the pressed box the plate was placed
  against, so it does not rest on WebKit's event timing.
- The earlier release specs beyond Chromium part A (above).
- The pre-fix tree `.cache/tip-235b80e/tree` (gitignored, its `node_modules` linked to the
  worktree's) is left in place for critic 3's red reads of the new cells.

No tag, no push, no publish.
