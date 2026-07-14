# BI.W-P038 — Dock overflow as an explicit layout state

**Status:** PLANNED
**Topological stratum:** BI.S19
**Formation family:** dock
**Core centers:** C2_DOCK
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P038`

## Intent

Replace heuristic hiding and search/fit forks with one measurable overflow state that preserves every action.

## Exact scope

- Measure available geometry through shared resize lifecycle and project visible/overflowed items deterministically.
- Expose overflow through a semantic menu/layer without duplicating actions or changing selection identity.
- Delete magic count/width thresholds, hidden unreachable controls, and resize feedback loops.
- Validate resize, font load, zoom, localization, rail/bottom, coarse/fine, and keyboard navigation.

## File manifest (9)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | src/components/dock/composables/useDockOverflowFit.ts | — | — | BI.W-P008 |
| 2 | modify | src/components/dock/composables/useDockSearch.ts | — | — | BI.W-P008 |
| 3 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 4 | modify | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 5 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 6 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 7 | create | src/components/dock/styles/overflow.css | — | — | source base |
| 8 | create | tests-visual/dock-overflow.spec.ts | — | — | source base |
| 9 | create | tests/components/dock/overflow.test.ts | — | — | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/dock/DockLayerGroup.vue |
| imports | 2 | src/components/dock/GlassDock.vue |
| tests | 1 | tests-visual/dock-overflow.spec.ts |
| tests | 2 | tests/components/dock/overflow.test.ts |
| docs | 1 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P038/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every Dock action remains reachable exactly once and overflow derives from measured geometry without feedback loops or fixed item counts.

**Required mutation bite:** Hide one overflowed item without adding it to the overflow layer and require reachability to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P038`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-overflow-resize, dock-overflow-font-load, dock-overflow-zoom, dock-overflow-keyboard, dock-overflow-touch
Observables: action bijection, selection identity, focus order, measurement stability, no resize loop
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P034 | Every exported Dock part has unique semantics and consumes the same machine/material/motion authorities; no synonym wrapper or duplicated prop path survives. |
| BI.W-P037 | The topmost eligible layer alone owns Escape/outside dismissal and focus restores to the correct live trigger or declared successor. |

Declared semantic locks: `component-dock-overflow`. The cursor also acquires 9 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
