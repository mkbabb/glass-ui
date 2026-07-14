# BI.W-P046 — Aurora apotheosis — painterly field with one runtime

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P046`

## Intent

Consolidate Aurora's 38-file painterly system into a cohesive field renderer whose medium presets change art direction without forking lifecycle/color/config.

## Exact scope

- Separate public Aurora facade/config from generated shader modules, field math, medium composition, and runtime adapters.
- Make WebGPU preferred and WebGL2 equivalent through shared semantic uniforms/color/output, removing duplicated bridge/setup logic.
- Calibrate quiet warm default, painterly stroke/impasto/metal options, cursor response, image mode, and resize without overbright bloom.
- Delete tranche research diaries from source and keep durable art/technical rationale in DESIGN/README.
- Install Aurora's typed deferred-init failure handler at every owner, surface the actual engine identity in VizStudio, and keep adapter/context/shader/setup failures explicit with zero warning-only or unhandled-rejection path.

## File manifest (87)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 2 | repair | demo/chassis/hero/focal.ts | — | 9ad415a77a918ad566bc39d36b921b0a9aa59cae | source base |
| 3 | repair | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 4 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 5 | repair | demo/router.ts | — | 7f88ba5492b7d6a17bc890f3898edd7d8749dfc2 | source base |
| 6 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 7 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 8 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 9 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 10 | repair | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 11 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 12 | repair | demo/stories/dock/rail.vue | — | f843e4e6adc30faad601cf75ece55aa37dd92272 | source base |
| 13 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 14 | modify | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 15 | modify | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 16 | modify | demo/stories/substrates/aurora/AuroraStage.vue | — | 1511aabb33b2c5846151a07740354fe0af8efca2 | source base |
| 17 | repair | demo/stories/substrates/aurora/config/CompositionLayer.vue | — | 006b7735eaf3b6d90a881b15435dcb9c157a46aa | source base |
| 18 | repair | demo/stories/substrates/aurora/config/FlowLayer.vue | — | 5b6a771e32fd19376a182f3bed491397145f99b2 | source base |
| 19 | repair | demo/stories/substrates/aurora/config/NucleiLayer.vue | — | 4438e6a419d01461e7f2b1c72eeed053038505d6 | source base |
| 20 | repair | demo/stories/substrates/aurora/config/options.ts | — | 2fb120cd0b760df8bb8f778b8b9eb16ad15dd0a3 | source base |
| 21 | repair | demo/stories/substrates/aurora/config/PaletteLayer.vue | — | 59bdf9371357bf749664fc017cbe03e7c657c45d | source base |
| 22 | repair | demo/stories/substrates/aurora/config/TextureLayer.vue | — | 5a24b0210d62fd9ea5cee40085eef2217e1bd0da | source base |
| 23 | repair | demo/stories/substrates/aurora/config/usePaletteStops.ts | — | 52d4541130ba2e0dec4d5563f630bec6bc4426bd | source base |
| 24 | repair | demo/stories/substrates/aurora/NucleiOverlay.vue | — | 7da942d2f050904d101f2303859358a58013c562 | source base |
| 25 | repair | demo/stories/substrates/aurora/OklchStopRow.vue | — | 04bc76245b45f57ec97a846de7b77a6a31d55c28 | source base |
| 26 | repair | demo/stories/substrates/aurora/presets.ts | — | 74bd131a3d369e14ee35a26915db3afc178ee0b0 | source base |
| 27 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 28 | repair | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue | — | 28724c06ddb8640c9f744ba4404e35b3fdf80730 | source base |
| 29 | repair | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue | — | b6bf718d53e096646d18ee29526283923c5e780a | source base |
| 30 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 31 | repair | demo/stories/substrates/glass-panel.vue | — | ff1fe558ecfd84fd3543b4c7162cfe1030da6cca | source base |
| 32 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 33 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 34 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 35 | modify | src/components/aurora/Aurora.vue | — | — | BI.W-P008 |
| 36 | modify | src/components/aurora/composables/atoms-fields.ts | — | — | BI.W-P008 |
| 37 | modify | src/components/aurora/composables/atoms.ts | — | — | BI.W-P008 |
| 38 | modify | src/components/aurora/composables/auroraFallbackGround.ts | — | — | BI.W-P008 |
| 39 | modify | src/components/aurora/composables/auroraImageSource.ts | — | — | BI.W-P008 |
| 40 | modify | src/components/aurora/composables/color.ts | — | — | BI.W-P008 |
| 41 | modify | src/components/aurora/composables/configSource.ts | — | — | BI.W-P008 |
| 42 | modify | src/components/aurora/composables/frameLoop.ts | — | — | BI.W-P008 |
| 43 | modify | src/components/aurora/composables/glSetup.ts | — | — | BI.W-P008 |
| 44 | modify | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 45 | modify | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 46 | modify | src/components/aurora/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 47 | modify | src/components/aurora/composables/uniformBridgeWGPUImage.ts | — | — | BI.W-P008 |
| 48 | modify | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 49 | modify | src/components/aurora/composables/useCursorInteraction.ts | — | — | BI.W-P008 |
| 50 | modify | src/components/aurora/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 51 | modify | src/components/aurora/constants/budget.ts | — | — | BI.W-P008 |
| 52 | modify | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 53 | modify | src/components/aurora/constants/renderMode.ts | — | — | BI.W-P008 |
| 54 | modify | src/components/aurora/constants/shaders/aurora-image.frag.ts | — | — | BI.W-P008 |
| 55 | modify | src/components/aurora/constants/shaders/aurora-image.wgsl.ts | — | — | BI.W-P008 |
| 56 | modify | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts | — | — | BI.W-P008 |
| 57 | modify | src/components/aurora/constants/shaders/aurora.frag.ts | — | — | BI.W-P008 |
| 58 | modify | src/components/aurora/constants/shaders/aurora.vert.ts | — | — | BI.W-P008 |
| 59 | modify | src/components/aurora/constants/shaders/aurora.wgsl.ts | — | — | BI.W-P008 |
| 60 | modify | src/components/aurora/constants/shaders/brush.glsl.ts | — | — | BI.W-P008 |
| 61 | modify | src/components/aurora/constants/shaders/composition.glsl.ts | — | — | BI.W-P008 |
| 62 | modify | src/components/aurora/constants/shaders/flow.glsl.ts | — | — | BI.W-P008 |
| 63 | modify | src/components/aurora/constants/shaders/mediums.glsl.ts | — | — | BI.W-P008 |
| 64 | modify | src/components/aurora/constants/shaders/metal-medium.glsl.ts | — | — | BI.W-P008 |
| 65 | modify | src/components/aurora/constants/shaders/oil-modes.glsl.ts | — | — | BI.W-P008 |
| 66 | modify | src/components/aurora/constants/shaders/procedural-color.wgsl.ts | — | — | BI.W-P008 |
| 67 | modify | src/components/aurora/constants/shaders/tonemap.glsl.ts | — | — | BI.W-P008 |
| 68 | modify | src/components/aurora/constants/shaders/vangogh-medium.glsl.ts | — | — | BI.W-P008 |
| 69 | modify | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 70 | modify | src/components/aurora/index.ts | — | — | BI.W-P008 |
| 71 | modify | src/components/aurora/README.md | — | — | BI.W-P008 |
| 72 | modify | src/components/aurora/RESEARCH.md | — | — | BI.W-P008 |
| 73 | repair | tests-visual/_aur-vangogh-harness.ts | — | 11b894edbdf02e9e33270dc03bcc8afa3790ba9a | source base |
| 74 | create | tests-visual/aurora-apotheosis.spec.ts | — | — | source base |
| 75 | repair | tests-visual/aurora-swraster.spec.ts | — | ddb4d2ffbdc664a64bc242dc479f81073864f492 | source base |
| 76 | repair | tests-visual/aurora-vibrancy.spec.ts | — | 8a2082909b9c29c30716431696d6db697dd741f1 | source base |
| 77 | repair | tests-visual/page-chassis.spec.ts | — | 27b8703f375e90ae36f7295e7f2813632ab30e99 | source base |
| 78 | repair | tests-visual/webgpu-everywhere.spec.ts | — | 89191ad79581e316474d0675556cb5c579d7ac15 | source base |
| 79 | create | tests/components/aurora/contract.test.ts | — | — | source base |
| 80 | repair | tests/components/custom/aurora/atoms.test.ts | — | 7352fd624be903587619d067b19f783fba20266b | source base |
| 81 | repair | tests/components/custom/aurora/color-equivalence.test.ts | — | a68b05a055de9809a0bfec117c7393e94f49cad5 | source base |
| 82 | repair | tests/components/custom/aurora/derive-aurora.test.ts | — | 1b49b6149601e0b325c800b5c43ab9300466ba0b | source base |
| 83 | repair | tests/components/custom/aurora/derive-color.test.ts | — | c26334a95550e3fbfe147f140e01746b9f3ee63e | source base |
| 84 | repair | tests/components/custom/aurora/mediums-extraction.test.ts | — | fa34717672e69e80f10f5cb9bd187dcebdd2d662 | source base |
| 85 | repair | tests/components/custom/aurora/painterly.test.ts | — | 458e527eb2828dc5dce700b24c0f4b666ec700fc | source base |
| 86 | repair | tests/components/custom/aurora/render-mode.test.ts | — | d5580f4d6c1339943c938e5c4fc57fcea2176b4b | source base |
| 87 | repair | tests/composables/color/warm-catch-light.test.ts | — | 412efd14ac67a21eef6751564b59959a7b472d4d | source base |

## Repair manifest (95)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/StoryHeader.vue |
| imports | 2 | demo/chassis/hero/StoryHero.vue |
| imports | 3 | demo/chassis/hero/aurora-hero.ts |
| imports | 4 | demo/chassis/hero/focal.ts |
| imports | 5 | demo/router.ts |
| imports | 6 | demo/shell/AppShell.vue |
| imports | 7 | demo/stories/compositions/auth-shell.vue |
| imports | 8 | demo/stories/display/buttons.vue |
| imports | 9 | demo/stories/display/card.vue |
| imports | 10 | demo/stories/dock/DockStage.vue |
| imports | 11 | demo/stories/dock/overview.vue |
| imports | 12 | demo/stories/dock/rail.vue |
| imports | 13 | demo/stories/manifest.ts |
| imports | 14 | demo/stories/substrates/aurora.vue |
| imports | 15 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 16 | demo/stories/substrates/aurora/AuroraStage.vue |
| imports | 17 | demo/stories/substrates/aurora/NucleiOverlay.vue |
| imports | 18 | demo/stories/substrates/aurora/OklchStopRow.vue |
| imports | 19 | demo/stories/substrates/aurora/config/CompositionLayer.vue |
| imports | 20 | demo/stories/substrates/aurora/config/FlowLayer.vue |
| imports | 21 | demo/stories/substrates/aurora/config/NucleiLayer.vue |
| imports | 22 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| imports | 23 | demo/stories/substrates/aurora/config/TextureLayer.vue |
| imports | 24 | demo/stories/substrates/aurora/config/options.ts |
| imports | 25 | demo/stories/substrates/aurora/config/usePaletteStops.ts |
| imports | 26 | demo/stories/substrates/aurora/presets.ts |
| imports | 27 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 28 | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue |
| imports | 29 | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue |
| imports | 30 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 31 | demo/stories/substrates/glass-panel.vue |
| imports | 32 | tests-visual/_aur-vangogh-harness.ts |
| imports | 33 | tests-visual/aurora-swraster.spec.ts |
| imports | 34 | tests-visual/aurora-vibrancy.spec.ts |
| imports | 35 | tests-visual/page-chassis.spec.ts |
| imports | 36 | tests-visual/webgpu-everywhere.spec.ts |
| imports | 37 | tests/components/custom/aurora/atoms.test.ts |
| imports | 38 | tests/components/custom/aurora/color-equivalence.test.ts |
| imports | 39 | tests/components/custom/aurora/derive-aurora.test.ts |
| imports | 40 | tests/components/custom/aurora/derive-color.test.ts |
| imports | 41 | tests/components/custom/aurora/mediums-extraction.test.ts |
| imports | 42 | tests/components/custom/aurora/painterly.test.ts |
| imports | 43 | tests/components/custom/aurora/render-mode.test.ts |
| imports | 44 | tests/composables/color/warm-catch-light.test.ts |
| tests | 1 | demo/chassis/hero/StoryHeader.vue |
| tests | 2 | demo/chassis/hero/StoryHero.vue |
| tests | 3 | demo/chassis/hero/aurora-hero.ts |
| tests | 4 | demo/chassis/hero/focal.ts |
| tests | 5 | demo/router.ts |
| tests | 6 | demo/shell/AppShell.vue |
| tests | 7 | demo/stories/compositions/auth-shell.vue |
| tests | 8 | demo/stories/display/buttons.vue |
| tests | 9 | demo/stories/display/card.vue |
| tests | 10 | demo/stories/dock/DockStage.vue |
| tests | 11 | demo/stories/dock/overview.vue |
| tests | 12 | demo/stories/dock/rail.vue |
| tests | 13 | demo/stories/manifest.ts |
| tests | 14 | demo/stories/substrates/aurora.vue |
| tests | 15 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| tests | 16 | demo/stories/substrates/aurora/AuroraStage.vue |
| tests | 17 | demo/stories/substrates/aurora/NucleiOverlay.vue |
| tests | 18 | demo/stories/substrates/aurora/OklchStopRow.vue |
| tests | 19 | demo/stories/substrates/aurora/config/CompositionLayer.vue |
| tests | 20 | demo/stories/substrates/aurora/config/FlowLayer.vue |
| tests | 21 | demo/stories/substrates/aurora/config/NucleiLayer.vue |
| tests | 22 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| tests | 23 | demo/stories/substrates/aurora/config/TextureLayer.vue |
| tests | 24 | demo/stories/substrates/aurora/config/options.ts |
| tests | 25 | demo/stories/substrates/aurora/config/usePaletteStops.ts |
| tests | 26 | demo/stories/substrates/aurora/presets.ts |
| tests | 27 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| tests | 28 | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue |
| tests | 29 | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue |
| tests | 30 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| tests | 31 | demo/stories/substrates/glass-panel.vue |
| tests | 32 | tests-visual/_aur-vangogh-harness.ts |
| tests | 33 | tests-visual/aurora-apotheosis.spec.ts |
| tests | 34 | tests-visual/aurora-swraster.spec.ts |
| tests | 35 | tests-visual/aurora-vibrancy.spec.ts |
| tests | 36 | tests-visual/page-chassis.spec.ts |
| tests | 37 | tests-visual/webgpu-everywhere.spec.ts |
| tests | 38 | tests/components/aurora/contract.test.ts |
| tests | 39 | tests/components/custom/aurora/atoms.test.ts |
| tests | 40 | tests/components/custom/aurora/color-equivalence.test.ts |
| tests | 41 | tests/components/custom/aurora/derive-aurora.test.ts |
| tests | 42 | tests/components/custom/aurora/derive-color.test.ts |
| tests | 43 | tests/components/custom/aurora/mediums-extraction.test.ts |
| tests | 44 | tests/components/custom/aurora/painterly.test.ts |
| tests | 45 | tests/components/custom/aurora/render-mode.test.ts |
| tests | 46 | tests/composables/color/warm-catch-light.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/aurora/DESIGN.md |
| docs | 3 | src/components/aurora/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P046/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Aurora has one config/color/lifecycle/failure semantics across engines, exposes its actual engine, and every medium remains recognizably Aurora, bounded, pause-aware, warning-free, and legible behind functional content.

**Required mutation bite:** Change one WGSL preset scalar meaning without GLSL/reference update, or arm deferred initialization without onInitError and let failure escape; parity/config/failure checks must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P046`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |
| procedural.interaction | browser | Pointer/touch/keyboard/config interaction changes a scene deliberately, remains bounded, and preserves a calm default plus PRM behavior. | Let pointer velocity eject a blob satellite from containment.; Keep autonomous turbulence moving under PRM. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: aurora-default-light, aurora-default-dark, aurora-mediums, aurora-image, aurora-pointer, aurora-prm, aurora-parity, aurora-injected-init-failure
Observables: scene identity statistics, runtime engine identity, color/readback parity, interaction bounds, typed failure and zero unhandled rejection, frame pacing, content legibility
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P031 | PRM yields immediate complete state, no nonessential travel/continuous work, and one reactive authority across CSS and JS. |
| BI.W-P044 | The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding. |
| BI.W-P045 | A scene runs on a declared capable engine with visible runtime-derived identity and an installed typed failure channel, or shows explicit failure; it never masks failure with an unrelated renderer, prose identity, warning, or unhandled rejection. |

Declared semantic locks: `component-aurora`. The cursor also acquires 87 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
