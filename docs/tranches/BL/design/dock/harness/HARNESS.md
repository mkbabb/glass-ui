# D2 · the dock measurement floor

| field | value |
|---|---|
| seat | D2 pass 1, HARNESS. It promotes the round-0 scratch harness (`scratchpad/D2/harness/` and the probes `p1-fit.mjs` … `p11-content.mjs`) into durable prototype tooling: five born-RED witnesses, one per problem of `PORTFOLIO.md` §0 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | measured at `5dd68ca9`. The brief named `5804d8cc`; the 3 commits between them touch only `docs/tranches/BL/`, and `src/` is byte-identical to `v10.0.1` (`git diff --quiet v10.0.1 5dd68ca9 -- src`). The checkout moved on to `20911dce` (D1) during the run, with `src/` still unchanged. Clean worktree, `node_modules` symlinked from the checkout. The checkout has no `tests-visual/node_modules`, so there was nothing to link |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless, which is the build Playwright 1.61.1 ships and is not Safari. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. Node 26.0.0, Vite 8.1.5 |
| viewport | 1440×900 at DSF 2; coarse cells 430×848 with `isMobile` + `hasTouch`; reduced-motion cells use the context's `reducedMotion: "reduce"` |
| verdict at HEAD | W1 9/32 cells pass, W2 0/10, W3 0/14, W4 4/16, W5 0/10. Every witness is RED (`run.mjs`, §5) |
| self-test | 21/21 expectations hold: each witness PASSES on the hand-made fixture and FAILS on each planted violation, in both engines (`selftest.mjs`, §6) |

## 0 · What it is

The harness:
- builds a scene page, plus the real demo, from any worktree;
- drives both engines headless;
- reads the dock through one small in-page contract, the adapter;
- judges five properties.

A witness prints one `PASS`/`FAIL` line per cell with the numbers behind it, then a total line. It writes a JSON record and exits non-zero on FAIL.

Each witness has a reference implementation in `fixtures.mjs`. It is plain HTML/CSS/JS that satisfies all five problems and exists only to prove each witness can pass. Planted faults (`?fault=`) prove each witness can fail.

## 1 · Run it

```sh
H=docs/tranches/BL/design/dock/harness
OUT=/private/tmp/…/scratchpad/D2/p1/out          # any scratch dir; default $DOCK_HARNESS_OUT or $TMPDIR/dock-harness

git worktree add $WT HEAD && ln -s "$PWD/node_modules" $WT/node_modules
node $H/build.mjs $WT --out $OUT --label head     # scene page + demo → $OUT/builds/head
node $H/run.mjs --build $OUT/builds/head --out $OUT            # all five witnesses, both engines
node $H/w3-morph.mjs --build $OUT/builds/head --engine chromium --out $OUT   # one witness, one engine
node $H/selftest.mjs --out $OUT                   # fixture PASS + planted-fault FAIL for all five
```

A family prototype builds from its own worktree the same way. If it moved the dock's DOM, it passes its own adapter with `--adapter <file>` (§3).

`build.mjs` writes nothing inside the worktree or the checkout. Everything lands under `$OUT/builds/<label>/`: the scene sources, both Vite caches and both outputs. A `find -newer` over the checkout's `node_modules` and the worktree after a build returned nothing.

Two details keep it that way:
- Vite's `bundle` config loader writes a temp file into the nearest `node_modules`, and here that is a symlink into the checkout. Its `runner` loader rejects the demo config's `__dirname` under Node's ESM detection (`ERR_AMBIGUOUS_MODULE_SYNTAX`). So `build.mjs` imports `demo/vite.demo-dist.config.ts` through `vite.runnerImport`, with one pre-transform that turns `__dirname` into a string literal. It then builds with `configFile: false`.
- A build took 1.2 s for the scene page and 2.6 s for the demo (`build.json`).

## 2 · Files

| file | role |
|---|---|
| `build.mjs` | `node build.mjs <worktree>`: builds the scene page (from `<worktree>/src` via `@glass`) and the demo (the worktree's own demo-dist config) into scratch, and writes `build.json` (HEAD, dirty flag, timings) |
| `scenes.mjs` | The scene page as source strings. Scenes: `fit`, `rail`, `long`, `morph`, `vmorph`, `swap`, `menu`, `compact`, `rim`, `vrim`. Its only coupling to the `src/` layout is the App.vue import block: the dock, popover, select and scroll-progress-rim barrels, and `@glass/composables/motion` for `SPRING_PRESETS` |
| `adapter-head.mjs` | The probe contract for GlassDock as it stands at HEAD, plus the WebKit crash shim (§4) and the demo route for the SidebarDock (`/dock/overview`) |
| `lib.mjs` | The floor: CLI, static server, targets, engine launch, in-page helpers (`__hp`), probe paint, PNG decode (`pngjs`), the silhouette read, the per-frame logger, spring math, reporting |
| `fixtures.mjs` | The hand-made reference dock and its planted faults |
| `w1-corner.mjs` … `w5-rim.mjs` | The five witnesses |
| `run.mjs` | All five witnesses on one build, then a table |
| `selftest.mjs` | Checks the fixture PASS and every planted FAIL |

## 3 · The probe contract

A witness reads the dock only through `window.__dockProbe`. For a build target the adapter module installs it; a fixture page defines its own.

| read | meaning | HEAD adapter |
|---|---|---|
| `root()` | the dock root | `[data-testid=dock]`; on the demo, `[data-testid=sidebar-dock-collapsible]` |
| `plate()` | the one element that paints the glass plate (the silhouette carrier) | `.glass-dock > .dock-plate` |
| `axis()` | `"x"` or `"y"` | `.vertical` on the root |
| `extent()` | the plate's painted rect, after its own `clip-path: inset()`, every ancestor clip and transforms | `__hp.paintedRect(plate)` |
| `seats({all})` | seat elements; `all` includes inert faces | `.dock-icon-button, .dock-tab-button, .dock-trigger` |
| `paintingSeats()` | seats with opacity > 0.05 along the chain, each with its clipped painted rect | from `seats({all:true})` |
| `morphing()` | the morph window is open | `[data-morphing]` |
| `rung()` | the spring the extent morph rides: `response`, `dampingFraction`, `settleBand`, `clockMs` | `springPreset("dock")` from the scene's `SPRING_PRESETS` (0.30 s, ζ 0.88, band 0.02); `clockMs` resolves `--spring-dock-duration` through a probe element: 210 ms |
| `posture()` | `collapsed`, `expanded`, `pinned`, `compact`, … | root classes |
| `budget()` | the main-axis extent the dock may reach | `min(max-inline-size, parent content box)` |
| `rim()` | the dock's own progress-rim elements, or `null` | `null`: HEAD has no rim seat |
| `compact()` | the dock has the opt-in compact-on-scroll rung | `false` |

Two adapter fields bind a family's API onto the scene: `config.compactProps` and `config.rimProps`. The string `"@window"` becomes a getter to `window`, which satisfies O-55's getter-or-element contract. Both are `null` at HEAD.

The pixel reads (W1, W5) are independent of the adapter's geometry:
- **Probe paint** hides everything but the named element.
- `plate` mode paints the plate opaque magenta on white and keeps every clip and transform on its chain.
- `rim` mode paints only the rim, in its own colours. The plate keeps its clips but paints nothing.
- `seat` mode paints one seat on white.

W1 cross-checks the adapter's `extent()` against the magenta silhouette at every rest. At HEAD the delta was 0.00-0.49 px.

## 4 · Engines

**Playwright WebKit crashes on every GlassDock mount at HEAD.** The trigger is any property whose value nests two translucent `color-mix()` arms, for example:

```css
color: color-mix(in srgb, color-mix(in srgb, #1c1917 8%, transparent) 50%,
                          color-mix(in srgb, #1c1917 5%, transparent));
```

It crashes at 0%, 50% and 100% and in `border`, `background-color` and `color`, but not with one opaque arm. The plate border (`dock.css:130-135`) resolves to exactly this once `--dock-expand-t` is set: `--glass-border-dock` / `--glass-border-floating` are `color-mix(in srgb, var(--foreground) 8% | 5%, transparent)`. So `.expanded`, `.collapsed` and `.always-expanded` each crash, and `.pinned` alone does not. The bisection is in scratch at `D2/p1/dbg/`.

`adapter-head.mjs` carries `webkitShim`, a stylesheet that pins the plate's border colour to one arm. The 1.5 px border width and every geometry and motion input are untouched.
- Witnesses apply the shim on WebKit only and label those cells `+shim`.
- `--no-webkit-shim` reproduces the crash: `w5-rim.mjs --engine webkit --no-webkit-shim` exits 1 with `page.goto: Page crashed`.
- This is harness tooling, not a cure. Whether shipping Safari crashes is **UNMEASURED (owner's safaridriver checkbox)**. The memory record says it renders there.

Every WebKit number below is **Playwright WebKit**. No real-Safari cell was run.

## 5 · The witnesses

Each section gives the property, the method, the bounds with their sources, then the reading at HEAD. Readings are Chromium / Playwright WebKit (`+shim`) from `run.mjs --build head` (JSON in `$OUT/runs/W*-head/`).

### W1 · the plate corner is a circle of radius = cross/2, at rest and at every sampled morph frame

**Method** (`w1-corner.mjs`, `lib.mjs cornerRead`):
- The plate is probe-painted magenta and screenshotted.
- Sub-pixel edges come from the silhouette's middle row and column; r = half the cross-axis extent.
- Rows sample the steep half of each quarter arc and columns the shallow half, so no sample sits on a tangent.
- Every sample's radial distance is compared with r from a centre r in from both edges.
- Morphs are sampled by screenshotting continuously until the plate is still: 8-28 samples per transition.

**Scenes:**
- the `fit` dock at rest, and parked hovered after a sweep;
- the demo SidebarDock at 1440×900, and at 1440×600, where its 653 px rail must scroll;
- the capped vertical `rail` at both scroll ends;
- `morph` and `vmorph` collapsed and expanded at rest, plus every sampled frame of the first expand, the warm collapse and the warm expand.

**Bound:** at most 1.0 CSS px from the circle.
- The stadium fixture reads at most 0.107 px (Chromium) and 0.072 px (WebKit).
- Playwright WebKit's snapping of a plate at a fractional x reads 0.49 px on HEAD's true-stadium rests (`offsetWidth` 401 against a rect of 400.53).
- The bound is twice the larger, and 4.6× below the smallest real defect at HEAD: 4.62 px.

| cell | worst error (px), Chromium / WebKit | reading |
|---|---|---|
| fit · rest | 0.137 / 0.492 | PASS: a stadium |
| fit · hovered rest | 0.137 / **14.117** | FAIL in WebKit: a lens (mean r 19.2 against 28) |
| sidebar (demo) · 1440×900 | 0.137 / 0.011 | PASS: the rail fits, 64×653 |
| sidebar (demo) · 1440×600 | **16.486 / 16.463** | FAIL: the owner's F-18 lens on the real demo, 64×480, mean r 21.7 against 32 |
| rail · rest, scrolled end | **19.845 / 19.774**, **19.818 / 19.783** | FAIL: the lens (mean r 21.9 against 32) |
| morph · collapsed rest | **4.624 / 4.643** | FAIL: the `scale` squash on a 102×56 plate |
| morph · first expand | **4.624 / 4.643** | FAIL; 16 / 24 samples, 1 distinct extent: it holds, then jumps (W3) |
| morph · expanded rest | 0.137 / 0.492 | PASS |
| morph · warm collapse, expand | **6.266 / 6.265**, **4.705 / 6.265** | FAIL: the corner squashes through the morph |
| vmorph · collapsed rest, first expand | **5.923 / 5.936** | FAIL |
| vmorph · expanded rest | 0.137 / 0.011 | PASS |
| vmorph · warm collapse, expand | **11.346 / 11.26**, **11.777 / 11.842** | FAIL |

### W2 · the run is a scroll container only when its seats exceed the budget; no ring or shadow is clipped in the cross axis

**Method** (`w2-run.mjs`):
- Every frame of each route records every CSS scroll container that is an ancestor of a seat inside the dock, meaning computed `overflow-x` or `-y` of `auto`, `scroll` or `hidden`, and its scroll range.
- "Exceeds" is read once at rest, transform-free: the union of the seat boxes plus the run's main-axis padding, against `budget()`.
- **Paint check:** one seat gets keyboard focus (`:focus-visible` verified), stays selected and is hovered, and is probe-painted alone on white. Its paint reach past its box is read on both cross sides. Then every clip on its ancestors inside the dock is lifted (`[data-hp-unclip]`: overflow visible; clip-path, contain and mask none), the seat is re-hovered, and the reach is read again.

**Routes:**
1. a long run (seats exceed, so scrolling is allowed; the paint check runs);
2. the collapsed layer at rest;
3. routed seats (`aria-current`) hovered and re-selected;
4. a hover-scale sweep over every seat.

**Bounds:**
- On a run that fits: 0 frames with a scroll container, and 0 frames with a range above 0.5 px (the LayoutUnit floor).
- A cut of at most 0.5 CSS px on each side.
- Ink threshold 12/255, the same for both shots.

| cell | Chromium | Playwright WebKit (+shim) |
|---|---|---|
| route 1 · long run, horizontal (needs 664 px, budget 360) | ring cut **2.5 / 2.5 px** (clipped 1.75, free 4.25) | same |
| route 1 · long run, vertical (568 against 560) | ring cut **2.5 / 2.5 px** | same |
| route 2 · collapsed layer (fits: 419.66 against 1440) | **81/81** frames with a scroll container (`.dock-run`, auto/hidden), **81** with range, max **318 px** | 59/59, 59, 318 px |
| route 3 · `aria-current` (434.88 against 1440) | **266/266** container frames, **0** with range | 199/199, 0 |
| route 4 · hover scale (376.47 against 1440) | **238/238** container frames, **123** with range (max 2 px); ring cut **1.5 / 1.5 px** (clipped 2.85, free 4.35) | 175/175, 90 (max 2 px); cut 1.5 / 1.5 |

Route 3 arms no range, which matches round 0's refutation. It fails only because the run is statically `overflow-x: auto` (`run.css:163`).

### W3 · the extent morph: continuous, no face outside the plate, lands dead, windowed on its own clock, one owner per property

**Method** (`w3-morph.mjs`):
- A per-rAF strip records the painted extent, the window, the worst face overhang and the ownership census.
- The read runs after the frame, in a task posted from rAF, so the values are the painted ones whatever order the page's callbacks ran in. A read that finds the next frame already begun is dropped.
- The census counts running animations per element·pseudo·property, plus JS inline writes sustained over two or more frames (a MutationObserver).

**Transitions:**
- the first expand after load;
- the warm collapse and the warm expand;
- adding and then removing a label seat on an expanded dock (O-64 R-2);
- a layer swap in each direction.

**Bounds,** with D = |target − start| and the rung from `rung()`:

| check | bound | source |
|---|---|---|
| continuity | every frame's step of the length and of both main-axis edges ≤ 1.5·v̂max·D·dt + 0.5 px | v̂max is the spring's peak normalised velocity, computed from (response, ζ) in `lib.mjs springSpec`: 8.37 /s for the dock preset (0.30 s, ζ 0.88), and 7.70 /s for the fixture's critically damped spring. 1.5 covers frame jitter and a time-normalised curve's 1/x(T); 0.5 px is LayoutUnit rounding. The fixture runs at 0.67 of the bound, i.e. exactly its spring's peak |
| faces | no painting seat more than 0.5 px beyond the painted extent | W-7 |
| landing | overshoot ≤ 0.05 px (dead), or a designed bounce: M = exp(−ζπ/√(1−ζ²)) > the settle band **and** the overshoot within max(1 px, 0.5·M·D) of M·D. 0.05-1 px is the sub-pixel ring | LAW 0, `springPresets.ts:13-18`; O-64 R-3 |
| window | opens for any change ≥ 0.5 px. Lasts ≤ clock + 2·F + the longest frame inside it (one frame from the input to the spring's first frame, one to observe the close, one headless-timer stall; F = max(median dt, 16.7 ms)). Closes between 1 frame before and 2 frames after the extent lands for good | O-64 R-2, R-4; W-8 |
| owners | 0 frames with two running owners | O-64 R-5 |

| transition | Chromium | Playwright WebKit (+shim) |
|---|---|---|
| first expand, D 387.66 | holds, then **one step of 387.66 px at 637 ms** (×9.95 the bound); window **545.6 ms** (allow 265.9, clock 210) | step 387.72 px at 673 ms; window 552 ms |
| warm collapse | faces **158.23 px** out; window **545.3 ms**; travel 245.3 ms | 158.22 px; 552 ms; 244 ms |
| warm expand | faces **147.49 px** out; **sub-pixel ring 0.34 px**, 1 reversal; window **545 ms** | 147.44 px; ring 0.28 px; 545 ms |
| content add, remove | **one step of 179.33 px**, no window | 179.39 px, no window |
| swap long, short | **one step of 244.98 px**, no window | 245.06 px, no window |
| owners | 0 frames in every transition | 0 |

A capture of HEAD mid-collapse (Chromium, scratch `D2/p1/dbg/midcollapse.png`) shows the faces painting outside a plate whose corners are squashed. No ancestor clips them: `.glass-dock` computes `contain: layout style` and `overflow: visible`.

| O-64 row | the harness at HEAD |
|---|---|
| R-1 first-morph endpoint | reproduced: a hold, then a one-frame jump of 387.66 px |
| R-2 content-width change | reproduced: 179.33 px in one frame, 0 window frames. The swap is the same class: 244.98 px |
| R-3 sub-pixel settle ring | reproduced on the warm expand: 0.34 px (Chromium), 0.28 px (WebKit) |
| R-4 window outlasts its rung | reproduced: 545-552 ms against the 210 ms clock (O-64 read 533-553 ms). The `subpx` fault, a ζ 0.88 spring integrated to rest, gives 536-558 ms and a 0.97 px ring by itself |
| R-5 two owners of `.dock-select-trigger::before` opacity | **not reproduced** in the `morph` scene. A census over the first expand found one running owner there, a transition, for 40 frames. It stays reporter-measured (keyframes' ChromeDock). The `owners` fault shows the check can fail (36 frames) |
| R-6 plate resample ring | out of W3's scope; carried to D2 pass 2 by the cursor. The plate runs `gl-dock-cap-inline-start` and `-end` throughout: 310 frames each in the first-expand census, more than any other animation |

### W4 · the state inputs

**Method** (`w4-state.mjs`):
- The compact rung is exercised when `compact()` is true: scroll to 900; hover, keyboard focus and scroll-to-top; then the threshold is located to 1 px from below and scrolled ±4 px around it 12 times.
- Reduced motion is read on the posture morph and on compaction.
- The coarse cells tap a seat of the `fit` dock and the collapsed face of `morph`, and open the `menu` dock's own popover by taps.

**Bounds:**
- **Compacts:** the compact extent is at least 1 px shorter than rest, and `posture()` reads `compact`.
- **Engagement:** hover, focus and top each return the extent to within 0.5 px of rest (the reference gate, `useSearchBarScroll.ts:36-97`).
- **No bounce:** at most 1 posture flip in 24 moves, i.e. a band wider than 8 px (O-55 R-1).
- **Reduced motion:** 0 intermediate frames (canon P6).
- **Hover latch:** 1.5 s after a tap, the seat's scale, transform, translate, box-shadow and background equal their untouched values (F-77, floor row 3).
- **Tap pins:** `pinned` and 0 clicks on any seat (W-11, R4-01-15, floor row 3).
- **Menu holds:** 5.5 s after opening (HEAD's 3.6 s dwell + 1.9 s), the menu is open and the dock is not collapsed.

| cell | reading, both engines unless split |
|---|---|
| compact · compacts, engagement, no bounce, reduced motion | **RED by absence**: GlassDock declares `[fitContent, backdropMode, shape, orientation, collapse, backgroundCanvas]`, and none takes a scroll source |
| reduced motion · posture morph | PASS: 102 → 489.66 px and back with 0 intermediate frames |
| coarse · no hover latch | **FAIL**: `(hover: hover)` false, `:hover` true; the seat stays `scale: 1.1` and tinted 1.5 s later |
| coarse · tap on the collapsed face | **FAIL**: posture `pinned`, but the tapped "Play" seat's click fired (1 click) |
| coarse · menu holds | PASS: menu open and posture `pinned` after 5.5 s (`keep-dock-open`) |

In both engines the coarse context emulates `(hover: hover)` false and `(pointer: coarse)` true, and `:hover` stays latched after a tap. Only a `(hover: hover)` gate on the paint keeps it off: the fixture's gated rules pass and the `latch` fault fails.

### W5 · the progress rim stays inside the plate's silhouette in every rung and orientation

**Method** (`w5-rim.mjs`):
- Two probe shots are taken of the same region: the plate silhouette (magenta) and the rim alone.
- A rim pixel is outside when it carries ink (≥ 26/255) where the plate's coverage is under 0.02, i.e. clear of the anti-aliased edge.
- Rungs: horizontal and vertical, each expanded and collapsed, plus compact.

**Bound:** 0 outside pixels, and the rim paints something.

| cell | reading |
|---|---|
| all five rungs | **RED by absence**: the dock has no rim of its own (`rim()` is `null`) |
| for the record: the consumer-composed `ScrollProgressRim` overlay (`position: absolute; inset: 0` in `#persistent-end`) | horizontal expanded: 142 / 138 device px outside, 4.3 / 4.24 px deep. Horizontal collapsed: 71 / 71 px. Vertical expanded: 210 / 208 px, 5.83 px deep. Vertical collapsed: 99 / 93 px |

## 6 · Can pass, can fail (`selftest.mjs`, both engines)

| witness | fixture `pass` | planted faults (each exit 1, named check failing in both engines) |
|---|---|---|
| W1 | 32/32. Worst 0.107 px (Chromium), 0.072 px (WebKit) | `lens` (plate `border-radius: 50%`): 29.03 / 29.06 px. `squash` (the morph rides `scale`): 6.28 / 6.27 px, collapsed and in frames |
| W2 | 10/10. Every cut 0/0; 0 scroll-container frames on runs that fit | `scroller` (the run always `overflow-x: auto`, no inline padding): container on routes 2-4, range up to 3 / 5 px, cut 1 / 3.5 px. `ringclip` (long run without a cross gutter): cut 4.55 / 6.55 px |
| W3 | 14/14. Step ratio at most 0.67; windows 279-298 ms against a 278.5 ms clock (their allowance, clock + 2F + the longest frame, is at least 312 ms); overshoot 0; faces 0; owners 0 | `jump` (the first expand holds then snaps): ×12.3 the bound. `subpx` (ζ 0.88 to rest): ring 0.97 px, windows 536-558 ms. `late` (window +250 ms): 532-553 ms. `owners` (two WAAPI opacity animations): 36 frames. `overhang` (unclipped faces): 316 px. `content` (content change unmorphed): ×14.5, no window |
| W4 | 16/16. Threshold enter 241, exit 156 (band 85 px), 1 flip | `nohyst`: 24 flips (band 5 px). `latch` (ungated hover): scale 1.1 latched. `menucollapse`: collapsed under the open menu (extent 56 px). `noprm`: 24-37 intermediate frames. `tapthrough`: 1 click |
| W5 | 10/10. 0 pixels outside | `rimout` (rim over the plate, 8 px inset): 172 / 168 device px outside, 4.61 px deep |

## 7 · Promoted from round 0

| round-0 probe | now |
|---|---|
| `p1-fit` (hover sweep, ring clip) | W1 `fit` cells; W2 route 4 and the paint check, now a pixel comparison with and without the clip |
| `p2-rail` | W1 `rail` cells, plus the demo SidebarDock itself (`sidebar` cells) |
| `p3-morph` | W3 first expand and warm pair; W1 morph frames |
| `p4-swap` | W3 swap cells |
| `p5-misc` (group snap, card lerp, rim) | the rim → W5. The group snap lattice (W-5) is floor row 1, not one of the five problems, so it is not a witness; nor is the card lerp (W-2), since W1 reads pill docks |
| `p6-supports` | reference only (platform facts, `PORTFOLIO.md` §2.3) |
| `p7-touch-scroll`, `p8-touch-latch` | W4 coarse cells and the compact rung |
| `p9-anchor` | reference only (a D2-E mechanism probe) |
| `p10-route3` | W2 route 3 |
| `p11-content` | W3 content cells: the same 179.33 px step, reproduced |

The Vite page is now built from any worktree instead of served from `glass-ui/src`. It also adds the `long`, `vmorph`, `menu`, `compact` and `vrim` scenes, a select trigger in `morph` (for O-64 R-5), and a selected seat in `long`.

## 8 · Limits

- **Sampling.**
  - W1's morph cells are screenshot samples (8-28 per transition), not every frame. W3 reads every frame, but through the adapter.
  - A family whose silhouette is not the plate element's own box, such as a pseudo-element or a path on another node, changes `plate()`, or extends `probeMode` in `lib.mjs`.
- **Timing.** Headless rAF intervals are irregular in both engines (frames of 6-9 ms and stalls of 20-38 ms were seen). W3's bounds absorb this through dt-scaled steps, a stall allowance and frame-counted gaps; the fixture passed 14/14 on three consecutive runs. Run the witnesses one at a time (`run.mjs` does), not beside other load.
- **WebKit.** WebKit cells carry `+shim` (§4). Safari is unmeasured.
- **Scene choices.**
  - W4's tap lands on the collapsed face's last seat ("Play"). W-11's reading tapped the persistent Home, whose click also fires at HEAD. Whether a persistent control should act on a collapsed tap is a design question, and this witness does not settle it.
  - W2's routes use four scenes. A family that changes what a "seat" is must keep `seats()` truthful, because both the budget and the scan read it.
