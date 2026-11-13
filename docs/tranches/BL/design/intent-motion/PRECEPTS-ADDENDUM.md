# Precepts addendum: the text the study adds (O-278)

Written 2026-11-12 by the spec seat (claude-fable-5-2) with W-B.17. Three texts, each ready to paste into `docs/precepts`. This seat edited nothing there. Every figure is from the three records under `record/` (G is Google, A is Apple, R is the design references); shipping Safari is unmeasured, and no frame time was taken.

Where each goes:

1. `motion-canon.md`: a new section after P0, a replacement for P6's two bullets, and one sentence for the proportion fence.
2. `affordance-map.md`: a new section after "Intent first", and a press paragraph that is a proposal for the owner and is not pasted until he answers.
3. `restraint.md`: a new section after "Restraint never means an instant change", and two amended lines.

---

## 1. For `motion-canon.md`

### After P0, as a new section

```markdown
## P0a: the measured grammar

P0 says every change is tweened. This is how much and how long, as measured on Google's
and Apple's sites and the design references on 2026-11-12 (the study of INBOUND O-278,
`docs/tranches/BL/design/intent-motion/`). Use these ranges; do not re-derive them.

**How much.** Amounts are small everywhere.

| What changes | Amount |
|---|---|
| a control on hover | its edge moves 4 px or less. A plate behind a 40 px control grows from four fifths; a card grows 1 to 2 % |
| a hover fill | 5 to 8 % of the ink, or a few levels of the fill's own colour |
| a thing that appears | from 0.8 to 0.96 of its size, or 4 to 8 px of travel. Never from nothing |
| a glyph | one property of its own strokes; 2 px, 15 degrees, or a twentieth of its size |
| a press | 2 % of colour, or a scale no deeper than 0.96 |
| overshoot | none on a control. The one spring that overshoots in the records is a morph: 3.5 % growing, 8.5 % shrinking |

**How long.**

| Kind | In | Out |
|---|---|---|
| hover fill, tint, plate, glyph | 100 to 200 ms | the same clock, the same curve |
| a surface or mark that appears | 100 to 200 ms | 75 to 120 ms: about six tenths of the in |
| a box that resizes | 120 ms for a correction between two open states; 250 to 450 ms for a whole panel | the same, or shorter |
| a press | about 100 ms | about 100 ms |
| a breath (idle, working) | 1 to 2 s each way, opacity only | |

Glass's ceiling for frequent feedback stays 200 ms. Apple's own hovers run 300 to 320 ms;
ours are tighter on purpose.

**In against out.** What a motion is decides how it leaves.

1. A hover leaves the way it came: one declaration serves both ways.
2. A thing that appeared leaves in less time, about six tenths of its entrance.
3. The out carries less motion: it fades and does not slide back.
4. A replacement is out, then in. Two copies of one mark are never on screen together.
5. Between two open states only the size corrects; the entrance is not replayed.

**Weight.** The surface moves before its content. Colour waits for shape. The fade lands
before the stretch. A larger thing moves later and longer.
```

### In place of P6's two bullets ("The universal carve", "The recipe-local carve")

P6's opening paragraph stays. Its two bullets describe a carve the code no longer has (CENSUS, "What holds", 4).

```markdown
The discipline has two halves, and both are single-sourced.

- **The fallback suppresses.** `a11y-overrides.css` sets every transition's duration to
  zero and every animation to one endpoint frame, on every element. It may suppress
  motion; it may never create a transition on an element that authored none (the
  no-resurrection ruling). It is what a control with no authorized fade gets, and it also
  quiets a consumer's own untokened motion.
- **A fade is authorized, by name.** A recipe that owns a change keeps its opacity and
  colour legs under reduced motion by a row in the enumerated authorized set in the same
  file, on `--duration-instant`. The plate, presence, the focus ring, the top-layer reveal
  and the control faces are rows. A component that fades adds a row; it never writes its
  own `transition: none`.
- **Travel is dropped by one number.** Every travel amount multiplies `--motion-weight`,
  which is 0 under reduced motion. A move lands at once and its colour fades; a box that
  changes size lands in one frame and what arrived in it fades.

The law in one line: under reduced motion nothing travels or resizes over frames, and
every change that paints differently at its two ends is carried by a fade of 144 ms or
less. A change with no fade is a cut, and a cut is a defect (P0).
```

### In "Ratify-no-re-tune notes", after "The proportion fence" bullet

```markdown
- **The fence bounds amplitude and count, not coverage (owner, 2026-11-12).** Every icon
  and every control answers hover. What the fence forbids is more than one motion per
  hover, an amount past P0a's ranges, and anything that moves at rest.
```

---

## 2. For `affordance-map.md`

### After "Intent first", as a new section

```markdown
## The plate and the glyph (the vocabulary of intent)

Two small pieces say what a control will do, and they are the only two. Both are CSS,
add no node, and run nothing at rest (`W-B.17`).

**The plate** is the control's own shape as a flat fill behind it, in the control's own
colour. `class="plate"`.

| The plate shows | It means |
|---|---|
| grown in at the light strength | pressable: a pointer or the keyboard is on it |
| the full strength for as long as a press lasts | received |
| the full strength, held | on, open, or you are here |
| breathing down from the full strength | working |
| breathing up from nothing | idle: this is where you act. Declared, one per view |

It grows from four fifths only on a control about as wide as it is tall; on a row, a tab
or a card it is the fill alone. It leaves the way it came. It has no shadow, gradient,
rim or gleam, and its shape is the control's and never a shape of its own.

**The glyph** answers with one motion of its own strokes while its control is pointed
at, and returns the same way. `data-glyph` on the `svg`.

| Verb | The glyph | Use it for |
|---|---|---|
| grow (the default) | grows a twentieth | any icon in a control |
| nudge | moves 2 px the way it points | arrows, chevrons, send, next |
| turn | turns 15 degrees | settings, refresh, the theme |
| draw | a gap passes along its stroke once | a curve that is the control's subject |
| flip (a state, on any verb) | turns to its other pose while the control is on or open | chevrons |

- One verb per glyph, and the verb means what the control does.
- The plate grows, or the glyph speaks; never both. A control whose glyph has a named
  verb takes the plate as a fill alone.
- A glyph answers a pointer, not the keyboard; focus is the plate's fade and the ring.
- A control nested in another answers only for itself.
- A glyph that becomes another glyph (play and pause, copy and done) leaves, then
  arrives, in the same seat. Never a cross-fade of two.
- Nothing moves at rest.
```

### A proposal for the owner, not to be pasted until he answers (OWNER-READ question 1)

This would replace the PRESS-SQUISH sentences of the restraint ruling at the top of `affordance-map.md`. In July he retired the press indent; on 2026-11-12 he wrote of a button on keyframes, "the edit button icon doesn't shirnk like a click. It should."

```markdown
> **Press (proposed 2026-11-12, awaiting the owner).** A button or an icon button
> shrinks slightly and evenly under a press and returns: one uniform scale to 0.97, about
> a tenth of a second each way, with the plate at its full strength. No bounce, no inset
> shadow, no dimming, no gleam, and never a squash that is wider than it is tall. Cards,
> rows and large surfaces answer a press by tone alone. What he retired in July was the
> indent; this is a shrink.
```

---

## 3. For `restraint.md`

### After "Restraint never means an instant change", as a new section

```markdown
## The ceiling (owner, 2026-11-12)

> "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like
> apple."

Apple's touch, as measured on its sites that day: one node, one or two properties, and
nothing on glass but its fill and its blur. Its button is one element. Its global
header's stylesheet has no shadow, no gradient and no text shadow in 170 KB. Its store
card's hover is a 1 % scale and one shadow layer, the same both ways. Count each control
against that. Past any line below is too many.

| Per control | Ceiling |
|---|---|
| shadow layers | 1 |
| gradients, gleams, glows | 0 |
| blurs | 0 inside a blurred surface |
| pseudo-elements that carry state | 1 |
| nodes or wrappers added for a motion | 0 |
| properties animating on one node in one change | 2 |
| animations running on a hover | 3, and one kind of movement |
| animations running on a press | 2 |
| animations running at rest | 0, or 1 on a declared idle element |
| transition legs declared | 4 |

A seat that adds a piece states what it removes, and the removal outweighs the addition.
A tween is never the thing to cut: cut the second motion, the layer, the wrapper.
```

### Two amended lines in "The rules", Motion

Replace "Nothing moves while idle except ambient identity (aurora, the breathing gamut, the blob), and that stops under reduced motion. Check: zero infinite animations on controls; a `prefers-reduced-motion` branch for every one." with:

```markdown
- Nothing moves while idle except ambient identity (aurora, the breathing gamut, the
  blob) and one declared idle state on a view's large or focused element: a breath of
  opacity, nothing else (owner, 2026-11-12: "Large elements and focused items should
  have ... idle states"). Small controls are still at rest. Check: zero infinite
  animations on a control that has not declared idle; at most one declared per view;
  each stops under reduced motion.
```

Replace "Frequent actions are fast or still." with:

```markdown
- Frequent actions are fast. "Still" never means a cut: a frequent change is short and
  small, and it still starts and stops.
```
