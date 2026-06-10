# GooBlob

A WebGL2 metaball "creature" for Vue 3.5 — a lit, pulsing, gooey SDF droplet with up to four
orbiting satellites that merge in, get absorbed, and re-emerge, painted with a perceptually-uniform
OKLCh color perturbation over glass-ui's warm-cream glass identity. It is the WebGL sibling of
[`WatercolorDot`](../watercolor-dot/) (the CSS/SVG dot): the goo-blob is the continuously-animated,
per-pixel-shaded metaball; the watercolor-dot is the cheap static dot. They are deliberate siblings,
not redundant — reach for the dot for the ambient/static register, the blob for the interactive/lit
hero.

## Install

```bash
npm install @mkbabb/glass-ui
```

`@mkbabb/value.js` and `@mkbabb/keyframes.js` are peer dependencies (the OKLCh color core
and the pointer spring). Import the blob from its subpath:

```ts
import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
```

## Usage

```vue
<script setup lang="ts">
import { GooBlob, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
</script>

<template>
  <!-- A calm, lit, ambient brand mark — the warm-cream living bead the defaults paint -->
  <GooBlob
    color="var(--card)"
    :config="BLOB_CONFIG_DEFAULTS"
    class="w-28"
  />
</template>
```

`config` is required unless an ancestor `provide(BLOB_CONFIG_KEY, …)` supplies it (a mount
with neither throws — there is no silent defaults synthesis). Color is resolved INTERNALLY
through the `/color` leaf (`cssToOklch → oklchToGammaRgb`) — no injected resolver prop (the
speculative DI was stripped at W-BLOB3; see `docs/consumer-evidence/goo-blob.md`). Pass
`BLOB_CONFIG_DEFAULTS` for the stock lit warm-cream droplet — the
defaults carry a light warm-cream OKLCh `color.paletteStops` ramp, so a bare mount paints the
cream bead WITHOUT a per-instance `color`; `color` is only the single-stop fallback. Pass an
explicit `color` (e.g. `var(--primary)`) for the dark per-instance opt-in.

## Documentation

The longer reference below documents what it is, the API surface, the interaction model, performance,
and accessibility.

---

## What it is

The blob is a **single-pass WebGL2 signed-distance-field (SDF) metaball**, not an SVG goo-filter and
not a CPU marching-squares contour. Each fragment evaluates the field directly on the GPU:

- **Field** — an `sdCircle` body plus up to four satellite circles, merged with the Inigo Quilez
  normalized **smooth-minimum** (`smin`) so they fuse into one gooey mass rather than popping
  together. The edge is displaced by domain-warped fractal Brownian-motion (FBM) noise for the
  organic "watercolor" silhouette, and anti-aliased analytically via `fwidth(d)` so it stays ~1px
  crisp at any zoom or device-pixel ratio. The composite SDF carries its **analytic gradient**, so
  the surface normal reads the field gradient directly — the per-pixel 4-tap finite-difference normal
  is gone.
- **Lit droplet (the default)** — the body reads as a **calm lit warm-cream bead**: the load-bearing
  cue is the curved-rim Fresnel (it defines the silhouette) plus a **contained warm catch-light** —
  the energy-conserving Blinn-Phong glint is re-derived sub-unity and clamped before the OETF so it is
  a soft gleam defining the dome curvature, never a blown white spot. The warm-pearl iridescent sheen
  (an Inigo Quilez cosine palette biased to the warm arc), the fast-subsurface back-light, and the
  Beer-Lambert inner glow are **whispers** — felt, not seen (one perceptual cue, not a five-layer
  over-described surface). A foreground-aware min-contrast rim guard keeps the curved rim legible even
  when a `var(--primary)` blob in dark mode resolves a rim near the body color. A consumer who wants the
  glossier look raises `specStrength` / `iridescence` via the config seam.
- **Color** — the base color arrives in gamma-sRGB, is lifted into **OKLCh** (the perceptually-uniform
  color space), perturbed per-pixel (a small hue/chroma/lightness swing off a second FBM field),
  hue-preservingly gamut-clamped, then emitted through the mandatory sRGB OETF, with an
  interleaved-gradient-noise dither to kill warm-cream banding. Working in OKLCh is why the blob's
  color stays in-family and never goes muddy or garish.
- **Motion** — a deterministic, seeded satellite state machine (`orbiting → merging → absorbed →
  emerging`), a de-synced breathing pulse (three detuned sines so it never re-phases like a
  metronome), and a critically-damped spring pointer deformation with a velocity squash-and-stretch
  and an elastic pseudopod trail.
- **Substrate** — it composes the shared `useWebGLCanvas` WebGL2 substrate, which owns the canvas
  lifecycle, context-loss self-healing, and the full pause machinery (offscreen, tab-hidden,
  reduced-motion). The blob never bootstraps its own GL context.

It renders on a transparent canvas, contained on all four sides of its layout footprint (only the
orbiting satellites peek the edge), so it sits over any glass-ui surface and reads as a soft, living,
colored droplet.

---

## Use cases

- **Ambient brand accent** — a small (≈7rem) living mark in a hero, an empty state, a loading surface,
  or a dock corner. Slow, calm, on-palette. The idle blob **quiesces** (parks its render loop between
  satellite phase transitions), so an ambient mark is nearly free at rest.
- **AV background** — a larger continuously-running backdrop. When used this way it MUST carry a
  `DockBackgroundToggle` (or equivalent) pause control per WCAG 2.2.2 (see [Accessibility](#accessibility)).
- **Interactive toy / mascot** — a pointer-reactive creature that leans toward the cursor, squishes on
  click, and shifts mood (idle → curious on hover → excited on click → sleepy after inactivity), the
  conversational-state affordance register (idle → listening → thinking → responding) modern assistant
  marks wear.

It is **not** a data visualization and conveys no information — the canvas is decorative
(`aria-hidden="true"`).

---

## API

### Props

| Prop            | Type                  | Default | Notes |
|-----------------|-----------------------|---------|-------|
| `color`         | `string` (CSS color)  | —       | REQUIRED. Any CSS color string — hex, `oklch(...)`, `var(--token)`. A `var(--token)` is un-wrapped to a concrete `rgb(...)` then resolved INTERNALLY through the `/color` leaf to a gamma-sRGB triple (re-resolved on a dark-mode flip). |
| `config`        | `BlobConfig`          | —       | The metaball tuning. REQUIRED unless an ancestor `provide(BLOB_CONFIG_KEY, …)` supplies it. Pass `BLOB_CONFIG_DEFAULTS` for the stock look. |
| `seed`          | `string`              | `""`    | Extra seed mixed into the satellite PRNG for a unique-but-reproducible system. |
| `paused`        | `boolean`             | `false` | `v-model:paused` — the declarative WCAG-2.2.2 pause seam. `true` parks the render loop, `false` restarts it. Wire a `<DockBackgroundToggle>`'s `v-model:paused` straight to it. |

### Exposed (via `defineExpose`)

| Member        | Type                       | Notes |
|---------------|----------------------------|-------|
| `nudge()`     | `() => void`               | Perturbs satellite phases — a discrete jiggle impulse. |
| `setMood(m)`  | `(mood: BlobMood) => void` | Retargets the mood cross-fade (`idle \| happy \| curious \| sleepy \| excited`). **AUTHORITATIVE** — a manual `setMood` PINS the mood above the autonomic arc (it is not clobbered back to idle), and the pin holds until a fresh live interaction (a hover/click over the canvas) hands control back to the auto-arc. |
| `pulse()`     | `() => void`               | Fires the one-shot click spring impulse (the bounce) — the same impulse a click fires. |
| `currentMood` | `Readonly<Ref<BlobMood>>`  | The current mood. |
| `pause()`     | `() => void`               | Parks the render loop — the imperative half of the WCAG-2.2.2 seam (the `v-model:paused` prop is the declarative half; both bind the same substrate suspend). |
| `resume()`    | `() => void`               | Restarts the render loop. |

### Emits

| Event            | Notes |
|------------------|-------|
| `click`          | Fired on activation (also fires the click-squish impulse internally). |
| `update:paused`  | The `v-model:paused` companion (emitted by a control bound to `paused`). |

### `BlobConfig`

The tunable surface (`types.ts`) is EIGHT cohesive atoms — every length/weight/duration lives
behind the atom it belongs to (the "simplify the options set to atoms" discipline; the variant IS
the bundle). All fields are concrete with defaults via `BLOB_CONFIG_DEFAULTS`.

```ts
interface BlobConfig {
  // Body / orbit / satellite geometry (the contained, lit droplet)
  geometry: {
    canvasSize: number;       // internal canvas px fallback (default 200)
    bodyRadius: number;       // body radius, UV fraction (default 0.22)
    satelliteCount: number;   // 0–4 satellites (default 3)
    satelliteRadius: number;  // satellite radius (default 0.082)
    orbitRadius: number;      // orbit envelope (default 0.17)
    eccentricity: number;     // orbit ellipticity (default 0.05)
  };

  // Satellite merge/absorb/emerge/orbit lifecycle DURATIONS (ms)
  satellites: {
    mergeDuration: number;    // ms a merge takes (default 1800)
    absorbedDuration: [number, number]; // ms range absorbed (default [2000, 4000])
    emergeDuration: number;   // ms a re-emergence takes (default 2200)
    orbitDuration: [number, number];    // ms range orbiting (default [8000, 14000])
  };

  // The living membrane — smin merge + surface noise/warp + pulsation
  membrane: {
    smoothK: number;          // smin blend band, UV-space distance (default 0.05)
    merge: "quadratic" | "circular";  // smin variant (default "quadratic")
    noiseAmp: number;         // edge displacement amplitude (default 0.038)
    noiseFreq: number;        // edge noise frequency (default 3.5)
    noiseSpeed: number;       // edge noise drift speed (default 0.08)
    warpAmp: number;          // domain-warp strength on the FBM edge (default 0.35)
    pulseFreq: number;        // breath frequency (default 0.3)
    pulseAmp: number;         // breath amplitude (default 0.008)
  };

  // Palette + OKLCh color-perturbation
  color: {
    // The light warm-cream DEFAULT ramp — a bare mount paints the cream bead off these
    // stops (default ["#b5947f","#d4b27d","#dad6b1"], OKLCh ramp mean L≈0.78). Derive your
    // own via deriveBlobPalette(seed, { harmony }).
    paletteStops: string[];
    hueRange: number;         // hue swing in degrees (default 5)
    satShift: number;         // OKLCh chroma swing (default 0)
    brightnessShift: number;  // OKLCh lightness bias (default 0)
    colorNoiseFreq: number;   // color-field frequency (default 2.0)
    colorNoiseSpeed: number;  // color-field drift (default 0.05)
  };

  // The lit-glass surface — glint + Fresnel rim + iridescence/SSS/core-glow
  surface: {
    lit: boolean;             // (default true)
    rimColor: string;         // Fresnel rim tint (resolved via the `/color` leaf) — a warm
                              // MID-TONE that defines the silhouette curve on the light cream
                              // body (default "#8c694e", oklch(0.55 0.06 60))
    lightDir: [number, number, number];  // light direction (default [0.4, 0.7, 0.6])
    specStrength: number;     // energy-conserving glint weight, re-derived sub-unity (default 0.16)
    specShininess: number;    // specular exponent — a soft broad lobe (default 20)
    rimPower: number;         // Fresnel/Schlick exponent (default 2.5)
    rimStrength: number;      // (default 0.32)
    iridescence: number;      // warm-pearl rim sheen weight (default 0.09)
    iridHue: number;          // base hue degrees the warm cosine palette centres on (default 85)
    iridSpeed: number;        // animated-thickness scroll speed (default 0.06)
    sssScale: number;         // fast-SSS back-light weight (default 0.1)
    sssPower: number;         // fast-SSS exponent (default 2.0)
    coreGlow: number;         // thickness-driven inner-luminosity lift (default 0.06)
  };

  // Pointer interaction (a gentle "the creature notices you" lean, not a lurch)
  interaction: {
    pointerAttraction: number;  // deform strength toward (>0) / away (<0) the cursor (default 0.35)
    pointerStrength: number;    // deform scale — a calm lean (default 0.18)
    stretch: number;            // velocity squash-and-stretch, tanh-saturated in-shader (default 0.5)
    clickImpulse: number;       // click spring-impulse amplitude (default 0.5)
  };

  quality: "full" | "half";   // render quality (default "full"); "half" = half-res backing store
  tempo: number;              // ONE scalar multiplying every integrated dt (default 1.0; 0 = freeze)
}
```

> **`smoothK` distance regime.** `smoothK` is the smin blend band in the shader's UV space (the canvas
> is a `[-1, 1]` quad, half-extent 0.5). The smin is IQ-normalized (`k *= 4.0` in the shader) so the
> seam dip at a fully-overlapped seam (`a == b`) is **exactly** the uploaded `k`. The renderer composes
> the uploaded value as `smoothK × moodMultiplier × POS_SCALE`, where `POS_SCALE = 1/1.6 = 0.625` is
> the inner-region compression **every** length-like uniform rides (body/satellite radius, pointer,
> noise amplitude). At the `0.05` default with an idle mood the seam-pull is ≈ 0.031 — a tight, wet
> meniscus. Raise `smoothK` for a gooier merge, but a too-large band floods the whole field NON-LOCALLY
> (the polynomial smin is non-rigid), so keep it in the contained range (roughly ≤ 0.10 at the default
> radii). Mood `smoothK` is a unitless multiplier on this band, not a second absolute length.

---

## Interaction model

The blob is a pointer-reactive creature; the interaction ships wired (it is no longer "planned"):

- **Pointer-follow + lean** — the body deforms toward (or, for negative `pointerAttraction`, away from)
  the cursor via a frame-rate-independent critically-damped spring (`@mkbabb/keyframes.js`). The
  default `pointerAttraction` is non-zero, so an out-of-the-box blob leans on hover — a **gentle "the
  creature notices you" lean**, not a lurch (the default `pointerStrength` is calm).
- **Reach-toward droplet** — a short decaying-radius pointer trail of smin-merged spheres, so the blob
  stretches an elastic pseudopod toward the cursor and snaps back.
- **Click squish** — the `click` emit + `pulse()` drive a one-shot spring impulse (overshoot then
  settle).
- **Velocity squash-and-stretch** — a volume-preserving anisotropic UV warp ∝ |velocity|, **tanh-
  saturated** so the fastest flick reads as a lively bounce, never a taffy-pull; the blob leans into
  motion and recovers.
- **Mood from state, with an AUTHORITATIVE manual override** — the autonomic arc drives moods from
  pointer/idle state on a `{valence, arousal}` affect model (curious on approach, excited on click,
  sleepy after inactivity). A manual `setMood` (the expose) sits ABOVE the arc: it PINS the mood (the
  arc does not clobber it) until a fresh live interaction over the canvas releases the pin back to the
  arc — ONE precedence rule, manual > auto until interrupted. The sheen intensity, orbit speed,
  wobble, and pulse all read off the affect point.

All interaction respects `prefers-reduced-motion` and the `DockBackgroundToggle` pause — see
[Accessibility](#accessibility). Under reduced-motion the substrate paints a composed rest pose (peak
roundness, satellites tucked, the lit dome kept — a deliberate poster, not a random freeze).

---

## Best practices

- **Import from the subpath, not the root barrel** — `@mkbabb/glass-ui/goo-blob` pulls only the blob
  chunk + its leaves; it never drags in the root barrel's reach.
- **Theme via the injected config**, not by editing source — `provide(BLOB_CONFIG_KEY, …)` for a
  subtree, or a `config` prop per-instance. Named themed palettes belong in *your* app, not in the
  library (the library's defaults are its own identity).
- **Keep it calm by default** — the blob is an ambient accent. Hold `pulseAmp` small, `orbitRadius`
  modest, and animation cycles slow. Fast motion reads cheap and is a vestibular trigger.
- **Pause continuously-running backgrounds** — if the blob auto-runs > 5s as a non-essential
  background, wire `v-model:paused` (or `pause()`/`resume()`) to a `DockBackgroundToggle` (WCAG 2.2.2).
  This is binding, not optional.
- **Reserve `GooBlob` for the interactive/lit hero; route the static register to `WatercolorDot`** —
  each `GooBlob` holds its own WebGL2 context, and browsers cap ~8 live contexts per page. A grid of
  ambient/decorative thumbnails should be `WatercolorDot`s (zero GL context); reserve the GL blob for
  the one interactive hero.
- **Decorative, so `aria-hidden`** — don't bolt an `aria-label` onto the canvas; it carries no
  information. If you make a blob genuinely interactive (a button), wrap it in a real
  `<button>`/`role` with a name, not the canvas.

---

## Color notes

- The blob works entirely in **OKLCh**, lifted from a gamma-sRGB base through value.js's exact Ottosson
  OKLab/OKLCh matrices, with a **hue-preserving gamut clamp** and the **mandatory `linearToSrgb()`
  OETF** on output. A linear-in-without-an-OETF-out ships visibly ~2.2× too dark — the named A5/A2
  trap, machine-locked by `proof:blob-space-gamma`.
- The OETF + the four Ottosson matrices + the FBM rotation constant are **spliced from the shared
  `procedural-color.glsl.ts` chunk** that both the blob and aurora compose, so the color math can never
  diverge between the two surfaces. The line-for-line TS port + the equivalence gate
  (`proof:blob-color-equivalence`) lock it.
- **The renderer is DOM-free.** A `var(--token)` color is un-wrapped to a concrete `rgb(...)` by the
  SFC (the single cached `resolveTokenColor` cascade read) BEFORE the renderer resolves it through the
  `/color` leaf (`cssToOklch → oklchToGammaRgb`) — value.js's `parseCSSColor` cannot parse a `var()`
  wrapper, and the renderer never reaches the DOM. The un-wrap re-resolves on a dark-mode flip.
- **`deriveBlobPalette(seed, options)`** (`@mkbabb/glass-ui/color`) — one seed → 2–4 gamut-mapped OKLCh
  stops distributed across the body + satellites, parallel to aurora's `deriveAurora`, sharing one
  hoisted `ColorHarmony` vocabulary. Feed the stops to `config.color.paletteStops`.
- **Warm-cream fit** — any highlight, rim, or sheen the blob grows is tinted warm (toward
  `--foreground` / a warm highlight), never clinical white, so it sits in glass-ui's cream-glass system.

---

## Performance notes

- **Fill-rate is the cost, and it is quadratic in device-pixel ratio.** The substrate clamps DPR at 2×.
  The fragment runs FBM (3 octaves) twice per pixel plus a full OKLCh round-trip — keep the footprint
  modest.
- **Quiescence — the biggest onscreen lever.** The render loop is **event-scheduled**: an idle blob
  (mood settled, pointer at rest, trail collapsed, click pulse zero, no satellite mid-merge) PARKS its
  rAF and re-arms only when the next satellite phase or auto-mood arc is due. An idle ambient blob
  renders ~0 frames between phase transitions instead of burning a full 60fps forever.
- **The substrate parks aggressively** — offscreen (intersection + `content-visibility`),
  tab-backgrounded (`document.hidden`), and under `prefers-reduced-motion` (one static frame then
  park). An off-screen or hidden blob attaches zero frames; you pay only for visible, in-motion blobs.
- **Pre-FBM bounding discard** — a fragment outside the padded droplet reach (`uMaxReach`) writes
  transparent and returns BEFORE the two FBM calls + the OKLCh round-trip + the lit block, so the
  oversized canvas does not pay the full ALU on its transparent border.
- **`quality: "full" | "half"`** — `half` renders the metaball pass at half the backing-store
  resolution and lets the browser bilinear-upsample on composite (~4× fragment savings on weak GPUs;
  the soft FBM/AA edge hides the interpolation). One blit, no multi-pass chain.
- **No WebGPU, no particle migration (research-backed non-goals).** With ≤4 nuclei there is no
  accumulation bottleneck; single-pass WebGL2 SDF is the SOTA-correct architecture for this body count.
  A 2D screen-space field beats raymarching for a flat UI droplet on every axis (flat `O(W·H·N)`,
  zero overdraw, resolution-independent `fwidth`-AA). WebGPU compute is a net loss at ≤4 nuclei (a
  buffer round-trip + sync barrier with zero field-eval savings) and is a documented substrate-wide
  decision (aurora's WGSL path), never blob-local; a decorative background cannot carry a hard WebGPU
  dependency. Both are explicit non-goals.

---

## Accessibility

- **Decorative canvas** — `aria-hidden="true"`; no accessible-name obligation (the blob conveys no
  information).
- **`prefers-reduced-motion`** — the `useWebGLCanvas` substrate *live-monitors* PRM (a `matchMedia`
  `change` listener) and paints one composed-rest-pose static frame then parks under reduce — every
  surface inherits the freeze, and a CSS reset cannot reach the WebGL rAF, so the substrate owns it.
  Any interaction collapses to instant/no-op under reduce and hooks the *same* gate (no parallel
  motion path).
- **WCAG 2.2.2 (Pause, Stop, Hide)** — a continuously-running, auto-starting, > 5s, non-essential blob
  background MUST carry a user-reachable pause control, available to **all** users (not gated behind
  PRM). Wire `v-model:paused` (or `pause()`/`resume()`) to a `DockBackgroundToggle`. This is distinct
  from WCAG 2.3.3 (Animation from Interactions), which the PRM freeze covers.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { GooBlob, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import { DockBackgroundToggle } from "@mkbabb/glass-ui/dock";

const paused = ref(false);
</script>

<template>
  <GooBlob
    v-model:paused="paused"
    color="var(--card)"
    :config="BLOB_CONFIG_DEFAULTS"
    class="w-80"
  />
  <DockBackgroundToggle v-model:paused="paused" />
</template>
```

---

## Architecture

```
goo-blob/
├── GooBlob.vue              # the shell — props (incl. v-model:paused),
│                            #   var()-unwrap (the resolveTokenColor leaf), expose, wrapper shadow
├── types.ts                 # BlobConfig, BlobMood, BlobMerge, BlobQuality, MoodParams,
│                            #   MetaballSource, BLOB_CONFIG_KEY/DEFAULTS
├── shaders/
│   ├── metaball.vert.ts     # full-quad vertex
│   ├── metaball.frag.ts     # the fragment assembler (pre-FBM bounding discard, OKLCh perturb, lit dome)
│   ├── sdf-body.glsl.ts     # sdCircle + value+gradient smin (the analytic-gradient merge field)
│   ├── watercolor-edges.glsl.ts  # the domain-warped FBM that displaces the edge
│   └── oklch-perturb.glsl.ts     # inGamut + hue-preserving gamutClampOklch
└── composables/
    ├── useMetaballRenderer.ts   # composes useWebGLCanvas; compile, uniform upload, quiescence gate,
    │                            #   pause/resume seam, quality axis (DOM-free — concrete colors only)
    ├── useBlobSatellites.ts     # the orbit/merge/absorb/emerge state machine (seeded, deterministic)
    ├── useBlobMood.ts           # the {valence, arousal} 5-mood cross-fade engine
    ├── useBlobPointer.ts        # spring pointer → [-1,1], trail, click impulse, composed rest pose
    └── easing.ts                # easeInOut helpers
```

The fragment shader is **composed from cohesive partials** spliced into one source string at module
load — the emitted shader is character-equivalent to a hand-inlined version. The renderer composes the
shared `useWebGLCanvas` substrate and is DOM-free: the SFC un-wraps every color via one
`resolveTokenColor` leaf before the renderer resolves the concrete strings through the `/color` leaf
(`cssToOklch → oklchToGammaRgb`).

---

## References

The lane's authoritative research artefact is [`RESEARCH.md`](./RESEARCH.md) (the metaball / SDF
field survey, the OKLCh palette derivation, and the mood/intent model behind the bead). The primary
techniques, all accessed 2026-06-08:

- Inigo Quilez — [Smooth Minimum](https://iquilezles.org/articles/smin/), [Distance + Gradient
  functions 2D](https://iquilezles.org/articles/distgradfunctions2d/) (the SDF gradient = free fake
  normal), [Domain Warping](https://iquilezles.org/articles/warp/), [Procedural Color
  Palettes](https://iquilezles.org/articles/palettes/).
- Björn Ottosson — [Oklab](https://bottosson.github.io/posts/oklab/) (the perceptual color space + the
  gamut-clipping the blob's clamp follows).
- Codrops — [Interactive droplet-like metaballs with Three.js and GLSL](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
  (the canonical premium-metaball reference: SDF normals, pointer trail, glass tone-crush).
- Alan Zucconi — [Fast Subsurface Scattering in Unity](https://www.alanzucconi.com/2017/08/30/fast-subsurface-scattering-1/).
- frost.kiwi — [How to fix color banding](https://blog.frost.kiwi/GLSL-noise-and-radial-gradient/) (the
  interleaved-gradient-noise dither).
- Josh Comeau — [Spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/),
  [Squash and Stretch](https://www.joshwcomeau.com/animation/squash-and-stretch/).
- WCAG — [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html),
  [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html);
  MDN — [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

## Contributing

See [CONTRIBUTING.md](../../../../CONTRIBUTING.md).

## License

[MIT](../../../../LICENSE) © 2026 Mike Babb
