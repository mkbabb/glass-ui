# Inbound O-166 and O-167: parkway NPIG G10 and G11

These came in on 2026-11-05 at night from sci-report-36. The owner saw them on parkway in dark mode at 1440, on 10.1.4. The frames are in `~/Programming/slides/docs/tranches/NPIG/feedback/2026-11-05b/`.

The composition is in parkway `src/components/dock/` (read-only), in this order:
- DockControl seats
- a DockSeparator
- a Slider
- three icon seats, with the DarkModeToggle last

## O-166 (G10): an expanded plate squared on its leading end

In `ss-18.56.09.png` the expanded GlassDock plate is square at the leading end and round only at the trailing end. This is the r1 cut-cap family on a dock that hosts a Slider. The gate is g1 on this composition, expanded and at rest, in both themes and both engines: all four corners are the rest length, and the run's `sw == cw`.

The owner also wants the expand and collapse motion smoothed. The morph itself is out of 10.1.5's scope, since its rewrite comes later. In 10.1.5 the expand and collapse must not jump, snap or flash, and a critic traces both on this composition. A defect there that 10.1.5's own code introduced is in scope.

## O-167 (G11): the Slider inside the dock

In `ss-19.23.59.png` and `ss-19.22.12.png`, in dark mode, the scrubber's fill reads as a brown pill, which the owner calls "a stain". It also slides and expands jerkily.

The fill's tint is glass's own default, `--slider-range-bg` falling back to `--glass-capsule-warm`, not parkway's choice. r5 already reworks the thumb and fill. The cures:
1. In dark mode the default fill reads as a calm ink on the plate, not a warm brown, and the dock's Slider is judged against N-16 (no over-lit colour).
2. Dragging tracks the pointer with no lag or stepping. The fill and the thumb move on the same frame as the input, with no transition on the dragged extent.
3. When the dock expands, the Slider settles once, without remeasure jumps.

The witness is the dock-hosted Slider in this composition, in both themes and both engines, red on v10.1.4 for (1) and for whichever of (2) and (3) reproduce.

Tell the orchestrator if parkway should set a token on its side, and which one.
