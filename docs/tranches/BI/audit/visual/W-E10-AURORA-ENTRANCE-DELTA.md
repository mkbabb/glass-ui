# W-E10-AURORA-ENTRANCE — DELTA (the palette-derived entrance, no repulsive-gray fade)

Discharges **UF-E10** (the /foundations/intro flat-gray fade) + the value.js **T-60**
producer half (the reveal-bloom gray stage). Captures at `docs/tranches/BI/audit/visual/`.

## BEFORE — the three stacked tone shifts (born-RED at HEAD)

`proof:aurora-entrance` on the HEAD sources = **3 violations** (AE1 flat band · AE3 no
field/content split · AE5 hardwired reveal-bloom + `brightness(0.4) saturate(0.7)` veil).
The value.js T-60 forensic (headed real-GPU, cold+returning × light+dark, 4/4 legs)
measured the visible arrival opening INSIDE the dim floor: **filter `brightness 0.54–0.83
· saturate 0.77–0.91` at the flip**, release to `none` only at reveal+1100ms. Three tone
shifts: flat `linear-gradient(135deg)` gray band → gray filter-composite → canvas cross-fade.

## AFTER — one defined bloom (live, Chromium real-GPU, both modes)

`tests-visual/aurora-entrance.spec.ts` — **5/5 PASS** (2.7s):

| Arm | Capture | Measured |
|---|---|---|
| (A) frame-0 = palette-derived ground, NOT the flat band | — | placeholder `background-image` is the field-sampled `data:` raster (no `linear-gradient(135deg)`), both modes |
| (B) no gray reveal veil | — | aurora canvas carries **no** `data-substrate-reveal` (revealBloom off) → no `brightness<1`/`saturate<1` veil over the chromatic field |
| (C) field colored, not gray, from frame 0 | `…-field-colored-{light,dark}.png` | **saturatedFraction 0.998** (light+dark) — the field is fully chromatic at frame 0 |
| (D) PRM static rest frame | `…-prm-static-ground.png` | under `reduced-motion` the palette ground is present + colored from frame 0 (fade survives, transform drops) |

## Mechanism

- **Aurora.vue** — the placeholder is ALWAYS `auroraFallbackGround` (the palette-derived
  nuclei-glow ground, value.js `oklchToLinear` core); the flat `paletteToCssGradient` band
  RETIRED from the capable path. Frame 0 is palette-colored; the live canvas OPACITY
  cross-fades over it (same palette, no tone jump — the defined bloom).
- **runtime.ts / useMetaballRenderer.ts** — the `revealBloom` consumer DOOR on BOTH
  chromatic runtimes (opt-out / arrival-sync). The aurora defaults OFF (its entrance is the
  palette-ground cross-fade); the blob defaults ON with the palette-honest keyframe.
- **viz-reveal.css** — the `substrate-reveal-bloom` keyframe is PALETTE-HONEST: opacity
  materialize + a brightness/saturate LIFT that never dips below 1 (monotone `--ease-out`,
  not the extrapolating `--ease-cartoon-punch` whose overshoot dipped the settle below 1).
- **transitions.css / focal.ts** — the field/content split: `gl-route-enter` is the
  CONTENT-enter (coupled fade+rise); the full-bleed field is a frame-0 persistent layer
  OUTSIDE the enter (shell root / teleport-to-body); the shell suppression is of the LIVE
  field only — the palette ground persists from frame 0.

## Oracle

`proof:aurora-entrance` (NEW) AE1–AE5 GREEN + 5 self-test bites RED. `proof:aurora-swraster`
GREEN (W3 re-pointed — the faithful ground now serves the capable path too, §Disposition
terminal). `proof:viz` R2/R7 re-pointed to the E10 supersession (monotone ease + the door).
Rides the W-PI-IN-CLOSE battery + the motion/cross-page gestalt verdict.
