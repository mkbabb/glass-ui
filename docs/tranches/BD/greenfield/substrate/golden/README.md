# substrate GOLDEN spike — run + result

Throwaway spike de-risking the two boldest moves of the GOLDEN (`../GOLDEN.md`):
**G1 `sizeBacking()`** (the canonical gBCR-ancestor sizer, NEVER 300×150) and **G6 the
reveal bloom** (§L7-safe compositor squish-grow, PRM-carved). No glass-ui src touched — the
mechanism is provable standalone.

## Run
```sh
cd docs/tranches/BD/greenfield/substrate/golden && python3 -m http.server 8731
# open http://localhost:8731/index.html — it self-verifies in the page (window.__SPIKE_RESULT__).
```

## Result — ALL PASS (Chrome, Metal-3 host, dpr 2) · `spike-result.png`

| Check | Result |
|---|---|
| A1 focal backing == round(box×dpr) | 1904 == 1904 (box 952 × dpr 2) |
| A2 focal backing NEVER 300×150 | 1904×640 |
| B1 golden sizer is gBCR-based, not clientWidth-dependent | gBCR-box 952 → backing 1904 |
| B2 below-fold backing recovered via gBCR-ancestor (NOT 300×150) | 1904×640 |
| B3 below-fold backing == round(box×dpr) | 1904 == 1904 |
| C1 sizeBacking idempotent (changed:false on no-op) | changed=false |
| **C2 golden recovers ancestor box where legacy FREEZES** | **golden 1200×600 vs legacy 640 (320-const freeze)** |
| D1 reveal animates ONLY transform/opacity/filter (§L7-safe) | props: transform, opacity, filter |
| D2 reveal squish is volume-preserving (X·Y≈1 at anticipate) | 0.86×0.78 / 0.80×0.86 deformation present |

**The decisive proof (C2):** on a canvas whose own box is 0 but whose laid-out ancestor has a
real 600×300 box (the true born-skipped trap), the golden walks to the ancestor and recovers
`1200×600`; the legacy `clientWidth||320` sizer freezes at the `320` constant → `640`. This is
the live aurora-stuck-canvas defect reproduced and cured head-to-head.

**Finding worth carrying into the wave:** `clientWidth` is NOT reliably 0 under a
content-visibility skip (Chromium reported 952 here) — which is precisely why the golden uses
`getBoundingClientRect` + the ancestor walk, never `clientWidth`. The legacy consumers' reliance
on `clientWidth || constant` is the root of the drift.

## Maps to the GOLDEN
- G1 `sizeBacking` body = the exact function shipped to `createCanvasLifecycle.ts`.
- G2 synchronous-at-mount = the focal canvas is sized before any GPU device (pure CSS geometry).
- G6 reveal = the `.substrate-reveal` recipe + `@keyframes substrate-bloom` on
  `--ease-cartoon-punch`, the PRM `@media` collapse to an instant fade.
