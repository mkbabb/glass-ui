Before answering, you should consider whether any available skills are relevant to the task at hand. If one or more skills could help complete the request, even partially, you are expected to use it.

I'll synthesize the 32 notes into the requested deliverables. This is a pure synthesis task from material in hand — no tools needed.

# AX Blob — Path Forward + Research-Backed README Outline

## Part 1 — Path Forward (W08 / W15 / W16, SOTA-deepened)

### Headline finding (load-bearing, cited across all 32 facets)

The glass-ui blob is **already at or beyond the public web frontier**. Every facet that audited the shader confirms it ships the SOTA algorithms: IQ-2024 normalized smin (both quadratic + circular variants, `k*=4.0` / `k*=1/(1-sqrt(0.5))`), the IQ tetrahedron SDF-gradient normal + dome-Z lift, linear-space Blinn-Phong + Schlick/Fresnel rim, warm-biased IQ-cosine iridescence, fast-SSS wrap-backlight, volume-preserving `1/sa` squash, the Codrops 15-point decaying-radius pseudopod, the Russell valence/arousal circumplex mood model, and the analytic-gradient gradient-noise membrane. **W08/W15/W16 are therefore SCALE-RECONCILIATION + DEFAULT-IDENTITY + HYGIENE waves, NOT algorithm-replacement waves.** (Facets: smin-distance-regime, ray-marched-vs-2D, soft-body, goo-aesthetics, reference-surveys, blinn-phong, premultiplied-alpha — unanimous.)

---

### W08 — The smin un-flood (the blocker)

**Root cause, named precisely (smin-distance-regime, smin-correctness, master-tempo, soft-body facets):** the shader math is correct. `sdf-body.glsl.ts` ships IQ's verbatim normalized quadratic — `k*=4.0` is exactly the `g(0)=1/4` kernel normalization and **must stay**. The flood is a *unit-regime* bug in `useMetaballRenderer.ts:437-440`:

- **Missing `* POS_SCALE` on the `uSmoothK` upload.** Every other length-like uniform (`uBodyRadius`, `uSatRadius`, `uPointer`, `uNoiseAmp`, `uPulseAmp`) rides the `POS_SCALE = 1/1.6 = 0.625` inner-region compression; `uSmoothK` alone does not. The smin band **is a length** (IQ: `k` = the maximum surface inflation in distance units), so it must ride the same compression as the geometry it merges.
- **Composed magnitude too large.** Live composed `uSmoothK ≈ 0.21` → effective in-shader `k ≈ 0.84` in a 1.0-wide UV (~6× the working band). The polynomial pulls `min(a,b)` down by `k` at every seam (`a==b`), driving the composite SDF negative across the whole canvas → `alpha=1` everywhere → the 84%-coverage slab.

**The three coupled edits (re-derive as ONE budget, never patch one in isolation):**
1. Restore `* POS_SCALE` on the `uSmoothK` upload.
2. Re-tune `BLOB_CONFIG_DEFAULTS.smoothK` (0.12 → ~0.04–0.05) so the composed effective seam-pull lands **~0.03–0.08** of the half-extent (a tight wet meniscus, ≈ the pre-AW working 0.034).
3. Reframe `useBlobMood.ts:45` smoothK as a **1.0-centred unitless MULTIPLIER** (e.g. `lerp(0.85, 1.35, arousal)`), not an absolute distance — and drop the renderer's magic `/ BLOB_CONFIG_DEFAULTS.smoothK` re-normalization divisor. This collapses the split-length regime so a future geometry retune cannot silently re-scale every mood band into a re-flood. (The `/0.015` and `/0.025` divisors on `pulseAmp`/`noiseAmp` are the same smell — convert every mood param that scales a config field to a 1.0-centred multiplier.)

**Gate fix (mandatory, same wave):** `proof:blob-smin-normalized` clause-1 *forbids* `POS_SCALE` on `uSmoothK` — W08 mandates it, so the gate goes RED on the fix unless re-pointed. Keep only the `/0.22` fudge-deletion clause; delete the POS_SCALE-forbid clause. **The static-math gate is structurally blind to a flooded render** (it grepped the fudge-deletion + ran an isolated k-sweep, renders zero pixels — it shipped GREEN over the slab). The real lock is `proof:blob-render`: mount + N frames + `preserveDrawingBuffer:true` readback asserting opaque-fraction 0.25–0.6, a transparent margin off all four edges, and a centre-vs-corner alpha gradient (a field, not a slab).

**Scope discipline:** W08 keeps `sdf-body.glsl.ts` out of bounds (the `k*=4.0` stays). It is the **minimal** un-flood — restore POS_SCALE, do NOT excise it elsewhere. The flood is invisible to a static gate when the pointer is inactive (trail collapsed); adversarially test with a synthetic hover-flick that maxes the 15-sphere trail (the trail is a *second flood vector* — it merges via the same `uSmoothK` at `satelliteRadius*0.7` base).

---

### W15 — Contained lit droplet + warm-cream living membrane

**The keystone insight (every geometry facet):** the lit dome, Fresnel rim, iridescence, SSS, pseudopod, and squash **all already ship but paint nothing** because `thickness = -d/bodyR` saturates to ~1 across an oversized body. **Containment resurfaces them for free.** Fix geometry FIRST.

**1 — Footprint budget (containment, geometry, multi-blob facets):** solve `bodyRadius + orbitRadius + satRadius + smin_band` as ONE wrapper-normalized budget fitting **~70–80% of the footprint**, overflow only for the intentional orbit excursion. **Critically: the smin inflation `k` ADDS to the silhouette reach** — the band that floods if `k` is mis-tuned is the SAME band that overflows the footprint if uncounted: `bodyR + orbitR + satR + k ≤ 0.5*0.75`. At HEAD `body 0.25 + orbit 0.35 + sat 0.13 = 0.73` reach in a 0.5 half-extent ≈ 1.46× the half-box *before* smin — over-budget. Re-derive the **entire length cohort atomically** (body/sat/orbit/smin/noise) in one wave with `proof:blob-render` as the regression lock. **POS_SCALE disposition (ratified, §4 note 13):** KEEP W08's POS_SCALE regime and budget geometry on top of it — never a partial migration that re-floods across the wave seam.

**2 — Ship the wet droplet as DEFAULT (flip `lit:true` + low iridescence/SSS/coreGlow floors; delete the "zero regression" flag-gating).** A greenfield product has no legacy default to preserve — the SOTA look IS the default; the current shipped default is the pre-W9 flat sticker because every premium term defaults OFF.

**3 — The single biggest quality+perf lever: replace the 4-tap tetrahedron normal with the ANALYTIC-gradient smin** (analytic-gradients, fresnel-rim, ray-marched facets). Convert `sdCircle → sdgCircle` returning `vec3(d, p/d)` (the circle gradient `p/d` is unit-length free); convert `smin → vec3 smin` propagating the gradient through the merge via `mix(a.yz, b.yz, h)`; `sceneDist` returns `vec3(dist, grad)` so `surfaceNormal` reads `grad2d` DIRECTLY. This **deletes 4 full `sceneDist` evals per lit pixel** (each running 3-octave FBM ×2 + the sat/trail loops ≈ ~5× the field cost for the normal alone) — exactly the perf the lit-by-default droplet needs, delivered for free. `noised()` already returns its analytic gradient in `.yz`, so the FBM membrane gradient chains in: `bodyGrad = circleGrad - amp*fbmGrad` (chain rule — watch the sign; verify against a central-difference reference). **Caveats:** the smin field is sub-unit (CD family `|grad|≤1`) so `normalize()` before the dome lift — the win is **direction correctness at the meniscus** (where the 4-tap averages two surfaces and tilts wrong), not magnitude; keep the `+1e-6` guard; the anisotropic squash basis must transform the analytic gradient by its inverse-transpose (the subtlest hazard — the 4-tap handled this implicitly).

**4 — Living-but-calm membrane (domain-warp, living-membrane facets):** the blob ships `fbmWarped` but `warpAmp` **defaults to 0.0** (domain warp OFF — the edge reads as a clean geometric arc). Turn `warpAmp` ON at a calm ~0.3–0.4 floor; tune FBM toward the **liquid band** (lacunarity ~1.8, persistence/gain ~0.42 — not the rocky 2.0/0.5 default) in `watercolor-edges.glsl.ts`; **tie `noiseAmp`/`noiseFreq` to the NEW smaller body** so the wobble stays proportional. De-sync the single `sin(uPulsePhase)` breath into 2–3 detuned sines at irrational frequency ratios tuned to the human calm band (~6 breaths/min, slightly slower exhale) so the membrane never mechanically re-syncs. **Free premium:** reuse the intermediate warp vector `q` (already computed inside `fbmWarped`) to drive the OKLCh hue perturbation (small ~5° swing, OKLCh path) so warp + color move coherently — one extra return, vs the current separate `fbm(uv*colorNoiseFreq)` color call.

**5 — Warm-cream identity (OKLCh-palette, iridescence, blinn-phong facets):** derive the default palette from glass-ui **warm tokens** via `deriveBlobPalette` (harmony='analogous', low chromaBump, L-spread so satellites read lighter). Warm-cream specular = OKLCh `L≈0.97, C≈0.03, h≈85°` routed through the SAME OKLCh matrices — **NOT hardcoded sRGB white** (reads cheap-CG). Fresnel rim fed `--foreground` via the ColorResolver. Add a **foreground-aware min-contrast rim guard** so a `var(--primary)` blob never washes out in dark mode (the dark move is chroma-reduce + L-lift the rim stop, not a re-tint). Cold/neon stays explicit consumer opt-in (presets-in-consumers).

**6 — Two robustness folds the SOTA surfaces (blinn-phong, analytic-gradients, sss facets):**
- **Energy-conserving Blinn-Phong:** multiply spec by `(uSpecShininess + 2.0) / 8.0` so shininess and strength decouple (today tuning one re-tunes the other).
- **Specular antialiasing:** widen the spec lobe where the FBM normal varies (roughness/fwidth clamp) so the tight glint (shininess 16–64) does not strobe on the animated membrane — critical for small dock-grid instances. (Do NOT just crank shininess.)
- **IGN dither** (`fract(52.9829189*fract(dot(gl_FragCoord.xy, vec2(0.06711056,0.00583715))))`) at 1/255 amplitude, **after `linearToSrgb`, before the `*alpha` premultiply** — the low-chroma warm-cream dome bands on 8-bit panels; this matters MORE on the frozen rest pose (motion temporally hides banding). Aurora already ships it; splice the same.

**7 — Beer-Lambert inner glow + warm thin-rim shift (sss facet):** swap the linear `oklch.x += coreGlow*thickness` for a saturating `1 - exp(-k*thickness)` curve (real pigment density — flat thick core, fast warm falloff at the rim), and scale the SSS hue-warm-shift by `(1-thickness)` in OKLCh so only the thin rim warms. Budget the combined L-lift (coreGlow + SSS + iridescence + spec all stack — use `max()` between competing highlights, the lit block already does `max(warmCream*spec, rimLin*rim)`; SSS owns the interior, Fresnel owns the rim — different spatial regions).

**8 — Mood headroom re-tune (mood-model, auto-mood-arcs facets):** the circumplex is SOTA-correct — preserve it. With lit/iridescence/SSS now default-ON, the mood `iridScale` (0.4→1.8) is **load-bearing for the first time** — re-tune the excited ceiling DOWN so it does not over-saturate into a garish thin-film rainbow on the now-default-lit body. Wire the derived-but-unread `orbitSpeedScale`/`wobbleScale` into the satellite tick (excited speeds the orbit/merge cycle, sleepy droops it) — derived-but-ignored params are forbidden (overfitting audit). Re-balance pointer-lean/pseudopod/squash/trail magnitudes against the smaller body so the already-wired interaction becomes legible.

---

### W16 — Integration + interaction + perf + README

**1 — Restore the WCAG-2.2.2 pause seam (LIVE FAILURE today — accessibility, integration, offscreen-park facets).** `GooBlob.vue` **discards** the `useMetaballRenderer` return, so `blob.value.pause()` is `undefined` — the documented `DockBackgroundToggle` wiring is a runtime no-op (typecheck passes because the methods exist on the discarded return type; only e2e catches it). Fix via the ratified **`v-model:paused`** shape (structurally un-droppable, matches Aurora's `useAurora` parity). The `?.`-swallow that silences the undefined IS the anti-pattern — never add a fallback pause path.

**2 — Quiescence gate (the biggest onscreen perf lever — offscreen-park, perf-budget, pointer-follow facets).** Replace `shouldContinue(){return !paused}` (which burns full 60fps on an idle onscreen blob — FBM×3 ×2 + OKLCh round-trip per pixel forever) with a real at-rest predicate: **mood settled AND pointer spring `|v|<eps` AND trail collapsed (`trailLen==0`) AND click pulse 0 AND no satellite mid-merge** → park; wake from the satellite phase scheduler (`canvasHandle.wake()` is glass-ui's `invalidate()`; the plumbing exists at `useMetaballRenderer.ts:551`). Surface `useBlobMood`'s private `transitioning` flag read-only. Smooth exponential mood decay (vs hard hold-then-snap) gives a clean `|d(params)/dt|<eps` settle point. **False-park is a correctness hazard** — OR every motion source or the blob freezes mid-gesture then jerks; a pending auto-mood arc (idle→sleepy) must be *scheduled*, not polled, or it never fires on a parked loop.

**3 — Multi-instance context cap (integration, perf, ubiquitous-affordance facets).** Browsers hard-cap ~8–16 WebGL contexts/page; one context per `GooBlob`; the Nth silently blanks (prior incident, commit 9427536). Parking the rAF does NOT release the context. **Route static/ambient instances to the `WatercolorDot` CSS/SVG sibling** (zero GL context); reserve `GooBlob` for the ONE interactive hero. A shared scissored context is the heavier alternative only if multiple LIVE blobs are genuinely needed.

**4 — Perf trim (ordered by ROI — perf-budget, ray-marched facets):**
- **Pre-FBM bounding early-out:** `if (length(uv) > uMaxReach) { fragColor = vec4(0.0); return; }` BEFORE the FBM calls + OKLCh round-trip. `uMaxReach` **must include the smin band + noiseAmp** (`bodyR + orbitR + satR + uSmoothK + noiseAmp`) or it clips the wet meniscus. Use a **transparent WRITE, not GLSL `discard`** (the spec text says "discard" — correct it: the canvas is blend-only with no depth, and `discard` disables the tiled-renderer fast path on mobile GPUs). Compute any `fwidth` BEFORE the discard branch (derivatives in non-uniform control flow are undefined).
- **Gate the 4-tap normal behind the lit path** — MOOT if W15 lands the analytic gradient (there is no 4-tap to gate). If analytic does NOT land, this is the correct interim.
- **`quality:'full'|'half'` axis:** half-res FBO + bilinear upsample, ~4× fragment savings. The blob is the ideal candidate (soft FBM/smin edge hides the interpolation). **Caveat:** the tight specular glint softens at half-res — keep it full-res or accept it as the half tier; align the down/up grids (half-pixel offset).
- **Trim the 1.6× oversize canvas** toward W15's measured orbit envelope (2.56× → ~1.3–1.5× fragments).
- **FP16/mediump split (mobile-only, measure-first, lowest priority):** SDF/positions/FBM-coords stay highp (the ~0.03–0.08 seam-pull is precision-sensitive); color + bounded lighting dot-products are mediump-safe. Desktop runs mediump as FP32 (zero win); too many casts cost cycles.

**5 — Hoist one `resolveTokenColor(css, el)` leaf** (the var()-unwrap is duplicated in `GooBlob.vue` + the renderer; `getComputedStyle` must appear exactly once, cached + MutationObserver-driven on `<html>.class`, never per-frame — it's a forced sync reflow). Keeps the renderer DOM-free. value.js's `parseCSSColor` throws on `var(--token)`, so the concrete rgb() must be cascade-unwrapped first.

**6 — Composed reduced-motion rest pose (PRM-rest-pose facet — land it here, README says "Planned — AW").** Under PRM, drive every axis to a DESIGNED poster, not an arbitrary clock freeze: `uPulsePhase = PI/2` (sin=+1, fullest "inhale held" round body — NOT the random frozen phase), satellites at a tucked/absorbed arrangement (one round body), mood snapped to neutral (bit-deterministic), zero stretch (`pointer.rest()` already guarantees velocity-symmetry — the worst vestibular axis), trail collapsed, lit dome KEPT (zero only time-driven inputs — a flat gray poster is a regression). Re-blend on un-reduce via the existing `ORBIT_BLEND_MS` seam so satellites ease out, not snap. The substrate owns PRM (one static frame then park) — **no blob-local matchMedia**; `restPose()` composes on the substrate's one-static-frame call. Gate with rendered-pixel readback (peak-round opaque fraction + edge-symmetric silhouette + deterministic across two mounts).

**7 — Master-tempo correctness fold (master-tempo facet — the last un-integrated axis).** `uPulsePhase` at `renderer:407` reads the RAW `timeSec`, not the integrated `simTimeMs`, and multiplies the mood-varying `params.pulseFreq` — so the breath JUMPS on a tempo change and POPS on every mood transition (the DDS phase-accumulator click). Convert to an accumulated phase: `pulsePhase += 2π * pulseFreq_effective * (stepMs/1000)` (wrap mod 2π for long-session float precision). Extend `proof:blob-tempo-suppression` with a clause asserting `uPulsePhase` is not computed from `timeSec`.

**8 — value.js fork repatriation (the named close-criterion).** Once W08/W15/W16 land the contained lit droplet, value.js DELETES its local goo-blob fork and consumes `@mkbabb/glass-ui/goo-blob`, injecting its OWN color through the ColorResolver seam (the seam was designed for exactly this).

**9 — README planned→landed sweep** (sync the dead `0.22/0.28` smoothK regime at README lines 91/142/310/322 to the live normalized + POS_SCALE-budgeted values; flip the pause-seam, quality-axis, rest-pose, and lit/irid/SSS defaults from "Planned" to shipped).

---

### The WebGL2 floor vs WebGPU enhancement — DECISIVE

**WebGL2 single-pass 2D-SDF is the correct, permanent floor for this blob. WebGPU is NOT warranted.** Unanimous across ray-marched-vs-2D, webgpu-compute, perf-budget, and reference-survey facets:

- **A 2D screen-space field beats raymarching** for a flat UI droplet on every axis that matters: cost is a flat `O(W*H*N)` with zero overdraw and no per-fragment step loop; resolution-independent via `fwidth`-AA with no marching artifacts; the "volume" read is faked cheaply by the dome-lifted 2D gradient. Raymarching only wins for genuine refraction-through-thickness, volumetric scattering, self-shadowing, or 3D-composited depth — none of which a flat ambient mark needs.
- **WebGPU compute is a net LOSS at ≤4 nuclei.** Compute beats a fragment field only for hundreds-to-thousands of balls (the `O(balls × pixels)` accumulation bottleneck) OR 3D marching-cubes mesh extraction. Our blob is body + ≤3 satellites + ≤15 trail + ≤4 stops, CPU-simulated, uploaded as ~12 uniforms — a compute pre-pass adds a buffer round-trip + sync barrier with **zero field-eval savings**.
- **A decorative background cannot carry a hard WebGPU dependency** (Baseline-2026 "newly available", ~70–95% coverage). If ever adopted, WebGPU is a **substrate-wide** decision (Aurora's WGSL path), never blob-local. The lifecycle core (`createCanvasLifecycle`) is already backend-agnostic, so the park gate + quiescence predicate carry over for free; the premultiplied `alphaMode:'premultiplied'` + `{srcFactor:'one', dstFactor:'one-minus-src-alpha'}` math is identical; satellites would pack as `array<vec4f, N>` in `var<storage, read>` (the Aurora pattern), never `var<uniform>` (the W07 Metal dynamic-index-returns-zero lesson).

**Document WebGPU + particle-swarm as explicit, research-backed NON-GOALS in the README.**

---

## Part 2 — README Outline (research-backed, cite facets)

```
# GooBlob

## What it is
- A single-pass WebGL2 2D-SDF metaball droplet: a warm-cream lit gel bead that
  breathes, leans toward the cursor, stretches an elastic pseudopod, and carries
  an ambient mood. An EXPRESSIVE/DECORATIVE creature, NOT a determinate progress
  bar (for measurable progress reach for Progress/Skeleton).
  [ubiquitous-affordance, goo-aesthetics]

## Use cases — the two affordance registers  [ubiquitous-affordance]
- DECORATIVE / ambient brand mark — aria-hidden, calm, on-palette, pausable.
  Route ambient/grid instances to WatercolorDot; reserve GooBlob for ONE hero.
- STATUS / THINKING indicator — the Mico model: mood + tempo + merge-rate ENCODE
  app state (idle/listening/thinking/responding). Map app-state → setMood.
- Restraint doctrine (Apple Liquid Glass / Stripe / Linear): present, not
  distracting; slow, few-stop, supports focus, never competes for it.
  [goo-aesthetics, mood-model]

## The mood model — valence/arousal circumplex  [mood-model, auto-mood-arcs]
- Russell's 2-axis affect surface; named moods are POINTS, all params DERIVED.
- Arousal → motion energy (orbit/wobble/pulse/noise/sheen + smin merge-rate);
  valence → palette warmth + pointer lean SIGN (pleasant leans IN, unpleasant
  shies AWAY).
- Mood (slow, non-interrupting baseline) vs emotion (transient click/hover
  interrupt) — homeostatic decay to a neutral set-point.
- Auto-arcs: hover→curious, click→excited (latch + smooth decay), idle→sleepy.

## Interaction  [pointer-follow, decaying-trail, click-impulse, soft-body]
- Follow = analytic critically-damped spring (keyframes.js, response 0.18,
  zeta 1.0 — lag = weight, no overshoot).
- Click = underdamped symplectic-Euler impulse (initial-velocity kick, bounce);
  (bounce, response) cited to WWDC23.
- Pseudopod = 15-sphere decaying-radius FIFO trail smin-merged (Codrops).
- Squash = velocity-driven volume-preserving 1/sa anisotropic UV basis.
- First-dt 50ms clamp on every integrated axis (park/PRM re-arm safety).

## The lit droplet — surface & color  [blinn-phong, fresnel, sss, iridescence, oklch-palette]
- 2D-SDF gradient → dome-Z pseudo-3D normal; Blinn-Phong glint (warm-cream OKLCh
  L0.97/C0.03/h85, energy-conserving) + Schlick Fresnel rim (--foreground,
  min-contrast guard) + fast-SSS Beer-Lambert inner glow + warm-pearl IQ-cosine
  iridescence. All in LINEAR before the OETF, premultiply AFTER.
- OKLCh perceptual perturbation + hue-preserving gamut clamp (in-family);
  IGN dither kills 8-bit banding on the warm-cream dome.

## The smin merge regime — k IS the blend band  [smin-distance-regime, containment]
- IQ-2024 normalized smin: k = the max inflation in DISTANCE units; quadratic vs
  circular (wetter) variants, same k-units. POS_SCALE compression applies — the
  band is a length. Contained-droplet footprint budget includes k in the reach.

## The living membrane  [domain-warp, living-membrane]
- Domain-warped analytic-gradient FBM (liquid constants ~1.8/~0.42); warp vector
  reused for coherent hue; de-synced multi-sine breath (~6 bpm).

## Substrate sharing  [integration, offscreen-park]
- Composes useWebGLCanvas (shared CODE, per-instance CONTEXT): demand rAF,
  three-reason suspend Set, content-visibility + IntersectionObserver offscreen
  park, document.hidden tab park, live-monitored PRM freeze, context-loss heal.
- Shared procedural-color GLSL chunk + ColorHarmony vocabulary with Aurora;
  return-space deliberately NOT unified (blob gamma exit vs aurora linear).
- ColorResolver injection seam — value.js injects its own color.

## Accessibility  [accessibility, prm-rest-pose]
- Decorative canvas aria-hidden; clickable variant = real <button> + name +
  keyboard (never aria-label on the canvas). WCAG 2.2.2 pause (v-model:paused,
  ALL users) distinct from 2.3.3 interaction-motion (PRM no-op). Composed
  reduced-motion rest pose (peak-round designed poster).

## Performance  [perf-budget, ubiquitous-affordance]
- Fill-rate quadratic in DPR (≤2 clamp load-bearing); pre-FBM bounding early-out
  (transparent write, k-padded reach); analytic-gradient normal (no 4-tap);
  quality:'half'; quiescence park; multi-instance context cap → WatercolorDot
  tier cascade.

## Architecture decision — WebGL2 floor, WebGPU non-goal
- Single-pass 2D-SDF beats raymarch (no view ray / step loop / depth) AND beats
  WebGPU compute (no accumulation bottleneck at ≤4 nuclei). WebGPU + particle
  swarm are explicit NON-GOALS. [ray-marched-vs-2D, webgpu-compute, perf-budget]

## Examples
- Ambient hero backdrop · thinking/status indicator · interactive mascot ·
  themed (warm default + cold/neon consumer presets).

## Reference lineage  [reference-surveys]
- IQ smin/normalsSDF/distgradfunctions2d/warp/gradientnoise/palettes; Codrops
  droplet; Zucconi fast-SSS; Ottosson OKLCh; Russell circumplex; WWDC23/WWDC25;
  WCAG 2.2.2/2.3.3.
```

---

**Net:** W08 = restore POS_SCALE on `uSmoothK` + re-derive the composed band to ~0.03–0.08 + mood-as-multiplier + re-point the gate to a rendered-pixel readback. W15 = contain the geometry as one footprint budget (counting `k`), flip lit/iridescence/SSS/warpAmp ON by default with warm-token palette + min-contrast rim, land the analytic-gradient smin (deletes the 4-tap, the keystone quality+perf lever), liquid-tune + de-sync the membrane, re-tune mood headroom. W16 = real `v-model:paused` seam, quiescence gate, WatercolorDot tier cascade for the context cap, pre-FBM bounding early-out + quality:half, hoist the token-resolve leaf, composed PRM rest pose, fix the un-integrated pulse-phase, repatriate the value.js fork, README planned→landed sweep. WebGL2 is the permanent floor; WebGPU is a documented non-goal.