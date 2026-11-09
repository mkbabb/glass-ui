# Orchestrator note: two daraksha asks join lanes L5 and L2 (value-js-63, owner order 2026-11-09 12:20)

Every seat reads this. Two items are added to the scope. Each is built, witnessed and recorded like any other lane item, and the critics hold them to the same bar.

## O-194 joins lane L5 (build it after HandMark; L1 has finished with the dock by then)

**A persistent seat can be the whole collapsed face.** Daraksha wants GlassDock's real collapse (`collapse="closed"`) on its site dock. The collapsed dock should show only the theme toggle, which sits in `#persistent`: its own icon (sun or crescent), its own name, its own `aria-pressed`, and a press that toggles the theme. No "Expand dock" summary may cover or wrap it.

Today the `#persistent` region already stays live and pressable while collapsed. But the summary pane is still a `role="button"` disclosure beside it (`GlassDock.vue`, the `dock-layer--summary` div, labelled by `collapsedLabel`), so the collapsed dock carries two controls. Nesting the toggle inside that summary would put a button inside a button, which is invalid.

The build: when the `#collapsed` slot is not authored and a `#persistent` seat is, the collapsed face IS the persistent region. There is no summary disclosure, and the plate shrink-wraps the seat on the one dock spring. Expansion still follows `expand-on`. On a fine pointer, hover or focus-within the dock expands it. A coarse pointer has no hover, so it needs one deliberate path that doesn't steal the toggle's tap. The seat decides that path, records why, and witnesses it: the candidates are a press on the plate outside the seat, a swipe along the dock's axis, or a long-press. Keyboard users must still be able to reach and expand the full face.

Gates, in both engines at 390 and 1440, fine and coarse:
- The collapsed accessibility tree holds exactly one control, the toggle, with its name and `aria-pressed`.
- A press toggles the theme and does not expand the dock.
- The chosen expand path works, and focus is not trapped.
- The paint shows the plate fitting the seat.
- The witness is RED on v11.0.0, where the summary disclosure is still present.

## O-196 joins lane L2, alongside O-181 (the Slider work)

**A clock-driven scrubber that the hand always wins.** Daraksha's Name page uses a collapsing time slider: a GlassDock with `collapse="closed"` and Play in `#persistent`, expanding on hover or focus into `<Slider variant="scrubber">` plus Replay. That's the pattern of keyframes.js's TransportDock. A rAF clock writes `modelValue` continuously while the user isn't dragging.

The contract to build and witness:
- While a grab holds, from the press until `valueCommit`, writes to an external `modelValue` do not move the thumb, and the pointer's value wins.
- On release, the slider follows the model again from the committed value, without a jump.
- Slider exposes the grab, either as `grab` and `release` events or as a `v-model:scrubbing` boolean, so the consumer can pause its clock. The seat picks one shape and records why.
- The O-181 rule of one emit per rAF still holds.

Gates: in both engines, a 60 Hz external clock writing `modelValue` during a 1 s drag leaves the thumb under the pointer (within 1 px at every sampled frame). After release, it resumes from the committed value. The witness is RED on v11.0.0 if the thumb fights there; if v11.0.0 already holds, record that and ship the grab signal alone.

The CHANGELOG lines for both use plain consumer prose.

## O-194 amendment (value-js-63, 2026-11-09 afternoon): `#persistent-end` and the press that expands

Daraksha has composed its site dock on 10.1.4 (daraksha branch o1109-dock, `src/shell/SiteDock.vue`, read-only). There are two fit-content GlassDocks, each `collapse="closed"`. The controls dock seats its ThemeControl (the khatam) in **`#persistent-end`**, so it stays at the trailing end with the page's teleported controls before it, and it has no `#collapsed` slot. On 10.1.4 in Chromium at 360–1440 in both schemes, both plates rest collapsed at 56 px, and the khatam shows its correct `aria-pressed` and pose. Two binding additions to O-194:

1. **`#persistent-end` counts the same as `#persistent`.** When `#collapsed` is not authored and either persistent region holds a seat, those seats are the whole collapsed face. With both regions authored, the leading seats come first, then the trailing seats, in order. The gates run in all three cases: leading only, trailing only, and both.
2. **A press on a persistent seat never expands the dock.** Today a click (fine pointer) or a tap (coarse pointer) on the collapsed khatam toggles the theme, but it also leaves the dock expanded: it is still `.expanded` 1.5 s after the pointer leaves. The owner wants the press to toggle and nothing else. The cure is at the root: a press that lands on a persistent seat is that seat's own act, not the dock's expand gesture, on every pointer type. Gate, in both engines, fine and coarse: press the collapsed persistent seat, then move the pointer off the dock. The dock never enters `.expanded`, or on a fine pointer it leaves it within the normal hover-out window, and at 1.5 s it reads collapsed, with the theme toggled. The test must be RED on v11.0.0.

Two points stand as built, recorded so no seat changes them by accident. Keyboard focus on the collapsed summary does not expand the dock (its focusin is stopped), and Enter does. A GlassDock centres in its own flow box (`margin: 0 auto`, `dock/styles/shell.css`), which is the contract. A host that sets two docks side by side in a flex row sets `margin-inline: 0` on its own flex children. That's ordinary host placement, not a shim.

## Second amendment (value-js-63, 2026-11-09 afternoon): the trailing gap, and reduced motion. Both join L5.

Daraksha has moved the khatam to `#persistent`, which withdraws its Ask 1 for its own dock. O-194's three cases (leading only, trailing only, both) still stand for glass. The move also exposed a glass defect, and the owner's reduced-motion bar adds a second item:

**O-197: `#persistent-end` has no gap against `.dock-layers`.** `dock/styles/shell-regions.css` gives only `.dock-persistent + .dock-layers` the `--dock-layer-gap`, so a trailing persistent seat abuts the layers. At 360, the reader's "More" hit cell ran under a trailing khatam. The mirror rule belongs to the region itself and applies in both orientations; a sibling-selector patch would only cover this one case. Gate: in both engines at 360, 390, 430, 820 and 1440, with a trailing persistent seat in both orientations, no control's hit rect overlaps another's, and the gap equals the leading one. The witness must be RED on v11.0.0.

**O-198: under `prefers-reduced-motion: reduce`, nothing on the dock but opacity animates, and nothing runs longer than 144 ms.** On 10.1.4 in Chromium, hover-expanding a collapsed fit-content dock under PRM still animates `border-*-radius` on the dock. The PRM arm in `dock/styles/dock.css` pins the plate scalar (snap to end state), but the radius still transitions. The owner's bar: under PRM, a dock state change (expand, collapse, a face swap, a press) snaps every geometric property (radius, size, inset, scale, clip) to its end state, and the only transition left is opacity at 144 ms or less. Gate, in both engines: record `getAnimations()` and the computed transitions on the dock subtree through hover-expand, collapse and a face swap under emulated PRM. Every running animation must animate opacity alone, with duration ≤ 144 ms. Plant a radius transition to show the gate bites. The witness must be RED on v11.0.0.

## Third amendment (owner ruling, 2026-11-09 evening): O-199, the dock rests rounded. It joins L5.

The owner looked at daraksha's docks and read them as "not rounded". Asked whether the dock's resting shape should be a capsule by default, he answered: **"Rounded. Inform atlas always."**

In 11.0.0, `--radius-dock` is `--radius-pill`, which is 1rem: 16 px corners on a 52–56 px dock, so a rounded rectangle. That bar corner came from atlas's U-line register (F-20, `dock/styles/morph.css`, the collapsed dock with a persistent control).

The build: **the dock's resting silhouette is a full capsule.** Its corner is half its cross extent, in px, never `%` (the r1 law), and this holds for every posture. An open horizontal dock is a stadium, a vertical dock is a stadium on its long axis, and a collapsed square dock stays a circle. A collapsed dock that is two cells wide, the persistent-plus-summary case, becomes a capsule rather than the 16 px bar. The morph between collapsed and open then swaps no silhouette: both ends sit at half the cross extent, so the corner rides the box. Express it as one rule at the token or shape layer, written once (`--radius-dock` resolves to a capsule). Never write a per-posture literal. A consumer that wants the bar corner sets `--radius-dock` at its own host, and the CHANGELOG says how in plain consumer prose.

Gates, in both engines at 390 and 1440, light and dark: in every posture, with every count of collapsed cells, and at each of 5 sampled morph frames, the computed radius equals half the cross extent within 0.5 px and contains no `%`. Paint shows a capsule. A host that sets `--radius-dock: 1rem` gets the bar corner back. The witness must be RED on v11.0.0. The orchestrator tells atlas when it ships, as the owner ordered.
