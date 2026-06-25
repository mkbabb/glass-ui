# GooBlob greenfield — LENS B: CROSS-ENGINE / PERF-FIRST

> Lens: design for FLAWLESS Chrome **and** Safari + performance. The meatball/liquid
> motion must be perfect on WebKit. Favor the simplest mechanism that hits the bar
> (KISS); GPU-only where it is a viz; offscreen-pause. The DELTA-ASSAY reconciles
> against the 116 union waves — **no dup, no re-fork, a UNION with the extant engine**.
>
> **Source-verify discipline:** every uniform/composable/constant cited below was
> grepped on HEAD. Verified inventory: WGSL + GLSL bridges carry IDENTICAL uniform
> name sets (`uniformBridgeWGPU.ts` ∩ `uploadBlobUniforms.ts`, 43 shared scalars +
> `uSatPos`/`uSatRadius`/`uSatOpacity`/`uTrailPos`/`uTrailRadius`/`uPalette` GLSL-array
> twins). Constants verified: `MAX_SATS=4`, `TRAIL_N=15`, `POS_SCALE=1/1.6`,
> `PULSE_OMEGA=18`, `PULSE_ZETA=0.35`, `ORBIT_RANDOM_BASE=0.85`, `ORBIT_RANDOM_SPAN=0.2`.
> `navigator.gpu` present on the dev box → **the LIVE path is the WGSL primary** (the
> `metaball.wgsl.ts` module, NOT the `.frag` fallback). Live route: `/substrates/blob`.

---

## 0. The live-judged gestalt (BOTH stages, the WGSL-primary path) — the REAL defect

I navigated `/substrates/blob` (WebGPU-armed, light mode) and live-judged BOTH the
lit STAGE-2 studio hero and the STAGE-1 plain floor. The captured read:

- **STAGE-2 lit hero:** a single warm-cream lit dome — genuinely warm (NOT gray; the
  BA.W-NO-GRAY floor + the cream `paletteStops` default hold), genuinely lit (the
  Blinn-Phong glint + Fresnel rim + the gel-dome drop-shadow read). **But the
  satellites read as faint inward DIMPLES/dents on the body surface, not as bodies
  merging in with a neck.** It looks like a smooth potato with three pinch-marks.
- **STAGE-1 plain floor:** the field reads more honestly here (flat fill, no lit
  distraction) and it CONFIRMS the cardinal defect: **the silhouette is one connected
  amorphous lump with a couple of bumps — you NEVER see two distinct bodies pinch a
  thin neck and SPLIT.** The merge half happens (satellites are smin-bonded to the
  body); the **split** half — the dramatic neck-thin-then-snap that reads as "liquid
  mercury" — is INVISIBLE.

**This is the user's law failing in its second guise.** The user's law is two-part:
"NAIL the goo morphing, not naive ellipsoids" **and** "meatballing must work
perfectly." The team already cured guise #1 (stamped ovals → a real smin field with
a warm-cream lit dome). But guise #2 is live: the field is **topologically static** —
it merges and never splits, so it reads as a lumpy mass, not a living metaball system
of beads that merge and pinch off. The SDF math is correct (12 `proof:blob-*` lock
it); the **geometry/lifecycle that drives the field is the gap.** The orbit is tuned
DEFENSIVELY (every BA/AZ wave clamped the orbit envelope and widened the smin band to
keep the satellite "inside the smin reach across the WHOLE orbit … the gooey neck is
the DEFAULT visible state … the satellite never floats as an unrelated disc") — a
correct fix for the "two unrelated discs" failure, but it OVER-corrected: by forbidding
the satellite from ever leaving the smin reach, it also forbade the **split**, and the
split is HALF of what reads as metaball liquid. A permanently-merged field is a lump.

### The cross-engine corollary (the lens's own axis)

The live path is WGSL on a real GPU. The `.frag` fallback exists but is exercised only
on `navigator.gpu`-absent engines — **which is Safari ≤ some-version on many Macs**.
The BC.W-GOOBLOB-MEATBALL wave already fixed the cardinal Metal/WGSL hazard (the
`fwidth()`-in-non-uniform-control-flow uniformity error that silently dropped the WGSL
module on Metal, falling EVERY GooBlob to the WebGL2 net — the "broken on Safari" the
user reported). That is FIT and PRESERVED. The remaining cross-engine risk is NOT the
shader compile — it is **parity of the topological motion** across the two backends:
the split mechanic (below) must read IDENTICALLY on WGSL-on-Metal and GLSL-on-ANGLE,
and the `softShadow2D` 24-step march (the one shared per-pixel loop) is the per-frame
cost that BF.W-GOO-SPLIT-PERF already books as the un-automatable real-Safari-26-Metal
p50 number. **This lens does NOT add a second per-pixel loop.**

---

## 1. The CORE IDEA — "the field must SPLIT, not just merge": a fission-breath lifecycle on the EXISTING satellite system

The single gestalt move: **give the satellite lifecycle a genuine SEPARATION phase
with a visible necking-and-snap**, so the creature continuously merges AND splits —
the living mercury read. This is a CPU-side lifecycle change on the EXISTING
`useBlobSatellites` phase machine + a single existing-uniform retune; it adds **ZERO
new uniforms, ZERO new per-pixel shader loops, ZERO new context.** The shader already
does everything needed — it is a perfect smin field with an analytic gradient and a
warm-cream lit dome. The field has just never been DRIVEN to split.

Today the satellite phase machine is `orbiting → merging → absorbed → emerging`
(verified `types.ts:55` `SatellitePhase`). The defect: `merging` necks IN, `absorbed`
hides the satellite INSIDE the body, `emerging` re-buds it from the body center — so a
satellite is EITHER orbiting-at-a-fixed-merged-distance OR hidden. **There is no phase
where a satellite, fully bonded, pulls AWAY and the neck thins to a waist and SNAPS.**

The greenfield lifecycle adds exactly that, by RE-PURPOSING the existing phases (no new
phase enum member, no parallel machine — survival of the fittest: refine the weak):

| Phase | Today | Greenfield (the fission-breath) |
|---|---|---|
| `orbiting` | fixed merged distance, permanently inside smin reach | the satellite breathes OUT on a slow φ-detuned clock to a distance where the **smin neck thins to a visible waist**, then breathes back IN — the merge/un-merge is the steady-state, not a rare event |
| `merging` | necks in | unchanged (the bond-in half) |
| `absorbed` | hidden inside body | unchanged (a rare full-absorb, kept for variety) |
| `emerging` | re-buds from center | **the SPLIT/PINCH-OFF** — the satellite pulls away and the neck thins past the smin reach so it **SNAPS into a free orbiting bead** (the mercury pinch), then re-merges next cycle |

The math that makes the SNAP read is already in the shader: `sminG` produces a
quarter-circle fillet whose neck width is a function of `|dist_a − dist_b|` vs `k`. When
the satellite-to-body gap exceeds `k`, the smin contribution falls to `min(a,b)` and the
neck VANISHES (the bodies separate). So the split is purely a matter of letting the
orbit excursion exceed `k` for a controlled window each cycle — a **CPU geometry retune
on the existing orbit envelope**, gated so the centroid stays within the
`proof:blob-render` calm-lean ceiling.

**The single boldest move (stated up front, expanded in §3.1):** retire the
"satellite never leaves the smin reach" invariant — the AZ/BA defensive clamp that
made the field permanently-merged — and replace it with a **bounded fission excursion**:
the satellite is ALLOWED to cross the smin threshold and pinch off, but only ONE
satellite at a time and only into a bounded reach, so the silhouette still reads as ONE
governed creature (never "two unrelated discs") yet now genuinely SPLITS. The
"unrelated-disc" failure the clamp prevented is re-prevented by a DIFFERENT, cheaper
guard (the single-fissioning-satellite + bounded-reach rule), so the cure for guise #1
survives while guise #2 is finally fixed.

---

## 2. The visual + motion + interaction spec

### 2.1 Visual (the metaball read — both modes, both engines)

- **The merge** reads as a wet quarter-circle fillet (the `circular` smin, already the
  library default — `membrane.merge: "circular"`, verified `types.ts:313`). KEEP.
- **The neck** must reach a genuine WAIST: at the breath-out apex the neck width drops
  to ~⅓ of the satellite diameter (a thin liquid bridge), then at the pinch-off it
  drops to zero and the bead is free. This is the iOS-27 T2 fission signature
  (IOS27-REFERENCE.md T2: "metaballs neck thin + snap") expressed on the procedural
  field instead of the dock SVG filter.
- **Warm-cream identity HOLDS unconditionally** — the split is a GEOMETRY change; color
  is untouched. The pinched-off bead carries the per-satellite derived shade
  BD.W-GOOBLOB-SAT-SHADE lands (an analogous warm step off the body), so a free bead
  reads as a RELATED droplet, never a foreign disc. (DELTA: this lens DEPENDS on
  SAT-SHADE for the free-bead-not-foreign read — see §6.)
- **Dark mode:** the same geometry; the cream ramp + dark-mode rim guard (the shader's
  `lack`/`targetL` min-contrast block, verified `metaball.frag.ts:493-501`) already
  hold. No new dark arm.

### 2.2 Motion (LIQUID-WEIGHT UNIVERSAL — the law)

- **The fission clock is SLOW and φ-detuned.** The breath-out/in excursion rides a
  detuned multi-sine (rhyming with the existing `breath()` body-radius pulse —
  three irrational-ratio sines, verified `metaball.frag.ts:80-84`) so the merges/splits
  never re-phase: the creature is perpetually mid-merge on one satellite while
  mid-split on another. NO metronome.
- **The pinch-off carries WEIGHT.** When a bead snaps free, the body RECOILS slightly
  (a one-shot impulse on the existing `pulseVel` oscillator — the SAME `click()` channel
  the renderer already kicks for the decel snap-back, verified `useMetaballRenderer.ts:246`
  `pointer.click(...)`). No new channel: the pinch-off feeds the existing body-pulse
  spring a small impulse, so the body squashes-and-settles when a bead leaves (the
  follow-through / overlapping-action cartoon principle, design.md §L4). The freed bead
  arcs out then drifts back (an ARC, not a straight line — the existing per-satellite
  `pertX/pertY` wobble envelope already produces the arc, verified `types.ts:71-78`).
- **Morph MORE on move** (the law): a fast pointer flick INCREASES the fission rate —
  the existing `usePointerVelocityField` burst (verified `useMetaballRenderer.ts:122`,
  `pointerField.burst.value`) scales the breath-out amplitude so an agitated creature
  splits more violently (more, thinner necks; faster pinch-offs), a calm one barely
  splits. This is the liquid-weight "the faster you move it, the more it goos" read,
  reusing the field the renderer ALREADY consumes for the decel-snap.

### 2.3 Interaction

- **Hover lean** — unchanged (the calm coherent lean, `interaction.pointerStrength`
  0.10, the D2 sign-corrected channel). The fission rides ON it.
- **Click** — fires the existing spring impulse AND now also triggers a one-shot
  "shudder-split" (a single satellite pinches off on the click, the cartoon-PUNCH
  reaction to a poke). Reuses the existing `pulse()`/`pointer.click()` path — no new
  expose.
- **Mood** — the fission rate is mood-coupled through the EXISTING `MoodParams`
  (`orbitSpeedScale`, verified `types.ts:33`): `excited` → faster, more splits;
  `sleepy` → the field barely splits (a calm near-static merge). No new mood field.

---

## 3. The precise mechanism (tokens / recipes / shaders / composables)

### 3.1 The boldest move — replace the "never-leaves-smin-reach" clamp with a bounded single-fission excursion (CPU, `useBlobSatellites.ts`)

**Files:** `src/components/custom/goo-blob/composables/useBlobSatellites.ts` (the phase
machine + orbit envelope) + `src/components/custom/goo-blob/constants.ts` (the
`ORBIT_RANDOM_BASE/SPAN` envelope + a new `FISSION_*` window). **Zero shader edit.**

The mechanism:
1. Each cycle, **at most ONE satellite is the "fissioning" satellite** (a phase-machine
   token, like the existing `phase`). It alone is permitted an orbit excursion whose
   apex carries it PAST the body's smin reach (`gap > smoothK·POS_SCALE`), so its neck
   thins to a waist then SNAPS. Every other satellite stays in the bonded
   merge/un-merge breath (necks thin but never fully part) — so the silhouette is always
   ONE governed creature plus AT MOST one pinching bead. **The "two unrelated discs"
   failure is re-prevented by this single-fissioner + bounded-apex rule**, NOT by the
   blanket "never leaves reach" clamp — which is RETIRED (the clean break; no dual path).
2. The fission apex is BOUNDED (`FISSION_REACH_MAX`, in config-UV) so the freed bead
   stays inside the canvas overflow margin (the four-side containment witnesses the
   AZ/W-BLOB-PAGE waves already gate stay green — the bead's apex is solved against the
   same `uMaxReach` pad the renderer uploads).
3. The centroid-lean ceiling (`proof:blob-render` calm-lean ≤ 0.10) is RE-VERIFIED: a
   fissioning satellite pulls mass off-center, so the fission apex + cadence are tuned
   so the resting/auto centroid stays under the ceiling (the same lean-safe discipline
   the `smoothK 0.05` default already obeys — measured against the gate, not asserted).

This is a ~40-line lifecycle refactor on the existing deterministic phase machine — no
new system, no parallel state, KISS. The shader, the uniforms, the upload, the substrate
lifecycle are ALL byte-untouched. The GL fence is NOT widened (this lens is CPU-only).

### 3.2 The neck-waist read — retune `smoothK` cadence, NOT the smin algorithm (CPU)

The neck must thin to a visible waist before the snap. The smin `k` is uploaded as
`smoothK × moodMult × POS_SCALE` (verified `uploadBlobUniforms` composes it). The
greenfield does NOT raise the resting `smoothK` (that inflates the lean centroid past
the ceiling — the AZ.W-BLOB-STUDIO D2 lesson, verified `types.ts:296-303`). Instead, the
**fissioning satellite's effective gap is driven by GEOMETRY** (the excursion in §3.1):
the neck thins because the satellite MOVES, not because `k` widens. The resting `k`
stays at the calibrated lean-safe 0.05. This sidesteps the entire lean-regression trap
the prior waves fought — the split is a MOTION read, not a band-width read.

### 3.3 The pinch-off recoil — reuse the existing body-pulse spring (CPU)

On a pinch-off event, kick the existing `pointer.click(impulse)` body-pulse oscillator
(`PULSE_OMEGA=18`, `PULSE_ZETA=0.35`, verified `constants.ts:132,135`) with a small
amplitude so the body squash-settles (follow-through). This is the SAME oscillator the
decel-snap already kicks — no new spring, no new clock, no new uniform. (Coordinates
with BD.W-BLOB-MOTION-TUNE arm 1: if that wave raises `PULSE_ZETA` toward the
decisive-flinch 0.5–0.6, the pinch-off recoil inherits the tuned ζ for free — the SAME
constant.)

### 3.4 What is EXPLICITLY NOT changed (the fit survives)

- The smin SDF math (`sminQuadraticG`/`sminCircularG`/`sminG`) — FIT, gate-locked, untouched.
- The analytic-gradient surface normal + the dome-Z — untouched here (BD.W-GOOBLOB-SQUIRCLE-REFRACT owns the spherical→⁴√ squircle dome-Z; this lens does not touch `surfaceNormalFromGrad`).
- The lit-glass / iridescence / SSS / soft-shadow blocks — untouched.
- The warm-cream `paletteStops` default + the rim min-contrast guard — untouched.
- The `uniformBridgeWGPU.ts`/`uploadBlobUniforms.ts` typed-struct — untouched (no new lane → no parity ΔE risk, the cardinal cross-engine fence held trivially).
- The substrate lifecycle (`useWebGPUCanvas`/`createCanvasLifecycle`, the
  intersection-pause, the PRM-freeze, the demand-loop quiescence gate) — untouched. The
  fission events feed the EXISTING `satellites.nextEventMs()` wake scheduler (verified
  `useMetaballRenderer.ts:295`) so a parked-at-rest blob wakes for the next pinch-off and
  re-parks — the offscreen-pause discipline is inherited, not re-built.

### 3.5 The substrate-canvas-resize fit (the prior fix) — PRESERVED, composed

The prior substrate fix (the canvas-resize hang that un-broke blob) lives in the shared
`createCanvasLifecycle`/`resizeBacking` path (verified `useMetaballRenderer.ts:306`
`resizeBacking` + the DPR≤2 clamp). This lens adds NOTHING to the resize path — the
fission is a per-frame simulation change inside `resolveFrame`, downstream of resize.
The fit is composed, never touched. The `half` quality axis (verified `types.ts:30`) and
the offscreen-park both carry over unchanged.

---

## 4. Cross-engine (Chrome + Safari) approach — the lens's binding axis

- **Topological-motion parity is the new fence.** The split mechanic is CPU-side, in the
  SHARED `resolveFrame` closure (verified `useMetaballRenderer.ts:203` — "BOTH backends
  call it … the physics is identical regardless of backend"). So the fission lifecycle
  runs IDENTICALLY on WGSL-on-Metal and GLSL-on-ANGLE **by construction** — there is no
  second simulation path. The cross-backend ΔE (BD.W-VIZ-PARITY-METAL machinery) reads
  the SAME satellite positions on both backends; the only drift risk is the smin
  fillet's `fwidth()`-AA at the neck (the drift-prone rim), captured by the existing
  parity arm. **No new parity surface.**
- **No `backdrop-filter: url(#…)`** — the blob is a `<canvas>` viz, not an SVG-goo CSS
  filter; the §L7 "static SVG goo filter, NO backdrop-filter:url" floor is N/A here (it
  governs the DOCK goo-fission, not the GPU metaball). The blob's WebKit story is the
  WGSL/GLSL twin + the BC.W-GOOBLOB-MEATBALL uniformity fix, both FIT.
- **The `softShadow2D` per-pixel march is the one cost to watch** (24 steps, verified
  both shaders). This lens adds NO per-pixel work; it does not touch the march. The
  real-Safari-26-Metal p50 is owned by BF.W-GOO-SPLIT-PERF for the dock fission — the
  blob's own budget is the EXISTING meatball budget, unchanged by a CPU lifecycle retune.
- **sRGB / OETF** — untouched (the mandatory `linearToSrgb()` OETF + the IGN dither both
  hold; the split carries no color).
- **`@supports`/PRM** — inherited. Under PRM the substrate freezes the rAF (tempo→0,
  verified `useMetaballRenderer.ts:221`), so the fission stops at the rest pose (one
  static frame, the merged silhouette). No new PRM arm needed — the fission is just more
  motion on the existing tempo-gated clock.

---

## 5. a11y / PRM carve

- **PRM → fission frozen at rest pose.** The fission clock is tempo-integrated
  (`simTimeMs += tempo·dt`), so PRM (tempo 0) parks it at the current merged frame — a
  static creature, no splitting. Inherited from the existing freeze; ZERO new code.
- **WCAG-2.2.2 pause** — the `v-model:paused` seam (verified `GooBlob.vue:217`) parks the
  WHOLE simulation including the fission. Inherited.
- **`aria-hidden`** — the canvas stays decorative (`aria-hidden="true"`, verified
  `GooBlob.vue:276`); the fission adds no semantic content. Unchanged.
- **`prefers-reduced-transparency` / `prefers-contrast`** — N/A to a canvas fill (the
  blob is opaque-premultiplied paint, not a transmissive glass layer); unchanged.

---

## 6. DELTA-ASSAY — reconcile vs the 116 union waves (no dup, the union path)

| Existing wave | Overlap | Reconciliation (UNION, never a dup) |
|---|---|---|
| **BD.W-GOOBLOB-SQUIRCLE-REFRACT** | touches the metaball shader (dome-Z + optional uBackdrop) | **DISJOINT.** That wave is the GL-shader curve change; this lens is CPU-only (`useBlobSatellites.ts`). No line overlap, no GL-fence engage here. This lens does NOT sanction the GL widen (it doesn't touch the shader). |
| **BD.W-GOOBLOB-SAT-SHADE** | per-satellite derived shade | **COMPLEMENTARY + DEPENDED-ON.** This lens's freed beads NEED the per-satellite shade to read as related-not-foreign droplets. SAT-SHADE provides the color; this lens provides the geometry that makes a free bead exist to be shaded. Sequence: SAT-SHADE's lane lands first (it rides the SQUIRCLE re-touch); this lens consumes it. |
| **BD.W-BLOB-MOTION-TUNE** | the body-pulse `PULSE_ZETA` + the stretch axis | **SHARED CONSTANT.** This lens's pinch-off recoil reuses the SAME `pulseVel` oscillator MOTION-TUNE arm 1 retunes. The recoil inherits the decided ζ — coordinate so the recoil amplitude is tuned AFTER ζ is decided. No new spring. |
| **BF.W-GOO-SPLIT-PERF / BE.W-GOO-SPLIT-PERF** | the *dock* goo-fission p50 budget | **DISJOINT SURFACE.** Those govern the SVG `url(#dock-fission-goo)` dock filter (a different mechanism). This lens adds no per-pixel cost to the blob, so the blob's meatball budget is unchanged — no new perf book. (The NAME collision is incidental; this is the procedural-field split, not the dock-CSS split.) |
| **BD.W-BLOB-LAVA / BD.W-BLOB-MULTICORE / BD.W-BLOB-EMOTION** (union/waves) | blob register variants | **CHECK-FOR-DUP.** MULTICORE proposes multiple body cores; this lens is the SATELLITE split lifecycle (the orbiting beads), orthogonal to a multi-core body. EMOTION is the mood→affect coupling (already partly shipped). LAVA is a register. The fission lifecycle is the missing PRIMITIVE all three would consume — author it once here, let the register waves compose it. No dup: this is the engine, those are the dressings. |
| **W-GOO-CAROUSEL-DECK / W-PAGER-GOO-MORPH / goo-morph greenfield** | the CSS goo-morph worm | **DIFFERENT VIZ.** That is the `border-radius`/SVG-filter pager worm (`/motion/deck`), explicitly distinct from this shader field (the prompt names the distinction). No overlap. |

**The amendment this produces → `BD.W-BLOB-FISSION-LIFECYCLE`** (proposed, CPU-only):
retire the never-leaves-smin-reach clamp; add the bounded single-fission excursion to
`useBlobSatellites`; feed the pinch-off recoil into the existing body-pulse spring; couple
the fission rate to the existing pointer-burst + mood `orbitSpeedScale`. Gate
(`proof:blob-fission`, born-RED): a π frame-series on `/substrates/blob` STAGE-1 that
asserts the silhouette TOPOLOGY CHANGES across the cycle — a frame where the satellite
silhouette is CONNECTED to the body (merged, one blob) AND a frame where it is
DISCONNECTED (pinched off, two blobs) — the connected-component count over N frames goes
2→1→2 (born-RED on HEAD where it is ALWAYS 1, the permanently-merged lump). The
silhouette-mask readback reuses the on-disk `goo-redress.spec.ts` precedent (a
`PNG.sync.read(locator.screenshot())` decode → saturated-region mask → connected-component
count), BOTH modes, both backends. The calm-lean ceiling stays green (the centroid guard).

---

## 7. The one-screen extract

1. **The real defect (live-judged, WGSL-primary):** the field MERGES but never SPLITS —
   satellites read as static dimples/bumps on a lump, not mercury beads necking and
   pinching off. The SDF math is FIT; the satellite LIFECYCLE is the gap. (Guise #1
   "stamped ovals" is cured; guise #2 "static lump" is live.)
2. **The core idea:** a **fission-breath lifecycle** — re-purpose the existing satellite
   phase machine so the creature continuously merges AND splits with a visible
   neck-waist-then-SNAP (the iOS-27 T2 metaball signature on the procedural field).
3. **The boldest move:** RETIRE the AZ/BA "satellite never leaves the smin reach" clamp
   (it cured the unrelated-disc bug but FROZE the topology), and replace it with a
   **bounded single-fission excursion** — at most one satellite pinches off at a time
   into a bounded reach, so the field finally SPLITS while still reading as one governed
   creature. The cure for guise #1 survives via a cheaper guard; guise #2 is fixed.
4. **KISS / cross-engine / perf:** CPU-only (`useBlobSatellites.ts` + constants), ZERO
   new uniforms, ZERO new shader lines, ZERO new per-pixel loops, ZERO new context. The
   split runs in the SHARED `resolveFrame` so it is byte-identical across WGSL-on-Metal
   and GLSL-on-ANGLE by construction (no new parity surface, no new perf budget). All
   fit — the smin field, the warm-cream identity, the lit dome, the substrate lifecycle,
   the resize fix, the PRM/pause/offscreen-park — is PRESERVED and composed.
5. **DELTA:** `BD.W-BLOB-FISSION-LIFECYCLE` (new, CPU-only) — depends on SAT-SHADE (free
   beads read as related shades), shares the body-pulse constant with BLOB-MOTION-TUNE,
   disjoint from SQUIRCLE (shader) and the dock GOO-SPLIT-PERF (CSS filter). Gate:
   `proof:blob-fission` born-RED — connected-component count 2→1→2 over the cycle (HEAD
   is always 1, the lump).
