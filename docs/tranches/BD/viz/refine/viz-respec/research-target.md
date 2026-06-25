# viz-respec — RESEARCH-2 DESIGN TARGET (the SOTA + acceptance bar for the three re-spec'd vizzes)

**Lane** BD viz-respec / RESEARCH-2 (the SOTA / design target) · **Status** AUTHORED 2026-06-23 · **Branch** prototype/liquid-dock ·
**Scope** RESEARCH / TARGET-DEFINITION ONLY — zero `src/` paint. This doc is the binding north-star the fix-agents hit.
**Grounded against** the shipped `paper-grid`/`concentric`/`dot-matrix` math + constants at HEAD · the prior BD research (`research/papergrid-warp.md`, `research/concentric-levelset.md`, `research/dotmatrix-image.md`, `research/wave-math-shared.md`) · the verbatim user feedback (`refine/USER-FEEDBACK-2026-06-23-batch2.md` items C3/C4/C6).

> The prior BD research docs are CORRECT and load-bearing — but they predate the C3/C4/C6 verbatim. This doc RE-SPECS the three to the new verbatim, and where it OVERTURNS a prior premise it says so (the paper-grid LINE-warp → CELL-warp overturn is the headline).

---

## 0. The three verbatim asks (binding) + the one-line decode

| # | route | verbatim | decode (the OVERTURN) |
|---|---|---|---|
| C3 | `/substrates/paper-grid` | "the individual paper LINES should NOT wave, but the CELLS in local boxes SHOULD — the grid should TWIST and MORPH as if a wave was passing OVER and THROUGH it." | **OVERTURN the warp class.** Today: a uniform domain warp `g=uv+h(uv)` — the LINES bow. Target: a CELL-LOCAL deformation (each grid box twists/shears/morphs) gated by a TRAVELING-WAVE envelope. The deformation is the **Jacobian `∇h` (the displacement GRADIENT), not the displacement `h`**. |
| C6 | `/substrates/concentric` | "not right; should function as essentially the PAPER GRID, but with concentric LEVEL-SET lines. Take inspiration from the paper grid and vector calculus, level set, gradient topology." | **OVERTURN the field.** Today: perfect radial-sinusoid rings. Target: concentric = the paper-grid cell-warp MECHANICS applied to **level-set (iso-contour) lines of a scalar topographic field** — the contours twist/flow like a gradient-topology map as the same traveling wave passes through. |
| C4 | `/substrates/dot-matrix` | "good, but should persist more GRAVITY to the cursor, and should function more in a 2D SPACE as a background effect." | **KEEP the dots, RE-AIM the register.** Today: a 3D dot-SPHERE with weak parallax (0.08). Target: a 2D-SPACE dot-FIELD background with STRONG cursor gravity (the dots are pulled toward / warped by the cursor with weighty inertia). |

**The shared math thread the user names THREE TIMES** ("the SAME wave-based math", "function as essentially the paper grid"): paper-grid + concentric are ONE mechanism — a **traveling-wave-gated local deformation of a coordinate field** — applied to two different render extractions (grid lines vs. level-set contours). This is the binding architectural commitment (`research/wave-math-shared.md` mints the shared `waveField` leaf; this doc defines the MECHANICS that leaf must produce).

---

## 1. The cardinal math distinction — DISPLACEMENT vs. its GRADIENT (the C3 root cause)

This is THE insight the fix must hit. The shipped paper-grid warps the coordinate uniformly:

```
g(uv,t) = uv + h(uv,t)          // h = curlWarp (a smooth LOW-freq field)
lines   = gridCoverage(g)        // the grid evaluated at the warped coord
```

Because `h` is LOW spatial frequency, a small neighborhood (one cell) is displaced **almost rigidly** — `h` is nearly constant across a cell, so the cell translates/bows as a unit and the LINES bend. The local **deformation gradient** `F = I + ∂h/∂uv` stays ≈ `I` (identity) — the cell does not change SHAPE, it just moves. **That is exactly "the lines wave" and exactly what the user condemns.**

The user wants the CELLS to deform. A cell deforms iff its **Jacobian departs from identity** — iff `∂h/∂uv ≠ 0` AT THE CELL SCALE. Two ways to make that happen, and the target uses BOTH composed:

1. **A CELL-LOCAL rotation/shear field.** Instead of (or on top of) the smooth displacement, apply a local affine map to the coordinate WITHIN each cell — a rotation by `θ(uv,t)` and/or a shear `s(uv,t)` whose ANGLE/MAGNITUDE varies slowly across the sheet but acts at the cell scale. Each cell becomes a twisted parallelogram. The lines INSIDE a cell stay straight (a cell is still a quad), but the cell BOX twists — "twist and morph as if a wave was passing through it."
2. **A traveling-wave ENVELOPE that gates the deformation amplitude.** `θ(uv,t) = θ_max · twist(uv) · A_wave(uv,t)` where `A_wave` is a moving Gaussian/sine FRONT sweeping across the sheet (`A_wave = exp(−(dot(uv,dir)−c·t)²/σ²)` or a propagating `sin(k·dot(uv,dir)−ω·t)`). So the cells are calm where the wave has not reached, twist HARD where the wave crest is, and relax behind it — "a wave passing OVER and THROUGH it."

**The mechanics (the binding spec for the fix):**

```
// per-cell local frame
cellId   = floor(uv / cellSize)                       // which box
cellUV   = fract(uv / cellSize)                        // 0..1 within the box
center   = cellId + 0.5                                // the box center (the pivot)

// the traveling wave envelope (the C3 "wave passing through")
phase    = dot(center, dir) − c·t                      // wave coordinate (per CELL, not per pixel)
env      = waveEnvelope(phase)                          // moving crest: gaussian front OR sin

// the local cell deformation (the GRADIENT, not the displacement)
theta    = twistMax · env · field(center, t)           // a per-cell rotation angle, gated by the wave
shear    = shearMax · env · ...                         // optional per-cell shear
local    = (cellUV − 0.5)                               // coord relative to the box pivot
warped   = center + rotate(local, theta) [+ shear]      // TWIST the box about its own center
lines    = gridCoverage(warped · cellSize)              // the grid at the per-cell-twisted coord
```

The pivot is the **cell center** — the box rotates about its own middle, so the cell stays put but TWISTS (a windmill of warped boxes where the wave passes). This is the deformation-gradient model the eLife/grid-cell + continuum-mechanics literature describes ("the local distortion is the gradient of the displacement field", [eLife 38169](https://elifesciences.org/articles/38169), [Deformation Gradient Tensor](https://www.sciencedirect.com/topics/engineering/deformation-gradient-tensor)).

**Why the curl-flow still belongs (the field that DRIVES the twist):** the shared Bridson `curlFBM` field is no longer the DISPLACEMENT — it is the **twist-angle / wave-direction FIELD**. `field(center,t)` (the curl-noise scalar, or its vorticity `|∇×|`) drives WHICH WAY and HOW MUCH each cell twists, so the twist coheres into a flowing pattern (adjacent cells twist together → a fluid read, never per-cell noise). The curl preserves area, so the twisted cells don't pile up. ONE wave-math source, re-aimed from "displace the coord" to "rotate each cell."

**The legibility floor (binding — never re-introduce the "blurry mess"):** the cell TWIST is bounded so the grid stays unmistakably a grid. `twistMax` small enough that at the wave crest a cell rotates ≤ ~12–18° (a clear lean, not a tumble); the lines stay crisp (the Ben Golus derivative-AA `gridCoverage` is UNTOUCHED — the crisp-line fix survives the re-spec). The wave PASSES; the grid SETTLES back calm behind it. This is "felt, not loud" re-aimed to the cell scale.

---

## 2. PAPER-GRID — the precise TARGET (C3)

### 2.1 What it SHOULD look like (the gestalt)

A calm engineering-graph-paper grid (warm-cream `--foreground` ink over transparent, LARGE 64px cells, crisp 1px Golus lines, a bolder rule every 5) at REST — the lines do NOT bow, do NOT wave. Then a slow wave-front travels across the sheet (left→right, or along the curl-flow direction). WHERE the crest is, the local cells TWIST/MORPH — each box leans + shears a little, the whole crest-band reads as a ripple of twisting boxes moving through a still grid, like a wave passing under a sheet of graph paper laid on water. Behind the crest the cells relax back to square. The lines THEMSELVES are always locally straight per cell — it is the BOXES that deform, not a global line-bow. The motion has WEIGHT: the wave-front advances slowly + smoothly (inertia), the cells ease into and out of the twist on a spring-soft envelope (never a hard on/off), the crest carries a slight overshoot as it leans (the liquid-weight law).

### 2.2 The mechanics (the binding model)

- **At rest (no wave):** `env ≈ 0` everywhere → the coord is the un-warped grid → square cells, straight lines, crisp. (The calm floor is a SQUARE grid, NOT today's perpetual gentle bow.)
- **The traveling wave:** a moving envelope `A_wave(cellCenter, t)` — a Gaussian crest band (width `σ`) sweeping at speed `c` along `dir`, OR a low-`k` propagating sinusoid. The crest may auto-loop on an interval AND fire on a pointer fling (the user's "a wave passing over").
- **The cell twist:** each cell rotates about its center by `θ = twistMax · A_wave · curlScalar(cellCenter,t)` (+ optional shear). The curl-noise scalar gives the twist its FLOWING, coherent direction (adjacent cells lean together). `twistMax ≈ 0.20–0.30 rad` (≈ 12–17°) at the crest.
- **Optional cell-scale breathing-morph:** at the crest a cell may also slightly scale non-uniformly (squash one axis, stretch the other — volume-preserving, the `useLiquidFlex` reciprocal-squish law) so the box MORPHS as it twists, not just rotates. Bounded ≤ ±8%.
- **The crisp line is UNTOUCHED** — `gridCoverage` (Ben Golus derivative-AA) evaluates at the per-cell-twisted coord; the line is still exactly N device-px at any DPR (the blurry-mess fix survives).
- **Cursor gravity** (consistent with dot-matrix C4): the cursor injects a LOCAL twist/bulge — a finger pressed into the sheet that twists the cells around it (the existing `cursorBulge` re-aimed from a radial push to a local swirl, over `usePointerVelocityField`). A fling fires a wave-front from the cursor.

### 2.3 The fences (binding)

1. **Lines locally straight; cells deform.** The acceptance test is a STRAIGHTNESS-of-line vs. TWIST-of-cell separation: a per-cell corner-angle deviation from 90° (the cell twist) must be measurably non-zero at the crest, WHILE a long-line straightness metric (sampled along a grid line through a calm region) stays ≈ straight. The current "lines bow" state FAILS the line-straightness side; a uniform-warp regression re-fails it.
2. **Crisp line preserved.** Golus AA untouched — 1 device-px at any DPR. No CSS sub-pixel blur (the original defect must not recur).
3. **Calm rest = SQUARE.** With the wave off / between crests, the cells are square. (Overturns today's perpetual gentle bow.)
4. **Liquid weight.** The wave-front advances with inertia; the cell twist eases in/out on a spring-soft envelope with a slight overshoot at the lean — never a linear/hard engage. (`feedback-liquid-weight-universal`.)
5. **Warm-cream identity + transparent ground + presets-in-consumers + NO teal/navy** (`proof:viz-papergrid` P5 holds). The deepening is MOTION, not a new hue.
6. **Compositor-only fragment math, PRM → one static frame (square grid), Safari-first (WGSL primary + WebGL2 fallback, SAME math), ZERO Canvas2D.**

### 2.4 The acceptance bar (falsifiable, both modes)

- **A1 — cells twist, lines don't bow.** At a wave crest, the mean per-cell corner-angle |Δ from 90°| ≥ ~6° (cells visibly twisted); a straight grid-line through a calm band has line-position RMS deviation ≤ the crisp-line width (lines locally straight). The OLD uniform-warp build (lines bow, cells rigid) FAILS A1 — the two metrics are swapped.
- **A2 — the wave travels.** A per-column twist-energy timeline shows ONE localized peak translating across the sheet at constant `c`, returning to baseline (square) behind it. A static / global-pulse build shows no traveling peak.
- **A3 — crisp.** Line coverage is 1 device-px at 1× and 2× DPR (Golus invariant).
- **A4 — liquid weight.** The cell-twist engage is a smooth spring-soft envelope (no hard step); the front advances with inertia.
- **A5 — PRM.** Under reduce: one static SQUARE-grid frame, parked.

---

## 3. CONCENTRIC — the precise TARGET (C6)

### 3.1 What it SHOULD look like (the gestalt)

A topographic CONTOUR MAP — thin warm-cream level-set lines (the iso-contours of a scalar height field), nested closed loops + ridges + saddles, reading as a gradient-topology / survey-map field. The SAME traveling-wave cell-warp mechanism from paper-grid passes through it: the contours twist + flow + stretch/shrink as the wave-front crosses, exactly as the grid cells twist — concentric IS the paper grid, with the grid LINES replaced by level-set CONTOURS. At rest the contours are calm nested loops; as the wave passes a region, that region's contours bulge, twist, and migrate (a basin inflating, two basins' contours kissing into a figure-8) — the topological-merge events a real scalar field gives for free. The color reads the HEIGHT (basins cool-cream, ridges warm-amber — the topographic ramp). Weighty, slow, liquid.

### 3.2 The mechanics (the binding model — `research/concentric-levelset.md` §2, re-aimed to share the C3 wave)

```
g   = cellWarpedCoord(p, t)        // the SAME traveling-wave cell-warp as paper-grid (§1) — NOT a uniform domain warp
F   = baseFBM(g, seed)             // a LOW-octave value-noise terrain (the random topography)
    + swellAmp · waveSwell(g,t)    // the shared ω=√(g·k) Tessendorf breathing (contours inflate/deflate)
fN  = F·N + perturbAmp·levelJitter(round(F·N), t)   // per-contour independent wobble
ink = contourInk(fN)               // the IQ per-pixel level-set distance (the KEPT extraction primitive — gradient-free GPU marching-squares)
tint = heightRamp(F)               // basins cool, ridges warm (the topographic OKLCh ramp)
```

- **The level-set extraction is KEPT** — the shipped `contourInk` (`|fract(f·N+0.5)−0.5| / fwidth(f·N)`) is the gradient-free GPU-native iso-contour. It already works; do NOT re-fork it (no marching-squares compute, no line buffer — `research/concentric-levelset.md` §6 rejects them).
- **The SOURCE field is OVERTURNED** from perfect radial sinusoids → a curl-warped LOW-octave fbm topography (the "random topographic gradient map" the user names). LOW octave / LOW frequency = clean nested loops (not a high-freq speckle).
- **The wave-math is SHARED with paper-grid** — the same traveling-wave-gated coordinate deformation drives the contour flow that drives the grid-cell twist. This is "function as essentially the paper grid." The shared `waveField` leaf (`research/wave-math-shared.md`) is the ONE source both consume.
- **Vector-calculus / gradient-topology citations** (the user's explicit anchor): level set `{p : F(p)=h}`, the gradient `∇F` (steepest-ascent — the relief direction; an optional `|∇F|` hachure-fill shades slope), the iso-contour spacing ∝ `1/|∇F|` (contours bunch on steep ground, spread on flat — the survey-map signature). The contours are the level sets; the twist/flow is the wave-warped coordinate; the height drives color. ([IQ distance-to-contour](https://iquilezles.org/articles/distance/), [IQ domain warp](https://iquilezles.org/articles/warp/), [Bridson curl-noise SIGGRAPH 2007], [Tessendorf ocean dispersion SIGGRAPH 2001].)

### 3.3 The fences (binding)

1. **Reads as a topographic CONTOUR MAP** — clean nested closed loops, not perfect rigid rings (overturned) and not a high-freq speckle (the LOW-octave floor). The "the line is the point, not a turbulence blur" lesson holds.
2. **Shares the paper-grid wave-math** — ONE `waveField` source; the contour flow and the grid-cell twist visibly KIN (a wave that washes one washes the other in the same direction). `proof:wave-field` round-trips JS↔WGSL↔GLSL.
3. **`contourInk` extraction untouched** — gradient-free GPU level-sets, perfect AA, no geometry buffer.
4. **Height drives color** (topographic ramp — basins cool, ridges warm) within the warm-cream identity; presets-in-consumers; NO teal/navy.
5. **Compositor-only fragment, PRM → one static (a finished survey-map still — beautiful frozen), Safari-first, ZERO Canvas2D** (none to delete — already born WebGPU fragment-only).

### 3.4 The acceptance bar (falsifiable, both modes)

- **B1 — level-set contours.** The rendered lines are the iso-contours of the field (test: the contour density tracks `1/|∇F|` — bunched on steep ground). NOT perfect concentric ellipses (the old build) — a circularity/rigidity metric must show IRREGULAR nested loops.
- **B2 — the wave flows the contours.** As the traveling wave crosses, a region's contours measurably twist/migrate/stretch (the same wave-front that twists the grid cells); a topological-merge (figure-8) occurs over the cycle. A static-field build shows none.
- **B3 — kinship with paper-grid.** The shared `waveField` source is byte-round-tripped across both viz (the wave direction/speed is the SAME family).
- **B4 — topographic color.** Height drives the OKLCh stop (basins vs ridges distinguishable); warm-cream identity; no themed literal in `constants.ts`.
- **B5 — PRM.** One static contour-map frame, parked.

---

## 4. DOT-MATRIX — the precise TARGET (C4)

### 4.1 What it SHOULD look like (the gestalt)

A 2D-SPACE field of fine warm-cream dots filling the background plane (NOT a 3D sphere floating in a card) — an even, calm dot-lattice that reads as a living background texture. The cursor exerts strong GRAVITY: dots near the cursor are pulled toward it (or warped around it) with WEIGHT — a heavy, inertial attraction well, like the dots are caught in a gravity dimple that lags and settles as the cursor moves (a comet-tail of slightly-displaced dots trailing the cursor's motion, easing back to lattice with spring inertia). The gravity is PERSISTENT and strong — the user says "persist MORE gravity" — so the well is deep + the settle is slow + weighty. Stop moving and the dots ease back to their lattice rest. As a background effect it suffuses the whole 2D plane behind content, subtle but alive.

### 4.2 The mechanics (the binding model — KEEP the rasterizer, RE-AIM the field)

- **2D-space register (the new default for the substrate-background use).** The dot lattice is laid in the 2D VIEW PLANE (the anchored grid `gridOrigin(index, cols, pitch)` from the dot-flow-field chassis — `research/dotmatrix-image.md` §3.1), NOT on a 3D sphere surface. The 3D dot-SPHERE STAYS as a register/preset (it is "good" per the user); the 2D-space field is the NEW background register the user asks for. (One `<DotMatrix>`, a `mode`/`layout` axis: `sphere` | `plane` — the three-dot-viz reconciliation `research/dotmatrix-image.md` already proposes.)
- **Strong cursor gravity (the headline C4).** Each dot's live position eases toward `anchor + gravityPull(cursor)` where the pull is a deep, inertial attraction well:
  ```
  toCursor = cursor − anchor
  d        = length(toCursor)
  pull     = gravityStrength · falloff(d, gravityRadius)    // STRONG + WIDE — "persist more gravity"
  target   = anchor + normalize(toCursor) · pull            // attract (or warp-around)
  // the live position eases toward target on a SPRING with INERTIA (weighty, slow settle)
  pos      = spring(pos, target, response, zeta)            // ζ < 1 → a slight overshoot/wobble as it settles
  ```
  The falloff is wider + the strength higher than today's 0.08 parallax (which is the WEAK, wrong register). The settle is a spring with INERTIA — the dots LAG the cursor and ease back with weight (the comet-tail / liquid-weight read), not an instant snap. A flick injects momentum (a transient swirl/wake over `usePointerVelocityField`, the field's accel/burst term).
- **The rasterizer is UNTOUCHED** — instanced billboard quads + the `fwidth` SDF circle (the ONE AA canon). The dots stay fine + crisp. Size/opacity may read the local gravity (a dot in the well slightly brighter/bigger — the "alive near the cursor" cue), bounded so it stays a DOT field.
- **`usePointerVelocityField`** — the ONE shared pointer source (position + velocity + accel + burst), fed `tick(delta)` from the renderer frame (no own rAF). Gravity reads position; the comet-tail/wake reads velocity; the flick reads burst. (`research/dotmatrix-image.md` §1, the shared field.)

### 4.3 The fences (binding)

1. **2D-space background register** — the dots fill the view plane as a background texture; the 3D sphere is a kept preset, not the only mode.
2. **Strong, weighty, persistent gravity** — measurably deeper + wider + slower-settling than the shipped 0.08 parallax. The well LAGS the cursor (inertia) and the dots ease back with a spring overshoot (liquid weight). NOT an instant snap.
3. **Stays a FINE DOT field** — size/opacity modulation bounded; the lattice never tessellates into a solid blob (`radius ≤ 0.5·pitch`). The dots stay crisp (`fwidth` SDF untouched).
4. **One pointer source, one loop** — `usePointerVelocityField`, fed from the renderer frame; no own rAF (the offscreen-pause discipline holds).
5. **Warm-cream identity + presets-in-consumers + NO teal/navy.**
6. **Compositor-safe, PRM → one static lattice frame (dots at rest anchors, gravity off), Safari-first, ZERO Canvas2D (instanced billboard, not a 2D context).**

### 4.4 The acceptance bar (falsifiable, both modes)

- **C1 — 2D-space field.** The dots read as a 2D-plane background lattice (the `plane` layout), not only a floating 3D sphere. (The sphere preset still passes its own bar.)
- **C2 — strong gravity.** A dot within `gravityRadius` of the cursor is displaced toward it by ≥ a named fraction of the cell pitch (deep well), measurably more than the shipped 0.08 parallax; the displacement falloff is WIDE (many dots affected). The user's "persist MORE gravity" — bigger than before.
- **C3 — weighty settle (inertia).** When the cursor moves, the dots LAG (the well trails the cursor) and ease back to lattice on a spring with a slight overshoot/wobble (ζ<1) over a perceptible settle window — NOT an instant snap. (`feedback-liquid-weight-universal`.)
- **C4 — fine field preserved.** Max dot radius ≤ 0.5·pitch; the `fwidth` SDF crispness untouched.
- **C5 — PRM.** One static lattice frame (anchors, no gravity well), parked.

---

## 5. THE NORTH STAR — the warm-cream luminous-glass identity (binding for all three)

The vizzes paint OVER / WITHIN the glass-ui surface, so their identity is the library's warm-cream luminous-glass language, never gray, never teal-on-navy:

- **The ink / dot / contour color is the warm `--foreground` identity** — OKLab hue ~62 (warm-amber family, `WARM_IDENTITY_INK { L:0.62, C:0.05, h:62 }` / `WARM_IDENTITY_PALETTE { L:0.92, C:0.03, h:78 }`), the BA.W-NO-GRAY warm-chroma floor (glass + ink is warm MATERIAL, NOT gray — a low-chroma neutral at OKLab hue 62–75 is the identity; never a hue in [180,280] teal/navy). The dark register warms in lockstep (W-DARK-MATERIAL — the luminous-dark transmissive material, the dark `--foreground` warmed to OKLab H75).
- **The ground is transparent** — the page / glass surface reads THROUGH the viz (the suffusion identity). The viz is a warm ink/dot/contour field over the warm-cream glass, not an opaque plate.
- **The motion is iOS-26/27 Liquid Glass MOTION** — not just the optical composite (backdrop blur+saturate · warm tint · edge rim · inner catch-light · drop shadow · grain) but the FEEL: real-time light-bending, things move with mass + squish + inertia + a slight overshoot. A flat fade or a linear translate reads cheap; a spring-with-overshoot + volume-preserving squish reads alive ([Apple Liquid Glass newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/); `feedback-liquid-weight-universal`). For these three vizzes the liquid-weight law binds: the paper-grid wave-front advances with inertia + the cells overshoot as they twist; the concentric contours flow + breathe with weight; the dot-matrix gravity well LAGS + the dots settle with spring overshoot. Nothing snaps; everything settles.
- **Presets-in-consumers** — the warm-cream default IS the library identity; themed palettes (topographic blues/greens, mono-white-on-near-black) live in `demo/stories/substrates/presets.ts`, never a library token. Clean break (no legacy / no teal-navy alias).

---

## 6. The shared-mechanism commitment (the user's "the SAME wave-based math")

paper-grid + concentric are ONE mechanism, two renders — the binding architectural fact the fix must honor:

| | the SHARED part (ONE `waveField` source) | the PER-VIZ part (the render) |
|---|---|---|
| **paper-grid** | traveling-wave-gated cell-warp + curl-flow twist field | `gridCoverage` (Ben Golus grid lines) |
| **concentric** | the SAME traveling-wave-gated coord deformation + `curlFBM` flow + `ω=√(g·k)` swell | `contourInk` (IQ level-set lines) over a low-octave fbm height |
| **dot-matrix** | the SAME pointer field (`usePointerVelocityField`) + (optionally) the same flow direction | instanced-billboard dots + cursor gravity well |

The shared leaf (`composables/glass/wave/waveField.{ts,glsl.ts,wgsl.ts}` per `research/wave-math-shared.md`) owns the basis-agnostic math (noise basis, dispersion, curl, the traveling-wave envelope, the cell-twist composite); each viz keeps its OWN extraction. A tuning lands ONCE; the three move together. `proof:wave-field` (JS↔GLSL↔WGSL round-trip) locks the three-way numeric identity. This is the IQ "the warp is the substitution `f(p)→f(g(p))`; `g` is shared, `f` is the viz" — extended from a smooth displacement `g` to a traveling-wave-gated cell-deformation `g`.

---

## 7. The hard fences (binding for all three, recorded)

1. **NO legacy / clean break** — the paper-grid LINE-warp and the concentric radial-sinusoid field are OVERTURNED (no alias, no back-compat mode). The dot-matrix sphere SURVIVES as a kept preset (it is "good") but the default register for the background use is the 2D plane.
2. **Idiomatic + gestalt** — the re-spec is a MECHANICS redesign (the deformation-gradient model, the level-set field, the gravity well), not a parameter-tweak bug-fix. Hit the gestalt the verbatim describes.
3. **GPU-only, Safari-first, ZERO Canvas2D** — WGSL primary + WebGL2 fallback, the SAME fragment/instanced math, parity `verified` (ΔE mean≤2.0/p99≤5.0). `fwidth`/`dpdx`/`dpdy` only (NOT `fwidthFine` — Compatibility-Mode safe on Metal/WebKit). No `backdrop-filter:url()` (the WebKit lens gap — irrelevant here, these paint own pixels). No compute / storage buffer for paper-grid + concentric (the lightest fullscreen-fragment path).
4. **Compositor-only + PRM-carved** — all warp is per-fragment / per-instance (no layout); PRM → one static frame (square grid / finished contour map / rest lattice) then park. The leaf's offscreen-pause + live-PRM freeze + demand-loop is inherited (no own rAF).
5. **Warm-cream identity + presets-in-consumers + NO teal/navy** (the `proof:viz-*` P5 floor) — the re-spec is MECHANICS + MOTION, not a new hue.
6. **Liquid-weight law** — every motion carries inertia/weight/overshoot/squish (`feedback-liquid-weight-universal`). A surface that snaps/hops/linear-moves FAILS the gestalt bar.
7. **Legibility floor** — deep ≠ smeared. The grid stays a grid (cell-pitch CV bound, twist bound ≤ ~18°); the contours stay clean nested loops (LOW-octave); the dots stay a fine field (radius ≤ 0.5·pitch). The original "blurry mess" must never recur.

---

## 8. The one-paragraph hand-off (what the fix-agents build)

**paper-grid:** re-aim the warp from a uniform domain displacement (`g=uv+h`, lines bow) to a TRAVELING-WAVE-GATED CELL-LOCAL deformation (each grid box rotates/shears about its own center by an angle gated by a moving wave-front, driven by the shared `curlFBM` flow scalar) — the cells twist/morph as a wave passes through, the lines stay locally straight + crisp (Golus AA untouched), the rest state is a SQUARE grid. **concentric:** overturn the field from perfect radial sinusoids to the LEVEL-SET contours of a low-octave curl-warped fbm topography, keep the `contourInk` extraction, share the SAME traveling-wave cell-warp + flow as paper-grid (concentric = the paper grid with level-set contours), color by height (basins cool, ridges warm). **dot-matrix:** keep the dot rasterizer + the sphere as a preset, add a 2D-PLANE background register with a STRONG, WEIGHTY, PERSISTENT cursor-gravity well (dots pulled toward the cursor with a deep wide falloff, lagging + settling on a spring with overshoot — liquid weight), over the shared `usePointerVelocityField`. All three: warm-cream identity, transparent ground, compositor-only fragment/instanced math, PRM-carved, Safari-first WGSL-primary/WebGL2-fallback, ZERO Canvas2D, the shared `waveField` source for the two field viz.
