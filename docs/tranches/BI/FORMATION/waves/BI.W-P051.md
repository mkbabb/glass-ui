# BI.W-P051 — Hand-drawn 2D family — Handmark and WatercolorDot

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ, C5_AUDACIOUS_TYPOGRAPHY
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P051`

## Intent

Give Handmark and WatercolorDot one seeded Canvas/SVG/CSS drawing vocabulary without conflating them with the unrelated metaball-filter resource.

## Exact scope

- Define one seeded hand-drawn geometry/color/animation substrate for marks and watercolor dots without pretending it is a GPU scene.
- Keep Handmark and WatercolorDot distinct public concepts only where their semantics/consumers justify them.
- Retain HandMark as the sole component name and delete the same-source InkMark prose alias from /handmark; one SFC cannot masquerade as two public concepts merely because two Atlas call sites prefer the alias spelling.
- Route exact Atlas migration of src/charts/glyph/HandMark.vue and src/editorial/AnimatedRule.vue through P004/P133 owner coordination. The consumer imports/renders HandMark; no compatibility alias, local-binding-only rename, or broad family claim survives.
- Keep semantic underline/circle/strike and watercolor point-mark behavior distinct while sharing only deterministic noise, brush, and color math.
- Calibrate ink seat, stroke, watercolor edge, motion, contrast, touch/keyboard use, and PRM.

## File manifest (34)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/foundations/colors.vue | — | e135a8684cba765b758f96bbf2ae5a4d72f5831b | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | modify | demo/stories/motion/handmark.vue | — | b7540e930d7ee9d6859af664a567c2efedec4335 | source base |
| 4 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 5 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 6 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 7 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 8 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 9 | modify | src/components/handmark/brush.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/handmark/composables/useHandMark.ts | — | — | BI.W-P008 |
| 11 | modify | src/components/handmark/constants.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/handmark/freehand.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/handmark/geometry.ts | — | — | BI.W-P008 |
| 14 | modify | src/components/handmark/HandMark.vue | — | — | BI.W-P008 |
| 15 | modify | src/components/handmark/index.ts | — | — | BI.W-P008 |
| 16 | modify | src/components/handmark/ink.ts | — | — | BI.W-P008 |
| 17 | modify | src/components/handmark/noise.ts | — | — | BI.W-P008 |
| 18 | modify | src/components/handmark/README.md | — | — | BI.W-P008 |
| 19 | modify | src/components/handmark/texture.ts | — | — | BI.W-P008 |
| 20 | modify | src/components/handmark/types.ts | — | — | BI.W-P008 |
| 21 | modify | src/components/watercolor-dot/index.ts | — | — | BI.W-P008 |
| 22 | modify | src/components/watercolor-dot/prng.ts | — | — | BI.W-P008 |
| 23 | modify | src/components/watercolor-dot/useWatercolorBlob.ts | — | — | BI.W-P008 |
| 24 | modify | src/components/watercolor-dot/WatercolorDot.vue | — | — | BI.W-P008 |
| 25 | create | src/composables/glass/canvas2d/hand-drawn.ts | — | — | source base |
| 26 | create | tests-visual/hand-drawn-family.spec.ts | — | — | source base |
| 27 | repair | tests/components/custom/handmark/brush.test.ts | — | cd67037e43189bd2e5cdae50619d079654ee38ce | source base |
| 28 | repair | tests/components/custom/handmark/geometry.test.ts | — | d458292e5c724aa547445a6a92e6e39d204a2f44 | source base |
| 29 | repair | tests/components/custom/handmark/HandMark.test.ts | — | 14998dc8109c3a75f1aa1afd768d561c7dc4fd18 | source base |
| 30 | repair | tests/components/custom/handmark/highlight.test.ts | — | 5dc0ef26d34779a62ff8de47c993c41404093f5e | source base |
| 31 | repair | tests/components/custom/handmark/hull-guard.test.ts | — | b0f7086b364216f140a8001aea7204dcfacbcf83 | source base |
| 32 | repair | tests/components/custom/handmark/morphology.test.ts | — | 2b4adc690792b3d065873906bd4de48e299c06d9 | source base |
| 33 | repair | tests/components/custom/handmark/texture.test.ts | — | 37ba2e2fc636d34d0865e2f38a4f5c452adf9247 | source base |
| 34 | create | tests/components/hand-drawn-family.test.ts | — | — | source base |

## Repair manifest (17)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/foundations/colors.vue |
| imports | 2 | demo/stories/manifest.ts |
| imports | 3 | demo/stories/motion/handmark.vue |
| imports | 4 | demo/stories/substrates/blob.vue |
| imports | 5 | tests/components/custom/handmark/HandMark.test.ts |
| imports | 6 | tests/components/custom/handmark/brush.test.ts |
| imports | 7 | tests/components/custom/handmark/geometry.test.ts |
| imports | 8 | tests/components/custom/handmark/highlight.test.ts |
| imports | 9 | tests/components/custom/handmark/hull-guard.test.ts |
| imports | 10 | tests/components/custom/handmark/morphology.test.ts |
| imports | 11 | tests/components/custom/handmark/texture.test.ts |
| tests | 1 | tests-visual/hand-drawn-family.spec.ts |
| tests | 2 | tests/components/hand-drawn-family.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P051/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Handmark and WatercolorDot share one deterministic drawing substrate while retaining distinct semantic mark and point-paint contracts; no unrelated filter resource or unseeded writer enters the family.

**Required mutation bite:** Import the metaball filter, add an unseeded loop, restore `default as InkMark`, rename only Atlas local bindings, or preserve two names for HandMark.vue; topology, clean-break, handshake, determinism, and lifecycle evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P051`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |
| procedural.interaction | browser | Pointer/touch/keyboard/config interaction changes a scene deliberately, remains bounded, and preserves a calm default plus PRM behavior. | Let pointer velocity eject a blob satellite from containment.; Keep autonomous turbulence moving under PRM. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: handmark-underline, handmark-highlight, watercolor-dot, hand-drawn-dark, hand-drawn-prm
Observables: stroke/ink geometry, color/contrast, seed stability, motion bounds
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P004 | Every authoritative consumer claim is bound to immutable tracked commit objects and a byte-stable foreign snapshot: index state, already-dirty tracked working bytes, and all nonignored untracked-tree bytes are protected before and after the probe; drift invalidates evidence without mutating or normalizing the sibling. |
| BI.W-P031 | PRM yields immediate complete state, no nonessential travel/continuous work, and one reactive authority across CSS and JS. |
| BI.W-P044 | The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding. |

Declared semantic locks: `component-handmark`, `component-watercolor-dot`, `entry-graph`. The cursor also acquires 34 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
