# D2 · pass 1 · D2-E · the anchored projection (prototype)

| field | value |
|---|---|
| seat | D2 pass 1, PROTOTYPE for family D2-E. It test-implements `SPECS.md` §D2-E on the real dock source. It read SPECS §0, §D2-E, the witness table and the shared facts; `D2-E.md`; `harness/HARNESS.md`. It read no other family's spec or prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the brief named `5804d8cc`; the worktree was cut at checkout HEAD `1b15191e`. `git diff --quiet 5804d8cc HEAD -- src demo` and `git diff --quiet v10.0.1 HEAD -- src` both hold, so the "before" is the v10.0.1 dock |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless (the Playwright 1.61.1 build, **not Safari**). Every WebKit number is **Playwright WebKit**. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| verdict | **RUNS.** Typecheck green (source project); dock unit tests 106 pass, 1 red (the six-member prop budget, broken by the prototype's rim prop); library build green; harness W1 **32/32**, W2 **10/10**, W3 **6/14**, W4 **6/16**, W5 **8/10**, identical in both engines cell for cell |
| patch | `pass-1/D2-E-proto.patch`: 32 files, `git diff HEAD` plus the two new files. It applies to a clean HEAD (`git apply --check` in a second clean worktree). Tracked stat: 30 files, +393 / −2,622; new files: `useDockProjection.ts` 115 lines, `controls/seat.css` 190 lines |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-E-proto/`. Harness runs in `out/run-{head,e1,e2,e3,e4}.txt` (JSON under `out/<label>/runs/`); the adapter is `adapter-e-proto.mjs`; probes are `probes.mjs` (outputs `probe-*.json`); gestalt shots are in `shots/chromium/` |

## 0 · Results in one table

"Before" is this seat's own HEAD run (`out/run-head.txt`), which reproduces the harness record exactly. "After" is build `e4`, the build the patch describes (`out/run-e4.txt`).

| witness | HEAD | D2-E prototype `e4` | Chromium | Playwright WebKit (+shim) | what stays RED, and why |
|---|---|---|---|---|---|
| W1 corner | 9/32 | **32/32** | 16/16 GREEN, worst 0.137 px | 16/16 GREEN, worst 0.042 px | none |
| W2 run | 0/10 | **10/10** | 5/5 GREEN | 5/5 GREEN | none |
| W3 morph | 0/14 | **6/14** | 3/7 (the shrinking three GREEN) | 3/7 (same) | the 4 growing transitions per engine fail on **faces only**, which is SPECS C-1 |
| W4 state | 4/16 | **6/16** | 3/8 | 3/8 | compact ×4 (absent: the shared composable); tap-pins ×1 (the Play click fires: `useDockState`) |
| W5 rim | 0/10 | **8/10** | 4/5 | 4/5 | compact ×1 (absent: no compact rung) |

The spec's table read W5 0/10 (not probed). The prototype adds the rim as a plate child (§1 P5) and turns every rim rung green. W1-W4 match the spec's research numbers.

## 1 · What was built (the landing form, not a probe)

Nothing is overridden with `!important`. The research probe's overrides became deletions in the files that owned the old rules.

**P2 · seats and projections** (`styles/controls/seat.css`, new):
- **One seat recipe for docked and hostless seats.** A seat is `.dock-icon-button`, `.dock-tab-button`, `.dock-trigger` or `[data-dock-seat]`. Every seat is `isolation: isolate; anchor-name: --dock-seat; anchor-scope: --dock-seat`. Inside a dock it is `position: static`; outside one it keeps `position: relative`, from `glass/material.css`.
- **The seat's `::after` is the projection.** It carries all four `anchor()` insets and `z-index: -1`, and holds the whole state register:
  - hover fill and `--scale-hover-dock`, under `@media (hover: hover)` only;
  - selected: `--dock-active-bg` with the rim pair and `--glass-shadow-capsule`, reading the `--dock-active-*` cohort;
  - press: `--dock-control-press-bg`, plus a scale that reads `--dock-press-t`;
  - the focus ring, as its outline.
- **The paint lives on `background`, not `background-color`,** so fourier's image knob (X-6) is carried.
- **The specular `::before` is re-anchored to the seat.** The vertical dock's accent bar is re-expressed as an anchored `::before` (`right: calc(anchor(left) + gap)`, `margin-block: calc(anchor-size(height) * 0.18)`).
- **Glyph boxes.** `icon-button.css`, `tab-button.css` and `triggers.css` keep only box, glyph and ink. Their state paint, `background-clip: content-box` insets, `scale`, `filter` and `box-shadow` are deleted. `index.css` loses the seat outline ring.
- **Triggers are converted (C-8).** The coarse hit-slop `::after` in `touch-floor.css` is deleted. On `(pointer: coarse)` the trigger's own box is 44 px.
- **`DockControl.vue`.** It composes no `.glass-capsule` / `.glass-capsule-hover` class. It binds only `--dock-press-t` from `useLiquidPress` (`squish: false`), so the seat never takes an inline transform.

**P2 · the run** (`run.css`, `layers.css`, `composables/useDockProjection.ts`):
- **The run's overflow.** `.dock-run` is `overflow: clip`. It becomes `auto` on its main axis only when it is `.is-active[data-overflowing]`. One ResizeObserver over the run and its seats writes the bit (`scrollWidth − clientWidth > 0.5`), and a MutationObserver re-observes seats as they come and go.
- **The ring reserve is deleted,** that is, the content-box padding plus negative-margin pair on both orientations.
- **New, and not in the spec: `.dock-layers` is `position: relative`, and `.dock-layer.is-active` is static** (§3 B-1). This makes `.dock-layers` the seat projections' containing block. That box sits above the run's scroll port.
- **The main-axis clip moved.** It sits on `.dock-layers` and applies only while the run overflows: `.dock-layers:has(> .dock-run.is-active[data-overflowing]) { overflow-x: clip }`, or `overflow-y` on a vertical dock (§3 B-2).

**P2 · the glide:**
- `.dock-glide` is one element inside `.dock-layers`. It is anchored to `--dock-selected`, and its insets transition on the dock spring.
- The selected seat of a single-select group names itself `--dock-seat, --dock-selected`. Such a seat is `aria-current`, `aria-checked="true"` or `aria-selected="true"`, and is not inside `[inert]`.
- The glide is `display: none` when no such seat exists.
- Outside a dock, a single-select seat paints its own capsule.

**P1 and P3 · the plate** (`dock.css`, `shell.css`, `morph.css`, `shape.css`, `GlassDock.vue`):
- **The dock box.** `.glass-dock` is `position: static; isolation: isolate; anchor-name: --dock-box; anchor-scope: --dock-box, --dock-selected`. `contain: layout style` is deleted, and so is the vertical dock's `transform`/`scale` transition and its `will-change: transform`.
- **The plate is the dock box's anchored projection.** It is `position: absolute; position-anchor: --dock-box; position-visibility: always` with four `anchor()` insets, each transitioned on `var(--spring-dock-duration) var(--spring-dock)`, and `transition: none` under PRM.
- **The shadow moved to the plate.** The dock's rim and drop shadow, collapsed and hover included, now paint on the plate, because the plate is the silhouette.
- **The pill plate's corner** is `border-radius: var(--radius-pill)`.
- **Struck:** the `clip-path` extent, `--dock-t`, and the collapse-inset knobs.
- **Deleted, not bypassed:**
  - `useDockMorph.ts` and `dockMorphMeasure.ts`;
  - `@property --dock-morph-t` and `--dock-t`;
  - every `[data-morphing]` block in `layers.css`, `shape.css` and `morph.css`, including the reserved footprint, the box `scale`, the counter-scale, the child stagger and the leaving-face opacity;
  - the cut-cap scroll timeline with its four keyframes (§3 B-5);
  - the stagger tokens.
- **The window.** `useDockProjection` counts `transitionrun`, `transitionend` and `transitioncancel` per inset on the plate. It writes `[data-morphing]` (the name is kept, because click-integrity reads it) and `isTransitioning`.
- **`DockCrossfade`.** The controlled face swap becomes a CSS opacity transition on the dock clock, closed by the leaving face's own `transitionend`. That removes `useDockSpring` from the crossfade. `useDockSpring` survives with one caller, `useDockRun`'s keyboard reach glide (§3 B-6).

**P5 · the rim:**
- A provisional `progress?: number` prop renders `ScrollProgressRim.dock-rim` as a child of the plate.
- The plate's `overflow: clip` and radius clip it on both axes.
- The harness binds it through `config.rimProps = { progress: 0.6 }`; `rim()` reads `.dock-plate > .dock-rim`.

**P4.** Nothing beyond the structural `(hover: hover)` gate, as specified.

**Consumer migration inside this repo (marked, clean break).** Seven demo GlassDock roots carried `class="relative z-10"`. They are in `overview.vue` (two sites, three docks), `sections.vue` (three), `vertical.vue` (one) and `cta-receive.vue` (one). They now carry `class="z-10"` (§3 B-4).

**Tests.** The deletions made several tests obsolete, and they were changed as follows:
- Deleted with their modules: `dockMorphMeasure.test.ts` and `GlassDock.stagger.test.ts`.
- `GlassDock.motion-parity.test.ts` is rewritten to the plate-transition window contract: 4 tests.
- The two `DockLayerSwitcher` crossfade tests are rewritten to the transition window, and the `DockControl` capsule-class assertion is inverted.
- `g-dock-lattice.test.ts`:
  - the two endpoint-measure tests and the two cap-timeline tests are dropped, along with the ring-reserve test;
  - the ring and yield gates are re-pointed at `seat.css`;
  - the radius gate now asserts that no radius is animated anywhere in the band.

## 2 · Every check, with its number

| check | reading |
|---|---|
| `npm run typecheck` | source project (`vue-tsc --noEmit`) exit 0. The test project reports 2 errors in `FourierField.smoke.test.ts` (`@mkbabb/glass-ui/fourier-math` needs a built `dist`); the identical 2 appear at the clean baseline |
| dock unit tests (`vitest run tests/components/custom/dock`) | baseline 127 passed + 1 expected-fail over 15 files. Prototype 106 passed + 1 expected-fail, **1 failed**: `G-DOCK-BUDGET · DockProps is at most six members` (7: the `progress` prop). 13 files, after the 2 deletions |
| whole suite, against a clean baseline worktree | baseline 9 failed / 2,267 passed. Prototype: 1 new real red (the six-member budget), and 7 rows, spread over 5 other files, that pass in isolation, so they are load-dependent in the full run under concurrent seats. Before the fixes below it had 3 more reds, each a gate hit by prototype code: `token-hygiene` (a `9999px` literal became `var(--radius-pill)`), `dock-name-canon` (the word "rail" in a comment), `stacked-url-filter` (the press `filter` was dropped from the projection) and `overfit-structure` (`DOCK_SEAT_SELECTOR` made module-private) |
| library build | green, built from a scratch script with `cacheDir` in scratch. CSS 462,372 → 457,953 bytes (−4,419); `dock.js` 64,845 → 63,246 bytes; all JS 1,094,726 → 1,092,286 bytes |
| harness | `node harness/run.mjs --build out/builds/e4 --adapter adapter-e-proto.mjs`: W1 32/32, W2 10/10, W3 6/14, W4 6/16, W5 8/10. Builds e2 and e3 read identically |

**W3 detail** (e4, Chromium / Playwright WebKit). All 14 cells pass continuity (step ×0.65-0.66 of the bound), land dead with 0 reversals, and show 0 two-owner frames. The window is 208.2-208.7 ms (Chromium) and 209-217 ms (WebKit) against the 210 ms clock, and the allowance is 252.5-266 ms. O-64 R-1..R-5 are cleared in every cell. Faces out of the plate on the growing cells:

| cell | Chromium | Playwright WebKit |
|---|---|---|
| first-expand | 181.83 px | 181.86 px |
| warm-expand | 181.83 px | 181.86 px |
| content-add | 77.67 px | 77.7 px |
| swap-long | 110.48 px | 110.09 px |

These are the spec's C-1 numbers exactly. The shrinking three pass at 0 px in both engines.

**W5 detail** (e4): rim ink 1,043-3,989 device px per rung, 0 outside the plate silhouette, on h-expanded, h-collapsed, v-expanded and v-collapsed in both engines.

## 3 · Probes on the gaps the spec left open (`probes.mjs`)

| gap (SPECS E.5) | reading | engines |
|---|---|---|
| pseudo read after a coarse tap | 430×848 touch, tap on `i1`, read 1.5 s later: `:hover` true, `(hover: hover)` false. The **`::after` reads `scale: 1`, background transparent**. HEAD latches `scale: 1.1` and the tint on the seat | Chromium and Playwright WebKit, identical. Gap **closed** |
| glide on the real dock | `fit&routed=1`, click t1 → t3. The glide equals t1's box before (502.56 / 136 px) and t3's final box after (642.64, 829, 136×38) exactly. Travel 208.4 ms, 26 moving frames, max step 10.5 px, 0 direction reversals (Chromium). Travel 202 ms, 13 frames, max step 21.03 px (Playwright WebKit). The selected seat's own `::after` stays transparent | both. **Break G-1:** frame 1 jumps (below) |
| off-port projection (C-6) | `long` scene, s1 selected, run scrolled to its end, pixels diffed at s1's off-port rect with and without projection paint. **0 px** in all 8 cells (HEAD and e4, pressed per-seat and glide, both engines). Planted fault (the layers' clip lifted): Playwright WebKit paints **7,360 device px** of the pressed capsule beside the dock; Chromium 0 (`position-visibility` hides it). The glide read 0 even unclipped in WebKit, which I did not explain | both. Closed on the real dock, but by the layers' clip, not by the spec's dock clip (B-2) |
| mid-morph reversal (C-4) | content add, then remove at ≈ 90 ms. Plate velocity +1.30 → −0.35 → −2.01 px/ms (Chromium) and +1.36 → −0.72 → −1.53 px/ms (Playwright WebKit): the sign flips in one frame, a wall, confirming S-16 on the real dock. HEAD has no motion to reverse (one 179.33 px step each way) | both. Gap measured, **not cured** |
| cost, first expand (Chromium CDP, 3 runs, concurrent seats running) | HEAD: 60-63 layouts / 4.27-5.0 ms layout, 110-113 recalcs / 108.3-130.7 ms style, task 211.0-251.0 ms. e3: 44-47 layouts / 42.6-45.8 ms layout, 44-47 recalcs / 30.2-30.9 ms style, task 171.3-179.4 ms. Layout time rises about 10×, style falls to about a quarter, and task time drops about 28 %. The research read 25-31 ms of layout; this build adds per-seat projections, the glide and a positioned `.dock-layers` | Chromium only |
| WebKit crash (S-2) | without the harness shim, `morph`, `fit` and `rim` crash on page load at HEAD **and** at e3. The family does not touch the nested `color-mix()` border | Playwright WebKit |

## 4 · Gestalt read (Chromium, `shots/chromium/<story>-<w>-<mode>.png`: left HEAD, right e4)

There are 8 stories (overview, layers, vertical, sections, controls, overflow, cta-receive, dock-search) at 1440×900 and 430×932, light and dark: 32 composites. `log.json` records every plate rect and zero page errors. I read overview 1440 light, controls 1440 light, vertical 1440 dark and overview 430 dark:
- **At rest the docks are geometrically the same.** Every plate bounding rect in `log.json` matches HEAD's in all 32 story × width × mode combinations, with 0 page errors. Changes of shape inside a box, such as the compact circle below, do not show in a bounding rect.
- **The collapsed "Starts compact" pill is a true circle** in e4 (overview 430 dark). HEAD paints a rounded square, the squash and lens of S-10.
- **Selected state now reads in dark mode.** In the bottom dock and on the vertical story's docks, e4 paints the selected capsule, as the glide or the per-seat projection, with its rim pair (vertical 1440 dark, overview 430 dark). HEAD's selected tab is barely visible there.
- **Selected icon capsules are larger and greyer** (controls 1440 light): the projection fills the whole seat box. HEAD inset its paint by `--dock-control-safe-inset` (10 %) and `background-clip: content-box`, both of which existed only to clear the port's clip. The capsule also loses HEAD's second `backdrop-filter` from `.glass-capsule` (the veil seat, O-62, must accept or re-rule this).
- **HEAD's controls story shows a pale lens-shaped halo** around the first two docks, and e4 does not. I did not trace its source.
- **Motion was not read from stills.** The W3 faces overhang (C-1) is what a viewer will see first on every expand: the new face's glyphs appear at full width in frame 1 while the plate grows under them.

## 5 · Breaks, all of them

- **B-1 · The containing block must sit above every port, and the spec did not say where.** The first build (`e1`) read W2 4/10, with the ring clipped to 0 px on the long run. The cause was `.dock-layer.is-active { position: relative }` (`layers.css`): the run itself was the projections' containing block, so its port clipped them. The law needs one more clause: *no box between a seat and the first box above every scroll port may be positioned*. The prototype makes `.dock-layers` that box. `DockCrossfade` faces (`position: relative`/`absolute`) still violate it for seats inside a crossfade nested in a scrolling run. That case is not measured.
- **B-2 · The spec's main-axis dock clip is inert.** An `overflow-x: clip` on `.glass-dock` does not clip descendants whose containing block is above the dock (CSS overflow). The plate and the projections escape it, and it only confused the harness's `paintedRect` (which intersects every DOM ancestor's clip), which read W3 0/14 in `e1`. The working form clips the projections' containing block (`.dock-layers`), and only while the run overflows. A clip there at all times would cut the edge seats' main-axis lift and ring.
- **B-3 · The six-member prop budget.** `progress` makes `DockProps` 7 members, and `G-DOCK-BUDGET` goes red. The rim's API belongs to the shared composable (SPECS E.2). This prop is provisional so that W5 could be measured.
- **B-4 · Positioned docks fail loud, in this repo's own demo.** Before migration, 8 demo docks painted a **2×2 px plate** (`e3`, `log.json` and `diag.mjs`): the Tailwind `relative z-10` on the root made the dock the plate's containing block. That is E-2 working as designed, and it is C-5 made concrete: any consumer class that positions or transforms the dock root (Tailwind `relative`, `fixed`, `sticky`, `translate-*`, `scale-*`, `will-change-*`, `contain-*`, `@container`) kills the plate. The removed `.glass-dock.fixed` centring rule (`dock.css`) means a fixed dock must now be wrapped. The four other consumers (X §1) are unaudited for this and need a grep at each.
- **B-5 · The cut cap is struck** (spec item 8), and with it the dock's only truncation cue at a scrolling run's edges. No scroll affordance replaces it.
- **B-6 · `useDockSpring` is not deleted.** The spec lists it as deleted, but `useDockRun` drives keyboard reach scrolling on it. Deleting it would remove the weighted scroll glide (D-1). It stays with one caller and is no longer a morph owner.
- **G-1 · The glide's first frame jumps.** On t1 → t3 its left edge goes 502.56 → 492.52 px and its width 136 → 156.11 px in one frame (Chromium; 494.91 / 155.8 in Playwright WebKit). The rest of the path is monotone. It is probably the containing block (`.dock-layers`) re-centring as the open seat's `inline-size` transition begins, but I did not verify that.
- **Faces (C-1), the reversal wall (C-4) and canon P5 (C-9)** stand as the spec states them, measured above.
- **Face swap motion.** The outer collapsed↔expanded faces jump with layout: there is no stagger, fade or scale reveal. HEAD's `--dock-morph-t` child stagger is deleted with its scalar, so the D-1/D-2 register on expand is the plate alone.
- **Card-shape corner.** `--dock-expand-t` is now a 0/1 step, so a card-shape dock's radius, padding, veil tier and border colour step at the posture flip instead of interpolating. Pill docks show only the padding step. None of this is measured.
- **The rim sits under `aria-hidden`.** The plate is `aria-hidden`, so a `role="progressbar"` rim inside it is hidden from assistive technology.

## 6 · Fences and slips

- **Worktrees.** `…/D2-E-proto/wt` (the prototype) and `…/D2-E-proto/base` (a clean baseline for the whole suite, the library-build comparison and `git apply --check`), both `git worktree add --detach … HEAD` with `node_modules` symlinked. Both are removed with `git worktree remove --force` before return.
- **Slip 1.** `git rm -q --cached tests/components/custom/dock/dockMorphMeasure.test.ts` ran inside the scratch worktree: an index write in that worktree only, outside "add/remove are the only git writes". The patch is built with `git diff HEAD`, which carries it.
- **Slip 2.** The library build's style-asset plugin spawns child processes that resolve through the symlinked `node_modules`. The checkout's `node_modules/.vite-temp` (empty) has an mtime of 15:46:06, inside my build window (15:45:10 onward), so a temp file was most likely created and removed there. Its content is unchanged.
- **Slip 3.** Early on, I read one persisted tool-output file under `~/.claude/projects/…/tool-results/` (a copy of `D2-E.md` that was too long to display) before switching to reading the repo file directly.
- **Writes in the checkout.** Only this file (Write tool) and `D2-E-proto.patch`. The patch was placed with `cp` from scratch and checked with `cmp`, because a patch must be byte-exact to apply. It then passed `git apply --check` from the checkout copy.
- **Siblings.** Sibling repos were not read or touched.
- **Browsers.** No browser MCP was used: every reading is headless Chromium or Playwright WebKit from node, with playwright imported by absolute path.

## 7 · Open gaps

- Real Safari 26 / 27 on every row, including `anchor-scope`, anchored-inset transitions, the layers' main-axis clip and `position-visibility`: UNMEASURED (owner's safaridriver checkbox).
- W3 faces (C-1): no in-family cure. The four growing cells per engine stay RED.
- W4 compact ×4 and W5 compact ×1 per engine: absent until the shared state composable exists. W4 tap-pins ×1 per engine: `useDockState`.
- The rim API: `progress` is provisional, breaks the six-member budget, and hides the progressbar from assistive technology.
- The reversal wall (C-4) and the canon P5 layout animation (C-9) need owner rulings.
- Glide first-frame jump (G-1): unexplained. The glide's zero reading in the unclipped WebKit planted fault is also unexplained.
- A crossfade nested in a scrolling run would put a positioned box between seat and port (B-1). Not measured.
- Consumer audit for dock-root positioning and transforms (B-4) at value.js, keyframes.js, fourier-analysis and chicago: not run.
- Compositor lag of anchored projections during the press spring: not observable headless.
- Motion gestalt on a real display. The stills here are rest frames only.
