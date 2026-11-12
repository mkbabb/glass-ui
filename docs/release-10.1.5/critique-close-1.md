# 10.1.5 critique after the close, round 1: one prose defect, the cure holds

Seat: fresh critic, claude-fable-5-2, 2026-11-12, branch `release/10.1.5`, tip `716564210`
(commits since the close at `1ae63cde5`: `314ce60fc` the cure, `0867632a7` the D-1 witness,
`5f9ef035c` the ratchet rebind, `716564210` records). Every browser and test run went through
`guarded`, one at a time, WebKit 2287 under `--exclusive webkit`. **None was refused.** The WebKit
lock was shared with the 11.0.1 close all night; the waits were 17, 15 and 4 minutes. No tag, push
or publish. Not measured: real Safari.

## Verdict

Gates (a), (b), (c) and (d) hold on the tip. Gate (e) has one finding, **E1**: the CHANGELOG says
`data-run-fits` is "on the run", and it is on the dock's root. That sentence is prose, it predates
the cure, and curing it is one word. Nothing else is broken.

| gate | reading |
|---|---|
| (a) reversal titles GREEN on the tip, RED on `1ae63cde5`, 6 repeats | holds, all three projects |
| (b) `release-10-1-2` has no title failing on the tip and passing on v10.1.4 | holds: 52/52 on both trees in all three projects |
| (c) `release-10-1-5` 107/107 in both engines; `release-10-1-3`, `-4` GREEN | holds; WebKit 107 titles as two processes (106 + q2 alone) |
| (d) no new published property, attribute or export; invariants hold where the cure touched | holds |
| (e) the CHANGELOG is still true | **E1** |

## (a) The O-101 reversal family

`release-10-1-2.spec.ts --grep reversal` (6 titles), `--repeat-each=6`, 36 runs an arm.

| project | `1ae63cde5` | tip `716564210` |
|---|---|---|
| chromium-headless-new | 10 failed, 26 passed | **36/36** |
| coarse-touch | 8 failed, 28 passed | **36/36** |
| webkit (2287) | 16 failed, 20 passed | **36/36** |

The RED arm is a `git archive 1ae63cde5` tree on its own server. Every RED failure is one of three
titles and carries the close's numbers:

| title | Chromium | coarse | WebKit |
|---|---|---|---|
| O-101 horizontal reversal (1440->390) | 4/6, 167 for 160 | 4/6, 179 for 172 | 6/6, 167 for 160 |
| O-101 horizontal reversal (390->1440) | 4/6, 599 for 592 | 2/6, 647 for 640 | 4/6, 599 for 592 |
| O-101a reversal (390->1440) | 2/6, 983 for 976 | 2/6, 1063 for 1056 | 6/6, 983 for 976 |

The other three reversal titles (vertical both ways, O-101a 1440->390) pass on both trees. The RED
rate is under 6 of 6 because the cell fails only when a sampled frame lands between the viewport
change and the re-armed expand.

Second reading, against a frame trace. I ran the fix seat's `fix-close-1/trace.spec.ts` on the tip
in Chromium (`critic-close-1/trace-tip-ch.log.gz`; the fix seat's own trace of the fixed tree was
lost). Beside the banked RED trace (`fix-close-1/trace-ch.log.gz`):

| cell | frame | `1ae63cde5` reserved | tip reserved | settles at |
|---|---|---|---|---|
| stale-endpoint 1440->390 | collapsing at 1440 | 599 | 592 | |
| | collapsing, after the change | 167 | 160 | 160 |
| stale-endpoint 390->1440 | collapsing at 390 | 167 | 160 | |
| | collapsing, after the change | (599) | 592 | 592 |
| overflow 390->1440 | collapsing, after the change | 983 | 976 | 976 |
| overflow 1440->390 | collapsing at 1440 | 983 | 976 | |

So the fix record's reading is right and the close's lead was not: on `1ae63cde5` every expanded
endpoint read while the dock collapses is 7 px over, at a static host too, whatever `data-run-fits`
says. On the tip the collapsing frames reserve the rest they left, and the flag still flips only
where the expand re-arms.

## (b) The whole of `release-10-1-2.spec.ts`

| project | tip | v10.1.4 (`git archive v10.1.4`, its own spec) |
|---|---|---|
| chromium-headless-new | 52 passed | 52 passed |
| coarse-touch | 52 passed | 52 passed |
| webkit (2287) | 52 passed | 52 passed |

No title fails anywhere, so none fails on the tip alone. D-1 reads as ruled: its four cells ran and
passed in coarse-touch (none skipped), and in Chromium and WebKit, where the pointer hovers, they
still demand the hover fill. The witness change (`0867632a7`) branches on
`matchMedia("(hover: hover)")`; where it does not match it asserts the enabled trigger's background
equals its rest, and the loop over the three disabled arms is untouched. The 1-minute load was 15 to
17 for these arms, over the note's bound of 10 for D-1; with 12 of 12 passing on the tip and
12 of 12 on v10.1.4 there is no difference for load to explain.

## (c) The release specs

| run | result |
|---|---|
| `release-10-1-5`, Chromium | **107 passed** (13.0 min) |
| `release-10-1-5`, WebKit 2287 | 106 passed, 1 timed out: "q2 O-187 at 1440", `page.goto` 60 s |
| "q2 O-187" alone, WebKit, 4 repeats of both widths | **8/8 passed** |
| `release-10-1-3` + `release-10-1-4`, Chromium | 83 passed |
| `release-10-1-3` + `release-10-1-4`, WebKit 2287 | 73 passed, 10 skipped (the specs' own: two touch cells and eight `page.pdf` cells) |

The q2 failure is a navigation that never committed, at `open()`'s `page.goto`, before any dock
exists. Critiques 13 and 14 recorded the same hang on earlier tips in a single-process WebKit run,
and the cell passes alone, as it did then. I read it as that load hang, not as the cure. So in
WebKit the 107 titles pass as two processes, the form critique 16 accepted.

## (d) Surface and invariants

**Surface.** The cure is 28 lines in `dockMorphMeasure.ts`. It adds no `setProperty`,
`toggleAttribute`, `setAttribute` or `export`: `restSize` (module-private) gains a `layers`
parameter, and `capture` and `publishYield` read `contentEl`, which they already had. No state
variable is added, which the note's item 3 forbade. The five comment lines it adds or edits carry no
row, round or seat id; "(O-101, O-101a)" is byte-identical to v10.1.4's line.

**The derived port cannot move.** The cure changes two rest readings: chrome, from root less pane
to root less layers (larger by pane less layers), and `runEdge`, from pane less port to layers less
port (smaller by the same pane less layers). The host-moved rest port is `expandedPx - chrome -
runEdge`, so the two changes cancel exactly whenever both are read at the same rest, which they
are (both only with no `[data-morphing]`, expanded). The fix record's rejected first form changed
only the chrome and broke the vertical cells by 14 px, which is that sum not cancelling.

**Nothing posture-gated sits inside the layers box.** The new chrome would miss a `.collapsed` or
`.expanded` rule that sized something between the layers box and its pane. The rules gated on the
posture are the layers' own margins (`run.css:185-225`, outside the box, so still in the chrome)
and the pane's `width: 100%` (`layers.css:369`), which is the defect the cure removes.

**Invariants the cure's code feeds**, by their named witnesses, all in the runs above:

| invariant | witness | Chromium | WebKit |
|---|---|---|---|
| 2 collapsed | g2, m1, s1 | pass | pass |
| 3 true overflow | g1, h1, k2 | pass | pass |
| 4 ring | c4, e2, e3, k1, s2 | pass | pass |
| 5 morph edges, static host | n1 (and u1) | pass | pass |
| 6 morph, host resize | p1, p2, s4 | pass | pass |
| 10 regression gates | `release-10-1-2`, `-3`, `-4` | pass | pass |
| 11 source and records | comment and export read above | holds | |

Invariants 1, 7, 8 and 9 read code the cure did not touch; their witnesses are in the same 107 and
pass. `tests/components/custom/dock/dockMorphMeasure.test.ts` is 18 of 18.

## (e) The CHANGELOG

The cure restores a 10.1.2 contract that v10.1.4 kept, so against 10.1.4 it changes nothing a
consumer sees, and no entry is owed. No token value, property or attribute moved since the close.

**E1 (prose, one word).** The 10.1.5 header ends: "The dock publishes four new measured properties
on its root, ... and a `data-run-fits` attribute on the run." The attribute is on the root:
`root.toggleAttribute("data-run-fits", fits)` (`dockMorphMeasure.ts:345`), every selector reads
`.glass-dock[data-run-fits]` (`run.css:414, 429, 828`), and the spec reads
`dock.hasAttribute("data-run-fits")`. The run element never carries it. A consumer who styles
`.dock-run[data-run-fits]` from this sentence matches nothing. The sentence came in with
`ada7d8a8b`, after critique 16 and before the close, so no critic had read it; the cure did not make
it false. The four properties are on the root, as the sentence says. Cure: "on its root" for both.

## Outside the list (for the orchestrator, not counted)

- **Port overlap with the 11.0.1 close.** Its drivers use 5331 and 5333, as mine did (5331 to
  5336), and the Playwright config reuses a server already listening. By the guard log no two runs
  shared a port at the same time (mine on 5331 ended 00:48:41 and ran again 01:23:03 to 01:23:18;
  theirs held it 01:03:51 to 01:12:03 and from 01:23:34; mine on 5333 ended 00:29:02, theirs began
  00:42:49), and the RED arms being RED shows each arm served its own tree. Two seats on one port
  would silently test the other's source. Later seats should take ports the other release does not.
- **Not re-run by this seat:** `verify:package` against the rebound ratchet, typecheck, build,
  the whole vitest, the pixel floors, and the rest of the visual suite. The fix record ran the first
  four; none is on this gate list.
- `GlassDock.vue:39` keeps a dated row stamp on a comment line the patch edited (the stamp is
  v10.1.4's, the tail is new). Not in the cure.

## How it ran

- Drivers: `scripts/critic-close-1-queue.sh` over `critic-close-1-cell.sh`; title counts with
  `critic-close-1-summary.py`. Every run is in `critic-close-1/runs.txt`; reports and logs are
  gzipped beside it.
- Trees: the worktree (tip), and `git archive 1ae63cde5` and `git archive v10.1.4` under
  `.cache/crit-close-1/` with the install symlinked, each on its own demo server. Both archive
  trees are deleted.
- The trace spec was copied into `tests-visual/` for its run and removed. The tree is clean but for
  these records.
