# BI.W-P054 — Procedural offscreen, resource, and performance budgets

**Status:** PLANNED
**Topological stratum:** BI.S19
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ, C5_AUDACIOUS_TYPOGRAPHY
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P054`

## Intent

Bind procedural ambition to actual route ownership, pause behavior, frame pacing, memory, loading, and context limits without hiding work.

## Exact scope

- Instrument context/buffer/texture/listener/observer/loop ownership per rendered route and verify teardown.
- Stop all work offscreen/hidden/PRM and resume exactly once without clock or seed discontinuity.
- Lazy-load heavy renderers and prevent more contexts/scenes than the route's declared budget.
- Bind the current nine-canvas Constellation route as a resource negative control: its seven direct specimens plus page chrome may use Canvas2D, but after P048 they open zero Constellation WebGPU/WebGL contexts and offscreen specimens perform zero continuous work.
- Collect distributions on representative Safari/Chrome profiles and set product budgets with diagnostic attribution.

## File manifest (53)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 2 | repair | demo/chassis/hero/focal.ts | — | 9ad415a77a918ad566bc39d36b921b0a9aa59cae | source base |
| 3 | repair | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 4 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 5 | repair | demo/chassis/useStoryNavigation.ts | — | 66cd02992b1e1e7f490efa60ffd9232a638e723b | source base |
| 6 | repair | demo/main.ts | — | 52322d0a200903207f071f4e218987f1f32f456d | source base |
| 7 | repair | demo/router.ts | — | 7f88ba5492b7d6a17bc890f3898edd7d8749dfc2 | source base |
| 8 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 9 | repair | demo/shell/dock-layer-contexts.ts | — | a89627e10ced4c94b5ba249f439316e81dd0e00a | source base |
| 10 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 11 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 12 | repair | demo/stories/containers/configurator.vue | — | 887b9cbd50fada0688b1f5f021e461c980d4390f | source base |
| 13 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 14 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 15 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 16 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 17 | repair | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 18 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 19 | repair | demo/stories/dock/rail.vue | — | f843e4e6adc30faad601cf75ece55aa37dd92272 | source base |
| 20 | repair | demo/stories/foundations/intro.vue | — | 4f4356e8b8fa4617908d22300b7ee0291822f25b | source base |
| 21 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 22 | repair | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 23 | repair | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 24 | repair | demo/stories/substrates/aurora/AuroraStage.vue | — | 1511aabb33b2c5846151a07740354fe0af8efca2 | source base |
| 25 | repair | demo/stories/substrates/aurora/config/CompositionLayer.vue | — | 006b7735eaf3b6d90a881b15435dcb9c157a46aa | source base |
| 26 | repair | demo/stories/substrates/aurora/config/FlowLayer.vue | — | 5b6a771e32fd19376a182f3bed491397145f99b2 | source base |
| 27 | repair | demo/stories/substrates/aurora/config/NucleiLayer.vue | — | 4438e6a419d01461e7f2b1c72eeed053038505d6 | source base |
| 28 | repair | demo/stories/substrates/aurora/config/options.ts | — | 2fb120cd0b760df8bb8f778b8b9eb16ad15dd0a3 | source base |
| 29 | repair | demo/stories/substrates/aurora/config/PaletteLayer.vue | — | 59bdf9371357bf749664fc017cbe03e7c657c45d | source base |
| 30 | repair | demo/stories/substrates/aurora/config/TextureLayer.vue | — | 5a24b0210d62fd9ea5cee40085eef2217e1bd0da | source base |
| 31 | repair | demo/stories/substrates/aurora/config/usePaletteStops.ts | — | 52d4541130ba2e0dec4d5563f630bec6bc4426bd | source base |
| 32 | repair | demo/stories/substrates/aurora/NucleiOverlay.vue | — | 7da942d2f050904d101f2303859358a58013c562 | source base |
| 33 | repair | demo/stories/substrates/aurora/presets.ts | — | 74bd131a3d369e14ee35a26915db3afc178ee0b0 | source base |
| 34 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 35 | repair | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue | — | 28724c06ddb8640c9f744ba4404e35b3fdf80730 | source base |
| 36 | repair | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue | — | b6bf718d53e096646d18ee29526283923c5e780a | source base |
| 37 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 38 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 39 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 40 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 41 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 42 | repair | demo/stories/substrates/glass-panel.vue | — | ff1fe558ecfd84fd3543b4c7162cfe1030da6cca | source base |
| 43 | repair | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 44 | repair | demo/stories/substrates/presets.ts | — | 495f075c40c737978133d8888c6ab090bb94f241 | source base |
| 45 | repair | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 46 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 47 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 48 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 49 | create | scripts/profile-procedural.mjs | — | — | source base |
| 50 | modify | src/composables/glass/procedural/lifecycle.ts | — | — | BI.W-P043 |
| 51 | create | tests-visual/helpers/resource-instrumentation.ts | — | — | source base |
| 52 | create | tests-visual/procedural-performance.spec.ts | — | — | source base |
| 53 | modify | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (50)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/StoryHero.vue |
| imports | 2 | demo/chassis/hero/aurora-hero.ts |
| imports | 3 | demo/chassis/hero/focal.ts |
| imports | 4 | demo/chassis/hero/story-hero.css |
| imports | 5 | demo/chassis/useStoryNavigation.ts |
| imports | 6 | demo/main.ts |
| imports | 7 | demo/router.ts |
| imports | 8 | demo/shell/AppShell.vue |
| imports | 9 | demo/shell/dock-layer-contexts.ts |
| imports | 10 | demo/stories/compositions/auth-shell.vue |
| imports | 11 | demo/stories/compositions/empty-states.vue |
| imports | 12 | demo/stories/containers/configurator.vue |
| imports | 13 | demo/stories/data/search.vue |
| imports | 14 | demo/stories/display/buttons.vue |
| imports | 15 | demo/stories/display/card.vue |
| imports | 16 | demo/stories/dock/DockStage.vue |
| imports | 17 | demo/stories/dock/dock-search.vue |
| imports | 18 | demo/stories/dock/overview.vue |
| imports | 19 | demo/stories/dock/rail.vue |
| imports | 20 | demo/stories/foundations/intro.vue |
| imports | 21 | demo/stories/manifest.ts |
| imports | 22 | demo/stories/substrates/VizStudio.vue |
| imports | 23 | demo/stories/substrates/aurora.vue |
| imports | 24 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 25 | demo/stories/substrates/aurora/AuroraStage.vue |
| imports | 26 | demo/stories/substrates/aurora/NucleiOverlay.vue |
| imports | 27 | demo/stories/substrates/aurora/config/CompositionLayer.vue |
| imports | 28 | demo/stories/substrates/aurora/config/FlowLayer.vue |
| imports | 29 | demo/stories/substrates/aurora/config/NucleiLayer.vue |
| imports | 30 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| imports | 31 | demo/stories/substrates/aurora/config/TextureLayer.vue |
| imports | 32 | demo/stories/substrates/aurora/config/options.ts |
| imports | 33 | demo/stories/substrates/aurora/config/usePaletteStops.ts |
| imports | 34 | demo/stories/substrates/aurora/presets.ts |
| imports | 35 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 36 | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue |
| imports | 37 | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue |
| imports | 38 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 39 | demo/stories/substrates/blob.vue |
| imports | 40 | demo/stories/substrates/constellation.vue |
| imports | 41 | demo/stories/substrates/fourier-field.vue |
| imports | 42 | demo/stories/substrates/glass-material.vue |
| imports | 43 | demo/stories/substrates/glass-panel.vue |
| imports | 44 | demo/stories/substrates/liquid-grid.vue |
| imports | 45 | demo/stories/substrates/presets.ts |
| tests | 1 | tests-visual/procedural-performance.spec.ts |
| build | 1 | package.json |
| build | 2 | vite.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P054/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Procedural routes own bounded resources, do zero continuous work while paused, resume once, lazy-load heavy code, and meet declared experience budgets with attribution.

**Required mutation bite:** Eager-import all scene engines on home and keep one offscreen frame loop running; loading and pause evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P054`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| integrity.build-package | device-free | A clean build emits a self-contained package whose files, CSS URLs, maps, and declaration imports all resolve inside the packed artifact. | Delete one packed CSS asset.; Point one emitted declaration at a source-only path. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: perf-home-cold, perf-scene-cold, perf-scene-warm, perf-offscreen, perf-route-cycle, perf-prm
Observables: bundle/request attribution, frame pacing, long tasks, resource counts, zero paused frames, teardown baseline
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P048 | One deterministic CPU field feeds one Canvas2D renderer; drawOverlay and every retained interaction seam execute causally, seven-instance dogfood consumes no scarce GPU context, and readable hierarchy, stable seed/config semantics, bounded interaction, freeze, pause, and teardown survive. |
| BI.W-P053 | Every supported dual-engine scene has current seeded semantic/perceptual parity evidence in Safari and Chrome, and each band rejects a known meaningful mutation. |

Declared semantic locks: `performance-profiler`, `procedural-lifecycle`, `vite-config`. The cursor also acquires 53 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
