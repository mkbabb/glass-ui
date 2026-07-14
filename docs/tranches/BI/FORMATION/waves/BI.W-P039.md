# BI.W-P039 — Dock rail/bottom geometry and reserved layout

**Status:** PLANNED
**Topological stratum:** BI.S20
**Formation family:** dock
**Core centers:** C2_DOCK, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P039`

## Intent

Make vertical rail and bottom bar two responsive projections of the same Dock, with truthful content reservation and concentric geometry.

## Exact scope

- Derive orientation, density, safe-area, target, and content-reserve geometry from semantic layout state.
- Delete duplicate rail/bottom engines and CSS token mirror ladders.
- Ensure fixed/sticky/overlay behavior is explicit and content is never occluded unintentionally.
- Validate dynamic viewport, safe areas, keyboard, zoom, and orientation changes; at 390×844 the story scroller must retain a nondegenerate viewport, keyboard focus must reveal offscreen items, and overlay versus reserved layout must be declared and measured.

## File manifest (13)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 2 | repair | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 3 | repair | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | modify | src/components/dock/composables/useDockShellProps.ts | — | — | BI.W-P008 |
| 6 | modify | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 7 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 8 | create | src/components/dock/styles/bottom.css | — | — | source base |
| 9 | create | src/components/dock/styles/density.css | — | — | source base |
| 10 | create | src/components/dock/styles/rail.css | — | — | source base |
| 11 | create | src/components/dock/styles/reserve.css | — | — | source base |
| 12 | create | tests-visual/dock-layout.spec.ts | — | — | source base |
| 13 | create | tests/components/dock/layout.test.ts | — | — | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/AppShell.vue |
| imports | 2 | demo/shell/BottomDock.vue |
| imports | 3 | demo/shell/SidebarDock.vue |
| tests | 1 | tests-visual/dock-layout.spec.ts |
| tests | 2 | tests/components/dock/layout.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P039/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Rail and bottom are one semantic Dock with exact content reservation, safe-area handling, nondegenerate scroll/overflow geometry, focus reveal, and target geometry across supported layout states.

**Required mutation bite:** Make bottom Dock overlay content without declaring overlay mode, collapse its tab viewport to 34 px, or focus an offscreen action without revealing it; occlusion/reserve/reachability checks must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P039`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.dock | browser | Dock layers, selection, overflow, morph, escape, focus, context, and reserved layout form one deterministic state machine across rail and bottom modes. | Open two exclusive dock layers.; Let a rail selection push a route during hydration. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-rail-wide, dock-bottom-narrow, dock-safe-area, dock-dynamic-viewport, dock-zoom, dock-orientation-change
Observables: content occlusion, reserve geometry, target size, concentricity, layout shift
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P035 | Dock uses one functional-glass plane with stable ink and perceptual separation over simple/complex content in every accessibility mode. |
| BI.W-P038 | Every Dock action remains reachable exactly once and overflow derives from measured geometry without feedback loops or fixed item counts. |

Declared semantic locks: `component-dock-layout`, `demo-shell`. The cursor also acquires 13 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
