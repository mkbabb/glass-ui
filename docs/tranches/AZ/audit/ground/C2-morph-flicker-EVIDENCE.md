# C2-morph-flicker — R3-3 dock hover-edge morph flicker (LIVE repro evidence)

Live route: http://localhost:5199/dock/overview (dock-capture dock, `:collapse-delay="600"`).
Frame-sampled via rAF loop on the `.glass-dock` box (getBoundingClientRect reflects
transform `scale`), `--dock-morph-t`, `scale`, `.expanded`/`.collapsed`, `[data-morphing]`.
Raw trace: `C2-morph-flicker-trace.json` (561 frames, 3 interaction vectors).

## The smoking-gun frame sequence — collapse-onset scale POP

At the instant a HOVERED, expanded dock begins collapsing (`.collapsed` class flips on
while the pointer is still inside the box, so `:hover` is still true):

| t (ms) | width | painted right edge | data-morphing | expanded | --dock-morph-t | scale |
|---|---|---|---|---|---|---|
| 4149.1 | 535.7 | 948.8 | 1 | 0 | 0.0000 | **1.1** |
| 4192.2 | 535.7 | 948.8 | 1 | 0 | 0.0000 | **1.1** |
| 4194.8 | 467.3 | 914.7 | 1 | 0 | 0.0458 | 1 |
| 4233.2 | 358.3 | 860.1 | 1 | 0 | 0.3000 | 1 |

Painted-right-edge JUMPS measured across the onset:
- t=4149.1: right 924.5 → 948.8  (**Δ +24.3px**, held ~43ms / 2 frames)
- t=4194.8: right 948.8 → 914.7  (**Δ −34.1px**, next frame)

That ±~30px two-frame geometric pop at the leading edge IS the user-reported flash/flicker.

## Root cause (geometric, not a state-machine thrash)

`.glass-dock.collapsed:hover { scale: var(--dock-collapsed-hover-scale) /* 1.1 */ }`
— src/styles/dock/morph.css:232-237.

The `.collapsed` class is set SYNCHRONOUSLY when collapse begins (useDockState.ts
state→"collapsed"), but the box is still painted at EXPANDED width for the morph's
leading frames (`--dock-morph-t` re-bases from 0 over the first rAF — the pin/measure
defer in dockMorphContext.ts onSwap, lines 281-360). For those leading frames the
`.collapsed:hover` `scale:1.1` multiplies the still-535px box (instead of the intended
54px collapsed circle), so the painted edge pops +24px, then snaps back as the morph
width catches up and `scale` settles to 1. The hover scale is designed for the small
resting pill; it is wrong for the morph's transient large-box frames.

## Listener-geometry corroboration (the FLIP hover-thrash substrate)

- `@mouseenter`/`@mouseleave` are bound to the MORPHING `.glass-dock` root itself
  (GlassDock.vue:247-248) — the hover boundary moves WITH the box.
- There is NO hysteresis, NO frozen sentinel rect, NO pointer-capture during the morph
  (useDockState.ts onMouseEnter/onMouseLeave, lines 178-207). onMouseEnter is INSTANT
  (collapsed→hover→expand on the same tick); onMouseLeave is timer-buffered by
  `collapseDelay` (600ms here, 2500ms default), which is why a steady-state ±1px jitter
  and a rapid in/out sweep did NOT produce a rapid expand-collapse-expand class thrash
  (0 fast 3-flip oscillations in the 500ms window). The buffered leave masks the
  state-machine thrash; the geometric scale-pop above is the residual visible defect.

## Shell docks are NOT on this seam

BottomDock (`always-expanded`, BottomDock.vue:85) and SidebarDock (vertical rail,
always-expanded) short-circuit onMouseEnter/onMouseLeave (useDockState.ts:179,189
`getAlwaysExpanded()` early-return) and have no collapse↔expand morph. R3-3's
"(+ the shell docks)" does not apply — the flicker is the COLLAPSIBLE-dock-only case
(`/dock/overview`, `/dock/layers`).

## Secondary observation (intermittent, separate)

In one repro pass `forceCollapse` flipped `.collapsed` on but the width stayed 487
(`--dock-morph-t` never advanced past 0 — collapse class set, morph did not fire to the
54px circle). Consistent with the documented first-mount/measurement-timing FLIP
mis-seat (dockMorphContext.ts:328-343, BOOKED AY.W-GOD1). Not the C2 flicker itself but
shares the onSwap measure pipeline.
