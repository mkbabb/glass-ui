# BI.W-P025 — Temporal authority and lifecycle

**Status:** IMPLEMENTED — NATIVE LIFECYCLE ACCEPTANCE PENDING
**Topological stratum:** BI.S14
**Formation family:** motion
**Core centers:** C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P025`

> **Test manifest truth-up (2026-07-16, Lane A).** The formation manifest's declared
> `tests/composables/motion/temporal-authority.test.ts` and
> `tests-visual/motion-temporal-authority.spec.ts` were renamed during execution. The scope-owned
> discrete-episode lifecycle (generation-guarded latest-active completion, single reset timer,
> `invalidate()`, disposal freeze) is asserted on disk in `tests/composables/dom/useClipboard.test.ts`
> and, through the real story, `tests/demo/springs-story.test.ts`; the one-clock visual arm is
> `tests-visual/motion-one-clock.spec.ts`.

## Intent

Give every animated property and semantic episode one proportionate temporal authority, one writer, and a complete lifecycle without pretending the product has one global callback.

## Exact scope

- Classify every current scheduler as upstream managed physics playback, Glass continuous field/render lifecycle, native/CSS timeline, one-shot read/write coalescer, or discrete semantic timer; an unclassified loop is a defect, while mechanism diversity is not.
- Keep @mkbabb/keyframes.js RAFPlayback as the owner of SpringProgress/SmoothProgress/ElementMorph playback; keep useRAFLoop/canvas lifecycle for Glass-owned continuous fields and renderers; keep one-shot rAF for event coalescing and cancellable timers for discrete type semantics.
- Instrument property/episode ownership so native/CSS and JavaScript writers never overlap and a keyframes import cannot legalize an unrelated local rAF loop.
- Resolve every animated custom property's final sinks and classify the resulting channels as layout, paint, or composite. A property-name whitelist cannot grant compositor credit; necessary layout reclaim is an owner-specific semantic exception measured in the live browser, never a permanent filename allowlist.
- Delete local physical/easing playback loops, timer-settle approximations, and restart duplication; the Springs playground and morph facilities consume the same engine playback they advertise.
- Classify authoring previews explicitly: a bounded normalized editor scrubber may retain a proportionate one-shot clock only when it is not represented as reusable physical/keyframes playback and owns playing, restart, PRM snap, and teardown semantics; a surface that claims keyframes ownership must actually consume that owner.
- Compose visibility, intersection, PRM, interruption, settle, and disposal as applicable, and prove every scheduler/listener/timer/resource returns to baseline.
- Treat clipboard confirmation as one scope-owned discrete episode: each attempt invalidates prior feedback and its reset timer, only the latest active completion may publish state or callbacks, and disposal invalidates pending completions without a second timer owner at the story.

## File manifest (136)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/code/CodeBlock.vue | — | cb7518f7dac78b6d7f446c3ce940332427ac220f | source base |
| 2 | repair | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 3 | repair | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 4 | repair | demo/chassis/page/StoryPage.vue | — | 0fe1e8036e707a34599b151634d5672a12ff4428 | source base |
| 5 | repair | demo/chassis/section/StorySection.vue | — | 88820a176ed137574e7b228435a5c26510c86653 | source base |
| 6 | repair | demo/chassis/section/useSectionReveal.ts | — | e86e5240dbce917231278703558733326ffc8259 | source base |
| 7 | repair | demo/main.ts | — | 52322d0a200903207f071f4e218987f1f32f456d | source base |
| 8 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 9 | repair | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 10 | repair | demo/stories/data/infinite-scroll.vue | — | faea27c9c706cc99221d59aa6e94219b6eaee43b | source base |
| 11 | repair | demo/stories/data/tags-input.vue | — | 82920c7ce0a17d515f6815d03da15cddff321587 | source base |
| 12 | repair | demo/stories/data/virtual-section.vue | — | 4fe0827b08bc8d2098782789a40a979b65131d8b | source base |
| 13 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 14 | repair | demo/stories/feedback/confirm-dialog.vue | — | dd4cd511fcc738f1d30c2b76e352f364425a17e2 | source base |
| 15 | repair | demo/stories/feedback/notification.vue | — | c045a0972e14e35eb96a91fb85de3c82a9075d17 | source base |
| 16 | repair | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 17 | repair | demo/stories/foundations/colors.vue | — | e135a8684cba765b758f96bbf2ae5a4d72f5831b | source base |
| 18 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 19 | repair | demo/stories/motion/deck.vue | — | fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0 | source base |
| 20 | repair | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 21 | repair | demo/stories/motion/ScrollChoreographyBody.vue | — | b858ac6530a4639409d25655316ac0503970142d | source base |
| 22 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 23 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 24 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 25 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 26 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 27 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 28 | repair | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 29 | repair | src/components/blob/composables/satelliteKinematics.ts | — | — | BI.W-P008 |
| 30 | repair | src/components/blob/composables/useBlobPointer.ts | — | — | BI.W-P008 |
| 31 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 32 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 33 | repair | src/components/completion-seal/composables/useCompletionSeal.ts | — | — | BI.W-P008 |
| 34 | repair | src/components/constellation/README.md | — | — | BI.W-P008 |
| 35 | repair | src/components/controls/DarkModeToggle.vue | — | — | BI.W-P008 |
| 36 | repair | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 37 | repair | src/components/dock/composables/dockMorphContext.ts | — | — | BI.W-P008 |
| 38 | repair | src/components/dock/composables/useDockClickIntegrity.ts | — | — | BI.W-P008 |
| 39 | repair | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 40 | repair | src/components/dock/composables/useDockOverflowFit.ts | — | — | BI.W-P008 |
| 41 | repair | src/components/dock/composables/useDockPopover.ts | — | — | BI.W-P008 |
| 42 | repair | src/components/dock/composables/useDockSpring.ts | — | — | BI.W-P008 |
| 43 | repair | src/components/dock/composables/useDockState.ts | — | — | BI.W-P008 |
| 44 | repair | src/components/dock/constants.ts | — | — | BI.W-P008 |
| 45 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 46 | repair | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 47 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 48 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 49 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 50 | repair | src/components/drawer/composables/useDrawerSnap.ts | — | — | BI.W-P008 |
| 51 | repair | src/components/drawer/constants.ts | — | — | BI.W-P008 |
| 52 | repair | src/components/drawer/DrawerContent.vue | — | — | BI.W-P008 |
| 53 | repair | src/components/easing/composables/useEasingPicker.ts | — | — | BI.W-P008 |
| 54 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 55 | repair | src/components/fading-scroll/composables/useFadingScroll.ts | — | — | BI.W-P008 |
| 56 | repair | src/components/fading-scroll/FadingScroll.vue | — | — | BI.W-P008 |
| 57 | repair | src/components/fading-scroll/README.md | — | — | BI.W-P008 |
| 58 | repair | src/components/handmark/HandMark.vue | — | — | BI.W-P008 |
| 59 | repair | src/components/header-ribbon/HeaderRibbon.vue | — | — | BI.W-P008 |
| 60 | repair | src/components/infinite-scroll/composables/useInfiniteScroll.ts | — | — | BI.W-P008 |
| 61 | repair | src/components/search/composables/useFuzzySearch.ts | — | — | BI.W-P008 |
| 62 | repair | src/components/tabs/composables/useEyeglassLive.ts | — | — | BI.W-P008 |
| 63 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 64 | repair | src/components/toast/use-toast.ts | — | — | BI.W-P008 |
| 65 | repair | src/components/typewriter/TypewriterText.vue | — | — | BI.W-P008 |
| 66 | repair | src/components/typewriter/utils/timing.ts | — | — | BI.W-P008 |
| 67 | repair | src/components/watercolor-dot/useWatercolorBlob.ts | — | — | BI.W-P008 |
| 68 | repair | src/composables/dark/installDarkModeSync.ts | — | c33b9e18f0cc714b2075a1a80b486c6ff8057817 | source base |
| 69 | repair | src/composables/dark/useGlobalDark.ts | — | 95526044fece57bd864c13cf97082330604d706d | source base |
| 70 | repair | src/composables/dom/useClipboard.ts | — | 42e0fa18328e9c85123bf40faf94692a2368b859 | source base |
| 71 | repair | src/composables/dom/useDocumentVisibility.ts | — | 4df07abe9a6e339a1d19a4564074eff5dccdf3e3 | source base |
| 72 | repair | src/composables/dom/useDragVelocity.ts | — | fae0e47276b1f15a8bef19271c829ff93bb98623 | source base |
| 73 | repair | src/composables/dom/useIdleReady.ts | — | a961ccf4530045be786c84742587ea3d7056ce7b | source base |
| 74 | repair | src/composables/dom/useResizeObserver.ts | — | 5d2737df433400a04a54348547c58f491cad69fb | source base |
| 75 | repair | src/composables/dom/useViewportReady.ts | — | e44411dc9238514267771ed9553a5fb22ef28897 | source base |
| 76 | repair | src/composables/glass/backdropLuminanceSample.ts | — | 3e327f311faa8ab53681165e7cd7cf063b20c85f | source base |
| 77 | repair | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 78 | repair | src/composables/glass/useSpecularTracking.ts | — | 01f066c30062bdccb6583061e728dd45d8e60fd2 | source base |
| 79 | repair | src/composables/glass/webgl/createCanvasLifecycle.ts | — | 06a2ae83fe8309bf7d42335488a689e99de43903 | source base |
| 80 | repair | src/composables/glass/webgl/visibility.ts | — | b1f5e5fd6a2beaed657031ecf6af40793a05feae | source base |
| 81 | repair | src/composables/glass/webgpu/webgpuDevice.ts | — | 1acf4002bb1ac6b8263cb858b7ba6ec3dd11a719 | source base |
| 82 | modify | src/composables/motion/constants.ts | — | d5d04eb8a4a2cc03d98759dc7ef8a78630bb7f9f | source base |
| 83 | modify | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 84 | repair | src/composables/motion/gooBarbellGeometry.ts | — | 2058899e104cb7b0f3f06dad41754b3e80190207 | source base |
| 85 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 86 | repair | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 87 | repair | src/composables/motion/scrollReader.ts | — | 6efbc1b4b32516b9571c63c59a0ca5694972243b | source base |
| 88 | repair | src/composables/motion/supportsCssTimeline.ts | — | 139436181337b0d91ad356e4cc4ceee49689778a | source base |
| 89 | create | src/composables/motion/temporalAuthority.ts | — | — | source base |
| 90 | repair | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 91 | repair | src/composables/motion/useCharStagger.ts | — | 5238e20760401b503b13535e0330939fd742b94c | source base |
| 92 | repair | src/composables/motion/useCountup.ts | — | 8fced7e9e5bf95d85cf2dae69fb748b45baae53e | source base |
| 93 | repair | src/composables/motion/useDragMorph.ts | — | f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f | source base |
| 94 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 95 | repair | src/composables/motion/useGooMorph.ts | — | bca98104d3b8c2a7fdf9071358b71d65b00bc5ae | source base |
| 96 | modify | src/composables/motion/useIntersectionPause.ts | — | 2c5da0c7f0d46678ecd11ab31690e2d838755fa1 | source base |
| 97 | repair | src/composables/motion/useLeadTrail.ts | — | 492e6149e8cb5146cf2ae8ba00ef2988117a755f | source base |
| 98 | repair | src/composables/motion/useLiquidFlex.ts | — | e3f6ca86fc2d8edf5df8f6989d424da6697fb512 | source base |
| 99 | repair | src/composables/motion/useLiquidPress.ts | — | 986bc0ac1dbe15a0e2f9c5833c1036fedc797606 | source base |
| 100 | repair | src/composables/motion/usePrioritizedTask.ts | — | da55faaa1e432f14b6884e701b56e14048059c85 | source base |
| 101 | modify | src/composables/motion/useRAFLoop.ts | — | b78fb56ea89699694dcbb65debf3ec2233f2e4a7 | source base |
| 102 | repair | src/composables/motion/useScrollChrome.ts | — | eaa32a4fb96d0fc0b281cc6e4b6128c6b0f55613 | source base |
| 103 | repair | src/composables/motion/useScrollPin.ts | — | 94e393c719f9ec5328448481276e86641a078abb | source base |
| 104 | repair | src/composables/motion/useScrollProgress.ts | — | 3e9b7b012db55b46012ad728d943caf900e46a75 | source base |
| 105 | repair | src/composables/motion/useScrollScene.ts | — | 44a929c513b92f9a030b28c6cc71a7bbff6ff3ee | source base |
| 106 | repair | src/composables/motion/useSelectionIndicator.ts | — | ddcb73a970cab55abe52d4a0dee65e06c2185ebc | source base |
| 107 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 108 | repair | src/composables/motion/useSpringMount.ts | — | 4a62de1fc2d424cc31dd6d4c60899e914fa25d86 | source base |
| 109 | repair | src/composables/motion/useStagger.ts | — | 5a2264e076653ab79c9d47d9e5b04ea1daf32ba8 | source base |
| 110 | repair | src/composables/motion/useStaggerReveal.ts | — | 270369b8d5817855df8c2a6bcb1a0c058ecd84ac | source base |
| 111 | repair | src/composables/motion/useYieldToMain.ts | — | 40d547368a6e3eb57e6a0d4a14e54ba5c944c507 | source base |
| 112 | repair | src/composables/reactive/useInterval.ts | — | 5814b43b5b020c45b4519bc2a61aad7e48b40e35 | source base |
| 113 | repair | src/composables/reactive/useTimer.ts | — | 30b9fc2b0078a483ac77e0b5e219ad94c79b5c7b | source base |
| 114 | repair | src/composables/sidebar/useLazyLoader.ts | — | f5730e3151667465d5626c0082495c37b22b0a1f | source base |
| 115 | repair | src/composables/sidebar/useScrollTo.ts | — | d4c987073e0a1eac215bb3fba89078aef671eafb | source base |
| 116 | repair | src/composables/sidebar/useScrollTracker.ts | — | 326d8c871c6ff733f4888b60fa985ddd4f0d910a | source base |
| 117 | repair | src/composables/sidebar/useSidebarFollow.ts | — | 1ee7fd89620aaf9854875c2f9de8c1345f9d090c | source base |
| 118 | repair | src/composables/virtual/useVirtualSectionWindow.ts | — | e287ce517d483df6ea5d21e7fd8dc15d84a5c1d7 | source base |
| 119 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 120 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 121 | repair | src/styles/dock/layer-group.css | — | 9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd | source base |
| 122 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 123 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 124 | repair | src/styles/drawer.css | — | 9c49e90f5591f31b54bd511eb161f4dada359928 | source base |
| 125 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 126 | repair | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 127 | repair | src/styles/scroll-chrome.css | — | 3b175f8939c22a00c6ea0bbc298e34ac6b3d7273 | source base |
| 128 | repair | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 129 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 130 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 131 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 132 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 133 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 134 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 135 | create | tests-visual/motion-temporal-authority.spec.ts | — | — | source base |
| 136 | create | tests/composables/motion/temporal-authority.test.ts | — | — | source base |

## Repair manifest (133)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/code/CodeBlock.vue |
| imports | 2 | demo/chassis/hero/StoryHeader.vue |
| imports | 3 | demo/chassis/hero/story-hero.css |
| imports | 4 | demo/chassis/page/StoryPage.vue |
| imports | 5 | demo/chassis/section/StorySection.vue |
| imports | 6 | demo/chassis/section/useSectionReveal.ts |
| imports | 7 | demo/main.ts |
| imports | 8 | demo/shell/AppShell.vue |
| imports | 9 | demo/stories/containers/dialog.vue |
| imports | 10 | demo/stories/data/infinite-scroll.vue |
| imports | 11 | demo/stories/data/tags-input.vue |
| imports | 12 | demo/stories/data/virtual-section.vue |
| imports | 13 | demo/stories/dock/dock-search.vue |
| imports | 14 | demo/stories/feedback/confirm-dialog.vue |
| imports | 15 | demo/stories/feedback/notification.vue |
| imports | 16 | demo/stories/feedback/progress.vue |
| imports | 17 | demo/stories/foundations/colors.vue |
| imports | 18 | demo/stories/motion/ScrollChoreographyBody.vue |
| imports | 19 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 20 | demo/stories/motion/curve-gallery.vue |
| imports | 21 | demo/stories/motion/deck.vue |
| imports | 22 | demo/stories/motion/reveal.vue |
| imports | 23 | demo/stories/motion/springs.vue |
| imports | 24 | demo/stories/navigation/carousel.vue |
| imports | 25 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 26 | demo/stories/substrates/constellation.vue |
| imports | 27 | src/components/aurora/composables/useAurora.ts |
| imports | 28 | src/components/blob/composables/satelliteKinematics.ts |
| imports | 29 | src/components/blob/composables/useBlobPointer.ts |
| imports | 30 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 31 | src/components/border-progress/BorderProgress.vue |
| imports | 32 | src/components/completion-seal/composables/useCompletionSeal.ts |
| imports | 33 | src/components/constellation/README.md |
| imports | 34 | src/components/controls/DarkModeToggle.vue |
| imports | 35 | src/components/dialog/DialogContent.vue |
| imports | 36 | src/components/dock/DockControl.vue |
| imports | 37 | src/components/dock/DockCrossfade.vue |
| imports | 38 | src/components/dock/GlassDock.vue |
| imports | 39 | src/components/dock/README.md |
| imports | 40 | src/components/dock/composables/dockMorphContext.ts |
| imports | 41 | src/components/dock/composables/useDockClickIntegrity.ts |
| imports | 42 | src/components/dock/composables/useDockFisheye.ts |
| imports | 43 | src/components/dock/composables/useDockOverflowFit.ts |
| imports | 44 | src/components/dock/composables/useDockPopover.ts |
| imports | 45 | src/components/dock/composables/useDockSpring.ts |
| imports | 46 | src/components/dock/composables/useDockState.ts |
| imports | 47 | src/components/dock/constants.ts |
| imports | 48 | src/components/dock/index.ts |
| imports | 49 | src/components/drawer/DrawerContent.vue |
| imports | 50 | src/components/drawer/composables/useDrawerSnap.ts |
| imports | 51 | src/components/drawer/constants.ts |
| imports | 52 | src/components/easing/EasingPicker.vue |
| imports | 53 | src/components/easing/composables/useEasingPicker.ts |
| imports | 54 | src/components/fading-scroll/FadingScroll.vue |
| imports | 55 | src/components/fading-scroll/README.md |
| imports | 56 | src/components/fading-scroll/composables/useFadingScroll.ts |
| imports | 57 | src/components/handmark/HandMark.vue |
| imports | 58 | src/components/header-ribbon/HeaderRibbon.vue |
| imports | 59 | src/components/infinite-scroll/composables/useInfiniteScroll.ts |
| imports | 60 | src/components/search/composables/useFuzzySearch.ts |
| imports | 61 | src/components/tabs/composables/useEyeglassLive.ts |
| imports | 62 | src/components/timeline/ScrubberTimeline.vue |
| imports | 63 | src/components/toast/use-toast.ts |
| imports | 64 | src/components/typewriter/TypewriterText.vue |
| imports | 65 | src/components/typewriter/utils/timing.ts |
| imports | 66 | src/components/watercolor-dot/useWatercolorBlob.ts |
| imports | 67 | src/composables/dark/installDarkModeSync.ts |
| imports | 68 | src/composables/dark/useGlobalDark.ts |
| imports | 69 | src/composables/dom/useClipboard.ts |
| imports | 70 | src/composables/dom/useDocumentVisibility.ts |
| imports | 71 | src/composables/dom/useDragVelocity.ts |
| imports | 72 | src/composables/dom/useIdleReady.ts |
| imports | 73 | src/composables/dom/useResizeObserver.ts |
| imports | 74 | src/composables/dom/useViewportReady.ts |
| imports | 75 | src/composables/glass/backdropLuminanceSample.ts |
| imports | 76 | src/composables/glass/useGlassBackdropLuminance.ts |
| imports | 77 | src/composables/glass/useSpecularTracking.ts |
| imports | 78 | src/composables/glass/webgl/createCanvasLifecycle.ts |
| imports | 79 | src/composables/glass/webgl/visibility.ts |
| imports | 80 | src/composables/glass/webgpu/webgpuDevice.ts |
| imports | 81 | src/composables/motion/README.md |
| imports | 82 | src/composables/motion/core/index.ts |
| imports | 83 | src/composables/motion/gooBarbellGeometry.ts |
| imports | 84 | src/composables/motion/index.ts |
| imports | 85 | src/composables/motion/scrollReader.ts |
| imports | 86 | src/composables/motion/supportsCssTimeline.ts |
| imports | 87 | src/composables/motion/useBloomUp.ts |
| imports | 88 | src/composables/motion/useCharStagger.ts |
| imports | 89 | src/composables/motion/useCountup.ts |
| imports | 90 | src/composables/motion/useDragMorph.ts |
| imports | 91 | src/composables/motion/useElementMorph.ts |
| imports | 92 | src/composables/motion/useGooMorph.ts |
| imports | 93 | src/composables/motion/useLeadTrail.ts |
| imports | 94 | src/composables/motion/useLiquidFlex.ts |
| imports | 95 | src/composables/motion/useLiquidPress.ts |
| imports | 96 | src/composables/motion/usePrioritizedTask.ts |
| imports | 97 | src/composables/motion/useRAFLoop.ts |
| imports | 98 | src/composables/motion/useScrollChrome.ts |
| imports | 99 | src/composables/motion/useScrollPin.ts |
| imports | 100 | src/composables/motion/useScrollProgress.ts |
| imports | 101 | src/composables/motion/useScrollScene.ts |
| imports | 102 | src/composables/motion/useSelectionIndicator.ts |
| imports | 103 | src/composables/motion/useSpring.ts |
| imports | 104 | src/composables/motion/useSpringMount.ts |
| imports | 105 | src/composables/motion/useStagger.ts |
| imports | 106 | src/composables/motion/useStaggerReveal.ts |
| imports | 107 | src/composables/motion/useYieldToMain.ts |
| imports | 108 | src/composables/reactive/useInterval.ts |
| imports | 109 | src/composables/reactive/useTimer.ts |
| imports | 110 | src/composables/sidebar/useLazyLoader.ts |
| imports | 111 | src/composables/sidebar/useScrollTo.ts |
| imports | 112 | src/composables/sidebar/useScrollTracker.ts |
| imports | 113 | src/composables/sidebar/useSidebarFollow.ts |
| imports | 114 | src/composables/virtual/useVirtualSectionWindow.ts |
| imports | 115 | src/index.ts |
| imports | 116 | src/styles/card-scroll.css |
| imports | 117 | src/styles/dock/layer-group.css |
| imports | 118 | src/styles/dock/overflow.css |
| imports | 119 | src/styles/dock/shell.css |
| imports | 120 | src/styles/drawer.css |
| imports | 121 | src/styles/glass/surfaces.css |
| imports | 122 | src/styles/scroll-choreography.css |
| imports | 123 | src/styles/scroll-chrome.css |
| imports | 124 | src/styles/scroll-driven.css |
| imports | 125 | src/styles/tokens/property-regs-specular.css |
| imports | 126 | src/styles/tokens/scheme-motion.css |
| imports | 127 | src/styles/tokens/scheme-spring.css |
| imports | 128 | src/styles/tokens/scroll-tokens.css |
| imports | 129 | src/styles/utilities/base-misc.css |
| imports | 130 | src/styles/utilities/base.css |
| tests | 1 | tests-visual/motion-temporal-authority.spec.ts |
| tests | 2 | tests/composables/motion/temporal-authority.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P025/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every animated property and semantic episode has one declared temporal authority and writer appropriate to its mechanism; its resolved channel is truthfully classified as layout, paint, or trace-supported composite; overlapping writers, local physics/easing loops, orphan work, permanent filename exceptions, and silent scheduler substitution are absent, while pause/settle/interruption/teardown are deterministic.

**Required mutation bite:** Add a component-local rAF writing transform beside SpringProgress playback, keep a JS shadow beside a native timeline, strand a typewriter timer after cancel, or animate --probe into width while calling it compositor-safe; temporal/channel evidence must turn RED without a global rAF count or filename allowlist.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P025`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.token-graph | device-free | Every semantic token has one definition, typed domain, live consumer, valid dark/contrast resolution, and no alias cycle or dead rung. | Create a token alias cycle.; Add a defined token with no computed consumer. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: physics-visible, continuous-offscreen, native-js-exclusive, channel-layout, channel-paint, channel-composite, custom-property-layout-negative, coalescer-burst, typewriter-cancel, hidden-resume, prm, teardown
Observables: authority class, property/episode writer identity, resolved channel/sink graph, CLS/main-thread/frame trace, compositing evidence, frame/timer submission, pause/settle/interruption continuity, teardown baseline
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P024 | A motion concept has one current name, one writer, and real runtime product ownership; no old import, prop, token, class, directive, runtime branch, prose future-consumer record, path-existence tally, alias definition, or unit test preserves or self-justifies a retired contract. |

Declared semantic locks: `motion-clock`. The cursor also acquires 136 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
