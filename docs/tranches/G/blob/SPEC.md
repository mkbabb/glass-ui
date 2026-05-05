# `<Blob>` — Specification

Version: 1.0 (G sub-tranche).
Status: spec-locked; awaiting Wβ0 review.
Authority: this document is the single source of truth for the canon Blob primitive. Any contradiction with consumer evidence (`value.js` `GooBlob.vue`, `HeroBlob.vue`) resolves in favor of this spec.

---

## 1. Concept

A living watercolor specimen on cream paper.

The Blob is a moodful organic primitive — a soft body with three orbiting satellites, drifting and breathing in place, occasionally pulled by the cursor and occasionally absorbing or emitting a satellite. It is the design language's **mascot grammar**: the same vocabulary that powers a 56px swatch in a palette browser scales coherently to a 320px hero element on a marketing landing.

The blob is mathematical underneath (smooth-min unions, golden-ratio orbital eccentricity, deterministic PRNG seeds for SSR-stable first frames) and painterly on top (chromatic aberration on the edge, fine grain overlay, breath cadence at φ-derived frequency). It pairs visually with cream surfaces (warm hue 48 substrate) and reads correctly through the four glass tiers, the cartoon-shadow family, and against rainbow flourish gradients.

It is not a generic mascot. The five moods (`idle | happy | curious | sleepy | excited`) are character expressions, each with eleven tunable parameters. Moods are not animated transitions over time; they are blended states, smoothed in real time. A consumer can drive mood from any reactive source — pointer proximity, scroll position, success/error state, time of day.

---

## 2. Aesthetic anchors

Frontend-design POV applied:

- **Substrate pairing.** Designed to read against cream (`--cream`, hue 48) and through glass tiers. Default border is hue 48 at 12% — the warm-cream edge. On dark substrate, satellites desaturate 8% and the body brightens 4%; the design language's "warm-paper to warm-charcoal" mirroring inverted at the blob level.
- **Color contract.** Single accent (`--blob-color`, defaulting to `var(--easing-accent)`). All satellites inherit with hue shift `±--blob-hue-range` (mood-dependent). Saturation and brightness perturbed by Perlin noise at low frequency. The blob feels alive, not stamped.
- **Motion cadence.** Breath at 0.3 Hz (≈ 1/φ²). Orbits at 8–14 second periods (≈ φ × 5s base). All easing through `--ease-apple-spring` for the satellite phase transitions; `var(--spring-smooth)` for mood blending. Pointer attraction is critically damped — no bounce, no overshoot.
- **Mathematical exposure.** SmoothK union strength defaults to `1/(2φ²) ≈ 0.191`. Orbital eccentricity defaults to `0.25 = φ⁻²/2.618`. Satellite radius is `0.13 ≈ φ⁻⁴`. Numbers consumers see in the config are golden where it matters and arbitrary where it doesn't; documented per row in §6.
- **Typography pairing.** The optional `<Blob.Label>` slot uses `--type-caption` Fraunces italic with `WONK 1, SOFT 100` — the same axis settings as the audacious display rungs. The label has the same painterly liquidity as the blob itself.
- **Accessibility-as-aesthetic.** PRM is not a downgrade — it's a frozen specimen, composition still beautiful. Reduced-transparency renders a solid disc with a cartoon shadow; the cream paper-and-disc mood is preserved. Contrast-more strengthens the border by stepping `--blob-border-mix` from 12% to 24%. The blob looks intentional in every accessibility mode.

---

## 3. Public API

### Component

```vue
<Blob
  :color           // string — sets `--blob-color` custom property
  :size            // string | number — default "7rem"; numbers render as px
  :mood            // BlobMood — default "idle"
  :config          // Partial<BlobConfig> — override any of 25 default fields
  :pointer-attract // boolean — default `(pointer: fine)` query result
  :reduced-motion  // "auto" | "static" | "animate" — default "auto"
  :seed            // number — PRNG seed for deterministic first frames; default 1618
  :tap-mood        // BlobMood | null — on tap (touch) or click, transition to this mood
                   //   for `tap-duration` ms then return to base. Default null = no tap behavior.
  :tap-duration    // number — ms; default 800
>
  <template #label>
    <!-- optional Fraunces italic caption -->
  </template>
</Blob>
```

The `<Blob>` wrapper element renders a subtle cast shadow on the substrate via `box-shadow: 0 var(--blob-cast-shadow-y) var(--blob-cast-shadow-blur) color-mix(in srgb, var(--blob-color) 18%, var(--foreground))` — the blob casts its own shadow. Defaults: `--blob-cast-shadow-y: 0.5rem`, `--blob-cast-shadow-blur: 1.5rem`. Consumer overrides per instance via CSS or the `:style` attribute.

### Public exports (from `@mkbabb/glass-ui`)

```ts
// component
export { Blob } from "./components/custom/blob";
export type { BlobProps, BlobMood, BlobConfig } from "./components/custom/blob";

// constants
export {
  BLOB_CONFIG_DEFAULTS,
  BLOB_MOOD_PARAMS,            // five-mood parameter table
} from "./components/custom/blob";

// composables
export {
  useBlob,                     // facade — wires the four below
  useBlobMood,
  useBlobPointer,
  useBlobSatellites,
  useMetaballRenderer,         // WebGL-first; Canvas2D fallback
  useWatercolorBlob,           // small-blob recipe (Mulberry32 + reactive border-radius)
} from "./composables/blob";

// utilities
export { mulberry32 } from "./composables";   // top-level utility, deterministic PRNG

// SVG infra (companion mounts)
export { SvgFilters, RainbowGradientDef } from "./components/custom/svg-filters";
```

### `<Swatch>` companion (lives in its own package; consumes Blob composables internally)

```vue
<Swatch
  :color
  :size            // "sm" | "md" | "lg" | "xl"
  :variant         // "solid" | "cartoon" | "watercolor"
  :animated        // boolean — only meaningful for variant="watercolor"
  :seed            // number — PRNG seed
/>
```

`variant="watercolor"` consumes `useWatercolorBlob`; `variant="cartoon"` and `variant="solid"` are CSS-only (no JS subscription).

### Configuration: prop-only

Configuration is delivered through the `:config` prop. **No `provide`/`inject` channel.** Hosts wanting shared config across N `<Blob>` instances bind the same Vue ref to all `:config` props — that's idiomatic Vue, not a context channel. Drops the `BLOB_CONFIG_KEY` symbol from value.js's pattern.

---

## 4. `BlobConfig` (25 fields)

Each row: field name · default · golden? · description.

| Field | Default | φ? | Description |
|---|---:|---|---|
| `canvasSize` | `256` | | Backing canvas resolution in px. Independent of CSS size. |
| `bodyRadius` | `0.25` | φ⁻² | Body radius in normalized device coordinates. |
| `satelliteCount` | `3` | | Number of orbital satellites. |
| `satelliteRadius` | `0.13` | ≈φ⁻⁴ | Satellite radius in NDC. |
| `orbitRadius` | `0.35` | | Mean orbit radius in NDC. |
| `smoothK` | `0.191` | 1/(2φ²) | Smooth-min union strength. Higher = gooier. |
| `noiseAmp` | `0.025` | | Surface-noise displacement amplitude. |
| `noiseFreq` | `3.5` | | Surface-noise spatial frequency. |
| `noiseSpeed` | `0.08` | | Surface-noise temporal scroll. |
| `pulseFreq` | `0.3` | 1/φ² | Body breath frequency in Hz. |
| `pulseAmp` | `0.008` | | Body breath amplitude. |
| `hueRange` | `5` | | Hue perturbation range in degrees. |
| `satShift` | `0.0` | | Saturation perturbation (-1..1). |
| `brightnessShift` | `0.0` | | Lightness perturbation (-1..1). |
| `colorNoiseFreq` | `2.0` | | Color-noise spatial frequency. |
| `colorNoiseSpeed` | `0.05` | | Color-noise temporal scroll. |
| `pointerAttraction` | `0.0` | | Pointer-pull strength multiplier. 0 = no attraction. |
| `pointerStrength` | `0.08` | | Pointer-attraction maximum displacement. |
| `eccentricity` | `0.25` | φ⁻²/2.618 | Orbit ellipse eccentricity. |
| `orbitSpeedScale` | `1.0` | | Global multiplier for orbital angular velocity. |
| `wobbleScale` | `1.0` | | Global multiplier for satellite wobble overtones. |
| `mergeRate` | `1.0` | | Multiplier for satellite merge-with-body rate. |
| `mergeDuration` | `1800` ms | | Merge phase duration. |
| `absorbedDuration` | `[2000, 4000]` ms | | Random range for absorbed phase. |
| `emergeDuration` | `2200` ms | | Emerge phase duration. |
| `orbitDuration` | `[8000, 14000]` ms | ≈φ⁵ | Random range for orbit-period rerolls. |

φ-marked fields document the golden-ratio lineage. Non-φ fields are tuned by character; consumers override as their content demands.

---

## 5. `BlobMood` parameter table

Five named moods, each an 11-field `MoodParams` blend that overlays `BlobConfig`. Mood transitions blend over `--duration-panel` (450 ms) using `--ease-apple-spring`.

| Param | idle | happy | curious | sleepy | excited |
|---|---:|---:|---:|---:|---:|
| `orbitSpeedScale` | 1.0 | 1.4 | 1.1 | 0.5 | 1.7 |
| `wobbleScale` | 1.0 | 1.3 | 1.2 | 0.6 | 1.5 |
| `pulseFreq` | 0.30 | 0.45 | 0.32 | 0.18 | 0.55 |
| `pulseAmp` | 0.008 | 0.014 | 0.010 | 0.005 | 0.018 |
| `noiseAmp` | 0.025 | 0.030 | 0.028 | 0.018 | 0.038 |
| `hueRange` | 5 | 12 | 8 | 3 | 18 |
| `satShift` | 0.00 | +0.05 | 0.00 | -0.08 | +0.10 |
| `brightnessShift` | 0.00 | +0.04 | 0.00 | -0.05 | +0.06 |
| `smoothK` | 0.191 | 0.200 | 0.195 | 0.165 | 0.215 |
| `pointerAttraction` | 0.0 | 0.4 | 0.8 | 0.0 | 0.6 |
| `mergeRate` | 1.0 | 1.5 | 1.0 | 0.4 | 1.8 |

Defaults exported as `BLOB_MOOD_PARAMS: Record<BlobMood, MoodParams>`. Consumers override via `useBlobMood({ params: customMap })`.

---

## 6. Internal architecture

### Composable graph

```
<Blob>
  └─ useBlob(props)
       ├─ useBlobMood(mood)              → reactive MoodParams
       ├─ useBlobPointer(canvasRef)      → reactive pointer position + attraction force
       ├─ useBlobSatellites(config, mood, pointerForce) → reactive Source[] for renderer
       └─ useMetaballRenderer(canvasRef, sources, color, config)
            ├─ tries WebGL2 first
            └─ falls back to Canvas2D if WebGL unavailable
```

Each composable is independently usable. `useBlob` is the facade for the common case. Composers wanting custom shells (e.g. SVG-based satellites, multi-blob compositions sharing one renderer) call the four directly.

### WebGL renderer

WebGL2 fragment shader is the default path. Spec:

```glsl
#version 300 es
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec3  uColor;            // hsl decomposition
uniform float uSmoothK;
uniform int   uSourceCount;
uniform vec4  uSources[8];       // x, y, radius, opacity (NDC)

uniform float uHueRange;
uniform float uSatShift;
uniform float uBrightnessShift;
uniform float uColorNoiseFreq;
uniform float uColorNoiseSpeed;
uniform float uChromaticAberration;  // 0.0..0.005

out vec4 fragColor;

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k * (1.0 / 6.0);
}

float sdSource(vec2 p, vec2 c, float r) {
    return length(p - c) - r;
}

float sdField(vec2 p) {
    float d = 1e6;
    for (int i = 0; i < uSourceCount; ++i) {
        d = smin(d, sdSource(p, uSources[i].xy, uSources[i].z), uSmoothK);
    }
    return d;
}

vec3 hsl2rgb(vec3 c) { /* canonical 8-line transform */ }
float snoise(vec2 v) { /* canonical 24-line simplex noise */ }

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 p  = uv * 2.0 - 1.0;

    float d  = sdField(p);
    float dR = sdField(p + vec2( uChromaticAberration, 0.0));
    float dB = sdField(p - vec2( uChromaticAberration, 0.0));

    float edgeR = 1.0 - smoothstep(-0.005, 0.005, dR);
    float edgeG = 1.0 - smoothstep(-0.005, 0.005, d);
    float edgeB = 1.0 - smoothstep(-0.005, 0.005, dB);

    float n = snoise(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed);
    vec3 hsl = uColor + vec3(uHueRange / 360.0 * n, uSatShift, uBrightnessShift);
    vec3 rgb = hsl2rgb(clamp(hsl, vec3(0.0), vec3(1.0)));

    fragColor = vec4(rgb * vec3(edgeR, edgeG, edgeB), max(edgeR, max(edgeG, edgeB)));
}
```

Per-frame: 1 draw call, 1 fullscreen quad, ≤ 8 sources via uniform array. ≤ 2 ms on M1 / iPhone 12 / Pixel 5 at 256×256. Profiled in Wβ3 stress test.

Chromatic aberration is the painterly tell — separating R/G/B sample positions slightly produces a wet-edge effect that distinguishes the blob from a generic metaball. Default `0.002`; consumer-overridable.

### Canvas2D fallback

When `gl = canvas.getContext('webgl2')` is null, fall back to a Canvas2D port of value.js's `useMetaballRenderer.ts`. Same source state machine, same color logic; per-pixel main-thread scan. Hard-capped at 200×200 canvas to preserve frame rate. Used only when WebGL2 unavailable (≈ 2% of users in 2026).

### Satellite state machine

Phases: `orbiting → merging → absorbed → emerging → orbiting`. Lifted from value.js `useBlobSatellites.ts:1-294`, modifications:

- **Deterministic PRNG seed** — `mulberry32(seed + satelliteIndex)` replaces `Math.random()` for `timeOrigin`, `phaseOffset`, `wobbleAmpN`, `pertNAmpN`, `startX/Y`, `endX/Y`. SSR + hydration produce matching first frames.
- **Phase transitions are `--ease-apple-spring`** explicitly — value.js had implicit easing.
- **Cleanup contract** — single rAF loop, single ResizeObserver, both torn down in `onBeforeUnmount`.

### Pointer model

`useBlobPointer(canvasRef)` returns `{ pointerNDC, attractionForce }`:

- `pointerNDC` — pointer position in NDC relative to canvas center, `null` when pointer off-canvas or `pointer-attract=false`.
- `attractionForce` — vector from blob center toward pointer, magnitude scaled by `config.pointerAttraction × config.pointerStrength`, critically damped.

Pointer-coarse devices (`(pointer: coarse)` matches): default `pointer-attract=false`. Touch users get the moodful breath without cursor chase. Pointer-fine devices: default `pointer-attract=true`.

### Mood blending

`useBlobMood(mood)` returns reactive `MoodParams`. When `mood` changes, the eleven fields blend via `useTransition` from `@vueuse/core` over `--duration-panel` (450 ms) with `--ease-apple-spring`. No "halfway between idle and excited" state is invalid — every blend point is well-defined.

---

## 7. Token contract

### Consumed canon tokens

```
--blob-color: var(--easing-accent)         (default — overridable per instance)
--ease-apple-spring                         (mood + satellite phase easing)
--spring-smooth                             (mood blend curve)
--duration-panel                            (mood blend duration)
--cream                                     (default backdrop pairing in stories)
--shadow-cartoon-md                         (PRM/no-WebGL fallback shadow)
--shadow-cartoon-lg                         (5px+7px asymmetric — used by Blob hover state)
```

### New tokens (W1 hosts these)

```
--blob-border-mix:                          12%        (default)
--blob-border-mix-contrast:                 24%        (when prefers-contrast: more)
--blob-grain-opacity:                       0.04       (subtle paper-grain overlay)
--blob-chromatic-aberration:                0.002      (WebGL only; NDC units; settable per instance)
--blob-cast-shadow-y:                       0.5rem     (cast-shadow y offset)
--blob-cast-shadow-blur:                    1.5rem     (cast-shadow blur radius)
--blob-cast-shadow-mix:                     18%        (color-mix percentage of blob color into foreground)
```

### Custom properties exposed (consumer-settable per instance)

```
--blob-color                                primary accent
--blob-size                                 alternative to :size prop (CSS-driven)
--blob-cast-shadow-y                        cast shadow y offset
--blob-cast-shadow-blur                     cast shadow blur radius
--blob-cast-shadow-mix                      cast shadow color-mix strength
--blob-chromatic-aberration                 chromatic aberration shader uniform (0..0.005)
```

---

## 8. Accessibility contract

### `prefers-reduced-motion`

`reduced-motion="auto"` (default) checks the media query.

- **Match** → render one frame at `t=0`, halt rAF, do not animate. Mood transitions snap (no blend). Pointer attraction disabled. The blob is a static specimen.
- **No match** → full animation.

Override via `reduced-motion="static"` or `reduced-motion="animate"` for forcing.

### `prefers-reduced-transparency`

When matched: no metaball compositing. Render a solid disc (body + N satellites, each with cartoon shadow `--shadow-cartoon-md`). The mood color shifts apply, but no smooth-min union, no chromatic aberration, no surface noise. Still recognizable as the blob; transparency reduced.

### `prefers-contrast: more`

When matched: `--blob-border-mix` steps from 12% to 24%. Border is visible against any substrate. Body color is unaffected.

### `@supports not (color: oklch(...))`

Not relevant — the blob uses HSL throughout for shader simplicity.

### WebGL2 unavailable

Render via Canvas2D fallback path (see §6). Visual parity with WebGL minus chromatic aberration (Canvas2D can't do per-channel sampling cheaply).

### Reduced data / save-data

`navigator.connection?.saveData === true` → behave as if `prefers-reduced-motion` matches. Static specimen, no animation.

### Keyboard / focus

The blob is decorative by default (`role="presentation"`, `aria-hidden="true"`). Consumers can override with `:role` and `:aria-label` for interactive use cases. The `<Blob.Label>` slot, when used, is keyboard-discoverable through normal document flow.

---

## 9. Performance budget

| Metric | Budget | Hardware |
|---|---|---|
| Per-frame GPU time | ≤ 2 ms | M1 / iPhone 12 / Pixel 5 |
| Per-frame CPU (renderer) | ≤ 0.5 ms | same |
| Per-frame CPU (state machine) | ≤ 0.3 ms | same |
| Memory per instance | ≤ 256 KB | (canvas + GL buffers + state) |
| Multi-instance baseline | 4 simultaneous instances at 60 fps | same |
| WebGL context count | shared singleton when possible, else per-instance | |

Stress test in Wβ3:

- **Single instance, 256×256, 4 sources, full motion** — must hold 60 fps.
- **Four instances on one page** — each at 256×256, must hold 60 fps total via shared rAF (`useRafLoop`).
- **Eight instances on one page** — degraded gracefully: visibility gating pauses offscreen blobs; visible blobs hold 30+ fps.
- **PRM enabled** — zero rAF activity; one-time first-frame paint; all instances static.

### Visibility gating

Each `<Blob>` instance subscribes to an IntersectionObserver. When `intersectionRatio === 0`, the rAF subscription is paused. When the blob re-enters the viewport, animation resumes from `t = lastPaused + (now - pauseStart)` (no time skip; the satellite state advances as if it had been animating).

### rAF coalescing

`useMetaballRenderer` subscribes to a single shared `useRafLoop` driver (lives in `composables/motion/`, in scope for the main G.W3). Multiple Blob instances do not multiply rAF subscriptions.

---

## 10. Migration ledger (value.js)

This sub-tranche enables the value.js consumer migration. Per the main G.W5 discipline (proof-by-ledger; no consumer-repo edits), the ledger entries land in `docs/tranches/G/audit/W5-value-js-migration.md`. Highlights specific to Blob:

### Files to delete (consumer)

- `demo/@/components/custom/goo-blob/GooBlob.vue` (123 lines)
- `demo/@/components/custom/goo-blob/types.ts` (136 lines)
- `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` (319 lines)
- `demo/@/components/custom/goo-blob/composables/useBlobMood.ts` (136 lines)
- `demo/@/components/custom/goo-blob/composables/useBlobPointer.ts` (69 lines)
- `demo/@/components/custom/goo-blob/composables/useBlobSatellites.ts` (294 lines)
- `demo/@/components/custom/goo-blob/index.ts`
- `demo/@/components/custom/svg-filters/SvgFilters.vue` (29 lines)
- `demo/@/components/custom/watercolor-dot/WatercolorDot.vue` (107 lines)
- `demo/@/components/custom/watercolor-dot/composables/useWatercolorBlob.ts` (136 lines)
- `demo/@/components/custom/watercolor-dot/index.ts`
- `demo/@/composables/prng.ts` (Mulberry32)

Total: ≥ 1349 lines retired from value.js.

### Files to keep (consumer)

- `demo/@/components/custom/color-picker/visual/HeroBlob.vue` (92 lines) — **the value.js wrapper that maps the picked palette to satellite colors and coordinates mood with mouse / picker state**. Re-implements as a thin shell over canon `<Blob>`:

```vue
<!-- HeroBlob.vue (post-migration, ~30 lines) -->
<script setup lang="ts">
import { computed } from "vue";
import { Blob, type BlobMood } from "@mkbabb/glass-ui";
import { useAppColorModel } from "../../../composables/color/useAppColorModel";

const { pickedColor, satelliteColors } = useAppColorModel();

const mood = computed<BlobMood>(/* picker-state → mood mapping */);
const config = computed(() => ({
  satelliteCount: satelliteColors.value.length,
  // satellite-color override is consumer-side via the renderer override slot
}));
</script>

<template>
  <Blob :color="pickedColor" :mood="mood" :config="config" size="7rem" />
</template>
```

- The `useAppColorModel` composable (color-math + picked palette + safe accent) stays consumer-side. Out of canon's risk register per F lane.

### Configuration migrations

- `provide(BLOB_CONFIG_KEY, partial)` patterns → `:config` prop binding.
- 4-mood color-cycling via `useBlobMood` consumer wrapper → consume canon `useBlobMood`, override `params` if the value.js mood→color mapping diverges from canon defaults.

### Silent-failure / undefined-token cleanup (cross-cuts)

Resolved by W2 of the main tranche, not this sub-tranche; cited here for completeness:

- `.gold-shimmer` text variant (silently broken) → `.text-shimmer-gold` (W2).
- `.dashed-well` (silently broken) → `.well-dashed` (W2).
- `.stagger-children` (silently broken) → resolved per W0 decision.
- `--ease-spring` (referenced at value.js sites, undefined) → `--spring-bouncy` consumer-side rename.

---

## 11. Decisions (locked 2026-05-04 by user; Wβ0 verifies, does not re-decide)

1. **Renderer architecture: instance-local GL context.** Each `<Blob>` instance acquires its own `webgl2` context. Upgrade path to a shared singleton compositor remains documented but unimplemented; revisited if ≥ 8 simultaneous blobs become a real workload. Wβ1 implements per-instance.
2. **Chromatic aberration: exposed CSS variable.** `--blob-chromatic-aberration` is a per-instance CSS custom property; default `0.002`; zero is a valid value. Wβ1 wires it through the shader `uChromaticAberration` uniform.
3. **Cast shadow: owned by Blob.** The `<Blob>` wrapper renders `box-shadow: 0 var(--blob-cast-shadow-y) var(--blob-cast-shadow-blur) color-mix(in srgb, var(--blob-color) var(--blob-cast-shadow-mix), var(--foreground))` per §3 / §7. Consumers do not need to wrap in `<Card>` for shadow. The cast-shadow tokens are settable per instance.
4. **Web Worker for state machine: deferred.** Main-thread state machine stays. Revisited only if 8+ multi-instance use cases land.
5. **Touch interaction: `:tap-mood` prop.** `<Blob>` accepts `:tap-mood` (`BlobMood | null`, default null) and `:tap-duration` (number ms, default 800). On tap or click, transitions to `tap-mood` for `tap-duration` then returns to base. Default null preserves no-tap behavior.

---

## 12. Out of scope (for this sub-tranche)

- Multi-blob shared compositor (deferred per §11.1).
- Audio reactivity (potentially a future axis; no current consumer evidence).
- 3D rendering (the blob is intentionally 2D).
- Blob → text path morphs (a different primitive; if needed, lives in a future motion tranche).
- Blob "gallery" — saving blob configurations as named presets (consumer territory; value.js's HeroBlob already does this).
- The `palette → satellite color` mapping (value.js domain; stays consumer-side as `HeroBlob.vue`).

---

## 13. Change log

| Date | Change |
|---|---|
| 2026-05-04 | v1.0 spec authored. Locked pending Wβ0 review. |
