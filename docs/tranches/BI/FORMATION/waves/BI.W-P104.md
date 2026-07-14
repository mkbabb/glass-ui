# BI.W-P104 — Tooltip consolidation — terse noninteractive description overlay

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** component-containers
**Core centers:** C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P104`

## Intent

Fold custom/icon-tooltip into ui/tooltip; delete the wrapper/export and migrate icon triggers to ordinary Tooltip composition. One Tooltip family owns delayed hover/focus description, escape, no interactive content, touch policy, accessible description, and IconTooltip is only trigger content.

## Exact scope

- Fold custom/icon-tooltip into ui/tooltip; delete the wrapper/export and migrate icon triggers to ordinary Tooltip composition.
- Make the binding concept contract explicit: One Tooltip family owns delayed hover/focus description, escape, no interactive content, touch policy, accessible description, and IconTooltip is only trigger content.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: focus, hover, delay, escape, icon-trigger, touch-policy, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (25)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/chassis/landing/SectionLanding.vue | — | aa70cb4d1b1e105017218f47ff1f4eab75f7439a | source base |
| 2 | modify | demo/chassis/page/StoryPage.vue | — | 0fe1e8036e707a34599b151634d5672a12ff4428 | source base |
| 3 | modify | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 4 | modify | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 5 | modify | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 6 | delete | demo/stories/containers/icon-tooltip.vue | — | 2f0819ed127121ef20384e894b108382cbea9071 | source base |
| 7 | modify | demo/stories/containers/tooltip.vue | — | 0b436063aac06de803e4bfb779094bb579f8ce1e | source base |
| 8 | modify | demo/stories/dock/rail.vue | — | f843e4e6adc30faad601cf75ece55aa37dd92272 | source base |
| 9 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 10 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 11 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 12 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 13 | modify | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 14 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 15 | delete | src/components/icon-tooltip/IconTooltip.vue | — | — | BI.W-P008 |
| 16 | delete | src/components/icon-tooltip/index.ts | — | — | BI.W-P008 |
| 17 | delete | src/components/icon-tooltip/README.md | — | — | BI.W-P008 |
| 18 | modify | src/components/tooltip/index.ts | — | — | BI.W-P008 |
| 19 | modify | src/components/tooltip/Tooltip.vue | — | — | BI.W-P008 |
| 20 | modify | src/components/tooltip/TooltipContent.vue | — | — | BI.W-P008 |
| 21 | modify | src/components/tooltip/TooltipProvider.vue | — | — | BI.W-P008 |
| 22 | modify | src/components/tooltip/TooltipTrigger.vue | — | — | BI.W-P008 |
| 23 | create | tests-visual/tooltip.contract.spec.ts | — | — | source base |
| 24 | create | tests/components/tooltip.contract.test.ts | — | — | source base |
| 25 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (18)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/landing/SectionLanding.vue |
| imports | 2 | demo/chassis/page/StoryPage.vue |
| imports | 3 | demo/shell/BottomDock.vue |
| imports | 4 | demo/shell/SidebarDock.vue |
| imports | 5 | demo/stories/containers/hover-card.vue |
| imports | 6 | demo/stories/containers/icon-tooltip.vue |
| imports | 7 | demo/stories/containers/tooltip.vue |
| imports | 8 | demo/stories/dock/rail.vue |
| imports | 9 | demo/stories/manifest.ts |
| tests | 1 | tests-visual/tooltip.contract.spec.ts |
| tests | 2 | tests/components/tooltip.contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/containers/tooltip.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P104/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** One Tooltip family owns delayed hover/focus description, escape, no interactive content, touch policy, accessible description, and IconTooltip is only trigger content.

**Required mutation bite:** Restore IconTooltip or allow focusable interactive content inside Tooltip; topology/overlay evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P104`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: tooltip-focus, tooltip-hover, tooltip-delay, tooltip-escape, tooltip-icon-trigger, tooltip-touch-policy, tooltip-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P100 | One private focus scope serves Dialog/Drawer/Popover/Menu/Dock overlays with stack-aware containment and restoration; it is not a public visual component. |

Declared semantic locks: `component-icon-tooltip`, `component-tooltip`, `entry-graph`. The cursor also acquires 25 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/tooltip + custom/icon-tooltip at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=fold.
