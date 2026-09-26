# D2 · pass 2 · D2-B′ critique: the measured scene, one integrator

| field | value |
|---|---|
| seat | D2 pass 2, adversarial critic of route D2-B′. Did not author the spec, the prototype or the floor. Judges against REGISTRY §7.5's fixed checklist only; new defect classes go to §7 ("next pass"), not into the checklist |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **ADVANCE**, convergence **68 %** (17 of 25 checklist rows pass, §3) |
| tree measured | a scratch worktree at `4af44b36`, `floor.patch` (sha256 `de432032f18918a1…`) then `D2-Bp-proto.patch` (sha256 `77df400d439ef059…`) applied clean; built with `../harness/build.mjs` (label `crit`), caches in scratch. A floor-only build (`floor`, the route patch reversed) and one plant build (`crit-nomo`) came from the same worktree. The worktree was removed before return |
| engines | Chromium headless; **Playwright WebKit** headless, unshimmed in every cell (the floor adapter carries no shim), 0 crashed cells. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; the run logs carry safaridriver's refusal ("session not created … timed out while connecting to a Safari instance") |
| records (source of record) | `D2-Bp-crit-records/`: `run-light.log`, `run-dark.log` (full H2, both engines), `w3-rerun{1,2}.log`, `crit-probes-route.{json,log}` and `crit-probes-floor.{json,log}` (this seat's arms on the route and on the floor), `crit-swapdetail.json`, `crit-film.json` + `film/crit-{chromium,webkit}-*.png`, `proto-arms.{json,log}` (the prototype's own arms, re-run), `idle-rerun.log`, `plant-nomo-stretch.log`, `vitest-dock.log`, `typecheck.log`, `adapter-law.log`, `apply.log`, `chain.sh` |
| tools written | `D2-Bp-crit-probes.mjs` (arms `blank`, `swapdetail`, `lattice`, `infanim`, `popdetail`, `film`); no harness file changed |
| load | 1-minute load average beside every cell in the records: 18.8-28.6 (light run), 12.7-25.1 (dark), 18.9-29.9 (W3 re-runs), 13-31 (probes). Other seats ran browsers throughout. Every timing reading below that fails only some runs is NOT-REPRODUCED under the load law |
| fences | Checkout writes: this file, `D2-Bp-crit-probes.mjs`, `D2-Bp-crit-records/`. Git writes: `worktree add`, `worktree remove` |

---

## 0 · In brief

- **The centre holds.** The posture morphs, content changes and lead insertions are continuous in both engines on the rung's analytic spring (trajectory within 0.3-1 % of D), with dead landings, 0 two-owner frames, 0 crashed WebKit cells, no scroll container on a fitting run, a parked body in Playwright WebKit and a per-frame cost far under the BANK re-trigger. The floor's rows 1-4, 6 and 7 hold under the route. W4 13/13, W5 6/6, W6 4/4 and W8 6/6 reproduce in both engines and themes.
- **Four route-owned rows fail, each with a counterexample the prototype's instruments could not see:**
  1. **A swap paints blank glass.** On `swap-long` the leaving face goes from 1 to 0 in one frame, and the entering face stays at 0 inside a growing plate for 26 moving frames in Chromium and 20 in Playwright WebKit (about 235-250 ms), then appears at the landing. The hider is the scene's own coverage opacity written on the DockLayerGroup cell (§4 CX-1). The floor shows 0 blank frames on the same cell.
  2. **The route's hand-off snaps the library's own size transitions.** `run.css`'s open-seat exchange (`inline-size 0.21s` on `aria-current` cells) paints 0 intermediate widths and a 96 px step in one frame, in both engines. The floor paints 27 / 20 intermediate widths with a worst step of 7.34 / 9.03 px (§4 CX-2). An infinite size animation on a seat makes `finish()` throw an uncaught `InvalidStateError` in both engines and holds the morph window open on 256 of 263 frames (§4 CX-3).
  3. **Compaction pops.** A leaving seat reads 0.968 → 0.937 → 0 in Playwright WebKit and 0.963 → 0.706 → 0 in Chromium, 13-21 ms in all, in frames 1-3 of a 238-245 ms plate morph. The prototype's `pop` arm calls this "fades" because its pop rule needs ≥ 0.95 → ≤ 0.05 in one frame, and 0.937 sits one frame in between (§4 CX-4).
  4. **Two MutationObservers watch the run's `childList`** (`useDockScene.ts:737`, `useDockRun.ts:303`), against floor row 5's "one trigger per fact". The prototype records it as owed (P-3).
- **Three shared rows fail on cells no route can pass today**: W1 `card` ×3 (the harness requires one card radius; the floor's card is a pill collapsed), W2 `route1·long-run-v` keyboard (F-19), and W3 `reversal` `window` (Q-4) with `viewport-resize` `span` (a scene fact).
- **The prototype's warm-pair filmstrips are vacuous.** Both are 11 identical tiles of a resting expanded dock: the hover-out trigger waits 900 ms against a 3.6 s `DOCK_COLLAPSE_DELAY_MS`. This seat re-shot the warm pair through the scene hooks (§6).
- **Why ADVANCE and not BANK.** Every failing route-owned row is a defect inside the family's own mechanism (a rule applied at the wrong depth, a hand-off with no exemption, a fade lane that coverage overrides, a duplicated observer). None needs a missing primitive, and the BANK re-trigger is not met (§3 item 2).

---

## 1 · What this seat re-ran

| run | command (from `D2-Bp-crit-records/chain.sh` and the logs) | result |
|---|---|---|
| H2, light | `run.mjs --build crit --adapter adapter-floor.mjs --safari` | W1 19/22 · 19/22; W2 7/8 · 7/8; W3 16/19 · 18/19; W4 13/13 · 13/13; W5 6/6 · 6/6; W6 4/4 · 4/4; W7 6/18 · 6/18; W8 6/6 · 6/6; R6 1/1 · 1/1 (Chromium · Playwright WebKit); 0 crashed; Safari UNMEASURED |
| H2, dark | the same with `DOCK_HARNESS_THEME=dark` | identical, except W3 15/19 · 17/19 |
| W3 ×2 more | `w3-morph.mjs --engine all` | 33/38 twice (the cells in §3 row P3) |
| proto arms | `D2-Bp-probes.mjs --arm rotlead,pop,idle,stretch,pblock,plead` | §3 items 2, 3, 5, 7, 8, 9 |
| idle ×2 more | `--arm idle --engine chromium` | §3 item 3 |
| plant | the scene's MutationObserver removed (`crit-nomo`), `--arm stretch` | §3 item 5 |
| critic arms | `D2-Bp-crit-probes.mjs` on `crit` and on `floor` | §4, §6 |
| units | dock suites through a scratch-cached vitest config | 15 files, 130 passed, 1 expected fail |
| types | `vue-tsc --noEmit` | exit 0 |

The prototype's numbers reproduce where this seat re-read them (W3 first expand ×0.65-0.66 step, 0.3 % of D; content-add 179.33 px; lead insertion 48 px glides; `rotlead` −48 px with and without the rotated host; `pblock` 1,204.5 / 1,203 ms gaps).

---

## 2 · The adapter (H-6)

The route runs `adapter-floor.mjs` unchanged. `adapter-law.mjs --diff` holds L-1..L-5, and the diff against `adapter-head.mjs` is the floor's 36 lines (`adapter-law.log`). Reviewed read by read against B′'s DOM:

- `extent()` is `paintedRect(.dock-plate)`. B′ moves the plate by inline `inset` and struck the plate's `clip-path`, so the read is the plate's own box: a DOM read, not a family input.
- `paintingSeats()` takes `visibleOpacity` along the whole ancestor chain and never intersects with `extent()` (L-2). This is what makes CX-1 visible to this seat's `blank` arm: the scene's opacity on a cell is on the chain.
- `morphing()` reads `[data-morphing]`, which the scene writes. W3's `window` compares its clearing with the painted extent's landing, so the flag is judged against pixels, not trusted.
- `rung()` reads `__scene.presets`, but W3 pins the clock to `DOCK_RUNG` (H-3d) and judges `rung()` against it.
- `compact()` returns `true` and the compact scene binds the one grouped `scroll` prop. A DOM-contract claim that W4 then exercises.

**H-6 holds.** No read derives from B′'s lanes, tokens or custom properties.

---

## 3 · The checklist (REGISTRY §7.5, fixed)

25 rows: the five problems under H2 in both engines (5), floor rows 1-7 (7), §7.3 D2-B′ items 1-9 (9), and "Both" (4: every cell in both engines under a reviewed adapter; the filmstrip gestalt read; the `DockProps` count; the prose sweep). The real-Safari clause of "Both" applies "as soon as the checkbox is ticked" and is not triggered; it is not counted.

| row | verdict | evidence (records) | counterexample when it fails |
|---|---|---|---|
| **P1** stadium in every rung and orientation | FAIL (shared) | W1 19/22 both engines, both themes; every rest, rail end, `vmorph` and `morph` cell green | `card·first-expand`, `card·warm-collapse`, `card·warm-expand`: the corner is circular (worst 0.086-0.114 px Chromium; 0.58-1.46 px Playwright WebKit screencast), but `card` requires one radius and the floor's card is 27.93 px collapsed and 23.93-24.68 px expanded. No carrier passes it while the rests differ. Owner: the agglomeration (the witness against floor row 1) |
| **P2** the run scrolls only on genuine overflow, paint box apart from the port | FAIL (shared) | W2 7/8 both engines, both themes; route 5 (consumer width) green | `route1·long-run-v` keyboard reach (Seat 1 unreachable by Tab and arrows), identical at HEAD and floor. Owner: F-19 / D1 |
| **P3** one continuous extent morph | FAIL | W3 16/19 · 18/19 (light), 15/19 · 17/19 (dark), 33/38 twice | `reversal` `window` in Chromium 4 of 4 runs (the window clears 261.4-265.5 ms after the retarget against an allowance of 256.7-258.4 ms) and in Playwright WebKit 2 of 4 (263-265 ms against 259.6); `viewport-resize` `span` 6.09 px, both engines, every run (the fit dock's fluid font; its window half reads 0 frames). Owners: Q-4 and the scene. Single-run misses, each NOT-REPRODUCED: `anchor-end·warm-expand` window 260.4 vs 256.9 ms (1/4), `warm-collapse` window 260.9 vs 258.7 ms (1/4), `terminal` on `lead-add` 0.88 px (1/4), `lead-remove` 0.97 px (1/4), `seat-transition` 0.91-0.94 px (2/4), all at load 16-30 |
| **P4** state inputs | PASS | W4 13/13 both engines, both themes: `compacts` 206.13 → 93.59 px, hysteresis 1 flip in 24 moves, `late-getter`, `shared-scroller`, `press-then-scroll`, `prm·compact` 0 frames between rungs, `coarse·tap-pins` 0 clicks | — |
| **P5** rim clipped by the dock's radius | PASS | W5 6/6 both engines, both themes | — |
| **F1** corner; seats at any depth | PASS | W1 rests; W2 `route6·depth` | — |
| **F2** rim as a plate child on the one source | PASS | W5 6/6, including `el-source` and `h·compact` | — |
| **F3** hover gate, coarse press | PASS | W4 `coarse·no-hover-latch`, `coarse·tap-pins` both engines | — |
| **F4** the P4 machine | PASS | W4 compact cells, both engines | — |
| **F5** endpoint model, one trigger per fact | FAIL | endpoints hold: `first-expand` continuous (×0.66), `hidden-shown` 0 px | the run's `childList` has two observers: the scene's root-subtree MutationObserver (`useDockScene.ts:737`) and the roving observer (`useDockRun.ts:303`). The prototype names it as owed (D2-Bp-proto §1.2 item 3, §9 item 3) |
| **F6** crash-free edge | PASS | 0 crashed of every unshimmed Playwright WebKit cell, both themes | — |
| **F7** `g-dock-lattice` as invariants | PASS | dock suites 15 files, 130 passed, 1 expected fail (`vitest-dock.log`); `vue-tsc` exit 0 | — |
| **1** per-seat FLIP; leaving seats hold and fade; no double exposure, no collisions | FAIL | H-3b green on every W3 cell and W4 `non-first-current` (×0.54-0.55) | CX-1: on a swap the leaving face drops 1 → 0 in one frame, and the entering face never paints until the landing (26 / 20 blank moving frames) |
| **2** the BANK re-trigger (per-seat-FLIP cost vs 16.7 ms) | PASS (not met; stays ADVANCE) | `plead`: Chromium 1× 0.27-0.51 ms main thread per rAF frame for 0-40 cells, p95 9.3-10.4 ms; 4× 1.03-1.52 ms, p95 10-15 ms, one frame over 25 ms at N = 20 and 40 (load 22-24). Charging the whole trace to morph frames, N = 20 costs ≤ 3.4 ms (1×) and ≤ 12.7 ms (4×) per morph frame. Playwright WebKit p95 12-13 ms for 0-40 cells | — |
| **3** one body, parks, `useDockSpring` gone, H-3c reversal | PASS | `useDockSpring.ts` absent; `reversal` trajectory after the retarget 1.2 px (tol 7.93) Chromium, 0.61 px (tol 8.25) Playwright WebKit. `idle`: Playwright WebKit 196 against 196 / 196 (parks). Chromium flips with load: +3, +8 and −10 rAF calls over baseline in three runs (load 18.5-24.5), so the "RUNS AT REST" readings are NOT-REPRODUCED, and a body that never parks adds about 120 | — (the reversal cell's `window` is P3's) |
| **4** hidden mount, consumer width, resize | PASS | `hidden-shown` 0 px from rest; W2 route 5 plate outside the root 0 px; `viewport-resize` 0 window frames | — |
| **5** the observer | PASS | `stretch`: a seat prepended to a stretched run travels 48 px over 31 / 24 frames (worst step 5.15 / 4.4 px). Plant `crit-nomo` (the scene's MutationObserver removed): 48 px in 1 frame, both engines (`plant-nomo-stretch.log`). The second trigger is shown load-bearing (the "or" arm) | — |
| **6** the landing | PASS | `landing` "dead", 0 reversals on every W3 cell, both engines, Q-5 (a) as the default | — (note: the band landing seats a crossing step, `useDockBody.ts:170`, which is a clamp on the 0.3 % overshoot by another name; the spec had said lanes seat only at rest. Disclosed by the prototype, §1.2 item 5) |
| **7** compaction leaves through the aperture or fades on the spring; no compounded scale | FAIL | `seat-scale` ratio 1; `prm·compact` 0 frames | CX-4 |
| **8** consumers (wide `#collapsed`, right-anchored, consumer width, ancestor rotate, value.js X-11) | FAIL | `wide·*` 0 px beyond the plate; `anchor-end·*` 0 px drift; `rotlead` −48 px either way; `seat-transition` one window, 0 two-owner frames | CX-2, CX-3: the X-11 hand-off (finish a seat's own size animation) steps the library's own open-seat exchange by 96 px in one frame and throws on an infinite animation. Consumer repos not run (value.js fenced) |
| **9** the extent under a 1.2 s block, recorded | PASS (RECORD) | `pblock`: Chromium gap 1,204.5 ms, 26.18 px across it, next step 18.5 px, landed 1,433.7 ms; Playwright WebKit gap 1,203 ms, 31.69 px, next 95.28 px (the 33.3 ms cap), landed 1,448 ms (load 22.6-23.7) | — |
| **Both-a** every cell in both engines, reviewed adapter | PASS | §1, §2 | — |
| **Both-b** filmstrip gestalt: first expand, warm pair, swap, content change vs D-1, D-2 | FAIL | §6 | the swap (CX-1) and, less severely, the warm collapse |
| **Both-c** `DockProps` against Q-3 | PASS | 7 members read from `useDockShellProps.ts` (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`); B′ adds 0 | — |
| **Both-d** prose sweep of touched files | PASS | a grep of every touched file (modified and new) for the struck terms (`morph-t`, `size-scale`, `counter-scal`, `dock-live`, `measurePeak`, `markExpandFlip`, `useDockSpring`, `useDockMorph`, `dockMorphMeasure`, `MORPH_SETTLE`, `*-px` endpoints, `stagger`) finds only a `not.toMatch(/--dock-live/)` assertion | — (untouched `tests/design/drive-tokens.test.ts:18` still says `--dock-morph-t` is registered in the dock's `index.css`; outside this row's scope) |

**Passing: 17 of 25 = 68 %.** Route-owned failures: F5, 1, 7, 8, Both-b. Shared: P1, P2, P3.

---

## 4 · Counterexamples

### CX-1 · A swap is blank glass (items 1, Both-b)

`blank` arm, swap scene, `setFace("long")` (`crit-probes-route.json`, load 13.8-19.7):

| cell | engine | moving frames | blank moving frames (plate moves, no seat inside it above 0.05) | longest blank run | floor (`crit-probes-floor.json`) |
|---|---|---:|---:|---:|---:|
| `swap-long` | Chromium | 97 | 26 | 26 | 0 |
| `swap-long` | Playwright WebKit | 73 | 20 | 20 | 0 |
| `swap-short` | Chromium | 97 | 1 | 1 | 0 |
| first expand, warm pair, content-add | both | 73-100 | 0 | 0 | — |

`swapdetail` (`crit-swapdetail.json`, load 30.8; the same shape at 17.6 in an earlier run) shows the mechanism frame by frame:
- A and B read visible opacity 1 in the frame of the trigger and 0 in the next, while their face's own opacity reads 0.97, 0.74, 0.45 on its way down. They do not fade.
- From the trigger until about 235 ms (Chromium) / 255 ms (Playwright WebKit) later, Tools, Brushes and Layers sit inside the plate (e.g. plate [590.2, 849.5], Brushes centred at 757.9) with inline opacity 1, and the entering face's own opacity climbs 0.13 → 0.92. They still read 0. The nearest hiding ancestor is `div.dock-layer-group` with inline `opacity: 0`.
- That inline value is the scene's: `useDockScene.ts:351-354` writes `min(coverage, fade)` on every mover below a face, cells included. The DockLayerGroup cell takes its new width at once (102 → 347 px), FLIPs from its old start edge, and so crosses the plate's trailing edge until the landing. Its coverage is 0 for the whole morph, and it hides both faces inside it. The per-seat movers for crossfade seats (`useDockScene.ts:465`) cannot help, because their ancestor is at 0.

The W3 `swap-*` cells stay green because nothing that does not paint can overhang the plate or overlap a neighbour (§5 V-2). The filmstrips (`film/crit-{chromium,webkit}-swap-long.png`) show it: A B vanish, 4-5 tiles of empty growing glass, then the long face arrives whole at the landing.

### CX-2 · The hand-off snaps the library's own open-seat exchange (item 8)

`lattice` arm: an expanded morph dock; `aria-current` moves from "One" to "Two". `run.css:237` and `:246` give both cells `transition: inline-size var(--spring-dock-duration) var(--spring-dock)` (computed `inline-size 0.21s`).

| build | engine | intermediate widths (One / Two) | worst one-frame width step | morph-window frames |
|---|---|---|---|---:|
| B′ | Chromium | 0 / 0 (136 → 40, 40 → 136) | 96 px | 33 |
| B′ | Playwright WebKit | 0 / 0 | 96 px | 24 |
| floor | Chromium | 27 / 27 | 7.34 px | 0 |
| floor | Playwright WebKit | 20 / 20 | 9.03 px | 0 |

The scene's capture-phase `transitionrun` handler (`useDockScene.ts:705-720`) finishes any size transition inside the dock, the library's own included. Positions glide (FLIP), sizes jump. The dev `console.error` is gated on `import.meta.env.DEV` and did not fire on the harness build, so in production the exchange snaps silently. No H2 scene moves the current seat, so no witness saw it. This is a regression against the floor, and it is D-1's.

### CX-3 · An infinite size animation throws and holds the window open (item 8)

`infanim` arm: a `span` inside the "Play" seat with `animation: critmeter 0.6s ease-in-out infinite alternate` on `width` (6 ↔ 30 px), for example a level meter.

| engine | page errors | morph-window frames in 2 s | distinct extents | meter animation after |
|---|---|---:|---:|---|
| Chromium | 1: `InvalidStateError: Failed to execute 'finish' on 'Animation': Cannot finish Animation with an infinite target effect end.` | 256 / 263 | 239 (span 29.86 px) | running |
| Playwright WebKit | 1: `InvalidStateError: The object is in an invalid state.` | 191 / 196 | 187 (span 29.83 px) | running |

The hand-off throws, the animation keeps running, and the plate chases it on every frame with `[data-morphing]` up almost continuously. Two owners of the extent remain (O-64 R-5), and the click-integrity window (`[data-morphing]`) stays open for as long as the meter runs.

### CX-4 · Compaction pops (item 7)

`popdetail` arm, compact scene with the second seat current, scrolled to 900 (`crit-probes-route.json`):

| engine | leaving seat | visible opacity, frame by frame | duration | frame of the plate morph | plate morph |
|---|---|---|---|---|---|
| Chromium | Photos, Theme | 0.963 → 0.706 / 0.745 → 0 | 13 ms | 2 → 3 | 32 frames, 238 ms |
| Playwright WebKit | Photos, Theme | 0.968 → 0.937 → 0 | 21 ms | 1 → 2 | 24 frames, 245 ms |

The seat's opacity is `min(coverage, fade)`. The leaving seats are held at their painted place, the closing edge reaches them in the first frames, and the 4 px coverage ramp takes them out before the fade lane has moved. They neither leave through an aperture (nothing clips them progressively) nor fade on the spring. The prototype's `pop` arm re-run here reads "fades" (2 / 1 intermediate frames), because its pop rule needs ≥ 0.95 → ≤ 0.05 in one frame, and 0.937 sits one frame in between (§5 V-3).

### CX-5 · Two observers of one fact (floor row 5)

`useDockScene.ts:737`: `new MutationObserver(check)` on the root, `childList`, `characterData`, `subtree`. `useDockRun.ts:303`: `new MutationObserver(syncRoving)` on the run. Both see a seat join the run. The scene's observer is load-bearing (plant `crit-nomo`: 48 px in one frame, both engines). The cure the prototype names, one root observer with two subscribers, is not built.

---

## 5 · Vacuous greens found

| id | green | why it cannot fail here | what fails it |
|---|---|---|---|
| V-1 | the prototype's filmstrip gestalt for the warm pair (`D2-Bp-proto-records/film/filmstrip-warm-{collapse,expand}.png`) | `D2-Bp-filmstrip.mjs` moves the pointer away and records 400 ms, but the dock collapses 3.6 s after hover-out (`DOCK_COLLAPSE_DELAY_MS`). Both strips are 11 identical tiles of an expanded dock at rest | re-shot through `__scene.collapse()` / `expand()`: `film/crit-*-warm-*.png` |
| V-2 | W3 `swap-long` / `swap-short` `faces` 0 px beyond the plate, seat step ×0.06-0.07, 0 overlap frames | the entering face paints nothing until the landing (CX-1), so it cannot overhang or overlap, and invisible seats are not painting seats | `blank` arm: 26 / 20 blank moving frames. Owed to H2: a paint floor on the faces and seat rows (§7) |
| V-3 | `pop` arm "fades", 0 popped (proto §4 item 7) | the pop rule needs ≥ 0.95 → ≤ 0.05 in one frame; 0.968 → 0.937 → 0 in 21 ms passes it | `popdetail` rows (CX-4) |
| V-4 | W3 `seat-transition` "one window, 0 two-owner frames" (proto §4 item 8) | the hand-off finishes the seat's own transition, so there is never a second owner to count; the seat's own size steps in one frame instead | `lattice` (CX-2) on the library's own exchange |
| V-5 | `idle` "parks" in Chromium (proto §4 item 3) | the verdict flips with load (+3, +8, −10 over baseline in three runs); it separates a body that never parks (about +120 per 2 s) from one that parks, but not finer | Playwright WebKit reads 196 against 196 / 196 and holds the item |

---

## 6 · The gestalt read (D-1, D-2)

Filmstrips: `D2-Bp-crit-records/film/crit-{chromium,webkit}-{first-expand,warm-collapse,warm-expand,swap-long,content-add}.png`, 40 ms per tile, from two frames before the trigger (load 13.6-15.4).

- **First expand, warm expand** (both engines). The glass leads. "P" fades as 1 2 3 arrive at the reached edge, Play and Settings follow, and Square arrives last. Nothing overlaps, scales or teleports. The landing is dead (Q-5 (a)). There is a band of empty glass on the trailing side for 2-3 tiles while the plate outruns its seats. A clean glide, read as weight without bounce. It passes D-1 under Q-5's default.
- **Content-add** (both engines). The plate widens symmetrically and "Brushes and layers" fades in as the trailing edge reaches it. Clean.
- **Warm collapse** (both engines). The full face is gone within one to two tiles (the time split drops the leaving face over the first 35 % of the fade lane) while the plate is still 300-400 px wide. For 2-3 tiles an empty plate shrinks around "H" and a faint "P". The content does not travel with the glass (F-9's class); it clears and the glass follows. Weak, not broken.
- **Swap** (both engines). A B vanish in one tile, then 4-5 tiles of empty glass growing, then the long face arrives whole at the landing. Against D-2 this is dead glass: the one moment a swap should show engagement, it shows nothing. **Fails.**

**Gestalt row: FAIL**, on the swap.

---

## 7 · Next pass (new defect classes, recorded, not minted into this checklist)

1. **Coverage at the wrong depth.** Any cell that grows by more than its FLIP offset hides its whole subtree until the landing: DockLayerGroup is the measured case (CX-1). A cell with nested seats needs to be a transparent container, or coverage needs to be read at the seat only.
2. **The size hand-off needs a scope.** It cannot finish the library's own run transitions (CX-2), and it must not call `finish()` on an infinite effect (CX-3). If a seat's own size animation is legitimate (a meter, value.js X-11), the scene needs a rule for a size that keeps changing, not a finish.
3. **An H2 paint floor for W3's face and seat rows.** H-2 gave the ring a paint floor; the faces, `seatStep` and `seatOverlap` rows need one (the entering face must paint above 5 % inside the plate before the window closes), or V-2 recurs on any route that hides content.
4. **An H2 scene that moves the current seat** (`aria-current` from one seat to another), judged on seat size steps as well as positions (V-4, CX-2).
5. **A pop rule with no threshold gap.** Judge a leaving seat on the number of frames it spends between 0.9 and 0.1 against the plate morph's own length (V-3).
6. **Leaving seats on the compact rung** need either an aperture that clips them progressively or a fade that coverage does not override (CX-4).
7. **The warm-collapse time split**: the leaving face clears in about 80 ms of a 250 ms morph. Whether content should travel with the glass on a collapse (F-9) is a design question for the next pass.
8. **The W1 `card` witness against floor row 1's card**, and W7 `gutter` / `badge` (O-67), both outside what any route can pass today.
9. **The warm-pair filmstrip tool**: `D2-Bp-filmstrip.mjs` needs the scene hooks, or a wait longer than `DOCK_COLLAPSE_DELAY_MS`, before its strips count (V-1).

---

## 8 · Verdict

**ADVANCE, 68 %.** B′ turns W3 continuous in both engines at the shipped clock, with an idle body, a per-frame cost of 0.3-1.5 ms (Chromium, 1× to 4×) and no crash anywhere unshimmed. Its failures are in its own content layer. Coverage opacity is applied at cell depth and blanks the swap. The ownership hand-off has no scope, and it snaps the library's own seat exchange and throws on an infinite effect. Compaction's leaving seats pop under coverage. One observer is duplicated. Each has a fix inside the family, so none is a missing primitive (not BLOCK). The BANK re-trigger is not met (item 2), and D2-G has not been measured under the same H2, so nothing here dominates it (not BANK, not RETIRE). The shared rows (P1 `card`, P2 F-19, P3 Q-4 and the resize scene) wait on the owner and the agglomeration.

## 9 · Open gaps (checklist rows that do not pass)

1. **P1** (shared): W1 `card` ×3, both engines: the witness's one radius against the floor's pill-to-card lerp.
2. **P2** (shared): W2 `route1·long-run-v` keyboard, F-19.
3. **P3** (shared, Q-4): `reversal` `window` (Chromium 4/4, Playwright WebKit 2/4) and `viewport-resize` `span` 6.09 px.
4. **F5**: two MutationObservers on the run's `childList` (CX-5).
5. **Item 1**: the swap's leaving face drops in one frame and the entering face is hidden until the landing (CX-1).
6. **Item 7**: compaction's leaving seats pop, 13-21 ms, in frames 1-3 (CX-4).
7. **Item 8**: the hand-off steps the open-seat exchange 96 px in one frame (CX-2) and throws on an infinite size animation, with the window held open (CX-3); consumer compositions not run.
8. **Both-b**: the gestalt read fails on the swap (§6).

Outside the checklist, recorded: real Safari **UNMEASURED (owner's safaridriver checkbox)** in every cell; O-66 §2's 60 fps headed on a real GPU and the value.js, keyframes and fourier docks UNMEASURED; Q-7 hit-follows-paint not re-read by any H2 cell on the route.
