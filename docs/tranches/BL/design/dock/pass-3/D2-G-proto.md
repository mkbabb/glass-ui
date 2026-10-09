# D2-G prototype, pass 3: the sliding aperture on floor v2

| | |
|---|---|
| Seat | D2 pass 3, route D2-G (the sliding aperture), PROTOTYPE |
| Model | claude-opus-5-5 |
| Base | HEAD (the task names aea214b9; the worktree was cut at 49db558e, `src/` identical; the checkout is now at 809f1b7c, `src/`, `tests/`, `demo/` and `docs/design/` identical) + `pass-3/floor-v2.patch` (sha256 `deb90ecc…`) |
| Patch | `pass-3/D2-G-proto.patch`, 51 files, sha256 `8c593497707b71aabc7a2cad3f3d0d880a0b67ca23908f6885e70d574b18a012`. `git apply --check` is clean on HEAD+floor-v2. Applied to a temporary index of that tree, it writes tree `a5b6bc46`, the prototype worktree's tree byte for byte; `git apply -R --check` was clean in the worktree |
| Size | src +2449/−1504 (net +945), tests +119/−628, demo +4/−4, docs/design +1/−1. `useDockAperture.ts` is 1526 lines (prettier, print width 88) |
| Builds | **gp**, the final tree. **gpc**, the tree the main reading ran on; its scene bundle differs from gp's in one place, the text of one template comment (`records/gpc-gp-scene-diff.txt`, 1 hunk). gpc readings therefore stand for gp; gp itself was read again for W3 and `ticking` (§3.1) |
| Adapter | `pass-3/adapter-G-p3.mjs` (§3.3). No webkitShim, so every Playwright WebKit cell is unshimmed |
| Harness change | `harness/lib.mjs` and `harness/HARNESS.md`: the optional adapter read `hit()` (§3.4). The W1 self-test passes 12/12 with it (`records/selftest-W1-hit.log`) |
| Engines | headless Chromium and Playwright WebKit (playwright from the checkout's `node_modules`). Safari: UNMEASURED (owner's safaridriver checkbox) |
| Tools | `pass-3/D2-G-p3-run.sh` (driver), `pass-3/D2-G-p3-plants.py` (ten plants), `pass-3/D2-G-eager.mjs` (the boot-graph byte count), and the other route's probes, unchanged: `pass-3/D2-Bp-crit-probes.mjs`, `pass-3/D2-Bp-p3-probes.mjs`, `pass-2/D2-Bp-crit-probes.mjs`, `pass-2/D2-Bp-probes.mjs`, `pass-2/D2-G-crit-probes.mjs`, `pass-2/D2-G-cost.mjs` |
| Records | `pass-3/D2-G-proto-records/`: checks, adapter law, eager graph and the gp readings at the top level; `gpc/` the full reading (light, dark, probes, critic arms, cost, plants, reruns, `film/`); `strike-chardata/` the reading of a tree without `characterData` (§6) |
| Load | 10-core host shared with other sessions; load averages are recorded per log and per cell |

## In brief

G on floor v2 meets the five D2-G obligations and the three "Both" obligations in Chromium and Playwright WebKit, with one cost finding and four open items.

- A stall at the flip delays the motion instead of eating it: ST 10/10 in light, both engines; the crit `stall` arm replays from rest at the spring's cadence in Chromium (largest one-frame step 128 px of 380). The base leaps 102→481 px in one frame.
- The root MutationObserver is proven: without its subscription W3 `stretch·lead-add` fails in both engines (seat step ×8.98 and ×6.34).
- Hits follow paint at the arc: 0 of 80 lune points take a press (40 per engine); the plant without the hit pair's clip takes 80 of 80.
- The warm collapse carries its content with the glass (kept at 40 ms 0.70-0.85 of the rest ink, against the base's 0.55-0.75), and no swap troughs below 0.91 of the lower rest (the base reaches 0.338).

Every H3 witness passes in both engines, except cells that fail the same way on floor v2 (W2 `route1·long-run-v` keyboard, the W1 `card` radius), OWNER-BLOCKED Q-12 / Q-4 cells, and cells seen once under load that passed in two reruns (NOT-REPRODUCED). Ten of eleven plants fail the witness that should catch them; `nopainted` does not (§6).

Open:
- **Cost at 40 seats.** The Chromium 4× expand with 40 seats costs 12.7-16.4 ms of main thread per frame, with 5-6 frames over 25 ms (base: 4.01 ms, 2 frames). The boot graph grows by 19,623 B and passes its ceiling with 259 B to spare.
- **The flow drifts from the glass in Playwright WebKit.** In 2 of 7 readings of `neighbour·warm-expand` the plate overlaps the in-flow neighbour by 8.45-12.29 px; in 2 of 7 readings of `anchor-end·warm-expand` the anchored edge drifts 2.11 px or the step fails continuity. The flow is a main-thread lane; the glass is a compositor lane.
- **A retarget's leaving fade in Playwright WebKit** is 67-71 ms against a bound of 81-95 ms (4 of 6 cells), and the Chromium `retarget` probe does not run on G ("Execution context was destroyed", twice).
- **`paintedTau`** (the retarget clock read from paint) is not proven by any witness at load 24-33.
- **Safari.** UNMEASURED (owner's safaridriver checkbox).

## 1. What was built

G keeps the floor-v2 dock and replaces the morph carrier with `useDockAperture` (new), deleting `useDockMorph.ts` and `dockMorphMeasure.ts` with their four test files.

- **The boxes.** The plate sits still in the page inside two nested `overflow: clip` doors with the dock's corner, one per moving edge, each counter-translated. The visible window is their intersection, a stadium with an exact corner at every frame. The edge ring's arcs ride the doors as caps. The press surface is the hit pair (`.dock-hit`): two transparent doors on the same lanes, rounded by `clip-path: inset(0 round var(--dock-corner))`; the plate takes no presses. `.dock-layers` is the face door: through an episode it rides the end edge and is clipped by an inline `inset()` at the window's cross edges and at the inner side of the end edge's ring (or at the start of the persistent end region), with the end cap's arcs.
- **The episode.** Every change (a posture flip, a content change, a face swap, a leaving seat, a retarget of any of these) is one episode. At the flip the carrier takes the old painted geometry, reads the new natural geometry and releases lanes from old to new on the dock rung, carrying velocity: `a`/`b` (the window's edges), `σ` per seat (FLIP), `e` (`--dock-expand-t`), and the flow. Lanes are sampled at 120 Hz into linear WAAPI keyframes and pinned at the first crossing.
- **The clock (H3-4).** An episode from rest starts pending, so its start time is the first frame that renders it. A start the engine reports from before a block is moved to the frame after it (stale by more than 100 ms). A replay starts pending when the previous episode never started or the frame clock is stale. A retarget mid-flight reads the time from the faster door's painted `translate` (`paintedTau`), because WebKit samples on its live clock. A ResizeObserver delivery replays only when an observed size changed (`seen`), which removed a WebKit replay ~12 ms after the flip.
- **The content.** A leaving seat that an entering seat will cover fades first, and the entering seat waits for it. Every other leaving seat rides its face with the glass and is taken by the closing edge; it fades only if more than a sliver (0.05) is left when the window lands. A swap draws the new face over the old one behind a seam (clip-path cuts). A seat that leaves the DOM paints as a clone clipped by what moves into its place. A unit under the paint floor (0.05) also gets `visibility: hidden` keyframes, so it takes no press (Q-7).
- **The flow (N-1, H3-7).** An in-flow dock's layout length is given back to the page on the window's curve as root margins (`--dock-flow-lo`/`-hi`), split by the anchor the layout reports.
- **The window flag.** `data-morphing` opens when the lanes have a start and closes when everything that moves is within 0.5 px of its target.
- **`DockCrossfade`.** `leaving` is a set (`ReadonlySet<string>`); a retarget sends out every face still painting. `leavingId` became `leaving`; `DockLayer` reads `ctx.leaving.value.has(id)`.
- **`useDockContent`.** The one content observer, now with `characterData: true` (§6) and subscribers that receive the records (the carrier ignores its own clones).
- **`useDockSeatRetire`** lives in `dockContext.ts`, beside the context it reads. A seat's import of it no longer pulls the carrier into the eager graph (§8).

**Gates re-authored.** `g-dock-lattice.test.ts`: the trigger test checks the RO size skip; the lane property set adds `visibility`; the N-1 source test flattens whitespace so it reads one call per line whatever the formatter wraps. `useDockContent.test.ts` checks `characterData`. `dockCrossfadeContext.readonly.test-d.ts` uses `leaving`.

**Deviations from the pass-2 G prototype, each forced by a measured failure:**

| Change | Measured cause | Evidence |
|---|---|---|
| pending start, stale re-anchor, replay rules | ST Chromium `same-task`/`1raf` leap; pass-2 G5 | ST 10/10; `nostale` fails ST Playwright WebKit `1raf` |
| RO size skip | ST Playwright WebKit `2raf` (a replay reset the compositor's commit) | `nosizes` fails ST Playwright WebKit `2raf` |
| the seam | W3 swap blank for 10-13 frames | `noseam` fails `blank` (3, 12 and 9 frame runs) |
| face door clip at the ring's inner edge | W3 leaving seats cut at the padding line; faces ink beyond the plate (WebKit 22 px) | `noreach` fails `leaving` in `warm-collapse` and `swap-short`, both engines |
| visibility keyframes | hit probe: clipped-away seats took presses | `novis`: 6/6 and 5/5 ghost hits |
| leaving set | a retarget to a third face vanished in one frame | `noset` fails `retarget` `leaving` in every cell |
| hit pair | pass-2 Q5: hits clip to the window's rectangle | `nohit`: 80/80 lune hits |
| `characterData` | W3 `ticking` ×5.83 in Chromium without it | §6 |
| `useDockSeatRetire` moved | `boot-graph` 81 B over its ceiling | §8 |

## 2. Typecheck, unit tests, build (final tree)

Every command ran in the worktree, with outputs in the worktree's ignored dirs. Logs are in `records/`.

| Check | Result | Log |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | `final-typecheck-src.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 | `final-typecheck-test.log` |
| `vite build` (library) | exit 0 | `final-build-lib.log` |
| `vite build --config demo/vite.demo-dist.config.ts` | exit 0 | `final-build-demo.log` |
| `vitest run`, full suite, after both builds | **241/241 files, 2339 passed, 10 expected-fail, 1 skipped**, exit 0 (load 25-36) | `final-vitest.log` |
| prettier on the new and moved code (`useDockAperture.ts`, `dockContext.ts`, `constants.ts`, `shell.css`, `drive-tokens.test.ts`) | clean | `final-prettier.log` |

Floor v2 has 245 files and 2359 tests (`FLOOR-V2.md`); the prototype deletes four test files. The repo's own files are not prettier-clean at the base; every other touched file's drift was compared with its base and grew only in `GlassDock.vue` (153→168 diff lines) and `g-dock-lattice.test.ts` (186→218), both in the files' existing style.

## 3. H3 witnesses, both engines

### 3.1 Light

The reading is gpc, `records/gpc/full-light.log`, load 26.7 at the start and 43.6 at the end; per-cell loads are in the log. The janky-cell reruns are `gpc/rerun-*.log`. gp was read again: W3 in both engines (`final-W3-light.log`, load 29-37), `ticking` twice (`final-ticking-*.log`), `stretch` twice (`final-stretch-*.log`).

| Witness | Chromium | Playwright WebKit | Note |
|---|---|---|---|
| W1 | 20/20, 2 OB | 19/21, 1 OB | WebKit `card·first-expand`/`warm-expand` FAIL on "lossless rest radii differ by 3.88 px": the card register's radius (27.93 vs 24.05), the Q-12 substance; floor v2 and B′ fail the same way |
| W2 | 7/8 | 7/8 | `route1·long-run-v` keyboard (seats need 592 px vs budget 536; keyboard reaches 10/11). Floor v2 fails it the same way |
| W3 | 25/25, 4 OB | 27/28, 1 OB | WebKit `swap-short` continuity ×1.15 at load 32.9: passes in two reruns (load 20-24), NOT-REPRODUCED. gp: 50/58, 7 OB; WebKit `stretch·lead-add` seat step ×1.32 once at load ~29, passes in two reruns (×0.91, ×0.64): NOT-REPRODUCED |
| W4 | 13/13 | 12/13 | WebKit `compact·non-first-current` seat step ×2.30: passes in two reruns (14/14 each, load 26-28), NOT-REPRODUCED. Floor v2 fails it (×3.77) |
| W5 | 6/6 | 6/6 | |
| W6 | 4/4 | 4/4 | |
| W7 | 18/18 | 18/18 | |
| W8 | 6/6 | 6/6 | 3 consumer cells UNMEASURED (value.js fenced; keyframes and fourier need headed real-GPU runs) |
| R6 | 1/1 | 1/1 | |
| ST | 5/5 | 5/5 | §4 |
| FM | 6/6 | 6/6 | strips read in §5 |
| Safari | UNMEASURED (owner's safaridriver checkbox) | | |

OB cells: W1 `card·first-expand`/`warm-collapse` (Q-12); W3 `first-expand`, `warm-collapse`, `warm-expand`, `reversal`, `anchor-end·*` window 258.2-258.6 ms against 257.0-257.9 (Q-4 lenient window holds in every one).

### 3.2 Dark (`DOCK_HARNESS_THEME=dark`, gpc)

| Witness | First reading | Reruns, twice each |
|---|---|---|
| W3 (load 44.7-59) | 54/58, 2 OB. WebKit `anchor-end·warm-expand` continuity (load 52.8); WebKit `neighbour·warm-expand` overlap 8.45 px (load 59.3) | `neighbour` passes twice (gap 10.5-14.4 px). `anchor-end·warm-expand` WebKit fails once (anchored edge drift 2.11 px, load 29.0) and is OB once. Open gap 2 |
| W1 (load 63) | 14/20, 2 OB. Chromium `vmorph·first-expand` `moves` (2 distinct extents); WebKit `card` ×3 (Q-12 substance) | `^vmorph` 10/10 both reruns (load 21-42): NOT-REPRODUCED |
| ST | Chromium 5/5; WebKit 5 UNMEASURED ("the video's rests 0.01 / 480.92 px against the DOM's 102 / 481.72 px: re-run") | instrument; floor v2 and B′ show the same |
| FM | WebKit 6/6; Chromium "the video shows no trigger marker" ×6 | instrument (the dark marker); floor v2 and B′ show the same |

### 3.3 Adapter law (H-6)

`node harness/adapter-law.mjs pass-3/adapter-G-p3.mjs` gives "L-1..L-5 hold", 49 changed lines against `harness/adapter-head.mjs`; the full diff is in `records/adapter-law.log` and was read here. It is `adapter-floor-v2.mjs` (config for the grouped `scroll` prop, no webkitShim, `posture()` reads `compact`, `budget()` subtracts the root's margins, `compact()` true, `badge()`) plus four DOM reads for the aperture: `plate()` inside the doors, `rim()` under that plate, `edge()` (the caps) and `hit()` (the hit pair).

### 3.4 The harness change: `hit()`

The first gpc reading's W1 `morph`, `vmorph` and `card` dynamic cells all passed with "adapter travel 0 px": the dock never expanded. The probe hides everything but the plate with `visibility: hidden`, which also removes hit-testing, and G's press surface is the hit pair, not the plate, so the witness's hover landed on `<body>` (`elementFromPoint` at the dock's centre: `dock-hit DIV` without the probe, `BODY` with it). On the page the hover expands the dock (481.97 px, 165 px vertical).

`harness/lib.mjs` now keeps the elements an adapter names in the optional `hit()` read hit-testable in every probe mode, painting nothing (`html[data-hp] [data-hp-hit] { visibility: visible; background: transparent; … }`), and `HARNESS.md` lists the read. An adapter without `hit()` is unaffected (the floor, B′ and the H3 fixtures). The W1 self-test passes 12/12 with the change (`records/selftest-W1-hit.log`). With it, W1's dynamic cells measure 4-9 distinct extents over 379.66 px (morph) and 165 px (vmorph) of travel in both engines (`gpc/w1-hit-read.log`). Every W1 reading in this report is after the change.

## 4. H3-4: the stall arms and the replay in paint

- **ST** (`gpc/full-light.log`): 10/10. The first gpc reading (load 60, before the `hit()` change; its log was overwritten by the second and the figures here are from this seat's session) failed Playwright WebKit `2raf` once, a 341.26 px step against 192.21 (×1.78); it passes in the second reading (load 24) and on every later tree: NOT-REPRODUCED. `same-task` and `1raf` leave rest at the block end (Chromium 1240 ms; WebKit 1280 and 1200 ms) and travel 0.01-0.2 px before it; the worst one-frame step is ×0.65-0.98 of the bound. `2raf`, `100ms` and `mid-flight` move before the block. WebKit `1raf` reads ×0.98 here; it failed once on an earlier tree and passed on every later one.
- **Crit `stall`** (`gpc/critG.json`, Chromium, 2 reps, 1200 ms block). Widths from the last rest frame:

  | Timing | rep 1 | rep 2 |
  |---|---|---|
  | `same-task` | 102→100→190→316→385→444 | 102→164→292→372→436→466→478→482 |
  | `1raf` | 102→120→216→352→416 | 102→140→270→376→436→466 |

  The base leaps 102→481 in one frame (`pass-2/D2-G-crit-records/crit-stall-floor.json`, as B′ reports). In Playwright WebKit the arm's sample window held no frame off rest (as for B′ and the base); ST covers WebKit.
- **Cost arm `pblock`** (`gpc/cost-proto.json`): after a 1.2 s block, Chromium steps 24.66 px (0.065 D) across the gap; Playwright WebKit lands within the gap (0.706 D; its next frame is at rest).
- **Plants.** `nostale` fails ST Playwright WebKit `1raf`; `nosizes` fails ST Playwright WebKit `2raf` (`gpc/plant-*.log`).

## 5. The §4.3 obligations

| # | Obligation | Status | Evidence |
|---|---|---|---|
| G-1 | No one-frame leap after a stall at the flip (H3-4) | **MET** | §4 |
| G-2 | Prove or strike the root MutationObserver (H3-6, N-2) | **MET (proved)** | `nosub` (the carrier's subscription taken out) fails W3 `stretch·lead-add` in both engines: "D 0 px … seat step ×8.98 (70.3 px)" Chromium, ×6.34 Playwright WebKit (`gpc/plant-nosub.log`). The source invariant is in `g-dock-lattice`. `characterData` is kept on one failing reading (§6) |
| G-3 | The three stale prose sites | **MET** | `GlassDock.vue`'s layers comment now describes the window sliding along the orientation's axis (the "FLIP-driven aperture morph … the morph orchestrator" text is gone, with two more stale mentions of the orchestrator and `dockMorphing`); `density.css`'s `--dock-size-scale` sentence now reads "translate only, with no scale anywhere"; `dockMorphMeasure.ts` is deleted. §9 |
| G-4 | The lunes, per Q-7 | **MET** | see below |
| G-5 | Read the WebKit filmstrips (H3-8) | **MET** | see below |
| Both-a | The warm collapse carries content with the glass, no clear in the first 40-80 ms | **MET** | see below |
| Both-b | No near-blank swap trough | **MET** | see below |
| Both-c | Rerun the other route's critic arms, `stretch` included | **MET** | §7 |

**G-4, the lunes.** Probe `lune` (`gpc/probe-lune.json`, load 61-64): four corner points 1.5 px inside the plate's box, outside the R 28 arc, at rest (collapsed, expanded) and over four frames of each warm morph.

| Engine | Lune points pressing the dock | Plate centre hits the dock |
|---|---|---|
| Chromium | 0/40 | every frame |
| Playwright WebKit | 0/40 | every frame |

The probe's own `pass` reads false: it takes R from the plate's `border-radius`, and G's plate is square (the doors round it), so its lune count gate counts 0 rows. The 80 points were tested; the table counts them. The `nohit` plant (the hit pair's clip removed) presses the dock at 40/40 in each engine (`gpc/plant-nohit.json`).

Probe `hit` (`gpc/probe-p3.json`): warm collapse, painted seat centres hit their seat 6/6 (Chromium) and 7/7 (Playwright WebKit); clipped-away box centres hit their seat 0/6 and 0/5. Warm expand in Playwright WebKit: 19/25 painted centres hit their seat, 0/19 clipped-away centres do. The 6 misses are one seat per frame, a seat of the leaving face (`got: div.dock-layers`): a leaving face takes no presses (`pointer-events: none`), by design; B′ reads 30/30 here. The Chromium warm-expand cell caught no in-flight frame.

**G-5, the filmstrips.** Read in both engines, light, gpc (`gpc/film/strip-*.png`, 40 ms tiles):
- **First expand and warm expand.** The window grows from the centre; content rides with it and the end edge cuts it straight under the ring ("Squa", "Setting"). In tile 3 of the WebKit warm expand and tile 4 of the Chromium warm collapse there is one seat-wide hole where the leaving seat ("P" or "1") has gone and the entering one has not yet arrived (the entering seat waits for the seat it covers). It lasts one tile; the trough probe reads it as 0.87-0.90 of the lower rest.
- **Warm collapse.** The content is carried and cut by the closing edge ("Settin", "2 3 |", then "H P 2"). Nothing clears early.
- **Swaps.** The seam splices glyphs where the old and new faces meet: "Ɑ" (A over C), "Ɓ", "Toc", "Ɛools" (B over Tools), in both engines. No frame is blank. This is the same look question B′ reports ("Bools").
- **Content add.** The new seat rides in at the end edge ("Brus" → "Brushes and l…") with no pop.
- WebKit's strips show the same sequence as Chromium's, one or two tiles slower to settle.

**Both-a.** Probe `trough`, `kept40`/`kept80` (the share of rest ink kept at 40 and 80 ms), 2 reps (`gpc/probe-p3.json`; base from `D2-Bp-proto-records/b8/probes-base.log`, the same HEAD+floor-v2):

| Engine | | `kept40` | `kept80` |
|---|---|---|---|
| Chromium | G | 0.837, 0.845 | 0.502, 0.503 |
| | base | 0.75, 0.62 | 0.38, 0.32 |
| Playwright WebKit | G | 0.70, 0.84 | 0.481, 0.459 |
| | base | 0.55, 0.75 | 0.31, 0.43 |

The strips show the content cut by the closing edge, not cleared.

**Both-b.** Lowest moving-frame ink against the lower rest, 2 reps:

| Engine | `swap-long` | `swap-short` | `warm-expand` | Base |
|---|---|---|---|---|
| Chromium | 0.915, 0.914 | 1, 1 | 0.882, 0.903 | 0.338 in warm-expand; the base swap is instant |
| Playwright WebKit | 0.969, 0.936 | 1, 1 | 0.870, 0.898 | 0.338 |

Crit `blank` (B′'s arm, `gpc/critB-crit.json`): 0 blank moving frames in all six transitions in both engines.

## 6. Plants (`pass-3/D2-G-p3-plants.py`; built in the worktree, each file restored and checked by sha256, tree hash unchanged after every run: `plants-build.log`)

| Plant | Taken out | Caught by (gpc unless noted) |
|---|---|---|
| `noseam` | the swap's seam | W3 `swap-long`, `swap-short` `blank` (3, 12 and 9 frame runs), both engines |
| `noreach` | the face door's end at the window | W3 `warm-collapse`, `swap-short` `leaving`, both engines |
| `nostale` | stale re-anchor and replay rules | ST Playwright WebKit `1raf` |
| `nosizes` | the RO size skip | ST Playwright WebKit `2raf` |
| `nosub` | the content subscription | W3 `stretch·lead-add`, both engines |
| `nohit` | the hit pair's arc | probe `lune`: 40/40 per engine |
| `novis` | visibility under the paint floor | probe `hit`: clipped-away centres hit 6/6, 5/5, 7/21 |
| `noflow` | the flow | W3 `neighbour·warm-*` ×8.29 and ×8.75 (one-frame jump of 379.66 px) |
| `noset` | the leaving set | probe `retarget` `leaving`, every cell |
| `nochardata` | `characterData` | W3 `ticking` Chromium ×5.83 (9.43 px vs 1.62) at load 15.3 on a build without it (`strike-chardata/full-light.log`); passes in the other three readings (`gpc/plant-nochardata.log`, `plant-nochardata-ticking-{1,2}.log`, load 25-42) |
| `nopainted` | `paintedTau` | **not caught**: W3 `reversal` Playwright WebKit after-retarget trajectory 4.55 and 6.07 px against tol 8.13-8.22, load 24-33 (the prototype, same session: 4.37 and 1.80 px); `gpc/plant-nopainted-reversal-*.log`, `gpc/proto-reversal-*.log`. Open gap 4 |

`characterData` was struck once (N-2: a trigger stays only if a cell fails without it) after the `nochardata` plant passed. The struck tree then failed W3 `ticking` in Chromium (above), so it is back. One failure in four readings is the whole case for it.

## 7. The other route's critic arms, and G's own

B′'s arms on G (`gpc/critB-crit.json`, `gpc/critB-proto.json`, load 55-65):

| Arm | Chromium | Playwright WebKit | Reading |
|---|---|---|---|
| `blank` | 0 blank frames in 6 transitions | 0 in 6 | |
| `lattice` (the open-seat exchange) | 25 intermediate widths each way, max step 7.89 px, window held 0 frames, 0 errors | 19 widths, max 13.36 px, 0 frames, 0 errors | pass-2 G3 stepped 94.67 px in one frame; N-3 holds |
| `infanim` | window held 0/240 frames, 0 errors | 0/196, 0 errors | pass-2 G3 held it 223/241 |
| `popdetail` | Photos and Theme 1→0 before the morph | the same | the arm reads the seat elements, which leave the DOM at the flip; G paints their clones (`ghosts`: 2 clones at opacity 1, then clipped). W3 `compaction` `leaving` reads the pixels and passes. Pass-2 G read the same |
| `film` | 5 strips | 5 strips | `gpc/critB-film/` (scratch); FM's strips are the ones read (§5) |
| `stretch` | glides: 48 px over 32 frames, worst step 3.4 px | glides: 48 px over 20 frames, worst step 14.25 px | |
| `idle` | parks: 241 rAF calls per 2 s after against 240 before | parks: 196 against 192-196 | |

G's own arms (`gpc/critG.json`):

| Arm | Chromium | Playwright WebKit |
|---|---|---|
| `vagree` (painted vs adapter extent in flight) | worst out 0.32 px (`morph·expand`), 0-0.08 elsewhere; 13-18 in-flight samples per cell | worst out 0.27 px at rest (`morph·expand`), ≤ 0.01 in flight |
| `stall` | §4 | no frame off rest in the window (instrument) |
| `seam` (the shadow's centre column at rest, DPR 2) | 0.11/0.14 at the centre against 0.14/0.16 elsewhere | 0.09/0.18 against 0.19/0.19: no seam |
| `ghosts` | 2 clones at opacity 1 while the originals are gone | the same |

## 8. Cost row

Chromium is traced; Playwright WebKit gives dt only. Two readings: `gpc/cost-proto.json` (load 33-54) and `gpc/rerun-cost-proto.json` (load 24-31, expand only). Base and B′ columns are from `D2-Bp-proto.md` §8 (the same HEAD+floor-v2 base).

| Engine, throttle, seats, mode | G: p95 / max / frames > 25 ms / main ms per frame | Base | B′ |
|---|---|---|---|
| Chromium 1×, 0-20, expand and lead | p95 9.2-10.0, 0 frames > 25 | p95 9.4-9.8 | p95 8.7-10.0 |
| Chromium 1×, 40, expand | 25.0 / 41.5 / 3 / 2.42; rerun 16.9 / 23.5 / 0 / 2.05 | | |
| Chromium 4×, 40, expand | 158.7 / 158.7 / 5 / 12.71; rerun 165.1 / 165.1 / 6 / 16.42 | 18.0 / 41.6 / 2 / 4.01 | 16.4 / 34.2 / 1 / 1.38 |
| Chromium 4×, 20, expand | 10.1 / 68.1 / 1 / 1.71; rerun 10.1 / 65.6 / 1 / 1.71 | 16.9 / 25.8 / 1 / 3.35 | 10.1 / 17.1 / 0 / 0.76 |
| Chromium 4×, 40, lead | 10.2 / 50.3 / 1 / 1.96 | 10.1 / 16.4 / 0 / 0.43 | 25.7 / 66.6 / 3 / 2.47 |
| Chromium 4×, 20, lead | 41.5 / 76.5 / 5 / 3.06 | 9.6 / 23.1 / 0 / 0.40 | 18.1 / 39.9 / 1 / 1.84 |
| Playwright WebKit 1×, 0-20 | p95 12-15, 0 frames > 25 (lead 20: p95 36, 4 frames) | p95 12 | p95 12-13 |
| Playwright WebKit 1×, 40, expand | 61 / 75 / 3; rerun 24 / 35 / 2 | | |

- **The flip is the cost.** At 4× with 40 seats, one frame takes 158-165 ms: the flip's script (`FunctionCall` 7.0 ms per frame averaged over the run). The other frames are compositor-driven: every lane is a `translate`, `opacity`, `clip-path` or registered-property WAAPI animation. This is the pass-2 G5 cost ("a flip costs 3.8-14 ms of script"), larger at 40 seats.
- **`pblock`.** §4.
- **Idle.** Parks (§7).
- **Boot graph** (`D2-G-eager.mjs`, the same count as `tests/gates/boot-graph.test.ts`): base 62 modulepreloads + 1 entry, 483,926 B; G 62 + 1, 503,549 B (+19,623 B: the carrier is in the demo's eager `index` chunk because the shell's dock is eager). The gate's ceiling is 503,808 B (259 B to spare). Before `useDockSeatRetire` moved, the seats imported it from the carrier, which made the carrier a separate eager chunk and the graph 503,889 B, 81 B over (`records/eager-*.json`, `eager-*-list.txt`).
- **`DockProps`**: 7 members (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`), as on floor v2. G adds none (Q-3).

## 9. Prose sweep

Every file in the patch was swept for the retired names (`useDockMorph`, `dockMorphMeasure`, `leavingId`, `--dock-size-scale`, `--dock-expanded-px`/`--dock-collapsed-px`, `--dock-morph-t`, `--dock-face-reach`, `data-door`, the morph orchestrator), pass citations, and TODO, legacy or compat language. `grep -rn` over `src`, `tests`, `demo` and `docs/design` returns none of the names except unrelated uses ("orchestrated" scroll cascades, a search-story string). Two untouched files described the deleted carrier and were edited: `constants.ts` ("the dock morph orchestrator" → "the aperture carrier's lanes") and `tests/design/drive-tokens.test.ts` (`--dock-morph-t` "no longer exists").

**Prose updated:** the `useDockAperture` header (boxes, episode, clock, content, flow, window flag), `useDockContent` (`characterData`, three subscribers), `DockCrossfade` and `dockCrossfadeContext` (the leaving set), `GlassDock.vue` (the layers comment, `isTransitioning`, the carrier's layer identity, "SEVEN members"), `layers.css` (the face door), `crossfade.css`, `shell-regions.css`, `morph.css`, `density.css`, `useDockCtaReceive.ts`, `useDockSearch.ts`.

## 10. Open gaps

1. **Cost at 40 seats.** Chromium 4×, 40 seats, expand: 12.7-16.4 ms of main thread per frame and 5-6 frames over 25 ms, in two readings (load 29-40). The flip's script is the cost: per-seat lanes sampled at 120 Hz for every seat. The base pays 4.01 ms and 2 frames; B′ 1.38 ms and 1 frame.
2. **The flow against the glass in Playwright WebKit.** `neighbour·warm-expand`: the plate overlaps the in-flow neighbour by 8.45 px (dark, load 59) and 12.29 px (light, load 33), 2 of 7 readings; 0 px with a 10.5-14.4 px gap in the other 5. `anchor-end·warm-expand`: continuity (load 52.8) and anchored-edge drift 2.11 px (load 29.0), 2 of 7. Chromium: 0 in every reading. The flow margins are a main-thread registered-property lane; the doors are compositor `translate` lanes, and WebKit's compositor runs on its own clock. Not cured.
3. **A retarget in Playwright WebKit.** Probe `retarget` at 80 and 120 ms: the leaving seat fades over 67-71 ms against a bound of 81-95 ms (4 of 6 cells), with a 1-frame overlap of 0.24 px in 2. At 40 ms it passes. The Chromium arm does not run on G: "page.evaluate: Execution context was destroyed", in two runs (`gpc/probe-p3.json`, `gpc/rerun-probe-retarget.json`). Not diagnosed.
4. **`paintedTau` is unproven.** It was added for a Playwright WebKit `reversal` trajectory of 8.6 px against 8.1, read at load 50-70; the `nopainted` plant passes at load 24-33 (4.55 and 6.07 px against 8.13-8.22). By the prove-or-strike rule it is a candidate to strike; it was kept here because the witness that motivated it ran under load (a defect seen only under load is NOT-REPRODUCED, which also means its cure is unproven, not disproven).
5. **A relabel inside a stretched run.** `characterData` carries text changes to the carrier. No cell has a relabel that changes a seat's width while the run is held wider than its content; the RO does not see that case, so only the observer does.
6. **A leaving face is not pressable.** 6/25 painted centres in the WebKit warm expand belong to the leaving face and take no press. B′'s faces stay pressable. It is a deliberate choice; Q-7 does not decide it.
7. **The seam's look.** Spliced glyphs at the seam mid-swap ("Ɛools", "Toc"), both engines; no witness fails on it. The same question as B′'s hard wipe.
8. **The one-tile hole.** In a warm pair, one seat-wide hole for one 40 ms tile while the entering seat waits for the leaving one.
9. **Safari.** UNMEASURED (owner's safaridriver checkbox).
10. **W8 consumers.** UNMEASURED (value.js fenced; keyframes and fourier need headed real-GPU runs).
11. **Q-12 and Q-4 cells.** OWNER-BLOCKED: W1 `card` and the W3 lenient windows.
12. **The harness change.** `hit()` in `harness/lib.mjs` and `HARNESS.md` is a shared-harness edit by a route seat. It is inert for adapters without the read, and the W1 self-test passes; the next harness review owns it.

## 11. Checklist (REGISTRY §4.5)

| Row | Status |
|---|---|
| P1-P5 | P1: OB (Q-12 `card`); P2 (W2) fails `route1·long-run-v` keyboard as on floor v2; P3: OB (Q-4 windows) and open gap 2; P4, P5: hold |
| F1-F7 | hold (W4-W7 green; W4 `compact·non-first-current` NOT-REPRODUCED) |
| N1 | open gap 2 (the flow against the glass, WebKit) |
| N2 | holds: one observer, subscribers proven (`nosub`; `characterData` by one reading) |
| N3 | holds (`lattice`, `infanim`) |
| N4 | holds (W7 `gutter`, `badge`) |
| R1 | holds |
| R2 | holds in W3; open gap 3 for a retarget in WebKit |
| R3 | holds (`reversal` trajectory after the retarget: Chromium 1.58-1.59 px, Playwright WebKit 1.80-4.37 px, tol 7.97-8.75) |
| R4 | holds (§4) |
| R5 | holds (§5 G-4) |
| B1 | holds; Safari UNMEASURED |
| B2 | read (§5 G-5) |
| B3 | 7 `DockProps`; prose sweep done (§9) |
