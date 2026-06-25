# DotMatrix greenfield — Lens A (PURE iOS-27 fidelity): the gravity-WELL as a LIQUID LENS

**Lens:** the most faithful, audacious iOS-27 Liquid-Glass interpretation. The bar is
`IOS27-REFERENCE.md` (T17 dot-flow surpass-target — the calm vignetted halftone backdrop
that RECEDES behind content, BUT here with the user's headline: a real cursor-GRAVITY
read + a coherent 2D-plane register). Survival-of-the-fittest UNION with the shipped
`dot-matrix` engine + the `isPlane` branch already in `dot-matrix.{wgsl,glsl}.ts` — extend
and refine, never re-fork.

---

## 0. What I found LIVE (`/substrates/dot-matrix`, WebGPU backend, both modes, 2026-06-24)

Source-verified the whole pipeline first (constants → `uniformBridgeWGPU.ts` u6 → both
shaders) — **every cited uniform exists**: `u6 = (uLayout, uGravityStrength, uGravityRadius,
uPlaneScale)` is packed in `uniformBridgeWGPU.ts:212-215`, read in both twins at the
`isPlane` branch. The gravity is NOT phantom; it is wired end-to-end. `gravityStrength=0.62`,
`gravityRadius=0.7` (constants.ts:112-113). The spring-lag liquid-weight lives in
`useDotMatrix.onFrame` (`springStep` ζ=0.7, the well engages/settles with overshoot —
feedback-liquid-weight-universal honored). `usePointerVelocityField` surface confirmed:
`smoothedPosition`/`speed`/`burst`/`active` all exist.

**The canvas PAINTS now** (backing store 2066×920, not the stale 300×150 the Pass-E
SYNTHESIS recorded — `BD.W-VIZ-WGPU-RESIZE` has landed). So the audit moves OFF "it's blank"
onto the gestalt.

Driving a synthetic pointer (enter + velocity sweep + hold), captured both modes:

1. **Cursor-gravity (plane, default): READS — but only the GATHER reads.** Holding the
   pointer mid-field, a bright dense cluster of dots gathers + swells + brightens at the
   cursor (the `attract` well, `lift = toCursor * well`). That part is genuinely good — it
   has weight, it lags, it's a real gravity well. **BUT** the resting lattice around it is a
   **near-invisible whisper** (warm-cream `{L:0.92,C:0.03,h:78}` over the flat warm-cream
   page — the §3 FLAT-FIELD disease, confirmed for the 6th viz). So the effect reads as
   "a glowing blob appears from nothing under the cursor," not "a field of dots warps toward
   a gravity well." The *medium* (the lattice) is missing, so the *deformation* has nothing
   legible to deform. The gravity is dead-on-arrival not because the math is weak but because
   **you cannot see the dots it pulls.**

2. **Cursor-gravity (sphere): SUBTLE/DEAD.** The globe stays pinned at canvas-center; a
   pointer parked in the far top-left quadrant does NOT pull the globe toward it. The
   sphere-branch `lift = n.xy * well` displaces individual dots a hair along their normal,
   but with `gravityStrength·pointerPush` riding through a `·0.62` and the dots already
   screen-projected, the net pixel travel is sub-perceptual. The sphere register's gravity is
   a rounding error.

3. **2D-plane register: working + coherent as a LAYOUT, but not yet USEFUL as a backdrop.**
   The sunflower phyllotaxis disc (`buildDotsBuffer` plane path) is a real, distinct mode
   (even-area golden-angle spread, no banded rings) — it IS a plane, distinct from the
   sphere. But it's a *uniform-density* disc with no vignette, no content-deference, no
   edge — it does not yet do the one thing the T17 reference's plane does: RECEDE behind
   content (dense edges → clear center). Right now plane = "sphere with z=0 + a gather well."
   Coherent, under-realized.

4. **Vivid/warm not gray: PASS on hue, FAIL on presence.** No teal/navy (the
   `WARM_IDENTITY_PALETTE` h=78/62 is clear of the purged [180,270] band —
   `proof:teal-navy-purge` T1 holds). But monochrome warm-cream-on-cream is not "vivid/warm
   technicolor punch" — it's a whisper. The §3 finding is LITERAL here: the dots sit over a
   FLAT page (`pageBg`/`cardBg` both `rgba(0,0,0,0)` transparent), no colorful ground, no
   defined edge.

5. **Cross-engine / lifecycle: SOUND.** WGSL/GLSL twins are line-for-line (the `isPlane`
   branch is identical structure in both). One GL context, offscreen-pause + PRM single-frame
   park inherited from `useGpuSubstrate`. Born-GPU, no Canvas2D. Parity rides PARITY-METAL.

**The diagnosis in one line:** the gravity-well MECHANISM is fit (keep it); the gravity-well
PERCEPTION is broken because (a) the medium is invisible, (b) the sphere arm's pull is too
weak, (c) the plane has no vignette to make the warp read against. The fix is not "more
gravity strength" — it's **make the field visible, give the well a LENS, and vignette the
plane so the deformation reads as a real pull.**

---

## 1. The core idea — the gravity well is a LIQUID GLASS LENS, not a dot-magnet

iOS-27's defining gesture is **refraction**: glass that bends what's behind it. The current
viz treats the cursor as a *magnet* (dots translate toward it). The greenfield reframe: the
cursor is a **liquid-glass lens** dropped onto a halftone field — a convex meniscus that
**magnifies + brightens + refracts** the dots beneath it, with the dots *flowing* into the
lens's gravity rather than teleporting to a point. This is the SAME `lift = toCursor * well`
displacement math (keep it — survival of the fittest), UNIONED with three refractive reads
the reference glass demos all carry and this viz omits:

- **Magnification (radial scale).** Inside `gravRadius`, dots don't just translate — the
  whole local neighborhood **scales up** about the cursor (a lens magnifies). This is a
  one-line change to the existing `sizeTaper`/`center2d`: add a radial `magnify = 1 +
  lensGain · nearness` that scales `(base2d − pointerNdc)` outward AND grows `dotR`. The
  current `lift` PULLS dots toward the center (they pile up + occlude); a real lens PUSHES
  the lattice apart near the rim of the well while pulling at the very center — a meniscus
  profile (`well` is attractive in the inner third, mildly repulsive in the outer ring),
  which reads as GLASS, not a black-hole. This is the single highest-fidelity move.

- **Chromatic refraction (the prism edge).** A glass lens splits light at its rim. At the
  well's edge band (`nearness ≈ 0.3–0.6`), nudge the per-dot `vTone` so the rim dots sample
  a touch warmer-amber while the core dots sample the bright cream — a faint chromatic
  fringe that reads as a refractive edge. This rides the EXISTING `vTone`/`samplePaletteLin`
  path (no new uniform — `vTone = clamp(1.0 - nearness ± edgeBand, 0, 1)`), and it gives the
  well a *defined edge* (the §3 "defined edge behind glass" ask) without a second pass.

- **Specular catch-light (the lens kiss).** A single bright dot or two at the lens center
  blooms past 1.0 (the `burstBright` already allows ≤1.6) — the catch-light a real glass
  bead carries. On flick (`burst`), this catch-light streaks into the comet-tail the engine
  already fires (`burstPull`) — keep it, it's fit.

**Why this is the iOS-27 read:** Apple's Liquid Glass is never a flat magnet — it's a
material that bends, magnifies, and catches light. A dot field under a *lens* reads as
"there is GLASS here, and it's alive" the instant the cursor moves, which is exactly the
"morph-more-on-move / liquid-weight" feel the user asked for. The deformation is now legible
because it's a *recognizable optical event* (a magnifying lens) over a *visible medium*.

---

## 2. Make the medium VISIBLE — the colourful-ground UNION (the §3 systemic fold)

The gravity cannot read over an invisible field. Two coupled moves, both
presets-in-consumers (the library default warm-cream identity is UNTOUCHED — the
`proof:teal-navy-purge` T1 / warm-floor fences are binding and the library default stays the
calm identity):

- **A colourful ground BEHIND the field (the §3 dependency, folded).** The demo stages the
  dot-plane over a colourful field so the warm-cream dots read against it AND so the lens has
  something to refract. The one-GL-per-route budget forbids a second `<Aurora>` context, so
  per the `dot-flow-field` precedent the demo provides the colour TWO cheap ways: (1) a
  CSS conic/mesh "living artwork" card backdrop (the `BD.W-LIVING-ARTWORK` compositor-only
  drift — warm-amber → a NON-purged accent, e.g. a coral/gold or a warm-violet `h≈300`
  which sits OUTSIDE the [180,270] teal-navy band), behind the `tier="field"` frame; (2)
  the field's OWN dot palette themed to a louder warm ramp as a demo PRESET (the
  presets-in-consumers move — a brighter warm-cream core + a saturated warm rim so the
  lattice reads at rest, not just under the lens). The dots then read AS a halftone over a
  living warm field — the iOS-27 "colourful field behind glass + a defined edge" composite.

- **Lift the resting-lattice presence (demo preset, not src default).** The current
  `baseOpacity=0.5` + `facingLo=0.15` makes the resting plane a whisper. The demo preset
  lifts the floor so the lattice READS as a present-but-calm halftone (the
  `FLOW_PRESET_MONO_REFERENCE`/`GOO_DOT_PRESET_WARM` precedent — the demo's louder read,
  ZERO library-default change). The library default stays the calm warm-cream identity; the
  DEMO is the sanctioned home for the louder, read-on-screen register.

---

## 3. The 2D-PLANE register, REALIZED — a content-deferential VIGNETTE halftone (the T17 fold)

Right now `plane` = uniform-density disc + gather well. The T17 reference's plane is a
**radial density-gradient halftone that RECEDES behind content** (dense edges → clear
center). UNION the two: the plane register gains a **density/vignette field** so it becomes a
genuine *backdrop* mode (distinct + useful), not a flat disc.

- **Radial density gradient (the vignette).** A per-dot presence term `presence =
  edgeFalloff(p) · (1 − centerClear(p))` fades dots near the field center and densifies them
  at the edges/corners — the content-deferential vignette. This is a per-dot `vAlpha`
  multiply driven by `length(base2d)` (edge-dense) — NO new geometry, NO new pass; it reuses
  the plane's `base2d` already computed in the `isPlane` branch. The clear-center then
  becomes the canvas region where demo content (a glass card, a title) sits — the field
  FRAMES the content.

- **The cursor-LENS punches THROUGH the vignette (the surpass lever).** Here the two ideas
  marry: the vignette keeps the center calm and clear UNTIL the cursor enters it, at which
  point the lens-well locally re-densifies + magnifies + brightens the dots (a local
  density-bloom the reference's baked video CANNOT do — the T17 SURPASS lever (a)). So the
  field is content-deferential at rest (recedes, frames content) AND springs to life as a
  liquid lens under the cursor. That duality IS the iOS-27 "calm until touched, alive on
  touch" signature, and it makes the plane register unambiguously USEFUL: it's the
  backdrop-that-becomes-a-lens.

- **Calm in-place twinkle (T17 match, not advection).** A per-dot phase-offset
  opacity+size shimmer on a slow clock (the `breathing` register already in the schema,
  `breathRadius`) so the resting field breathes sub-perceptibly in place — NOT a flow
  advection (that's `dot-flow-field`'s job; no dup). This is a `vAlpha` modulation by
  `sin(time·rate + dotPhase)` where `dotPhase` derives from the existing `instance_index`
  (free — no new buffer).

**No dup vs siblings:** `goo-dot-matrix` = SDF-metaball-quantized dots (a goo field drawn in
dots); `dot-flow-field` = wave-advected streamlines (a kinetic water flow). This plane
register = a STATIC vignette halftone + a cursor LENS — a third, distinct gestalt. The
`BD.W-DOT-UNIFY` shell discipline holds: this is the `kind="sphere"` mechanism's
construction-time plane permutation, NOT a runtime god-branch (the `isPlane` switch is a
SINGLE u6 lane the construction-time config sets, already in the shipped shaders — fit, kept).

---

## 4. Fix the SPHERE-mode gravity (the dead arm)

The sphere well is sub-perceptual because `lift = n.xy * well` displaces along the normal
with too-small a gain after screen projection. Refine (don't re-fork):

- **Re-aim the sphere well to a screen-space LENS too.** Apply the same lens magnify/refract
  about the pointer in SCREEN space (after `screenN`), so the dots NEAR the cursor on the
  globe's surface bulge toward it + brighten — a "finger pressing a dot-globe through glass"
  read. The displacement target becomes `toPointer`-driven (toward the cursor) scaled by
  `nearness`, matching the plane arm's legibility. Bound it so the globe doesn't tear (the
  depth-fade shell read, `proof:viz-dotmatrix` clause-6 flat-uniform bite, stays intact).
- This is a ~6-line edit to the sphere `else` branch of both twins, transcribed line-for-line
  (the round-trip parity anchor + `proof:dot-unify` B6 byte-frozen-mechanism discipline: the
  EDIT is the same in both backends; the cage gate re-greens on the new shared form).

---

## 5. Precept vocabulary (design.md — naming the levers, per §"specs that ship without
naming their precept-level vocabulary are incomplete")

- **§L1 glass:** the cursor-lens IS the transmissive-glass read (magnify + refract + catch-
  light); the field is the colourful-ground-behind-glass composite (§3).
- **§L2 spring / §L4 motion:** the well engages/settles on the EXISTING `springStep` (ζ=0.7,
  the bounded liquid-weight overshoot — feedback-liquid-weight-universal); the flick comet-
  tail is the `--spring-bouncy`-class exaggeration (§L4 #10). `--motion-weight` rests at
  `1/φ≈0.62` — the well's lag/overshoot scale with it (a DRIVER, not an observer-snap, so
  the bounce is sanctioned). PRM → `--motion-weight:0` → the single static frame park (the
  field freezes, lens neutral, twinkle off).
- **§L4 principles exercised:** Squash&stretch (the lens magnify is a vol-aware local
  swell), Anticipation+Follow-through (the well LAGS the cursor then settles with overshoot),
  Exaggeration (the flick comet-tail + catch-light bloom), Arcs (the meniscus profile).
- **§L6 proportion:** `gravityRadius` and the meniscus inner/outer split derive from the φ
  family (inner attract zone = `gravRadius/φ`, outer meniscus ring = `gravRadius`); the
  twinkle clock and the density falloff index off √φ rungs — no magic constants (the
  prior-golden disease: SOURCE-VERIFY every constant, no smuggled magic).
- **§L7 cross-engine:** WGSL primary + GLSL fallback, the `isPlane`/lens math transcribed
  line-for-line (the ONE field source); the crisp `fwidth`-SDF dot is the ONE AA canon in
  both; born-GPU, no `backdrop-filter:url`, compositor-only. PRM single-frame park inherited
  from `useGpuSubstrate`. The paired-engine π (Chromium AND WebKit) is the acceptance proof.

---

## 6. The DELTA-ASSAY → wave amendment (reconcile vs the 116 union waves; no dup)

This is an **AMENDMENT to the shipped `dot-matrix` mechanism + the `isPlane` branch**, riding
the existing waves — NOT a new fork:

- **AMEND `BD.W-DOT-UNIFY`** (the `kind="sphere"` mechanism, plane permutation): the cursor-
  LENS refinement (magnify + chromatic-rim + catch-light) + the sphere-arm gravity re-aim are
  the construction-time plane/sphere permutation's REFINED math — same single mechanism, the
  `proof:dot-unify` B6 cage-gate re-greens on the new shared shader form. No new component, no
  runtime god-branch (the `isPlane` u6 lane stays the construction-time switch).
- **FOLD the §3 colourful-ground into `BD.W-LIVING-ARTWORK`** (the compositor-only living
  card backdrop, presets-in-consumers — a NON-purged warm accent) + the demo-default louder
  preset (the `W-VIZ-PRESENCE` / `FLOW_PRESET_MONO_REFERENCE` precedent). DEMO-side; the
  library warm-cream default + the `proof:teal-navy-purge` fence are UNTOUCHED.
- **The plane VIGNETTE shares topology with `BD.W-DOTFLOW-REBUILD`** (the T17 density-gradient
  halftone) but is a DISTINCT register: dotflow-rebuild owns the `dot-flow-field`'s
  `mode="field"` vignette; THIS owns the `dot-matrix` plane's vignette + the cursor-LENS
  punch-through (the surpass lever the rebuild's `mode="field"` can share). Reconcile: ONE
  shared `presence = edgeFalloff·(1−centerClear)` density helper in the shared
  `procedural-color`/substrate seam, consumed by BOTH the dotflow `mode="field"` and the
  dot-matrix plane (DRY, no second density function — the no-second-leaf fence).
- **No dup vs `goo-dot-matrix`** (SDF metaball) or `dot-flow-field` flow mode (advection) —
  this is the static-vignette + liquid-lens gestalt, the third distinct dot register.

**Gate deltas (born-RED on HEAD):** (1) π that the cursor-well MAGNIFIES (a dot's pixel size
near the cursor measurably exceeds its rest size — born-RED on the current translate-only
well); (2) π that the plane field's edge-density measurably exceeds center-density (the
vignette is real — born-RED on the uniform disc); (3) π that the sphere-arm gravity displaces
dots toward the cursor measurably (born-RED on the sub-perceptual current arm); (4) the
colourful-ground reach π (a non-grey, non-teal dominant hue painted behind the field). All
BOTH modes, BOTH engines, NEVER reducedMotion (+ the PRM single-frame arm). The
warm-no-gray + teal-navy-purge directives stay BINDING (the lens chromatic-rim + the living
ground are warm/coral/warm-violet `h∉[180,270]`).

---

## 7. KISS / union summary

Keep: the whole `useGpuSubstrate` lifecycle, the phyllotaxis math, the `usePointerVelocity
Field` reader, the `springStep` liquid-weight, the `isPlane` u6 branch, the `vTone`/palette
path, the comet-tail burst, the WGSL/GLSL twin discipline. Refine: the well from a *magnet*
into a *liquid-glass lens* (magnify + chromatic-rim + catch-light) in BOTH the plane and
sphere arms; the plane from a *flat disc* into a *content-deferential vignette that the lens
punches through*; the medium from *invisible whisper* into a *read-on-screen halftone over a
colourful living ground* (demo-side). Re-invent: nothing — every broken thing is a refinement
of a fit mechanism.
