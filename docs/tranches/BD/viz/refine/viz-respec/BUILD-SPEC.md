# BUILD-SPEC — viz mechanics re-spec (paper-grid · concentric · dot-matrix)

**Wave** `BD.W-VIZ-RESPEC` · **Status** SPEC-AUTHORED 2026-06-23 · **Branch** prototype/liquid-dock ·
**Scope** the BUILD-SPEC (exact files/lines, before/after, acceptance, gate impact, a11y/PRM/Safari).
**Synthesized from** `research-root-cause.md` (LIVE-confirmed mechanism) · `research-target.md` (the SOTA/acceptance bar) · `research-mechanism.md` (the no-re-fork composition discipline).

> This is a **MECHANICS re-spec — three design transpositions, not bug-fixes.** Each viz paints exactly
> what its math specifies; the math specifies the wrong thing. The fix re-aims the math, in lockstep
> across the single-math-source triad (JS evaluator ↔ WGSL primary ↔ GLSL fallback). The "GL fence" the
> house enforces bars editing a shader to carry a change a **uniform** could carry (color/alpha/size);
> a deliberate transposition of the **warp law itself** is the legitimate shader-math edit, gated by the
> JS↔WGSL↔GLSL round-trip (`proof:*` clause 3 — the three stay byte-numerically identical).

---

## 0. The architectural headline — ONE shared `waveField` leaf, two field samplers

The user names the shared basis THREE times ("the SAME wave-based math", "function as essentially the
paper grid", "level set, gradient topology"). paper-grid + concentric are **ONE mechanism, two renders**:
a **traveling-wave-gated CELL-LOCAL coordinate deformation** + the shared `curlFBM` flow field, applied
to two extractions (grid lines vs. level-set contours). This BUILD-SPEC mints the shared leaf so a tuning
lands ONCE and the two viz move together.

| | the SHARED part (`waveField`) | the PER-VIZ extraction |
|---|---|---|
| **paper-grid** | cell-twist coord deform + `curlFBM` twist-angle field + traveling-wave envelope | `gridCoverage` (Ben Golus grid lines) — **UNTOUCHED** |
| **concentric** | the SAME cell-warp coord deform + `curlFBM` flow + the swell | `contourInk` (IQ level-set lines) over a low-octave fbm height — **UNTOUCHED** |
| **dot-matrix** | the SAME `usePointerVelocityField` pointer source (gravity over `velocity`/`burst`) | instanced-billboard dots + the gravity well + the 2D-plane layout |

### 0.1 New shared leaf (the `flow.{glsl,wgsl}.ts` precedent extended)

```
src/composables/glass/wave/
├── waveField.ts          # the JS evaluator — basis-agnostic: heightField(p,t), cellTwist(uv,cellSize,t), travelingEnvelope(phase)
├── waveField.glsl.ts     # the GLSL string chunk (the host splices ${WAVE_FIELD_GLSL})
├── waveField.wgsl.ts     # the WGSL string chunk (the host splices the SAME functions)
└── index.ts              # internal barrel (off the public glass barrel — the substrate-leaf posture, flow.* precedent)
```

The leaf owns the **basis-agnostic math** (the traveling-wave envelope, the cell-local affine twist
operator, the curl-flow direction read); the host shader owns its noise basis + extraction (the
`potentialFBM`-forward-declare splice-order contract `flow.glsl.ts` already teaches). The leaf imports
NO value.js, declares no uniforms — a pure string chunk + a pure JS twin. It SPLICES the existing
`flow.{glsl,wgsl}.ts curlFBM` (does not re-fork it — `curlFBM` stays the ONE curl operator). The
≥3-consumer bar: #1 paper-grid (LIVE this wave), #2 concentric (LIVE this wave), #3 the booked
`<Card grid animated>` breathe + W-FLOWFIELD — recorded in `docs/consumer-evidence/wave-field.md`.

### 0.2 The cell-twist operator (the binding math — the C3 root-cause cure)

The cardinal distinction: the shipped warp displaces the coordinate **uniformly** (`g = uv + h(uv,t)`,
`h` LOW-freq → the local deformation gradient `F = I + ∂h/∂uv ≈ I` → the cell translates rigidly → the
**LINES bow**). The cure makes the local **Jacobian depart from identity** at the CELL scale by applying
a per-cell affine rotation/shear about each cell's own center:

```glsl
// WAVE_FIELD_GLSL — the cell-local twist (paper-grid + concentric share this exactly).
// host supplies: float curlScalar(vec2 cc, float t)  — the curl-noise vorticity at the cell center.
// returns the twisted coordinate (still in grid space; the host evaluates its extraction at it).
vec2 cellTwist(vec2 g, float cellSize, float t, vec2 waveDir, float waveK, float waveOmega,
               float waveSigma, float twistMax, float shearMax) {
    vec2  cell    = floor(g / cellSize);          // which box
    vec2  cc      = (cell + 0.5) * cellSize;       // the box CENTER (the pivot, a per-cell constant)
    // the traveling-wave ENVELOPE — a moving Gaussian crest band sweeping along waveDir at speed c.
    float coord   = dot(cc, waveDir) * waveK - t * waveOmega;
    float crest   = fract(coord / TAU);            // 0..1 along the wave
    float env     = exp(-pow((crest - 0.5) * 2.0, 2.0) / max(waveSigma, 1e-3)); // moving Gaussian front
    // the per-cell twist angle — gated by the wave envelope, DIRECTED by the curl flow (coheres adjacent cells).
    float theta   = twistMax * env * curlScalar(cc, t);
    float shear   = shearMax * env * curlScalar(cc + 17.3, t);
    // twist (+ optional shear) the LOCAL coord about the box center.
    vec2  local   = g - cc;
    float cs = cos(theta), sn = sin(theta);
    vec2  rot     = vec2(cs * local.x - sn * local.y, sn * local.x + cs * local.y);
    rot.x        += shear * rot.y;                  // a small skew so the box MORPHS, not just rotates
    return cc + rot;
}
```

**The pivot is the cell center** — the box rotates about its own middle, so the cell stays in place but
TWISTS (a windmill of warped boxes where the crest passes; calm square cells elsewhere). `curlScalar`
DIRECTS the twist (adjacent cells lean together → a flowing read, never per-cell noise); the curl is
divergence-free so twisted cells don't pile up. The `env` is a **moving Gaussian front** — the cells are
calm where the wave has not reached, twist HARD at the crest, relax behind it ("a wave passing OVER and
THROUGH"). This is the deformation-gradient model (the local distortion is the GRADIENT of the
displacement field, not the displacement itself).

### 0.3 The liquid-weight envelope (binding — `feedback-liquid-weight-universal`)

The wave-front advances with **inertia** and the cell-twist eases in/out on a **spring-soft** envelope
with a slight **overshoot** at the lean — never a raw `sin` snap. The leaf exposes the envelope through a
spring-eased amplitude the JS host drives (the host owns the `SpringProgress`/`useLiquidFlex` clock; the
shader reads the host-supplied amplitude uniform). At the crest a cell may also **non-uniformly scale**
(volume-preserving X/Y reciprocal squish, the `useLiquidFlex` law, bounded ≤ ±8%) so the box MORPHS as
it twists. The wave-front auto-loops on an interval AND fires on a pointer fling.

---

## 1. PAPER-GRID — cell-twist on the grid lines (C3)

### 1.1 The exact change

The defect is `paper-grid.wgsl.ts:176-178` (and the GLSL twin + the `paperGrid.ts` JS source):

```wgsl
// BEFORE (the LINE-warp — the lines bow as a unit):
var g = uv * gridScale;
g = g + curlWarp(g, t);        // ← global IQ domain warp: F ≈ I, cells translate rigidly
g = g + cursorBulge(g);
let minor = gridCoverage(g, u.grid.x, dv);
```

```wgsl
// AFTER (the CELL-LOCAL twist — the boxes twist, lines stay locally straight):
var g = uv * gridScale;
g = cellTwist(g, 1.0, t, u.wave.xy, u.wave.z, u.wave.w, u.wave2.x, u.wave2.y * u.amp, u.wave2.z * u.amp);
g = g + cursorSwirl(g, t);     // the cursor injects a LOCAL twist (re-aimed cursorBulge), not a radial push
// the Golus derivative MUST read the FINAL twisted coord (dv computed AFTER cellTwist — the blur-kill survives):
let dv = vec2f(length(vec2f(dpdx(g.x), dpdy(g.x))), length(vec2f(dpdx(g.y), dpdy(g.y))));
let minor = gridCoverage(g, u.grid.x, dv);
```

| change | file:line (3 lockstep arms) | before | after |
|---|---|---|---|
| warp law | `paper-grid.wgsl.ts:177-178`, `paper-grid.glsl.ts:~141-155`, `paperGrid.ts:~252-266` | `g += curlWarp(g,t); g += cursorBulge(g)` | `g = cellTwist(g,1.0,t,...); g += cursorSwirl(g,t)` |
| `curlWarp` re-aim | same files | returns a DISPLACEMENT added to `g` | retired as a displacement; its `curlFBM` body re-homed as `curlScalar(cc,t)` (the twist-direction field, not a coord offset) |
| `cursorBulge` → `cursorSwirl` | same files | radial Gaussian push `(toC/d)*bulge` | a local Gaussian-gated rotation about the cursor (`theta_cursor = strength·exp(-d²/2r²)`) — the finger twists the cells around it |
| `dv` ordering | `paper-grid.wgsl.ts:182-185` | computed once on `g` (already after warp) | KEEP after the new `cellTwist` (verify the order; A3 crisp-line fence) |
| splice the leaf | shader headers | inline `curlWarp`/`cursorBulge` | `${WAVE_FIELD_WGSL}` / `${WAVE_FIELD_GLSL}` spliced after the host `curlFBM`/`potentialFBM` |
| new uniforms | `uniformBridgeWGPU.ts` + the GL setup uniform layout | — | `u.wave` (waveDir.xy, waveK, waveOmega), `u.wave2` (waveSigma, twistMax, shearMax), `u.amp` (the spring-eased envelope amplitude the JS drives) |

### 1.2 Constants (`paper-grid/constants.ts`)

```ts
// retire the LINE-warp knobs (clean break, no alias — the no-legacy law):
waveScale: 0.5,        // ← DELETE (the "whole sheet bows together" comment with it)
waveAmplitude: 0.1,    // ← DELETE

// mint the CELL-TWIST knobs:
twistMax: 0.26,        // ≈ 15° at the crest — a clear lean, never a tumble (the legibility floor: ≤ ~18°)
shearMax: 0.10,        // a small skew so the box MORPHS as it twists
waveDir: [0.92, 0.39], // the front travels along a gentle diagonal
waveK: 0.18,           // LOW spatial freq of the crest band (cells per crest)
waveOmega: 0.55,       // the front speed (slow — inertia)
waveSigma: 0.22,       // the crest-band width (a localized front, not a global pulse)
cellSquish: 0.06,      // the ≤±8% volume-preserving morph at the crest (useLiquidFlex law)
```

`minorAlpha`/`majorAlpha`/`WARM_IDENTITY_INK` are **UNCHANGED** (the warm-cream identity holds; the
visibility-over-light-page is a SEPARATE concern booked to the gray-glass fix `research-mechanism.md §1-2`
— NOT folded here, this wave is the MECHANICS transposition only).

### 1.3 Acceptance (falsifiable, both modes)

- **A1 — cells twist, lines don't bow.** At a wave crest the mean per-cell corner-angle |Δ from 90°| ≥ 6°
  (cells visibly twisted); a straight grid line through a CALM band has line-position RMS deviation ≤ the
  crisp-line width (lines locally straight). **The current HEAD build FAILS A1 with the metrics swapped**
  (lines bow → line-RMS high; cells rigid → corner-angle ≈ 0). Born-RED.
- **A2 — the wave travels.** A per-column twist-energy timeline shows ONE localized peak translating
  across the sheet at constant `c`, returning to square behind it. A static/global-pulse build shows no
  traveling peak.
- **A3 — crisp.** Line coverage is 1 device-px at 1× and 2× DPR (Golus invariant; `dv` after the twist).
- **A4 — liquid weight.** The cell-twist engage is a spring-soft envelope (no hard step); the front
  advances with inertia, the lean overshoots slightly.
- **A5 — PRM.** Under reduce: one static SQUARE-grid frame, parked (`env ≈ 0`, `amp` snapped to 0).

---

## 2. CONCENTRIC — level-set contours over the SHARED wave-warp (C6)

### 2.1 The exact change — RETIRE `ringField.ts`, mint the level-set field

The current engine is a radial sum-of-sines moiré (`ringField.ts sampleRingField` — `Σⱼ Σᵢ Aᵢ·sin(kᵢ·r −
ωᵢt)`), rendered as `traveling-rings` (the sinusoid-crest path). It is the WRONG mechanism entirely
("not right"). Replace with the paper-grid's TWIN over the shared `waveField` leaf:

```wgsl
// BEFORE (concentric.wgsl.ts fs_main, mode default traveling-rings):
let oe = ringIsolineInk(p, t);     // radial sum-of-sines + IQ isoline DE
var ink = oe.ink;
let env = oe.env;
if (mode == 1) { ink = contourInk(env * u.norm.x, levels); }  // static-contour is the SECONDARY path
```

```wgsl
// AFTER (concentric = paper-grid with level-set contours):
let g    = cellWarpBeforeHeight(p, t, u.wave.xy, u.wave.z, u.wave.w, u.wave2.x, u.amp);  // the SHARED wave-warp
let H    = heightField(g, u.seed)                       // a LOW-octave value-noise topography (clean nested loops)
         + u.swell * waveSwell(g, t);                   // the ω=√(g·k) breathing — basins inflate/deflate
let fN   = H * levels + u.perturb * levelJitter(round(H * levels), t);  // per-contour independent wobble
let dPx  = fwidth(fN);                                  // KEPT IQ level-set AA (gradient-free, no edit)
let ink  = contourInk(H * levels, levels);              // the KEPT extraction — UNTOUCHED
let tint = heightRamp(H);                               // basins cool-cream, ridges warm-amber (topographic ramp)
```

| change | file:line (3 lockstep arms) | before | after |
|---|---|---|---|
| field source | `ringField.ts` (whole file), `concentric.wgsl.ts:111-188`, `concentric.glsl.ts:~94-188` | radial sum-of-sines `sampleRingField` + `ringIsolineInk` | `heightField(g,seed)` low-octave fbm + the shared `cellWarpBeforeHeight` |
| RETIRE | `ringField.ts` | `sampleRingField`/`ellipsoidalRadiusRot`/`ellipsoidalGradMag` | DELETE the file (clean break, no alias — `proof:concentric` round-trip re-points to the new `levelField.ts` source) |
| primary render | `concentric.wgsl.ts:222`, `constants.ts:119` | `renderMode: "traveling-rings"` default | `contourInk` IS the primary path (the `renderMode` axis collapses — the level-set IS the viz; the sinusoid mode RETIRES) |
| `contourInk` | `concentric.wgsl.ts:193-200` | the secondary mode-1 path | UNTOUCHED — now the PRIMARY extraction (the gradient-free GPU level-set, perfect AA) |
| warp share | shader headers | own `ringField` engine | `${WAVE_FIELD_WGSL}` spliced — the SAME `cellTwist`/`curlScalar`/envelope paper-grid splices |
| cursor | `Concentric.vue:106`, `constants.ts:124` | `pointer-events: none`; `interactive: false` | DELETE `pointer-events: none`; `interactive: true` default; wire a cursor Gaussian peak/well into `heightField` (the topography bulges toward/away the pointer) over `usePointerVelocityField` |
| new JS source | `concentric/composables/levelField.ts` | — | the `heightField`/`heightRamp`/`waveSwell`/`levelJitter` JS twin (the single-math-source for the round-trip; transcribed by the WGSL/GLSL) |

### 2.2 Constants (`concentric/constants.ts`)

```ts
renderMode: "traveling-rings",  // ← RETIRE the axis (level-set is THE viz; no sinusoid mode)
interactive: false,             // ← flip to true (cursor gravity, paper-grid parity)
lineWidth: 1.4,                 // KEEP (the contour stroke half-width; visibility is the separate gray-glass concern)
// mint:
heightOctaves: 3,               // LOW octave → clean nested loops (not high-freq speckle — the legibility floor)
heightSeed: 7.0,
swellAmp: 0.18,                 // the ω=√(g·k) breathing depth (contours inflate/deflate — weight)
perturbAmp: 0.04,               // per-contour wobble
cursorWell: 0.30,               // the cursor Gaussian peak depth (the topography bulges under the pointer)
```

`WARM_IDENTITY_PALETTE` is **UNCHANGED** (the height ramp reads it: basins → the light stop, ridges →
the ember stop; presets-in-consumers, NO teal/navy). The `cellWarp*`/`twistMax`/`waveDir` knobs are
SHARED with paper-grid (read from the `waveField` defaults so a tune lands once).

### 2.3 Acceptance (falsifiable, both modes)

- **B1 — level-set contours, NOT perfect ellipses.** A circularity/rigidity metric on the rendered lines
  shows IRREGULAR nested loops; the contour density tracks `1/|∇H|` (bunched on steep ground). The HEAD
  perfect-radial-ellipse build FAILS B1 (rigidly circular). Born-RED.
- **B2 — the wave flows the contours.** As the traveling wave crosses, a region's contours measurably
  twist/migrate/stretch (the SAME front that twists paper-grid cells); a topological merge (figure-8)
  occurs over the cycle. A static-field build shows none.
- **B3 — kinship with paper-grid.** The shared `waveField` source byte-round-trips across BOTH viz
  (`proof:wave-field` — the wave dir/speed/twist family is identical).
- **B4 — topographic color.** Height drives the OKLCh stop (basins vs ridges distinguishable); warm-cream
  identity; no themed literal in `constants.ts`.
- **B5 — cursor gravity.** With `interactive` on, the cursor bulges the topography (a measurable contour
  migration toward/away the pointer); `pointer-events: none` is GONE.
- **B6 — PRM.** One static contour-map frame (a finished survey map), parked.

---

## 3. DOT-MATRIX — the 2D-plane register + the strong gravity well (C4)

### 3.1 The exact change — additive `layout` axis + the gravity well

KEEP the dots + the sphere (it is "good" — a kept preset). ADD a 2D-plane register + replace the weak
repel-dimple with a deep, wide, weighty attraction well.

| change | file:line (3 lockstep arms) | before | after |
|---|---|---|---|
| layout axis | `dotMatrixField.ts buildDotsBuffer`, `constants.ts`, `DotMatrix.vue` | sphere-only (`fibonacciDot` on the unit sphere) | `layout: "sphere" \| "plane"` — `plane` lays a jittered 2D lattice / phyllotaxis disc filling `[-aspect,aspect]×[-1,1]`; `sphere` UNCHANGED (kept preset) |
| vertex branch | `dot-matrix.wgsl.ts` vs_main, `dot-matrix.glsl.ts` | `uSpin * unitPos → n.xy` (sphere project) | `if plane: use the dot's own xy (no spin, gentle 2D drift); else: the sphere path UNCHANGED` |
| depth-fade | `dotMatrixField.ts:88-95` | sphere-facing (`n.z`) | plane: distance-from-cursor fade (near the well → brighter/bigger, bounded) |
| gravity well | `useDotMatrix.ts:112`, `dot-matrix.glsl.ts:67-79`, `dot-matrix.wgsl.ts` | `targetPush = sign·min(0.35, 0.08+speed·0.6)`; `dimple = exp(-pd²·18)` (TIGHT) | a deep WIDE well: `pull = gravityStrength·falloff(d, gravityRadius)`; widen falloff (`·18` → `·4..6` or `1/(d²+ε)` clamped); default `attract`; raise the cap; `lift = normalize(cursor − anchor)·pull` (a real 2D displacement, not a surface bump) |
| weighty settle | `useDotMatrix.ts:99-113` | linear clamp `push += (target-push)*0.2` | a SPRING settle (ζ<1 overshoot) so the well LAGS the cursor + the dots ease back with bounce (`feedback-liquid-weight-universal`); the flick `burst` injects a transient over-pull (comet-tail) |
| pointer source | `useDotMatrix.ts` | `usePointerVelocityField` already wired | UNCHANGED — gravity reads `position`, the wake reads `velocity`/`acceleration`, the flick reads `burst`; fed `tick(delta)` from the renderer frame (no own rAF) |

### 3.2 Constants (`dot-matrix/constants.ts`)

```ts
// mint:
layout: "plane",            // the NEW default for the background use (sphere is a kept preset)
gravityStrength: 0.42,      // DEEP well — "persist MORE gravity" (was the 0.08 parallax, the wrong register)
gravityRadius: 0.55,        // WIDE falloff (NDC) — many dots feel the pull
gravityMode: "attract",     // the plane register attracts (the sphere keeps its repel/attract axis)
settleResponse: 0.42,       // the spring settle clock (slow → weight)
settleZeta: 0.7,            // ζ<1 → overshoot/wobble on return (the liquid-weight bounce)
wakeStrength: 0.30,         // the velocity-led comet-tail on a fast sweep
```

`WARM_IDENTITY_PALETTE`/`dotSize`/`baseOpacity`/`depthFade` UNCHANGED (the fine-dot field + the `fwidth`
SDF crispness untouched; max dot radius ≤ 0.5·pitch — never tessellates to a blob).

### 3.3 Acceptance (falsifiable, both modes)

- **C1 — 2D-space field.** With `layout: "plane"` the dots read as a 2D-plane background lattice (not a
  floating 3D sphere). The sphere preset still passes its own bar.
- **C2 — strong gravity.** A dot within `gravityRadius` is displaced toward the cursor by ≥ a named
  fraction of the pitch (deep well), measurably MORE than the shipped 0.08 parallax; the falloff is WIDE
  (many dots affected). HEAD's 0.08 parallax / tight `·18` dimple FAILS C2. Born-RED.
- **C3 — weighty settle.** When the cursor moves, the dots LAG (the well trails) and ease back to lattice
  on a spring with overshoot (ζ<1) over a perceptible window — NOT an instant snap.
- **C4 — fine field preserved.** Max dot radius ≤ 0.5·pitch; the `fwidth` SDF crispness untouched.
- **C5 — PRM.** One static lattice frame (anchors, gravity off), parked (`tick(0)` freeze).

---

## 4. Gate impact (extend in place, born-RED → GREEN)

### 4.1 NEW `proof:wave-field` (the shared-leaf round-trip — the load-bearing new gate)

`scripts/proof-wave-field.mjs` (`["local","ci"]`). The shared leaf's JS↔GLSL↔WGSL three-way numeric
identity at a fixed sample set (the `proof:gpu-substrate-single` round-trip precedent):

- **WF1** — the leaf EXISTS ONCE (`src/composables/glass/wave/waveField.{ts,glsl.ts,wgsl.ts}`); off the
  public glass barrel (substrate posture); splices `curlFBM` (no re-fork of the curl operator).
- **WF2** — `cellTwist`/`travelingEnvelope`/`heightField` round-trip JS↔WGSL↔GLSL at a fixed `(p,t)`
  sample grid (structural transcription + numeric ≤ 1e-5; the single-math-source).
- **WF3** — ≥3 booked consumers (`docs/consumer-evidence/wave-field.md`: paper-grid + concentric LIVE,
  the `<Card grid animated>` breathe booked).
- **self-test bite** — a planted divergent JS↔WGSL transcription reds WF2.

### 4.2 `proof:viz-papergrid` — EXTEND clause P4 (the warp law) + RE-PIN constants

- **P4 re-aimed** — the liquid warp is the **CELL-TWIST** (`cellTwist` spliced from `waveField`), NOT the
  retired `curlWarp` displacement. Assert `paper-grid.wgsl.ts` calls `cellTwist(` and the GLSL/JS twins
  transcribe it; assert the retired `waveScale`/`waveAmplitude` LINE-warp knobs are GONE (no-legacy).
  **Born-RED on HEAD** (HEAD calls `curlWarp` + has `waveScale`).
- **P3 round-trip** — re-pins the JS source to include the cell-twist math.
- **P5 warm-identity** — UNCHANGED (the constants stay warm `h∈[40,80]`; the new knobs carry no hue).
- **Self-test bite** — a planted `g += curlWarp(g,t)` (the HEAD line-warp form) reds P4.

### 4.3 `proof:concentric` — EXTEND for the level-set overturn

- **clause: field-is-level-set** — assert `concentric.wgsl.ts` evaluates `heightField(`/`contourInk(` as
  the PRIMARY path; assert `ringField.ts` / `sampleRingField` / `ringIsolineInk` are
  **DEFINITION-ABSENT** (the clean-break retirement). **Born-RED on HEAD** (HEAD has `ringField.ts` +
  `renderMode: traveling-rings`).
- **clause: shares-wave-field** — assert concentric splices the SAME `${WAVE_FIELD_WGSL}` chunk.
- **clause: cursor-wired** — `Concentric.vue` has NO `pointer-events: none`; `interactive: true` default.
- **clause 5 warm-identity** — UNCHANGED.
- **Self-test bite** — a re-introduced `sampleRingField` reds.

### 4.4 `proof:dot-matrix` — EXTEND for the plane register + gravity

- **clause: layout-axis** — `layout: "sphere" | "plane"`, plane the default; the sphere path
  byte-preserved (a kept register, not a deletion).
- **clause: gravity-well** — assert the well is a deep/wide attract field (`gravityStrength`/`-Radius`
  minted; the tight `·18` dimple + the `0.08`-parallax cap RETIRED). **Born-RED on HEAD.**
- **clause: weighty-settle** — the settle is a spring (ζ<1), not a linear clamp.
- **clause 3 round-trip** — the plane layout + gravity round-trips JS↔WGSL↔GLSL.

### 4.5 `proof:pointer-velocity` — the gravity reads the field (no new field state)

The well/wake/flick read the SHARED `usePointerVelocityField` `position`/`velocity`/`burst`. No `inertia`
opt is minted here (that is `research-mechanism.md §C-1`'s separate motion-weight concern; this wave's
weight is the per-viz SPRING settle, reading the EXISTING field). V1-V5 stay GREEN.

### 4.6 `proof:no-layout-animation` — compositor-only (stays GREEN)

All three are GPU fragment/vertex passes off the layout path; the cell-twist/contour-warp/gravity are
per-fragment/per-instance; PRM → one static frame. No `@keyframes` minted (the spring weight is the host
JS clock + the existing `--spring-*` family). Stays GREEN by construction.

### 4.7 `proof:ba-gestalt` — the substrates-band verdict re-earns

paper-grid/concentric/dot-matrix re-earn their gestalt verdict on a FRESH capture at the reflect wave —
the binding paint truth: the grid CELLS twist (lines don't bow), concentric reads as a TOPOGRAPHIC
contour map (not rings), the dot field is a 2D background with strong cursor gravity.

---

## 5. The hard fences (binding for all three)

1. **NO legacy / clean break** — the paper-grid LINE-warp (`curlWarp`-as-displacement + `waveScale`/
   `waveAmplitude`) and the concentric radial-sinusoid engine (`ringField.ts` + `renderMode:
   traveling-rings`) are OVERTURNED (no alias, no back-compat mode). The dot-matrix sphere SURVIVES as a
   kept preset (it is "good") — the default register for the background use is the 2D plane.
2. **Single-math-source contract** — every shader edit lands in lockstep across JS↔WGSL↔GLSL; the
   `proof:*` round-trip clause locks the three-way numeric identity. The "GL fence" (no shader edit for a
   uniform-carryable change) is HONORED — these are warp-LAW transpositions, not color/alpha edits.
3. **Crisp-line / fine-dot legibility floor** — the Golus `gridCoverage` + the IQ `contourInk` + the
   `fwidth` SDF dot AA are **UNTOUCHED**; the cell-twist is bounded (≤ ~18°), the contours stay LOW-octave
   clean loops, the dot radius ≤ 0.5·pitch. The "blurry mess" must never recur. `dv`/`fwidth` read the
   FINAL warped coord (the blur-kill survives the transform).
4. **Liquid-weight law** (`feedback-liquid-weight-universal`) — every motion carries inertia/weight/
   overshoot/squish: the paper-grid wave-front advances with inertia + the cells overshoot as they twist;
   the concentric contours flow + breathe with weight; the dot gravity well LAGS + the dots settle on a
   spring with overshoot. Nothing snaps. Driven through the host `SpringProgress`/`useLiquidFlex` clock —
   the ONE squish primitive, no re-fork, no new spring token.
5. **Warm-cream identity + transparent ground + presets-in-consumers + NO teal/navy** — the re-spec is
   MECHANICS + MOTION, not a new hue. `WARM_IDENTITY_INK`/`WARM_IDENTITY_PALETTE` unchanged; the dark
   register warms in lockstep (W-DARK-MATERIAL). The iOS-27 six-layer optical composite (backdrop blur+
   saturate · warm tint · edge rim · inner catch-light · drop shadow · grain) is the surrounding glass
   surface — untouched; these viz are the warm ink/dot/contour field over it.
6. **Compositor-only · PRM-carved · Safari-first** — WGSL primary + WebGL2 fallback (the SAME math,
   parity `verified` ΔE mean≤2.0/p99≤5.0); `fwidth`/`dpdx`/`dpdy` only (NOT `fwidthFine` — Compatibility-
   Mode safe on Metal/WebKit); the `oklch(from …)`-class relative color is Safari 16.4+ (only if a height
   ramp uses it; the existing palette LUT is the floor). PRM → one static frame (square grid / finished
   contour map / rest lattice) then park. ZERO Canvas2D — all three are GPU fragment/instanced passes.
   The leaf inherits the offscreen-pause + live-PRM freeze + demand-loop (no own rAF).

---

## 6. The minimal ordered change list

1. **Mint `src/composables/glass/wave/waveField.{ts,glsl.ts,wgsl.ts}` + `index.ts`** — the shared leaf
   (`cellTwist`/`travelingEnvelope`/`heightField`/`cellWarpBeforeHeight`/`curlScalar`); splices `curlFBM`.
2. **`docs/consumer-evidence/wave-field.md`** — the ≥3-consumer booking.
3. **paper-grid** — splice the leaf; re-aim `curlWarp`→`cellTwist` + `cursorBulge`→`cursorSwirl` in the 3
   arms; new uniforms in `uniformBridgeWGPU.ts` + the GL setup; constants (retire `waveScale`/
   `waveAmplitude`, mint the twist knobs); the JS host drives the spring-eased `amp` envelope.
4. **concentric** — DELETE `ringField.ts`; mint `levelField.ts`; level-set primary in the 3 shader arms;
   splice the shared leaf; `Concentric.vue` drop `pointer-events: none`; `interactive: true`; cursor well;
   constants (retire `renderMode`/sinusoid, mint the topography knobs).
5. **dot-matrix** — `layout: "sphere"|"plane"` in `dotMatrixField.ts` + the vertex branch in the 3 arms;
   the gravity well (deep/wide attract + spring settle) in `useDotMatrix.ts` + the shader push; constants.
6. **Gates** — `scripts/proof-wave-field.mjs` (NEW); extend `proof-viz-papergrid.mjs` (P4 re-aim + re-pin)
   / `proof-concentric.mjs` (level-set overturn + ringField-absent) / `proof-dot-matrix.mjs` (plane +
   gravity); each born-RED on HEAD → GREEN at close + a self-test bite.
7. **π specs** — extend `tests-visual/paper-grid.spec.ts` (A1 cell-twist-vs-line-bow), `concentric.spec.ts`
   (B1 level-set-not-rings + B5 cursor), `dot-matrix.spec.ts` (C1 plane + C2 gravity), all born-RED on the
   current defect, both modes, LOCAL (ride the reflect wave + `proof:ba-gestalt`).

Files touched: `+4` new (the leaf + index + consumer-evidence + `proof-wave-field.mjs`), `−1` retired
(`ringField.ts`), `~3 viz × {shader.wgsl, shader.glsl, JS source, constants, SFC/useX, uniformBridge}`,
`+1 levelField.ts`, `~3 proof-*.mjs` extend, `~3 *.spec.ts` extend. The shader edits are the legitimate
warp-law transposition, locked by the JS↔WGSL↔GLSL round-trip — NOT a uniform-carryable change.
