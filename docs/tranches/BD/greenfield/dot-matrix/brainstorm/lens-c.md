# dot-matrix — GREENFIELD lens-c (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> The viz: a dot-matrix field with strong cursor-GRAVITY (a pulled/warped gravity
> well) + a 2D-PLANE background register vs the 3D-sphere default.
> Lens: 1940s-technicolor FLOW & PUNCH — anticipation · exaggeration ·
> follow-through · overlapping action · arcs · squash/stretch with WEIGHT.
> Source-verified at HEAD; live-interrogated /substrates/dot-matrix (Chrome :5173,
> both modes, canvas readback). Survival-of-the-fittest UNION with the shipped
> engine + the `isPlane{}` branch + `uU6`. No re-fork. NO teal/navy (hue∈[180,270]
> purged — BINDING). Warm-no-gray floor BINDING.

---

## 0. LIVE INTERROGATION — what actually reads (the born-truth)

Captured live (`/substrates/dot-matrix`, default = **plane** register, both shots
in `brainstorm/scratch/`):

**(1) Does cursor-GRAVITY read?** — **YES, but as the WRONG GESTURE.** Source is
real (`uU6.y/.z` deep+wide Gaussian well, source-verified: `dot-matrix.wgsl.ts`
L141–145, `glsl` L75–78). Live canvas readback at the cursor window vs a far
control: lit-fraction **0.097 at the well vs 0.016 far** — a **~6× density-gather**,
maxAlpha 184 vs 79. So dots genuinely gather + brighten + swell toward the pointer.
**The defect:** it reads as a *static bright disc that pools under the cursor* — a
gather, not a **warp/pull with a visible directional comet-tail + inertial arc +
overshoot**. The `springStep` lag (ζ=0.7, `useDotMatrix.ts` L123–128) exists in the
*scalar engage* but the **per-dot displacement has no direction memory** — `lift =
toCursor * well` is radially symmetric, so a fast horizontal sweep produces the same
round pool as a slow approach. There is no anticipation, no trailing wake, no arc.
The "morph-MORE-on-move / liquid-weight" feel is **absent** — `pointer.velocity`
(a real vec2 with DIRECTION) and `pointer.acceleration` are exposed by
`usePointerVelocityField` (source-verified L92–96) but the shader only consumes
`speed` (a scalar magnitude) — **the directional levers are computed and thrown away.**

**(2) Is the 2D-PLANE register working + coherent?** — **Working, distinct, but
flat + faint.** It's a genuine register (a flat sunflower-phyllotaxis disc, z=0,
`planeScale`-scaled to fill the viewport — `uniformBridgeWGPU.ts` L111–124, L211),
NOT the spinning globe. So mode-distinctness ✓. **The defect:** the resting field
is a **uniform faint tan lattice over a flat cream card** — near-invisible
(baseOpacity 0.5 × facingOpacity, dots ~1.8px, `meanLit [177,150,126]` over cream =
near-zero contrast). It reads dead until the cursor wakes the well. Coherent? Yes,
but inert — a uniform grid has no composition; only the cursor gives it a focal point.

**(3) Vivid/warm not gray + colorful field?** — **FAILS both.** Palette is
`WARM_IDENTITY_PALETTE {L:.92,C:.03,h:78}` (source-verified `constants.ts` L83–88) —
warm in *hue* but **C:0.03 is effectively gray** (the BA.W-NO-GRAY floor is C≥~0.04
for a read-as-color). Over the **flat cream card** (`ShowcaseFrame tier="field"`, no
ground), the dots read as **dusty-tan-on-cream — low-contrast gray-warm.** This is
the SYSTEMIC §3 finding confirmed for a 6th viz: **the page is FLAT.** No colorful
field behind the glass. `pageBg: transparent`.

**(4) Twin parity / lifecycle / perf** — **EXCELLENT, keep byte-for-byte.** The
WGSL ↔ GLSL twin is line-for-line (both carry the identical `isPlane{}` branch +
`uU6` lanes; verified both files). One uniform layout source-of-truth
(`uniformBridgeWGPU.ts`, std140≡WGSL by construction). Substrate park/PRM/offscreen
all inherited via `createGpuSubstrate` + the shared `usePointerVelocityField` (no
own rAF). This spine is **100% FIT — the engine is not the problem; the READ + the
GESTURE + the GROUND are.**

**Verdict: REFINE the gesture (the gravity warp), RE-GRADE the read (vivid warm +
colorful ground), KEEP the engine spine + twin + lifecycle byte-for-byte.**
Convergence ~50%: distinctness + well-math + twin + lifecycle ship; the
liquid-weight DIRECTIONAL warp, the vivid-no-gray grade, and the colorful ground are
the gap.

---

## 1. THE CORE IDEA — "the gravity is a LIVING liquid lens, not a pool"

Re-conceive the cursor as a **heavy liquid lens dragged across a taut warm-amber
membrane**. The dots are not pulled into a symmetric pool — they are **swept into
the cursor's WAKE**: anticipating its arrival (dots ahead of the travel lean in
early), stretching along the travel axis (squash/stretch on the velocity vector),
trailing a **comet-tail** behind the moving lens (overlapping action), and easing
back to the lattice on a spring with **overshoot** (follow-through) when it stops.
The well becomes a *directional, inertial deformation* — the user FEELS the weight
because the field deforms MORE the faster you move and the deformation LAGS + ARCS.

Three technicolor punches layer on top, all gated to the cursor so the resting field
stays calm + content-deferential:
- **Anticipation lean** — dots in a forward cone (ahead of `pointer.velocity`) tilt
  toward the incoming cursor *before* it arrives (the squash-and-anticipate of a
  cartoon take).
- **Velocity squash/stretch** — the well ellipse **stretches along the travel axis,
  squashes perpendicular** (a fast horizontal sweep makes a horizontal lozenge of
  gathered dots, not a circle) — volume-preserving deformation, the cartoon weight.
- **Comet-tail follow-through** — a trail of brightened dots streams *behind* the
  moving lens along `−velocity`, decaying over ~0.4s (overlapping action). On a flick
  (`burst`), the tail over-extends then snaps back (the exaggeration take).

And the field itself gets the technicolor **READ + GROUND** so it's vivid not gray
and sits over a colorful field (§3).

---

## 2. THE SINGLE BOLDEST MOVE

**The DIRECTIONAL GRAVITY LENS — make the well an anisotropic, velocity-warped,
wake-trailing liquid deformation by feeding the already-computed
`pointer.velocity` + `acceleration` vectors (currently THROWN AWAY) into a new
`uVel`/`uAccel` uniform lane, and replacing the radially-symmetric `lift =
toCursor * well` with a velocity-aligned squash/stretch + a comet-tail term.**

This is the one move that converts the live "static bright pool" into a **felt
liquid-weight pull with anticipation, arcs, and follow-through** — and it costs ZERO
new measurement (the vectors already exist in `usePointerVelocityField`, source-
verified L92–96) and ONE new uniform lane (`uU7`), transcribed identically into both
twins. It is the literal answer to the user's "MORE cursor-gravity / morph-more-on-
move / liquid-weight" ask, and it is born-RED on the current symmetric pool (a π
asserting the gathered-dot footprint is an ELLIPSE elongated along the travel axis
during a horizontal sweep, and that a comet-tail of lit dots trails behind the
cursor — both impossible in the current `toCursor`-only math).

---

## 3. THE MECHANISM (source-verified levers; deft union, no re-fork)

### 3a. The new uniform lane (ONE addition, both twins)
Add **`uU7 = (velX, velY, accelMag, wakeStrength)`** to the existing uniform table
(`uniformBridgeWGPU.ts` — extend `U_OFF`, bump `DOT_RENDER_UNIFORM_BYTES` by one
vec4; the std140≡WGSL invariant holds by construction since it's ONE declaration).
Both `dot-matrix.wgsl.ts` (`struct Uniforms`) + `dot-matrix.glsl.ts` (`uniform vec4
uU7`) gain the identical line — the line-for-line twin discipline already in place.

`useDotMatrix.ts onFrame` writes it from the SHIPPED field (no new rAF, no new
measurement):
```
push.velX = pointer.velocity.value.x   // already computed, currently unused
push.velY = pointer.velocity.value.y
push.accelMag = hypot(pointer.acceleration.value)   // the flick-take magnitude
// wakeStrength rides the SAME spring engage already there (ζ=0.7 lag → the lens LAGS)
```
The `DotPointerState` interface (`uniformBridgeWGPU.ts` L35–45) gains `velX, velY,
accelMag` (the closed-over push state — never the config). `restingPointer()` zeros them.

### 3b. The directional warp (replace the symmetric lift — PLANE register)
In the `if(isPlane){}` branch (both twins), replace `lift = toCursor * well` with the
**anisotropic velocity-warped lens**:
```glsl
vec2 vel = uU7.xy;                       // travel direction+speed (NDC/frame)
float vmag = length(vel);
vec2 vdir = vmag > 1e-4 ? vel / vmag : vec2(0.0);
// 1. ANTICIPATION — dots ahead of travel feel the well EARLIER (shift the well
//    sample point forward along travel by the lag).
vec2 wellCenter = pointerNdc + vdir * uU7.w * 0.18;   // the lens LEADS its math-center
vec2 toLens = wellCenter - base2d;
// 2. SQUASH/STRETCH — measure distance in a frame STRETCHED along travel (vol-preserving).
float along = dot(toLens, vdir);
float perp  = dot(toLens, vec2(-vdir.y, vdir.x));
float stretch = 1.0 + clamp(vmag * 6.0, 0.0, 0.8);    // elongate along travel
float dEllipse = length(vec2(along / stretch, perp * stretch));
float well = gravStrength * exp(-(dEllipse*dEllipse)/(2.0*gravRadius*gravRadius)) * pAct;
vec2 lift = toLens * well;
// 3. COMET-TAIL — a wake of pull BEHIND the lens (overlapping action; follow-through).
float behind = max(0.0, -along);                      // dots behind the travel
float tail = uU7.w * exp(-behind*behind/(gravRadius*gravRadius)) * vmag * 5.0;
lift -= vdir * tail * gravRadius;                      // streamed back along −travel
```
`burstPull` (the flick over-pull, already present) stays + gets the `accelMag` take:
the flick now over-extends the tail then the spring snaps it back (the exaggeration).
**Brightness/swell** ride the same ellipse `nearness` so the gathered lozenge GLOWS
(the technicolor punch), and the comet-tail dots carry a `wake` brightness so the
trail READS.

### 3c. The SPHERE register gets the SAME lens (parity, no second mechanism)
The `else{}` (sphere) branch already has `well + lift = n.xy * well` — apply the
identical velocity-stretch to its `pd`/`lift` so the globe's surface dots **smear
toward the cursor along travel** + carry a wake. ONE warp idiom, both registers (the
dock-orientation `dim`-idiom: one mechanism, two layouts). No fork.

### 3d. VIVID-NO-GRAY re-grade (§3 read; warm-fire ladder, NO teal)
The default `WARM_IDENTITY_PALETTE {C:.03}` is gray-warm. Re-grade the **library
default** to a **vivid warm-amber→gold ladder** (the lib's identity evolves in
`src/`, presets-in-consumers — the mono-warm reference stays a DEMO preset):
```
WARM_IDENTITY_PALETTE = [
  { L: 0.90, C: 0.10, h: 75 },   // vivid warm-gold (lit core / near-cursor)
  { L: 0.78, C: 0.13, h: 48 },   // saturated amber-ember (rim / wake)
]
```
hue∈[48,75] ⊂ warm band — clears `proof:teal-navy-purge` (hue∉[180,270]) by
construction; C≥0.10 clears the BA.W-NO-GRAY floor. The cursor-near dots sample the
**hot gold** stop (tone→0), the wake/rim the **ember** stop (tone→1) — so the moving
lens drags a **hot-gold-cored, ember-tailed comet** across the field (the 1940s
technicolor register: bold saturated warm with a glowing core).

### 3e. The COLORFUL GROUND (§3 dependency — fold the SHIPPED primitive, no re-fork)
The viz must sit over a colorful field, not flat cream. **Reuse the shipped
`auroraFallbackGround.ts`** (source-verified `src/components/custom/aurora/
composables/auroraFallbackGround.ts` — the compositor-only CSS warm-mesh ground, no
GL context) as a `<div>` BEHIND the canvas in the demo `ShowcaseFrame` (a slow
warm-amber/rose conic drift), so the dots read against a **living warm field with a
defined edge**, not flat cream. This is a DEMO-composition fold (presets-in-
consumers) + a `--content-ground` affordance the page chassis declares — NOT a new
library engine, NOT a second GL pipeline (the goo-dot lesson: do not bolt a 2nd
program; the CSS ground is the deft path). The dots' premultiplied-alpha additive
read GAINS on a warm ground (the ember tail glows over amber).

### 3f. The cartoon SHADOW (the 1940s layered-offset, gated to opaque/active)
The gathered lozenge + comet-tail carry a **layered-offset drop** read: a second
faint dark-amber dot stamp offset by `vdir * burst` (the shadow leads the squash) so
the deformed cluster reads as a **lifted, weighted body casting a directional
shadow** (the cartoon cast). Gated to `pointer.active` + `accelMag` (only when the
lens is moving/heavy) so the resting field stays clean. Source-wire: a `uShadow`
term in the same `uU7.w` budget driving a pre-pass dark stamp — NOT a static scalar
(the goo-dot lesson: wire the shadow to LIVE `burst`/`accelMag`, never a frozen
constant).

---

## 4. THE READ — visual + motion + interaction spec

| Register | Resting | Cursor-active | Flick (burst) |
|---|---|---|---|
| **plane (default)** | vivid warm-gold faint lattice over a living amber-rose ground, calm in-place breathe | a hot-gold lozenge of gathered+swollen dots STRETCHED along travel, ember comet-tail streaming behind, anticipation-lean ahead | the tail over-extends + the cluster pops ~1.15× then springs back with overshoot (the take) |
| **sphere (preset)** | vivid warm dot-globe, slow tilted spin, depth-shaded shell | surface dots smear toward the cursor along travel + a wake on the near hemisphere | a one-shot brightness bloom + an over-smear that recoils |

**Motion law (liquid-weight universal, BINDING):** every leg carries inertia — the
lens LAGS the cursor (ζ=0.7 spring, already shipped), the deformation grows with
velocity (`stretch ∝ vmag`), the wake trails (overlapping action), the return
overshoots then settles (follow-through). NEVER tight/springy-snap. Arcs come free
from the velocity-vector following the cursor's curved path.

**√φ proportion:** the well radius, the stretch cap (0.8), the lead-distance (0.18),
and the lozenge swell (≈1.15×) ladder off √φ ratios (the lead is gravRadius/√φ², the
swell is the √φ cell-clip ceiling the goo-dot golden pins).

---

## 5. CROSS-ENGINE (Chrome + Safari) + a11y/PRM

- **Twin parity:** every shader change is transcribed line-for-line into BOTH
  `dot-matrix.wgsl.ts` + `dot-matrix.glsl.ts` (the discipline already in place); the
  `uU7` lane is ONE uniform-table declaration → std140≡WGSL by construction. The
  `BD.W-VIZ-PARITY-METAL` LIVE net (Metal×ANGLE) gates the actual paint, not a proxy ΔE.
- **No `backdrop-filter:url`, no SVG goo here** — the dot field is additive billboard
  quads + the CSS ground is compositor-only conic-gradient (Safari-safe sRGB). No
  meatball filter on this viz (the gather is density, not a metaball merge — distinct
  from goo-dot-matrix; no dup).
- **PRM:** `respectReducedMotion` → the substrate paints ONE static frame then parks
  (shipped); the pointer field `tick(0)` freezes velocity/accel/burst → the warp
  collapses to a calm symmetric resting well (no directional motion under PRM). Pin
  the PRM capture to a deterministic mid-engage phase (the goo-dot lesson: never
  freeze at t=0 max-separated).
- **WCAG-2.2.2 pause** inherited via the `DockBackgroundToggle` seam (shipped).
- **Offscreen-park / one-GL-per-route** inherited (shipped).
- **Perf:** zero new measurement (vectors already computed), ONE uniform lane, no new
  pass — the warp is a few extra ALU ops in the existing vertex shader. 60fps held.

---

## 6. DELTA-ASSAY → the wave-amendment (reconcile vs the 116 union waves)

**UNION, not a new viz.** Extend the shipped DotMatrix engine + the `isPlane{}`
branch + `uU6`; the spine (twin, substrate, phyllotaxis, pointer field, color) is
KEEP-byte-for-byte. Survival-of-the-fittest: the distinctness + well-math + lifecycle
SURVIVE; the symmetric-pool gesture is REFINED (directional lens); the gray read +
flat ground are RE-GRADED/FOLDED.

- **AUGMENT `BC.W-VIZ-DOTMATRIX`** — the engine base; add the `uU7` velocity lane +
  the directional-lens warp (both twins) + the vivid-warm default re-grade. Engine
  spine frozen; the `proof:dot-matrix` round-trip + flat-uniform bites stay GREEN.
- **NEW `BD.W-DOTMATRIX-LIQUID-LENS`** — the directional-gravity re-author (the
  velocity-warp + squash/stretch + comet-tail + anticipation + cartoon-shadow +
  vivid-warm grade). Gate `proof:dotmatrix-lens` G1–G5 born-RED, paired-engine, both
  modes: **G1** gathered-footprint is an ELLIPSE elongated along travel during a
  horizontal sweep (eccentricity > threshold; born-RED on the symmetric pool); **G2**
  a comet-tail of lit dots trails BEHIND the cursor along −velocity (lit-frac behind
  > lit-frac ahead during motion); **G3** vivid-warm: mean painted chroma ≥ 0.10 +
  hue∈[20,90] (NO teal — re-runs the purge cyan bite); **G4** the colorful ground is
  present (page-bg non-flat behind the canvas, both modes); **G5** PRM → symmetric
  calm well, no directional warp, deterministic mid-engage capture.
- **COORDINATE `BD.W-DOT-UNIFY`** — land the lens warp BEFORE unify re-homes the
  mechanism (the velocity lane + warp idiom should be the shared construction-time
  permutation, not re-derived); resolve the `<DotMatrix>` name collision there.
- **FOLD §3 colorful-ground** — reuse the shipped `auroraFallbackGround` CSS ground
  as the demo/chassis affordance (`BD.W-PAGE-BACKGROUND` family); NOT a 2nd GL pass.
- **NO DUP:** distinct from `goo-dot-matrix` (SDF metaball-as-dots, a merge/neck
  gesture) + `dot-flow-field` (advected/halftone-vignette flow). This viz's signature
  is the **directional liquid GRAVITY LENS** — a gesture neither sibling owns. Shares
  only the φ-twinkle + warm-ground idiom (adjacent, no edge).
- **EXCISIONS (no-legacy):** none of the symmetric-lift math is aliased — the
  `toCursor * well` line is REPLACED in place (clean break). The thrown-away
  `pointer.velocity`/`acceleration` are now CONSUMED (no dead config).

**Remaining build-time risk:** the squash/stretch eccentricity calibration (so it
reads as weight, not a glitchy smear) + the comet-tail decay tuning (overlapping
action without a muddy streak) + the live Metal×ANGLE paired-engine number the proxy
owes (user-gated) + the vivid-warm re-grade clearing the purge bite on a fresh
capture.
