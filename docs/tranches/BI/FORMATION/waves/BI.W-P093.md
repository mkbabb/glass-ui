# BI.W-P093 — Slider apotheosis — single/range numeric slider

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** component-forms
**Core centers:** C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P093`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Slider preserves min/max/step/orientation/single-range/keyboard/touch/form semantics and stable thumb/track geometry with no duplicate spring engine.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Slider preserves min/max/step/orientation/single-range/keyboard/touch/form semantics and stable thumb/track geometry with no duplicate spring engine.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: single, range, vertical, disabled, invalid, keyboard, touch, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (16)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 2 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 3 | modify | demo/stories/forms/slider.vue | — | 7ba393813177863acc6ac6a34292570759e6f5ec | source base |
| 4 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 5 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 6 | repair | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 7 | repair | demo/stories/substrates/aurora/OklchStopRow.vue | — | 04bc76245b45f57ec97a846de7b77a6a31d55c28 | source base |
| 8 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 9 | modify | src/components/slider/index.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/slider/Slider.vue | — | — | BI.W-P008 |
| 11 | repair | tests-visual/a11y-slider.spec.ts | — | c341b084d8724efbd6af4c488c3fee1d475560e6 | source base |
| 12 | create | tests-visual/slider.contract.spec.ts | — | — | source base |
| 13 | repair | tests-visual/tunable-anim.spec.ts | — | 8bc350c25fd2034d80e0cad1883963dcb43dbf0a | source base |
| 14 | create | tests/components/slider.contract.test.ts | — | — | source base |
| 15 | repair | tests/components/ui/slider/dock-hold-contract.test.ts | — | b5205fa8e1a0d06c38ab835e8de4171950701de7 | source base |
| 16 | repair | tests/scripts/proof-slider-two-only.detect.test.ts | — | 001a8dafbaf1409a582e3050cbd9bdef726666a1 | source base |

## Repair manifest (19)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/configurator/PresetEditor.vue |
| imports | 2 | demo/stories/dock/overview.vue |
| imports | 3 | demo/stories/forms/slider.vue |
| imports | 4 | demo/stories/manifest.ts |
| imports | 5 | demo/stories/motion/tempo.vue |
| imports | 6 | demo/stories/motion/typewriter.vue |
| imports | 7 | demo/stories/substrates/aurora/OklchStopRow.vue |
| imports | 8 | tests-visual/a11y-slider.spec.ts |
| imports | 9 | tests-visual/tunable-anim.spec.ts |
| imports | 10 | tests/components/ui/slider/dock-hold-contract.test.ts |
| imports | 11 | tests/scripts/proof-slider-two-only.detect.test.ts |
| tests | 1 | tests-visual/a11y-slider.spec.ts |
| tests | 2 | tests-visual/slider.contract.spec.ts |
| tests | 3 | tests-visual/tunable-anim.spec.ts |
| tests | 4 | tests/components/slider.contract.test.ts |
| tests | 5 | tests/components/ui/slider/dock-hold-contract.test.ts |
| tests | 6 | tests/scripts/proof-slider-two-only.detect.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/slider.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P093/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Slider preserves min/max/step/orientation/single-range/keyboard/touch/form semantics and stable thumb/track geometry with no duplicate spring engine.

**Required mutation bite:** Let range thumbs cross without declared behavior or make keyboard step differ from pointer; form evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P093`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.forms | browser | Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics. | Detach a Select error from aria-describedby.; Prevent NumberField native form value submission. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: slider-single, slider-range, slider-vertical, slider-disabled, slider-invalid, slider-keyboard, slider-touch, slider-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P032 | Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-slider`. The cursor also acquires 16 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/slider at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
