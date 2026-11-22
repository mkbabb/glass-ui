# 11.1.1 fix seat 11 (before critic 11)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`aed2570f8` (critique 10). Every orchestrator note in this directory was read (fourteen), with
`critique-10.md` and `fix-10.md`. The list is one item: critique 10's defect 1. Every run went
through `guarded`, WebKit under `--exclusive webkit`, on ports 5351 to 5355. The guard refused
nothing. The WebKit probe waited about eight minutes for the lock other sessions held. No tag, no
push, no publish.

## Commit

| item | commit | what |
|---|---|---|
| 1 (row A's tap rule) | 72e14afe8 | the tap cell keeps a press's distance from the close button unrounded and counts a missed press as late when that distance is above 0; the record still prints it rounded to the pixel (spec only) |

No source file moved, so no bundle byte moved and the ratchet stands.

## 1. Row A's tap cell rounded a press's distance before it tested it

**Cause** (critique 10, defect 1; fix 10's open gap B). In
`sheet · a detented Sheet rises into place at its rung's size` the press listener stored
`off: Math.round(off)` and the rule read `down.off === 0`. A press whose point landed outside the
button's box by less than half a pixel read 0 px, counted as aimed, and, its target not being the
button, as a miss.

**Cure** (`72e14afe8`, `tests-visual/release-11-1-1.spec.ts`), as the list writes it:
- the listener stores the distance as measured (`off`);
- the rule is `hit || !down || !(down.off > 0)`: a missed press is late when its point lands
  outside the box by any distance;
- the record line prints `Math.round(e.off)`, so the attached record reads as before.

No bound moves and no source changes. A press aimed on time at the drawn centre lands inside the
box, at a distance of exactly 0, so the rule loses nothing.

### Witness 1: the rule at the boundary, placed by hand

A late press lands at the half-pixel boundary only by chance: 2 of the 2,357 taps critique 10
scanned. So the bite is read where it can be set up on purpose.
- `fix-11/probe/boundary.probe.ts`, run by `fix-11/probe/run.sh` on port 5354.
- The sheet harness opens its detented Sheet to the 0.9 rung by touch and lets it rest.
- Taps land at the close button's centre, then 0.1, 0.2, 0.3, 0.4, 0.45, 0.7, 1 and 3 px
  outside its box, below and to the right.
- Each press is recorded as the cell records it and judged by both forms of the rule. A press
  the rule calls on time that misses fails the cell's clause "the tap hits the button, twenty in
  twenty".
- Logs: `fix-11/logs/boundary-{cp,wp}.{json,log}`.

| project | rule | result |
|---|---|---|
| Chromium 390 | before (`Math.round(off) === 0`) | **RED.** The presses 0.1 and 0.2 px below the button land on the head: `pointerdown:00:0px click:00:0px`, the sheet left open. Measured 0.1 and 0.2 px out, they round to 0, count as on time, and fail the clause. This is the shape of critique 10's failing tap (`pointerdown:00:f1:0px click:00:f1:0px`). |
| Chromium 390 | branch (`!(off > 0)`) | **GREEN.** The same two presses count as late and would be taken again. The centre press hits and closes. Every other press, from 0.3 px out, has the button as its target by Chromium's touch adjustment, so it hits under both rules. |
| WebKit 390 | both | The precondition fails under both rules: no press lands a fraction of a pixel outside the box. WebKit floors a touch point to a whole CSS pixel. At rest the button's bottom edge sits 0.203 px past a whole pixel, so presses meant 0.1 to 0.7 px below it land inside and hit. The press meant 1 px below lands 0.797 px out and is late under both rules. To the right, where the edge is on a whole pixel, presses meant 0.1 to 0.7 px out land on the edge itself. There the distance is 0, but hit testing puts the point outside (open gap A). |

The rounding fault can reach WebKit only through a press that is late. On the tip, WebKit's
presses are not late (witness 2).

### Witness 2: the cell on the tip and on v11.1.0

Run with `fix-11/part.sh` (tip on port 5351; v11.1.0 on 5352) and read with
`fix-11/tools_rowa.py`. Logs: `fix-11/logs/rowa-{tip,red}-{cp,wp}.{json,log}`, run lines in
`fix-11/logs/runs.out`. The runs went from 02:36 to 02:57 at a 1-minute load of 6 to 9.

- **The v11.1.0 tree** is `.cache/fix11-v11.1.0/tree`, built by `fix-11/trees.sh` before any
  server of this seat ran:
  - a `git archive v11.1.0`;
  - with HEAD's 11.1.1 specs, config and harnesses copied in, their hashes equal to HEAD's
    (`logs/redspecs-{red,head}.sha`);
  - its `src` and `demo` equal to v11.1.0's, blob for blob (`logs/red-src-demo.*.blobs`).

| tree | project | runs | result |
|---|---|---|---|
| tip `72e14afe8` | Chromium 390 | 5 (`--repeat-each=5`) | **5 passed.** 433 taps, 33 late, 0 aimed misses. 20 of 20 hit and closed at each of 120, 190, 250 and 400 ms. Every late tap was at 120 ms, its press 9 to 22 px out. Height spread 0; share 0.129 to 0.149. |
| tip | WebKit 390 | 3 (`--repeat-each=3`) | **3 passed.** 240 taps, none late, 0 aimed misses, 20 of 20 at each delay. 239 presses landed in the frame they were aimed at, and all 240 had the button as target and at their point. Height spread 0; share 0.108 to 0.116. |
| v11.1.0 | Chromium 390 | 1 | **RED on its claim:** "its block size reads one value on every frame of the rise", spread 669.06 px (the sheet grows from 171 px). Its taps would fail the tap clause too, at 120 ms with 19 of 20 aimed taps hitting. The one aimed miss is a press at 132 ms that reads `pointerdown:00:f1:0px click:00:f1:0px` at a measured distance of exactly 0. That is v11.1.0's own fault: the press lands inside the button's box while the box grows, and misses. The new rule still counts that miss. |
| v11.1.0 | WebKit 390 | 1 | **RED on its claim:** spread 669.06 px. |

In these runs no press met the half-pixel boundary. The five Chromium runs are the cell's own
GREEN; the probe above is its bite.

## The gates on the committed tree

`fix-11/gates.sh` ran on `72e14afe8` with no tracked file dirty, one guarded run each, from 02:56
to 02:59 at a 1-minute load of 7 to 12 (`fix-11/logs/gates.out`). All five exited 0:
- typecheck;
- build;
- `verify:package`, terminal `CLEAN`, 197 claims;
- `demo:dist:build`;
- vitest `--maxWorkers=2`: 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

Only a spec moved, so no bundle byte moved and the ratchet stands.

## The exits gate whole

The gate ran once, as `scripts/release.sh` runs it: `npm -w tests-visual run gate:exits`, with
`GLASS_UI_DEMO_PORT=5355`, on `72e14afe8` (`fix-11/chain.sh`, log `fix-11/logs/gate.log`). It ran
from 02:59:03 to 03:35:36 at a 1-minute load of 8 to 15 and **exited 0, all sixteen parts
green**:

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 32 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 32 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

- Every count equals critique 10's table and fix 10's second run.
- Row A's cell passed in Chromium 390 part A, the part where fix 10's first run stopped.
- WebKit 1440's standing part logged the three "ResizeObserver loop completed with undelivered
  notifications" errors that critiques 9 and 10 recorded on both trees (critique 10's open gap
  B), with every cell passing.
- The guard printed its zone warning (armed, a warning only) and refused nothing.

Nothing of this seat is left running. Ports 5351 to 5356 are free, and the probe's copy under
`tests-visual/fix11-probe/` is removed.

## Open gaps

A. **A press exactly on the button's right or bottom edge** reads distance 0 under both rules,
   while hit testing puts it outside the button (witness 1, WebKit, the right edge).
   - The cell measures distance to the closed box, and hit testing treats the box as half open.
   - **In WebKit** touch points are floored to whole CSS pixels, so a press meant just past an
     edge that sits on a whole pixel lands on that edge.
     - In the cell a press aims at the button's centre, so it never meets a side edge.
     - It meets the bottom edge only when it is late and the rising button's bottom sits on the
       press's pixel row in that frame.
     - In this seat's 240 WebKit taps no press was late: 239 landed in the frame they were aimed
       at.
   - **In Chromium** a press's point is fractional (the probe's presses read 0.1 to 0.45 px out
     as placed), so an exact edge in motion is not met. The two recorded aimed misses on tip
     trees, fix 10's and critique 10's, are Chromium presses. Their records keep only the
     rounded distance, and both fit the half-pixel case this commit cures.
   - Not cured: the list names `off > 0` and nothing more. If it is ever met, the cure is to
     judge the box half open, as hit testing does, or to judge a late press by the `point` the
     cell already records.
B. **Critique 10's open gaps A to H** stand as it wrote them.
