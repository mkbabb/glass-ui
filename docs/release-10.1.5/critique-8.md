# 10.1.5 — critique, round 8 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `1343e3ecd` (fix round 8:
`870411576`, `2657cd274`, `9aaf0a79c`, the rebinds `e6c439343`/`d04dfd9a8` and the records
`09f11fb83`, `0819e485f`, `1343e3ecd`). I read every commit over `v10.1.4`, the fix round's
`src/` diff against `fd1c2443a`, `critique-7.md`, `implement.md` through its "Fix round 7"
section, every `inbound-*.md` and every orchestrator note, round 8's included.

Every run went through `guarded`: g7 heavy, Chromium (`chromium-headless-new`) in the browser
pool, Playwright WebKit 2287 under `--exclusive webkit`. The guard warned the zone leak ARMED
on every admission (by the owner's 2026-11-03 order it does not hold runs) and refused none.

## Probes

- **The branch's own spec**, `release-10-1-5.spec.ts` (84 cells, m1-m5 included), both engines,
  with `M5_DUMP` set so the m5 bands are banked (`critic-8/m5/`).
- **Round 8's own cells**, `tests-visual/release-10-1-5-critic-8.spec.ts` on the critic-7
  harness, both arms (`CRITIC_ARM=v1014` reads `git archive v10.1.4`). Rows bank to
  `critic-8/probe/<arm>/<project>/`.
  - **c8a** O-182: the 24 px band around the plate in dark on a flat `--background` ground, for a
    horizontal, vertical, collapsed, collapsed-and-hovered, overflowing and static-backdrop dock
    at 390 and 1440; each lighter pixel is located by its distance outside the plate's box
    (1 px, 2-4 px, 5+ px). Every shadow token's colour in dark. The light arm's computed dock
    shadow and shadow tokens against v10.1.4.
  - **c8b** M1: a collapse from a run scrolled to mid and to its end, in RTL, on a vertical
    overflowing run and on a layered run, 390 and 1440; the frames of the collapse; the
    re-expand.
  - **c8c** M2: the seats' frame trace through an expand that settles into the vertical yield
    (stages 340, 420, 600), and the last seat's keyboard ring against the run's clip across the
    vertical fit edge (stages 300 to 372 in 4 px steps).
  - **c8d** M4: a layered run at rest, Tab to the first and the last seat and back, scroll to
    the end.
  - **c8e** O-177: a hover-dwell expand and a press at the pointer, a re-aimed press; Tab expand,
    Escape fold, Shift+Tab and Tab back.
  - **c8f** O-161: a fine pointer's hover on a label tab, an icon seat, a labelled control and
    the DarkModeToggle.
  - **c8g** O-167: a press on the thumb 3 and 6 px off its centre with no move.
  - **c8h** the horizontal fit edge: a cap swept 16 px under to 4 px over the dock's natural
    width in 1 px steps, each end seat keyboard-focused, its ring against the run's clip.
- **Round 7's cells re-run on the tip**, `release-10-1-5-critic-8b.spec.ts` (critic-7b with its
  output moved to `critic-8/r7cells/`).
- **g6** release-10-1-4 and release-10-1-3, both engines. **g7** on the committed tip.
- Drivers: `scripts/gates-critic-8.sh`, `scripts/chain-critic-8.sh`, `scripts/chain2-critic-8.sh`,
  `scripts/webkit-all-critic-8.sh` (every WebKit run under one lock). Config
  `tests-visual/release-10-1-5-critic-8.config.ts`. Run log `critic-8/runs.txt`. My first chain
  queued its WebKit cells against the stock 2287 config, whose `webkit` project matches only
  the release specs, so `probe-wk` and `probe-v1014-wk` found no tests; I stopped that chain while
  it waited on the lock and re-ran every WebKit cell under the critic-8 config.

| run | engine | result |
|---|---|---|
| g7 (`critic-8/g7/`) | node | typecheck 0, build 0, demo:dist:build 0, vitest 247/247 files (2397 passed, 10 expected fail, 1 skip), verify:package terminal CLEAN at 10.1.5 (ratchet datum 2952688 holds) |
| `release-10-1-5.spec.ts` | Chromium | 84/84 |
| `release-10-1-5.spec.ts` | WebKit 2287 | **82/84**: `m5 O-182 horizontal` fails at 390 in both describe blocks (N2) |
| g6 release-10-1-4 | Chromium / WebKit | 23/23 / 15 + 8 skips (`page.pdf`) |
| g6 release-10-1-3 | Chromium / WebKit | 60/60 / 58 + 2 skips (CDP swipe); D-1 green in both |
| c8 cells, branch | Chromium / WebKit | 15 + 4 / 17, all banked |
| c8 cells, v10.1.4 | Chromium / WebKit | 8 + 4 / 10 |
| round-7 cells (critic-8b), branch | Chromium / WebKit | 22 + 1 skip / 22 + 1 skip (one process, no stall this time) |

## Verdict

Fix round 8's cures hold where they were aimed, in both engines: M1 (a collapse from a scrolled
run, now also in RTL, on a vertical run and on a layered run), M2 (no row with the flag or fitting
seats scrolls), M4 (the layered run rests at 0), the round-7 inbound rows, and O-182 (no light
pixel past the plate in dark beyond its own antialiased edge, where v10.1.4 lights 900 to 12,000
band pixels per cell). g6 and g7 are GREEN.

The branch is **not ready to tag**:
- **N2:** the branch's own release spec is RED in WebKit (2/84, the m5 witness), and the round's
  records do not carry O-182: no `fix-8.md` naming `9aaf0a79c` (the round-8 note asks for it), no
  O-182 section in `implement.md`, whose token line still says no existing token value moved, and
  a CHANGELOG that stops at the first implement round.
- **N1:** the M2 cure introduced a 6 px jump of every seat at the end of an expand on a vertical
  dock whose seats fit with under 14 px to spare, in both engines.
- **N3** is low, a ruling question more than a regression: the yield cuts the end seat's
  keyboard ring by up to 3 px at the fit edge.

## Defects (reproduced)

### N1: a fitting vertical dock's seats jump 6 px as the expand settles (O-166 class, introduced by the M2 cure; low-medium; both engines)

O-166 says the expand and collapse must not jump, snap or flash, and that a defect 10.1.5's own
code introduces there is in scope. The vertical yield is gated
`.glass-dock.vertical.expanded[data-run-fits]:not([data-morphing]) .dock-run` (run.css, THE
VERTICAL RESERVE YIELDS TOO). Through the morph the run holds its whole 7 px block reserve, and
on the first frame after `data-morphing` clears it drops to `--dock-run-room-block`. On a run
whose seats leave less than 14 px of room, that moves every seat in one frame.

- **c8c expand trace, coarse, stage 340** (`critic-8/probe/branch/<project>/c8c-coarse.json`, six
  icon seats, `collapse="closed"`, `expand()`):
  - Chromium: the last morphing frame has S1 at 23.98 px and S6 at 327.98 with `padding-top: 7px`.
    The next frame has S1 at 18 and S6 at 322 with `1px`. That is a 6 px step of every seat, and
    the trace is flat on both sides of it.
  - WebKit 2287: the run is scrolled 12 px through the morph (S1 11.98, `scrollTop 12`), and the
    next frame has S1 at 18, `scrollTop 0`, `1px`. That is a 6 px step the other way, plus the
    scroll reset.
- Stages 420 and 600 (room ≥ 14 px) step under 0.02 px in both engines. The fine pointer's band
  is the same mechanism at stages 316 to 324, where c8c's sweep reads `padding-bottom` 1, 3 and
  5 px. I traced the expand at 340 only, which on a fine pointer is outside the band.
- By the same gate the padding returns to the whole reserve when `data-morphing` is set at the
  start of a collapse. I did not trace that edge.
- v10.1.4 has no reserve, so this is new.
- **Cure direction:** the yield holds through the morph instead of switching at its edge. Either
  the reserve the run carries through the morph is already the yielded one (the room is a
  layout reading available before the flip), or the panes the morph moves are anchored so the
  run's padding cannot move them, which is the reason fix 7 gave for the gate. Gate: c8c's
  expand trace at 316 to 348, both pointers and both engines, with no step over 0.5 px at the
  morph's edge in either direction.

### N2: the branch's own release spec is RED in WebKit, and the round's records do not carry O-182 (medium: it blocks the tag; both the witness and the records)

- **`release-10-1-5.spec.ts` in WebKit 2287: 82/84** (`critic-8/branch-wk.log`). Both failures are
  `m5 O-182 horizontal` at 390, `band pixels lighter than the ground 10.1 (worst +3.0)`, 8 px. Fix
  round 8's own WebKit run failed the same 2 (`fix-7/witness-webkit.txt`, `branch-webkit exit=1
  2 failed`), and nothing in the records says so.
- **The cure is not what fails.** The 8 px are one column at x = 257 in the banked band,
  y = 24 to 31 (`critic-8/m5/m5-horizontal-390-webkit.png`). That is the extreme of the pill's
  right arc, at the plate's fractional edge (c8a: plate `x 66.59, w 256.80` at 390). WebKit
  rounds the screenshot clip's fractional origin, so the antialiased edge pixel lands 2 px past
  the box, and the witness excludes only 1. c8a, which reads distance from the box, finds every
  lighter pixel in both engines within 1 px of the edge, except 8 or 9 at 2 px in WebKit at 390
  only (horizontal and static). None is 3 px or further out, in any cell or either engine.
- **The records:**
  - `orchestrator-note-round8.md` asks the fix seat to name the O-182 commit in `fix-8.md`, and
    there is no `fix-8.md`.
  - `implement.md`'s "Fix round 7" section still lists O-182 under "Not cured here".
  - Its token line, "no existing token value moved", is now false: `9aaf0a79c` moves
    `--shadow-color`'s dark value (`dark-arm.css:92`). That is a cure that is the token itself,
    and allowed, but the patch law says to name it.
  - The committed `fix-7/gates.txt` (`1343e3ecd`) reads `vitest exit=1` (the
    `dockMorphMeasure` scroll-capture flake) and `verify-package exit=1` (the ratchet, rebound
    one minute later in `d04dfd9a8`), with no note. My g7 on the tip is GREEN.
  - The CHANGELOG's 10.1.5 entry still describes only the first implement round. It still says
    the collapsed plate is round because the timeline is named only on the active pane, the
    claim fix 7 corrected in code. It names two moved token values where there are now three.
- **Cure direction:** the m5 band excludes the plate's antialiased edge by distance from the
  outline with a 2 px margin, or reads the band at device scale with the clip origin rounded as
  the engine rounds it. Then `fix-8.md` names `9aaf0a79c` and records m5 in both engines, and
  `implement.md` names the `--shadow-color` move. The CHANGELOG is the close seat's to rewrite,
  but its token sentence should be true now.

### N3: the yield cuts the end seat's keyboard ring by up to 3 px at the fit edge (low; both engines; ruling question)

The round-5 ruling's gate is "the end seat's ring stays whole", and round 6 accepts the hover
bound "provided the focus ring itself stays whole". At the fit edge the room is under the
ring's reach, and the yielded reserve cannot hold it.

- **Vertical (fix 7's yield), c8c:** with S6 keyboard-focused (`:focus-visible`) at the fit edge,
  stage 316 (fine) or 340 (coarse) gives `padding-bottom 1px` and a ring cut of 3 px, and the
  next stage up gives `3px` and 1 px. The figures match in both engines.
- **Horizontal (fix 5's yield), c8h:** a cap swept in 1 px steps, both end seats focused. Over
  5 px of caps (293 to 297 fine, 309 to 313 coarse) the ring is cut 2.47, 1.97, 1.47, 0.97 and
  0.47 px (Chromium; WebKit 2.41 max). v10.1.4 cuts the same rings 4 px at every cap in that
  band, so the horizontal case is better than v10.1.4 and is not a regression.
- At 320 coarse the room covers the ring, as the ruling assumed. The cut is confined to the last
  few pixels before the seats stop fitting. It is a ruling question: either the run scrolls (the
  cap's cut) once the room falls under the ring's reach, or the bound is accepted and recorded.

## Not defects, recorded

NOT### N1: a fitting vertical dock's seats jump 6 px as the expand settles (O-166 class, introduced by the M2 cure; low-medium; both engines)

O-166 says the expand and collapse must not jump, snap or flash, and that a defect 10.1.5's own
code introduces there is in scope. The vertical yield is gated
`.glass-dock.vertical.expanded[data-run-fits]:not([data-morphing]) .dock-run` (run.css, THE
VERTICAL RESERVE YIELDS TOO). Through the morph the run holds its whole 7 px block reserve, and
on the first frame after `data-morphing` clears it drops to `--dock-run-room-block`. On a run
whose seats leave less than 14 px of room, that moves every seat in one frame.

- **c8c expand trace, coarse, stage 340** (`critic-8/probe/branch/<project>/c8c-coarse.json`, six
  icon seats, `collapse="closed"`, `expand()`):
  - Chromium: the last morphing frame has S1 at 23.98 px and S6 at 327.98 with `padding-top: 7px`.
    The next frame has S1 at 18 and S6 at 322 with `1px`. That is a 6 px step of every seat, and
    the trace is flat on both sides of it.
  - WebKit 2287: the run is scrolled 12 px through the morph (S1 11.98, `scrollTop 12`), and the
    next frame has S1 at 18, `scrollTop 0`, `1px`. That is a 6 px step the other way, plus the
    scroll reset.
- Stages 420 and 600 (room ≥ 14 px) step under 0.02 px in both engines. The fine pointer's band
  is the same mechanism at stages 316 to 324, where c8c's sweep reads `padding-bottom` 1, 3 and
  5 px. I traced the expand at 340 only, which on a fine pointer is outside the band.
- By the same gate the padding returns to the whole reserve when `data-morphing` is set at the
  start of a collapse. I did not trace that edge.
- v10.1.4 has no reserve, so this is new.
- **Cure direction:** the yield holds through the morph instead of switching at its edge. Either
  the reserve the run carries through the morph is already the yielded one (the room is a
  layout reading available before the flip), or the panes the morph moves are anchored so the
  run's padding cannot move them, which is the reason fix 7 gave for the gate. Gate: c8c's
  expand trace at 316 to 348, both pointers and both engines, with no step over 0.5 px at the
  morph's edge in either direction.

### N2: the branch's own release spec is RED in WebKit, and the round's records do not carry O-182 (medium: it blocks the tag; both the witness and the records)

- **`release-10-1-5.spec.ts` in WebKit 2287: 82/84** (`critic-8/branch-wk.log`). Both failures are
  `m5 O-182 horizontal` at 390, `band pixels lighter than the ground 10.1 (worst +3.0)`, 8 px. Fix
  round 8's own WebKit run failed the same 2 (`fix-7/witness-webkit.txt`, `branch-webkit exit=1
  2 failed`), and nothing in the records says so.
- **The cure is not what fails.** The 8 px are one column at x = 257 in the banked band,
  y = 24 to 31 (`critic-8/m5/m5-horizontal-390-webkit.png`). That is the extreme of the pill's
  right arc, at the plate's fractional edge (c8a: plate `x 66.59, w 256.80` at 390). WebKit
  rounds the screenshot clip's fractional origin, so the antialiased edge pixel lands 2 px past
  the box, and the witness excludes only 1. c8a, which reads distance from the box, finds every
  lighter pixel in both engines within 1 px of the edge, except 8 or 9 at 2 px in WebKit at 390
  only (horizontal and static). None is 3 px or further out, in any cell or either engine.
- **The records:**
  - `orchestrator-note-round8.md` asks the fix seat to name the O-182 commit in `fix-8.md`, and
    there is no `fix-8.md`.
  - `implement.md`'s "Fix round 7" section still lists O-182 under "Not cured here".
  - Its token line, "no existing token value moved", is now false: `9aaf0a79c` moves
    `--shadow-color`'s dark value (`dark-arm.css:92`). That is a cure that is the token itself,
    and allowed, but the patch law says to name it.
  - The committed `fix-7/gates.txt` (`1343e3ecd`) reads `vitest exit=1` (the
    `dockMorphMeasure` scroll-capture flake) and `verify-package exit=1` (the ratchet, rebound
    one minute later in `d04dfd9a8`), with no note. My g7 on the tip is GREEN.
  - The CHANGELOG's 10.1.5 entry still describes only the first implement round. It still says
    the collapsed plate is round because the timeline is named only on the active pane, the
    claim fix 7 corrected in code. It names two moved token values where there are now three.
- **Cure direction:** the m5 band excludes the plate's antialiased edge by distance from the
  outline with a 2 px margin, or reads the band at device scale with the clip origin rounded as
  the engine rounds it. Then `fix-8.md` names `9aaf0a79c` and records m5 in both engines, and
  `implement.md` names the `--shadow-color` move. The CHANGELOG is the close seat's to rewrite,
  but its token sentence should be true now.

### N3: the yield cuts the end seat's keyboard ring by up to 3 px at the fit edge (low; both engines; ruling question)

The round-5 ruling's gate is "the end seat's ring stays whole", and round 6 accepts the hover
bound "provided the focus ring itself stays whole". At the fit edge the room is under the
ring's reach, and the yielded reserve cannot hold it.

- **Vertical (fix 7's yield), c8c:** with S6 keyboard-focused (`:focus-visible`) at the fit edge,
  stage 316 (fine) or 340 (coarse) gives `padding-bottom 1px` and a ring cut of 3 px, and the
  next stage up gives `3px` and 1 px. The figures match in both engines.
- **Horizontal (fix 5's yield), c8h:** a cap swept in 1 px steps, both end seats focused. Over
  5 px of caps (293 to 297 fine, 309 to 313 coarse) the ring is cut 2.47, 1.97, 1.47, 0.97 and
  0.47 px (Chromium; WebKit 2.41 max). v10.1.4 cuts the same rings 4 px at every cap in that
  band, so the horizontal case is better than v10.1.4 and is not a regression.
- At 320 coarse the room covers the ring, as the ruling assumed. The cut is confined to the last
  few pixels before the seats stop fitting. It is a ruling question: either the run scrolls (the
  cap's cut) once the room falls under the ring's reach, or the bound is accepted and recorded.

## What held (refutation attempts that failed)

- **M1 in every posture I tried, both engines** (c8b): a collapse from a run scrolled to mid or to
  its end, in RTL (negative `scrollLeft`), on a vertical overflowing run and on a layered run, at
  390 and 1440, on both pointers. Every settled collapsed plate is uniform at half its extent,
  and every frame after `.collapsed` is set is uniform except the first vertical frame (above).
  The re-expand restores the cut the scroll position says (`28px 16px 16px 28px` at the RTL end,
  `16px 16px 32px 32px` at the vertical end). v10.1.4 is RED in the same cells
  (`calc(0% + 16px)` on all four corners, or `50%` at the vertical end).
- **Round 7's cells on the tip, both engines** (`critic-8/r7cells/`): r7a 12/12 collapsed rows
  uniform per pointer; r7c 0 rows with the flag set and `sh > ch`, and 0 non-uniform rows with
  nothing to scroll; r7i 9/9 presses activate once (7 of them mid-morph); r7h idles shut by +5.5 s
  and after a remount; r7f 0 stuck seats after a tap; r7l rests at `sl 0` with S1 10 px in.
- **M2's sweep** (c8c ring sweep): every row with the flag set has `sh = ch`, both engines.
- **M4** (c8d, both engines): rest at `sl 0`, leading corner at the rest length, Tab to S1 and back.
- **O-161** (c8f): a fine pointer's hover still paints. The label tab, icon seat and labelled
  control take `scale 1.1` and the hover fill, and the DarkModeToggle goes from opacity 0.8 to 1
  with its fill. On the coarse page none of them paints.
- **O-177 keyboard** (c8e, both engines): Tab onto the folded face expands and lands on S1.
  Escape folds and hands focus to the summary, and the dock stays folded at +1.5 s. Shift+Tab
  and Tab back reopens it.
- **The cut still fires on a true overflow:** c8a's overflowing dock rests `28px 16px 16px 28px` at
  `sl 0` in both engines, and round 7's r7a/r7j rows cut and restore as the scroll says.
- **g1 and g2 through the branch spec's own cells** (84/84 Chromium, 82/84 WebKit, failing only
  m5): the rest corner at 390, 844 and desktop with the pointer on the trailing seat, the
  collapsed circle, every layer, the Slider thumb at min, mid and max, the coarse type floor, the
  menu gap.
- **g6 and g7:** see the table. No export removed or renamed (verify:package CLEAN). The new
  internal properties (`--dock-run-room-block`, `--dock-run-cross-half`, `--slider-fill-ink`) each
  serve a cure.

## Not measured

- Real Safari: safaridriver is not enabled. Every WebKit cell is Playwright WebKit 2287.
- The critic-7 battery (`critic-4` to `critic-6` cells) was not re-run end to end; round 7's own
  cells, the branch spec's 84 cells and the c8 cells cover the postures the fix touched.
- A touch drag on the Slider: Playwright's touchscreen has no move.
- My coarse describe blocks read `test.info().project.use.isMobile`, which is the project's
  setting, not the block's `test.use`; their pointer paths therefore used the mouse on an
  `isMobile`/`hasTouch` page (the `(hover: hover)` and `(pointer: coarse)` media still matched the
  touch page, as c8f's coarse rows show: no hover paint). The branch spec's `open7` makes the
  same read.
