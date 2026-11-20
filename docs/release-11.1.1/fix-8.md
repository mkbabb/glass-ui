# 11.1.1 fix seat 8 (before critic 8)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`04c7ddecd` (critique 7). Every orchestrator note in this directory was read, with `critique-7.md`
and `fix-7.md`. The list is critique 7's one defect. No bound was widened and no source changed.

**First sitting (to 17:03): not measured.** The owner's power hold (`docs/tranches/BL/driver/power-hold.py` in the main
checkout) was on for the whole sitting. It pauses every process of this worktree while the battery
is at 40 % or less, and resumes them at 80 %. The battery read 15 % at 16:57 and 14 % at 17:02,
charging on AC but falling about a point every four minutes at a 1-minute load of 10 to 13
(`fix-8/logs/hold.txt`). So it could not reach 80 % within the sitting. No build, typecheck, test,
probe or browser run was started, `guarded` was not called, and ports 5351 to 5356 were never
opened. The cure was committed with its witness owed.

**Second sitting (19:49 to 22:17): measured, in part.** The machine had rebooted at 33 % on the
charger, and the owner's order of 19:47 changed the hold: a run pauses at 20 % or less while the
battery falls, or at 10 % or less whatever it does. The hold paused nothing of this seat. Read in
this sitting, on the tip:
- the witness, RED and GREEN in the four projects;
- the exits gate whole as `scripts/release.sh` runs it: 15 of its 16 parts green, and one cell
  in WebKit 390 part D failed on a long frame (below);
- part B in WebKit 390 three times running;
- row A's cell in Chromium 390;
- the five static gates on a fresh build, and a typecheck of the edited specs.

It stopped before the disclosure guard and the earlier release specs, whose load waits never
cleared. At 22:17 the battery read 10 %, down from 25 % at 21:57, falling on AC at a 1-minute load
of 36 to 53 from other sessions' runs. The hold's own process was no longer running: its state
was last written at 20:11. The owner's rule pauses every run at 10 %, so this seat stopped its
chain by PID during a wait, with no run active, and started nothing more. Every run went through
`guarded`, WebKit under `--exclusive webkit`, on ports 5351 to 5354. The guard refused nothing.
It held heavy runs for headroom when the load passed 36 (the build, `demo:dist:build` and vitest
waited 11 to 22 minutes each), and two WebKit parts waited on the lock for a few minutes.

## Commit

| item | commit | what |
|---|---|---|
| 1 | 02dd6a7cb | a film resolves once it holds its first frame (`firstFrame`); `exitOf` fails by name when the film holds no frame of the surface before its mark (spec only) |

No tag, no push, no publish.

## 1. A film's first frame, waited for by the frame

**The fault, as critique 7 and fix 7's `gate.log` place it.** `startFilm` (`film.ts`) registered
its frame callback and then waited `waitForTimeout(80)` without reading whether a frame had been
filmed. `markFilm` stamps the mark at once. On a page that drew no frame in those 80 ms, every
sample was later than the mark, `exitOf` returned `rest` as `undefined`, and `judgeLeave` read it
(`TypeError: Cannot read properties of undefined (reading 'present')` at `areaOnScreen`). It
happened once on the final tip: `routes · a CommandDialog keeps its list through its exit by pick`,
in the exits gate's chromium-phone part A at a load of about 40. Its `escape` and `outside`
routes passed beside it.

**The cure (`02dd6a7cb`).**
- `film.ts` gains `firstFrame(page, key)`. It waits in the page until `window[key].frames` holds
  one sample (`page.waitForFunction`, polled each animation frame), with no fixed delay. The mark,
  or the input that follows, then comes after a filmed frame however late the page draws. A frame
  is stamped with its frame time, which is no later than its callback, so that first sample
  always lies before a mark stamped after it.
- Each film that waited a flat 80 ms after it started now waits on its own first frame:
  - `startFilm` (`__film`);
  - `startSheetFilm` (`__sheet`, `release-11-1-1.spec.ts`);
  - in `release-11-1-1-reduce.spec.ts`: `filmFold` (`__fold`), the run mark's film (`__run`),
    `holdPress` (`__hold`) and the Slider's fill (`__fill`).
- `exitOf` throws `the film holds no frame of the surface before its mark`, with the mark and the
  first four samples, when no present frame comes before the mark. This covers the one case the
  wait cannot exclude: a film whose frames before its mark do not find the surface. The two `form`
  cells' own `expect(rest).toBeTruthy()` checks could no longer fail, so they were removed.
- Not changed: the reduce spec's `still` cell waits 80 ms after `page.mouse.move` (`:462`). That
  wait comes before its film starts and lets the hover land; no film reads it. The film that
  follows it (`__fill`) is cured above. The other 80 ms waits in `tests-visual/` belong to other
  releases' specs, which the gate does not run.

**What reads frames before the mark**, checked so that one frame there in place of 80 ms of
them keeps every verdict:
- `exitOf` and the reduce spec's `judgeLeg` read the last frame before the mark;
- the standing cells (`start`), the drag-off cell (`left`) and the sheet drag-up cells (`from`)
  read the last frame before the mark too;
- `judgeOverlay` reads the last frame before its mark or its turn.

A film of a close starts 500 to 1200 ms after its surface opened. A film of an entrance starts
with the surface absent. So the 80 ms never let a surface settle.

## The witness (second sitting)

The tip snapshot was synced to `02dd6a7cb` (`fix-7/sync-tip.sh`). Then the three
`routes · a CommandDialog keeps its list through its exit by …` cells were run with `fix-7/run.sh`
(`fix-8/chain1.sh`, 19:51 to 19:53, 1-minute load 13 to 25). `red` is the v11.1.0 git-archive
tree with the branch's specs and `film.ts` copied in. Logs and reports are
`fix-7/logs/f8-w-{tip,red}-<project>.{log,json}`.

| project | tip `02dd6a7cb` | v11.1.0 |
|---|---|---|
| Chromium 390 | 3 passed | 3 failed |
| Chromium 1440 | 3 passed | 3 failed |
| WebKit 1440 | 3 passed | 3 failed |
| WebKit 390 (outside skipped) | 2 passed | 2 failed |

- **Every v11.1.0 cell fails on its named claim,** `the list is mounted while the plate is seen`,
  with no crash. The plate drops from 435 px to 51 px on its first exit frame while it is still
  seen at opacity 0.117.
- **No v11.1.0 cell failed for want of a frame before its mark,** so the films hold a rest frame
  on both trees.
- **The cell that crashed at 15:58 passes in a part A pass.** `… by pick` passes in the exits
  gate's Chromium 390 part A on the final tip: 38 passed and 3 skipped, against 37 passed and 1
  failed before the cure.

## Every other cell: the exits gate whole on the final tip

`fix-8/gate.sh` ran `npm -w tests-visual run gate:exits` on the worktree at `a476d0cba`. That is
the cure's source and specs plus the first sitting's record. It ran from 19:53 to 20:19 on port
5354, at a 1-minute load of 7 to 21, and stopped at part index 11, as `release.sh` would. The four
parts after it ran one by one (`fix-8/gate-rest.sh 12`, to 20:28). Logs are `fix-8/logs/gate.log`
and `gate-webkit-desktop-*`.

| project | A (form, glass, exit, routes, round, weight, lift, sheet) | B (reverse, tooltip, expand, leave) | standing | D (site, fade, fold, mark, press, still) |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 32 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 32 + 11 skipped | 27 + 17 skipped | 15 + 2 skipped + **1 failed** |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

Part A and part D, the parts whose films the cure touches, keep every verdict in the four
projects but one, the failure below. In every film that waits on its first frame, `firstFrame`
reads a `frames` array the page writes: `__film`, `__sheet`, `__fold`, `__run`, `__hold` and
`__fill`.

**The one failure: `fade · a Sheet bottom appears and leaves on a fade`, WebKit 390, part D**
(20:18, load about 15).
- **The reading.** Its out leg ran 305 ms over 13 fading frames, against the bound of 200 ms plus
  slack (220.7). Its in leg read 201 ms. Every other fade leg in that part read 117 to 207 ms
  (`fix-8/logs/gate-whole-webkit-phone-3.json`, the gate's report of the part).
- **Why the leg ran long.** The Sheet's reduced-motion fade runs on `runExitClock`
  (`src/composables/motion/spring/exitClock.ts`). It advances at most one 60 Hz frame, 16.7 ms,
  per animation frame, so a long frame slows the run instead of skipping part of it. The 105 ms
  over the clock and the one extra fading frame fit one frame of about 100 ms in the leave.
- **What the cure changes in this cell.** Only the wait between the film's start and its mark.
  That is one frame where it was 80 ms, after the Sheet has stood open for at least a second. The
  frames the leg is read from all come after the mark.
- **Owed.** This seat reads it as the page's frame pace under load, not as an effect of the cure,
  but did not re-read it. `fix-8/chain4.sh` holds the re-read: the cell ten times on the tip and
  ten times on the tip before the cure (`cc0384d4e`), then WebKit 390 part D whole. It was
  stopped before it reached them.
- **Not changed.** No bound moved and no source changed.

## Critique 7's still-owed items

**Part B in WebKit 390, three times running** (tip snapshot `02dd6a7cb`, each started at a
1-minute load under 16, `fix-7/logs/f8-b-tip-webkit-phone-{1,2,3}`): 32 passed and 11 skipped,
three times (20:28 to 20:35, loads 9 to 21 at the end). The gate's own WebKit 390 part B, just
before, read the same. No reversal film was refused as holed. Fix 7 read 2 failures in each of
its first two runs at loads of 26 to 44.

**Row A's cell, Chromium 390** (`fix-7/logs/f8-h-tip-chromium-phone`, started at a load of 9.1,
25.7 at its end; summed with `fix-7/sumA.py`): passed.
- **Clause (2):** one `block-size` value through the rise (`heightSpread` 0).
- **Clause (3):** the largest frame step is 0.105 of the travel.
- **Clause (1):** taps at the close button's drawn centre hit it and close the sheet 20 times in
  20 at +120, +190, +250 and +400 ms. At +120 two presses were not aimed, because a later frame
  had moved the button, and were taken again. The button stood 112 to 129 px from rest at +190
  and 0 to 0.2 px at +400.

**The five static gates on a fresh build** (`fix-8/gates.sh` at `a476d0cba`, one guarded run each,
`fix-8/logs/gates.out`), all exit 0:
- typecheck;
- build;
- `verify:package`, terminal CLEAN;
- `demo:dist:build`;
- vitest: 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

**A typecheck of the edited specs.** The three edited files were checked under a standalone
`tsc --ignoreConfig --strict --types node` (TypeScript 6.0.3, `fix-8/logs/tsc-spec-tip.log`):
`release-11-1-1.spec.ts`, `release-11-1-1-reduce.spec.ts` and `release-11-1-1/film.ts`. The
only errors are the two missing `pngjs` declarations. The same three files at `04c7ddecd` give
the same two (`tsc-spec-parent.log`; line 166 there is line 164 on the tip, two lines having
gone).

## Owed

Not read, because the battery stopped the sitting:
- the disclosure guard, twenty films on each tree, interleaved, at a load under 10 (the 1-minute
  load stayed over 29 from 20:37 on);
- the release-10-1-5, 11-0-1, 11-0-2 and 11-1-0 specs in both engines (`fix-8/reg-inner.sh`,
  critic 6's step list);
- the Sheet bottom fade's re-read and WebKit 390 part D whole, as above, and then the exits gate
  whole once more, since `release.sh` stops on the part that failed.

`fix-8/chain4.sh` runs all three in that order after its gates. Chains 2 and 3 were stopped in a
load wait at 20:48, with the load at 66 to 78, and chain 4 took their remaining steps.

Nothing of this seat is left running.
