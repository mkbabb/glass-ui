# BG.W-CARTOON-INK-GAMUT — non-authoring dual-engine PAINT judgment

> **Role:** NON-AUTHORING PAINT JUDGE (did NOT build this wave). **Verdict recorded against the committed
> dual-engine captures.** **Surface:** the cartoon-ink cel register over `/foundations/shadows` (the
> cartoon-offset `box-shadow` token tour + `<Card surface="cartoon">` idiom). **Build commit:** `3857b33b`.
> **Date:** 2026-07-02. **Fence:** verification-only — ZERO `src`/demo/style/script edits; PNGs + this DELTA
> under `docs/tranches/BG/audit/visual/`; only the EXECUTION-PROGRESS cursor row flipped.

## Verdict — **PASS**, both engines, both modes

The cartoon-ink cel register paints a **warm-brown in-gamut offset stamp (no gray, no maroon)** in BOTH modes
on BOTH engines. Device-free gate GREEN ∧ on-disk dual-engine capture ∧ non-authoring paint PASS.

| leg | result |
|---|---|
| **Chrome (CDP, real Metal GPU `ANGLE Metal Apple M5 Max`)** | ✅ PASS — full content + in-pixel badge, both modes; `--cartoon-ink` resolves `oklch(0.28 0.03 55.99)` light / `oklch(0.34 0.03 75.08)` dark |
| **Safari/WebKit (off-screen WKWebView, system WebKit.framework/Metal `Apple GPU`, no-TCC)** | ✅ PASS — full content + in-pixel badge, both modes |
| **Painted stamp warm-in-gamut (pixel read, all 4)** | ✅ R>G>B ordered, OKLab hue 67–84° ∈ [45,85], chroma 0.020–0.035 (real warm chroma, not gray; B channel substantial, not maroon) |
| **Dark register (not a void)** | ✅ both dark captures paint the warm luminous-dark transmissive material + the warm mid-tone `.shadow-stage` plate, not a flat near-black void |
| **Engine provenance (in-pixel badge)** | ✅ `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max` vs `ENGINE WEBKIT · GPU Apple GPU`, `MODE LIGHT`/`MODE DARK` decodable FROM the pixels |
| **Dimension-correct** | ✅ all 4 render 2880×1800 (retina 2× of 1440×900) |

## Device-free gate — GREEN (the paint-gate precondition)

- **`proof:glass`** → PASS (`.cache/gates/BG-glass.json`; the `deep-glass-decided` F2 arm terminal-verdict `retired-at-16px…`, self-test teeth ✓).
- **`proof:no-gray`** → exit 0. The `cartoon-ink-warm-in-gamut` witnesses (the gate arm, verbatim):
  - `cartoon-ink-warm-in-gamut-light` ✅ — `--cartoon-ink` resolves `rgb(52,37,26)` at OKLab **H = 57.4°** (R>G>B>0, warm ∈ [45,85]).
  - `cartoon-ink-warm-in-gamut-dark` ✅ — `rgb(65,54,38)` at OKLab **H = 76.7°** (R>G>B>0, warm ∈ [45,85]).
  - `cartoon-ink-warm-in-gamut--self-test` ✅ — the maroon detector flags the synthetic HEAD recipe
    `clamp(0.14,l,0.18) max(c,0.11)` → `rgb(49,0,0)` B=0 (the witness is load-bearing, not vacuously green).

## The binding PAINT truth — the offset-stamp pixel read

The `.shadow-cartoon` specimen's computed `box-shadow` ink (both modes, both engines) is
`oklab(0.28 0.0168 0.0249 / 0.32)` (light) / `oklab(0.34 0.0077 0.0290 / 0.46)` (dark) at offset `-3px 3px 0`.
The painted offset-stamp bands (left + bottom, sampled off the full-page PNGs, averaged) resolve:

| capture | painted stamp RGB | OKLab H° | R>G>B (warm)? | chroma | maroon? | gray? |
|---|---|---|---|---|---|---|
| chrome-light | (189,176,153) | **81.9°** | YES | 0.035 | no (B=153) | no (13/23 spread) |
| chrome-dark  | (67,58,49)    | **67.1°** | YES | 0.020 | no (B=49)  | no |
| safari-light | (225,213,190) | **83.7°** | YES | 0.034 | no (B=190) | no |
| safari-dark  | (70,60,50)    | **67.1°** | YES | 0.022 | no (B=50)  | no |

Every painted stamp is a **warm brown** (R>G>B ordering, OKLab hue in the [45,85]° warm gamut, real warm chroma
0.02–0.035). None is the maroon-collapse the gate exists to kill (B is never near-zero) and none is a neutral
gray (the channels carry a warm spread). The stamp reads as a real ink against its cell (light: darker than the
cream page by ~40/44/50; dark: reads against the warm-brown card fill). The two independent stamp bands
(bottom + left) agree, confirming the read is the ink and not an antialiasing artifact.

## Evidence on disk (`docs/tranches/BG/audit/visual/cartoon-ink-gamut-paint/`)

| png | engine | mode | dims | badge (decoded from pixels) |
|---|---|---|---|---|
| `cartoon-ink-gamut-chrome-light-desktop-full.png` | CHROME (CDP, real Metal) | light | 2880×1800 | `ENGINE CHROME · GPU ANGLE Metal Apple M5 Max · VIEW 1440×900 @2x · MODE LIGHT` |
| `cartoon-ink-gamut-chrome-dark-desktop-full.png`  | CHROME | dark | 2880×1800 | `… MODE DARK` |
| `cartoon-ink-gamut-safari-light-desktop-full.png` | WEBKIT (off-screen WKWebView, Metal) | light | 2880×1800 | `ENGINE WEBKIT · GPU Apple GPU · VIEW 1440×900 @2x · MODE LIGHT` |
| `cartoon-ink-gamut-safari-dark-desktop-full.png`  | WEBKIT | dark | 2880×1800 | `… MODE DARK` |

Sidecars: `chrome-paint-results.json`, `chrome-paint-results-dark.json` (GL_RENDERER + computed `--cartoon-ink`
chain + specimen `box-shadow`). Chrome CDP GL probe = `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max…)`
(REAL Metal — not SwiftShader/llvmpipe). Both viewport twins captured beside the full-page PNGs.

## The WORKING method (the proven C18 harness — used, not re-derived)

```bash
node scripts/verify-siblings-intact.mjs --quiet            # → exit 0 before AND after
npm run demo:dist:build                                    # BUILT bytes → dist-demo/
npm run demo:dist:serve                                    # vite preview :5200 (background)
# Chrome leg — real Chrome.app CDP, ?capture= route, poll data-capture-ready, GL_RENDERER + screenshot
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9456 --user-data-dir=/tmp/chrome-pipe-validate about:blank &
#   playwright chromium.connectOverCDP(:9456), viewport 1440×900 @2x, colorScheme <mode>,
#   goto ?capture=/foundations/shadows&mode=<m>, waitForFunction data-capture-ready, fullPage screenshot
# Safari/WebKit leg — off-screen WKWebView (system WebKit.framework, Metal, NO TCC)
clang -framework Cocoa -framework WebKit -fobjc-arc docs/tranches/BG/audit/wkshot-live.m -o /tmp/wkshot-live
/tmp/wkshot-live "http://localhost:5200/?capture=/foundations/shadows&mode=<m>" out.png <m> 15000
# teardown — kill vite preview + throwaway Chrome; verify-siblings-intact --quiet → exit 0
```

## Fable / designSync surface note

DesignSync provisioning is USER-GATED (`W-FABLE-DESIGN-ARM`); until provisioned, the paint verdict is recorded
against the committed dual-engine captures by a non-authoring judge (this DELTA). The `designSyncSurface` —
"cartoon-ink cel register / `/foundations` glass tiers" — reads **warm-in-gamut, no gray, no maroon** on both
engines in both modes: **Fable-surface verdict PASS**.

## Scope / fence

- ZERO `src`/demo/style/script edits. `/tmp/wkshot-live` + `/tmp/chrome-pipe-validate` are build/runtime
  artifacts (protocol §6.1); NO repo path under `/tmp`, NO sibling under `~/Programming` touched.
  `verify-siblings-intact --quiet` exits 0 before AND after; the demo:dist:serve + throwaway Chrome are killed.
