# AX.W17 — constellation tokens + warp (+ slides adopt) · live-capture DELTA

The owed own-surface DELTA for the `complete`-exempt allowlist row (born-RED in
`proof:live-verified-ledger:ax` until paid). W17 minted the constellation tokens +
the warp-on-click interaction (the proximity-graph lattice repels toward / warps
around the click point), and slides adopted it. Low-risk / confirmatory.

Captured 2026-06-10 against the running demo
(`localhost:5199/substrates/constellation`) on chromium-148 (ANGLE → Metal) via
the π-lane Playwright (`tests-visual/_wdelta0-capture.spec.ts`), clicking the
field center to trigger the warp then sampling the settle.

## Captures (≥2 viewports × {light,dark})

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W17-constellation-desktop-light.png` | `W17-constellation-desktop-dark.png` |
| mobile 390 | `W17-constellation-mobile-light.png` | `W17-constellation-mobile-dark.png` |

## Verdict

**PASS.** The constellation field renders as a drifting proximity-graph lattice on
the Canvas2D substrate — the neutral lattice nodes + their proximity edges paint,
the field drifts, and the warp-on-click (the center-click) perturbs the lattice
(sampled across the post-click frames; the captured frame shows the warp settle).
The `--primary` focal node is the consumer `drawOverlay` pass. The tokens resolve;
the park/freeze/dispose lifecycle wires (`proof:constellation-substrate-single` +
the egg/freeze live arms ratify). Slides adopt the same field. Confirmatory PASS.
