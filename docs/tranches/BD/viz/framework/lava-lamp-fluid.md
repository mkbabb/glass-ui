# The lava-lamp + fluid FACILITY — the reusable GPU procedural-fluid engine (BD viz-framework)

**Lane** BD viz-research / framework · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. Return: a 4-6 line summary; THIS doc is the binding artifact.
**Substrate-grounded** against `src/components/custom/goo-blob/` (`shaders/metaball.wgsl.ts` / `metaball.frag.ts`,
`composables/{useBlobSatellites,useBlobMood,useMetaballRenderer,uploadBlobUniforms,uniformBridgeWGPU}.ts`,
`constants.ts`, `types.ts`) + the field-engine spec (`../arch/shared-field-engine.md`, `../research/wave-math-shared.md`)
+ the blob component research (`../research/blob.md`).

> **Read alongside** `../research/blob.md` (the blob COMPONENT redevelopment — emotion model, configurator, variant axis,
> the SFC/composable layout). THIS doc owns the **engine underneath** — the reusable lava-lamp/fluid FACILITY (`useLavaField`):
> the metaball merge/split topology, the buoyancy physics, the smooth-union SDF math, the satellite morph-in/out lifecycle,
> the multi-blob organic interaction, and the procedural-vs-real-fluid decision with the full SOTA survey. blob.md CONSUMES
> this facility; this doc is the math + the engine, blob.md is the component that wires it.

---

## 0. TL;DR — the thesis, the decision, and the deliverable

**Thesis.** The lava-lamp + fluid behaviour the mandate wants ("a configurable number of SATELLITE blobs morphing in/out of
the core in a randomized lava-lamp way; MULTIPLE blobs spawnable together interacting organically; fluid + lava-lamp
robust/smooth/liquid-glass-like") is **ONE reusable facility**: a CPU-side procedural **lava field** (a small pool of
buoyancy-driven SDF sources running a birth→rise→merge→split→dissolve lifecycle) feeding ONE GPU smin-merged fragment field.
It is NOT a fluid simulation. The "fluid" read is **emergent from smin topology + buoyancy + irrational-frequency drift**, not
from Navier-Stokes — exactly the Damian van der Merwe lava-lamp shader model, generalized to N cores + a morph lifecycle + the
4-emotion modulation.

**The decision (settled, with the fences).** The DEFAULT facility is **procedural** (sine-drift buoyancy + smin merge/split +
the swell/fade envelope) — GPU-cheap, organic-by-construction, deterministic, pausable, PRM-freezable. A **real fluid sim**
(MLS-MPM / SPH / PIC-FLIP compute + screen-space-fluid-rendering) is a **booked, non-default, substrate-wide** option that
fires ONLY for a dense-swarm register (hundreds of particles) a UI mark never needs. The procedural floor is the permanent
default; §6 records the real-sim escape with its trigger so a future agent does not re-open it.

**The deliverable.** A `useLavaField` composable (the CPU sim) + the generalized `sceneDistG` smin loop (the GPU field), both
EXTENSIONS of the gate-green blob substrate (the IQ-normalized smin, the analytic-gradient normal, the typed-struct uniform
bridge) — NOT a re-fork. The facility is REUSABLE: the dock goo-split-to-sub-dock (the now-playing pill fission,
ORCHESTRATOR-NOTES §"DOCK = the now-playing pill") is the **second binary consumer** that satisfies the ≥2-consumer bar at
birth — it composes the SAME merge/split topology to fission the sub-dock off the core dock.

---

## 1. The SOTA survey — procedural lava-lamp vs real fluid (the corpus, ranked)

The question the mandate forces: **what is the cheapest GPU technique that reads as "robust, smooth, liquid-glass-like
fluid" for a decorative UI mark?** The corpus, ranked by fit:

| Technique | Mechanism | Cost @ UI scale | Fit | Verdict |
|---|---|---|---|---|
| **Procedural lava-lamp** (sine-drift buoyancy + smin + swell/fade ring-buffer) | N permanent metaballs on irrational-frequency sine paths + a pool of spawn→swell→rise→merge/split→fade blobs over a `smoothstep` envelope; surface = the smin 0-isoline | **Trivial** — `O(W·H·N)` fragment, N≤~30; CPU sim is a few-dozen entities | **THE answer.** No sim, organic by irrational-freq construction, the merge/split is FREE smin topology | **ADOPT — the default facility** |
| **Screen-space 2D-SDF smin field** (IQ smin, analytic gradient) | each fragment evals N circle-SDFs, smooth-min-merged; analytic ∇ → dome-lifted normal | **The floor** — flat cost, no overdraw, `fwidth`-AA, resolution-independent | **THE render substrate** — the blob IS this today; merge/split rides it for free | **KEEP — the render floor the facility feeds** |
| **Additive density-field + threshold** (Codrops 2021) | splat each ball as a Gaussian falloff into an FBO (additive blend), `smoothstep` the accumulated density | cheap, scales to hundreds; **loses the analytic gradient** (normal via `dFdx` of density → softer lighting, no clean refraction) | the dense-SWARM-only escape (§6) | **BOOK — non-default, dense-swarm register only** |
| **MLS-MPM / PIC-FLIP fluid sim** (compute, SSFR surface) | true Navier-Stokes: ~30k (SPH) → ~100k (MLS-MPM) particles real-time; surface via a 5-pass screen-space depth→thickness→bilateral→normal→shade pipeline | **heavy** — compute pass + 5-pass SSFR at half-res + a hard WebGPU dependency | overkill — a decorative mark needs no real fluid; the lava-lamp read is procedural | **NON-GOAL for the default** — harvest the BUOYANCY model only (§3) |
| **Ray-marched 3D blob** (raymarch SDF, true 3D normal) | per-fragment step-loop through a 3D SDF | overdraw + step-loop for a flat mark; the dome-lifted 2D gradient already fakes the volume read | the dome-lift fakes it convincingly | **NON-GOAL** — the 2D-SDF floor survives |

### 1.1 The four reference shaders to BEST (Safari-compatible)

- **Damian van der Merwe — "Painting with Math: lava-lamp shader."** THE reference for the procedural facility: 8 permanent
  metaballs on irrational-frequency sine paths + a 16-entry ring buffer of click-spawned swell→fade blobs over a `smoothstep`
  envelope. The buoyancy + the ring-buffer spawn lifecycle = §3's model. **No sim, GPU-cheap, organic-by-construction.**
- **Codrops 2025 — "Interactive droplet-like metaballs (Three.js + GLSL)."** A mouse-ball other balls merge into + a
  click-to-spawn — the EXACT multi-blob interactivity model (§4). The pointer is a physical participant in the field.
- **Codrops 2021 — "Drawing 2D Metaballs with WebGL2."** The additive-density unlimited-ball path (the §6 dense-swarm escape).
- **jeantimex/fluid — WebGPU SPH + PIC/FLIP.** The real-fluid reference (tens of thousands of particles @60fps) — the §6
  booked escape; harvest ONLY its buoyancy term, never the sim, for the default.

**Safari fact (binding — ORCHESTRATOR-NOTES §SAFARI IS ABSOLUTE):** the SDF smin fragment field + the gel/Memphis
`drop-shadow` ground-shadow are all WebKit-safe (a pure fragment shader + a CSS filter). The facility carries NO Chromium-only
path. WebGPU-first where the platform allows it (Safari 26+ ships WebGPU); the WebGL2 `.frag` fallback is the ~5-10% tail. The
real-sim escape (§6) WOULD need WebGPU compute — recorded as a fence, never the default.

---

## 2. The smooth-union SDF — the merge/split math (the gate-green floor, generalized)

The facility's whole "liquid" read is the **smooth-minimum (smin) of N circle-SDFs**. This is the gate-green blob math
(`metaball.{wgsl,frag}.ts` `sminQuadraticG`/`sminCircularG`, the IQ-2024 normalized value+gradient form) — the facility GENERALIZES
the loop from {1 core + sats + trail} to {M cores + K satellites + J trail}, it does NOT re-derive the operator.

### 2.1 The operator (KEEP — `proof:blob-smin-normalized` locks it)

```
sminG(a, b, k):                          // a, b = vec3(dist, ∂/∂x, ∂/∂y)  (value + analytic gradient)
  quadratic:  k' = k*4 ; h = max(k'-|a.x-b.x|,0)/k' ; dist = min(a.x,b.x) - h²·k'·0.25
  circular:   k' = k/(1-√0.5) ; m = k'·0.5·(1+h-√(1-h(h-2))) ; dist = min(a.x,b.x) - m
  grad = mix(a.yz, b.yz, w)               // the blended gradient → the dome-lifted normal
```

The `k` band is the **merge reach**: two sources within `k` of each other fuse into one surface with a smooth meniscus neck;
beyond `k` they are separate islands. **This single parameter IS the merge/split mechanism** — there is NO explicit "cut".

### 2.2 Merge and split are EMERGENT topology — the keystone insight

**A satellite/core does not "decide" to merge or split — the smin field does it automatically as distance crosses `k`.**

- **Merge** — as a source drifts toward the core (distance → 0), the smin neck thickens and the two read as ONE blob. This is
  free: the loop already smin-merges every source every frame.
- **Split** — as a source drifts away (distance → past `k`), the neck THINS (a stretching meniscus), then DISCONNECTS into a
  free metaball. Also free: the field naturally separates when the gap exceeds the reach.

So the lifecycle (§3) drives only **positions + radii + opacity**; the merge/split SILHOUETTE is pure smin geometry. The neck
stretch is the smin meniscus; the pinch-off is the gap crossing `k`. NO topology bookkeeping in the sim — the GPU field is the
topology authority. This is why the facility is "robust + smooth": there is no discrete branch to glitch.

### 2.3 The opacity-as-detach trick (KEEP — the shipped `satG.x += (1-s.w)*0.3` line)

The shipped shader (`metaball.wgsl.ts` scene loop) pushes a fading source's SDF OUTWARD by its inverse opacity:
`satG.x = satG.x + (1.0 - s.w) * 0.3`. A satellite at `opacity=0` is pushed +0.3 in distance — out of every smin band, fully
detached, contributing nothing. **This is the clean dissolve mechanism:** the lifecycle fades `opacity 1→0` and the source
melts out of the field WITHOUT a hard removal (a hard removal would pop the silhouette). KEEP it; the lifecycle's `dissolving`
phase rides it directly.

### 2.4 The `k` band must ride the worst-case reach (the BA.W-GOO-REDRESS lesson — generalize it)

The shipped uploader (`uploadBlobUniforms.ts`) already widens the smin band to the **worst-case orbit excursion**
(`nominalBand * orbitWiden`, `orbitWiden = min(1.25, 1 + bridgeGap/nominalBand)`) so a satellite at its farthest never
detaches mid-bridge. The facility GENERALIZES this: the `k` band per-pair must cover the **buoyancy excursion** (a rising
satellite reaching its apex), and the `uMaxReach` early-out bound must sum the **tallest rise** (the lava-lamp lamp-glass
height), not just the orbit radius. The math is the same worst-case-pad idiom; the input is now buoyancy displacement instead
of orbit eccentricity. **Recorded so the lava lifecycle does not re-introduce the detach-mid-rise defect the orbit model
fixed.**

---

## 3. The satellite lifecycle — birth→rise→merge/split→dissolve (the lava-lamp core)

Today's satellites ORBIT forever (`useBlobSatellites.ts` — eccentric ellipse + 2-sine wobble; they bridge the core but never
detach). The lava-lamp model REPLACES the eternal orbit with a **buoyancy-driven phase state machine** per source. This is the
literal "morph IN/OUT lava-lamp" ask.

### 3.1 The phase machine (replaces the orbit phase machine)

```
            ┌──────────────────────────────────────────────────────────┐
            ▼                                                          │
  dormant → birthing(swell-in) → rising(buoyant drift) → ┬─ merging(absorbed → radius 0 into core)
                                                          └─ splitting(neck pinch) → free-floating
                                                                                          │
                                                            dissolving(fade via §2.3) ◄──┘
                                                                  │
                                                                  ▼
                                                               dormant
```

- **dormant** — a pooled slot at `opacity 0`, radius 0, out of the field (§2.3). The pool is compile-time bounded (`MAX_SATS`
  today; raise to ~8–12 + a count uniform — KEEP the `array<vec4,N>` packing, NOT a dynamic index; the W07 Metal
  dynamic-index-returns-zero lesson).
- **birthing** — `swellIn = smoothstep(0, BIRTH_FRAC, age)`: the source SWELLS into existence from radius 0 at the core's
  surface (or the lamp floor). It is smin-merged from frame 0, so it reads as a BUD growing OUT of the core, never a popped-in
  disc (the Damian van der Merwe envelope).
- **rising / sinking** — **buoyancy drift** (§3.2) + a de-synced multi-sine lateral wander (irrational frequencies
  `sin(t·0.13)` / `cos(t·0.11)` — never visibly repeats; KEEP the existing wobble model, re-purpose it from orbit to lateral
  drift). The source stays smin-merged while near the core (the neck KEEPS); the neck STRETCHES as it rises away (free smin
  geometry, §2.2).
- **merging vs splitting** — at the apex/nadir the source either re-MERGES (drifts back, neck thickens, absorbed → radius 0)
  or PINCHES OFF (the rise carries it past `k`, the neck thins, it becomes a free metaball). **Both are pure smin geometry**
  (§2.2) — NO explicit cut; the topology change is emergent from the gap crossing `k`.
- **free-floating** — a pinched-off blob drifts on its own buoyancy + lateral wander, a separate island.
- **dissolving** — `fadeOut = 1 - smoothstep(life·0.5, life, age)`: the free blob fades `opacity 1→0`, melting out via §2.3,
  and returns to dormant. The pool slot is recycled.

The phase timing rides the **canonical tempo-integrated clock** (the shipped `now` the renderer scales by tempo — W11.c), so
pausing tempo freezes the lifecycle with no discontinuity. KEEP this; it is why the facility is pausable + PRM-freezable.

### 3.2 The buoyancy physics — the lava-lamp gravity term

The lava-lamp metaphor IS buoyancy: warm blobs RISE, cool blobs SINK, they turn over at the top/bottom. The facility models
this as a **density-driven vertical force**, NOT a fluid sim (harvested from the SPH/MLS-MPM buoyancy term, §6, without the
sim):

```
each source carries a `temperature` τ ∈ [0,1]  (warms near the core/floor, cools near the apex/ceiling)
buoyancy force  F_y = BUOY_K · (τ - τ_ambient)          // warm → +y rise, cool → −y sink
                + verticalBias · EMOTION_BUOY            // §3.3 — the emotion biases the whole field up/down
velocity        v_y += (F_y - DRAG·v_y) · dt            // critically-damped (the existing pointer-spring idiom)
position        p_y += v_y · dt
```

- **The turnover** — τ cools as the source rises (loses "heat" to the ambient), so F_y flips negative near the ceiling and the
  blob sinks back — the lava-lamp convection cell, emergent from one scalar τ, no sim.
- **Container-aware** — the field knows its bounds (the lamp glass): sources rise to the top and sink to the bottom WITHIN
  them, cores bounce softly off the walls (a few cheap clamp terms in the CPU sim, ORCHESTRATOR-NOTES container-aware
  buoyancy). This sells the lava-lamp metaphor cheaply.
- **Critically-damped** — the velocity integration reuses the existing critically-damped spring shape (the pointer-spring
  idiom), so the rise is smooth, never a ballistic pop. This is the "smooth + robust" guarantee.

### 3.3 The emotion modulation (the 4-state hook — see blob.md §2)

The 4-emotion model (blob.md §2: `calm | excited | melancholy | playful`, the {valence, arousal} circumplex) modulates the
facility via THREE derived knobs the lifecycle reads (the facility owns the physics; blob.md owns the emotion derivation):

| Knob | Driven by | Calm | Excited | Melancholy | Playful |
|---|---|---|---|---|---|
| **count target** | arousal | 1–2 lazy | 3–5 churny | 1–2 sinking | 3–5 erratic |
| **`verticalBias`** (buoyancy direction) | valence×arousal | gentle rise | strong rise | SINK | neutral/erratic |
| **`smoothK`** (merge viscosity) | arousal | high-K (gooey, slow merge) | low-K (crisp, fast merge/split) | mid-K | low-K (springy) |

The count is an emotion-derived TARGET the spawner ramps toward (births/dissolves to hit it — never a hard re-count that pops
sources). `verticalBias` is the NEW buoyancy axis the 4-state model needs (Calm/Excited RISE, Melancholy SINKS, Playful
neutral-erratic), derived from valence×arousal — NOT a new hand-knob. The cross-fade is in {v,a} space (re-derive params each
frame via `paramsFor`), so an emotion is never a hard cut and the facility's tendencies drift smoothly.

---

## 4. Multiple blobs interacting organically — the N-core single-field merge

The scope goes from "1 core + satellites" to "**M cores, each with satellites, all in ONE smin field**". **The keystone:
multi-blob is just MORE TERMS in the same smin accumulation — there is no second mechanism.**

### 4.1 One scene-SDF, N terms

`sceneDistG = smin over { core_0..core_{M−1}, sat_0..sat_{K−1}, trail_0..trail_{J−1} }`. The existing `sceneDistG` generalizes
from {1 core + sats + trail} to {M cores + sats + trail} by extending the smin loop. Cores near each other MERGE (fields
overlap past `k`); cores far apart stay separate islands. The merge/split between TWO CORES is the SAME §2.2 emergent topology
as a satellite merge — organic by construction.

### 4.2 Core drift + soft mutual attraction (the organic clustering)

- Each core drifts on its OWN irrational-frequency sine path (the 8-permanent-ball lava-lamp model) + buoyancy (§3.2).
- A **soft pairwise attraction/repulsion** so cores cluster and part organically: a cheap `O(M²)` pairwise term in the CPU
  sim (at M≤~6 cores, trivial — no compute pass). Near cores attract (drift together, merge), then a soft repulsion past a
  threshold parts them (a breathing cluster). This is the "interacting organically" the mandate names.
- The pointer ATTRACTS the nearest core (the existing pointer-attraction, generalized to pick the nearest of M cores).

### 4.3 Spawn / fission (the dock-fission consumer #2)

- **`spawnBlob(x, y)` / click-to-spawn** adds a core at the pointer (the Codrops droplet model); each new core swells-in via
  the §3.1 birthing envelope. `blobCount` config atom (default 1 = single-core back-compat; >1 = the multi register).
- **`fission(source, target)`** — the dock goo-split: a sub-blob PINCHES OFF the core toward a target rect (the now-playing
  sub-dock). This is the SAME §2.2 split topology driven deterministically (the neck thins as the sub-blob pulls to the
  target) — the dock composes the facility, never re-forks the merge math. **This is the ≥2-consumer bar met at birth**
  (blob component + dock fission), recorded in the facility's consumer-evidence.

### 4.4 The cost (why no compute pass at UI scale)

The fragment cost is `O(W·H·(M+K+J))`. At M≤6 cores + K≤12 satellites + J≤15 trail ≈ **33 SDF evals/fragment** — well within a
fullscreen pass (the dome-lifted normal + shade adds a constant). The compute pre-pass (§6) adds a buffer round-trip + sync
barrier with ZERO field-eval savings at ≤33 entities; it earns its place only past ~hundreds of balls. **The fragment floor is
the permanent default.**

---

## 5. The render architecture — CPU-sim the field, GPU-render it

The facility is the **CPU SIM** (positions, radii, opacity, temperature, the lifecycle state machines, the buoyancy
integration, the N² pairwise term, the emotion arc); the GPU does the **field eval + surface shade only** (the fragment pass).
This is the EXISTING blob split (`useMetaballRenderer.resolveFrame` advance → uniform upload → fragment draw), generalized to
N entities.

```
CPU (useLavaField.tick(now, emotion)):                        GPU (the fragment field — KEEP, generalize):
  for each core:   buoyancy + drift + N²-attract + clamp        sceneDistG = smin over { cores[M], sats[K], trail[J] }
  for each sat:    lifecycle phase advance + buoyancy + swell    alpha     = fwidth-AA(sceneDistG.x)          (KEEP)
  emotion arc:     {v,a} drift → paramsFor → count/bias/K        normal    = domeLift(sceneDistG.yz)          (KEEP)
  pack:            array<vec4,N> (pos.xy, radius, opacity)       shade     = variant ? lit(...) : flat-fill   (KEEP)
  → upload via uniformBridgeWGPU (the typed-struct SoT)          out       = premultiply(shade, alpha)        (KEEP)
```

**Why CPU sim:** a few-dozen entities is trivial cost; it keeps the sim DETERMINISTIC (seeded prng, reproducible π), PAUSABLE
(the tempo clock), and PRM-FREEZABLE (the substrate park gate draws one static frame then parks). A compute-sim would forfeit
all three for no win at this scale. The facility OWNS the sim; the GPU owns only the field+shade — the gate-green split,
generalized.

**The uniform bridge (KEEP — extend the caps):** the typed-struct `array<vec4,N>` packing (`uniformBridgeWGPU.ts` — the
std140-vs-WGSL alignment SoT) is the contract. Raise `MAX_SATS`→~12, add `MAX_CORES`→~6; the count uniforms (`uSatCount`,
`uCoreCount`) gate the loops with an `if (i >= count) break;` early-out (the shipped idiom). The caps are a compile-time
contract the JS const, the WGSL `const`, and the GLSL `#define` all read from `constants.ts` (the single source).

---

## 6. The real-fluid escape — booked, non-default, substrate-wide (the fence)

IF a future register wants a true churning swarm (hundreds of micro-satellites, a real fluid look), the fragment `O(W·H·N)`
field becomes the bottleneck. TWO SOTA escapes, **BOOKED not built**:

1. **Additive density-field** (Codrops 2021): splat each micro-ball as a Gaussian into an FBO (additive blend), threshold the
   accumulated density → "cheap unlimited metaballs." Loses the analytic gradient (normal via `dFdx`/`dFdy` of density —
   softer lighting, no clean refraction). Portable WebGL2, no compute. **The dense-swarm register escape.**
2. **WebGPU compute fluid sim** (MLS-MPM / PIC-FLIP, the jeantimex/fluid reference): a compute pass advects N particles binned
   to a grid; surface via SSFR (depth→thickness→bilateral→normal→shade). Worth it only at thousands of particles + a hard
   WebGPU dependency a decorative mark cannot carry alone.

**The fences (recorded so a future agent does not re-open the default decision):**
- The real sim is **substrate-wide if ever** (the aurora-WGSL precedent — a hard WebGPU dependency is a suite-level decision,
  never blob-local), never the default.
- The trigger is a consumer needing **>~50 balls** (the ≥2-consumer / no-overfitting bar). The default lava field (M≤6 cores +
  K≤12 sats) STAYS on the fragment floor.
- **No Navier-Stokes for the default.** The lava-lamp is PROCEDURAL (sine-drift buoyancy + smin topology), not physical. Only
  the buoyancy MODEL (§3.2) is harvested from the fluid corpus, never the sim.

---

## 7. The liquid-glass surface — the "liquid glass like" half (the surface upgrade)

"Robust, smooth, and liquid glass like" names the SURFACE read, not just the motion. The facility's silhouette feeds the
existing lit-glass register (`variant: "meatball"` — analytic-normal lit + specular + iridescence + fake-SSS + rim) and a
booked THIRD register:

- **`variant: "glass"` — `uBackdrop` Snell refraction (the WWDC-2025 read, booked in blob.md §7 idea 8).** Sample a
  glass-ui-rendered backdrop texture (an aurora FBO / baked gradient), displace by the dome-bevel normal → true Snell
  refraction + low chromatic dispersion. Portable WebGL2 (an in-shader texture sample, NOT `backdrop-filter:url()` — the
  WebKit gap does NOT bite). "blob over the aurora" is the hero composition. This is the one architecturally-absent 2025 move;
  the facility's job is to PRODUCE the silhouette + normal the refraction reads — the surface itself is blob.md's `variant`
  axis.
- **The Apple squircle dome-bevel** (`⁴√(1−(1−x)⁴)` vs the spherical `√(1−(1−x)²)`) — the softer flat-to-curve that rhymes
  with the library squircle identity (AX.W56). A candidate dome-Z switch (byte-fence the normal). This is the surface-quality
  refinement that makes the merge read as thick liquid glass, not a thin film.
- **The compositor-only ground shadow** (the cartoon-shadow axis, blob.md §6) — the gel-dome / Memphis offset-stamp
  `drop-shadow` that FOLLOWS the irregular silhouette. The facility produces the silhouette; the shadow is a CSS filter on the
  canvas (Safari-safe, PRM-safe).

---

## 8. The proposed facility API — `useLavaField` (the reusable engine)

```
src/composables/glass/   (or src/components/custom/blob/composables/ — home decided by the executing wave)
└── useLavaField.ts       # the reusable lava-lamp/fluid SIM facility

export interface LavaSource {              // a pooled SDF source (core | satellite | free blob)
  kind: "core" | "satellite";
  phase: LavaPhase;                        // dormant | birthing | rising | merging | splitting | free | dissolving
  x: number; y: number; radius: number; opacity: number;
  vx: number; vy: number;                  // buoyancy-integrated velocity
  temperature: number;                     // τ — the buoyancy driver (§3.2)
  // + the de-synced multi-sine wander params (KEEP from useBlobSatellites)
}

export interface LavaFieldOptions {
  coreCount: MaybeRefOrGetter<number>;     // M (default 1 — single-core back-compat)
  satelliteCount: MaybeRefOrGetter<number>;// K target (emotion-modulated, §3.3)
  bounds: MaybeRefOrGetter<Rect>;          // the lamp-glass container (§3.2)
  seed: string;                            // deterministic prng (KEEP — mulberry32 + hashString)
}

export function useLavaField(opts: LavaFieldOptions) {
  // tick(now, emotionParams) — advance the buoyancy + lifecycle + N²-attract + emotion arc
  // sources: LavaSource[] — the packed field the renderer uploads (cores + sats, ordered)
  // spawnBlob(x, y) / fission(source, targetRect) — the click-spawn + dock-fission seams (§4.3)
  // nudge() / reseed(seed) — KEEP from useBlobSatellites
  // isQuiescent() / nextEventMs(now) — KEEP the demand-loop park predicates (the substrate gate)
  return { sources, tick, spawnBlob, fission, nudge, reseed, isQuiescent, nextEventMs };
}
```

- **`useLavaField` = the generalized `useBlobSatellites`** (the orbit lifecycle → the lava lifecycle) + the N-core sim (the
  part of `useMetaballRenderer.resolveFrame` that advances positions) + the buoyancy integrator. It owns NO GPU code (the
  field+shade stays in the shaders) and NO emotion DERIVATION (it READS `emotionParams` from `useBlobEmotion`/blob.md §2) —
  the single-responsibility carve.
- **Quiescence preserved (the substrate park gate):** the facility is QUIESCENT (the loop may park) when every source is in a
  steady phase (`rising`/`free` with no transition due) — the existing `isQuiescent`/`nextEventMs` predicates generalized to
  the lava phases. The demand-loop wakes at the next phase boundary (birth/merge/split/dissolve), NOT a poll. KEEP — it is why
  an idle blob attaches zero frames.
- **The two binary consumers (≥2 bar):** (1) `Blob.vue` (the component, blob.md), (2) the dock goo-split-to-sub-dock
  (`fission`, ORCHESTRATOR-NOTES §DOCK). Recorded in `docs/consumer-evidence/use-lava-field.md` (the early-publish path).

---

## 9. The fences + non-goals (recorded so a future agent does not re-open)

- **Procedural is the default; NO fluid sim (MLS-MPM/SPH/PIC-FLIP) for the default.** The lava-lamp is sine-drift buoyancy +
  smin topology, not Navier-Stokes. The real-sim compute path is a dense-swarm-only OPTION (§6), substrate-wide if ever, never
  the facility default. Only the buoyancy MODEL is harvested.
- **GPU-only is ABSOLUTE; Canvas2D never enters the facility.** The sim is CPU (a few-dozen entities, not pixels); the field +
  shade is WGSL primary + GLSL fallback over `useGpuSubstrate`. ZERO `getContext("2d")`. (blob is already Canvas2D-free.)
- **The smin operator + the analytic-gradient normal + the 12 `proof:blob-*` gates are gate-green — do NOT re-derive.** The
  facility GENERALIZES the loop (N=1 → N), it does not replace the algorithm. The N-core generalization is additive at N=1
  (byte-fence the smin math; the gates stay GREEN through the extension).
- **Merge/split is EMERGENT smin topology, never an explicit cut** (§2.2). The sim drives positions/radii/opacity; the GPU
  field is the topology authority. NO topology bookkeeping in the sim — this is the robustness guarantee.
- **The `array<vec4,N>` uniform packing, NOT a dynamic index** (the W07 Metal dynamic-index-returns-zero lesson). The caps are
  a compile-time contract (`constants.ts` single source); raise them, do not switch to dynamic indexing.
- **Safari-first (ORCHESTRATOR mandate).** The SDF fragment field + the `drop-shadow` ground shadow + the `uBackdrop` in-shader
  refraction are all WebKit-safe. The real-sim escape WOULD need WebGPU compute — recorded as a fence, never the default.
- **The buoyancy excursion must ride the worst-case `k` band** (§2.4 — the BA.W-GOO-REDRESS lesson generalized from orbit to
  buoyancy), so a rising satellite never detaches mid-rise.

---

## 10. The executing wave

**`W-LAVA-FIELD`** (Band: viz / blob redevelopment, sequenced AFTER `W-FIELD-ENGINE` — the lava field's lateral-wander +
buoyancy-perturbation may CONSUME the shared `wave`/`noise` chunks for the de-synced drift — and BEFORE `W-BLOB-REDEVELOP`,
which wires `useLavaField` into `Blob.vue`). Depends-on: the GPU-only substrate spine + the field engine. Consumed-by:
`Blob.vue` (blob.md) + the dock goo-split-to-sub-dock (`fission`). Gate: `proof:lava-field` — (a) the lifecycle phase machine
(birth→rise→merge/split→dissolve) + the buoyancy integrator, (b) the N-core single-smin-field (multi-blob is more terms, no
2nd mechanism), (c) merge/split is emergent smin topology (no explicit cut), (d) the procedural-not-sim fence + the real-sim
booking, (e) the ≥2-consumer bar (blob + dock fission), (f) the quiescence/PRM/park predicates preserved + a self-test bite (a
planted explicit-cut or a Canvas2D path reds). The 12 `proof:blob-*` gates stay GREEN through the extension (the N=1 byte
fence).

---

## Sources

- `src/components/custom/goo-blob/` (HEAD source facts): `shaders/metaball.wgsl.ts` (the smin scene loop §2.1–2.3, the
  worst-case `uMaxReach` §2.4), `composables/{useBlobSatellites,useBlobMood,useMetaballRenderer,uploadBlobUniforms,uniformBridgeWGPU}.ts`,
  `constants.ts` (the `MAX_SATS`/`POS_SCALE` caps + the `MOOD_AVA` circumplex), `types.ts`.
- `docs/tranches/BD/viz/research/blob.md` (the blob COMPONENT redevelopment — the consumer of this facility).
- `docs/tranches/BD/viz/arch/shared-field-engine.md` + `research/wave-math-shared.md` (the noise/wave chunks the facility's
  drift consumes).
- `docs/tranches/BD/union/ORCHESTRATOR-NOTES.md` (the DOCK goo-split-to-sub-dock consumer + the Safari-first mandate).
- [Damian van der Merwe — Painting with Math: lava-lamp shader (buoyancy + ring-buffer spawn envelope)](https://damianvandermerwe.com/blog/painting-with-math-lava-lamp-shader)
- [Codrops — Interactive droplet-like metaballs (Three.js + GLSL, mouse-ball merge + click-spawn)](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)
- [Codrops — Drawing 2D Metaballs with WebGL2 (additive density-field, unlimited balls)](https://tympanus.net/codrops/2021/01/19/drawing-2d-metaballs-with-webgl2/)
- [Codrops — WebGPU Fluid Simulations (MLS-MPM, ~100k particles, SSFR — the real-sim reference)](https://tympanus.net/codrops/2025/02/26/webgpu-fluid-simulations-high-performance-real-time-rendering/)
- [jeantimex/fluid — WebGPU SPH + PIC/FLIP (compute, tens of thousands of particles @60fps)](https://github.com/jeantimex/fluid)
- [Inigo Quilez — smooth minimum (the IQ-normalized smin family)](https://iquilezles.org/articles/smin/)
