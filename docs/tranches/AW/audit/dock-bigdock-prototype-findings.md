# Big-dock variant — live browser prototype findings (orchestrator, 2026-06-07)

Empirical grounding for the dock-perfection convergence's big-dock-variant wave. Done by
injecting a prototype into the live demo (`localhost:5173/navigation/dock`) — the one thing the
research agents cannot do.

## The blocker: the single-row pill assumption

A prototype dock with 8 controls in `grid-template-columns: repeat(4, auto)` + `grid-auto-rows:
auto` rendered as a SINGLE row (measured: dock 197×55, layer 178×**40**, cols `40px 40px 40px
40px`). The 2nd row overflowed/collapsed because **`.dock-layer { height: var(--dock-layer-height,
2.5rem) }` (dock.css) hard-clamps the layer to one row height.** The whole dock architecture
assumes a single-row pill whose only morph axis is width (or height for vertical rails) — it
cannot grow into a 2D multi-row/column content area.

## What the big-dock (`shape="rounded"` / a new `size="panel"`) variant needs

1. **`.dock-layer` height MUST become `auto`** (or `min-height`) in the big-dock variant so the
   grid wraps to N rows. The single-row variants keep the fixed `--dock-layer-height`.
2. **A 2D grid content mode** — the active layer lays out controls in a multi-col / multi-row
   grid (`white-space: normal`, `grid-template-columns`, auto rows), not a nowrap flex row.
3. **Card-radius, not pill** — `shape="rounded"` already resolves to `--radius-card` (~16px in the
   prototype), which reads correctly for a large surface. The pill `--radius-pill` is wrong for a
   big dock (it would over-round the corners of a tall box). Confirm `shape="rounded"` (or the new
   variant) selects card-radius and the collapsed pill stays `--radius-pill`.
4. **The morph grows in BOTH dimensions** — the FLIP/spring + the container↔content lockstep clip
   must be axis-agnostic (clip both axes during the morph; measure both the width AND height
   intrinsic content size). The current `useLayerTransition` measures/drives ONE `dim`
   (width|height); a big dock that grows in both needs the lockstep to clip both axes (the clip is
   already both-axis via `overflow: hidden`; the SIZE drive is single-axis — the big dock either
   grows one axis at a time or the driver extends to a 2D morph).

## Ties to the lockstep finding

The container↔content "float" (content paints at full extent while the box morphs) is WORSE for a
big dock (the 2D content overflows a 1D-morphing box dramatically). The clip-to-the-morphing-box
mechanism (overflow:hidden during the gesture, visible at rest) is the fix and must clip BOTH axes
for the big dock. The cleanup-timer-fires-mid-morph bug (cleanupDelayMs reads `transition: none` →
~50ms) must be fixed (key off the spring settle ≈ response×6) or the clip clears mid-morph.

## API sketch (to converge with the workflow's plan)

`<GlassDock variant="dock" size="panel" shape="rounded">` (or a dedicated `big`/`panel` variant):
card-radius, `.dock-layer` auto-height grid content, both-axis lockstep clip, both-axis morph.
The single-row pill stays the default. Clean break, no legacy.
