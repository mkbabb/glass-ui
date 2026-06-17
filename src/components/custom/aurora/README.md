# Aurora — the procedural painterly gradient backdrop

A WebGL2 procedural painterly-gradient surface. One full-screen fragment program
paints a living, soft-edged color field — from atmospheric "colored gas" washes
(the OpenAI / DALL-E / Sora hero register, Frankenthaler soak-stain) through to visible
oil-impasto, pastel, watercolor, and crayon brushwork. No images, no video, no external
libraries: every frame is generated in the shader from a handful of authored color zones
and a noise field, over glass-ui's warm-cream-glass identity.

Aurora is *not a mesh gradient*. The Stripe / OpenAI / Linear "ethereal glow" backdrops
are layered noise + a UV warp over a few color points; aurora's multi-nuclei softmax
field + Quilez double domain-warp + Khronos PBR-Neutral tonemap + OKLCh-authored palette already exceeds
that substrate on richness, and the painterly mediums take it somewhere no mesh-gradient
tool ships — visible, hand-painted brushwork. It is the WebGL sibling of the
[`GooBlob`](../goo-blob/): both compose the shared `useWebGLCanvas` substrate and resolve
color through the shared `procedural-color.glsl` chunk; the blob is the bounded metaball
creature, aurora is the full-bleed field.

```ts
import { Aurora } from "@mkbabb/glass-ui/aurora";
```

> **Research-backed.** This README documents aurora as it ships, with the SOTA technique
> behind each axis cited with access dates (2026-06-06). The lane's authoritative research
> artefact — the SOTA survey behind the painterly mediums, the structure-tensor / ETF
> keystone, the OKLCh palette path, and the cursor-as-light model — is [`RESEARCH.md`](./RESEARCH.md).
> `DESIGN.md` is the authoritative architecture spec (the invariants, the cursor model, the
> load-bearing implementation notes); this README is the consumer-facing guide.

---

## What it is

Aurora is a **single-pass WebGL2 fragment shader** assembled from cohesive GLSL partials
(`constants/shaders/`), not a multi-FBO compositor and not an SVG/CSS gradient. Every
fragment evaluates the whole field directly on the GPU. The pipeline, per frame:

1. **Composition** — a Quilez double-fBm *domain warp* of the UV (`aurora.frag.ts:258` `domainWarp`),
   then a *multi-nuclei softmax field* (2–6 anisotropic-Gaussian color attractors, each
   with elongation + angle) that selects a palette position per pixel, with internal
   lightness/chroma mottling (`composition.glsl.ts:25` `nucleiField`). Palette position never comes from
   a single focal point, a pure fBm color-id, or a spatial-distance axis — each produces a
   visible artifact (`DESIGN.md §3`).
2. **Medium** — an optional painterly overlay: `smooth` (no brush), `pastel`, `watercolor`,
   or `oil` (with the `oil` / `knife` / `chunky` stroke sub-modes), plus `crayon` as a peer
   medium (`mediums.glsl.ts`). Medium is orthogonal to composition — the same nuclei/warp
   field underlies every medium.
3. **Post** — saturation trim, the Khronos PBR-Neutral tonemap (the shipped tonemapper;
   the GLSL function keeps the slot-name `aces()` so the single `main()` call-site is
   untouched), paper grain, the mandatory sRGB OETF, and a 1-LSB Interleaved-Gradient-Noise
   dither to break 8-bit banding (`aurora.frag.ts:384-403` `main()` post block).

The palette is authored in **OKLCh** (perceptually-uniform color) and baked CPU-side to
linear sRGB; the shader tonemaps and composites in linear, then closes the seam with the
OETF before output.

It ships behind an **adaptive substrate**: capable devices get the animated WebGL field;
low-power / reduced-motion / data-saver devices get a static CSS-gradient placeholder
rendering the same palette (`resolveRenderMode`). The WebGL loop parks itself when
offscreen, content-hidden, or tab-backgrounded, and freezes to one static frame under
`prefers-reduced-motion: reduce` (the `useWebGLCanvas` substrate, gated by
`proof:offscreen-pause`).

### The software-raster guard + the luminance-faithful fallback (BB.W-AURORA-SWRASTER)

The substrate is **headless-safe and certify-grade** under a software rasterizer:

- **The universal software-raster guard.** A SOFTWARE WebGL renderer (SwiftShader /
  llvmpipe / MS Basic Render — the GPU-blocklisted / headless path) forces the `"css"`
  substrate for ANY WebGL-arming mode — `mode:"webgl"` and `mode:"capture"` too, not only
  `mode:"auto"`. A full-viewport software-rastered GL layer is so expensive to re-raster on
  every composite that a pointer interaction starves input and the page WEDGES; the guard
  falls cleanly to the static ground instead. The single ESCAPE is the
  `forceWebGLUnderSoftwareRaster` runtime option (`runtimeOptions` /
  `resolveRenderMode(mode, { forceWebGLUnderSoftwareRaster })`), default `false` — the guard
  is the safe default; a deterministic test that ACCEPTS the cost opts in explicitly. The
  capable path is byte-untouched. `createAurora` carries the matching WEDGE CATCH: under a
  software renderer with the escape off it returns an inert handle (the WebGL canvas is
  never created), so the placeholder stays the surface and no `onInitError` fires (a
  software-raster fall is a recognized substrate decision, not a contract violation; the
  `onInitError` contract is preserved for genuine shader/OOM violations).
- **The luminance-faithful fallback ground.** On the `"css"` substrate the placeholder is
  no longer the flat `paletteToCssGradient` diagonal band (a "visually-adjacent
  approximation" whose mean + spatial luminance diverge from the composite). It upgrades to
  `auroraFallbackGround` — a field-sampled ground derived from the SAME palette + nuclei the
  WebGL path uploads. `sampleAuroraField` mirrors the shader's static composite
  (`nucleiField` softmax-Gaussian + `samplePalette` linear LUT + the PBR-Neutral tonemap +
  the `linearToSrgb` OETF), reusing the value.js `oklchToLinear` core (ONE color source — no
  re-implemented OKLCh math; the GL-shader fence holds, this is a CPU/CSS derivation). The
  ground is a one-shot 2D-canvas raster (CSS-upscaled, painted once, parked) so its mean +
  per-quadrant luminance match the composite within the certify band — a HEADLESS contrast
  capture certifies the right floor with NO headed `--use-gl=angle` browser. The flat
  gradient stays the cheap capable-device first-frame the WebGL canvas cross-fades over.

Machine-locked by `proof:aurora-swraster` (W1 the universal signal + the safe-default
escape, W2 the wedge catch + the preserved `onInitError` contract, W3 the field-derived
one-color-source ground) + the binding headless π (`tests-visual/aurora-swraster.spec.ts` —
the painted mean + per-quadrant luminance within band, both modes, + the SwiftShader
no-hang). See `docs/tranches/BB/audit/visual/W-AURORA-SWRASTER-DELTA.md`.

---

## Use cases

- **Hero / landing backdrops** — full-bleed atmospheric drift behind a headline. The
  `smooth` medium is the calm default.
- **Content-over-aurora routes** — forms, dashboards, text-dense panels where the field
  should recede. Use `:opacity-ceiling` (a per-route compositing clamp, e.g. `0.5`) so the
  drift sits quietly behind page content without re-authoring the palette.
- **Warm low-intensity page-backdrop** — a calm, slow, low-saturation full-page wash behind
  long-form reading content. The `smooth` medium at a low `warpAmount` + a near-monochrome
  warm palette + `:opacity-ceiling` ~0.4 drifts gently without competing with the text; pair
  with a `DockBackgroundToggle` pause for the WCAG 2.2.2 floor.
- **Brand / mood surfaces** — derive a whole palette from one seed color (`deriveAurora`)
  to match a product accent; the NCSU-red house accent seeds a complementary ramp cleanly.
- **Painterly art pieces** — the oil / pastel / crayon mediums for an editorial,
  hand-painted feel rather than a flat mesh gradient. Reach for these when the brushwork
  *is* the point.
- **AV background** — a larger continuously-running backdrop. When used this way it MUST
  carry a `DockBackgroundToggle` (or equivalent) pause control per WCAG 2.2.2 (see
  [Accessibility](#accessibility)).
- **Thumbnails / static captures** — deterministic `renderAt(t)` bakes for preset galleries
  (the demo studio bakes 11 preset thumbnails through one shared context).

---

## Quick start

```vue
<script setup lang="ts">
import { Aurora, deriveAurora, DEFAULT_AURORA_CONFIG } from "@mkbabb/glass-ui/aurora";

// Seed a whole palette from one color, then spread it over the default nuclei.
const config = {
    ...DEFAULT_AURORA_CONFIG,
    palette: deriveAurora("#4f46e5", { harmony: "analogous", stopCount: 5 }),
    medium: "smooth" as const,
};
</script>

<template>
    <Aurora :config="config" :opacity-ceiling="1.0" />
</template>
```

`<Aurora>` is the Vue SFC wrapper. For imperative control (a canvas you own, capture
bakes), use `createAurora(canvas, config, options?)` directly; `useAurora(ref, config)` is
the composable that watches config deeply and pushes uniform updates.

---

## The mediums

The `medium` axis spans the two stylistic poles — atmospheric and painterly — continuously.
Medium is orthogonal to composition: the same nuclei/warp field underlies every medium.

| `medium`      | Look | Notes |
|---------------|------|-------|
| `smooth`      | Blurred colored-gas / wet-on-wet flood. No visible brush. | The OpenAI/DALL-E hero pole; the wispy-sky default. |
| `pastel`      | Anisotropic fBm stroke + fine paper tooth. | Soft directional chalk grain. |
| `watercolor`  | Wet-edge cauliflowers (luma-gradient mask) + granulation + wash banding. | Soak-stain / bokashi. |
| `oil`         | Visible curved brushstrokes, impasto rim-light, broken color. | Routed by `strokeMode`. |
| `vangogh`     | Atomic comma/crescent dabs along the structure-tensor field — the starry-night hero. | First-class `medium:"vangogh"` (`uMedium`); the painterly hero register. |
| `oil-pastel`  | Stroke deposition with paper-through-scumble. | First-class `medium:"oil-pastel"`; the reworked oil-pastel bake. |
| `crayon`      | DRY wax-pigment tooth multiply. | First-class `medium:"crayon"` (`uMedium==4`); the legacy `oil`+`strokeMode:"crayon"` peer-route is removed (clean break). |

Under `medium: "oil"`, `strokeMode` selects the brush behavior:

| `strokeMode` | Look |
|--------------|------|
| `oil`    | Balanced modern-gestural bristle (the default). |
| `knife`  | Palette-knife impasto: razor edges, flat, heavy catch-light. |
| `chunky` | Thick gestural bristle brush. |

`strokeMode` is oil sub-modes ONLY. `crayon` is a first-class `medium:"crayon"`
(the DRY wax-pigment tooth multiply, `uMedium==4`) — the legacy `oil` + `strokeMode:"crayon"`
peer-route is REMOVED (clean break, no alias). A crayon surface selects `medium:"crayon"`;
van-Gogh selects `medium:"vangogh"` (atomic comma/crescent dabs) and oil-pastel selects
`medium:"oil-pastel"` (stroke deposition). See `DESIGN.md`.

### The painterly engine

The oil medium is genuine stroke-based rendering — a curved swept-stroke SDF
(`curvedStroke`, `brush.glsl.ts:72`) with a quadratic-bulge spine, bristle-ragged edges,
end-cap blobs, internal streaking, and an impasto rim, placed by a best-of-9-neighbor cell
search (`bestOil`, `brush.glsl.ts:188`) across four big→medium→small→fill layers with
optional crosshatch (`strokeLayers: 2`). Per-stroke broken color jitters each stroke's
pigment deterministically (`brokenColorJitter`, bounded to ≈±16° hue / ±14% value so it
reads as broken paint, not noise — `DESIGN.md §7`).

The painterly engine is perfected over four folds that all consume one keystone (landed,
gated by `proof:aurora-tensor-field` · `proof:aurora-impasto-relight` ·
`proof:aurora-vangogh-preset` · `proof:aurora-oilpastel-medium`):

- **The structure-tensor / edge-tangent-flow keystone.** Strokes orient either off the
  hand-authored `flowField` (`flow.glsl.ts:6`) or off the *color field's own gradient*
  (`strokeOrient: "tensor"`): a Sobel-derivative `sampleBase` → the 2×2 structure
  tensor `J=[[Gx·Gx,Gx·Gy],[Gx·Gy,Gy·Gy]]` → its minor eigenvector (the edge-tangent flow)
  + a coherence scalar `A=(λ1−λ2)/(λ1+λ2)`. Strokes then hug the color zones the way real
  Van Gogh contours curve around the moon — the single biggest "congruent to real Van Gogh"
  lever. Selectable via `strokeOrient: "flow" | "tensor"`; a single-pass small-tap
  structure-tensor approximation ships on the WebGL2 fragment shader.
  *(Kyprianidis & Kang CGF 2009; Kang/Lee/Chui ETF NPAR 2007; Heckel 2024.)*
- **Real height-field impasto.** No faked fixed-RGB edge rim — an accumulated per-pixel
  paint *height* across the four stroke layers → a `dFdx`/`dFdy` surface normal → diffuse +
  Blinn specular from a movable `uLightDir`, all in linear light before the PBR-Neutral tonemap.
  Thick impasto catches a raking light; the light direction doubles as the interactive
  cursor-as-light axis (W8). *(IMPaSTo, Baxter/Wendt/Lin NPAR 2004.)*
- **The van-Gogh atomic-stroke medium.** A first-class `medium:"vangogh"`: ETF-oriented
  strokes, length + layer density graded by local luminance and coherence (long confident
  strokes in bright passages, short dabs in the darks — the measured Starry-Night
  Kolmogorov/Batchelor turbulence cascade), OKLCh per-stroke pigment jitter, real impasto.
  No subject matter — the "source image" is the generated nuclei field, so strokes trace its
  iso-bands. *(Hidden Turbulence in The Starry Night, Physics of Fluids 36 /
  arXiv:2310.03415, 2024; Hertzmann SIGGRAPH 1998.)*
- **Genuine oil-pastel deposition.** `medium:"oil-pastel"` is a pigment-on-tooth deposition
  model, not a tooth-multiply: tooth-occlusion deposition (pigment on the paper-height
  peaks, skipping valleys — light pressure shows paper, heavy fills it), a *scumble* broken-
  upper-layer pass (coverage < 1 letting the lower color through), and a *waxy specular film*
  whose sheen grows with layer count (burnish, distinct from oil's sharp glint). *(Mont Marte
  oil-pastel-technique references.)*

The **anisotropic Kuwahara finish** (the canonical "make a gradient read as oil paint"
operator — an 8-sector elliptical kernel squeezed along the tensor) and the smoothed
multi-tap tensor are inherently multi-pass — a form a single-pass fragment shader cannot
express. The aurora ships the single-pass ETF half (stroke orientation) and the impasto /
deposition material truth on WebGL2; the multi-pass Kuwahara/LIC half was investigated and
excised as substrate-without-consumer, so no multi-pass finish ships. Note the
research lineage names ETF *+ LIC* (line-integral convolution) as the full Van-Gogh
mechanism.

---

## Flow and warp

- **`warpMode`** (`fbm` | `cellular` | `hybrid`) — the region-boundary character. `fbm`
  gives soft organic zones; `cellular` gives chunky almost-rectangular territories;
  `hybrid` averages both.
- **`flow.pattern`** (`none` | `radial` | `swirl` | `diagonal` | `multi`) — the directional
  field the pastel/oil/crayon mediums lay strokes along (`flow.glsl.ts:6`). Flow drives
  *stroke direction only*, never which palette stop a pixel picks (`DESIGN.md §2.5`).
- **Cursor** — `setCursor(x, y, strength)` swirls both the color field (zones curl around
  the pointer, via `domainWarp`) and the flow field (stroke direction bends), with a
  Gaussian-radius falloff and a ~2s decay after `clearCursor()`. The cursor is the one
  deliberate exception to "flow couples to medium only" — it rotates the *spatial
  coordinate*, never the palette position (`DESIGN.md §2.6`).

The AW research fan grounds richer flow (true divergence-free curl noise / bitangent noise
for incompressible, non-pooling motion; analytic-derivative fBM for a free exact gradient)
as **perf-and-quality levers** on the keystone — the analytic gradient feeds both the curl
field and the structure tensor — staged in `PATH-FORWARD.md §6`, not as separate feature
waves. *(Bridson SIGGRAPH 2007; atyuwen bitangent noise; IQ morenoise.)*

---

## API

The full config shape (`AuroraConfig`) and instance interface (`AuroraInstance`) are
documented in `DESIGN.md §5`. The headline surface:

```ts
import {
    Aurora,            // the Vue SFC
    useAurora,         // composable: watches config, pushes uniforms
    createAurora,      // imperative core: createAurora(canvas, config, options?)
    deriveAurora,      // seed one color → harmonious N-stop OKLCh palette
    resolveRenderMode, // device-tier substrate resolver ("webgl" | "css")
    DEFAULT_AURORA_CONFIG,
    MAX_NUCLEI,        // 6
    MAX_STOPS,         // 8
} from "@mkbabb/glass-ui/aurora";

import type {
    AuroraConfig, AuroraNucleus, AuroraFlow, OklchStop,
    AuroraMedium, StrokeMode, FlowPattern, WarpMode,
    AuroraHarmony, DeriveAuroraOptions, AuroraInstance,
} from "@mkbabb/glass-ui/aurora";
```

### Instance methods

```ts
interface AuroraInstance {
    update(cfg: AuroraConfig): void;     // re-upload uniforms (deep-watched by useAurora)
    setCursor(x, y, strength?): void;    // pointer swirl, 0..1 space
    clearCursor(): void;                 // begin the ~2s decay
    setCursorRadius(r): void;            // influence radius 0.05..0.5
    setReducedMotion(flag): void;        // freeze the field to one static frame
    renderAt(t): void;                   // deterministic draw-only render (capture bakes)
    pause(): void; resume(): void;       // wire to DockBackgroundToggle (WCAG 2.2.2)
    dispose(): void;                     // release the GL context (WEBGL_lose_context)
}
```

### The atoms door — the consumer surface

`resolveAtoms(atoms) → AuroraConfig` is THE consumer-facing door. The ≤7
intuitive **atoms** are the user's named control elements — **COLOR** (seed · harmony ·
colorEnergy), **ZONES** (count · arrangement), **NOISE** (one organic-boundary knob),
**MEDIUM** (+ texture, textured mediums only), **MOTION**:

```ts
import { resolveAtoms } from "@mkbabb/glass-ui/aurora";

const config = resolveAtoms({
    seed: "#3a7bd5",
    harmony: "analogous",
    colorEnergy: 0.7,                          // co-varies saturation + value + breath + warm/cool
    zones: { count: 3, arrangement: "composed" }, // scattered | composed | centred
    noise: 0.5,                                // → warpAmount + warpScale + warpMode + noiseOctaves
    medium: { kind: "oil", amount: 0.6 },      // smooth carries NO `amount` (structural)
    motion: "drifting",
});
// pass `config` to <Aurora :config>.
```

Each atom maps to a co-varying cluster of fields, so one knob moves the entangled axes
together (Burley's "Principled" 5-rule discipline: intuitive, few, normalized, robust for
EVERY combination). `resolveAtoms` is a pure, *total* function — every atom combination
(including out-of-range inputs) resolves to a valid in-range config respecting every
`budget.ts` cap, and `DEFAULT_ATOMS` (the empty set) resolves exactly to the wispy-sky
`DEFAULT_AURORA_CONFIG`. Inapplicable knobs are **structurally absent** (a smooth medium's
texture-amount union arm does not exist — no silent-inert slider); only the wired
interactivity axes (`light` / `scroll`) ship. Machine-asserted by
`proof:aurora-atoms-roundtrip` (totality + default-preservation + reachability + the
dead-door deletion) and the π-lane `proof:aurora-atoms-render` (per-atom device readback).

### The internal author schema

`AuroraConfig` is the INTERNAL author schema — the full ~28-field surface a preset author
types a hand-tuned backdrop against (composition: palette/nuclei/softmaxBeta/valueVariance;
warp: amount/scale/drift/mode/octaves; medium: medium/flow + the stroke/wet/tooth knobs;
motion: drift/breath; output: saturation/grain/alpha). See `DESIGN.md §5` for every field
with its range. The atoms door above is the simplification the consumer reaches for; the raw
schema is the escape hatch a preset author drops to, not the default surface.

### Deriving a palette

`deriveAurora(seed, options?)` is the simplified authoring door — turn one color into a
gamut-safe, harmonious N-stop palette instead of hand-tuning eight OKLCh stops:

```ts
import { deriveAurora } from "@mkbabb/glass-ui/aurora";

deriveAurora("#e11d48", { harmony: "complementary", stopCount: 5 });
deriveAurora({ L: 0.55, C: 0.18, h: 250 }, { harmony: "analogous", hueSpread: 34 });
```

Harmonies today: `analogous` (the painterly default), `complementary`, `triad`,
`monochrome` (`color.ts:110`). The ramp walks lightness across a painterly band (deep base →
pale apex), falls chroma off toward the apex, and gamut-maps every stop through value.js's
Ottosson core (`gamutMapStop`, `color.ts:250`).

`deriveAurora` carries `split-complementary` / `tetradic` harmonies, eased L/C journeys (a
**bell** chroma curve — peak in the mids, desaturated extremes — is the default), and
warm-light/cool-shadow `temperatureShift` coupling (the single most-cited painting rule, the
fold that makes the oil/oil-pastel mediums read as *mixed paint* rather than stamped hue —
`temperatureShift` interpolates the hue toward named warm/cool OKLCh poles). The
whole-scene derive from one seed lives in the **atoms door** (`resolveAtoms` above — the ONE
consumer surface; the prior parallel seed+mood door is retired). Landed, gated by
`proof:aurora-derive-gamut`. *(meodai pro-color-harmonies; Adobe Leonardo / OKLCh ramp
tooling; Baudisch / Gamblin warm-cool temperature.)*

---

## Color notes

- **The palette is baked to LINEAR sRGB**, not gamma sRGB. The whole shader pipeline
  (palette interp, nuclei field, mediums, PBR-Neutral tonemap, grain) runs in linear, and the
  **mandatory `linearToSrgb()` OETF closes the seam** as the final step before `fragColor`
  (`aurora.frag.ts:384`). Without it the field ships ~2.2× too dark (linear 0.5 → display
  ~0.215 instead of ~0.735). This is machine-locked by `proof:aurora-space-gamma`. The OETF
  + the rotated-octave FBM constant are spliced from the shared `procedural-color.glsl`
  chunk so they can never diverge from the goo-blob's copy (the divergence root cause a shared chunk forecloses).
- **Palette interpolation runs in OKLCh, not linear-sRGB.** The stop-to-stop blend in
  `samplePalette` (`composition.glsl.ts:15`) routes through the shared `samplePaletteRamp`
  (`procedural-color.glsl.ts:147`, `PALETTE_RAMP_GLSL`): a smoothstep ease then an
  OKLab-rectangular blend, so distant-hue midpoints hold chroma instead of greying. Broken
  color (`brokenColorJitter`, `aurora.frag.ts:310`) and saturation (`saturate3`, `:323`) run
  in OKLCh too — the YIQ-style `hueShift` matrix is gone. The `OKLCH_MATRICES_GLSL` chunk
  (`procedural-color.glsl.ts:73`) is 1e-6-verified (`proof:aurora-oklch-interp`). The
  interpolation-space choice is deliberate: *ramps interpolate in OKLab (rectangular)* to
  avoid the hue-detour midpoint darkening Tailwind documented (#14955); the OKLCh hue-arc is
  reserved for deliberate rainbow travel via the `huePath` axis (`shorter` | `longer` |
  `increasing` | `decreasing`). The ramp lives in the shared `procedural-color.glsl.ts`
  `PALETTE_RAMP_GLSL` leaf the WebGL2 `samplePalette` splices. *(Ottosson
  OKLab; Aras Pranckevičius cbrt-LMS precompute; MDN `<hue-interpolation-method>`.)*
- **Author in OKLCh, not hex.** `OklchStop { L, C, h }` gives perceptually-even ramps —
  equal numeric steps read as equal visual steps, and a hue rotation at fixed L/C preserves
  perceived brightness (which HSL does not). `deriveAurora` is the fast path; hand-author the
  8 stops only when you need a specific gradient. `hexToOklchStop` / `cssToOklch` convert at
  the boundary.

---

## Performance notes

- **Banding is dithered post-transfer.** A 1-LSB Interleaved-Gradient-Noise dither (Jimenez)
  is applied in *display* space *after* the OETF (`aurora.frag.ts:388`) — the canonical fix
  for 8-bit mid-tone banding on soft gradients. Don't move it into linear space.
- **One draw, one shader.** No multi-pass, no FBO ping-pong, no external deps — a single
  full-screen triangle (`DESIGN.md §2` invariant 8). Aurora renders on a single-pass WebGL2
  fragment shader, unconditionally.
- **The loop parks aggressively.** Offscreen (`IntersectionObserver`), content-hidden
  (`content-visibility:auto`), and tab-backgrounded (`document.hidden`) all park the rAF
  loop, so an off-screen aurora attaches zero frames (the `useWebGLCanvas` substrate, gated
  by `proof:offscreen-pause`).
- **The aurora WASH is clamped to 1.5× (BB.W-PERF-PRODUCER A′-5).** The aurora is a
  heavily-blurred decorative drift wash, not a sharp-silhouette creature, so it backs
  at the SUB-2× `AV_AURORA_DPR_MAX` (1.5×) ceiling via `resolveAuroraWashDpr()`
  (`budget.ts`), DISTINCT from the focal goo-blob's `AV_DPR_MAX` (2×, the sharp
  creature keeps it via `resolveBudgetDpr()`). On a drift wash 1.5× is visually
  indistinguishable from 2× (the per-pixel FBM is already below the DPR-2 detail
  floor) while quartering the GPU memory + per-composite raster (the value.js LP1
  ~2880×1800 / ~21.8 MB full-viewport-2× trace) — the single biggest VRAM/fill lever
  after the offscreen-park. CPU-side backing-store dimension only; `aurora.frag` is
  byte-fenced (the GL fence is absolute).
- **Oil is the heaviest path.** `sampleBase` re-runs the entire warp + nuclei field, and
  `bestOil` calls it once per stroke cell across ~9 neighbors × 4–5 layers ≈ 40+ full-field
  recomputes per fragment. The AW painterly waves are budget-gated (`profile:budget`); the
  field-bake hoist (compute `domainWarp`+`nucleiField` once per fragment, not dozens of
  times) is the structural perf transposition the budget triumvirate reaches for if the
  height-field impasto or OKLCh `samplePalette` reds the budget (`PATH-FORWARD.md §6`).
- **Reduced motion freezes, not hides.** Under `prefers-reduced-motion: reduce` the field
  paints one static frame and parks; the substrate live-monitors the media query so a
  runtime toggle freezes/wakes. Cursor easing is JS-side (position/strength lerp + decay in
  the runtime, not the shader) so the response stays breath-paced and framerate-independent.

### Substrate

Aurora renders on a single-pass WebGL2 fragment shader. WebGPU was investigated and
the multi-pass painterly half (the Gaussian-smoothed structure tensor + anisotropic Kuwahara
finish a single-pass shader cannot express) was excised as substrate-without-consumer — the
WebGL2 fragment path is the sole renderer.

---

## Interactivity

The base interaction is the cursor swirl (`aurora.frag.ts:269-283`) — the pointer rotates
the warp and bends the flow with a Gaussian-radius falloff and a ~2s decay. The interactive
axes are all opt-in behind a config flag (the wispy-sky default stays non-interactive),
landed + gated by `proof:aurora-interaction-prm`:

- **Cursor-as-light** — the pointer drives the W4 impasto `uLightDir`, so the catch-lights
  track the cursor and the relief reads tactile (a slow auto-orbit when idle). No new
  lighting path — it reuses the movable impasto light.
- **Velocity-reactive flow** — `cursorModel.ts` carries pointer/scroll velocity (the
  `uCursorVelocity` / `uCursorBurst` uniforms); a fast flick injects a transient swirl-burst
  easing out over ~1s, distinct from the steady attraction.
- **Scroll coupling** — palette/breath progress binds to scroll via the existing
  `useScrollProgress` motion composable (no new substrate).

**Accessibility is binding.** Every interactive axis routes through one master tempo scalar
that `prefers-reduced-motion: reduce` (WCAG 2.3.3, Animation from Interactions — the
substrate's live PRM freeze) and the `DockBackgroundToggle` pause (WCAG 2.2.2, Pause/Stop/
Hide) zero. Every interactive axis is on the offscreen-park gate — a parked rAF skips it.

---

## Best practices

- **Keep nuclei sparse and amorphous.** 2–6 zones. A single nucleus reads as a focal point
  (an explicit non-goal); the multi-attractor blend is what makes it read atmospheric rather
  than radial. Placing the dominant zone on a rule-of-thirds power point (not center) reads
  as *composed*.
- **Tune drift for "slowly alive."** `warpDrift` / `nucleiDrift` / `paletteDrift` live in a
  human 0..0.05 band; the shader lifts them to a perceptible ~5–15s period. Leave them near
  the defaults — a frantic pan breaks the breath-paced aesthetic, a slower-than-8s loop reads
  static.
- **Use `opacity-ceiling`, not `alpha`, to recede behind content.** `config.alpha` is
  per-pixel pigment opacity *inside* the painted image; `:opacity-ceiling` is the outer
  compositing envelope. Hero surfaces stay at `1.0`; quiet content routes opt in to `~0.5`
  (`DESIGN.md §6 Δ06`).
- **Let the substrate adapt.** Rely on the default `mode="auto"` so low-power /
  reduced-motion / data-saver devices get the CSS placeholder. Don't force `webgl` on routes
  that don't need motion.
- **Wire a pause control on long-running surfaces.** A continuously-animating, non-essential
  background over 5s is obligated (WCAG 2.2.2) to carry a user-reachable stop. Wire
  `DockBackgroundToggle`'s `@update:paused` to `pause()`/`resume()`.
- **Reach for the painterly mediums deliberately.** `smooth` is the cheap, calm atmospheric
  pole — the right default for most backdrops. The oil/pastel/crayon mediums cost more (oil
  re-evaluates the field per stroke cell) and read as editorial art — use them when the
  brushwork *is* the point, not behind dense text.
- **Presets live in consumers.** The library exports the config *shape* and a minimal
  `DEFAULT_AURORA_CONFIG` only. The named themes (Sky, Dawn, Meadow, Oil Van Gogh, …) live in
  `demo/stories/aurora/presets.ts`, per the presets-in-consumers rule.

---

## Accessibility

Aurora is non-essential, continuously-animating, auto-starting motion — so two WCAG floors
are binding, both owned by the shared substrate, not re-implemented per surface:

- **WCAG 2.3.3 (Animation from Interactions) / 2.2.4 motion** — under
  `prefers-reduced-motion: reduce` the field paints one static frame and parks. The substrate
  *live-monitors* the media query (a `matchMedia` change listener), so a runtime toggle
  freezes/wakes without a remount. Every interactive axis (W8) hooks the same master
  tempo scalar.
- **WCAG 2.2.2 (Pause, Stop, Hide)** — a continuously-running background over 5s must carry a
  user-reachable stop *available to all users* (not gated behind PRM). `DockBackgroundToggle`
  is glass-ui's Level-A control; wire its `@update:paused` to the instance `pause()` /
  `resume()`.

---

## Examples

### Atmospheric hero (smooth)

```ts
const config = {
    ...DEFAULT_AURORA_CONFIG,
    palette: deriveAurora("#1e3a8a", { harmony: "analogous", stopCount: 5 }),
    medium: "smooth",
    warpMode: "fbm",
    warpAmount: 0.35,
    breathPeriod: 48,   // a ~48s breath cycle
};
```

### Oil impasto with cursor interaction

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Aurora, useAurora, deriveAurora } from "@mkbabb/glass-ui/aurora";

const canvas = ref<HTMLCanvasElement>();
const { instance } = useAurora(canvas, {
    palette: deriveAurora("#b45309", { harmony: "complementary" }),
    medium: "oil",
    strokeMode: "oil",
    strokeLayers: 2,        // crosshatch
    impasto: 0.9,
    brokenColor: 0.6,
    flow: { pattern: "swirl", focalX: 0.5, focalY: 0.5, angle: 0, curl: 0.4 },
});

function onMove(e: PointerEvent) {
    const r = (e.target as HTMLElement).getBoundingClientRect();
    instance.value?.setCursor((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, 1);
}
</script>

<template>
    <canvas ref="canvas" @pointermove="onMove" @pointerleave="instance?.clearCursor()" />
</template>
```

### Quiet content route

```vue
<!-- The drift recedes behind a form; the painted image is unchanged. -->
<Aurora :config="config" :opacity-ceiling="0.5" />
```

---

## Architecture

```
src/components/custom/aurora/
├── Aurora.vue                    # canvas wrapper + useAurora + defineExpose cursor API
├── index.ts                      # barrel (@mkbabb/glass-ui/aurora)
├── DESIGN.md                     # the authoritative architecture spec (invariants, cursor model)
├── constants/
│   ├── presets.ts                # types only + DEFAULT_AURORA_CONFIG + MAX_* constants
│   ├── budget.ts                 # the CPU-side perf ceiling tokens (DPR clamp, loop band)
│   ├── renderMode.ts             # AuroraRenderMode union + resolveRenderMode device-tier resolver
│   └── shaders/                  # the GLSL partials the assembler splices into FRAGMENT_SRC
│       ├── aurora.vert.ts        # full-screen triangle
│       ├── aurora.frag.ts        # the assembler + warp + fbm + main()
│       ├── composition.glsl.ts   # samplePalette LUT + the multi-nuclei softmax field
│       ├── flow.glsl.ts          # the directional flow field
│       ├── brush.glsl.ts         # the curved swept-stroke SDF + bestOil placement + impasto
│       ├── mediums.glsl.ts       # the four peer mediums + the sampleBase edge recompute
│       └── tonemap.glsl.ts       # the LOCKED linear→PBR-Neutral→OETF→dither pipeline (the GLSL fn keeps the slot-name `aces()`)
└── composables/
    ├── atoms.ts                  # the ≤7-atom resolveAtoms door (THE consumer surface) + configToAtoms inverse
    ├── color.ts                  # OKLCh math + deriveAurora + oklchToLinear + flattenPalette
    ├── configSource.ts           # useConfiguratorState<AuroraConfig> source threading (per-preset clones)
    ├── cursorModel.ts            # the cursor-as-light state model (velocity-reactive flow)
    ├── frameLoop.ts              # the rAF loop + the offscreen-park / PRM-freeze hooks
    ├── glSetup.ts                # GL context + program + uniform-location setup
    ├── runtime.ts                # createAurora — live/capture WebGL lifecycle + cursor easing
    ├── uniformBridge.ts          # config → GL uniform threading
    ├── useAurora.ts              # the Vue wrapper: onMounted/watch/onBeforeUnmount
    └── useCursorInteraction.ts   # the pointer layer
```

The substrate is shared: aurora and the goo-blob both compose `useWebGLCanvas`
(`src/composables/glass/webgl/`) and both resolve color through the shared
`procedural-color.glsl` chunk — so the offscreen-park, PRM freeze, and the OETF/FBM
constants are single-sourced across both surfaces (gated by `proof:webgl-substrate-single`,
`proof:single-color-core`, `proof:shader-shared-source`).

---

## Gates (the falsifiable contract)

The machine-locked invariants — each born-RED on HEAD, GREEN at its wave's close, with a
named bite-check that re-reds it:

| Gate | Asserts | Ships with |
|---|---|---|
| `proof:aurora-space-gamma` | the linear pipeline closes the seam — `col = linearToSrgb(col)` precedes the `fragColor` write (the ~2.2×-too-dark trap is forbidden) | shipped (AV.W1) |
| `proof:webgl-substrate-single` · `proof:single-color-core` · `proof:shader-shared-source` | aurora + blob share ONE `useWebGLCanvas` substrate and ONE OKLCh/OETF/FBM color chunk (no divergent copy) | shipped (AV.W2) |
| `proof:offscreen-pause` | a parked rAF (offscreen / content-hidden / tab-hidden / PRM-reduce) attaches ZERO frames | shipped (AV.W7) |
| `proof:aurora-tensor-field` | the structure-tensor eigen-decomposition matches a synthetic gradient field within tolerance; `strokeOrient:"tensor"` tracks the field gradient, not the global flow. Bite: swap the minor eigenvector for the major → RED | shipped (AW.W4) |
| `proof:aurora-impasto-relight` | the fixed-RGB rim is gone from `paintOver`; a `uLightDir` sweep moves the catch-light. Bite: restore the fixed rim → RED | shipped (AW.W4) |
| `proof:aurora-vangogh-preset` | `medium:"vangogh"` resolves its uniforms; the deterministic `renderAt(t)` bake is snapshot-blessed. Bite: fall back to oil+swirl → RED | shipped (AW.W4) |
| `proof:aurora-oilpastel-medium` | the reworked oil-pastel bake shows paper-through-scumble; the WebGL2 path stays inside `profile:budget`. Bite: revert to the tooth-multiply → RED | shipped (AW.W4) |
| `proof:aurora-oklch-interp` | the spliced OKLCh matrices match value.js to 1e-6; the blue→yellow midpoint holds chroma above the linear-`mix` midpoint. Bite: revert `samplePalette` to linear `mix()` → RED | shipped (AW.W5) |
| `proof:aurora-derive-gamut` | every harmony × easing × temperature stop is in-sRGB over a neon-seed matrix after `gamutMapStop`. Bite: remove `gamutMapStop` → RED | shipped (AW.W5) |
| `proof:aurora-atoms-roundtrip` | `resolveAtoms` is total + default-preserving AND REACHABLE — the live aurora story routes the atoms-default door (drives the canvas via `resolveAtoms`, not raw config) AND the dead parallel seed+mood door is GONE (grep=0) + ONE `nucleiPrior` + the noise atom fans out + texture is structurally absent on smooth. Bite: re-route the atoms tab to mutate raw config / re-introduce the dead door / drop the noise atom → RED | shipped (AX.W10) |
| `proof:aurora-atoms-render` | the π-lane PER-ATOM device readback — driving each atom (seed / colorEnergy / zones / noise / medium) in the live config UI visibly changes the canvas centre region above the ambient drift baseline (the atoms are WIRED, not inert). Bite: leave an atom unwired → its delta collapses to the drift floor → RED | shipped (AX.W10) |
| `proof:aurora-interaction-prm` | every interactive axis is suppressed under `prefers-reduced-motion`; the master tempo scalar zeroes the stateful field; the pause stops every axis. Bite: detach an axis from the tempo scalar → RED | shipped (AW.W8) |
| `proof:aurora-fill-resize` | the field fills its host across a resize — no letterbox / fixed-aspect gap. Bite: pin a fixed canvas size → RED | shipped |
| `proof:aurora-stroke-composite` | the painterly stroke layer composites over the field without a hard seam (the blend is energy-preserving). Bite: hard-`mix()` the stroke → RED | shipped |
| `proof:aurora-painterly-statistics` | the painterly mediums hit their authored stroke-density / contrast statistics over the re-skinned config driver (the live story exercises each medium through its as-built control). Bite: flatten a medium to `smooth` → RED | shipped |
| `proof:aurora-arresting-ref` · `proof:aurora-arresting` | the arresting-reference comparison + the live arresting check — the hero register reads as a painterly field, not a flat gradient, against the reference statistics. Bite: collapse to a 2-stop linear gradient → RED | shipped |
| `proof:aurora-chrome-idiomatic` | the aurora chrome composes the shipped Configurator/Dock idioms (no bespoke control re-roll). Bite: hand-roll a parallel control column → RED | shipped |
| `proof:aurora-preset-roster` | the preset roster resolves its named presets to in-gamut configs. Bite: add a preset that out-gamuts → RED | shipped |

---

## References

The lane's authoritative research artefact is [`RESEARCH.md`](./RESEARCH.md) (the SOTA survey behind
the painterly mediums, the structure-tensor / ETF keystone, the OKLCh palette path, and the
cursor-as-light model). The primary techniques behind each axis, with access dates (2026-06-06):

### Noise, warp, and flow
- Iñigo Quilez — [Domain warping](https://iquilezles.org/articles/warp/),
  [fBm](https://iquilezles.org/articles/fbm/),
  [fBm with analytic derivatives](https://iquilezles.org/articles/morenoise/),
  [Smooth Voronoi](https://iquilezles.org/articles/smoothvoronoi/),
  [Procedural color palettes](https://iquilezles.org/articles/palettes/).
- Bridson, Hourihan, Nordenstam — [Curl-Noise for Procedural Fluid Flow, SIGGRAPH 2007](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf);
  atyuwen — [Fast divergence-free (bitangent) noise](https://atyuwen.github.io/posts/bitangent-noise/);
  Dziewanowski — [Dissecting Curl Noise](https://emildziewanowski.com/curl-noise/).
- Stefan Gustavson — [Efficient computational noise in GLSL, arXiv:1204.1461 (2012)](https://arxiv.org/pdf/1204.1461);
  [The Book of Shaders — Noise](https://thebookofshaders.com/11/).

### Color science
- Björn Ottosson — [Oklab color space](https://bottosson.github.io/posts/oklab/),
  [sRGB gamut clipping](https://bottosson.github.io/posts/gamutclipping/).
- Aras Pranckevičius — [Optimizing Oklab gradients](https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/).
- [OKLCH makes better gradients (Blue Monkey Makes)](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients);
  [Why CSS gradients look grayish (Toolbox365)](https://www.toolbox365.net/tutorials/gradient-banding-and-oklch/);
  Tailwind CSS [#14955 (OKLab gradient interpolation)](https://github.com/tailwindlabs/tailwindcss/issues/14955).
- [MDN — `<hue-interpolation-method>`](https://developer.mozilla.org/en-US/docs/Web/CSS/hue-interpolation-method);
  meodai — [pro-color-harmonies](https://github.com/meodai/pro-color-harmonies),
  [poline](https://github.com/meodai/poline).

### Mesh-gradient baselines
- Alex Harri — [A flowing WebGL gradient, deconstructed](https://alexharri.com/blog/webgl-gradients).
- Kevin Hufnagl — [Stripe gradient teardown](https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/).
- [gradients.fyi (OKLCH mesh generator)](https://gradients.fyi/);
  Justin Jay Wang (OpenAI) — [Methods for random gradients](https://justinjay.wang/methods-for-random-gradients/);
  [paper.design Grain-Gradient shader](https://shaders.paper.design/grain-gradient).

### Painterly / NPR / Van Gogh
- Kyprianidis & Kang — [Image and Video Abstraction by Anisotropic Kuwahara Filtering, CGF 2009](https://www.kyprianidis.com/p/pg2009/).
- Maxime Heckel — [On crafting painterly shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/),
  [Field Guide to TSL and WebGPU](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/).
- Hertzmann — [Painterly Rendering with Curved Brush Strokes of Multiple Sizes, SIGGRAPH 1998](https://mrl.cs.nyu.edu/publications/painterly98/hertzmann-siggraph98.pdf);
  Kang, Lee, Chui — [Coherent Line Drawing / Edge Tangent Flow, NPAR 2007](https://cg.postech.ac.kr/papers/kang_npar07_hi.pdf);
  [Line Integral Convolution (Cabral & Leedom 1993)](https://en.wikipedia.org/wiki/Line_integral_convolution).
- [Hidden Turbulence in van Gogh's The Starry Night, Physics of Fluids 36, 095140 (2024)](https://pubs.aip.org/aip/pof/article/36/9/095140/3312767) /
  [arXiv:2310.03415](https://arxiv.org/pdf/2310.03415).
- Sharma — [A Van Gogh Inspired 3D Shader Methodology (TAMU thesis)](https://core.ac.uk/download/pdf/147237812.pdf);
  Bousseau et al. — [Interactive watercolor rendering, 2006](https://artis.inrialpes.fr/Publications/2006/BKTS06/watercolor.pdf).

### Impasto + pigment
- Baxter, Wendt, Lin — [IMPaSTo: A Realistic, Interactive Model for Paint, NPAR 2004](http://gamma.cs.unc.edu/IMPASTO/publications/Baxter-IMPaSTo_Web-NPAR04.pdf);
  [Differentiable Stroke Planning with Dual Parameterization, arXiv:2604.02752](https://arxiv.org/pdf/2604.02752);
  [LearnOpenGL — Normal Mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping).
- spectral.js — [Kubelka-Munk pigment mixing on the GPU (MIT)](https://github.com/rvanwijnen/spectral.js/).

### Dither + tonemap
- Jimenez — Interleaved Gradient Noise; Bart Wronski — [Dithering, part three](https://bartwronski.com/2016/10/30/dithering-part-three-real-world-2d-quantization-dithering/);
  [Moments in Graphics — free blue-noise textures](https://momentsingraphics.de/BlueNoise.html).
- Benjamin Wrensch — [Minimal AgX](https://iolite-engine.com/blog_posts/minimal_agx_implementation);
  Khronos — [PBR Neutral tone mapper](https://modelviewer.dev/examples/tone-mapping).
- Pavel Dobryakov — [WebGL Fluid Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) (the stateful pointer-wake splat).
