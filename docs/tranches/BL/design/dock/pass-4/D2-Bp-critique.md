# D2-B′ critique, pass 4: the measured scene on floor v3

| | |
|---|---|
| Seat | D2 pass 4, route D2-B′ (measured scene, one integrator), CRITIC. I authored nothing in D2 |
| Model | `claude-opus-5-5`, asserted from own system identity |
| Tree | checkout HEAD `5f9482361` + `pass-4/floor-v3.patch` (sha256 `637d1625d7b39b5d…`, matches FLOOR-V3) + `pass-4/D2-Bp-proto.patch` (sha256 `8411916768b9120d…`, matches the prototype's header). Both applied clean in the worktree `.claude/worktrees/bl/D2/p4/Bp-crit/wt` (`apply-bp.log`: 62 files changed against HEAD), removed after the runs |
| Builds | `fv3` = HEAD + floor v3 (the L1 reference and the cost base); `bp` = fv3 + route. `harness/build.mjs`, output inside the worktree (`build-fv3.log`, `build-bp.log`, both exit 0) |
| Adapter | `pass-3/adapter-floor-v2.mjs`, unchanged. No shim: every Playwright WebKit cell is unshimmed |
| Engines | headless Chromium and **Playwright WebKit** (Playwright from the checkout's `node_modules`). Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| Runner | `D2-Bp-crit-records/run.sh` (the prototype's `run.sh` with two changes: the CASES path points at the prototype's `probes/cases.mjs`, and `P4` is exported so the path resolves) and `chain.sh` (one guarded slot per engine; the WebKit slot held the machine-wide WebKit lock). Every red cell was re-run twice by exact name inside the same slot. Digest: `probes/bp-cells.mjs` (the prototype's digest, unchanged; it writes into this seat's records) |
| Records | `pass-4/D2-Bp-crit-records/`: every stage log (each opens and closes with `uptime`; each cell carries its own 1-minute load), `json/{chromium,webkit}/`, `cells-bp.json`, `rows-bp.md`, `counts-bp.md`, `filmstrips/`, `facility/`, `l1/`, `cost-*.json`, `typecheck.log`, `vitest-dock.log` |
| Load | 1-minute load 9.45-35.88 across every cell (Chromium light 11.6-30.5, Chromium dark 16.9-35.9, Playwright WebKit light 15.1-28.7, Playwright WebKit dark 9.45-20.3). The guard held each slot behind 1,557-1,663 machine processes for 28-43 min before admitting it; nothing ran outside it |
| Owner rulings | none since pass 3 on Q-4, Q-12, Q-15, Q-16 or Q-17 (`audit/INBOUND.md`, `FORMATION-PROGRESS.md`, read 2026-10-16). The route builds on the defaults, and so does this score |

## 0 · In brief

**Verdict: ADVANCE. 25 of 36 = 69 %; the first-24 subset is 17 of 24 = 71 %.** Not CONVERGED: 11 rows are open.

**Arm set beside the score.** The H4 set, run in both engines, light and dark, on `bp`:
- W1-W8 and R6;
- W3 with every H4 check (splice and sliver H4-1, lanes H4-2, neighbour H4-3, `retarget·40/80/120` and `retarget·context` H4-5, paint floor, leaving, vanish);
- ST (five timings plus `stall·nb·*`), FM, R5 (H4-4), CF (H4-10), L1 (H4-11, light and dark inside the witness);
- PR and adapter law (source, once);
- CASES (light, both engines);
- cost (`pass-2/D2-Bp-probes.mjs --arm pcost,plead`, `bp` and `fv3`, both engines).

G's four arms are inside it: swaplag is H4-2, flowblock is H4-3, in-page retarget2 is H4-5 and lunec is R5. G's pass-4 prototype does not exist yet, so the "same arm set as the other route" half of B1 is met by the harness, not by a G reading.

**What I reproduced.** The prototype's central claims hold in both engines:
- The O-88 facility passes C1-C7, light and dark (CF 14/14 ×4), where floor v3 fails C1, C3, C5, C6 and C7.
- Glass and flow move on one clock: R8 7/7 ×4.
- Hit follows paint: R5 4/4 ×4.
- A stall at the flip replays from rest: ST 10/10 ×4.
- L1 adds nothing over floor v3: shadow, gradient and pseudo counts equal the reference in all 12 cells.
- The 4× lead cost meets its target: 1 frame over 25 ms at 40 seats, against a target of ≤ 2.
- The card's in-flight radius stays inside the rests' band (0 px outside). That is new against floor v3, which leaves the band by 5.5-8.9 px. P1 on B′ is therefore owner-blocked only.

**What I did not reproduce, or found worse.**
- **The splice (R6) is red where the prototype read green.** Chromium dark `swap-long` fails in 3 of 3 runs (gap 9.47 / 8.72 / 7.41 px against one advance of 10.86, at 168-171 ms, load 21-36). The prototype read dark Playwright WebKit green and light red; I read light Chromium, light WebKit and dark WebKit as NOT-REPRODUCED or green.
- **The window flag over every lane (R7) is red** in Chromium dark `first-expand`, in 2 of 3 runs: an icon clip of 36.46 px is released in one frame at 31 ms (load 21.24).
- **Retargets (R1, R2) are red in every engine and theme.** `retarget·40` blanks for 2-5 frames in 12 of 12 runs, and its leaving fade lasts 51.7-59.9 ms against a bound of ≥ 76-80 ms. `retarget·80` vanishes 0.52-0.54 in Playwright WebKit (6 of 6 runs). `retarget·120` vanishes 0.58-0.60 (Playwright WebKit dark 3 of 3, Chromium dark 2 of 3).
- **`lead-remove` is red in Chromium light** (main: the flag closes 3 frames, 23.7 ms, after the extent lands, which fails the Q-4 lenient reading too; re-run 2: `terminal` 0.94 against 0.86; load 11.6-14.2). The prototype read it green.
- **B2.** The film strips still show cut glyphs that read as false glyphs, in both engines and themes (§4).
- **B3.** Three prose facts in route-touched files are false on this tree (§3, B3).

## 1 · What this seat ran

| Run | Logs (`D2-Bp-crit-records/`) | Load | Result |
|---|---|---|---|
| typecheck, `vue-tsc --noEmit -p tsconfig.json` (route tree) | `typecheck.log` | 7.6-16.0 | exit 0 |
| dock unit suites + `drive-tokens` (`vitest --maxWorkers=2`) | `vitest-dock.log` | 15.5-15.7 | 19 files; 160 passed, 1 expected fail |
| Chromium: main, rest, dark, darkrest, extra | `{main,rest,dark}-*-chromium*.log`, `extra-*` | 11.6-35.9 | §2 |
| Playwright WebKit: the same stages | `*-webkit*.log` | 9.45-28.7 | §2 |
| CASES Chromium (separate guarded run; the first attempt failed on the unexported `P4`, kept as `main-CASES-chromium-noP4.log`) | `main-CASES-chromium.log` | 29.3-35.6 | 6/6 |
| CASES Playwright WebKit `case·rotated` with its control, ×2 (the stage's own re-runs dropped the control, §6.3) | `main-CASES-webkit-rerun{3,4}-rotated-with-control.log` | 17.5-18.5 | 2/2 both runs |
| PR, adapter law | `extra-PR.log`, `extra-adapter-law.log` | 18.7 | PR 3/3 (65 properties, 0 without a reader; DockProps 7, 0 wrong; 32 rows, 0 duplicated); L-1..L-5 hold, 44 changed lines against `adapter-head.mjs` |
| cost, `bp` and `fv3`, both engines | `extra-cost-*.log`, `cost-*.json` | 14.5-22.1 | §5 |
| digest | `cells-bp.json`, `rows-bp.md`, `counts-bp.md` | — | 1,097 cells. The digest marks 3 cells NOT-REPRODUCED |

`chain.log` and `chain-outer.log` belong to a first chain that I stopped while it was still queued: the guard clamped its `--timeout 300` to 90 min. They hold no reading.

## 2 · The checklist (REGISTRY §P3-7.5, fixed, 36 rows)

C = Chromium, W = Playwright WebKit. A row passes only when every engine and theme it was read in passes on my runs. A red seen in the first run that passed both re-runs is NOT-REPRODUCED. OB is OWNER-BLOCKED, and it stays open.

| # | Row | Verdict | Evidence (this seat's records) | Counterexample when open |
|---|---|---|---|---|
| **P1** | the five problems: W1 corner | **OPEN: OWNER-BLOCKED (Q-12)** | W1 19/22 + 3 OB in C and W, light and dark; W7 20/20 ×4 | `card·first-expand`, `warm-collapse`, `warm-expand`: rest radii 27.93 / 23.93 px. In flight, the fitted r is outside the rests' range [22.93, 28.93] by 0 px (e.g. C light `card·first-expand` r 24.3, worst corner 0.1 px). Under Q-12 (b) these cells pass as measured. Under (a) the lerp itself fails and N-5 must be built |
| **P2** | W2 | **FAIL (shared)** | 7/8 ×4 | `route1·long-run-v`: keyboard 10/11, Seat 1 missing, in both engines and themes, re-runs included. This is FLOOR-V3 §1.3's witness defect (`w2-run.mjs reach()` never presses a key that lands on Seat 1). H4 has not amended it, so it stays red on every build |
| **P3** | W3 every check, W6, W8 | **FAIL** | W8 6/6 ×4. W3 C light 29/32 (+5 OB); C dark 27/32; W light 30/32 (+8 OB); W dark 28/32 | **Route reds, reproduced:** `swap-long[splice]` C dark 3/3; `retarget·40[blank,leaving]` 12/12 runs; `retarget·80[vanish]` W 6/6; `retarget·120[vanish]` W dark 3/3 and C dark 2/3; `lead-remove` C light (main `window`, W-8: the flag closes 23.7 ms after the extent lands and fails the Q-4 lenient reading too; re-run 1 pass; re-run 2 `terminal` 0.94 vs 0.86). `first-expand[lanes]` C dark 2/3. **Owner-blocked, Q-4:** every other `window` cell is 259.5-275 ms against an allowance of 256.3-260.6, and the lenient reading (≈ 312-316 ms) holds. W6 `form·collapse` / `form·expand` `window` 257.8-275 ms holds the lenient reading in 11 of 12 readings. Chromium dark re-run 1 fails it (263.1 ms, closed more than 2 frames after landing) |
| **P4** | W4 | PASS | 13/13 ×4 | — |
| **P5** | W5, R6 probe | PASS | W5 6/6 ×4; R6 probe 2/2 ×4 | — |
| **F1** | W1 rests, W2 | PASS | 17/17 ×4 | — |
| **F2** | W5 | PASS | 6/6 ×4 | — |
| **F3** | W4 coarse, hover gate | PASS | 4/4 ×4 | — |
| **F4** | W4 compact | PASS | 8/8 ×4 | — |
| **F5** | W3 `first-expand` continuous | PASS | 1/1 ×4 (step ×0.65-0.66) | — |
| **F6** | crash-free | PASS | 0 crashed cells: C 154/154 light, 148/148 dark; W 160/160 light, 148/148 dark | — |
| **F7** | units, `vue-tsc` | PASS | `vue-tsc` exit 0; dock suites 19 files, 160 pass, 1 expected fail | — |
| **N1** | W3 `anchor-end` | PASS | anchored-edge drift 0 px ×4 (window cells OB, P3) | — |
| **N2** | W3 `stretch·lead-add` | PASS | 1/1 ×4 (seat step ×0.62) | — |
| **N3** | lattice, infanim, seat-transition | PASS | 3/3 ×4 (`infanim` window 0/268 frames, C light) | — |
| **N4** | W7 | PASS | 20/20 ×4 | — |
| **R1** | continuity, seats, paint floor on every W3 cell | **FAIL** | 29/30 in every engine and theme | `retarget·40[blank]`: C light 4, 4, 4 blank frames in a row; C dark 3, 5, 2; W light 3, 3, 3; W dark 3, 3, 3 (bound 1). Load 9.5-25.6 |
| **R2** | leaving (compaction, removal, swap, retarget) | **FAIL** | every non-retarget leaving cell passes ×4 | `retarget·40[leaving]`: seat 1 ink 1 → 0.566 → … → 0 over 51.7-59.9 ms against ≥ 76.1-80.3 ms, 12/12 runs. `retarget·80[vanish]` W: 0.53 → 0 in one frame (bound 0.5), 6/6. `retarget·120[vanish]` W dark 0.58-0.59, 3/3; C dark 0.6, 0.6 then pass. C light `retarget·120` 0.6 in 1 of 3 runs is NOT-REPRODUCED |
| **R3** | reversal hands its velocity on | PASS | trajectory after the retarget: C 1.06-1.2 px (tol 8.0-8.4), W 0.61 px (tol 8.0-8.3); window OB (P3) | — |
| **R4** | ST, five timings, no leap | PASS | 10/10 ×4 (`stall·*` and `stall·nb·*`). Travel before the block ends: C 0-0.01 px; W 0.27-0.37 px on the `nb` arms | — |
| **R5** | hit sampler, every rAF | PASS | 4/4 ×4. W `hit·warm-expand`: 0/196 painted centres miss their seat. Leaving seats that take no press: 13 and 74 (Q-17, recorded) | — |
| **B1** | every cell under H4, reviewed adapter, same arm set | PASS | adapter law L-1..L-5; `retarget·context` 1/1 ×4 (60/60 pings, 0 navigations); the arm set above | — (G's pass-4 readings do not exist yet; the arm set is the H4 set, which contains G's four arms) |
| **B2** | filmstrip gestalt, both engines, against D-1 and D-2 | **FAIL** | FM 6/6 ×4 as an instrument; the gestalt is §4 | Cut glyphs read as false glyphs: C light `swap-long` tiles 2-4 "ʌ ⁞ools", "( ɔols"; C light `swap-short` tile 2 "E ɔls"; W dark `swap-short` tiles 3-4 "B ls Brushes"; W light `warm-collapse` tiles 3-5 "H I 2 3"; C light `first-expand` tiles 2-4 a tick where "1" belongs. Both engines, both themes |
| **B3** | DockProps count, prose sweep by fact | **FAIL** | PR 3/3 (count 7, 0 wrong) | (1) `src/components/dock/styles/index.css:49` says morph.css carries "the collapsed↔expanded interp (retargeted onto `.dock-plate`)". The route deleted that interp from morph.css (patch: the `[data-morphing]` `--dock-expand-t` rules), and morph.css's own new header says it holds rest values only. The route edited the very next line (`:50`) and kept this one. (2) The same file (its partial list rewritten by the route) `@import`s 12 partials, and `:36` still says "The six partials". (3) `morph.css:10` (header paragraph the route rewrote): "@import-ed by dock.css". index.css imports it. (4) `morph.css:62-63` (floor line, route-touched file): "the collapsed dock is `cross × cross` and paints a circle". On this tree the collapsed rest is 101.98 × 56 (W1 `morph·collapsed-rest`) and the CF dock is 102 × 56. The route made that sentence false |
| **N5** | floor v3 N-6..N-8 under the route | **FAIL (shared)** | PR `count`, `readers` PASS | W2 `route1·long-run-v` 0/1 ×4: the same witness defect as P2 |
| **R6** | no splice, no sliver | **FAIL** | sliver 0 frames everywhere | C dark `swap-long`: 1 splice frame in each of 3 runs (units s3 and s4 meet at gaps of 9.47, 8.72 and 7.41 px, one advance 10.86 px, at 168.1-171.2 ms; load 21.2-35.9). C light 1 of 3 runs (7.66 px, load 11.6): NOT-REPRODUCED. W dark 1 of 3 runs (9.55 px): NOT-REPRODUCED. W light 0. On the prototype's ruling question (two arriving units of one face): H4-1 judges units, not faces. And a unit cut at its end, beside a unit cut at its start, within one advance, reads as one glyph run. The row stays red |
| **R7** | window flag covers every lane | **FAIL** | 33/33 in three of the four engine-theme sets | C dark `first-expand`: run 1 `lanes` red (load 35.9); re-run 1 pass; re-run 2 red: "1 lane cancelled to identity, the largest `button.dock-icon-button…` clip from 36.46 px in one frame (previous step 3.54 px) at 31 ms" (load 21.2) |
| **R8** | glass and flow on one clock | PASS | 7/7 ×4: plate over the neighbour at worst −18.68 px (bound 0.5); the neighbour's worst step ×0.63-0.86 of its bound | — |
| **C1** | collapsed form content-sized, one edge, anchored legible summary | PASS | CF `c1·shape·h` ×4: 102 × 56, R 9999 (stadium), painting seats span 86 px (hug bound 110), disclosure "Expand dock" paints; frame `facility/chromium-main/chromium-c1-h-collapsed.png` (home glyph and "…" in one stadium) | — |
| **C2** | one continuous morph; reduced motion; rapid toggles | PASS | 3/3 ×4 | — (the in-flight frames carry a cut hover disc, §4; that is B2's) |
| **C3** | triggers | PASS | 4/4 ×4 | — |
| **C4** | `#persistent` | PASS | 1/1 ×4 | — |
| **C5** | keyboard, focus kept, name and state | PASS | 1/1 ×4 | — |
| **C6** | menus from a collapsed or expanding dock | PASS | 1/1 ×4 | — |
| **C7** | side, vertical, 390 px, coarse | PASS | 4/4 ×4: vertical 116 × 64 stadium | — |
| **L1** | O-87: no lighting layer added | PASS | 6/6 per engine. Light and dark × collapsed, expanded, in flight: shadow 1 / 4 / 4, gradient 8, pseudo 8, blur 16 px, every value equal to `fv3`; 0 idle infinite animations; frames in `l1/` read by eye (§4) | — |

**Count.** Passing: P4, P5, F1-F7, N1-N4, R3, R4, R5, B1, R8, C1-C7, L1 = **25/36 (69.4 %)**.
- First 24: P4, P5, F1-F7, N1-N4, R3, R4, R5, B1 = **17/24 (70.8 %)**.
- Open (11): P1 (OB, Q-12); P2 and N5 (shared witness defect); P3, R1, R2, B2, B3, R6 and R7 (route).

## 3 · Claims checked against the prototype

| Prototype claim (D2-Bp-proto.md) | This seat | Reading |
|---|---|---|
| "The splice … holds in 32/33 W3 cells" (light C and W red, dark W green) | light C NOT-REPRODUCED, light W green, **dark C red 3/3**, dark W NOT-REPRODUCED | still red; it moved engine and theme. The 1-2 px margin under one advance (7.4-9.6 px gap against 10.86) is a borderline |
| R7 red only in dark C `first-expand`, 2 of 3 runs | the same, 2 of 3 | holds |
| `retarget·80/120` vanish 0.53-0.59 | 0.52-0.60 | holds |
| `lead-remove` not red | **red in C light** (main W-8 lenient window fail; re-run 2 terminal) | not reproduced as green |
| "W3 window cells … hold the Q-4 lenient allowance" | true of every W3 window cell **except** C light `lead-remove`, and W6 C dark re-run 1 | mostly holds |
| three cases 6/6 in both engines | C 6/6; W `case·rotated` main red (second difference 9.26 against control 5.99 + 1), then 2/2 with its control (8.54 vs 9.41; 7.1 vs 7.02) | NOT-REPRODUCED. The control's own value spans 5.99-9.41 between runs |
| C1-C7 and L1 pass in both engines and themes | the same | holds |
| 4× lead at 40 seats: 1 frame over 25 ms | 1 frame (max 61 ms) | holds |

## 4 · The gestalt (B2) and the lighting census (L1), read from frames

All frames are this seat's: `filmstrips/{chromium,webkit}-{main,dark}/`, `facility/…`, `l1/`.

**B2: FAIL.** The wipe no longer joins two faces into one word, as pass 3's "Bools" did: the lane keeps a gap between faces. But in 1-3 tiles of every exchange, a unit cut through a glyph paints a stub, and the stub reads as a different glyph:
- `swap-long`, Chromium and Playwright WebKit light, tiles 2-4: "A" becomes a "ʌ" stub. "Tools" becomes "⁞ools", then "ɔols" beside a "(" stub of C.
- `swap-short`, Chromium light, tile 2: "B" is cut to an "E". Playwright WebKit dark, tiles 3-4: "B ls Brushes", where the arriving B sits beside the stub "ls" of the leaving "Tools". That is two faces legible in one frame, a seam's width apart.
- `warm-collapse`, Playwright WebKit light: tile 2 has a hole where "1" was. Tiles 3-5 read "H I 2 3": the arriving P's stem paints as an "I".
- `first-expand`, Chromium light, tiles 2-4: "1" arrives as a tick, and a blank seat-wide gap sits between H and 2.
- In glass's own demo (CF `c2_morph_h-expand`, steps 01-03, both themes), the arriving search glyph paints as a "(" stub. The disclosure's hover disc is cut by a hard vertical edge into a half disc (step 02).

Against D-1: the plate's motion carries weight, with no visible overshoot (Q-5 default (a)), and the extent itself is smooth. Against D-2, the content fails: for about 50 ms, every exchange shows marks that are not the dock's content. The splice gate is per unit pair, so it cannot see a stub inside one unit. The strips are the reading, and the prototype's §9 names the same open item.

**L1: PASS.** Light frames show a flat material with one edge and one soft drop shadow. Dark frames show the same shadow reading as a faint light halo on black, and the census holds it equal to floor v3's (4 layers expanded, 1 collapsed, identical in both engines). No gleam, specular band, inner bevel or idle shimmer appears in any frame. O-87's "flatter, slightly less blur" is a floor decision (blur 16 px is the floor's value, RECORD), not this route's.

## 5 · Cost (for Q-15)

`cost-{bp,fv3}-{chromium,webkit}.json`; p95 / max / frames over 25 ms / main-thread ms per frame.

| Case | B′ | Floor v3 | Load |
|---|---|---|---|
| Chromium 1×, 0-40 seats, expand and lead | p95 8.9-9.7, max ≤ 11.3, 0 over 25 | p95 9.1-9.5, 0 over 25 | 16.3-20.5 |
| Chromium 4×, 40, expand | 19.4 / 51.6 / **1** / 1.99 | 12.5 / 16.8 / 0 / 2.16 | 17.4-19.0 |
| Chromium 4×, 40, lead | 24.1 / 61.0 / **1** / 2.23 | 9.7 / 9.8 / 0 / 0.29 (no lead morph) | 16.5-20.0 |
| Chromium 4×, 20, lead | 17.1 / 36.2 / 1 / 1.67 | 9.4 / 22.5 / 0 / 0.30 | 16.5-20.0 |
| Playwright WebKit 1×, 0-40, expand and lead | p95 12, max ≤ 14, 0 over 25 | p95 12-13, 0 over 25 | 14.5-22.1 |

B′ meets obligation 3: ≤ 2 frames over 25 ms at 4× with 40 seats. It still pays one long trigger frame (51.6-61 ms) that the floor does not. At 4× and 40 seats, `morphFrames` drops to 13-18, against 69 on the floor.

## 6 · Next-pass defect classes (no row covers them; the score is unchanged)

1. **The leaving unit's ink steps at both ends of its wipe.** In every exchange, a leaving seat loses 0.43 of its ink in the first frame (1 → 0.566-0.570 in every `swap-*`, `first-expand`, `warm-expand` and retarget cell, both engines). `lead-remove` loses 0.77 (1 → 0.233-0.234, ×6 readings), and the last step drops 0.38-0.40 → 0. H4-5's vanish bound (≤ 0.5 one-frame drop) is applied only in the retarget cells, so `lead-remove`'s 0.77 drop passes R2. It is the lead ("the front starts two seams in") and the seam cut-off by construction, and it is a vacuous green of the leaving rule outside retargets.
2. **A glyph stub inside one unit.** H4-1 judges pairs of units, and the sliver rule judges a whole unit under one advance. A unit wider than one advance, cut through a glyph, passes both, and it is what B2 reads by eye (§4), including the half-cut hover disc in the demo. There is no gated witness.
3. **A probe re-run by exact cell name drops its control.** `cases.mjs` re-run with `--cells '^(case·rotated)$'` judges `case·rotated` with no control bound: re-run 2 passed at 21.37 px/frame². Only a re-run that keeps the control (`^case·rotated`) is a reading (§1).
4. **W6 does not map the Q-4 lenient verdict to OWNER-BLOCKED.** W3 does. W6 prints "Q-4 lenient window holds" and still returns FAIL, so P3's W6 half reads red where W3's identical window class reads OB.
5. **W2's `reach()` witness defect** (FLOOR-V3 §5) is still not amended in H4. P2 and N5 cannot close on any route until it is.
6. **A stale tranche citation in a test.** `tests/components/custom/dock/DockLayerSwitcher.a11y.test.ts` (patch line 5214) cites `pass-3/D2-Bp-proto.md` for an in-flight contract that pass 4 rewrote.

## 7 · Fences, as kept

- Writes in the checkout: this file and `D2-Bp-crit-records/` only. No other file or symlink.
- Git writes: `worktree add` and `worktree remove --force` only. The worktree and the empty `Bp-crit/` directory are removed (`git worktree list` has no `Bp-crit`).
- Every browser run went through `~/.claude/guard/guarded`, one heavy run at a time. The Playwright WebKit slot took `--exclusive webkit`, and every browser was closed by the harness.
- No sibling repository was read or run. No browser MCP was used.
- Real Safari: **UNMEASURED (owner's safaridriver checkbox)**.
