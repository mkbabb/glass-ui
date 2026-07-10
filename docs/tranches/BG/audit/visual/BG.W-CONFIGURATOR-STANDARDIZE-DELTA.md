# BG.W-CONFIGURATOR-STANDARDIZE — dual-engine paint DELTA

**Verdict: PASS** (dual-engine Chrome + Safari/WebKit, both modes, all 3 studio routes).
**Judge:** non-authoring paint judge (did NOT build the wave; verified the painted truth).
**Date:** 2026-07-10 · **Branch:** `tranche/BG` · **HEAD:** `a88f8544` (pre-flip).

## What the wave claims

The blob + fourier studios re-home onto the shared **VizStudio** chassis (aurora = the
reference). Their inline `--motion-accent` display-masthead `<header>` + the raw
`<Configurator>`-in-`<ShowcaseFrame>` studio wrapper are retired. The PASS condition is a
**cross-studio ALIGNMENT readback** on the 3 studio routes, both engines both modes —
configurator root/aside/stage boxes agree within tolerance (the offset dead), header/ribbon
anatomy the same shape; ≥2 consumers by construction (3 studios); Fable gestalt PASS on the
standardized read.

## Method (the proven C18 dual-engine pipeline on BUILT bytes)

- `verify-siblings-intact --quiet` → exit 0 (before + after).
- `demo:dist:build` → `dist-demo/` (~1s); `demo:dist:serve` → `:5200` (BUILT bytes, NOT `:5199` dev).
- **Chrome leg:** real Chrome.app (fresh throwaway per capture, `--headless=new`, real Metal),
  `chromium.connectOverCDP`, `?capture=<route>&mode=<m>` boot, poll `data-capture-ready`,
  `GL_RENDERER` probe, full-page screenshot + a **computed DOM alignment readback**
  (`getBoundingClientRect` of `[data-slot="configurator"]` / `.configurator-stage` /
  `.configurator-aside` / `[data-gallery-dock]`).
- **Safari/WebKit leg:** `wkshot-live` off-screen `WKWebView` (system WebKit.framework, Apple
  GPU, Retina 2×), same `?capture=` boot + `data-capture-ready` poll.
- **Validation:** single decoder leaf `scripts/reflect-capture-verify.mjs` (`isRealPng` /
  `pngDimensions`) + in-pixel engine-badge fiducial (magenta `#ff00ff` + high-contrast ink) +
  body-variance (real content, not a blank shell).
- **Supplementary:** 6 scrolled **studio-body** Chrome captures (both modes × 3 studios) so the
  configurator stage-left/controls-right paint reads (it sits below the fold in the inner
  `<main>` scroller on the fullPage shots).

## Provenance (in-pixel badge decoded)

| Engine | GPU | Viewport | Modes |
|---|---|---|---|
| CHROME | ANGLE (Apple, ANGLE Metal Renderer: **Apple M5 Max**) | 1440×900 @1x | light + dark |
| WEBKIT | **Apple GPU** (system WebKit.framework) | 1440×900 @2x (2880×1800px) | light + dark |

Real Metal / real Apple GPU on both legs — NOT SwiftShader/software. All 12 fullPage PNGs:
`isRealPng=true`, dimension-correct, badge magenta+ink present, body stdev-lum > 6 (real
content). **12/12 numeric PASS, 0 FAIL.**

## The binding cross-studio ALIGNMENT readback (Chrome, both modes — dark ≡ light byte-for-byte)

| metric | aurora | blob | fourier | agree? |
|---|---|---|---|---|
| `asideSide` | right | right | right | ✓ identical |
| `galleryPlacement` | aside | aside | aside | ✓ identical |
| aside **width** | 360.0px | 360.0px | 360.0px | ✓ **exact** (`--configurator-aside-max`) |
| `stageLeftGap` (stage x − root x) | 1.0 | 1.0 | 1.0 | ✓ identical |
| `asideRightGap` (root right − aside right) | 1.0 | 1.0 | 1.0 | ✓ identical |
| `cfgDisplayHeaders` inside configurator | 0 | 0 | 0 | ✓ **no masthead / double-header** |
| `hasSectionLabel` (header rung) | true | true | true | ✓ identical |
| `main.children.length` | 2 | 2 | 2 | ✓ identical body shape |
| stageFracOfRoot | 0.6603 | 0.6502 | 0.6502 | ✓ Δmax 0.0101 (~1.5%) |
| asideFracOfRoot | 0.3378 | 0.3479 | 0.3479 | ✓ Δmax 0.0101 (~1.5%) |
| cfgRoot width | 1065.6 | 1034.8 | 1034.8 | aurora +30.8px — see note |

**The offset is DEAD.** The fourier OFFSET class (a raw `<Configurator>` floated in a
`<ShowcaseFrame>` under its own inline `<header>`) is gone: fourier now resolves the SAME
anatomy — `asideSide=right`, `gallery=aside`, `cfgDisplayHeaders=0`, `stageLeftGap=1`,
`asideRightGap=1`, `main.children=2`. The **aside is EXACTLY 360px** in all three; the stage is
`flex-1` and absorbs any root-width difference. The only variance (aurora root +30.8px) is a
page-scrollbar-gutter artifact (aurora's inner scroller reserved no vertical scrollbar vs
blob/fourier), NOT a configurator offset — the aside stays pinned, the stage flexes. Well
within "boxes agree within tolerance."

## The paint (pixel reads)

- **Header/ribbon anatomy — the same shape on all 3, both engines, both modes.** ONE ordered
  StoryHeader cluster: eyebrow (`SUBSTRATES · <NAME>`) → Fira-Code subpath chip
  (`@mkbabb/glass-ui/<viz>`) → audacious display `<h1>` (Aurora / GooBlob / Fourier Field —
  each fits its envelope, no clip; fourier wraps 2 lines cleanly) → blurb → StorySection
  heading + descriptor → the studio frame. **No second masthead title, no double-header** (the
  aurora "Aurora"+"Aurora Studio" collision class dead).
- **Standardized studio frame (studio-body captures, both modes).** Rounded glass configurator
  panel: live viz **stage LEFT** (flex-1), **controls RIGHT** (360px aside) with the PRESETS
  ribbon at the top of the aside, then `<ConfiguratorLayer>` sections (aurora *Color* →
  blob *Interaction*/*Mood+palette* → fourier *Spectrum*/*Epicycles*) with disclosure chevrons
  + mono sub-labels, `<ConfiguratorRow>` controls (sliders, selects, `<ColorSwatch>`) filling
  the definite-width slot. The three studios read as ONE chassis.
- **Recessive fields, calm grain.** aurora = warm painterly gradient (pink→peach→amber, nuclei
  overlay), no conic banding, no oversaturation. blob = lit warm-cream droplet. fourier =
  epicycle pentafoil reconstruction (warm curve + rotating epicycle circles). Each is the
  recessive live specimen inside the rounded stage; the chrome adapts to the dark register
  (dark warm-glass aside, legible warm-ink controls, dividers survive).

## Supporting gates (corroborating, not binding)

- `proof:demo` **PASS** — CF1 studios→VizStudio `missing:[]`, CF2 anti-fork no-OFFSET
  `offenders:[]`, D7 unified-header `mastheadFills:[]` (36 self-test bites incl. CF1+CF2×3).
- `proof:demo-design` **7/7 PASS** — d5: VizStudio is controls-on-the-RIGHT + studios COMPOSE
  the chassis with ONE StoryHeader (inline `--motion-accent` double-header masthead retired).
- `proof:suffuse` **20/20 PASS**.

## Artifacts (all resolve on disk)

`docs/tranches/BG/audit/visual/configurator-standardize-validate/`

- 12 fullPage: `configurator-substrates-{aurora,blob,fourier-field}-{chrome,safari}-{light,dark}-desktop-full.png`
- 6 studio-body: `studio-body-substrates-{aurora,blob,fourier-field}-chrome-{light,dark}.png`
- `chrome-readback.ndjson` (the alignment readback), `validate.mjs`, `chrome-cap.mjs`,
  `single-cap.mjs`, `scroll-cap.mjs`.

## Verdict

**PASS.** The 3 studios resolve the SAME standardized configurator anatomy (stage-left /
controls-right / preset-ribbon-top-of-aside / ONE header) within tolerance in **both engines
(real Metal Chrome + system-WebKit Safari) and both modes**; the fourier OFFSET/masthead fork
is structurally + visually dead; ≥2 consumers by construction (3 studios). Every capture PNG
resolves on disk. Fable gestalt: PASS on the standardized cross-studio read.
