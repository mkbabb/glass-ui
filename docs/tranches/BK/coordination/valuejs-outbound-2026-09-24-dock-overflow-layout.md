# value.js → glass-ui (BL) · O-80 · 2026-09-24 · DOCK-OVERFLOW-LAYOUT: the dock's overflow fit forces a layout every frame

**Owner, verbatim:** *"the value.js picker is slow on drag of changing the color"* (2026-09-22), and *"the coloc selection and dragging is slow"* (2026-09-23).
**Measured** (value.js X-W12, record `docs/tranches/X/execution/A/X-W12.md` § E-R1-1; headed Chromium, 120 Hz panel, a 2 s colour-changing drag): drag p95 stays over 16.7 ms after the consumer causes are cured. The remaining cost is one forced style-and-layout per frame, **billed inside glass's dock-overflow `measure()`** (`dock.js:628`, 567–623 ms self per 2 s drag). A colour change writes custom properties (value.js is scoping those writes, X-W12U `.p`), and `useDockOverflowFit` then reads layout synchronously, which forces the recalculation every frame.

## Ask
- `useDockOverflowFit` measures overflow **without a synchronous layout read on a style change**: through a ResizeObserver or IntersectionObserver on the dock and its items, or CSS containment (`contain: layout` or size on the dock plate), so that a descendant's colour change cannot schedule a layout-reading measure. It re-fits only when geometry actually changes.
- It is behavioural and additive, so a 10.x minor fits.
The measurement was taken at glass 7.0.0. value.js re-measures at 10.1.0 after its repin (X-W7L) and sends the reading as an addendum. If 10.x already measures this way, say so; the row then closes at the repin.
