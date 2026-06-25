# D14 — the `.scroll-cascade--columns` entrance is dead (invalid calc → animation-range: normal)

**Orchestrator-confirmed LIVE (2026-06-25, localhost:5266 /foundations/colors).** The user: "the
colors page used to have a subtle and cute animation for the color palettes on scroll — why is that
gone, too." Captured here for the BG scroll-motion convergence.

## Root cause (definitive, runtime-verified)

The palette grid composes `.scroll-cascade.scroll-cascade--columns` (BD W-SCROLL-MOTION). The columns
variant OVERRIDES `animation-range` at `src/styles/scroll-choreography.css:233-240`:

```css
.scroll-cascade.scroll-cascade--columns > * {
    animation-range: entry 0%
        entry
        calc(var(--scroll-cascade-range-end, 45%) + var(--scroll-cascade-column-stagger, 60ms) * 0);
}
```

`calc(45% + 60ms * 0)` adds a **percentage to a time** (`60ms*0` = `0ms`, a `<time>`). `%` + `<time>`
is a TYPE MISMATCH → the `calc()` is invalid → the whole `animation-range` shorthand is dropped → it
computes to **`normal`**. Runtime confirmation on the live page: the cascade children carry
`animationName: gl-cascade-build` on a `ViewTimeline`, `playState: running`, but
`getComputedStyle(...).animationRange === "normal"` (NOT `entry 0% entry 45%`).

With `animation-range: normal`, a `view()`-timeline animation maps across the element's ENTIRE cover
passage (enter-bottom → exit-top) instead of the tight `entry 0%→45%` window, so the 1.25rem rise +
fade is stretched so gradually it is imperceptible — the entrance reads as GONE even though it is
attached + running. The `* 0` is a stubbed-out per-column stagger that (a) zeroes itself and (b)
poisons the `%`-typed property with a `ms` unit.

The base (non-columns) `.scroll-cascade > *` (line 209, `entry 0% entry var(--scroll-cascade-range-end, 45%)`)
is VALID and animates correctly — only the `--columns` arm is dead.

## The gestalt fix (for the scroll-motion wave)

Drop the invalid calc. The column stagger is carried by the even/odd DIRECTION (the
`gl-cascade-build-col-even` from-above keyframe), NOT by a range-end offset; and a genuine per-column
range stagger MUST be expressed in `%` (the timeline progress unit), never `ms`. Minimal:

```css
.scroll-cascade.scroll-cascade--columns > * {
    animation-range: entry 0% entry var(--scroll-cascade-range-end, 45%);
}
```

(or, if a real per-column range offset is wanted, `calc(... + var(--col) * <N>%)` — a `%` unit, off the
column index `--col` the recipe already references, not a time).

## Disposition

Folds into **WS4 · BG.W-SCROLL-SHRINK-UNIFY** (the scroll-motion register reconciliation) — the whole
`.scroll-cascade` family is audited there. **WS7's paint-gate must add a "cascade actually animates"
predicate** (a `.scroll-cascade--columns > *` whose computed `animation-range !== normal` AND whose
opacity transitions across an in-viewport scroll) — a units-mismatch that silently degrades to a
no-op entrance is EXACTLY the headless-green class WS7 closes. This is a class lesson: a CSS
`animation-range`/`calc()` type mismatch fails SILENTLY (no console error, the animation still
"runs") — the gate must read the COMPUTED range, not the declared one.
