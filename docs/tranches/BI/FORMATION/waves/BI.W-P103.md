# BI.W-P103 — Popover apotheosis — nonmodal anchored interactive overlay

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** component-containers
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P103`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Popover owns controlled open, trigger/content linkage, positioning, focus, outside/Escape dismissal, portal, collision, and shared functional-glass overlay material.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Popover owns controlled open, trigger/content linkage, positioning, focus, outside/Escape dismissal, portal, collision, and shared functional-glass overlay material.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: closed, open, collision, nested, keyboard, touch, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (17)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 2 | repair | demo/stories/containers/hover-popover.vue | — | 8364ae7c7fa3aaf07de168d90e7a0e597f6d9864 | source base |
| 3 | modify | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 4 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 5 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 6 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 7 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 8 | modify | src/components/popover/index.ts | — | — | BI.W-P008 |
| 9 | modify | src/components/popover/Popover.vue | — | — | BI.W-P008 |
| 10 | modify | src/components/popover/PopoverContent.vue | — | — | BI.W-P008 |
| 11 | modify | src/components/popover/popoverContext.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/popover/PopoverTrigger.vue | — | — | BI.W-P008 |
| 13 | create | tests-visual/popover.contract.spec.ts | — | — | source base |
| 14 | repair | tests/components/custom/search/search-contracts.test.ts | — | be4e63a197aa3c42e6bbaced0dd1cb6beeb3e0d3 | source base |
| 15 | repair | tests/components/custom/timeline/continuous-structural-split.test.ts | — | b39cb22a8818c33ce5bc9168ed499ae5a2d07bfc | source base |
| 16 | create | tests/components/popover.contract.test.ts | — | — | source base |
| 17 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |

## Repair manifest (16)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/containers/hover-card.vue |
| imports | 2 | demo/stories/containers/hover-popover.vue |
| imports | 3 | demo/stories/containers/popover.vue |
| imports | 4 | demo/stories/dock/overview.vue |
| imports | 5 | demo/stories/manifest.ts |
| imports | 6 | demo/stories/motion/tempo.vue |
| imports | 7 | tests/components/custom/search/search-contracts.test.ts |
| imports | 8 | tests/components/custom/timeline/continuous-structural-split.test.ts |
| imports | 9 | tests/public-surface.spec.ts |
| tests | 1 | tests-visual/popover.contract.spec.ts |
| tests | 2 | tests/components/custom/search/search-contracts.test.ts |
| tests | 3 | tests/components/custom/timeline/continuous-structural-split.test.ts |
| tests | 4 | tests/components/popover.contract.test.ts |
| tests | 5 | tests/public-surface.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/containers/popover.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P103/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Popover owns controlled open, trigger/content linkage, positioning, focus, outside/Escape dismissal, portal, collision, and shared functional-glass overlay material.

**Required mutation bite:** Close a nested Popover when interacting with its teleported child or restore focus incorrectly; overlay evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P103`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: popover-closed, popover-open, popover-collision, popover-nested, popover-keyboard, popover-touch, popover-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P100 | One private focus scope serves Dialog/Drawer/Popover/Menu/Dock overlays with stack-aware containment and restoration; it is not a public visual component. |

Declared semantic locks: `component-popover`. The cursor also acquires 17 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/popover at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
