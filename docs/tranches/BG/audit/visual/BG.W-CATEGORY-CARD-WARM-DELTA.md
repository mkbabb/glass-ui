# BG.W-CATEGORY-CARD-WARM — NON-AUTHORING dual-engine paint VERDICT

**Verdict: PASS** · 2026-06-29 · judge: non-authoring paint judge (did NOT build this wave)

The recessive warm bento field (WS4, `9e13965d`) lands its intent: every category-landing
(SectionLanding) sub-category card (`SectionPreviewCard`, a `glass-resting` plate) composites
**WARM** in both modes, both engines, all three routes. The user-reported "awful metallic wash"
(a cool/neutral silver sheen) is structurally ABSENT — every card-plate measurement carries the
warm `R>G>B` signature, a warm OKLCh hue (47–80°), and chroma above the 0.008 gray floor. Titles
clear AA (worst 8.28:1) everywhere.

## Method (the C18 `?capture=` harness over BUILT bytes on :5200)

- `npm run demo:dist:build` → `dist-demo/`; `npm run demo:dist:serve` → vite preview `:5200` (curl 200 confirmed).
- **Chrome leg:** real `Google Chrome.app` `--remote-debugging-port=9456`, playwright `connectOverCDP`,
  `newContext({viewport:1440×900, deviceScaleFactor:2, colorScheme:<mode>})`,
  `goto(:5200/?capture=/<route>&mode=<mode>)`, poll `data-capture-ready`, GL_RENDERER via
  `WEBGL_debug_renderer_info`, `screenshot` → 2880×1800. Script: `BG.W-CATEGORY-CARD-WARM/chrome-capture.mjs`.
- **Safari/WebKit leg:** `wkshot-live.m` compiled UNDER glass-ui (`docs/tranches/BG/audit/visual/wkshot-live`,
  NEVER /tmp — the foreign-tree/no-/tmp fence honored), polls `data-capture-ready` → 2880×1800.
- All 12 PNGs verified `2880×1800` (`sips`), in-pixel magenta-bordered engine badge decoded per capture.

## Engine provenance (in-pixel badge decode)

| Engine | Badge ENGINE | Badge GPU | Modes captured |
|--------|--------------|-----------|----------------|
| Chrome | `CHROME` | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` | light + dark |
| Safari | `WEBKIT` | `Apple GPU` | light + dark |

Real Metal-backed Chrome + real WebKit/Apple-GPU Safari — NOT SwiftShader, NOT a headless stub.

## Computed-DOM checks

- **One-GL-per-route held.** Exactly ONE GL context per route — a single recessive shell
  `aurora-canvas--armed` (1440×900; the sibling WS1 `BG.W-FIELD-AURORA` shell field). The bento warm
  field itself is a STATIC CSS radial (`.section-bento::before`), no extra GL. `glContextCount == 1`.
- **Bento field is warm by token (computed `getComputedStyle(.section-bento, ::before)`):**
  - light forms/data: `oklch(0.91 0.085 44)` · light display: `oklch(0.91 0.085 75.6)` — warm amber/yellow, hue ∈ [25,95].
  - dark forms/data: `oklch(0.4 0.06 44)` · dark display: `oklch(0.4 0.06 75.6)` — **low-L ember (L 0.4 < 0.5), chroma KEPT** (the W-DARK-MATERIAL luminous-dark glow, never charcoal).

## Painted-truth pixel reads — card-plate grain (mean OKLCh over the title-row plate, 2× coords)

Warm criterion: hue ∈ [25,100]° AND chroma ≥ 0.008 (gray floor) AND `R>G>B`. Every cell passes.

| Config | engine·mode | meanRGB | L | C | H° | warm | aboveGray |
|--------|-------------|---------|------|--------|------|------|-----------|
| forms-light  | chrome·light | 174,160,149 | 0.715 | 0.0222 | 62.4 | ✓ | ✓ |
| forms-dark   | chrome·dark  | 80,68,61    | 0.396 | 0.0205 | 51.8 | ✓ | ✓ |
| display-light| chrome·light | 174,162,144 | 0.718 | 0.0287 | 79.8 | ✓ | ✓ |
| display-dark | chrome·dark  | 79,69,58    | 0.397 | 0.0221 | 70.2 | ✓ | ✓ |
| data-light   | chrome·light | 174,160,149 | 0.715 | 0.0222 | 62.5 | ✓ | ✓ |
| data-dark    | chrome·dark  | 80,68,61    | 0.396 | 0.0206 | 51.8 | ✓ | ✓ |
| forms-light  | safari·light | 181,169,160 | 0.742 | 0.0189 | 56.1 | ✓ | ✓ |
| forms-dark   | safari·dark  | 88,74,68    | 0.422 | 0.0216 | 47.7 | ✓ | ✓ |
| display-light| safari·light | 181,170,158 | 0.744 | 0.0218 | 69.6 | ✓ | ✓ |
| display-dark | safari·dark  | 87,75,65    | 0.423 | 0.0223 | 63.8 | ✓ | ✓ |
| data-light   | safari·light | 181,169,160 | 0.742 | 0.0189 | 56.1 | ✓ | ✓ |
| data-dark    | safari·dark  | 88,74,68    | 0.422 | 0.0216 | 47.7 | ✓ | ✓ |

Card-plate chroma ranges **0.0189–0.0287 (2.4–3.6× the 0.008 gray floor)**; the warm `R>G>B`
signature is unambiguous in every config. The inner preview windows + bento gaps read even
warmer (light gaps C≈0.049–0.052 H≈43–47°; dark ember gaps C≈0.038–0.051 H≈39–43°).

## Titles AA (computed title color over mean composited plate)

Light routes = black title; dark routes = white title. WORST = **8.28:1** (chrome forms/data light).
All 12 clear AA (4.5:1) — and clear AAA (7:1):

`chrome 8.28–9.41:1 · safari 8.41–9.21:1`. Even a +2σ bright grain speckle keeps white-on-dark ≥ 7.6:1.

## Gestalt pixel reads (the visual criteria)

- **Recessive aurora — no conic, no oversaturation.** The shell field reads as a calm warm wash;
  no conic-gradient banding, no neon/oversaturated stops in any capture.
- **Grain calm.** Card-plate luminance std-dev ≈ **9% relative** (vs 0.4% flat-wash ref) — the
  standard always-present `.glass-grain` paper texture, NOT a disco-grain pop. PASS.
- **Hero fits its envelope.** The display `<h1>` ("Forms"/"Display"/"Data") fits within the hero
  card; no overflow/clip in either engine.

## Honest note (non-blocking)

The light-mode card-plate BODY is on the muted end (lowest chroma C 0.0189 on Safari forms/data
light) — a warm *taupe* rather than a vivid peach, because the translucent `glass-resting` plate
+ always-present paper grain desaturate the field it transmits. This is categorically WARM
(hue 56°, `R>G>B`, above the gray floor), NOT the cool/neutral metallic sheen the user reported;
the dark-mode ember is unambiguously warm (mahogany/terracotta). Criterion met. Recorded for
transparency, not a defect.

## Captures (all resolve on disk, 2880×1800)

Chrome: `BG.W-CATEGORY-CARD-WARM/chrome-{forms,display,data}-{light,dark}.png`
Safari: `BG.W-CATEGORY-CARD-WARM/safari-{forms,display,data}-{light,dark}.png`
Scripts: `BG.W-CATEGORY-CARD-WARM/{chrome-capture,oklch-sample,grain-std,probe-geom}.mjs`

**PASS — dual-engine (Chrome+Safari), both modes, /forms + /display + /data: cards read WARM liquid
glass, ZERO metallic/gray, titles AA. Cursor row 10.25 → DONE.**
