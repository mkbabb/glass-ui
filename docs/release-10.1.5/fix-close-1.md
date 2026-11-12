# 10.1.5 fix-close-1: the O-101 reversal family cured at the root, D-1 trued

Seat: fix, round 1 after the close, claude-opus-5-5, 2026-11-11, branch `release/10.1.5`, base
`1ae63cde5`. Every browser, build and test run went through `guarded` (WebKit 2287 under
`--exclusive webkit`). **None was refused.** No tag, push or publish.

| commit | what |
|---|---|
| `314ce60fc` | **the cure**, `src/components/dock/composables/dockMorphMeasure.ts` only (cherry-pick this one for 11.0.1) |
| `0867632a7` | D-1 witness trued as ruled, `tests-visual/release-10-1-2.spec.ts` only |
| `5f9ef035c` | `.bundle-ratchet` 2955434 → 2955467 (+33 B), because `verify:package` asked |

## (1) The O-101 reversal family

### What the trace shows

`fix-close-1/trace.spec.ts` drives the same sequence as the failing cells (expand, collapse, a
viewport change 60 ms in, expand) and logs every frame, along with every write to the root's
`data-run-fits` and `data-morphing` (`trace-ch.log.gz`, Chromium, on `1ae63cde5`).
Rows from `stale-endpoint` 1440->390, which settles at 160:

```
f0 iw=1440 m=0 fits=1 full=1 reserved=592px size=592   (rest expanded)
f1 iw=1440 m=1 fits=1 full=0 reserved=599px size=599   (the collapse arms: 7 over the rest it just left)
f9 iw=390  m=1 fits=1 full=0 reserved=167px size=167   (the pane and host change, still collapsing: the failing frame)
f10 iw=390 m=1 fits=1 full=1 reserved=160px size=160   (the expand arms: right from here on)
```

`overflow` 390->1440 shows the same thing: 983 on the one collapsing frame after the change, then 976.

**The lead does not hold.** In `stale-endpoint` the flag is set at both widths and never changes,
and the frame is still 7 px over. In `overflow` the flag does flip on the frame after the stale one,
but only because the expand arms there. The 7 px is present on every frame while the dock
collapses, including the first collapse frame at a static host (599 for 592). Every expanded
endpoint that is read while the DOM is in the collapsed posture comes out 7 px over.

### The root

`restSize` corrects a reading taken from the other posture by the CHROME, the root less the pane's
border box. That model assumes the pane's border box is the slot it fills. In 10.1.5 a horizontal
run breaks that assumption:

- the run is `content-box` with inline padding equal to the reserve (7 px) and negative margins
  equal to the reserve, and its trailing padding is replaced by the `::after` reserve box in its
  content;
- **expanded**, `.glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100% }` sizes
  the run's content box to the layers' width. Border box: layers 568, run 575 (probe, 1440);
- **collapsed posture** (the full pane laid in flow by `restSize`), that rule does not match, so the
  run's content box is its max-content. Border box: run 582 in a slot of the same width.

So `root - pane` is 7 px smaller in the collapsed-posture reading than the chrome latched at rest
expanded, and `restSize` adds the difference to the root: 599 for 592. v10.1.4 had no inline
reserve on a horizontal run, so its border box was its slot in both postures, which is why it
passes.

### The cure (`314ce60fc`)

The chrome is read against the layers box (`contentEl`), which is the slot in either posture: the
latched chrome is `root - layers`, and `restSize` corrects by `chrome - (size - layers)`. That is
a different reading, not new state: `capture` and `publishYield` gain no variable.

The same number also feeds the rest port that a host-moved endpoint derives (`expandedPx - chrome -
runEdge`). With only the chrome changed, that port came out 14 px short on a vertical run (whose
block padding is the reserve on both ends). The vertical reversal cells then went red, 12 of 12 in
every project, settling at 138 for 152 with a ResizeObserver loop (`rev-green-*`, the rejected first
form). So `runEdge` is now read as the layers box less the port, which leaves the derived port the
run's own client box, as it was before. With both readings changed: the reversal cells pass,
there is no ResizeObserver loop (0 lines against 510), and the vertical cells settle where they
did before.

Side effect, in the right direction: a collapse at a static host now reserves the rest it leaves
(592) from its first frame, where before it reserved 599.

### Witness: `release-10-1-2` `--grep reversal` (6 titles), 6 repeats each

| project | `1ae63cde5` (RED arm) | fix `0867632a7` (GREEN arm) |
|---|---|---|
| chromium-headless-new | 11 failed, 25 passed | **36/36 passed** |
| coarse-touch | 11 failed, 25 passed | **36/36 passed** |
| webkit (2287) | 18 failed, 18 passed | **36/36 passed** |

RED failures: Chromium 7 horizontal O-101 reversal and 4 O-101a reversal; coarse 8 and 3; WebKit
12 and 6. The vertical reversal titles pass on both trees. Logs: `fix-close-1/rev-red-*`,
`rev6-*`.

## (2) D-1 on coarse-touch (`0867632a7`)

As ruled: the cell reads `matchMedia("(hover: hover)")`. Where the pointer can hover, the enabled
trigger must take its hover fill, as before. Where it cannot, the cell asserts that the enabled
trigger takes no hover fill. The cell is not skipped in either case, and it still reads every
disabled arm (opacity, token, cursor, hover fill, press fill and scale). D-1 runs 8/8 in
coarse-touch and 8/8 in Chromium (`d1-*`). The paint is unchanged.

## Wider runs on the fix

| run | result |
|---|---|
| `release-10-1-2`, `-3`, `-4`, `-5` specs, Chromium | 242 passed |
| the same four, WebKit 2287 | 231 passed, 10 skipped (the specs' own), 1 failed: `release-10-1-5` "fix 13, coarse phone · u1 …" with `page.evaluate: Execution context was destroyed … navigation` in its `settle` helper. That is a page navigation, not an assertion. Re-run alone 6 times: **6/6 passed** (`u1-wk`) |
| `release-10-1-2` whole, coarse-touch | 52 passed |
| vitest `--maxWorkers=2` | 247 files, 2397 passed, 10 expected fail, 1 skipped |
| typecheck, build, demo:dist:build | exit 0 |
| verify:package | asked for a rebind (2955467 > 2955434, +33 B); after the rebind it reports CLEAN, ratchet PRESENT, equal |

Two notes on vitest:

- The first full run failed `boot-graph`'s stale `dist-demo` check, because the build was older than
  the cure. It passed after `demo:dist:build`.
- `dockMorphMeasure.test.ts` "a capture keeps the run's scroll position" failed once in that run.
  As an A/B over 8 runs of the file each (`unit-ab.txt`), the file failed in 2 of 8 runs on
  `1ae63cde5`'s measure and in 0 of 8 on the fix. That is the pre-existing happy-dom delivery
  timing the test's own comment names. It is not something the cure introduced.

## Records

- g6 now lists `release-10-1-2` beside `release-10-1-3` and `release-10-1-4`
  (`orchestrator-note-fable-review.md`, item 2, point 10).
- Comment census: `git diff -U0 v10.1.4 -- src` adds 0 lines carrying a row id. The cure keeps the
  existing "(O-101, O-101a)" line byte-identical.

## For 11.0.1

`release/11.0.1` has since reworked `capture` (`rootNow`, the at-rest shortcut), so
`git cherry-pick 314ce60fc` conflicts in three hunks (checked with `git merge-tree`; nothing in
that worktree was touched). The resolution is mechanical:

- on 11.0.1, read `chrome = rootNow - getSize(layers, a)`;
- pass `layers` as `restSize`'s second argument at both call sites;
- take the `restSize` body and the `runEdge` line from `314ce60fc` as they stand.

## How it ran

- Scripts: `scripts/fix-close-1-cell.sh` (one cell set on its own demo server, 5321 Chromium and
  5323 WebKit) and `scripts/fix-close-1-queue.sh`. Every run is in `fix-close-1/runs.txt`; reports
  and logs are gzipped beside it.
- `trace.spec.ts` and `probe-vertical.spec.ts` were copied into `tests-visual/` for their runs and
  removed after. The trace of the fixed tree is not banked: its log was deleted while compressing.
  The witness arms above stand for it.
- Not measured: real Safari.
