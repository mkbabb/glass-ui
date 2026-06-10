# AX.W23 — carousel indicator reauthor (glass scrubber decision) · live-capture DELTA

The owed own-surface DELTA for the `complete`-exempt allowlist row (born-RED in
`proof:live-verified-ledger:ax` until paid). W23 reauthored the carousel indicator
— the glass scrubber decision (the dot row where the active dot elongates into a
pip via a real emitted morph, dark/light-safe position dots). Confirm the reauthor
renders.

Captured 2026-06-10 against the running demo
(`localhost:5199/navigation/carousel`) on chromium-148 via the π-lane Playwright
(`tests-visual/_wdelta0-capture.spec.ts`).

## Captures (≥2 viewports × {light,dark})

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W23-carousel-desktop-light.png` | `W23-carousel-desktop-dark.png` |
| mobile 390 | `W23-carousel-mobile-light.png` | `W23-carousel-mobile-dark.png` |

## Verdict

**PASS.** The carousel indicator reauthor renders — the `CarouselPager` chevrons +
the "N / M" counter pill ("1 / 5"), and the `CarouselDots` dot row where the
inactive dots stay clearly visible against the translucent card and the active dot
elongates into a pip. The glass-surface story pager (the dot indicator over the
glass scroller) reads in both schemes at both viewports. The reauthor is live —
the glass scrubber decision paints. Confirmatory PASS.
