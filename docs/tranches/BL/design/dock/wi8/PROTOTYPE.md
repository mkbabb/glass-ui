# W-I.8 prototype

The prototype builds the spec's pieces on branch `bl/dock/wi8` in the worktree `.claude/worktrees/bl/dock/wi8` (from master `99a1389e6`). The diff is `prototype/prototype.patch` (21 files, +1346 / −267). The harness page, scripts, row files and logs are under `prototype/`. Chosen strips are under `prototype/strips/`; every strip the probe wrote sits beside its row file under `prototype/rows/proto` and `prototype/rows/red`.

The RED column is v11.0.1 (`git archive v11.0.1`), built with the same harness page. On v11.0.1 the standard cell is two docks, since the fission seat does not exist there, and the outlet cell uses a plain Teleport. RED cells that cannot exist are marked "not run".

## What was built

- **The carrier (R-1)** is `composables/useDockBody.ts`. One rAF spring, from `springPreset("dock")`, writes the plate's insets and radius in px. Regions move by translate and are clipped by `clip-path: inset()` while they travel. The plate carries one shadow, lerped on `--dock-expand-t`. At rest it clears every inline write. The root scale, the counter-scales, the pane shift, the 0.82 pop and the morph clip are deleted.
- **The clock (R-2)** is in `useDockState.ts`. It has the `--dock-intent`, `--dock-linger` and `--dock-linger-max` tokens, dwell-grown linger, the holds (keep-open, focus-visible, press), the touch linger, an immediate reverse on a return mid-fold, and `pinned` as a v-model.
- **The content windows (R-3)** come from `exchange()`. It places the leaving face out of flow and fades it on `1 − f/0.35`; the entering face fades on `(f − 0.35)/0.35`.
- **The layer swap (R-5)** goes through the same body, from `DockCrossfade.vue` and from the posture watcher.
- **The fission seat (R-6)** is the `#beside` slot, with neck A (three leaves) and neck B (one leaf clipped by `path()`), chosen by `?neck=a|b`. It has one shadow leaf.
- **The labelled seat (R-7)** is `DockControl` `label` plus `useDockLabels.ts`. The neighbours shift by translate, and a name that does not fit is not shown. Entry design A (fade with 4 px) or B (scale from 0.8) is chosen by `?label=a|b`.
- **The outlet (R-8)** is `DockOutlet.vue` plus `dockRegistry.ts`, keyed by the root's `id`.
- **`--dock-expand-t` (R-10)** is published each frame on the root and on the nearest `[data-dock-scope]`.
- **Reduced motion (R-11)** seats the geometry in one frame and fades the content in 100 ms.
- **The figure preset (R-12)** is `[data-preset="figure"]`.

Not built:

- the run's open-seat loop quantity;
- the in-flow dock's inline margin (only the block margin is written).

## How it was measured

- **Rows:**
  - The audit sampler (`audit/animation/harness/probe.mjs`) ran in headless Chromium at 1440 fine and 390 coarse, light and dark, and under reduced motion.
  - The gate bounds come from `harness/judge.mjs`, computed from `springPresets.ts` (dock: response 0.3, ζ 0.88).
  - `faults.mjs` ran over every Chromium row file; its output is `rows/*/*.faults.txt`.
- **Other readings:**
  - Cost: `harness/cost.mjs`, CDP trace at 1x and 4x CPU.
  - Clock: `harness/clock.mjs`, real timers.
  - Neck: `harness/neck.mjs`, pixel readings at dpr 4.
  - Label: `harness/label.mjs`.
- **Columns in the tables:**
  - *travel, first / max % / last*: the plate's main edge, with steps as a percentage of the travel.
  - *op60*: the largest opacity change within 60 Hz. *blank n@p*: rows where no face shows, at plate progress p.
  - *out*: px of content outside the plate.
  - The verdict lists the first violations.
  - "not a capsule" is a corner-equality reading that fails for a reason given below; it is not a seen defect.

**Builds.** The prototype changed twice during the batches: the label room was measured from the icon, and the fission seat's content was faded on the posture windows. As a result:

- The `fold-w-std-*` rows, `label.mjs` and `cost.mjs` are on the final build.
- `rev-*-w-std-*`, `swap-*`, `label-*` and `sweep-fine` ran during the rebuilds and may be on the build before.

## Stopped: WebKit, tests

The first WebKit run was refused by the guard: `REFUSED: kernel zone data.kalloc.1024 at 8.01M ... reboot the Mac`. This is not a stale-cache refusal. Per the machine law I stopped every heavy and browser run there, so none of the following was run:

- WebKit for any gate;
- the dock unit specs (`tests/components/custom/dock`);
- the release specs (`release-10-1-1` to `release-11-0-1`).

They are owed after a reboot. The lists are ready: `lists/wk-proto.txt` and `lists/wk-red.txt`, and `neck.mjs`/`label.mjs`/`clock.mjs` with `--engine webkit`.

## Gate status

| gate | reading (Chromium) | status |
|---|---|---|
| G-2 spring bounds, fold/unfold, pill and single-region cells | first step 1.0–2.0 % against a bound of 1.1–2.3 %; max 6.9–8.6 %; last ≤ 0.11 px. RED: first step 5 % on every cell; cross axis 100 % in one frame on w-layers and w-flow | pass, except the 0.1 px overshoot below |
| G-2 "no reversal" | every prototype fold/unfold steps 0.09–0.11 px against travel once at the end. This is the dock preset's own ζ 0.88 overshoot, not a carrier fault. | fail as written; the gate and the preset disagree |
| G-2 fission, neck A | max step 31–33 %. The main plate's right edge moves by the seat's width in one frame at the hand-over (the outline is the same before and after). The p-driven steps are 8.6–11 % against a bound of about 8 %, because p = clamp((e − 0.5)/0.5) runs at twice the spring's rate. | fail; the formula in R-6 causes it |
| G-2 fission, neck B | 1.0–1.4 % first, 7.1–7.4 % max, last 0.11 px | pass on geometry |
| G-3 corners | the run's cut-cap CSS animations (`gl-dock-cap-inline-start/-end`) override the carrier's inline radius (27 against 28 px), so the capsule reading fails while the plate travels; with neck B the plate is the row while clipped | fail; the build must compose the cut cap with the carrier |
| G-4 opacity | op60 0.35–0.40 on every face on all non-fission cells. Fission cells: the `beside` region still cuts (1.00 in one frame) after the beside-fade change. RED: 1.00 on every cell (the pane cuts). | pass except beside |
| G-4 blank | one row with no face showing, at plate progress 0.36–0.38 (the R-3 windows meet at f = 0.35 by design) | one frame; recorded |
| G-5 content inside the plate | 0 px on every prototype row | pass |
| G-6 mid-fold reversal (pill, 30/50/80 %) | the edge turns 0–3 frames after the reversal and its steps stay inside the full-travel bounds. RED turns 8–9 frames after and its first step is 5 %. | pass (one 3-frame turn at 30 %) |
| G-6 reversal, w-std at 50 % | fold reversal seg2: last step 51.6 px (72.5 %), a snap at the neck A hand-over | fail |
| G-8 layer swap | swap-layers: the main axis passes; the cross axis glides (1.3–2 % first) where RED jumps 100 %. swap-xf: the second and third segments of the gesture exceed the first-step bound on the cross axis by 0.1–0.5 % | mostly pass; small cross-axis excess |
| G-10 reduced motion | geometry seats in one frame; content fades over about 100 ms in ≥ 3 values on every rm cell. RED: 2 values over 6–10 ms. swap-xf-rm: geometry moves on 2 frames. | pass, except swap-xf-rm |
| G-12 0 px hover guard | the dock, plate and seat plate move 0.00 px through every label hover and the sweep, on both builds | pass |
| G-1 clock | see the clock table | mostly pass; d fails |
| G-11 cost | 1 layout per animation frame (median), at most 3; RED at most 10. The rAF callback median is 0.11–0.14 ms at 1x and 0.5–0.7 ms at 4x; RED 1.1–1.5 ms and 4.5–7.1 ms. Nothing runs at rest. | fail on "no layout per frame": the plate's inset writes lay out one subtree per frame |
| Overlay closing with the fold | the prototype holds the fold while the Popover is open (clock f); the recording window ended before the linger lapsed, so no close-with-fold segment exists | unmeasured |
| G-7 unit tests, release specs | refused by the guard | unmeasured |
| Safari, WebKit | refused by the guard | unmeasured |
| G-9 follower, G-13 forced colours and census, P-4 to P-7 | not built into the harness | unmeasured |
| `data-dock-scope` | built (written each frame) | unmeasured |

## Clock (G-1), Chromium, real timers

| case | prototype | RED |
|---|---|---|
| a: open after intent | 77.8 ms | 81.6 ms |
| b: opens under a still pointer | no | yes, at 578 ms |
| c: fold after leave, 1 s visit | 6007 ms | 3610 ms |
| d: fold after leave, 12 s visit | **12006 ms** (the spec caps the linger at `--dock-linger-max`, 6 s: defect, the cap does not apply) | 3610 ms |
| e: return before the fold, then leave | no fold before return; 6005 ms after the second leave | 3611 ms |
| f: Popover open inside | held open, Popover still open | **folded at 3614 ms with the Popover open** |
| f: keyboard focus inside | held | held |
| g: touch tap then lift | opened; folds 6012 ms after lift | opened; never folds |
| h: outside press / Escape | 3.5 ms / 3.5 ms | 6 / 7.1 ms |
| i: unpin release | 6 ms, 2 folds | 8 ms, 2 folds |
| j: pinned | no fold in 15 s | no fold in 15 s |
| k: fold after leave | 6014 ms | 3615 ms |

## Cost (G-11), Chromium trace, unfold then fold

| cell | nodes | layouts/frame max (median) | rAF ms median / max, 1x | rAF ms median / max, 4x | rest: rAF, mutations, animations |
|---|---|---|---|---|---|
| w-pill | 27 (RED 27) | 3 (1); RED 10 (1) | 0.11 / 1.1; RED 1.13 / 1.5 | 0.10 / 4.6; RED 4.6 / 7.0 | 0 / 0 / 0 both |
| w-std neck A | 57 (RED 37, two docks) | 3 (1); RED 10 (1) | 0.13 / 2.0; RED 1.45 / 1.8 | 0.67 / 13.2; RED 7.1 / 14.3 | 0 / 0 / 0 both |
| w-std neck B | 57 | 3 (1) | 0.14 / 2.7 | 0.62 / 11.1 | 0 / 0 / 0 |
| w-flow | 55 (RED 55) | 3 (1); RED 9 (1) | 0.13 / 1.4; RED 1.3 / 1.7 | 0.62 / 7.3; RED 5.2 / 6.9 | 0 / 0 / 0 both |
| w-layers | 58 (RED 58) | 3 (1); RED 10 (1) | 0.14 / 1.5; RED 1.2 / 1.7 | 0.54 / 7.3; RED 4.5 / 6.5 | 0 / 0 / 0 both |

Elements with inline styles while folding, prototype w-std neck A (writes over the gesture): the root 64, the plate 63, `.dock-beside` 64, `.dock-shadow` 55, `.dock-persistent` 56, `.dock-layers` 57, the seat plate 16, the neck 9. Full traces: `logs/cost.proto.json`, `logs/cost.red.json`.

## Neck A against neck B (P-1), Chromium, dpr 4

The `svg` row is a planted SVG-filter neck, used as a reference.

| design, width | 1 backdrop ratio main / seat (stripes) | 2 flat deviation max | stripe junction max | edge profile diff, light / dark |
|---|---|---|---|---|
| A, 1440 | 0.20 / 0.35 | 25 | 88.6 | 27.9 / 17.2 |
| A, 390 | 0.11 / 0.32 | 25 | 27.9 | 28.9 / 17.2 |
| B, 1440 | 0.11 / 0.28 | 22 | 0.5 | 14.8 / 15.1 |
| B, 390 | 0.08 / 0.34 | 22 | 0 | 34.9 / 16.2 |
| svg, both | 1.00 / 1.00 | 0 | 113.5 | 0 / 0 |

Neck A shows three leaves' seams on stripes (junction 88.6) and a flat deviation of 17–25 from p = 0.25 on. Neck B has no junction, and its flat deviation stays at 1 until p = 0.75, where it reaches 20–22 in light. Reading 2 excluded only 2 px around the gap when this ran; `neck.mjs` now excludes the facing corners, and that change has not been rerun. The backdrop ratio of both designs is far below 1, because the plate's backdrop filter samples a smaller area than the reference filter: a reading, not a verdict. Strips show a single shadow leaf leaving the gap and facing corners as a pale notch inside the row's halo (neck A, `strips/proto.fold-w-std-necka-*`).

## Labelled seat (P-2, P-3), Chromium

| width, design | seats shown | fit need/room px | readable ms (0.02 to 0.8) | animated properties on the name | seats shifted by translate |
|---|---|---|---|---|---|
| 1440 A | search, library, marks, settings; read not shown (116 > 58) | 64–95 / 124–169 | 59–62 | translate | 0 to 3 to the left |
| 1440 B | same | same | 77–79 | scale | same |
| 390 A | search, library; marks and settings not shown | 64–66 / 124–142 | 61 | translate | 0–1 |
| 390 B | same | same | 76–78 | scale | same |

Contrast at the end of the entry (ratio of edge contrast to rest): A 0.84–0.97, B 0.87–1.00. The `label-*` row reading of the 725 ms "readable" on label#1 is a seat whose name was already shown from the previous hover; label#2's 0 ms is a seat that was already visible. The `label.mjs` table is the clean reading.

At 390, marks and settings were not shown although `fit` reads true. The reading came from the seat before them, because `label.mjs` hovers in order and the slack algorithm reads the room after the shift. This is an open finding.

## Full tables, prototype against RED (Chromium)

### Fold and unfold (`fold-<cell>-<cell tag>`)

| scenario | cell | seg | prototype: travel, first / max % / last | op60 | out | prototype verdict | RED: travel, first / max % / last | RED op60 | RED verdict |
|---|---|---|---|---|---|---|---|---|---|
| fold-w-figure-coarse | 390-coarse-light | 1 | 84 px, 1.4 / 7.9 % / 0.1 px | 0.4 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px) | 84 px, 5 / 7.6 % / 0.11 px | 1 | L first 5.0% > 1.7% ; R first 5.0% > 1.7% ; opacity 1.00 in 60 Hz at full f8; full fade has 0 samples |
| fold-w-figure-coarse | 390-coarse-light | 2 | 84 px, 1.4 / 7.5 % / 0.1 px | 0.37 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px) | 84 px, 5 / 7.7 % / 0.13 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at summary f162; summary fade has 0 samples |
| fold-w-figure-dark | 1440-fine-dark | 1 | 76 px, 1.7 / 7.5 % / 0.11 px | 0.41 · blank 1@0.38 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); opacity 0.41 in 60 Hz at summary f39 | 78 px, 5 / 7 % / 0.1 px | 1 | L first 5.0% > 2.0% ; R first 5.0% > 2.0% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-figure-dark | 1440-fine-dark | 2 | 76 px, 1.2 / 24.6 % / 0.1 px | 0.35 · blank 1@0.35 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); full fade has 3 samples; seat#0 fade has 3 samples | 78 px, 5 / 6.9 % / 0.11 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at summary f180; summary fade has 0 samples |
| fold-w-figure-fine | 1440-fine-light | 1 | 76 px, 1.3 / 7.8 % / 0.11 px | 0.37 · blank 1@0.38 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px) | 78 px, 5 / 7.6 % / 0.11 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-figure-fine | 1440-fine-light | 2 | 76 px, 1.4 / 8.6 % / 0.11 px | 0.35 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px) | 78 px, 5 / 7.7 % / 0.09 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at summary f177; summary fade has 0 samples |
| fold-w-figure-rm | 1440-fine-light-rm | 1 | 76 px, 100 / 100 % / 76 px | 0.24 | 0 | pass | 78 px, 100 / 100 % / 78 px | 1 | full fade 2 values over 7 ms; summary fade 2 values over 7 ms; seat#0 fade 2 values over 7 ms; seat#1 fade 2 values over 7 ms |
| fold-w-figure-rm | 1440-fine-light-rm | 2 | 76 px, 100 / 100 % / 76 px | 0.22 | 0 | pass | 78 px, 100 / 100 % / 78 px | 1 | full fade 2 values over 10 ms; summary fade 2 values over 10 ms; seat#0 fade 2 values over 10 ms; seat#1 fade 2 values over 10 ms |
| fold-w-flow-coarse | 390-coarse-light | 1 | 38.5 px, 1.4 / 7.3 % / 0.05 px · cross 1.4/7.3% | 0.38 · blank 1@0.37 | 0 | not a capsule in 32 rows | 38.5 px, 5 / 7 % / 0.06 px · cross 100/100% | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; B first 100.0% > 1.6% ; B step 100.0% > 8.1%  |
| fold-w-flow-coarse | 390-coarse-light | 2 | 38.5 px, 2 / 8.2 % / 0.03 px · cross 2/8.1% | 0.37 · blank 1@0.38 | 0 | not a capsule in 26 rows | 38.5 px, 5.1 / 8 % / 0.04 px · cross 100/100% | 1 | L first 5.1% > 1.4% ; R first 5.1% > 1.4% ; B first 100.0% > 1.4% ; B step 100.0% > 7.6%  |
| fold-w-flow-dark | 1440-fine-dark | 1 | 44.3 px, 1.6 / 7.7 % / 0.07 px · cross 1.6/7.8% | 0.38 · blank 1@0.37 | 0 | not a capsule in 32 rows | 44.5 px, 5 / 7.8 % / 0.05 px · cross 100/100% | 1 | L first 5.0% > 1.0% ; R first 5.0% > 1.0% ; B first 100.0% > 1.0% ; B step 100.0% > 6.3%  |
| fold-w-flow-dark | 1440-fine-dark | 2 | 44.3 px, 1.9 / 7.8 % / 0.05 px · cross 1.9/7.8% | 0.39 · blank 1@0.38 | 0 | not a capsule in 26 rows | 44.3 px, 4.6 / 8.3 % / 0.06 px · cross 100/100% | 1 | L first 4.6% > 2.1% ; R first 4.6% > 2.1% ; B first 100.0% > 2.1% ; B step 100.0% > 9.3%  |
| fold-w-flow-fine | 1440-fine-light | 1 | 44.3 px, 1.4 / 7.8 % / 0.07 px · cross 1.4/7.8% | 0.37 · blank 1@0.36 | 0 | not a capsule in 32 rows | 44.5 px, 5 / 8 % / 0.06 px · cross 100/100% | 1 | L first 5.0% > 1.3% ; R first 5.0% > 1.3% ; B first 100.0% > 1.3% ; B step 100.0% > 7.3%  |
| fold-w-flow-fine | 1440-fine-light | 2 | 44.3 px, 1.7 / 6.9 % / 0.05 px · cross 1.7/6.9% | 0.39 · blank 1@0.38 | 0 | not a capsule in 26 rows | 44.3 px, 4.6 / 7.5 % / 0.06 px · cross 100/100% | 1 | L first 4.6% > 1.8% ; R first 4.6% > 1.8% ; B first 100.0% > 1.8% ; B step 100.0% > 8.7%  |
| fold-w-flow-rm | 1440-fine-light-rm | 1 | 44.3 px, 100 / 100 % / 44.34 px · cross 100/100% | 0.24 | 0 | pass | 44.3 px, 100 / 100 % / 44.34 px · cross 100/100% | 1 | full fade 2 values over 6 ms; summary fade 2 values over 6 ms |
| fold-w-flow-rm | 1440-fine-light-rm | 2 | 44.3 px, 100 / 100 % / 44.34 px · cross 100/100% | 0.24 | 0 | pass | 44.3 px, 100 / 100 % / 44.34 px · cross 100/100% | 1 | full fade 2 values over 8 ms; summary fade 2 values over 8 ms |
| fold-w-layers-coarse | 390-coarse-light | 1 | 96.1 px, 1.7 / 8 % / 0.1 px · cross 1.7/8% | 0.39 · blank 1@0.38 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 50 rows | 96 px, 5 / 8.2 % / 0.14 px · cross 100/100% | 1 | L first 5.0% > 1.9% ; R first 5.0% > 1.9% ; T first 100.0% > 1.9% ; T step 100.0% > 8.8%  |
| fold-w-layers-coarse | 390-coarse-light | 2 | 96.1 px, 1.2 / 6.9 % / 0.1 px · cross 1.3/6.9% | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 26 rows | 96.1 px, 5 / 7 % / 0.15 px · cross 100/100% | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; T first 100.0% > 1.5% ; T step 100.0% > 7.9%  |
| fold-w-layers-dark | 1440-fine-dark | 1 | 101.8 px, 1.2 / 7.8 % / 0.11 px · cross 1.2/7.9% | 0.38 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 102 px, 5 / 8.4 % / 0.13 px · cross 100/100% | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; T first 100.0% > 1.6% ; T step 100.0% > 8.1%  |
| fold-w-layers-dark | 1440-fine-dark | 2 | 101.8 px, 1.8 / 7 % / 0.11 px · cross 1.8/7.1% | 0.39 · blank 1@0.38 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 26 rows | 101.8 px, 4.8 / 7 % / 0.14 px · cross 100/100% | 1 | L first 4.8% > 1.9% ; R first 4.8% > 1.9% ; T first 100.0% > 1.9% ; T step 100.0% > 8.8%  |
| fold-w-layers-fine | 1440-fine-light | 1 | 101.8 px, 1.3 / 7.6 % / 0.1 px · cross 1.3/7.7% | 0.4 · blank 1@0.36 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 51 rows; opacity 0.40 in 60 Hz at summary f32 | 102 px, 5 / 8 % / 0.02 px · cross 100/100% | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; T first 100.0% > 1.5% ; T step 100.0% > 7.7%  |
| fold-w-layers-fine | 1440-fine-light | 2 | 101.8 px, 1.6 / 7.9 % / 0.11 px · cross 1.5/7.9% | 0.36 · blank 1@0.36 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 26 rows | 101.8 px, 4.8 / 7.6 % / 0.1 px · cross 100/100% | 1 | L first 4.8% > 1.4% ; R first 4.8% > 1.4% ; T first 100.0% > 1.4% ; T step 100.0% > 7.5%  |
| fold-w-layers-rm | 1440-fine-light-rm | 1 | 101.8 px, 100 / 100 % / 101.84 px · cross 100/100% | 0.24 | 0 | pass | 101.8 px, 100 / 100 % / 101.84 px · cross 100/100% | 1 | full fade 2 values over 10 ms; summary fade 2 values over 10 ms |
| fold-w-layers-rm | 1440-fine-light-rm | 2 | 101.8 px, 100 / 100 % / 101.84 px · cross 100/100% | 0.24 | 0 | pass | 101.8 px, 100 / 100 % / 101.84 px · cross 100/100% | 1 | full fade 2 values over 10 ms; summary fade 2 values over 10 ms |
| fold-w-outlet-coarse | 390-coarse-light | 1 | 86 px, 1.5 / 8.3 % / 0.11 px | 0.37 · blank 1@0.36 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 51 rows | 84 px, 5 / 7 % / 0.1 px | 1 | L first 5.0% > 2.3% ; R first 5.0% > 2.3% ; opacity 1.00 in 60 Hz at full f7; full fade has 0 samples |
| fold-w-outlet-coarse | 390-coarse-light | 2 | 86 px, 1.6 / 7.1 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 1 rows | 84 px, 5 / 7.4 % / 0.12 px | 1 | L first 5.0% > 1.8% ; R first 5.0% > 1.8% ; opacity 1.00 in 60 Hz at summary f160; summary fade has 0 samples |
| fold-w-outlet-dark | 1440-fine-dark | 1 | 80 px, 1.2 / 7.5 % / 0.1 px | 0.39 · blank 1@0.36 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 51 rows | 78 px, 5 / 7.1 % / 0.11 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-outlet-dark | 1440-fine-dark | 2 | 80 px, 1.1 / 7.4 % / 0.1 px | 0.4 · blank 1@0.35 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 1 rows | 78 px, 5 / 7 % / 0.1 px | 1 | L first 5.0% > 1.4% ; R first 5.0% > 1.4% ; opacity 1.00 in 60 Hz at summary f181; summary fade has 0 samples |
| fold-w-outlet-fine | 1440-fine-light | 1 | 80 px, 1.4 / 7.3 % / 0.1 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 51 rows | 78 px, 5 / 8.3 % / 0.1 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-outlet-fine | 1440-fine-light | 2 | 80 px, 1.1 / 7.8 % / 0.1 px | 0.4 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 1 rows; opacity 0.40 in 60 Hz at full f168 | 78 px, 5 / 7.7 % / 0.11 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at summary f180; summary fade has 0 samples |
| fold-w-outlet-rm | 1440-fine-light-rm | 1 | 80 px, 100 / 100 % / 80 px | 0.21 | 0 | pass | 78 px, 100 / 100 % / 78 px | 1 | full fade 2 values over 8 ms; summary fade 2 values over 8 ms; seat#0 fade 2 values over 8 ms; seat#1 fade 2 values over 8 ms |
| fold-w-outlet-rm | 1440-fine-light-rm | 2 | 80 px, 100 / 100 % / 80 px | 0.19 | 0 | pass | 78 px, 100 / 100 % / 78 px | 1 | full fade 2 values over 8 ms; summary fade 2 values over 8 ms; seat#0 fade 2 values over 8 ms; seat#1 fade 2 values over 8 ms |
| fold-w-pill-coarse | 390-coarse-light | 1 | 82 px, 1.8 / 7.7 % / 0.1 px | 0.37 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 51 rows | 82 px, 5 / 7.7 % / 0.11 px | 1 | L first 5.0% > 1.8% ; R first 5.0% > 1.8% ; opacity 1.00 in 60 Hz at full f7; full fade has 0 samples |
| fold-w-pill-coarse | 390-coarse-light | 2 | 82 px, 1.8 / 7.7 % / 0.1 px | 0.38 · blank 1@0.38 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 1 rows | 82 px, 5 / 8.1 % / 0.11 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at summary f160; summary fade has 0 samples |
| fold-w-pill-dark | 1440-fine-dark | 1 | 76 px, 1.3 / 7.3 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 76 px, 5 / 7.6 % / 0.11 px | 1 | L first 5.0% > 1.4% ; R first 5.0% > 1.4% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-pill-dark | 1440-fine-dark | 2 | 76 px, 1.4 / 7.5 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 1 rows | 76 px, 5 / 8.3 % / 0.09 px | 1 | L first 5.0% > 1.1% ; R first 5.0% > 1.1% ; opacity 1.00 in 60 Hz at summary f181; summary fade has 0 samples |
| fold-w-pill-fine | 1440-fine-light | 1 | 76 px, 1.6 / 7 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 76 px, 5 / 7 % / 0.11 px | 1 | L first 5.0% > 1.7% ; R first 5.0% > 1.7% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-pill-fine | 1440-fine-light | 2 | 76 px, 1.3 / 6.9 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 1 rows | 76 px, 5 / 7.7 % / 0.1 px | 1 | L first 5.0% > 2.1% ; R first 5.0% > 2.1% ; opacity 1.00 in 60 Hz at summary f180; summary fade has 0 samples |
| fold-w-pill-rm | 1440-fine-light-rm | 1 | 76 px, 100 / 100 % / 76 px | 0.24 | 0 | pass | 76 px, 100 / 100 % / 76 px | 1 | full fade 2 values over 7 ms; summary fade 2 values over 7 ms; seat#0 fade 2 values over 7 ms; seat#1 fade 2 values over 7 ms |
| fold-w-pill-rm | 1440-fine-light-rm | 2 | 76 px, 100 / 100 % / 76 px | 0.23 | 0 | pass | 76 px, 100 / 100 % / 76 px | 1 | full fade 2 values over 10 ms; summary fade 2 values over 10 ms; seat#0 fade 2 values over 10 ms; seat#1 fade 2 values over 10 ms |
| fold-w-rounded-coarse | 390-coarse-light | 1 | 56 px, 1.9 / 8.5 % / 0.06 px | 0.39 · blank 1@0.38 | 0 | pass | 78 px, 5 / 8.1 % / 0.09 px | 1 | L first 5.0% > 1.2% ; R first 5.0% > 1.2% ; opacity 1.00 in 60 Hz at full f15; full fade has 0 samples |
| fold-w-rounded-coarse | 390-coarse-light | 2 | 56 px, 1.3 / 7.1 % / 0.1 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px) | 78 px, 4.7 / 7.5 % / 0.01 px | 1 | L first 4.7% > 1.8% ; R first 4.7% > 1.8% ; opacity 1.00 in 60 Hz at summary f167; summary fade has 0 samples |
| fold-w-rounded-dark | 1440-fine-dark | 1 | 52 px, 1.8 / 7.8 % / 0.04 px | 0.38 · blank 1@0.37 | 0 | pass | 72 px, 5 / 7.4 % / 0.11 px | 1 | L first 5.0% > 2.2% ; R first 5.0% > 2.2% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-rounded-dark | 1440-fine-dark | 2 | 52 px, 1.4 / 8.3 % / 0.07 px | 0.37 · blank 1@0.37 | 0 | pass | 72 px, 4.7 / 7.9 % / 0.1 px | 1 | L first 4.7% > 1.6% ; R first 4.7% > 1.6% ; opacity 1.00 in 60 Hz at summary f179; summary fade has 0 samples |
| fold-w-rounded-fine | 1440-fine-light | 1 | 52 px, 1.4 / 7.5 % / 0.06 px | 0.36 · blank 1@0.37 | 0 | pass | 72 px, 5 / 8 % / 0.11 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at full f27; full fade has 0 samples |
| fold-w-rounded-fine | 1440-fine-light | 2 | 52 px, 1.4 / 7 % / 0.07 px | 0.39 · blank 1@0.37 | 0 | pass | 72 px, 4.7 / 7.7 % / 0.11 px | 1 | L first 4.7% > 1.6% ; R first 4.7% > 1.6% ; opacity 1.00 in 60 Hz at summary f179; summary fade has 0 samples |
| fold-w-rounded-rm | 1440-fine-light-rm | 1 | 52 px, 100 / 100 % / 52 px | 0.29 | 0 | pass | 72 px, 100 / 100 % / 72 px | 1 | full fade 2 values over 7 ms; summary fade 2 values over 7 ms; seat#0 fade 2 values over 7 ms; seat#1 fade 2 values over 7 ms |
| fold-w-rounded-rm | 1440-fine-light-rm | 2 | 52 px, 100 / 100 % / 52 px | 0.48 · blank 1@1 | 0 | pass | 72 px, 100 / 100 % / 72 px | 1 | full fade 2 values over 9 ms; summary fade 2 values over 9 ms; seat#0 fade 2 values over 9 ms; seat#1 fade 2 values over 9 ms |
| fold-w-std-necka-coarse | 390-coarse-light | 1 | 70 px, 2.6 / 72.7 % / 0.12 px | 1 · blank 1@0.72 | 0 | L 1 steps against travel (0.11 px); R first 2.6% > 1.6% ; R step 10.8% > 8.8% ; R step 11.5% > 7.8%  | 96.8 px, 0.8 / 8.4 % / 0.15 px | 1 | L first 5.0% > 1.9% ; not a capsule in 32 rows; opacity 1.00 in 60 Hz at full f8; full fade has 0 samples |
| fold-w-std-necka-coarse | 390-coarse-light | 2 | 70 px, 3.3 / 74.3 % / 0.11 px | 1 · blank 1@0.65 | 0 | L 1 steps against travel (0.11 px); R first 3.3% > 2.1% ; R step 9.3% > 8.0% ; R step 9.7% > 7.1%  | 12.5 px, 100 / 100 % / 12.52 px | 0 | R first 100.0% > 1.5% ; R step 100.0% > 7.9% ; R last 12.52 px (100.0%, f74); not a capsule in 3 rows |
| fold-w-std-necka-coarse | 390-coarse-light | 3 | – | – | – | – | 111.5 px, 15.6 / 15.6 % / 0.14 px | 1 | L first 5.0% > 1.7% ; R first 15.6% > 1.7% ; R step 15.6% > 8.4% ; not a capsule in 1 rows |
| fold-w-std-necka-coarse | 390-coarse-light | 4 | – | – | – | – | 2.2 px, 100 / 100 % / 2.18 px | 0 | L first 100.0% > 1.6% ; L step 100.0% > 8.1% ; L last 2.09 px (100.0%, f229); R first 100.0% > 1.6%  |
| fold-w-std-necka-dark | 1440-fine-dark | 1 | 133.5 px, 2 / 32.4 % / 0.12 px | 1 · blank 1@0.52 | 0 | L 3 steps against travel (0.21 px); R first 2.0% > 1.6% ; R step 7.5% > 6.8% ; R step 11.1% > 9.1%  | 160.5 px, 5 / 8.2 % / 0.22 px | 1 | L first 5.0% > 1.0% ; R first 5.0% > 1.0% ; opacity 1.00 in 60 Hz at full f26; full fade has 0 samples |
| fold-w-std-necka-dark | 1440-fine-dark | 2 | 133.5 px, 1.9 / 31.7 % / 0.1 px | 1 · blank 1@0.51 | 0 | L 2 steps against travel (0.14 px); R first 1.9% > 1.6% ; R step 10.0% > 9.6% ; R step 7.3% > 6.4%  | 160.5 px, 5 / 8.2 % / 0.2 px | 1 | L first 5.0% > 1.9% ; R first 5.0% > 1.9% ; opacity 1.00 in 60 Hz at summary f179; summary fade has 0 samples |
| fold-w-std-necka-fine | 1440-fine-light | 1 | 133.5 px, 2.8 / 32.3 % / 0.12 px | 1 · blank 1@0.55 | 0 | L 4 steps against travel (0.26 px); R first 2.8% > 2.2% ; R step 7.9% > 7.0% ; R step 11.3% > 9.2%  | 160.5 px, 5 / 7.8 % / 0.24 px | 1 | L first 5.0% > 1.8% ; R first 5.0% > 1.8% ; opacity 1.00 in 60 Hz at full f26; full fade has 0 samples |
| fold-w-std-necka-fine | 1440-fine-light | 2 | 133.5 px, 2.1 / 33 % / 0.11 px | 1 · blank 1@0.51 | 0 | L 2 steps against travel (0.16 px); R first 2.1% > 1.8% ; R step 8.4% > 8.1% ; R step 11.2% > 9.7%  | 160.5 px, 5 / 8.3 % / 0.25 px | 1 | L first 5.0% > 2.2% ; R first 5.0% > 2.2% ; opacity 1.00 in 60 Hz at summary f179; summary fade has 0 samples |
| fold-w-std-necka-rm | 1440-fine-light-rm | 1 | 133.5 px, 100 / 100 % / 133.5 px | 1 | 0 | pass | 160.5 px, 100 / 100 % / 160.5 px | 1 | full fade 2 values over 8 ms; summary fade 2 values over 8 ms; seat#0 fade 2 values over 8 ms; seat#1 fade 2 values over 8 ms |
| fold-w-std-necka-rm | 1440-fine-light-rm | 2 | 133.5 px, 100 / 100 % / 133.5 px | 0.2 | 0 | pass | 160.5 px, 100 / 100 % / 160.5 px | 1 | full fade 2 values over 8 ms; summary fade 2 values over 8 ms; seat#0 fade 2 values over 8 ms; seat#1 fade 2 values over 8 ms |
| fold-w-std-neckb-coarse | 390-coarse-light | 1 | 136 px, 1.1 / 7 % / 0.11 px | 1 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 54 rows; opacity 1.00 in 60 Hz at beside f8 | not run | – | – |
| fold-w-std-neckb-coarse | 390-coarse-light | 2 | 136 px, 1.4 / 8 % / 0.11 px | 1 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 1 rows; opacity 1.00 in 60 Hz at beside f200 | not run | – | – |
| fold-w-std-neckb-dark | 1440-fine-dark | 1 | 195.5 px, 1.4 / 7.4 % / 0.11 px | 1 · blank 1@0.36 | 0 | L 3 steps against travel (0.21 px); R 1 steps against travel (0.11 px); not a capsule in 56 rows; opacity 1.00 in 60 Hz at beside f27 | not run | – | – |
| fold-w-std-neckb-dark | 1440-fine-dark | 2 | 195.5 px, 1.4 / 7.5 % / 0.11 px | 1 · blank 1@0.36 | 0 | L 3 steps against travel (0.21 px); R 1 steps against travel (0.11 px); not a capsule in 1 rows; opacity 1.00 in 60 Hz at beside f221 | not run | – | – |
| fold-w-std-neckb-fine | 1440-fine-light | 1 | 195.5 px, 1 / 7.1 % / 0.11 px | 1 · blank 1@0.37 | 0 | L 3 steps against travel (0.21 px); R 1 steps against travel (0.11 px); not a capsule in 56 rows; opacity 1.00 in 60 Hz at beside f27 | not run | – | – |
| fold-w-std-neckb-fine | 1440-fine-light | 2 | 195.5 px, 1.4 / 7.4 % / 0.1 px | 1 · blank 1@0.37 | 0 | L 3 steps against travel (0.19 px); R 2 steps against travel (0.16 px); not a capsule in 1 rows; opacity 1.00 in 60 Hz at beside f223 | not run | – | – |
| fold-w-std-neckb-rm | 1440-fine-light-rm | 1 | 195.5 px, 100 / 100 % / 195.5 px | 1 | 0 | pass | not run | – | – |
| fold-w-std-neckb-rm | 1440-fine-light-rm | 2 | 195.5 px, 100 / 100 % / 195.5 px | 0.24 | 0 | pass | not run | – | – |
| fold-w-wide-coarse | 390-coarse-light | 1 | 146 px, 1.7 / 7.6 % / 0.1 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 55 rows | 146 px, 5 / 13.9 % / 0.26 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at full f8; full fade has 0 samples |
| fold-w-wide-coarse | 390-coarse-light | 2 | 146 px, 1.7 / 7.2 % / 0.1 px | 0.4 · blank 1@0.38 | 0 | L 2 steps against travel (0.14 px); R 1 steps against travel (0.10 px); not a capsule in 1 rows; opacity 0.40 in 60 Hz at full f154 | 146 px, 5 / 12 % / 0.2 px | 1 | L first 5.0% > 1.4% ; R first 5.0% > 1.4% ; opacity 1.00 in 60 Hz at summary f162; summary fade has 0 samples |
| fold-w-wide-dark | 1440-fine-dark | 1 | 144 px, 1.4 / 7.3 % / 0.1 px | 0.37 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 55 rows | 144 px, 5 / 7.8 % / 0.21 px | 1 | L first 5.0% > 1.8% ; R first 5.0% > 1.8% ; opacity 1.00 in 60 Hz at full f26; full fade has 0 samples |
| fold-w-wide-dark | 1440-fine-dark | 2 | 144 px, 1.4 / 7.8 % / 0.1 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 1 rows | 144 px, 5 / 8 % / 0.15 px | 1 | L first 5.0% > 1.1% ; R first 5.0% > 1.1% ; opacity 1.00 in 60 Hz at summary f178; summary fade has 0 samples |
| fold-w-wide-fine | 1440-fine-light | 1 | 144 px, 1.1 / 7.4 % / 0.1 px | 0.38 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 55 rows | 144 px, 5 / 7.6 % / 0.17 px | 1 | L first 5.0% > 1.3% ; R first 5.0% > 1.3% ; opacity 1.00 in 60 Hz at full f26; full fade has 0 samples |
| fold-w-wide-fine | 1440-fine-light | 2 | 144 px, 1.4 / 7.6 % / 0.1 px | 0.4 · blank 1@0.36 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 1 rows | 144 px, 5 / 12 % / 0.19 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at summary f177; summary fade has 0 samples |
| fold-w-wide-rm | 1440-fine-light-rm | 1 | 144 px, 100 / 100 % / 144 px | 0.25 | 0 | pass | 144 px, 100 / 100 % / 144 px | 1 | full fade 2 values over 8 ms; summary fade 2 values over 8 ms; seat#0 fade 2 values over 8 ms; seat#1 fade 2 values over 8 ms |
| fold-w-wide-rm | 1440-fine-light-rm | 2 | 144 px, 100 / 100 % / 144 px | 0.24 | 0 | pass | 144 px, 100 / 100 % / 144 px | 1 | full fade 2 values over 8 ms; summary fade 2 values over 8 ms; seat#0 fade 2 values over 8 ms; seat#1 fade 2 values over 8 ms |

### Mid-fold reversal at 30, 50 and 80 %

| scenario | cell | seg | prototype: travel, first / max % / last | op60 | out | prototype verdict | RED: travel, first / max % / last | RED op60 | RED verdict |
|---|---|---|---|---|---|---|---|---|---|
| rev-fold-w-pill-30 | 1440-fine-light | 1 | 76 px, 1.1 / 7.8 % / 0.11 px | 0.38 · blank 1@0.36 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 76 px, 5 / 7.2 % / 0.1 px | 1 | L first 5.0% > 1.9% ; R first 5.0% > 1.9% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |
| rev-fold-w-pill-30 | 1440-fine-light | 2 | 35.1 px, 1.2 / 8.3 % / 0.04 px | 0.39 | 0 | L turns 3 frames after the reversal; R turns 3 frames after the reversal; not a capsule in 37 rows | 61.3 px, 5 / 7.1 % / 0.09 px | 1 | L first 5.0% > 1.4% ; L turns 9 frames after the reversal; R first 5.0% > 1.4% ; R turns 9 frames after the reversal |
| rev-fold-w-pill-50 | 1440-fine-light | 1 | 76 px, 1.4 / 7.8 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 76 px, 5 / 8.5 % / 0.1 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |
| rev-fold-w-pill-50 | 1440-fine-light | 2 | 43.3 px, 1.3 / 8.2 % / 0.09 px | 0.37 | 0 | not a capsule in 37 rows | 66.8 px, 5 / 8.2 % / 0.06 px | 1 | L first 5.0% > 1.6% ; L turns 8 frames after the reversal; R first 5.0% > 1.6% ; R turns 8 frames after the reversal |
| rev-fold-w-pill-80 | 1440-fine-light | 1 | 76 px, 1.4 / 7.9 % / 0.11 px | 0.38 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 76 px, 5 / 8 % / 0.09 px | 1 | L first 5.0% > 1.2% ; R first 5.0% > 1.2% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |
| rev-fold-w-pill-80 | 1440-fine-light | 2 | 64 px, 1.2 / 7.4 % / 0.1 px | 0.4 · blank 1@null | 0 | not a capsule in 50 rows; opacity 0.40 in 60 Hz at full f165 | 73.5 px, 5 / 8.2 % / 0.03 px | 1 | L first 5.0% > 1.6% ; L turns 8 frames after the reversal; R first 5.0% > 1.6% ; R turns 8 frames after the reversal |
| rev-fold-w-std-30 | 1440-fine-light | 1 | 42.2 px, 7 / 33.9 % / 3.65 px | 1 | 0 | L first 3.2% > 1.9% ; L step 11.5% > 8.9% ; L step 9.8% > 6.4% ; L step 15.8% > 9.5%  | 160.5 px, 5 / 7.6 % / 0.21 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |
| rev-fold-w-std-30 | 1440-fine-light | 2 | 91.8 px, 8.7 / 115.3 % / 0.12 px | 0.38 · blank 2@0.57 | 0 | L first 53.3% > 4.0% ; L step 12.0% > 8.0% ; L step 8.1% > 7.6% ; L step 7.8% > 7.7%  | 136.7 px, 5 / 7.7 % / 0.16 px | 1 | L first 5.0% > 2.0% ; L turns 9 frames after the reversal; R first 5.0% > 2.0% ; R turns 9 frames after the reversal |
| rev-fold-w-std-50 | 1440-fine-light | 1 | 133.5 px, 2 / 31.4 % / 0.11 px | 1 · blank 1@0.54 | 0 | L 3 steps against travel (0.19 px); R first 2.0% > 1.6% ; R step 7.9% > 7.1% ; R step 11.1% > 9.1%  | 160.5 px, 5 / 7 % / 0.22 px | 1 | L first 5.0% > 1.9% ; R first 5.0% > 1.9% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |
| rev-fold-w-std-50 | 1440-fine-light | 2 | 66.9 px, 3.4 / 72.5 % / 48.46 px | 0.25 | 0 | L first 3.4% > 1.4% ; L step 9.0% > 7.6% ; L step 15.1% > 8.7% ; L last 51.64 px (72.5%, f171) | 144.1 px, 5 / 7.2 % / 0.1 px | 1 | L first 5.0% > 1.6% ; L turns 8 frames after the reversal; R first 5.0% > 1.6% ; R turns 8 frames after the reversal |
| rev-fold-w-std-50 | 1440-fine-light | 3 | 89.3 px, 36.3 / 36.3 % / 0.12 px | 0.38 · blank 1@-2.63 | 0 | L first 26.4% > 4.0% ; R first 36.3% > 4.0% ; R step 9.3% > 8.0% ; R step 31.4% > 9.5%  | – | – | – |
| rev-fold-w-std-80 | 1440-fine-light | 1 | 133.5 px, 1.8 / 33.6 % / 0.12 px | 1 · blank 1@0.53 | 0 | L 3 steps against travel (0.21 px); R first 1.8% > 1.4% ; R step 7.2% > 6.5% ; R step 11.7% > 9.7%  | 160.5 px, 5 / 7.7 % / 0.23 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at full f24; full fade has 0 samples |
| rev-fold-w-std-80 | 1440-fine-light | 2 | 118.1 px, 2.1 / 34 % / 0.11 px | 0.41 · blank 1@null | 0 | R first 2.1% > 1.7% ; R step 7.5% > 7.1% ; R step 10.6% > 9.2% ; R step 7.8% > 6.5%  | 160 px, 5 / 8.1 % / 0.22 px | 1 | L first 5.0% > 1.7% ; L turns 9 frames after the reversal; R first 5.0% > 1.7% ; R turns 9 frames after the reversal |
| rev-unfold-w-pill-30 | 1440-fine-light | 1 | 43 px, 1.8 / 13.6 % / 0.03 px | 0.4 | 0 | L first 1.9% > 1.2% ; L step 8.7% > 7.7% ; L step 10.9% > 8.1% ; L step 11.8% > 8.0%  | 42.8 px, 8.8 / 14.3 % / 0.03 px | 1 | L first 8.8% > 1.6% ; L step 8.8% > 8.0% ; L step 7.4% > 6.6% ; L step 12.8% > 9.5%  |
| rev-unfold-w-pill-50 | 1440-fine-light | 1 | 64 px, 1.2 / 8.8 % / 0.1 px | 0.39 · blank 1@null | 0 | L first 1.2% > 1.2% ; L step 6.9% > 6.7% ; L step 8.1% > 7.9% ; L step 8.6% > 8.6%  | 63.1 px, 6 / 9.3 % / 0.08 px | 1 | L first 6.0% > 1.5% ; L step 9.3% > 9.3% ; L step 8.3% > 8.0% ; L step 8.4% > 8.1%  |
| rev-unfold-w-pill-80 | 1440-fine-light | 1 | 76 px, 1.4 / 6.9 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 76 px, 5 / 7.5 % / 0.12 px | 1 | L first 5.0% > 1.8% ; R first 5.0% > 1.8% ; opacity 1.00 in 60 Hz at full f24; full fade has 0 samples |
| rev-unfold-w-pill-80 | 1440-fine-light | 2 | 76.2 px, 1.9 / 8 % / 0.1 px | 0.38 · blank 1@0.37 | 0 | not a capsule in 1 rows | 76 px, 5 / 7.4 % / 0.11 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at summary f259; summary fade has 0 samples |
| rev-unfold-w-std-30 | 1440-fine-light | 1 | 78.9 px, 4.9 / 16.7 % / 0.1 px | 1 · blank 0@null | 0 | L first 4.9% > 2.3% ; L step 9.4% > 7.7% ; L step 13.3% > 8.1% ; L step 15.1% > 7.8%  | 73.9 px, 10.8 / 17.9 % / 0.08 px | 1 | L first 10.8% > 1.9% ; L step 10.8% > 8.7% ; L step 9.9% > 7.2% ; L step 15.1% > 9.1%  |
| rev-unfold-w-std-50 | 1440-fine-light | 1 | 93.8 px, 2.9 / 49.8 % / 0.1 px | 1 · blank 1@null | 0 | L first 2.0% > 1.6% ; L step 10.1% > 9.3% ; L step 9.0% > 7.6% ; L step 10.0% > 8.2%  | 106.7 px, 7.5 / 11.2 % / 0.13 px | 1 | L first 7.5% > 1.6% ; L step 8.2% > 7.2% ; L step 11.2% > 8.9% ; L step 10.3% > 7.9%  |
| rev-unfold-w-std-80 | 1440-fine-light | 1 | 128.2 px, 1.5 / 35 % / 0.1 px | 1 · blank 1@null | 0 | R first 1.5% > 1.1% ; R step 8.3% > 7.1% ; R step 11.7% > 9.2% ; R step 9.2% > 6.9%  | 153.8 px, 5.2 / 8.3 % / 0.08 px | 1 | L first 5.2% > 1.6% ; R first 5.2% > 1.6% ; opacity 1.00 in 60 Hz at full f24; box-shadow changes shape in 2 rows |

### Layer swap

| scenario | cell | seg | prototype: travel, first / max % / last | op60 | out | prototype verdict | RED: travel, first / max % / last | RED op60 | RED verdict |
|---|---|---|---|---|---|---|---|---|---|
| swap-layers-coarse | 390-coarse-light | 1 | 96.1 px, 1.3 / 7.6 % / 0.1 px · cross 1.4/7.7% | 0.38 · blank 1@0.36 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 50 rows | 96 px, 5 / 8 % / 0.15 px · cross 100/100% | 1 | L first 5.0% > 1.4% ; R first 5.0% > 1.4% ; T first 100.0% > 1.4% ; T step 100.0% > 7.6%  |
| swap-layers-coarse | 390-coarse-light | 2 | 4.1 px, 1.7 / 30 % / 1.24 px | 0.39 · blank 1@0.52 | 0 | L first 1.5% > 1.2% ; L step 9.0% > 8.2% ; L step 8.7% > 7.5% ; L step 10.2% > 8.7%  | 5.8 px, 100 / 100 % / 5.77 px | 0.1 | L first 100.0% > 1.5% ; L step 100.0% > 7.9% ; L last 5.76 px (100.0%, f162); R first 100.0% > 1.5%  |
| swap-layers-coarse | 390-coarse-light | 3 | 2.9 px, 43.1 / 43.1 % / 0.1 px | 0 | 0 | L first 42.9% > 4.0% ; L step 8.4% > 8.1% ; L last 0.09 px (3.1%, f169); R first 43.1% > 4.0%  | – | – | – |
| swap-layers-dark | 1440-fine-dark | 1 | 101.8 px, 2 / 7 % / 0.11 px · cross 2/7% | 0.39 · blank 1@0.38 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 51 rows | 102 px, 5 / 7 % / 0.17 px · cross 100/100% | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; T first 100.0% > 1.6% ; T step 100.0% > 8.0%  |
| swap-layers-dark | 1440-fine-dark | 2 | 5.8 px, 1.2 / 8.1 % / 0.11 px | 0.39 · blank 1@0.37 | 0 | R first 1.2% > 1.2% ; not a capsule in 29 rows | 5.8 px, 100 / 100 % / 5.77 px | 0.1 | L first 100.0% > 2.0% ; L step 100.0% > 9.0% ; L last 5.76 px (100.0%, f178); R first 100.0% > 2.0%  |
| swap-layers-fine | 1440-fine-light | 1 | 101.8 px, 1.3 / 8.1 % / 0.11 px · cross 1.3/8.2% | 0.38 · blank 1@0.37 | 0 | L 1 steps against travel (0.11 px); R 1 steps against travel (0.11 px); not a capsule in 50 rows | 102 px, 5 / 7.6 % / 0.02 px · cross 100/100% | 1 | L first 5.0% > 2.3% ; R first 5.0% > 2.3% ; T first 100.0% > 2.3% ; T step 100.0% > 9.8%  |
| swap-layers-fine | 1440-fine-light | 2 | 5.8 px, 1.9 / 7.6 % / 0.09 px | 0.38 · blank 1@0.38 | 0 | not a capsule in 29 rows | 5.8 px, 100 / 100 % / 5.77 px | 0.11 | L first 100.0% > 1.2% ; L step 100.0% > 6.9% ; L last 5.76 px (100.0%, f180); R first 100.0% > 1.2%  |
| swap-layers-rm | 1440-fine-light-rm | 1 | 101.8 px, 100 / 100 % / 101.84 px · cross 100/100% | 0.23 | 0 | pass | 101.8 px, 100 / 100 % / 101.84 px · cross 100/100% | 1 | full fade 2 values over 9 ms; summary fade 2 values over 9 ms; face#0 fade 2 values over 9 ms |
| swap-layers-rm | 1440-fine-light-rm | 2 | 5.8 px, 100 / 100 % / 5.77 px | 0.23 | 0 | pass | 5.8 px, 100 / 100 % / 5.77 px | 1 | face#0 fade 2 values over 9 ms; face#1 fade 2 values over 9 ms |
| swap-xf-coarse | 390-coarse-light | 1 | 17.7 px, 1.1 / 7 % / 0.08 px | 0.4 · blank 1@null | 0 | not a capsule in 33 rows | 6.1 px, 100 / 100 % / 6.12 px | 0.06 | L first 100.0% > 1.8% ; L step 100.0% > 8.5% ; L last 6.11 px (100.0%, f92); R first 100.0% > 1.8%  |
| swap-xf-coarse | 390-coarse-light | 2 | 6.1 px, 2 / 7.4 % / 0.1 px · cross 2/7.6% | 0.39 · blank 1@0.38 | 0 | not a capsule in 35 rows | 6.1 px, 66.7 / 66.7 % / 2.04 px | 0.29 | L first 66.8% > 1.6% ; L step 66.8% > 8.0% ; L step 33.2% > 8.2% ; L last 2.03 px (33.2%, f187) |
| swap-xf-coarse | 390-coarse-light | 3 | 6.1 px, 1 / 4.6 % / 0.12 px · cross 1.6/8.7% | 0.39 · blank 1@0.25 | 0 | L last 0.13 px (2.1%, f220); T first 1.7% > 1.5% ; T step 8.4% > 8.2% ; T step 8.6% > 8.0%  | – | – | – |
| swap-xf-dark | 1440-fine-dark | 1 | 17.8 px, 1.4 / 7 % / 0.1 px | 0.39 · blank 1@null | 0 | not a capsule in 34 rows | 7.2 px, 100 / 100 % / 7.18 px | 0.05 | L first 100.0% > 2.0% ; L step 100.0% > 9.1% ; L last 7.17 px (100.0%, f86); R first 100.0% > 2.0%  |
| swap-xf-dark | 1440-fine-dark | 2 | 7.2 px, 1.5 / 8.5 % / 0.13 px · cross 1.5/8.3% | 0.38 · blank 1@0.38 | 0 | not a capsule in 35 rows | 7.2 px, 66.7 / 66.7 % / 2.39 px | 0.37 | L first 66.7% > 1.3% ; L step 66.7% > 7.2% ; L step 33.3% > 6.7% ; L last 2.39 px (33.3%, f178) |
| swap-xf-dark | 1440-fine-dark | 3 | 7.2 px, 1.3 / 5.7 % / 0.11 px · cross 2/11.9% | 0.37 · blank 1@0.25 | 0 | T first 2.0% > 1.6% ; T step 9.1% > 8.6% ; T step 10.1% > 8.6% ; T step 8.3% > 6.8%  | – | – | – |
| swap-xf-fine | 1440-fine-light | 1 | 17.8 px, 1 / 7.4 % / 0.1 px | 0.39 · blank 1@null | 0 | not a capsule in 33 rows | 7.2 px, 100 / 100 % / 7.18 px | 0.09 | L first 100.0% > 2.3% ; L step 100.0% > 9.8% ; L last 7.17 px (100.0%, f87); R first 100.0% > 2.3%  |
| swap-xf-fine | 1440-fine-light | 2 | 7.2 px, 1.9 / 7.9 % / 0.13 px · cross 2/8% | 0.38 · blank 1@0.37 | 0 | not a capsule in 35 rows | 7.2 px, 66.7 / 66.7 % / 2.39 px | 0.38 | L first 66.7% > 1.3% ; L step 66.7% > 7.1% ; L step 33.3% > 8.1% ; L last 2.39 px (33.3%, f180) |
| swap-xf-fine | 1440-fine-light | 3 | 7.2 px, 1.3 / 5 % / 0.11 px · cross 1.9/10.2% | 0.39 · blank 1@0.24 | 0 | T first 1.9% > 1.6% ; T step 9.5% > 9.2% ; T step 8.3% > 7.4% ; T step 10.2% > 8.6%  | – | – | – |
| swap-xf-rm | 1440-fine-light-rm | 1 | 17.8 px, 100 / 100 % / 17.75 px | 0.49 · blank 1@null | 0 | pass | 7.2 px, 100 / 100 % / 7.18 px | 1 | face#1 fade 2 values over 9 ms; face#2 fade 2 values over 9 ms |
| swap-xf-rm | 1440-fine-light-rm | 2 | 7.2 px, 100 / 100 % / 7.18 px · cross 100/100% | 0.48 · blank 1@1 | 0 | pass | 7.2 px, 66.7 / 66.7 % / 2.39 px | 1 | geometry moves on 2 frames; face#0 fade 2 values over 8 ms; face#2 fade 2 values over 8 ms |
| swap-xf-rm | 1440-fine-light-rm | 3 | 7.2 px, 66.7 / 66.7 % / 2.39 px · cross 100/100% | 0.49 · blank 1@0.67 | 0 | geometry moves on 2 frames | – | – | – |

### Overlay closing with the fold

The prototype has no segment 2: the dock is held while the Popover is open, and the recording ended inside the linger.

| scenario | cell | seg | prototype: travel, first / max % / last | op60 | out | prototype verdict | RED: travel, first / max % / last | RED op60 | RED verdict |
|---|---|---|---|---|---|---|---|---|---|
| overlay-dark | 1440-fine-dark | 1 | 80 px, 1.9 / 7.5 % / 0.1 px | 0.39 · blank 1@0.38 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 51 rows | 78 px, 5 / 8.3 % / 0.08 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at full f24; full fade has 0 samples |
| overlay-dark | 1440-fine-dark | 2 | – | – | – | – | 78 px, 5 / 8.1 % / 0.13 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at summary f284; summary fade has 0 samples |
| overlay-fine | 1440-fine-light | 1 | 80 px, 1.4 / 7.4 % / 0.1 px | 0.38 · blank 1@0.37 | 0 | L 1 steps against travel (0.09 px); R 1 steps against travel (0.10 px); not a capsule in 51 rows | 78 px, 5 / 7.5 % / 0.1 px | 1 | L first 5.0% > 1.6% ; R first 5.0% > 1.6% ; opacity 1.00 in 60 Hz at full f26; full fade has 0 samples |
| overlay-fine | 1440-fine-light | 2 | – | – | – | – | 78 px, 5 / 7.4 % / 0.11 px | 1 | L first 5.0% > 2.2% ; R first 5.0% > 2.2% ; opacity 1.00 in 60 Hz at summary f287; summary fade has 0 samples |

### Labelled seat hover and sweep (geometry of the plate must not move)

| scenario | cell | seg | prototype: travel, first / max % / last | op60 | out | prototype verdict | RED: travel, first / max % / last | RED op60 | RED verdict |
|---|---|---|---|---|---|---|---|---|---|
| label-a-dark | 1440-fine-dark | 1 | 133.5 px, 2.7 / 31.6 % / 0.12 px | 1 · blank 1@0.55 | 0 | L 3 steps against travel (0.21 px); R first 2.7% > 2.1% ; R step 8.6% > 7.6% ; R step 9.9% > 8.1%  | 160.5 px, 5 / 7.1 % / 0.2 px | 1 | L first 5.0% > 1.9% ; R first 5.0% > 1.9% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |
| label-a-fine | 1440-fine-light | 1 | 133.5 px, 1.8 / 32.9 % / 0.12 px | 1 · blank 1@0.53 | 0 | L 3 steps against travel (0.21 px); R first 1.8% > 1.4% ; R step 9.7% > 8.8% ; R step 10.6% > 8.7%  | 160.5 px, 5 / 8.4 % / 0.22 px | 1 | L first 5.0% > 2.0% ; R first 5.0% > 2.0% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |
| label-a-fine390 | 390-fine-light | 1 | 78 px, 1.8 / 60.2 % / 0.12 px | 1 · blank 1@0.65 | 0 | L 1 steps against travel (0.11 px); R first 1.8% > 1.1% ; R step 9.9% > 8.7% ; R step 8.9% > 6.5%  | 102.3 px, 2 / 7.8 % / 0.16 px | 1 | L first 5.0% > 1.2% ; R first 2.0% > 1.2% ; not a capsule in 32 rows; opacity 1.00 in 60 Hz at full f22 |
| label-a-fine390 | 390-fine-light | 2 | – | – | – | – | 9.5 px, 100 / 100 % / 9.51 px | 0 | R first 100.0% > 1.6% ; R step 100.0% > 8.1% ; R last 9.51 px (100.0%, f88); not a capsule in 3 rows |
| label-b-dark | 1440-fine-dark | 1 | 133.5 px, 1.9 / 31.2 % / 0.11 px | 1 · blank 1@0.54 | 0 | L 3 steps against travel (0.19 px); R first 1.9% > 1.5% ; R step 8.3% > 7.6% ; R step 9.3% > 7.7%  | not run | – | – |
| label-b-fine | 1440-fine-light | 1 | 133.5 px, 2 / 31.4 % / 0.11 px | 1 · blank 1@0.54 | 0 | L 3 steps against travel (0.19 px); R first 2.0% > 1.6% ; R step 7.9% > 7.2% ; R step 10.4% > 8.7%  | not run | – | – |
| label-b-fine390 | 390-fine-light | 1 | 78 px, 1.9 / 62 % / 0.11 px | 1 · blank 1@0.64 | 0 | L 1 steps against travel (0.09 px); R first 1.9% > 1.2% ; R step 9.0% > 8.1% ; R step 10.0% > 7.5%  | not run | – | – |
| scenario | cell | seg | prototype: travel, first / max % / last | op60 | out | prototype verdict | RED: travel, first / max % / last | RED op60 | RED verdict |
|---|---|---|---|---|---|---|---|---|---|
| sweep-fine | 1440-fine-light | 1 | 133.5 px, 1.5 / 33.3 % / 0.11 px | 1 · blank 1@0.53 | 0 | L 3 steps against travel (0.19 px); R first 1.5% > 1.2% ; R step 9.5% > 8.6% ; R step 9.0% > 7.4%  | 160.5 px, 5 / 7.7 % / 0.02 px | 1 | L first 5.0% > 1.5% ; R first 5.0% > 1.5% ; opacity 1.00 in 60 Hz at full f25; full fade has 0 samples |

## Defects found, in order of weight

1. The fission seat's content (`.dock-beside`) still cuts in one frame. The beside exchange with `place = false` does not reach the faces the probe reads.
2. Neck A's hand-over: one frame equal to the seat's width on the main plate, and a 51.6 px snap on a reversal at 50 %. Neck B does not have the hand-over.
3. R-6's p runs at twice the spring rate, so its steps exceed the any-frame bound by about 30 %.
4. The run's cut-cap animations own the plate's corners.
5. `--dock-linger-max` does not cap the linger (12 s visit gives a 12 s linger).
6. One layout per animation frame from the plate's inset writes.
7. The dock preset overshoots by 0.1 px, which the "no reversal" rule forbids.
8. One row with no face at f = 0.35, as the R-3 windows are written.
