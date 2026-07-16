# BI.W-P020 — Restrained accent and semantic color-event grammar

**Status:** IMPLEMENTED ON THE CURRENT COLOR CORE — NATIVE ACCEPTANCE AND P127 VALUE 4 CUT PENDING
**Topological stratum:** BI.S10
**Formation family:** design-foundation
**Core centers:** C1_LIQUID_GLASS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P020`

## Intent

Replace page-local palette drift with semantic ink/material/status/accent roles and one deliberate color event per major composition.

## Exact scope

- Unify CSS, Canvas, GLSL, and WGSL color inputs through typed semantic roles and the shared linear-light resolver.
- Delete teal/navy default drift, dead brand aliases, and color-only state distinctions.
- Define where an accent event is allowed and make ordinary structure warm/neutral.
- Validate gamut, dark resolution, contrast, forced colors, and procedural handoff.

## File manifest (109)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/code/hljs-house-theme.css | — | 05baff4653f22c24b0fbc66117227ee8b5de4a61 | source base |
| 2 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 3 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 4 | repair | demo/shell/configurator/presets/neutral.css | — | — | BI.W-P012 |
| 5 | repair | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 6 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 7 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 8 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 9 | repair | demo/stories/containers/expandable-container.vue | — | c9af261acd7645d6554af40df87d84c834c5b517 | source base |
| 10 | repair | demo/stories/data/TimelineContinuousBody.vue | — | ff412634257566da40a4891789203c7e7c36c904 | source base |
| 11 | repair | demo/stories/data/TimelineSegmentedBody.vue | — | 9546a0e569cdd42f7e964e8a19a8c1408c27c4de | source base |
| 12 | repair | demo/stories/display/badge.vue | — | 2cc390d89ae7e0025b00b6d7dac973ba36d09a85 | source base |
| 13 | repair | demo/stories/display/metric-badge.vue | — | 0ce729be9d5638820a513e649ae011004a647229 | source base |
| 14 | repair | demo/stories/display/status-dot.vue | — | b77693f1ca47379b82834971061e67356c1503cb | source base |
| 15 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 16 | repair | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 17 | repair | demo/stories/forms/select.vue | — | 831a46d8d8aed8a4c74eabd9d71c936b4ed72492 | source base |
| 18 | repair | demo/stories/forms/selectable-chip.vue | — | 38a31fcb4dd3a1d5438746f386d50dc8925ff91a | source base |
| 19 | repair | demo/stories/forms/slider.vue | — | 7ba393813177863acc6ac6a34292570759e6f5ec | source base |
| 20 | repair | demo/stories/foundations/chart-chassis-palette.vue | — | efc049f29ea84e68a9e615ca4b68c0633ac4d94c | source base |
| 21 | repair | demo/stories/foundations/colors.vue | — | e135a8684cba765b758f96bbf2ae5a4d72f5831b | source base |
| 22 | repair | demo/stories/foundations/paper-glass.vue | — | 2301793abe89df723239e3600d526c54a5d06da6 | source base |
| 23 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 24 | repair | demo/stories/motion/animated-digit.vue | — | 037ce8e85cfc0777dc4f8c60a991c5e3fb889e34 | source base |
| 25 | repair | demo/stories/motion/countup.vue | — | 9e211d7ed538441aa2b4c69c757c0faf2fd8159c | source base |
| 26 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 27 | repair | demo/stories/motion/handmark.vue | — | b7540e930d7ee9d6859af664a567c2efedec4335 | source base |
| 28 | repair | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 29 | repair | demo/stories/motion/scroll.vue | — | 14f381aa282422f73b5238d725b21258ecd9f599 | source base |
| 30 | repair | demo/stories/motion/ScrollChoreographyBody.vue | — | b858ac6530a4639409d25655316ac0503970142d | source base |
| 31 | repair | demo/stories/motion/text-motion.vue | — | bf6ef80875b5cdb6af038fd2f378f55e164edf7b | source base |
| 32 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 33 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 34 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 35 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 36 | repair | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 37 | repair | src/components/blob/Blob.vue | — | — | BI.W-P008 |
| 38 | repair | src/components/blob/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 39 | repair | src/components/blob/composables/uploadBlobUniforms.ts | — | — | BI.W-P008 |
| 40 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 41 | repair | src/components/blob/README.md | — | — | BI.W-P008 |
| 42 | repair | src/components/blob/RESEARCH.md | — | — | BI.W-P008 |
| 43 | repair | src/components/blob/shaders/metaball.frag.ts | — | — | BI.W-P008 |
| 44 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 45 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 46 | repair | src/components/border-progress/constants.ts | — | — | BI.W-P008 |
| 47 | repair | src/components/border-progress/README.md | — | — | BI.W-P008 |
| 48 | repair | src/components/button/index.ts | — | — | BI.W-P008 |
| 49 | repair | src/components/chip/Chip.vue | — | — | BI.W-P008 |
| 50 | repair | src/components/chip/chipVariants.ts | — | — | BI.W-P008 |
| 51 | repair | src/components/chip/README.md | — | — | BI.W-P008 |
| 52 | repair | src/components/constellation/README.md | — | — | BI.W-P008 |
| 53 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 54 | repair | src/components/easing/README.md | — | — | BI.W-P008 |
| 55 | repair | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts | — | — | BI.W-P008 |
| 56 | repair | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 57 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 58 | repair | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 59 | repair | src/components/instrument-chassis/README.md | — | — | BI.W-P008 |
| 60 | repair | src/components/metric-cell/README.md | — | — | BI.W-P008 |
| 61 | repair | src/components/metric-stack/README.md | — | — | BI.W-P008 |
| 62 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 63 | repair | src/components/progress/ProgressDefault.vue | — | — | BI.W-P008 |
| 64 | repair | src/components/progress/ProgressGradient.vue | — | — | BI.W-P008 |
| 65 | repair | src/components/progress/ProgressLiquid.vue | — | — | BI.W-P008 |
| 66 | repair | src/components/select/SelectItem.vue | — | — | BI.W-P008 |
| 67 | repair | src/components/slider/index.ts | — | — | BI.W-P008 |
| 68 | repair | src/components/status-dot/StatusDot.vue | — | — | BI.W-P008 |
| 69 | repair | src/components/switch/Switch.vue | — | — | BI.W-P008 |
| 70 | repair | src/components/timeline/GlassTimeline.vue | — | — | BI.W-P008 |
| 71 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 72 | repair | src/components/timeline/SegmentedTimeline.vue | — | — | BI.W-P008 |
| 73 | modify | src/composables/color/accent-tone-solve.ts | — | d79c1758322bb095bb231703b724e1ca43aceb26 | source base |
| 74 | modify | src/composables/color/index.ts | — | 50c3688ba72f56ad962941f88e3535a161827a10 | source base |
| 75 | modify | src/composables/color/spectrum-walk.ts | — | cfd59489e0d18b9bff928e69de4e6edb0cdaa026 | source base |
| 76 | modify | src/composables/color/useAccentTone.ts | — | 6fb5b033fd4763223fae17425331dae3c302c5dd | source base |
| 77 | repair | src/composables/dom/index.ts | — | 6373a9d811282817966f2ec6c7eb2432d757e0eb | source base |
| 78 | repair | src/composables/dom/useResolveTokenColor.ts | — | 07f5e36ba049bbcb2fb12634bd6e5b70f6f2e455 | source base |
| 79 | repair | src/composables/dom/useTokenColor.ts | — | 88b514b81e6091e46ef8cb0c11c5f6f458c4ce6e | source base |
| 80 | repair | src/composables/glass/backdropLuminanceSample.ts | — | 3e327f311faa8ab53681165e7cd7cf063b20c85f | source base |
| 81 | repair | src/composables/glass/canvas2d/index.ts | — | 3a9f176bdce15830981142fb9d5983049d2dd586 | source base |
| 82 | modify | src/composables/glass/canvas2d/resolveCanvasColor.ts | — | fb5d2f75f7502a2b0d894cb2f10f9d7087730494 | source base |
| 83 | repair | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 84 | repair | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 85 | repair | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 86 | repair | src/styles/dock-controls/touch-floor.css | — | d9eb7500b2008e86ade95a8d61fe255993b1722c | source base |
| 87 | repair | src/styles/dock/layer-group.css | — | 9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd | source base |
| 88 | repair | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 89 | repair | src/styles/glass/accent-tone.css | — | a3b375be285ae44c17e16087551f1d36eec3ea36 | source base |
| 90 | repair | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 91 | repair | src/styles/glass/glass-chip.css | — | 78c37cea99d056fcfd8ed0219a094325645f9c53 | source base |
| 92 | repair | src/styles/glass/progress-rail.css | — | 02f64c4cb98bf7667c4151a0d7012a5eb5c6d34f | source base |
| 93 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 94 | repair | src/styles/menu.css | — | b857356e839255ecff703eb38e8368445e7c8598 | source base |
| 95 | modify | src/styles/theme.css | — | 7f77e670edffad3948c77f89e58d4a6d5769f91a | source base |
| 96 | repair | src/styles/theme/bridges.css | — | 3ba96c25d80207be2c068037f267cce934835997 | source base |
| 97 | repair | src/styles/tokens/color-radius.css | — | 39abb72a24aa29eeac358f0a2c2cc3eee480aea9 | source base |
| 98 | create | src/styles/tokens/color.css | — | — | source base |
| 99 | repair | src/styles/tokens/dark-arm.css | — | e776b8ded03aeadd57fc3ceea0c86f06dc2dd7e4 | source base |
| 100 | repair | src/styles/tokens/glass-fx.css | — | e20e236bcd7b013bc41ecd3ca45e77fdbbd17edb | source base |
| 101 | repair | src/styles/tokens/light-dark.css | — | b23e6baa9e9e4bfb44c26a0cf41c634823b228df | source base |
| 102 | repair | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 103 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 104 | repair | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 105 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 106 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 107 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 108 | create | tests-visual/color-grammar.spec.ts | — | — | source base |
| 109 | create | tests/composables/color/color-contract.test.ts | — | — | source base |

## Repair manifest (105)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/code/hljs-house-theme.css |
| imports | 2 | demo/chassis/hero/StoryHero.vue |
| imports | 3 | demo/demo.css |
| imports | 4 | demo/shell/configurator/presets/neutral.css |
| imports | 5 | demo/shell/dock-nav.css |
| imports | 6 | demo/stories/compositions/auth-shell.vue |
| imports | 7 | demo/stories/compositions/empty-states.vue |
| imports | 8 | demo/stories/compositions/settings.vue |
| imports | 9 | demo/stories/containers/expandable-container.vue |
| imports | 10 | demo/stories/data/TimelineContinuousBody.vue |
| imports | 11 | demo/stories/data/TimelineSegmentedBody.vue |
| imports | 12 | demo/stories/display/badge.vue |
| imports | 13 | demo/stories/display/metric-badge.vue |
| imports | 14 | demo/stories/display/status-dot.vue |
| imports | 15 | demo/stories/dock/dock-search.vue |
| imports | 16 | demo/stories/feedback/progress.vue |
| imports | 17 | demo/stories/forms/select.vue |
| imports | 18 | demo/stories/forms/selectable-chip.vue |
| imports | 19 | demo/stories/forms/slider.vue |
| imports | 20 | demo/stories/foundations/chart-chassis-palette.vue |
| imports | 21 | demo/stories/foundations/colors.vue |
| imports | 22 | demo/stories/foundations/paper-glass.vue |
| imports | 23 | demo/stories/manifest.ts |
| imports | 24 | demo/stories/motion/ScrollChoreographyBody.vue |
| imports | 25 | demo/stories/motion/animated-digit.vue |
| imports | 26 | demo/stories/motion/countup.vue |
| imports | 27 | demo/stories/motion/curve-gallery.vue |
| imports | 28 | demo/stories/motion/handmark.vue |
| imports | 29 | demo/stories/motion/reveal.vue |
| imports | 30 | demo/stories/motion/scroll.vue |
| imports | 31 | demo/stories/motion/text-motion.vue |
| imports | 32 | demo/stories/substrates/blob.vue |
| imports | 33 | demo/stories/substrates/constellation.vue |
| imports | 34 | demo/stories/substrates/fourier-field.vue |
| imports | 35 | src/components/PROCEDURAL-SUITE.md |
| imports | 36 | src/components/aurora/composables/uniformBridge.ts |
| imports | 37 | src/components/blob/Blob.vue |
| imports | 38 | src/components/blob/README.md |
| imports | 39 | src/components/blob/RESEARCH.md |
| imports | 40 | src/components/blob/composables/uniformBridgeWGPU.ts |
| imports | 41 | src/components/blob/composables/uploadBlobUniforms.ts |
| imports | 42 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 43 | src/components/blob/shaders/metaball.frag.ts |
| imports | 44 | src/components/blob/types.ts |
| imports | 45 | src/components/border-progress/BorderProgress.vue |
| imports | 46 | src/components/border-progress/README.md |
| imports | 47 | src/components/border-progress/constants.ts |
| imports | 48 | src/components/button/index.ts |
| imports | 49 | src/components/chip/Chip.vue |
| imports | 50 | src/components/chip/README.md |
| imports | 51 | src/components/chip/chipVariants.ts |
| imports | 52 | src/components/constellation/README.md |
| imports | 53 | src/components/easing/EasingPicker.vue |
| imports | 54 | src/components/easing/README.md |
| imports | 55 | src/components/fourier-field/FourierField.vue |
| imports | 56 | src/components/fourier-field/README.md |
| imports | 57 | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts |
| imports | 58 | src/components/fourier-field/constants.ts |
| imports | 59 | src/components/instrument-chassis/README.md |
| imports | 60 | src/components/metric-cell/README.md |
| imports | 61 | src/components/metric-stack/README.md |
| imports | 62 | src/components/progress/ProgressDefault.vue |
| imports | 63 | src/components/progress/ProgressGradient.vue |
| imports | 64 | src/components/progress/ProgressLiquid.vue |
| imports | 65 | src/components/select/SelectItem.vue |
| imports | 66 | src/components/slider/index.ts |
| imports | 67 | src/components/status-dot/StatusDot.vue |
| imports | 68 | src/components/switch/Switch.vue |
| imports | 69 | src/components/timeline/GlassTimeline.vue |
| imports | 70 | src/components/timeline/ScrubberTimeline.vue |
| imports | 71 | src/components/timeline/SegmentedTimeline.vue |
| imports | 72 | src/composables/color/accent-tone-solve.ts |
| imports | 73 | src/composables/color/useAccentTone.ts |
| imports | 74 | src/composables/dom/index.ts |
| imports | 75 | src/composables/dom/useResolveTokenColor.ts |
| imports | 76 | src/composables/dom/useTokenColor.ts |
| imports | 77 | src/composables/glass/backdropLuminanceSample.ts |
| imports | 78 | src/composables/glass/canvas2d/index.ts |
| imports | 79 | src/composables/glass/canvas2d/resolveCanvasColor.ts |
| imports | 80 | src/composables/glass/index.ts |
| imports | 81 | src/composables/glass/useGlassBackdropLuminance.ts |
| imports | 82 | src/styles/cards.css |
| imports | 83 | src/styles/dock-controls/touch-floor.css |
| imports | 84 | src/styles/dock/layer-group.css |
| imports | 85 | src/styles/glass.css |
| imports | 86 | src/styles/glass/accent-tone.css |
| imports | 87 | src/styles/glass/glass-atom.css |
| imports | 88 | src/styles/glass/glass-chip.css |
| imports | 89 | src/styles/glass/progress-rail.css |
| imports | 90 | src/styles/instrument-chassis.css |
| imports | 91 | src/styles/menu.css |
| imports | 92 | src/styles/theme/bridges.css |
| imports | 93 | src/styles/tokens/color-radius.css |
| imports | 94 | src/styles/tokens/dark-arm.css |
| imports | 95 | src/styles/tokens/glass-fx.css |
| imports | 96 | src/styles/tokens/light-dark.css |
| imports | 97 | src/styles/tokens/scale-paper.css |
| imports | 98 | src/styles/tokens/scheme-motion.css |
| imports | 99 | src/styles/tokens/sizing.css |
| imports | 100 | src/styles/utilities/base-misc.css |
| imports | 101 | src/styles/utilities/base.css |
| imports | 102 | src/styles/utilities/btn.css |
| tests | 1 | tests-visual/color-grammar.spec.ts |
| tests | 2 | tests/composables/color/color-contract.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P020/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Color roles are semantic and linear-light consistent; state remains legible without hue and each composition has at most its declared accent event.

**Required mutation bite:** Reintroduce a brand-red selected state with no noncolor signal and require contrast/affordance to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P020`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.token-graph | device-free | Every semantic token has one definition, typed domain, live consumer, valid dark/contrast resolution, and no alias cycle or dead rung. | Create a token alias cycle.; Add a defined token with no computed consumer. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: color-light, color-dark, color-forced, color-complex-backdrop
Observables: contrast, semantic role resolution, noncolor state signal, gamut/readback consistency
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P015 | Every live token has one semantic definition, typed domain, computed consumer, and accessible mode resolution; no alias is needed to preserve an old name. |

Declared semantic locks: `global-color`, `global-tokens`. The cursor also acquires 109 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
