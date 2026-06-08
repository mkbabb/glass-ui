# GooBlob

A WebGL2 metaball "creature" — a pulsing, organic, gooey SDF body with up to four orbiting
satellites that merge in, get absorbed, and re-emerge, painted with a perceptually-uniform OKLCh
color perturbation over glass-ui's warm-cream glass identity. It is the WebGL sibling of
[`WatercolorDot`](../watercolor-dot/) (the CSS/SVG dot): the goo-blob is the continuously-animated,
per-pixel-shaded metaball; the watercolor-dot is the cheap static dot. They are deliberate
siblings, not redundant.

> Research-backed. This README documents the blob as it SHIPS. The droplet surface (lit glass:
> normalized + circular smin, the analytic SDF-gradient normal, warm-cream specular + Fresnel rim,
> analytic-derivative gradient noise, the domain-warped membrane edge), the interaction model
> (critically-damped spring pointer, the decaying-radius elastic trail, velocity squash-and-stretch,
> the composed reduced-motion rest pose), the mood/iridescence/palette layer (warm-biased
> iridescence + fake-SSS depth, the seed-driven OKLCh `deriveBlobPalette`, the {valence, arousal}
> mood model), the lit warm-cream DEFAULT, the contained droplet geometry, the `v-model:paused`
> WCAG-2.2.2 seam, the event-scheduled demand-gate quiescence, and the `quality: "full" | "half"`
> axis are ALL landed. The technique behind each is cited with access dates in [References](#references).

```ts
import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
```

---

## What it is

The blob is a **single-pass WebGL2 signed-distance-field (SDF) metaball**, not an SVG goo-filter
and not a CPU marching-squares contour. Each fragment evaluates the field directly on the GPU:

- **Field** — an `sdCircle` body plus up to four satellite circles, merged with the Inigo Quilez
  quadratic-polynomial **smooth-minimum** (`smin`) so they fuse into one gooey mass rather than
  popping together. The edge is displaced by fractal Brownian-motion (FBM) noise for the organic
  "watercolor" silhouette, and anti-aliased analytically via `fwidth(d)` so it stays ~1px crisp at
  any zoom or device-pixel ratio.
- **Color** — the base color arrives in gamma-sRGB, is lifted into **OKLCh** (the perceptually-
  uniform color space), perturbed per-pixel (a small hue/chroma/lightness swing off a second FBM
  field), hue-preservingly gamut-clamped, then emitted through the mandatory sRGB OETF. Working in
  OKLCh is why the blob's color stays in-family and never goes muddy or garish — most reference
  blobs perturb in raw sRGB/HSV and band.
- **Motion** — a deterministic, seeded satellite state machine (`orbiting → merging → absorbed →
  emerging`), a sine breathing pulse, and a smoothed pointer deformation.
- **Substrate** — it composes the shared `useWebGLCanvas` WebGL2 substrate, which owns the canvas
  lifecycle, context-loss self-healing, and the full pause machinery (offscreen, tab-hidden,
  reduced-motion). The blob never bootstraps its own GL context.

It renders on a transparent canvas, so it sits over any glass-ui surface and reads as a soft,
living, colored droplet.

---

## Use cases

- **Ambient brand accent** — a small (≈7rem) living mark in a hero, an empty state, a loading
  surface, or a dock corner. Slow, calm, on-palette.
- **AV background** — a larger continuously-running backdrop. When used this way it MUST carry a
  `DockBackgroundToggle` (or equivalent) pause control per WCAG 2.2.2 (see [Accessibility](#accessibility)).
- **Interactive toy / mascot** — a pointer-reactive creature that leans toward the cursor, squishes
  on click, and shifts mood (the conversational-state register — idle → curious → excited maps onto
  the mood model). See [Interaction model](#interaction-model).

It is **not** a data visualization and conveys no information — the canvas is decorative
(`aria-hidden="true"`).

---

## Quick start

```vue
<script setup lang="ts">
import { GooBlob, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import { defaultBlobColorResolver } from "@mkbabb/glass-ui/color";
</script>

<template>
  <!-- A calm ambient blob in the brand color. The footprint is the host box size. -->
  <div class="w-28 aspect-square">
    <GooBlob
      color="var(--primary)"
      :color-resolver="defaultBlobColorResolver"
      :config="BLOB_CONFIG_DEFAULTS"
    />
  </div>
</template>
```

The `colorResolver` and `config` are REQUIRED (a missing one throws — the loud failure). Override
configuration two ways — a `config` prop (wins), or an injected `BLOB_CONFIG_KEY` (fallback) so an
ancestor can theme every descendant blob:

```vue
<script setup lang="ts">
import { provide } from "vue";
import { GooBlob, BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import { defaultBlobColorResolver } from "@mkbabb/glass-ui/color";

provide(BLOB_CONFIG_KEY, {
  ...BLOB_CONFIG_DEFAULTS,
  satelliteCount: 4,
  smoothK: 0.08,      // gooier merge (vs the 0.05 default — still contained)
  noiseAmp: 0.045,    // more organic edge wobble
});
</script>

<template>
  <div class="w-40 aspect-square">
    <GooBlob color="oklch(0.7 0.12 48)" :color-resolver="defaultBlobColorResolver" />
  </div>
</template>
```

---

## API

### Props

The footprint is set by the **host element's CSS size** (the canvas fills its
container at 160% to give satellite orbits overflow room) — there is no `size` prop.
Wrap the blob in a sized box (`class="w-28 aspect-square"`).

| Prop      | Type                       | Default  | Notes |
|-----------|----------------------------|----------|-------|
| `color`   | `string` (CSS color)       | required | Any CSS color string — hex, `oklch(...)`, `var(--token)`. A `var(--token)` is un-wrapped to a concrete color (one cached cascade read) then resolved through the injected `colorResolver` to gamma-sRGB and lifted into OKLCh in-shader. |
| `colorResolver` | `ColorResolver`      | required | The injected color seam — resolves a concrete CSS string to a gamma-sRGB `[r,g,b]` triple. Pass `defaultBlobColorResolver` from `@mkbabb/glass-ui/color`. A missing resolver throws (loud failure, never a silent gray). |
| `config`  | `BlobConfig`               | required\* | The metaball tuning. Pass `BLOB_CONFIG_DEFAULTS` for the stock look; \*required unless an ancestor `provide(BLOB_CONFIG_KEY, …)` supplies it. |
| `seed`    | `string`                   | `""`     | Extra seed mixed into the satellite PRNG for a unique-but-reproducible system. |
| `paused`  | `boolean` (`v-model`)      | `false`  | The WCAG-2.2.2 pause state. `v-model:paused` suspends/resumes the render loop — the **declarative, structurally-un-droppable** seam a `DockBackgroundToggle` binds to (the same shape Aurora's `useAurora` wears). |
| `quality` | `"full" \| "half"`         | `"full"` | Render-quality tier. `"half"` renders the metaball pass at half backing-store resolution and bilinear-upsamples — ~4× fewer fragments on weak GPUs (the soft FBM/AA edge hides the interpolation). |

### Exposed (via `defineExpose`)

| Member        | Type                         | Notes |
|---------------|------------------------------|-------|
| `nudge()`     | `() => void`                 | Perturbs satellite phases — a discrete jiggle impulse. |
| `setMood(m)`  | `(mood: BlobMood) => void`   | Retargets the mood cross-fade (manual override; the mood also auto-drives from interaction). |
| `pulse()`     | `() => void`                 | Fires the one-shot click-squish spring impulse (the bounce) — what a click triggers, exposed for programmatic poking. |
| `pause()`     | `() => void`                 | Imperative pause — flips the **same** `v-model:paused` model (emits `update:paused`). The declarative `v-model:paused` is the recommended path; this is the imperative fallback. |
| `resume()`    | `() => void`                 | Imperative resume — the counterpart of `pause()`; flips the same model. |
| `currentMood` | `Readonly<Ref<BlobMood>>`    | The current mood. |

### Emits

| Event            | Notes |
|------------------|-------|
| `click`          | Fired on activation; also fires the one-shot click-squish spring impulse internally. |
| `update:paused`  | The `v-model:paused` write-back — emitted by the toggle / `pause()` / `resume()`; bind it (or `v-model:paused`) and wire a `DockBackgroundToggle`. |

### `BlobConfig`

The full tunable surface (`types.ts`). All fields have defaults via `BLOB_CONFIG_DEFAULTS`.

```ts
interface BlobConfig {
  // Geometry — re-derived against the CANVAS bound for a contained four-side footprint.
  canvasSize: number;         // internal canvas px fallback (default 200)
  bodyRadius: number;         // body radius, UV fraction (default 0.22)
  satelliteCount: number;     // 0–4 satellites (default 3)
  satelliteRadius: number;    // satellite radius (default 0.082)
  orbitRadius: number;        // orbit envelope (default 0.17)

  // Master tempo — ONE scalar multiplying every integrated dt (default 1.0; 0 = freeze).
  tempo: number;

  // Gooey
  smoothK: number;            // smin blend band, UV-space distance (default 0.05) — higher = gooier, too high floods
  merge: "quadratic" | "circular"; // smin variant (default "quadratic")

  // Surface noise (the organic membrane edge)
  noiseAmp: number;           // edge displacement amplitude (default 0.038)
  noiseFreq: number;          // edge noise frequency (default 3.5)
  noiseSpeed: number;         // edge noise drift speed (default 0.08)
  warpAmp: number;            // domain-warp strength on the FBM edge (default 0.35)

  // Pulsation (the breath)
  pulseFreq: number;          // breath frequency (default 0.3)
  pulseAmp: number;           // breath amplitude (default 0.008)

  // Color perturbation (OKLCh)
  hueRange: number;           // hue swing in degrees (default 5)
  satShift: number;           // OKLCh chroma swing (default 0)
  brightnessShift: number;    // OKLCh lightness bias (default 0)
  colorNoiseFreq: number;     // color-field frequency (default 2.0)
  colorNoiseSpeed: number;    // color-field drift (default 0.05)
  paletteStops: string[];     // 2–4 in-family CSS stops (default []; see deriveBlobPalette)

  // Lit warm-glass droplet — the DEFAULT identity (Blinn-Phong glint + Fresnel rim).
  lit: boolean;               // default true (the SOTA look IS the default, not a flag-gated opt-in)
  rimColor: string;           // Fresnel rim tint (default "var(--foreground)")
  lightDir: [number, number, number]; // default [0.4, 0.7, 0.6]
  specStrength: number;       // default 0.9
  specShininess: number;      // default 32
  rimPower: number;           // default 2.5
  rimStrength: number;        // default 0.5
  iridescence: number;        // warm-pearl rim sheen (default 0.18)
  iridHue: number;            // base hue degrees (default 85)
  iridSpeed: number;          // shimmer scroll (default 0.06)
  sssScale: number;           // fast-SSS back-light (default 0.2)
  sssPower: number;           // fast-SSS exponent (default 2.0)
  coreGlow: number;           // inner-luminosity lift (default 0.1)

  // Pointer interaction
  pointerAttraction: number;  // deform strength toward (>0) / away (<0) the cursor (default 0.35)
  pointerStrength: number;    // deform scale (default 0.45 — a legible lean)
  stretch: number;            // velocity squash-and-stretch magnitude (default 0.5)
  clickImpulse: number;       // click bounce amplitude (default 0.5)

  // Satellites (the orbit/merge lifecycle)
  eccentricity: number;       // orbit ellipticity (default 0.05 — near-circular, four-side contained)
  orbitSpeedScale: number;    // orbit speed multiplier (default 1.0; mood-scaled per frame)
  wobbleScale: number;        // orbit wobble multiplier (default 1.0; mood-scaled per frame)
  mergeRate: number;          // merge-frequency multiplier (default 1.0)
  mergeDuration: number;      // ms a merge takes (default 1800)
  absorbedDuration: [number, number]; // ms range absorbed (default [2000, 4000])
  emergeDuration: number;     // ms a re-emergence takes (default 2200)
  orbitDuration: [number, number];    // ms range orbiting (default [8000, 14000])
}
```

> **Mood-scaled satellites.** The mood's `orbitSpeedScale` and `wobbleScale` ARE consumed by the
> satellite tick (the `orbitPos` sweep + radial wobble read them every frame), so an excited blob
> orbits faster + wobblier and a sleepy one calmer. The config `orbitSpeedScale`/`wobbleScale` are
> the static baselines the mood multiplier rides.

> **`smoothK` distance regime.** `smoothK` is the smin blend band in the shader's UV space (the
> canvas is a `[-1, 1]` quad, half-extent 0.5). The smin is IQ-normalized (`k *= 4.0` in the
> shader) so the seam dip at a fully-overlapped seam (`a == b`) is **exactly** the uploaded `k` —
> `k` IS the maximum merge inflation in distance units. The renderer composes the uploaded value as
> `smoothK × moodMultiplier × POS_SCALE`, where `POS_SCALE = 1/1.6 = 0.625` is the inner-region
> compression **every** length-like uniform rides (body/satellite radius, pointer, noise amplitude).
> At the `0.05` default with an idle mood (multiplier ≈ 1.0) the seam-pull is ≈ 0.031 — a tight, wet
> meniscus. Raise `smoothK` for a gooier merge, but a too-large band floods the whole field
> NON-LOCALLY (the polynomial smin is non-rigid — its effect spans far past the seam), so keep it in
> the contained range (roughly ≤ 0.10 at the default radii). Mood `smoothK` is a unitless
> multiplier on this band, not a second absolute length.

---

## Interaction model

The blob is a pointer-reactive creature. Every axis below is wired and load-bearing.

- **Spring pointer-follow** — the pointer smoothing is a frame-rate-independent critically-damped
  spring (`@mkbabb/keyframes.js`, overshoot + settle = weight), driven through the substrate's single
  rAF (no parallel loop). The body leans toward the cursor, honoring the *sign* of `pointerAttraction`
  (lean-in `> 0` vs shy-away `< 0`); the default is a strong, legible lean.
- **Reach-toward pseudopod** — a short decaying-radius pointer trail of smin-merged spheres, so the
  blob stretches an elastic limb toward the cursor and snaps back (the Codrops droplet pattern),
  reusing the satellite plumbing.
- **Velocity squash-and-stretch** — a volume-preserving anisotropic UV warp ∝ |velocity| — the blob
  leans into motion and recovers (~80% of the soft-body feel, zero sim).
- **Click squish** — the `click` emit drives a one-shot underdamped spring impulse on the body radius
  (overshoot then settle); `pulse()` fires the same bounce programmatically.
- **Mood** — a 5-mood cross-fade on a `{valence, arousal}` circumplex-affect surface
  (`idle | happy | curious | sleepy | excited`) — each named mood is a point in that space and the
  per-mood parameters (orbit speed, wobble, pulse, the iridescence/SSS sheen intensity) are derived
  from it. The mood **auto-drives from interaction** (curious on approach, excited on click, sleepy
  after inactivity), with `setMood` retained for manual override.
- **Nudge** — `nudge()` perturbs the satellite phases (a discrete jiggle).

All interaction respects `prefers-reduced-motion` (the substrate freezes to a composed rest pose)
and the `v-model:paused` / `DockBackgroundToggle` pause — see [Accessibility](#accessibility). The
demand-gate quiescence parks an idle blob between satellite phase transitions; an interaction
re-arms the loop instantly (no frozen-then-jerk), so a still blob costs zero frames at rest.

---

## Best practices

- **Import from the subpath, not the root barrel** — `@mkbabb/glass-ui/goo-blob` pulls only the
  blob chunk + its leaves; it never drags in the root barrel's reach.
- **Theme via the injected config**, not by editing source — `provide(BLOB_CONFIG_KEY, …)` for a
  subtree, or a `config` prop per-instance. Named themed palettes belong in *your* app, not in the
  library (the library's defaults are its own identity).
- **Keep it calm by default** — the blob is an ambient accent. Hold `pulseAmp` small (≤ ~0.012),
  `orbitRadius` modest, and animation cycles slow (premium ambient is slow-and-breathing, not
  busy). Fast motion reads cheap and is a vestibular trigger.
- **Pause continuously-running backgrounds** — if the blob auto-runs > 5s as a non-essential
  background, wire `pause()`/`resume()` to a `DockBackgroundToggle` (WCAG 2.2.2). This is binding,
  not optional.
- **Don't stack many large blobs** — each is a fragment-shader fill-rate cost. For multiple, prefer
  small footprints; the substrate parks any blob that scrolls offscreen or whose tab is hidden, so
  off-screen blobs are free.
- **Decorative, so `aria-hidden`** — don't bolt an `aria-label` onto the canvas; it carries no
  information. If you make a blob genuinely interactive (a button), wrap it in a real
  `<button>`/`role` with a name, not the canvas.

---

## Color notes

- The blob works entirely in **OKLCh**, lifted from a gamma-sRGB base through value.js's exact
  Ottosson OKLab/OKLCh matrices, with a **hue-preserving gamut clamp** (a chroma bisection that
  shrinks saturation until in-gamut without shifting hue) and the **mandatory `linearToSrgb()`
  OETF** on output. A linear-in-without-an-OETF-out ships visibly ~2.2× too dark — the named A5/A2
  trap, machine-locked by `proof:blob-space-gamma`.
- The OETF + the four Ottosson matrices + the FBM rotation constant are **spliced from the shared
  `procedural-color.glsl.ts` chunk** that both the blob and aurora compose, so the color math can
  never diverge between the two surfaces (AV.W2). The line-for-line TS port
  (`tests/components/custom/goo-blob/metaball-color.glsl-port.ts`) + the equivalence gate
  (`proof:blob-color-equivalence`) lock it.
- **Warm-cream fit** — any highlight, rim, or sheen the blob grows should be tinted warm (toward
  `--foreground` / a warm highlight), never clinical white, so it sits in glass-ui's cream-glass
  system rather than reading as a generic cold liquid-glass bubble.
- **Seed-derived palette** — `deriveBlobPalette(seed, options)` (`@mkbabb/glass-ui/color`) takes one
  seed → 2–4 gamut-mapped OKLCh stops distributed across the body + satellites, parallel to aurora's
  `deriveAurora` and sharing one hoisted `ColorHarmony` vocabulary (no second divergent deriver).
  Pass the stops as `config.paletteStops` (empty falls back to the single `color` base). The
  **iridescence** (a warm-biased Inigo Quilez cosine palette driven by the Fresnel/edge angle —
  *subtle*, not maximal rainbow) and a thickness-from-`-d` **fake-subsurface inner glow** ship as the
  default-lit identity, with an interleaved-gradient-noise dither killing the warm-cream banding.

---

## Performance notes

- **Fill-rate is the cost, and it is quadratic in device-pixel ratio.** The substrate clamps DPR at
  2×; Retina is already 4× the fragment work, so the clamp is load-bearing. The fragment runs FBM
  (3 octaves) twice per pixel plus a full OKLCh round-trip — keep the footprint modest.
- **The substrate parks aggressively** — offscreen (intersection + `content-visibility`),
  tab-backgrounded (`document.hidden`), and under `prefers-reduced-motion` (one static frame then
  park). An off-screen or hidden blob attaches zero frames; you pay only for visible, in-motion
  blobs.
- **Demand-gate quiescence (the biggest onscreen lever).** Beyond the offscreen park, an ONSCREEN
  IDLE blob also parks: when the mood is settled AND the pointer spring is at rest AND the trail is
  collapsed AND the click pulse is zero AND no satellite is mid-merge, the loop holds the pose and
  renders ZERO frames between satellite phase transitions. The satellite phase scheduler wakes it for
  the next merge/emerge edge, and any interaction (hover/click) re-arms it instantly — so a still
  ambient blob is nearly free, with no frozen-then-jerk artefact.
- **`quality: "full" | "half"`.** Set `quality="half"` to render the metaball pass at HALF the
  backing-store resolution and let the canvas bilinear-upsample to its display box — ~4× fewer
  fragments (fill-rate is quadratic in resolution), the soft FBM/AA edge hiding the interpolation
  (the blob is the ideal candidate). A pre-FBM bounding early-out also skips the ~60% transparent
  border of the oversized canvas before the two FBM evals + the OKLCh round-trip. The
  lighting/iridescence terms are per-pixel ALU on the already-running fragment — no new pass, no new rAF.
- **No WebGPU, no particle migration (research-backed non-goals).** A flat 2D screen-space SDF beats
  raymarching for a flat UI droplet on every axis (flat `O(W·H·N)` cost, zero overdraw, no
  per-fragment step loop, resolution-independent `fwidth` AA). WebGPU compute is a NET LOSS at ≤4
  nuclei — compute beats a fragment field only for hundreds-to-thousands of balls or 3D marching
  cubes; our blob is body + ≤3 satellites + ≤15 trail + ≤4 stops, CPU-simulated, uploaded as ~12
  uniforms, so a compute pre-pass adds a buffer round-trip + sync barrier with zero field-eval
  savings. A decorative background also cannot carry a hard WebGPU dependency (Baseline-2026 "newly
  available"); if ever adopted it is a substrate-wide decision (aurora's WGSL path), never blob-local.

---

## Accessibility

- **Decorative canvas** — `aria-hidden="true"`; no accessible-name obligation (the blob conveys no
  information).
- **`prefers-reduced-motion`** — the `useWebGLCanvas` substrate *live-monitors* PRM (a `matchMedia`
  `change` listener) and paints one static frame then parks under reduce — every surface inherits
  the freeze, and a CSS reset cannot reach the WebGL rAF, so the substrate owns it. Any interaction
  must collapse to instant/no-op under reduce and hook the *same* gate (no parallel motion path).
- **WCAG 2.2.2 (Pause, Stop, Hide)** — a continuously-running, auto-starting, > 5s, non-essential
  blob background MUST carry a user-reachable pause control, available to **all** users (not gated
  behind PRM — that is the distinct 2.3.3 interaction-motion concern the substrate handles). Bind
  `v-model:paused` to a `DockBackgroundToggle` (the recommended declarative seam; `pause()`/`resume()`
  are the imperative fallback). The toggle is a real `<button>` + accessible name + `aria-pressed`,
  never an `aria-label` on the decorative canvas.
- **Composed reduced-motion rest pose** — under PRM the static frame is a *designed* poster, not a
  random freeze: only the TIME-driven inputs are zeroed (the spring snaps to centre with zero
  velocity, the trail collapses, the pulse zeroes), while the lit dome / Fresnel / iridescence are
  static per-pixel shading on a still field and paint correctly frozen (a flat gray poster would be a
  regression). The substrate owns the one-static-frame-then-park and the live re-monitor.

---

## Examples

All examples assume `:color-resolver="defaultBlobColorResolver"` and a sized host box (omitted for
brevity); set the footprint on the wrapper (`class="w-32 aspect-square"`).

**A gooier, livelier blob** with four satellites:

```vue
<GooBlob
  color="oklch(0.68 0.13 30)"
  :color-resolver="defaultBlobColorResolver"
  :config="{
    ...BLOB_CONFIG_DEFAULTS,
    satelliteCount: 4,
    smoothK: 0.08,
    noiseAmp: 0.045,
    pulseFreq: 0.5,
    pulseAmp: 0.012,
  }"
/>
```

**As a pausable AV background**, wired to a dock toggle — the `v-model:paused` double-bind is the
whole seam (no imperative bridge):

```vue
<script setup lang="ts">
import { ref } from "vue";
import { GooBlob, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import { DockBackgroundToggle } from "@mkbabb/glass-ui/dock";
import { defaultBlobColorResolver } from "@mkbabb/glass-ui/color";

const paused = ref(false);
</script>

<template>
  <GooBlob
    v-model:paused="paused"
    color="var(--primary)"
    :color-resolver="defaultBlobColorResolver"
    :config="BLOB_CONFIG_DEFAULTS"
  />
  <DockBackgroundToggle v-model:paused="paused" />
</template>
```

**A weak-GPU half-res blob** — `quality="half"` cuts the fragment count ~4×:

```vue
<GooBlob
  color="var(--primary)"
  :color-resolver="defaultBlobColorResolver"
  :config="BLOB_CONFIG_DEFAULTS"
  quality="half"
/>
```

---

## Architecture

```
goo-blob/
├── GooBlob.vue              # the component shell — props, v-model:paused, resolver injection, expose, wrapper shadow
├── types.ts                 # BlobConfig, BlobMood, BlobQuality, MoodParams, MetaballSource, BLOB_CONFIG_KEY/DEFAULTS
├── shaders/
│   ├── metaball.vert.ts     # full-quad vertex
│   ├── metaball.frag.ts     # the fragment assembler (spliced from the partials below); pre-FBM bounding early-out
│   ├── sdf-body.glsl.ts     # sdCircle + smin + the analytic SDF gradient (sceneDistG)
│   ├── watercolor-edges.glsl.ts  # the domain-warped FBM that displaces the edge
│   └── oklch-perturb.glsl.ts     # inGamut + hue-preserving gamutClampOklch
└── composables/
    ├── useMetaballRenderer.ts   # composes useWebGLCanvas; shader compile, uniform upload, quiescence + quality
    ├── useBlobSatellites.ts     # the orbit/merge/absorb/emerge state machine (seeded, deterministic) + phase scheduler
    ├── useBlobMood.ts           # the {valence, arousal} 5-mood cross-fade engine + the settled() at-rest seam
    ├── useBlobPointer.ts        # pointer → [-1,1] critically-damped spring + trail + click impulse + atRest()
    └── easing.ts                # easeInOut helpers
```

The `var(--token)` un-wrap is the shared `createTokenColorResolver` leaf
(`@mkbabb/glass-ui` `composables/dom`), so `getComputedStyle` appears exactly once — the SFC
un-wraps every color before handing concrete strings to the DOM-free renderer.

The fragment shader is **composed from cohesive partials** spliced into one source string at module
load — the emitted shader is character-equivalent to a hand-inlined version. The OETF + Ottosson
matrices + FBM rotation are spliced from the shared `procedural-color.glsl.ts` so they can never
diverge from aurora's.

---

## References

All accessed 2026-06-08.

- Inigo Quilez — [Smooth Minimum](https://iquilezles.org/articles/smin/) (the `smin` merge; the 2024
  rewrite adds normalization + the `vec2` material-blend variant), [Distance + Gradient functions
  2D](https://iquilezles.org/articles/distgradfunctions2d/) (the SDF gradient = free fake normal),
  [Domain Warping](https://iquilezles.org/articles/warp/), [Procedural Color
  Palettes](https://iquilezles.org/articles/palettes/) (the cosine palette for iridescence).
- Björn Ottosson — [Oklab](https://bottosson.github.io/posts/oklab/) (the perceptual color space +
  the gamut-clipping the blob's clamp follows).
- Codrops — [Interactive droplet-like metaballs with Three.js and GLSL](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
  (Yuki Kojima, 2025-06-09 — the canonical premium-metaball reference: SDF normals, pointer trail,
  glass tone-crush).
- imadrahmoune — [How Apple's Liquid Glass probably works](https://imadrahmoune.com/liquid-glass/)
  (the 2D-SDF fake normal + Fresnel rim + refraction grammar).
- Alan Zucconi — [Fast Subsurface Scattering in Unity](https://www.alanzucconi.com/2017/08/30/fast-subsurface-scattering-1/)
  (the fake-SSS back-light term).
- Khronos — [PBR Neutral Tone Mapper](https://www.khronos.org/news/press/khronos-pbr-neutral-tone-mapper-released-for-true-to-life-color-rendering-of-3d-products)
  (2024 — the LDR brand-color tonemap, vs ACES/AgX which desaturate).
- frost.kiwi — [How to fix color banding](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/)
  (the interleaved-gradient-noise dither).
- Josh Comeau — [Spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/),
  [Squash and Stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/).
- *Velocity Skinning for Real-time Stylized Skeletal Animation* — [arXiv:2104.04934](https://arxiv.org/pdf/2104.04934)
  (the velocity → anisotropic squash/stretch).
- WebGPU Baseline — [web.dev, WebGPU supported in all major browsers](https://web.dev/blog/webgpu-supported-major-browsers)
  (2025-11-25 — all four engines as of 2025-11-25; "Baseline 2026", newly-available not yet widely-available).
- WCAG — [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html),
  [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html);
  MDN — [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
- Microsoft Copilot "Mico" — the conversational-state affordance register (idle → listening →
  thinking → responding) that maps onto the mood model.
- R3F `frameloop="demand"` / `invalidate()` — the event-scheduled render-on-demand model the
  quiescence gate follows.
