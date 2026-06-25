# GooBlob — WAVE-AMENDMENT (concrete tranche reconciliation)

> The CONCRETE amendment to the BD union wave set for the warm-mercury colony. Each entry
> cites the on-disk wave by filename, states AUGMENT / ADOPT / NEW / DEPEND / COORDINATE, and
> the new wave carries a REAL born-RED gate. References `GOLDEN.md` as the reference
> implementation. No duplicative work — reconciled against the on-disk 116-wave union set
> (`BD/union/waves/` + the `W-VIZ-TAILS` sub-member files in `BD/waves/`). NO legacy, no fork,
> no 9th atom, no dual path. Implementation USER-gated (tranche-dev only).

---

## A. NEW WAVE — `BD.W-GOOBLOB-MERCURY-COLONY` (the Move-A split engine; the genuinely net-new mechanism)

**File to author:** `docs/tranches/BD/union/waves/BD.W-GOOBLOB-MERCURY-COLONY.md`
**Band:** procedural-viz (rides the goo-blob shader/lifecycle cohort).
**Depends:** `BD.W-VIZ-TAILS` (the parity discipline — the split π closes against the numeric net, not `.test(/fn/)`);
`BD.W-GOOBLOB-SQUIRCLE-REFRACT` arm 1 (the squircle bevel the lens read needs).
**Coordinates:** `BD.W-BLOB-MULTICORE` (the REAL budget — the fission adds NO per-pixel cost; the lens fill-cost
is measured within MULTICORE's methodology); `BD.W-BLOB-MOTION-TUNE` (shares the `pulseVel` oscillator — tune ζ first).
**Reference:** `GOLDEN.md` §1–§3, §7–§8.

### Scope (the union, KISS, no fork, no 9th atom)
1. **`fissionAmp` — the OPT-IN register (NOT a 9th atom; NOT a default re-base).** A derived scalar over the
   EXISTING `surface` atom / `MoodParams` (the variant IS the bundle), defaulting to the calm floor (≈0). The
   shipped `variant:"blob"` default stays calm + gate-faithful (`proof:blob-render`/`-studio`/`-page` UNMOVED —
   `orbitRadius 0.17` is NOT re-based; the split is the `colony`/`mercury` register a consumer/studio opts into).
   **(folds challenge C2·R3 + C3·R3 — the calm-contract break.)**
2. **The phase-machine repurpose `emerging`→`fissioning` (at most ONE beat of churn).** In `useBlobSatellites.ts`
   the fissioning satellite buds OUT through a thinning neck whose gap exceeds the smin reach so it SNAPS into a
   free orbiting bead, then re-merges next cycle. At most ONE fissioner per cycle (a phase token + bounded apex
   `FISSION_REACH_MAX` in config-UV); the bonded-breath satellites neck to a visible WAIST (the colony read,
   never a static lump). **(folds C3·R1 — twitch-not-colony.)**
3. **`orbitWiden` is PHASE-SCOPED (the central reconciliation — challenge C2·R1, LOAD-BEARING).** The live
   `orbitWiden` bridge (`uploadBlobUniforms.ts:246-259` + `uniformBridgeWGPU.ts:129-144`,
   `min(1.25, 1+bridgeGap/nominalBand)`) is NOT retired (it cures the R8-07 "instant fully-detached disc with
   no gooey neck") — it is PHASE-GATED: full+capped during `merging`/`orbiting` (the neck stays gooey,
   R8-07 re-prevented for every non-fissioning satellite), dropped to nominal ONLY for the at-most-one
   `fissioning` satellite so its neck CAN thin past the smin reach and SNAP. The split rides MOTION (the
   satellite moves), not a global band re-base → sidesteps the AZ.W-BLOB-STUDIO D2 lean-regression. The
   phase-scope flows through BOTH packers in lockstep (a phase term read in the bridge, NOT a new uniform).
4. **The cartoon PUNCH (challenge C3·R1).** The pinch-off carries an authored velocity curve via a NAMED
   `easing.ts` snap curve (DRY — reuse the file): anticipation (inward squash toward the bud point) → fast snap
   (neck thins past reach in a SHORT window) → overshoot → damped recoil. The recoil kicks the EXISTING pulse
   spring (`pointer.click(impulse)`, `PULSE_OMEGA 18`/`PULSE_ZETA 0.35`, `useBlobPointer.ts`) — the SAME
   oscillator `BD.W-BLOB-MOTION-TUNE` tunes (no new spring, no new clock; the recoil inherits the tuned ζ).
5. **CPU-only, runs in the SHARED `resolveFrame`** → byte-identical on WGSL-on-Metal × GLSL-on-ANGLE BY
   CONSTRUCTION. ZERO new uniform, ZERO new shader line, ZERO new context. The freed bead ARCS (the existing
   `pertX/pertY` wobble) carrying its `BD.W-GOOBLOB-SAT-SHADE` derived warm shade. Mood-coupled via the existing
   `MoodParams` (`excited`→more splits; `sleepy`→barely). Pointer-coupled: `usePointerVelocityField` burst scales
   the fission breath-out (morph-MORE-on-move).

### The born-RED gate — `proof:goo-mercury-colony` (PAIRED-ENGINE, both modes)
Reuses the on-disk `blob-studio.spec.ts` connected-component machinery (`PNG.sync.read(locator.screenshot())`
→ modal-bg → silhouette mask at `FG_DIFF_T` → step-4 downsample → flood-fill with `COMPONENT_MIN_CELLS`).
- **G1 FISSION TOPOLOGY** — at the `colony`/`mercury` register (the OPT-IN; NOT the calm default, per C2·R3),
  over a sampled φ-detuned cycle (`SAT_FRAMES ≈ 40`), the connected-component count over the silhouette goes
  **2→1→2**: ∃ a frame DISCONNECTED (≥2 satellite-sized components) AND a frame CONNECTED (1, mid-merge).
  **Born-RED on HEAD:** the register doesn't exist → count is ALWAYS 1 (the permanently-merged lump; live-verified
  in DELTA-ASSAY §0).
- **G2 SNAP VELOCITY (the cartoon-punch witness; folds C3·R1).** The neck-width time-derivative at the snap
  frame exceeds a threshold (the SNAP is fast; the merge-in may be slow). A slow butter-morph that technically
  reaches 2 components REDS. **Born-RED on HEAD:** no fissioning beat exists.
- **G3 LEAN-SAFE co-assert (folds C1·R1).** The rest/pointer-idle/PRM-frozen centroid stays under the
  `proof:blob-render` calm-lean ceiling **0.10** (the documented worst case is flick-time at 0.091; the fission
  apex `FISSION_REACH_MAX` + cadence are TUNED against this gate, asserted on the pointer-idle frame — NOT the
  static-ellipse 0.0127 the spike mis-claimed). The DEFAULT calm creature's centroid is UNMOVED from HEAD
  (the gate re-records the calm-default lean, proving the OPT-IN register did not regress it).
- **G4 R8-07 NON-REGRESSION (the orbitWiden phase-scope witness; folds C2·R1).** At the `colony` register, a
  NON-fissioning satellite at its widest orbit excursion still bridges a GOOEY neck (the silhouette stays
  connected through that satellite with a visible smin waist — NO hard-edged fully-detached disc). A synthetic
  state where `orbitWiden` drops to nominal for a non-fissioning satellite (the R8-07 fail) REDS.
- **G5 PARITY (the cardinal cross-engine, folds C2·R5 + W-VIZ-TAILS discipline).** The fission topology reads
  IDENTICALLY on WGSL-on-Metal × GLSL-on-ANGLE (the same satellite positions on both backends — the
  `resolveFrame` closure is shared); the smin neck `fwidth()`-AA ΔE closes against `BD.W-VIZ-PARITY-METAL`'s
  numeric net (NOT an authored 0.0). At least ONE real-GPU backend pair captured.
- **Self-test bite** — a synthetic fissioning beat on a pure `sin` (no snap velocity) REDS G2; a synthetic
  global `orbitWiden`-retire REDS G4; the calm default mutated to split REDS G3 (the calm-contract bite).

**Born-RED on HEAD:** G1+G2+G4 fail (no fission register; permanently-merged lump — live-verified). GREEN when
the field SPLITS (2→1→2) with a cartoon-snap, the calm default stays calm, R8-07 stays cured, both backends match.

### Build-time de-risk (the rebuilt spike — folds C1·R1 + C2·R5)
Before any "lean-safe / de-risked" claim, the throwaway `golden/fission-topology-spike.mjs` is REBUILT to:
(a) drive the ACTUAL `useBlobSatellites` phase machine (orbiting/merging/absorbed/`fissioning`), NOT a hand
`sin(phase)`; (b) import/replicate the PHASE-SCOPED `orbitWiden` from `uploadBlobUniforms.ts` and re-run both
scenarios (HEAD-with-widen still born-1; colony-with-phase-scoped-widen produces a CLEAN-NECKED 2→1→2, a thinning
waist not a hard disc); (c) port the real lean stack (`wobble + pertX/pertY + a synthetic pointer-flick toward
the fissioning apex side`) and sweep at the SPEC orbit (the bounded apex, not 0.40), reporting the worst-case peak
with the satellite-on-leaned-side phase aligned to flick-time. If peak ≥ 0.10 the apex/cadence re-tune DOWN.

---

## B. AUGMENT — `BD.W-GOOBLOB-SQUIRCLE-REFRACT` (the lens half, budget-gated)

**File:** `docs/tranches/BD/waves/BD.W-GOOBLOB-SQUIRCLE-REFRACT.md` (W-VIZ-TAILS sub-member D34-B6/B7).
**Disposition:** **AUGMENT** (arm 1 ADOPT as-is; arm 2 DE-PARK→BUILD-iff-budget + harden).

- **Arm 1 (squircle dome-Z ⁴√) — ADOPT unchanged.** The on-disk, unconditional, byte-form-load-bearing curve
  switch (`pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)`, both backends in lockstep, the M2 re-snapshot
  in `LIT_MATH_VERBATIM[7]`). It is the prerequisite that makes the lens read as a BEVEL. No change.
- **Arm 2 (`uBackdrop` Snell refraction) — DE-PARK → BUILD-iff-measured-budget (folds C1·R2 + C2·R2).** Restate
  arm 2 from CONDITIONAL-vague to BUILD-iff a recorded `/substrates/blob` frame-budget number (sampler armed,
  on the real route, both backends) clears the live ceiling. Clears → ships; bites → arm 1 ships, arm 2
  terminal-HELD with the number. Re-label "GPU-shader, no-DOM-backdrop" (NOT "compositor-only"). ADD to §3:
  - **Composite, not replace:** `mix(self-lit-rgb, refracted-backdrop, material·fresnelTransmission)` — the warm
    catch-light + rim stay opaque at `material=mercury`; the body goes transmissive. Premultiplied-alpha unchanged.
  - **The COLOURFUL default backdrop (folds C3·R3 — live-verified: NO aurora on this route).** When no aurora FBO
    is present the backdrop is a baked COLOURFUL warm-field strip (the `paletteStops` spread into a multi-stop
    field with real cool/warm chroma variation across the dome footprint), NOT a flat cream ramp (cream-through-
    cream is an invisible lens). One GL/route preserved.
  - **The wet read first-class (folds C3·R2):** the travelling crown specular (a phase-driven offset on the
    Blinn-Phong half-vector, both backends) + the neck meniscus (a `smoothstep(low fieldGrad)`-gated highlight
    add riding the already-computed `fieldGrad`, no new derivative).
  - **≤1px 3-IOR chromatic dispersion** at the rim, PRM-zeroed; PROVE the fringe stays inside `uMaxReach` or widen
    the pad (folds C2·R2).
- **The `material: goo→glass→mercury` slider** — a single derived scalar re-bundling the EXISTING `surface` atom
  over the EXISTING `morphT` (NO 9th atom). Lands here (the lens read is the `mercury` end of the slider).
- **Gate add — `proof:goo-squircle` gains Q6 MERCURY LENS (folds C2·R2 + C3·R2 + C3·R3), born-RED on HEAD:**
  - **Q6a transmissive-not-self-lit** — at `material=mercury` over a known COLOURFUL warm backdrop, a ring of
    pixels just inside the rim shows the backdrop hue bleeding through DISPLACED (the in-rim color tracks the
    backdrop's local color shifted by the Snell offset, measurably ≠ the self-lit core color, AND ≠ the
    UN-displaced sample at the same pixel — isolating the lens from a mere alpha-composite). **Born-RED:**
    `uBackdrop` absent → bleed ΔE ~0 (grep-confirmed).
  - **Q6b wet witness** — the crown specular centroid MOVES across two frames (travelling); the neck waist is
    BRIGHTER than the body interior (the wet meniscus). A static matte lens REDS.
  - **Q6c paired-engine bleed ΔE** — the lensed dome on WGSL-on-Metal × GLSL-on-ANGLE matches under a threshold
    RE-DERIVED for transmissive drift (the displaced sample crosses hue gradients — a LARGER drift surface than
    the self-lit dome; do NOT reuse the self-lit threshold). The backdrop texture colorspace PINNED
    (`texImage2D` known internal format + `linearToSrgb` on the SAMPLE, not just the core).
  - **Q6d budget recorded** — the refraction ships ONLY with a recorded `/substrates/blob` frame-time number
    under the live ceiling (the existing Q3 budget clause, now BINDING).

---

## C. ADOPT + DEPEND — `BD.W-GOOBLOB-SAT-SHADE`

**File:** `docs/tranches/BD/waves/BD.W-GOOBLOB-SAT-SHADE.md` (W-VIZ-TAILS sub-member D34-B5).
**Disposition:** **ADOPT unchanged + DEPENDED-ON.** The per-satellite OKLCh derived-shade lane mechanism is fit
and on-disk. The MERCURY-COLONY split is what makes the derived shade READ (two related warm beads pulling apart
at the waist — the technicolor chroma-separation; it was invisible while satellites stayed merged). Add ONE note
to its §5: the dedicated π's "un-merged frame" now EXISTS by default at the `colony` register (the fission supplies
the disconnected frame the readback needs), so the sat-shade witness is no longer manual-orbit-dialed. No mechanism
change, no gate change.

---

## D. ADOPT + SHARED CONSTANT — `BD.W-BLOB-MOTION-TUNE`

**File:** `docs/tranches/BD/waves/BD.W-BLOB-MOTION-TUNE.md` (W-VIZ-TAILS sub-member D34-B8/B9).
**Disposition:** **ADOPT + SHARED CONSTANT.** The pulse-ζ flinch tune (arm 1) + the flick-stretch read (arm 2)
are fit + on-disk. Add ONE coordination note to its §3/§6: the MERCURY-COLONY pinch-off recoil reuses the SAME
`pulseVel` oscillator — sequence so ζ is DECIDED FIRST (the recoil amplitude inherits the tuned ζ; if arm 1 raises
ζ toward the decisive-flinch 0.5–0.6, the recoil ring inherits it for free). The flick-stretch (arm 2) makes the
lens slosh READ (the field warps with the elongation — morph-MORE-on-move). No mechanism change, no gate change.

---

## E. DEPEND — `BD.W-VIZ-TAILS` (the cohort parity discipline)

**File:** `docs/tranches/BD/union/waves/BD.W-VIZ-TAILS.md` (Band 14 AMENDS).
**Disposition:** **DEPEND — inherit, do not re-state.** The new split/lens π close against the
`shader-eval-harness` numeric ΔE net + the `fwidth`-site real-GPU capture (the TWO live `fwidth()` lines
`metaball.frag.ts:292`/`:428` + the WGSL twin) per W-VIZ-TAILS's T3 (no authored `0.0`, no `.test(/fn name/)`
round-trip). The MERCURY-COLONY G5 + SQUIRCLE-REFRACT Q6c parity asserts ARE the goo-blob tail's two-GPU-backend
twin witnesses W-VIZ-TAILS §"GOOBLOB-…" already books. The amendment adds NO new fallback-retire concern.

---

## F. COORDINATE — `BD.W-BLOB-MULTICORE` (the REAL budget)

**File:** `docs/tranches/BD/union/waves/BD.W-BLOB-MULTICORE.md` (Band 13 V-NEW).
**Disposition:** **COORDINATE.** Move A (the split) adds NO per-pixel cost (CPU lifecycle only). Move B (the lens)
adds dome-pixel taps (1 backdrop sample + 2 dispersion taps at the rim + `refract()`), NOT shadow-march
`sceneDistG` evals — the two budgets are ADDITIVE and measured ONCE within MULTICORE's `/substrates/blob` budget
methodology (the SQUIRCLE-REFRACT arm-2 Q6d number is recorded against MULTICORE's ceiling, not a separate guess).

---

## G. DISJOINT — no dup, no excise (the on-disk waves that share a name/surface but NOT a mechanism)

- `BD.W-GOO-SPLIT-PERF.md` (union/waves) — the DOCK SVG `url(#dock-fission-goo)` CSS filter p50. DISJOINT
  surface (CSS filter vs GPU SDF field); the "split" name collision is incidental. The blob adds no per-pixel
  cost to the dock. No change.
- `BD.W-DOCK-GOO-SPACING.md` (union/waves) — dock goo spacing. DISJOINT (dock, not blob). No change.
- `BD.W-BLOB-LAVA / -MULTICORE / -EMOTION` (union/waves) — register DRESSINGS. This amendment authors the
  fission PRIMITIVE (the engine) all three would consume; they are the registers. No dup, no change.
- The goo-morph CSS worm (`W-PAGER-GOO-MORPH` / `W-GOO-CAROUSEL-DECK*` / `W-GOO-MORPH-REFINE`) — the DOM
  `filter:url()` pager metaball. DISTINCT engine (GPU SDF field vs DOM filter), named so. No dup.

**No wave is PRUNED or EXCISED** — every cited wave is fit + on-disk. The amendment is 1 NEW union wave
(`BD.W-GOOBLOB-MERCURY-COLONY`, the split engine) + AUGMENT the lens half (`SQUIRCLE-REFRACT` arm 2) + ADOPT/
DEPEND the 2 sibling tails + DEPEND/COORDINATE the 2 governing meta-waves. RESEARCH.md OPEN-1/OPEN-2 stay CLOSED.

---

## H. Summary of touched waves
- **NEW:** `BD.W-GOOBLOB-MERCURY-COLONY` (Move-A split engine; born-RED `proof:goo-mercury-colony` G1-G5).
- **AUGMENT:** `BD.W-GOOBLOB-SQUIRCLE-REFRACT` (arm 2 DE-PARK→BUILD-iff-budget + composite/colourful-backdrop/
  wet/dispersion + the `material` slider + the new Q6 lens gate clauses).
- **ADOPT/note:** `BD.W-GOOBLOB-SAT-SHADE` (depended-on; the split makes it read) · `BD.W-BLOB-MOTION-TUNE`
  (shared `pulseVel` constant; tune ζ first).
- **DEPEND/COORDINATE:** `BD.W-VIZ-TAILS` (parity discipline) · `BD.W-BLOB-MULTICORE` (budget).
- **PRUNE/EXCISE:** none.
