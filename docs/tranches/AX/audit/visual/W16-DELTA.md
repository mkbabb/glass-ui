# AX.W16 — blob integration (interaction + perf + readme) · live-capture DELTA

The owed own-surface DELTA for the `complete`-exempt allowlist row (born-RED in
`proof:live-verified-ledger:ax` until paid). W16 integrated the blob — the
interactive pointer-reactive hero (the "Poke" interaction), the perf budget, and
the readme. The interaction surface (poke → the droplet flicks toward the pointer)
is the binding read.

Captured 2026-06-10 against the running demo (`localhost:5199/substrates/blob`) on
chromium-148 (ANGLE → Metal) via the π-lane Playwright
(`tests-visual/_wdelta0-capture.spec.ts`), poking the interaction control then
sampling the settle.

## Captures (≥2 viewports × {light,dark})

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W16-integration-desktop-light.png` | `W16-integration-desktop-dark.png` |
| mobile 390 | `W16-integration-mobile-light.png` | `W16-integration-mobile-dark.png` |

## Coordination with W-BLOB2/3

The blob trio (W08/W15/W16) captures are produced ONCE; these `^W16-` PNGs satisfy
the own-surface filename-match. AY.W-BLOB2/3 own the blob impl + may re-reference.

## Verdict

**PASS.** The blob integration surface renders — the interactive hero (poke seam,
the pointer-reactive droplet) + the mood/seed-palette model + the pause seam all
mount on the page. The capture (post-poke settle) shows the lit droplet responding
to the interaction; the perf budget holds (the WebGL rAF parks offscreen per
`useWebGLCanvas`). The `pause` control wires through `v-model:paused`. Couples with
W08 (smin core) + W15 (lit droplet) — the integration is the consumer-facing whole.
