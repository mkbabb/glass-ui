# DotMatrix greenfield — lens-b (CROSS-ENGINE / PERF-FIRST)

> The gravity-well mechanism already WORKS. The viz is INVISIBLE. The fix is not
> more gravity — it is a field that READS at rest, a plane register that is
> actually distinct, and a colourful ground to sit over. KISS over a re-fork.

---

## 0. LIVE INTERROGATION (chrome-devtools, `/substrates/dot-matrix`, both modes, light)

Captured live on `localhost:5173`, default config (`layout: "plane"`,
`gravityStrength 0.62`, `gravityRadius 0.7`, `baseOpacity 0.5`), pointer driven
programmatically (enter + sustained orbit-hold so `active`/`speed` stay live),
canvas read back via `drawImage` + viewport screenshots.

**Q1 — does cursor-GRAVITY READ?** YES, the mechanism functions — but it is the
*only* thing that reads. Holding the cursor at (66%,62%) produced a clear bright
**radial cluster**: nearby dots pulled IN, brightened, swelled into a ~80px
swirl/gather — a genuine Gaussian well with the JS spring-lag giving inertia
(`useDotMatrix.springStep`, ζ=0.7, response 0.42 → lag + slight overshoot, the
liquid-weight bounce IS present in source). The pull is real. The PROBLEM: the
resting field is so faint (`baseOpacity 0.5` × sparse phyllotaxis × warm-cream
on near-white) that **the entire viz is invisible except the ~80px under the
cursor**. It reads as "a spotlight that reveals dots," not "a dot field that
has gravity." Gravity isn't dead — the FIELD is dead, so gravity has nothing to
warp.

**Q2 — is the 2D-PLANE register working + distinct?** NO. Toggling the "3D
dot-sphere register" switch produced a screenshot **nearly identical** to the
plane: the same faint central bright cluster, the same pale speckle. The sphere's
small `radius 0.42` + depth-fade + pale-on-white collapses it into the same
washed-out blob. The two registers are **not visually distinct in the live
default** — the plane-vs-sphere toggle is a near-no-op to the eye. The plane is
"working" (the `if(isPlane)` branch runs, the disc lays a `GOLDEN_ANGLE_2D`
sunflower) but it is not *coherent* or *useful* as a distinct register because
both modes render as the same invisible-at-rest gray haze.

**Q3 — vivid/warm not gray + colourful ground?** Sampled painted dots avg
`rgb(218,193,167)`, hue median ~30 (warm amber/cream — **NO teal/navy, the purge
holds**). But over the flat near-white ground (`oklab(0.936 …)`, bg-chain fully
transparent to the page substrate) the warm-cream washes to **near-invisible pale
gray** — vividly warm in token, perceptually gray in paint. §3 CONFIRMED for a
6th viz: the page is FLAT light, no colourful field behind glass, and this viz
has the WORST contrast of the set because its identity colour (`L:0.92,C:0.03`)
is nearly the ground colour.

**Q4 — twin parity + lifecycle + perf.** SOLID and KEPT. `uU6 =
(layout,gravityStrength,gravityRadius,planeScale)` is packed BYTE-IDENTICALLY in
the WGSL bridge (`uniformBridgeWGPU.packDotRenderUniforms`) and the GLSL fallback
(`useDotSphere` `gl.uniform4f(uU6,…)`); the `if(isPlane)` branch, the spin
columns, the `ONE,ONE_MINUS_SRC_ALPHA` premultiplied blend, the `fwidth` SDF, the
`GOLDEN_ANGLE` constants all transcribe line-for-line. Lifecycle rides
`createGpuSubstrate` (offscreen-pause + PRM one-static-frame park) + the shared
`usePointerVelocityField` (`tick(0)` PRM freeze, no second rAF). The dots buffer
is static (closed-form phyllotaxis, zero compute pass). **Nothing structural to
rebuild — the engine is fit.**

**SOURCE-VERIFY (grep before citing):** every uniform cited here EXISTS:
`uU6.x/y/z/w` = layout/gravityStrength/gravityRadius/planeScale
(`dot-matrix.glsl.ts:38`, `.wgsl.ts:57`, `uniformBridgeWGPU.ts:59`); `uU3` =
parallax/pointerPush/pointerBloom/pointerActive; the spring-lag is
`useDotMatrix.ts:96 springStep`; `DEFAULT_DOT_MATRIX_CONFIG` fields all in
`constants.ts:96`. No invented levers. No magic constants smuggled. Palette is
`WARM_IDENTITY_PALETTE {L0.92,C0.03,h78 / L0.84,C0.07,h62}` — hue ∉ [180,270],
`proof:teal-navy-purge` clause 5 stays GREEN.

**VERDICT:** survival-of-the-fittest. The gravity engine, the twin parity, the
lifecycle, the phyllotaxis = FIT, keep. The visibility floor + the register
distinction + the ground = BROKEN, fix. This is a CALIBRATION + a GROUND
dependency, **not a re-fork**. Estimated convergence ~55% (engine 100%,
read-at-rest 0%, register distinction 0%, ground 0%).

---

## 1. THE GREENFIELD GESTALT — "a warm constellation with a gravity well"

The viz should read, at rest, as a **living warm dot-lattice** that fills the
card with quiet structure (a sunflower constellation, faintly twinkling), and
when the cursor enters, a **deep gravity well bends the whole local lattice
toward it** — dots stream inward along curved arcs, swell + brighten as they near
the cursor, then ease back to the lattice on a weighted spring with a hair of
overshoot when the cursor leaves. The well is the EVENT; the field is the STAGE.
Right now there is only the event, on an empty stage.

Two registers, ONE engine (the `dim`-idiom discipline — never a fork):
- **`plane`** (default) — the flat sunflower-disc background field. The well is a
  2D radial pull. This is the "ambient backdrop with gravity" case.
- **`sphere`** (kept preset) — the depth-shaded tilted dot-globe. The well is the
  surface-dimple/parallax. This is the "object" case.

The miss is that both currently render the same. The greenfield makes them
**categorically distinct in silhouette + at rest**, not just in the branch.

---

## 2. THE FIVE MOVES (calibration + one ground dependency — KISS, no re-fork)

### Move 1 (THE BOLDEST) — the gravity well becomes a LENS, not a spotlight: warp the WHOLE local lattice with VISIBLE inward ARCS + a dark "event-horizon" rim

Today the well brightens near dots into a blob. Greenfield: the well is a
**space-warp lens** — every dot within `~2.5·gravityRadius` is displaced toward
the cursor by a Gaussian-falloff vector, AND the displacement is **tangentially
curved** (a small `rot(θ·well)` swirl applied to `lift`) so dots spiral inward on
**arcs** (the §L4 *arcs* + *follow-through* principles) rather than translating
radially — this is what makes a gravity well read as a WELL and not a magnet.
Just inside the gather, a thin ring of dots is pushed slightly OUT and dimmed (a
faint "event-horizon" displacement ring) so the cluster has an edge — the
cartoon §L4 *exaggeration* lever that makes the pull legible.

The mechanism is already 90% there: `lift = toCursor * well`. The greenfield adds
(a) a `mat2 rot(swirl)` on `lift` where `swirl = gravSwirl * well` (ONE new
uniform lane, see §3), (b) the dark-rim term as a `nearness`-band subtract on
`facingOpacity`, (c) widen the *visible* pull by raising the displacement gain so
mid-field dots visibly lean (not just the inner 80px). NO new pass, NO new
buffer — pure vertex-shader math in the existing `if(isPlane)` branch + mirrored
in the sphere branch. This is the "morph MORE on move / liquid-weight universal"
directive made literal: the field DEFORMS, with weight, across a wide radius.

### Move 2 — RAISE THE RESTING FLOOR so the field reads BEFORE the cursor arrives

The well has nothing to warp because the lattice is invisible. Fix the floor:
- `baseOpacity 0.5 → 0.72` and add a **per-dot twinkle** (a slow
  `0.85 + 0.15·sin(time·rate + dotPhase)` opacity shimmer, `dotPhase` derived
  from the instance index already on the GPU — no new buffer) so the resting
  field is a *living* constellation, not a static dot-screen. This is the
  "breathing" register (`config.breathing`) repurposed onto per-dot opacity
  instead of radius — cheaper and far more legible at rest.
- Make the plane disc fill the frame with a gentle **edge-density vignette**
  inverse to the dot-flow rebuild: here density rises toward CENTER lightly so
  the card has a warm core glow at rest (the content-deferential inverse is the
  dot-flow's job; this viz is the *foreground* field, it owns the center).

### Move 3 — MAKE THE TWO REGISTERS CATEGORICALLY DISTINCT

The plane and sphere must not render as the same blob.
- **plane**: full-frame flat lattice (already), but with the resting twinkle +
  the lens-warp well — reads as a *backdrop field*. Wide, flat, ambient.
- **sphere**: bump default `radius 0.42 → 0.55` and `depthFade` so the **globe
  silhouette is unmistakable** — a clear translucent dot-SHELL with a lit near
  hemisphere and a fading rim, slowly tilting. The well here is a surface-dimple
  + parallax (the dots on the sphere skin push/pull under the cursor), visibly
  different from the plane's flat in-plane gather. The toggle must produce two
  *obviously different silhouettes* (flat field vs floating globe), which is the
  whole point of having two registers.

### Move 4 (THE GROUND DEPENDENCY — §3) — fold a COLOURFUL-GROUND token, default the demo to a warm field behind glass

The dots cannot be warm-on-white and read as warm. The greenfield FOLDS a
**colourful-ground dependency** into the demo chassis (NOT the library default —
presets-in-consumers): the `ShowcaseFrame tier="field"` host gets a warm
sectioned ground (a calm `Aurora` low-opacity mesh OR a static warm radial-mesh
token `--viz-ground-warm`) so the cream dots sit over a warm-amber-to-rose field
with a defined glass edge (§3: a colourful field behind glass + a defined edge).
Dark mode: the dots over a deep warm-brown ground (the near-black reference
preset, NOT navy — the purge). This is the SYSTEMIC §3 fold shared across all 6
flat-page vizzes; this lens declares the *dependency* and consumes it here. The
library default stays `background: transparent` (the glass card shows through);
the demo PRESET supplies the warm ground.

### Move 5 — KEEP the twin parity + lifecycle UNTOUCHED (it's fit)

Every change is in the shared math (`if(isPlane)` branch, mirrored sphere branch)
+ one uniform lane + the demo preset/ground. The WGSL and GLSL twins get the
IDENTICAL edits (the swirl rot, the twinkle, the rim) — the parity anchor holds
because both read the same `uU6`/`uU3` lanes + the same per-instance index. The
substrate lifecycle (offscreen-pause, PRM one-frame-park, no second rAF, the
shared pointer field) is BYTE-UNTOUCHED.

---

## 3. THE UNIFORM DELTA (source-verified; ONE new lane, reuse the rest)

`uU6 = (layout, gravityStrength, gravityRadius, planeScale)` is FULL (4 lanes).
The swirl + twinkle need 2 scalars. Options, cheapest first:

- **Reuse `uU2.z/.w` in the plane branch.** In `plane`, `uU2 = (facingLo,
  facingHi, sizeLo, sizeHi)` — but `sizeLo/sizeHi` are the SPHERE DOF taper, and
  the plane branch hardcodes `sizeTaper = 0.8 + 0.9·nearness`. So in plane mode
  `uU2.z/.w` are FREE → repurpose as `(gravSwirl, twinkleRate)`. ZERO new lanes,
  zero buffer-layout churn, parity-trivial (both twins already read `uU2`). This
  is the KISS pick.
- The per-dot `twinklePhase` is derived on-GPU from `instance_index`/`sphereIdx`
  (a `fract(sin(ii·12.9898)·43758.5)` hash — already a common idiom; no new
  attribute, the dots buffer stays 16-byte `(unitPos.xyz, sphereIdx)`).

So the DELTA is: **0 new uniform lanes, 0 new buffers, 0 new passes** — repurpose
two free plane-mode `uU2` lanes + an on-GPU index hash + raised default scalars.
Maximally deft.

Config additions (`DotMatrixConfig`): `gravitySwirl: number` (0–1, the arc
curl), `twinkle: number` (0–0.3, the resting shimmer depth). Defaults:
`baseOpacity 0.72`, `gravityStrength 0.78` (deeper), `gravitySwirl 0.5`,
`twinkle 0.12`, `radius` (sphere preset) 0.55. The `gravityRadius 0.7` stays but
the *visible* gain rises via the swirl + the higher base. NO magic constants in
the shader — every number flows from a named config field through the bridge.

---

## 4. CROSS-ENGINE (Chrome + Safari) — §L7 arm

This viz is **born-GPU instanced billboards** — there is NO `backdrop-filter:url`,
NO SVG goo, NO meatball filter in the dots themselves (the goo register is the
SEPARATE `goo-dot-matrix` viz — no dup). So the WebKit fence is light:
- **WGSL primary** where WebGPU is present (Safari 17.4+ ships WebGPU behind the
  feature; the substrate picker resolves it), **WebGL2 instanced-billboard
  fallback** everywhere else (Safari's default path). Both twins get the
  identical swirl/twinkle/rim math — the parity anchor (the `proof:dot-matrix`
  ΔE clause) holds.
- The colourful GROUND (Move 4) is where the §L7 care lives: if it's an `Aurora`
  mesh it inherits Aurora's Safari fence (sRGB interp, no `backdrop-filter:url`,
  compositor-only); if it's the static `--viz-ground-warm` radial-mesh token it's
  a plain CSS `radial-gradient` (Baseline-universal, zero risk). Prefer the
  static token for the default preset (cheaper, one fewer GL context — the
  one-GL-per-route budget) and offer the live-Aurora ground as the loud preset.
- `linear()` springs live in JS (`useDotMatrix.springStep`), not CSS — engine-
  agnostic. The premultiplied `ONE,ONE_MINUS_SRC_ALPHA` blend is WebGL2/WebGPU
  identical.

---

## 5. a11y / PRM carve (§L5)

- **PRM** → the shared `usePointerVelocityField.tick(0)` freezes the well; the
  substrate paints ONE static frame then parks; the twinkle FREEZES (the
  per-dot `sin` clock reads `time=parkTime`, held). The field reads as a crisp
  static constellation — the gravity + twinkle are motion, PRM kills both, the
  lattice + the (frozen) well-gather survive as a still image. NO net motion.
- **WCAG 2.2.2** → the `paused` toggle (`DockBackgroundToggle` seam, already
  wired via `v-model:paused`) parks the loop on demand.
- **`prefers-contrast: more`** → floor `baseOpacity` UP (the dots are a
  legibility-neutral decorative field; raising contrast only helps) and deepen
  the dot core toward the amber stop.
- **`prefers-reduced-transparency`** → the dots are decorative, not a
  transmissive scrim; leave them (they're additive light, not a blur veil). The
  GROUND, if live-Aurora, drops to the static token.

---

## 6. RECONCILE — vs the 116 union waves + the sibling dot vizzes (NO dup)

- **vs `goo-dot-matrix`** (BC.W-VIZ-HYBRID, `/substrates/goo-dot`): that viz is
  the metaball SDF FIELD drawn as dots (dot-field/dither/lattice/sphere
  registers, the `sceneDistG` thickness drives size). DISTINCT: dot-matrix is a
  STATIC phyllotaxis lattice with a cursor-gravity LENS; goo-dot is a DYNAMIC
  merging-blob field. No overlap — keep both. The swirl-lens here is NOT the goo
  merge there.
- **vs `dot-flow-field`** (`W-DOTFLOW-REBUILD`): that is the density-gradient
  halftone VIGNETTE (dense edges → clear center, content-deferential, calm
  twinkle, NO advection) — a BACKDROP that recedes. dot-matrix is the
  FOREGROUND field that OWNS the center with an active gravity well. The
  twinkle idiom is SHARED (both want a calm in-place shimmer) — propose a tiny
  shared `dotTwinkle(phase, rate)` GLSL/WGSL snippet in the procedural-color
  chunk neighbourhood so neither re-implements it (DRY), but the registers stay
  distinct.
- **vs `BD.W-DOT-UNIFY`**: no on-disk wave file exists yet (grep: 0 hits in
  `docs/tranches/BD/waves/`; it's named in the brief + the VIZ-DAG/ROSTER as a
  planned unification). This lens's DELTA *feeds* that unify: the shared
  `dotTwinkle` snippet + the shared `fwidth`-SDF + the shared premultiplied blend
  + the shared phyllotaxis are the unify surface. Recommend `W-DOT-UNIFY` adopt
  this lens's `dotTwinkle` + the `uU2`-repurpose pattern as the common idiom.

---

## 7. THE DELTA-ASSAY → wave amendment

**`BD.W-DOTMATRIX-GRAVITY-LENS`** (calibration + ground fold, NOT a rebuild):

1. **Lens warp** — add the tangential `rot(gravSwirl·well)` arc-curl + the
   dark-rim band to the well in BOTH branches, both twins (`dot-matrix.wgsl.ts` +
   `.glsl.ts`); repurpose plane-mode `uU2.z/.w → (gravSwirl, twinkleRate)`.
2. **Resting floor** — `baseOpacity 0.72` + the per-dot index-hash twinkle
   (on-GPU, no new attribute) so the field reads at rest; both twins.
3. **Register distinction** — sphere preset `radius 0.55` + depth so the globe
   silhouette is unmistakable vs the flat plane.
4. **Colourful ground (§3 fold)** — a `--viz-ground-warm` static radial-mesh
   token + the demo preset wires it under `ShowcaseFrame tier="field"`; dark =
   warm-brown (NOT navy); library default stays transparent (presets-in-
   consumers). Shared with the 6-viz §3 fold.
5. **Config** — add `gravitySwirl`, `twinkle` to `DotMatrixConfig`; raise the
   defaults; NO magic shader constants (all from named config → bridge → lane).
6. **DRY** — extract `dotTwinkle()` to a shared GLSL/WGSL snippet for
   `W-DOT-UNIFY` (dot-flow + goo-dot reuse).

**Gates** (the harden bar):
- A paired-engine π FRAME-SERIES (chromium + webkit) proving the **lens warp**:
  with the cursor held, dots within `2.5·gravityRadius` are measurably displaced
  toward the cursor along arcs (centroid-shift of the local lattice toward the
  cursor ≥ a threshold), born-RED on the current radial-blob-only well.
- A π proving the **resting field reads**: lit-pixel fraction at rest over the
  warm ground ≥ a floor (born-RED on the current invisible-on-white state).
- A π proving **register distinction**: the plane and sphere screenshots differ
  by a silhouette metric ≥ a threshold (born-RED on the current
  identical-blob state).
- `proof:teal-navy-purge` clause 5 stays GREEN (hue ∉ [180,270]); `proof:no-gray`
  warm-floor over the new ground.
- Parity: the WGSL/GLSL ΔE clause holds (both twins edited identically).
- Lifecycle: offscreen-park + PRM-freeze + `paused` seam unchanged (regression
  π).

**Convergence after the wave: ~95%** (engine was always 100%; this lands the
read-at-rest, the lens legibility, the register distinction, the ground).

---

## 8. ONE-LINE SUMMARY

Keep the (fit) gravity engine, parity, and lifecycle untouched; the viz is
broken because the FIELD is invisible, not because gravity is weak — so RAISE the
resting floor (opacity + per-dot twinkle), turn the well from a spotlight-blob
into a **space-warp LENS** that bends the whole local lattice inward along curved
arcs with a dark event-horizon rim (the bold move), make the plane vs sphere
silhouettes categorically distinct, and FOLD the systemic §3 colourful-warm
ground so the cream dots finally read — all as a calibration + a ground
dependency over the extant engine (0 new uniform lanes by repurposing the free
plane-mode `uU2` lanes), never a re-fork.
