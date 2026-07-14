# BI.W-P040 — Dock controls, iconography, and command semantics

**Status:** PLANNED
**Topological stratum:** BI.S19
**Formation family:** dock
**Core centers:** C2_DOCK
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P040`

## Intent

Make DockControl/Trigger and embedded commands visually coherent, semantically correct, and free of special-case styling paths.

## Exact scope

- Unify control/trigger press, selected, disabled, focus, label, badge, and icon geometry through shared control contracts.
- Remove Dock-only button clones and brand-color state rules.
- Define icon-only naming, coarse targets, destructive commands, and background-toggle semantics.
- Validate nested menu/popover controls without input-event leakage.

## File manifest (10)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | src/components/button/Button.vue | — | — | BI.W-P008 |
| 2 | modify | src/components/dock/DockBackgroundToggle.vue | — | — | BI.W-P008 |
| 3 | modify | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 4 | modify | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 5 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 6 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 7 | create | src/components/dock/styles/controls.css | — | — | source base |
| 8 | repair | src/components/tooltip/index.ts | — | — | BI.W-P008 |
| 9 | create | tests-visual/dock-controls.spec.ts | — | — | source base |
| 10 | create | tests/components/dock/controls.test.ts | — | — | source base |

## Repair manifest (6)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/button/Button.vue |
| imports | 2 | src/components/dock/index.ts |
| imports | 3 | src/components/tooltip/index.ts |
| tests | 1 | tests-visual/dock-controls.spec.ts |
| tests | 2 | tests/components/dock/controls.test.ts |
| docs | 1 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P040/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Dock commands use the same control/press/icon semantics as the library while preserving Dock state-machine ownership.

**Required mutation bite:** Remove the accessible name from an icon-only DockControl and require the rendered accessibility roster to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P040`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-control-keyboard, dock-control-pointer, dock-control-touch, dock-control-disabled, dock-control-nested-menu
Observables: accessible name, target geometry, press/focus state, event ownership
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P027 | All pressable concepts use one state/physics contract and remain visibly, accessibly pressed without moving the hit target or masking focus. |
| BI.W-P034 | Every exported Dock part has unique semantics and consumes the same machine/material/motion authorities; no synonym wrapper or duplicated prop path survives. |
| BI.W-P037 | The topmost eligible layer alone owns Escape/outside dismissal and focus restores to the correct live trigger or declared successor. |

Declared semantic locks: `component-dock-controls`. The cursor also acquires 10 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
