# BI.W-P066 — Label apotheosis — form-control label

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** component-forms
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P066`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Label preserves native label association, required/optional annotation, disabled state, and no appearance wrapper semantics.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Label preserves native label association, required/optional annotation, disabled state, and no appearance wrapper semantics.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: associated, required, disabled, wrapped, narrow.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (27)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 2 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 3 | repair | demo/stories/compositions/form-validation.vue | — | 002cb58ae3e2c27bcccd4fa22703f7447a6cbf0a | source base |
| 4 | repair | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 5 | repair | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 6 | repair | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 7 | repair | demo/stories/data/tags-input.vue | — | 82920c7ce0a17d515f6815d03da15cddff321587 | source base |
| 8 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 9 | repair | demo/stories/forms/checks.vue | — | 04ec086e401a31129dc06379ef0b9db93f3e0d2b | source base |
| 10 | repair | demo/stories/forms/combobox.vue | — | 857ff5e276a3da069b9ae7f1166f5c7d7062d057 | source base |
| 11 | repair | demo/stories/forms/inputs.vue | — | 710a5484ef5c868f89a7ae6d141ef4ae6ad356e2 | source base |
| 12 | modify | demo/stories/forms/label.vue | — | ff08672dda7fc3631d36c3cf15b67b715c96e671 | source base |
| 13 | repair | demo/stories/forms/number-field.vue | — | 02a660baf3648e235ddd421edcd712775e3a48a6 | source base |
| 14 | repair | demo/stories/forms/select.vue | — | 831a46d8d8aed8a4c74eabd9d71c936b4ed72492 | source base |
| 15 | repair | demo/stories/forms/textarea.vue | — | 16be74fb5191866c650e157e8c4225b10bf28653 | source base |
| 16 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 17 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 18 | repair | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 19 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 20 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 21 | modify | src/components/label/index.ts | — | — | BI.W-P008 |
| 22 | modify | src/components/label/Label.vue | — | — | BI.W-P008 |
| 23 | repair | tests-visual/a11y-slider.spec.ts | — | c341b084d8724efbd6af4c488c3fee1d475560e6 | source base |
| 24 | create | tests-visual/label.contract.spec.ts | — | — | source base |
| 25 | repair | tests-visual/page-chassis.spec.ts | — | 27b8703f375e90ae36f7295e7f2813632ab30e99 | source base |
| 26 | repair | tests-visual/shell-config.spec.ts | — | 761c8f3e8c8b9229cf220249955239df5dc28d85 | source base |
| 27 | create | tests/components/label.contract.test.ts | — | — | source base |

## Repair manifest (29)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/configurator/PresetEditor.vue |
| imports | 2 | demo/stories/compositions/auth-shell.vue |
| imports | 3 | demo/stories/compositions/form-validation.vue |
| imports | 4 | demo/stories/containers/dialog.vue |
| imports | 5 | demo/stories/containers/popover.vue |
| imports | 6 | demo/stories/containers/sheet.vue |
| imports | 7 | demo/stories/data/tags-input.vue |
| imports | 8 | demo/stories/display/card.vue |
| imports | 9 | demo/stories/forms/checks.vue |
| imports | 10 | demo/stories/forms/combobox.vue |
| imports | 11 | demo/stories/forms/inputs.vue |
| imports | 12 | demo/stories/forms/label.vue |
| imports | 13 | demo/stories/forms/number-field.vue |
| imports | 14 | demo/stories/forms/select.vue |
| imports | 15 | demo/stories/forms/textarea.vue |
| imports | 16 | demo/stories/manifest.ts |
| imports | 17 | demo/stories/motion/springs.vue |
| imports | 18 | demo/stories/motion/typewriter.vue |
| imports | 19 | demo/stories/substrates/constellation.vue |
| imports | 20 | tests-visual/a11y-slider.spec.ts |
| imports | 21 | tests-visual/page-chassis.spec.ts |
| imports | 22 | tests-visual/shell-config.spec.ts |
| tests | 1 | tests-visual/a11y-slider.spec.ts |
| tests | 2 | tests-visual/label.contract.spec.ts |
| tests | 3 | tests-visual/page-chassis.spec.ts |
| tests | 4 | tests-visual/shell-config.spec.ts |
| tests | 5 | tests/components/label.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/forms/label.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P066/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Label preserves native label association, required/optional annotation, disabled state, and no appearance wrapper semantics.

**Required mutation bite:** Render a visual label without for/id or nesting association; form semantics must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P066`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

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
Scenarios: label-associated, label-required, label-disabled, label-wrapped, label-narrow
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-label`. The cursor also acquires 27 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/label at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
