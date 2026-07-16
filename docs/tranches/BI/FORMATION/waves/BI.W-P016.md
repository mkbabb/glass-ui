# BI.W-P016 — Warm content-field and functional material hierarchy

**Status:** IMPLEMENTED — NATIVE MATERIAL ACCEPTANCE PENDING
**Topological stratum:** BI.S10
**Formation family:** design-foundation
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P016`

## Intent

Establish a restrained four-level material system: content field, elevated content, functional glass, transient overlay.

## Exact scope

- Replace page-wide glass and decorative blur with a warm legible content field.
- Define material roles through semantic tokens and state attributes, not component-specific glass variants.
- Calibrate edge separation, translucency, blur/lensing, and shadows across light/dark and complex backdrops.
- Make reduced transparency and increased contrast intentional material resolutions.
- Resolve D4's glass-material-unified escalation by tracing every old material reader: repoint only a live semantic reader and cull every obsolete reader/recipe; a blanket repoint is forbidden.
- Make adaptive backdrop luminance a provenance-bearing live measurement: animated sampling reports coordinates, age, and value; an unavailable/failed live sample is typed RED and can never coalesce to a static/theme/default value while the surface claims live adaptation.

## File manifest (19)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 2 | modify | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 3 | modify | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | modify | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 6 | modify | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 7 | modify | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 8 | modify | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 9 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 10 | create | src/styles/material/content-field.css | — | — | source base |
| 11 | create | src/styles/material/elevated-content.css | — | — | source base |
| 12 | create | src/styles/material/functional-glass.css | — | — | source base |
| 13 | create | src/styles/material/transient-overlay.css | — | — | source base |
| 14 | modify | src/styles/paper.css | — | 0c18d49faaaa9d6c98b8f1195f876c14c961d3d0 | source base |
| 15 | modify | src/styles/theme.css | — | 7f77e670edffad3948c77f89e58d4a6d5769f91a | source base |
| 16 | create | tests-visual/glass-backdrop-luminance.spec.ts | — | — | source base |
| 17 | create | tests-visual/material-hierarchy.spec.ts | — | — | source base |
| 18 | create | tests/composables/glass/backdrop-luminance-provenance.test.ts | — | — | source base |
| 19 | repair | vite.style-assets.ts | — | 8a08d092e864493af96512904b3f41d661bb45a9 | source base |

## Repair manifest (10)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/demo.css |
| imports | 2 | demo/stories/dock/DockStage.vue |
| imports | 3 | demo/stories/substrates/glass-material.vue |
| imports | 4 | src/composables/glass/index.ts |
| imports | 5 | src/styles/index.css |
| tests | 1 | tests-visual/glass-backdrop-luminance.spec.ts |
| tests | 2 | tests-visual/material-hierarchy.spec.ts |
| tests | 3 | tests/composables/glass/backdrop-luminance-provenance.test.ts |
| build | 1 | vite.style-assets.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P016/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Material level follows semantic function and remains perceptually ordered in every supported appearance/accessibility state; any adaptive-luminance claim is backed by a fresh live sample with explicit provenance or an observable typed failure.

**Required mutation bite:** Give ordinary StorySection content the functional-glass material, or restore `sampleAnimated(...) ?? sampleStatic(...)` while labeling the result live; role/paint and provenance/failure checks must fail respectively.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P016`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: material-simple-light, material-complex-light, material-simple-dark, material-complex-dark, material-reduced-transparency, material-live-luma-high-low, material-live-luma-injected-failure
Observables: luminance/edge ordering, content legibility, backdrop response and sample provenance, semantic role/material match, typed no-sample failure
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P015 | Every live token has one semantic definition, typed domain, computed consumer, and accessible mode resolution; no alias is needed to preserve an old name. |

Declared semantic locks: `global-material`, `global-tokens`. The cursor also acquires 19 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
