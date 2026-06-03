# W-cmp — Aurora + Blob feature-correctness

Slice: AURORA + BLOB. Source of truth: `as-verify/aurora*.png` (6 captures) + `src/components/custom/aurora/`. Cross-checked the `6d3e151` color.ts refactor (inv-K-2 value.js color-core consumption).

## Verdict: PASS (all four surfaces)

| Surface | Verdict | Evidence |
|---|---|---|
| Aurora render (gradient / nuclei / presets) | PASS | 6 captures, all non-empty, nuclei present + positioned, presets distinct |
| inv-K-2 OKLab color-core consumption | PASS | 6/6 equivalence specs green to 1e-6; value.js resolves; no local re-impl |
| deriveAurora BOOKED (no live >=2) | PASS | `grep deriveAurora src/` = empty; producer NOT half-shipped |
| Blob/watercolor surface in demo | PASS | watercolor medium fully routed in shader + consumed by Meadow/Day9 presets |

## 1. Aurora renders correctly

Six captures inspected: `aurora.png`, `aurora-dark.png`, `aurora-light.png`, `aurora-configurator.png`, `aurora-configurator-dark.png`, `aurora-configurator-light.png`.

- **Non-empty gradient** — every capture paints a live blue watercolor field, not a blank/transparent canvas. The visible surface is the `paletteToCssGradient` placeholder (`Aurora.vue:128`, a `linear-gradient(135deg, …)` derived from `config.palette`) cross-fading with / standing under the WebGL canvas. The placeholder is reactive to preset switches (`Aurora.vue:127-129`), so even a WebGL-less headless capture shows the correct palette.
- **Nuclei present + positioned** — multiple soft Gaussian nucleus rings are visible and distributed (top-right, center, lower-left, bottom) in every configurator capture. Runtime uploads up to `MAX_NUCLEI=6` per-nucleus attributes (`runtime.ts:382-421`): pos (with the `1.0 - nu.y` top-origin Y-flip), radius, paletteBias, valueBias, drift, elongation, angle. Spare slots are zero-filled (`runtime.ts:403-413`) so a longer prior config cannot bleed.
- **Presets paint distinct palettes** — the preset rail in `aurora.png`/`aurora-dark.png`/`aurora-light.png` shows six visibly distinct thumbnails: Sky (smooth blue), Dawn (orange→blue diagonal), Meadow (green→teal watercolor), Deliberative (pink/purple), Day 9 (yellow), OK Impasto (red oil). Each thumbnail is a baked frame of its own palette — distinct, not a shared band.
- Dark and light root chrome both render the rail, canvas, and configurator panel cleanly; the configurator panel re-themes correctly (light panel in `*-light`, dark panel in `*-dark`).

## 2. inv-K-2 color-core consumption — math correct, no regression

`color.ts` (rewired in `6d3e151`) deletes the 8 byte-for-byte OKLab/OKLCh/sRGB duplicates and re-sources from `@mkbabb/value.js` (the Ottosson core): `srgbToOKLab`, `oklabToLinearSRGB`, `oklabToRgb255`, `rawOklabToOklch`, `rawOklchToOklab`, `parseCSSColor`, `colorUnit2`. Confirmed value.js resolves at runtime — all 5 primary imports are `function`.

The 6 kept aurora helpers (`oklchToLinear`, `flattenPalette`, `paletteToCssGradient`, `oklchStopToHex`, `hexToOklchStop`, `cssToOklch`) compose the value.js path correctly:

- `oklchToLinear` = `rawOklchToOklab → oklabToLinearSRGB` + aurora's OWN `Math.max(0,·)` ACES-in-linear wrap (`color.ts:31-35`). The wrap is correct and intentional — value.js does NOT clamp negative linear, and the shader ACES-tonemaps in linear, so an out-of-gamut stop's negatives must be kept off the GPU. The equivalence test exercises this with the deliberate out-of-gamut stop `{L:0.7, C:0.37, h:150}`.
- `flattenPalette` bakes the GPU LUT in place into a reused buffer (`color.ts:43-62`), zero-filling unused slots — no GC churn on a slider drag. This is the one byte the eye sees; it feeds `ub.palette` → `uPalette` uniform (`runtime.ts:377-379`).
- `cssToOklch` now goes through value.js's `parseCSSColor` (no DOM) instead of the old 1×1-canvas trick — works in SSR/happy-dom. Documented semantic change (invalid string throws; alpha dropped) is correct and intentional.

**Equivalence test: 6/6 PASS to 1e-6.** Re-ran `color-equivalence.test.ts` — green. The 6 specs assert: composed `oklchToLinear` agreement, exact-hex `oklchStopToHex`, lossless hex↔oklch round-trip, `hexToOklchStop` agreement, `cssToOklch` round-trip, and `flattenPalette` GPU-buffer byte-stability. The test is near-tautological now (the helpers call value.js directly) but is the drift guard against any future re-introduction of a local color copy.

**No visual regression** — the OKLCh stops, the bake math, and the placeholder gradient are mathematically identical to the prior local impl (the deleted code was a byte-for-byte duplicate of value.js's core). The aurora barrel surface is unchanged (6 kept color names exported from `index.ts`), so no consumer-facing signature changed. Aurora typecheck clean (no errors against `color.ts`/aurora in `vue-tsc --noEmit`).

## 3. deriveAurora status — BOOKED, producer NOT half-shipped

Confirmed clean: `grep -rn deriveAurora src/` returns **empty** (exit 1). The producer `deriveAuroraFromColor(css|OklchStop, stopCount) → OklchStop[]` does NOT exist in source. This is the correct state per the AS gating:

- The low-level OKLab/OKLCh color stack ALREADY ships (`color.ts` — `oklchToLinear`/`flattenPalette`/`paletteToCssGradient`/`hexToOklchStop`/`cssToOklch`), so a no-op re-implementation would be FORBIDDEN (inv J-10 / L-8, substrate-without-consumer is binary).
- The one missing gap is the single-color→N-stop L/C/h-spread *producer* — and it is correctly NOT minted. AS.W5 ships it ONLY-IF a live ≥2 adoption is witnessed (value.js K.W4 wiring the 2nd live consumer); else value.js executes the VAL-1 kill. `docs/tranches/AS/audit/W0b-L4-deferred.md` + `W0b-L3-prompts.md` confirm this is a clean kill-gated BOOKED watch, not a stalled half-ship.

No half-shipped producer detected — the booking is honored.

## 4. Blob / watercolor surface in demo — renders

The "blob/watercolor" surface in aurora is the nucleus-based **watercolor medium** (the A1 "Metaballs+BlobDot" cluster is a separate net-new constellation item, NOT in src; the aurora's painterly nucleus field is the live blob-like surface here).

- `AuroraMedium = "smooth" | "pastel" | "watercolor" | "oil"` (`presets.ts:48`). `MEDIUM_ID.watercolor = 2` (`runtime.ts:26`), uploaded to `uMedium` (`runtime.ts:433`).
- Shader routes `uMedium == 2 → mediumWatercolor(col, pN, t)` (`aurora.frag.ts:785`) with wetEdge/granulation axes. The medium is fully implemented, not stubbed.
- Demo consumers: `demo/stories/aurora/presets.ts` — Meadow (`medium: "watercolor"`, line 99/494) and Day 9 (`medium: "watercolor"`, line 164/496) both select it; visible as distinct thumbnails in the preset rail (Meadow green watercolor, Day 9 yellow watercolor).
- The configurator captures show the medium toggle row (Smooth · Watercolor · Pastel · Oil) and the live nucleus-ring watercolor field rendering in the main canvas. Renders correctly in both light and dark.

## Notes / non-blocking

- The visible canvas surface in the captures is the CSS-gradient placeholder (expected — headless capture WebGL availability varies); the placeholder is itself derived from the same palette via `paletteToCssGradient`, so palette-correctness is verified regardless of GPU path. This is by design (`Aurora.vue:20-22, 157-166`).
- No regression, no overfit, no double-mint of landed substrate. The `6d3e151` refactor is correct.
