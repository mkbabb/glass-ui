# The animation audit: the library read as a whole

Gestalt seat, claude-fable-5-2, 2026-11-13. No browser was launched for this file. It is read from the seven records under `record/*/RECORD.md`, their rows and strips, the harness proof, and the known findings the brief lists (`CENSUS.md`, `../inbound-critiques/`, W-I.8's measured sections, W-B.18, W-B.17). Where the records disagree with each other or with a known finding, the rows decide.

How to read the citations:

- `drag/`, `dock/`, `overlay/`, `controls/`, `disclosure/`, `data/`, `ambient/` are the folders under `record/`. A fault id such as T-1 or O-3 is that record's own id, so "drag T-1" is the tabs fault in `record/drag/RECORD.md`. Two records use the same letters (drag S-1 is the Slider, controls S-1 is the Switch), so every id here carries its family.
- Source lines are the measured tree's, v11.0.1 (`e42bc2705`). The lines of the shared rules in section 2 were checked on master (`ae8a233c8`) and are the same there.
- "The tip" is the harness's 11.0.2 tree at `648d70e59`. `release/11.0.2` has moved since, to `14dd41fea`; one of its two later source commits, `46ec8d30f`, changes a fault below (row 18).
- Every reading is headless Chromium 149 at about 120 Hz unless it says WebKit, and WebKit is Playwright's build, not Safari.

## 1. What the library does well, and where it breaks

Most motions have a sound middle. What the owner names, the beginnings and the ends, is where the faults are, and they come from a short list of shared rules.

**The ends.** Three things spoil an ending.

1. Every CSS spring curve stops short of 1 and then steps to it, so the last frame of every tab glide, accordion, progress fill, switch thumb and deck turn carries 2.5 % of the travel (0.6 % on the three long springs). It is one generated token block (section 2, rule A).
2. The hand-off at release is written in two steps on five controls. The state changes in one tick and the gesture's offset is dropped in another, so for a frame the thing sits where neither says. That is the tabs pill jumping back to the old tab, the sortable rows jumping a row, the sheet dropping to its last rung, the phone select turning into a popover, and the command list vanishing before its dialog (rule F).
3. Many exits are not animations. The detented sheet stops and then vanishes; the alert, the avatar's fallback, the chip, the loading ring, the easing dot and the expanded container are removed at full opacity. The census read these from source; the frames confirm them.

**The beginnings.** Two things spoil a beginning.

1. A thing mounts already in its end state. The tooltip, the slider's lens, the canvas fields' first frame, the detented sheet at its floor, the toast's neighbours and every `v-if` line all appear whole.
2. A value is written at the input's cadence with no tween: a slider key step, a track press, the music staff's progress ink, a falling timeline.

**Reversals.** The library has three behaviours, and which one a control gets depends only on how it was built.

- A spring in script turns from where it is and keeps its speed: the dialog, the side sheet, the dock's plate, the detent drag. These read right.
- A CSS transition turns from where it is and loses its speed: the tab glide, the deck turn, the switch, the progress fill. Position is continuous; on the long ones (tabs, deck) the stop reads as a bounce off a wall.
- A keyframe with a fixed `from` restarts from the far end: every `.glass-reveal` surface flashes fully open, and the accordion flashes empty or full (rule E).

**Reduced motion.** It is a cut on every component of every family. One rule causes it, and it also silences seven fades the components author for exactly this case (rule B).

## 2. Clocks, easings, and the shared rules behind the faults

### The clocks and curves in use

| Kind | Where it is used | Clock and curve, as computed |
|---|---|---|
| CSS spring tokens (`linear()`) | press 120 ms: press squish, field colours, card and surface fills, sortable lift. present 200 ms: accordion, menu and select enter, alert, clef. dock 210 ms: tab indicator, switch thumb, progress fill, rim, theme icon, seat exchange, timeline check, configurator layer, expandable birth, carousel fade, pager slide. panel 450 ms: popover and toast enter, toast swipe return, note land. world 570 ms: deck turn, handmark ink-lag | `src/styles/tokens/scheme-spring.css:59-64`, each with its own `--spring-<name>-settle` (`:102-107`) |
| Springs in script | dock morph and DockCrossfade (dock preset, about 250 ms to rest); dialog (present, 173 to 192 ms); side sheet (panel, 342 in and 173 to 183 out); sheet detents (bloom and dock); tabs drag; pager worm; timeline fill; Button press; blob pointer | keyframes.js `SpringProgress`; these settle by physics and have no tail step |
| Standard bezier `cubic-bezier(0.4, 0, 0.2, 1)` | colour and fill on controls | 120 ms (accordion trigger), 150 ms (data-table row), 180 ms (Button fill and disabled), 200 ms (checkbox, switch, radio, dock seat, tab label, theme toggle, badge, status dot), 300 ms (gleam, card condense, completion glow, focus veil) |
| Attack and release | menu, select and command rows; selectable card | 60 ms in, 180 ms out |
| `--ease-out` `cubic-bezier(0, 0, 0.2, 1)` | reveal opacity and blur, every reveal exit, vaporize, chip glow, the canvas bloom (1100 ms) | exits 120 or 250 ms |
| `--ease-out-expo` | tooltip enter, music staff draws, easing sweep | 200, 520, 450 ms |
| `--ease-cartoon-punch` (dips below 0, peaks at 1.22) | disclosure chevrons (200 ms), chip select (300 ms), slider release (300 ms) | an overshoot on a control, against P2 |
| Exponential damper | countup (`SmoothProgress`) | 11 % in the first frame, about 1.3 s to rest |
| Linear loops | skeleton shimmer and indeterminate band (3 s), staff reel (8 s), status-dot pulse (1.8 s) | |

Two readings of that table matter.

- **One intent, six clocks.** A hover fill takes 60, 120, 150, 180, 200 or 300 ms depending on the control, and on a toggle-group item, a sortable row, a timeline mark and a run seat it takes none. W-B.17's plate puts every hover on one clock (`--duration-control`); the audit adds nothing to that design except the list of where it is absent today.
- **Colour on a spring.** The field controls, the card and surface fills and the dialog scrim tween colour on `--spring-press` (P1 gives springs to movement only). No frame shows a visible fault from it (controls I-3), so it is recorded here and not ranked.

### Where two parts of one gesture disagree

| Gesture | The two parts | By how much | Source |
|---|---|---|---|
| Tab glide | label colour (200 ms bezier) against the pill (210 ms spring) | label done 115 to 174 ms early | drag T-5 |
| Dock face swap | the plate's width (one frame) against the faces' fade (190 ms) | 201 ms; two faces legible at once | dock F4 |
| Dock morph reversed | the content's opacity has two formulas | jumps by up to 0.49 in one frame | dock F5 |
| Sheet detents | the grip's own 210 ms transition on top of the per-frame scalar | grip 273 to 523 ms late | drag H-4 |
| Side sheet | scrim (clamped) against the sheet's overshoot | 179 ms | overlay O-12 |
| Dialog | the page blur (300 ms after a 100 ms wait) against the plate's spring | blur ends 166 ms after the plate | overlay O-17 |
| Button press | a spring in script and a CSS transition both write `scale` | squash still deepening at release; settles 250 ms late; gleam 700 ms late | controls B-2 |
| Popover, menu, select, toast | the frost (backdrop blur) against the plate's opacity | absent until opacity 0.98 on the way in; gone by 0.74 on the way out | overlay O-7 |
| Disclosure | chevron (punch curve) against the content (present spring) | chevron swings 38° past rest while the content lands | disclosure D-5 |
| Chip select | fill (at once) against glow (60 ms wait) | darker middle for two frames | controls CH-1 |
| Progress | value marks fade on the fill's clock, not at the fill's position | the 80 mark half gone with the fill 84 px short | data, Progress |
| Timeline | the disc's state paint against the fill front | disc fills 60 ms before the front arrives | disclosure D-8 |
| Status dot | silhouette (one frame) against colour (200 ms) | | data, Status-dot |
| Card condense | box and font size (one frame), glyph scale (300 ms), backplate (300 ms) | rows paint through the title for 300 ms | data, Card |
| Surface tier | blur and edge (one frame) against fill (120 ms) | | data, Surface |
| Theme flip | page ink and canvas (one frame) against glass surfaces (120 ms) | white text on a cream card for three frames | controls D-1 |
| Carousel | neighbour fade starts at the commit, not with the travel | ends 60 ms after the strip rests | drag C-3 |
| Infinite scroll | new rows land in the frame the ring starts to leave | the ring fades 567 px away, off screen | data, Infinite-scroll |
| Aurora preset | the ground fades (200 ms) under an opaque canvas | never seen; the stage cuts | ambient A-1 |

### The shared rules: one cure fixes many

Each rule is named once, with its file and line. The ranked list refers back by letter.

**A. The spring curves end with a step.** `src/styles/tokens/scheme-spring.css:59-64`, generated through `src/composables/motion/spring/springProjection.ts:47-66`, which samples the step response over the spring's settle time and hands the stops to keyframes.js's `springLinearStops`; the last stop is 1 whatever the sample before it. As read on master:

| token | last three stops before 1 | last step | against the step before |
|---|---|---|---|
| `--spring-press` | 0.96406, 0.97020, 0.97581 | 2.42 % | 4.3 times |
| `--spring-present` | 0.97016, 0.97296, 0.97550 | 2.45 % | 9.6 times |
| `--spring-dock` | 0.96478, 0.96918, 0.97317 | 2.68 % | 6.7 times |
| `--spring-panel` | 1.00941, 1.00766, 1.00609 | 0.61 % | 3.9 times |
| `--spring-bloom` | 0.99118, 0.99291, 0.99440 | 0.56 % | 3.8 times |
| `--spring-world` | 0.99273, 0.99364, 0.99444 | 0.56 % | 7 times |

Six records measured it without knowing the others had: 4 to 5 px on a tab hop (drag T-3), 8 to 10 px on the configurator layer, the expanding panel and the deck (disclosure D-6), 5 to 8 px on a progress fill (data A), 7.75 px on the staff's playhead and 9.71 px in WebKit (ambient M-1), half a pixel on the switch and 5° on the theme icon (controls F-3), and W-B.17's own prototype (7.3 px on a 288 px travel, challenge C-8, which is why `follow()` left the spring token). The springs in script do not have it: the dock's plate, the dialog and the timeline fill all end clean.

Three cures were proposed. The drag record would regenerate the dock row over the 0.5 % band, which lengthens its clock from 210 to about 300 ms and, as the world row shows, still leaves 0.56 %. The controls and ambient records would add stops after the band. The disclosure and data records would divide every stop by the spring's own value at the settle time (about 0.98 on the short rows), so the curve reaches 1 without a step and no clock moves. **The third is the cure**: it changes six lines of generated CSS, no name and no duration. It is one edit in the projection and one run of `scripts/regen-spring-tokens.mjs`.

**B. Reduced motion is one blanket rule.** `src/styles/utilities/a11y-overrides.css:46-54` sets `transition-duration: 0s` and `animation-duration: 0.01ms`, both `!important`, on every element. Confirmed by frame in all seven families. It overrides the fades these files author for reduced motion, none of which runs: `styles/glass/reveal.css:316-339`, `styles/glass/control-bit.css:369-373`, `styles/glass/liquid-enter.css:229`, `components/expandable-container/styles.css:113-115`, `components/deck/styles/turn.css:192-201`, `components/music-staff/styles.css:297-301` (the loading staff then shows no busy cue at all), and `components/aurora/Aurora.vue:392-399`. The springs in script jump under the same setting (`useDockSpring.ts:103`, `DockCrossfade.vue:218-221`, `useSpringMount`). Two controls keep a movement and cut to it: the Button and the selectable card still scale to 0.97, in one frame (controls B-5; data B). W-B.17 R-9 owns the cure; O-308's question (a consumer's own fades) is still open, and this audit's evidence bears on it: the authored fades already exist and only the blanket stops them.

**C. A shared class's `transition` replaces the control's own list.** `transition` is one property, so the last rule wins and every other leg is lost.

- `src/components/dock/styles/run.css:526-535` set `transition: inline-size` on every child of a run, so no seat in a run fades its hover or press (dock F2, O-300 a). Cured on `release/11.0.2` by `46ec8d30f`.
- `src/styles/glass/glass-capsule.css:94` sets `transition: --specular-intensity`, so a toggle-group item's selection, hover and leave all land in one frame, and the chip's hover does nothing (controls T-1, CH-2).
- W-B.17 already states the law for its own pieces (`:where()` for a shared leg, R-11, challenge C-6). The one cure is to apply it to these two files.

**D. A node appears or leaves with no frames.** Census point 3, confirmed wherever a record reached it. Three variants beyond the plain `v-if`:

- an enter recipe keyed on a state the node never has: the tooltip's content is `delayed-open` or `instant-open`, never `open`, so `reveal.css:136-161` gives it no from-state (overlay O-5);
- a node mounted already engaged: the slider's lens (`Slider.vue:333-346`, drag S-3);
- an attribute written after the first paint: the canvas reveal (`composables/glass/webgl/visibility.ts:256-269`), so the blob and the fourier field flash at full strength, vanish, and then fade in (ambient B-1).

**E. A keyframe with a fixed `from`, swapped by `data-state`.** `src/styles/animations.css:157-162` (`glass-reveal-out` starts at `scale: 1 1; opacity: 1`) and `src/components/_shared/disclosure/disclosure.css:1-23`. A reversal starts the other keyframe at its own beginning (overlay O-1, disclosure D-1). Dropping the `from` cures the reveal; the accordion needs the new animation seeked to the mirrored progress.

**F. The release hand-off is written in two ticks.**

| Control | What happens | Where |
|---|---|---|
| SegmentedTabs, and the dock's layer switcher | the offset is cleared before the base position is written | `composables/motion/morph/useDragMorph.ts:196-205` |
| Sortable list | the parted rows' shifts are cleared, then the DOM reorders | `components/sortable-list/drag.ts:163-167` |
| Sheet detents | a drag writes the position; the reused spring still holds the last rung | `components/sheet/detents/use.ts:121-130` |
| Select on a phone | the sheet form is derived from `open`, which ends before the exit | `components/select/SelectContent.vue:60` |
| Command palette | the dialog's `open` is forwarded to the list, which unmounts at once | `components/command/CommandDialog.vue` |

They are five files and five small cures, but one rule: the state and the visual offset change in the same frame, under one lock.

**G. Nothing inside a surface tweens its size.** Census point 2, confirmed: the field's error line (27 px), the Button's loading ring (24 to 58 px), the command list (up to 195 px a key), the data table (207 to 416 px), the alert's room (107 px), the skeleton swap (48 px), the textarea (24.6 px a line), the metric's value (up to 112 px), the toast stack (113 to 249 px), the dock's plate (9 to 72 px). W-B.17's presence and held `follow()` own the non-dock rows; W-I.8 §1.5 owns the dock.

**H. The canvas lifecycle.** `src/composables/glass/webgl/createCanvasLifecycle.ts:272` restarts the field's clock at one second on every resume, so aurora and the blob jump on tab return, scroll back and play (ambient A-2); `:259-266` parks the loop with no ramp, so pause stops dead and play starts at full speed (B-4); and the reveal of rule D.

**I. The focus ring.** `outline-style` is set only under `:focus-visible` in three registers (`src/styles/utilities/base.css:144-151`, `src/styles/glass/control-bit.css:320-326`, `src/components/_shared/field/control.css:224-226`), so it lands whole and cuts (controls F-1). W-B.17 R-12 owns it.

**J. Overshoot on things P2 says must not.** `--ease-cartoon-punch` on `src/styles/utilities/btn.css:82-84` (every disclosure and select chevron: 6.5° back, then 38° past) and on `src/styles/glass/glass-chip.css:30` (21 % past); `--spring-panel` on the side sheet (16 px past its edge, O-264) and on the overlay register (`src/styles/tokens/motion-registers.css:69-70`: popover and toast take 350 ms, half of it sub-pixel creep).

**K. Layout in every frame of a motion.** The dock's fold (486 layouts in 67 frames), the seat exchange (`inline-size`), the sheet's detents (`block-size`, 1.2 to 1.6 layouts a frame), the staff's SVG, the easing dot (`cx`, `cy`) and the theme icon. None dropped a frame on these pages except the v11.0.1 slider dock (row 18). It is a cost that grows with content, recorded against P5; W-I.8's G-11 retires the dock's.

## 3. What was struck, and what was merged

**Struck: the rows do not show it.**

| Claim | Where it was made | What the rows say |
|---|---|---|
| The pill dock's corners jump from 115.5 to 28 px on the settle frame | harness proof; census "corner at arm and settle" | The computed radius is under a scale that leaves on the same frame (115.5 × 0.2424 = 28.0). The painted corner is 28 px on every frame of every pill fold and expand (dock F6). The fault stands for the rounded and card shapes only. |
| A wide control stands 13 px past the closing plate at full opacity, then drops in one frame | W-I.8, measured on daraksha (O-288) | Not reproduced with two sliders in the run (dock F7), nor by 11.0.2's own fold harness in Chromium or WebKit (`46ec8d30f`). It belongs to daraksha's composition, whose controls are teleported in and sit outside the dock's context (O-307). |
| The leaving run goes from visible to hidden in one frame, 300 ms after rest | harness proof | It is `visibility` flipping at opacity 0 (`layers.css:148`). Nothing paints. |
| The slider's fill jumps and its lens jitters while held | harness proof | A 60 Hz pointer against 120 Hz frames. The thumb trails the grip by about 1 px and never moves against it (drag, Slider). The lens clone's "cut" is under a parent already at opacity 0. |
| The fold's first frame jumps 13 to 17 % of its travel | O-306, daraksha | On a plain pill the largest frame is 8 % (dock, "read as a whole"). 17 % is the v11.0.1 slider dock rendering at half rate (dock F7), which the tip cures. The two are the same reading. |
| The accordion opens a tall body in steps of 145, 133 and 55 px | color R-01 | Its capture samples every 50 ms; a 200 ms open sampled four times gives those steps. At 120 Hz the open is even (disclosure, "read and clean"). |
| A wheel on the dock's run, on a carousel or on a fading scroll lands in one frame | dock F14; drag, Carousel; data, Fading-scroll | Headless Chromium does not smooth the wheel. The fading-scroll row keeps one true part: any step over 16 px (Page Down, a script jump) lands the edge whole. |
| One long frame on a chip deselect | controls CH-4 | Seen once in three runs. |

**Not confirmed: seen, but not placed.** The card title's scale dropping for one frame at 390 (data; a row reading the screencast skipped, and the traced run cannot tell it from a late read). The deck's first turn losing 283 ms to one frame (disclosure D-11; the machine was at a load of 44). The fourier bloom losing its first 300 ms in two mounts of six (ambient F-3; no script in the long frame). Each needs a repeat on a quiet machine before it is a fault.

**Not the library's.** The Surface story's scrubber replaces the ladder's transition, and the data-table story's `transition-[max-width]` from `none` cannot run (data). The collapsible's 12 px jump is the story's `gap-3` on a root whose content unmounts (disclosure D-2); the library can make that mistake impossible, which is why it stays in the list, low.

**Merged.**

- The spring tail: drag T-3, disclosure D-6, data A, ambient M-1, controls F-3 (S-2, D-2, C-4), the proof's tabs candidate, and W-B.17's C-8. One row.
- The drag-morph release: drag T-1 and T-2, and dock F8 (the layer switcher runs the same primitive: a tap is swallowed and its mark vanishes).
- The dock's content change: dock F4, F3 and F9, census rows 1, 6 (the dock's select) and 13 and the cross-axis row, color C-03 and C-04, and O-306's layer-swap reading.
- The chevron: overlay O-13 and disclosure D-5 and D-14's backward lead.
- The reveal recipe: overlay O-1, O-5 and O-8 are three faults of two files.
- The focus ring: controls B-3, C-3, I-1, overlay O-16, and the slider's ring on a pointer press (drag S-5, which W-B.18's measure had already read in both engines).
- The side sheet's overshoot: overlay O-12 is O-264, already booked.
- The tabs panel: drag T-6 and disclosure D-13.
- The theme flip: controls D-1, census 16, fourier's row, O-308 (2).
- Reduced motion: the seven records' rows, census 11, color C-19, fourier's row, O-308 (1).

## 4. The faults, ranked across the library

Ranked by how visible each is and how often a user meets it, with the owner's named interactions first where two are close. "Release" is 11.0.2 where that release already carries the item, 11.1.1 for a cure that changes no API, or the wave that owns it. "Unplaced" means no wave owns it and it needs a ruling or a design first; section 6 lists those.

Evidence paths are under `record/` unless they begin `owner/` or `harness/`. Rows files are named `<scenario>.<tree>.chromium.<cell>.rows.json`; only the scenario and the frames are given.

| # | Component | Motion | Kind | Evidence | Cause | Cure | Release |
|---|---|---|---|---|---|---|---|
| 1 | SegmentedTabs; DockLayerGroup's switcher | a drag released onto another tab; a tap on a switcher tab | JUMP, then a second glide; the tap does nothing and the mark vanishes | `drag/rows/tabs-drag` f204 to f205 (x 92.41 to 4.00, then back to 92.41 by f231); WebKit f167; `owner/01-tabs-drag-release.png`; `dock/strips/v11.0.1/layers-switch…seg1.start.png` | rule F, `useDragMorph.ts:196-205`; `DockLayerGroup.vue:60-66` treats a press with no travel as a fling to the current face | write the base position before clearing the offset, with the lock held across both; a press under the drag threshold is a click; the indicator keeps opacity 1 while a face is active | 11.1.1 |
| 2 | every control on a CSS spring token | the last frame | LAST-FRAME SNAP | section 2, rule A; `drag/rows/tabs-click` f116 to f117; `disclosure/rows/cfg-layer` f119 to f120 (+10.39 px after +1.98); `data/rows/prog-step` f288 to f289; `owner/02-spring-tail-tabs-click.png` | rule A | divide the stops by the last sample's value; regenerate the six tokens | 11.1.1 |
| 3 | GlassDock, DockLayerGroup, DockCrossfade | a face, label, select value or region changes; a layer-group dock expands or folds | lands whole (9 to 72 px on the axis, 52 px across it); two faces legible at once; the leaving face cut by the plate | `dock/rows/v11.0.1/drill-swap` f7, f89; `crossfade` f86, f168; `dock/rows/tip/layers-fold-mid-switch` f16 to f17; WebKit the same; `owner/03-dock-face-swap.png` | a face is `max-content` and a swap does not register with the shell (`styles/crossfade.css:44-50`, `useDockMorph.ts:9-11`); the morph reserves one axis (`styles/shape.css:104-109`); `#persistent` is `v-if` (`GlassDock.vue:483`) | W-I.8 §1.5 (the plate glides, content fades inside its edge) and §1.3 (the leaving face out before the entering one is in). Add the cross axis and the third-switch case (F9) to G-4's cells | W-I.8 |
| 4 | the dock's run | the glide to a seat past the fold | four lurches of 24 to 134 px with backward slides between | `dock/rows/v11.0.1/run-mark` f86 to f105, f166 to f177; WebKit the same pattern; `owner/04-dock-run-glide.png` | three clocks on one axis: the seat's `inline-size` transition (`run.css:526-535`), a glide aimed at an offset read before the widths move (`useDockRun.ts:143-170`), and the port's mandatory snap | glide once to the offset after the exchange, with the snap off for the glide's length | 11.1.1, after one read on `release/11.1.0`, which rebuilt the run's mark and keeps all three clocks |
| 5 | Sheet, detented | open; close and drag-to-dismiss; the second and later release | appears whole at its floor (57 % of the travel); stops 440 ms, then sheet and scrim are removed together; drops 166 px to the previous rung | `drag/rows/sheet-detent-drag` f7, f486 to f487, f672 to f728; `sheet-open-close` f896 to f951; WebKit all three; `owner/05-sheet-detent.png` | the `min-block-size` floor (`sheet/styles.css:534-544`) with the scrim floored at 0.28 (`sheet/motion.ts:50-52`); rule F (`detents/use.ts:121-130`) | below the floor carry the travel as a `translate`; run the scrim to 0 on the close leg; re-seat the spring at the dragged position with the release velocity | 11.1.1 |
| 6 | Popover, Menu, submenu, Select, Tooltip | reversed mid-open or reopened mid-close; the tooltip's enter; every exit's first frame | flashes to fully open; appears whole, two hints overlap on a hand-off; loses a fifth to a third of its opacity in one frame | `overlay/rows/r2/menu-interrupt` f11 to f12 (0.325 to 1.000); `tooltip-hover` f41; `popover-open-close` f115 to f116; WebKit O-1 and O-5; `owner/06-reveal-reversed.png` | rule E (`animations.css:157-162`); rule D (`reveal.css:136-161`); `--exit-curve: var(--ease-out)` spent in the keyframe's first 60 % (`motion-registers.css:148`) | drop the keyframe's `from`; key the enter on the tooltip's two states; an accelerating exit curve, and the 120 ms exits nearer 150 ms | 11.1.1 |
| 7 | Slider | a key step, Page, Home, End; a press or click on the track | lands whole (4.4 to 444 px) | `drag/rows/slider-keys` f56, f178, f239, f300; `slider-press` f8, f88; `owner/07-slider-track-press.png` | reka places the thumb and range by percentage and nothing tweens a step (`slider/styles.css:234`) | W-B.18 R-9: a step travels on `--spring-press`, a drag lands on its frame | W-B.18 (11.2.0) |
| 8 | Slider | the lens on press; a press on a disabled slider; the ring on a pointer press | appears whole; the lens, veil and squish answer a disabled control; the keyboard ring lands and stays | `drag/rows/slider-press` f8; `slider-drag-disabled` f8; `drag/strips/slider-drag-disabled…after-down.png` | rule D; `Slider.vue:81` takes the hold with no disabled check; `styles.css:262` keys the ring on `:has(:focus-visible)` | W-B.18 removes the lens, veil, carriers and deform and adds the keyboard mark. Add one cell to its gates: a press on a disabled slider changes nothing | W-B.18 (its 11.1.1 half) |
| 9 | SortableList | the drop | the parted rows jump a row (57 px) and glide back; the ghost's glass cuts and the label shows twice for about 360 ms | `drag/rows/sortable-carry.tip` f191 to f196; `owner/08-sortable-drop.png` | rule F (`drag.ts:163-167`); `ghost.ts:93-97` drops the glass at once and `styles.css:213-217` has no colour legs; the vacancy ends before the flight | reorder with the shifts cleared under `transition: none`; hold the vacancy until the ghost lands, then cross-fade | 11.1.1 |
| 10 | the page, on a theme change | light to dark and back | the ink and canvas cut while glass surfaces tween: white text on a cream card for three frames | `controls/rows/dmt-flip` f7 to f22, f159; `owner/10-theme-flip.png` | `composables/dark/useGlobalDark.ts:92-111` toggles the class with no transition of its own | one cross-fade of the page (`document.startViewTransition`, 200 to 250 ms) with `.no-transition` inside it | unplaced: owner question 1 |
| 11 | Select, at phone width | an option is picked | the opaque bottom sheet becomes a glass popover 291 px higher in one frame, then fades | `overlay/rows/select-coarse` f95 to f96; `owner/09-select-phone-pick.png` | rule F (`SelectContent.vue:60`) | latch the form while the content is present | 11.1.1 |
| 12 | Command palette | Escape | the list is removed and the plate drops from 435 to 51 px in the first frame of the close | `overlay/rows/r2/command-dialog` f605 to f606; WebKit f448; `overlay/strips/O3-palette-escape.png` | rule F (`CommandDialog.vue`) | hold the inner list open while the dialog exits | 11.1.1 |
| 13 | every component | reduced motion | CUT, in and out | section 2, rule B; each record's `*-rm` rows | rule B | W-B.17 R-9's authorized fades, with O-308's ruling made first; the dock by W-I.8 §1.6; the Slider by W-B.18 | W-B.17 (11.2.0) |
| 14 | Accordion, Collapsible | open or close reversed | restarts from the far end: flashes empty or full (16 to 57 px) | `disclosure/rows/acc-reverse` f14 to f15 (56.08 to 0), f382 to f383 (33.31 to 89.83) | rule E (`disclosure.css:1-23, 117-123`) | on the state flip, seek the new animation to the mirrored progress. W-R.1 §2.7 replaces the engine in 12.0.0 | 11.1.1 |
| 15 | Toaster | another toast arrives or leaves | the stack jumps 113 to 249 px | `overlay/rows/toast-flow` f128, f149, f303; WebKit and touch | a plain `v-for` in a flex column (`Toaster.vue:107-122`) | a measured move on the stack, and the leaving slot closed over the vaporize's last third | 11.1.1 |
| 16 | LabeledField; DataTable; Alert; Skeleton; Textarea; Metric; Badge; Command list | content arrives, leaves or changes size | lands whole and moves what is below it | `controls/rows/labeled-error` f7, f76; `data/rows/dt-state` f8 to f1830; `dt-filter`; `alert-mount` f7, f91; `skel-swap` f329; `controls/rows/textarea-grow`; `overlay/rows/r2/command-dialog` f139 | rule G; rule D | W-B.17: presence for the swaps; `follow()`, held behind its reading, for the size. Sites it does not yet list: the Alert's exit and room, the Skeleton swap, the Textarea, the Badge | W-B.17 (11.2.0, and held) |
| 17 | Card | the header condenses on scroll | header and description jump 16 px, the title's centre 10 px; rows paint through the title for 300 ms | `data/rows/card-condense` f8 to f9, f108; WebKit f4 to f5; `data/strips/card-condense-down.1440.png` | `card/scroll.css:97, 105` step padding and `font-size`; the backplate fades on `--duration-normal` (`:83`) | add the title's offset to the glide's keyframe; put the plate in at once | 11.1.1 |
| 18 | DockControl in a run | hover, press | lands whole in, cut out | `dock/rows/v11.0.1/seat-hover` f20, f266, f514; WebKit | rule C (`run.css:526-535`) | already made: `46ec8d30f` on `release/11.0.2`, after the tip this audit read. One re-read of `seat-hover` on `14dd41fea` closes it. The slider dock's half frame rate (dock F7) and the pager's neck across the rail (drag P-1) are cured on the tip as read | 11.0.2 |
| 19 | Button | press and hold | two clocks on `scale`: a 9 % squash still deepening at release, settled 250 ms late; the gleam 700 ms late | `controls/rows/button-press-primary` f7 to f97 | `useLiquidPress` writes `scale` each frame and `button/styles.css:105` transitions the same property | drop the CSS `scale` leg while script owns it, and the `::before` opacity leg under `:active`. W-R.1 deletes the press spring in 12.0.0 | 11.1.1 |
| 20 | Aurora; Blob | a preset or mood change | the whole stage changes colour in one frame (d 90.9; d 32.9) | `ambient/rows/amb2/aurora…` and `blob…`, phase `preset`; `ambient/strips/aurora…preset.presetA.png`, `blob…preset.presetA.png` | the palette uniforms are written on the next frame; the aurora's ground fade is under the canvas (`Aurora.vue:363`); the blob's mood tweens shape only (`useBlobMood.ts:107-113`) | interpolate the palette over the clock the drift or the shape already runs | 11.1.1 |
| 21 | Blob, fourier field | first sight | the first frame is drawn at full strength, then the canvas drops to 0 and fades in | `ambient/rows/rep/` (10 of 10 mounts); `ambient/strips/blob…mount.png` tiles 3 and 4 | rule D (`visibility.ts:256-269`) | start the canvas at opacity 0 when a reveal is armed | 11.1.1 |
| 22 | GlassDock | a morph reversed | the content's opacity jumps (1.00 to 0.51; 0.14 to 0.36); a hover reversal waits for the 60 ms intent and lands at 83 % | `dock/rows/v11.0.1/h-reverse-expand-*`, `h-reverse-fold-*` | two formulas (`layers.css:184-186, 269-283`) | W-I.8 §1.3: one function of the plate's progress, both ways | W-I.8 |
| 23 | GlassDock, rounded and card | expand, fold | flat-ended bar through the morph; bar to oval on the settle frame; an empty summary folds to a 16 px sliver | `dock/rows/v11.0.1/h-rounded-hover` f17 to f25, f677 to f678; `dock/strips/v11.0.1/h-rounded-hover…seg3.end.png` | the counter-scaled corner exists for the pill only (`run.css:786-793`); the rest rule applies on the settle frame (`morph.css:176-177`) | W-I.8's law (the plate is round at every frame) for every shape, and a floor for an empty summary | W-I.8 |
| 24 | ToggleGroup | select, deselect, hover, leave | lands whole | `controls/rows/toggle-single` f7, f402; `toggle-multiple` | rule C (`glass-capsule.css:94`; `toggle-group/styles.css:48-73` declares no list) | declare the merged list on the item, as `.button` does | 11.1.1 |
| 25 | every disclosure and select chevron | open, close | turns 6.5° backwards, then 38° past rest | `disclosure/rows/acc-single` f163 to f190; `overlay/rows/select-flow` f464 to f490 | rule J (`btn.css:82-84`) | `--spring-present` on that utility. W-B.17's `nudge` replaces the rules in 11.2.0 | 11.1.1 |
| 26 | SegmentedTabs; the dock's switcher | the pill while dragged | trails the grip by a median 11.7 px (72 px on a fling) and jumps at release (14 px; 88 px); the switcher 10 px | `drag/rows/tabs-drag` f26 to f132; `dock/rows/v11.0.1/layers-drag` f128 to f129 | the follow is a spring chasing the pointer (`useDragMorph.ts:183`) | write the offset 1:1 while held; give the spring only the release velocity | 11.1.1, with row 1 |
| 27 | ExpandableContainer | collapse; expand reversed; the scrim | the out has no frames; a reversal jumps over 1100 px; the scrim lands whole; the panel grows from the viewport's centre, not its card | `disclosure/rows/exp` f7 to f8, f127, f319; `exp-reverse` f16 to f17 | no transition on the scrim (`styles.css:6-17`); an enter animation only (`:41-45`) | the scrim's fade is a patch; the exit and the origin are W-B.17's new row 2 | 11.1.1 (scrim); unplaced (exit) |
| 28 | Dialog | after every close | an invisible plate takes clicks for about 160 ms; a click on the trigger does not reopen | `overlay/rows/dialog-open-close` f121 to f140; `tools/tail.mjs` | the spring's exit edge is 0.001 on position (`useSpringMount.ts`), and the scrim keeps pointer events | `pointer-events: none` on the scrim once the dialog is closed | 11.1.1 |
| 29 | Timeline | progress falls; a state completes; a mark is hovered | the fill clamps 101.6 px in one frame; the disc fills 60 ms before the front arrives and the state paints snap; the hover grow and fill snap | `disclosure/rows/tl-advance` f294, f197; `tl-hover` f7, f82 | `Timeline.vue:146-155` (a per-span clamp); `:578-627`, `:663-676` (no transition on the disc) | hold each span at the larger of its old and new progress until the travel settles; the disc's legs and the check are W-B.17's Timeline row | 11.1.1 (the fall); W-B.17 (the marks) |
| 30 | Popover, Menu, Select, Toast, Tooltip | enter and exit | the frost is missing for most of every fade | `overlay/rows/frost/`; `overlay/strips/O7-frost-held-frames.png` | the reveal fades the element that carries the `backdrop-filter` (`_shared/overlay/content.ts:71-76`) | the frost on its own layer with its own opacity curve. WebKit's held frames could not settle it; it needs a look at a live open in Safari first | unplaced |
| 31 | Blob | the lean after a fast leave | the body is cut flat on both sides by its own wrapper; without the clip it fills the frame | `ambient/strips/blob…pointer.leave.png` tiles 4 to 6, and the `cvvis` control | `content-visibility: auto` applies paint containment (`Blob.vue:341-342`) | move it to a host at least the canvas's size, or drop it; clamp the squash | 11.1.1 |
| 32 | Aurora, Blob, fourier field | resume after a tab change, a scroll away, or pause; pause and play | the field jumps on return (8.8 and 15 times the idle change); pause stops dead and play starts at full speed | `ambient/rows/amb2/`, phases `hidden`, `pause` | rule H | keep the elapsed time across a park; ramp a rate to 0 and back | 11.1.1 |
| 33 | Carousel | the snap after a drag; rest | the card's content steps backwards every other frame; rests 3.2 px off its card; the neighbour fade starts at the commit | `drag/rows/carousel-drag…390-coarse` f196 to f204 | `CarouselContent.vue:60-67` writes the lag from a per-scroll-event velocity and never returns it to 0 | derive the lag and the fade from position; zero the lag on `scrollend` | 11.1.1 |
| 34 | Chip | select; hover; remove | 21 % past rest on a punch curve, through a darker colour; nothing answers the hover; removed at full opacity | `controls/rows/chip-select` f8 to f44; `chip-hover`; `chip-remove` f171 to f172 | rule J (`glass-chip.css:30, 56`); rule C; no exit recipe | the growth and flood are W-R.1's deletions (12.0.0); the hover is W-B.17's plate; the exit is presence | W-B.17 (hover, exit); W-R.1 (the growth) |
| 35 | every focusable control | the focus ring | lands whole (from near-white on the bits) and cuts | `controls/rows/button-focus` f7, f404; `checkbox-focus` f8, f78; `input-hover-focus` f181; `overlay/strips/O16-dialog-escape.png` | rule I | W-B.17 R-12 | W-B.17 (11.2.0) |
| 36 | Sheet, side | open | 16 px past its edge, then 240 ms back | `overlay/rows/sheet-open-close` f41 to f73 | rule J (the panel preset, `sheet/motion.ts:15`) | the bloom or present preset; this is O-264 | 11.1.1 (booked) |
| 37 | Popover, Toast | enter | 350 ms, 150 to 230 ms of it sub-pixel creep | `overlay/rows/popover-open-close` f13 to f37 | rule J (`motion-registers.css:69-70`) | the popover on the menu register; the toast may stay longer, without the creep | 11.1.1 |
| 38 | Progress | marks as the fill passes; error; indeterminate on and off | marks dissolve ahead of the fill; the error recolour cuts; the band appears mid-sweep and the marks cut | `data/rows/prog-step` f86 to f113; `prog-error` f7; `prog-indet` f6, f461 | `value-marks.css:92` fades on the fill's clock; `Progress.vue:165-168`; `track-flow.css:68-80` | a delay per mark from its position; the error leg is W-B.17's; the band starts off stage at opacity 0 | 11.1.1 (marks, band); W-B.17 (error) |
| 39 | StatusDot | a state change; the active pulse | the silhouette swaps in one frame while the colour fades 200 ms; the ring pops in each cycle | `data/rows/pseudo/ps-dot-state` f1, f68, f269; `ps-dot-pulse` f242 | `StatusDot.vue:126-236, 273-283` | the silhouette's properties on the mark's transition; the pulse from opacity 0 | 11.1.1 |
| 40 | DataTable | sort; filter; rows added or removed | rows move 69 to 207 px in one frame; the glyph swaps | `data/rows/dt-sort` f9, f405; `dt-filter` f10, f490 | a `v-for` with no move (`DataTable.vue:438-470`) | a measured move on the rows; W-B.17's new row 3, with its sort glyph a pair | unplaced (rows); W-B.17 (glyph, states) |
| 41 | DataTable | table to cards as the container narrows | one squeezed, clipped frame, then a cut | `data/rows/dt-narrow` f7 to f8; `data/strips/dt-narrow.1440.png` | the projection is decided from a ResizeObserver, one frame late (`useDataTableResponsive.ts`) | decide it in the frame of the layout, or by a container query | 11.1.1 |
| 42 | InfiniteScroll | a page lands; the loading row | new rows land whole and push the leaving ring 567 px off screen; the row and its 52 px appear whole | `data/rows/inf-append` f10, f75 | `InfiniteScroll.vue:66-72` | hold the appended rows until the ring has left; an enter leg on the row | 11.1.1 |
| 43 | Surface | a tier change | blur and edge land whole; the fill tweens | `data/rows/surface-tier` f7, f73 | the ladder's rungs list two properties (`glass/ladder.css:65-156`) | one list per rung with the edge and the blur in it | 11.1.1 |
| 44 | MusicStaff | seal and unseal; loading progress; the breath's start | the transport jolts 4.4 px and a mid-strike note snaps; unseal cuts the ink and the barline; the ink lands 184 px a step; four rules step 0.06 in opacity | `ambient/rows/ms-seal` f7, f178 to f179, f348 to f349; `ms-replay` f65, f96 | `music-staff/styles.css:159-163, 212-216, 281-293`; `MusicStaff.vue:386` | scale the ink on the playhead's transition; start the settle from rest; let the strike's iteration finish; a leave for the seal; `backwards` on the breath | 11.1.1 |
| 45 | EasingPicker, EasingCurve | Preview, Replay, Cancel; the first keyboard nudge of a handle | the dot appears whole, teleports 357 px, is cut, and the label shifts the row 127 to 323 px; the curve is un-drawn in one frame before its wipe | `ambient/rows/ez-play` f7, f200, f259; `ez-sweep` f7 | `EasingCurve.vue:177`; `usePicker.ts:407-418`; `EasingPicker.vue:286-290, 582-588` | the dot and the transport pair are W-B.17's EasingPicker rows; guard a key nudge as a drag is guarded | W-B.17 (transport); 11.1.1 (the nudge) |
| 46 | DockBackgroundToggle; an active seat | the Play and Pause glyph; the seat's lens | swap in one frame | `dock/rows/v11.0.1/bg-toggle` f7, f250 | `DockBackgroundToggle.vue:72-73`; `.glass-capsule`'s filter from `none` | W-B.17's pair that stays; the lens is W-I.8's and W-R.1's | W-B.17; W-I.8 |
| 47 | Switch | a drag or a slide | the thumb does not follow; on touch a slide does nothing | `controls/rows/switch-drag` (1440 and 390) | reka's switch has no drag | a drag owner on the thumb, settling on the same spring | unplaced: owner question 3 |
| 48 | Avatar; Metric | the image arrives; loading ends; the value changes | cut; the unit jumps up to 112 px | `data/rows/avatar-arrive` f8; `metric-loading` f7; `metric-value` f6 | `AvatarImage.vue`; `metric/styles.css:121-134`; `Metric.vue:64-65` | W-B.17's presence rows; the digits and width are the countup's row | W-B.17 |
| 49 | HandMark | re-ink on hover; replay; mount | 65 % of the stroke vanishes in one frame and the nib swell snaps both ways; replay cuts the ink; the draw starts twice | `ambient/rows/hm-reink` f6 to f7, f33 to f34; `hm-replay` f7 | `HandMark.vue:290-298, 357-366` | answer the hover with the swell alone, tweened; draw once, after fonts | W-B.16, which the census says replaces HandMark; a patch only if it stays |
| 50 | SegmentedTabs; Deck | a glide or a turn reversed | the speed flips sign in one frame (+3.5 to −12.9 px; −30.65 to +12.51 px) | `drag/rows/tabs-click` f255, f425 to f427; `disclosure/rows/deck-reverse` f167 to f168 | a CSS transition retargets with no velocity (`segmented.css:159-166`, `turn.css:97-100`) | carry both on a spring in script, as the drag already is. W-B.17's new row 11 | unplaced |
| 51 | GlassDock | the settle frame; the arm frame | the persistent seat ticks back 1 to 2 px; the shadow swaps shape | `dock/rows/v11.0.1/h-pill-hover` f677 to f678, f611; `v-hover` f675 | the region's origin is solved against the reserved box (`dockMorphMeasure.ts`); `morph.css:161-167` | W-I.8 deletes both mechanisms (G-11: no `box-shadow` on the root) | W-I.8 |
| 52 | animated numbers (`useAnimatedNumber`) | a target change | 11 % in the first frame; a 540 ms creep of one unit at a time; the centred figure's x steps as digit widths change | `data/rows/countup-run` f7, f105 to f177, f34 | an exponential damper (`number/useAnimatedNumber.ts`) | a tween from rest for a target change; a reserved width | unplaced |
| 53 | fourier field | the pointer enters or leaves | the drawing freezes 3 to 4 frames; restarts at full rate in one | `ambient/strips/fourier-field…pointer.enter.png`, `…leave.png` | `useFourierField.ts:111-118` switches the scrub term in one frame | ramp engagement over about 100 ms | 11.1.1 |
| 54 | Dialog, Command palette | open; in against out | one 25 to 41 ms frame, then the spring lands the lost time in a step; the out is as long as the in | `overlay/rows/dialog-open-close` f10 to f11; `rows/trace/command-dialog` f6 to f9 | the compositor sets up the plate's and veil's layers in the first frame; one spring both ways | start the spring a frame after the plate is composited; a stiffer exit | 11.1.1 |
| 55 | Sheet, detented | the grip; every detent motion | the grip runs 273 to 523 ms behind; layout in every frame | `drag/rows/sheet-open-close`; `rows/trace/sheet-detent-drag` | `sheet/styles.css:284-286`; `block-size` is animated | delete the grip's transition. The layout is a design question no wave holds | 11.1.1 (grip) |
| 56 | PagerDots | rapid hops; the window slide | the squash restarts (5.8 px in a frame on the tip); staggered pips jump 6 to 12 px | `drag/rows/pager-hops.tip` f388, f409 | `PagerDots.vue:480-481` (a staggered delay under a retarget) | drop the delay on a retarget | 11.1.1 |
| 57 | Configurator | a layer opens or closes; a preset tile is picked | a hard clip edge with no fade; the ring and cast swap in one frame | `disclosure/rows/cfg-layer` f7 to f37; `cfg-preset` f278 | `ConfiguratorLayer.vue:195-196, 238-240`; `configurator/styles.css:511-517` | an opacity leg on the inner wrapper; a resting shadow list of the same length | 11.1.1 |
| 58 | Checkbox, Switch; Button, text; Label | disabled; indeterminate to checked; the underline; the annotation | the tick's ink cuts while the face fades; the glyph swaps; the underline is discrete; the label resizes | `controls/rows/bits-disabled` f7; `checkbox-indeterminate` f8; `button-hover-text` f7; `label-annotation` | `control-bit.css:356-358`; `Checkbox.vue:48-49`; `button/styles.css:206`; `Label.vue:67` | `color` in the mark's list is a patch; the glyph pair and the underline are W-B.17's; the label is its recorded row 9 | 11.1.1 (tick); W-B.17 |
| 59 | SortableList | row hover; keyboard lift; Escape during a pointer carry | the fill lands whole; the corners land whole; Escape does nothing | `drag/rows/sortable-carry` f7, f24; `sortable-keys.tip` f44; `sortable-cancel` f105 | `sortable-list/styles.css:73, 130-145`; the key handler is on the row (`drag.ts:603`) | two legs in two lists; the cancel is a behaviour gap for a ruling | 11.1.1, with row 9 |
| 60 | Collapsible | open, close | everything below jumps 12 px on the first and last frame | `disclosure/rows/col` f7, f111 to f112 | a gap on a root whose content unmounts (the story; the library allows it) | the Accordion's inner body wrapper on `CollapsibleContent`; a README line | 11.1.1 |
| 61 | SegmentedTabs; Card; FadingScroll; Aurora | label against pill; hover in against out; an edge on a large step; mount | small mismatches: the label 115 to 174 ms early; 38 ms in against 128 out; the feather whole on a step over 16 px; every mount brightens by 10 % | `drag/rows/tabs-click`; `data/rows/card-option`; `fade-scroll` f9; `ambient/rows/amb/aurora` | section 2's table | one token or one delay each | 11.1.1 |

## 5. Components read and found clean

Clean means the recorder drove the motion, read its frames and found no fault beyond a shared rule already named (the spring tail, reduced motion).

- **Slider:** the drag itself on all ten variants at 1440 and 390 (1:1, never against the pointer); the lens's exit.
- **SegmentedTabs:** the click glide apart from its last frame; keys and rapid keys; uneven widths; the underline mark; a drag released back onto its own tab.
- **Sheet:** the side sheet in and out by every close path, and its reversals; the detent drag's follow; the first release.
- **SortableList:** pick-up, carry and tilt.
- **Carousel:** touch drag, fling and snap travel; member scale.
- **PagerDots on the tip:** hops of 1, 3 and 7; next-dot and edge-dot clicks.
- **GlassDock:** the pill plate's start and end in every collapse path, both orientations, 1440 and 390, with a round corner on every frame; the plate's turn on reversal at 30, 50 and 80 %; the seat exchange between two seats in view; the press squish; the switcher's travel by key; menus and selects opened from a seat, and a menu holding the dock open.
- **Dialog:** open and close by every path and at every reversal point; the rebuff; the close button's plate.
- **Menu, Select, submenu:** the enter; the row highlight in light and dark.
- **Popover:** the side slides. **Toast:** the vaporize; the swipe's follow after its threshold; the cancel.
- **Button:** hover gleam and fill; disabled ink; a quick press released at 40, 80 and 160 ms.
- **Checkbox, Radio, Switch:** toggle both ways, hover, and reversal at 30, 50 and 80 %. As a family these are the best-made controls in the library: fill and mark on the same frames, out mirrors in.
- **Input:** hover and invalid. **NumberField:** steps and the hold cadence. **DarkModeToggle:** hover; the icon's turn apart from its last frame.
- **Accordion:** the swap and the multiple case (the item below never steps); the trigger hover. **Typewriter:** the reserve holds the box. **Deck:** the turn forward and back, and the flat push at 390. **Configurator:** a reveal reversed at 50 %.
- **Card:** hover out, the selection cross-fade, the press. **DataTable:** row hover and selection. **Table:** no motion, as designed.
- **Progress:** travel and its reversals; the completion glow; the liquid variant; a value fed every frame. **ScrollProgressRim:** travel and reversal. **Skeleton:** breathe and shimmer.
- **Alert:** the enter's four channels on one clock. **StatusDot:** the colour cross-fade. **InfiniteScroll:** the ring's fission.
- **Aurora:** idle drift, the cursor field, the mount cross-fade, resize, parking. **Blob:** idle, hover shadow, click, poke. **Constellation:** everything read (idle, warp, gravity well, resize, resume with no jump). **Fourier field:** idle, the backward hold, resume.
- **MusicStaff:** the draws, the note land, the reel and strike loops, the bead, the playhead's turn. **HandMark:** the draw clock, the ink settle, the ink-lag. **Easing:** the wipe-in, the handle press and drag.

Dropped frames are rare. Inside a motion the records found two that repeat: the dialog's first frame (row 54) and the v11.0.1 slider dock (row 18, cured on the tip). Every canvas field held 120 Hz with no drop over 5 s at both widths.

## 6. Faults with no home yet

The brief asks each fault to be placed in a patch or in the wave that owns it. These have neither. W-B.17's "new rows" list names most of them already; the audit adds the frames.

| Fault | Row | What it needs |
|---|---|---|
| The theme flip | 10 | the owner's ruling (question 1), then one small design |
| The frost against the plate's opacity | 30 | a look in Safari, then a design in the material's wave |
| The ExpandableContainer's exit and origin | 27 | W-B.17 new row 2 |
| List members that make room: DataTable rows | 40 | W-B.17 new row 3 (the Toaster's half is small enough for 11.1.1) |
| A switch that follows a drag | 47 | the owner's answer (question 3) |
| A turn that keeps its speed: tabs glide, deck | 50 | W-B.17 new row 11 |
| The countup's start, tail and width | 52 | a number tween; no wave |
| The sheet's layout in every frame | 55 | a transform-driven sheet; no wave |
| A panel recipe for tabs | drag T-6, disclosure D-13 | a ruling on whether SegmentedTabs owes one; `<Presence swap>` is the piece if it does |

11.1.1 as placed above is about three dozen cures. They are small and none changes an API, but together they are more than a patch usually carries; the order in `INBOUND-ROWS.md` puts the shared rules first so that a split, if the orchestrator wants one, falls after them.

## 7. What the audit could not reach

**Engines and machines.**

- Shipping Safari was not read. Every WebKit reading is Playwright's build.
- That build aborted on launch for the whole controls family and the whole disclosure family, and on the phone select page. So rows 10, 14, 16 (the field line and the Button), 24 and 27 stand on Chromium alone, and so does row 11.
- WebKit rows cannot see canvas pixels; the aurora and blob palette cuts were not run there. The causes are uniform writes and do not depend on the engine.
- Some runs were taken on a loaded machine (the guard waited at a load of 44; the data family's WebKit runs were at 39 to 182). The three unconfirmed long frames in section 3 come from those.
- No run throttled the CPU, so no frame-time budget was read. A phone was not in the loop: touch is CDP touch at 390.

**Trees.**

- `release/11.0.2` as it stands (`14dd41fea`) was not read; the tip is two source commits behind it. Row 18 needs the one re-read.
- `release/11.1.0` was not read at all. It rebuilt the run's mark and the dock's corner; rows 4 and 23 should be read there before either is built.
- The demo's own routes mount nothing in the harness builds (the wrapper tree-shook the demo entry; dock record, "Pages"). Every component was read on its story or a hand-written page, never inside the demo shell with its dock and aurora live. The harness README still says the routes serve.

**Consumers' compositions.**

- color's reading of a square-cornered block mid-collapse on a pill (C-02) and fourier's of a collapsed seal with uneven corners were not reproduced on glass's own pill, which is round on every frame. They were measured on 11.0.1 at those sites and are probably the booked row overflow; nobody has read the same site on 11.0.2.
- daraksha's teleported controls (O-307), its Popover that outlived the fold, and its content outside the closing plate (O-288) need daraksha's page; glass's own pages do not show them.
- The radial light on a hovered Card that fourier reports was not measured; the data record read the card's fill only.

**Motions not driven.**

- The dock: the run dragged by touch (synthetic touch starts no compositor scroll), the CTA seat, the search morph, the grasp on a slider held inside a dock, a pull-to-switch fling that lands a new face, the trigger's own chevron.
- Overlays: a popover or tooltip flipping sides, menu checkbox and radio picks, a dialog whose content changes size outside the palette, the select list's scroll, a tooltip on touch (reka opens none).
- Controls: NumberField's key repeat, the Label's disabled change, dark cells beyond the Button hovers.
- Drag family: the slider's marks changing, the tabs' phone select, the carousel by mouse and by dot click, the pager's pseudo-element hovers and edge pips, a cross-list sortable drop.
- Disclosure: deck build reveals, the typewriter's blink (its class never appeared in 2.2 s holds, which may itself be a fault), the configurator's shimmer and expand host, the tabs panel at 390.
- Ambient: the aurora's light orbit, the constellation's pinned and recession cards and its wander, the fourier flick, the staff's reversal at 30 and 80 %.

**Strips.** No strip holds the frame of row 1's jump (f204 to f205); `owner/01` is built from two runs of the same scenario and says so. The toggle-group's strip is one tile. In both cases the rows are the evidence.
