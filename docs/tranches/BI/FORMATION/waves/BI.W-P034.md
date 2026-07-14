# BI.W-P034 — Dock public anatomy and one-concept parts

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** dock
**Core centers:** C2_DOCK
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P034`

## Intent

Reduce the Dock family to a coherent set of semantic parts with one styling/state authority and no wrapper synonyms.

## Exact scope

- Define the public anatomy for root, section, item/trigger, separator, layer, layer-group, stack, control, and crossfade only where each has distinct semantics.
- Fold or delete thin forwarding parts and duplicated props; expose slots/typed state instead of variant wrappers.
- Preserve APG Tabs semantics when the Dock composes selection; never fork keyboard rules.
- Regenerate exports/types/stories from the final anatomy and produce clean-break migration rows.

## File manifest (65)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 2 | repair | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 3 | repair | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 4 | repair | demo/shell/useShellNavDock.ts | — | ebc895e0b3bc51abcac8306b45705b33e98c122a | source base |
| 5 | repair | demo/stories/data/instrument-chassis.vue | — | 5439f87b703c75b49e6009a7a188de721529fd18 | source base |
| 6 | repair | demo/stories/display/dark-mode-toggle.vue | — | f5ea043e2dc9557a41c661d91898cd8cf27d23a7 | source base |
| 7 | repair | demo/stories/dock/controls.vue | — | 095063fe157f5fdfa8408e58f5e36556479d56b8 | source base |
| 8 | repair | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 9 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 10 | repair | demo/stories/dock/layers.vue | — | 11004b992842ec990758800b9ebbb1d1f2184067 | source base |
| 11 | repair | demo/stories/dock/overflow.vue | — | 90a35aabc6b8a25cdcef4f948b7d6bd2fd332223 | source base |
| 12 | repair | demo/stories/dock/overview.tile.vue | — | d1b9b592db308638a76a613635e566756936a930 | source base |
| 13 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 14 | repair | demo/stories/dock/rail.vue | — | f843e4e6adc30faad601cf75ece55aa37dd92272 | source base |
| 15 | repair | demo/stories/dock/sections.vue | — | 4834ba79ba910ee7a9938e210fdd94fa54e97e7d | source base |
| 16 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 17 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 18 | repair | demo/stories/navigation/header-ribbon.vue | — | 73618bbe3e1543d29a247fa35287fd908296e5ad | source base |
| 19 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 20 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 21 | repair | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 22 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 23 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 24 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 25 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 26 | modify | src/components/dock/composables/dockContext.ts | — | — | BI.W-P008 |
| 27 | modify | src/components/dock/composables/dockCrossfadeContext.ts | — | — | BI.W-P008 |
| 28 | modify | src/components/dock/composables/dockMorphContext.ts | — | — | BI.W-P008 |
| 29 | modify | src/components/dock/composables/dockMorphMeasure.ts | — | — | BI.W-P008 |
| 30 | modify | src/components/dock/composables/index.ts | — | — | BI.W-P008 |
| 31 | modify | src/components/dock/composables/isTeleportedTarget.ts | — | — | BI.W-P008 |
| 32 | modify | src/components/dock/composables/useDockClickIntegrity.ts | — | — | BI.W-P008 |
| 33 | modify | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 34 | modify | src/components/dock/composables/useDockHold.ts | — | — | BI.W-P008 |
| 35 | modify | src/components/dock/composables/useDockOverflowFit.ts | — | — | BI.W-P008 |
| 36 | modify | src/components/dock/composables/useDockPopover.ts | — | — | BI.W-P008 |
| 37 | modify | src/components/dock/composables/useDockSearch.ts | — | — | BI.W-P008 |
| 38 | modify | src/components/dock/composables/useDockShellProps.ts | — | — | BI.W-P008 |
| 39 | modify | src/components/dock/composables/useDockSpring.ts | — | — | BI.W-P008 |
| 40 | modify | src/components/dock/composables/useDockState.ts | — | — | BI.W-P008 |
| 41 | modify | src/components/dock/composables/useDockTouchGate.ts | — | — | BI.W-P008 |
| 42 | modify | src/components/dock/constants.ts | — | — | BI.W-P008 |
| 43 | modify | src/components/dock/DockBackgroundToggle.vue | — | — | BI.W-P008 |
| 44 | modify | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 45 | modify | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 46 | modify | src/components/dock/DockLayer.vue | — | — | BI.W-P008 |
| 47 | modify | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 48 | modify | src/components/dock/DockSection.vue | — | — | BI.W-P008 |
| 49 | modify | src/components/dock/DockSeparator.vue | — | — | BI.W-P008 |
| 50 | modify | src/components/dock/DockStack.vue | — | — | BI.W-P008 |
| 51 | modify | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 52 | modify | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 53 | modify | src/components/dock/index.ts | — | — | BI.W-P008 |
| 54 | modify | src/components/dock/README.md | — | — | BI.W-P008 |
| 55 | repair | tests/components/custom/dock/DockBackgroundToggle.a11y.test.ts | — | 08d99a61f41c114ea5ea4246e0e1a1dfa8de16af | source base |
| 56 | repair | tests/components/custom/dock/dockCrossfadeContext.readonly.test-d.ts | — | 8b24fa8ef12708be6e88f566ef93bdb8655e91cd | source base |
| 57 | repair | tests/components/custom/dock/DockLayerRail.a11y.test.ts | — | b5c60edf33885aa18e26d4ea60bb8de2cec018a0 | source base |
| 58 | repair | tests/components/custom/dock/GlassDock.motion-parity.test.ts | — | 03f68a301ae1eb8552f390992429ef9477d6821e | source base |
| 59 | repair | tests/components/custom/dock/GlassDock.scroll-overflow.test.ts | — | 8fd7eca10e3550a0f9d36a15c1be344f61f93bbc | source base |
| 60 | repair | tests/components/custom/dock/GlassDock.touch-gate.test.ts | — | fe14f7a625798be9f7d8b4292a85012b38eb129d | source base |
| 61 | repair | tests/components/custom/dock/GlassDock.vertical-collapse.test.ts | — | 6d1f3c15a7ea7f615cee2b7bcc51a85152b7a51f | source base |
| 62 | repair | tests/components/custom/dock/GlassDock.vt-names.test.ts | — | b308deafe24c0c1e6ea26c399cd5ca3527d0b0a9 | source base |
| 63 | create | tests/components/dock/public-anatomy.test.ts | — | — | source base |
| 64 | repair | tests/components/ui/slider/dock-hold-contract.test.ts | — | b5205fa8e1a0d06c38ab835e8de4171950701de7 | source base |
| 65 | repair | tests/scripts/demo-dock-nav.detect.test.ts | — | 7277822ba72332f97791c4caf343ffe2a347386a | source base |

## Repair manifest (38)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/AppShell.vue |
| imports | 2 | demo/shell/BottomDock.vue |
| imports | 3 | demo/shell/SidebarDock.vue |
| imports | 4 | demo/shell/useShellNavDock.ts |
| imports | 5 | demo/stories/data/instrument-chassis.vue |
| imports | 6 | demo/stories/display/dark-mode-toggle.vue |
| imports | 7 | demo/stories/dock/controls.vue |
| imports | 8 | demo/stories/dock/cta-receive.vue |
| imports | 9 | demo/stories/dock/dock-search.vue |
| imports | 10 | demo/stories/dock/layers.vue |
| imports | 11 | demo/stories/dock/overflow.vue |
| imports | 12 | demo/stories/dock/overview.tile.vue |
| imports | 13 | demo/stories/dock/overview.vue |
| imports | 14 | demo/stories/dock/rail.vue |
| imports | 15 | demo/stories/dock/sections.vue |
| imports | 16 | demo/stories/manifest.ts |
| imports | 17 | demo/stories/motion/tempo.vue |
| imports | 18 | demo/stories/navigation/header-ribbon.vue |
| imports | 19 | demo/stories/substrates/blob.vue |
| imports | 20 | demo/stories/substrates/fourier-field.vue |
| imports | 21 | demo/stories/substrates/liquid-grid.vue |
| imports | 22 | tests/components/custom/dock/DockBackgroundToggle.a11y.test.ts |
| imports | 23 | tests/components/custom/dock/DockLayerRail.a11y.test.ts |
| imports | 24 | tests/components/custom/dock/GlassDock.motion-parity.test.ts |
| imports | 25 | tests/components/custom/dock/GlassDock.scroll-overflow.test.ts |
| imports | 26 | tests/components/custom/dock/GlassDock.touch-gate.test.ts |
| imports | 27 | tests/components/custom/dock/GlassDock.vertical-collapse.test.ts |
| imports | 28 | tests/components/custom/dock/GlassDock.vt-names.test.ts |
| imports | 29 | tests/components/custom/dock/dockCrossfadeContext.readonly.test-d.ts |
| imports | 30 | tests/components/ui/slider/dock-hold-contract.test.ts |
| imports | 31 | tests/scripts/demo-dock-nav.detect.test.ts |
| tests | 1 | tests/components/custom/dock/DockLayerRail.a11y.test.ts |
| tests | 2 | tests/components/dock/public-anatomy.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | MIGRATION.md |
| docs | 2 | README.md |
| docs | 3 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P034/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every exported Dock part has unique semantics and consumes the same machine/material/motion authorities; no synonym wrapper or duplicated prop path survives.

**Required mutation bite:** Re-export a wrapper whose only behavior is forwarding props to DockTrigger and require concept topology to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P034`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-anatomy-keyboard, dock-anatomy-touch
Observables: roles/states, part reachability, focus order, selection semantics
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P033 | Every public Dock state is reachable through one typed transition machine and impossible combinations cannot be represented or induced by event order. |

Declared semantic locks: `component-dock-public`, `entry-graph`. The cursor also acquires 65 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
