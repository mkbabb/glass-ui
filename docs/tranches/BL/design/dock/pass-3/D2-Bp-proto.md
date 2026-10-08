# D2-B′ prototype, pass 3: the measured scene on floor v2

| | |
|---|---|
| Seat | D2 pass 3, route D2-B′ (measured scene, one integrator), PROTOTYPE |
| Model | claude-opus-5-5 |
| Base | HEAD (task names aea214b9; the worktree was cut at a59d0909, `src/` identical) + `pass-3/floor-v2.patch` |
| Patch | `pass-3/D2-Bp-proto.patch`, 54 files, sha256 `f9bf42afaa39dcd643673a9025a3fe6846a29a3eaa1daef1644360b5362494ca`; `git apply --check` exit 0 on HEAD+floor-v2; applied to a copy of that tree it equals the prototype tree byte for byte (0 differing files) |
| Size | src +1896/−1741 (net +155), tests +247/−628, demo +15/−15, docs/design +1/−2 |
| Builds | b4, b5, b7 (intermediate), **b8 (the reading)**; b9 = the final tree after comment-only edits, scene bundle byte-identical to b8 (`records/checks/b8-b9-scene-diff.txt`) |
| Adapter | `pass-3/adapter-floor-v2.mjs`, unchanged from the floor seat. No webkitShim, so every Playwright WebKit cell is unshimmed |
| Engines | headless Chromium and Playwright WebKit (playwright from the checkout's `node_modules`). Safari: UNMEASURED (owner's safaridriver checkbox) |
| Tools | `pass-3/D2-Bp-p3-run.sh` (driver), `pass-3/D2-Bp-p3-probes.mjs` (retarget, hit, trough, subpx, recheck), `pass-3/D2-Bp-p3-plants.py` (ten plants), `harness/scenes.mjs` (`swap &three=1`), `pass-2/D2-G-crit-probes.mjs`, `pass-2/D2-Bp-probes.mjs` |
| Records | `pass-3/D2-Bp-proto-records/` (`b8/` is the reading; `b4/`, `b5/`, `b7/` the history; `checks/` typecheck, tests, builds, adapter law) |
| Load | 10-core host shared with other sessions; load averages 14-89 across the runs, recorded per log and per cell |

## In brief

B′ on floor v2 meets the four §4.3 obligations and both "Both" obligations in Chromium and Playwright WebKit.

- A swap never blanks: the moving ink never drops below the lower rest. The baseline drops to 0.338.
- Leaving seats leave by a progressive clip.
- A stall replays from rest at the measured cadence. The baseline leaps 102→481 px in one frame.
- Hit-testing follows paint.

Every H3 witness passes in both engines, except:
- cells that also fail on floor v2 (W2 `route1·long-run-v` keyboard);
- OWNER-BLOCKED Q-12 / Q-4 cells;
- one Playwright WebKit W1 corner cell, seen once at load 55 and passing in eight later runs at load 23-36 (NOT-REPRODUCED).

Ten plants each take out one mechanism, and each one fails the witness that should catch it.

Three things are still open:
- **The 4× lead cost.** At 40 seats the lead morph costs more than the baseline, which never animates a lead at all.
- **The hard wipe seam.** Mid-swap, adjacent faces show spliced glyphs ("Bools") in the film strips.
- **Safari.** It is unmeasured.

## 1. What was built

B′ keeps one integrator and one measured scene. On floor v2 (N-1..N-4), the scene has these parts:

- **`useDockBody`.** One rAF and the spring lanes. The dt cap is 33.3 ms. A frame gap over `DOCK_BODY_STALL_MS` (100 ms) steps one frame at the last measured cadence, starting at 1000/60, instead of the capped 33.3 ms. Both constants are module-private. This is the H3-4 replay.
- **`useDockScene`.** A layout-space FLIP model:
  - **Units.** Regions, faces, cells and seats.
  - **Clip.** A per-unit plate-silhouette clip.
  - **Exchange.** An exchange with two lanes, wipe and exclusion, and a ghost clone for a seat that leaves the DOM.
  - **Sub-pixel positions.** An integer offset is refined by the rect delta, divided by the root scale, less the translate the scene wrote. The refinement is trusted only within `OFFSET_ROUNDING_PX` (0.5 px + 1e-3).
  - **Anchor.** Taken from the root rect against its parent.
- **The flow in CSS.** `--dock-flow-start`, `--dock-flow-end` and `--dock-hold` are registered lengths, `inherits: false`. They are read by the shell.css "THE FLOW" rules under `[data-dock-flow]` and `[data-dock-hold]`. The size hold applies only while the run overflows (`data-overflowing`).
- **`useDockContent`.** One MutationObserver, now with `characterData: true`, because Vue updates text by node data.
- **`DockCrossfade`.** `leaving` is a set. On a retarget, every face still painting goes out (`swap(key, leave[], enter, done)`). A dock that is not laid out swaps at once. The context field `leavingId` became `leaving` (a clean break; `DockLayer` reads `ctx.leaving.value.has(id)`).

**Deleted:**
- `useDockMorph.ts`, `useDockSpring.ts` and `dockMorphMeasure.ts`.
- Their tests: `GlassDock.motion-parity`, `GlassDock.stagger`, `dockMorphMeasure` and `useDockMorph.anchor`.

**Gates re-authored for the new mechanism:**
- **`g-dock-lattice.test.ts`.** The layout gate checks the `OFFSET_ROUNDING_PX` regexes and requires exactly three `getBoundingClientRect(` reads. The scene has one ResizeObserver, no MutationObserver, and `content.subscribe(check)`. The N-1 gate checks the anchor and the `--dock-flow-*` writes, and that no `transform-origin: center` remains.
- **The smaller test files.** `useDockContent.test.ts` covers `characterData`. `useDockBody.test.ts` covers the stalled step and the replay at 60 Hz. The a11y switcher test covers "not laid out swaps at once". The readonly type test uses `leaving`. `drive-tokens.test.ts` loses the stale `--dock-morph-t` clause.

**Deviations from the pass-2 B′ sketch, each forced by a measured failure:**

| Change | Measured cause | Evidence |
|---|---|---|
| `characterData: true` | W3 `ticking` 9.56 px step in Chromium | `nochardata` plant fails `ticking` in Playwright WebKit (×5.49) |
| sub-pixel refine | W3 `lattice` seatStep 0.99 px in Playwright WebKit (integer offset rounding) | `b4/` subpx evidence; `nosubpx` plant fails `lattice` |
| flow as CSS registered props, hold only when overflowing | the 4× 40-seat expand re-checked every frame (7529 vs 677 `getComputedStyle` calls; flow margins resized a flex-shrunk dock) | `nohold` plant fails `recheck` (21 and 19 late frames) |
| hold not on every dock | b7 (hold everywhere) threw "ResizeObserver loop completed with undelivered notifications" in Playwright WebKit `lattice` | `b7/full-light.log`; b8 W3 Playwright WebKit 29/29 |
| multi-face leave on retarget | a retarget mid-swap left a face at 0.98 that vanished in one frame | `single` plant fails `retarget` `leaving` in every case |
| cadence step on a stall | ST `2raf` ×1.11-1.13 in Playwright WebKit under load. NOT-REPRODUCED at load ~25, but the capped step is the wrong replay | `nocadence` plant fails ST Chromium `2raf` |

Write de-duplication: `setClip` and the translate write skip unchanged values. It measured no cost benefit. It is kept because it is two compares, not because it pays.

## 2. Typecheck, unit tests, build (final tree)

Every command ran in the worktree, with vite and vitest caches and outputs in the worktree's ignored dirs or the scratchpad (wrapper configs only set `cacheDir`). Logs are in `records/checks/`.

| Check | Result | Log |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | `final-tsc.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` (after the lib build) | exit 0, 0 errors | `final-tsc-tests.log` |
| `vitest run`, full suite, no dist | 236 files pass, 4 fail; 2298 tests pass, 9 fail, 10 expected-fail, 8 skipped | `final-vitest.log` |
| the same on HEAD+floor-v2 (`wtb`), no dist | 239 files pass, 4 fail; 2313 pass, 9 fail. **The same 9 failures** (diff of the FAIL lists is empty) | `final-vitest-base.log` |
| `vite build` (library) | exit 0, no warnings or errors | `final-build.log` |
| `vite build --config demo/vite.demo-dist.config.ts` | exit 0 | `final-demo-build.log` |
| the 4 failing files after both builds | `public-surface`, `backdrop-prefix-normalization`, `FourierField.smoke`: pass. `boot-graph`: 14/14 | `final-vitest-dist.log`, `final-vitest-bootgraph.log` |

All 9 failures come from missing build outputs and pass once `dist/` and `dist-demo/` exist. The prototype has 3 fewer test files and 15 fewer tests than the base: the 4 deleted files, less the new `useDockBody` file.

## 3. H3 witnesses, both engines

The reading is b8, light, `records/b8/full-light.log`, at load 59.6 at the start and 65.4 at the end; per-cell loads are in the log. Dark readings are in `b8/{ST,W3,FM,W1}-dark.log`. Reruns are in `b8/rerun-dark-*.log` and `b8/bisect-W1-morph-collapse.log`.

| Witness | Chromium | Playwright WebKit (unshimmed) | Note |
|---|---|---|---|
| W1 | 17/17, 3 OB | 16/17, 3 OB | WebKit `morph·warm-collapse` corner 2.78 px (bound 2.5) at load 55.1. **NOT-REPRODUCED**: 8 reruns on b5/b6/b7/b8 at load 23-36 all pass, worst 0.81-1.53 px; b8 itself 0.81 and 1.22 |
| W2 | 7/8 | 7/8 | `route1·long-run-v` keyboard (seats need 592 px vs budget 536). It fails the same way on floor v2 (`FLOOR-V2-records`) |
| W3 | 26/26, 3 OB | 29/29 | includes `swap-long`, `swap-short`, `swap &three`, `compaction`, `lattice`, `ticking`, `stretch`, `neighbour` |
| W4 | 13/13 | 13/13 | |
| W5 | 6/6 | 6/6 | |
| W6 | 4/4 | 4/4 | |
| W7 | 18/18 | 18/18 | |
| W8 | 12/15 | | 3 UNMEASURED consumer cells (value.js fenced; keyframes and fourier need headed real-GPU runs) |
| R6 | 1/1 | 1/1 | |
| ST | 5/5 | 5/5 | |
| FM | 6/6 | 6/6 | |
| Safari | UNMEASURED (owner's safaridriver checkbox) | | |

### Dark (`DOCK_HARNESS_THEME=dark`)

| Witness | b8 first reading (load 56-89) | Reruns, twice each (load 14-25) |
|---|---|---|
| W3 | 49/58, 4 UNMEASURED (sampler starved at load 84). Playwright WebKit `lead-add` window 407 ms with a 125 ms stall; Playwright WebKit `wide·collapsed-rest` "no plate painted" | `^(lead-add\|wide)` plus the morph set: 20/22 pass, 2 OB, both reruns. `lead-add` window 231-233 ms in both engines; `wide` faces 0-1 px. The first-reading failures are load-only (NOT-REPRODUCED) |
| W1 | `card` cells FAIL in Playwright WebKit | `card·first-expand/warm-collapse/warm-expand` FAIL in both reruns on "lossless rest radii differ by 3.88 px / fitted r spread 4.59 px". That is the card register's radius (24 vs 28), the Q-12 OWNER-BLOCKED substance, and floor v2 fails it the same way. Every `morph` and `vmorph` cell passes in both engines (WebKit warm-collapse corner 1.22-1.30 px) |
| ST | 5/10, 5 UNMEASURED (Playwright WebKit) | instrument; floor v2 shows the same (`FLOOR-V2-records/run-ST-dark.log`) |
| FM | Chromium "the video shows no trigger marker" ×6 | instrument (the dark marker); floor v2 shows the same (`FLOOR-V2-records/run-FM-dark.log`) |

### Adapter law (H-6)

`node harness/adapter-law.mjs pass-3/adapter-floor-v2.mjs` gives "L-1..L-5 hold". Its diff against `harness/adapter-head.mjs` is 44 changed lines (`records/checks/adapter-law.log`); the diff (45 lines with its header) was read here. The changes:

- the header;
- `config` binds the grouped `scroll` prop (compact and rim);
- the webkitShim is removed;
- `posture()` reads `compact`;
- `budget()` subtracts the root's main-axis margins;
- `rim()` reads `.dock-rim`; `compact()` is true; `badge()` reads `.dock-seat-badge`.

All of these are DOM reads. B′ itself needs no adapter change.

One thing to know: `budget()` reads computed margins, which include the flow margins while a morph runs. At rest the flow is cleared (`clearFlow()`), so the budget reads the N-4 gutter alone.

## 4. H3-4: the stall arms and the replay in paint

- **ST** (`full-light.log`): 10/10. `same-task` and `1raf` leave rest at the block end (1200 ms / 1240 ms) and travel 0-0.03 px before it. `2raf`, `100ms` and `mid-flight` move before the block and land after it.
- **Crit `stall`** (`b8/crit-b8.log` against `crit-base.log`, Chromium, 2 reps, 1200 ms block). Widths from the first frame off rest:

  | Build | `same-task` | `1raf` |
  |---|---|---|
  | B′ | 189→316→390 and 140→268→356→436→465 | 244→354→416 and 140→241→356→426 |
  | Base | 481 in one frame | 481 in one frame |

  B′ replays from rest at the cadence; the base leaps to the end in one frame. In Playwright WebKit the crit arm's sample window held no frame off rest in either build. ST covers the WebKit replay.
- **Unit tests.** `useDockBody.test.ts` has "stalled frame steps one frame at the cadence" and "stall at the trigger replays from rest at 60 Hz".
- **Plant.** `nocadence` (stall steps the capped 33.3 ms) fails ST Chromium `2raf` (`b8/plant-nocadence.log`).
- **Under load.** b5 showed ST Playwright WebKit `2raf` ×1.11-1.13 and dark Chromium ×1.01-1.03 at load 50+. Reruns at load ~25 passed (`b5/rerun-dark-ST-*.log`): NOT-REPRODUCED.

## 5. The §4.3 obligations

| # | Obligation | Status | Evidence |
|---|---|---|---|
| 1 | Coverage at seat depth: a swap never blanks (H3-1) | **MET** | see "Obligation 1" below |
| 2 | Compact-rung leaving seats leave by a fade or progressive clip that coverage does not override (H3-3) | **MET** | see "Obligation 2" below |
| 3 | H3-4 stall arms run; the replay shows in paint | **MET** | §4 |
| 4 | Re-read Q-7 (hit follows paint) on the prototype | **MET** | see "Obligation 4" below |
| Both-a | The warm collapse carries its content with the glass, no clear in the first 40-80 ms | **MET** | see "Both-a" below |
| Both-b | The swap has no near-blank trough | **MET** | see "Both-b" below |

**Obligation 1.**
- W3 `swap-long`, `swap-short` and `swap &three=1` pass in both engines.
- Probe `retarget` (swap retargeted at 40, 80 and 120 ms, 3 reps, both engines, `b8/probes-proto.log`): 0 blank frames in every cell. Vanish ≤ 0.44.
- Probe `trough`: the lowest moving-frame ink is ≥ 1.0 of the lower rest in every swap cell.
- The `nowipe` plant fails `blank`, `overlap` and `leaving`.

**Obligation 2.**
- W3 `compaction` `leaving` passes in both engines.
- The leave is the scene's silhouette clip, which nothing else writes over.
- Crit `ghosts`: o=1 and 0 clones on the measured seats, which leave by clip, not by fade.
- `noclip` fails `seatOverlap`, `leaving` and `faces`; `noghost` fails `lead-remove` and `content-remove` `leaving`.

**Obligation 4.**
- Probe `hit` (`b8/probes-proto.log`): painted centres hit their own seat:

  | Engine | Collapse | Expand |
  |---|---|---|
  | Chromium | 10/10 | 26/26 |
  | Playwright WebKit | 11/11 | 30/30 |

- Box centres the clip has hidden hit that seat 0 of 4, 23, 2 and 15 times. Q-7 holds: hit follows paint.

**Both-a.** Probe `trough` gives `kept40` and `kept80`, the share of rest ink kept at 40 and 80 ms (`probes-proto-2.log` against `probes-base.log`, 2 reps each):

| Engine | | `kept40` | `kept80` |
|---|---|---|---|
| Chromium | B′ | 0.98, 0.78 | 0.64, 0.48 |
| | base | 0.75, 0.62 | 0.38, 0.32 |
| Playwright WebKit | B′ | 0.65, 0.64 | 0.43, 0.43 |
| | base | 0.55, 0.75 | 0.31, 0.43 |

The content is never cleared; it is clipped by the closing edge (`b8/film/strip-*-warm-collapse.png`).

**Both-b.** Swap troughs:

| Engine | B′ `swap-long` | B′ `swap-short` | Base |
|---|---|---|---|
| Chromium | 1.09, 1.10 | 1.40 | 0.95 or null (the swap is instant: 0-1 moving frames) |
| Playwright WebKit | 1.32, 1.58 | 1.40 | 0.95 or null |

Warm-expand troughs: B′ 1.19-1.38; base reaches 0.338 in both engines.

Retarget (`b8/probes-proto.log`, 18 cells): 17/18 pass. Chromium `afterMs` 120, rep 1 shows a 1-frame overlap of 0.21 px between seats 4 and 7, a sliver-seat edge of the instrument, and the other 17 cells have 0 overlap frames. It is recorded, not cured.

## 6. G critic arms

| Arm | B′ (b8) | Base (HEAD+floor-v2) |
|---|---|---|
| `vagree` (painted vs adapter extent in flight) | worst out 0.53 px (Chromium `vmorph·collapse`), ≤ 0.64 everywhere | `morph·collapse` 40.0 px (Chromium) and 50.9 px (Playwright WebKit) in flight, 20.85 px at rest |
| `stall` | replays from rest (§4) | leaps 102→481 in one frame |
| `seam` | identical to base (`b8/seam-*.png`) | |
| `ghosts` | o=1, 0 clones (leave by clip) | |
| `nomo` analog | the content path without notification: `nosub` (no content subscription) fails `stretch` in both engines; `nochardata` fails `ticking` in Playwright WebKit | |

## 7. Plants (`pass-3/D2-Bp-p3-plants.py`, b8 tree, logs in `b8/plant-*`)

| Plant | Taken out | Caught by |
|---|---|---|
| `noclip` | per-unit silhouette clip | W3 `seatOverlap`, `leaving`, `faces` |
| `nowipe` | exchange wipe | W3 `leaving`, `overlap`, `blank` |
| `noflow` | flow margins | W3 `neighbour` ×4 |
| `nohold` | size hold | probe `recheck`: 21 / 19 late frames, 6594 / 5674 late calls (bound 0) |
| `nosub` | content subscription | W3 `stretch`, both engines |
| `nochardata` | `characterData` | W3 `ticking`, Playwright WebKit |
| `single` | multi-face leave | probe `retarget` `leaving`, every cell |
| `noghost` | retired-seat clone | W3 `lead-remove`, `content-remove` `leaving` |
| `nosubpx` | sub-pixel refine | W3 `lattice` seatStep, Playwright WebKit |
| `nocadence` | cadence step on stall | ST Chromium `2raf` |

## 8. Cost row

The quieter reading is `b8/cost-rerun1/`, at load 21-27. The first reading, `b8/cost-*.log` at load 47-73, is kept beside it. Chromium is traced; Playwright WebKit gives dt only.

| Engine, throttle, seats | B′ p95 / max / >25 ms / main ms per frame | Base |
|---|---|---|
| Chromium 1×, 0-40, expand and lead | p95 8.7-10.0, 0 frames > 25 | p95 9.4-9.8 |
| Chromium 4×, 40, expand | 16.4 / 34.2 / 1 / 1.38 | 18.0 / 41.6 / 2 / 4.01 |
| Chromium 4×, 20, expand | 10.1 / 17.1 / 0 / 0.76 | 16.9 / 25.8 / 1 / 3.35 |
| Chromium 4×, 40, lead | 25.7 / 66.6 / 3 / 2.47 | 10.1 / 16.4 / 0 / 0.43 (the base does not animate a lead: 0 morph frames) |
| Chromium 4×, 20, lead | 18.1 / 39.9 / 1 / 1.84 | 9.6 / 23.1 / 0 / 0.40 |
| Playwright WebKit 1×, 0-40, lead | p95 12-13, 0 frames > 25 | p95 12 |

- **Idle.** The scene parks after a morph: 240 rAF calls per 2 s before and after in Chromium; 196 against 196/197 in Playwright WebKit.
- **`pblock`.** Lands after a 1.2 s block, with the step across the gap at 0.062 D (Chromium) and 0.083 D (Playwright WebKit).
- **The expand morph is cheaper than the base**: about 1/3 of the main-thread time per frame at 4×.
- **The lead morph costs what the base never pays.** At 4× with 40 seats it costs 3 frames over 25 ms. That is the open cost item.

## 9. Prose sweep

Every file in the patch was swept for:
- the deleted names (`useDockMorph`, `useDockSpring`, `dockMorphMeasure`, `leavingId`, `clearMargins`, `--dock-morph-t`);
- pass-number citations;
- "coverage" where the mechanism is the clip;
- TODO, legacy and compat language.

There were none in the final tree. `grep -rn` over `src`, `tests` and `demo` for the deleted names returns nothing.

**Prose updated:**
- `useDockScene` header: positions, anchor, triggers, the flow and the hold; H3-1 / W3 `swap-long` replaces the pass-2 citation.
- `useDockBody`: cadence and stall.
- `useDockContent`: `characterData`.
- `DockCrossfade` and `dockCrossfadeContext`: the leaving set.
- `DockLayerGroup`, `index.ts`: "the swap is the dock scene's exchange".
- `cta-seat.css`, `layers.css`, `triggers.css`: the silhouette clip.
- `icon-button.css`.
- `styles/index.css`: the flow lengths and size hold.
- `shape.css`: the per-frame geometry writes.
- `demo/stories/dock/overview.vue`.

One known residue: 18 added or edited lines carry the files' existing spaced em dash (list items and the house banner style in `index.css`, `overview.vue` and `dock-search.vue`). They were left in the file's own style.

## 10. Open gaps

1. **The swap's hard wipe seam.**
   - Mid-swap, about two tiles show spliced glyphs where the outgoing and incoming faces meet: "Bools", a clipped "A", a "1" over "P" in the warm collapse (`b8/film/strip-chromium-swap-long.png`, `strip-chromium-warm-collapse.png`).
   - No witness fails on it.
   - It is a look question: a feathered mask, or an exclusion lane wider than one face.
2. **4× lead cost.** Chromium 4×, 40 seats: p95 25.7 ms, 3 frames over 25 ms. The base does not animate leads, so it pays nothing.
3. **W1 Playwright WebKit `morph·warm-collapse` corner.** 2.78 px at load 55 (bound 2.5). It passes in 8 reruns (0.81-1.53 px) but is noisy (vmorph range 1.28-2.85 across b4-b8).
4. **A capped dock with a seat transition.** The hold is overflow-only because the hold on every dock raised the ResizeObserver loop error in Playwright WebKit (b7). A consumer that caps the dock and animates seats could approach that loop again. It is unmeasured.
5. **Consumer CSS.** Unlayered consumer margin rules on `.glass-dock` would override the flow rules, which are layered. It is unmeasured.
6. **Rotation.** The sub-pixel refine is bounded to ±0.5 px. A rotated or skewed dock ancestor falls back to the integer offset.
7. **Safari.** UNMEASURED (owner's safaridriver checkbox).
8. **W8 consumers.** UNMEASURED (value.js fenced; keyframes and fourier need headed real-GPU runs).
9. **Q-12 and Q-4 cells.** OWNER-BLOCKED: W1 `card` radius and the OB cells in W1 and W3.
