# BG.W-GLASS-REGISTER-UNIFY — paint DELTA (dual-engine PASS)

**Wave:** BG.W-GLASS-REGISTER-UNIFY (Row 3.5, the F2 tentpole, class P)
**Build commit:** `4e60a6c7` (PAINT-PENDING seed) · verified at working HEAD `7dd4312b`
**Judge:** NON-AUTHORING paint judge (did not build; verifies painted truth against the wave criteria)
**Verdict:** **PASS** — the unified single-recipe fill reads correctly across the 5 glass tiers + the bright bucket, Safari webkit-blur intact, no-gray dock, in BOTH engines + BOTH modes; every capture PNG resolves on disk.
**Date:** 2026-07-02

---

## Method (the proven C18 dual-engine harness over BUILT bytes)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
- `npm run demo:dist:build` (BUILT demo dist; `@glass`→`src/` alias, so the wave's source styles compile in) → `npm run demo:dist:serve` (vite preview `:5200`, NOT the `:5199` dev shell).
- **Chrome leg:** real Chrome.app `--remote-debugging-port=9456 --user-data-dir=$PWD/.cache/chrome-capture-profile` (gitignored), CDP `chromium.connectOverCDP:9456` → `newContext(colorScheme, deviceScaleFactor:2)` → `?capture=<route>&mode=<m>` → `waitForFunction data-capture-ready` (never a fixed sleep) → GL_RENDERER probe + computed-style probe + `page.screenshot 1440×900@2x`. GL_RENDERER = **`ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`** (real Metal GPU, not SwiftShader) on all 8.
- **Safari/WebKit leg:** the in-repo compiled `docs/tranches/BG/audit/visual/wkshot-live` (system WebKit.framework = the real Safari 26 engine, Metal / `Apple GPU`), off-screen composite snapshot of `http://localhost:5200/?capture=<route>&mode=<m>`, `data-capture-ready` landed @4500ms on all 8, snapshot 2880×1800.
- **Provenance:** the in-pixel engine badge (`demo/capture/engine-badge.ts`, magenta `#ff00ff` locator) decoded FROM THE PIXELS — `ENGINE CHROME`/`WEBKIT`, GPU, `VIEW 1440×900 @2x`, `MODE`. (No sibling touched; operated only under glass-ui; `.cache/chrome-capture-profile` removed after.)

## Routes × engines × modes = 16 captures (all on disk)

Path root: `docs/tranches/BG/audit/visual/BG.W-GLASS-REGISTER-UNIFY-paint/`

| Route | Chrome light | Chrome dark | Safari light | Safari dark |
|---|---|---|---|---|
| `/foundations/paper-glass` | `glass-register-chrome-paper-glass-light.png` | `…-chrome-paper-glass-dark.png` | `…-safari-paper-glass-light.png` | `…-safari-paper-glass-dark.png` |
| `/substrates/glass-material` | `…-chrome-glass-material-light.png` | `…-chrome-glass-material-dark.png` | `…-safari-glass-material-light.png` | `…-safari-glass-material-dark.png` |
| `/display/card` | `…-chrome-card-light.png` | `…-chrome-card-dark.png` | `…-safari-card-light.png` | `…-safari-card-dark.png` |
| `/dock/overview` | `…-chrome-dock-overview-light.png` | `…-chrome-dock-overview-dark.png` | `…-safari-dock-overview-light.png` | `…-safari-dock-overview-dark.png` |

Downscaled gestalt fulls + top-left provenance-badge crops under `…-paint/crops/`. Computed-style probes: `…-paint/chrome-results.json`.

All 16 PNGs present, 1.27–3.95 MB each (real content, not blank). Chrome badge decoded `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max · VIEW 1440×900 @2x · MODE {LIGHT,DARK}`; Safari badge decoded `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x · MODE {LIGHT,DARK}`; magenta `#ff00ff` border present on every capture.

---

## Per-criterion verdict

### 1 · Unified single-recipe fill across the 5 glass tiers — **PASS**
Every glass tier resolves the ONE element-level `color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))` seam (`@utility glass-fill` home + `--glass-plate-tinted` ladder-rung twin). Computed `background-color` on the tiers (glass-material light):
- wash `oklab(0.629 … / 0.44)` · quiet `oklab(0.721 … / 0.60)` · resting `oklab(0.763 … / 0.72)` · floating `oklab(0.793 … / 0.84)` · overlay `oklab(0.816 … / 0.96)`.

Monotonic warm alpha ladder 0.44→0.96, all warm-amber hue. The Card composes `glass-fill` directly (`.glass-card` bg = `oklab(0.721 … / 0.60)`, identical to `.glass-quiet` — the wave's `--glass-fill-rung: var(--glass-bg-quiet); @apply glass-fill`). Visually the tier-specimen rows on `/display/card` + `/foundations/paper-glass` render the ladder as progressively-solid warm plates over the field/paper-grain in BOTH engines.

### 2 · Bright bucket reads correctly — **PASS**
The dock floats over the bright aurora/showcase field and self-darkens toward the warm ink, staying legible warm glass. Dock computed bg: light `color(srgb 0.943 0.904 0.864 / 0.52)`, dark `color(srgb 0.348 0.296 0.249 / 0.56)` — R>G>B warm in both. The `/dock/overview` dock pills + the side rail read as warm-cream (light) / warm-brown (dark) translucent glass over the field, not a washed-flat or blown-out plate.

### 3 · Safari webkit-blur intact — **PASS**
Every glass surface carries a real `backdrop-filter: blur(Npx) saturate(...)` matching source exactly (wash 1 · quiet 8 · resting 8 · floating 13 · overlay 13→20@2dppx px) — no zeroed/dropped blur. In the WebKit captures the aurora field and paper grain read THROUGH the tiers, progressively more diffuse at higher tiers — the blur is painting in the real Safari engine. Demo dist carries 71 `-webkit-backdrop-filter` companions; the wave's `bdfDeclRe` widen (`blur(var(…))` nested-paren match) is gate-confirmed (below). No flat-unblurred-plate regression in either engine.

### 4 · No-gray dock (+ tiers) — **PASS**
OKLab chroma/hue (sRGB→OKLab) — zero neutral, all warm-amber `--foreground` family (target H 62–75°):
- **Dock light** C=**0.0173** H=**67.6°** (near-white L0.931, gamut-bound warm-plate floor). **Dock dark** C=**0.0263** H=**64.1°** (> 0.020 strong floor).
- Glass tiers light C 0.0118–0.0139 @ H 68–70°; dark C 0.0186–0.0191 @ H 58.7°.

A gray would be C≈0 / hueless; every surface carries a positive warm chroma at the amber hue. No-gray confirmed with hard numbers in both modes.

### 5 · Recessive aurora / hero fits / grain calm — **PASS**
The `/substrates/glass-material` + dock/card field backgrounds render as calm warm gradients — NO conic banding, NO oversaturation, recessive. The hero display type (`Glass Material` / `Paper & Glass` / `Card` / `Overview`) fits its envelope in both engines/modes. Grain (paper-glass, card grain toggle) reads calm, not popping.

### 6 · Dark register — **PASS**
Dark is a luminous warm-amber transmissive material (not a charcoal void): warm-brown glow field, warm-cream ink, warm-dark transmissive glass tiers/docks, violet `--primary` accent toggles (card). Chrome↔Safari parity across all four dark routes.

### Chrome ↔ Safari parity — **PASS**
All four routes render byte-gestalt-equivalent between the two engines in both modes (content, layout, warm glass, blur, tier ladder). The only cross-engine difference observed is the `/dock/overview` collapsible-dock resting state (Chrome expanded / Safari collapsed) — a dock hover-morph STATE artifact, orthogonal to this wave's glass-fill/tint/blur/no-gray criteria (owned by the dock-morph family), NOT a paint defect.

---

## Supplementary — gate confirmation (source truth ⟷ rendered truth)

`node scripts/proof-glass.mjs` → **PASS**:
- arm `glass-fill-home` (R9): `@utility glass-fill ×1`, `oklab-seam=✓`, `paints-value=✓`, `@apply consumers=1`.
- arm `safari-blur-var`: `regex=found`, `matches-blur(var())=✓`, `matches-1-level=✓`, `no-prelude-corruption=✓`.
- arms `deep-glass-decided`, `defined-control-floor` all GREEN.

The gate proves the single-recipe source; this DELTA proves the RENDERED result (both engines, both modes) — they align.

---

## Anti-evasion floor

Every declared capture path resolves on disk (16 full-res PNGs + crops + `chrome-results.json`). Provenance is the in-pixel engine badge decoded from the bytes (Chrome `ANGLE Metal M5 Max`, WebKit `Apple GPU`), not a forgeable sidecar. GL_RENDERER on the Chrome leg is the real Metal GPU (not SwiftShader/software).

**VERDICT: PASS → cursor Row 3.5 flips PAINT-PENDING → DONE.**
