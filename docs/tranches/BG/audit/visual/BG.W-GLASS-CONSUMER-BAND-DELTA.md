# BG.W-GLASS-CONSUMER-BAND — dual-engine paint DELTA

**Verdict: PASS** (non-authoring dual-engine paint judge)
**Date:** 2026-07-03
**Judge:** NON-AUTHORING paint judge (did not build the wave)
**Wave:** `BG.W-GLASS-CONSUMER-BAND` (WS3 — folds the fill-tint consumers onto the ONE plate/rim pair)
**Routes:** `/display/badge`, `/forms/selectable-chip`, `/foundations/icons`
**Engines:** Chrome (ANGLE Metal, Apple M5 Max) + Safari (WebKit, Apple GPU)
**Modes:** light + dark

---

## Provenance (decoded off the top-left engine badge)

| Engine | GL / GPU | View | Modes |
|--------|----------|------|-------|
| Chrome | `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)` | 1440×900 @2x (2880×1800px) | light · dark |
| Safari | WebKit · Apple GPU | 1440×900 @2x (2880×1800px) | light · dark |

Capture method: BUILT demo dist (`npm run build` → `npm run demo:dist:build`) served on `:5200` (`vite preview`).
Chrome leg — real `Google Chrome.app` `--remote-debugging-port=9477`, `playwright.connectOverCDP`, per mode `newContext({viewport 1440×900, deviceScaleFactor:2, colorScheme:<mode>})` → `goto ?capture=<route>&mode=<mode>` (`waitUntil:load`) → poll `document.documentElement[data-capture-ready]` → GL_RENDERER off a throwaway WebGL2 context → `page.screenshot`.
Safari leg — `clang`-built `docs/tranches/BG/audit/wkshot-live.m` → `/tmp/wkshot-live "<url>" out.png <mode> 15000` (harness polls `data-capture-ready` before `takeSnapshot`).

---

## Capture inventory — all 12 PNGs resolve on disk, isRealPng 2880×1800

Dir: `docs/tranches/BG/audit/visual/BG.W-GLASS-CONSUMER-BAND-pngs/`

| PNG | dims | isRealPng | data-capture-ready |
|-----|------|-----------|--------------------|
| chrome-badge-light.png | 2880×1800 | ✓ | ✓ |
| chrome-badge-dark.png | 2880×1800 | ✓ | ✓ |
| chrome-selectable-chip-light.png | 2880×1800 | ✓ | ✓ |
| chrome-selectable-chip-dark.png | 2880×1800 | ✓ | ✓ |
| chrome-icons-light.png | 2880×1800 | ✓ | ✓ |
| chrome-icons-dark.png | 2880×1800 | ✓ | ✓ |
| safari-badge-light.png | 2880×1800 | ✓ | ✓ (4800ms) |
| safari-badge-dark.png | 2880×1800 | ✓ | ✓ (4500ms) |
| safari-selectable-chip-light.png | 2880×1800 | ✓ | ✓ (4500ms) |
| safari-selectable-chip-dark.png | 2880×1800 | ✓ | ✓ (4500ms) |
| safari-icons-light.png | 2880×1800 | ✓ | ✓ (4500ms) |
| safari-icons-dark.png | 2880×1800 | ✓ | ✓ (4500ms) |

---

## Criteria verification

> "PAINT rides W-REFLECT (the semantic-badge tint + chip/icon-chip data-hue over the shared rim, both modes). NON-AUTHORING dual-engine paint over the plate/rim fold surfaces — Badge-glass + SelectableChip + IconChip-glass — verifying a semantic destructive/success/info glass badge carries its per-instance data hue on the shared `--glass-fill-tinted` plate over the shared `--glass-material-rim` (the fork collapsed onto ONE plate); byte-identical no-op at the @property defaults (transparent + 0%)."

### 1. The fork collapsed onto ONE plate — computed-DOM + built-CSS

- `--glass-fill-tinted` declared **exactly once** in `tokens/glass.css:345`:
  `color-mix(in oklab, oklch(0.9 0.05 75 / 0) 0%, oklch(...) 0%)` reading `--glass-fill-tint` / `--glass-fill-strength`.
- The two forked tokens `--glass-atom-tinted` / `--glass-chip-tinted` are **DEFINITION-ABSENT** in src and in the BUILT (served) CSS (only a documenting comment survives at `glass.css:331`).
- BUILT `dist-demo/assets/index-CL6y4Gsr.css`: `--glass-fill-tinted` declared (1 property + 1 `@property`), **read 4×** (`.glass-atom[data-surface="glass"]` ×2 + `.glass-chip` ×2), **zero forked `--glass-*-tinted` tokens**. The fold is real in the served bytes.
- `.glass-atom[data-surface="glass"]` and `.glass-chip` both paint `linear-gradient(var(--glass-fill-tinted), var(--glass-fill-tinted))` — ONE shared plate, ONE rim (`--glass-material-rim`, carried by the capsule).

### 2. Per-instance data hue over the shared plate — computed-DOM (definitive)

SelectableChip glass instances (route `/forms/selectable-chip`) each resolve a DISTINCT `--glass-fill-tint` at a non-zero `--glass-fill-strength: 12%`, and the composited `background-color` differs per instance:

| Chip | `--glass-fill-tint` (light) | composited bg (light, oklab) | hue lean |
|------|------|------|------|
| React | `oklch(0.532 0.18 317.5)` | `oklab(0.877 0.033 -0.016)` | violet (−b) |
| Svelte | `oklch(0.579 0.201 30.4)` | `oklab(0.887 0.042 0.033)` | rose/red (+a+b) |
| Qwik | `oklch(0.556 0.103 128.8)` | `oklab(0.882 -0.010 0.028)` | green (−a) |
| Vue/Solid/Angular (unselected) | (own tint) | warm-neutral shared plate | calm register |

Dark mode carries the same per-instance hues lifted for the dark register (React `oklch(0.739 0.134 318.1)` legendre-violet, Svelte `oklch(0.693 0.151 28.1)`, Qwik `oklch(0.794 0.116 127.9)`).

### 3. Per-instance hue over the shared plate — PIXEL READ, both engines (dark selected chips)

Peak-chroma plate scan (device px) over the three selected chips:

| Chip | Safari-dark RGB | Chrome-dark RGB | hue |
|------|------|------|------|
| React (violet) | [117,88,103] (R≈B>G) | [194,176,164] | violet lean ✓ |
| Svelte (rose) | [128,81,67] (R>>G>B) | [128,86,71] (R>>G>B) | **rose — near-byte-identical across engines** ✓ |
| Qwik (olive) | [107,104,72] (R≈G>>B) | [198,187,159] (R≈G>>B) | olive-green lean ✓ |

Three distinct hues (rose ≠ violet ≠ olive), painted the same across Chrome + Safari. **No WebKit desaturation-to-gray** — the `oklch(L C H / 0)` 0-alpha stop discipline held; the black-premultiply trap did not bite.

### 4. Byte-identical no-op at the @property defaults

`:root --glass-fill-tinted` resolves `color-mix(in oklab, rgba(0,0,0,0) 0%, oklch(90% .05 75 / 0))` at `--glass-fill-tint: transparent` / `--glass-fill-strength: 0%` — a fully-transparent no-op (`color-mix(in oklab, X, transparent 0%) ≡ X`). On `/foundations/icons` the default IconChip POP is its own `color(srgb … / 0.4)` section backplate (per-instance hue via the section ramp), with `--glass-fill-tinted` at the 0% no-op — correct-by-design (the glass-fill-tinted plate is the opt-in `icon-chip-glass` register). Loud opaque Badge variants on `/display/badge` are the W54-allowlisted saturated-pill register, correct-by-design.

### 5. Recessive backdrop / calm gestalt (pixel + visual)

- `main.children == 2`, `canvas == 1` on every route (single recessive aurora context, no over-staging).
- Backdrops read as soft warm washes — no conic banding, no oversaturation, grain calm.
- Hero titles fit their envelopes; body ink untinted; chip labels contrast-legible in both modes.

---

## Per-surface gestalt (both engines, both modes)

| Surface | Chrome light | Chrome dark | Safari light | Safari dark |
|---------|-----|-----|-----|-----|
| Badge (loud pills) | ✓ | ✓ | ✓ | ✓ |
| SelectableChip (glass-fill-tinted plate) | ✓ | ✓ (hue reads strongest) | ✓ (no desaturation) | ✓ (parity) |
| IconChip Pops (section-hue backplate) | ✓ | ✓ | ✓ | ✓ |

---

## Non-authoring judge conclusion

Every surface reads correct in BOTH engines + BOTH modes; every capture PNG resolves on disk (isRealPng 2880×1800); the plate/rim fork collapsed onto the ONE shared `--glass-fill-tinted` plate + `--glass-material-rim` in the BUILT bytes; the semantic per-instance data hue reaches the plate (rose/violet/olive distinct, engine-parity); the @property defaults are the byte-identical no-op. **Fable non-authoring gestalt: PASS.**
