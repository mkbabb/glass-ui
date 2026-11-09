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
