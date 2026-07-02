# BG.W-COMPOSITED-GESTALT-GATE — non-authoring dual-engine PAINT judgment

> **Role:** NON-AUTHORING PAINT JUDGE (did NOT build this wave). **Verdict recorded against a fresh
> dual-engine capture set over the BUILT `:5200` bytes.** **Gate arm:** `proof:warm-identity` — the
> composited-WHOLE dominant-hue paint battery (measure the whole, not the part). **Build cursor SHA:**
> `4ef43856` (device-free GREEN, 14-bite). **Date:** 2026-07-02. **Fence:** verification-only — ZERO
> `src`/demo/style/script edits; PNGs + this DELTA under `docs/tranches/BG/audit/visual/`; the
> EXECUTION-PROGRESS cursor row is **NOT** flipped (held at PAINT-PENDING).

## Verdict — **FAIL** (held PAINT-PENDING)

The operative all-warm state does **NOT** flip GREEN. Over the 10 enrolled roster surfaces (9 in-repo
capturable; `cross-repo` is a foreign consumer, out of in-repo pipeline scope) the composited-region
dominant-hue histogram reads **11/36 all-warm** — the enrolled route regions do NOT uniformly read
warm; multiple hero-page ambient aurora backdrops read **cold/magenta**, and two surfaces trip
capture-calibration artifacts. `proof:warm-identity`'s born-RED operative baseline stays RED.

| axis | result |
|---|---|
| **Device-free gate** (`proof:warm-identity`) | GREEN (kernel + wiring + 14-bite self-test) — the paint-gate PRECONDITION, NECESSARY not SUFFICIENT |
| **Dual-engine capture on disk** | ✅ 36 PNGs (9 surfaces × chrome+safari × light+dark), all resolve, all `isRealPng`, all 2880×1800 |
| **Engine provenance (in-pixel badge)** | ✅ Chrome `ANGLE Metal Renderer: Apple M5 Max` (real Metal, not SwiftShader) · WebKit `Apple GPU` (system WebKit.framework/Metal, no `Version/` token → Tier-1 C-SAFARI), MODE LIGHT/DARK decodable FROM the pixels |
| **Composited all-warm (the operative bar)** | ❌ **11/36** regions read all-warm — cold/magenta hero backdrops + calibration artifacts |

## Provenance

- **Chrome leg:** real Chrome.app 149 via CDP (`chromium.connectOverCDP :9456`), non-headless, throwaway
  profile; `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`.
- **Safari leg:** off-screen WKWebView (`wkshot-live`, system `WebKit.framework`/Metal, no TCC); badge
  `ENGINE WEBKIT · GPU Apple GPU`.
- **Bytes:** BUILT demo dist (`npm run demo:dist:build` → `dist-demo`) served by `vite preview :5200`
  (NOT the `:5199` dev server), via the C18 `?capture=<route>&mode=<m>` harness (poll
  `data-capture-ready`).
- **Kernel:** the SAME `scripts/reflect-capture-verify.mjs` `pngRegionHueHistogram` +
  `scripts/lib/paint-arm.mjs` `warmIdentityVerdict` the gate reads, over each surface's roster FIELD
  probe (WARM_BAND: warmFractionFloor 0.55 · chromaCeiling 0.30 · edgeCastCeiling 0.16 · topBarCeiling
  0.14 · cornerClipFloor 0.04). Analysis: `…-DELTA-assets/analyze.mjs` → `analysis.json`.

## The composited dominant-hue matrix (36 captures)

| surface | route | probe | chrome-L | chrome-D | safari-L | safari-D | warm |
|---|---|---|:--:|:--:|:--:|:--:|:--:|
| dock | /dock/overview | x.18 y.50 | ✗ cold | ✗ cold | ✗ cold | ✗ cold | 0/4 |
| configurators-goo | /substrates/blob | x.18 y.60 | ✗ cold | ✓ warm | ✗ cold | ✓ warm | 2/4 |
| aurora | /substrates/aurora | x.20 y.20 | ✗ cold | ✗ cold | ✗ cold | ✗ cold | 0/4 |
| glass-feedback | /feedback/toast | x.45 y.40 | ✓ warm | ✓ warm | ✓ warm | ✓ warm | **4/4** |
| shell | /foundations/intro | x.15 y.10 | ✗ magenta | ✗ magenta | ✗ magenta | ✗ magenta | 0/4 |
| motion-fourier | /motion/curve-gallery | x.13 y.42 | ✗ warm .524 | ✓ warm | ✓ warm | ✓ warm | 3/4 |
| dark-register | /substrates/glass-material | x.18 y.40 | ✗ magenta | ✗ magenta | ✗ magenta | ✗ magenta | 0/4 |
| tabs-segmented | /navigation/tabs | x.18 y.33 | ✗ neutral | ✗ neutral | ✗ neutral | ✗ neutral | 0/4 |
| page-band | /foundations/colors | x.18 y.20 | ✗ topBar | ✓ warm | ✗ topBar | ✓ warm | 2/4 |

Representative dominant-hue reads (chrome-light unless noted): dock warmF 0.00 / cold, topΔE 0.21 ·
aurora warmF 0.08 coldF 0.71 · shell warmF 0.02 / magenta · dark-register warmF 0.06 / magenta ·
tabs warmF 0.999 BUT chroma 0.0042 → NEUTRAL (below the coloured floor) · page-band warmF 1.00 warm
field BUT topΔE 0.38 · glass-feedback warmF 1.00 chroma 0.031 warm.

## Defect localization — THREE distinct classes (the build-fix-agent must not conflate them)

### A · GENUINE not-warm paint (the composited-whole disease this gate exists to catch)

The demo **StoryHero ambient aurora backdrops render pink → lavender → purple → blue**, not the
warm-cream identity the pages promise. `demo/stories/aurora-hero.ts` blends RAW brand section hues
(rose `359.8°`, purple `305.9°`, indigo `265.5°`, teal-cyan `222.8°`, violet `317.5°`) into the hero
gradient. Unlike the CHASSIS field (`demo/stories/warm-field.ts` → `warmProjectHue`, runtime-clamped
to `[25,95]°`, "the teal/navy PURGE"), the **ambient StoryHero backdrop is NOT warm-projected**, so it
reads cold/magenta-dominant.

- **aurora** (`/substrates/aurora`, 0/4): the flagship substrate hero's ambient field is pink/purple/blue,
  coldFraction 0.71–0.95 both modes both engines. The page text says "the warm-cream Dawn identity is
  the DEFAULT lead" — the rendered ambient backdrop contradicts it. `BG.W-FIELD-AURORA` verified chroma
  MAGNITUDE (recessive, C<0.10) + AA, but NOT dominant HUE — so a low-chroma-yet-COLD field passed its
  gate and is caught here (exactly the mean-passes/eye-reads-not-warm gap warm-identity was minted for).
- **dark-register** (`/substrates/glass-material`, 0/4): the 5 glass plates transmit the page's
  pink/lavender StoryHero backdrop → the plates read mauve/magenta (warmF 0.00–0.08).
- **shell** (`/foundations/intro`, 0/4): the intro StoryHero hero is a pink/lavender gradient
  (rose/purple hero stops) → magenta-dominant. (See class C: my route choice reads the intro hero rather
  than pure shell chrome, but the intro hero being pink is itself the class-A finding.)

### B · BORDERLINE (a small warm nudge would clear the 0.55 floor)

- **configurators-goo** light (0.41/0.49, dark PASSES): the cold violet `Blob Studio` masthead sits in
  the probe region and tips the LIGHT read below the floor; the field is otherwise warm-peach.
- **motion-fourier** chrome-light (0.524, safari + both-dark PASS): just under the 0.55 floor; the
  motion-accent violet in the region tips it.
- **dock** (0/4): the `/dock/overview` demo hosts the warm-cream dock PILLS on saturated **BLUE
  `DockExampleTile` panels**; the roster field probe reads the blue tile, not the pill. Arguably an
  intentional demo tile, but the warm-identity FIELD read is cold.

### C · CAPTURE-CALIBRATION ARTIFACTS (the surface is warm; the probe/harness mis-reads — NOT a paint defect)

- **tabs-segmented** (0/4 neutral): the roster-calibrated probe (`x.18 y.33`) lands on the WHITE
  heading/eyebrow text ABOVE the actual warm-cream segmented-tab track (chroma 0.0042). The tabs
  themselves are warm-cream glass. This is a probe-POSITION miss in the current build layout, not the
  grey-slab disease.
- **topBar predicate** (dock, page-band light + safari-light): the roster's full-width top-bar region
  (`ty=0 th=0.06`) overlaps the capture harness's black `#ff00ff`-bordered engine-BADGE overlay
  (top-left ~45% width) → high topΔE. page-band's actual field is warm-cream (warmF 1.00); its FAIL is
  the badge strip, not an aberrant top bar. (Dark passes because the black badge blends with the dark field.)

### cross-repo (10th enrolled surface) — out of in-repo pipeline scope

The `cross-repo` roster row is a foreign consumer (`slides.friday.institute` adoption surface). It
carries no `/cat/story` token (free prose → no route hard-red) and CANNOT be captured under the
foreign-tree fence. Its warmth is INHERITED from the library tokens the in-repo surfaces prove; not
judged here.

## mustFix[] (for a build-fix-agent — I record, I do not edit src/demo/styles/roster)

1. **[A · primary] Warm the demo StoryHero ambient aurora backdrops.** Warm-project the AMBIENT
   hero-field hue into `[25,95]°` the way `warm-field.ts`/`warmProjectHue` already does for the chassis
   field — the StoryHero ambient backdrop (`aurora-hero.ts` hero stops) currently blends cold brand hues
   (indigo/teal/purple/rose) unprojected, so the flagship substrate heroes (aurora, glass-material) and
   the foundations/intro hero read cold/magenta. Target: warmFraction ≥ 0.55, no cold/magenta dominant,
   BOTH modes. Re-verify `BG.W-FIELD-AURORA` on the DOMINANT-HUE axis (its prior PASS checked chroma
   magnitude + AA only).
2. **[B] Dock field probe / demo tile.** Either re-point the dock roster probe onto the warm dock PILL
   (not the blue `DockExampleTile`), or re-evaluate the blue example-tile color; nudge the configurators/
   motion-fourier LIGHT reads (violet masthead in the probe region).
3. **[C · roster calibration] Re-calibrate the roster probe regions to the current build layout.** The
   `tabs-segmented` probe must land on the tab TRACK (not the heading text above it); EXCLUDE the
   top-left engine-badge strip from the `topbar` region (dock/page-band topΔE is a badge artifact, not a
   real top bar). This is a roster edit (`docs/tranches/BG/audit/reflect/bg-gestalt-roster.md`), owned by
   the build/roster agent — a paint judge may not edit the roster. Absent this, the operative gate will
   red on warm surfaces that a mis-placed probe mis-reads.

## Fable / DesignSync dominant-hue read (F8.3)

DesignSync provisioning is USER-GATED (unprovisioned at HEAD); per the F8.3 arm the Fable verdict is
recorded against the committed dual-engine captures by a non-authoring instance. **Filed dominant-hue
read: FAIL** — the composited-whole reads cold/magenta on the majority of enrolled hero-page fields
(pink/lavender ambient aurora), not the warm-cream identity; only the feedback plate band reads cleanly
warm. Matches the pixel kernel above.

## Captures on disk

- 36 PNGs: `docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-DELTA-assets/<surface>-{chrome,safari}-{light,dark}-desktop-full.png`
- Results: `…-DELTA-assets/chrome-results.json` · `analysis.json`
- Drivers: `…-DELTA-assets/chrome-capture.mjs` · `analyze.mjs` (WKWebview leg: system `wkshot-live` over the same `?capture=` URLs)
