# BI.W-P124 — Easing apotheosis — interactive easing authoring/visualization

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** component-motion
**Core centers:** C1_LIQUID_GLASS, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P124`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. EasingPicker remains the glass-owned editor UI while value.js owns curve math; preview authority is explicit and proportionate—an editor-local normalized one-shot is distinct from reusable keyframes playback—and configurator is composition, not a second state engine.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: EasingPicker remains the glass-owned editor UI while value.js owns curve math; preview authority is explicit and proportionate—an editor-local normalized one-shot is distinct from reusable keyframes playback—and configurator is composition, not a second state engine.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: bezier, steps, drag, keyboard, copy, copy-denied, playback, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Verify /easing through the generated packed candidate and exact current value.js/keyframes.js owner fixtures; do not require a root/API barrel, src/api/index.ts, or any pre-flatten path spelling.
- Exercise causal Bezier-handle and steps edits through pointer, touch, and keyboard; both Bezier handles are named value-bearing focusable controls whose input paths share setHandle, while the plot's image semantics never swallow the controls.
- Make copy pending/success/denied states explicit with live feedback, full-literal manual recovery, cancellable reset ownership, and missing-Clipboard fixtures; an unchanged button after rejection is masked failure.
- Choose the preview authority from first principles: either retain a bounded normalized editor-local one-shot with truthful playing/restart/PRM/teardown semantics and no physical-playback claim, or consume keyframes.js when the public contract says keyframes-owned. A future seam or package import is not current authority.
- Use one content-width play/replay register; resolved width must exceed the icon square when text is present, and no btn-pill+glass-btn collision or fixed-file enrollment gap may survive.
- Keep EasingConfigurator as thin composition over the same picker state and reject any local staircase/cubic solver, second editor state, or physical playback loop that duplicates value.js/keyframes.js authority.

## File manifest (14)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 2 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 3 | create | demo/stories/motion/easing.vue | — | — | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | modify | src/components/easing/composables/useEasingPicker.ts | — | — | BI.W-P008 |
| 6 | modify | src/components/easing/constants.ts | — | — | BI.W-P008 |
| 7 | modify | src/components/easing/EasingConfigurator.vue | — | — | BI.W-P008 |
| 8 | modify | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 9 | modify | src/components/easing/index.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/easing/README.md | — | — | BI.W-P008 |
| 11 | repair | tests-visual/easing-primitive.spec.ts | — | b81d106ff88cc2b894c0cfbbce806abc8ccd8c80 | source base |
| 12 | create | tests-visual/easing.contract.spec.ts | — | — | source base |
| 13 | create | tests/components/easing.contract.test.ts | — | — | source base |
| 14 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |

## Repair manifest (8)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/manifest.ts |
| imports | 2 | demo/stories/motion/curve-gallery.vue |
| tests | 1 | tests-visual/easing-primitive.spec.ts |
| tests | 2 | tests-visual/easing.contract.spec.ts |
| tests | 3 | tests/components/easing.contract.test.ts |
| tests | 4 | tests/public-surface.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/motion/easing.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P124/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** EasingPicker remains the glass-owned editor UI while value.js owns curve math; preview authority is explicit and proportionate—an editor-local normalized one-shot is distinct from reusable keyframes playback—and configurator is composition, not a second state engine.

**Required mutation bite:** Remove the packed /easing export, implement curve math locally, make a Bezier handle pointer-only, swallow Clipboard denial, collapse a text playback action to the icon square, run travel under PRM, misstate preview ownership, stop a handle from changing the reparsable output, or create a second picker state in EasingConfigurator; dependency/form/focus/affordance/scenario evidence must turn RED while internal file movement alone remains neutral.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P124`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| behavior.forms | browser | Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics. | Detach a Select error from aria-describedby.; Prevent NumberField native form value submission. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| integrity.dependencies | device-free | Runtime, peer, optional, and development dependencies match actual import boundaries and the supported package contract. | Move a runtime dependency to devDependencies.; Add a second spring engine for an existing motion concept. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: easing-bezier, easing-steps, easing-drag, easing-keyboard, easing-copy, easing-copy-denied, easing-playback, easing-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P023 | Upstream engine primitives have one direct upstream authority; Glass publishes only owned motion bindings, semantic presets, and the /easing component, with no root-barrel mirror, reverse token-callable table, foreign-demo parity contract, stale displayed parameter, or consumer break. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-easing`. The cursor also acquires 14 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/easing at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
