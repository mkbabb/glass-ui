# GooBlob

A WebGL2 metaball "creature" — a pulsing, organic, gooey SDF body with up to four orbiting
satellites that merge in, get absorbed, and re-emerge, painted with a perceptually-uniform OKLCh
color perturbation over glass-ui's warm-cream glass identity. It is the WebGL sibling of
[`WatercolorDot`](../watercolor-dot/) (the CSS/SVG dot): the goo-blob is the continuously-animated,
per-pixel-shaded metaball; the watercolor-dot is the cheap static dot. They are deliberate
siblings, not redundant.

> Research-backed. This README documents the blob as it ships and as the AW perfection plan
> (`docs/tranches/AW/blob/PATH-FORWARD.md`) targets it. Sections marked **(planned — AW)** describe
> in-flight work and the SOTA technique behind it, cited with access dates. The three formal blob
> waves are **W9 — Droplet Surface** (lit glass: normalized + circular smin, SDF-gradient normal,
> warm-cream specular + Fresnel rim, analytic-derivative gradient noise, domain-warped edge),
> **W10 — Interaction** (critically-damped spring pointer, the decaying-radius elastic trail,
> velocity squash-and-stretch, the reduced-motion composed rest pose), and **W11 — Mood,
> Iridescence and Palette** (warm-biased iridescence + fake-SSS depth, the seed-driven OKLCh
> palette, the wire-or-cut mood resolution) — specced under `docs/tranches/AW/waves/`.

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
  on click, and shifts mood. (The interaction model ships partly wired today; the AW waves complete
  it — see [Interaction model](#interaction-model).)

It is **not** a data visualization and conveys no information — the canvas is decorative
(`aria-hidden="true"`).

---

## Quick start

```vue
<script setup lang="ts">
import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
</script>

<template>
  <!-- A calm ambient blob in the brand color -->
  <GooBlob color="var(--primary)" :size="112" />
</template>
```

Override configuration two ways — a `config` prop (wins), or an injected `BLOB_CONFIG_KEY`
(fallback) so an ancestor can theme every descendant blob:

```vue
<script setup lang="ts">
import { provide } from "vue";
import { GooBlob, BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";

provide(BLOB_CONFIG_KEY, {
  ...BLOB_CONFIG_DEFAULTS,
  satelliteCount: 4,
  smoothK: 0.08,      // gooier merge (vs the 0.05 default — still contained)
  noiseAmp: 0.035,    // more organic edge wobble
});
</script>

<template>
  <GooBlob color="oklch(0.7 0.12 48)" :size="160" />
</template>
```

---

## API

### Props

| Prop     | Type                  | Default | Notes |
|----------|-----------------------|---------|-------|
| `color`  | `string` (CSS color)  | brand   | Any CSS color string — hex, `oklch(...)`, `var(--token)`. Resolved through the injected `ColorResolver` seam to gamma-sRGB, then lifted into OKLCh in-shader. |
| `size`   | `number` (px)         | —       | The rendered footprint; the canvas is internally oversized to give satellite orbits overflow room. |
| `config` | `Partial<BlobConfig>` | —       | Overrides specific fields; takes precedence over an injected `BLOB_CONFIG_KEY`. |

### Exposed (via `defineExpose`)

| Member        | Type                         | Notes |
|---------------|------------------------------|-------|
| `nudge()`     | `() => void`                 | Perturbs satellite phases — a discrete jiggle impulse. |
| `setMood(m)`  | `(mood: BlobMood) => void`   | Retargets the mood cross-fade. (See [Interaction model](#interaction-model) — wiring is completed in AW.) |
| `currentMood` | `Readonly<Ref<BlobMood>>`    | The current mood. |
| `pause()` / `resume()` | `() => void`        | Stops/starts the render loop — the seam a `DockBackgroundToggle` wires to. |

### Emits

| Event   | Notes |
|---------|-------|
| `click` | Fired on activation. (AW wires this to a click-squish impulse internally; consumers may also handle it.) |

### `BlobConfig`

The full tunable surface (`types.ts`). All fields have defaults via `BLOB_CONFIG_DEFAULTS`.

```ts
interface BlobConfig {
  // Geometry
  canvasSize: number;         // internal canvas px (default 200)
  bodyRadius: number;         // body radius, fraction of canvas (default 0.25)
  satelliteCount: number;     // 0–4 satellites (default 3)
  satelliteRadius: number;    // satellite radius (default 0.13)
  orbitRadius: number;        // orbit envelope (default 0.35)

  // Gooey
  smoothK: number;            // smin blend band, UV-space distance (default 0.05) — higher = gooier merge, but too high floods

  // Surface noise (the organic edge)
  noiseAmp: number;           // edge displacement amplitude (default 0.025)
  noiseFreq: number;          // edge noise frequency (default 3.5)
  noiseSpeed: number;         // edge noise drift speed (default 0.08)

  // Pulsation (the breath)
  pulseFreq: number;          // breath frequency (default 0.3)
  pulseAmp: number;           // breath amplitude (default 0.008)

  // Color perturbation (OKLCh)
  hueRange: number;           // hue swing in degrees (default 5)
  satShift: number;           // OKLCh chroma swing (default 0)
  brightnessShift: number;    // OKLCh lightness bias (default 0)
  colorNoiseFreq: number;     // color-field frequency (default 2.0)
  colorNoiseSpeed: number;    // color-field drift (default 0.05)

  // Pointer
  pointerAttraction: number;  // deform strength toward (>0) / away (<0) the cursor (default 0.0)
  pointerStrength: number;    // deform scale (default 0.08)

  // Satellites (the orbit/merge lifecycle)
  eccentricity: number;       // orbit ellipticity (default 0.25)
  orbitSpeedScale: number;    // orbit speed multiplier (default 1.0)
  wobbleScale: number;        // orbit wobble multiplier (default 1.0)
  mergeRate: number;          // merge-frequency multiplier (default 1.0)
  mergeDuration: number;      // ms a merge takes (default 1800)
  absorbedDuration: [number, number]; // ms range absorbed (default [2000, 4000])
  emergeDuration: number;     // ms a re-emergence takes (default 2200)
  orbitDuration: [number, number];    // ms range orbiting (default [8000, 14000])
}
```

> **Note (AW):** today `orbitSpeedScale` and `wobbleScale` are present in `MoodParams` but not
> consumed by the satellite tick — the AW mood wave either wires them or the config simplifies to
> grouped sub-objects + an `energy` scalar. Treat their per-mood values as not-yet-load-bearing
> until that wave lands.

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

The blob is built to be a pointer-reactive creature. The vocabulary exists; the wiring completes
in the AW tranche.

**Today:**

- **Pointer deform** — when `pointerAttraction != 0` and the pointer is over the blob, the body
  deforms toward (or away from) the cursor. The default is `0.0`, so an out-of-the-box blob is
  inert to the pointer — set `pointerAttraction` to feel it.
- **Mood** — a 5-mood cross-fade engine (`idle | happy | curious | sleepy | excited`), each a
  valence/arousal-shaped parameter set, exposed via `setMood`.
- **Nudge / click** — `nudge()` jiggles the satellites; `click` is emitted.

**Planned (AW.W10 — Interaction; AW.W11 — Mood):**

- **At-rest pointer-follow** (W10) — a small default attraction so hover always deforms the blob,
  with the *sign* of `pointerAttraction` honored (lean-in vs shy-away).
- **Reach-toward droplet** (W10) — a short decaying-radius pointer trail of smin-merged spheres, so
  the blob stretches an elastic pseudopod toward the cursor and snaps back (the Codrops droplet
  pattern), reusing the satellite plumbing.
- **Click squish** (W10) — the `click` emit drives a one-shot spring impulse (overshoot then settle).
- **Spring pointer** (W10) — the pointer smoothing becomes a frame-rate-independent critically-damped
  spring (overshoot + settle = weight), via `@mkbabb/keyframes.js`.
- **Velocity squash-and-stretch** (W10) — a volume-preserving anisotropic UV warp ∝ |velocity| —
  the blob leans into motion and recovers (~80% of the soft-body feel, zero sim).
- **Mood from state** (W11) — moods are driven internally from pointer/idle state (curious on
  approach, excited on click, sleepy after inactivity), with `setMood` retained for manual override;
  the today-dead `orbitSpeedScale`/`wobbleScale` are wired or the model collapses to one `energy`
  scalar (wire-or-cut, no orphaned substrate).

All interaction respects `prefers-reduced-motion` and the `DockBackgroundToggle` pause — see
[Accessibility](#accessibility).

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
- **(Planned — AW.W11)** A `deriveBlobPalette(seed, options)` front door — one seed → 2–4
  gamut-mapped OKLCh stops distributed across the body + satellites — parallel to aurora's
  `deriveAurora`, sharing one hoisted `ColorHarmony` vocabulary (no second divergent deriver); plus
  iridescence (a warm-biased Inigo Quilez cosine palette driven by the W9 Fresnel/edge angle —
  *subtle*, not maximal rainbow) and a thickness-from-`-d` fake-subsurface inner glow. An IGN dither
  to kill the warm-cream banding (the same dither aurora already ships) lands alongside the W9
  surface finish.

---

## Performance notes

- **Fill-rate is the cost, and it is quadratic in device-pixel ratio.** The substrate clamps DPR at
  2×; Retina is already 4× the fragment work, so the clamp is load-bearing. The fragment runs FBM
  (3 octaves) twice per pixel plus a full OKLCh round-trip — keep the footprint modest.
- **The substrate parks aggressively** — offscreen (intersection + `content-visibility`),
  tab-backgrounded (`document.hidden`), and under `prefers-reduced-motion` (one static frame then
  park). An off-screen or hidden blob attaches zero frames; you pay only for visible, in-motion
  blobs.
- **(Planned — AW)** A `quality: "full" | "half"` axis — render the metaball pass at half internal
  resolution and bilinear-upsample (blobs are the ideal candidate; the soft FBM edge hides the
  interpolation) for ~4× fragment savings on weak GPUs, plus a trim of the internal oversize margin
  to stop paying FBM cost on transparent border pixels. The new lighting/iridescence terms are
  per-pixel ALU on the already-running fragment — no new pass, no new rAF.
- **No WebGPU, no particle migration.** With ≤4 nuclei there is no accumulation bottleneck;
  single-pass WebGL2 SDF is the SOTA-correct architecture for this body count. WebGPU is a
  documented substrate-wide non-goal (revisit only if a consumer needs ≥ ~1k simulated bodies).

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
  behind PRM). Wire `pause()`/`resume()` to a `DockBackgroundToggle`.
- **(Planned — AW)** The reduced-motion static frame becomes a *composed* rest pose (peak roundness,
  satellites at a designed arrangement) — a deliberate poster, not a random freeze.

---

## Examples

**A pointer-reactive accent** (feel the deform):

```vue
<GooBlob
  color="var(--primary)"
  :size="128"
  :config="{ pointerAttraction: 0.5, smoothK: 0.06 }"
/>
```

**A gooier, livelier blob** with four satellites:

```vue
<GooBlob
  color="oklch(0.68 0.13 30)"
  :size="180"
  :config="{
    satelliteCount: 4,
    smoothK: 0.09,
    noiseAmp: 0.04,
    pulseFreq: 0.5,
    pulseAmp: 0.012,
  }"
/>
```

**As a pausable AV background**, wired to a dock toggle:

```vue
<script setup lang="ts">
import { ref } from "vue";
import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
import { DockBackgroundToggle } from "@mkbabb/glass-ui/dock";

const blob = ref<InstanceType<typeof GooBlob>>();
const paused = ref(false);
function onPaused(v: boolean) {
  v ? blob.value?.pause() : blob.value?.resume();
}
</script>

<template>
  <GooBlob ref="blob" color="var(--primary)" :size="320" />
  <DockBackgroundToggle v-model:paused="paused" @update:paused="onPaused" />
</template>
```

---

## Architecture

```
goo-blob/
├── GooBlob.vue              # the component shell — props, resolver injection, expose, wrapper shadow
├── types.ts                 # BlobConfig, MoodParams, MetaballSource, BLOB_CONFIG_KEY/DEFAULTS
├── shaders/
│   ├── metaball.vert.ts     # full-quad vertex
│   ├── metaball.frag.ts     # the fragment assembler (spliced from the partials below)
│   ├── sdf-body.glsl.ts     # sdCircle + smin (the merge field)
│   ├── watercolor-edges.glsl.ts  # the FBM that displaces the edge
│   └── oklch-perturb.glsl.ts     # inGamut + hue-preserving gamutClampOklch
└── composables/
    ├── useMetaballRenderer.ts   # composes useWebGLCanvas; shader compile, uniform upload, color cache
    ├── useBlobSatellites.ts     # the orbit/merge/absorb/emerge state machine (seeded, deterministic)
    ├── useBlobMood.ts           # the 5-mood cross-fade engine
    ├── useBlobPointer.ts        # pointer → [-1,1], smoothed
    └── easing.ts                # easeInOut helpers
```

The fragment shader is **composed from cohesive partials** spliced into one source string at module
load — the emitted shader is character-equivalent to a hand-inlined version. The OETF + Ottosson
matrices + FBM rotation are spliced from the shared `procedural-color.glsl.ts` so they can never
diverge from aurora's.

---

## References

All accessed 2026-06-06.

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

The full SOTA path-forward + the AW wave specs live at `docs/tranches/AW/blob/PATH-FORWARD.md` and
`docs/tranches/AW/blob/wave-seeds.md`.
