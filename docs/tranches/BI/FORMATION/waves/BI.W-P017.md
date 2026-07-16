# BI.W-P017 — Liquid Glass functional-plane anatomy

**Status:** IMPLEMENTED — NATIVE FUNCTIONAL-PLANE ACCEPTANCE PENDING
**Topological stratum:** BI.S11
**Formation family:** design-foundation
**Core centers:** C1_LIQUID_GLASS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P017`

## Intent

Unify glass construction for controls, navigation, menus, and transient chrome without turning content into glass.

## Exact scope

- Define one functional-plane anatomy: content-aware ground, diffuse body, separating edge, restrained specular, interaction lens.
- Remove glow halos, gray wash, duplicate pseudo-elements, and component-specific glass recipes.
- Expose semantic states for rest/hover/press/selected/drag/disabled and keep content ink stable.
- Budget nested backdrops and make violation visible rather than silently flattening it.

## File manifest (30)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 2 | repair | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 3 | create | src/composables/glass/useFunctionalPlane.ts | — | — | source base |
| 4 | modify | src/styles/glass-refract.css | — | 503b21d79f89d34f6c624bf43c6f9bfdd463243c | source base |
| 5 | modify | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 6 | modify | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 7 | modify | src/styles/glass/a11y-fallback.css | — | c6bf39491d993644c8abeff837db5ace5225ca79 | source base |
| 8 | modify | src/styles/glass/accent-tone.css | — | a3b375be285ae44c17e16087551f1d36eec3ea36 | source base |
| 9 | modify | src/styles/glass/control-surfaces.css | — | 2db5c477d919ee795d0a5b7d212cf39f835fdb85 | source base |
| 10 | modify | src/styles/glass/deep.css | — | 83468cc7580027c2481ccb9193360e7fe6949a50 | source base |
| 11 | modify | src/styles/glass/defined.css | — | d8cd8460f4965fe1b3736a457aa4fa8b23e1fdbe | source base |
| 12 | modify | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 13 | modify | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 14 | modify | src/styles/glass/glass-chip.css | — | 78c37cea99d056fcfd8ed0219a094325645f9c53 | source base |
| 15 | modify | src/styles/glass/grain-overlay.css | — | a6ccc7a3f69f9be0f9de15e254eb6016611c9df5 | source base |
| 16 | modify | src/styles/glass/ladder-undershadow.css | — | a00d643179a4abec099edc5178ca5d71d173b7a1 | source base |
| 17 | modify | src/styles/glass/ladder.css | — | 2b65407c1d361a0edfcde6703c4734dabbc020db | source base |
| 18 | modify | src/styles/glass/liquid-enter.css | — | 49d182d37feebca6ab412a037bdd221eea71146f | source base |
| 19 | modify | src/styles/glass/liquid-fill.css | — | a87e87acb1f208806d94d4aacbff2cf845e1285c | source base |
| 20 | modify | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 21 | modify | src/styles/glass/progress-rail.css | — | 02f64c4cb98bf7667c4151a0d7012a5eb5c6d34f | source base |
| 22 | modify | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 23 | modify | src/styles/glass/rim.css | — | 7bc5038ea6041aa7421ca3e35a8a11db0ca38e55 | source base |
| 24 | modify | src/styles/glass/squircle.css | — | 569730e4a98a6a49e40c590bb553e063b4509cea | source base |
| 25 | modify | src/styles/glass/surface-axis.css | — | 5570ec55144da937de524b9808652227af827dfb | source base |
| 26 | modify | src/styles/glass/surfaces-pager.css | — | 2b9ec169731026dbe41123f3ad1b8337e214a3d9 | source base |
| 27 | modify | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 28 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 29 | create | tests-visual/functional-glass.spec.ts | — | — | source base |
| 30 | repair | vite.style-assets.ts | — | 8a08d092e864493af96512904b3f41d661bb45a9 | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/composables/glass/index.ts |
| imports | 2 | src/styles/index.css |
| tests | 1 | tests-visual/functional-glass.spec.ts |
| build | 1 | vite.style-assets.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P017/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant.

**Required mutation bite:** Restore a component-local backdrop/filter recipe with its own specular pseudo-element and require anatomy/ownership evidence to turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P017`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: functional-rest-complex, functional-hover, functional-press, functional-selected, functional-drag, functional-disabled
Observables: edge/luma separation, specular restraint, ink stability, nested backdrop depth
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P016 | Material level follows semantic function and remains perceptually ordered in every supported appearance/accessibility state; any adaptive-luminance claim is backed by a fresh live sample with explicit provenance or an observable typed failure. |

Declared semantic locks: `glass-substrate`, `global-material`. The cursor also acquires 30 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
