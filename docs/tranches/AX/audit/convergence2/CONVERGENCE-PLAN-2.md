# AX convergence-2 plan — wave-update ledger (pass-2 live audit + SOTA research)

Synthesis of the 24-lane research+audit (`convergence2/`) + the tranche/wave audit + the
orchestrator live MCP pass. SOTA-grounded (Apple WWDC25 Liquid Glass, iOS 26/27 adaptive
vibrancy, CSS `corner-shape: superellipse()` shipped Chrome 139). Dedup-confirmed at source.

## NET-NEW waves (no existing wave owned these)

| New | Title | Folds | SOTA recipe |
|---|---|---|---|
| **W53** | tabs-unify | T1/T2/T3/T4 | ONE `Tabs`, three variants: **segmented (default)** / pill / underline, ONE shared elastic liquid indicator on `--spring-snappy` (the confirmed iOS segmented register). Merge BouncyToggle (keep the slider engine + multi-select), DELETE the BouncyTabs shim, fold UnderlineTabs → `variant="underline"`, subsume ResponsiveTabs (responsive = an option), DROP the "Bouncy" prefix + sweep ALL consumers. dependsOn W05. |
| **W54** | glass-first-class | G1 | Mint `--glass-level` ONE `@property` scalar (default 1) threaded through BOTH ladders at their single sites (opacity + blur radii), so a surface dials glassiness; an explicit `opaque`/solid escape. NOT glass-everywhere (would re-break W52 legibility + no-glass-on-glass). dependsOn W52. |
| **W55** | adaptive-glass-legibility | G2 | iOS-26/27 SOTA: a `--glass-backdrop-luma` declarative bucket via the SHIPPED `@container style()` mechanism; the bright bucket lifts `--glass-tint-strength` to a bounded AA floor (≤~18-24%) + re-points `--glass-tint-source` warm-ink — the darken-over-light move in the existing `color-mix(in oklab)` seam, ZERO new compositing. `contrast-color()` `@supports`-gated. `proof:adaptive-glass` (W00 harness, 4.5:1 over white). dependsOn W52+W00. |
| **W56** | squircle-design-language | G3 (foundational) | `corner-shape: superellipse()` (Chrome 139, ~65% global, spec-stable). Mint `--corner-k-{squircle:2,soft:1.7,sharp:2.4}` (parallel to `--radius-*`) + semantic `--corner-shape-{card:round, pill:round, bigdock:superellipse(k), panel:round}` in theme.css. Rounded for cards/docks, SUPERELLIPSE for big-docks + the like. `@supports` fallback to `--radius-*`. MANY waves consume it. |
| **W57** | demo-radial-reauthor + pulse-calm | P6/P7 | Re-baseline the `.pulse-aura` ambient (center stop 0.55→~0.22, earlier falloff, element opacity ~0.4); replace hand-rolled demo radial heros with `<Aurora>` (page viz colors) or `<Constellation>` for befitting pages. |

(Prune wave: glass-carousel excision (P4) + use-token-color (P1) + disco-glyph/glyph-face (P2/P3)
fold into **W19** as additional excisions, not a new wave.)

## AUGMENTS to existing waves (no new wave)

- **W45 (dock region-model)** ← the WHOLE dock band: DK1 collapse-icon timing (no added delay),
  DK2 hover/select state (glass-aware four-state), DK4 big-dock icon alignment, DK5 separators
  (the DockSeparator it already plans), DK8/DK9 rail bg + vertical-vs-rail identity. It already
  owns GlassDock.vue + dock.css + dock-controls.css.
- **W01 (dock morph)** ← DK6/DK7 dock-LAYER first-class animation (the lag — the FLIP/spring on
  the W02 orchestrator; the layer crossfade smoothness). The layer transition rides one clock.
- **W23 (carousel)** ← P5 Apple-glass carousel (liquid-pill indicator + `.interactiveSpring`
  drag-follow + snappy settle).
- **W05 (spring vocab)** ← the CONFIRMED Apple preset NUMBERS: pin regen-spring `--spring-*` to
  smooth(0.5s,0)/snappy(0.5s,0.15)/bouncy(0.5s,0.3); the press-squish via interactiveSpring→snappy.
- **W52 (liquid-glass)** ← RATIFY (the research confirms the bounded-gleam/plus-lighter direction);
  the volume-preserving press-squash atom (maxStretch ~1.06-1.10, restrained — iOS 26.2 dialed DOWN).
- **W18/W40 (demo IA)** ← P8 speedtest-grid idiom, P10 story-text de-superfluity, DK10 dock section.
- **W19 (primitive prune)** ← P1/P2/P3/P4 (use-token-color, disco-glyph, glyph-face, glass-carousel).
- **W21** ← P1 the use-token-color demo icon → DarkModeToggle.
- **W48** ← P9 glass-material demo (re-confirm post-W52).
- **W36** ← coordinate the opaque a11y path with W54/W55.

## Sequencing (the convergence-2 execution)

**Foundational first** (many waves consume them): W56 (squircle tokens) + W54 (glass-level) — the
token axes. Then W53 (tabs-unify), W55 (adaptive-glass), W57 (demo radials). The dock band augments
(W45/W01) + W23/W05/W52 ratify in parallel. Each closes on the LIVE real-device audit via
chrome-devtools-mcp (the cardinal lesson) — never a headless gate.

## The cardinal-lesson re-verify list (suspect-complete)

W15/W16 (blob — D4/D5/D7 → W46), W23 (carousel not Apple-glassy → P5), the dock band (W01-W04 —
the user flags collapse timing/layer lag/rail still wrong → W45/W01 augments). Re-audit live.
