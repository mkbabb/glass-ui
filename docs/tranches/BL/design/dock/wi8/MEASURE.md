# W-I.8: the measuring pass

The measuring seat, claude-opus-5-5, 2026-11-14 to 15. I wrote none of the spec, the ledger, the prototype, the challenge or the fold.

This file finishes the measurement the design run left half done. It does not redesign. Gate numbers are `waves/W-I.8.md`'s (on master), never the prototype's. Paths below are relative to this folder (`docs/tranches/BL/design/dock/wi8/` in the worktree `.claude/worktrees/bl/dock/wi8`, branch `bl/dock/wi8`).

## What was built

The prototype source was uncommitted in the worktree. Its `src/` diff matched `prototype/prototype.patch` on master byte for byte, so I committed it as is first, then built the fold's amendments one commit each.

| commit | amendment | fold | gates |
|---|---|---|---|
| `8dd82bc57` | the prototype as the design run left it, unamended | – | – |
| `3a12f98dc` | `--dock-linger-max` 12 s, the dwell growth on by default | C-17 | G-1 (c), (d) |
| `3dec3c36b` | one shadow, `--shadow-dock-collapsed`, in both postures; the row-sized shadow leaf struck | C-14, C-11 | G-2, G-5, G-12 |
| `655a1f96e` | the posture coordinate is a spring quantity of its own; the summary, the run and the fission seat read it; `p = s(clamp((e − a)/(1 − a)))`, `s(x) = 3x² − 2x³`, `a` = 0.25 (a default, overridable by `data-fission-a`) | C-3, C-4 | G-3, G-4, G-5, G-9 |
| `9fcbe618a` | a region's clip is the plate's painted box in its own coordinates, insets may be negative; the leaving face is placed where it painted (the padding edge and the face's margin were missing) | C-1 | G-2 |
| `90532114f` | a region is carried by the edge it shares with the plate or its neighbour, and clipped to its lane while travel runs | C-2 | G-2, G-5 |
| `ec6c73443` | hit follows paint: `.glass-dock { pointer-events: none }`; the plate and the run keep theirs | C-9 | G-3 |
| `9a425cd1f` | the cut cap stands down on the plate while `[data-morphing]` is set, so the carrier is the corner's only writer in travel | C-20, P-10 | G-2 |
| `a32210d8f` | the dock's own `[data-glyph="turn"]` rule deleted; the scope element found once per travel | C-16 | G-11, G-12 |
| `a46a20906` | a lane boundary is the painted edge of the region carried by it (cure to `90532114f`, whose first form emptied the trailing region's lane) | C-2 | G-2, G-8 |

Not built, and why:

- the run's open-seat loop quantity (R-5, C-10): it is a new quantity of the loop, not a small cure. The seat's `inline-size` leg is still in `styles/controls/icon-button.css:80`, so G-12 fails on it.
- rest geometry on the posture class (C-8): the card and vertical cells are not in the harness; nothing would read the change.
- the place trigger for a moved dock and the two-dock row (C-7): not in the harness.
- neck B with tangent arcs, reading 6 of P-1, the labelled seat's room (C-13), the test hook compiled out (C-16), a held fade for a consumer's `v-if` (C-5), the swap's return that inverts `f` (C-3, second half): each is a rebuild, not a small cure, and the fission seat and labelled seat are held in any case.

Every reading below is on one build, `a46a20906` (`measure/logs/build-proto-3.sha`). The rows the first pass took on `a32210d8f` were discarded when the lane cure landed, so no table mixes builds.

## How it was measured

- **Harness** (`measure/harness/`): a copy of the prototype's harness and the audit's `probe.mjs` and `sampler.js`, changed in four places, each marked `MEASURE` in the source:
  - `sampler.js` reads each unit's visible box through its own and every ancestor's `clip-path: inset()` and non-visible `overflow` (`vb`). Rounded clip corners are ignored.
  - `judge.mjs` adds three bounds the fold added: *visible until covered*, *no overlap* between regions, and the leaving face's move in the first moving row against the plate's step. It applies the restated "no reversal" bound (the preset's own pass, at most 0.5 px, once). It reads a hidden element as opacity 0 (C-18). Its "not a capsule" test is replaced by G-2's bound as written, each corner between its two rests within 0.5 px: the old test misread a pill whose open rest is not a capsule (a 108 px layer group).
  - Every WebKit launch uses Playwright WebKit 2287 (`tests-visual/webkit-2287.config.ts` explains why: 2311 crashes on a GlassDock).
  - `clock.mjs` case (d) runs once with the tokens untouched and once with `--dock-linger-max: 6s`; case (i) closes the Popover from script with the pointer outside, since Escape is itself a dismissal, and counts folds as open-to-collapsed changes of the class (the prototype counted mutation records, which is why it read "2 folds").
- **New scenarios:** `rev-fold-w-pill-{30,50,80}-edge` return the pointer to 8 % of the painted plate's width, inside the plate and outside the collapsed box (C-9); `overlay-close-{out,esc,linger}` open the outlet's Popover and record past the linger.
- **Runs** (all under `guarded`; every WebKit run under `--exclusive webkit`; one browser per run, a context per cell; servers started and stopped by PID inside each guarded call by `session.sh`):
  - Chromium: 71 scenarios, `measure/logs/chromium-proto.log`, rows `measure/rows/proto/*.chromium.*.rows.json.gz`.
  - WebKit: the same 71, `measure/logs/webkit-proto.log`.
  - RED (v11.0.1) in WebKit: 13 scenarios, `measure/logs/webkit-red.log`, rows `measure/rows/red/`. RED in Chromium is the prototype seat's own rows on master (`prototype/rows/red/`), which this pass did not retake.
  - Clock, neck, label: both engines. Cost: Chromium at 1x and 4x. Unit specs on the prototype and on the master copy. Release specs: Chromium (`chromium-headless-new`, `coarse-touch`) and WebKit 2287.
- Row files are gzipped; `gunzip -k` one before handing it to `judge.mjs`. `gates.mjs` groups the judge's output by gate (`measure/logs/gates-*.txt`); `overlay.mjs` reads G-8; `g9.mjs` reads G-9.
- **Load.** The machine ran at a 1-minute load of 7 to 38 through the passes (other sessions; `measure/logs/followup.log` logs it per step). Some Chromium rows have gaps of 100 to 230 ms that are the machine's, and they cut fade sample counts in those rows. WebKit renders at about 60 Hz here (rows 15 to 17 ms apart), Chromium at about 120 Hz (8.3 ms).

## The fourteen gates

A gate is GREEN only when it is GREEN in both engines. None is.

| gate | Chromium | WebKit | verdict |
|---|---|---|---|
| G-1 clock | (a) 71.5 ms; (b) stays collapsed; (c) 6519 ms; (d) 12005 ms untouched, 6004 ms at max 6 s; (e) no fold, then 6635 ms; (f) Popover and focus hold; (g) 6009 ms after lift; (h) 2.6 ms, 2.6 ms; (i) one fold at 6534 ms; (j) pinned, no fold in 15 s; (k) 6531 ms. Finger held, `collapse()`, (l) as distinct from (j), and 390 coarse for all but (g) not run | (a) 67 ms; **(b) opens under a still pointer at 700 ms** (RED also, 741 ms); (c) 6526; (d) 12009 / 6005; (e) 6656; (f) holds; (g) 6010; (h) 8 ms, 4 ms; (i) one fold at 6550; (j) holds; (k) 6560 | **fails** on (b) in WebKit; open on the cells not run |
| G-2 fold and unfold | 34 of 42 segments pass on pill, rounded, flow, layers, wide, outlet, figure. First step 0.9 to 2.0 %, largest 6.9 to 8.6 %, last ≤ 0.11 px. No region overlap; no content outside the plate. Fails: the outlet cell hides seat 3 for 1 to 2 rows at its lane edge (6 segments); a summary or full face steps 0.41 in 60 Hz on 2 segments (the R-3 windows on `e`). At open rest the pill's trailing corners are 27 px, not 28: the cut cap returns at rest, so the corner steps 1 px on the first and last row of each travel. Card, vertical, rail, sheet, two-dock row, resize, slider held, fourier, keyframes, empty summary, active-seat crops: not run | 0 of 42 pass. First step 2.7 to 6.3 % against the 4 % cap (the preset's own first step at 15 to 17 ms is 4.6 to 5.7 %, so the cap, not the carrier, decides); fades 2 to 3 samples against 5 (a 35 % window of `e` lasts about 50 ms); "against travel" 2 to 6 steps of 0.14 to 0.37 px on wide and layers; leaving face moves 0.5 to 0.8 px more than the plate in the first row (10 segments); outlet hides seat 3 in 1 row | **fails** |
| G-3 reversal | pill: turns 2 to 3 frames after the mark at 30 % (fold, both the centre and the edge return), 1 to 2 at 50 and 80 %; velocity change 2.7 to 5.6 (per mille of travel per ms); at most 2 blank rows after a turn. The edge return turns the plate, so hit follows paint. Unfold at 30 % and 50 %: steps 7 to 13.5 % over the bound. The `w-std` cells use neck A and fail on its hand-over (A is out). Corner off its rests' lerp on every pill reversal (the 27 px rest corner above) | pill: turns 1 to 2 frames at every point; ≤ 1 blank row; first step 4.1 to 7.7 % against 4 %; unfold at 30 % steps up to 23 %; same corner fault. RED turns 4 to 5 frames | **fails** (Chromium 3-frame turn at 30 %, unfold steps, corner; WebKit first step, unfold steps, corner) |
| G-4 layer swap | 4 of 15 pass. Main axis inside; cross axis over on the crossfade's third change (T/B 8 to 10 % against 7 to 9.8 %, 23 steps against travel of 4.25 px total); the crossfade's leaving face moves 38 px in the first row (its placement in the crossfade's grid cell is wrong); corner off its lerp on 9 segments. Select, persistent region mount, seat add/remove, route, open seat, `#beside` swap, return at 30/60 %, fold during a swap: not run | 0 of 15. As Chromium, plus first steps 4.6 % and fades of 3 samples | **fails** |
| G-5 fission seat | neck B: geometry steps inside on the std-neckb fold cells but every segment fails on hidden run seats (17 to 32 unit-rows) and the seat overlapping run seat 0 or 1 by up to 5.2 px. P-1 by `neck.mjs`: flat deviation up to 42 (bound 2), stripe junction 0.5. Reading 1 as specified (a planted SVG filter must fail it) is not what `neck.mjs` measures; readings 3, 5 and 6 unread | neck B: flat deviation 204 to 209 and junction 103.5 at every held value: the WebKit leaf does not read as one surface. Same overlap and hidden rows | **fails; held** |
| G-6 labelled seat | the 0 px guard holds: the plate moves only on the unfold in every label and sweep row. Name readable at 58 to 63 ms (A), 75 to 84 ms (B); at 390 marks and settings not shown though "fit"; the room is the open seat's (C-13 not built) | guard holds; readable 54 to 62 ms (A), 77 to 110 ms (B); same fit fault | **fails; held** (only the guard passes) |
| G-7 outlet | `git grep` for DOM lookups in `DockOutlet.vue` and `dockRegistry.ts` prints nothing. No outlet unit spec exists; the Chromium cells (sibling tree, mount order, remount, two outlets, empty region) not built | not run | **unread** (one clause passes) |
| G-8 overlays | outlet seat only. Escape: fold at 9 ms, Popover exit starts one row after, 15 samples, largest step 0.26, gone at 134 ms, before the plate lands at 410 ms: passes. Linger: held through 9 s with the Popover open: passes. **Press outside: the Popover closes at 16 ms and the dock folds 7073 ms later, by the linger**, against R-2's "a press outside skips the linger". Run seat, layer-face seat, menu, select, hover popover: not run | Escape: fold 13 ms, exit starts the same row, 8 samples, step 0.21: passes. Linger: holds. Press outside: folds at 7084 ms: fails. RED folds at 31 ms on a press outside and at 3628 ms with the Popover open | **fails** on the press outside; open on the cells not run |
| G-9 progress | `--dock-expand-t` present in every row; 0 and 1 at rest, 1 after both swaps; within 0.003 of the plate's travel fraction on plain folds; no class change without `[data-morphing]`. Reversal rows not read (`g9.mjs` measures a fraction against the segment's ends, wrong for a turn). The `data-dock-scope` follower not built | same values | **open** (clauses read pass; the follower unread) |
| G-10 reduced motion | 18 of 24 pass. Fails: neck A cells move geometry on 7 to 10 frames; `fold-w-rounded-rm` and `fold-w-pill-rm` fades of 5 to 6 values over 35 to 40 ms, under the 50 ms floor | 18 of 24. Neck A cells; two fades of 3 values over 35 ms | **fails** |
| G-11 cost | layouts per frame median 1, largest 3 on every cell (bound 1); dirty objects ≤ 15; the loop's script 0.12 to 0.15 ms median at 1x, 0.14 to 0.66 ms at 4x (inside); at rest 0 frame callbacks, 0 mutations, 0 animations; nodes: pill 27, std 56 (one fewer than the prototype: the shadow leaf). Elements styled during a fold: 5 (bound 12 met on unfold; fold lists 5 elements). Style recalculation scope and paint at a new radius not read. Load 22 during the trace | 2 of 784 travel rows over 20 ms (0.3 %; bound 1 in 10) | **fails** on 3 layouts a frame; style and paint unread |
| G-12 static | fails: the seat's `inline-size` leg (`icon-button.css:80`); `__dockHold` in the built `GlassDock` chunk; `@property --dock-morph-origin` and `--dock-pane-shift` still declared (`styles/index.css:118,128`). Passes: no `scale` on the root or a region, no `filter: url(`, no `--dock-expand-t` in geometry, no `[data-glyph` under the dock, one plate shadow, the three names present (`measure/logs/g12-static.txt`) | (engine-free) | **fails** |
| G-13 census, focus, hit, forced colours | not built into the harness | not built | **unread** |
| G-14 shipped line | release specs on the prototype: 10.1.1 24/25 (O-102(3) popover from `#persistent`), 10.1.2 30/52, 10.1.3 28/60, 10.1.4 23/23, 10.1.5 87/107 and 85/107 (coarse), 11.0.1 9/9. Dock unit specs: 13 of 215 fail on the prototype, 0 on the master copy | 10.1.1 25/25, 10.1.2 30/52, 10.1.3 31/60 (2 skipped), 10.1.4 15/23 (8 skipped), 10.1.5 88/107, 11.0.1 9/9 | **fails** |

## Notes on the readings

- **G-14's failures are not baselined against master for the release specs.** That run would have taken another 90 minutes of browser time; the unit specs were baselined (all pass on master). The release failures cluster on witnesses of the deleted morph: O-101 and O-101a (the expanded endpoint follows the pane), O-110 (grows from the anchored edge), D-1 (no control outside the plate, the summary glyph's box), 10.1.5's fit-edge and ring cells. R-1 says a witness that reads a deleted mechanism is restated to the law it guarded; none is restated, so each counts as failing.
- **The 13 unit failures** (`measure/logs/units.log`): the spring-settle `isTransitioning` witnesses (4), the crossfade's co-present faces (2), the hover intent under happy-dom (3, the token is not resolved there), the touch press release (1), the corner rules that read `--dock-size-scale` and the collapsed corner by selector (3), and the focus-ring lattice count (1, 5 against 4).
- **The 4 % first-step cap in WebKit.** At 60 Hz the dock preset's own first step from rest is above 4 %, so no carrier on this preset passes the cap as written at that frame length. The carrier's clock is right: the first painted row shows the old box and the second moves by the spring's step. The cap is read, not changed.
- **The fades in WebKit.** The R-3 windows give a face 35 % of `e`, which the spring crosses in about 50 ms; at 60 Hz that is 2 to 3 samples against W-B.17's five. This is the windows' form (OQ-4), not the build.
- **The press outside with an overlay open (G-8).** The prototype closes the Popover and lingers; v11.0.1 folds at once. That is a regression against R-2 and RED.
- **WebKit (b).** WebKit fires a pointer event when the page scrolls under a still pointer, and both builds open at about 700 ms. The intent rule (count from the first movement) does not hold in WebKit as built.

## Rows seen mid-build and not written down

PROTOTYPE.md says `rev-*-w-std-*`, `swap-*`, `label-*` and `sweep-fine` ran while the build changed. All of them, and every other scenario, were rerun here on `a46a20906` in both engines; their rows are in `measure/rows/proto/` and their verdicts in `measure/logs/judge-{chromium,webkit}-proto.txt`. The overlay cell that ended inside the linger is `overlay-close-*`, recorded past it.

## What did not run

- P-4 to P-7, P-9, P-11, P-12: not built.
- G-7's and G-13's harness cells, G-9's follower, G-11's style-recalculation and paint readings, the card and vertical cells, the two-dock row, the resize cell, a slider held through a fold, the consumers' compositions.
- RED in Chromium (the prototype seat's rows stand) and the release specs on master.
- No guard refusal occurred. Runs waited on browser slots and on the WebKit lock held by other sessions; none was refused.
