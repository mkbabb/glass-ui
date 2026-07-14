# BI.W-P081 — ColorSwatch privatization — configurator-private color value control

**Status:** PLANNED
**Topological stratum:** BI.S19
**Formation family:** component-forms
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P081`

## Intent

Move under src/components/configurator/parts/color-swatch and remove its public entry unless a current tracked external import is proven. ColorSwatch becomes a Configurator-owned part with value/name/contrast/copy semantics; it is not a standalone public concept without external evidence.

## Exact scope

- Move under src/components/configurator/parts/color-swatch and remove its public entry unless a current tracked external import is proven.
- Bind the private/re-homed contract only through Configurator stories that edit live component and procedural color values: ColorSwatch becomes a Configurator-owned part with value/name/contrast/copy semantics; it is not a standalone public concept without external evidence.
- Remove the public export and standalone story identity in the same transaction; the owner composition imports the implementation directly and no compatibility alias, wrapper, or future-public placeholder survives.
- Exercise the relevant owner states through real integrations rather than an invented public specimen: opaque, alpha, invalid, contrast, copy, keyboard.
- Repoint every listed consumer/import/test/build/doc fact atomically, and keep visual/material refinement subordinate to the owning composition rather than turning the helper into a second product concept.

## File manifest (14)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 2 | modify | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 3 | modify | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 6 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 7 | modify | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 8 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 9 | rename | src/components/color-swatch/ColorSwatch.vue | src/components/configurator/parts/color-swatch/ColorSwatch.vue | — | BI.W-P008 |
| 10 | rename | src/components/color-swatch/index.ts | src/components/configurator/parts/color-swatch/index.ts | — | BI.W-P008 |
| 11 | rename | src/components/color-swatch/README.md | src/components/configurator/parts/color-swatch/README.md | — | BI.W-P008 |
| 12 | create | tests-visual/owner-integrations/color-swatch.spec.ts | — | — | source base |
| 13 | create | tests/components/private/color-swatch.integration.test.ts | — | — | source base |
| 14 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (12)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/substrates/VizStudio.vue |
| imports | 2 | demo/stories/substrates/aurora.vue |
| imports | 3 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| tests | 1 | tests-visual/owner-integrations/color-swatch.spec.ts |
| tests | 2 | tests/components/private/color-swatch.integration.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/substrates/VizStudio.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P081/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** ColorSwatch becomes a Configurator-owned part with value/name/contrast/copy semantics; it is not a standalone public concept without external evidence.

**Required mutation bite:** Keep a public color-swatch export with no external runtime consumer; consumer-bearing evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P081`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.forms | browser | Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics. | Detach a Select error from aria-describedby.; Prevent NumberField native form value submission. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: configurator-color-swatch-opaque, configurator-color-swatch-alpha, configurator-color-swatch-invalid, configurator-color-swatch-contrast, configurator-color-swatch-copy, configurator-color-swatch-keyboard
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P052 | Every procedural control has one typed live writer, bounded semantics shared by every applicable renderer, exact serialization, and an observable effect. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-color-swatch`, `entry-graph`. The cursor also acquires 17 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/color-swatch at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=private.
