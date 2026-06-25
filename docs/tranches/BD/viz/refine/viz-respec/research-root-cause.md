# Viz re-spec root-cause (RESEARCH-1, LIVE) — paper-grid · concentric · dot-matrix

Live-inspected on http://localhost:5173 (WebGPU SUPPORTED → all three run the **WGSL primary**,
not the GLSL fallback). The three asks are **design transpositions** (the mechanism is wrong),
NOT bug-fixes — each viz paints exactly what its current math specifies; the math specifies the
wrong thing. Captures at `live-paper-grid.png` / `live-concentric{,-2}.png` / `live-dot-matrix.png`.

Environment confirmed:
- `--foreground = light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` (warm-amber ink, OKLab H≈75 — NOT gray; the warm-chroma floor is intact, none of these are a gray-glass defect).
- `--card = light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` (warm-cream plate). Light mode at inspection.
- `navigator.gpu = true` → WGSL primary on every surface.

The common thread for asks (1) + (2): **paper-grid + concentric share a level-set / gradient-topology
basis** the user names explicitly. The fix is a SHARED field chunk (a scalar height field + a
CELL-LOCAL warp operator) that both consume — paper-grid level-sets are the integer grid lines of
`(gx, gy)`, concentric level-sets are the iso-contours of a radial scalar field. ONE warp law, two
field samplers.

---

## (1) /substrates/paper-grid — LINE-warp, not CELL-warp (the mechanism is a global domain warp)

### What the user wants
> "the individual paper LINES should NOT wave, but the CELLS in local boxes SHOULD — the grid
> should TWIST and MORPH as if a wave was passing OVER and THROUGH it."

The warp must act at the **CELL / local-box level** — each grid cell DEFORMS / TWISTS as a traveling
wave passes — NOT a uniform line displacement.

### Confirmed root cause (the exact mechanism)
The WGSL primary `fs_main` (`src/components/custom/paper-grid/shaders/paper-grid.wgsl.ts:175-191`,
transcribed identically in `paper-grid.glsl.ts:141-155` and the JS source `paperGrid.ts:252-266`)
is a **global IQ domain warp of the sampling coordinate**:

```wgsl
var g = uv * gridScale;
g = g + curlWarp(g, t);     // ← the defect: adds a smooth low-freq displacement to the WHOLE coord
g = g + cursorBulge(g);
let minor = gridCoverage(g, u.grid.x, dv);   // grid eval at the warped coord
```

`curlWarp` is the 2D curl of a 3-octave fbm potential (`flow.wgsl.ts` `CURL_FBM_WGSL`), `waveScale: 0.5`
(LOW spatial frequency), `waveAmplitude: 0.1` cells. This is IQ's `f(p) → f(g(p))`, `g(p) = p + h(p)`.

**Why this paints LINE-wave not CELL-twist:** a smooth low-frequency displacement `h(p)` added to the
sampling coordinate translates a whole neighborhood of `g` by ~the same vector (because `h` is
low-frequency, `∇h` is small, so locally `g` is `p + const`). The grid eval `gridCoverage(g)` then
draws the integer-line set of the displaced coordinate — i.e. the LINES bow and slide as a unit. The
README/page copy says this out loud: *"the whole sheet bows together"* and *"adjacent cells warp
TOGETHER"* — that IS the line-wave the user is rejecting. The CELLS do not deform relative to their
neighbours; they translate coherently. There is **zero local rotation / shear** in the field — a curl
warp is divergence-free (area-preserving) but the displacement is added uniformly, so a single cell
keeps its axis-aligned square shape, merely repositioned.

Live confirmation: `.paper-grid-canvas` is a 1346×1254 backing full-bleed background (`paper-grid-wrapper
absolute inset-0`), `fieldAlpha` low (suffusion), transparent ground — the grid reads as a faint warm
hairline grid that bows slowly as one sheet. No per-cell twist is present in the paint.

### The re-spec (CELL-LOCAL warp — the design transposition)
The warp must be applied **inside each cell's local frame**, not to the global coordinate. The
mechanism shift:

1. **Decompose to integer cell + local fraction.** `let cell = floor(g); let f = fract(g);` — `f ∈ [0,1]²`
   is the position WITHIN the cell.
2. **Apply a per-cell affine TWIST to `f` about the cell center**, where the twist angle/shear is a
   sample of a traveling-wave field at the CELL CENTER (so each cell gets ONE warp parameter, and the
   line-edge geometry deforms inside the box):
   ```
   let cc      = cell + 0.5;                         // cell center (grid space)
   let phase   = dot(cc, waveDir) * waveK - t*waveOmega;  // traveling plane wave through the lattice
   let twist   = waveAmp * sin(phase);              // the per-cell rotation angle (radians)
   let shear   = waveAmp * curlSample(cc, t);       // optional per-cell shear (the curl-driven twist)
   let fLocal  = rotate(f - 0.5, twist) + 0.5;      // twist the local box about its center
   // (optionally add a small shear matrix for the "morph" read)
   let line    = gridCoverage(cell + fLocal, ...);  // Golus eval on the cell-locally-warped coord
   ```
   The KEY: the rotation/shear is keyed off the **cell center (a per-cell constant)**, so the four
   edges of one cell twist together about that cell's own center — the box DEFORMS — while the
   neighbouring cell twists about ITS center by a DIFFERENT phase. A wave passing over the lattice
   reads as cells progressively twisting/morphing, the line endpoints meeting at the (warped) cell
   corners. This is the literal "wave passing OVER and THROUGH" the grid.
3. **The traveling wave is the level-set / topology driver.** Use a low-frequency scalar height field
   `H(p,t)` (the shared chunk, see below); the per-cell twist = `∇H` rotated 90° (the gradient-flow
   direction) OR `H` itself as the rotation angle. This is where paper-grid + concentric SHARE the
   basis — same `H`, same `curlFBM`, different field sampler.

**Fences:** compositor is N/A (GPU fragment pass — already off the layout path). The Golus derivative-AA
must still read the FINAL warped coordinate's `dpdx/dpdy` so lines stay crisp at any DPR (the
blur-kill must survive the cell-local transform — compute `dv` AFTER the twist). PRM still parks one
static frame. Warm-cream ink identity unchanged (`WARM_IDENTITY_INK { L:0.62, C:0.05, h:62 }`). The
`liquid-weight-universal` law: the per-cell twist must carry inertia — drive `waveAmp`/`phase` through
a spring-eased traveling envelope, not a raw `sin` snap, so the morph has weight/bounce.

**The single-math-source contract holds:** `paperGrid.ts` `samplePaperGrid` gets the same cell-local
twist so `proof:viz-papergrid` clause P3 round-trips JS↔WGSL↔GLSL at the fixed sample set.

---

## (2) /substrates/concentric — wrong mechanism entirely (radial-Fourier moiré, not level-set topology)

### What the user wants
> "not right; should function as essentially the PAPER GRID, but with concentric LEVEL-SET lines.
> Take inspiration from the paper grid and vector calculus, level set, gradient topology."

concentric = **the paper-grid wave-warp mechanics applied to CONCENTRIC LEVEL-SET contour lines**
(iso-contours of a scalar field that twist/flow like a topographic gradient field).

### Confirmed root cause (the current mechanism is a radial sum-of-sines, NOT a contour field)
The current viz (`concentric.wgsl.ts` / `concentric.glsl.ts:94-152`, math `ringField.ts:146-219`) is a
**radial-Fourier ring-interference field**: `f(p,t) = Σⱼ Σᵢ Aᵢ·sin(kᵢ·‖R(−αⱼ)(p−cⱼ)‖_e − ωᵢ·t + φᵢ)·wⱼ`,
rendered as thin strokes via IQ gradient-normalized distance-estimation `de ≈ |sin|/|cos|·k·|∇r|`.

Live confirmation (`live-concentric-2.png`): a busy field of overlapping ORANGE ELLIPTICAL rings from
two tilted centers beating into moiré — it reads as a tangle of concentric ellipses, NOT topographic
level-set contours of a coherent gradient field. There is no "wave passing through it" — the rings
travel radially (`ω·t`) but the field has no spatial gradient-flow / topology structure; it is a
sum-of-sinusoids interference pattern.

Three concrete mechanism mismatches vs the user's ask:
1. **No level-set / gradient-topology basis.** The field is a sum of radial sinusoids, not a scalar
   height field `H(p,t)` whose ISO-CONTOURS (level sets `{p : H(p) = nΔ}`) are drawn. The "rings" are
   the crests of traveling sinusoids, not contour lines of a topography. There is no `∇H` gradient
   field, no flow.
2. **No paper-grid warp mechanics.** concentric does NOT share `curlFBM` / the cell-warp / any
   traveling-wave domain warp. It is an entirely separate engine (`ringField.ts`) with its own
   Tessendorf dispersion `ω=√(g·k)`. The user wants the SAME wave-warp the paper grid uses, applied to
   contour lines.
3. **`pointer-events: none` — zero cursor interaction.** `Concentric.vue:106` sets `pointer-events: none`
   and the config default `interactive: false` (`constants.ts:124`). The README CLAIMS "Drag the cursor
   (interactive on) and a transient ripple-source bends toward the pointer" but it is OFF and the SFC
   blocks pointer events. If concentric is to mirror paper-grid (which has `cursorBulge`), it needs the
   same cursor-warp seam.

### The re-spec (level-set contour field + the shared warp basis)
Rebuild concentric as the paper-grid's TWIN over a SHARED scalar-field chunk:

1. **The scalar height field `H(p,t)`** — a smooth low-frequency topography (the SHARED chunk). Concentric
   centers become radial basins/peaks of `H` (a sum of Gaussians or `cos(k·r)` bumps about each center),
   so `H` is a genuine topographic surface, not a sinusoid sum. Add the SAME `curlFBM` traveling-wave
   warp to the domain (or to `H` directly) so the topography FLOWS — "a wave passing through."
2. **Draw the LEVEL SETS** — the iso-contours `{p : fract(H·levels + 0.5) ≈ 0}`. This is exactly the
   `contourInk` operator already present (`concentric.glsl.ts:155-160`: `band = abs(fract(H·levels+0.5)−0.5)`,
   smoothstepped by `fwidth(H·levels)`) — but it must be the PRIMARY render (currently `renderMode`
   defaults to `traveling-rings`, the sinusoid-crest path, NOT `static-contour`). The level-set contour
   render IS the topographic-map look the user wants; it just needs `H` to be a real height field with
   gradient-flow, not the radial sinusoid sum, and the warp applied.
3. **Gradient-topology twist (the cell-warp analogue).** Where paper-grid twists each grid CELL, concentric
   warps the CONTOUR field: displace the sample point by the curl-flow `curlFBM(p,t)` before evaluating
   `H`, so the iso-contours bend/flow along the gradient field — contour lines twisting like flow lines
   over a topographic surface (the vector-calculus level-set / gradient-field the user names). The
   contour spacing visualizes `|∇H|` (tight contours = steep gradient — the topographic-map reading).
4. **Cursor gravity (paper-grid parity).** Add a `cursorBulge`-class local Gaussian to `H` (a peak/well
   under the cursor) so dragging warps the topography toward/away from the pointer — and REMOVE
   `pointer-events: none` from `Concentric.vue`, wire the `usePointerVelocityField` the suite already
   ships.

**The SHARED chunk (asks 1 + 2 unify here).** Mint a `levelField.glsl.ts` / `.wgsl.ts` (the `flow.glsl.ts`
precedent) exporting:
- `curlFBM` (already shared) — the traveling-wave warp.
- `heightField(p, t)` — the scalar topography (host-supplied basis, like `potentialFBM`).
- a CELL-LOCAL twist operator for paper-grid + a domain-warp-before-`H` for concentric.
paper-grid samples the integer-line level sets of `(gx,gy)`; concentric samples the iso-contours of
`H`. ONE warp law, ONE `curlFBM`, ONE gradient-flow — two field samplers. The `ringField.ts`
sum-of-sines engine is RETIRED (clean break, no alias — the user says "not right").

**Fences:** the `proof:concentric` warm-identity palette fence holds (`WARM_IDENTITY_PALETTE` stays);
the demo teal-on-indigo stays a DEMO preset. `fwidth(H·levels)` AA keeps contours crisp at any DPR. PRM
parks one static frame. The Tessendorf-dispersion claim in the README is dropped (level-set topography,
not deep-water rings).

---

## (3) /substrates/dot-matrix — weak cursor gravity + no 2D background register (it's a small 3D globe)

### What the user wants
> "good, but should persist more GRAVITY to the cursor, and should function more in a 2D SPACE as a
> background effect."

Strengthen cursor-gravity attraction + add a 2D background register (currently it is ONLY a 3D sphere).

### Confirmed root cause
Live confirmation (`live-dot-matrix.png`): a SMALL dot-SPHERE (globe) floating in the CENTER of a wide
1033×460 CSS canvas (aspect 2.25) — the sphere occupies a small central disc (`radius: 0.42` of the view
min-dimension), the rest is empty cream ground. It is unmistakably a 3D globe, not a space-filling 2D
background field.

**(3a) Weak cursor gravity.** The pointer interaction is a tight local Gaussian DIMPLE on the sphere
surface, capped low (`useDotMatrix.ts:111-112`, `dot-matrix.glsl.ts:67-79`):
```glsl
float dimple = exp(-pd*pd*18.0) * uU3.y * pAct;   // ← Gaussian width 18 = TIGHT falloff
vec2 lift    = n.xy * dimple;                       // pushes dots radially off the shell
// useDotMatrix.ts: targetPush = sign * min(0.35, 0.08 + speed*0.6)   ← capped at 0.35
```
The "gravity" is:
- **A repel-dimple, not an attraction well.** Default `pointerMode: "repel"` pushes dots AWAY; even
  `attract` only pulls within the tight `exp(-pd²·18)` radius (≈0.24 NDC). There is no broad
  inverse-distance gravity well drawing distant dots toward the cursor.
- **Capped at 0.35 push** and only on the lit-hemisphere `n.xy` projection — a subtle surface bump, not
  a strong cursor-following gravitation. The user reads this as "not enough gravity."
- A `parallax: 0.08` screen-center shift (weak) + a flick `burst` brightness bloom.

**(3b) No 2D background register.** The whole viz is the phyllotaxis SPHERE (`fibonacciDot` lays dots on
a unit-sphere SURFACE, `dotMatrixField.ts:69-75`; `spinMatrix` rotates it; the billboard projects `n.xy`
to screen). There is NO 2D-plane mode — no register where the dots fill the 2D canvas as a background
lattice/field that reacts to the cursor. The `spheres: 1|2` axis only adds a second globe; there is no
`layout: "sphere" | "plane"` axis.

### The re-spec
1. **A 2D `layout: "plane"` register (additive axis).** Add a second dot LAYOUT to the static dots buffer
   (`useDotSphere.ts buildDotsBuffer`) — a 2D lattice (jittered grid or a 2D phyllotaxis disc) filling
   the `[-aspect, aspect] × [-1, 1]` plane, depth-faded by distance-from-cursor instead of sphere-facing.
   The vertex shader branches on `layout`: sphere path keeps `uSpin * unitPos` → `n.xy`; plane path uses
   the dot's own `xy` directly (no spin, or a gentle 2D drift). This is the "function more in a 2D SPACE
   as a background effect" — a full-bleed 2D dot field, not a centered globe. The sphere register stays
   (the existing reference); plane is the NEW background register the demo selects.
2. **Strong cursor gravity (a real well).** Replace the tight repel-dimple with a broad gravity well that
   PERSISTS:
   - Widen the falloff (drop the `·18` to a gentler `·4..6`, or use inverse-square `1/(pd²+ε)` clamped) so
     distant dots feel the pull.
   - Default to `attract` for the 2D register (dots gravitate toward the cursor, with a soft minimum
     radius so they orbit/pool rather than collapse).
   - Raise the cap (0.35 → a stronger pull) and add a velocity-trailing wake (the `usePointerVelocityField`
     `velocity`/`acceleration`/`burst` are already wired — feed them into a directional gravity drag, so a
     fast sweep drags a comet-tail of dots; `liquid-weight-universal`: the dots carry inertia, spring back
     with bounce when the cursor leaves).
   - The gravity is a 2D-plane displacement `lift = normalize(cursor - dotPos) * wellStrength(pd)` (attract)
     — a genuine field, not a surface bump.
3. **The math source contract.** Add the plane layout + the gravity well to `dotMatrixField.ts` (the single
   source) so `proof:dot-matrix` clause 3 round-trips JS↔WGSL↔GLSL. PRM still parks one static frame; the
   gravity freezes under reduce (`usePointerVelocityField tick(0)`).

**Fences:** warm-cream identity palette unchanged (`WARM_IDENTITY_PALETTE`; the mono-warm-white-on-near-black
is a DEMO preset). Compositor-safe (GPU). The crisp `fwidth` SDF dot AA canon unchanged. One GL context per
route held. `dotSize`/`baseOpacity`/`depthFade` stay; the plane register reuses the same instanced-billboard
pipeline (a layout branch in the vertex shader, no second pass).

---

## Summary table

| Viz | Live mechanism (confirmed) | Defect | Re-spec |
|---|---|---|---|
| paper-grid | `g += curlWarp(g,t)` — global IQ domain warp of the sampling coord (`paper-grid.wgsl.ts:177`) | LINES bow/translate as a unit (the "whole sheet bows together"); cells never twist | CELL-LOCAL twist: `floor(g)` cell + `rotate(fract(g)−0.5, twistByCellCenterPhase)`; traveling-wave keyed off cell center; Golus `dv` after the twist |
| concentric | radial sum-of-sines moiré `Σ Aᵢ·sin(kᵢ·r − ωᵢt)` (`ringField.ts:146`); `renderMode: traveling-rings`; `pointer-events:none` | wrong engine entirely — interference rings, not level-set topography; no warp; no cursor | RETIRE `ringField.ts`. New scalar height field `H(p,t)` + draw LEVEL SETS (`contourInk`) + `curlFBM` gradient-flow warp + cursor-gravity well; SHARE the paper-grid field chunk |
| dot-matrix | phyllotaxis 3D SPHERE, tight repel-dimple `exp(-pd²·18)` capped 0.35 (`dot-matrix.glsl.ts:71`, `useDotMatrix.ts:112`) | small centered globe; weak surface-bump "gravity"; no 2D space-filling register | additive `layout:"plane"` 2D background register + broad gravity well (`attract`, gentle falloff, raised cap, velocity wake) |

## Shared-basis recommendation (asks 1 + 2)
Mint a SHARED `levelField` chunk (`flow.glsl.ts` / `flow.wgsl.ts` precedent): `curlFBM` (the traveling-wave
warp, already shared), `heightField(p,t)` (scalar topography, host basis), a `cellTwist` operator
(paper-grid) + a `warpBeforeHeight` operator (concentric). paper-grid draws the integer-line level sets of
`(gx,gy)`; concentric draws the iso-contours of `H`. ONE warp law, ONE `curlFBM`, ONE gradient-flow — two
field samplers. This is the vector-calculus / level-set / gradient-topology basis the user names, made the
literal shared substrate of both vizzes.

## North-star compliance (all three)
- Warm-chroma floor INTACT — no gray-glass defect on any surface (`--foreground` OKLab H≈75 confirmed live).
- iOS-27 liquid-glass + glass+PAPER morphism: paper-grid/concentric are paper-ink fields, dot-matrix a dot
  shell — keep the warm-ink-over-page identity.
- `liquid-weight-universal`: every motion (cell twist, contour flow, dot gravity) must carry inertia/weight/
  bounce/squish — drive amplitudes through spring-eased envelopes, not raw `sin` snaps; the dot gravity
  springs back with bounce on cursor-leave.
- Compositor-only / PRM-carved / Safari-compatible: all three are GPU fragment/vertex passes already off the
  layout path; PRM parks one static frame; WGSL primary + GLSL fallback (no Canvas2D) — the GPU-only/Safari
  contract holds. NO legacy aliases (retire `ringField.ts` clean; `renderMode` re-pointed).
