# BI.W-P024 — Motion API clean break — aliases, legacy names, and shadow writers

**Status:** PLANNED
**Topological stratum:** BI.S13
**Formation family:** motion
**Core centers:** C1_LIQUID_GLASS, C3_MOTION, C7_KEYFRAMES_INTEGRATION, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P024`

## Intent

Remove every preserved motion alias and compatibility ladder before new behavior builds on the public contract.

## Exact scope

- Delete Countup and AnimatedNumber aliases, old curve aliases, deprecated props, and dual CSS/JS state writers.
- Rename surviving APIs once at their semantic owner and regenerate migration rows from symbol diff.
- Classify native-feature capability handling separately from API compatibility and delete unsupported old-browser shadows for the Safari/Chrome floor.
- Re-evaluate every retained public motion primitive from current syntax/import/runtime evidence: tests, type-only imports, barrels, docs, registry rows, and future asks contribute no product-demand credit; an unowned primitive and its self-justifying tests are deleted together.
- Retire --ease-convergence and its reverse-table/test/prose projections: the exact tracked constellation has no product reader, and a future Fourier sentence cannot preserve an alias of gentle in advance.
- Retire the public-but-unused vScrollRevealOnce directive, [data-scroll-reveal-once] CSS/capture branch, and its self-test while preserving the shared useStaggerReveal once semantics used by actual owners; the demo's separate private section reveal remains under its own semantic owner rather than becoming retroactive demand.
- Repoint all local consumers/tests atomically; foreign consumers receive exact owner packets.

## File manifest (110)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/capture/capture.css | — | 72ec7a39ba444a7c373e7762d7f87f449db9658b | source base |
| 2 | repair | demo/chassis/landing/vizPreviewStill.ts | — | 0b8f78dca4c032effd6059d416f9b758045bed79 | source base |
| 3 | modify | demo/chassis/section/useSectionReveal.ts | — | e86e5240dbce917231278703558733326ffc8259 | source base |
| 4 | repair | demo/shell/configurator/preset-editor/persistence.ts | — | — | BI.W-P012 |
| 5 | repair | demo/stories/data/metric-cell.vue | — | ba851ae5f53abdb3aaf555eb5722ef19f374576e | source base |
| 6 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 7 | repair | demo/stories/motion/animated-digit.vue | — | 037ce8e85cfc0777dc4f8c60a991c5e3fb889e34 | source base |
| 8 | repair | demo/stories/motion/countup.vue | — | 9e211d7ed538441aa2b4c69c757c0faf2fd8159c | source base |
| 9 | repair | demo/stories/motion/text-motion.vue | — | bf6ef80875b5cdb6af038fd2f378f55e164edf7b | source base |
| 10 | repair | demo/stories/substrates/aurora/config/options.ts | — | 2fb120cd0b760df8bb8f778b8b9eb16ad15dd0a3 | source base |
| 11 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 12 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 13 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 14 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 15 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 16 | repair | src/components/_shared/menuItemVariants.ts | — | — | BI.W-P008 |
| 17 | repair | src/components/_shared/useSurfaceAxis.ts | — | — | BI.W-P008 |
| 18 | repair | src/components/animated-digit/AnimatedDigit.vue | — | — | BI.W-P008 |
| 19 | repair | src/components/animated-digit/README.md | — | — | BI.W-P008 |
| 20 | repair | src/components/aurora/composables/color.ts | — | — | BI.W-P008 |
| 21 | repair | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 22 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 23 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 24 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 25 | repair | src/components/blob/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 26 | repair | src/components/blob/composables/uploadBlobUniforms.ts | — | — | BI.W-P008 |
| 27 | repair | src/components/blob/RESEARCH.md | — | — | BI.W-P008 |
| 28 | repair | src/components/blob/shaders/metaball-uniforms.glsl.ts | — | — | BI.W-P008 |
| 29 | repair | src/components/blob/shaders/metaball.frag.ts | — | — | BI.W-P008 |
| 30 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 31 | repair | src/components/chip/chipVariants.ts | — | — | BI.W-P008 |
| 32 | repair | src/components/configurator/Configurator.vue | — | — | BI.W-P008 |
| 33 | repair | src/components/dock/composables/dockMorphMeasure.ts | — | — | BI.W-P008 |
| 34 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 35 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 36 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 37 | repair | src/components/goo-filter/GooFilter.vue | — | — | BI.W-P008 |
| 38 | repair | src/components/handmark/composables/useHandMark.ts | — | — | BI.W-P008 |
| 39 | repair | src/components/handmark/geometry.ts | — | — | BI.W-P008 |
| 40 | repair | src/components/handmark/HandMark.vue | — | — | BI.W-P008 |
| 41 | repair | src/components/metric-stack/MetricRow.vue | — | — | BI.W-P008 |
| 42 | repair | src/components/metric-stack/README.md | — | — | BI.W-P008 |
| 43 | repair | src/components/select/SelectContent.vue | — | — | BI.W-P008 |
| 44 | repair | src/components/skeleton/Skeleton.vue | — | — | BI.W-P008 |
| 45 | repair | src/components/stacked-icons/StackedIconGroup.vue | — | — | BI.W-P008 |
| 46 | repair | src/components/tabs/index.ts | — | — | BI.W-P008 |
| 47 | repair | src/components/timeline/geometry.ts | — | — | BI.W-P008 |
| 48 | repair | src/components/timeline/GlassTimeline.vue | — | — | BI.W-P008 |
| 49 | repair | src/components/toast/ToastClose.vue | — | — | BI.W-P008 |
| 50 | repair | src/composables/dom/useBreakpoint.ts | — | 4bdab7c3e276a49f64efb9955fbd710bfe6d2d9c | source base |
| 51 | repair | src/composables/dom/useClipboard.ts | — | 42e0fa18328e9c85123bf40faf94692a2368b859 | source base |
| 52 | repair | src/composables/dom/useUserInvalidAria.ts | — | 09f551e245747f955595daf64d799e972e7fec79 | source base |
| 53 | repair | src/composables/glass/backdropLuminanceSample.ts | — | 3e327f311faa8ab53681165e7cd7cf063b20c85f | source base |
| 54 | repair | src/composables/glass/canvas2d/index.ts | — | 3a9f176bdce15830981142fb9d5983049d2dd586 | source base |
| 55 | repair | src/composables/glass/webgl/createCanvasLifecycle.ts | — | 06a2ae83fe8309bf7d42335488a689e99de43903 | source base |
| 56 | repair | src/composables/glass/webgl/useWebGLCanvas.ts | — | e6614e08dfb2a5104afe33eb07a0046fc0b62777 | source base |
| 57 | repair | src/composables/glass/webgpu/useGpuSubstrate.ts | — | 50e6d5e382d5ad774377c3277ad666b5424fcbcd | source base |
| 58 | repair | src/composables/glass/webgpu/useWebGPUCanvas.ts | — | 44b6d570e621c80f2bf4f4fb319ff9ccdd15e06a | source base |
| 59 | repair | src/composables/glass/webgpu/webgpuCanvasTypes.ts | — | 59c057ee8e4197be8f2b30945e1ee4c4d9d372ab | source base |
| 60 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 61 | modify | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 62 | repair | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 63 | repair | src/composables/motion/springPresets.ts | — | 67c33531dbed67a2b7a172d16bf8213812f0a37c | source base |
| 64 | modify | src/composables/motion/useAnimatedNumber.ts | — | bf3aa656ce11684a2d7ce3d908d19dc741205b6d | source base |
| 65 | repair | src/composables/motion/useAnimatedNumberMap.ts | — | d15b91398f8b8ebf0a00f87fcf9e2a8b6a5f3466 | source base |
| 66 | modify | src/composables/motion/useCountup.ts | — | 8fced7e9e5bf95d85cf2dae69fb748b45baae53e | source base |
| 67 | repair | src/composables/motion/usePrioritizedTask.ts | — | da55faaa1e432f14b6884e701b56e14048059c85 | source base |
| 68 | repair | src/composables/motion/useRAFLoop.ts | — | b78fb56ea89699694dcbb65debf3ec2233f2e4a7 | source base |
| 69 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 70 | repair | src/composables/motion/useStagger.ts | — | 5a2264e076653ab79c9d47d9e5b04ea1daf32ba8 | source base |
| 71 | modify | src/composables/motion/useStaggerReveal.ts | — | 270369b8d5817855df8c2a6bcb1a0c058ecd84ac | source base |
| 72 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 73 | repair | src/styles/configurator.css | — | 251d50ff9b2ec84111ce2949a0fe6e53190f73ad | source base |
| 74 | repair | src/styles/dock-controls/triggers.css | — | 07a870beb2ac348343c7309203adef7d43abdded | source base |
| 75 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 76 | repair | src/styles/dock/layers.css | — | 0c915d1d614a7b450020ba281acc18e798898d86 | source base |
| 77 | repair | src/styles/dock/shape.css | — | 373e9d2f02d923d0c802de9059d50cc4e5f03e70 | source base |
| 78 | repair | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 79 | repair | src/styles/glass/control-surfaces.css | — | 2db5c477d919ee795d0a5b7d212cf39f835fdb85 | source base |
| 80 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 81 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 82 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 83 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 84 | modify | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 85 | create | src/styles/tokens/bridges.css | — | — | source base |
| 86 | repair | src/styles/tokens/color-radius.css | — | 39abb72a24aa29eeac358f0a2c2cc3eee480aea9 | source base |
| 87 | repair | src/styles/tokens/glass.css | — | 5c09fd47c15544fb9e5d89202f0ef99c48208e1f | source base |
| 88 | repair | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 89 | modify | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 90 | modify | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 91 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 92 | repair | src/styles/tokens/shadow.css | — | 021c5321af39c05176a8f697d08ac3678a42902a | source base |
| 93 | repair | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 94 | repair | src/styles/utilities/animate.css | — | 0c6a4aa2a584c1732b9c3c512f79d9901ef479ac | source base |
| 95 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 96 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 97 | repair | src/styles/utilities/components.css | — | 79fdb388d65dbd43fc11a706d0ec7b0a9909445d | source base |
| 98 | repair | tests-visual/card-padding.spec.ts | — | d36cc6d93bd6df9c2796a20608867163051719ec | source base |
| 99 | repair | tests-visual/config-chassis.spec.ts | — | 0430686e92aa805706ed228803144a1f06775479 | source base |
| 100 | repair | tests-visual/phase-palette.spec.ts | — | af9849858cbcb471219ffbdece6e2b72a78b88ea | source base |
| 101 | repair | tests-visual/playwright.config.ts | — | 360ab7c98cdf22d96db6c49d51ac6d42092a0117 | source base |
| 102 | repair | tests/components/custom/animated-digit/AnimatedDigit.test.ts | — | c17a0ae029303bfc60dbf6df2fc4712c442480c9 | source base |
| 103 | repair | tests/components/custom/constellation/constellationField.test.ts | — | d3e1f907148154c52d2601bb51e4d9d0e6d5a9d3 | source base |
| 104 | repair | tests/components/custom/dock/GlassDock.motion-parity.test.ts | — | 03f68a301ae1eb8552f390992429ef9477d6821e | source base |
| 105 | repair | tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts | — | d47daaf66a594f8133cbd6f56be59f7457c07617 | source base |
| 106 | create | tests/composables/motion/clean-break.test.ts | — | — | source base |
| 107 | delete | tests/composables/motion/scroll-reveal-once.test.ts | — | 5f0b81ad16b4d4b146f25591ffdb2136d0630bd4 | source base |
| 108 | repair | tests/composables/useAnimatedNumber.test.ts | — | 60a0f98bc090e55bb87be28564230ffd75683fda | source base |
| 109 | repair | tests/composables/useCountup.test.ts | — | 359d2445426941c66f69286a1307362d4f23dcba | source base |
| 110 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |

## Repair manifest (109)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/capture/capture.css |
| imports | 2 | demo/chassis/landing/vizPreviewStill.ts |
| imports | 3 | demo/chassis/section/useSectionReveal.ts |
| imports | 4 | demo/shell/configurator/preset-editor/persistence.ts |
| imports | 5 | demo/stories/data/metric-cell.vue |
| imports | 6 | demo/stories/manifest.ts |
| imports | 7 | demo/stories/motion/animated-digit.vue |
| imports | 8 | demo/stories/motion/countup.vue |
| imports | 9 | demo/stories/motion/text-motion.vue |
| imports | 10 | demo/stories/substrates/aurora/config/options.ts |
| imports | 11 | src/components/_shared/menuItemVariants.ts |
| imports | 12 | src/components/_shared/useSurfaceAxis.ts |
| imports | 13 | src/components/animated-digit/AnimatedDigit.vue |
| imports | 14 | src/components/animated-digit/README.md |
| imports | 15 | src/components/aurora/DESIGN.md |
| imports | 16 | src/components/aurora/README.md |
| imports | 17 | src/components/aurora/composables/color.ts |
| imports | 18 | src/components/aurora/composables/uniformBridge.ts |
| imports | 19 | src/components/aurora/constants/presets.ts |
| imports | 20 | src/components/blob/RESEARCH.md |
| imports | 21 | src/components/blob/composables/uniformBridgeWGPU.ts |
| imports | 22 | src/components/blob/composables/uploadBlobUniforms.ts |
| imports | 23 | src/components/blob/shaders/metaball-uniforms.glsl.ts |
| imports | 24 | src/components/blob/shaders/metaball.frag.ts |
| imports | 25 | src/components/blob/types.ts |
| imports | 26 | src/components/chip/chipVariants.ts |
| imports | 27 | src/components/configurator/Configurator.vue |
| imports | 28 | src/components/dock/GlassDock.vue |
| imports | 29 | src/components/dock/README.md |
| imports | 30 | src/components/dock/composables/dockMorphMeasure.ts |
| imports | 31 | src/components/dock/index.ts |
| imports | 32 | src/components/goo-filter/GooFilter.vue |
| imports | 33 | src/components/handmark/HandMark.vue |
| imports | 34 | src/components/handmark/composables/useHandMark.ts |
| imports | 35 | src/components/handmark/geometry.ts |
| imports | 36 | src/components/metric-stack/MetricRow.vue |
| imports | 37 | src/components/metric-stack/README.md |
| imports | 38 | src/components/select/SelectContent.vue |
| imports | 39 | src/components/skeleton/Skeleton.vue |
| imports | 40 | src/components/stacked-icons/StackedIconGroup.vue |
| imports | 41 | src/components/tabs/index.ts |
| imports | 42 | src/components/timeline/GlassTimeline.vue |
| imports | 43 | src/components/timeline/geometry.ts |
| imports | 44 | src/components/toast/ToastClose.vue |
| imports | 45 | src/composables/dom/useBreakpoint.ts |
| imports | 46 | src/composables/dom/useClipboard.ts |
| imports | 47 | src/composables/dom/useUserInvalidAria.ts |
| imports | 48 | src/composables/glass/backdropLuminanceSample.ts |
| imports | 49 | src/composables/glass/canvas2d/index.ts |
| imports | 50 | src/composables/glass/webgl/createCanvasLifecycle.ts |
| imports | 51 | src/composables/glass/webgl/useWebGLCanvas.ts |
| imports | 52 | src/composables/glass/webgpu/useGpuSubstrate.ts |
| imports | 53 | src/composables/glass/webgpu/useWebGPUCanvas.ts |
| imports | 54 | src/composables/glass/webgpu/webgpuCanvasTypes.ts |
| imports | 55 | src/composables/motion/README.md |
| imports | 56 | src/composables/motion/core/index.ts |
| imports | 57 | src/composables/motion/index.ts |
| imports | 58 | src/composables/motion/springPresets.ts |
| imports | 59 | src/composables/motion/useAnimatedNumber.ts |
| imports | 60 | src/composables/motion/useAnimatedNumberMap.ts |
| imports | 61 | src/composables/motion/useCountup.ts |
| imports | 62 | src/composables/motion/usePrioritizedTask.ts |
| imports | 63 | src/composables/motion/useRAFLoop.ts |
| imports | 64 | src/composables/motion/useSpring.ts |
| imports | 65 | src/composables/motion/useStagger.ts |
| imports | 66 | src/composables/motion/useStaggerReveal.ts |
| imports | 67 | src/index.ts |
| imports | 68 | src/styles/configurator.css |
| imports | 69 | src/styles/dock-controls/triggers.css |
| imports | 70 | src/styles/dock/density.css |
| imports | 71 | src/styles/dock/layers.css |
| imports | 72 | src/styles/dock/shape.css |
| imports | 73 | src/styles/glass-specular-track.css |
| imports | 74 | src/styles/glass/control-surfaces.css |
| imports | 75 | src/styles/glass/glass-capsule.css |
| imports | 76 | src/styles/glass/surfaces.css |
| imports | 77 | src/styles/index.css |
| imports | 78 | src/styles/instrument-chassis.css |
| imports | 79 | src/styles/scroll-driven.css |
| imports | 80 | src/styles/tokens/color-radius.css |
| imports | 81 | src/styles/tokens/glass.css |
| imports | 82 | src/styles/tokens/scale-paper.css |
| imports | 83 | src/styles/tokens/scheme-spring.css |
| imports | 84 | src/styles/tokens/scroll-tokens.css |
| imports | 85 | src/styles/tokens/shadow.css |
| imports | 86 | src/styles/typography/semantic.css |
| imports | 87 | src/styles/utilities/animate.css |
| imports | 88 | src/styles/utilities/base-misc.css |
| imports | 89 | src/styles/utilities/base.css |
| imports | 90 | src/styles/utilities/components.css |
| imports | 91 | tests-visual/card-padding.spec.ts |
| imports | 92 | tests-visual/config-chassis.spec.ts |
| imports | 93 | tests-visual/phase-palette.spec.ts |
| imports | 94 | tests-visual/playwright.config.ts |
| imports | 95 | tests/components/custom/animated-digit/AnimatedDigit.test.ts |
| imports | 96 | tests/components/custom/constellation/constellationField.test.ts |
| imports | 97 | tests/components/custom/dock/GlassDock.motion-parity.test.ts |
| imports | 98 | tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts |
| imports | 99 | tests/composables/motion/scroll-reveal-once.test.ts |
| imports | 100 | tests/composables/useAnimatedNumber.test.ts |
| imports | 101 | tests/composables/useCountup.test.ts |
| imports | 102 | tests/public-surface.spec.ts |
| tests | 1 | tests/composables/motion/clean-break.test.ts |
| tests | 2 | tests/composables/motion/scroll-reveal-once.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P024/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** A motion concept has one current name, one writer, and real runtime product ownership; no old import, prop, token, class, directive, runtime branch, prose future-consumer record, path-existence tally, alias definition, or unit test preserves or self-justifies a retired contract.

**Required mutation bite:** Restore `export type Countup = UseCountupReturn`, --ease-convergence, or vScrollRevealOnce with only its own test/demo prose, and require clean-break/topology evidence to stay RED without relying on a comment or fixed consumer count.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P024`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Device-free: API deletion and writer census are device-free; behavior-equivalent consumer tests bind repoints.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P023 | Upstream engine primitives have one direct upstream authority; Glass publishes only owned motion bindings, semantic presets, and the /easing component, with no root-barrel mirror, reverse token-callable table, foreign-demo parity contract, stale displayed parameter, or consumer break. |

Declared semantic locks: `entry-graph`, `motion-vocabulary`. The cursor also acquires 110 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
