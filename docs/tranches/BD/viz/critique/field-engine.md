# CRITIQUE — W-FIELD-ENGINE (the shared `field/` chunk: noise·wave·flow·color)

**Lane** BD viz / critique-fleet · **Stance** ADVERSARIAL · **Scope** PLANNING audit, zero edits ·
**Read** `VIZ-BAND-PLAN.md` D2 · `fleet2/concentric-papergrid-wavemath.md` §1 · `arch/shared-field-engine.md` · the shipped substrate (`glass/webgl/shaders/{flow,procedural-color}.*`, the 7 viz shader trees, `ringField.ts`/`flowField.ts`/`paperGrid.ts`/`metaball-noise.wgsl.ts`).

**VERDICT (one line):** the DRY debt is REAL and the color/flow precedent is sound, but the spec as written **over-reaches the basis hoist, mis-states the wave-trapped premise, contradicts itself on the wave consumers/fence, and rests the entire parity safety-net on a JS oracle that does not yet exist (every current round-trip is a regex transcription check, NOT numeric).** Build a NARROWER engine or pay a blast-radius the gate cannot catch.

---

## 1. The DRY debt is genuine — the abstraction is RIGHT in PRINCIPLE

Substrate-confirmed, the fork is not invented:
- `9.81` is duplicated 4× across two names (`RING_GRAVITY` in concentric ×1 const + 2 sites; `FLOW_GRAVITY` in dot-flow ×1 const + 2 sites; each also in WGSL+GLSL). Two names for one physical constant is a genuine smell.
- `CURL_EPS = 0.012` is re-declared in **6 places** (shared `flow.{glsl,wgsl}`, `paperGrid.ts`, both `flow-field.*` shaders, `flowField.ts`) — and the shared chunk's whole point was to own it, yet the JS twins re-roll it anyway. That is a real fork the engine closes.
- `hash21`/`valueNoise`/`potentialFBM` re-authored across aurora, paper-grid (+JS), dot-flow (+JS), with the `FBM_ROT mat2(0.8,0.6,-0.6,0.8)` constant pasted in comments everywhere as proof they *know* it's the same.

So the thesis ("mint `field/{noise,wave,flow,color}`, splice not re-roll") is directionally correct and the template-splice mechanism is already gate-proven. **This is the strongest part of the plan.** The critique below is everything the spec gets WRONG around that correct core.

---

## 2. OVER-ABSTRACTION #1 — the noise-basis hoist is NOT one basis written four ways

The plan's load-bearing claim (`arch §1b`, `synthesis §1.2`): *"the same Dave-Hoskins/IQ value-noise family written four ways."* **This is false for the blob and the smooth-vs-painterly split, and partly false elsewhere.**

- **The blob does NOT use value noise.** `goo-blob/shaders/metaball-noise.wgsl.ts` `noised()` is an **IQ analytic-derivative GRADIENT noise** (returns `vec3` = value + analytic ∂x/∂y), used to perturb the SDF with a smooth closed-form gradient. Paper-grid/dot-flow use **quintic value noise** (scalar, no analytic derivative). These are DIFFERENT noise families with DIFFERENT output semantics. Folding the blob onto a shared *value*-noise basis either (a) changes the blob silhouette (the `proof:blob-render`/`proof:goo-redress` cage reds, a re-baseline the plan does not budget) or (b) forces `field/noise` to ALSO carry an analytic-gradient variant — at which point the "ONE basis" is two functions and the DRY win shrinks. The plan lists `goo-blob` as a noise consumer (`arch §1b` bullet 4) without acknowledging it is a different basis.
- **The fbm divergence is parameterization, not paste.** Aurora is `2.02` lacunarity / uniform-octaves; paper-grid is `0.5`-gain / 3-octave. The plan says "parameterize `fbm(p, octaves, lac, gain)`." Fine — but a uniform-driven fbm loop is a per-frame ALU cost over a compile-time `const` unroll, and `arch §6` itself flags this open question. The smooth aurora pole is the most perf-sensitive surface in the suite; a runtime-octave fbm there is a regression risk the plan defers rather than decides.
- **The split the plan KEEPS already covers half the forks.** `procedural-color`'s `gnoise`/PCG2D painterly basis is explicitly kept distinct (AV.W2 §3a, re-affirmed). So of the "5-6 forks," the painterly ones are SANCTIONED. The real shareable surface is ~3 value-noise hosts (aurora-smooth, paper-grid, dot-flow) — a meaningfully SMALLER win than "5-6× collapse" advertises.

**Recommendation:** scope `field/noise` to the value-noise smooth basis ONLY, EXEMPT the blob's gradient-noise by name (it is a distinct basis serving SDF perturbation, the same fence `gnoise` gets), and DECIDE compile-time `const` octaves for the smooth pole now (not "open question").

---

## 3. CONTRADICTION + FALSE PREMISE — the wave layer is the weakest pillar

The two binding docs **disagree on who consumes `wave` and on the fence**, and both mis-state the HEAD:

- **"The Gerstner wave is trapped in dot-flow ALONE" is FALSE.** `concentric/ringField.ts` carries `sampleRingField` + `RING_GRAVITY` + `omega = sqrt(g·k)` — a sum-of-sines with the SAME deep-water dispersion (8 hits). So the wave is forked in TWO viz (dot-flow AND concentric), spelled differently (radial-Fourier crests vs directional Gerstner). The plan's premise that hoisting frees a "trapped" single copy is wrong; it must RECONCILE two genuinely different wave formulations (radial vs directional) into one chunk — a real transcription-equivalence problem the spec hand-waves as "ringField's crests STAY, the wave is the shared PERTURBATION layered on" (`arch §2b`). That means concentric ends up with BOTH its radial-Fourier sum AND a shared Gerstner perturbation — MORE code, not less. The DRY claim inverts for concentric.
- **The fence contradicts itself.** `synthesis §1.3` step 2 names `hostField` as the protagonist and lists concentric's host as `baseFBM`+`contourDistance`. But `arch §2b` says concentric's wave is a perturbation ADDED to "the ellipsoidal radius" — i.e. the OLD ring field. And `synthesis §2.2` overturns the ring field ENTIRELY (level-sets of curl-warped fbm, no ellipsoidal radius). So three docs describe three different concentric hostFields. The wave-perturb wiring is specified against a host that the SIBLING wave (`W-CONCENTRIC-LEVELSET`) is simultaneously deleting. **These two waves must be co-designed or the wave-perturb term lands on dead code.**
- **The uniform-struct cap is undecided and load-bearing.** `array<vec4, N>` needs a fixed std140 N (`arch §6` q3). Pick-max-of-consumers couples concentric's perturbation-needs to dot-flow's full wave-set — the uniform buffer of the calmest viz pays for the busiest. A bad N choice is a silent perf/alignment tax across all consumers.

**Recommendation:** DEFER `wave` out of `W-FIELD-ENGINE`. Ship `noise`+`flow` (the proven, genuinely-shared, low-risk layers) FIRST; fold `wave` only AFTER `W-CONCENTRIC-LEVELSET` lands its real hostField, so the perturb term wires onto a settled host. Shipping wave against three contradictory host specs is the over-coupling the critique brief warns of.

---

## 4. THE PARITY SAFETY-NET IS A FICTION — the JS oracle does not catch drift TODAY

The brief asks directly: *"does waveFieldMath.ts round-trip actually catch drift?"* **No — not as the gates exist, and the plan over-claims it.**

- **Every current "round-trip" is a STRUCTURAL REGEX, not numeric.** `proof-concentric.mjs` clause 3 asserts `/function sampleRingField/.test(js)` && `/fn sampleRingField/.test(wgsl)` && `/float sampleRingField/.test(glsl)` — it checks the FUNCTION NAME EXISTS in all three, NOT that they compute the same numbers. A transposed sign, a swapped `0.8`/`0.6`, a `2.02`→`2.0` would all sail through. `grep` for `new Function|evalGLSL|deltaE|fixedSample|numericRoundTrip` across `proof-concentric/papergrid/flow-field` returns ZERO. The "JS↔WGSL↔GLSL round-trip" the plan leans on is a NAME-presence check.
- **`proof:gpu-substrate-single`'s ΔE is a captured-PNG luminance proxy, mostly DEMOTED to enrollment.** Its own header says the structural-proxy ΔE-0.0 is "demoted to enrollment" and the real ΔE needs a Metal-GPU capture (rides W-REFLECT). So the numeric-equivalence guarantee the engine's entire DRY-safety argument rests on (`§4` "byte-identical-numerics, ΔE bar measures both paths") is, at the device-free gate level, a regex + a luminance mean. A hoist that re-spells the hash subtly identically-passing-tests is exactly the drift this hoist could introduce.
- **`proof:wave-field-single` clause (4) PROMISES "a numeric round-trip per layer (GLSL/WGSL/JS agree within ε at a fixed sample set)."** That gate does not exist and would be NET-NEW infrastructure (a GLSL/WGSL evaluator or a transpile-and-eval harness) — a substantial build the plan budgets as one gate clause. **If the engine ships without it, the blast radius (§5) has no machine backstop.** This is the single biggest under-scope: the WHOLE justification for collapsing the fork is "one math source can't drift" — but the only thing that proves no-drift across a 7-viz hoist must be BUILT FIRST and is the hardest part.

**Recommendation:** `W-FIELD-ENGINE` MUST land the genuine numeric round-trip harness (eval JS oracle + transpiled shader at a fixed sample-grid, assert max-abs-err < ε) as a PREREQUISITE, not a clause. Make it gate-RED on a planted `2.02→2.0` mutation (the self-test bite must be NUMERIC, not name-presence). Without it the hoist is strictly more dangerous than the fork (one mistake re-resolves the whole suite vs one viz).

---

## 5. THE BLAST RADIUS — elegance or fragility? Mostly fragility AS SCOPED

The brief's core question: *"a change to the shared wave re-resolves the WHOLE suite — elegance or fragility."*

- **Blast radius is 7 viz shader trees** (aurora, concentric, dot-flow, dot-matrix, goo-dot-matrix, paper-grid, +blob if folded), each with a WGSL+GLSL+JS-twin triple. A `WAVE_GRAVITY`/lacunarity/`CURL_EPS` tune re-resolves all of them. That is the DESIRED property — IF the parity net is real. It is not yet (§4). So at HEAD the engine converts 7 independent-and-individually-gated surfaces into 1 shared surface gated by a regex. **That is a net SAFETY regression until the numeric harness exists.**
- **The `flow.*`→`field/flow.*` MOVE is gratuitous churn flagged as "optional."** `arch §6`/`synthesis §1.4` admit the move forces the parity gate's path-pin to update in lockstep, and `procedural-color.wgsl.ts` ALREADY lives in the WRONG place — under `aurora/constants/shaders/`, NOT the shared `glass/webgl/shaders/` dir (a real feature-dir-encapsulation violation the plan does NOT call out). So the "shared" color WGSL twin is cross-imported from a feature dir TODAY. The layout cleanup is worth doing — but it should be its OWN clean-break wave (`fix the color WGSL home`), not a smuggled "optional" rider on the math hoist where a path-pin miss silently de-fangs the parity gate.
- **The "no second mechanism" claim is true and good.** Template-splice + splice-order is reused, no new abstraction. Credit where due — this part is KISS.

---

## 6. WHAT THE PLAN GETS RIGHT (so the fold is not a rejection)

- The color/flow shared-chunk precedent is sound and the splice mechanism is gate-proven.
- The `hostField`-stays-local fence (`§3` step 2) is the correct anti-over-abstraction boundary — KEEP it verbatim.
- The smooth-vs-painterly basis split is correctly preserved.
- `noise`+`flow` (value-noise smooth basis + curl operator) IS a clean, low-risk, genuinely-DRY hoist worth shipping.

---

## 7. THE ASKS (what the fold must fix before 2-consecutive-clean)

1. **Numeric round-trip FIRST, not a clause.** Build the JS-oracle↔shader eval harness; gate-RED on a `2.02→2.0`/sign-flip mutation. No hoist before it.
2. **DEFER `wave`.** Ship `noise`+`flow` in `W-FIELD-ENGINE`; fold `wave` AFTER `W-CONCENTRIC-LEVELSET` settles its hostField. Reconcile the contradiction between the three concentric-host specs first.
3. **EXEMPT the blob gradient-noise** by name (distinct basis, SDF-perturbation, gets the `gnoise` fence). Scope the DRY claim to ~3 value-noise hosts, not "5-6."
4. **DECIDE compile-time `const` octaves** for the smooth pole now; uniform-octaves only where the configurator demands.
5. **Split the `procedural-color.wgsl.ts` re-home** (aurora-dir → shared-dir) into its OWN clean-break wave; do not smuggle the `flow` MOVE as "optional" where a path-pin miss de-fangs parity.
6. **Pick the wave-component N** explicitly with the per-consumer cost recorded; don't let the calm viz pay the busy viz's uniform buffer silently.
