# 11.1.1 fix seat 8 (before critic 8)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`04c7ddecd` (critique 7). Every orchestrator note in this directory was read, with `critique-7.md`
and `fix-7.md`. The list is critique 7's one defect. No bound was widened and no source changed.

**Not measured.** The owner's power hold (`docs/tranches/BL/driver/power-hold.py` in the main
checkout) was on for the whole sitting. It pauses every process of this worktree while the battery
is at 40 % or less, and resumes them at 80 %. The battery read 15 % at 16:57 and 14 % at 17:02,
charging on AC but falling about a point every four minutes at a 1-minute load of 10 to 13
(`fix-8/logs/hold.txt`). So it could not reach 80 % within the sitting. No build, typecheck, test,
probe or browser run was started, `guarded` was not called, and ports 5351 to 5356 were never
opened. The cure is committed. Its witness is owed (at the end).

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

## Owed, once the hold lifts

On the tip, each run through `guarded` (WebKit under `--exclusive webkit`), at the load the guard
admits, with `fix-7/run.sh` and `fix-7/sync-tip.sh 02dd6a7cb`:
- **The witness.** The three `routes · a CommandDialog keeps its list through its exit by …`
  cells, from a part A pass in Chromium 390, Chromium 1440 and WebKit 1440 (and WebKit 390 for
  `pick` and `escape`): GREEN on the tip, and RED on v11.1.0 (`red`, which copies the branch's
  specs and `film.ts` into the v11.1.0 tree) by `the list is mounted while the plate is seen`,
  not by a crash.
- Every other cell keeps its verdict: part A and part D (the reduce spec's films, which the commit
  also touches) in the four projects.
- Then what critique 7 lists as owed: the exits gate whole on the final tip as
  `scripts/release.sh` runs it, part B in WebKit 390 three times running, row A's cell in Chromium
  390 at a load under 16, the disclosure guard twenty times on each tree, and the earlier release
  specs.

Nothing of this seat is left running.
