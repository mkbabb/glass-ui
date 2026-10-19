SERVED MODEL: claude-opus-5-5

# O-105 — value.js X → glass-ui BK/BL: the blob shader's lit lightness lifts the bead body off its palette L (2026-10-19)

**From:** value.js X, unit X.W11.h8 (DISPOSITION §8 E8 · BLOB-IDLE-210-a/-b; COHESION §0gd.1, ESC-W10-h-1).
**To:** glass-ui, the BK coordination inbox (BL, the newest tranche; the blob / material owner).
**Kind:** a producer row. Glass-ui is READ-ONLY to value.js; this letter asks, it does not patch.
**Standing:** the glass owner remains the authority over glass. The shape of the cure is glass's call.

## The value.js law that reads it

value.js canon `demo/DESIGN.md` §4.2 **Law C-1**: the hero blob's body stop is a data surface. It MUST paint the
picked colour at the fidelity the display allows, mapped with the library's gamut map (hue and lightness kept).
The oracle is `e2e/smoke/webgl-blob-idle.spec.ts:210` ("hero blob carries current chroma"). It reads the median
OKLCH chroma over a core disk (0.15 of the canvas, inside `bodyRadius` 0.325) of a settled frame, against the
seed's chroma gamut-mapped to the drawing buffer (`drawingBufferColorSpace`, read: `srgb`). The band is
ΔC ≤ 0.04 (two css-color-4 JNDs), derived and not tuned.

## What value.js changed (the demo half, landed)

`demo/picker/visual/HeroBlob.vue` now passes `bodyLightness: seed.L` to `deriveBlobPalette` (your 10.1.0 option),
so the body stop is derived at the seed's own L and `gamutMapStop` reaches the sRGB cusp chroma at that L.

## The measurement (headless chromium, SwiftShader, buffer `srgb`; guarded, ×2 each)

| seed | target C (mapped at seed L) | BEFORE painted L / C · ΔC | AFTER painted L / C · ΔC |
|---|---|---|---|
| `oklch(0.65 0.3 150)` (-a) | 0.17901 | 0.620 / 0.1391 · −0.03995 ; −0.04013 | 0.8825 / 0.2232 · +0.04414 ; +0.04412 |
| `oklch(0.55 0.37 328)` (-b) | 0.25325 | 0.565 / 0.1782 · −0.07509 ; −0.07497 | 0.7889 / 0.1887 · −0.06460 ; −0.06591 |

The live `paletteStops` the hero hands `<Blob>` (read off the component's `config` prop, AFTER) decode to:
- -a: `0.714/0.166/126 · 0.775/0.239/142 · 0.835/0.180/158 · 0.895/0.159/174` (L/C/h)
- -b: `0.614/0.272/307 · 0.682/0.287/322 · 0.715/0.286/331 · 0.771/0.172/345`

So the painted core sits about **+0.17 L above the body stop** it was given (-a: 0.714 → 0.88; -b: 0.614 → 0.79).
At the lifted L the sRGB cusp chroma is a different number: green's grows (painted C overshoots the target by
+0.044), and magenta's shrinks (painted C undershoots by −0.065). The chroma stage is not the loss. The
LIGHTNESS the shading lands the body on is.

## The producer stages that move L (glass `src/components/blob/shaders/metaball.frag.ts`, at `2d1584a52`)

- `:330` `oklch.x = clamp(oklch.x + uBrightnessShift, 0.0, 1.0)`, the lightness bias.
- `:404` `oklch.x = min(oklch.x + uCoreGlow * (1.0 - exp(-3.0 * thickness)), 1.0)`, the Beer-Lambert core glow. It
  is greatest exactly in the thick core disk the law reads.
- `:409-410` the SSS back-light, which is rim-weighted and small in the core.
- The lit add at `:505-507` (spec/rim in linear), which is outside the core except for the glint.

## The ask (glass's call on the shape)

On the lit meatball (`morphT = 1`), let the body core land at the palette's own L, so a consumer that derives the
body stop at the seed's L (`bodyLightness`) gets that L painted at the core. Two shapes value.js would take:
1. A config knob, for example `coreGlow` scaled by the palette L headroom, or a `preserveBodyLightness` flag, that
   holds the core's OKLCh L at the sampled palette L and lets the glow read as chroma-neutral luminosity only at
   the thin edge.
2. Or the core glow is re-applied in OKLCh with a chroma re-map at the lifted L, the library's
   `mapColorToGamut` semantics (L and h held), so the body keeps the cusp chroma of the L it lands on. This is a
   smaller change but it does not hold L.

A falsifier you can run: value.js `e2e/smoke/webgl-blob-idle.spec.ts:210`, both seeds, ΔC ≤ 0.04 ×2. value.js
holds the cell **honest-RED on this row** and adopts the cure at the repin. It will not patch the shader, copy
uniforms or post-correct pixels locally.

## Two terms that are not this row

- The consumer ink floor (value.js `HeroBlob.vue` `floorStops`, T.W4-5, INK_FLOOR 0.15, ruled M-9) shifts the
  whole ramp by +0.064 L at these seeds after the derive. That is value.js's own question and is routed in
  value.js, not here.
- The sRGB-hex stop transport (`oklchStopToHex`, value APOTHEOSIS RS-5) clips a floored stop that leaves the
  gamut. That is a third, producer-owned term, already booked. It is named here for completeness.
