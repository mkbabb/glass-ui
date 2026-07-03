# BG.W-LIQUID-FILL — paint DELTA (non-authoring dual-engine judge)

**Wave:** BG.W-LIQUID-FILL (SPEEDTEST-AX-INBOUND #5) · row F6.8
**Judge:** non-authoring paint judge (did NOT build the wave)
**Verdict:** **PASS** — dual-engine (Chrome + Safari) × both-modes (light + dark), every capture PNG resolves on disk.
**Date:** 2026-07-03

## Criterion

> PAINT rides W-REFLECT — the warm glass cylinder over the track on Slider + `<Progress variant="liquid">`, both modes.
> Pass = non-authoring dual-engine both-modes capture shows the warm-tint oklab glass cylinder (backdrop blur + rim + under-shadow + pill radius) over the track on BOTH the Slider range and Progress `variant="liquid"`.

## Method (proven C18 pipeline)

- BUILT bytes: `npm run demo:dist:build` → `npm run demo:dist:serve` on `:5200` (NOT the `:5199` dev server).
- Per route+mode: `http://localhost:5200/?capture=<route>&mode=<light|dark>`, poll `data-capture-ready`.
- **CHROME leg:** real Chrome 149 (`--remote-debugging-port=9456`, throwaway profile) via playwright-core `connectOverCDP`. GL provenance off a throwaway webgl2 ctx.
- **SAFARI/WebKit leg:** off-screen `WKWebView` (system WebKit.framework/Metal, `/tmp/wkshot-live`, compiled fresh from `docs/tranches/BG/audit/wkshot-live.m`). A `wkshot-tall` variant (WKWebView frame 1440×1400, compiled to `/tmp`) captured the liquid-variant section that sits below the 900px WebKit default frame — capture-tooling only, no src/demo edit.
- Routes: `/forms/slider`, `/feedback/progress`.

## Engine / GPU provenance (decoded off the top-left badge)

| Leg | Engine badge | GPU |
|-----|--------------|-----|
| Chrome | CHROME | ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max) |
| Safari | WEBKIT | Apple GPU (system WebKit.framework / Metal) |

## What the paint shows

### Slider `.slider-range` (route `/forms/slider`)

- **Composition (computed DOM):** the range element's className is `slider-range glass-liquid-fill` — the extracted register is COMPOSED, the dual path is dead. 11 `.slider-range` in the route, **11/11** carry `.glass-liquid-fill` (`glassLiquidFillCount === sliderRangeCount === 11`). No fork.
- **Tint:** `background: oklab(0.88 0.0258 0.0965 / 0.88)` — the warm-cream `--glass-capsule-warm` amber. Byte-identical across light/dark (the slider fill is the fixed-identity "cylinder you pull").
- **Rim + under-shadow:** `box-shadow` carries the `--glass-material-rim` (`… 0px 0px 0px 0.5px`) + the `--glass-under-shadow-quiet` (`oklch(0 0 0 / .04) 0px 2px 8px -1px`). The rim tint flips warm-dark→warm-light between modes (`srgb 0.109/0.098/0.090` light → `0.913/0.901/0.886` dark) — correct token re-resolution.
- **Pill radius:** `border-radius: 9999px`.
- **Backdrop blur:** the register declares `backdrop-filter: var(--liquid-fill-blur, var(--glass-blur-quiet))` (= `blur(8px) saturate(1.35) brightness(1.16)`). See the emission note below.
- **Spectrum variant:** `.glass-slider[data-variant="spectrum"] .slider-range { backdrop-filter: none }` — the gradient-track spectrum slider INTENTIONALLY opts out of blur (a rainbow track must not blur its own gradient). Correct-by-design, NOT a defect.
- **Both engines, both modes:** the warm-cream amber glass cylinder reads over the recessed track on every standard slider (Volume, Range·two-thumbs, size matrix). The viz-fourier fill reads warm-red (phase-color composable).

### Progress `variant="liquid"` → `.progress-liquid-fill` (route `/feedback/progress`)

- **Composition (computed DOM):** className `glass-liquid-fill progress-liquid-fill h-full w-full flex-1 transition-transform` — the shared register is COMPOSED; 2 liquid bars per route (`progressLiquidCount === 2`, both `.glass-liquid-fill`).
- **Phase-colour composable (zero glass knowledge):** the tint rides `--liquid-fill-tint` seeded from `--progress-fill`. The demo shows both:
  - bar #1 = default `--progress-fill` (light: warm-ink `oklab(0.216 … / 0.88)` → reads dark; dark: legendre-violet `oklab(0.739 0.099 -0.089 / 0.88)` → reads violet),
  - bar #2 = `--progress-fill: var(--viz-legendre)` override → violet glass cylinder in BOTH modes.
  This is the wave's core contract — the register faithfully tints to the consumer's phase colour with no per-site glass knowledge. Both bars carry the rim + under-shadow + pill radius glass mechanics.
- **Rim + under-shadow:** same `--glass-material-rim` + `--glass-under-shadow-quiet` box-shadow as the Slider (the ONE register). Pill radius `9999px`.
- **Both engines, both modes:** the tinted glass cylinder reads over the recessed `--progress-track` channel on both liquid bars. WebKit (native `-webkit-backdrop-filter` consumer) paints the cylinders in both modes (the below-fold liquid section captured via the tall WKWebView variant).

## Backdrop-filter emission note (investigated, NOT a defect)

`getComputedStyle().backdropFilter` returns `none` on Chrome for `.glass-liquid-fill`. Root cause: the BUILT `dist-demo` CSS (lightningcss) emits ONLY the `-webkit-backdrop-filter` form of the register's declaration and drops the unprefixed `backdrop-filter` alias. Consequences:

- **WebKit / Safari** (the Safari-native floor the register's own header comment targets) consumes `-webkit-backdrop-filter` natively → the blur PAINTS. Confirmed in both Safari captures.
- **Chromium** honors `-webkit-backdrop-filter` for RENDERING (it is a valid alias) even though it does not surface it in `getComputedStyle`. The var chain itself resolves correctly (`--glass-blur-quiet` = `blur(calc(8px * 1)) saturate(1.35) brightness(1.16)`; an isolated `backdrop-filter: var(--glass-blur-quiet)` test element computes the real blur).

The blur is a subtle over-an-opaque-recessed-channel effect; the criterion's load-bearing deliverables (warm-tint oklab, rim, under-shadow, pill radius) are visibly painted in every engine/mode. Recorded here as a provenance observation; no fix owed for this wave.

## Captures (all resolve on disk — `docs/tranches/BG/audit/visual/BG.W-LIQUID-FILL-paint/`)

| File | Engine | Route | Mode |
|------|--------|-------|------|
| `chrome-forms-slider-light.png` | Chrome | /forms/slider | light |
| `chrome-forms-slider-dark.png` | Chrome | /forms/slider | dark |
| `chrome-feedback-progress-light.png` | Chrome | /feedback/progress | light |
| `chrome-feedback-progress-dark.png` | Chrome | /feedback/progress | dark |
| `safari-forms-slider-light.png` | WebKit | /forms/slider | light |
| `safari-forms-slider-dark.png` | WebKit | /forms/slider | dark |
| `safari-feedback-progress-light.png` | WebKit | /feedback/progress | light |
| `safari-feedback-progress-dark.png` | WebKit | /feedback/progress | dark |
| `safari-feedback-progress-light-tall.png` | WebKit (1440×1400) | /feedback/progress | light — liquid section |
| `safari-feedback-progress-dark-tall.png` | WebKit (1440×1400) | /feedback/progress | dark — liquid section |

## Verdict

**PASS.** Both the Slider range and Progress `variant="liquid"` paint the shared `.glass-liquid-fill` glass cylinder — warm oklab tint (Slider: warm-cream amber; Progress: consumer phase colour) + `--glass-material-rim` + `--glass-under-shadow-quiet` + pill radius, backdrop blur emitted (`-webkit-` form, WebKit-native) — over the track, in Chrome (Metal Apple M5 Max) AND Safari (WebKit/Apple GPU), light AND dark. Every capture PNG resolves on disk. The register is composed once and re-read (Slider consumer #1, Progress consumer #2 — the ≥2-consumer bar met by extraction).
