# PaperGrid — Lens A (PURE iOS-27 FIDELITY): the LIT RIPPLING SHEET

> Greenfield brainstorm, lens (a) pure-ios27-fidelity. The bar: the CELLS warp — the quad
> FACES inflate/shear/displace in a coherent TRAVELING WAVE (a sheet of paper rippling),
> NOT a wireframe wobble. Judged LIVE (`/substrates/paper-grid`, Chrome, painted-pixel +
> screenshot). Every cited symbol grepped against HEAD before citing. Vivid lift is a DEMO
> preset; the `src/` identity stays byte-frozen (presets-in-consumers). This is tranche-DEV
> ONLY — a design doc, no code lands.

---

## 0. LIVE-INTERROGATION (what HEAD actually paints — default-to-broken, painted-pixel)

I navigated `/substrates/paper-grid` (Chrome, :5173), screenshotted both the calm rest frame
and a mid-wave frame, climbed the DOM bg-chain, and sampled the field behind the canvas. The
findings (all source-verified against HEAD, NOT the stale wave doc):

**The wave doc `BD.W-PAPERGRID-WARP.md` is STALE.** It specs a two-octave `curlWarp` LINE-warp
and proposes adding a third octave. But HEAD has ALREADY been respec'd past it
(`paperGrid.ts:113-116` — "§3/§4 RETIRED — the LINE-warp `curlWarp` + the radial `cursorBulge`
are GONE (clean break … BD.W-VIZ-RESPEC). The 'liquid' is now the per-cell TWIST (`cellTwist`)
+ the cursor SWIRL (`cursorSwirl`)"). So `cellTwist` (`waveField.ts:106`, transcribed at
`paper-grid.wgsl.ts:165`) ALREADY rotates + shears each cell about its OWN center, gated by a
traveling Gaussian crest (`travelingEnvelope` `:53`) directed by the shared `curlFBM`. **The
headline "warp CELLS not lines" is PARTIALLY BUILT in geometry — and it is the right spine.**

**But the GESTALT still fails the bar — three live defects:**

1. **It reads as a warped WIREFRAME, not lit cell FACES (the headline miss).** The cells DO
   twist (the live mid-wave frame shows center-left cells visibly rotated/sheared about their
   centers — the geometry is genuine). BUT the shader paints `vec4f(col * a, a)`
   (`paper-grid.wgsl.ts:195`) — a FLAT premultiplied LINE-coverage ink, zero face fill, zero
   shading, zero light response. So a twisted cell is just a twisted *outline*. The eye reads a
   wobbling wireframe, not a sheet of paper rippling. **The "paper SHEET" — a surface with a
   normal that catches light as it folds — is entirely absent.** A rippling sheet needs the
   FACE to brighten on the crest-facing slope and fall into shadow on the trough; the current
   viz has no face and no normal.

2. **GRAY-TAUPE, not vivid/warm — the §3 flat-field defect, live-confirmed.** The bg-chain from
   the canvas is fully transparent down to `.configurator.glass-floating` at
   `oklab(0.793 0.0052 0.0117 / 0.84)` → **chroma ≈ 0.0128, below the §3 0.045 floor** — a
   gray-cream glass over NOTHING. `bodyBg: rgba(0,0,0,0)`, `auroraEl: false`, one canvas. The
   ink resolves to the warm `--foreground` family but at ≈12% alpha over a flat gray plate the
   read is a gray graph-paper plate. No colorful field, no defined edge. (Matches the SYSTEMIC
   finding — 8 vizzes now confirm the pages are FLAT.)

3. **The traveling wave is present but reads as local line-jitter, not a weighty coherent
   front.** The crest sweeps (`travelingEnvelope` along `waveDir`), but with no face-shading the
   sweep is invisible *as a wave* — you cannot see "a crest passing OVER and THROUGH the sheet"
   because nothing lights up as it passes. The inertia (`getAmp` overshoot ease, `usePaperGrid.ts:101`)
   is real but imperceptible without a face that catches the crest.

**Source-verified leverage already on disk (the fit spine — KEEP):** `cellTwist` (the cell
geometry, `waveField.ts:106`), `travelingEnvelope` (the moving Gaussian crest, `:53`),
`curlScalar`/`curlFBM` (the shared coherent director — adjacent cells lean together, `:76`/
`paperGrid.ts:104`), the Ben Golus derivative-AA `gridCoverage` (`paperGrid.ts:153` — crisp at
any DPR), the WGPU-primary + WebGL2-GLSL twin (`paper-grid.{wgsl,glsl}.ts`), the substrate
lifecycle (`usePaperGrid.ts` — pause/PRM/wake/park), the pointer field (`usePointerVelocityField`),
the spring-eased amp inertia (`:101`). **AND — critically — `heightField` (`waveField.ts:205`)
and `waveSwell` (`:234`) and `cellWarpBeforeHeight` (`:245`) ALREADY EXIST in the shared leaf
but are NOT consumed by the paper-grid shader.** A scalar height field for the sheet is sitting
unused. This is the single biggest under-exploited asset.

---

## 1. THE CORE IDEA — the LIT RIPPLING SHEET (the face IS the wave)

> **The cells must read as FACES of a single sheet of paper rippling in a traveling wave —
> each quad inflates toward the light on the crest-facing slope, shears as it folds, and falls
> into warm shadow in the trough. The grid LINES become the creases of that sheet; the FACES
> become the wave.**

The status-quo twists the cell GEOMETRY but renders only the line OUTLINE. Lens A's gestalt
move: **render the cell FACE, lit by the slope of a real height field, so the twist + the
traveling crest become a VISIBLE rippling surface.** Three composing layers, all on the KEPT
fragment, all reading the SHARED `waveField` leaf:

### 1a. The HEIGHT-SHEET (the missing face — consume the already-shipped `heightField`)

The paper-grid shader gains a per-pixel SHEET HEIGHT `H(g,t)` read from the EXISTING
`heightField` (`waveField.ts:205`, already transcribed-ready) **modulated by the traveling
crest envelope** — so the sheet rises into a ridge where the wave is and lies flat ahead/behind.
`H` is the SAME low-octave curl-coherent field that directs `cellTwist` (one basis — the crest
that twists a cell is the crest that lifts it; the twist and the lift are the SAME wave, never
two un-coupled motions). The wave doc's "+1 octave" idea is FOLDED here: the height field's
fine detail IS the extra octave, but spent on a SURFACE (the sheet's tooth) not on more
line-bending (which the live read proved smears illegibly).

### 1b. The SLOPE-SHADE (the face catches the light — the rippling read)

From `H` we take the analytic gradient `∇H` (central-difference in the fragment, the same
`CURL_EPS` idiom already in `paperGrid.ts:39`) → a 2D slope → a cheap **Lambert-ish face shade**:
`shade = 0.5 + dot(normalize(vec3(-∇H, k)), L) * 0.5` against a FIXED warm key-light direction
`L` (upper-right, matching the cartoon-shadow register's fixed cel light, design.md §Shadows).
The crest-facing slope brightens (a warm highlight), the trough-facing slope darkens (a warm
umber shadow). **This is the entire rippling-sheet illusion** — the FACE now reads as a surface
folding under a moving crest. The fill is a low-alpha warm wash (the paper tint) modulated by
`shade`, composited UNDER the crisp Golus lines (the lines stay the creases). The face wash is
gated by a SUBTLE global alpha so the default still reads as graph-paper-over-page, not an opaque
card (the suffusion identity holds).

### 1c. The CREASE-LINES (the KEPT Golus grid — now the paper's fold-lines)

The existing two-tier Golus `gridCoverage` (minor + major) is UNTOUCHED — it already reads the
final twisted+swirled coordinate, so the creases bend WITH the sheet. Over the lit face they now
read as the fold-lines of rippling paper, not a free-floating wireframe. The major rule carries
the sheet silhouette; the minor the tooth.

**Net:** geometry (cellTwist, KEPT) × height (heightField, NEWLY CONSUMED) × slope-shade (NEW,
~8 shader lines) × creases (Golus, KEPT) = a sheet of warm paper that visibly RIPPLES as a
traveling crest sweeps OVER and THROUGH it. The twist you already built becomes VISIBLE because
the face now lives.

---

## 2. THE TRAVELING WAVE — alive, weighty, beautiful (the liquid-weight law)

The wave must read as ONE coherent front with inertia, not a global pulse or per-cell noise.
Mechanisms (all reading the SHARED leaf so paper-grid + concentric move together):

- **The coherent front.** `travelingEnvelope` (`:53`) ALREADY gives a moving Gaussian crest band
  along `waveDir`. KEEP. The height-lift (1a) + slope-shade (1b) are gated by THIS envelope, so
  the crest is now a VISIBLE raised, lit ridge sweeping the sheet — the literal "wave passing,
  not a global pulse" the constants comment already promises (`constants.ts:88`).
- **Weight / inertia (liquid-weight universal).** The spring-eased `getAmp` overshoot
  (`usePaperGrid.ts:101-104`) drives the envelope amplitude with a soft overshoot-then-settle —
  KEEP, but now perceptible (the face lift makes the inertia visible). ADD: the crest's leading
  edge leads its trailing edge a hair via a velocity-coupled `--motion-weight` read (the Band-0
  motion token, ALREADY booked by `BD.W-MOTION-WEIGHT`) so the sheet "anticipates" the front
  (cartoon anticipation) and the trough "follows through" behind it. NEVER tight/springy — a
  slow, weighty ω (the shipped `waveOmega: 1.05` is already calm).
- **Morph-MORE-on-move (cursor-reactive).** `cursorSwirl` (`waveField.ts:147`) ALREADY twists
  cells about the pointer (a finger pressed into the liquid). EXTEND in the same spot: the
  cursor ALSO locally LIFTS the height field (a Gaussian bump in `H` about the cursor, sharing
  the swirl's radius) so a finger-press visibly DENTS/INFLATES the sheet (the face shade reveals
  it). The velocity-lead + burst-ripple already derived in `usePaperGrid.ts:120-133` feed a
  transient secondary crest (a flick sends a small ripple across the sheet — overlapping action,
  follow-through). PRM → `amp=0`, one flat static frame (the substrate freeze, `:98-99`).
- **Beauty / arcs.** The crest follows the curl-flow direction (`curlScalar`), so the front is
  not a straight bar — it curves and braids with the flow (arcs, the natural-variation read).

---

## 3. VIVID / WARM — over a COLORFUL FIELD (§3), NO teal/navy (the binding purge)

The live read is GRAY because (a) the page behind is FLAT (chroma 0.0128 « 0.045 floor) and
(b) the ink/face is a single near-monochrome warm wash. Both fixed WITHOUT touching the `src/`
identity:

- **The colorful field behind (§3 — route into the SHARED `BD.W-PAGE-BACKGROUND` warm-mesh).**
  The DELTA-ASSAY routes the warm-ground fix into the SHARED `BD.W-PAGE-BACKGROUND` warm-mesh
  recipe — the SAME shared warm-mesh the dot-matrix / fourier-field / concentric amendments
  already route to — **NOT a new sibling, NOT `auroraFallbackGround`** (which is aurora's static
  blue-cyan raster — a teal-navy-purge VIOLATION and contradicts "warm drift"). The paper-grid
  stage gets the warm divergent mesh behind the transmissive grid → the lit sheet sits over a
  warm field with a defined edge (the §3 cure).
- **Vivid lift — a DEMO preset, the `src/` identity BYTE-FROZEN (presets-in-consumers).** The
  `src/` default keeps `WARM_IDENTITY_INK {L:0.62,C:0.05,h:62}` + `fieldAlpha:1`/suffusion-0.12
  byte-untouched (the warm-cream identity, the teal-navy P5 fence stays green). The vividness is
  a NEW DEMO preset `PAPER_GRID_PRESET_RIPPLE` in `demo/stories/substrates/presets.ts` (the
  sanctioned home, alongside the existing WARM/SUFFUSE/BOLD): a warm-DIVERGENT face palette
  (deep-rose-umber trough → ember → amber → warm-wheat crest highlight, hues ∈ [20,90] wrapping
  through warm red, NEVER [180,270]) so the rippling sheet reads as a vivid warm-paper surface
  catching warm light — cartoon-technicolor, not a gray plate. The slope-shade (1b) maps the
  trough→crest face brightness across this warm-divergent ramp.
- **NO teal/navy (the BINDING purge).** Every face/ink/highlight hue ∈ [20,90]. `proof:teal-navy-purge`
  (hue ∈ [180,270] reds) holds by construction; the demo preset adds a census bite. The face
  shade is a LUMINANCE-and-warm-chroma modulation, never a hue-shift into the cool band.

---

## 4. CROSS-ENGINE (WGSL/GLSL twin parity) + a11y/PRM + perf

- **The twin parity is NUMERIC, not name-presence.** The NEW height-consume + slope-shade are
  ~10 lines of pure math added to the SHARED `waveField.{ts,glsl,wgsl}` leaf (so JS oracle +
  WGSL + GLSL stay one source — the `flow.{glsl,wgsl}` precedent the leaf already follows) and
  spliced identically into `paper-grid.{wgsl,glsl}.ts`. The JS round-trip anchor `samplePaperGrid`
  (`paperGrid.ts:220`) extends to return the face-shade too, so the parity closes against the
  REAL numeric net (the W-WAVE-FIELD-HARNESS `shader-eval-harness.assertParity`, NOT the
  name-presence `proof:viz-papergrid` P3 the stale wave doc rides). A sign-flipped `∇H` / a
  `2.02→2.0` lacunarity in one backend → ΔE > bar → RED.
- **No `backdrop-filter:url`, compositor-only.** This is a fullscreen fragment shader on a canvas
  — no goo filter, no backdrop-filter. The §L7 cross-engine arm is the WGSL/GLSL twin itself
  (WebGPU primary + WebGL2 fallback, BOTH on the shipped substrate). The face-shade is plain
  per-pixel math (no derivative-dependent texture read), Safari WebGL2-safe; `∇H` is
  central-difference (explicit, no `dFdx` on the height — only the Golus AA uses `dFdx`, which
  already works on both backends). The paired-engine π (Chromium AND WebKit, the design.md §L7
  acceptance bar) captures the lit ripple on both.
- **a11y / PRM carve.** PRM → `amp=0` → the envelope collapses → the height-lift + slope-shade
  evaporate → ONE flat static lit-square-grid frame (the substrate freeze, inherited
  `usePaperGrid.ts:98`). The WCAG-2.2.2 pause seam (`DockBackgroundToggle`) parks the loop.
  `prefers-reduced-transparency` → the face wash floors toward the warm-cream solid (legible),
  the lines stay crisp. The grid remains a legible grid throughout (the height-lift is a SHADE,
  not a geometry smear — it does NOT move the Golus crossings, so the cell-pitch CV the stale
  wave doc frets about is UNTOUCHED; legibility is preserved BY CONSTRUCTION because the wave is
  now expressed in LIGHT, not in more line-bending).
- **Perf.** ~10 added ALU ops per pixel (one height eval reusing the curl basis already computed
  for the twist + one gradient + one dot). No new texture reads, no new pass. The
  parked-when-hidden + offscreen-pause + DPR budget (`resolveBudgetDpr`) are inherited. 60fps on
  both backends; the height eval SHARES the curl-noise samples already taken for `cellTwist` (no
  doubled noise cost).

---

## 5. HOW IT COMPOSES THE EXISTING ECOSYSTEM (DEFT, KISS, DRY — a UNION not a fork)

| Asset (grepped, exists at HEAD) | Role in lens A | Change |
|---|---|---|
| `cellTwist` `waveField.ts:106` | cell geometry (twist+shear about own center) | **KEEP byte-frozen** |
| `travelingEnvelope` `:53` | the moving Gaussian crest | **KEEP** — now gates the height-lift+shade too |
| `heightField` `:205` (UNUSED by paper-grid) | the sheet height `H` | **NEWLY CONSUMED** (the missing face) |
| `waveSwell` `:234` / `cellWarpBeforeHeight` `:245` | already-present height helpers | candidate reuse for the lift register |
| `curlScalar`/`curlFBM` | the coherent flow director (shared basis) | **KEEP** — height + twist share it |
| `gridCoverage` (Golus AA) `paperGrid.ts:153` | crisp crease-lines at any DPR | **KEEP byte-frozen** |
| `cursorSwirl` `:147` | finger-twist | **KEEP** + extend with a local height-bump (same radius) |
| `samplePaperGrid` `:220` | JS round-trip oracle | EXTEND to return face-shade (parity) |
| `usePaperGrid` amp-overshoot `:101` | liquid-weight inertia | **KEEP** — now perceptible via the face |
| WGPU/GLSL twin + substrate + pointer field | render + lifecycle + a11y | **KEEP** |
| `BD.W-PAGE-BACKGROUND` warm-mesh | the §3 colorful field | **ROUTE INTO** (shared, not a sibling) |
| `demo/.../presets.ts` WARM/SUFFUSE/BOLD | named themes | ADD `PAPER_GRID_PRESET_RIPPLE` (vivid, demo-only) |

**No new component, no new pass, no second basis, no fork.** The entire move is: consume the
already-shipped height field + add ~10 lines of warm slope-shade to the SHARED leaf + a vivid
DEMO preset + the §3 warm field behind. The wave-amendment EXTENDS `BD.W-PAPERGRID-WARP` (its
stale "+1 line-octave" framing → "consume the height field + face-shade the rippling sheet"),
reconciles vs concentric (which gets `waveFlow`/`heightField` for CONTOURS — orthogonal render,
same leaf, no dup), and routes §3 into `BD.W-PAGE-BACKGROUND` (no `BD.W-VIZ-WARM-FIELD` sibling).

---

## 6. THE GATE (painted-pixel, born-RED, BOTH modes + webkit — NOT a geometric proxy)

The bar is the RIPPLING-SHEET read, judged on PAINTED PIXELS (prior goldens built geometric-proxy
gates that false-passed). Born-RED on HEAD by construction:

- **G1 — the cells read as LIT FACES (not a wireframe).** A painted-pixel readback over the
  crest band measures a face-shade luminance GRADIENT across the cell interiors (crest-facing
  bright → trough-facing dark), ΔL ≥ a measured floor. HEAD reds (face fill is zero —
  `vec4f(col*a,a)`, no interior shade). The readback reads the DRAWN context after ≥2 rAF over a
  preserved buffer (the non-cleared-buffer precondition — a black readback FAILS LOUD, per the
  concentric lesson; the live WebGL2 zero-readback I hit is the exact gotcha to guard).
- **G2 — the wave is a coherent TRAVELING front.** Over N frames the bright-face band TRANSLATES
  along `waveDir` (a cross-correlation peak shift), not a stationary twinkle. HEAD reds (no lit
  band exists to translate).
- **G3 — vivid + warm, NO teal/navy, over a colorful field.** The face-palette mean chroma ≥ 0.045
  (§3 floor), warmHueFrac ≥ 0.85 (hue ∈ [20,90]), zero pixels in [180,270]; the stage field
  behind measures chroma ≥ 0.045 (the §3 colorful-field cure). HEAD reds (plate 0.0128, flat).
- **G4 — the twin parity is NUMERIC.** `samplePaperGrid` (incl. the new face-shade) round-trips
  JS↔WGSL↔GLSL ≈0 at the calibrated bar via the harness (not a `/heightField/.test()` name-presence).
- **G5 — legibility + PRM.** The grid still reads as a grid (the Golus crossings unmoved by the
  height-lift — a SHADE not a smear); PRM seats ONE flat static lit frame. BOTH modes + the
  webkit project.

Self-test bites: a flat-fill face (no slope-shade) → G1 RED; a stationary pulse → G2 RED; a cool
[180,270] highlight → G3 RED; a sign-flipped `∇H` in one backend → G4 RED; a height-lift that
moves the Golus crossings (smears the grid) → G5 RED.

---

## 7. CONVERGENCE (lens A self-assessment): ~70%

Geometry spine FIT + already-shipped (cellTwist + traveling crest — the "warp CELLS not lines"
is built in geometry). The genuine NET-NEW is the FACE: consume the unused `heightField` + a warm
slope-shade so the twist becomes a VISIBLE lit ripple, + the §3 warm field behind, + the vivid
demo preset. Remaining risk = build-time: the slope-shade calibration (a real painted ΔL, not a
proxy), the warm-divergent face palette clearing chroma/warmHueFrac, the WebKit paired capture,
and confirming the height-lift does NOT move the Golus crossings (legibility BY CONSTRUCTION).
