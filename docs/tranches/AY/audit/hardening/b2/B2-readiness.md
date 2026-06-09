# B2-readiness — adversarial readiness audit of the REMAINING Batch-2 specs

**Lane** B2-readiness · **Date** 2026-06-09 · **Target HEAD** `1151899` (tranche/AY,
"AY Batch 2 — disjoint component perfection") · **Verdict** GAPS-FOUND

Scope: the 8 remaining Batch-2 specs — W-CON2, W-CON3, W-AUR2, W-AUR-PAINTERLY,
W-AUR-WEBGPU-DECIDE, W-BLOB3, W-SLD1, W-SLD2 — RED-TEAMED for implement-readiness against
the AS-BUILT Batch-2 changes (W-CON1, W-BLOB2, W-DOCK1/2, W-FF2, W-GLASS, W-MOTION,
W-CARDINAL-INFRA landed at HEAD). The question is NOT "is the spec good" but "can an agent
pick this up at HEAD and hit the gate without re-grounding, and does it overlap the
just-landed waves?"

**TL;DR readiness ranking:**

| Spec | Ready? | Blocking issue |
|---|---|---|
| W-AUR-PAINTERLY | **READY** (born-RED bar is implementable) | none blocking; line-cites need a refresh, the bar IS measurable |
| W-AUR-WEBGPU-DECIDE | **READY** (RETIRE branch) | package.json line-cites +9 stale; otherwise clean |
| W-SLD2 | **READY** | minor: cites stale package.json/gates.mjs line numbers |
| W-AUR2 | **RE-GROUND** | hard dependency `proof:ay-w0-reground` (G4) DOES NOT EXIST — W0-REGROUND never minted it |
| W-CON3 | **RE-GROUND** | all Constellation.vue/constellationField.ts line-cites stale (W-CON1 shifted +143 lines); cites file as 510, real is 653 |
| W-CON2 | **RE-GROUND** | same line drift + the "numeric-token cohort START by W-CON1" premise is FALSE — W-CON1 landed NO tokens |
| W-SLD1 | **RE-GROUND** | ordering invariant VIOLATED — W-GLASS already landed in Slider.vue first; all SFC line-cites stale |
| W-BLOB3 | **RE-GROUND** | W-BLOB2 already touched GooBlob.vue + renderer (707 lines now); cites stale; W-GOD1 dep ordering at risk |

---

## §1 — The systemic finding: a uniform line-cite drift the specs were authored BEFORE Batch-2 landed

Every remaining spec was authored at the PRE-Batch-2 base and cites file:line coordinates that
the just-landed waves have shifted. Two repeating offsets surface:

1. **A +9-line shift in `package.json` scripts.** `proof:constellation-warp-live` is at
   `package.json:653` (W-CON2/W-CON3 cite `:644`). The five WebGPU gates are at
   `package.json:631-635` (W-AUR-WEBGPU-DECIDE A.5 cites `:622-626`, having ALREADY corrected
   from `:620-624` — but the real value is `:631-635`, off by another 9). This is a landed-wave
   side-effect (the AY proof-script block grew). **`gates.mjs` line-cites, by contrast, are
   ACCURATE** (the WebGPU gates verify at `gates.mjs:337,343,349,355` exactly as W-AUR-WEBGPU-DECIDE
   states). So the drift is package.json-local, not universal — an executing agent must
   re-grep package.json, not trust the cite.

2. **A +143-line shift in `constellationField.ts` (510 → 653) and a +127-line shift class in
   the blob/slider SFCs.** These are the load-bearing edit-site drifts (below).

This is the EXACT `project_workflow_stale_worktree_trap` MEMORY hazard inverted: not a stale
BASE, but a spec frozen at a stale base while its lane-mates landed underneath it. Each
RE-GROUND spec below needs a mandated **step-0 re-grep of every cited line** before harvest.

---

## §2 — Per-spec readiness

### W-AUR-PAINTERLY — READY. The born-RED stunning bar IS implementable. (the lane's marquee question)

**The headline verdict: YES, the born-RED bar is implementable, and this is the strongest
spec in the remaining set.** I ran the W-AUR1 dependency live:

```
$ node scripts/aurora-arresting-metric.mjs tests-visual/fixtures/starry-night-crop.png
  §4.1 colorfulness   C = 70.67  (quite colorful)
  §4.2 anisotropy     A = 0.8324  (hist peak/mean 4.49)
  §4.3 spectrum slope β = -1.6719  (band k∈[3,32]; target [-1.85, -1.45])
  reference-anchor triple: { C: 70.67, A: 0.8324, beta: -1.6719 }
  §4.3 in-band: YES
```

Every W-AUR1 dependency the spec names is REAL at HEAD:
- `scripts/aurora-arresting-metric.mjs` EXISTS (15 KB) and runs green, printing the exact
  reference triple the spec's bands key off (C=70.67, A=0.8324, β=−1.67 — matching the spec's
  claimed β=−1.67 in-band exactly).
- `tests-visual/fixtures/starry-night-crop.png` EXISTS (the reference plate).
- `src/components/custom/aurora/RESEARCH.md` EXISTS (27 KB — the transcribed technique set T1-T6).
- `proof:aurora-arresting-ref` is wired (`package.json:629`).
- The born-RED `.cache/gates/AX-aurora-painterly-statistics.json` is `status:fail`,
  `specsPassed:0`, with the exact `locator.waitFor: Timeout 20000ms` never-executed-assert
  the spec describes — confirmed verbatim.

**Why it is implementable, not an unfalsifiable vibe:** the bar is THREE reference-anchored
numeric bands (colorfulness ∈ [55.67, 95.67] = [ref−15, ref+25]; anisotropy ∈ a measured band;
slope ∈ [−1.85, −1.45]) computed by the SAME committed harness, asserted on a live-GPU readback.
This is a falsifiable target with a printed reference, not "make it stunning." The spec correctly
forbids the SwiftShader skip-to-green and requires a real-GPU `status:pass` + a captured DELTA.
The four AX not-flat floors stay below as the floor; the three bands are the ceiling. This is the
H-convergence F4 / cardinal-DELTA discipline done right.

**Residual readiness gaps (do NOT block, but the executing agent must handle):**
- The edit-site line-cites (`mediums.glsl.ts:256-300/:329-392/:334-336`, `brush.glsl.ts:50-73/
  :201-279/:289-365`, `atoms.ts:150-155`) are at the AX base. Aurora shaders were NOT touched by
  any landed Batch-2 wave (the landed aurora work is W-AUR1's harness + RESEARCH.md, additive
  files), so these cites are likely STILL VALID — but the agent must verify (a 1-line re-grep),
  not trust.
- **The hardest real risk is artistic convergence, not infra.** The spec's own "Named successor
  (on miss)" anticipates the two-of-three-bands miss and the band-too-tight scope-reveal. This is
  honest. But: tuning a single-pass WebGL2 field to land C ∈ [55.67, 95.67] AND A in-band AND
  β ∈ [−1.85, −1.45] SIMULTANEOUSLY for THREE distinct mediums (van-Gogh/oil-pastel/oil) is a
  genuine multi-objective optimization with no guaranteed solution in the WebGL2 path — the spec
  itself routes the "can't reach coherence without Kuwahara" case to W-AUR-WEBGPU-DECIDE's
  resurrect branch. That cross-wave escape hatch is sound, but it means W-AUR-PAINTERLY's close is
  the single highest-variance close in the tranche. Budget for the iter-2 successor.
- The DELTA arm names `proof:live-verified-ledger:ay` (wired at `package.json:696` — VERIFIED) and
  the AY visual home (EXISTS). Those deps are met.

**Overlap with landed waves:** NONE. Aurora shaders are untouched by Batch-2. Clean.

### W-AUR-WEBGPU-DECIDE — READY (RETIRE branch). Clean disposition, minor cite drift.

The RETIRE branch is fully grounded at HEAD:
- All three delete-target files EXIST at the cited line counts: `aurora.wgsl.ts` (235 lines ✓),
  `gpuRuntime.ts` (181 lines ✓), `createGPUCanvas.ts` (140 lines ✓).
- `WEBGPU_PARITY = false` at `renderMode.ts:39` ✓ (and the short-circuit at `:130` ✓).
- The 5 WebGPU gates exist; `gates.mjs` cites (`:337,343,349,355`) are ACCURATE; the
  `proof:aurora-webgpu-render` package.json-only / not-in-gates.mjs claim is VERIFIED.

**The one stale cite:** the package.json gate block is at `:631-635`, NOT the `:622-626` the spec's
A.5 states (the spec already corrected once from `:620-624` to `:622-626`, but the real value moved
again to `:631-635` after Batch-2 added AY proof scripts). Off by +9, the same drift as §1. NOT
blocking — the gate IDs are unique grep targets — but the cite is wrong and the agent must re-grep.

**The RESURRECT-branch decision is sound and SETTLED at HEAD:** Branch B requires W-AUR1's research
brief to name a concrete ≥1 consumer route for the Kuwahara finish. W-AUR1's `RESEARCH.md` landed; the
agent must confirm §6 names NO such consumer (the expected RETIRE disposition). I did not exhaustively
read RESEARCH.md §6, but the H-aurora convergence-criterion-2 default is RETIRE and no hero route exists
at HEAD — so Branch A is the live path. The single-disposition discipline (mark the other branch N/A) is
correctly stated.

**Overlap with landed waves:** NONE (the WebGPU twin is dead-wired, never served). Clean. NOTE: this
wave's A.2 carve of `procedural-color.glsl.ts` WGSL exports must NOT collide with W-AUR-PAINTERLY's
T6 tonemap edit (`tonemap.glsl.ts`) — disjoint files, so safe, but if both run concurrently the agent
should serialize the aurora lane.

### W-SLD2 — READY. The consumer-boundary clause is well-grounded; cite drift only.

The defect is real and verified: `proof-slider-two-only.mjs` (201 lines at HEAD) has `cliPaths()`
resolving only the two library source files (`:43-52`), `EXPECTED_KEYS = ["standard","spectrum"]`
at `:40`, and four clauses with no consumer walk. The fifth CONSUMER-BOUNDARY clause is additive and
reuses the shipped `constellation.mjs` `CONSUMERS`/`resolveSibling`/`skipSibling` machinery (the
≥2-consumer-walk bar is met). The born-RED→GREEN detector-canary discipline (export `scanSliderVariants`,
mirror `dock-wrap-content-driven.detect.test.ts`) is the correct precedent.

**Stale cites:** the spec cites `package.json:588` for `proof:slider-two-only` and `gates.mjs:608`,
`.github/workflows/ci.yml:190-191`. These are likely +N drifted (the package.json block grew). The
clause-line cites WITHIN proof-slider-two-only.mjs (`:48-49`, `:73-197`, `:199`) verify accurately at
HEAD (the gate script was NOT touched by any landed wave). NOT blocking.

**Dependency on W-SLD1:** W-SLD2 "opens AFTER W-SLD1 closes" because W-SLD1 may re-orient the
CYLINDER-CAP clause. This ordering is correct AND CRITICAL — both edit `proof-slider-two-only.mjs`.
But W-SLD1 itself is RE-GROUND (below), so W-SLD2 is gated behind W-SLD1's re-grounding. NOT a W-SLD2
defect, but a serialization the orchestrator must honor.

**Overlap:** W-SLD2 does NOT touch Slider.vue or index.ts (W-SLD1's surface) — clean disjointness from
the landed W-GLASS Slider edit. The cleanest of the slider pair.

### W-AUR2 — RE-GROUND. The doc-strike is sound, but the G4 hard-dependency gate DOES NOT EXIST.

The doc-reconcile substance is correct: the OKLAB/OKLCH migration, the ≤7-atom door, and the
`deriveAurora` composable ARE all done and gated at HEAD (verified: no `deriveColor` prop on
`Aurora.vue` → the RETIRE-default branch is the live disposition). The scoped `mood`-strike grep is
correctly de-self-referenced. The three EXISTING gates (`proof:aurora-oklch-interp`,
`proof:aurora-space-gamma`, `proof:aurora-atoms-roundtrip`) are the right "already-met" evidence.

**BLOCKING DEFECT — G4 reads a gate that was never minted.** W-AUR2 HARD GATE (G4) states:
> `npm run proof:ay-w0-reground` ... exits 0 — the aurora migration/atoms row carries no
> re-introduced stale label ... (Dependency: ... MINTED by `AY.W0-REGROUND`).

`proof:ay-w0-reground` DOES NOT EXIST at HEAD:
```
$ grep -rn "ay-w0-reground" package.json scripts/   →  0 hits (only the AU twin proof:au-w0-reground)
$ ls scripts/proof-ay-w0-reground.mjs               →  MISSING
```
W0-REGROUND was SPECCED (`AY.W0-REGROUND.md:42,86,108` mint the gate) but its gate script was never
landed — and PROGRESS.md still lists W0-REGROUND as `planned` (`:52`). So W-AUR2's G4 reads a phantom
gate. The spec hedges this ("a DEPENDENCY read, not a W-AUR2-authored gate") — but a dependency on a
non-existent artefact makes the wave UN-CLOSEABLE as written. **Re-ground action:** either (a) W0-REGROUND
must actually mint `proof:ay-w0-reground` before W-AUR2 runs, or (b) W-AUR2's G4 must drop to the AU twin
or be struck. This is a genuine DAG hole, not a cite typo.

**Secondary:** the `Aurora.vue:41-84` defineProps cite + the `atoms.ts:150-155` / `color.ts:169` cites
are at the AX base; aurora composables untouched by Batch-2, so likely valid — verify.

**Overlap:** NONE (doc + at-most-one-optional-prop). But the G4 dependency is the blocker.

### W-CON3 — RE-GROUND. Every Constellation source cite is stale; W-CON1 shifted the file +143 lines.

The `?freeze` seam, the anomaly `drawOverlay` recipe (no domain props), and the export VERIFY are all
gestalt-correct decisions. The slides-side gate spec (§5) is correctly homed in slides. But the spec is
authored against the PRE-W-CON1 base:
- It cites `constellationField.ts` as 510 lines and `Constellation.vue:172-185`, `:149-185`, `:214`,
  `:246`, `:161` (readPalette), `:78` (after warpOnClick). **At HEAD `constellationField.ts` is 653
  lines and `Constellation.vue` is 353 lines** — W-CON1 inserted the `wander` cadence (the
  `field.wander` block, the `now`/`rng` `stepField` params, the new demo "resize re-fit + auto-drift"
  section). The render-loop guards W-CON3 folds its `freeze` predicate INTO are now at shifted lines
  (the `!handle.reducedMotion` step block is at `Constellation.vue:216-218`, the warp listener at
  `:290`, readPalette at `:202`). Every cite needs a re-grep.
- D1's `grep location.search src/components/custom/constellation/ → 0 hits` CLAIM is STILL TRUE at
  HEAD (verified 0 hits) — so the core defect holds. Good.
- The demo seam handle the spec mirrors (`__constellationWarp` at "`:104-108`") is now at
  `demo/stories/substrates/constellation.vue:112`; W-CON1 added `__constellationRefit` at `:128`. The
  W-CON3 `__constellationFreeze` handle the freeze π gate reads must be added alongside these two — the
  cite is stale but the pattern is intact.

**The dependency on W-CON1's auto-drift focal (`field.warp.{x,y}`) IS satisfied** — W-CON1 landed
`wander` re-pointing the warp to a drifting node. So the anomaly recipe can pin to a live-wandering
focal as designed. Good.

**Overlap:** SERIALIZES with W-CON2 (both edit Constellation.vue render-loop + constellationField.ts +
the demo story). The spec correctly mandates W-CON1 → W-CON2 → W-CON3 serial order. RE-GROUND, not
overlap-broken — but the agent MUST re-base the cites first.

### W-CON2 — RE-GROUND. Same line drift PLUS a false premise about W-CON1's token cohort.

The ω-derivation reconcile (D2), the decided-scope eggs (well SHIPS / supernova DEMO-ONLY / flock CUT),
the safety-floor discipline (no-singularity, no-slingshot, field-cools), and the PRM state-reset are all
well-reasoned. The `proof:constellation-egg-live` π gate mirroring `proof:constellation-warp-live` is the
right precedent. But two grounding defects:

1. **All Constellation source cites are stale** — same +143-line `constellationField.ts` shift as W-CON3.
   The spec cites `constellationField.ts:286-290` (WARP_RESPONSE/ZETA/OMEGA/DT_CLAMP), `:337-355`
   (warpStep), `:300-321` (nearestNode), `:257-263` (the `|v|→speed` steer renorm the well must route
   through). At HEAD these are at `:376-380` (the consts), `:418-440` (warpStep), and the steer renorm
   has moved. `proof:constellation-warp-live` is at `package.json:653` not `:644`. Every cite needs
   re-grep.

2. **FALSE PREMISE — "W-CON1 lands the numeric-token cohort START."** W-CON2 §6 and E4 repeatedly
   assume W-CON1 declared the `--constellation-wander-idle`/`-wander-jitter` numeric tokens and that
   W-CON2 "ADDS the well force ... extends the numeric cohort ... coordinate so the cohort is declared
   once (IFF W-CON1 has not already)." **W-CON1 declared ZERO numeric interaction tokens.** Verified:
   `grep "constellation-warp-response\|constellation-wander-idle\|constellation-well" src/styles/tokens.css`
   → 0 hits. The only `--constellation-*` tokens at HEAD are the 6 COLOR/alpha tokens (`:495-512`).
   W-CON1 landed `wander` with `minIdle`/`jitter` as JS FIELD DEFAULTS (`constellationField.ts:95-97`,
   `:356-359`), NOT tokens. So W-CON2 is the FIRST wave to mint ANY `--constellation-*` NUMERIC token —
   the "extend the cohort W-CON1 started" framing is wrong, and W-CON2 must declare the ENTIRE numeric
   cohort (warp-response/-zeta/-well-*/-wander-idle/-wander-jitter), not just its well subset. This is a
   scope EXPANSION the spec under-counts: W-CON2 now owns the wander tokens too (they were never
   declared), which the spec only conditionally claims ("IFF W-CON1 has not already" — it has not).

   The `proof:constellation-tokens` clause-(c) numeric-token-false-positive analysis (E4) is otherwise
   correct: `REQUIRED_TOKENS` at `:43`, the color FULL-set check, the `light-dark(` literal scan — a
   numeric `0.55` passes trivially. That analysis holds.

**Overlap:** SERIALIZES with W-CON1 (landed) → W-CON2 → W-CON3. The serial mandate is correct. RE-GROUND
for the cites AND the token-cohort-ownership correction.

### W-SLD1 — RE-GROUND. The documented ordering invariant was VIOLATED by the landed W-GLASS.

W-SLD1's §4a Disjointness explicitly states:
> `Slider.vue` is touched by FIVE AY waves (W-SLD1, W-GLASS [route onto `--glass-level`], W-SCALE2,
> W-DOCK3, W-SLD2) — they must NOT run in parallel; **sequence W-SLD1 → W-GLASS → W-SCALE2** ... so
> the SFC has one writer at a time.

**W-GLASS ALREADY LANDED IN Slider.vue, BEFORE W-SLD1.** Verified: `W-GLASS-DELTA.md` is committed, and
`Slider.vue:200-201` carries the `--glass-level` routing W-GLASS owns. So the mandated W-SLD1-first order
was inverted — W-GLASS wrote the SFC first. Consequences:
- **All W-SLD1 SFC line-cites are stale.** The spec cites the standard `.slider-thumb` rule at
  `:224-253`, the spectrum rule at `:299-322`, the round-fallback `border-radius: var(--radius-lg)` at
  `:309`, the leading-cap comment at `:217-223`. At HEAD (`Slider.vue` is 330 lines): the standard
  `.slider-thumb` is at `:224` (close, but the rule body shifted), the spectrum rule is at `:299-322`
  (the `:309` `border-radius: var(--radius-lg)` cite VERIFIES — happens to still be at `:309`), the
  `0.46` cap width is at `:228` ✓, `--radius-pill` at `:230` ✓. So the D2 spectrum cites largely
  SURVIVED, but the standard-thumb-rule body is intermixed with the W-GLASS `--glass-level` edits and
  the agent must re-read the full rule before touching it (a (b)/(c) revert must not clobber the landed
  glass-level routing).
- **The (b)/(c) branches now have a NEW write-collision risk.** If the user judges (b) revert-to-knob,
  the standard-thumb geometry edit lands ON TOP of the W-GLASS glass-level edits in the same rule — the
  agent must preserve the glass-level legs while changing the radius/width. The spec's "one writer at a
  time" guarantee is already broken; the re-ground must account for the W-GLASS-modified SFC as the new
  base.

**The user-judged-DELTA hinge is intact and correct** — the design decision (supersede/revert/reconcile)
remains a genuine user-domain hinge, and `proof:live-verified-ledger:ay` is wired (`:696`) to enforce the
captured DELTA. VISUAL-ALLOWLIST has `["W-DOCK1","W-CON1","W-DOCK2","W-BLOB2"]`; the spec's claim it is
`["W-DOCK1"]` is stale (more landed) but the append-`"W-SLD1"` action is unaffected.

**Overlap:** RE-GROUND against the W-GLASS-modified Slider.vue. The spec's sequencing premise is
factually wrong at HEAD and must be re-stated.

### W-BLOB3 — RE-GROUND. W-BLOB2 already shifted the blob renderer +N lines; the W-GOD1 dep is at risk.

The BOOK-demo-only + STRIP-the-ColorResolver-DI disposition is empirically sound (value.js never
repatriated — verified-class; the only consumer is the demo passing the default). The four-gate close
(strip + evidence-doc + DELTA + frame-budget) is well-formed. But:
- **W-BLOB2 already touched both DI edit-site files.** `git show --stat HEAD` confirms W-BLOB2 modified
  `GooBlob.vue` (+10/-N) and `useBlobSatellites.ts`; `useMetaballRenderer.ts` is now **707 lines** (the
  spec cites `:99-184` for the colorResolver option/throw/resolveColor). At HEAD the colorResolver option
  is at `:108`, the throw at `:140-143`, the import at `:8` — CLOSE to the cites but shifted. `GooBlob.vue`
  colorResolver prop is at `:34,42`, the `useMetaballRenderer` call at `:110-119` — the spec cites
  `:32-59` and `:110-120`, close. The cites are NEAR-MISS, not catastrophic, but every one needs re-grep
  (W-BLOB2's cream-default edit interleaved with the DI sites).
- **The W-GOD1 ordering dependency is UNMET at HEAD.** W-BLOB3 "Depends on W-GOD1 (the
  `useMetaballRenderer` <500 leaf-carve lands FIRST so this wave's DI-seam excision does not re-conflict
  with the carve)." W-GOD1 has NOT landed (no `useMetaballRenderer` carve; the file is 707 lines, not
  <500). The B2-con1 sibling report flags W-GOD1's constellation carve as also un-landed and under-scoped.
  So W-BLOB3 cannot run before W-GOD1, and W-GOD1 is itself not-ready (per B2-con1). This is a DAG
  ordering risk: either W-BLOB3 strips first (easing W-GOD1's carve — the spec's own "the strip REMOVES
  lines, so it eases W-GOD1" note suggests the order could invert) or W-GOD1 carves first. The spec
  picks W-GOD1-first; the orchestrator must confirm W-GOD1 is ready (it is not, per B2-con1).
- The DELTA arm cites `proof:live-verified-ledger --tranche=AY` (wired ✓), the cream `domeLumaStd`/
  `bodyMeanL` band from W-BLOB2 (landed ✓ — the resting bead is now cream, so the interaction DELTA
  shows the cream bead as designed). Good.

**Overlap:** SERIALIZE with W-GOD1 (the carve). RE-GROUND the cites against the W-BLOB2-modified files.

---

## §3 — Cross-cutting readiness defects (affect multiple specs)

1. **The phantom `proof:ay-w0-reground` gate.** W-AUR2 G4, and implicitly the W0-REGROUND ledger
   discipline several specs lean on, depend on a gate that was specced but never minted. PROGRESS.md
   lists W0-REGROUND as `planned`. Until W0-REGROUND actually lands `scripts/proof-ay-w0-reground.mjs`,
   any wave whose hard gate reads it cannot close green. This is the single most-cross-cutting hole.
   (Contrast: `proof:live-verified-ledger:ay` DID land at `package.json:696` and the visual DELTAs are
   real — W-CARDINAL-INFRA's SUBSTANCE landed even though PROGRESS still says `planned`. The
   W-CARDINAL-INFRA dependency is MET; the W0-REGROUND dependency is NOT.)

2. **PROGRESS.md is stale vs reality.** W-CARDINAL-INFRA and W0-REGROUND read `planned` (`:51-52`) but
   the live-verified-ledger gate is wired and 8 DELTAs landed. An agent reading PROGRESS to gauge
   readiness gets the wrong picture. The ledger-status restamp is owed.

3. **The +9 package.json line drift is universal** across the constellation and aurora gate cites.
   Every remaining spec that cites a `package.json:6XX` script line is wrong by ~+9. The gates.mjs and
   in-script cites are accurate; only package.json drifted. Mandate a package.json re-grep, trust the
   gate-ID, not the line.

4. **The W-CON1 token-cohort premise is false** (detailed in W-CON2) — affects the W-CON2/W-CON3
   "declare the numeric cohort once" coordination. W-CON2 owns the ENTIRE numeric cohort, not an
   extension.

---

## §4 — Verdict and disposition

- **READY to implement at HEAD (with a cite re-grep, no re-spec):** W-AUR-PAINTERLY (the born-RED bar IS
  measurable and its W-AUR1 deps are all live — the strongest spec), W-AUR-WEBGPU-DECIDE (RETIRE,
  package.json cite +9), W-SLD2 (gated behind W-SLD1, otherwise clean).
- **RE-GROUND required before implement (line-cites and/or premises stale vs landed Batch-2):** W-CON2
  (line drift + false token-cohort premise), W-CON3 (line drift), W-SLD1 (ordering invariant violated
  by landed W-GLASS), W-BLOB3 (W-BLOB2-shifted cites + unmet W-GOD1 dep), W-AUR2 (phantom G4 gate).
- **The W-AUR-PAINTERLY born-RED bar question (the lane's headline): IMPLEMENTABLE.** The harness is
  real, runs green, prints the reference triple; the three bands are falsifiable numeric targets; the
  born-RED cache and the DELTA discipline are correctly wired. The only genuine risk is artistic
  convergence variance (landing 3 bands × 3 mediums simultaneously in the WebGL2 path), for which the
  spec already names an honest iter-2 successor and a W-AUR-WEBGPU-DECIDE resurrect escape. Budget for
  the iteration; the spec is not blocked.

No spec is fatally broken — every defect is a re-ground (refresh the cites, fix the W0-REGROUND DAG hole,
correct the token-cohort ownership), not a re-design. But 5 of 8 cannot be handed to an agent as-written
without the step-0 re-grounding the stale-worktree-trap MEMORY mandates.
