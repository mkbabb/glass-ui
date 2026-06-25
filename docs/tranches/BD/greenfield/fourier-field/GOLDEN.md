# FourierField — the GOLDEN reference: **THE HARMONIC LOOM that lights its own field**

> The single best variant, synthesized from the three greenfield lenses (A pure-iOS-27
> fidelity, B cross-engine/perf, C technicolor flow-&-punch). The strongest move from each
> is KEPT and reconciled into ONE coherent design. **Tranche-DEV only** — author/converge on
> `prototype/liquid-dock`; the `src/` edits are the gated build. Every mechanism, uniform,
> composable, and math symbol below is grep-/source-confirmed at HEAD (citations inline).
> DEFTLY INTEGRABLE: a UNION with the extant fourier engine + the §3-systemic warm-field +
> the already-specced `BD.W-FOURIER-INTERACT` — zero parallel fork, no legacy.

---

## 0. WHAT THE THREE LENSES AGREE ON (the unanimous floor)

All three drove `/substrates/fourier-field` live, both modes, default-to-broken, and landed
the SAME verdict — the bones are FIT, the flesh is thin:

- **The math + the GPU twin + the `head_t` clock + the substrate lifecycle are FIT — BYTE-FROZEN.**
  `math.ts` is machine-precise (3.04e-15 DFT round-trip); `useFourierField.ts` owns the ONE
  `head_t` clock + offscreen-pause + WCAG-2.2.2 `DockBackgroundToggle` seam + PRM frozen-T +
  the velocity scrub + the 2-D follow-lean; the WGSL compute/render twin + the WebGL2 GLSL
  twin both ship and step the SAME evaluator. **This is not a rebuild.**
- **Three defects of REGISTER, ranked:** (D1) the harmonic structure floats over a **DEAD
  cream/charcoal ground** — no colourful field behind the glass (the §3 systemic finding,
  7th viz confirmed); (D2) the headline interaction (**draw-your-own**) is VAPOR — only a
  `head_t` scrub ships (already owned by `BD.W-FOURIER-INTERACT`); (D3) the chain + comet
  paint **PASTEL/HAIRLINE**, near-invisible in light mode.
- **The warm-field ground is NOT `auroraFallbackGround`** — that is the aurora's
  luminance-faithful blue-cyan-capable raster (a teal-navy-family dependency a fourier card
  must not own). A NEW warm CSS primitive is owed, and it is SYSTEMIC (≥7 sites), so it lands
  ONCE and is reused (no overfit).
- **The lift is presets-in-consumers.** The `src/` `WARM_IDENTITY_PALETTE` + the render
  defaults stay byte-frozen; the vivid lift is a DEMO preset turning the EXISTING `intensity`/
  `trailWidth`/`trailFloor`/`epicycle*` knobs to 11 — no smuggled magic constant.

The three lenses diverge only on the **boldest move**. The golden takes ALL THREE bold moves
(they are orthogonal and compose) and reconciles them under one gestalt.

---

## 1. THE GESTALT — "the HARMONIC LOOM that lights its own field"

The Fourier epicycle chain is *the same math that redraws the ℱ handmark*. The iOS-27 reading
is not "a math diagram on a page" — it is **a precision instrument behind glass** (the Apple
Watch breathe-ring, the Weather app's living sky): a coherent, alive STRUCTURE. The golden
reframes the viz as a **living harmonic LOOM**, three concentric registers (the golden-ratio
depth ladder, biggest→smallest, design.md §L6):

1. **THE FIELD (back).** A breathing warm-amber colourful ground — the §3 fix, a NEW shared
   `.viz-warm-field` CSS primitive (NOT `auroraFallbackGround`). The glass/viz reads BECAUSE
   there is warm colour behind it, with a defined edge (the stage `rounded-card` rim + inner
   vignette). **AND the field is LIT BY the comet** (§2, the boldest move) — the head is a
   moving warm light source whose glow DEPOSITS a slow phosphor bloom into the field as it
   sweeps (the loom weaves light into the ground; not a static backdrop the viz floats over).
2. **THE MACHINE (mid).** The epicycle chain — bold inked rings + arms + joint-beads, a
   warm-anchored hue ladder root→tip, each ring carrying a cartoon cel-shadow offset opposite
   its travel (the 1940s technicolor PUNCH). The big low-order rings are HEAVY; the small
   high-order rings lag and whip (overlapping action — free from the physics, made VISIBLE by
   inking them).
3. **THE COMET (front).** A fat glowing two-tone rope — the partial-sum curve — with a
   **squash-and-stretch head bead** (§2b, the one new shader math): the bead stretches along
   the tangent on straights, squashes across it on corners, volume-preserving. A blazing
   saturated core + white specular + a soft warm halo (the hot shuttle).

**You can RE-THREAD it by hand** (`BD.W-FOURIER-INTERACT`, AFFIRMED + folded): draw a closed
path and watch the loom re-assemble YOUR shape from big phasors to small — the curated
ℱ/heart/star in the gallery beside it. The drawn shape weaves on the living field, lighting it
as it goes; the chain ASSEMBLES with anticipation + a squish-overshoot + a one-shot amber
commit-flood.

BOTH modes: light = warm-cream field with amber pools + a coral rope; dark = ember field with
a hot-amber rope. Born-FAIL on HEAD (a faint diagram on dead cream; no draw; no lit field).

---

## 2. THE BOLDEST MOVES — three orthogonal levers, reconciled

The golden does not pick one lens's bold move; it takes the strongest from each, because they
are orthogonal (one is CSS-side ground, one is shader-side head, one is shared/perf) and
together they are what turns "coherent but floating" into "a living harmonic structure."

### §2a — THE COMET LIGHTS THE GROUND (from Lens A — the SURPASS arm, CSS-side)

The head dot is a *moving warm light source* whose glow DEPOSITS a slow warm-amber suffusion
into the living field as it sweeps — a long-exposure light-painting / phosphor screen. **The
ground is lit BY the viz**, the iOS-27 "the surface responds to the content" reading (the
Weather sky lights from the sun; the Music field bleeds the album hue). The video references
*cannot* touch this — a backdrop can't be lit by its own foreground in real time; the loom can.

**Mechanism (compositor-cheap, engine-identical — pure CSS, behind the canvas):**
- `useFourierField`'s `onFrame` hook (`useFourierField.ts:100`) already knows the head model
  position (the CPU has it via `partialSumAt(getSpectrum(), headT)` — the shipped math,
  `math.ts:78`). It maps model→`[0,1]²` via the existing view-fit (`computeFourierFit`,
  `uniformBridgeWGPU.ts`) and writes ONE CSS var: `hostEl.style.setProperty('--ff-head-xy', …)`
  + `--ff-head-hue` (the warm palette base). This is the **`useGlassBackdropLuminance`
  precedent verbatim** — a sampled observer writing a CSS var per frame
  (`useGlassBackdropLuminance.ts:442,448` writes `--glass-backdrop-luma`/`--glass-ambient-hue`
  the same way). ZERO new GL, ZERO re-layout, ONE `setProperty` per frame.
- A `radial-gradient` warm bloom centred at `--ff-head-xy` rides on top of the breathing warm
  mesh; a second decaying "phosphor" layer lingers a faint warm trail of *where the loom has
  woven* on a slow `--ff-phosphor-decay` clock.
- **PRM:** the bloom freezes at the frozen-T head position (a static warm halo, no sweep).
  **Safari-safe:** a plain `radial-gradient`, sRGB interp, NO `filter:url`, NO `backdrop-filter`.

### §2b — THE SQUASH-AND-STRETCH COMET HEAD (from Lens C — the ONE new shader math)

The dead round head bead becomes a **volume-preserving anisotropic ellipse** driven by the
local curve speed — the cartoon §L4 squash law made literal, the signature that converts
"correct diagram" into "alive technicolor character."

**Mechanism (~8 lines, the ONLY net-new shader math, mirrored across the twins):**
- The head velocity is `partialSumAt`'s derivative — already computable from two adjacent
  curve samples the compute pass writes (`curveSamples[0]` vs `curveSamples[1]`,
  `render.wgsl.ts:177`). The shader derives a unit tangent `T` + a speed magnitude `s`.
- The head SDF (today `dHead = length(p - head)`, `render.wgsl.ts:178`) becomes an ellipse:
  project `(p - head)` onto `T` and `T⊥`, scale the tangent extent by `(1 + k·s)` and the
  normal extent by `1/(1 + k·s)` (volume-preserving), then take the length. `k` is a small
  bounded DEMO gain (the lift is presets-in-consumers; the `src/` default `k≈0` keeps the
  byte-frozen round bead).
- Lands in `fourier-field.render.wgsl.ts` AND `fourier-field.glsl.ts` AND mirrors in the GL
  CPU bead path — the SAME `partialSumAt` evaluator drives both, so the tangent is derived
  identically (cross-engine parity by construction — the Lens-B obligation).
- **PRM:** under reduce the head freezes at `frozenT` → speed read at the static frame → a
  fixed bead aspect (a static lean is not motion).

### §2c — THE SHARED `.viz-warm-field` PRIMITIVE + the cross-engine/perf rigor (from Lens B)

The §3 ground is authored ONCE as a shared library `@utility`, consumed by all 7 flat vizzes
(the no-overfit ≥2-sites law), and the whole design carries Lens B's hard cross-engine/perf
fences (the cap at `MAX_PHASORS`, the twin-parity-by-construction proof, the event-driven
zero-per-frame stroke capture). This is the **DEFT-INTEGRATION discipline** that keeps the
golden a union and not a bolt-on.

---

## 3. VISUAL + MOTION + INTERACTION SPEC

### 3a. The living warm field (the GROUND — §3 fix, the NEW shared primitive)

- A NEW `@utility viz-warm-field` in `src/styles/` (the recipe layer alongside the existing
  `radial-gradient` recipes in `glass/material.css` / `tokens/glass-fx.css`). It is the
  library's warm-field IDENTITY primitive (presets-in-consumers: the *primitive* is library
  identity; the vivid LIFT is a consumer preset). **NOT `auroraFallbackGround`** (blue-cyan,
  wrong hue family, an aurora dependency).
- **What it is:** 2 stacked `radial-gradient`s + 1 slow `conic-gradient`, all hues in `[20,70]`
  (amber → rose → cream), low-chroma in light mode, lifted-chroma in dark (the dark-arm warm
  floor: deep warm-umber centre → near-black edge, NEVER gray/teal). Above the §3 chroma floor
  (mean OKLab chroma ≥ 0.045 — the `BD.W-AUR-VIVIDNESS` bar). Pure paint, zero JS, zero GL —
  one composited layer. The slow conic drift is a `@property --viz-field-angle` lerp on a
  `>20s` keyframe (compositor-cheap); `@media (prefers-reduced-motion: reduce)` freezes it.
- **The §2a phosphor bloom rides ON TOP** as 1-2 extra `radial-gradient` layers reading
  `--ff-head-xy`/`--ff-head-hue`.
- **How fourier consumes it:** the demo `ShowcaseFrame` flips `tier="quiet"` → `tier="field"`
  (the field-backed tier ALREADY EXISTS) and the stage gains `.viz-warm-field`. The
  transmissive six-layer glass plate then reads OVER a colourful warm field with a defined
  edge — the §3 fold, ONE class + ONE tier flip, no new component.
- **DRY win:** the OTHER 6 flat vizzes adopt the SAME `@utility` — the §3 systemic finding gets
  ONE primitive, not 7 bespoke grounds.

### 3b. The loom (the CHAIN + comet — refine the shipped render, never re-fork)

- **Presence lift (D3 fix).** The scaffolding `* 0.7` (`render.wgsl.ts:151`) reads louder over
  the now-darker-warm field (the rings read because the ground is warm-dark behind them, not
  flat cream). The lift is DEMO-preset values (`trailWidth`/`intensity`/`trailFloor`/
  `epicycleRatios`/`epicycleWidths`), NOT a src token edit — the `WARM_IDENTITY_PALETTE` + the
  `* 0.7` default stay byte-frozen.
- **The fat two-tone rope (Lens C M1).** `trailWidth → 5-6`, `trailFloor → 0.40-0.45`
  (the body never thins to a whisper), a hot saturated core + a bloomed warm halo over the
  additive over-composite already set in both setups. EXISTING uniforms — a DEMO preset, the
  library default calm/byte-frozen.
- **The squash head (§2b).** The one new shader math — the bead deforms with motion.
- **Cartoon cel-shadow on the chain (Lens C M3, DEMO-gated, PRM-static).** Each ring renders a
  second darker offset copy behind it, opposite its instantaneous travel — ~6 shader lines in
  the chain-tip loop, mirrored on the twin. `prefers-contrast: more` floors the ink UP
  (legibility asset). DEMO-preset-gated (the loud register; the `src/` default has no cel pass).

### 3c. The re-thread (the INTERACTION — AFFIRM `BD.W-FOURIER-INTERACT` verbatim, fold its staging)

This golden does NOT re-spec the interaction — `BD.W-FOURIER-INTERACT` already specs it
correctly and is AFFIRMED verbatim. The golden ADDS the staging it assembles on + Lens B's
perf fences:

- **The draw loop** = the net-new `useFourierStroke` (`pointerdown→pointermove→pointerup` →
  arc-length resample to `min(N, MAX_PHASORS)` → the SHIPPED `dftFromPoints` (`math.ts:113`) →
  swap into `activeSpectrum`'s new `"drawn"` source, `fourier-field.vue`). Event-driven, ZERO
  per-frame cost. `usePointerVelocityField` is the WRONG primitive for capture (it smears
  corners) — `useFourierStroke` is the right one (the wave's F1 fence).
- **The cap = `MAX_PHASORS` (64) at the resample seam** — so the WGSL `MAX_PHASORS` loop bound
  AND the GL `GL_MAX_PHASORS` budget both stay within budget on BOTH engines; no silent
  truncation, 60fps preserved.
- **Twin parity automatic:** the `"drawn"` spectrum is CPU-minted (`dftFromPoints` runs in JS
  once) → fed to the SAME `getSpectrum()` re-read seam (`useFourierField.ts:41`) the curated
  shapes already use → both backends consume the same `BasisComponent[]`. **The live stroke
  needs ZERO new shader code** (the KISS win).
- **The transport keymap** = `FOURIER_KEYMAP` via `useVizKeyboard` (Space/`,`·`.`/`[`·`]`/
  `Esc`/`Backspace`), composed DIRECTLY at the SFC, focus-guarded to the host (never
  `document`), no `useVizInteraction` wrapper.
- **The egg D1-purge** = `FRedrawOverlay.vue`'s `getContext("2d")` re-homes onto a
  `<FourierField source="drawn">` instance.
- **The technicolor PAYOFF (Lens C M5):** on commit, the chain springs in big→small with a
  squish-overshoot, the comet bursts then settles (a one-shot `--dock-accent-flood`-style amber
  flood, PRM-static), and the drawn curve weaves on the living field (lighting it via §2a).

### 3d. Motion / proportion / liquid-weight (the binding precepts)

- **Golden proportion (design.md §L6):** the orbit-ring radii follow the spectrum's `1/order`
  falloff (`math.ts:193`); the comet `trailArc` default 0.43 ≈ a φ-pleasing fraction; the head
  halo `haloR = coreR * 3.0` (`render.wgsl.ts:180`) re-tunes toward φ² for the punch; the stage
  is the φ² configurator stage.
- **Liquid-weight universal:** the clock momentum (a flick injects + decays, the iOS fling
  settle, `useFourierField.ts:129-141`) is the inertia register — KEEP + extend the same settle
  to the keyboard scrub steps (a `,`/`.` press injects a small momentum impulse, not a hard
  jump). The N-slider's chain assembly carries squish (a new phasor arrives with an overshoot,
  the `--ease-cartoon-punch` register). The source-swap morphs with goo (elliptic→ℱ→heart→star
  cross-fade the spectra with a brief metaball-bridge, composing the shipped goo-morph — no new
  filter). The phosphor bloom (§2a) decays on a weighted clock (the long-exposure inertia).
  NEVER tight/springy; morph MORE on move.

---

## 4. THE PRECISE MECHANISM (tokens / recipes / shaders / composables + files)

| Layer | Symbol (verified at HEAD) | Disposition | File |
|---|---|---|---|
| Math leaf | `dftFromPoints`/`partialSumAt`/`positionsAt`/`makeEllipticSpectrum`/`comp` | **BYTE-FROZEN** (3.04e-15) | `src/components/custom/fourier-field/math.ts:25-201` |
| Compute kernel | `partialSumAt`/`epicycleChainTip`/`cs_main` | **FROZEN** | `…/shaders/fourier-field.compute.wgsl.ts` |
| Render kernel | trail + rings/arms/dots + head halo/core/spec | **REFINE: +squash head (§2b) +cel-shadow (3b), DEMO-gain-driven** | `…/shaders/fourier-field.render.wgsl.ts:131-196` |
| GL twin | CPU-steps `partialSumAt`, `GL_MAX_PHASORS=64` | **REFINE: mirror §2b/cel** | `…/composables/fourierFieldGLSetup.ts` + `…/shaders/fourier-field.glsl.ts` |
| Composable | one `head_t` clock + scrub + lean + pause/PRM | **KEEP + ONE new write seam (§2a `--ff-head-xy`)** | `…/composables/useFourierField.ts:76-254` |
| Scrub + lean | velocity scrub + 2-D follow-lean | **KEEP** | `useFourierField.ts:113-165`, `constants.ts:47,56` |
| **Draw-your-own** | `useFourierStroke` capture→resample→DFT→swap | **AFFIRM (`BD.W-FOURIER-INTERACT` §1)** | NEW `…/composables/useFourierStroke.ts` |
| **Warm field GROUND** | `@utility viz-warm-field` warm-amber mesh (NOT auroraFallbackGround) | **NEW (shared, §2c)** | NEW `src/styles/…/viz-warm-field.css` |
| **Phosphor bloom (BOLD §2a)** | `--ff-head-xy`/`--ff-head-hue` per-frame CSS vars → a radial warm bloom in the ground | **NEW (the SURPASS arm)** | `useFourierField.ts` onFrame + the `.viz-warm-field` recipe |
| Keyboard | `FOURIER_KEYMAP` via `useVizKeyboard` | **AFFIRM (`BD.W-FOURIER-INTERACT` §3)** | the wave §3 |
| Egg purge | `FRedrawOverlay` → `<FourierField source="drawn">` | **AFFIRM (`BD.W-FOURIER-INTERACT` §4)** | `demo/eggs/FRedrawOverlay.vue` |
| Vivid preset | DEMO `FOURIER_PRESET_VIVID` (louder presence, the squash gain, the cel gain) | **NEW (presets-in-consumers)** | `demo/stories/substrates/presets.ts`; src frozen |

**The `--ff-head-xy` write seam (the only new src-adjacent plumbing — §2a).** In
`useFourierField.ts`'s `onFrame` (`:100`): after advancing `head_t`, compute
`partialSumAt(getSpectrum(), headT)` → map model→`[0,1]²` via the cached `computeFourierFit`
center/scale → `hostEl.style.setProperty('--ff-head-xy', \`${x} ${y}\`)` (+ `--ff-head-hue`
once from the palette base). ZERO new GL, ZERO re-layout, one `setProperty`/frame (the
`useGlassBackdropLuminance.ts:442` observer pattern). PRM → write the frozen-T head once.

---

## 5. CROSS-ENGINE (Chrome + Safari) + A11Y / PRM

- **Twin parity.** The presence lift is a uniform value reaching BOTH twins through the
  existing `getSpectrum`/`getPalette`/`config` deps — no shader divergence. The §2b squash +
  the cel-shadow land in `fourier-field.render.wgsl.ts` AND `fourier-field.glsl.ts` AND the GL
  CPU bead/chain step, all derived from the SAME `partialSumAt` evaluator → derived identically
  (parity by construction, the `BD.W-VIZ-PARITY-METAL` net). The §2a phosphor bloom + the warm
  ground are **pure CSS behind the canvas** → engine-identical by construction (outside the
  shader twin). The draw loop's `dftFromPoints` is CPU-side → identical on both.
- **Safari.** The warm field is plain `radial-gradient` + `conic-gradient` + a `@property`
  angle drift (sRGB color-interp, NO `backdrop-filter`, NO `filter:url`, compositor-only). The
  `@supports` floor: where the drift is gated, the field falls to a static warm mesh (still
  above the §3 chroma floor). The viz canvas is the shipped WGSL/GLSL twin (Safari-verified
  path). Fourier has NO meatball/blob register — the metaball law applies to dock/blob, not
  here; the cross-engine obligation fourier owns (the WGSL↔GLSL twin + the CSS ground) is
  honoured.
- **PRM (`prefers-reduced-motion: reduce`).** The `head_t` clock freezes at `frozenT`
  (`useFourierField.ts:105`); the warm-field conic drift freezes (static mesh); the phosphor
  bloom seats at the frozen-T head (static warm halo); the squash bead reads the static-frame
  speed (a fixed aspect, no live deform); the cel-shadow is a static offset (no travel). The
  **draw STILL captures + commits** (a deliberate gesture, not ambient motion — the wave's PRM
  carve), only the chain-assembly animation on swap is PRM-gated.
  `prefers-reduced-transparency` → the warm field falls to a flat warm fill (NEVER gray — the
  warm floor). `prefers-contrast: more` → the scaffolding presence + the cel-ink floor UP.

---

## 6. DEFT UNION / SURVIVAL-OF-THE-FITTEST (no fork, no legacy)

- **KEEP (fit):** the math leaf (byte-frozen), the twin engine + substrate lifecycle + ONE
  `head_t` clock + offscreen-pause + PRM, the render SDF composite, the velocity scrub +
  follow-lean, the curated ℱ/heart/star gallery (`fourier-paths.ts`), the warm identity palette.
- **REFINE (weak):** the scaffolding loudness in light mode (D3 — a DEMO preset over a
  darker-warm field); the head punch (the squash bead + a louder specular/halo); the chain ink
  (the cel-shadow); the chain-assembly squish (`--ease-cartoon-punch`).
- **RE-INVENT (absent):** the GROUND (the viz floats over dead cream — D1; the NEW shared
  `.viz-warm-field` primitive + the §2a phosphor bloom are the genuine net-new). The
  draw-your-own (D2) is net-new but ALREADY OWNED by `BD.W-FOURIER-INTERACT` — AFFIRMED +
  folded, never re-specced.
- **Reconcile vs the union waves:** `BD.W-FOURIER-INTERACT` (the draw loop + keyboard + egg-purge
  + numeric-U3 — AFFIRMED verbatim; the golden adds the loom/lit-field staging + Lens B's
  cap/twin/perf fences as STRENGTHENING clauses, never a fork). A NEW shared micro-wave
  `BD.W-VIZ-WARM-FIELD` (the §3 fold — the `@utility viz-warm-field` + the `tier="field"`
  adoption, authored ONCE, the 7 flat vizzes adopt it; folds into any existing
  `W-PAGE-BACKGROUND`/`W-LIVING-ARTWORK`-shaped wave rather than a sibling). `BD.W-AUR-VIVIDNESS`
  (the §3 chroma floor the field clears). `BD.W-VIZ-PARITY-METAL` (the canvas twin net — the CSS
  ground is outside it). **No dup vs the dot/goo vizzes** — the loom is a thread-weaving
  epicycle structure, not a dot lattice or a metaball; the ONLY shared seam is the intentional
  `.viz-warm-field`.

---

## 7. THE ACCEPTANCE BAR (the gestalt judge requirement)

A FRESH both-mode `:5199` whole-page π (+ the **webkit project**), NEVER `reducedMotion` except
the PRM arm, default-to-broken, surface-hash freshness floor. The viz reads as **a living
harmonic LOOM**: rotating phasor filaments weave a luminous warm rope that LIGHTS the breathing
warm field beneath it; you scrub it with the cursor, watch it assemble term-by-term on the N
slider, and re-thread it by DRAWING your own closed path the loom re-weaves big→small — the
curated ℱ/heart/star in the gallery beside it. BOTH modes: light = warm-cream field + amber
pools + a coral rope; dark = ember field + a hot-amber rope. The head bead SQUASHES with its
motion; the chain is INKED with a cel-shadow; the field is BRIGHTEST where the comet just was.

---

## 8. THE BORN-RED GATE SKETCH (a π/readback that proves it)

`proof:fourier-golden` (or the union of `proof:fourier-interact` + `proof:viz-warm-field`),
`tags: ["local","ci"]`, born-RED on HEAD. **Every clause asserts a RUNTIME CALL-SITE or a
COMPUTED readback, never a doc keyword / type-literal / name-presence** (the
`BD.W-FOURIER-INTERACT` discipline).

- **G1 — the warm field PAINTS (D1, born-RED on `tier="quiet"`).** The stage region BEHIND the
  glass samples a warm-field hue GRADIENT (not a flat single color): sample ≥3 points across the
  stage, assert a measurable OKLab-hue spread within `[20,70]` AND a mean chroma ≥ 0.045, BOTH
  modes. A flat `rgba(0,0,0,0)`/single-color stage REDs. NO hue in `[180,270]` (teal-navy purge).
- **G2 — the comet LIGHTS the field (§2a, born-RED — no `--ff-head-xy` seam at HEAD).** Read
  `getComputedStyle(host).getPropertyValue('--ff-head-xy')` across 2 frames: it is a parsed
  `x y` pair in `[0,1]²` AND it CHANGES between frames (the bloom tracks the head). Sample the
  field luminance near `--ff-head-xy` vs far: near > far (the bloom is local). A static/absent
  var REDs. PRM: the var is present + STABLE (frozen-T), the near>far still holds.
- **G3 — the comet is a FAT rope, not a hairline (D3, born-RED on the 3px/0.92 pastel).** The
  painted comet stroke width + peak luminance measurably exceed the HEAD hairline; the
  head-glow reads (a measurable bright core); dominant painted hue ∈ `[20,70]`. BOTH modes.
- **G4 — the head SQUASHES (§2b, born-RED on the round disc).** At a high-speed straight the
  head bead's tangent extent > its normal extent (anisotropy > 1); at a tight corner it inverts.
  The webkit project paints the SAME anisotropy (twin parity). PRM → a static aspect (no live
  deform), still ≠ a perfect circle if the frozen-frame speed ≠ 0.
- **G5 — the LIVE DRAW assembles (D2, rides `BD.W-FOURIER-INTERACT`'s π).** A synthesized
  `pointerdown→move×N→pointerup` triangle reconstructs as the user's OWN path (bounded Hausdorff
  to the stroke), the chain assembles big→small, the resample is faithful (corner count
  matches), the cap holds (≤ `MAX_PHASORS`). Twin parity on the webkit project. Born-RED (no
  stroke capture at HEAD).
- **G6 — the math is BYTE-UNTOUCHED + the KEEP fences (the survival fence).** `math.ts` is
  byte-identical (a diff REDs); the curated gallery + the scrub SURVIVE (additive); the U3
  DFT↔WGSL round-trip is a REAL `shader-eval-harness` numeric ΔE ≤ bar (a coefficient flip
  `TAU*index*t → -TAU*index*t` REDs); `WARM_IDENTITY_PALETTE` + the render `* 0.7` default are
  byte-frozen (the vivid lift is DEMO-only). A src-token edit for the lift REDs.
- **G7 — Safari/PRM floors.** The webkit project paints the rope + squash + cel + warm field;
  the warm field is plain CSS (no `filter:url`/`backdrop-filter` on it); under PRM a drawn
  stroke still commits + seats one static frame, the field drift + bloom-sweep + squash-deform +
  cel-travel all freeze.

**What reds on HEAD (born-RED by construction):** G1 (`tier="quiet"`, flat stage), G2 (no
`--ff-head-xy` seam), G3 (3px/0.92 hairline), G4 (round disc), G5 (no `useFourierStroke`), the
U3 arm of G6 (name-presence). GREEN only after the warm field + the §2a bloom + the §2b squash +
the §3b rope/cel + the draw loop land — math byte-frozen throughout.

---

## 9. THE PROTOTYPE (de-risking the boldest mechanism)

The riskiest, most-novel mechanism is **§2a — the comet lighting the field via a per-frame
`--ff-head-xy` CSS var driving a `radial-gradient` phosphor bloom in the warm field** (it is the
SURPASS arm, it crosses the JS→CSS seam, and it must be engine-identical + PRM-correct + Safari-
safe). A throwaway spike lives at `docs/tranches/BD/greenfield/fourier-field/golden/` — a
standalone HTML page (no glass-ui build) that:
- mounts a `.viz-warm-field` warm mesh (the §3 ground) + a phosphor-bloom layer reading
  `--ff-head-xy`/`--ff-head-hue`;
- drives `--ff-head-xy` per-frame from a JS `requestAnimationFrame` writing
  `style.setProperty` (the exact `onFrame` observer pattern), tracing an elliptic partial-sum
  path (a tiny inline DFT-free `partialSumAt` over a hardcoded elliptic spectrum);
- has a PRM arm (the bloom freezes) and uses ONLY plain CSS gradients (Safari-safe).

It proves the bloom TRACKS the head, the field reads warm + colourful with a defined edge, the
near>far luminance gradient holds (G1/G2 born-GREEN on the spike), and the seam is compositor-
cheap — de-risking the one mechanism the references cannot touch BEFORE the `src/` build.
