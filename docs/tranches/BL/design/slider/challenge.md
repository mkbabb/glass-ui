# Slider — the challenge

Seat: CHALLENGE (claude-fable-5-2), 2026-11-12. I wrote nothing in W-B.18, MEASURE or PROTOTYPE. I read all three, the patch, the strips, the three owner frames, the precepts, master's `src/components/slider/` and the worktree's, and the four consumers' Slider uses (read only).

What I ran, all through `guarded`, one browser per run, a new context per cell, everything closed in `finally`:

- `challenge/probe.mjs`: the prototype worktree (`576c9b99a`) through the prototype's own harness page, unchanged. Headless Chromium, then Playwright WebKit under `--exclusive webkit`. Results: `challenge/runs/{chromium,webkit}/challenge.json`, crops beside them.
- `challenge/probe-1111.mjs`: the 11.1.1 commit alone (`87b3d259c`), which no prototype run served. Chromium only. Its source was a `git archive` of that commit into a scratch folder, deleted after the run; `challenge/harness-1111/` is the page (re-create the source with `git -C .claude/worktrees/bl/slider/proto archive 87b3d259c src | tar -x -C challenge/scratch/src-1111`). Results: `challenge/runs/chromium-1111/v1111.json`.

No file in the worktree, the main checkout or a sibling repo was changed. Nothing is left listening on 5381–5384.

Every number below is measured unless it says *derived* or *read* (read from source, not run).

## What holds

- **The geometry law holds where it was built.** On the 11.1.1 commit alone, the scrubber's thumb is within 0.02 px of the fill's end cap and 0.00 px of the track's caps at 0 and 100: sm, md, lg, horizontal and vertical, inverted, RTL, vertical inverted, the daraksha run (sm, 155 px, dark), values 0, 1, 5, 25, 50, 95, 99, 100, at rest and held. Heights 12/12/12, 20/20/20, 28/28/28; radii 6/6/6, 10/10/10, 14/14/14. This closes PROTOTYPE's "no run served the 11.1.1 commit alone" for Chromium. WebKit was not run on that commit.
- **Two thumbs hold** (PROTOTYPE measured none). On the 11.2.0 build the fill's two caps are 0.00 px off the two thumb centres at (20, 70), (0, 100), (0, 0), (100, 100), (50, 50), sm and lg, vertical, inverted, RTL, and with `expand`. Crop: `challenge/runs/chromium/crops/range-md-h.png`.
- A translated ancestor does not move the readout (0.00 px Chromium, 0.02 px WebKit), so a Slider inside a popover is safe on that count.
- Under reduced motion the readout's popover does close (I expected it to stay open; it does not).

## Findings

Ordered by what stops a release. Each ends with the amendment it asks for.

### 1. A press on a thumb that has already grown moves the value, and the thumb then trails the hand (both engines)

With `expand` on, a fine pointer rests on the thumb, the dwell passes, the thumb grows, and then the hand presses. That is the ordinary desktop grab. The value changes on the press, before any move:

| cell | thumb scale at the press | value before → after the press, no move | thumb − pointer through the drag |
|---|---|---|---|
| md, pressed at once (no dwell) | 1 | 50 → 50 | 0.00 |
| md, grown by hover | 1.4 | 50 → **49** | **−3.00** |
| sm, 155 px (daraksha's run), grown by hover | 1.67 | 50 → **47** | **−4.26** |
| lg, grown by hover | 1.29 | 50 → **49** | **−3.72** |
| md RTL, grown by hover | 1.4 | 50 → **51** | **−3.00** |
| md vertical, grown by hover | 1.4 | 50 → **52** | **−4.40** |
| md, grown by keyboard focus, then pressed | 1.4 | 50 → **49** | **−3.00** |
| md, `expand` off, hovered | — | 50 → 50 | 0.00 |

Chromium and WebKit give the same numbers. The cause, *read*: reka takes the grab offset as `clientX − thumb.getBoundingClientRect().left` (`reka-ui/dist/Slider/SliderHorizontal.js`, `getValueFromPointerEvent`), and maps against the thumb's `clientWidth`. The rect is the scaled one; the width is the layout one. The difference is `(scale − 1)·H/2`, which is g/2 = 4 px when fully grown. PROTOTYPE's G-TOUCH and G-LIFT pressed inside the dwell, at scale 1, so they never saw it. Its ±1.52 px on touch is a different thing (the step).

The owner would feel this on the first desktop grab: the knob jumps left under the cursor.

**Amendment.** reka's thumb node is never scaled. The disc that grows is painted by the thumb's own `::before` (no new node; `glass-specular-track` uses that pseudo today and finding 9 removes it), and the reka node keeps its H-square box. R-10's "the thumb grows about its own centre" stays true to the eye. Add to G-TOUCH, both engines, fine pointer: after the dwell and after a keyboard grow, a press without a move leaves the value unchanged, and through a 30 px drag the thumb's centre stays within 0.5 px of the grab point. Fix G-TOUCH's 1 px bound to half a step, as PROTOTYPE asks.

### 2. After one key step or one press on the track, a value driven from outside trails by 30 to 45 px for as long as it keeps arriving (both engines)

The step mark (`data-travel`) is cleared on the thumb's `transitionend`, or by the first move of a drag. A scrubber that is playing sends a new value every frame, so each frame restarts the 100 ms travel and `transitionend` never fires. Sixty frames of an outside value (0.5 a frame on a 320 px md track), after one ArrowRight or one click on the track:

| | frames with the mark | frames with a transition running | lag at frame 60 |
|---|---|---|---|
| no step first (control) | 0 | 0 | 0.00 px |
| after ArrowRight, Chromium / WebKit | 60 / 60 | 60 / 60 | **40.69 / 30.49 px** |
| after a click on the track, Chromium / WebKit | 60 / 60 | 60 / 60 | **44.81 / 32.58 px** |

The thumb and the fill stay together, both behind the true value, and catch up only when the values stop. This is keyframes' scrub rail (a click to seek while it plays; `demo/components/playback/PlaybackRibbon.vue:55`, `:model-value="[railT]"`) and daraksha's transport (`src/name/NameDock.vue`, `:model-value="[progress]"`). It also keeps three transitions restarting on every frame, which is the cost O-236 set out to remove.

**Amendment to R-9.** The travel belongs to one value change. The component drops the mark before it writes any value that the marked step did not produce (the next model change after the step's own), and also on `transitioncancel`. Add to G-TWEEN: after a key step and after a track press, 60 frames of an outside value show 0 px lag from the second frame and no mark.

### 3. The expanded surface cannot be touched, and resting the pointer on it closes it (both engines)

The shell stands g = 8 px outside the root on every side and is `pointer-events: none`. The root's box is still H (20 px at md). With the view grown, I moved the pointer 5 px above the band, onto the shell:

- the element under the pointer is not the Slider;
- the shell goes back to rest (scale 0.556, opacity 0) while the pointer is still on it;
- a press there leaves the value at 50.

The owner asked for a view "that enlarges the slider to interact with it". What grows can be seen and cannot be used; the target a finger or a cursor acquires is the same 12, 20 or 28 px band. An enlarged surface that folds away when the pointer reaches it reads as a fault.

**Amendment to R-10.** While grown, the shell takes the pointer. It is a child of reka's root, so a press on it bubbles to reka as a press on the track and hover on it keeps the root's `:hover`. No node and no listener is added. Gate (G-TOUCH): with the view grown, the pointer anywhere on the shell keeps it grown, and a press there moves the value as a track press does. Two things to settle with it: value.js already hangs a hit-area `::before` on the root (`demo/scenes/ConfigSliderPane.vue:309`), so the root's pseudos are not free; and in daraksha the gap between the transport button and the slider is `0.382rem` (6.1 px, *read*), less than g, so the grown shell laps 1.9 px over that button (*derived*).

### 4. Focus that arrives from script counts as keyboard focus (both engines)

After a mouse press and release the thumb keeps focus and the mark is off, as designed. Then `thumb.blur(); thumb.focus()` from script: `data-focus-key` is set, the shell is at scale 1 and the readout is open, with no key pressed. The rule in `onRootFocusIn` is "any focus outside a press". So a dialog or a popover that focuses its first control opens the view and shows the readout; so does the browser handing focus back to the thumb when its window comes forward again (*derived*; a headless run cannot switch windows).

**Amendment to R-11.** The mark is set only when the last input before the focus was a key (a `keydown` seen since the last `pointerdown`, one flag), or when a step key is used. Gate: a script focus after a mouse press leaves the mark off and the shell at rest.

### 5. The readout cannot ship anchored

- PROTOTYPE's own G-COST is RED: 54 layouts in a grow, 78 in a 60-frame drag, 51 in a shrink, against 0 without `valueText`. The brief says no layout in a frame. This is not a note for the design seat; it fails the brief.
- Under a scaled ancestor the readout leaves the thumb: 10.0 px off at the press and 16.9 px after a 60 px drag, with `scale(0.9)` on the host, in both engines (`challenge/runs/webkit/crops/anchor-scale-0-9-.png`). The readout's shift is computed in unscaled lengths while the thumb is drawn scaled. The dock's own sheet records the same family of fault for `anchor()` under a transform (`src/components/dock/styles/dock.css:222-227`).
- CSS anchor positioning needs Safari 26. The rule has no `@supports` arm, and the library states no engine floor I could find. On Safari 17 and 18 the two `anchor()` declarations are dropped and the readout falls to its static position (*derived, not run*). OQ-7 as written ("one glance") would not catch it.
- daraksha gives `value-text` at `step: 0.001`, so the text changes on every frame of a drag there.

**Amendment to R-12.** Drop `anchor()`. The readout stays a top-layer popover, placed from one rectangle of the track read when it is shown, moved by `translate` in that rectangle's own pixels, and re-read on scroll and resize while it is shown (OQ-3's stated fallback). Give it a fixed inline size in `ch` and `contain: layout` so a text change stays inside it. G-COST then reads 0 layouts outside the readout's own box, with `valueText`, and G-LIFT adds a scaled-ancestor cell.

### 6. 11.1.1 puts the cured band under the lens the owner asked to have redesigned, and makes the lens louder

The patch leaves the loupe, the veil and the hold's ink change in place. On the 11.1.1 commit, pressed (md, dark):

![11.1.1 held: default ink above is `held-dark.png`; this is a gold-ink slider](challenge/runs/chromium-1111/crops/held-dark-gold-ink.png)

- The lens's first painted frame is `scale 1 / opacity 1`. The entry is still a cut (motion-canon P0).
- The lens is a 120 × 52 slab whose fill is now the ink at full strength and still ends square (radius 0).
- The lens's fill is `rgb(233, 230, 226)` when the slider's own ink is gold (`rgb(214, 170, 80)` set on a wrapper). The lens is teleported to `<body>`, so `currentColor` there is the page's. Before the patch this default was the foreground at 22 %, which hid the mismatch.
- The fill drops to alpha 0.6 for as long as it is held (`oklab(… / 0.6)`, the grasp rung). The owner asked for the text colour, "not so grayed out"; the moment he holds it, it greys. Crop: `challenge/runs/chromium-1111/crops/held-dark.png`.
- A mouse press still paints the keyboard ring on the track.
- 4 nodes under the root at rest, 6 held, plus the lens and the veil on `<body>`.

Two more things about the split:

- The spectrum is untouched by the patch: its handle is 6 px (md) and 9 px (lg) off the track's cap at 0, a 12 px lozenge in a 24 px track. The brief names color's L / C / h / α console first among the places this is felt, and that console is all spectrum sliders. 11.1.1 gives it nothing.
- Until 12.0.0 every consumer that does not set `expand` keeps the lens. The owner's second and third messages are about that view.

**Amendment to the release split.** 11.1.1 also stops the Slider mounting the loupe, the veil and the grasp carriers, and holds the fill at full strength while held. That removes nodes only while held, changes no prop and no token, and is the deletion the wave already rules for 12.0.0 (`motion` goes inert until then). If that is judged too much for a patch, 11.1.1 waits and ships with 11.2.0; it should not ship the band alone. Add a patch gate: held, the fill's painted colour equals its rest colour, nothing is appended to `<body>`, and a mouse press shows no ring. Bring R-8 (the ring) into the same release as the band, or say in the notes that the colour console is not cured yet.

### 7. In dark, with the default ink, there is no knob; in light, grown, the knob is the shell's colour

- Dark, at rest: the thumb is `--foreground` on a fill of `currentColor`. They are the same colour (`rgb(233, 230, 226)` both). The only thing between them is `--shadow-sm` at 6 %. `challenge/runs/chromium/crops/fringe-dark-default-dpr2.png` is the thumb at 12× and shows a bar with a round end. PROTOTYPE says the same in its note 3.
- Light, grown: the thumb is `--card` and the shell is `--card`. Where the grown thumb overhangs the band it disappears into the shell (`prototype/chromium-lift-readout-in-plate.png`, `prototype/webkit-md-vertical-held-light-dark.png`).
- Disabled, dark: the thumb and the fill both go to the disabled opacity, and the thumb then shows as a lighter disc over the half-strength fill, so the knob appears only when the control is off (*derived*).

R-7's "a light knob in both themes" is the design seat's reasoning. The owner's three frames all show a dark knob, and what he asked for was its size and its seat. A slider with no visible knob is a progress bar.

**Amendment to R-7 and G-READ.** By rule, the thumb differs from the fill it ends, and from the shell it sits in, in both themes, with the default ink and with a consumer's `--slider-range-bg`. G-READ adds that reading as a luminance difference with a stated floor. Which tone is the owner's: put two dark captures in front of him, the thumb as `--card` and the thumb as `--background`, each at 0, 50 and 100, beside the current one.

### 8. Between rest and full the shell is concentric with nothing

The shell grows by a uniform scale about the thumb's centre, so through the whole grow and the whole shrink it is a short capsule whose ends stop inside the track. At 40 % and 68 % opacity (frames 4 and 5 of the prototype's own strip):

![mid-grow, dark, Chromium](challenge/shell-mid-grow-dark-chromium.png)

The track sticks out of the shell on the right and the fill sticks out on the left. PROTOTYPE notes that G-CONCENTRIC "at rest" cannot hold and asks for the gate to be reworded; the fault is the motion, and it shows in every frame the brief asks to be clean.

**Amendment to R-11.** The shell is always its full length. It grows by `clip-path: inset(g round H/2)` to `inset(0 round calc(H/2 + g))` with the same opacity ramp, so every frame is a capsule outset from the track by a growing margin and concentric with it. `clip-path` is on motion-canon P5's list and interpolates in Safari. A clipped box cannot carry an outer shadow, so the shell keeps its hairline and gives up `--shadow-md` (one shadow fewer). The thumb still grows where the hand is. G-CONCENTRIC adds four frames inside the grow and the shrink: the shell's caps within 0.5 px of the track's in each.

### 9. Paint the owner has already ruled out

- **A radial glow on the thumb.** `glass-specular-track` stays on the thumb. Held and grown it is a bright spot in every crop (`prototype/webkit-md-vertical-held-light-dark.png`, `challenge/runs/chromium-1111/crops/held-dark.png`). `restraint.md`: "No specular highlight, radial glow… Remove, do not tune." It is not in the wave's deletion list. **Amendment:** the class comes off the thumb in 11.1.1.
- **Two shadows on the spectrum handle.** At rest 1 layer; on hover and held 2 (a 4 px halo and `--shadow-sm`), measured with `expand` on, where the halo sits inside the shell (`challenge/runs/chromium/crops/spectrum-expand-held-dark.png`). `restraint.md` allows one layer. **Amendment:** the halo rules go; with `expand` the shell is the held mark, without it the ink tween is.
- **A grey track in light.** The ground is the ink at 16 %, which on a near-black ink is a neutral grey (`prototype/chromium-light-md-grow-shrink.png`; PROTOTYPE reads 188 against a 220 plate). `restraint.md`: "No grey or muted surfaces". Held, over the `--card` shell, the same band reads grey-brown. OQ-5 leaves the number open; the light capture has to be in front of the owner with the dark one, not after.
- **The fill's edge shows round the thumb when their colours differ.** With a violet `--slider-range-bg` (keyframes) and the light thumb, 19 to 26 of 400 rim pixels on the track side are violet in Chromium at dpr 2, 10 of 106 at dpr 1; WebKit 0 to 8 (`challenge/runs/chromium/crops/fringe-dark-violet-dpr2.png`). The fill's cap and the thumb are the same circle, so their antialiased edges mix. **Amendment to R-4:** the fill's cap is drawn 0.5 px inside the thumb.

### 10. It is called the granular view and it changes neither the gain nor the track

R-10 says so itself ("Finer travel is not delivered") and OQ-4 defers it. The owner's word, three times, is "granular". At 11.2.0 the track, the fill, the travel per pixel and (until finding 3 is cured) the target are all what they were; what is added is a border around the band, a larger knob and a number. The proportions also leave the table at the sizes consumers actually set: fourier's timeline sets H = 6 px (`web/src/components/shared/FourierTimeline.vue:335`), where the thumb grows 2.33× into a 22 px shell round a 6 px line, and value.js sets sm to 9 px (`demo/styles/foundation.css:472`), 1.89×. The wave's table stops at 1.67×.

**Amendment.** The wave does not close O-254 on 11.2.0. It puts the held capture to the owner with one plain sentence: bigger to see and to hold, not finer. And `--slider-expand-outset`'s default is bounded by H so the thumb's growth stays inside the table's range at any H a consumer sets.

### 11. Consumers

None receives a patch on its own: value.js, keyframes and fourier pin `10.1.3` exactly, daraksha `11.0.1`. What breaks at each repin, *read* from their trees:

- **fourier.** The wave says "the patch only". Its own specs pin the opposite of the new law:
  - `web/e2e/od19-p2-sliders-caret.spec.ts` expects the fill's edge within 1.5 px of the thumb's centre, a thumb that does not paint, and no element with a shadow but the track and the fill. After 11.1.1 the fill ends H/2 past the centre (10 px at md) and the thumb paints with a shadow; after 11.2.0 the fill's box is the whole translated capsule.
  - `web/e2e/f-w14-control-row.spec.ts:107-110` computes the same "integrated" reading.
  - Those lines record an owner ruling there of 2026-10-19 ("the handle is the fill's edge, not a painted thumb"). The ruling of 2026-11-12 is newer and wins, but the consumer half has to say that it reverses one and name the two specs.
- **value.js (color).**
  - `e2e/smoke/a11y-select-title.spec.ts:542` expects the published sheet to contain `--slider-range-origin`. 11.1.1 deletes it with the press deform.
  - The colour console feeds the spectrum handle `--slider-thumb-bg` (the live colour) and `--slider-thumb-border-color` (an ink that follows the ramp's lightness) (`demo/picker/controls/ComponentSliders/ComponentSliders.vue:239-244`). R-8's ring reads neither: its centre is clear and its edge is `--background`. A `--background` ring on the light end of an L ramp or on the alpha checker is the case that feed exists for. **Amendment to R-8:** the ring's edge is `var(--slider-thumb-border-color, var(--background))`, and the wave says whether `--slider-thumb-bg` fills a spectrum handle.
  - `.touch-gate-active .slider-thumb { background-color; border-color }` (same file, 322-325) loses to the ring rule's specificity, and the ring is now an outline, so that state paints nothing.
  - `.channel-slider .slider-thumb { transition: background-color…, border-color… }` (413-424) replaces the thumb's `translate` transition, so the step travel is off for the thumb there while the lane keeps it.
- **keyframes.** Finding 2 is its scrub rail. Its rail already pads the root to 36 px (`class="py-2"`), which is the shell's height at md, so finding 3 does not show there.
- **daraksha.** Findings 2, 3 (the 1.9 px lap) and 5 (a readout at `step: 0.001`). Its `gilt.css` (branch `name-r3-hover`) already sets the fill and the track; its TODO for `--slider-thumb-bg` is answered by O-273.
- **The Slider's own specs.** The wave's gate says they "pass unchanged, apart from the lines that pin the deleted press deform". PROTOTYPE found otherwise: 2 of 3 in `slider.size-tokens.test.ts` and the 2 spectrum-fallback e2e cells fail on the deleted lozenge. The wave's sentence has to name them.

### 12. What the gates did not read

- No bite was run for any gate (PROTOTYPE says so). The wave asks for each gate's bite once.
- G-TOUCH has no cell for a device with a mouse and a touch screen. `(hover: hover) and (pointer: fine)` matches an iPad with a trackpad, and a tap there leaves `:hover` set, so the view would stay grown after the finger lifts (*derived, not run*). **Amendment:** the hover grow is keyed to a `pointerenter` from a mouse, which the component can already see, not to `:hover`.
- WebKit touch press and drag, forced colours in WebKit and Safari itself remain unread, as PROTOTYPE lists. With finding 5 as it stands, Safari 17 and 18 have to be in OQ-7, not only the current one.
- I did not run the 11.1.1 commit in WebKit, and I ran no touch cell.

## The amendments in one list

1. The reka thumb node is never scaled; the grown disc is its pseudo. Gate: press after the dwell.
2. The step mark ends with the one value change it belongs to. Gate: outside values after a step.
3. The grown shell takes the pointer. Gate: hover and press on the shell.
4. The keyboard mark needs a key. Gate: script focus.
5. The readout loses `anchor()`; one rectangle, re-read on scroll; fixed size. G-COST with `valueText` at 0.
6. 11.1.1 stops mounting the loupe, the veil and the carriers and keeps the held fill at full strength, or it waits for 11.2.0. R-8 ships with the band.
7. The thumb differs from the fill and from the shell in both themes; the tone is the owner's, by capture.
8. The shell grows by `clip-path` at full length; no `--shadow-md`. Gate: mid-grow frames.
9. `glass-specular-track` off the thumb; the spectrum halos out; the fill's cap 0.5 px inside the thumb; the light track's grey to the owner.
10. O-254 stays open on 11.2.0; the outset is bounded by H.
11. The consumer half names fourier's two specs and the reversed ruling, value.js's spec and its two spectrum inputs, and the Slider's own failing specs.
12. Bites run; a hybrid-pointer cell; Safari 17 and 18 in OQ-7.
