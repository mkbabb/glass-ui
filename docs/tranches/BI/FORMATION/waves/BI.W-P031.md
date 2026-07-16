# BI.W-P031 — Reduced-motion semantics across the full motion graph

**Status:** IMPLEMENTED — NATIVE ACCEPTANCE PENDING
**Topological stratum:** BI.S15
**Formation family:** motion
**Core centers:** C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P031`

## Intent

Remove travel and continuous animation under PRM while retaining immediate, causal, legible state changes.

## Current implementation

`readReducedMotion()` is the SSR-safe current read; `useReducedMotion()` is the
single shared reactive `MediaQueryList` authority. Motion-axis resolution, RAF and
scroll writers, pointer/procedural lifecycles, Carousel and CompletionSeal, and the
Countup, Typewriter, Stagger, and Easing one-shots consume that authority. Enabling
PRM mid-flight now cancels optional work and seats the complete state; procedural
surfaces paint one static frame and park.

Focused ordinary coverage is green (14 files, 76 tests), as are aggregate source +
test type checks and the production build with 69 declaration entries. Native
in-app Browser acceptance remains pending because no Browser session was available;
Playwright was not substituted. P028/P029 motion surfaces and the active Dock/Drawer
GCF lane remain under their respective owners rather than being rewritten here.

## Exact scope

- Make PRM one reactive authority consumed by CSS, springs, transitions, procedural loops, dock, and demo scenarios.
- Classify each motion as essential state, optional travel, continuous ambience, or input feedback and define its PRM resolution.
- Delete local media-query contradictions and code paths that hide final state when animation is disabled.
- Run every enrolled visual scenario with PRM and assert final state/latency/no continuous work.

## File manifest (233)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/code/CodeBlock.vue | — | cb7518f7dac78b6d7f446c3ce940332427ac220f | source base |
| 2 | repair | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 3 | repair | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 4 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 5 | repair | demo/chassis/landing/SectionPreviewCard.vue | — | 7809e9f4ceff868495b4b8706e5a412ea1808dcd | source base |
| 6 | repair | demo/chassis/page/StoryPage.vue | — | 0fe1e8036e707a34599b151634d5672a12ff4428 | source base |
| 7 | repair | demo/chassis/section/StorySection.vue | — | 88820a176ed137574e7b228435a5c26510c86653 | source base |
| 8 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 9 | repair | demo/shell/configurator/preset-editor/css-writers.ts | — | — | BI.W-P012 |
| 10 | repair | demo/shell/configurator/preset-editor/defaults.ts | — | — | BI.W-P012 |
| 11 | repair | demo/shell/configurator/preset-editor/types.ts | — | — | BI.W-P012 |
| 12 | repair | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 13 | repair | demo/stories/compositions/gate-pattern.vue | — | 3b7062ae79091429f1685e72afd1f1a22edcd945 | source base |
| 14 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 15 | repair | demo/stories/containers/spa-view.vue | — | 5bbafefd0eeb58d0cbfed909aec32eaa981a648d | source base |
| 16 | repair | demo/stories/data/metric-cell.vue | — | ba851ae5f53abdb3aaf555eb5722ef19f374576e | source base |
| 17 | repair | demo/stories/data/TimelineContinuousBody.vue | — | ff412634257566da40a4891789203c7e7c36c904 | source base |
| 18 | repair | demo/stories/display/status-dot.vue | — | b77693f1ca47379b82834971061e67356c1503cb | source base |
| 19 | repair | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 20 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 21 | repair | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 22 | repair | demo/stories/foundations/icons.vue | — | a0dfdf9a4e4f6943b3a675645ed144733a2156aa | source base |
| 23 | repair | demo/stories/foundations/radii.vue | — | 9ac8e4263414017f8e04d818c374d2d8fd7f9687 | source base |
| 24 | repair | demo/stories/foundations/shadows.vue | — | 9603298a8cfaee80168b9956297b952139d7f615 | source base |
| 25 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 26 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 27 | repair | demo/stories/motion/deck.vue | — | fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0 | source base |
| 28 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 29 | repair | demo/stories/motion/split-chars.vue | — | 6d46a23e25428031f226056dc6f7f24094ad489f | source base |
| 30 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 31 | repair | demo/stories/substrates/aurora/AuroraStage.vue | — | 1511aabb33b2c5846151a07740354fe0af8efca2 | source base |
| 32 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 33 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 34 | repair | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 35 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 36 | repair | src/components/_shared/axes.ts | — | — | BI.W-P008 |
| 37 | repair | src/components/_shared/menuItemVariants.ts | — | — | BI.W-P008 |
| 38 | repair | src/components/_shared/useMotionAxis.ts | — | — | BI.W-P008 |
| 39 | repair | src/components/animated-digit/README.md | — | — | BI.W-P008 |
| 40 | repair | src/components/aurora/Aurora.vue | — | — | BI.W-P008 |
| 41 | repair | src/components/aurora/composables/frameLoop.ts | — | — | BI.W-P008 |
| 42 | repair | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 43 | repair | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 44 | repair | src/components/aurora/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 45 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 46 | repair | src/components/aurora/constants/renderMode.ts | — | — | BI.W-P008 |
| 47 | repair | src/components/aurora/constants/shaders/aurora-image.frag.ts | — | — | BI.W-P008 |
| 48 | repair | src/components/aurora/constants/shaders/aurora.frag.ts | — | — | BI.W-P008 |
| 49 | repair | src/components/aurora/constants/shaders/flow.glsl.ts | — | — | BI.W-P008 |
| 50 | repair | src/components/aurora/constants/shaders/mediums.glsl.ts | — | — | BI.W-P008 |
| 51 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 52 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 53 | repair | src/components/aurora/RESEARCH.md | — | — | BI.W-P008 |
| 54 | repair | src/components/blob/Blob.vue | — | — | BI.W-P008 |
| 55 | repair | src/components/blob/composables/useBlobPointer.ts | — | — | BI.W-P008 |
| 56 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 57 | repair | src/components/blob/README.md | — | — | BI.W-P008 |
| 58 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 59 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 60 | repair | src/components/border-progress/constants.ts | — | — | BI.W-P008 |
| 61 | repair | src/components/border-progress/README.md | — | — | BI.W-P008 |
| 62 | repair | src/components/button/Button.vue | — | — | BI.W-P008 |
| 63 | repair | src/components/card/Card.vue | — | — | BI.W-P008 |
| 64 | repair | src/components/carousel/CarouselContent.vue | — | — | BI.W-P008 |
| 65 | repair | src/components/completion-seal/composables/useCompletionSeal.ts | — | — | BI.W-P008 |
| 66 | repair | src/components/completion-seal/README.md | — | — | BI.W-P008 |
| 67 | repair | src/components/configurator/ConfiguratorLayer.vue | — | — | BI.W-P008 |
| 68 | repair | src/components/constellation/composables/useConstellation.ts | — | — | BI.W-P008 |
| 69 | repair | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 70 | repair | src/components/constellation/constellationTypes.ts | — | — | BI.W-P008 |
| 71 | repair | src/components/constellation/README.md | — | — | BI.W-P008 |
| 72 | repair | src/components/controls/DarkModeToggle.vue | — | — | BI.W-P008 |
| 73 | repair | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 74 | repair | src/components/dock/composables/dockMorphContext.ts | — | — | BI.W-P008 |
| 75 | repair | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 76 | repair | src/components/dock/composables/useDockShellProps.ts | — | — | BI.W-P008 |
| 77 | repair | src/components/dock/composables/useDockSpring.ts | — | — | BI.W-P008 |
| 78 | repair | src/components/dock/DockBackgroundToggle.vue | — | — | BI.W-P008 |
| 79 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 80 | repair | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 81 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 82 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 83 | repair | src/components/drawer/composables/useDrawerSnap.ts | — | — | BI.W-P008 |
| 84 | repair | src/components/drawer/Drawer.vue | — | — | BI.W-P008 |
| 85 | repair | src/components/drawer/index.ts | — | — | BI.W-P008 |
| 86 | repair | src/components/fading-scroll/composables/useFadingScroll.ts | — | — | BI.W-P008 |
| 87 | repair | src/components/fading-scroll/README.md | — | — | BI.W-P008 |
| 88 | repair | src/components/fourier-field/composables/fourierFieldGLSetup.ts | — | — | BI.W-P008 |
| 89 | repair | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts | — | — | BI.W-P008 |
| 90 | repair | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 91 | repair | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 92 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 93 | repair | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 94 | repair | src/components/handmark/composables/useHandMark.ts | — | — | BI.W-P008 |
| 95 | repair | src/components/handmark/HandMark.vue | — | — | BI.W-P008 |
| 96 | repair | src/components/icon-chip/README.md | — | — | BI.W-P008 |
| 97 | repair | src/components/icon-chip/types.ts | — | — | BI.W-P008 |
| 98 | repair | src/components/liquid-grid/composables/liquidGrid.ts | — | — | BI.W-P008 |
| 99 | repair | src/components/liquid-grid/composables/liquidGridGLSetup.ts | — | — | BI.W-P008 |
| 100 | repair | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts | — | — | BI.W-P008 |
| 101 | repair | src/components/liquid-grid/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 102 | repair | src/components/liquid-grid/composables/useLiquidGrid.ts | — | — | BI.W-P008 |
| 103 | repair | src/components/liquid-grid/constants.ts | — | — | BI.W-P008 |
| 104 | repair | src/components/liquid-grid/LiquidGrid.vue | — | — | BI.W-P008 |
| 105 | repair | src/components/liquid-grid/README.md | — | — | BI.W-P008 |
| 106 | repair | src/components/pager-dots/PagerDots.vue | — | — | BI.W-P008 |
| 107 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 108 | repair | src/components/progress/ProgressGradient.vue | — | — | BI.W-P008 |
| 109 | repair | src/components/progress/ProgressSectioned.vue | — | — | BI.W-P008 |
| 110 | repair | src/components/pulse/Pulse.vue | — | — | BI.W-P008 |
| 111 | repair | src/components/pulse/README.md | — | — | BI.W-P008 |
| 112 | repair | src/components/select/SelectTrigger.vue | — | — | BI.W-P008 |
| 113 | repair | src/components/skeleton/Skeleton.vue | — | — | BI.W-P008 |
| 114 | repair | src/components/slider/Slider.vue | — | — | BI.W-P008 |
| 115 | repair | src/components/spa-view/README.md | — | — | BI.W-P008 |
| 116 | repair | src/components/spa-view/SpaView.vue | — | — | BI.W-P008 |
| 117 | repair | src/components/split-chars/README.md | — | — | BI.W-P008 |
| 118 | repair | src/components/split-chars/SplitChars.vue | — | — | BI.W-P008 |
| 119 | repair | src/components/stacked-icons/StackedIconGroup.vue | — | — | BI.W-P008 |
| 120 | repair | src/components/tabs/composables/useEyeglassLive.ts | — | — | BI.W-P008 |
| 121 | repair | src/components/tabs/composables/useTabDragMorph.ts | — | — | BI.W-P008 |
| 122 | repair | src/components/tabs/README.md | — | — | BI.W-P008 |
| 123 | repair | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 124 | repair | src/components/timeline/ContinuousMarkers.vue | — | — | BI.W-P008 |
| 125 | repair | src/components/timeline/ContinuousRail.vue | — | — | BI.W-P008 |
| 126 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 127 | repair | src/components/timeline/SegmentedTimeline.vue | — | — | BI.W-P008 |
| 128 | repair | src/components/typewriter/types.ts | — | — | BI.W-P008 |
| 129 | repair | src/components/typewriter/utils/timing.ts | — | — | BI.W-P008 |
| 130 | repair | src/components/watercolor-dot/useWatercolorBlob.ts | — | — | BI.W-P008 |
| 131 | repair | src/components/watercolor-dot/WatercolorDot.vue | — | — | BI.W-P008 |
| 132 | repair | src/composables/color/useAccentTone.ts | — | 6fb5b033fd4763223fae17425331dae3c302c5dd | source base |
| 133 | repair | src/composables/dark/useGlobalDark.ts | — | 95526044fece57bd864c13cf97082330604d706d | source base |
| 134 | repair | src/composables/dom/useDragVelocity.ts | — | fae0e47276b1f15a8bef19271c829ff93bb98623 | source base |
| 135 | repair | src/composables/glass/canvas2d/useCanvas2D.ts | — | e98f4246dd0f00c6c23253f1d5c5984f7f763268 | source base |
| 136 | repair | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 137 | repair | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 138 | repair | src/composables/glass/useSpecularPointer.ts | — | a14019910975a5f28ca4736dd97dd42934fc9fd4 | source base |
| 139 | repair | src/composables/glass/useSpecularTracking.ts | — | 01f066c30062bdccb6583061e728dd45d8e60fd2 | source base |
| 140 | repair | src/composables/glass/vSpecular.ts | — | 85cb68a2334703507752c2998feda36dfcc4d56c | source base |
| 141 | repair | src/composables/glass/webgl/createCanvasLifecycle.ts | — | 06a2ae83fe8309bf7d42335488a689e99de43903 | source base |
| 142 | repair | src/composables/glass/webgl/useWebGLCanvas.ts | — | e6614e08dfb2a5104afe33eb07a0046fc0b62777 | source base |
| 143 | repair | src/composables/glass/webgl/visibility.ts | — | b1f5e5fd6a2beaed657031ecf6af40793a05feae | source base |
| 144 | repair | src/composables/glass/webgpu/useGpuSubstrate.ts | — | 50e6d5e382d5ad774377c3277ad666b5424fcbcd | source base |
| 145 | repair | src/composables/glass/webgpu/useWebGPUCanvas.ts | — | 44b6d570e621c80f2bf4f4fb319ff9ccdd15e06a | source base |
| 146 | repair | src/composables/glass/webgpu/webgpuCanvasTypes.ts | — | 59c057ee8e4197be8f2b30945e1ee4c4d9d372ab | source base |
| 147 | repair | src/composables/motion/bloomUpField.ts | — | c11a3d98e030f0918bc09b6b9d23c37e48b1c8cc | source base |
| 148 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 149 | repair | src/composables/motion/core/writeVelocityWeight.ts | — | c6987e46bad64074b4b21c491179a4441e7f5515 | source base |
| 150 | repair | src/composables/motion/gooBarbellGeometry.ts | — | 2058899e104cb7b0f3f06dad41754b3e80190207 | source base |
| 151 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 152 | repair | src/composables/motion/useAnimatedNumber.ts | — | bf3aa656ce11684a2d7ce3d908d19dc741205b6d | source base |
| 153 | repair | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 154 | repair | src/composables/motion/useCharStagger.ts | — | 5238e20760401b503b13535e0330939fd742b94c | source base |
| 155 | repair | src/composables/motion/useCountup.ts | — | 8fced7e9e5bf95d85cf2dae69fb748b45baae53e | source base |
| 156 | repair | src/composables/motion/useDockCtaReceive.ts | — | 9ad016d7a426f05133188f346ca18a26f38d1323 | source base |
| 157 | repair | src/composables/motion/useDragMorph.ts | — | f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f | source base |
| 158 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 159 | repair | src/composables/motion/useGooMorph.ts | — | bca98104d3b8c2a7fdf9071358b71d65b00bc5ae | source base |
| 160 | repair | src/composables/motion/useLeadTrail.ts | — | 492e6149e8cb5146cf2ae8ba00ef2988117a755f | source base |
| 161 | repair | src/composables/motion/useLiquidPress.ts | — | 986bc0ac1dbe15a0e2f9c5833c1036fedc797606 | source base |
| 162 | repair | src/composables/motion/useLiquidReveal.ts | — | e0b07d8def7b5a2bb383845f1f96ceee663729f8 | source base |
| 163 | repair | src/composables/motion/usePointerVelocityField.ts | — | 48ff6c9563de5797f7431f2c4bb542a3360673d9 | source base |
| 164 | modify | src/composables/motion/useRAFLoop.ts | — | b78fb56ea89699694dcbb65debf3ec2233f2e4a7 | source base |
| 165 | create | src/composables/motion/useReducedMotion.ts | — | — | source base |
| 166 | repair | src/composables/motion/useRoutePointer.ts | — | 5ce142b544148877b2cba149f1c700b6e615d226 | source base |
| 167 | repair | src/composables/motion/useScrollChrome.ts | — | eaa32a4fb96d0fc0b281cc6e4b6128c6b0f55613 | source base |
| 168 | repair | src/composables/motion/useScrollPin.ts | — | 94e393c719f9ec5328448481276e86641a078abb | source base |
| 169 | repair | src/composables/motion/useScrollScene.ts | — | 44a929c513b92f9a030b28c6cc71a7bbff6ff3ee | source base |
| 170 | repair | src/composables/motion/useScrollTrigger.ts | — | 0d05d75097f9e31d32c603032cf6efb0e5f4142e | source base |
| 171 | repair | src/composables/motion/useSelectionIndicator.ts | — | ddcb73a970cab55abe52d4a0dee65e06c2185ebc | source base |
| 172 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 173 | repair | src/composables/motion/useSpringMount.ts | — | 4a62de1fc2d424cc31dd6d4c60899e914fa25d86 | source base |
| 174 | repair | src/composables/motion/useStagger.ts | — | 5a2264e076653ab79c9d47d9e5b04ea1daf32ba8 | source base |
| 175 | repair | src/composables/motion/useStaggerReveal.ts | — | 270369b8d5817855df8c2a6bcb1a0c058ecd84ac | source base |
| 176 | repair | src/composables/motion/useViewTransition.ts | — | e0dea38a9178c18a1396f946a7fdd04310c098f8 | source base |
| 177 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 178 | repair | src/styles/animations.css | — | 74791f2e0ed4e8b8d56c717f2da2180dc3952c56 | source base |
| 179 | repair | src/styles/border-progress.css | — | 2f43dde09504bcecb92655b8950e2315b10680ef | source base |
| 180 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 181 | repair | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 182 | repair | src/styles/completion-seal.css | — | 60491778dc7fdc68bf7ce95a976c8633d3022adb | source base |
| 183 | repair | src/styles/configurator.css | — | 251d50ff9b2ec84111ce2949a0fe6e53190f73ad | source base |
| 184 | repair | src/styles/dock-controls.css | — | 892dba3b514be6bd6b8aa3b12028ae16f5035886 | source base |
| 185 | repair | src/styles/dock-controls/icon-button.css | — | 0f9126bd8a22b598c79046410fd83f64f02ec3a0 | source base |
| 186 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 187 | repair | src/styles/dock/adaptive-legibility.css | — | f4854e66920f232e6eb9fd5176b89a732148399f | source base |
| 188 | repair | src/styles/dock/crossfade.css | — | 5ba361dc5303a4414d4c6e92baa61328f063bbb7 | source base |
| 189 | repair | src/styles/dock/cta-seat.css | — | c19816efff5f556f112a4091e9e784d57c3902e8 | source base |
| 190 | repair | src/styles/dock/dock.css | — | 83e358cc6e6d382a9c84f136972fe522470ea11c | source base |
| 191 | repair | src/styles/dock/fisheye.css | — | 1c346c4a7948f3d6da886ad7d50161160489f785 | source base |
| 192 | repair | src/styles/dock/layers.css | — | 0c915d1d614a7b450020ba281acc18e798898d86 | source base |
| 193 | repair | src/styles/dock/morph.css | — | 66e6c079aded40032cd2da310ca8284a592f3ec1 | source base |
| 194 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 195 | repair | src/styles/dock/popover.css | — | 5f9899bc157e13c39c460008bba052ba38bc5b78 | source base |
| 196 | repair | src/styles/dock/shape.css | — | 373e9d2f02d923d0c802de9059d50cc4e5f03e70 | source base |
| 197 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 198 | repair | src/styles/draw-in.css | — | 1f845c43cfd1beec3a9fa7177857ff81cf29c704 | source base |
| 199 | repair | src/styles/drawer.css | — | 9c49e90f5591f31b54bd511eb161f4dada359928 | source base |
| 200 | repair | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 201 | repair | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 202 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 203 | repair | src/styles/glass/glass-chip.css | — | 78c37cea99d056fcfd8ed0219a094325645f9c53 | source base |
| 204 | repair | src/styles/glass/grain-overlay.css | — | a6ccc7a3f69f9be0f9de15e254eb6016611c9df5 | source base |
| 205 | repair | src/styles/glass/liquid-enter.css | — | 49d182d37feebca6ab412a037bdd221eea71146f | source base |
| 206 | repair | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 207 | repair | src/styles/icon-chip.css | — | 207ddee8a8c3bd4ca7446defb9cb7288e63f0148 | source base |
| 208 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 209 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 210 | repair | src/styles/menu.css | — | b857356e839255ecff703eb38e8368445e7c8598 | source base |
| 211 | create | src/styles/motion/reduced.css | — | — | source base |
| 212 | repair | src/styles/paper.css | — | 0c18d49faaaa9d6c98b8f1195f876c14c961d3d0 | source base |
| 213 | repair | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 214 | repair | src/styles/scroll-chrome.css | — | 3b175f8939c22a00c6ea0bbc298e34ac6b3d7273 | source base |
| 215 | repair | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 216 | repair | src/styles/segmented-tabs.css | — | 3139afb08242087d5b853acc54713acda9fd18c0 | source base |
| 217 | repair | src/styles/select.css | — | 4d78552ece9bcaa1a500ef9b2c7db80a4500ef47 | source base |
| 218 | repair | src/styles/tabs/segmented-tabs-drag.css | — | 6c50427c9d299238b4ab086ffdf977820d31a9b8 | source base |
| 219 | repair | src/styles/tokens/glass-fx.css | — | e20e236bcd7b013bc41ecd3ca45e77fdbbd17edb | source base |
| 220 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 221 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 222 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 223 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 224 | repair | src/styles/transitions.css | — | ff60e1b4e192a5ecb06479f9582c5e52bbf15c63 | source base |
| 225 | repair | src/styles/utilities/a11y-overrides.css | — | dd89b1d7c21f30807080f0627cac012698b3ce9c | source base |
| 226 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 227 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 228 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 229 | repair | src/styles/utilities/metal.css | — | da9b6ae944b06e610269fc568f41201ee1c67da6 | source base |
| 230 | repair | src/styles/view-transition.css | — | fc0af7fbfd5ad5dbf2d76576f7a4409e8207adbf | source base |
| 231 | repair | src/styles/viz-reveal.css | — | 50809db823fb350416cdccd1dcdea63c98e7c52e | source base |
| 232 | create | tests-visual/reduced-motion-graph.spec.ts | — | — | source base |
| 233 | create | tests/composables/motion/reduced.test.ts | — | — | source base |

## Repair manifest (231)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/code/CodeBlock.vue |
| imports | 2 | demo/chassis/hero/StoryHeader.vue |
| imports | 3 | demo/chassis/hero/StoryHero.vue |
| imports | 4 | demo/chassis/hero/story-hero.css |
| imports | 5 | demo/chassis/landing/SectionPreviewCard.vue |
| imports | 6 | demo/chassis/page/StoryPage.vue |
| imports | 7 | demo/chassis/section/StorySection.vue |
| imports | 8 | demo/demo.css |
| imports | 9 | demo/shell/SidebarDock.vue |
| imports | 10 | demo/shell/configurator/preset-editor/css-writers.ts |
| imports | 11 | demo/shell/configurator/preset-editor/defaults.ts |
| imports | 12 | demo/shell/configurator/preset-editor/types.ts |
| imports | 13 | demo/stories/compositions/gate-pattern.vue |
| imports | 14 | demo/stories/compositions/settings.vue |
| imports | 15 | demo/stories/containers/spa-view.vue |
| imports | 16 | demo/stories/data/TimelineContinuousBody.vue |
| imports | 17 | demo/stories/data/metric-cell.vue |
| imports | 18 | demo/stories/display/status-dot.vue |
| imports | 19 | demo/stories/dock/cta-receive.vue |
| imports | 20 | demo/stories/dock/overview.vue |
| imports | 21 | demo/stories/feedback/progress.vue |
| imports | 22 | demo/stories/foundations/icons.vue |
| imports | 23 | demo/stories/foundations/radii.vue |
| imports | 24 | demo/stories/foundations/shadows.vue |
| imports | 25 | demo/stories/manifest.ts |
| imports | 26 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 27 | demo/stories/motion/curve-gallery.vue |
| imports | 28 | demo/stories/motion/deck.vue |
| imports | 29 | demo/stories/motion/split-chars.vue |
| imports | 30 | demo/stories/navigation/carousel.vue |
| imports | 31 | demo/stories/substrates/aurora/AuroraStage.vue |
| imports | 32 | demo/stories/substrates/constellation.vue |
| imports | 33 | demo/stories/substrates/glass-material.vue |
| imports | 34 | demo/stories/substrates/liquid-grid.vue |
| imports | 35 | src/components/PROCEDURAL-SUITE.md |
| imports | 36 | src/components/_shared/axes.ts |
| imports | 37 | src/components/_shared/menuItemVariants.ts |
| imports | 38 | src/components/_shared/useMotionAxis.ts |
| imports | 39 | src/components/animated-digit/README.md |
| imports | 40 | src/components/aurora/Aurora.vue |
| imports | 41 | src/components/aurora/DESIGN.md |
| imports | 42 | src/components/aurora/README.md |
| imports | 43 | src/components/aurora/RESEARCH.md |
| imports | 44 | src/components/aurora/composables/frameLoop.ts |
| imports | 45 | src/components/aurora/composables/runtime.ts |
| imports | 46 | src/components/aurora/composables/useAurora.ts |
| imports | 47 | src/components/aurora/composables/wgpuSetup.ts |
| imports | 48 | src/components/aurora/constants/presets.ts |
| imports | 49 | src/components/aurora/constants/renderMode.ts |
| imports | 50 | src/components/aurora/constants/shaders/aurora-image.frag.ts |
| imports | 51 | src/components/aurora/constants/shaders/aurora.frag.ts |
| imports | 52 | src/components/aurora/constants/shaders/flow.glsl.ts |
| imports | 53 | src/components/aurora/constants/shaders/mediums.glsl.ts |
| imports | 54 | src/components/blob/Blob.vue |
| imports | 55 | src/components/blob/README.md |
| imports | 56 | src/components/blob/composables/useBlobPointer.ts |
| imports | 57 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 58 | src/components/blob/types.ts |
| imports | 59 | src/components/border-progress/BorderProgress.vue |
| imports | 60 | src/components/border-progress/README.md |
| imports | 61 | src/components/border-progress/constants.ts |
| imports | 62 | src/components/button/Button.vue |
| imports | 63 | src/components/card/Card.vue |
| imports | 64 | src/components/carousel/CarouselContent.vue |
| imports | 65 | src/components/completion-seal/README.md |
| imports | 66 | src/components/completion-seal/composables/useCompletionSeal.ts |
| imports | 67 | src/components/configurator/ConfiguratorLayer.vue |
| imports | 68 | src/components/constellation/README.md |
| imports | 69 | src/components/constellation/composables/useConstellation.ts |
| imports | 70 | src/components/constellation/constellationInteraction.ts |
| imports | 71 | src/components/constellation/constellationTypes.ts |
| imports | 72 | src/components/controls/DarkModeToggle.vue |
| imports | 73 | src/components/dialog/DialogContent.vue |
| imports | 74 | src/components/dock/DockBackgroundToggle.vue |
| imports | 75 | src/components/dock/DockControl.vue |
| imports | 76 | src/components/dock/DockCrossfade.vue |
| imports | 77 | src/components/dock/DockLayerGroup.vue |
| imports | 78 | src/components/dock/README.md |
| imports | 79 | src/components/dock/composables/dockMorphContext.ts |
| imports | 80 | src/components/dock/composables/useDockFisheye.ts |
| imports | 81 | src/components/dock/composables/useDockShellProps.ts |
| imports | 82 | src/components/dock/composables/useDockSpring.ts |
| imports | 83 | src/components/drawer/Drawer.vue |
| imports | 84 | src/components/drawer/composables/useDrawerSnap.ts |
| imports | 85 | src/components/drawer/index.ts |
| imports | 86 | src/components/fading-scroll/README.md |
| imports | 87 | src/components/fading-scroll/composables/useFadingScroll.ts |
| imports | 88 | src/components/fourier-field/FourierField.vue |
| imports | 89 | src/components/fourier-field/README.md |
| imports | 90 | src/components/fourier-field/composables/fourierFieldGLSetup.ts |
| imports | 91 | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts |
| imports | 92 | src/components/fourier-field/composables/useFourierField.ts |
| imports | 93 | src/components/fourier-field/constants.ts |
| imports | 94 | src/components/handmark/HandMark.vue |
| imports | 95 | src/components/handmark/composables/useHandMark.ts |
| imports | 96 | src/components/icon-chip/README.md |
| imports | 97 | src/components/icon-chip/types.ts |
| imports | 98 | src/components/liquid-grid/LiquidGrid.vue |
| imports | 99 | src/components/liquid-grid/README.md |
| imports | 100 | src/components/liquid-grid/composables/liquidGrid.ts |
| imports | 101 | src/components/liquid-grid/composables/liquidGridGLSetup.ts |
| imports | 102 | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts |
| imports | 103 | src/components/liquid-grid/composables/uniformBridgeWGPU.ts |
| imports | 104 | src/components/liquid-grid/composables/useLiquidGrid.ts |
| imports | 105 | src/components/liquid-grid/constants.ts |
| imports | 106 | src/components/pager-dots/PagerDots.vue |
| imports | 107 | src/components/progress/ProgressGradient.vue |
| imports | 108 | src/components/progress/ProgressSectioned.vue |
| imports | 109 | src/components/pulse/Pulse.vue |
| imports | 110 | src/components/pulse/README.md |
| imports | 111 | src/components/select/SelectTrigger.vue |
| imports | 112 | src/components/skeleton/Skeleton.vue |
| imports | 113 | src/components/slider/Slider.vue |
| imports | 114 | src/components/spa-view/README.md |
| imports | 115 | src/components/spa-view/SpaView.vue |
| imports | 116 | src/components/split-chars/README.md |
| imports | 117 | src/components/split-chars/SplitChars.vue |
| imports | 118 | src/components/stacked-icons/StackedIconGroup.vue |
| imports | 119 | src/components/tabs/README.md |
| imports | 120 | src/components/tabs/SegmentedTabs.vue |
| imports | 121 | src/components/tabs/composables/useEyeglassLive.ts |
| imports | 122 | src/components/tabs/composables/useTabDragMorph.ts |
| imports | 123 | src/components/timeline/ContinuousMarkers.vue |
| imports | 124 | src/components/timeline/ContinuousRail.vue |
| imports | 125 | src/components/timeline/ScrubberTimeline.vue |
| imports | 126 | src/components/timeline/SegmentedTimeline.vue |
| imports | 127 | src/components/typewriter/types.ts |
| imports | 128 | src/components/typewriter/utils/timing.ts |
| imports | 129 | src/components/watercolor-dot/WatercolorDot.vue |
| imports | 130 | src/components/watercolor-dot/useWatercolorBlob.ts |
| imports | 131 | src/composables/color/useAccentTone.ts |
| imports | 132 | src/composables/dark/useGlobalDark.ts |
| imports | 133 | src/composables/dom/useDragVelocity.ts |
| imports | 134 | src/composables/glass/canvas2d/useCanvas2D.ts |
| imports | 135 | src/composables/glass/index.ts |
| imports | 136 | src/composables/glass/useGlassBackdropLuminance.ts |
| imports | 137 | src/composables/glass/useSpecularPointer.ts |
| imports | 138 | src/composables/glass/useSpecularTracking.ts |
| imports | 139 | src/composables/glass/vSpecular.ts |
| imports | 140 | src/composables/glass/webgl/createCanvasLifecycle.ts |
| imports | 141 | src/composables/glass/webgl/useWebGLCanvas.ts |
| imports | 142 | src/composables/glass/webgl/visibility.ts |
| imports | 143 | src/composables/glass/webgpu/useGpuSubstrate.ts |
| imports | 144 | src/composables/glass/webgpu/useWebGPUCanvas.ts |
| imports | 145 | src/composables/glass/webgpu/webgpuCanvasTypes.ts |
| imports | 146 | src/composables/motion/bloomUpField.ts |
| imports | 147 | src/composables/motion/core/index.ts |
| imports | 148 | src/composables/motion/core/writeVelocityWeight.ts |
| imports | 149 | src/composables/motion/gooBarbellGeometry.ts |
| imports | 150 | src/composables/motion/index.ts |
| imports | 151 | src/composables/motion/useAnimatedNumber.ts |
| imports | 152 | src/composables/motion/useBloomUp.ts |
| imports | 153 | src/composables/motion/useCharStagger.ts |
| imports | 154 | src/composables/motion/useCountup.ts |
| imports | 155 | src/composables/motion/useDockCtaReceive.ts |
| imports | 156 | src/composables/motion/useDragMorph.ts |
| imports | 157 | src/composables/motion/useElementMorph.ts |
| imports | 158 | src/composables/motion/useGooMorph.ts |
| imports | 159 | src/composables/motion/useLeadTrail.ts |
| imports | 160 | src/composables/motion/useLiquidPress.ts |
| imports | 161 | src/composables/motion/useLiquidReveal.ts |
| imports | 162 | src/composables/motion/usePointerVelocityField.ts |
| imports | 163 | src/composables/motion/useRAFLoop.ts |
| imports | 164 | src/composables/motion/useRoutePointer.ts |
| imports | 165 | src/composables/motion/useScrollChrome.ts |
| imports | 166 | src/composables/motion/useScrollPin.ts |
| imports | 167 | src/composables/motion/useScrollScene.ts |
| imports | 168 | src/composables/motion/useScrollTrigger.ts |
| imports | 169 | src/composables/motion/useSelectionIndicator.ts |
| imports | 170 | src/composables/motion/useSpring.ts |
| imports | 171 | src/composables/motion/useSpringMount.ts |
| imports | 172 | src/composables/motion/useStagger.ts |
| imports | 173 | src/composables/motion/useStaggerReveal.ts |
| imports | 174 | src/composables/motion/useViewTransition.ts |
| imports | 175 | src/index.ts |
| imports | 176 | src/styles/animations.css |
| imports | 177 | src/styles/border-progress.css |
| imports | 178 | src/styles/card-scroll.css |
| imports | 179 | src/styles/cards.css |
| imports | 180 | src/styles/completion-seal.css |
| imports | 181 | src/styles/configurator.css |
| imports | 182 | src/styles/dock-controls.css |
| imports | 183 | src/styles/dock-controls/icon-button.css |
| imports | 184 | src/styles/dock.css |
| imports | 185 | src/styles/dock/adaptive-legibility.css |
| imports | 186 | src/styles/dock/crossfade.css |
| imports | 187 | src/styles/dock/cta-seat.css |
| imports | 188 | src/styles/dock/dock.css |
| imports | 189 | src/styles/dock/fisheye.css |
| imports | 190 | src/styles/dock/layers.css |
| imports | 191 | src/styles/dock/morph.css |
| imports | 192 | src/styles/dock/overflow.css |
| imports | 193 | src/styles/dock/popover.css |
| imports | 194 | src/styles/dock/shape.css |
| imports | 195 | src/styles/dock/shell.css |
| imports | 196 | src/styles/draw-in.css |
| imports | 197 | src/styles/drawer.css |
| imports | 198 | src/styles/glass-specular-track.css |
| imports | 199 | src/styles/glass/glass-atom.css |
| imports | 200 | src/styles/glass/glass-capsule.css |
| imports | 201 | src/styles/glass/glass-chip.css |
| imports | 202 | src/styles/glass/grain-overlay.css |
| imports | 203 | src/styles/glass/liquid-enter.css |
| imports | 204 | src/styles/glass/reveal.css |
| imports | 205 | src/styles/icon-chip.css |
| imports | 206 | src/styles/index.css |
| imports | 207 | src/styles/instrument-chassis.css |
| imports | 208 | src/styles/menu.css |
| imports | 209 | src/styles/paper.css |
| imports | 210 | src/styles/scroll-choreography.css |
| imports | 211 | src/styles/scroll-chrome.css |
| imports | 212 | src/styles/scroll-driven.css |
| imports | 213 | src/styles/segmented-tabs.css |
| imports | 214 | src/styles/select.css |
| imports | 215 | src/styles/tabs/segmented-tabs-drag.css |
| imports | 216 | src/styles/tokens/glass-fx.css |
| imports | 217 | src/styles/tokens/property-regs-specular.css |
| imports | 218 | src/styles/tokens/property-regs.css |
| imports | 219 | src/styles/tokens/scheme-motion.css |
| imports | 220 | src/styles/tokens/scheme-spring.css |
| imports | 221 | src/styles/transitions.css |
| imports | 222 | src/styles/utilities/a11y-overrides.css |
| imports | 223 | src/styles/utilities/base-misc.css |
| imports | 224 | src/styles/utilities/base.css |
| imports | 225 | src/styles/utilities/btn.css |
| imports | 226 | src/styles/utilities/metal.css |
| imports | 227 | src/styles/view-transition.css |
| imports | 228 | src/styles/viz-reveal.css |
| tests | 1 | tests-visual/reduced-motion-graph.spec.ts |
| tests | 2 | tests/composables/motion/reduced.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P031/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** PRM yields immediate complete state, no nonessential travel/continuous work, and one reactive authority across CSS and JS.

**Required mutation bite:** Leave one procedural ambience loop active under PRM and require scheduler instrumentation to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P031`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: prm-route, prm-overlay, prm-dock, prm-selection, prm-procedural, prm-demo
Observables: final state, latency, zero continuous frames, focus causality
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P025 | Every animated property and semantic episode has one declared temporal authority and writer appropriate to its mechanism; its resolved channel is truthfully classified as layout, paint, or trace-supported composite; overlapping writers, local physics/easing loops, orphan work, permanent filename exceptions, and silent scheduler substitution are absent, while pause/settle/interruption/teardown are deterministic. |

Declared semantic locks: `global-accessibility`, `motion-clock`. The cursor also acquires 233 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
