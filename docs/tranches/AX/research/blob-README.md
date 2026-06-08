# GooBlob

A single-pass WebGL2 2D-SDF metaball droplet: a warm-cream lit gel bead that breathes, leans toward the
cursor, stretches an elastic pseudopod, and carries an ambient mood. It is an EXPRESSIVE, DECORATIVE creature —
NOT a determinate progress indicator. For measurable progress, reach for `Progress` or `Skeleton`; `GooBlob`
communicates *presence, liveliness, and state*, not a percentage.

```ts
import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
```

```vue
<GooBlob :config="{ satellites: 3 }" />
```

Research-backed; the technique lineage is in [Reference lineage](#reference-lineage). Companion siblings:
`WatercolorDot` (`@mkbabb/glass-ui/watercolor-dot`, the zero-GL CSS/SVG ambient dot) and `Aurora`
(`@mkbabb/glass-ui/aurora`, the full-bleed WebGL background) share the same `useWebGLCanvas` substrate.

---

## Use cases — two affordance registers

A blob occupies one of two registers; pick deliberately (`facet: affordance, goo-aesthetics, mood-model`).

- **Decorative / ambient brand mark.** An `aria-hidden`, calm, on-palette accent — a `≈7rem` ambient bead, slow
  and breathing, pausable. The restraint doctrine (Apple Liquid Glass WWDC25, Stripe/Linear ambient gradients):
  *present, but not distracting* — it SUPPORTS focus, never competes for it; slow drift, few stops, constrained
  to a section, not full-bleed-dominating. For a GRID of ambient marks, route to `WatercolorDot` (zero GL
  context) and reserve `GooBlob` for the ONE interactive hero — see [Performance](#performance).

- **Status / thinking indicator.** The Microsoft Copilot "Mico" model (Oct 2025): a compact animated blob whose
  mood + tempo + merge-rate ENCODE conversational state — idle (soft glow) → listening (expansion) → thinking
  (slow churn) → responding (pulsing). Map app-state to `setMood(...)`. The deliberate non-photorealism is a
  FEATURE: an abstract gooey creature carries warmth without the uncanny-valley risk of a face, and it stays
  optional/pausable.

The two registers share one component; the difference is wiring (a static `aria-hidden` decoration vs a
state-driven `setMood` indicator), not a different primitive.

---

## The mood model — valence/arousal circumplex

The blob carries affect via Russell's **Circumplex Model of Affect** (`facet: mood-model, auto-mood-arcs`): a
continuous 2-axis `{valence, arousal}` plane where every named mood is a POINT, and ALL motion/surface
parameters are DERIVED from those two numbers on ONE principled surface — never a discrete enum of hand-tuned
param tables. Adding a mood is two numbers, not eleven.

| Axis | Range | Drives |
|------|-------|--------|
| **Arousal** | calm `0` → energized `1` | motion energy: orbit speed, wobble, pulse, edge-noise, sheen (iridescence/SSS), and the smin merge-rate |
| **Valence** | unpleasant `-1` → pleasant `+1` | palette warmth + the pointer lean SIGN (pleasant leans IN toward the cursor; unpleasant shies AWAY) |

- **Mood vs emotion (homeostasis).** Mood is the slow-drifting baseline; emotion is a transient event spike that
  decays back toward a neutral set-point. A click latches `excited` briefly, then arousal relaxes exponentially
  to the idle baseline — a living creature settling, not a state-machine flipping. (The smooth decay also gives
  the at-rest quiescence gate a clean `|d(params)/dt| < eps` settle point — see [Performance](#performance).)

- **Auto-arcs.** `hover → curious`, `click → excited` (latch + smooth decay), `idle → sleepy`. Sleepy SLOWS the
  breath and droops — it does NOT freeze (zero arousal reads dead, not asleep).

- **Derived, not widened.** Dominance (the lean-in confidence) stays DERIVED from `valence × arousal`; flow (the
  easing smoothness, after Laban Movement Analysis) stays DERIVED from valence. The public surface is
  `setMood(named)` — the `{valence, arousal}` points are internal. No PAD 3-axis config surface (KISS / no
  overfit).

The energy axis co-modulates BOTH kinetics AND surface optics from one liveliness scalar: an excited blob
shimmers more (iridescence up, faster sheen scroll) WHILE it moves more — so excitement reads on the material,
not just the silhouette.

---

## Interaction

All interaction runs on the substrate's SINGLE rAF loop — no parallel timers (`facet: pointer-follow,
decaying-trail, click-impulse, soft-body`).

- **Pointer follow** — a frame-rate-independent critically-damped spring (`@mkbabb/keyframes.js`, response
  `~0.18`, damping `1.0`): lag reads as weight, with no overshoot. The lean direction and reach scale with
  `valence × arousal` (pleasant + aroused reaches farther/more directly; unpleasant barely reaches).

- **Click impulse** — an underdamped symplectic-Euler kick (a one-shot bounce: initial-velocity impulse,
  overshoot, settle), the `(bounce, response)` game-feel vocabulary.

- **Pseudopod / reach** — the Codrops droplet pattern: a 15-position decaying-radius FIFO trail of the pointer
  path (newest = largest at the cursor, oldest = smallest), all smin-merged into the body so the blob stretches
  an elastic limb toward the cursor and snaps back. Pure positional lag — the queue latency + metaball blend IS
  the elasticity; no extra spring constants.

- **Squash-and-stretch** — a velocity-driven anisotropic UV warp with the perpendicular axis scaled `1/sa` to
  preserve area (Disney principle #1). ~80% of soft-body "weight" with zero physics sim — the squash stays
  WITHIN the footprint (it never punches a limb through the edge).

Every integrated axis carries a first-frame 50ms dt clamp so a park/PRM/pause re-arm (where the first frame can
be seconds) does not jump.

---

## The lit droplet — surface and color

A flat 2D fill is lifted to a wet, dimensional gel bead entirely in the fragment shader (`facet: blinn-phong,
fresnel, sss, iridescence, oklch-palette, analytic-gradients`).

- **The fake normal.** The gradient of the composite SDF IS a free 2D surface normal. The SOTA path is the
  ANALYTIC gradient — `sdgCircle` returns `vec3(d, p/d)` (the circle gradient `p/d` is unit-length free), the
  value+gradient `vec3 smin` propagates `mix(a.yz, b.yz, h)` through the merge, and the FBM membrane's gradient
  (from `noised().yz`) chains in via `circleGrad − amp*fbmGrad` — so the normal is exact at the meniscus where a
  finite-difference 4-tap (sampling across the seam) averages two surfaces and tilts wrong, AND it deletes 4
  full field re-evaluations per lit pixel. A pseudo-3D Z is lifted from edge-proximity
  (`z = sqrt(1 - (1 - interior)^2)`, a unit half-sphere: flat centre, steep rim) — the canonical "make a 2D
  sticker read as a rounded bead" move. The smin field is sub-unit (`|grad| ≤ 1`), so the gradient is normalized
  before the lift; the win is direction correctness, not magnitude.

- **The lighting.** Linear-space Blinn-Phong glint (half-vector, energy-conserving `× (shininess+2)/8` so
  shininess and strength decouple) + Schlick/Fresnel rim (`pow(1 - dot(N,V), power)`, the grazing-angle "wet
  meniscus" edge) + fast-SSS Beer-Lambert inner glow (a saturating `1 - exp(-k·thickness)` density curve — flat
  thick core, fast warm rim falloff) + warm-pearl IQ-cosine iridescence. ALL added in LINEAR before the OETF and
  before the alpha premultiply (after either would double-gamma and fringe the edge). Competing highlights
  combine with `max()`, not `+`, so the hotspot never blows out.

- **Warm-cream identity.** The specular tint is OKLCh `L≈0.97, C≈0.03, h≈85°` (a near-white WARM catch-light)
  through the SAME spliced OKLCh matrices — NOT hardcoded sRGB white, which reads cheap-CG. The default palette
  derives from glass-ui's WARM tokens via `deriveBlobPalette` (in-family, equal-perceptual-weight L-spread). A
  foreground-aware min-contrast rim guard keeps a `var(--primary)` blob legible in dark mode (the dark move is
  chroma-reduce + L-lift the rim, not a re-tint). Cold/neon is an explicit consumer opt-in (presets in
  consumers). An IGN dither (`±0.5/255`, `gl_FragCoord`-keyed, after `linearToSrgb`) kills 8-bit banding on the
  low-contrast warm-cream dome — which matters MOST on the frozen reduced-motion frame, where motion no longer
  temporally hides it.

All color perturbation rides the perceptually-uniform OKLCh path with a hue-preserving gamut clamp (Ottosson),
so the blob stays in-family and never bands or goes muddy.

---

## The smin merge regime — k IS the blend band

The body, satellites, and trail fuse via a smooth-minimum (`facet: smin-distance-regime, containment`). After
IQ's 2024 kernel-normalization (quadratic `k *= 4.0`; circular `k *= 1/(1-sqrt(0.5))`), the parameter `k`
equals EXACTLY the maximum surface inflation in DISTANCE units — the merge band you reason about directly. The
quadratic variant is cheaper and slightly creased; the circular variant gives a true quarter-circle fillet (the
rounder, wetter premium-droplet read) at the SAME `k`-units, so swapping `merge` does not re-tune the band.

Two non-obvious properties:

- **`k` is a LENGTH** — it rides the same `POS_SCALE` inner-region compression as every other length (body,
  satellite, orbit, noise). It is meaningful only as a RATIO against the body/satellite radii (a wet meniscus is
  `~0.03-0.08` of the half-extent; raising `k` for roundness FLOODS the field — roundness comes from the
  circular variant at a SMALL `k`, never a larger `k`).

- **`k` ADDS to the silhouette reach** — the smin's inward-at-seam is an outward-of-union expansion: the merged
  isosurface reaches `~k` beyond the union of the raw circles. So the footprint budget counts it
  (`bodyR + orbitR + satR + k ≤ 0.5 × 0.75`), and the perf bounding-discard `maxReach` pads by it, or the wet
  meniscus clips.

A blob can fuse a satellite's COLOR through the seam (the IQ `vec2` material-blend smin returns the blend weight
alongside the distance) so a merging satellite carries its own palette stop into the neck instead of popping —
gated behind the multi-stop palette path.

---

## The living membrane

The silhouette is not a clean circle (`facet: domain-warp, living-membrane`). The edge is displaced by a
domain-warped analytic-gradient FBM (`fbm(p + W·fbm(p))`) tuned to the LIQUID band (lacunarity `~1.8`,
persistence `~0.42`, 2-3 octaves — the terrain-grade `2.0/0.5` reads rocky), with the displacement amplitude
tied to the body scale so the wobble stays proportional. The breath is 2-3 detuned sines at irrational
frequency ratios (so it never mechanically re-syncs), tuned to the human calm band (~6 breaths/min, asymmetric
slower exhale). The intermediate warp vector is reused to perturb the OKLCh hue (a small `~5°` swing) so warp
and color move coherently. The noise fade is QUINTIC (a cubic fade creases the analytic gradient and shimmers
the normal). Single-level warp on the default path (each level roughly doubles FBM cost).

---

## Substrate sharing

`GooBlob` composes `useWebGLCanvas` — SHARED CODE, per-instance CONTEXT (`facet: integration, offscreen-park`):

- A demand-driven rAF, a three-reason suspend `Set` (`tab-hidden` | `off-screen` | `manual`, ORed, one writer
  per reason), content-visibility offscreen park (`contentvisibilityautostatechange`), an IntersectionObserver
  `rootMargin:200px` warm-band fallback, `document.hidden` tab park, a LIVE-monitored `prefers-reduced-motion`
  freeze (`matchMedia change` — a CSS reset cannot reach a JS rAF), and context-loss heal. An offscreen/hidden
  surface attaches ZERO frames.

- The shared procedural-color GLSL chunk (the OETF + Ottosson OKLCh matrices + FBM) and the `ColorHarmony`
  vocabulary are shared with Aurora; the return space is deliberately NOT unified (the blob exits through gamma
  to a premultiplied gel surface, Aurora stays linear for a full-bleed background).

- A `ColorResolver` injection seam lets a consumer (e.g. value.js) inject its OWN color — the renderer stays
  DOM-free behind a single `resolveTokenColor` leaf that cascade-unwraps `var(--token)` once (cached,
  MutationObserver-driven), never per-frame.

The lifecycle core is backend-agnostic, so a future WebGPU sibling would inherit the park gate and quiescence
predicate for free — but see [Architecture decision](#architecture-decision--webgl2-floor-webgpu-non-goal).

---

## Accessibility

`facet: accessibility, prm-rest-pose`.

- **Decorative.** The canvas is `aria-hidden`; it announces nothing.

- **Clickable variant.** A real `<button>` with an accessible name + keyboard activation — NEVER `aria-label`
  on the canvas element.

- **WCAG 2.2.2 (Pause, Stop, Hide), Level A.** A continuously-running, auto-starting, >5s, non-essential
  background carries a user-reachable pause control — `v-model:paused`, wired to a `<DockBackgroundToggle>` and
  available to ALL users (NOT gated behind reduced-motion). This is DISTINCT from the reduced-motion freeze.

- **WCAG 2.3.3 (reduced motion).** Under `prefers-reduced-motion: reduce`, the substrate paints ONE composed
  rest pose then parks. The pose is a DESIGNED poster, not an arbitrary clock freeze: peak-round body
  (`uPulsePhase = PI/2`, the "inhale held" fullest extent), satellites tucked/absorbed into one round body,
  mood snapped to neutral (deterministic), zero stretch, trail collapsed — and the LIT dome KEPT (only the
  time-driven inputs freeze; a flat gray poster would be a regression). Re-blend on un-reduce, not snap. No
  blob-local `matchMedia` — the substrate owns the freeze.

---

## Performance

`facet: perf-budget, ray-marched-vs-2D, webgpu-compute`. Fill-rate is the only cost and it is quadratic in DPR
(the `≤2` clamp is load-bearing). Levers, highest-ROI first:

- **Quiescence park** — the biggest onscreen lever. The loop parks when the creature is genuinely at rest (mood
  settled AND pointer spring `|v| < eps` AND trail collapsed AND click pulse 0 AND no satellite mid-merge) and
  wakes from the satellite phase scheduler — an idle ambient blob renders zero frames between phase transitions
  instead of burning 60fps of FBM×2 + OKLCh-per-fragment forever. (False-park is a correctness hazard: every
  motion source must be ORed, and a pending auto-mood arc is SCHEDULED, not polled.)

- **Offscreen / hidden park** — inherited from the substrate (content-visibility + IntersectionObserver +
  `document.hidden`).

- **Pre-FBM bounding early-out** — a transparent WRITE (not GLSL `discard`, which disables the mobile
  tiled-renderer fast path) where `length(uv) > maxReach`, BEFORE the two FBM calls + the OKLCh round-trip;
  `maxReach` is padded by the smin band + noise so it never clips the meniscus.

- **Analytic-gradient normal** — deletes the 4-tap tetrahedron (4 full field re-evals per lit pixel); no 4-tap
  to gate.

- **`quality: 'full' | 'half'`** — a half-res FBO + free bilinear upsample (~4× fragment savings); the blob is
  the ideal candidate because the soft FBM/AA edge hides the interpolation.

- **Multi-instance context cap** — browsers hard-cap ~8-16 live WebGL contexts/page; one context per `GooBlob`;
  parking the rAF does NOT release it. Route static/ambient instances to `WatercolorDot` (zero GL context) and
  reserve `GooBlob` for the ONE interactive hero. Tier cascade: WebGL2 SDF hero → `WatercolorDot` ambient →
  static poster.

---

## Architecture decision — WebGL2 floor, WebGPU non-goal

Single-pass 2D-SDF in a WebGL2 fragment shader is the correct, permanent floor for a flat UI droplet
(`facet: ray-marched-vs-2D, webgpu-compute, perf-budget`):

- **2D field beats raymarching** — flat `O(W·H·N)` cost, zero overdraw, no per-fragment step loop,
  resolution-independent `fwidth`-AA, the "volume" faked cheaply by the dome-lifted 2D gradient. Raymarching
  only wins for genuine refraction-through-thickness / volumetric scattering / self-shadowing / 3D-composited
  depth — none of which a flat ambient mark needs.

- **WebGPU compute is a net LOSS at ≤4 nuclei** — compute beats a fragment field only for
  hundreds-to-thousands of balls (the accumulation bottleneck) or 3D marching-cubes. This blob is body + ≤3
  satellites + ≤15 trail + ≤4 stops, uploaded as ~12 uniforms; a compute pre-pass adds a buffer round-trip +
  sync barrier with zero field-eval savings.

- A decorative background cannot carry a hard WebGPU dependency (Baseline-2026 "newly available"). If WebGPU is
  ever adopted it is a SUBSTRATE-WIDE decision (Aurora's WGSL path), never blob-local.

**WebGPU and particle-swarm metaballs are explicit, research-backed NON-GOALS.**

---

## Examples

```vue
<!-- Ambient hero backdrop — decorative, warm, pausable -->
<GooBlob aria-hidden :config="{ satellites: 2 }" />
```

```vue
<!-- Thinking / status indicator — mood ENCODES app state -->
<GooBlob ref="blob" :config="{ satellites: 3 }" />
<script setup>
watch(appState, (s) => blob.value?.setMood(
  s === "thinking" ? "curious" : s === "done" ? "excited" : "sleepy"
));
</script>
```

```vue
<!-- Pausable per WCAG 2.2.2 — wired to the dock toggle -->
<GooBlob v-model:paused="paused" />
<DockBackgroundToggle v-model:paused="paused" />
```

```ts
// Themed — warm default, or an explicit cold/neon consumer preset
import { GooBlob } from "@mkbabb/glass-ui/goo-blob";
// default: warm-cream glass identity (no color prop needed)
// opt-in:  <GooBlob color="oklch(0.7 0.16 250)" />   // a consumer-owned cold preset
```

---

## Design considerations

- **Decorative ≠ determinate.** A blob signals presence and state, not a measurable quantity. Do not use it as a
  progress bar or a percentage gauge.

- **Restraint.** Ambient motion supports focus; keep arousal in the calm band for decoration. Fast motion reads
  cheap and is a vestibular hazard — cap the excited ceiling so even max-arousal stays lively-not-frantic.

- **One hero, many siblings.** The WebGL context budget means a page should hold ONE live `GooBlob`; everything
  ambient is a `WatercolorDot`.

- **Warm-cream is the house identity.** The un-themed blob belongs to the glass-ui cream-glass system. Cold/neon
  is a consumer preset, not a library default; consumers inject color through the `ColorResolver` seam.

- **The mood is the API.** Drive expression through `setMood`/the `{valence, arousal}` derivation, not by
  hand-tweaking individual motion params — that is the principled single-surface contract.

---

## Reference lineage

`facet: reference-surveys`. Inigo Quilez — smooth-minimum (2024 normalized rewrite), `normalsSDF`,
`distgradfunctions2d` (`sdgCircle` + value-gradient smin), domain warp, gradient noise, cosine palettes;
Codrops/Tympanus 2025 droplet (the pointer-trail pseudopod + the `k`-as-ratio coordinate-scale lesson); Alan
Zucconi / John Austin fast-SSS (Fresnel-masked wrap back-light + Beer-Lambert); Björn Ottosson OKLCh;
Russell's circumplex model of affect (the valence/arousal mood spine) + Valdez-Mehrabian color-emotion;
Disney 12 principles (squash-and-stretch, anticipation, follow-through); Microsoft Copilot "Mico" (the
conversational-state blob affordance); Apple Liquid Glass (WWDC23/WWDC25 restraint + warm specular catch-light)
and Stripe/Linear ambient-gradient discipline; WCAG 2.2.2 (Pause, Stop, Hide) + 2.3.3 (reduced motion);
frost.kiwi + Jimenez IGN (banding/dither).
