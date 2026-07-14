# BI.W-P070 — Skeleton apotheosis — content-shape loading placeholder

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** component-feedback
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P070`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Skeleton mirrors reserved content geometry, is hidden from AT when decorative, never loops under PRM, and does not substitute for explicit loading semantics.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Skeleton mirrors reserved content geometry, is hidden from AT when decorative, never loops under PRM, and does not substitute for explicit loading semantics.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: text, avatar, card, dark, prm, reduced-transparency.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (9)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 2 | modify | demo/stories/feedback/skeleton.vue | — | fb8ba6c20de783088b1c6bbee7af01c4ff732679 | source base |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | modify | src/components/skeleton/index.ts | — | — | BI.W-P008 |
| 5 | modify | src/components/skeleton/Skeleton.vue | — | — | BI.W-P008 |
| 6 | create | tests-visual/skeleton.contract.spec.ts | — | — | source base |
| 7 | repair | tests-visual/surface-axis.spec.ts | — | 914d4eb3581eeeb2f4e49dd9f0bf07949713fb22 | source base |
| 8 | create | tests/components/skeleton.contract.test.ts | — | — | source base |
| 9 | repair | tests/components/ui/skeleton/Skeleton.test.ts | — | 886d46e61aa6e144ac0c8823410ef74b5bcd8142 | source base |

## Repair manifest (10)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/dock-nav.css |
| imports | 2 | demo/stories/feedback/skeleton.vue |
| imports | 3 | tests-visual/surface-axis.spec.ts |
| imports | 4 | tests/components/ui/skeleton/Skeleton.test.ts |
| tests | 1 | tests-visual/skeleton.contract.spec.ts |
| tests | 2 | tests-visual/surface-axis.spec.ts |
| tests | 3 | tests/components/skeleton.contract.test.ts |
| tests | 4 | tests/components/ui/skeleton/Skeleton.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/feedback/skeleton.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P070/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Skeleton mirrors reserved content geometry, is hidden from AT when decorative, never loops under PRM, and does not substitute for explicit loading semantics.

**Required mutation bite:** Keep shimmer looping under PRM or let Skeleton cause layout shift on replacement; motion/layout evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P070`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.feedback | browser | Alert, notification, toast, badge, status, pulse, skeleton, and progress communicate distinct urgency/liveness without color-only or perpetual-motion ambiguity. | Give a decorative Pulse assertive live-region semantics.; Make error and success badges differ only by hue. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: skeleton-text, skeleton-avatar, skeleton-card, skeleton-dark, skeleton-prm, skeleton-reduced-transparency
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-skeleton`. The cursor also acquires 9 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/skeleton at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
