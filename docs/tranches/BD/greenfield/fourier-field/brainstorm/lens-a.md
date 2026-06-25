# fourier-field — greenfield brainstorm · LENS A (pure iOS-27 fidelity)

> **Lens:** the most faithful, audacious iOS-27 Liquid-Glass interpretation — the
> ℱ-handmark math made a *living harmonic instrument*. Greenfield from first
> principles, DEFTLY unioned with the extant engine. Tranche-DEV only; every
> mechanism, uniform, composable + math symbol below is grep-/live-confirmed at
> HEAD (citations inline). The vivid lift goes to a DEMO preset; `src/` identity
> palette stays byte-frozen (presets-in-consumers).

---

## 0. LIVE INTERROGATION (Chrome, both modes, `/substrates/fourier-field`, HEAD)

Captured live (chrome-devtools, `:5173`, both modes; readback + screenshot):

1. **Does it render a COHERENT epicycle/series field? — YES, the math is alive and
   legible, but it is FAINT and floats over a DEAD ground.** The chain renders: two
   dominant counter-rotating circles (the ±1 phasors), nested smaller orbit rings,
   tip-to-tail arms, a warm coral/amber comet tracing the elliptic partial-sum
   curve, a glowing head dot. In dark mode the comet reads well; the scaffolding
   rings are thin but present. In **light mode the scaffolding collapses** — the
   orbit rings are pale-pink hairlines, near-invisible against the flat tan stage
   (the warm-on-warm wash). The render pass already composites trail + rings + arms
   + joint dots + head halo/core/specular by analytic SDF
   (`render.wgsl.ts:131-196`), but the scaffolding is multiplied `* peak * 0.7`
   (`:151`) — the faintness lever. Verdict: **alive + coherent, but low-presence
   and ground-less** (it does NOT read as a *living harmonic STRUCTURE* — it reads
   as a thin diagram floating on cream).

2. **Is it CURSOR-INTERACTIVE? — only a SCRUB + a follow-lean; NOT draw-your-own.**
   `useFourierField.ts:113-133` — the pointer VELOCITY scrubs `head_t`
   (`rate += pointer.velocity.value.x * SCRUB_GAIN`, `constants.ts:47`) + a flick
   injects clock momentum + the field LEANS toward the cursor (`getPointerLean`,
   `:156-165`, `FOLLOW_LEAN=0.12`). There is **no stroke capture, no
   draw-your-own** — that is exactly the gap `BD.W-FOURIER-INTERACT` already specs
   (the net-new `useFourierStroke` capture→resample→DFT→swap loop). The scrub +
   lean are FIT and KEPT; the draw loop is the genuine interaction headline.

3. **Vivid/warm, no teal/navy? — warm at the default, but DULL on a FLAT field.**
   `--viz-fourier = oklch(0.579 0.201 30.4)` light (hue 30, a warm red-orange —
   GOOD). `--viz-chebyshev` hue 265.5 + `--viz-legendre` hue 317.5 are the
   non-default "cool/violet" configurator picks — `--viz-*` semantic DATA tokens,
   EXPLICITLY out-of-scope of `proof:teal-navy-purge` T1 (the file-scope + chroma
   floor keep them clear; only reachable via a deliberate pick). The default is
   warm. **`bodyBg = rgba(0,0,0,0)` + `stageBg = rgba(0,0,0,0)` + 1 canvas total**
   — the viz sits over a DEAD neutral field, no colourful ground (the §3 systemic
   finding, live-confirmed for the 7th viz). This is the load-bearing dullness root
   cause, not the palette.

4. **Cross-engine + lifecycle + perf.** Twin setups ship
   (`fourierFieldWGPUSetup.ts` compute+fragment / `fourierFieldGLSetup.ts` WebGL2
   SDF). ONE `createGpuSubstrate` picker (`useFourierField.ts:197`), ONE `head_t`
   clock, offscreen-pause + WCAG-2.2.2 `DockBackgroundToggle` seam + PRM frozen-T
   (`:105-109`). The lifecycle is FIT — KEEP byte-for-byte. The math leaf
   (`math.ts`) is machine-precise (3.04e-15 round-trip per the Pass-D critique) —
   NEVER re-touch.

**The three defects, ranked:** (D1) **ground-less + low-presence** — the harmonic
structure does not READ as a living field; it is a faint diagram on dead cream.
(D2) **no draw-your-own** (the headline interaction, already `BD.W-FOURIER-INTERACT`).
(D3) **scaffolding faintness in light mode** (the `* 0.7` + warm-on-cream collapse).

---

## 1. THE CORE IDEA — "THE HARMONIC LOOM": a living warm-field LOOM where rotating phasors WEAVE a luminous thread you can re-thread by hand

The Fourier epicycle chain is the most beautiful idea in the viz set — *the same
math that redraws the ℱ handmark*. The iOS-27 reading is not "a math diagram on a
page"; it is **a precision instrument behind glass** — the way the Apple Watch
breathe-ring or the Weather app's living gradient reads as a *coherent, alive
structure*, not a chart. The greenfield reframes the viz as **THE HARMONIC LOOM**:

- **The GROUND is a living warm-amber field**, not dead cream. The phasors spin
  *inside* a breathing warm-colourful field that the comet's own light suffuses —
  glass-over-painterly, the §3 fix (a NEW warm CSS primitive, NOT
  `auroraFallbackGround` which is blue-cyan; §4 below).
- **The chain is a PHYSICAL LOOM** — the rotating arms read as luminous filaments
  with WEIGHT; the comet is a glowing thread the loom weaves; the head is a hot
  shuttle. Cartoon-technicolor punch: the chain stacks big→small with a layered
  warm-hue ladder, the head a saturated core + white specular (already shipping,
  `:182-194` — REFINE the loudness, not re-invent).
- **You can RE-THREAD it by hand** — draw a closed path with the cursor and watch
  the loom re-assemble YOUR shape from big phasors to small (the
  `BD.W-FOURIER-INTERACT` stroke loop — KEPT, this lens AFFIRMS + folds it, never
  re-forks).

The loom is the gestalt: a **living harmonic STRUCTURE**, alive + legible +
beautiful, in BOTH modes, that you can interrogate (scrub), watch assemble (the N
slider), and re-thread (draw). The boldest move (§2) makes the structure *read as
woven*, not diagrammed.

---

## 2. THE SINGLE BOLDEST MOVE — the COMET LIGHTS THE GROUND: a per-frame warm-amber suffusion the head DEPOSITS into the living field (the comet is the light source, the field is its phosphor)

The §3 fix everywhere else is "paint a static colourful field behind the glass."
For the Fourier loom the audacious move is to make the **field REACTIVE to the
comet** — the head dot is a *moving warm light source* whose glow DEPOSITS a slow
warm-amber suffusion into the living ground as it sweeps, like a long-exposure
light-painting or a phosphor screen. The ground is not a static backdrop the viz
floats over; **the ground is lit BY the viz**.

Mechanism (compositor-cheap, both engines):

- The contained warm-field ground (§4) reads ONE extra uniform/CSS var — the head
  position `--ff-head-xy` (normalized `[0,1]²`, written CPU-side from the same
  `curveSamples[0]` the render shader reads, `render.wgsl.ts:176`) + the head hue
  `--ff-head-hue` (the warm palette base). A `radial-gradient` warm bloom centered
  at `--ff-head-xy` rides on top of the breathing warm mesh — the field is
  *brightest where the comet just was*, fading on a slow `--ff-phosphor-decay`
  clock so a faint warm trail of *where the loom has woven* lingers in the ground.
- This is the iOS-27 "the surface responds to the content" reading (the Weather
  app's sky lights from the sun's position; the Music now-playing field bleeds the
  album hue). It makes the structure read as **a loom weaving light into the
  field**, not a diagram on a static page — the single move that turns "coherent
  but floating" into "a living harmonic structure."
- **Cheap + safe:** ONE `radial-gradient` layer reading 2 CSS vars updated per
  frame via `style.setProperty` (compositor-only, no re-layout — the
  `useGlassBackdropLuminance` precedent of a sampled observer writing a CSS var).
  PRM → the bloom freezes at the frozen-T head position (a static warm halo, no
  sweep). Safari-safe (a plain `radial-gradient`, sRGB interp, no `filter:url`, no
  `backdrop-filter`). Born-RED on HEAD (no `--ff-head-xy` seam exists).

This is the lever the references *cannot* touch — a video backdrop can't be lit by
its own foreground in real time; the loom can. It is the "SURPASS" arm.

---

## 3. VISUAL + MOTION + INTERACTION SPEC

### 3a. The living warm field (the GROUND — §3 fix, the new primitive)

- A NEW warm-colourful CSS primitive `--ff-field` / `.fourier-field-ground` (NOT
  `auroraFallbackGround`, which is aurora's static blue-cyan raster — a teal-navy
  violation + the wrong hue family). A compositor-only **warm-amber mesh**: 2-3
  layered `radial-gradient`s in the `--viz-fourier` warm family (hue 28-70, the
  WARM_IDENTITY hue band) over the cream/charcoal base, on a slow PRM-static drift
  (the `breathing` register — a sub-perceptual `background-position` / opacity
  shimmer on a 16-24s clock). Above the §3 chroma floor (mean OKLab chroma ≥ 0.045
  — the `BD.W-AUR-VIVIDNESS` bar). The boldest-move phosphor bloom (§2) rides on
  top. BOTH modes: light = warm-cream mesh with amber pools; dark = deep-warm
  charcoal with ember pools (the `dark-arm` warm floor).
- It mounts as the viz's OWN contained stage backdrop (behind the `<canvas>`,
  inside the configurator stage `rounded-card`), offscreen-paused with the viz
  (NOT a 2nd GL context — pure CSS, the one-GL-per-route budget is untouched). The
  defined EDGE: the stage `rounded-card` rim + a subtle inner warm vignette so the
  field has a contained boundary (the §3 "colourful field + a defined edge").

### 3b. The loom (the CHAIN — refine the shipped render, never re-fork)

- **Presence lift (D3 fix).** The scaffolding `* 0.7` (`render.wgsl.ts:151`)
  becomes a per-mode-aware presence the DEMO preset drives louder over the new
  field (the rings/arms read because the ground is darker-warm behind them, not
  flat cream). The lift is a DEMO preset value (`trailWidth` / `intensity` /
  `epicycleRatios` over the configurator), NOT a src token edit — the
  `WARM_IDENTITY_PALETTE` + the `* 0.7` default stay byte-frozen
  (presets-in-consumers, the `proof:fourier-field` U5 fence).
- **Cartoon-technicolor weave.** The chain hue ladder (`chainColorLin`,
  `render.wgsl.ts:65-77`) already sweeps warm root→tip — KEEP. The comet head's
  saturated-core + white-specular (`:182-194`) is the hot shuttle — REFINE the
  loudness (a brighter specular, a deeper halo) so the head PUNCHES. Liquid-weight:
  the head/chain swell on cursor velocity (the `pointer.accel` bloom already noted
  in the composable header, `useFourierField.ts:22`) — the morph-more-on-move law.
- **Layered-offset cartoon cast (the technicolor register).** A subtle warm
  layered-offset shadow under the comet thread (the 1940s cel register, `design.md`
  §Shadows) — a 2nd offset pass of the trail in a darker warm ink, down-left, so
  the woven thread reads as *lifted off the field* (the `.shadow-cartoon-*`
  precedent applied in-shader as a cheap offset-duplicate, the dot-matrix
  offset-cast precedent). DEMO-preset-gated (loud register), PRM-static.

### 3c. The re-thread (the INTERACTION — AFFIRM BD.W-FOURIER-INTERACT, fold it)

- The scrub (`head_t` velocity scrub, `:113-133`) + follow-lean (`getPointerLean`,
  `:156-165`) are FIT — KEEP.
- The **draw-your-own** is `BD.W-FOURIER-INTERACT`'s net-new `useFourierStroke`
  (`pointerdown→pointermove→pointerup` → arc-length resample to ≤`MAX_PHASORS`
  (`constants.ts:28`) → the SHIPPED `dftFromPoints` (`math.ts:113`) → swap into
  `activeSpectrum`'s new `"drawn"` source, `fourier-field.vue:170`). This lens
  AFFIRMS that wave verbatim + adds ONE gestalt requirement: **the loom assembles
  YOUR thread on the living field** — the drawn shape's phasors weave it, lighting
  the ground (§2) as they go. No re-fork; the stroke loop is the headline
  interaction, the loom + lit-field is the staging it assembles on.
- Transport keyboard (`FOURIER_KEYMAP` via `useVizKeyboard`, `BD.W-FOURIER-INTERACT`
  §3) — KEEP as specced.

### 3d. Motion / proportion / liquid-weight

- **Golden proportion** (`design.md` §L6): the orbit-ring radii already follow the
  spectrum's `1/order` falloff (`math.ts:193` — the big-low-order phasors first);
  the comet `trailArc` default 0.43 ≈ a φ-pleasing fraction of the period; the head
  halo `haloR = coreR * 3.0` (`:180`) re-tunes toward φ² for the punch. The stage
  is the φ² configurator stage (already sized).
- **Liquid-weight universal:** the clock momentum (a flick injects + decays, the
  iOS fling settle, `:129-141`) is the inertia register — KEEP. The N-slider's
  chain assembly carries squish (a new phasor arrives with a small overshoot, the
  `--ease-cartoon-punch` register — `motion-spring-register` sibling). The scrub
  is velocity-continuous (never teleports, the D6a fix). The phosphor bloom (§2)
  decays on a weighted clock (the long-exposure inertia).

---

## 4. THE PRECISE MECHANISM (tokens / recipes / shaders / composables)

| layer | mechanism | status | citation |
|---|---|---|---|
| math | `dftFromPoints` / `partialSumAt` / `positionsAt` / `makeEllipticSpectrum` | **BYTE-FROZEN** | `math.ts:41-201` (3.04e-15 correct) |
| engine | `useFourierField` + twin setups + `createGpuSubstrate` + ONE `head_t` clock + offscreen-pause + PRM | **KEEP** | `useFourierField.ts:76-254` |
| render | comet trail + rings/arms/dots + head halo/core/specular SDFs | **REFINE loudness (demo preset)** | `render.wgsl.ts:131-196` |
| scrub + lean | velocity scrub + follow-lean | **KEEP** | `:113-165`, `constants.ts:47,56` |
| **draw-your-own** | `useFourierStroke` capture→resample→DFT→swap | **AFFIRM (net-new, `BD.W-FOURIER-INTERACT`)** | the wave §1, `fourier-field.vue:170` |
| **warm field GROUND** | NEW `.fourier-field-ground` warm-amber mesh CSS primitive (NOT auroraFallbackGround) | **NEW (demo + a shared field token)** | §3a; folds `BD.W-PAGE-BACKGROUND` |
| **phosphor bloom (BOLD)** | `--ff-head-xy` / `--ff-head-hue` per-frame CSS vars → a radial warm bloom in the ground | **NEW (the SURPASS arm)** | §2; the `useGlassBackdropLuminance` observer precedent |
| keyboard | `FOURIER_KEYMAP` via `useVizKeyboard` | **AFFIRM (`BD.W-FOURIER-INTERACT` §3)** | the wave §3 |
| vivid preset | a DEMO `FOURIER_PRESET_VIVID` (louder presence, the warm-field default) | **NEW (presets-in-consumers)** | `demo/.../presets.ts`; src palette frozen |

**The `--ff-head-xy` write seam (the only new src-adjacent plumbing).** The
composable already owns the head position (the compute pass writes `curveSamples[0]`
in model space, `render.wgsl.ts:176`; the CPU knows it via `partialSumAt(spectrum,
headT)` — the shipped math, `math.ts:78`). `useFourierField`'s `onFrame` hook
(`:100`) computes `partialSumAt(getSpectrum(), headT)` → maps model→[0,1]² via the
existing view-fit (`computeFourierFit`, `uniformBridgeWGPU.ts`) → writes
`hostEl.style.setProperty('--ff-head-xy', ...)`. ZERO new GL, ZERO re-layout, one
`setProperty` per frame (the compositor-cheap observer pattern). PRM → write the
frozen-T head once.

---

## 5. CROSS-ENGINE (Chrome + Safari) + A11Y/PRM

- **Twin parity (WGSL `fourierFieldWGPUSetup` vs GLSL `fourierFieldGLSetup`).** The
  loudness lift is a uniform value (presence/intensity), reaching BOTH twins
  through the existing `getSpectrum`/`getPalette`/`config` deps — no shader
  divergence. The phosphor bloom + warm ground are **pure CSS** (no shader at all —
  the field is behind the canvas), so they are engine-identical by construction
  (the `BD.W-VIZ-PARITY-METAL` net covers the canvas; the CSS ground is outside
  it). The draw loop's `dftFromPoints` is CPU-side (the math leaf) → identical on
  both backends.
- **Safari:** the warm field is a plain `radial-gradient` mesh (sRGB color-interp,
  NO `backdrop-filter`, NO `filter:url`) + `background-position` drift
  (compositor-only). The `@supports` floor: where the breathing drift is gated, the
  field falls to a static warm mesh (still above the §3 floor). The viz canvas
  itself is the shipped WGSL/GLSL twin (already Safari-verified path).
- **PRM (`prefers-reduced-motion: reduce`):** the clock freezes at `frozenT`
  (`useFourierField.ts:105`); the warm field drift freezes (static warm mesh); the
  phosphor bloom seats at the frozen-T head (a static warm halo). The **draw
  STILL captures + commits** (drawing is a deliberate gesture, not ambient motion —
  the `BD.W-FOURIER-INTERACT` PRM carve), only the chain-assembly animation on swap
  is PRM-gated. `prefers-reduced-transparency` → the warm field falls to a flat
  warm fill (never gray — the warm floor). `prefers-contrast: more` → the
  scaffolding presence floors UP (legibility).

---

## 6. DEFT UNION / SURVIVAL-OF-THE-FITTEST (no fork, no legacy)

- **KEEP (fit):** the math leaf (byte-frozen), the twin engine + substrate
  lifecycle + ONE `head_t` clock + offscreen-pause + PRM, the render SDF
  composite (trail + rings + arms + dots + head), the velocity scrub + follow-lean,
  the curated ℱ/heart/star gallery (`fourier-paths.ts` — additive), the warm
  identity palette.
- **REFINE (weak):** the scaffolding loudness in light mode (D3 — a DEMO preset
  lift over a darker-warm field, `* 0.7` default frozen); the head punch (a louder
  specular/halo); the chain assembly squish (the `--ease-cartoon-punch` register).
- **RE-INVENT (broken/absent):** the GROUND — the viz floats over dead cream
  (D1); the NEW warm-field primitive + the boldest-move phosphor bloom are the
  genuine net-new. The draw-your-own (D2) is net-new but ALREADY OWNED by
  `BD.W-FOURIER-INTERACT` — this lens AFFIRMS + folds it, never re-specs it.
- **Reconcile vs the 116 union waves:** `BD.W-FOURIER-INTERACT` (the draw loop +
  keyboard + egg-purge + U3-numeric — AFFIRMED verbatim, this lens adds the
  loom/lit-field staging it assembles on). `BD.W-PAGE-BACKGROUND` (the warm field
  folds in as the substrates-page contained ground — but since fourier already
  mounts a viz, the ground is the NEW CSS primitive, not a 2nd GL field).
  `BD.W-AUR-VIVIDNESS` (the §3 chroma floor the warm field must clear).
  `BD.W-VIZ-PARITY-METAL` (the canvas twin net — the CSS ground is outside it). **No
  dup vs the dot/goo vizzes** — the loom is a thread-weaving epicycle structure, not
  a dot lattice or a metaball; the shared dependency is only the §3 warm-field
  mandate + the presets-in-consumers discipline.

---

## 7. THE GESTALT BAR (the judge requirement)

The viz reads as **a living harmonic LOOM** — rotating phasor filaments weave a
luminous warm thread that lights the breathing warm field beneath it; you scrub it
with the cursor, watch it assemble term-by-term on the N slider, and re-thread it
by DRAWING your own closed path that the loom re-weaves from big phasors to small
— the curated ℱ/heart/star in the gallery beside it. BOTH modes: light = warm-cream
field with amber pools + a coral thread; dark = ember field with a hot-amber
thread. Born-FAIL on HEAD (the structure is a faint diagram floating on dead cream;
no draw-your-own; no lit field). The single boldest move — the comet lights the
ground — is what turns "coherent but floating" into "a living harmonic structure."
