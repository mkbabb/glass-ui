# Precepts addendum: the text the study adds (O-278)

Written 2026-11-12 by the spec seat (claude-fable-5-2) with W-B.17, and brought into line with that wave by the fold seat the same day after the prototype and the challenge (`fold.md`). Three texts, each ready to paste into `docs/precepts`. Neither seat edited anything there. The ranges are from the three records under `record/` (G is Google, A is Apple, R is the design references); what glass's own pieces do is from the prototype's and the fold's readings. Shipping Safari is unmeasured.

Where each goes:

1. `motion-canon.md`: a new section after P0, one sentence for P1, a replacement for P6's two bullets, and one sentence for the proportion fence.
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
| a glyph | one motion of its own strokes; 2 px, 15 degrees, or a twelfth of its size. Less than that is not seen |
| a press | 2 % of colour, or a scale no deeper than 0.96 |
| overshoot | none on a control. The one spring that overshoots in the records is a morph: 3.5 % growing, 8.5 % shrinking |

**How long.**

| Kind | In | Out |
|---|---|---|
| hover fill, tint, plate, glyph | 100 to 200 ms | the same clock, the same curve |
| a surface or mark that appears | 100 to 200 ms | 75 to 120 ms: about six tenths of the in |
| a box that resizes | 120 ms for a correction between two open states; 250 to 450 ms for a whole panel | the same, or shorter |
| a press | about 100 ms | about 100 ms |
| a breath, where one is allowed | 1 to 2 s each way, opacity only | it finishes; it is never removed mid-way |

Glass's ceiling for frequent feedback stays 200 ms. Apple's own hovers run 300 to 320 ms;
ours are tighter on purpose.

**In against out.** What a motion is decides how it leaves.

1. A hover leaves the way it came: one declaration serves both ways.
2. A thing that appeared leaves in less time, about six tenths of its entrance.
3. The out carries less motion: it fades and does not slide back.
4. A replacement never shows two marks at full strength. Two marks of one size trade
   places in one seat, neither above half strength while the other shows; content of two
   sizes goes out, then in.
5. Between two open states only the size corrects; the entrance is not replayed.
6. Anything that can come back inside a tenth of a second is a node that stays and
   changes by a CSS transition, which turns round from the value on screen. A node the
   framework removes cannot turn round.

**Weight.** The surface moves before its content. Colour waits for shape. The fade lands
before the stretch. A larger thing moves later and longer: a box that resizes takes
0.2 s for 40 px and up to 0.45 s for 320 px, on a curve that leaves rest at no speed and
reaches its end exactly.

**What a start and a stop are, for a check.** No leg lands more than two fifths of its
travel in one 60 Hz frame, and a leg is at least five frames long. A cut given two
frames is still a cut.
```

### In P1, after "EFFECTS"

```markdown
- A hover plate that grows 3 px and a glyph that moves 2 px are effects, not travel:
  they ride `--ease-out`. The spring is for a distance (an arrival, a resize, a morph).
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
| the full strength for a press, never shorter than the press clock | received |
| the full strength, held | on, or you are here: only where nothing else marks it |
| the light strength at rest | idle: this is where you act. Declared, one per view |

It grows from four fifths only on a control about as wide as it is tall; on a row, a tab
or a card it is the fill alone. It leaves the way it came. It has no shadow, gradient,
rim or gleam. It does not pulse. A tab under its travelling indicator and a row beside
its turned chevron are already marked, and take no held plate. Working is not the
plate's to say: a busy control shows the dot ring in its glyph's seat.

**The glyph** answers with one motion of its own strokes while its control is pointed
at, and returns the same way. `data-glyph` on the `svg`, with one of four verbs. A glyph
with no verb is still, and its control's plate does the answering.

| Verb | The glyph | Use it for |
|---|---|---|
| grow | grows a twelfth | an icon whose control has no room for a growing plate |
| nudge | moves 2 px the way it points | arrows, chevrons, send, next |
| turn | turns 15 degrees | settings, refresh, the theme |
| draw | a gap passes along its stroke once, and once more when the control opens | a curve that is the control's subject |
| flip (a state, on any verb) | turns to its other pose while the control is on or open | chevrons |

- One verb per glyph, and the verb means what the control does.
- One hover, one motion: the plate grows, or the glyph speaks; never both. A control
  whose glyph has a verb takes the plate as a fill alone.
- A glyph answers a pointer, not the keyboard; focus is the plate's fade and the ring.
- A control nested in another answers alone, on hover and on press: the outer one
  stands down while the pointer is on the inner.
- A glyph that becomes another glyph (play and pause, copy and done) trades places
  with it in one seat: both stay mounted, and neither is above half strength while the
  other shows. Never two at full strength, and never an empty seat.
- Nothing moves at rest.
```

### A proposal for the owner, not to be pasted until he answers (OWNER-READ question 1)

This would replace the PRESS-SQUISH sentences of the restraint ruling at the top of `affordance-map.md`. In July he retired the press indent; on 2026-11-12 he wrote of a button on keyframes, "the edit button icon doesn't shirnk like a click. It should."

```markdown
> **Press (proposed 2026-11-12, awaiting the owner).** A button or an icon button
> shrinks slightly and evenly under a press and returns: one uniform scale to 0.97, about
> a tenth of a second each way, with the plate at its full strength. Once begun, the
> down stroke completes: a tap shows the whole press. No bounce, no inset shadow, no
> dimming, no gleam, and never a squash that is wider than it is tall. A control inside
> another is pressed alone. Cards, rows and large surfaces answer a press by tone alone,
> and so does every control under reduced motion. What he retired in July was the
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
| animations running on a hover | 2: one fade and one movement |
| animations running on a press | 2 |
| animations running at rest | 0 |
| marks for one state | 1 |
| transition legs declared | 4 |
| listeners per control | 0 |

A seat that adds a piece states what it removes, and the removal outweighs the addition.
A tween is never the thing to cut: cut the second motion, the layer, the wrapper. A
motion nobody can see is a cost with no intent: cut it too.
```

### Two amended lines in "The rules", Motion

Replace "Nothing moves while idle except ambient identity (aurora, the breathing gamut, the blob), and that stops under reduced motion. Check: zero infinite animations on controls; a `prefers-reduced-motion` branch for every one." with:

```markdown
- Nothing moves while idle except ambient identity (aurora, the breathing gamut, the
  blob), and that stops under reduced motion. A view's one large or focused element may declare an idle state (owner,
  2026-11-12: "Large elements and focused items should have ... idle states"): a
  resting fill at the hover strength, which is a state and not a loop. A breath on a
  control is allowed only where each of its four edges (on, off, pointer on, pointer
  off) is a tween in every engine; the two forms built on 2026-11-12 each cut on one.
  Small controls are still at rest. Check: zero infinite animations on controls; a
  `prefers-reduced-motion` branch for every ambient one; at most one idle element
  declared per view.
```

Replace "Frequent actions are fast or still." with:

```markdown
- Frequent actions are fast. "Still" never means a cut: a frequent change is short and
  small, and it still starts and stops.
```
