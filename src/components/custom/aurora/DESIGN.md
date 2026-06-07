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

### The two-tier "atoms of control" door (AW.W6)

The full ~28-field `AuroraConfig` is the AUTHOR schema (a surface for tuning a shader). `resolveAtoms(atoms) → AuroraConfig` (`composables/atoms.ts`) is a thin CONSUMER door over it — ≤7 intuitive atoms that fan out to the full config. Nothing is removed from `AuroraConfig`; the full schema stays whole as the progressive-disclosure "Advanced" escape hatch (the demo panel shows the ≤7 atoms by default with the full surface under a `Collapsible`). `resolveAtoms` is PURE + TOTAL (every atom combination — including out-of-range inputs — yields a valid in-range config respecting every `budget.ts` cap) and DEFAULT-PRESERVING (`resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG` — the wispy-sky default survives the door, machine-asserted by `proof:aurora-atoms-roundtrip`). Mechanism: clone the default and apply ONLY the PRESENT atoms as clamped overrides, so the empty atom set (`DEFAULT_ATOMS`) passes through to the default.

| Atom | Fans to |
|---|---|
| `seed` (+ `harmony`) | the derived palette via `deriveAurora` (clamped to the perf color budget) |
| `mood` (calm ↔ vivid) | `saturation` + `warpAmount` + `valueVariance` + `breathDepth` (the co-varying energy axes) |
| `medium` | the `AuroraMedium` value (+ tensor orientation for the painterly mediums) |
| `textureAmount` (0..1) | the medium's dominant texture knob (`strokeAmount`/`wetEdge`/`canvasGrain`) |
| `motion` (still·breathing·drifting) | the four motion fields (`nucleiDrift`/`paletteDrift`/`warpDrift`/`breathDepth`) |
| `zones` (2..6) | the nuclei count on a rule-of-thirds/golden prior (clamped to `MAX_NUCLEI`) |
| `interactivity` | the W6 SHAPE (default OFF — the `light`/`flow`/`scroll`/`wake` axes; behavior wired at W8) |

## 6. Spec deltas (v4 → v4.1)

- **Δ01 `warpMode: "fbm" | "cellular" | "hybrid"`** — Meadow's chunky almost-rectangular territories need cellular; pure fBm can't produce them. Hybrid averages both for soft-edged blocks.
- **Δ02 `strokeLayers: 1 | 2`** — oil-pastel crosshatching needs a second stroke layer rotated 90° from `flow.angle`. Added via average-blend so ridges weave rather than explode.
- **Δ03 Cursor API** — `setCursor(x, y, strength)` / `clearCursor()` / `setCursorRadius(r)`. Palette zones DO rotate near cursor despite the draft invariant saying otherwise; this is a deliberate reversal driven by reference-image fidelity.
- **Δ04 `strokeMode` under `medium: "oil"`** — `oil` default (balanced bristle), `knife` (razor edges, flat, heavy impasto), `crayon` (anisotropic tooth noise multiplied into base, NOT stroke-based), `chunky` (thick gestural bristle).
- **Δ05 live/capture runtime modes** — live canvases avoid capture-only drawing-buffer preservation; capture and thumbnail bakes opt into it explicitly and use `renderAt()` as a draw-only call.
- **Δ06 `opacity-ceiling` prop (A3 §6.R-9 / G-AK-D11)** — per-route outer compositing clamp. The drift overwhelms form/text density at full saturation on quiet content-over-aurora routes (survey, thankyou, admin-login); consumers opt these routes in to `0.5` while hero surfaces stay at the `1.0` default. Bound as `--aurora-opacity-ceiling` on the root and consumed by both the placeholder and the armed-canvas opacity, so the cross-fade and the pre-armed paint ride under the same envelope. Distinct from `config.alpha`, which gates per-pixel pigment opacity inside the shader.

## 7. Load-bearing implementation notes

- **Palette is baked to LINEAR sRGB**, not gamma-sRGB. The shader ACES-tonemaps in linear. `oklchToLinear()` and `flattenPalette()` in `composables/color.ts`.
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

### The painterly engine (AW.W4)

- **Structure-tensor / edge-tangent-flow orientation (the keystone).** `structureTensorField()` (`mediums.glsl.ts`) Sobel-samples `luma(sampleBase)` over a small fixed-tap 3×3 neighborhood, forms the 2×2 structure tensor `J = [[Gx², GxGy],[GxGy, Gy²]]`, and eigen-decomposes it closed-form via the principal angle `θ = ½·atan2(2·Jxy, Jxx−Jyy)`. The **minor** eigenvector (`(−sin θ, cos θ)`) is the edge **TANGENT** — the stroke direction that hugs the color zones; the **major** eigenvector points along the gradient (the edge normal) and would make strokes cross the bands. The coherence `A = (λ₁−λ₂)/(λ₁+λ₂)` drives a `mix(fallbackDir, tangent, A)` blend so low-structure (flat) zones relax toward the smooth flow rather than reading tensor noise as jitter. Selected via `strokeOrient: "flow" | "tensor"` (default `flow` — the hand-authored `flowField`); the painterly mediums force `tensor`. The single biggest "congruent to real Van Gogh" lever: orientation derives from the image's own structure, not a pattern. The atan2 form is robust at `Jxy≈0` (where the `(λ−Jyy, Jxy)` eigenvector formula collapses to a zero vector). The principal-angle math is line-for-line in `tests/components/custom/aurora/painterly.test.ts`.
- **Real impasto — height → normal → relight (the fixed rim RETIRED).** The faked fixed-RGB edge rim (`vec3(0.18,0.15,0.11)`, the phantom upper-left light) is GONE. `paintOver()` now deposits per-stroke PAINT HEIGHT into an `inout float height` (coverage × thickness, perturbed by the bristle/streak fbm for ridges/grooves); `relightImpasto()` derives a normal from `dFdx/dFdy(height)` and applies diffuse + Blinn specular from the **movable** `uLightDir`/`uLightColor` source — in LINEAR before `aces()` (the tonemap/OETF seam `proof:aurora-space-gamma` locks stays after). Thin strokes inherit a low shininess; thick impasto raises it (high-height ridges catch a sharp glint). `uLightDir` is the interactive axis AW.W8 drives from the cursor (cursor-as-light); default upper-left so the still default reads identically to the prior rim.
- **The van-Gogh atomic-stroke medium (`vangogh`, uMedium==5).** A first-class `AuroraMedium`. Composes the oil stroke engine with the ETF orientation (forced tensor), the **energy-graded** cascade (`bestOil` modulates stroke length by `luma(sampleBase)` AND coherence when `uMedium==5` — long confident strokes in the lights/coherent zones, short dabs in the darks/flat zones, the Starry-Night Kolmogorov/Batchelor congruence), the OKLCh per-stroke pigment jitter (`brokenColorJitter`), and the real impasto relight. No subject matter — the "source image" is the generated nuclei field, so strokes trace its iso-bands.
- **Genuine oil-pastel deposition (`oil-pastel`, uMedium==6).** `mediumCrayon` is reworked from the old tooth-MULTIPLY gradient into a material-truth model: tooth-occlusion DEPOSITION (pigment on the paper-height peaks, skips valleys — light pressure shows paper, heavy fills it), a broken SCUMBLE upper pass at coverage < 1 (the lower color shows through the gaps), and a waxy BURNISH film (a low-roughness broad specular lobe whose sheen grows with build-up, distinct from oil's sharp glint). Oriented along the ETF; OKLCh broken color. The first-class `oil-pastel` (uMedium==6) AND the legacy `crayon` peer (uMedium==4) share this single body — no duplicate.
- **The WebGL2-single-pass-now / WebGPU-full-quality-later split (the AW.W4 → AW.W7 handoff).** W4 ships the ETF orientation field as a single-pass small-tap approximation (the load-bearing fidelity lever). The Gaussian-smoothed multi-tap structure tensor, the LIC (line-integral-convolution) smear that convolves the field ALONG the ETF orientation, and the anisotropic Kuwahara finish are multi-pass operators the single-pass WebGL2 fragment shader fundamentally cannot express (invariant 8 bans multi-pass) — they stage on the AW.W7 WebGPU branch, which relaxes the constraint. ETF-without-LIC here is honest: the orientation field is the direction source; the LIC smear is the WebGPU finish.

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
├── index.ts                      # barrel
├── DESIGN.md                     # this file
├── constants/                    # the constant-tier files (no reactivity, no lifecycle)
│   ├── presets.ts                # types only + DEFAULT_AURORA_CONFIG + MAX_* constants
│   ├── renderMode.ts             # AuroraRenderMode union + resolveRenderMode device-tier resolver
│   └── shaders/
│       ├── aurora.vert.ts        # full-screen triangle via VBO (`in vec2 aPos`)
│       └── aurora.frag.ts        # the entire pipeline — composition + medium + post
└── composables/
    ├── color.ts                  # OKLCh math + oklchToLinear + flattenPalette
    ├── runtime.ts                # createAurora — live/capture WebGL lifecycle + cursor easing + renderAt
    ├── useAurora.ts              # Vue-side wrapper: onMounted/watch/onBeforeUnmount
    └── useCursorInteraction.ts   # pointer layer: continuous swirl + nucleus CRUD
```

Demo studio composition (the 11 authored presets and the configurator UI) lives at `demo/stories/aurora/`.
