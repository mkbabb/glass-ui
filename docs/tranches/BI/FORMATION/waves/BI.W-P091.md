# BI.W-P091 — Chip consolidation — compact selection/filter/action chip

**Status:** IMPLEMENTED — NATIVE ACCEPTANCE PENDING
**Topological stratum:** BI.S17
**Formation family:** component-forms
**Core centers:** C5_AUDACIOUS_TYPOGRAPHY, C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P091`

## Intent

Fold icon-chip into chip through slots/size semantics; delete IconChip export, wrapper, CSS, story, and compatibility name. One Chip family owns text/icon/removal/selection/action semantics with explicit modes. A plated icon is the static icon shape of Chip; an unplated glyph is an ordinary icon, not a second chip concept.

## Exact scope

- Fold icon-chip into chip through slots/size semantics; delete IconChip export, wrapper, CSS, story, and compatibility name.
- Make the binding concept contract explicit: One Chip family owns text/icon/removal/selection/action semantics with explicit modes; a plated icon is a static Chip shape and a bare glyph is not a Chip.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: static, selectable, selected, removable, icon, disabled, keyboard, touch.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Do not pour IconChip's historical axes into Chip. Delete the `icon`, `section`, `glyphSize`, `strokeWidth`, `bare`, `duotone`, `bloom`, `saturated`, `glass`, and `reveal` API rather than preserving them as deprecated props or aliases. Section colour becomes the existing `tone` input at the demo consumer, glass becomes `surface="glass"`, glyph geometry belongs to the slotted icon, reveal belongs to the consumer's shared motion facility, and a no-plate use renders the icon directly.
- Make root semantics explicit rather than inferred from slot content: `mode="static"` is non-focusable/non-pressed content, `mode="selectable"` owns boolean `v-model` and Toggle/`aria-pressed` behavior, `mode="action"` is a button, and `mode="removable"` exposes one separately named remove action. Local uses state the mode; icon content never silently turns a static chip into a control.
- Follow the current import/style/export graph, including the live production consume in `src/components/metric-cell/MetricCell.vue`, the root export in `src/index.ts`, and the `src/styles/index.css` import of `src/components/icon-chip/styles.css`. Completion deletes the old component directory, stylesheet import, selectors, `--icon-chip-*` variables, package/type projection, and runtime/current-doc references; `MIGRATION.md` may name the removed API only to state the clean break.

## Clean-break implementation acceptance

- The public family is one `Chip` export with the orthogonal `mode × shape × size × tone × surface` contract. `shape="icon"` changes geometry only; it never changes role, focusability, selection, or events.
- Static and selectable specimens resolve different native/ARIA semantics and different affordance states. A static plated glyph has no `button`/Toggle role, `tabindex`, `aria-pressed`, pointer cursor, hover lift, or press animation. Selectable/action/remove controls retain visible focus and coarse-target floors.
- MetricCell's current `IconChip bare` use becomes its existing ordinary slotted/raw icon treatment; it does not keep a hidden Chip dependency merely to reuse colour or glyph sizing.
- No `IconChip` component, export, subpath, type, compatibility alias, wrapper, CSS recipe, or duplicated icon-prop surface survives. No new proof/gate script is part of the implementation.

## File manifest (64)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/chassis/hero/category-hero.ts | — | a6c576bb063cdd67aea4ea13decc13d8f8b4b5e0 | source base |
| 2 | modify | demo/chassis/landing/SectionPreviewCard.vue | — | 7809e9f4ceff868495b4b8706e5a412ea1808dcd | source base |
| 3 | modify | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 4 | modify | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 5 | modify | demo/stories/containers/accordion.vue | — | a012fa904418def9518038bdd837c04e23cc155c | source base |
| 6 | modify | demo/stories/containers/collapsible.vue | — | 82f8a2682bdc0128a826ef1e57ebe3f12f2df3a9 | source base |
| 7 | modify | demo/stories/containers/command.vue | — | 7067af923a628500716d7fb0c54a4d4965f520d1 | source base |
| 8 | modify | demo/stories/containers/context-menu.vue | — | f7d6fb6f9734f01270dd5fc48a45b65977a4fb9f | source base |
| 9 | modify | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 10 | modify | demo/stories/containers/drawer.vue | — | b0b1fbdb6d48732d70330550ac61277f7592ca72 | source base |
| 11 | modify | demo/stories/containers/dropdown-menu.vue | — | 9057dacd0e81425206b638869ad6369e03e929d1 | source base |
| 12 | modify | demo/stories/containers/expandable-container.vue | — | c9af261acd7645d6554af40df87d84c834c5b517 | source base |
| 13 | modify | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 14 | modify | demo/stories/containers/hover-popover.vue | — | 8364ae7c7fa3aaf07de168d90e7a0e597f6d9864 | source base |
| 15 | modify | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 16 | modify | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 17 | modify | demo/stories/containers/tooltip.vue | — | 0b436063aac06de803e4bfb779094bb579f8ce1e | source base |
| 18 | modify | demo/stories/data/data-table.vue | — | b47491c40e8d819de70a227b54c02df4f732f3f0 | source base |
| 19 | modify | demo/stories/data/table.vue | — | 58c29de2277622d630fc2074b40a7401a2c48688 | source base |
| 20 | modify | demo/stories/display/badge.vue | — | 2cc390d89ae7e0025b00b6d7dac973ba36d09a85 | source base |
| 21 | modify | demo/stories/feedback/alert.vue | — | d628cf79272b92e3c9e1a2e508ff0ae65c34edaf | source base |
| 22 | modify | demo/stories/feedback/confirm-dialog.vue | — | dd4cd511fcc738f1d30c2b76e352f364425a17e2 | source base |
| 23 | modify | demo/stories/feedback/notification.vue | — | c045a0972e14e35eb96a91fb85de3c82a9075d17 | source base |
| 24 | modify | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 25 | modify | demo/stories/feedback/skeleton.vue | — | fb8ba6c20de783088b1c6bbee7af01c4ff732679 | source base |
| 26 | modify | demo/stories/feedback/toast.vue | — | 417f1d0a506f018bec760b95647ee2252498bf4b | source base |
| 27 | modify | src/components/metric-cell/MetricCell.vue | — | — | BI.W-P008 |
| 28 | create | demo/stories/forms/chip.vue | — | — | source base |
| 29 | modify | demo/stories/forms/combobox.vue | — | 857ff5e276a3da069b9ae7f1166f5c7d7062d057 | source base |
| 30 | modify | src/components/metric-cell/README.md | — | — | BI.W-P008 |
| 31 | modify | src/index.ts | — | — | BI.W-P009 |
| 32 | modify | src/styles/index.css | — | — | BI.W-P011 |
| 33 | delete | src/components/icon-chip/styles.css | — | — | BI.W-P011 |
| 34 | delete | demo/stories/forms/selectable-chip.vue | — | 38a31fcb4dd3a1d5438746f386d50dc8925ff91a | source base |
| 35 | modify | demo/stories/forms/slider.vue | — | 7ba393813177863acc6ac6a34292570759e6f5ec | source base |
| 36 | modify | demo/stories/forms/textarea.vue | — | 16be74fb5191866c650e157e8c4225b10bf28653 | source base |
| 37 | delete | demo/stories/forms/toggle-chip.vue | — | 53a4e6ae8ad38c21582673faa712354eeaf50fcb | source base |
| 38 | modify | demo/stories/forms/toggle.vue | — | 722406a90459974c446cd5c2ba961f6fa18ae67c | source base |
| 39 | modify | demo/stories/foundations/icons.vue | — | a0dfdf9a4e4f6943b3a675645ed144733a2156aa | source base |
| 40 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 41 | modify | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 42 | modify | demo/stories/navigation/header-ribbon.vue | — | 73618bbe3e1543d29a247fa35287fd908296e5ad | source base |
| 43 | modify | demo/stories/navigation/tabs.vue | — | d849c1b15f01f63b358ffed4cf82e61faed7bebb | source base |
| 44 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 45 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 46 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 47 | modify | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 48 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 49 | modify | src/components/chip/Chip.vue | — | — | BI.W-P008 |
| 50 | modify | src/components/chip/chipVariants.ts | — | — | BI.W-P008 |
| 51 | modify | src/components/chip/index.ts | — | — | BI.W-P008 |
| 52 | modify | src/components/chip/README.md | — | — | BI.W-P008 |
| 53 | modify | src/components/chip/types.ts | — | — | BI.W-P008 |
| 54 | delete | src/components/icon-chip/IconChip.vue | — | — | BI.W-P008 |
| 55 | delete | src/components/icon-chip/index.ts | — | — | BI.W-P008 |
| 56 | delete | src/components/icon-chip/README.md | — | — | BI.W-P008 |
| 57 | delete | src/components/icon-chip/types.ts | — | — | BI.W-P008 |
| 58 | create | tests-visual/chip.contract.spec.ts | — | — | source base |
| 59 | delete | tests-visual/icon-chip.spec.ts | — | e9084f25c76b4fcf80160ca4804d24862f412b74 | source base |
| 60 | modify | tests-visual/page-hierarchy.spec.ts | — | 4f71c39ac231d4c1dd0df4e344dce90df8fb641f | source base |
| 61 | modify | tests-visual/storybook-meta.spec.ts | — | 24ac892fc46cd02a7e852f715f4254b282d61e7b | source base |
| 62 | create | tests/components/chip.contract.test.ts | — | — | source base |
| 63 | modify | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |
| 64 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (59)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/category-hero.ts |
| imports | 2 | demo/chassis/landing/SectionPreviewCard.vue |
| imports | 3 | demo/stories/compositions/auth-shell.vue |
| imports | 4 | demo/stories/compositions/empty-states.vue |
| imports | 5 | demo/stories/containers/accordion.vue |
| imports | 6 | demo/stories/containers/collapsible.vue |
| imports | 7 | demo/stories/containers/command.vue |
| imports | 8 | demo/stories/containers/context-menu.vue |
| imports | 9 | demo/stories/containers/dialog.vue |
| imports | 10 | demo/stories/containers/drawer.vue |
| imports | 11 | demo/stories/containers/dropdown-menu.vue |
| imports | 12 | demo/stories/containers/expandable-container.vue |
| imports | 13 | demo/stories/containers/hover-card.vue |
| imports | 14 | demo/stories/containers/hover-popover.vue |
| imports | 15 | demo/stories/containers/popover.vue |
| imports | 16 | demo/stories/containers/sheet.vue |
| imports | 17 | demo/stories/containers/tooltip.vue |
| imports | 18 | demo/stories/data/data-table.vue |
| imports | 19 | demo/stories/data/table.vue |
| imports | 20 | demo/stories/display/badge.vue |
| imports | 21 | demo/stories/feedback/alert.vue |
| imports | 22 | demo/stories/feedback/confirm-dialog.vue |
| imports | 23 | demo/stories/feedback/notification.vue |
| imports | 24 | demo/stories/feedback/progress.vue |
| imports | 25 | demo/stories/feedback/skeleton.vue |
| imports | 26 | demo/stories/feedback/toast.vue |
| imports | 27 | src/components/metric-cell/MetricCell.vue |
| imports | 28 | demo/stories/forms/combobox.vue |
| imports | 29 | src/index.ts |
| imports | 30 | src/styles/index.css |
| imports | 31 | src/components/icon-chip/styles.css |
| imports | 32 | src/components/metric-cell/README.md |
| imports | 33 | demo/stories/forms/selectable-chip.vue |
| imports | 34 | demo/stories/forms/slider.vue |
| imports | 35 | demo/stories/forms/textarea.vue |
| imports | 36 | demo/stories/forms/toggle-chip.vue |
| imports | 37 | demo/stories/forms/toggle.vue |
| imports | 38 | demo/stories/foundations/icons.vue |
| imports | 39 | demo/stories/manifest.ts |
| imports | 40 | demo/stories/navigation/carousel.vue |
| imports | 41 | demo/stories/navigation/header-ribbon.vue |
| imports | 42 | demo/stories/navigation/tabs.vue |
| imports | 43 | tests-visual/icon-chip.spec.ts |
| imports | 44 | tests-visual/page-hierarchy.spec.ts |
| imports | 45 | tests-visual/storybook-meta.spec.ts |
| imports | 46 | tests/public-surface.spec.ts |
| tests | 1 | tests-visual/chip.contract.spec.ts |
| tests | 2 | tests-visual/icon-chip.spec.ts |
| tests | 3 | tests-visual/page-hierarchy.spec.ts |
| tests | 4 | tests-visual/storybook-meta.spec.ts |
| tests | 5 | tests/components/chip.contract.test.ts |
| tests | 6 | tests/public-surface.spec.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/forms/chip.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P091/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** One Chip family owns text/icon/removal/selection/action semantics through explicit root modes; a plated icon is a static Chip shape, a bare glyph is an ordinary icon, and IconChip has no surviving runtime or public surface.

**Required mutation bite:** Restore IconChip or one of its legacy props/selectors, render a static icon Chip through Toggle/button semantics, infer mode from slot content, or make a selectable/action/removable Chip lose its correct native role, focus, value, or named action; topology/selection/affordance evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P091`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: chip-static, chip-static-icon, chip-selectable, chip-selected, chip-action, chip-removable, chip-disabled, chip-keyboard, chip-touch
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P027 | All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-chip`, `component-icon-chip`, `entry-graph`. The cursor also acquires 64 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/chip + custom/icon-chip at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=fold.
