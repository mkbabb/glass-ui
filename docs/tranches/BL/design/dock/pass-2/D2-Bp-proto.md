# D2 · pass 2 · D2-B′ prototype: the measured scene, one integrator

| field | value |
|---|---|
| seat | D2 pass 2, D2-B′ prototype. Builds `D2-Bp-spec.md` on the real source on top of `floor.patch`, runs every H2 witness in both engines under the route, and answers REGISTRY §7.3 D2-B′ items 1-9 and "Both". Picks no winner (REGISTRY §7.5) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `04929544`; the worktree was cut at the checkout's HEAD `76f4209a`. `src/` between them differs only in `src/components/configurator/*` and `src/index.ts`, no dock file. `floor.patch` (sha256 `de432032f18918a1…`) applied clean |
| provenance | An earlier run of this seat wrote a draft patch and stopped at the 2026-09-25 20:50 usage-limit halt, with no report. This seat re-applied that draft on a fresh worktree (it reproduced the draft's tree byte for byte), reviewed it, changed it where review or measurement found a defect (§1.3), and re-measured everything. Every number below comes from this seat's runs, except the plant rows marked `bp10`: those ran on the draft, whose `src/` equals this seat's bp11 (`diff -r` clean) |
| patch | `D2-Bp-proto.patch` (this directory), sha256 `77df400d439ef059…`, 46 files, relative to HEAD + floor. Source +1393 / −1667 (net −274); tests +204 / −539; demo +15 / −15; `docs/design/tunable-anim.md` +1 / −2. `git apply --check` exit 0 on HEAD + floor, and HEAD + floor + patch equals the worktree (`D2-Bp-proto-records/apply-check.log`) |
| builds | `bp11` (every H2 run, probe and filmstrip); `bp12` (bp11 plus comment-only prose edits: its scene and demo bundles are byte-identical to bp11's, `diff -rq` empty); `bp13` (the final patch: bp12 plus the designed-lane landing, §1.3 item 1, which no shipped lane reaches; W3 re-run on it in both engines). All built with `../harness/build.mjs` in a scratch worktree, `node_modules` symlinked, every cache in scratch |
| adapter | `adapter-floor.mjs` unchanged (sha256 `60f487ed1ab707dc…`). `../harness/adapter-law.mjs --diff`: L-1..L-5 hold; the diff against `adapter-head.mjs` is the floor's 36 lines (`D2-Bp-proto-records/adapter-law.log`). B′ keeps the floor's DOM contract, so no route adapter was written (H-6) |
| engines | Chromium headless; **Playwright WebKit** headless, **unshimmed in every cell** (the floor adapter carries no shim; 0 crashed cells). Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; the run log records safaridriver's own refusal ("session not created … timed out while connecting to a Safari instance") |
| records (source of record) | `D2-Bp-proto-records/`: `bp-cells.json` (every cell of every run, joined to the floor's verdict, written by `D2-Bp-cells.mjs`), `run-bp11-{light,dark}.log`, `w3-light-rerun{1,2}.log`, `w3-bp13.log`, `probes-bp11.{json,log}`, `probes-cost-bp11.{json,log}`, `plants/` (this seat's plants) and `plants-bp10/` (the draft's), `band-arm/`, `film/`, `selftest-w3-*.log`, `typecheck.log`, `vitest-*.log`, `boot-graph.log`, `build-*.log`, `apply-check.log`, `adapter-law.log`, `plants-variants.py` and `chain.sh` (the plant definitions and the run chain) |
| tools written | `D2-Bp-cells.mjs` (flattens a run and joins it to `FLOOR-records/floor-cells.json`); three arms in `D2-Bp-probes.mjs`: `rotlead`, `pop`, `plead` (§4); one harness fix in place: the Chromium faces sampler in `../harness/w3-morph.mjs`, documented in `../harness/HARNESS.md` (§3.3) |
| load | the 1-minute load average sits beside every cell in the records. Other seats ran browsers throughout: 11-41 during the H2 runs, 10-19 during the probes. Every timing witness ran at least twice; W3 ran five times |
| fences | Checkout writes: this file, `D2-Bp-proto.patch`, `D2-Bp-probes.mjs`, `D2-Bp-cells.mjs`, `D2-Bp-proto-records/`, `../harness/w3-morph.mjs`, `../harness/HARNESS.md`. Git writes: `worktree add` / `worktree remove` only |

---

## 0 · In brief

- **B′ is built as specified, with five deviations, each measured** (§1.2). One body (`useDockBody`) steps every lane on one rAF and parks. One scene (`useDockScene`) holds the layout-space model and writes plate insets and radius, region and cell translates, and seat opacities. `useDockMorph`, `dockMorphMeasure` and `useDockSpring` are deleted, and so are the box scale, the counter-scale, the aperture, `--dock-morph-t` / `--dock-t`, the ordinal stagger and the 840 ms settle timer.
- **H2 under the route, counted cells passing** (floor in brackets; §3):

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark | Safari |
|---|---|---|---|---|---|
| W1 corner | 19/22 (13) | 19/22 (13) | 19/22 (13) | 19/22 (13) | UNMEASURED (owner's safaridriver checkbox) |
| W2 run | 7/8 (7) | 7/8 (7) | 7/8 (7) | 7/8 (7) | UNMEASURED (…) |
| W3 morph | 13/17 +2 UNMEASURED (3/19); re-runs 17/19, 17/19, bp13 17/19 | 16/19 (3) | 17/19 (2); re-runs 18/19, 17/19, bp13 15/19 | 15/19 (2) | UNMEASURED (…) |
| W4 state | 13/13 (12) | 13/13 (12) | 13/13 (12) | 13/13 (12) | UNMEASURED (…) |
| W5 rim | 6/6 (6) | 6/6 (6) | 6/6 (6) | 6/6 (6) | UNMEASURED (…) |
| W6 collapsed form | 4/4 (2) | 4/4 (2) | 4/4 (2) | 4/4 (2) | UNMEASURED (…) |
| W7 edge | 6/18 +2 RECORD (6) | 6/18 (6) | 6/18 (6) | 6/18 (6) | UNMEASURED (…) |
| W8 motion | 6/6 +3 UNMEASURED (3) | 6/6 (3) | 6/6 (2) | 6/6 (2) | UNMEASURED (…) |
| R6 probe | 1/1 +RECORD (1) | 1/1 (1) | 1/1 (1) | 1/1 (1) | UNMEASURED (…) |

- **What stays red, and whose it is** (§3.2): W1 `card` on the three card morphs (the witness requires one radius per morph; the floor's card is a pill collapsed and 24 px expanded, 4 px apart by design); W2 `route1·long-run-v` keyboard (F-19, red at HEAD and floor); W3 `reversal` `window` (4/4 Chromium, 3/4 Playwright WebKit) and occasional 0.4-5.4 ms `window` misses elsewhere (the Q-4 landing clock); W3 `viewport-resize` span (a scene fact every route fails, spec P-6); W7 `gutter` and `badge` (O-67, not built by any route).
- **The BANK re-trigger is not met** (item 2): a lead insertion that translates 22 cells costs at most 2.15 ms of main thread per morph frame at 1× and 7.5 ms at 4× CPU throttle in Chromium, and Playwright WebKit's p95 interval stays at 12 ms for 8-42 cells.
- **Three instruments were hardened** because a plant passed through them: the C-6 rotate arm could not see a wrong position reader (`rotlead`); no witness could see a compaction pop (`pop`); the Chromium faces sampler gave up before the dock's 3.6 s hover-out delay, so the warm pair's faces were UNMEASURED on every build, HEAD and floor included (§3.3).
- **Two defects in the draft were cured here** (§1.3): a designed bounce (Q-5 (b)) could never paint, because the body seated every lane on reaching its 0.5 px band; and five comments still described the struck root-level `--dock-expand-t` morph.

---

## 1 · What was built

### 1.1 · Files (relative to HEAD + floor)

| action | file | what |
|---|---|---|
| new | `src/components/dock/composables/useDockBody.ts` (241 lines) | the body: one rAF, lanes of kind `spatial` (reduced motion seats them) or `fade` (reduced motion keeps them), parks when every lane has seated; `provideDockBody()` / `useDockBody()` (a standalone crossfade mints its own). The band's sole `new SpringProgress` (`:114`) |
| new | `src/components/dock/composables/useDockScene.ts` (764 lines) | the model, the one ResizeObserver, the triggers, the episode, the per-frame writer, coverage and clearance opacity, the overflow flag (moved from `useDockRun`), the `data-morphing` window, the size-transition hand-off, the compaction hold |
| delete | `useDockMorph.ts`, `dockMorphMeasure.ts`, `useDockSpring.ts` | the scale orchestrator, the endpoint RO, the per-handle spring |
| modify | `GlassDock.vue` | `useDockScene` + `provideDockBody` replace the orchestrator and endpoint publisher; the plate and `.dock-layers` get template refs; `markExpandFlip` and its watch go |
| modify | `DockCrossfade.vue` | `measurePeak`, the monotonic reserve and the `reserve` prop are struck; the swap is one `fade` lane on the dock's body, split in time at 0.35 |
| modify | `useDockClickIntegrity.ts`, `constants.ts` | `MORPH_SETTLE_MS` (840 ms) and the timer backstop struck; `[data-morphing]` is the one window |
| modify | `useDockRun.ts` | the overflow RO and `judgeOverflow` move to the scene; the reach glide is a lane on the body |
| CSS | `shape.css`, `layers.css`, `morph.css`, `crossfade.css`, `dock.css`, `index.css`, `shell.css`, `scroll-rungs.css`, `shell-regions.css`, controls | the box scale, counter-scale, `--dock-live`, the held `inline-size`, the ordinal stagger table, `--dock-morph-t` / `--dock-t` and their `@property`, the plate's `clip-path` aperture and its PRM twin are struck; the root's `box-shadow` moves to `.dock-plate`; pointer-events per spec §2.8; the compact rung holds `[data-dock-leaving]` seats out of flow |
| tests | `GlassDock.motion-parity.test.ts`, `GlassDock.stagger.test.ts`, `dockMorphMeasure.test.ts` deleted; `useDockBody.test.ts` new (7); `g-dock-lattice.test.ts` G-DOCK-MORPH re-authored over the scene; `DockLayerSwitcher.a11y.test.ts` adapted to the time-split crossfade | |
| demo | `overview.vue`, `dock-search.vue` | the struck `reserve` prop and a stale prop binding |

### 1.2 · Deviations from the spec, each with its reason and measurement

1. **The body's dt is frame time, not `performance.now()`** (spec §2.5). `last` is `document.timeline.currentTime` at the kick, and each step is `min(33.3, max(0, now − last))` on the rAF timestamp. The `max(0, …)` makes Chromium's pre-stall timestamp (spec P-5) step 0 instead of stepping a stale interval. Measured on the prototype (`pblock`, load 11-13): after a 1,206.5 ms block Chromium's next step is 20.43 px; Playwright WebKit's is 94.61 px (the 33.3 ms cap); the spec's `performance.now()` variant read 94-95 / 92-99 px. The spec's rule (resume where frozen, at most two frames' worth per frame) holds in both engines.
2. **Sizes are read from computed style at the check, not from RO entries** (spec §2.2). A posture flip's `flush: "post"` check reads the new layout before the ResizeObserver has delivered it. The values are the used border and content boxes, sub-pixel and transform-free.
3. **The scene owns a MutationObserver that calls `check()`** (`useDockScene.ts:737`), beside `useDockRun`'s roving observer (`useDockRun.ts:303`). The spec said to add `track()` to the existing observer instead. It is load-bearing: without it (plant `bp-nomo-track`) a seat prepended to a stretched run jumps 48 px in one frame in both engines (`stretch` arm), where the prototype glides over 33 (Chromium) / 24 (Playwright WebKit) frames. The two observers watch different scopes (the run's childList and `aria-current`; the root's childList and text). One root observer with two subscribers is owed (P-3); it is not built here because it reorders GlassDock's composables and would invalidate every W3 cell measured (§9).
4. **The window closes on the 0.5 px landing, not on the 2 % band** (spec §2.7, Q-4 (a)). H2's `window` check requires the flag to clear within a frame of the extent landing (W-8). The draft's band arm (`band-arm/`, bp9, load 34-43) failed `window` on 16 of 19 Chromium cells, closing 2-6 frames before the landing. §5 Q-4.
5. **A lane seats on reaching its band only on the dock rung** (this seat's change, §1.3 item 1).

### 1.3 · What this seat changed in the draft

1. **A designed bounce could not paint.** The draft's body marked a lane landed on the first frame within 0.5 px of its target, and also seated a crossing step that ended inside that band. On the dock rung (ζ 0.88) that is right: it is what makes the landing dead (O-64 R-3, 0 overshoot on every W3 cell). But it also applied to a lane given a lower damping fraction, so Q-5 (b) was unexpressible. The draft's own Q-5 (b) run (`plants-bp10/bp-q5b.log`, edge lanes at ζ 0.72) painted 472.67 → 478.05 → 481.66 px and stopped: 0 px overshoot on every cell, and a 3.45-3.61 px last step. The body now distinguishes the two cases. A lane on the rung lands on the band. A lane given `dampingFraction` is a designed bounce, and it seats only at rest: in the band and slower than `eps` per 60 Hz frame (`useDockBody.ts:13-24`, `:165-175`). The same plant on bp13 paints a 14.55 px overshoot on the 379.66 px expand (`plants/bp-q5b-bp13.log`), against exp(−πζ/√(1−ζ²))·D = 0.0384 × 379.66 = 14.6 px in closed form. No shipped lane passes `dampingFraction` (grep), and W3 on bp13 reads as on bp11 (§3.1). A unit test for it was written and dropped: at fixed 60, 100 and 120 Hz frames the draft's body also painted the ζ 0.72 overshoot, so the test could not fail. The browser mechanism is not isolated in a unit (§9).
2. **Prose.** `shell.css` (three comments), `cta-seat.css` and `GlassDock.vertical-collapse.test.ts` described the struck root-level `--dock-expand-t` morph or the child stagger (§8).

---

## 2 · Typecheck, unit, build

| check | result | record |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 (bp11 and bp13) | `typecheck.log`, `vitest-dock-bp13.log` |
| library build (`vite build`, cache in scratch) | exit 0 | `build-lib.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 (after the library build) | `typecheck.log` |
| demo dist build | exit 0 | `build-demo-dist.log` |
| dock suites (`tests/components/custom/dock`) | 15 files, 130 passed, 1 expected fail (bp11, bp12 and bp13); the floor's 17 files less the three deleted suites plus `useDockBody.test.ts` | `vitest-dock.log`, `vitest-dock-final.log`, `vitest-dock-bp13.log` |
| full suite (`vitest run`, load 18-35) | 239 files: 2319 passed, 10 expected fail, 1 skipped, 3 failed, all in `gates/boot-graph.test.ts`, which measures a built `dist-demo`. After the demo dist build: 14/14 | `vitest-full.log`, `boot-graph.log` |

The draft's full run at load 41-62 had also lost the DropdownMenu focus-restore contract and four `glass-subtlety` cells; neither reproduced in this seat's run. The floor recorded the same menu flake (FLOOR §3).

---

## 3 · H2 under the route

`node ../harness/run.mjs --build bp11 --adapter adapter-floor.mjs --safari`, light and with `DOCK_HARNESS_THEME=dark`; W3 again twice in light (`w3-light-rerun{1,2}.log`) and once on bp13 (`w3-bp13.log`). The per-cell join to the floor is `bp-cells.json`, field `floor`.

### 3.1 · W3 per cell across the five runs (Chromium / Playwright WebKit)

Order: light, dark, re-run 1, re-run 2, bp13. P = pass, F = fail (check), U = UNMEASURED.

| cell | Chromium | Playwright WebKit |
|---|---|---|
| `reversal` | F window ×5 (259.7-269.3 ms after the retarget, allowance 256.9-258.3) | F, F, P, F, F window (264-269 ms, allowance 259.6-262.6) |
| `viewport-resize` | F ×5 (span 6.09 px, 0 window frames) | F ×5 (same) |
| `anchor-end·warm-expand` | F window (259.2 vs 257.6), P, P, P, P | P, F window (266 vs 260.6), P, P, F (265 vs 259.6) |
| `anchor-end·warm-collapse` | P, F window (258.8 vs 258.1), P, P, P | P ×5 |
| `first-expand` | P ×5 | P, F window (260 vs 259.6), P, P, F (260 vs 259.6) |
| `lead-add` | F terminal (0.92 px after 0.42, bound 0.79), P ×4 | P ×5 |
| `warm-collapse`, `warm-expand` | U (light: the old faces sampler, §3.3), P ×4 | P ×5 |
| every other cell (content ±, lead-remove, swaps, hidden-shown, ticking, seat-transition, wide ×3, anchor-end warm-collapse in WebKit) | P | P |

Every cell outside `reversal` and `viewport-resize` that went red did so at most twice in five runs, always at load 11-41 (above 8), and by 0.4-5.4 ms. Under the load law these are NOT-REPRODUCED, and they belong to the same class as `reversal`: §3.2.

### 3.2 · What stays red, and whose it is

| cells | reading | owner |
|---|---|---|
| W1 `card·first-expand`, `card·warm-collapse`, `card·warm-expand`, both engines, both themes | the corner is circular in every frame (worst 0.098-0.141 px Chromium; 0.56-1.46 px in the Playwright WebKit screencast, bound 2.5), the extent agrees, it moves. `card` fails because the witness requires one radius across the morph ("the same in every frame as at rest"), and the floor's card is a pill (27.93 px) collapsed and `--dock-card-radius` (23.93-24.55 px) expanded (`shell.css`, FLOOR row 1). The fitted-radius spread is 3-4 px in Chromium; in Playwright WebKit the two lossless rest radii differ by 4 px against a 1 px bound. No carrier can pass it while the rests differ | the harness and the floor: the witness and the floor's card disagree about whether a card changes radius between rungs. Recorded for the agglomeration, not minted (§7.5) |
| W2 `route1·long-run-v` keyboard (Seat 1 unreachable by Tab and arrows, 10/11) | identical at HEAD and floor | F-19 / D1 |
| W3 `reversal` window; the scattered `window` misses above | the window closes when every spatial lane lands within 0.5 px. The dock rung reaches 0.5 px on a 380 px travel at about 245-266 ms (S-14, F-7), and the allowance is the pinned clock 214.2 ms + 2 frames + stall, 256.4-262.6 ms. A centred posture morph moves two edges of about 190 px each and lands inside it (245-252 ms); a right-anchored morph moves one edge the full 380 px and sits on the margin; a reversal's second leg starts near full speed and runs 259.7-269.3 ms after the retarget. H2 requires the flag to clear within a frame of the landing, so closing at the 2 % band fails instead (§1.2 item 4) | Q-4, the owner's (§5) |
| W3 `lead-add` terminal (1 of 5, load 30.9) | each plate edge seats within its own 0.5 px, so when both edges seat in one frame the extent's last step can reach about 1.0 px. Tightening the edge band to 0.25 px would add about ln 2 / (ζω) = 0.693 / 18.4 s⁻¹ ≈ 38 ms to every landing, which would push every centred morph past the window allowance. Recorded, not tuned | Q-4 with the above |
| W3 `viewport-resize` span 6.09 px | the fit dock's rest extent moves 6.09 px between 1440 and 1200 px viewports because its label seats follow a fluid font (spec P-6). The half B′ owns reads 0 morph-window frames | the scene (spec R-9); every route fails it |
| W7 `gutter` (0 px, bound ≥ 8) on side and canvas docks, `badge` on side docks | O-67's gutter and reserved badge seat; the spec proposes both as floor questions and neither is built | the agglomeration / floor (spec §4) |

### 3.3 · The harness change: the Chromium faces sampler

`facesByShots` (`../harness/w3-morph.mjs:96-123`) stopped waiting after 1.5 s without a change, inside a 3.5 s cap. The dock's hover-out delay is 3.6 s (`DOCK_COLLAPSE_DELAY_MS`, `constants.ts:61`), so in Chromium the faces pass never saw the warm collapse. The warm pair's `faces` came back "UNMEASURED (the faces pass saw 0 px of travel)" on every build: the floor records carry it (`FLOOR-records/floor-cells.json`, warm pair) and so did this route's first light run. Playwright WebKit's screencast path already waited 4 s (`waitChange`). The sampler now waits `FACES_START_MS` = 4000 ms, the strip pass's own cap, before giving up on a change, inside a 6.5 s cap. `../harness/HARNESS.md` records it on the W3 row.

Self-test (Chromium; the change touches only the Chromium faces pass):
- the two plants that target `faces` on the warm expand, `overhang` and `adapterclip`, still fail, 2/2 (`selftest-w3-faces.log`, load 31-35);
- the fixture: 19/19 once, and 18/19 twice, both times on `lead-remove` `window` ("closed 3 frames after the extent landed", load 18-20). That is a strip-pass reading, which the change does not touch, seen only under load: NOT-REPRODUCED. A low-load fixture run is owed (§9).

With the change the warm pair reads 0 px of face ink beyond the plate, with 6 frames in flight (`w3-light-rerun1.log`).

### 3.4 · Unshimmed Playwright WebKit, O-64, O-65, O-66, O-67

- Every Playwright WebKit cell above is unshimmed; 0 crashed (floor row 6).
- **O-64:** R-1 (first-morph endpoints) green in every run, both engines. R-2 (content change of an expanded dock; swaps) green: `content-add` 179.33 px glides (step ×0.65, window 238.8 ms, 0.3 % of D off the analytic spring); swaps 244.98 px likewise. R-3 (no sub-pixel settle reversal): `landing` "dead", 0 overshoot and 0 reversals on every W3 cell. R-4 (the window on the rung's clock): §3.2. R-5 (one owner): `owners` 0 on every cell, including `seat-transition` and `ticking`. R-6: H2's probe, `ring·static` green in both engines, the arms not isolated, as at HEAD.
- **O-65 (W6):** 4/4 both engines, both themes; `form·expand` rides the same episode (window 240.7 ms Chromium, 235 ms Playwright WebKit) with 0 px of form ink beyond the plate, and the collapsed and expanded plate are the same element.
- **O-66 §2 (W8):** `sharp` 6/6 (0 unsharp frames on expand, collapse, content-add and compact); headless pacing p95 8.9-12 ms. 60 fps headed on a real GPU, and the value.js, keyframes and fourier docks: UNMEASURED (headless; value.js fenced).
- **O-67 (W7):** unchanged from the floor (§3.2).

---

## 4 · REGISTRY §7.3 D2-B′ items 1-9

Plant rows run in Chromium unless both engines are named; `bp10` rows are the draft's (load 29-52).

| # | item | status | evidence |
|---|---|---|---|
| 1 | per-seat FLIP: every declared seat inverted; leaving seats hold and fade; no double exposure, no collisions | **MET under H2** | W3 `seatStep` / `seatOverlap` green on first expand (×0.65, 13.02 px), lead ± (×0.6, 2.85 px), content ±, swaps, warm pair, both engines, every run, 0 overlap frames; W4 `compact·non-first-current` ×0.53 (1.34 px vs 2.51) Chromium, ×0.57 (2.05 vs 3.57) Playwright WebKit, where the floor stepped 18.79 px; `faces` 0 px on every morph. Plants: `bp-nocell` (cells not inverted) → `lead-add` seat step ×9.29 (69.69 px); `bp-overlap` (no time split) → 20-22 overlap frames on the posture morphs (`plants-bp10/`) |
| 2 | the BANK re-trigger: a per-seat-FLIP cost trace against 16.7 ms, both engines | **NOT MET (the route stays ADVANCE)** | `plead` (a seat prepended: every cell translates on its own lane), load 11-16: Chromium 1× main thread 0.217-0.392 ms per rAF frame for 8-42 cells, p95 interval 8.9-9.5 ms; at 4× 0.681-1.247 ms, p95 9.7-10.2 ms, 1 frame over 25 ms at 42 cells. Charging all main-thread time to morph frames, 22 cells cost ≤ 2.15 ms (1×) / 7.5 ms (4×) per morph frame. Playwright WebKit p95 12 ms for 8-42 cells (its idle-row p95 is also 12). Posture morphs write 0 cells (`pcost` expand: 0.116-0.277 ms per frame at 1×) |
| 3 | the body merge: one rAF, parks at rest; `useDockSpring` gone; H-3c reversal green | **MET, with the window red** | `useDockSpring.ts` deleted; the only `new SpringProgress` in the band is `useDockBody.ts:114`. `idle`: 262 rAF calls in 2 s after a morph against 263 / 258 before (Chromium), 195 against 196 / 196 (Playwright WebKit); plant `bp-norest` → 532 against 265 ("runs at rest", `plants-bp10/`). `reversal`: trajectory before the retarget 0.62 px and after it 0.6-1.2 px (tolerance 7.96-8.33), dead landing; plant `bp-wall` (velocity reset on retarget) → 24.84 px after the retarget against 6.49 (`plants-bp10/`). The reversal's `window` is §3.2's Q-4 class |
| 4 | hidden mount, consumer width, resize | **MET** (the resize span is the scene's) | W3 `hidden-shown`: the dock appears at its rest, 0 px from it, both engines; W2 route 5 (a 240 px consumer width on the root): plate outside the root 0 px, face ink beyond the plate 0 px, reach 8/8 by pointer, keyboard and AT; W3 `viewport-resize`: 0 morph-window frames. Plant `bp-resizemorph` → 33 window frames (`plants-bp10/`) |
| 5 | the observer: one trigger, or a witness that fails without the second | **MET by probe; one observer owed** | the ResizeObserver is the one geometry trigger; the scene's MutationObserver is the content trigger, and without it a seat prepended to a stretched run jumps 48 px in one frame in both engines (`stretch` arm; plant `bp-nomo-track`, `plants/bp-nomo-track.log`), where the prototype glides over 33 / 24 frames. No H2 cell sees it: under the plant W3 in Chromium reads 15/19, the same reds as the prototype (`reversal`, the anchor-end `window` margins, `viewport-resize`), and every content, lead and swap cell green (load 16-18). The two MutationObservers in the band are §1.2 item 3 |
| 6 | the landing: strike the clamp or shape a designed bounce | **MET: Q-5 (a) shipped, (b) expressible and recorded** | rung lanes land on the band: `landing` "dead" on every W3 cell, both engines. Designed lanes land at rest (§1.3 item 1): `bp-q5b` on bp13 paints 14.55 px of overshoot on the 379.66 px expand (closed form 14.6 px); H2 judges it against the pinned ζ 0.88 rung, so it fails `landing`, `trajectory` (26.3 px, 6.93 % of D) and `window` (347.6-350.3 ms) by design. That is the owner's record for Q-5, not a verdict. Plant `bp-ring` (ζ 0.6) fails `trajectory` on every cell (12-13 % of D, `plants-bp10/`) |
| 7 | compaction leaves through the closing aperture or fades on the spring; no compounded scale | **MET; its visible fade is 1-2 frames long** | W4 13/13 both engines: `compact·seat-scale` ratio 1 (no seat below the plate's ratio), `non-first-current` above, `prm·compact` 0 frames between rungs; W8 `sharp` on compact 0 unsharp frames. `pop` arm (both engines): 2 leaving seats, 0 popped. The frames each spends between 0.95 and 0.05 opacity number 2 (Chromium) and 1 (Playwright WebKit): the seat holds its place and its opacity is `min(coverage, fade)`, and the closing edge takes it through the 4 px coverage ramp before the fade lane has gone far. So the seats leave through the closing aperture without being cut mid-glyph, and the fade lane is not what the eye sees. Plant `bp-pop` (`display: none` at the flip) → both seats pop, 0 fade frames, both engines (`plants/bp-pop.log`). Whether a 1-2 frame exit carries enough weight (D-1) is the critic's gestalt call |
| 8 | consumers: wide `#collapsed` (Q-10), right-anchored, a consumer width, an ancestor rotate, value.js X-11 | **MET on every harness scene; consumer repos not run** | W3 `wide·collapsed-rest` / `wide·warm-*`: 0 px of face ink beyond the plate (both engines); `anchor-end·*`: anchored edge drift 0 px; W2 route 5 above (fourier K-14 is a consumer width on the root); `rotlead` arm, both engines: the first translate written on the old first seat reads `-48px` with and without `rotate(12deg) scale(0.85)` on the host, and plant `bp-rect` (positions from `getBoundingClientRect`) reads `-39.91px -8.48px`, 8.09 px off (`plants/bp-rect.log`); W3 `seat-transition` (a seat's own 0.3 s width transition): one window, 0 two-owner frames, handed off with a dev `console.error`. The draft's `rotate` arm stays in the file but cannot fail (a posture morph never moves a region inside the root), which is why `rotlead` exists. value.js, keyframes, fourier and chicago compositions: not run (value.js fenced) |
| 9 | the extent under a 1.2 s main-thread block, recorded | **RECORDED** | `pblock`, load 11-13: Chromium frame gap 1,206.5 ms, step across it 28.28 px (7.4 % of D), next step 20.43 px, landed at 1,424.8 ms; Playwright WebKit gap 1,203 ms, 31.67 px across, next 94.61 px (the 33.3 ms cap), landed at 1,446 ms. The floor's carrier leapt 162.5-211.3 px after the block (spec P-5) |

---

## 5 · "Both", the floor rows and the owner questions as built

- **Every cell in both engines under H2 with a reviewed adapter:** §0 and §3; the adapter is the floor's, unchanged, L-1..L-5 holding (header).
- **Filmstrip gestalt** for the critic: `D2-Bp-proto-records/film/filmstrip-{first-expand,warm-collapse,warm-expand,swap-long,content-add}.png` (Chromium screencast, 40 ms per tile, the first tile the last frame before the trigger, load 15-16). What this seat sees, for the critic to check: the glass leads; on the first expand "P" fades out before "1 2 3" appear, and the seats appear as the plate reaches them; on content-add "Brushes and layers" fades in as the trailing edge arrives; nothing overlaps, nothing scales, nothing teleports; the landing is dead, with no visible bounce (Q-5 (a)).
- **`DockProps` against Q-3:** 7 (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`), the floor's count; B′ adds 0. `DockCrossfade` loses `reserve` (−1, no consumer mounts it). The barrel loses `useDockMorphOrchestrator` with no alias.
- **Floor rows 1-7:** applied unchanged. B′ moves row 5's endpoint RO and the overflow RO into the scene's one observer without changing the overflow definition (W2 7/8 as on the floor), and strikes row 5's `--dock-*-px` publisher.
- **Real Safari:** every cell UNMEASURED (owner's safaridriver checkbox), including whether a negative `inset` on a `backdrop-filter` plate keeps the lens in shipping Safari.

| Q | default applied | as built |
|---|---|---|
| Q-1 cut cap | (a) | the floor's; the overflow cue gap stands |
| Q-2 overflow | (a) | the floor's gutter; cell FLIP can extend the scroll range transiently (spec R-5) |
| Q-3 props | (b) | 7 |
| Q-4 clock | (a) | **Found unbuildable as H2 encodes it.** H2 requires the window to close within a frame of the landing, so the window closes at the 0.5 px landing, and the landing takes 245-269 ms against a 256.4-262.6 ms allowance. Centred morphs pass; right-anchored morphs miss by 0.7-5.4 ms at load; the reversal's second leg misses every run. Closing at the 2 % band fails `window` 2-6 frames early. The measurement asks the owner for (c), a dock-only clock, or an amended W3 window |
| Q-5 bounce | (a), (b) as a parameter | (a) shipped; (b) is now a lane parameter that paints its bounce (§1.3), recorded once |
| Q-6 canon P5 | (a) | the plate's insets and radius are written per frame on a leaf nothing reads; regions and cells move by `translate` only |
| Q-7 hit | (a) | spec §2.8's pointer-events; not re-measured by a cell here (the spec's `hit` arm measured it on the floor) |
| Q-8 rim | (a) | the floor's rim is `inset: 0` inside the plate and follows the insets; W5 6/6 |
| Q-9 retired facilities | (a) | nothing revived |
| Q-10 collapsed face | (a) | W3 `wide·*` green |

---

## 6 · Cost row (for comparison with D2-G)

| measure | B′ | source |
|---|---|---|
| source lines | +1393 / −1667 (net −274) over the floor; two new composables (241 + 764 lines), three deleted | `D2-Bp-proto.patch` |
| per-frame cost, posture morph (0 cells written) | Chromium 1×: 0.116-0.277 ms main thread per rAF frame; 4×: 0.478-1.263 ms; p95 interval 8.4-12.9 ms | `probes-cost-bp11.json`, `pcost` |
| per-frame cost, lead insertion (every cell written) | Chromium 1×: 0.217-0.392 ms per rAF frame (≤ 2.15 ms per morph frame at 22 cells); 4×: 0.681-1.247 ms (≤ 7.5 ms per morph frame at 22 cells); Playwright WebKit p95 12 ms | `plead` |
| under a 1.2 s block | freezes with the main thread; resumes at most two frames' worth per frame (20.43 px Chromium, 94.61 px Playwright WebKit) | `pblock` |
| idle | the body requests 0 frames at rest | `idle` |
| DockProps | 7 (+0) | §5 |
| real Safari | UNMEASURED (owner's safaridriver checkbox) | — |

---

## 7 · The patch against the spec's file table

Every row of spec §2.1 landed except the two spec deviations named in §1.2 (the scene's own MutationObserver instead of a `track()` call in `useDockRun`'s; sizes from computed style at the check). The net is −274 source lines against the spec's estimate of about −650 / +600.

---

## 8 · Prose sweep (PF-10)

Every touched file was searched for `--dock-morph-t`, `--dock-t`, `aperture`, `cut cap`, `--dock-size-scale`, `--dock-{expanded,collapsed}-px`, `useDockMorph`, `dockMorphMeasure`, `useDockSpring`, `MORPH_SETTLE`, `stagger`, `counter-scal`, `--dock-live`, `measurePeak` and `markExpandFlip`, and for prose that describes a struck mechanism.
- Corrected by this seat: `shell.css` (the vertical chrome comment, the vertical card radius comment and the horizontal card comment said the radius and padding "morph on the same `--dock-expand-t` scalar" at the root; the scene now carries the plate between the class rests); `cta-seat.css` (the child stagger); `GlassDock.vertical-collapse.test.ts` (`outerLayerAxis` and the "aperture the morph rides").
- Left, with reason: "aperture" in `run.css:115`, `shell.css:271` and `dock-search.vue` names the persistent region or the `#search` slot, not the struck clip; `dock.css:4` states the root cause the plate split answers, and B′ does not touch it; `shape.css:25`, `run.css:29` and the `g-dock-lattice` comments record the struck cut cap as struck; `cta-seat.css` still says the reveal does not ride the dock's morph, which is true.
- `--dock-expand-t` remains, with a narrower meaning: the class rest value per posture (`morph.css`), and mid-morph an inline value on the plate only (`useDockScene.ts:334`).

---

## 9 · Open gaps

1. **Q-4 (the owner's):** the window cannot close within a frame of a 0.5 px landing inside 214.2 ms + allowance for a full-travel edge or a reversal (§3.2, §5). Until the owner rules, `reversal` stays red and right-anchored morphs sit on the margin.
2. **The W1 `card` witness against the floor's card** (§3.2): every route fails it while the card is a pill collapsed. For the agglomeration; not minted.
3. **One content observer, not two** (§1.2 item 3): the cure is one root MutationObserver serving the scene's check and the run's roving tab stop.
4. **Item 7's weight:** the compaction exit is 1-2 frames of visible fade at the aperture (`pop`), for the critic's D-1 read.
5. **The terminal step of a two-edge landing** can reach about 1.0 px (§3.2); tightening it costs about 38 ms of window.
6. **The designed-lane landing has no unit witness**: a unit at 60, 100 and 120 Hz does not reproduce the draft's in-browser seat, so only the browser plant pair (0 px on bp10, 14.55 px on bp13) shows it.
7. **The W3 fixture under the new faces sampler** passed 1 of 3 at load 15-20, failing a strip-pass `window` check the change does not touch; a low-load fixture run and the full self-test are owed.
8. **The spec's per-seat `hit` reading (Q-7)** was measured on the floor by the spec seat; no H2 cell re-reads it on the prototype.
9. **Consumer compositions** (value.js rotate and X-11 in place, keyframes, fourier, chicago) are measured only through the harness scenes; value.js is fenced.
10. **Real Safari:** every cell UNMEASURED (owner's safaridriver checkbox), including the negative-inset lens and the crash-free mount on shipping Safari.
11. **60 fps headed on a real GPU** (O-66 §2): UNMEASURED.
