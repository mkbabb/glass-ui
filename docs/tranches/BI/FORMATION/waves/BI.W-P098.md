# BI.W-P098 — LabeledField apotheosis — label/description/error/control field composition

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** component-forms
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P098`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. LabeledField composes Label and a slotted control through stable IDs, required/optional, description/error, invalid/disabled state, and layout only; it never restyles the control.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: LabeledField composes Label and a slotted control through stable IDs, required/optional, description/error, invalid/disabled state, and layout only; it never restyles the control.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: default, description, required, invalid, disabled, horizontal, narrow.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (26)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/compositions/form-validation.vue | — | 002cb58ae3e2c27bcccd4fa22703f7447a6cbf0a | source base |
| 2 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 3 | repair | demo/stories/containers/configurator.vue | — | 887b9cbd50fada0688b1f5f021e461c980d4390f | source base |
| 4 | modify | demo/stories/forms/labeled-field.vue | — | e1e428d93503b932882d8daca37d0fb2592571f3 | source base |
| 5 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 6 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 7 | repair | demo/stories/substrates/aurora/config/CompositionLayer.vue | — | 006b7735eaf3b6d90a881b15435dcb9c157a46aa | source base |
| 8 | repair | demo/stories/substrates/aurora/config/FlowLayer.vue | — | 5b6a771e32fd19376a182f3bed491397145f99b2 | source base |
| 9 | repair | demo/stories/substrates/aurora/config/NucleiLayer.vue | — | 4438e6a419d01461e7f2b1c72eeed053038505d6 | source base |
| 10 | repair | demo/stories/substrates/aurora/config/TextureLayer.vue | — | 5a24b0210d62fd9ea5cee40085eef2217e1bd0da | source base |
| 11 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 12 | repair | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue | — | 28724c06ddb8640c9f744ba4404e35b3fdf80730 | source base |
| 13 | repair | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue | — | b6bf718d53e096646d18ee29526283923c5e780a | source base |
| 14 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 15 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 16 | repair | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 17 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 18 | modify | src/components/labeled-field/index.ts | — | — | BI.W-P008 |
| 19 | modify | src/components/labeled-field/LabeledField.vue | — | — | BI.W-P008 |
| 20 | modify | src/components/labeled-field/LabeledInput.vue | — | — | BI.W-P008 |
| 21 | modify | src/components/labeled-field/LabeledSelect.vue | — | — | BI.W-P008 |
| 22 | modify | src/components/labeled-field/LabeledSlider.vue | — | — | BI.W-P008 |
| 23 | modify | src/components/labeled-field/LabeledSwitch.vue | — | — | BI.W-P008 |
| 24 | modify | src/components/labeled-field/README.md | — | — | BI.W-P008 |
| 25 | create | tests-visual/labeled-field.contract.spec.ts | — | — | source base |
| 26 | create | tests/components/labeled-field.contract.test.ts | — | — | source base |

## Repair manifest (20)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/compositions/form-validation.vue |
| imports | 2 | demo/stories/compositions/settings.vue |
| imports | 3 | demo/stories/containers/configurator.vue |
| imports | 4 | demo/stories/forms/labeled-field.vue |
| imports | 5 | demo/stories/manifest.ts |
| imports | 6 | demo/stories/motion/springs.vue |
| imports | 7 | demo/stories/substrates/aurora/config/CompositionLayer.vue |
| imports | 8 | demo/stories/substrates/aurora/config/FlowLayer.vue |
| imports | 9 | demo/stories/substrates/aurora/config/NucleiLayer.vue |
| imports | 10 | demo/stories/substrates/aurora/config/TextureLayer.vue |
| imports | 11 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 12 | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue |
| imports | 13 | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue |
| imports | 14 | demo/stories/substrates/blob.vue |
| imports | 15 | demo/stories/substrates/fourier-field.vue |
| imports | 16 | demo/stories/substrates/liquid-grid.vue |
| tests | 1 | tests-visual/labeled-field.contract.spec.ts |
| tests | 2 | tests/components/labeled-field.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/labeled-field.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P098/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** LabeledField composes Label and a slotted control through stable IDs, required/optional, description/error, invalid/disabled state, and layout only; it never restyles the control.

**Required mutation bite:** Generate IDs visually but fail to bind error description to the slotted control; form evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P098`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.forms | browser | Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics. | Detach a Select error from aria-describedby.; Prevent NumberField native form value submission. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| design.typography | browser | Display, heading, body, label, code, and numeric rungs are optically distinct, geometrically stable during font load, and never arbitrarily re-minted by a component. | Set a label larger than its section heading.; Remove size-adjust from the loading fallback and induce layout shift. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: labeled-field-default, labeled-field-description, labeled-field-required, labeled-field-invalid, labeled-field-disabled, labeled-field-horizontal, labeled-field-narrow
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P067 | Input preserves native value/form/autocomplete/inputmode/invalid semantics and consumes one field material/size contract. |

Declared semantic locks: `component-labeled-field`. The cursor also acquires 26 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/labeled-field at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
