# PagerDots

`@mkbabb/glass-ui/pager-dots` — the ONE position-dot rail, and the survivor of the
windowed-sequence fold. Both registers compose it: the carousel's dots and a
presentation deck's group pager are this component, over the substrate's ONE
window oracle (`sequenceWindow`, from `@mkbabb/glass-ui/deck`).

## The paint

Three layers, and the split is not about a filter: a crisp **bed** of N pips, the
**worm** masses above it, and the transparent **hit-targets** above both, which own
every scrap of interaction.

The active indicator is a two-edge liquid worm — it elongates, travels, and
re-forms on the next dot. It is **filterless**. A `{circle, rect, circle}` union at
the bodies' own diameter *is* a stadium; the SVG blur-and-threshold graph and the
Bézier clip-path floor beneath it bought one or two pixels of concavity on a
thirteen-pixel body at a canon-forbidden `filter: url()`, and the `@supports not
(filter: url())` degrade was unreachable because both shipping engines answer that
probe true. The goo-morph edict is kept where it was always kept: `translate` and
`scale`.

The worm layer is **opaque**. At 0.65 it carried the entire active/inactive
distinction at 2.223:1 against a sole-carrier law demanding 3:1, *and* composited
over the undimmed bed pips into a frame-dependent multi-level slug. At 1 it
occludes what it sits on, so the bed's active-pip dimming has nothing left to dim
and is gone with its token.

## The driver

    trail = lead − clamp(v_lead · τ_e, ±ceil)

Elongation **is** velocity: the gap peaks early, where the eye is, and is exactly
zero the frame the lead lands. The predecessor's exponential trail follower could
not arrive — `τ·ln(gap/ε)` for any τ — and spent about a second of hairline neck
after both bodies had visibly landed, on a hop that itself ran fourteen hundred
milliseconds against a two-hundred-and-twenty millisecond register.

The lead is the governed `dock` preset, read from the table. The ceiling is a band,
`clamp(pitch, |Δ|·0.55, 3·pitch)`, so a neighbour hop bridges one pitch and an
eleven-cell hop stretches to three and reads as eleven.

The geometry is measured once — one origin and one pitch describe every cell in a
uniform grid — so the per-frame paint reads no style at all, and the worm's target
is the *settled* centre even while the bed is mid-FLIP.

## The window, and its two policies

Keyboard and programmatic steps **recentre**. A pointer activation **nudges**: the
minimum slide that keeps the activated index one cell inside the edge, so the
touched dot never moves out from under the pointer. When the window does slide,
the surviving pips are placed back where the eye last saw them and released to
their new cells on the coordinated-travel spring, staggered outward from the
active one — so one hop reads as one hop either way.

## Keyboard

The rail is the library's ONE paging key table, and it is bound to this root — no
`window` or `document` listener exists in this component or the carousel. Exactly
one tab stop (the active dot); axis-derived arrows; Home/End; PageUp/PageDown;
digit jumps 1–9; wrapping; disabled dots skipped. Focus follows activation,
because a keyboard step is a selection.

## Geometry

Rail gap **4** · pip **12** · hit cell **24** (WCAG 2.5.8, a named law, not a
series rung) · pitch **28** · coarse-pointer target floor **44** (the cell grows;
the painted pip does not). One gap token feeds the bed, the buttons and the ring
chassis, so the eight-pixel bed/button drift is structurally unreachable rather
than fixed.

## Announcement

`slideLabel` and the owned polite region: the rail owns the count, the active
index and the accessible name, so it owns the "Slide 3 of 8: Materials"
announcement. Pass `:announce="false"` when the host already has one.

## Props

`count` · `v-model:active` · `orientation` · `windowFit` · `ring` · `pattern`
(`"group"` default — `"tabs"` is only correct with real `panelIds`) · `panelIds` ·
`slideLabel` · `announce` · `ariaLabel`.
