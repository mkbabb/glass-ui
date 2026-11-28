# BM-5: the slider while held, with its finger target

| field | value |
|---|---|
| release | BM's parts minor, with BL's slider removals (W-B.18 R-13 and its "Deleted" list). Its construction replaces W-B.18's R-10 and R-11, and it builds O-408's thumbless default (value.js's G1). W-B.18 places its own expanded view, behind an opt-in `expand`, in 11.2.0, the dock-redesign minor (`W-B.18.md:23-26`, `:181`); BM.md §8 asks BL to carry that half into this minor, so the view ships once, in this construction. If BL ships it as placed, a site that sets `expand` in the dock-redesign minor sees W-B.18's card ground and hairline for one minor, then this wave's ground, and the candidate's CHANGELOG says so |
| status | planned |
| rests on | the owner's ratification (IN O-426), exception 23: "The expanded view stays and is refined, and every slider has it on by default, on a phone and on a desktop … the rounded shell that grows out of the track, with the knob growing inside it, on a press, on Tab, and on hover-intent where there is a mouse"; O-408 ("capped and invisible, like you're just pulling the track"); GL-15 (IN O-429) |
| DESIGN | §8.3; with §8.1 (the slider rows), §5.3, §10.1, §10.3, §10.5 to §10.7, §13.10 |
| sketch | `study/pass-10/slider/sketch/slider-expand-c.css` and its forced-colours arm `slider-expand-c.fc.css`, as amended by the final fold (A10-5, A10-6, B10-4, B10-6). It replaces W-B.18's section of `src/components/slider/styles.css` at `fe30f9882` (`bl/slider/proto`) from "THE EXPANDED VIEW" to the forced-colours block |
| page | P10-slider, letter C (repaired by the pages seat: B not sendable, the readout held at scale 1 on the way out, the ground returning over 200 ms, the ring at g) |
| gates | G-2 (the ground's clip is an effect of 200 ms), G-3 (a slider with a knob and a readout runs 3 on a press, by `data-motion-count`), G-5 in both modes |
| depends on | BL's slider build (W-B.18 at `fe30f9882`); 11.1.2's touch intent (LF-57). No branch names a thumbless attribute (`git grep -i thumbless` over `src/components/slider` on every ref finds nothing; IN O-408: "no token removes the thumb"), so this wave builds it |

## What it builds

C, ChatGPT's construction with the track's own ground as the shell: shell ⊃ fill ⊃ knob on one centre line, nothing added and nothing stacked.

- **The ground.** BL's shell node carries the track's ground, `--glass-slider-track-background`, or `currentColor` at 16 %. At rest it is clipped to the track's capsule, so the slider looks as it does today. One variable, `--slider-open`, drives one `clip-path` leg: 0 at rest, g/2 under a resting mouse after a 120 ms dwell (a hover edge moves 4 px or less), and g on a press or on Tab. g is 8 px and never more than two thirds of the band. It grows and returns over 200 ms on present's curve, one clock both ways, so the page-thread clip shows six frames at 30 Hz.
- **The fill does not change.** Its colour stays the site's `--slider-range-bg` (W-B.18 R-7), so a fill that takes its subject's colour keeps it (IN O-432).
- **Thumbless by default where a slider has a fill, and the knob.** This wave builds the thumbless default for a slider with a fill: it draws no knob, and the fill's capped end is the grip (O-408; R-298's thumbless slider stays, by the final fold; value.js's G1). A slider whose site asks for a knob sets one boolean prop this wave adds, named at the wave, with a CHANGELOG line for both. A knob grows by `scale` to the band plus g, on a press or Tab only, and reads LF-18's thumb rung for its colour if that row lands first.
- **The spectrum keeps a mark of its value.** Its ramp is the track and its range paints no fill (`R111` `slider/styles.css:181-182`; `fe30f9882` `:335-343`: "the range is transparent … and the handle is a ring"), so with no knob it would show no value at all. Its default in this minor is today's ring (BL's G1 (d) default, `audit/triage-1119/PLACED.md:28`). The owner said yes to a thin capped line for colour ramps, to ship with the thumbless slider (`PLACED.md:42`); value.js's study left both of its ends unanswered (at 100 % nothing shows where to take hold, at 0 the cap is a whole circle again). Its design runs the convergent loop with BM-14's (passes and critiques until two run clean), and its strip goes to the owner and to value.js before any code. If it converges and is built when BM-R1 cuts, it replaces the ring in this minor; otherwise the ring stays and the line rides the next minor, named by its work.
- **The readout,** the value said while held, enters from 0.9 with its fade and leaves by fading at scale 1 (P0a rule 3).
- **The focus ring** is the track's outline at `outline-offset: max(2px, var(--slider-g))`, the grown ground's edge, in every state and in both modes. It shows only on Tab, when the ground is at g, so it never moves; it fades on `--duration-fast`.
- **A site's own ground grows in its own colour.** An image ground (a ramp, a checker) stays on the track's box (`background-origin: content-box`, `no-repeat`), so a value keeps its colour, and its ring is clear.
- **The hit region is the root's box in every state.** The grown ground takes no pointer (`pointer-events: none` on the shell); the root owns hover through `pointerenter`, and a drag holds by pointer capture. A tap on a neighbour within g reaches the neighbour. W-B.18's R-10 built its shell to take the pointer while grown, after its challenge's finding 3: a shell that ignored the pointer "could not be touched and folded away when the pointer reached it". BM-5 answers it this way. On a coarse pointer the grown ground lies inside the root's box at every size (below), so no part of it is outside the hit region. On a fine pointer a press grows the ground only under pointer capture, which keeps the pointer the root's wherever it moves, and Tab grows it with no pointer at all. Only a resting mouse's g/2 (4 px, P0a's hover amount) lies outside the root, and a mouse that leaves the root folds that hover answer over 200 ms like any hover, once, with nothing to oscillate: the ground it left takes no pointer.
- **The finger target** (GL-15; BL's triage row G1 (c), `audit/triage-1119/PLACED.md:28`). On a coarse pointer `--slider-touch-target` is 2.75rem, where it is 1.5rem today (`src/styles/tokens/sizing.css:305`), and the root's floor (`src/components/slider/styles.css:124-131`) makes the root a finger's size. The grown ground fits inside that root at every size (sm 12 + 16 = 28 px, md 20 + 16 = 36, lg 28 + 16 = 44), so on a phone it covers no neighbour. On a fine pointer it overlaps a neighbour by up to g while it shows, and a site turns the view off with `:expand="false"`. The token's new default grows every slider's root on touch, a changed default look, which is why it rides this minor.
- **The grown ground adds nothing to an ancestor's scroll.** The sketch's shell overhangs the track by g on the inline axis at all times (`study/pass-10/slider/sketch/slider-expand-c.css:85`, `inset-inline: calc(-1 * var(--slider-g))`) and is hidden at rest only by `clip-path` (`:95-98`), which does not take a box out of its ancestor's scrollable overflow; at the inline edge of an `overflow: auto` body that is g of sideways scroll, the class of fault atlas's film G-3 recorded (S112:291). The wave keeps the overhang inside the root (the root's inline padding equal to g, or the shell inset to the track) and reads G-3's witness at a fine and a coarse pointer.
- **The spectrum variant** takes the same ground, growth, ring and hit rules; its mark of the value is above.
- **Under Reduce Motion** the grown ground does not grow: it shows at its grown size by an opacity fade in place, 100 to 150 ms on the compositor, and leaves the same way, so the larger answer the owner kept stays (O-426: on by default on a phone and a desktop) and nothing moves (P6). One node cannot both stay at rest as the track's ground and fade in from nothing, so under Reduce Motion the track draws its own ground and the shell carries only the margin: its clip stands at g with the band cut out (an even-odd path), and it fades by `opacity` from 0. Nothing is added, and nothing stacks over the band. The ring sits at g as in the default. A knob's `scale` stays still. The readout fades. Each is an `!important` carve in the slider's sheet (BM.md §1). The study's "nothing grows" (D§8.3) is superseded by P6's "keeps the fade, drops the transform".

**The numbers** (outer · band · knob, px): sm 28 · 12 · 20; md 36 · 20 · 28; lg 44 · 28 · 36. ChatGPT's shell · fill · thumb is 68 · 42 · 34.

## Inputs folded

- **The touch intent** (LF-57, 11.1.2; `audit/hassio-r14/PLACED.md`). On a coarse pointer a horizontal slider's root is `touch-action: pan-y`; no value is set until the pointer has moved 10 px more along the track than across it; a press let go inside the threshold sets the value once at its release, emitting `update:modelValue` and `valueCommit` once. The expanded view grows on the press as designed, and the value waits for intent. BM-5 keeps every line of it.
- **The touch target adds nothing to an ancestor's overflow** (atlas's film G-3, IN O-434; S112, "atlas's dropdown films"). 11.1.2 keeps every coarse-pointer target at 44 px or more while adding nothing to any ancestor's scrollable overflow. The finger target here rides the root's own box (`min-block-size`, `min-inline-size`), which is layout, not overflow, so the grown root takes its room in the row. The shell's overhang is the other half, kept inside the root above. The proof keeps G-3's witness at both pointers.
- **The value's two events** (IN O-432). `update:modelValue` carries the live value as it moves, and `valueCommit` fires once at release, so a site puts its costly call on `valueCommit`. No speed carries the value on after the finger lifts (law 3).
- **What C removes** from BL's build: the separate card ground, its hairline, its opacity leg, the hover's knob growth, and the track's ink deepening from 16 % to 24 %.

## Bytes

+43 B over BL's sheet (2,320 → 2,363 B gz, re-priced after the final fold; `study/pass-10/slider/slider.json`), with no script, node or listener added; the thumbless default, the knob prop and the reduced fade are priced at the wave. It ships in the release where BL's slider removals land (−776 B of sheet, −1,525 B of script, credited to BL), so no slider site's sheet grows. The finger target is one token value. Any registered property the sheet needs is imported by `components/slider/styles.css` itself, so a site that imports that path (Home Assistant, `frontend/src/core/sheet.css`) still gets it.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`:

- the real sheet re-run with `property-regs.css` and the token partials loaded (A10-11), so the ground is seen to tween in and out on its 200 ms clock, containing the band on every frame;
- a site's colour ground grows in that colour; an image ground stays on the track's box with a clear ring;
- the ring stands at g with no jump as Tab leaves;
- a tap within g of the root, on a fine pointer, reaches the neighbour;
- at 390 with touch: a vertical swipe begun on a slider scrolls the page and leaves the value unchanged while the ground grows on the press; a horizontal drag sets the value from the 10 px point; a tap sets it once at release; the root is 44 px or more on its short axis; a slider at the inline edge of an `overflow: auto` scroller leaves its `scrollWidth` at its `clientWidth` (G-3's witness, kept), and the same at 1440 with a mouse;
- a mouse resting on the root, then moving onto the hover-grown band outside it: the ground folds once, with no second grow;
- with no knob prop, no knob is drawn in any state on a slider with a fill; with it, the knob grows by `scale` on a press or Tab only;
- a spectrum slider at 0, 50 and 100 %: its ring marks the value in every state, light and dark, in both engines;
- the counts read on the real sheet: one movement on a hover; on a press two, or three with a knob and a readout;
- forced colours (Canvas ground, 1 px CanvasText edge, the root's 2 px outline as the ring), more contrast (nothing changes) and Reduce Motion (the grown ground fades in place at g, nothing moves, the readout fades), with a cell that reads the shell's clip and `opacity` and the band's paint on every frame of a press and a release: no frame in which the visible ground grows by g, and no frame in which the band's ground changes;
- the strips `strip-held-{light,dark}.png` re-shot on the build, 390 and 1440;
- G-2, G-3 and G-5 in both modes.

daraksha is asked to run its `e2e/veil-webkit.spec.ts` on the minor's candidate with its two scrubbers grown (BM.md §10).

Optional, never blocking: a Busy-page look at a knobbed slider (D§15.2) and VoiceOver's order on an iPhone.

## Sites it serves

| Site | Sliders (newest branch, read 2026-11-24) | Asked |
|---|---|---|
| atlas | `src/filter/ui/RangeFacet.vue:62` (a two-value slider, `u/s24-atlas`); five in the sci filters (`DemandFilter.vue:63`, `EcfFilter.vue:366`, `:383`, `SciFilter.vue:189`, `UsfFilter.vue:100`, on `u/s24-sci`) | sliders within 8 px of a neighbour; suites that read a held slider's size; whether RangeFacet keeps knobs |
| value.js | six: the channel sliders (`demo/picker/controls/ComponentSliders/ComponentSliders.vue:63`, `variant="spectrum"` at `:65`, a ramp on `--glass-slider-track-background` at `:237`), `demo/scenes/ConfigSliderPane.vue:217`, `demo/workbenches/extract/ExtractControls.vue:48` (spectrum when it shows a gradient, `:50`) and `:77`, `generate/GenerateControls.vue:366`, `gradient/GradientVisualizer/GradientVisualizer.vue:313`; the thumb reads the fill's colour on every slider but the spectrum (`demo/styles/foundation.css:498-499`), so the channel sliders keep their ring | the margin round a ramp; whether any slider wants a knob |
| daraksha | the two scrubbers (`src/name/NameDock.vue:116`, `src/portraits/PortraitsDock.vue:79`, `origin/master`) in the gold `src/gilt/gilt.css:57-65` sets: the groove at `:60`, the knob's colour at `:58` and `:65`. Both sit inside docks, where the 44 px touch root can change a dock's height on a phone | the gold growing on the gilt; whether the scrubbers keep a knob; whether its docks have room for the 44 px touch root |
| fourier | `web/src/components/shared/FourierTimeline.vue:222`; `web/src/components/visualization/AnimationControls.vue:294` (the picture's strength); `web/src/components/ui/SliderControl.vue:187`, mounted in `equation/FunctionInput.vue:208`, `morph/HarmonicLevelGrid.vue:10`, `:20`, `morph/MorphPhaseConfig.vue:46`, `visualization/BasisSelector.vue:186`, `:196`, `ContourSettings.vue:297`, `:309`, `:336`, `:348`, `:360`, `EditorControlsDock.vue:121` and `EquationPanel.vue:116` | whether they grow while held; sliders near the canvas; whether the timeline keeps a knob |
| keyframes | four (`LayerConfigPanel.vue:155`, `TransportScrub.vue:10`, `PlaybackRibbon.vue:65`, `SpringPhysicsFacet.vue:144`) | whether the scrub and the ribbon keep a knob |
| Home Assistant | `frontend/src/tiles/rails.ts:234` (its colour through `--slider-range-bg` at `:251`; a spectrum rail where the spec asks, `:236`, which keeps its ring). Its own hand stands in front of the slider (`:6-11`) and takes the pointer, so the Slider's `update:modelValue` sees the keyboard only (`:261`) | whether the rails keep the hand, and whether they set `:expand="false"` |

gaggle and slides mount no Slider.

## Not this wave's

The touch intent itself (11.1.2); BL's slider build and removals (W-B.18); the loupe, which stays removed (BL's R-13); a stepped slider's travel, a step at each boundary crossed (BL's R-9 leg; choice 22 B; D§8.1); the discrete form (BM-14, on this wave's sheet); LF-18's thumb rung (BL's).
