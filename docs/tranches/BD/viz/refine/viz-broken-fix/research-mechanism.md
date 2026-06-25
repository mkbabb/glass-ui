# RESEARCH-3 — the FIX MECHANISM (glass-ui internals): the broken procedural vizzes

**Role.** Map the EXACT glass-ui tokens / recipes / files to retune to fix the
viz-broken defect cluster (USER-FEEDBACK 2026-06-23 BATCH 2, group C) —
WITHOUT re-forking any primitive, no-dual-path, compose what ships.

**Binding north star.** `design.md` + the iOS-27 Liquid Glass six-layer optical
composite (backdrop blur+saturate · warm tint · edge rim · inner catch-light ·
drop shadow · grain) + glass+PAPER morphism + the `BA.W-NO-GRAY` warm-chroma floor
(the procedural field is warm-cream MATERIAL, never gray) +
`[[feedback-liquid-weight-universal]]` (inertia / weight / bounce / squish on ALL
motion). Compositor-only, PRM-carved, Safari-compatible. NO quick workarounds.

---

## 0. THE DEFECTS — verbatim (group C)

| # | Route | Verbatim | Class |
|---|---|---|---|
| C1a | `/substrates/blob` | "totally broken" | RENDER — blank/un-sized canvas |
| C1b | `/substrates/blob` | "the dashed outline does not follow the proper path" | GHOST — the WatercolorDot `ghost` outline traces a generic ellipse, not the seeded blob silhouette |
| C1c | every page | "the hero text should not scroll like this on every page" | HERO-SCROLL — the scroll-shrink hero is jarring/repetitive (→ W-STICKY-TITLE-CONDENSE) |
| C2a | `/substrates/fourier-field` | "does not follow the cursor properly" | POINTER — the pointer maps X→reconstruction-TIME (a scrub), not a spatial follow |
| C2b | `/substrates/fourier-field` | "These options do not even work" | CONFIG — the configurator options are dead (re-mount / reactive-config wiring) |
| C3 | `/substrates/paper-grid` | "the LINES should not wave, but the CELLS in local boxes should — the grid should TWIST and MORPH as if a wave was passing through it" | RESPEC (shader-content — out of token scope; the knob map is recorded) |
| C4 | `/substrates/dot-matrix` | "should persist more GRAVITY to the cursor, and function more in a 2d space as a background effect" | RESPEC + token — `parallax` too low + the sphere register wants a 2d-background mode |
| C5 | `/substrates/goo-dot` | "totally broken" | RENDER — same blank/un-sized class as C1a |
| C6 | `/substrates/concentric` | "should function as the paper grid, but with concentric LEVEL-SET lines" | RESPEC (shader-content — out of token scope) |

**Two distinct fix-classes.** (A) RENDER/POINTER/GHOST/HERO defects are token /
recipe / wiring fixes — mappable HERE. (B) RESPEC defects (paper-grid cell-warp,
concentric level-set) are SHADER-CONTENT respecs — a NEW math basis, NOT a token
retune; this doc records their config knobs + the seam they ride but the respec is
the prototype agent's GLSL/WGSL work, not a value edit.

---

## 1. THE SHARED ROOT CAUSE — the substrate "300×150 un-sized canvas" (FIX-5, ALREADY IN-FLIGHT)

Both "totally broken" reports (C1a blob, C5 goo-dot) AND any blank/blurry viz share
ONE root cause: the canvas backing store froze at the HTML default **300×150** (or a
1px sliver) and never re-sized to the real box, so the viz painted into a tiny buffer
that CSS upscaled to a blurry/blank smear — OR the WebGPU device never resolved and
`armAsync()` never reached `lifecycle.arm()`, so the canvas was never sized at all.

**This is FIX-5 and it is ALREADY BEING FIXED by a parallel agent** (the working tree
carries the in-flight diffs — DO NOT duplicate, REFERENCE):

- `src/composables/glass/webgl/createCanvasLifecycle.ts` — the
  `onContentVisibilityAutoStateChange` reveal now **UNCONDITIONALLY re-measures**
  (`resume("off-screen"); if (armed && hooks) resize(); wake();`). This closes the
  **born-skipped class**: a canvas mounting offscreen inside a
  `content-visibility: auto` ancestor (every viz wrapper — `goo-blob-wrapper`,
  `goo-dot-matrix-wrapper`, `fourier-field` all set `content-visibility: auto`) is
  content-skipped from frame 0, fires NO `skipped:true` event, so the old
  `resume("off-screen")` guard never called `resize()` and the arm-time `resize()` had
  run while `clientWidth/Height` were 0 → frozen at 300×150 forever.
- `src/composables/glass/webgpu/useWebGPUCanvas.ts` + `webgpuDevice.ts` — a
  `requestDevice()` **hang TIMEOUT** (the live-found `apple/metal-3` adapter resolves but
  the device never settles) now rejects with a typed signal so the picker falls to the
  WebGL2 net (the canvas gets sized + painted) instead of hanging blank.
- `src/composables/glass/webgpu/useGpuSubstrate.ts` — the fall-to-WebGL2 path on
  the device hang.
- `src/components/custom/dot-matrix/shaders/dot-matrix.glsl.ts` — a `#define PI`
  compile-fix for the spliced OKLCH chunk (a separate in-flight viz compile fix).

**RESEARCH-3 verdict on FIX-5: NO new token, NO duplicate edit.** The substrate
resize/device-hang is the shared "totally broken" root and it is handled. The
viz-SPECIFIC fixes below are what REMAINS once the canvas paints at the right size.

**One viz-side COMPLEMENT to FIX-5 (a layout-sizing fence, not a substrate edit).**
The per-viz `resize()` falls back to `config.geometry.canvasSize` (a fixed px) when
`canvas.clientWidth/Height` is 0 (`useMetaballRenderer.ts:312`,
`useGooDotMatrix.ts:229/302`). That fallback paints a SQUARE viz into a non-square box
when the demo host has no resolved height (`block-size: 100%` against an
unconstrained parent). This is a DEMO-LAYOUT concern (the stage/tile must give the
canvas a real box) — the fix is in `demo/stories/substrates/{blob,goo-dot}.vue` +
`VizStudio.vue`/`DockStage` host sizing (a `min-block-size` / `aspect-ratio` on the
canvas tile), NOT a library token. Recorded for the prototype agent.

---

## 2. C1b — THE GHOST DASHED OUTLINE follows the WRONG path (WatercolorDot `variant="ghost"`)

### The defect
`src/components/custom/watercolor-dot/WatercolorDot.vue:204-224` renders the ghost as a
**fixed `<ellipse cx=50 cy=50 rx=46 ry=46>`** + the wet `feDisplacementMap` filter. But
the SOLID swatch silhouette is a CSS **`border-radius`** blob (`randomRadii` → an 8-value
`border-radius` string, `useWatercolorBlob.ts:71`). The ghost shares the displacement
filter but NOT the base silhouette — so a circle-plus-noise dashes a generic disc, while
the solid dot of the same seed fills a lumpy `border-radius` blob. The README CLAIMS
"a ghost of a given seed carries the solid dot's outline" — it does NOT (the literal
"does not follow the proper path" defect).

### The fix — trace the SAME `border-radius` silhouette (compose, no re-fork)
The seeded silhouette IS the `border-radius` string `useWatercolorBlob` already emits.
The ghost stroke must render THAT shape, not an ellipse. Two compositor-safe options;
**OPTION A is the idiomatic minimal fix.**

**OPTION A (PICK) — a bordered DIV clipped to the silhouette, not an SVG ellipse.**
Replace the `<svg><ellipse>` ghost overlay with a `<div class="watercolor-ghost-stroke">`
that:
- sizes to the box (`position: absolute; inset: 0`),
- takes the SAME `border-radius: var(--watercolor-ghost-shape)` the solid swatch root
  takes (bind `activeBorderRadius` onto it — the SAME `blob.borderRadius` source),
- paints a **dashed BORDER** (`border: 2px dashed var(--watercolor-color)`) — which
  FOLLOWS the `border-radius` silhouette exactly (a CSS border hugs its own
  `border-radius`),
- carries the SAME `filter: var(--watercolor-filter)` wet displacement so the dashes
  wobble into the organic outline.

This is byte-faithful to the design intent ("the displacement wobbles the dashed
outline INTO the seeded organic outline") AND finally tracks the real silhouette,
because the border and the fill read the SAME `border-radius`. The dashed-rounded-rect
"bunching" the README warned about is a NON-issue at the blob's soft corners (the
`border-radius` is a smooth super-ellipse, not a sharp rect); if a corner reads tight,
the `--watercolor-dash`/`--watercolor-gap` axis already tunes it.

**Edit (`WatercolorDot.vue`):**
- DELETE the `<svg class="watercolor-ghost-overlay"><ellipse rx=46 ry=46></svg>` block
  (template ~204-224).
- ADD `<div v-if="variant === 'ghost'" class="watercolor-ghost-stroke"
  :style="{ borderRadius: activeBorderRadius, filter: filterUrl }" />`.
- CSS (`.watercolor-ghost-stroke`, scoped): `position:absolute; inset:0;
  border: var(--watercolor-ghost-weight, 2px) dashed var(--watercolor-color);
  border-radius: inherit; pointer-events:none;` + KEEP the
  `stroke-dasharray`-equivalent via `--watercolor-dash`/`--watercolor-gap` mapped to a
  `border` — a CSS dashed border's dash length is UA-derived, so to keep the
  arc-length control, retain the SVG path approach (OPTION B) ONLY if the demo needs the
  exact dash pitch. For the calm decorative register OPTION A's UA-dash reads correct.

**OPTION B (if exact dash pitch is load-bearing) — an SVG `<path>` from the
`border-radius`.** Convert the seeded `border-radius` to an SVG super-ellipse `<path d>`
(a small pure helper `radiiToPath(radii, w, h)` beside `radiiToCSS` in
`watercolor-dot/prng.ts`) and stroke THAT path with `stroke-dasharray`. This keeps the
exact arc-length dash + `non-scaling-stroke`, at the cost of a new geometry helper. It is
NOT a re-fork (it reuses the SAME `randomRadii` seed source); it is a render-shape add.
**Decision: OPTION A unless the prototype's π shows the UA-dash reads wrong** — A is the
smaller, single-source fix (the border literally inherits the silhouette).

**Tokens touched:** `--watercolor-dash` / `--watercolor-gap` (existing ghost-only axis,
KEEP) + a new `--watercolor-ghost-weight` (default `2px`, the dashed border weight).
NO library-color token (the ghost reads `--watercolor-color`, the consumer's per-dot
color). Compositor-safe (border-radius + filter are not animated per frame — the
liveness is the static seeded silhouette + the cached displacement). PRM-neutral (static).

---

## 3. C2a — FOURIER "does not follow the cursor properly" (the scrub-vs-follow mismatch)

### The defect
`useFourierField.ts:112-120` — when `config.interactive && pointer.active`, the pointer
maps **X → head_t** (`headT = pointer.smoothedPosition.value.x % 1`): the cursor X
position SCRUBS the reconstruction PARAMETER (left rewinds the epicycle assembly, right
fast-forwards it). The user expects the cursor to be FOLLOWED — the comet head / the
field to track the cursor POSITION in 2d — not for X to drive a time-scrub. "Does not
follow the cursor properly" = the viz reacts to X only (Y is ignored), and the reaction
is a time-scrub, not a spatial attraction.

### The fix — make the pointer a SPATIAL ATTRACTOR, not a 1-D time scrub
The shared `usePointerVelocityField` already delivers the full 2-D
`smoothedPosition` (x AND y, normalized 0..1) + `velocity` + `acceleration` + `burst`.
The fix is in the `onFrame` pointer branch (`useFourierField.ts:112-120`) + the WGSL/GLSL
uniform pack — NO new pointer engine, NO second rAF.

Three coordinated legs (the prototype wires the uniform; RESEARCH-3 maps the seam):

1. **Keep a GENTLE time-scrub on velocity, drop the absolute-X-binding.** Instead of
   `headT = pointerX`, advance head_t at the base rate PLUS a velocity term, so the
   cursor's MOTION nudges the clock (a flick fast-forwards, a still cursor lets it drift
   at config speed) — the iOS "scrub-by-drag" feel without the jarring absolute jump:
   ```
   const rate = baseRate + pointerField.velocity.value.x * SCRUB_GAIN + momentum;
   headT = (headT + rate * dt) % 1;
   ```
   This restores continuity (no teleport to `pointerX`) and keeps the flick-momentum.

2. **Add a 2-D pointer-ATTRACT uniform the field reads** (the actual "follow"). Pack
   `pointerField.smoothedPosition` (the full x,y in clip/uv space) into a NEW
   `uPointer`/`uPointerStrength` uniform the fragment/compute reads to BEND the field
   toward the cursor — the comet head + the chain lean toward the pointer (the goo-blob
   `uPointer` lean idiom, applied to the fourier SDF). This is the SHADER seam
   (`fourierFieldGLSetup.ts` / `fourierFieldWGPUSetup.ts` + the
   `uniformBridgeWGPU.ts` typed-struct) — an additive uniform, the field byte-untouched
   at strength 0 (the default-OFF floor).

3. **PRM-safe by construction** — the field freezes (`tick(0)`) under reduce; the scrub
   keeps the position read but drops the velocity term (the existing
   `pointer.smoothedPosition` is held, velocity → 0), so the comet rests where the
   cursor last was, no live motion (the `usePointerVelocityField` PRM contract).

**Constant added:** `SCRUB_GAIN` (~0.15, in `fourier-field/constants.ts`, the velocity→
clock coupling). **Uniform added:** `uPointer` (vec2 uv) + `uPointerStrength` (the
follow-bend depth, default 0). **No spring/clock token** (the existing `periodS` + the
momentum decay are the clock; this is a coupling gain + a spatial uniform).

### C2b — "These options do not even work" (the configurator wiring)
The FourierField SFC closes over `cfg.value` at MOUNT (`useFourierField(canvasRef,
{ config: cfg.value, … })`, `FourierField.vue:142`) — the renderer reads the SNAPSHOT,
not the live reactive config. A configurator option (harmonics / speed / intensity)
mutates `props.config` but the renderer never re-reads it (the same dead-config class
the blob fixed at AY.W-BLOB-CONFIG D1 with `liveConfig()`). **The fix mirrors the blob's
landed pattern (compose, no new mechanism):**

- `useFourierField` must read the config through a **getter** (`() => cfg.value`) the way
  it already reads `getSpectrum`/`getPalette` getters, NOT a one-shot snapshot. The
  per-frame `onFrame` + the setups read `config.speed`/`config.harmonics`/`config.intensity`
  through the getter so a configurator edit reaches the live loop.
- The spectrum is ALREADY a getter (`getSpectrum`) re-read each frame (good); the gap is
  the scalar config fields (`speed`/`intensity`/`harmonics`) passed once. Thread them
  through a `getConfig()` getter (the AY.W-BLOB-CONFIG D1 `liveConfig()` precedent).
- `watch(() => props.config, () => renderer.wake(), { deep: true })` so a parked loop
  repaints on a config edit (the blob's `paletteStops` watcher precedent).

**No token; a reactive-wiring fix.** The seam is `FourierField.vue` (pass a getter, add
the deep config watcher) + `useFourierField.ts` (read config through the getter). The
mechanism is the SHIPPED blob `liveConfig()` pattern, transplanted — NOT a new engine.

---

## 4. C1c — THE HERO-SCROLL "should not scroll like this on every page" (W-STICKY-TITLE-CONDENSE)

### The defect
`demo/stories/story-hero.css:227-262` — `.story-hero-shrink` is `position: sticky; top:0`
with a `scroll()` timeline that **scales the WHOLE cluster `transform: scale(1 → 0.5)`**
over the first 240px. On EVERY page the giant audacious title visibly shrinks + slides as
you scroll — the user finds this repetitive + jarring ("should not scroll like this on
every page"). The mechanism is sound (compositor-only, native scroll(), PRM-gated) but the
EFFECT is too heavy: a 50% scale of the entire eyebrow→title→blurb cluster reads as the
whole header zooming away.

### The fix — CONDENSE, don't shrink-the-whole-cluster
W-STICKY-TITLE-CONDENSE: the hero should condense into a slim sticky bar that holds the
title + subpath chip CALMLY, not scale the whole cluster down by half. Two token/recipe
moves (CSS-only, the native scroll() substrate KEPT — no JS, no Lenis):

1. **Drop the shrink RATIO + soften the range.** `@keyframes story-hero-shrink` `to:
   scale(0.5)` → **`scale(0.82)`** (a gentle settle, not a half-zoom) and the
   `animation-range: 0 240px` → **`0 160px`** (it condenses sooner + holds). The
   transform-origin stays `left top` (the iOS large-title-collapse leading anchor).
   Mint these as TOKENS so the register is tunable: `--hero-condense-scale` (0.82) +
   `--hero-condense-range` (160px) in `story-hero.css` `:root`.

2. **Fade the SUBORDINATE rungs, condense to the title.** The eyebrow + blurb should
   fade as the header condenses (they are supporting; the condensed bar holds the title +
   subpath chip — the route identity). Add a second `scroll()`-timeline keyframe on
   `.story-header-eyebrow` + `.story-header-blurb` (NOT the title/subpath): `opacity:
   1 → 0` over `0 120px`, so the condensed sticky bar is the title + the persistent
   subpath chip alone (the chip already "persists into the shrunk header" per
   `story-hero.css:195`). This is the iOS-27 large-title-collapse READ — the subtitle
   evaporates, the title condenses, the identity persists.

3. **PRM + `@supports` UNCHANGED** — the whole register stays gated behind
   `@supports (animation-timeline: scroll())` + `@media (prefers-reduced-motion:
   no-preference)`; under reduce or a gap engine the static large hero holds (the
   vestibular floor, KEPT).

**Tokens added:** `--hero-condense-scale` (0.82), `--hero-condense-range` (160px),
`--hero-condense-fade-range` (120px) — all `:root` in `story-hero.css`, the single retune
knobs. **Compositor-only** (scale + opacity — `proof:no-layout-animation` holds, no
font-size/width). **No library token** (this is the demo chassis `story-hero.css`).

**Optional (if the user wants NO scroll-effect on content pages):** gate the shrink to
`variant="hero"` ONLY — a content `variant="page"` keeps a static non-shrinking sticky
header. The descriptor is on `StoryHero` (`data-variant`), so a
`.story-hero[data-variant="hero"] .story-hero-shrink { … }` scope confines the condense
to the front-door hero pages and leaves content pages a calm static header. **Decision:
apply the gentle condense everywhere first (the minimal fix); gate to hero-only if the
user still finds it too active.**

---

## 5. C4 — DOT-MATRIX "more GRAVITY to the cursor" + "function in a 2d space as a background"

### The token half (the gravity)
`src/components/custom/dot-matrix/constants.ts` — the cursor influence is the
`parallax` token (default **0.08** — "the screen-center tracks the cursor", line 101) +
the `pointerMode` dimple (repel/attract). 0.08 is a near-imperceptible parallax. The
user wants MORE gravity. **Token retune (DEFAULT lift, presets-in-consumers fence):**
- `parallax: 0.08 → 0.16` (double the cursor-tracking depth — the dots visibly lean
  toward the cursor) in `DEFAULT_DOT_MATRIX_CONFIG`. Bounded ≤0.3 (the documented range).
- The dimple radius / depth (the `pointerMode` repel/attract) — if the SFC exposes a
  `dimpleRadius`/`dimpleDepth` axis, lift the default so the near-cursor dimple reads as
  a real gravity well. (Confirm the knob name in the full `constants.ts`; the `parallax`
  lift is the certain one.)
- The accel-burst (`usePointerVelocityField.burst`) is already consumed — a flick
  brightens/swells near-cursor dots; that's the iOS gel-snap, KEEP.

### The 2-D background register (the respec half)
"function more in a 2d space as a background effect" — the dot-matrix is currently a
SPHERE (`radius: 0.42` globe, `useDotSphere.ts`). The user wants a 2-D PLANE dot-field as
an ambient background (the Metal dotted-bg idiom). This is a NEW render register (a flat
phyllotaxis/grid lattice instead of the sphere projection), an OPT-IN `layout:
"sphere" | "plane"` axis — a SHADER/projection respec, NOT a token retune. RESEARCH-3
records: it rides the SAME `useDotMatrix` + the SAME `usePointerVelocityField`; the
`plane` register drops the sphere depth-shade + the tilted-axis rotation for a flat
parallax field. The prototype agent owns the projection math; the token is the new
`layout` axis default (`"sphere"` keeps back-compat; the demo opts into `"plane"`).

---

## 6. C3 + C6 — PAPER-GRID cell-warp + CONCENTRIC level-set (RESPEC — out of token scope)

These are SHADER-CONTENT respecs, NOT token retunes. RESEARCH-3 records the seam + the
shared basis so the prototype composes, never re-forks:

- **C3 paper-grid** — "the LINES should not wave, but the CELLS in local boxes should —
  the grid TWISTS and MORPHS as if a wave passed through." Today `paper-grid` warps the UV
  sheet (the curl-warp, `flow.glsl.ts`/`flow.wgsl.ts`) so the LINES bow. The respec: warp
  the CELL CONTENTS (a per-cell local-box transform driven by a wave field passing
  through), keeping the line GRID straight but the cells twisting — a local-frame
  deformation, not a global UV warp. The shared `curlFBM` operator
  (`composables/glass/webgl/shaders/flow.glsl.ts`) is the wave-field source (KEEP — it is
  the #3 consumer of the booked operator); the respec is the per-cell application. Shader
  work, prototype-owned.

- **C6 concentric** — "should function as the paper grid, but with concentric LEVEL-SET
  lines (gradient topology)." The respec UNIFIES concentric onto the paper-grid mechanics
  (the SAME warp + line basis) but draws concentric level-set contours of a scalar field
  (a gradient-topology iso-line render) instead of the radial ring-interference. The
  paper-grid + concentric SHARE a level-set/topology basis (the user named it). This is a
  shader respec composing the paper-grid warp + a level-set contour pass — prototype-owned.

**RESEARCH-3 fence:** both respecs ride the SHIPPED substrate (`useGpuSubstrate`) + the
SHIPPED `usePointerVelocityField` + the SHIPPED `curlFBM` chunk — NO new substrate, NO
new pointer engine, NO new color core. The warm-cream palette default holds (the field is
warm MATERIAL — the BA.W-NO-GRAY floor: the contour/cell ink reads `--viz-*` warm-amber,
never a gray line on a gray plate).

---

## 7. THE WARM-CREAM FLOOR — the vizzes are warm MATERIAL, not gray (BA.W-NO-GRAY, EXTEND)

The procedural fields paint their OWN palettes (the goo-blob/goo-dot/fourier/dot-matrix
warm-cream identity), NOT the `--card` plate — so the GLASS-PLATE gray fix
(`glass-abrogate-gray`, `--card` → `hsl(30 85% 96%)`, `WARM_PLATE_FLOOR = 0.01`, ALREADY
LANDED in `proof-no-gray.mjs`) does NOT reach them. The viz warm-floor is enforced
SEPARATELY:

1. **The viz palettes are already warm-cream by default** — `WARM_IDENTITY_PALETTE`
   (goo-dot `constants.ts`), `BLOB_CONFIG_DEFAULTS` cream (goo-blob), `--viz-fourier`
   warm-amber (fourier), the dot-matrix warm-cream dots. The teal/navy is DEMO-LOCAL
   (presets-in-consumers). **No token change** — the warm identity ships.

2. **The "viz reads gray" risk is the BACKDROP, not the field.** A viz over a GRAY card
   plate (the `glass-abrogate-gray` defect) reads gray THROUGH the glass; that's fixed by
   the `--card` warm lift (landed). A viz over the live-substrate read-through
   (`StoryHero` `cardTier: wash/quiet`) now composites over the warmer `--card` — the
   field reads warm-cream over warm-cream. **No viz token; the plate fix carries it.**

3. **GATE EXTENSION — add a viz-palette warm-floor witness to `proof:no-gray`
   (extend in place, no new gate, no new KEY).** The gate asserts the token ladder + the
   plate composites; it does NOT assert the VIZ default palettes clear the warm floor. Add
   a `viz-palette-warm` arm: resolve the DEFAULT palette stops of the four procedural vizzes
   (`WARM_IDENTITY_PALETTE`, `BLOB_CONFIG_DEFAULTS.color.paletteStops`,
   `DEFAULT_FOURIER_CONFIG.palette`, `DEFAULT_DOT_MATRIX_CONFIG` palette) to OKLab and
   assert each clears `STRONG_FLOOR` (0.02) at the warm hue `H ∈ [WARM_HUE_LO, WARM_HUE_HI]`
   (45-85°) — a born-GREEN witness (the palettes are already warm) that GUARDS against a
   future regression dropping a viz default to a gray/teal cast. This is the
   source-arm complement to the live-π viz capture (the binding paint rides W-REFLECT3 /
   the prototype's π). **Gate-impact:** one new SOURCE arm reading the four viz default
   palettes; the existing plate/ladder/dark arms UNTOUCHED.

---

## 8. MOTION — the [[feedback-liquid-weight-universal]] law (the tokens, no re-fork)

Every viz interaction must carry inertia/weight/bounce/squish. The mechanism SHIPS — the
fixes are wiring + gain, not new springs:

- **The pointer physics is the SHIPPED `usePointerVelocityField`** (position →
  velocity → acceleration → burst, the critically-damped lerp, PRM `tick(0)` freeze). The
  fourier follow (§3) + the dot-matrix gravity (§5) + the blob gel-snap (already wired,
  `useMetaballRenderer.ts:234-247`) all READ this ONE field. **No new pointer engine.**
- **The gains are the tunable weight knobs** — `SCRUB_GAIN` (fourier velocity→clock),
  `parallax` 0.08→0.16 (dot-matrix gravity), the blob `clickImpulse` (already tuned). These
  are the per-viz "weight" dials; lift them to make the inertia READ.
- **The viz clocks are READ-ONLY** — the spring/tempo tokens (`DOCK_SPRING`,
  `field.tempo`, `periodS`, the `--spring-*` family) are the W-GLASS-CAL fence; the
  fixes COUPLE to them (velocity-continuity, momentum decay), never re-time them.
- **Compositor-only + PRM-carved + Safari** — every fix above is transform/opacity/
  filter/uniform (no layout animation — `proof:no-layout-animation` holds), PRM-carved
  (the field freezes, the hero condense holds static, the ghost is static), and
  Safari-safe (the WebGL2 fallback net + the `filter`-not-`backdrop-filter` ghost
  displacement + the native scroll() with the static fallback).

---

## 9. THE EXACT EDIT LIST (for the implementer — compose existing primitives, never re-fork)

| # | defect | file | token / recipe | HEAD | NEW |
|---|---|---|---|---|---|
| F5 | C1a/C5 blank | `composables/glass/webgl/createCanvasLifecycle.ts` + `webgpu/*` | substrate resize / device-hang | — | **ALREADY IN-FLIGHT (parallel agent) — do NOT duplicate** |
| F5b | C1a/C5 sizing | `demo/stories/substrates/{blob,goo-dot}.vue` + `VizStudio.vue` | canvas tile box | `block-size:100%` (unconstrained) | give the canvas a real box (`min-block-size`/`aspect-ratio`) — DEMO-LAYOUT |
| C1b | ghost path | `watercolor-dot/WatercolorDot.vue` | ghost overlay | `<svg><ellipse rx=46 ry=46>` | a `<div>` dashed border reading `borderRadius: activeBorderRadius` (Option A) |
| C1b | ghost weight | `WatercolorDot.vue` (scoped CSS) | — | — | `--watercolor-ghost-weight: 2px` |
| C2a | fourier follow | `fourier-field/composables/useFourierField.ts` | `onFrame` pointer branch | `headT = pointerX` (absolute scrub) | `rate += velocity.x * SCRUB_GAIN` (velocity scrub) + pack `uPointer` 2-D follow uniform |
| C2a | fourier constant | `fourier-field/constants.ts` | — | — | `SCRUB_GAIN ≈ 0.15` |
| C2a | fourier uniform | `fourierField{GL,WGPU}Setup.ts` + `uniformBridgeWGPU.ts` | field uniforms | — | `uPointer` (vec2 uv) + `uPointerStrength` (default 0) |
| C2b | fourier config | `FourierField.vue` + `useFourierField.ts` | config pass | one-shot `cfg.value` snapshot | a `() => cfg.value` getter + `watch(() => props.config, … wake, {deep})` (the AY.W-BLOB-CONFIG D1 `liveConfig()` precedent) |
| C1c | hero scroll | `demo/stories/story-hero.css` | `@keyframes story-hero-shrink` | `scale(0.5)`, range `0 240px` | `scale(var(--hero-condense-scale, 0.82))`, range `0 var(--hero-condense-range, 160px)` |
| C1c | hero fade | `story-hero.css` | eyebrow/blurb | (none — scaled with cluster) | a 2nd `scroll()` keyframe `opacity:1→0` over `0 var(--hero-condense-fade-range, 120px)` on `.story-header-eyebrow`/`.story-header-blurb` |
| C4 | dot gravity | `dot-matrix/constants.ts` | `parallax` | `0.08` | `0.16` (DEFAULT lift, ≤0.3) |
| C4 | dot 2d-bg | `dot-matrix/` shaders + constants | render projection | sphere only | OPT-IN `layout: "sphere"\|"plane"` (RESPEC — prototype-owned) |
| C3 | paper-grid cell-warp | `paper-grid/` shaders | UV-warp the lines | lines wave | warp the CELL contents (RESPEC — prototype-owned, rides `curlFBM`) |
| C6 | concentric level-set | `concentric/` shaders | radial rings | ring-interference | paper-grid mechanics + level-set contours (RESPEC — prototype-owned) |
| G1 | gate | `scripts/proof-no-gray.mjs` | `viz-palette-warm` arm | — | the 4 viz default palettes clear `STRONG_FLOOR` at warm hue (born-GREEN guard) |

**FROZEN (do NOT touch):**
- The substrate `createCanvasLifecycle` schedule, the suspend Set, the device-loss
  breaker (FIX-5 touches ONLY the reveal-resize + the device-hang timeout — leave the
  rest).
- The viz spring/tempo clocks (`DOCK_SPRING`, `field.tempo`, `periodS`, `--spring-*`).
- The GL/WGSL shader color math (`procedural-color.glsl.ts`/`.wgsl.ts` — the ONE color
  source; the fourier `uPointer` uniform is a NEW additive uniform, not a color edit).
- The viz default palettes' warm-cream identity (the §7 floor — they ship warm).
- The `--card` warm lift + `WARM_PLATE_FLOOR` (the sibling `glass-abrogate-gray` wave's,
  already landed — the viz fix EXTENDS the gate with a viz arm, does not touch the plate
  arms).
- The `--glass-tint-*` adaptive seam, the W-DARK-MATERIAL dark arm (the viz reads the
  warmer plate through the read-through tier — no tint-seam edit).

---

## 10. WHY THIS IS THE GESTALT FIX, NOT A WORKAROUND

- **The shared "totally broken" root is the substrate, and it is fixed once
  (FIX-5)** — not patched per-viz. The viz-specific fixes are what REMAINS once the
  canvas paints at the right size; RESEARCH-3 does not duplicate the substrate work.
- **Every fix COMPOSES a shipped primitive.** The fourier follow + dot gravity read the
  ONE `usePointerVelocityField`; the fourier config-live mirrors the SHIPPED blob
  `liveConfig()`; the ghost path reads the SHIPPED `randomRadii` silhouette; the hero
  condense rides the SHIPPED native scroll() register. ZERO new engine, ZERO re-fork,
  no-dual-path.
- **The motion law is honored** — inertia/weight/bounce live in the ONE pointer field;
  the gains (`SCRUB_GAIN`, `parallax`) are the tunable weight dials, the clocks are the
  frozen W-GLASS-CAL fence. Compositor-only, PRM-carved, Safari-safe (the WebGL2 net).
- **The warm-cream floor is enforced + guarded** — the viz palettes ship warm; the
  `viz-palette-warm` gate arm born-GREEN guards against a future gray/teal regression;
  the field reads warm-cream over the now-warm `--card` plate (the BA.W-NO-GRAY identity
  end-to-end, glass AND viz).
- **The respecs (C3/C6) are scoped honestly** — they are shader-content respecs the
  prototype owns, riding the shipped substrate + curlFBM + pointer field; RESEARCH-3
  records the seam + the warm-floor fence, not a fake token retune.

---

## APPENDIX — the file map (read by the implementer)

- **Substrate (FIX-5, in-flight — REFERENCE):** `src/composables/glass/webgl/createCanvasLifecycle.ts`, `webgpu/{useWebGPUCanvas,webgpuDevice,useGpuSubstrate}.ts`.
- **Blob render + ghost:** `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` (resize `:312`), `watercolor-dot/{WatercolorDot.vue,useWatercolorBlob.ts,prng.ts}`.
- **Fourier:** `src/components/custom/fourier-field/{FourierField.vue,composables/useFourierField.ts,constants.ts,composables/fourierField{GL,WGPU}Setup.ts,composables/uniformBridgeWGPU.ts}`.
- **Goo-dot:** `src/components/custom/goo-dot-matrix/{GooDotMatrix.vue,composables/useGooDotMatrix.ts,constants.ts}`.
- **Dot-matrix:** `src/components/custom/dot-matrix/{constants.ts,composables/{useDotMatrix,useDotSphere}.ts}`.
- **Hero scroll:** `demo/stories/{StoryHero.vue,StoryHeader.vue,story-hero.css}` (the `.story-hero-shrink` register `:227-262`).
- **Pointer physics (shipped, read-only):** `src/composables/motion/usePointerVelocityField.ts`.
- **Gate:** `scripts/proof-no-gray.mjs` (`WARM_PLATE_FLOOR :222`, the `viz-palette-warm` arm to add).
- **Demos:** `demo/stories/substrates/{blob,goo-dot,fourier-field,dot-matrix,paper-grid,concentric}.vue`, `VizStudio.vue`.
