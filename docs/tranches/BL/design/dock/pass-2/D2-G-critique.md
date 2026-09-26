# D2 · pass 2 · D2-G critique: the sliding aperture

| field | value |
|---|---|
| seat | D2 pass 2, adversarial critic of route D2-G. Did not author the block test, the spec, the prototype or the floor. Judges against REGISTRY §7.5's fixed checklist only; new defect classes go to §7 ("next pass"), not into the checklist |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **ADVANCE**, convergence **52 %** (11 of 21 checklist rows pass, §3) |
| tree measured | a scratch worktree at `502c27c7`; `floor.patch` (sha256 `de432032f18918a1…`) then `D2-G-proto.patch` (sha256 `ba826c6a8ee7313b…`) applied clean. Three builds from it with `../harness/build.mjs`, outputs and caches in scratch: `crit` (floor + G), `floor` (the G patch reversed, the control) and `nomo` (G with its `MutationObserver` not observing, a plant). The worktree was removed with `git worktree remove --force` before return |
| adapter | `adapter-G.mjs` (sha256 `4081383f…`), unchanged. Reviewed in §2 |
| engines | Chromium headless; **Playwright WebKit** headless (Playwright 1.61.1). `adapter-G` carries no shim, so every WebKit cell below is the **unshimmed** result (there is no shimmed one), and 0 cells crashed. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell; the run log carries safaridriver's refusal ("session not created … timed out while connecting to a Safari instance") |
| records (source of record) | `D2-G-crit-records/`: `run-light.log` (full H2, both engines), `w3-rerun{1,2}.log`, `w1-vmorph-rerun{1,2}.log`, `plant-nocaps-w7.log`, `plant-nomo-w3.log`, `crit-vagree.{json,log}`, `crit-stall-{G,floor}.{json,log}`, `crit-seam-ghosts-G.{json,log}`, `crit-seam-floor.{json,log}`, `cost-crit-2raf.{json,log}`, `cost-crit-after100.{json,log}`, `cost-floor-after100.{json,log}`, `bpcrit-arms-{G,floor}.{json,log}`, `film.{json,log}` + `film/crit-{chromium,webkit}-*.png`, `adapter-law.log`, `vitest-dock.log`, `typecheck.log`, `build*.log`, `chain.sh` |
| tools written | `D2-G-crit-probes.mjs` (arms `vagree`, `stall`, `seam`, `ghosts`); `D2-G-crit-plant-nocaps.mjs` (a planted adapter: `edge()` returns nothing). Reused unchanged: `D2-Bp-crit-probes.mjs` (arms `blank`, `lattice`, `infanim`, `popdetail`, `film`) and `D2-G-cost.mjs`. No harness file changed |
| load | 1-minute load average beside every cell in the records: 34.6-50.5 (H2 run), 37-45 (W3 re-runs), 28.7-32.4 (`vagree`), 44-62 (probes, cost, film). Other seats ran headless browsers throughout; the load never fell below 8, so every timing reading that fails only some runs is **NOT-REPRODUCED** under the load law |
| fences | checkout writes: this file, `D2-G-crit-probes.mjs`, `D2-G-crit-plant-nocaps.mjs`, `D2-G-crit-records/`. Git writes: `worktree add`, `worktree remove`. The unit run used a scratch-cached vitest config inside the worktree, so nothing was written into the checkout's `node_modules` |

---

## 0 · In brief

- **The centre holds where the route claimed it.** The window is a stadium in every rung and orientation in both engines; lossless in-flight screenshots put the painted extent on the DOM model within 0.01-0.29 px in Playwright WebKit (`vagree`). The reversal hands its velocity on (released at −3.07 to −3.15 px/ms, trajectory after the retarget 0.78-7.06 px against a tolerance of 7.09-8.5). With a block that starts 2 rAFs (Chromium) or 100 ms (Playwright WebKit) after the flip, the extent runs to its target inside the block while the floor freezes (§4.5). W4 13/13, W5 6/6, W6 4/4, W8 6/6 and R6 reproduce in both engines, and there are 0 crashed unshimmed WebKit cells.
- **Four route-owned rows fail, each with a counterexample:**
  1. **The carrier snaps the library's own size transitions** (item 3, the gestalt). `run()` calls `finish()` on every layout-property `CSSTransition` in the dock (`useDockAperture.ts:94-96`). On run.css's open-seat exchange (`inline-size 0.21s` on `aria-current` cells) the seats step 94.67 px (Chromium) and 95.91 px (Playwright WebKit) in one frame, with 1 intermediate width. The floor paints 25 / 20 intermediate widths with a worst step of 6.97 / 9.53 px. The harness's `seat-transition` cell passes because it judges the extent's owners, not the seat's own width. This is the class B′'s critic found as CX-2.
  2. **The compositor claim does not cover a stall at the flip** (item 5). A block that starts in the same task as the posture call, or one rAF after it, freezes G at its rest in **both** engines, and the extent then lands in one video frame (102 → 480 px in Chromium). The floor reads the same. In Playwright WebKit a block 2 rAFs after the call still freezes G (travel 19-28 px of 380, stall 720-760 ms), as the prototype reported. The script cost of one flip is 3.8-14 ms against the floor's 0.4-4.2 ms (prototype, reproduced in form, not re-run).
  3. **Two triggers, the second not load-bearing** (floor row 5). With the carrier's `MutationObserver` planted out (`nomo`), W3 `lead-add` and `ticking` pass in both engines, which are the two cells the prototype cited as its witnesses. The RO alone carries them. The dock band also keeps `useDockRun`'s roving MutationObserver on the same `childList`.
  4. **The reversal window** (item 4, R-4): 283-286 ms after the retarget against allowances of 257.3-272.6 ms, in both engines on 3 of 3 runs, while the handoff itself passes. The same cell fails on B′ in Chromium; it is the rest-to-rest clock of H-3d meeting a lane released at −3.1 px/ms.
- **Shared rows fail on the same cells as the floor and B′:** W1 `card` (the harness requires one card radius; the floor's card is 27.93 px collapsed and 24.05 px expanded), W2 `route1·long-run-v` keyboard (F-19), W3 `anchor-end·*` (189.83 px, `margin-inline: auto`) and `viewport-resize` (6.09 px, no window).
- **One of the prototype's open gaps is an instrument artefact, and one is closed.** The Playwright WebKit W1 `vmorph·warm-collapse` `agree` failure (1.02 / 1.25 / 114.98 px across three runs) comes from the screencast: in the failing video the *static* expanded rest reads 282.96-283.3 px against the DOM's 281, and one frame is blank (w 0.52 px). Lossless in-flight screenshots of the same move read 0.01 px outside the DOM bracket (§4.1). The `edge()` harness read is not vacuous: the no-caps plant fails W7 `whole` on 34 of 36 cells (§2).
- **Why ADVANCE and not BANK or RETIRE.** RETIRE was named for a failed velocity handoff (REGISTRY §6 Q3), and the handoff holds. BLOCK was named for a dead lens (Q1), and the lens lives. Each failing route-owned row is a defect inside the mechanism (an over-broad `finish()`, a duplicated trigger, stale prose), or a limit that has a measured shape (the first two frames). None needs a missing primitive. The route has not shown the cost win that REGISTRY §7.3 item 5 makes its justification: the win is real after commit, absent before it, and the price is 12 boxes and an 841-line carrier.

---

## 1 · What this seat re-ran

| run | command (from `D2-G-crit-records/chain.sh` and the logs) | result |
|---|---|---|
| H2, light | `run.mjs --build crit --adapter adapter-G.mjs --safari` | W1 19/21 (+1 UNMEASURED) · 18/22; W2 7/8 · 7/8; W3 11/16 (+3 UNMEASURED) · 14/19; W4 13/13 · 13/13; W5 6/6 · 6/6; W6 4/4 · 4/4; W7 6/18 · 6/18; W8 6/6 · 6/6; R6 1/1 · 1/1 (Chromium · Playwright WebKit); 0 crashed; Safari UNMEASURED |
| W3 ×2 more | `w3-morph.mjs --engine all` | 29/38 twice (§3 row P3) |
| W1 vmorph ×2 more, WebKit | `w1-corner.mjs --engine webkit --cells '^vmorph'` | 4/5, 3/5 (§4.1) |
| plant `nocaps` (adapter) | `w7-edge.mjs --adapter D2-G-crit-plant-nocaps.mjs --engine all` | `whole` fails 34/36 cells (§2) |
| plant `nomo` (build) | `w3-morph.mjs --build nomo --cells '^(lead\|ticking\|content)'` | `lead-add`, `lead-remove`, `ticking` PASS in both engines (§3 row F5) |
| `vagree` | `D2-G-crit-probes.mjs --arm vagree --reps 4` | §4.1 |
| `stall`, G and floor | `D2-G-crit-probes.mjs --arm stall --reps 2` | §4.5 |
| cost, reproduced | `D2-G-cost.mjs` on `crit` (2 rAFs; after 100 ms) and `floor` (after 100 ms) | §4.5 |
| B′ critic's arms on G, floor as control | `D2-Bp-crit-probes.mjs --arm blank,lattice,infanim,popdetail` and `--arm film` | §4.2-4.4, §6 |
| `seam`, `ghosts` | `D2-G-crit-probes.mjs --arm seam,ghosts` (seam also on `floor`) | §4.3, §6 |
| units | dock suites through a scratch-cached vitest config | 15 files, 131 passed, 1 expected fail |
| types | `vue-tsc --noEmit` | exit 0 |

The prototype's numbers reproduce where this seat re-read them: the first expand (trajectory 1.13 px of 16.19), content and lead cells, `seat-transition` owners 0, W4 `compact·non-first-current` (worst step ×0.6 / ×0.53, 0 overlap), the reversal handoff, W7's edge sub-checks on the top dock (Chromium `top·light·dpr2` median 11/255, weakest 3/255, corner 0.084 px), and the cost rows at 2 rAFs and 100 ms.

---

## 2 · The adapter (H-6)

`adapter-law.mjs adapter-G.mjs --diff`: **PASS**, L-1..L-5 hold, 41 changed lines against `adapter-head.mjs` (`adapter-law.log`). Against `adapter-floor.mjs` the diff is three reads:

- `plate()` → `:scope > .dock-aperture .dock-plate`, and `extent()` stays `paintedRect(plate)`, which folds the doors' `overflow: clip` rects and transforms. A DOM read of what the doors clip, not a family input. W1 `agree` compares it with pixels in every morph sample, and this seat compared it again with lossless in-flight screenshots (§4.1).
- `rim()` follows the plate.
- `edge()` (new, optional) → the two `.dock-cap` elements; the probe's `edge` paint mode shows them beside the plate. The prototype shipped it without a self-test pair (its open gap 9). **The plant half is now run:** `D2-G-crit-plant-nocaps.mjs` returns no caps, and W7 `whole` fails on 34 of 36 cells in both engines (`plant-nocaps-w7.log`). The two cells it misses are both Chromium dark at DPR 2 (`top·dark·dpr2` passes; `canvas·dark·dpr2` fails only `gutter`), where the edge median is 4/255, at the witness's own floor. The fixture half (a split-cap reference that passes) is still not in `selftest.mjs`.
- `paintingSeats()` is unchanged in form: `visibleOpacity` along the chain, never intersected with `extent()` (L-2). The `ghosts` arm confirms the carrier's clones are not seats to the adapter (their `data-dock-seat` is removed), so leaving seats are judged by the originals and read as a one-frame pop by any seat-based arm; §4.3 reads the clones directly.

The W3 `owners` census reads `document.getAnimations()` including WAAPI (`lib.mjs:556-568`), so its 0 on this carrier is a reading, not an absence of instrument. **H-6 holds.**

One observation on what H2 can see here: W3's continuity, trajectory and landing read `getBoundingClientRect()` through WAAPI transforms, which is the engine's own sample of the carrier's keyframes. For this route those DOM rows judge the solved curve; only W1 (screenshot and screencast) and this seat's `vagree` and `stall` arms judge paint. That is recorded for the next pass (§7), not held against the row.

---

## 3 · The checklist (REGISTRY §7.5, fixed)

21 rows: the five problems under H2 in both engines (5), floor rows 1-7 (7), §7.3 D2-G items 1-5 (5), and "Both" (4: every cell in both engines under a reviewed adapter; the filmstrip gestalt read; the `DockProps` count; the prose sweep). The real-Safari clause of "Both" applies "as soon as the checkbox is ticked" and is not triggered; it is not counted.

| row | verdict | evidence (records) | counterexample when it fails |
|---|---|---|---|
| **P1** stadium in every rung and orientation | FAIL (shared) | W1 19/21 · 18/22; every rest, rail end, `morph` and `vmorph` morph cell's `corner` green in both engines | `card·first-expand`, `card·warm-collapse`, `card·warm-expand`: the corner is circular in every frame (worst 0.094-0.119 px Chromium; 0.88-1.75 px Playwright WebKit screencast), but `card` requires one radius and the card's rests are 27.93 and 24.05 px (lossless rest radii differ by 3.88 px). The floor and B′ fail the same three cells. The fourth red cell, Playwright WebKit `vmorph·warm-collapse` `agree`, is an instrument artefact (§4.1) |
| **P2** the run scrolls only on genuine overflow, paint box apart from the port | FAIL (shared) | W2 7/8 · 7/8; route 5 (consumer width) green; ring cut 0/0 on route 1 | `route1·long-run-v` keyboard reach 10/11 (Seat 1), identical at HEAD, the floor and B′. Owner: F-19 / D1 |
| **P3** one continuous extent morph | FAIL | W3 run of record 11/16 (+3 UNMEASURED) · 14/19, re-runs 29/38 twice | `reversal` `window` in both engines, 3 of 3 runs: 283.0-284.7 ms after the retarget in Chromium against 257.3-257.9 ms; 284-286 ms in Playwright WebKit against 268.6-272.6 ms (one WebKit run passed, 326 ms against a 301.6 ms allowance at a 44 ms stall). `anchor-end·*` 189.83 / 189.86 px and `viewport-resize` 6.09 px on every run (shared). NOT-REPRODUCED under load: Chromium `warm-collapse` window 258.1 vs 257.4 ms (1 of 3), Playwright WebKit `content-remove` and `lead-add` continuity (1 of 3), Playwright WebKit `swap-short` continuity ×1.05 / ×1.15 (2 of 3, all at load 39-45) |
| **P4** state inputs | PASS | W4 13/13 both engines: `compacts`, hysteresis, `late-getter`, `shared-scroller`, `press-then-scroll`, `prm·compact`, `coarse·no-hover-latch`, `coarse·tap-pins` 0 clicks | — |
| **P5** rim clipped by the dock's radius | PASS | W5 6/6 both engines, including `el-source` and `h·compact` | — |
| **F1** corner; seats at any depth | PASS | W1 rests (r 28 / 32 within 0.14 px); W2 `route6·depth` | — |
| **F2** rim as a plate child on the one source | PASS | W5 6/6 | — |
| **F3** hover gate, coarse press | PASS | W4 `coarse·*` both engines; the root's `pointer-events: none` does not break them | — |
| **F4** the P4 machine | PASS | W4 compact cells both engines | — |
| **F5** endpoint model, one trigger per fact | FAIL | endpoints hold: `first-expand` continuous (×0.65), `hidden-shown` 0 px | the carrier adds a `MutationObserver` on the root (`useDockAperture.ts:795`) beside the endpoint RO, and `useDockRun.ts:399` keeps a second MutationObserver on the same `childList`. The `nomo` plant passes `lead-add`, `lead-remove` and `ticking` in both engines without it (`plant-nomo-w3.log`), so the witnesses the prototype cited do not fail without the second trigger (PF-5). `--dock-expanded-px` / `--dock-collapsed-px` are still written on every RO delivery with no CSS reader |
| **F6** crash-free edge | PASS | 0 crashed of every unshimmed Playwright WebKit cell | — |
| **F7** `g-dock-lattice` as invariants | PASS | dock suites 15 files, 131 passed, 1 expected fail (`vitest-dock.log`); `vue-tsc` exit 0 (`typecheck.log`) | — |
| **G1** §6 questions 1-5, in order, BLOCK or RETIRE at each named failure | PASS | Q1 lens live (block test; W8 `unsharp 0`, W6 one backdrop plate). Q2 extent moves under a block once committed (§4.5). Q3 handoff holds (W3 `reversal` trajectory after the retarget within tolerance in both engines). Q4 edge and shadow: W7 edge sub-checks green; no seam at rest (`seam`: shade centre column 0.10-0.16 against 0.13-0.17 elsewhere, equal to the floor). Q5 answered: hits clip to the window's rectangle, not its arc (prototype) | no named BLOCK or RETIRE condition occurred. Q5's answer is negative for Q-7 (a) at the corners, and Q2's answer excludes the first frames (§4.5); both are recorded answers, not failures of this row |
| **G2** W1 with H-1 green in both engines | FAIL | every `morph` / `vmorph` morph cell green in Chromium; `agree` green on every WebKit morph cell but one | the three `card` cells in both engines (row P1), and Playwright WebKit `vmorph·warm-collapse` `agree` red in 4 of 4 runs across the prototype and this seat (1.02, 1.25, 114.98 px here). The cause is the screencast (§4.1), so the cure is the harness's, but the item asks for green |
| **G3** seat obligations (B′ items 1 and 7) | FAIL | per-seat FLIP: `lead±`, `content±`, swaps: seat step ≤ ×0.84, 0 overlap frames; compaction: W4 13/13, the leaving seats' clones fade 1 → 0.826 → 0.624 → 0.415 → 0.235 → 0 over five frames in Chromium (four in WebKit) while the plate closes (`ghosts`) | the open-seat exchange, a size change the library's own CSS carries, steps 94.67 / 95.91 px in one frame with 1 intermediate width, where the floor paints 25 / 20 (`lattice`, §4.2). An infinite size animation on a seat holds `data-morphing` open on 223 of 241 frames (Chromium) and 138 of 159 (Playwright WebKit), restarting an episode each frame (`infanim`) |
| **G4** W3 R-1..R-5 on the floor's endpoint model, content changes and swaps | FAIL | R-1 `first-expand` PASS; R-2 content and swap cells open a window and follow the rung; R-3 dead landings everywhere; R-5 owners 0 everywhere | R-4: the `reversal` window (row P3), 3 of 3 runs in both engines |
| **G5** the cost row, where G must win | FAIL | Chromium, block 2 rAFs or 100 ms after the flip: G lands inside the block, stall 0 ms (2/2 each); the floor freezes 1,160 ms (2/2). Playwright WebKit, block 100 ms after: G runs 87 → 459 video px (the target) inside the block (2/2); the floor reaches 331-363 and freezes 680-720 ms | a block in the same task as the flip, or 1 rAF after it: G freezes at rest in **both** engines and lands in one video frame (Chromium 102 → 480 px; WebKit 87 → 459), exactly as the floor does (`crit-stall-*.json`, §4.5). Playwright WebKit, 2 rAFs after: G travels 19-28 px of 380 through the block (stall 720-760 ms). Script per flip 3.8-14 ms against the floor's 0.4-4.2 ms (prototype `probes-g6.log`) |
| **Both-1** every cell in both engines under H2, reviewed adapter | PASS | §1 full run, both engines, 0 crashed, unshimmed; adapter reviewed §2 | — |
| **Both-2** filmstrip gestalt: first expand, warm pair, swap, content change (D-1, D-2) | FAIL | §6 | the warm collapse empties the plate first: in the first captured tile (≤ 40 ms) the full face is gone and the wide plate closes around nothing for the rest of the move (`film/crit-chromium-warm-collapse.png`). The swap's crossfade passes through near-blank glass (highest seat opacity 0.013 Chromium, 0.076 Playwright WebKit; `blank`). Every landing is dead (Q-5 default (a)). The Playwright WebKit warm pair, swap and content strips show only the landed rest (the film tool's trigger alignment), so those four WebKit reads are not made |
| **Both-3** `DockProps` count against Q-3 | PASS | 7 (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`); G adds none | — |
| **Both-4** prose sweep of every touched file (PF-10) | FAIL | the prototype's grep (`dock-morph-t`, `--dock-t`, `useDockMorph`, `clip-path lens`) returns nothing | two touched files still describe the struck scale morph: `GlassDock.vue:469` ("the morph carries ONE deformation-free `--dock-size-scale` box morph on the `scale:` channel") and `styles/density.css:75` ("the dock morph carries ONE deformation-free box scale off `--dock-size-scale`"). `dockMorphMeasure.ts:26` still says the endpoints are "published as `--dock-expanded-px`" for a reader that no longer exists |

Passing: P4, P5, F1, F2, F3, F4, F6, F7, G1, Both-1, Both-3 = **11 / 21 = 52 %**.

---

## 4 · Counterexamples and instrument readings

### 4.1 · W1 `vmorph·warm-collapse` `agree` is the screencast, not the carrier

The prototype left this open (its gap 3). This seat reproduced it (1.02 px in the run of record, 1.25 and 114.98 px in the two re-runs; `run-light.log`, `w1-vmorph-rerun{1,2}.log`) and read the failing run's frames. In `w1v-rerun2`, the video's static expanded rest reads h 282.96-283.30 px for the whole pre-collapse rest (the DOM reads 281), an earlier rest in the same video reads 281.43-281.57 px, and one frame is blank (w 0.52, h 0.02), which is the 114.98 px. The disagreement sits on still frames, not in flight.

`vagree` takes lossless screenshots in flight (Playwright WebKit's `page.screenshot` does not complete a WAAPI transform: block test §2.2) and brackets each with two `extent()` reads:

| engine | cell | samples (in flight) | worst paint outside [pre, post], in flight | at rest | load |
|---|---|---|---|---|---|
| Playwright WebKit | vmorph · collapse | 66 (40) | **0.01 px** | 0.01 px | 28.7 |
| Playwright WebKit | vmorph · expand | 94 (51) | 0 px | 0.01 px | 28.8 |
| Playwright WebKit | morph · collapse | 60 (39) | 0.29 px | 0.01 px | 30.1 |
| Playwright WebKit | morph · expand | 51 (30) | 0.27 px | 0.27 px | 31.2 |
| Chromium | vmorph · collapse | 68 (40) | 1.03 px | 0 px | 32.4 |
| Chromium | vmorph · expand | 63 (34) | 0.07 px | 0 px | 31.9 |
| Chromium | morph · collapse | 65 (37) | 0.63 px | 0.03 px | 31.9 |
| Chromium | morph · expand | 65 (39) | 0.42 px | 0.32 px | 30.3 |

In Chromium every out-of-bracket collapse sample lies *past* the post read in the direction of travel (e.g. pre 163.27, post 150.26, painted 149.23): the screenshot captures a frame produced after the second DOM read. That is capture latency, and it is 0.3-1.0 px on a move of about 1.4 px/ms. **Reading:** the painted aperture and the carrier's DOM model agree in both engines; the WebKit W1 red cell is the screencast's scale and codec at the static vertical rest. A vertical-screencast `agree` bound is a next-pass harness item (§7).

### 4.2 · The open-seat exchange snaps (`lattice`)

`D2-Bp-crit-probes.mjs --arm lattice` on `crit` and on `floor`: `aria-current` moves from "One" to "Two" on an expanded morph dock; run.css carries the exchange as `inline-size 0.21s`.

| build | engine | widths of the leaving cell | worst step | intermediate widths | morph frames |
|---|---|---|---|---|---|
| G | Chromium | 136 → 134.67 → 40 | **94.67 px** | 1 | 0 |
| G | Playwright WebKit | 136 → 135.91 → 40 | **95.91 px** | 1 | 0 |
| floor | Chromium | 136 → … (27 values) → 40 | 6.97 px | 25 | 0 |
| floor | Playwright WebKit | 136 → … (22 values) → 40 | 9.53 px | 20 | 0 |

Playwright WebKit also logged "ResizeObserver loop completed with undelivered notifications" on G. The cause is `useDockAperture.ts:94-96`: every running `CSSTransition` whose property matches `LAYOUT_PROPERTY` inside the dock is finished before the layout read, so the "episode carries it" promise applies only when the change moves the dock's extent. Here the extent does not move (the two cells trade widths), so no episode opens (0 morph frames) and the transition's motion is simply deleted. K-13 asks for one owner of the dock's extent, not for a seat's own width transition to be struck.

### 4.3 · Compaction: a fade, not a pop

B′'s `popdetail` arm reads the original leaving seats and records Photos and Theme at `[1, 0]` in one frame (7.6 / 13 ms) on G. The originals are replaced by clones in `.dock-ghosts`, which the arm does not see. `ghosts` reads both: the clones hold 1.0 on the flip frame, then 0.826, 0.624, 0.415, 0.235, 0.004 (Chromium) and 0.468, 0.227, 0.004 (Playwright WebKit) while the plate goes 206.1 → 164 px. So compaction fades on the spring; it does not pop. The fade is complete by about 80 ms of a 210 ms plate move, which is the prototype's "gone before a moving seat reaches them" rule doing what it says.

### 4.4 · An infinite size animation keeps the window open (`infanim`)

A seat with an infinite alternating CSS `width` animation on an expanded dock: `data-morphing` is up on 223 of 241 frames (Chromium) and 138 of 159 (Playwright WebKit), the extent takes 218 / 154 distinct values over a 29.3 px span, and nothing throws (B′ threw `InvalidStateError` here; G's `finish()` touches only `CSSTransition`s). Each RO delivery re-plays every lane, which is the 3.8-14 ms flip cost once per frame. Recorded under item 3 as the second counterexample.

### 4.5 · The cost row: where the compositor claim ends

`stall` puts the 1,200 ms block in the same task as the posture call, or one rAF after it; `D2-G-cost.mjs` repeats the prototype's 2 rAFs and 100 ms. Screencast widths on the centre row (Chromium 1 video px = 1 CSS px; Playwright WebKit video px, where the rest reads 87 for 102 and the target 459 for 481.7).

| engine | block starts | G | floor | load |
|---|---|---|---|---|
| Chromium | same task (0.1-0.2 ms) | at rest (101-102) through the block, then 480 in one frame (2/2) | the same (2/2) | 45-48 |
| Chromium | 1 rAF (4.4-7.4 ms) | at rest through the block, then 480-482 in one frame (2/2) | the same (2/2) | 45-47 |
| Chromium | 2 rAFs | lands inside the block, stall 0 ms (2/2) | — (prototype: 120 → 120, 1,160 ms) | 61-62 |
| Chromium | 100 ms | lands inside the block, stall 0 ms (2/2) | frozen 1,160 ms (2/2) | 59-65 |
| Playwright WebKit | same task / 1 rAF | 86-87 through the block (4/4) | the same (4/4) | 44-48 |
| Playwright WebKit | 2 rAFs (23-25 ms) | 87 → 106-115 (travel 19-28), stall 720-760 ms (2/2) | — (prototype: frozen) | 64-67 |
| Playwright WebKit | 100 ms | 87 → 459 inside the block, then holds at the target (2/2) | 87 → 331-363, frozen 680-720 ms (2/2) | 57-63 |

So the compositor carries the extent once its animations are committed: from the second frame in Chromium, and somewhere between 25 and 100 ms in Playwright WebKit. Before that, G is the floor: the main thread that is blocked is the one that has to hand the keyframes over, and when it returns the whole curve has elapsed, so the dock jumps to its endpoint. A stall that coincides with the change that caused the flip (a route mount, a heavy re-render) is the case this does not cover.

---

## 5 · Review of the mechanism (outside the checklist, for the agglomeration)

- **The deviations hold up.** Dropping the flip-frame reserve (deviation 1) removes a layout write; the aperture's inline insets cover the hull instead (`useDockAperture.ts:390-396`). The cost is that the root's layout box changes at the flip while the glass still paints the old window, so an in-flow dock's neighbours reflow in one frame at the start of a collapse. No H2 scene has a neighbour, so this is recorded in §7, not judged.
- **The ink and card lerp** stay a main-thread registered-property lane (`--dock-expand-t`), as the spec said (R-3). Under the 100 ms block this seat did not read the ink; the lane holds while the extent moves.
- **Box count and size:** 2 shades with casters, the aperture, 2 doors, 2 counters, 2 caps, the face door and the ghost layer; `--dock-door-reach: 100vmax` makes each door and caster roughly two viewports long. The 841-line carrier replaces 112.
- **`useDockSpring.playTo` survives** for the run's reach glide (deviation 2). That is a second rAF writer in the band beside WAAPI; it writes `scrollLeft`, which no compositor carries, so it is honest, but canon P7's "one engine" is not strictly true of the band.

---

## 6 · Filmstrip gestalt (§7.3 "Both")

Strips from `D2-Bp-crit-probes.mjs --arm film` (screencast, 40 ms per tile, real page colours), `D2-G-crit-records/film/`.

- **First expand, Chromium and Playwright WebKit.** The pill opens both ways from its centre; "H" holds; 1, 2, 3 fade in edge-in behind the leaving "P", then Play and Settings, and "Square" is cut by the moving edge until it arrives. No double exposure, no pop. The glass carries weight and lands dead. D-1 passes on weight; D-1's bounce is set aside by Q-5 default (a). **Reads well.**
- **Warm collapse, Chromium.** The first tile already shows "H" and a faint "P" in a wide plate with nothing else in it: the full face has gone within 40 ms of the trigger, and the plate then closes around empty glass for about 300 ms. The content does not travel with the glass; it leaves ahead of it. This is the weakest D-2 moment of the route, and the one the prototype called "a beat of nothing between faces"; this strip shows it as the whole move, not a beat.
- **Warm expand, Chromium.** Tile 3 shows "H 1 2" faint on the left half of a plate whose right half is empty; the reveal catches up by tile 5. Acceptable.
- **Swap to the long face, Chromium.** A B fade, then C Tools Brushes enter faint in a growing plate and fill in as it grows; the right edge cuts "Laye" and "D" until they arrive. The crossfade's trough is near-blank glass (highest seat opacity 0.013 Chromium, 0.076 Playwright WebKit, `blank`), one frame below 5 % in Chromium. It reads as a blink.
- **Content add, Chromium.** "Brushes and layers" slides in from behind the trailing edge as the plate grows to hold it. **Reads well.**
- **Playwright WebKit warm pair, swap and content change:** the strips show only the landed rest (the film arm's trigger alignment in the WebKit screencast, the same defect the prototype hit). Not read. W1 and W3 witness that motion numerically.
- **The seam.** A faint vertical tick at the dock's centre appears above and below the plate in the VP8 strips. Lossless DPR 2 screenshots at rest show no seam: the drop shadow's centre column deviates 0.10-0.16 from its ±3 px neighbours against 0.13-0.17 anywhere else, identical to the floor (`seam`). It is codec.

**Verdict for the row: FAIL**, on the warm collapse (content leaves before the glass moves: D-2) and the swap's blink.

---

## 7 · Next pass (new defect classes, recorded, not minted into this checklist)

1. **A carrier's own-size-transition policy.** Any route that takes one owner of the dock's extent must say what happens to a seat's own CSS size transition when the extent does not move. H2's `seat-transition` cell judges only the extent; a `lattice` cell (the open-seat exchange: intermediate widths, worst step) would have caught G here and B′ in its critique.
2. **A stall at the flip.** The cost row's block starts 2 rAFs after the call. A same-task and a 1-rAF block belong in the row: both routes and the floor freeze there, and after the block the dock lands in one frame.
3. **Paint versus model for a compositor carrier.** For WAAPI carriers the W3 DOM rows judge the carrier's own solved curve. A lossless in-flight paint bracket (`vagree`) is the cheap paint check; H-1b's screencast `agree` bound needs a vertical-dock calibration (the static expanded rest reads 282.96-283.3 against 281 in one video, and a blank frame reads as 114.98 px).
4. **In-flow neighbours.** A scene with a sibling beside an in-flow dock, reading the sibling's position per frame, so that a route which stops reserving layout (G) or reserves the expanded footprint (floor) is judged on what the page does around it.
5. **The film arm's WebKit trigger alignment.** Both this seat's and the prototype's tools picked the landed rest in 4 of 5 WebKit sequences.
6. **W7 `whole` near its floor.** The no-caps plant passes one of 36 cells (Chromium `top·dark·dpr2`, edge median 4/255). A dark-theme edge at DPR 2 is at the witness's resolution.

---

## 8 · Verdict

**ADVANCE, 52 % (11 / 21).** The route answers REGISTRY §6 in order with no BLOCK or RETIRE condition met, and its centre (a compositor-carried stadium with velocity handed on at each retarget) is measured in paint, in both engines, by this seat. Its failing route-owned rows are defects of its own making (an over-broad `finish()`, a second trigger, stale prose, a collapse whose face leaves ahead of the glass) or a limit with a measured edge (the first frames after the flip). None needs a missing primitive.

What the agglomeration should weigh: G was admitted on the cost row, and the row is won only after commit (from 2 rAFs in Chromium, from somewhere under 100 ms in Playwright WebKit), at the price of 12 boxes, an 841-line carrier and a heavier flip. If the agglomeration judges that stalls worth defending against start later than the flip, G earns its boxes; if they start at the flip, B′ and G tie there, and B′ is the smaller mechanism.

---

## 9 · Open gaps (checklist rows that do not pass)

1. **P1 / G2**: W1 `card` ×3 in both engines (shared, the one-radius law against a card whose rests differ by 3.88 px); Playwright WebKit `vmorph·warm-collapse` `agree` red on every run (screencast artefact per §4.1, but red).
2. **P2**: W2 `route1·long-run-v` keyboard reach 10/11 (shared, F-19).
3. **P3 / G4**: W3 `reversal` `window` 283-286 ms after the retarget against 257-273 ms, both engines, 3/3 runs (R-4); `anchor-end·*` 189.83 px and `viewport-resize` 6.09 px (shared).
4. **F5**: a second trigger (`useDockAperture.ts:795`) that the `nomo` plant shows is not load-bearing on the cited cells; two MutationObservers on the run's `childList`; endpoints published with no reader.
5. **G3**: the open-seat exchange snaps 94.67 / 95.91 px in one frame (floor: 25 / 20 intermediate widths); an infinite seat size animation holds the window open on 223/241 and 138/159 frames.
6. **G5**: a block in the same task as the flip, or 1 rAF after it, freezes G like the floor in both engines; Playwright WebKit also freezes at 2 rAFs (19-28 px of 380).
7. **Both-2**: the warm collapse empties the plate before it moves; the swap blinks through 0.013 / 0.076 seat opacity; four Playwright WebKit strips unread.
8. **Both-4**: stale prose at `GlassDock.vue:469`, `styles/density.css:75`, `dockMorphMeasure.ts:26`.

Outside the checklist, recorded: real Safari **UNMEASURED (owner's safaridriver checkbox)** in every cell; O-66 §2's 60 fps headed on a real GPU and the value.js, keyframes and fourier docks UNMEASURED; the H2 run was light theme only (the prototype's dark run is not re-read here); the `edge()` read's fixture half is not in `selftest.mjs`.
