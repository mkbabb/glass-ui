# D2 · pass 1 · D2-D · the drawn silhouette (research)

| field | value |
|---|---|
| seat | D2 pass 1, research seat for family D2-D: the plate is one parametric path, used as clip, hit region, edge, shadow source and rim track |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | brief named `5804d8cc`; the worktree was cut at `3d56e423`, the checkout read `7970797f` at the end, all through docs-only commits (`git diff --stat 5804d8cc HEAD -- src` empty at the cut) |
| read | `PORTFOLIO.md` §0-2 and the D2-D section and its §6/§7 rows only; `pass-1/W.md`, `pass-1/X.md`, `harness/HARNESS.md` and the harness sources; O-64 (`BK/coordination/valuejs-outbound-2026-09-23-kf-w13r-dock-morph.md`); the dock sources named below. No other family's section was read |
| engines | headless Chromium 149.0.7827.55 and **Playwright WebKit** (Playwright 1.61.1, build 2311), from node, Playwright imported from `glass-ui/node_modules`. Real Safari 26.4: **UNMEASURED (owner's safaridriver checkbox)** in every row |
| scratch root | `S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-D-research/`. Micro-probes `S/q/q1*.mjs … q7b.mjs`; prototype diff `S/prototype.diff` (733 lines); harness runs `S/out/runs/*-d*/`; captures `S/q/q5out/`, `S/q/q6out/`, `S/mid-collapse-stack.png`, `S/out/dbg/` |
| writes | this file in the checkout. The worktree was removed with `git worktree remove --force`. One disclosure: inside the worktree I ran `git add -N` on the two new files to get a `--stat`, a write to that worktree's own index, gone with the worktree |

## 0 · Findings in one table

| # | question | answer | evidence |
|---|---|---|---|
| Q1 | one `shape()` template for pill, rounded, card, vertical, both cap states | **Yes.** One 9-command list with four corner radii covers all of them; the orientation only decides which two corners take κ_start. Radius error 0.08-0.12 px (Chromium), 0.01-0.03 px (Playwright WebKit). Registered parameters (e, κ) interpolate on WAAPI, `@keyframes`, scroll timelines and rAF writes in both engines; `clip-path` itself interpolates between identical command lists and snaps (0 animations) between different ones | §1 |
| Q2 | animated `clip-path: shape()` over `backdrop-filter`: compositor or main thread | **Main thread, in both engines**, for `shape()` keyframes, `inset()` keyframes (HEAD's mechanism) and a registered parameter feeding `shape()`: a 1.2 s main-thread block freezes the plate 1,160-1,200 ms. Chromium's trace: `compositeFailed 8192`, unsupported `clip-path` / `--e`. Controls calibrate the method. Safari 26.4 UNMEASURED | §2 |
| Q3 | sibling `drop-shadow` and a drawn edge vs `--shadow-dock` and `border: 1.5px` | Shadow: **matches if the blur is halved** (`drop-shadow` takes a standard deviation; `box-shadow` a blur radius): 0 differing pixels further than 0.5 px from the edge, both engines. The token cannot be reused literally. Edge: SVG stroke and an `evenodd` ring are pixel-identical to HEAD's border in Playwright WebKit; **Chromium paints HEAD's 1.5 px border as 1 CSS px** (2 device rows), so the drawn 1.5 px edge is 0.5 px heavier than today's Chrome dock | §3 |
| Q4 | does `clip-path` remove the reserved footprint from hit testing | **Yes, in both engines, on one condition:** the dock root is `pointer-events: none`. With the root at `auto` (HEAD) the box absorbs every press outside the silhouette. On the prototype the reserved corner and the mid-morph reserved footprint both deliver to the page | §4, §7.4 |
| Q5 | a 3 px stroke around a 28 px arc: progress or a second border | **Progress, if the rim is the lower half only.** The fill's leading end lands within 0.5 px of the arc-length target in both engines. A full-loop rim at p = 1 is indistinguishable from a coloured border ring; the 18 % track reads as an inner groove line | §5 |
| Q6 | V↔H as path interpolation with crossfading seats | **No.** The in-between is a large empty card: at t = 0.5 the plate is 232 × 308, 3.2× the horizontal pill's area and 2× the vertical's, with both seat sets faded and overhanging it. A stadium law (r = min(W, H)/2) makes it a blob instead. The plate interpolates; it does not read as the dock turning | §6 |
| probe | the prototype on the real dock | **W5 8/10** (HEAD 0/10; the 2 fails are the absent compact rung). **W3 faces-out 0 px in all 14 cells** (HEAD 147-158 px) and warm steps at ×0.66 of the bound, but W3 stays 0/14 on the endpoint, window, ring and content rows D does not own. **W1 12/32** with κ live, **28/32 with κ disabled**, and the last 4 are a Chromium paint artefact of the probe (§7.2). W2 0/10 and W4 4/16 unchanged | §7 |

## 1 · Q1 · one command template

**The template.** Four corner radii, box edges x0, x1, y0, y1:

```
shape(from calc(x0 + tl) y0,
  hline to calc(x1 - tr),  arc to x1 calc(y0 + tr) of tr cw,
  vline to calc(y1 - br),  arc to calc(x1 - br) y1 of br cw,
  hline to calc(x0 + bl),  arc to x0 calc(y1 - bl) of bl cw,
  vline to calc(y0 + tl),  arc to calc(x0 + tl) y0 of tl cw,  close)
```

Horizontal: tl = bl = r_s, tr = br = r_e. Vertical: tl = tr = r_s, bl = br = r_e. Each corner is r·(1−κ) + cut·κ with r = min(rest, cross/2). A zero-length `hline` (vertical pill, 64 wide, r = 32) is legal and keeps the list identical.

**Static paint** (`q1.mjs`, magenta silhouette, per-corner circle fit at the expected radius, DSF 2):

| case | Chromium max error | Playwright WebKit |
|---|---:|---:|
| pill 400×56 | 0.084 | 0.027 |
| rounded 400×56 (16) | 0.122 | 0.020 |
| card 400×120 (24) | 0.106 | 0.027 |
| vertical pill 64×560 | 0.102 | 0.010 |
| pill, start cut (16/28) | 0.121 | 0.027 |
| pill, end cut (28/16) | 0.122 | 0.027 |
| vertical, both cut | 0.122 | 0.020 |
| pill, κ_s = 0.5 (22/28) | 0.121 | 0.027 |

`CSS.supports` is true in both for the simple form, for `arc … of 50%` and for `evenodd` with `move to`. The CSS `d` property: `path()` true in Chromium and false in Playwright WebKit, `shape()` false in both. So an SVG path's geometry cannot come from CSS on WebKit; it has to be an attribute.

**Interpolation.**

| driver | Chromium | Playwright WebKit |
|---|---|---|
| paused transition on registered `--ks`, `--e` at 50 % | computed 0.5 / 300 px; paint 299.99 × 56, left r 22, error 0.121 | computed 0.5 / 300 px; paint shows the **end** state (199.99 wide) |
| running transition, WAAPI and rAF writes on `--e` (`q1b`) | paint follows computed within 3-5 px (one frame) for all three | WAAPI and rAF follow computed within 0.5 px; the transition **paints its end value from the first screenshot on** |
| `@keyframes` on a registered κ, time and scroll timeline (`q1c`) | paint error vs computed ≤ 0.123 px at κ 0 / 0.25 / 0.5 / 1 | ≤ 0.032 px |
| `clip-path` shape→shape, identical lists (pill → start cut) | 1 animation, midpoint `from 22px`, paint error 0.121 | same, 0.027 |
| pill 400×56 → vertical 64×560 as literal shapes | 1 animation, midpoint 232 × 308, r 30 | same |
| pill → plain rectangle (different lists) | 0 animations, discrete | same |

The WebKit transition row is an instrument artefact, not a clip-path fact: `q1d.mjs` shows a plain `width: var(--e)` bar under the same transition reading `287.9 px` computed and `100` painted at 605 ms, and `100` computed thereafter. Playwright WebKit's screenshot finishes running CSS transitions. The dock's extent runs on rAF writes and κ on scroll-timeline keyframes, both of which paint correctly in both engines.

**Verdict.** One template, identical structure in every rung and orientation, so any parameter change is continuous by construction. κ and e interpolate as registered numbers and lengths; nothing interpolates `clip-path` as such.

## 2 · Q2 · compositor or main thread

`q2.mjs`: each case animates for 3 s over a striped page, the plate carrying `backdrop-filter: blur(8px) saturate(1.4)`. At 0.8 s the page busy-blocks its main thread for 1.2 s. The video (Playwright `recordVideo`) is decoded by ffmpeg at 25 fps and the plate's painted width is read per frame. The number is the longest run of identical mid-flight frames.

| case | Chromium freeze | Chromium trace (`Animation` events) | Playwright WebKit freeze |
|---|---:|---|---:|
| `transform: scaleX` (control) | 0 ms | `compositeFailed 0` | 40 ms |
| `width` (control) | 1,200 ms | `8192`, unsupported `width` | 1,160 ms |
| `clip-path: inset(… round)` keyframes (HEAD's mechanism) | 1,160 ms | `8192`, `clip-path` | 1,160 ms |
| `clip-path: shape()` keyframes | 1,200 ms | `8192`, `clip-path` | 1,160 ms |
| registered `--e` keyframes feeding `shape()` | 1,200 ms | `8192`, `--e` | 1,200 ms |

Both engines run every clip-path animation on the main thread; a registered custom property is not composited in either. The calibration holds: transform keeps moving, width freezes. So D's extent morph and its κ scrub cost a style recalc and a clip re-raster per frame on the main thread, the same class as HEAD's `inset()` clip and border-radius cap (both also main thread by this measure). Safari 26.4's threaded scroll-driven animations (W §1) cover accelerated properties; whether a scroll-driven registered number that feeds `clip-path` stays off the main thread there is **UNMEASURED (owner's safaridriver checkbox)**. My expectation, not a measurement: it does not.

## 3 · Q3 · the shadow and the edge

`q3.mjs` / `q3b.mjs`: each variant renders alone on white at 400×56 and 64×560. The shadow colour is held at the token's 14 % and the edge colour is opaque black, because the question is geometry; colour is the same token either way.

| variant vs HEAD recipe | Chromium: max diff / pixels > 8 / mean | Playwright WebKit |
|---|---|---|
| `drop-shadow(0 0 20px)` sibling, complement-clipped, vs `box-shadow: 0 0 20px` | 73 / 320 / 1.263 | 61 / 308 / 1.045 |
| `drop-shadow(0 0 10px)` sibling, same | 73 / 322 / **0.182** | 62 / 308 / **0.081** |
| SVG `rect` stroke 1.5 px, inset 0.75 | 255 / 2,031 / 1.198 | **0 / 0 / 0** |
| `evenodd` `shape()` ring, 1.5 px | 255 / 2,309 / 1.232 | **1 / 0 / 0** |

Where the differences sit (`q3b`, signed distance to the stadium edge):
- **Shadow.** All 322 (Chromium) / 308 (WebKit) differing pixels lie within ±0.5 px of the edge on the caps: the anti-aliased seam of the complement clip, which the plate and its edge cover in the real dock. Beyond 0.5 px, `drop-shadow(10px)` equals `box-shadow(20px)`.
- **Edge.** Chromium paints `border: 1.5px` as 2 device rows (1 CSS px) at DSF 2; the SVG stroke paints 3. WebKit paints both as 3. So HEAD's Chrome dock already shows a thinner edge than its Safari dock, and a drawn edge makes both 1.5 px.

What it implies for D: `--shadow-dock` (a `box-shadow` list) cannot feed `drop-shadow()` unchanged. The dock needs its elevation in a second form, 10 px / 6 px standard deviations. One fact in two syntaxes is a P-3 cost; the honest cure is a token in σ that both forms derive from.

## 4 · Q4 · hit testing

`q4.mjs`: a 600×56 root reserves the footprint, and the plate's silhouette is 300 px, centred (a mid-morph state). Presses are real `mouse.click`s plus `elementFromPoint`.

| point | root `pointer-events: none` (D), both engines | root `auto` (HEAD-like), both engines |
|---|---|---|
| silhouette interior | plate | plate |
| cap corner, 1.5 px in from the bbox corner | **page** | dock box |
| reserved footprint, left and right | **page** | dock box |
| seat | seat | seat |
| just inside the arc | plate | plate |

`clip-path` removes the clipped area from hit testing in both engines. It retires `[data-reserve]` only because the root stops being a hit target at all. Two consequences:
- **Hover still works.** `mouseenter`/`mouseleave` on the root fire from its descendants, and the plate fills the gaps between seats.
- **Every in-flow wrapper has to opt out too.** The active layer, the persistent groups and any consumer wrapper box are rectangles that would absorb the reserved corners. The prototype sets them to `none` and re-enables their descendants. Consumer wrappers inside seats (X.md K-12: four mounts wrap every seat) inherit `auto` and are rectangles again, which is a counterexample for the corner row at depth.

## 5 · Q5 · the rim as a stroke on the silhouette

`q5.mjs`: a 3 px stroke with round caps. Centre line inset 4.5 px (1.5 px edge, 1.5 px gap, half the stroke). `pathLength="1"`, `stroke-dasharray: 1 1`, `stroke-dashoffset: 1 − p`. Three forms: the lower half of a 400×56 pill (from 9 o'clock round to 3 o'clock), the lower half of a 56×56 collapsed circle, and a full loop.

| p | fill end, Chromium (css px) | Playwright WebKit | expected (arc length) |
|---|---:|---:|---:|
| 0.25 | 127.0 | 127.0 | 127.04 |
| 0.50 | 231.5 | 231.5 | 231.5 |
| 0.75 | 335.5 | 336.0 | 335.96 |

Reading the captures (`S/q/q5out/{chromium,webkit}-rim-grid.png`; this is my eye, not a measurement):
- **Lower half: reads as progress.** At p = 0.03 the fill is a short hook in the leading arc. From p ≈ 0.1 on it is an arc plus a line. At p = 1 it is a smile under the plate. It never closes, so it never reads as a border.
- **56 px collapsed circle: reads as a gauge** (a semicircle filling). This is the strongest of the three.
- **Full loop: fails.** From p ≈ 0.6 it climbs the trailing cap onto the top edge, and at p = 1 it is a blue ring, a second border.
- **The track.** At 10 % it measured below the harness's ink threshold (W5 read a 3 px dot). At 18 % it paints but reads as an inner groove line under the bottom edge. That is the second-border risk that remains even for the lower half, and it is a tuning question with no measurement behind it.

So the rim's sub-path is the leading half of the silhouette, never the loop. On the dock itself (`S/out/dbg/chromium-rim-50.png`, the rim scene at 50 % page scroll), the fill hooks round the leading arc and runs half the bottom edge, inside the glass.

## 6 · Q6 · the V↔H morph as a path

`q6.mjs`: horizontal 400×56 → vertical 64×560, parameters lerped, the row fading out over the first half and the column fading in over the second. Captures `S/q/q6out/vh-a.png` (r = cross/2) and `vh-b.png` (r = min(W, H)/2).

| t | box | r (a) | r (b) | area |
|---|---|---:|---:|---:|
| 0 | 400×56 | 28 | 28 | 22.4k |
| 0.2 | 333×157 | 29 | 78 | 52.2k |
| 0.4 | 266×258 | 30 | 129 | 68.4k |
| 0.5 | 232×308 | 30 | 116 | 71.5k |
| 0.6 | 198×358 | 30 | 99 | 71.1k |
| 0.8 | 131×459 | 31 | 66 | 60.2k |
| 1 | 64×560 | 32 | 32 | 35.8k |

Under law (a) the middle of the morph is an **empty rounded card** 3.2× the pill's area, with both seat sets near zero opacity; under law (b) it is a round blob. Seats laid out at either endpoint overhang the in-between plate (the vertical column at t = 0.6 hangs 100 px below it). The plate interpolates continuously, but the motion reads as inflate-then-deflate, not as the dock turning. D can express the V↔H morph more cheaply than a box can. It does not make it read well, and it does not answer the `index.ts` note for the seats. A pivot would need a rotation, which is a transform and outside the path. So the retired-facility ruling this implies is: V↔H stays struck, and D does not revive it.

## 7 · The probe on the real dock

### 7.1 What was built (worktree, `S/prototype.diff`)

12 files changed, +373 / −135.

- **`styles/silhouette.css`** (new, 262 lines):
  - **The path.** It is written once, in one rule whose selector lists every consumer: `.dock-plate`, `.dock-edge`, `.dock-shadow`, its fill, and `.glass-dock[data-morphing] > .dock-controls`. Unregistered custom properties substitute `var()` on the element that declares them, so each consumer resolves the same text against its own `--dock-i` (inset). The path is `--dock-sil`, and its complement is `--dock-sil-outside` (`evenodd`, big rect plus S).
  - **Radii.** r = clamp(0, rest, cross/2), which closes W-2's negative overshoot, with rest per shape: pill 9999 px, rounded `--radius-card`, card the lerp on `--dock-expand-t`. The cut is `min(--dock-cap-cut, r)`. The radii resolve on `.glass-dock` (κ = 0, read by the aperture) and on `.dock-frame` (κ live).
  - **κ.** κ_s and κ_e are registered `<number>`s with `inherits: true`, animated on `.dock-frame` by the existing `--dock-run` timeline over `0 min(pitch, 50%)` and `calc(100% − min(pitch, 50%)) 100%`.
  - **Extent.** `--dock-e` is `100%` at rest and `var(--dock-live)` (the spring's px blend, layers.css) while `[data-morphing]`, centred: x0 = 50% − e/2.
  - **Edge.** `.dock-edge` fills everything outside S inset by 1.5 px; the plate's own clip bounds it.
  - **Shadow.** `.dock-shadow` carries `filter: drop-shadow(0 0 calc(6px + 4px·t) …)` over a fill clipped to S, and its own clip keeps only what lies outside S.
  - **Aperture.** `.dock-controls` takes `clip-path: var(--dock-sil)` and `justify-content: center` only while morphing, so at rest nothing clips a seat.
  - **Controls box and hit region.** `.dock-controls` becomes a real flex box whose border box is the dock box, with the root's padding moved onto it. The root is `pointer-events: none`.
  - **Rim.** The stroke styles for `.dock-rim`.
- **`GlassDock.vue`.** The new DOM is `.dock-frame > (.dock-shadow > i, .dock-plate > (.dock-edge, svg.dock-rim > track + fill))`. It also adds the `progressSource` prop.
- **`composables/useDockRim.ts`** (new, 75 lines). The rim path is written as an SVG attribute (the CSS `d` is not on WebKit, §1) from the dock box on a ResizeObserver. The progress is a scroll listener on the source (element, window or getter), written as `--dock-progress`.
- **`dockMorphMeasure.ts`.** It writes `--dock-cross-px` beside the two endpoints: `arc … of` needs a length, and a percentage radius is per-axis (the lens again). `cq` units need a size container, and no dock box can be one without losing its intrinsic size.
- **Struck.**
  - the box `scale` morph and the counter-scaled faces (`shape.css`);
  - `--dock-size-scale` (`layers.css`);
  - the four `gl-dock-cap-*` border-radius keyframes and the plate's animation (`run.css`);
  - the plate's `inset()` clip, `--dock-t` alias and `border` (`dock.css`);
  - `[data-reserve]` (`dock.css`);
  - the PRM `--dock-t` pin (`dock.css`);
  - the box's `box-shadow` (`shell.css`, `morph.css`).
- **Checks.** `vue-tsc --noEmit` exit 0. Built with `harness/build.mjs` into `S/out/builds/d`, plus a diagnostic `d-nokappa` with `.dock-frame { animation: none }`.
- **Adapter.** `S/adapter-d.mjs` differs from `adapter-head.mjs` in six places:
  - `plate()` is `.dock-frame > .dock-plate`;
  - `extent()` is the centred silhouette computed from the spring's inputs while morphing;
  - `paintingSeats()` intersects each seat with that extent while morphing, since the aperture is the same path;
  - `rim()` returns `.dock-rim`;
  - `rimProps` is `{ progressSource: "@window" }`;
  - the WebKit crash shim now pins `.dock-edge`'s background, where the nested `color-mix()` moved.

### 7.2 Witness results (`node harness/run.mjs --build S/out/builds/d --adapter S/adapter-d.mjs`)

| witness | HEAD (HARNESS.md §5) | D prototype | what moved |
|---|---|---|---|
| W1 | 9/32 | **12/32**; **28/32** with κ disabled (`d-nokappa`) | rest and morph frames are exact stadiums once κ is not armed (below) |
| W2 | 0/10 | 0/10 | unchanged: ring cut 2.5 px (route 1), 318 px range on the hidden layer (route 2), 211/211 container frames (route 4). D does not own the run |
| W3 | 0/14 | 0/14 | **faces out 0 px in every cell** (HEAD 147-158 px); warm steps ×0.66 of the bound (continuous); first expand still one 387.66 px step; window 542-550 ms vs a 210 ms clock; 0.34 / 0.28 px ring; content and swap steps 179.33 / 244.98 px with no window |
| W4 | 4/16 | 4/16 | unchanged; D borrows the state composable |
| W5 | 0/10 | **8/10** | every rung, horizontal and vertical, expanded and collapsed, both engines: 0 rim pixels outside the silhouette, 888-2,158 device px of ink. The 2 fails are the absent compact rung |

**Reading W1.**
- **With κ live, the cut arms on every route that makes the run a scroller:**
  - the rails, by design: an overflowing run gets its cut cap, measured mean r 34.3 vs 32;
  - the collapsed morph docks, by route 2: the hidden full face is a live scroller, 4.6-6.0 px error at rest;
  - WebKit's hovered fit dock, by route 4: 4.59 px.

  So D makes the cut exact (Q1) but does not decide when it is allowed. With routes 2-4 left open, the cut still lands on docks that fit.
- **W1 as written forbids the cut cap itself:** every rest must be cross/2. The rail cells therefore fail on any family that keeps the cap grammar. That is a ruling on the cap, not a paint defect.
- **With κ off, the four remaining fails are Chromium's warm-morph frames.** All read 6.265 / 6.975 px, constant across frames and widths. `S/dbg-w1b.mjs` bisects the probe paint during a warm collapse:

| probe paint variant, mid-collapse, Chromium | 60 ms | 400 ms |
|---|---|---|
| magenta, everything else hidden | 0.128 px | 0.133 px |
| + `backdrop-filter: none` | **6.246 px** | **6.246 px** |
| + `box-shadow: none` | 0.104 px | 0.084 px |
| + `::after` hidden | 0.106 px | 0.133 px |

The harness's plate mode sets `backdrop-filter: none`. Inside the dock, with the path changing per frame, Chromium then paints the `shape()` clip with wrong corners. With the glass's own backdrop filter the same frames read 0.13 px. I could not reproduce it on a bare element (`q7.mjs` static, `q7b.mjs` rAF-driven: 0.08-0.13 px with and without the filter). It is real Chromium paint behaviour inside this DOM, and it only hides behind the fact that the shipped plate always carries a backdrop filter. A consumer or preference that removes the filter from the plate would show it.

### 7.3 Mid-morph paint (`S/mid-collapse-stack.png`, Chromium, 4 frames of a warm collapse)

The plate stays a stadium at every width, the drawn edge and shadow follow it, and the leaving face is clipped cleanly by the aperture. It also shows D's first counterexample (§9, C-1): the incoming collapsed face (persistent Home plus the summary) is laid out in the reserved expanded box. The aperture hides it until settle, so a collapse shows the old row shrinking to an empty pill and then the new content appearing.

### 7.4 The family's born-RED witness (`S/born-red.mjs`, both engines)

| press | prototype, Chromium | prototype, Playwright WebKit | HEAD |
|---|---|---|---|
| rest, box corner +1.5, +1.5 (outside the arc) | page | page | dock box (Q4, `[data-reserve]` only when a wrapper opts in) |
| rest, box corner +4, +4 | page | page | dock box |
| rest, seat centre | seat | seat | seat |
| rest, glass between seats | plate | plate | plate |
| mid-collapse, reserved footprint (box 475..965, silhouette 614..826 / 604..836) | page | page | dock box |
| mid-collapse, inside the silhouette | plate | plate | plate |

The rim half of the witness: W5 above, 0 outside pixels in four rungs. The "three corner radii" half: pill, rounded and card at rest pass W1-style fits in `q1` (0.08-0.12 / 0.01-0.03 px). The born-RED witness is **green on the prototype**.

## 8 · The strongest form

What D must specify precisely to work:

1. **One path text, one resolution rule.** The command list is written once, in one declaration whose selector list names every consumer. Each consumer shares the dock box's geometry and differs only in `--dock-i`. The only other copy is the rim's leading-half sub-path, in `useDockRim.ts`, derived from the same box and radius. It must move to reading the frame's resolved radii, or it drifts under κ; today the plate's clip masks that drift, so W5 cannot see it.
2. **Its inputs, each with one owner:**
   - **cross.** The layout cross extent, measured once per resize. `arc … of` needs a length, and `cq` units need a size container that no intrinsically sized dock box can be.
   - **e.** The spring's main extent. Its endpoints come from whichever endpoint sub-choice is taken; D inherits W-6 and W-13 from it.
   - **κ.** One scroll timeline on the frame, with a sub-pitch-safe range.
   - **rest and cut.** Tokens by shape, clamped so r ∈ [0, cross/2] at every spring value.
3. **Anchor.** x0 = anchor-edge + (box − e)·a, with a ∈ {0, ½, 1} from the consumer's anchoring. The prototype hard-codes ½, which fails K-11 (fourier's right-anchored dock).
4. **The layout rule during the morph.** Rung content must be laid out about the silhouette, not across the reserved box. That rule is the whole of C-1 below, and the family is not finished without it.
5. **Hit region.** The root is `pointer-events: none`; only the plate and seats (at any depth) are `auto`. That makes "hit region = silhouette ∪ seats" a stated contract instead of a wrapper attribute.
6. **Elevation.** A σ token from which `--shadow-dock`'s box-shadow form derives, so one fact has one source.
7. **Rim.** The leading half of the silhouette, never the loop. Stroke 3 px, inset 4.5 px, track contrast tuned against the edge, fill on `pathLength` 1.

## 9 · Named counterexamples (the family's real weaknesses)

- **C-1 · The reserved box owns layout; the silhouette only hides it.** A warm collapse clips the incoming face to nothing and shows it at settle (§7.3). Content is laid out at the endpoint the box reserves (the larger), not at the path's current extent. So D moves W-7 from "faces outside the plate" to "faces invisible inside the plate", and it needs an endpoint-layout sub-choice to animate content at all. With `justify-content: center` during the morph, a centred dock's collapsed cluster lands where the settled box puts it, but the layers grid still spans the old width, so Home was clipped out in every captured frame.
- **C-2 · κ is exact and still wrong.** The cut is a clean arc per corner, but it arms whenever the run is a scroll container: the hidden layer (route 2) and a hover scale (route 4). D gives the lens a better shape without removing it from docks that fit (W1 12/32 vs 28/32).
- **C-3 · Main thread, both engines.** Every extent frame and every κ scrub frame recalculates style and re-rasterises a clip on the main thread (Q2). It is the same class as HEAD, not better. Under a busy main thread, the plate stalls while any composited motion around it keeps moving.
- **C-4 · A Chromium corner defect behind the backdrop filter.** Inside this DOM, a per-frame `shape()` clip on a plate without `backdrop-filter` paints 6.25 px off the arc (§7.2). The shipped plate masks it by always carrying a filter. The primary works in paint only while a second, unrelated property is present. By E-2 that is a fence to state in the contract.
- **C-5 · Wrappers are rectangles.** The corner pass-through (§7.4) holds for the prototype's DOM because it sets the active layer and persistent groups to `none` and re-enables their descendants. A consumer wrapper inside a seat slot (K-12) is `auto` again and absorbs the corner.
- **C-6 · The grasp register loses the clip.** `dock.css` drops the plate's `clip-path` while a grasp carrier is live, because a clip-path on the plate makes it a backdrop root for the carriers. Under D the clip is the silhouette itself. While held, the plate paints its whole box: a rectangle whose corners are the plate's `border-radius` (set equal to the radii at rest, so a held dock at rest still reads right), but wrong during a morph or a cut. The register and the silhouette cannot both own the plate's clip.
- **C-7 · Two elevation syntaxes and a second template use.** The shadow needs σ where the token holds a blur radius (Q3). The edge needs the template again at an inset. The rim path is a third derivation in TypeScript, because the CSS `d` property is not on WebKit.
- **C-8 · Chromium draws today's border thinner.** A drawn 1.5 px edge is visibly heavier than HEAD's Chrome dock (2 device rows vs 3) and equal to HEAD's WebKit dock. Parity with "today" is not one number.
- **C-9 · V↔H does not come back** (Q6).
- **C-10 · The rim track is a line under the bottom edge.** At a visible contrast it risks reading as a second edge (Q5). No measurement settles it.

## 10 · Public API and consumer impact

**API.**
- GlassDock gains `progressSource?: HTMLElement | Window | (() => HTMLElement | Window | null)`. It takes an element, window or getter, never a selector (K-4). The prop renders the rim.
- A compact rung is not part of D; it borrows the state composable.
- `--dock-cap-rest` is struck with no alias. `--dock-cap-cut` stays as the cut radius.
- New inputs: `--dock-sil-rest` per shape, and the κ properties, which are internal.
- `.dock-plate` stays the veil element (F-23 interface) but moves one level down, under `.dock-frame`.
- `.dock-controls` becomes a box.
- `[data-reserve]` is struck.

**Consumers** (X.md and a read-only grep of the four trees):

| consumer | what breaks or retires |
|---|---|
| chicago | `--dock-cap-rest: 9999px` (`style.css:130-131`) dies with the token (X-1 retires). `.page-dock .dock-run { overflow: visible }` (X-2) does not retire: D leaves the run to another sub-choice. The veil floor overrides still bind, since `.dock-plate` keeps the tier properties |
| value.js | `useContrastSafeColor.ts:152` reads `getComputedStyle(.glass-dock).backgroundColor`: unchanged (the box never painted). `useDockArrival.ts` screens out ScrollTimeline-driven animations in the dock subtree: D keeps two (now on `.dock-frame`), same class. Its local `.dock-layer` transition (X-12) and its reserve for the cross extent (X-8) are untouched. If D lands with a σ shadow token, its `--dock-h` shadowing is unaffected |
| keyframes.js | `expand()` and `--dock-layer-gap` unaffected. Its `#collapsed` face wider than the collapsed box (X.md M-A) is clipped by the silhouette during and after a collapse, so K-5's either/or is forced toward "the circle is the contract" |
| fourier-analysis | `CanvasControlsDock` is right-anchored (K-11): the centred aperture fails it until the anchor parameter lands. Its width on `.expanded` (X-4) is a second extent owner that D's `e` does not see: the silhouette would morph to the measured endpoint while the box sits at the consumer's width |
| all | Any consumer CSS that styles `.glass-dock`'s `box-shadow` (`--shadow-dock-override`) or padding re-points: the shadow lives on `.dock-shadow`, the padding on `.dock-controls`. `--shadow-dock-override` has no successor in the prototype |

Tests and demo: 21 files across `tests/`, `tests-visual/` and `demo/` name the morph and cap internals (PORTFOLIO §1.3). D strikes `--dock-size-scale`, the cap keyframes and the box scale, and adds `.dock-frame`, so every one of them re-points.

## 11 · Chrome and Playwright WebKit behaviour, in one place

| behaviour | Chromium 149 | Playwright WebKit | real Safari |
|---|---|---|---|
| template parses and paints, all rungs | yes, ≤ 0.122 px | yes, ≤ 0.032 px | UNMEASURED (owner's safaridriver checkbox) |
| parameter interpolation (rAF, WAAPI, keyframes, scroll timeline) | yes | yes (CSS transitions only under screenshot, instrument artefact) | UNMEASURED |
| animated clip over backdrop-filter | main thread | main thread | UNMEASURED |
| clip-path hit testing | exact | exact | UNMEASURED |
| `drop-shadow` = `box-shadow`/2 | yes | yes | UNMEASURED |
| `border: 1.5px` at DSF 2 | 1 CSS px | 1.5 CSS px | UNMEASURED |
| CSS `d` property | `path()` only | none | UNMEASURED |
| `pathLength` dash position | ±0.5 px | ±0.5 px | UNMEASURED |
| the in-dock corner defect without backdrop filter | 6.25 px | not seen | UNMEASURED |
| GlassDock mount | fine | crashes without the harness shim (nested translucent `color-mix()`, now on `.dock-edge`) | HARNESS.md: memory says it renders |

## 12 · Open gaps

- Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox), including whether Safari 26.4 keeps a scroll-driven registered number that feeds `clip-path` off the main thread.
- C-1 is not solved in the prototype. D needs the layout-about-the-silhouette rule, or an endpoint sub-choice that lays content out at the live extent, before W-7's "no face outside the plate" means "every face visible inside it".
- C-4 is not isolated to a minimal page. Its trigger inside the dock DOM is unknown beyond "no backdrop filter on the plate, path changing per frame".
- The anchor parameter (K-11) and the rim's κ-aware sub-path were specified, not built.
- The track contrast and the "second border" reading (Q5) are judged by eye from captures, not by any test.
- W3's endpoint, window, ring and content rows, and W2 and W4, belong to sub-choices D borrows; the prototype leaves them at HEAD's readings.
- The σ elevation token and a successor for `--shadow-dock-override` were not designed.
