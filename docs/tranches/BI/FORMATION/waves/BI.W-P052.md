# BI.W-P052 — Procedural configuration schema and live control roundtrip

**Status:** PLANNED
**Topological stratum:** BI.S18
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P052`

## Intent

Give every scene a typed, serializable, bounded config whose demo controls alter the live renderer and roundtrip exactly.

## Exact scope

- Define shared schema metadata for type, unit, bounds, defaults, grouping, serialization, and engine support without flattening scene-specific concepts.
- Generate Configurator controls and persistence from schemas; remove dead knobs and duplicated defaults/writers.
- Prove every control changes the claimed observable on every renderer applicable to that scene and roundtrips without loss; a single-renderer scene cannot be forced into a synthetic engine switch.
- Keep accessibility labels, keyboard entry, reset, and invalid-input handling complete.

## File manifest (179)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/category-hero.ts | — | a6c576bb063cdd67aea4ea13decc13d8f8b4b5e0 | source base |
| 2 | repair | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 3 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 4 | repair | demo/chassis/PermutationGrid.vue | — | 60cb9b610e5542b71a6c185575609e2f106c54a3 | source base |
| 5 | repair | demo/chassis/section/useSectionReveal.ts | — | e86e5240dbce917231278703558733326ffc8259 | source base |
| 6 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 7 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 8 | modify | demo/shell/configurator/index.ts | — | — | BI.W-P012 |
| 9 | modify | demo/shell/configurator/preset-editor/css-writers.ts | — | — | BI.W-P012 |
| 10 | modify | demo/shell/configurator/preset-editor/defaults.ts | — | — | BI.W-P012 |
| 11 | modify | demo/shell/configurator/preset-editor/persistence.ts | — | — | BI.W-P012 |
| 12 | modify | demo/shell/configurator/preset-editor/store.ts | — | — | BI.W-P012 |
| 13 | modify | demo/shell/configurator/preset-editor/stylesheet-swap.ts | — | — | BI.W-P012 |
| 14 | modify | demo/shell/configurator/preset-editor/types.ts | — | — | BI.W-P012 |
| 15 | modify | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 16 | modify | demo/shell/configurator/presets/manifest.ts | — | — | BI.W-P012 |
| 17 | modify | demo/shell/configurator/presets/neutral.css | — | — | BI.W-P012 |
| 18 | modify | demo/shell/configurator/useConfiguratorOpen.ts | — | — | BI.W-P012 |
| 19 | modify | demo/shell/configurator/usePresetEditor.ts | — | — | BI.W-P012 |
| 20 | repair | demo/shell/dock-layer-contexts.ts | — | a89627e10ced4c94b5ba249f439316e81dd0e00a | source base |
| 21 | repair | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 22 | repair | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 23 | repair | demo/stories/compositions/chassis.vue | — | 1e40177de1d581b4731c53f16600982e1592a005 | source base |
| 24 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 25 | repair | demo/stories/containers/configurator.vue | — | 887b9cbd50fada0688b1f5f021e461c980d4390f | source base |
| 26 | repair | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 27 | repair | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 28 | repair | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 29 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 30 | repair | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 31 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 32 | repair | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 33 | repair | demo/stories/feedback/confirm-dialog.vue | — | dd4cd511fcc738f1d30c2b76e352f364425a17e2 | source base |
| 34 | repair | demo/stories/forms/labeled-field.vue | — | e1e428d93503b932882d8daca37d0fb2592571f3 | source base |
| 35 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 36 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 37 | repair | demo/stories/motion/deck.vue | — | fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0 | source base |
| 38 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 39 | modify | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 40 | repair | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 41 | repair | demo/stories/substrates/aurora/AuroraStage.vue | — | 1511aabb33b2c5846151a07740354fe0af8efca2 | source base |
| 42 | repair | demo/stories/substrates/aurora/PresetPickerRow.vue | — | 54862db17b5598523816cfc15ea18927a76c1b09 | source base |
| 43 | repair | demo/stories/substrates/aurora/presets.ts | — | 74bd131a3d369e14ee35a26915db3afc178ee0b0 | source base |
| 44 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 45 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 46 | modify | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 47 | modify | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 48 | modify | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 49 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 50 | modify | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 51 | repair | demo/stories/substrates/presets.ts | — | 495f075c40c737978133d8888c6ab090bb94f241 | source base |
| 52 | modify | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 53 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 54 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 55 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 56 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 57 | repair | src/components/aurora/Aurora.vue | — | — | BI.W-P008 |
| 58 | repair | src/components/aurora/composables/atoms-fields.ts | — | — | BI.W-P008 |
| 59 | repair | src/components/aurora/composables/atoms.ts | — | — | BI.W-P008 |
| 60 | repair | src/components/aurora/composables/auroraFallbackGround.ts | — | — | BI.W-P008 |
| 61 | repair | src/components/aurora/composables/auroraImageSource.ts | — | — | BI.W-P008 |
| 62 | repair | src/components/aurora/composables/color.ts | — | — | BI.W-P008 |
| 63 | repair | src/components/aurora/composables/configSource.ts | — | — | BI.W-P008 |
| 64 | repair | src/components/aurora/composables/frameLoop.ts | — | — | BI.W-P008 |
| 65 | repair | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 66 | repair | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 67 | repair | src/components/aurora/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 68 | repair | src/components/aurora/composables/uniformBridgeWGPUImage.ts | — | — | BI.W-P008 |
| 69 | repair | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 70 | repair | src/components/aurora/composables/useCursorInteraction.ts | — | — | BI.W-P008 |
| 71 | repair | src/components/aurora/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 72 | repair | src/components/aurora/constants/budget.ts | — | — | BI.W-P008 |
| 73 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 74 | repair | src/components/aurora/constants/shaders/aurora.frag.ts | — | — | BI.W-P008 |
| 75 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 76 | repair | src/components/aurora/index.ts | — | — | BI.W-P008 |
| 77 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 78 | repair | src/components/aurora/RESEARCH.md | — | — | BI.W-P008 |
| 79 | repair | src/components/blob/config.ts | — | — | BI.W-P008 |
| 80 | repair | src/components/blob/index.ts | — | — | BI.W-P008 |
| 81 | repair | src/components/blob/presets.ts | — | — | BI.W-P008 |
| 82 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 83 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 84 | repair | src/components/border-progress/composables/useBorderSpectrum.ts | — | — | BI.W-P008 |
| 85 | repair | src/components/border-progress/constants.ts | — | — | BI.W-P008 |
| 86 | repair | src/components/border-progress/README.md | — | — | BI.W-P008 |
| 87 | repair | src/components/color-swatch/README.md | — | — | BI.W-P008 |
| 88 | modify | src/components/configurator/Configurator.vue | — | — | BI.W-P008 |
| 89 | modify | src/components/configurator/ConfiguratorLayer.vue | — | — | BI.W-P008 |
| 90 | modify | src/components/configurator/ConfiguratorRow.vue | — | — | BI.W-P008 |
| 91 | modify | src/components/configurator/index.ts | — | — | BI.W-P008 |
| 92 | modify | src/components/configurator/size.ts | — | — | BI.W-P008 |
| 93 | modify | src/components/configurator/useConfiguratorState.ts | — | — | BI.W-P008 |
| 94 | repair | src/components/constellation/constellationTypes.ts | — | — | BI.W-P008 |
| 95 | repair | src/components/constellation/README.md | — | — | BI.W-P008 |
| 96 | repair | src/components/deck/composables/useDeckSpring.ts | — | — | BI.W-P008 |
| 97 | repair | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 98 | repair | src/components/dock/composables/dockMorphContext.ts | — | — | BI.W-P008 |
| 99 | repair | src/components/dock/constants.ts | — | — | BI.W-P008 |
| 100 | repair | src/components/easing/composables/useEasingPicker.ts | — | — | BI.W-P008 |
| 101 | repair | src/components/easing/constants.ts | — | — | BI.W-P008 |
| 102 | repair | src/components/easing/EasingConfigurator.vue | — | — | BI.W-P008 |
| 103 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 104 | repair | src/components/easing/index.ts | — | — | BI.W-P008 |
| 105 | repair | src/components/easing/README.md | — | — | BI.W-P008 |
| 106 | repair | src/components/fading-scroll/README.md | — | — | BI.W-P008 |
| 107 | repair | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 108 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 109 | repair | src/components/fourier-field/index.ts | — | — | BI.W-P008 |
| 110 | repair | src/components/fourier-field/math.ts | — | — | BI.W-P008 |
| 111 | repair | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 112 | repair | src/components/handmark/brush.ts | — | — | BI.W-P008 |
| 113 | repair | src/components/handmark/freehand.ts | — | — | BI.W-P008 |
| 114 | repair | src/components/handmark/types.ts | — | — | BI.W-P008 |
| 115 | repair | src/components/icon-tooltip/IconTooltip.vue | — | — | BI.W-P008 |
| 116 | repair | src/components/labeled-field/LabeledField.vue | — | — | BI.W-P008 |
| 117 | repair | src/components/labeled-field/LabeledSelect.vue | — | — | BI.W-P008 |
| 118 | repair | src/components/labeled-field/LabeledSlider.vue | — | — | BI.W-P008 |
| 119 | repair | src/components/labeled-field/LabeledSwitch.vue | — | — | BI.W-P008 |
| 120 | repair | src/components/labeled-field/README.md | — | — | BI.W-P008 |
| 121 | repair | src/components/liquid-grid/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 122 | repair | src/components/liquid-grid/constants.ts | — | — | BI.W-P008 |
| 123 | repair | src/components/liquid-grid/LiquidGrid.vue | — | — | BI.W-P008 |
| 124 | repair | src/components/liquid-grid/README.md | — | — | BI.W-P008 |
| 125 | repair | src/components/pager-dots/PagerDots.vue | — | — | BI.W-P008 |
| 126 | repair | src/components/pager-dots/README.md | — | — | BI.W-P008 |
| 127 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 128 | repair | src/components/select/SelectTrigger.vue | — | — | BI.W-P008 |
| 129 | repair | src/components/slider/Slider.vue | — | — | BI.W-P008 |
| 130 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 131 | repair | src/components/watercolor-dot/WatercolorDot.vue | — | — | BI.W-P008 |
| 132 | create | src/composables/glass/procedural/config.ts | — | — | source base |
| 133 | repair | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 134 | repair | src/composables/motion/springPresets.ts | — | 67c33531dbed67a2b7a172d16bf8213812f0a37c | source base |
| 135 | repair | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 136 | repair | src/composables/motion/useDockCtaReceive.ts | — | 9ad016d7a426f05133188f346ca18a26f38d1323 | source base |
| 137 | repair | src/composables/motion/useDragMorph.ts | — | f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f | source base |
| 138 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 139 | repair | src/composables/motion/useLiquidReveal.ts | — | e0b07d8def7b5a2bb383845f1f96ceee663729f8 | source base |
| 140 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 141 | repair | src/composables/motion/useSpringMount.ts | — | 4a62de1fc2d424cc31dd6d4c60899e914fa25d86 | source base |
| 142 | repair | src/styles/configurator.css | — | 251d50ff9b2ec84111ce2949a0fe6e53190f73ad | source base |
| 143 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 144 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 145 | repair | src/styles/dock/popover.css | — | 5f9899bc157e13c39c460008bba052ba38bc5b78 | source base |
| 146 | repair | src/styles/dock/shape.css | — | 373e9d2f02d923d0c802de9059d50cc4e5f03e70 | source base |
| 147 | repair | src/styles/feedback-tone.css | — | e90895f604c82965e689083aaa08e7dcb1d1642b | source base |
| 148 | repair | src/styles/glass/squircle.css | — | 569730e4a98a6a49e40c590bb553e063b4509cea | source base |
| 149 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 150 | repair | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 151 | repair | src/styles/tabs/segmented-tabs-drag.css | — | 6c50427c9d299238b4ab086ffdf977820d31a9b8 | source base |
| 152 | repair | src/styles/theme/bridges.css | — | 3ba96c25d80207be2c068037f267cce934835997 | source base |
| 153 | repair | src/styles/tokens.css | — | 5194cd72e66628a48dda4b45c447a723893b86bf | source base |
| 154 | repair | src/styles/tokens/color-radius.css | — | 39abb72a24aa29eeac358f0a2c2cc3eee480aea9 | source base |
| 155 | repair | src/styles/tokens/dark-arm.css | — | e776b8ded03aeadd57fc3ceea0c86f06dc2dd7e4 | source base |
| 156 | repair | src/styles/tokens/glass-fx.css | — | e20e236bcd7b013bc41ecd3ca45e77fdbbd17edb | source base |
| 157 | repair | src/styles/tokens/glass.css | — | 5c09fd47c15544fb9e5d89202f0ef99c48208e1f | source base |
| 158 | repair | src/styles/tokens/motion-registers.css | — | 1da1345f11e6ae0fff495540ae9a2b5ef574997a | source base |
| 159 | repair | src/styles/tokens/offsets.css | — | 4f42a96aa25112af9b9ffe57b998a156a777cd6b | source base |
| 160 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 161 | repair | src/styles/tokens/sizing-config.css | — | 13f28e1a3345829223193904a38c3bf49be904e2 | source base |
| 162 | repair | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 163 | repair | src/styles/typography.css | — | 78204d4626f1bbe7cb1490184fad019d5c4d7de8 | source base |
| 164 | repair | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 165 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 166 | create | tests-visual/procedural-config.spec.ts | — | — | source base |
| 167 | repair | tests/components/custom/aurora/atoms.test.ts | — | 7352fd624be903587619d067b19f783fba20266b | source base |
| 168 | repair | tests/components/custom/aurora/color-equivalence.test.ts | — | a68b05a055de9809a0bfec117c7393e94f49cad5 | source base |
| 169 | repair | tests/components/custom/aurora/derive-aurora.test.ts | — | 1b49b6149601e0b325c800b5c43ab9300466ba0b | source base |
| 170 | repair | tests/components/custom/aurora/painterly.test.ts | — | 458e527eb2828dc5dce700b24c0f4b666ec700fc | source base |
| 171 | repair | tests/components/custom/configurator/ConfiguratorLayer.model.test.ts | — | f5579a38d99a4d6417f2b259c22a997f7eb06d32 | source base |
| 172 | repair | tests/components/custom/fourier-field/FourierField.smoke.test.ts | — | 35b7b08dab35704672aba083df6dfb671de9dc77 | source base |
| 173 | repair | tests/components/custom/handmark/brush.test.ts | — | cd67037e43189bd2e5cdae50619d079654ee38ce | source base |
| 174 | repair | tests/components/custom/handmark/highlight.test.ts | — | 5dc0ef26d34779a62ff8de47c993c41404093f5e | source base |
| 175 | create | tests/components/procedural-config.test.ts | — | — | source base |
| 176 | repair | tests/composables/motion/suite.test.ts | — | 26de5de23a966514a9273dd410f6e73165883a16 | source base |
| 177 | repair | tests/composables/useSpringMount.test.ts | — | 5129a7ac8a43a9bbbcdda557e6b2d96fe9c847f3 | source base |
| 178 | repair | tests/configurator-recursion.spec.ts | — | 6e20544f70859c70722c8fd1e62a371e72d5d57f | source base |
| 179 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |

## Repair manifest (178)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/PermutationGrid.vue |
| imports | 2 | demo/chassis/hero/StoryHero.vue |
| imports | 3 | demo/chassis/hero/category-hero.ts |
| imports | 4 | demo/chassis/hero/story-hero.css |
| imports | 5 | demo/chassis/section/useSectionReveal.ts |
| imports | 6 | demo/demo.css |
| imports | 7 | demo/shell/AppShell.vue |
| imports | 8 | demo/shell/SidebarDock.vue |
| imports | 9 | demo/shell/configurator/PresetEditor.vue |
| imports | 10 | demo/shell/configurator/index.ts |
| imports | 11 | demo/shell/configurator/preset-editor/css-writers.ts |
| imports | 12 | demo/shell/configurator/preset-editor/defaults.ts |
| imports | 13 | demo/shell/configurator/preset-editor/persistence.ts |
| imports | 14 | demo/shell/configurator/preset-editor/store.ts |
| imports | 15 | demo/shell/configurator/preset-editor/stylesheet-swap.ts |
| imports | 16 | demo/shell/configurator/preset-editor/types.ts |
| imports | 17 | demo/shell/configurator/presets/manifest.ts |
| imports | 18 | demo/shell/configurator/presets/neutral.css |
| imports | 19 | demo/shell/configurator/useConfiguratorOpen.ts |
| imports | 20 | demo/shell/configurator/usePresetEditor.ts |
| imports | 21 | demo/shell/dock-layer-contexts.ts |
| imports | 22 | demo/shell/dock-nav.css |
| imports | 23 | demo/stories/compositions/chassis.vue |
| imports | 24 | demo/stories/compositions/settings.vue |
| imports | 25 | demo/stories/containers/configurator.vue |
| imports | 26 | demo/stories/containers/dialog.vue |
| imports | 27 | demo/stories/containers/hover-card.vue |
| imports | 28 | demo/stories/data/sortable-list.vue |
| imports | 29 | demo/stories/display/buttons.vue |
| imports | 30 | demo/stories/dock/DockStage.vue |
| imports | 31 | demo/stories/dock/cta-receive.vue |
| imports | 32 | demo/stories/dock/dock-search.vue |
| imports | 33 | demo/stories/feedback/confirm-dialog.vue |
| imports | 34 | demo/stories/forms/labeled-field.vue |
| imports | 35 | demo/stories/manifest.ts |
| imports | 36 | demo/stories/motion/curve-gallery.vue |
| imports | 37 | demo/stories/motion/deck.vue |
| imports | 38 | demo/stories/motion/springs.vue |
| imports | 39 | demo/stories/substrates/VizStudio.vue |
| imports | 40 | demo/stories/substrates/aurora.vue |
| imports | 41 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 42 | demo/stories/substrates/aurora/AuroraStage.vue |
| imports | 43 | demo/stories/substrates/aurora/PresetPickerRow.vue |
| imports | 44 | demo/stories/substrates/aurora/presets.ts |
| imports | 45 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 46 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 47 | demo/stories/substrates/blob.vue |
| imports | 48 | demo/stories/substrates/constellation.vue |
| imports | 49 | demo/stories/substrates/fourier-field.vue |
| imports | 50 | demo/stories/substrates/glass-material.vue |
| imports | 51 | demo/stories/substrates/liquid-grid.vue |
| imports | 52 | demo/stories/substrates/presets.ts |
| imports | 53 | src/components/PROCEDURAL-SUITE.md |
| imports | 54 | src/components/aurora/Aurora.vue |
| imports | 55 | src/components/aurora/DESIGN.md |
| imports | 56 | src/components/aurora/README.md |
| imports | 57 | src/components/aurora/RESEARCH.md |
| imports | 58 | src/components/aurora/composables/atoms-fields.ts |
| imports | 59 | src/components/aurora/composables/atoms.ts |
| imports | 60 | src/components/aurora/composables/auroraFallbackGround.ts |
| imports | 61 | src/components/aurora/composables/auroraImageSource.ts |
| imports | 62 | src/components/aurora/composables/color.ts |
| imports | 63 | src/components/aurora/composables/configSource.ts |
| imports | 64 | src/components/aurora/composables/frameLoop.ts |
| imports | 65 | src/components/aurora/composables/runtime.ts |
| imports | 66 | src/components/aurora/composables/uniformBridge.ts |
| imports | 67 | src/components/aurora/composables/uniformBridgeWGPU.ts |
| imports | 68 | src/components/aurora/composables/uniformBridgeWGPUImage.ts |
| imports | 69 | src/components/aurora/composables/useAurora.ts |
| imports | 70 | src/components/aurora/composables/useCursorInteraction.ts |
| imports | 71 | src/components/aurora/composables/wgpuSetup.ts |
| imports | 72 | src/components/aurora/constants/budget.ts |
| imports | 73 | src/components/aurora/constants/presets.ts |
| imports | 74 | src/components/aurora/constants/shaders/aurora.frag.ts |
| imports | 75 | src/components/aurora/index.ts |
| imports | 76 | src/components/blob/config.ts |
| imports | 77 | src/components/blob/index.ts |
| imports | 78 | src/components/blob/presets.ts |
| imports | 79 | src/components/blob/types.ts |
| imports | 80 | src/components/border-progress/BorderProgress.vue |
| imports | 81 | src/components/border-progress/README.md |
| imports | 82 | src/components/border-progress/composables/useBorderSpectrum.ts |
| imports | 83 | src/components/border-progress/constants.ts |
| imports | 84 | src/components/color-swatch/README.md |
| imports | 85 | src/components/configurator/Configurator.vue |
| imports | 86 | src/components/configurator/ConfiguratorLayer.vue |
| imports | 87 | src/components/configurator/ConfiguratorRow.vue |
| imports | 88 | src/components/configurator/index.ts |
| imports | 89 | src/components/configurator/size.ts |
| imports | 90 | src/components/configurator/useConfiguratorState.ts |
| imports | 91 | src/components/constellation/README.md |
| imports | 92 | src/components/constellation/constellationTypes.ts |
| imports | 93 | src/components/deck/composables/useDeckSpring.ts |
| imports | 94 | src/components/dialog/DialogContent.vue |
| imports | 95 | src/components/dock/composables/dockMorphContext.ts |
| imports | 96 | src/components/dock/constants.ts |
| imports | 97 | src/components/easing/EasingConfigurator.vue |
| imports | 98 | src/components/easing/EasingPicker.vue |
| imports | 99 | src/components/easing/README.md |
| imports | 100 | src/components/easing/composables/useEasingPicker.ts |
| imports | 101 | src/components/easing/constants.ts |
| imports | 102 | src/components/easing/index.ts |
| imports | 103 | src/components/fading-scroll/README.md |
| imports | 104 | src/components/fourier-field/FourierField.vue |
| imports | 105 | src/components/fourier-field/README.md |
| imports | 106 | src/components/fourier-field/constants.ts |
| imports | 107 | src/components/fourier-field/index.ts |
| imports | 108 | src/components/fourier-field/math.ts |
| imports | 109 | src/components/handmark/brush.ts |
| imports | 110 | src/components/handmark/freehand.ts |
| imports | 111 | src/components/handmark/types.ts |
| imports | 112 | src/components/icon-tooltip/IconTooltip.vue |
| imports | 113 | src/components/labeled-field/LabeledField.vue |
| imports | 114 | src/components/labeled-field/LabeledSelect.vue |
| imports | 115 | src/components/labeled-field/LabeledSlider.vue |
| imports | 116 | src/components/labeled-field/LabeledSwitch.vue |
| imports | 117 | src/components/labeled-field/README.md |
| imports | 118 | src/components/liquid-grid/LiquidGrid.vue |
| imports | 119 | src/components/liquid-grid/README.md |
| imports | 120 | src/components/liquid-grid/composables/uniformBridgeWGPU.ts |
| imports | 121 | src/components/liquid-grid/constants.ts |
| imports | 122 | src/components/pager-dots/PagerDots.vue |
| imports | 123 | src/components/pager-dots/README.md |
| imports | 124 | src/components/select/SelectTrigger.vue |
| imports | 125 | src/components/slider/Slider.vue |
| imports | 126 | src/components/timeline/ScrubberTimeline.vue |
| imports | 127 | src/components/watercolor-dot/WatercolorDot.vue |
| imports | 128 | src/composables/motion/README.md |
| imports | 129 | src/composables/motion/springPresets.ts |
| imports | 130 | src/composables/motion/useBloomUp.ts |
| imports | 131 | src/composables/motion/useDockCtaReceive.ts |
| imports | 132 | src/composables/motion/useDragMorph.ts |
| imports | 133 | src/composables/motion/useElementMorph.ts |
| imports | 134 | src/composables/motion/useLiquidReveal.ts |
| imports | 135 | src/composables/motion/useSpring.ts |
| imports | 136 | src/composables/motion/useSpringMount.ts |
| imports | 137 | src/styles/configurator.css |
| imports | 138 | src/styles/dock.css |
| imports | 139 | src/styles/dock/density.css |
| imports | 140 | src/styles/dock/popover.css |
| imports | 141 | src/styles/dock/shape.css |
| imports | 142 | src/styles/feedback-tone.css |
| imports | 143 | src/styles/glass/squircle.css |
| imports | 144 | src/styles/instrument-chassis.css |
| imports | 145 | src/styles/scroll-choreography.css |
| imports | 146 | src/styles/tabs/segmented-tabs-drag.css |
| imports | 147 | src/styles/theme/bridges.css |
| imports | 148 | src/styles/tokens.css |
| imports | 149 | src/styles/tokens/color-radius.css |
| imports | 150 | src/styles/tokens/dark-arm.css |
| imports | 151 | src/styles/tokens/glass-fx.css |
| imports | 152 | src/styles/tokens/glass.css |
| imports | 153 | src/styles/tokens/motion-registers.css |
| imports | 154 | src/styles/tokens/offsets.css |
| imports | 155 | src/styles/tokens/scheme-spring.css |
| imports | 156 | src/styles/tokens/sizing-config.css |
| imports | 157 | src/styles/tokens/sizing.css |
| imports | 158 | src/styles/typography.css |
| imports | 159 | src/styles/typography/semantic.css |
| imports | 160 | src/styles/utilities/btn.css |
| imports | 161 | tests/components/custom/aurora/atoms.test.ts |
| imports | 162 | tests/components/custom/aurora/color-equivalence.test.ts |
| imports | 163 | tests/components/custom/aurora/derive-aurora.test.ts |
| imports | 164 | tests/components/custom/aurora/painterly.test.ts |
| imports | 165 | tests/components/custom/configurator/ConfiguratorLayer.model.test.ts |
| imports | 166 | tests/components/custom/fourier-field/FourierField.smoke.test.ts |
| imports | 167 | tests/components/custom/handmark/brush.test.ts |
| imports | 168 | tests/components/custom/handmark/highlight.test.ts |
| imports | 169 | tests/composables/motion/suite.test.ts |
| imports | 170 | tests/composables/useSpringMount.test.ts |
| imports | 171 | tests/configurator-recursion.spec.ts |
| imports | 172 | tests/public-surface.spec.ts |
| tests | 1 | tests-visual/procedural-config.spec.ts |
| tests | 2 | tests/components/procedural-config.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P052/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every procedural control has one typed live writer, bounded semantics shared by every applicable renderer, exact serialization, and an observable effect.

**Required mutation bite:** Add a control whose value persists but never reaches renderer uniforms and require live-effect coverage to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P052`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| behavior.forms | browser | Form controls preserve labels, descriptions, errors, required/invalid state, keyboard editing, and native submission semantics. | Detach a Select error from aria-describedby.; Prevent NumberField native form value submission. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: config-keyboard, config-touch, config-reset, config-roundtrip, config-applicable-engine-switch, config-single-engine-honesty, config-invalid
Observables: live observable change, serialized equality, bounds/error semantics, applicable engine semantic parity, no synthetic renderer axis
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P046 | Aurora has one config/color/lifecycle/failure semantics across engines, exposes its actual engine, and every medium remains recognizably Aurora, bounded, pause-aware, warning-free, and legible behind functional content. |
| BI.W-P047 | Blob exposes one clean config and renders a contained, legible gel identity with equivalent engine/color/interaction semantics, a named keyboard/pointer/touch press surface only when interactive, causal action observables, and no legacy prop path. |
| BI.W-P048 | One deterministic CPU field feeds one Canvas2D renderer; drawOverlay and every retained interaction seam execute causally, seven-instance dogfood consumes no scarce GPU context, and readable hierarchy, stable seed/config semantics, bounded interaction, freeze, pause, and teardown survive. |
| BI.W-P049 | Pure Fourier math/config feeds one field semantics across compute/render paths and engines, with bounded readable output and no duplicated math authority. |
| BI.W-P050 | LiquidGrid has one grid/warp/config meaning across engines and remains legible, bounded, pause-aware, and still under PRM. |

Declared semantic locks: `component-configurator`, `demo-configurator`. The cursor also acquires 179 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
