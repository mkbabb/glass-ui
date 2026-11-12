# 10.1.5 — critique, round 13 (adversarial, gated on the finite list)

Critic: claude-fable-5-2, fresh context. Branch `release/10.1.5` at `d060845fb` (fix round 12:
`f7b441f7e` comments, `ed5fe54a8` S1 and item 4, `d72ef01a0` witnesses and CHANGELOG, `e4ea97d1d`
the rebind, and the records). I read every commit over `v10.1.4`, `critique-12.md`, `fix-12.md`,
the inbound briefs and every orchestrator note. `orchestrator-note-fable-review.md` binds this
round: the scope is frozen at O-207, and I gate only on its item 2 list, on its matrix (390 coarse
and 1440 fine, 320 and 844 where a named witness reads them, LTR), with the named witnesses.
Anything else is in *For INBOUND* and does not count against clean.

Every browser run, build and test went through `guarded` (WebKit 2287 under `--exclusive webkit`),
one run at a time. **None was refused.** Drivers: `scripts/queue-critic-13.sh`,
`scripts/chain-critic-13.sh`, `scripts/gates-critic-13.sh`; summaries
`python3 -I scripts/critic-13-summary.py <project>` `scripts/critic-13-p4-summary.py` and `scripts/critic-13-c13b-summary.py <file>`. Rows bank
to `critic-13/` (`runs.txt` and `queue.txt` list every run with its load). I wrote no harness scene.
The one new spec, `tests-visual/release-10-1-5-critic-13.spec.ts`, holds the measurement item 3 owes
(c13a, on the release harness's `dock` scene) and the second reading of n1 (c13b, on critic 7's
harness).

## Verdict

**Not clean. Two findings.**

- **T1 (code, invariant 5, WebKit on a coarse pointer, intermittent):** n1 went RED in one of three
  whole-spec WebKit passes. A vertical run that overflows by 20 px jumps to the end of its scroll on
  the collapse's first frame, so every seat steps 20 px. A per-frame second reading reproduces it
  in 6 of 24 collapses on the tip and 3 of 8 on the fix-11 tip, and in 0 of 24 at the same cell on
  v10.1.4's `src`. It is WebKit's re-snap of the run (critique 9's P3 class), which v10.1.4 shows
  at other stages and at another moment.
- **T2 (records, invariant 11):** the CHANGELOG's O-201 entry describes a vertical run the code does
  not have.

Every other invariant on the list holds in both engines. The release spec is 106/106 in Chromium.
In WebKit 2287 it was never 106/106 in one pass: 105/106 three times (q2's navigation hang twice,
n1 once), with each of the two cells GREEN alone (q2 16/16, n1 24/24). g6 is GREEN in both
engines and g7 is GREEN. The two measurements the note owed are taken and both come back quiet:
the root-style observer adds no longer frame (it stays), and P4 does not reproduce in 320 first
expands on the tip or on v10.1.4 (it is not a blocker).

## Findings

### T1: in WebKit on a coarse pointer, an overflowing vertical run jumps to its scroll end on the collapse's first frame: every seat steps 20 px (medium-low; intermittent; invariant 5, witness n1)

- **The run.** The third whole-spec WebKit pass (`critic-13/branch-wk-pass3.log`, 1-minute load 6):
  `critique 8, coarse phone › n1` RED at `stageH=332`, "collapse start": the last rest frame has S1
  at 24 and S6 at 328, the first morph frame has them at 4 and 308. The other two passes and 24
  lone repeats of n1 (12 per pointer, 60 coarse collapse starts) were GREEN, so n1 goes RED about
  once in 15 coarse runs.
- **The second reading** (`release-10-1-5-critic-13.spec.ts` c13b: n1's own flow on critic 7's
  harness, each frame with its time, `--dock-morph-t`, the root's and the run's boxes, the run's
  scroll and the page's; `critic-13/c13b-pass1-webkit.json`, `c13b-webkit.json`,
  `c13b-fix11-webkit.json`, `c13b-chromium-headless-new.json`). A failing collapse, frame by frame:

  | t (ms) | morphing | `--dock-morph-t` | S1 top | S6 bottom | run `scrollTop` | dock box | page scroll |
  |---|---|---|---|---|---|---|---|
  | 97 | no | | 24 | 328 | 0 | 16, 300 | 0 |
  | 117 | yes | 0 | **4** | **308** | **20** | 16, 300 | 0 |
  | 130 | yes | 0.050 | 4.19 | 308.19 | 20 | 16, 300 | 0 |
  | 145 | yes | 0.134 | 3.53 | 307.53 | 21 | 16, 300 | 0 |

  The two frames are consecutive (18 to 20 ms apart), the morph scalar is still 0, the dock's and
  the run's boxes have not moved, and the page has not scrolled. The run's own `scrollTop` goes
  from 0 to 20, the whole of its range (`scrollHeight` 318, `clientHeight` 298, `data-run-fits`
  absent), and then follows the range up as the morph shrinks the port. Nothing scrolled it: no
  key, no pointer (parked at 1430, 790), no focus change.

  | WebKit 2287, coarse, collapse starts that step | 316 | 324 | 332 | 340 | 348 |
  |---|---|---|---|---|---|
  | tip `d060845fb` (range 36, 28, 20, fits, fits) | 0/8 | 0/8 | **6/24** | 0/24 | 0/8 |
  | fix-11 tip `192c549cf` (`src` swapped in and restored) | 0/8 | 0/8 | **3/8** | 0/8 | 0/8 |
  | v10.1.4 `src` (range 36, 28, 20, 12, 4) | 0/8 | 0/8 | 0/24 | 0/24 | 0/8 |
  | Chromium, tip and v10.1.4 | 0/8 | 0/8 | 0/8 | 0/8 | 0/8 |

- **What it is.** WebKit re-snapping a `scroll-snap-type: y mandatory` run when the collapse arms,
  critique 9's P3 class ("WebKit re-scrolls a run whose port shrinks", recorded as v10.1.4's own).
  v10.1.4 shows the same engine behaviour in these rows at other stages and another moment: its
  run arrives at rest after the expand already at its scroll end, with no user scroll, in 2 of 8
  at 340 (`scrollTop` 12 of 12) and 3 of 8 at 348 (4 of 4). So the class is not new. The cell is:
  at n1's 332 stage v10.1.4 holds in 24 of 24 and the tip does not, and it is older than fix 12.
  p1 nets the run's scroll out of its reading for exactly this reason; n1 does not.
- **Why it is a finding and not a note.** n1 is invariant 5's named witness, it reads a 1440 wide
  coarse page, and it is RED on the tip about once in 15 WebKit runs, so the release spec cannot be
  relied on to be GREEN in WebKit as it stands. The seats visibly jump 20 px under the collapse's
  crossfade.
- **Cure, one of two, for the orchestrator to choose.** (a) In `src`: find what the collapse's arm
  changes on the leaving run that makes WebKit re-snap (the candidates are the rules keyed on the
  full pane's `.is-active` and on `.collapsed`: the run's snap type and scroll padding at
  `run.css:491-492`, the idle-run clip, the cap-off rule), and hold the leaving run's snap state
  through the morph. Witness: c13b at 332, 0 of 24 in WebKit. (b) As a ruling: this is P3, routed
  to 11.0.1 or W-0.8 with c13b as its witness, and n1 reads S1 net of the run's scroll as p1 does,
  so the spec is stable. I did not choose, since (b) restates a witness.

### T2: the CHANGELOG's O-201 entry states the vertical-spacer form that fix 12 tried and did not adopt (low; records; invariant 11)

- **What it says** (`CHANGELOG.md:43-55`, written in `d72ef01a0`): "A keyboard-focused seat keeps
  its whole ring at every width"; the reserves "now yield down to `--dock-ring-reserve`, on both
  axes"; "A vertical run's reserves are now the same two boxes as a horizontal run's (its yielded
  padding and `--dock-run-room-block` are gone)."
- **What the tip does.** The vertical run keeps its padding yield and the script-written room:
  `src/components/dock/styles/run.css:416-431` (`padding-block: min(var(--dock-run-reserve-block),
  var(--dock-run-room-block, 0px))`, and its comment ends "a focused end seat's ring is cut by up
  to the ring's reach"), `dockMorphMeasure.ts:327-334` (the `room` computation and the
  `--dock-run-room-block` write). Only the horizontal boxes take `min-inline-size:
  var(--dock-ring-reserve)` (`run.css:439-443`).
- **What the paint does.** c12a on the tip, both engines, light and dark: in the 8 px above a
  vertical run's fit edge the focused first and last seats' rings are cut by 1, 2, 3 and 4 px
  (stages 320-314 at 1440 fine, 344-338 at 390 coarse; `critic-13/probe/<project>/c12a.json`;
  paint `critic-13/probe/chromium-headless-new/c12a-1440-light-stage318-last.png`, the last seat's
  ring flat against the plate's end).
- **Why it is here.** `fix-12.md` records all of this correctly (item 5: tried once, not adopted;
  S2 a bound for the owner, which the note's item 5 allows). The CHANGELOG paragraph was written for
  the scratch arm and not restated when the scratch was dropped. It is the one record a consumer
  reads, and three of its sentences are false on the tag. By the list's letter, invariant 11 names
  comments, exports and moved tokens; I file this under its heading ("source and records") because
  it is a false statement about the source in the shipped record, and say so plainly so the
  orchestrator can rule it the other way.
- **Cure.** Prose only, no `src`, no witness, no browser re-run: the entry says the horizontal run
  yields down to the ring's reach, and the vertical run keeps its padding yield, where a focused end
  seat's ring is cut by up to 4 px in the 8 px above the fit edge (10.1.4 cut 4 px at every stage
  under that edge). The title loses "at every width".

## The invariant list, one by one (each read twice: the run, then the reading against the rows or capture)

| # | invariant | Chromium | WebKit 2287 | how read |
|---|---|---|---|---|
| 1 | rest corner | holds | holds | g1, e1, e4, k3, l1, q1, m4 GREEN; c12b LTR: every fitting cap has four equal corners at half the cross extent, at rest and with the pointer on the trailing seat, no `%` |
| 2 | collapsed | holds | holds | g2, m1, s1 GREEN |
| 3 | true overflow | holds | holds | g1 (overflow), h1, k2 GREEN; c12b LTR: every cap that does not fit cuts the trailing corner only |
| 4 | ring | holds, with the two bounds item 4 and item 5 route to the owner | same | c4, e2, e3, k1, s2, t1 GREEN; c12b LTR (item 4's and item 6's cells): end and first rings whole after Tab at every cap, fitting or not, worst 0.11 px Chromium and 0 px WebKit; c12a: the vertical band, below |
| 5 | morph edges, static host | holds | **T1** on a coarse pointer; holds on a fine one | n1: Chromium GREEN; WebKit 2 of 3 passes and 24/24 alone, RED once; c13b |
| 6 | morph, host resize | holds at the closed cells | same | p1, p2, s4 GREEN; no new door opened (item 3) |
| 7 | consumer markup | holds | holds | q1 to q3, r1 GREEN (q2 at 1440 in WebKit: see *What ran*) |
| 8 | Slider, type, menu | holds | holds | g3, c1, c3, m3 O-167; g4, c2; g5 GREEN |
| 9 | one-row cures | holds | holds | f1, f2, the m3 rows, m5, s3 GREEN |
| 10 | regression gates | GREEN | GREEN | g6 `release-10-1-4` 23/23 and 15 + 8 skips (`page.pdf`), `release-10-1-3` 60/60 and 58 + 2 skips, D-1 and F-4 passing at 1-minute loads of 7 to 14; g7 below |
| 11 | source and records | holds but T2 | — | the note's grep, widened to round letters and seat words, returns nothing over `git diff -U0 v10.1.4 -- src`; no `export` line removed or renamed; the three moved values (`--dock-cap-rest`, coarse `--control-text`/`--control-text-sm`, dark `--shadow-color`) and the two new tokens are named in the CHANGELOG |

**Fix 12's cures, re-read.**

- **S1 (reach in a layer group): holds, LTR, both engines.** c12b's Tab-focus cells on value's
  Home trigger at a face's end: at every cap from natural width to 40 px under it the run scrolls to
  the seat (`endSl` 15 to 40 px under the fit edge) and the ring is whole. Tab back to the first
  seat leaves the run at 0 with a whole ring (the glide stop). Critique 12 measured 3.6 to 37 px of
  cut on the same cells.
- **Item 4 (the flag is the span; the ring is the yield's floor): holds.** c12b LTR: fix 11's band,
  a cut cap with every seat showing, is gone at 390 coarse, 1440 fine and 390 fine in both engines.
  With `data-run-fits` set the run scrolls at most 8 px (twice the 4 px ring reserve) and the plate
  is round.
- **Item 8 (comments): holds.** See row 11.

**The two bounds, as the note routes them (not findings).**

- **Horizontal, the last 4 px above the fit edge.** With less than one ring's reach of room
  (`port - span < 4 px`) the end seat's layout box lies 1 to 4 px past the port at rest under a
  round plate (c12b LTR `hid 1` with `fits` true: caps 263-260 at 1440, 268-265 at 390 coarse,
  256-253 at 390 fine, both engines). Focus brings it whole. This is item 4's own form ("it scrolls
  at most twice the ring reserve") and `fix-12.md` records it for the owner; `fitLaw` gates it
  exactly.
- **Vertical, the 8 px above the fit edge.** The 1 to 4 px ring cut T2 cites. Item 5 allowed one
  scratch attempt and then a bound for the owner; fix 12 made the attempt and recorded why it was
  not adopted. `t1` gates the bound.

## The two measurements the note owed, taken once

### Item 3: the root-style observer's frame cost — no longer frame; the observer stays

`release-10-1-5-critic-13.spec.ts`, Chromium, CPU throttle 4x, the release harness's `dock` scene
(`collapse=closed`, six seats, 1440), one expand and one collapse per cell, 12 cells per arm, the
arms interleaved on the same served code, twice (`critic-13/obs.json`, then `obs2.json` with the
main thread's CDP task metrics added). Arms: `tip` (untouched); `noobs` (the one `observe()` call
with `attributeFilter: ["style", "class"]` skipped, counted once per page, so only `hostStyle` is
gone); `timed` (untouched, that observer's callback timed).

| per morph, medians of 12 | tip | observer removed |
|---|---|---|
| expand: frames, mean frame, p95, longest (median / worst) | 59.5, 9.59 ms, 16.9 ms, 33.4 / 40.5 ms | 62, 9.15 ms, 15.9 ms, 29.3 / 34.2 ms |
| collapse: the same | 63, 9.12 ms, 16.0 ms, 32.8 / 35.2 ms | 62, 9.36 ms, 16.7 ms, 33.1 / 35.0 ms |
| frames over 20 ms / over 34 ms, summed over 12 (expand; collapse) | 23 / 2; 12 / 1 | 24 / 1; 12 / 4 |
| main thread per expand: task, script, style, layout | 463, 30, 333, 18 ms | 444, 21, 326, 17 ms |
| main thread per collapse | 420, 24, 315, 23 ms | 428, 22, 315, 22 ms |
| style recalcs / layouts per expand | 140 / 128 | 148 / 136 |

The first pass read the other way on the longest frame (expand 34.4 / 43.2 ms against 34.8 / 41.7;
collapse 34.0 / 43.3 against 41.6 / 50.2; frames over 34 ms 15 against 16), so the two passes
bracket zero. The `timed` arm shows why the note's worry does not land: the callback runs about 180
times across the two morphs and holds the main thread about 380 to 450 ms in all at 4x, but that
time is the frame's own style recalc pulled forward by `getComputedStyle` (the style total and the
recalc count are the same with the observer removed). What the observer adds is its script, about
9 ms per expand at 4x, some 0.04 ms a frame unthrottled. **The tip shows no longer frame that the
other arm does not. The observer stays, and p2 keeps its growth cells.**

### Item 8: P4 at 320 first expands per arm — not reproduced on either arm; not a blocker

c9f (critique 9's cell: a layered dock's first expand from a closed mount, `maxw=260`), WebKit
2287, ten runs of 32 first expands per arm, the tip and v10.1.4's `src` alternating, 1-minute load
5.7 to 12.6 (`critic-13/p4/`, `runs.txt`).

| arm | first expands | rest at 260 | misses |
|---|---|---|---|
| tip (`d060845fb`) | 320 | 320 | **0** |
| v10.1.4 `src` | 320 | 320 | **0** |

With fix 10's 128 and critique 11's 32, that is 0 in 480 since fix 10 on 10.1.5 code. The three
misses on record are on the round-8 and round-9 tips. Zero in 320 puts the rate on the tip under
about 1 % at 95 %. By the note's rule the run decides it: no miss on the tip, so nothing to
attribute before the tag; no miss on v10.1.4, so no INBOUND row either. P4 is closed as not
reproduced, and is not carried as open.

## For INBOUND (outside the list or the matrix; none counts against clean)

- **RTL: a focused end seat in a layer group is not reached.** c12b's RTL rows, both engines: the
  Home trigger's ring is cut 0.6 to 8.8 px on fitting caps under a ring's room and 11.6 to 37.8 px
  under the fit edge, with the run's scroll left at 0 or 1 (`endSl`). Fix 12's reach cure lands in
  LTR only. It is no regression: the same cells cut 4.1 to 36.8 px on the fix-11 tip and 8.1 to
  43.8 px on v10.1.4 (`critic-12/probe/*/c12b.json`), so the tip is better at every cap. RTL is
  outside the matrix; the RTL reach sign was already recorded in round 6. Paint:
  `critic-13/probe/chromium-headless-new/c12b-1440-f-rtl-cap267-endfocus.png`. Route with the
  roving keys in a layer group to W-I.8.
- **WebKit, RTL:** two caps under the fit edge compute a trailing radius off the sweep's pattern
  (`23.54px` at cap 253, 390 coarse; `22.5px` at cap 253, 1440; the neighbours read `30px`/`28px`).
  One sample each; not chased.
- **The CHANGELOG carries row ids** ("O-129 r1", "O-201", …), as critiques 11 and 12 noted; the
  close seat owns that with the prose rule.
- **Untracked files the v10.1.4 arms need.** `tests-visual/release-10-1-5/v1014/` (v10.1.4's `src`
  and demo CSS, which every `-v1014` harness imports) is untracked, so the RED arms of the record
  are not reproducible from a clean checkout. `tests-visual/x` (36 kB) and `tests-visual/docs/` are
  strays from earlier seats. The close seat decides: commit the arm or say in the record that it is
  local, and remove the strays.

## What ran (all through `guarded`; none refused)

| run | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| `release-10-1-5.spec.ts` on the tip | 106/106 (load 10) | three passes, each 105/106: q2 at 1440 (pass 1, load 7; pass 2, load 5), n1 coarse (pass 3, load 6) |
| q2 alone / n1 alone | — | 16/16 / 24/24 |
| c13b (n1's collapse start per frame; tip, v10.1.4, fix-11 `src`) | 1/1 | 1/1, 1/1, 1/1 |
| g6 `release-10-1-4` | 23/23 | 15 passed, 8 skipped (`page.pdf`) |
| g6 `release-10-1-3` | 60/60 | 58 passed, 2 skipped |
| c12a, c12b (critic 12's cells, the items 4 to 6 cells) | 1/1, 1/1 | 1/1, 1/1 |
| item 3's observer probe (two passes) | 1/1, 1/1 | Chromium only (CDP throttle) |
| item 8's c9f, 10 runs per arm | — | 20/20 runs, 640 first expands |
| g7 (`critic-13/g7/gates.txt`) | typecheck, build, demo:dist:build, vitest 247 files / 2397 passed (10 expected fail, 1 skipped), verify:package CLEAN: all exit 0; the tree clean after | |

- **q2 at 1440 in WebKit.** In the first whole-spec pass `q2 O-187 at 1440` timed out inside
  `page.goto` (60 s, "waiting until load"), before any assertion; the other 105 passed. Fix 11's
  final WebKit pass lost the same cell the same way. q2 alone then passed 16 of 16 (two lone runs of
  both widths, four repeats each; `q2-wk.log`). q1 loads the same URL seconds earlier in every pass.
  The second whole pass lost it the same way and the third passed it. Test 90 hanging before its
  first request is the signature the 10.1.3 close traced to macOS `akd` holding a browser's 179th
  request, which was not the branch. I read it as that hang, not a paint reading, and it is not a
  finding. The third pass was meant as two shards; a one-file spec does not split, so it is a
  third whole pass (`branch-wk-pass3.*`).
- **My own error, recorded.** I stopped my p4 chain by PID (1263) taking it for a waiter that had
  not been admitted; it had just been admitted and had run q2 (8/8). Nothing was banked from the
  cut run; the chain was queued again whole and ran to the end (`queue.txt`).
- The first observer pass was started with a harness URL that named no scene and hung at
  `__ready`; I stopped it by PID (2748) and re-ran it. `obs-ch rc=130` in `runs.txt` is that.
- A WebKit lock wait is not a refusal: the WebKit chains waited from 2 to 13 minutes on other
  sessions' lanes.
- The fix-11 arm of c13b swapped `192c549cf`'s `src` into this worktree for one 2-minute run and
  restored HEAD's (`git status --short src` empty after; `runs.txt`).

## Union verdict

Not clean. **T1**: in WebKit 2287 on a coarse pointer, a vertical run that overflows by 20 px
jumps to its scroll end on the collapse's first frame (n1 RED in 1 of 3 whole passes; 6 of 24 on
the tip and 3 of 8 on the fix-11 tip per frame; 0 of 24 at that cell on v10.1.4, which shows the
same WebKit re-snap at other stages). **T2**: the CHANGELOG's O-201 entry says the vertical run
was rebuilt on the horizontal run's boxes and keeps a whole ring at every width; the tip keeps the
padding yield and cuts 1 to 4 px in the band, as `fix-12.md` itself records. Everything else the
list gates holds in Chromium and WebKit 2287: rest corner, collapsed, true overflow, ring (with the
two bounds the note sends to the owner), the closed host-resize cells, consumer markup, Slider,
type, menu, the one-row cures, g6 and g7. The observer measurement keeps the observer; P4 is
closed as not reproduced.
