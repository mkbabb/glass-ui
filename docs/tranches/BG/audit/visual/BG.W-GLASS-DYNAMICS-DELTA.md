# BG.W-GLASS-DYNAMICS — dual-engine PAINT verdict

**Verdict: PASS.** Non-authoring paint judge, dual-engine (Chrome Metal + Safari WebKit),
both modes, over BUILT bytes (`demo:dist` → `vite preview` :5200, NOT :5199 dev).
Judged 2026-07-03. All 16 capture PNGs resolve on disk at 2880×1800.

The wave strengthened the neutral specular-hairline read-carrier + the iOS-27 backdrop-hue
sample seam + the press-coupled `--glass-btn-press-t` (CSS `glass/material.css` + JS
`composables/glass/useSpecularPointer.ts`). Paint verification was owed at W-REFLECT; per §0
(reflect funnel abolished) it is discharged HERE on non-authoring dual-engine paint.

## Method (the proven C18 pipeline)

- **Built bytes.** `npm run demo:dist:build` → `npm run demo:dist:serve` (vite preview → :5200).
  Demo main CSS carries `-webkit-backdrop-filter` (webkit=53) — the Safari blur pairing ships.
- **Chrome leg** — real Chrome.app (Chrome/149) + CDP :9477, `chromium.connectOverCDP`,
  `newContext` deviceScaleFactor 2 + `colorScheme` per mode → `?capture=<route>&mode=<m>` →
  `waitForFunction data-capture-ready` → GL_RENDERER probe → `page.screenshot`.
  GL_RENDERER = **ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)** on all 8 (real Metal, not SwiftShader).
  Script: `BG.W-GLASS-DYNAMICS-paint/chrome-capture-all.mjs`; facts: `chrome-facts.json`.
- **Safari leg** — off-screen WKWebView (`docs/tranches/BG/audit/wkshot-live.m` compiled to
  `BG.W-GLASS-DYNAMICS-paint/wkshot-live`), system WebKit.framework/Metal, no Screen-Recording TCC;
  polls `data-capture-ready` → `takeSnapshotWithConfiguration` → 2880×1800. GPU badge = **Apple GPU**.
- **Provenance = the in-pixel top-left `#ff00ff`-fiducial badge** (ENGINE/GPU/VIEW/MODE), decoded
  straight from the captured pixels — the judge does not take the builder's word for which engine
  produced which bytes.

## Routes × engines × modes (16 PNGs, all on disk)

| Route | Chrome L | Chrome D | Safari L | Safari D |
|---|---|---|---|---|
| /foundations/paper-glass | gd-chrome-paper-glass-light.png | gd-chrome-paper-glass-dark.png | gd-safari-paper-glass-light.png | gd-safari-paper-glass-dark.png |
| /substrates/glass-material | gd-chrome-glass-material-light.png | gd-chrome-glass-material-dark.png | gd-safari-glass-material-light.png | gd-safari-glass-material-dark.png |
| /display/buttons | gd-chrome-buttons-light.png | gd-chrome-buttons-dark.png | gd-safari-buttons-light.png | gd-safari-buttons-dark.png |
| /display/card | gd-chrome-card-light.png | gd-chrome-card-dark.png | gd-safari-card-light.png | gd-safari-card-dark.png |

(all under `docs/tranches/BG/audit/visual/BG.W-GLASS-DYNAMICS-paint/`; downscaled views in `./view/`.)

## Criteria verification

### Gate — `proof:glass` glass-dynamics (read-carrier) arm — GREEN
```
GD1 rest hairline : box-shadow=✓  opacity-floor=✓  (the read-carrier at the demoted blur)
GD2 neutral fence : hairline-neutral=✓  (raw hsl(40 35% 92%); prismatic reserved for WS6)
GD3 backdrop-hue  : seam=✓  (bounded, neutral default — the 2nd chromatic pair)
GD4 press-couple  : css=✓  js=✓  no-fork=✓  (the ONE --glass-btn-press-t channel, soft-gated)
self-test bites   : all teeth ✓  (9 glass-dynamics bites)
```

### The specular hairline READS across the glass read-carrier surface (computed + pixel)
Computed `getComputedStyle(el, "::before")` on a live glass surface, every route/mode:
- `beforeOpacity = 0.07` — the resting `::before` is LIT (the GD1 opacity-floor
  `max(--specular-intensity, --glass-specular-rest-hairline)` = `max(0, 0.07)`).
- `box-shadow = color(srgb 0.94902 0.929412 0.890196 / 0.7) 0px 0px 0px 0.75px inset` — a
  **0.75px NEUTRAL warm-cream inset hairline** (0.949/0.929/0.890 ≈ hsl(40 35% 92%), the GD2
  reference fence: RAW warm-cream, NOT accent/backdrop-hue). Prismatic reserved for WS6.
- `--specular-intensity = 0` at rest — confirming the hairline lights via the separate opacity
  floor, not the interaction-light channel. The read-carrier paints at rest with no pointer.
- Visually: the glass ladder plates (glass-material, paper-glass) and glass buttons carry a
  visible rim/hairline in BOTH engines, BOTH modes (the dark rims are the W-DARK-MATERIAL
  silhouette device).

### Press-couple (GD4, soft-gated) — READS with no rest regression
`--glass-btn-press-t` resolves to its property-regs.css default `0` at rest, so the base
`--specular-intensity` reads `max(rest, 0.16*0) = rest` byte-identical (no hard F5.1 dependency).
CSS + JS halves gate-green; `useSpecularPointer.ts` folds the optional `press` onto the ONE
`--glass-btn-press-t` channel (no forked `--*-press-t`). The static-plate fence is deliberate
(blanket tier-root pointermove delegation DECLINED; ASK-GU-LIQUIDHOVER PARTIAL) — a static plate
is not force-armed; a `:pressable` Card / Button glass variant auto-arms the gleam (ONE rule).

### Recessive aurora — no conic, no oversaturation (pixel)
Background field sample (top-right region, away from text/cards), saturation + local-gradient:
| capture | meanSat | maxSat | localGradient (banding) | meanRGB (warm?) |
|---|---|---|---|---|
| chrome glass-material light | 0.326 | 0.396 | 2.8 | 229,190,154 (R>G>B ✓) |
| chrome glass-material dark  | 0.521 | 0.579 | 2.8 | 142,103,68 (R>G>B ✓) |
| safari glass-material light | 0.264 | 0.318 | 1.8 | 240,208,177 (R>G>B ✓) |
| safari glass-material dark  | 0.571 | 0.609 | 2.0 | 109,77,47 (R>G>B ✓) |
| chrome/safari paper-glass light | 0.072/0.071 | 0.075/0.076 | 0.5/4.1 | ~227,220,211 (warm-neutral ✓) |
| chrome/safari paper-glass dark  | 0.255/0.284 | 0.258/0.297 | 0.1/1.7 | ~66,56,48 (R>G>B ✓) |

- **localGradient all < 5** — smooth gradients, NO conic banding (a conic seam spikes 20–50+).
- **maxSat ≤ 0.61, warm R>G>B in every sample** — NO oversaturation/neon/rainbow; the dark
  glass-material 0.52–0.61 is the INTENDED luminous warm-brown transmissive dark register, not clipping.

### Content, grain, hero-fit
- **Content present** — `main.children.length = 3` on every route/mode (full route, not bare-shell/blank);
  glCanvas 1–3 (no context leak).
- **Grain calm** — paper-grain reads as a soft texture behind the glass tiers (paper-glass), no
  disco/noisy pop; both engines.
- **Hero fits its envelope** — "Glass Material" / "Paper & Glass" / "Buttons" / "Card" hero
  headings wrap within the viewport width, no overflow, both modes both engines.
- **Dark register** — luminous warm-brown transmissive material (not a dead charcoal void);
  glass plates carry bright edge rims as the silhouette device.
- **Cross-engine parity** — WebKit `-webkit-backdrop-filter` blur PAINTS (paper-grain visibly
  blurred behind the Safari glass tiers, both modes) → the glass read-carrier reads identically
  in both engines.

## Observation (out of scope, recorded not fixed)

The WHOLE `proof:glass` gate reports FAIL — but on a DIFFERENT wave's arm, `safari-blur-var`
(BG.W-GLASS-REGISTER-UNIFY): "could not locate the `bdfDeclRe` webkit-backdrop matcher in
vite.style-assets.ts". This is a gate SOURCE-LOCATION assertion for that wave's refactor, NOT a
paint defect on the glass-dynamics surfaces: the BUILT demo CSS carries 53 `-webkit-backdrop-filter`
declarations and the Safari captures show the blur painting correctly in every mode. My wave's arm
(glass-dynamics GD1–GD4 + 9 bites) is GREEN. The `safari-blur-var` failure is routed to
BG.W-GLASS-REGISTER-UNIFY, not this wave.

## Verdict

**PASS** — every surface in BOTH engines (Chrome Metal M5 Max + Safari WebKit Apple GPU), BOTH
modes, reads correct AND every capture PNG resolves on disk. The neutral specular hairline +
press-coupled drive READ across the glass read-carrier surface; the aurora is recessive (no conic,
no oversaturation); grain calm; hero fits. Cursor flipped PAINT-PENDING → DONE.
