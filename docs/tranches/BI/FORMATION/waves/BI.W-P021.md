# BI.W-P021 — Responsive geometry and coarse/fine input contract

**Status:** IMPLEMENTED — NATIVE INPUT/ZOOM ACCEPTANCE PENDING
**Topological stratum:** BI.S10
**Formation family:** design-foundation
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P021`

## Intent

Make supported widths and input modes semantic product states rather than a pile of local media-query exceptions.

## Exact scope

- Define named narrow/compact/wide layout behaviors and coarse/fine control geometry from semantic tokens.
- Remove hidden controls, unreachable overflow, duplicate mobile wrappers, and component-local touch floors.
- Preserve focus order and equivalent actions across layout changes.
- Exercise zoom and dynamic viewport changes in modern Safari and Chrome.

## File manifest (83)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 2 | modify | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 3 | repair | demo/shell/configurator/preset-editor/css-writers.ts | — | — | BI.W-P012 |
| 4 | repair | demo/shell/configurator/preset-editor/defaults.ts | — | — | BI.W-P012 |
| 5 | repair | demo/shell/configurator/preset-editor/types.ts | — | — | BI.W-P012 |
| 6 | repair | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 7 | repair | demo/stories/display/badge.vue | — | 2cc390d89ae7e0025b00b6d7dac973ba36d09a85 | source base |
| 8 | repair | demo/stories/display/dark-mode-toggle.vue | — | f5ea043e2dc9557a41c661d91898cd8cf27d23a7 | source base |
| 9 | repair | demo/stories/display/metric-badge.vue | — | 0ce729be9d5638820a513e649ae011004a647229 | source base |
| 10 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 11 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 12 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 13 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 14 | create | src/components/_shared/control-size.ts | — | — | source base |
| 15 | repair | src/components/_shared/useControlSize.ts | — | — | BI.W-P008 |
| 16 | repair | src/components/badge/index.ts | — | — | BI.W-P008 |
| 17 | repair | src/components/button/index.ts | — | — | BI.W-P008 |
| 18 | repair | src/components/card/CardAction.vue | — | — | BI.W-P008 |
| 19 | repair | src/components/card/CardHeader.vue | — | — | BI.W-P008 |
| 20 | repair | src/components/configurator/ConfiguratorRow.vue | — | — | BI.W-P008 |
| 21 | repair | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 22 | repair | src/components/dock/composables/useDockShellProps.ts | — | — | BI.W-P008 |
| 23 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 24 | repair | src/components/input/Input.vue | — | — | BI.W-P008 |
| 25 | repair | src/components/metric-stack/MetricRow.vue | — | — | BI.W-P008 |
| 26 | repair | src/components/metric-stack/MetricStack.vue | — | — | BI.W-P008 |
| 27 | repair | src/components/number-field/NumberFieldInput.vue | — | — | BI.W-P008 |
| 28 | repair | src/components/popover/Popover.vue | — | — | BI.W-P008 |
| 29 | repair | src/components/search/FuzzySearch.vue | — | — | BI.W-P008 |
| 30 | repair | src/components/search/SearchBar.vue | — | — | BI.W-P008 |
| 31 | repair | src/components/search/searchVariants.ts | — | — | BI.W-P008 |
| 32 | repair | src/components/stacked-icons/StackedIconGroup.vue | — | — | BI.W-P008 |
| 33 | repair | src/components/switch/Switch.vue | — | — | BI.W-P008 |
| 34 | repair | src/components/textarea/Textarea.vue | — | — | BI.W-P008 |
| 35 | repair | src/components/timeline/ContinuousMarkers.vue | — | — | BI.W-P008 |
| 36 | repair | src/components/timeline/SegmentedTimeline.vue | — | — | BI.W-P008 |
| 37 | repair | src/components/toast/ToastAction.vue | — | — | BI.W-P008 |
| 38 | repair | src/components/watercolor-dot/WatercolorDot.vue | — | — | BI.W-P008 |
| 39 | repair | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 40 | repair | src/composables/motion/motionTempo.ts | — | 6b3b8c742162eb4899be3b77df6d382ba9c3112b | source base |
| 41 | repair | src/forms.ts | — | 4955d3c3fa9784e7f0b13fb446b61b70a53fa14f | source base |
| 42 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 43 | repair | src/styles/dock-controls/dark-mode-toggle.css | — | 5fbc619e31c5f3b4da06579263f621a286135f50 | source base |
| 44 | repair | src/styles/dock-controls/icon-button.css | — | 0f9126bd8a22b598c79046410fd83f64f02ec3a0 | source base |
| 45 | repair | src/styles/dock-controls/tab-button.css | — | 912bace2d0d359b7570080fa08ba524cfbb42f4d | source base |
| 46 | repair | src/styles/dock-controls/touch-floor.css | — | d9eb7500b2008e86ade95a8d61fe255993b1722c | source base |
| 47 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 48 | repair | src/styles/dock/adaptive-legibility.css | — | f4854e66920f232e6eb9fd5176b89a732148399f | source base |
| 49 | repair | src/styles/dock/cta-seat.css | — | c19816efff5f556f112a4091e9e784d57c3902e8 | source base |
| 50 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 51 | repair | src/styles/dock/fisheye.css | — | 1c346c4a7948f3d6da886ad7d50161160489f785 | source base |
| 52 | repair | src/styles/dock/layer-group.css | — | 9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd | source base |
| 53 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 54 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 55 | repair | src/styles/glass/control-surfaces.css | — | 2db5c477d919ee795d0a5b7d212cf39f835fdb85 | source base |
| 56 | repair | src/styles/glass/deep.css | — | 83468cc7580027c2481ccb9193360e7fe6949a50 | source base |
| 57 | repair | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 58 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 59 | repair | src/styles/glass/grain-overlay.css | — | a6ccc7a3f69f9be0f9de15e254eb6016611c9df5 | source base |
| 60 | repair | src/styles/glass/ladder.css | — | 2b65407c1d361a0edfcde6703c4734dabbc020db | source base |
| 61 | repair | src/styles/glass/rim.css | — | 7bc5038ea6041aa7421ca3e35a8a11db0ca38e55 | source base |
| 62 | repair | src/styles/glass/surfaces-pager.css | — | 2b9ec169731026dbe41123f3ad1b8337e214a3d9 | source base |
| 63 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 64 | repair | src/styles/icon-chip.css | — | 207ddee8a8c3bd4ca7446defb9cb7288e63f0148 | source base |
| 65 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 66 | repair | src/styles/menu.css | — | b857356e839255ecff703eb38e8368445e7c8598 | source base |
| 67 | repair | src/styles/tokens/glass-fx.css | — | e20e236bcd7b013bc41ecd3ca45e77fdbbd17edb | source base |
| 68 | repair | src/styles/tokens/glass.css | — | 5c09fd47c15544fb9e5d89202f0ef99c48208e1f | source base |
| 69 | repair | src/styles/tokens/light-dark.css | — | b23e6baa9e9e4bfb44c26a0cf41c634823b228df | source base |
| 70 | repair | src/styles/tokens/on-glass-fg.css | — | ba1782dbf7bde52725a3219a332676f49e4e78a6 | source base |
| 71 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 72 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 73 | repair | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 74 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 75 | create | src/styles/tokens/size.css | — | — | source base |
| 76 | repair | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 77 | repair | src/styles/typography/scale.css | — | 60aa59d15c74d55f0a814760d77ca624960a6f0b | source base |
| 78 | repair | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 79 | repair | src/styles/typography/utilities.css | — | 4415aa88142764007bb0e7fa998be59d5ea0cfb4 | source base |
| 80 | repair | src/styles/utilities/a11y-overrides.css | — | dd89b1d7c21f30807080f0627cac012698b3ce9c | source base |
| 81 | repair | src/styles/utilities/components.css | — | 79fdb388d65dbd43fc11a706d0ec7b0a9909445d | source base |
| 82 | create | src/styles/utilities/responsive.css | — | — | source base |
| 83 | create | tests-visual/responsive-input.spec.ts | — | — | source base |

## Repair manifest (79)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/demo.css |
| imports | 2 | demo/shell/configurator/PresetEditor.vue |
| imports | 3 | demo/shell/configurator/preset-editor/css-writers.ts |
| imports | 4 | demo/shell/configurator/preset-editor/defaults.ts |
| imports | 5 | demo/shell/configurator/preset-editor/types.ts |
| imports | 6 | demo/stories/display/badge.vue |
| imports | 7 | demo/stories/display/dark-mode-toggle.vue |
| imports | 8 | demo/stories/display/metric-badge.vue |
| imports | 9 | demo/stories/dock/dock-search.vue |
| imports | 10 | demo/stories/manifest.ts |
| imports | 11 | demo/stories/motion/tempo.vue |
| imports | 12 | src/components/_shared/useControlSize.ts |
| imports | 13 | src/components/badge/index.ts |
| imports | 14 | src/components/button/index.ts |
| imports | 15 | src/components/card/CardAction.vue |
| imports | 16 | src/components/card/CardHeader.vue |
| imports | 17 | src/components/configurator/ConfiguratorRow.vue |
| imports | 18 | src/components/dock/DockControl.vue |
| imports | 19 | src/components/dock/composables/useDockFisheye.ts |
| imports | 20 | src/components/dock/composables/useDockShellProps.ts |
| imports | 21 | src/components/input/Input.vue |
| imports | 22 | src/components/metric-stack/MetricRow.vue |
| imports | 23 | src/components/metric-stack/MetricStack.vue |
| imports | 24 | src/components/number-field/NumberFieldInput.vue |
| imports | 25 | src/components/popover/Popover.vue |
| imports | 26 | src/components/search/FuzzySearch.vue |
| imports | 27 | src/components/search/SearchBar.vue |
| imports | 28 | src/components/search/searchVariants.ts |
| imports | 29 | src/components/stacked-icons/StackedIconGroup.vue |
| imports | 30 | src/components/switch/Switch.vue |
| imports | 31 | src/components/textarea/Textarea.vue |
| imports | 32 | src/components/timeline/ContinuousMarkers.vue |
| imports | 33 | src/components/timeline/SegmentedTimeline.vue |
| imports | 34 | src/components/toast/ToastAction.vue |
| imports | 35 | src/components/watercolor-dot/WatercolorDot.vue |
| imports | 36 | src/composables/glass/useGlassBackdropLuminance.ts |
| imports | 37 | src/composables/motion/motionTempo.ts |
| imports | 38 | src/forms.ts |
| imports | 39 | src/styles/card-scroll.css |
| imports | 40 | src/styles/dock-controls/dark-mode-toggle.css |
| imports | 41 | src/styles/dock-controls/icon-button.css |
| imports | 42 | src/styles/dock-controls/tab-button.css |
| imports | 43 | src/styles/dock-controls/touch-floor.css |
| imports | 44 | src/styles/dock.css |
| imports | 45 | src/styles/dock/adaptive-legibility.css |
| imports | 46 | src/styles/dock/cta-seat.css |
| imports | 47 | src/styles/dock/density.css |
| imports | 48 | src/styles/dock/fisheye.css |
| imports | 49 | src/styles/dock/layer-group.css |
| imports | 50 | src/styles/dock/overflow.css |
| imports | 51 | src/styles/dock/shell.css |
| imports | 52 | src/styles/glass/control-surfaces.css |
| imports | 53 | src/styles/glass/deep.css |
| imports | 54 | src/styles/glass/glass-atom.css |
| imports | 55 | src/styles/glass/glass-capsule.css |
| imports | 56 | src/styles/glass/grain-overlay.css |
| imports | 57 | src/styles/glass/ladder.css |
| imports | 58 | src/styles/glass/rim.css |
| imports | 59 | src/styles/glass/surfaces-pager.css |
| imports | 60 | src/styles/glass/surfaces.css |
| imports | 61 | src/styles/icon-chip.css |
| imports | 62 | src/styles/instrument-chassis.css |
| imports | 63 | src/styles/menu.css |
| imports | 64 | src/styles/tokens/glass-fx.css |
| imports | 65 | src/styles/tokens/glass.css |
| imports | 66 | src/styles/tokens/light-dark.css |
| imports | 67 | src/styles/tokens/on-glass-fg.css |
| imports | 68 | src/styles/tokens/property-regs-specular.css |
| imports | 69 | src/styles/tokens/property-regs.css |
| imports | 70 | src/styles/tokens/scale-paper.css |
| imports | 71 | src/styles/tokens/scheme-motion.css |
| imports | 72 | src/styles/tokens/sizing.css |
| imports | 73 | src/styles/typography/scale.css |
| imports | 74 | src/styles/typography/semantic.css |
| imports | 75 | src/styles/typography/utilities.css |
| imports | 76 | src/styles/utilities/a11y-overrides.css |
| imports | 77 | src/styles/utilities/components.css |
| tests | 1 | tests-visual/responsive-input.spec.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P021/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every primary action remains visible, reachable, ordered, and adequately sized across declared widths/input modes without a duplicate component path.

**Required mutation bite:** Hide a desktop control at narrow width without an equivalent action and require reachability to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P021`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: narrow-coarse, narrow-keyboard, wide-fine, dynamic-resize, zoom-200
Observables: target geometry, reachability, overflow, focus order, layout stability
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P015 | Every live token has one semantic definition, typed domain, computed consumer, and accessible mode resolution; no alias is needed to preserve an old name. |

Declared semantic locks: `demo-shell`, `global-responsive`. The cursor also acquires 83 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
