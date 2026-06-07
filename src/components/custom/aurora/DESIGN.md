# Aurora — procedural painterly gradient system

**Status**: design document v5.0 (the post-AW cut). Supersedes v1–v4.1.

This is the design document **of record** — the *why* behind the shader
architecture, distinct from the consumer-contract `README.md` (which W33 owns).
v5.0 brings the doc current with the AW aurora band: the W5 shared-color splice
(landed), and the W4 painterly mediums + the W7 WebGPU/multi-pass relaxation
(staged as the forward contract — see §10 "Spec deltas (v4.1 → v5.0)" for the
landed-vs-staged split). The earlier v4 → v4.1 deltas stay archived at §6.

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
4. **Optional medium overlay.** Watercolor wet-edge / granulation, pastel anisotropic fBm stroke, oil (four sub-modes), or the energy-graded **van-Gogh atomic-stroke** medium applied on top. Medium is orthogonal to composition. The stroke ORIENTATION axis (`strokeOrient`) routes each stroke off the global `flow` vector OR — staged on AW.W4 — off the per-pixel **structure-tensor / edge-tangent-flow** field (Kyprianidis & Kang 2009; the minor eigenvector of `J=[[Gx·Gx,Gx·Gy],[Gx·Gy,Gy·Gy]]`), so strokes follow the painted edges rather than a single global angle. The impasto axis is a **real height-field relight** — height → normal → a `uLightDir`-driven catch-light — not a fixed-RGB rim constant (the W4 painterly arc; staged-not-yet-landed on the WebGL2 single-pass path per the README's `planned (AW.W4)`).
5. **Flow couples to medium only for palette placement** — flow never drives which palette stop a pixel picks. But see (6).
6. **Cursor deflects flow AND composition.** Gaussian-radius rotation around the pointer enters both `domainWarp` (color zones swirl) and `flowField` (stroke direction bends). This was a deliberate change from the v4 spec's "flow only" draft — references demand visible color-band curl, not just stroke bend. Palette position stays put; only the spatial coordinate is rotated.
7. **Breath-paced motion.** Primary `warpDrift` at 0.005–0.010; full breath cycle 40–60 s. Stroke texture stays static (material, not process).
8. **WebGL2 is single-pass-universal; multi-pass is the capability-gated enhancement.** The universal contract is ONE full-screen triangle, ONE fragment program, ZERO deps — uniforms select medium and flow behavior. This is the FALLBACK invariant: every engine renders the full visual contract on a single WebGL2 fragment pass with no FBO ping-pong and no external library. AW.W7 is the HINGE wave that RELAXES the single-pass constraint *additively, on the WebGPU branch only*: it stages a `createGPUCanvas` substrate behind `navigator.gpu`, a hand-written WGSL color/noise twin gated to its GLSL twin at 1e-6, and the genuinely multi-pass painterly passes a single fragment shader fundamentally cannot express — the Gaussian-smoothed multi-tap structure tensor and the anisotropic Kuwahara finish (the canonical "make a gradient read as oil paint" operator). The WebGPU multi-pass is a capability-gated ENHANCEMENT, not a violated invariant: WebGL2 STAYS the declared zero-regression fallback and renders the identical single-pass contract. (See §10 Δ09; the W7 substrate is staged-not-yet-landed — the README marks it `(planned — AW.W7)`.)

## 3. Non-invariants (explicit non-goals)

- No single focal point driving palette (creates visible locus — error in v1–v3).
- No pure fBm color-id (bell-shaped, center-biased — palette extremes never sampled).
- No spatial-distance axis for palette (creates contour-line artifacts).
- No global saturation/contrast compensation tricks (workarounds masking bad architecture).
- No medium-specific shader branches at the top level. One shader. Medium parameters route inside.
- **No multi-pass pipelines ON THE WEBGL2 PATH** (invariant 8). The WebGL2 fallback is single-pass-universal; multi-pass is the capability-gated WebGPU enhancement (the smoothed multi-tap structure tensor + the anisotropic Kuwahara finish, AW.W7) — additive on the WebGPU branch, no-op on WebGL2. Multi-pass is NOT a non-goal of the system; it is a non-goal of the *fallback* path.
- No external libraries — neither path pulls Three.js/TSL; the WGSL twin is hand-written (the zero-dep posture survives the WebGPU staging).

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
// src/components/custom/aurora/constants/presets.ts — types only, no authored themes
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

The `<Aurora>` SFC also accepts a `:opacity-ceiling` prop (`number`, default `1.0`, clamped `[0, 1]`) — the *outer compositing envelope* applied uniformly to the placeholder and the canvas via `--aurora-opacity-ceiling`. Distinct from `config.alpha` (per-pixel pigment opacity inside the shader): the ceiling is a per-route saturation clamp for content-over-aurora surfaces (forms, text-dense panels) so the drift recedes behind page content without altering the painted image. Hero surfaces stay at `1.0`; quiet routes opt in to `0.5` or thereabouts.

Per memory rule "Presets in consumers": the 11 authored themes (Sky, Dawn, Meadow, Deliberative, Day9, Oil Impasto, Oil Gestural, Oil Van Gogh, Crayon Sunset, Crayon Rainbow, Crayon Ocean) live at `demo/stories/aurora/presets.ts`, not here.

## 6. Spec deltas (v4 → v4.1) [archived]

> Historical — the v4.1 cut. The current post-AW deltas are §10 (v4.1 → v5.0).

- **Δ01 `warpMode: "fbm" | "cellular" | "hybrid"`** — Meadow's chunky almost-rectangular territories need cellular; pure fBm can't produce them. Hybrid averages both for soft-edged blocks.
- **Δ02 `strokeLayers: 1 | 2`** — oil-pastel crosshatching needs a second stroke layer rotated 90° from `flow.angle`. Added via average-blend so ridges weave rather than explode.
- **Δ03 Cursor API** — `setCursor(x, y, strength)` / `clearCursor()` / `setCursorRadius(r)`. Palette zones DO rotate near cursor despite the draft invariant saying otherwise; this is a deliberate reversal driven by reference-image fidelity.
- **Δ04 `strokeMode` under `medium: "oil"`** — `oil` default (balanced bristle), `knife` (razor edges, flat, heavy impasto), `crayon` (anisotropic tooth noise multiplied into base, NOT stroke-based), `chunky` (thick gestural bristle).
- **Δ05 live/capture runtime modes** — live canvases avoid capture-only drawing-buffer preservation; capture and thumbnail bakes opt into it explicitly and use `renderAt()` as a draw-only call.
- **Δ06 `opacity-ceiling` prop (A3 §6.R-9 / G-AK-D11)** — per-route outer compositing clamp. The drift overwhelms form/text density at full saturation on quiet content-over-aurora routes (survey, thankyou, admin-login); consumers opt these routes in to `0.5` while hero surfaces stay at the `1.0` default. Bound as `--aurora-opacity-ceiling` on the root and consumed by both the placeholder and the armed-canvas opacity, so the cross-fade and the pre-armed paint ride under the same envelope. Distinct from `config.alpha`, which gates per-pixel pigment opacity inside the shader.

## 7. Load-bearing implementation notes

- **The OKLCh color math is SHARED, not aurora-local (AW.W5).** The CPU-side palette bake — `oklchToLinear()` + `flattenPalette()` — still composes in `composables/color.ts`, but `color.ts` now RE-EXPORTS the shared `/color` leaf core (`src/composables/color`), and the GPU-side OKLCh lives in the SHARED `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` chunk that aurora's `aurora.frag.ts` AND the blob's `metaball.frag.ts` both splice (`${OKLCH_MATRICES_GLSL}`, `${OETF_GLSL}`, `${FBM_ROT_GLSL}`). So the Ottosson OKLab/OKLCh matrices + the sRGB OETF have exactly ONE source and can NEVER drift between aurora and the blob (`proof:single-color-core` + `proof:shader-shared-source` freeze it). The W5 arm also lands the **in-shader OKLCh interpolation** (`mixPaletteOklchArc` + `brokenColorJitter` operate in OKLab/OKLCh inside the fragment program — the palette interp + the per-stroke jitter no longer run in linear-sRGB/YIQ) and the `deriveAurora` / `deriveScene(seed, mood)` front door.
- **Palette is baked to LINEAR sRGB** for the LUT, not gamma-sRGB. The shader ACES-tonemaps in linear, then closes the mandatory sRGB OETF (`linearToSrgb`, spliced from the shared chunk) at `main()` — the AV.W1 too-dark defect is fixed at the single OETF source.
- **`preserveDrawingBuffer` is capture-only by default.** WebGL context attributes are fixed at context creation, so live runtimes default false while thumbnail/capture runtimes opt true. Without preservation, `readPixels` / `toDataURL` after the composited frame is not a stable capture contract.
- **Nuclei y-coordinate is CSS-top-origin** (0 = top, 1 = bottom). Runtime flips Y at the uniform boundary — see `AUTHOR_Y_ORIGIN_IS_TOP` marks in `runtime.ts`. Config authoring stays top-origin.
- **Thumbnail baking uses a shared offscreen context.** 11 presets + 1 live stage exceeds Chromium's ~8 contexts/page cap. One capture-mode aurora, `update(frozen) + renderAt(1.0) + toDataURL` per preset, `dispose()` releasing via `WEBGL_lose_context`. Pattern at `demo/stories/aurora/usePresetThumbnails.ts`.
- **`renderAt()` is draw-only.** It uploads `uTime`, current cursor uniforms, clears, and draws once. It does not mutate `startTime`, advance cursor easing/decay, schedule/cancel RAF, or change running state.
- **Shader space is normalized.** The fragment program samples composition and media in `vUv` / 0..1 space. CSS sizing and the canvas backing store own aspect and DPR; the shader has no live `uRes`/`uDpr` surface.
- **Crayon is not strokes — it is a PEER medium.** `mediumCrayon()` rotates `p` to align with flow then multiplies anisotropic tooth noise into base color. It dispatches at `main()` level (`uMedium == 4`) alongside pastel/watercolor/oil, NOT as a branch inside `mediumOil()`. The runtime resolves a `medium: "oil"` + `strokeMode: "crayon"` config to the crayon peer (`resolveMediumId`).
- **`strokeAmount` gates oil stroke opacity.** Oil, knife, and chunky modes use `strokeAmount` as the main stroke-compositing opacity and as the impasto strength multiplier. At zero, curved strokes do not repaint the base field; crayon remains a tooth/noise multiplier by design.
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
├── index.ts                      # barrel (Aurora, useAurora, deriveAurora, deriveScene, types)
├── DESIGN.md                     # this file (the design document of record)
├── README.md                    # the consumer-contract guide (W33's surface)
├── constants/                    # the constant-tier files (no reactivity, no lifecycle)
│   ├── presets.ts                # types only + DEFAULT_AURORA_CONFIG + MAX_* constants
│   ├── renderMode.ts             # AuroraRenderMode union + resolveRenderMode device-tier resolver
│   ├── budget.ts                 # the per-tier uniform/cost caps the resolver enforces
│   └── shaders/
│       ├── aurora.vert.ts        # full-screen triangle via VBO (`in vec2 aPos`)
│       ├── aurora.frag.ts        # the assembly point — splices the shared chunk + the .glsl.ts media
│       ├── composition.glsl.ts   # nuclei field + domain warp + palette sample
│       ├── flow.glsl.ts          # flow-field direction + cursor deflection
│       ├── brush.glsl.ts         # the curved-spine oil stroke + impasto rim
│       ├── mediums.glsl.ts       # mediumWatercolor / mediumPastel / mediumCrayon / mediumOil dispatch
│       └── tonemap.glsl.ts       # ACES + the saturate3 / clamp post
└── composables/
    ├── color.ts                  # CPU OKLCh bake — RE-EXPORTS the shared /color leaf (AW.W5) + deriveAurora/deriveScene
    ├── runtime.ts                # createAurora — live/capture WebGL lifecycle orchestration
    ├── glSetup.ts                # program/VBO/uniform-location setup
    ├── uniformBridge.ts          # config → uniform upload (the AuroraConfig → GL seam)
    ├── frameLoop.ts              # the rAF clock + renderAt draw-only call
    ├── configSource.ts           # config normalization + reactive source
    ├── cursorModel.ts            # cursor easing + decay state
    ├── useAurora.ts              # Vue-side wrapper: onMounted/watch/onBeforeUnmount
    └── useCursorInteraction.ts   # pointer layer: continuous swirl + nucleus CRUD

src/composables/glass/webgl/shaders/
└── procedural-color.glsl.ts      # SHARED (AW.W5) — OKLCH_MATRICES_GLSL + OETF_GLSL + FBM_ROT_GLSL;
                                   # aurora.frag.ts AND the blob's metaball.frag.ts both splice it
```

The aurora SFC + runtime + `useAurora` ride the shared `useWebGLCanvas` substrate (the AU.W6 WebGL2 lifecycle + the AV.W7 offscreen-pause / PRM-freeze park machinery) — aurora does not own its own rAF/context lifecycle. Demo studio composition (the 11 authored presets and the configurator UI) lives at `demo/stories/aurora/`.

## 10. Spec deltas (v4.1 → v5.0)

The post-AW cut. Each delta is tagged **LANDED** (in the aurora source at the
v5.0 base) or **STAGED** (the forward contract the README marks `(planned —
AW.W*)`; the design-of-record documents it so the architecture is whole and the
W4/W7 implementation lands against a current spec, not an aspirational shipped
claim).

- **Δ07 — Shared OKLCh color source (AW.W5, LANDED).** The GPU-side OKLCh math
  moved out of an aurora-local copy into the SHARED
  `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` chunk
  (`OKLCH_MATRICES_GLSL` + `OETF_GLSL` + `FBM_ROT_GLSL`) that `aurora.frag.ts`
  AND the blob's `metaball.frag.ts` both splice — ONE source for the Ottosson
  matrices + the sRGB OETF, so they can never drift between the two surfaces
  (`proof:single-color-core` + `proof:shader-shared-source`). `color.ts`
  RE-EXPORTS the shared `/color` leaf core for the CPU bake (surface preserved).
  The W5 arm also lands **in-shader OKLCh interpolation** (`mixPaletteOklchArc`
  + `brokenColorJitter` in OKLab/OKLCh, not linear-sRGB/YIQ) and the
  `deriveAurora` / `deriveScene(seed, mood)` front door. (§7 + §9 reflect this.)

- **Δ08 — Painterly mediums + structure-tensor orientation (AW.W4, STAGED).**
  The energy-graded **van-Gogh atomic-stroke** medium (tensor strokes + impasto
  + OKLCh per-stroke jitter), the per-pixel **structure-tensor / ETF**
  orientation field driving `strokeOrient: "flow" | "tensor"` (strokes follow
  painted edges, not a single global angle), the **real height-field impasto
  relight** (`uLightDir`-driven catch-light replacing the fixed-RGB rim
  constant), and the reworked oil-pastel deposition/scumble bake. All on the
  WebGL2 single-pass path inside `profile:budget`; the Gaussian-smoothed
  multi-tap tensor is the Δ09 WebGPU scope. (§2.4 reflects the axis names.)

- **Δ09 — WebGPU multi-pass relaxation of invariant 8 (AW.W7, STAGED).** The
  HINGE wave that relaxes the single-pass constraint *additively, on the WebGPU
  branch only*: a `createGPUCanvas` substrate behind `navigator.gpu`, a
  hand-written WGSL color/noise twin gated to its GLSL twin at 1e-6
  (`proof:aurora-wgsl-equivalence`), and the genuinely multi-pass painterly
  passes a single fragment shader cannot express — the Gaussian-smoothed
  multi-tap structure tensor + the **anisotropic Kuwahara** finish. WebGL2 STAYS
  the declared zero-regression single-pass FALLBACK
  (`proof:aurora-backend-fallback`); the WebGPU multi-pass is a capability-gated
  ENHANCEMENT, not a violated invariant. (§2 invariant 8 + §3 reflect the
  re-statement.) Hand-written WGSL — no Three.js/TSL (the zero-dep posture
  survives).
