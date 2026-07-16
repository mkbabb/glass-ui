# BI.W-P043 — Finish the shared canvas lifecycle seam

**Status:** DONE — PRODUCT COMPLETE
**Topological stratum:** BI.S15
**Terminal owner:** glass-ui

## Authority

The lifecycle foundation now has one observer and backing-size path across procedural
renderers. This wave does not authorize a new substrate, resource ledger, fake-device
framework, or browser-proof system.

## Live state

- `createCanvasLifecycle` owns scheduling, suspend reasons, tab visibility,
  content-visibility, reduced motion, resize presizing, optional intersection parking,
  context recovery, and disposal.
- WebGL2 and WebGPU compose that lifecycle.
- Canvas2D composes the same resize observer, intersection park, and backing-size
  measurement while preserving its CSS-pixel transform and parked repaint.
- Constellation is already on the Canvas2D path and must retain its public behavior.

## Shipped product work

The bounded implementation:

1. Gave `Canvas2DOptions` a DPR policy preserving the present
   `min(devicePixelRatio, 2)` behavior.
2. Passes that policy and the existing root margin into `createCanvasLifecycle`.
3. Lets the shared lifecycle own resize measurement and intersection parking.
4. Makes Canvas2D resize upload-only from `BackingSize`: restores the CSS-pixel
   transform and repaint a genuinely resized parked surface once.
5. Deletes Canvas2D's local resize/intersection observers and self-measurement.

Primary files:

- `src/composables/glass/canvas2d/useCanvas2D.ts`
- `src/composables/glass/webgl/createCanvasLifecycle.ts` only if its legacy optional
  resize shape can be simplified without widening the change
- focused lifecycle tests beside those files

## Protected behavior

- Aurora, Blob, Constellation, FourierField, LiquidGrid, and WatercolorDot retain their
  current timing, reduced-motion, pause, wake, seed, and teardown behavior.
- No scene-local frame loop is rewritten merely for uniformity.
- Aurora's pre-arm visibility scheduling remains an intentional deferred-init concern.

## Acceptance

- Canvas2D has no local `ResizeObserver` or `IntersectionObserver`.
- One shared backing-size calculation produces the current CSS-pixel drawing contract.
- Resize, hidden/offscreen parking, reduced motion, wake, and dispose remain covered by
  focused unit tests.
- This behavior-preserving foundation batch requires no browser pass. No Playwright
  suite or persistent evidence apparatus is added.

## Dependencies

This is the narrow foundation predecessor for P044 and P045. It does not block already
completed scene work in P048 or P051.
