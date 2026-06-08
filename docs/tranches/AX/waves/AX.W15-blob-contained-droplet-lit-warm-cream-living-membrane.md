# AX.W15 — Blob contained-droplet: geometry + lit warm-cream default + living membrane

**Band** D · BLOB · **Severity** blocker · **dependsOn** AX.W08 · **Charter** AX.md §3 (the `### AX.W15`
block, lines 837-877) + §4 note 13 (the POS_SCALE disposition, lines 2069-2082) + §2b band-D precept row
(line 216) · **Audit** `deep-audit-corpus.json` slice `blob-interaction-visual` (index 12, findings
F0/F1/F2/F3/F6 — the contained-droplet geometry + lit-default + living-membrane + warm-token roots) +
slice `blob-integration-perf` (index 13, F3 the SHIPPED-default-is-the-pre-W9-flat-sticker blocker) ·
`constellation-analysis-corpus.json` (the bbnf-buddy 4-mascot-rAF PRM-freeze census, routed to W34; the
value.js goo-blob fork retirement, routed to W16/W34).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **rendered-pixel** witness that does NOT exist at HEAD `eaba94f`. W08 un-floods
the smin over-merge (the canvas-filling slab → a bounded field); W15 is RED on the SECOND layer of the
slice-12 defect — even on the un-flooded field, the blob does NOT read as a CONTAINED, lit, living warm-glass
droplet. The four falsifiable RED witnesses:

- **RED witness 1 (geometry over-budget — the keystone, slice-12 F0, LIVE).** The geometry constants are
  tuned against the OLD flooded field, not against the wrapper footprint as a budget. Live-measured: a
  center-scanline framebuffer readback on `/substrates/goo-blob` showed **84.1% horizontal coverage** of the
  canvas, and the canvas is **160% of the wrapper** (`GooBlob.vue` `POS_SCALE = 1/1.6`), so the merged field
  spans **~1.34× the visible footprint** and overflows on every side. At HEAD the constants are
  `bodyRadius:0.25` (`types.ts:157`), `satelliteRadius:0.13` (`:159`), `orbitRadius:0.35` (`:160`) — body
  (0.25) + orbit (0.35) + sat (0.13) = a 0.73 reach in a 0.5-half-extent UV, ≈1.46× the half-box BEFORE the
  smin inflation. **Falsifiable RED:** mount `<GooBlob>` with `BLOB_CONFIG_DEFAULTS`, drive N frames, read
  back — the painted field's bounding reach exceeds ~80% of the wrapper footprint and the orbit excursion
  overflows the clip on multiple sides. After the wave the WHOLE merged field (body + satellites at widest
  orbit + trail) fits inside **~70-80%** of the wrapper with intentional overflow only for the orbit
  excursion (GREEN).

- **RED witness 2 (the SHIPPED default is the pre-W9 flat sticker — slice-12 F1 + slice-13 F3, blocker).**
  Every SOTA surface feature defaults OFF in `BLOB_CONFIG_DEFAULTS`: `lit:false` (`types.ts:192`),
  `iridescence:0.0` (`:185`), `sssScale:0.0` (`:188`), `coreGlow:0.0` (`:190`). The shipped default is the
  pre-W9.b flat-color sticker — a "zero regression" flag-gating instinct that is **legacy forbidden in a
  greenfield product** (§0). Live scanline RGB measured `[79,174,255]→[126,190,255]` — a **near-flat fill**,
  no dome luminance roll. **Falsifiable RED:** the default render has **near-zero luminance variance across
  the body** (a flat fill); after the wave a lit warm-glass dome with a curved-rim Fresnel reads out of the
  box (a measurable luminance variance across the body — flat fill fails, lit dome passes).

- **RED witness 3 (the membrane is a dead geometric arc — slice-12 F3, LIVE).** The edge displacement
  defaults are sub-perceptible: `noiseAmp:0.025` (`types.ts:170`), `warpAmp:0.0` (`:173`,
  domain-warp OFF). Live `uNoiseAmp=0.015`, `uWarpAmp=0.60` (mood-driven, not the default), `uNoiseFreq=3.5`
  — the top arc of the silhouette renders as a **clean geometric curve** (screenshot `blob-mood.png`), not a
  living warped-FBM membrane. The breath pulse is a single `sin` (mechanical). **Falsifiable RED:** the
  silhouette deviation from a perfect circle is below a perceptible band; after the wave the warped-FBM
  membrane reads as a calm-but-living organic edge (a non-zero, proportional-to-body silhouette deviation).

- **RED witness 4 (the wired interaction is invisible + the warm marriage is gated — slice-12 F2/F6, LIVE).**
  The pointer-follow lean / velocity squash / decaying-radius pseudopod trail / click-squish are FULLY WIRED
  and the data is sound (live `uPointerActive=1`, `uPointer` tracks the cursor, `uVelocity` up to
  `[0.05,-0.57]`, `uTrailCount` ramps 12→15, `uStretch=0.4`) — but there is **no contained silhouette to
  deform**, so the felt interaction is INVISIBLE, and the magnitudes (`pointerStrength:0.08` `:203`,
  `stretch:0.4` `:204`, `clickImpulse:0.5` `:205`) were tuned against the OVERSIZED field. The demo stories
  bind a **cold-blue** color (`color="oklch(0.7 0.16 250)"` — `blob-interaction.vue:53`, `blob-mood.vue:74`/`:104`),
  not the house warm-cream identity the README claims. **Falsifiable RED:** under a synthetic hover-flick the
  painted centroid/bounding-box does NOT measurably shift toward the pointer; after the wave it does, and the
  un-themed blob belongs to the cream-glass system.

The wave is RED at HEAD on all four; the HardGate drives each to GREEN. **Method caveat (audit-cited, inherited
from W08):** WebGL `readPixels`/`drawImage` returns 0 against this substrate (`preserveDrawingBuffer:false`
clears post-composite + the demand-loop parks) — the gate MUST render with a `preserveDrawingBuffer:true`
test context (the W00 π-workspace `proof:substrate-paints-color` harness already does this) or assert on the
on-screen screenshot; do NOT trust naive readback against the live demand-loop.

---

## Goal

The blob renders as a **CONTAINED, lit, living warm-glass droplet** — every length re-derived as one footprint
budget so the merged field fits ~70-80% of the wrapper, the lit warm-cream identity ships ON by default, and a
calm warped-FBM membrane + the now-legible wired interaction read out of the box — locked by a rendered-pixel
gate that asserts containment, dome luminance-variance, silhouette deviation, AND a pointer-driven centroid
shift.

---

## Scope (the gestalt fix — one footprint budget + the default-identity flip, no workaround, no legacy)

W08 (the predecessor) took the MINIMAL un-flood: it restored `POS_SCALE` on `uSmoothK` and re-tuned the
COMPOSED smin band to a tight wet meniscus (~0.03-0.08 effective), un-flooding the slab. W08 explicitly left
the **geometry constants** (`bodyRadius`/`orbitRadius`/`satelliteRadius`) and the **default-identity flags**
alone — that is W15's job. This wave PERFECTS the look on the un-flooded field as ONE cohesive re-derivation:

1. **Solve the geometry as ONE footprint budget (F0 — the keystone, blocker root).** Treat the wrapper
   footprint as the HARD visual bound and solve `bodyRadius + orbitRadius + satelliteRadius + the smin band`
   together so the WHOLE merged field (body + satellites at widest orbit + the trail excursion) fits inside
   **~70-80%** of the wrapper, with intentional overflow margin ONLY for the orbit excursion. Re-derive
   `BLOB_CONFIG_DEFAULTS.bodyRadius`/`satelliteRadius`/`orbitRadius` (`types.ts:157`/`:159`/`:160`) DOWN
   against this budget — this is a SINGLE atomic re-derivation of the length cohort, not a per-constant nudge.
   The keystone insight: containment **resurfaces the W9/W10/W11 work that already ships but paints nothing**
   (the lit rim, iridescence, SSS, the warped membrane, the wired interaction are all swamped by the oversize
   field).

2. **Ship the lit warm-glass droplet as the DEFAULT identity (F1 + slice-13 F3 — blocker).** Turn ON a
   TASTEFUL lit + LOW iridescence + LOW SSS floor in `BLOB_CONFIG_DEFAULTS`: `lit:true` (`:192`),
   `iridescence` → a low warm-pearl floor (`:185`), `sssScale` → a low floor (`:188`), optionally a low
   `coreGlow` (`:190`). **DELETE the "zero regression" flag-gating as legacy per §0** — a greenfield product's
   canonical look IS the SOTA look; the off-by-default instinct is exactly the legacy/fallback path the mandate
   forbids. Re-anchor the normal/thickness on the CONTAINED body (finding 1) so the Fresnel rim lives on a
   **curved rim INSIDE the footprint**, and re-tune the dome profile so the highlight rolls across a believable
   sphere instead of saturating flat. This closes the "PENDING" W9 browserVerify.

3. **Derive the default palette from glass-ui warm tokens (F6 — the cream-glass marriage).** The un-themed
   blob belongs to the **warm-cream glass system**: derive the DEFAULT blob palette from glass-ui's warm token
   family (a warm anchor / `--primary`-family, resolved through the injected `ColorResolver` seam) so an
   un-configured blob reads as house-warm, not a cold bubble. Keep cold/neon as **explicit consumer opt-in**
   (presets-in-consumers — the library's OWN default tokens evolve as its identity; named cold/neon presets
   live in the consumer). Re-point the THREE demo stories' default color from the cold-blue
   `oklch(0.7 0.16 250)` to the warm identity so the storybook shows the house look. Guard the
   `var(--primary)`-in-dark-mode wash with a min-contrast rim (a foreground-aware rim) so EVERY grid blob
   paints visibly against light AND dark.

4. **Raise the membrane to a living-but-calm band (F3 — the organic edge).** Once the body is contained, raise
   the default edge displacement to a **perceptible-but-calm** band: `noiseAmp` (`:170`) up to a proportional
   floor and `warpAmp` (`:173`) ON at a calm default so the warped-FBM watercolor silhouette reads as a LIVING
   membrane, not a geometric arc. Tie `noiseAmp`/`noiseFreq` to the new (smaller) body scale so the wobble is
   proportional. Tune the FBM lacunarity/persistence toward the "liquid not rocky" constants (PATH-FORWARD §3:
   ~1.8 / ~0.42) in `watercolor-edges.glsl.ts`, and **de-sync the breath pulse** (currently a single `sin`)
   so the membrane never reads mechanical.

5. **Re-balance the interaction magnitudes against the new smaller body (F2 — legibility, no new code).** NO
   new interaction code — fixing the contained geometry makes the EXISTING spring/trail/squash/mood instantly
   legible. Re-scale `pointerStrength` (`:203`), the trail radius, and `stretch` (`:204`)/`clickImpulse`
   (`:205`) against the new smaller body so a hover-flick produces a clearly readable lean + pseudopod +
   recover WITHIN the footprint (the current values were tuned against the oversized field). The render gate
   asserts a pointer-driven centroid shift so the felt interaction is machine-locked, not just the PRM /
   single-loop structure the existing `proof:blob-interaction-prm` checks.

## SOTA deepening (blob research)

The 32-facet blob corpus (`docs/tranches/AX/research/blob-research-corpus.json`, synthesis
`blob-synthesis.md`) confirms the W15 keystone: **every premium surface feature already SHIPS — containment
RESURFACES the work that paints nothing.** Facets: **containment [25]**, **analytic-gradients [2]**,
**domain-warp [4]**, **living-membrane [26]**, **blinn-phong [9]**, **fresnel [10]**, **sss [12]**,
**iridescence [11]**, **OKLCh-palette [13]**, **mood-model [14]**, **auto-mood-arcs [15]**, **soft-body [5]**.

- **The footprint budget COUNTS the smin band ([25][1]).** Solve `bodyRadius + orbitRadius + satelliteRadius +
  smin_band ≤ 0.5 × 0.75` (the wrapper half-extent × the ~75% target) as ONE atomic sum, not per-constant.
  At HEAD `body 0.25 + orbit 0.35 + sat 0.13 = 0.73` reach in a `0.5` half-extent ≈ `1.46×` the half-box
  **BEFORE** the smin inflation — and the smin band is INVISIBLE to a raw-radius budget: IQ proves the kernel's
  inward-at-seam is an OUTWARD-of-union expansion, so the merged isosurface reaches `~k` BEYOND the union of the
  raw circles. A budget that ignores the `+smin` term still overflows [25]. The same `+k` padding applies to the
  W16 bounding-discard `maxReach` (routed). Re-derive the whole length cohort DOWN against this budget so the
  widest-orbit + trail excursion fits `~70-80%` of the footprint, overflow ONLY for the intentional orbit
  excursion (KEEP the deliberate CSS overflow — `contain:layout style`, NO paint containment, the 160% canvas;
  a hard SDF box-clip `max(d, sdRoundBox)` would AMPUTATE the intended overflow and is a fallback only [25]).

- **The analytic-gradient smin is the keystone quality+perf lever — LAND IT HERE ([2]).** W15 owns
  `metaball.frag.ts`, so the migration lands in this wave: (1) `sdCircle → sdgCircle` returning `vec3(d, p/d)`
  (the circle gradient `p/d` is UNIT-LENGTH free, the eikonal property holds exactly); (2) carry the FBM
  displacement's analytic gradient (already in `noised().yz`) into the body gradient via the chain rule
  `circleGrad − amp*fbmGrad` (WATCH the sign — `circleDist − displacement` ⇒ `circleGrad − amp*fbmGrad`; verify
  against a central-difference reference); (3) convert `smin/sminQuadratic/sminCircular` to the value+gradient
  `vec3` form propagating `mix(a.yz, b.yz, h)`; (4) `sceneDist` returns `vec3(dist, grad)` so `surfaceNormal`
  reads `grad2d` DIRECTLY — **DELETING 4 full `sceneDist` evals per lit pixel** (each running 3-octave FBM ×2 +
  the sat/trail loops; a `~4-5×` field-cost cut on the normal, delivered FREE, the exact trim W16 arm-5 wanted).
  **Caveats ([2]):** the smin field is sub-unit (CD family `|grad| ≤ 1`) so the gradient is NOT unit-length —
  `normalize()` before the dome lift (it already is) and NEVER assert `|grad2d|==1` as a gate clause (would RED
  on a correct field — the unit contract is on the FINAL lifted normal `N`, not the raw field gradient); keep the
  `+1e-6` core-degenerate guard; the win is **DIRECTION correctness at the meniscus** (where the 4-tap averages
  two surfaces across the seam and tilts wrong), not magnitude. **Subtlest hazard:** the anisotropic squash basis
  (`bodyUv = (dot/sa, dot*sa)`) transforms the gradient too — the analytic gradient must be transformed back by
  the INVERSE-TRANSPOSE of the squash basis or the normal tilts wrong under fast pointer motion (the 4-tap
  handled this implicitly by sampling in screen space). Keep the warp-Jacobian APPROXIMATION (use only the outer
  FBM gradient — the warp is low-frequency, the error sub-perceptible; full autodiff is overfit for one blob [2]).
  This makes W16's "gate the 4-tap behind the lit path" arm MOOT (there is no 4-tap left to gate).

- **Living-but-calm membrane — the liquid constants + the de-synced breath ([4][26]).** The blob ships
  `fbmWarped` but `warpAmp` DEFAULTS to `0.0` (domain warp OFF — a clean geometric arc). Turn `warpAmp` ON at a
  calm `~0.3-0.4` floor; raise `noiseAmp` to a perceptible-but-calm floor **tied to the new smaller body** (so
  the wobble stays proportional — an absolute UV amplitude on a smaller droplet reads as a huge wobble or
  sub-perceptible [4]); tune the FBM toward the **LIQUID band** (lacunarity `2.0 → ~1.8`, persistence/gain
  `0.5 → ~0.42`, 2-3 octaves not 4-5 terrain-grade) in `watercolor-edges.glsl.ts`; **de-sync the single
  `sin(uPulsePhase)` breath into 2-3 detuned sines at IRRATIONAL frequency ratios** (e.g. `0.13/0.09`) tuned to
  the human calm band (~6 breaths/min ≈ 10s cycle, asymmetric slower exhale) so the membrane never mechanically
  re-syncs [4][15]. Keep the QUINTIC noise fade (`f*f*f*(f*(f*6-15)+10)`) — a cubic fade creases the analytic
  gradient and shimmers the normal [4]. Stay SINGLE-level warp on the default path (each warp level roughly
  doubles FBM evals; two-level ≈6× [4]). **Free premium:** reuse the intermediate warp vector `q` (already
  computed inside `fbmWarped`) to drive the OKLCh hue perturbation (small `~5°` swing on the perceptually-uniform
  OKLCh path — NOT raw sRGB/HSV, which bands and goes muddy) so warp + color move coherently — one extra return,
  vs the current separate `fbm(uv*colorNoiseFreq)` color call [4].

- **Material-blend `vec2` smin — color through the seam ([4][15]).** The highest-leverage un-flood-era polish
  the blob does NOT yet ship: the IQ `vec2 smin` returns BOTH the blended distance (`.x`) AND a blend weight
  (`.y` ⇒ `mix(colorA, colorB, blendFactor)`) so a merging satellite carries its OWN palette stop INTO the neck
  instead of popping at the merge. Today the body/satellite color is a flat global `colorNoise` field — the gel
  seam reads uniform. Cheap depth-reading, high polish-per-effort; **gate it behind the multi-stop palette path
  (`uStopCount > 1`)** so single-color blobs pay nothing [15].

- **Lit warm-glass default — ship it ON ([9][10][11][12][13]).** The lit dome (4-tap → analytic normal +
  dome-Z lift `z=sqrt(1-(1-interior)^2)`), Blinn-Phong glint, Schlick/Fresnel rim, fast-SSS Beer-Lambert inner
  glow, and warm-pearl IQ-cosine iridescence ALL execute correctly but `thickness = -d/bodyR` SATURATES to ~1
  across the oversize body, so they paint nothing — **containment resurfaces them for free** [25]. Flip
  `lit:true` + low iridescence/SSS/coreGlow floors; DELETE the "zero regression" flag-gating (greenfield has no
  legacy default — the SOTA look IS the default). Three robustness folds the corpus surfaces: **energy-conserving
  Blinn-Phong** (`spec ×= (shininess+2)/8` so shininess and strength decouple — today tuning one re-tunes the
  other [9]); **specular antialiasing** (widen the spec lobe where the FBM normal varies — Toksvig/fwidth-clamp —
  so the tight glint 16-64 does not STROBE on the animated membrane, critical for small dock-grid instances; do
  NOT just crank shininess [9]); **IGN dither** (`fract(52.9829189*fract(dot(gl_FragCoord.xy, vec2(0.06711056,0.00583715))))`
  at 1/255, AFTER `linearToSrgb`, BEFORE the `*alpha` premultiply) — the low-chroma warm-cream dome bands on
  8-bit panels; aurora ships it, splice the same [2][9]. Beer-Lambert: swap the linear `oklch.x += coreGlow*thickness`
  for a saturating `1 - exp(-k*thickness)` curve (flat thick core, fast warm rim falloff) and scale the SSS
  hue-warm-shift by `(1-thickness)` so only the thin rim warms [12]. Budget the combined L-lift with `max()`
  between competing highlights (the lit block already does `max(warmCream*spec, rimLin*rim)`).

- **Warm-cream identity + min-contrast rim ([13][9][10]).** Derive the default palette from glass-ui WARM tokens
  via `deriveBlobPalette` (harmony `analogous`, low chromaBump, L-spread so satellites read lighter); the
  warm-cream specular is OKLCh `L≈0.97, C≈0.03, h≈85°` through the SAME spliced OKLCh matrices — NOT hardcoded
  sRGB white (reads cheap-CG) [9][13][30]. Feed the Fresnel rim `--foreground` via the ColorResolver, with a
  **foreground-aware min-contrast rim guard** so a `var(--primary)` blob never washes out in dark mode (the dark
  move is chroma-reduce + L-lift the rim stop, not a re-tint) [10][15]. Cold/neon stays explicit consumer opt-in
  (presets-in-consumers). The OKLCh perceptual perturbation + hue-preserving gamut clamp (Ottosson) is the
  already-shipped in-family color architecture — preserve it [13].

- **Mood headroom re-tune ([14][15]).** The circumplex is SOTA-correct — preserve it. With lit/iridescence/SSS
  now default-ON, the mood `iridScale` (0.4→1.8) is **load-bearing for the FIRST time** — re-tune the excited
  ceiling DOWN so it does not over-saturate into a garish neon thin-film on the now-default-lit warm body (the
  excited extreme must stay WARM, not neon). The `orbitSpeedScale`/`wobbleScale` are **derived-but-IGNORED** by
  the satellite tick (a real bug class per the overfitting-audit precept) — wire them (excited speeds the orbit +
  merge cycle, sleepy droops it) or the audit flags them dead [14][15]. Re-balance pointer-lean/pseudopod/squash/
  trail magnitudes against the smaller body so the already-wired interaction (Codrops 15-sphere decaying-radius
  trail, volume-preserving `1/sa` squash, critically-damped follow spring) becomes legible WITHIN the footprint
  [5][15]. Keep sleepy ALIVE (slow the breath/orbit, do not freeze — `arousal=0` reads DEAD, not asleep [15]).

### POS_SCALE DISPOSITION (inherits W08 — §4 note 13; the explicit disposition line W15 MUST carry)

This is the resolution of the `harden:dock-graphics` F0 **blocker contradiction**: W08 (slice-11) and W15
(slice-12) inherited mutually-exclusive directives — W08 "re-apply POS_SCALE … its W9.a deletion was the
error"; W15 "drop POS_SCALE as a hidden fudge, express every length in wrapper-normalized units." The decision
is recorded in §4 note 13 (line 2075) and W08 OWNS it; W15 INHERITS, never contradicts.

**RATIFY-BEFORE-IMPL — the recommended disposition (charter §4 note 13 + §3 W15 block, lines 862-868):** W15
**KEEPS W08's POS_SCALE regime** and re-derives the geometry length cohort (`body`/`sat`/`orbit`) in
wrapper-normalized terms ON TOP of the existing `POS_SCALE = 1/1.6` (`useMetaballRenderer.ts:32`) compression —
treating `POS_SCALE` as the established coordinate-system constant every length already rides, NOT a fudge to
excise. This is the **single-cohesion, lowest-risk** path: it satisfies the contained-footprint budget without
touching the smin band W08 just compressed, and it avoids re-litigating the coordinate system across a wave
boundary. **The slice-12 "drop POS_SCALE as a hidden fudge / express every length in raw wrapper-normalized
units" language is dropped as scope-creep → §J** (the recommended branch in §4 note 13).

The ALTERNATIVE branch — IF the orchestrator ratifies a full raw-normalized re-expression — is permitted ONLY
as ONE ATOMIC re-derivation of the **ENTIRE length cohort (body/sat/orbit/smin/noise) in this single wave**,
with `proof:blob-render` as the regression-lock, **NEVER a partial migration that re-floods** what W08
compressed. Either way the "eliminate the hidden fudge" language is scoped to a SINGLE atomic re-derivation,
never split across the wave seam. **This is the one decision in the wave the orchestrator must ratify before
impl — the recommended path is KEEP W08's regime + drop the excision language.**

### NOT in scope (routed elsewhere — no scope-creep)

- **Pause/resume seam restore, demand-gate quiescence, shared-context multi-instance, the `var()`-unwrap leaf
  (`resolveTokenColor`), the oversize-canvas perf trim, the research-backed README rewrite + the
  defineExpose-currency gate** — all **W16** (blob integration/perf, dependsOn W08 + W15). W15 ships the
  identity + geometry; W16 ships the integration/perf/README close.
- **The smin distance-regime un-flood** (`uSmoothK` upload, `BLOB_CONFIG_DEFAULTS.smoothK`, the mood
  multiplier, restoring `POS_SCALE` on the smin upload) — **W08** (the predecessor, already landed). W15 does
  NOT re-tune the smin band; it inherits the un-flooded field.
- **The value.js goo-blob fork retirement** (`demo/@/components/custom/goo-blob/` + the 343-line local
  `useMetaballRenderer` + 3 mount sites) is gated behind W08/W15/W16 landing the contained lit droplet; the
  consumer-adoption edit routes to **W34** (value.js consumes `@mkbabb/glass-ui/goo-blob` through the injected
  ColorResolver seam). W15 writes NO sibling source.
- **The bbnf-buddy PRM-freeze census** (4 perpetual mascot rAF loops, zero `prefers-reduced-motion` — the SAME
  WCAG 2.2.2 gap glass-ui's substrate freeze closes) — the routed fix is a consumer adoption (**W34**); W15's
  CONVERGE fold is only the CENSUS confirming the substrate freeze is reachable (the freeze itself is the
  `useWebGLCanvas` PRM-monitor, already shipped — NOT re-implemented here).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/goo-blob/types.ts` | Re-derive the geometry length cohort `bodyRadius`/`satelliteRadius`/`orbitRadius` (`:157`/`:159`/`:160`) DOWN against the footprint budget; flip the default identity `lit:true` (`:192`) + a low `iridescence`/`sssScale`/`coreGlow` floor (`:185`/`:188`/`:190`); raise `noiseAmp` (`:170`) + `warpAmp` (`:173`) to the living-but-calm band; re-scale `pointerStrength`/`stretch`/`clickImpulse` (`:203`/`:204`/`:205`); update the `:164-166` + surrounding comment blocks to the re-derived regime. (Possibly a warm-token default-palette derivation hook — see GooBlob.vue.) |
| `src/components/custom/goo-blob/composables/useBlobMood.ts` | Re-tune the mood-driven iridescence/SSS/edge multipliers if the new lit-default floor changes the mood band's headroom (so an "excited" preset is not over-saturated on the now-default-lit body). |
| `src/components/custom/goo-blob/composables/useBlobPointer.ts` | Re-scale the trail decaying-radius constants against the new smaller body so the pseudopod is proportional (the magnitudes only; NO new interaction code). |
| `src/components/custom/goo-blob/composables/useBlobSatellites.ts` | Re-derive satellite orbit/eccentricity defaults against the contained budget IF the orbit excursion needs re-balancing for the new smaller `orbitRadius`. |
| `src/components/custom/goo-blob/shaders/watercolor-edges.glsl.ts` | Tune the FBM lacunarity/persistence toward the "liquid not rocky" band (~1.8 / ~0.42) + de-sync the single-`sin` breath pulse (membrane fidelity only). |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | Re-anchor the normal/thickness/dome profile on the CONTAINED body so the Fresnel rim lives on a curved rim inside the footprint + the dome highlight rolls across a believable sphere (the lit-default profile; NO smin-band edit — that is W08's, untouched). |
| `src/components/custom/goo-blob/GooBlob.vue` | Derive the DEFAULT warm-token palette through the injected ColorResolver seam (a foreground-aware min-contrast rim guard for the `var(--primary)`-in-dark wash); NO new SFC pause/resolve plumbing (that is W16). |
| `demo/stories/substrates/blob-interaction.vue` | Re-point `color="oklch(0.7 0.16 250)"` (`:53`) → the warm house identity. |
| `demo/stories/substrates/blob-mood.vue` | Re-point `color="oklch(0.7 0.16 250)"` (`:74`/`:104`) → the warm house identity. |
| `demo/stories/substrates/goo-blob.vue` | Re-point the demo default color binding → the warm house identity (verify `:color="gooColor"`/`:color="c"` defaults read warm). |
| `tests-visual/blob-render.spec.ts` | EXTEND (inherited from W08 — NOT re-authored): add the containment-band tightening (~70-80% footprint), the dome luminance-VARIANCE assertion, the silhouette-deviation-from-circle assertion, the pointer-driven centroid-shift-under-synthetic-gesture assertion, and the every-grid-blob-paints-against-light/dark assertion. |
| `package.json` | NO new `proof:*` entry (W15 EXTENDS W08's `proof:blob-render` thresholds, never re-authors the gate) — touch ONLY if a sub-script alias is added; coordinate with W08/W16's `scripts` hunks. |
| `docs/tranches/AX/audit/W15-blob-contained-droplet.json` | NEW — the wave's born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference + the bbnf-buddy PRM-freeze census + the POS_SCALE-disposition ratification record. |

**OUT of bounds:** `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` smin-band upload
(`:438-439`, the `uSmoothK` + `POS_SCALE` restore) — that is W08's, LANDED, untouched; `POS_SCALE` itself
(`:32`) stays per the ratified disposition. `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` (the
`k *= 4.0`) — W08-correct, untouched. The pause/resume seam, the `resolveTokenColor` leaf, the
demand-gate quiescence, the multi-instance shared context, the perf trim, the research README + the
defineExpose-currency gate — all **W16**. The aurora WGSL/`packGPUUniforms`/`WEBGPU_PARITY` surface — **W07**
(the disjoint sibling graphics blocker). The `--glass-specular-*` cohort — **W09**.

---

## Disjointness (sibling waves it must NOT overlap)

W15 is the FIRST D·BLOB perfection wave; it runs **AFTER W08** (its sole dependency) and **BEFORE W16**. The
dispatch contract:

- **vs W08 (blob core unblock — the predecessor).** **W15 dependsOn W08** and runs sequentially AFTER it.
  W08 owns the smin distance regime (`uSmoothK` upload `:438-439`, `BLOB_CONFIG_DEFAULTS.smoothK` `:167`, the
  mood smoothK multiplier, the POS_SCALE restore on the smin band, `sdf-body.glsl.ts`). W15 owns the GEOMETRY
  length cohort (`bodyRadius`/`satelliteRadius`/`orbitRadius`), the default identity flags
  (`lit`/`iridescence`/`sssScale`/`coreGlow`), the membrane displacement, and the interaction magnitudes — the
  constants W08 explicitly left alone. **The POS_SCALE DISPOSITION line is the contract that prevents W15
  re-flooding what W08 just compressed.** Both edit `types.ts` (different constant blocks — W08 the smin band,
  W15 the geometry/identity/membrane/interaction blocks) but SEQUENTIALLY, never concurrently, so there is no
  three-way merge. W15 EXTENDS W08's `proof:blob-render` gate (tighter containment band + the variance /
  silhouette / centroid assertions), never re-authors it.

- **vs W16 (blob integration + interaction + perf + README).** **W16 dependsOn W08 + W15** and runs AFTER.
  W16 owns the pause/resume seam (`GooBlob.vue` defineExpose), the `resolveTokenColor` leaf, the demand-gate
  quiescence (`useMetaballRenderer` `shouldContinue`), the multi-instance shared context, the perf trim, the
  research README rewrite + the defineExpose-currency gate. W15 owns the GEOMETRY + IDENTITY + MEMBRANE +
  INTERACTION-MAGNITUDE look. Both edit `GooBlob.vue` (W15: the warm-default palette + min-contrast rim guard;
  W16: the pause/resume + `resolveTokenColor` plumbing) and `useMetaballRenderer.ts`/`useBlobMood.ts`
  SEQUENTIALLY — coordinate the disjoint hunks. The README: W08 syncs the dead `smoothK` numbers; W15 does NOT
  touch the README (the warm-cream-default identity claim is already in the README and W15 makes it TRUE); W16
  runs the full research rewrite + the planned→landed sweep.

- **vs W07 (aurora core unblock) + W09 (specular).** Fully disjoint by file: W07 is the aurora WGSL/
  `packGPUUniforms`/`resolveRenderModeAsync`/`WEBGPU_PARITY` surface; W09 is `glass.css`/`Card.vue`/
  `DockIconButton.vue`/`tokens.css` `--glass-specular-*`. W15 never touches any. The ONLY potential shared
  file is the π workspace `tests-visual/` tree — but W15 EXTENDS the blob spec `blob-render.spec.ts` (W08's),
  while W07 authors `aurora-*.spec.ts` and W09 its own — separate spec files, no collision.

- **vs W00 (π lane).** W00 ships `proof:substrate-paints-color` (the shared readPixels harness + the
  non-black/contained-band floor) + the `tests-visual` workspace + the `preserveDrawingBuffer:true` test
  context. W15 COMPOSES that primitive in the inherited `blob-render.spec.ts` with the W15-tightened
  assertions. W00 owns the harness + floor; W15 owns the contained-lit-droplet parity assertions in the blob
  spec. W15 dependsOn W08 which dependsOn W00 (the lane it closes on).

- **vs W34 (cross-repo consumer adoption).** W15 authors NO sibling source. The value.js goo-blob fork
  repatriation NOTE + the bbnf-buddy PRM-freeze census-fix route to W34 (gated behind W08/W15/W16 landing the
  droplet). W15 writes the library fix + the census record only.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — one cohesive look re-derivation across the geometry + identity + membrane +
  interaction surface; agent A the TS config/composables, agent B the two shaders).** Lands the re-derived
  geometry length cohort, the default-identity flip (`lit:true` + the low iridescence/SSS/coreGlow floor + the
  DELETED zero-regression flag-gating), the warm-token default palette + min-contrast rim guard, the
  living-but-calm membrane (noise/warp/FBM-constants + de-synced breath), the re-balanced interaction
  magnitudes, and the demo-story color re-point. This is an **empirical look tune** validated against the LIVE
  rendered field (the ~70-80% footprint target, the dome variance, the legible interaction) — NOT a one-shot
  constant set; iterate on the π-lane render + the live story. Lint + typecheck at every interval.

- **Adversarially-verify (≤1 read-only lane).** PROVES the containment + identity are real and the gate is
  load-bearing: re-runs the live RED witnesses against the patched tree (mount GooBlob with defaults, render N
  frames, read back — confirm the merged field fits ~70-80% of the wrapper with a transparent margin on every
  side; confirm a dome luminance variance across the body; confirm a non-zero silhouette deviation; confirm a
  synthetic hover-flick measurably shifts the centroid toward the pointer); A/B-screenshots all three stories
  (`/substrates/goo-blob`, `/blob-interaction`, `/blob-mood`) in light AND dark before (un-contained cold flat
  arc) vs after (contained lit warm-glass living droplet). **ADVERSARIAL twist:** (1) tries to make the
  EXTENDED `proof:blob-render` pass on a still-OVERSIZE or still-FLAT-fill or still-COLD field and confirms it
  goes RED (proves the gate catches the slice-12 class W08's containment band alone would not); (2) confirms
  the un-flood from W08 is NOT regressed (the smin band stays a tight meniscus — W15 did not re-flood); (3)
  confirms EVERY grid blob paints visibly against light AND dark (the `var(--primary)`-dark-wash guard works);
  (4) confirms mood presets at min/max arousal stay a legible CONTAINED droplet (no preset re-oversizes).

- **Gate-author (≤1 agent — born-RED→GREEN, EXTENDING not re-authoring).** Extends `tests-visual/blob-render.spec.ts`
  (W08's) with the W15 assertions (tighter ~70-80% containment band, dome luminance-VARIANCE, silhouette
  deviation-from-circle, pointer-driven centroid shift under a synthetic gesture, every-grid-blob-paints
  light/dark) using the `preserveDrawingBuffer:true` test context. Confirms the EXTENDED gate FAILS at the
  post-W08 / pre-W15 tree (un-contained + flat + cold) and PASSES on the patched tree (contained lit warm-glass
  living droplet).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement +
1 adversarial + 1 gate-author.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — work AROUND a roadblock with an idiomatic gestalt fix, never stall; §6.2 is the 4-class halt-vs-work-around decision tree) — read it by reference, it is not restated here. The wave-SPECIFIC §3a auto-triggers (authored from this wave's FileBounds + HardGate):

- **Scope-reveal → halt + triumvirate (Class 2; NEVER absorb in-line):** any need to touch the OUT-of-bounds surfaces — the W08 smin distance regime (`useMetaballRenderer.ts` `uSmoothK`/`POS_SCALE` upload, `BLOB_CONFIG_DEFAULTS.smoothK`, the mood smoothK multiplier, `sdf-body.glsl.ts` `k *= 4.0`) — re-flooding what W08 just compressed is the cardinal violation the POS_SCALE-disposition contract prevents; the W16 surface (pause/resume seam, `resolveTokenColor` leaf, demand-gate quiescence, multi-instance shared context, perf trim, research README, defineExpose-currency gate); the W09 `--glass-specular-*` cohort; the W07 aurora WGSL/`packGPUUniforms`/`WEBGPU_PARITY` surface.
- **Non-local hard-gate failure → triumvirate (Class 2):** if the EXTENDED `proof:blob-render` REDs non-locally on any of its five W15 arms (containment band ~70-80% footprint, dome luminance VARIANCE, non-zero silhouette deviation-from-circle, pointer-driven centroid shift under synthetic gesture, every-grid-blob-paints light/dark) — escalate the gate-extension design (the W08 floor + the W15 tightening composed in the inherited spec), do NOT re-author W08's `proof:blob-render` or hand-patch the readback.
- **3rd diagnostic-loop iteration → triumvirate (Class 2):** this is an EMPIRICAL look tune validated against the LIVE render, not a one-shot constant set — but if the re-derived geometry/identity/membrane does NOT reach the contained-lit-warm-cream-living-droplet target (still oversize, or flat-sticker, or cold-arc) after three iterations on the π-lane render, dispatch research→plan→redress rather than re-rolling the length/identity constants ad hoc.
- **§5.3 ratify reached un-ratified → HALT-and-ratify (Class 3):** the POS_SCALE disposition (the ratification record that `POS_SCALE` itself stays per W08, W15 re-deriving only the geometry/identity blocks DOWN against the footprint, never the smin band) is the ratify-before-impl contract — if the implement step finds it needs the smin/POS_SCALE band to hit containment, that is a scope-reveal onto W08, surface it (do NOT self-ratify a re-flood).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:blob-render` (EXTENDED from W08, π-lane, fail-CLOSED, in
the W00 visual-runtime workspace, DEFAULT WebGL2 engine, `preserveDrawingBuffer:true`):

- Mounts `<GooBlob>` with `BLOB_CONFIG_DEFAULTS`, drives N frames, reads back the canvas. Asserts (W15
  additions over W08's contained-band floor):
  1. **Containment band tightened** — the merged field fits inside **~70-80% of the wrapper footprint** with a
     transparent margin on every side (orbit excursion the only intentional overflow). **Born-RED** (the
     post-W08 field is un-flooded but the geometry still reaches ~1.34× the footprint).
  2. **Dome luminance VARIANCE across the body** — a flat fill FAILS, a lit dome PASSES (catches the
     default-OFF flat-sticker). **Born-RED** (HEAD default `lit:false` → near-flat RGB `[79,174,255]→[126,190,255]`).
  3. **Non-zero silhouette deviation from a perfect circle** — proportional to the body scale (catches the dead
     geometric-arc membrane). **Born-RED** (HEAD `warpAmp:0.0`, `noiseAmp:0.025` → a clean arc).
  4. **Pointer-driven centroid shift under a synthetic gesture** — the painted centroid/bounding-box measurably
     shifts toward the pointer under a synthetic hover-flick (catches the invisible interaction). **Born-RED**
     (HEAD has no contained silhouette to deform legibly).
  5. **Every grid blob paints visibly against light AND dark** — the `var(--primary)`-dark-wash min-contrast
     rim guard works. **Born-RED** (the first `var(--primary)` blob washes out in dark).
- Composes the W00 `proof:substrate-paints-color` readPixels primitive (the shared non-black floor) + W08's
  contained-band floor; W15's parity assertions are the contained-lit-living-droplet tightening in the
  inherited blob spec.

This is a **runtime-observation / rendered-pixel** gate (the precept-valid artefact form per SPEC.md §Hard
Gates — render-and-readback on a real device), the structural antidote to the static-math blob gate cohort
that shipped green over a broken render. It is NOT a grep-for-source-string-as-runtime gate; the
luminance-variance / silhouette-deviation / centroid-shift are computed against the *actual rendered pixels*,
not asserted at the input-param level.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on all THREE blob stories (`/substrates/goo-blob`, `/blob-interaction`, `/blob-mood`) at
**≥ 3 viewports** (375×667 / 1280×800 / 1440×900) in **light AND dark** — the appearance/interaction axis, NOT
a headless proof alone:

- **Containment correctness:** the blob reads as a CONTAINED, bounded, organic gooey droplet sitting within
  its footprint — a transparent margin frames it on every side; it does not clip at any canvas edge at rest;
  the orbit excursion is the only intentional overflow.
- **Lit warm-cream identity:** the un-themed default blob reads as a wet, dimensional, premium warm-GLASS
  creature out of the box (the lit dome highlight rolls across a believable sphere, the warm-pearl iridescence
  + low SSS read as glass not garish thin-film, the rim lives on a curved edge inside the footprint) — it
  belongs to the cream-glass system, NOT a cold bubble.
- **Living membrane:** the warped-FBM watercolor silhouette reads as a calm-but-living organic membrane (a
  liquid wobble, a de-synced breath), never a clean geometric circle/box and never a mechanical pulse.
- **Legible interaction:** a hover-flick produces a clearly readable lean + pseudopod + recover WITHIN the
  footprint; the click-squish + mood drift read as a soft-body creature.
- **Light/dark legibility:** EVERY grid blob paints visibly against the page background in BOTH modes (the
  `var(--primary)`-dark-wash guard).
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate — the droplet does not
  occlude the surfaces behind it.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, the W00 protocol: the post-W08 un-contained-cold-flat
state vs the contained-lit-warm-living state, side-by-side light/dark) is the binding close criterion. This
closes the "PENDING" W9 browserVerify the gate-fleet falsely assumed-done.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** On the POST-W08 tree, re-confirm the RED witnesses against the
   un-flooded field: render all three blob stories, reproduce the ~1.34× footprint geometry reach, the
   near-flat default RGB (`lit:false`), the dead geometric-arc membrane, the invisible interaction, and the
   cold-blue demo binding + the `var(--primary)`-dark wash. Record as the born-RED baseline in
   `audit/W15-blob-contained-droplet.json`. Do NOT proceed on the audit's word — re-prove live (per the §4
   note 12 "verify against HEAD" discipline).
2. **RATIFY the POS_SCALE disposition.** Confirm with the orchestrator: KEEP W08's `POS_SCALE` regime + drop
   the slice-12 "eliminate the fudge" language as scope-creep (the recommended §4-note-13 path). Record the
   ratification in the artefact. (RATIFY-BEFORE-IMPL — no geometry edit before this is recorded.)
3. **Extend the born-RED gate.** Add the W15 assertions to `tests-visual/blob-render.spec.ts` (tighter
   containment band + dome variance + silhouette deviation + centroid shift + light/dark); confirm it FAILS on
   the post-W08 / pre-W15 tree.
4. **Solve the geometry as one footprint budget (F0).** Re-derive `bodyRadius`/`satelliteRadius`/`orbitRadius`
   (`types.ts:157`/`:159`/`:160`) DOWN against the ~70-80% budget; iterate on the LIVE render; re-balance the
   satellite orbit if needed. Lint + typecheck.
5. **Flip the default identity (F1 + slice-13 F3).** `lit:true` + a low iridescence/SSS/coreGlow floor; DELETE
   the zero-regression flag-gating; re-anchor the normal/thickness/dome on the contained body in
   `metaball.frag.ts`. Validate the dome variance on the live render.
6. **Derive the warm-token default palette + the min-contrast rim guard (F6).** `GooBlob.vue` warm-token
   default through the ColorResolver; foreground-aware rim; re-point the three demo stories' color. Confirm
   every grid blob paints against light AND dark.
7. **Raise the membrane to a living-but-calm band (F3).** `noiseAmp`/`warpAmp` up to the proportional floor;
   liquid FBM constants + de-synced breath in `watercolor-edges.glsl.ts`. Validate the silhouette deviation.
8. **Re-balance the interaction magnitudes (F2).** Re-scale `pointerStrength`/`stretch`/`clickImpulse` + the
   trail radius against the smaller body; confirm a legible lean + pseudopod under a synthetic gesture.
9. **Run the bbnf-buddy PRM-freeze census.** Confirm the substrate freeze is reachable; record the census +
   route the consumer-adoption fix to W34.
10. **Gate GREEN.** Confirm the EXTENDED `proof:blob-render` passes; run the VISUAL-TRUTH live audit across all
    three stories × ≥3 viewports × light/dark; capture the paired-π BEFORE/AFTER + DELTA
    (un-contained-cold-flat → contained-lit-warm-living); write `audit/W15-blob-contained-droplet.json` to
    GREEN with the POS_SCALE ratification record + the PRM census.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W15-blob-contained-droplet.json` — the born-RED→GREEN ledger: the live RED witnesses
  (the post-W08 ~1.34× footprint reach reproduction, the near-flat default RGB, the dead-arc membrane, the
  invisible-interaction read, the cold-blue demo binding + the `var(--primary)`-dark wash), the per-finding
  (F0/F1/F2/F3/F6 + slice-13 F3) disposition, the re-derived geometry budget (final body/sat/orbit + the
  achieved ~70-80% footprint fit), the flipped default-identity values (lit + the iridescence/SSS/coreGlow
  floor), the membrane displacement band, the re-balanced interaction magnitudes, the POS_SCALE-disposition
  ratification record (KEEP W08's regime, drop the excision language), and the bbnf-buddy PRM-freeze census.
- `tests-visual/blob-render.spec.ts` (EXTENDED) — the W15 rendered-pixel assertions (tighter containment band +
  dome luminance-variance + silhouette deviation + centroid shift + light/dark) layered on W08's gate.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the post-W08 un-contained-cold-flat
  screenshots vs the contained-lit-warm-living screenshots across all three stories × ≥3 viewports × light/dark,
  with the footprint-fit delta (~1.34× → ~0.7-0.8×), the dome-variance delta, and the silhouette-deviation
  delta annotated. Closes the "PENDING" W9 browserVerify.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(blob): proof:blob-render extended — containment-band + dome-variance + silhouette + centroid + light/dark assertions born-RED (AX.W15)`
2. `feat(blob): re-derive body/satellite/orbit as one footprint budget — contained droplet within ~70-80% of the wrapper (AX.W15 F0)`
3. `feat(blob): ship the lit warm-glass droplet as the DEFAULT identity — delete the zero-regression flag-gating (AX.W15 F1)`
4. `feat(blob): derive the default palette from glass-ui warm tokens + a foreground-aware min-contrast rim (AX.W15 F6)`
5. `feat(blob): raise the membrane to a living-but-calm warped-FBM band + de-sync the breath pulse (AX.W15 F3)`
6. `refactor(blob): re-balance pointer/stretch/click magnitudes against the new smaller body (AX.W15 F2)`
7. `chore(demo): re-point the three blob stories' default color to the warm house identity (AX.W15 F6)`
8. `chore(AX.W15): audit ledger GREEN + paired-π un-contained→contained-lit BEFORE/AFTER + DELTA + POS_SCALE ratification + PRM census`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause (K W0). These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W08 (blob core unblock) — HARD (the sole dependency).** W08 un-floods the smin over-merge (the
  canvas-filling slab → a bounded field) and decides the POS_SCALE disposition W15 inherits. W15 PERFECTS the
  look on the un-flooded field: containment is meaningless on a flooded slab, the lit dome is invisible under
  the over-merge, the membrane is sub-pixel-clipped, and the interaction has no contained silhouette to
  deform. The two are sequential, not concurrent — W15 cannot run until W08's un-flood lands. W15 INHERITS
  W08's `proof:blob-render` gate (extends the thresholds, never re-authors) and W08's POS_SCALE regime (the
  ratified MINIMAL-un-flood). Charter §3 dependsOn = AX.W08; this is the ONLY dependency. (Transitively W08
  dependsOn W00, so W15 inherits the π lane it closes on.)
- **Downstream:** **AX.W16** dependsOn W08 + W15 (the pause/resume seam, the `resolveTokenColor` leaf, the
  demand-gate quiescence, the multi-instance shared context, the perf trim, the research README rewrite + the
  defineExpose-currency gate — all on the contained lit droplet W15 ships). **AX.W34** receives the value.js
  goo-blob fork consumer-adoption note + the bbnf-buddy PRM-freeze census-fix (both gated behind W08/W15/W16
  landing the droplet). **AX.W25b** (CSS encapsulation) dependsOn W08 + W16 + W20.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`799d5a8`** (W9.a smin-normalization) + merge **`a47d293`** (W9 cohort) — the over-merge regression W08
  un-flooded; the geometry constants (`bodyRadius`/`orbitRadius`/`satelliteRadius`) were never re-balanced
  against the new normalized smin scale (slice-12 F0 root: "uSmoothK, uBodyRadius, satellite radii/positions
  and the trail were never re-balanced against the new normalized smin scale"). W15 is the wave that finally
  re-derives them as ONE budget.
- **The W9.b lit-droplet + W11.a iridescence/SSS work** — SHIPPED but defaults OFF (`lit:false`,
  `iridescence:0.0`, `sssScale:0.0`, `coreGlow:0.0` in `types.ts:185-192`) behind a "zero regression"
  flag-gating instinct. The lit block (`metaball.frag.ts:351-374`), the Fresnel (`:301`), the thickness
  (`:300`), the iridescence (`:311-321`), the surfaceNormal (`:298`), the warmCream tint (`:359`), the rim
  from `uRimColor=var(--foreground)` (`:368`) all EXECUTE CORRECTLY but are invisible — swamped by the oversize
  field AND gated off by default. W15 flips the default identity ON so the already-shipped SOTA work paints.
- **The W11.b multi-stop palette** (`paletteStops:[]` default, `deriveBlobPalette` in `/color`) — the
  warm-token default-palette derivation hook W15 turns ON for the cream-glass marriage.
- **`PATH-FORWARD.md` §3 / §4 / §5** — the liquid-not-rocky FBM constants (~1.8 / ~0.42), the de-synced breath,
  the token-derived warm-cream default, and the half-res/quality axis — all AUTHORED but NEVER APPLIED. W15
  applies §3 (membrane) + §4 (warm default); the §5 perf trim routes to W16.
- **The static-gate blob cohort** (`proof-blob-smin-normalized.mjs` + `gradient-unit-length` / `spec-premult`
  / `space-gamma` / `mood-resolved` / `tempo-suppression` — all pure-math/static, zero rendered pixel;
  `package.json:593-617`) — the canonical AW headless-green/visually-broken false-green the `proof:blob-render`
  rendered-pixel gate (W08) + its W15 extension supersede.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the 84.1% canvas-coverage slab is
  live-proven here across all three stories (the audit's saved screenshots `blob-goo-story.png` /
  `blob-interaction.png` / `blob-mood.png`). W15's born-RED baseline is the POST-W08 tree (un-flooded but
  un-contained / cold / flat / dead-membrane).
- **Constellation lineage:** the value.js `demo/@/components/custom/goo-blob/` fork (343-line local
  `useMetaballRenderer` + 3 mount sites) waits on this droplet to retire (→ W16/W34); bbnf-buddy ships the SAME
  WCAG 2.2.2 gap on 4 perpetual mascot rAF loops (`animation/runtime.ts:710-762`, `app/useHoloRotation.ts:30-46`,
  `composables/useFavicon.ts:75-89`, the emotion-preview thumbnails — `grep prefers-reduced-motion src/` → 0
  hits, live 2026-06-07) — the W15 census confirms the substrate freeze is reachable; the fix routes to W34.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-D binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path (one POS_SCALE regime — §4 note 13; no-legacy, no-workaround).** The geometry is re-derived as
  ONE footprint budget against W08's coordinate system — `bodyRadius`/`orbitRadius`/`satelliteRadius` solved
  TOGETHER, not nudged per-constant. The POS_SCALE disposition is RATIFIED (KEEP W08's regime, drop the
  slice-12 excision language as scope-creep) so the coordinate-system decision is made ONCE and inherited,
  never re-litigated across the wave seam; IF a full raw-normalized re-expression is ratified instead, it is
  ONE atomic re-derivation of the ENTIRE length cohort in this single wave with `proof:blob-render` as the
  regression-lock — NEVER a partial migration that re-floods. MUST NOT introduce a second normalizer or a
  per-config geometry fudge. The "zero regression" default-OFF flag-gating is DELETED as the legacy/fallback
  path the §0 mandate forbids — the default IS the SOTA look (one path, no opt-in tier).
- **substrate-with-consumer / wire-before-retire.** The blob is a real consumed substrate (`/goo-blob`
  subpath; the value.js downstream fork + the demo grid). W15 makes the substrate paint its claimed contained
  lit warm-glass identity FIRST; the value.js fork retirement is NOT silently dropped — it is routed to W16/W34
  with a named adoption note (the library fix lands BEFORE the consumer adopts, after the droplet is
  device-true). The bbnf-buddy PRM-freeze gap is routed to W34 with a census confirming the substrate freeze is
  reachable (the freeze is the already-shipped `useWebGLCanvas` PRM-monitor — substrate-with-consumer, not a
  re-implementation).
- **fail-explicit (vs befitting-silent browser-API degradation).** The un-contained / flat / cold / dead-membrane
  defect is a library-internal look defect — it is FIXED at its root + LOCKED by a rendered-pixel gate that
  goes RED on a re-oversize or a flat-fill, NOT papered over. The PRM-freeze (the `prefers-reduced-motion` arm)
  stays a BEFITTING-SILENT browser-API degradation in the `useWebGLCanvas` substrate (NOT collapsed with the
  internal look defect — the two are never collapsed). The static-math blob gates that certified the broken
  render green are the silent-failure class the rendered-pixel gate converts to a loud RED.
- **no-overfitting.** The re-derived geometry/identity/membrane/magnitude constants are tuned against the LIVE
  rendered field (the ~70-80% footprint, the dome variance, the legible interaction), NOT fitted to the gate's
  threshold. NO new interaction code is written (F2 — the existing wired spring/trail/squash/mood is made
  legible by containment, not re-built); the dead-default flags are turned ON, not duplicated. The cold/neon
  presets are kept as explicit consumer opt-in, not baked into the library default.
- **presets-in-consumers (glass-ui MEMORY).** W15 re-derives the library's OWN default identity
  (`BLOB_CONFIG_DEFAULTS` geometry + lit + warm-token palette) as the lib's identity evolves — the contained
  lit warm-cream droplet IS library identity, not a consumer preset. Named cold/neon themed presets live in the
  consumer (value.js supplies only its color through the injected ColorResolver seam — a clean preset boundary,
  never the geometry/identity scale).
- **canonical-readme-shape (the band-D README precept).** W15 makes the README's "warm-cream glass identity"
  claim TRUE by shipping it as the default (the README itself is NOT rewritten here — the full research-backed
  README rewrite + the planned→landed sweep + the defineExpose-currency gate is W16's close; W15 ships the
  identity the README documents). No "planned" survives for the now-landed lit warm-cream default.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates + §π).** The close is a
  render-and-readback artefact on a real device (the precept-valid form) + the executed live Playwright +
  frontend-design audit across all three stories × ≥3 viewports × light/dark — NEVER a headless proof alone
  (the cardinal AX precept, "Runtime Truth Beats Source Claims"). The π β-lane visual-load-bearing-ness bar is
  met: the blob is a shipped substrate that rendered an un-contained, un-lit, cold, dead-membrane frame; W15
  makes it paint the contained lit warm-glass living creature and proves it live — closing the "PENDING" W9
  browserVerify the gate-fleet falsely assumed-done.
- **no-silent-deferrals / goal+completion-criterion paired.** The W15 goal (a contained lit living warm-glass
  droplet) is paired with the EXTENDED `proof:blob-render` completion criterion at the wave unit; the W16
  integration/perf/README work is explicitly ROUTED (not deferred-to-next-tranche); the value.js fork + the
  bbnf-buddy PRM census-fix are ROUTED to W16/W34 with named adoption notes; the POS_SCALE disposition is a
  RATIFIED decision carried in the artefact, never re-litigated.
