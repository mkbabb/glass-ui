# BI.W-P035 — Dock functional-glass plate and content-aware lensing

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** dock
**Core centers:** C1_LIQUID_GLASS, C2_DOCK
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P035`

## Intent

Make Dock the flagship functional-plane expression: quiet at rest, legible over complex content, and alive only under interaction.

## Exact scope

- Consume the shared functional-glass anatomy instead of Dock-owned duplicate glass recipes.
- Calibrate plate ground, edge, specular, selected luma lift, and content-aware contrast across rail/bottom modes.
- Remove metal/glow bands and nested backdrop layers that make Dock heavier than content.
- Resolve reduced transparency, increased contrast, forced colors, dark, and complex backgrounds explicitly.

## File manifest (9)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 2 | modify | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 3 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 4 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 5 | create | src/components/dock/styles/index.css | — | — | source base |
| 6 | create | src/components/dock/styles/material.css | — | — | source base |
| 7 | create | src/components/dock/styles/plate.css | — | — | source base |
| 8 | create | src/components/dock/styles/shape.css | — | — | source base |
| 9 | create | tests-visual/dock-material.spec.ts | — | — | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/dock/index.ts |
| imports | 2 | src/components/dock/styles/index.css |
| tests | 1 | tests-visual/dock-material.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/dock/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P035/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Dock uses one functional-glass plane with stable ink and perceptual separation over simple/complex content in every accessibility mode.

**Required mutation bite:** Add a nested backdrop-filter to a Dock item and require backdrop-depth/material evidence to turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P035`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dock-material-light-simple, dock-material-light-complex, dock-material-dark-complex, dock-material-reduced-transparency, dock-material-forced-colors
Observables: edge/luma separation, ink contrast, backdrop depth, specular/glow bounds
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P018 | Nested geometry is concentric and depth signals increase monotonically by semantic level without a second shadow authority. |
| BI.W-P034 | Every exported Dock part has unique semantics and consumes the same machine/material/motion authorities; no synonym wrapper or duplicated prop path survives. |

Declared semantic locks: `component-dock-material`. The cursor also acquires 9 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
