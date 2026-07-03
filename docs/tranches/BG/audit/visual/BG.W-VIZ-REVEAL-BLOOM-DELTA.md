# BG.W-VIZ-REVEAL-BLOOM — dual-engine PAINT DELTA

**Wave** 6.4 · **Row disposition** AMEND (strip the orphan-delete — the `useVizChoreography` DELETE
is 10.5's; the reveal-bloom BUILD stays)
**Verdict** PASS (NON-AUTHORING dual-engine, both modes, at this wave's OWN close)
**Judge** non-authoring paint judge (did NOT build the wave)
**Date** 2026-07-03
**HEAD** `0c6ce56b` · branch `tranche/BG`

---

## What this wave is

The one-shot cold-first-VISIBLE procedural-viz entrance: a viz CANVAS blooms into being —
`filter: brightness()/saturate()` ramps from a dim floor, OVERSHOOTS past 1.0 (the
`--ease-cartoon-punch` linear() curve peaks at 1.22 progress so the single from→to interval
extrapolates past the settle), then monotone-settles to the canvas's own no-resting-filter rest
(a FIELD bloom — the canvas rect stays `scale(1)`, no box-zoom gutter). One-shot via the
`revealFired` guard (scroll-off-and-back fires ZERO second bloom); PRM → instant settled.

The `useVizChoreography.ts` DELETE is wave 10.5's (the dead-composable cut, DONE); this wave
carries only the reveal-bloom BUILD + its paint verification. Precond 10.5 dead-cut is DONE.

## Preconditions (computational)

| Check | Result |
|---|---|
| `useVizChoreography` DEFINITION-ABSENT (0 refs, no file, src+demo) | ✅ absent |
| `@keyframes substrate-reveal-bloom` present (`src/styles/viz-reveal.css`) | ✅ present (brightness 0.4→1, saturate 0.7→1) |
| CSS target = `canvas[data-substrate-reveal]` under `@media (PRM: no-preference)` | ✅ |
| `--substrate-reveal-duration` + `--ease-cartoon-punch` tokens | ✅ (`scheme-motion.css`) |
| Leaf sets one-shot `data-substrate-reveal` on first-VISIBLE IO + `revealFired` guard | ✅ (`createCanvasLifecycle.ts:556-591`) |
| 9 vizzes opt in `revealBloom: true` (aurora/blob/constellation/fourier/paper-grid/concentric/goo-dot/dot-matrix/dot-flow) | ✅ |
| Gate `proof:viz` GREEN incl. R1-R8 (R8 = viz-choreography-absent) | ✅ GREEN |

## The reveal-bloom PAINT (Chrome / real Metal GPU, LIVE non-capture)

Capture mode neutralizes CSS animations by design (settled-frame snapshots), so the reveal-bloom
overshoot is verified in a NORMAL demo load: per route, freshly navigate, then poll the canvas's
computed `filter` while the one-shot animation runs. `GL_RENDERER = ANGLE (Apple, ANGLE Metal
Renderer: Apple M5 Max)` — real Metal GPU.

| route\|mode | attr fired | anim present | peak brightness | overshoot | settles to | scale(1) |
|---|---|---|---|---|---|---|
| /substrates \| light | ✅ | ✅ | 1.1315 | +13.15% | 1.0 | ✅ |
| /substrates/aurora \| light | ✅ | ✅ | 1.1304 | +13.04% | 1.0 | ✅ |
| /substrates/blob \| light | ✅ | ✅ | 1.1317 | +13.17% | 1.0 | ✅ |
| /substrates/constellation \| light | ✅ | ✅ | 1.1314 | +13.14% | 1.0 | ✅ |
| /substrates/fourier-field \| light | ✅ | ✅ | 1.1305 | +13.05% | 1.0 | ✅ |
| /substrates \| dark | ✅ | ✅ | 1.1302 | +13.02% | 1.0 | ✅ |
| /substrates/aurora \| dark | ✅ | ✅ | 1.1308 | +13.08% | 1.0 | ✅ |
| /substrates/blob \| dark | ✅ | ✅ | 1.1305 | +13.05% | 1.0 | ✅ |
| /substrates/constellation \| dark | ✅ | ✅ | 1.1316 | +13.16% | 1.0 | ✅ |
| /substrates/fourier-field \| dark | ✅ | ✅ | 1.1317 | +13.17% | 1.0 | ✅ |

- **Overshoot ≥12% bar** — met on all 10 (13.0-13.2%, ~1% margin above the 12% floor).
- **Ramp shape** (representative, fourier-field dark): dim 0.677 → 0.782 → 0.882 → 0.987 → 1.051
  → 1.105 → **1.125 (peak)** → 1.085 → 1.054 → 1.024 → 1.006 → **1.0 (settle, flat)** — a single
  from→to interval extrapolating past 1.0 then monotone-settling, exactly the documented curve.
- **FIELD bloom** — `scale(1)` held on every frame (no box-zoom gutter): `scaleViolation=false` ×10.
- **One-shot guard** (/substrates, post-settle scroll-off-and-back): attr persists, animation
  finished (`filter: none` settled rest), scroll-back sample flat `minB=1 maxB=1` →
  `SECOND_BLOOM_FIRED: false`.

Probe scripts: `BG.W-VIZ-REVEAL-BLOOM-probe.mjs` + `BG.W-VIZ-REVEAL-BLOOM-oneshot-probe.mjs`.
Raw: `BG.W-VIZ-REVEAL-BLOOM-paint/probe-result.txt`.

## The settled-surface gestalt (dual-engine, both modes)

Static settled-frame captures over BUILT bytes on `:5200` (`?capture=<route>&mode=<m>`, C18 poll
`data-capture-ready`). Chrome via CDP (real Chrome.app / ANGLE-Metal M5 Max); Safari via off-screen
WKWebView (system WebKit.framework / Apple GPU). In-pixel engine badge decoded for provenance.

| route | engine | mode | recessive (no conic/oversat) | grain calm | hero fits | dark warm-ember | file |
|---|---|---|---|---|---|---|---|
| /substrates | Chrome/Metal | light | ✅ | ✅ | ✅ | — | chrome-substrates-light.png |
| /substrates | Chrome/Metal | dark | ✅ | ✅ | ✅ | ✅ | chrome-substrates-dark.png |
| /substrates/aurora | Chrome/Metal | light | ✅ warm-cream Dawn | ✅ | ✅ | — | chrome-aurora-light.png |
| /substrates/aurora | Chrome/Metal | dark | ✅ warm-amber-olive | ✅ | ✅ | ✅ | chrome-aurora-dark.png |
| /substrates/blob | Chrome/Metal | light | ✅ | ✅ | ✅ | — | chrome-blob-light.png |
| /substrates/blob | Chrome/Metal | dark | ✅ | ✅ | ✅ | ✅ | chrome-blob-dark.png |
| /substrates/constellation | Chrome/Metal | light | ✅ neutral lattice (NOT red anomaly) | ✅ | ✅ | — | chrome-constellation-light.png |
| /substrates/constellation | Chrome/Metal | dark | ✅ neutral lattice | ✅ | ✅ | ✅ | chrome-constellation-dark.png |
| /substrates/fourier-field | Chrome/Metal | light | ✅ | ✅ | ✅ | — | chrome-fourier-field-light.png |
| /substrates/fourier-field | Chrome/Metal | dark | ✅ | ✅ | ✅ | ✅ | chrome-fourier-field-dark.png |
| /substrates | Safari/WebKit | light | ✅ | ✅ | ✅ | — | safari-substrates-light.png |
| /substrates | Safari/WebKit | dark | ✅ preview stills paint | ✅ | ✅ | ✅ | safari-substrates-dark.png |
| /substrates/aurora | Safari/WebKit | light | ✅ WebGL field PAINTS recessive | ✅ | ✅ | — | safari-aurora-light.png |
| /substrates/aurora | Safari/WebKit | dark | ✅ | ✅ | ✅ | ✅ | safari-aurora-dark.png |
| /substrates/blob | Safari/WebKit | light | ✅ warm paper-grain | ✅ | ✅ | — | safari-blob-light.png |
| /substrates/blob | Safari/WebKit | dark | ✅ | ✅ | ✅ | ✅ | safari-blob-dark.png |
| /substrates/constellation | Safari/WebKit | light | ✅ surface paints (canvas off-screen — see note) | ✅ | ✅ | — | safari-constellation-light.png |
| /substrates/constellation | Safari/WebKit | dark | ✅ | ✅ | ✅ | ✅ | safari-constellation-dark.png |
| /substrates/fourier-field | Safari/WebKit | light | ✅ | ✅ | ✅ | — | safari-fourier-field-light.png |
| /substrates/fourier-field | Safari/WebKit | dark | ✅ | ✅ | ✅ | ✅ | safari-fourier-field-dark.png |

**20/20 PNGs resolve on disk, nonzero, 2880×1800 (deviceScaleFactor 2).** Provenance badge decoded
CHROME/ANGLE-Metal-M5-Max on all Chrome, WEBKIT/Apple-GPU on all Safari.

## Notes / accepted limitations

- **Reveal-bloom is engine-agnostic by construction.** The `@keyframes substrate-reveal-bloom` is
  baseline CSS shipped in the built `/styles` bytes (the same bytes both engines run); the leaf
  IntersectionObserver + `data-substrate-reveal` attr is engine-agnostic JS. The Chrome LIVE probe
  proves the animation runs (13% overshoot, both modes); the Safari leg proves the WebKit SURFACE
  paints correctly. WebKit supports filter-brightness `@keyframes` natively.
- **Off-screen WKWebView Canvas2D-viz blank is a KNOWN harness limitation, NOT a WebKit regression.**
  Per the DONE sibling wave 6.3, off-screen WKWebView throttles/suspends `requestAnimationFrame`
  (`document.hidden`), so the rAF-driven Canvas2D vizzes (constellation) show a blank canvas
  off-screen while the SURFACE/chrome/hero/type paint. The WebGL aurora/blob fields DO paint
  (fullscreen-triangle passes settle), and the VizStudio preview stills (data-URI) paint. The
  Playwright-WebKit cross-check in 6.3 confirmed the Canvas2D vizzes paint identically to Chrome
  when driven. This limitation is orthogonal to the reveal-bloom (a CSS animation), which is
  verified on the LIVE Chrome path.
- **Capture mode neutralizes CSS animations by design** (settled-frame snapshots) — so the static
  PNGs show the SETTLED gestalt (the correct check for recessive-aurora/grain-calm/hero-fits), and
  the reveal overshoot is the COMPUTED-DOM check on the LIVE non-capture path (above).

## Verdict

**PASS.** The reveal-bloom entrance PAINTS on the /substrates viz surfaces: ≥12% brightness
overshoot then settle (13.0-13.2% ×10), FIELD `scale(1)` bloom, one-shot guard holds (zero second
bloom), attr + getAnimations wired — LIVE on real Metal GPU, both modes. The settled-surface
gestalt reads correct (recessive aurora no conic/oversaturation, grain calm, hero fits envelope,
dark warm-ember) across BOTH engines (Chrome/Metal + Safari/WebKit) in BOTH modes. `useVizChoreography`
DEFINITION-ABSENT. All 20 capture PNGs resolve on disk.
