# 10.1.5 — critique, round 9 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `a7e3d66ab` (fix round 8:
`8613021c5`, the rebind `a749a0e4b`, the records `0556d4406` and `a7e3d66ab`; the round-8 note's
O-182 commit `9aaf0a79c` and fix 7's `870411576`/`2657cd274` under it). I read every commit over
`v10.1.4`, `critique-8.md`, `fix-8.md`, every `inbound-*.md` and every orchestrator note, and the
fix round's `src` diff against `3592aeb0d` (`dockMorphMeasure.ts` `publishYield` and `release`,
`run.css` THE VERTICAL RESERVE YIELDS TOO).

Every run went through `guarded`: g7 heavy, Chromium (`chromium-headless-new`) in the browser
pool, Playwright WebKit 2287 under `--exclusive webkit`. The guard warned the zone leak ARMED on
every admission (by the owner's 2026-11-03 order it does not hold runs) and refused none.

## Probes

- **The branch's own spec**, `release-10-1-5.spec.ts` (86 cells, `n1` and `m5` included), both
  engines (`critic-9/branch-{ch,wk}.log`).
- **g6** release-10-1-4 and release-10-1-3, both engines. **g7** on the committed tip.
- **Round 9's own cells**, `tests-visual/release-10-1-5-critic-9.spec.ts`, both pointers, both
  engines. Rows bank to `critic-9/probe/<arm>/<project>/`. Every cell traces each frame (`rAF`)
  for the run's padding, `data-run-fits`, S1 and the last seat's edges, the scroll and the plate's
  corners, with its actions scheduled inside the page.
  - **c9a** N1's band: a vertical dock of six icon seats, `collapse="closed"`, stages 308 to 356 in
    4 px steps. Expand, rest, collapse; then an expand reversed at 90 ms and again at 200 ms.
  - **c9b** a held reading gone stale: the port crosses the fit edge while the dock is collapsed,
    then it expands (vertical by the stage's block size 600 ↔ 300 and 600 ↔ 340; horizontal by
    the dock's `max-inline-size` none ↔ 220).
  - **c9c** the port crosses the fit edge mid-expand (at 110 ms), and again at rest expanded.
  - **c9d** a horizontal fitting dock's morph edges at 1440/844 (fine) and 390/320 (coarse).
  - **c9e** the host clamps the dock mid-expand (at 110 ms and 300 ms): an eight-seat dock to
    220 px, a four-seat dock to 200 px, a vertical stage into the yield band. The frames around
    the settle are banked raw. Run on three arms (`scripts/c9e-arms-critic-9.sh`): the branch,
    v10.1.4 (the critic-7-v1014 harness) and the round-8 tip's dock `src` (`3592aeb0d`
    `dockMorphMeasure.ts` and `run.css`, checked out and restored after).
- **c9f** a layered dock's first expand from a closed mount, 8 repeats at 1440 and 390 per
  pointer, on the same three arms in WebKit and on the branch in Chromium.
- **Critique 8's cells re-run on the tip**: `critic-9b.spec.ts` (critic-8's c8a-c8h, output
  moved to `critic-9/c8cells/`) and `critic-9c.spec.ts` (round 7's cells, `critic-9/r7cells/`).
- **The 10.1.3 D-1 bottom-anchored ancestor-zoom cell**, repeated in WebKit on the branch and on
  v10.1.4's `src` (`scripts/d1-ab-critic-9.sh`), to read fix 8's "pre-existing" against the
  release it patches.
- Drivers: `scripts/gates-critic-9.sh`, `scripts/chain-critic-9.sh`,
  `scripts/webkit-all-critic-9.sh`, `scripts/webkit-2-critic-9.sh`, `scripts/arms-critic-9.sh`.
  Config `tests-visual/release-10-1-5-critic-9.config.ts`. Run log `critic-9/runs.txt`.

| run | engine | result |
|---|---|---|
| g7 (`critic-9/g7/`) | node | typecheck 0, build 0, demo:dist:build 0, vitest 247/247 files (2397 passed, 10 expected fail, 1 skip), verify:package terminal CLEAN at 10.1.5 (ratchet datum 2952772 holds) |
| `release-10-1-5.spec.ts` | Chromium / WebKit 2287 | 86/86 / 86/86 |
| g6 release-10-1-4 | Chromium / WebKit | 23/23 / 15 + 8 skips (`page.pdf`) |
| g6 release-10-1-3 | Chromium / WebKit | 60/60 / 58 + 2 skips (CDP swipe); D-1 green in both |
| c9 cells (c9a-c9d), branch | Chromium / WebKit | 8/8 / 8/8, all banked |
| c9e, three arms | Chromium / WebKit | 2/2 per arm, all banked |
| critique 8's cells on the tip | Chromium / WebKit | 17/17 / 17/17 |
| round 7's cells on the tip | Chromium / WebKit | 22 + 1 skip / 22 + 1 skip |
| D-1 A/B (8, then 16 repeats per arm) | WebKit | branch 46/48 (two 2.02 px steps against the bound of 2); v10.1.4 24/24 |
| c9b/c9c, three arms | WebKit | 4/4 per arm, banked (`branch2`, `v1014`, `tip3592`) |
| c9f, three arms (16 first expands per pointer per arm) | Chromium branch / WebKit | 2/2 / 2/2 per arm, banked |

## Verdict

Fix round 8's cures hold where they were aimed, in both engines. N1 is cured: across the whole
fit band, on both pointers, no seat steps at an expand's settle or a collapse's start (≤ 0.02 px),
and the run's padding is one value through a double reversal. The m5 witness is GREEN in WebKit
(86/86), and `fix-8.md` names `9aaf0a79c` and its `--shadow-color` move. The O-182 halo, M1, M2,
M4 and the round-7 inbound rows read the same on the tip as critique 8 read them. g6 and g7 are
GREEN.

The branch is **not ready to tag**. P1 blocks the tag. P2 and P4 are low, and I list them so the
fix seat can take them or ask for a ruling:
- **P1** (the N1 cure introduced it): a fitting horizontal dock that its host clamps while it
  expands steps every seat 9 to 10 px, and snaps its trailing corners from round to cut, on the
  frame the morph settles. Both engines. Only the branch steps (v10.1.4 and the round-8 tip step
  0 px).
- **P2** (low; the N1 cure left it as it was) is the vertical form of the same case: a 4 px step
  at the settle when the host moves a vertical dock into the yield band mid-expand. It is new in
  10.1.5 (fix 7's yield), not fix 8's.
- **P4** (low, intermittent, WebKit only, attribution open): a layered dock's first expand from a
  closed mount rests at the narrow layer's width, with `data-run-fits` set on a run that hides
  most of its seats. It happened twice in about 80 such expands on 10.1.5 code, never on v10.1.4
  (40) and never in Chromium.

## Defects (reproduced)

### P1: a horizontal dock clamped by its host mid-expand steps 9-10 px at the settle (introduced by fix 8; low-medium; both engines)

`publishYield` now returns while `[data-morphing]` is set, on both axes (`dockMorphMeasure.ts`
`publishYield`'s first line). Fix 8 meant the hold for the vertical yield (N1), but
`data-run-fits` is also the horizontal run's yield (`--dock-run-yield`, THE RESERVE YIELDS) and
the cut cap's gate. So when the port changes during a morph, the horizontal flag keeps the arm's
reading until `release` re-reads it at the settle, and the reserve boxes and the cut cap both
change on that one frame.

- **c9e `h4-to-200`** (`critic-9/probe/<arm>/<project>/c9e-<pointer>.json`): four seats
  (`tab:Home,icon,icon,icon`), `collapse="closed"`, `expand()`, then the dock's
  `max-inline-size` set to 200 px at 110 ms or at 300 ms.
  - Branch, Chromium, fine: the last morph frame has `fits` true, S1 at 622, `sw 238`, corners
    `28px 28px 28px 28px`. The next frame (the settle) has `fits` false, S1 at 632, `sw 258`,
    corners `28px 16px 16px 28px`. Every seat moves 10 px in one frame and the trailing corners
    cut. Coarse: 9 px. WebKit 2287: 10 px fine, 9 px coarse. Both clamp times.
  - Through the morph's second half the run overflows (`sw 238 > cw 196`) with the held flag
    still saying it fits, so the yield is applied and the cap is off on a run that hides a seat.
  - **v10.1.4:** 0 px at the settle, both engines, both pointers.
  - **Round-8 tip (`3592aeb0d` dock `src`):** 0 px at the settle, both engines. Its flag flips
    mid-morph, at the frame the clamp lands (`[123,0,"m"]` in the flag trace), where the morph's
    own motion carries the change.
  - `h-to-220` (eight seats, Chromium fine) steps the same 10 px. In WebKit its outcome mixes
    with P3's re-scroll (11 px fine at 110 ms).
- **When it happens:** a host that changes the dock's inline room while the dock expands: a phone
  rotating, a split view or sidebar opening, a container query or a late font load that narrows
  the dock's host. O-166 says the expand must not jump, and the flag's own docblock says the
  flag is "one fact" with `scrollWidth = clientWidth`. That holds at rest, but not through this
  morph.
- **Cure direction:** hold the reading only where N1 needs it. Either the hold is the vertical
  axis's alone, so the horizontal run re-reads on an observer hit mid-morph as it did at
  `3592aeb0d`. Or the hold covers every morph edge but not a real change of the port: an observer
  hit during a morph re-reads when the port or the seats changed size, and only the arm-time
  re-entry is skipped. **Gate:** c9e `h4-to-200` and `h-to-220`, both clamp times, both pointers
  and both engines, with no S1 step over 0.5 px between the last morph frame and the settle. N1's
  `n1` and c9a stay GREEN.

### P2: the vertical form, a host that moves a vertical dock into the yield band mid-expand (introduced by fix 7, not cured by fix 8; low; both engines)

- **c9e `v-to-320` (fine) / `v-to-344` (coarse)**: six icon seats at stage 600, `expand()`, the
  stage set to the band at 110 or 300 ms. The run holds `pad 7px` through the morph and drops to
  `3px` at the settle. S1 steps 23.98 → 20 (3.98 px) and the last seat steps 303.98 → 300, on
  the branch and on `3592aeb0d`, in both engines. v10.1.4 steps 0.02 px. One WebKit coarse
  v10.1.4 row (110 ms) steps 7.98 px with `st 8`: that is P3's re-scroll, not a yield.
- This is N1's mechanism through the other door. The reading is held, so a port change mid-morph
  lands at the settle. It is low because it needs a host resize during the ~550 ms expand of a
  vertical dock in the last 7 px of its fit band. P1's cure, where an observer hit mid-morph
  re-reads, also covers it, provided the run's padding then changes mid-morph rather than at the
  settle.

### P4: a layered dock's first expand in WebKit can rest at the narrow layer's width, flagged as fitting (intermittent; low; WebKit only; attribution open)

- **The tip, critique 8's c8b re-run** (`critic-9/c8cells/branch/webkit/c8b-coarse.json`, row
  `layers` 1440 `end`): `scene=layers&collapse=closed&maxw=260` (an active `wide` layer of nine
  seats and an inactive `narrow` layer of two), `expand()`, 1400 ms. The plate rests at **172 px**,
  where every other sample rests at 260 (the `max-inline-size`). The run has `cw 170`, `sw 577`,
  and `data-run-fits` set, so the cap is off and the plate paints a whole stadium on a run that
  hides 407 px of seats. It holds through a collapse and a re-expand (`reexpanded`: the same 172,
  `fits` true, `30px` on all four corners).
- **The round-8 tip's dock `src`, c9f** (`critic-9/probe/tip3592/webkit/c9f-fine.json`, 390 px,
  repeat 7 of 8): the plate rests at **160 px** with `cw 156`, `sw 531`, `fits` true and
  `28px` corners.
- **Counts:** of about 80 first expands of a layered dock on 10.1.5 code in WebKit (c8b in
  rounds 8 and 9, c9f on `branch2` and `tip3592`), 2 rest narrow. Of 40 on v10.1.4 (round 8's c8b
  v1014 arm and c9f `v1014`), none do. Of 32 in Chromium on the branch, none do. 172 and 160 are
  the narrow layer's own extent (two icon seats and the chrome) on each pointer. So the endpoint
  and the flag were both read while the run laid out the inactive layer, and no later observer
  hit corrected them.
- I could not attribute it in a patch round's budget. The 10.1.5 additions on this path are
  `publishYield`'s seat walk (`run.children` whose `offsetParent` is the run, which on a layered
  run are the layer frames M4 made) and fix 8's hold, which skips any re-read until the next
  settle. The hold is not the whole cause: the round-8 tip, which has no hold, also missed. v10.1.4
  has the same endpoint capture and never missed in 40.
- **Cure direction:** read the expanded endpoint and the flag from the active layer's seats only
  (the declared seats, `DOCK_SEAT_ATTR`, as the reserve's seat walk already does), and re-read
  when the active layer's box changes. **Gate:** c9f repeated in WebKit at 390 and 1440, both
  pointers, with every rest at the `max-inline-size` and `fits ⇔ sw ≤ cw`.

## Recorded, not 10.1.5 defects

- **P3: WebKit re-scrolls a run whose port shrinks** (pre-existing at v10.1.4; WebKit only). A
  shrink of the run's port while it is collapsed or at rest leaves it scrolled, with no user
  scroll: c9b/c9c horizontal none→220 rests `sl 80` (or `sl 272` and `310` after a mid-expand
  clamp), and vertical 600→300 rests `st 24`/`26`. c9c's vertical mid-expand row steps 23.98 px
  at the settle as the run takes that scroll. The plate's corners follow the scroll correctly
  (`16px 16px 16px 16px` mid-run, `16px 18.5px 18.5px 16px` near the end). Chromium rests at
  `sl 0`/`st 0` in every such row. v10.1.4 does the same in WebKit (c9e `h-to-220` at 300 ms
  rests `sl 128`, its 110 ms vertical coarse row `st 8`), and so does `3592aeb0d` (`sl 69`). It
  looks like WebKit re-snapping to a snap target after the snapport resizes. It is outside O-129,
  and I record it for 10.2.0's run work (W-0.8).
  c9b and c9c re-run on three arms in WebKit (`scripts/arms-critic-9.sh`, labels `branch2`, `v1014`,
  `tip3592`) give the same shape. v10.1.4 rests `sl 224` (c9b none→220) and `sl 272` (c9c
  mid-expand), with `st 24`, `26` and `52` on the vertical rows, and its c9c vertical mid-expand
  steps the same 23.98 px at the settle. So the re-scroll is WebKit's and v10.1.4's, not the patch's.
- **N3's bound, unchanged:** c8c's ring sweep on the tip reads the same 3 px cut at the first
  stage of the fit band (316 fine, 340 coarse) and 1 px at the next, in both engines. Fix 8
  accepted and recorded it, and the owner's ruling stands open.
- **A collapsed horizontal dock keeps `data-run-fits` from its expanded rest while its hidden full
  pane scrolls** (c9d `end`: `fits` true, `sw > cw`). That is the documented design (the flag is
  "the expanded run's reading at rest"), and the plate is a true circle (`uniform` true), because
  the cap animations are off under `.collapsed`. Not a defect. The docblock in `run.css` calls the
  flag and `scrollHeight = clientHeight` "one fact", which is true only of the expanded run.
- **The layered run refuses a programmatic `scrollLeft = scrollWidth` in Chromium** (c8d `end`
  rows: `sl 0` on the tip at both widths, `sl 296` at 1440 fine in round 8). v10.1.4 refuses it in
  both engines (`critic-8/probe/v1014/*/c8d-*.json`, `sl 0` everywhere), and WebKit takes it on
  the branch. It is timing-dependent snap behaviour with S1 focused, not a regression.
- **The D-1 frame step** (10.1.3 bottom-anchored ancestor zoom, WebKit, `critic-9/d1-ab.txt`):
  across 48 repeats the branch failed 2, each at 2.02 px against a bound of 2 (8: 1 fail, 8: 0,
  16: 0, 16: 1). Across 24 repeats v10.1.4 failed none (8: 0, 16: 0). That leans toward the
  branch, but 2 in 48 against 0 in 24 does not separate the arms (each fail is 0.02 px over the
  bound). Fix 8's record calls the step pre-existing, and these samples neither show that against
  v10.1.4 nor refute it. Fix 8 left it open and did not loosen the bound, and I concur. The close
  seat should not read this cell's one-off WebKit failure as a regression without a repeat.

## What held (refutation attempts that failed)

- **N1, every edge of the fit band, both engines** (c9a): at every stage from 308 to 356, fine and
  coarse, S1 and S6 step ≤ 0.02 px at the expand's settle and 0 px at the collapse's start.
  Through an expand reversed twice mid-morph, the run's padding is one value on every frame
  (`["1px 7px"]`, `["3px 7px"]` and so on). At rest the flag is the layout's truth
  (`fits ⇔ sh = ch`) in every row. The first expand from a collapsed mount changes the padding at
  the arm, while the full pane is still hidden, so no painted seat moves.
- **The held reading across a collapse** (c9b): when the port crosses the fit edge while
  collapsed, the expand's arm re-reads it. The first morph frame already carries the new flag
  (600→300: `fits` false, `sh 294 > ch 258`; 300→600: `fits` true, room 143 px), and the settle
  steps ≤ 0.22 px. Both directions, both axes, both engines.
- **The port crossing the fit edge at rest expanded** (c9c `rest-cross`): the observer re-reads,
  and the flag and corners follow, in both directions, axes and engines.
- **A fitting horizontal dock's morph edges** (c9d): the settle steps ≤ 0.13 px (Chromium) and
  ≤ 0.09 px (WebKit), and the collapse's start steps ≤ 0.24 px, at 1440, 844, 390 and 320. At its
  expanded rest the corners are uniform, or cut only where the run overflows (390/320 with the
  slider, which hides seats: `30px 16px 16px 30px` at `sl 0`).
- **O-182** (c8a on the tip): the dark band around the horizontal, vertical, collapsed,
  collapsed-and-hovered, overflowing and static docks at 390 and 1440 has no lighter pixel more
  than 1 px past the plate's box in either engine. The 14-16 lighter pixels at 1 px in the
  horizontal-1440 and static rows are the plate's own antialiased edge, the same as critique 8's.
  The m5 witness is GREEN in WebKit (86/86).
- **Critique 8's cells, row for row** (`critic-9/c8cells/` against `critic-8/probe/`): c8d, c8e,
  c8f and c8g read identically in both engines. c8b differs only by frame counts, by an RTL
  coarse WebKit scroll offset after the collapse (`sl -71` vs `-435`, with corners uniform in
  both), and by the first collapse frame's timestamp. c8c's expand trace now steps 0 at stage 340
  (critique 8: 6 px).
- **Round 7's cells on the tip** (`critic-9/r7cells/`): 22 + 1 skip in both engines.
- **g1-g5 through the branch spec's own cells** (86/86 both engines): the rest corner at 390, 844
  and desktop with the pointer on the trailing seat, the collapsed circle, every layer, the Slider
  thumb at min, mid and max, the coarse type floor, the menu gap. **g6 and g7:** see the table.
  No export removed or renamed (verify:package CLEAN). Fix 8 adds no token and moves no value.

## Not measured

- Real Safari: safaridriver is not enabled. Every WebKit cell is Playwright WebKit 2287.
- The critic-8a battery (critic-4 to critic-6 cells, about 40 min per engine) was not re-run. Fix 8
  touches only `publishYield`'s gate, its settle re-read and the vertical yield's selector, which
  c9a-c9e, c8b-c8d and round 7's cells cover.
- A touch drag on the Slider: Playwright's touchscreen has no move.
- c9's coarse blocks set `hasTouch`/`isMobile` per describe block. Their expand is the exposed
  `expand()`, not a pointer path, so the pointer read that critique 8 flagged does not enter.
