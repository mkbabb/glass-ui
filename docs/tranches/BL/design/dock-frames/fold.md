# Dock frames: the fold of the critique

Folded 2026-11-23 by a workflow seat (claude-opus-5-5). Each objection in `critique.md` is accepted, accepted in part or rejected here, with one line of reason, after its evidence was read again. What each accepted one changed in `ROOT.md` and `cure-11.1.2.patch` follows the reason, with the cells it re-witnessed.

**What was read again.** glass `release/11.1.1` (4f1fa667e) and `bl/dock/wi8` (d48c19ec8) with `git show`; `waves/W-I.8.md:92-100` and `:266-275`; `BM/study/DESIGN.md` §1 law 7; the record's 163 Chromium and 164 WebKit morph segments in `record/*.json`; daraksha `origin/master` (61b36f0) `src/shell/SiteDock.vue`; fourier-analysis `origin/master` (266bd67) `DarkModeToggle.vue`; reka-ui 2.10.1's `Tooltip/TooltipRoot.js`; keyframes.js `origin/master` (f37740c8); Home Assistant (hassio-config `master`, 0f73a6a8) `frontend/package.json` and `frontend/src/styles/scale.css`; atlas's film (`inbound/atlas-2026-11-23/README.md`).

**The new witness.** The patch is now made against `release/11.1.1` with the phone-scroll row's `cure.patch` applied, which is 11.1.2's base. Two archive trees were built: `base` (that base) and `cure` (base plus this patch). `tools/root/witness.mjs` now also reads each face's fade, the overlap of the two faces, the leaving face's drift, a key's reach of the theme seat, a tooltip opened from the collapsed seal, the harness's vertical dock and the fourier repro under reduced motion. Its readings are `tools/root/witness-chromium-11.1.2.json` and `tools/root/witness-webkit-11.1.2.json` (both trees), and `witness-*-11.1.2-cure.json` (the patch as it stands, after the change under *Found in the fold*). Chromium is Playwright 1.61.1's headless shell with `--use-angle=metal --enable-gpu-rasterization`; WebKit is its build 2311, which is not Safari. No reading depends on backdrop blur.

## Blocking

### B1. The face fades in about 55 ms over the leaving face — accepted

**Reason.** R-3 (`W-I.8.md:92-95`) is one window read by both faces, out then in, and W-I.8's fade bound (`:271`) and BM's law 7 both fail a 46 to 73 ms fade over a face still at 0.7; the patch kept only half of R-3.

**Changed.**

- Both panes now read R-3's pair on the one scalar `p = --dock-morph-t`: the leaving pane `clamp(0, 1 − p / 0.55, 1)` and the entering pane `clamp(0, 1 − (1 − p) / 0.55, 1)`. The window is `--dock-fade-window: 0.55` on the dock (`shell.css`), and the token the first draft added, `--dock-reveal-window`, is gone.
- The witness reads each fade's length, its largest change within 17.5 ms and the overlap, and the open's first-frame opacity is one reading of four.

**Re-witnessed** (every cell, both engines; the fourier repro, the grouped page and the harness page):

| Chromium | base | cure |
| --- | --- | --- |
| entering face, last 0 to first 1 | 53 to 60 ms; on the fourier repro the Log in seat is at 1 from the first frame | 174 to 185 ms |
| its largest change within 17.5 ms | 0.31 to 0.58 | 0.20 to 0.22 |
| leaving face, last 1 to first 0 | 233 to 242 ms | 74 to 77 ms |
| its largest change within 17.5 ms | 0.14 to 0.46 | 0.25 to 0.27; 0.45 in the two morphs below |
| the two faces at once, min(seal, strongest seat), on the fourier repro and the grouped page | 0.63 to 1 | 0.07 to 0.09 |

On the harness page the witness reads a persistent seat in the seal's place, which stands at 1 on both trees, so its overlap reads 1 and is left out.

| WebKit | base | cure |
| --- | --- | --- |
| entering face, last 0 to first 1 | 55 to 76 ms; on the fourier repro the Log in seat is at 1 from the first frame | 171 to 201 ms |
| its largest change within 17.5 ms | up to 0.51 | 0.18 to 0.35 |
| leaving face, last 1 to first 0 | 236 to 251 ms | 78 to 98 ms |
| its largest change within 17.5 ms | 0.09 to 0.24 | 0.10 to 0.33 |
| the two faces at once, on the fourier repro and the grouped page | 0.57 to 1 | 0 to 0.09 |

WebKit's cure column is its last run, taken under machine load with frames often 20 to 50 ms long. The full rows are in `ROOT.md` (*The witness*).

In Chromium two cure readings break the 0.4 step bound, both in a morph with a long frame at its start: the leaving face on the fourier repro's first hover open after the page loads at 1440, 0.45 in each scheme after a 25 ms second frame. The witness's earlier runs of the patch read up to 0.91 there after 59 to 66 ms frames, and 0.41 to 0.91 on three closes after 24 to 75 ms frames; the change made since (the persistent region's shift, below) does not touch the fades. None breaks it in WebKit. The seal's series on one such open (`tools/fold/seal-series.mjs`) shows the first spring frame at `p = 0.05`, then a 36 ms frame, then `p = 0.32` in the next: keyframes' fixed first step paints 16.7 ms of a spring that is already older, and the frame after the stall catches up. That is B2's frame, and no window can smooth it.

### B2. "No dock work fills those frames" — accepted

**Reason.** Counted again from the record's morph segments, a long frame lands on a morph's second frame in 16 % of Chromium's (1.2 % on its first and third) and on its first frame in 27 % of WebKit's; load does not pick a frame index, so the verdict went past its four traced closes.

**Changed.** Item 1's long frames read "reproduces at the morph's start", and the ROOT's long-frame section is rewritten from a timeline trace of the first frames of 8 opens and 8 closes on the patched tree under a 4x CPU throttle (`tools/root/trace-frames.mjs`, `tools/root/trace-cure-x4.json`), with an unthrottled trace beside it (`trace-cure-x1.json`).

- **Read.** On all 16 morphs the frame interval that holds the arm lasts 24 to 86 ms under the throttle, against 8 to 15 ms for the frames after it. 15 to 55 ms of it is style recalculation of the dock's own subtree in the arming task: two to three full recalcs of 66 to 72 elements on an open, six to seven on a close (whose task also holds the trace's focus and key event), forced by the arm's reads (`measure`, then `anchor` once the morph flag and the scalar are set). A steady morph frame restyles the same 66 elements in 4 to 10 ms, since the scalar is an inherited registered property written on the root each frame. Unthrottled, the arm's interval is 10 to 27 ms, and 56 ms on the first open after a load, against a median of 7.3 ms; the witness's 59 to 66 ms frame is that first open, since every witness cell loads the page fresh. The trace stamps frames when their callbacks run, and a Chromium frame's time is when the frame was begun, so the arm that ends the trace's first interval falls in the second on the spring's clock, which fits the record's frame index.
- **Rooted, and placed.** The frame is the dock's arm, so it is glass's. Its cure is the shape of the arm and of the scalar, which a patch cannot change: it is 11.2.0's hard cell 7 (no frame among a morph's first three longer than twice the median of the rest under the throttle; at most one style recalculation of the dock at the arm). keyframes.js's first-step cure is re-specified, since the step after a long first frame is the visible part: the first painted frame is the spring's start, and the clock runs from there, as wi8's loop does; the first draft's "time from `drive()` to the first frame" would have made that step larger.

### B3. daraksha's 58.95 px plate drift is its own — accepted

**Reason.** daraksha's `src/shell/SiteDock.vue:476-488` (61b36f0) translates the whole fission row, main plate included, by `−0.5 × (seat width × a + gap × g)` on glass's mirrored progress, and the record's edges solve to that row move, 58.95 px, at both widths with no remainder.

**Changed.** The ROOT's daraksha paragraph and sites row now root the drift in daraksha's pair centring; daraksha's note asks it to centre the pair at rest and hold it while the dock moves; 11.2.0's measure gains a hard cell for the fission seat (the main plate holds while the seat leaves). No glass cell changes.

## Major

### M1. A shipped visual spec reads the deleted knob — accepted

**Reason.** `tests-visual/release-11-0-2.spec.ts:1466` on `release/11.1.1` reads `--dock-stagger-window-size` to bound each frame's opacity step, so the patch would have failed it on the spring's early frames.

**Changed.** The spec reads `--dock-fade-window` (fallback 0.55); a face's slope is now exactly the spec's `1 / window`. On the patched tree the spec's fold cells pass: 5 of 5 in headless Chromium; in Playwright's WebKit 4 pass and the fifth is skipped by the spec, which counts layouts over CDP.

### M2. The keyboard route — accepted

**Reason.** A key's focus matches `:focus-visible`, so the patch still counted the ring's room, and a fitting run 4 px over its port still scrolled; the base witness reads the key's reach at 1440 as −4 px in one frame in both engines.

**Changed.**

- `run.css`: a horizontal run flagged `data-run-fits` is no scroll port (`overflow: visible`), wi8's RU-52 on one axis. The vertical run keeps its port: its reserve yields as padding, so a fitting vertical run has nothing to scroll, and a non-scroller with `pan-y` hands a swipe on the column to the page (the reason `run.css` gives for keeping it a port).
- `useDockRun.ts`: `occluded` is false on a run that is no scroll port.
- The witness has a key cell. At 1440 the key's reach and the press move nothing (0 px, 0 frames) in both engines; at 390, where the run does not fit, both glide 14 px, over 14 frames of at most 1 px in Chromium and over 8 to 10 frames of at most 2 to 3 px in WebKit's loaded run. One intermediate Chromium run read the key's glide at 390 dark in 7 frames with an 8 px step; it did not record frame lengths, and the final run, which does, reads 14 frames of at most 1 px, 8 to 9 ms apart. On 11.1.1 WebKit's press at 1440 already moves nothing on base; its key moves the row 4 px in one frame.

### M3. keyframes' tooltip placed against the ROOT's own rule — accepted

**Reason.** All three of the ROOT's reasons fail on reading: the mark is one prop on `DockFace`, reka 2.10.1's tooltip root provides `onClose` (`TooltipRoot.js:111`) and 11.1.1's `TooltipContent` already injects that context, and the cause (`participation.ts` closes on the collapse edge only, and the tooltip passes no close) is not an engine's.

**Changed.**

- `dockContext.ts`: `DockFace` takes `collapsed`, and `useDockFace()` names the face a descendant was authored in. `GlassDock.vue` renders `#collapsed` in `<DockFace collapsed>`.
- `participation.ts`: an overlay closes on the posture edge that hides its trigger: the collapse for the face, the expand for `#collapsed`.
- `TooltipContent.vue` passes `close: () => tooltipRoot.onClose()`, so a face's tooltip also closes on the collapse.
- A unit test (`GlassDock.collapse-closes-overlays.test.ts`, two cases: a popover and a tooltip in `#collapsed`) fails on base and passes on cure.
- A witness page (`tools/root/slim/tip-dock.vue`) puts the collapsed seal in a glass tooltip with no delay, as keyframes does. On base the tooltip stays open after the hover open and travels 112 px with the hidden seal, in both engines; on cure it closes 57 to 61 ms after it opened and does not move.

### M4. Item 5's verdict on fourier — accepted

**Reason.** The record could not draw a native tooltip, which is not the same as reading one, and a native tooltip is placed at the pointer, so "the browser's own tooltip" does not explain a tooltip at the screen's left edge.

**Changed.** Item 5 on fourier is unrooted in the ROOT and the study. The reading owed is the owner's: the browser and its version, the page zoom, and which display. fourier's move to glass's `Tooltip` stays as a recommendation, not a cure.

### M5. Witnessed on v11.1.0 while 11.1.2 builds on 11.1.1 — accepted

**Reason.** 11.1.1 changes `layers.css` (the reduced-motion crossfade on the very panes this patch fades), `DockControl.vue`'s press and `TooltipContent.vue`, which this patch now edits; no cell had run there.

**Changed.** The patch is regenerated against `release/11.1.1` (it applies with phone-scroll's `cure.patch` on top, `patch -p1`), and every witness cell ran on that base, plus a reduced-motion cell: on both trees the open lands its width in one frame and both faces cross over 200 to 205 ms in steps of at most 0.1 per 17.5 ms (Chromium; WebKit 197 to 213 ms, at most 0.09, in the run before the region's shift, which a reduced-motion change never writes); the patch changes nothing under reduced motion.

## Minor

1. **Stale contract text — accepted.** The patch now rewrites the active-pane note (`layers.css`, "ZERO opacity authority") and the "Opacity now has ONE owner" note to the two faces' fade.
2. **"The last steps decrease" — accepted.** The ROOT says the last step is the smallest of the last five, which every cure cell reads (Chromium and WebKit); the steps before it are not monotonic.
3. **A key's reach stopping a glide mid-way — accepted.** A reach to a seat in view no longer stops a running glide that lands with that seat in view; one that would carry it out of view is taken over by this reach. The snap is handed back only where a glide ends, on a snap position. No cell drives a fast traverse; the 390 key and press cells glide and land (above).
4. **Mixed precision — rejected.** At rest `data-run-fits` compares the seats' `offset*` extents with `clientWidth`, which the patch reads as before; mid-morph the rest port is `expandedPx − chrome − runEdge`, all three now read by `getSize`, so the fractions cancel. The witness reads the flag the same on both trees in every press and key cell (true at 1440, false at 390).
5. **The pane as a backdrop root while it fades — accepted, as a cell not run.** While a pane's opacity is below 1 it is the backdrop root for a capsule seat's `backdrop-filter` inside it, so the capsule's frost can land when the fade ends. 11.1.0's leaving pane did the same. Neither headless lane draws it; it is listed under *Not run*, for the GPU lane or Safari.
6. **Sites not listed — accepted.** The ROOT's sites table, the study and the site notes carry atlas (glass 10.1.2) and Home Assistant (glass 11.1.0, a dock that never folds). atlas is named as the witness for 11.2.0's layout-box and edge-seat cells.
7. **The first step's release — accepted.** glass declares keyframes.js `^6.0.0` and its lockfile holds 6.0.0; a keyframes.js release reaches glass's build when glass's lockfile moves, and a site's when the site's lockfile moves, with no glass release needed.
8. **gaggle's reading of its own jump — accepted.** The 390 press and key cells glide with the patch (8 to 14 frames), which a native one-frame focus scroll could not produce: the jump was the glide's own writes snapping in a `mandatory` port. The ROOT says so.
9. **A claim about wi8 with no reading — accepted.** The clause is dropped; hard cell 4 carries the WebKit residue.

## Found in the fold

**The pinned pad stepped a persistent seat into a close's first frame.** Item 2's cure gives each posture its own pad from a morph's first frame. A close from rest starts unscaled, where the morph's origins cannot move anything, so a persistent region painted the collapsed posture's layout in that frame: 4 px in one frame on the harness page (Chromium, `tools/fold/pers-series.mjs`, `pers-series-chromium.txt`), where base slid it and then stepped 0.97 px at the settle. The witness's travel reading started at that first frame and hid it.

- **Changed.** `anchor` writes the region's difference from the box it painted as `--dock-region-shift` when the morph starts unscaled, and `shape.css` translates the region by that times `1 − --dock-morph-t` (`index.css` registers it). An open starts scaled, where the origin already holds the painted box, and writes none.
- **Re-witnessed.** The persistent seat's step into the first frame of an open and a close is 0 px and it lands 0.09 to 0.13 px from its rest (Chromium, `pers-series-chromium-shift.txt` and the witness's new persistent-seat rows); the vertical dock's persistent seat slides its 4 px in steps of at most 0.7 px. In WebKit the step into the first frame is 0 px too and the seat lands 0.19 to 0.21 px from its rest (`pers-series-webkit.txt`). The fold spec passes again: 5 of 5 in Chromium, 4 in WebKit with the CDP cell skipped. `dockMorphMeasure.test.ts` (28), `GlassDock.motion-parity.test.ts` (5), `g-dock-lattice.test.ts` (33 and 1 expected fail) and `GlassDock.collapse-closes-overlays.test.ts` (8) pass, `vue-tsc` is clean, and the patch dry-runs clean on `release/11.1.1` and on the base tree.
