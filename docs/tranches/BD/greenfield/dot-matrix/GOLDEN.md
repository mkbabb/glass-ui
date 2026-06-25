# DotMatrix — the GOLDEN reference (canonical greenfield spec)

> **⚠ HARDENING BANNER (folded post-challenge + post-delta-assay; these SUPERSEDE the body
> where they conflict — see `DELTA-ASSAY.md` §3 + `WAVE-AMENDMENT.md`):**
> The spine SURVIVES all 3 challenges (reclaim the dead velocity vectors → directional liquid
> lens; ONE `u7` lane both twins both registers; read-at-rest + vivid + ground). But these
> body claims are REPLACED:
> 1. **§2.4/§2.6 src palette + baseOpacity lift → a DEMO `DOT_MATRIX_PRESET_VIVID`.**
>    `WARM_IDENTITY_PALETTE` (C:0.03) + `baseOpacity 0.5` stay BYTE-FROZEN in `src/`
>    (presets-in-consumers; the F5/teal-navy fences). G4/G6 assert the floor on the DEMO page.
> 2. **§2.5/§7 cross-viz `presence`/`dotTwinkle` GLSL helper → DROPPED.** W-DOT-UNIFY F1: no
>    shared render leaf (vertex vs fragment stage). Keep dot-matrix-LOCAL vertex-stage snippets.
> 3. **§2.7 `auroraFallbackGround` reuse → a NEW ~6-line warm `radial/conic-gradient` CSS
>    primitive.** `auroraFallbackGround` is aurora's STATIC blue-cyan raster → a
>    `proof:teal-navy-purge` violation behind warm dots + contradicts "warm drift."
> 4. **§2/§5 a11y "already wired" → net-new work items;** pin `uTime` under PRM for a
>    deterministic twinkle (G9).
> 5. **§1 cartoon-shadow stretch-gate → PROMOTED into the headline** (a cheap per-instance
>    offset-duplicate billboard; G12) — the 1940s cast is a BINDING precept, not opt-in.
> 6. **§2.3 plane geometry → re-lay viewport-filling + edge-clearing** (the center-dense
>    sunflower disc cannot self-clear; G5 stays RED on it). §2.1 byte-offsets: `u7` AFTER `u6`
>    (off 112), shift spin/ints/bg/pal +16, total 272. §4 "sRGB throughout" → OKLab-on-GPU
>    (the rim-active frame joins the G8 capture; EXCISE the L199 `out.tone`).
> 7. **§6 G2 → velocity-CONDITIONED centroid-behind AVG + luminance comet-tail PRIMARY; NEVER
>    a single-frame swept-ecc.** Live this session: the current symmetric pool reads static-hold
>    ecc 1.003 (a circle) but a SWEEP reads ecc 2.735 / centroid-behind +0.196 as pure
>    sweep-history artifact — the false-pass trap. §8 spike radius 0.30 → re-anchor at the
>    SHIPPED (lowered ~0.34) radius. §7 convergence "~95%" → engine 100% / felt-viz ~0% built.


> The viz: a warm dot-matrix field with **strong cursor-GRAVITY** (a pulled/warped
> gravity well — a *directional liquid lens*, not a symmetric pool) + a **2D-PLANE
> background register** (the default) vs the kept 3D dot-sphere preset.
>
> Synthesized from lens-a (PURE iOS-27 / the liquid-glass LENS optics), lens-b
> (CROSS-ENGINE / the zero-churn uniform path + resting-floor twinkle), lens-c
> (AUDACIOUS / the thrown-away velocity vectors → the directional wake). Source-
> verified at HEAD against `dot-matrix.{wgsl,glsl}.ts`, `uniformBridgeWGPU.ts`,
> `useDotMatrix.ts`, `constants.ts`, `usePointerVelocityField.ts`.
>
> **The verdict all three lenses reach (and this GOLDEN ratifies):** the engine,
> the WGSL↔GLSL twin, the `createGpuSubstrate` lifecycle, the phyllotaxis, the
> `usePointerVelocityField` reader, the `springStep` liquid-weight, and the
> `isPlane`/`u6` branch are **FIT — keep byte-for-byte.** Three things are broken
> and only three: (1) the gravity reads as a *static symmetric pool*, not a felt
> *directional pull* (the velocity/accel vectors are computed then thrown away);
> (2) the resting field is *invisible* (warm-cream-on-cream whisper); (3) there is
> no *colourful ground* and no *lens optics* to make the warp legible. This is a
> **REFINE + a GROUND-fold over the extant engine — never a re-fork.**

---

## 0. The reconciled design in one line

The cursor is a **heavy liquid-glass lens dragged across a taut warm membrane**: it
**leads-anticipates** its travel, **stretches** the gathered dots along the travel
axis (squash/stretch with real weight), drags an **ember comet-tail wake** behind
it (overlapping action / follow-through), **magnifies + brightens + chromatically
refracts** the lattice beneath it (the iOS-27 glass read), and eases back to the
lattice on the **already-shipped ζ=0.7 spring** with overshoot when it stops — all
over a **vivid warm field that finally READS at rest** (raised floor + per-dot
twinkle) sitting on a **living warm-amber→rose ground** (the §3 fold via the shipped
`auroraFallbackGround`). The plane register gains a **content-deferential vignette**
the lens **punches through**, making it a true backdrop that springs to life on
touch. The same lens idiom drives the sphere register (one mechanism, two layouts).

---

## 1. The cross-lens reconciliation — what each lens contributed, and the tensions resolved

| Move | Source | Kept in GOLDEN | Why / tension resolved |
|---|---|---|---|
| **Directional velocity-warp lens** (consume `pointer.velocity`/`acceleration`, anisotropic squash/stretch along travel, comet-tail wake, anticipation-lean) | **lens-c** (boldest) | **YES — the headline** | This is the literal answer to "MORE cursor-gravity / morph-more-on-move / liquid-weight". The vectors already exist (`usePointerVelocityField` L92–96, source-verified) and are *thrown away* — the shader reads only the scalar `speed`. Reclaiming them is correct, deft, and born-RED on the symmetric pool. |
| **Lens OPTICS** (radial magnify + chromatic-rim refraction + specular catch-light) | **lens-a** | **YES — folded onto the warp** | iOS-27 glass *refracts*; a magnet does not. Magnify rides the existing `sizeTaper`; the chromatic rim rides the existing `vTone`/palette path (no new uniform). This gives the well a *defined edge* (§3) and makes it read as GLASS. Reconciled with lens-c: the magnify scales the **anisotropic ellipse** `nearness`, so the lens is *both* directional *and* optical. |
| **Resting-floor read** (`baseOpacity` lift + per-dot twinkle from the instance-index hash) | **lens-b** + lens-a/c | **YES** | The well has nothing to warp over an invisible field. Twinkle is the `breathing` register re-aimed onto per-dot opacity (cheaper, more legible) — free on-GPU index hash, no new buffer. |
| **Plane VIGNETTE** (content-deferential radial density the lens punches through) | **lens-a** (T17 fold) | **YES** | Turns the flat disc into a real *backdrop* (recedes behind content) that the cursor-lens locally re-densifies — the iOS-27 "calm until touched" duality. Shares the `presence = edgeFalloff·(1−centerClear)` helper with `W-DOTFLOW-REBUILD` (DRY, one density function). |
| **Colourful warm GROUND** (the §3 systemic fold) | all three (lens-c names the shipped primitive) | **YES — reuse `auroraFallbackGround`** | The dots cannot be warm-on-white and read as warm. Reuse the **shipped** compositor-only CSS warm-mesh ground (`auroraFallbackGround.ts`, source-verified) behind the canvas in the demo chassis — NOT a 2nd GL context (the one-GL-per-route budget; the goo-dot "don't bolt a 2nd program" lesson). |
| **Vivid-warm palette grade** | lens-c (library default) **tempered by** lens-a/b (presets-in-consumers) | **TEMPERED — see §2.6** | lens-c re-grades the *library default* to C≥0.10; lens-a/b keep the calm warm-cream as the *library identity* and push the loud read to a demo preset. **Resolution:** lift the library default a *measured notch* to clear the BA.W-NO-GRAY floor (C 0.03→0.055 core) so the lib reads-as-warm not gray (a correctness floor, not a loudness choice), and the *loud* technicolor amber→gold ladder is the demo preset. This honors both the warm-no-gray law AND presets-in-consumers. |
| **Sphere-arm gravity re-aim** (the dead sub-perceptual sphere well → the same screen-space lens) | lens-a + lens-c | **YES** | One warp idiom, both registers (the `dim`-idiom: one mechanism, two layouts). No second mechanism. |
| **Cartoon layered-offset SHADOW** on the gathered lozenge | lens-c | **DEFERRED to a stretch-gate** | Audacious and on-brief (the 1940s cast), but it risks a muddy second-stamp pass and is the highest calibration risk. Carry it as an **opt-in** behind the active+accelMag gate; ship the lens first, add the shadow only if the spike proves it clean. Survival-of-the-fittest: prove before promote. |

**Uniform-lane tension (the deftness crux).** lens-b's zero-new-lane path repurposes
the free plane-mode `uU2.z/.w`; lens-c adds a full `uU7` vec4. The reconciliation:
`uU2.z/.w` are free **only in the plane branch** (the sphere branch reads them as
the DOF taper — source-verified both twins), so a branch-dependent repurpose would
make the *sphere* lens impossible and is a readability trap. **GOLDEN adds ONE new
`u7` vec4 lane** — `u7 = (velX, velY, twinkleRate, wakeStrength)` — a SINGLE uniform-
table declaration, so the std140≡WGSL invariant holds *by construction* (the bridge
generates both from one table). Both registers consume it; the twinkle rides the
same lane (lens-b's shimmer, free of a 2nd lane). One lane, both registers, no
branch-fragility — the deftest *correct* path, slightly less miserly than lens-b but
strictly safer and DRY across both arms.

---

## 2. The MECHANISM (source-verified levers; deft union, no re-fork)

### 2.1 The new uniform lane (ONE addition, both twins)

Extend the layout table in `uniformBridgeWGPU.ts` (the ONE source-of-truth — the
WGSL struct + the JS offsets are generated from it, so this is a single edit that
keeps std140≡WGSL by construction):

```
//   u7 : vec4<f32>  off 112  (velX, velY, twinkleRate, wakeStrength)   ← NEW
// (the spin columns + ints + bg + palette shift down by 16 bytes;
//  DOT_RENDER_UNIFORM_BYTES grows by one vec4 → 208 + 4*16)
```

- WGSL `struct Uniforms` gains `u7: vec4<f32>,` after `u6`; GLSL gains
  `uniform vec4 uU7;` — the **identical** line in both twins (the line-for-line
  discipline already in place).
- `DotPointerState` (`uniformBridgeWGPU.ts` L35–45) gains `velX, velY, accelMag`
  (the closed-over push state — NEVER the config). `restingPointer()` zeros them.

### 2.2 `useDotMatrix.onFrame` writes the lane from the SHIPPED field (no new rAF, no new measurement)

In the existing `onFrame` (`useDotMatrix.ts` L105–131), after the spring engage:

```ts
const vel = pointer.velocity.value;          // already computed, currently UNUSED
push.velX = vel.x;
push.velY = vel.y;
push.accelMag = Math.hypot(                   // the flick-take magnitude (also unused today)
  pointer.acceleration.value.x,
  pointer.acceleration.value.y,
);
// wakeStrength rides the SAME spring engage already there (push.active, ζ=0.7) →
// the wake LAGS the cursor + settles with overshoot (the liquid-weight bounce).
```

`packDotRenderUniforms` writes `u7 = (push.velX, push.velY, config.twinkle,
push.active)` (wakeStrength = the spring-engaged `active`, so the wake is born of
the same inertial scalar). The twinkle **rate** lives in config; the per-dot
**phase** is hashed on-GPU from `instance_index` (no new attribute).

### 2.3 The directional liquid LENS — replace the symmetric lift (PLANE branch, both twins)

Replace `lift = toCursor * well` with the **anisotropic velocity-warped lens** (the
lens-c core, with lens-a's magnify folded into the ellipse `nearness`):

```glsl
vec2  base2d   = unitPos.xy * planeScale;
vec2  vel      = uU7.xy;                              // travel dir+speed (NDC/frame)
float vmag     = length(vel);
vec2  vdir     = vmag > 1e-4 ? vel / vmag : vec2(0.0);
float wake     = uU7.w;                               // spring-engaged (ζ=0.7) → LAGS+overshoots

// 1. ANTICIPATION — the lens LEADS its math-center along travel (dots ahead feel it early).
vec2  wellC    = pointerNdc + vdir * wake * LEAD;     // LEAD = gravRadius / PHI^2  (√φ ladder)
vec2  toLens   = wellC - base2d;

// 2. SQUASH / STRETCH — measure distance in a frame STRETCHED along travel (vol-preserving).
float along    = dot(toLens, vdir);
float perp     = dot(toLens, vec2(-vdir.y, vdir.x));
float stretch  = 1.0 + clamp(vmag * STRETCH_GAIN, 0.0, STRETCH_CAP);   // CAP = 1/√φ ≈ 0.786
float dE       = length(vec2(along / stretch, perp * stretch));
float well     = gravStrength * exp(-(dE*dE)/(2.0*gravRadius*gravRadius)) * pAct;
vec2  lift     = toLens * well;

// 3. COMET-TAIL WAKE — a pull streamed BEHIND the lens (overlapping action; follow-through).
float behind   = max(0.0, -along);
float tail     = wake * exp(-(behind*behind)/(gravRadius*gravRadius)) * vmag * WAKE_GAIN;
lift          -= vdir * tail * gravRadius;

// the flick burst (uU3.z, already present) over-extends the tail then the spring snaps it.
vec2  burstPull = toLens * (uU3.z * 0.4 * exp(-(dE*dE)/(gravRadius*gravRadius))) * pAct;
center2d        = base2d + lift + burstPull;

// 4. LENS OPTICS (lens-a) — the ellipse nearness drives magnify + brightness + the tone rim.
float nearness  = exp(-(dE*dE)/(2.0*gravRadius*gravRadius));
sizeTaper       = 0.8 + LENS_MAGNIFY * nearness * pAct;        // the dot SWELLS (a lens magnifies)
facingOpacity   = uU2.x + uU2.y * (TWK + 0.6 * nearness * pAct);   // TWK = the resting twinkle floor (§2.4)
burstBright     = 1.0 + (0.5 * nearness + uU3.z * 0.8 * nearness) * pAct;
// tone: core samples the bright stop (0), the well RIM samples warmer-amber (chromatic refraction).
float rim       = smoothstep(0.25, 0.6, 1.0 - nearness);       // a faint rim band
// `out.tone` = clamp(rim * RIM_CHROMA, 0, 1) at rest → 0; under the lens the rim glows amber.
```

All constants (`LEAD`, `STRETCH_CAP`, `LENS_MAGNIFY`, `WAKE_GAIN`, `RIM_CHROMA`)
ladder off the **√φ family** (Aristotelian proportion; no smuggled magic) and flow
from named config fields through the bridge — the prior-golden "source-verify every
constant" discipline. **The spike (§8) calibrated the values:** `LEAD = gravRadius/φ²
× 0.4` (tempered — a full lead makes the gather sit AHEAD and the wake invisible),
`STRETCH_CAP = 1/√φ ≈ 0.786`, `WAKE_GAIN ≈ 12`, and the comet-tail ALSO reads via a
**luminance glow** on trailing dots (`wakeGlow = 1 + behind·vmag` weighting), not by
displacement alone. With these, the gathered-mass centroid measurably trails BEHIND
the cursor during motion (G2 reads), scaling with velocity.

### 2.4 Resting-floor read + per-dot twinkle (lens-b)

- Library default `baseOpacity 0.5 → 0.66` (a measured notch — reads at rest, still
  calm); the **loud** 0.78 is the demo preset.
- Per-dot twinkle (the `TWK` floor above): `TWK = 0.5 + config.twinkle *
  sin(uTime * uU7.z + phase)` where `phase = fract(sin(f32(ii)*12.9898)*43758.5453)
  * TAU` — an on-GPU index hash, **no new buffer**. The resting field becomes a
  *living* warm constellation. Default `twinkle 0.12`, PRM → frozen (the `sin` reads
  the parked time).

### 2.5 The plane VIGNETTE the lens punches through (lens-a / the T17 fold, DRY-shared)

A per-dot presence term fades the field center at rest and densifies the
edges/corners — the content-deferential backdrop. Extract ONE shared helper
(consumed by BOTH this and `W-DOTFLOW-REBUILD`'s `mode="field"` — the no-second-leaf
fence):

```glsl
// presence = edgeFalloff(p) · (1 − centerClear(p))   — dense edges, clear center
float presence = mix(VIGNETTE_FLOOR, 1.0, smoothstep(0.0, 1.0, length(base2d) / planeScale));
// the cursor-lens RE-DENSIFIES the center it enters (the surpass lever the baked ref can't do):
presence = max(presence, nearness);
facingOpacity *= presence;
```

At rest the center is calm + clear (where a glass card / title sits — the field
FRAMES the content); the lens locally blooms density back. That duality IS the
iOS-27 "calm until touched" signature and makes the plane register unambiguously
distinct + useful (not "sphere with z=0").

### 2.6 Vivid-no-gray grade — the tempered resolution (library floor + demo loud)

- **Library default** (`WARM_IDENTITY_PALETTE`, the lib's *identity* — evolves in
  `src/`): lift the core chroma a *correctness notch* so it clears the BA.W-NO-GRAY
  warm floor and reads as warm, not gray:
  ```
  WARM_IDENTITY_PALETTE = [
    { L: 0.90, C: 0.055, h: 76 },   // warm cream-gold (was C:0.03 — gray; now reads warm)
    { L: 0.82, C: 0.085, h: 60 },   // warm amber rim   (was C:0.07)
  ]
  ```
  hue ∈ [60,76] ⊂ warm band → `proof:teal-navy-purge` (hue ∉ [180,270]) holds by
  construction. This is the **floor**, not the loudness choice (no over-grade of the
  library identity — the calm warm-cream stays the lib's register).
- **Demo loud preset** (presets-in-consumers): the technicolor amber→gold ladder
  (`{L:0.90,C:0.12,h:72}` hot-gold core / `{L:0.76,C:0.13,h:48}` ember rim) — the
  1940s saturated-warm punch, lit-gold core + ember-tailed comet. Lives in
  `demo/stories`, not the library default.

### 2.7 The COLOURFUL GROUND (§3 dependency — reuse the SHIPPED primitive)

Reuse the shipped `auroraFallbackGround.ts` (source-verified, compositor-only CSS
warm-mesh, **no GL context**) as a `<div>` behind the canvas in the demo chassis
(`ShowcaseFrame tier="field"`): a slow warm-amber→rose drift so the dots read against
a *living warm field with a defined edge* (§3), not flat cream. Dark mode → a deep
warm-brown ground (NOT navy — the purge). The **library default stays
`background: transparent`** (the glass card shows through — presets-in-consumers);
the demo PRESET supplies the warm ground. Folds into the `BD.W-LIVING-ARTWORK` /
`BD.W-PAGE-BACKGROUND` family, shared across all six §3 flat-page vizzes.

### 2.8 The SPHERE arm — the same lens (parity, no second mechanism)

The sphere `else` branch already has `well + lift = n.xy * well`. Re-aim it to the
**screen-space directional lens**: the `toPointer`/`pd` distance becomes the same
anisotropic-ellipse measure (the velocity-stretch about the pointer in screen
space), so surface dots **smear toward the cursor along travel + carry a wake** — a
"finger pressing a dot-globe through glass" read. Bound it so the globe doesn't tear
(the depth-fade shell read + `proof:viz-dotmatrix` flat-uniform bite stay intact).
ONE warp idiom, both registers — the `dim`-idiom, no fork.

---

## 3. The READ — visual + motion + interaction spec

| Register | Resting | Cursor-active | Flick (burst) |
|---|---|---|---|
| **plane (default)** | vivid warm-gold faint lattice over a living amber→rose ground, content-deferential vignette (clear center), calm per-dot twinkle | a hot-gold lozenge of magnified+swollen+brightened dots STRETCHED along travel, ember comet-tail wake streaming behind, anticipation-lean ahead, a faint chromatic rim — the center re-densifies (the lens punches the vignette) | the wake over-extends + the cluster pops ~1.15× then springs back with overshoot (the cartoon take) |
| **sphere (kept preset)** | vivid warm dot-globe, slow tilted spin, depth-shaded translucent shell | surface dots smear toward the cursor along travel + a wake on the near hemisphere, a lens magnify | a one-shot brightness bloom + an over-smear that recoils |

**Motion law (liquid-weight universal, BINDING):** every leg carries inertia — the
lens LAGS the cursor (the shipped ζ=0.7 `springStep`), the deformation grows with
velocity (`stretch ∝ vmag`), the wake trails (overlapping action), the return
overshoots then settles (follow-through), arcs come free from the velocity-vector
following the cursor's curved path. **NEVER tight/springy-snap.** Morph MORE on
move (the `vmag`-scaled stretch + wake IS "morph-more-on-move" made literal).

**√φ proportion:** `LEAD = gravRadius/φ²`, `STRETCH_CAP = 1/√φ ≈ 0.786`, the lozenge
swell `LENS_MAGNIFY` ≈ the √φ cell-clip ceiling, the vignette floor + twinkle clock
index off √φ rungs. No magic constants.

---

## 4. Cross-engine plan (Chrome + Safari) — the §L7 arm

This viz is **born-GPU instanced billboards** — NO `backdrop-filter:url`, NO SVG goo,
NO meatball filter in the dots (the goo register is the SEPARATE `goo-dot-matrix`
viz; no dup). The WebKit fence is therefore light:

- **WGSL primary** where WebGPU is present (Safari 17.4+ resolved by the
  `createGpuSubstrate` picker), **WebGL2 instanced-billboard fallback** everywhere
  else (Safari's default path). Both twins get the **identical** lens/warp/twinkle/
  vignette math — the `u7` lane is ONE uniform-table declaration → std140≡WGSL by
  construction; the `BD.W-VIZ-PARITY-METAL` LIVE net (Metal×ANGLE) gates the actual
  paint, not a proxy ΔE.
- The **ground** (§2.7) is the §L7 care: it's the shipped `auroraFallbackGround`
  static CSS warm-mesh (Baseline-universal `radial`/`conic-gradient`, sRGB interp,
  compositor-only, zero GL) — the cheaper path (one fewer GL context, the
  one-GL-per-route budget). No `backdrop-filter:url`.
- `linear()`/spring physics live in JS (`useDotMatrix.springStep`) — engine-
  agnostic. The premultiplied `ONE, ONE_MINUS_SRC_ALPHA` blend is WebGL2/WebGPU
  identical. sRGB color-interp throughout (no oklab-on-GPU mixing surprise — the
  palette bakes to linear-sRGB in the bridge, mixed in OKLab in-shader via the
  shared `procedural-color` chunk, the ONE color source).

**The MEATBALLING law does not bite this viz** (no metaball merge here — the gather
is *density + magnify*, distinct from goo-dot's SDF merge); it is noted only to
record that the no-dup fence with `goo-dot-matrix` holds.

---

## 5. a11y / PRM carve (§L5)

- **PRM** → `usePointerVelocityField.tick(0)` zeros velocity/accel/burst → the warp
  collapses to a calm **symmetric** resting well (no directional motion); the
  substrate paints ONE static frame then parks; the twinkle FREEZES (the per-dot
  `sin` reads the parked time). The field reads as a crisp static warm constellation
  with the vignette — NO net motion. **Pin the PRM capture to a deterministic
  mid-engage phase** (the goo-dot lesson: never freeze at t=0 max-separated).
- **WCAG 2.2.2** → the `paused` toggle (the `DockBackgroundToggle` seam, already
  wired) parks the loop on demand.
- **`prefers-contrast: more`** → floor `baseOpacity` UP + deepen the core toward the
  amber stop (the dots are a legibility-neutral decorative field; more contrast only
  helps).
- **`prefers-reduced-transparency`** → the dots are additive light, not a
  transmissive scrim — leave them; the GROUND (if it were live-Aurora) would drop to
  the static token, but the default ground IS already the static mesh.

---

## 6. The acceptance bar + the born-RED gate sketch (π / readback that PROVES it)

A single gate `proof:dotmatrix-golden`, **paired-engine** (chromium AND webkit, the
PARITY-METAL net), **BOTH registers**, NEVER reducedMotion (+ the PRM single-frame
arm). Each clause is **born-RED on HEAD** (the current symmetric-pool / invisible /
flat-ground state):

- **G1 — directional ellipse (the headline).** Drive a sustained *horizontal*
  pointer sweep; read back the gathered-dot footprint. Assert the lit-region is an
  **ELLIPSE elongated along the travel axis** (major/minor eccentricity > threshold).
  *Born-RED:* the current `toCursor`-only well is radially symmetric → eccentricity
  ≈ 1.0 (a circle) regardless of travel.
- **G2 — comet-tail wake (the SPIKE-CORRECTED definition).** During a sustained
  sweep, assert the **glowing-mass CENTROID** offset from the cursor, projected on
  **−velocity**, is **> 0** (the lit/glowing mass trails BEHIND the cursor), and
  that it **scales with velocity** (≈0 at rest). *Do NOT* use a static fore/aft
  *count* binned by pre-displacement position — the spike proved that mis-reads ~0.5
  (symmetric) even when the wake is real. *Born-RED:* the symmetric pool's centroid
  sits AT the cursor (projection ≈ 0) and the un-tempered-LEAD variant sits AHEAD
  (projection < 0).
- **G3 — the well MAGNIFIES.** A dot's pixel footprint near the cursor measurably
  exceeds its rest footprint (`LENS_MAGNIFY` reads). *Born-RED:* the current taper
  swells brightness but the lens-magnify gain is absent.
- **G4 — the field reads at rest.** Lit-pixel fraction over the warm ground at rest
  (no pointer) ≥ a floor. *Born-RED:* the current invisible-on-cream whisper fails it.
- **G5 — the plane vignette is real.** Edge-density measurably exceeds center-density
  at rest. *Born-RED:* the current uniform disc is flat.
- **G6 — vivid-no-gray + purge.** Mean painted chroma ≥ ~0.05 (lib floor) / ≥ 0.10
  (demo preset) AND hue ∈ [20,90] (NO teal/navy — re-runs the purge cyan bite).
  *Born-RED:* the C:0.03 gray-warm default fails the chroma floor.
- **G7 — colourful ground present.** Page-bg behind the canvas is non-flat (a warm
  dominant hue painted), BOTH modes. *Born-RED:* the current `transparent`/flat-cream.
- **G8 — parity.** The WGSL/GLSL twins paint within the ΔE clause on the SAME shared
  form (both edited identically). Regression-anchor.
- **G9 — PRM.** PRM → symmetric calm well, no directional warp, twinkle frozen,
  ONE static frame, deterministic mid-engage capture.
- **G10 — lifecycle regression.** offscreen-park + `paused` seam + no-2nd-rAF
  unchanged.

---

## 7. Deft integration — the wave amendment (UNION, no fork; reconcile vs the BD waves)

This is an **AMENDMENT to the shipped `dot-matrix` engine + the `isPlane`/`u6`
branch**, riding the existing waves — survival-of-the-fittest:

- **NEW `BD.W-DOTMATRIX-LIQUID-LENS`** (the headline): the `u7` velocity lane + the
  directional-lens warp (squash/stretch + comet-tail + anticipation) + the lens
  optics (magnify + chromatic rim) + the resting twinkle + the plane vignette, in
  BOTH twins + BOTH registers; the vivid-warm library-floor grade. Gate
  `proof:dotmatrix-golden` G1–G10 born-RED. The engine spine (twin, substrate,
  phyllotaxis, pointer field) is KEEP-byte-for-byte; the `proof:dot-matrix`
  round-trip + flat-uniform bites stay GREEN.
- **FOLD §3 colourful-ground into `BD.W-LIVING-ARTWORK` / `BD.W-PAGE-BACKGROUND`**:
  reuse the shipped `auroraFallbackGround` CSS ground as the demo/chassis affordance
  (presets-in-consumers) + the demo loud palette preset. NOT a 2nd GL pass. The
  library warm-cream default + the `proof:teal-navy-purge` fence are UNTOUCHED.
- **DRY with `BD.W-DOTFLOW-REBUILD`**: extract ONE shared `presence =
  edgeFalloff·(1−centerClear)` density helper (the no-second-leaf fence) consumed by
  both the dot-matrix plane vignette and the dotflow `mode="field"` vignette. Extract
  ONE shared `dotTwinkle(phase, rate)` snippet (lens-b) for the dot suite (dot-flow +
  goo-dot reuse).
- **COORDINATE `BD.W-DOT-UNIFY`**: land the lens warp + the `u7` lane BEFORE unify
  re-homes the mechanism — the velocity lane + warp idiom should be the shared
  construction-time permutation, not re-derived; resolve the `<DotMatrix>` name
  collision there.
- **NO DUP:** distinct from `goo-dot-matrix` (SDF metaball-as-dots, a merge/neck
  gesture) + `dot-flow-field` (advected/halftone-vignette flow). This viz's
  signature is the **directional liquid GRAVITY LENS** — a gesture neither sibling
  owns. Shares only the φ-twinkle + warm-ground + vignette-density idioms (adjacent,
  no edge).
- **EXCISIONS (no-legacy):** the `toCursor * well` line is REPLACED in place (clean
  break, no alias). The thrown-away `pointer.velocity`/`acceleration` are now
  CONSUMED (no dead lever).

**Files touched (the integration surface):**
- `src/components/custom/dot-matrix/composables/uniformBridgeWGPU.ts` — the `u7`
  lane (ONE table edit), `DotPointerState` + `restingPointer` velocity fields, the
  `packDotRenderUniforms` write.
- `src/components/custom/dot-matrix/shaders/dot-matrix.wgsl.ts` +
  `…/dot-matrix.glsl.ts` — the lens/warp/twinkle/vignette/rim math, line-for-line in
  both twins.
- `src/components/custom/dot-matrix/composables/useDotMatrix.ts` — the `onFrame`
  velocity/accel write (consume the shipped field).
- `src/components/custom/dot-matrix/constants.ts` — `gravitySwirl`?/`twinkle`/
  raised `baseOpacity` config + the vivid-floor `WARM_IDENTITY_PALETTE`.
- `demo/stories/…` — the loud palette preset + the `auroraFallbackGround` ground
  under `ShowcaseFrame tier="field"`.
- (DRY) a shared `presence`/`dotTwinkle` snippet in the `procedural-color`/substrate
  seam, consumed by dot-flow + goo-dot.

**Convergence after the wave: ~95%** (engine was always 100%; this lands the felt
directional gravity, the read-at-rest, the lens legibility, the register
distinction, and the ground).

---

## 8. The de-risk spike (where the boldest mechanism is verified before promote)

The single boldest, highest-risk mechanism is the **anisotropic velocity-warped
ellipse** (G1/G2): does the squash/stretch read as *weight* and the comet-tail as
*follow-through* — or as a *glitchy smear*? A throwaway 2D-canvas spike under
`docs/tranches/BD/greenfield/dot-matrix/golden/spike.html` reproduces ONLY the
plane-branch warp math (the same `vdir`/`stretch`/`dE`/`wake`/magnify terms) on a
phyllotaxis lattice over the warm ground, driven by a real pointer, so the
eccentricity + the wake asymmetry are eyeballable AND measurable BEFORE the
dual-twin shader edit. **Built + live-verified** (Chrome, synthetic horizontal
sweep, headless readback — see `spike-verified.png`).

**The de-risk PAID OFF — it surfaced a real calibration trap and resolved it
before the shader edit:**
- **G1 (ellipse-along-travel) reads strongly out of the box** — avg eccentricity
  ~1.7 over a fast sweep, peaking 2.17 at high velocity. The anisotropic
  squash/stretch is sound.
- **G2 (comet-tail wake) was BORN-WRONG at the naive tuning** and the spike caught
  it. With a full `LEAD = gravRadius/φ²` + `WAKE_GAIN 5`, the **anticipation-lead
  dominates** — it pushes the well-center *ahead* of the cursor, the radial gather
  piles dots forward, and the lit-mass centroid sits AHEAD (G2 ≈ −0.08, the wrong
  sign). The first naive G2 metric (fore/aft *count* binned by pre-displacement
  position) also mis-read ~0.50 (symmetric) because it measured the wrong quantity.
- **The fix (now baked into the spike + this spec):** (a) measure G2 as the
  **glowing-mass CENTROID shift projected on −vdir** (not a pre-displacement count);
  (b) **temper `LEAD` to ~0.4× the √φ rung** so the lead doesn't dominate; (c) raise
  `WAKE_GAIN` to ~12; (d) make the comet-tail also **READ via luminance** (trailing
  dots glow brighter ∝ `behind·vmag`), not by displacement alone. After this:
  **G2 ≈ +0.05 avg, +0.11 at peak velocity** (the centroid trails BEHIND, the wake
  reads), and it correctly **scales with velocity** — no wake at rest, strong wake
  when moving fast (the liquid-weight "morph-more-on-move" law, literal). The gate
  `proof:dotmatrix-golden` G2 must assert the **centroid-behind projection > 0
  during a sweep**, NOT a static fore/aft count (the trap this spike caught).

The spike is NOT shipped. It de-risked the `LEAD`/`WAKE_GAIN`/luminance-tail
calibration AND corrected the G2 gate definition, so the real WGSL/GLSL edit lands
once, right, in both twins.
