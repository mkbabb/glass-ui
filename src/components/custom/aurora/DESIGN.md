# Aurora — procedural painterly gradient system

**Status**: design document v4.1 (2026-04). Supersedes v1–v4.

## 1. Purpose

A WebGL2 fragment-shader background that procedurally generates images in the visual language of OpenAI / DALL-E / Sora press-release imagery and its adjacent lineage — Helen Frankenthaler soak-stain, Japanese bokashi printing, Cy Twombly's chalk surfaces, 2024-era aurora-UI trend imagery, and the painterly-shader / anisotropic-Kuwahara NPR literature.

Two stylistic poles, one shader:

- **Atmospheric/smooth** — blurred, no visible brush, reads as colored gas or wet-on-wet flood (references: OpenAI GPT-4.5 hero, DALL-E model icons, GA Stories 16:9).
- **Painterly/gestural** — visible pastel, watercolor, or oil impasto texture (references: Deliberative-alignment post header, Day9 card, oil-pastel 157).

The `medium` uniform and its `strokeMode` sub-axis span both poles continuously.

## 2. Visual invariants

Observed across all references; violating any visibly breaks the aesthetic lineage.

1. **Multi-nuclei attractor composition.** 2–6 amorphous color zones, each organized around an attractor with its own palette position. Authored per preset, not generated.
2. **Organic region boundaries.** Gaussian softmax falloff warped by Quilez-double-fBm (plus optional cellular or hybrid).
3. **Within-region value variation.** Every color zone has internal L/C mottling driven by `valueVariance` × the softmax-weighted `valueBias`. No flat fills.
4. **Optional medium overlay.** Watercolor wet-edge / granulation, pastel anisotropic fBm stroke, or oil (four sub-modes) applied on top. Medium is orthogonal to composition.
5. **Flow couples to medium only for palette placement** — flow never drives which palette stop a pixel picks. But see (6).
6. **Cursor deflects flow AND composition.** Gaussian-radius rotation around the pointer enters both `domainWarp` (color zones swirl) and `flowField` (stroke direction bends). This was a deliberate change from the v4 spec's "flow only" draft — references demand visible color-band curl, not just stroke bend. Palette position stays put; only the spatial coordinate is rotated.
7. **Breath-paced motion.** Primary `warpDrift` at 0.005–0.010; full breath cycle 40–60 s. Stroke texture stays static (material, not process).
8. **Single draw, single shader, zero deps.** One full-screen triangle; one fragment program; uniforms select medium and flow behavior.

## 3. Non-invariants (explicit non-goals)

- No single focal point driving palette (creates visible locus — error in v1–v3).
- No pure fBm color-id (bell-shaped, center-biased — palette extremes never sampled).
- No spatial-distance axis for palette (creates contour-line artifacts).
- No global saturation/contrast compensation tricks (workarounds masking bad architecture).
- No medium-specific shader branches at the top level. One shader. Medium parameters route inside.
- No multi-pass pipelines.
- No external libraries.

## 4. Architecture

```
fragment(p):
  # 1. Composition
  p_warp = domainWarp(p, t)                       # Quilez double + cellular/hybrid + cursor rotate
  (paletteId, valueMod) = nucleiField(p_warp, t)  # softmax-weighted metaballs
  col = samplePalette(paletteId)                  # LUT in linear sRGB
  col *= 1 + valueVariance · valueMod
  col *= 1 + breath · 0.5                         # slow luminance wobble

  # 2. Medium
  if medium == pastel:     col = mediumPastel(col, p, t)     # anisotropic fBm stroke + fine tooth
  if medium == watercolor: col = mediumWatercolor(col, p, t) # wet-edge mask + granulation + wash band
  if medium == oil:        col = mediumOil(col, p, t)        # strokeMode-routed:
                                                             #   oil     → 4-layer curved-spine strokes
                                                             #   knife   → razor-hard flat-even shape
                                                             #   crayon  → anisotropic tooth multiply (NO STROKES)
                                                             #   chunky  → thick bristle brush

  # 3. Post
  col = saturate3(col, saturation)
  col = aces(col)
  col += (hash − 0.5) · paperGrain
  col = clamp(col · 0.985 + 0.008, 0, 1)          # never pure black / pure white
  fragColor = vec4(col · alpha, alpha)
```

### Cursor inside the shader

Cursor enters twice:

- **domainWarp** — `p − uCursor` rotates by `w · uCursorStrength · 2.1` rad (w = Gaussian of distance / radius), plus a `w · 0.08` pinch toward the cursor; blended into the warped position by `w · uCursorStrength`.
- **flowField** — `dir` angle blends toward the tangent-to-cursor angle by `w · uCursorStrength`.

Both channels share `uCursor`, `uCursorStrength`, `uCursorRadius`. JS-side easing: position lerp 0.22/frame, strength lerp 0.18/frame, `targetStrength *= 0.992` per frame (≈2 s decay after pointerleave).

## 5. Public API

```ts
// src/components/custom/aurora/presets.ts — types only, no authored themes
export interface OklchStop { L: number; C: number; h: number; }

export interface AuroraNucleus {
    x: number;               // 0..1, CSS top-origin
    y: number;
    radius: number;          // 0.15..0.8
    paletteBias: number;     // 0..1
    valueBias: number;       // -0.3..0.3
    driftRadius: number;     // 0..0.03
    driftPhase: number;      // 0..2π
}

export type AuroraMedium = "smooth" | "pastel" | "watercolor" | "oil";
export type StrokeMode   = "oil" | "knife" | "crayon" | "chunky";
export type FlowPattern  = "none" | "radial" | "swirl" | "diagonal" | "multi";
export type WarpMode     = "fbm" | "cellular" | "hybrid";

export interface AuroraFlow {
    pattern: FlowPattern;
    focalX: number;          // 0..1 CSS top-origin
    focalY: number;
    angle: number;           // degrees
    curl: number;            // 0..1
}

export interface AuroraConfig {
    palette: OklchStop[];    // 2..MAX_STOPS (8)
    nuclei: AuroraNucleus[]; // 1..MAX_NUCLEI (6)
    softmaxBeta: number; valueVariance: number;
    warpAmount: number; warpScale: number; warpDrift: number; warpMode: WarpMode; noiseOctaves: 3 | 4 | 5;
    medium: AuroraMedium; flow: AuroraFlow;
    strokeAmount: number; strokeScale: number; strokeAnisotropy: number;
    strokeLayers: 1 | 2; strokeMode: StrokeMode;
    wetEdge: number; granulation: number;
    impasto: number; brokenColor: number; canvasGrain: number;
    nucleiDrift: number; paletteDrift: number;
    breathDepth: number; breathPeriod: number;
    saturation: number; paperGrain: number; alpha: number;
}

export interface AuroraInstance {
    update(cfg: AuroraConfig): void;
    setCursor(x: number, y: number, strength?: number): void;
    clearCursor(): void;
    setCursorRadius(r: number): void;
    setReducedMotion(flag: boolean): void;
    renderAt(t: number): void;  // deterministic render for thumbnail bakes
    pause(): void;
    resume(): void;
    dispose(): void;             // releases context via WEBGL_lose_context
}
```

`createAurora(canvas, config, options?): AuroraInstance` is the imperative core. Live runtimes default to `{ preserveDrawingBuffer: false }`; capture runtimes pass `{ mode: "capture" }` or an explicit `preserveDrawingBuffer` override. `useAurora(ref, config, options?)` is the Vue wrapper that watches config deeply and updates uniforms on change.

Per memory rule "Presets in consumers": the 11 authored themes (Sky, Dawn, Meadow, Deliberative, Day9, Oil Impasto, Oil Gestural, Oil Van Gogh, Crayon Sunset, Crayon Rainbow, Crayon Ocean) live at `demo/stories/aurora/presets.ts`, not here.

## 6. Spec deltas (v4 → v4.1)

- **Δ01 `warpMode: "fbm" | "cellular" | "hybrid"`** — Meadow's chunky almost-rectangular territories need cellular; pure fBm can't produce them. Hybrid averages both for soft-edged blocks.
- **Δ02 `strokeLayers: 1 | 2`** — oil-pastel crosshatching needs a second stroke layer rotated 90° from `flow.angle`. Added via average-blend so ridges weave rather than explode.
- **Δ03 Cursor API** — `setCursor(x, y, strength)` / `clearCursor()` / `setCursorRadius(r)`. Palette zones DO rotate near cursor despite the draft invariant saying otherwise; this is a deliberate reversal driven by reference-image fidelity.
- **Δ04 `strokeMode` under `medium: "oil"`** — `oil` default (balanced bristle), `knife` (razor edges, flat, heavy impasto), `crayon` (anisotropic tooth noise multiplied into base, NOT stroke-based), `chunky` (thick gestural bristle).
- **Δ05 live/capture runtime modes** — live canvases avoid capture-only drawing-buffer preservation; capture and thumbnail bakes opt into it explicitly and use `renderAt()` as a draw-only call.

## 7. Load-bearing implementation notes

- **Palette is baked to LINEAR sRGB**, not gamma-sRGB. The shader ACES-tonemaps in linear. `oklchToLinear()` and `flattenPalette()` in `composables/color.ts`.
- **`preserveDrawingBuffer` is capture-only by default.** WebGL context attributes are fixed at context creation, so live runtimes default false while thumbnail/capture runtimes opt true. Without preservation, `readPixels` / `toDataURL` after the composited frame is not a stable capture contract.
- **Nuclei y-coordinate is CSS-top-origin** (0 = top, 1 = bottom). Runtime flips Y at the uniform boundary — see `AUTHOR_Y_ORIGIN_IS_TOP` marks in `runtime.ts`. Config authoring stays top-origin.
- **Thumbnail baking uses a shared offscreen context.** 11 presets + 1 live stage exceeds Chromium's ~8 contexts/page cap. One capture-mode aurora, `update(frozen) + renderAt(1.0) + toDataURL` per preset, `dispose()` releasing via `WEBGL_lose_context`. Pattern at `demo/stories/aurora/usePresetThumbnails.ts`.
- **`renderAt()` is draw-only.** It uploads `uTime`, current cursor uniforms, clears, and draws once. It does not mutate `startTime`, advance cursor easing/decay, schedule/cancel RAF, or change running state.
- **Crayon is not strokes.** `mediumOil_crayon()` rotates `p` to align with flow then multiplies anisotropic tooth noise into base color. Routing via `strokeMode == 2` inside `mediumOil`.
- **Broken oil color is deterministic pigment jitter.** `uBrokenColor` affects oil-family output only: stroke modes hash each stroke cell to hue-shift and value-jitter the midpoint pigment, while crayon hashes stable pigment patches. The maximum shader shift is intentionally bounded (about ±16° hue and ±14% value at `brokenColor = 1`) so presets read as broken paint rather than random color noise.
- **Oil crosshatch flow is layer-routed.** `bestOil()` consumes the flow vector passed by the caller as its base stroke direction and adds only deterministic per-cell perturbation. The optional second layer passes a perpendicular flow so `strokeLayers: 2` materially changes the hatch direction without adding shader variants.
- **Cursor state** — JS-side easing and decay required; shader alone can't provide breath-paced cursor response without framerate-dependent artifacts.

## 8. Reference implementations

- Claude Design bundle (the source of truth for this port): canonical `shader.js`, `runtime.js`, `presets.js`, `color.js`.
- Iñigo Quilez — [Domain warping](https://iquilezles.org/articles/warp/), [fBm](https://iquilezles.org/articles/fbm/), [Smooth Voronoi](https://iquilezles.org/articles/smoothvoronoi/).
- Alex Harri — [WebGL gradients deconstructed](https://alexharri.com/blog/webgl-gradients).
- Kevin Hufnagl — [Stripe gradient teardown](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/).
- Maxime Heckel — [On crafting painterly shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/).
- Bousseau et al. 2006 — [Interactive watercolor rendering](https://artis.inrialpes.fr/Publications/2006/BKTS06/watercolor.pdf).
- Meier 1996 / Hertzmann 1998 — painterly rendering foundations.
- Kyprianidis 2013 — NPR state-of-the-art taxonomy.

## 9. Module layout

```
src/components/custom/aurora/
├── Aurora.vue                    # canvas wrapper + useAurora + defineExpose cursor API
├── presets.ts                    # types only + DEFAULT_AURORA_CONFIG + MAX_* constants
├── index.ts                      # barrel
├── DESIGN.md                     # this file
├── shaders/
│   ├── aurora.vert.ts            # full-screen triangle via VBO (`in vec2 aPos`)
│   └── aurora.frag.ts            # the entire pipeline — composition + medium + post
└── composables/
    ├── color.ts                  # OKLCh math + oklchToLinear + flattenPalette
    ├── runtime.ts                # createAurora — live/capture WebGL lifecycle + cursor easing + renderAt
    ├── useAurora.ts              # Vue-side wrapper: onMounted/watch/onBeforeUnmount
    └── useCursorInteraction.ts   # pointer layer: continuous swirl + nucleus CRUD
```

Demo studio composition (the 11 authored presets and the configurator UI) lives at `demo/stories/aurora/`.
