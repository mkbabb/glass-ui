# D2-B′ prototype, pass 4: the measured scene on floor v3

| | |
|---|---|
| Seat | D2 pass 4, route D2-B′ (measured scene, one integrator), PROTOTYPE |
| Model | claude-opus-5-5 |
| Base | HEAD `3266a0717` (the worktree's cut) + `pass-4/floor-v3.patch` (sha256 `637d1625d7b39b5d…`) |
| Patch | `pass-4/D2-Bp-proto.patch`, 56 files, 6 319 lines, sha256 `8411916768b9120dceaadfc8a561e11f2cecb4898ee8d187d36917737d489d7b`. `git apply --check` exit 0 on `git archive 3266a0717` + floor v3, and again on `git archive 78dd49813` (HEAD when the patch was cut) + floor v3 |
| Size | src +2080/−1761, tests +334/−630, demo +35/−15, docs/design +1/−2 |
| Build | `bp` (harness `build.mjs --label bp`) is the reading; `fv3` (HEAD + floor v3) is the L1 reference and the cost base. Intermediate builds bp0-bp15 are the history (§8) |
| Adapter | `pass-3/adapter-floor-v2.mjs`, unchanged. No WebKit shim: every Playwright WebKit cell is unshimmed |
| Engines | headless Chromium and Playwright WebKit. Real Safari: UNMEASURED (owner's safaridriver checkbox) |
| Runner | `D2-Bp-proto-records/run.sh` (adapted from `FV3-run.sh`), engines run apart (`ENG=`) so only the WebKit run takes the machine-wide WebKit lock; every red cell re-run twice by exact name |
| Digest | `D2-Bp-proto-records/probes/bp-cells.mjs` (FV3-cells.mjs's verdict rule and row map) → `rows-bp.md`, `counts-bp.md`, `cells-bp.json` |
| Records | `pass-4/D2-Bp-proto-records/`: stage logs, `json/` (every witness JSON), `filmstrips/`, `facility/`, `cost-*.json`, `diag/` |
| Load | 10-core host shared with other seats; load averages recorded per log and per cell (Chromium battery 9-23, Playwright WebKit 16-28) |

## In brief

B′ on floor v3 meets the §P3-7.3 obligations in part, in Chromium and Playwright WebKit.

**Met:**
- **The three unmeasured cases** are measured cells, 6/6 in both engines: a capped dock with a seat transition, an unlayered consumer margin, and a rotated ancestor.
- **O-88 C1-C7 and O-87 L1** pass in both engines and both themes. Floor v3 fails C1, C3, C5, C6 and C7.
- **The window covers the wipe's clips.** H4-2 `lanes` is 33/33 in three of the four engine-theme runs.
- **G's swaplag, flowblock and lunec arms** pass in both engines.
- **The 4× lead cost** at 40 seats is 1 frame over 25 ms. The target is ≤ 2; pass 3 had 3.

**Not met:**
- **The splice.** It is built as an exclusion lane on moving fronts. It holds in 32/33 W3 cells. The film strips show no false join between faces, but they do show cut glyph stubs. The one red frame is two arriving units of one face closing on their own gap.
- **G's in-page retarget2 arm.** `retarget·40` is red in every engine and theme; `retarget·80/120` vanish 0.53-0.59 against 0.5.

Real Safari is UNMEASURED (owner's safaridriver checkbox).

## 1. What the patch is

The pass-3 B′ patch rebased onto HEAD + floor v3, then the §P3-7.3 work on top of it.

### 1.1 The rebase

Two conflicts:

- `DockCrossfade.vue`: rebuilt from the floor-v2 + B′ version. That version already deletes the peak reserve, which is what floor v3 changed in the same lines.
- `styles/density.css`: B′'s hunk dropped. Floor v3 struck the paragraph it edited.

The plain rebase (`bp0`) fails W3 in Chromium on lead-add, first-expand and stretch (lanes, slivers), so the rest of this section is not optional.

### 1.2 The seam: an exclusion lane on moving fronts

`useDockScene.ts`, header §"The seam (H4-1)". A unit going out wipes from each side a unit arrives from. That moving edge is its front.

- **The lane.** A unit coming in stops one seam short of the front: `--dock-seam` is one glyph advance (`1ch`, registered `<length>`, set on `.dock-layer *` in `layers.css`) of the wider of the two, plus 1 px of slack. Two faces never meet inside a glyph run.
- **The front, not the paint, holds the lane.** The arriving unit is cut against the front whether or not the leaving unit still paints there. Before this, a leaving unit dropping under its seam released the arriving unit in one frame (the `lanes` cancels: a separator 14 px → 0 at about 45 ms of every expand).
- **Side-specific.** A front holds only the side a unit arrives from. A unit on the other side is bounded by what the leaving unit paints, and by nothing once it stops painting.
- **The lead.** The front starts two seams in, so the arriving unit paints a seam's worth from the first frame (no blank trough). A unit already moving when the exchange takes it (a retarget), or already part-way out, leads by under half of what it paints, so no frame drops more than half its ink (`vanish`).
- **The run-on.** The front ends two seams past the place the two meet (or past the arriving unit's reach, whichever is further), so the arriving unit is whole a seam before the lane lands. Its clip is at identity when the window closes.
- **The pace.** A unit armed with at least two seams of paint reaches its own seam at 0.8 of the exchange (`SEAM_AT`), so its ink spans the leaving rule's ≥ 25 % of the morph. Under its seam it paints nothing (no sliver). A unit armed within two seams of its own wipes at the lane's pace.
- **The tie.** Where two units land on one place, the side is the side the front comes from (or where the fronts meet). The old tie-break used the painted midpoint, which crosses the arriving unit's middle as it goes and flipped the cut from frame to frame on retargets.
- **Hidden is px.** A unit that paints nothing gets `inset(0 <w>px 0 0)` through the ordinary path. The literal `inset(50%)` is gone (see §7, a harness defect it exposed).
- **The exchange lane** lands at a quarter pixel (`LAND_PX / 2 / widest`).

A retarget now records which units were already moving before it clears the old exchange (`moving`). Before, the check ran after the clear and was always false.

### 1.3 The window

`land()` closes `[data-morphing]` with the episode: `endEpisode()` then `setWindow(false)`, for every lane, exchanges included. Every clip the wipe writes is inside the flag. H4-2 `lanes` ("every lane at its final value from the frame the flag closed") is the witness.

The cost is a window a few ms longer than the clock allows (W3 `window` 258-270 ms against an allowance of about 257). The Q-4 lenient allowance (≈ 313 ms) holds in every such cell, so they read OWNER-BLOCKED (Q-4).

### 1.4 The flow margin (case: unlayered consumer margin)

The flow writes `--dock-flow-start` = `rest.margin[0] + anchor·delta` (and the end likewise), where `rest.margin` is the computed margin read after `clearFlow()`. The shell rules apply it as `margin-left: var(--dock-flow-start) !important`, so an unlayered consumer `margin` neither wins over the flow nor is lost by it.

### 1.5 The facility (O-88 C1-C7)

- `useDockState.ts`: a new input `scroll.page`. A document scroll (capture listener, installed with the outside-click listener while expanded; scrolls inside the dock or a teleported surface ignored) collapses a hover dock unless held or engaged, and a collapsible pinned dock when unheld and unengaged (C3).
- `GlassDock.vue`: Escape from anywhere in an expanded dock collapses it and focuses the summary (root `@keydown`, the dismissable-layer guard bounded by the dock) (C5). The summary slot falls back to a glyph disclosure (`Ellipsis`, or `EllipsisVertical` when vertical) so the collapsed form is a stadium of one glyph, not a square (C1).
- `demo/stories/dock/overview.vue`: the collapsible docks carry a `DropdownMenu` (`DockTrigger for="dropdown"`, "Dock view") (C6), and the prose names the pill, Escape, scroll and the menu.

### 1.6 Housekeeping

- `useDockBody.ts`: the unused `travelling` member removed (test replaced by "seats on its landing…").
- `styles/index.css`: `--dock-motion-standard` struck (B′ removed its last reader; the PR gate found it).
- Tests: `useDockState.chart.test.ts` (+2 scroll.page), `GlassDock.posture.test.ts` (Escape from a persistent seat, the summary glyph, "bounded by the dock"), `g-dock-lattice.test.ts` (N-1 regex for `rest.margin` and `!important`).

## 2. Typecheck, units, builds, prose, adapter law

All on the final tree, in the worktree, through `guarded --light`.

| Check | Result |
|---|---|
| `vue-tsc --noEmit -p tsconfig.json` | exit 0 |
| `vite build` (library) | exit 0, 63 public declaration entries (`.bpout/build-lib.log`) |
| `vite build --config demo/vite.demo-dist.config.ts` | exit 0 (`.bpout/build-demo.log`) |
| `vue-tsc --noEmit -p tsconfig.test.json` (after the library build) | exit 0 |
| `vitest run --maxWorkers=2` (full) | 242 files, 2348 passed, 10 expected fail, 1 skipped. The first run, before the two builds, failed 9 built-artifact tests (dist/, dist-demo/) and the FourierField smoke import; all pass once the builds exist |
| PR (`harness/prose.mjs`, `extra-PR.log`) | 3/3: readers 65 tokens, 0 without a reader; `DockProps` count 7, 0 wrong; 32 rows, 0 duplicated |
| Adapter law (`extra-adapter-law.log`) | L-1..L-5 hold |

## 3. The §P3-7.3 obligations

Readings from the final battery (`main` stage, light theme). Chromium at load 15-21, Playwright WebKit at load 16-28. The dark readings are in §6.

### 3.1 The splice: an exclusion lane, judged on film strips in both engines

Built as an exclusion lane (§1.2), not a feather. A feather would put a mask on every unit and is not what H4-1 measures.

| Witness | Chromium | Playwright WebKit |
|---|---|---|
| R6 · W3 `splice`, 33 cells | 32/33. Red: `swap-long`, 1 frame at 167 ms, gap 9.95 against 10.36 (load 15.2); rerun 1 not red on splice, rerun 2 red | 32/33. Red: `swap-long`, 1 frame at 175 ms, gap 8.19 (load 16.3); rerun 1 OWNER-BLOCKED (window only), rerun 2 red |
| W3 `sliver`, every cell | 0 sliver frames | 0 sliver frames |
| B2 · FM, 6 strips | 6/6 | 6/6 |

Floor v3 reads R6 33/33 in both engines. It has no wipe to splice: its leaving seats fade.

**The red frame.** It is not two faces meeting. C and Tools are both arriving units of the long face. Each is cut by one of the two leaving units' fronts, and they close on their own 6 px layout gap together. At 163 ms (`diag/swap-long-chromium.txt`), C paints to 602.4 of 604 and Tools from 611.5 of 610: a 9.1 px gap with both edges cut. §7 notes this for the critic.

**The strips** (`filmstrips/{chromium,webkit}-{light,dark}/`). Strips read by eye: Chromium light swap-long; Playwright WebKit light swap-long, swap-short and first-expand. No frame of these shows two faces joined into a false word ("Bools"). The lane keeps a blank seam between the faces in every frame. What they do show, in both engines, is the hard wipe's cut glyphs inside the first three frames:

- A leaving "B" cut to its stem and bowls reads as an "E" (Playwright WebKit swap-long, frames 2-3).
- An arriving "Tools" shows as "ools" (or a "T" stem and "ools").
- An "A" shows as a "/" stub.
- The first-expand strip cuts "P" to a tick.

The sliver rule is per box: a unit paints nothing under one advance. A glyph cut inside a box wider than the advance still shows its stub. That reading is the open item a feather would address (§9).

### 3.2 G's four arms, inside H4

| G's arm | H4 witness | Chromium | Playwright WebKit |
|---|---|---|---|
| swaplag | H4-2 R7 · W3 `lanes`: every lane at its final value from the frame the flag closed; no lane cancelled to identity | 33/33 | 33/33 |
| flowblock | H4-3 R8 · ST `stall·nb·*` and W3 `neighbour·*` | 7/7 | 7/7 |
| in-page retarget2 | H4-5 · W3 `retarget·{40,80,120}` (scheduled in the page) and B1 `retarget·context` | context 1/1. Red: `retarget·40` (blank, a run of 2-3; leaving, 58.8 ms against 79.9), `retarget·80` (vanish 0.54 → 0, reproduced once of two) | context 1/1. Red: `retarget·40` (blank, leaving, vanish 0.53), `retarget·80` (vanish 0.53), `retarget·120` (vanish 0.59); all reproduced twice |
| lunec | H4-4 R5 · hit sampler | 4/4 | 4/4 |

**The window covers the wipe's clips.** R7 is the reading: in both engines, no clip is off its final value after the flag closes, and no clip is cancelled to identity inside the window. The one R7 red is dark Chromium `first-expand`: an icon cut 34-35 px released at about 20 ms, with the previous step 0. It is in 2 of 3 runs, and light passes (§6).

**The retarget reds.** Floor v3 fails R2 2/8 in both engines (leaving on content-remove, lead-remove and compaction, and vanish on the retargets). B′ passes every non-retarget leaving cell. What remains is the in-page retarget: a unit painting 0.53-0.59 of its ink when the swap is retargeted drops to 0 within 5 ms. The unit was arriving when the swap turned. It is re-armed to leave from what it paints, and it stops painting within a frame. The mechanism is not isolated (§9). The retarget lead cap (§1.2) took the drop from 0.85 (bp13) to 0.53-0.59. That is still above the 0.5 bound.

### 3.3 The 4× lead cost, for Q-15

`pass-2/D2-Bp-probes.mjs --arm pcost,plead`, headless Chromium (traced) at load 9-13, on `bp` and on `fv3` (`cost-{bp,fv3}-chromium.json`, `extra-cost-*-chromium.log`). Rows: p95 / max frame ms / frames over 25 ms / main-thread ms per frame.

| Engine, throttle, seats | B′ (bp) | Floor v3 (fv3) |
|---|---|---|
| Chromium 1×, 0-40, expand | p95 8.9-9.5, max ≤ 10.2, 0 over 25 | p95 8.9-9.6, 0 over 25 |
| Chromium 1×, 0-40, lead | p95 9.2-9.8, 0 over 25 | p95 9.0-9.6, 0 over 25 (0 morph frames) |
| Chromium 4×, 40, expand | 14.4 / 38.5 / **1** / 1.39 | 9.9 / 22.7 / 0 / 2.02 |
| Chromium 4×, 20, expand | 9.5 / 22.0 / 0 / 0.98 | 9.8 / 24.1 / 0 / 2.10 |
| Chromium 4×, 40, lead | 22.4 / 59.6 / **1** / 2.17 | 9.4 / 10.1 / 0 / 0.23 (no lead morph: 0 morph frames) |
| Chromium 4×, 20, lead | 16.8 / 35.8 / 1 / 1.62 | 9.8 / 15.9 / 0 / 0.24 |

Playwright WebKit (no CPU throttle in WebKit; dt only), load 16-18: `bp` expand and lead at 0-40 seats, p95 12-13, max ≤ 13, 0 frames over 25 ms; `fv3` the same (p95 12-13, 0 over 25; its lead has 0 morph frames). `cost-{bp,fv3}-webkit.json`.

**Against the target.** The target is frames over 25 ms at 40 seats ≤ the floor's expand (2, pass 3's reading). The 4× lead at 40 seats has 1 frame over 25 ms, so it meets the target. Pass 3's B′ had 3.

This run's floor reads 0 on its own expand, so B′ still pays one long frame the floor does not:
- The long frame is the trigger frame (59.6 ms at 4×), where the scene measures and arms its units. It is not profiled further.
- Per frame, the expand costs about 2/3 of the floor's main-thread time (1.39 against 2.02 ms).
- The lead costs about 9× the floor's, because the floor animates no lead at all.

### 3.4 The three unmeasured cases, measured

`probes/cases.mjs`, light, both engines. 6/6 Chromium (load 17.5-20.1), 6/6 Playwright WebKit (load 19.6-19.9).

| Case | Cell | Chromium | Playwright WebKit |
|---|---|---|---|
| Capped dock, seat transition | `case·capped·seat-transition`: cap 150 px, run overflowing; one seat's own width transition grows and shrinks | 0 page errors, 0 window errors, plate travel 0, flag closed at rest | same |
| Capped dock, morph (control for the cap) | `case·capped·morph`: cap 300 px, expand, add a seat, collapse | 0 errors; travel 198 px, largest step 14.9 px; flag closed | 0 errors; largest step 19.8 px; flag closed |
| Unlayered consumer margin | `case·consumer-margin`: `.glass-dock { margin-inline: 20px }` unlayered | computed margin 20 px kept; plate end edge never past the neighbour (−31.98 px, bound 0.5); the neighbour's largest step 30.34 px against the plate edge's 30.42 | −31.98 px; 37.67 px against the edge's step |
| | `·control`, no consumer rule | margin 8 px; −19.98 px; 27.3 against 27.3 | −19.98 px; 36.41 against 36.41 |
| Rotated ancestor | `case·rotated`: host `rotate(2deg)` | seats' largest second difference 5.87 px/frame² (control 5.63, bound +1); after the window 0.28 px | 8.39 (control 9.10); 0 px |
| | `·control`, `rotate(0deg)` | 5.63; 0.37 px | 9.10; 0.32 px |

## 4. Both routes: O-88 C1-C7 and O-87 L1

`c-facility.mjs` (CF) and `l1-light.mjs` (L1, against `fv3`). Light main stage, both engines; the dark runs are in §6. Frames are in `facility/` and `json/`.

| Row | Cell(s) | Chromium | Playwright WebKit | Floor v3 (both engines) |
|---|---|---|---|---|
| C1 | `c1·shape·h`: collapsed 102 × 56, stadium (R 9999 ≥ 27), the disclosure is the summary ("Expand dock") | PASS | PASS | FAIL (square, summary) |
| C2 | `c2·morph·h`, `c2·prm`, `c2·rapid` | 3/3 (first expand travel 157 px, step ≤ 19.9 px; reduced motion lands in 0 frames) | 3/3 (step ≤ 14.0 px) | 3/3 |
| C3 | `c3·hover`, `c3·focus`, `c3·scroll`, `c7·coarse-tap` | 4/4 (wheel 240 px collapses after 85 ms) | 4/4 (87 ms; tap expands after 477 ms) | 2/4 (scroll does not collapse; coarse tap does not open) |
| C4 | `c4·persistent` | PASS | PASS | PASS |
| C5 | `c5·keyboard`: Tab in, Escape, Enter on the disclosure | PASS | PASS | FAIL (disclosure, escape) |
| C6 | `c6·menu`: a dock menu open past the dwell keeps the dock expanded; Escape closes it to its trigger | PASS | PASS | FAIL (menu) |
| C7 | `c1·shape·v`, `c2·morph·v`, `c7·narrow`, `c7·coarse-tap` | 4/4 (vertical 116 × 64 stadium; 390 px viewport, scrollWidth 390) | 4/4 | 2/4 |
| L1 | `l1·{light,dark}·{collapsed,expanded,inflight}` against `fv3` | 6/6: shadow, gradient and pseudo counts equal the floor's; blur 16 px (RECORD); 0 idle infinite animations | 6/6, same | the reference |

CF in Chromium ran at load 14.9-17.2. In Playwright WebKit it ran at load 23.7-27.8.

## 5. The arm set

The same set as the other route. Every arm runs in Chromium and Playwright WebKit, light and dark unless noted:

- H4 witnesses W1-W8 and R6 (`rest`, `darkrest`).
- W3 with every H4 check: splice and sliver (H4-1), lanes (H4-2), neighbour (H4-3), the retarget cells `retarget·40/80/120` and `retarget·context` (H4-5), paint floor, leaving, vanish.
- ST, the five stall timings and `stall·nb·*` (H4-3, G's flowblock arm).
- FM, film strips (the six strips per engine and theme, copied to `filmstrips/`).
- R5, the hit sampler (H4-4, G's lunec arm).
- CF, the O-88 facility C1-C7 (frames copied to `facility/`).
- L1, the O-87 light census against `fv3` (light and dark inside the witness).
- CASES, the three unmeasured cases (light only).
- PR (prose: readers, count, rows) and adapter law (source, once).
- Cost: `pass-2/D2-Bp-probes.mjs --arm pcost,plead` on `bp` and on `fv3`, per engine.

G's four arms map as: swaplag → H4-2 `lanes`, flowblock → ST `stall·nb`, in-page retarget2 → H4-5 `retarget·{40,80,120}` + `retarget·context`, lunec → R5.

## 6. Per row, per engine

The 36 rows from `probes/bp-cells.mjs`, FV3-cells.mjs's verdict rule and row map unchanged. Each cell is `verdict passing/cells`. A cell red in its run but passing in both re-runs is NOT-REPRODUCED. OB is OWNER-BLOCKED, UM is UNMEASURED: the W3 `faces` pixel pass is not run under `--no-faces`, and W8's consumer cells are not built.

Floor v3's rows sit beside these in `D2-Bp-proto-records/rows-bp.md` (build `fv3`). Per-witness counts and load ranges are in `counts-bp.md`.

Loads:

| Engine | main | rest | dark |
|---|---|---|---|
| Chromium | 14-23 | 17-21 | 9-16 |
| Playwright WebKit | 16-28 | 18-21 | 16-24 |

The Playwright WebKit stages after `main` started after a 30-minute headroom wait expired, at 1615 processes machine-wide (`guarded` recorded it). Every cell's own load is in `cells-bp.json`.

| Row · witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| P1 · W1 | OWNER-BLOCKED 22/22; OB 3 | OWNER-BLOCKED 22/22; OB 3 | OWNER-BLOCKED 22/22; OB 3 | OWNER-BLOCKED 22/22; OB 3 |
| P1 · W7 (edge) | PASS 20/20 | PASS 20/20 | PASS 20/20 | PASS 20/20 |
| P2 · W2 | FAIL 7/8; red: route1·long-run-v[keyboard] | FAIL 7/8; red: route1·long-run-v[keyboard] | FAIL 7/8; red: route1·long-run-v[keyboard] | FAIL 7/8; red: route1·long-run-v[keyboard] |
| P3 · W3 (every check) | FAIL 29/32; red: swap-long[splice], retarget·40[blank,leaving], retarget·80[vanish]; OB 5; UM 9 | FAIL 27/32; red: first-expand[lanes], swap-long[splice], retarget·40[blank,leaving], retarget·80[vanish] +1; OB 6; UM 7 | FAIL 28/32; red: swap-long[splice], retarget·40[blank,leaving,vanish], retarget·80[vanish], retarget·120[vanish]; OB 6; UM 8 | FAIL 31/32; red: retarget·40[blank,leaving,vanish]; OB 7; UM 7 |
| P3 · W6 (collapsed form) | FAIL 3/4; red: form·collapse[window] | FAIL 3/4; red: form·collapse[window] | PASS 4/4; not reproduced 1 | FAIL 2/4; red: form·expand[window], form·collapse[window] |
| P3 · W8 (motion) | PASS 6/6 | PASS 6/6 | PASS 6/6 | PASS 6/6 |
| P4 · W4 | PASS 13/13 | PASS 13/13 | PASS 13/13 | PASS 13/13 |
| P5 · W5 | PASS 6/6 | PASS 6/6 | PASS 6/6 | PASS 6/6 |
| P5 · R6 (ring probe) | PASS 2/2 | PASS 2/2 | PASS 2/2 | PASS 2/2 |
| F1 · W1 rests + W2 | PASS 17/17 | PASS 17/17 | PASS 17/17 | PASS 17/17 |
| F2 · W5 | PASS 6/6 | PASS 6/6 | PASS 6/6 | PASS 6/6 |
| F3 · W4 coarse, hover gate | PASS 4/4 | PASS 4/4 | PASS 4/4 | PASS 4/4 |
| F4 · W4 compact | PASS 8/8 | PASS 8/8 | PASS 8/8 | PASS 8/8 |
| F5 · W3 first-expand | UNMEASURED 1/1; UM 1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| F6 · crash-free (every cell) | PASS 160/160; UM 9 | PASS 148/148; UM 7 | PASS 160/160; UM 8 | PASS 148/148; UM 7 |
| N1 · W3 anchor-end | PASS 2/2 | PASS 2/2 | PASS 2/2 | PASS 2/2 |
| N2 · W3 stretch·lead-add | PASS 1/1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| N3 · W3 lattice, infanim, seat-transition | PASS 3/3 | PASS 3/3 | PASS 3/3 | PASS 3/3 |
| N4 · W7 | PASS 20/20 | PASS 20/20 | PASS 20/20 | PASS 20/20 |
| R1 · W3 continuity, seats, paint floor | FAIL 29/30; red: retarget·40[blank]; UM 9 | FAIL 29/30; red: retarget·40[blank]; UM 7 | FAIL 29/30; red: retarget·40[blank]; UM 8 | FAIL 29/30; red: retarget·40[blank]; UM 7 |
| R2 · W3 leaving (H4-5 retarget) | FAIL 6/8; red: retarget·40[leaving], retarget·80[vanish]; UM 3 | FAIL 5/8; red: retarget·40[leaving], retarget·80[vanish], retarget·120[vanish]; UM 2 | FAIL 5/8; red: retarget·40[leaving,vanish], retarget·80[vanish], retarget·120[vanish]; UM 2 | FAIL 7/8; red: retarget·40[leaving,vanish]; UM 2 |
| R3 · W3 reversal | PASS 1/1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| R4 · ST five timings | PASS 5/5 | PASS 5/5 | PASS 5/5 | PASS 5/5 |
| R5 · R5 hit sampler (H4-4) | PASS 4/4 | PASS 4/4 | PASS 4/4 | PASS 4/4 |
| B1 · W3 retarget·context (H4-5) | PASS 1/1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| B2 · FM strips | PASS 6/6 | PASS 6/6 | PASS 6/6 | PASS 6/6 |
| B3 · PR count, rows (H4-8) | source: PASS 2/2 | | | |
| N5 · PR count (N-6), readers (N-7) | source: PASS 2/2 | | | |
| N5 · W2 long-run-v (N-8) | FAIL 0/1; red: route1·long-run-v[keyboard] | FAIL 0/1; red: route1·long-run-v[keyboard] | FAIL 0/1; red: route1·long-run-v[keyboard] | FAIL 0/1; red: route1·long-run-v[keyboard] |
| R6 · W3 splice (H4-1) | FAIL 32/33; red: swap-long[splice]; UM 9 | FAIL 32/33; red: swap-long[splice]; UM 7 | FAIL 32/33; red: swap-long[splice]; UM 8 | PASS 33/33; UM 7 |
| R7 · W3 lanes (H4-2) | PASS 33/33; UM 9 | FAIL 32/33; red: first-expand[lanes]; UM 7 | PASS 33/33; UM 8 | PASS 33/33; UM 7 |
| R8 · W3 neighbour + ST nb (H4-3) | PASS 7/7 | PASS 7/7 | PASS 7/7 | PASS 7/7 |
| C1 · CF | PASS 1/1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| C2 · CF | PASS 3/3 | PASS 3/3 | PASS 3/3 | PASS 3/3 |
| C3 · CF | PASS 4/4 | PASS 4/4 | PASS 4/4 | PASS 4/4 |
| C4 · CF | PASS 1/1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| C5 · CF | PASS 1/1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| C6 · CF | PASS 1/1 | PASS 1/1 | PASS 1/1 | PASS 1/1 |
| C7 · CF | PASS 4/4 | PASS 4/4 | PASS 4/4 | PASS 4/4 |
| L1 · L1 census (H4-11) | PASS 6/6 | (in the light run) | PASS 6/6 | (in the light run) |
| §P3-7.3 · the three cases | PASS 6/6 | — | PASS 6/6 | — |

**Against floor v3** (`rows-bp.md`, the same rows on `fv3`):

- **Closed by B′, in both engines:**
  - P1 W1 corner: 13/22 → every non-card cell passes, the card cells OWNER-BLOCKED (Q-12).
  - P3/R1 W3 continuity: 10/32 and 14/30 → 28-31/32 and 29/30.
  - R2 leaving on content-remove, lead-remove and compaction.
  - C1, C3, C5, C6, C7.
- **Opened by B′:**
  - R6 `swap-long` (1 frame; §3.1, §7).
  - R7 dark Chromium `first-expand` (§3.2).
  - The retarget reds in R1/R2 (§3.2).
- **Unchanged reds:**
  - P2/N5 W2 `route1·long-run-v` keyboard, in every engine and theme. This is the harness witness defect FLOOR-V3 §1.3 records; floor v3 fails it the same way.
  - P3 W6 `window` (form·collapse, and form·expand in dark Playwright WebKit). These are 258-261 ms against an allowance of about 257.5. They are a window-rule red that floor v3 also has (2/4), here narrowed to the window check alone; light Playwright WebKit is NOT-REPRODUCED.
- **Owner-blocked:**
  - P1 card cells (Q-12; FLOOR-V3 found the card fails under both branches).
  - P3 W3 window cells (Q-4: lenient allowance holds).

## 7. Harness notes

- **`insetOf` reads a one-value percentage against the height on every side.** `inset(50%)` on a 64 × 38 box reads as 19 px a side, so a hidden unit read as painting a 26 px middle strip (lib.mjs `insetOf`: `res(s, i % 2 === 0 ? h : w)` before the one-value expansion). The scene no longer writes percentages; the parser still has the defect.
- **`splice` flags two arriving units of one face.** The one swap-long splice frame is C | Tools of the long face, both arriving, both cut by the two leaving units' fronts, closing on a 6 px layout gap (`diag/swap-long-chromium.txt`, 163 ms: C painted to 602.4 of 604, Tools from 611.5 of 610, gap 9.1 against 10.36). The check reads it as a seam inside a glyph run. Whether a gap between two seats of one face counts is the critic's call; the reading stays red here.

## 8. History

| Build | Change | W3 reading (Chromium unless noted) |
|---|---|---|
| bp0 | plain rebase | lead-add, first-expand, stretch red (lanes, sliver) |
| bp1 | seam by overlap, sliver rule, window = episode | splices and slivers gone; lanes cancels, swap leaving 59.9 vs 63 ms |
| bp2 | flow margin, facility (C1-C7) | CF 28/28 and CASES 12/12 both engines; W3 30/66, splice late, blank in swaps |
| bp3-bp4 | seam by proximity; pace 0.65; two-seam lead | blank gone; leaving fails 1 → 0.56 → … under 63 ms |
| bp5-bp9 | fronts hold the lane; side-specific halos; run-on; `inset(50%)` removed | swap-short, lanes clean; first-expand cancel, retarget splices |
| bp10-bp15 | run-on of two seams; unpaced retarget wipes; tie by front; retarget lead cap | first-expand, swap-short clean in Chromium light; swap-long 1 splice frame; retarget·40/80/120 alternate |
| bp | `moving` captured before the clear; comment edits | the reading (§6) |

## 9. Open gaps

- **The retarget cells (R1/R2, H4-5).** `retarget·40` reproduces in every engine and theme: a blank run of 2-3 frames, a leaving fade of 53-59 ms against about 77-80, and vanish 0.53 in WebKit. `retarget·80/120` show vanish 0.53-0.59 against the 0.5 bound (light in both engines, dark Chromium). The unit that drops is one that was arriving when the swap turned. Why it stops painting within a frame of being re-armed is not isolated; `probes/diag.mjs` (the `swap&three=1` scene, a retarget scheduled in `--go`) is the tool for it.
- **The swap-long splice frame (R6).** One frame per run, two arriving units of one face (§7). Either the critic rules a same-face gap out of `splice`, or the fronts of two leaving units that close on one gap are staggered so one arriving unit is whole first; not built.
- **The cut glyph (film strips).** The lane stops false joins between faces, not glyph stubs inside one unit ("B" cut to an "E"-like stub, "P" to a tick). A feather (a mask ramp over the seam) is the route to that, and is not what H4-1 measures; the strips are the reading.
- **Dark Chromium `first-expand` lanes (R7).** An icon cut 34-35 px released at about 20 ms in 2 of 3 runs; light and Playwright WebKit pass.
- **The window lengthened by window = episode.** W3 window cells read 258-270 ms against an allowance of about 257 and hold the Q-4 lenient allowance (OWNER-BLOCKED, Q-4); W6 reports its `window` cells red, with no Q-4 lenient verdict.
- **Cost.** The lead at 4× and 40 seats meets the target (1 frame over 25 ms ≤ 2). It still pays one long trigger frame (59.6 ms) that the floor, which animates no lead, does not. That is for Q-15.
- **Owner-blocked rows.**
  - P1 card cells on Q-12 (FLOOR-V3: the card fails under both branches).
  - P3 window on Q-4.
  - P2/N5 W2 `long-run-v`, the harness witness defect of FLOOR-V3 §1.3.
- **Harness.** `insetOf`'s one-value percentage defect (§7).
- **Unmeasured.**
  - Real Safari: UNMEASURED (owner's safaridriver checkbox).
  - W8's consumer cells: UNMEASURED (3 per engine and theme).
  - The W3 `faces` pixel pass, under `--no-faces`.
