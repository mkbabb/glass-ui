# AX.W10 — Aurora options converge: ONE atoms door wired into the live config UI

**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07 (aurora core unblock — the canvas must
paint for the live-render gate to mean anything) · **Charter** AX.md §3 (the `### AX.W10` block, lines
661-702) + §1 row (line 118) + §2 band-C (lines 176-178) + §2b band-C precept row (line 215) + §4 note 7
(the OKLCh migration is LANDED; the four §2.3 seam findings — incl. the dead deriveScene door + the
temperature-pole magic-number — fold into W10/W11, NOT a migration redo) + §4 note 12 (publish-currency:
`deriveAurora`/`resolveAtoms` are AT HEAD, the consumer consume never triggered) · **Audit**
`deep-audit-corpus.json` slice `aurora-options-simplify` (index 9, findings F0-F4 — the primary) + slice
`aurora-color-spaces` (index 7, findings F2 + F4 — the dead deriveScene door + the temperature-pole model)
+ `constellation-analysis-corpus.json` slice `harden:aurora-blob-constellation` (index 29, finding 10 — the
density-split-or-ratify critique) + slice `idiom:speedtest` (index 14, finding 2 — the named consumer #2)
+ slice `hist:speedtest` (index 4, findings 1+6 — the AS-6→deriveAurora revert + the BOLD-axis input) +
slice `chronic-deferrals` (index 26, finding 4 — the speedtest-E2 forcing function).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **live-reachable-atoms-door-that-renders** witness that does NOT exist at HEAD
`eaba94f`. AW shipped the "simplify the options" mandate (§2.2) as **THREE parallel, non-converged
config-simplification surfaces, none wired into the live demo config UI** — the textbook
substrate-without-consumer anti-pattern (J invariant 10), and a fastidious green gate guarding a dead door
(the cardinal AX headless-green/visually-broken signature).

- **RED witness 1 (the headline — the door NOTHING ships through; grep + manifest-falsifiable).** The
  `≤7-atom` `resolveAtoms` door (`atoms.ts:161`) has exactly **ONE consumer — the ORPHANED
  `demo/stories/aurora/AuroraAtomsPanel.vue:37`** — and that panel is **NOT routed in the manifest**:
  `demo/stories/manifest.ts:95` registers only `s("substrates", "aurora", "Aurora", …)` → `AuroraConfigDock`,
  and `grep "AuroraAtomsPanel" demo/stories/manifest.ts` = **0**. The REAL shipped demo UI — `AuroraConfigDock.vue`
  + the six `config/*Layer.vue` panels (Medium/Palette/Nuclei/Composition/Flow/Texture) — mutates the full
  ~28-field `AuroraConfig` **DIRECTLY** (`MediumLayer.vue:22` `props.config.medium = …`) and **never calls
  `resolveAtoms`**. The falsifiable RED assertion: *no live story drives the aurora canvas through the
  simplified atoms door — the substrate built to "simplify the options" is bypassed by the only shipped UI.*
  (RED.)

- **RED witness 2 (the dead second door — grep-falsifiable).** `deriveScene(seed, mood)` (`color.ts:369`,
  shipped AW.W5 `3793573`) is a SECOND seed→full-config door with its own `AuroraMood =
  "atmospheric"|"painterly"|"vivid"|"muted"` union and its own `thirdsNuclei` prior — **exported on the public
  surface AND on `/api` (`api/index.ts:44` exports `AuroraMood`)** — yet has **ZERO non-test consumers**:
  `grep "deriveScene" src/ demo/` returns only its own def, the `index.ts` re-export, the `/api` type
  re-export, and a comment in `atoms.ts`. It is dead `/api` substrate (overfitting-audit: every src/ artefact
  needs ≥2 real sites or is a demo helper — `deriveScene` has 0). (RED.)

- **RED witness 3 (the duplicated priors — grep-falsifiable).** `thirdsZones` (`atoms.ts:101-124`) and
  `thirdsNuclei` (`color.ts:276-300`) are **near-identical duplicates** — same anchor table
  `[[0.33,0.33],[0.67,0.67],…]`, same paletteBias/valueBias/driftRadius/driftPhase construction, diverging
  only in trivial `MAX_NUCLEI` clamping. The mood→energy mapping exists TWICE with divergent vocabularies:
  `atoms.ts:77` `MOOD_ENERGY` (`calm`/`balanced`/`vivid`) vs `color.ts:314` `MOOD_RECIPE`
  (`atmospheric`/`painterly`/`vivid`/`muted`) — two mood vocabularies over the SAME four config fields. The
  shared-source discipline AW applied rigorously to COLOR (the `/color` leaf, `proof:single-color-core`) was
  never applied to the COMPOSITION priors. (RED.)

- **RED witness 4 (the noise control element has NO door — grep-falsifiable).** The user named the atoms as
  **"zones, noise, color (control elements)"** (§2.7). The shipped `AuroraAtoms` (`atoms.ts:44-61`) exposes
  `seed`/`harmony`/`mood`/`medium`/`textureAmount`/`motion`/`zones`/`interactivity` — COLOR is split awkwardly
  across seed+harmony+mood, ZONES is a **bare integer count** on a fixed `thirdsZones` prior (no arrangement
  character), and **NOISE is not an atom at all**: `grep "warpMode\|warpScale\|noiseOctaves" atoms.ts` = **0**;
  `warpAmount` is reached only indirectly as a mood side-effect. The named "noise" control element has no
  front door. (RED.)

- **RED witness 5 (silent-inert arms — `excise-or-fail` violation; line-falsifiable).** `applyTexture`
  (`atoms.ts:127-153`) has a `case "smooth": default:` arm whose body is an **empty no-op** ("the amount is
  inert (still TOTAL)") — `textureAmount` on a smooth medium silently does nothing. The `interactivity` atom's
  `flow`/`wake` axes are declared (`presets.ts` `AuroraInteractivity`) and passed through (`atoms.ts:226`) but
  only `light`+`scroll` are partially wired downstream (`frameLoop.ts:66` / `useAurora.ts:238`) — `flow`/`wake`
  are **silently inert**. Both are silent fall-throughs, not loud failures or honest absences (§0
  "excise or fail explicitly" violation). (RED.)

- **RED witness 6 (the green gate guards the dead door — the cardinal AX lesson, instantiated).**
  `proof:aurora-atoms-roundtrip` (`package.json:611` → `scripts/proof-aurora-atoms-roundtrip.mjs` →
  `tests/components/custom/aurora/atoms.test.ts`) is GREEN and rigorous (totality over a 2000+ combination
  fuzz, default-preservation deep-equal) — but it proves a property of a door **NOTHING SHIPS THROUGH**
  (witness 1) and asserts NOTHING about whether the door is reachable from a live story or renders a visible
  aurora. A fastidious green gate guarding dead substrate — §13 made literal. (RED.)

The wave is RED at HEAD on all six; the HardGate below drives each to GREEN (the door converges to ONE,
the live UI consumes it, and the gate's pass condition becomes "the simplified door is reachable AND
renders" — not "resolveAtoms is pure").

---

## Goal

Collapse to ONE consumer-facing atoms door (`resolveAtoms`), re-derived from the user's named
zones/noise/color control-element decomposition, consumed by the live `AuroraConfigDock` by default (the
raw `AuroraConfig` layers demoted to a true Advanced disclosure), with the atoms story routed in the
manifest — deleting the dead `deriveScene`/`AuroraMood`/`thirdsNuclei` second door and the duplicated
priors, so each atom visibly changes the live canvas.

---

## Scope (the gestalt fix — no workaround, no legacy, no parallel path)

The audit's root cause (slice 9 F0): AW shipped the simplification as **ADDITIVE substrate** (`resolveAtoms`
W6 `ceccb92`, `deriveScene` W5 `3793573`) layered ON TOP of the unchanged ~28-field config and the unchanged
full-schema demo dock, instead of **TRANSPOSING** the demo's control surface onto the simplified model. The
"nothing is removed from AuroraConfig; full schema stays as the Advanced escape hatch" framing (atoms.ts
header, DESIGN.md §5) is the root architectural error — it guaranteed two divergent doors plus a third
raw-config UI that never converge. The user asked to SIMPLIFY the options the consumer touches; the codebase
instead ADDED two more option models. The gestalt fix is **convergence to ONE door consumed by the live UI,
not another knob** — three sub-gestalts on one surface:

1. **ONE door — retire the dead parallel models.** `resolveAtoms` is the SURVIVOR (the consumed, two-tier,
   budget-clamped door). DELETE `deriveScene` + its `AuroraMood` union + the duplicated `thirdsNuclei`
   (zero consumers, no back-compat per the no-legacy rule), and REMOVE `AuroraMood` from `/api` (it is dead
   `/api` substrate). Fold `deriveScene`'s ONLY unique value — the mood→medium/temperatureShift/chromaEasing
   coupling — into the surviving door so one door covers it. De-duplicate: ONE `nucleiPrior(count,
   arrangement)` helper and ONE mood/energy table live in the surviving atoms module (hoist the rule-of-thirds
   prior to one source, the `/color`-leaf pattern). Fold the §2.3/F4 **temperature-pole model fix**:
   `applyTemperature` (`color.ts:255-262`) currently hardcodes a blind ±22° degree nudge while its comment
   claims poles at ~70°/~250° — make it actually interpolate the hue toward named `warmPole`/`coolPole` OKLCh
   anchors (via value.js `interpolateHue`), so the documented model IS the implementation and the poles become
   a single retunable source.

2. **Re-derive the atom set from the user's control elements (RATIFY-BEFORE-IMPL — see below).** Re-derive
   `AuroraAtoms` from the §2.7 control-element decomposition — **COLOR** (seed + harmony + a color-energy/
   saturation knob), **ZONES** (count + an *arrangement character* — scattered/composed/centred selecting
   among thirds/golden/radial priors, NOT a bare integer), **NOISE** (one organic-boundary knob fanning to
   `warpAmount`/`warpScale`/`warpMode` — the named "noise" element that currently has no door), plus **MEDIUM
   + texture + MOTION** (≤7 atoms; the mood→energy fan-out folds into the color/noise atoms rather than being
   its own knob). Make inapplicable knobs **structurally absent** (`textureAmount` only offered with a textured
   medium — never the silent-inert smooth no-op). Resolve the `interactivity` atom per the §0 excise-or-wire
   mandate: **fully wire `flow`/`wake` OR excise them from the shipped atom shape** until wired — no
   declared-but-dead axis ships.

3. **Wire the live UI + route the story.** Rebuild `AuroraConfigDock` to drive the `resolveAtoms`-backed
   atoms by DEFAULT (an "atoms" tab as the default surface; the six raw `config/*Layer.vue` panels become the
   genuine **Advanced disclosure**). Route the atoms story into `demo/stories/manifest.ts` (retire/absorb the
   orphaned `AuroraAtomsPanel.vue`). Demote `AuroraConfig` to a true internal author schema in DESIGN.md /
   README (REMOVE the "two-tier, nothing removed" framing). The `AuroraConfigDock` glass-atoms VISUAL restyle
   (preset-chip glass-tier active, tap-squish press-spring, data-slot sweep — the dropped AW.W29 scope) is
   **NOT W10** — it is **AX.W38** (sequenced AFTER W10 so the two configurator edits don't collide). W10 is the
   FUNCTIONAL atoms-door wiring ONLY.

**RATIFY-BEFORE-IMPL #1 — the atom-decomposition is RESEARCH-then-ratify, not a settled FileBounds.** The
slice-9 NOTES state the §2.7 zones/noise/color decomposition is "a design proposal for the converge wave to
ratify, not a settled spec," and the `harden:aurora-blob` finding 10 flags W10 as the densest aurora wave
(five distinct gestalts) at risk of an un-closeable wave if the atom re-derivation is treated as settled
FileBounds. **The charter KEEPS W10 as one wave but the cadence below makes the atom-decomposition an explicit
RESEARCH-then-RATIFY step** (the alternative the critique surfaced — splitting into W10a MECHANICAL convergence
+ W10b atom-MODEL re-derivation — is recorded as the fallback the orchestrator may elect if ratification
stalls; sub-gestalt 1 + 3 alone meet the §2.2 headline "one door consumed by the live UI," sub-gestalt 2 is
the perfection layer). **Recommended path:** keep ONE wave, ratify the zones/noise/color atom shape + the
arrangement-character enum + the flow/wake wire-or-excise verdict at the cadence research step BEFORE any
`atoms.ts` re-shape lands.

**RATIFY-BEFORE-IMPL #2 — the public `deriveAuroraFromColor` derive-color door (VAL-1, §4/charter line
691-695).** The §2.3 "derive-color variant" is the AS-P2 `deriveAuroraFromColor` PUBLIC door — the
highest-stakes kill-gated chronic (value.js VAL-1, carried 3+ tranches). `grep deriveAuroraFromColor src/
demo/` = **0** — the public surface does NOT exist at HEAD. **Decide HERE:** ship the public derive-color
surface gated on value.js K.W4 landing the 2nd live consumer, OR ratify the VAL-1 **KILL** if K.W4 closes
without it. **Recommended path:** do NOT ship `deriveAuroraFromColor` as a new public surface in W10 (it would
manufacture substrate-without-consumer — the exact trap this wave corrects); carry the "designed != adopted;
speedtest hand-rolls the equivalent but is not the published 2nd consumer" caveat in the audit ledger so AX
does not silently ship a second dead door. The existing internal `deriveAurora` (the palette composer) STAYS
(it has a real consumer — `resolveAtoms` calls it); only the seed+mood `deriveScene` door dies.

---

## SOTA deepening (aurora research)

The corpus backs the atoms-door convergence with a named design discipline and supplies the precise shape for
the zones/noise/color re-derivation + the seed→whole-scene unification. Cited facets: **26** (atom-based
parametric control — grounded against the existing `resolveAtoms`), **27** (generative parameter spaces),
**28** (preset/derive systems), **2/3** (harmony + seed→skyscape palette).

- **The atom model: zones / noise / color → ≤7 atoms is the corpus's exact decomposition [facet 26].** Facet
  26 names the target as `zones/noise/color/mood/medium/medium-texture/motion + seed/interactivity` collapsed
  onto `resolveAtoms`, and validates the existing door as "a pure/total/default-preserving clamped-override
  mapper over `DEFAULT_AURORA_CONFIG`." This IS the W10 §2.7 control-element decomposition — the corpus
  ratifies the shape the wave RATIFY-BEFORE-IMPL step was holding open.
- **The Disney "Principled" 5-rule discipline is the governing ruleset [facet 26].** Burley 2012: (1)
  intuitive not physical parameters, (2) as few as possible, (3) each normalized 0..1, (4) allow push beyond
  [0,1] where meaningful, (5) EVERY combination must be robust + plausible (no setting produces garbage). Rule
  5 is the backbone of the W10 "make inapplicable knobs structurally absent" + the "audit ALL atom pairs for
  garbage combinations" mandate. This is the design-discipline citation for the door itself.
- **Co-varying axes: one knob moves the entangled cluster, as a CONTINUOUS curve not a 3-point LUT [facet
  26].** Facet 26's co-varying-perceptual-axes note: a single mood/energy atom must move
  `saturation + warpAmount + valueVariance + breathDepth` TOGETHER along a monotone curve, "because moving any
  one alone reads as a defect." The corpus explicitly flags the existing `MOOD_ENERGY`/`MOTION_FIELDS` 3-point
  Records as the gap — "SOTA is a CONTINUOUS scalar t∈[0,1] driving a curve, not 3 named stops." This is the
  recorded successor shape for the W10 fan-out (named stops stay as labels on the axis); the wave may land the
  enum-collapse or carry it as a follow-up — the corpus is the basis either way.
- **Seed→whole-scene determinism is the named fix for the FIXED `thirdsNuclei` LUT [facets 26, 27, 2, 3].**
  Facet 26's Art-Blocks hash-to-traits + facet 27's golden-ratio / stratified-jittered placement: the `seed`
  atom should be the single source from which palette AND a stable nuclei arrangement (positions, drift
  phases, value bias) derive via the seeded PRNG (`src/utils/prng.ts` mulberry32+hashString — already in
  tree). The corpus names the exact defect W10's `thirdsNuclei`-deletion addresses: a fixed 6-anchor LUT means
  two seeds give identically-arranged scenes. Golden-ratio-conjugate (φ⁻¹=0.618) hue stepping +
  low-discrepancy/stratified scatter "stays composed for any count, deterministic for renderAt bakes." This
  routes into the W10 `nucleiPrior(count, arrangement)` consolidation — the arrangement-character enum
  (scattered/composed/centred) selects among priors, and the seed drives the scatter within each.
- **Total-function / clamped-budget contract is the corpus's robustness law [facet 27].** Facet 27: every
  parameter mapper is a pure TOTAL function — every input (incl. out-of-range/adversarial) yields a valid
  in-range result via clamp/saturate, never NaN/undefined/out-of-gamut. This is the existing `resolveAtoms`
  contract; the corpus validates it AND prescribes the offline verification: the weakest-output curation loop
  (Hobbs/Fidenza — "you curate the PARAMETER SPACE, not outputs") + optional MAP-Elites coverage illumination
  (bin over mood × medium × zone-count, prove no dead bins). This backs extending `proof:aurora-atoms-roundtrip`
  to a degeneracy/coverage sweep.
- **The preset/derive layering is three-tier with sparse overrides [facet 28].** Facet 28: primitive
  (`OklchStop[]`) → semantic (`AuroraConfig`) → instance (per-preset override), first-explicit-value-wins, and
  the SOTA stores only the DIFF from baseline (Unity prefab-variant / Figma extended-collection / Lightroom
  preset-as-instruction-set), NOT a full `structuredClone` snapshot — so an evolving `DEFAULT_AURORA_CONFIG`
  propagates to fields a preset never touched. This is design INPUT for how the atoms door + the Configurator's
  `cloneMode="per-preset"` relate; the sparse-override model is the corpus-named upgrade over the current
  full-clone snapshot (recorded, not a forced W10 edit — presets live in the consumer per the house rule).
- **Design-galleries as the primary "choose" UI [facet 26].** Facet 26's Design Galleries / Sequential
  Gallery (Marks 1997; Koyama 2020): dispersion-sampled thumbnail grids + a refine slider, so the user picks
  visually rather than tuning numbers. The existing `usePresetThumbnails` bake harness ALREADY supports the
  deterministic `renderAt` bakes — the corpus names the two-tier progressive disclosure as
  gallery-picker → ≤7 atoms → 28-field Advanced. This validates the W10 "atoms tab as default, raw config as
  Advanced" wiring and points at the gallery as the eventual primary surface (a forward note, not W10 scope).

**Reconciliation note:** the atom door (`resolveAtoms`) is confirmed-correct-shape by facet 26 — pure/total/
default-preserving. W10 does NOT re-invent it; it CONVERGES the live UI onto it + deletes the dead parallel
`deriveScene` door + re-derives the atom set per the corpus-ratified zones/noise/color decomposition. The
continuous-curve and seed→scene upgrades are named successors the corpus supplies; the wave lands the
convergence and carries the curve/scatter refinement as scoped here.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/aurora/composables/atoms.ts` | The atom-set re-shape (RATIFY first): re-derive `AuroraAtoms` to the zones/noise/color control elements — add the NOISE atom (one organic-boundary knob → `warpAmount`/`warpScale`/`warpMode`), the ZONES *arrangement character* enum, the COLOR energy/saturation knob; fold the `deriveScene` mood→medium/temperatureShift/chromaEasing coupling into `resolveAtoms`; replace the duplicated `thirdsZones` with the ONE hoisted `nucleiPrior(count, arrangement)`; make `applyTexture`'s smooth arm structurally absent (no silent no-op); wire-or-excise `flow`/`wake`. ONE mood/energy table. Strike the "Advanced escape hatch / nothing removed" header framing. |
| `src/components/custom/aurora/composables/color.ts` | DELETE `deriveScene` (`:369`) + the `AuroraMood` union (`:270`) + `MOOD_RECIPE` (`:314`) + `thirdsNuclei` (`:276-300`) — the dead second door + duplicated prior. KEEP `deriveAurora` (`:172`, real consumer). Fix `applyTemperature` (`:255-262`) to interpolate toward named `warmPole`/`coolPole` OKLCh anchors (value.js `interpolateHue`) — the documented-model-IS-the-implementation fix. Hoist the rule-of-thirds prior to ONE shared `nucleiPrior` (here or in atoms.ts — ONE home). |
| `src/components/custom/aurora/composables/index.ts` | Remove the `deriveScene` / `AuroraMood` re-exports (the barrel side of the dead-door deletion). |
| `src/api/index.ts` | Remove `AuroraMood` from the `/api` type block (`:44`) — dead `/api` substrate. The new atom-shape types (`AuroraZoneArrangement` / a NOISE atom type if the ratified shape names one) are added IF the converged door's public shape changes. |
| `demo/stories/aurora/AuroraConfigDock.vue` | Rebuild to drive the `resolveAtoms`-backed atoms by DEFAULT (an "atoms" tab as the default surface); the six raw `config/*Layer.vue` panels become the Advanced disclosure (the genuine escape hatch), NOT the default. NO glass-atoms VISUAL restyle (that is W38) — FUNCTIONAL wiring only. |
| `demo/stories/aurora/AuroraAtomsPanel.vue` | Retire/absorb into `AuroraConfigDock`'s atoms tab (the orphaned panel's logic becomes the live default), OR keep as the routed story body — ONE atoms surface survives, not two. |
| `demo/stories/manifest.ts` | Route the atoms story (`:95` or a new entry) so the simplified door is the live aurora story — close RED witness 1's manifest gap. |
| `scripts/proof-aurora-atoms-roundtrip.mjs` | EXTEND: keep the totality/default-preservation property test (it is good) + ADD the reachability assertion (the atoms story is routed in the manifest; the panel mounts and drives the canvas). The pass condition becomes "the door is reachable AND renders," not "resolveAtoms is pure." |
| `tests/components/custom/aurora/atoms.test.ts` | Update the property test for the re-derived atom shape (the noise atom, the arrangement enum, the structurally-absent texture-on-smooth); keep totality + default-preservation. |
| `tests-visual/aurora-atoms-render.spec.ts` | **NEW** (in the W00 `tests-visual/` workspace, OFF the publish surface) — the π-lane spec: route to the atoms story, toggle each atom (mood/medium/zones/noise), readback the canvas centre region, assert it VISIBLY changes between atom states. |
| `src/components/custom/aurora/README.md` + `DESIGN.md` | Demote `AuroraConfig` to an internal author schema; document the ONE atoms door as THE consumer surface; strike the "two-tier, nothing removed" framing; canonical-readme-shape pass on the door section. |
| `docs/tranches/AX/audit/W10-aurora-options-converge.json` | **NEW** — the wave's born-RED→GREEN audit artefact. |

**OUT of bounds:** `aurora.frag.ts` / `composition.glsl.ts` / `mediums.glsl.ts` / `brush.glsl.ts` (the
shader pipeline — W11/W12/W13); `aurora.wgsl.ts` / `renderMode.ts` / `WEBGPU_PARITY` (W07/W14); the `/color`
leaf `warmCatchLight` helper + the `samplePalette` palette-ramp gate-hole + the README "planned"→"landed"
sweep (W11); `Configurator.vue` / `ConfiguratorLayer.vue` / `ConfiguratorRow.vue` glass-atoms restyle
(W38); `useMetaballRenderer.ts` / blob (W08/W15/W16); speedtest's `auroraConfig.ts` (a SIBLING repo — the
adoption is an ANNEX W34 executes, glass-ui writes no sibling source).

---

## Disjointness (sibling waves it must NOT overlap)

W10 is in band C (AURORA, W10-W14 + W38), which runs AFTER the graphics blockers (W07/W08/W09) it depends
on. The disjointness contract against the shared-surface siblings:

- **vs W11 (aurora color seams — OKLCh catch-light + palette-ramp twin).** W11 also touches `color.ts` and
  the aurora README. **The shared file is `color.ts` — partition by symbol:** W10 owns the
  `deriveScene`/`AuroraMood`/`MOOD_RECIPE`/`thirdsNuclei` DELETION + the `applyTemperature` pole fix; W11 owns
  the `warmCatchLight` OKLCh-anchor helper (in the `/color` leaf, NOT aurora's `color.ts`) + the `samplePalette`
  palette-ramp hoist (in the shaders, not `color.ts`). The README is shared: W10 rewrites the **door/options
  section** (atoms convergence); W11 sweeps the **color "planned"→"landed"** lines. Coordinate the two README
  hunks (different sections). Sequence W10 BEFORE W11 on `color.ts` so W11 edits a file with the dead door
  already excised. Both dependsOn W07.
- **vs W38 (Aurora-Configurator glass-atoms RESTYLE — the dropped AW.W29).** **Both touch
  `AuroraConfigDock.vue`** — the highest collision risk. DISJOINT by CONCERN + by TIME: W10 owns the
  FUNCTIONAL wiring (the atoms tab drives `resolveAtoms`; the raw layers become Advanced); W38 owns the VISUAL
  restyle (preset-chip glass-tier active, tap-squish press-spring, transition-control, `data-slot` sweep). W38
  **dependsOn W10** (charter — the config-dock rework lands FIRST so the restyle skins the FINAL structure, not
  mid-churn debris). W10 must NOT pre-author any glass-tier/press-spring/`data-slot` styling; W38 must NOT
  re-wire the atoms↔config data flow. Sequential.
- **vs W07 (aurora core unblock).** W10 **dependsOn W07** — a "simplified options" door is meaningless while
  the canvas renders black, and the live-render π-gate cannot pass until W07 lands the non-black paint. W10
  touches NO shader/WGSL/renderMode file (all W07/W11/W14). W10 is the named OWNER of the per-atom visual-change
  assertion that W07's unblock makes meaningful. Sequential after W07.
- **vs W00 (the π lane).** W10 ADDS a sibling spec (`tests-visual/aurora-atoms-render.spec.ts`) in the W00
  `tests-visual/` workspace and composes W00's `proof:substrate-paints-color` non-black floor — NO edit to
  W00's `pi-manifest.ts` / `substrate-paints-color.spec.ts` / the workspace `package.json` member (W00 owns
  those). Sequential after W00 (transitively, via W07).
- **vs W34 (cross-repo consumer-adoption — speedtest E2).** The speedtest `auroraConfig.ts` → `resolveAtoms`
  adoption is a SIBLING-repo edit W34 executes via the annex W10 authors (the named-consumer-#2 obligation
  below). W10 writes NO speedtest source; it AUTHORS the adoption annex + the born-RED sibling-side gate
  contract. Disjoint by repo.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — one cohesive convergence + one dock-wiring fold).** Agent 1 (the library
  convergence): the `atoms.ts` re-shape (the ratified zones/noise/color atom set + the folded mood coupling +
  the ONE `nucleiPrior` + the structurally-absent texture-on-smooth + the flow/wake wire-or-excise), the
  `color.ts` DELETION (`deriveScene`/`AuroraMood`/`MOOD_RECIPE`/`thirdsNuclei`) + the `applyTemperature`
  pole-interpolation fix, the barrel + `/api` de-export. Agent 2 (the demo wiring): the `AuroraConfigDock`
  rebuild (atoms tab default; raw layers → Advanced), the `AuroraAtomsPanel` absorb, the manifest route, the
  README/DESIGN demotion. Lint + typecheck at every interval; the convergence + the dead-door deletion land in
  coordinated commits (the door must stay buildable — delete `deriveScene` consumers in the same commit as the
  def).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched tree: (a)
  confirms the live aurora story now drives the canvas through `resolveAtoms` (the atoms tab is the routed
  default, `AuroraConfigDock` calls `resolveAtoms`, NOT `props.config.x = …` for the atoms surface); (b)
  `grep deriveScene\|AuroraMood\|thirdsNuclei src/` = 0 (the second door + duplicated prior are GONE,
  including the `/api` re-export); (c) confirms the NOISE atom exists and fans to `warpMode`/`warpScale`/
  `noiseOctaves`; (d) confirms `textureAmount` on a smooth medium is structurally absent (the door does not
  offer/accept it), not silently inert; (e) confirms `flow`/`wake` are either fully wired OR excised from the
  shipped shape — no declared-but-dead axis. ADVERSARIAL twists: (i) re-derive the DEFAULT atoms and confirm
  `resolveAtoms(DEFAULT_ATOMS)` STILL deep-equals the wispy-sky default config (the convergence preserves the
  good default — totality + default-preservation survive the re-shape); (ii) confirm the `applyTemperature`
  pole fix produces the SAME perceptual warm/cool swing at the boundaries (a regression-safe re-derivation, not
  a visual break); (iii) confirm NO new public surface ships (`grep deriveAuroraFromColor src/` = 0 — the VAL-1
  door was NOT silently added).
- **Gate-author (≤1 agent — born-RED→GREEN).** Extends `proof:aurora-atoms-roundtrip` (reachability + render
  assertions added to the totality property test) + authors `tests-visual/aurora-atoms-render.spec.ts` (the
  π-lane per-atom visual-change readback). Confirms the EXTENDED gate FAILS at `eaba94f` (the panel is unrouted
  → the reachability assertion is RED) and PASSES on the patched tree (routed + renders + each atom visibly
  changes the canvas). Authors the speedtest-E2 adoption annex (the named-consumer-#2 contract routed to W34).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:aurora-atoms-roundtrip` (EXTENDED, kept fail-CLOSED)
+ `proof:aurora-atoms-render` (NEW, π-lane, fail-CLOSED, in the W00 `tests-visual/` workspace):

- **(a) totality + default-preservation KEPT** (the existing property test): `resolveAtoms` is TOTAL over the
  2000+ combination fuzz and `resolveAtoms(DEFAULT_ATOMS)` deep-equals the wispy-sky default `AuroraConfig`.
  This is necessary-but-not-sufficient — it stays, it is good.
- **(b) the door is REACHABLE — the missing closure** (the NEW assertion that catches RED witness 1): the
  atoms story is routed in `demo/stories/manifest.ts` (the manifest entry exists) AND the routed panel mounts
  and calls `resolveAtoms` to drive the canvas (NOT direct `props.config.x` mutation for the atoms surface).
  **Born-RED at HEAD** (the panel is unrouted — `grep` returns 0).
- **(c) the dead door is GONE** (catches RED witnesses 2+3): `grep "deriveScene\|AuroraMood\|MOOD_RECIPE\|
  thirdsNuclei"` over `src/` = 0 (including the `/api` re-export); there is exactly ONE `nucleiPrior` and ONE
  mood/energy table.
- **(d) the noise atom exists + inapplicable knobs are structurally absent** (catches RED witnesses 4+5): the
  re-derived `AuroraAtoms` carries a NOISE atom that fans to `warpMode`/`warpScale`/`noiseOctaves`;
  `textureAmount` is not offered/accepted on a smooth medium (no silent-inert arm); `flow`/`wake` are wired OR
  absent from the shipped shape.
- **(e) per-atom visual-change** (the π-lane render assertion — RED witness 6's closure): route to the live
  atoms story on a real device, toggle each atom (mood/medium/zones/noise) and read back the canvas centre
  region — assert it VISIBLY changes between states (the simplified options actually drive a visible aurora,
  not just a pure function). Composes W00's `proof:substrate-paints-color` non-black floor (meaningful only
  because W07 unblocked the paint).

This is a **runtime-observation** gate (the precept-valid artefact form per SPEC.md §Hard Gates — a real
render + readback + a routed-and-mounted reachability observation), NOT a grep-for-runtime-behaviour invalid
form. The `grep deriveScene = 0` check is a DELETION witness (a valid grep-form artefact — it asserts a source
ABSENCE, not a runtime behaviour); the per-atom visual-change is a real device readback.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the live aurora demo (`/substrates/aurora`, the routed atoms story) on a
WebGPU-or-WebGL2-capable machine, at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900) in **light AND dark**:

- **The simplified door is REACHABLE and is the DEFAULT surface:** the atoms tab opens FIRST; the ≤7 atoms
  (color/zones/noise/medium/texture/motion + the resolved mood coupling) are the visible controls; the raw
  ~28-field layers are tucked behind the Advanced disclosure (not the default chrome).
- **Each atom VISIBLY drives the canvas:** dragging the NOISE knob warps the organic boundary, the ZONES
  arrangement-character re-places the nuclei, the COLOR energy knob re-saturates — each is a felt, visible
  change on the live aurora, not an inert knob.
- **No dead/inert affordance:** no `textureAmount`-on-smooth dead slider, no declared-but-dead flow/wake
  control — inapplicable knobs are structurally absent.
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate — the atoms door reads
  as the clean ≤7-control surface the user described, at every viewport.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`: the BEFORE = the orphaned-panel/raw-config-dock
state, the AFTER = the routed atoms-default door, plus the per-atom visual-change deltas) is the binding close
criterion. This is the §13 headless-green/visually-broken gap closed for exactly this surface — the green
roundtrip gate that guarded a dead door now asserts the door is reachable AND renders.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against HEAD `eaba94f`: open
   the live `/substrates/aurora` demo, confirm `AuroraConfigDock` mutates the full config DIRECTLY (not via
   `resolveAtoms`), confirm `AuroraAtomsPanel` is unrouted (`grep manifest`), confirm `grep deriveScene\|
   AuroraMood\|thirdsNuclei` (the dead door + duplicated prior), confirm `grep warpMode atoms.ts` = 0 (no
   noise atom), confirm the smooth/flow/wake silent-inert arms. Record in `audit/W10-aurora-options-converge.json`
   as the born-RED baseline. Do NOT proceed on the audit's word — re-prove.
2. **RATIFY the atom decomposition (RESEARCH-then-ratify — RATIFY-BEFORE-IMPL #1).** Ratify the zones/noise/
   color atom shape: the NOISE organic-boundary knob's fan-out (`warpAmount`/`warpScale`/`warpMode`), the
   ZONES arrangement-character enum (scattered/composed/centred → thirds/golden/radial), the COLOR energy
   knob, the mood→coupling fold, the flow/wake wire-OR-excise verdict. Ratify VAL-1 (RATIFY-BEFORE-IMPL #2):
   do NOT ship `deriveAuroraFromColor`. The orchestrator signs off the atom shape BEFORE any `atoms.ts`
   re-shape lands. (Speedtest's `deriveAurora` sharpening — 5 perceptual axes incl. boldness/oiliness, the
   BOLD/OIL registers, derived-from-#CC2233 — is rich consumer-grounded INPUT for the atom ratification per
   `hist:speedtest` F6.)
3. **Extend the born-RED gate.** Extend `proof:aurora-atoms-roundtrip` (reachability + render) + author
   `tests-visual/aurora-atoms-render.spec.ts`; confirm it FAILS at HEAD (the panel is unrouted → reachability
   RED).
4. **The library convergence.** `atoms.ts`: re-shape to the ratified atom set (NOISE atom, ZONES arrangement,
   COLOR energy, the folded mood coupling, ONE `nucleiPrior`, structurally-absent texture-on-smooth, flow/wake
   wire-or-excise). `color.ts`: DELETE `deriveScene`/`AuroraMood`/`MOOD_RECIPE`/`thirdsNuclei` + fix
   `applyTemperature` to interpolate toward named OKLCh poles. De-export from the barrel + `/api`. Lint +
   typecheck — the tree stays buildable (the dead-door consumers die in the same commit as the def).
5. **The live UI wiring.** Rebuild `AuroraConfigDock` (atoms tab default; raw layers → Advanced); absorb/route
   `AuroraAtomsPanel`; route the atoms story in `manifest.ts`. Lint + typecheck.
6. **The README/DESIGN demotion.** Demote `AuroraConfig` to an internal author schema; document the ONE atoms
   door; strike the "two-tier, nothing removed" framing; canonical-readme-shape pass.
7. **The named-consumer-#2 annex.** Author the speedtest-E2 adoption annex (speedtest's 232-line
   `auroraConfig.ts` → a `resolveAtoms({…})` call + excise the dead `--aurora-1..6`/`--aurora-gradient`
   tokens) with a born-RED sibling-side gate contract, routed to W34. (glass-ui writes NO speedtest source —
   the annex is the handoff; the sibling session executes.)
8. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:aurora-atoms-roundtrip` (extended) + `proof:aurora-atoms-render`
   pass; run the VISUAL-TRUTH live audit (atoms-default reachable + each atom visibly drives the canvas);
   capture the paired-π BEFORE/AFTER + DELTA; write `audit/W10-aurora-options-converge.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W10-aurora-options-converge.json` — the born-RED→GREEN ledger: the six RED witnesses
  (the manifest-unrouted orphan, the `deriveScene`/`AuroraMood` zero-consumer grep, the `thirdsZones`≡
  `thirdsNuclei` duplication, the no-noise-atom grep, the silent-inert smooth/flow/wake arms, the green-gate-
  over-dead-door), the per-finding (slice 9 F0-F4 + slice 7 F2/F4) disposition with the OUT-of-scope routes
  (W11 catch-light/palette-ramp, W38 glass-atoms restyle, W34 speedtest adoption), the two RATIFY decisions
  recorded (the atom decomposition + the VAL-1 KILL/SHIP), and the post-wave GREEN measurements (the routed
  atoms-default door, the dead-door grep=0, the per-atom visual-change deltas).
- `tests-visual/aurora-atoms-render.spec.ts` — the NEW fail-CLOSED π-lane per-atom visual-change readback.
- The EXTENDED `proof:aurora-atoms-roundtrip` (totality + default-preservation KEPT, reachability + render
  ADDED).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the BEFORE = the raw-config-dock /
  orphaned-atoms-panel state, the AFTER = the routed atoms-default door, with per-atom (noise/zones/color)
  canvas-region deltas, at ≥ 3 viewports × light/dark.
- The speedtest-E2 adoption annex (the named-consumer-#2 contract + the born-RED sibling-side gate), routed to
  W34 — discharges the §13 chronically-deferred "speedtest E2 (aurora-derive)" item.
- The W00 `pi-manifest.ts` aurora-options row recorded (the atoms-door reachable + rendering — the live-render
  obligation discharged).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(aurora): proof:aurora-atoms-roundtrip extended born-RED — reachability + per-atom render (AX.W10)`
2. `feat(aurora): re-derive the atoms door from zones/noise/color control elements — add the NOISE atom, the ZONES arrangement character, the COLOR energy knob (AX.W10 slice9-F1)`
3. `refactor(aurora): kill the dead second door — delete deriveScene + AuroraMood + thirdsNuclei + the /api re-export; ONE nucleiPrior + ONE mood table (AX.W10 slice9-F0/F2 + slice7-F2)`
4. `fix(aurora): applyTemperature interpolates toward named warm/cool OKLCh poles — the documented model IS the implementation (AX.W10 slice7-F4)`
5. `fix(aurora): structurally absent inapplicable knobs — no silent texture-on-smooth no-op; flow/wake wired-or-excised (AX.W10 slice9-F4)`
6. `feat(demo): AuroraConfigDock drives the atoms door by default — raw config layers demoted to Advanced; route the atoms story (AX.W10 slice9-F0)`
7. `docs(aurora): demote AuroraConfig to internal author schema — ONE atoms door is the consumer surface (AX.W10)`
8. `chore(AX.W10): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + the speedtest-E2 adoption annex (→ W34)`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause, K W0. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W07 (aurora core unblock) — HARD.** A "simplified options" door is meaningless while the live canvas
  renders black, and the per-atom visual-change π-gate cannot pass until W07 lands the non-black paint. W10
  perfects a surface W07 unblocks. (Charter §3 `### AX.W10` dependsOn AX.W07.)
- **AX.W00 (π visual-runtime lane) — TRANSITIVE (via W07).** W00 stands up the `tests-visual/` workspace + the
  `proof:substrate-paints-color` non-black floor W10's per-atom render gate composes. W10 cannot close on the
  headless roundtrip gate alone — the §13 lesson this wave LITERALLY corrects.
- **Downstream:** **AX.W38 (Aurora-Configurator glass-atoms restyle) dependsOn W10** — the config-dock FUNCTIONAL
  rework lands FIRST so the W38 VISUAL restyle skins the FINAL atoms structure, not mid-churn debris (the two
  configurator edits must not collide). **AX.W11 (color seams)** edits `color.ts` AFTER W10 excises the dead
  door (partition by symbol). **AX.W34 (cross-repo adoption)** executes the speedtest-E2 annex W10 authors.
- **Parallel (NOT a dependency):** W10 runs after the graphics blockers but is otherwise concurrent with the
  other band-C perfection waves on disjoint files (W12 mediums substrate, W13 first-class mediums) — they touch
  the shader medium pipeline, not the options door.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`ceccb92`** (AW.W6 — the `resolveAtoms` ≤7-atom door ORIGIN) — shipped `resolveAtoms` + `AuroraAtoms` +
  the born-RED `proof:aurora-atoms-roundtrip` + the "two-tier configurator disclosure" framing, but layered it
  ADDITIVELY on top of the unchanged config and never wired it into the live UI (`AuroraConfigDock` still
  mutates the full config). The orphaned `AuroraAtomsPanel` (the sole consumer, unrouted) is born here. The
  author-energy atom framing (mood/medium/texture/motion) — not the user's structural zones/noise/color
  framing — is born here too.
- **`3793573`** (AW.W5 — the `deriveScene` door + `deriveAurora` color core ORIGIN) — shipped `deriveScene`
  with its own `AuroraMood` union + `MOOD_RECIPE` + `thirdsNuclei` prior, exported on the public surface AND
  `/api`, with ZERO non-test consumers from the start. The second door + the duplicated thirds prior + the
  divergent mood vocabulary are all born here — two doors one wave apart (W5 → W6), each re-solving seed→config
  independently rather than composing.
- **§4 note 7 (the OKLCh migration is LANDED — NOT a redo).** The §2.3 OKLCh headline is substantively DONE in
  code (the `/color` leaf + both GLSL shaders + the blob are value.js-Ottosson single-sourced; zero live
  HSL/YIQ/sRGB-luma paths). The four §2.3 findings are SEAM-level — and the dead `deriveScene` door + the
  `applyTemperature` magic-number model are TWO of them, folded into W10 (not a migration redo). W10 closes the
  options/derive seam; W11 closes the catch-light/palette-ramp seam.
- **§4 note 12 (publish-currency, not code, for the speedtest consume).** `deriveAurora`/`resolveAtoms` are AT
  HEAD `eaba94f`; speedtest is even pinned `^3.6.0` (`3be10905`) yet consumed NONE of it — its `auroraConfig.ts`
  AS-6 stopgap STILL present, its comment ("`deriveAurora` supersedes this stopgap at the next consume")
  describing a consume that never came. The W10 atoms door is the convergence that stopgap waits for; the
  consume reaches speedtest only via the AX cut PUBLISHING (the W41 dts-watch + W33/W34/W35 republish hinge).
  W10 builds the door; the publish is a separate hinge.
- **`harden:aurora-blob` finding 10 (the density-split-or-ratify critique).** Flagged W10 as the densest aurora
  wave (five gestalts in one "major" wave) and surfaced the W10a-MECHANICAL / W10b-atom-MODEL split as the
  fallback. The charter KEEPS one wave but makes the atom-decomposition an explicit RESEARCH-then-RATIFY cadence
  step (recorded in Scope RATIFY-BEFORE-IMPL #1).
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the orphaned-unrouted
  `AuroraAtomsPanel`, the `deriveScene` zero-consumer grep, the `thirdsZones`≡`thirdsNuclei` duplication, the
  no-noise-atom grep, and the green-gate-over-dead-door are all confirmed live here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-C (AURORA) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (Design-Axis-3 / J invariant 10 / overfitting-audit; LESSONS-
  LEARNED "Visual Load-Bearing-ness Bar").** This wave's CORE: the three parallel simplification surfaces are
  substrate-WITHOUT-consumer (resolveAtoms = 1 orphaned unrouted site, deriveScene = 0). W10 WIRES the survivor
  into the live UI (the routed atoms-default door — ≥2 real consumers: the live story + speedtest E2 as
  consumer #2) and RETIRES the dead door (deriveScene/AuroraMood — 0 consumers, no wiring target, the explicit
  retire rationale). The β-lane visual-load-bearing-ness bar is met by the per-atom visual-change π-gate (the
  consumer VISUALLY exercises the atom's intent at default tone), not just a consumer count. MUST NOT VIOLATE:
  do NOT ship `deriveAuroraFromColor` as a new public surface (it would re-manufacture the exact trap — VAL-1
  RATIFY records the KILL/gate disposition).
- **no-overfitting (README §Edicts; overfitting-audit; SPEC.md §Audit-verdict spot-verification gate).** The
  dead `deriveScene` + `AuroraMood` + `thirdsNuclei` are overfit dead `/api`/library substrate — DELETED with
  the spot-verified zero-consumer rationale (the cadence step-1 re-diagnosis is the spot-verification the
  precept mandates before a `delete-unused` retirement lands). The re-derived atom set is ≤7, each mapping to a
  user-NAMED control element — not a speculative knob ladder.
- **one-path / no-legacy-code (README §Edicts; §0 "no parallel config path").** Collapse THREE config-derivation
  paths (resolveAtoms / deriveScene / raw-config-dock) to ONE door + ONE `nucleiPrior` + ONE mood/energy table
  + ONE temperature model (the named-pole interpolation, not a divergent comment-vs-code). No back-compat alias
  for the deleted door (no-backwards-compat — clean break, MIGRATION.md notes the rename). MUST NOT VIOLATE: no
  second drifting copy survives.
- **excise-or-fail-explicitly (§0 mandate; fail-explicit on library-internal violations vs befitting-silent
  browser-API degradation — the two NEVER collapsed).** The silent-inert texture-on-smooth no-op + the
  declared-but-dead flow/wake axes are library-internal silent fall-throughs — RESOLVED by making them
  structurally absent (the door doesn't offer/accept the inapplicable knob) OR fully wired, never accepted-and-
  ignored. This is a library-internal honesty fix, distinct from any befitting-silent browser-API degradation
  (none in this wave's scope).
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates — no grep-only runtime gate;
  LESSONS-LEARNED "Runtime Truth Beats Source Claims").** The existing `proof:aurora-atoms-roundtrip` is a
  function-PURITY oracle that guards a dead door — the cardinal §13 failure. W10 EXTENDS it with a routed-and-
  mounted reachability observation + a per-atom device-render readback (the π-lane visual-change assertion).
  The wave's close is the executed live Playwright + frontend-design audit (the atoms-default door reachable +
  each atom visibly drives the canvas), never the roundtrip gate alone (the cardinal AX precept). The
  `grep deriveScene = 0` is a valid DELETION-witness grep-form (a source-absence artefact), not a grep-for-
  runtime-behaviour.
- **canonical-readme-shape (precepts/canonical-readme-shape.md).** The README/DESIGN demotion of `AuroraConfig`
  to an internal author schema + the ONE-atoms-door documentation is a canonical-readme-shape pass (the door is
  THE documented consumer surface; the "two-tier, nothing removed" framing is struck).
- **cross-repo coordination doc + sibling-baseline-capture (SPEC.md §Document Set; §2b band-N).** The named-
  consumer-#2 speedtest-E2 adoption is authored as an ANNEX (glass-ui writes no sibling source) routed to W34
  with a born-RED sibling-side gate — the wire-before-retire pattern at the constellation scope, discharging
  the §13 chronically-deferred "speedtest E2" item WITHOUT silently shipping substrate-without-consumer.
- **RATIFY-BEFORE-IMPL (two ratifications gate this wave).** (1) The zones/noise/color atom decomposition is a
  design proposal to RATIFY (slice-9 NOTES), not settled FileBounds — ratified at the cadence research step
  before any `atoms.ts` re-shape lands; the W10a/W10b split is the recorded fallback if ratification stalls.
  (2) The VAL-1 `deriveAuroraFromColor` public-derive-color door — recommended KILL (do not ship; carry the
  caveat) OR gate on value.js K.W4 landing the 2nd live consumer. Both ratifications are recorded in the audit
  ledger BEFORE impl; they bind the scope of the `atoms.ts` re-shape + the `/api` surface decision.
