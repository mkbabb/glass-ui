# BI.W-P042 — Dock demo dogfood and scenario-complete navigation

**Status:** PLANNED
**Topological stratum:** BI.S22
**Formation family:** dock
**Core centers:** C2_DOCK, C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P042`

## Intent

Make the first-party demo prove the exact public Dock architecture in rail and bottom modes without demo-only forks.

## Exact scope

- Rebuild SidebarDock and BottomDock as thin compositions of the final public anatomy and one shared navigation model.
- Exercise selection, layers, overflow, controls, context, dark, accessibility modes, narrow/wide, and route hold.
- Delete demo-local Dock CSS/state/motion replicas and stale scenario registrations.
- Expose scenario metadata for Safari/Chrome π and ensure route changes never echo from hydration/reconciliation.
- Dogfood the actual 390×844 bottom-Dock geometry and layer crossfade: every action remains reachable exactly once, inactive faces expose zero controls, all active controls are named, and ordinary navigation emits zero unexpected warnings.

## File manifest (22)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/router.ts | — | 7f88ba5492b7d6a17bc890f3898edd7d8749dfc2 | source base |
| 2 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 3 | modify | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 4 | modify | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 5 | modify | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 6 | modify | demo/shell/useContextualDockLayers.ts | — | 3593d181db2a3d7141a29d2667a2d83d75da7c27 | source base |
| 7 | modify | demo/shell/useShellNavDock.ts | — | ebc895e0b3bc51abcac8306b45705b33e98c122a | source base |
| 8 | modify | demo/stories/dock/controls.vue | — | 095063fe157f5fdfa8408e58f5e36556479d56b8 | source base |
| 9 | modify | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 10 | modify | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 11 | modify | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 12 | modify | demo/stories/dock/layers.vue | — | 11004b992842ec990758800b9ebbb1d1f2184067 | source base |
| 13 | modify | demo/stories/dock/overflow.vue | — | 90a35aabc6b8a25cdcef4f948b7d6bd2fd332223 | source base |
| 14 | modify | demo/stories/dock/overview.tile.vue | — | d1b9b592db308638a76a613635e566756936a930 | source base |
| 15 | modify | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 16 | modify | demo/stories/dock/rail.vue | — | f843e4e6adc30faad601cf75ece55aa37dd92272 | source base |
| 17 | modify | demo/stories/dock/sections.vue | — | 4834ba79ba910ee7a9938e210fdd94fa54e97e7d | source base |
| 18 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 19 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 20 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 21 | create | tests-visual/demo-dock.spec.ts | — | — | source base |
| 22 | create | tests/demo/dock-dogfood.test.ts | — | — | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/router.ts |
| imports | 2 | demo/shell/AppShell.vue |
| imports | 3 | demo/stories/manifest.ts |
| tests | 1 | tests-visual/demo-dock.spec.ts |
| tests | 2 | tests/demo/dock-dogfood.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P042/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Demo navigation is a thin real consumer of the published Dock and exercises every declared state without a local behavior/style fork, hidden/inactive action, unnamed control, warning storm, or mobile reachability gap.

**Required mutation bite:** Add a demo-only selection state, leave one inactive crossfade button in the accessibility tree, or keep an opacity-zero mobile facet tabbable; dogfood/import-boundary/accessibility checks must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P042`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| demo.gestalt | browser | The demo reads as one intentional product: warm field, functional glass, audacious typographic hierarchy, restrained color, and concept-driven motion without page-local design forks. | Restore a generic teal-gradient hero on one route.; Give every card an independent glow and pill title. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: demo-dock-rail, demo-dock-bottom, demo-dock-overflow, demo-dock-layer, demo-dock-route-hold, demo-dock-accessibility
Observables: public-only imports, route stability, focus/selection, material/motion coherence, scenario coverage
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P040 | Dock commands use the same control/press/icon semantics as the library while preserving Dock state-machine ownership. |
| BI.W-P041 | Dock owns no private clock/physics engine, required geometry tokens resolve without masking, and all motion remains bounded, interruptible, input-appropriate, warning-free, and still under PRM. |

Declared semantic locks: `demo-dock`, `demo-shell`. The cursor also acquires 22 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
