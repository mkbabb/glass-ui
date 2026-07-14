# BI.W-P033 — Dock deterministic state machine

**Status:** PLANNED
**Topological stratum:** BI.S14
**Formation family:** dock
**Core centers:** C2_DOCK, C5_AUDACIOUS_TYPOGRAPHY, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P033`

## Intent

Make selection, context, layer, hold, overflow, morph, and escape one explicit public state machine rather than interacting composable side effects.

## Exact scope

- Define states/events/guards/effects for idle, selected, layered, held, overflowing, morphing, and disabled conditions.
- Collapse useDockState/context/hold/click-integrity/popover forks into one transition authority with typed projections.
- Reject impossible combinations and make controlled/uncontrolled ownership explicit.
- Test event-order invariance, hydration, interruption, and nested dock independence.

## File manifest (13)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 2 | modify | src/components/dock/composables/dockContext.ts | — | — | BI.W-P008 |
| 3 | modify | src/components/dock/composables/useDockClickIntegrity.ts | — | — | BI.W-P008 |
| 4 | modify | src/components/dock/composables/useDockHold.ts | — | — | BI.W-P008 |
| 5 | modify | src/components/dock/composables/useDockPopover.ts | — | — | BI.W-P008 |
| 6 | modify | src/components/dock/composables/useDockState.ts | — | — | BI.W-P008 |
| 7 | create | src/components/dock/dock-machine.ts | — | — | source base |
| 8 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 9 | repair | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 10 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 11 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 12 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 13 | create | tests/components/dock/dock-machine.test.ts | — | — | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/dock/DockLayerGroup.vue |
| imports | 2 | src/components/dock/DockTrigger.vue |
| imports | 3 | src/components/dock/GlassDock.vue |
| imports | 4 | src/components/dock/index.ts |
| tests | 1 | tests/components/dock/dock-machine.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P033/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every public Dock state is reachable through one typed transition machine and impossible combinations cannot be represented or induced by event order.

**Required mutation bite:** Allow two exclusive layers to be open after reordered events and require model/property tests to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P033`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |

## π obligation

Device-free: The state model is device-free; following Dock waves bind rendered projections.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P024 | A motion concept has one current name, one writer, and real runtime product ownership; no old import, prop, token, class, directive, runtime branch, prose future-consumer record, path-existence tally, alias definition, or unit test preserves or self-justifies a retired contract. |

Declared semantic locks: `component-dock-machine`. The cursor also acquires 13 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
