# 10.1.5 critique after the close, round 2: clean, no finding

Seat: fresh critic, claude-fable-5-2, 2026-11-12, branch `release/10.1.5`, tip `75c694414`.
Commits since the close at `1ae63cde5`: `314ce60fc` the cure, `0867632a7` the D-1 witness,
`5f9ef035c` the ratchet rebind, `e376a9035` the CHANGELOG sentence, and four record commits.
`src` and `tests-visual` on the tip are byte-identical to round 1's tip (`716564210`); every
number below is still a fresh run on `75c694414`. Every browser and test run went through
`guarded`, one at a time, WebKit 2287 under `--exclusive webkit`. **None was refused.** The WebKit
lock was waited for three times, each under a minute. No tag, push or publish. Not measured: real
Safari.

## Verdict

All five gates hold on the tip. Round 1's one finding (E1) is cured. No defect.

| gate | reading |
|---|---|
| (a) reversal titles GREEN on the tip, RED on `1ae63cde5`, 6 repeats | holds, all three projects |
| (b) `release-10-1-2` has no title failing on the tip and passing on v10.1.4 | holds: 52/52 on both trees in all three projects |
| (c) `release-10-1-5` 107/107 in both engines; `release-10-1-3`, `-4` GREEN | holds; WebKit's 107 titles pass as two processes (106 + q2 alone) |
| (d) no new published property, attribute or export; invariants hold where the cure touched | holds |
| (e) the CHANGELOG is still true | holds |

## (a) The O-101 reversal family

`release-10-1-2.spec.ts --grep reversal` (6 titles), `--repeat-each=6`, 36 runs an arm. The RED arm
is a `git archive 1ae63cde5` tree on its own server.

| project | `1ae63cde5` | tip `75c694414` |
|---|---|---|
| chromium-headless-new | 11 failed, 25 passed | **36/36** |
| coarse-touch | 12 failed, 24 passed | **36/36** |
| webkit (2287) | 17 failed, 19 passed | **36/36** |

Every RED failure but one is one of the close's three titles with the close's numbers:

| title | Chromium | coarse | WebKit |
|---|---|---|---|
| O-101 horizontal reversal (1440->390) | 5/6, 167 for 160 | 6/6, 179 for 172 | 5/6, 167 for 160 (+1, below) |
| O-101 horizontal reversal (390->1440) | 4/6, 599 for 592 | 4/6, 647 for 640 | 5/6, 599 for 592 |
| O-101a reversal (390->1440) | 2/6, 983 for 976 | 2/6, 1063 for 1056 | 6/6, 983 for 976 |

The seventeenth WebKit RED failure is "Execution context was destroyed" in a `page.evaluate` of
the 1440->390 title, an infrastructure error on the RED tree, not a reading. Without it the RED
arm is 16 of 36, which is round 1's count.

Second reading, against a frame trace. The fix seat's `fix-close-1/trace.spec.ts` ran in Chromium
on the tip and on the `1ae63cde5` tree, both this round (`critic-close-2/trace-tip-ch.log.gz`,
`trace-red-ch.log.gz`). The first collapsing frame after the viewport change, and the collapsing
frames before it:

| cell | frame | `1ae63cde5` reserved | tip reserved | settles at |
|---|---|---|---|---|
| overflow 390->1440 | collapsing, after the change | 983 | 976 | 976 |
| overflow 1440->390 | collapsing at 1440 | 983 | 976 | |
| stale-endpoint 1440->390 | collapsing at 1440 | 599 | 592 | |
| | collapsing, after the change | 167 | 160 | 160 |
| stale-endpoint 390->1440 | collapsing at 390 | 167 | 160 | |
| | collapsing, after the change | not sampled | 592 | 592 |

The trace agrees with the spec numbers and with round 1. On `1ae63cde5` the expanded endpoint read
while the dock collapses is 7 px over at a static host as well (983 at 1440 before any change), so
the defect was not the flag re-reading late. On the tip every collapsing frame reserves the
endpoint the expand then settles at. In the overflow 390->1440 cell the tip has one collapsing
frame at 1440 with `data-run-fits` still absent; the flag is set on the next frame, when the
expand re-arms. That is the documented hold (the flag is the expanded run's reading and is not
re-read while the full pane is out of flow), and the reserved size on that frame is already 976.

## (b) The whole of `release-10-1-2.spec.ts`

| project | tip | v10.1.4 (`git archive v10.1.4`, its own spec) |
|---|---|---|
| chromium-headless-new | 52 passed | 52 passed |
| coarse-touch | 52 passed | 52 passed |
| webkit (2287) | 52 passed | 52 passed |

The title sets are equal (37 titles a project on each tree), and no title fails anywhere. D-1 reads
as ruled: its four cells ran and passed in coarse-touch, none skipped. The witness reads
`matchMedia("(hover: hover)")`; where it does not match it asserts the enabled trigger's
background equals its rest, and the loop over the three disabled arms is unchanged from v10.1.4.
The 1-minute load was 13 to 15 for these arms, over the note's bound of 10 for D-1. With 12 of 12
on each tree there is no difference for load to explain.

## (c) The release specs

| run | result |
|---|---|
| `release-10-1-5`, Chromium | **107 passed** (13.0 min) |
| `release-10-1-5`, WebKit 2287, one process | 106 passed, 1 timed out: "q2 O-187 at 1440", `page.goto` 60 s |
| "q2 O-187" alone, WebKit, 4 repeats of both widths | **8/8 passed** |
| `release-10-1-3` + `release-10-1-4`, Chromium | 83 passed |
| `release-10-1-3` + `release-10-1-4`, WebKit 2287 | 73 passed, 10 skipped (the specs' own skips) |

The q2 timeout is a navigation that never commits, at `open()`'s `page.goto`, before a dock exists.
It is the 90th test of the one-process WebKit pass, the position critique 14 recorded for it on
every whole WebKit pass since fix 11, so it predates the cure and is not a reading of it. Round 1
called it a load hang; the load here was 13, and the position is the better description. Alone it
is 8 of 8. So WebKit's 107 titles pass as two processes, the form critiques 14 and 16 accepted.

## (d) Surface and invariants

**Surface.** `git diff 1ae63cde5..75c694414` outside `docs/` touches four files: `.bundle-ratchet`,
`CHANGELOG.md`, `dockMorphMeasure.ts` and `release-10-1-2.spec.ts`. The `src` diff adds or removes
no `setProperty`, `toggleAttribute`, `setAttribute` or `export` line. `restSize` is module-private
and gains a `layers` parameter; `capture` and `publishYield` read `contentEl`, an option they
already had. No state variable is added (the note's item 3). The comment lines the diff adds carry
no row, round, seat or date stamp.

**The reading, twice.** The cure moves two rest readings to the layers box: the chrome (root less
layers, was root less pane) and `runEdge` (layers less port, was pane less port). The host-moved
rest port is `expandedPx - expandedChrome - runEdge`; the two moves differ by the same pane less
layers and cancel, and both are read only at rest (`!morphing`). I then read it against the trace:
on the tip the expand's settled run and the flag are the same as on `1ae63cde5` (run 964 at 976,
148 at 160, 580 at 592; `fits` flips on the same frame), and only the collapsing frames' reserved
size moved, by the 7 px. That is the cancellation in paint.

**Invariants by their named witnesses**, in the runs of (c):

| invariant | witness | Chromium | WebKit |
|---|---|---|---|
| 2 collapsed | g2, m1, s1 | pass | pass |
| 3 true overflow | g1, h1, k2 | pass | pass |
| 4 ring | c4, e2, e3, k1, s2 | pass | pass |
| 5 morph edges, static host | n1 (and u1) | pass | pass |
| 6 morph, host resize | p1, p2, s4 | pass | pass |
| 10 regression gates | `release-10-1-2`, `-3`, `-4` | pass | pass |
| 11 source and records | the comment and export read above | holds | |

Invariants 1, 7, 8 and 9 read code the cure did not touch. Their witnesses (g1, e1, e4, k3, l1,
q1, m4; q1 to q3, r1; g3, c1, c3, m3, g4, c2, g5; f1, f2, m5, s3) are in the same 107 and pass in
both engines, q2 at 1440 in WebKit in its own process.
`tests/components/custom/dock/dockMorphMeasure.test.ts` is 18 of 18.

## (e) The CHANGELOG

The header now reads: "The dock publishes on its root four new measured properties,
`--dock-plate-cross-px`, `--dock-seat-max-inline-px`, `--dock-seat-max-block-px` and
`--dock-run-room-block`, and a `data-run-fits` attribute (`.glass-dock[data-run-fits]`)." Against
the source: all four properties are written with `root.style.setProperty`
(`dockMorphMeasure.ts:343, 380, 425, 426`), the attribute with `root.toggleAttribute` (`:345`), and
every selector is `.glass-dock[data-run-fits]` (`run.css:414, 429, 828, 829`). E1 is cured, and
`e376a9035` changed nothing else in the file.

The cure restores a 10.1.2 contract that v10.1.4 kept, so against 10.1.4 it changes nothing a
consumer sees and owes no entry. No token value, property or attribute moved since the close. The
10.1.5 section does not describe the morph's chrome or the pane's border box, so no sentence was
left describing the old reading.

## Outside the list (for the orchestrator, not counted)

- **The cut date.** The section header says 2026-11-11. A tag on a later day wants the date moved.
- **Not re-run by this seat:** typecheck, build, `verify:package` against the ratchet datum
  2955467, the whole vitest, the pixel floors, g7, and the rest of the visual suite. Fix-close-2
  ran build and `verify:package` on `e376a9035` (equal, no rebind). None is on this gate list.
- **q2 at 1440 as the 90th WebKit test** hangs in `page.goto` in every one-process pass. It is a
  harness or engine matter, older than the cure, and wants its own row, not another "alone 8/8".
- `GlassDock.vue:39` keeps a dated row stamp on a comment line the patch edited (round 1's note).
  Not in the cure.

## How it ran

- Drivers: `scripts/critic-close-2-queue.sh` over `critic-close-2-cell.sh`; title counts with
  `critic-close-2-summary.py`. Every run is in `critic-close-2/runs.txt`; reports and logs are
  gzipped beside it.
- Ports 5361 to 5366, which the 11.0.1 close does not use (it holds 5331 and 5333).
- Trees: the worktree (tip), and `git archive 1ae63cde5` and `git archive v10.1.4` under
  `.cache/crit-close-2/` with the install symlinked, each on its own demo server. Both archive
  trees are deleted.
- The trace spec was copied into `tests-visual/` of the tip and of the RED tree for its runs and
  removed. The tree is clean but for these records.
