# Slider — the prototype

Seat: PROTOTYPE (claude-opus-5-5), 2026-11-12. It builds W-B.18 as written and reads its gates.

- **Where it lives.** Scratch worktree `.claude/worktrees/bl/slider/proto`, branch `bl/slider/proto`, three commits on master `fa18ece53`:
  - `87b3d259c`: the 11.1.1 geometry cure, styles only.
  - `fcea8de25`: 11.2.0 (the transform mechanism, step travel, the keyboard-focus mark, the spectrum ring, `expand`).
  - `576c9b99a`: three cures the first measurement found.
- **The diff.** `prototype/prototype.patch` (`git format-patch`, all three). It touches 5 files, +733 / −232: `Slider.vue`, `styles.css`, `types.ts`, the comment in `tokens/sizing.css`, and a new `tests/components/ui/slider/expand.test.ts`.
- **The harness.** `prototype/harness/`:
  - The page (`App.vue`) serves either master's `src` or the worktree's (`SRC=master|proto`).
  - The probe (`probe.mjs`) serves both itself, one browser per run, a new context per cell, everything closed in `finally`.
  - Readers: `summarize.py`, `tween_check.py`. Strips: `compose.py`.
- **The runs.** Raw JSON and every frame are in `prototype/runs/{chromium,chromium-2,chromium-3,webkit,e2e}/`.
  - `chromium` is the first Chromium run.
  - `chromium-2` and `chromium-3` re-read after the cures.
  - `webkit` is one full run after the cures.
- **Engines and cells.** Headless Chromium 149 and Playwright WebKit (the WebKit run under `--exclusive webkit`). Cells at 1440 fine (dpr 2) and 390 coarse (dpr 3, touch, mobile), light and dark.
- **Teardown.** Nothing is left listening on 5381–5384, and the worktree is clean.

Every number below is measured unless it says *derived*.

## What was built

- **11.1.1** (`styles.css` only).
  - One height: the scrubber's thumb is `--slider-track-height` on both axes, and the lane cut follows it.
  - One radius: `--slider-radius` is H/2, read by the track, the fill and the thumb. The loupe's two radii are also derived from H.
  - The press deform, the smear, the release overshoot and their reduced-motion arms are deleted.
  - Paint:
    - The track's ground is `currentColor` at 16 %, with no inset line.
    - The fill has no rim and is the ink at full strength.
    - The dark fill default is `currentColor`.
    - `--slider-thumb-bg` defaults to `--card` in light and `--foreground` in dark.
  - Hover, hold and keyboard focus deepen the track's ink from 16 % to 24 %. The fill is already at full strength, so the tween that "exists and stays" now lives on the track.
- **11.2.0.**
  - The root carries `--slider-p`, `--slider-p0` and `--slider-pa` (the thumb being changed; the readout and the shell's origin follow it). Each thumb carries its own `--slider-p`.
  - The root is an `inline-size` container (`size` when vertical).
  - The thumb is held at the start with `!important`, reka's centring transform is set to `none` through `--reka-slider-thumb-transform`, and the thumb rides `translate`. The fill and the lane ride `translate`. reka's `SliderRange` is now a plain span.
  - Step travel: keys and track presses mark `data-travel` on the root, and the travel rides `--spring-press`. The first pointer move of a drag clears the mark.
  - The keyboard-focus mark is `data-focus-key`. It replaces `:has(:focus-visible)` as the ring's predicate.
  - The spectrum handle is a ring of diameter H.
  - `expand` turns on:
    - the shell (always in the tree);
    - the grown thumb;
    - the top-layer readout (`popover="manual"`, CSS-anchored, shown only when there is a `valueText`);
    - the z-index raise, which waits out the shrink;
    - the hover dwell (fine pointers only);
    - the reduced-motion and forced-colours arms.
  - With `expand` on, the veil, the loupe, the carriers and the liquid-fill class are not mounted.

The three cures the first read forced (commit `576c9b99a`):

1. **The spectrum ring was a 2px `border`.** reka maps the pointer by the thumb's `clientWidth`, which the border shrank by 4px, so a press on the ring's centre moved the value down one step at every value of 50 or more. It is now an inset `outline`, and no press moves the value in any cell (24 nudged cells before, 0 after).
2. **The forced-colours block came before the expand rules,** so source order beat it: the shell stayed `--card` and the fill was not `Highlight`. It now comes last.
3. **A press inside the hover dwell kept the dwell's delay.** A running transition keeps its delay when its target does not change, so the shell started 100 ms after the readout. On a press or a keyboard focus the component now moves any transition still inside its delay to the end of the delay (`skipDwell`, 8 lines, using `getAnimations()`). After: Chromium 106 / 114 ms, WebKit 115 / 135 ms (shell / readout start after the press).

## The gates

RED is master in the same harness and the same cells. Where a gate's bite was not run, it says so.

### 11.1.1

The patch gates were read on the 11.2.0 build. The 11.1.1 commit alone (`87b3d259c`, the layout mechanism with the H-sized lane cut) **was not measured**. Its arithmetic is the same (*derived*), but no run served it.

**G-CONCENTRIC: GREEN in both engines.** Cells:

- sm, md and lg, horizontal and vertical;
- md inverted, md RTL and md vertical inverted;
- the three spectrum sizes;
- values 0, 1, 5, 25, 50, 95, 99 and 100;
- states: rest, hover, keyboard focus and held, each with `expand` off and on;
- 20 frames inside a pointer drag at 50.

Per engine that is 1,656 measured rows at 1440 fine (1,144 in the main grid, 96 more on the spectrum, 416 on the vertical re-read), plus 128 at 390 coarse. In Chromium the 32 vertical coarse rows were read with the old reader and are set aside. The worst offset in any cell, on either axis, in either engine:

| | thumb − fill's end cap | thumb − track cap at 0 / 100 | thumb − `H/2 + p·(W − H)` |
|---|---|---|---|
| prototype, Chromium | 0.00 | 0.00 | 0.00 |
| prototype, WebKit | 0.00 | 0.00 | 0.00 |
| master, Chromium (RED) | 2.00 at rest, 5.24 held | 2.00 | 2.00 |
| master, WebKit (RED) | 5.24 held | 2.00 | 2.00 |

The full per-cell table prints with `python3 harness/summarize.py runs` (and for `chromium-2`'s spectrum and vertical re-reads, the `spec` and `vconc` keys).

One reading error of mine, fixed before WebKit ran: the first Chromium pass read the vertical fill's end at the bottom, which gave 164–180 px. The vertical cells were re-read in `chromium-2` and read 0.00. Bite (restoring `min(thumb, track)`): not run.

**G-HEIGHT: GREEN in both engines.**

- In every cell the fill's cross size, the thumb's diameter and the track's cross size are equal within 0.00 px, held included. With `expand` the held thumb is scaled by design, so its layout diameter is the one compared.
- Each computed radius is half its size.
- Master is RED: 4 px (an 8 px thumb in 12), the held fill at 0.94, and radius differences up to 12 px.
- `git grep -n "radius-pill" -- src/components/slider` prints nothing (master: 3 lines). The only `--slider-thumb-size` read left is the spectrum's track height.
- Bite: not run.

**G-READ: GREEN, with one note.** Column scan of the daraksha repro (sm, 155 px, on a dock plate):

| | fill band | track band | track ≠ plate (lum) | fill colour = root `color` | thumb lighter than track (lum) |
|---|---|---|---|---|---|
| proto dark, both engines | 12 | 12 | 45 vs 10 | yes | 230 vs 45 |
| proto light, both engines | 12 | 12 | 188–189 vs 219–220 | yes | 246 vs 188–189 |
| master dark (RED) | 12 | 12 | 19 vs 10 | no (alpha 0.19) | 44 vs 19 |
| master light | 11 (Chromium) / 12 (WebKit) | 12 | 231–232 vs 219–220 | no (warm capsule) | |

- The note: on master in dark my scan reads 12 against 12, not the 12.4 against 11.2 the measure took from the owner's PNG. The scan's threshold counts the rim's lit edge as band. So the gate's RED reading is the measure's, not mine.
- In dark the thumb is the fill's own colour (`--foreground` on `currentColor`). Only its shadow separates them, and at rest the thumb all but disappears into the fill. Look at `webkit-dark-rest-sm-md-lg-spectrum.png`. R-7 chose this. The strip is the owner's to judge.
- The light fill is `currentColor` in the prototype (OQ-1's default), so the light row is the capture the owner was to see.
- Bite: not run.

### 11.2.0

**G-CONCENTRIC again: GREEN in both engines.** The transform mechanism, the spectrum sizes, and `expand` at rest and fully grown are all in the table above.

- Grown, the shell's cap centres are within 0.00 px of the track's in every grown cell.
- The grown thumb is within 0.00 px of the track's caps at 0 and 100.
- **At rest the gate's wording cannot hold, by the design itself.** R-11 makes the rest shell a capsule scaled by H/(H + 2g) about the thumb's centre, so its caps sit up to 173 px from the track's. What does hold at rest: the shell lies inside the track in every cell, and its painted thickness is exactly H (12 / 20 / 28, and 24 / 36 on the spectrum).

**G-TWEEN: GREEN in Chromium. In WebKit monotone, with fewer frames.** Per-frame samples of computed `scale` and `opacity` (`runs/*/tween.json`, read by `tween_check.py`):

| way | Chromium frames, largest step | WebKit frames, largest step | first = rest, last = end, monotone |
|---|---|---|---|
| press in | 24, 9 % | 10, 21 % | yes / yes |
| release out | 15, 16 % | 6, 29 % | yes / yes |
| Tab in | 24, 9 % | 10, 21 % | yes / yes |
| Shift+Tab out | 15, 14 % | 6, 28 % | yes / yes |
| hover in (after the dwell) | 25, 9 % | 11, 21 % | yes / yes |
| leave out | 15, 16 % | 6, 29 % | yes / yes |

- The readout grows only on press and keyboard, never on hover.
- A release 70 ms into a grow turns back from where it was (shell 0.823, readout 0.792) with no jump.
- Step travel (PageUp) runs 120 → 150 px on `translate` over about 100 ms in both engines. A track press runs 120 → 279 px over 116 ms.
- RED: master's loupe paints its first frame at `1 / 1` in both engines.
- Headless WebKit draws about 50 frames a second here against Chromium's 120. That is why its steps are larger; the curve is the same. I did not derive a per-curve step bound, so "no step exceeds what the curve allows" is unmeasured beyond these numbers.
- Bite (shell under `v-if`): not run.

**G-COST: RED with `valueText`. GREEN without it.** The columns are the four windows a gate run reads:

| | grow | 60-frame drag | shrink | 60 frames driven from outside |
|---|---|---|---|---|
| `expand`, no `valueText` | 0 Layout | 0 | 0 | 0 |
| `expand` + `valueText` | **54** | **78** | **51** | 0 |
| `expand` off | 2 | 39 | 0 | 0 |
| master (RED) | 2 | 39 | 0 | **60** |

- Chromium trace, `Layout` events per window.
- **The playing scrubber's layout per frame is gone** with `expand` off and on (O-236): 60 → 0.
- **The readout costs a layout on every animation frame.** One override at a time (`costx`):
  - drop the anchor (`position-anchor: none`): the hold falls from 54 layouts to 1 and the drag from 38 to 19;
  - replace the container units with a fixed length: changes nothing;
  - remove the readout's transition: the hold falls to 4.
  - So CSS anchor positioning re-lays out the anchored popover while things inside the anchor animate. The remaining 19 in the drag are the readout's text changing.
  - The design said the readout moves by `--slider-pa` with no layout. In Chromium it does not.
- The 39 with `expand` off is the loupe and the veil that 12.0.0 removes.
- `document.getAnimations()` in both engines shows `scale` and `opacity`, and also `z-index` (the raise that waits out the shrink) and `background-color` (the track's ink deepening). So the gate's "only scale, translate and opacity" fails on those two. Neither reaches layout.
- WebKit has no trace here, so its column is the animation list only.
- Bite (removing the `!important` hold): not run.

**G-NODES: GREEN.** Counts from vitest (`expand.test.ts`) and from one browser cell, both engines:

| | at rest | held |
|---|---|---|
| `expand` off | 5 | 12 |
| `expand` on | 6 | 6 |
| `expand` + `valueText` | 7 | 7 |

- Held with `expand` off: 7 under the root and 5 teleported.
- Nothing is appended to `<body>` with `expand` on.
- With `expand` on, a box shadow is computed on the thumb and the shell only, and `backdrop-filter` is `none` on every node.
- With `expand` off the fill keeps the liquid-fill blur, as master does.
- The readout's `aria-hidden` and `popover="manual"` are asserted. The thumb's `aria-valuetext` carries the same string.
- Bite: not run.

**G-FORM: GREEN.**

- vitest: a named Slider in a form submits its value after a key press, with `expand` off and on, and the hidden input is present.
- Browser, both engines: the form value is 60 after a 10-step drag and 61 after ArrowRight, the same as master.

**G-BOX: GREEN in both engines.** At 1440 fine and 390 coarse, with `expand` off and on, at rest and grown, the root and track boxes equal master's within 0.1 px in all three hosts (a block, a flex-row item, and a dock plate). The neighbours' boxes did not change across the 10 frames of a grow. The size container changed no box (OQ-6 closes on this reading).

**G-LIFT: GREEN in both engines (OQ-3 closes on this reading).**

- Inside a `contain: paint` plate the readout paints whole: 3,382 matching pixels against its unclipped twin's 3,382 (WebKit 3,380 / 3,380).
- Its centre is 0.00 px off the thumb's in Chromium and 0.02 in WebKit, at all 8 values sampled through a drag.
- It stays attached through a page scroll during the hold.
- The thumb still holds the pointer capture after it shows, and the drag carries on (50 → 82).
- It closes after release.
- One reading quirk in WebKit: `gotpointercapture` had not fired when the first check ran, so that check reads false and the later one reads true.
- Crops: `chromium-lift-readout-in-plate.png`, `webkit-lift-readout-in-plate.png`.

**G-TOUCH: two readings fail in Chromium, and in WebKit only the release and the mouse press were read.** At 390 coarse:

- **Chromium (CDP touch):**
  - The press grows with no dwell (`hover: none` matches).
  - One second after release the shell is at rest and the readout is closed.
  - **The finger-to-thumb offset through a 12-move drag is within ±1.52 px, not 1 px.** It alternates in sign. 1.52 is half of one step at this width (308 px of travel over 100 steps is 3.08 px a step), so it reads as the value's step snapping rather than a lost grab. The gate's 1 px bound does not allow for a step of 3 px.
- **WebKit:**
  - Playwright has no touch press-and-drag for WebKit, so the press and the drag are **unmeasured**.
  - A tap leaves the shell at rest after one second, with no focus mark.
- **Mouse press, fine pointer, both engines:** no keyboard ring and no focus mark in any frame, with `expand` off or on. Master paints the ring.

**G-STILL: forced colours GREEN (Chromium). Reduced motion RED, in both engines, from outside the Slider.**

- Reduced motion:
  - No `scale` and no `translate` animates: the shell and the readout sit at scale 1 and the thumb at 1.
  - But **opacity does not fade: it cuts** from 0 to 1 between two frames, in and out.
  - The library's own carve does it: `utilities/a11y-overrides.css:46-53` sets `transition-duration: 0s !important` on every element. That contradicts motion-canon P6 ("keeps the opacity/color fade") and the owner's "a fade, never a cut".
  - The cure belongs in that file, not in the Slider. I did not touch it.
- Forced colours, read after the source-order cure:
  - the shell, the thumb and the readout compute a 1 px `CanvasText` border, and the shell's ground is `Canvas`;
  - the fill computes `Highlight`;
  - the focused root shows a 2px solid `CanvasText` outline.
- Two readings came from the first run, because the re-run's Tab landed on the harness's new button: the outline, and the readout being open.

**The existing specs:**

- **Unit (vitest, happy-dom): 25 of 25 pass unchanged.**
  - The files: `slider.contract`, `Slider.marks`, `attrs-pointerdown-channel`, `dock-hold-contract` and `slider-cursor-affordance`.
  - With the new `expand.test.ts`, 30 of 30.
  - `vue-tsc --noEmit` is clean.
- **`slider.size-tokens.test.ts` (vitest in Chromium): 2 of 3 fail.** Both pin rules the wave deletes:
  - `min(thumb, track)`: the thin spectrum now reads track 24 and handle 24, where the test expects 18 and 9;
  - the spectrum lozenge: a 12 px bar, now a 24 px ring.
- **E2E, chromium-headless-new, `--workers=1`: 1 of 8 pass.**
  - 5 fail on master too, identically:
    - a11y-slider/aurora: 56 of 79 thumbs nameless on both;
    - the 4 dock-with-slider cells: the `dock-slider-hold-root` selector is not on the route on both.
  - These are route drift, not the Slider (`runs/e2e/e2e-master.log`).
  - The 2 spectrum-fallback cells fail on the deleted lozenge: they require `corner-shape: superellipse(2)` and a radius of at least 0.55 of the handle's width. The ring is a circle at 0.5.

## The owner's frame, before and after

![owner frame on top; master and prototype below; prototype expanded and held](prototype/webkit-owner-frame-before-after.png)

- **Top:** his PNG.
- **Middle:** master (left) and the prototype (right). The repro is daraksha's transport at 390 coarse, dark, v = 25, in WebKit.
- **Bottom:** the prototype with `expand`, held, with the readout above it.
- Measured on the repro:
  - master: the thumb is 2 px off the fill's cap, an 8 px disc in a 12 px band;
  - the prototype: 0.00 px, a 12 px disc in a 12 px band;
  - held: the thumb grows to 20 px in a 28 px shell.
- Chromium's copy: `prototype/chromium-owner-frame-before-after.png`.

## Strips

- **Grow and shrink**, md, light and dark: `prototype/{chromium,webkit}-{light,dark}-md-grow-shrink.png`.
  - Top row: rest, four frames of the grow, held. Bottom row: held, four frames of the shrink, rest.
  - Each strip has a `.txt` beside it with each frame's computed scale and opacity.
  - Chromium was filmed with its animation clock at 0.25×. WebKit is real time, so its grow is mostly done by its third frame.
- **Rest at 0, 5, 50 and 100**, sm, md, lg and the spectrum ring: `prototype/{chromium,webkit}-{light,dark}-rest-sm-md-lg-spectrum.png`.
- **Vertical, held:** `prototype/{chromium,webkit}-md-vertical-held-light-dark.png`.

## What the measure turns up for the design seat

1. **The readout's anchor costs a layout every frame in Chromium** (G-COST). If the design keeps the readout in the top layer, it needs a placement that is not `anchor()`. The rejected alternative, one rectangle read at the press, would close the cost; it would then need the scroll re-read G-LIFT asks for.
2. **The reduced-motion carve cuts every fade, library-wide** (G-STILL). This is a library row for `a11y-overrides.css`, not a Slider one.
3. **A dark thumb of `--foreground` on a `currentColor` fill reads as no thumb at rest.** It is what R-7 asked for. The owner's "taking up the full height" is met; whether the knob should still be seen is his to say from the dark strip.
4. **The thumb keeps `glass-specular-track`.** Held and grown, it paints a bright centre spot (visible in the lift and vertical crops). `restraint.md` rules out specular on controls. It is master's class, untouched here, and not in the wave's deletion list.
5. **G-TOUCH's 1 px bound is smaller than one step** at `step: 1` on a 320 px track. Either the bound is per step, or the gate drags a continuous slider.
6. **G-COST's property list** has to admit the raise (`z-index`) and the ink tween (`background-color`), or the design moves them.
7. **G-CONCENTRIC "at rest" for the shell** has to read "inside the track and H thick", not "caps on the track's caps".
8. **R-9 as written leaves reka's `translateX(-50%)` on the thumb.** Under the grow's `scale` that centring is scaled too and the thumb leaves its centre. The prototype sets `--reka-slider-thumb-transform: none` on the thumb, which is a variable rather than an override of reka's inline style.
9. **The readout's exit runs on the 0.2 s entry clock while the pointer still hovers** (the hover state sets that clock); away from hover it runs on the 0.12 s exit clock. This is a small inconsistency between the release and leave rows.

## Not done

- No run served the 11.1.1 commit alone.
- No bite was run for any gate.
- WebKit touch press and drag: no injection path exists in Playwright.
- No forced-colours reading in WebKit (its emulation leaves colours unforced, as the wave says).
- No real Safari (OQ-7).
- OQ-4: how a 155 px scrubber feels at 1:1 is a hand's reading, which a headless run cannot take.
- OQ-5: the 16 % track and the 0.5rem outset are untuned. The strips are the material for the owner's read.
- The light theme's warm fill was replaced in the prototype, not shipped behind the owner's read. The light strips are that capture.
