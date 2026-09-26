# D2 · pass 2 · D2-G spec: the sliding aperture

| field | value |
|---|---|
| seat | D2 pass 2, D2-G RESEARCH + SPEC. Answers REGISTRY §6 questions 2-5 (question 1 is answered in `D2-G-block.md`), then specifies the route against §7.3 D2-G items 2-5 and §7.3 "Both" |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `04929544`; the checkout was at `e00fb901`. `git diff 04929544 e00fb901 -- src/components/dock src/styles` is empty (the only `src/` difference is the 10.1.0 configurator). The worktree was `04929544` + `floor.patch` |
| floor | `floor.patch` (sha256 `de432032f18918a1…`) applied clean in the worktree (`git apply --check`, then `git apply`). Every file:line below is in that patched tree unless it says HEAD |
| tool | `D2-G-spec-probes.mjs` (this directory, sha256 `4c5b7832c1d2a82b…`). `node D2-G-spec-probes.mjs <records> <scratch> all 2`. It imports `analyseMorph`, `DOCK_RUNG` and `springSpec` from `../harness/lib.mjs`, so the reversal row is H-3c's own code |
| records (source of record) | `D2-G-spec-records/d2g-spec-all.json` (sha256 `cf9e3e9071a60044…`): every cell with its 1-minute load, run 2026-09-26 06:13-06:15 UTC. Videos and decoded frames stayed in scratch (`…/scratchpad/D2/p2/D2-G-spec/scr-final/`) |
| engines | Chromium 149.0.7827.55 headless. **Playwright WebKit** 26.5 headless (the Playwright 1.61.1 build). The probe has no shim, so every WebKit cell is the **unshimmed** result and there is no shimmed one. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 8.9-20.8 across the recorded run. Every timing cell passed or failed identically on both reps; no cell needed the janky-cell re-run. Earlier trial runs (loads 10-24) are console output only and are not evidence |
| fences | no source edit in the checkout; no git write in the checkout; the worktree is removed before return. Writes: this file, the probe, its records |
| not read | the other route's pass-2 files (REGISTRY §7.4) |

---

## 0 · In brief

- **Q2, the compositor claim, holds on the whole composition.** With border caps, shadow halves, a face door and seats all on WAAPI transforms, the window keeps moving through a 1.2 s main-thread block in both engines: 156-164 px of travel inside the block, with a longest stall of 0-40 ms. The leading seat moves too: 78-82 px. The `width` control travels 0 px and freezes for 1,120-1,200 ms. The carrier's own solved keyframes, with an explicit shared `startTime`, also keep the compositor path: 180-188 px of travel in the block.
- **Q3, the velocity handoff, holds.** The retarget solves the spring from (x, v) read off the closed form at `document.timeline.currentTime` and hands WAAPI new keyframes. H-3c's reversal row passes in both engines on both reps: after the retarget the path fits the rung within 1.30-2.34 px against a tolerance of 8.65-9.24 px. A `wall` plant (v = 0) fails the same row at 15.86-25.65 px against 7.61-7.76. The screencast shows it in the compositor's frames: with the handoff, the extent carries on to 244 / 282 px before it turns; the wall turns at 204 px.
- **A clamped landing is owed.** The rung's analytic curve overshoots by M·D (0.3 %), which paints a 0.58-0.61 px ring after a reversal (O-64 R-3), and the `noclamp` plant shows it. Pinning each lane at its target on the first crossing lands dead in both engines. The crossing is at 266.1 ms from rest for every D, and the extent is within 0.5 px at 229.6-259.4 ms for D = 46-424 px.
- **Q4, the edge and the shadow: buildable with one primitive change.** The edge splits into the plate's straights plus two cap pieces carried by the doors, each clipped to the bands the straights already paint. The drop shadow is two stadium casters, clipped at the moving window centre. Against a whole reference stadium, at the real inks, the worst pixel is 11-12/255 with 0 pixels over 16/255, in both engines, at DPR 1, 2 and 3, at E = 56-480 and at anchors ½ and 0. Three plants are each caught: cap bands left in (59-61/255), caps missing (160/255), shadow not split (67-69/255). **The change:** the edge must be a box-shadow band at a whole device-pixel width (1 px), not `border: 1.5px`. Engines snap a border's width, and a clip band cannot follow the snap. `border: 1.5px` computes 1 px in Chromium at DPR 1-3; in Playwright WebKit it computes 1 px, 1.5 px and 1.333 px at DPR 1, 2 and 3. Decomposing it leaves a seam of up to 96/255 (amplified ink).
- **Q5, hit testing: the rectangle holds, the round does not.** A rounded `overflow: clip` clips hits to the window's rectangle in both engines: the reserve outside the window and a face seat clipped beyond it both hit the page. It does not clip hits to the rounded corners in either engine. `elementFromPoint` and a real press both land on the clipped child 35 px from the arc centre; only `clip-path` rounds hits. So Q-7 (a) holds to the window's bounding rectangle, and the four corner lunes (about 168 px² each on a 56 px cross) stay hittable. HEAD's root box is hittable in the same lunes at rest. The root must be `pointer-events: none`: the `rootauto` plant shows the reserve absorbing presses through inherited boxes.
- **The route's cost to beat B′'s:** its geometry costs zero main-thread writes per frame, and a retarget costs 0-2 ms for 12 lanes. The price is the box count: 2 doors, 2 counters, 2 caps and 4 shadow boxes, plus one face door and its counter, which makes 12 boxes, each carrying one transform lane. The ink lerp stays a main-thread lane.

**What this seat did not build:** the route on the real dock. Every number above comes from a static composition page that mirrors the dock's boxes and tokens. The prototype has to reproduce each one under H2.

---

## 1 · The probe composition

One reserved footprint (480 × 56, cross 56, R = 28) at (80, 122):

```
#fp  reserve, pointer-events: none
├─ #sL / #sR   overflow-x: clip; overflow-y: visible; meeting at the window centre c = (dL − dR)/2
│   └─ #kL / #kR   a transparent stadium, 2W long, box-shadow 0 0 20px (the dock's --shadow-dock), carried by its own edge
├─ #dL  door L: overflow: clip; border-radius R; translateX(dL)
│   ├─ #cL  counter: translateX(−dL)
│   │   └─ #dR  door R: translateX(−dR)
│   │       ├─ #cR  counter: translateX(dR)
│   │       │   └─ #plate  square, at the footprint; the one backdrop-filter; the straights' edge band and rims
│   │       └─ #capR  56 × 56: ::before the ring, ::after the rims; each clipped to its trailing half and to the straights' bands
│   └─ #capL  mirrored
├─ #pL / #pR   persistent seats, carried by their edge (translateX(dL) / translateX(−dR))
└─ #fd > #fc > seats   the face door (overflow-x: clip) at the trailing persistent, translateX(−dR); its counter pins the face to the leading edge, translateX(dL + dR)
```

Anchor a is the share of Δ = W − E taken on the leading side: dL = a·Δ, dR = (1 − a)·Δ. In the route, a is not a prop: the window's two edges come from measured rects (§3.3).

**The carrier (in-page, `CARRIER` in the probe).** A lane is one element's `transform`. `solve(x0, v0, to)` samples the dock rung's closed form (ω₀ = 2π/0.30 s, ζ 0.88) at 120 Hz from (x0, v0) until |e| < 0.05 px and |v| < 5 px/s. It pins the curve at the target on its first crossing. `play()` cancels the running lanes, builds one keyframe list per lane from the samples (`easing: linear`, `fill: forwards`), and sets one shared `startTime` on all of them. `stateAt(now)` reads (x, v) at timeline time `now` from the same closed form, which is what a retarget hands on. One episode is 33-62 keyframes.

---

## 2 · The route's questions (REGISTRY §6, in order)

### 2.1 · Q2 · the compositor claim, on the composition

Method: the block test's (`D2-G-block.md` §3.1). The extent runs 56 → 480 over 3,000 ms, linear, and at 800 ms the page busy-blocks its main thread for 1,200 ms. Playwright `recordVideo` at 640 × 300, DPR 1, is decoded at 25 fps. The window is the red plate tint on the centre row, and the leading seat is the first green pixel on that row.
- **freeze**: the longest run of frames within 2 px (extent) or identical (seat, which moves about 2.8 px per frame), × 40 ms.
- **travel**: the change between frames first+21 and first+49, both inside the block.

Cases:
- `composed`: every lane of §1 on WAAPI.
- `carrier`: `play(56, 0, 480)` slowed ×12. It tests whether an explicit shared `startTime` keeps the compositor path.
- `ctl-width`: a `width` animation, the planted freeze.

| engine | case | freeze ms (r1 / r2) | travel in block, px (r1 / r2) | leading seat: freeze / travel (r1 / r2) | load (before) |
|---|---|---|---|---|---|
| Chromium | `composed` | 40 / 0 | **156 / 160** | 0 / −80, 0 / −78 | 13.8 / 15.4 |
| Chromium | `carrier` | 240 / 600 † | **188 / 188** | 200 / −94, 200 / −92 † | 13.8 / 15.9 |
| Chromium | `ctl-width` | **1,160 / 1,160** | **0 / 0** | — | 13.2 / 18.8 |
| Playwright WebKit | `composed` | 40 / 40 | **156 / 164** | 40 / −78, 40 / −82 | 13.4 / 18.4 |
| Playwright WebKit | `carrier` | 480 / 280 † | **180 / 180** | 240 / −90, 240 / −90 † | 13.7 / 18.0 |
| Playwright WebKit | `ctl-width` | **1,120 / 1,200** | **0 / 0** | — | 14.2 / 19.4 |

† The `carrier` case runs the spring slowed ×12, so its tail creeps under 2 px per frame. Its longest still run sits in that tail (E 464-476 px), after the block: the block frames read E 244 → 446 (Chromium) and 252 → 448 (WebKit) (records, field `widths`). The freeze column does not rule on it; the travel column does.

Reading: the whole composition keeps moving under the block in both engines, as the bare aperture did in the block test. The leading seat is carried as well, so the persistent regions and the face can ride the same compositor path. The load was above 8 throughout, and the cells pass anyway.

Real Safari: UNMEASURED (owner's safaridriver checkbox).

### 2.2 · Q3 · the velocity handoff

Method: the probe logs each rAF frame's window rect from the doors' `getBoundingClientRect()`, read after the frame in the harness logger's MessageChannel pattern. The scene expands 56 → 480, and when the solved state crosses 35 % of the travel, a rAF callback retargets to 56 at `document.timeline.currentTime`. The window flag opens at the first play and closes at the retargeted episode's 2 % band. `analyseMorph(frames, DOCK_RUNG, {reversal: {mark, to1: 480}})` is H-3c's reversal row, unchanged. Plants:
- `wall`: the retarget hands v = 0.
- `noclamp`: the landing clamp is off.

| engine · rep | arm | handed (x px, v px/ms) | painted v across the retarget frame, px/ms (before / at / after) | trajectory after the retarget, px (tol) | landing | cell |
|---|---|---|---|---|---|---|
| Chromium · 1 | handoff | 208.75, 3.508 | 3.532 / 3.539 / 2.743 | **1.70 (8.65)** | dead | PASS |
| Chromium · 2 | handoff | 226.13, 3.443 | 3.532 / 3.503 / 2.669 | **1.30 (9.24)** | dead | PASS |
| Playwright WebKit · 1 | handoff | 217.83, 3.478 | 3.203 / 3.524 / 2.434 | **2.34 (8.93)** | dead | PASS |
| Playwright WebKit · 2 | handoff | 224.76, 3.449 | 3.963 / 3.244 / 2.732 | **2.32 (9.15)** | dead | PASS |
| Chromium · 1 / 2 | `wall` | 225.1, 3.448 / 223.72, 3.454 | … / … / **−0.279** / **−0.277** | **25.65 (7.76)** / **16.51 (7.71)** | dead | FAIL (caught) |
| Playwright WebKit · 1 / 2 | `wall` | 221.3, 3.464 (both) | … / … / **−0.489** / **−0.417** | **17.14 (7.61)** / **15.86 (7.61)** | dead | FAIL (caught) |
| Chromium · 1 / 2 | `noclamp` | — | — | 0.69 / 1.98 | **0.58 / 0.61 px ring** | FAIL (caught, O-64 R-3) |
| Playwright WebKit · 1 / 2 | `noclamp` | — | — | 2.31 / 4.04 | **0.61 / 0.61 px ring** | FAIL (caught, O-64 R-3) |

Load 9.4-11.0.
- Continuity ×0.65-0.74 in every cell.
- Terminal: the last step is 0.08-0.27 px after 0.31-0.50 px.
- The window measured from the retarget runs 247.5-255 ms, against an allowance of 257.3-260.6 ms.

**In the compositor's frames** (`q3v`: the same reversal slowed ×8, read from the screencast, load 8.9-13.3):
- Chromium: the handoff carries the extent past the retarget point (205.9 px) to a peak of 244 px, with steps of 14, 10, 8, 4, 0, 0, −4 px per frame around the turn. The wall turns at 204 px: 16, 20, 12, 4, −4, −4.
- Playwright WebKit: the handoff peaks at 282 px; the wall at 204 px.

So the velocity reaches paint; it does not stop at the DOM's reading.

**Retarget cost:** 0-2.0 ms per `play()` for 12 lanes of 33-62 keyframes (`retargetCostMs`), on the main thread, once per retarget. Between retargets the carrier runs no script.

**The landing.** The dock rung (ζ 0.88) overshoots by M = 0.30 % of its travel: 1.26 px on a 424 px expand, 0.30 px on 102 px (`springSpec`, computed here). The floor lands dead only because its CSS blend clamps the size term (`layers.css:100-107`). An analytic keyframe curve paints the overshoot, and a reversal leaves a sub-pixel ring (the `noclamp` rows). **The route pins each lane at its target on the first crossing** (Q-5 default (a)). With the clamp:
- The first crossing is at 266.1 ms from rest for every D.
- |e| ≤ 0.5 px from 229.6 ms (D = 46), 244.6 (102), 252.1 (179.33), 259.4 (424), 260.3 (500) and 263.5 (1,200).
- H-3d's allowance is 214.2 + 2F + stall, at least 264.3 ms at 60 Hz, and the window must close within a frame before or two after the landing. So G closes `data-morphing` at the episode's analytic 0.5 px time, scheduled on the animation timeline. That time is ≤ 266.1 ms, and the margin is 4.9 ms at D = 424 and 0.8 ms at D = 1,200. The margin is thin, but it is set by the rung's own curve, not by frame luck. This is the ground Q-4 (a)/(c) is measured on.
- A designed bounce (Q-5 (b)) is the clamp removed with a lower ζ, on the same carrier: the `noclamp` arm is that path.

Real Safari: UNMEASURED (owner's safaridriver checkbox).

### 2.3 · Q4 · the edge and the drop shadow on the moving silhouette

Method: DPR 1-3 screenshots, backdrop filter off (so the comparison is geometry, not blur), on a flat `#e9e9e9` page.
- **composed**: §1's pieces at static door offsets, or paused mid-flight WAAPI.
- **reference**: one element at the measured window rect with the same background, the same edge primitive, the same rims and the same drop shadow.
- **reads**: max channel difference and pixels over 16/255, split into the edge band (within 3 px of the stadium boundary), the shadow (outside) and the interior.
- **inks**: "real" is the dock's (edge 8 % foreground, rims 10 / 6 / 4 %, drop 14 %). "amp" amplifies them (edge 40 %, rims ×5, drop 60 %) to expose seams.

| cells | engine | worst /255 (edge · shadow · interior) | px > 16/255 |
|---|---|---|---|
| real, `w = 1 px` band, E 200, a ½, DPR 1 / 2 / 3 | Chromium | 11 · 0 · 0 / 11 · 0 · 0 / 12 · 0 · 0 | **0 / 0 / 0** |
| same | Playwright WebKit | 11 · 0 · 0 (each DPR) | **0 / 0 / 0** |
| real, `w = 1.5 px` band, E 56 / 102 / 200 / 480, a ½ and a 0, DPR 2 | both | 11 · 0-1 · 0 | 0 |
| real, `w = 1.5 px` band, E 200, DPR 1 / 3 | Chromium | 11 / 12 | 0 / 0 |
| same | Playwright WebKit | **22 / 23** | **151 / 450** |
| amp, band, rims off, `w = 1` DPR 1-3 | both | 21-26 · 0-1 · 0 | 49-171 |
| amp, band with rims, E 56-200, a ½ and 0 | both | 52-53 · 0-5 · 0 | 455-462 |
| amp, paused mid-flight (E 321.75) | Chromium / WebKit | 67 · 2 · 1 / 77 · 2 · 0 | 567 / 606 |
| **plant** `capband` (caps repaint the straights' bands) | Chromium / WebKit | **61 / 59** | **692 / 700** |
| **plant** `nocaps` | Chromium / WebKit | **160 / 160** | **1,271 / 1,265** |
| **plant** `nosplit` (shadow halves unclipped) | Chromium / WebKit | 56 · **69** / 55 · **67** | **26,079 / 22,846** |
| HEAD's `border: 1.5px` decomposed, amp, rims off, DPR 1 / 2 / 3 | Chromium | **45 / 96 / 96** | 110 / 150 / 290 |
| same | Playwright WebKit | 43 / 21 / 49 | 28 / 28 / 128 |
| identity: the band edge against HEAD's `border: 1.5px`, real ink, DPR 1 / 2 / 3 | Chromium | 24 / 25 / 25 | 22 / 790 / 1,451 |
| same | Playwright WebKit | 28 / 22 / 28 | 332 / 113 / 1,183 |

Loads 12.9-16.6.

**Findings:**
1. **The decomposition tiles exactly on paper and to 11-12/255 in paint.** Take the band b of the straights: b = w for the ring and w + 1 for the rims. The ring (or rim crescent) restricted to y < b is exactly the straight band kept inside the door's arc: every such point lies outside the inner circle of radius R − b. So each cap piece clipped to y ≥ b and to its half adds nothing twice and leaves nothing out. The residual 11-12/255 on 0 pixels over 16 is the anti-aliasing of the arc drawn by two layers, the door clip and the cap, against one layer in the reference. It sits on single device pixels along the arc, and it does not grow with E or with the anchor.
2. **HEAD's border cannot be decomposed.** `border: 1.5px` computes **1 px in Chromium at DPR 1, 2 and 3**. In Playwright WebKit it computes **1 px, 1.5 px and 1.333 px** (`q5iso` records, field `borderUsed`). A clip band is not snapped, so the cap's band and the straights' painted width disagree, which gives the 45-96/255 seam. HEAD's 1.5 px edge is therefore 1 px wherever Chromium paints it. **The route paints the edge as box-shadow bands of `--dock-edge-width: 1px`**: an inset band on the straights, an inset spread ring on the caps. That is a whole number of device pixels at every DPR, no engine snaps it, and it matches what Chromium paints today. The identity rows are the visual cost against HEAD's authored border: 22-28/255 along the edge, mostly Playwright WebKit at DPR 2 (1.5 → 1 px) and DPR 3. This is an owner glance, recorded in §8, R-4.
3. **The rims move with the edge.** HEAD paints the dock's rims (`--glass-rim-top`, `--glass-rim-bottom`: 1 px lit top, 1 px shade bottom, 1 px shade left) as inset box-shadows on the root box (`shell.css:249-251`), which in G is the reserve, not the window. The straights carry the top and bottom rims. The caps' `::after` carries all three, and the left rim appears only on the leading cap, as on a whole stadium. At real inks this adds nothing over the 11/255 floor. The amplified 52-53/255 is the same arc anti-aliasing at ×5 rim alpha.
4. **The drop shadow as two halves is within 0-1/255 at real alpha** at every E, both engines, including the E = 56 circle, where both caps shape the shadow. Amplified: at most 5/255 at E = 56, 0-1 elsewhere. Each half is a transparent stadium 2W long with `box-shadow` (an outer shadow is not painted under its own box), carried by its own edge. It is clipped on the main axis only (`overflow-x: clip; overflow-y: visible`, S §2.3) at the window centre c = (dL − dR)/2, a translated box. The halves meet without a seam because each is the mirror of the other at c.
5. **Mid-flight.** A paused WAAPI frame (fractional door offsets) reads 67-77/255 amplified against 52-53/255 static: the same anti-aliasing at sub-pixel positions. A real-ink paused cell was not run. The prototype's W7-style edge read in flight (the screencast) covers it; see §8, R-6.

Real Safari: UNMEASURED (owner's safaridriver checkbox).

### 2.4 · Q5 · hit testing through the rounded doors

**Isolation (`q5iso`).** One 200 × 56 box with radius 28 and a clipped child. The point (103, 103) lies inside the rectangle and 35.4 px from the corner arc's centre, 7.4 px outside the arc:

| clip on the parent | Chromium: elementFromPoint / real press | Playwright WebKit: elementFromPoint / real press |
|---|---|---|
| `overflow: clip` | child / child | child / child |
| `overflow: hidden` | child / child | child / child |
| `overflow: clip` + `transform` | child / child | child / child |
| `overflow: clip` + `will-change: transform` | child / child | child / child |
| `clip-path: inset(0 round 28px)` | **body / body** | **body / body** |

A rounded overflow clip clips paint, and hits only to its rectangle, in both engines. Only `clip-path` rounds hits, and a `clip-path` on an ancestor of the plate kills the lens (S-28, reproduced in the block test).

**On the composition (`q5`, DPR 2, root `pointer-events: none`, plate and seats `auto`):**

| state | point | Chromium | Playwright WebKit |
|---|---|---|---|
| rest E 480 · static E 200 · paused mid-flight | window interior | plate | plate |
| same | just inside the arc | plate | plate |
| static E 200 · paused | reserve outside the window | **body** | **body** |
| static E 200 · paused | a face seat laid out beyond the window | **body** | **body** |
| all three | corner outside the arc | plate (the lune) | plate (the lune) |

Plants:
- `ovvis` (doors `overflow: visible`): reserve and clipped seat hit the plate. The rectangle check FAILs in both engines.
- `rootauto` (the reserve root takes pointer events): the counters and the face door, which inherit `auto`, absorb the reserve and the lunes (`fd`, `cL`). FAIL in both engines.

Loads 13.8-14.4.

**Answer.** Hit follows paint to the window's rectangle, in both engines, with no extra mechanism, provided the root is `pointer-events: none` and only the plate and the seats opt back in. This cures C-10 / CX-6 (the plate absorbing clicks up to 193.8 px outside the root). What stays is the four corner lunes, (1 − π/4)·R² ≈ 168 px² each at R = 28, where a press lands on the plate. At rest that equals HEAD, whose root box takes the same lunes. Q-7 (a) at the arc would need a clip-path hit region, which D's banked sub-choice supplies (§3.3, "clip-based hit region"), but it would have to live on a hit-only sibling, never an ancestor of the plate. The route does not take it; §8, R-5.

---

## 3 · The mechanism

### 3.1 · Boxes

In the patched tree, `GlassDock.vue:397` renders `div.dock-plate` as the root's first child, with `position: absolute; inset: 0; z-index: -1`, and `.dock-controls` is `display: contents` (`dock.css:53-66`, `:199-203`). G wraps the plate and adds the edge and shadow boxes. Everything is inside the root, which stays transform-free (`dock.css:231-245`: `anchor()` must resolve through it).

```
.glass-dock (root; pointer-events: none; the reserve while [data-morphing])
├─ .dock-shade  ×2  (overflow-x: clip; overflow-y: visible) > .dock-shade-caster      [the drop shadow, §2.3 item 4]
├─ .dock-aperture   (absolute, inset 0; z-index −1, where the plate sits today)
│   └─ .dock-door[data-edge=lead] > .dock-door-counter > .dock-door[data-edge=trail] > .dock-door-counter > .dock-plate
│       (.dock-cap[data-edge=trail] is the trailing door's last child; .dock-cap[data-edge=lead] is the leading door's)
├─ .dock-controls (display: contents, unchanged)
│   ├─ .dock-persistent            translate lane: the leading edge
│   ├─ .dock-layers > .dock-face-door > .dock-face-counter > (full, summary, search)
│   └─ .dock-persistent-end        translate lane: the trailing edge
└─ .dock-ghosts (aria-hidden, inert, pointer-events: none)  [leaving seats, §3.5]
```

- The plate keeps `.dock-plate`, the one `@apply glass-plate` and the one `backdrop-filter` (floor row 6). It becomes square: `border-radius: 0`. It keeps the rim span (`GlassDock.vue:408`), the grasp carriers (`:409-418`) and its grain `::after` (`dock.css:175-190`).
- The doors' radius is `--radius-dock`, the corner token of floor row 1 (`shape.css:59-61`), with the finite card lerp (`shell.css:457`, `:483`) moved from the root onto the doors and the caps.
- Doors and counters are 2W on the main axis. W is the reserve, which only has to exceed the largest window. At rest every lane is identity, the window equals the root box, and nothing is clipped that HEAD shows: the doors clip exactly the stadium the plate painted, and the face door has `overflow: visible` outside `[data-morphing]`.
- `.dock-face-door` is `overflow-x: clip` (main axis only) while `[data-morphing]`, so a seat's ring and hover lift keep their cross axis (W2). At rest it is `overflow: visible`, and the run's own scroll port applies when `[data-overflowing]` (floor row 5, `run.css:159-170`).
- Vertical docks swap axes: `translateY`, the caps on block-start and block-end, the straights as inline-start and inline-end bands. The orientation class picks the lane axis; there is no second code path.

### 3.2 · The carrier: `useDockAperture` (new), with `useDockSpring` as its solver

**Replaced:** `useDockMorph.ts` (the whole file, 112 lines) and its call at `GlassDock.vue:232-247`. The rAF writer of `--dock-morph-t` goes, and so does the second engine instance in `DockCrossfade.vue:110-230`.

**New `composables/useDockAperture.ts`.** It owns:
- **Lanes.** A lane is (element, property, x, v, target). Properties are `translate` (never `transform`, so a seat's hover `scale` never shares an owner, R-5), `opacity`, and one custom property, `--dock-expand-t`, on the root (§3.6).
- **`play(lanes)`.** Cancels every running animation of those lanes and solves each lane from its current (x, v). It builds one keyframe list per lane, sampled at 120 Hz and pinned at the first crossing, and starts all of them with `startTime = document.timeline.currentTime`. Derived lanes (counters, caps, shadow boxes) are sampled from their edge's solved samples, so a door and its counter can never disagree. The block test's `plant-desync` shows what a 6 px disagreement costs.
- **`stateAt(now)`.** Each lane's (x, v) from its closed form, never read back from style.
- **The window flag.** `data-morphing` is set at `play()` and cleared at the episode's analytic 0.5 px landing (§2.2), with a timer at that timeline time. The flag gates the face door's clip, the reserve and the ghosts, and nothing else.

**`useDockSpring.ts:74-136` changes role.** It stays the band's sole `new SpringProgress` site, now as a solver: `solveLane(x0, v0, to): {t, x}[]`, stepping `SpringProgress.reset(x0, v0)` with `tickDt` (keyframes.js 6.0.0 exports both), with the response co-scaled by `motionTempo()` as today (`:100`). `play()`/rAF go. P7 holds: one engine, the document timeline, and one clock.

**PRM (canon P6).** Spatial lanes seat at their target: no animation, the transform is set and cleared at once. Opacity lanes and the ink lane keep their fades on the same solved curve. The PRM arms in `dock.css:261-271` (the `--dock-t` pin) go with `--dock-t`.

### 3.3 · Episodes and the flip-frame measurement

Every change is one kind of episode, which removes W-13's two paths:
- a posture flip (collapsed ↔ expanded, compact);
- a content change on a resting dock (a seat added or removed, a label change);
- a face swap (DockLayerGroup / DockCrossfade);
- a retarget of any of these mid-flight.

**The trigger** is the floor's one endpoint ResizeObserver (`dockMorphMeasure.ts:97-111`). A posture flip is also announced by the chart. Both land in the same place.

**The flip frame.** Posture classes flip, or content changes, and the browser lays the dock out at its new natural size. In the ResizeObserver callback, which runs after that layout and before paint:
1. Read the new natural rects: the root's window, the persistent regions, each declared seat (`seatsOf`, `useDockRun.ts:71`) and the face.
2. Take the old painted rects. At rest these are the rest cache, root-relative, written at the last settle. Mid-flight they are layout plus `stateAt(now)`.
3. Set the reserve: `inline-size` (or `block-size`) = the union of the old window and the new one. This replaces `layers.css:123-128`, which reserves `--dock-expanded-px`. The endpoints the floor publishes (`dockMorphMeasure.ts:92-94`) remain the budget cap (floor row 5).
4. Express every lane relative to the reserve's rect, from old painted to new natural, carrying the old velocity (mid-flight), and `play()`.

The browser re-lays out once, before paint, so the first painted frame shows the old geometry. The anchor needs no prop: a centred, start-anchored or end-anchored dock (K-11) gives its own window edges. The `hand` cells show the handover at the end of a collapse (the reserve shrinks to the landed window and every lane clears) moving the window 0.000 px across that frame in both engines. The largest step in the three frames before it is the clamped landing's own last step, 0.49 px (Chromium) and 0.65 px (Playwright WebKit).

`dockMorphMeasure.ts:82` (nothing is published while `[data-morphing]`) holds as is. A content change that arrives mid-flight retargets. The flip-frame read is then the reserve's layout plus the lanes' current state.

### 3.4 · The face and the posture crossfade

- The face (`.dock-face-counter`) rides the leading edge, so the face is carried with the glass, not uncovered in place. The face door's trailing edge rides the trailing persistent's inner edge, so no face seat paints under the trailing persistent (C CX-4's collision class) or outside the plate (W-7).
- **The posture crossfade is sequential, on the episode's progress p** (the window's normalized travel):
  - The leaving face's opacity lane falls to 0 by p = 0.3.
  - The entering face's seats rise in a stagger from p = 0.3 + k·s, which restores HEAD's reveal (F-8) as compositor lanes.
  - So no two faces paint above 5 % at one position (H-3b `seatOverlap`), and "P" over "1" cannot happen.
  - The stagger constants reuse `--dock-stagger-window-size` and `--dock-stagger-step` (`layers.css:281-354`), read once at play.
- Because p is a state, not a clock, a reversal re-derives every opacity lane from the new solve, and the fade reverses with the glass.

### 3.5 · Seats (§7.3 G item 3: the same obligations as B′ items 1 and 7)

- **Every declared seat is inverted.** A seat whose painted rect differs between the old state and the new natural layout gets a `translate` lane from (old − new) to 0. Insertion at the start moves every later seat; compaction with a non-first current seat moves the current one.
- **Entering seats** (in the DOM at the flip frame with no old rect) take an opacity lane whose onset is the progress at which no moving seat overlaps them by more than 20 % (`SEAT_OVERLAP_FRAC`). This is closed form: from rest, a moving seat's lane is Δ·(1 − p), so the onset is p* = 1 − 0.2·w_min/|Δ|.
- **Leaving seats hold their painted offset and fade.**
  - A DockControl or DockTrigger that unmounts (`onBeforeUnmount`, beside `DockControl.vue:173` and `DockTrigger.vue:58/74/79`) hands the dock a clone of itself and its painted rect.
  - A seat that leaves the compact rung (`scroll-rungs.css:15-24`) is cloned by the dock at `send('compact')`, before the class applies, because the dock is the one that decides it leaves.
  - Clones go into `.dock-ghosts`, inert, and ride their carrier's lane. Each one's opacity lane reaches 5 % before the first moving seat would cross it by 20 %, using the same closed form.
  - No observer is added (PF-5): the fact "a seat left" arrives from the seat's own lifecycle, or from the chart edge that caused it.
- **Compaction (B′ item 7)** is a posture episode to the compact window: the persistent regions plus the current seat (floor row 4's rung).
  - Leaving seats are ghosts: they fade on the spring and are clipped by the closing face door.
  - The current seat glides.
  - Nothing scales, so the seat scale is 1 by construction (W4 `seat-scale`, C CX-1's class), and W8 `sharp` holds by construction: translate only.
- **A consumer's own element** that is not a declared seat moves with its face or persistent region, not by itself. Floor row 1 already requires declared seats.

### 3.6 · What stays on the main thread

- **The ink lerp.** `--glass-veil-tier` (`dock.css:117-123`), the edge ink (`dock.css:135-147`, now the bands' colour) and the card corner lerp (`shell.css:457`, `:483`) read `--dock-expand-t`. G animates `--dock-expand-t` directly as one WAAPI lane on the root (`@property`-registered `<number>`, `index.css:108-112` re-pointed from `--dock-morph-t`). Registered custom-property animations run on the main thread. Under a stall the ink and a card's corner radius hold while the extent moves (§8, R-3).
- `morph.css:47-65` loses its `[data-morphing]` derivation: the lane overrides the class-seated 0/1 while it runs.
- `--dock-morph-t` and `--dock-t` are struck (`index.css:108-127`, `dock.css:78-92`, `crossfade.css:124-145`, `layers.css:180-182`, `:281-354`, and the `useDockMorph.ts` writer). Their readers move onto lanes (§3.4) or go with the struck clip. E-1: no alias.
- An exact compositor alternative for the veil exists and is not taken: a delta layer with an opacity lane is exact for an alpha-only lerp of one ink. It needs `Element.animate` on a pseudo-element, or one more element, and the tiers are alpha rungs of one ink (`shell.css:144-147`). It is recorded for the prototype, not specified.

### 3.7 · Struck from the patched tree

| where | what | why |
|---|---|---|
| `shape.css:81-130` | the box `scale` morph and the counter-scale of `.dock-persistent` / `.dock-layers` | G never scales (W-7, W-8, W8 `sharp`) |
| `layers.css:99-121` | `--dock-live`, `--dock-size-scale`, `transform-origin` | the convex blend has no reader |
| `layers.css:123-128` | the `--dock-expanded-px` reserve | replaced by the flip-frame reserve (§3.3) |
| `layers.css:180-182`, `:281-354` | the leaving-face opacity and the child stagger on `--dock-morph-t` | opacity lanes (§3.4) |
| `dock.css:78-92` | the plate's `clip-path` and its `--dock-t` alias | the doors clip |
| `dock.css:135-147` | the plate's `border` | the band edge (§2.3 item 2) |
| `dock.css:166-168` | the grasp rule's `clip-path: none` | the plate carries no clip |
| `dock.css:261-271` | the PRM `--dock-t` pin | struck with `--dock-t` |
| `shell.css:249-251` | the rims and drop shadow on the root | moved to the straights, the caps and the shade casters |
| `crossfade.css:124-145` | the per-face content clip on `--dock-morph-t` | the face door |
| `DockCrossfade.vue:110-230` | its `useDockSpring` instance and its `--dock-t` writes | a swap is an episode (§3.3) |
| `useDockMorph.ts` | the file | `useDockAperture` |
| `index.css:108-127` | `@property --dock-morph-t`, `@property --dock-t` | `--dock-expand-t` is the one registered scalar |

The size estimate is for the landing wave to confirm: struck roughly 450-550 lines, added roughly 300 (the composable) plus 120 (aperture and edge CSS).

---

## 4 · §7.3 D2-G items 2-5

| item | how G meets it | the H2 witness that shows it |
|---|---|---|
| **2 · W1 with H-1, both engines** | The silhouette is the intersection of the two doors: a stadium of radius R at every frame by construction. The block test measured the window within 0.34-0.6 px of the arc at rest, paused and in flight; square, lens and desync plants were caught. `extent()` is `__hp.paintedRect(plate)`, which folds the doors' `overflow` clips through ancestor rects (`lib.mjs` `paintedRect`, `clipRectOf`), with no custom property read (L-1). `agree` compares that rect with the pixels. `cover` holds at rest because the window is the root box. `moves` holds because the first expand is continuous (floor row 5). For card docks the corner lerp is on the doors and caps, on the main thread (§8, R-3) | W1 `corner`, `agree`, `cover`, `moves`, `card`, `end`: the morph, vmorph, card and rail cells. WebKit morph frames come from the screencast (H-1b), bound 2.5 px |
| **3 · seat obligations (B′ 1, 7)** | §3.5: per-seat translate lanes; entering seats' onset at p*; leaving seats as ghosts with an opacity lane timed before the first overlap; compaction as a posture episode; no scale | W3 `seatStep`, `seatOverlap` on `lead-add`, `lead-remove`, `content-add`, `content-remove`, `compact·non-first-current` (now W4), expand and collapse. W4 `seat-scale`. W8 `sharp`. The filmstrip read (§5) |
| **4 · W3 R-1..R-5, including content changes and swaps** | R-1: the flip-frame layout gives both endpoints before the first painted frame (floor row 5 plus §3.3). R-2: one episode kind for content and swaps, triggered by the one ResizeObserver. R-3: lanes pinned at the first crossing (§2.2, `noclamp` caught). R-4: the window closes at the analytic 0.5 px landing, ≤ 266.1 ms, against an allowance ≥ 264.3 ms (margins 0.8-4.9 ms for D ≤ 1,200). R-5: one WAAPI animation per element·property, cancelled before its successor, no rAF writer, `translate` separate from the seats' own `scale` | W3 `first-expand`, `warm-*`, `content±`, `lead±`, swaps, `reversal` (H-3c, §2.2), `anchor-end·*`, `hidden-shown`, `viewport-resize`, `ticking`, `seat-transition`, `wide`; checks `continuity`, `landing`, `window`, `trajectory`, `terminal`, `owners`, `faces` (pixels, H-3). W6 `form·expand` / `form·collapse` |
| **5 · the cost row** | Recorded, not gated: the extent under a 1.2 s main-thread block. The composition moves 156-164 px through the block in both engines; the `width` control moves 0 (§2.1). The prototype re-runs it on the real dock with the block test's method. B′ writes plate insets per frame on the main thread, so its row is the one to compare | the block test's Q2 method (`D2-G-lens-probe.mjs q2`) pointed at the built dock. Beside it, a frame-cost trace of a retarget (0-2 ms for 12 lanes here; about 35 lanes on a 10-seat dock) |

---

## 5 · §7.3 "Both"

- **Every cell in both engines under H2, with a reviewed adapter (H-6).** `adapter-G.mjs` is `adapter-floor.mjs` with:
  1. `plate()`: `.dock-aperture .dock-plate`, since the plate is no longer the root's direct child.
  2. A new read, `edge()`: the cap pieces, which W7's `edge` probe mode must show. Today it shows only the plate and its pseudos (`lib.mjs` `PROBE_CSS`, `html[data-hp="edge"] [data-hp-plate] *` hidden), so the caps would read as a cut edge. That is a harness change in `../harness/lib.mjs`: `probeMode` marks `P.edge?.()` with `data-hp-edge`, and the edge mode shows `[data-hp-edge]`. Its self-test pair: the fixture passes; an adapter plant whose `edge()` omits the caps fails W7 `whole` at the cap bins.
  3. Nothing else: `extent()`, `paintingSeats()` and `morphing()` are unchanged in form.
  L-5's "13 reads" becomes 14, which is the critic's to review with the diff. The shadow casters and ghosts are not seats and not the plate; no witness reads them except through pixels.
- **Filmstrip gestalt.** The first expand, the warm pair, a swap and a content change, as screencast strips in both engines, judged by the critic against D-1 and D-2:
  - the glass moves on the spring, and the seats ride it;
  - the faces cross in sequence, not over each other;
  - the landing is dead (Q-5 (a)).
  Where D-1 asks for bounce, the route's answer is Q-5 (b) on the same carrier (§2.2): unclamped lanes on a lower-ζ rung, gated by W3's designed-bounce branch.
- **`DockProps` against Q-3.** **7**, the floor's count (`useDockShellProps.ts:122`: `fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`). G adds none: the anchor comes from layout (§3.3), and the edge width is a token (`--dock-edge-width`), not a prop.
- **Prose sweep (PF-10), every touched file:**
  - `GlassDock.vue:205-247` and `:388-446` (the carrier and the plate comments);
  - `dock.css:1-50`, `:78-92`, `:150-171`;
  - `shape.css:1-130`;
  - `layers.css:56-121`, `:174-211`, `:263-354`;
  - `morph.css:1-65`;
  - `crossfade.css:1-30`, `:120-145`;
  - `DockCrossfade.vue:1-60`;
  - `useDockSpring.ts:1-72`;
  - `dockMorphMeasure.ts:26-28` ("published as `--dock-expanded-px`… for the shipped scale carrier");
  - `index.css:1-30`, `:100-130`.
- **Real Safari:** every row UNMEASURED (owner's safaridriver checkbox). The first cells to run once it is ticked: the lens in the doors, the extent under the block, the reversal row, the band edge at DPR 2 and 3, and hit testing in the lunes.

---

## 6 · The floor rows under G

| row | under G |
|---|---|
| 1 corner, seats declared | the doors carry `--radius-dock`; the plate is square. Declared seats are the lanes' unit (§3.5) |
| 2 rim | unchanged: a plate child, clipped by the doors in every rung. During a morph its fill is relative to the reserve, not the window (§8, R-7) |
| 3 hover gate, coarse press | unchanged. The root's `pointer-events: none` does not stop `mouseenter`/`mouseleave` on the root, which fire through its descendants. The prototype re-reads W4 `coarse·*` on it |
| 4 P4 machine | unchanged; the compact rung is a posture episode (§3.5) |
| 5 endpoints | unchanged. The flip-frame read gives window positions; the published endpoints remain the budget cap. `publish()` still stands down while `[data-morphing]` |
| 6 crash-free edge | kept: each band is `color-mix(in srgb, var(--foreground) p%, transparent)`, one translucent arm, never nested. PF-3's crash cannot return through the caps |
| 7 gates as invariants | G-DOCK-MORPH gains: no rAF writer in the band; every morph lane is a WAAPI `translate`, `opacity` or `--dock-expand-t` animation; no `scale` on the root or on `.dock-controls`; the root has `pointer-events: none`; no `clip-path` on any ancestor of the plate |

W7 `gutter` and `badge` (O-67), which FLOOR §5 assigns to the routes, do not depend on the carrier. G's answer is the same as any route's: a side or canvas placement inset by `--dock-pad`, and a reserved badge slot on the seat. It belongs once to the landing (P-3), not to each route. This seat records it and does not specify it.

---

## 7 · Consumer impact (read-only census)

- **value.js** `demo/color-session/useContrastSafeColor.ts:152-164` reads the mounted `.dock-plate` element's chrome with `querySelector(".dock-plate")`. The class stays on the plate, and the plate still carries the veil background. Its border does not: the edge becomes bands, on the plate's straights and on the caps. If the probe reads `border-color`, it changes; the landing packet names this.
- **chicago** `src/style.css:131-140`: the floor already retires `--dock-cap-rest` and the run override (FLOOR §7). G adds nothing.
- **keyframes.js** `demo/app/dock/dockEdge.ts:22` names its own injection key `"dock-plate"` and reads no dock internals.
- **fourier-analysis:** no read of any struck name (grep for `dock-plate`, `shadow-dock-override`, `data-morphing`, `--dock-morph-t`, `--dock-expand-t`, `--dock-size-scale`).
- **`--shadow-dock-override`** keeps its meaning and moves from the root to the shade casters. **The rims** keep their tokens and move from the root to the straights and caps.
- **Edge width:** 1 px everywhere (Chromium paints 1 px today; Playwright WebKit paints 1.5 px at DPR 2). This is visual, and an owner glance.
- **Root `pointer-events: none`:** a consumer that listens for clicks on the root's padding would now hear them only on the plate or a seat. The census finds none.

---

## 8 · Risks

- **R-1 · Box count (P-1).** 12 new boxes, each carrying one transform lane, plus the ghost layer. Every one has a measured reason (§2), but it is the route's whole cost against B′'s zero new boxes, and a critic may weigh it against the compositor claim.
- **R-2 · The landing margin.** The window must close within 266.1 ms of the release, against an allowance ≥ 264.3 ms at 60 Hz. The analytic margin is 0.8-4.9 ms for D ≤ 1,200 px. At 120 Hz (F = 8.3 ms) the allowance falls to 214.2 + 16.7 + 8.3 = 239.2 ms: D = 46 still lands inside it (229.6 ms), D = 102 does not (244.6 ms). The allowance's 2F is frame-rate-bound; the rung's crossing is not. Q-4 has to rule: (a) the window closes at the 2 % band and the pinned tail paints after it, or (c) a dock clock token.
- **R-3 · The ink and the card corner are main-thread.** Under a stall the veil tier, the edge ink and a card's corner radius hold while the extent moves. For a card dock this means the corner radius lags the moving edge; the prototype measures W1 `card` in flight under load. The compositor-exact alternative for the veil is in §3.6.
- **R-4 · The edge identity.** The route paints 1 px where HEAD authored 1.5 px. Chromium already paints 1 px. Playwright WebKit changes by up to 22-28/255 along the edge at DPR 2 and 3; real Safari is unmeasured. This is an owner glance, not a ruling this seat can make.
- **R-5 · The corner lunes stay hittable** (§2.4): 168 px² each at R = 28. The cure, a `clip-path` hit sibling, is banked with D and not specified.
- **R-6 · Anti-aliasing in flight.** At fractional door offsets the two-layer arc reads 67-77/255 amplified against 52-53 static. Real ink in flight was not measured here. A visible shimmer along the arc in flight would be the defect to look for in the filmstrip.
- **R-7 · The rim fill during a morph** runs from the reserve's start, not the window's. At rest, the only state W5 measures, they coincide. In flight the fill can look as if it slides relative to the moving window.
- **R-8 · Explicit `startTime` in real Safari.** Playwright WebKit keeps the compositor path with an explicit shared `startTime` (§2.1 `carrier`); real Safari is unmeasured.
- **R-9 · Ghost clones** are copies of consumer-slotted content: an `<img>`, a canvas, or an element with its own animation clones as a still. A seat that owns a canvas leaves as its last frame, faded, which is honest but not live.
- **R-10 · Prior art.** The closed-form WAAPI handoff (W §10.4, W §13) has none. What this seat shows is the reversal row in two headless engines on a static page. Real Safari and iOS Safari are the open engines.

---

## 9 · What the prototype measures first

1. The built dock with the floor patch and G's carrier, under H2 with `adapter-G.mjs` and the harness's `edge` read (§5), in both engines, with the WebKit cells unshimmed. The floor already removed the crash.
2. §2.1's block row on the real dock, then W3's `reversal` and content cells, then the filmstrip.
3. Q-4 in the first W3 read: whether the window closes inside the allowance on the real dock at 60 Hz, and what it reads at the probe's analytic margins.
4. W7 `whole` with the band edge at DPR 1-3, both themes, beside §2.3's identity rows.
5. Real Safari, every row above, when the checkbox is ticked.
