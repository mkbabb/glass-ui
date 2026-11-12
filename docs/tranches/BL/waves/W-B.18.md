# W-B.18: the Slider (one geometry law, and the expanded view)

The source is the owner, four times, verbatim (INBOUND O-254, O-280, O-283, O-273):

- 2026-11-11: "sliders likely need a expanded granular view re-write, with popup animation that enlarges the slider to interact with it, animating in and out, and shrinking when not interacting with it."
- 2026-11-12 09:40: "the granular tap to refine view with glass-ui needs to be more rounded, well-defined, and re-designed." The fill should be "the color of the name text, not so grayed out".
- 2026-11-12 11:50: "the granular UI sldier from glass-ui is not rounded properly--study the chatgpt app's screenshots and ios27 items for more information. Think of it again from first principles in glass-ui."
- 2026-11-12 12:05: "the glass-ui slider thumb should be more filled to the slider, taking up the full height".

The wave also carries O-236 (a playing Slider writes layout every frame; the cure keeps reka's hidden form input) and leaves room for O-253 (detents).

Five seats made this text, in order, all on 2026-11-12:

- **Measure** (claude-opus-5-5): today's Slider and the references. `../design/slider/MEASURE.md`.
- **Design** (claude-fable-5-2): the first form of this wave. It ran nothing.
- **Prototype** (claude-opus-5-5): built that form on the scratch worktree `.claude/worktrees/bl/slider/proto` and read its gates. `../design/slider/PROTOTYPE.md`.
- **Challenge** (claude-fable-5-2): twelve findings against the build. `../design/slider/challenge.md`.
- **Fold** (claude-fable-5-2): this text. Every finding is folded in, built on the same worktree and measured in headless Chromium and Playwright WebKit. `../design/slider/fold.md` holds the readings, finding by finding; `../design/slider/fold/amendments.patch` is the build.

A number here is measured on that worktree unless it is marked *derived* (arithmetic from the tokens) or *read* (read from source, not run).

Release, for `INDEX.md`'s column: **it splits three ways.**

- **11.1.1**, a patch: the geometry cure, the colour slider's ring, and the Slider stops mounting the loupe, the focus veil and the grasp carriers. No prop and no token name changes.
- **11.2.0**, additive: the transform-driven mechanism and the expanded view, behind one opt-in prop.
- **12.0.0**: the expanded view becomes the default.

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
- **R-4: the fill ends as the thumb.**
  - The fill runs from the track's start to the thumb's far edge, `H + p·(W − H)` long, and its end cap is a circle of radius *H*/2 on the thumb's centre. At 0 the fill is one circle, the thumb, sitting in the track's start cap. The fill is never shorter than *H*, so its cap never reshapes.
  - A fill that stops at the thumb's centre with a square end was considered and not taken: it needs the thumb to hide the end, and a clear or ring thumb would show it.
  - The cap is drawn 0.25 px short along the line, inside the thumb. A cap that is exactly the thumb's circle shares its antialiased edge, and the fill's colour then shows as a line round a thumb of another colour: with the default ink in Chromium, 30 of 400 rim pixels at 2× and 14 of 106 at 1×, against 0 and 2 with the cap drawn short. With two thumbs the fill's start cap is drawn short under the lower thumb in the same way. The cap's centre therefore reads 0.25 px from the thumb's, inside the 0.5 px every gate allows.
- **R-5: the fill's end is the thumb in every state, and the fill keeps its strength.** The press deform (`scale(1.02, 0.94)`), the velocity smear and the overshoot on release are deleted. Measured, they make the held fill 0.94 of the track's height, run it 6.4 px past the track's end at 100 and leave the thumb 5 px behind it (MEASURE §1.2, item 5). `restraint.md` already rules out a press indent and overshoot on a control. The fill is also the same colour held as at rest: today the grasp carriers drop it to 0.6 for as long as it is held, which greys the fill at the moment the owner touches it. What is left moving on press is the track's ink (R-7) and, from 11.2.0, the grow (R-10).
- **R-6: both orientations, inverted and RTL, by the same sentence.** Vertical swaps the axes: the centre travels `H/2 + p·(L − H)` from the bottom of a track of length *L*, and the fill grows up to it. Inverted and RTL mirror the start. No orientation has a number of its own.
- **R-7: one ink at two strengths, and a knob that is seen.**
  - The fill's default colour is the control's text colour, `currentColor`, at full strength, in both themes. A consumer's `--slider-range-bg` still wins. Today's dark default is the foreground at 22 %, painted at alpha 0.19: the grey the owner named.
  - The track's default ground is the same ink at a low strength (16 %). Today's ground is `--muted` at 50 % alpha, which takes the colour of a dock plate and loses its edge. `--glass-slider-track-background` still wins. In light, the ink at 16 % reads as a neutral grey; the owner sees the light capture beside the dark one before the patch ships (OQ-2).
  - Hover, keyboard focus and hold deepen the track's ink to 24 %, tweened. The fill is already at full strength, so this is the whole of the rest-to-held colour change.
  - The track and the fill carry no rim, no inset line, no blur and no shadow. The fill's lit top line, its lighter bottom line and the groove's inset line are what make a 12 px fill read taller than a 12 px track (MEASURE §1.4: 12.4 against 11.2 on the owner's frame). The fill is a plain background of the ink; it stops composing the liquid-fill register.
  - **The thumb differs from the fill it ends, from the track it sits in and from the shell it grows in, in both themes.** That is the rule; its floor is in G-READ. `--slider-thumb-bg` is the thumb's colour (O-273), and its default is the page's colour, `--background`, in both themes. The fill is the text colour, and text is what reads on the page, so the knob reads on the fill with nothing more set. The first form of this wave made the dark knob `--foreground`, which is the fill's own colour: at rest there was no knob (230 against 230). Today's `--card` reads on the fill but not on the new track at 0 (44 against 45). `--background` reads on all three: in dark 10 against a fill of 230, a track of 45 and a shell of 54; in light 250 against 25, 188 and 231. The tone is the owner's to settle by capture (OQ-1).
  - What no tone cures: a knob of the band's full height has no track round it, so at 0 and at 100 half its edge is against whatever the Slider sits on. On a ground of the knob's own colour only its shadow marks that half, and in dark the shadow does not show. With the page's colour that ground is a bare page (the fill then reads as ending in a hollow at 100); with `--card` it is a card. The captures put to the owner show these cells.
  - The thumb carries one shadow (`--shadow-sm`) and no specular highlight. `glass-specular-track` comes off the thumb: held and grown it painted a bright spot, and `restraint.md` says of specular "Remove, do not tune."
  - A disabled Slider dims as one thing (the root at the disabled opacity), so the knob never shows through a half-strength fill.
- **R-8: the spectrum takes the same law, in the same release as the band.**
  - Its handle becomes a ring of diameter *H*, centred as in R-3. Today it is a 0.5 *H* lozenge that sits flush with the track's end, so its corners stand outside the round end (MEASURE §1.3): 6 px (md) and 9 px (lg) off the track's cap at 0 (challenge, finding 6). The brief names color's L / C / h / α console first among the places the fault is felt, and that console is all spectrum sliders, so the ring ships with the band in 11.1.1 and the owner sees it by capture first (OQ-2).
  - The ring's edge is 2 px, drawn as an inset outline (a border would shrink the box reka maps the pointer by; the prototype measured one step lost at every value of 50 or more). Its colour is `var(--slider-thumb-border-color, var(--background))`, so a consumer's ink that follows the ramp still decides it. Its centre is `--slider-thumb-bg` when one is given and clear otherwise, so the ramp shows.
  - Its state mark is the edge thickening from 2 to 3 px on hover, hold and keyboard focus, tweened. The two halo shadows it has today (4 px on hover, 6 px held) are deleted: with the shadow under them they are two layers, and `restraint.md` allows one.
  - The spectrum's taller track (1.5 × `--slider-thumb-size`: 12, 24, 36 px) stays, and `--slider-thumb-size` keeps that one job.
- **R-9: the mechanism is two transforms and one number** (11.2.0; O-236).
  - The root carries the value as `--slider-p` (and `--slider-p0`, the lower thumb, 0 when there is one thumb), written by the template from the model value.
  - The root is a size container on its travel axis. The thumb sits at the start and moves by `translate: calc(var(--slider-p) * (100cqi − H))` (`cqb` when vertical).
  - The fill is a capsule as long as the track, moved by `translate: calc((var(--slider-p) − 1) * (100% − H))` and clipped by the track's own round end. Its end cap lands at `W − H/2 − (1 − p)(W − H) = H/2 + p·(W − H)`, the thumb's centre (less the 0.25 px of R-4).
  - With two thumbs the lane (the element that holds the fill today) moves by `p0·(W − H)` and clips the fill's start to a cap on the lower thumb's centre; the fill moves by `(p − p0 − 1)(W − H)` inside it.
  - reka keeps the root (pointer, keys, the hidden form input), the track and the thumb (role, focus, the aria values). reka writes the thumb's position as an inline `left`, `right`, `top` or `bottom`; one rule holds those four at the start with `!important`, so the value never reaches layout. reka's own centring transform on the thumb is set to `none` through its variable, `--reka-slider-thumb-transform`; ours ride `translate`. reka's `SliderRange` is replaced by a plain span of the same class, because all it does is write two layout offsets.
  - A value the pointer drags, or one that arrives from outside (a playing scrubber), lands on the frame it arrives. A value the slider changes in one step (an arrow, Page, Home or End key; a press on the track away from the thumb) travels on `--spring-press` over `--spring-press-duration`.
  - **The travel belongs to the one value change the step produces.** The component marks the step on the root and drops the mark before it writes any later value, and also when the travel ends or is cancelled. As first built the mark was cleared only on `transitionend`, so a scrubber that was playing after one key or one press on the track restarted the travel on every frame and trailed its true value by 30 to 45 px for as long as values kept arriving (challenge, finding 2). That is keyframes' scrub rail and daraksha's transport.
- **R-10: the expanded view is a shell that grows out of the track, and a disc that grows in it.**
  - The track and the fill do not change. That is Apple's own rule ("the knob transforms into Liquid Glass during interaction"; track and fill measured unchanged, MEASURE §2.1), and it keeps R-1 to R-6 and reka's pointer mapping true while expanded.
  - **The outset** is *g*: `--slider-expand-outset` (default 0.5rem), and never more than two thirds of *H*. The bound keeps the disc's growth inside the table below at any height a consumer sets: at fourier's 6 px line the shell is 14 px and the disc grows 1.67×, where the unbounded outset gave a 22 px shell round a 6 px line and 2.33×.
  - **The shell** is one capsule behind the track, outset from it by *g* on every side: height *H* + 2*g*, radius `--slider-radius` + *g*. An outset capsule has the track's own cap centres, so its ends are concentric with the track's.
  - **The disc** grows to *H* + *g* about its own centre, a uniform scale. It sits in the shell with *g*/2 clear on every side, at every value, 0 and 100 included: shell, disc and band nested on one centre line, which is the ChatGPT construction (its thumb is inset 4 on every side; *g*/2 is 4 px).

    | size | band *H* | shell *H* + 2*g* | disc grown *H* + *g* | disc scale |
    |---|---|---|---|---|
    | 6 px (fourier) | 6 | 14 | 10 | 1.67 |
    | 9 px (value.js sm) | 9 | 21 | 15 | 1.67 |
    | sm | 12 | 28 | 20 | 1.67 |
    | md | 20 | 36 | 28 | 1.40 |
    | lg | 28 | 44 | 36 | 1.29 |

    (Apple's held knob measures 1.34 to 1.48 of its rest size.)
  - **reka's thumb node is never scaled.** The disc the eye sees is the node's `::before`, and that is what grows; the node keeps its *H*-square box in every state. reka takes the grab offset from the node's rectangle and maps by its `clientWidth`. When the node itself was scaled, a press on a thumb that hover or the keyboard had already grown moved the value before any move (50 to 49 at md, 50 to 47 on daraksha's 155 px run) and the thumb then trailed the hand by 3 to 4.4 px (challenge, finding 1). For the same reason no border is ever put on the node, forced colours included. The disc is the `::before` from 11.1.1 on, so there is one construction.
  - **The shell takes the pointer while it is grown.** It is a child of reka's root, so resting on it keeps the view grown and a press on it is a press on the track. No node and no listener is added. As first built the shell ignored the pointer, so the surface that grew could not be touched and folded away when the pointer reached it (challenge, finding 3). At rest the outset takes nothing.
  - **The surface.** The shell's ground is `--card` with the ink mixed in at 6 %, and a hairline `--border`. No shadow (a clipped box cannot carry one, R-11), no blur (a slider's usual home is a blurred plate, and `restraint.md` allows no blur inside a blur), no rim, no gradient. Plain `--card` would be the knob's own tone in light (246 against 250).
  - **The readout** is a small capsule above the thumb that rides it, and it exists only when the consumer has given `valueText`. The Slider cannot know a unit, and a bare number beside a field that already shows it is a restated label. It shows while the value is being changed (held, or focused from the keyboard), not on hover. It is `aria-hidden`: the thumb already carries the same string as `aria-valuetext`. Same surface as the shell, no shadow, tabular figures, its radius half its own height. Its lower edge stands 1.5 *g* above the band (12 px at the default outset), which is where the loupe sits today. On a vertical slider it sits beside the thumb, on the inline-end side.
  - **Ticks** are the consumer's `marks`, already drawn in the track; the expanded view adds none. Detents are O-253's.
  - **It is bigger to see and to hold; it is not finer.** A longer track would move the value point out from under a finger that is already down: reka maps the pointer against the root's box as it was at the press, so any scale along the travel breaks the registration between finger and thumb. The track, the fill and the travel per pixel are what they were. The owner's word, three times, is "granular", so this wave does not close O-254: it puts the held capture and that one sentence to him (OQ-3).
- **R-11: how it grows and shrinks.**
  - It grows on press, on keyboard focus, and under a mouse after a dwell of `--spring-press-duration`. It shrinks when none of the three holds. There is no timer: the states are marks on the root, and the shell is always in the tree, so both tweens start from the true rest values. Today's loupe mounts already engaged, which is why its entry is a cut (MEASURE §1.5).
  - **The hover mark is a mouse's `pointerenter`,** which the component sets and clears on the root. `:hover` is not read: on a device with a mouse and a touch screen a tap leaves `:hover` set, and the view would stay grown after the finger lifts.
  - **The keyboard mark needs a key.** It is set when the last input before the focus was a key, or when a step key is used. reka focuses the thumb from script on a press, and both engines match that as `:focus-visible`, so today a mouse press paints the keyboard ring and it stays (MEASURE §1.6). As first built the mark was "any focus outside a press", so a script that handed focus to the thumb (a dialog focusing its first control, a window coming forward) opened the view and showed the readout with no key pressed (challenge, finding 4). The ring on the track reads this mark from 11.1.1; with `expand` on, the focus indicator is the shell's edge in the ring's colour.
  - **The shell is always its full length.** It grows by `clip-path`, from `inset(g round H/2)`, which is the track's own capsule, to `inset(0 round calc(H/2 + g))`, with `opacity` 0 to 1 on the same clock. Every frame between is a capsule outset from the track by a growing margin and concentric with it. As first built it grew by a uniform scale about the thumb's centre, so through the whole grow and shrink it was a short capsule whose ends stopped inside the track (challenge, finding 8). `clip-path` is on motion-canon P5's list. What the clip hides takes no pointer, so the shell's reach grows with what is seen.
  - The disc goes from `scale` 1 to (*H* + *g*) / *H*. The readout grows from the thumb's side with its opacity, on its own clocks: the entry clock while it shows and the exit clock when it leaves, whether or not the pointer still hovers.
  - Spatial legs ride `--spring-present` over `--spring-present-duration` (no overshoot; 0.2 s), and `--spring-present-exit-duration` on the way back. Opacity rides `--ease-standard` on the same clocks. A press or a keyboard focus that lands inside the hover dwell skips what is left of the dwell.
  - The root's box never changes, so no neighbour moves. The root is raised one step for exactly as long as the shell is off its rest, so the shell overlaps a neighbour by *g* and is never under one.
  - **Reduced motion:** nothing scales and nothing is unclipped. The shell and the readout fade in at full size and fade out, on `--ease-standard`; the disc keeps its rest size. A fade, never a cut. The fade is cut today from outside the Slider: `utilities/a11y-overrides.css:46-53` sets `transition-duration: 0s !important` on every element, against motion-canon P6. That is a library row of its own, and 11.2.0 does not ship with G-STILL's fade reading RED.
  - **Touch:** the press grows it at once and the release shrinks it. The coarse target floor on the root stays. **Keyboard:** Tab grows it, the arrows move the thumb as in R-9, and leaving shrinks it.
  - **Forced colours:** the shell and the readout are `Canvas` with a `CanvasText` border, the fill `Highlight`, the disc `Canvas` with a `CanvasText` border, and the focused control shows a real outline (O-267). These rules come last in the sheet and match the specificity of the rules they replace; twice in the build a forced-colours rule lost to source order or to a longer selector.
- **R-12: the readout leaves the plate; nothing else does.**
  - A glass surface clips its descendants (`contain: paint` in `material.css`; the dock shell adds `overflow: clip`). The shell overhangs the root by *g*, which sits inside a plate's padding. The readout stands above the band and would be cut. So the readout, and only the readout, is shown in the top layer (`popover="manual"`).
  - **It is placed from one rectangle.** When it is shown the component reads the track's rectangle once and writes the start cap's centre, the band's half thickness and the travel, in viewport pixels; `translate` does the rest from the same value fraction. The rectangle is read again on a scroll or a resize while the readout shows, and never inside a drag. Because the numbers are the rectangle's own, an ancestor's transform is carried.
  - **CSS anchor positioning is not used.** As first built the readout was anchored, and that failed three ways: the anchor re-laid out the readout on every animation frame (54 layouts in a grow, 78 in a 60-frame drag, 51 in a shrink, against 0 without `valueText`); under a scaled ancestor the readout left the thumb by 10 px at the press and 16.9 px after a 60 px drag; and `anchor()` needs Safari 26, with no fallback arm.
  - **Its box is a fixed size.** Its width is the widest text it has had to show (the text at the minimum, at the maximum and at the present value), in `ch`, and the box is contained (`contain: layout size`). A text change is laid out inside the box and nowhere else, which matters where the text changes on most frames (daraksha gives `value-text` at `step: 0.001`).
  - The component shows it when a hold or a keyboard focus begins and hides it on the exit tween's `transitionend`. No copy of the track and no teleport.
  - **Engines.** The readout needs the popover API (Safari 17); an engine without it shows no readout and nothing else changes (*derived, not run*). Its entry tween uses `@starting-style` (Safari 17.5), as ten other files in the library do. The rest of the wave needs container query units and `:dir()` (Safari 16.4).
- **R-13: the lens leaves with the patch; `expand` is opt-in in 11.2.0 and the default in 12.0.0.**
  - From 11.1.1 the Slider mounts no loupe, no focus veil and no grasp carriers, and no longer runs the drag-velocity bridge. The owner's second and third messages are about that view, and the cured band cannot be put under it: on the 11.1.1 commit as first built, the lens's first painted frame was `scale 1 / opacity 1`; it was a 120 × 52 slab whose fill ended square; teleported to `<body>`, it took the page's ink instead of the slider's (grey over a gold slider); and the held fill dropped to alpha 0.6 (challenge, finding 6). A cure removes something: the lens is not cured in the meantime, it is removed, and the held Slider's mark until 11.2.0 is the track's ink deepening.
  - The `motion` prop stays. `reduced` and `off` give the reduced-motion form of the expanded view; nothing else on the Slider reads it after the patch. The CHANGELOG says that the held lens and the velocity smear are gone.
  - W-R.1 owns the grasp and veil registers themselves; this wave only stops the Slider mounting them. Each register is left with one consumer in the library (the modal scrim for the veil, the dock plate for the grasp); W-R.1 rules on that.

**Counted.** DOM nodes under one Slider (marks and the form input aside):

| | at rest | held |
|---|---|---|
| today | 5 (root, track, lane, fill, thumb) | 12 (+ veil 1, loupe 4, carriers 2) |
| 11.1.1 | 5 | 5 |
| 11.2.0, `expand` off | 5 | 5 |
| 11.2.0, `expand` on | 6 (+ shell) | 6 |
| the same with `valueText` | 7 (+ readout) | 7 |

Each one's job: the root is reka's and holds the box; the track is the ground and the fill's clip; the lane is the fill's window when there are two thumbs; the fill; the thumb is reka's and holds role, focus and the grab; the shell is in the tree at rest so that it can tween from rest; the readout is the one thing that must be read above a finger. Nothing is placed in `<body>` in any state.

Shadows: one, the disc's. Blurs: none. Gradients: none but a consumer's ramp. What animates, and nothing else:

| property | on | when |
|---|---|---|
| `scale` | the disc; the readout | grow and shrink |
| `clip-path` | the shell | grow and shrink |
| `opacity` | the shell; the readout | grow and shrink |
| `translate` | the thumb, the lane, the fill, the readout | a step's travel |
| `background-color` | the track | the ink deepening |
| `outline-width`, `outline-offset` | the spectrum ring | its state mark |
| `border-color` | the shell | the keyboard focus edge |
| `z-index` | the root | the raise, one step with no travel |

All are on motion-canon P5's list; `z-index` moves in one step and reaches neither layout nor paint order within a frame.

## Scope

**11.1.1, the geometry cure.** `src/components/slider/styles.css`, `Slider.vue`, and the comment over the size tokens in `tokens/sizing.css`. No prop and no token name changes; one consumer input is newly read (`--slider-thumb-border-color`, R-8).

1. The scrubber's thumb reads `--slider-track-height` on both axes (R-1). The lane's cut follows, since it already reads the thumb's size.
2. `--slider-radius` is declared and read by the track, the fill and the thumb (R-2). This also makes the lg spectrum track a capsule.
3. The press deform, the smear and the release overshoot are deleted, horizontal and vertical, with their two reduced-motion arms (R-5).
4. Paint (R-7): the track's default ground; no rim, inset line or blur on the track and the fill; the fill default becomes `currentColor` in both themes; the thumb is drawn by its `::before`, defaults to `--background`, and loses `glass-specular-track`; the fill's cap is drawn 0.25 px short (R-4); disabled dims the root.
5. The spectrum ring and its state mark (R-8).
6. The Slider stops mounting the loupe, the veil and the carriers, and the fill keeps its strength held (R-5, R-13).
7. The keyboard mark (R-11): a mouse press shows no ring.

A consumer who set `--slider-thumb-size-{sm,md,lg}` to resize a scrubber's thumb sees no effect after the patch; the rung to set is `--slider-track-height-{sm,md,lg}`. The CHANGELOG says so.

**11.2.0, additive.**

| | |
|---|---|
| `expand` | boolean prop, default `false`. Turns on R-10 to R-12. |
| `--slider-expand-outset` | default `0.5rem`, bounded by two thirds of the track's height. The shell's outset; the disc grows by the same length. |
| `valueText` | existing prop; with `expand` it is also the readout's text. |

Also in 11.2.0, with no new name: the transform mechanism (R-9); the step travel; the hover mark.

**Deleted.**

- In 11.1.1:
  - the `min(thumb, track)` rule; `--radius-pill` in the Slider;
  - the three weight-train rules and their reduced-motion arms;
  - the dark `--slider-fill-ink` mix at 22 % and the light `--glass-capsule-warm` default;
  - the fill's rim, its liquid-fill class and the groove's inset line on the Slider;
  - `glass-specular-track` on the thumb;
  - the spectrum's lozenge sizes, its 0.4 radius, its `corner-shape` block and its two halo shadows;
  - `:has(:focus-visible)` as the ring's predicate;
  - the loupe (its template, about 145 lines of CSS, `writeLoupeGeometry`, `writeLoupeValue`); the focus veil's mount, `writeVeilCentre` and the window scroll listener; the grasp carriers and their `transitionend` close path; the inline z-index raise; `useDragVelocity` in the Slider.
- In 11.2.0: reka's `SliderRange`.
- In 12.0.0: nothing more; `expand`'s default changes.

**Not in this wave.**

- A change of gain or a longer track while expanded (R-10, OQ-3).
- Haptic detents (O-253).
- The ramp under a spectrum thumb at the ends: the centre stops *H*/2 short of each end, so the colour under it at 0 is the ramp's colour *H*/2 in. Today's lozenge stops *H*/4 short. Insetting a consumer's ramp needs a change to how the track paints it.
- A readout that stays inside the shell's span at the ends; it is centred on the thumb and may overhang by a few pixels.
- `touch-action` on the root.
- The reduced-motion carve in `utilities/a11y-overrides.css` (its own row; R-11).

## Gates

Each gate is read once RED and once GREEN, with its bite read once. RED for the 11.1.1 gates is the measure's own table; RED for a clause the challenge added is the challenge's reading of the first build (`576c9b99a`). Browser cells use the fold's harness (`../design/slider/fold/harness/`, with the daraksha repro) and probe (`../design/slider/fold/probe.mjs`), at 390 coarse and 1440 fine, light and dark, one browser per run, a new context per cell, every run through `guarded` and every WebKit run through `guarded --exclusive webkit`. A cap's centre is defined as in MEASURE §1.2.

**11.1.1.**

- **G-CONCENTRIC, Chromium and WebKit.**
  - Cells: sm, md and lg, horizontal and vertical, plus one inverted, one RTL and one vertical inverted cell, and the spectrum's sizes; values 0, 1, 5, 25, 50, 95, 99 and 100; at rest, on hover, under keyboard focus and held.
  - The thumb's centre is within 0.5 px of the fill's end-cap centre on both axes (it reads 0.25 by R-4), and at 0 and 100 within 0.5 px of the track's cap centre. Twenty frames sampled inside a pointer drag hold the same bound.
  - With two thumbs, at (20, 70), (0, 100), (0, 0), (100, 100) and (50, 50): each of the fill's caps is within 0.5 px of its thumb's centre.
  - RED: 2 px at rest and up to 5.24 px held. Bite: restoring `min(thumb, track)`.
- **G-HEIGHT, Chromium and WebKit, and one grep.** In every cell above the fill's cross size, the thumb's diameter and the track's cross size are equal within 0.1 px, held included (RED: 0.94 held), and the computed radius of each is half that size. `git grep -n "radius-pill" -- src/components/slider` prints nothing, and no scrubber rule reads `--slider-thumb-size`. Bite: one `border-radius: var(--radius-pill)`.
- **G-READ, Chromium and WebKit.**
  - On the daraksha repro (sm, dark, on a dock plate, no `--slider-range-bg`), a column scan of the crop gives the painted fill band and the painted track band the same height within 0.5 CSS px (RED: 12.4 against 11.2), and the track differs from the plate beside it.
  - The fill's painted colour is the root's computed `color`, at rest and held, with the ink set on a wrapper (a gold ink reads gold).
  - The knob is seen. In both themes, with the default ink and with a violet `--slider-range-bg`, the thumb's luminance (0 to 255) differs from the fill's by at least 60 and from the track's by at least 30, at 0, 50 and 100. RED: 0 against the fill in dark on the first build. Bite: `--slider-thumb-bg: var(--foreground)` in dark.
  - At 2×, on the track side of the thumb's rim, at most 2 % of the rim's pixels are brighter than both the thumb and the track by more than 12. RED: 30 of 400. Bite: the cap drawn at the thumb's own circle.
  - Bite for the scan: the rim back on the fill.
- **G-HELD, Chromium and WebKit, and vitest.** Held, by mouse and by touch: 5 nodes under the root, as at rest; nothing is appended to `<body>`; the fill's computed colour equals its rest colour; a mouse press shows no ring on the track in any frame, and Tab does; computed `box-shadow` is other than `none` on the disc only, in one layer, on hover and held, for both variants; `backdrop-filter` is `none` on every node; no node carries a `radial-gradient`. RED: 12 nodes, 7 on `<body>`, the fill at alpha 0.6, the ring on a mouse press, two shadow layers on the spectrum handle. Bite: the veil's Teleport back.

**11.2.0.**

- **G-CONCENTRIC again**, on the transform mechanism, with `expand` on:
  - at rest, the shell's painted capsule is the track's (same thickness, caps within 0.5 px);
  - fully grown, the shell's cap centres are within 0.5 px of the track's, and the grown disc's centre within 0.5 px of both at 0 and 100;
  - in every sampled frame inside the grow and inside the shrink (at least four of each), the shell's painted caps are within 0.5 px of the track's and its radius is half its painted thickness. RED: caps up to 173 px from the track's in mid-grow. Bite: growing the shell by `scale`.
  - The disc's scale is at most 1.67 at track heights of 6, 9, 12, 20, 28 and 40 px. Bite: the outset unbounded.
- **G-READ again, Chromium and WebKit.** Grown, in both themes, the disc's luminance differs from the shell's by at least 15 where it stands outside the band, and still from the fill's by at least 60 and from the track's by at least 30. RED: 0 in light with the shell as plain `--card` under a `--card` knob. Bite: the shell's ground as the knob's colour.
- **G-TWEEN, Chromium and WebKit.**
  - For each way in (press, keyboard focus, hover after the dwell) and each way out (release, blur, leave), at values 0, 50 and 100, a per-frame sample of the shell's `clip-path` and `opacity`, the disc's `scale` and the readout's `scale` and `opacity`: the first frame equals the rest state, the last equals the end state, the values are monotone, and no step exceeds what the curve allows. A release in mid-grow turns back from the value it had. RED: the loupe's first painted frame is `1 / 1`. Bite: mounting the shell with `v-if`.
  - The readout grows on press and on keyboard focus, never on hover.
  - The step travel of R-9 reads the same way on `translate`: a Page key and a press on the track each run monotone from the old position to the new.
  - After a key step and after a track press, 60 frames of a value driven from outside show 0 px of lag from the first frame, no transition running and no mark. RED: 30 to 45 px at frame 60, 60 of 60 frames marked. Bite: clearing the mark on `transitionend` only.
- **G-COST, Chromium by trace; WebKit by the animation list.**
  - Windows: a grow by press, a grow by hover, a shrink, a 60-frame drag, and 60 frames of a value driven from outside; each with `expand` off, on, and on with `valueText`.
  - Without `valueText`: 0 `Layout` events in every window. With it: 0 `Layout` events rooted outside the readout's own box in the drag, the hover grow and the driven window; and in the press grow and the shrink exactly one, the readout entering or leaving the top layer. RED: K12's layout per frame; 54, 78 and 51 with the anchored readout. Bite: removing the `!important` hold on the thumb's inline offset; `anchor()` back on the readout.
  - In both engines `document.getAnimations()` shows no property outside the table under **Counted**.
- **G-NODES, vitest and one browser cell.** The counts in the table above, exactly, `expand` off included. Nothing is appended to `<body>`. Computed `box-shadow` is other than `none` on the disc only; `backdrop-filter` is `none` on every node. Bite: a second surface under the readout.
- **G-FORM, vitest.** A named Slider in a form submits its value after a drag and after a key press; the hidden input is present (O-236). Bite: K12's build.
- **G-BOX, Chromium and WebKit.** The root's and the track's boxes equal master's within 0.1 px as a block, as a flex-row item and inside a dock plate, at both widths, with `expand` off and on, at rest and grown. A neighbour's box does not change during a grow. Bite: growing by `height`.
- **G-LIFT, Chromium and WebKit.**
  - Inside a `contain: paint` plate the readout paints whole (its pixel count within 2 % of an unclipped twin), and the pointer capture and the drag survive its showing.
  - Its centre is within 0.5 px of the thumb's on the travel axis at the sampled values, at the press and after a 60 px drag, with no transform on an ancestor and with `translateX(40px)`, `translate3d(12px, 18px, 0)`, `scale(0.9)` and `scale(1.25)` on one; and in RTL, inverted, vertical and with two thumbs. RED: 10.0 and 16.9 px under `scale(0.9)`.
  - It stays attached through a page scroll during a hold, and the drag carries on after the scroll.
  - Its box does not change size while its text changes through a drag.
  - Bite: the readout as a plain child is cut by the plate.
- **G-TOUCH, Chromium and WebKit.**
  - At 390 coarse: a press grows with no dwell; one second after the release the shell is at rest and no hover mark is left. Bite: the grow keyed to `:hover`.
  - Fine pointer, the thumb already grown by the dwell and again by the keyboard: a press without a move leaves the value unchanged, at sm (155 px), md, lg, RTL, vertical and the spectrum, and on the disc's rim outside the node. RED: 50 to 47, 49, 51, 52. Bite: the node scaled.
  - Through a 30 px drag the thumb's centre stays within 0.5 px of the grab point on a slider whose step is under a pixel of travel, and within half a step on a stepped one. (The first form allowed 1 px and did not allow for a step of 3 px; this is the tighter reading.) By mouse and by touch.
  - With the view grown, the pointer anywhere on the shell keeps it grown, and a press there sets the value a track press at that point sets. At rest a press in the outset changes nothing. RED: the shell at rest with the pointer on it; the value unmoved. Bite: `pointer-events: none` on the shell.
  - Focus handed to the thumb by script after a mouse press leaves the keyboard mark off, the shell at rest and the readout closed; Tab sets all three. RED: all three set by the script. Bite: the mark on any focus outside a press.
  - A device with a mouse and a touch screen: a tap leaves no hover mark and the shell at rest after one second, and the mouse on the same page still grows it.
  - A mouse press shows no keyboard ring at any time.
- **G-STILL, Chromium and WebKit; forced colours in Chromium only** (WebKit's emulation leaves the colours unforced).
  - Reduced motion: no `scale`, `translate` or `clip-path` animates; opacity does, over more than two frames; first and last frames equal the rest states; at rest the outset takes no pointer.
  - Forced colours: the shell, the disc and the readout each compute a `CanvasText` border, the fill `Highlight`, and the focused control a real outline, with the keyboard mark set; reka's thumb node has no border and its `clientWidth` is *H*; a press on the thumb leaves the value unchanged.
- **The existing specs.** These pass unchanged: `slider.contract`, `Slider.marks`, `attrs-pointerdown-channel`, `dock-hold-contract`, `slider-cursor-affordance`. These pin what the wave deletes and are rewritten with it, each named in the build's record:
  - `tests/components/slider.size-tokens.test.ts`: 2 of 3 (the `min(thumb, track)` clamp; the spectrum lozenge, 12 px expected, a 24 px ring now).
  - The 2 spectrum-fallback e2e cells (`corner-shape: superellipse(2)` and a radius of at least 0.55 of the handle's width; the ring is a circle at 0.5).
  - `tests/styles/focus-veil.test.ts`: 4 of 19, the rows that name the Slider as one of the veil's two hosts (the class in its source; the count of two composers; the plate mounted to `<body>`; the centre re-taken on scroll).
  - `tests/styles/glass-subtlety.test.ts`: 2 of 36, the rows that read the slider's fill as one of the grasp register's two hosts.
  - The lines that pin the deleted press deform.

That is four gates for the patch and ten for the minor.

## Consumer half

Each consumer changes at its own repin; none receives a patch on its own (value.js, keyframes and fourier pin `10.1.3` exactly, daraksha `11.0.1`). glass tells atlas of every default here at booking and at publish. What follows is *read* from each tree, not run.

- **daraksha** (Name transport, `src/name/NameDock.vue`, on 11.0.1).
  - After 11.1.1 the fill takes the transport's text colour with nothing set; its `--slider-range-bg` in `gilt.css` may stay or go. Its TODO for `--slider-thumb-bg` is answered by O-273.
  - At 11.2.0 it sets `expand` and gives `valueText` (the time). Its `value-text` runs at `step: 0.001`; the readout's box is fixed, so that costs nothing outside the readout.
  - The gap between its transport button and the slider is `0.382rem` (6.1 px), less than the default outset, so the grown shell would lap 1.9 px over the button (*derived*). It sets `--slider-expand-outset` to its gap or widens the gap.
  - Its transport plays (`:model-value="[progress]"`); R-9's travel rule is what keeps it on its value after a key.
- **keyframes** (the scrubber and the controls).
  - Its purple `--slider-range-bg` is untouched; the thumb becomes a disc of the full height in the page's colour.
  - A scrubber that plays stops writing layout at 11.2.0. Its scrub rail (`demo/components/playback/PlaybackRibbon.vue:55`) is the case R-9's travel rule was written for: a click to seek while it plays.
  - Its rail already pads the root to 36 px, the shell's height at md.
- **color** (value.js, the L / C / h / α console).
  - The spectrum handle becomes a ring at 11.1.1. The console feeds `--slider-thumb-bg` (the live colour) and `--slider-thumb-border-color` (an ink that follows the ramp's lightness) (`demo/picker/controls/ComponentSliders/ComponentSliders.vue:239-244`); the ring reads both (R-8).
  - `.touch-gate-active .slider-thumb { background-color; border-color }` (same file, 322-325) sets a border colour on a node that has no border now. It moves to the two variables.
  - `.channel-slider .slider-thumb { transition: background-color…, border-color… }` (413-424) replaces the thumb's `translate` transition, so the step travel is off for the thumb there while the lane keeps it. It adds `translate` to its list or drops the rule.
  - The thumb's `::before` is the library's disc. The console's needle is on `::after` and is not touched.
  - `e2e/smoke/a11y-select-title.spec.ts:542` expects the published sheet to contain `--slider-range-origin`. 11.1.1 deletes it with the press deform.
  - `demo/scenes/ConfigSliderPane.vue:309` hangs a hit-area `::before` on the Slider's root. The shell is a span, so the root's pseudos stay free.
  - `demo/styles/foundation.css:472` sets sm to 9 px; the bounded outset gives a 21 px shell there.
  - The console shows each value in a field beside the slider, so it gives no `valueText` and gets the shell without a readout.
- **fourier.**
  - Its own specs pin the opposite of the new law. `web/e2e/od19-p2-sliders-caret.spec.ts` expects the fill's edge within 1.5 px of the thumb's centre, a thumb that does not paint, and no element with a shadow but the track and the fill; `web/e2e/f-w14-control-row.spec.ts:107-110` computes the same reading. After 11.1.1 the fill ends *H*/2 past the centre and the thumb paints with a shadow.
  - Those lines record an owner ruling there of 2026-10-19 ("the handle is the fill's edge, not a painted thumb"). The ruling of 2026-11-12 is newer and wins; fourier's half says that it reverses one and rewrites the two specs.
  - Its timeline sets *H* to 6 px (`web/src/components/shared/FourierTimeline.vue:335`); the bounded outset gives a 14 px shell if it opts in.
- Any consumer that sized a scrubber thumb through `--slider-thumb-size-*` moves to `--slider-track-height-*`.
- Any consumer that reads the held lens, the veil or `data-focus-veil` on a Slider loses them at 11.1.1.

## Open questions

Three are the owner's, and `../design/slider/OWNER-READ.md` puts them to him with the captures.

- **OQ-1 (owner, by capture).** The knob's tone. Default: the page's colour (`--background`) in both themes. Shown beside it: today's `--card`, and a light knob in both themes.
- **OQ-2 (owner, by capture).** Two looks that change with the patch and that no row asked for by name: in light, the fill in the text colour on a track of the ink at 16 % (which reads grey), and the colour slider's handle as a ring. Default: both ship in 11.1.1 as shown. The outset (0.5rem) is read from the same captures.
- **OQ-3 (owner).** The expanded view is bigger to see and to hold, not finer. Finer travel needs the Slider to own the pointer-to-value mapping, which reka does not expose. Default: 11.2.0 ships the view as built, and O-254 stays open for finer travel.
- **OQ-4 (owner, one look at the close).** Safari itself: the current one, and 17 and 18 if a device is at hand. Every reading here is Playwright WebKit. What to look at: the readout appears and rides the thumb (17 and later; 17.0 to 17.4 without its entry tween, *derived*); the shell grows as a capsule; a tap on an iPad with a trackpad leaves nothing grown.

Closed by measurement: the readout's placement (was OQ-3; one rectangle, G-LIFT); the root as a size container (was OQ-6; G-BOX found no box changed).

## Cut on the last pass

Read once more as the owner would, these were in the design and are out, because none of them tells the hand anything: a magnified copy of the track (the loupe's idea); a frosted world behind a held slider; a readout that shows a bare number by default; a readout on hover; a card with a title row; ticks drawn by the view; a thumb that turns to clear glass; a band that thickens while held (it cannot be done with a transform without bending the caps); an idle motion; a shadow under the shell; a halo round the colour slider's handle; a highlight on the knob.
