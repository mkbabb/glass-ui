# D2 · pass 1 · D2-C · prototype (one integrator, a transform track, no scroll container)

| field | value |
|---|---|
| seat | D2 pass 1, PROTOTYPE seat for family D2-C. It read `SPECS.md` (the D2-C spec and the shared facts only), `D2-C.md` and `harness/HARNESS.md`, then built the spec on the real dock source |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the brief named `5804d8cc`; the worktree was cut at `857cb97f`. `git diff --quiet 5804d8cc 857cb97f -- src` holds, so `src/` is v10.0.1 |
| engines | Chromium 149.0.7827.55 headless; **Playwright WebKit** 26.5 (the Playwright 1.61.1 build, not Safari), every cell `+shim` (`HARNESS.md` §4). Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. iOS Safari, VoiceOver, TalkBack: **UNMEASURED** |
| verdict | **RUNS.** The patch typechecks, builds, passes 13 of 14 dock test files, and passes W1 32/32, W2 10/10, W3 8/14, W4 12/16, W5 10/10. At `--spring-dock-settle: 0.26s` W3 is 14/14 in both engines |
| patch | `pass-1/D2-C-proto.patch`: 23 files, +1,362 / −1,605 (`git apply --check` passes on a fresh `857cb97f` worktree). It keeps the shipped 210 ms clock. The 0.26 s token is the spec's routed ask and is not in the patch |
| scratch | `S = …/scratchpad/D2/p1/D2-C-proto/`: builds `out/builds/{head,d2c,d2c-clock}`, harness runs `out/runs/`, probes `mine/`, screenshots `shots/{before,after,diff}` and `shots/cmp-*.png`, logs `head-run.txt`, `d2c-final.txt`, `typecheck.txt`, `vitest-dock.txt` |

## 0 · Results

| witness | HEAD `857cb97f` (this seat) | prototype, Chromium | prototype, Playwright WebKit | prototype at 0.26 s clock | RED, and why |
|---|---|---|---|---|---|
| W1 corner | 10/32 (5/16 per engine) | **16/16**, worst 0.137 px | **16/16**, worst 0.083 px | not re-run | none |
| W2 run | 0/10 | **5/5**: 0 scroll-container frames on every route; ring cut 0/0 on both long runs and under hover | **5/5** | not re-run | none |
| W3 morph | 0/14 | **2/7**: first expand and content remove pass | **6/7**: warm collapse fails | **14/14** (7/7 per engine) | the window only, at the shipped 210 ms clock (§2.2) |
| W4 state | 4/16 (2/8 per engine) | **6/8** | **6/8** | not re-run | coarse hover latch and coarse tap-pins: floor row 3 is not built |
| W5 rim | 0/10 | **5/5**: 0 px outside | **5/5**: 0 px outside | not re-run | none |

Commands, from `S`:

```sh
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness
node $H/build.mjs wt --out out --label d2c
node $H/run.mjs --build out/builds/d2c --adapter adapter-d2c.mjs --out out            # → d2c-final.txt
node $H/run.mjs --build out/builds/head --out out                                     # → head-run.txt
# clock variant: the token set to 0.26s in the worktree, built, then set back (git diff -- src/styles/tokens is empty)
node $H/w3-morph.mjs --build out/builds/d2c-clock --adapter adapter-d2c.mjs --out out
```

`adapter-d2c.mjs` is the research seat's adapter with one read changed: `morphing()` reads `[data-morphing]`. That makes it the one-attribute form the spec asks for. The research probe had used `data-dock-moving`.

## 1 · What was built

| file | change |
|---|---|
| `composables/useDockBody.ts` | **New** (253 lines). One `requestAnimationFrame` steps N lanes. Each lane is a keyframes `SpringProgress` advanced by `tickDt`. Its `.play()` is never started, and the loop parks when every lane has seated. The lane API is `to`, `hold`, `fling` and `set`. The seat rules are `cross` (\|Δ\| ≤ eps, or the frame that would cross the target) and `rest` (\|Δ\| ≤ eps and \|v\| ≤ vEps, so it keeps its overshoot). The first frame advances by real elapsed time. Every lane is built `respectReducedMotion: true`. When the reduced-motion query turns on mid-flight, every moving lane seats. `provideDockBody()` shares one body per dock, and `useDockBody()` mints a standalone one |
| `composables/useDockExtent.ts` | **New** (438 lines). It replaces `useDockMorph.ts` and `dockMorphMeasure.ts`. It uses three body lanes: extent (eps 0.5 px, crossing seat), the outer-face crossfade (eps 0.004), and compaction c. Its triggers are a `flush: "post"` watcher on the posture, a ResizeObserver, and a MutationObserver microtask check (§3, D-4). Per frame it writes plate insets, a translate per region, a hold for leaving faces, and main-axis aperture clips while moving. It also writes the swell σ = 0.04·min(1, \|v\|/3000), and compaction k = 1 − 0.16c about the centre |
| `composables/useDockRun.ts` | **Rewritten**. `.dock-track` is moved only by the body's `s` lane (`rest` seat). Reach runs on focusin, click and the roving keys. The gesture uses a 6 px slop, a 1:1 hold, and the rubber band (1 − 1/(x·0.55/d + 1))·d. Release velocity comes from the samples in the last 100 ms, projected by `decayRest` (k = −ln 0.998·1000 ≈ 2.0 /s) onto the nearest rest. A captured drag suppresses its click. The wheel takes pixels 1:1, a line as a pitch and a page as a port, lands on a rest after 90 ms idle, and calls `preventDefault` only when s_max > 0 |
| `composables/useDockScrollSource.ts` | **New** (67 lines). `scrollSource` is a getter, an element or the window. Compaction is position hysteresis: T 120, h 40 by default, and top resets it. It also reports progress 0..1 for the rim |
| `GlassDock.vue` | Provides the body. Wraps the default slot in `<div class="dock-track">`. Holds the plate ref, a `.dock-rim` child of the plate, and the rim lane (response 0.2, ζ 1). The engagement gate is a non-touch pointerenter or focus within. The posture class is `compact` |
| `DockCrossfade.vue` | Its spring is one lane on the enclosing dock's body, or on a body of its own when standalone |
| `useDockShellProps.ts` | Adds `scrollSource`, `compactOnScroll` (boolean or `{threshold, band}`) and `rim` |
| `styles/run.css` | The run is `overflow-x: clip; overflow-y: visible` (the axes swap on a vertical dock). It has a main-axis ring reserve and `touch-action: pan-y` (`pan-x` on a vertical dock). `.dock-track` is `max-content` with `translate: calc(-1 * var(--dock-s))`. **Deleted:** snap type, scroll padding, `overscroll-behavior`, the `--dock-run` scroll timeline, the four cut-cap keyframes and the plate animations. The live region is `overflow: clip` |
| `styles/dock.css` | The plate is resized through `--dock-plate-s/-e/-x` insets, never clipped or scaled. Its ink, border mix and card radius read `--dock-plate-t`. The elevation `box-shadow` moves from the root to the plate. Adds the rim rules. **Deleted:** the plate `clip-path`, the `--dock-t: var(--dock-morph-t)` alias, and the reduced-motion `--dock-t` pin |
| `styles/shape.css`, `layers.css`, `morph.css`, `crossfade.css`, `shell.css`, `index.css` | **Deleted:** the `scale: var(--dock-size-scale)` morph and its counter-scale, the `--dock-live` blend, the held `inline-size: var(--dock-expanded-px)`, the `[data-morphing]` overrides of `--dock-expand-t` (so it is now a class constant and the root padding never moves per frame), the crossfade's `--dock-morph-t` clip, and `@property --dock-morph-t`. **Added:** the body's translate, scale and aperture rules (an unset variable makes each declaration invalid at computed-value time, so every one computes `none` at rest). Inactive outer faces become `max-content`. The stagger reads `--dock-reveal` over the track's children |
| deleted | `useDockSpring.ts`, `useDockMorph.ts`, `dockMorphMeasure.ts`; the `useDockMorphOrchestrator` export |
| tests | `dockMorphMeasure.test.ts` is deleted. `g-dock-lattice.test.ts` loses the two tests of the deleted module. `GlassDock.motion-parity.test.ts`: its reversal and reduced-motion tests now read the plate's `--dock-plate-t`. `GlassDock.stagger.test.ts` reads the track's children |

## 2 · Witness detail

### 2.1 W1, W2, W4, W5

- **W1.** Every cell is a stadium: rests, hovered rests, the demo SidebarDock at 1440×900 and 1440×600, and every sampled morph frame with the swell on.
  - Worst 0.137 px (Chromium) and 0.083 px (Playwright WebKit), against a 1.0 px bound.
  - **The `rail·scrolled-end` cell is vacuous on this family.** It calls `scrollIntoView`, which does not move a transform track (C-2). It passes on the rest geometry.
  - Re-measured by reach instead (`mine/railend.mjs`): `focus()` on the last seat moves s 0 → 168.49 and shows that seat 100 %. The corner then reads 0.137 px (Chromium) and 0.011 px (Playwright WebKit). `scrollIntoView` leaves s at 0 in both.
- **W2.** Route 1 (long runs, 664 against 360, and 568 against 560): 0 scroller frames of 38 and 36, and ring reach 4.25/4.25 clipped against 4.25/4.25 free, so the cut is 0/0. Routes 2-4: 0 scroll-container frames of 74, 252 and 211, and the route-4 ring cut is 0/0.
- **W4.**
  - Compacts: 214.13 → 179.88 px, posture `compact`.
  - Engagement: hover 214.13, leave 179.88, focus 214.13, blur 179.88, top 214.13.
  - Threshold: enter 161, exit 76 (a band of 85 px), 1 flip in 24 moves.
  - Reduced motion: compaction 214.13 → 179.88 and the posture morph 102 ↔ 489.66, each with 0 intermediate frames.
  - The menu holds.
  - **RED:** the coarse hover latch (scale 1 → 1.1, a tint, `:hover` true 1.5 s after a tap), and coarse tap-pins (1 click fired on "Play"). Both engines. Floor row 3 is not built.
- **W5.** Rim ink, 0 device px outside in every rung:

  | rung | Chromium (device px) | Playwright WebKit (device px) |
  |---|---|---|
  | horizontal expanded | 1450 | 1444 |
  | horizontal collapsed | 202 | 196 |
  | vertical expanded | 1268 | 1268 |
  | vertical collapsed | 204 | 202 |
  | compact | 1779 | 1782 |

### 2.2 W3 (final build, shipped 210 ms clock)

| transition | Chromium: step ratio · faces · landing · window / allow | Playwright WebKit (+shim) |
|---|---|---|
| first expand, D 387.66 | ×0.66 · 0.13 px · dead, 0 reversals · **257.5 / 268.7 PASS** | ×0.65 · 0.09 · dead · **259 / 265 PASS** |
| warm collapse | ×0.66 · 0.15 · dead · 258.4 / 253.4 | ×0.66 · 0.12 · dead · 269 / 266 |
| warm expand | ×0.66 · 0.12 · dead · 257.2 / 253.5 | ×0.66 · 0.08 · dead · **265 / 269.4 PASS** |
| content add, D 179.33 | ×0.65 · 0 · dead · 257.9 / 253.3 | ×0.65 · 0 · dead · **251 / 263 PASS** |
| content remove | ×0.65 · 0 · dead · **251.2 / 253.4 PASS** | ×0.65 · 0 · dead · **248 / 261 PASS** |
| swap long, D 244.98 | ×0.65 · 0 · dead · 258.1 / 253.4 | ×0.65 · 0 · dead · **263 / 276 PASS** |
| swap short | ×0.65 · 0 · dead · 258.7 / 253.4 | ×0.65 · 0 · dead · **250 / 265 PASS** |

- **Cured:**
  - O-64 R-1: the first expand is continuous.
  - R-2: a content change and a swap are retargets, with a window.
  - R-3: every landing is dead, with 0 reversals.
  - R-5: 0 two-owner frames in every cell.
  - The faces stay inside the plate, at worst 0.15 px out.
- **R-4 is the RED:**
  - Windows run 250-269 ms against allowances of 253-276 ms, over by 1-5 ms in six cells.
  - The closed form puts the 0.5 px landing at 245-262 ms, and the 210 ms clock cannot hold it (C-4).
  - Three W3 runs of the final source read 8/14, 8/14 and 8/14. The pass/fail split moves by one cell inside Playwright WebKit (warm collapse vs warm expand), which is headless frame jitter (S-4).
- **At `--spring-dock-settle: 0.26s`**, windows read 248-268 ms against allowances of 303-336 ms, and all 14 cells pass.

## 3 · Deviations from the spec, and the reason for each

- **D-1 · The hold is the target layout, not max(from, to).**
  - The root lays out once, at its target, when the posture flips. The plate paints the lerped extent through insets that go negative while the painted extent is larger than the root.
  - Neither form relayouts per frame. This one needs no max computation and no held size.
  - Consequence: a dock in normal flow moves its siblings straight to the target size. The spec's hold moves them straight to max(from, to).
- **D-2 · The shadow moved to the plate.** The root's box jumps to its target, so an elevation painted from the root would jump with it. The plate is the box that travels. Consumer `box-shadow` overrides on `.glass-dock` stop applying (`--shadow-dock-override` is still read). Clean break.
- **D-3 · No `--dock-pad-t` token.** `--dock-expand-t` already is a class constant once its `[data-morphing]` overrides are deleted, so the padding reads it unchanged.
- **D-4 · The endpoint triggers are three, not two: posture watcher, ResizeObserver, and a MutationObserver microtask check.**
  - An earlier build used the ResizeObserver alone for content changes. Its full run read Playwright WebKit content add at step ×7.1 (179.39 px) and swap long at ×5.62 (245.06 px), each with 2 reversals.
  - At rest the plate is the root's box, so a read taken between the DOM change and the RO callback sees the new extent unmorphed.
  - Checking in the mutation's own microtask closes that gap. The three W3 runs after the change show no continuity failure.
- **D-5 · Coordinates.** Endpoints are stored as viewport coordinates, plus the window scroll unless the dock sits in a fixed chain. They are refreshed on `resize`. Only window scroll is corrected for (C-8 stands).
- **D-6 · Reach picks the nearest lattice rest that shows the whole seat.** `focus()` on seat 12 of `long` lands at s 264, where the research probe landed at 328, and the seat is fully visible either way.
- **D-7 · Seats look through `display: contents`** children of the track. Floor row 1 (`[data-dock-seat]` at any depth) is **not** built: a wrapper `div` is still one seat.
- **D-8 · The outer-face crossfade is its own lane** (the spec's "face crossfade"). It drives the entering face's `--dock-reveal` (the stagger), the leaving face's `--dock-fade` and the plate's `--dock-plate-t`. The window closes when both it and the extent have seated.

## 4 · Family probes (the research seat's `fam.mjs` and `idle.mjs`, run on this build)

- **A · no scroll container:** 0 elements with `auto`, `scroll` or `hidden` overflow across 9 scenes (fit, long, rail, morph, morph expanded, swap, rim, compact, the demo sidebar), in both engines.
- **B · gesture:**
  - Mouse flick of 80 px: rest 328 after 420 ms (Chromium) / 408 ms (Playwright WebKit), 0 clicks.
  - 120 px overpull: shows −49.28 px, back to 0 in 259 / 261 ms.
  - **60 px, then a 150 ms pause, then release: rest 72, the lattice rest nearest the drop, with no fling.** The research probe flung this to 168 and 216 (C-10). The 100 ms window cures it.
  - Touch, Chromium CDP emulation: 1 down, 10 moves, 0 cancels, rest 384 on the lattice 364 ms after the gesture. A vertical pan from the dock: 1 cancel, and the page scrolled 519 px. Playwright WebKit cannot synthesise touch moves.
- **C · reach:** 14 buttons in the ARIA snapshot. `scrollIntoView` leaves s at 0. `focus()` gives s 264 and 100 % visible. An arrow walk keeps every focused seat 100 % visible and ends at s 328.
- **D · loop:**
  - Chromium: the body's rAF site ran 29 frames on a first expand, plus 1 kick, and 0 in the 2 s after it.
  - The page still requests 241 frames per 2 s at idle from one other site, the luminance sampler (S-31). Playwright WebKit reads 120.
  - Playwright WebKit's stacks do not name the body's site, so its body frame count is **UNMEASURED**.
- **E · squish:** live, 56 → 58.22 px at peak (+2.22 px) in both engines. Resizing the plate keeps the corner at 0.137 / 0.035 px from 0 to 10 %. A scale reads 0.35 / 0.28 px at 4 % and 0.60 / 0.69 px at 10 %.
- **F · wheel:**
  - A vertical 100 over a horizontal dock goes to the page (+100).
  - A horizontal 100 rests at 72 in Chromium (delivered as `deltaX` 50) and 120 in Playwright WebKit, both on the lattice.
  - Past the end: `preventDefault` true, s 328.68 / 328.87, then back to 328.
  - A 3-line notch targets 144 and rests at 120.
  - A dock that fits: `preventDefault` `[false, false]`.
- **G · clip:** the run computes `clip/visible`. `scrollLeft =`, `scrollBy` and `scrollIntoView` all leave it at 0.

## 5 · Build, typecheck, unit tests

- **Typecheck:** `npm run typecheck` exits 0 in the worktree (`typecheck.txt`).
  - Before the library build, `tsconfig.test.json` reports 2 errors in `FourierField.smoke.test.ts`: `@mkbabb/glass-ui/fourier-math` does not resolve without `dist/`. This is the environment, not this change.
  - `vue-tsc --noEmit` on `src` reports 0 errors either way.
- **Library build:** passes in 8.3 s (`mine/libbuild.mjs` loads `vite.config.ts` through `runnerImport` with a `__dirname` literal, and the cache is in scratch). The config's own publish step writes `wt/dist` (4.8 MB).
- **Dock unit tests** (`npx vitest run tests/components/custom/dock`): 14 files, 13 pass; 121 tests, 111 pass, 1 expected fail, **9 fail**, all in `g-dock-lattice.test.ts`.
  - The nine are source-grep gates that assert the struck design: the snapped, contained scroller (×2); the cap's named timeline and its keyframe tokens (×2); the `openExtra` and −P/2 anchor terms (×2); the cross-axis ring reserve; the "cut cap is the only animated radius" rule.
  - **"DockProps is at most six members"** fails because the spec's three new props make nine. That is a real conflict between C.2 and G-DOCK-BUDGET, and an owner call.
  - The motion-parity reversal and reduced-motion tests pass once rewritten against `--dock-plate-t`. The stagger test passes against the track.

## 6 · Gestalt (the demo's dock stories, before and after)

32 shots per build in Chromium: `/dock/{overview,layers,vertical,sections,controls,overflow,cta-receive,dock-search}` × 1440×900 and 430×932 × light and dark. The SidebarDock and BottomDock appear on every page. Paths: `shots/before/`, `shots/after/`, with pixel diffs in `shots/diff/` (red is a channel delta > 24).

- **Layout is unchanged.** Every `.glass-dock` root box is the same before and after in all 32 shots, and no shot has a page error.
- **0 changed pixels** in overview, overflow, cta-receive and dock-search at 1440 in both themes, and in vertical at 1440 dark.
- **The HEAD lens is gone.**
  - At HEAD the leading end of a fitting horizontal dock paints an elliptical lens. In `shots/ellipse-cmp.png` (HEAD with nothing lifted, the root shadow lifted, the plate animation lifted, the plate clip lifted), only lifting the plate animation removes it. So it is the cut cap: `50%` on a wide box resolves to elliptical radii.
  - The prototype paints a plain stadium there (`shots/cmp-controls-1440-light.png`, `cmp-layers-430-light.png`).
  - The rest of the diff on those docks is the rim edge, now painted from the plate.
- **An overflowing dock at 430 now rests at s = 0** (`cmp-sections-430-light.png`). HEAD's snap engine rested it partway along, with Home out of view and the lens at the start. The prototype starts flush at Home. The trailing seat is cut at the port edge **with no cue that more seats exist** (open gap: no content-level end cue was built).
- **BREAK · the BottomDock at 430** (`cmp-bottomdock-430-dark.png`, `mine/bottomdock.mjs`).
  - The demo puts a `<FadingScroll>` (its own scroll port, `flex: 1 1 auto`) inside the run as one seat.
  - Inside a `max-content` track a flexible seat cannot shrink. The strip grows from 46 px (HEAD, where it is crushed and shows "Over…") to 258 px.
  - "Next story" is then 30 % visible, and "Previous category" and "Next category" are clipped off the port. Drag, wheel and focus still reach them.
  - Both states are defective. This consumer shape is **not in the spec's migration table**. Its migration is to put the story tabs directly on the track and move prev/next/jump to `#persistent-end`.

## 7 · Breaks, all of them

1. W3's window at the shipped 210 ms clock: 6 cells over by 1-5 ms (§2.2). Closed by the routed clock ask (option 1).
2. W4's coarse hover latch and coarse tap-pins, both engines: floor row 3 is not built.
3. The BottomDock's nested-scroller seat at 430 (§6). Flexible seats do not flex in the track, and the consumer must migrate.
4. `g-dock-lattice.test.ts`: 9 source gates of the struck design, including the six-member prop budget against the spec's nine (§5).
5. The ResizeObserver gap (fixed by D-4). As the spec stands, relying on the RO alone lets a reader see the unmorphed extent.
6. `rail·scrolled-end` in W1 is vacuous for a transform track (§2.1). The harness drives it with `scrollIntoView`.
7. **Stale prose:** about 50 comment lines in the touched files and their neighbours (`morph.css`, `layers.css`, `shape.css`, `shell.css`, `index.css`, `crossfade.css`, `GlassDock.vue`, `useDockSearch.ts`, `dockCrossfadeContext.ts`) still describe `--dock-morph-t`, the snap scroller and the cut cap. They were not rewritten.
8. **Unmeasured mechanism risks:**
   - A crossfade face's hold is released when the extent window closes, even if its opacity lane is still moving.
   - A DockCrossfade that unmounts leaves its lane in the body's list.
   - When compaction and a posture morph overlap, the face clip is computed unscaled while `.dock-layers` is scaled.
   - The card corner now follows `--dock-plate-t`, and no card scene was run.
9. **Fence:**
   - My `npx vitest` runs wrote through the `node_modules` symlink into the checkout. They updated `node_modules/.vite/vitest/da39…/results.json` (the vitest results cache) and created, then removed, a config temp file in `node_modules/.vite-temp` (that directory's mtime reads 13:36:35).
   - The task mandated both the symlink and vitest. A future seat should point vitest's cache and config loader at scratch.
   - One `git rm --cached` ran in my own worktree's index, outside `worktree add/remove`. The checkout's index was not touched.

## 8 · Open gaps

- iOS Safari, real Safari 26.4, VoiceOver and TalkBack: every cell UNMEASURED (owner's safaridriver checkbox).
- The clock: the patch keeps 210 ms, and W3 is 14/14 only at the 0.26 s token, which is the routed ask. The `linear()` curve was not regenerated on the 0.26 s horizon.
- Floor rows 1 and 3 are not built: `[data-dock-seat]` at any depth, the coarse hover latch, and tap-pins.
- No content-level end cue for hidden seats, which is visible at 430 (§6).
- The BottomDock migration was not implemented, and the spec's consumer table lacks the nested-scroller seat.
- The 21 test files that name the old internals were not audited. Only the 3 that import deleted modules were touched, and the 9 lattice gates remain RED.
- The Playwright WebKit body frame count, per-frame cost, fourier's M-C and M-6, value.js X-11 under the body, and the C-5 CSS size transitions on seats are unmeasured.
- A V↔H morph on a two-dimensional extent was not attempted.
- AT-cursor reach (C-1) and consumer `scrollIntoView` (C-2) stand as named.

## 9 · Reproduce

```sh
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-C-proto
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness
git worktree add $S/wt 857cb97f && ln -s /Users/mkbabb/Programming/glass-ui/node_modules $S/wt/node_modules
(cd $S/wt && git apply /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-1/D2-C-proto.patch)
node $H/build.mjs $S/wt --out $S/out --label d2c
node $H/run.mjs --build $S/out/builds/d2c --adapter $S/adapter-d2c.mjs --out $S/out
OUTDIR=$S/mine/res node $S/mine/fam.mjs $S/out/builds/d2c $S/adapter-d2c.mjs chromium A,B,C,D,E,F,G d2c
node $S/mine/idle.mjs $S/out/builds/d2c $S/adapter-d2c.mjs chromium
node $S/mine/railend.mjs $S/out/builds/d2c $S/adapter-d2c.mjs
node $S/mine/shots.mjs $S/out/builds/d2c after && node $S/mine/pxdiff.mjs $S/shots/before $S/shots/after $S/shots/diff
```
