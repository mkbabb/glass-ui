# BI.W-P036 — Dock selection indicator and crossfade identity

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** dock
**Core centers:** C2_DOCK, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P036`

## Intent

Unify selected state, moving indicator, and panel crossfade as one identity-preserving selection projection.

## Exact scope

- Drive selection from Tabs-compatible value semantics and the Dock state machine.
- Use one shared selection indicator/morph path; delete brand-color bars, duplicate selected backgrounds, and independent crossfade clocks.
- Preserve active panel semantics, focus, content identity, and controlled updates while making every inactive/crossfading face inert, accessibility-hidden, non-tabbable, non-hit-testable, and form-inactive before it can receive input.
- Calibrate indicator geometry and crossfade timing for rail/bottom, keyboard/pointer/touch, and PRM.

## File manifest (11)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | src/components/dock/composables/dockCrossfadeContext.ts | — | — | BI.W-P008 |
| 2 | modify | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 3 | modify | src/components/dock/DockSection.vue | — | — | BI.W-P008 |
| 4 | repair | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 5 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 6 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 7 | create | src/components/dock/styles/crossfade.css | — | — | source base |
| 8 | create | src/components/dock/styles/selection.css | — | — | source base |
| 9 | repair | src/components/tabs/index.ts | — | — | BI.W-P008 |
| 10 | create | tests-visual/dock-selection.spec.ts | — | — | source base |
| 11 | create | tests/components/dock/selection.test.ts | — | — | source base |

## Repair manifest (6)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/dock/DockTrigger.vue |
| imports | 2 | src/components/dock/GlassDock.vue |
| imports | 3 | src/components/tabs/index.ts |
| tests | 1 | tests-visual/dock-selection.spec.ts |
| tests | 2 | tests/components/dock/selection.test.ts |
| docs | 1 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P036/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Dock selection has one semantic value, one indicator, and one transition owner; panel identity/focus survive every input path and exactly one active face contributes controls to accessibility, focus, hit-testing, and form state.

**Required mutation bite:** Add aria-pressed to Dock tabs, a second selected-background writer, or leave an opacity-zero inactive face's button focusable; selection/ownership/inactive-face checks must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P036`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-select-keyboard, dock-select-pointer, dock-select-touch, dock-controlled-update, dock-select-prm
Observables: ARIA selection, indicator geometry continuity, panel identity, focus, writer count
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P028 | Exactly one spatial-transition runner owns measurement and transforms; every morph preserves identity/focus and survives interruption. |
| BI.W-P034 | Every exported Dock part has unique semantics and consumes the same machine/material/motion authorities; no synonym wrapper or duplicated prop path survives. |

Declared semantic locks: `component-dock-selection`. The cursor also acquires 11 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
