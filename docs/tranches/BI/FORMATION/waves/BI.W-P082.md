# BI.W-P082 — DarkModeToggle clean rename — global appearance toggle

**Status:** PLANNED
**Topological stratum:** BI.S18
**Formation family:** component-display
**Core centers:** C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P082`

## Intent

Rename the vague /controls family/entry to /dark-mode-toggle and remove the collective alias; it contains exactly one concept. DarkModeToggle is one global-theme command with native pressed/state naming, shared press/motion, instant PRM, and no long-press novelty that obscures the basic action.

## Exact scope

- Rename the vague /controls family/entry to /dark-mode-toggle and remove the collective alias; it contains exactly one concept.
- Make the binding concept contract explicit: DarkModeToggle is one global-theme command with native pressed/state naming, shared press/motion, instant PRM, and no long-press novelty that obscures the basic action.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: light, dark, keyboard, touch, rapid, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Delete the passive prop, its pointer-styled div branch, and the passive no-op story: no tracked consumer requires it, a decorative icon is not a Toggle, and a no-op trigger contradicts the single-command concept.
- Delete the eclipse long-press novelty and its private timer. The one native button path owns click/Enter/Space/touch, pressed state, rapid reversal, shared press motion, cancellation, and PRM without a second gesture mode.

## File manifest (19)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/shell/configurator/preset-editor/store.ts | — | — | BI.W-P012 |
| 2 | modify | demo/shell/configurator/preset-editor/types.ts | — | — | BI.W-P012 |
| 3 | modify | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 4 | modify | demo/stories/display/dark-mode-toggle.vue | — | f5ea043e2dc9557a41c661d91898cd8cf27d23a7 | source base |
| 5 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 6 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 7 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 8 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 9 | modify | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 10 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 11 | rename | src/components/controls/DarkModeToggle.vue | src/components/dark-mode-toggle/DarkModeToggle.vue | — | BI.W-P008 |
| 12 | rename | src/components/controls/index.ts | src/components/dark-mode-toggle/index.ts | — | BI.W-P008 |
| 13 | rename | src/components/controls/README.md | src/components/dark-mode-toggle/README.md | — | BI.W-P008 |
| 14 | modify | tests-visual/atlas-flip.spec.ts | — | 2657c8d1ca6c3399c78d7b8d2af9ecf6f0854be9 | source base |
| 15 | modify | tests-visual/config-chassis.spec.ts | — | 0430686e92aa805706ed228803144a1f06775479 | source base |
| 16 | create | tests-visual/dark-mode-toggle.contract.spec.ts | — | — | source base |
| 17 | modify | tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts | — | a9bfa90fce482178b9a193f5ff2115e28891b0e4 | source base |
| 18 | create | tests/components/dark-mode-toggle.contract.test.ts | — | — | source base |
| 19 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (20)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/configurator/PresetEditor.vue |
| imports | 2 | demo/shell/configurator/preset-editor/store.ts |
| imports | 3 | demo/shell/configurator/preset-editor/types.ts |
| imports | 4 | demo/stories/display/dark-mode-toggle.vue |
| imports | 5 | demo/stories/manifest.ts |
| imports | 6 | tests-visual/atlas-flip.spec.ts |
| imports | 7 | tests-visual/config-chassis.spec.ts |
| imports | 8 | tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts |
| tests | 1 | tests-visual/atlas-flip.spec.ts |
| tests | 2 | tests-visual/config-chassis.spec.ts |
| tests | 3 | tests-visual/dark-mode-toggle.contract.spec.ts |
| tests | 4 | tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts |
| tests | 5 | tests/components/dark-mode-toggle.contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/display/dark-mode-toggle.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P082/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** DarkModeToggle is one global-theme command with native pressed/state naming, shared press/motion, instant PRM, and no long-press novelty that obscures the basic action.

**Required mutation bite:** Preserve /controls as an alias, retain passive as an action-styled no-op, keep the long-press eclipse fork, or let local theme state diverge from useGlobalDark; clean-break/state/affordance evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P082`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dark-mode-toggle-light, dark-mode-toggle-dark, dark-mode-toggle-keyboard, dark-mode-toggle-touch, dark-mode-toggle-rapid, dark-mode-toggle-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P027 | All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus. |
| BI.W-P029 | Every enter/exit/route transition has one owner, preserves focus/identity, updates instantly without visual residue when native motion is unavailable/reduced, and projects any advertised tempo scaling through every channel of the composed episode rather than only its focal panel. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-controls`, `entry-graph`. The cursor also acquires 22 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/controls at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=rename.
