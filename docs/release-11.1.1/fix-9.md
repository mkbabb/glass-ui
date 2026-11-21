# 11.1.1 fix seat 9 (before critic 9)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`c704f7e46` (critique 8). Every orchestrator note in this directory was read, the frost note among
them, with `critique-8.md` and `fix-8.md`. The list is critique 8's three defects. Every run went
through `guarded`, WebKit under `--exclusive webkit`, on ports 5351 to 5354. The guard refused
nothing.

## Commits

| item | commit | what |
|---|---|---|
| 2 (WebKit's first frame) | fb0993d97 | `firstFrame` resolves once the page's clock has passed the first frame's stamp; the fade judge and the standing judge fail by name with no frame before the mark (spec only) |
| 1 (frost) | d61228a78 | SheetContent writes one fade value; the plate and the frost span both read it. The reduce spec's three Sheet cells film the frost layer |
| ratchet | 3aae1dc49 | 3,056,356 to 3,056,513 (+157 B), after the last source commit |
| sizes | fa2ffa8f6 | the CHANGELOG's root entry and sheet sizes, measured again |

No tag, no push, no publish.

## 1. A Sheet's frost layer fades with its plate under reduced motion

**Cause** (critique 8, defect 1). The plate's reduced-motion fade was written on the plate alone:
`springStyle` set `opacity` from `sheetDetents.opacity` for a detented Sheet and from `1 - p` for a
sliding one. The frost span after the content (`[data-slot="glass-graded-halo"]`) had no style, and
`sheet/styles.css` sets no opacity on it.

**Cure** (`d61228a78`), as the note writes it. SheetContent computes one `fade` value:
- `sheetDetents.opacity` for a detented Sheet;
- `1 - position` for a sliding Sheet under reduced motion and not dragged;
- null otherwise, including with motion off.

`springStyle` reads it for the plate's `opacity` (and for the sliding Sheet's translate, which is
0 while it fades, as before). A `haloStyle` computed from the same value is bound to the frost span.
Without reduced motion the value is null and neither box takes an inline opacity, so the
normal-motion half stays as it was (11.1.2 by the note). No export, prop or token changes.

**Witness.** The reduce spec's `fade · a Sheet right`, `· a Sheet bottom` and `· a detented Sheet`
cells now film the frost layer as the film's companion: `startFilm` records the companion's effective
opacity on every frame it is mounted, whether the plate is or not (`Frame.alsoOp`). For each leg the
cell asserts:
- the frost layer is filmed;
- on every frame it is mounted, its opacity is within 0.02 of the plate's. A frame where it is
  mounted and the plate is gone counts the plate as 0, so a frost layer that outlasts its plate
  fails here;
- its own leg passes the spec's fade judge, as the plate's does: at least two fading frames,
  monotone, over within 200 ms plus a frame;
- in: it enters from 0.02 or less.

Run with `--repeat-each=3` (9 films a project), `fix-9/run.sh`, logs `fix-9/logs/frost-<tree>-<project>`,
read with `fix-9/frost.py` (`.txt` beside each report).
- `red` is v11.1.0: the git-archive tree with the branch's specs copied in.
- `d0` is d0f85bd29's `src` in the snapshot tree, with the same specs.

| project | v11.1.0 | d0f85bd29 | branch |
|---|---|---|---|
| Chromium 390 | 9 failed | 9 failed | 9 passed |
| Chromium 1440 | 9 failed | 9 failed | 9 passed |
| WebKit 390 | 9 failed | 9 failed | 9 passed |
| WebKit 1440 | 9 failed | 9 failed | 9 passed |

- **v11.1.0.** Each film first fails the plate's own fade ("in: the fade spans at least two
  frames"), which is row 8's v11.1.0 red. The frost clauses fail too, read from the attachment:
  - in: the frost layer enters at 1 and its leg has no fading frame;
  - out: it is gone with its plate by the first or second frame after Escape. No frost frame is
    filmed in 34 of 36 films, and in the other two it is at 1 on its one frame.
- **d0f85bd29.** Each film fails by name on the frost layer: "in: on every frame the frost layer
  is mounted, its opacity is within 0.02 of the plate's". The gap is 1 on both legs. The frost
  layer enters at 1 and holds at 1 through the plate's fade (26 to 30 frames out in Chromium,
  21 to 22 in WebKit), with no fading frame of its own.
- **Branch.** The frost layer and the plate read one value on every frame: the gap is 0 in all 36
  films. The frost layer enters at 0. Its legs fade over 19 to 26 frames, in 185 to 208 ms,
  like the plate's.

**One clause of the note read differently: "it leaves at 0.02 or less".** On the branch the frost
layer's last mounted value equals the plate's last mounted value in all 36 films, as one value on
both boxes must make it. That value is the fade's last painted step, because the mount is released
on the frame the fade reaches 0, before that frame paints. It read 0.001 to 0.040, and above 0.02 in
15 of 36 films (1 of 9 in Chromium 390, 2 in Chromium 1440, 7 in WebKit 390, 5 in WebKit 1440).
Critique 8's own films of the plate on d0f85bd29 read the same step, up to 0.031. The spec's fade
judge has accepted this step for every plate since row 8.

Read literally, as an absolute bound on the frost layer's last frame, the clause would hold the
frost layer to a bound its own plate does not meet. It would fail by the phase of the frame, the
class of failure item 2 cures, unless the plate's mount release changed. The list does not name that
change. So the cell reads the leave as leaving on the plate's fade:
- within 0.02 of the plate on its last frame and on every frame;
- never mounted visibly past the plate;
- its own leg judged a fade.

`frost.out.last` and `plateLast` are kept in each film's attachment. The clause bites where the
note says it should: on v11.1.0 the frost leg has no fading frame, and on d0f85bd29 it fails the
gap and the fade judge.

**Static.** Typecheck, the sheet unit tests (8 files, 54 passed) and a standalone `tsc --strict`
of the three edited specs (only the two known `pngjs` declarations missing) on the working tree
before the commits. The gates below were run on the committed tree.

## 2. A film's mark lies after its first frame on any clock

**Cause** (critique 8, defect 2). `firstFrame` resolved on `frames.length > 0`. WebKit 2287 stamps
the frame and `performance.now()` on a 1 ms clock, so the mark that follows could share the first
frame's millisecond, leaving no frame strictly before it.

**Cure** (`fb0993d97`), as critique 8 writes it.
- `firstFrame` resolves once `frames.length > 0 && performance.now() - t0 > frames[0].t`. A mark
  stamped after it is strictly later than the first frame on any clock resolution.
- Every film it waits on keeps `t0` on the film and stamps `t` from it. `__film` and `__sheet`
  already did. The reduce spec's fold (`__fold`) and run mark (`__run`) now keep their `t0` on the
  film. The held press (`__hold`) and the Slider's fill (`__fill`) now stamp their frames, and
  their judges read the same values as before.
- `lastBefore(film, present)` in `film.ts` returns the last frame before the mark and fails by
  name when there is none. `exitOf` uses it for the last present frame. The reduce spec's
  `judgeLeg` and the standing judge use it for the last frame (their `before[before.length - 1]`
  reads at `:58-60` and `:1877-1879`).
- Not changed: the drag-off cell, the sheet drag-up cells and `judgeOverlay` also read a frame
  before a mark. Each of those marks comes after a drag or an opened surface, hundreds of
  milliseconds after the film's first frame, so the race cannot reach them. The list names the two
  judges whose mark follows the first frame directly. No bound moves.

**Witness.**
- **Critique 8's `raf.mjs` and `raf-cured.mjs`, run again** (`fix-9/chain2.sh`; logs
  `fix-9/logs/raf-webkit.json`, `raf-cured-webkit.json`). WebKit 26.5 (build 2287), sixty films
  per form.
  - The old wait: 1 case in 120 (desktop, mark 9 and first frame 9). Critique 8 read 12 in 120.
  - The cured wait: 0 in 120. Critique 8 read 0 in 120, and 0 in Chromium.
- **The spec's own film module** (`fix-9/probe/firstframe.probe.ts`). It runs `startFilm`, then
  `markFilm`, then `stopFilm` on a plain page, with `film.ts` taken from d0f85bd29 or from the
  branch.
  - At 60 films in each of the four projects, 0 cases on either module.
  - At 200 films in WebKit, the margin (the mark less the first stamp) shows the race.
    - d0f85bd29's module: under 2 ms in 82 of 200 at 390 and 17 of 200 at 1440, none at 0 or less.
    - The branch's: under 2 ms in 9 and 1, and by construction never 0 or less.

  The heavier film callback makes the shared millisecond rarer than in `raf.mjs`, so this probe
  reads the margin rather than a red count.
- **The exits gate's WebKit 390 parts A and D:** below.

## 3. The CHANGELOG's reduced-motion sentence

"Each now fades in and out over at most 200 ms" names sheets. With item 1 cured, a glass Sheet's
frost layer fades with its plate over the same clock (185 to 208 ms in the films above), so the
sentence is true as it stands. Its wording is unchanged. The size lines changed (below).

## Ratchet and sizes

`fix-9/sizes.sh` built the committed tree at `d61228a78` and packed it (`fix-9/logs/pack-tip.json`).
- The unpacked total is 3,056,513 B, against the ratchet's 3,056,356 (+157 B). It was rebound once,
  after the last source commit (`3aae1dc49`).
- Critic 6's `sizes.py` (`fix-9/logs/sizes.txt`) moves two of the CHANGELOG's figures:
  - the root entry, 108,642 to 108,672 B gzipped;
  - `sheet`, 16,695 to 16,726.

  Corrected in `fa2ffa8f6`.
- Every other entry the size section names is unchanged:
  - the dock entry at 40,533;
  - `dialog`, `select`, `popover`, `tooltip`, `menu`, `command`, `tabs`, `easing`, `motion` and
    `toast`.

## The gates on the committed tree

`fix-9/gates.sh` ran on `fa2ffa8f6`, one guarded run each, at a 1-minute load of 25 to 28
(`fix-9/logs/gates.out`). All exited 0:
- typecheck;
- build;
- `verify:package`, terminal CLEAN;
- `demo:dist:build`;
- vitest `--maxWorkers=2`: 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

## The exits gate whole

`fix-9/gate.sh` ran `npm -w tests-visual run gate:exits` (as `scripts/release.sh` runs it) on
`fa2ffa8f6`, every part on port 5354. It ran from 17:56 to 18:27, at a 1-minute load of 27 falling
to 14. It exited 0, with all sixteen parts green (`fix-9/logs/gate.log`, `gate.out`).

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 32 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 32 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

- Every count equals fix 8's on its tip, except WebKit 390 part D: there the cell that failed in
  fix 8 on a long frame now passes, so it is 16 where fix 8 read 15 and one failure.
- The frost clauses run in part D in all four projects.
- WebKit 1440's standing part logged three "ResizeObserver loop completed with undelivered
  notifications" errors from the page, with every cell passing. The same message is in fix 8's
  and critique 8's WebKit 1440 standing parts on d0f85bd29 (`fix-8/logs/gate-webkit-desktop-2.log`,
  `critic-8/logs/tip-webkit-desktop-2.log`), so it is not from this round. It is recorded here
  and not acted on, since the list does not name it.

## Not done here

- The earlier release specs (10.1.5, 11.0.1, 11.0.2, 11.1.0) were not run again. The source change
  is the Sheet's reduced-motion opacity, which none of them reads, and critique 8 found no title
  that fails on the tip and passes on v11.1.0.
- The disclosure guard was not run again either: no disclosure code changed.
- Critique 8's open gaps A to E stand as it wrote them.
- Snapshot trees changed: `.cache/fix7-tip/tree` now holds d0f85bd29's `src` with the branch's
  specs, and `.cache/red-v11.1.0/tree` holds the branch's specs.

Nothing of this seat is left running.
