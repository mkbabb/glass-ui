# GooBlob — the path forward (the AW blob perfection plan)

The concrete plan to make the blob *stunning*: a genuinely lit, iridescent, glass-native
droplet over the already-strong organic SDF + smin field, a soft-body squish + a felt
interaction model, the orphaned mood/state system either wired or excised, a derive-color
OKLCh palette parallel to aurora's, the performance budget, and the WebGPU evaluation with
Baseline dates. Synthesized from the 32-agent SOTA research fan
(`docs/tranches/AW/audit/research/` + the 32 cited briefs). This is tranche-development —
it plans the AW blob waves, it writes no `src/`. Grounded against glass-ui HEAD `afdc485`.

---

## 0. Where the blob already is (the baseline the plan builds on)

The blob is **not a blank slate, and not an SVG goo-filter** — it is already a sophisticated
single-pass WebGL2 SDF metaball. Reading the live shader set + composables, the field
machinery and color science are genuinely SOTA; the gaps are surface, motion-physics, and a
half-built interaction model. Naming the baseline precisely is what sharpens the gaps.

- **Field** — an `sdCircle` body + up to 4 orbiting satellites merged with the Inigo Quilez
  **quadratic-polynomial smin** (`sdf-body.glsl.ts:16-19`), FBM-displaced organic edge
  (`metaball.frag.ts:134-137`), `fwidth`-derived analytic AA (`:149-150`). This is the
  modern, correct substrate — per-pixel GPU field, not a CPU marching-squares or SVG
  `feGaussianBlur` fake (briefs 1, 2, 12, 19 all confirm: keep it, do not regress toward the
  cheap fakes).
- **Color science** — a faithful OKLCh path: gamma-sRGB base → linear → OKLab → OKLCh,
  per-pixel L/C/h perturbation off an FBM color field, hue-preserving bisection gamut clamp
  (`oklch-perturb.glsl.ts:16-31`), then the **MANDATORY `linearToSrgb()` OETF**
  (`metaball.frag.ts:159-173`). This is *ahead* of nearly every reference blob on the web,
  which perturb in gamma sRGB/HSV and ship muddy (briefs 7, 9, 20, 25, 27 all confirm).
  Locked by `proof:blob-space-gamma` + `proof:blob-color-equivalence`.
- **Shared chunk** — the OETF + the four Ottosson matrices + `FBM_ROT` are spliced from the
  single `procedural-color.glsl.ts` source both the blob and aurora compose (AV.W2), so the
  OETF can never diverge between them (`metaball.frag.ts:20-22, 96-113`).
- **Substrate** — `useWebGLCanvas` (WebGL2) with offscreen-park, content-visibility pause,
  tab-backgrounded pause, **live `prefers-reduced-motion` freeze**, DPR clamp at 2×, and a
  `DockBackgroundToggle` (WCAG 2.2.2) pause. Mature; brief 26 + brief 32 both say leave it.
- **Motion** — a deterministic seeded-PRNG satellite state machine (`orbiting → merging →
  absorbed → emerging`, `useBlobSatellites.ts`), a 5-mood cross-fade engine
  (`useBlobMood.ts`), a sine pulse, and a smoothed pointer (`useBlobPointer.ts`).

So the **four real gaps**, each named precisely:

1. **The body is FLAT-shaded — a colored silhouette, not a droplet.** The fragment shader has
   *zero lighting model*: no surface normal, no specular, no Fresnel rim, no SSS — only one
   weak inner-edge lightness lift (`edgeGlow`, `metaball.frag.ts:166-168`). It reads as a soft
   sticker, not glass. **Every one of the 32 briefs names this as the single biggest visual
   lever** (briefs 1, 4, 5, 7, 8, 9, 10, 20, 24, 29). The SDF gradient — already half-computed
   for the `fwidth` AA at `:149` — is a free fake normal; that one quantity unlocks specular,
   rim, iridescence, and SSS.

2. **Motion is pure sine/orbit kinematics — no physics, no spring, no squish.** Pulsation is a
   bare `sin(uPulsePhase)` (`metaball.frag.ts:131`); the pointer is a fixed-α exponential lerp
   (`useBlobPointer.ts`, framerate-dependent); orbits are closed-form. Nothing carries
   momentum, overshoots, or settles. The blob reads *animated* but not *alive* (briefs 3, 18,
   19, 24, 27, 30). glass-ui already ships `@mkbabb/keyframes.js` springs — the blob reinvents
   a weaker lerp instead of borrowing the house spring.

3. **The interaction model is built but unwired — the headline finding.** `setMood`, `nudge()`,
   `currentMood` are exposed (`GooBlob.vue` `defineExpose`) but **no consumer ever calls
   `setMood`** — every blob lives and dies in `idle` (briefs 30, 31, 32). `pointerAttraction`
   defaults to `0.0` (`types.ts:122`) and idle adds `0.0` (`useBlobMood.ts:16`), so **at rest
   the pointer does nothing visible**. Two of the eleven mood params — `orbitSpeedScale`,
   `wobbleScale` — are *dead*: lerped every frame in `useBlobMood` (`:84-85`) but never read by
   `useBlobSatellites.tick` (which consumes only `mergeRate`). ~140 lines of the richest
   subsystem paint nothing the user sees. Per the overfitting-audit precept (≥2 sites or
   exported-and-consumed) this is substrate-without-consumer: **wire it or cut it.**

4. **Glass integration is shallow — a sticker ON glass, not goo IN glass.** The only tie to
   glass-ui is a CSS `drop-shadow` on the wrapper (`GooBlob.vue:127-139`). The blob consumes
   none of glass-ui's specular/glass/halo token vocabulary, no warm-cream backplate, no inner
   translucency that lets `--background` glow through. Tier derivation uses `color-mix(in srgb)`
   where `in oklch` is now Widely-Available (briefs 22, 31). The house identity is warm-cream
   glassmorphism; the blob ignores all of it.

The throughline: **the field + color + substrate are SOTA-solid; the surface, the motion
physics, and the interaction model are the work.** None of it is a rewrite — every fix layers
onto the existing single-pass fragment shader + composables.

---

## 1. The lit droplet — surface material (the headline)

Make the blob read as a *drop of warm glass*, not a flat colored shape. This is the single
biggest premium delta and it is unanimous across the research. It builds on one keystone every
other surface technique consumes.

### 1a. The keystone — SDF gradient → fake normal

Every surface upgrade wants the same input: a per-pixel surface normal. For a 2D SDF it falls
out of the field *for free* — the gradient of an SDF is the outward surface normal, unit-length
by construction. Two routes, both cheap:

- **Screen-space derivatives** — `vec2 g = normalize(vec2(dFdx(d), dFdy(d)))`. The blob *already
  calls* `fwidth(d)` (= `|dFdx(d)| + |dFdy(d)|`) for AA at `metaball.frag.ts:149`, so the
  derivatives are paid for. This tracks the *real* merged isosurface including satellites + FBM
  wobble, so highlights bend correctly across a smin seam.
- **Analytic gradient** — promote `sdCircle` to the IQ `sdgCircle` form
  (`vec3(length(p)-r, p/length(p))`, IQ *Distance + Gradient functions 2D*); blend gradients
  through the smin alongside distance for an exact body normal, with the `dFdx/dFdy` fallback
  for the merged satellite field.

Then lift to a pseudo-3D normal — treat the SDF interior as a rounded dome so the height (and
normal Z) rises toward the center: `float h = sqrt(max(0.0, -d / bodyR)); vec3 N =
normalize(vec3(g * (1.0 - h), h));`. This **subsumes the lone `edgeGlow`** (`:166-168`) rather
than adding to it. **Land it first** — it is the dependency root for §1b–§1e.

**Citations:** IQ, *Distance + Gradient functions 2D* (`iquilezles.org/articles/distgradfunctions2d/`);
shaderfun, *SDF Part 8: Gradients, Bevels and Noise* (2018-07-23); Clockwork Chilli, *3D Shaders
In A 2D World* (sphere normal from a circle). All accessed 2026-06-06.

### 1b. Specular + Fresnel rim — the glass read

With the normal in hand, add the two terms that flip "silhouette" to "wet droplet", both in
*linear light before the OETF* (the existing OKLCh path's exit, `metaball.frag.ts:172-173`):

- **Blinn-Phong specular** — `H = normalize(L + vec3(0,0,1))` (view ≈ +Z for a flat canvas),
  `spec = pow(max(dot(N,H),0.0), shininess)`. A tight white-ish glint (shininess 16–64) reads
  as wet glass; a second broad lobe (shininess 4–8) reads as gel sheen. Tint the specular
  **warm-cream, not pure white**, so it sits in the glass-ui palette (brief 1 F8, brief 4).
- **Fresnel/Schlick rim** — `rim = pow(1.0 - max(dot(N, vec3(0,0,1)), 0.0), p)` (p ≈ 2–3 for a
  soft watercolor rim, not the harsh 5). Tint the rim toward `--foreground` — that warm rim
  where the blob meets the page is what *marries it to glass-ui* instead of the cold blue rims
  of generic liquid-glass libs.

Combine via `max(spec, rim*scale)` so it reads as one soft highlight, not two.

**Critical premultiplied-alpha caveat (brief 10, brief 20).** The blob outputs premultiplied
(`fragColor = vec4(rgb*alpha, alpha)`, `:176`). A bright specular on a semi-transparent surface
renders *wrong* unless the light is folded into `rgb` **before** the `*alpha` premultiply — add
after and it double-darkens. The fix is trivial here (the OETF + premultiply are the last two
lines); the wave ships a `proof:blob-spec-premult` gate asserting light enters before the OETF.

**Citations:** Codrops, *Interactive droplet-like metaballs with Three.js and GLSL* (Yuki
Kojima, 2025-06-09) — the canonical premium-metaball reference; imadrahmoune, *How Apple's
Liquid Glass probably works* (2D-SDF fake normal + rim + IOR); Ronja, *Fresnel*; Lettier,
*3D Game Shaders — Fresnel factor / Rim lighting*; three.js #5810 + webglfundamentals
*WebGL and Alpha* (the premult caveat). All accessed 2026-06-06.

### 1c. Iridescence — the oil-slick/soap-film sheen, warm-biased

The "mesmerizing" axis. Drive an Inigo Quilez cosine palette `a + b*cos(2π(c*t + d))` by the
Fresnel/edge angle `t` (from §1b), mixed into **OKLCh hue** so it stays perceptually clean and
in-gamut. This is the artist-friendly, cheap path — one `cos` eval, no spectral 81-sample loop
(briefs 7, 8, 25 converge here; physically-based thin-film and the Belcour–Barla Airy BRDF are
the cited ceiling and **deferred** — overkill and too saturated for a lit-less warm-cream
surface).

The taste constraints are load-bearing (brief 8): **subtle, not maximal rainbow** ("2026 is the
year of human taste"). Default `iridescence` LOW; bias the palette `d` phase + clamp chroma so
the sheen stays in the warm-pearl band that matches `--shadow-color: var(--foreground)`. Feed
`t` from the rim + the existing FBM color field + an animated thickness map (reuse the edge FBM,
`watercolor-edges.glsl`) so the bands drift/shimmer — the soap-bubble look — using uniforms
already plumbed (`uColorNoiseSpeed`, `uTime`). Mix the spectral term onto `oklch` **before**
`gamutClampOklch` (`:170`) so it inherits the hue-preserving clamp + the mandatory OETF; extend
`metaball-color.glsl-port.ts` + `blob-color-equivalence.test.ts` in the same wave.

**Citations:** IQ, *Procedural Color Palettes* (`iquilezles.org/articles/palettes/`); Varun
Vachhar, *Iridescent crystal with raymarching and SDFs* (the `spectrum(dot(N,V)*k)` recipe);
Alan Zucconi, *Improving the Rainbow 2* + *Thin-Film Interference* (the `spectral_zucconi6`
alt-path, opt-in stretch); Belcour, *A Practical Extension to Microfacet Theory* (SIGGRAPH 2017
— the deferred ceiling). All accessed 2026-06-06.

### 1d. Fake subsurface translucency — the jelly/gel read

A 2D SDF gives *thickness* for free: inside the blob `d < 0`, so `-d` is the depth from the
nearest edge. Two SSS terms layer on the normal + thickness (briefs 5, 9):

- **Thickness-driven inner luminosity** — replace the flat `edgeGlow` with a thickness ramp off
  `-d`: a brighter/warmer translucent core fading to a light-leaking edge, in OKLCh L. The
  single biggest "read-as-gel" win.
- **Translucent back-light (fast-SSS)** — the canonical Zucconi/Alisavakis term
  `pow(saturate(dot(V, -(L + N*distortion))), power) * scale * (1 - thickness)` so thin edges
  glow and the thick core stays dense. Lifts OKLCh L + warms hue slightly.

This is the "wax/jade" cue (Wikibooks *Translucent Bodies*: fake-SSS reads as wax/jade *when
combined with specular* — which §1b supplies). The multipass/raymarched thickness variants
(GPU Gems 16, MultipassTranslucency) are explicitly **rejected** — `-d` gives thickness for
free; no extra passes.

**Citations:** Alan Zucconi, *Fast Subsurface Scattering in Unity Pt.1* (2017); Harry
Alisavakis, *Simple Subsurface Scattering* (the `(1-thickness)` modulation); inspirnathan, *Glow
Shader in Shadertoy* (`glow = k/abs(d)`); GLSL Programming / *Translucent Bodies* (Wikibooks).
All accessed 2026-06-06.

### 1e. Tonemap + dither — the filmic finish (cheap, do alongside)

Two finishing operators close the premium quality gap:

- **Khronos PBR Neutral tonemap, NOT ACES/AgX.** The blob's input is one in-gamut warm-cream
  brand color, lightly perturbed — *not* an HDR scene. ACES/AgX are built for HDR linear input
  and *desaturate by design*, muting the exact warm-cream identity (brief 27, citing the
  three.js forum + Khronos). PBR Neutral is purpose-built for brand-color fidelity: a 1:1 match
  up to a headroom, then a graceful soft-compress of only the out-of-gamut highlights —
  replacing the current hard `clamp(0,1)` (`:173`). Short, linear-RGB, drops in before the OETF,
  co-locate in `procedural-color.glsl.ts` for aurora reuse. Note: aurora ships **ACES** because
  it *is* an HDR-ish painterly compose; the blob is the LDR brand-color case — different operator
  by design, both correct.
- **Interleaved Gradient Noise (IGN) dither.** The blob's smooth low-contrast OKLCh body +
  inner-glow ramp is the textbook 8-bit banding case, and warm-cream is the worst case. One
  texture-free line post-OETF: `rgb += (1.0/255.0)*ign(gl_FragCoord.xy) - 0.5/255.0`. Aurora
  *already ships this* (the AV.W1 IGN dither, `aurora.frag.ts:330-343`); the blob is missing it
  — brief 31 names it the **#1 visible-defect fix**. Bayer-8 is the alternative; IGN is the
  better match for moving content and aurora-consistent.

**Citations:** Khronos, *PBR Neutral Tone Mapper* (2024); three.js `tonemapping_pars_fragment.glsl.js`
(the verbatim Neutral GLSL); three.js forum, *Is AGX implemented correctly?* (2024); frost.kiwi,
*How to fix color banding* (IGN GLSL); Codrops, *Bayer Dithering for WebGL Backgrounds*
(2025-07-30). All accessed 2026-06-06.

---

## 2. The soft-body squish + the interaction model

Make the blob *alive* — it leans, squashes, reaches, and settles. This is the second-biggest
delta after the lit surface, and it is where the unwired interaction model gets resolved.

### 2a. Spring-driven pointer — frame-rate-independent, with weight

Replace `useBlobPointer`'s fixed-α exponential lerp (`SMOOTH_FACTOR = 0.12`, framerate-dependent
— at 120 Hz it tracks ~2× faster than at 60 Hz) with a **critically-damped spring** fed the
substrate's existing `dtMs` (`useMetaballRenderer.ts` already derives it). glass-ui ships the
spring runtime (`@mkbabb/keyframes.js` / `useSpringOrchestrator`) — reuse it, don't hand-roll
SmoothDamp. Critically-damped (ratio ≈ 1) = clean settled arrival (premium/serious); drop
slightly under 1 for a tasteful 1–2-cycle release wobble. The spring also yields **velocity for
free** — the input §2b needs. This single change flips the blob from "smooth gradient" to
"alive" (briefs 3, 18, 20, 27, 30).

### 2b. Velocity-driven squash-and-stretch — the cheapest "alive", zero sim

Track the blob's center-of-mass velocity (from the spring §2a + satellite pulls) and apply a
**volume-preserving anisotropic scale** — stretch along the motion direction, compress
perpendicular, magnitude ∝ |velocity| (`scale: squashRatio, 1/squashRatio`, subtle 25–50% per
Comeau). In the fragment shader this is a 2×2 domain warp on `uv` before `sdCircle` — a couple of
uniforms (`uVelocity`, `uStretch`), no particles. Converts a rigid sine-pulse blob into one that
visibly leans-and-squashes on a pointer flick or a satellite slam-home. The mood/energy system
(§2d) is the natural home for the squash gain.

**Why not a full soft-body sim?** The research is explicit (briefs 3, 6, 14): the pressure
soft-body (Charlotte Dann / Matyka) and Verlet control-ring are the gold-standard *look* but
require moving from "circle SDF + warp" to "SDF built from a deforming control polygon" — a
render-model change. Velocity-skinning gets ~80% of the feel on the existing substrate.
**Recommendation:** ship velocity-squash now; log the Verlet control-ring (feed N ring points as
metaball sources — the renderer already consumes point sources) as a documented *stretch* seed,
and full pressure soft-body as deferred. Don't build the sim unless jiggle becomes a headline
goal.

### 2c. Wire the interaction — pointer-follow, click-squish, reach-toward

Close the "looks inert" gap and make the exposed seams live:

- **At-rest reactivity** — give `idle` a small non-zero `pointerAttraction` (or flip the
  `BLOB_CONFIG_DEFAULTS.pointerAttraction` to > 0) so hover *always* deforms the blob toward the
  cursor. Honor the *sign* of `pointerAttraction` in the shader (today the deform is hardcoded
  repulsion, `uv -= …`, even though `sleepy` sets it negative) so `curious` leans in and `sleepy`
  shies away.
- **Reach-toward droplet (the Codrops trail)** — replace the single global UV pull with a short
  decaying-radius pointer trail (N ≈ 8–15 positions) smin-merged into the body, reusing the
  satellite/`MAX_SATS` plumbing — the blob *stretches an elastic pseudopod toward the cursor* and
  snaps back. Far more premium than the uniform shove. Opt-in via the `pointerAttraction` axis,
  PRM-gated.
- **Click squish** — wire the existing `click` emit to a one-shot spring impulse on
  `pulseAmp`/`smoothK` (overshoot then settle) — a felt "boop". Subsumes the discrete `nudge()`.

### 2d. The mood/state system — wire it or cut it (the headline decision)

The blob ships a full 5-mood valence/arousal-shaped engine that paints `idle` forever. **Resolve
it one of two ways, and pick at wave planning:**

- **(A) Wire it to interaction (the creature framing).** Drive `setMood` internally from
  pointer/idle state: `curious`/`happy` on pointer-approach, a brief `excited` pulse on click,
  `sleepy` after an inactivity timeout, back to `idle`. AND actually consume the two dead params
  (`orbitSpeedScale`, `wobbleScale`) in `useBlobSatellites.tick`. Reframe `MOOD_TARGETS` as
  *derived* from a 2-axis `{valence, arousal}` model (arousal → speed/amplitude, valence →
  warmth + squash sign) so adding a mood is two numbers, not eleven (brief 18). Add a global
  squash/stretch axis to `MoodParams` (§2b). Keep `setMood`/`currentMood` exposed for manual
  override.
- **(B) Collapse it (KISS).** If the team decides the named-creature framing is out of scope,
  *delete* `useBlobMood` per no-backwards-compat and replace with a single `energy` scalar (0..1)
  driving pulse/noise/orbit-speed/merge-rate together. Don't ship orphaned substrate.

Either way: **the demo story must exercise whatever ships** — the current story
(`demo/stories/substrates/goo-blob.vue`) mounts static swatches and proves zero interaction, so a
feature with no demo consumer is invisible to the next overfitting audit. A new interactive
playground story (mood switcher, hover-follow, click-squish) is the honest 2nd consumer.

**Accessibility is binding (briefs 16, 26).** Every new interactive/motion axis must collapse
under `prefers-reduced-motion` — the substrate already freezes to one static frame; the new
spring/squish/trail must hook the *same* gate (no parallel rAF), degrade to instant/no-op, and
stay reachable by `DockBackgroundToggle`'s `pause()`/`resume()`. The reduced-motion frame should
be a *composed* rest pose (peak roundness, satellites at a designed arrangement), not a random
freeze — a designed poster, not nothing (brief 26).

**Citations:** Josh Comeau, *Spring physics* + *Squash and Stretch*; *Velocity Skinning for
Real-time Stylized Skeletal Animation* (arXiv:2104.04934); Charlotte Dann, *Soft-blob physics* +
Matyka, *Pressure Model of Soft Body Simulation* (arXiv physics/0407003 — the deferred sim);
slsdo, *Blob Family* (Verlet ring → metaball, the stretch seed); Codrops droplet (2025-06-09 —
the pointer trail); voiceorb / SmoothUI Siri Orb (the state-machine analogue); A List Apart,
*Designing Safer Web Animation*; web.dev, *prefers-reduced-motion*; WCAG 2.2.2/2.3.3. All
accessed 2026-06-06.

---

## 3. Organic motion + the seamless loop (the membrane refinement)

The body's "life" today is single-frequency Cartesian noise + one perfectly-periodic sine —
which reads mechanical. Three cheap shader-side refinements give it a living-membrane quality,
and one closes the loop.

- **Domain-warp the edge noise** (briefs 1, 6, 17, 21, 24). Wrap the single-octave edge FBM
  (`metaball.frag.ts:134`) in one IQ warp pass `fbm(uv + W·fbm(uv))` before `sdCircle` — the
  highest-leverage organic upgrade, "wobbly circle" → "living membrane", reusing the shared
  `FBM_ROT` chunk. The intermediate warp vector also feeds the OKLCh hue perturbation for
  coherent color motion. Two-layer warp gets the look at ~33% less cost than three.
- **Liquid-tune the FBM + de-sync the breath** (brief 6). Body-loop lacunarity 2.0→1.8,
  persistence 0.5→0.42 ("liquid, not rocky"); replace the single `sin(uPulsePhase)` with 2–3
  detuned sines at *irrational* frequency ratios so the breath never perfectly resyncs. Tune the
  idle breath to the human calm band (~6 bpm ≈ 10 s cycle), slightly asymmetric (slower exhale) —
  reads as "a calm living thing breathing", not an oscillator.
- **Tendril/wisp option via curl noise** (brief 21, stretch). With analytic-derivative gradient
  noise (a `noised()` upgrade of the value-noise core, brief 1 F5 — which *also* feeds §1a's
  normal for free), advect the edge tangentially via divergence-free 2D curl to grow flowing
  filaments — the only path to true tendrils. Gate behind a `tendril` config + the energy system.
- **Seamless loop closure (optional mode)** (brief 28). The motion is open-ended linear `uTime`
  today (hidden by stochastic satellite durations — a valid "no-seam-via-unboundedness" strategy).
  For a *composed* breathing cycle that's GIF/poster-capturable, add a `loopMode:
  "stochastic" | "closed"` axis: map `uTime` to a circle (`cos/sin` over a `uLoopPeriod`) so the
  field returns to itself. Add the mode, don't replace the default.

Also fold the **normalized IQ smin** here (briefs 1, 4, 14, 17, 20, 28): the current `smin` is
the pre-2024 un-normalized `h*h*k*0.25` form, so `uSmoothK` is in arbitrary units and a `/0.22`
magic normalizer fudges it in the renderer. The 2024 rewrite's `k *= 4.0` makes `k` a real
blend-thickness in distance units and retires the magic divisor — and unlocks the **material-blend
`vec2 smin`** (returns `(distance, blendFactor)`) so a satellite's color blends *through the goo
seam* instead of popping at the merge (briefs 1 F3, 4, 11, 17, 20, 24, 29). Cheap depth-reading,
high polish-per-effort.

**Citations:** IQ, *Smooth Minimum* (2024 rewrite — normalization + circular smin + the `vec2`
material variant); IQ, *Domain Warping*; IQ, *Gradient noise with analytic derivatives*;
Damian van der Merwe, *Painting with Math: lava lamp shader* (the liquid-tuned constants +
irrational frequencies); shadergif, *How to Make a Perfect Loop in GLSL*; Bridson,
*Curl-Noise for Procedural Fluid Flow* (SIGGRAPH 2007); Apple Breathe (the human calm band).
All accessed 2026-06-06.

---

## 4. The OKLCh palette + the derive-color front door

The blob takes a **single** `uBaseColor` and perturbs it per-pixel — it has no multi-stop palette
like aurora's `deriveAurora` (brief 25 names this the central color gap). Premium 2025 metaballs
are *multi-color accumulation*, not one perturbed tint (Codrops blends two color fields; Paper
Design's metaballs ships up to 8 colors). The plan parallels aurora's color front door without
forking the core.

- **`deriveBlobPalette(seed, options)`** — mirror `deriveAurora`: one seed → 2–4 gamut-mapped
  OKLCh stops, distributed across body + satellites instead of one `uBaseColor`. **Reuse aurora's
  harmony vocabulary** — hoist `AuroraHarmony` + `deriveHue` + `gamutMapStop` into the shared
  `/color` leaf as a `ColorHarmony` type so the blob and aurora derive from one harmony source
  (keeps `proof:single-color-core` honest; no second divergent implementation). value.js stays
  the single color-math source. Note the bake-target split: aurora bakes to **linear**
  (ACES-tonemapped); the blob exits **gamma** (DEC-AT-7) — so the deriver returns space-neutral
  OKLCh stops and each component bakes to its own target.
- **Multi-stop shader** — generalize `metaball.frag.ts` from `uBaseColor` to `uPalette[N]` +
  `uStopCount` (aurora-parallel), interpolating in OKLab with deliberate shorter/longer hue-arc
  control + a midpoint chroma-bump (the OKLCh mid-gradient chroma sag is real, brief 25). Reuse
  aurora's buffer-reuse pattern to avoid GC churn on slider drag.
- **Warm-cream default** — derive the default palette from glass-ui tokens (a warm anchor /
  `--primary`) so an un-themed blob reads as belonging to the cream-glass system, not random
  neon. Named themed palettes live in the *consumer* per the presets-in-consumers rule.
- **Color-reactive pointer** (optional, brief 25) — let pointer proximity locally warm/brighten
  the palette near the cursor, so the blob "catches the light" where you touch it (reuses
  `uPointer`, zero new input plumbing, PRM-respecting).

**Citations:** oklch.fyi (OKLCh harmony from a seed); Toolbox365, *Gradient banding & OKLCH*
(shorter/longer arc, midpoint chroma); CSS-Tricks, *color interpolation*; Codrops droplet (the
two-color blend); shaders.paper.design/metaballs (the up-to-8-color premium reference);
arXiv:2502.16038, *Emotion-Aware Design: VAD* (mood → OKLCh axes). All accessed 2026-06-06.

---

## 5. The performance budget

The blob is fill-rate bound; the field machinery + offscreen-park are already mature. The plan
keeps the envelope intact and extends it. **The single most important fact: fill-rate is
quadratic in DPR** (brief 19), and the blob's frag runs FBM (3 octaves) *twice* per pixel plus a
full OKLCh round-trip — that ALU is paid for every pixel.

- **Half-resolution internal render + bilinear upsample (the headline perf lever, brief 19).**
  Render the metaball pass into a half-size buffer, upsample with the GPU's free bilinear filter.
  Blobs are the *ideal* half-res candidate — the soft FBM edge hides the interpolation — for
  ~4× fragment-cost reduction with near-zero visual delta. Gate behind a `quality` axis
  (`full | half`) so a hero blob opts into full-res. Keep it ONE extra blit, not a Kawase chain
  (the "no multi-pass blur on mobile" rule, briefs 19, 23).
- **Tighten the 1.6× oversize margin (brief 19).** The canvas is CSS-sized 1.6× the wrapper
  (2.56× the fragments) for satellite overflow, and most of it is transparent pixels that
  early-`return` *after* the two FBM calls already ran. A cheap pre-FBM bounding test
  (`length(uv) > maxReach → discard` before `fbm()`) and/or a measured-minimal oversize reclaims
  that wasted FBM cost.
- **DPR/quality tiers** — keep the DPR≤2 clamp; add a tier dropping weak mobile GPUs to DPR 1 +
  half-res. The new lighting/iridescence/SSS terms are per-pixel ALU on the *already-running*
  fragment — they land inside the existing frame budget, no new pass, no new rAF.
- **Substrate contracts extend to everything** — offscreen-park (`proof:offscreen-pause`), PRM
  freeze, `DockBackgroundToggle` pause must reach any new path; a parked rAF runs zero work.
  Keep the determinism contract (`mulberry32(hashString(color))`) — route any new physics noise
  through the same `utils/prng.ts` leaf. The `/goo-blob` subpath is a standalone chunk — size the
  lighting/palette additions against the published subpath budget (`profile:budget`); the aurora
  chunk's ~16 KiB-gzip is the class ceiling.

**Citations:** MDN, *WebGL best practices* (render to a smaller buffer + upscale); Khronos
public_webgl (Retina = 4× fragment work); Unity / catlikecoding (half-res + bilinear upsample);
Arm, *Bandwidth-efficient graphics* (SIGGRAPH 2015); Airtight Interactive, *60fps WebGL on
mobile* (no blur, supershader). All accessed 2026-06-06.

---

## 6. The WebGPU / particle-system evaluation — adopt now or stage?

**Verdict: do NOT migrate the blob to WebGPU compute or a many-particle system. Keep the
single-pass WebGL2 SDF.** This is unanimous and load-bearing across briefs 1, 2, 12, 13, 14, 19.

The reasoning: compute-shader particle accumulation is the SOTA for *thousands-to-millions* of
simulated bodies. The blob has **≤4 nuclei** (`MAX_SATS = 4`, body + ≤3 satellites), already
simulated cheaply on the CPU and uploaded as ~12 uniforms — *there is no accumulation
bottleneck*. The marching-squares "faster" argument is a CPU/JS framing that inverts on the GPU
(per-pixel field is free and gives a true smooth merge; marching squares is a smoothness
*downgrade*). The SVG `feGaussianBlur` goo-filter is strictly inferior (Safari/Firefox-broken
`feColorMatrix`, blur-radius perf, alpha-contrast color-crush) — keep it only as a documented
reduced-motion/no-WebGL2 *fallback note*, not work.

**Baseline dates (the load-bearing facts, briefs 13, 19):**

- WebGPU ships by default in **all four major engines as of 25 November 2025** (Safari 26 on
  macOS Tahoe / iOS 26 was the last engine; Chrome/Edge 113+ since May 2023; Firefox 141 Windows
  / 145+ Apple-Silicon) — officially **Baseline "newly available"** ("Baseline 2026").
- "Newly available" ≠ "widely available" — coverage ~70–95% with the fallback; Firefox
  Linux/Android in progress into 2026. A decorative warm-cream background cannot carry a hard
  WebGPU dependency without doubling the shader-maintenance surface.

**If WebGPU is ever adopted, it is a *substrate-wide* decision, never blob-local raw WGSL.** The
blob and aurora both compose `useWebGLCanvas` + the shared `procedural-color.glsl` chunk; raw WGSL
in the blob would fork every shader. The path (mirroring the aurora PATH-FORWARD §4) is a
`createGPUCanvas` sibling returning the same hook shape, hand-written WGSL (not Three.js/TSL —
the dep weight is wrong for glass-ui's peer-disciplined posture), single-sourcing the GPU math
before the second copy ships. **Park it as a documented non-goal with a revisit trigger:** a
future consumer needing ≥ ~1k simulated bodies — and then it takes aurora with it.

**The one richer-dynamics path that *is* WebGL2-doable** (brief 14, stretch): an N≈15–40-point
CPU Verlet swarm fed to the fragment shader as a **position texture** (uniform arrays cap ~512;
a float texture scales to thousands) for a "blob from many particles" look. Higher fidelity than
4 scripted satellites, far below SPH cost, all WebGL2. Log it as a *stretch* seed paired with the
soft-body §2b, not a near-term wave.

**Citations:** web.dev, *WebGPU supported in all major browsers* (2025-11-25) + *Baseline*;
caniuse webgpu; Chrome, *From WebGL to WebGPU*; Jamie Wong, *Metaballs and WebGL* (uniform-array
vs texture transport); shud.in, *metaballs* ("fragment shader is the standard for few balls").
All accessed 2026-06-06.

---

## 7. Sequencing

The dependency graph, ordered so the cheap transformative wins ship first and nothing blocks on
WebGPU:

```
        ┌─ AW.Wb·dither    (IGN dither + PBR-Neutral tonemap)              ── WebGL2 now, ~2 lines
 finish ─┤
        └─ AW.Wb·smin      (normalized smin + vec2 material-blend)          ── WebGL2 now, geometry

surface ─ AW.Wb·normal    (SDF-gradient fake normal — THE keystone)        ── WebGL2 now
            ├─ AW.Wb·spec      (Blinn-Phong specular + Fresnel rim, premult-correct) ┐
            ├─ AW.Wb·irid      (cosine-palette iridescence, warm-biased)            ├─ consume the normal
            └─ AW.Wb·sss       (thickness inner-glow + fast-SSS back-light)         ┘

 motion ─ AW.Wb·spring    (dt-spring pointer + velocity squash-and-stretch) ── WebGL2 now, keyframes.js
            └─ AW.Wb·interact  (wire pointer-follow/click-squish/reach-trail) ── consumes the spring
 mood   ─ AW.Wb·mood      (wire-or-cut the mood/energy system + demo)        ── pure TS

  loop  ─ AW.Wb·membrane  (domain-warp edge + liquid-FBM + de-synced breath) ── WebGL2 now

 color  ─ AW.Wb·palette   (deriveBlobPalette + multi-stop shader + shared harmony) ── WebGL2 now

  perf  ─ AW.Wb·halfres   (half-res render + oversize trim + quality tiers)  ── WebGL2 now

  docs  ─ AW.Wb·readme    (the research-backed README — this plan's consumer face)
```

The lit-surface arc (`normal → spec/irid/sss`) is the headline and the structural keystone; the
finish + smin + membrane + spring waves are cheap and ship immediately; the mood resolution and
palette are the API-shape waves; half-res is the perf hinge. **WebGPU and the particle swarm are
explicit non-goals** for this tranche — documented, with revisit triggers.

---

## Headline + the 5 highest-value adopts

**Headline:** the blob is already a SOTA single-pass WebGL2 SDF metaball with a
perceptually-uniform OKLCh color pipeline most reference blobs get wrong — so the path to
*stunning* is not a rewrite and not WebGPU, but layering a **lit, iridescent, translucent glass
surface** onto the SDF gradient it already half-computes, giving it **spring-driven soft-body
squish**, and **wiring (or cutting) the half-built mood/interaction model** that currently paints
`idle` forever. The field, color science, and substrate stay; the surface, the motion physics,
and the interaction are the work — all on the existing fragment shader.

**The 5 highest-value adopts:**

1. **SDF-gradient fake normal → specular + Fresnel rim (the lit droplet).** Derive a normal from
   the SDF gradient already paid for by the `fwidth` AA, add a warm-cream Blinn-Phong specular +
   a `--foreground`-tinted Fresnel rim, premultiply-correct (light before the OETF). Converts the
   flat sticker into a wet glass droplet — the single biggest premium delta, unanimous across the
   research. (Codrops 2025-06-09; imadrahmoune; IQ distgradfunctions2d.)

2. **IGN dither + Khronos PBR-Neutral tonemap (the cheap filmic finish).** One texture-free IGN
   line kills the warm-cream banding (aurora already ships it; the blob is missing it — the #1
   visible-defect fix); PBR-Neutral soft-compresses out-of-gamut highlights *without
   desaturating* the brand color (ACES/AgX are the wrong, HDR-built, muting tool here). Lowest
   cost, immediate quality win. (frost.kiwi; Khronos 2024; three.js forum.)

3. **Spring pointer + velocity squash-and-stretch (alive, not animated).** Replace the
   framerate-dependent lerp with a `dt`-normalized critically-damped `keyframes.js` spring
   (yielding velocity for free), then a volume-preserving anisotropic UV warp ∝ |velocity| — the
   blob leans, squashes, and settles with weight. ~80% of the soft-body feel, zero sim. (Comeau;
   Velocity Skinning arXiv:2104.04934.)

4. **Wire (or cut) the mood/interaction model.** The exposed `setMood`/`nudge`/`pointerAttraction`
   and the two dead mood params paint nothing today. Either drive moods from pointer/idle state +
   consume the dead params + reframe on a 2-axis valence/arousal model + add a demo that exercises
   it, OR collapse to one `energy` scalar — never ship orphaned substrate. (Overfitting-audit
   precept; brief 18/30/31/32.)

5. **Iridescence + fake-SSS, warm-biased and OKLCh-correct.** A warm-biased IQ cosine-palette
   sheen driven by the Fresnel angle (subtle, not maximal rainbow — "the year of human taste")
   plus a thickness-driven (`-d`) inner-glow + fast-SSS back-light for the jelly/gel read — both
   mixed into OKLCh before the gamut clamp + OETF, both reusing the SDF normal from adopt #1.
   (IQ palettes; Varun Vachhar; Zucconi fast-SSS; brief 8 taste constraint.)

All five ship on **WebGL2 today** — no WebGPU, no particle migration, no new substrate. The
particle-swarm and Verlet soft-body are documented stretch seeds; WebGPU is a documented
substrate-wide non-goal with a revisit trigger.
