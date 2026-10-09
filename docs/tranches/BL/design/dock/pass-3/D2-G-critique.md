# D2-G critique, pass 3: the sliding aperture on floor v2

| | |
|---|---|
| Seat | D2 pass 3, route D2-G (the sliding aperture), CRITIC. I did not author the route |
| Model | `claude-opus-5-5`, asserted from own system identity |
| Tree | checkout HEAD `00f191d8` (`src/`, `tests/`, `demo/` identical to `b9841d47`, the prototype's bank: `git diff --stat b9841d47 HEAD -- src tests demo` is empty) + `pass-3/floor-v2.patch` (sha256 `deb90ecc0218c712…`, matches) + `pass-3/D2-G-proto.patch` (sha256 `8c593497707b71aa…`, matches the prototype's header). Both `git apply --check` clean in a throwaway worktree, removed after the runs |
| Builds | `gp` = HEAD + floor v2 + route; `base` = HEAD + floor v2 (built before the route patch was applied); plants `nohit`, `nosub`, `nopainted`, `nochardata` from `pass-3/D2-G-p3-plants.py`, built in the worktree, each restore checked by sha256 (`harness/build.mjs`, outputs in scratch) |
| Adapter | `pass-3/adapter-G-p3.mjs`, unchanged. No shim: every Playwright WebKit cell is unshimmed |
| Engines | headless Chromium and **Playwright WebKit** (Playwright from the checkout's `node_modules`). Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; the run logs carry the refusal |
| Tools | `pass-3/D2-G-p3-run.sh` (`full dark probes critB critG cost`, `REC_DIR=…/D2-G-crit-records/r2`); `pass-3/D2-G-crit-run.sh` (this seat's chain; steps `lunec flow retarget2 retarget2b reversal hit2 chardata nosub darkrest swaplag w3w1 darkw3wk selftest`); `pass-3/D2-G-crit-probes.mjs` (`lunec`, `flowblock`, `edgeblock`, `retdiag*`, `retarget2`, and this seat's `swaplag`); the other route's probes unchanged |
| Records | `pass-3/D2-G-crit-records/r2/` is this seat. Every log opens and closes with `uptime`; every cell carries its own load. Filmstrips are banked under `r2/film/`, the swap rest shots under `r2/swaplag-shots/`. The files directly under `pass-3/D2-G-crit-records/` are an interrupted earlier critic seat's chain (same session, worktree since removed, builds at `b9841d47` with the same two patches), kept as history and cited only where named |
| Load | 1-minute load average **132-717** over this seat (other seats' browsers; the host has 10 cores). The full light reading ran at 272-717. No cell here ran at low load. Every red cell was re-run at least twice; a red seen only at load ≥ 270 that passes in a rerun is **NOT-REPRODUCED**. A red that also shows in the prototype's or the earlier seat's readings at load 29-60 is counted |

## 0 · In brief

**Verdict: ADVANCE, 17 of 24 = 71 %.** Not CONVERGED.

**What I reproduced.**
- The stall at the flip replays from rest. ST is 10/10 in light in both engines, with the worst step ×0.53-0.80 of the bound. The crit `stall` arm paints 102→140→266→388 and 101→108→217→316→404 in Chromium; the base leaps the whole travel in one frame.
- The subscription is load-bearing. `nosub` fails `stretch·lead-add` with seat step ×8.5 (Chromium) and ×8.32 (Playwright WebKit).
- `paintedTau` is now proven. The `nopainted` plant fails the Playwright WebKit `reversal` trajectory twice: 8.78 px against tol 7.83 and 8.02 px against tol 7.76. `gp` reads 2.43 and 2.71 px under the same load. This closes the prototype's open gap 4.
- Hit follows paint at the arc. `lunec` reads 0 of 528 corner points in Chromium and 0 of 424 in Playwright WebKit, at rest and on every rAF frame of both warm morphs. The `nohit` positive control takes all 528 and 432.
- The swap has no trough (0.915-1 of the lower rest). The warm collapse keeps 0.78-0.84 of its ink at 40 ms.

**Seven rows are open:**
- **P1** (Q-12) and **P3** (Q-4) are OWNER-BLOCKED. P3 also carries the WebKit neighbour overlap.
- **P2** is the shared `long-run-v` keyboard cell.
- **N1.** The anchored edge drifts 2.11-3.05 px in Playwright WebKit (bound 0.5), at loads from 29 to 289.
- **R2.** A retarget's leaving fade is short in **both** engines: 24 of 36 cells. In Chromium the 80 and 120 ms cells fail 12 of 12. The prototype read this as WebKit-only because its Chromium arm never ran.
- **B2.** The seam splices glyphs, and the last seam cut snaps 24.2 px open after the window flag clears.
- **B3.** Two touched files carry a duplicated or stale fact.

## 1 · What this seat ran

| step | log / json (`r2/`) | load | result |
|---|---|---|---|
| full light, every witness, both engines, `--safari` | `full-light.log` | 272-717 | W1 18/18 (2 OB, 2 UM) · 19/21 (1 OB); W2 7/8 · 7/8; W3 26/26 (3 OB) · 28/29; W4 13/13 · 13/13; W5 6/6 · 6/6; W6 4/4 · 4/4; W7 18/18 · 18/18; W8 6/6 · 6/6; R6 1/1 · 1/1; ST 5/5 · 5/5; FM 6/6 · 6/6; Safari UNMEASURED |
| dark ST, W3, FM, W1 `card\|vmorph` | `ST-dark.log`, `W3-dark.log`, `FM-dark.log`, `W1-dark.log` | 416-610 | ST Chromium 5/5, WebKit 5 UNMEASURED (video rests vs DOM); FM WebKit 6/6, Chromium 6 "no trigger marker"; W3 52 pass / 2 fail / 2 OB / 2 UM; W1 14 / 3 (WebKit `card`) / 2 OB / 1 UM |
| dark W2, W4-W7 (the prototype ran none of these dark) | `dark-w{2,4,5,6,7}-*.log` | 169-440 | W2 14/16 (`long-run-v` both engines), W4 26/26, W5 12/12, W6 7/7, W7 36/36 |
| B′'s arms on G: `blank`, `lattice`, `infanim`, `popdetail`, `film`, `stretch`, `idle` | `critB-crit.json`, `critB-proto.json` | 578-660 | blank 0 in 12 transitions; lattice 27 / 22 widths, max step 7.11 / 9.57 px, window 0 frames; infanim 0 errors, 0/240 and 0/171 frames; stretch glides 48 px (worst 3.35 / 4.38 px); idle parks |
| B′'s pass-3 probes: `trough`, `hit`, `retarget` (2 reps) | `probe-p3.json` | 543-599 | §4 |
| G's arms: `vagree`, `stall`, `seam`, `ghosts` | `critG.json` | 539-641 | vagree worst out 0.11 px in flight (Chromium), 0.01 (WebKit); seam none |
| cost | `cost-proto.json`, `cost-block.log` | 389-592 | §6 |
| this seat's arms | `lunec-*.json`, `flow-*.json`, `retarget2{,b,c}-gp.json`, `swaplag{,2}-gp.json`, `hit2a-gp.json`, `hit2-gp.json`, `hitb-gp.json` | 132-516 | §3, §4 |
| reruns | `rev-gp-{1,2}`, `rev-nopainted-{1,2}`, `tick-gp-{1,2}`, `tick-nochardata-{1,2}`, `plant-nosub`, `w3-light-low`, `w1-light-low`, `darkw3wk-{1,2}`, `selftest-W1{,-2}` | 148-561 | §3 |

Unit gates (`vitest run tests/components/custom/dock …`, `r2/vitest-dock.log`): every dock suite passes. The only red is `tests/gates/boot-graph.test.ts`, because no `dist-demo` exists in a throwaway worktree. The prototype's boot-graph byte count could not be re-read on the same config: the harness demo build gives base 507,031 B and gp 527,145 B (+20,114 B), against the prototype's +19,623 B on the dist config.

## 2 · The adapter (H-6)

`node harness/adapter-law.mjs pass-3/adapter-G-p3.mjs --diff`: **PASS, L-1..L-5 hold, 49 changed lines.** I read the whole diff.
- It is `adapter-floor-v2.mjs` plus four DOM reads: `plate()` inside the doors, `rim()` under that plate, `edge()` (the caps) and `hit()` (the hit pair).
- `extent()` is `__hp.paintedRect(plate)`, which folds the doors' `overflow: clip`. That is a DOM model of a compositor carrier. `vagree` brackets it in paint (worst 0.48 px in flight under W3's H3-5 cell, bound 1.5), so the W3 rows judge paint here, not only the model.
- `compact()` returns the constant `true`, as floor v2 does.
- The `hit()` read is a shared-harness change made by the route seat (`harness/lib.mjs`). It keeps the hit pair hit-testable in probe modes. With it, every W1 plant is caught in both engines (`selftest-W1.log`: lens, squash, cssbend, deadmorph, dot, cardlens, endlens, endout, cardspread OK; cardlerp reads OB as designed).
- The W1 PASS fixture read 40/41 (`pass`) and 39/40 (`csscarrier`) at load 325-476: one WebKit `agree` cell and one WebKit `corner` cell, on fixtures the change does not touch. In the rerun (`selftest-W1-2.log`, load 188-343), `csscarrier` reads 41/41 and `pass` reads 42/43, with a different cell red (Chromium `card·warm-expand` `moves`). The rerun scores 11/12 expectations, and every plant is caught in both engines. A red fixture cell that changes from run to run under load is NOT-REPRODUCED.

## 3 · The checklist (REGISTRY P2-4 §4.5, fixed, 24 rows)

| Row | Verdict | Evidence (`r2/` unless named) | Counterexample when it fails |
|---|---|---|---|
| **P1** stadium in every rung and orientation (W1, both themes) | **FAIL (OWNER-BLOCKED, Q-12)** | Every `morph`, `vmorph`, rest and rail cell is green after reruns. Chromium `vmorph·warm-collapse` `moves` read red once at load 276 (`w1-light-low.log`, 2 distinct extents in 5 shots); it was green in the full reading. That is sampler starvation under load: NOT-REPRODUCED | `card·first-expand`, `warm-collapse`, `warm-expand`: rest radii 27.93 / 24.05 px. Chromium reads OB. Light Playwright WebKit reads FAIL, not OB: fitted r spread 2.53-3.15 px against a bound of 2.5, lossless rest radii 3.88 px apart (`w1-light-low.log`, load 450-482; `full-light.log`, load 561-582). Same as B′ |
| **P2** run scrolls on genuine overflow, paint box apart from the port (W2) | **FAIL (shared, F-19)** | 7/8 per engine, light and dark | `route1·long-run-v`: seats need 592 px against a budget of 536; keyboard reach 10/11 (Seat 1 missing), both engines, both themes. Floor v2 and B′ show the same |
| **P3** one continuous extent morph (W3) | **FAIL (OWNER-BLOCKED, Q-4; and route)** | light Chromium 26/26 + 3 OB; Playwright WebKit 28/29. Reruns (`rev-gp-1/2`, `w3-light-low`): 0 non-OB red in Chromium | (a) Q-4, `window` only, holding the lenient reading: Chromium `warm-expand` 258.2 ms against 257.9; `anchor-end·warm-expand` 258.4 against 257.5; `reversal` 283.7 ms after the retarget against 257.8; Playwright WebKit `reversal` 285 against 265.6-274.6. (b) Route: Playwright WebKit `neighbour·warm-expand`, the plate overlaps the in-flow neighbour by **9.63 px** (dark, load 321, `darkw3wk-2.log`; bound 0.5). The prototype read 8.45 px (load 59) and 12.29 px (load 33), and the earlier seat read it at load 75. It reproduces at low load, so it is not a load artefact. Chromium overlaps 0 px in every reading |
| **P4** state inputs (W4) | PASS | 13/13 per engine light; 26/26 dark | — |
| **P5** rim clipped by the dock's radius (W5) | PASS | 6/6 per engine light; 12/12 dark | — |
| **F1** corner; seats at any depth | PASS | W1 rests and rail; W2 `route6·depth` | — |
| **F2** rim as a plate child on the one source | PASS | W5, both themes | — |
| **F3** hover gate, coarse press | PASS | W4 coarse cells | — |
| **F4** the P4 machine | PASS | W4 compact cells | — |
| **F5** endpoint model, one trigger per fact | PASS | one `MutationObserver` (`useDockContent.ts:30`). Two `ResizeObserver`s, the run's (`useDockRun.ts:390`) and the carrier's (`useDockAperture.ts:1441`), the same split as floor v2 (`floor-v2.patch:506, 855`). `first-expand` continuous in both engines | — |
| **F6** crash-free edge | PASS | 0 crashed in every table, unshimmed | — |
| **F7** `g-dock-lattice` as invariants | PASS | the dock suites pass in the worktree, including the N-2 "exactly one MutationObserver" gate | — |
| **N1** no margin of its own; container's alignment | **FAIL (route)** | Chromium `anchor-end·*` drift 0 px in every reading | Playwright WebKit `anchor-end·warm-expand` anchored-edge drift **3.05 px** (bound 0.5): `w3-light-low.log` (load 181) and `darkw3wk-2.log` (load 289). The prototype read 2.11 px (load 29.0) and the earlier seat 2.94 px (load 43.7). Floor v2 reads 0.16-0.17 px. Intermittent (it passes in `full-light.log` and `rev-gp-*`), but it reproduces at low load. The mechanism is the flow, a main-thread registered-property lane on the root's margins (`shell.css:229-230`), against compositor `translate` doors |
| **N2** one content observer; nothing published without a reader | PASS | `nosub` fails `stretch·lead-add` ×8.5 / ×8.32 (`plant-nosub.log`); `nochardata` fails `ticking` ×5.88 / ×6.01 in one of two readings (`tick-nochardata-1.log`, load 340) while `gp` passes 4 of 4 (`tick-gp-*`). The single-observer gate holds | — |
| **N3** scoped size hand-off | PASS | `lattice` 27 / 22 intermediate widths, max step 7.11 / 9.57 px, window 0 frames; `infanim` 0 errors, 0/240 and 0/171 frames; W3 `lattice` and `infanim` cells green | — |
| **N4** gutter and `#badge` | PASS | W7 18/18 per engine, light and dark | — |
| **R1** continuity and seat rows with the paint floor on every W3 cell | PASS | `blank` longest run 0 in every W3 cell and in all 12 B′ `blank` transitions; seat overlap 0 frames. The reds were Playwright WebKit dark `first-expand` and `stretch·lead-add` seat step ×1.32 (load 420), `warm-expand` continuity ×1.23 (load 294), and the light `reversal` trajectory 10 px (load 545). Each passes in two reruns (`darkw3wk-1/2`, `rev-gp-1/2`): NOT-REPRODUCED | — (WebKit `anchor-end·warm-expand` continuity red at load 52.8 (prototype) and 289 (here) rides the N1 cell, and is counted there) |
| **R2** leaving seats by the gap-free rule | **FAIL (route)** | W3 `compaction`, `content-remove`, `warm-collapse`, `swap-*`: leaving 0 failing, both engines | `retarget` (scheduled in-page, `retarget2*-gp.json`, load 451-516): the leaving seat fades over 65.8-76.1 ms against a bound of 79.4-81.6 ms at 80 ms, and over 65.8-91.7 ms against 87.5-93.9 ms at 120 ms. **Chromium 12 of 12 cells fail at 80 and 120 ms; Playwright WebKit 12 of 18 fail.** The earlier seat read the same at load 237-323 (`../retarget2-gp.json`). The fade is a WAAPI duration, so load does not set it |
| **R3** the reversal hands its velocity on | PASS | trajectory after the retarget 0.70-1.46 px (tol 7.78-7.93) Chromium, 2.43-2.71 px (tol 8.52-8.59) Playwright WebKit (`rev-gp-1/2`); `nopainted` fails 8.78 and 8.02 px (`rev-nopainted-1/2`) | — (the window is P3's) |
| **R4** no one-frame leap after any of the five block timings | PASS | ST light 10/10, worst step ×0.53-0.80 of the bound. Dark Playwright WebKit ST is UNMEASURED (instrument, shared with floor v2 and B′) | — |
| **R5** hit follows paint (Q-7 default, at the arc) | PASS | `lunec` 0/528 (Chromium) and 0/424 (Playwright WebKit), every frame in flight; `nohit` 528/528 and 432/432. `hit`: painted centres hit their seat; clipped-away centres 0/11 in Playwright WebKit (`hit2-gp.json`, load 148). The 1/18 and 2/20 reads (`hit2a-gp.json`, `probe-p3.json`, load 374-584) are NOT-REPRODUCED | — |
| **B1** every cell in both engines under H3, reviewed adapter | PASS | every witness ran in both engines and both themes (§1); H-6 holds (§2). The UNMEASURED cells are the fence (W8 consumers), the headless bound (O-66 §2), two shared dark instruments (ST video, FM marker) and starved `faces` samplers at load > 400. The W1 self-test's PASS-fixture reds are one cell per run, a different cell each time, at load 188-476 (`selftest-W1.log`, `selftest-W1-2.log`); every plant is caught | — |
| **B2** filmstrip gestalt against D-1 and D-2 | **FAIL (route)** | F-9 met: the warm collapse is carried and cut by the closing edge ("Settin", "Pl", "H P 2"); `kept40` 0.78-0.84, `kept80` 0.48-0.51; no trough | CX-1, CX-2 (§5) |
| **B3** `DockProps` count; prose sweep of every touched file | **FAIL (route)** | 7 members; `GlassDock.vue:66` says SEVEN; no retired name remains | CX-3 (§5) |

**Passing: 17 of 24 = 71 %.**
- Owner-blocked: P1 and P3. P3 also carries a route defect.
- Shared: P2.
- Route: N1, R2, B2 and B3.

## 4 · The obligations, re-read

| # | Obligation | Prototype | This seat |
|---|---|---|---|
| G-1 | no one-frame leap after a stall at the flip | MET | **holds** (R4) |
| G-2 | prove or strike the root observer | MET | **holds**. `nosub` ×8.5/×8.32; `characterData` caught in 2 of 6 readings across both seats |
| G-3 | three stale prose sites | MET | **holds** for the three named sites; B3 finds others |
| G-4 | the lunes | MET | **holds** (R5). The B′ `lune` arm's own gate counts 0 rows on G (it reads R from the square plate); `lunec` reads R from the door and replaces it |
| G-5 | read the WebKit strips | MET | read (B2): WebKit lands its swaps at the same seam, one or two tiles slower |
| Both-a | warm collapse carries its content | MET | **holds** |
| Both-b | no near-blank swap trough | MET | **holds** (0.915-1) |
| Both-c | the other route's critic arms | MET | **partial**. The B′ `retarget` arm cannot run in Chromium on G: "Execution context was destroyed" in every reading (`probe-p3.json`). The earlier seat narrowed it: an `evaluate` that awaits an in-page timer and calls `setFace("mid")` mid-swap loses its context on G only (`../retdiag3-gp.json` against `../retdiag3-base.json`), while the page stays alive. Scheduled in-page instead (`retarget2`), the arm runs, and it fails R2 in Chromium |

## 5 · Counterexamples

**CX-1 · the seam splices glyphs (B2; both engines).** `r2/film/strip-{chromium,webkit}-swap-{long,short}.png`, 40 ms tiles:
- swap-long: "Ɑ" (C over A), "C B Brushes Layers" (the old B standing among the new face for 2-3 tiles), "Tb", "Ʒ", "Too", "Toc".
- swap-short: "Ꜷ", "Ɛools", "A B ɔls" (a sliver of "Tools" beside the landed B).

No witness fails on this. B′'s pass-3 critic read the same class, at B′'s hard seam ("B ols", "Ꮀ"), as B2's failure. The same rule applies here, so the percentages compare.

**CX-2 · the last seam cut snaps after the window closes (B2; both engines).** `swaplag2-gp.json` reads the Tools seat's own `clip-path` per rAF on `swap-long`:

| engine | in flight (window open) | at the flag clear | next frames |
|---|---|---|---|
| Chromium | `inset(0px 24.1875px 0px 0px)` at 247, 255, 265 ms | 272.4 / 274.7 ms, still `inset(0 24.19px 0 0)`; again at 281.8 / 282.7 ms | `none` at 289.1 / 290 ms |
| Playwright WebKit | `inset(0px 24.203125px 0px 0px)` at 246-266 ms | 276 ms, still cut | `none` at 287-288 ms |

The seam ends its keyframes with 24.2 px of "Tools" still uncut. The cut does not ease to 0: the hand-off cancels it to identity, so about half of the seat's label appears in one frame, 9-17 ms after `data-morphing` has cleared. That is the "Too" → "Tools" step in the Chromium strip (tiles 7-9).

This contradicts two claims in the prototype:
- "the window flag … closes when everything that moves is within 0.5 px of its target";
- the seam "never outlasts the grid: … crossed by the end" (`useDockAperture.ts`, the seam block).

The rest is correct. The shot 600 ms after rest (`r2/swaplag-shots/`) shows the whole face.

**CX-3 · prose in touched files (B3).**
- `docs/design/tunable-anim.md:134-135`. The route edited row 134 (`--dock-expand-t`, "one WAAPI lane of the aperture") and left row 135, which describes the same token again as "the dock morph scalar". One fact now has two rows (P-3).
- `src/components/dock/styles/density.css:71-84`. The route rewrote this paragraph. It still keeps `--dock-morph-max-stretch: 1.14` standing with "ZERO readers in `src/`", and gives the reason in process language: "not this wave's to make", "The #47 STRIKE list", "the seat that owns it". N-2's "nothing published without a reader" names this case. The floor carries the token, but the route touched the sentence and kept it.

**CX-4 · R2 in Chromium.** See the R2 row. One cell, `retarget2c-gp.json`, Chromium at 80 ms: seat 2 reads 0.901 → 0.799 → 0.694 → 0.592 → 0.487 → 0.384 → 0.279 → 0.195 → 0.07 over 66.6 ms (8 frames), against a fade bound of ≥ 81.3 ms.

## 6 · Cost (not a checklist row; for Q-15)

| measure | reading | record |
|---|---|---|
| Chromium 1×, 0-20 seats, expand and lead | p95 8.9-9.1 ms, 0 frames over 25 ms (lead 20: p95 16.6) | `cost-proto.json`, load 537-592 |
| Chromium 4×, 40 seats, expand | one 165.8 ms frame (the flip), 5 frames over 25 ms | the same; the prototype read 158.7-165.1 |
| Chromium 1×, 40 seats, expand | p95 25.4, max 41.3, 5 frames over 25 ms | |
| Playwright WebKit 1×, 40 seats, expand | p95 37, max 63, 6 frames over 25 ms | |
| `pblock` | Chromium steps 24.66 px across the gap (0.065 D), then 241.85 px in the next rAF read. That is the DOM model catching up; the screencast ST mid-flight cell shows no leap. Playwright WebKit 0.723 D across the gap, then rest | |

**Under a mid-flight block, the glass and the flow part.** `flow-gp.json`, scene `neighbour=1`, a 1.2 s block at `2raf` and `mid-flight`:
- The plate keeps moving on the compositor, but the in-flow neighbour (a main-thread margin lane) stands still.
- The plate overlaps the neighbour by up to **62 px** (Chromium) and **53 px** (Playwright WebKit). The earlier seat read 65 px and 54.79 px.
- After the block the neighbour then steps 266-380 px in one frame.
- The base never overlaps (−20 px gap; `flow-base.json`), because nothing moves during the block. Its neighbour also steps 380 px after the block.

So G's measured win, a stall after commit, comes with a collision against page content that the floor does not have. ST reads the plate length only, so R4 does not see it. This bears on Q-15, and it is recorded for the next pass (§9).

## 7 · Vacuous greens found

1. **B′'s `hit` arm catches 0 in-flight frames for Chromium `warm expand`** in all five readings (`probe-p3`, `hitb`, `hit2a`, `hit2`; the prototype's too). Its Chromium expand cell judges nothing. R5's Chromium per-frame evidence is `lunec` alone, which covers the corners, not the seat centres.
2. **W3 `window` is green while a lane is 24 px from its target** (CX-2). The flag reads the extent, and the seam's clip is outside what any H3 row reads.
3. **B′'s `lune` gate counts 0 rows on G** (R from the plate, which is square). `lunec` closes it.
4. **The crit `stall` arm's Playwright WebKit sample window** holds no frame off rest (same-task 0-1 px, 1raf 1 px). ST is the only WebKit stall instrument.
5. **R4's ST reads the plate's painted length only.** The flow lane's 266-380 px one-frame leap after a block (§6) passes it.
6. **The `--cells` filter with `$` anchors** in this seat's `reversal` step matched more cells than meant. The extra cells are reported as readings, not omitted.

## 8 · Verdict

**ADVANCE, 71 % (17/24).**
- G meets its five obligations and the "Both" content rows: the stall replay, the proven observer, the arc hit, no trough, and the carried collapse. `paintedTau` is now proven, which the prototype could not show.
- Four route-owned rows fail, each with a measured counterexample that is fixable in-family:
  - **R2**: the retarget fade is shorter than a quarter of the plate morph, now shown in both engines.
  - **N1**: the flow lane against the compositor doors in Playwright WebKit. The same lane collides with the neighbour under a block (§6) and in plain WebKit runs (P3).
  - **B2**: the seam's splices and its uneased last cut.
  - **B3**: two stale facts.
- P1 and P3 wait on the owner (Q-12, Q-4); P2 waits on F-19.
- **Not CONVERGED:** 7 rows are open, owner-blocked included.
- **Winner rule (§4.5):** both routes are now measured on this list under H3, with the same `stall` tool. B′ reads 79 %, G 71 %; neither converges. Q-15 still decides the cost row. The flow collision under a mid-flight block (§6) is new evidence for that ruling: the stall G wins on is also the stall where its glass leaves the page's layout behind.

## 9 · Next pass (new defect classes, recorded, not minted)

- **The window flag must cover every lane.** It must close only when every animated value (clips and fades included) is at its target, and no lane may be cancelled to identity with a residue (CX-2).
- **Glass and flow on one clock.** A witness for an in-flow neighbour under the H3-4 block timings (`flowblock`): plate-over-neighbour overlap and the neighbour's step after the block.
- **The splice** (shared with B′): a seam that cuts inside a glyph run.
- **B′'s `retarget` arm in Chromium on G.** An `evaluate` that spans a mid-swap retarget loses its execution context on G and not on the base (`../retdiag3-*`). Undiagnosed; it could be the carrier's clone layer or a document-level side effect, and needs a witness.
- **The `hit` arm's Chromium expand window** catches no frame. It needs an in-page sampler, as `lunec` has.
- **Dark instruments** (shared): ST Playwright WebKit video rests and the FM Chromium marker in dark.
- **Prose by fact**: a duplicate row for one token across docs (CX-3).

## 10 · Open gaps (checklist rows that do not pass)

1. **P1** (OWNER-BLOCKED, Q-12): W1 `card` ×3, rest radii 27.93 / 24.05 px; light Playwright WebKit reads FAIL, fitted r spread 2.53-3.15 px against a bound of 2.5.
2. **P2** (shared, F-19): W2 `route1·long-run-v` keyboard 10/11, Seat 1 missing, both engines, both themes.
3. **P3** (OWNER-BLOCKED, Q-4; and route): the `window` cells in §3; and Playwright WebKit `neighbour·warm-expand` overlap 9.63 px (8.45-12.29 px in the prototype's low-load readings).
4. **N1** (route): Playwright WebKit `anchor-end·warm-expand` anchored-edge drift 2.11-3.05 px against 0.5, loads 29-289.
5. **R2** (route): `retarget` leaving fade 65.8-91.7 ms against 79.4-94.5 ms; Chromium 12/12 at 80 and 120 ms, Playwright WebKit 12/18.
6. **B2** (route): the seam splices glyphs in every swap (CX-1); the last cut of 24.2 px snaps open 9-17 ms after the window flag clears, in both engines (CX-2).
7. **B3** (route): `docs/design/tunable-anim.md:134-135` has two rows for `--dock-expand-t`; `density.css:71-84` keeps a reader-less token with process prose (CX-3).

Outside the checklist:
- Real Safari is **UNMEASURED (owner's safaridriver checkbox)** in every cell.
- The W8 consumer cells are UNMEASURED: value.js is fenced, and keyframes and fourier need headed real-GPU runs.
- The boot-graph ceiling was not re-read on the dist config (§1).
