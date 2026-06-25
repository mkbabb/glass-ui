# GooBlob — GOLDEN reference: **the warm-mercury colony that SPLITS and LENSES**

> The single best variant, synthesized from lens-a (mercury-lens), lens-b (perf-first
> fission lifecycle), lens-c (cartoon-technicolor split). One coherent design, deftly
> unioned with the extant engine. Born-RED on HEAD. Perfect in Chrome **and** Safari.
>
> **Live route** `/substrates/blob` (`demo/stories/substrates/blob.vue`) · both modes ·
> WGSL primary + WebGL2 twin · **Surface** `src/components/custom/goo-blob/` (the existing
> component — no new component, no fork, no parallel substrate).

---

## 0. Source-truth — what is FIT, WEAK, BROKEN (verified on HEAD, not the seed RESEARCH.md)

All three lenses drove the live route and read the source. Where they DISAGREE, I went to
the code. The reconciliation (every claim grepped on HEAD):

| Axis | Verified state | Verdict |
|---|---|---|
| **smin metaball math** | `sminQuadraticG`/`sminCircularG`/`sminG` with the IQ-normalized neck `m`-term + gradient-propagating `w`-mix (`metaball.frag.ts` / `.wgsl.ts`). The fillet is correct; `merge:"circular"` is the default. | **FIT — byte-untouched.** All three lenses agree. |
| **8-atom config** | `BlobConfig` is 8 cohesive atoms (`types.ts:214`), NOT a 50-knob sprawl. RESEARCH.md OPEN-2 is CLOSED. | **FIT — do NOT re-open.** |
| **warm-cream default** | `paletteStops: ["#b5947f","#d4b27d","#dad6b1"]` (`types.ts:353`), L≈0.78 cream; `proof:blob-warm-default ≥0.62` both modes. Never gray. | **FIT — the BA.W-NO-GRAY warm floor holds.** |
| **substrate lifecycle** | `createCanvasLifecycle` ships content-visibility park + PRM one-frame-freeze + ResizeObserver re-fit + context-loss hold; the canvas-resize hang fix is in. WGSL-primary, WebGL2 twin, one GL/route. | **FIT — keep whole.** |
| **the field SPLITS** | **BROKEN-by-choreography.** `orbitRadius 0.17` sits INSIDE `bodyRadius 0.22` (`types.ts:268,271`); `ORBIT_RANDOM_BASE 0.85`+span-capped (`constants.ts:157`) so "the orbit never re-inflates past the band reach." The phase machine is `orbiting→merging→absorbed→emerging` (`useBlobSatellites.ts:220`): `merging` necks IN to `0.08/dist` (center-ward), `absorbed` hides at opacity 0, `emerging` re-buds from center. **No phase pulls a satellite AWAY through a thinning neck that SNAPS.** The field MERGES and never SPLITS — a permanently-bonded lump. | **BROKEN — re-invent the split. (lens-b + lens-c, source-confirmed.)** |
| **the droplet LENSES the field** | **BROKEN-by-absence.** `grep uBackdrop` = 0 in both backends; `fragColor = vec4(rgb*alpha, alpha)` (`metaball.frag.ts:509`) over the droplet's OWN self-lit color. It samples NOTHING behind it — a 2015 self-lit opaque goo, not a 2025 transmissive lens. | **BROKEN — re-invent as a lens. (lens-a, source-confirmed.)** |
| **the dome is a bevel** | the Z dome is spherical (`surfaceNormalFromGrad`, `metaball.frag.ts:177`); no ⁴√ squircle. | **WEAK — refine to a squircle bevel (lens-a/c).** |
| **the surface reads wet** | static Blinn-Phong lobe locked to `uLightDir`; competent matte-clay, no travelling catch-light, no neck-bright meniscus. | **WEAK — refine to wet mercury (lens-c).** |

**The greenfield bar is therefore TWO honest defects, not one:** the field never SPLITS
(guise #2 of the user's law — "meatballing must be PERFECT" — a colony that only merges is
a bean), AND the droplet never LENSES the warm field (the iOS-27 liquid-glass signature, the
WWDC-2025 axis). lens-b/c found the first, lens-a the second. The GOLDEN does BOTH, because
they are the two halves of "real blob↔meatball metaball merge reading as liquid mercury" —
**the SPLIT gives the topology; the LENS gives the material.** Neither alone clears the bar.

---

## 1. The core idea — **GOO → GLASS → MERCURY**, a colony that necks, SPLITS, and DRINKS the warm field

Treat GooBlob not as one body wearing decorative orbit-nubs but as a small **colony of
warm-mercury beads** that breathe, **neck-thin and PINCH OFF into free droplets**, then
snap-merge back — and dress that colony as **liquid glass that LENSES the warm field behind
it** through a beveled squircle dome. Two reads on ONE perceptual axis the consumer slides —
the SAME `morphT` scalar that already lerps blob↔meatball dressing (`types.ts:243`):

- **GOO (morphT 0.0)** — today's STAGE-1 flat warm-cream fill. KEPT byte-identical (the honest floor).
- **GLASS (0.5)** — today's lit meatball: Blinn-Phong glint + Fresnel rim + SSS, self-lit. KEPT.
- **MERCURY (1.0)** — the NEW read: a **squircle-beveled transmissive lens** that refracts a
  glass-ui-produced warm backdrop through the dome (Snell off the dome-normal), catches a
  travelling crown specular, brightens the necking waist (wet meniscus), and — the payoff —
  **two merging bodies share ONE continuously-warped lensed pool across the thinning neck,
  then PINCH OFF into two free lensed beads.** Mercury merging and splitting, never butter.

This is a UNION, not a fork. `material: goo→glass→mercury` is a single derived scalar over
the EXISTING `surface` atom (no 9th atom — it re-bundles `rimStrength/specStrength/iridescence/
sssScale/coreGlow` behind the slider per "the variant IS the bundle"). The split is a CPU
lifecycle refactor on the EXISTING satellite phase machine. The lens rides the EXISTING
`morphT` machinery and displaces along the SAME analytic `surfaceNormalFromGrad` normal the
lit pipeline already computes. One field, three reads, one slider, one component.

---

## 2. THE TWO BOLD MOVES (reconciled — they ride ONE coordinated re-touch)

The cross-lens tension was "which is THE single move?" The answer is that the two are
**orthogonal and complementary**, and the union is stronger than either:

- **lens-b/c's split is CPU-only** (`useBlobSatellites.ts` + `constants.ts` + `types.ts`) — it
  touches NO shader, NO uniform, NO GL fence.
- **lens-a's lens is GL-only** (`metaball.frag.ts` + `.wgsl.ts` twin + the uniform packer) — it
  touches NO satellite lifecycle.

They share ZERO lines. So the GOLDEN ships BOTH in ONE coordinated wave with ZERO conflict:
the split provides the *topology to be lensed* (a pinch-off bead is a second lensed pool to
warp the field through), and the lens provides the *material that makes the split read as
mercury* (a field bending across a thinning neck is unmistakably liquid; a flat-fill neck is
ambiguous). The split without the lens is a clay colony; the lens without the split is a
static lensed lump. Together: a living mercury colony.

### Move A (CPU, headline) — RETIRE the never-leaves-smin-reach clamp; add a bounded single-fission excursion

Replace the AZ/BA defensive clamp (`ORBIT_RANDOM_BASE 0.85`, span-capped, "orbit never
re-inflates past the band reach") — which cured the "two unrelated discs" bug but FROZE the
topology — with a **bounded single-fission excursion** on the existing phase machine:

1. **Re-base the orbit so a satellite CAN separate.** `orbitRadius 0.17 → ~0.30` (clean break,
   no legacy default), `bodyRadius 0.22` held: at apoapsis a satellite sits a clean gap beyond
   the body skin (a SEPARATE bead); at periapsis it necks IN through the smin band. Pure
   `BLOB_CONFIG_DEFAULTS.geometry` edit; the four-side containment is re-solved against the
   louder orbit (the canvas is already 160% of the wrapper, `POS_SCALE 0.625` → an orbit at
   0.30 paints at 0.1875 uv, clearing the edge; the body at 0.22 already does).
2. **Re-purpose `emerging` → the PINCH-OFF (no new phase enum churn beyond one beat).** The
   greenfield repurposes the existing four phases so the lifecycle becomes a genuine
   merge↔split breath, and adds at most ONE beat (`fissioning`) for the bud-out-and-snap:

   | Phase | HEAD | GOLDEN |
   |---|---|---|
   | `orbiting` | fixed merged distance | breathes OUT on a φ-detuned clock to where the neck thins to a visible waist, then breathes IN — the merge/un-merge is steady-state, not a rare event |
   | `merging` | necks in | unchanged (the bond-in half) |
   | `absorbed` | hidden inside body | unchanged (a rare full-absorb, kept for variety) |
   | `emerging`/`fissioning` | re-buds from center | **the SPLIT** — the satellite buds out through a thinning neck whose gap exceeds the smin reach so it SNAPS into a free orbiting bead (the mercury pinch), then re-merges next cycle |

3. **At most ONE satellite is the "fissioning" satellite per cycle** (a phase-machine token,
   bounded apex `FISSION_REACH_MAX` in config-UV). Every other satellite stays in the bonded
   merge/un-merge breath. So the silhouette is always ONE governed creature plus AT MOST one
   pinching bead — **the "two unrelated discs" failure is re-prevented by this single-fissioner
   + bounded-apex rule** (a cheaper guard), NOT by the blanket "never leaves reach" clamp,
   which is RETIRED (the clean break; no dual path, no legacy).
4. **The split is a MOTION read, NOT a band-width read** — the resting `smoothK` stays at the
   calibrated lean-safe 0.05; the neck thins because the satellite MOVES, not because `k`
   widens. This sidesteps the AZ.W-BLOB-STUDIO D2 lean-regression trap entirely (a louder
   resting band inflated the calm-lean centroid past 0.10; geometry-driven necking does not).
   A phase-scoped `smoothK` multiplier rides UP only mid-event (reuse the existing `useBlobMood`
   `smoothK` multiplier seam, `constants.ts:74` — a phase term, NOT a new uniform), loud only
   during the merge/fission window, lean-safe at rest.
5. **The pinch-off carries WEIGHT (cartoon follow-through).** On a pinch-off event, kick the
   EXISTING body-pulse spring (`pointer.click(impulse)`, `PULSE_OMEGA 18`, `PULSE_ZETA 0.35`,
   `constants.ts:132,135`) with a small impulse so the body squash-settles when a bead leaves —
   anticipation (a hair of squash toward the bud point before), exaggeration (the snap),
   follow-through (the recoil ring). The SAME oscillator the decel-snap already kicks; no new
   spring, no new clock. (Coordinates with `BD.W-BLOB-MOTION-TUNE` arm-1: if that wave raises
   ζ toward the decisive-flinch 0.5–0.6, the recoil inherits the tuned ζ for free.)

**~40-line lifecycle refactor on the existing deterministic phase machine.** ZERO new uniform,
ZERO new shader line, ZERO new per-pixel loop, ZERO new context. Runs in the SHARED
`resolveFrame` closure (`useMetaballRenderer.ts` — "BOTH backends call it; the physics is
identical regardless of backend") so it is byte-identical on WGSL-on-Metal and GLSL-on-ANGLE
**by construction** — no new parity surface.

### Move B (GL twin, the material) — `uBackdrop`: the droplet drinks the route's warm field as a squircle lens

The mercury read samples a glass-ui-produced backdrop texture and refracts it through the
squircle dome — turning the self-lit opaque goo into a true WWDC-2025 liquid-glass lens, with
NO DOM-sampling API and NO second GL context:

1. **The backdrop is a glass-ui texture, never a DOM read** (there is no web API to read pixels
   behind a backdrop element). The droplet samples a texture the library itself produces — the
   SAME route's `<Aurora>` FBO when present (the canonical "blob over aurora" hero), OR a cheap
   baked warm-cream radial-gradient strip (the warm `paletteStops` ramp → a 1×N gradient
   texture) generated once on mount when no aurora is present. One GL/route preserved.
2. **Squircle dome-Z + Snell displacement.** Switch the spherical dome-Z to the squircle
   `pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)` (the canonical guarded string — flat
   crown, curvature concentrated at the rim where the lensing lives — the Apple beveled read,
   not a round marble). The dome normal `N` drives `refract(viewDir, N, 1.0/1.5)` (IOR 1.5);
   the backdrop UV offsets by its in-plane projection scaled by local dome thickness: flat crown
   → field reads straight through; steep rim → the field pools/curls (the lens caustic).
3. **Composite, not replace.** `fragColor = mix(self-lit-rgb, refracted-backdrop,
   material·fresnelTransmission)` — the droplet keeps its warm catch-light (crown star + rim)
   AND lenses the field; at `material=1` the body goes transmissive while rim/crown stay opaque.
   Premultiplied-alpha math unchanged; a ≤1px chromatic-dispersion whisper (R/G/B at three IORs)
   fringes the rim, PRM-zeroed.
4. **The split + lens payoff.** Two merging bodies share ONE continuously-warped lensed pool
   across the waist (the backdrop sample is a continuous field; the displacement follows the
   shared smin normal); as the neck thins and SNAPS (Move A), the field warps continuously
   across the parting then resolves into two separate lensed pools — **the literal "liquid
   mercury beads merging and splitting" the user's law demands.**

**One coordinated `.frag` + `.wgsl` + packer re-touch** (the band-3 single-re-touch discipline),
one parity re-record. The lens is pure fragment math over a portable WebGL2 `sampler2D` / WGSL
`texture_2d` — **no `backdrop-filter:url`, no Metal artifact** — so Safari's WebGL2 runs it
identically. This adds NO new per-pixel loop (the 24-step `softShadow2D` march is untouched).

---

## 3. Motion + interaction — liquid-weight universal, the cartoon register

The motion doctrine (de-synced multi-sine breath, critically-damped pointer follow, symplectic
click pulse, volume-preserving squash) is SOTA and PRESERVED. The GOLDEN elevates it toward the
universal liquid-weight law (inertia/weight/bounce/squish on ALL motion, morph-MORE-on-move):

- **The fission clock is SLOW and φ-detuned** — the breath-out/in excursion rides a detuned
  multi-sine (rhyming with the existing `breath()` body pulse, three irrational-ratio sines) so
  merges/splits never re-phase: the creature is perpetually mid-merge on one satellite while
  mid-split on another. NO metronome.
- **Morph-MORE-on-move (the lens AND the fission react).** A fast pointer flick already drives
  the velocity squash + the trail pseudopod. The GOLDEN AMPLIFIES this on BOTH new axes: the
  refraction displacement scales with `tanh(speed)` (a moving droplet bends the field MORE — the
  mercury sloshes), AND the existing `usePointerVelocityField` burst scales the fission breath-out
  amplitude (an agitated creature splits more violently — more, thinner necks; faster pinch-offs).
  Reuses the field the renderer ALREADY consumes for the decel-snap.
- **The freed bead ARCS** (not a straight line — the existing per-satellite `pertX/pertY` wobble
  envelope produces the arc) and carries its **per-satellite derived OKLCh shade**
  (`BD.W-GOOBLOB-SAT-SHADE` — an analogous warm step off the body anchor), so a split shows two
  RELATED warm beads pulling apart (the technicolor chroma-separation at the waist), never a
  foreign disc. SAT-SHADE was invisible while satellites were permanently merged; the split is
  what makes the derived shade READ.
- **Cel-ink cartoon cast (CSS, off the shader).** A third bold offset `drop-shadow()` rung (the
  Memphis cel-stamp the `<Card surface="cartoon">` identity owns) follows the irregular metaball
  silhouette (a `drop-shadow()` chain, NEVER `box-shadow` which would stamp a rectangle and miss
  the necking satellites) and travels opposite the motion on a `--motion-weight`-scaled transform.
  PRM → static cast.
- **Mood-coupled** through the EXISTING `MoodParams` (`orbitSpeedScale`): `excited` → faster,
  more splits; `sleepy` → the field barely splits (a calm near-static merge). No new mood field.

---

## 4. Cross-engine (Chrome + Safari) — the twin-parity discipline, the cardinal fence

The whole point of "PERFECT in Chrome AND Safari." Two parity fences, one per move:

- **Move A (CPU) — topological-motion parity, by construction.** The fission runs in the SHARED
  `resolveFrame` closure → byte-identical satellite positions on both backends. No second
  simulation path. The only drift risk is the smin fillet's `fwidth()`-AA at the neck (the
  drift-prone rim), captured by the existing `BD.W-VIZ-PARITY-METAL` arm. No new parity surface.
- **Move B (GL) — twin-byte-faithful lens.** The `uBackdrop` lens lands in `metaball.frag.ts`
  (WebGL2, Safari-safe) AND `metaball.wgsl.ts` (WebGPU, Chrome primary) as byte-faithful twins.
  The `sampler2D`/`texture_2d` is portable; the refraction is pure fragment math — no
  `backdrop-filter:url`, no Metal artifact. The squircle dome-Z `⁴√(1-(1-x)⁴)` byte-matches
  across backends (the guarded canonical string; a one-sided switch desyncs the lit read — the
  parity ΔE catches it). The `fwidth()`-bearing dome normal feeding the Snell displacement is
  the drift-prone region and MUST stay in uniform control flow (the BC.W-GOOBLOB-MEATBALL
  uniformity fix is FIT and must not be re-broken — the Snell displacement reads the
  already-computed `N`, no new derivative inside a per-fragment branch).
- **sRGB color-interp + premultiplied-alpha + the mandatory `linearToSrgb()` OETF + IGN dither**
  — unchanged; the backdrop sample is OKLab-aware (the shared `/color` leaf matrices), no naive
  sRGB lerp. The static `WatercolorDot` companion (`blob.vue`, the zero-GL `@supports`-not-WebGL
  floor with `color-interpolation-filters: sRGB`) — KEEP.
- **The parity proof is a PAIRED-ENGINE π** (WGSL-on-Metal × GLSL-on-ANGLE), never a
  single-engine green — the cardinal cross-engine witness for BOTH the lensed dome ΔE and the
  fission topology (the same satellite positions read on both backends).

---

## 5. a11y / PRM carve (the liquid-weight law has a floor)

- **PRM-freeze:** under `prefers-reduced-motion: reduce` the lifecycle draws ONE static frame
  then parks (`createCanvasLifecycle`); `tempo=0` freezes every integrated dt. The fission clock
  is tempo-integrated (`simTimeMs += tempo·dt`) so PRM parks it at the current merged frame (a
  static creature, no splitting); the lens renders its resting frame (a still mercury droplet
  lensing the STATIC warm field — no breath, no advection, no dispersion shimmer). Inherited;
  ZERO new PRM code for the fission, the dispersion floor is `@media (prefers-reduced-motion)`-zeroed.
- **WCAG 2.2.2 pause:** the `v-model:paused` seam (`GooBlob.vue`) + `DockBackgroundToggle` parks
  the WHOLE simulation including the fission. Inherited.
- **Offscreen park:** `content-visibility:auto` + the substrate intersection park freezes the
  cycle when scrolled away; the fission events feed the EXISTING `satellites.nextEventMs()` wake
  scheduler so a parked-at-rest blob wakes for the next pinch-off and re-parks. The lens sampler
  costs nothing when parked.
- **`prefers-contrast: more`** → the cel-ink cast opacity floors UP (the inked edge is a
  legibility asset). **`prefers-reduced-transparency`** → does not touch the opaque cel-ink (it
  survives as a legibility anchor); the lens transmission is decorative.
- **The droplet is decorative** (`aria-hidden="true"`); no information is carried only by the
  split or the lens read.

---

## 6. DELTA-ASSAY — reconcile vs the BD union waves (no dup, no re-fork)

The GOLDEN is a SYNTHESIS of on-disk band-3 blob waves + two de-parks, NOT new parallel waves:

| Existing wave | Owns | GOLDEN relationship |
|---|---|---|
| `BD.W-GOOBLOB-SQUIRCLE-REFRACT` arm 1 (⁴√ squircle dome-Z) | the dome bevel curve, lockstep `.frag`+`.wgsl` | **ADOPT unchanged** — the squircle is the prerequisite that makes the lensing read as a bevel (Move B §2). |
| `BD.W-GOOBLOB-SQUIRCLE-REFRACT` arm 2 (`uBackdrop` Snell refraction, CONDITIONAL/HELD) | the lens | **DE-PARK → BUILD (Move B).** The live blob clears the floor; the composite + dispersion whisper + material-slider bundling are the amendment GOLDEN adds. |
| `BD.W-GOOBLOB-SAT-SHADE` (per-satellite OKLCh shade) | the satColor lane | **ADOPT + DEPENDED-ON** — the split is what makes the derived shade READ (two related beads pulling apart). The fission gives sat-shade its reason to exist. |
| `BD.W-BLOB-MOTION-TUNE` (pulse-ζ flinch + flick-stretch) | the body-pulse spring | **ADOPT + SHARED CONSTANT** — the pinch-off recoil reuses the SAME `pulseVel` oscillator; the lens makes the flick-stretch READ (the field warps with the elongation). Coordinate so the recoil amplitude is tuned AFTER ζ is decided. |
| `BD.W-BLOB-LAVA / -MULTICORE / -EMOTION` (register variants) | dressings | **CHECK-FOR-DUP → DISJOINT.** This authors the fission PRIMITIVE all three would consume (the engine); those are the registers (the dressings). No dup. |
| `BF/BE.W-GOO-SPLIT-PERF` (the DOCK SVG `url(#dock-fission-goo)` filter) | the dock CSS fission p50 | **DISJOINT SURFACE** — different mechanism (CSS filter vs GPU SDF field). The name collision is incidental. GOLDEN adds no per-pixel cost to the blob; its meatball budget is unchanged. |
| RESEARCH.md OPEN-1 (dark default) / OPEN-2 (50-knob) | — | **CLOSED — do NOT re-open** (warm-cream holds, 8 atoms; the seed doc is stale). |

**The amendment this produces → `BD.W-GOOBLOB-MERCURY-COLONY`** (the union wave): (i) Move A —
retire the never-leaves-reach clamp + the bounded single-fission excursion + the pinch-off recoil
+ the fission-rate pointer/mood coupling (CPU, off the GL fence); (ii) Move B — de-park the
`uBackdrop` squircle lens + the `material: goo→glass→mercury` slider as the consumer-facing UNION
over the existing `surface` atom + `morphT` scalar (ONE coordinated `.frag`+`.wgsl`+packer
re-touch); (iii) consume SAT-SHADE + share the MOTION-TUNE constant. The smin field stays
byte-untouched. No new component, no fork, no 9th atom, KISS/DRY.

**No dup with the goo-morph CSS worm** (the `/motion/deck` `filter:url()` pager metaball) — that
is the DOM filter; THIS is the GPU SDF field. Distinct engines, named so.

---

## 7. Acceptance bar (how this gets live-judged)

`/substrates/blob`, both modes, both engines: the droplet must read as a **living colony of warm
mercury** —
1. a satellite breathes out, the **neck thins to a visible waist** (~⅓ the satellite diameter)
   then **SNAPS into a free orbiting bead** (the mercury pinch), which arcs out carrying its own
   related warm shade, then re-merges next cycle — **the silhouette topology CHANGES** (connected →
   disconnected → re-connected);
2. at `material=mercury` the **warm field bends through the squircle bevel and pools at the rim**,
   the crown catches a travelling specular, the necking waist glows wet, and a fast flick **sloshes
   the lensed field**;
3. the body **squash-settles** when a bead leaves (cartoon follow-through), a bold cel-ink cast
   trails the silhouette;
4. **never** stamped ovals, **never** a non-splitting lump, **never** gray, **never** butter; warm-cream
   identity holds both modes; PRM rests as a single calm lensed droplet.

**Born-RED on HEAD** — the current creature is a permanently-merged self-lit opaque lump that
samples nothing behind it. GREEN when the field SPLITS (2→1→2 topology) AND bends through the
droplet, both backends, both modes.

---

## 8. Born-RED gate sketch — `proof:goo-mercury-colony` (the π/readback that proves it)

Two binding readbacks, both born-RED on HEAD, both PAIRED-ENGINE, both modes. Both reuse the
on-disk `blob-studio.spec.ts` connected-component machinery (`PNG.sync.read(locator.screenshot())`
→ modal-bg → foreground silhouette mask at `FG_DIFF_T` → step-4 downsample → flood-fill
connected-components with the `COMPONENT_MIN_CELLS` satellite-sized floor) — the precedent is
ALREADY in the repo (it currently only proves separation under a MANUALLY dialed-up orbit; the
GOLDEN gate proves the DEFAULT creature splits — that is the born-RED seam).

**Gate 1 — FISSION TOPOLOGY (Move A).** Over a sampled cycle (`SAT_FRAMES ≈ 40` frames spanning
the φ-detuned fission period) on the DEFAULT config (`variant:"blob"`, the honest STAGE-1 floor,
no knob dial), assert the connected-component count over the silhouette mask goes **2→1→2**: there
EXISTS a frame where a satellite is DISCONNECTED from the body (≥2 satellite-sized components) AND
a frame where it is CONNECTED (1 component, mid-merge).
- **Born-RED on HEAD:** the count is ALWAYS 1 (the permanently-merged lump; the orbit never leaves
  the band reach). The existing studio spec only sees ≥2 when `orbitRadius` is dialed UP — GOLDEN
  proves the SHIPPED default does it.
- **Lean-safe co-assert:** the rest/auto centroid stays under the `proof:blob-render` calm-lean
  ceiling 0.10 (a fissioning satellite pulls mass off-center — the apex+cadence are tuned against
  the gate, not asserted).

**Gate 2 — MERCURY LENS (Move B).** At `material=mercury` over a known warm backdrop (the baked
warm-cream strip OR a fixed Aurora frame), assert the dome is **transmissive and field-bending**,
not self-lit-opaque: sample a ring of pixels just inside the rim and prove the backdrop hue
**bleeds through displaced** (the in-rim color tracks the backdrop's local color shifted by the
Snell offset, measurably ≠ the self-lit core color), and the crown reads a specular star.
- **Born-RED on HEAD:** `uBackdrop` is absent; the rim is the self-lit Fresnel color, the backdrop
  hue does NOT appear inside the dome (the bleed-through ΔE is ~0).
- **Paired-engine ΔE:** the lensed dome on WGSL-on-Metal × GLSL-on-ANGLE must match under the
  `BD.W-VIZ-PARITY-METAL` threshold (the `fwidth()`-bearing dome-normal-fed Snell is the
  drift-prone witness).

**Plus the held floors:** `proof:blob-warm-default ≥0.62` (warm-cream, both modes) HELD; the
four-side containment witnesses (the bounded fission apex stays inside the canvas overflow pad)
HELD; PRM → one static frame, fission frozen, dispersion zeroed.

---

## 9. The de-risking SPIKE (built — see `./golden/`)

The boldest, riskiest mechanism is **Move A's fission topology** — does retiring the
never-leaves-reach clamp and re-basing the orbit to 0.30 actually produce a 2→1→2 connected-
component cycle WITHOUT blowing the calm-lean ceiling? That is the born-RED gate's whole premise,
and it is a pure-math question answerable headlessly (no GPU, no browser) on the SHARED CPU
`resolveFrame` math. So the spike is a Node harness that reproduces the satellite kinematics +
the smin field + a connected-component readback over a rasterized silhouette, runs the HEAD
geometry (proves it is ALWAYS 1 component — born-RED) vs the GOLDEN geometry (proves 2→1→2 + the
centroid stays lean-safe). Move B's lens is lower-risk (it is the de-parked SQUIRCLE-REFRACT arm-2
whose mechanism is already specced; the spike de-risks the headline). Files + result in §10.

---

## 10. Files

- `docs/tranches/BD/greenfield/goo-blob/GOLDEN.md` — this canonical spec.
- `docs/tranches/BD/greenfield/goo-blob/golden/fission-topology-spike.mjs` — the throwaway Node
  spike: reproduces the satellite kinematics + smin field + connected-component readback; runs
  HEAD geometry (always-1, born-RED) vs GOLDEN geometry (2→1→2 + lean-safe). Run:
  `node docs/tranches/BD/greenfield/goo-blob/golden/fission-topology-spike.mjs`.
- (build target, the wave) `src/components/custom/goo-blob/composables/useBlobSatellites.ts`,
  `constants.ts`, `types.ts` (Move A, CPU); `shaders/metaball.frag.ts` + `shaders/metaball.wgsl.ts`
  + `composables/uploadBlobUniforms.ts` + `uniformBridgeWGPU.ts` (Move B, GL twin); the gate
  `tests-visual/goo-mercury-colony.spec.ts` (reusing `blob-studio.spec.ts` machinery).
