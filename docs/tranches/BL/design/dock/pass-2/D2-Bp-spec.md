# D2 · pass 2 · D2-B′ spec: the measured scene, one integrator

| field | value |
|---|---|
| seat | D2 pass 2, D2-B′ research + spec. Answers the route's open questions with probes on HEAD + floor and specifies the mechanism the prototype seat builds. Picks no winner (REGISTRY §7.5) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `04929544`; the checkout read `60ed5af7` when the worktree was cut. `git diff --quiet 04929544 60ed5af7 -- src/components/dock src/styles src/composables` holds, so this is the dock `floor.patch` was written against. `floor.patch` (sha256 `de432032…`) applied clean |
| inputs, read in full | `PORTFOLIO.md` §0-2 (and §4 D2-B for lineage); `REGISTRY.md`; `pass-2/H2.md`, `pass-2/FLOOR.md`; `harness/HARNESS.md`; `FORMATION-PROGRESS.md` "Carried obligations", D2 pass 2 lines; pass-1 `D2-B-proto.md`, `D2-B-critique.md`; C's body (`useDockBody.ts` inside `pass-1/D2-C-proto.patch`); the O-64 and O-67 letters. Not read: the other route's pass-2 files (REGISTRY §7.4) |
| instruments | `D2-Bp-probes.mjs` (this directory): nine arms, scene arms on a floor build through `adapter-floor.mjs`, synthetic arms on an inline page. Built with `harness/build.mjs --no-demo` in a scratch worktree (`node_modules` symlinked; caches and outputs in scratch). Playwright imported from the checkout's `node_modules` |
| records (source of record) | `D2-Bp-records/probes.json`: every cell below, with its 1-minute load average |
| engines | Chromium headless; **Playwright WebKit** headless, unshimmed (the floor removed the crash, FLOOR.md row 6). Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| load | 41-55 throughout (other seats ran browsers). Timing arms (`block`, `cost`) ran twice each; no cell below is claimed from a single run |
| fences | Writes in the checkout: this file, `D2-Bp-probes.mjs`, `D2-Bp-records/probes.json`. Git writes: `worktree add` / `worktree remove` only |

---

## 0 · In brief

B′ is B with C's body (REGISTRY M-1). One composable, `useDockScene`, holds a layout-space model of the dock; one body, `useDockBody`, steps every moving quantity on one rAF and parks at rest. Every morph is FLIP: the first rect is what the lanes paint now, the last rect is layout, and lanes carry the difference to zero on the dock rung.

What pass 2 adds to pass-1 B, each answered by a probe below:

1. **Per-cell FLIP.** The run's flex items (cells, read through `display: contents` as `useDockRun.ts:81` `cellsOf` already does) are inverted, not just the regions. Seats at any depth ride their cell. Leaving seats hold their painted offset and fade. Cost at 10-20 moving cells: 0.86-1.29 ms of main thread per frame in Chromium (P-1).
2. **Positions come from layout, never from `getBoundingClientRect`.** Sizes are ResizeObserver border boxes; positions are the layout sums the overflow flag already computes. Ancestor scale and rotate (K-15, C-6) cannot enter the model.
3. **One geometry trigger:** one ResizeObserver over root, regions, faces, run and cells. It replaces the floor's two (`dockMorphMeasure.ts:102`, `useDockRun.ts:374`). Membership rides the MutationObserver `useDockRun.ts:399` already has. An inserted cell is delivered in the same frame, before paint, in both engines (P-3).
4. **One owner per property** (O-64 R-5, K-13). A layout-affecting CSS transition inside the dock is finished at `transitionrun`, and the dock's spring carries the change. 0 intermediate frames painted, both engines (P-4).
5. **Hit follows paint** (Q-7 default a). The structural boxes take `pointer-events: none`. The plate (a box with px insets and a radius) and the region children take `auto` (P-2).
6. **The body resumes from where a stall froze it.** dt reads `performance.now()` and is clamped to 33.3 ms. After a 1.2 s block the largest step is 88-99 px, against 162-211 px for the floor's carrier (P-5).

---

## 1 · What the probes answered

Every number: `D2-Bp-records/probes.json`, both engines unless one is named.

### P-1 · Per-seat FLIP cost (§7.3 B′ item 2, the BANK re-trigger)

`cost` arm on the floor's `morph` scene, expanded. Each frame writes the plate's `inset` and `border-radius`, N cell `translate`s and one face `opacity`, for 620 ms. Cells are cloned DockControls, so the DOM and CSS are real. Rows: Chromium trace (main-thread `RunTask` ms per frame, `UpdateLayoutTree` share) and rAF interval p50/p95; Playwright WebKit rAF interval p50/p95. Two runs each, load 48-52.

| mode | Chromium 1×: main ms/frame (ULT) | Chromium 1×: dt p50/p95 | Chromium 4× CPU: main ms/frame | Chromium 4×: dt p50/p95, frames > 25 ms | Playwright WebKit: dt p50/p95 |
|---|---|---|---|---|---|
| idle | 0.115-0.119 | 8.3-8.4 / 9.8-10.1 | 0.29 | 8.3 / 9.8-10, 0 | 10 / 14-15 |
| floor carrier (scale), whole window | 0.60-0.61 (0.44-0.45) | 8.3 / 9.9-10.1 | 2.34-2.37 | 8.3 / 10.1-16.1, 0 | 10 / 22-23 |
| B′, plate only (N = 0) | 0.40-0.41 (0.15) | 8.3 / 9.9-10 | 1.38-1.52 | 8.3-8.4 / 9.9-10.1, 0 | 10 / 13-26 |
| B′, N = 10 | 0.86-0.93 (0.58-0.63) | 8.2-8.3 / 9.9-10 | 3.55-4.07 | 8.4-8.6 / 16.4-16.9, 0 | 10 / 12 |
| B′, N = 20 | 1.25-1.29 (0.84-0.85) | 8.3-8.4 / 9.9 | 4.76-5.98 | 9.1-16.1 / 18.2-24.7, 1 | 10-11 / 16-17 |
| B′, N = 40 | 1.75-1.76 (1.31-1.32) | 8.3-8.4 / 9.9-10 | 7.08-7.13 | 17.1-17.2 / 26.5-26.9, 4-6 | 10 / 17-19 |

**Reading.** At 1× the re-trigger is not met: 10-20 moving cells cost ≤ 1.3 ms/frame in Chromium, the p95 interval does not move off idle, and Playwright WebKit's p95 at N = 10-40 (12-19 ms) sits inside the spread of its own idle and floor rows (14-26 ms at this load). The plate alone (0.40 ms) is cheaper than the floor's scale carrier (0.60 ms). The cost is style recalc (`UpdateLayoutTree`, about 0.035 ms per cell at 1×), not layout (0.02 ms) and not script (write p95 ≤ 0.1 ms). Under a 4× CPU throttle (Chromium only, an emulated low-end device on a loaded machine), N = 20 keeps the mean under budget (4.8-6.0 ms) but its p95 interval reaches 18.2-24.7 ms, and N = 40 drops to 60 Hz. **Rule the spec takes from this:** write a cell's `translate` only while it moves relative to its region. A posture morph then writes 0 cells (its seats ride the face region), and only content changes and compaction write per cell. Playwright WebKit's style cost is below `performance.now()`'s 1 ms resolution (style+layout p95 1-2 ms at N = 40); it has no trace here. Real Safari: UNMEASURED (owner's safaridriver checkbox).

### P-2 · Hit testing on a box-mode plate (Q-7 default a)

`hit` arm: the plate's `inset` and `border-radius` written as B′ writes them.

| point | reads, both engines |
|---|---|
| plate narrower than the root: inside the arc | the dock (`.dock-layer` / a seat) |
| plate narrower than the root: in the plate's box, outside its arc | `.glass-dock`: **the root box hits where no glass is painted** |
| plate wider than the root (a collapse): 40 px outside the root, on the plate | `plate`: hit follows paint |
| plate wider than the root: outside the arc | the page |
| a seat translated 60 px: at its painted centre / at its vacated slot | the seat / `.dock-layer` (structural) |

The plate's own box plus its radius already gives hit = silhouette in both engines. Only the structural boxes break it. B′ sets them to `pointer-events: none` (§2.8). Pass 1's C-10/CX-6 "the plate absorbs clicks outside the root during a collapse" is the behaviour Q-7 (a) asks for: the glass is painted there.

### P-3 · One ResizeObserver as the geometry trigger (§7.3 B′ item 5, PF-5)

`ro` arm: a stretched 600 px row whose size does not change when a child is inserted.
- **Insertion at the start.** `MutationObserver` observes the new child → rAF → RO `[new]` → next rAF (`mo-add@f37 → raf1@f38 → ro@f38 → raf2@f39`, WebKit `f23 → f24 → f24 → f25`). The RO callback reads layout and writes 6 inverse translates (`s1` `-56px`) before that frame paints. No loop error either engine.
- **Removal.** The removed, observed child reports its size going to zero, and that delivery arrives in the same frame (`ro@f70[new]`). No re-observe is needed.
- **Re-observing an unchanged box delivers nothing** (0 deliveries, both engines). So "re-observe to force a check" is not a mechanism, and B′ does not use it.

So: the RO is the one trigger for "a box changed". The only thing a MutationObserver adds is that it observes cells the RO has not seen yet. `useDockRun.ts:399` already has that observer (for the roving tab stop), and B′ adds its `track()` call to it, not a second observer. The HTML order (resize steps, then rAF, then ResizeObserver, then paint) is what makes the inversion land before paint. Pass-1 CX-7 (B's RO-only build passes every content and swap cell) agrees.

### P-4 · A seat's own size transition (§7.3 B′ item 8: value.js X-11, K-13)

`trun` arm: a seat's `width` transition (0.3 s) inside a flex dock.
- Without a hand-off: 37 (Chromium) / 31 (Playwright WebKit) distinct widths, of which 35 / 29 are intermediate. The RO delivers every frame (209 → 211 → 214 …). That is two owners of the dock's extent (the H2 `owners` K-13 rule).
- With a capture-phase `transitionrun` listener on the dock that calls `finish()` on the matching animation: **2 distinct widths, 0 intermediate**, one RO delivery (208.98 → 288). `transitionrun` fires before any frame paints a moved width: the handler reads 80.98 / 80.48 px, and the rAF log never shows it.

B′ takes a layout-affecting transition or animation inside a cell as the dock's (§2.3). value.js X-11 animates `grid-template-columns`, which is in the set.

### P-5 · A 1.2 s main-thread block mid-expand (§7.3 B′ item 9, recorded, not gated)

`block` arm, two runs; D = 379.7 px. Freeze: 1,201-1,211 ms in every carrier (a main-thread carrier freezes by class, S-17). The rows differ in what happens after the freeze.

| carrier | step across the gap | largest step in the next frames (10-17 ms apart) |
|---|---|---|
| floor (keyframes `SpringProgress.play`) | 23-34 px | **162.5-163.9 (Chromium) / 211.3 (WebKit)**: it jumps to the end |
| B′ body, dt clamp 64 ms, rAF timestamp | 25-38 px | 142-144 / 156-167 |
| B′ body, 33.3 ms, rAF timestamp | 25-35 px | 88-89 / 94-99 |
| B′ body, 33.3 ms, `performance.now()` | 23-35 px | 94-95 / 92-99 |
| B′ body, 16.7 ms, `performance.now()` | 22-35 px | 50-51 / 50-51 |

`rafts` arm: after the block, Chromium hands the first callback a timestamp from before the block (rAF 207 ms against `performance.now()` 1,400.9 ms), and WebKit does not. **B′ takes dt from `performance.now()`, clamped to 33.3 ms (two 60 Hz frames).** After a stall the morph resumes where it froze and moves at most two frames' worth per frame. A 16.7 ms clamp halves that, but it would also run the spring at half speed on any frame slower than 60 Hz, and W3's `trajectory` compares against wall time, so it would fail on a loaded machine. The clamp is a named constant; the recorded value is the one the harness can hold.

### P-6 · Viewport resize (§7.3 B′ item 4, CX-5)

- `fluid` arm: the `fit` dock's rest extent changes by **−6.09 px** from 1440 to 1200 in both engines, because the label seats follow a fluid font (16.4 → 15.8 px; the seats measure 77.59 → 75.63 px and so on). No carrier can make W3 `viewport-resize` read a span ≤ 0.5 px on this scene: the rest itself moves. B′ answers the half of the cell it owns, **0 morph-window frames** (the dock seats at the new layout), and records the span as a scene fact. The cell will fail `span` for every route. That is recorded here for the agglomeration and not minted as a row (§7.5).
- `resize` arm: the window `resize` event reaches script before the RO delivery of the box it resized, in the same update (`resize@f25 → ro@f26` with the counter ticking in the rAF between them; WebKit `f20 → f21`). So one flag set on `resize` and read in that RO callback tells a viewport-caused change from a content change, with no timer.

### P-7 · Translated cells inside a genuine scroller (Q-2 default a)

`scroller` arm: a cell translated +100 px past the end grows `scrollWidth` 560 → 656 in both engines. A cell translated before the start does not change it. `scrollLeft` does not move by itself (252 → 252), but a user who scrolls into the transient range (to 348) is clamped back 96 px when the translate clears. Recorded as risk R-5. Overflow at shipped widths is rare (S-35), so the spec does not add machinery for it.

### P-8 · Positions without `getBoundingClientRect`

Not a browser arm. It follows from P-3 and the floor. The run's flex items and the root's regions sit on one main-axis line: position = padding + Σ(sizes + margins + gaps). The sizes are the same ResizeObserver entries the overflow flag sums (`useDockRun.ts:331-348`). The root's own layout position is `offsetLeft` / `offsetTop` (transform-free, integer; see risk R-6). So ancestor transforms (value.js scales the wrapper to 1.03 and lands the band with a rotate, K-15) never enter the model. Pass-1 B divided out a scale and did not handle a rotate (C-6).

---

## 2 · The mechanism

File:line targets are on `60ed5af7` + `floor.patch`.

### 2.1 · Files

| action | target | what |
|---|---|---|
| **new** | `composables/useDockBody.ts` (~200 lines) | the body: one rAF, N scalar lanes, parks at rest. C's pass-1 body (`pass-1/D2-C-proto.patch`, `useDockBody.ts`), with three changes: dt from `performance.now()` clamped to 33.3 ms (P-5); a lane kind `spatial` (built `respectReducedMotion: true`) or `fade` (`false`, so PRM keeps fades, canon P6); the `cross` seat rule struck (§2.7). It becomes the band's sole `new SpringProgress` site, the role `useDockSpring.ts` holds today |
| **new** | `composables/useDockScene.ts` (~350 lines) | the model, the one ResizeObserver, the triggers, the episode, the per-frame writer, the overflow flag, the `data-morphing` window |
| **delete** | `composables/useDockMorph.ts` (112), `composables/dockMorphMeasure.ts` (121), `composables/useDockSpring.ts` (136) | the scale orchestrator, the endpoint RO, the per-handle `SpringProgress.play` (and with it keyframes' 16.667 ms first-frame dt, S-14) |
| modify | `composables/useDockRun.ts:321-392` | the overflow RO and `judgeOverflow` move into the scene (one observer, P-3). `cellsOf` (`:81`) is exported to the scene. The MutationObserver (`:399`) also calls the scene's `track()` |
| modify | `GlassDock.vue:205-248` | `useDockExpandedSize` (`:214`) and `useDockMorphOrchestrator` (`:235`) are replaced by one `useDockScene({ root, plate, layers, faces, run, persistent, orientation, outerActiveLayer, isCompact })`, and `provideDockBody()` is added. The plate gets a template ref (`:397`). The barrel export `composables/index.ts:37` is struck |
| modify | `DockCrossfade.vue:85-118, 164-242` | `measurePeak`, the monotonic `min-*-size` reserve and the `reserve` prop are struck (a size change is a cell RO). The spring becomes one `fade` lane on the enclosing dock's body (`useDockBody()`; a standalone crossfade mints its own). The crossfade splits in time (§2.11) |
| modify | `composables/useDockClickIntegrity.ts:105-176` | `MORPH_SETTLE_MS` (`constants.ts:73`, 840 ms) and the timer backstop are struck. Its own comment calls the timer "the floor backstop" and `[data-morphing]` "the live primary", which is E-2's pattern. `[data-morphing]` becomes the one window |
| delete (CSS) | `shape.css:95-130` | the `--dock-size-scale` box scale and the counter-scale on the regions |
| delete (CSS) | `layers.css:99-128` | `--dock-live`, `--dock-size-scale` and the held `inline-size: var(--dock-expanded-px)` |
| delete (CSS) | `layers.css:180-182`, `:281-354` | the leaving opacity from `--dock-morph-t`, and the ordinal stagger table (`--dock-stagger-onset` × nth-child). Coverage replaces both (§2.6) |
| delete (CSS) | `morph.css:58-65`, `:125-127` | `--dock-expand-t` derived from `--dock-morph-t`. The class endpoints (`:47-54`) stay as the rest values |
| delete (CSS) | `crossfade.css:74-80`, `:131-144` | the `--dock-t` face opacities and the `--dock-morph-t` face clip |
| delete (CSS) | `dock.css:85-92`, `:261-271` | the plate's `clip-path` aperture on `--dock-t` and its PRM twin |
| delete (CSS) | `index.css:108-126` | `@property --dock-morph-t` and `--dock-t` |
| delete (CSS) | `shell.css:405-409` | the vertical `[data-morphing]` transition-property override (it existed for `scale`) |
| move (CSS) | `shell.css:249-251`, `morph.css:97`, `:202-206` | the root's `box-shadow` (rims + `--shadow-dock`, collapsed and hover) moves to `.dock-plate`, so elevation follows the silhouette and not the layout box (§2.9). Plain per-mode arms, no `light-dark()` around inset fragments |
| modify (CSS) | `dock.css:53-70`, `:199-229` | pointer-events (§2.8). The `[data-reserve] > .glass-dock` re-enable (`:225-228`) is struck: the root is `none` |
| modify (CSS) | `scroll-rungs.css:15-24` | the compact rung's `display: none` applies at rest only. While a compaction episode is open, leaving seats are held (§2.12) |

Net estimate: about −650 / +600 source lines. The deletions are counted, the additions estimated.

### 2.2 · The model

`useDockScene` keeps, in the root's local px (main axis `m`, cross axis `c`):
- the **root**: its border box (RO) and its layout position (`offsetLeft`/`offsetTop`, read once per check);
- the **regions**: leading `.dock-persistent`, `.dock-layers`, trailing `.dock-persistent`. Their sizes come from the RO; their main-axis positions are the root's padding plus the sum of the preceding regions and the root's gap;
- the **faces**: full (the run) and summary. Each is laid out at its own extent at all times (floor row 5: active in flow, inactive absolute at `max-content`, `layers.css:248-261`), so both endpoints exist before the first flip;
- the **cells**: `cellsOf(run)` in order, each with its RO border box and margins. The main-axis offset inside the run is `padding + Σ_{j<i}(size_j + margins_j + gap)`. The same sum is the overflow flag's demand;
- the **painted state**: each lane's current value. First is never re-read from the DOM.

A zero read is "no layout" (floor F-5): the model records rest at the next real delivery and opens no episode (CX-4). The budget is the run's own used size (floor `useDockRun.ts:309-331`), so a consumer width on the root is honoured by construction (CX-3). `budgetOf` in `dockMorphMeasure.ts:41` goes with its file.

### 2.3 · Triggers

| fact | trigger | when it runs |
|---|---|---|
| a box changed size (content, seat size, text, face swap, hidden → shown) | the one ResizeObserver (root, regions, faces, run, every cell) | after layout, before paint (P-3) |
| a cell joined | `useDockRun`'s existing MutationObserver calls `track()`, which observes it. The RO's first delivery for it is the trigger | the same frame (P-3) |
| a cell left | the RO's delivery for the removed cell (size → 0) | the same frame (P-3) |
| a posture changed (collapsed, compact, hover, pinned) | `watch(state, …, { flush: "pre" })`: opens the episode and marks leaving seats before Vue patches the classes | before the patch |
| a layout-affecting transition or animation inside a cell | capture-phase `transitionrun` / `animationstart` on the root. If the property is in the size set (`width`, `height`, `inline-size`, `block-size`, `min-*`, `max-*`, `padding*`, `margin*`, `gap`, `flex-basis`, `grid-template-*`, `font-size`, `letter-spacing`), call `finish()`, then `console.error` once per element in dev. The RO carries the change | before the first moved frame paints (P-4) |
| the viewport resized | `resize` on `window` sets `viewportChanged`; that frame's RO delivery seats at layout (no episode) and clears the flag | the same update (P-6) |

There is no second geometry observer and no timer.

### 2.4 · The episode

On a trigger, `check()` reads the new layout (Last) and computes, for each moving quantity, `offset = painted(First) − layout(Last)` in root-local px, correcting for the root's own layout shift. The quantities:
- plate leading edge `pL`, plate trailing edge `pR` (the cross axis is fixed by floor row 1: one pad on every side), and plate radius `ρ`;
- each region's translate;
- each cell's translate relative to its region. It is written only while non-zero (P-1's rule);
- the fade lanes: the posture crossfade `f` and each leaving seat's opacity.

Each quantity is a body lane. **Retarget:** `lane.reset(currentOffset, currentVelocity)` re-expressed against the new Last, then `lane.to(0)`. Every lane keeps its own position and velocity (canon P7). There is no travel-ratio approximation for one shared scalar, which pass-1 B needed. The window opens when the first lane arms: `data-morphing` is set, and `isTransitioning` becomes true.

A posture flip whose endpoint equals the current paint (reach ≤ 0.5 px) opens no episode.

### 2.5 · The body

```ts
// useDockBody: one rAF steps every lane of one dock; it parks when all are seated.
const MAX_DT_MS = 1000 / 30;                       // P-5: two 60 Hz frames
function step(): void {
  const now = performance.now();                   // P-5: never the rAF timestamp
  const dt = Math.min(MAX_DT_MS, now - last); last = now;
  let live = false;
  for (const lane of lanes) live = lane.step(dt) || live;   // SpringProgress.tickDt
  for (const write of writers) write();            // the scene's one writer
  for (const lane of lanes) lane.flushSeat();      // window close, inline clears
  raf = live ? requestAnimationFrame(step) : 0;
}
```

Lanes are keyframes `SpringProgress` instances stepped by `tickDt`. Their `.play()` is never started (C's body). A lane seats at rest: `|x − target| ≤ eps` **and** `|v| ≤ vEps`. It never seats by clamping or on a crossing (§2.7). Spatial lanes are built `respectReducedMotion: true`, so under PRM a retarget seats in the frame it is made (canon P6: the transform drops). Fade lanes are built `false` and keep their curve under PRM. An idle dock requests no frames from the body. S-31 (the luminance loop's own rAF) is O-62's and is not changed here.

### 2.6 · Per-frame writes (one writer, after every lane has stepped)

| element | property | notes |
|---|---|---|
| `.dock-plate` | `inset` (px, four sides), `border-radius` (px), `--dock-expand-t` | plain properties on a leaf nothing reads (Q-6 (a) default). The radius is the lerp of the two rests' resolved corners: cross/2 for a pill, the card radius for a card, finite at both ends (F-1). `--dock-expand-t` feeds the veil tier and the edge ink (`dock.css:117-147`) on the plate only, not inherited through the root |
| each region | `translate` | FLIP |
| each moving cell | `translate` | only while its offset relative to its region is non-zero |
| each seat of an entering or leaving face | `opacity` = `min(coverage, f)` | **coverage**: a seat is fully opaque when its box is inside the plate's current rect by ≥ 4 px and transparent when any part is outside, ramped linearly between. A seat therefore never paints beyond the glass and is never cut mid-glyph. Content appears as the glass reaches it, which replaces the ordinal stagger (`layers.css:281-354`). Written only when the value changes (typically 1-3 seats a frame) |
| leaving face | `translate` (held at its painted offset), `opacity` on `f` | "P" over "1" (F-9) is cured by time, not space: the leaving face fades on `f ∈ [0, 0.35]` and entering seats start at `f ≥ 0.35`. Both are functions of one lane, so a reversal is symmetric |
| `.glass-dock` | `data-morphing` | the window (§2.7) |

At rest every inline property is removed and the class rest values stand, so nothing inline persists between episodes.

### 2.7 · The landing and the window (Q-4, Q-5)

- **The clamp is struck** (item 6). Pass-1 CX-8 showed it is decoration at ζ 0.88. Lanes land at rest: 0.5 px and a small velocity, and the 0.3 % undesigned overshoot rings below the settle band. Under Q-5's default (a), ζ 0.88, the landing is dead because of the spring, not because of a clamp. Q-5 (b) is a parameter: a posture-only `dampingFraction` passed to the extent lanes. Nothing bounds the plate to two rects (insets may go negative), so a designed bounce is expressible without a new carrier. The prototype records one (b) run for the owner (ζ 0.72 overshoots 1.9 % of D, about 7 px on the 380 px first expand, computed) and ships (a).
- **The window, Q-4 (a):** `data-morphing` clears when every spatial lane of the episode is inside the 2 % band of its own travel. That is the rung's analytic clock (214.2 ms, HARNESS §3), measured from the lanes' real state and not from a timer. The sub-band tail (≤ 2 % of D) keeps painting until the lanes rest at 0.5 px. The window closes from lane state and a timer never closes it, so the pass-1 criticism that the family wrote both the flag and the landing (B-crit §4.1) has a measured answer. The prototype records both times per cell: the flag's (the witness reads it) and the 0.5 px landing (a RECORD column from the rAF log). Q-4 (c), a dock-only clock, is not built: S-14 puts the 0.5 px landing at 245-262 ms on this rung, and the owner rules on the register.

### 2.8 · Hit follows paint (Q-7 a)

```css
.glass-dock, .glass-dock .dock-layers, .glass-dock .dock-layer, .glass-dock .dock-persistent { pointer-events: none; }
.glass-dock > .dock-plate,
.glass-dock :is(.dock-layer, .dock-persistent, .dock-search-field) > * { pointer-events: auto; }
```

The plate is the silhouette (P-2), the seats hit where they paint (P-2), and nothing hits where nothing is painted, at rest or mid-morph: the root's corners outside the stadium included. `mouseenter` / `mouseleave` on the root still fire through its hit descendants. The floor's `.dock-layer:not(.is-active)` / `.is-leaving` `none` rules (`layers.css:147-178`) keep their meaning.

### 2.9 · Elevation

The dock's box-shadow stack moves from the root to the plate (§2.1). Otherwise, as the plate leads the root through a morph, the shadow snaps to the layout box in one frame (pass-1 B moved it for the same reason). The edge stays one translucent arm (floor row 6).

### 2.10 · The run (Q-2 default a)

The overflow flag (`[data-overflowing]`) is the scene's: the demand is the model's cell sum and the budget is the run's content box, the floor's definition, moved and not changed. A fitting run is `overflow: visible` and cannot be armed by paint (W-3, W-3t). On a genuine scroller the paint gutter stands (floor), and cell FLIP may transiently extend the scroll range at the end (P-7, R-5).

### 2.11 · Swaps (W-9, O-64 R-2)

A `DockCrossfade` swap resizes its cell (the active face is in flow at `max-content`, `crossfade.css:48-56`). The cell's RO delivery opens an extent episode, and the crossfade's own `fade` lane on the dock's body splits in time as in §2.6. The monotonic peak reserve (`DockCrossfade.vue:85-108`, a `scrollWidth` read that can only grow) is struck. With it goes the reason a swap to a shorter face never shrank the dock.

### 2.12 · Compaction (item 7)

On `state → compact` (a `flush: "pre"` watch), the scene marks every seat the rung will hide with `data-dock-leaving` and opens the episode. While `[data-morphing]` is set, `scroll-rungs.css` applies `position: absolute` to leaving seats in place of `display: none`. Their containing block is `.dock-layers`, which is `position: relative` at the floor. The scene writes each leaving seat a held `translate` (painted − static) and an opacity on a `fade` lane. Remaining cells FLIP to their new slots (the non-first current seat slides, CX-2), and the plate's insets close on the extent lanes. When the fade lane seats, `data-dock-leaving` clears and `display: none` applies. Nothing scales, so nothing compounds (C CX-1). Expansion from compact runs the same path in reverse: entering seats fade in on coverage.

---

## 3 · §7.3 D2-B′ items: how each is met and which H2 witness shows it

| # | item | how B′ meets it | H2 witness (cells) | plant the prototype runs to show it can fail |
|---|---|---|---|---|
| 1 | per-seat FLIP; leaving seats hold and fade; no double exposure, no collisions | cells FLIP relative to their region (§2.4). Leaving seats and faces hold their painted offset and fade (§2.6, §2.12). The crossfade splits in time (§2.6). Coverage opacity keeps every seat inside the glass | W3 `seatStep`, `seatOverlap` on `lead-add`, `lead-remove`, warm pair, swaps; W4 `compact·non-first-current`; W3 `faces` (pixels) | `bp-nocell` (cells not inverted) → `seatStep` on `lead-*`; `bp-overlap` (no time split) → `seatOverlap` |
| 2 | the BANK re-trigger: a per-seat-FLIP cost trace against 16.7 ms, both engines | P-1: at 1×, 10-20 moving cells cost 0.86-1.29 ms/frame (Chromium) and leave both engines' p95 interval at idle. The moving-cells-only rule bounds the count. The prototype re-runs `cost` on its build, with the real writer | `D2-Bp-probes.mjs --arm cost` on the prototype build; W8 `pacing` | not a witness: a trace. BANK if the prototype's N = 20 row misses 16.7 ms at 1× in either engine |
| 3 | the body merge: one rAF, parks at rest; `useDockSpring` gone; H-3c reversal green | §2.5: `useDockSpring.ts` is deleted, and DockCrossfade takes a lane on the dock's body. Per-lane `(x, v)` survives a retarget | W3 `reversal` (H-3c), `trajectory`, `terminal`; a frame count at idle (0 body frames in 2 s after a morph, C-proto §4 method) | `bp-wall` (reset velocity on retarget) → `reversal`; `bp-norest` (lanes never park) → the idle count |
| 4 | hidden mount, consumer width, resize | a zero read is no layout (§2.2). The budget is the run's own used size (§2.2). `resize` seats (§2.3, P-6) | W3 `hidden-shown`, W2 route 5 (`cwidth`), W3 `viewport-resize` (`windowFrames` = 0; `span` = 6.09 px is the scene's fluid font, P-6) | `bp-resizemorph` (drop the `resize` flag) → `viewport-resize` window |
| 5 | the observer: one trigger, or a witness that fails without the second | one geometry trigger, the RO. The existing MO only enrols cells (P-3) | W3 `lead-add` (fit dock) holds with the RO alone. The stretched-run insertion that only the MO's enrolment catches is P-3's synthetic arm, not an H2 cell. It is recorded as a defect class for the next pass's checklist, not minted into this one (§7.5) | `bp-nomo-track` → P-3's stretched case (probe, not a cell) |
| 6 | the landing: strike the clamp or shape a bounce | clamp struck; Q-5 (a) shipped, (b) one recorded parameter run (§2.7) | W3 `landing` (dead, 0 reversals, no sub-pixel ring: O-64 R-3), `window` | `bp-ring` (ζ 0.6) → `landing`; the (b) run is RECORD |
| 7 | compaction leaves through the closing aperture or fades on the spring; no compounded scale | §2.12: both. Seats fade on a lane while the plate's insets close. No scale anywhere | W4 `compacts`, `seat-scale` (ratio 1), `compact·non-first-current`, `prm·compact`; W8 `sharp` on compact | `bp-pop` (`display: none` at the flip) → `non-first-current` |
| 8 | consumers: M-4/M-8 wide `#collapsed` (Q-10), M-6 right-anchored, fourier AnimationControls width (K-14), value.js ancestor rotate (C-6), value.js X-11 | Q-10 (a): the summary is a seat-row square, and wide content moves to `#persistent` by consumer addendum. The model reads layout, so anchoring is layout's (§2.4). A consumer width is the run's budget. Layout-space positions (P-8) remove ancestor transforms from the model. The X-11 transition is handed off (P-4), and value.js retires it by addendum | W3 `wide·*`, `anchor-end·*`, W2 route 5, W3 `seat-transition` (window + `owners`). C-6 has no H2 scene: the prototype adds a rotated-ancestor probe to `D2-Bp-probes.mjs` (not a cell) | `bp-rect` (read `getBoundingClientRect`) → the rotate probe |
| 9 | the extent under a 1.2 s main-thread block, recorded | P-5: freezes 1.20-1.21 s by class, then resumes with at most two frames' worth per frame (88-99 px against the floor's 162-211 px) | `D2-Bp-probes.mjs --arm block` on the prototype build | RECORD, not gated |

## 4 · "Both", the floor rows and the carried letters

- **Every cell in both engines under H2, with a reviewed adapter (H-6).** B′ keeps the floor's DOM contract: `plate()` is `.dock-plate`, `extent()` its painted rect (no clip-path now, so `paintedRect` is its box), `morphing()` `[data-morphing]`. So the prototype runs `adapter-floor.mjs` unchanged, except `badge()` if O-67's seat is built (below). Unshimmed Playwright WebKit in every cell (floor row 6).
- **Filmstrip gestalt** of the first expand, the warm pair, a swap and a content change, for the critic against D-1 and D-2. The prototype captures them. This spec predicts, for the critic to check: glass leads, content appears as the glass reaches it, nothing teleports, nothing scales, a dead landing under Q-5 (a).
- **`DockProps` against Q-3:** §5.
- **Prose sweep (PF-10)** of every touched file: the scale, aperture, cut-cap and `--dock-morph-t` prose in `GlassDock.vue` (`:105-108`, `:205-213`, `:378-388`, `:430-447`, `:474-480`, `:530-534`), `index.css` `:100-126`, `layers.css`, `morph.css`, `shape.css`, `dock.css` and `crossfade.css`.
- **Real Safari:** every cell once the checkbox is ticked.
- **Floor rows 1-7** are applied unchanged. B′ moves two of the floor's own pieces into the scene (row 5's endpoint RO and the overflow RO) without changing their definitions, and replaces row 5's scale publisher (`--dock-*-px`).
- **O-64:** R-1 floor (endpoints in flow); R-2 content and swap episodes (§2.3, §2.11); R-3 dead landing (§2.7); R-4 the window on the rung's own clock (§2.7); R-5 one owner (§2.3 hand-off; the specular `::before` pair is 0 at the floor on this scene); R-6 is H2's probe and not the carrier's.
- **O-65 (W6):** one plate element in every rung (`samePlate`); the collapsed form is the summary face inside the plate; `form·expand` / `form·collapse` ride §2.4.
- **O-66 §2 (W8):** `sharp` holds by construction (no scale on any seat's chain; the engagement scale stays exempt). 60 fps headed on a real GPU and the three consumer docks stay UNMEASURED here.
- **O-67 (W7), not the carrier's; proposed for both routes:** `gutter`: a `--dock-gutter` token (one seat gap, 8 px) laid as the dock's outer `margin`. It moves every consumer dock 8 px, so it is an owner-visible change and a floor question, not a B′ one. `badge`: a DockControl `#badge` slot rendering `.dock-seat-badge` in the seat's padding corner, outside the glyph box. The H2 `edge` scene composes its dot by hand, so `badge()` stays RED by absence until the scene uses the slot. That is a harness-scene question for the agglomeration.

## 5 · The public surface and Q-3

| surface | floor | B′ | delta |
|---|---|---|---|
| `DockProps` | 7 (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`) | **7** | 0 |
| GlassDock exposes | `expanded`, `isPinned`, `isHeld`, `graspHeld`, `isTransitioning`, `expand`, `collapse`, `keepOpen`, `release` | same | 0 (`isTransitioning` now reads the body's window) |
| `DockCrossfade` props | `active`, `reserve` | `active` | −1 (`reserve` struck, E-1; no consumer mounts DockCrossfade, PORTFOLIO §1.4) |
| `DockControl` | — | `#badge` slot, only if O-67's badge is adopted | +1 slot, not a prop |
| barrel | `useDockMorphOrchestrator` (`composables/index.ts:37`) | struck | no alias |

Under Q-3 option (b), the floor's reading, B′ adds nothing to the six-plus-one count.

## 6 · Owner questions, as this route builds them

| Q | default applied | B′-specific note |
|---|---|---|
| Q-1 cut cap | (a) struck (floor) | the cue gap stands (F-10). If (c) is ruled, it goes on the run, never the plate |
| Q-2 overflow | (a) native snap scroller in a paint gutter | R-5 |
| Q-3 props | (b) | §5: 7 |
| Q-4 clock | (a) built; (c) not | §2.7; both times recorded |
| Q-5 bounce | (a) shipped; (b) one parameter run recorded | §2.7 |
| Q-6 canon P5 | (a): the plate is a leaf whose insets nothing reads | cells and regions move by `translate` only |
| Q-7 hit | (a) | §2.8 |
| Q-8 rim | (a) (floor) | the rim is `inset: 0` inside the plate, so it follows the insets |
| Q-9 retired facilities | (a) struck | the model could express V↔H (REGISTRY §5 Q-9 b); not built |
| Q-10 collapsed face | (a) | — |

## 7 · Risks

1. **R-1 · Style cost on a slow CPU.** At 4× throttle, 20 moving cells reach a p95 of 18.2-24.7 ms (P-1). The moving-cells-only rule keeps posture morphs at 0 cells. A 20-cell lead insertion on a low-end phone is the case that could still miss, and real-device numbers are UNMEASURED.
2. **R-2 · Main-thread carrier.** It freezes for any stall (P-5; S-17). This is the point D2-G competes on. B′ resumes without a leap larger than two frames' worth, and does no better than that.
3. **R-3 · Coverage opacity is per-seat script.** The reveal replaces the CSS stagger with 1-3 opacity writes a frame. A face with many narrow seats would write more; it is bounded by the same rule as R-1.
4. **R-4 · The hand-off finishes a consumer's animation** (P-4). It is loud (a dev `console.error` naming the element and property) and it is the owner rule, but a consumer that relied on its own easing sees the dock's spring instead. value.js X-11 retires by addendum.
5. **R-5 · Cell FLIP on a genuine scroller** can extend the scroll range transiently (P-7). A user who scrolls into it is clamped back up to the translate's size (96 px in the probe) at settle.
6. **R-6 · The root's layout position is an integer** (`offsetLeft` / `offsetTop`). It biases only the first frame of an episode (≤ 1 px at the flip), because every lane lands on layout exactly. Positions inside the dock are sub-pixel (RO sums).
7. **R-7 · Main-axis layout sums assume one line.** They assume no wrap and no reordering by `order` in the run or the root, as the floor's overflow sum already does. A consumer `order` or `flex-wrap` inside the dock breaks the model. The prototype asserts it in dev.
8. **R-8 · The stretched-run insertion** that only the MO's enrolment catches has no H2 cell (item 5). It is recorded for the next pass's checklist.
9. **R-9 · The viewport-resize cell** fails `span` for every route on this scene (P-6). That is a scene fact, reported, not worked around.
10. **R-10 · The unit suites that read `--dock-morph-t` or `--dock-*-px`** (`dockMorphMeasure.test.ts`, the `G-DOCK-MORPH` rows of `g-dock-lattice.test.ts`) are rewritten as invariants over the scene: the endpoint exists before the flip, one RO, border boxes only, no scale. Motion-parity tests need layout stubs (pass-1 B §3).

## 8 · Open for the prototype seat

- The rotated-ancestor probe (item 8, C-6) and a stretched-run insertion probe (item 5), both added to `D2-Bp-probes.mjs`.
- The Q-5 (b) parameter run (RECORD).
- The `cost` arm re-run with the prototype's real writer, both engines, at 1× and 4×.
- Real Safari: every cell, and whether a negative `inset` on a `backdrop-filter` plate keeps the lens in shipping Safari: **UNMEASURED (owner's safaridriver checkbox)**.
