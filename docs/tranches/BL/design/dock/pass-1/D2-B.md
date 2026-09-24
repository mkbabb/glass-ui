# D2 · pass 1 · D2-B · the measured scene (research seat)

| field | value |
|---|---|
| seat | D2-B research, pass 1. Answers PORTFOLIO §6 D2-B questions 1-6 with measurements, then takes the family one step further: its strongest form, a prototype on the real dock source run through harness witnesses W1-W5, public API and consumer impact, engine cells, and named counterexamples |
| model | `claude-opus-5-5`, asserted from own system identity |
| glass-ui HEAD | named `5804d8cc`. The scratch worktree was cut at `f57a3c1f`, and `git diff 5804d8cc f57a3c1f -- src demo package.json` is 0 lines. The checkout read `abf47ad7` at the end (docs-only commits since), and `git diff f57a3c1f abf47ad7 -- src demo package.json` is also 0 lines |
| scratch root | `R = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-B-research`. Worktree `$R/wt` (removed before return). Builds `$R/out/builds/{head,d2b}`. Probes and their JSON in `$R/probes/` |
| instruments | Headless Chromium and Playwright WebKit from node, with playwright imported by absolute path from the checkout's `node_modules`. No browser MCP. The D2 harness (`harness/build.mjs`, `run.mjs`, `w3-morph.mjs`) ran with a D2-B adapter (`$R/adapter-d2b.mjs`), plus probes q1-q8 |
| WebKit | Playwright WebKit is not Safari. Every WebKit number here is labelled Playwright WebKit. Dock pages carry the harness crash shim (`adapter-head.mjs` `webkitShim`, which pins the plate border to one `color-mix()` arm). Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| load | Other sessions shared the machine. Load average ran 22-150 during these runs, and is quoted where timing matters. Timings are read as ratios between variants run back to back, never as absolute frame budgets |
| writes | this file only, in the checkout |

## 0 · Answers in one table

| Q | answer | load-bearing numbers |
|---|---|---|
| 1 | **Yes**, for any layout that keeps the inactive face at its intrinsic extent: in flow in one grid cell, or out of flow at `inline-size: max-content`. **No** for HEAD's `inset: 0`. Fonts are covered without waiting on them: Chromium's RO re-delivers in the same frame as the swap, and Playwright WebKit holds first render until the swap font lands. W-6 turns green in the prototype | model = layout truth at expand in 16/16 Chromium cells (in-flow and max-content); `inset: 0` reports 44.000 px (one cell) against a truth of 391.094. Prototype W3 first-expand: D 387.66 px, window 242.1 ms, dead landing, 0 reversals |
| 2 | The layout-sum flag equals layout truth at every 1/32 px step across ±2 px, on both engines at DSF 1 and 2. It flips between d = −1/32 and d = 0 and needs **no hysteresis**: making the run a scroller changes neither need nor budget (0 of 129 steps). The native `scrollWidth > clientWidth` is the wrong instrument | native misses 25 (Chromium) and 64 (Playwright WebKit) of the 64 overflowing steps |
| 3 | Per write plus style flush: six `inherits: false` registered px properties cost **66-70 µs** in Chromium and **84-138 µs** in Playwright WebKit, with 4 elements restyled. HEAD's one inherited scalar costs **311-425 µs** and **1814-1992 µs** on the HEAD build (261-305 and 1497-1987 on the prototype build), with 29 elements restyled. Writing the same geometry as plain properties is cheaper still: 59-68 µs and 34-49 µs. The prototype's residual cost is its one remaining inherited write (`--dock-morph-t` on posture flips) | traced real expands in Chromium: per-recalc median 1.22-1.38 ms (prototype) vs 1.36-1.55 ms (HEAD), with 46-47 vs 74-76 recalcs per morph |
| 4 | **Neither is the dock's choice.** The anchor edge belongs to the consumer's layout (K-11), and FLIP animates layout's own endpoints. Measured on one dock with a leading persistent region in three anchorings: the anchored point drifts 0 px, and face content never overlaps the persistent region | persistent travel: centre −187.94 px (D/2), start +4 px (padding), end −379.88 px (all of D); overlap 0 px in 0 frames, both engines |
| 5 | **Yes.** The compact rung is persistent + current seat + rim, made by `display: none` on the rest of the seats, with no extra DOM, and it works without `#collapsed` (K-35). The hysteresis sits on the per-frame reader (`createScrollReader`, the core of `useScrollTrigger`), **not on `scrollend`** | Playwright WebKit fires one `scrollend` per wheel gesture, 677-700 ms after the threshold is crossed. W4 16/16 |
| 6 | **Retire it from the dock; keep it for StoryPage.** On the dock-search demo it writes `--chrome-collapse-t: 1` on the dock root and nothing reads it. StoryPage's header reads the value through `.scroll-chrome` and settles on a `--spring-dock` transition | dock: transform `none`, opacity 1, rect unchanged, on both engines. StoryPage snap: 277-335 ms over 25-45 frames, largest width step 3.3-5.7 px |

Prototype: **W1 32/32, W2 10/10, W3 14/14, W4 16/16, W5 10/10 on both engines**, against HEAD's 9/32, 0/10, 0/14, 4/16, 0/10 from the same harness in the same session (§3).

## 1 · The six questions, measured

### Q1 · Does ResizeObserver deliver each face's intrinsic extent before the first expand?

`DELAY=500 node $R/probes/q1-ro-fonts.mjs` and `DELAY=2500 …` → `q1-out-500.json`, `q1-out-2500.json`. The probe page holds one dock with a persistent seat and two faces: a four-label full face and a small face. It tries three inactive-face layouts, two `font-display` values, and an expand at 200 ms or at 1200 ms. The web font (Plus Jakarta Sans from `src/fonts`) is served after the delay, with a Georgia fallback. "Model" is the face extent the last RO delivered. "Truth" is the face's layout extent read at that moment.

| inactive-face layout | Chromium, first RO | Chromium, swap font lands | Chromium, model at expand | Playwright WebKit |
|---|---|---|---|---|
| in flow, one grid cell, `visibility: hidden` | 4.1-10.5 ms: 391.094 (fallback face) | RO re-delivers 370.938 in the same frame as the load (503.7 vs 503.9 ms; 2505.9 vs 2506.3 ms) | equals truth in every cell (391.094 before the font lands, 370.938 after) | first rAF and first RO arrive together at 505-511 ms (500 ms delay) and 2508-2518 ms (2500 ms delay), and already read 370.938 |
| out of flow, `inset-block: 0; inset-inline-start: 0; inline-size: max-content` | 4.1-12.5 ms: 391.094 | same frame as the load (503.9/504.2; 2504.4/2504.7) | equals truth in every cell | same as above |
| HEAD: `position: absolute; inset: 0` | 44.000 (the cell) | nothing, because the face is not laid out at its own size | **44** against a truth of 391.094 or 370.938 | 44.000 until the face goes active (1208 ms) |

- With `font-display: optional`, Chromium keeps 391.094, which is correct because the font is never used. Playwright WebKit reports the `FontFace` status as `error`, with the same extent.
- **Fonts-ready is not the mechanism.** Chromium corrects the model in the same frame as the font. Playwright WebKit shows nothing before the font arrives, within the 500 and 2500 ms delays tried here. Neither engine exposes a painted frame whose endpoint came from a fallback face, so keyframes' A-2 wait before mount has nothing left to protect.
- **The permanent reserve is avoidable.** The charter's in-flow grid cell works, but it keeps the larger face inside the dock's intrinsic size in every posture (known risk 3). The max-content layout gives the same numbers with no reserve, so the strongest form uses it (§2, B''). HEAD's `inset: 0` is the W-6 source. Its extent comes from the containing block, not from the face.
- **W-6 on the prototype.** `w3-morph` first-expand: D 387.66 px (102 → 489.66), window 242.1 ms against an allowance of 268.2, largest step ×0.66 of the bound, faces out 0.11 px, dead landing, 0 reversals (Chromium). Playwright WebKit: window 243 ms, ×0.66. HEAD's same cell is one 387.66 px frame at 632.4 ms inside a 545.1 ms window.

### Q2 · The overflow flag at the exact budget

`node $R/probes/q2-flag.mjs` → `q2-out.json`. The run holds seats of 467.28125 px total need. The budget is stepped from need − 2 px to need + 2 px in 1/32 px steps (129 steps). Definitions:
- flag = Σ seat border boxes from RO + gaps + run padding + dock chrome > budget + 0.01;
- truth = the last seat's layout edge (offset chain, no transforms) past the run's content edge;
- native = `scrollWidth > clientWidth`.

| | Chromium DSF 1 | Chromium DSF 2 | Playwright WebKit DSF 1 | Playwright WebKit DSF 2 |
|---|---|---|---|---|
| flag ≠ truth | 0 / 129 | 0 / 129 | 0 / 129 | 0 / 129 |
| flag flips between | d = −1/32 (flag, overBy 0.0313) and d = 0 | same | same | same |
| native false negatives | 25 (d from −0.78 to −1/32) | 25 | 64 (all of d < 0) | 64 |
| native false positives | 0 | 0 | 0 | 0 |
| feedback (need or budget change when the run is a scroller) | 0 | 0 | 0 | 0 |
| resize drag across the budget | 2 crossings, 2 flips | 2, 2 | 2, 2 | 2, 2 |
| hover `scale: 1.1` at +1 px slack | flag false; painted reach 3.93 px past the content edge; native range 0 | same | flag false; 3.91 px; 0 | same |

**Hysteresis needed: none on the flag.** Its inputs are layout sums that do not move when the flag turns the run into a scroller, so it cannot oscillate on its own output. The 0.01 px epsilon only absorbs float noise. On the prototype, W2 has a fitting run as a scroll container in 0/77, 0/281 and 0/230 frames (Chromium) and 0/59, 0/197 and 0/176 (Playwright WebKit), and hover rings are cut by 0/0 px. What can still re-flip the flag near the budget is a seat whose own layout size animates across it (counterexample C-8), and the flag's definition of "seat" (C-1).

### Q3 · The restyle cost of the per-frame writes

`node $R/probes/q3-restyle.mjs $R/out/builds/{head,d2b}` → `q3-out-head.json`, `q3-out-d2b.json`. Then `Q3_VS=V1,V4,V3 Q3_TV=V1,V4 node … d2b` → `q3-out-d2b-v4.json`. The probe uses the real dock (morph scene, expanded, 20 dock elements, no morph in flight). Each iteration writes, then forces a style update with `getComputedStyle(seat).opacity`, or a layout update with `getBoundingClientRect()` in the L variants. Times are the median per iteration over 7 batches of 1000-2000. Playwright WebKit's clock is 1 ms-quantized, so batches are timed whole. Element counts come from Chromium's `UpdateLayoutTree` trace events. Load average was 113-150 and then 22-36.

| variant | written per frame | Chromium µs (HEAD / D2-B build) | elements restyled | Playwright WebKit µs (HEAD / D2-B build) |
|---|---|---|---|---|
| V0 | nothing | 0.2 / 0.2 | - | 0-0.5 / 0 |
| V1 | HEAD's scalar: root `--dock-morph-t` (inherited registered `<number>`) under `[data-morphing]` | 311-425 / 261-305 | 29 | 1814-1992 / 1497-1987 |
| V4 | the same scalar written on `.dock-layers` instead of the root | - / 111 | 21 | - / 1065 |
| V2 | six `inherits: false` registered `<length>` properties on the three elements that read them (plate aperture L, R and radius; persistent shift; layers clip L and R) | 66-70 / 67-69 | 4 | 126-138 / 84-108 |
| V3 | the prototype's writes: plate `inset`, persistent `translate`, layers `clip-path` | 61-68 / 59-63 | 4 | 45-49 / 34-45 |
| V3 + layout | V3, then a layout read | 69 / 67 (trace `Layout` median 6-7 µs) | 4 | 60 / 47 |

Real morphs: `node $R/probes/q3b-trace.mjs` traces warm expand and warm collapse on the morph scene in Chromium, 3 repetitions per build (load 23-34). Sums are over the traced window, which is 700 ms for the expand.

| warm expand | HEAD | D2-B prototype |
|---|---|---|
| style recalcs / total | 74-76 / 97-113 ms | 46-47 / 42-47 ms |
| per-recalc median | 1.36-1.55 ms | 1.22-1.38 ms |
| layout | 69-72 events / 4.4-5.1 ms | 34 / 1.5-1.7 ms |
| paint | 12.7-14.1 ms | 6.1-6.8 ms |
| script (`FunctionCall`) | 24.8-27.8 ms | 10.7-11.7 ms |
| raster | 70-117 ms | 32-37 ms |

Reading:
- Four to six `inherits: false` properties are not the cost. An inherited write is, because it restyles the subtree: 29 elements from the root, and still 21 from `.dock-layers`. In Playwright WebKit that is 1.1-2 ms per frame, which is 25-45× the plain-property write.
- The prototype halves the per-morph totals in Chromium mostly by running shorter and restyling fewer times. Per-recalc cost on a posture flip stays near HEAD's. This is consistent with the one inherited write it keeps (`--dock-morph-t` on posture flips, for the leaving face's fade), though that cause is not isolated from concurrent hover transitions.
- Content and swap morphs never write the scalar. The strongest form writes the leaving face's `opacity` directly, not through an inherited property (§2 item 7). The box-mode plate's own layout is 6-7 µs per frame in Chromium and +13-15 µs in Playwright WebKit (V3 + layout − V3).

### Q4 · Asymmetric persistent regions: centre-out or leading-edge growth?

`node $R/probes/q4-anchor.mjs $R/out/builds/d2b` → `q4-out-d2b.json`. The morph scene (leading persistent Home, collapsed 102 px, expanded 485.9 px) is re-anchored by the consumer's own `margin-inline` on the dock (`auto`, `0 auto`, `auto 0`; the base `.glass-dock` carries `margin: 0 auto`, shell.css:129). A hover expand and a leave collapse follow, with 3.6 s of dwell (`DOCK_COLLAPSE_DELAY_MS`). Every rAF records the plate, the `.dock-persistent` box, the first and last full-face seats, and the layers clip aperture.

| anchoring | plate left / right edge travel | anchored point drift | persistent travel (largest step per frame, Chromium / Playwright WebKit) | visible face ∩ persistent | smallest gap from persistent to visible face |
|---|---|---|---|---|---|
| centre | −191.94 / +191.94 | 0 (Playwright WebKit 0.008) | −187.94 (14.6 / 16.6 px) | 0 px, 0 frames | 3 px (the clip margin) |
| start | 0 / +383.88 | 0 | +4 (0.3 / 0.4 px): the padding lerp | 0 px, 0 frames | 6 px |
| end | −383.88 / 0 | 0 | −379.88 (28.1 / 33.9 px) | 0 px, 0 frames | 3 px |

- **Faces ride the persistent region.** The first full-face seat travels exactly with the persistent region in every cell (−187.94, +4, −379.88), and the moving trailing edge uncovers the face through the layers clip. It reads as content revealed from behind the persistent control. Nothing is squashed, and nothing paints over Home.
- **Monotonicity.** Collapses are monotone in every cell. Expands show one sub-pixel reversal in the first morph frame, 0.03-0.098 px at 10-12 ms, in the centre and end cells (0.001 px at start). The cause is not isolated. It is inside the 0.5 px landing band, and W3 counts 0 reversals at its own resolution.
- **Where it reads worst.** End anchoring with a leading persistent region: Home crosses the whole growth, 380 px at up to 34 px per frame. That is layout's truth for that composition. The right-anchored consumer (fourier M-6) has its persistent region on the anchored side (`#persistent-end`). That case is the mirror of the start cell and was not measured on M-6 itself.
- Centre-out vs leading-edge is therefore the consumer's `justify-content` or `margin-inline`. A dock that wanted leading-edge growth inside a centred container would need an animation that is not layout's endpoint, which this family does not do.

### Q5 · Is the compact rung a measured third composition, and where does its hysteresis sit?

The **composition** is measured by W4 and `q7-extent.mjs`. It is the current seat (`[data-active]`, or `aria-current` other than `false`, or any ancestor of one) plus the persistent region plus the rim; every other run child gets `display: none`. Layout reports the new extent and the scene morphs to it the same way it morphs any other layout change. There is no new DOM and no collapsed face.
- W4: rest 214.13 → compact 101.59 px (Chromium), 214.16 → 101.61 (Playwright WebKit).
- q7: block extent 56 → 56 px and inline 212.03 → 100.28 px (−111.75) on both engines.
- W5 h·compact: rim ink 752 device px (Chromium) and 748 (Playwright WebKit), 0 outside the silhouette.

The **hysteresis** is `node $R/probes/q5-scroll.mjs` → `q5-out.json`. Both machines enter at y ≥ 88 and leave at y ≤ 40 (T 64, band 48). One is evaluated on the rAF-coalesced reader, the other at `scrollend`.

| | Chromium | Playwright WebKit |
|---|---|---|
| wheel gesture (30 wheels): the reader machine flips at the crossing | 0 ms lag (800.7, 2817.5 ms) | 0 ms lag (777, 2765 ms) |
| the `scrollend` machine | 0 ms lag, because headless Chromium fires a `scrollend` per synthetic wheel (30/30) | **+700 and +677 ms**: one `scrollend` per gesture |
| programmatic `scrollTo` ramp (36 steps) | both enter at y = 88; 35 `scrollend` | same |

**On the reader.** `scrollend` stops the machine too late to count as a trigger, and it already exists underneath (`createScrollReader`). Pure position hysteresis is enough: W4 no-threshold-bounce shows 24 moves of ±4 px around the enter point flipping the posture once. The charter's extra "downward run of at least δ" is not needed.

The engagement gate (fine-pointer hover ∪ focus-within ∪ any hold) expands at once and re-arms 150 ms after it closes. W4 measured: hover 214.13, leave 101.59, focus 214.13, blur 101.59, top 214.13 px. Under reduced motion there are 0 intermediate frames.

### Q6 · Does `useScrollChrome` retire, or stay for non-dock chrome?

`node $R/probes/q6-chrome.mjs $R/out/builds/head` → `q6-out.json`. The Chromium dock case also ran as `Q6_PROG=1 Q6_ENG=chromium …` → `q6-out-chromium-prog.json`, because the wheel did not reach the content scroller there.

| | Chromium | Playwright WebKit |
|---|---|---|
| `/dock/dock-search`: content scrolled 480 px | `--chrome-collapse-t: 1` written inline on `.glass-dock`; no `.scroll-chrome` class; transform `none`, scale `none`, opacity 1; rect 448×92 unchanged | same |
| StoryPage header (`.story-page-chrome.scroll-chrome`): 6 wheels of 12 px, then stop | at the stop y 72, T 0.137; the snap to 0 runs 334.6 ms over 45 frames, largest T step 0.024, largest width step 3.33 px | T 0.231; 277 ms over 25 frames, 0.042, 5.69 px |

- **The dock use is a dead writer.** The value has no reader on the dock; the only `.scroll-chrome` element on that page is the StoryPage header. It retires from the dock, and `useDockSearch`'s `collapseOnScroll`, `scrollContainer` and `chromeRef` options go with it (E-1). The compact rung takes over through `compactOnScroll` + `scrollSource` on GlassDock.
- **StoryPage keeps it.** Its scroll-stop snap is not a jump, because `story-hero.css:264-267` puts a `--spring-dock` transition on `--chrome-collapse-t` (D-1 holds). Its root transform is outside the dock's transform-free fence.

## 2 · The strongest form

The prototype moved away from the charter wherever a measurement said so.

1. **Layout follows posture (B'').** The active face is in flow. Inactive and leaving faces are `position: absolute; inset-block: 0; inset-inline-start: 0; inline-size: max-content`, which keeps their own extent and depends on no containing block (Q1). The dock's size is always the current posture's layout, so there is no permanent reserve (known risk 3 retires), and a consumer width is an honest endpoint (K-14, §4).
2. **Invert at the mutation; ResizeObserver is the backstop.** A `MutationObserver` on the root (`childList`, `subtree`, `characterData`, and the attributes `class`, `hidden`, `aria-current`, `data-active`) runs `check()` in the mutation's microtask. `check()` reads the new layout once and writes the inversion before any task reads or paints. RO covers font swaps, container and viewport resizes, and inline-style width changes. This answers known risk 1: the W-6 class does not move. An RO-only build (`run-d2b-v2.txt`) failed W3 content-add with one 179.33 px frame at 5 ms (×15.25 of the bound), because a post-frame read forced layout between the DOM change and RO. The microtask inversion cured it.
3. **The plate is the aperture ("box mode").** `inset` is written per frame on the out-of-flow plate, so border, rim light, drop shadow, stadium radius and the dock rim all follow the moving box. A `clip-path` aperture over a reserved footprint, as in the charter, would cut the border, the shadow and the rim at every moving edge. Its layout costs 6-7 µs per frame (Q3). The collapsed shadow becomes a plate token (`--dock-plate-shadow`) instead of a root `box-shadow`.
4. **Regions FLIP by `translate`.**
   - In-flow regions (persistent, layers) lerp a·(1 − s).
   - A leaving face holds a constant a.
   - An entering face writes nothing and rides its parent.
   - A child of a holding parent rides the parent.

   During the morph, `.dock-layers` is clipped to the aperture between the persistent regions (`inset(… round …)`), with a 3 px margin, so faces never paint over the persistent control (Q4). There is no clip at rest.
5. **Dead landing.** s is clamped to [−0.5, 1]. The morph lands when every edge and every lerping region is within 0.5 px, then settles: inline styles clear and `data-morphing` clears in that frame (W-8). The dock spring's 0.3 % overshoot (1.15 px at D 387.66) is never shown. Retargets inherit velocity scaled by old travel ÷ new travel.
6. **Posture flips are marked apart from content changes.** `[data-posture-morph]` gates the leaving-face fade and the stagger, with a reversal complement c0 = 1 − c. Content changes and swaps carry only `data-morphing`, so opacity never restarts from 0 on a content change or a reversal.
7. **Per-frame writes are plain properties.** The frame writes `inset`, `translate` and `clip-path`, and does no layout read: box sizes and the ancestor scale kx and ky are cached at the retarget. The next cut, not prototyped, is to write the leaving face's `opacity` directly and drop the last inherited scalar. On posture flips that saves about 0.2 ms per frame in Chromium and 1.5-1.9 ms in Playwright WebKit (Q3 V1 vs V3).
8. **The overflow flag is a layout sum.** Σ seat border boxes (RO) + gaps + run padding + chrome > budget + 0.01, where budget = min(max-inline-size, the parent's content box). It never uses `scrollWidth` and has no hysteresis (Q2). A fitting run is `overflow: visible` and not a scroll container. An overflowing run gets a paint gutter (padding plus an equal negative margin, so the footprint does not move). Amendment from C-1: sum flex items through `display: contents`, not `run.children`.
9. **The compact rung** is a composition (Q5) driven by `useDockScroll`: position hysteresis on `createScrollReader`, the engagement gate, and a 150 ms re-arm. The rim is a child of the plate, so the plate's rounded box clips it in every rung, and it reads the same reader.
10. **Floor, coarse pointers.** The hover paint of icon and tab seats, and `.glass-capsule-hover:hover`, sit under `@media (hover: hover)`, so a coarse tap never latches scale (W-3t, W-11).

Load-bearing code, a sketch of the prototype (`useDockScene.ts`, 468 lines):

```ts
const mo = new MutationObserver(() => { observeAll(); check(); }) // microtask: before any read or paint
const ro = new ResizeObserver(onResize)                            // backstop: fonts, container, viewport
function check() {
  updateOverflow()                                 // layout sum > budget + 0.01 → data-overflowing
  const now = rootRect()                           // one forced layout per mutation batch
  if (!rest) return recordRest()                   // first delivery: no mount morph
  if (!same(now, to ?? rest)) retarget(now)
}
function retarget(next) {
  from = painted(); to = next                      // what is on screen now; mid-flight safe
  regions = classify()                             // lerp | hold | none, children of holders ride
  write(from)                                      // plate inset, region translate, layers clip
  spring.playTo(0, 1, { inheritVelocityScale: oldTravel / newTravel, onFrame: frame })
}
function frame(v) { const s = clamp(v, -0.5, 1); write(lerp(from, to, s)); if (landed(0.5)) settle() }
```

```css
.dock-layer:not(.is-active) { position: absolute; inset-block: 0; inset-inline-start: 0; inline-size: max-content; }
.dock-run:not([data-overflowing]) { overflow: visible; scroll-snap-type: none; }
.glass-dock.compact .dock-run > :not(<current seat>):not(:has(<current seat>)) { display: none; }
```

## 3 · The probe: the prototype on the real dock source, through W1-W5

**What changed** in `$R/wt` (from `git diff --stat` and `wc -l`; `vue-tsc --noEmit` 0 errors):

| kind | files | lines |
|---|---|---|
| new | `composables/useDockScene.ts`, `composables/useDockScroll.ts`, `styles/scene.css` | 468 + 70 + 80 |
| edited | `GlassDock.vue`, `useDockShellProps.ts`, `styles/{layers,morph,crossfade,shape,dock,shell,index}.css`, `styles/controls/{icon,tab}-button.css`, `src/styles/glass/glass-capsule.css` | 12 files, +113 / −104 |
| dead, to delete in the real wave | `useDockMorph.ts` (112), `dockMorphMeasure.ts` (142), the `useScrollChrome` path of `useDockSearch` | about −300 |

Net about +370 lines, against the charter's estimate of +400 / −350. Known risk 5 (P-1) is real: the family brings back observers (one MO, one RO, one capture `scroll` listener) and owns them in one composable.

**Commands:**
- `node harness/build.mjs $R/wt --out $R/out --label d2b` builds the scene and demo (build.json: dirty, built 05:06:52Z, after the last source edit at 05:06:49Z);
- `node harness/run.mjs --build $R/out/builds/d2b --adapter $R/adapter-d2b.mjs --out $R/out` → `$R/out/run-d2b-final.txt`;
- the HEAD baseline is `run.mjs --build $R/out/builds/head` → `$R/out/run-head.txt`.

The adapter differs from `adapter-head.mjs` only in the rungs HEAD has no API for:
- config `compactProps: { scrollSource: "@window", compactOnScroll: true, rim: true }`;
- `posture()` returns `compact`;
- `rim()` returns `.dock-rim`.

| witness | HEAD (same session) | D2-B prototype |
|---|---|---|
| W1 corners | **9/32**. Rail 19.8 px, sidebar short-viewport 16.5 px, morph frames 4.6-6.3 px, vmorph frames 5.9-11.9 px off circular (Chromium) | **32/32**. Worst 0.137 px (Chromium) and 0.048 px (Playwright WebKit), on every morph frame sampled too |
| W2 run | **0/10**. Ring cut 2.5/2.5 px on long runs; fitting runs are scroll containers in 80/80, 266/266 and 237/237 frames | **10/10**. Cut 0/0 (clipped 4.25 = free 4.25; hover 4.35 = 4.35); fitting runs are scroll containers in 0/77, 0/281, 0/230 frames (Chromium) and 0/59, 0/197, 0/176 (Playwright WebKit) |
| W3 morph | **0/14**. First expand is one 387.66 px frame at 632 ms in a 545 ms window; warm faces out 147-158 px; content and swap changes land in one frame (179.33, 244.98 px) with no window | **14/14**. Windows 227-264 ms against allowances 253-285 ms (clock 210); largest step ×0.64-0.66 of the bound; faces out ≤ 0.14 px; dead landings, 0 reversals, 0 two-owner frames |
| W4 state | **4/16**. No compact input; a coarse tap latches scale 1 → 1.1 and fires 1 click | **16/16**. Compact 214.13 → 101.59 px; enter 88, exit 40, 1 flip; reduced motion shows 0 intermediate frames on compact and on posture; a coarse tap pins with 0 clicks and no latch |
| W5 rim | **0/10**. No dock rim; the composed `ScrollProgressRim` paints 71-210 device px outside the plate | **10/10**. Rim ink 1444 / 196 / 1264 / 198 / 752 device px, 0 outside (Chromium); 1442 / 194 / 1266 / 198 / 748 (Playwright WebKit) |

**W3 variance.** The final build ran W3 three times (`out/runs/W3-d2b`, `out/rep2`, `out/rep3`, each by `w3-morph.mjs --build … --adapter …`), 14/14 each time.

| run | windows | smallest margin to the allowance |
|---|---|---|
| 1 | 227-264 ms | 8.4 ms |
| 2 | 228-243 ms | 10.4 ms |
| 3 | 226-277 ms | 2.4 ms |

It passes, and the margin is thin (C-2). One development run of W3 alone showed swap-short in Chromium at ×1.21 (12.19 px in a 3.1 ms frame). Its JSON was overwritten, and C-3 reproduces the cause with saved JSON.

## 4 · Public API and consumer impact

**Public API.**
- GlassDock gains three props:
  - `scrollSource?: HTMLElement | Window | (() => HTMLElement | Window | null) | null` (no selector string, K-4);
  - `compactOnScroll?: boolean`;
  - `rim?: boolean`, for the dock's own rim reading `scrollSource`.
- The charter's `#rim` seat is not needed, and a slot would let a consumer rim paint outside the silhouette again (HEAD's W5 reading).
- New facts:
  - `.compact` on the root (a posture class, K-10);
  - `data-overflowing` on the run;
  - `data-morphing` keeps its role as the settle signal (K-10);
  - `data-posture-morph` is internal.
- DockControl does not change. The exposes (`expanded`, `isPinned`, `isHeld`, `expand()`, `collapse()`, `keepOpen()`, `release()`) do not change.
- Removed (E-1):
  - `useDockMorphOrchestrator` and `useDockExpandedSize`. Both are internal: `src/components/dock/index.ts` exports only `useDockSearch` and the `useDockState` types from `composables`;
  - the `--dock-expanded-px`, `--dock-live`, `--dock-size-scale` and `--dock-t` morph machinery;
  - the scale and counter-scale;
  - `useDockSearch`'s three scroll options.
- Nothing outside the dock reads the removed parts. `grep` over value.js and keyframes.js outside `docs/` and `bench/`, and over fourier-analysis and chicago, finds 0 hits for any of the retired names.

| consumer (X.md) | what changes for it | evidence |
|---|---|---|
| value.js (M-1, M-2; pinned to 7.0.0) | nothing it reads. **A-1 mount veil:** the first RO delivery records rest without a morph, so there is no mount morph to veil. **K-15:** the ancestor scale is divided out at the retarget. **X-8 band floor:** stays, because the prototype does not publish the cross extent | code reading; not measured on value.js's composition. The ancestor rotate is C-6 |
| keyframes.js (M-3, M-4) | **A-2 font wait retires:** no endpoint is ever taken against a fallback face. It uses no compact rung (no document scroll, K-34) | Q1. K-18 View Transitions and M-4's wide `#collapsed` are unmeasured (§6) |
| fourier-analysis (M-5 to M-8) | **X-4 / K-14:** a consumer width on `.expanded` is the endpoint. With `width: min(900px, calc(100dvw − 1rem))` the morph lands on 900 px (root 900) with no one-frame jump; HEAD's M-C reading is one 858 px frame. **K-11 / M-D:** the anchored edge drifts 0 px. **K-34:** `scrollSource` takes `<main>`. **K-21:** the compact rung leaves the block extent unchanged (56 → 56), so `<main>`'s height does not move | `q7-extent.mjs` → `q7-out.json` (C-3 has its early-frame step), Q4, q7 K-21 |
| chicago (M-9) | **X-1 and X-2 retire:** the `fit` scene is the C-2 composition, and W1 and W2 are green without either override. **W-3t:** fixed by the `(hover: hover)` floor. Compact via `scrollSource: window` | W1 32/32, W2 10/10, W4 coarse cells |

## 5 · Engines

| property | Chromium | Playwright WebKit | Safari |
|---|---|---|---|
| RO extent before the first expand, fonts included (Q1) | right in every in-flow and max-content cell; re-delivered in the swap's frame | right; first render waits for the swap font | UNMEASURED (owner's safaridriver checkbox) |
| layout-sum flag vs truth (Q2) | 0 / 129 wrong, DSF 1 and 2 | 0 / 129 | UNMEASURED (owner's safaridriver checkbox) |
| restyle per frame: inherited scalar / six registered / plain (Q3) | 261-425 / 66-70 / 59-68 µs | 1497-1992 / 84-138 / 34-49 µs | UNMEASURED (owner's safaridriver checkbox) |
| anchored-edge drift and face-persistent overlap (Q4) | 0 px; 0 px | ≤ 0.008 px; 0 px | UNMEASURED (owner's safaridriver checkbox) |
| `scrollend` lag after a wheel gesture (Q5) | 0 ms (a `scrollend` per synthetic wheel) | 677-700 ms | UNMEASURED (owner's safaridriver checkbox) |
| dead `--chrome-collapse-t` on the dock (Q6) | written, not read | written, not read | UNMEASURED (owner's safaridriver checkbox) |
| W1-W5 on the prototype | 32/32 · 10/10 · 14/14 · 16/16 · 10/10 across both engines | (included in the totals) | UNMEASURED (owner's safaridriver checkbox) |
| consumer-width morph (K-14): landing, worst early step / bound | 900 px; ×1.38-2.65 | 900 px; ×0.78-1.01 | UNMEASURED (owner's safaridriver checkbox) |

## 6 · Named counterexamples

- **C-1 · `display: contents` seat groups blind the flag (K-12).** Measured by `node $R/probes/q8-contents.mjs $R/out/builds/d2b` → `q8-out.json`: the long scene (need 664 px, budget 360) with its seats moved into one `display: contents` group. The flag reads **false**, and the run computes `overflow-x: visible` with 328 px of overflowing content, on both engines. An ordinary block wrapper still reads true. The flag sums `run.children`, and a `display: contents` child has no box. fourier M-5 and chicago M-9 group seats this way. Fix: sum the run's flex items through `display: contents`.
- **C-2 · The morph window passes with little room.** W3 margins were 8.4, 10.4 and 2.4 ms over three runs. The landing criterion (every edge within 0.5 px) lands a 387.66 px morph at 258.8 ms of spring time (computed, `$R/spring.mjs`), while the rung clock is 210 ms (the 2 % band). A dead landing and the 210 ms clock cannot both hold for large D without truncation.
- **C-3 · The spring's first frame is 16.667 ms regardless of elapsed time.** keyframes.js `RAFPlayback.drive` uses `this._lastFrameT ? n - this._lastFrameT : 16.667` (`node_modules/@mkbabb/keyframes.js/dist/sequence-BvpIpCGp.js`). On a 798 px consumer-width expand, the first morph frame reads exactly 102 + 798·s(16.667 ms) = 141.7 px on both engines (s = 0.0497). Chromium's next frame then advanced about 21 ms of spring time in an 8 ms frame: ×1.38 and ×2.65 of W3's continuity bound in two runs recorded on rAF frame timestamps. Playwright WebKit stayed at or below ×1.01. D2-B inherits this from the spring; it is not caused by the family.
- **C-4 · Compact pops.** Seats that leave for the compact rung go `display: none` in one frame while the plate morphs (D-1). They should be held and clipped by the closing aperture, or faded. Not prototyped.
- **C-5 · Compact changes the inline footprint (K-21).** −111.75 px inline on the test composition, block unchanged. A floating dock is unaffected. An in-flow dock with inline neighbours reflows them. This is not reserved.
- **C-6 · Ancestor transforms beyond scale (K-15).** The inversion divides by the ancestor scale cached at the retarget. value.js lands its band with a translate and a rotate. A rotate, or a scale that changes during a morph, is not handled. Unmeasured.
- **C-7 · The compact selector reads direct run children (K-12).** With one wrapper around every seat (M-1, M-4, M-7, M-8), the wrapper holds the current seat, so nothing is hidden and there is no compaction. With a `display: contents` group (M-9), the whole group stays. This follows from the selector; unmeasured on those compositions.
- **C-8 · A seat's own animated size can re-flip the flag near the budget** (route 3's `linear()` inline-size transition, 0.3 % overshoot). Unmeasured.
- **C-9 · One forced layout per mutation batch.** The microtask inversion reads layout once per batch, including batches that change nothing geometric (a `class` toggle). It is the cost of cure 2, bounded by batching and unmeasured on busy consumers.
- **C-10 · During a collapse the plate is larger than the root.** Its `pointer-events: auto` then absorbs clicks over the shrinking glass for about 250 ms, and an ancestor that shrink-wraps the dock with `overflow: hidden` clips the outgoing edges (K-16). Unmeasured.
- **C-11 · The dock rim has no accessible semantics.** It is a child of the `aria-hidden` plate. Whether a scroll-progress duplicate needs a `progressbar` role is an owner call. VoiceOver cannot be driven from a seat.
- **C-12 · The floor edit reaches outside the dock.** `.glass-capsule-hover:hover` under `(hover: hover)` changes every capsule-hover consumer, not only dock seats.
- **C-13 · Pill ↔ card radius (W-2) was not prototyped.** The root still lerps `9999px → card`. The harness W1-W5 do not cover a shape change.

## 7 · Open gaps

1. Real Safari: every cell is UNMEASURED (owner's safaridriver checkbox).
2. The direct `opacity` write that drops the last inherited scalar (§2 item 7): its cost is inferred from Q3 V3 and V4, not prototyped.
3. Paint and raster cost in Playwright WebKit: traced only in Chromium.
4. Consumer compositions not run on the prototype: M-4 and M-8's wide `#collapsed`, value.js's ancestor rotate, keyframes' View Transitions (K-18), fourier's real AnimationControls (only a synthetic 900 px rule was run), M-6 itself.
5. C-1's fix (flex items through `display: contents`) and C-7's selector fix, not prototyped.
6. The compact rung was measured horizontal only, and not at 390 px phone width (K-40).
7. The spring's first-frame dt (C-3) belongs to the spring. W3 has thin margins until it is fixed there.
8. `useDockSearch`'s scroll options and the dead `useDockMorph.ts` / `dockMorphMeasure.ts` are still in the prototype tree.
9. The sub-pixel first-frame reversal in Q4 expands (≤ 0.098 px): cause not isolated.

## 8 · Artefacts

All under `$R`:
- probes `probes/q1-ro-fonts.mjs`, `q2-flag.mjs`, `q3-restyle.mjs`, `q3b-trace.mjs`, `q4-anchor.mjs`, `q5-scroll.mjs`, `q6-chrome.mjs`, `q7-extent.mjs`, `q8-contents.mjs`, each with `*-out*.json`;
- spring figures `spring.mjs`;
- adapter `adapter-d2b.mjs`;
- harness runs `out/run-head.txt`, `out/run-d2b-final.txt` (plus `-v1`, `-v2`, `-v3` from development), JSON in `out/runs/W*-{head,d2b}/`, W3 repeats in `out/rep2/` and `out/rep3/`.

The worktree is removed before return. The prototype's source survives in scratch as `$R/d2b-prototype.patch` (532 lines, tracked files against `f57a3c1f`) and `$R/prototype-new/` (the three new files).
