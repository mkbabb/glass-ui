# BI.W-P037 — Dock layer stack, focus, and Escape ownership

**Status:** PLANNED
**Topological stratum:** BI.S18
**Formation family:** dock
**Core centers:** C2_DOCK, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P037`

## Intent

Make nested Dock layers compose the central overlay/focus/escape stack with deterministic restoration.

## Exact scope

- Project Dock layer state into one stack with explicit modality, containment, dismissal, and restoration rules.
- Remove private focus-scope and escape listeners where the central overlay infrastructure owns them.
- Handle teleported targets, nested popovers, trigger removal, and route changes without closing the wrong layer.
- Verify keyboard, pointer outside, touch, Escape, and PRM transition paths.

## File manifest (10)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | create | src/components/_shared/overlay-stack.ts | — | — | source base |
| 2 | modify | src/components/dock/composables/dockContext.ts | — | — | BI.W-P008 |
| 3 | modify | src/components/dock/composables/isTeleportedTarget.ts | — | — | BI.W-P008 |
| 4 | modify | src/components/dock/DockLayer.vue | — | — | BI.W-P008 |
| 5 | modify | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 6 | modify | src/components/dock/DockStack.vue | — | — | BI.W-P008 |
| 7 | repair | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 8 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 9 | create | tests-visual/dock-layer-stack.spec.ts | — | — | source base |
| 10 | create | tests/components/dock/layer-stack.test.ts | — | — | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/_shared/overlay-stack.ts |
| imports | 2 | src/components/dock/DockTrigger.vue |
| tests | 1 | tests-visual/dock-layer-stack.spec.ts |
| tests | 2 | tests/components/dock/layer-stack.test.ts |
| docs | 1 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P037/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** The topmost eligible layer alone owns Escape/outside dismissal and focus restores to the correct live trigger or declared successor.

**Required mutation bite:** Open Dock layer plus nested Popover and make the first Escape close both; the stack test must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P037`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-layer-keyboard, dock-layer-popover, dock-layer-touch-outside, dock-layer-trigger-removed, dock-layer-route-change
Observables: stack order, focus containment/restoration, Escape owner, outside-click owner
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P029 | Every enter/exit/route transition has one owner, preserves focus/identity, updates instantly without visual residue when native motion is unavailable/reduced, and projects any advertised tempo scaling through every channel of the composed episode rather than only its focal panel. |
| BI.W-P033 | Every public Dock state is reachable through one typed transition machine and impossible combinations cannot be represented or induced by event order. |

Declared semantic locks: `component-dock-layers`, `overlay-stack`. The cursor also acquires 10 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
