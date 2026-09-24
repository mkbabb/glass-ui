# D2 · pass 1 · D2-E · the anchored projection (research)

| field | value |
|---|---|
| seat | D2 pass 1, research for family D2-E ("paint lives outside the port"). It develops this family alone: it read PORTFOLIO §0-2 and the D2-E section and §6/§7 rows, plus `pass-1/W.md`, `pass-1/X.md` and `harness/HARNESS.md` as background. It read no other family's section |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | named `5804d8cc`. The worktree was cut at `2efb414c` (docs-only commits since; `git diff --quiet v10.0.1 HEAD -- src` held, so `src/` is v10.0.1) |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless (the Playwright 1.61.1 build, **not Safari**). Every WebKit number below is **Playwright WebKit**. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-E-research/`. Platform probes in `probes/` (`q.mjs`, `q3.mjs`, `q4.mjs`, `q6.mjs`, `p5.mjs`, outputs `*.out.json`). Harness runs in `out/` (`run-head.txt`, `run-e.txt`, `w1-e2.txt`, `run-e3.txt`, `run-e4.txt`, JSON under `out/runs/`). The probe's source change is kept as `d2e-probe.patch` (4 files, +174/−20) and the adapter as `adapter-e.mjs` |
| worktree | `git worktree add …/D2-E-research/wt HEAD`, `node_modules` symlinked from the checkout (the checkout has no `tests-visual/node_modules`). Builds went to scratch through `harness/build.mjs`. Removed with `git worktree remove --force` before return. One slip to record: to capture the new file in the saved patch I ran `git add -N` inside the scratch worktree (an index write in that worktree only, gone with it). Nothing in the checkout was touched but this file |

## 0 · Findings in one table

| # | finding | evidence |
|---|---|---|
| 1 | Both engines resolve `anchor()` insets into the transitioned value, so an anchored inset transitions in **every** case that moves the anchor: the anchor-name moving to another element, a changed explicit name, a changed `position-anchor`, and the anchor moving by layout | `q.mjs`: 400 ms linear, 8 → 176 px, read at 200 ms: 92.16 / 86.11 (name moves), 92 / 88.22 (explicit name), 92.25 / 89.05 (`position-anchor`); layout move 16 → 116: 66 / 62.75 (Chromium / Playwright WebKit) |
| 2 | So the plate as an anchored projection of the dock box turns the whole extent family into one CSS transition: the first expand, the warm pair, a content-width change (W-13) and the layer swap all run continuous, land dead, and hold a 207-218 ms window on the 210 ms clock with 0 two-owner frames | harness W3 on the probe: every continuity, landing, window and owner check passes in both engines (§4) |
| 3 | W-7 stays RED, as round 0 predicted. On every growing transition the faces are at their new layout at frame 1 and the plate reaches them only through the spring: 181.83 px (first and warm expand), 77.67 px (content add), 110.48 px (swap long) | harness W3, 8/8 failing cells fail on `faces` only |
| 4 | No primitive clips in-flow faces to an anchored box. `clip-path`, `mask-position`, `translate` and `border-radius` reject `anchor()` / `anchor-size()` in both engines | `q.mjs` `CSS.supports` battery |
| 5 | The strongest per-seat form needs no shared projection pool at all: each seat is its own scoped anchor (`anchor-name` + `anchor-scope: --dock-seat` on the seat) and its own `::after` is the projection. With the seat statically positioned, that pseudo's containing block is outside the run, so the port does not clip it and it adds nothing to the run's scrollable overflow | `q.mjs` F: the projection paints 3 px above the seat box, outside a scroll port's cross axis, and follows a 60 px scroll, both engines. Without the per-seat scope every pseudo binds to the last seat (F3: `left: 400px`) |
| 6 | On the real dock, that form turns W2 fully green (10/10, ring cut 0/0 px, 0 scroll-container frames on fitting runs) and W1 fully green (32/32, with the closed-form stadium) | `run-e4.txt` |
| 7 | The plate must not take the dock as its containing block, and nothing on the dock may form one. A `will-change: transform` on the vertical expanded dock (`shell.css:425`) made the dock the plate's containing block, the anchor went invalid, and the plate fell to a 2×2 px box | `dbg.mjs` (`chain: will-change: transform`); `w1-e2.txt` vmorph cells 38×104.93 and 2.93×2.93 before the fix, 32/32 after |
| 8 | A `position: fixed` plate lags an in-flow dock on page scroll: one frame in Chromium, and in Playwright WebKit the plate **transitions** back over the full spring (100 → 95.75 → 91.75 → 58.5 px at 150 ms → 0). An absolute plate whose containing block shares the dock's scroller holds 0 px in both engines | `q6.mjs` P / P2 |
| 9 | `position-visibility`: the initial value is `anchors-visible` in both engines. Chromium hides the projection of a seat scrolled out of the port; Playwright WebKit paints it, outside the port, on the page beside the dock. A main-axis `overflow-x: clip` on the projections' host closes this in both engines and keeps the cross-axis ring | `q.mjs` F / F2 (seat 7: white in Chromium, `200,0,0` in WebKit); `q6.mjs` K |
| 10 | Hover churn costs main-thread layout, not frames. Over a 240-move sweep of 12 seats (Chromium): HEAD-style seat paint 79 layouts / 5.05 ms; a shared `:hover` anchor-name projection 146 / 8.54 ms; per-seat pseudo projections 307 / 35.17 ms (12 selected: 311 / 36.17 ms). Frame p50 8.3 ms and p95 ≤ 10.1 ms in every mode; Playwright WebKit p95 18-19 ms in every mode | `q4.mjs` (median of 3) |
| 11 | The plate's inset transition is a layout animation (canon P5 in letter): 41-42 layouts / 25-31 ms over a first expand, against HEAD's 65-66 / 3.5-3.8 ms. HEAD pays in style instead (84-94 ms against 18-21 ms), so total main-thread task time drops from 149-164 ms to 95-110 ms | `p5.mjs` (Chromium, 3 runs each) |
| 12 | A CSS transition reversal has no velocity continuity: −0.42 px/ms turns to +0.305 (Chromium) / +0.314 (WebKit) in one frame | `q.mjs` E_retarget |
| 13 | DockControl renders outside docks in value.js (5 workbench files). A hostless seat's `z-index: -1` projection vanishes behind any ancestor background unless the seat is its own stacking context (`isolation: isolate`), which does not re-clip the in-dock projection | `q3.mjs` L1 (`232,232,232`, hidden), L2 (`200,0,0`), F4 (escapes the port with isolation) |

## 1 · The research questions

### Q1 · Do `anchor()`-valued insets transition on both engines when the anchor changes? Does P5 admit a leaf anchored box, or must a JS spring carry it?

**Measured.** `probes/q.mjs` on `q.html`. Five seats of 48 px with 8 px gaps, a projection with `transition: left 400ms linear`, the offset read relative to its dock:

| case | Chromium: before / first frame / 200 ms / end | Playwright WebKit |
|---|---|---|
| A · `anchor-name` moves from seat 0 to seat 3 (the projection's declarations do not change) | 8 / 8 / 92.16 / 176 | 8 / 8 / 86.11 / 176 |
| B · `left: anchor(var(--t) left)`, `--t` changed | 8 / 8 / 92 / 176 | 8 / 8 / 88.22 / 176 |
| C · `position-anchor` changed, implicit `anchor(left)` | 8 / 8 / 92.25 / 176 | 8 / 8.41 / 89.05 / 176 |
| D · same anchor, moved 100 px by a layout change before it | 16 / 16 / 66 / 116 | 16 / 16 / 62.75 / 116 |
| E · retarget at 150 ms of a 176 → 8 run toward 232 | velocity −0.42 → +0.305 px/ms in one frame | −0.42 → +0.314 |
| G · the anchor's scroller scrolls 60 px | projection at 104 for the synchronous read and frame 1, at 44 from frame 2 (no transition) | 44 at the synchronous read (no transition) |

Reading:
- The midpoints sit at 0.50-0.54 of travel at 0.5 of the clock, so these are real interpolations, not late jumps.
- Case D is the one that matters. Any anchor that moves by layout starts a transition. That is how the plate follows a content-width change on an expanded dock (W-13) with no script watching the content. The mechanism is the platform's, not the dock's.
- Case G: scroll displacement is not transitioned in either engine, but Chromium shows the projection one frame late for a scroller between the projection's containing block and its anchor.

**P5.** Canon P5 says "never animate a layout box". An anchored inset transition is exactly that: `p5.mjs` counts 41-42 layout passes and 25-31 ms of layout over one first expand in Chromium. Two honest readings:
1. **Amend P5 for leaf out-of-flow boxes.** The plate is absolutely positioned, has no in-flow children, and its geometry feeds nobody's layout. Relayout of one leaf box per frame measured about 0.6 ms a pass here, and the episode's total task time fell by a third against HEAD (95-110 ms against 149-164 ms), because HEAD re-resolves `--dock-morph-t` style across the subtree every frame. The amendment would read: "a box whose geometry is read by nothing may animate its insets".
2. **A JS spring.** That is the only way to keep velocity across a retarget (row E: CSS reverses into a wall, which D-1 forbids), and it brings measurement back: the spring's endpoints are anchor rects read from `getBoundingClientRect`, which K-15 warns include consumer ancestor transforms.

The family's strongest form takes reading 1 for the plate and states row E as a named weakness (§6 C-4). The W3 bounds do not catch it: the harness reverses no posture mid-flight.

### Q2 · Is there any primitive that clips the faces to an anchored plate (W-7) without taking them out of flow?

**No.** `CSS.supports` in both engines (`q.mjs`):

| declaration | Chromium 149 | Playwright WebKit |
|---|---|---|
| `clip-path: inset(anchor(--a top) 0 0 0)` | false | false |
| `clip-path: inset(0 calc(100% - anchor-size(--a width)) 0 0)` | false | false |
| `mask-position: anchor(--a left) 0` | false | false |
| `translate: anchor(--a left)` | false | false |
| `border-radius: anchor-size(--a height)` | false | false |
| `margin-left: anchor-size(--a width)` / `width: anchor-size(...)` / `left: anchor(...)` | true | true |

`anchor()` and `anchor-size()` are legal only on the insets, sizes and margins of an absolutely positioned box. Every clip that could read the plate's live extent is therefore a positioned box, and a positioned box takes its content out of flow. The two ways left:
- **A clipper positioned by the same anchors, holding the faces, plus an in-flow reserve.** The reserve must be as large as the faces. It is either a second copy of the content (a dual render, against E-1) or a measured size (the measurement this family exists to avoid).
- **Couple the faces' opacity to the plate.** The W3 check counts a face as painting above 0.05 opacity. A face at the far end is covered only once the spring has nearly landed, so an honest coupling holds the far faces invisible for most of the clock. That hides the mechanism rather than curing it (E-2).

So W-7 stays RED in this family, measured: faces out 181.83 / 181.86 px on the expands, 77.67 / 77.7 px on a content add and 110.48 / 110.53 px on the long swap (Chromium / Playwright WebKit, `run-e4.txt`). Every shrinking transition passes at 0 px, because the faces are already inside when the plate starts shrinking.

### Q3 · Where does a DockControl rendered outside a dock get its state paint, without a second paint path (E-1)?

**From the same rule.** In the per-seat form the projection is the seat's own `::after`, anchored to the seat through a per-seat scoped name. It needs no host: the anchor is the seat itself, so the geometry is identical wherever it renders. The host changes only the containing block.
- In a dock, the seat is `position: static`, so the containing block is the dock's host and the port never clips the projection.
- Outside a dock, the seat keeps `position: relative` (the material group already sets it, `glass/material.css:47`). The containing block is the seat, so the projection stays inside any clipping ancestor the author put around it.

The two cells differ in one declaration, `position`, on the seat. The paint recipe (background, rim, ring, lift, press) is written once.

Measured in `q3.mjs` (a hostless seat in a card with a background):

| cell | reading, Chromium and Playwright WebKit alike |
|---|---|
| L1 · hostless seat, projection at `z-index: -1`, no stacking context | **hidden**: `232,232,232` (the card background) at the centre and at ±3 px |
| L2 · the same seat with `isolation: isolate` | painted: `200,0,0` |
| L3 · L2 in an `overflow: hidden` card, seat static | the projection paints 3 px **past the card's clip** (`200,0,0` below it), because its containing block is above the clipper. This is why a hostless seat must stay `position: relative` |
| L4 · L2 under a transformed ancestor | painted, and the containing block is the transformed wrapper (`top: 20px`) |
| F4 · an in-dock seat with `isolation: isolate` | still escapes the port (`200,0,0` 3 px above and below) |

So the law is: every seat is `isolation: isolate` everywhere, and `position: static` only inside a dock run.

Census: `DockControl` is used with no dock host in value.js `workbenches/{mix/MixResultDisplay, extract/ExtractControls, extract/ExtractWorkbench, extract/ImageEyedropper/ImageEyedropper, gradient/GradientVisualizer/GradientVisualizer}.vue` (read-only grep: files importing DockControl with no `GlassDock`/`DockLayer` reference), and glass-ui's own `DockBackgroundToggle.vue`.

### Q4 · What does anchor-name churn cost across a fast hover sweep? Does `anchor-scope` per dock hold on Safari 26?

**Cost** (`q4.mjs`). 12 seats; the mouse crosses the run four times in 240 steps. Median of 3. Chromium figures are CDP `Performance.getMetrics` deltas; WebKit has no CDP, so only frame intervals are read there.

| mode | Chromium layouts / layout ms / style recalcs / style ms / task ms | frame p50 / p95 / max (ms), Chromium | Playwright WebKit p50 / p95 / max |
|---|---|---|---|
| H · HEAD-style: seat `:hover` background + `scale: 1.1` | 79 / 5.05 / 252 / 13.89 / 108.35 | 8.3 / 9.9 / 10.3 | 17 / 19 / 21 |
| S · one shared projection, `anchor-name` on `:hover` (the round-0 sketch) | 146 / 8.54 / 73 / 3.71 / 78.97 | 8.3 / 9.8 / 16.3 | 17 / 18 / 23 |
| P · per-seat `::after` projections (the strongest form), 1 selected | 307 / 35.17 / 307 / 21.31 / 157 | 8.3 / 9.9 / 16.6 | 17 / 19 / 22 |
| P · 12 selected | 311 / 36.17 / 311 / 21.23 / 148.81 | 8.3 / 10.0 / 10.4 | 17 / 18 / 21 |
| H · 12 selected | 84 / 6.32 / 250 / 15.04 / 121.42 | 8.3 / 10.1 / 17.9 | 17 / 19 / 24 |

Reading:
- Churn is real but cheap. The shared-name mode costs 67 extra layouts (+3.5 ms) per 240 moves.
- The per-seat mode costs about 0.13 ms of layout per move. Every pseudo is an out-of-flow box, and a hover transition on one re-lays it out each frame.
- No mode moved the frame distribution in either engine. The per-seat cost does not grow with the number of painting projections (1 against 12 selected: 307 against 311 layouts).
- Headless timings are a floor for a real device. Compositor lag is invisible to these reads (W.md §13).

**`anchor-scope`.** `CSS.supports('anchor-scope', '--a')` is true in both engines. Behaviour (`q.mjs` S, U):
- Two docks, each `anchor-scope: --hov`, a seat in dock 1 named `--hov`: dock 2's projection does not bind to it. It stays at its static position (248 px, its own first seat), so dock 2 paints its projection there.
- Without `anchor-scope`, dock 2 did not bind across docks either (U2 at 648), because each projection's containing block is its own dock and an anchor outside that containing block is not acceptable.
- Inside one containing block, scope is load-bearing. The per-seat pseudos all named `--seat` in one dock bind to the **last** seat without a per-seat scope (F3: `left: 400px` for seat 1's pseudo) and to their own seat with it (F: `64px`). Both engines.

The Safari 26 cell is **UNMEASURED (owner's safaridriver checkbox)**. BCD lists `anchor-scope` at Safari 26.0 (W.md §5), and Playwright WebKit 26.5 matches Chromium on every row above.

### Q5 · How is the pool of projections bounded for multi-select groups?

**By construction: one pseudo per seat, so the pool is the seat count, and nothing is allocated.** The 12 `aria-pressed` nodes on `/dock/overflow` (`demo/stories/dock/overflow.vue:78-89`; `DockControl` stamps `aria-pressed="false"` on the 11 unselected, `DockControl.vue:108-116`) are 12 seats with 12 `::after` boxes. Only the `[aria-pressed="true"]` / `[data-active]` ones paint.
- Cost with 12 painting: 311 layouts / 36.17 ms against 307 / 35.17 ms with 1 (Q4). It is flat.
- The shared-projection sketch of round 0 needs a script-managed pool for multi-select, because one element can carry only one `position-anchor`. The per-seat form deletes that problem.
- What it gives up: a single `--dock-selected` projection is what makes the selected capsule glide between seats (the IOS27-MICRO eyeglass tab). Case A of Q1 shows that glide works in both engines with no script. The strongest form therefore keeps exactly one shared projection, the **selection glide**, for a single-select group (`role=radiogroup|tablist`, or a dock's `aria-current`), and paints multi-select pressed state per seat. That is two selectors for "selected". It is one recipe token-wise, but it is two geometry paths, so §6 C-3 names it as an E-1 tension rather than claiming it is clean.

### Q6 · How does `position-visibility: anchors-visible` behave on both engines for seats scrolled out of view?

| read | Chromium 149 | Playwright WebKit |
|---|---|---|
| `CSS.supports` `anchors-visible` / `anchor-visible` | true / **false** | true / true |
| `CSS.supports('position-anchor', 'normal')` | false | true |
| computed initial `position-visibility` | `anchors-visible` | `anchors-visible` |
| projection of a seat scrolled past the port's end, with explicit `anchors-visible` (F) or with the initial value (F2) | hidden (`255,255,255` where it would paint) | **painted** (`200,0,0`), outside the port, on the page to the right of the dock |
| the same projection with the host `overflow-x: clip; overflow-y: visible` (K) | hidden (`255,255,255`) | hidden (`255,255,255`) |
| the cross-axis ring 3 px above a visible seat, under that host clip | painted (`200,0,0`) | painted (`200,0,0`) |

- The two engines disagree today. The keyword spelling also splits: Safari 27 renamed it `anchor-visible` and keeps the old spelling temporarily (W.md §5); Chromium parses only `anchors-visible`.
- The strongest form therefore does not rest on `position-visibility`. The dock clips its **main axis** with `overflow-x: clip` (`overflow-y` for a vertical dock). That is a clip, not a scroll container (PORTFOLIO §2.3), so the ring's cross-axis reach stays whole, and an off-port seat's projection is cut at the dock edge in both engines.
- One side effect was also measured. `anchors-visible` is the initial value, so the **plate** vanished whenever its anchor was `visibility: hidden`. The harness's probe paint hides every element but the plate, so W1 read 0/32 on the first probe build with an empty silhouette (`run-e.txt`). The plate must declare `position-visibility: always`.

## 2 · The strongest form

What the family must specify precisely to work. Each item is backed by a measurement above or in §4.

1. **Seats are glyph boxes.**
   - Inside a dock run, every seat (`DockControl` of either shape, `DockTrigger`, and any consumer seat stamped `[data-dock-seat]`, floor row 1) is `position: static; isolation: isolate`.
   - A seat has no `background`, `box-shadow`, `backdrop-filter`, `outline`, `scale`, `filter` or inline press transform of its own.
   - Each seat declares `anchor-name: --dock-seat; anchor-scope: --dock-seat`.
   - Outside a dock the same seat is `position: relative` (Q3).
2. **One projection per seat.** The seat's `::after` is absolutely positioned with `position-anchor: --dock-seat`, anchored on all four insets and `z-index: -1`. It carries the whole state register:
   - hover fill and lift (`scale`), only under `@media (hover: hover)` (floor row 3);
   - selected fill and rim;
   - press fill, plus a press `scale` read from the inherited `--dock-press-t`, which `useLiquidPress` already writes;
   - the focus ring as its `outline` + `outline-offset`.

   The specular `::before` is re-anchored to its seat the same way (its box is unchanged).
3. **One glide projection for single-select.** An element in the plate layer carries `position-anchor: --dock-selected`, and the one selected seat in a single-select group names `--dock-selected`. Its insets transition on the dock spring, which is the eyeglass tab (Q1 case A). Multi-select pressed state paints per seat (Q5).
4. **The plate is an anchored projection of the dock box, never a child of it in the containing-block sense.**
   - The dock is `position: static; isolation: isolate; anchor-name: --dock-box; anchor-scope: --dock-box, --dock-selected`.
   - The plate is `position: absolute; position-anchor: --dock-box; position-visibility: always`, with all four insets `anchor(...)`, each transitioned on `var(--spring-dock-duration) var(--spring-dock)`, and `transition: none` under PRM (canon P6).
   - Its containing block is the host's nearest positioned ancestor. That box does not move with the morph, so the anchored insets change and the transition fires (§4).
   - **Nothing on the dock may form a containing block for positioned descendants**: no `transform`, `will-change: transform`, `filter`, `contain` or `container-type`. HEAD violates this in `shell.css:150-173` (`contain: layout style`) and `shell.css:425` (`will-change: transform` on the vertical dock), and `scroll-chrome.css:76` would too (Finding 7).
   - `position: fixed` is refused (Finding 8).
5. **The morph window is the plate's own transition.** `transitionrun` opens it and `transitionend`/`transitioncancel` close it, counted per property on the plate (`GlassDock.vue` in the probe patch). There is no spring in script, no `--dock-morph-t`, no box `scale`, no counter-scaled faces and no footprint hold. `useDockMorph`'s spring, `dockMorphMeasure.ts` and the `[data-morphing]` CSS in `layers.css`, `shape.css` and `morph.css` are deleted, not bypassed.
6. **The run scrolls only when its seats exceed its box.**
   - `.dock-run` is `overflow: clip` with `min-inline-size: 0`, and becomes `auto` on its main axis only on the active face and only under `[data-overflowing]`.
   - That bit is written by one `ResizeObserver` over the run and its seats, reading `scrollWidth − clientWidth > 0.5` (or the block-axis pair).
   - Because no seat paints past its box or transforms, this reading equals "the seats genuinely exceed" (W2 route 4: 0 frames with range).
   - It is a binary read, not a geometry read.
7. **The dock clips its main axis** with `overflow-x: clip` (or `overflow-y`), so an off-port seat's projection never paints beside the dock on an engine whose `position-visibility` does not hide it (Q6).
8. **The corner (floor sub-choice).** `border-radius: 9999px` on a pill plate, and the W5 cut-cap timeline on the plate is struck. Since the plate is the only corner owner, the cap question moves to the rim or to the scroll affordance.
9. **The rim** is a child of the plate, clipped by the plate's rounding with `overflow: clip`. It is not probed here (§4, W5).
10. **The state composable** is shared with the other families (PORTFOLIO §3) and is not this family's centre. The hover gate being structural (item 2) is this family's one contribution to problem 4.

## 3 · Code sketch (the load-bearing CSS, as probed)

```css
.glass-dock { position: static; isolation: isolate; overflow-x: clip;
  anchor-name: --dock-box; anchor-scope: --dock-box, --dock-selected; }
.glass-dock > .dock-plate { position: absolute; position-anchor: --dock-box; position-visibility: always;
  top: anchor(top); left: anchor(left); bottom: anchor(bottom); right: anchor(right);
  transition: top var(--spring-dock-duration) var(--spring-dock), left …, bottom …, right …; }
.glass-dock .dock-run { overflow: clip; min-inline-size: 0; }
.glass-dock .dock-run.is-active[data-overflowing] { overflow-x: auto; }
.glass-dock [data-dock-seat] { position: static; }
[data-dock-seat] { isolation: isolate; anchor-name: --dock-seat; anchor-scope: --dock-seat; }
[data-dock-seat]::after { content: ""; position: absolute; position-anchor: --dock-seat;
  top: anchor(top); left: anchor(left); bottom: anchor(bottom); right: anchor(right);
  z-index: -1; pointer-events: none; outline: var(--dock-ring-width) solid transparent;
  scale: calc(1 - var(--dock-press-t, 0) * 0.04); }
@media (hover: hover) { [data-dock-seat]:hover::after { background-color: var(--dock-control-hover-bg);
  scale: calc(var(--scale-hover-dock) - var(--dock-press-t, 0) * 0.04); } }
[data-dock-seat]:is([data-active], [aria-pressed="true"], [aria-current]:not([aria-current="false"]))::after {
  background-color: var(--dock-control-active-bg); box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-capsule); }
[data-dock-seat]:focus-visible::after { outline-color: var(--dock-ring-color); }
```

The probe itself (`d2e-probe.patch`) differs from this landing form in three ways:
- It overrides HEAD rules with `!important` where the landing form deletes them.
- It scopes the seat rules to `.dock-icon-button, .dock-tab-button`. `DockTrigger`'s `::after` is its hit-slop (`controls/touch-floor.css:42-60`), so triggers were not converted.
- It does not add the glide projection, the main-axis dock clip or the rim.

## 4 · The probe on the real dock: W1-W5

**Build and run.**
```sh
node harness/build.mjs $WT --out $OUT --label e4
node harness/run.mjs --build $OUT/builds/e4 --adapter $SCRATCH/adapter-e.mjs --out $OUT
```
`adapter-e.mjs` is `adapter-head.mjs` with one read changed: `morphing()` reads `[data-plate-moving]`. Every other read is HEAD's, including `plate()` = `.glass-dock > .dock-plate` and the WebKit `+shim`.

**Verdicts, both engines** (HEAD re-run by this seat the same way, `run-head.txt`):

| witness | HEAD (this seat's run) | D2-E probe `e4` | what turned |
|---|---|---|---|
| W1 corner | FAIL 10/32 | **PASS 32/32** | every rest and every sampled morph frame reads worst 0.137 px (Chromium) and 0.01-0.046 px (WebKit), including the demo SidebarDock at 1440×600 and the capped rail at both scroll ends. The corner is the floor's closed form (item 8). The family's contribution is that no box `scale` squashes it, since the plate animates its insets |
| W2 run | FAIL 0/10 | **PASS 10/10** | routes 2-4: 0 frames with a scroll container and 0 with range (Chromium 72/244/213 frames, WebKit 36/130/118). Ring cut 0/0 px on the long run (reach 1.75/3.75 px) and under hover-scale (reach 4.75/4.75 px, clipped equal to free), both engines |
| W3 morph | FAIL 0/14 | FAIL **6/14** | all 6 shrinking transitions pass. The 8 growing ones fail on `faces` only (Q2). The other checks pass on all 14: step ratio ×0.65-0.66 of the bound; landing "dead, 0 reversal(s)" (O-64 R-3 cleared); window 207.3-218 ms against a 210 ms clock (allow 252.9-262; O-64 R-4 cleared); travel 197-209.8 ms; 0 two-owner frames (R-5). The content add (W-13, O-64 R-2) now morphs: 179.33 px over 208.4 ms (Chromium), 179.39 px over 216 ms (WebKit). HEAD: one step of 179.33 px with no window. The first expand (W-6, O-64 R-1) is continuous from the true endpoint, 102 → 489.66 px, max step 26.88 px |
| W4 state | FAIL 4/16 | FAIL **6/16** | coarse · no-hover-latch turns green in both engines, because the seat carries no hover paint and the projection's hover is `(hover: hover)`-gated. This harness reads only the seat, so this seat confirmed the gate by construction and by the `q4` sweep, not by a pseudo read on a coarse tap. Still RED: compact ×4 per engine (absent, the shared composable) and tap-pins ×1 per engine (the Play click fires, `useDockState`); neither is this family's centre |
| W5 rim | FAIL 0/10 | FAIL 0/10 | not probed: no rim prop was added. The claim (a child of the plate, clipped by its rounding) is structural and unmeasured here |

**Path to e4.** Each build was measured, so the dead ends are recorded:

| build | change | result |
|---|---|---|
| `e` | `position: fixed` plate, `anchors-visible` default | W1 0/32 (empty silhouette: the plate hid with its `visibility: hidden` anchor under probe paint); W2 10/10; W3 6/14 |
| `e2` | + `position-visibility: always` | W1 30/32 (`w1-e2.txt`); vmorph expanded plate 2.93×2.93 / 38×104.93 |
| `e3` | + `will-change: auto` on the dock | W1 32/32, W2 10/10, W3 6/14 |
| `e4` | fixed → absolute, dock `position: static; isolation: isolate` | the same verdicts as `e3`, and immune to Finding 8 |

**Cost** (`p5.mjs`, Chromium, first expand, 3 runs):

| build | layouts | layout ms | style recalcs | style ms | task ms |
|---|---|---|---|---|---|
| HEAD | 65-66 | 3.48-3.84 | 116-118 | 83.81-94.08 | 149.1-163.9 |
| `e4` | 41-42 | 24.94-30.76 | 42-43 | 17.68-21.01 | 95.1-110.1 |

**Source diff** (`d2e-probe.patch`): `projection.css` +126 lines (new); `GlassDock.vue` +44 (the plate window and the overflow bit); `useDockMorph.ts` −23/+4 (spring removed); `styles/index.css` +1.

The landing form is larger, because it deletes the morph path it bypasses: `useDockSpring`, `dockMorphMeasure.ts` and the `[data-morphing]` blocks of `layers.css`, `shape.css`, `morph.css` and `crossfade.css`. It also strips the state paint from `icon-button.css`, `tab-button.css`, `triggers.css` and `controls.css`, and moves the trigger hit-slop into the seat box. Estimate: about −600 / +250 lines. The −600 is an estimate from those files' code counts in PORTFOLIO §1.3, not measured.

## 5 · Public API and consumer impact

**Props.** None added for problems 1-3. The rim (problem 5) and the compact rung (problem 4) are the shared composable's API, not this family's.

**Behavioural contract changes (clean breaks, E-1):**
- `DockControl` paints its state on its `::after`, which it now owns. A consumer that styled a DockControl's `::after` loses it (0 hits in the four consumer trees for `DockControl`-targeted `::after`, read-only grep of `X.md` §2's CSS sites).
- Inside a dock, a seat is `position: static`. A consumer child positioned against its seat now resolves against the dock's host instead. **fourier's `.view-dot`** (`CanvasControlsDock.vue:185-194`, `position: absolute; top: -1px; right: -3px`, X-14) would fly to the host corner. That consumer must anchor it to the seat (`position-anchor: --dock-seat`), which works because the seat names itself. This is a marked addendum in fourier's tranche.
- The dock is `position: static`. A consumer that absolutely positions things against `.glass-dock` loses that containing block (none found in X.md §2).
- The dock may no longer carry a CB-forming property. `useScrollChrome`'s recipe (`scroll-chrome.css:76`, `will-change: transform` + `transform: scale()` on the root) is incompatible and retires. No consumer uses it (X.md K-42).

**Per consumer** (sites from X.md §1-2):

| consumer | touches | disposition |
|---|---|---|
| value.js (on 7.0.0, repins through W-LANDING) | `--dock-control-hover-bg` / `--dock-control-press-bg` in `ConsoleRail.vue` (PORTFOLIO §1.4) | keep their names; they now paint the projection |
| value.js | X-13 `.action-icon:hover { transform: scale(1.2) }` inside a seat | a glyph transform inside a seat box: it adds to the run's overflow only if it reaches past the seat, which is the consumer's contract (K-33) |
| value.js | X-11's Tools seat `0fr ↔ 1fr` grid animation | still a second owner of width on that edge (K-13). The plate follows it through Q1 case D, but the consumer's bezier sets the pace, so it must retire for the dock spring to own the edge |
| value.js | 5 hostless DockControl workbench sites | covered by Q3's `position: relative` + `isolation` rule, no change needed |
| keyframes.js | `scale-on-hover` (1.08) on a 40 px glass `Button` in `TransportDock` (X-13) | not a DockControl, so not converted. It is a seat transform in the port unless the Button is stamped `[data-dock-seat]` |
| keyframes.js | `ChromeDock`'s `DockTrigger`s | follow the trigger conversion (hit-slop into the seat box) |
| keyframes.js | M-4's measured band height (`useMenubarMeasure`) | unaffected: the dock's layout box still changes in one frame, as today at settle |
| fourier-analysis | `--dock-control-active-bg` rainbow knob (X-6), which takes an image and a running `background` animation | the projection must paint `background` (image), not `background-color`, for this knob. The probe used `background-color`: a defect to fix at landing |
| fourier-analysis | `.view-dot` | re-anchor, as above |
| fourier-analysis | the canvas docks under `overflow: hidden` ancestors (K-16) | the plate and projections are clipped by any clipping ancestor at or above their containing block, as today. They stay within the dock's silhouette except the hover lift and ring, which never exceed the plate's padding at HEAD's tokens |
| chicago | X-1 (`--dock-cap-rest: 9999px`), X-2 (`.page-dock .dock-run { overflow: visible }`) | both retire: the corner is 9999 px by construction, and the run is `clip` unless it overflows (W2 route 4: 0 range frames) |
| chicago | X-3 (the veil floor) | interface (O-62) |

**Floor row 6 (veil and ink).** The plate remains the one element that does `@apply glass-plate` and carries the one `backdrop-filter`. The probe removed the capsule's `backdrop-filter` from selected seats, where HEAD's `.glass-capsule` stacked a second one. That is a visual change the veil seat (O-62) must accept or re-rule.

## 6 · Chrome and Playwright WebKit, and the counterexamples

Engine agreement: every harness verdict above matches cell for cell between Chromium 149 and Playwright WebKit 26.5 (+shim). The platform rows split on four points: `position-visibility` (Q6), the spelling of the visibility keyword, scroll compensation timing (Q1 G; Finding 8), and `position-anchor: normal` parsing. Real Safari 26 and 27: **UNMEASURED (owner's safaridriver checkbox)** on every row.

**Named counterexamples, the family's real weaknesses:**
- **C-1 · W-7.** Faces paint outside the plate on every growing transition: 181.83 px on an expand, 77.67 px on a content add, 110.48 px on a swap. No primitive clips in-flow content to an anchored box (Q2). The family cannot turn W3 green without importing another family's face mechanism.
- **C-2 · Scroll between the plate's containing block and the dock.** A dock inside a non-positioned scrolling pane, where the pane is not the containing block, shows the plate one frame behind the dock in Chromium (`q6.mjs` P3: 60 px at the synchronous read and frame 1, 0 at frame 2). The family must require the host to be positioned, or state the lag. A `position: fixed` plate is worse: in Playwright WebKit it transitions on every page scroll (P: 100 → 58.5 px at 150 ms).
- **C-3 · Two geometry paths for "selected".** The glide needs one shared `--dock-selected` projection. Multi-select pressed state needs per-seat projections. The paint tokens are one, but a single-select seat's capsule and a pressed toggle's capsule are drawn by two elements (E-1 tension, Q5).
- **C-4 · Retarget wall.** A hover-in, hover-out reversal mid-morph reverses the plate's velocity in one frame (−0.42 → +0.305 px/ms), and the harness does not test it. D-1 asks for inertia across a retarget. Only a script integrator gives it (W.md §10), and that brings measurement back.
- **C-5 · The containing-block law is brittle.** A single `will-change: transform` on the dock (HEAD's own vertical arm) silently turned the plate into a 2×2 px box. A consumer class that sets `transform` or `filter` on the dock root does the same. This fails loud in paint (E-2 is satisfied), but it needs a gate. Consumer transforms on **ancestors** are harmless: they become or sit above the containing block (`q3.mjs` L4).
- **C-6 · Off-port projections on WebKit.** Without the main-axis dock clip, Playwright WebKit paints a scrolled-out seat's selected capsule on the page beside the dock (Q6). The cure (`overflow-x: clip` on the dock) also clips anything a consumer places outside the dock on the main axis, such as a `.view-dot` on an edge seat.
- **C-7 · The hover lift no longer lifts the glyph.** Under E the plate behind the seat scales, and the glyph stays still. That is a visible departure from HEAD's `scale: 1.1` register (IOS27-MICRO hallmark to be re-ruled by the owner's eye). Scaling the glyph would reintroduce a transform in the port.
- **C-8 · Triggers.** `DockTrigger` already spends its `::after` on a 44 px hit-slop. Converting it means making the trigger's box the hit cell (X-5's ask), which grows the painted trigger footprint on dense rungs.
- **C-9 · P5.** The plate animates a layout box: 41-42 layout passes a morph. That needs a canon amendment, and the owner has not ruled on one.

## 7 · Open gaps

- Real Safari 26 / 27: every row, including `anchor-scope`, anchored-inset transitions, the scroll-compensation timing, and `position-visibility`. UNMEASURED (owner's safaridriver checkbox).
- W5 (the rim as a plate child) was not probed. It needs a rim prop or slot on the plate.
- The glide projection, the main-axis dock clip and the trigger conversion were specified and measured on scratch pages (`q.mjs` A, `q6.mjs` K), not on the real dock.
- The coarse-tap hover-latch green is read on the seat only. A pseudo read after a coarse tap was not taken on the real dock.
- Compositor lag of anchored projections during the press `scale` spring is not observable headless (W.md §13).
- The fourier `.view-dot` re-anchor, the rainbow knob as `background` (not `-color`), and value.js X-11 retirement are consumer addenda, not measured at the consumers.
- The mid-morph reversal (C-4) has no witness in the harness.
