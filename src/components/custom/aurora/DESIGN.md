# Aurora — procedural painterly gradient system

**Status**: design document v4. Supersedes v1–v3.

## 1. Purpose

A WebGL2 fragment-shader background system that procedurally generates images in the visual language of OpenAI / DALL-E / Sora press-release imagery and the adjacent painterly-gradient lineage (Color Field painting, Japanese bokashi, Helen Frankenthaler soak-stain, Cy Twombly chalk surfaces, 2024-era "aurora UI").

No single canonical name exists for this aesthetic — our reference set converges on two stylistic poles, each with its own community name:

- **"Aurora"** / atmospheric / volumetric — smooth, blurred, no visible brush (OpenAI GPT-4.5, DALL-E model icons, GA Stories)
- **"Painterly"** / gestural — visible pastel, watercolor, or oil impasto texture (Deliberative alignment, Day9 card, oil-pastel 157)

The system must span both poles continuously as a medium parameter, not as separate shaders.

## 2. Visual invariants (what the output must satisfy)

Observed across all references:

1. **Multi-nuclei attractor composition**. Canvas decomposes as 2–6 amorphous color zones, each organized around an attractor point with its own palette position. Not a single focal, not a pure fBm field.
2. **Organic region boundaries**. Edges never vector-geometric. Formed by Gaussian attractor falloff softly warped by 2–3 octaves of fBm.
3. **Within-region value variation**. Every color zone has internal L/C mottling. No flat fills.
4. **Optional medium overlay**. Medium texture (stroke, grain, wet-edge, impasto) is applied on top of the composition and is independent of it.
5. **Flow field couples to medium only**. Flow determines stroke direction; it does not drive palette placement.
6. **Breath-paced motion**. Primary drift at 0.05–0.15 Hz. Multiple scales: nuclei drift (20–40 s), warp domain (8–15 s), grain (3–6 s or 0).
7. **Desaturated-at-boundaries palette**. High chroma at nucleus centers, softer mixing toward edges. ACES-style tonemap. Never pure white, never pure black.

## 3. Non-invariants (what we explicitly do NOT do)

- No single focal point driving palette (creates visible locus — error of v1–v3).
- No spatial-distance axis for palette sampling (creates contour lines — error of v3).
- No pure fBm color-id (bell-shaped, center-biased — palette extremes never sampled).
- No global saturation/contrast compensation tricks (workarounds masking bad architecture).
- No medium-specific shader branches. One shader, medium parameters modulate behavior.
- No multi-pass pipelines. Single full-screen triangle, one draw call, one fragment shader.
- No external libraries. Zero-dep WebGL2.

## 4. Architecture — three layers, one shader pass

```
┌──────────────────────────────────────────────────────────────────────┐
│ fragment(p):                                                         │
│                                                                      │
│   1. Composition layer — multi-nuclei attractor field                │
│      p_warp  = p + A·fbm₂(p + B·fbm₂(p + t·ω_warp))   // IQ warp    │
│      for each nucleus i in [0..N):                                   │
│         d_i  = |p_warp − (pos_i + drift_i(t))|                      │
│         w_i  = exp(−β · d_i²)                          // softmax     │
│      palette_id = Σ w_i · palette_bias_i / Σ w_i                     │
│      value_mod  = Σ w_i · value_bias_i   / Σ w_i                     │
│      col = samplePalette_OKLCh_LUT(palette_id)                       │
│      col *= 1 + valueVariance · value_mod                            │
│                                                                      │
│   2. Medium layer — flow-aligned texture (if medium != smooth)       │
│      flow = flowField(p, t)                                          │
│      stroke = anisotropicBrush(p, flow, medium)                      │
│      col = mediumComposite(col, stroke, palette_id, medium)          │
│         // per-medium: cauliflower, impasto, broken-color, etc.      │
│                                                                      │
│   3. Post — grain, tonemap, output                                   │
│      col += paperGrain(p) × grain_amp                                │
│      col = ACES(col)                                                 │
│      fragColor = vec4(col × alpha, alpha)                            │
└──────────────────────────────────────────────────────────────────────┘
```

### Why this is correct
- **Multi-nuclei with per-nucleus palette bias** directly produces images that have no locus, span the full palette (each nucleus pulls toward a different LUT stop), and read as painterly compositions rather than mathematical fields.
- **Domain-warped fBm at the p-input level** (not the palette-id level) produces organic boundaries without polluting palette logic.
- **Softmax with temperature β** gives a continuous knob from smooth blobs (β~3) to crisp territories (β~10).
- **Medium orthogonal to composition** means any palette/nuclei layout can be rendered in any medium.
- **Flow field scoped to medium** prevents the v3 mistake of using flow for palette placement.

## 5. Public API

```ts
// ── Palette ──
export interface OklchStop { L: number; C: number; h: number; }  // 0..1, 0..0.4, 0..360

// ── Composition ──
export interface AuroraNucleus {
    x: number;              // 0..1
    y: number;
    radius: number;         // 0.15..0.8 (fraction of viewport diag)
    paletteBias: number;    // 0..1, preferred palette stop for this nucleus
    valueBias: number;      // -0.3..0.3, lightness pull
    driftRadius: number;    // 0..0.05, how far this nucleus wanders
    driftPhase: number;     // 0..2π seed
}

// ── Medium (orthogonal to composition) ──
export type AuroraMedium = "smooth" | "pastel" | "watercolor" | "oil";

export interface AuroraFlow {
    pattern: "none" | "radial" | "swirl" | "diagonal" | "multi";
    focalX: number;
    focalY: number;
    angle: number;          // degrees, for diagonal
    curl: number;           // 0..1
}

// ── Root config ──
export interface AuroraConfig {
    // Composition
    palette: OklchStop[];           // 3..8 stops
    nuclei: AuroraNucleus[];        // 2..6 attractors
    softmaxBeta: number;            // 3..10, blend temperature
    valueVariance: number;          // 0..0.3

    // Warp (organic boundaries)
    warpAmount: number;             // 0..0.6, double-warp amplitude
    warpScale: number;              // 0.5..3, warp noise frequency
    warpDrift: number;              // 0..0.015, warp animation speed
    noiseOctaves: 3 | 4 | 5;

    // Medium
    medium: AuroraMedium;
    flow: AuroraFlow;
    strokeAmount: number;           // 0..1
    strokeScale: number;            // 50..400
    strokeAnisotropy: number;       // 0..1 (aspect of brush)

    // Medium-specific (but always present; shader ignores irrelevant ones)
    wetEdge: number;                // 0..1, watercolor cauliflowers
    granulation: number;            // 0..0.3, paper-fiber noise
    impasto: number;                // 0..0.5, oil specular fakery
    brokenColor: number;            // 0..0.1, oil hue jitter ±deg
    canvasGrain: number;            // 0..0.1, oil canvas weave

    // Motion
    nucleiDrift: number;            // 0..0.03, nucleus orbit speed
    paletteDrift: number;           // 0..0.02
    breathDepth: number;            // 0..0.15, global luminance breathing
    breathPeriod: number;           // 20..90 seconds

    // Output
    saturation: number;             // 0.7..1.2
    paperGrain: number;             // 0..0.015, final film grain
    alphaLight: number;
    alphaDark: number;
    darkDesaturate: number;
}
```

## 6. Presets (authored, not computed)

Each preset is a configuration of the parameter space above. None of them reaches for workarounds — all use the same shader.

| Preset | Medium | Nuclei | β | warpAmount | strokeAmount | Impasto | Reference image |
|---|---|---|---|---|---|---|---|
| `OPENAI_SKY` | smooth | 4 (blue dark/light/cyan/white) | 3 | 0.5 | 0 | 0 | GPT-4.5 hero |
| `OPENAI_DAWN` | smooth | 4 (pink/orange/lavender/cream) | 3.5 | 0.55 | 0 | 0 | DALL-E model icons |
| `OPENAI_MEADOW` | watercolor | 2 (yellow/blue) | 4 | 0.45 | 0.15 | 0 | GA Stories |
| `DELIBERATIVE` | pastel | 3 (red-focal/pink/yellow) | 5 | 0.35 | 0.5 | 0 | Deliberative alignment |
| `DAY9_YELLOW` | watercolor | 2 (yellow dominant + teal intrusion) | 6 | 0.3 | 0.3 | 0 | Day9 card |
| `OIL_PASTEL_157` | oil | 5 (orange/purple/blue/teal/cream) | 7 | 0.4 | 0.6 | 0.35 | 157_edited |

## 7. Mathematical specifications

### 7.1 Nuclei attractor field (softmax-blended)

```glsl
vec3  accumCol   = vec3(0.0);
float accumBias  = 0.0;
float accumValue = 0.0;
float accumW     = 0.0;

for (int i = 0; i < MAX_NUCLEI; i++) {
    if (i >= uNucleiCount) break;
    // Nucleus position with slow orbital drift
    vec2 pos_i = uNucleiPos[i]
               + uNucleiDriftRadius[i] * vec2(
                   cos(t * uNucleiDrift + uNucleiDriftPhase[i]),
                   sin(t * uNucleiDrift + uNucleiDriftPhase[i] * 1.13)
               );
    float d = length(p_warp - pos_i);
    float w = exp(-uSoftmaxBeta * d * d / max(uNucleiRadius[i], 0.01));
    accumBias  += w * uNucleiPaletteBias[i];
    accumValue += w * uNucleiValueBias[i];
    accumW     += w;
}

float paletteId = accumBias  / max(accumW, 0.0001);
float valueMod  = accumValue / max(accumW, 0.0001);
```

Key: `exp(-β·d²/r²)` — Gaussian falloff with per-nucleus radius. Softmax is over this weight. Temperature β controls how "soft" the blend is.

### 7.2 Domain warp (Quilez canonical)

```glsl
vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + t * uWarpDrift),
              fbm(p + vec2(5.2, 1.3) + t * uWarpDrift));
vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)),
              fbm(p + 4.0 * q + vec2(8.3, 2.8)));
vec2 p_warp = p + uWarpAmount * uWarpScale * r;
```

Feed the output of fBm as the input to another fBm call. Two nested levels is enough; three becomes muddy.

### 7.3 Medium pipelines (on top of composition `col`)

**Smooth**: no overlay; just ACES + grain + vignette.

**Watercolor**:
```glsl
// Cauliflower rim from color gradient magnitude
vec2  dcx = sampleColor(p + eps_x) - sampleColor(p - eps_x);
vec2  dcy = sampleColor(p + eps_y) - sampleColor(p - eps_y);
float edgeMask = length(vec3(dot(dcx, W_luma), dot(dcy, W_luma), 0.0));
col *= mix(1.0, 0.76, smoothstep(0.0, 0.25, edgeMask) * uWetEdge);
// Granulation (paper fiber)
float paper = 0.5 * noise(p * 8.0) + 0.5 * noise(p * 24.0);
float pigLoad = 1.0 - dot(col, W_luma);
col *= 1.0 - uGranulation * pigLoad * (paper - 0.5);
```

**Pastel**:
```glsl
vec2 flow = flowField(p, t);
vec2 perp = vec2(-flow.y, flow.x);
float along  = dot(p, flow)  * uStrokeScale;
float across = dot(p, perp)  * uStrokeScale;
// Dust drift across stroke direction
across += 0.02 * (noise(p * 260.0) - 0.5);
// Anisotropic stroke, aspect 3:1
float stroke = fbm(vec2(along * 0.33, across * 1.0));
col *= mix(1.0, 0.85 + 0.30 * stroke, uStrokeAmount);
```

**Oil**:
```glsl
// Anisotropic stroke, aspect 7:1
float stroke = fbm(vec2(along * 0.14, across * 1.0));
col = mix(col, col * (0.78 + 0.44 * stroke), uStrokeAmount * 0.6);
// Broken color — hash stroke id
vec2  sid = floor(vec2(along * 0.14, across * 1.0));
float h   = fract(sin(dot(sid, vec2(12.9898, 78.233))) * 43758.5453);
col = hueShift(col, (h - 0.5) * uBrokenColor);
col *= 0.92 + 0.16 * h;
// Impasto: synthesize normal from luminance gradient
float L     = dot(col, W_luma);
vec3  N     = normalize(vec3(-dFdx(L) * uImpastoK, -dFdy(L) * uImpastoK, 1.0));
vec3  Ldir  = normalize(vec3(0.4, 0.6, 0.8));
float spec  = pow(max(dot(N, Ldir), 0.0), 24.0);
col += uImpasto * spec * vec3(0.95, 0.92, 0.85);
// Canvas weave
float weave = (sin(p.x * 900.0) * 0.5 + 0.5) * (sin(p.y * 900.0) * 0.5 + 0.5);
col *= 1.0 - uCanvasGrain * (weave - 0.5);
```

### 7.4 Tone map and output

```glsl
col = aces(col);                         // Reinhard-modified or ACES approx
float grain = hash(gl_FragCoord.xy + t * 17.0);
col += (grain - 0.5) * uPaperGrain;
col = clamp(col * 0.98 + 0.01, 0.0, 1.0);
fragColor = vec4(col * alpha, alpha);
```

## 8. Nucleus placement — authored by preset, not computed

Nuclei positions and palette biases are **authored** per preset, not generated by an algorithm. This is deliberate: the composition is the designer's choice. Generic "random-nuclei" would give generic output. Each preset expresses a considered composition (e.g., Dawn: 4 nuclei forming a diagonal from deep red lower-left to cream upper-right).

## 9. Motion budget

| Element | Typical value | Rationale |
|---|---|---|
| Primary warp drift (`warpDrift`) | 0.008 | ~12 s cycle; the eye's "breath" |
| Nuclei orbital drift (`nucleiDrift`) | 0.004 | ~25 s cycle; slow parallax |
| Palette drift (`paletteDrift`) | 0.01 | ~10 s; visible but subtle |
| Stroke regeneration | 0 (static) | Medium texture should read as material, not process |
| Breath depth | 0.05 | Global luminance wobble |
| Breath period | 40 s | Breath-pace |

Reduced-motion: freeze `t` at a pleasing offset, re-render only on resize.

## 10. Implementation contract

- Vue 3 component: `<Aurora :config="cfg" />` mounts a `<canvas>` and uses `useAurora(canvasRef, cfg)`.
- `useAurora` compiles shader on mount, sets up uniforms, runs RAF, re-uploads on config change.
- Shader compile errors throw to console with the full log; failure produces an empty canvas (no fallback).
- SSR-safe: all WebGL calls within `onMounted`.
- Palette is baked CPU-side from OKLCh to linear-sRGB via existing `color.ts`. Shader consumes a flat `vec3[MAX_STOPS]` uniform.
- Nuclei are packed as parallel `Float32Array`s keyed by field — identical pattern to existing composable, just replacing streak arrays with nucleus arrays.

## 11. What this replaces

- `AuroraConfig` in `presets.ts` — entirely new shape (nuclei array replaces `streaks` / `blobs` / `flow+colorField+texture+motion` flat fields)
- `aurora.frag.ts` — rewritten shader pipeline
- `useAurora.ts` — new uniform layout
- Demo `backgroundConfigs.ts` — rewritten schema (nuclei as repeatable array, medium as select, per-medium fields gated by `visibleWhen`)
- `App.vue` — preset list updated

No migration path. Clean break.

## 12. References

**Architecture foundations**:
- Iñigo Quilez — [Domain warping](https://iquilezles.org/articles/warp/), [fBm](https://iquilezles.org/articles/fbm/), [Smooth Voronoi](https://iquilezles.org/articles/smoothvoronoi/), [smin](https://iquilezles.org/articles/smin/)
- Alex Harri — [WebGL gradients deconstructed](https://alexharri.com/blog/webgl-gradients)
- Kevin Hufnagl — [Stripe gradient teardown](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/)

**Painterly shaders**:
- Maxime Heckel — [On crafting painterly shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/)
- flockaroo — [Shadertoy ltyGRV (watercolor)](https://www.shadertoy.com/view/ltyGRV)
- Kyprianidis — [Anisotropic Kuwahara](https://www.shadertoy.com/view/td3BzX)

**Papers**:
- Bousseau et al. 2006 — [Interactive watercolor rendering](https://artis.inrialpes.fr/Publications/2006/BKTS06/watercolor.pdf)
- Meier 1996 — [Painterly rendering for animation](https://www.eecs.umich.edu/courses/eecs498-2/papers/meier96.pdf)
- Hertzmann 1998 — [Painterly rendering with curved brush strokes](https://mrl.cs.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf)
- Kyprianidis et al. 2013 — [State of the 'Art' NPR survey](https://www.kyprianidis.com/p/tvcg2013/)

**Aesthetic lineage**:
- [Color Field painting](https://www.theartstory.org/movement/color-field-painting/) (Rothko, Frankenthaler soak-stain)
- [Japanese bokashi printing](https://en.wikipedia.org/wiki/Bokashi_(printing))
- [Studio Dumbar — OpenAI rebrand](https://studiodumbar.com/work/openai)

**Production reference implementations to study**:
- [paper-design/shaders](https://github.com/paper-design/shaders) — separate `meshGradient` + `warp` primitives
- [Stripe minigl gist](https://gist.github.com/dkaraush/6cbf93eac983c777314445437d495672)
- [ShaderGradient](https://github.com/ruucm/shadergradient)
