# The dock family: frame record

The recorder for the family "dock". Every motion below was driven on the real control and sampled on every rendered frame (about 8.3 ms apart in headless Chromium with GPU compositing), on the published **v11.0.1** (`e42bc2705`) and on the **11.0.2 tip** (`648d70e59`). Frame numbers are row indices in the rows file named beside each fault. "f25" means row 25.

- Rows: `rows/v11.0.1/`, `rows/tip/` (`<scenario>.<tree>.<engine>.<cell>.rows.json`, with the analyser's `.faults.txt` and `.faults.json` beside each). Traced runs (layout per frame) are in `rows/v11.0.1/trace/`.
- Strips: `strips/v11.0.1/`, `strips/tip/`. A strip shows about every other rendered frame (the screencast runs near 60 Hz); the rows are the frame record.
- Scenarios: `scenarios/*.json`, written by `tools/gen-scenarios.mjs`.
- Tools: `tools/read-dock.mjs` reads what paints (the plate's painted box and corner, content against the plate, the first and last six frames of each motion); `tools/compare.mjs` puts both trees side by side (`logs/compare.txt`).

## How it was read

**Pages.** The harness page `?c=dock` holds the pill, rounded, vertical and transport docks and the persistent toggle. It has no layer group, crossfade, background toggle, wide control, menu or long run, and the harness note that the demo's own routes still serve is wrong: in both built trees `assets/main.demo-*.js` is 71 bytes (`new URLSearchParams(window.location.search);`), so `/dock/overview` and every other demo route mounts nothing. The demo entry was tree-shaken out by the wrapper in `harness/build-tree.sh`. I wrote a second hand page, `mount/dock-full.vue` (`?c=dock-full`), and built it into `<tree>/dist-demo-dock` with `tools/build-dock.sh`, so the shared `dist-demo` the other recorders serve was not touched. Its cells:

| test id | what it is |
|---|---|
| `df-layers` | collapsible, `DockLayerGroup` with its switcher (`motion="full"`), `#collapsed` |
| `df-drill` | always open, `DockLayerGroup` without switcher, drill-in buttons and Back |
| `df-xf` | always open, `DockCrossfade` driven from outside, faces of 2, 4, 1 and 3 rows |
| `df-bg` | collapsible (`collapse="open"`), `DockBackgroundToggle` first, `#collapsed` mirrors it |
| `df-slider` | collapsible, two `Slider`s in the run (a 501 px expanded dock) |
| `df-menu` | collapsible, a Select `DockTrigger` and a Dropdown `DockTrigger` |
| `df-run` | always open, 12 seats in a 300 px host, `aria-current` moves on click |

**Servers.** One at a time, on ports of my own (5461 for v11.0.1, 5462 for the tip) so as not to collide with the other recorders on 5391 and 5392. Both are stopped.

**Cells.** 1440 fine light for everything; 390 coarse (real touch) for the tap-and-outside folds, the press and the switcher drag; 1440 dark where colour animates (the fold, the seat hover, the background toggle); reduced motion once for each part (the fold in all three shapes, the crossfade, the drill-in, the switch, the run's mark, the slider dock).

**What "past the plate" means here.** While the morph runs the root clips its morph axis (`styles/shell.css:318-323`, `overflow-x: clip` under `[data-morphing]`), so a seat that lies beyond the plate's moving edge mid-morph is cut there, not painted on the page. `read-dock.mjs` reports the raw overhang; every overhang named as a fault below was checked against its strip. At rest nothing clips, which is where the overhangs that are faults happen.

**WebKit.** The four faults ranked first were confirmed in Playwright WebKit on the tip (see the end).

## The animations, per component

Clock and easing are as computed (`document.getAnimations()` and the rows). The dock morph is not a CSS animation: `useDockSpring` runs keyframes.js `SpringProgress` on `springPreset("dock")` and writes `--dock-morph-t` on the root each frame (`composables/useDockMorph.ts:79-104`); everything that morphs reads that one scalar.

### GlassDock (the shell)

| animation | trigger | what moves | clock and easing (computed) | in | out |
|---|---|---|---|---|---|
| expand | hover (after the 60 ms intent), focus in, tap on the summary | root `scale` on the morph axis over a reserved box (`styles/shape.css:105`), regions counter-scaled (`:135`), pill corner counter-scaled (`run.css:786`), summary fades `1 - t`, run seats fade and grow 0.82 to 1 on a staggered window of 0.55 (`layers.css:269-295`) | JS spring, dock preset; plate within 2 % of rest about 250 ms after its first frame; `[data-morphing]` held 540 to 610 ms (the spring's sub-pixel tail) | 250 ms to rest, 610 ms window | |
| fold | 3600 ms after the pointer leaves (`DOCK_COLLAPSE_DELAY_MS`), 3600 ms after focus leaves, press outside (at once), Escape from inside the run (at once) | the same, reversed; the leaving run fades on `1 - --dock-morph-t` (`layers.css:184-186`) | the same spring | | 250 ms to rest, 540 ms window |
| shadow at arm | the posture class flips | `box-shadow` from the expanded pair (inset rim plus 20 px, 0.14) to the collapsed 12 px, 0.12 | none: a discrete swap (`morph.css:161-167`) | 1 frame | 1 frame |
| leaving run hides | settle | `visibility` | `visibility 0s linear 300ms` (`layers.css:148`) | | hidden 300 ms after settle, at opacity 0 |
| reversal | the opposite trigger mid-morph | the spring re-bases from `1 - t` with the velocity negated (`useDockMorph.ts:90-101`) | | | |
| reduced motion | any posture change | everything | the spring seats at once (`useDockSpring.ts:103`) | 1 frame | 1 frame |

### The run (`.dock-layer--full`)

| animation | trigger | what moves | clock and easing | in | out |
|---|---|---|---|---|---|
| the open seat (the run's mark) | `aria-current` moves | the open seat grows to 136 px, the one it left shrinks to 40 px | `transition: inline-size var(--spring-dock-duration) var(--spring-dock)` (`run.css:526-535`), 210 ms on the dock `linear()` curve; measured 225 ms | 225 ms | 225 ms |
| glide to a seat past the fold | a seat outside the port is selected or reached | `scrollLeft`, by `useDockSpring` (`useDockRun.ts:143-170`), with `scroll-snap: mandatory` on the port | JS spring | see faults | |
| wheel | wheel | native scroll, then the mandatory snap | the engine's | | |
| touch drag | touch | native scroll | the engine's | not reached (below) | |
| edge caps | scroll position | the plate's end corners by `animation-timeline: --dock-run` (`run.css:754-828`) | scroll-driven | | |

### DockControl (a seat)

| animation | trigger | what moves | clock and easing | in | out |
|---|---|---|---|---|---|
| hover fill | pointer over | `background-color`, `color` | declared 200 ms `cubic-bezier(0.4, 0, 0.2, 1)` (`controls/icon-button.css:67-81`); runs only on seats that are not direct children of a run | 200 ms (summary, persistent) or one frame (run seats) | the same |
| hover gleam | pointer over | `::before` opacity, `--specular-x` | 300 ms and 200 ms, `cubic-bezier(0.4, 0, 0.2, 1)` | 300 ms | 300 ms |
| press squish | pointer down | `scale` (0.989 by 0.932 at hold) | `--dock-press-spring`, 120 ms press `linear()`; measured about 150 ms in, 125 ms out | 150 ms | 125 ms |
| press darken | pointer down | `background-color` 0.14 to 0.20 alpha | declared in the same list as the hover fill | one frame (run seats) | one frame |
| active paint | `active` / `aria-pressed` | background, `backdrop-filter` (`.glass-capsule`) | the filter has no transition | one frame | one frame |

### DockLayerGroup (switcher and faces)

| animation | trigger | what moves | clock and easing | in | out |
|---|---|---|---|---|---|
| indicator travel | the active face changes | `translate`, `height` | `--spring-dock-duration` `--spring-dock` (`layer-group.css:356-360`); measured 280 ms | 280 ms | 280 ms |
| indicator drag | pointer drag on the switcher (`motion="full"`) | the indicator follows the pointer; fling to nearest on release | `useDragMorph` | | |
| face crossfade | the active face changes | the two faces' opacity | JS spring through `DockCrossfade` (`DockCrossfade.vue:164-235`), 250 ms | 250 ms | 250 ms |
| tab ink | the active face changes | tab `color`, `background` | `--dock-motion-fast` (`layer-group.css:259`) | | |

### DockCrossfade (controlled)

| animation | trigger | what moves | clock and easing | in | out |
|---|---|---|---|---|---|
| face swap | `active` changes | opacity of the entering and leaving faces | JS spring, 250 ms | 250 ms | 250 ms |
| reserve | a taller face registers | `min-block-size` (a running maximum, `DockCrossfade.vue:89-105`) | none | one frame | never shrinks |
| reduced motion | | | `settle()` at once (`:218-221`) | one frame | one frame |

### DockBackgroundToggle, DockTrigger, overlays

| animation | trigger | what moves | clock and easing | in | out |
|---|---|---|---|---|---|
| Play and Pause glyph | click | the glyph | `v-if` / `v-else` (`DockBackgroundToggle.vue:72-73`) | one frame | one frame |
| dropdown menu from a seat | click | menu opacity 0 to 1 and scale 0.907 to 1 | measured 225 ms, decelerating | 225 ms | 115 ms (by outside press), 110 ms (by Escape) |
| select listbox | click | opacity, height 129 to 142 | measured 210 ms | 210 ms | 75 ms |
| select value | pick | the trigger's label and width | none | one frame | |
| chevron rotate | trigger open | `rotate var(--dock-press-spring)` (`controls/triggers.css:152`) | | not reached: my trigger's chevron is slotted content, not the trigger's own | |

### Not reached

- **The run dragged by touch.** CDP touch events on the run produce no scroll in headless Chromium (two runs, `run-drag.*.390-coarse-light`, `firstChange: null`). Synthetic touch does not start a compositor scroll gesture; this needs `Input.synthesizeScrollGesture` or a real device.
- **A mouse drag on the run.** The run has no pointer drag-to-scroll (no handler in `useDockRun.ts`); not a motion.
- **The DockTrigger chevron** (above), **the CTA seat reveal** (`cta-seat.css`), **the search dock morph** (`useDockSearch`) and **the grasp carriers** on a held slider (the Slider recorder reads the grasp; I did not hold a slider in the dock).
- **The pull-to-switch fling to a new face.** In the drag I recorded the release fell back to the face it started on (below), so a fling that lands a new face was not seen.

## Faults

Each block: component, motion, kind, frames and values, strip, cause, smallest cure. "Both trees" means the tip reads the same within a pixel.

### F1. The run's glide to a seat past the fold jumps and turns back (JITTER, REVERSAL, jump)

- **Where:** the run (`df-run`), clicking Music (the fourth seat, half past the fold) and then Home.
- **Frames** (`run-mark.v11.0.1.chromium.1440-fine-light.rows.json`, seat#0 x): f86 12.0, f87 −12.0 (−24 in one frame), f91 −12.0, **f92 −134.0 (−122)**, f93 −127.0, f94 −122.0, f95 −114.0 (back +20 over three frames), **f96 −156.0 (−42)**, f97 to f104 −150 to −122 (back +34), **f105 −252.0 (−130)**, then still. Back to Home: f166 −252, **f167 −118 (+134)**, f168 to f170 −122 to −136 (against), **f171 −95 (+41)**, f172 −102 (against), **f173 −60 (+42)**, f174 to f176 −66 to −76 (against), **f177 +12 (+88)**.
- **Seen:** the row lurches four times, slides backwards between the lurches, and the hover fill lands on whatever seat passes under the still pointer (Maps, f95 to f101). Strip: `strips/v11.0.1/run-mark.v11.0.1.chromium.1440-fine-light.seg2.start.png`, `seg3.start.png`.
- **Cause:** three clocks on one axis. The open seat's `inline-size` transition (`run.css:526-535`) changes the run's scroll width every frame; the glide (`useDockRun.ts:143-170`) aims at a target read before the widths move; the port's mandatory snap re-snaps each time the content under it shifts. The backward slides are the widths (seats left of the port shrink, so the content slides right); the lurches are snaps.
- **Both trees.** Also under reduced motion the run jumps 96, 216 and 312 px in single frames (that is a cut, F11).
- **Cure:** glide once to the seat's final offset (the offset after the exchange, computed from the two rest widths), and hold the snap off (`scroll-snap-type: none` on the port) for the length of the glide, as the wheel path already relies on the native snap only when no glide runs.

### F2. Seats in the run have no hover or press tween (FIRST-FRAME JUMP, lands whole; CUT)

- **Where:** every DockControl that is a direct child of a run: the transport dock, the background dock, every collapsible dock's expanded seats.
- **Frames** (`seat-hover.v11.0.1.chromium.1440-fine-light`): Previous f20 `background-color` alpha 0 to 0.14 and `color` alpha 0.8 to 1 in one frame; across to Play f266, Previous's fill 0.14 to 0 and Play's 0 to 0.14 in the same frame; out f514 Play 0.14 to 0 in one frame. Dark, the same at f19, f266, f515. Press (`seat-press...1440-fine-light`): f8 background 0.14 to 0.20 in one frame, f40 back in one frame. The background toggle's fill leaves in one frame at f300 (`bg-toggle...1440-fine-light`). The only transitions the page reports at those frames are the gleam's `::before` opacity and `--specular-x`.
- **Strip:** `strips/v11.0.1/seat-hover.v11.0.1.chromium.1440-fine-light.seg1.start.png`, `seg2.start.png`; `seat-press.v11.0.1.chromium.1440-fine-light.seg1.start.png`.
- **Cause:** `run.css:526` and `run.css:535` set `transition: inline-size ...` on every child of the run (`> [aria-current]` and `> :not([aria-current])`), which replaces the seat's own list in `controls/icon-button.css:67-81` (background-color, color, scale, opacity, box-shadow). This is O-300 measured. The squish still tweens because its `scale` is driven by `--dock-press-spring` through another path; the colours do not. A seat outside the run (the summary, the persistent Home) keeps its 200 ms fill (`h-pill-hover`, f17).
- **Both trees.**
- **Cure:** state the run's leg as an addition, not a replacement: put `inline-size` into the seat's own list (`controls/icon-button.css:67`) and have `run.css` set only the property values, or declare `transition-property` there as the seat's list plus `inline-size`.

### F3. A layer group's dock changes height in one frame at expand and at fold (FIRST-FRAME JUMP, LAST-FRAME SNAP, lands whole)

- **Where:** a collapsible GlassDock holding a DockLayerGroup with its switcher (`df-layers`), whose expanded box is taller (108 px) than the collapsed pill (56 px).
- **Frames:** expand (`layers-hover-inout.tip.chromium.1440-fine-light`) f17 plate 56 by 56, **f25 66.1 by 108** (height +52 in the first morph frame), corner 28 to 54 in the same frame. Fold while switching (`layers-fold-mid-switch.tip.chromium.1440-fine-light`) f16 plate 271.2 by 108, **f17 260.3 by 56** (height −52 in the first frame), the indicator y 37.2 to 13.2 (−24), the summary glyph at opacity 1 over the switcher, the next row of the page moving up with it.
- **Strip:** `strips/tip/layers-fold-mid-switch.tip.chromium.1440-fine-light.seg1.start.png` (f16 to f18), `strips/tip/layers-hover-inout.tip.chromium.1440-fine-light.seg1.start.png`.
- **Cause:** the morph reserves and scales only its own axis (`styles/shape.css:104-109`, `layers.css:114-131`); the cross axis is laid out at its natural size and steps when the posture class flips. This is the census row "cross-axis height when a page's seat set differs (56 to 60 px)", here at 52 px.
- **Both trees.** v11.0.1 (`layers-hover-inout.v11.0.1...`, `layers-fold-mid-switch.v11.0.1...`): expand f25 height 56 to 108 in one frame; the idle fold f610 108 to 56 in one frame, with the indicator jumping 26 px (to y −2.0); the fold during a switch f18 108 to 56. WebKit (tip): f13 108 to 56 with the summary at opacity 1.
- **Cure:** reserve and scale both axes when the two postures differ on the cross axis (the same fixed-point scale on `block-size`, with the corner counter-scaled on both), or tween the cross axis on the morph scalar.

### F4. The plate steps to a new width in one frame when a face, label or region changes (FIRST-FRAME JUMP, lands whole; MISMATCH)

- **Drill-in** (`drill-swap.*.1440-fine-light`): f7 plate 313.3 to **385.3** (+72) in one frame; Back f89 385.3 to **313.3** (−72) in one frame. The faces then fade over 190 ms after the plate has already landed (MISMATCH, 201 ms). On Back the leaving, wider face is cut by the narrowed plate in the first frame ("Forward" half-cut at the edge) and the two text faces overlap at half strength for about 100 ms. Strip `strips/v11.0.1/drill-swap.v11.0.1.chromium.1440-fine-light.seg2.start.png`.
- **Crossfade** (`crossfade.*`): f86 108 to **93** (−14.3), f168 93 to **103** (+9.6), each in one frame; at f87 the leaving four-row face, still near full opacity, paints past the narrower plate's edge ("surface stack" crosses the rim) and its title is cut ("Layer:"). Strip `strips/v11.0.1/crossfade.v11.0.1.chromium.1440-fine-light.seg2.start.png`.
- **Layer switch** (`layers-switch-key.v11.0.1`): f6 259.7 to 271.2, f88 to 281.1, f168 to 271.2, f180 to 259.7, each in one frame.
- **Select value** (`trigger-select.v11.0.1`): f82 the trigger 71.8 to 62.8, the plate 231.4 to 222.4, and the Dropdown trigger beside it 9 px left, in one frame.
- **Persistent region mounts and unmounts** (`persistent-toggle.v11.0.1`): open, f7 plate 231 to **181** and every seat 50 px left in one frame, f50 back in one frame; folded, f535 56 to **16** (the sliver of F6), f581 back to 56.
- **Cause:** a face is `inline-size: max-content` (`styles/crossfade.css:44-50`) and a swap does not register with the shell (`useDockMorph.ts:9-11`); `#persistent` is `v-if` (`GlassDock.vue:483`). Census items 1, 6 and 13; W-I.8 §1.5 (G-4).
- **Both trees.**
- **Cure:** W-I.8 §1.5 (the content episode: the plate glides on the dock lane, content fades inside its edge). The smallest step short of that: FLIP the root's inline size on a content change with the same `scale` the posture morph uses, and clip the leaving face to the plate while it fades.

### F5. Reversing a morph makes the content's opacity jump (INTERRUPTION)

- **Expand reversed** (Escape from the run): at 30 % (f13 to f14) seat opacity 1.00 to **0.51**; at 50 % (f16 to f17) 1.00 to **0.66**; at 80 % (f22 to f23) 1.00 to **0.85**. The plate itself turns from where it is, carrying its velocity (30 %: 131.7, 146.9, 147.7, 146.1, 143.0) with no jump.
- **Fold reversed** (pointer back onto the dock): seat opacity 0.17 to **0.43** at f21 to f22 (the 30 % run) and 0.14 to **0.36** at f23 to f24 (50 %), then to 1.00 within five frames (about 42 ms) while the plate takes 300 ms more to open.
- **Also:** a hover reversal waits for the 60 ms hover intent, so a reversal asked at 30 % of the fold lands at 83 %.
- **Strip:** `strips/v11.0.1/h-reverse-expand-50.v11.0.1.chromium.1440-fine-light.seg1.start.png`, `h-reverse-fold-50...seg1.start.png`.
- **Cause:** the content's opacity has two formulas: the entering run's staggered reveal on `--dock-expand-t` (`layers.css:269-283`) and the leaving pane's `1 - --dock-morph-t` (`layers.css:184-186`). A reversal swaps which pane is "leaving" and re-bases the scalar to `1 - t`, so the content jumps from one formula's value to the other's in one frame.
- **Both trees** (tip: 1.00 to 0.57 at 50 %).
- **Cure:** one formula for the content's opacity in both directions, a function of the plate's own progress (W-I.8 §1.3: out by 0.35, in from 0.35 to 0.70 of the one lane), so a reversal runs the same curve back.

### F6. The rounded dock's corners are not counter-scaled, and a dock with an empty summary folds to a 16 px sliver (corner DISCRETE at arm and settle)

- **Frames** (`h-rounded-hover.v11.0.1.chromium.1440-fine-light`, `shape="rounded"`, no `#collapsed`, no persistent): rest collapsed 16 by 56 with `border-radius: 50%` (an upright oval). f17 to **f25**: the corner goes from 50 % to 16 px under a root scale of 0.12, which paints 2 by 16 px (flat ends); the painted horizontal radius grows with the scale through the expand (2.7, 3.6, 4.5, 5.6 ...). Fold end f673 to f677 painted 1.2 by 16 (a square-ended bar), **f678 50 %** (the oval) in one frame.
- **Strip:** `strips/v11.0.1/h-rounded-hover.v11.0.1.chromium.1440-fine-light.seg3.end.png` (f677 to f679, bar to oval), `seg1.start.png`.
- **Cause:** the counter-scaled corner exists only for `.shape-pill` (`run.css:786-793`); `rounded` and `card` keep `--radius-dock` under the root's scale, and the circle rest rule applies only under `:not([data-morphing])` (`morph.css:176-177`), so it swaps on the settle frame. The census row "corner at arm and settle, snaps (likely)" is this, for the finite shapes. **On the pill it does not happen:** the painted corner is 28 by 28 on every frame of every pill fold and expand I recorded (`h-pill-hover`, `h-escape`, `h-focus-leave`, `h-pill-tap-outside`), so the proof's "115.5 to 28 at settle" is the computed radius under a scale that leaves at the same frame (115.5 × 0.2424 = 28.0), not a paint change.
- The 16 px sliver is the collapsed box with nothing in the summary (`summary.w` 0): a rest fault more than a motion one, but it is where the fold ends.
- **Both trees.**
- **Cure:** generalise `run.css:786-793` to every shape (the rest corner divided by the scale on the morph axis), and give the summary a floor (the collapsed control size) when it is empty.

### F7. The slider dock renders at half rate through the morph (DROPPED FRAMES, v11.0.1 only)

- **Frames** (`slider-fold.v11.0.1.chromium.1440-fine-light`): through the expand, 16 frames at 15.7 to 25.7 ms (f33 to f48; the 25.7 ms one at f36); through the fold, 14 at 15.1 to 23.8 ms (f592 to f606). Every other pill morph renders at 8.3 ms. The plate's largest step is therefore 86.5 px on expand and 75.5 px on fold (17 % of travel), against 13.5 px (7.7 %) on the plain pill.
- **Traced** (`rows/v11.0.1/trace/slider-fold...`): every morph frame lays out (51 of 59, 49 of 49); no long task or long animation frame was reported.
- **Strip:** `strips/v11.0.1/slider-fold.v11.0.1.chromium.1440-fine-light.seg4.start.png`.
- **The tip cures it:** `slider-fold.tip...` has no frame over 12 ms on expand and one at 16 ms on the fold, and the largest plate step is 31.7 and 46.4 px. The tip's `dockMorphMeasure.ts` skips the ResizeObserver capture when only the morph's own boxes resized, which takes the capture's measuring layouts out of every morph frame.
- **Not seen:** W-I.8's "a wide control stands 13 px past the closing plate at full opacity, then drops 1 to 0 in one frame" did not reproduce with two sliders in the run: their opacity follows `1 - t` from the first fold frame (0.95, 0.78, 0.63 ...) and the root's clip cuts them at the edge. It is likely specific to where daraksha places its control.

### F8. The switcher swallows a tap on a tab, and its mark vanishes (CUT; the click does nothing)

- **Frames** (`layers-switch.*.1440-fine-light`, both trees): a click on tab 2 at f6; at f7 the indicator's opacity goes 1 to **0** in one frame, a hover fill grows on tab 2, and the face never changes (Assets stays at 1.00). The same press-and-release on tab 3 and tab 1 does nothing. A script `.click()` and the arrow keys switch faces normally (`layers-switch-key`), and under reduced motion (where `motion="full"` falls to `reduced` and the drag is off) the pointer click switches.
- **In the drag** (`layers-drag.v11.0.1.chromium.1440-fine-light`): the indicator trails the pointer by a median 6.5 px (10.7 at most) and never moves against it; **the release frame jumps 10.2 px** (f128 52.2 to f129 42.0), then settles 222 ms with no snap (first steps −1.5 px, last −0.06 px); about 600 ms after release (f201) its opacity drops 1 to 0 in one frame and stays there.
- **Strip:** `strips/v11.0.1/layers-switch.v11.0.1.chromium.1440-fine-light.seg1.start.png`, `layers-drag.v11.0.1.chromium.1440-fine-light.end.png`.
- **Cause:** with `motion="full"` the switcher arms `useDragMorph` on pointer down (`DockLayerGroup.vue:60-66`); a press with no travel resolves as a fling to the nearest face, which is the current one, and the selection writer then writes `opacity: 0` on the indicator (the writer owns `opacity` inline, `layer-group.css:326-348`). This is the tabs recorder's drag error in the dock's switcher.
- **Both trees.**
- **Cure:** treat a press that travels under the drag threshold as a click on the tab under it, and keep the indicator's opacity at 1 whenever a face is active.

### F9. The leaving face is cut when a third switch arrives (CUT, INTERRUPTION)

- **Frames** (`layers-switch-key.v11.0.1`): ArrowUp, then ArrowUp again 90 ms later (f180): the face still leaving (Libraries) goes 0.28 to **0.00** in one frame, and the plate steps 271.2 to 259.7. The indicator turns from where it is (67.1, 66.5, 65.0 ...).
- **Cause:** "snap any stale leaving face to idle" (`DockCrossfade.vue`, the `stale` branch of the `activeId` watch).
- **Both trees** (tip, `layers-switch-key.tip...`: f176 to f177 the leaving face 0.33 to 0.00, the plate 271.2 to 259.7).
- **Cure:** let the stale face keep fading from its painted value on the same spring (three faces at most, each with its own `--dock-t`), or fold it into the entering face's slot.

### F10. The persistent seat ticks back at the end of every fold (LAST-FRAME SNAP, REVERSAL)

- **Frames:** horizontal (`h-pill-hover...1440-fine-light`) the Home seat travels 474.4 to 469.4 through the fold and **jumps +1.0 px to 470.4 on the settle frame** (f677 to f678); vertical (`v-hover...1440-fine-light`) it travels 488.0 to 494.1 and **jumps −2.1 px to 492.0** on the settle frame (f675 to f676); coarse vertical the same (f235 to f236). The fold overshoots the region's rest by that amount and the settle pulls it back.
- **Cause:** the region's fixed-point origin is computed against the reserved expanded box (`dockMorphMeasure.ts`, the `held` origin), which is not the collapsed rest by the region's floor; at settle the scale and the origin are dropped together.
- **Not cured on the tip** (the tip holds the anchored edge for edge-anchored docks; these docks are centred).
- **Cure:** solve the origin so the region lands on its measured collapsed rest at `t = 1`, as the plate does.

### F11. Reduced motion cuts every dock motion (FIRST-FRAME JUMP, lands whole)

- **Frames** (`*-rm`, v11.0.1): the pill plate 56 to 231 in one frame (f25) and back (f546), seats from opacity 0 to 1 in one frame; the rounded 16 to 208 (f26); the vertical 110 to 208 (f25); the slider dock 56 to 501 (f25), with a 50 ms frame at the fold cut; the drill-in faces 1 to 0 and 0 to 1 with the plate's 72 px (f7); the crossfade faces (f6); the layer switch (f7, f310, f361); the run's mark 96, 216 and 312 px (f7, f312, f362).
- **Strip:** `strips/v11.0.1/h-pill-hover.v11.0.1.chromium.1440-fine-light-rm.seg1.start.png`.
- **Cause:** census item 11: `useDockSpring.ts:103` seats the spring at once, `DockCrossfade.vue:218-221` settles at once, and the universal carve zeroes every transition.
- **Both trees.**
- **Cure:** P6: keep a fade of 144 ms or less on the contents (W-I.8 §1.6 allows exactly this) while the geometry seats.

### F12. The Play and Pause glyph and the active seat's lens switch in one frame (CUT, DISCRETE)

- **Frames** (`bg-toggle.v11.0.1.chromium.1440-fine-light`): f7 `aria-pressed` true, the glyph changes Pause to Play, and `backdrop-filter` none to `blur(20px) saturate(1.5)`, all in one frame; f250 the reverse. In the press scenario the same swap at f40 (`seat-press`).
- **Strip:** `strips/v11.0.1/bg-toggle.v11.0.1.chromium.1440-fine-light.seg1.start.png` (f9 already shows Play).
- **Cause:** `v-if`/`v-else` (`DockBackgroundToggle.vue:72-73`); `.glass-capsule` adds its filter at once when `active` turns on (census item 7, 12).
- **Both trees.**
- **Cure:** render both glyphs and cross-fade them with a small scale (the study's icon-morph piece); fade the capsule's lens in on opacity of a layer that carries it, since `backdrop-filter` from `none` cannot tween.

### F13. The dock's shadow swaps shape on the arm frame (DISCRETE)

- **Frames:** every fold's first frame (`h-pill-hover` f611, `bg-toggle` f733) and every expand's: the expanded `box-shadow` (an inset rim plus 20 px at 0.14) becomes the collapsed 12 px at 0.12 in one frame, and back. In dark the same.
- **Cause:** `morph.css:161-167` (the comment calls it "a subtle, acceptable swap").
- **Both trees.**
- **Cure:** give both postures the same shadow list (the rim pair present with zero alpha when collapsed) so it interpolates on the scalar.

### F14. A wheel on the run lands in one frame, then creeps to the snap (CREEP, REVERSAL)

- **Frames** (`run-scroll.v11.0.1.chromium.1440-fine-light`): f9 the run moves −240 px in one frame, then creeps back +24 px in 1 and 2 px steps over 170 ms (f11 to f30) to the snap point. The way back (f84) lands in one frame on a snap point.
- **Cause:** headless Chromium does not animate wheel scrolling, so the jump is the engine's; the creep is the port's mandatory snap pulling to a seat edge in whole pixels.
- **Both trees.** A visible fault only where wheel scrolling is not smoothed; I rank it last and would confirm on a real device before acting.

## Each motion read as a whole

- **Pill expand and fold** (hover, focus, tap, press outside, Escape; both orientations): reads as one gesture. The plate eases off its rest (first steps 8.7, 7.7, 10.7, 13.4 px, at most 8 % of travel per frame), decelerates to rest about 250 ms later, and lands without a snap; the shape stays a capsule on every frame. Its ends are clean. What breaks it is around it: the shadow swap on the first frame (F13), the Home seat's tick on the last (F10), and a 290 ms invisible tail during which `[data-morphing]` is still set.
- **Rounded expand and fold:** does not read as one shape changing size: it starts as an oval sliver, becomes a flat-ended bar, and turns back into an oval on the last frame (F6).
- **Layer-group dock:** the width morphs; the height arrives whole on the first frame (F3). It reads as two motions.
- **Fold during a layer switch:** reads as a collision: the height drops, the indicator jumps, the summary lands on top of the switcher, and two faces of text overlap (F3, F4).
- **Drill-in and crossfade:** the box changes first, whole, and the text fades after, so the content leaves through a box that has already shrunk (F4). The out runs the same 250 ms as the in.
- **The run's mark** (the open seat exchange between neighbours in the port): one gesture, 225 ms, complementary widths, clean start and end. **The glide to a seat past the fold:** not one gesture (F1).
- **Seat hover:** reads as a cut with a gleam over it (F2); the press squish itself is smooth in and out.
- **Menu from a seat as the dock folds:** reads correctly: the outside press folds the dock and the menu fades and shrinks in 115 ms (two frames after the fold starts), shorter than the fold, without following its trigger. Escape closes the menu in 110 ms; the dock then stays open because focus returns to the trigger inside it (by design).
- **Select from a seat:** the listbox opens in 210 ms and closes in 75 ms, cleanly; the value change resizes the trigger and the plate whole (F4).
- **Switcher drag:** the indicator follows the pointer closely and never against it; the release jumps 10 px, and a press with no travel does nothing (F8).

## Ranked by how visible they are

1. **F1** the run's glide to a seat past the fold: 24 to 134 px lurches with backward slides between them. Every navigation in a crowded dock.
2. **F3** the layer-group dock's height arrives whole (52 px) at expand and fold; at a fold during a switch the content collides.
3. **F4** the plate steps whole on every face, label, value and region change (9 to 72 px), and the leaving content is cut or overhangs the plate.
4. **F2** no hover or press fade on any seat in the run (every hover in every dock).
5. **F8** a tap on a switcher tab does nothing and the indicator vanishes; the drag's release jumps 10 px.
6. **F6** rounded and card docks: barrel corners through the morph and a bar-to-oval swap on the settle frame; an empty summary folds to a 16 px sliver.
7. **F5** content opacity jumps by up to 0.49 when a morph is reversed.
8. **F11** reduced motion cuts every dock motion.
9. **F7** the slider dock at half frame rate on v11.0.1 (**cured on the tip**).
10. **F12** the Play/Pause glyph and the active lens switch whole.
11. **F9** a third quick switch cuts the leaving face.
12. **F10** the persistent seat's 1 to 2 px tick on the settle frame.
13. **F13** the shadow swap on the arm frame.
14. **F14** the wheel's snap creep (engine-dependent).

## What the tip cures and what it adds

- **Cures:** F7 (the slider dock's dropped frames), by keeping the ResizeObserver capture out of the morph's own frames.
- **Adds:** nothing I could measure. Every other motion reads the same on both trees, within a pixel and a frame (`logs/compare.txt`). The tip's region-anchor and collapse-arm changes act on edge-anchored docks and on consumers that empty the expanded pane on `.collapsed:not([data-morphing])`; none of my cells is either, so those cures are not exercised here.

## Layout in frames (traced, v11.0.1, 1440 fine)

| motion | frames with layout | layouts | layout ms |
|---|---|---|---|
| pill fold (`h-pill-hover`, seg 612-678) | 67 of 67 | 486 | 19.0 |
| pill expand (seg 17-91) | 67 of 75 | 148 | 9.8 |
| the open seat exchange (`run-mark`, seg 7-35) | 29 of 29 | 218 | 13.5 |
| the glide past the fold (seg 94-124) | 30 of 31 | 31 | 4.1 |
| the slider dock fold (`slider-fold`, seg 594-642) | 49 of 49 | 143 | 10.0 |
| drill-in (`drill-swap`) | 2 of 32 | 2 | 0.3 |

The morph is not compositor-only: it lays out on every frame (P5), about seven layouts a frame on the fold, though the time is small. The open seat exchange lays out every frame because it animates `inline-size`.

## Motions read and found clean

- The pill plate's start and end in every collapse path and both orientations, at 1440 fine and 390 coarse: no first-frame jump, no last-frame snap, no creep visible, the corner round on every frame.
- The plate's turn on reversal at 30, 50 and 80 %: it turns from where it is, with its velocity.
- The open seat exchange between two seats already in view (225 ms, complementary, smooth ends).
- The press squish in and out (fine and coarse).
- The indicator's travel on a keyboard or script switch (280 ms, no snap), and its turn on a reversed key.
- The dropdown menu's open and close, and its fade as the dock folds under it.
- The select listbox's open and close.
- The menu holding the dock open past the idle window.
- The switcher drag's tracking (median lag 6.5 px, never against the pointer) and its release settle after the first frame.
- The two-slider dock's content against the plate through the fold (fades with the plate, cut at the edge).

## WebKit

Playwright WebKit, the tip, 1440 fine, one run each under `guarded --exclusive webkit --timeout 10` (rows in `rows/tip/*.webkit.*`; WebKit has no screencast, so no strips). Frames ran a median 10 ms apart. All four of the faults ranked first reproduce:

| fault | WebKit frames |
|---|---|
| F1 the glide past the fold | Music: f69 −24, f73 −124, f74 to f76 back +8, +9, +8, f77 −42, f78 to f82 back +28, f83 −127. Home: f138 +130, f141 +39, f143 +39, f147 +94, with −6 to −8 px slides against the motion between them. The same pattern as Chromium. |
| F2 no hover fade on run seats | `background-color` alpha 0 to 0.14 whole at f15, and the swap between seats whole at f218 and f421; only the gleam's transitions run. |
| F3 the layer dock's height | the fold during a switch: f13 108 to 56 in one frame, the summary at opacity 1. |
| F4 the plate steps on a face change | drill-in f5 312.9 to 387.3 in one frame, Back f71 387.3 to 312.9. |

Not confirmed in WebKit: F5 to F14 (by the brief, only the faults ranked first).
