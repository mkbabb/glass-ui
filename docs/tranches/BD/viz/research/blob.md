# blob — first-principles re-development research (BD generative-viz redevelopment)

**Status** RESEARCH/BRAINSTORM (no `src/` edit) · **Branch** prototype/liquid-dock · **Headline** the
goo-blob → `blob` rename + a from-first-principles re-architecture: a robust SDF metaball field on the GPU,
a 4-emotional-state machine, lava-lamp satellites that morph IN/OUT of the core, MULTIPLE blobs that interact
organically, the cartoon-shadow option, and a robust configurator + mouse/keyboard interactivity.

**Consumes (the live ground):** `docs/tranches/BD/viz/live-audit.md` (the real-pixel before-state) ·
`src/components/custom/goo-blob/RESEARCH.md` (the AY-era SOTA brief — NOW PARTLY OVERTURNED, see §0) ·
the live source at HEAD (`metaball.wgsl.ts` / `metaball.frag.ts` / `useMetaballRenderer.ts` /
`useBlobMood.ts` / `useBlobSatellites.ts` / `useBlobPointer.ts` / `constants.ts` / `types.ts`).

---

## 0. What changed vs the prior research — the overturned non-goal + what survives

The AY `RESEARCH.md` recorded **WebGPU + multi-blob + particle-swarm as research-backed PERMANENT
non-goals** ("WebGPU is a net LOSS at ≤4 nuclei", "a decorative background cannot carry a hard WebGPU
dependency"). **The BD user mandate OVERTURNS the WebGPU-rejection and the ≤4-ball scope** — the new edicts:

1. **GPU-only, WebGPU-first / WebGL2-as-GPU. ZERO Canvas2D. No fallback-to-Canvas2D, no legacy.** (blob is
   ALREADY Canvas2D-free — it ships WGSL primary + GLSL fallback over `useGpuSubstrate`; the kill list is
   fourier-field / constellation / dot-flow-field / aurora's raster ground, NOT blob. Blob is the cleanest
   starting point.)
2. **MULTIPLE blobs interacting organically** — the ≤4-ball / single-core scope is GONE; the field is now an
   N-core merge. This raises the ball count past the "compute is a net loss" threshold the AY non-goal cited,
   so the WebGPU-compute door re-opens AS AN OPTION (§5), but the fragment-field floor still wins for the
   ball-counts a UI mark needs (§4.1 — settled).
3. **Satellites morph IN/OUT lava-lamp-style** — today's satellites ORBIT (they never detach/dissolve); the
   lava-lamp birth→rise→merge→split→dissolve lifecycle is the new model (§3).
4. **4 explicit emotional states controlling blob facilities + movement tendencies** — formalize the existing
   5-mood `{valence, arousal}` circumplex into the 4-quadrant model (§2).
5. **A cartoon-shadow OPTION (on/off)** — the gel-dome drop-shadow already exists (`GooBlob.vue:301`); the
   Memphis offset-stamp `--shadow-cartoon-*` tokens exist (`cards.css:168`). The work is the AXIS, not the
   technique (§6).

**What SURVIVES from the prior research (do NOT re-derive — gate-green):** the IQ-2024 normalized `smin`
math (quadratic `k*=4` + circular variants, the value+gradient `vec3` form), the analytic-gradient surface
normal + dome-Z lift, the premultiplied-alpha overlay, the `fwidth()` AA-edge + Toksvig spec-clamp, the
de-synced multi-sine breath, the critically-damped pointer spring, the volume-preserving `1/sa` squash. The
12 `proof:blob-*` gates lock these. **The math is correct; the SCOPE (single→multi), the SATELLITE LIFECYCLE
(orbit→lava-lamp), the EMOTIONAL MODEL (5-mood→4-state), and the SURFACE/CONFIG ergonomics are the gaps.**

**What is NEWLY built in BD (since the AY research) and must be preserved:** the `variant: "blob"|"meatball"`
axis (`types.ts:3`, the plain-floor vs lit-register STAGE gate), the `uStage` shader gate, the soft-shadow
march (`uShadow`/`uShadowSoftness` on the `res.z/res.w` lanes), the WGSL typed-struct uniform bridge
(`uniformBridgeWGPU.ts` — the std140-vs-WGSL alignment SoT). The re-architecture EXTENDS these; it does not
re-fork them.

---

## 1. The SOTA survey (the corpus, ranked by relevance to a decorative UI blob-mark)

| Technique | What it is | Fit for a UI blob-mark | Verdict |
|---|---|---|---|
| **Screen-space SDF metaball field** (IQ smin, `O(W·H·N)` fragment) | Each fragment evals N circle-SDFs, smooth-min-merged, surface = the 0-isoline; analytic gradient → normal | **THE floor.** Flat cost, no overdraw, `fwidth`-AA, resolution-independent, "volume" faked by dome-lifted 2D gradient. The current blob IS this. | **KEEP — extend N from ≤5 to N-cores + N-satellites** |
| **Density-field + threshold** (additive Gaussian splat → RT → `smoothstep`) | Splat each ball as a falloff sprite into an FBO with additive blend, threshold the accumulated density | "Very cheap UNLIMITED metaballs" (the Codrops 2021 path). Scales to hundreds of balls. BUT loses the analytic gradient → normal/lighting/refraction get harder (you'd `dFdx` the density). | **Consider for the dense satellite-swarm register ONLY** (§5 fan-out); the lit register stays on the SDF field |
| **MLS-MPM / SPH / PIC-FLIP fluid sim** (compute, SSFR surface) | True fluid: ~30k (SPH) → ~100k (MLS-MPM) particles real-time on iGPU; surface via screen-space depth+thickness+blur | **Overkill + heavy.** SSFR is a 5-pass pipeline (depth→thickness→bilateral→normal→shade) at half-res; a decorative mark does not need Navier-Stokes. The "lava-lamp" the user wants is PROCEDURAL, not physical. | **NON-GOAL** (the AY verdict survives on THIS axis) — but harvest the BUOYANCY model (§3) |
| **Procedural lava-lamp** (sinusoidal drift + buoyancy envelope + ring-buffer spawns) | 8 permanent metaballs on irrational-frequency sine paths + a 16-entry ring buffer of click-spawned swell→fade blobs over a `smoothstep` envelope | **THE lava-lamp answer.** No sim, GPU-cheap, organic-by-construction via irrational frequency ratios + the swell/fade envelope. The Damian van der Merwe shader IS the reference. | **ADOPT — the satellite + multi-blob lifecycle (§3)** |
| **Ray-marched 3D blob** (raymarch SDF, true 3D normal) | Per-fragment step loop through a 3D SDF | True volume, but overdraw + step-loop cost for a flat mark; the dome-lifted 2D gradient already fakes the volume read convincingly. | **NON-GOAL** (the AY floor survives) |
| **`uBackdrop` Snell refraction** (sample a glass-ui-rendered backdrop texture, displace by the dome-bevel normal) | The blob LENSES the backdrop through itself (WWDC-2025 "liquid glass") instead of self-lit overlay | The architecturally-absent 2025 read; portable WebGL2 (no DOM-sample). Dovetails with "blob over the aurora". | **STRONG CANDIDATE — the liquid-glass surface upgrade (§7, idea 8)** |

### The four reference shaders to BEST (Safari-compatible)
- **Damian van der Merwe lava-lamp** — the buoyancy + ring-buffer spawn lifecycle (§3).
- **Codrops 2025 droplet metaballs (Three.js+GLSL)** — "a mouse-ball other balls merge into + click-to-spawn"
  — the EXACT multi-blob interactivity model the mandate wants.
- **Codrops 2021 2D-metaballs WebGL2** — the additive-density unlimited-ball path (the dense-swarm option).
- **birthdaycolor.com** (ORCHESTRATOR-NOTES reference-to-best) — aurora likely supersedes its color/goo;
  fold its interactivity feel into the blob's pointer register (§7, idea 7).

---

## 2. The 4-emotional-state machine (formalize the {valence, arousal} circumplex)

The existing model is a 5-named-mood `{valence, arousal}` circumplex (`constants.ts:48` `MOOD_AVA`) with a
principled `paramsFor(v,a)` derivation — this is GOOD and SURVIVES. The mandate wants **4 EXPLICIT
emotional states**; the circumplex's natural shape IS the 4-quadrant model (high/low × valence/arousal — the
affective-computing canon: "four arousal-valence combinations, one per quadrant"). The redesign collapses the
5 named moods onto the **4 quadrant-anchored states** + the principled derivation:

| State | Quadrant (v, a) | Reads as | Movement tendency | Viscosity / `smoothK` | Satellites | Color shift |
|---|---|---|---|---|---|---|
| **Calm** | (+v, −a) | content, slow-breathing | gentle drift, slow orbit, leans gently toward pointer | high-K (gooey, slow merge) | few (1–2), lazy rise | warm-cream, low hue-range |
| **Excited** | (+v, +a) | bubbly, energetic | fast jitter, fast orbit, leans IN hard, quick poke-bounce | low-K (crisp, fast merge/split) | many (3–5), fast churn | warm-bright, high hue-range, high irid |
| **Melancholy** | (−v, −a) | heavy, sinking, slow | sags downward, slow, SHIES from pointer | mid-K, slow | few, sink rather than rise | cool/desaturated, dim |
| **Playful** | (−v, +a) | mischievous, darting | erratic fast darts, orbits AWAY then back, dodges pointer | low-K, springy | many, erratic spawn/dissolve | shifting hue, mid chroma |

**The mapping principle (preserve the existing axes):**
- **Arousal → KINETICS** (`orbitSpeedScale`, `wobbleScale`, `pulseFreq/Amp`, `noiseAmp`, `iridScale` — already
  arousal-driven in `paramsFor`). High arousal = fast/crisp/churny; low = slow/calm.
- **Valence → AFFINITY + WARMTH** (`pointerAttraction` sign+magnitude, `hueRange`, `satShift`,
  `brightnessShift` — already valence-driven). +v = leans in + warm; −v = shies + cool/dim.
- **NEW axis the 4-state model needs — VERTICAL BIAS (buoyancy direction).** Calm/Excited RISE (positive
  buoyancy), Melancholy SINKS, Playful is NEUTRAL+erratic. This is the lava-lamp gravity term (§3) modulated
  by the quadrant — a small `verticalBias ∈ [−1,+1]` derived from valence×arousal, NOT a new hand-knob.

**The state machine (KISS — extend `useBlobMood`, don't fork):**
- The 4 states are the 4 quadrant POINTS; `setEmotion(state, {source})` retargets (reuse the existing
  manual/auto latch, `AX.W46 D7` — manual pins above the autonomic arc).
- The **autonomic arc** (the existing `update(interaction)`): idle → settles toward Calm; pointer-approach →
  drifts toward Curious/Playful; click → one-shot Excited; long idle → Melancholy (the sleepy successor). The
  arc is a DRIFT in {v,a} space (cross-fade), so an emotion is never a hard cut.
- **Cross-fade in {v,a} space, not param space** — interpolate the (valence, arousal) point, re-derive
  params each frame via `paramsFor`. ONE principled surface; the 4 states can never desync.

**Decision recorded:** rename `BlobMood → BlobEmotion`, the 4 states `calm | excited | melancholy | playful`
(clean break, no alias — greenfield). The existing `idle/curious` autonomic intermediates stay as INTERNAL
arc waypoints (not public states) OR fold into the nearest quadrant. The `paramsFor` derivation is the keep.

---

## 3. The satellite + multi-blob system — lava-lamp morphing in/out

### 3.1 The satellite lifecycle (replace orbit with lava-lamp birth→rise→merge→split→dissolve)

Today's satellites ORBIT forever (`useBlobSatellites.ts` — `phase: "orbiting"`, eccentric ellipse + 2-sine
wobble; they bridge the core via the widened smin band, BA.W-GOO-REDRESS). They never DETACH or DISSOLVE.
The lava-lamp model is a **phase state-machine per satellite** (the Damian van der Merwe envelope + a
buoyancy term):

```
phases: dormant → birthing(swell-in) → rising(buoyant drift) → merging(absorbed into core)
                                    ↘ splitting(pinch off) → free-floating → dissolving(fade) → dormant
```

- **birthing** — `swellIn = smoothstep(0, 0.6, age)` (the reference envelope): a satellite SWELLS into
  existence from radius 0 at the core's surface (or the container floor). It is smin-merged from frame 0 so
  it reads as a bud growing OUT of the core, never a popped-in disc.
- **rising/sinking** — buoyancy drift on the emotion's `verticalBias` (§2) + the de-synced multi-sine wander
  (irrational frequencies, `sin(t·0.13)` / `cos(t·0.11)` — never visually repeats). The satellite stays
  smin-merged while near the core (the bridge band, KEEP), and the neck STRETCHES as it pulls away (the
  `smin` already produces this — a thinning meniscus).
- **merging vs splitting** — at the apex/nadir the satellite either re-MERGES (absorbed, radius → 0 into the
  core) or PINCHES OFF (the neck thins past a threshold → it becomes a free metaball). Both are pure smin
  geometry — the neck is the smin meniscus; when the distance exceeds the smin reach `k`, the field
  disconnects naturally. NO explicit "cut" — the topology change is emergent.
- **dissolving** — a free satellite fades via `fadeOut = 1 - smoothstep(life·0.5, life, age)` and returns to
  dormant. The ring-buffer / pool keeps a compile-time loop bound (the GLSL constraint — `MAX_SATS` today,
  raise to ~8–12 with a count uniform; KEEP the `array<vec4,N>` uniform packing, NOT dynamic index — the W07
  Metal dynamic-index-returns-zero lesson).
- **count by emotion** — Calm 1–2 lazy, Excited 3–5 churny, Melancholy 1–2 sinking, Playful 3–5 erratic
  (§2). The count is an emotion-derived target the spawner ramps toward (births/dissolves to hit it).

### 3.2 Multiple blobs interacting organically (the N-core merge)

The scope goes from "1 core + satellites" to "**N cores, each with satellites, all in ONE smin field**". The
key insight: **multi-blob is just more terms in the SAME smin accumulation** — there is no second mechanism.

- **The field is one scene-SDF:** `sceneDistG = smin over { core_0..core_M, sat_0..sat_K, trail_0..trail_J }`
  — the existing `sceneDistG` generalizes from {1 core + sats + trail} to {M cores + sats + trail}. Cores
  near each other MERGE (their fields overlap past the smin reach), cores far apart stay separate islands.
- **Cores drift independently** (each on its own irrational-frequency sine path, like the 8 permanent
  lava-lamp balls) + a soft mutual attraction/repulsion so they cluster and part organically (a cheap N²
  pairwise term at M≤~6 cores is trivial on the CPU sim — no compute pass needed). The pointer can ATTRACT
  the nearest core (the existing pointer-attraction generalized).
- **spawning** — `spawnBlob(x, y)` / click-to-spawn adds a core at the pointer (the Codrops droplet model);
  `blobCount` config atom (default 1, the current single-core back-compat; >1 = the multi register). Each new
  core swells-in via the same birthing envelope.
- **the uniform packing** — cores join the satellites/trail in the `array<vec4,N>` packing (pos.xy, radius,
  meta). Raise `MAX_SATS`/add `MAX_CORES`; the count uniforms gate the loops. **The fragment cost is
  `O(W·H·(M+K+J))`** — at M≤6 cores + K≤12 sats + J≤15 trail ≈ 33 SDF evals/fragment, well within budget for a
  fullscreen pass (the §5 compute-pre-pass is NOT needed at this count; it becomes worth it only past
  ~hundreds of balls — the dense-swarm-only option).

### 3.3 The decision: CPU-sim the field, GPU-render it (the existing split, generalized)

The simulation (core/satellite/trail positions, the lifecycle state machines, the emotion arc) stays **on the
CPU** (the existing `useMetaballRenderer.resolveFrame` advance) — it is a few-dozen entities, trivial cost,
and keeps the sim deterministic + pausable + PRM-freezable (the substrate park gate). The GPU does the
**field eval + surface shade only** (the fragment pass). This is the existing architecture; multi-blob just
adds entities to the arrays. **No fluid-sim compute pass** unless the dense-swarm register (§5) is built.

---

## 4. The render architecture (first-principles, GPU-only)

### 4.1 The settled floor (KEEP — gate-green)
Screen-space 2D-SDF smin field, single fullscreen fragment pass, analytic gradient → dome-lifted normal,
premultiplied-alpha. WebGPU-first (`metaball.wgsl.ts`) / WebGL2 fallback (`metaball.frag.ts`) over
`useGpuSubstrate` + `createCanvasLifecycle`. The Canvas2D path does NOT exist for blob — nothing to purge.

### 4.2 The shader pipeline (extend, don't re-fork)
```
fragment(p):
  sceneDistG = smin over { cores[M], satellites[K], trail[J] }   // §3 — generalized N
  alpha      = fwidth-AA(sceneDistG.x)                            // the AA-edge half-width (KEEP)
  normal     = domeLift(sceneDistG.yz)                            // analytic gradient → 3D normal (KEEP)
  if uStage == plain:   color = flat-fill(palette, sceneDistG)    // variant="blob" (KEEP)
  else (meatball):      color = lit(normal, specular, irid, SSS, rim) + optional refraction(uBackdrop)
  if uShadow:           composite soft-shadow march (KEEP)
  out = premultiply(color, alpha)
```
- The `variant: "blob" | "meatball"` axis (plain floor vs lit register) is the right primitive split — KEEP.
  A possible THIRD variant `"glass"` = the lit register + `uBackdrop` refraction (§7 idea 8).
- The Apple squircle bevel `⁴√(1−(1−x)⁴)` (vs the current spherical `√(1−(1−x)²)`) is the right dome-Z curve
  for the liquid-glass identity (AX.W56 squircle) — a candidate switch (the prior research flagged it).

### 4.3 Why NOT compute (at the UI ball-count)
A WebGPU compute pre-pass adds a buffer round-trip + sync barrier with ZERO field-eval savings at ≤~33
entities — the fragment field is already `O(W·H·N)` and N is small. Compute wins only for the dense-swarm
register (§5). The fragment floor is the permanent default.

---

## 5. The dense-swarm OPTION (the one place compute/density-field could earn its place)

IF a future register wants HUNDREDS of micro-satellites (a true churning lava-lamp swarm, not 6 cores), the
fragment `O(W·H·N)` field becomes the bottleneck. The two SOTA escapes, BOOKED not built:
- **Additive density-field** (Codrops 2021): splat each micro-ball as a Gaussian into an FBO with additive
  blend, threshold the accumulated density → "cheap unlimited metaballs". Loses the analytic gradient (normal
  via `dFdx`/`dFdy` of the density — softer lighting). Portable WebGL2, no compute needed.
- **WebGPU compute particle sim** (the fluid-sim projects): a compute pass advects N particles, the field is
  binned to a grid. Worth it only at thousands of particles + a hard WebGPU dependency the decorative mark
  cannot carry alone — so this is a SUBSTRATE-WIDE decision (the aurora WGSL precedent), never blob-local.

**Recorded as a NON-DEFAULT option with a trigger:** the swarm register fires only if a consumer needs >~50
balls; the default multi-blob (M≤6 cores + K≤12 sats) stays on the fragment floor. Do NOT build the swarm now
(the ≥2-consumer bar / no-overfitting).

---

## 6. The cartoon-shadow option (the technique EXISTS — build the axis)

The mandate: "an option for cartoon-shadow style or not." Both halves of the technique already ship:
- **The gel-dome drop-shadow** (`GooBlob.vue:301`, AY.W-COHERE E2 / AZ.W-BLOB-STUDIO D4) — two chained
  `drop-shadow()` filters that FOLLOW the irregular metaball silhouette (a `box-shadow` would stamp a
  rectangle, missing the necking). Adaptive via `--shadow-color`/`--foreground`.
- **The Memphis offset-stamp** `--shadow-cartoon-{sm,md,lg}` tokens (`cards.css:168`) — the hard offset stamp.
- **The procedural soft-shadow march** in-shader (`uShadow`/`uShadowSoftness`, BC.W-GOOBLOB-MEATBALL).

**The work is the AXIS, not the technique:** a `shadow: "none" | "grounded" | "cartoon"` config atom (or a
boolean `cartoonShadow` on top of the grounded default). `"cartoon"` swaps the soft gel-dome for the hard
Memphis offset-stamp (a `drop-shadow` at a fixed offset reading `--shadow-cartoon-lg`, still
silhouette-following via `drop-shadow` not `box-shadow`). `"none"` drops it. Compositor-only (a CSS filter,
not a layout property). PRM-safe. This is a clean 3-valued atom on the variant axis.

---

## 7. BRAINSTORM — 10+ ideas (ranked by SOTA-impact × feasibility)

1. **N-core single-smin-field (the headline).** Generalize `sceneDistG` from {1 core} to {M cores}; cores
   drift on irrational-freq sine paths + soft mutual attraction. Multi-blob is MORE TERMS, not a 2nd
   mechanism. `blobCount` atom (default 1). **HIGH impact, LOW risk** — pure extension of gate-green math.

2. **Lava-lamp satellite phase machine.** Replace eternal-orbit with birth(swell)→rise(buoyant)→merge|split
   (emergent smin topology)→dissolve(fade), buoyancy on the emotion `verticalBias`. The neck stretch/pinch is
   free smin geometry. **HIGH impact** — the literal "morph in/out lava-lamp" ask.

3. **4-quadrant emotion machine.** `BlobEmotion = calm | excited | melancholy | playful`, the 4 circumplex
   quadrants; cross-fade in {v,a} space, re-derive params via `paramsFor`. Adds the `verticalBias` buoyancy
   axis. **HIGH impact** — formalizes the existing model exactly as the affective-computing canon prescribes.

4. **click-to-spawn-core + pointer-ball merge.** Click spawns a new core at the pointer (Codrops droplet
   model); the nearest core is attracted to the pointer and MERGES on approach. The pointer becomes a
   physical participant in the field, not just an attraction force. **MED-HIGH impact** — the marquee
   interactivity.

5. **The cartoon-shadow axis.** `shadow: "none" | "grounded" | "cartoon"` atom — swap gel-dome for Memphis
   offset-stamp, silhouette-following via `drop-shadow`. **MED impact, LOW risk** (technique exists).

6. **Apple squircle dome-bevel.** Switch the dome-Z from spherical `√(1−(1−x)²)` to the squircle
   `⁴√(1−(1−x)⁴)` — softer flat-to-curve, rhymes with the library squircle identity (AX.W56). **MED impact**
   — a surface-quality refinement, gate via byte-fence on the normal.

7. **birthdaycolor-grade pointer register.** A richer pointer model: velocity-reactive squash, flick-burst
   spawns a satellite, hold-to-grow the nearest core, the existing trail. Compose `usePointerVelocityField`
   (the shared viz-pointer leaf — accel/velocity/burst already published, BB.B4). **MED impact** — wires the
   existing shared physics into the blob.

8. **`uBackdrop` liquid-glass refraction (the WWDC-2025 read).** Add a `variant: "glass"` = lit + sample a
   glass-ui-rendered backdrop texture (an aurora FBO / baked gradient), displace by the dome-bevel normal →
   true Snell refraction + low chromatic dispersion. Portable WebGL2, no DOM-sample. "blob over the aurora" is
   the hero composition. **HIGH impact, MED risk** — the one architecturally-absent 2025 move; the WebKit
   `backdrop-filter:url()` gap does NOT bite (this is an in-shader texture sample, not a CSS filter).

9. **keyboard interactivity.** Arrow/WASD nudge the core, number keys 1-4 set the emotion, space = poke,
   +/− = spawn/absorb a satellite. The mandate's "mouse/keyboard interactivity" half. **LOW risk, MED
   delight** — a configurator-adjacent affordance.

10. **emotion-reactive palette via the OKLCh ramp.** The emotion's {v,a} drives the palette derivation
    (`deriveBlobPalette` family) — Calm=warm-cream analogous, Excited=warm-bright wide-hue, Melancholy=cool
    desaturated, Playful=shifting-hue. ONE color source (value.js OKLCh), no per-emotion hand-palette.
    **MED impact** — ties color to emotion principledly.

11. **container-aware buoyancy.** The blob field knows its container bounds; satellites rise to the top and
    sink to the bottom within them (the lava-lamp lamp-glass), cores bounce softly off the walls. **LOW-MED
    impact** — sells the lava-lamp metaphor; a few cheap clamp terms in the CPU sim.

12. **the robust configurator + 4-emotion pills + multi-blob count + cartoon toggle.** A real Configurator:
    `emotion` (4 pills) · `blobCount` slider · `satellites` slider · `cartoonShadow` toggle · `variant`
    (blob/meatball/glass) · `seed`/`palette` · `quality`. The configurator-coverage law (every viz a robust
    configurator). **MED impact** — the ergonomics deliverable.

13. **dissolve-to-aurora handoff (stretch).** When a blob fully dissolves it could seed the aurora field
    behind it (a color event handoff). Speculative — BOOK only. **LOW priority** — the "similar aurora logic"
    cross-pollination, but no consumer yet.

---

## 8. The proposed first-principles architecture (one-screen)

```
blob/                                   # renamed from goo-blob (clean break, no alias)
  Blob.vue                              # the SFC; props: emotion, blobCount, satellites, variant, shadow, ...
  composables/
    useBlobEmotion.ts                   # the 4-quadrant {v,a} state machine (was useBlobMood) + verticalBias
    useBlobField.ts                     # the N-core + N-satellite scene-SDF SIM (was useBlobSatellites + part of renderer) — the lava-lamp lifecycle state machines, the CPU advance
    useBlobPointer.ts                   # pointer/keyboard interaction (KEEP, extend: click-spawn, kbd)
    useBlobRenderer.ts                  # the GPU upload + draw (was useMetaballRenderer, carved <500 LOC)
    uniformBridgeWGPU.ts                # the typed-struct SoT (KEEP — extend MAX_CORES/MAX_SATS)
    uploadBlobUniforms.ts              # the WebGL2 upload (KEEP — extend)
  shaders/
    metaball.wgsl.ts / metaball.frag.ts # the field+surface (KEEP — generalize the smin loop to N cores)
  constants.ts / types.ts / index.ts
```
- **Sim on CPU** (deterministic, pausable, PRM-freezable), **field-eval + shade on GPU** (the fragment floor).
- **GPU-only, WebGPU-first / WebGL2 fallback** — both are GPU; ZERO Canvas2D (already true).
- **≤12 config atoms** (the AY ceiling survives): `emotion` · `blobCount` · `satellites` · `variant` ·
  `shadow` · `seed`/`palette` · `quality` · `pointer` · `surface`(lit bundle) · `geometry`(body/orbit/smin
  bundle) · `refraction`(default-low) · `tempo`. Every derived-but-unread field wired-or-deleted.
- **All 12 `proof:blob-*` gates + the variant/shadow/parity gates stay GREEN** through the extension
  (byte-fence the smin math; the N-core generalization is additive at N=1).

---

## 9. The fences + non-goals (recorded so a future agent does not re-open)

- **GPU-only is ABSOLUTE; Canvas2D never enters blob.** (already true — blob is WGSL+GLSL only.)
- **No fluid sim (MLS-MPM/SPH/PIC-FLIP) for the DEFAULT.** The lava-lamp is PROCEDURAL (sine-drift + buoyancy
  envelope + smin topology), not physical. The fluid-sim compute path is a dense-swarm-only OPTION (§5),
  substrate-wide if ever, never blob-local.
- **The smin math + analytic-gradient normal + the 12 gates are gate-green — do NOT re-derive.** The
  re-architecture is SCOPE (N-core), LIFECYCLE (lava-lamp), MODEL (4-emotion), ERGONOMICS — not algorithm
  replacement.
- **Safari-first (ORCHESTRATOR mandate).** The SDF fragment field + the gel/Memphis `drop-shadow` are all
  WebKit-safe. The `uBackdrop` refraction is an in-shader texture sample (NOT `backdrop-filter:url()` — the
  WebKit gap does not bite). Record the WGSL→GLSL parity fall for the ~5-10% non-WebGPU tail.
- **clean break on the rename** (`goo-blob → blob`, `BlobMood → BlobEmotion`, the 5-mood→4-state) — no
  aliases (greenfield, no-backwards-compat).

---

## Sources

- `docs/tranches/BD/viz/live-audit.md` (the real-pixel before-state); `src/components/custom/goo-blob/{RESEARCH.md,*.ts,*.vue}` + `shaders/*` (HEAD source facts).
- [Codrops — WebGPU Fluid Simulations (MLS-MPM, ~100k particles, SSFR)](https://tympanus.net/codrops/2025/02/26/webgpu-fluid-simulations-high-performance-real-time-rendering/)
- [Codrops — Interactive droplet-like metaballs (Three.js + GLSL, mouse-ball merge + click-spawn)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- [Codrops — Drawing 2D Metaballs with WebGL2 (additive density-field, unlimited balls)](https://tympanus.net/codrops/2021/01/19/drawing-2d-metaballs-with-webgl2/)
- [Damian van der Merwe — Painting with Math: lava-lamp shader (buoyancy + ring-buffer spawn envelope)](https://damianvandermerwe.com/blog/painting-with-math-lava-lamp-shader)
- [jeantimex/fluid — WebGPU SPH + PIC/FLIP (compute, tens of thousands of particles @60fps)](https://github.com/jeantimex/fluid)
- [Emergent Mind — Valence-Arousal Space in Affective Modeling (the 4-quadrant circumplex)](https://www.emergentmind.com/topics/valence-arousal-space)
- [NVIDIA GPU Gems 3 ch.34 — SDF via single-pass GPU scan conversion of tetrahedra](https://developer.nvidia.com/gpugems/gpugems3/part-v-physics-simulation/chapter-34-signed-distance-fields-using-single-pass-gpu)
- [alexcodesart — Animated metaballs with shaders (smoothMin field, p5.js)](https://alexcodesart.com/create-animated-metaballs-with-shaders-in-p5-js-a-creative-coding-tutorial/)
