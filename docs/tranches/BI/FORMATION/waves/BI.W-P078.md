# BI.W-P078 — AnimatedDigit apotheosis — numeric digit transition

**Status:** PLANNED
**Topological stratum:** BI.S18
**Formation family:** component-data
**Core centers:** C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P078`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. AnimatedDigit preserves numeric identity, tabular geometry, direction, rapid-update interruption, locale, AT announcement policy, and PRM instant state.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: AnimatedDigit preserves numeric identity, tabular geometry, direction, rapid-update interruption, locale, AT announcement policy, and PRM instant state.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: increment, decrement, rapid, negative, locale, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (10)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | create | demo/stories/data/animated-digit.vue | — | — | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | repair | demo/stories/motion/animated-digit.vue | — | 037ce8e85cfc0777dc4f8c60a991c5e3fb889e34 | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | modify | src/components/animated-digit/AnimatedDigit.vue | — | — | BI.W-P008 |
| 6 | modify | src/components/animated-digit/index.ts | — | — | BI.W-P008 |
| 7 | modify | src/components/animated-digit/README.md | — | — | BI.W-P008 |
| 8 | create | tests-visual/animated-digit.contract.spec.ts | — | — | source base |
| 9 | create | tests/components/animated-digit.contract.test.ts | — | — | source base |
| 10 | repair | tests/components/custom/animated-digit/AnimatedDigit.test.ts | — | c17a0ae029303bfc60dbf6df2fc4712c442480c9 | source base |

## Repair manifest (8)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/manifest.ts |
| imports | 2 | demo/stories/motion/animated-digit.vue |
| imports | 3 | tests/components/custom/animated-digit/AnimatedDigit.test.ts |
| tests | 1 | tests-visual/animated-digit.contract.spec.ts |
| tests | 2 | tests/components/animated-digit.contract.test.ts |
| tests | 3 | tests/components/custom/animated-digit/AnimatedDigit.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/data/animated-digit.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P078/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** AnimatedDigit preserves numeric identity, tabular geometry, direction, rapid-update interruption, locale, AT announcement policy, and PRM instant state.

**Required mutation bite:** Let rapid updates announce every intermediate digit or shift width; data/continuity evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P078`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.data | browser | Tables, data tables, metrics, progress, timeline, and virtual lists preserve semantic structure, stable identity, readable density, and truthful loading/empty/error state. | Use array index as a row identity.; Announce indeterminate progress as a false percentage. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: animated-digit-increment, animated-digit-decrement, animated-digit-rapid, animated-digit-negative, animated-digit-locale, animated-digit-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P029 | Every enter/exit/route transition has one owner, preserves focus/identity, updates instantly without visual residue when native motion is unavailable/reduced, and projects any advertised tempo scaling through every channel of the composed episode rather than only its focal panel. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-animated-digit`. The cursor also acquires 10 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/animated-digit at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
