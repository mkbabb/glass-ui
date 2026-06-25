# RESEARCH-1 — LIVE ROOT-CAUSE: three procedural vizzes "broken"

Live-inspected on `http://localhost:5173` via chrome-devtools (Chrome on **apple/metal-3**,
dpr 2). Every defect root-caused to the exact token/recipe/closure + confirmed with live
computed values. No fixes applied yet — this is the diagnosis.

## TL;DR — the confirmed root causes

| # | Surface | User defect | Root cause (confirmed) | Class |
|---|---------|-------------|------------------------|-------|
| 1 | fourier-field | "options do not even work" | Renderer captures a **frozen `cfg.value` snapshot** at setup; never re-reads live config | dead-config |
| 2 | goo-dot | "totally broken" (config) | **Same frozen-snapshot** class — `useGooDotMatrix` captures `options.config` once; story spreads a new object | dead-config |
| 3 | blob + goo-dot | "broken TOTALLY"/"totally broken" (render) | **WebGPU never selected** — `requestDevice()` takes ~3478ms > `WEBGPU_ACQUIRE_TIMEOUT_MS` (2500ms) → FIX-5 falls to webgl2. Chrome renders OK on webgl2; the **WebGPU primary path is the broken-on-Safari surface** (masked here by the fallback) | substrate |
| 4 | blob (watercolor) | "dashed outline does not follow the proper path" | Ghost stroke is a hardcoded `<ellipse rx=46 ry=46>` **CIRCLE** + random `feDisplacementMap` — NOT the seeded `border-radius` blob silhouette | geometry |
| 5 | blob (+ every page) | "hero text should NOT scroll like this on every page" | `.story-hero-shrink` applies `position: sticky; top:0` + `scroll()`-timeline `scale(1→0.5)` to the title cluster on EVERY StoryPage; the shrunk sticky title overlaps scrolling body content | W-STICKY-TITLE-CONDENSE |
| 6 | fourier-field | "does not follow the cursor properly" | Scrub maps **pointer-X → head_t PHASE** (comet moves along its fixed orbit), NOT a spatial follow; Y ignored; `positionLerp 0.22` adds lag. Wire is live (head DOES move) — it's a design/mapping mismatch | interaction |

The substrate canvas-resize FIX 5 (acquire-timeout) **holds** — it is actively firing and
preventing a hang; the canvas backings are all correct on-screen (see below). It is NOT the
cause of any "broken" — it is the reason blob/goo-dot still render (on webgl2) in Chrome.

---

## Live evidence — canvas backings are all CORRECT

Every viz canvas sizes correctly when on-screen (no 300×150 stuck buffer):

| Surface | client | backing | expected (×dpr2) | ctx | stuck? |
|---------|--------|---------|------------------|-----|--------|
| blob hero | 768×768 | 1536×1536 | 1536×1536 | webgl2 | no |
| blob studio | 563×563 | 1126×1126 | 1126×1126 | webgl2 | no |
| goo-dot | 1033×460 | 2066×920 | 2066×920 | webgl2 | no |
| fourier | 623×521 | 1246×1042 | 1246×1042 | webgl2 | no |

NB: a transient `300×150` reading appears ONLY while the host is offscreen under
`content-visibility: auto` (the browser content-skips the layout); it self-corrects to the
real backing once on-screen. Not a bug.

Console: **zero shader/WebGPU errors** on any of the three pages (only the unrelated
`<TooltipProvider>` non-element-root Vue warn + a11y label issues). `gl.getError()` = 0,
context not lost.

**All three vizzes RENDER FINE in Chrome** (visually confirmed via screenshots): blob = lit
gold metaball; goo-dot = warm-cream dot-field metaball; fourier = warm-amber epicycle chain +
reconstructing curve. The "broken TOTALLY" reports are NOT reproduced on the Chrome/webgl2
path → they are the **WebGPU-primary path** (Safari 26, native Metal WebGPU), masked here by
the FIX-5 fallback. See defect #3.

---

## Defect #1 — fourier-field config is DEAD (the frozen snapshot)

**Confirmed live.** Dragging the Harmonics(N) slider 4 → 16 updates the readout text
(`N 16 / 16`) but the **rendered curve is byte-identical to N=4** (screenshotted both states:
same simple ellipse + 2-3 epicycle arms, NOT the dense 16-term reconstruction).

### The exact mechanism

The cascade:

```
demo/stories/substrates/fourier-field.vue
  fieldConfig = reactive<FourierFieldConfig>({ ...DEFAULT, get harmonics(){...}, get interactive(){...}, ... })   // LIVE reactive getters
        │  :config="fieldConfig"
        ▼
src/components/custom/fourier-field/FourierField.vue
  const cfg = computed(() => ({ ...base, intensity, interactive }))   // ← SPREAD flattens the reactive getters into STATIC primitives
  const renderer = useFourierField(canvasRef, { config: cfg.value, ... })   // ← .value read ONCE at setup()
        │
        ▼
src/components/custom/fourier-field/composables/useFourierField.ts
  const { config } = options;            // captures the frozen snapshot by reference
  setupGL/setupWGPU({ config, ... })
        │
        ▼
src/components/custom/fourier-field/composables/fourierFieldGLSetup.ts
  const { config } = deps;               // captured in closure
  function frame() { ...Math.min(config.harmonics, phasorCount)... }   // reads the FROZEN harmonics every frame
```

Two breaks compound:
1. `cfg = computed(() => ({ ...props.config, ... }))` — the spread in `FourierField.vue`
   **flattens** the story's reactive getters into a plain static object.
2. `useFourierField(canvasRef, { config: cfg.value })` reads `.value` **once** at setup; the
   renderer/setup closures capture that one object and read `config.harmonics`,
   `config.showEpicycles`, `config.epicycleArms`, `config.trailArc`, `config.intensity`,
   `config.harmonicScale` etc. from it FOREVER. **No `watch(() => props.config, …)` re-feeds
   the renderer.**

Live confirmation: `FourierField` instance `exposed = [backend, pause, resume, wake, renderAt,
setHeadT]`; `props.config` IS the live reactive `fieldConfig` (all getter keys present) — but
the renderer never re-reads it. `backend = "webgl2"`.

### The fix (the model already exists)

**GooBlob does this RIGHT** and is the template to copy. `GooBlob.vue` builds a `renderConfig`
**reactive Proxy** over the LIVE config (lines ~81-96, comment "AY.W-BLOB-CONFIG D1 — the LIVE
config… the renderer closes over ONE config object") and passes `config: renderConfig` so the
per-frame closure reads live values. FourierField must do the same: pass a **live config
reference** (not a `cfg.value` spread snapshot) — either a reactive proxy/getter, or feed the
renderer a `getConfig: () => cfg.value` indirection matching the existing
`getSpectrum`/`getPalette`/`getHeadT` getter pattern, so each frame re-reads. The spread in
`cfg` must NOT flatten the reactive source.

`FourierFieldGLSetup`/`FourierFieldWGPUSetup` should consume config via a getter
(`getConfig()`) per frame rather than the destructured `const { config } = deps` capture.

---

## Defect #2 — goo-dot config is DEAD (same class)

**Confirmed.** Same frozen-snapshot class, slightly worse plumbing:

```
demo/stories/substrates/goo-dot.vue
  const config = reactive<GooDotConfig>({ ...GOO_DOT_PRESET_WARM, interactive: true })
  const liveConfig = computed(() => ({ ...config }))      // ← fresh SPREAD object each compute
        │  :config="liveConfig"
        ▼
src/components/custom/goo-dot-matrix/GooDotMatrix.vue
  const { config = DEFAULT_GOO_DOT_CONFIG } = defineProps()
  const renderer = useGooDotMatrix(canvasRef, { config })  // passes prop
        │
        ▼
useGooDotMatrix.ts:98  const { config } = options;   // ← captured ONCE; field = config.field captured too
```

`useGooDotMatrix` destructures `const { config } = options` and immediately `const field =
config.field` at setup. Both the GL and WGPU `buildGLSetup`/`buildWGPUSetup` closures read
`config.variant`, `config.interactive`, `config.dotPixelSize`, `config.field.*` etc. from this
captured object. When the story's `liveConfig` recomputes to a NEW object, the prop updates but
the captured `config` reference still points at the FIRST snapshot. The variant toggles
(dot-field / dot-dither / dot-lattice / dot-sphere) and the `interactive` switch never reach
the renderer.

### The fix
Same as #1 — feed the renderer a live config reference (reactive proxy or `getConfig()`
getter), don't capture `options.config` once. The story's `liveConfig` spread should be a
stable reactive object (or the component should proxy it live, the GooBlob pattern).

---

## Defect #3 — WebGPU is NEVER selected (the 2500ms acquire-timeout < real device-acquire)

**This is why blob/goo-dot are "broken TOTALLY" for the user (Safari) but render in Chrome.**

### Live timing trace (hooked `requestAdapter`/`requestDevice`)

```
262ms requestAdapter CALLED
1058ms requestAdapter RESOLVED adapter        (~800ms)
1058ms requestDevice CALLED
4536ms requestDevice RESOLVED                 (~3478ms)   ← EXCEEDS WEBGPU_ACQUIRE_TIMEOUT_MS = 2500
```

`useWebGPUCanvas.ts` `WEBGPU_ACQUIRE_TIMEOUT_MS = 2500` (FIX 5) races the acquire; on this
metal-3 Chrome `requestDevice()` takes ~3.5s, so the timeout WINS → `WebGPUInitError
("acquire-timeout")` → `useGpuSubstrate.fallToWebGL2()` → the viz silently renders via webgl2.

Confirmed: `createRenderPipeline` was called **0 times** (`__pipelineCreates: 0`) and `0`
captured WebGPU errors — the fall happens at device-acquire, BEFORE any pipeline/shader.
Every viz canvas resolved `webgl2` despite `navigator.gpu` present + adapter `{vendor: apple,
architecture: metal-3}` + a trivial pipeline validating `OK` + a manual `requestDevice()`
acquiring fine.

### Why this is the "broken" report
- In **Chrome** (here): the timeout fires, webgl2 takes over, blob/goo-dot RENDER. Working.
- On **Safari 26** (the user's "Safari" north-star + the "broken" reports): WebGPU is the
  primary; native Metal `requestDevice()` is fast (no timeout), so the **WebGPU primary path
  RUNS**. If that WGSL/binding path has a bug, the viz is broken on Safari while fine on
  Chrome. The Chrome fallback **masks** the WebGPU-path bug.

### Two coupled issues to fix
1. **The acquire-timeout (2500ms) is too tight for the metal-3 cold device-acquire (~3.5s).**
   On a slow-first-acquire host EVERY viz silently downgrades to webgl2 — WebGPU is never
   exercised even where it would work. The device DID resolve at 4536ms (after the timeout
   already built webgl2) — wasted acquisition. Consider: raise/adapt the ceiling, or warm a
   single shared device once (cache `requestAdapter()`/`requestDevice()` across vizzes so the
   slow cold-acquire is paid ONCE, not per-canvas and re-raced against 2500ms each time).
2. **The WebGPU primary render path must be verified end-to-end on a real WebGPU device**
   (Safari 26 / a Chrome whose acquire is fast, or with the timeout raised). I could not
   observe the WGPU render here because the fallback always wins. The blob WGSL uniform bridge
   (`uniformBridgeWGPU.ts`, 592-byte vec4-lane SoT) looks alignment-sound on inspection, but
   the actual WGSL render output must be paint-verified on-device — that is where the user's
   "broken TOTALLY" lives. **The fix is incomplete until the WebGPU path is confirmed to
   render** (Safari-compatible, the binding north star).

NB: GooBlob + GooDotMatrix + FourierField all DO provide `setupWGPU`
(`useMetaballRenderer.ts:336`, `useGooDotMatrix.ts`, `useFourierField.ts`), so they all attempt
WebGPU-first and all fall back here.

---

## Defect #4 — WatercolorDot ghost outline traces a CIRCLE, not the seeded silhouette

**Confirmed live** (`/substrates/blob`, the ghost row). The solid dots are clearly asymmetric
organic blobs; the ghost dashed outlines are near-perfect circles — a glaring mismatch.

### The exact values
First ghost swatch (119×119 box):
- box `border-radius` (the seeded silhouette, set by `useWatercolorBlob`):
  `60.9072% 43.6223% 21.9287% 59.7097% / 65.2026% 44.7639% 35.308% 25.7651%` — a lumpy 8-value
  asymmetric superellipse.
- ghost stroke shape: `<ellipse cx=50 cy=50 rx=46 ry=46>` — a **perfect CIRCLE**.

### The mechanism (`WatercolorDot.vue` template, `variant === 'ghost'`)

```html
<ellipse class="watercolor-ghost-stroke" cx="50" cy="50" rx="46" ry="46"
         fill="none" stroke="var(--watercolor-color)" stroke-width="2"
         vector-effect="non-scaling-stroke" :style="{ filter: filterUrl }" />
```

The stroke is a hardcoded `rx=46 ry=46` circle, perturbed only by the shared
`feDisplacementMap` `feTurbulence` noise. The component comment CLAIMS "a ghost of a given
seed carries the solid dot's outline (both read the same `useWatercolorBlob` morph)" — but the
code **never uses `blob.borderRadius`** for the stroke path. The displacement filter adds
RANDOM noise wobble, not the seeded silhouette shape. So the ghost outline is a noise-jittered
circle, geometrically disconnected from the box's seeded `border-radius` blob.

Compounding: `preserveAspectRatio="none"` stretches the 100×100 viewBox into a non-square box,
making the `feDisplacementMap` displacement anisotropic and the dash spacing uneven.

### The fix
The ghost stroke must trace the **same seeded silhouette** the solid dot's `border-radius`
renders. Options (idiomatic, no new dep):
- Trace the box as an SVG `<rect>` with per-corner `rx`/`ry` derived from `blob.borderRadius`
  (the 8-value superellipse → an SVG rounded-rect path), OR
- Generate the superellipse `<path>` from the seeded radii (`useWatercolorBlob` already owns
  the seeded shape — expose a path/d generator beside `borderRadius`), OR
- Drop the perfect ellipse and stroke the actual silhouette `<path>` (with the wet filter as
  the bleed, not the shape source).
The seed→silhouette must be the SINGLE source for both the solid box `border-radius` AND the
ghost stroke path, so a ghost of a given `color+seed` traces the solid dot's outline exactly
(the component's stated contract, currently false).

---

## Defect #5 — the hero title sticky-scroll/condense (W-STICKY-TITLE-CONDENSE)

**Confirmed** — the "GooBlob" hero title visibly overlaps the scrolling body content
(screenshotted), and the behaviour applies to EVERY StoryPage.

### The mechanism

`StoryPage.vue` (~line 96): the title is "wrapped in the `.story-hero-shrink` **sticky
register** so it shrinks into a slim sticky header on scroll (the iOS-27 large-title)."

`demo/stories/story-hero.css:227`:
```css
.story-hero-shrink {
    position: sticky;
    top: 0;
    z-index: 2;
    transform-origin: left top;
}
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    @keyframes story-hero-shrink { from { transform: scale(1) translateY(0) } to { transform: scale(0.5) translateY(-0.25rem) } }
    .story-hero-shrink { animation: story-hero-shrink linear both; animation-timeline: scroll(); animation-range: 0 240px; animation-fill-mode: forwards; }
  }
}
```

The hero title cluster is `position: sticky; top:0; z-index:2` on every page and `scale`s
1→0.5 over the first 240px of scroll. Two problems:
1. **Universal** — it rides every `StoryPage` (the user: "should NOT scroll like this on every
   page").
2. **Overlap** — the sticky cluster stays pinned at `top:0; z-index:2` while the body slides UP
   underneath it; `transform: scale(0.5)` shrinks the paint but the **sticky box still occupies
   its pre-scale layout height**, and the body content scrolls into/under it → the title
   overlaps the body text (visible in the screenshot).

### The fix (W-STICKY-TITLE-CONDENSE — the fold)
Per the user mandate, the hero title should NOT sticky-condense on every page. Either retire
the universal `.story-hero-shrink` sticky+scroll-timeline register (make the hero a normal
flowing header that scrolls away), or scope the condense to an explicit opt-in and fix the
layout-reserve so a (genuinely-wanted) sticky condensed header reserves its shrunk height and
never overlaps the body. The current universal sticky-scale-overlap is the defect.

---

## Defect #6 — fourier cursor "does not follow the cursor properly"

**The wire is LIVE** (not dead): scrubbing the pointer left vs right DOES move the comet head
(left x=0.1 → head at 990,624; right x=0.9 → head at 944,488 — `headMoved: true`). The pointer
reaches the `.fourier-field` wrapper (top hit element, `pointer-events: auto`,
`fourier-field--interactive` present), normalized X correct (0.2/0.8 confirmed).

So this is a **mapping/design mismatch**, not a broken binding:

`useFourierField.ts` `onFrame()`:
```js
if (config.interactive && pointer.active.value) {
    headT = pointer.smoothedPosition.value.x % 1;   // pointer-X → loop PHASE
    momentum = pointer.burst.value * 4.0;
    return;
}
```

1. **Phase-scrub, not spatial follow.** Pointer-X maps to `head_t` (the loop phase). The comet
   head then traces its **predetermined Fourier curve** at that phase — it moves to an
   arbitrary point ON the curve, NOT to where the cursor is. The user expects the head/curve to
   track UNDER the cursor (a direct spatial follow); the phase-scrub feels disconnected ("does
   not follow properly").
2. **Y is ignored** — only `smoothedPosition.x` is read; vertical cursor movement does nothing.
3. **Lag** — `positionLerp: 0.22` (`usePointerVelocityField`) heavily smooths, and
   `headT = smoothedPosition.x` adds perceptible latency; the head trails the cursor.
4. **Caveat:** `config.interactive` is read from the frozen snapshot (defect #1) — it happens
   to be `true` here, but the dead-config fix must keep it true.

### The fix
Make the cursor interaction read as a real follow with liquid weight (the
[[feedback-liquid-weight-universal]] law):
- Either map the pointer **position** to a spatial attractor the curve/head leans toward (the
  head follows the cursor with inertia/spring), or keep the scrub but make it read as
  intentional (e.g. tie head_t to a 2D radial/angular cursor mapping, use both X and Y), and
  tune the smoothing so the response has weight without dead lag.
- Consider a snappier `positionLerp` for the scrub channel (or a spring) so the head tracks
  with momentum + a small overshoot, not a laggy phase-slide.

---

## Files to touch (for the fix waves)

- **Dead config (#1, #2):**
  - `src/components/custom/fourier-field/FourierField.vue` (the `cfg.value` snapshot → live ref)
  - `src/components/custom/fourier-field/composables/useFourierField.ts` (`const { config }` → `getConfig()`)
  - `src/components/custom/fourier-field/composables/fourierFieldGLSetup.ts` + `fourierFieldWGPUSetup.ts` (per-frame config read)
  - `src/components/custom/goo-dot-matrix/GooDotMatrix.vue` + `composables/useGooDotMatrix.ts` (same)
  - **Reference (the correct pattern):** `src/components/custom/goo-blob/GooBlob.vue` `renderConfig` proxy + `useMetaballRenderer.ts`
- **Substrate / WebGPU path (#3):**
  - `src/composables/glass/webgpu/useWebGPUCanvas.ts` (`WEBGPU_ACQUIRE_TIMEOUT_MS`, the cold-acquire ceiling / shared-device warm)
  - `src/composables/glass/webgpu/useGpuSubstrate.ts` (the fall) + the WGSL setups
    (`metaball.wgsl.ts`, `goo-dot.wgsl.ts`, `fourier-field.*.wgsl.ts`) — verify on a real
    WebGPU device (Safari 26)
- **Watercolor ghost (#4):**
  - `src/components/custom/watercolor-dot/WatercolorDot.vue` (the `<ellipse>` → seeded silhouette path)
  - `src/components/custom/watercolor-dot/useWatercolorBlob.ts` (expose a seeded silhouette path generator beside `borderRadius`)
- **Hero sticky-scroll (#5):**
  - `demo/stories/story-hero.css` (`.story-hero-shrink` register)
  - `demo/stories/StoryPage.vue` / `StoryHero.vue` / `StoryHeader.vue` (the `.story-hero-shrink` wrap)
- **Fourier cursor (#6):**
  - `src/components/custom/fourier-field/composables/useFourierField.ts` (the scrub mapping)
