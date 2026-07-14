# BI.W-P074 — Toast consolidation — transient queued toast presentation

**Status:** PLANNED
**Topological stratum:** BI.S18
**Formation family:** component-feedback
**Core centers:** C10_CONSTELLATION_ASSAY, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P074`

## Intent

Fold ui/notification into ui/toast; delete the parallel Notification contract/export and migrate all consumers to one Toast queue/presentation family. One Reka-backed Toast family owns provider, queue, viewport, item, action, close, swipe, lifetime, tone, and announcements; Notification's parallel TransitionGroup engine is deleted.

## Exact scope

- Fold ui/notification into ui/toast; delete the parallel Notification contract/export and migrate all consumers to one Toast queue/presentation family.
- Make the binding concept contract explicit: One Reka-backed Toast family owns provider, queue, viewport, item, action, close, swipe, lifetime, tone, and announcements; Notification's parallel TransitionGroup engine is deleted.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: single, stack, action, swipe, timeout, destructive, keyboard, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (24)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | delete | demo/stories/feedback/notification.vue | — | c045a0972e14e35eb96a91fb85de3c82a9075d17 | source base |
| 2 | modify | demo/stories/feedback/toast.vue | — | 417f1d0a506f018bec760b95647ee2252498bf4b | source base |
| 3 | delete | demo/stories/feedback/toaster.vue | — | 5e22100e62b79c1695df757f8ca90d470986e6cb | source base |
| 4 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 5 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 6 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 7 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 8 | modify | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 9 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 10 | delete | src/components/notification/index.ts | — | — | BI.W-P008 |
| 11 | delete | src/components/notification/Notification.vue | — | — | BI.W-P008 |
| 12 | modify | src/components/toast/index.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/toast/Toast.vue | — | — | BI.W-P008 |
| 14 | modify | src/components/toast/ToastAction.vue | — | — | BI.W-P008 |
| 15 | modify | src/components/toast/ToastClose.vue | — | — | BI.W-P008 |
| 16 | modify | src/components/toast/ToastDescription.vue | — | — | BI.W-P008 |
| 17 | modify | src/components/toast/Toaster.vue | — | — | BI.W-P008 |
| 18 | modify | src/components/toast/ToastTitle.vue | — | — | BI.W-P008 |
| 19 | modify | src/components/toast/use-toast.ts | — | — | BI.W-P008 |
| 20 | create | tests-visual/notification-toast.contract.spec.ts | — | — | source base |
| 21 | create | tests/components/notification-toast.contract.test.ts | — | — | source base |
| 22 | modify | tests/components/ui/reka-binding-idiom.test.ts | — | 544ecfe931bc9b44fb59cc772b5a0b95a8d02485 | source base |
| 23 | modify | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |
| 24 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (17)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/feedback/notification.vue |
| imports | 2 | demo/stories/feedback/toast.vue |
| imports | 3 | demo/stories/feedback/toaster.vue |
| imports | 4 | demo/stories/manifest.ts |
| imports | 5 | tests/components/ui/reka-binding-idiom.test.ts |
| imports | 6 | tests/public-surface.spec.ts |
| tests | 1 | tests-visual/notification-toast.contract.spec.ts |
| tests | 2 | tests/components/notification-toast.contract.test.ts |
| tests | 3 | tests/components/ui/reka-binding-idiom.test.ts |
| tests | 4 | tests/public-surface.spec.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/feedback/toast.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P074/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** One Reka-backed Toast family owns provider, queue, viewport, item, action, close, swipe, lifetime, tone, and announcements; Notification's parallel TransitionGroup engine is deleted.

**Required mutation bite:** Restore Notification's second TransitionGroup queue or a second announcement/lifetime owner; topology/feedback evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P074`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.feedback | browser | Alert, notification, toast, badge, status, pulse, skeleton, and progress communicate distinct urgency/liveness without color-only or perpetual-motion ambiguity. | Give a decorative Pulse assertive live-region semantics.; Make error and success badges differ only by hue. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: notification-toast-single, notification-toast-stack, notification-toast-action, notification-toast-swipe, notification-toast-timeout, notification-toast-destructive, notification-toast-keyboard, notification-toast-prm
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

Declared semantic locks: `component-notification`, `component-toast`, `entry-graph`. The cursor also acquires 24 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/toast + ui/notification at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=fold.
