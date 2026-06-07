# AW blob wave seeds

The concrete wave specs that perfect the goo-blob — each with its **scope**, the **SOTA
technique** it lands (cited, dated), and the **gate** that machine-locks it. Seeded from the
32-agent SOTA research fan and `docs/tranches/AW/blob/PATH-FORWARD.md`. These are SEEDS —
sizing/gating is finalized at wave planning. Grounded against glass-ui HEAD `afdc485`.
Tranche-development only; writes no `src/`.

The waves cluster into six arcs: **finish** (dither + tonemap + normalized smin — cheap immediate
wins), **surface** (the SDF-normal keystone + the spec/iridescence/SSS it feeds), **motion** (the
spring + squash + interaction wiring + the mood resolution), **membrane** (organic noise + loop),
**color** (derive-palette), **perf** (half-res), and the **README**.

Dependency note: `AW.Wb1` (dither/tonemap) + `AW.Wb2` (smin) + `AW.Wb7` (membrane) +
`AW.Wb8` (palette) + `AW.Wb9` (half-res) are independent and WebGL2-ship now. `AW.Wb3`
(SDF-normal) is the **keystone** that `AW.Wb4` (spec/rim) and `AW.Wb5` (iridescence/SSS) consume.
`AW.Wb6` (spring + squish + interaction wiring + mood) is the motion/interaction arc. `AW.Wb10`
(README) lands last (it ships with this tranche but documents the rest). **WebGPU and the
particle swarm are explicit non-goals** — documented in the path-forward with revisit triggers,
no wave.

---

## AW.Wb1 — IGN dither + Khronos PBR-Neutral tonemap (the cheap filmic finish)

**Scope.** Add two finishing operators to `metaball.frag.ts`, both co-located in the shared
`procedural-color.glsl.ts` chunk for aurora reuse (the AV.W2 single-source pattern). (1) An
**interleaved-gradient-noise dither** — one texture-free line *after* the OETF (`metaball.frag.ts`
after `:173`): `rgb += (1.0/255.0)*ign(gl_FragCoord.xy) - 0.5/255.0`. Aurora already ships this
(`aurora.frag.ts:330-343`); the blob is missing it. (2) Replace the final hard `clamp(0.0, 1.0)`
(`metaball.frag.ts:173`) with the **Khronos PBR-Neutral** soft-compress applied in linear *before*
`linearToSrgb()` — a 1:1 match up to a headroom then a graceful roll-off of only out-of-gamut
highlights. Reconsider the bisection chroma-clamp (`oklch-perturb.glsl.ts:16-31`) in light of it.

**SOTA technique.** The blob's smooth low-contrast OKLCh body + inner-glow ramp is the textbook
8-bit banding case, and warm-cream is the worst case — IGN is the imperceptible fix (the #1
visible-defect fix per brief 31). PBR-Neutral is purpose-built for in-gamut *brand-color
fidelity*: ACES/AgX are built for HDR linear input and **desaturate by design**, muting the exact
warm-cream identity — the wrong tool for the LDR single-color case. Note: aurora ships ACES because
it *is* the HDR-ish painterly compose; the blob is the LDR case — different operator, both correct.
(frost.kiwi, *How to fix color banding*; Khronos, *PBR Neutral Tone Mapper*, 2024; three.js forum,
*Is AGX implemented correctly?*, 2024; Codrops, *Bayer Dithering for WebGL Backgrounds*,
2025-07-30. All accessed 2026-06-06.)

**Gate.** Extend `proof:blob-color-equivalence` + the `metaball-color.glsl-port.ts` TS port with
the tonemap + dither terms (assert the Neutral operator + IGN match the port to 1e-6); a banding
assertion (a smooth warm ramp shows < N adjacent equal-quantized bands with dither on). WebGL2-ships
now.

---

## AW.Wb2 — Normalized smin + the vec2 material-blend variant

**Scope.** Swap the pre-2024 un-normalized `smin` in `sdf-body.glsl.ts:16-19` (`h*h*k*0.25`, raw
`k`) for the IQ 2024 **normalized** quadratic (`k *= 4.0; …`), so `uSmoothK` becomes a real
blend-thickness in distance units, and **retire the magic normalizer** in
`useMetaballRenderer.ts` (the `/0.22`-style smoothK fudge). Promote the merge to the **`vec2 smin`**
form returning `(distance, blendFactor)`; thread `.y` through the body↔satellite merges so a
satellite's color blends *through the goo seam* (`mix(bodyColor, satTint, w)`) instead of popping —
satellite tint derived from the existing `hueRange` so merges stay in the warm palette, not rainbow.
Add a `uSatTint[]` uniform.

**SOTA technique.** The 2024 smin rewrite formalizes normalization (k maps to true blend-band
width) and the material/blend-factor return — the single cleanest way to add depth-reading at the
merge without normals, and "the most organic/alive upgrade after shading" (briefs 1, 4, 11, 17, 20,
24, 29). Quadratic stays the family default (fast, clean C1, never overestimates — confirmed SOTA
over exponential for a small fixed satellite count; circular smin is the documented escape hatch if
the seam reads pinched). (IQ, *Smooth Minimum* — 2024 rewrite, `iquilezles.org/articles/smin/`,
announced Mar 2024. Accessed 2026-06-06.)

**Gate.** `proof:blob-smin-normalized` — assert `uSmoothK` maps to a measured blend-thickness in
distance units (k → neck width within tolerance) and that the magic normalizer is gone; extend the
color-equivalence port with the `vec2` blend path. Geometry-only change to the color gate. WebGL2.

---

## AW.Wb3 — SDF-gradient fake normal (the surface keystone)

**Scope.** Add `vec3 surfaceNormal(vec2 uv, float d, float bodyR)` to the shader: derive a 2D
normal from the SDF gradient — `normalize(vec2(dFdx(d), dFdy(d)))` (the derivatives are *already
paid for* by the `fwidth(d)` AA at `metaball.frag.ts:149`) — and lift to a pseudo-3D normal via an
edge-dome Z (`h = sqrt(max(0.0, -d/bodyR))`). Optionally promote `sdCircle` → an `sdgCircle`
analytic-gradient form (`vec3(length(p)-r, p/length(p))`) for an exact body normal, with the
`dFdx/dFdy` form as the merged-field fallback. This is the dependency root for `AW.Wb4`/`AW.Wb5`
and **subsumes the lone `edgeGlow`** (`metaball.frag.ts:166-168`) rather than adding to it.

**SOTA technique.** The gradient of an SDF is the outward surface normal, unit-length by
construction — the free 2D normal that every premium 2D-blob lighting technique consumes; cheaper
than central differences since the `fwidth` terms are reused (briefs 1, 5, 8, 9, 10, 20, 29). (IQ,
*Distance + Gradient functions 2D*, `iquilezles.org/articles/distgradfunctions2d/`; shaderfun,
*SDF Part 8: Gradients, Bevels and Noise*, 2018-07-23; Clockwork Chilli, *3D Shaders In A 2D World*
— the sphere-normal hybrid. All accessed 2026-06-06.)

**Gate.** `proof:blob-gradient-unit-length` — assert the derived normal is unit-length (|N| ≈ 1)
across a sampled body interior; assert the legacy `edgeGlow` site is gone (subsumed, not
duplicated). WebGL2-ships now; land FIRST.

---

## AW.Wb4 — Blinn-Phong specular + Fresnel rim (the lit droplet — HEADLINE)

**Scope.** Consume the `AW.Wb3` normal. Add a **Blinn-Phong specular** lobe (`H = normalize(L +
vec3(0,0,1))`; a tight glint shininess 16–64 + an optional broad gel sheen 4–8) tinted **warm-cream,
not white**, and a **Fresnel/Schlick rim** (`pow(1.0 - max(dot(N,vec3(0,0,1)),0.0), p)`, p ≈ 2–3 for
a soft watercolor rim) tinted toward `--foreground`. Combine via `max(spec, rim*scale)`. **Inject all
light into `rgb` in linear *before* the OETF + premultiply** (`metaball.frag.ts:172-176`) — a spec
added after the `*alpha` double-darkens. New uniforms map onto `BlobConfig`: `specStrength`,
`specShininess`, `rimPower`, `rimStrength`, `lightDir` (a fixed/screen-facing default; cursor-bound
optional). Gate behind a `lit` flag so the flat default is preserved.

**SOTA technique.** Building a fake normal + Blinn specular + Fresnel rim from the 2D SDF is *the*
move that flips "flat silhouette" to "wet glass droplet" — the single biggest premium delta,
unanimous across the research. Warm-cream/`--foreground` tints are what marry it to glass-ui vs the
cold rims of generic liquid-glass libs. (Codrops droplet, 2025-06-09; imadrahmoune, *How Apple's
Liquid Glass probably works*; Ronja, *Fresnel*; Lettier, *3D Game Shaders — Fresnel factor / Rim
lighting*; MiniMax-AI *lighting-model* GLSL. All accessed 2026-06-06.)

**Gate.** `proof:blob-spec-premult` — assert the specular/rim terms enter `rgb` BEFORE the OETF +
premultiply (parse the assembled shader: light injection precedes `linearToSrgb` and the `* alpha`),
mirroring the `proof:blob-space-gamma` discipline (briefs 10, 20). WebGL2-ships now.

---

## AW.Wb5 — Iridescence + fake subsurface translucency (warm-biased, OKLCh-correct)

**Scope.** Two surface terms on the `AW.Wb3` normal + thickness, both mixed into `oklch` **before**
`gamutClampOklch` (`metaball.frag.ts:170`). (1) **Iridescence** — an IQ cosine palette
`a + b*cos(2π(c*t + d))` driving OKLCh **hue**, `t` from the Fresnel/edge angle + the existing FBM
color field + an animated thickness map (reuse the edge FBM via `uColorNoiseSpeed`/`uTime`).
Warm-biased: bias the palette `d` phase + clamp chroma to the warm-pearl band; default
`iridescence` LOW. (2) **Fake-SSS** — a thickness-driven inner-luminosity ramp off `-d` (bright
translucent core → light-leaking edge) + the fast-SSS back-light `pow(saturate(dot(V,-(L+N*dist))),
power)*scale*(1-thickness)`, lifting OKLCh L + warming hue. New `BlobConfig`/`MoodParams` fields:
`iridescence`, `iridHue`, `iridSpeed`, `sssScale`, `sssPower`, `coreGlow`.

**SOTA technique.** The fresnel-driven cosine palette is the artist-friendly, GPU-cheap iridescence
path (one `cos`, no spectral 81-sample loop); restraint is the 2026 trend ("the year of human
taste") — shimmer, not scream. `-d` gives thickness for free, so the wax/jade SSS read needs no
extra pass (the multipass/raymarch thickness variants are explicitly rejected). Both must ride the
existing OKLCh + gamut-clamp + OETF discipline. Physically-based thin-film + the Belcour–Barla Airy
BRDF are the documented **deferred** ceiling — too saturated/heavy for a lit-less warm-cream surface.
(IQ, *Procedural Color Palettes*; Varun Vachhar, *Iridescent crystal with raymarching and SDFs*;
Alan Zucconi, *Fast Subsurface Scattering* + *Improving the Rainbow 2*; Harry Alisavakis, *Simple
Subsurface Scattering*; Belcour, SIGGRAPH 2017 — the deferred ceiling; brief 8 taste constraint. All
accessed 2026-06-06.)

**Gate.** Extend `proof:blob-color-equivalence` with the iridescence + SSS terms in the TS port; a
gamut assertion (the spectral term never pushes a pixel out-of-gamut after the clamp); a chroma-cap
assertion (warm-bias holds the sheen below a max chroma). WebGL2-ships now.

---

## AW.Wb6 — Spring pointer + velocity squash + interaction wiring + the mood resolution

**Scope.** The motion/interaction arc, four folds. (1) **Spring pointer** — replace
`useBlobPointer`'s fixed-α exponential lerp (`SMOOTH_FACTOR = 0.12`, framerate-dependent) with a
`dt`-normalized critically-damped spring fed the renderer's `dtMs`, via `@mkbabb/keyframes.js` /
`useSpringOrchestrator` (reuse, don't hand-roll); expose smoothed position AND velocity. (2)
**Velocity squash-and-stretch** — a volume-preserving anisotropic 2×2 UV warp before `sdCircle`
(`uVelocity`, `uStretch`), stretch ∝ |velocity| along motion, compress perpendicular (subtle
25–50%). (3) **Interaction wiring** — give `idle` a small non-zero `pointerAttraction` so hover is
always felt; honor the *sign* of `pointerAttraction` in `metaball.frag.ts:122-128` (lean-in vs
shy-away, today hardcoded repulsion); wire `click` to a one-shot spring impulse on
`pulseAmp`/`smoothK`; optionally a decaying-radius pointer-trail of smin-merged spheres (reuse
`MAX_SATS`) for the reach-toward droplet. (4) **Mood resolution** — EITHER wire `setMood` internally
from pointer/idle state + consume the dead `orbitSpeedScale`/`wobbleScale` in
`useBlobSatellites.tick` + reframe `MOOD_TARGETS` as derived from a 2-axis `{valence, arousal}` model
+ add a global squash axis to `MoodParams`, OR collapse `useBlobMood` to a single `energy` scalar
per no-backwards-compat. **A new interactive demo story must exercise whatever ships.**

**SOTA technique.** Spring physics (overshoot + settle) is the premium "weight/aliveness" idiom;
velocity-skinning gets ~80% of soft-body feel with zero sim (a 2×2 domain warp, no particles); the
pointer-trail is the Codrops droplet's elastic reach. The mood system is currently
substrate-without-consumer (no `setMood` caller; two dead params) — wire-or-cut per the
overfitting-audit precept. The full pressure soft-body (Charlotte Dann/Matyka) + the Verlet
control-ring are the documented *deferred* sim path (a render-model change). (Josh Comeau, *Spring
physics* + *Squash and Stretch*; *Velocity Skinning*, arXiv:2104.04934; Codrops droplet, 2025-06-09;
voiceorb / SmoothUI Siri Orb; brief 18 valence/arousal; briefs 30/31/32 the orphan finding. All
accessed 2026-06-06.)

**Gate.** `proof:blob-interaction-prm` — assert every new motion axis (spring, squash, trail,
click-impulse) collapses to no-op/instant under `prefers-reduced-motion` and routes through the
substrate's single rAF (no parallel loop), and stays reachable by `pause()`/`resume()`; a frame-rate
independence assertion on the spring (same settle across simulated 60/120 Hz dt); an
overfitting-audit assertion that the demo story drives the shipped interaction (no orphaned
`setMood`). Pure TS + one shader warp.

---

## AW.Wb7 — Living-membrane: domain-warp edge + liquid-FBM + de-synced breath

**Scope.** Three shader-side refinements to the organic motion, sharing the `metaball.frag.ts`
edge/color blast radius (do together). (1) **Domain-warp** the edge FBM — wrap the single-octave
`fbm(uv*freq + uTime*speed)` (`metaball.frag.ts:134`) in one IQ warp pass `fbm(uv + W·fbm(uv))`
before `sdCircle`, reusing the shared `FBM_ROT`; feed the intermediate warp vector into the OKLCh
hue perturbation for coherent color motion. (2) **Liquid-tune** the body-loop FBM (lacunarity
2.0→1.8, persistence 0.5→0.42). (3) **De-sync the breath** — replace the single `sin(uPulsePhase)`
(`:131`) with 2–3 detuned sines at irrational frequency ratios, tuned to the human calm band
(~6 bpm ≈ 10 s, slightly asymmetric — slower exhale). Optional: a `loopMode: "stochastic" | "closed"`
axis mapping `uTime` to a circle over `uLoopPeriod` for a composed, GIF-capturable breathing cycle
(added mode, default unchanged).

**SOTA technique.** Domain warping is the single highest-leverage organic upgrade ("wobbly circle" →
"living membrane"); liquid-tuned constants + irrational frequencies are the lava-lamp author's
deliberate detune so the motion never resyncs (the cheapest path to perceived life); the human calm
band reads as "a calm living thing breathing" not an oscillator; circular-time closes the loop.
(IQ, *Domain Warping*; Damian van der Merwe, *Painting with Math: lava lamp shader* — the
liquid-tuned constants + 0.13/0.11 rad/s irrational ratios; Apple Breathe — the 5–7 bpm calm band;
shadergif, *How to Make a Perfect Loop in GLSL* — the circular-time loop. All accessed 2026-06-06.)

**Gate.** `proof:blob-membrane-aa` — assert the warped edge holds ~1px `fwidth` AA across the morph
(the warp must not blow up the edge band); a loop-closure assertion when `loopMode:"closed"` (the
field at `t=0` matches `t=period` within tolerance). Extend the color-equivalence port for the
hue-coupled warp vector. WebGL2-ships now.

---

## AW.Wb8 — deriveBlobPalette + multi-stop shader (the color front door)

**Scope.** Add `deriveBlobPalette(seed, options)` mirroring `deriveAurora`: one seed → 2–4
gamut-mapped OKLCh stops distributed across body + satellites instead of one `uBaseColor`. **Hoist
the shared harmony vocabulary** — `AuroraHarmony` + `deriveHue` + `gamutMapStop` → a `ColorHarmony`
type in the `/color` leaf so the blob and aurora derive from one source (no second divergent
harmony). Generalize `metaball.frag.ts` from `uBaseColor` to `uPalette[N]` + `uStopCount`,
interpolating in OKLab with deliberate shorter/longer hue-arc control + a midpoint chroma-bump;
reuse aurora's buffer-reuse pattern to avoid GC churn on slider drag. Default the palette from
glass-ui warm tokens (a warm anchor / `--primary`). Optional color-reactive pointer (proximity
warms/brightens the local palette). The deriver returns space-neutral OKLCh stops (aurora bakes to
linear/ACES, the blob exits gamma/DEC-AT-7 — each component bakes to its own target).

**SOTA technique.** Premium 2025 metaballs are multi-color accumulation, not one perturbed tint
(Codrops blends two color fields; Paper Design ships up to 8 colors). OKLCh harmony from a seed is
established SOTA, and aurora already implements the canonical form — the blob should *consume* it,
not fork it (keeps `proof:single-color-core` honest). value.js stays the single color-math source.
(oklch.fyi; Toolbox365, *Gradient banding & OKLCH* — shorter/longer arc + midpoint chroma;
Codrops droplet; shaders.paper.design/metaballs; brief 25. All accessed 2026-06-06.)

**Gate.** Extend `proof:single-color-core` to assert the blob consumes the shared `ColorHarmony` (no
forked `deriveHue`); a midpoint-chroma assertion (OKLCh interpolation of a vivid pair holds chroma
above the linear-`mix` midpoint); the multi-stop path stays inside the color-equivalence port.
WebGL2-ships now (deriver is pure TS).

---

## AW.Wb9 — Half-resolution render + oversize trim + quality tiers (perf)

**Scope.** Add a `quality: "full" | "half"` axis to `BlobConfig`. In `half`, render the metaball
pass into a half-size drawing buffer and bilinear-upsample to display (ONE extra blit, not a Kawase
chain). Trim the 1.6× canvas oversize toward the measured-minimal satellite-orbit envelope, and add
a cheap pre-FBM bounding early-out (`length(uv) > maxReach → discard` BEFORE the two `fbm()` calls,
which today run even for pixels that will discard). Add a DPR/quality tier dropping weak mobile GPUs
to DPR 1 + half-res. Keep the DPR≤2 clamp.

**SOTA technique.** Fill-rate is quadratic in DPR and is the blob's only real cost (the frag runs
FBM ×2 + a full OKLCh round-trip per pixel); blobs are the ideal half-res candidate — the soft FBM
edge hides the bilinear interpolation — for ~4× fragment savings at near-zero visual delta. The 1.6×
oversize is 2.56× the fragments, mostly transparent pixels paying full FBM cost. No multi-pass blur
(the mobile penalty). (MDN, *WebGL best practices* — smaller buffer + upscale; Khronos public_webgl
— Retina = 4× work; Unity / catlikecoding — half-res + bilinear; Arm SIGGRAPH 2015; brief 19. All
accessed 2026-06-06.)

**Gate.** Extend `proof:offscreen-pause` to assert the half-res path stays parked offscreen/hidden
and under PRM; a fill-cost assertion (half mode renders a half-area buffer); assert the pre-FBM
early-out precedes the `fbm()` calls in the assembled shader. WebGL2-ships now.

---

## AW.Wb10 — The research-backed README

**Scope.** Ship `src/components/custom/goo-blob/README.md` (this tranche delivers it): what the blob
is, use cases, the full `BlobConfig` API, the interaction model (shipped + planned), best practices,
color/perf/a11y notes, examples, and the cited references. Document the watercolor-dot ↔ goo-blob
boundary (shader SDF vs CSS/SVG dot — correct, restated not moved) and the WebGPU/particle non-goals
with their revisit triggers. Cross-link the path-forward + these seeds.

**SOTA technique.** Documentation wave — the consumer face of the perfection plan; no shader change.
The README is binding (the house "research-backed READMEs" precept: dock, constellation, aurora,
blob).

**Gate.** `proof:blob-readme` (lightweight) — the README references the shipped subpath
(`@mkbabb/glass-ui/goo-blob`), the real `BlobConfig` field names, and the `pause()`/`resume()` +
`DockBackgroundToggle` a11y contract; links resolve. Ships with this tranche.

---

## Sequencing summary

```
 finish ─ AW.Wb1 (IGN dither + PBR-Neutral)   ── WebGL2 now, ~2 lines, aurora-shared
        ─ AW.Wb2 (normalized smin + vec2 blend) ── WebGL2 now, geometry

surface ─ AW.Wb3 (SDF-gradient normal — KEYSTONE) ── WebGL2 now, land FIRST
            ├─ AW.Wb4 (spec + Fresnel rim, premult-correct — HEADLINE) ┐
            └─ AW.Wb5 (iridescence + fake-SSS, warm/OKLCh)             ┘ consume the normal

 motion ─ AW.Wb6 (spring pointer + squash + interaction wiring + mood resolution) ── keyframes.js

  loop  ─ AW.Wb7 (domain-warp + liquid-FBM + de-synced breath + optional loop) ── WebGL2 now

 color  ─ AW.Wb8 (deriveBlobPalette + multi-stop + shared harmony)  ── WebGL2 now

  perf  ─ AW.Wb9 (half-res + oversize trim + quality tiers)         ── WebGL2 now

  docs  ─ AW.Wb10 (the research-backed README)                       ── ships this tranche
```

`AW.Wb3` is the structural keystone (`AW.Wb4`/`AW.Wb5` consume it); the finish + smin + membrane +
palette + half-res waves are independent WebGL2-now wins; `AW.Wb6` is the motion/interaction +
mood-resolution arc. **WebGPU and the many-particle swarm are explicit non-goals** — documented in
the path-forward with revisit triggers (a consumer needing ≥ ~1k simulated bodies), no wave. Every
wave ships on WebGL2 today on the existing single-pass fragment shader + the `useWebGLCanvas`
substrate; none adds a second context or a new rAF.
