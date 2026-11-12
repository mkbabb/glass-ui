# W-B.18: the Slider (one geometry law, and the expanded view)

The source is the owner, four times, verbatim (INBOUND O-254, O-280, O-283, O-273):

- 2026-11-11: "sliders likely need a expanded granular view re-write, with popup animation that enlarges the slider to interact with it, animating in and out, and shrinking when not interacting with it."
- 2026-11-12 09:40: "the granular tap to refine view with glass-ui needs to be more rounded, well-defined, and re-designed." The fill should be "the color of the name text, not so grayed out".
- 2026-11-12 11:50: "the granular UI sldier from glass-ui is not rounded properly--study the chatgpt app's screenshots and ios27 items for more information. Think of it again from first principles in glass-ui."
- 2026-11-12 12:05: "the glass-ui slider thumb should be more filled to the slider, taking up the full height".

The wave also carries O-236 (a playing Slider writes layout every frame; the cure keeps reka's hidden form input) and leaves room for O-253 (detents).

One seat wrote this text: the design seat, claude-fable-5-2, 2026-11-12. It ran nothing. Every number about today's Slider and about the references is quoted from the measure (`../design/slider/MEASURE.md`, claude-opus-5-5, master at `2353cb021`, 408 cells in headless Chromium and in Playwright WebKit, which agree to 0.3 px). Every number about the new design is arithmetic from the tokens and is marked *derived*. Nothing here has been painted yet; the prototype seat paints it and the gates below are what it reads.

Release, for `INDEX.md`'s column: **it splits three ways.** The geometry cure changes no API and no DOM and ships as a patch (**11.1.1**). The transform-driven mechanism and the expanded view are additive and ship in **11.2.0**, the expanded view behind one opt-in prop. The loupe, the focus veil and the grasp carriers leave the Slider in **12.0.0**, where the expanded view becomes the default.

## What a slider is

A slider is a line with two ends and a point on it. The control draws the line as a band of one height, and every curve on it is a circle of that height whose centre is on the line: the two ends of the track, the end of the fill, and the thumb. If the thumb's centre travels exactly from one end circle's centre to the other, and the fill ends on the thumb's centre, then every curve shares a centre with the one it sits in, at every value. Nothing else has to be aligned.

Today's scrubber breaks this in one place: the thumb is 4 px smaller than the band (8 in 12, 16 in 20, 24 in 28) and is pushed against the fill's tip, so its centre is 2 px off the fill's at every size and 2 px off the track's at 0 and 100 (MEASURE §1.2). Every reference the measure read avoids a small thumb pushed to one side: Apple and the native range make the knob larger than the band, and ChatGPT nests thumb, fill and shell on one centre line with a constant inset (MEASURE §2).

## Rulings

- **R-1: one height.** `--slider-track-height` (*H*: 12, 20, 28 px at sm, md, lg) is the height of the track, of the fill and of the thumb. The scrubber's thumb is a disc of diameter *H*; the owner fixed this point on 2026-11-12 12:05. The scrubber stops reading `--slider-thumb-size`, so the `min(thumb, track)` rule goes.
- **R-2: one radius, derived.** `--slider-radius: calc(var(--slider-track-height) / 2)`, declared once on the root and read by the track, the fill and the thumb. `--radius-pill` leaves the Slider: it is 16 px, so it cannot draw a capsule above 32 px (the lg spectrum track, 36 px, is a rounded rectangle today), and it reshapes any box narrower than it is tall (the fill's cap runs 4, 5.57, 6 px over the first few percent at sm).
- **R-3: the thumb's centre travels the line between the end centres.** With a track of length *W*, the centre is at `H/2 + p·(W − H)` for a value fraction *p*. At 0 it is the start cap's centre and at 100 the end cap's.

  | size | *H* | centre at 0 | centre at 100 | travel |
  |---|---|---|---|---|
  | sm | 12 | 6 | *W* − 6 | *W* − 12 |
  | md | 20 | 10 | *W* − 10 | *W* − 20 |
  | lg | 28 | 14 | *W* − 14 | *W* − 28 |

  This is reka's `contain` alignment for a thumb of width *H*, so the pointer mapping does not change. The alternative, a centre that travels `0 … W`, puts half the thumb outside the track at both ends and is not taken.
- **R-4: the fill ends as the thumb.** The fill runs from the track's start to the thumb's far edge, `H + p·(W − H)` long, and its end cap is a circle of radius *H*/2 centred on the thumb's centre. The thumb is that cap. At 0 the fill is one circle, the thumb, sitting in the track's start cap. The fill is never shorter than *H*, so its cap never reshapes. A fill that stops at the thumb's centre with a square end was considered and not taken: it needs the thumb to hide the end, and a translucent or ring thumb would show it.
- **R-5: the fill's end is the thumb in every state.** The press deform (`scale(1.02, 0.94)`), the velocity smear and the overshoot on release are deleted. Measured, they make the held fill 0.94 of the track's height, run it 6.4 px past the track's end at 100 and leave the thumb 5 px behind it (MEASURE §1.2, item 5). `restraint.md` already rules out a press indent and overshoot on a control. What is left moving on press is the colour (R-7) and, from 11.2.0, the grow (R-10).
- **R-6: both orientations, inverted and RTL, by the same sentence.** Vertical swaps the axes: the centre travels `H/2 + p·(L − H)` from the bottom of a track of length *L*, and the fill grows up to it. Inverted and RTL mirror the start. No orientation has a number of its own.
- **R-7: one ink at two strengths, and a light knob.**
  - The fill's default colour is the control's text colour, `currentColor`, at full strength. A consumer's `--slider-range-bg` still wins. Today's dark default is the foreground at 22 %, painted at alpha 0.19: the grey the owner named.
  - The track's default ground is the same ink at a low strength (16 %, to be tuned by the prototype's capture, OQ-5). Today's ground is `--muted` at 50 % alpha, which takes the colour of a dock plate and loses its edge. `--glass-slider-track-background` still wins.
  - Hover, keyboard focus and hold deepen the ink; that tween exists and stays.
  - The track and the fill carry no rim, no inset line and no shadow. The fill's lit top line, its lighter bottom line and the groove's inset line are what make a 12 px fill read taller than a 12 px track (MEASURE §1.4: 12.4 against 11.2 on the owner's frame).
  - The thumb's colour is `--slider-thumb-bg` (O-273). Its default is light in both themes: `--card` in light, `--foreground` in dark. Today's dark default, `--card`, is darker than the fill it sits in and reads as a hole; at full height a dark thumb on a dark track would read as a bite out of the fill. The thumb keeps the one shadow it has (`--shadow-sm`), which is what separates it from a fill of its own colour.
- **R-8: the spectrum takes the same law.** Its handle becomes a ring of diameter *H* (the 2 px border it has today, a clear centre that shows the ramp), centred as in R-3. Today it is a 0.5 *H* lozenge that sits flush with the track's end, so its corners stand outside the round end (MEASURE §1.3). The spectrum's taller track (1.5 × `--slider-thumb-size`: 12, 24, 36 px) stays, and `--slider-thumb-size` keeps that one job. This changes a look no row reported, so it ships in 11.2.0 and the owner sees it by capture first (OQ-2).
- **R-9: the mechanism is two transforms and one number** (11.2.0; O-236).
  - The root carries the value as `--slider-p` (and `--slider-p0`, the lower thumb, 0 when there is one thumb), written by the template from the model value.
  - The root is a size container on its travel axis. The thumb sits at the start and moves by `translate: calc(var(--slider-p) * (100cqi − H))` (`cqb` when vertical).
  - The fill is a capsule as long as the track, moved by `translate: calc((var(--slider-p) − 1) * (100% − H))` and clipped by the track's own round end. Its end cap lands at `W − H/2 − (1 − p)(W − H) = H/2 + p·(W − H)`, the thumb's centre.
  - With two thumbs the lane (the element that holds the fill today) moves by `p0·(W − H)` and clips the fill's start to a cap on the lower thumb's centre; the fill moves by `(p − p0 − 1)(W − H)` inside it.
  - reka keeps the root (pointer, keys, the hidden form input), the track and the thumb (role, focus, the aria values). reka writes the thumb's position as an inline `left`, `right`, `top` or `bottom`; one rule holds those four at the start with `!important`, so the value never reaches layout. reka's own inline `transform` on the thumb stays; ours ride `translate` and `scale`. reka's `SliderRange` is replaced by a plain span of the same class, because all it does is write two layout offsets.
  - A value the pointer drags, or one that arrives from outside (a playing scrubber), lands on the frame it arrives. A value the slider changes in one step (an arrow, Page, Home or End key; a press on the track away from the thumb) travels on `--spring-press` over `--spring-press-duration`. The component marks those two events on the root and clears the mark when the travel ends.
- **R-10: the expanded view is a shell that grows out of the track, and a thumb that grows in it.**
  - The track and the fill do not change. That is Apple's own rule ("the knob transforms into Liquid Glass during interaction"; track and fill measured unchanged, MEASURE §2.1), and it keeps R-1 to R-6 and reka's pointer mapping true while expanded.
  - **The shell** is one capsule behind the track, outset from it by `--slider-expand-outset` (*g*, default 0.5rem) on every side: height *H* + 2*g*, radius `--slider-radius` + *g*. An outset capsule has the track's own cap centres, so its ends are concentric with the track's.
  - **The thumb** grows to *H* + *g* about its own centre, a uniform scale. It sits in the shell with *g*/2 clear on every side, at every value, 0 and 100 included: shell, thumb and band nested on one centre line, which is the ChatGPT construction (its thumb is inset 4 on every side; *g*/2 is 4 px).

    | size | band *H* | shell *H* + 2*g* | thumb grown *H* + *g* | thumb scale | shell's start scale *H* / (*H* + 2*g*) |
    |---|---|---|---|---|---|
    | sm | 12 | 28 | 20 | 1.67 | 0.43 |
    | md | 20 | 36 | 28 | 1.40 | 0.56 |
    | lg | 28 | 44 | 36 | 1.29 | 0.64 |

    (*derived*. Apple's held knob measures 1.34 to 1.48 of its rest size.)
  - **The surface.** The shell is `--card`, a hairline `--border`, and one shadow (`--shadow-md`). No blur (a slider's usual home is a blurred plate, and `restraint.md` allows no blur inside a blur), no rim, no gradient.
  - **The readout** is a small capsule above the thumb that rides it, and it exists only when the consumer has given `valueText`. The Slider cannot know a unit, and a bare number beside a field that already shows it is a restated label. It shows while the value is being changed (held, or focused from the keyboard), not on hover. It is `aria-hidden`: the thumb already carries the same string as `aria-valuetext`. Same surface as the shell, no shadow, tabular figures, its radius half its own height. Its centre sits *H*/2 + *g* + *g*/2 + half its height above the line (about 34 px at md, *derived*), which is where the loupe sits today. On a vertical slider it sits beside the thumb, on the inline-end side.
  - **Ticks** are the consumer's `marks`, already drawn in the track; the expanded view adds none. Detents are O-253's.
  - **Finer travel is not delivered.** A longer track would move the value point out from under a finger that is already down: reka maps the pointer against the track's box as it was at the press, so any scale along the travel breaks the registration between finger and thumb. The expanded view makes the control bigger to see and to hold and says the value; it does not change the gain (OQ-4).
- **R-11: how it grows and shrinks.**
  - It grows on press, on keyboard focus, and on hover after a dwell of `--spring-press-duration` (fine pointers only, under `(hover: hover)`, so a tap leaves no hover behind). It shrinks when none of the three holds. There is no timer: the states are CSS selectors, and the shell is always in the tree, so both tweens start from the true rest values. Today's loupe mounts already engaged, which is why its entry is a cut (MEASURE §1.5).
  - The shell goes from `scale` *H* / (*H* + 2*g*) and `opacity` 0 to 1 and 1. At the start scale it is a capsule exactly as thick as the track. Its origin is the thumb's centre, so it lies inside the track at every value: the scaled start edge is at `c − (c + g)·H/(H + 2g)`, which is 0 when `c = H/2` and positive otherwise (and the same at the far end). It comes out of the band where the hand is and goes back into it there.
  - The thumb goes from `scale` 1 to (*H* + *g*) / *H*. The readout grows from the thumb's centre with its opacity.
  - Spatial legs ride `--spring-present` over `--spring-present-duration` (no overshoot; 0.2 s), and `--spring-present-exit-duration` on the way back. Opacity rides `--ease-standard` on the same clocks. Only `scale`, `translate` and `opacity` animate.
  - The root's box never changes, so no neighbour moves. The root is raised one step for exactly as long as the shell is off its rest, so the shell overlaps a neighbour by *g* and is never under one.
  - A press no longer counts as keyboard focus. reka focuses the thumb from script on a press, and both engines match that as `:focus-visible`, so today a mouse press paints the keyboard ring and it stays (MEASURE §1.6). The component marks focus that arrives outside a pointer press, and the ring and the keyboard grow read that mark. Without this the view would stay open after the pointer left. With `expand` on, the focus indicator is the shell's outline.
  - **Reduced motion:** nothing scales. The shell and the readout fade in at full size and fade out, on `--ease-standard`; the thumb keeps its rest size. A fade, never a cut.
  - **Touch:** the press grows it at once and the release shrinks it. The coarse target floor on the root stays. **Keyboard:** Tab grows it, the arrows move the thumb as in R-9, and leaving shrinks it.
  - **Forced colours:** the shell and the readout are `Canvas` with a `CanvasText` border, the fill `Highlight`, the thumb `Canvas` with a `CanvasText` border, and the focused control shows a real outline (O-267).
- **R-12: the readout leaves the plate; nothing else does.** A glass surface clips its descendants (`contain: paint` in `material.css`; the dock shell adds `overflow: clip`). The shell overhangs the root by *g*, which sits inside a plate's padding. The readout stands about 40 px above the line and would be cut. So the readout, and only the readout, is shown in the top layer (`popover="manual"`), anchored to the root by CSS anchor positioning (the Sheet already uses it) and moved along by the same `--slider-p`. The component shows it when a hold or a keyboard focus begins and hides it on the exit tween's `transitionend`. No copy of the track, no teleport, no measured rectangle, no scroll listener. Whether this holds in WebKit under a live pointer capture is the prototype's reading (OQ-3).
- **R-13: `expand` is opt-in in 11.2.0 and the default in 12.0.0.** With `expand` on, the Slider mounts no focus veil, no grasp carriers and no loupe. The loupe is not cured in the meantime; it is replaced.

**Counted.** DOM nodes under one Slider (marks and the form input aside):

| | at rest | held |
|---|---|---|
| today | 5 (root, track, lane, fill, thumb) | 12 (+ veil 1, loupe 4, carriers 2) |
| 11.1.1 | 5 | 12 |
| 11.2.0, `expand` off | 5 | 12 |
| 11.2.0, `expand` on | 6 (+ shell) | 6 |
| the same with `valueText` | 7 (+ readout) | 7 |

Each one's job: the root is reka's and holds the box; the track is the ground and the fill's clip; the lane is the fill's window when there are two thumbs; the fill; the thumb is reka's and holds role and focus; the shell is in the tree at rest so that it can tween from rest; the readout is the one thing that must be read above a finger. Shadows: two (thumb, shell). Blurs: none. Gradients: none but a consumer's ramp. Animated properties: three.

## Scope

**11.1.1, the geometry cure.** `src/components/slider/styles.css` only, and the comment over the size tokens in `tokens/sizing.css`. No prop, no token name, no DOM node changes.

1. The scrubber's thumb reads `--slider-track-height` on both axes (R-1). The lane's cut follows, since it already reads the thumb's size.
2. `--slider-radius` is declared and read by the track, the fill, the thumb and the loupe's clone (R-2). This also makes the lg spectrum track a capsule.
3. The press deform, the smear and the release overshoot are deleted, horizontal and vertical, with their two reduced-motion arms (R-5).
4. Paint (R-7): the track's default ground; no rim or inset line on the track and the fill; the dark fill default becomes `currentColor`; `--slider-thumb-bg` defaults to `--foreground` in dark.

A consumer who set `--slider-thumb-size-{sm,md,lg}` to resize a scrubber's thumb sees no effect after the patch; the rung to set is `--slider-track-height-{sm,md,lg}`. The CHANGELOG says so.

**11.2.0, additive.**

| | |
|---|---|
| `expand` | boolean prop, default `false`. Turns on R-10 to R-12. |
| `--slider-expand-outset` | default `0.5rem`. The shell's outset; the thumb grows by the same length. |
| `valueText` | existing prop; with `expand` it is also the readout's text. |

Also in 11.2.0, with no new name: the transform mechanism (R-9); the step travel; the keyboard-focus mark (R-11); the spectrum ring (R-8); the light theme's fill default becomes `currentColor`, after the owner's read (OQ-1).

**Deleted.**

- In 11.1.1: the `min(thumb, track)` rule; `--radius-pill` in the Slider; the three weight-train rules and their reduced-motion arms; the dark `--slider-fill-ink` mix at 22 %; the fill's rim and the groove's inset line on the Slider.
- In 11.2.0: reka's `SliderRange`; the spectrum's lozenge sizes, its 0.4 radius and its `corner-shape` block; `:has(:focus-visible)` as the ring's predicate; the light `--glass-capsule-warm` default (OQ-1).
- In 12.0.0: the loupe (its template, about 145 lines of CSS, `writeLoupeGeometry`, `writeLoupeValue`); the focus veil's mount, `writeVeilCentre` and the window scroll listener; the grasp carriers and their `transitionend` close path; the inline z-index raise; `useDragVelocity` in the Slider. `motion` then has nothing left to drive on the Slider and leaves with them. W-R.1 owns the grasp and veil registers themselves; this wave only stops the Slider mounting them.

**Not in this wave.**

- A change of gain or a longer track while expanded (R-10, OQ-4).
- Haptic detents (O-253).
- The ramp under a spectrum thumb at the ends: the centre stops *H*/2 short of each end, so the colour under it at 0 is the ramp's colour *H*/2 in. Today's lozenge stops *H*/4 short. Insetting a consumer's ramp needs a change to how the track paints it.
- A readout that stays inside the shell's span at the ends; it is centred on the thumb and may overhang by a few pixels.
- `touch-action` on the root, and real Safari (the measure and every gate below read Playwright WebKit).

## Gates

Each gate is read once RED and once GREEN, with its bite read once. RED for the 11.1.1 gates is the measure's own table. Browser cells reuse the measure's harness (`../design/slider/measure/harness/`, with the daraksha repro), at 390 coarse and 1440 fine, light and dark, one browser per run, a new context per cell, every run through `guarded` and every WebKit run through `guarded --exclusive webkit`. A cap's centre is defined as in MEASURE §1.2.

**11.1.1.**

- **G-CONCENTRIC, Chromium and WebKit.** For sm, md and lg, horizontal and vertical, plus one inverted and one RTL cell, at values 0, 1, 5, 25, 50, 95, 99 and 100, at rest, on hover, under keyboard focus and held: the thumb's centre is within 0.5 px of the fill's end-cap centre on both axes, and at 0 and 100 within 0.5 px of the track's cap centre. Twenty frames sampled inside a pointer drag hold the same bound. RED: 2 px at rest and up to 5.24 px held. Bite: restoring `min(thumb, track)`.
- **G-HEIGHT, Chromium and WebKit, and one grep.** In every cell above the fill's cross size, the thumb's diameter and the track's cross size are equal within 0.1 px, held included (RED: 0.94 held), and the computed radius of each is half that size. `git grep -n "radius-pill" -- src/components/slider` prints nothing, and no scrubber rule reads `--slider-thumb-size`. Bite: one `border-radius: var(--radius-pill)`.
- **G-READ, Chromium and WebKit.** On the daraksha repro (sm, dark, on a dock plate, no `--slider-range-bg`), a column scan of the crop gives the painted fill band and the painted track band the same height within 0.5 CSS px (RED: 12.4 against 11.2), and the track differs from the plate beside it. The fill's painted colour is the root's computed `color`; the thumb is lighter than the track in both themes. Bite: the rim back on the fill.

**11.2.0.**

- **G-CONCENTRIC again**, on the transform mechanism, with the spectrum's sizes added, and with `expand` on at rest and fully grown: the shell's cap centres are within 0.5 px of the track's, and the grown thumb's centre within 0.5 px of both at 0 and 100.
- **G-TWEEN, Chromium and WebKit.** For each way in (press, keyboard focus, hover after the dwell) and each way out (release, blur, leave), a per-frame sample of the computed `scale` and `opacity` of the shell, the thumb and the readout: the first frame equals the rest state, the last equals the end state, the values are monotone, and no step exceeds what the curve allows. A release in mid-grow turns back from the value it had. The step travel of R-9 reads the same way on `translate`. RED: the loupe's first painted frame is `1 / 1`. Bite: mounting the shell with `v-if`.
- **G-COST, Chromium by trace; WebKit by the animation list.** Over a grow, a shrink, a 60-frame drag and 60 frames of a value driven from outside: 0 `Layout` events inside the frames (Chromium), and in both engines `document.getAnimations()` shows only `scale`, `translate` and `opacity`. RED: K12's layout per frame. Bite: removing the `!important` hold on the thumb's inline offset.
- **G-NODES, vitest and one browser cell.** The counts in the table above, exactly. Nothing is appended to `<body>`. Computed `box-shadow` is other than `none` on the thumb and the shell only; `backdrop-filter` is `none` on every node. Bite: a second surface under the readout.
- **G-FORM, vitest.** A named Slider in a form submits its value after a drag and after a key press; the hidden input is present (O-236). Bite: K12's build.
- **G-BOX, Chromium and WebKit.** The root's and the track's boxes equal master's within 0.1 px as a block, as a flex-row item and inside a dock plate, at both widths, with `expand` off and on, at rest and grown. A neighbour's box does not change during a grow. Bite: growing by `height`.
- **G-LIFT, Chromium and WebKit.** Inside a `contain: paint` plate the readout paints whole (its pixel count within 2 % of an unclipped twin), its centre is within 0.5 px of the thumb's on the travel axis at the sampled values, it stays attached through a page scroll during a hold, and the pointer capture and the drag survive its showing. Bite: the readout as a plain child is cut by the plate.
- **G-TOUCH, Chromium and WebKit at 390 coarse.** A press grows with no dwell; the pointer stays within 1 px of its grab point on the thumb through the drag; one second after the release the shell is at rest (no hover left behind). A mouse press shows no keyboard ring at any time. Bite: the hover rule outside `(hover: hover)`.
- **G-STILL, Chromium and WebKit; forced colours in Chromium only** (WebKit's emulation leaves the colours unforced). Reduced motion: no `scale` or `translate` animates, opacity does, first and last frames equal the rest states. Forced colours: the shell, the thumb and the readout each compute a `CanvasText` border, the fill `Highlight`, and the focused control a real outline.
- The Slider's existing unit and e2e specs pass unchanged, apart from the lines that pin the deleted press deform.

That is three gates for the patch and nine for the minor.

## Consumer half

Each consumer changes at its own repin. glass tells atlas of every default here at booking and at publish.

- **daraksha** (Name transport, `src/name/NameDock.vue`, on 11.0.1). After 11.1.1 the fill takes the transport's text colour with nothing set; its `--slider-range-bg` in `gilt.css` may stay or go. At 11.2.0 it sets `expand` and gives `valueText` (the time).
- **keyframes** (the scrubber and the controls). Its purple `--slider-range-bg` is untouched; the thumb becomes a light disc of the full height. A scrubber that plays stops writing layout at 11.2.0.
- **color** (the L / C / h / α console). The spectrum handle becomes a ring at 11.2.0. The console shows each value in a field beside the slider, so it gives no `valueText` and gets the shell without a readout.
- **fourier.** The patch only, unless it opts in.
- Any consumer that sized a scrubber thumb through `--slider-thumb-size-*` moves to `--slider-track-height-*`.

## Open questions

- **OQ-1 (owner, by capture).** In the light theme the default fill is a warm capsule today, which is not the text colour and is not grey. Default: `currentColor` in both themes, one rule, shipped for light in 11.2.0 after he has seen the capture; the patch changes dark only.
- **OQ-2 (owner, by capture).** The spectrum handle as a ring of the track's height (R-8), against today's lozenge. Default: the ring.
- **OQ-3 (prototype, by measurement; G-LIFT decides).** The readout in the top layer, anchored in CSS, shown during a live pointer capture. If WebKit drops the capture or the anchor, the readout is teleported and placed from one rectangle read at the press, as the loupe is today. The form of the view does not change either way.
- **OQ-4 (design, later).** Finer travel. It needs the Slider to own the pointer-to-value mapping, which reka does not expose. Default: not built; the prototype records how a 155 px sm scrubber feels at 1:1 and the owner says whether that is enough.
- **OQ-5 (prototype, by capture).** Two numbers are first guesses: the track's strength (16 %) and the outset (0.5rem). G-READ bounds the first; the owner's read of the strip settles the second.
- **OQ-6 (prototype, by measurement; G-BOX decides).** The root as a size container. If containment changes a box in any host, the thumb rides one wrapper as long as its travel and moves by a percentage of that; one more node, the same arithmetic.
- **OQ-7 (owner, one glance at the close).** Safari itself. Every reading here is Playwright WebKit.

## Cut on the last pass

Read once more as the owner would, these were in the design and are out, because none of them tells the hand anything: a magnified copy of the track (the loupe's idea); a frosted world behind a held slider; a readout that shows a bare number by default; a readout on hover; a card with a title row; ticks drawn by the view; a thumb that turns to clear glass; a band that thickens while held (it cannot be done with a transform without bending the caps); an idle motion.
