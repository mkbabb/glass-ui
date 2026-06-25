# W-AURORA-METALLIC — the metallic aurora medium (2 variants: pure liquid metal + gradient-metallic-sparkle)

**Surfaced by:** the user 2026-06-23 — "for our aurora, we should have a suffused new aurora variant, metallic, which will simulate a metallic gradient-like flow field that is redolent of the ios27 flow-field backgrounds. Two variants: a PURE metal version (pure liquid metal) and a GRADIENT metallic variant, which contains minor sparkle imperfections and other colors therein." Refs analyzed: `liquid-metal-background-...jpg` (pure) + `images-2.jpeg` (gradient-sparkle).

## The reference reading (frame analysis)
- **Pure liquid metal (ref 1):** a MONOCHROMATIC gold/metal FLOW field — flowing draped wave-ridges with SHARP ANISOTROPIC SPECULAR highlights riding the ridge crests (the brushed/molten-metal sheen: light streaks ALONG the flow direction, dark in the troughs). High dynamic range (near-white highlights → deep shadow). The flow is smooth + liquid (like draped silk-metal).
- **Gradient metallic (ref 2):** a SOFT warm multi-tone GRADIENT (copper → bronze → gold, several warm tones blending) suffused with FINE HIGH-FREQUENCY SPARKLE (metallic-flake glitter speckle catching light) + subtle color variation. Diffuse, no sharp ridges — a shimmering metallic wash.

## The mechanism — a new aurora MEDIUM (compose, do NOT fork the engine)
The aurora already dispatches painterly MEDIUMS by `uMedium` (smooth=0 … vangogh=5, oil-pastel=6, kuwahara=7; `aurora.frag.ts` + the WGSL twin `aurora.wgsl.ts`, the medium GLSL in `mediums.glsl.ts` / `oil-modes.glsl.ts`). `metallic` is a NEW medium (`uMedium == 8`) with a `metalMode` sub-axis (0 = pure, 1 = gradient-sparkle). It re-uses the EXISTING nuclei-field + the structure-tensor orientation (the painterly mediums already compute `structureTensorField` — the flow direction the specular rides) + the shared OKLCh color chunk. NO new substrate, NO new rAF.

- **`metalMode: "pure"`** — an ANISOTROPIC METALLIC BRDF over the field: sample the field's luminance gradient as the surface normal proxy; compute a sharp specular term ALONG the structure-tensor flow direction (anisotropic Ward/Cook-Torrance — the highlight stretches along the ridge, the molten-metal streak), a single METAL tone (the W-METAL-SHIMMER brand-metal quad gold/silver/bronze, OR a consumer `metalColor`), high-contrast remap (the near-white crest → deep-shadow trough). Reads as draped liquid metal.
- **`metalMode: "gradient"`** — the SMOOTH palette gradient (multi-tone warm, the consumer palette) + a SPARKLE term: a high-frequency hash-noise glitter (animated, sub-pixel-stable, the flake speckle) modulated by the local highlight so sparkles catch the light; + subtle per-region hue variation (the "other colors therein"). Diffuse, glittery, redolent of the ios27 metallic flow-field background.

## Fences
- GL-shader fence is the medium-dispatch pattern (AX.W13 — each medium AUTHORS its own body; no shared-dispatch leak). The smooth/oil/vangogh/kuwahara mediums BYTE-UNCHANGED (a new opt-in medium changes ZERO existing paint — proof:aurora-* stay green by construction; the metallic is reached ONLY by `medium: "metallic"`).
- WGSL parity: the WGSL twin gets the metallic body (or degrades to smooth on WebGPU until the WGSL medium lands — the W-AURORA-WGPU-MEDIUMS booked-tail pattern). The pure-metal anisotropic specular + the sparkle hash are the parity-sensitive lines (the fwidth/derivative discipline).
- The brand-metal palette is the W-METAL-SHIMMER gold/silver/bronze quad (presets-in-consumers for a custom metal); the metallic medium NEVER injects a ppmycota/demo hue into a library token.
- Performance: the metallic medium rides the EXISTING one-draw loop (offscreen-pause/PRM inherited); the sparkle is a cheap hash, the anisotropic specular a few extra ALU — budget-clearing (the W-VIZ-PERF-BUDGET worst-case test applies).

## Gate (real π, tranche-dev — born-RED, prototype-validated before close)
`proof:aurora-metallic` (device-free source: the `uMedium==8` branch + the `metalMode` sub-axis + the medium-dispatch fence + the byte-unchanged existing mediums + the WGSL parity-or-degrade) + the binding π `tests-visual/aurora-metallic.spec.ts` (the pure variant reads as anisotropic metal with specular ridges; the gradient variant reads as a warm metallic gradient with sparkle; both over the warm identity; the default `smooth` byte-identical; both engines) + the `proof:ba-gestalt` aurora-band verdict. The `dist/aurora.js` budget lifts for the metallic-medium GLSL growth (the named-successor lift pattern).

## Consumers (≥2)
The aurora studio (`medium: "metallic"` preset, both variants) + the dock/page colorful-field register (W-PAGE-BACKGROUND can stage a metallic field behind a glass surface — the ios27 metallic-flow backdrop). Booked: the dot-flow-field surpass-target (C2) may share the metallic palette.
