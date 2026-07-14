# BI.W-P045 — Explicit renderer capability, failure, and engine identity

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P045`

## Intent

Keep WebGPU-preferred/WebGL2 support honest: capability paths are declared, visible, and never mask a failed required renderer with unrelated output.

## Exact scope

- Define capability policy and typed acquisition/render failure states for WebGPU, WebGL2, and Canvas2D.
- Select WebGL2 only as the declared equivalent supported path; expose the actual selected engine and hardware/adapter class from runtime state in every procedural demo and capture receipt, never from route prose, query parameters, or harness assumptions.
- Delete silent catch-and-paint, infinite retry, software-adapter ambiguity, and arbitrary canvas replacement behavior.
- Render an explicit failure state when no supported engine can honor the scene contract, and require every deferred owner to install the typed failure channel so initialization failure cannot become an unhandled rejection.

## File manifest (229)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/capture/engine-badge.ts | — | 167b4893d47b49011924f1d5f497c2d752a447c0 | source base |
| 2 | repair | demo/chassis/code/useCodeHighlight.ts | — | 752e90eb93f2b13b3dd166e2af5c231a753703e7 | source base |
| 3 | repair | demo/chassis/hero/focal.ts | — | 9ad415a77a918ad566bc39d36b921b0a9aa59cae | source base |
| 4 | repair | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 5 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 6 | repair | demo/chassis/landing/storyTile.ts | — | b0331b869d51533ee7e0bbbacf6ff0c1a8dd6e74 | source base |
| 7 | repair | demo/chassis/landing/vizPreviewStill.ts | — | 0b8f78dca4c032effd6059d416f9b758045bed79 | source base |
| 8 | repair | demo/chassis/section/useSectionReveal.ts | — | e86e5240dbce917231278703558733326ffc8259 | source base |
| 9 | repair | demo/main.ts | — | 52322d0a200903207f071f4e218987f1f32f456d | source base |
| 10 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 11 | repair | demo/shell/configurator/preset-editor/defaults.ts | — | — | BI.W-P012 |
| 12 | repair | demo/shell/configurator/preset-editor/types.ts | — | — | BI.W-P012 |
| 13 | repair | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 14 | repair | demo/shell/configurator/presets/neutral.css | — | — | BI.W-P012 |
| 15 | repair | demo/shell/dock-layer-contexts.ts | — | a89627e10ced4c94b5ba249f439316e81dd0e00a | source base |
| 16 | repair | demo/shell/useShellNavDock.ts | — | ebc895e0b3bc51abcac8306b45705b33e98c122a | source base |
| 17 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 18 | repair | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 19 | repair | demo/stories/data/avatar.vue | — | 2cc58a59a3153e9f6fa88c311f6bbabd96cd2c06 | source base |
| 20 | repair | demo/stories/data/metric-cell.vue | — | ba851ae5f53abdb3aaf555eb5722ef19f374576e | source base |
| 21 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 22 | repair | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 23 | repair | demo/stories/display/dark-mode-toggle.vue | — | f5ea043e2dc9557a41c661d91898cd8cf27d23a7 | source base |
| 24 | repair | demo/stories/forms/select.vue | — | 831a46d8d8aed8a4c74eabd9d71c936b4ed72492 | source base |
| 25 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 26 | repair | demo/stories/motion/ScrollChoreographyBody.vue | — | b858ac6530a4639409d25655316ac0503970142d | source base |
| 27 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 28 | modify | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 29 | repair | demo/stories/substrates/aurora/PresetPickerRow.vue | — | 54862db17b5598523816cfc15ea18927a76c1b09 | source base |
| 30 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 31 | modify | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 32 | modify | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 33 | modify | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 34 | repair | demo/stories/substrates/fourier-paths.ts | — | 9cfcca76ea386f8773c805a4562252621039c077 | source base |
| 35 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 36 | modify | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 37 | modify | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 38 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 39 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 40 | create | src/components/_shared/RendererStatus.vue | — | — | source base |
| 41 | repair | src/components/aurora/Aurora.vue | — | — | BI.W-P008 |
| 42 | repair | src/components/aurora/composables/auroraFallbackGround.ts | — | — | BI.W-P008 |
| 43 | repair | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 44 | repair | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 45 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 46 | repair | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts | — | — | BI.W-P008 |
| 47 | repair | src/components/aurora/constants/shaders/aurora.frag.ts | — | — | BI.W-P008 |
| 48 | repair | src/components/aurora/constants/shaders/aurora.wgsl.ts | — | — | BI.W-P008 |
| 49 | repair | src/components/aurora/constants/shaders/flow.glsl.ts | — | — | BI.W-P008 |
| 50 | repair | src/components/aurora/constants/shaders/mediums.glsl.ts | — | — | BI.W-P008 |
| 51 | repair | src/components/aurora/constants/shaders/procedural-color.wgsl.ts | — | — | BI.W-P008 |
| 52 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 53 | repair | src/components/aurora/index.ts | — | — | BI.W-P008 |
| 54 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 55 | repair | src/components/avatar/AvatarFallback.vue | — | — | BI.W-P008 |
| 56 | repair | src/components/avatar/index.ts | — | — | BI.W-P008 |
| 57 | repair | src/components/blob/Blob.vue | — | — | BI.W-P008 |
| 58 | repair | src/components/blob/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 59 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 60 | repair | src/components/blob/README.md | — | — | BI.W-P008 |
| 61 | repair | src/components/blob/RESEARCH.md | — | — | BI.W-P008 |
| 62 | repair | src/components/blob/shaders/metaball-uniforms.glsl.ts | — | — | BI.W-P008 |
| 63 | repair | src/components/blob/shaders/metaball.wgsl.ts | — | — | BI.W-P008 |
| 64 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 65 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 66 | repair | src/components/button/index.ts | — | — | BI.W-P008 |
| 67 | repair | src/components/chip/Chip.vue | — | — | BI.W-P008 |
| 68 | repair | src/components/chip/README.md | — | — | BI.W-P008 |
| 69 | repair | src/components/completion-seal/README.md | — | — | BI.W-P008 |
| 70 | repair | src/components/configurator/Configurator.vue | — | — | BI.W-P008 |
| 71 | repair | src/components/configurator/ConfiguratorLayer.vue | — | — | BI.W-P008 |
| 72 | repair | src/components/configurator/ConfiguratorRow.vue | — | — | BI.W-P008 |
| 73 | repair | src/components/constellation/composables/constellationGLSetup.ts | — | — | BI.W-P008 |
| 74 | repair | src/components/constellation/composables/useConstellation.ts | — | — | BI.W-P008 |
| 75 | repair | src/components/constellation/constants.ts | — | — | BI.W-P008 |
| 76 | repair | src/components/constellation/Constellation.vue | — | — | BI.W-P008 |
| 77 | repair | src/components/constellation/constellationField.ts | — | — | BI.W-P008 |
| 78 | repair | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 79 | repair | src/components/constellation/constellationRender.ts | — | — | BI.W-P008 |
| 80 | repair | src/components/constellation/shaders/constellation-lines.glsl.ts | — | — | BI.W-P008 |
| 81 | repair | src/components/constellation/shaders/constellation-points.glsl.ts | — | — | BI.W-P008 |
| 82 | repair | src/components/data-table/composables/useDataTableRowIdentity.ts | — | — | BI.W-P008 |
| 83 | repair | src/components/data-table/DataTable.vue | — | — | BI.W-P008 |
| 84 | repair | src/components/deck/composables/useDeckSpring.ts | — | — | BI.W-P008 |
| 85 | repair | src/components/dock/composables/useDockPopover.ts | — | — | BI.W-P008 |
| 86 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 87 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 88 | repair | src/components/drawer/DrawerContent.vue | — | — | BI.W-P008 |
| 89 | repair | src/components/easing/composables/useEasingPicker.ts | — | — | BI.W-P008 |
| 90 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 91 | repair | src/components/fading-scroll/composables/useFadingScroll.ts | — | — | BI.W-P008 |
| 92 | repair | src/components/fading-scroll/FadingScroll.vue | — | — | BI.W-P008 |
| 93 | repair | src/components/fading-scroll/README.md | — | — | BI.W-P008 |
| 94 | repair | src/components/fourier-field/composables/fourierFieldGLSetup.ts | — | — | BI.W-P008 |
| 95 | repair | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 96 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 97 | repair | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 98 | repair | src/components/fourier-field/shaders/fourier-field.glsl.ts | — | — | BI.W-P008 |
| 99 | repair | src/components/handmark/constants.ts | — | — | BI.W-P008 |
| 100 | repair | src/components/handmark/geometry.ts | — | — | BI.W-P008 |
| 101 | repair | src/components/icon-chip/IconChip.vue | — | — | BI.W-P008 |
| 102 | repair | src/components/instrument-chassis/README.md | — | — | BI.W-P008 |
| 103 | repair | src/components/liquid-grid/composables/liquidGrid.ts | — | — | BI.W-P008 |
| 104 | repair | src/components/liquid-grid/composables/useLiquidGrid.ts | — | — | BI.W-P008 |
| 105 | repair | src/components/liquid-grid/constants.ts | — | — | BI.W-P008 |
| 106 | repair | src/components/liquid-grid/LiquidGrid.vue | — | — | BI.W-P008 |
| 107 | repair | src/components/metric-stack/MetricRow.vue | — | — | BI.W-P008 |
| 108 | repair | src/components/metric-stack/README.md | — | — | BI.W-P008 |
| 109 | repair | src/components/pager-dots/composables/usePagerWorm.ts | — | — | BI.W-P008 |
| 110 | repair | src/components/pager-dots/constants.ts | — | — | BI.W-P008 |
| 111 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 112 | repair | src/components/progress/ProgressDefault.vue | — | — | BI.W-P008 |
| 113 | repair | src/components/progress/ProgressSectioned.vue | — | — | BI.W-P008 |
| 114 | repair | src/components/select/SelectTrigger.vue | — | — | BI.W-P008 |
| 115 | repair | src/components/slider/index.ts | — | — | BI.W-P008 |
| 116 | repair | src/components/slider/Slider.vue | — | — | BI.W-P008 |
| 117 | repair | src/components/spa-view/SpaView.vue | — | — | BI.W-P008 |
| 118 | repair | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 119 | repair | src/components/textarea/Textarea.vue | — | — | BI.W-P008 |
| 120 | repair | src/components/timeline/ContinuousMarkers.vue | — | — | BI.W-P008 |
| 121 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 122 | repair | src/components/toggle-group/ToggleGroupItem.vue | — | — | BI.W-P008 |
| 123 | repair | src/components/typewriter/utils/keyboard.ts | — | — | BI.W-P008 |
| 124 | repair | src/composables/color/useAccentTone.ts | — | 6fb5b033fd4763223fae17425331dae3c302c5dd | source base |
| 125 | repair | src/composables/dom/index.ts | — | 6373a9d811282817966f2ec6c7eb2432d757e0eb | source base |
| 126 | repair | src/composables/dom/useClipboard.ts | — | 42e0fa18328e9c85123bf40faf94692a2368b859 | source base |
| 127 | repair | src/composables/dom/useIdleReady.ts | — | a961ccf4530045be786c84742587ea3d7056ce7b | source base |
| 128 | repair | src/composables/dom/useTokenColor.ts | — | 88b514b81e6091e46ef8cb0c11c5f6f458c4ce6e | source base |
| 129 | repair | src/composables/dom/useUserInvalidAria.ts | — | 09f551e245747f955595daf64d799e972e7fec79 | source base |
| 130 | repair | src/composables/dom/useViewportReady.ts | — | e44411dc9238514267771ed9553a5fb22ef28897 | source base |
| 131 | repair | src/composables/glass/ambientHueHistogram.ts | — | 92c767ec8f3d6a6d1fd29353045c0b4645454bad | source base |
| 132 | repair | src/composables/glass/backdropLuminanceSample.ts | — | 3e327f311faa8ab53681165e7cd7cf063b20c85f | source base |
| 133 | repair | src/composables/glass/canvas2d/resolveCanvasColor.ts | — | fb5d2f75f7502a2b0d894cb2f10f9d7087730494 | source base |
| 134 | repair | src/composables/glass/canvas2d/useCanvas2D.ts | — | e98f4246dd0f00c6c23253f1d5c5984f7f763268 | source base |
| 135 | create | src/composables/glass/procedural/capability.ts | — | — | source base |
| 136 | repair | src/composables/glass/useSpecularTracking.ts | — | 01f066c30062bdccb6583061e728dd45d8e60fd2 | source base |
| 137 | repair | src/composables/glass/vSpecular.ts | — | 85cb68a2334703507752c2998feda36dfcc4d56c | source base |
| 138 | repair | src/composables/glass/webgl/createCanvasLifecycle.ts | — | 06a2ae83fe8309bf7d42335488a689e99de43903 | source base |
| 139 | repair | src/composables/glass/webgl/useWebGLCanvas.ts | — | e6614e08dfb2a5104afe33eb07a0046fc0b62777 | source base |
| 140 | modify | src/composables/glass/webgpu/useGpuSubstrate.ts | — | 50e6d5e382d5ad774377c3277ad666b5424fcbcd | source base |
| 141 | repair | src/composables/glass/webgpu/useWebGPUCanvas.ts | — | 44b6d570e621c80f2bf4f4fb319ff9ccdd15e06a | source base |
| 142 | repair | src/composables/glass/webgpu/webgpuCanvasTypes.ts | — | 59c057ee8e4197be8f2b30945e1ee4c4d9d372ab | source base |
| 143 | modify | src/composables/glass/webgpu/webgpuDevice.ts | — | 1acf4002bb1ac6b8263cb858b7ba6ec3dd11a719 | source base |
| 144 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 145 | repair | src/composables/motion/scrollReader.ts | — | 6efbc1b4b32516b9571c63c59a0ca5694972243b | source base |
| 146 | repair | src/composables/motion/supportsCssTimeline.ts | — | 139436181337b0d91ad356e4cc4ceee49689778a | source base |
| 147 | repair | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 148 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 149 | repair | src/composables/motion/useGooMorph.ts | — | bca98104d3b8c2a7fdf9071358b71d65b00bc5ae | source base |
| 150 | repair | src/composables/motion/useLiquidPress.ts | — | 986bc0ac1dbe15a0e2f9c5833c1036fedc797606 | source base |
| 151 | repair | src/composables/motion/usePrioritizedTask.ts | — | da55faaa1e432f14b6884e701b56e14048059c85 | source base |
| 152 | repair | src/composables/motion/useRAFLoop.ts | — | b78fb56ea89699694dcbb65debf3ec2233f2e4a7 | source base |
| 153 | repair | src/composables/motion/useScrollProgress.ts | — | 3e9b7b012db55b46012ad728d943caf900e46a75 | source base |
| 154 | repair | src/composables/motion/useScrollTrigger.ts | — | 0d05d75097f9e31d32c603032cf6efb0e5f4142e | source base |
| 155 | repair | src/composables/motion/useSelectionGroup.ts | — | 0808a63f3719c2196de1be3ee39738e46afa1049 | source base |
| 156 | repair | src/composables/motion/useSelectionIndicator.ts | — | ddcb73a970cab55abe52d4a0dee65e06c2185ebc | source base |
| 157 | repair | src/composables/motion/useStaggerReveal.ts | — | 270369b8d5817855df8c2a6bcb1a0c058ecd84ac | source base |
| 158 | repair | src/composables/motion/useTextHighlight.ts | — | 1390473cd2bb08819c71a25aa8306e5696976451 | source base |
| 159 | repair | src/composables/motion/useViewTransition.ts | — | e0dea38a9178c18a1396f946a7fdd04310c098f8 | source base |
| 160 | repair | src/composables/motion/useYieldToMain.ts | — | 40d547368a6e3eb57e6a0d4a14e54ba5c944c507 | source base |
| 161 | repair | src/composables/sidebar/types.ts | — | 076ce0e32d9aa67ffcd92a081d1262a507b3ceba | source base |
| 162 | repair | src/composables/sidebar/useLazyLoader.ts | — | f5730e3151667465d5626c0082495c37b22b0a1f | source base |
| 163 | repair | src/composables/sidebar/useScrollTo.ts | — | d4c987073e0a1eac215bb3fba89078aef671eafb | source base |
| 164 | repair | src/composables/sidebar/useScrollTracker.ts | — | 326d8c871c6ff733f4888b60fa985ddd4f0d910a | source base |
| 165 | repair | src/fonts/README.md | — | 8781486afac685bcead657234072a245f5a98211 | source base |
| 166 | repair | src/styles/animations.css | — | 74791f2e0ed4e8b8d56c717f2da2180dc3952c56 | source base |
| 167 | repair | src/styles/border-progress.css | — | 2f43dde09504bcecb92655b8950e2315b10680ef | source base |
| 168 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 169 | repair | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 170 | repair | src/styles/completion-seal.css | — | 60491778dc7fdc68bf7ce95a976c8633d3022adb | source base |
| 171 | repair | src/styles/configurator.css | — | 251d50ff9b2ec84111ce2949a0fe6e53190f73ad | source base |
| 172 | repair | src/styles/dock-controls/dark-mode-toggle.css | — | 5fbc619e31c5f3b4da06579263f621a286135f50 | source base |
| 173 | repair | src/styles/dock-controls/tab-button.css | — | 912bace2d0d359b7570080fa08ba524cfbb42f4d | source base |
| 174 | repair | src/styles/dock-controls/touch-floor.css | — | d9eb7500b2008e86ade95a8d61fe255993b1722c | source base |
| 175 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 176 | repair | src/styles/dock/crossfade.css | — | 5ba361dc5303a4414d4c6e92baa61328f063bbb7 | source base |
| 177 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 178 | repair | src/styles/dock/dock.css | — | 83e358cc6e6d382a9c84f136972fe522470ea11c | source base |
| 179 | repair | src/styles/dock/fisheye.css | — | 1c346c4a7948f3d6da886ad7d50161160489f785 | source base |
| 180 | repair | src/styles/dock/layer-group.css | — | 9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd | source base |
| 181 | repair | src/styles/dock/morph.css | — | 66e6c079aded40032cd2da310ca8284a592f3ec1 | source base |
| 182 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 183 | repair | src/styles/dock/shape.css | — | 373e9d2f02d923d0c802de9059d50cc4e5f03e70 | source base |
| 184 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 185 | repair | src/styles/draw-in.css | — | 1f845c43cfd1beec3a9fa7177857ff81cf29c704 | source base |
| 186 | repair | src/styles/fonts.css | — | 65e7cb7241aa36ca5262ff61fc6b6c2410871ead | source base |
| 187 | repair | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 188 | repair | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 189 | repair | src/styles/glass/a11y-fallback.css | — | c6bf39491d993644c8abeff837db5ace5225ca79 | source base |
| 190 | repair | src/styles/glass/accent-tone.css | — | a3b375be285ae44c17e16087551f1d36eec3ea36 | source base |
| 191 | repair | src/styles/glass/control-surfaces.css | — | 2db5c477d919ee795d0a5b7d212cf39f835fdb85 | source base |
| 192 | repair | src/styles/glass/deep.css | — | 83468cc7580027c2481ccb9193360e7fe6949a50 | source base |
| 193 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 194 | repair | src/styles/glass/grain-overlay.css | — | a6ccc7a3f69f9be0f9de15e254eb6016611c9df5 | source base |
| 195 | repair | src/styles/glass/ladder-undershadow.css | — | a00d643179a4abec099edc5178ca5d71d173b7a1 | source base |
| 196 | repair | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 197 | repair | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 198 | repair | src/styles/glass/squircle.css | — | 569730e4a98a6a49e40c590bb553e063b4509cea | source base |
| 199 | repair | src/styles/glass/surfaces-pager.css | — | 2b9ec169731026dbe41123f3ad1b8337e214a3d9 | source base |
| 200 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 201 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 202 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 203 | repair | src/styles/menu.css | — | b857356e839255ecff703eb38e8368445e7c8598 | source base |
| 204 | repair | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 205 | repair | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 206 | repair | src/styles/segmented-tabs.css | — | 3139afb08242087d5b853acc54713acda9fd18c0 | source base |
| 207 | repair | src/styles/select.css | — | 4d78552ece9bcaa1a500ef9b2c7db80a4500ef47 | source base |
| 208 | repair | src/styles/theme/radius.css | — | cb3901257cbeeec78182199bdf7abc145b655132 | source base |
| 209 | repair | src/styles/tokens/dark-arm.css | — | e776b8ded03aeadd57fc3ceea0c86f06dc2dd7e4 | source base |
| 210 | repair | src/styles/tokens/light-dark.css | — | b23e6baa9e9e4bfb44c26a0cf41c634823b228df | source base |
| 211 | repair | src/styles/tokens/offsets.css | — | 4f42a96aa25112af9b9ffe57b998a156a777cd6b | source base |
| 212 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 213 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 214 | repair | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 215 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 216 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 217 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 218 | repair | src/styles/tokens/shadow.css | — | 021c5321af39c05176a8f697d08ac3678a42902a | source base |
| 219 | repair | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 220 | repair | src/styles/typography.css | — | 78204d4626f1bbe7cb1490184fad019d5c4d7de8 | source base |
| 221 | repair | src/styles/typography/scale.css | — | 60aa59d15c74d55f0a814760d77ca624960a6f0b | source base |
| 222 | repair | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 223 | repair | src/styles/utilities/a11y-overrides.css | — | dd89b1d7c21f30807080f0627cac012698b3ce9c | source base |
| 224 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 225 | repair | src/styles/utilities/components.css | — | 79fdb388d65dbd43fc11a706d0ec7b0a9909445d | source base |
| 226 | repair | src/styles/utilities/metal.css | — | da9b6ae944b06e610269fc568f41201ee1c67da6 | source base |
| 227 | repair | src/styles/view-transition.css | — | fc0af7fbfd5ad5dbf2d76576f7a4409e8207adbf | source base |
| 228 | create | tests-visual/renderer-capability.spec.ts | — | — | source base |
| 229 | create | tests/composables/glass/renderer-capability.test.ts | — | — | source base |

## Repair manifest (224)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/capture/engine-badge.ts |
| imports | 2 | demo/chassis/code/useCodeHighlight.ts |
| imports | 3 | demo/chassis/hero/StoryHero.vue |
| imports | 4 | demo/chassis/hero/focal.ts |
| imports | 5 | demo/chassis/hero/story-hero.css |
| imports | 6 | demo/chassis/landing/storyTile.ts |
| imports | 7 | demo/chassis/landing/vizPreviewStill.ts |
| imports | 8 | demo/chassis/section/useSectionReveal.ts |
| imports | 9 | demo/main.ts |
| imports | 10 | demo/shell/AppShell.vue |
| imports | 11 | demo/shell/configurator/PresetEditor.vue |
| imports | 12 | demo/shell/configurator/preset-editor/defaults.ts |
| imports | 13 | demo/shell/configurator/preset-editor/types.ts |
| imports | 14 | demo/shell/configurator/presets/neutral.css |
| imports | 15 | demo/shell/dock-layer-contexts.ts |
| imports | 16 | demo/shell/useShellNavDock.ts |
| imports | 17 | demo/stories/compositions/settings.vue |
| imports | 18 | demo/stories/containers/hover-card.vue |
| imports | 19 | demo/stories/data/avatar.vue |
| imports | 20 | demo/stories/data/metric-cell.vue |
| imports | 21 | demo/stories/data/search.vue |
| imports | 22 | demo/stories/data/sortable-list.vue |
| imports | 23 | demo/stories/display/dark-mode-toggle.vue |
| imports | 24 | demo/stories/forms/select.vue |
| imports | 25 | demo/stories/manifest.ts |
| imports | 26 | demo/stories/motion/ScrollChoreographyBody.vue |
| imports | 27 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 28 | demo/stories/substrates/aurora/PresetPickerRow.vue |
| imports | 29 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 30 | demo/stories/substrates/constellation.vue |
| imports | 31 | demo/stories/substrates/fourier-paths.ts |
| imports | 32 | demo/stories/substrates/glass-material.vue |
| imports | 33 | demo/stories/substrates/liquid-grid.vue |
| imports | 34 | src/components/PROCEDURAL-SUITE.md |
| imports | 35 | src/components/aurora/Aurora.vue |
| imports | 36 | src/components/aurora/DESIGN.md |
| imports | 37 | src/components/aurora/README.md |
| imports | 38 | src/components/aurora/composables/auroraFallbackGround.ts |
| imports | 39 | src/components/aurora/composables/runtime.ts |
| imports | 40 | src/components/aurora/composables/useAurora.ts |
| imports | 41 | src/components/aurora/constants/presets.ts |
| imports | 42 | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts |
| imports | 43 | src/components/aurora/constants/shaders/aurora.frag.ts |
| imports | 44 | src/components/aurora/constants/shaders/aurora.wgsl.ts |
| imports | 45 | src/components/aurora/constants/shaders/flow.glsl.ts |
| imports | 46 | src/components/aurora/constants/shaders/mediums.glsl.ts |
| imports | 47 | src/components/aurora/constants/shaders/procedural-color.wgsl.ts |
| imports | 48 | src/components/aurora/index.ts |
| imports | 49 | src/components/avatar/AvatarFallback.vue |
| imports | 50 | src/components/avatar/index.ts |
| imports | 51 | src/components/blob/Blob.vue |
| imports | 52 | src/components/blob/README.md |
| imports | 53 | src/components/blob/RESEARCH.md |
| imports | 54 | src/components/blob/composables/uniformBridgeWGPU.ts |
| imports | 55 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 56 | src/components/blob/shaders/metaball-uniforms.glsl.ts |
| imports | 57 | src/components/blob/shaders/metaball.wgsl.ts |
| imports | 58 | src/components/blob/types.ts |
| imports | 59 | src/components/border-progress/BorderProgress.vue |
| imports | 60 | src/components/button/index.ts |
| imports | 61 | src/components/chip/Chip.vue |
| imports | 62 | src/components/chip/README.md |
| imports | 63 | src/components/completion-seal/README.md |
| imports | 64 | src/components/configurator/Configurator.vue |
| imports | 65 | src/components/configurator/ConfiguratorLayer.vue |
| imports | 66 | src/components/configurator/ConfiguratorRow.vue |
| imports | 67 | src/components/constellation/Constellation.vue |
| imports | 68 | src/components/constellation/composables/constellationGLSetup.ts |
| imports | 69 | src/components/constellation/composables/useConstellation.ts |
| imports | 70 | src/components/constellation/constants.ts |
| imports | 71 | src/components/constellation/constellationField.ts |
| imports | 72 | src/components/constellation/constellationInteraction.ts |
| imports | 73 | src/components/constellation/constellationRender.ts |
| imports | 74 | src/components/constellation/shaders/constellation-lines.glsl.ts |
| imports | 75 | src/components/constellation/shaders/constellation-points.glsl.ts |
| imports | 76 | src/components/data-table/DataTable.vue |
| imports | 77 | src/components/data-table/composables/useDataTableRowIdentity.ts |
| imports | 78 | src/components/deck/composables/useDeckSpring.ts |
| imports | 79 | src/components/dock/DockLayerGroup.vue |
| imports | 80 | src/components/dock/GlassDock.vue |
| imports | 81 | src/components/dock/composables/useDockPopover.ts |
| imports | 82 | src/components/drawer/DrawerContent.vue |
| imports | 83 | src/components/easing/EasingPicker.vue |
| imports | 84 | src/components/easing/composables/useEasingPicker.ts |
| imports | 85 | src/components/fading-scroll/FadingScroll.vue |
| imports | 86 | src/components/fading-scroll/README.md |
| imports | 87 | src/components/fading-scroll/composables/useFadingScroll.ts |
| imports | 88 | src/components/fourier-field/FourierField.vue |
| imports | 89 | src/components/fourier-field/README.md |
| imports | 90 | src/components/fourier-field/composables/fourierFieldGLSetup.ts |
| imports | 91 | src/components/fourier-field/composables/useFourierField.ts |
| imports | 92 | src/components/fourier-field/shaders/fourier-field.glsl.ts |
| imports | 93 | src/components/handmark/constants.ts |
| imports | 94 | src/components/handmark/geometry.ts |
| imports | 95 | src/components/icon-chip/IconChip.vue |
| imports | 96 | src/components/instrument-chassis/README.md |
| imports | 97 | src/components/liquid-grid/LiquidGrid.vue |
| imports | 98 | src/components/liquid-grid/composables/liquidGrid.ts |
| imports | 99 | src/components/liquid-grid/composables/useLiquidGrid.ts |
| imports | 100 | src/components/liquid-grid/constants.ts |
| imports | 101 | src/components/metric-stack/MetricRow.vue |
| imports | 102 | src/components/metric-stack/README.md |
| imports | 103 | src/components/pager-dots/composables/usePagerWorm.ts |
| imports | 104 | src/components/pager-dots/constants.ts |
| imports | 105 | src/components/progress/ProgressDefault.vue |
| imports | 106 | src/components/progress/ProgressSectioned.vue |
| imports | 107 | src/components/select/SelectTrigger.vue |
| imports | 108 | src/components/slider/Slider.vue |
| imports | 109 | src/components/slider/index.ts |
| imports | 110 | src/components/spa-view/SpaView.vue |
| imports | 111 | src/components/tabs/SegmentedTabs.vue |
| imports | 112 | src/components/textarea/Textarea.vue |
| imports | 113 | src/components/timeline/ContinuousMarkers.vue |
| imports | 114 | src/components/timeline/ScrubberTimeline.vue |
| imports | 115 | src/components/toggle-group/ToggleGroupItem.vue |
| imports | 116 | src/components/typewriter/utils/keyboard.ts |
| imports | 117 | src/composables/color/useAccentTone.ts |
| imports | 118 | src/composables/dom/index.ts |
| imports | 119 | src/composables/dom/useClipboard.ts |
| imports | 120 | src/composables/dom/useIdleReady.ts |
| imports | 121 | src/composables/dom/useTokenColor.ts |
| imports | 122 | src/composables/dom/useUserInvalidAria.ts |
| imports | 123 | src/composables/dom/useViewportReady.ts |
| imports | 124 | src/composables/glass/ambientHueHistogram.ts |
| imports | 125 | src/composables/glass/backdropLuminanceSample.ts |
| imports | 126 | src/composables/glass/canvas2d/resolveCanvasColor.ts |
| imports | 127 | src/composables/glass/canvas2d/useCanvas2D.ts |
| imports | 128 | src/composables/glass/useSpecularTracking.ts |
| imports | 129 | src/composables/glass/vSpecular.ts |
| imports | 130 | src/composables/glass/webgl/createCanvasLifecycle.ts |
| imports | 131 | src/composables/glass/webgl/useWebGLCanvas.ts |
| imports | 132 | src/composables/glass/webgpu/useGpuSubstrate.ts |
| imports | 133 | src/composables/glass/webgpu/useWebGPUCanvas.ts |
| imports | 134 | src/composables/glass/webgpu/webgpuCanvasTypes.ts |
| imports | 135 | src/composables/glass/webgpu/webgpuDevice.ts |
| imports | 136 | src/composables/motion/core/index.ts |
| imports | 137 | src/composables/motion/scrollReader.ts |
| imports | 138 | src/composables/motion/supportsCssTimeline.ts |
| imports | 139 | src/composables/motion/useBloomUp.ts |
| imports | 140 | src/composables/motion/useElementMorph.ts |
| imports | 141 | src/composables/motion/useGooMorph.ts |
| imports | 142 | src/composables/motion/useLiquidPress.ts |
| imports | 143 | src/composables/motion/usePrioritizedTask.ts |
| imports | 144 | src/composables/motion/useRAFLoop.ts |
| imports | 145 | src/composables/motion/useScrollProgress.ts |
| imports | 146 | src/composables/motion/useScrollTrigger.ts |
| imports | 147 | src/composables/motion/useSelectionGroup.ts |
| imports | 148 | src/composables/motion/useSelectionIndicator.ts |
| imports | 149 | src/composables/motion/useStaggerReveal.ts |
| imports | 150 | src/composables/motion/useTextHighlight.ts |
| imports | 151 | src/composables/motion/useViewTransition.ts |
| imports | 152 | src/composables/motion/useYieldToMain.ts |
| imports | 153 | src/composables/sidebar/types.ts |
| imports | 154 | src/composables/sidebar/useLazyLoader.ts |
| imports | 155 | src/composables/sidebar/useScrollTo.ts |
| imports | 156 | src/composables/sidebar/useScrollTracker.ts |
| imports | 157 | src/fonts/README.md |
| imports | 158 | src/styles/animations.css |
| imports | 159 | src/styles/border-progress.css |
| imports | 160 | src/styles/card-scroll.css |
| imports | 161 | src/styles/cards.css |
| imports | 162 | src/styles/completion-seal.css |
| imports | 163 | src/styles/configurator.css |
| imports | 164 | src/styles/dock-controls/dark-mode-toggle.css |
| imports | 165 | src/styles/dock-controls/tab-button.css |
| imports | 166 | src/styles/dock-controls/touch-floor.css |
| imports | 167 | src/styles/dock.css |
| imports | 168 | src/styles/dock/crossfade.css |
| imports | 169 | src/styles/dock/density.css |
| imports | 170 | src/styles/dock/dock.css |
| imports | 171 | src/styles/dock/fisheye.css |
| imports | 172 | src/styles/dock/layer-group.css |
| imports | 173 | src/styles/dock/morph.css |
| imports | 174 | src/styles/dock/overflow.css |
| imports | 175 | src/styles/dock/shape.css |
| imports | 176 | src/styles/dock/shell.css |
| imports | 177 | src/styles/draw-in.css |
| imports | 178 | src/styles/fonts.css |
| imports | 179 | src/styles/glass-specular-track.css |
| imports | 180 | src/styles/glass.css |
| imports | 181 | src/styles/glass/a11y-fallback.css |
| imports | 182 | src/styles/glass/accent-tone.css |
| imports | 183 | src/styles/glass/control-surfaces.css |
| imports | 184 | src/styles/glass/deep.css |
| imports | 185 | src/styles/glass/glass-capsule.css |
| imports | 186 | src/styles/glass/grain-overlay.css |
| imports | 187 | src/styles/glass/ladder-undershadow.css |
| imports | 188 | src/styles/glass/material.css |
| imports | 189 | src/styles/glass/reveal.css |
| imports | 190 | src/styles/glass/squircle.css |
| imports | 191 | src/styles/glass/surfaces-pager.css |
| imports | 192 | src/styles/glass/surfaces.css |
| imports | 193 | src/styles/index.css |
| imports | 194 | src/styles/instrument-chassis.css |
| imports | 195 | src/styles/menu.css |
| imports | 196 | src/styles/scroll-choreography.css |
| imports | 197 | src/styles/scroll-driven.css |
| imports | 198 | src/styles/segmented-tabs.css |
| imports | 199 | src/styles/select.css |
| imports | 200 | src/styles/theme/radius.css |
| imports | 201 | src/styles/tokens/dark-arm.css |
| imports | 202 | src/styles/tokens/light-dark.css |
| imports | 203 | src/styles/tokens/offsets.css |
| imports | 204 | src/styles/tokens/property-regs-specular.css |
| imports | 205 | src/styles/tokens/property-regs.css |
| imports | 206 | src/styles/tokens/scale-paper.css |
| imports | 207 | src/styles/tokens/scheme-motion.css |
| imports | 208 | src/styles/tokens/scheme-spring.css |
| imports | 209 | src/styles/tokens/scroll-tokens.css |
| imports | 210 | src/styles/tokens/shadow.css |
| imports | 211 | src/styles/tokens/sizing.css |
| imports | 212 | src/styles/typography.css |
| imports | 213 | src/styles/typography/scale.css |
| imports | 214 | src/styles/typography/semantic.css |
| imports | 215 | src/styles/utilities/a11y-overrides.css |
| imports | 216 | src/styles/utilities/base.css |
| imports | 217 | src/styles/utilities/components.css |
| imports | 218 | src/styles/utilities/metal.css |
| imports | 219 | src/styles/view-transition.css |
| tests | 1 | tests-visual/renderer-capability.spec.ts |
| tests | 2 | tests/composables/glass/renderer-capability.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |
| docs | 3 | src/components/PROCEDURAL-SUITE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P045/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** A scene runs on a declared capable engine with visible runtime-derived identity and an installed typed failure channel, or shows explicit failure; it never masks failure with an unrelated renderer, prose identity, warning, or unhandled rejection.

**Required mutation bite:** Force both GPU engines to fail and paint a Canvas2D gradient while reporting success, or remove an owner's onInitError channel and let the rejection escape; capability/lifecycle evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P045`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: renderer-webgpu, renderer-webgl2, renderer-no-capability, renderer-context-loss, renderer-software-adapter, renderer-unhandled-rejection
Observables: runtime-derived visible engine/hardware identity, typed failure, zero unhandled rejection, no infinite retry, scene semantic continuity
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P043 | Every procedural renderer composes one lifecycle and releases all observers/loops/resources; no scene can silently fork acquisition or pause behavior. |

Declared semantic locks: `procedural-capability`. The cursor also acquires 229 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
