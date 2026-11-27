# BM-5: the slider while held, with its finger target

| field | value |
|---|---|
| release | BM's parts minor, with BL's slider removals (W-B.18 R-10, R-11) and O-408's thumbless default |
| status | planned |
| rests on | the owner's ratification (IN O-426), exception 23: "The expanded view stays and is refined, and every slider has it on by default, on a phone and on a desktop … the rounded shell that grows out of the track, with the knob growing inside it, on a press, on Tab, and on hover-intent where there is a mouse"; O-408 ("capped and invisible, like you're just pulling the track"); GL-15 (IN O-429) |
| DESIGN | §8.3; with §8.1 (the slider rows), §5.3, §10.1, §10.3, §10.5 to §10.7, §13.10 |
| sketch | `study/pass-10/slider/sketch/slider-expand-c.css` and its forced-colours arm `slider-expand-c.fc.css`, as amended by the final fold (A10-5, A10-6, B10-4, B10-6). It replaces W-B.18's section of `src/components/slider/styles.css` at `fe30f9882` (`bl/slider/proto`) from "THE EXPANDED VIEW" to the forced-colours block |
| page | P10-slider, letter C (repaired by the pages seat: B not sendable, the readout held at scale 1 on the way out, the ground returning over 200 ms, the ring at g) |
| gates | G-2 (the ground's clip is an effect of 200 ms), G-3 (a slider with a knob and a readout runs 3 on a press, named), G-5 |
| depends on | BL's slider build (W-B.18 at `fe30f9882`, with O-408's thumbless attribute); 11.1.2's touch intent (LF-57) |

## What it builds

C, ChatGPT's construction with the track's own ground as the shell: shell ⊃ fill ⊃ knob on one centre line, nothing added and nothing stacked.

- **The ground.** BL's shell node carries the track's ground, `--glass-slider-track-background`, or `currentColor` at 16 %. At rest it is clipped to the track's capsule, so the slider looks as it does today. One variable, `--slider-open`, drives one `clip-path` leg: 0 at rest, g/2 under a resting mouse after a 120 ms dwell (a hover edge moves 4 px or less), and g on a press or on Tab. g is 8 px and never more than two thirds of the band. It grows and returns over 200 ms on present's curve, one clock both ways, so the page-thread clip shows six frames at 30 Hz.
- **The fill does not change.** Its colour stays the site's `--slider-range-bg` (W-B.18 R-7), so a fill that takes its subject's colour keeps it (IN O-432).
- **The knob.** A thumbless slider, the default, never draws one; the fill's capped end is the grip (O-408; R-298's thumbless slider stays, by the final fold). A slider whose site asks for a knob (O-408's attribute) grows it by `scale` to the band plus g, on a press or Tab only.
- **The readout,** the value said while held, enters from 0.9 with its fade and leaves by fading at scale 1 (P0a rule 3).
- **The focus ring** is the track's outline at `outline-offset: max(2px, var(--slider-g))`, the grown ground's edge, in every state. It shows only on Tab, when the ground is at g, so it never moves; it fades on `--duration-fast`, and under Reduce Motion it sits 2 px out.
- **A site's own ground grows in its own colour.** An image ground (a ramp, a checker) stays on the track's box (`background-origin: content-box`, `no-repeat`), so a value keeps its colour, and its ring is clear.
- **The hit region is the root's box in every state.** The grown ground takes no pointer (`pointer-events: none` on the shell); the root owns hover through `pointerenter`, and a drag holds by pointer capture. A tap on a neighbour within g reaches the neighbour.
- **The finger target** (GL-15; BL's triage row G1 (c), `audit/triage-1119/PLACED.md:28`). On a coarse pointer `--slider-touch-target` is 2.75rem, where it is 1.5rem today (`src/styles/tokens/sizing.css:305`), and the root's floor (`src/components/slider/styles.css:124-131`) makes the root a finger's size. The grown ground fits inside that root at every size (sm 12 + 16 = 28 px, md 20 + 16 = 36, lg 28 + 16 = 44), so on a phone it covers no neighbour. On a fine pointer it overlaps a neighbour by up to g while it shows, and a site turns the view off with `:expand="false"`. The token's new default grows every slider's root on touch, a changed default look, which is why it rides this minor.
- **The spectrum variant** takes the same rules.
- **Under Reduce Motion** nothing grows: the value under the finger and the readout's fade answer.

**The numbers** (outer · band · knob, px): sm 28 · 12 · 20; md 36 · 20 · 28; lg 44 · 28 · 36. ChatGPT's shell · fill · thumb is 68 · 42 · 34.

## Inputs folded

- **The touch intent** (LF-57, 11.1.2; `audit/hassio-r14/PLACED.md`). On a coarse pointer a horizontal slider's root is `touch-action: pan-y`; no value is set until the pointer has moved 10 px more along the track than across it; a press let go inside the threshold sets the value once at its release, emitting `update:modelValue` and `valueCommit` once. The expanded view grows on the press as designed, and the value waits for intent. BM-5 keeps every line of it.
- **The touch target adds nothing to an ancestor's overflow** (atlas's film G-3, IN O-434; S112, "atlas's dropdown films"). 11.1.2 keeps every coarse-pointer target at 44 px or more while adding nothing to any ancestor's scrollable overflow. The finger target here rides the root's own box (`min-block-size`, `min-inline-size`), which is layout, not overflow, so the grown root takes its room in the row and no scroller around it gains a sideways scroll. The proof keeps G-3's witness.
- **The value's two events** (IN O-432). `update:modelValue` carries the live value as it moves, and `valueCommit` fires once at release, so a site puts its costly call on `valueCommit`. No speed carries the value on after the finger lifts (law 3).
- **What C removes** from BL's build: the separate card ground, its hairline, its opacity leg, the hover's knob growth, and the track's ink deepening from 16 % to 24 %.

## Bytes

+43 B over BL's sheet (2,320 → 2,363 B gz, re-priced after the final fold; `study/pass-10/slider/slider.json`), with no script, node or listener added. It ships in the release where BL's slider removals land (−776 B of sheet, −1,525 B of script, credited to BL), so no slider site's sheet grows. The finger target is one token value.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`:

- the real sheet re-run with `property-regs.css` and the token partials loaded (A10-11), so the ground is seen to tween in and out on its 200 ms clock, containing the band on every frame;
- a site's colour ground grows in that colour; an image ground stays on the track's box with a clear ring;
- the ring stands at g with no jump as Tab leaves;
- a tap within g of the root, on a fine pointer, reaches the neighbour;
- at 390 with touch: a vertical swipe begun on a slider scrolls the page and leaves the value unchanged while the ground grows on the press; a horizontal drag sets the value from the 10 px point; a tap sets it once at release; the root is 44 px or more on its short axis; a slider at the inline edge of an `overflow: auto` scroller leaves its `scrollWidth` at its `clientWidth` (G-3's witness, kept);
- the counts read on the real sheet: one movement on a hover; on a press two, or three with a knob and a readout;
- forced colours (Canvas ground, 1 px CanvasText edge, the root's 2 px outline as the ring), more contrast (nothing changes) and Reduce Motion (nothing grows; the readout fades);
- the strips `strip-held-{light,dark}.png` re-shot on the build, 390 and 1440;
- G-2, G-3 and G-5.

daraksha is asked to run its `e2e/veil-webkit.spec.ts` on the minor's candidate with its two scrubbers grown (BM.md §10).

Optional, never blocking: a Busy-page look at a knobbed slider (D§15.2) and VoiceOver's order on an iPhone.

## Sites it serves

| Site | Sliders (newest branch, read 2026-11-24) | Asked |
|---|---|---|
| atlas | `src/filter/ui/RangeFacet.vue:62` (a two-value slider, `u/s24-atlas`); five in the sci filters (`DemandFilter.vue:63`, `EcfFilter.vue:366`, `:383`, `SciFilter.vue:189`, `UsfFilter.vue:100`, on `u/s24-sci`) | sliders within 8 px of a neighbour; suites that read a held slider's size; whether RangeFacet keeps knobs |
| value.js | six: the channel sliders (`demo/picker/controls/ComponentSliders/ComponentSliders.vue:63`, a ramp on `--glass-slider-track-background` at `:237`), `demo/scenes/ConfigSliderPane.vue:217`, `demo/workbenches/extract/ExtractControls.vue:48` and `:77`, `generate/GenerateControls.vue:366`, `gradient/GradientVisualizer/GradientVisualizer.vue:313`; the thumb reads the fill's colour (`demo/styles/foundation.css:499`) | the ring round a ramp; whether any slider wants a knob |
| daraksha | the two scrubbers (`src/name/NameDock.vue:116`, `src/portraits/PortraitsDock.vue:79`, `origin/master`) in the gold `src/gilt/gilt.css:57-65` sets: the groove at `:60`, the knob's colour at `:58` and `:65` | the gold growing on the gilt; whether the scrubbers keep a knob |
| fourier | `web/src/components/shared/FourierTimeline.vue:222`; `web/src/components/ui/SliderControl.vue:187`, mounted in `equation/FunctionInput.vue:208`, `morph/HarmonicLevelGrid.vue:10`, `:20` and `morph/MorphPhaseConfig.vue:46` | whether both grow while held; sliders near the canvas |
| keyframes | four (`LayerConfigPanel.vue:155`, `TransportScrub.vue:10`, `PlaybackRibbon.vue:65`, `SpringPhysicsFacet.vue:144`) | nothing |
| Home Assistant | `frontend/src/tiles/rails.ts:234` (its colour through `--slider-range-bg` at `:251`). Its own hand stands in front of the slider (`:6-11`) and takes the pointer, so the Slider's `update:modelValue` sees the keyboard only (`:261`) | whether the rails keep the hand, and whether they set `:expand="false"` |

gaggle and slides mount no Slider.

## Not this wave's

The touch intent itself (11.1.2); BL's slider build and removals (W-B.18); the loupe, which stays removed (BL's R-13); a stepped slider's travel, a step at each boundary crossed (BL's R-9 leg; choice 22 B; D§8.1).
