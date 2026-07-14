# BI.W-P088 — Switch apotheosis — binary immediate setting

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** component-forms
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P088`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Switch has switch role/checked state, form participation, label/error linkage, shared press, and visible on/off distinction without duplicating Checkbox semantics.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Switch has switch role/checked state, form participation, label/error linkage, shared press, and visible on/off distinction without duplicating Checkbox semantics.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: off, on, disabled, invalid, keyboard, touch, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (18)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 2 | repair | demo/stories/compositions/chassis.vue | — | 1e40177de1d581b4731c53f16600982e1592a005 | source base |
| 3 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 4 | repair | demo/stories/forms/checks.vue | — | 04ec086e401a31129dc06379ef0b9db93f3e0d2b | source base |
| 5 | repair | demo/stories/forms/label.vue | — | ff08672dda7fc3631d36c3cf15b67b715c96e671 | source base |
| 6 | create | demo/stories/forms/switch.vue | — | — | source base |
| 7 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 8 | repair | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 9 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 10 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 11 | modify | src/components/switch/index.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/switch/Switch.vue | — | — | BI.W-P008 |
| 13 | repair | tests-visual/config-chassis.spec.ts | — | 0430686e92aa805706ed228803144a1f06775479 | source base |
| 14 | repair | tests-visual/storybook-meta.spec.ts | — | 24ac892fc46cd02a7e852f715f4254b282d61e7b | source base |
| 15 | create | tests-visual/switch.contract.spec.ts | — | — | source base |
| 16 | create | tests/components/switch.contract.test.ts | — | — | source base |
| 17 | repair | tests/components/ui/reka-binding-idiom.test.ts | — | 544ecfe931bc9b44fb59cc772b5a0b95a8d02485 | source base |
| 18 | repair | tests/scripts/proof-demo-control-live.detect.test.ts | — | 296982276ddf961c7ad999b65f58571ee38cc570 | source base |

## Repair manifest (20)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/configurator/PresetEditor.vue |
| imports | 2 | demo/stories/compositions/chassis.vue |
| imports | 3 | demo/stories/display/card.vue |
| imports | 4 | demo/stories/forms/checks.vue |
| imports | 5 | demo/stories/forms/label.vue |
| imports | 6 | demo/stories/manifest.ts |
| imports | 7 | demo/stories/motion/typewriter.vue |
| imports | 8 | demo/stories/substrates/constellation.vue |
| imports | 9 | tests-visual/config-chassis.spec.ts |
| imports | 10 | tests-visual/storybook-meta.spec.ts |
| imports | 11 | tests/components/ui/reka-binding-idiom.test.ts |
| imports | 12 | tests/scripts/proof-demo-control-live.detect.test.ts |
| tests | 1 | tests-visual/config-chassis.spec.ts |
| tests | 2 | tests-visual/storybook-meta.spec.ts |
| tests | 3 | tests-visual/switch.contract.spec.ts |
| tests | 4 | tests/components/switch.contract.test.ts |
| tests | 5 | tests/components/ui/reka-binding-idiom.test.ts |
| tests | 6 | tests/scripts/proof-demo-control-live.detect.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/switch.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P088/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Switch has switch role/checked state, form participation, label/error linkage, shared press, and visible on/off distinction without duplicating Checkbox semantics.

**Required mutation bite:** Expose aria-pressed instead of checked or rely only on thumb color; semantics/affordance evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P088`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

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
Scenarios: switch-off, switch-on, switch-disabled, switch-invalid, switch-keyboard, switch-touch, switch-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P027 | All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus. |
| BI.W-P066 | Label preserves native label association, required/optional annotation, disabled state, and no appearance wrapper semantics. |

Declared semantic locks: `component-switch`. The cursor also acquires 18 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/switch at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
