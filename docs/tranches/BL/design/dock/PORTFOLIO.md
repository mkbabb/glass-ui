# D2 · round 0 · the dock geometry and motion portfolio

| field | value |
|---|---|
| seat | D2 round-zero portfolio. Design loop D2 covers the dock's geometry and motion as one design family (O-63 asks that it land as one) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | measured at `9b5aa09c`. The tree moved to `0a2d8bd8` during the run, and that commit changes one line of `FORMATION-PROGRESS.md`. `src/` is byte-identical to `v10.0.1`: `git diff v10.0.1 HEAD -- src` is empty |
| inputs | `CHARTER.md` (the design-loop section). `audit/PROMPT-RECAP-SEED.md` (E-1..E-13, D-1..D-4, N-7, N-8, N-12..N-14). `audit/REGISTRY.md` F-16, F-17, F-18 with its owner witness, F-19, F-68 and F-77, plus F-23 as an interface only. `audit/round-4/R4-01.md` for the O-59 rows. Four consumer letters under `BK/coordination/`: O-55 (`valuejs-outbound-…-dock-scroll-morph-relay.md`), O-56 (`…-owner-docket-relay.md`), O-63 (`…-dock-trigger-clip.md`) and C-2 (`chicago-inbound-…-dock-live-veil-and-hover-lens.md`). A fifth, O-64 (`valuejs-outbound-2026-09-23-kf-w13r-dock-morph.md`, the keyframes.js morph measurement), landed during the run and is folded in as W-13. `docs/design/motion-canon.md`, `docs/design/design-idioms.md` and `IOS27-MICRO/CHARTER.md`. All 43 files of `src/components/dock/` (8,775 lines). `src/components/scroll-progress-rim/`, `src/composables/motion/scroll/useScrollChrome.ts` and `src/styles/scroll-chrome.css`. The reference `~/Programming/words/frontend/src/components/custom/search/composables/useSearchBarScroll.ts` (read-only; "floridify" is the `words` repo) |
| instruments | A scratch Vite harness mounts `src/` through the `@glass` alias (`D2/harness/`, port 5447, cache kept in scratch). It has six scenes: `fit`, `rail`, `morph`, `swap`, `group` and `rim`. Eleven Playwright probes (`D2/p1-fit.mjs` … `D2/p11-content.mjs`) drive headless Chromium 149.0.7827.55, with Playwright imported from `glass-ui/node_modules`. Per-frame rAF loggers read rects, computed style and inline custom properties, and captures land in `D2/cap/`. Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/`. The consumer census is read-only `grep` over `value.js/demo`, `keyframes.js/demo`, `fourier-analysis/web/src` and `chicago/src`. Engine support: `CSS.supports` and behaviour were measured in Chromium 149. Safari is cited from MDN browser-compat-data and WebKit release notes, because this seat ran no Safari cell |
| tools | the charter's frontend design plugin (DesignSync) syncs claude.ai design-system projects and makes no designs, and the owner withholds Fable (2026-09-23), so this seat is Opus and the verdict comes from the codebase, prototypes and critiques |
| deliverable | Six orthogonal families, plus one row not minted. Each family gets its charter; its answer to problems 1-5, or the exact problem it leaves open; a code sketch of the load-bearing mechanism; engine support; a measured cost; consumer impact; known risks; pass-1 questions; and the born-RED witness it must turn green. This document picks no winner |

## 0 · The problem

The dock's geometry and motion form one family: the consumer letter O-63 asks that it land at one cut, together with O-55, O-56 G-1 and F-16..F-19.

1. **The plate's shape.** The corner is a stadium in every rung and in both orientations. `--dock-cap-rest: 50%` resolves per axis and paints a lens (N-12, F-18 owner witness items 1-6, `run.css:449-452,468,504-523,557-598`).
2. **The run and its paint.** `.dock-run` is `overflow-x: auto` (`run.css:163`). It becomes a scroll container, and arms the cut-cap timeline, by four routes: a genuinely long run, a collapsed layer's live scroller (R2-02-06), a hover `inline-size` transition, and a hover `scale(1.1)`. A scroll container clips its cross axis, so rings, outlines and hover shadows are cut beyond a 4 px pad (O-63, N-14). Snap targets are direct children, so grouped seats void the lattice (R3-01-15). F-18 names one invariant: the run scrolls only when its seats genuinely exceed the budget, and the scroll port is not the paint box.
3. **The extent morph** (F-16, O-56 G-1, N-8). The first flip's endpoint is poisoned. A one-axis box scale carries counter-scaled faces that paint outside the glass. A ~300 ms settle tail squashes the corners. The DockCrossfade layer swap is a second, discrete path: it resizes in one frame and double-exposes rows. Fission, the V↔H morph and Siri read RETIRED in code and OPEN in the BK records.
4. **The state inputs.** `useDockState` knows `collapsed | hover | pinned`, driven by hover and focus. O-55 R-1 (N-7) asks for an opt-in, scroll-driven compact rung. It has hysteresis, expands on hover, focus or scroll-to-top, honours PRM, and is fed by a getter or an element, never a selector string. Hover latches on coarse pointers (F-77). O-59 UIA-F-10, -11 and -80 report touch misroutes.
5. **The progress rim** (O-55 R-2). `ScrollProgressRim` sits in the dock's bottom edge, is clipped by the dock's own radius in every rung and both orientations, and is fed by the same scroll source as item 4.

**Interfaces only, out of D2's scope:** the plate veil and ink (O-62, C-2 row 1, F-23), keyboard and ARIA seat resolution beyond what the snap lattice needs (F-19), and file placement (D1). Paths below are today's.

**Standing law every family is held to:**
- E-1: clean breaks, no aliases or shims.
- E-2: no masking fallback; modern CSS on target engines.
- D-1: all motion carries inertia, weight and bounce.
- D-2: every component shows engagement.
- D-4: Chrome and Safari both.
- The motion canon:
  - P1: spatial motion rides a spring.
  - P4: each spring runs on its own clock.
  - P5: animation stays compositor-only; never animate a layout box.
  - P6: PRM drops the transform and keeps the fade.
  - P7: one engine, one clock.

## 1 · Baseline at HEAD (measured here)

### 1.1 The thirteen witnesses

| id | property that must hold | HEAD reading | probe, capture |
|---|---|---|---|
| W-1 | Every plate corner is circular and equals half the cross extent | **Rail** (vertical pill, 64×560, 11 seats, run over by 24 px, a sub-pitch overflow at P = 48): top-left `50%`, i.e. 32 px across by 280 px down; bottom-left `calc(25% + 8px)`. The bottom arm sits mid-interpolation at both reachable rests (scroll 0 and 24; mandatory snap rejects 12). Card `24px`/`17px`; rounded `16px`/`10px`. The owner's lens is reproduced. **Fit dock** after a hover: `50%` / `calc(47.9167% + 0.666667px)` | `p2-rail.mjs`, `cap/rail-10-560.png`, `p1-fit.mjs` |
| W-2 | The pill↔card corner stays between the card radius and half the cross extent through the spring | The lerp in `shell.css:489-495` is `calc(9999px + (24px − 9999px)·t)`. It holds the clamp until t = 0.994 (82.7 px at 312 ms of 345), reads 12.7 px at t = 1.0011, and reads **`0px` at t = 1.0029**. The spring's overshoot drives the calc negative, so the corners are square for the overshoot frames. NEW | `p5-misc.mjs` |
| W-3 | A run whose seats fit has scroll range 0 under hover, focus and press | **Fit dock** (the chicago C-2 composition): across a hover sweep, 101 of 277 frames had `scrollWidth > clientWidth`, by at most 2 px, and the plate corner flipped `9999px ↔ 50%`. An icon hovered at `scale: 1.1` read 378 against 376. The wheel did not move `scrollLeft` here: mandatory snap returned it, so chicago's sliding labels were not reproduced | `p1-fit.mjs` |
| W-3t | A coarse tap leaves no scroll range and no lens | At 430×848 on a coarse pointer, one tap on the trailing icon latches `:hover` and `scale: 1.1`. The run stays 2 px over and the plate corner stays `50%` at +0.3, +1.5 and +5 s. This compounds F-18 route 4 with F-77. NEW | `p8-touch-latch.mjs` |
| W-4 | A selected, focused and hovered seat paints its ring whole | The Photos tab takes `scale: 1.1`. Its outline is 2 px plus a 2 px offset, a 4.4 px reach after the scale, against 3.1 px of port padding. About 1.3 px of ring is cut, top and bottom | `p1-fit.mjs`, `cap/fit-focus-hover.png` |
| W-5 | Every rest after a gesture sits on the pitch lattice when seats are grouped | The run has one snap area: the `radiogroup`, 568 px wide over a 296 px port. The seats compute `scroll-snap-align: none`. Rests fell at 37/60/120/200 px, which is 37/12/24/8 mod 48 | `p5-misc.mjs` |
| W-6 | The first expand after load has a continuous extent | At arm, `--dock-expanded-px` = `--dock-collapsed-px` = 102 px. The width holds 102 px for the whole 547 ms episode, then jumps +284.7 px in one frame at settle, for 2 distinct widths. This is R2-02-01, still live after the W7 pre-measure guard | `p3-morph.mjs`, `cap/morph-pill.json` |
| W-7 | Faces never paint outside the plate | Faces overhang the plate edge by up to 272.7 px on the first expand, 105.5 px on the warm collapse and 105.4 px on the warm expand | `p3-morph.mjs` |
| W-8 | `data-morphing` clears within a frame of the extent landing | 308-309 ms after landing, on both the warm expand and the collapse. Under `scale: 0.294 1` the 28 px corner reads about 8 px across | `p3-morph.mjs` |
| W-9 | A layer swap has a continuous extent and no double exposure beyond a coupled fade | DockLayerGroup with 2 faces: widths {110, 355}, one-frame jumps of ±245 px, and 38 frames with both faces above 5% opacity | `p4-swap.mjs` |
| W-10 | Given a scroll source, the dock compacts past a threshold | The rect is 400×56 at scrollY 0, 1,500 and 2,700: there is no input to compact from (`useDockState.ts:30`) | `p7-touch-scroll.mjs` |
| W-11 | A coarse tap on a collapsed dock pins it, does not activate the control under the finger, and leaves no `:hover` paint | At 390×844, a tap on the persistent Home gives posture `expanded`, not `pinned`. Home's click fires, and Home latches `:hover` plus `scale: 1.1`. A later tap on Play latches the same way. R4-01-15 is reproduced | `p7-touch-scroll.mjs` |
| W-12 | Every rim pixel lies inside the plate silhouette, in every rung and orientation | `ScrollProgressRim`, absolute over a 160×56 pill. Its track ends sit 8 px in and 2 px up. At x = 8 the stadium's bottom edge is at 47.6 px and the track's bottom at 54 px, so the track pokes 6.4 px outside the silhouette at both ends. No dock seat exists for the rim | `p5-misc.mjs`, `cap/rim.png` |
| W-13 | A content-width change on an expanded dock morphs on the dock spring | Adding one label seat to a settled expanded dock moves it 386.67 → 566 px in one frame (+179.33 px), and removing it moves it back in one frame, with 0 `data-morphing` frames: the orchestrator watches only the outer posture (`useDockMorph.ts:89-101`). This reproduces O-64 R-2 (16.79 px on keyframes' scene switch). O-64 also reports that the first expand jumps in one frame on keyframes' served page (R-1, the W-6 class), a `data-morphing` window of 533-553 ms against a 210 ms spring clock (R-4, the W-8 class), and a 0.41 px overshoot ring (R-3); those three are reporter-measured and were not re-run here | `p11-content.mjs` |

### 1.2 Two corrections to the record

- **Route 3 did not reproduce as a separate route.** Route 3 is a hover `inline-size` transition (F-18 owner witness item 4, C-2).
  - Across a 376-frame hover sweep, no seat's `offsetWidth` changed.
  - All 42 overflowing frames had a seat at a non-identity `scale`. None overflowed without one.
  - The `inline-size` transition (`run.css:357,366`) fires only when `aria-current` moves. `DockControl active` stamps `aria-pressed` and `data-active`, so selecting a tab changed no width.
  - So route 3 stands only for routed seats. Pass 1 either reproduces it on `aria-current` seats or folds it into route 4 (`p10-route3.mjs`).
- **Label seats are off the lattice.** "Every OTHER seat is exactly one pitch minus the gap" (`run.css:360-367`) has no declaration behind it. The fit dock's tabs measure 78, 57, 57 and 71 px at P = 48.

### 1.3 The code in play

The dock family is 43 files and 8,775 lines. "Code" counts lines that are not comment-only (an awk estimate).

| file | code / total |
|---|---:|
| `GlassDock.vue` | 545 total |
| `composables/useDockMorph.ts` | 80 / 112 |
| `composables/dockMorphMeasure.ts` | 76 / 142 |
| `composables/useDockSpring.ts` (the band's sole `new SpringProgress`) | 64 / 136 |
| `DockCrossfade.vue` | 157 / 258 |
| `DockLayerGroup.vue` | 284 total |
| `composables/useDockState.ts` | 276 / 454 |
| `composables/useDockRun.ts` | 190 / 332 |
| `styles/run.css` | 168 / 599 |
| `styles/shape.css` | 29 / 166 |
| `styles/layers.css` | 131 / 365 |
| `styles/morph.css` | 99 / 355 |
| `styles/dock.css` | 89 / 259 |
| `styles/crossfade.css` | 76 / 141 |
| `styles/shell.css` (the corner block is `:442-510`) | 527 total |
| `styles/controls/icon-button.css` (hover `scale`, `:112-116`) | 241 total |
| `scroll-progress-rim/*` | 242 total |
| `composables/motion/scroll/useScrollChrome.ts` + `styles/scroll-chrome.css` | 274 + 126 |

Coupling to the tests and the demo:

| where | files |
|---|---:|
| `tests/` files that reference the dock | 29 |
| `tests-visual/` specs that reference the dock | 37 |
| demo files that reference the dock | 23 |
| files across tests, tests-visual and demo that name the morph or cap internals (`dock-run`, `data-morphing`, `--dock-morph-t`, `dock-expanded-px`, `dockMorphMeasure`, `useDockMorph`, `DockCrossfade`) | 21 |

### 1.4 Consumer census (read-only)

| consumer | pin | dock sites | bindings a geometry change touches |
|---|---|---|---|
| value.js | `^7.0.0` | `demo/shell/dock/Dock.vue:159-166` (GlassDock + DockLayerGroup), `scenes/ConfigSliderPane.vue:164` | Stale struck bindings: `:collapse-delay`, `:start-collapsed`, `:always-expanded` and `:show-rail` (F-68). Tokens in its own namespace (`--dock-h`, `--dock-inset`, `--dock-gap`, …). 2 label seats. The one DockLayerGroup consumer |
| keyframes.js | `10.0.1` (F-68 recorded 7.0.0; the pin has moved) | `demo/app/App.vue:423`, `app/dock/ChromeDock.vue:298,419`, `MbabbMenu.vue:315,351`, `transport/TransportDock.vue:31` (`collapse="open" :fit-content`) | Calls `expand()` (`TransportDock.vue:288`), sets `--dock-layer-gap`, and mentions `.dock-layer` grid stacking in comments only. 4 label seats |
| fourier-analysis | `web/` pins `10.0.1` | `layout/AppDock.vue:71` (`:collapse="false"`), `visualization/{Canvas,Editor}ControlsDock.vue`, `AnimationControls.vue:134` | Reads the `expanded` expose (`CanvasControlsDock.vue:35`). Sets `--dock-control-size`, `--dock-scale` and `--dock-control-active-bg`. 5 label seats. Its one `DockCrossfade` mention is a comment (`EditorControlsDock.vue:246`) |
| chicago | `^10.0.1` | `src/TempApp.vue:292` (fit-content, `:collapse="false"`) | Three temporary overrides at `src/style.css:131-140`: `--dock-cap-rest: 9999px`, `.page-dock .dock-run { overflow: visible }`, and a 0.62 veil floor. 2 label seats |

No consumer mounts `DockCrossfade` directly or uses `ScrollProgressRim` or `useScrollChrome`. The four consumers hold 13 label-seat sites (`shape="tab"` or `DockTrigger`) across 9 files.

## 2 · Facts every family inherits

### 2.1 One root under problems 1-3: four roles on too few boxes

`dock.css:1-36` split the plate (L0) from the controls (L1), but four roles still share boxes.

- **The run** is the scroll port, the paint box of every seat, and the scope of the plate's corner: the cut-cap timeline at `run.css:463-524` reads it. So a paint event, a hover transform, changes the plate's shape (W-3, W-3t), and a scroll port clips the seats' rings (W-4).
- **The dock box** is both the layout footprint and the morph carrier: `scale` on `.glass-dock` (`shape.css:103-108`). The plate, the faces and the corners all ride one non-uniform scale. That forces counter-scaled faces (`shape.css:129-138`, W-7) and squashed corners (W-8).
- **The inactive full face** is at once a hidden layer and a live scroller: `absolute; inset: 0` (`layers.css:233-236`) combined with `overflow-x: auto` (R2-02-06).
- **The measurement source** is an out-of-flow box (W-6).

The families below differ first in how they re-assign these four roles.

### 2.2 Problem 1 has closed-form cures that do not depend on the family

Two cures, both measured:

- **Token arithmetic.** cross = seat + 2 × the cross-axis pad. `morph.css:101-155` already pins the cross axis across the morph, so the token is exact for content on the lattice.
- **Container units.** `border-radius: 50cqmin` on a child or `::before` of a size-contained plate measured 28 px on 200×56 and 32 px on 64×560 (`p6-supports.mjs`). The plate is `position: absolute; inset: 0` with no intrinsic content (`dock.css:53-55`), so size containment costs it nothing.

Both interpolate as lengths. There is no 9999 px clamp and no negative overshoot, so W-1 and W-2 turn green once the cap keyframes and the pill↔card lerp start from a finite corner. The choice between the two is a sub-choice. What separates the families is who owns the extent the corner is half of.

### 2.3 Three measured platform facts about the run

- **A native scroll port clips its cross axis.** `overflow-x: auto` with `overflow-y: visible` computes `auto` on the cross axis (`p6-supports.mjs`, per CSS Overflow 3), so a native scroll port cannot leave its cross axis unclipped.
- **A clip is not a scroll container.** `overflow-x: clip; overflow-y: visible` computes `clip/visible`, so the cross axis paints free. `overflow-clip-margin` is not a way out: Safari does not support it (BCD; webkit.org/b/236153), and Chrome applies it only when both axes clip.
- **Inline padding absorbs a transform.** In a scroller with 4 px of inline padding, `scale: 1.1` on the last 44 px child leaves `scrollWidth` at 208 against 208. Without the padding it reads 202 against 200 (`p6-supports.mjs`, Chromium; WebKit's end-padding accounting is a pass-1 cell).

### 2.4 The scroll machinery already in the tree

- **`useScrollChrome`** (274 lines, on `/motion-core`) ramps `--chrome-collapse-t` from direction and range, and snaps at scroll-stop.
  - Its dock consumer is `useDockSearch.ts:277-287`; the demo `StoryPage.vue:76` is the other.
  - Its recipe (`scroll-chrome.css`) shrinks the root with a uniform `transform: scale()` plus `translateY`, over an opacity floor of 0.72.
  - That is a transform on the dock root, which `dock.css:219-233` forbids: the dock stays transform-free so `anchor()` resolves through it. The recipe shrinks the dock; it does not morph it to a smaller rung.
- **`useSearchBarScroll`**, the reference, puts its hysteresis on an interactive gate. It expands at once on focus, hover, open controls or an open dropdown, and shrinks 150 ms after they all clear. Compaction is a continuous uniform scale from scroll progress, with a 0.35 baseline and a 0.65 opacity floor (`:36-97`). The reference is a gate times a ramp, not a threshold machine.
- **`ScrollProgressRim`** is a standalone absolute overlay. Its track is inset 8 px along and 2 px up (`styles.css:30-58`), and it knows nothing of its host's corner (W-12).

### 2.5 The common floor (not a differentiator)

Every family lands these rows. They are listed once and left out of each family's cost.

1. **Seats are declared, never inferred.** DockControl and DockTrigger stamp `[data-dock-seat]`. The lattice, snap alignment (where a family scrolls), roving and reach read seats at any depth, never `run.children` (the F-19 interface; W-5).
2. **One scroll-source contract** (O-55 R-1): `MaybeRefOrGetter<HTMLElement | Window | null>`, never a selector string. The same source feeds problems 4 and 5.
3. **Modality-typed posture inputs** (F-77, R4-01-15):
   - The hover posture comes only from a fine pointer under `(hover: hover)`.
   - A coarse press pins.
   - A focus that follows a pointer press is not keyboard focus.
   - Every paint-bearing `:hover` rung in the dock sits under `@media (hover: hover)` (W-11, W-3t).
4. **PRM, per canon P6:** spatial legs seat at their endpoint; fades keep.
5. **The ruling on the retired facilities.** Fission, the V↔H morph and Siri read retired in code and open in records. Each family states what it implies, and the loser is struck everywhere (F-16 wave shape).
6. **The veil and ink interface** (O-62, F-23). Exactly one element composes `@apply glass-plate`, carries the dock's one `backdrop-filter`, and inherits `--glass-backdrop-luma`. Each family names that element.
7. **Consumer overrides retire with the cure.** Chicago's three go by E-6 addendum, and the rest travel in the landing packets (F-68, W-LANDING).

## 3 · Axes, and where each family sits

| axis | D2-A total lattice | D2-B measured scene | D2-C physical dock | D2-D drawn silhouette | D2-E anchored projection | D2-F discrete rungs |
|---|---|---|---|---|---|---|
| where the geometry lives | CSS: pitch arithmetic and tokens; the script measures nothing | script: one measured model | script: one spring integrator | one parametric path (`shape()` / SVG) | the platform's anchor solver | static CSS per rung |
| what the plate is relative to the run | a clip aperture around plate and faces | a sibling layer with a px clip from the model | a sibling layer with a clip from the body's extent | a vector silhouette that clips a sibling layer | an anchored layer outside the port | the dock box itself |
| how overflow is expressed | native scroll inside a closed-form paint gutter | native scroll only while the model says seats exceed the budget | a transform track with its own physics; no scroller anywhere | native scroll; the cap is a path parameter | native scroll that paints nothing past seat boxes | never scrolls: an overflow rung folds seats into a More seat |
| what carries the morph | `clip-path: inset(%) round` on one scalar | FLIP with endpoints measured in flow, on one spring | one spring vector, with a velocity squish | path parameters on one spring | anchor change plus a transition (or a JS spring) | View Transitions |
| what owns the state | a CSS scroll timeline plus an asymmetric gate transition | a composable with gate and threshold hysteresis | a bistable spring target with a dead band | B's composable (a shared sub-choice) | B's composable (a shared sub-choice) | an explicit statechart with typed inputs |
| the rim | a scroll-timeline fill inside the aperture clip | a clip from the model's straight edge | a spring-followed fill in the body's loop | a stroke along the silhouette | a child of the anchored plate | a seat, static in its rungs |

Where two families share a cell (D2-D and D2-E borrow D2-B's state composable; D2-A and D2-D share the paint gutter), the shared cell is a sub-choice, and the family's center lies elsewhere. Pass 1 may cross-pollinate only after each family is developed on its own (charter, portfolio management).

## 4 · The families

### D2-A · The total lattice (closed-form CSS)

**Charter.** Every length the dock paints is arithmetic on three things: the seat count, the pitch P, and tokens. The stylesheet solves it.
- The script measures nothing. It writes at most one spring scalar per axis of change: `--dock-t` for extent, `--dock-c` for compaction.
- The lattice (`run.css:21-28`) becomes total. Every seat in a morphing face is k·P − gap wide by declaration: an icon seat has k = 1, the open seat has m, and a label seat declares its own k. So every extent a morph needs has a closed form.

**Center:** arithmetic. **Optimizes:** no endpoint can be poisoned because none is measured; compositor-only motion; and compaction plus the rim fill cost zero JavaScript per frame.

| problem | answer |
|---|---|
| 1 | **Corner.** `--dock-corner: calc(var(--dock-cross) / 2)` per orientation; the cross extent is a token, pinned invariant by `morph.css:101-155`. The cap keyframes run `--dock-corner → --radius-card`, and the card lerp starts from `--dock-corner` (W-1, W-2). The arm ranges become `0 min(P, 50%)` and `max(100% − P, 50%) 100%`, so a sub-pitch overflow reaches both ends |
| 2 | **Run.** The run stays a native snap scroller, fenced by a closed-form paint gutter on both axes: `--dock-paint-reach` is the max over ring reach × hover scale, the lift growth (s − 1)·seat/2, and the hover shadow's reach. It is laid as padding with an equal negative margin (`run.css:250-252`, generalised to the inline axis, with scroll padding compensating). §2.3 shows an inline gutter absorbs the lift. Inactive faces are `overflow: clip`, so they are never scrollers, and the timeline is named only on the active run. That closes routes 2-4 by arithmetic (W-3, W-3t, W-4); route 1 is the one that remains. Snap takes floor row 1 (W-5). **Open:** route 4 stays closed only while the gutter ≥ the real paint reach. A consumer control with a larger shadow reopens it silently |
| 3 | **Morph.** Both outer faces stay in flow in one grid cell: the inactive face is `visibility: hidden`, never `position: absolute`. So the box's own width is the expanded footprint, with no measurement. One `.dock-aperture` wraps plate and faces: `clip-path: inset(0 calc((1 − t)·(50% − E_c/2)) round corner)`. E_c = (1 + n_p)·P − gap + 2·pad, where n_p is a `:has()` count rung over `.dock-persistent`. Faces cannot leave the aperture (W-7). Nothing scales, so nothing squashes (W-8), and at t = 1 the clip is `none`, so hover overhang returns at rest. `data-morphing` clears when \|t − 1\| < ε and \|v\| < ε. **Layer swap:** faces stack in flow, so the box is the widest face, and the aperture runs to E_active = (n_active + m − 1)·P − gap on the same spring (W-9). **Open (1):** a seat with an undeclared k has no closed form. A refuses the composition with a dev warning plus a born-RED; it does not measure. **Open (2):** the layout box keeps the expanded footprint while collapsed. `[data-reserve]` passes pointer events through, but an in-flow dock still leaves the gap in layout. **Open (3):** a content change on an expanded dock (W-13) changes the reserved box in one frame. The closed form covers posture morphs only, because the old extent is gone once layout has changed |
| 4 | **Compaction** is a scroll-driven animation of `--dock-c-scroll` on a named page timeline. A 40-line binder stamps `scroll-timeline: --dock-page-<id> block` on the element the getter returns and `timeline-scope` on `:root`. **The gate:** `--dock-c-gate` transitions to 0 at once on engagement and back to 1 after a 150 ms `transition-delay`: the reference's hysteresis, written as an asymmetric delay. Engagement is `:focus-within`, `(hover: hover) :hover`, or `[data-held]`. **The rung:** `--dock-c = scroll × gate` drives the same aperture, `t_eff = min(t, 1 − c)`, so compact is the collapsed aperture reached by scroll. **PRM:** `steps(1)` on the compaction. **Open:** compaction mapped to position has no memory. A reader who parks inside the ramp's range rests half-compact. True threshold hysteresis is not expressible across engines: scroll-triggered animations and `scroll-state()` queries are both supported in Chromium 149 (measured) and absent from Safari (BCD) |
| 5 | **Rim.** The rim is a child of the aperture, so the aperture's `round` clips it in every rung and orientation. Its fill is `animation-timeline: --dock-page`. The track is inset by the corner, not a fixed 8 px, so it runs exactly the straight edge (W-12) |

```css
/* D2-A · load-bearing: an aperture with a closed form (tokens, percentages, one scalar) */
.glass-dock          { --dock-cross: calc(var(--dock-seat) + 2 * var(--dock-padding-block)); }
.glass-dock.vertical { --dock-cross: calc(var(--dock-seat) + 2 * var(--dock-padding-inline)); }
.glass-dock          { --dock-corner: calc(var(--dock-cross) / 2);
                       --dock-extent-c: calc((1 + var(--n-persist, 0)) * var(--dock-pitch)
                                             - var(--dock-run-gap) + 2 * var(--dock-pad-collapsed)); }
.glass-dock:has(.dock-persistent > :nth-child(1)) { --n-persist: 1; }   /* a bounded count rung */
.glass-dock:has(.dock-persistent > :nth-child(2)) { --n-persist: 2; }
.dock-aperture {                                   /* plate + faces; the box reserves max(face) in flow */
  --t: min(var(--dock-t), calc(1 - var(--dock-c)));
  clip-path: inset(0 calc((1 - var(--t)) * (50% - var(--dock-extent-c) / 2)) round var(--dock-corner));
}
.glass-dock:not([data-morphing], [data-compact]) .dock-aperture { clip-path: none; }
.glass-dock { --dock-c: calc(var(--dock-c-scroll) * var(--dock-c-gate)); --dock-c-gate: 1;
              transition: --dock-c-gate var(--spring-dock-duration) var(--spring-dock) 150ms; }
.glass-dock:is(:focus-within, [data-held]) { --dock-c-gate: 0; transition-delay: 0s; }
.glass-dock[data-compact-on-scroll] { animation: gl-dock-compact linear both;
  animation-timeline: var(--dock-page-name); animation-range: var(--dock-compact-range); }
```

**Engines.**
- **Long supported, both engines:** tokens, `clip-path: inset() round` (Chrome 37, Safari 10.1; BCD), `@property` and `:has()`.
- **Scroll-driven animations:** `animation-timeline` (Chrome 115, Safari 26) and `timeline-scope` (Chrome 116, Safari 26), per BCD. Safari 26.4 threads them (WebKit).
- **Measured in Chromium only:** `animation-range` with `calc(min())` (`CSS.supports` true in Chromium 149) and the `50cqmin` sub-choice.
- **Cited:** the asymmetric registered-property transition. Nothing was measured in Safari.

**Cost at HEAD.**
- **Deletes:** `dockMorphMeasure.ts` (142 lines); DockCrossfade's `measurePeak` and its reserve (`DockCrossfade.vue:78-108`, 31 lines); the box scale and counter-scale (`shape.css:89-138`); and the size blend and reserve (`layers.css:49-121`).
- **Modifies:** `run.css`, `layers.css`, `morph.css`, `dock.css`, `crossfade.css`, `shell.css:442-510`, `GlassDock.vue` (aperture wrapper, rim seat, props), `DockCrossfade.vue`, `DockControl.vue` (`pitches`), `useDockState.ts` (the engagement attribute) and `scroll-progress-rim/styles.css`.
- **Adds:** a binder of about 40 lines. About 14 files in all, roughly −250 / +300 lines (estimate).
- **Public API:**
  - GlassDock gains `scrollSource`, `compactOnScroll` and a `#rim` seat.
  - DockControl gains `pitches`.
  - `--dock-cap-rest` becomes `--dock-corner`, with no alias.

**Consumer impact.**
- Chicago deletes its three overrides.
- Every label seat inside a morphing face declares `pitches`, which changes the paint of its label. Candidates:
  - keyframes: `TransportDock` (`collapse="open"`) and `ChromeDock`.
  - fourier: `AnimationControls` and `CanvasControlsDock`.
  - value.js: `Dock`.
- Always-expanded fit docks (chicago, fourier `AppDock`) are unchanged.

**Implied ruling.** A V↔H morph flips the layout topology and has no closed form, so it stays struck. Fission is struck. Siri is struck.

**Interfaces.**
- Veil and ink stay on `.dock-plate`, with the skin on `::before` when the plate takes the `cqmin` sub-choice.
- Keyboard: floor row 1.

**Known risks.**
1. Quantizing labels changes paint on consumer tabs and extends the 92 px label budget (`run.css:387-416`) to every morphing label seat.
2. `:has()` count rungs are a finite table in CSS. Their bound is a second fact beside the lattice (P-3).
3. The expanded footprint is always reserved.
4. The binder writes a timeline name onto a consumer-owned element. Two docks sharing one scroller need distinct names.
5. The dock can rest half-compact.
6. The gutter token must dominate every seat's paint reach, and nothing enforces that.

**Pass-1 research questions.** See §6.

---

### D2-B · The measured scene (one script-owned model, FLIP with honest endpoints)

**Charter.** One composable, `useDockScene`, owns a measured model of the dock. It holds every rung's plate rect, every face's intrinsic extent, the sum of the seats' extents and the port's budget, and it is the only writer of geometry. CSS renders its numbers.
- Every morph is FLIP whose endpoints are already in the model before the state flips.
- Those endpoints come only from boxes that are in flow and untransformed.
- This is the F-16 wave shape ("measure the endpoint from the row's intrinsic extent, never from an out-of-flow layer"), made the architecture.

**Center:** the model. **Optimizes:** arbitrary content (labels, triggers, consumer markup) with no quantization, and the smallest change to the public API.

| problem | answer |
|---|---|
| 1 | Radius = model.cross / 2, written in px (or the `50cqmin` sub-choice). The cap is driven by `--dock-cap-start` and `--dock-cap-end`, which the model derives from scroll position only while the run overflows (W-1, W-2) |
| 2 | **When the run scrolls.** Only when the model says so. `overflowing` is true when the sum of the seats' layout extents plus gaps exceeds the budget. The extents come from ResizeObserver's `borderBoxSize`, which excludes transforms, never from `scrollWidth`. **Otherwise.** A fitting run computes `overflow: visible`: it is not a scroll container, so its cross axis paints free (W-4), and neither a hover transform nor a touch latch can arm anything (W-3, W-3t). An overflowing run gets the ring gutter (`run.css:250`). **Lineage.** This brings back the deleted `useDockOverflowFit` (`run.css:3-19`) in a new form. The old observer asked the platform (`scrollWidth`) and so counted paint; this one sums layout |
| 3 | **Endpoints.** Every face stays in flow in one grid cell, with the inactive face under `visibility: hidden`. So each face's own border box is its intrinsic extent at all times, and the endpoint never comes from an out-of-flow box (W-6). E_collapsed, E_expanded and E_face_i are model entries kept current by ResizeObserver. **Aperture.** The plate is a sibling layer at the reserved maximum footprint. Its aperture is `clip-path: inset(0 R 0 L round r)` in px, from the spring's lerp between the two rects. **Faces.** They sit inside the same aperture wrapper and translate by its center offset, which keeps them anchored (W-7). **Settle.** When the spring's position and velocity are within ε (W-8). DockCrossfade reads the same model and spring (W-9). **Content changes.** A content change on an expanded dock is a ResizeObserver event, so the model retargets the spring from the painted rect to the new extent (W-13) |
| 4 | **`useDockScroll(source, { threshold, band, delay })`** is built on `useScrollTrigger`'s reader: no second listener, and `scrollend` (Safari 26.2) at the stop. **Compact** when scrollY passes T + h after a downward run of at least δ. **Expand** below T − h, at the top, after an upward run of at least δ′, or at once when the engagement gate opens; the gate re-arms 150 ms after it closes. **The rung.** The output is a rung, and the model's third rung (compact) is persistent + summary + rim. `useScrollChrome` retires from the dock (its recipe transforms the root, §2.4) |
| 5 | **Rim.** It runs the model's straight bottom edge, [r, W − r], inside the plate's clip. Its fill is a CSS transition on `--rim-fill` (W-12) |

```ts
// D2-B · load-bearing: endpoints enter the model before a posture flips, from in-flow boxes only
const scene = useDockScene({ root, faces, run, persistent })  // RO on every face; borderBoxSize only
const overflowing = computed(() => scene.seatExtent > scene.budget)        // layout sum, never scrollWidth
watch(posture, (to, from) => {
  const a = scene.painted()            // the rect on screen now (mid-flight safe: the spring's own lerp)
  const b = scene.rungs[to]            // already measured: the face has been in flow since mount
  spring.playTo(0, 1, { inheritVelocityScale: 1, onFrame: (t, v) => scene.write(lerpRect(a, b, t)) })
})
```

```css
.dock-aperture { clip-path: inset(0 var(--ap-r) 0 var(--ap-l) round var(--ap-radius)); }
.dock-faces    { translate: var(--ap-shift) 0; }
.dock-run:not([data-overflowing]) { overflow: visible; }   /* not a scroll container unless the model says so */
```

**Engines.** Every primitive is long supported on both engines: ResizeObserver, `clip-path: inset() round`, `@property` and `scrollend` (Chrome 114, Safari 26.2). Measured in Chromium only.

**Cost at HEAD.**
- **Replaces** `dockMorphMeasure.ts` with `useDockScene` (about 180 lines).
- **Rewires** `useDockMorph.ts` (it keeps the spring), `DockCrossfade.vue` (it reads the scene), the morph halves of `shape.css` and `layers.css` (deleted), the cap in `run.css` (driven from JS) and `GlassDock.vue`.
- **Adds** `useDockScroll`, about 100 lines, replacing the dock's use of `useScrollChrome`.
- **Gives** `ScrollProgressRim` a dock seat.
- About 12 files, roughly −350 / +400 lines (estimate).
- **Public API:** GlassDock gains `scrollSource`, `compactOnScroll` and a `#rim` seat. DockControl does not change.

**Consumer impact.** The least of the six. No label quantization. The `expanded` and `expand()` exposes are unchanged. Chicago's overrides retire, and value.js's repin belongs to F-68.

**Implied ruling.** A V↔H morph can be expressed: the model measures both orientations' rects, lerps the plate rect, and FLIPs the seats. B could revive it. Fission can be expressed as two apertures. Siri stays struck.

**Interfaces.** Veil and ink on `.dock-plate`. Keyboard: floor row 1.

**Known risks.**
1. The W-6 class moves rather than vanishes. ResizeObserver fires after layout, so a content change mid-morph needs a retarget policy.
2. Per-frame px writes to four to six registered properties, against one scalar today. That is a restyle-cost question.
3. The inactive face stays in flow, so the reserve is permanent.
4. The overflow flag needs its own hysteresis at the exact budget, under resize and 1 px rounding.
5. It brings back an observer the lattice deleted (P-1 tension).

**Pass-1 research questions.** See §6.

---

### D2-C · The physical dock (one integrator, a transform track, no scroll container)

**Charter.** The dock is one body.
- **The integrator.** One integrator on one rAF owns every moving quantity: extent e, track offset s, compaction c, and the rim's follower. Each component runs a keyframes `SpringProgress` (canon P7: one engine, one clock). Every paint reads the body's state.
- **The track.** The run never scrolls natively. Its seats ride a translated track with its own momentum, lattice snap and magnetic overpull (IOS27-MICRO hallmark 2).
- **No scroll container** exists anywhere in the dock.

**Center:** the physics integrator. **Optimizes:** D-1 everywhere, interruption with inherited velocity on every transition, and the iOS-27 hallmarks (the squish as the dock grows, bounded overpull).

| problem | answer |
|---|---|
| 1 | Radius = cross / 2, a token. The plate clip is `inset(0 calc(50% − e/2) round r)`. The squish as the dock grows (hallmark 1) is a cross-axis scale of the plate proportional to \|v_e\|, carried on the plate and never the root, which respects the transform-free fence |
| 2 | **The run** is `overflow-x: clip; overflow-y: visible` (§2.3: not a scroller, and its cross axis paints free: W-4). The seats sit on `.dock-track { translate: calc(-1 * var(--dock-s)) 0 }`. **Routes.** With no scroller, routes 2-4 cannot exist (W-3, W-3t). Route 1 means s_max > 0, computed from layout extents. **Gesture.** `touch-action: pan-y` on a horizontal track gives the page its vertical pan. The body owns the horizontal gesture: pointer events, `Draggable`, `decayRest` projection to the nearest lattice rest, and a rubber band past the ends (the `useDragMorph` precedent, motion canon P7). Wheel input feeds the same integrator. **Reach and cap.** Reach (`useDockRun`) writes s instead of `scrollLeft`. The cap is f(s / s_max). **Snap.** Floor row 1; the lattice rests are computed, not native |
| 3 | Collapse, expand, compact and a face swap each retarget the one extent spring to a measured intrinsic extent, inheriting velocity. Faces are anchored by translate and clipped by the aperture. Settling means the body has come to rest (W-6..W-9). A content change on an expanded dock is one more retarget (W-13) |
| 4 | **Hysteresis as physics.** Compaction is a bistable target: c* flips to 1 when scroll passes T + h going down, and to 0 below T − h, at the top, or on engagement. The spring carries c on the dock register, and the dead band is the hysteresis. **PRM:** the targets seat at once |
| 5 | The page progress is smoothed by a follower spring in the same loop, with no second rAF. The rim fill is the follower's value, clipped inside the plate |

```ts
// D2-C · load-bearing: one body, one loop; every transition retargets it
const body = useDockBody({ extent: "dock", track: "dock", compact: "dock", rim: "snappy" }) // springPreset rows
body.target.extent = scene.extentOf(nextFace)          // collapse, compact and swap: the same retarget
track.onRelease(({ x, vx }) => { body.target.track = latticeRest(decayRest(x, vx), P) })  // flick → rest
track.onDrag((x) => body.follow("track", rubber(x, 0, sMax)))                            // bounded overpull
body.onFrame(({ e, s, c, ve }) => write(root, { "--dock-e": `${e}px`, "--dock-s": `${s}px`, "--dock-c": c, "--dock-ve": ve }))
```

```css
.dock-run   { overflow-x: clip; overflow-y: visible; touch-action: pan-y; }  /* measured: clip/visible */
.dock-track { translate: calc(-1 * var(--dock-s)) 0; }
.dock-plate { clip-path: inset(0 calc(50% - var(--dock-e) / 2) round calc(var(--dock-cross) / 2));
              scale: 1 calc(1 + 0.03 * clamp(0, abs(var(--dock-ve)) / 2400, 1)); }
```

**Engines.** Transforms, `clip-path`, pointer events and `@property` on both engines, plus the keyframes.js engine. `overflow-x: clip` with a visible cross axis was measured in Chromium 149; the Safari cell is open. The `abs()` in the sketch needs a pass-1 support check, or the body writes \|v\| itself.

**Cost at HEAD.**
- **Deletes** the native-scroll half of `run.css`: snap, scroll padding, `touch-action`, the scroll timeline and the cap animations (roughly `:153-312` and `:418-599`). Also `dockMorphMeasure.ts` and the scale in `shape.css`.
- **Rewrites** `useDockRun` reach to write s.
- **Adds** `useDockBody` (about 200 lines), a track gesture composing `useDragMorph` (about 150), and a `.dock-track` element in `GlassDock.vue`.
- About 15 files, roughly −500 / +450 lines (estimate).
- **Public API:** GlassDock gains `scrollSource`, `compactOnScroll` and `#rim`. The run is no longer a native scroller.

**Consumer impact.** Chicago's `.page-dock .dock-run { overflow: visible }` would override `overflow-x: clip` and must be deleted. No consumer reads the run's `scrollLeft` (census). keyframes.js tests use a jsdom layout shim (`test/demo/setup/jsdom-layout.ts`), which is untouched here.

**Implied ruling.** The V↔H morph becomes buildable as a two-dimensional extent (e_x, e_y) on the same body. Fission and Siri stay struck.

**Interfaces.** Veil and ink on `.dock-plate`. Keyboard: roving plus reach writing s.

**Known risks.**
1. The dock takes back the gesture. `run.css:30-36` gave it to the platform because `touchmove` cannot be cancelled once native scrolling begins. With no native scroller that argument inverts, but the body must now build momentum, overscroll containment and wheel mapping, which the platform gave for free.
2. Assistive-technology scroll-into-view does not move a transform track. Reach on `focusin` (`useDockRun` `onActivate`) has to carry it.
3. The idle-rAF budget (R3b): the body must park at rest and be the dock's only loop. Today `useDockSpring` mints separate springs for the morph, the crossfade and the run glide.
4. It departs from native scroll physics, which is the feel the lattice chose on purpose.

**Pass-1 research questions.** See §6.

---

### D2-D · The drawn silhouette (the plate is one vector path)

**Charter.** The plate is not a box. It is one parametric silhouette, S(extent, cross, κ_start, κ_end, squash, orientation), drawn once and used four ways:
1. as the backdrop clip, through CSS `clip-path: shape()`;
2. as the hit region, since `clip-path` clips hit testing;
3. as the border stroke, through an inline SVG path;
4. as the rim, a stroked sub-path.

The parameters are registered custom properties, and the corner is an arc of radius cross/2 inside the path.

**Center:** the silhouette as data. **Optimizes:**
- Shapes a box cannot make: an asymmetric cut cap per end, the bulge as the dock grows into a card (hallmark 1), and orientation morphs.
- A rim that follows the rounding instead of being clipped by it: an engagement affordance (D-2).

| problem | answer |
|---|---|
| 1 | The corner is an `arc` of radius cross/2 in the path. There is no `border-radius` and no percentage (W-1). The cut cap is κ ∈ [0, 1] per end, blending the arc toward a flat cut, with the same command list at every κ so the change is continuous. `shape="rounded"` and `"card"` are fixed-radius arcs, and a superellipse is available in the path itself. That also answers `corner-shape` measuring false on real Safari 26.4 (`run.css:458-459`) (W-2) |
| 2 | **The run** is a native scroller inside A's paint gutter (a shared sub-choice). **The cap.** κ_start and κ_end are registered numbers driven by the active run's scroll timeline, `clamp(0, scroll / min(P, range / 2), 1)`, so the sub-pitch overlap cannot arise (W-1). **Hit testing.** The clip-path hit region lets presses in the reserved footprint outside the silhouette reach the page, which retires `[data-reserve]` (`dock.css:200-217`). **Open:** D's center does not address routes 3-4; it borrows A's gutter, so A's risk 6 comes with it |
| 3 | The extent parameter e interpolates on the dock spring. Its endpoints come from in-flow measurement (B's sub-choice) or pitch arithmetic (A's), and the choice is open. The faces sit in an aperture wrapper clipped by the same `shape()` (W-7). No scale is involved (W-8). The squish as the dock grows into a card is a path parameter. W-6, W-9 and W-13 follow the chosen endpoint source: covered under B's, open under A's |
| 4 | B's hysteresis composable (a shared sub-choice) |
| 5 | **The rim is a stroke on the silhouette itself.** The SVG path is offset inward by the rim inset, with `pathLength="1"` and `stroke-dashoffset: calc(1 - var(--progress))`. It starts at the leading end's arc and runs the straight bottom edge; it can also wrap the arcs. It follows the rounding by construction (W-12) |

```css
/* D2-D · load-bearing: one command template for every rung, orientation and cap state */
.dock-plate, .dock-aperture {
  --r: calc(var(--dock-cross) / 2);
  --rs: calc(var(--r) * (1 - var(--dock-kappa-start)) + var(--dock-cut) * var(--dock-kappa-start));
  --re: calc(var(--r) * (1 - var(--dock-kappa-end))   + var(--dock-cut) * var(--dock-kappa-end));
  clip-path: shape(from calc(var(--x0) + var(--rs)) 0,
    hline to calc(var(--x1) - var(--re)),
    arc to var(--x1) var(--re) of var(--re) cw,  vline to calc(100% - var(--re)),
    arc to calc(var(--x1) - var(--re)) 100% of var(--re) cw,  hline to calc(var(--x0) + var(--rs)),
    arc to var(--x0) calc(100% - var(--rs)) of var(--rs) cw,  vline to var(--rs),
    arc to calc(var(--x0) + var(--rs)) 0 of var(--rs) cw,  close);
}
```

```html
<svg class="dock-silhouette" aria-hidden="true">
  <path class="dock-rim" :d="rimPath" pathLength="1" style="stroke-dashoffset: calc(1 - var(--progress))" />
</svg>
```

**Engines.**
- **Cited:** `shape()` is Chrome 135 and Safari 18.4; `path()` is in both engines (BCD).
- **Measured in Chromium 149:** `CSS.supports` for `shape()` is true (a simple shape; the full template with `var()` inside `arc` is a pass-1 cell). The CSS `d` property is supported in Chromium.
- **Not relied on:** Safari's support for `d` is unknown, so D writes `d` from JavaScript.
- **Pass 1:** backdrop output clipped by an animated `shape()` on Safari.

**Cost at HEAD.**
- **Adds** a silhouette module: about 150 lines of TypeScript for the rim path and parameters, and about 80 of CSS.
- **Replaces** the plate's clip and border (`dock.css:53-136`) and the cap animations (`run.css:463-599`).
- **Deletes** the corner block (`shell.css:442-510`).
- **Rewrites** the rim as a stroke, either a path mode for `ScrollProgressRim` or a dock-private rim.
- **Needs** a separate shadow layer.
- About 12 files, roughly −300 / +350 lines (estimate).
- **Public API:** GlassDock gains `scrollSource`, `compactOnScroll` and `#rim`. The `--dock-cap-*` tokens become κ and `--dock-cut`, with no alias.

**Consumer impact.** Chicago's `--dock-cap-rest` override dies with the token. Consumers that tokenise `--dock-control-*` are unaffected; no label quantization.

**Implied ruling.** The V↔H morph becomes a path interpolation: the plate morphs while the seats crossfade. That answers `index.ts:69-73`'s "the platform cannot continuously interpolate a flex-column→row topology" for the plate, though not for the seats. D is the family that revives it most cheaply. Fission is a path with a waist, two lobes, so it can be expressed too. Siri stays struck.

**Interfaces.** Veil and ink on the clipped plate layer. The drop shadow cannot be a `box-shadow`, because the clip cuts it. It cannot be a `filter` on an ancestor either: that is the backdrop-root fence at `morph.css:67-76`. So a sibling shadow layer carries `filter: drop-shadow()` over a silhouette-filled child.

**Known risks.**
1. `shape()` interpolates only between identical command lists. Pill, card, vertical and cut states must share one template.
2. Animated `clip-path` over `backdrop-filter` may run on the main thread in one engine.
3. Stroke parity for the border and rim against `--glass-border-*`.
4. The shadow needs its own layer.
5. The grain `::after` and the grasp carriers (`dock.css:138-178`) must take the same clip. The grasp register already stands the clip down while held (`dock.css:154-159`), and a load-bearing clip conflicts with that.

**Pass-1 research questions.** See §6.

---

### D2-E · The anchored projection (paint lives outside the port)

**Charter.** The run is a bare lattice: layout, hit testing and scroll. It paints glyphs and nothing else.
- **Projections.** Every stateful paint is a projection element in the plate layer, anchor-positioned by CSS anchor positioning to whichever seat holds that state. That covers the hover plate, the selected capsule, the focus ring, the press darken, their shadows and the hover lift.
- **The plate** is anchored to the extent of the active composition.
- **The geometry engine** is the platform's anchor solver.

**Center:** decomposition by paint ownership. **Optimizes:**
- The port clips nothing, because nothing inside it paints outside a seat box.
- Transforms never reach scrollable overflow.
- The selected capsule glides between seats as an eyeglass tab (IOS27-MICRO hallmark 3).

| problem | answer |
|---|---|
| 1 | The plate is a size container with a `50cqmin` skin (sub-choice), and the cap takes the fixed arm ranges (W-1, W-2) |
| 2 | **The port** can stay a native snap scroller. It clips nothing, because no seat paints past its box and no seat transforms. **Routes.** Routes 3 and 4 are gone by construction (W-3, W-3t, W-4), leaving route 1. **Tracking.** A projection outside a scrolled port tracks its anchor to within rounding: Chromium 149 measured `tracks: true` at `scrollLeft` 60, and the port's overflow is unaffected because the projection is not a descendant (`p9-anchor.mjs`). **Scrolled-out seats.** `position-visibility: anchors-visible` hides the projection of a seat that has scrolled out. **Snap.** Floor row 1 |
| 3 | **The plate's extent** is `left: anchor(--dock-lead left); right: anchor(--dock-trail right)`. The lead and trail anchors are the first and last regions holding seats in the active composition, persistent regions included. A change of posture or face moves the anchors, and so does a content change on an expanded dock (W-13), and the plate's anchored insets transition on the dock spring. The faces still jump with layout. **Canon conflict.** That is an inset transition on a leaf box whose geometry feeds no other layout, which conflicts with canon P5; the alternative is a JS spring over rects read from `getBoundingClientRect`, which brings measurement back. **Open:** `clip-path` cannot read `anchor()`, so there is no primitive yet to clip the faces to the anchored plate. W-7 stays RED unless pass 1 finds one, for instance a face wrapper positioned by the same anchors plus an in-flow reserve for the layout box |
| 4 | B's composable (a shared sub-choice). The F-77 guard is structural: the hover projection's anchor is named only inside `@media (hover: hover)` (W-11) |
| 5 | The rim is a child of the plate, so the plate's rounded `overflow: clip` clips it in every rung and orientation. It is inset by the plate's corner (W-12) |

```css
/* D2-E · load-bearing: seats name anchors; projections outside the port paint the state */
.glass-dock { anchor-scope: --dock-hover, --dock-focus, --dock-selected, --dock-lead, --dock-trail; }
@media (hover: hover) { .dock-run [data-dock-seat]:hover { anchor-name: --dock-hover; } }
.dock-run [data-dock-seat]:focus-visible { anchor-name: --dock-focus; outline: none; }
.dock-run [data-dock-seat]:is([data-active], [aria-current]:not([aria-current="false"])) { anchor-name: --dock-selected; }
.dock-run [data-dock-seat] { scale: none; background: none; }  /* the port paints glyphs only */
.dock-projection { position: absolute; pointer-events: none; position-visibility: anchors-visible;
  top: anchor(top); right: anchor(right); bottom: anchor(bottom); left: anchor(left); }
.dock-projection--selected { position-anchor: --dock-selected;
  transition: inset var(--spring-snappy-duration) var(--spring-snappy); }   /* the eyeglass glide */
.dock-projection--hover { position-anchor: --dock-hover; scale: var(--scale-hover-dock); }
.dock-plate { left: anchor(--dock-lead left); right: anchor(--dock-trail right); }
```

**Engines.**
- **Cited (BCD):** `anchor-name` (Chrome 125, Safari 26), `anchor-size()` (Chrome 125, Safari 26) and `anchor-scope` (Chrome 131, Safari 26).
- **Measured in Chromium 149:** anchor positioning and scroll compensation.
- **Pass 1:** `position-visibility` and inset transitions over `anchor()` values, on both engines.

**Cost at HEAD.**
- **Controls lose their own state paint:** `icon-button.css` (241 lines), `tab-button.css` (155), `triggers.css` (166), `controls.css` (101) and `touch-floor.css` (118). Their hover background, active capsule, focus outline and scale go, and the `.glass-capsule` selected seat moves to the projection.
- **Adds** a projection layer: about 60 lines of CSS and 40 of template.
- **Updates** the plate in `dock.css` and `GlassDock.vue`.
- About 14 files, roughly −250 / +250 lines (estimate).
- **Public API:** no prop change for problems 2-3. DockControl's paint now comes from its host dock.

**Consumer impact.**
- Consumer tokens for control state inside docks retarget to projection tokens: value.js `ConsoleRail.vue` (`--dock-control-hover-bg`, `--dock-control-press-bg`) and fourier `AnimationControls.vue` (`--dock-control-active-bg`).
- A consumer's own non-DockControl seat gets projections through `[data-dock-seat]`.

**Implied ruling.** E is neutral. The plate follows whatever layout exists, so a V↔H flip is a layout change the plate follows while the seats crossfade. Fission and Siri stay struck.

**Interfaces.** Veil and ink on the anchored plate. The specular `::before` catch-light on each control (`design-idioms.md` §12) must move to the projection or stay on the glyph box.

**Known risks.**
1. DockControl is a public control that also renders outside a dock. There it needs its own paint path, which risks becoming a dual path (E-1).
2. It needs a P5 amendment for anchored inset transitions, or measurement returns.
3. Multi-select groups need a pool of projections.
4. Anchor churn on a fast hover sweep.
5. Face clipping during the morph stays open (problem 3).

**Pass-1 research questions.** See §6.

---

### D2-F · Discrete rungs, carried by the user agent (statechart, never-scrolling overflow rung, View Transitions)

**Charter.** The dock is a finite set of static layouts: collapsed, compact, expanded and overflowed.
- An explicit statechart over typed inputs chooses among them.
- No rung has in-between geometry that the library computes.
- The user agent carries the motion between rungs, with View Transitions.
- No rung scrolls, because overflow is itself a rung.

**Center:** the rung algebra. **Optimizes:**
- Every visible state is a plain box that can be asserted at rest.
- The largest deletion of the six.
- The retired V↔H morph and fission come back as native user-agent morphs.

| problem | answer |
|---|---|
| 1 | The plate is the dock box itself, one box: `border-radius: calc(var(--dock-cross) / 2)` per rung. Nothing interpolates it in CSS; the transition group animates the box (W-1, W-2) |
| 2 | **No scroller anywhere.** Capacity K = floor((budget + gap)/P) comes from a library-owned outer frame, through one ResizeObserver or an `inline-size` container. **The More seat.** Seats beyond K − 1 fold into a More seat that opens a DropdownMenu of the rest, with the menu family's roving and semantics. **Consequences.** Routes 1-4 cannot occur (W-3, W-3t). The cut cap and its timeline retire, and the More seat becomes the truncation cue. The cross axis paints free (W-4). No snap is needed (W-5 is moot) |
| 3 | **A rung change** is `dockEl.startViewTransition(() => (rung.value = next))`, scoped. **Groups.** The plate and each seat carry `view-transition-name`. The group timing is `--spring-dock` / `--spring-dock-duration`. **No squash.** The old and new plate images take `object-fit: none` inside a group whose `border-radius` animates between the two rungs' corners. **Faces stay anchored:** the user agent FLIPs seat positions (W-7, W-8). **Swaps and first expands.** A layer swap is a rung change of the same kind (W-9). There is no measured endpoint, so the first expand is continuous (W-6). **Open:** a content change the consumer makes outside the chart (W-13) is not a rung change, and a view transition cannot start after the DOM has already changed |
| 4 | **The statechart** has states collapsed, compact, expanded, pinned and held. Its inputs are `hover.fine`, `press.coarse`, `focus.visible`, `scroll.past(T + h)`, `scroll.top`, `scroll.up(δ)`, `layer.open`, `layer.close`, `prm` and `capacity`. **The O-59 and R4-01 rows are table edges.** R4-01-05: a click-away during a morph is an input, not a gated no-op. R4-01-06: a release re-reads `:hover` and `:focus-within` (W-10, W-11) |
| 5 | The rim is a static seat in the compact and expanded rungs, inset from the bottom by the corner. Its fill is a scroll-driven animation that runs on both engines (W-12) |

```ts
// D2-F · load-bearing: one table of rungs; the user agent draws every in-between
const chart = useDockChart({
  collapsed: { "hover.fine": "expanded", "press.coarse": "pinned", "focus.visible": "expanded", "scroll.past": "compact" },
  compact:   { "hover.fine": "expanded", "focus.visible": "expanded", "scroll.top": "expanded", "press.coarse": "pinned" },
  expanded:  { "leave.idle": "collapsed", "scroll.past": "compact", "layer.open": "held", "capacity.over": "overflowed" },
  held:      { "layer.close": (s) => s.matches(":hover, :focus-within") ? "expanded" : "collapsed" },
})
watch(chart.rung, (next) => dockEl.value!.startViewTransition(() => { rung.value = next }))
```

```css
.glass-dock { view-transition-name: dock-plate; border-radius: calc(var(--dock-cross) / 2); }
.dock-run [data-dock-seat] { view-transition-name: match-element; }
::view-transition-group(dock-plate) { animation-timing-function: var(--spring-dock);
  animation-duration: var(--spring-dock-duration); overflow: clip; }
::view-transition-old(dock-plate), ::view-transition-new(dock-plate) { object-fit: none; block-size: 100%; }
```

**Engines.**
- **Element-scoped view transitions:** Chrome 147 (Chrome for Developers), with no support in Safari or Firefox (web-features; BCD lists "limited availability"). `Element.prototype.startViewTransition` is present in Chromium 149 (measured).
- **Document view transitions:** Chrome 111 and Safari 18 (BCD).
- **What that means on Safari:** only the document-level transition exists, and the whole document goes non-interactive for every dock morph, including hover-driven ones.
- **Snapshots flatten the lens.** A view-transition snapshot flattens `backdrop-filter`: the element becomes a stacking context, and `backdrop-filter` is not an animated view-transition property (CSSWG #9358). So the live lens drops for the length of each morph.
- **No velocity carries over an interruption.** A new transition skips the running one.

**Cost at HEAD.**
- **Deletes most of the morph engine:**
  - `useDockMorph.ts` and `dockMorphMeasure.ts`;
  - the morph uses of `useDockSpring`;
  - `shape.css`;
  - the morph halves of `layers.css` and `morph.css`;
  - the overlap machinery of `crossfade.css` and `DockCrossfade.vue`;
  - the scroll, snap and cap sections of `run.css`.

  About 1,500 lines in total (estimate).
- **Adds** the chart (about 150 lines, replacing `useDockState`'s timers and part of `useDockClickIntegrity`), a More seat (about 80) and the view-transition CSS (about 40).
- **Public API:** DockCrossfade becomes a rung switch. GlassDock gains `scrollSource`, `compactOnScroll` and `#rim`. Overflow becomes a More seat, a behaviour change consumers can see.

**Consumer impact.** Long docks show a More seat instead of scrolling: value.js's phone dock and fourier's toolbars. That is a UX change owed to the owner's ruling. The keyframes `expand()` expose maps onto the chart.

**Implied ruling.** The V↔H morph and fission become native user-agent morphs, two layouts under one transition. F revives both at no engine cost in Chrome. Siri stays struck.

**Interfaces.** Veil and ink on `.glass-dock` as the one box. Keyboard: the menu family's roving handles the More seat.

**Known risks.**
1. Safari: scoped transitions are absent, and the document fallback blocks the whole page. This is F's likely BLOCK under D-4 and E-2.
2. The lens flattens during each morph.
3. No interruption continuity (D-1).
4. A More seat hides destinations.
5. The More seat's menu is a second surface for what was one run.

**Pass-1 research questions.** See §6.

---

## 5 · Considered and not minted

**D2-X · A WebGPU or canvas plate** (an SDF stadium with refraction, cut caps and the rim drawn in one shader).

Not minted, because it stalls on a missing primitive:
- A canvas cannot sample the DOM backdrop it sits over.
- Over arbitrary DOM content (chicago's photos, value.js's panes), the live lens needs `backdrop-filter`.
- A canvas plate that refracts only a glass-ui field canvas (`backgroundCanvas`, `GlassDock.vue:118-136`) is a dead primary on every other page (E-2).
- If it composites with CSS `backdrop-filter`, the GPU draws only what CSS already draws.

Re-trigger: a web primitive that exposes an element's backdrop to a shader. None ships across both engines today:
- `backdrop-filter: url()` with an SVG displacement filter is Chromium-only.
- `element()` is Firefox-only.

WebGPU itself ships in Chrome 113 and Safari 26 (WebKit), so the block is the backdrop, not the API.

## 6 · Pass-1 research questions

### D2-A
1. On real Safari 26.4, does `animation-range: 0 min(var(--dock-pitch), 50%)` resolve on a named, scoped timeline? Does a 24 px sub-pitch overflow reach both ends? (Chromium: `CSS.supports` is true; paint is unmeasured.)
2. Does WebKit count a flex scroller's inline-end padding in its scrollable overflow, so the gutter absorbs a `scale: 1.1` edge seat as Chromium does (208/208, §2.3)?
3. Which of the 13 consumer label seats sit in morphing faces? What `pitches` would each need, and what label paint changes?
4. Can `sibling-count()` (Chrome 138; Safari 26.2 per web-features) replace the `:has()` count rungs, or does counting from an ancestor still need `:has()`?
5. A scroll timeline named on a consumer's scroller, with `timeline-scope` on `:root`: does it resolve on both engines for both the root scroller and an inner element? What happens when two docks share one scroller?
6. Does a registered-property transition with an asymmetric delay (the gate) compose with a scroll-driven animation (the ramp) on Safari without main-thread cost per frame?
7. What is the paint reach of every seat state: ring × scale, the selected ring, the hover shadow, press? Does the gutter token fit inside the dock's own block padding?

### D2-B
1. With every face in flow in one grid cell, does ResizeObserver deliver each face's intrinsic extent before the first expand on both engines, fonts-ready included? Does it turn W-6 green?
2. What is the overflow flag's behaviour at the exact budget, under resize and 1 px rounding, and what hysteresis does the flag itself need?
3. What does writing four to six `inherits: false` registered px properties per frame cost in restyle, against HEAD's one scalar, on both engines?
4. For docks with asymmetric persistent regions (`morph.css:217-245`), does center-out or leading-edge growth read right when the faces are anchored by translate?
5. Is the compact rung a measured third composition (persistent + summary + rim) with no extra DOM? Should the hysteresis composable sit on `useScrollTrigger` or on `scrollend`?
6. `useScrollChrome`'s only dock use is `useDockSearch`, and its root transform breaks the fence at `dock.css:219-233`. Does it retire, or stay for non-dock chrome such as `StoryPage.vue:76`?

### D2-C
1. With no native scroller, do `touch-action: pan-y` on a horizontal track (`pan-x` on a vertical one) plus pointer events deliver flick, momentum and overscroll containment on iOS Safari that match the native snap scroller the lattice chose? Compare against HEAD on a phone.
2. Do VoiceOver and TalkBack swipe navigation reach seats that are off the track? Does reach on `focusin` cover them?
3. Can one rAF integrate e, s, c and the rim follower, park at rest within the R3b idle budget, and replace `useDockSpring`'s three instances (morph, crossfade, run glide)?
4. How much cross-axis stretch per unit of velocity reads as hallmark 1, while staying on the plate (the transform-free fence)?
5. How should wheel and trackpad deltas, in both pixel and line modes, map to the integrator? `preventDefault` should apply only when the track can move.
6. Is `overflow-x: clip; overflow-y: visible` a non-scroller on Safari 26.4? Chromium measured `clip/visible`.

### D2-D
1. Can one `shape()` command template express pill, rounded, card, vertical and both cap states with identical structure? Prototype κ and e interpolation on both engines.
2. Is an animated `clip-path: shape()` over a `backdrop-filter` plate composited or main-thread on Safari 26.4 and on Chrome?
3. Do a sibling `drop-shadow` layer and an SVG border stroke match `--shadow-dock` and `--glass-border-*` in paint?
4. Does `clip-path` remove the reserved footprint from hit testing on both engines, retiring `[data-reserve]`?
5. Does a 3 px stroke that bends around a 28 px arc read as progress (D-2), or as a second border?
6. Does the plate's path interpolation make a V↔H morph read well when the seats only crossfade?

### D2-E
1. Does a transition of `anchor()`-valued insets animate on both engines when the anchor changes, and at what cost? Does canon P5 admit a leaf anchored box, or must a JS spring carry it?
2. Is there any primitive that clips the faces to an anchored plate (W-7) without taking them out of flow?
3. Where does a DockControl rendered outside a dock get its state paint, without a second paint path (E-1)?
4. What does anchor-name churn cost across a fast hover sweep? Does `anchor-scope` per dock hold on Safari 26?
5. Multi-select groups (the 12 `aria-pressed` nodes on `/dock/overflow`) need a pool of projections. How is it bounded?
6. How does `position-visibility: anchors-visible` behave on both engines for seats scrolled out of view?

### D2-F
1. Is there a WebKit signal (Safari Technology Preview, a standards position) that makes element-scoped view transitions a 2026 Safari cell? If not, F falls back to document transitions that block the whole page. Is F then BLOCKED under D-4?
2. What does the plate's lens paint during a scoped view transition in Chrome 149 (CSSWG #9358): a live blur, a frozen snapshot, or nothing?
3. What happens on a hover-leave during a running transition: the `skipTransition` jump? Can a view transition be retargeted at all (D-1)?
4. At their real widths, which consumer docks would fold seats into a More seat? Does the owner accept a More seat over a scroller?
5. How large is one statechart that replaces `useDockState`, `useDockClickIntegrity` and the hold counts, with the O-59 and R4-01 rows as edges?
6. Does the compact rung's static rim seat fill by a scroll-driven animation on both engines with no JS?

## 7 · The approach-family registry and the born-RED witnesses

| id | family | mechanism | center | round-0 status |
|---|---|---|---|---|
| D2-A | the total lattice | every extent is pitch arithmetic; one aperture `clip-path: inset(%) round` on one scalar; a closed-form paint gutter; compaction and rim on a page scroll timeline | arithmetic (CSS solves it) | minted |
| D2-B | the measured scene | one model of in-flow intrinsic extents; FLIP with endpoints before the flip; the run scrolls only on the model's say; a hysteresis composable | the measured model | minted |
| D2-C | the physical dock | one integrator for e, s, c and the rim; a transform track with lattice snap and overpull; no scroll container; hysteresis as a bistable target | the physics integrator | minted |
| D2-D | the drawn silhouette | one parametric path as clip, hit region, border and rim stroke; caps as path parameters | the silhouette as data | minted |
| D2-E | the anchored projection | the port paints glyphs only; state paint and the plate are anchor-positioned projections outside it | decomposition by paint ownership | minted |
| D2-F | discrete rungs | a statechart of static rungs; overflow as a More-seat rung; View Transitions carry the in-betweens | the rung algebra | minted (likely BLOCK on D-4, pass 1 question 1) |
| D2-X | WebGPU or canvas plate | an SDF plate drawn in a shader | the GPU substrate | not minted: no cross-engine primitive exposes the DOM backdrop to a shader |

**The shared battery.** Every family must turn W-1..W-13 green (§1.1), or name the witness it leaves RED and why. The open cells stated above are:
- D2-A: half-compact rests (W-10's hysteresis half), undeclared label seats (W-6/W-9 for those faces), and W-13.
- D2-D: W-13 under A's endpoint source.
- D2-E: W-7.
- D2-F: W-13, and whether W-9's user-agent morph holds on Safari.

**Each family's own born-RED witness**, which proves its center rather than the symptoms:

| family | witness | HEAD reading |
|---|---|---|
| D2-A | **No measured geometry.** No read of `offsetWidth`, `offsetHeight`, `getBoundingClientRect`, `scrollWidth` or `scrollHeight` feeds any dock geometry property. A label seat in a morphing face without a declared `pitches` is refused, with a dev warning | RED: `dockMorphMeasure.ts:3-7` (`offsetWidth`/`offsetHeight`), `DockCrossfade.vue:90-97` (`scrollWidth`/`scrollHeight`). Tabs are 78/57/57/71 px at P = 48 |
| D2-B | **The endpoint precedes the flip.** On the first expand after load, the expanded endpoint equals the settled width before the first morph frame. A content change mid-morph retargets without a one-frame jump | RED: 102 px vs 386.7 px, then +284.7 px in one frame (W-6) |
| D2-C | **No scroll container in the dock.** No dock descendant computes `auto`, `scroll` or `hidden` overflow on either axis. A flick on an overflowing track rests on the lattice, and an overpull returns | RED: the full run computes `auto hidden`. The inactive face is a live scroller when collapsed (R2-02-06) |
| D2-D | **One silhouette.** Every rim pixel lies inside the plate at three corner radii. A press in the reserved corner outside the silhouette reaches the page | RED: the rim sits 6.4 px outside at both ends (W-12). Reserved-corner hits are absorbed by the box or by the `[data-reserve]` wrapper |
| D2-E | **The port paints nothing past a seat box.** For every run descendant, the union of its border box, its outline reach and its transform lies inside its seat's layout box | RED: `scale: 1.1` plus a 4 px outline reach, so the ring is cut by 1.3 px (W-4). Scroll range +2 px (W-3) |
| D2-F | **Every rung is static and none scrolls.** No inline geometry is written to dock elements during a morph, and no scroll container exists. More seats than capacity produce a More seat. Guard: a click at +100 ms into a morph reaches its target (green at HEAD; red under a document-level view transition) | RED: the run scrolls. `--dock-morph-t`, `--dock-expanded-px` and `--dock-collapsed-px` are written inline on every morph |

## 8 · Sources

**Engine support**
- MDN browser-compat-data (raw JSON, read 2026-09-23): [`anchor-name`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/anchor-name.json), [`anchor-scope`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/anchor-scope.json), [`timeline-scope`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/timeline-scope.json), [`animation-timeline`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/animation-timeline.json), [`overflow-clip-margin`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/overflow-clip-margin.json), [`<basic-shape>`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/types/basic-shape.json), [`container-type`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/container-type.json), [`<length>` (cq units)](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/types/length.json), [`interpolate-size`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/interpolate-size.json), [`corner-shape`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/corner-shape.json), [`view-transition-name`](https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/view-transition-name.json).
- [MDN: Element.startViewTransition()](https://developer.mozilla.org/en-US/docs/Web/API/Element/startViewTransition), [Chrome for Developers: element-scoped view transitions](https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions), [web-platform-dx developer-signals #496](https://github.com/web-platform-dx/developer-signals/issues/496).
- [CSSWG #9358: animate backdrop-filter for named elements](https://github.com/w3c/csswg-drafts/issues/9358).
- [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) (anchor positioning, scroll-driven animations, WebGPU), [WebKit Features for Safari 26.2](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/) (`scrollend`), [WebKit Features for Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/) (threaded scroll-driven animations).
- [web-features: sibling-count() and sibling-index()](https://web-platform-dx.github.io/web-features-explorer/features/sibling-count/).

**Measured by this seat**
- Chromium 149.0.7827.55: `D2/p6-supports.mjs` (`CSS.supports` battery, `50cqmin` radii, transform overflow with and without an inline gutter, `overflow` coercion) and `D2/p9-anchor.mjs` (anchor scroll compensation).
- Every witness in §1.1 and §1.2.

No Safari cell was run by this seat. D-4 makes each family's Safari cell a pass-1 obligation.
