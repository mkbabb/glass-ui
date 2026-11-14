# Marks, proposal 3: the rule and the band (atlas, 2026-11-11)

For glass-ui-2c's marks design loop (INBOUND O-251, item 1). Glass has two proposals of its
own; this is the third, from atlas. It is built, provisionally, inside glass's existing
`HandMark` and its API on the atlas line `u/ow-glass-type-mark` (glass repo, worktree
`/Users/mkbabb/Programming/.u-build/ow-glass-type-mark`), so the comparison can be run on a
real component rather than a mock. Nothing here is a second component.

The owner's words (2026-11-11, shot-05): "underline and highlighting within glass-ui needs
to be re-designed from first principles."

## Purpose

A mark says one thing: this phrase is the subject. It is typography, in the same family as
a rule or a small-caps lead-in. It holds still, and it does not respond to the pointer, the
scroll or focus. A mark that moves or reacts reads as a control, and a mark is not one.

## When a mark is used

- At most one mark per section.
- Underline: one to three words, 24 characters or fewer, in a heading set at 20 px or more.
- Highlight: one phrase in a lede or a body sentence.
- Never on a link, a control, a figure, a whole sentence or trailing punctuation.

The atlas heading in shot-05 ("Total contracted bandwidth, 2025–26", four words and a date,
the whole title) breaks the first two rules. Under this proposal that title carries no mark,
or marks one or two words of it.

## Underline geometry, against the type

- A straight, square-ended rule of constant thickness. No taper, sag, shear, lift-off hook
  or seed.
- Thickness `clamp(2px, 0.08em, 5px)`, floored to whole device pixels, so the rule is always
  a solid run of pixel rows: 2 px at 28–30 px type, 3 px at 42 px, 5 px at 64 px and above
  (at 1x; at 2x, 30 px type gets 2 px and 42 px gets 3 px).
- Top edge 0.14em below the measured baseline, snapped to the device pixel grid.
- The baseline is measured from the host's own computed font, never from face constants:
  canvas `measureText` gives `fontBoundingBoxAscent` and `fontBoundingBoxDescent`, and
  `baseline = rect.top + (rect.height − (ascent + descent)) / 2 + ascent` for each line
  rect. Today's mark reads Plus Jakarta Sans metrics written into `stroke.ts`
  (`X_HEIGHT = 0.5444`, `DESCENDER = 0.2086`), so under any other face it sits at the
  wrong depth.
- Extent: exactly the line rect, from `rect.x` to `rect.x + rect.width`. No overrun.

## Descenders

The rule breaks around descenders with real gaps, not with a halo in the ground colour.
Atlas sets marks on translucent plates, where a ground-colour halo shows as a smudge.

The scan: draw the line's graphemes on a canvas, in the host's font, each at its own DOM
x position; read the band `[0.14em − c, 0.14em + t + c]` below the baseline column by
column at device resolution, with `c = max(1px, t/2)`; cut every inked column, widened by
`c` on each side; drop any remaining piece shorter than `2t`. With no canvas (SSR, a DOM
shim) the rule is unbroken.

**Known limit (RG-PF-08, judge 2026-11-11).** A phrase dense in descenders breaks into
pieces short enough to read as a dashed line: "by program" on /usf leaves four short
dashes, and "population" on /demand does the same. Moving the mark to other words would
patch a geometry limit at the consumer, so the sci call sites stay as they are. The rule
we propose for glass to judge: when any piece left after the cut would be shorter than a
set minimum, do not cut that fragment at all. Draw one unbroken rule for the whole
fragment, below the descender line (its top at the face's descender depth plus `c`), so
it clears every descender and still reads as one underline. The minimum is glass's to set;
a starting point is the larger of `6t` and one em of the host's type.

## Wraps

One rule per line fragment, each exactly its fragment's width, at the same offset and
thickness. A rule never bridges two lines.

## Highlight geometry

A flat rectangle behind the text, from 0.30em above the baseline to 0.12em below it
(0.42em tall), with a 0.08em shoulder at the phrase's two outer ends only. A wrapped phrase
gets one band per fragment, and only the first fragment's left end and the last fragment's
right end carry a shoulder. Four straight edges.

## Ink

- One focal ink, one strength.
- With `color` omitted, the ink is `var(--hm-ink, var(--primary))`. `--hm-ink` lets a route
  give its marks a focal ink that is not `--primary`.
- The underline paints the ink solid. The highlight paints
  `color-mix(in oklab, ink 28%, transparent)` on light paper and 34% on dark, through
  `light-dark()`. The text over the band keeps its own colour.
- `color` is a CSS colour for every shape. The hue-number form (`color="78"`) is removed
  and no longer type-checks.

## States

- Rest: whole.
- Drawn: glass 11.1.0's compositor clip-window wipe, left to right, on the `present`
  spring (`--spring-present`, `--spring-present-duration`), each line offset by 11.1.0's
  frame rank. Trigger `in-view`, once. Reduced motion and print: whole from frame 0.
- After the first draw a text change or a resize re-measures and paints whole, without
  replaying the draw.
- Removed: the scroll ink-lag and its scroll listener; the hover, press and focus re-ink;
  the opacity settle on the ink.

## API

`shape`, `color`, `draw`, `trigger`, `retrigger`, the `drawn` event. `weight` and `seed`
reach the strike and the ring only; the rule and the band ignore them. The strike and the
ring are unchanged from 11.1.0.

## What atlas needs that a general design would miss

1. Four faces at heading leading 1.05 to 1.2. The rule must find the baseline of whatever
   face is set, so its depth comes from the measured face box, not a calibration face.
2. A 16 px phone gutter the mark may not enter. Zero overrun keeps the rule inside the
   words, so it never reaches the gutter.
3. Translucent plates in both themes. Descender gaps are real gaps; a halo in the ground
   colour would show on a plate.
4. Long pages with many marks and no scroll work. The mark registers no scroll listener and
   reads no layout on scroll.
5. Filter changes that rewrite marked text. A text change re-measures and paints the mark
   whole, with no replay.
6. Plates exported to PNG with the mark present. A static mark at rest exports as it reads.
7. A per-route focal ink that is not `--primary`, hence `--hm-ink`.

## Measured faults of the current mark

From atlas's design pass on the preview build, captures in
`/Users/mkbabb/Programming/.u-build/out/ow-design/mark-hover-dock/`
(`p2-mark0-light.png`, `p2-mark0-dark.png`, `p2-mark0-390-dark.png`, `p2-mark1-light.png`,
`p2-mark1-dark.png`, `p2-mark1-390-dark.png`, `p2-mark2-light.png`, `p2-mark2-dark.png`):

- The stroke overruns the phrase: 6.6 px before and 8.7 px after a 475 px phrase.
- At 390 px the ink enters the 16 px phone gutter.
- A 10.6 px tall box carries a 3.9 px nib.
- Its baseline comes from hard-coded Plus Jakarta Sans metrics.
- Two ink strengths: a solid stroke and a separate band colour derived from a hue.
- Reported by glass and by Gregg: the underline crosses descenders.

## Before and after, from this line's demo run

Glass demo route `/motion/handmark`, a section set in IBM Plex Sans at 28, 42 and 64 px,
a phrase wrapped over two lines and a highlight in a body sentence. "Before" is the mark at
`u/ow-integ-glass` (228380e2b); "after" is this proposal. Chromium headless, 1280 × 900.

- `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/plex-light-before.png`
- `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/plex-light-after.png`
- `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/plex-dark-before.png`
- `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/plex-dark-after.png`
- At 3x, under "school year":
  `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/school-year-light-before.png`,
  `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/school-year-light-after.png`,
  `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/school-year-dark-before.png`,
  `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/school-year-dark-after.png`
- The draw, one sample per frame as the 64 px mark enters view:
  `/Users/mkbabb/Programming/.u-build/out/ow-design/glass-type-mark/draw-strip.json`
- The descender gap under "school year", read from two screenshots (rule alone, glyphs
  alone): `school-year-gap-light.json` and `school-year-gap-dark.json` in the same folder.

Measured on the after run (`tests-visual/handmark-rule.spec.ts`, Chromium, light and dark):

- Left and right ink edges equal the text rect's within 0.5 px at 28, 42 and 64 px.
- Thickness 2, 3 and 5 px at 28, 42 and 64 px; top edge at baseline + 0.14em within 0.5 px,
  on a whole pixel row. The baseline is read by an inline-block probe set on it, not by the
  component's own arithmetic.
- Under "school year" the rule is in two pieces; no rule pixel touches glyph ink and every
  rule pixel has at least 1 px of clear ground between it and the y.
- The wrapped phrase has two rules, each its fragment's width within 0.5 px.
- The band is 0.42em tall within 0.5 px with its bottom at baseline + 0.12em; the marked
  text reads at 4.5:1 or more against the band composited on its card, in both themes.
- No scroll listener from HandMark; the ink's offset from the text is constant over 30
  scroll frames; hovering and pressing start no animation; `--hm-ink` on an ancestor
  recolours a mark with no `color`.
- The draw's visible right edge advances monotonically, never passes the text's right edge,
  and is whole in about 200 ms, inside the present duration (200 ms at this tempo). With
  reduced motion the first frame is whole.

## How it is built on the atlas line (provisional)

Files: `src/components/handmark/HandMark.vue`, `src/components/handmark/stroke.ts`,
`src/components/handmark/index.ts`, all with a PROVISIONAL header.

- Copied verbatim first from glass `release/11.1.0` (the compositor draw, `trigger`,
  `retrigger`, `drawn`, the focal-ink default), then changed.
- `stroke.ts` gains `faceMetrics(font)`, `measuredBaseline(rect, face)`,
  `ruleThickness(fs, dpr)`, `ruleGaps(glyphs, …)`, `ruleMark(rect, top, t, gaps)` and
  `bandMark(rect, baseline, fs, ends)`, plus the `HandColor` type. `handBand`,
  `BAND_HEIGHT` and the band's chisel are deleted; `handLine`, `handRing` and
  `strokeRibbon` stay for the strike and the ring.
- `HandMark.vue`: the underline and the highlight call the new geometry; the ink-lag, the
  re-ink, the hue path and the ink settle are deleted; the default `trigger` is
  `in-view`; a finished draw comes to rest so a re-measure never replays; a
  `MutationObserver` re-measures on a text change.

## Open questions for glass's loop

- Should the default `trigger` be `in-view` for every consumer, as here, or only for marks
  below the fold?
- The rule ignores `weight`. Should a heavier rule exist at all, or is thickness purely a
  function of the type size?
- The highlight's 28% / 34% strengths were chosen for contrast on atlas's paper and dark
  plates; glass may want them as tokens.
