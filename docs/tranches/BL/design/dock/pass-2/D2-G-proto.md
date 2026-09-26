# D2 · pass 2 · D2-G prototype: the sliding aperture on the real dock

| field | value |
|---|---|
| seat | D2 pass 2, D2-G PROTOTYPE. Builds `D2-G-spec.md` on the real source, on top of `floor.patch`, and measures it under H2 against REGISTRY §7.3 D2-G items 1-5 and §7.3 "Both" |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `04929544`. The worktree was cut at `a348aa88`; the only `src/tests/demo` difference from `04929544` is the 10.1.0 configurator (8 files, none touched here). `D2-G-proto.patch` passes `git apply --check` on `04929544 + floor.patch` and on `a348aa88 + floor.patch`, and the second, applied, reproduces the worktree byte for byte (`diff -rq` empty on `src tests demo`) |
| patch | `D2-G-proto.patch` (sha256 `ba826c6a8ee7313b…`), relative to HEAD + floor: 41 files, +1689 / −1691. New `useDockAperture.ts`; `useDockMorph.ts`, `GlassDock.motion-parity.test.ts` and `GlassDock.stagger.test.ts` deleted |
| adapter (H-6) | `adapter-G.mjs` (sha256 `4081383f…`): `adapter-floor.mjs` with the plate read through the aperture (`:scope > .dock-aperture .dock-plate`), the rim through the aperture, and one new optional read, `edge()` → the `.dock-cap` elements. `adapter-law.mjs adapter-G.mjs --diff`: **PASS**, L-1..L-5 hold, 41 changed lines against `adapter-head.mjs` |
| harness change (in place) | `harness/lib.mjs` probe mode `edge` now marks and paints `P.edge?.()` (`data-hp-edge`); `HARNESS.md` §3 gains the `edge()` row. An adapter without `edge()` reads exactly as before. No selftest pair was added (open gap 9) |
| tools | `D2-G-cost.mjs` (the cost row), `D2-G-proto-probes.mjs` (hit test, retarget script time), `D2-G-proto-filmstrip.mjs` (the filmstrip). All in this directory |
| records | `D2-G-proto-records/`: `run-g6.log` (the H2 run of record, light then dark), `run-g5-light.log` and `run-g1-light.log` (earlier builds, for the defect history), `reruns-g6.log`, `cost-*.{log,json}`, `probes-*.{log,json}`, `filmstrip-g6.log`, `build-g5.json`, `build-g6.json`, `wide-warm-expand-webkit-g5-f39-43.png`. Videos, strips and frames stayed in scratch |
| build of record | `g6` (`build-g6.json`). After it, only two comments in `useDockAperture.ts` changed (the trigger prose); the patch carries them |
| engines | Chromium headless and **Playwright WebKit** headless (Playwright 1.61.1). `adapter-G` has no WebKit shim, so every WebKit cell below is the **unshimmed** result. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell (`safari.mjs`: "session not created… timed out while connecting to a Safari instance") |
| load | the 1-minute load average is beside every cell in the logs: 28-54 for the run of record, 35-120 for the probes (other seats ran browsers throughout). Timing failures were re-run twice (`reruns-g6.log`) |
| fences | no edit, no git write in the checkout; all source edits and builds in the worktree; worktree removed before return. **One breach, reported:** a `git rm --cached` of a deleted test file wrote the *worktree's* index once (never the checkout's, never a commit); it died with the worktree. Nothing of B′'s pass-2 was read |

---

## 0 · In brief

- **Typecheck 0, unit 239/239 files (2323 tests, 10 expected-fail), library build 0.** The four new G-DOCK-MORPH invariants of spec §6 row 7 pass, plus a ladder detector.
- **H2, light, run of record (per engine: Chromium / Playwright WebKit):** W1 20/22 · 17/22, W2 7/8 · 7/8, W3 14/19 · 15/19, W4 13/13 · 13/13, W5 6/6 · 6/6, W6 4/4 · 4/4, W7 6/18 · 6/18, W8 6/6 · 6/6, R6 1/1 · 1/1. The floor, same harness: W1 13/22 · 13/22, W3 3/19 · 2/19, W4 12/13 · 12/13, W6 2/4 · 2/4, W8 3/6 · 2/6, the rest equal. Dark: the same totals except W1 WebKit 18/22 and W3 14/19 · 14/19.
- **Every remaining failure is one of six things:** the card lerp against W1's constant-radius law (shared with the floor), K-11's anchor (the scene's dock is centred by `margin-inline: auto`; shared with the floor), `viewport-resize` (shared), W7 `gutter`/`badge` (shared; assigned to the landing), W2 `long-run-v` keyboard (shared), and three that are G's: the W3 window 0.2-2.3 ms over its allowance on the plain collapse and expand in Chromium, the reversal window, and W1 `vmorph·warm-collapse` `agree` in WebKit (§3).
- **The cost row.** Under a 1.2 s main-thread block, G's extent keeps moving and lands inside the block in Chromium (2/2 reps from two rAFs after the call, 2/2 from 60 ms after), where the floor freezes 1,160 ms. In Playwright WebKit it does the same when the block starts 100 ms into the episode (3/3), where the floor freezes for 30 frames; a block that starts in the first two frames freezes both (the animations are not yet on the compositor).
- **The price:** 12 extra boxes, one 841-line carrier in place of a 112-line one, and 3.8-14 ms of script at each flip (the floor: 0-4.2 ms). The corner outside the arc catches presses (Q5).

---

## 1 · What was built

The spec's mechanism, on the real `GlassDock` (the files are in the patch):

- **Boxes** (`GlassDock.vue`, `dock.css`): two `.dock-shade` casters (the drop shadow, clipped at the window centre), `.dock-aperture > .dock-door[min] > .dock-door-counter > .dock-door[max] > .dock-door-counter > .dock-plate`, and a `.dock-cap` in each door carrying the ring's arcs. The plate is square; the doors round it with `--dock-corner`. The root takes no pointer events, paints nothing and stays at its natural layout (no reserve, no scale).
- **Carrier** (`useDockAperture.ts`, replacing `useDockMorph.ts`): per episode, lanes a, b (the window edges), σ per seat whose place changed, e (`--dock-expand-t`) and p (fade progress), each a closed-form `dockLane` (in `useDockSpring.ts`, the band's one `SpringProgress` owner) pinned at its first crossing, sampled at 120 Hz into `linear` WAAPI keyframes, all started on one `startTime`. `data-morphing` clears at the analytic 0.5 px landing (bisected to 0.01 ms). At the end every animation is cancelled and the aperture's inline hull removed.
- **Triggers:** the floor's ResizeObserver (`onLayout`), a `flush: post` posture watcher, `swap()` from `DockCrossfade`, `retire()` from each seat's `onBeforeUnmount` and from compaction, and one `MutationObserver` (§4 item 5).
- **Fades:** the leaving face over p ∈ [0, 0.3·level], the entering face's seats edge-in from 0.3 on the shell's `--dock-stagger-*` tokens, entering seats after a clear-overlap onset, ghosts (clones of leaving seats) gone before a moving seat reaches them. A fade the retarget does not change keeps its clock.
- **Edge:** the plate's straights carry the band and the rims as box-shadows; the caps' pseudos carry the arcs, each clipped to the band the straights paint. `--glass-rim-bottom` is split into `--glass-rim-under` and `--glass-rim-side` (and still composes both).
- **PRM:** spatial lanes seat at their target; fades keep their curve.

**Deviations from the spec, each on purpose:**
1. No flip-frame reserve (spec §3.3). The root is never sized; the aperture's inline insets cover the hull of the episode's path instead. It removes the reserve's layout write and the `[data-reserve]` pass-through rule (struck, E-1).
2. `useDockSpring.playTo` stays for the run's reach glide: it writes `scrollLeft`, which no compositor carries. The header says so.
3. `edge()` is optional and not in L-5, so no other adapter changes.
4. Outside a `GlassDock`, a `DockCrossfade` swap is a cut: nothing carries it.
5. The squircle `corner-shape` applies to the shadow casters only, as the floor's did (it sat on the root, which painted only the shadow). On the doors it put the window 2.15 px off the arc W1 reads (g1: `card·collapsed-rest` FAIL; g5 onward PASS).

---

## 2 · Defects found on the real dock, and their cures

Each is visible in `run-g1-light.log` → `run-g5-light.log` → `run-g6.log`.

| # | defect (first reading) | cause | cure |
|---|---|---|---|
| 1 | W4 `compact·non-first-current`: the current seat jumps 70 px, 3 overlap frames (g1, Chromium) | a translated seat is scrollable overflow; the run's `scroll-snap-type: x mandatory` re-snapped the port to it mid-episode (scrollLeft 70 → glide back) | `run.css`: `.glass-dock[data-morphing] .dock-run[data-overflowing] { scroll-snap-type: none }`. W4 13/13 both engines |
| 2 | second flip in one frame read a seat 70 px off | a rect read through animations the engine had or had not applied yet | `run()` lifts a live episode's animations before the layout read, then re-releases every lane from its own (x, v) (the same curves) |
| 3 | W3 swaps: both faces painting at once in WebKit (4-5 frames) | a retarget restarted the entering face's fade from onset 0 | a fade whose target is unchanged keeps its clock across retargets, including fades the new episode does not re-derive |
| 4 | W3 `lead-add` (WebKit) and `ticking` (Chromium): a 70 px / 9.6 px step in the rAF log | the frame's rAF read the new layout before that frame's ResizeObserver delivery | a `MutationObserver` on the root (childList, subtree, characterData) flips in the microtask after the mutation. Both cells PASS |
| 5 | W3 `seat-transition`: 36 two-owner frames, trajectory 25.8 px off (K-13) | the seat's CSS width transition re-triggered the flip every frame | `run()` finishes any layout-property `CSSTransition` inside the dock first; the episode carries the change. PASS, owners 0 |
| 6 | W3 `reversal`: 3 overlap frames | at a reversal both faces ramped through each other | a leaving face's window scales with what it still paints; a returning face waits for it |
| 7 | W3 windows 1-10 ms over | the landing sat on the 8.3 ms keyframe grid | the landing is bisected between grid samples |

---

## 3 · H2, per witness (run of record `g6`, `run-g6.log`)

Floor numbers are `FLOOR-records/run-floor-light.log`. Every WebKit cell is Playwright WebKit, unshimmed. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)**.

| witness | Chromium light / dark | Playwright WebKit light / dark | floor (C / WK) | what still fails, and whose |
|---|---|---|---|---|
| W1 corner | 20/22 · 20/22 | 17/22 · 18/22 | 13/22 · 13/22 | `card·first-expand`, `card·warm-*`: the card lerp (`--dock-corner` from cross/2 to `--radius-dock-card` on `--dock-expand-t`) against W1's `card` law (one radius in every frame). Rest radii 27.93 vs 24.05 px; the floor fails the same law (4.63 px). Shared. WebKit `vmorph·warm-collapse` `agree` 1.11 px (FAIL in all four runs, `reruns-g6.log`); `vmorph·warm-expand`/`first-expand` fail once each at load 45-48 and pass on re-run. **G's, cause unestablished** (open gap 3) |
| W2 run | 7/8 · 7/8 | 7/8 · 7/8 | 7/8 · 7/8 | `route1·long-run-v` keyboard (Seat 1 unreachable by Tab + arrows). Shared |
| W3 morph | 14/19 · 14/19 | 15/19 · 14/19 | 3/19 · 2/19 | see below |
| W4 state | 13/13 · 13/13 | 13/13 · 13/13 | 12/13 · 12/13 | none (compaction with a non-first current seat now passes) |
| W5 rim | 6/6 · 6/6 | 6/6 · 6/6 | 6/6 · 6/6 | none |
| W6 collapsed form | 4/4 · 4/4 | 4/4 · 4/4 | 2/4 · 2/4 | none |
| W7 edge | 6/18 · 6/18 | 6/18 · 6/18 | 6/18 · 6/18 | only `gutter` (12 cells) and `gutter, badge` (12 cells): the side/canvas placements. Every `edge`, `weakest bin` and `corner` sub-check passes (e.g. top·light·dpr2: median 11/255, weakest 3/255, corner 0.084 px, Chromium). Floor §5 assigns gutter/badge to the landing (spec §6). Shared |
| W8 motion | 6/6 · 6/6 | 6/6 · 6/6 | 3/6 · 2/6 | none. `unsharp 0` everywhere; pacing p95 9.6-10.1 ms (Chromium), 12-21 ms (WebKit), 0 frames > 40 ms. 60 fps: UNMEASURED (headless). Consumers value.js, keyframes, fourier: UNMEASURED |
| R6 | 1/1 · 1/1 | 1/1 · 1/1 | 1/1 · 1/1 | none (static ring: 0 pixels changed) |

**W3 in detail.** PASS in both engines: `first-expand` (trajectory 1.13 px of 16.19, dead landing, window 251.1 ms Chromium), `warm-collapse` in WebKit, `content-add/remove`, `lead-add/remove`, `swap-long/short`, `hidden-shown` (appears at its rest, 0 px), `ticking` (worst step 0.82 px vs 1.91), `seat-transition` (owners 0, trajectory 0.24 px), `wide·*` (light; dark WebKit `wide·collapsed-rest` faces FAIL once, and g5 WebKit `wide·warm-expand` showed the leaving "Now playing" face painted below the plate for one frame: `wide-warm-expand-webkit-g5-f39-43.png`; open gap 4). FAIL:
- `warm-collapse`/`warm-expand` (Chromium) `window`: 257.6-259.8 ms against an allowance of 257.3-258.0 ms, 0.2-2.3 ms over, in 5 of 7 readings (run of record, dark, both re-runs); PASS in the others (249.8-251 ms). The 0.5 px landing of a 380 px move on this rung is 250-266 ms after release (spec §7.3 item 4 predicted margins of 0.8-4.9 ms), so the window sits on the allowance. It is not load: the re-runs repeat it. **G's, by the arithmetic of the law it closes on.**
- `reversal` `window`: 283.6 / 286 ms after the retarget against 257.6 / 269.6 ms. The handoff itself passes (next paragraph); a lane released at −3.13 px/ms toward the other end takes longer than a rest-to-rest clock, and the allowance is a rest-to-rest clock. The floor fails it at 549.9 / 552 ms.
- `anchor-end·*` `anchor`: the anchored edge drifts 189.83 px (D/2). The scene's dock is centred at rest in both postures (collapsed 649-751, expanded 459.2-940.8 in a `flex-end` parent) because `.glass-dock` carries `margin-inline: auto`, which absorbs the free space. The floor reads the identical 189.83 px. Shared; the cure is layout, not carrier.
- `viewport-resize`: 6.09 px, 0 window frames. The floor reads 6.09 px. Shared.

---

## 4 · §7.3 status

**D2-G item 1, REGISTRY §6 questions (in order):**
1. **The lens.** Answered by `D2-G-block.md` (live in both engines). On the real dock: R6 static ring 0 pixels, W8 `unsharp 0` in every motion frame of both engines, W6 "backdrop plates 1 [div.dock-plate]". Holds.
2. **The compositor claim.** Holds in Chromium: travel 208-298 px inside the block, the target reached inside it, longest stall 0 ms (4/4 reps; the floor: 0 px, stall 1,160 ms, 4/4). Holds in Playwright WebKit once the animations are committed: with the block at 100 ms the extent runs 87 → 459 video px in 5-6 frames and holds there (3/3), where the floor sits at 342-363 for 30 frames (3/3). With the block in the first two frames WebKit freezes G too (87 → 102-158, one of four reps ran through). `cost-*.log`, `cost-*.json`; WebKit widths are in video pixels (the rest reads 87 for 102). **No BLOCK.**
3. **The velocity handoff.** Holds: H-3c's reversal row fits the rung after the retarget within 0.63-0.8 px (Chromium, tolerance 7.96-7.98) and 5.9-6.13 px (WebKit, tolerance 8.01-8.35), released at 336-342 px with −3.11 to −3.13 px/ms, dead landing, 0 overlap frames. Only the window fails (§3). **No RETIRE.**
4. **Edge and elevation.** Holds: W7's edge sub-checks pass in every placement, theme and DPR of both engines, with the caps painted through `edge()`; W1 corner reads 0.01-0.112 px at every rest cell of the run of record (card rests included); no nested translucent `color-mix()`. The door-overlap seam: at rest the plate centre steps ≤ 1/255 in a lossless screenshot, with or without the shadow (`seam` read, Chromium, swap scene), but the VP8 filmstrip shows it as a faint vertical line at the centre (open gap 5).
5. **Hit testing.** Answered as the spec predicted: the doors clip hits to the window's rectangle, not its arc. A point 2 px inside the rect's corner, outside the arc, hits `div.dock-plate` in both engines, both postures (3/3 reps). The floor's `clip-path` lets the same point fall through to the page. The outside point falls through in both. Q-7 (a) is **not** answered by the clip alone; G owes a hit shape at the corners, or a ruling that the sliver between the arc and the rect may take presses.

**D2-G item 2 · W1 with H-1, both engines.** Every morph and vmorph sample green in Chromium; WebKit green except `vmorph·warm-collapse` `agree` (1.11 px, reproduced). The card cells fail W1's `card` law, as the floor's do. Not green; the residue is one cell of G's own.

**D2-G item 3 · B′'s items 1 and 7.** Per-seat FLIP: `lead-add/remove`, `content-add/remove`, `swap-*`: seat step ≤ ×0.84, overlap 0 in both engines. Compaction: W4 13/13 both engines; the current seat travels with its own lane, the others leave as ghosts fading before a seat reaches them; `compact·seat-scale` passes (no compounding). **Green.**

**D2-G item 4 · W3 R-1..R-5 on the floor's endpoint model, content and swaps.** R-1 `first-expand` PASS; R-2 content changes and swaps each open a window and follow the rung (0.3 % of D in Chromium); R-3 dead landings everywhere, pinned at the first crossing; R-4 the window, see §3 (0.2-2.3 ms over on plain collapse/expand in Chromium, over on the reversal); R-5 owners 0 in every cell, including `seat-transition`. **Green except R-4.**

**D2-G item 5 · the cost row.** See §5. **Wins in Chromium outright; wins in WebKit after the first two frames.**

**Both:**
- Every cell in both engines under H2 with a reviewed adapter: §3 (adapter law PASS).
- Filmstrip: §6.
- `DockProps`: **7** (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`), against Q-3's six. G adds none; the seventh is the floor's grouped `scroll` prop (Q-3 b).
- Prose sweep: §7.
- Real Safari: UNMEASURED (owner's safaridriver checkbox).

**Floor rows under G:** row 1 corner on `--dock-corner` (doors, casters, caps); row 2 rim a plate child (W5 6/6); row 3 hover gate and coarse press unchanged (W4 `coarse·*` PASS); row 4 P4 machine unchanged (W4 13/13); row 5 endpoints unchanged and still published, but **no CSS reads `--dock-expanded-px`/`--dock-collapsed-px` any more** (open gap 7); row 6 crash-free edge kept; row 7 G-DOCK-MORPH gains the §6 row 7 invariants (§8).

**Second trigger (PF-5).** The `MutationObserver` is the one addition to the floor's single trigger. Its witnesses: without it, W3 `lead-add` (Playwright WebKit, g1: step ×6.88, 70.31 px) and `ticking` (Chromium, g1: 9.6 px vs 1.59) fail; with it both pass. Those rAF reads may be of a frame the engine never paints (the ResizeObserver flips before paint); the observer makes the flip precede the read either way. A reviewer may rule the witnesses instrument artefacts and strike it.

---

## 5 · The cost row

Method: the block test's (`D2-G-block.md` §3) on the built dock. The morph scene at rest, probe paint `plate`; `__scene.expand()`; a 1,200 ms busy loop on the main thread; the screencast decoded by ffmpeg; the magenta run on the dock's centre row per frame. Control: the floor build (`floor3`, `adapter-floor.mjs`), same tool, same session.

| engine | block starts | G: extent through the block | floor: extent through the block | load |
|---|---|---|---|---|
| Chromium | 2 rAFs after (14-22 ms) | 190/184 → 481/480 px, lands in the block, stall 0 ms (2/2) | 120 → 120 px, stall 1,160 ms (2/2) | 42-47 |
| Chromium | 60 ms after | 272/264 → 480 px, lands, stall 0 ms (2/2) | 292/271 frozen, 1,160 ms (2/2) | 37-39 |
| Playwright WebKit | 2 rAFs after (22-40 ms) | frozen at the rest until the block ends (2/2) | frozen (2/2) | 43-45 |
| Playwright WebKit | 60 ms after | 1 of 2 reps runs to 459 (video px); 1 freezes at 158 | frozen at 249/269 (2/2) | 37-42 |
| Playwright WebKit | 100 ms after | runs to 459 in 5-6 frames and holds (3/3) | frozen at 342-363 for 30 frames (3/3) | 41-43 |

The script time of one flip, from the posture call to the next macrotask (Vue's flush, the layout reads, every `animate()` call), `probes-*.log`, 3 reps: G Chromium 6.9-8.4 ms first expand, 3.8-13.2 ms warm and reversal; G WebKit 9-14 ms first, 4-10 ms warm. Floor Chromium 0.7-4.2 ms first, 0.4-0.6 ms warm; floor WebKit 1-2 ms, 0-2 ms. Between flips G runs no script; the floor runs its spring every frame. The longest rAF gap around a G flip: 9.9-17.5 ms (Chromium), 16-104 ms (WebKit, load 41-44), where the floor's WebKit reads 20-69 ms.

So G buys a morph that survives a stalled main thread at the cost of one heavier frame per flip (up to 13 ms of script in Chromium) and 12 extra boxes.

---

## 6 · Filmstrip (`filmstrip-g6.log`; strips in scratch)

Chromium, 40 ms per frame, real page colours:
- **First expand** (320 ms of motion): the pill opens both ways from its centre; "H" holds; 1, 2, 3 fade in edge-in behind the leaving "P", Play/Settings next, "Square" last, cut by the moving edge until it arrives. No double exposure, no pop. The window closes on a dead landing.
- **Warm collapse** (360 ms): the full face fades out by the third frame, leaving an empty plate for two frames; "P" enters and the plate closes around "H P". The empty-plate frame reads as a beat of nothing between faces; D-2 (engagement) is weakest here.
- **Swap grow** (360 ms): A B out, one empty frame, then C Tools Brushes Layers D fill in as the window grows; the right edge cuts "La…" and "D" until they arrive.
- **Content add** (320 ms): "Brushes and layers" slides in behind the right edge, fading from the first frame, as the window grows to hold it.
- D-1: weight and damping are there (the rung's 0.3 % overshoot is pinned, so every landing is dead: no bounce). The owner's liquid-weight edict asks for bounce; the spec's landing law (Q-5) chose the dead landing.
- A faint vertical line at the plate centre shows in the VP8 frames at rest (open gap 5).

Playwright WebKit: **not read.** The tool's motion detector picked the landed tail in every WebKit sequence (the screencast's frame timing and a grey band at the crop edge defeat it). The WebKit motion is witnessed by H2's screencast cells (W1, W3) instead. Open gap 6.

---

## 7 · Prose sweep

Every file the patch touches was read for prose that describes the struck design (`--dock-morph-t`, `--dock-t`, the plate clip-path lens, the reserve, the scale morph, `useDockMorph`, the CSS stagger ladder, the crossfade's `[data-crossfading]`). Rewritten: `useDockSpring.ts` (header, interface, handle), `useDockAperture.ts` (new), `dockMorphMeasure.ts`, `dockContext.ts`, `dockCrossfadeContext.ts`, `composables/index.ts`, `useDockSearch.ts`, `GlassDock.vue` (persistent region, search slot, template), `DockCrossfade.vue`, `DockLayerGroup.vue`, `dock/index.ts`, `shell.css` (contain, the clip-aperture block, the vertical scroll port, the stagger tokens, corner-shape), `shell-regions.css`, `morph.css` (held edge), `layers.css`, `crossfade.css`, `dock.css` (the `[data-reserve]` pass-through struck), `shape.css`, `run.css`, `search.css`, `adaptive-legibility.css`, `styles/index.css`, `utilities/base.css`, `tokens/property-regs-specular.css`, `motion/index.ts`, `useDockCtaReceive.ts`, `useLiquidFlex.ts`, `demo/stories/dock/dock-search.vue`, `demo/stories/dock/overview.vue`, `docs/design/tunable-anim.md` (Kind-5 row now `--dock-expand-t`). After the sweep, `grep -rnE "dock-morph-t|--dock-t\b|useDockMorph\b|clip-path lens" src demo` returns nothing.

---

## 8 · Tests

- `npx vue-tsc --noEmit`: exit 0.
- `npx vite build`: exit 0; `npm run demo:dist:build`: exit 0 (both inside the worktree).
- `npx vitest run`: 239/239 files, 2323 passed, 10 expected-fail, 1 skipped.
- New, in `g-dock-lattice.test.ts`, "G-DOCK-MORPH — the aperture moves by compositor lanes only": no rAF writer and every lane a WAAPI animation; the animated properties are exactly `translate`, `opacity`, `--dock-expand-t`; the root and control run take no `scale`/`transform`, the root takes no pointer events; no `clip-path` on the root, aperture, doors or counters; the reveal ladder is edge-in over controls, capped at 3 rungs.
- Re-authored: the corner law reads `--dock-corner` (lattice, `radius-role-canon.test.ts`).
- Retired (they assert the struck carrier, and happy-dom has no layout for G to run on): `GlassDock.motion-parity.test.ts` (the spring-driven `isTransitioning`; W3 window/reversal witness it in both engines), `GlassDock.stagger.test.ts` (the CSS onset ladder; now the source detector above), two `DockLayerSwitcher.a11y` cases reading `--dock-t` (W3 swap cells witness them).

---

## 9 · Consumer impact

`--dock-morph-t`, `--dock-t` and `useDockMorph` are gone (E-1). The root no longer paints or takes pointer events: a consumer that styled `.glass-dock`'s box-shadow or border, or relied on the padding catching clicks, must re-point to the plate. A consumer seat with its own width transition (value.js X-11, K-13) now lands at once and rides the dock's spring. A consumer `[data-reserve]` wrapper does nothing now. The squircle stays on the shadow only. No sibling repo was built or run (value.js has a live session).

---

## 10 · Open gaps

1. W3 R-4 window: 0.2-2.3 ms over on the plain collapse/expand in Chromium in 5 of 7 readings, and over on the reversal in both engines. Either the allowance counts the 0.5 px landing on this rung, or the rung or the landing band changes.
2. The card lerp against W1's `card` law (shared with the floor): a ruling on whether a card's radius may change with its posture.
3. W1 `vmorph·warm-collapse` `agree` 1.11 px in Playwright WebKit, reproduced 4 times (video scale 0.978 against g1's 0.9995); cause not established.
4. WebKit `wide`: the leaving wide `#collapsed` face painted below the plate for one frame (g5); intermittent (dark `wide·collapsed-rest` faces FAIL once).
5. The door-overlap seam: ≤ 1/255 lossless, visible in the VP8 filmstrip.
6. The WebKit filmstrip was not read (tool defect).
7. `--dock-expanded-px`/`--dock-collapsed-px` are published with no reader under G: strike, or keep for consumers.
8. Q5: the corner outside the arc catches presses.
9. The harness `edge()` change has no selftest pair (a fixture with split caps, and a plant that omits them).
10. K-11 anchor and `viewport-resize` (shared with the floor): layout, not carrier.
11. The cost row in WebKit for a block inside the first two frames: G freezes like the floor.
12. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox).
