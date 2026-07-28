# PROCEDURAL-APOTHEOSES — the three binding design apotheoses, banked

**Provenance:** run `wf_51cdb0e0-bdb` (procedural, CLOSED 07-27), harvested verbatim 2026-07-28 under
VALIDATION.md CURE-3 — `PROCEDURAL-LEDGER.md` cites these documents' §-numbers as BINDING ("The charter
§1–§8 is the binding amendment to GF-BLOB-PASS3") while they existed only in the journal. This file is
the cited source of record. NOTE (CURE-3 rider): `DESIGN-NOW.md`'s blob re-cut was authored WITHOUT
this charter on its input list — reconcile the two at the stage-2 delta fold before GF-BLOB executes.

# ═══════════ BLOB-PHYSICS CHARTER ═══════════

All verification complete. Composing the adjudicated charter.

---

**modelId: `claude-fable-5`** · TRI-FOLD ADJUDICATOR — BLOB PHYSICS · HEAD `9c5a7451` · zero repo bytes; every instrument re-run in `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/proc/blob-sim/` (Opus arm: `sim.mjs`+runners; Fable arm: `arm2/sim{,2,3}.mjs`).

# THE ADJUDICATED BLOB PHYSICS CHARTER

## §0 VERIFICATION LEDGER—what was checked before adoption

| claim | instrument | result |
|---|---|---|
| D1 inflation `satG.x += (1.0−s.w)*0.3` | `src/components/blob/shaders/metaball.wgsl.ts:209` | CONFIRMED verbatim |
| MAX_SATS 4 · BASE_OPACITY 0.75 · FISSION_* · ORBIT_RANDOM_* | `src/components/blob/constants.ts:13,157-162,172,199-219` | CONFIRMED |
| geometry defaults 0.22/3/0.082/**0.17**/e0.05/k0.05 | `src/components/blob/types.ts:297-320` | CONFIRMED |
| BLOB_HERO orbit 0.30, sat 0.10, smoothK 0.06 | `src/components/blob/presets.ts:53-64` | CONFIRMED → threshold 0.380 > 0.30, hero paints one circle |
| D9 unlatched `click()` every decel frame | `src/components/blob/composables/blobSimulation.ts:131-136` | CONFIRMED, no latch |
| D8 sim-ms horizon into wall-ms `setTimeout` | `blobSimulation.ts:101-109` (`delayMs = nextEventMs − simTimeMs`, no tempo divide) | CONFIRMED |
| D2 `MetaballSource.fissioning` zero readers | grep: written `useBlobSatellites.ts:366`, `satelliteKinematics.ts:70`; no packer reads it; `types.ts:39-44` documents a widen-drop that does not exist | CONFIRMED |
| orbitWiden servo, ceiling 1.25 | `src/components/blob/composables/uniformBridgeWGPU.ts:134-146` | CONFIRMED |
| buffer 592 B | `uniformBridgeWGPU.ts:53` | CONFIRMED; 4→12 sats +128 B, +satColor 192 B = 912 B |
| fwidth sites top-level only → sat-loop `continue` legal | `metaball.wgsl.ts:350,375`; loop `:205-211` derivative-free | CONFIRMED |
| shadow marches full field ×24 | `metaball.wgsl.ts:245-253` (`sceneDistG` at `:247`) | CONFIRMED |
| dock spring on disk | `src/composables/motion/spring/springPresets.ts:109-112` | response 0.35, ζ 0.82—both arms read disk correctly |
| barrel exposure for the relay | `src/components/blob/index.ts:7,15,16` (`MetaballSource`, `SatellitePhase`, `SatelliteInternal`) | CONFIRMED |
| Fable regime table (C: rCV 0.233, λ −0.627, 0 escapes; B fission 0% at dv≤1.2, 45% escape at 1.5; poke rCV 0.206) | re-ran `arm2/sim.mjs` | REPRODUCED exactly |
| Fable periapsis floor (100%, tSep 0.63–0.65±0.11–0.15, apex 0.51±0.07, 2.5 kisses/30 s) | re-ran `arm2/sim3.mjs` | REPRODUCED exactly |
| Opus envelope sweep, 4-regime head-to-head, seed spread, depth-3 collapse 93.8% | re-ran `regimeD.mjs` | REPRODUCED verbatim |
| Opus fission knee (J 0.005 → 0.78 unbound, 2.5% wall) + mood ladder (excited 97.8% sep, 37.5% wall at a 0.550) | re-ran `click.mjs`, `mood2.mjs` | REPRODUCED |
| Opus `run.mjs` shows e≈0.009 everywhere | re-ran | CONFIRMED as the confessed §8-bug-1 run—final numbers live in `regimeD.mjs`/`click.mjs`/`mood2.mjs`, which are clean |
| **Incredulity catch**: "13 bodies measured 0% wall hits" | `regimeD.mjs` D4 row `13/depth-1`: **9.4% wall hits** at envFrac 0.42, vJitter 0.20 | Opus cherry-picked the depth-2 row. Cured below by shipping f=0.273 (sweep: 0% wall at f≤0.30) + G-BOUNDED runs at the SHIPPED tree |

## §1 THE RULING—the spine is Opus's regime D, the envelope hybrid

**Coordinate ONLY the radial envelope; leave the angular dynamics fully emergent.** A one-sided critically-damped radial term fires only outside `[a(1−f), a(1+f)]`; inside the band the body is free.

The two arms measured the same physics and split on a value judgment. The fact pattern, from both reproduced datasets: every position-guide hybrid CONTRACTS (Fable's stiff tether λ=−0.627; Opus's soft guide λ=+0.0417 vs pure-emergent 0.3045)—the position-spring family trades boundedness against chaos along its stiffness axis (stiff→bounded movie, Fable C: 0 escapes; soft→unbounded semi-chaos, Opus C: 25% wall hits, r max 1.092) and **no point in that family gets both**. Regime D exits the family by coupling to one degree of freedom: λ=0.2983 (98% of pure emergence's chaos) with 0% wall hits at f≤0.30. Pure emergence (both arms: B/B0/BW) fails containment outright; Fable's walled BW was WORSE than unwalled (93 vs 16 escape events—wall-reflection ping-pong).

The owner's words settle the value question: "natural, chaotic, elliptical… it's possible via simulation that these need not be fully coordinated, in that the blob physics form a cohesion that's emergent. Experiment." The experiment's honest answer: emergent cohesion works iff the skeleton owns exactly the radial envelope and nothing else. Fable's C is the extant `satelliteKinematics.ts` architecture with better decoration—incommensurate sines are what ships today (`satelliteKinematics.ts:75-98`) and are why the owner reads choreography.

## §2 ARCHITECTURE—recursion in state, one field in paint (both arms convergent)

- `BlobNode = { radius, ink, parent, depth, x,y,vx,vy, bound, children[] }`—one recursive sim node, ONE renderer. The tree flattens at upload into `satPos[12]` + `satColor[12]`.
- **Depth bound 2, measured not tasted**: depth 3 collapses 93.8% of runs (regime D) and 100% (pure emergence). A sub-satellite is a lobe of its parent that peeks free ~9% of the time—the softening ε=r_parent makes the parent's near field harmonic, which IS the leash (the mechanism both arms converged on; Opus's emerges from the force law, so no second law is needed).
- **Population cap: 12 non-core bodies + core.** Default tree: core + 4 satellites + 2 children each. Configurator clamp: `N_sat·(1+N_sub) ≤ 12`, enforced LOUDLY (dev-warn) in `syncCount`—cures D5 (verified: `useBlobSatellites.ts:92-118` never clamps to MAX_SATS today).
- **One shared field.** Per-instance fields cannot smin across pipeline boundaries (they'd composite alpha-over—the exact hard-overlap law-6 forbids) and cost 43.3× per body. WGSL deltas: `MAX_SATS` 4→12 (`constants.ts:13`, one table); satellite loop gains `if (satG.x - d.x > 4.0*uSmoothK) { continue; }` (legal—loop is derivative-free, both fwidth sites top-level at `:350`/`:375`); **delete `:209`**; add `satColor: array<vec4<f32>,12>`—cures D3, satColor.w carries ink alpha (BASE_OPACITY pinning dies with it). Buffer 592→912 B (`uniformBridgeWGPU.ts:53`).
- **LOD (union of both arms):** shadow march uses the ANALYTIC field—circles + smin, no FBM, and excludes depth-2 bodies + pointer trail (HEAD marches the full field ×24, `metaball.wgsl.ts:247`; the march is 97% FBM by ALU—cures B13, and Opus's accounting shows 13 bodies at ~3× cheaper than today's 4); membrane noise octaves `max(0, 3−2·depth)`, domain-warp at depth 0 only; canvas < 200 px CSS disables depth 2; sleepy docks subs first. CPU is never the constraint: 4.75 µs/step at 13 bodies ≈ 0.03% of a frame.

## §3 THE FORCE SYSTEM—buildable spec (config-UV, dt=1/60, velocity-Verlet; m = r²)

1. **Central attraction, per body toward its parent**: `|F| = G·m_parent/(d²+ε²)^(n/2)`, **G 0.113, n 1.7, ε = r_parent**. Bertrand's theorem: n∉{2,−1} never closes—apsidal precession −44.3°/rev, a rosette that never re-traces. Replaces the sine stack.
2. **Radial envelope** (the skeleton): one-sided spring outside `[a(1−f), a(1+f)]`, response 1.2, ζ 0.9, damping applied only to the out-of-band-carrying velocity component. **Floor law: `a(1−f) = R_parent + r_body` → f = 1−(R+r)/a = 0.273 at default**—a bead never buries deeper than surface contact. Ceiling check: `a(1+f)+r = 0.660 < rWall 0.78`.
3. **Capillary bridge** (the neck): within gap ∈ (0, kBand=smoothK), attraction `kCoh·4u(1−u)`, u=gap/kBand, **kCoh 0.010** base. This is 98.2% of binding energy (measured 54:1 vs gravity)—fission is a surface-tension problem.
4. **Contact**: spring on dock response 0.35, **approach-only** damping ζ 0.10 (`sign(vn)<0` only). Symmetric or high-ζ damping circularizes every orbit within two passes (Opus §8 bug 1, visible in `run.mjs`'s e≈0.009)—**any implementation that damps separation kills the eccentricity**.
5. **Containment**: one-sided critically-damped wall at rWall 0.78, response 0.35.
6. **Seeding**: tangential circular speed × (1 ± vJitter), **vJitter 0.28** at idle; random direction per body (retrograde allowed). Eccentricity is an ATTRACTOR: e_global settles 0.33–0.36 across an 11× jitter sweep—`geometry.eccentricity` is a dead knob, delete it.
7. **Defaults**: bodyRadius 0.22, satelliteRadius 0.10, child r = 0.45×parent, smoothK 0.06, **orbitRadius a = 0.44**. The separation threshold is `a > R + r + smoothK = 0.380` (BLOB_HERO's 0.30 provably paints one circle; the PASS3 §2.8 gate as drafted checks the wrong bar). Merge↔orbit breath comes free from eccentric periapsis dips through the horizon (2.5 kiss passes/30 s band contact retained—Fable's meniscus-waist events survive under D as bridged% 24.4 at f 0.20).

## §4 FISSION + MERGE—causal, emergent, latched

- **One impulse bus**: pointer click, pointer-deceleration burst, and API `nudge` all enter as impulses—**latched one per burst crossing** (cures D9: `blobSimulation.ts:131-136` fires every frame today) and all counted (cures the uncounted-Poke live-ledger defect).
- **Siting**: impulse magnitude Gaussian around the POINTER (σ ≈ 0.22× inter-body spacing), direction radially outward from the struck body's parent (click→body direction is degenerate for the body under the cursor—Opus §8 bug 2).
- **Operating point**: J_full = 0.005 → Δv ≈ 5.6×v_circ → 0.78 bodies unbound/click, 2.5% wall hits—one click, one bead. `J_eff = J_full·fissionAmp`; **fissionAmp 0 = the calm contract** (no dice: `FISSION_PROB_AT_FULL` cadence dies; cadence becomes causal).
- **The pinch snap is emergent**: capillary force peaks mid-band and vanishes at the edge, so the residual velocity snaps the bead free at 0.106 UV/s (4.6× the choreographed crossfade). `fissionSnap` deleted, not re-roled (§REJECTED-3).
- **Merge**: a free body's chaotic excursion dips below the horizon; capillary captures it. "Absorbed" = bonded. The 5-phase FSM, `orbitPos`, `orbitBlendOrigins`, MERGE_STAGGER/ORBIT_BLEND, and the single-fissioner token all die.
- **Population is fixed**: bodies transition bonded↔free; no spawn/despawn (§REJECTED-5).

## §5 MOOD—three scalars into the laws, one derivation surface (`constants.ts:64-103` kept)

`a_eff = 0.33 + 0.19·arousal` (cap 0.52 by the wall law `(0.78−r)/(1+f)`=0.534; Opus's 0.22-slope excited pole measured 37.5% wall hits—the catch that set the cap) · `vJitter = 0.10 + 0.30·arousal` · `kCoh = 0.016 − 0.010·arousal`. Measured ladder: sleepy a_eff 0.352 < 0.380 → docks at surface contact and breathes (66.8% merged); excited → 97.8% separated. Fission difficulty rides kCoh for free—sleepy needs J 0.007 to free 0.71 beads, excited is already unbound. `smoothK` slider relabels to **"Cohesion—how hard the colony is to split"**.

## §6 SCHEDULING—`settled ≡ KE_rel < ε`

One derived scalar: total kinetic energy in the core-relative frame. Read by the public seam AND `shouldContinue`—U3 single-signal preserved. A chaotic system has no schedulable next event (e-folding 3.4 s), so `nextEventMs`/`scheduleWake` are deleted (cures D7; the one remaining horizon, mood auto-transition, converts sim→wall as `delay = (nextSimMs − simTimeMs)/tempo`, tempo 0 → no timer—cures D8, Fable's formula). Park on lifecycle predicates (offscreen/hidden/PRM) and on KE < ε (sleepy reaches it; orbiting renders—the breath-of-life edict wants that). **Resume = continue from frozen state**: no reference clock exists, so no catch-up and no pop, ever. PRM pose: bodies static at radius a_eff, golden-angle spacing, visibly detached. D12 stands: raise `pulseAmp` or the breath drowns under the FBM floor.

## §7 BUILD LIST

| # | change | site |
|---|---|---|
| 1 | delete the inflation term | `metaball.wgsl.ts:209` (GL twin dies with the CUT WebGL2 arm—EXEC-STATE `:171-187`, 1,040 LOC) |
| 2 | delete orbitWiden + MAX_BRIDGE_WIDEN | `uniformBridgeWGPU.ts:134-146`, `uploadBlobUniforms.ts:233-274` |
| 3 | delete ORBIT_RANDOM_*/SAT_WOBBLE*/BASE_OPACITY/ORBIT_BLEND_MS/MERGE_STAGGER_MS/FISSION_* | `constants.ts:157-219` |
| 4 | replace FSM+`orbitPos` with the §3 integrator; delete `fissionSnap`, `MetaballSource.fissioning`+docs, `SatellitePhase` | `useBlobSatellites.ts:152-368`, `satelliteKinematics.ts`, `composables/easing.ts:45-64`, `types.ts:36-62,92-106` |
| 5 | `settled ≡ KE_rel<ε`; delete `isQuiescent`/`nextEventMs`/`scheduleWake`; latch the decel impulse | `useBlobSatellites.ts:400-422`, `blobSimulation.ts:101-176` |
| 6 | MAX_SATS→12 + loud `syncCount` clamp `N_sat·(1+N_sub)≤12` | `constants.ts:13`, `useBlobSatellites.ts:92-118` |
| 7 | WGSL: satColor[12], sat-loop skip, analytic shadow march, octave LOD | `metaball.wgsl.ts:205-211,241-256`, `uniformBridgeWGPU.ts` (592→912 B) |
| 8 | defaults: orbit 0.17→0.44, sat 0.082→0.10, smoothK 0.05→0.06; delete `eccentricity` | `types.ts:297-320`, `presets.ts:57-64`, `blob.vue:721` |
| 9 | sliders: orbit 0.26–0.53 (floor R+r−k, ceiling (rWall−r)/(1+f)) · sat 0.017–0.19 (8 px floor, 0.85R ceiling) · cohesion 0.00–0.12 · sats 0–8 · subs 0–2 · envelope f · tempo | `blob.vue` (configurator lane executes; DEFT per W-CONFIGURATOR-STD `34681df9`) |

## §8 GATES (born-RED where marked) + OBLIGATIONS

G-SEPARATION-THRESHOLD `a > R+r+smoothK` at shipped default (RED: 0.30<0.380) · G-SAT-HAS-SURFACE painted r>0 (RED: −0.020) · G-CHAOS λ>0.15/s (RED: λ=0, analytic) · G-BOUNDED 0 wall contacts, 8 seeds×60 s **at the SHIPPED 13-body tree and at the excited pole** (the §0 incredulity catch makes this cell mandatory, not assumed) · G-FISSION-CAUSED+LATCHED every separation within 600 ms of one counted impulse or a periapsis crossing (RED: fissionAmp has zero setters) · G-DEPTH-BOUND ≤2, 0% collapse · G-ONE-FIELD · G-SHADOW-ANALYTIC (RED: `:247`) · G-SETTLED-ONE-SIGNAL no `setTimeout` in the sim path (RED: `blobSimulation.ts:105`). π owed (browser-owning seat): π-SEPARATE (`blobstats.py` components ≥2; currently 1 everywhere), π-FISSION (click DELTA), π-CHAOS (same-seed divergence ~10 s), π-PERF (the 3× claim, DPR-2, aurora co-present). Relay: barrel breaks (`blob/index.ts:7,15,16` + `eccentricity`)—marked addendum to the value.js/slides tranche at W-FINAL per the consumer-updates ruling; no blob wave waits. Routed elsewhere: configurator expand/std deltas, D6/D10-D12 surface knobs, chip-rail clip.

## §REJECTED—every loser, with its falsifier

1. **Fable's spine (position-guide tether, its regime C)**—its own instrument: λ=−0.627/s, a contracting attractor onto an authored movie; non-repetition supplied by the same incommensurate-sine idiom shipping today at `satelliteKinematics.ts:75-98`, the read the owner is correcting. The stiffness family provably trades boundedness vs chaos (both arms' C data); D takes both.
2. **Fable's park/resume argument for closed-form guides**—false dilemma: "pure emergence must integrate the gap or pop" presumes an authored timeline to catch up to. D has no reference clock; freeze/resume is exact by construction.
3. **Fable's `fissionSnap` re-role as neck-radius envelope**—the capillary band's `4u(1−u)` shape already produces the pinch-then-snap at 0.106 UV/s, only when caused; an authored envelope on top double-draws the event (no-masking-fallback, KISS).
4. **Fable's kept FSM**—with phases gone its whole job is one slew on `a_eff`; a state machine wrapping one lerp is the indirection BH cured.
5. **Fable's bud-birth fission + periapsis-floored guide catch + `i_fiss` lerp table**—population churn needs spawn/despawn lifecycle and guide allocation; the fixed-population model delivers the identical read with zero lifecycle code, and the binding-energy knee (0.13→0.78 unbound between J 0.003→0.005) IS the threshold, already mood-coupled through kCoh. Its 100%-vs-60% "reliability" edge compares a choreographed guarantee against a causal event inside an envelope that cannot lose a body anyway.
6. **Fable's default a=0.36**—below the 0.380 threshold at shipped smoothK: the colony reads bridged most of the time, and the owner's named defect is "the satellites never properly separate."
7. **Fable's harmonic-leash law for children**—right mechanism, redundant law: ε=r_parent softening already makes the near field harmonic; the leash is emergent from the one force law.
8. **Fable's sleepy dock a_t=0.16 (interior bumps)**—violates the envelope floor law (never bury below surface contact); surface-contact docking delivers PASS3 §2.4's read without a second law.
9. **Opus's regime C**—both arms convict: 25% wall hits, 73.8 pp seed spread, λ contracted.
10. **Pure emergence (B/B0/BW)**—12.5% wall (Opus B), 51 pp seed spread; Fable's wall variant WORSE than unwalled (93 vs 16 escapes, ping-pong). Every added governor converges it toward a hybrid anyway.
11. **Opus's "MAX_SATS 16" option and its 0–8-sats×0–2-subs slider table**—internally inconsistent (up to 24 bodies); replaced by the product clamp ≤12.
12. **Opus's "delete fissionAmp / always-on" branch**—fissionAmp survives as the impulse gain; 0 = the calm contract (Fable's point, adopted).
13. **Opus's "13 bodies, 0% wall hits" summary row**—cherry-picked depth-2; its own D4 depth-1 row reads 9.4% at f 0.42. Cured by shipping f=0.273 and making G-BOUNDED run at the shipped tree.
14. **Fable's B1 LOC correction (GL arm "1,439")**—EXEC-STATE `:186` records 1,040; moot either way, the arm is CUT.
15. **Regime A (extant choreography)**—not a dynamical system; a perturbation is overwritten next frame. It is the defect under adjudication.

# ═══════════ GF-FOURIER APOTHEOSIS ═══════════

All load-bearing claims verified. Composing the adjudication.

---

# GF-FOURIER — TRI-FOLD ADJUDICATION → THE UNIFIED MINT

**Adjudicator modelId: `claude-fable-5`** · HEAD `9c5a7451` · phase TRANCHE DEVELOPMENT · zero repo bytes authored · probes at `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/proc/gf-fourier-adjudicate/verify.mjs` (independent re-derivation, no repo imports).

## §V · VERIFICATION RECEIPTS — nothing adopted on agreement alone

| claim (arm) | check | verdict |
|---|---|---|
| heart/star = 256 source **terms** (Fable, T1 basis) | `fourier-paths.ts:69,85,143-144` — traces at 256 **samples** through `dftFromPoints`; reproduced: heart256 → **8 terms** above a 0.1%·\|c_max\| floor, heart512 → **still 8**, RMS at N=12 = 1.3e−13 | **FALSE — the pivotal Fable error.** Sampling ≠ information; the heart is band-limited (\|k\| ≤ 4 analytically) |
| GF-1 momentum re-pinned per frame (Opus) | `useFourierField.ts:192-196` `if (burst !== 0) { momentum = burst; momentumVel = 0; }` inside the frame path; burst decay multiplicative at `usePointerVelocityField.ts:356-357` | **TRUE** — the spring cannot integrate while burst ≠ 0 |
| GF-2 backward clock 367 ms (Opus) | reproduced: displacement seed 4.0 at (ω 8.0, ζ 0.62) → minRate **−0.215 turns/s**, backward **367 ms** exactly | **TRUE** |
| velocity-seed law `∫m dt = v₀/ω²`, ζ=1 never reverses (Opus) | reproduced: gentle ζ1.0 → 0.468 turns, min momentum **0.0000**; bouncy ζ0.6 → min momentum **−0.2246** (reverses) | **TRUE, and it falsifies `bouncy` under either seeding** |
| cel α 0.16 → invisible (Opus C-2) | `PROPORTION.md:89-91` — 0.16 is the **edge** rung ≈ **1.17:1**; perimeter 0.48 = 3.0:1; "where the fill is alone, 3:1 or it is a lie" (`:112`) | **TRUE** — 0.16 is a hairline-boundary alpha, not a mark alpha |
| `bouncy` lawful for the flick (Fable) | `MOTION-CANON.md:84` — `bouncy` **STRUCK by the canon**: "9.5% above the entire measured corpus… bounce theatre is the motion twin of 'far too trite'" | **FALSE** |
| roster on disk | `springPresets.ts:73-140` — 8 rows; `bouncy (0.6, ζ0.60)` `:89`, `gentle (0.82, ζ1.0)` `:96`; canon six-row target `press/transient/dock/panel/bloom/world`, `world` = renamed `gentle` at (0.48, ζ1.00) `MOTION-CANON.md:75` | both arms' reads accurate |
| shared defect sites | cel black `render.wgsl.ts:299` ✓ · specular `vec3(1.0)` `:291` ✓ · hue sweep `mix(-0.45, 1.15)` `:88` (91.7°, the chartreuse accident) ✓ · `MAX_PHASORS: i32 = 64` `compute.wgsl.ts:18` ✓ · `FOURIER_CEL_GAIN = 0.35` `constants.ts:103` ✓ · freeze seed swap `FourierField.vue:110` ✓ · `harmonics + 4` re-mint `:113` ✓ · `computeFourierFit(spectrum)` **no maxTerms** ✓ · `setupGL` **required** `useGpuSubstrate.ts:51` ✓ | all TRUE |
| the 8-arms-2-terms absurdity (Fable FFN-6) | demo `fourier-field.vue:177-179` — "Summing harmonics" ships `harmonics: 2, epicycleArms: 8` | **TRUE** — the decoupled axis lies on the shipped preset |
| GF-4 fit overflow 9.2% (Opus) | signature confirmed (no `maxTerms`); reproduced on a synthetic elliptic: N=1 **underfills at 0.675**, overflow is **seed/phase-dependent** (my seed peaked 0.94; Opus's demo seed 1.09) | **structurally TRUE**; the overflow magnitude is per-seed, the missing-`maxTerms` defect is universal |

**Verdict on the arms:** the Opus arm wins the spine — its three corrections (C-1, C-2, C-3) all reproduce, and Fable's T1 adoption, cel rung, and flick spring are each independently falsified. The Fable arm wins organs the Opus arm dropped or under-specified: the ribbon's color ramp derivation, the transport contract mechanics, the `interactive` prop (FFN-7 — a settled ledger row Opus silently omitted), the intensity saturation law, the exposed `flick`, and the live-ledger honesty rows. Neither is adopted wholesale.

---

## §0 · IDENTITY (merged — the two statements are one statement)

**The drawing machine, and the only substrate whose motion is a checkable claim.** A chain of rotating arms whose pen lays down a luminous ribbon: the **chain** is the argument (N arms = N terms summed, always), the **ribbon** is the artwork, the **head** is the pen. **Touch means TIME, never space** — every input (grab, flick, keys, transport) drives the one scrubbed scalar `head_t`; the figure never translates under the pointer. Two registers: **ambient** (slides — a closed figure redrawn forever, periodic by construction) and **studio** (the machine legible: chain, term count, residual). `role="slider"` is the identity, not the accommodation.

**WGPU-only.** GL arm (403 + 242 = 645 LOC) dies. **Blocking precondition**: `setupGL` optionality on `createGpuSubstrate` (`useGpuSubstrate.ts:51`, DUAL-ENGINE BAND's file). Fallback if declined: alias-by-import (`GL_MAX_CURVE_SAMPLES := MAX_CURVE_SAMPLES` as an **import identifier, AST-asserted**, + the 4 alphas imported from `../constants`) — a −20 cut, all other rows unaffected. Either way: no WebGPU → loud failure via `rendererStatus`, transport disabled, play state derived from `rendererStatus.phase === "ready" && !paused` — a failed renderer can never claim `N 2/2 playing` over blank paint (the LIVE cell-A catastrophe).

---

## §1 · THE FOUR RULED CORRECTIONS

**R-1 · The N axis (Opus C-1 adopted; Fable T1-adoption overturned).** `MAX_PHASORS` is **deleted from the shader** — the loop bound is `u.ints.w` (`phasorCount`) directly; the four mirrored copies (FFN-9) die with it. `dftFromPoints` output is **floored at mint**: keep terms with `|c_k| ≥ 0.001·|c_max|` (≤0.1% of figure ≈ sub-half-device-pixel on any stage to ~1000 px @ dpr 2). Reproduced: heart 256→8, star ~16, heart512→8. JS-side allocation cap **64, throws** on overflow — an honest loud fail, never a silent clamp (no-masking-fallback; FF-2's disease was silence). Slider max = **term count**; badge = summed count + the honest instrument: `N 6/8 · 99.2% energy · residual 0.4%`.

**R-2 · The chain order + the anchor (Opus adopted + one adjudicator addition).** `orderForChain(components)` — stable sort by `|c_k|` desc (ties: index asc), **with the DC term (index 0) hoisted out as the ANCHOR**: it is the chain's origin offset, not an arm, and it never counts toward N. This makes **N=1 = one circle on every source** (cures GF-3 uniformly — today N=1 on a DFT source paints a stationary centroid point, 0.4 px of a 541 px stage, while the copy at demo `:404` promises an ellipse). Copy rewritten: N=1 circle, N=2 ellipse. Reproduced gains: star reaches 1% RMS at N=5 vs 22 index-ordered (4.4×); never worse. Ordering is deterministic per spectrum → FFN-2's identity stability survives it.

**R-3 · The clock (Opus C-3 adopted; Fable's `bouncy` and its post-canon `panel` both overturned).** The flick is an **impulse, not a displacement**: seed `momentumVel = v₀ = FLICK_TURNS·ω²·burst`, `FLICK_TURNS = 0.5` — **a full-strength flick advances the reconstruction exactly half a period** (`∫m dt = v₀/ω²`, ζ-independent; reproduced 0.468/0.474 vs 0.5, window truncation). Spring row: **ζ = 1.0** — `springPreset("gentle")` on today's disk, `world` (0.48, ζ1.00) when the canon lands, **read from disk at the call site**. ζ=1 is mandatory: reproduced min-momentum 0.0000 at ζ1.0 vs −0.2246 at ζ0.6; any ζ<1 lobes negative past the 0.0625 turns/s ambient base and the clock runs backward (even `panel` ζ0.71's ~4% second lobe crosses it). MOTION-CANON's own fence: "a world that overshoots reads as an earthquake" — and an unbidden time-reversal is exactly that. **Momentum is written once per flick** (on the burst rising edge/pointer release), never re-pinned per frame — GF-1's cure. `SETTLE_OMEGA/SETTLE_ZETA` (`useFourierField.ts:114-115`) die; `rg 'SETTLE_OMEGA|SETTLE_ZETA' src` empty. Register law: the settle/ambient clock **never** reverses; a **grab** may reverse it, because a dragged reversal is control.

**R-4 · The ink (Opus C-2 adopted; Fable's 0.16 fill-rung ceiling overturned).** The cel is a **MARK**, governed by PROPORTION §1.2, not §1.3: ink color = the mark's own palette key darkened **ΔL −0.22** in OKLab, chroma held; `α_ink = α_ribbon(age) × celGain` — it **inherits the fade by construction**; composite band **[1.5:1, 3.0:1]** vs ground in light (above seam, ≤ perimeter). At the shipped, unchanged `FOURIER_CEL_GAIN 0.35` × ribbon peak 0.92 → α 0.322 → ≈2.0:1, mid-band — **the gain was never the defect; the literal black and the separate pass were.** Dark arm: one law, no fork — ΔL(mark, ink) = 0.22 both modes. `celGain` domain `[0, 0.43]` (ceiling derived: α_ink ≤ 0.40 ⇒ ≤3.0:1). The gate asserts the **band**, not the ΔL literal (see §8 — Opus's ±0.01 literal row softened: the law is the band).

---

## §2 · VISUAL IDENTITY (merged: Fable's ramp derivation inside Opus's CPU-resolve architecture)

**L2 (Opus): zero color-space arithmetic in the shader.** `chainColorLin`/`samplePaletteLin` (full OKLab round trips per fragment, `render.wgsl.ts:70-92` — GF-7) die. All color resolves CPU-side at palette-resolve time: a **16-entry linear-sRGB ramp LUT**, a per-arm color buffer, one ink lane. `OETF_WGSL`/`OKLCH_MATRICES_WGSL` imports leave the draw module.

**The ramp is Fable's** (the Opus arm never specified its stops): 3 stops derived at mount from `--viz-fourier` per arm (light `color-radius.css:272` oklch(.579 .201 30.4); dark `dark-arm.css:138` oklch(.693 .151 28.1)), re-resolved on the dark flip via the existing `resolveColorString` seam: head `(L, max(C, 0.19), h)` → mid `(L+0.10, 0.12, h+12°)` → tail `(L+0.20, C floor **0.10**, h+24°)`, baked into the 16-entry LUT in OKLab, uploaded linear-sRGB. **Tail chroma floor 0.10** — the ribbon never decays into the room's neutral band (the blob disease, C 0.0845/Δh 10.6°, EXEC-STATE). Chroma is affordable in proportion to area: a 5 px line at C 0.20 reads as ink; full-bleed it would be a rash. `WARM_IDENTITY_PALETTE` (drifted light-only literal, no dark arm) struck.

**Head specular**: palette stop 0 lifted toward L 0.95, chroma ×0.4 — never `vec3(1.0)` (`:291` dies). **One achromatic-literal ban** covers both painted extremes, one gate.

**The scaffold** (chain): two rainbow arms, one switch —
- `rainbowChain: false` → Fable's in-family sweep, hue ±0.35 rad around identity, palette L held;
- `rainbowChain: true` (studio default) → **Opus's frequency-keyed ramp**: each arm's hue keyed on its **signed frequency index** (negative one way from the anchor hue, positive the other) — the rainbow **is** the frequency axis, drawn. Per-arm L resolved per mode to clear **3.0:1** vs that mode's ground (cures FF-6's 1.95:1 dark ring); C pinned at the identity's. The **chartreuse-band gate is replaced** (it fenced the *accidental* 91.7° sweep at `:88`): the new gate is ramp-membership + per-arm 3:1.

**Two stroke rungs, one ratio (L1, both arms agree)**: MARK `halfW`, SCAFFOLD `0.4·halfW`, ratio 2.50× ≥ the 1.5× rung law (`PROPORTION.md:43`). The shipped six half-widths (steps 1.13–1.43×, all sub-rung) die.

**The lap pulse (Opus C-4, adopted)**: the existing headGlow specular re-phased so its peak lands at `fract(head_t) = 0` — one smoothstep, zero uniforms, zero new alpha, no free parameter. The 16 s ambient heartbeat *is* the closure proof. (Fable's arm proposed no breath addition; the old ±10% glow-breath stays rejected — unlawed gain.)

**Intensity (Fable's FFN-1 cure adopted over Opus's truncation)**: domain `[0, 2]`; every composite α is `min(x, 1)` (structural clamp — Opus's guarantee retained); loudness above the knee (1/0.92 ≈ 1.09) buys **under-glow radius** (`glowHalf ×= 1 + 0.5·max(0, intensity−1)`), never α > 1. The shipped `intensity 1.1` preset's negative destination factor (0.92·1.1 = 1.012) becomes unrepresentable. Opus's `[0,1]` re-domain rejected: it amputates a lawful expressive register (technicolor/breath edicts) where a stated saturation law suffices.

---

## §3 · THE N AXIS, STABLE AND HONEST (merged)

1. **Mint once, truncate forever** (FFN-2): elliptic spectrum minted per `(seed, harmonicScale)` at a **fixed 16-term budget** (2 + 14); `FourierField.vue:113`'s `harmonics + 4` coupling dies. DFT sources minted once per shape with the R-1 floor. An N edit changes truncation only — same identity, no re-upload, no refit snap.
2. **`liveSeed = props.seed || "fourier-field"`** — freeze-independent (FFN-3): freeze freezes the clock at `frozenT = 0.34`, never the figure. The double-mix (`hashString(liveSeed + props.seed)`, `:111`) dies with it.
3. **`computeFourierFit(spectrum, maxTerms)`** — the fit tracks N (GF-4: N=1 underfill 0.675 reproduced; overflow seed-dependent), unions the curve bbox with chain-tip rings when the scaffold is on (centres the scene), uses `partialSumAt` not 720 throwaway `positionsAt` arrays (FF-17), caches on `(spectrum, N)`. Rescale rides the ζ=1.0 row — nothing snaps without a settle; with truncation-only N, the spring fires only on genuine source/seed swaps plus N edits of the fit.
4. **`source` throws on an unknown key; empty palette throws at config time** (FF-16) — never in the frame loop.

---

## §4 · INTERACTION (merged: Opus's grab + Fable's transport contract + Fable's lean)

**The grab (Opus, adopted — studio register, press).** Press: project the pointer to model space, find `t*` minimizing `|partialSumAt(sp, t*) − p|` (64-tap coarse scan + 3 golden-section refinements ≈ 70 evaluations/frame, CPU-side, no GPU readback), spring `head_t` toward `t*` the short way round the wrap on the ζ=1.0 row. You take the pen. Release → flick, velocity-seeded per R-3. The raw screen-velocity clock scrub (`SCRUB_GAIN 0.15`) **dies** — screen velocity has no relationship to the curve; the grab, the keys, and the transport are one quantity with one setter.

**The lean (Fable, adopted — both registers, hover).** The bounded 0.15 centroid lean survives as the engagement register for pointer-over-without-press — the only life an ambient full-bleed mount (pointer-events: none, route broadcaster) can have. The mapping moves **module-private** into `useFourierField.ts`; `fourierLeanMapping` + `FOURIER_*` gains + 3 `FourierLean*` types leave `src/index.ts:233,238-239,245-247` and `public-surface.spec.ts:163-164,207`; `phaseRateMul`/`FOURIER_BIAS_GAIN` deleted (FF-9). Opus's total strike of the lean rejected: it leaves ambient decor dead to the pointer, against breath-of-life.

**Keyboard/AT (both arms agree — terminal 3.1 verbatim, interactive register only).** Host `role="slider"` exact, `tabindex="0"`, `aria-label="Fourier reconstruction phase"`, four `aria-value*`; `aria-valuetext` speaks the demonstration: *"62% of the period · 6 of 8 terms · residual 0.4%"*. Keys ←/→ ±1/64 · ↑/↓ ±1/8 · Home/End 0/0.999 · Space toggles pause; quanta are interaction law, decoupled from any ceiling. Keyboard calls `setHeadT` directly, never the spring. PRM: keys still move `headT` + repaint one static frame. **Ambient: role null, tabindex null, canvas aria-hidden** — no tab stop per slide.

**The transport contract (Fable, adopted — Opus under-specified it).** `headT` exposed as reactive readonly ref updated in `onFrame` (the scrubber's `aria-valuenow` finally tracks a running clock). `setHeadT(t)`: normalizes, seats the clock; **if manually paused** (local `manuallyPaused` bool), paints one frame via the substrate's internal `renderAt` and stays parked. `flick(velocityTurnsPerSec)`: seeds the momentum spring — **exposed** (the transport organ needs it on scrubber release; Opus's omission restored). Demo choreography: dragstart → pause; drag → setHeadT; release → flick + resume-if-was-playing.

**`interactive?: boolean` top-level prop (Fable, adopted — FFN-7 is settled ledger content the Opus arm dropped).** Both registers, default `true`; slides opts out on decor.

---

## §5 · MOTION TABLE (one roster, no literals)

| moment | row today (disk) | row post-canon | law |
|---|---|---|---|
| flick settle | `springPreset("gentle")` (0.82, ζ1.0) | `world` (0.48, ζ1.00) | velocity-seeded, `v₀ = 0.5·ω²·burst` → exactly half a lap per full flick; ζ=1 ⇒ monotone momentum, clock never reverses |
| grab → head | same row | same | an overshooting grab snaps past your finger |
| fit rescale | same row | same | a rescaling frame that overshoots is an earthquake |
| ambient | the 16 s carve, unchanged | — | BREATH met by closure + the lap pulse |
| keyboard | none — direct | — | — |
| freeze/PRM | one deterministic frame at `frozenT` | — | — |

`rg 'SETTLE_OMEGA|SETTLE_ZETA' src` → empty; every call site resolves `springPreset()` by name from disk.

---

## §6 · ARCHITECTURE (Opus's spine adopted; Fable's offscreen rope pass rejected)

```
src/components/fourier-field/
  FourierField.vue   index.ts   constants.ts   math.ts
  useFourierField.ts                ← hoisted; the one-file composables/ dir dies
  renderer/wgpu.ts                  ← was composables/fourierFieldWGPUSetup.ts
  renderer/uniforms.ts              ← was composables/uniformBridgeWGPU.ts
  shaders/{compute.wgsl.ts, draw.wgsl.ts, layers.ts}
  README.md                         ← prop table (a hand-copy of defineProps) + history struck
tests/components/fourier-field/FourierField.smoke.test.ts
DELETED: composables/fourierFieldGLSetup.ts (403) · shaders/fourier-field.glsl.ts (242)
```

**From 5 pipelines / 2 blend modes / 779 instances / a 4-way-mirrored fixed-trip loop → 2 pipelines / 1 blend / ~140–330 instances / a dynamic bound.**

**Compute** (~92 LOC): loop bound `u.ints.w`; `curveSamples[i] = (x, y, age, _)`; per-segment tangent is `b − a` in the vertex shader — the global `celOffset()` head-tangent hack (`render.wgsl.ts:129-132`, FF-1's source) is deleted outright; `chainTips[k] = (x, y, radius_k, armIndex_k)`.

**Draw** (~150 LOC, one `override MARK: i32`, **one blend: premultiplied per-channel MAX**):
- `MARK=1`: ribbon capsule + **in-fragment ink** (`dInk = segDist(p, a+off, b+off)`, `off = −T_seg·halfW·inkFrac`, composited analytically ink-under-core, one premultiplied return) + **head as instance 0** (bbox `halfW·4.5·(1+squashGain)` — FF-15 derived; squash-and-stretch + palette specular kept verbatim from `render.wgsl.ts:101-125`, recolored per §2). Instances = `segCount`.
- `MARK=0`: ring + arm + joint dot. Instances = `armCount`.
- MAX is closed over premultiplied colors (`rgb ≤ α` preserved) → self-overlap **unions**, the over-composite class and the density-α coupling die by construction. The in-fragment ink cannot out-ink its mark (multiplied by it), cannot fail to fade (it *is* the fade), cannot stack (one fragment, one evaluation). The `arg2` triple-purpose varying (FFN-12) dies — named varyings only.
- Fable's 4-pipeline offscreen-rope-texture variant **rejected**: MAX on one target already provides the union; the extra texture + composite pipeline buys only ribbon-occludes-chain layering, unmeasured and unneeded at scaffold weight and 3:1.

**Adaptive instances** (`layers.ts` ~48 LOC, Opus adopted; Fable's fixed-384 decline overturned by measurement — 11.5 capsules/px at arc 0.15, 1.2/px faceting at arc 1.0):
```
segCount = clamp(round(arcPx / (2·markHalfW)), 32, 1024)   // one capsule per stroke diameter
armCount = plan count ≡ N, paint-culled per the arm law below
```
`MAX_CURVE_SAMPLES` 384 → 1024 (16 KB, chord deviation 0.63 px at a star tip — under the AA feather).

**The arm law (merged ruling — Fable FFN-6 spine, Opus GF-6 organ).** `epicycleArms` is **deleted as an axis** (the shipped `harmonics: 2, epicycleArms: 8` preset lies on screen — confirmed demo `:177-179`); `showChain: boolean`; **plan arm count ≡ N, always**. The renderer **paint-culls** primitives smaller than their own stroke (ring radius < scaffold halfW — they cannot exist in paint) but the terminal joint dot is **always drawn at the true tip** (partial sum through N), so the chain terminates at the pen regardless of culling — mechanical honesty and paint honesty simultaneously. Badge reports it: `9 of 12 arms drawn · 3 sub-stroke`. Opus's `Arms 1..armsDrawable` slider **rejected** — it reintroduces the decoupled axis under a new name.

**Zero-mirror discipline (Fable §5.4, adopted for the survivors)**: every shared constant (`TANGENT_EPS`, `RIBBON_TAIL_FRAC`, `PEAK_ALPHA`, `HEAD_GLOW_ALPHA`, `TRAIL_FADE_EXP`, `TRAIL_FLOOR`, `RIBBON_UNDERGLOW_{SCALE,ALPHA}`) is declared once in `constants.ts` and interpolated into the WGSL template literals (`${…}` — noting the blob's splice hazard inside `//` comments). `MAX_PHASORS` itself needs no mirror because it no longer exists in WGSL (R-1).

**Uniforms** (Fable's lane layout, Opus's color plumbing):
```
ComputeUniforms: c0 (headT, trailArc, 0, 0) · ints (harmonicN, segCount, phasorCount, 0)
RenderUniforms:  r0 (centerX, centerY, scale, aspect)
                 r1 (halfW_model, peakAlpha, headGlowAlpha, fadeExp)
                 r2 (trailFloor, intensity, rainbow, celGain)
                 r3 (squashGain, edgeMargin, glowBoost, 0)
                 ints (armCount, segCount, 0, 0)
storage: rampLUT array<vec4f,16> · armColors[N] · inkColor vec4f
```
Dead lanes (`showEpicycles`, render-side `sampleCount` — FFN-5) dropped. `resize(s: BackingSize)` stores `{cssW, cssH, dpr}`; the frame reads the store; the `resolveBudgetDpr` import dies at all 3 sites — **the fourier→aurora DAG edge severed** (DAG-RULINGS:186 booked owner).

---

## §7 · CONFIGURATOR + STORY (Opus's discharge of the owner's ask, Fable's presets folded)

Routed machinery (fourier = **first consumer, not owner** — suite-wide via the configurator wave): **(a)** `ConfiguratorNote` `{kind: "boon"|"bane"|"range", text}` on `ConfiguratorRow` — rendered at type rung −3, gap 4, 1 px inline-start rule at seam α 0.08; ink range→muted, boon→`--foreground` w600, bane→`--destructive`; zero new colors/spacings. The ledger becomes visible from inside the studio — the owner's ask taken literally. **(b)** `expandable` → stage promotes to `position: fixed; inset: 0`, aside as overlay drawer, on `springPreset("bloom")` when the canon lands (`gentle` today). Honest arithmetic: expand buys +3 star arms from 541 px→1200 px and nothing on the heart; the stronger justification is the measured aside (37.3% of controls visible; 2 of 5 preset chips clipped past the configurator edge). **(c)** a `#transport` slot (pause · scrubber bound to live `headT` · speed), spec'd once, driven by `{paused, headT, setHeadT, flick, speed}` — FFN-4 can never recur per-story (G12). Fable's separate `StageTransport` demo organ folds into this slot — same idea, the slot version discharges it suite-wide.

**Controls — 9 rows, every domain lawful (L3: a slider's minimum is where its term first changes paint):**

| # | control | domain + law | note |
|---|---|---|---|
| 1 | Source | labeled items (FFN-10, via W-LABELED-FIELD) | range: closed figures return by construction; traces are band-limited by their own DFT |
| 2 | Terms N | `[1, termCount]` (post-floor, anchor excluded) | boon: amplitude-ordered — each term the largest remaining correction · badge: summed N, energy %, residual %, arms culled |
| 3 | Show chain | switch (arms ≡ N) | boon: the scaffold is the argument |
| 4 | Rainbow chain | switch | range: the ramp is the frequency axis, resolved per mode |
| 5 | Trail arc | `[1/8, 1]` of the period | range: instances track the arc — one capsule per stroke diameter |
| 6 | Trail width | `[3.62, 10]` px — floor = existence threshold (FF-14, no dead travel) | — |
| 7 | Intensity | `[0, 2]`, the 1.09 α-knee stated; excess buys glow radius | — |
| 8 | Ink (`celGain`) | `[0, 0.43]` — derived: α_ink ≤ 0.40 ⇒ ≤3.0:1 | range: ink stays within [1.5, 3.0]:1 of ground |
| 9 | Squash (`squashGain`) | `[0, 1.5]` — stretch ≤ 2.5×, volume-preserving bound | **G1: never had a setter anywhere** |
| + | Hue (labeled `--viz-*`) · Speed `[0.25, 2]` moved into the column · Harmonic scale `[0.05, 0.4]` **shown only for `elliptic`** | | |

**Struck**: the free-standing Harmonic-scale row (inert on 8 of 9 sources), the Arms row, the "Summing harmonics" preset (built on the FFN-2/FFN-6 defects).

**Presets (Fable's five, corrected by R-1/R-2)**: *Drawing machine* (pentafoil, chain on, honest N 2/2) · *One circle* (N=1 — a compass, now true on every source) · *Watch it sum* (heart trace, full post-floor terms ≈ 8-9, the N-ride hero with the live residual readout) · *Ambient ellipse* (the slides register) · *Ink & bounce* (celGain 0.43, squashGain 1.2).

**Story (Opus's five sections adopted)**: 1. The mark (full-bleed ambient, nothing else). 2. The machine (chain revealed, frequency-keyed arms, live badge — "a handful of circles carry 99% of a heart"). 3. The axis (N slider under a live residual readout). 4. **The transform** — a spectrum strip under the stage: one DOM bar per term, height `|c_k|`, amplitude-ordered, the N cursor a draggable vertical line, bar-touch highlights that arm in the chain. No third GL context. 5. The consumer register (the ambient full-bleed + the freeze frame, shown as itself). Copy states checkable facts; blurb rewritten plain (W-STORY-COPY-CANON). Route fixes → demo wave: drop the under-studio full-page aurora (one GL context, `manifest.ts:475-479` made true), preset-strip clip cured via the FadingScroll treatment inside the configurator box.

---

## §8 · PUBLIC SURFACE + THE SLIDES RELAY (merged)

**Props**: `config · spectrum · getPalette · color · seed · freeze · interactive (NEW)`. Deleted: `colorResolver` (declared `FourierField.vue:51`, never read — `resolveColorString` at `:128-140` uses `resolveTokenColor`; removal invisible in paint). **Emits**: `rendererStatus`. **Expose**: `backend · pause · resume · wake · setHeadT · headT (reactive, NEW) · flick (NEW) · rendererStatus`; `renderAt` internal. **`index.ts`** (~30 LOC): `FourierField`, `FourierFieldConfig`, `DEFAULT_FOURIER_CONFIG`, math leaf `{dftFromPoints, partialSumAt, positionsAt, comp, orderForChain (NEW), makeEllipticSpectrum, makeHarmonicFigure, FOURIER_FIGURES, BasisComponent}`. Deleted: `FourierFieldProps · useFourierField · FourierFieldHandle · UseFourierFieldOptions · WARM_IDENTITY_PALETTE · MAX_CURVE_SAMPLES · MAX_PHASORS · EllipticSpectrumOptions · HarmonicTerm · FOURIER_FIGURE_KEYS` (an `Object.keys` alias). Root barrel: the `fourierLean*` rows leave `src/index.ts:233,238-239,245-247` + `public-surface.spec.ts:163-164,207`. Subpaths `./fourier-field` and `./fourier-math` survive. `demo/chassis/landing/vizPreviewStill.ts:161-180` swaps its hand-written 3-term epicycle to `positionsAt` (T9).

**Config type**:
```ts
export interface FourierFieldConfig {
  source: "elliptic" | keyof typeof FOURIER_FIGURES;  // throws on unknown key
  harmonics: number;         // 1..termCount — truncation ONLY, anchor excluded
  showChain: boolean;        // epicycleArms DELETED; plan arms ≡ N, paint-culled sub-stroke
  rainbowChain: boolean;     // false: in-family ±0.35 sweep · true: frequency-keyed ramp
  trailArc: number;          // 1/8..1
  trailWidth: number;        // 3.62..10 CSS px
  intensity: number;         // 0..2, α-saturating at the 1.09 knee
  harmonicScale: number;     // elliptic generator only
  speed: number;             // 0.25..2
  palette: OklchStop[];      // empty throws at config time
  respectReducedMotion: boolean;
  interactive: boolean;
  squashGain: number;        // 0..1.5
  celGain: number;           // 0..0.43 (α_ink ≤ 0.40 ⇒ ≤3:1)
}
```

**The slides relay addendum** (place verbatim in slides' tranche at publish; consumer of record `slides/src/decks/feedback-coder/slides/Slide01.vue:10,35` + `Slide05.vue:23`, banked verified 3×, not re-read this seat):

| # | edit | consequence |
|---|---|---|
| 1 | drop `:color-resolver` | none — never read at any published version |
| 2 | drop `variant` | none — never a prop; a stale attr on the host div |
| 3 | `color` / `seed` unchanged | none |
| 4 | `freeze` unchanged in shape, **changed in behavior** — freezes the clock only, not the figure | **the one pixel-affecting row**: the frozen frame becomes the live seed's own curve, not the alternate `"fourier-field/frozen"` spectrum; **re-capture and approve S1/S5** (π cell runs in slides' tranche) |
| 5 | add `:interactive="false"` on pure-decor mounts (new prop) | recommended — drops pointer physics on full-bleed backgrounds; ambient mints no tab stop either way |
| 6 | version pin bump | from 3.13.0 |

---

## §9 · LOC ARITHMETIC

Baseline 2,950 (2,885 src + 65 README; code 1,926 · comments 26.2%). After: GL arm −645 · draw module −77 (3 of 5 branches, `celOffset`, both color functions, 2 color imports; LUT + ink + head-instance-0 in) · `ribbon.ts`→`layers.ts` −55 · wgpu −69 (5→2 pipelines, one blend, adaptive) · index −23 · README −35 · constants −35 · useFourierField −7 net (lean in-module +25, scrub-hold +15, grab +20; springs/GL wiring/renderAt/lean-surface out) · compute −7 · uniforms +6 (N-aware fit, CPU color resolve) · math +27 (`orderForChain`, floor, `nearestT`, energy) · Vue +35 (a11y arm, `interactive`; colorResolver/freeze-seed/N-mint out). **Total ≈ 2,065 (−30%), code ≈ −33%.** Comment share holds ≈26% — the cull is of *false* comments only (4 parity claims, the `constants.ts:22-23` ceiling lie, `ribbon.ts:19-22` mirror claim, ~20 wave-ids, retirement narration).

---

## §10 · GATES — six, born-RED, mutation named (abrogation-compliant)

| gate | assertion | born-RED at HEAD |
|---|---|---|
| **G-FF-INK** (π + unit) | no painted pixel achromatic-literal-derived: darkest marked pixel C ≥ 0.04; brightest marked pixel C ≥ 0.02; tail-ribbon C ≥ 0.08; ink composite ∈ **[1.5, 3.0]:1** vs light ground at shipped gain; every scaffold arm ≥ 3.0:1 vs its own ground in both modes; every arm hue a member of the declared ramp set; unit row: for every `(intensity, trailWidth, celGain)` on shipped domains, composite α ∈ [0,1] and premultiplied rgb ≤ α | cel `vec4(0,0,0,m)` `:299` · specular `vec3(1.0)` `:291` · dark chain 1.95:1 · `0.92·1.1 = 1.012` at the shipped preset |
| **G-FF-N** (unit) | slider max = post-floor termCount per source; badge = summed count; `orderForChain` \|c\|-monotone with DC hoisted as anchor; mint drops terms < 0.001·\|c_max\|; `computeFourierFit(sp, n)` strictly different scale for n=1 vs full; **spectrum identity invariant under any `harmonics` edit AND under `freeze` toggle** | no `maxTerms` param · `:110` freeze seed swap · `:113` per-N re-mint · index order · badge 160-vs-64 class |
| **G-FF-CLOCK** (unit sim) | from any flick impulse over 12 s: settle-path `rate < 0` never occurs; `∫momentum dt = 0.5·burst ± 2%`; momentum written **once** per flick, not per frame | GF-1 (600/600 re-pins) · GF-2 (367 ms backward, reproduced) |
| **G-FF-A11Y** (DOM) | interactive mount: `role="slider"` exact, `tabindex="0"`, four `aria-value*`, ArrowRight moves valuenow 1/64 ±1e-6, Home→0, Space toggles pause, valuetext non-empty; **ambient mount: role AND tabindex null**, canvas aria-hidden | zero hits for role/tabindex/keydown at HEAD |
| **G-FF-SCRUB** (e2e) | paused + `setHeadT(0.7)` → canvas hash changes within 1 frame; playing → exposed `headT` advances and the transport's valuenow tracks within 0.02; `rendererStatus.phase !== "ready"` → transport disabled, no "playing" badge | wake defeated by manual suspend · headT unexposed · LIVE cell-A lying badge |
| **G-FF-ONE-LAW** (source) | `rg 'fourierFieldGLSetup|fourier-field\.glsl|GL_MAX_|parity|pixel-identical|SETTLE_OMEGA|SETTLE_ZETA|MAX_PHASORS|epicycleArms' src` empty; no `#version 300 es` in dist; exactly one `GPUBlendState` literal + two `createRenderPipeline` calls in `renderer/wgpu.ts`; draw module imports no color-space WGSL; the 8 shared constants appear in WGSL only as `${}` interpolations (fallback path: `GL_MAX_CURVE_SAMPLES` an import identifier, AST-asserted) | all present at HEAD |

Struck as unwritable: the shipped smoke test (asserts only canvas-mounts, passes `colorResolver`), any renders-a-canvas gate, parity gates on a deleted arm, value-equality mirror gates, the chartreuse hue-band gate (fenced an accident; replaced above), Opus's ΔL 0.22±0.01 literal row (the law is the band, not the number).

---

## §11 · ROUTES / COLLISIONS

- `useGpuSubstrate.ts:51` setupGL optionality — **DUAL-ENGINE BAND, blocking precondition**; fallback specified §0.
- `ConfiguratorNote` / `expandable` / `#transport` slot — configurator wave; fourier first consumer.
- `LabeledSelect` label-items — W-LABELED-FIELD.
- `demo/stories/substrates/fourier-field.vue:363` scrubber Slider swap — W-TIMELINE; coordinate, don't co-edit.
- `resolveBudgetDpr` edge cut — DAG-RULINGS:186 owner; this design consumes `BackingSize.dpr` locally.
- Route one-GL + preset-strip clip — demo wave.
- `Constellation.vue:100-102` `role="button"` no-keydown — constellation row (same disease, different cure — its quantity is not a scalar).
- Slides — §8 relay, marked addendum in slides' tranche; π re-capture there.
- Phantom `tests/components/custom/**` dirs — tranche test-tree move. CT-1 subpath install — packaging wave.

---

## §REJECTED — every loser, with its falsifier

| killed | arm | falsifier |
|---|---|---|
| `MAX_PHASORS` 64→256, ceiling law "max shipped source term count" | Fable | heart/star are 256-**sample**; reproduced: 8 terms above a 0.1% floor at 256 AND 512 samples, RMS(N=12) = 1.3e−13. Array length ≠ information. The lawful cure deletes the constant |
| the 256-term "Watch it sum" preset | Fable | ~247 of its terms are numerically zero; the preset re-lands the badge lie FF-2 named |
| slider max `= min(spectrum.length, MAX_PHASORS)` | Fable | inherits the sample/term conflation; max = post-floor termCount |
| keep `MAX_PHASORS = 64` + honest clamp | Opus (self-rejected) | fixed-trip loop mirrored 4 ways; a dynamic bound costs nothing and ends the drift class |
| flick settle on `bouncy` (0.6, ζ0.60) | Fable | struck by MOTION-CANON `:84` itself; reproduced min momentum −0.2246 → the clock reverses |
| flick's post-canon row `panel` (ζ0.71) | Fable | any ζ<1 lobes negative; `panel`'s ~4% second lobe exceeds the 0.0625 turns/s ambient base → brief reversal. Only monotone rows are lawful for a clock |
| displacement-seeded momentum (shipped) + a `max(rate,0)` clamp cure | both named it | reproduced 367 ms backward; the clamp is a masking fallback over a wrong state variable |
| cel α ceiling 0.16 (fill rung) | Fable | PROPORTION `:89-91`: 0.16 is the *edge* ink rung ≈ 1.17:1 — an invisible cel; a cel is a MARK (§1.2), band [1.5, 3.0]:1 |
| cel ΔL −0.20 "tuned under the gate" / −0.28 mint | Fable / prior | −0.22 is *derived* — it lands the composite mid-band at the already-shipped gain; tuning defers what a law settles |
| 4-pipeline offscreen rope texture + composite pass | Fable | premultiplied MAX on one target already unions self-overlap; the texture + pipeline + pass buys an unmeasured layering preference at real cost |
| fixed 384-sample trail ("age math trivial") | Fable | measured 11.5 capsules/px at arc 0.15, 1.2/px faceting at arc 1.0; `age = i/segCount` is equally trivial dynamic |
| `Arms 1..armsDrawable` control | Opus | reintroduces the decoupled axis FFN-6 killed; the shipped `harmonics: 2, epicycleArms: 8` preset (demo `:177-179`, confirmed) is the absurdity on screen. Paint-culling is render truth, not a user axis |
| intensity re-domain to [0,1] | Opus | amputates a lawful register; the α-saturation law (min(x,1) + excess→glow radius) keeps [0,2] expressive with zero over-drive — clamp retained structurally |
| omit `interactive` prop | Opus | FFN-7 is settled ledger content; slides needs the decor opt-out |
| omit `flick` from expose | Opus | the `#transport` slot's release choreography requires it |
| ΔL 0.22±0.01 as a gate literal | Opus | gates assert laws, not numbers; the band [1.5,3.0]:1 is the law |
| screen-velocity clock scrub as primary coupling | Fable (kept it) | screen velocity has no relationship to the curve; the grab is the one gesture whose meaning is the substrate's subject — and it unifies three inputs into one setter |
| total strike of the centroid lean | Opus | ambient full-bleed mounts never press; the lean is their only pointer life (breath-of-life edict). Survives module-private, off the barrel |
| chartreuse-hue-band gate | prior (Fable silent) | it fenced the accidental 91.7° sweep (`:88`); a closed frequency-keyed 3:1-checked ramp is the cure — replaced by ramp-membership rows |
| ±10% ambient glow-breath | prior Fable | unlawed gain; the lap pulse has no amplitude to mint — a phase on an existing ceiling |
| `FOURIER_FIGURE_KEYS` export | Fable kept | an `Object.keys` one-liner alias; consumers derive it |
| 13-gate roster / per-defect gates | Fable | gates-abrogation mandate; folded to 6 with every assertion preserved as a row |
| `StageTransport` as a separate demo organ | Fable | same machinery as the `#transport` slot; the slot discharges G12 suite-wide with one spec |
| keep `colorResolver` for the consumer | — | consumer-updates ruling; never read at any version — removal invisible in paint |
| comment cull as a cost lever | — | 26.2% share, under the 39.4% src mean; only *false* comments leave |

**COUNTS.** 2 arms adjudicated, neither wholesale · 3 Opus corrections adopted on reproduction (C-1/C-2/C-3), 1 Fable T-adoption overturned by measurement · 2 CRIT defects (GF-1/GF-2) confirmed on disk + reproduced · 1 adjudicator addition (DC-as-anchor — N=1 a circle on every source) · 5 pipelines→2 · 2 blends→1 · 779 instances→~140-330 · 4 `MAX_PHASORS` copies→0 (deleted, not widened) · 6 stroke rungs→2 at 2.50× · 6 gates born-RED · surface: 7 props (1 new, 1 deleted), +2 expose, 10 barrel names struck, both subpaths survive · slides relay 6 rows, 1 requiring re-capture · ≈2,950→≈2,065 LOC (−30%) · zero repo bytes authored.

# ═══════════ CONFIG-EXPRESS APOTHEOSIS ═══════════

All spot-checks are in. Every load-bearing claim has been reproduced against disk. The adjudication follows.

---

**modelId: `claude-fable-5`** · TRI-FOLD ADJUDICATOR — CONFIG-EXPRESS · HEAD `9c5a7451` · zero repo bytes authored

# CONFIGURATOR EXPRESS — ADJUDICATED DESIGN

## §0 · VERDICT

**The Opus arm supplies the spine.** Its nine findings were spot-checked and every one reproduced on disk (§0.1); its F09 reading is **pixel-confirmed** (I opened `docs/tranches/BJ/feedback/F09-overround-cramped-configurator.png`: it is aurora's Derive-from-color panel — the 4 stadium-radius harmony lozenges in a wrapped 2×2 inside the nested sub-plate); its landing-surface ruling (LabeledField, not ConfiguratorRow) is arithmetic fact, not taste. The Fable arm mis-cites F09 twice, lands its expressive organs on 15% of the surface, and rebuilds a shipped component — but contributes five organs Opus lacks, all adopted (§0.2). **One defect neither arm caught survives into the cure list as Z1** (§0.3).

### 0.1 · Incredulity ledger — shared and contested claims, reproduced

| claim | verdict | evidence |
|---|---|---|
| `dock` = 0.35, ζ 0.82; per-consumer response override blessed; `bloom` absent | **TRUE ×3** | `src/composables/motion/spring/springPresets.ts:109-113` (0.35/0.82 + "the table never forks" comment); `grep bloom` → 0 hits. Memory's 0.30 is stale, as both arms warned |
| X1: ExpandableContainer built, zero consumers | **TRUE** | `src/components/expandable-container/ExpandableContainer.vue:1-211` — `Teleport to="body" :disabled="!open"`, FocusScope trapped, `role=dialog`, body-overflow lock, Esc via `registerShortcut`, focus restore, Maximize2/Minimize2. Only external reference: its own demo story |
| X2: Slider has no value readout / `aria-valuetext` | **TRUE** | grep → 0; `Slider.vue:230-233` forwards label/labelledby/describedby/errormessage only |
| X3: ConfiguratorRow 19–23 mounts vs `Labeled*` 104 | **TRUE** | measured this seat: **19** vs **104**; blob 16, fourier 10, aurora 42 — all `Labeled*` |
| X4: description = label rung (`--type-small` both) | **TRUE** | `LabeledField.vue:94-99`; corroborates the live ledger's 62.5% description mass |
| X5: tile CSS shipped, markup only in 2 demo hand-rolls; library default = text chip | **TRUE** | `configurator/styles.css:279-346` vs `Configurator.vue:263-308`; hand-rolls at `aurora/PresetPickerRow.vue:63,79`, `containers/configurator.vue:204,212` |
| X6: doc 280/360 vs CSS 300/400 | **TRUE** | `Configurator.vue` asideWidth doc vs `styles.css:206-213` |
| X7: gallery + footer `px-3` vs the 20px anchor | **TRUE** | `Configurator.vue:265,376` vs `styles.css:23-25` |
| X8: density tokens off-series (5/6/12, 6/8/14) | **TRUE** | `sizing-config.css:19-25`; preset-row-weight 10px at `:59` |
| X9 / F09 site: harmony lozenges `h-8 flex-1 basis-[calc(50%-0.25rem)]` in `flex-wrap`, inside `rounded-panel … p-2.5` sub-plate | **TRUE + PIXEL-CONFIRMED** | `AuroraColorSection.vue:163,184-196`; the F09 PNG viewed |
| Fable 1a: per-story height overrides squander the 86vh default | **TRUE** | `blob.vue:480` `h-[min(70vh,560px)]`; `fourier-field.vue:322` `h-[min(72vh,600px)]`; `VizStudio.vue:54` default `h-[min(86vh,880px)]`. **Opus missed this entirely** ("the frame is not the cramp" — both are) |
| PROPORTION grounding: C5 strikes 12; K4 (`--radius-button`, 1 consumer, EC:30); K9 scrim; A2/A4/A5/A6/A9/A11; §4 room 24 = "showcase frame", r−pad=4 | **TRUE** | `PROPORTION.md:142,166,171,205-214,233` |
| MOTION-CANON: `bloom (0.42, 0.90)` minted "room-sized growth"; A01 birth 0.78→1.0, origin never hidden; §3(d) world scrim NO RUNG | **TRUE** | `MOTION-CANON.md:35,49,72,161-165,208` |
| Fable's "×1.5 shared-label migration" constant | **NOT FOUND** | no such constant in MOTION-CANON; `:208` gives geometry only |
| blob "Calm" aria chain broken on disk | **NOT ATTRIBUTABLE** | `LabeledSlider.vue:35` `:control-labelable="false"` → `LabeledField.vue:44` omits `for` → labelledby → `Slider.vue:231` thumb. Chain reads correct; Opus's reproduce-first stance adopted |

### 0.2 · What each arm won

**Opus (spine):** the five laws L1–L5 · LabeledField landing surface · ExpandableContainer adoption · description-into-detail-region · tile promotion + `swatch` + PresetPickerRow deletion · radius ladder (root 24 at rest) · token retune · tier/show-all curation · gates 1–4 · the OWED discipline on "Calm" and the Teleport cell.
**Fable (organs):** kill the per-story height overrides · `inertReason` (A4 recipe) · the `dock`+response-0.42 interim for the unminted `bloom` · expanded-state forces gallery `top` (vs Opus's costly global flip) · scrim = background-only (which exposes Z1) · the FLIP morph for expansion continuity · gates REACH/EXPAND/HONEST.

### 0.3 · Z1 — the adjudicator's finding (both arms partially blind)

`.glass-overlay` carries **`backdrop-filter: var(--glass-blur-overlay)`** (`src/styles/glass/ladder.css:162-173`). ExpandableContainer hardcodes `'glass-overlay': open` on the root (`ExpandableContainer.vue:12`) that **contains** `[data-part=panel]`. Adopting it verbatim (Opus: "the 32px frame *is* the overlay glass") puts the live WGPU stage inside a filtered compositing group — violating the configurator's own stated discipline (`configurator/styles.css:34-41`: "the stage remains outside every filtered ancestor"), MOTION-CANON §3(d) (the world scrim has NO blur rung), and K9. Fable dodged it only by rebuilding everything. **Cure (one edit, benefits every future EC consumer): strike `glass-overlay` from `ExpandableContainer.vue:12`; the expanded root paints scrim background-only (the post-§3(d) ModalOverlay register, `bg-overlay-scrim`) with `backdrop-filter: none`; the studio inside paints its own `glass-floating` material.**

---

## §1 · THE DESIGN

The four owner adjectives → four moves. All five Opus laws adopted verbatim: **L1** φ split (`grid-template-columns: minmax(0, 1.618fr) minmax(var(--configurator-aside-min), 1fr)` above `lg`, precedent `LabeledField.vue:110`'s 0.382fr) · **L2** aside floor `2·160 + 8 + 2·20 = 368px` · **L3** lozenge-vs-tile (wrapped/2-D group member → `control` 10 or `card` 16, never pill; structural trigger, greppable) · **L4** seven-lead budget (≤7 lead rows/layer, ≤7 layers, ≤3 `defaultOpen`) · **L5** dead-band disclosure (`live: [lo, hi]`, absence asserts the whole range live).

### MOVE 1 · LARGER

1. **Delete the per-story height overrides** (Fable 1a): `blob.vue:480`, `fourier-field.vue:322`; the `VizStudio.vue:54` default `h-[min(86vh,880px)]` governs. Blob stage +38% area before any other edit.
2. **The description leaves the resting row** (Opus 1a): `LabeledField`'s `<p class="labeled-field-description">` migrates into the row's detail region (MOVE 2a), collapsed at rest via the `0fr↔1fr` grid — **not** `display:none`, **not** `inert` (unlike `ConfiguratorLayer.vue:160-168`), so `aria-describedby` keeps resolving. Rung drops `--type-small` → `--type-caption` (ratio 1.140 vs settled φ^¼ = 1.128, inside the ≤6% band). Resting pitch ≈ 64.6px vs measured mean 120.8 (−46.5%); blob controls scrollHeight 2443 → ≈1350; rows in view 1 → ~6.6 rest, ~10.2 expanded.
3. **L1 + L2 band**; `asideWidth` doc corrected to match (X6).
4. **The anchor obeyed** (X7): gallery + footer drop `px-3` for `--configurator-pad-inline`; mobile transposition `@media (max-width:768px) { --configurator-pad-inline: 0.75rem }` (one rung down, §1.1).
5. Blob canvas-clip (768×768 into the stage) — **routed to the blob lane**, both arms agree.

### MOVE 2 · EXPAND

**2a · Row → detail region** (Opus adopted; Fable's overlay plate rejected, R4): opt-in nothing — a row earns `ChevronDown` iff `description || note || live || $slots.detail`. Mechanism verbatim from `ConfiguratorLayer.vue:160-213`: `grid-template-rows 0fr↔1fr` on `transition: grid-template-rows var(--duration-fast) var(--spring-snappy)`, chevron on the shared `transition-disclosure` register, `aria-expanded`/`aria-controls`. Content: full description + `note.text` + the `live` sentence + slot. Stage cost 0.

**2b · Studio → room**: `<Configurator expandable>` (VizStudio passes true) wraps its root in **`<ExpandableContainer>`**, amended:
- **Z1 cure** (§0.3): scrim background-only, `backdrop-filter: none` on the expanded root.
- **K4 + A6**: trigger `--radius-button` → `--radius-pill`, box ≥44 via the inset-`::before` hit idiom (`expandable-container/styles.css:20-33`).
- **Geometry**: expanded padding **32** (page-gutter rung, stated as a literal — no token, R5), mobile 20. At 1440×900: plate 1376×836 (+119% vs blob today), φ-split stage 849×~740 (+66%). Configurator root radius **`--radius-3xl` 24** (room; §4 "showcase frame"; r − pad = 24 − 20 = 4 exactly), *at rest too* (§4 below).
- **Motion** (Fable grafted): FLIP measured across the teleport — transform + opacity only, WAAPI `element.animate` with `springTimingFunction(springPreset("dock"))` + **`response: 0.42` per-consumer override** (the escape `springPresets.ts:106-108` blesses), the interim for MOTION-CANON's minted-but-unlanded `bloom (0.42, 0.90)`; collapses to `springPreset("bloom")` when it lands. Reduced motion: 0.12s opacity swap. If the OWED live cell shows the canvas blanking through the teleport+FLIP, ship the plain state swap — one mechanism either way, no runtime fallback ladder.
- Focus/Esc/lock/restore: already shipped, nothing added.
- **Expanded reflow**: gallery forces `top` (full-width tile ribbon, all presets reachable); controls layers reflow `repeat(auto-fill, minmax(var(--configurator-aside-min), 1fr))`; all tiers revealed (MOVE 4).

**2c · Layer → show all** (Opus): `data-show-all` on `ConfiguratorLayer` + a *Show all N / Show 7* footer text button; one CSS rule, no slot surgery.

### MOVE 3 · EXPRESSIVE — landed on `LabeledField` (X3), inherited by 104 mounts

| prop | shape | cures |
|---|---|---|
| `value?: string\|number` + `format?` | right-aligned tabular-nums readout on the label line; `LabeledSlider` auto-derives from `modelValue` — **zero cost at 61 mounts** | X2; blob's empty-pill sliders; aurora Energy exposed honestly |
| `aria-valuetext` | same formatted string, `LabeledSlider` → `Slider.vue` forwards to the thumb beside `:230-233` (one line) | A5, ×19 thumbs |
| `note?: { kind: "boon"\|"bane"\|"owed"; text }` | 12px glyph at rest (bane = `circle-alert`, A9's cure), full sentence in the detail region | the owner's literal "mark their boons and banes"; fourier G10: "valid to ~1.05" (FFN-1), "clamped to N" replacing the false "orthogonal to N" copy (`fourier-field.vue:415,428`), aurora D2 disclosures |
| `live?: [number, number]` | L5 — rendered as a sentence in the detail region, not a painted track band | blob satelliteRadius 0.04–0.16 live 0.120+ (62.5% dead, `blob.vue:708-715`); fourier intensity 0–2 live ≤1.05 (`:454-461`); trailWidth 24 distinct of 51 steps (`:446-453`) |
| `inertReason?: string` (Fable) | A4 recipe — geometry + border held, ink → 0.45, chroma → 0 — plus the reason as a note; bound reactively (blob lit-glass rows at `morphT===0`, aurora wet-edge off-watercolor, fourier harmonic-scale on 8/9 sources) | G-CFG-HONEST |
| felt response | CSS-only: hover fill 0.05, `:focus-within`/`:has(:active)` fill 0.12 + readout steps to `--foreground`; `press` (0.20/0.80, disk-verified) | A2 |

`ConfiguratorRow` gains prop parity (`value`/`note`/`inertReason`/`tier`) for its 19 mounts. **Precondition, named: A11** — 13 of 19 thumbs paint no handle; the cure is the ungate at `Slider.vue:384,397,475`; the slider lane's edit, hard precondition for the felt-response story.

### MOVE 4 · CONFIGURABLE

`tier?: "lead" | "full"` → `data-tier` (Opus), one CSS hide rule at rest, per-layer *Show all N*, **plus** (Fable's shelf semantics) the expanded studio reveals all tiers unconditionally. L4 born-RED: blob 4/4 layers open, fourier 4/4, aurora TextureLayer 9 rows. Curation seeds (Fable's counts): blob ~8 resting of 17, aurora ~12 of 72, fourier 6 of 8 (harmonic scale demoted, FF-16). Missing axes (`fissionAmp` lead row, `vividness`, `squashGain`…) are the substrate lanes' authorship on this shelf.

### GALLERY (X5 + F09, split ruling — R8)

- **Tile markup promoted into the library** as the `data-gallery="top"` rendering; `ConfiguratorPreset` gains `swatch?: readonly string[]` (gradient well when no baked thumb); active ring + shimmer CSS already shipped. `aurora/PresetPickerRow.vue` **deleted** (aurora lane edit).
- **Rest keeps `aside` placement** (Opus's global `top` flip rejected — it spends ~150px of the stage envelope this very wave enlarges): the aside gallery **wraps** (`[data-gallery="aside"] .configurator-gallery-track { flex-wrap: wrap }`), all 5 blob + 5 fourier presets reachable at rest; **wrapped members drop pill → `--radius-control` 10** (L3 self-consistency, satisfies gate 4).
- **Expanded forces `top`** with the full tile ribbon + `n / N` counter. Aurora's residual 17-preset count is banked N8, aurora's row.

### RADIUS + TOKENS

Opus's ladder adopted wholesale: root `rounded-panel` 12 → **`--radius-3xl` 24** (§4 room = "showcase frame"; C5 strikes 12); layer relay `max(4, 24−20)=4` now non-degenerate; tile 16 → monotone 24>16>4, the §4 inversion discharged by moving the parent; EC trigger → pill (K4). Tokens: row-gap **4/8/12**, row-py **4/8/12**, default `size` **"sm"** (intra-atom gap law), baked recipe `gap-1 py-1`, preset-row-weight **8**, new `--configurator-aside-min: 368px` (L2). All series-derived; the "comfortable restates the baked recipe" doc note dies with the retune (clean break). `--configurator-section-size` untouched — banked F10, type lane.

---

## §2 · FILE CENSUS — 14 core + 3 routed + 1 deletion

| # | file | edit |
|---|---|---|
| 1 | `src/components/expandable-container/ExpandableContainer.vue` | strike `glass-overlay` (Z1); FLIP morph graft (dock + 0.42 override; reduced-motion opacity) |
| 2 | `src/components/expandable-container/styles.css` | scrim background-only + `backdrop-filter:none` expanded; K4 pill; A6 44 box; padding 32 (mobile 20) |
| 3 | `src/components/configurator/Configurator.vue` | `expandable` + `expanded` model wrapping in EC; tile markup as the `top` default + `swatch` + `n/N`; X6 doc; X7 anchor; root radius 24; expanded forces `top` |
| 4 | `src/components/configurator/ConfiguratorLayer.vue` | `data-show-all` + footer affordance |
| 5 | `src/components/configurator/ConfiguratorRow.vue` | prop parity; `gap-1 py-1` |
| 6 | `src/components/configurator/styles.css` | L1 track + L2 floor; tier rules (rest hide + expanded reveal); aside gallery wrap + L3 radius; engage fills; A4 inert recipe; mobile pad transposition; ladder |
| 7 | `src/components/configurator/index.ts` | type exports |
| 8 | `src/components/labeled-field/LabeledField.vue` | value readout; detail region (description + note + live + `#detail`); chevron; `data-tier`; inert recipe hook; description → caption |
| 9 | `src/components/labeled-field/types.ts` | `value/format/live/note/tier/inertReason` |
| 10 | `src/components/labeled-field/LabeledSlider.vue` | auto value + `aria-valuetext` |
| 11 | `src/styles/tokens/sizing-config.css` | series retune + `--configurator-aside-min` |
| 12 | `demo/stories/substrates/_frame/VizStudio.vue` | forward `expandable` (true) |
| 13 | `demo/stories/substrates/blob.vue` | drop height-class; tier/value/live/inertReason authorship |
| 14 | `demo/stories/substrates/fourier-field.vue` | same + FFN-1/FFN-6/FF-16 notes |
| R1 | `src/components/slider/Slider.vue` | one-line `aria-valuetext` forward — slider lane (with A11 ungate) |
| R2 | `demo/stories/substrates/aurora/sections/AuroraColorSection.vue` | L3 harmony → control 10; K8 strike the sub-plate; D2 notes — aurora lane |
| R3 | `demo/stories/substrates/aurora/AuroraConfigDock.vue` | tier marks; `data-engine` chip — aurora lane |
| D1 | `demo/stories/substrates/aurora/PresetPickerRow.vue` | **DELETE** after tile promotion — aurora lane |

New public API: `ConfiguratorPreset.swatch`, six `LabeledField` props, `Configurator.expandable/expanded`. Additive; no relay addendum owed (the fourier slides-consumer clause concerns the fourier greenfield, not these props).

## §3 · GATES — seven, born-RED at HEAD

| id | invariant | RED because |
|---|---|---|
| G-CFG-1 SEVEN-LEAD | L4 budget | blob 4/4 open · fourier 4/4 · aurora TextureLayer 9 |
| G-CFG-2 NO-RESTING-PROSE | zero painted description height at rest | blob 1283px of it |
| G-CFG-3 VALUE-READS | every configurator `[role=slider]`: non-null `aria-valuetext` + visible numeral | 0 of 19 |
| G-CFG-4 STADIUM-APERTURE | no r≥9999 member of a wrapped/grid group | the 4 harmony items; wrapped aside chips |
| G-CFG-5 REACH | 5/5 presets in-plate at rest | blob 2/5 · fourier 3/5 (chips to x=1500 past 1303) |
| G-CFG-6 EXPAND | 1 affordance per studio; expanded plate ≥1.35× rest area at 1440×900 | count 0 |
| G-CFG-7 HONEST | 0 rows inert without `inertReason`/`note` | blob 3 · aurora ≥8 · fourier 1 |

## §4 · OWED (the wave cannot close without)

1. **Canvas survives the Teleport + FLIP** — screenshot all three WGPU studios expanded/collapsed; never `getContext()` (context-steal trap). 2. **Reproduce-and-attribute "Calm"** before any cure (R6). 3. **Live π on the new geometry** — every §1 number past disk arithmetic is browser-seat work. 4. **safari-app + webkit-engine cells** per row (PROPORTION §7a; the EXEC-STATE Safari-LIVE record is stale). 5. **A11 ungate** lands in the slider lane before the felt-response story is claimed.

## §REJECTED

| # | loser | falsifier |
|---|---|---|
| R1 | Fable's FLIP-in-place + ghost spacer + hand scrim (~90 new lines in Configurator.vue) | `ExpandableContainer.vue:1-211` ships the entire a11y/lock/Esc/restore mechanism with 0 consumers (verified); rebuilding it violates KISS + the ≥2-sites overfitting law, and K4 (`PROPORTION.md:166`) already names EC's token expecting adoption. The morph survives as a graft, not as a reason to rebuild |
| R2 | Fable landing `value/caveat/inertReason/advanced` on ConfiguratorRow | measured 19 ConfiguratorRow vs 104 `Labeled*` mounts; blob/fourier/aurora rows are all `Labeled*` — the design would no-op on ~85% of the audited surface |
| R3 | Fable's F09 citations (aside band "RULED-NO-CHANGE"; chip-strip F09) | `FEEDBACK-LEDGER.md:21`: F09 = over-round + cramped; the PNG, viewed, is the aurora harmony panel. Nothing rules the band unchanged |
| R4 | Fable's row-overlay working plate (slot rendered twice) | doubles live control mounts and useId trees, and adds a second overlay system in the same wave that adopts EC; the detail region ships the same disclosure content at 0 machinery. MOTION-CANON:208's A01 overlay remains available to a later precision-scrub wave — deferred, not damned |
| R5 | Fable's `--configurator-expand-inset` token | single consumer; 32 and 20 are bare §1.1 rungs; K4 shows the house strikes 1-consumer tokens. Literal + named rung |
| R6 | Fable's aria-label sweep as the "Calm" cure | accessible-name precedence: `aria-labelledby` (already forwarded, `Slider.vue:231`) beats `aria-label`, so the sweep cannot change the announced name if labelledby is the culprit; the on-disk chain reads correct — reproduce first |
| R7 | Opus's `glass-overlay` expanded frame ("the 32px frame is the overlay glass") | `ladder.css:162-173`: `.glass-overlay` = `backdrop-filter: var(--glass-blur-overlay)` — the live stage lands inside a filtered ancestor, against `configurator/styles.css:34-41`, MOTION-CANON §3(d), K9 (= Z1) |
| R8 | Opus's global `galleryPlacement` default flip to `top` at rest | the tile ribbon costs ~150px of the rest stage envelope this wave exists to enlarge; wrapped aside chips reach 5/5 for ~30px. `top` + tiles is forced in the expanded state, where the room affords it |
| R9 | Fable's "×1.5 shared-label migration" constant | not in MOTION-CANON — no such constant exists; moot under R4 |
| R10 | Fable's rest description `line-clamp: 1` | still burns a full line-height per row and leaves X4's rung collision uncured; loses to the detail-region migration, which zeroes G-CFG-2 and drops the description to caption |
