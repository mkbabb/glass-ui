# GooBlob — DELTA-ASSAY: golden-vs-current + the UNION path

> The deft-integration delta for the GooBlob procedural metaball viz. Reconciles
> `GOLDEN.md` (the warm-mercury colony that SPLITS and LENSES) + the three challenges
> against the LIVE current implementation (Chrome `/substrates/blob`, source-grepped on
> HEAD) and the on-disk 116-wave union set. Verdict: **REFINE the surface + RE-INVENT the
> topology lifecycle + BUILD the lens (budget-gated)** — a single coordinated union over the
> EXISTING engine, no fork, no 9th atom, no legacy. Convergence **~80%**.

---

## 0. Live witness (orchestrator self-verified — the born-RED is VISUALLY true)

`/substrates/blob`, light mode, Chrome :5173 (`golden/delta-head-blob-light.png` captured):
- **2 canvases, both `goo-blob-canvas` `webgl2`, `aria-hidden=true`** (1536² hero + 1126² studio). NO
  WGSL-primary active on this Chrome session (both report `webgl2`) — the live read is the WebGL2 twin.
- **The creature is a single permanently-merged warm-amber/gold LUMP** with frozen pseudopod nubs (the
  "bird" silhouette) — ONE connected component every frame, no free bead, no neck thinning to a waist.
  The golden's born-RED premise ("a permanently-merged self-lit opaque lump") is **VISUALLY TRUE**, not
  a paper claim.
- **Self-lit opaque** — competent Blinn-Phong matte-clay; the warm-taupe stage behind the lump does NOT
  bend through it (no lens). `fragColor = vec4(rgb * alpha, alpha)` self-lit (`metaball.frag.ts:345,509` —
  grep-confirmed; `uBackdrop` = 0 both backends).
- **Warm-cream identity HOLDS** — amber/gold body, never gray (BA.W-NO-GRAY warm floor intact).
- **The dome reads ROUND** (spherical `sqrt(1-(1-x)²)`, `metaball.frag.ts:180`/`metaball.wgsl.ts:222`),
  not a squircle bevel.
- **NO aurora behind the blob on this route** (`hasAuroraEl:false`; both canvases are `goo-blob-canvas`).
  → challenge-3 R3 LANDS LIVE: a lens here samples a warm-cream strip lensing a warm-cream droplet
  (cream-through-cream) → near-invisible without a colourful field. **This is a real dependency the
  amendment must carry.**

The spike (`golden/fission-topology-spike.mjs`) runs: HEAD geometry → always-1 (born-RED PASS); GOLDEN
geometry → 2→1→2 + maxLean 0.0127 ≪ 0.10 (PASS). Honest topology result — BUT under-modeled (see §2 R-folds).

---

## 1. The DELTA table — KEEP / REFINE / RE-INVENT (survival of the fittest)

| Axis | Current (HEAD, verified) | Golden | Verdict |
|---|---|---|---|
| **smin metaball math** | `sminCircularG`/`sminG` IQ-normalized neck + gradient-propagating `w`-mix; `merge:"circular"` default. | byte-untouched | **KEEP — do not touch.** |
| **8-atom `BlobConfig`** | 8 cohesive atoms (`types.ts`); RESEARCH.md OPEN-2 closed. | no 9th atom; `material` derives over `surface`+`morphT` | **KEEP the 8 atoms; the lens register is a DERIVED scalar, not an atom.** |
| **warm-cream default** | `paletteStops ["#b5947f","#d4b27d","#dad6b1"]` (`types.ts:353`); `proof:blob-warm-default ≥0.62`. | held | **KEEP — warm floor inviolate.** |
| **substrate lifecycle** | `createCanvasLifecycle` content-visibility park + PRM one-frame-freeze + ResizeObserver re-fit + context-loss hold. | kept whole | **KEEP.** |
| **deterministic `resolveFrame`** | both backends call the SAME closure; physics backend-agnostic. | the split runs here (parity by construction) | **KEEP — the union's parity guarantee rides this.** |
| **the surface reads WET** | static Blinn-Phong lobe locked to `uLightDir`; matte-clay, no travelling catch-light, no neck meniscus. | wet mercury (travelling crown specular + neck-bright meniscus) | **REFINE — the wet read (challenge-3 R2: must be first-class, not hand-waved).** |
| **the dome is a BEVEL** | spherical `sqrt(1-(1-x)²)` Z-dome (`:180`/`:222`). | squircle ⁴√`(1-(1-x)⁴)` | **REFINE — the squircle bevel (`BD.W-GOOBLOB-SQUIRCLE-REFRACT` arm 1, on-disk + unconditional).** |
| **per-satellite shade** | every satellite paints the flat `uBaseColor` (no `uSatColor`); the derived shade was authored but is INVISIBLE while satellites stay merged. | the split makes SAT-SHADE READ (two related beads parting). | **REFINE + DEPEND — `BD.W-GOOBLOB-SAT-SHADE` ADOPTED; the fission gives it its reason to exist.** |
| **the field SPLITS** | **NEVER** — `orbitRadius 0.17` INSIDE `bodyRadius 0.22`; `ORBIT_RANDOM_BASE 0.85` span-capped; `emerging` re-buds CENTER-ward (`useBlobSatellites.ts:266`); AND `orbitWiden` (`uploadBlobUniforms.ts:246`/`uniformBridgeWGPU.ts:129`) actively GLUES the neck at orbit 0.30. Permanently-bonded. | a bounded single-fission excursion: neck thins → SNAPS into a free bead → re-merges. | **RE-INVENT — the split (Move A, CPU). The headline.** |
| **the droplet LENSES** | **NEVER** — `uBackdrop` absent both backends; self-lit opaque goo. | a squircle-beveled transmissive lens drinking the warm field. | **BUILD (budget-gated) — the lens (Move B, GL twin). De-park `SQUIRCLE-REFRACT` arm 2.** |

**Two honest defects, one union:** the field never SPLITS (Move A, CPU) AND never LENSES (Move B, GL).
They share ZERO lines and ride ONE coordinated wave. The split gives the topology; the lens gives the
material. The current does the math + the floor + the lifecycle scaffolding RIGHT (KEEP); the surface +
dome are WEAK (REFINE via two on-disk waves); the topology is BROKEN (RE-INVENT); the lens is ABSENT
(BUILD, gated).

---

## 2. The challenge hardenings FOLDED into the union (all verified against HEAD)

The golden survives all three challenges intact as a DESIGN; what failed is EVIDENCE/PROCESS. Every
hardening is folded into the amendment below — none inherited blind.

- **(C1·R1 + C2·R5) The spike under-models the lean + the kinematic.** The spike omits `wobble/pertX/
  pertY/pointer-flick/mood` (grep = 0) and drives a hand-authored `sin(phase)` excursion at apex **0.40**,
  not the spec **0.30**, not the real phase machine (`orbiting→merging→absorbed→emerging`, center-ward
  `0.08/dist` necks — the OPPOSITE of a bud-out). The real `proof:blob-render` ceiling sits at **0.091/0.10**
  (`blob-render.spec.ts:158` — ~0.009 headroom). **FOLD:** the gate's lean co-assert runs on a PRM-frozen/
  pointer-idle frame (the documented worst-case is flick-time; the fission apex/cadence are TUNED against
  the gate, not asserted); the rebuilt spike (build-time) ports the real lean stack at orbit 0.30 + the real
  phase machine before any "lean-safe" claim. **VERIFIED:** the spike's 0.0127 is a static-ellipse artifact.
- **(C2·R1, LOAD-BEARING) Move A mechanically COLLIDES with the live `orbitWiden` bridge.** Grep-confirmed:
  `worstOrbitDist = orbitRadius·1.2·(1+ecc)`, `bridgeGap = max(0, worstOrbitDist − satR − bodyR)`,
  `orbitWiden = min(1.25, 1 + bridgeGap/nominalBand)` in BOTH packers (`uploadBlobUniforms.ts:246-259` +
  `uniformBridgeWGPU.ts:129-144`). Its in-source worked example IS the golden's geometry ("orbit 0.30 …
  the smin neck persists across the WHOLE orbit envelope") — at orbit 0.30 it INFLATES the band 25% to
  GLUE the neck, the exact opposite of a snap. The golden never named it. **FOLD (the central integration
  call):** the split is a **phase-scoped** band, not a global re-base. `orbitWiden` is NOT retired (it
  cures the R8-07 "instant fully-detached disc with no gooey neck"); it is **phase-gated** — full
  (capped 1.25) during the bonded `merging`/`orbiting` breath so the neck stays gooey, dropped to nominal
  ONLY during the `fissioning` beat for the at-most-one fissioning satellite so its neck CAN thin past the
  smin reach and SNAP. This subsumes R8-07 (every non-fissioning satellite keeps the bridge) AND produces
  the pinch. The split rides MOTION (the satellite moves), not a global band-width re-base — sidestepping
  the AZ.W-BLOB-STUDIO D2 lean-regression.
- **(C2·R3 + C3·R3) The DEFAULT re-base breaks the calm shipped contract + the lens has nothing to lens.**
  `orbitRadius 0.17` is gated (`proof:blob-render`/`-studio`/`-page`); re-basing the shipped default to 0.30
  silently mutates every live `<GooBlob variant="blob">` consumer (slides, dock, AV backgrounds) from a calm
  merged accent to a splitting colony, and the README §273 instructs "keep it calm by default." "No backwards
  compat" licenses retiring legacy TOKENS, NOT silently changing what every consumer renders. **FOLD:** the
  fission is an **OPT-IN register** — a `fissionAmp` derived scalar (over the EXISTING `surface`/`MoodParams`,
  NOT a 9th geometry atom) that DEFAULTS to the calm floor (≈0). Gate 1 born-RED because the register doesn't
  exist yet, NOT because the shipped default mutated. The DEFAULT calm creature stays gate-faithful; the SPLIT
  is the `colony`/`mercury` register the studio + the consumer opt into. The lens default backdrop becomes a
  **colourful warm field** (the `paletteStops` spread into a genuinely varied multi-stop strip with cool/warm
  chroma, OR the aurora-present hero as the gate config) — so the lens has something worth bending (the §3
  "colourful field behind glass" precept).
- **(C1·R2 + C2·R2) Move B is budget-gated + NOT "compositor-only".** `SQUIRCLE-REFRACT` arm 2 is CONDITIONAL
  on the frame budget (its Q3 gate: "ships ONLY with a recorded budget number under the live ceiling"). The
  Snell refraction adds a dependent `sampler2D` fetch + `refract()` + ≤1px 3-IOR dispersion (3 rim taps) per
  dome pixel on the oversized 160% canvas — real fill cost, NOT "no new per-pixel loop" (true only for the
  24-step shadow march). **FOLD:** Move B is restated **BUILD-iff-measured-budget** — a GPU paint on the real
  route with the sampler armed records the `/substrates/blob` frame-time delta; clears → ships; bites →
  squircle-only (arm 1) ships, arm 2 terminal-HELD with the number. Re-labelled "GPU-shader, no-DOM-backdrop"
  (NOT compositor-only). The backdrop texture's colorspace is PINNED (`texImage2D` known internal format +
  `linearToSrgb` parity on the SAMPLE), and a DEDICATED paired-engine ΔE gate for the bleed-through ring with
  a threshold RE-DERIVED for transmissive drift (NOT the self-lit dome threshold — the displaced sample crosses
  hue gradients, a larger drift surface). Prove the dispersion fringe stays inside `uMaxReach` or widen the pad.
- **(C3·R1) The single-fissioner risks a TWITCH, not a colony; the snap must be a cartoon PUNCH.** A slow,
  once-per-6-16s, single-bead pinch on a pure `sin` reads as a rare twitch on a static lump — BUTTER (§7.4
  forbids it). **FOLD:** the pinch carries an authored cartoon velocity curve (anticipation squash → fast snap
  → overshoot → damped recoil), a NAMED easing reusing `easing.ts` (DRY) + the EXISTING pulse spring
  (`PULSE_OMEGA 18`/`PULSE_ZETA 0.35`, `useBlobPointer.ts`); the bonded-breath satellites ALSO neck to a
  visible waist (not pinch) so the silhouette is perpetually alive at MULTIPLE necks (the colony read) with only
  the apex one fully snapping — the spike's 0.0127 shows ample lean headroom. Gate 1 adds a VELOCITY assert
  (the neck-width time-derivative at the snap frame exceeds a threshold) so a slow butter-morph that technically
  reaches 2 components still REDS.
- **(C3·R2) The wet read is first-class, named seams.** Travelling crown specular = a phase-driven offset on the
  Blinn-Phong half-vector (both backends); neck meniscus = a `smoothstep(low-field-gradient)`-gated highlight
  riding the already-computed `fieldGrad` (`metaball.frag.ts` — no new derivative). Gate 2 adds a wet-witness
  (the specular centroid MOVES across frames; the neck waist is BRIGHTER than the body interior).
- **(C2·R4 + C3·minor) The cel-ink `drop-shadow()` chain is a Safari perf cliff on a 60fps-mutating silhouette
  + the `prefers-reduced-transparency` carve risks gray.** **FOLD:** cap the blur radius + verify on the Safari
  WebGL2 paint (not just Chrome); under reduced-transparency the `material=mercury` body falls back to the
  self-lit WARM core (NOT the dropped bleed) — PROVE it stays ≥0.62 warm-L (never gray).

---

## 3. The UNION path — deft integration, KISS, no fork, no 9th atom

One coordinated move over the EXISTING engine. The two halves share ZERO lines (CPU vs GL) and ride ONE wave:

**Move A — the split (CPU, `useBlobSatellites.ts` + `constants.ts` + the packers' phase-scoped `orbitWiden`):**
1. A `fissionAmp` derived scalar (over `surface`/`MoodParams`, defaulting to the calm floor) — the OPT-IN
   register. NO 9th geometry atom; the shipped `variant:"blob"` default stays calm + gate-faithful.
2. The phase machine repurposes `emerging`→`fissioning` (at most ONE beat of churn): the fissioning satellite
   buds OUT through a thinning neck whose gap exceeds the smin reach so it SNAPS, then re-merges next cycle.
   At most ONE fissioner per cycle (a phase token + bounded apex `FISSION_REACH_MAX`); the bonded-breath
   satellites neck to a visible waist (colony read).
3. `orbitWiden` is **PHASE-SCOPED** (the central reconciliation): full+capped during `merging`/`orbiting`
   (the neck stays gooey, R8-07 re-prevented), dropped to nominal during `fissioning` (the neck CAN snap).
   Reuses the EXISTING bridge — NO retirement, NO dual path.
4. The pinch-off kicks the EXISTING pulse spring (`pointer.click(impulse)`) for the cartoon follow-through
   recoil; a NAMED `easing.ts` snap curve drives the apex velocity (anticipation→snap→overshoot→settle).
5. Runs in the SHARED `resolveFrame` closure → byte-identical on both backends BY CONSTRUCTION (no new
   parity surface; the only drift is the smin neck's `fwidth()`-AA, captured by `BD.W-VIZ-PARITY-METAL`).

**Move B — the lens (GL twin, the on-disk `SQUIRCLE-REFRACT` arms, budget-gated):**
1. Arm 1 (squircle dome-Z ⁴√) ADOPTED unchanged — the prerequisite bevel (the SAME byte-form the M2
   re-snapshot writes; on-disk + unconditional).
2. Arm 2 (`uBackdrop` Snell refraction) DE-PARKED → BUILD-iff-measured-budget. The backdrop is a glass-ui
   texture (the route's aurora FBO when present, else a baked COLOURFUL warm-field strip — NOT cream-on-cream;
   NEVER a DOM read). The dome normal drives `refract(viewDir, N, 1/1.5)`; composite (not replace):
   `mix(self-lit, refracted-backdrop, material·fresnelTransmission)` — the warm catch-light + rim stay opaque.
3. The wet read (crown specular + neck meniscus) is first-class (C3·R2 seams above).
4. The `material: goo→glass→mercury` slider re-bundles the EXISTING `surface` atom over the EXISTING `morphT`
   scalar (the variant IS the bundle) — NO 9th atom.

**SAT-SHADE** (on-disk) ADOPTED + DEPENDED-ON — the split is what makes the derived shade READ. **MOTION-TUNE**
(on-disk) ADOPTED + SHARED CONSTANT — the pinch recoil reuses the SAME `pulseVel` oscillator (tune ζ first,
the recoil inherits it). The smin field stays byte-untouched. No new component, no fork, no 9th atom, KISS/DRY.

---

## 4. Reconciliation vs the 116-wave union set (no dup, no re-fork — the on-disk reality)

**The cited GOOBLOB waves are ENROLLED in the union as `W-VIZ-TAILS` sub-members** (`UNIFIED-ROSTER.md:120`):
`BD.W-GOOBLOB-SAT-SHADE` · `BD.W-GOOBLOB-SQUIRCLE-REFRACT` · `BD.W-BLOB-MOTION-TUNE` are 3 of the 8
DEFER-with-trigger Band-9 tails (the wave FILES live in `BD/waves/`, the ROSTER ROW is in `BD/union/`).
`BD.W-VIZ-TAILS` (Band 14 AMENDS) governs the parity discipline; `BD.W-BLOB-MULTICORE` (Band 13 V-NEW)
dedups their perf concerns into the REAL shadow-march budget (`sceneDistG` ~825 evals/frag at M6/K12).

| Union wave | Owns | Disposition |
|---|---|---|
| `BD.W-GOOBLOB-SQUIRCLE-REFRACT` (BD/waves; W-VIZ-TAILS sub) | dome-Z squircle (arm 1) + `uBackdrop` lens (arm 2, HELD) | **AUGMENT** — arm 1 ADOPT as-is; arm 2 DE-PARK→BUILD-iff-budget + the composite/dispersion/wet/colourful-backdrop hardenings. The lens half of the union lives here. |
| `BD.W-GOOBLOB-SAT-SHADE` (BD/waves; W-VIZ-TAILS sub) | per-satellite OKLCh shade lane | **ADOPT + DEPEND** — unchanged mechanism; the fission gives it its reason to read. |
| `BD.W-BLOB-MOTION-TUNE` (BD/waves; W-VIZ-TAILS sub) | pulse-ζ flinch + flick-stretch | **ADOPT + SHARED CONSTANT** — the pinch recoil reuses the `pulseVel` oscillator; tune ζ first. |
| `BD.W-VIZ-TAILS` (Band 14 AMENDS) | the cohort parity discipline (numeric ΔE, no `.test(/fn/)`) | **DEPEND** — the new split/lens π close against the `shader-eval-harness` numeric net + the `fwidth`-site real-GPU capture (NOT authored 0.0). The amendment INHERITS this discipline, does not re-state it. |
| `BD.W-BLOB-MULTICORE` (Band 13 V-NEW) | the N-core + the REAL shadow-march budget | **COORDINATE** — Move B's lens fill-cost is measured WITHIN the MULTICORE budget methodology (the lens adds dome-pixel taps, NOT shadow-march evals; the two budgets are additive, measured once). |
| `BD.W-BLOB-LAVA / -MULTICORE / -EMOTION` (union/waves) | register dressings | **DISJOINT — no dup.** This authors the fission PRIMITIVE all three would consume (the engine); those are the registers (the dressings). |
| `BD.W-GOO-SPLIT-PERF` (union/waves) | the DOCK SVG `url(#dock-fission-goo)` CSS filter | **DISJOINT SURFACE** — CSS filter vs GPU SDF field; the name collision is incidental. The blob adds no per-pixel cost to the dock. |
| `BD.W-DOCK-GOO-SPACING` (union/waves) | dock goo spacing | **DISJOINT** — dock, not blob. |
| RESEARCH.md OPEN-1 (dark default) / OPEN-2 (50-knob) | — | **CLOSED — do NOT re-open** (warm-cream holds, 8 atoms; the seed doc is stale). |

**The amendment is therefore: AUGMENT the 3 on-disk GOOBLOB sub-member waves + author ONE NEW union wave**
`BD.W-GOOBLOB-MERCURY-COLONY` (the Move-A split engine — the genuinely net-new mechanism the 3 tails do NOT
own), DEPENDING on `W-VIZ-TAILS` (parity discipline) + coordinating with `W-BLOB-MULTICORE` (budget). NO wave
pruned/excised (every cited wave is fit + on-disk). No dup with the goo-morph CSS worm (DOM filter) — distinct
engines (GPU SDF), named so.

---

## 5. Convergence — ~80%

The design SURVIVES all three challenges intact; the union is a genuine deft integration (CPU split + GL lens
share zero lines, ride the existing engine, no fork, no 9th atom, KISS/DRY). The born-RED is VISUALLY verified
live. The ~20% remaining is build-time evidence, not architecture:
- the rebuilt spike (real lean stack + real phase machine + phase-scoped `orbitWiden`, at the spec orbit 0.30)
  before any "lean-safe / de-risked" claim;
- the measured Move-B frame budget on the real route with the sampler armed (BUILD-iff-clears);
- the colourful default backdrop (so the lens has something to bend);
- the velocity-snap + wet-meniscus + chroma-bleed witnesses wired into the gates;
- the PAIRED-engine (WGSL-on-Metal × GLSL-on-ANGLE) capture for BOTH the lensed dome ΔE AND the fission
  topology — the cardinal cross-engine witness, never single-engine green; the Safari WebGL2 paint of the
  cel-ink `drop-shadow()` chain (the perf-cliff verify).

The implementation is USER-gated (tranche-dev only). DELTA-ASSAY.md + WAVE-AMENDMENT.md written;
`golden/delta-head-blob-light.png` captured.
