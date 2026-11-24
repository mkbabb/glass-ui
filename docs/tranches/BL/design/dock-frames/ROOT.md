# Dock frames: the O-420 roots and cures

Rooted 2026-11-23 by a workflow seat (claude-opus-5-5), from `RECORD.md` and its series in `record/`, and folded the same day against `critique.md` (`fold.md` gives each objection's verdict). The owner, 2026-11-23 10:42, on fourier.babb.dev's top dock:

> the dock needs a bit of refinement in animations at the begin and end--it should not shift around in flow of the page horizontally in animation, too; hovering the darkmode toggle or toggling it should not shift it around; the last few frames of the collapse animation shift and are buggy--communicate this with all docks in a design study, too

**Refs read.**

- glass `v11.1.0` (d19e12559), which fourier, keyframes, color and Home Assistant serve.
- glass `release/11.1.1` (4f1fa667e) with the phone-scroll row's `cure.patch` (`docs/tranches/BL/audit/phone-scroll/cure.patch`) applied: 11.1.2's base, called **base** below.
- The redesign tip `bl/dock/wi8` (d48c19ec8), read with `git show`.
- fourier-analysis `origin/master` (266bd67); keyframes.js `origin/master` (f37740c8) and its 6.0.0 dist, which glass's lockfile holds; value.js (color) `origin/master` (243d0b364); daraksha `origin/master` (61b36f0); Home Assistant's glass cards (hassio-config `master`, 0f73a6a8).
- atlas's own film of its docks (`inbound/atlas-2026-11-23/README.md`, glass 10.1.2) and gaggle's (`inbound/gaggle-report-dock-1123/`, glass 11.1.0).

Line numbers are at those refs unless a line says otherwise. glass lines are at `release/11.1.1`; its dock source is v11.1.0's except `layers.css` (lines after 148 move down 9), the end of `run.css`, `DockControl.vue` and `TooltipContent.vue`.

**Engines.**

- **Chromium** is Playwright 1.61.1's headless shell, launched with `--use-angle=metal --enable-gpu-rasterization`. Its frames ran at about 8.3 ms.
- **WebKit** is Playwright's WebKit build 2311. It is not Safari.

No reading here depends on backdrop blur.

## The verdicts

| item | reproduces | root | whose | cure | release |
| --- | --- | --- | --- | --- | --- |
| 1. Rough first and last frames | The open's first frame: yes, for a seat in a `display: contents` group. Two faces at strength in one frame: yes, on every open and close. The fixed first step: yes. Long frames at a morph's start: yes, and a long frame there turns into one large step. The close's last frames: yes (item 4). | The entering seats' reveal is authored on the pane's direct children, over 55 ms (`layers.css:277-376`); the leaving pane fades on `1 − p` (`:202-204`), so it is still at 0.7 when the entering face is at 0.6. The arm's style work (`useDockMorph.ts:108-132`) lands in the morph's first frames. keyframes' managed loop takes a fixed 16.667 ms first step (`playback.ts:242`). | glass; keyframes.js | Both faces on one window, out then in (W-I.8's R-3), on the panes. The arm's cost is a hard cell of 11.2.0. keyframes.js starts the clock at the first painted frame. | 11.1.2; keyframes.js; 11.2.0 |
| 2. Sideways drift | The plate: no on glass's docks (centre held to 0.01 to 0.23 px); yes on daraksha, by daraksha's own fission row. The content: yes, 4 to 15.6 px. The layout box: yes, in one frame. | The pad lerp (`morph.css:119-123`, `:150-154`) under once-read origins. The reveal's 0.82 scale about each child's centre (`layers.css:315`). The reserve (`layers.css:127-132`). daraksha: `SiteDock.vue:476-488`. | glass; daraksha | The pad takes each posture's value. The pop is deleted. daraksha centres its pair at rest. | 11.1.2. daraksha now. The layout box and a seat that rides the edge are hard cells of 11.2.0. |
| 3. The theme seat on hover, press and key | Hover: no. Press and a key's reach: yes, 4 px at 1440 and 12 to 14 px at 390, in one frame. | Reach counts the ring's room for a press that draws no ring (`useDockRun.ts:217-229`, `:401-406`). A fitting run still overflows its port by up to twice the ring's reach (`run.css:386-440`), so a key's reach scrolls it. The glide writes into a `mandatory` snap port (`useDockRun.ts:268-273`, `run.css:260`), which snaps every write. | glass | Reach counts the ring's room only where a ring paints. A fitting horizontal run is no scroll port. The glide holds the snap while it runs. | 11.1.2. wi8's 390 jump is a hard cell of 11.2.0. |
| 4. The collapse's last frames jump | Yes. | The spring's default settle thresholds (`useDockSpring.ts:95-104`) give 280 to 300 ms of tail nobody sees. Endpoints are read as whole pixels (`dockMorphMeasure.ts:7-11`, `:316-320`, `:772`). The pad lerp (item 2). | glass | Settle at the scalar's first crossing. Read sizes to the fraction. Pin the pad. | 11.1.2. wi8's end snap is a hard cell of 11.2.0. |
| 5. The theme seat's tooltip at the screen's left edge | fourier: not read (its tooltip is the browser's own, from `title`). Related, in glass: a tooltip opened from the collapsed seal stays open through an open and follows the hidden seal, in both engines. | fourier: not rooted. glass: overlays from `#collapsed` are never closed on the expand (`participation.ts:124-130`), and `TooltipContent.vue` passes no `close`. | fourier (unrooted); glass | glass closes an overlay on the posture edge that hides its trigger. fourier's own reading is owed. | glass: 11.1.2. fourier: the owner's reading first. |

The patch is `cure-11.1.2.patch`, against `release/11.1.1`; it applies with phone-scroll's `cure.patch` on top or without it (`git apply --check` and `patch -p1 --dry-run`). It touches thirteen source files, one visual spec and one unit file, and deletes one test. In both engines, at 1440 and 390, in both schemes, its witness reads RED on base and GREEN with the patch for items 1 to 4 and for glass's half of item 5, with two exceptions: the long first frames (item 1, not cured here) and, in WebKit, a fractional seal's last step on the grouped page (*The witness*). On 11.1.1 WebKit's press at 1440 already reads GREEN on base; its key's reach there reads RED.

## 1. Rough first and last frames of open and close

### What paints

The record's "pop" is the pane's own `opacity`: the run pane goes from 0 to 1 at the open's first frame, and the summary pane at the close's. To see what paints, the witness reads each seat's **effective** opacity, the product of `opacity` over its ancestors, skipping any `display: contents` element. Read per frame on live fourier (Chromium, `tools/root/live-chromium.json`) and on the witness pages:

- **Open.** At the first morph frame every seat is at 0 except the **Log in** seat, which is at **1**. Log in sits in `<div class="contents" role="group" aria-label="Account">` (fourier `AppDock.vue:461`), a child with no box. The other seats then go from 0 to 1 in 53 to 60 ms (Chromium), with steps of 0.31 to 0.58 within 17.5 ms.
- **Two faces at once.** The leaving face fades on `1 − p` over the whole morph, so in the frame where the entering face reaches 0.6 the leaving one still stands at 0.7: min(seal, strongest seat) is 0.63 to 1 on every base cell, both engines.

glass's own demo authors the same `display: contents` shape: on glass.babb.dev/dock/chrome at 390 the bottom dock's run holds a `div.contents` with 2 seats.

### Root, glass

- `layers.css:277-376` authors the reveal and its 0.82 → 1 scale on `.dock-layer.is-active > :not(.dock-run-mark)`, the pane's direct children, on a 0.4 window. A `display: contents` child has no box, so its `opacity` and `scale` paint nothing. The stagger ladder counts children, so it can only ever stagger what the host made a child.
- `layers.css:202-204` fades the leaving pane on `calc(1 − var(--dock-morph-t))`, over the whole morph.

The same per-child selector also causes item 2's largest drift (below).

### Cure (11.1.2)

The two faces trade on one window, out then in, as the redesign's R-3 rules (`waves/W-I.8.md:92-95`): with `p` the per-swap scalar `--dock-morph-t` and `w = --dock-fade-window = 0.55`,

```css
.glass-dock[data-morphing] .dock-layer.is-leaving {
    opacity: clamp(0, calc(1 - var(--dock-morph-t) / var(--dock-fade-window)), 1);
}
.glass-dock[data-morphing] > .dock-controls > .dock-layers > .dock-layer.is-active {
    opacity: clamp(0, calc(1 - (1 - var(--dock-morph-t)) / var(--dock-fade-window)), 1);
}
```

- The leaving face is gone by 55 % of the travel (about 82 ms on the dock spring) and the entering face starts at 45 % (about 68 ms). Each is 0.09 at the middle, so they are never at strength together.
- On the dock spring (response 0.3 s, damping 0.88) the largest 60 Hz step is 0.25 for the leaving face and 0.21 for the entering one (computed), inside W-I.8's fade bound (`:271`: at least 75 ms, at most 0.4 between samples 16.7 ms apart) and BM's law 7.
- The entering face is the pane, the one box every seat it brings is in, whatever the host authored inside it.
- Deleted with the per-child reveal: the stagger ladder, its two knobs `--dock-stagger-window-size` and `--dock-stagger-step`, and the ladder's test `GlassDock.stagger.browser.test.ts`. The one other reader, `tests-visual/release-11-0-2.spec.ts:1466`, now reads `--dock-fade-window`. value.js names the old knobs only in `bench/paired/sheets/*.css`, copies of glass's built sheets.
- Under reduced motion the scalar lands in one frame and 11.1.1's pane crossfade carries the change, as before (witness: 200 to 205 ms, steps of at most 0.1, on both trees, Chromium).

**Read** (witness, Chromium, the three horizontal pages): the entering face goes from its last 0 to its first 1 in 174 to 185 ms with steps of 0.20 to 0.22 within 17.5 ms, the leaving face in 74 to 77 ms with steps of 0.25 to 0.27, and the two faces together peak at 0.07 to 0.09 on the fourier repro and the grouped page (base: 0.63 to 1; on the harness page a persistent seat stands in the seal's place and reads 1 on both trees). Two readings break the step bound, both in a morph with a long frame at its start: the leaving face on the fourier repro's first hover open after the page loads at 1440, 0.45 in each scheme after a 25 ms second frame. The witness's earlier runs of the patch read up to 0.91 there after 59 to 66 ms frames, and 0.41 to 0.91 on three closes after 24 to 75 ms frames. They are the long frames' (below). WebKit (its loaded run): 171 to 201 ms in steps of 0.18 to 0.35, 78 to 98 ms in steps of 0.10 to 0.33, the two faces together at 0 to 0.09 (base 0.57 to 1), and no reading over the bound.

### The first step: keyframes.js

Every open's first step is a fixed distance whatever the frame's length (record: 32.8 px at 1440 in both engines). keyframes.js's managed loop takes its first step as 16.667 ms:

```ts
const dt = this._lastFrameT ? now - this._lastFrameT : 16.667;   // keyframes.js src/animation/physics/playback.ts:242 (origin/master)
```

In glass's 6.0.0 dist this is `sequence-BvpIpCGp.js:119-121`. At 120 Hz the first frame paints the spring's 16.7 ms state 8 ms early, so the start has no ease-in; after a long first frame the next frame catches up in one step (below).

**The cure is keyframes.js's: the first painted frame is the spring's start (a first step of 0), and the clock runs from there.** wi8's own loop does this (`useDockBody.ts:949`) and eases in. The earlier draft of this cure, the time from `drive()` to the first frame, would make the step after a long first frame larger, not smaller. glass declares keyframes.js `^6.0.0` and its lockfile holds 6.0.0: a keyframes.js release reaches glass's build when glass's lockfile moves, and each site when its own lockfile moves, with no glass release needed.

### Long frames

**They come at a morph's start.** Counted again from the record's morph segments (a segment whose plate travels more than 40 px), a long frame (over 25 ms) lands on a morph's second frame in 16 % of Chromium's 163 morphs, against 1.2 % on its first and third, and on its first frame in 27 % of WebKit's 164. Load lengthens frames, but it does not choose a frame index. The earlier verdict, "no dock work fills those frames", rested on four traced closes and is withdrawn.

**What fills them, read.** `tools/root/trace-frames.mjs` traces the fourier repro at 1440 light in Chromium, marking every rendered frame of 8 opens and 8 closes in the timeline, and sums the main thread's events per frame interval.

- **Under a 4x CPU throttle** (`trace-cure-x4.json`, the patched tree), the interval that ends in the first frame with `[data-morphing]` lasts 24 to 86 ms on all 16 morphs, against 8 to 15 ms for the frames after it. 15 to 55 ms of it is style recalculation of the dock's own subtree inside the task that arms the morph: two to three full recalcs of 66 to 72 elements on an open (six to seven on a close, whose task also holds the trace's focus and key event), forced by the arm's reads (the posture's new layout in `measure`, `dockMorphMeasure.ts`, then the panes' boxes in `anchor` once `[data-morphing]` and the scalar are set, `useDockMorph.ts:80-93`). A steady morph frame restyles the same 66 elements in 4 to 10 ms, since `--dock-morph-t` is registered `inherits: true` (`styles/index.css:105-109`) and written on the root every frame.
- **Unthrottled** (`trace-cure-x1.json`, the same tree and repro), the arm's interval lasts 10 to 27 ms on 15 of the 16 morphs and 56 ms on the first open after the page loads, against a median of 7.3 ms for the frames after it (1.5 to 11 ms, and one of 42 ms); its style recalculation is 5 to 18 ms against 0.7 to 4.4 ms. The witness's long frame (59 to 66 ms) and the seal series' (36 ms) are that first open after a load: every witness cell loads the page fresh.
- **Which frame.** The trace stamps a frame when its callback runs, so the arm ends the interval before the first frame with the flag. A Chromium frame's time is the moment the frame was begun, which can come before a main thread still busy with the arm, so on the clock the spring and the record read, the same cost falls in the second interval. That fits the record's 16 % on Chromium's second frame; it was not traced.

**Why a long frame shows as a jump.** The spring's clock runs on wall time. The fourier repro's open at 1440 (`tools/fold/seal-series.mjs`, Chromium, the patched tree) paints the first spring frame at `p = 0.05` (the fixed 16.7 ms step), then waits 36 ms, then paints `p = 0.32`: the leaving face falls from 0.91 to 0.41 and the plate covers a quarter of its travel in one frame. That is the 0.45 to 0.91 step above, and the record's 47 to 363 px steps.

**Placement.** The arm's cost is not a patch: it is the shape of `measure` and `anchor` (read, write, read again, in one task) and of a scalar that restyles the whole subtree each frame. It is a hard cell of 11.2.0 (*Hard cells*, 7). keyframes.js's first-step cure bounds the jump that follows a long first frame; it does not shorten the frame.

### wi8's end snap

The record has wi8's last frame stepping 0.5 to 0.66 px against the direction of travel. The cause is in `useDockBody.ts:38-39` and `:956`: each edge lands when it is within `SNAP_PX` 0.25 px and slower than `SNAP_V` 8 px/s. A close undershoots and creeps back, then both edges land in one frame, so the width steps up to twice 0.25 px backwards. This is a hard cell of 11.2.0.

## 2. The plate drifts sideways while it animates

The plate holds its centre on glass's own docks (0.01 to 0.23 px, both engines). What drifts is the content, and on a page with flow siblings, the layout box.

### Content drift, root 1: the pad lerp (glass)

`morph.css:119-123` (horizontal) and `:150-154` (vertical) interpolate the root's inline pad on `--dock-expand-t`, 8 px collapsed to 12 px open at the house density.

The morph's visible size is the root's `scale` over a box reserved at the open width (`layers.css:127-132`, `shape.css:105`). So the pad does not size the plate; it only moves the content inside the reserved box. `anchorPanes` reads the origins and the pane shift once, at the arm (`dockMorphMeasure.ts:656-774`), and every seat and the seal then slides by the pad's change:

- **Seats and seal.** 3.8 to 3.9 px on every base open and close, in both faces: the entering seats, the leaving seal on an open and the leaving seats on a close (witness).
- **Persistent regions.** A region's origin holds the box laid at the arm, so it lands `s` × 4 px off its rest and steps at the settle: +0.97 px on the harness page (Chromium).

### Content drift, root 2: the reveal's scale (glass)

`layers.css:315` scales each direct child of the active pane from 0.82 to 1 about its own centre. When the child is a group with a box, each of its seats slides along the dock by 0.18 times its distance from the group's centre:

- **color.** The run's child is a `DockLayerGroup`, 460 px and 6 seats (value.js `demo/shell/dock/Dock.vue:306`): seat 0 moves −32 px and seat 5 +28 px (the record's 31.6 px).
- **glass's bottom dock.** A 10-seat `fading-scroll` group: 49.6 px.
- **fourier.** The `.page-seats` group (`AppDock.vue:447-459`, 3 seats): 8.5 to 9.9 px at 1440, the pad's 4 px included.

### Cure (11.1.2)

- **The pad.** It takes each posture's own value, `--dock-padding-inline` open and `--dock-pad-collapsed` under `.collapsed`, with no lerp. The posture class is the end state from a morph's first frame, and the visible size is the `scale`'s, so nothing at rest changes. The vertical dock's block pad is pinned the same way.
- **The pop.** Deleted with item 1's cure.
- **The persistent regions.** Pinning the pad moved a persistent region's laid box at a close's arm: a close from rest starts unscaled, where no origin moves a region, so the first frame painted the collapsed posture's layout, a pad's difference from the box it painted (4 px in one frame on the harness page, `tools/fold/pers-series-chromium.txt`). `anchor` now writes that difference as `--dock-region-shift` when the morph starts unscaled, and `shape.css` translates the region by it times `1 − --dock-morph-t`: the box it painted at the first frame, its rest at the end. An open starts scaled, where the region's origin already holds the box it painted, so it writes none.

**Read** (witness): every seat and the seal travel 0 to 0.02 px while visible, on the fourier repro, the grouped page and the harness page, and so do the vertical dock's entering seats, against 3.8 to 15.6 px on base, in both engines; in WebKit the grouped page's seal on a close is the exception, item 4's fractional step. The harness's persistent seat moves 0.09 to 0.13 px at the settle (Chromium), against 0.97 px. In WebKit it moves 0.19 to 0.21 px at the settle.

A persistent seat still rides the plate's moving edge, as on base: 83.5 px on the harness page, in steps of up to 6.5 px at 120 Hz. With the region's shift its step into the first frame of an open and of a close is 0 px in both engines (`tools/fold/pers-series-chromium-shift.txt`, `pers-series-webkit.txt`), and the vertical dock's persistent seat slides its 4 px with steps of at most 0.7 px. Riding the edge is hard cell 2 of 11.2.0.

### The layout box changes in one frame

On 11.1.x the root reserves the open width from the open's first frame (`layers.css:127-132`) and drops it at the settle. Anything beside the dock in the page's flow moves by the change in one frame.

- **fourier.** The dock stands alone in a centred flex header (`AppDock.vue:386-387`, `:540-547`) with a fixed block size, so nothing on fourier moves.
- **atlas** (its own film, glass 10.1.2). A closing figure dock gives its row the open tray's width (33 to 104 px) until glass's settle frame, 275 to 292 ms after the dock looks closed, then takes it back in one frame. At 390 that wraps the row, and the figure drops 64 px for about 500 ms. 11.1.2's settle at the first crossing takes out the 280 to 300 ms tail, so the hold ends when the dock is seen to close, but the step stays. atlas can avoid it now by holding its dock out of the row's flow until glass's morph has landed (*Sites*).
- **glass.** No cure fits a patch: the box has to stop changing, not change more slowly (P5 forbids animating layout). This is BM's capsule window (DESIGN.md §6, §9: the layout box stays and nothing is written per frame), and a hard cell of 11.2.0, with atlas as its witness.

### daraksha

daraksha's plate drift is its own. daraksha at 61b36f0 draws its theme seat as a second, never-folding dock beside the main plate (the fission row), and translates the whole row, the main dock included, to keep the pair centred as the seat pulls out:

```css
.fission { translate: calc(-0.5 * (var(--seat-w) * var(--a) + var(--seat-gap) * var(--g))) 0; }   /* src/shell/SiteDock.vue:476-488 */
```

That runs on glass's `--dock-morph-t`, mirrored onto the row each frame (`SiteDock.vue:69-115`). A plate that grows about its own centre by Δ inside a row that moves by X moves its left edge by −Δ/2 − X and its right edge by +Δ/2 − X. The record's edges give X = 58.95 px at 1440 (−180.1, +62.2) and at 390 (−154.6, +36.7): the same at both widths, as a fixed seat width and gap would give, with no remainder for glass. The bump does not cure it. daraksha's own cure is to centre the pair at rest and not re-centre it while the dock moves; glass's 11.2.0 fission seat carries it as a hard cell.

### wi8

- **Seats.** wi8's seats ride the plate's edge: 145 to 168 px at 1440. Its seat and region translates are written per frame (`useDockBody.ts:1089-1102`). BM §6 has the seats stand still while the edge cuts them.
- **WebKit edge.** The start-aligned dock's left edge jumps 15.3 px in the open's first frame.

Both are hard cells of 11.2.0.

## 3. Hovering, pressing or reaching the theme seat moves the dock or the seat

Hover moves nothing on any site, in either engine (record).

### The press, live fourier (Chromium, both widths and schemes)

| time after the press | event |
| --- | --- |
| 13.7 ms | `pointerdown`, then `focusin` on the theme seat |
| 22 ms | `click` |
| 27 ms | the scheme flips |
| 86 ms | one `scroll` event, `scrollLeft` 0 → 4; `scrollend` 0.9 ms later |

The run is flagged `data-run-fits`, but its content is 4 px wider than its port (`scrollWidth` 696 against `clientWidth` 692), because the yielded reserves stop at the ring's reach (`run.css:386-440`). Every seat moved 4 px left in that one frame.

### The key

A key's reach goes the same way. With About focused, ArrowRight moves focus to the theme seat, which matches `:focus-visible`: on base every seat moves 4 px at 1440 and 14 px at 390, in one frame, in both engines (witness, `key`).

### Root (glass)

1. **Reach counts the ring's room for a press that draws no ring.**
   - The run calls `reach` on every `click` and `focusin`, in capture (`useDockRun.ts:401-406`, `:449-450`).
   - `occluded` (`:217-229`) counts a seat as cut when its box enters the run's reserve, the room kept for its focus ring. The theme seat is whole in the port, but its ring's room at the run's end is cut. A pointer press draws no ring, yet it reached.
2. **A run that fits is still a scroll port.** Its yielded reserve boxes stop at the ring's reach, so a fitting run can overflow its port by up to twice that reach, and a reach for a ring (a key's, rightly) scrolls the whole row to show it.
3. **The glide is not a glide.** `reach` writes `scrollLeft` frame by frame from a spring (`:268-273`) into a `scroll-snap-type: x mandatory` port (`run.css:260`). The engine snaps every offset written into a mandatory container, so the glide's writes snap back to 0 until one passes the midpoint, which snaps to the far end: the whole travel lands in one frame, 75 to 134 ms in, across both engines. At 390 the repro's run does not fit (12 to 14 px over), so the seat's own box is cut and the reach is right, but it too lands in one frame.

gaggle's report put its own one-frame jump (its G1) on the engine's focus scroll, with `reach` giving way to it. The 390 press and key cells below glide with the patch over 8 to 14 frames, which a native one-frame focus scroll could not produce: the jump was the glide's own writes, snapped.

### Cure (11.1.2), `useDockRun.ts` and `run.css`

- **`occluded(run, seat, ring)`.** It counts the reserve only when `ring` is set. `onActivate` sets `ring` for a `focusin` whose target matches `:focus-visible`, a key's focus; a click, a tap and a pointer's focus get none. The keyboard path (`moveTo`) keeps `ring`.
- **A fitting horizontal run is no scroll port.** `run.css` gives `.glass-dock[data-run-fits]:not(.vertical) :where(.dock-layers) > .dock-run` `overflow: visible`: every seat stands where it rests, and the end seat's ring paints into the dock's own padding. `occluded` is false on a run that is no port. This is wi8's RU-52 (`run.css:524-529` there) on one axis. The vertical run keeps its port: its reserve yields as padding, so a fitting vertical run has nothing to scroll, and a non-scroller with `pan-y` would hand a swipe on the column to the page.
- **`holdSnap`.** The glide sets `scroll-snap-type: none` inline on the run for its length and removes it in `onSettle`. It lands on `anchorFor`'s snap position, so handing the snap back moves nothing.
- **One glide at a time.** A reach whose seat a running glide will land in view leaves that glide alone, so the snap is handed back only where a glide ends, on a snap position; a reach whose seat the glide would leave out of view takes the travel over. The first draft stopped any glide when a seat was in view, which could hand the snap back mid-way.

**Read** (witness, both engines): at 1440 the press and the key move no seat (0 px, 0 frames); at 390 both glide 14 px: over 14 frames of at most 1 px in Chromium (8 to 9 ms apart at the largest step), and over 8 to 10 frames of at most 2 to 3 px in WebKit's loaded run (7 to 16 ms at the largest step). One earlier Chromium run of the same run code read the key's glide at 390 dark in 7 frames with an 8 px step; that run did not record frame lengths, so whether a long frame inside the glide (a spring on the clock) made that step is not read. The witness now records the frame length at the largest step. The `data-run-fits` flag reads the same on both trees in every cell. On base, WebKit's press at 1440 already moves nothing on 11.1.1; its key moves the row 4 px in one frame.

### wi8

- **1440: cured.** RU-52 leaves a fitting run nothing to scroll.
- **390: carried, 16 px.** wi8's `useDockRun.ts` has the same `occluded` (`:243`), the same glide (`:316`) on the same mandatory port, and the same activation (`:489`, `:538-539`). The 390 jump is a hard cell of 11.2.0.

## 4. The collapse's last frames jump

### Root (glass)

1. **A tail nobody sees.**
   - `useDockSpring.ts:95-104` builds the `SpringProgress` without settle thresholds, so keyframes.js's defaults hold: 1e-3 on position and 1e-3/s on velocity, for a 0→1 scalar.
   - Every channel the scalar drives clamps at 1: the size blend (`layers.css:92-105`) and both faces' fades.
   - The spring first crosses 1 at about 266 ms. Then 280 to 300 ms pass with nothing visible moving, the reserved box and the `scale` held, until `settle` (`useDockMorph.ts:61-73`) drops both in one frame, 548 to 558 ms in.
2. **Endpoints read as whole pixels.**
   - `getSize` reads `offsetWidth`/`offsetHeight` (`dockMorphMeasure.ts:7-11`), which round.
   - On live fourier at 1440 (Chromium) the measure writes `--dock-collapsed-px: 57px` for a 56.6875 px dock and `--dock-expanded-px: 712px` for 712.438 px (`:316-320`): the plate's −0.31 px at the close's settle and +0.44 px at the open's.
   - The pane shift is a percentage of the pane's size, read the same way (`:772`). fourier's seal is 40.6875 px and was read as 41, so the seal stepped +2.52 px at the settle (Chromium; the record's WebKit +4.01 px).
   - The diagnostic log is `tools/root/diag-close-fourier-1440.json`, from `tools/root/diag-close.mjs`.
3. **The pad lerp** (item 2) moves a persistent region at the settle: +0.97 px on the harness page.

### Cure (11.1.2)

- **`useDockMorph.ts`.** `settle()` runs on the frame where the live spring first reaches 1. Nothing it drives moves after that frame. Under reduced motion the spring has already settled, and `onSettle` lands it as before. A reversal after the landing starts fresh from 0, since the morph has landed.
- **`dockMorphMeasure.ts`.** `getSize` reads the used size from `getComputedStyle`, adding padding and border for a `content-box` element. It keeps `offset*` only where the computed size is not a length. The rest port that sets `data-run-fits` mid-morph (`expandedPx − chrome − runEdge`) now reads all three terms to the fraction, so they cancel as before; at rest the flag still compares `offset*` seats with `clientWidth`.

**Read** (witness, Chromium): an open or a close ends at 258 to 267 ms instead of 550 to 558 ms; the seal moves 0 px at the settle on the fourier repro and the grouped page (base: 0.02 and 0.83 px); the last of the plate's last five width steps is the smallest in every cell (fourier at 1440 light: open +2.73, +2.17, +1.72, +1.30, +0.94; close −1.97, −1.97, −1.26, −0.89, −0.06). On base the last steps are 0, 0, 0, 0, then the settle frame's. WebKit: 268 to 300 ms instead of 554 to 592 ms, in its loaded run with 26 to 51 ms frames in every 1440 close; the fourier repro's seal 0 px at the settle; the last step the smallest of five in every cell; the grouped page's seal 0.49 px at 1440 (base 1.31 px), the fractional step hard cell 4 carries.

### wi8

- There is no separate settle frame, so the tail is gone.
- The 0.5 to 0.66 px end snap (item 1) is carried.

## 5. The theme seat's tooltip anchors at the screen's left edge

### fourier: not rooted

fourier's theme seat has no DOM tooltip. "Switch to dark mode" is its `title` attribute (fourier `DarkModeToggle.vue:35`, a `DockControl` with `:title`), and the bundle fourier.babb.dev serves binds it and draws the phrase nowhere else (the critic's read of `/assets/index-C1BDtyX4.js`). The browser draws that tooltip outside the page, and neither headless engine draws one, so the record holds no reading of it. A native tooltip is placed at the pointer, so the owner's frame, the tooltip at the screen's far left with the pointer on the seat at the right, is not explained by "the browser's own tooltip".

The reading owed is the owner's: the browser and its version, the page's zoom, and which display the window was on. Replacing the native `title` with glass's `Tooltip`, as keyframes and daraksha do, is a recommendation to fourier, not a cure: their tooltips sit on the seat, 0 to 0.4 px off centre in both engines (record).

### glass: an overlay from the collapsed face outlives the open

keyframes' `#collapsed` seat keeps its tooltip open through a hover open, and the tooltip then follows the hidden seal 142 to 145 px along the open dock (record, WebKit; Chromium did not open that tooltip, a race between the tooltip's delay and the hover open).

- **Root.** `participation.ts:124-130` closes an overlay from the face on the collapse edge only, and `TooltipContent.vue` takes part with no `close`. Nothing closes an overlay opened from `#collapsed` when the expand hides its trigger. The root is no engine's: on the witness page (`tools/root/slim/tip-dock.vue`, the seal in a glass tooltip with no delay) base keeps the tooltip open 1.5 s after the open and carries it 112 px with the hidden seal, in Chromium.
- **Cure (11.1.2).**
  - `dockContext.ts`: `DockFace` takes `collapsed`; `GlassDock.vue` renders `#collapsed` in `<DockFace collapsed>`; `useDockFace()` names the face a descendant was authored in.
  - `participation.ts`: an overlay closes on the posture edge that hides its trigger, the collapse for the face and the expand for `#collapsed`. `data-glass-dock-face` still marks the face alone.
  - `TooltipContent.vue` passes `close: () => tooltipRoot.onClose()`, reka's own close (reka-ui 2.10.1 `Tooltip/TooltipRoot.js:111`), so a face's tooltip also closes on the collapse.
- **Read.** With the patch the tooltip closes 57 to 60 ms (Chromium) and 59 to 61 ms (WebKit) after it opened, as the dock opens, and does not move; on base it is still open 1.5 s later and has travelled 112 px, in both engines. Two unit cases (`GlassDock.collapse-closes-overlays.test.ts`: a popover and a tooltip in `#collapsed`) fail on base and pass with the patch.
- **wi8 carries the fault** (wi8 `participation.ts:129-133`, the same): a hard cell of 11.2.0.

## The patch

`cure-11.1.2.patch`, against `release/11.1.1`, made with `git diff` from the witnessed tree.

| file | change | items |
| --- | --- | --- |
| `src/components/dock/styles/layers.css` | The two faces on one window, on the panes; the per-child reveal, its 0.82 pop and the stagger ladder deleted; the active-pane and single-owner notes rewritten. | 1, 2 |
| `src/components/dock/styles/shell.css` | `--dock-stagger-window-size` and `--dock-stagger-step` replaced by `--dock-fade-window: 0.55`. | 1 |
| `src/components/dock/styles/morph.css` | The pad takes each posture's value, horizontal and vertical; the summary's scalar note rewritten. | 2, 4 |
| `src/components/dock/styles/run.css` | A fitting horizontal run is no scroll port. | 3 |
| `src/components/dock/composables/dockMorphMeasure.ts` | `getSize` reads the fraction; `anchor` writes a persistent region's start shift for a morph that starts unscaled. | 2, 4 |
| `src/components/dock/styles/index.css`, `src/components/dock/styles/shape.css` | `--dock-region-shift` registered; a persistent region carries it scaled by `1 − --dock-morph-t`. | 2 |
| `src/components/dock/composables/useDockMorph.ts` | Settle at the scalar's first crossing. | 4 |
| `src/components/dock/composables/useDockRun.ts` | Ring-aware `occluded`, false on a run that is no port; snapping held for the glide; one glide at a time. | 3 |
| `src/components/dock/composables/dockContext.ts`, `src/components/dock/GlassDock.vue` | `DockFace collapsed` around `#collapsed`; `useDockFace()`. | 5 |
| `src/components/_shared/overlay/participation.ts` | Close on the edge that hides the trigger. | 5 |
| `src/components/tooltip/TooltipContent.vue` | Passes its close. | 5 |
| `tests-visual/release-11-0-2.spec.ts` | The fold spec reads `--dock-fade-window`. | 1 |
| `tests/components/custom/dock/GlassDock.collapse-closes-overlays.test.ts` | Two cases for `#collapsed`. | 5 |
| `tests/components/custom/dock/GlassDock.stagger.browser.test.ts` | Deleted with the stagger. | 1 |

### Placement

Every cure above is a shipped 11.1.x defect. It goes in 11.1.2, after the phone-scroll row; 11.1.1's list stays as it is.

### Hard cells for 11.2.0's measure (wi8 carries these)

1. **Layout box.** Through an open and a close the dock's layout box does not change, and nothing beside it in flow moves (item 2). Witness: atlas's figure docks at 390.
2. **No seat rides the edge.** No seat, seal or persistent region moves along the dock while the plate opens or closes: 0 px against wi8's 145 to 168 px, atlas's end-anchored figure docks' 104 px and 11.1.2's 4 px persistent seat (item 2, BM §6).
3. **No edge jump, both engines.** A start-aligned dock's fixed edge moves 0 px in the first frame in WebKit too (item 2).
4. **End steps.** The last frame of an open or a close steps in the direction of travel and is no larger than the median of the three steps before it; no edge lands against its travel (wi8's 0.5 to 0.66 px snap); no seal steps at the settle in either engine (11.1.2 leaves a fractional seal's step in WebKit, *The witness*).
5. **A press does not move the row.** A pointer press on a seat whose box is whole moves no seat. A reach on a run that does not fit glides: at least five frames, none over 2/5 of the travel (wi8's 16 px at 390).
6. **Overlays outlive no face.** An overlay opened from a face closes on the edge that hides its trigger: the expanded face on collapse, `#collapsed` on expand (item 5).
7. **The arm costs one frame's work.** Under a 4x CPU throttle in Chromium, no frame among a morph's first three is longer than twice the median of the rest, and the arm forces at most one style recalculation of the dock (item 1).
8. **The fission seat holds the plate.** The main plate stays where it rests while the seat leaves it and while it returns (daraksha, item 2).

## The witness

`tools/root/witness.mjs` builds no server. It serves each tree's `slim-dist` through `page.route`, with one browser per run and a context per cell, closing everything in `finally`.

**The trees.** Each came from `git archive release/11.1.1` with `docs/` left out, with phone-scroll's `cure.patch` applied (base) and `npm ci --ignore-scripts`; the cure tree is base with this patch. Each built `tools/root/slim/`: fourier's repro mount (`tools/mounts/fourier-dock.vue`), the harness dock page (`dock-h-closed`, and `dock-v-closed` for the vertical cell), a grouped run with a fourier-sized seal (`group-dock.vue`) and the collapsed seal in a tooltip (`tip-dock.vue`).

**What is read.**

| reading | meaning |
| --- | --- |
| pop | The largest effective opacity of any run seat at the open's first morph frame. |
| fade | A face's fade: ms from its last sample at one end to its first at the other, and the largest change between two samples at most 17.5 ms apart. |
| both | The largest min(seal, strongest run seat) in any frame. |
| drift | The largest travel of a seat's centre while it is visible (effective opacity over 0.02): the entering seats on an open, the leaving seal on an open and the leaving seats on a close. |
| seal | The seal's travel over a close while visible, then its move in the settle frame. |
| pers | The harness's persistent seat's move in the settle frame. |
| tail | ms from the scalar's first reaching 1 to the settle frame. |
| press, key | The first seat's largest move in 1.3 s after a press on the theme seat, or after a key's reach of it from About; its largest single step; frames moved. |
| tip | Whether a tooltip opened from the collapsed seal is still open 1.5 s after the hover that opened it and the dock, and how far it travelled. |
| last | The plate width's last five steps, the settle frame last. |

The full readings are `tools/root/witness-chromium-11.1.2.json` and `tools/root/witness-webkit-11.1.2.json` (both trees, the patch before the region's shift), with `witness-chromium-11.1.2-cure.json` and `witness-webkit-11.1.2-cure.json` (the patch as it stands); the tables take base from the first and the patch from the second. `python3 tools/fold/tables.py <json> [<rerun json>]` prints the tables below. The v11.1.0 readings the first witness took are kept in `tools/root/witness-chromium.json` and `witness-webkit.json`.

### Chromium

**Faces and landing** (the fourier repro, and the grouped page's seal at the settle)

| cell | tree | pop | entering fade, open: ms / largest 17.5 ms step | leaving fade, open | entering fade, close | leaving fade, close | both faces, open / close | seal at the settle (fourier / group) | tail (open / close) | open, close (ms) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 light | base | 1 | – | 234 / 0.46 | 58 / 0.58 | 237 / 0.23 | 1 / 0.7 | 0.02 / 0.83 | 283 / 295 | 550, 558 |
| 1440 light | cure | 0 | 183 / 0.21 | 75 / 0.45 | 184 / 0.22 | 74 / 0.26 | 0.09 / 0.07 | 0 / 0 | – / – | 258, 267 |
| 1440 dark | base | 1 | – | 233 / 0.45 | 57 / 0.37 | 240 / 0.15 | 1 / 0.7 | 0.02 / 0.83 | 296 / 296 | 554, 553 |
| 1440 dark | cure | 0 | 182 / 0.21 | 75 / 0.45 | 176 / 0.22 | 76 / 0.25 | 0.09 / 0.08 | 0 / 0 | – / – | 258, 258 |
| 390 light | base | 1 | – | 239 / 0.15 | 58 / 0.45 | 237 / 0.21 | 1 / 0.63 | 0.02 / 0.02 | 287 / 292 | 550, 554 |
| 390 light | cure | 0 | 184 / 0.20 | 74 / 0.25 | 184 / 0.22 | 75 / 0.25 | 0.09 / 0.08 | 0 / 0 | – / – | 258, 267 |
| 390 dark | base | 1 | – | 237 / 0.15 | 55 / 0.45 | 235 / 0.18 | 1 / 0.7 | 0.02 / 0.02 | 292 / 291 | 553, 557 |
| 390 dark | cure | 0 | 182 / 0.20 | 74 / 0.25 | 183 / 0.20 | 74 / 0.26 | 0.09 / 0.09 | 0 / 0 | – / – | 258, 267 |

**Drift, press and key**

| cell | tree | entering seats' drift, open (fourier / group / harness) | leaving face's drift (seal on open / seats on close, fourier) | seal's drift, close (fourier / group) | harness persistent seat at the settle | press: move, largest step, frames | key: move, largest step, frames | run fits / overflow |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 light | base | 4.16 / 14.69 / 3.85 | 3.91 / 3.93 | 3.82 / 3.81 | 0.97 | -4, 4, 1 | -4, 4, 1 | True / auto |
| 1440 light | cure | 0.02 / 0 / 0 | 0 / 0 | 0 / 0 | 0.13 | 0, 0, 0 | 0, 0, 0 | True / visible |
| 1440 dark | base | 4.15 / 14.69 / 3.85 | 3.91 / 3.91 | 3.82 / 3.81 | 0.97 | -4, 4, 1 | -4, 4, 1 | True / auto |
| 1440 dark | cure | 0.02 / 0 / 0 | 0 / 0 | 0 / 0 | 0.09 | 0, 0, 0 | 0, 0, 0 | True / visible |
| 390 light | base | 4 / 15.64 / – | 3.89 / 6.63 | 3.82 / 3.82 | – | -14, 14, 1 | -14, 14, 1 | False / auto |
| 390 light | cure | 0 / 0 / – | 0 / 0 | 0 / 0 | – | -14, 1, 14 (8.4 ms) | -14, 1, 14 (8.1 ms) | False / auto |
| 390 dark | base | 4 / 15.64 / – | 3.89 / 6.55 | 3.82 / 3.82 | – | -14, 14, 1 | -14, 14, 1 | False / auto |
| 390 dark | cure | 0 / 0 / – | 0 / 0 | 0 / 0 | – | -14, 1, 14 (9.2 ms) | -14, 1, 14 (8.4 ms) | False / auto |

**The harness page's persistent seat** (its step into the first frame, and its largest step, in px)

- 1440 light cure: open 0, largest 6.49; close 0, largest 5.83
- 1440 dark cure: open 0, largest 6.34; close 0, largest 6.04

**Last five plate-width steps into the settle frame** (fourier repro)

- 1440 light base: open [0, 0, 0, 0, 0.03]; close [0, 0, 0, 0, 0]; long frames in the close []
- 1440 light cure: open [2.73, 2.17, 1.72, 1.3, 0.94]; close [-1.97, -1.97, -1.26, -0.89, -0.06]; long frames in the close []
- 1440 dark base: open [0, 0, 0, 0, 0.03]; close [0, 0, 0, 0, 0]; long frames in the close []
- 1440 dark cure: open [2.28, 2.53, 1.57, 1.36, 1.12]; close [-2.6, -2.1, -1.65, -1.24, -0.72]; long frames in the close []
- 390 light base: open [0, 0, 0, 0, 0]; close [0, 0, 0, 0, 0]; long frames in the close [25]
- 390 light cure: open [1.05, 1.19, 0.78, 0.66, 0.42]; close [-1.03, -0.78, -0.61, -0.39, -0.04]; long frames in the close []
- 390 dark base: open [0, 0, 0, 0, 0]; close [0, 0, 0, 0, 0]; long frames in the close []
- 390 dark cure: open [1.28, 0.96, 0.76, 0.62, 0.5]; close [-1.02, -0.8, -0.6, -0.38, -0.04]; long frames in the close []

**The collapsed seal's tooltip** (tip page, 1440)

- 1440 light base: opened True, open 1.5 s later True, last open at 1507.4 ms, travel 112 px
- 1440 light cure: opened True, open 1.5 s later False, last open at 59.1 ms, travel 0 px
- 1440 dark base: opened True, open 1.5 s later True, last open at 1503.6 ms, travel 112 px
- 1440 dark cure: opened True, open 1.5 s later False, last open at 59.9 ms, travel 0 px

**Extra cells** (1440 light)

- reduced motion base: width steps open [671.03] close [-671.03]; fades open in 202 / 0.10 out 202 / 0.10, close in 205 / 0.10 out 205 / 0.10; frames with the morph flag 0 / 0
- reduced motion cure: width steps open [671.03] close [-671.03]; fades open in 201 / 0.09 out 201 / 0.10, close in 200 / 0.10 out 200 / 0.10; frames with the morph flag 0 / 0
- vertical base: pop 0.124, entering seats' drift 4.07, leaving seal's drift on open 4.01, seal's drift on close 5.27, leaving seats' drift on close 1.57, seal at the settle -1.27, entering fade 73 / 0.88, leaving fade on close 240 / 0.27, open 556.2 ms, close 557 ms, last steps [0, 0, 0, 0, 0] / [0, 0, 0, 0, 0]
- vertical cure: pop 0, entering seats' drift 0, leaving seal's drift on open 4, seal's drift on close 4, leaving seats' drift on close 0, seal at the settle 0, entering fade 183 / 0.21, leaving fade on close 74 / 0.25, open 266.9 ms, close 266.2 ms, last steps [0.4, 0.43, 0.27, 0.19, 0] / [-0.38, -0.43, -0.26, -0.17, -0.02], persistent seat first / largest step open 0 / 0.7, close 0 / 0.37

### WebKit (under `guarded --exclusive webkit`)

**Read.** Base is `witness-webkit-11.1.2.json`; the patch as it stands is `witness-webkit-11.1.2-cure.json`, a run taken under machine load (load average 33 to 42), its frames often 20 to 50 ms, so its 17.5 ms step readings count fewer pairs. WebKit agrees with Chromium on every cured reading, with three differences. No cure reading breaks the 0.4 step bound (the largest is 0.35). On 11.1.1 a press at 1440 already moves no seat in WebKit, while a key's reach moves the row 4 px in one frame as in Chromium; v11.1.0's press moved it 4 px (`witness-webkit.json`). The grouped page's seal still steps 0.49 px at the close's settle at 1440 (base 1.31 px), under one device pixel at the witness's 2x scale; it is not rooted here, and hard cell 4 carries it. Under reduced motion the loaded run read no two frames within 17.5 ms; the run before it, of the patch without the region's shift (which a reduced-motion change never writes, since it never sets `[data-morphing]`), read both trees crossing over 197 to 213 ms in steps of at most 0.09.

**Faces and landing** (the fourier repro, and the grouped page's seal at the settle)

| cell | tree | pop | entering fade, open: ms / largest 17.5 ms step | leaving fade, open | entering fade, close | leaving fade, close | both faces, open / close | seal at the settle (fourier / group) | tail (open / close) | open, close (ms) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 light | base | 1 | – | 243 / 0.16 | 76 / 0.00 | 246 / 0.19 | 1 / 0.57 | 0 / 1.31 | 298 / 325 | 560, 592 |
| 1440 light | cure | 0 | 185 / 0.35 | 97 / 0.10 | 197 / 0.19 | 89 / 0.22 | 0.09 / 0.09 | 0 / 0.49 | – / – | 276, 300 |
| 1440 dark | base | 1 | – | 237 / 0.09 | 55 / 0.33 | 251 / 0.14 | 1 / 0.7 | 0 / 1.31 | 287 / 317 | 554, 579 |
| 1440 dark | cure | 0 | 183 / 0.21 | 85 / 0.22 | 182 / 0.20 | 82 / 0.24 | 0 / 0 | 0 / 0.49 | – / – | 268, 292 |
| 390 light | base | 1 | – | 240 / 0.17 | 72 / 0.30 | 245 / 0.15 | 1 / 0.68 | 0 / 0 | 299 / 287 | 561, 568 |
| 390 light | cure | 0 | 186 / 0.21 | 96 / 0.33 | 184 / 0.22 | 95 / 0.27 | 0.03 / 0.06 | 0 / 0 | – / – | 280, 284 |
| 390 dark | base | 1 | – | 242 / 0.24 | 69 / 0.37 | 236 / 0.16 | 1 / 0.66 | 0 / 0 | 291 / 300 | 554, 568 |
| 390 dark | cure | 0 | 173 / 0.27 | 84 / 0.24 | 183 / 0.21 | 93 / 0.24 | 0 / 0.08 | 0 / 0 | – / – | 279, 282 |

**Drift, press and key**

| cell | tree | entering seats' drift, open (fourier / group / harness) | leaving face's drift (seal on open / seats on close, fourier) | seal's drift, close (fourier / group) | harness persistent seat at the settle | press: move, largest step, frames | key: move, largest step, frames | run fits / overflow |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 light | base | 8.64 / 12.65 / 3.82 | 3.86 / 3.99 | 3.79 / 3.78 | 0.97 | 0, 0, 0 | -4, 4, 1 | True / auto |
| 1440 light | cure | 0 / 0 / 0 | 0 / 0 | 0 / 0.49 | 0.19 | 0, 0, 0 | 0, 0, 0 | True / visible |
| 1440 dark | base | 9.86 / 14.64 / 3.82 | 3.91 / 3.99 | 3.79 / 3.78 | 0.97 | 0, 0, 0 | -4, 4, 1 | True / auto |
| 1440 dark | cure | 0 / 0 / 0 | 0 / 0 | 0 / 0.49 | 0.21 | 0, 0, 0 | 0, 0, 0 | True / visible |
| 390 light | base | 4 / 15.59 / – | 3.89 / 6.96 | 3.79 / 3.78 | – | -14, 14, 1 | -14, 14, 1 | False / auto |
| 390 light | cure | 0 / 0 / – | 0 / 0 | 0 / 0 | – | -14, 3, 8 (7 ms) | -14, 2, 10 (16 ms) | False / auto |
| 390 dark | base | 4 / 15.59 / – | 3.86 / 6.95 | 3.79 / 3.78 | – | -14, 14, 1 | -14, 14, 1 | False / auto |
| 390 dark | cure | 0 / 0 / – | 0 / 0 | 0 / 0 | – | -14, 2, 10 (9 ms) | -14, 2, 10 (16 ms) | False / auto |

**The harness page's persistent seat** (its step into the first frame, and its largest step, in px)

- 1440 light cure: open 0, largest 31.5; close 0, largest 16.35
- 1440 dark cure: open 0, largest 11.76; close 0, largest 12.95

**Last five plate-width steps into the settle frame** (fourier repro)

- 1440 light base: open [0, 0, 0, 0, -0.37]; close [0, 0, 0, 0, 0]; long frames in the close [60, 25, 25, 26, 46]
- 1440 light cure: open [12.34, 6.09, 5.35, 2.54, 0.75]; close [-14.29, -6.25, -4.57, -2.97, -1.46]; long frames in the close [45, 45]
- 1440 dark base: open [0, 0, 0, 0, -0.37]; close [0, 0, 0, 0, 0]; long frames in the close [45, 32]
- 1440 dark cure: open [14.46, 8.24, 6.27, 3.91, 2.13]; close [-9.81, -6.43, -4.03, -2.26, -0.04]; long frames in the close [51, 26]
- 390 light base: open [0, 0, 0, 0, 0]; close [0, 0, 0, 0, 0]; long frames in the close [48, 25]
- 390 light cure: open [4.86, 3.21, 1.93, 1.4, 0.02]; close [-5.33, -3.14, -2.14, -1.29, -0.23]; long frames in the close [38]
- 390 dark base: open [0, 0, 0, 0, 0]; close [0, 0, 0, 0, 0]; long frames in the close [59, 26]
- 390 dark cure: open [4.62, 3.29, 1.99, 1.29, 0.23]; close [-4.7, -3.8, -2.27, -1.31, -0.41]; long frames in the close [41]

**The collapsed seal's tooltip** (tip page, 1440)

- 1440 light base: opened True, open 1.5 s later True, last open at 1510 ms, travel 112 px
- 1440 light cure: opened True, open 1.5 s later False, last open at 59 ms, travel 0 px
- 1440 dark base: opened True, open 1.5 s later True, last open at 1500 ms, travel 112 px
- 1440 dark cure: opened True, open 1.5 s later False, last open at 61 ms, travel 0 px

**Extra cells** (1440 light)

- reduced motion base: width steps open [671.63] close [-671.63]; fades open in 203 / 0.09 out 213 / 0.09, close in 201 / 0.07 out 201 / 0.07; frames with the morph flag 0 / 0
- reduced motion cure: width steps open [671.63] close [-671.63]; fades open in 233 / 0.00 out 233 / 0.00, close in 333 / 0.00 out 224 / 0.00; frames with the morph flag 0 / 0
- vertical base: pop 0.124, entering seats' drift 6.97, leaving seal's drift on open 4.01, seal's drift on close 5.27, leaving seats' drift on close 1.64, seal at the settle -1.27, entering fade 57 / 0.36, leaving fade on close 241 / 0.17, open 557 ms, close 564 ms, last steps [0, 0, 0, 0, 0] / [0, 0, 0, 0, 0]
- vertical cure: pop 0, entering seats' drift 0, leaving seal's drift on open 4, seal's drift on close 4, leaving seats' drift on close 0, seal at the settle 0, entering fade 200 / 0.00, leaving fade on close 101 / 0.00, open 301 ms, close 303 ms, last steps [16.84, 9.68, 4.66, 2.02, 0.51] / [-16.58, -9.3, -4.66, -2.06, -0.47], persistent seat first / largest step open 0 / 1.07, close 0 / 1.47

## Sites at 11.1.2

| site | glass | must change at the bump | its own to cure now |
| --- | --- | --- | --- |
| fourier.babb.dev | 11.1.0 | Nothing. The Account `div.contents` fades with the face, the `.page-seats` group no longer scales, the seal lands on its rest, and the theme press and a key's reach move nothing at 1440. | Item 5 needs the owner's reading first. Moving the theme seat's `title` (`DarkModeToggle.vue:35`) to glass's `Tooltip` is recommended. |
| color.babb.dev (value.js) | 11.1.0 | Nothing; its `DockLayerGroup` no longer scales open from its centre. | – |
| keyframes.babb.dev | 11.1.0 | Nothing; its collapsed seal's tooltip now closes as the dock opens. | keyframes.js's first frame step, `src/animation/physics/playback.ts:242` (item 1). |
| daraksha.babb.dev | 11.0.2 | The bump from its 11.0.2 pin brings items 1, 3, 4 and glass's half of 2. | Its fission row's re-centring, `SiteDock.vue:476-488`: 58.95 px of the plate's drift (item 2). |
| glass.babb.dev | master | Nothing; the bottom dock's `div.contents` group fades with the face. | – |
| atlas | 10.1.2 | These cures land on the 11 line; atlas has them when it moves to 11.1.2. | Its figure dock's lift out of the row ends when the close starts (`PlateDock.vue:343`, `ChartFrame.css:441-473`): hold it until glass's morph has landed. Its rail's crest, its disc press and its pick-then-mount long frames are its own (`inbound/atlas-2026-11-23/README.md`, R1, R3, L1). |
| gaggle | 11.1.0 | Nothing; its dock never folds. A run a few px over its port (gaggle's at 320 px) now glides to a pressed seat. | Its G1 is fixed on its side (the row fits at 390 and 360). |
| Home Assistant (glass-ha) | 11.1.0 | Nothing; its dock never folds (`collapse: false`), so the fold's cures do not reach it, and its `--dock-collapsed-padding` (`frontend/src/styles/scale.css:60`) is read only by a folding dock. The press and fitting-run cures do. | – |

A site that set `--dock-stagger-window-size` or `--dock-stagger-step` would set nothing after the bump, and none at its main ref does. The window's knob is now `--dock-fade-window`.

## Checks

On the patched tree:

- `vue-tsc --noEmit -p tsconfig.src.json` is clean.
- Each unit file that reads what the patch changes passed alone (vitest, happy-dom), on the patch as it stands:

  | file | tests |
  | --- | --- |
  | `GlassDock.collapse-closes-overlays.test.ts` | 8 of 8 (the two new cases fail on base) |
  | `dockMorphMeasure.test.ts` | 28 of 28 |
  | `g-dock-lattice.test.ts` | 33, plus 1 expected fail |
  | `DockLayerSwitcher.a11y.test.ts` | 14 of 14 |
  | `GlassDock.run-mark.test.ts` | 9 of 9 |
  | `GlassDock.click-integrity.test.ts` | 8 of 8 |
  | `GlassDock.motion-parity.test.ts` | 5 of 5 |
  | `GlassDock.scroll-overflow.test.ts` | 5 of 5 |
  | `GlassDock.press-keepalive.test.ts` | 3 of 3 |

- `tests-visual/release-11-0-2.spec.ts -g "fold · a"`, the fold cells that bound each face's step by `--dock-fade-window`: 5 of 5 pass in headless Chromium (`chromium-headless-new`); in Playwright's WebKit (`webkit-2311`) 4 pass and the fifth is skipped by the spec, which counts layouts over CDP.

The browser suite (`vitest.browser.config.ts`) was not run.

## Not run

- **No real Safari or headed Chrome.** fourier's native tooltip (item 5) cannot be read here; the machine law forbids safaridriver and headed browsers.
- **A capsule seat's frost while its pane fades.** A pane's opacity below 1 makes it the backdrop root for a capsule seat's `backdrop-filter` inside it, so the capsule's frost can land when the fade ends. 11.1.x's leaving pane already did this on every close. Neither headless lane draws backdrop blur; it needs the GPU lane or Safari.
- **The harness page at 390.** It is wider than the viewport, and its tap did not open it.
- **Live sites with the patch.** Live sites are read-only, so the patch was witnessed on the repro, the harness page, the grouped page and the tooltip page.
- **A fast key traverse of a run that does not fit.** The one-glide rule is read on single reaches only.
- **The arm's cost on wi8.** Not traced.
- **A reversal mid-morph with a persistent region.** The region's shift is written only for a morph that starts unscaled; a reversal starts scaled and holds its painted box by its origin, as before. No cell reverses a morph.
- **WebKit on an idle machine after the region's shift.** Its last run was taken under load (frames often 20 to 50 ms); the run before it, of the patch without the shift, is kept beside it for the readings the shift does not touch.

## Files

- `ROOT.md`: this file. `fold.md`: the fold of `critique.md`.
- `cure-11.1.2.patch`: the patch against `release/11.1.1`.
- `tools/root/slim/`: the witness pages, their build script and the mounts.
- `tools/root/witness.mjs` and `tools/root/summarize.py`: the witness and a one-line reader; `tools/fold/tables.py`: the tables above.
- `tools/root/witness-*-11.1.2*.json`: this fold's readings; `tools/root/witness-chromium.json` and `witness-webkit.json`: the first witness's, on v11.1.0.
- `tools/root/trace-frames.mjs`, `trace-cure-x4.json` and `trace-cure-x1.json`: the morphs' first frames in the Chromium timeline.
- `tools/fold/seal-series.mjs`: one open's scalar and seal per frame. `tools/fold/pers-series.mjs`: the harness page's persistent seat per frame through an open and a close, with its readings `pers-series-chromium.txt` (base and the patch before the region's shift), `pers-series-chromium-shift.txt` and `pers-series-webkit.txt` (base and the patch). `tools/fold/ranges.py`: the ranges the prose quotes. `tools/fold/run-all.sh`: the fold's browser runs in sequence.
- `tools/root/live-probe.mjs`, `live-chromium.json`, `diag-close.mjs`, `diag-close-fourier-1440.json`, `diag-press.mjs`: the first rooting's live readings.
- `trees/`: the archive trees (440 MB), gitignored. This seat's `rm -rf` of it was denied by the permission system, so it is still there and is to be deleted by hand.

**To rerun the witness:**

1. `git archive release/11.1.1 -- . ':(exclude)docs'` into `trees/base`, apply `docs/tranches/BL/audit/phone-scroll/cure.patch` with `patch -p1`, and run `npm ci --ignore-scripts`.
2. Clone that tree (`cp -cR`) to `trees/cure` and apply this patch with `patch -p1`.
3. Run `tools/root/slim/build.sh trees/<tree>` for each tree.
4. Run `guarded -- node tools/root/witness.mjs chromium <out> base,cure`. For WebKit, run `guarded --exclusive webkit -- node tools/root/witness.mjs webkit <out> base,cure`.
