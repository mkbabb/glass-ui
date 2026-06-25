# Concentric — Greenfield Lens A: the **living topographic survey** (level-set / gradient-topology)

> iOS-27 Liquid-Glass fidelity lens. Greenfield from first principles; SOURCE-VERIFIED against HEAD
> (live-inspected `/substrates/concentric`, both modes, WebGPU primary + WebGL2 twin read).

---

## 0. SOURCE-VERIFY — what is REAL vs SPEC'd (grep + live, before one design word)

The prompt warns the prior goldens invented levers, smuggled magic constants, claimed phantom waves.
So every claim below is grep-confirmed at HEAD or live-confirmed in Chrome. The headline finding:

**The level-set engine is ALREADY SHIPPED and REAL — it is NOT naive concentric circles, and the
ring engine is already RETIRED (clean break). The two governing wave docs are STALE relative to the
code, and the gate is RED against the live tree.** This is the central DELTA-ASSAY result.

### 0.1 What is REAL (verified live + grep)

- **True level-set topography, not circles.** `src/.../shaders/concentric.wgsl.ts:120 sampleHeight` +
  `concentric.glsl.ts:101` evaluate `H(p,t)` = a low-octave value-noise terrain (`heightField` over
  `valueNoise`, 3 octaves) warped by the SHARED `waveFlow` cell-warp + cursor swirl + ω=√(gk)
  `waveSwell`, then draw its iso-contours with the IQ gradient-free `contourInk`
  (`fN = H·levels + perturb`, `band = |fract(fN+.5)−.5|`, `de = band/fwidth(fN)`). **Live render
  (dark mode) shows genuine irregular nested loops that bend / merge / split like a real topo map —
  CONFIRMED, not ellipses.**
- **The shared basis is real and elegant.** `src/composables/glass/wave/waveField.ts` owns
  `travelingEnvelope` / `curlScalar` / `cellTwist` / `waveFlow` / `cursorSwirl` / `heightField` /
  `waveSwell`, transcribed line-for-line into `waveField.glsl.ts` + `waveField.wgsl.ts`. The curl is
  the SHARED `curlFBM` / `CURL_FBM_{WGSL,GLSL}` from `flow.*` — **NO second noise basis, NO re-fork.**
  This IS the paper-grid kinship the user asked for ("function as essentially the paper grid").
- **levelField.ts is real** (`composables/levelField.ts:93 sampleHeight`) — the JS oracle twin,
  imports `waveFlow / cursorSwirl / heightField / waveSwell` from the shared leaf + `curlFBM` from
  paper-grid. It is the single-math-source the two shaders transcribe.
- **The cursor well is real + weighted.** `useConcentric.ts:116 onFrame` feeds the shared
  `usePointerVelocityField` (no second rAF), spring-eases the wave `amp` to 1.06 with overshoot +
  0.85 relax (liquid-weight inertia), leads the well by `vel·0.1` (gravity trails the cursor).
- **No teal/navy in the library.** `grep` finds NO `h∈[180,270]` in `src/.../concentric/`;
  `WARM_IDENTITY_PALETTE` is h=80/62/44 (cream→amber→ember). `node proof-teal-navy-purge.mjs` = GREEN.
  The teal-on-navy (`h:250/255`) lives ONLY in `demo/.../presets.ts CONCENTRIC_PRESET_THEME`
  (presets-in-consumers — correct).

### 0.2 What is STALE / BROKEN (the DELTA the build must fix)

1. **`BD.W-CONCENTRIC-LEVELSET.md` is STALE.** It specs an OPT-IN `field: "rings" | "levelset"` axis
   that *preserves a default ring engine* and asserts `sampleRingField` is byte-untouched. **The code
   went FURTHER — it RETIRED the ring engine entirely (clean break, no `field` axis, level-set is the
   sole path).** Per [no-backwards-compat]: the code is RIGHT, the doc is the laggard. The amendment
   re-states the wave to match HEAD (no `rings` mode, no `field` axis).
2. **`scripts/proof-concentric.mjs` is FULLY RED against the live tree** — it asserts the retired ring
   engine: `buildRingFamily`, `buildRingLadder`, `axisRatio`, `rotAlpha`, `RingCenter`,
   `ellipsoidalRadiusRot`, `ringIsolineInk`, `ringField.ts` — **grep confirms 0 of these exist in
   live `src/`.** `node scripts/proof-concentric.mjs` reds on ~25 clauses. **This is a false-FAIL gate
   that no longer guards the real surface — exactly the gate-drift class the hardening plan names.**
   The amendment REWRITES the gate against the level-set surface (clauses below).
3. **The page-header + composable docstrings are STALE.** `demo/.../concentric.vue`'s `StoryHero`
   copy + `useConcentric.ts:64` docstring still say "radial Fourier ring-interference field /
   concentric ellipsoid rings / the ONE math source `ringField.ts`." Live screenshot shows the wrong
   prose over the right viz. Cosmetic but load-bearing for honesty.
4. **§3 FLAT-GROUND, live-confirmed.** The canvas wrapper bg is `rgba(0,0,0,0)` (transparent), bodyBg
   transparent — the contours float over the **bare cream page**. **In LIGHT mode the topography is
   near-invisible** (faint amber-on-cream, contrast far below legible); only dark mode reads well.
   This is the systemic §3 finding (7 vizzes confirm pages are FLAT). The fix routes into the SHARED
   `BD.W-PAGE-BACKGROUND` warm-mesh (verified real: `manifest.ts CATEGORY_DEFAULT_BG`, the substrates
   band already lives on a live field) — **NOT a new sibling, NOT `auroraFallbackGround`.**
5. **The contours are MONOCHROME.** One warm-amber ramp keyed only to height `tone`. No per-level
   distinctness (the topographic-map "every Nth line bolder", the per-band hue lift). The
   `levelJitter(round(F·N))` the wave doc promised is **NOT in the live shader** (`grep levelJitter`
   = 0 hits). Real gap, real lever.

So the build is NOT a rebuild — it is **survival-of-the-fittest refinement**: the engine + the shared
leaf + the IQ extraction + the cursor physics are FIT and KEPT byte-untouched; the gate, the docs, the
ground, the per-level read, and the light-mode legibility are WEAK/BROKEN and get fixed.

---

## 1. The lens — concentric is a **living topographic survey under glass**

The iOS-27 register for "concentric" is not the iPod click-wheel; it is a **USGS-survey contour map
that is ALIVE** — a topographic sheet whose iso-lines breathe, drift, and bunch on steep ground,
rendered as warm-cream paper under transmissive glass. The user's verbatim spec ("paper-grid +
level-set / gradient-topology contours, a living topographic map that warps like the paper-grid
traveling wave") is EXACTLY the shipped mechanism. The gestalt bar is therefore not "build the
engine" (it exists) but **"make it READ as a living survey in BOTH modes, vivid + warm, over a
colorful field, with per-level distinctness and real weight."**

Three felt qualities, all already half-present, that the refinement completes:

- **The contour density tracks 1/|∇H| (steep = bunched).** Already automatic via `contourInk`'s
  `fwidth(fN)` — the math gives it for free. KEEP.
- **The whole sheet flows like the paper-grid wave.** Already via `waveFlow` (continuous, seamless
  twin of `cellTwist`). KEEP. The kinship the user named three times is real.
- **The survey is PRINTED, not glowing.** This is the iOS-27 paper-morphism register: the contours
  must read as ink on warm paper (light mode) and as fine luminous etch on deep warm slate (dark
  mode) — over a COLORFUL field, never a flat plate.

---

## 2. The boldest move — **the index-contour hierarchy + per-band hue lift** (the survey reads as a map, not a wash)

The single boldest, most legible move — the one that converts "faint contour soup" into "a living
USGS survey you can read" — is the **topographic index-contour hierarchy**: real survey maps draw
every 5th line BOLD (the *index contour*) with thin *intermediate* lines between, and the index lines
carry the elevation read. This is one cheap, stateless GPU function of the level index, composes the
existing `contourInk` byte-untouched, and instantly gives the map structure + a vivid per-band read.

```
// pure f(level) — NO buffer, NO accumulation, NO second color seam (composes samplePaletteLin)
let lvl      = floor(fN);                 // the integer iso-level we're nearest
let isIndex  = fract(lvl / 5.0) < 0.5;    // every 5th line is an INDEX contour
let width    = u.line.x * select(1.0, 1.9, isIndex);     // index lines ~2× thick
let ink      = contourInk(fN, width);     // KEPT operator, fed a per-level width
// per-band hue LIFT — adjacent bands read distinct (the technicolor punch + topo legibility)
let band     = fract(lvl * 0.61803);      // golden-ratio hash → maximally-spread band index
let hueLift  = (band - 0.5) * u.line.w;   // ±small OKLCh hue rotation around the warm identity
let tone     = clamp(0.5 + H * u.norm.x + hueLift, 0.0, 1.0);   // band-distinct warm ramp sample
```

Why this is THE move:
- **It is the difference between "a viz" and "a MAP."** Index contours are *the* visual grammar that
  makes a topo map legible at a glance — without them, 13 equal-weight lines read as noise (the
  current light-mode failure). With them, the eye locks onto the bold index rings and reads the basins.
- **Golden-ratio band spread = Aristotelian proportion in the literal hue assignment** — `0.61803`
  guarantees adjacent bands get maximally-separated hue lifts (no two neighbors collide), the √φ
  edict expressed in the field itself, not just the type.
- **It is the `levelJitter` the stale wave doc promised — but BETTER**: a *structured* hierarchy
  (index/intermediate) instead of a random per-level jitter, so it reads as cartography, not dither.
  Pure `f(level)`, stateless, composes the kept color seam — passes the wave's L3 fence by design.
- **Cross-engine trivial**: `fract`, `floor`, `select`/`mix` — identical in WGSL + GLSL, closes the
  numeric round-trip with zero new transcription risk.

---

## 3. The visual + motion + interaction spec

### 3.1 Light mode — **ink on warm survey paper** (the §3 + legibility fix)

- **Over a COLORFUL field, not the bare page.** Route the warm-ground into the SHARED
  `BD.W-PAGE-BACKGROUND` — the substrates band already stages a live field; concentric's transparent
  ground reads through it. The contours sit on a warm-cream→peach mesh, not flat `rgb(251,248,244)`.
  This is THE §3 systemic fix — **no sibling ground, no `auroraFallbackGround`.**
- **Legibility lift (the live light-mode defect).** The contour ink in light mode must DARKEN, not
  lighten — the survey is brown/sepia ink (a deeper ember, h≈40 L≈0.42) on cream, so the lines read
  against the warm ground. The fix is a per-mode ink ramp: light mode strokes pull toward the ember
  CREST stop (dark ink); dark mode strokes pull toward the cream TROUGH stop (luminous etch). This is
  a `light-dark()`-free per-mode arm (plain `.dark` ancestor selector or a mode uniform) per
  [lightdark-inset-shadow] discipline — the mode is a uniform `u.line` lane, the shader picks the ink
  end of the ramp, no CSS `light-dark()` inside the composite.
- **Index contours bold** (§2) give the read; intermediate lines stay hairline.

### 3.2 Dark mode — **luminous etch on deep warm slate**

- Already the stronger mode live. KEEP the warm-amber luminous read; add the index hierarchy so the
  bold rings glow a touch brighter (the survey-at-night register). Deep warm slate ground (NEVER gray
  — the BA.W-NO-GRAY warm floor), contours as fine warm light.

### 3.3 Motion — the living survey (all KEPT, all liquid-weight)

- **The traveling wave flows the whole sheet** (`waveFlow` + `travelingEnvelope`) — contours bend,
  twist, merge as the Gaussian crest sweeps. KEEP byte-untouched.
- **Basins breathe on the ω=√(gk) swell** (`waveSwell`, `swellAmp 0.22`) — the topography inflates/
  deflates with real weight. KEEP.
- **Spring-eased envelope `amp`** ramps 0→1.06 with 0.85 overshoot-relax on mount (liquid-weight
  ease-in). KEEP. This IS the [liquid-weight-universal] inertia.
- **Per-contour wobble** (`perturbAmp 0.06`, the `sin(floor(H·levels)·2.4 + t·0.7)` term) — contours
  wobble independently. KEEP; the index hierarchy rides on top.

### 3.4 Interaction — the gravity well (KEPT, deepened by index read)

- Cursor bulges the topography toward the pointer (`cursorWell 0.5` Gaussian peak + `cursorSwirl`
  twist), velocity-led by `0.1` so the well trails the cursor (liquid weight). KEEP byte-untouched.
- The deepened read: as the cursor lifts the terrain, the **index contours visibly pack around the
  well** (1/|∇H| bunching is automatic) — the gravity reads as a real elevation bulge on the survey,
  not an abstract warp. No new mechanism; the index hierarchy makes the existing well legible.

---

## 4. The precise mechanism — a REFINEMENT, not a rebuild (survival of the fittest)

| layer | disposition | exact change |
|---|---|---|
| `waveField.ts` + `.glsl/.wgsl` shared leaf | **KEEP byte-untouched** | the traveling-wave / cell-warp / height / swell / swirl basis is FIT. Zero edits. The kinship holds. |
| `levelField.ts` (JS oracle) | **KEEP** | the single-math-source twin. Untouched. |
| `contourInk` IQ operator | **KEEP byte-frozen** | the gradient-free level-set extraction is the #1 fence — only the per-level *width* it is fed changes (a parameter, not a re-derivation). |
| `sampleHeight` (both shaders) | **KEEP** | the field source is correct. Untouched. |
| `fs_main` per-level read (both shaders) | **REFINE** | add the index-contour hierarchy + golden-ratio per-band hue lift (§2) — pure `f(level)`, ~6 lines, identical WGSL/GLSL. |
| ink ramp (both shaders) | **REFINE** | per-mode ink end (light = ember/dark-ink, dark = cream/luminous) via a `u.line` mode lane — the light-mode legibility fix. |
| `constants.ts` | **REFINE** | add `indexEvery` (5), `indexWeight` (1.9), `bandHueLift` (small) tunables to `ConcentricConfig` + defaults; keep `WARM_IDENTITY_PALETTE`. |
| `uniformBridgeWGPU.ts` + GL uniform pack | **REFINE** | pack the new tunables into the existing `u.line`/`u.norm` spare lanes (`.w` lanes are `_pad` today — verified). No new bind group. |
| ground (§3) | **ROUTE to shared** | `BD.W-PAGE-BACKGROUND` warm-mesh; concentric stays transparent-ground. No sibling. |
| `proof-concentric.mjs` | **REWRITE** | the stale ring-engine gate → the level-set gate (§5). |
| `BD.W-CONCENTRIC-LEVELSET.md` | **AMEND** | re-state to match HEAD (ring engine RETIRED, no `field` axis, no `rings` mode). |
| stale docstrings + StoryHero copy | **FIX** | "ring-interference" → "level-set topographic survey." |

**No new composable. No new shader file. No re-fork. No second noise basis. No `field` axis.** The
boldest move is ~6 shader lines + 3 tunables riding spare uniform lanes. KISS / DRY honored.

### 4.1 Cross-engine (Chrome WGSL + Safari WebGL2 GLSL)

The two shaders are line-for-line twins today (verified — same `sampleHeight`, same `contourInk`,
same `samplePaletteLin`). The index hierarchy + hue lift use only `floor`/`fract`/`select`(WGSL)↔
`mix`/`step`(GLSL) — primitives with identical semantics. The numeric round-trip closes against the
REAL `shader-eval-harness` net (NOT name-presence) — the §5 gate samples `fN`, `lvl`, `isIndex`,
`tone` at a fixed `(p,t)` lattice and asserts JS-oracle ↔ WGSL ↔ GLSL ΔE ≈ 0 (a sign-flipped band hash
or a `0.61803→0.618` drift in one backend reds). Per [live-pi-oklab-paint-arm]: the live-π arm parses
`oklab()` from getComputedStyle and separates the warm ink by L (not chroma); run live-π per mode.

### 4.2 a11y / PRM carve

- `respectReducedMotion: true` (kept): under `prefers-reduced-motion: reduce`, `onFrame` snaps
  `amp = 0` → ONE static survey frame, then park (the substrate-PRM freeze). The index hierarchy is
  STATIC-safe — it's a function of the frozen `H`, so the still frame is a legible printed map.
- WCAG 2.2.2 pause via the existing `DockBackgroundToggle` → `handle.pause()/resume()` seam (kept).
- Canvas is `pointer-events: none`; the wrapper carries the pointer listeners (kept — the gleam never
  eats page hit-testing).
- The viz is decorative (`aria-hidden` host); the legibility lift is the index hierarchy + the
  per-mode ink contrast, which also serves low-vision read.

---

## 5. The gate — REWRITE `proof:concentric` against the level-set surface (born-RED → GREEN)

The stale ring-engine gate is DELETED clause-by-clause and reborn against HEAD. `tags:["local","ci"]`.
Painted-pixel readback, NOT geometric proxy. Self-test bites each red.

- **L1 — the field source is the level-set topography.** `sampleHeight` reads `heightField(waveFlow(
  p,t))` over the SHARED `waveField` leaf + the SHARED `curlFBM` (NO re-forked `valueNoise`/`curlFBM`
  outside the shared chunk). `facts.fieldSource` records the shared-chunk imports. A re-forked basis
  reds (the no-second-basis fence — W-FIELD-ENGINE hoist).
- **L2 — the ring engine is GONE (clean-break assert).** NO `sampleRingField`/`buildRingFamily`/
  `ringField.ts`/`axisRatio`/`rotAlpha`/`RingCenter` anywhere in live `src/.../concentric/`. A
  re-introduced ring symbol reds (the no-legacy fence — [no-backwards-compat]).
- **L3 — the IQ `contourInk` is byte-frozen.** The `contourInk` body (comment-stripped) is identical
  WGSL↔GLSL and is fed a per-level *width* parameter, not re-derived. A re-derived isoline operator
  reds (the no-rebuild fence).
- **L4 — the index hierarchy is a pure `f(level)`.** `floor(fN)` → `isIndex`/`band` read NO
  accumulation buffer, compose `samplePaletteLin` (no second color seam). A stateful jitter buffer or
  a second palette reds.
- **L5 — the warm identity holds, no teal/navy.** `constants.ts` carries NO `h∈[180,270]`; the
  teal-on-navy is a demo preset only. (Inherits `proof:teal-navy-purge`.) A cool hue in the library
  reds.
- **L6 — the transcription closes NUMERICALLY.** `shader-eval-harness.assertParity` for
  `sampleHeight` + the index read (`fN`/`lvl`/`isIndex`/`tone`) JS↔WGSL↔GLSL ΔE ≤ bar. A
  `0.61803→0.618` band-hash drift or a sign-flipped curl octave in ONE backend reds (NOT a
  `/fn name/.test()` round-trip — the false-green C3 class is retired).

**Self-test bites:** (a) re-forked `valueNoise` → L1 red; (b) re-introduced `sampleRingField` → L2
red; (c) re-derived `contourInk` → L3 red; (d) stateful index buffer → L4 red; (e) `h:240` in
constants → L5 red; (f) a `0.618` band-hash drift in WGSL only → L6 red.

**The binding π (`tests-visual/concentric-levelset.spec.ts`):** both modes + the **webkit project**
(WebGL2 fallback paints on Safari), over the live `BD.W-PAGE-BACKGROUND` field, served `:5199`, NEVER
`reducedMotion` except the PRM arm. Painted-pixel asserts: (1) the survey reads as irregular
topographic level-sets (NOT circles — sample N points off-center-axis, assert non-constant inter-line
spacing along a radius, the topology proof a geometric circle-proxy would FALSE-PASS); (2) the index
contours are visibly bolder (sample an index-line pixel vs an intermediate-line pixel, assert the ink
α/darkness delta); (3) light mode is LEGIBLE (sample contour-pixel vs ground-pixel ΔL above a floor —
the live-defect regression guard); (4) dark mode luminous; (5) the per-band hue lift is present
(adjacent bands differ in hue); (6) PRM single static frame. [live-verify-capture]: each verdict ships
a captured DELTA artefact (screenshot + paired-π), not a commit-message claim.

---

## 6. Reconcile with the union waves (no dup)

- **`BD.W-CONCENTRIC-LEVELSET`** — AMEND to match HEAD: the engine is already shipped + the ring
  engine RETIRED (the doc's `field: "rings"|"levelset"` opt-in axis is STALE — there is no rings
  mode). The remaining live work is THIS lens: the index hierarchy + per-band hue + light-mode
  legibility + the gate rewrite + the doc/copy de-stale + the §3 ground route. No new wave; this is
  the amendment body.
- **`BD.W-PAPERGRID-WARP`** — DISJOINT but kindred: it deepens the paper-grid curl warp +1 octave
  under a CV<0.15 fence. Concentric reads the SAME `waveField` + `curlFBM` leaf, so that octave
  lands ONCE and concentric inherits it (the kinship). No dup — concentric does NOT re-deepen the warp.
- **`BD.W-CONCENTRIC-RADIUS`** — UNRELATED namespace collision: it is the `--radius-concentric`
  CSS `calc()` corner register (Apple `containerConcentric` nesting law), NOT the viz. No interaction.
- **`BD.W-PAGE-BACKGROUND`** — the §3 ground route. Concentric stays transparent-ground; the warm
  field is the shared chassis edit (`CATEGORY_DEFAULT_BG`), NOT a concentric-owned sibling.
- **W-FIELD-ENGINE / W-WAVE-FIELD-HARNESS** — predecessor edges (shared basis + numeric harness).
  Real, kept.

---

## 7. The one-line essence

**Concentric is already a true living level-set survey — the work is not to build it but to make it
READ as cartography: bold index contours + golden-ratio per-band hue over a warm colorful field, dark
survey-ink in light mode and luminous etch in dark, all riding the kept shared wave — plus rewriting
the ring-engine gate + the two stale docs that no longer describe the shipped surface.**
