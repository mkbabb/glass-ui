# Aurora — procedural painterly gradient system

**Status**: design document v5.0 (the post-AW cut). Supersedes v1–v4.1.

This is the design document **of record** — the *why* behind the shader
architecture, distinct from the consumer-contract `README.md` (which W33 owns).
v5.0 brings the doc current with the AW aurora band: the W5 shared-color splice
and the W4 painterly mediums on the WebGL2 single-pass path (landed). The WebGPU
multi-pass branch was investigated and excised as substrate-without-consumer
(AX.W14 — see §10 "Spec deltas (v4.1 → v5.0)"). The earlier v4 → v4.1 deltas stay
archived at §6.

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
4. **Optional medium overlay.** Watercolor wet-edge / granulation, pastel anisotropic fBm stroke, oil (four sub-modes), or the energy-graded **van-Gogh atomic-stroke** medium applied on top. Medium is orthogonal to composition. The stroke ORIENTATION axis (`strokeOrient`) routes each stroke off the global `flow` vector OR off the per-pixel **structure-tensor / edge-tangent-flow** field (Kyprianidis & Kang 2009; the minor eigenvector of `J=[[Gx·Gx,Gx·Gy],[Gx·Gy,Gy·Gy]]`), so strokes follow the painted edges rather than a single global angle. The impasto axis is a **real height-field relight** — height → normal → a `uLightDir`-driven catch-light — not a fixed-RGB rim constant (the W4 painterly arc, landed on the WebGL2 single-pass path).
5. **Flow couples to medium only for palette placement** — flow never drives which palette stop a pixel picks. But see (6).
6. **Cursor deflects flow AND composition.** Gaussian-radius rotation around the pointer enters both `domainWarp` (color zones swirl) and `flowField` (stroke direction bends). This was a deliberate change from the v4 spec's "flow only" draft — references demand visible color-band curl, not just stroke bend. Palette position stays put; only the spatial coordinate is rotated.
7. **Breath-paced motion.** Primary `warpDrift` at 0.005–0.010; full breath cycle 40–60 s. Stroke texture stays static (material, not process).
8. **WebGL2 single-pass-universal.** The universal contract is ONE full-screen triangle, ONE fragment program, ZERO deps — uniforms select medium and flow behavior. Every engine renders the full visual contract on a single WebGL2 fragment pass with no FBO ping-pong and no external library. The multi-pass painterly half (the Gaussian-smoothed multi-tap structure tensor + the anisotropic Kuwahara finish a single fragment shader cannot express) was investigated on a WebGPU branch and excised as substrate-without-consumer (AX.W14 — see §10 Δ09a); aurora renders single-pass WebGL2, unconditionally.

## 3. Non-invariants (explicit non-goals)

- No single focal point driving palette (creates visible locus — error in v1–v3).
- No pure fBm color-id (bell-shaped, center-biased — palette extremes never sampled).
- No spatial-distance axis for palette (creates contour-line artifacts).
- No global saturation/contrast compensation tricks (workarounds masking bad architecture).
- No medium-specific shader branches at the top level. One shader. Medium parameters route inside.
- **No multi-pass pipelines** (invariant 8). Aurora is single-pass-universal; the multi-pass painterly half (the smoothed multi-tap structure tensor + the anisotropic Kuwahara finish) was investigated and excised as substrate-without-consumer (AX.W14).
- No external libraries — the WebGL2 path pulls no Three.js/TSL (the zero-dep posture).

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

export type AuroraMedium = "smooth" | "pastel" | "watercolor" | "oil" | "crayon" | "vangogh" | "oil-pastel";
export type StrokeMode   = "oil" | "knife" | "chunky";
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

### The atoms door — the ONE consumer surface (AX.W10)

`resolveAtoms(atoms) → AuroraConfig` (`composables/atoms.ts`) is THE consumer-facing door. The ≤7 atoms are the user's named control elements — **COLOR** (seed + harmony + colorEnergy), **ZONES** (count + arrangement), **NOISE** (one organic-boundary knob), **MEDIUM** (+ texture, textured mediums only), **MOTION**. `AuroraConfig` is the INTERNAL author schema — the full ~28-field surface a preset author drops to, NOT the default surface (the live config dock opens on the atoms tab; the raw layers are the Advanced escape hatch). AX.W10 converged this to ONE door — the dead parallel seed+mood door (its own mood union + recipe table + duplicated thirds prior) is DELETED; one `nucleiPrior` and one COLOR-energy curve are the single source.

`resolveAtoms` is PURE + TOTAL (every atom combination — including out-of-range inputs — yields a valid in-range config respecting every `budget.ts` cap) and DEFAULT-PRESERVING (`resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG`, machine-asserted by `proof:aurora-atoms-roundtrip`). Inapplicable knobs are **structurally absent** (the smooth-medium union arm has no `amount` field — no silent-inert texture slider); only the WIRED interactivity axes (`light`/`scroll`) ship. Mechanism: clone the default and apply ONLY the PRESENT atoms as clamped overrides, so the empty atom set passes through to the default. Each atom moves a CO-VARYING cluster as a continuous curve (one knob moves the entangled axes, the Burley "Principled" discipline).

| Atom | Fans to |
|---|---|
| `seed` (+ `harmony`) | the derived palette via `deriveAurora` (clamped to the perf color budget) |
| `colorEnergy` (0..1) | `saturation` + `valueVariance` + `breathDepth` + the palette's warm/cool `temperatureShift` (the co-varying chroma/value cluster, a continuous curve — the old mood coupling folded in) |
| `zones` (`{count, arrangement}`) | the nuclei via the ONE `nucleiPrior` — `arrangement` (scattered/composed/centred) selects the placement prior, `count` clamped to `MAX_NUCLEI` |
| `noise` (0..1) | the organic-boundary cluster — `warpAmount` + `warpScale` + `warpMode` (fBm→hybrid→cellular) + `noiseOctaves` |
| `medium` (`{kind, amount?}`) | the `AuroraMedium` value (+ tensor orientation for the painterly mediums); `amount` only on a textured medium (structurally absent on smooth) |
| `motion` (still·breathing·drifting) | the four motion fields (`nucleiDrift`/`paletteDrift`/`warpDrift`/`breathDepth`) |
| `interactivity` | only the WIRED axes — `light` (cursor-as-light) + `scroll` (scroll-coupled). The unwired `flow`/`wake` axes are excised from the atom shape until wired |

## 6. Spec deltas (v4 → v4.1) [archived]

> Historical — the v4.1 cut. The current post-AW deltas are §10 (v4.1 → v5.0).

- **Δ01 `warpMode: "fbm" | "cellular" | "hybrid"`** — Meadow's chunky almost-rectangular territories need cellular; pure fBm can't produce them. Hybrid averages both for soft-edged blocks.
- **Δ02 `strokeLayers: 1 | 2`** — oil-pastel crosshatching needs a second stroke layer rotated 90° from `flow.angle`. Added via average-blend so ridges weave rather than explode.
- **Δ03 Cursor API** — `setCursor(x, y, strength)` / `clearCursor()` / `setCursorRadius(r)`. Palette zones DO rotate near cursor despite the draft invariant saying otherwise; this is a deliberate reversal driven by reference-image fidelity.
- **Δ04 `strokeMode` under `medium: "oil"`** — `oil` default (balanced bristle), `knife` (razor edges, flat, heavy impasto), `crayon` (anisotropic tooth noise multiplied into base, NOT stroke-based), `chunky` (thick gestural bristle).
- **Δ05 live/capture runtime modes** — live canvases avoid capture-only drawing-buffer preservation; capture and thumbnail bakes opt into it explicitly and use `renderAt()` as a draw-only call.
- **Δ06 `opacity-ceiling` prop (A3 §6.R-9 / G-AK-D11)** — per-route outer compositing clamp. The drift overwhelms form/text density at full saturation on quiet content-over-aurora routes (survey, thankyou, admin-login); consumers opt these routes in to `0.5` while hero surfaces stay at the `1.0` default. Bound as `--aurora-opacity-ceiling` on the root and consumed by both the placeholder and the armed-canvas opacity, so the cross-fade and the pre-armed paint ride under the same envelope. Distinct from `config.alpha`, which gates per-pixel pigment opacity inside the shader.

## 7. Load-bearing implementation notes

- **The OKLCh color math is SHARED, not aurora-local (AW.W5).** The CPU-side palette bake — `oklchToLinear()` + `flattenPalette()` — still composes in `composables/color.ts`, but `color.ts` now RE-EXPORTS the shared `/color` leaf core (`src/composables/color`), and the GPU-side OKLCh lives in the SHARED `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` chunk that aurora's `aurora.frag.ts` AND the blob's `metaball.frag.ts` both splice (`${OKLCH_MATRICES_GLSL}`, `${OETF_GLSL}`, `${FBM_ROT_GLSL}`). So the Ottosson OKLab/OKLCh matrices + the sRGB OETF have exactly ONE source and can NEVER drift between aurora and the blob (`proof:single-color-core` + `proof:shader-shared-source` freeze it). The W5 arm also lands the **in-shader OKLCh interpolation** (`mixPaletteOklchArc` + `brokenColorJitter` operate in OKLab/OKLCh inside the fragment program — the palette interp + the per-stroke jitter no longer run in linear-sRGB/YIQ) and the `deriveAurora` palette front door (the whole-scene derive lives in the `resolveAtoms` atoms door — AX.W10).
- **Palette is baked to LINEAR sRGB** for the LUT, not gamma-sRGB. The shader ACES-tonemaps in linear, then closes the mandatory sRGB OETF (`linearToSrgb`, spliced from the shared chunk) at `main()` — the AV.W1 too-dark defect is fixed at the single OETF source.
- **`preserveDrawingBuffer` is capture-only by default.** WebGL context attributes are fixed at context creation, so live runtimes default false while thumbnail/capture runtimes opt true. Without preservation, `readPixels` / `toDataURL` after the composited frame is not a stable capture contract.
- **Nuclei y-coordinate is CSS-top-origin** (0 = top, 1 = bottom). Runtime flips Y at the uniform boundary — see `AUTHOR_Y_ORIGIN_IS_TOP` marks in `runtime.ts`. Config authoring stays top-origin.
- **Thumbnail baking uses a shared offscreen context.** 11 presets + 1 live stage exceeds Chromium's ~8 contexts/page cap. One capture-mode aurora, `update(frozen) + renderAt(1.0) + toDataURL` per preset, `dispose()` releasing via `WEBGL_lose_context`. Pattern at `demo/stories/aurora/usePresetThumbnails.ts`.
- **`renderAt()` is draw-only.** It uploads `uTime`, current cursor uniforms, clears, and draws once. It does not mutate `startTime`, advance cursor easing/decay, schedule/cancel RAF, or change running state.
- **Shader space is normalized.** The fragment program samples composition and media in `vUv` / 0..1 space. CSS sizing and the canvas backing store own aspect and DPR; the shader has no live `uRes`/`uDpr` surface.
- **Crayon is a first-class DRY medium, not strokes (AX.W13).** `mediumCrayon()` (`uMedium==4`) is the DRY tooth-multiply: it rotates `p` along the tensor flow then multiplies anisotropic tooth noise into the base color, with a hard SCUMBLE that lets the lower color show through the broken upper layer and OKLCh broken-color pigment patches. NO sheen, NO burnish — that waxy gloss is the oil-pastel deposition's signature (`mediumOilPastel`), distinct from dry crayon. Crayon is its own `medium:"crayon"` (the legacy `oil` + `strokeMode:"crayon"` peer-route is REMOVED — clean break, no alias); it shares the SUBSTRATE (the structure-tensor orientation + the tooth noise + `brokenColorJitter`), not the dispatch body.
- **`strokeAmount` gates oil stroke opacity.** Oil, knife, and chunky modes use `strokeAmount` as the main stroke-compositing opacity and as the impasto strength multiplier. At zero, curved strokes do not repaint the base field; crayon remains a tooth/noise multiplier by design.
- **Broken oil color is deterministic pigment jitter.** `uBrokenColor` affects oil-family output only: stroke modes hash each stroke cell to hue-shift and value-jitter the midpoint pigment, while crayon hashes stable pigment patches. The maximum shader shift is intentionally bounded (about ±16° hue and ±14% value at `brokenColor = 1`) so presets read as broken paint rather than random color noise.
- **Oil crosshatch flow is layer-routed.** `bestOil()` consumes the flow vector passed by the caller as its base stroke direction and adds only deterministic per-cell perturbation. The optional second layer passes a perpendicular flow so `strokeLayers: 2` materially changes the hatch direction without adding shader variants.
- **Cursor state** — JS-side easing and decay required; shader alone can't provide breath-paced cursor response without framerate-dependent artifacts.

### The painterly engine (AW.W4)

- **Structure-tensor / edge-tangent-flow orientation (the keystone).** `structureTensorField()` (`mediums.glsl.ts`) Sobel-samples `luma(sampleBase)` over a small fixed-tap 3×3 neighborhood, forms the 2×2 structure tensor `J = [[Gx², GxGy],[GxGy, Gy²]]`, and eigen-decomposes it closed-form via the principal angle `θ = ½·atan2(2·Jxy, Jxx−Jyy)`. The **minor** eigenvector (`(−sin θ, cos θ)`) is the edge **TANGENT** — the stroke direction that hugs the color zones; the **major** eigenvector points along the gradient (the edge normal) and would make strokes cross the bands. The coherence `A = (λ₁−λ₂)/(λ₁+λ₂)` drives a `mix(fallbackDir, tangent, A)` blend so low-structure (flat) zones relax toward the smooth flow rather than reading tensor noise as jitter. Selected via `strokeOrient: "flow" | "tensor"` (default `flow` — the hand-authored `flowField`); the painterly mediums force `tensor`. The single biggest "congruent to real Van Gogh" lever: orientation derives from the image's own structure, not a pattern. The atan2 form is robust at `Jxy≈0` (where the `(λ−Jyy, Jxy)` eigenvector formula collapses to a zero vector). The principal-angle math is line-for-line in `tests/components/custom/aurora/painterly.test.ts`.
- **Real impasto — height → normal → relight (the fixed rim RETIRED).** The faked fixed-RGB edge rim (`vec3(0.18,0.15,0.11)`, the phantom upper-left light) is GONE. `paintOver()` now deposits per-stroke PAINT HEIGHT into an `inout float height` (coverage × thickness, perturbed by the bristle/streak fbm for ridges/grooves); `relightImpasto()` derives a normal from `dFdx/dFdy(height)` and applies diffuse + Blinn specular from the **movable** `uLightDir`/`uLightColor` source — in LINEAR before `aces()` (the tonemap/OETF seam `proof:aurora-space-gamma` locks stays after). Thin strokes inherit a low shininess; thick impasto raises it (high-height ridges catch a sharp glint). `uLightDir` is the interactive axis AW.W8 drives from the cursor (cursor-as-light); default upper-left so the still default reads identically to the prior rim.
- **The van-Gogh atomic-stroke medium is a FIRST-CLASS body (`vangogh`, uMedium==5; AX.W13).** NOT a `mediumOil` passthrough — `mediumVangogh` AUTHORS its own `vangogh` `StrokeProfile`: a **comma/crescent** `strokeShape` (asymmetric taper — a loaded round head drawn to a fine tail, the divisionist atomic dab), **sparse high-contrast** placement (lower density gates → visible inter-stroke canvas gaps, so each mark reads separable, not a coverage smear), the **energy-grade as a PROFILE field** (`prof.energyGrade=1.0` — the Starry-Night length cascade `bestOil` runs off the field, NOT a buried `uMedium==5` branch), and **full-height impasto crowns** (`prof.impastoFloor=1.0` so every atomic dab catches its own glint). The bridge forces the ETF (tensor) orientation so the dabs queue into swirl-rows along the color field's tangent. The within-stroke OKLCh broken color (`paintOver`) + the OKLab stroke OVER-composite give pigment-true atom-level shimmer. No subject matter — the nuclei field is the "source image", so dabs trace its iso-bands.
- **Oil-pastel is a DISTINCT deposition body, split from dry crayon (`oil-pastel`, uMedium==6; AX.W13).** `mediumOilPastel` DEPOSITS broad smeared directional strokes via the shared brush engine off its OWN `oil-pastel` `StrokeProfile`: a creamy soft `hardness` (strokes blend on overlap), heavy pigment build-up, and a chroma punch — the stroke-deposition model that gives oil-pastel its depth and less-uniform read. It shares the SUBSTRATE (the stroke cascade + tooth + relight) with oil/van-Gogh, NOT the dispatch body of dry crayon. `mediumCrayon` (uMedium==4) stays the DRY tooth-multiply. The two media share the SUBSTRATE, not the body (no duplicate, no shared dispatch).
- **OKLab stroke OVER-composite + within-stroke OKLCh broken color (AX.W13).** `paintOver` composites overlapping strokes in OKLab on the painterly stroke mediums (oil/van-Gogh/oil-pastel) — lerp L,a,b of the over-color toward the under-color via the Ottosson matrices spliced from `procedural-color.glsl.ts` — so two complementary-hued strokes overlapping transition through a chromatic path, NOT the linear-RGB grey mud (the muddy-midtone defect OKLCh killed at the palette layer, re-entering at the compositing layer). The smooth/atmospheric pole never reaches `paintOver`, so it keeps the cheap linear mix. The within-stroke streak modulation perturbs HUE + CHROMA in OKLCh (not the old value-only `c *= 1+streak`), seeded per-stroke off a decorrelated streak fBm, so a single stroke carries a small hue gradient — broken color at the ATOM level, the impasto shimmer.
- **The single-pass ETF half ships; the multi-pass finish was excised (the AW.W4 → AX.W14 outcome).** W4 ships the ETF orientation field as a single-pass small-tap approximation (the load-bearing fidelity lever). The Gaussian-smoothed multi-tap structure tensor, the LIC (line-integral-convolution) smear that convolves the field ALONG the ETF orientation, and the anisotropic Kuwahara finish are multi-pass operators the single-pass WebGL2 fragment shader fundamentally cannot express (invariant 8 bans multi-pass). They were investigated for a WebGPU branch and EXCISED as substrate-without-consumer (AX.W14, terminal — Δ09a): no named consumer route binds the multi-pass finish, so no second backend ships. ETF-without-LIC here is honest: the orientation field is the direction source; the LIC smear is the finish that did not land.

### The substrate — single-pass WebGL2

- **The renderer.** Aurora renders on a single-pass WebGL2 fragment shader (invariant 8 — one draw, one shader). The synchronous `resolveRenderMode` decides the device tier (`auto` → `webgl`/`css`: a low-power / reduced-motion / save-data device gets the static CSS-gradient placeholder; otherwise the animated WebGL2 field). There is no second backend.
- **The backend-agnostic lifecycle carve.** The demand-driven schedule (the 3-reason suspend Set), the offscreen-park (the content-visibility hook + the tab-hidden owner), and the live PRM freeze are CARVED into `createCanvasLifecycle.ts` (the shared core); `useWebGLCanvas` is the WebGL2 backend over it. A parked rAF (offscreen / tab-hidden / PRM-reduce / paused) attaches ZERO frames (`proof:offscreen-pause`).

### Interactivity (AW.W8) — opt-in, PRM-binding

Interactivity is OPT-IN via the `AuroraConfig.interactivity` flag (`light` · `flow` · `scroll`; default OFF — the wispy-sky default stays static). The axes:

- **Cursor-as-light (`light`, WebGL2).** The cursor drives the AW.W4.2 impasto `uLightDir` (the movable catch-light) — a slow idle auto-orbit when the pointer is at rest, pulled toward the pointer when active. No new lighting path; it reuses the impasto seam.
- **Velocity-reactive flow (`flow`, WebGL2).** `cursorModel` gains a smoothed pointer velocity + a transient swirl-BURST. A fast flick injects a `uCursorBurst` (decaying over ~1s) that biases the flow along the pointer velocity — distinct from the steady `uCursorStrength` attraction. The stateless cursor swirl is SUPERSEDED by this velocity-reactive form.
- **Scroll coupling (`scroll`, WebGL2).** Palette/breath progress binds to scroll via the EXISTING `useScrollProgress` public composable — no new substrate.
The `wake` stateful-pointer-wake axis (a ping-pong velocity texture, stable-fluids self-advection) was a WebGPU-only arm; with the WebGPU branch excised (AX.W14, §10 Δ09a) it does not ship — the `interactivity.wake` flag is unwired and unrendered. The shipped interactive axes are the three WebGL2 forms above.

**The master tempo scalar is the single suppression seam.** Every axis routes through `masterTempo()` (frameLoop) which returns 0 under the substrate's live PRM ref (`prefers-reduced-motion: reduce`) and 1 otherwise — so PRM zeroes the whole interactive stack. **Tempo scales the integrated `dt` of every axis, NEVER `uTime`** (scaling the clock makes the flow jump when tempo changes; the absolute clock keeps marching, only the integration step scales). The DockBackgroundToggle pause (WCAG 2.2.2) suspends the loop entirely (the substrate's `manual` suspend), so it converges here too. **The cursor pointermove WRITE-PATH** (`injectCursorVelocity`) fires INDEPENDENT of the parked rAF loop, so a time-orbited `uLightDir` (frozen by `uTime` under reduce) is not enough — the cursor-driven write EARLY-OUTS on `handle.reducedMotion` (a parked loop with a live cursor write must not move the field). NO parallel `matchMedia` — every axis hooks the substrate's EXISTING live PRM ref (the AV.W7 lift owns the listener). Binding WCAG 2.3.3 (Animation from Interactions) + 2.2.2 (Pause, Stop, Hide); `proof:aurora-interaction-prm` is born-RED to catch any escape.

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
├── index.ts                      # barrel (Aurora, useAurora, deriveAurora, resolveAtoms, types)
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
    ├── color.ts                  # CPU OKLCh bake — RE-EXPORTS the shared /color leaf (AW.W5) + deriveAurora (the dead seed+mood scene door retired AX.W10)
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

The post-AW cut. Every delta is **LANDED** in the aurora source and gated — the W4
painterly + W5 color arms shipped on the single-pass WebGL2 path. The W7 WebGPU
investigation resolved to the EXCISE (Δ09a, AX.W14, terminal): no second backend
ships. Each delta names the proof gate that machine-locks it.

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
  `deriveAurora` palette front door (the whole-scene derive is the `resolveAtoms`
  atoms door — AX.W10 retired the parallel seed+mood door). (§7 + §9 reflect this.)

- **Δ08 — Painterly mediums + structure-tensor orientation (AW.W4, LANDED).**
  The energy-graded **van-Gogh atomic-stroke** medium (tensor strokes + impasto
  + OKLCh per-stroke jitter), the per-pixel **structure-tensor / ETF**
  orientation field driving `strokeOrient: "flow" | "tensor"` (strokes follow
  painted edges, not a single global angle), the **real height-field impasto
  relight** (`uLightDir`-driven catch-light replacing the fixed-RGB rim
  constant), and the reworked oil-pastel deposition/scumble bake. All on the
  WebGL2 single-pass path inside `profile:budget`; the Gaussian-smoothed
  multi-tap tensor is the Δ09 WebGPU scope. (§2.4 reflects the axis names.)

- **Δ09 — WebGPU investigation (AW.W7, the HISTORICAL intent Δ09a resolved).** AW.W7
  investigated relaxing the single-pass constraint on a WebGPU branch — a second
  canvas substrate behind `navigator.gpu`, a color/noise twin of the GLSL chunk, and
  the genuinely multi-pass painterly passes a single fragment shader cannot express
  (the Gaussian-smoothed multi-tap structure tensor + the **anisotropic Kuwahara**
  finish). The smooth single-pass twin that landed was reduced-parity-by-design and
  consumer-less; the multi-pass painterly half was never wired. This intent is
  RESOLVED by Δ09a (the EXCISE) below — it did not graduate to a shipping backend.

- **Δ09a — WebGPU EXCISE (AX.W14 → AY, terminal).** The Δ09 multi-pass painterly half
  shipped as DEAD substrate — the WGSL strings + format constants were authored and
  exported but NEVER wired to a consumer FBO ladder (zero importers). Per the
  no-overfitting bar (substrate-without-consumer is binary), AX.W14 deleted the
  multi-pass half, and AY deleted the REMAINING smooth single-pass twin root-and-branch:
  the WGSL shader, the GPU canvas + runtime, the uniform-pack half, the async probe arm,
  the render-mode lever, and the five WebGPU gates are all gone. No named consumer route
  binds the Kuwahara painterly finish at HEAD, so no second backend survives. Aurora
  renders single-pass WebGL2, unconditionally; a future WebGPU path opens fresh with a
  named consumer (a clean greenfield re-introduction, no scaffold to resurrect).

- **Δ10 — Color-seam single-sourcing (AX.W11, LANDED).** Two OKLCh seam leaks the
  W5 migration left closed: (1) the **catch-light** (`lightColor`) is OKLCh-derived
  off the shared `warmCatchLight(L,C,h)` `/color` helper at the `(0.985, 0.0125,
  77.5°)` anchor — perceptually the prior eyeballed `[1.0,0.95,0.88]` warm-white, now
  on the OKLCh core (the blob's `warmCream` re-routes onto the SAME helper at its own
  `(0.97, 0.03, 85°)` anchor in W15). (2) The **palette ramp** (the smoothstep ease +
  the OKLab-rect-vs-OKLCh-hue-arc huePath dispatch) is HOISTED to the shared
  `procedural-color.glsl` chunk as `PALETTE_RAMP_GLSL` that aurora's `samplePalette`
  splices — so the ramp lives in one source. Gated by `proof:aurora-oklch-interp`
  (the in-shader OKLCh ramp across the huePath modes).
