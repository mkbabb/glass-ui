# BI.W-P015 — Semantic token graph and dead-alias excision

**Status:** IMPLEMENTED — SOURCE CONTRACT GREEN
**Topological stratum:** BI.S09
**Formation family:** design-foundation
**Core centers:** C10_CONSTELLATION_ASSAY, C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P015`

## Intent

Make tokens a typed semantic graph with one definition/consumer path and remove historical aliases, dead rungs, and component-local redefinitions.

## Exact scope

- Generate typed domains for color, material, type, space, radius, shadow, motion, and interaction from CSS definitions and reads.
- Delete alias cycles, old-name bridges, compatibility reads, and tokens with no computed consumer.
- Resolve dark, contrast, forced-color, and reduced-transparency values through the same semantic IDs.
- Expose component override points only where product customization is real; internal implementation constants stay private.

## File manifest (721)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 2 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 3 | repair | src/components/_shared/axes.ts | — | — | BI.W-P008 |
| 4 | repair | src/components/_shared/index.ts | — | — | BI.W-P008 |
| 5 | repair | src/components/_shared/menuItemVariants.ts | — | — | BI.W-P008 |
| 6 | repair | src/components/_shared/ModalOverlay.vue | — | — | BI.W-P008 |
| 7 | repair | src/components/_shared/useControlSize.ts | — | — | BI.W-P008 |
| 8 | repair | src/components/_shared/useMotionAxis.ts | — | — | BI.W-P008 |
| 9 | repair | src/components/_shared/useStalePropWarning.ts | — | — | BI.W-P008 |
| 10 | repair | src/components/_shared/useSurfaceAxis.ts | — | — | BI.W-P008 |
| 11 | repair | src/components/accordion/Accordion.vue | — | — | BI.W-P008 |
| 12 | repair | src/components/accordion/AccordionContent.vue | — | — | BI.W-P008 |
| 13 | repair | src/components/accordion/AccordionItem.vue | — | — | BI.W-P008 |
| 14 | repair | src/components/accordion/AccordionTrigger.vue | — | — | BI.W-P008 |
| 15 | repair | src/components/accordion/index.ts | — | — | BI.W-P008 |
| 16 | repair | src/components/alert/Alert.vue | — | — | BI.W-P008 |
| 17 | repair | src/components/alert/AlertDescription.vue | — | — | BI.W-P008 |
| 18 | repair | src/components/alert/AlertTitle.vue | — | — | BI.W-P008 |
| 19 | repair | src/components/alert/index.ts | — | — | BI.W-P008 |
| 20 | repair | src/components/animated-digit/AnimatedDigit.vue | — | — | BI.W-P008 |
| 21 | repair | src/components/animated-digit/index.ts | — | — | BI.W-P008 |
| 22 | repair | src/components/aurora/Aurora.vue | — | — | BI.W-P008 |
| 23 | repair | src/components/aurora/composables/atoms-fields.ts | — | — | BI.W-P008 |
| 24 | repair | src/components/aurora/composables/atoms.ts | — | — | BI.W-P008 |
| 25 | repair | src/components/aurora/composables/auroraFallbackGround.ts | — | — | BI.W-P008 |
| 26 | repair | src/components/aurora/composables/auroraImageSource.ts | — | — | BI.W-P008 |
| 27 | repair | src/components/aurora/composables/color.ts | — | — | BI.W-P008 |
| 28 | repair | src/components/aurora/composables/configSource.ts | — | — | BI.W-P008 |
| 29 | repair | src/components/aurora/composables/frameLoop.ts | — | — | BI.W-P008 |
| 30 | repair | src/components/aurora/composables/glSetup.ts | — | — | BI.W-P008 |
| 31 | repair | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 32 | repair | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 33 | repair | src/components/aurora/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 34 | repair | src/components/aurora/composables/uniformBridgeWGPUImage.ts | — | — | BI.W-P008 |
| 35 | repair | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 36 | repair | src/components/aurora/composables/useCursorInteraction.ts | — | — | BI.W-P008 |
| 37 | repair | src/components/aurora/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 38 | repair | src/components/aurora/constants/budget.ts | — | — | BI.W-P008 |
| 39 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 40 | repair | src/components/aurora/constants/renderMode.ts | — | — | BI.W-P008 |
| 41 | repair | src/components/aurora/constants/shaders/aurora-image.frag.ts | — | — | BI.W-P008 |
| 42 | repair | src/components/aurora/constants/shaders/aurora-image.wgsl.ts | — | — | BI.W-P008 |
| 43 | repair | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts | — | — | BI.W-P008 |
| 44 | repair | src/components/aurora/constants/shaders/aurora.frag.ts | — | — | BI.W-P008 |
| 45 | repair | src/components/aurora/constants/shaders/aurora.vert.ts | — | — | BI.W-P008 |
| 46 | repair | src/components/aurora/constants/shaders/aurora.wgsl.ts | — | — | BI.W-P008 |
| 47 | repair | src/components/aurora/constants/shaders/brush.glsl.ts | — | — | BI.W-P008 |
| 48 | repair | src/components/aurora/constants/shaders/composition.glsl.ts | — | — | BI.W-P008 |
| 49 | repair | src/components/aurora/constants/shaders/flow.glsl.ts | — | — | BI.W-P008 |
| 50 | repair | src/components/aurora/constants/shaders/mediums.glsl.ts | — | — | BI.W-P008 |
| 51 | repair | src/components/aurora/constants/shaders/metal-medium.glsl.ts | — | — | BI.W-P008 |
| 52 | repair | src/components/aurora/constants/shaders/oil-modes.glsl.ts | — | — | BI.W-P008 |
| 53 | repair | src/components/aurora/constants/shaders/procedural-color.wgsl.ts | — | — | BI.W-P008 |
| 54 | repair | src/components/aurora/constants/shaders/tonemap.glsl.ts | — | — | BI.W-P008 |
| 55 | repair | src/components/aurora/constants/shaders/vangogh-medium.glsl.ts | — | — | BI.W-P008 |
| 56 | repair | src/components/aurora/index.ts | — | — | BI.W-P008 |
| 57 | repair | src/components/avatar/Avatar.vue | — | — | BI.W-P008 |
| 58 | repair | src/components/avatar/AvatarFallback.vue | — | — | BI.W-P008 |
| 59 | repair | src/components/avatar/AvatarImage.vue | — | — | BI.W-P008 |
| 60 | repair | src/components/avatar/index.ts | — | — | BI.W-P008 |
| 61 | repair | src/components/badge/Badge.vue | — | — | BI.W-P008 |
| 62 | repair | src/components/badge/index.ts | — | — | BI.W-P008 |
| 63 | repair | src/components/blob/Blob.vue | — | — | BI.W-P008 |
| 64 | repair | src/components/blob/composables/buildMetaballProgram.ts | — | — | BI.W-P008 |
| 65 | repair | src/components/blob/composables/easing.ts | — | — | BI.W-P008 |
| 66 | repair | src/components/blob/composables/satelliteKinematics.ts | — | — | BI.W-P008 |
| 67 | repair | src/components/blob/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 68 | repair | src/components/blob/composables/uploadBlobUniforms.ts | — | — | BI.W-P008 |
| 69 | repair | src/components/blob/composables/useBlobMood.ts | — | — | BI.W-P008 |
| 70 | repair | src/components/blob/composables/useBlobPointer.ts | — | — | BI.W-P008 |
| 71 | repair | src/components/blob/composables/useBlobSatellites.ts | — | — | BI.W-P008 |
| 72 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 73 | repair | src/components/blob/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 74 | repair | src/components/blob/config.ts | — | — | BI.W-P008 |
| 75 | repair | src/components/blob/constants.ts | — | — | BI.W-P008 |
| 76 | repair | src/components/blob/index.ts | — | — | BI.W-P008 |
| 77 | repair | src/components/blob/presets.ts | — | — | BI.W-P008 |
| 78 | repair | src/components/blob/shaders/metaball-noise.wgsl.ts | — | — | BI.W-P008 |
| 79 | repair | src/components/blob/shaders/metaball-palette.wgsl.ts | — | — | BI.W-P008 |
| 80 | repair | src/components/blob/shaders/metaball-uniforms.glsl.ts | — | — | BI.W-P008 |
| 81 | repair | src/components/blob/shaders/metaball.frag.ts | — | — | BI.W-P008 |
| 82 | repair | src/components/blob/shaders/metaball.vert.ts | — | — | BI.W-P008 |
| 83 | repair | src/components/blob/shaders/metaball.wgsl.ts | — | — | BI.W-P008 |
| 84 | repair | src/components/blob/shaders/oklch-perturb.glsl.ts | — | — | BI.W-P008 |
| 85 | repair | src/components/blob/shaders/sdf-body.glsl.ts | — | — | BI.W-P008 |
| 86 | repair | src/components/blob/shaders/watercolor-edges.glsl.ts | — | — | BI.W-P008 |
| 87 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 88 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 89 | repair | src/components/border-progress/composables/useBorderSpectrum.ts | — | — | BI.W-P008 |
| 90 | repair | src/components/border-progress/constants.ts | — | — | BI.W-P008 |
| 91 | repair | src/components/border-progress/index.ts | — | — | BI.W-P008 |
| 92 | repair | src/components/button/Button.vue | — | — | BI.W-P008 |
| 93 | repair | src/components/button/index.ts | — | — | BI.W-P008 |
| 94 | repair | src/components/card/Card.vue | — | — | BI.W-P008 |
| 95 | repair | src/components/card/CardAction.vue | — | — | BI.W-P008 |
| 96 | repair | src/components/card/CardContent.vue | — | — | BI.W-P008 |
| 97 | repair | src/components/card/CardDescription.vue | — | — | BI.W-P008 |
| 98 | repair | src/components/card/CardFooter.vue | — | — | BI.W-P008 |
| 99 | repair | src/components/card/CardHeader.vue | — | — | BI.W-P008 |
| 100 | repair | src/components/card/CardTitle.vue | — | — | BI.W-P008 |
| 101 | repair | src/components/card/index.ts | — | — | BI.W-P008 |
| 102 | repair | src/components/card/ScrollCard.vue | — | — | BI.W-P008 |
| 103 | repair | src/components/card/ScrollCardHeader.vue | — | — | BI.W-P008 |
| 104 | repair | src/components/carousel/Carousel.vue | — | — | BI.W-P008 |
| 105 | repair | src/components/carousel/CarouselContent.vue | — | — | BI.W-P008 |
| 106 | repair | src/components/carousel/CarouselItem.vue | — | — | BI.W-P008 |
| 107 | repair | src/components/carousel/CarouselNext.vue | — | — | BI.W-P008 |
| 108 | repair | src/components/carousel/CarouselPager.vue | — | — | BI.W-P008 |
| 109 | repair | src/components/carousel/CarouselPrevious.vue | — | — | BI.W-P008 |
| 110 | repair | src/components/carousel/GlassCarouselPager.vue | — | — | BI.W-P008 |
| 111 | repair | src/components/carousel/index.ts | — | — | BI.W-P008 |
| 112 | repair | src/components/carousel/interface.ts | — | — | BI.W-P008 |
| 113 | repair | src/components/carousel/useCarousel.ts | — | — | BI.W-P008 |
| 114 | repair | src/components/checkbox/Checkbox.vue | — | — | BI.W-P008 |
| 115 | repair | src/components/checkbox/index.ts | — | — | BI.W-P008 |
| 116 | repair | src/components/chip/Chip.vue | — | — | BI.W-P008 |
| 117 | repair | src/components/chip/chipVariants.ts | — | — | BI.W-P008 |
| 118 | repair | src/components/chip/index.ts | — | — | BI.W-P008 |
| 119 | repair | src/components/chip/types.ts | — | — | BI.W-P008 |
| 120 | repair | src/components/collapsible/Collapsible.vue | — | — | BI.W-P008 |
| 121 | repair | src/components/collapsible/CollapsibleContent.vue | — | — | BI.W-P008 |
| 122 | repair | src/components/collapsible/CollapsibleTrigger.vue | — | — | BI.W-P008 |
| 123 | repair | src/components/collapsible/index.ts | — | — | BI.W-P008 |
| 124 | repair | src/components/color-swatch/ColorSwatch.vue | — | — | BI.W-P008 |
| 125 | repair | src/components/color-swatch/index.ts | — | — | BI.W-P008 |
| 126 | repair | src/components/combobox/Combobox.vue | — | — | BI.W-P008 |
| 127 | repair | src/components/combobox/ComboboxAnchor.vue | — | — | BI.W-P008 |
| 128 | repair | src/components/combobox/ComboboxEmpty.vue | — | — | BI.W-P008 |
| 129 | repair | src/components/combobox/ComboboxGroup.vue | — | — | BI.W-P008 |
| 130 | repair | src/components/combobox/ComboboxInput.vue | — | — | BI.W-P008 |
| 131 | repair | src/components/combobox/ComboboxItem.vue | — | — | BI.W-P008 |
| 132 | repair | src/components/combobox/ComboboxItemIndicator.vue | — | — | BI.W-P008 |
| 133 | repair | src/components/combobox/ComboboxList.vue | — | — | BI.W-P008 |
| 134 | repair | src/components/combobox/ComboboxSeparator.vue | — | — | BI.W-P008 |
| 135 | repair | src/components/combobox/ComboboxViewport.vue | — | — | BI.W-P008 |
| 136 | repair | src/components/combobox/index.ts | — | — | BI.W-P008 |
| 137 | repair | src/components/command/Command.vue | — | — | BI.W-P008 |
| 138 | repair | src/components/command/CommandDialog.vue | — | — | BI.W-P008 |
| 139 | repair | src/components/command/CommandEmpty.vue | — | — | BI.W-P008 |
| 140 | repair | src/components/command/CommandGroup.vue | — | — | BI.W-P008 |
| 141 | repair | src/components/command/CommandInput.vue | — | — | BI.W-P008 |
| 142 | repair | src/components/command/CommandItem.vue | — | — | BI.W-P008 |
| 143 | repair | src/components/command/CommandList.vue | — | — | BI.W-P008 |
| 144 | repair | src/components/command/CommandSeparator.vue | — | — | BI.W-P008 |
| 145 | repair | src/components/command/CommandShortcut.vue | — | — | BI.W-P008 |
| 146 | repair | src/components/command/index.ts | — | — | BI.W-P008 |
| 147 | repair | src/components/completion-seal/CompletionSeal.vue | — | — | BI.W-P008 |
| 148 | repair | src/components/completion-seal/composables/useCompletionSeal.ts | — | — | BI.W-P008 |
| 149 | repair | src/components/completion-seal/constants.ts | — | — | BI.W-P008 |
| 150 | repair | src/components/completion-seal/index.ts | — | — | BI.W-P008 |
| 151 | repair | src/components/configurator/Configurator.vue | — | — | BI.W-P008 |
| 152 | repair | src/components/configurator/ConfiguratorLayer.vue | — | — | BI.W-P008 |
| 153 | repair | src/components/configurator/ConfiguratorRow.vue | — | — | BI.W-P008 |
| 154 | repair | src/components/configurator/index.ts | — | — | BI.W-P008 |
| 155 | repair | src/components/configurator/size.ts | — | — | BI.W-P008 |
| 156 | repair | src/components/configurator/useConfiguratorState.ts | — | — | BI.W-P008 |
| 157 | repair | src/components/constellation/composables/constellationGLSetup.ts | — | — | BI.W-P008 |
| 158 | repair | src/components/constellation/composables/constellationWGPUSetup.ts | — | — | BI.W-P008 |
| 159 | repair | src/components/constellation/composables/createConstellationField.ts | — | — | BI.W-P008 |
| 160 | repair | src/components/constellation/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 161 | repair | src/components/constellation/composables/useConstellation.ts | — | — | BI.W-P008 |
| 162 | repair | src/components/constellation/constants.ts | — | — | BI.W-P008 |
| 163 | repair | src/components/constellation/Constellation.vue | — | — | BI.W-P008 |
| 164 | repair | src/components/constellation/constellationField.ts | — | — | BI.W-P008 |
| 165 | repair | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 166 | repair | src/components/constellation/constellationRender.ts | — | — | BI.W-P008 |
| 167 | repair | src/components/constellation/constellationTypes.ts | — | — | BI.W-P008 |
| 168 | repair | src/components/constellation/constellationWell.ts | — | — | BI.W-P008 |
| 169 | repair | src/components/constellation/index.ts | — | — | BI.W-P008 |
| 170 | repair | src/components/constellation/shaders/constellation-lines.glsl.ts | — | — | BI.W-P008 |
| 171 | repair | src/components/constellation/shaders/constellation-lines.wgsl.ts | — | — | BI.W-P008 |
| 172 | repair | src/components/constellation/shaders/constellation-points.glsl.ts | — | — | BI.W-P008 |
| 173 | repair | src/components/constellation/shaders/constellation-points.wgsl.ts | — | — | BI.W-P008 |
| 174 | repair | src/components/controls/DarkModeToggle.vue | — | — | BI.W-P008 |
| 175 | repair | src/components/controls/index.ts | — | — | BI.W-P008 |
| 176 | repair | src/components/data-table/composables/useDataTableResponsive.ts | — | — | BI.W-P008 |
| 177 | repair | src/components/data-table/composables/useDataTableRowIdentity.ts | — | — | BI.W-P008 |
| 178 | repair | src/components/data-table/DataTable.vue | — | — | BI.W-P008 |
| 179 | repair | src/components/data-table/DataTablePagination.vue | — | — | BI.W-P008 |
| 180 | repair | src/components/data-table/index.ts | — | — | BI.W-P008 |
| 181 | repair | src/components/data-table/types.ts | — | — | BI.W-P008 |
| 182 | repair | src/components/deck/composables/useDeck.ts | — | — | BI.W-P008 |
| 183 | repair | src/components/deck/composables/useDeckKeyboard.ts | — | — | BI.W-P008 |
| 184 | repair | src/components/deck/composables/useDeckSpring.ts | — | — | BI.W-P008 |
| 185 | repair | src/components/deck/constants.ts | — | — | BI.W-P008 |
| 186 | repair | src/components/deck/DeckPager.vue | — | — | BI.W-P008 |
| 187 | repair | src/components/deck/index.ts | — | — | BI.W-P008 |
| 188 | repair | src/components/dialog/Dialog.vue | — | — | BI.W-P008 |
| 189 | repair | src/components/dialog/DialogClose.vue | — | — | BI.W-P008 |
| 190 | repair | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 191 | repair | src/components/dialog/DialogDescription.vue | — | — | BI.W-P008 |
| 192 | repair | src/components/dialog/DialogFooter.vue | — | — | BI.W-P008 |
| 193 | repair | src/components/dialog/DialogHeader.vue | — | — | BI.W-P008 |
| 194 | repair | src/components/dialog/DialogScrollContent.vue | — | — | BI.W-P008 |
| 195 | repair | src/components/dialog/DialogTitle.vue | — | — | BI.W-P008 |
| 196 | repair | src/components/dialog/DialogTrigger.vue | — | — | BI.W-P008 |
| 197 | repair | src/components/dialog/index.ts | — | — | BI.W-P008 |
| 198 | repair | src/components/dock/composables/dockContext.ts | — | — | BI.W-P008 |
| 199 | repair | src/components/dock/composables/dockCrossfadeContext.ts | — | — | BI.W-P008 |
| 200 | repair | src/components/dock/composables/dockMorphContext.ts | — | — | BI.W-P008 |
| 201 | repair | src/components/dock/composables/dockMorphMeasure.ts | — | — | BI.W-P008 |
| 202 | repair | src/components/dock/composables/index.ts | — | — | BI.W-P008 |
| 203 | repair | src/components/dock/composables/isTeleportedTarget.ts | — | — | BI.W-P008 |
| 204 | repair | src/components/dock/composables/useDockClickIntegrity.ts | — | — | BI.W-P008 |
| 205 | repair | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 206 | repair | src/components/dock/composables/useDockHold.ts | — | — | BI.W-P008 |
| 207 | repair | src/components/dock/composables/useDockOverflowFit.ts | — | — | BI.W-P008 |
| 208 | repair | src/components/dock/composables/useDockPopover.ts | — | — | BI.W-P008 |
| 209 | repair | src/components/dock/composables/useDockSearch.ts | — | — | BI.W-P008 |
| 210 | repair | src/components/dock/composables/useDockShellProps.ts | — | — | BI.W-P008 |
| 211 | repair | src/components/dock/composables/useDockSpring.ts | — | — | BI.W-P008 |
| 212 | repair | src/components/dock/composables/useDockState.ts | — | — | BI.W-P008 |
| 213 | repair | src/components/dock/composables/useDockTouchGate.ts | — | — | BI.W-P008 |
| 214 | repair | src/components/dock/constants.ts | — | — | BI.W-P008 |
| 215 | repair | src/components/dock/DockBackgroundToggle.vue | — | — | BI.W-P008 |
| 216 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 217 | repair | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 218 | repair | src/components/dock/DockLayer.vue | — | — | BI.W-P008 |
| 219 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 220 | repair | src/components/dock/DockSection.vue | — | — | BI.W-P008 |
| 221 | repair | src/components/dock/DockSeparator.vue | — | — | BI.W-P008 |
| 222 | repair | src/components/dock/DockStack.vue | — | — | BI.W-P008 |
| 223 | repair | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 224 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 225 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 226 | repair | src/components/drawer/composables/drawerSnapContext.ts | — | — | BI.W-P008 |
| 227 | repair | src/components/drawer/composables/useDrawerSnap.ts | — | — | BI.W-P008 |
| 228 | repair | src/components/drawer/constants.ts | — | — | BI.W-P008 |
| 229 | repair | src/components/drawer/Drawer.vue | — | — | BI.W-P008 |
| 230 | repair | src/components/drawer/DrawerContent.vue | — | — | BI.W-P008 |
| 231 | repair | src/components/drawer/DrawerDescription.vue | — | — | BI.W-P008 |
| 232 | repair | src/components/drawer/DrawerFooter.vue | — | — | BI.W-P008 |
| 233 | repair | src/components/drawer/DrawerHeader.vue | — | — | BI.W-P008 |
| 234 | repair | src/components/drawer/DrawerOverlay.vue | — | — | BI.W-P008 |
| 235 | repair | src/components/drawer/DrawerTitle.vue | — | — | BI.W-P008 |
| 236 | repair | src/components/drawer/index.ts | — | — | BI.W-P008 |
| 237 | repair | src/components/dropdown-menu/DropdownMenu.vue | — | — | BI.W-P008 |
| 238 | repair | src/components/dropdown-menu/DropdownMenuCheckboxItem.vue | — | — | BI.W-P008 |
| 239 | repair | src/components/dropdown-menu/DropdownMenuContent.vue | — | — | BI.W-P008 |
| 240 | repair | src/components/dropdown-menu/DropdownMenuGroup.vue | — | — | BI.W-P008 |
| 241 | repair | src/components/dropdown-menu/DropdownMenuItem.vue | — | — | BI.W-P008 |
| 242 | repair | src/components/dropdown-menu/DropdownMenuLabel.vue | — | — | BI.W-P008 |
| 243 | repair | src/components/dropdown-menu/DropdownMenuRadioGroup.vue | — | — | BI.W-P008 |
| 244 | repair | src/components/dropdown-menu/DropdownMenuRadioItem.vue | — | — | BI.W-P008 |
| 245 | repair | src/components/dropdown-menu/DropdownMenuSeparator.vue | — | — | BI.W-P008 |
| 246 | repair | src/components/dropdown-menu/DropdownMenuShortcut.vue | — | — | BI.W-P008 |
| 247 | repair | src/components/dropdown-menu/DropdownMenuSub.vue | — | — | BI.W-P008 |
| 248 | repair | src/components/dropdown-menu/DropdownMenuSubContent.vue | — | — | BI.W-P008 |
| 249 | repair | src/components/dropdown-menu/DropdownMenuSubTrigger.vue | — | — | BI.W-P008 |
| 250 | repair | src/components/dropdown-menu/DropdownMenuTrigger.vue | — | — | BI.W-P008 |
| 251 | repair | src/components/dropdown-menu/index.ts | — | — | BI.W-P008 |
| 252 | repair | src/components/dropdown-menu/useMenuTrigger.ts | — | — | BI.W-P008 |
| 253 | repair | src/components/easing/composables/useEasingPicker.ts | — | — | BI.W-P008 |
| 254 | repair | src/components/easing/constants.ts | — | — | BI.W-P008 |
| 255 | repair | src/components/easing/EasingConfigurator.vue | — | — | BI.W-P008 |
| 256 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 257 | repair | src/components/easing/index.ts | — | — | BI.W-P008 |
| 258 | repair | src/components/expandable-container/ExpandableContainer.vue | — | — | BI.W-P008 |
| 259 | repair | src/components/expandable-container/index.ts | — | — | BI.W-P008 |
| 260 | repair | src/components/fading-scroll/composables/useFadingScroll.ts | — | — | BI.W-P008 |
| 261 | repair | src/components/fading-scroll/constants.ts | — | — | BI.W-P008 |
| 262 | repair | src/components/fading-scroll/FadingScroll.vue | — | — | BI.W-P008 |
| 263 | repair | src/components/fading-scroll/index.ts | — | — | BI.W-P008 |
| 264 | repair | src/components/focus-scope/FocusScope.vue | — | — | BI.W-P008 |
| 265 | repair | src/components/focus-scope/index.ts | — | — | BI.W-P008 |
| 266 | repair | src/components/fourier-field/composables/fourierFieldGLSetup.ts | — | — | BI.W-P008 |
| 267 | repair | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts | — | — | BI.W-P008 |
| 268 | repair | src/components/fourier-field/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 269 | repair | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 270 | repair | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 271 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 272 | repair | src/components/fourier-field/index.ts | — | — | BI.W-P008 |
| 273 | repair | src/components/fourier-field/math.ts | — | — | BI.W-P008 |
| 274 | repair | src/components/fourier-field/presets.ts | — | — | BI.W-P008 |
| 275 | repair | src/components/fourier-field/shaders/fourier-field.compute.wgsl.ts | — | — | BI.W-P008 |
| 276 | repair | src/components/fourier-field/shaders/fourier-field.glsl.ts | — | — | BI.W-P008 |
| 277 | repair | src/components/fourier-field/shaders/fourier-field.render.wgsl.ts | — | — | BI.W-P008 |
| 278 | repair | src/components/fourier-field/shaders/fourier-field.ribbon.ts | — | — | BI.W-P008 |
| 279 | repair | src/components/goo-filter/GooFilter.vue | — | — | BI.W-P008 |
| 280 | repair | src/components/goo-filter/index.ts | — | — | BI.W-P008 |
| 281 | repair | src/components/handmark/brush.ts | — | — | BI.W-P008 |
| 282 | repair | src/components/handmark/composables/useHandMark.ts | — | — | BI.W-P008 |
| 283 | repair | src/components/handmark/constants.ts | — | — | BI.W-P008 |
| 284 | repair | src/components/handmark/freehand.ts | — | — | BI.W-P008 |
| 285 | repair | src/components/handmark/geometry.ts | — | — | BI.W-P008 |
| 286 | repair | src/components/handmark/HandMark.vue | — | — | BI.W-P008 |
| 287 | repair | src/components/handmark/index.ts | — | — | BI.W-P008 |
| 288 | repair | src/components/handmark/ink.ts | — | — | BI.W-P008 |
| 289 | repair | src/components/handmark/noise.ts | — | — | BI.W-P008 |
| 290 | repair | src/components/handmark/texture.ts | — | — | BI.W-P008 |
| 291 | repair | src/components/handmark/types.ts | — | — | BI.W-P008 |
| 292 | repair | src/components/header-ribbon/HeaderRibbon.vue | — | — | BI.W-P008 |
| 293 | repair | src/components/header-ribbon/index.ts | — | — | BI.W-P008 |
| 294 | repair | src/components/header-ribbon/types.ts | — | — | BI.W-P008 |
| 295 | repair | src/components/icon-chip/IconChip.vue | — | — | BI.W-P008 |
| 296 | repair | src/components/icon-chip/index.ts | — | — | BI.W-P008 |
| 297 | repair | src/components/icon-chip/types.ts | — | — | BI.W-P008 |
| 298 | repair | src/components/icon-tooltip/IconTooltip.vue | — | — | BI.W-P008 |
| 299 | repair | src/components/icon-tooltip/index.ts | — | — | BI.W-P008 |
| 300 | repair | src/components/index.ts | — | — | BI.W-P008 |
| 301 | repair | src/components/infinite-scroll/composables/index.ts | — | — | BI.W-P008 |
| 302 | repair | src/components/infinite-scroll/composables/types.ts | — | — | BI.W-P008 |
| 303 | repair | src/components/infinite-scroll/composables/useInfiniteScroll.ts | — | — | BI.W-P008 |
| 304 | repair | src/components/infinite-scroll/index.ts | — | — | BI.W-P008 |
| 305 | repair | src/components/infinite-scroll/InfiniteScroll.vue | — | — | BI.W-P008 |
| 306 | repair | src/components/input/index.ts | — | — | BI.W-P008 |
| 307 | repair | src/components/input/Input.vue | — | — | BI.W-P008 |
| 308 | repair | src/components/instrument-chassis/ChassisDivider.vue | — | — | BI.W-P008 |
| 309 | repair | src/components/instrument-chassis/index.ts | — | — | BI.W-P008 |
| 310 | repair | src/components/instrument-chassis/InstrumentChassis.vue | — | — | BI.W-P008 |
| 311 | repair | src/components/label/index.ts | — | — | BI.W-P008 |
| 312 | repair | src/components/label/Label.vue | — | — | BI.W-P008 |
| 313 | repair | src/components/labeled-field/index.ts | — | — | BI.W-P008 |
| 314 | repair | src/components/labeled-field/LabeledField.vue | — | — | BI.W-P008 |
| 315 | repair | src/components/labeled-field/LabeledInput.vue | — | — | BI.W-P008 |
| 316 | repair | src/components/labeled-field/LabeledSelect.vue | — | — | BI.W-P008 |
| 317 | repair | src/components/labeled-field/LabeledSlider.vue | — | — | BI.W-P008 |
| 318 | repair | src/components/labeled-field/LabeledSwitch.vue | — | — | BI.W-P008 |
| 319 | repair | src/components/liquid-grid/composables/liquidGrid.ts | — | — | BI.W-P008 |
| 320 | repair | src/components/liquid-grid/composables/liquidGridGLSetup.ts | — | — | BI.W-P008 |
| 321 | repair | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts | — | — | BI.W-P008 |
| 322 | repair | src/components/liquid-grid/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 323 | repair | src/components/liquid-grid/composables/useLiquidGrid.ts | — | — | BI.W-P008 |
| 324 | repair | src/components/liquid-grid/constants.ts | — | — | BI.W-P008 |
| 325 | repair | src/components/liquid-grid/index.ts | — | — | BI.W-P008 |
| 326 | repair | src/components/liquid-grid/LiquidGrid.vue | — | — | BI.W-P008 |
| 327 | repair | src/components/liquid-grid/shaders/liquid-grid.glsl.ts | — | — | BI.W-P008 |
| 328 | repair | src/components/liquid-grid/shaders/liquid-grid.wgsl.ts | — | — | BI.W-P008 |
| 329 | repair | src/components/metric-badge/index.ts | — | — | BI.W-P008 |
| 330 | repair | src/components/metric-badge/MetricBadge.vue | — | — | BI.W-P008 |
| 331 | repair | src/components/metric-cell/index.ts | — | — | BI.W-P008 |
| 332 | repair | src/components/metric-cell/MetricCell.vue | — | — | BI.W-P008 |
| 333 | repair | src/components/metric-stack/index.ts | — | — | BI.W-P008 |
| 334 | repair | src/components/metric-stack/MetricRow.vue | — | — | BI.W-P008 |
| 335 | repair | src/components/metric-stack/MetricStack.vue | — | — | BI.W-P008 |
| 336 | repair | src/components/notification/index.ts | — | — | BI.W-P008 |
| 337 | repair | src/components/notification/Notification.vue | — | — | BI.W-P008 |
| 338 | repair | src/components/number-field/index.ts | — | — | BI.W-P008 |
| 339 | repair | src/components/number-field/NumberField.vue | — | — | BI.W-P008 |
| 340 | repair | src/components/number-field/NumberFieldContent.vue | — | — | BI.W-P008 |
| 341 | repair | src/components/number-field/NumberFieldDecrement.vue | — | — | BI.W-P008 |
| 342 | repair | src/components/number-field/NumberFieldIncrement.vue | — | — | BI.W-P008 |
| 343 | repair | src/components/number-field/NumberFieldInput.vue | — | — | BI.W-P008 |
| 344 | repair | src/components/pager-dots/composables/usePagerWorm.ts | — | — | BI.W-P008 |
| 345 | repair | src/components/pager-dots/constants.ts | — | — | BI.W-P008 |
| 346 | repair | src/components/pager-dots/index.ts | — | — | BI.W-P008 |
| 347 | repair | src/components/pager-dots/PagerDots.vue | — | — | BI.W-P008 |
| 348 | repair | src/components/pager-dots/pagerWindow.ts | — | — | BI.W-P008 |
| 349 | repair | src/components/paper-backdrop/index.ts | — | — | BI.W-P008 |
| 350 | repair | src/components/paper-backdrop/PaperBackdrop.vue | — | — | BI.W-P008 |
| 351 | repair | src/components/popover/index.ts | — | — | BI.W-P008 |
| 352 | repair | src/components/popover/Popover.vue | — | — | BI.W-P008 |
| 353 | repair | src/components/popover/PopoverContent.vue | — | — | BI.W-P008 |
| 354 | repair | src/components/popover/popoverContext.ts | — | — | BI.W-P008 |
| 355 | repair | src/components/popover/PopoverTrigger.vue | — | — | BI.W-P008 |
| 356 | repair | src/components/progress/index.ts | — | — | BI.W-P008 |
| 357 | repair | src/components/progress/Progress.vue | — | — | BI.W-P008 |
| 358 | repair | src/components/progress/ProgressDefault.vue | — | — | BI.W-P008 |
| 359 | repair | src/components/progress/ProgressGradient.vue | — | — | BI.W-P008 |
| 360 | repair | src/components/progress/ProgressLiquid.vue | — | — | BI.W-P008 |
| 361 | repair | src/components/progress/ProgressSectioned.vue | — | — | BI.W-P008 |
| 362 | repair | src/components/progress/useProgressGeometry.ts | — | — | BI.W-P008 |
| 363 | repair | src/components/pulse/index.ts | — | — | BI.W-P008 |
| 364 | repair | src/components/pulse/Pulse.vue | — | — | BI.W-P008 |
| 365 | repair | src/components/radio-group/index.ts | — | — | BI.W-P008 |
| 366 | repair | src/components/radio-group/RadioGroup.vue | — | — | BI.W-P008 |
| 367 | repair | src/components/radio-group/RadioGroupItem.vue | — | — | BI.W-P008 |
| 368 | repair | src/components/search/composables/fuzzySearchIndex.ts | — | — | BI.W-P008 |
| 369 | repair | src/components/search/composables/index.ts | — | — | BI.W-P008 |
| 370 | repair | src/components/search/composables/types.ts | — | — | BI.W-P008 |
| 371 | repair | src/components/search/composables/useFuzzySearch.ts | — | — | BI.W-P008 |
| 372 | repair | src/components/search/FuzzySearch.vue | — | — | BI.W-P008 |
| 373 | repair | src/components/search/index.ts | — | — | BI.W-P008 |
| 374 | repair | src/components/search/SearchBar.vue | — | — | BI.W-P008 |
| 375 | repair | src/components/search/searchVariants.ts | — | — | BI.W-P008 |
| 376 | repair | src/components/section/index.ts | — | — | BI.W-P008 |
| 377 | repair | src/components/section/Section.vue | — | — | BI.W-P008 |
| 378 | repair | src/components/select/index.ts | — | — | BI.W-P008 |
| 379 | repair | src/components/select/Select.vue | — | — | BI.W-P008 |
| 380 | repair | src/components/select/SelectContent.vue | — | — | BI.W-P008 |
| 381 | repair | src/components/select/SelectGroup.vue | — | — | BI.W-P008 |
| 382 | repair | src/components/select/SelectItem.vue | — | — | BI.W-P008 |
| 383 | repair | src/components/select/SelectLabel.vue | — | — | BI.W-P008 |
| 384 | repair | src/components/select/SelectScrollDownButton.vue | — | — | BI.W-P008 |
| 385 | repair | src/components/select/SelectScrollUpButton.vue | — | — | BI.W-P008 |
| 386 | repair | src/components/select/SelectSeparator.vue | — | — | BI.W-P008 |
| 387 | repair | src/components/select/SelectTrigger.vue | — | — | BI.W-P008 |
| 388 | repair | src/components/select/SelectValue.vue | — | — | BI.W-P008 |
| 389 | repair | src/components/separator/index.ts | — | — | BI.W-P008 |
| 390 | repair | src/components/separator/Separator.vue | — | — | BI.W-P008 |
| 391 | repair | src/components/skeleton/index.ts | — | — | BI.W-P008 |
| 392 | repair | src/components/skeleton/Skeleton.vue | — | — | BI.W-P008 |
| 393 | repair | src/components/slider/index.ts | — | — | BI.W-P008 |
| 394 | repair | src/components/slider/Slider.vue | — | — | BI.W-P008 |
| 395 | repair | src/components/sortable-list/composables/dragController.ts | — | — | BI.W-P007 |
| 396 | repair | src/components/sortable-list/composables/dropResolver.ts | — | — | BI.W-P007 |
| 397 | repair | src/components/sortable-list/composables/ghostRenderer.ts | — | — | BI.W-P007 |
| 398 | repair | src/components/sortable-list/composables/index.ts | — | — | BI.W-P007 |
| 399 | repair | src/components/sortable-list/composables/touchGate.ts | — | — | BI.W-P007 |
| 400 | repair | src/components/sortable-list/composables/transitionTiming.ts | — | — | BI.W-P007 |
| 401 | repair | src/components/sortable-list/composables/types.ts | — | — | BI.W-P007 |
| 402 | repair | src/components/sortable-list/composables/useSortable.ts | — | — | BI.W-P007 |
| 403 | repair | src/components/sortable-list/context.ts | — | — | BI.W-P007 |
| 404 | repair | src/components/sortable-list/index.ts | — | — | BI.W-P007 |
| 405 | repair | src/components/sortable-list/SortableHandle.vue | — | — | BI.W-P007 |
| 406 | repair | src/components/sortable-list/SortableItem.vue | — | — | BI.W-P007 |
| 407 | repair | src/components/sortable-list/SortableList.vue | — | — | BI.W-P007 |
| 408 | repair | src/components/spa-view/index.ts | — | — | BI.W-P008 |
| 409 | repair | src/components/spa-view/SpaView.vue | — | — | BI.W-P008 |
| 410 | repair | src/components/split-chars/index.ts | — | — | BI.W-P008 |
| 411 | repair | src/components/split-chars/SplitChars.vue | — | — | BI.W-P008 |
| 412 | repair | src/components/stacked-icons/index.ts | — | — | BI.W-P008 |
| 413 | repair | src/components/stacked-icons/StackedIconGroup.vue | — | — | BI.W-P008 |
| 414 | repair | src/components/stacked-icons/types.ts | — | — | BI.W-P008 |
| 415 | repair | src/components/status-dot/index.ts | — | — | BI.W-P008 |
| 416 | repair | src/components/status-dot/StatusDot.vue | — | — | BI.W-P008 |
| 417 | repair | src/components/surface/index.ts | — | — | BI.W-P008 |
| 418 | repair | src/components/surface/Surface.vue | — | — | BI.W-P008 |
| 419 | repair | src/components/switch/index.ts | — | — | BI.W-P008 |
| 420 | repair | src/components/switch/Switch.vue | — | — | BI.W-P008 |
| 421 | repair | src/components/table/index.ts | — | — | BI.W-P008 |
| 422 | repair | src/components/table/Table.vue | — | — | BI.W-P008 |
| 423 | repair | src/components/table/TableBody.vue | — | — | BI.W-P008 |
| 424 | repair | src/components/table/TableCaption.vue | — | — | BI.W-P008 |
| 425 | repair | src/components/table/TableCell.vue | — | — | BI.W-P008 |
| 426 | repair | src/components/table/TableEmpty.vue | — | — | BI.W-P008 |
| 427 | repair | src/components/table/TableHead.vue | — | — | BI.W-P008 |
| 428 | repair | src/components/table/TableHeader.vue | — | — | BI.W-P008 |
| 429 | repair | src/components/table/TableRow.vue | — | — | BI.W-P008 |
| 430 | repair | src/components/tabs/composables/useEyeglassLive.ts | — | — | BI.W-P008 |
| 431 | repair | src/components/tabs/composables/useTabDragMorph.ts | — | — | BI.W-P008 |
| 432 | repair | src/components/tabs/composables/useTabResponsive.ts | — | — | BI.W-P008 |
| 433 | repair | src/components/tabs/composables/useTabRovingFocus.ts | — | — | BI.W-P008 |
| 434 | repair | src/components/tabs/constants.ts | — | — | BI.W-P008 |
| 435 | repair | src/components/tabs/index.ts | — | — | BI.W-P008 |
| 436 | repair | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 437 | repair | src/components/tags-input/index.ts | — | — | BI.W-P008 |
| 438 | repair | src/components/tags-input/TagsInput.vue | — | — | BI.W-P008 |
| 439 | repair | src/components/tags-input/TagsInputInput.vue | — | — | BI.W-P008 |
| 440 | repair | src/components/tags-input/TagsInputItem.vue | — | — | BI.W-P008 |
| 441 | repair | src/components/tags-input/TagsInputItemDelete.vue | — | — | BI.W-P008 |
| 442 | repair | src/components/tags-input/TagsInputItemText.vue | — | — | BI.W-P008 |
| 443 | repair | src/components/textarea/index.ts | — | — | BI.W-P008 |
| 444 | repair | src/components/textarea/Textarea.vue | — | — | BI.W-P008 |
| 445 | repair | src/components/timeline/ContinuousMarkers.vue | — | — | BI.W-P008 |
| 446 | repair | src/components/timeline/ContinuousRail.vue | — | — | BI.W-P008 |
| 447 | repair | src/components/timeline/ContinuousTimeline.vue | — | — | BI.W-P008 |
| 448 | repair | src/components/timeline/geometry.ts | — | — | BI.W-P008 |
| 449 | repair | src/components/timeline/GlassTimeline.vue | — | — | BI.W-P008 |
| 450 | repair | src/components/timeline/index.ts | — | — | BI.W-P008 |
| 451 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 452 | repair | src/components/timeline/SegmentedTimeline.vue | — | — | BI.W-P008 |
| 453 | repair | src/components/timeline/types.ts | — | — | BI.W-P008 |
| 454 | repair | src/components/toast/index.ts | — | — | BI.W-P008 |
| 455 | repair | src/components/toast/Toast.vue | — | — | BI.W-P008 |
| 456 | repair | src/components/toast/ToastAction.vue | — | — | BI.W-P008 |
| 457 | repair | src/components/toast/ToastClose.vue | — | — | BI.W-P008 |
| 458 | repair | src/components/toast/ToastDescription.vue | — | — | BI.W-P008 |
| 459 | repair | src/components/toast/Toaster.vue | — | — | BI.W-P008 |
| 460 | repair | src/components/toast/ToastTitle.vue | — | — | BI.W-P008 |
| 461 | repair | src/components/toast/use-toast.ts | — | — | BI.W-P008 |
| 462 | repair | src/components/toggle-group/index.ts | — | — | BI.W-P008 |
| 463 | repair | src/components/toggle-group/ToggleGroup.vue | — | — | BI.W-P008 |
| 464 | repair | src/components/toggle-group/toggleGroupContext.ts | — | — | BI.W-P008 |
| 465 | repair | src/components/toggle-group/ToggleGroupItem.vue | — | — | BI.W-P008 |
| 466 | repair | src/components/toggle/index.ts | — | — | BI.W-P008 |
| 467 | repair | src/components/toggle/Toggle.vue | — | — | BI.W-P008 |
| 468 | repair | src/components/tooltip/index.ts | — | — | BI.W-P008 |
| 469 | repair | src/components/tooltip/Tooltip.vue | — | — | BI.W-P008 |
| 470 | repair | src/components/tooltip/TooltipContent.vue | — | — | BI.W-P008 |
| 471 | repair | src/components/tooltip/TooltipProvider.vue | — | — | BI.W-P008 |
| 472 | repair | src/components/tooltip/TooltipTrigger.vue | — | — | BI.W-P008 |
| 473 | repair | src/components/typewriter/composables/index.ts | — | — | BI.W-P008 |
| 474 | repair | src/components/typewriter/composables/useTypewriter.ts | — | — | BI.W-P008 |
| 475 | repair | src/components/typewriter/index.ts | — | — | BI.W-P008 |
| 476 | repair | src/components/typewriter/types.ts | — | — | BI.W-P008 |
| 477 | repair | src/components/typewriter/TypewriterText.vue | — | — | BI.W-P008 |
| 478 | repair | src/components/typewriter/utils/keyboard.ts | — | — | BI.W-P008 |
| 479 | repair | src/components/typewriter/utils/pausePatterns.ts | — | — | BI.W-P008 |
| 480 | repair | src/components/typewriter/utils/timing.ts | — | — | BI.W-P008 |
| 481 | repair | src/components/typewriter/utils/typoStateMachine.ts | — | — | BI.W-P008 |
| 482 | repair | src/components/watercolor-dot/index.ts | — | — | BI.W-P008 |
| 483 | repair | src/components/watercolor-dot/prng.ts | — | — | BI.W-P008 |
| 484 | repair | src/components/watercolor-dot/useWatercolorBlob.ts | — | — | BI.W-P008 |
| 485 | repair | src/components/watercolor-dot/WatercolorDot.vue | — | — | BI.W-P008 |
| 486 | repair | src/composables/color/accent-tone-solve.ts | — | d79c1758322bb095bb231703b724e1ca43aceb26 | source base |
| 487 | repair | src/composables/color/index.ts | — | 50c3688ba72f56ad962941f88e3535a161827a10 | source base |
| 488 | repair | src/composables/color/spectrum-walk.ts | — | cfd59489e0d18b9bff928e69de4e6edb0cdaa026 | source base |
| 489 | repair | src/composables/color/useAccentTone.ts | — | 6fb5b033fd4763223fae17425331dae3c302c5dd | source base |
| 490 | repair | src/composables/context/createContext.ts | — | ec0a54b52bab69e9904fec8a36fe9504df79b2df | source base |
| 491 | repair | src/composables/context/index.ts | — | 34c264e4f0279b5ef1fa47ddbcbed62535895f56 | source base |
| 492 | repair | src/composables/dark/darkModeSyncScript.ts | — | 06a2c238edc09bacf7200085fa0f1d4f106991f1 | source base |
| 493 | repair | src/composables/dark/index.ts | — | a59b74e6de4b8e52b91969030ba667dfb19706db | source base |
| 494 | repair | src/composables/dark/installDarkModeSync.ts | — | c33b9e18f0cc714b2075a1a80b486c6ff8057817 | source base |
| 495 | repair | src/composables/dark/useGlobalDark.ts | — | 95526044fece57bd864c13cf97082330604d706d | source base |
| 496 | repair | src/composables/dom/index.ts | — | 6373a9d811282817966f2ec6c7eb2432d757e0eb | source base |
| 497 | repair | src/composables/dom/useBreakpoint.ts | — | 4bdab7c3e276a49f64efb9955fbd710bfe6d2d9c | source base |
| 498 | repair | src/composables/dom/useClipboard.ts | — | 42e0fa18328e9c85123bf40faf94692a2368b859 | source base |
| 499 | repair | src/composables/dom/useDocumentVisibility.ts | — | 4df07abe9a6e339a1d19a4564074eff5dccdf3e3 | source base |
| 500 | repair | src/composables/dom/useDragVelocity.ts | — | fae0e47276b1f15a8bef19271c829ff93bb98623 | source base |
| 501 | repair | src/composables/dom/useIdleReady.ts | — | a961ccf4530045be786c84742587ea3d7056ce7b | source base |
| 502 | repair | src/composables/dom/useResizeObserver.ts | — | 5d2737df433400a04a54348547c58f491cad69fb | source base |
| 503 | repair | src/composables/dom/useResolveTokenColor.ts | — | 07f5e36ba049bbcb2fb12634bd6e5b70f6f2e455 | source base |
| 504 | repair | src/composables/dom/useTokenColor.ts | — | 88b514b81e6091e46ef8cb0c11c5f6f458c4ce6e | source base |
| 505 | repair | src/composables/dom/useTouchGate.ts | — | 756e97f3f49c1512ec8d339dd47a9054c28de047 | source base |
| 506 | repair | src/composables/dom/useUserInvalidAria.ts | — | 09f551e245747f955595daf64d799e972e7fec79 | source base |
| 507 | repair | src/composables/dom/useViewportReady.ts | — | e44411dc9238514267771ed9553a5fb22ef28897 | source base |
| 508 | repair | src/composables/glass/ambientHueHistogram.ts | — | 92c767ec8f3d6a6d1fd29353045c0b4645454bad | source base |
| 509 | repair | src/composables/glass/backdropLuminanceSample.ts | — | 3e327f311faa8ab53681165e7cd7cf063b20c85f | source base |
| 510 | repair | src/composables/glass/backdropSampleMath.ts | — | 57497e2e22cf378119e40e34e5e8486dae16273a | source base |
| 511 | repair | src/composables/glass/canvas2d/index.ts | — | 3a9f176bdce15830981142fb9d5983049d2dd586 | source base |
| 512 | repair | src/composables/glass/canvas2d/resolveCanvasColor.ts | — | fb5d2f75f7502a2b0d894cb2f10f9d7087730494 | source base |
| 513 | repair | src/composables/glass/canvas2d/useCanvas2D.ts | — | e98f4246dd0f00c6c23253f1d5c5984f7f763268 | source base |
| 514 | repair | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 515 | repair | src/composables/glass/textureUpload.ts | — | 80f8f00f172e879ce04bf77158fa121e38c850b0 | source base |
| 516 | repair | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 517 | repair | src/composables/glass/useSpecularPointer.ts | — | a14019910975a5f28ca4736dd97dd42934fc9fd4 | source base |
| 518 | repair | src/composables/glass/useSpecularTracking.ts | — | 01f066c30062bdccb6583061e728dd45d8e60fd2 | source base |
| 519 | repair | src/composables/glass/vSpecular.ts | — | 85cb68a2334703507752c2998feda36dfcc4d56c | source base |
| 520 | repair | src/composables/glass/wave/index.ts | — | 47484c4b2688c5145533f591197ea8af715f5a5e | source base |
| 521 | repair | src/composables/glass/wave/waveField.glsl.ts | — | b409baa3b516ac90df3a9feb373b8704e09a75fd | source base |
| 522 | repair | src/composables/glass/wave/waveField.ts | — | 70fce50e2348af11b3526e787ff315ba11f62c4d | source base |
| 523 | repair | src/composables/glass/wave/waveField.wgsl.ts | — | 424e60e92d462f673fec790f40de4c53d90b170d | source base |
| 524 | repair | src/composables/glass/webgl/backingSize.ts | — | 5557af8fc5431c60e4453480f936a4ea83eec949 | source base |
| 525 | repair | src/composables/glass/webgl/compile.ts | — | 586ddefdf8c953c21fce4907510b6b6966085c2d | source base |
| 526 | repair | src/composables/glass/webgl/createCanvasLifecycle.ts | — | 06a2ae83fe8309bf7d42335488a689e99de43903 | source base |
| 527 | repair | src/composables/glass/webgl/shaders/flow.glsl.ts | — | 6d5ba6b66d453b21e6a1945b6cbfa560b584b5d8 | source base |
| 528 | repair | src/composables/glass/webgl/shaders/flow.wgsl.ts | — | 316a8152fca9a183a566965e606091ab2a2298fa | source base |
| 529 | repair | src/composables/glass/webgl/shaders/glass-refract.glsl.ts | — | 661d6430f6e1166d0e053e652ecbd84b0c1c101d | source base |
| 530 | repair | src/composables/glass/webgl/shaders/procedural-color.glsl.ts | — | b69cec45a95d498d3d03eedc580b4870f6e699a6 | source base |
| 531 | repair | src/composables/glass/webgl/useWebGLCanvas.ts | — | e6614e08dfb2a5104afe33eb07a0046fc0b62777 | source base |
| 532 | repair | src/composables/glass/webgl/visibility.ts | — | b1f5e5fd6a2beaed657031ecf6af40793a05feae | source base |
| 533 | repair | src/composables/glass/webgpu/index.ts | — | ba02680ea91177d79964fa2a96875ecfd10d2422 | source base |
| 534 | repair | src/composables/glass/webgpu/useGpuSubstrate.ts | — | 50e6d5e382d5ad774377c3277ad666b5424fcbcd | source base |
| 535 | repair | src/composables/glass/webgpu/useWebGPUCanvas.ts | — | 44b6d570e621c80f2bf4f4fb319ff9ccdd15e06a | source base |
| 536 | repair | src/composables/glass/webgpu/webgpuCanvasTypes.ts | — | 59c057ee8e4197be8f2b30945e1ee4c4d9d372ab | source base |
| 537 | repair | src/composables/glass/webgpu/webgpuDevice.ts | — | 1acf4002bb1ac6b8263cb858b7ba6ec3dd11a719 | source base |
| 538 | repair | src/composables/index.ts | — | 36c594feac670ff7cd7afd700aa6d8e90c4860ac | source base |
| 539 | repair | src/composables/keyboard/index.ts | — | f3ccb2a6111e6ce6f770ec1dd1298750ae70edb6 | source base |
| 540 | repair | src/composables/keyboard/useKeyboardShortcuts.ts | — | 5147dfd788e4fbb9ceaad38d508a78a4fae1516e | source base |
| 541 | repair | src/composables/motion/bloomUpField.ts | — | c11a3d98e030f0918bc09b6b9d23c37e48b1c8cc | source base |
| 542 | repair | src/composables/motion/constants.ts | — | d5d04eb8a4a2cc03d98759dc7ef8a78630bb7f9f | source base |
| 543 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 544 | repair | src/composables/motion/core/writeVelocityWeight.ts | — | c6987e46bad64074b4b21c491179a4441e7f5515 | source base |
| 545 | repair | src/composables/motion/curves.ts | — | d0823817eb3a97512ec410c48f410ab0c580424c | source base |
| 546 | repair | src/composables/motion/gooBarbellGeometry.ts | — | 2058899e104cb7b0f3f06dad41754b3e80190207 | source base |
| 547 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 548 | repair | src/composables/motion/morphSignatures.ts | — | bd3085c3ef919f8c00d14bce0033b8ab157f40ee | source base |
| 549 | repair | src/composables/motion/motionTempo.ts | — | 6b3b8c742162eb4899be3b77df6d382ba9c3112b | source base |
| 550 | repair | src/composables/motion/pointerFieldMappings.ts | — | 4109208b147c0823e39f31324e7b5c6ea5e9ecd6 | source base |
| 551 | repair | src/composables/motion/scrollReader.ts | — | 6efbc1b4b32516b9571c63c59a0ca5694972243b | source base |
| 552 | repair | src/composables/motion/springPresets.ts | — | 67c33531dbed67a2b7a172d16bf8213812f0a37c | source base |
| 553 | repair | src/composables/motion/suite.ts | — | 22525bab8bf45908aa8de473883143bb9b95883f | source base |
| 554 | repair | src/composables/motion/supportsCssTimeline.ts | — | 139436181337b0d91ad356e4cc4ceee49689778a | source base |
| 555 | repair | src/composables/motion/useAnimatedNumber.ts | — | bf3aa656ce11684a2d7ce3d908d19dc741205b6d | source base |
| 556 | repair | src/composables/motion/useAnimatedNumberMap.ts | — | d15b91398f8b8ebf0a00f87fcf9e2a8b6a5f3466 | source base |
| 557 | repair | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 558 | repair | src/composables/motion/useCharStagger.ts | — | 5238e20760401b503b13535e0330939fd742b94c | source base |
| 559 | repair | src/composables/motion/useCountup.ts | — | 8fced7e9e5bf95d85cf2dae69fb748b45baae53e | source base |
| 560 | repair | src/composables/motion/useDockCtaReceive.ts | — | 9ad016d7a426f05133188f346ca18a26f38d1323 | source base |
| 561 | repair | src/composables/motion/useDragMorph.ts | — | f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f | source base |
| 562 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 563 | repair | src/composables/motion/useGooMorph.ts | — | bca98104d3b8c2a7fdf9071358b71d65b00bc5ae | source base |
| 564 | repair | src/composables/motion/useIntersectionPause.ts | — | 2c5da0c7f0d46678ecd11ab31690e2d838755fa1 | source base |
| 565 | repair | src/composables/motion/useLeadTrail.ts | — | 492e6149e8cb5146cf2ae8ba00ef2988117a755f | source base |
| 566 | repair | src/composables/motion/useLiquidFlex.ts | — | e3f6ca86fc2d8edf5df8f6989d424da6697fb512 | source base |
| 567 | repair | src/composables/motion/useLiquidPress.ts | — | 986bc0ac1dbe15a0e2f9c5833c1036fedc797606 | source base |
| 568 | repair | src/composables/motion/useLiquidReveal.ts | — | e0b07d8def7b5a2bb383845f1f96ceee663729f8 | source base |
| 569 | repair | src/composables/motion/useNumericTransition.ts | — | 3b0f52060d5c8e78c5e6a697e51412794d89e27b | source base |
| 570 | repair | src/composables/motion/usePointerVelocityField.ts | — | 48ff6c9563de5797f7431f2c4bb542a3360673d9 | source base |
| 571 | repair | src/composables/motion/usePrioritizedTask.ts | — | da55faaa1e432f14b6884e701b56e14048059c85 | source base |
| 572 | repair | src/composables/motion/useRAFLoop.ts | — | b78fb56ea89699694dcbb65debf3ec2233f2e4a7 | source base |
| 573 | repair | src/composables/motion/useRoutePointer.ts | — | 5ce142b544148877b2cba149f1c700b6e615d226 | source base |
| 574 | repair | src/composables/motion/useScrollChrome.ts | — | eaa32a4fb96d0fc0b281cc6e4b6128c6b0f55613 | source base |
| 575 | repair | src/composables/motion/useScrollPin.ts | — | 94e393c719f9ec5328448481276e86641a078abb | source base |
| 576 | repair | src/composables/motion/useScrollProgress.ts | — | 3e9b7b012db55b46012ad728d943caf900e46a75 | source base |
| 577 | repair | src/composables/motion/useScrollScene.ts | — | 44a929c513b92f9a030b28c6cc71a7bbff6ff3ee | source base |
| 578 | repair | src/composables/motion/useScrollTrigger.ts | — | 0d05d75097f9e31d32c603032cf6efb0e5f4142e | source base |
| 579 | repair | src/composables/motion/useSelectionGroup.ts | — | 0808a63f3719c2196de1be3ee39738e46afa1049 | source base |
| 580 | repair | src/composables/motion/useSelectionIndicator.ts | — | ddcb73a970cab55abe52d4a0dee65e06c2185ebc | source base |
| 581 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 582 | repair | src/composables/motion/useSpringMount.ts | — | 4a62de1fc2d424cc31dd6d4c60899e914fa25d86 | source base |
| 583 | repair | src/composables/motion/useSpringPress.ts | — | a44c23fe34aaa42bbf30f35f882925b501bc05a3 | source base |
| 584 | repair | src/composables/motion/useStagger.ts | — | 5a2264e076653ab79c9d47d9e5b04ea1daf32ba8 | source base |
| 585 | repair | src/composables/motion/useStaggerReveal.ts | — | 270369b8d5817855df8c2a6bcb1a0c058ecd84ac | source base |
| 586 | repair | src/composables/motion/useTextHighlight.ts | — | 1390473cd2bb08819c71a25aa8306e5696976451 | source base |
| 587 | repair | src/composables/motion/useViewTransition.ts | — | e0dea38a9178c18a1396f946a7fdd04310c098f8 | source base |
| 588 | repair | src/composables/motion/useYieldToMain.ts | — | 40d547368a6e3eb57e6a0d4a14e54ba5c944c507 | source base |
| 589 | repair | src/composables/motion/vReveal.ts | — | 9055a6874d3280a81c505fe170063701c666d49b | source base |
| 590 | repair | src/composables/reactive/index.ts | — | b6b231f978db6f87bafaf97493d2995dd86e39a8 | source base |
| 591 | repair | src/composables/reactive/useInterval.ts | — | 5814b43b5b020c45b4519bc2a61aad7e48b40e35 | source base |
| 592 | repair | src/composables/reactive/useTimer.ts | — | 30b9fc2b0078a483ac77e0b5e219ad94c79b5c7b | source base |
| 593 | repair | src/composables/sidebar/index.ts | — | c2ed3d3f6431dcba004147da0b08993e35ad9c66 | source base |
| 594 | repair | src/composables/sidebar/types.ts | — | 076ce0e32d9aa67ffcd92a081d1262a507b3ceba | source base |
| 595 | repair | src/composables/sidebar/useClickDelegate.ts | — | eee36f2f0cd83ddd6d278ffa875ad32a4226d9d4 | source base |
| 596 | repair | src/composables/sidebar/useLazyLoader.ts | — | f5730e3151667465d5626c0082495c37b22b0a1f | source base |
| 597 | repair | src/composables/sidebar/useScrollTo.ts | — | d4c987073e0a1eac215bb3fba89078aef671eafb | source base |
| 598 | repair | src/composables/sidebar/useScrollTracker.ts | — | 326d8c871c6ff733f4888b60fa985ddd4f0d910a | source base |
| 599 | repair | src/composables/sidebar/useSidebarFollow.ts | — | 1ee7fd89620aaf9854875c2f9de8c1345f9d090c | source base |
| 600 | repair | src/composables/sidebar/useSidebarState.ts | — | f33701e87940228c00f1611154b03bdc52fe8825 | source base |
| 601 | repair | src/composables/sidebar/useTreeIndex.ts | — | 4aa738681d545cd3f9c135601c58dddc5e3415c6 | source base |
| 602 | repair | src/composables/virtual/index.ts | — | da20fb9d9abb350bb85a16c543104200c7484a77 | source base |
| 603 | repair | src/composables/virtual/useVirtualSectionWindow.ts | — | e287ce517d483df6ea5d21e7fd8dc15d84a5c1d7 | source base |
| 604 | repair | src/composables/virtual/useWindowedStore.ts | — | bcda77d442625662210fa2a857e6380e4ca83577 | source base |
| 605 | repair | src/composables/virtual/virtualSectionLayout.ts | — | 531c96d53f5de9e00c9399aeef8d26df72d7144d | source base |
| 606 | repair | src/forms.ts | — | 4955d3c3fa9784e7f0b13fb446b61b70a53fa14f | source base |
| 607 | repair | src/html-attributes.d.ts | — | a33346edb04d9a0ac20b477b428e635e2e1c4f8a | source base |
| 608 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 609 | repair | src/styles/animations.css | — | 74791f2e0ed4e8b8d56c717f2da2180dc3952c56 | source base |
| 610 | repair | src/styles/border-progress.css | — | 2f43dde09504bcecb92655b8950e2315b10680ef | source base |
| 611 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 612 | repair | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 613 | repair | src/styles/completion-seal.css | — | 60491778dc7fdc68bf7ce95a976c8633d3022adb | source base |
| 614 | repair | src/styles/configurator.css | — | 251d50ff9b2ec84111ce2949a0fe6e53190f73ad | source base |
| 615 | repair | src/styles/dialog-placement.css | — | d10e5955e001e14191a66ed87018442c54d2ee46 | source base |
| 616 | repair | src/styles/dock-controls.css | — | 892dba3b514be6bd6b8aa3b12028ae16f5035886 | source base |
| 617 | repair | src/styles/dock-controls/dark-mode-toggle.css | — | 5fbc619e31c5f3b4da06579263f621a286135f50 | source base |
| 618 | repair | src/styles/dock-controls/icon-button.css | — | 0f9126bd8a22b598c79046410fd83f64f02ec3a0 | source base |
| 619 | repair | src/styles/dock-controls/tab-button.css | — | 912bace2d0d359b7570080fa08ba524cfbb42f4d | source base |
| 620 | repair | src/styles/dock-controls/touch-floor.css | — | d9eb7500b2008e86ade95a8d61fe255993b1722c | source base |
| 621 | repair | src/styles/dock-controls/triggers.css | — | 07a870beb2ac348343c7309203adef7d43abdded | source base |
| 622 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 623 | repair | src/styles/dock/adaptive-legibility.css | — | f4854e66920f232e6eb9fd5176b89a732148399f | source base |
| 624 | repair | src/styles/dock/crossfade.css | — | 5ba361dc5303a4414d4c6e92baa61328f063bbb7 | source base |
| 625 | repair | src/styles/dock/cta-seat.css | — | c19816efff5f556f112a4091e9e784d57c3902e8 | source base |
| 626 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 627 | repair | src/styles/dock/dock.css | — | 83e358cc6e6d382a9c84f136972fe522470ea11c | source base |
| 628 | repair | src/styles/dock/fisheye.css | — | 1c346c4a7948f3d6da886ad7d50161160489f785 | source base |
| 629 | repair | src/styles/dock/layer-group.css | — | 9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd | source base |
| 630 | repair | src/styles/dock/layers.css | — | 0c915d1d614a7b450020ba281acc18e798898d86 | source base |
| 631 | repair | src/styles/dock/morph.css | — | 66e6c079aded40032cd2da310ca8284a592f3ec1 | source base |
| 632 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 633 | repair | src/styles/dock/popover.css | — | 5f9899bc157e13c39c460008bba052ba38bc5b78 | source base |
| 634 | repair | src/styles/dock/search.css | — | e2d2658c4119e5d6ea65fbc95480d9b95b49581c | source base |
| 635 | repair | src/styles/dock/section.css | — | 381e3ffae1d08c0bdd4664d78fcd493043bff14c | source base |
| 636 | repair | src/styles/dock/shape.css | — | 373e9d2f02d923d0c802de9059d50cc4e5f03e70 | source base |
| 637 | repair | src/styles/dock/shell-regions.css | — | e722ea40759f97036887c2e63a4b517858551609 | source base |
| 638 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 639 | repair | src/styles/draw-in.css | — | 1f845c43cfd1beec3a9fa7177857ff81cf29c704 | source base |
| 640 | repair | src/styles/drawer.css | — | 9c49e90f5591f31b54bd511eb161f4dada359928 | source base |
| 641 | repair | src/styles/feedback-tone.css | — | e90895f604c82965e689083aaa08e7dcb1d1642b | source base |
| 642 | repair | src/styles/fonts.css | — | 65e7cb7241aa36ca5262ff61fc6b6c2410871ead | source base |
| 643 | repair | src/styles/glass-refract.css | — | 503b21d79f89d34f6c624bf43c6f9bfdd463243c | source base |
| 644 | repair | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 645 | repair | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 646 | repair | src/styles/glass/a11y-fallback.css | — | c6bf39491d993644c8abeff837db5ace5225ca79 | source base |
| 647 | repair | src/styles/glass/accent-tone.css | — | a3b375be285ae44c17e16087551f1d36eec3ea36 | source base |
| 648 | repair | src/styles/glass/control-surfaces.css | — | 2db5c477d919ee795d0a5b7d212cf39f835fdb85 | source base |
| 649 | repair | src/styles/glass/deep.css | — | 83468cc7580027c2481ccb9193360e7fe6949a50 | source base |
| 650 | repair | src/styles/glass/defined.css | — | d8cd8460f4965fe1b3736a457aa4fa8b23e1fdbe | source base |
| 651 | repair | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 652 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 653 | repair | src/styles/glass/glass-chip.css | — | 78c37cea99d056fcfd8ed0219a094325645f9c53 | source base |
| 654 | repair | src/styles/glass/grain-overlay.css | — | a6ccc7a3f69f9be0f9de15e254eb6016611c9df5 | source base |
| 655 | repair | src/styles/glass/ladder-undershadow.css | — | a00d643179a4abec099edc5178ca5d71d173b7a1 | source base |
| 656 | repair | src/styles/glass/ladder.css | — | 2b65407c1d361a0edfcde6703c4734dabbc020db | source base |
| 657 | repair | src/styles/glass/liquid-enter.css | — | 49d182d37feebca6ab412a037bdd221eea71146f | source base |
| 658 | repair | src/styles/glass/liquid-fill.css | — | a87e87acb1f208806d94d4aacbff2cf845e1285c | source base |
| 659 | repair | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 660 | repair | src/styles/glass/progress-rail.css | — | 02f64c4cb98bf7667c4151a0d7012a5eb5c6d34f | source base |
| 661 | repair | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 662 | repair | src/styles/glass/rim.css | — | 7bc5038ea6041aa7421ca3e35a8a11db0ca38e55 | source base |
| 663 | repair | src/styles/glass/squircle.css | — | 569730e4a98a6a49e40c590bb553e063b4509cea | source base |
| 664 | repair | src/styles/glass/surface-axis.css | — | 5570ec55144da937de524b9808652227af827dfb | source base |
| 665 | repair | src/styles/glass/surfaces-pager.css | — | 2b9ec169731026dbe41123f3ad1b8337e214a3d9 | source base |
| 666 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 667 | repair | src/styles/icon-chip.css | — | 207ddee8a8c3bd4ca7446defb9cb7288e63f0148 | source base |
| 668 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 669 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 670 | repair | src/styles/menu.css | — | b857356e839255ecff703eb38e8368445e7c8598 | source base |
| 671 | repair | src/styles/paper.css | — | 0c18d49faaaa9d6c98b8f1195f876c14c961d3d0 | source base |
| 672 | repair | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 673 | repair | src/styles/scroll-chrome.css | — | 3b175f8939c22a00c6ea0bbc298e34ac6b3d7273 | source base |
| 674 | repair | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 675 | repair | src/styles/segmented-tabs.css | — | 3139afb08242087d5b853acc54713acda9fd18c0 | source base |
| 676 | repair | src/styles/select.css | — | 4d78552ece9bcaa1a500ef9b2c7db80a4500ef47 | source base |
| 677 | repair | src/styles/tabs/segmented-tabs-drag.css | — | 6c50427c9d299238b4ab086ffdf977820d31a9b8 | source base |
| 678 | repair | src/styles/theme.css | — | 7f77e670edffad3948c77f89e58d4a6d5769f91a | source base |
| 679 | repair | src/styles/theme/bridges.css | — | 3ba96c25d80207be2c068037f267cce934835997 | source base |
| 680 | repair | src/styles/theme/dark.css | — | a97560933c093ca5248ff5db982b9c376e64cd27 | source base |
| 681 | repair | src/styles/theme/literals.css | — | 552cab919166035c740c3bcd92d40fbd471c49f5 | source base |
| 682 | repair | src/styles/theme/radius.css | — | cb3901257cbeeec78182199bdf7abc145b655132 | source base |
| 683 | modify | src/styles/tokens.css | — | 5194cd72e66628a48dda4b45c447a723893b86bf | source base |
| 684 | repair | src/styles/tokens.ts | — | — | BI.W-P009 |
| 685 | modify | src/styles/tokens/color-radius.css | — | 39abb72a24aa29eeac358f0a2c2cc3eee480aea9 | source base |
| 686 | modify | src/styles/tokens/dark-arm-glass.css | — | 4b471daf200330334464e24865631dc9ba0be2d2 | source base |
| 687 | modify | src/styles/tokens/dark-arm.css | — | e776b8ded03aeadd57fc3ceea0c86f06dc2dd7e4 | source base |
| 688 | modify | src/styles/tokens/glass-deep.css | — | cf405ca85c204eb146687458a86559fa0385f352 | source base |
| 689 | modify | src/styles/tokens/glass-fx.css | — | e20e236bcd7b013bc41ecd3ca45e77fdbbd17edb | source base |
| 690 | modify | src/styles/tokens/glass.css | — | 5c09fd47c15544fb9e5d89202f0ef99c48208e1f | source base |
| 691 | modify | src/styles/tokens/light-dark.css | — | b23e6baa9e9e4bfb44c26a0cf41c634823b228df | source base |
| 692 | create | src/styles/tokens/manifest.ts | — | — | source base |
| 693 | modify | src/styles/tokens/motion-registers.css | — | 1da1345f11e6ae0fff495540ae9a2b5ef574997a | source base |
| 694 | modify | src/styles/tokens/offsets.css | — | 4f42a96aa25112af9b9ffe57b998a156a777cd6b | source base |
| 695 | modify | src/styles/tokens/on-glass-fg.css | — | ba1782dbf7bde52725a3219a332676f49e4e78a6 | source base |
| 696 | modify | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 697 | modify | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 698 | modify | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 699 | modify | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 700 | modify | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 701 | modify | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 702 | modify | src/styles/tokens/shadow.css | — | 021c5321af39c05176a8f697d08ac3678a42902a | source base |
| 703 | modify | src/styles/tokens/sizing-config.css | — | 13f28e1a3345829223193904a38c3bf49be904e2 | source base |
| 704 | modify | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 705 | repair | src/styles/transitions.css | — | ff60e1b4e192a5ecb06479f9582c5e52bbf15c63 | source base |
| 706 | repair | src/styles/typography.css | — | 78204d4626f1bbe7cb1490184fad019d5c4d7de8 | source base |
| 707 | repair | src/styles/typography/scale.css | — | 60aa59d15c74d55f0a814760d77ca624960a6f0b | source base |
| 708 | repair | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 709 | repair | src/styles/typography/utilities.css | — | 4415aa88142764007bb0e7fa998be59d5ea0cfb4 | source base |
| 710 | repair | src/styles/utilities.css | — | 1de6b90c29c15fcba50c8595cd2932f37f80d7b6 | source base |
| 711 | repair | src/styles/utilities/a11y-overrides.css | — | dd89b1d7c21f30807080f0627cac012698b3ce9c | source base |
| 712 | repair | src/styles/utilities/animate.css | — | 0c6a4aa2a584c1732b9c3c512f79d9901ef479ac | source base |
| 713 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 714 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 715 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 716 | repair | src/styles/utilities/components.css | — | 79fdb388d65dbd43fc11a706d0ec7b0a9909445d | source base |
| 717 | repair | src/styles/utilities/metal.css | — | da9b6ae944b06e610269fc568f41201ee1c67da6 | source base |
| 718 | repair | src/styles/view-transition.css | — | fc0af7fbfd5ad5dbf2d76576f7a4409e8207adbf | source base |
| 719 | repair | src/styles/viz-reveal.css | — | 50809db823fb350416cdccd1dcdea63c98e7c52e | source base |
| 720 | create | tests/styles/token-graph.test.ts | — | — | source base |
| 721 | repair | vite.style-assets.ts | — | 8a08d092e864493af96512904b3f41d661bb45a9 | source base |

## Repair manifest (721)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/_shared/ModalOverlay.vue |
| imports | 2 | src/components/_shared/axes.ts |
| imports | 3 | src/components/_shared/index.ts |
| imports | 4 | src/components/_shared/menuItemVariants.ts |
| imports | 5 | src/components/_shared/useControlSize.ts |
| imports | 6 | src/components/_shared/useMotionAxis.ts |
| imports | 7 | src/components/_shared/useStalePropWarning.ts |
| imports | 8 | src/components/_shared/useSurfaceAxis.ts |
| imports | 9 | src/components/accordion/Accordion.vue |
| imports | 10 | src/components/accordion/AccordionContent.vue |
| imports | 11 | src/components/accordion/AccordionItem.vue |
| imports | 12 | src/components/accordion/AccordionTrigger.vue |
| imports | 13 | src/components/accordion/index.ts |
| imports | 14 | src/components/alert/Alert.vue |
| imports | 15 | src/components/alert/AlertDescription.vue |
| imports | 16 | src/components/alert/AlertTitle.vue |
| imports | 17 | src/components/alert/index.ts |
| imports | 18 | src/components/animated-digit/AnimatedDigit.vue |
| imports | 19 | src/components/animated-digit/index.ts |
| imports | 20 | src/components/aurora/Aurora.vue |
| imports | 21 | src/components/aurora/composables/atoms-fields.ts |
| imports | 22 | src/components/aurora/composables/atoms.ts |
| imports | 23 | src/components/aurora/composables/auroraFallbackGround.ts |
| imports | 24 | src/components/aurora/composables/auroraImageSource.ts |
| imports | 25 | src/components/aurora/composables/color.ts |
| imports | 26 | src/components/aurora/composables/configSource.ts |
| imports | 27 | src/components/aurora/composables/frameLoop.ts |
| imports | 28 | src/components/aurora/composables/glSetup.ts |
| imports | 29 | src/components/aurora/composables/runtime.ts |
| imports | 30 | src/components/aurora/composables/uniformBridge.ts |
| imports | 31 | src/components/aurora/composables/uniformBridgeWGPU.ts |
| imports | 32 | src/components/aurora/composables/uniformBridgeWGPUImage.ts |
| imports | 33 | src/components/aurora/composables/useAurora.ts |
| imports | 34 | src/components/aurora/composables/useCursorInteraction.ts |
| imports | 35 | src/components/aurora/composables/wgpuSetup.ts |
| imports | 36 | src/components/aurora/constants/budget.ts |
| imports | 37 | src/components/aurora/constants/presets.ts |
| imports | 38 | src/components/aurora/constants/renderMode.ts |
| imports | 39 | src/components/aurora/constants/shaders/aurora-image.frag.ts |
| imports | 40 | src/components/aurora/constants/shaders/aurora-image.wgsl.ts |
| imports | 41 | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts |
| imports | 42 | src/components/aurora/constants/shaders/aurora.frag.ts |
| imports | 43 | src/components/aurora/constants/shaders/aurora.vert.ts |
| imports | 44 | src/components/aurora/constants/shaders/aurora.wgsl.ts |
| imports | 45 | src/components/aurora/constants/shaders/brush.glsl.ts |
| imports | 46 | src/components/aurora/constants/shaders/composition.glsl.ts |
| imports | 47 | src/components/aurora/constants/shaders/flow.glsl.ts |
| imports | 48 | src/components/aurora/constants/shaders/mediums.glsl.ts |
| imports | 49 | src/components/aurora/constants/shaders/metal-medium.glsl.ts |
| imports | 50 | src/components/aurora/constants/shaders/oil-modes.glsl.ts |
| imports | 51 | src/components/aurora/constants/shaders/procedural-color.wgsl.ts |
| imports | 52 | src/components/aurora/constants/shaders/tonemap.glsl.ts |
| imports | 53 | src/components/aurora/constants/shaders/vangogh-medium.glsl.ts |
| imports | 54 | src/components/aurora/index.ts |
| imports | 55 | src/components/avatar/Avatar.vue |
| imports | 56 | src/components/avatar/AvatarFallback.vue |
| imports | 57 | src/components/avatar/AvatarImage.vue |
| imports | 58 | src/components/avatar/index.ts |
| imports | 59 | src/components/badge/Badge.vue |
| imports | 60 | src/components/badge/index.ts |
| imports | 61 | src/components/blob/Blob.vue |
| imports | 62 | src/components/blob/composables/buildMetaballProgram.ts |
| imports | 63 | src/components/blob/composables/easing.ts |
| imports | 64 | src/components/blob/composables/satelliteKinematics.ts |
| imports | 65 | src/components/blob/composables/uniformBridgeWGPU.ts |
| imports | 66 | src/components/blob/composables/uploadBlobUniforms.ts |
| imports | 67 | src/components/blob/composables/useBlobMood.ts |
| imports | 68 | src/components/blob/composables/useBlobPointer.ts |
| imports | 69 | src/components/blob/composables/useBlobSatellites.ts |
| imports | 70 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 71 | src/components/blob/composables/wgpuSetup.ts |
| imports | 72 | src/components/blob/config.ts |
| imports | 73 | src/components/blob/constants.ts |
| imports | 74 | src/components/blob/index.ts |
| imports | 75 | src/components/blob/presets.ts |
| imports | 76 | src/components/blob/shaders/metaball-noise.wgsl.ts |
| imports | 77 | src/components/blob/shaders/metaball-palette.wgsl.ts |
| imports | 78 | src/components/blob/shaders/metaball-uniforms.glsl.ts |
| imports | 79 | src/components/blob/shaders/metaball.frag.ts |
| imports | 80 | src/components/blob/shaders/metaball.vert.ts |
| imports | 81 | src/components/blob/shaders/metaball.wgsl.ts |
| imports | 82 | src/components/blob/shaders/oklch-perturb.glsl.ts |
| imports | 83 | src/components/blob/shaders/sdf-body.glsl.ts |
| imports | 84 | src/components/blob/shaders/watercolor-edges.glsl.ts |
| imports | 85 | src/components/blob/types.ts |
| imports | 86 | src/components/border-progress/BorderProgress.vue |
| imports | 87 | src/components/border-progress/composables/useBorderSpectrum.ts |
| imports | 88 | src/components/border-progress/constants.ts |
| imports | 89 | src/components/border-progress/index.ts |
| imports | 90 | src/components/button/Button.vue |
| imports | 91 | src/components/button/index.ts |
| imports | 92 | src/components/card/Card.vue |
| imports | 93 | src/components/card/CardAction.vue |
| imports | 94 | src/components/card/CardContent.vue |
| imports | 95 | src/components/card/CardDescription.vue |
| imports | 96 | src/components/card/CardFooter.vue |
| imports | 97 | src/components/card/CardHeader.vue |
| imports | 98 | src/components/card/CardTitle.vue |
| imports | 99 | src/components/card/ScrollCard.vue |
| imports | 100 | src/components/card/ScrollCardHeader.vue |
| imports | 101 | src/components/card/index.ts |
| imports | 102 | src/components/carousel/Carousel.vue |
| imports | 103 | src/components/carousel/CarouselContent.vue |
| imports | 104 | src/components/carousel/CarouselItem.vue |
| imports | 105 | src/components/carousel/CarouselNext.vue |
| imports | 106 | src/components/carousel/CarouselPager.vue |
| imports | 107 | src/components/carousel/CarouselPrevious.vue |
| imports | 108 | src/components/carousel/GlassCarouselPager.vue |
| imports | 109 | src/components/carousel/index.ts |
| imports | 110 | src/components/carousel/interface.ts |
| imports | 111 | src/components/carousel/useCarousel.ts |
| imports | 112 | src/components/checkbox/Checkbox.vue |
| imports | 113 | src/components/checkbox/index.ts |
| imports | 114 | src/components/chip/Chip.vue |
| imports | 115 | src/components/chip/chipVariants.ts |
| imports | 116 | src/components/chip/index.ts |
| imports | 117 | src/components/chip/types.ts |
| imports | 118 | src/components/collapsible/Collapsible.vue |
| imports | 119 | src/components/collapsible/CollapsibleContent.vue |
| imports | 120 | src/components/collapsible/CollapsibleTrigger.vue |
| imports | 121 | src/components/collapsible/index.ts |
| imports | 122 | src/components/color-swatch/ColorSwatch.vue |
| imports | 123 | src/components/color-swatch/index.ts |
| imports | 124 | src/components/combobox/Combobox.vue |
| imports | 125 | src/components/combobox/ComboboxAnchor.vue |
| imports | 126 | src/components/combobox/ComboboxEmpty.vue |
| imports | 127 | src/components/combobox/ComboboxGroup.vue |
| imports | 128 | src/components/combobox/ComboboxInput.vue |
| imports | 129 | src/components/combobox/ComboboxItem.vue |
| imports | 130 | src/components/combobox/ComboboxItemIndicator.vue |
| imports | 131 | src/components/combobox/ComboboxList.vue |
| imports | 132 | src/components/combobox/ComboboxSeparator.vue |
| imports | 133 | src/components/combobox/ComboboxViewport.vue |
| imports | 134 | src/components/combobox/index.ts |
| imports | 135 | src/components/command/Command.vue |
| imports | 136 | src/components/command/CommandDialog.vue |
| imports | 137 | src/components/command/CommandEmpty.vue |
| imports | 138 | src/components/command/CommandGroup.vue |
| imports | 139 | src/components/command/CommandInput.vue |
| imports | 140 | src/components/command/CommandItem.vue |
| imports | 141 | src/components/command/CommandList.vue |
| imports | 142 | src/components/command/CommandSeparator.vue |
| imports | 143 | src/components/command/CommandShortcut.vue |
| imports | 144 | src/components/command/index.ts |
| imports | 145 | src/components/completion-seal/CompletionSeal.vue |
| imports | 146 | src/components/completion-seal/composables/useCompletionSeal.ts |
| imports | 147 | src/components/completion-seal/constants.ts |
| imports | 148 | src/components/completion-seal/index.ts |
| imports | 149 | src/components/configurator/Configurator.vue |
| imports | 150 | src/components/configurator/ConfiguratorLayer.vue |
| imports | 151 | src/components/configurator/ConfiguratorRow.vue |
| imports | 152 | src/components/configurator/index.ts |
| imports | 153 | src/components/configurator/size.ts |
| imports | 154 | src/components/configurator/useConfiguratorState.ts |
| imports | 155 | src/components/constellation/Constellation.vue |
| imports | 156 | src/components/constellation/composables/constellationGLSetup.ts |
| imports | 157 | src/components/constellation/composables/constellationWGPUSetup.ts |
| imports | 158 | src/components/constellation/composables/createConstellationField.ts |
| imports | 159 | src/components/constellation/composables/uniformBridgeWGPU.ts |
| imports | 160 | src/components/constellation/composables/useConstellation.ts |
| imports | 161 | src/components/constellation/constants.ts |
| imports | 162 | src/components/constellation/constellationField.ts |
| imports | 163 | src/components/constellation/constellationInteraction.ts |
| imports | 164 | src/components/constellation/constellationRender.ts |
| imports | 165 | src/components/constellation/constellationTypes.ts |
| imports | 166 | src/components/constellation/constellationWell.ts |
| imports | 167 | src/components/constellation/index.ts |
| imports | 168 | src/components/constellation/shaders/constellation-lines.glsl.ts |
| imports | 169 | src/components/constellation/shaders/constellation-lines.wgsl.ts |
| imports | 170 | src/components/constellation/shaders/constellation-points.glsl.ts |
| imports | 171 | src/components/constellation/shaders/constellation-points.wgsl.ts |
| imports | 172 | src/components/controls/DarkModeToggle.vue |
| imports | 173 | src/components/controls/index.ts |
| imports | 174 | src/components/data-table/DataTable.vue |
| imports | 175 | src/components/data-table/DataTablePagination.vue |
| imports | 176 | src/components/data-table/composables/useDataTableResponsive.ts |
| imports | 177 | src/components/data-table/composables/useDataTableRowIdentity.ts |
| imports | 178 | src/components/data-table/index.ts |
| imports | 179 | src/components/data-table/types.ts |
| imports | 180 | src/components/deck/DeckPager.vue |
| imports | 181 | src/components/deck/composables/useDeck.ts |
| imports | 182 | src/components/deck/composables/useDeckKeyboard.ts |
| imports | 183 | src/components/deck/composables/useDeckSpring.ts |
| imports | 184 | src/components/deck/constants.ts |
| imports | 185 | src/components/deck/index.ts |
| imports | 186 | src/components/dialog/Dialog.vue |
| imports | 187 | src/components/dialog/DialogClose.vue |
| imports | 188 | src/components/dialog/DialogContent.vue |
| imports | 189 | src/components/dialog/DialogDescription.vue |
| imports | 190 | src/components/dialog/DialogFooter.vue |
| imports | 191 | src/components/dialog/DialogHeader.vue |
| imports | 192 | src/components/dialog/DialogScrollContent.vue |
| imports | 193 | src/components/dialog/DialogTitle.vue |
| imports | 194 | src/components/dialog/DialogTrigger.vue |
| imports | 195 | src/components/dialog/index.ts |
| imports | 196 | src/components/dock/DockBackgroundToggle.vue |
| imports | 197 | src/components/dock/DockControl.vue |
| imports | 198 | src/components/dock/DockCrossfade.vue |
| imports | 199 | src/components/dock/DockLayer.vue |
| imports | 200 | src/components/dock/DockLayerGroup.vue |
| imports | 201 | src/components/dock/DockSection.vue |
| imports | 202 | src/components/dock/DockSeparator.vue |
| imports | 203 | src/components/dock/DockStack.vue |
| imports | 204 | src/components/dock/DockTrigger.vue |
| imports | 205 | src/components/dock/GlassDock.vue |
| imports | 206 | src/components/dock/composables/dockContext.ts |
| imports | 207 | src/components/dock/composables/dockCrossfadeContext.ts |
| imports | 208 | src/components/dock/composables/dockMorphContext.ts |
| imports | 209 | src/components/dock/composables/dockMorphMeasure.ts |
| imports | 210 | src/components/dock/composables/index.ts |
| imports | 211 | src/components/dock/composables/isTeleportedTarget.ts |
| imports | 212 | src/components/dock/composables/useDockClickIntegrity.ts |
| imports | 213 | src/components/dock/composables/useDockFisheye.ts |
| imports | 214 | src/components/dock/composables/useDockHold.ts |
| imports | 215 | src/components/dock/composables/useDockOverflowFit.ts |
| imports | 216 | src/components/dock/composables/useDockPopover.ts |
| imports | 217 | src/components/dock/composables/useDockSearch.ts |
| imports | 218 | src/components/dock/composables/useDockShellProps.ts |
| imports | 219 | src/components/dock/composables/useDockSpring.ts |
| imports | 220 | src/components/dock/composables/useDockState.ts |
| imports | 221 | src/components/dock/composables/useDockTouchGate.ts |
| imports | 222 | src/components/dock/constants.ts |
| imports | 223 | src/components/dock/index.ts |
| imports | 224 | src/components/drawer/Drawer.vue |
| imports | 225 | src/components/drawer/DrawerContent.vue |
| imports | 226 | src/components/drawer/DrawerDescription.vue |
| imports | 227 | src/components/drawer/DrawerFooter.vue |
| imports | 228 | src/components/drawer/DrawerHeader.vue |
| imports | 229 | src/components/drawer/DrawerOverlay.vue |
| imports | 230 | src/components/drawer/DrawerTitle.vue |
| imports | 231 | src/components/drawer/composables/drawerSnapContext.ts |
| imports | 232 | src/components/drawer/composables/useDrawerSnap.ts |
| imports | 233 | src/components/drawer/constants.ts |
| imports | 234 | src/components/drawer/index.ts |
| imports | 235 | src/components/dropdown-menu/DropdownMenu.vue |
| imports | 236 | src/components/dropdown-menu/DropdownMenuCheckboxItem.vue |
| imports | 237 | src/components/dropdown-menu/DropdownMenuContent.vue |
| imports | 238 | src/components/dropdown-menu/DropdownMenuGroup.vue |
| imports | 239 | src/components/dropdown-menu/DropdownMenuItem.vue |
| imports | 240 | src/components/dropdown-menu/DropdownMenuLabel.vue |
| imports | 241 | src/components/dropdown-menu/DropdownMenuRadioGroup.vue |
| imports | 242 | src/components/dropdown-menu/DropdownMenuRadioItem.vue |
| imports | 243 | src/components/dropdown-menu/DropdownMenuSeparator.vue |
| imports | 244 | src/components/dropdown-menu/DropdownMenuShortcut.vue |
| imports | 245 | src/components/dropdown-menu/DropdownMenuSub.vue |
| imports | 246 | src/components/dropdown-menu/DropdownMenuSubContent.vue |
| imports | 247 | src/components/dropdown-menu/DropdownMenuSubTrigger.vue |
| imports | 248 | src/components/dropdown-menu/DropdownMenuTrigger.vue |
| imports | 249 | src/components/dropdown-menu/index.ts |
| imports | 250 | src/components/dropdown-menu/useMenuTrigger.ts |
| imports | 251 | src/components/easing/EasingConfigurator.vue |
| imports | 252 | src/components/easing/EasingPicker.vue |
| imports | 253 | src/components/easing/composables/useEasingPicker.ts |
| imports | 254 | src/components/easing/constants.ts |
| imports | 255 | src/components/easing/index.ts |
| imports | 256 | src/components/expandable-container/ExpandableContainer.vue |
| imports | 257 | src/components/expandable-container/index.ts |
| imports | 258 | src/components/fading-scroll/FadingScroll.vue |
| imports | 259 | src/components/fading-scroll/composables/useFadingScroll.ts |
| imports | 260 | src/components/fading-scroll/constants.ts |
| imports | 261 | src/components/fading-scroll/index.ts |
| imports | 262 | src/components/focus-scope/FocusScope.vue |
| imports | 263 | src/components/focus-scope/index.ts |
| imports | 264 | src/components/fourier-field/FourierField.vue |
| imports | 265 | src/components/fourier-field/composables/fourierFieldGLSetup.ts |
| imports | 266 | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts |
| imports | 267 | src/components/fourier-field/composables/uniformBridgeWGPU.ts |
| imports | 268 | src/components/fourier-field/composables/useFourierField.ts |
| imports | 269 | src/components/fourier-field/constants.ts |
| imports | 270 | src/components/fourier-field/index.ts |
| imports | 271 | src/components/fourier-field/math.ts |
| imports | 272 | src/components/fourier-field/presets.ts |
| imports | 273 | src/components/fourier-field/shaders/fourier-field.compute.wgsl.ts |
| imports | 274 | src/components/fourier-field/shaders/fourier-field.glsl.ts |
| imports | 275 | src/components/fourier-field/shaders/fourier-field.render.wgsl.ts |
| imports | 276 | src/components/fourier-field/shaders/fourier-field.ribbon.ts |
| imports | 277 | src/components/goo-filter/GooFilter.vue |
| imports | 278 | src/components/goo-filter/index.ts |
| imports | 279 | src/components/handmark/HandMark.vue |
| imports | 280 | src/components/handmark/brush.ts |
| imports | 281 | src/components/handmark/composables/useHandMark.ts |
| imports | 282 | src/components/handmark/constants.ts |
| imports | 283 | src/components/handmark/freehand.ts |
| imports | 284 | src/components/handmark/geometry.ts |
| imports | 285 | src/components/handmark/index.ts |
| imports | 286 | src/components/handmark/ink.ts |
| imports | 287 | src/components/handmark/noise.ts |
| imports | 288 | src/components/handmark/texture.ts |
| imports | 289 | src/components/handmark/types.ts |
| imports | 290 | src/components/header-ribbon/HeaderRibbon.vue |
| imports | 291 | src/components/header-ribbon/index.ts |
| imports | 292 | src/components/header-ribbon/types.ts |
| imports | 293 | src/components/icon-chip/IconChip.vue |
| imports | 294 | src/components/icon-chip/index.ts |
| imports | 295 | src/components/icon-chip/types.ts |
| imports | 296 | src/components/icon-tooltip/IconTooltip.vue |
| imports | 297 | src/components/icon-tooltip/index.ts |
| imports | 298 | src/components/index.ts |
| imports | 299 | src/components/infinite-scroll/InfiniteScroll.vue |
| imports | 300 | src/components/infinite-scroll/composables/index.ts |
| imports | 301 | src/components/infinite-scroll/composables/types.ts |
| imports | 302 | src/components/infinite-scroll/composables/useInfiniteScroll.ts |
| imports | 303 | src/components/infinite-scroll/index.ts |
| imports | 304 | src/components/input/Input.vue |
| imports | 305 | src/components/input/index.ts |
| imports | 306 | src/components/instrument-chassis/ChassisDivider.vue |
| imports | 307 | src/components/instrument-chassis/InstrumentChassis.vue |
| imports | 308 | src/components/instrument-chassis/index.ts |
| imports | 309 | src/components/label/Label.vue |
| imports | 310 | src/components/label/index.ts |
| imports | 311 | src/components/labeled-field/LabeledField.vue |
| imports | 312 | src/components/labeled-field/LabeledInput.vue |
| imports | 313 | src/components/labeled-field/LabeledSelect.vue |
| imports | 314 | src/components/labeled-field/LabeledSlider.vue |
| imports | 315 | src/components/labeled-field/LabeledSwitch.vue |
| imports | 316 | src/components/labeled-field/index.ts |
| imports | 317 | src/components/liquid-grid/LiquidGrid.vue |
| imports | 318 | src/components/liquid-grid/composables/liquidGrid.ts |
| imports | 319 | src/components/liquid-grid/composables/liquidGridGLSetup.ts |
| imports | 320 | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts |
| imports | 321 | src/components/liquid-grid/composables/uniformBridgeWGPU.ts |
| imports | 322 | src/components/liquid-grid/composables/useLiquidGrid.ts |
| imports | 323 | src/components/liquid-grid/constants.ts |
| imports | 324 | src/components/liquid-grid/index.ts |
| imports | 325 | src/components/liquid-grid/shaders/liquid-grid.glsl.ts |
| imports | 326 | src/components/liquid-grid/shaders/liquid-grid.wgsl.ts |
| imports | 327 | src/components/metric-badge/MetricBadge.vue |
| imports | 328 | src/components/metric-badge/index.ts |
| imports | 329 | src/components/metric-cell/MetricCell.vue |
| imports | 330 | src/components/metric-cell/index.ts |
| imports | 331 | src/components/metric-stack/MetricRow.vue |
| imports | 332 | src/components/metric-stack/MetricStack.vue |
| imports | 333 | src/components/metric-stack/index.ts |
| imports | 334 | src/components/notification/Notification.vue |
| imports | 335 | src/components/notification/index.ts |
| imports | 336 | src/components/number-field/NumberField.vue |
| imports | 337 | src/components/number-field/NumberFieldContent.vue |
| imports | 338 | src/components/number-field/NumberFieldDecrement.vue |
| imports | 339 | src/components/number-field/NumberFieldIncrement.vue |
| imports | 340 | src/components/number-field/NumberFieldInput.vue |
| imports | 341 | src/components/number-field/index.ts |
| imports | 342 | src/components/pager-dots/PagerDots.vue |
| imports | 343 | src/components/pager-dots/composables/usePagerWorm.ts |
| imports | 344 | src/components/pager-dots/constants.ts |
| imports | 345 | src/components/pager-dots/index.ts |
| imports | 346 | src/components/pager-dots/pagerWindow.ts |
| imports | 347 | src/components/paper-backdrop/PaperBackdrop.vue |
| imports | 348 | src/components/paper-backdrop/index.ts |
| imports | 349 | src/components/popover/Popover.vue |
| imports | 350 | src/components/popover/PopoverContent.vue |
| imports | 351 | src/components/popover/PopoverTrigger.vue |
| imports | 352 | src/components/popover/index.ts |
| imports | 353 | src/components/popover/popoverContext.ts |
| imports | 354 | src/components/progress/Progress.vue |
| imports | 355 | src/components/progress/ProgressDefault.vue |
| imports | 356 | src/components/progress/ProgressGradient.vue |
| imports | 357 | src/components/progress/ProgressLiquid.vue |
| imports | 358 | src/components/progress/ProgressSectioned.vue |
| imports | 359 | src/components/progress/index.ts |
| imports | 360 | src/components/progress/useProgressGeometry.ts |
| imports | 361 | src/components/pulse/Pulse.vue |
| imports | 362 | src/components/pulse/index.ts |
| imports | 363 | src/components/radio-group/RadioGroup.vue |
| imports | 364 | src/components/radio-group/RadioGroupItem.vue |
| imports | 365 | src/components/radio-group/index.ts |
| imports | 366 | src/components/search/FuzzySearch.vue |
| imports | 367 | src/components/search/SearchBar.vue |
| imports | 368 | src/components/search/composables/fuzzySearchIndex.ts |
| imports | 369 | src/components/search/composables/index.ts |
| imports | 370 | src/components/search/composables/types.ts |
| imports | 371 | src/components/search/composables/useFuzzySearch.ts |
| imports | 372 | src/components/search/index.ts |
| imports | 373 | src/components/search/searchVariants.ts |
| imports | 374 | src/components/section/Section.vue |
| imports | 375 | src/components/section/index.ts |
| imports | 376 | src/components/select/Select.vue |
| imports | 377 | src/components/select/SelectContent.vue |
| imports | 378 | src/components/select/SelectGroup.vue |
| imports | 379 | src/components/select/SelectItem.vue |
| imports | 380 | src/components/select/SelectLabel.vue |
| imports | 381 | src/components/select/SelectScrollDownButton.vue |
| imports | 382 | src/components/select/SelectScrollUpButton.vue |
| imports | 383 | src/components/select/SelectSeparator.vue |
| imports | 384 | src/components/select/SelectTrigger.vue |
| imports | 385 | src/components/select/SelectValue.vue |
| imports | 386 | src/components/select/index.ts |
| imports | 387 | src/components/separator/Separator.vue |
| imports | 388 | src/components/separator/index.ts |
| imports | 389 | src/components/skeleton/Skeleton.vue |
| imports | 390 | src/components/skeleton/index.ts |
| imports | 391 | src/components/slider/Slider.vue |
| imports | 392 | src/components/slider/index.ts |
| imports | 393 | src/components/sortable-list/SortableHandle.vue |
| imports | 394 | src/components/sortable-list/SortableItem.vue |
| imports | 395 | src/components/sortable-list/SortableList.vue |
| imports | 396 | src/components/sortable-list/composables/dragController.ts |
| imports | 397 | src/components/sortable-list/composables/dropResolver.ts |
| imports | 398 | src/components/sortable-list/composables/ghostRenderer.ts |
| imports | 399 | src/components/sortable-list/composables/index.ts |
| imports | 400 | src/components/sortable-list/composables/touchGate.ts |
| imports | 401 | src/components/sortable-list/composables/transitionTiming.ts |
| imports | 402 | src/components/sortable-list/composables/types.ts |
| imports | 403 | src/components/sortable-list/composables/useSortable.ts |
| imports | 404 | src/components/sortable-list/context.ts |
| imports | 405 | src/components/sortable-list/index.ts |
| imports | 406 | src/components/spa-view/SpaView.vue |
| imports | 407 | src/components/spa-view/index.ts |
| imports | 408 | src/components/split-chars/SplitChars.vue |
| imports | 409 | src/components/split-chars/index.ts |
| imports | 410 | src/components/stacked-icons/StackedIconGroup.vue |
| imports | 411 | src/components/stacked-icons/index.ts |
| imports | 412 | src/components/stacked-icons/types.ts |
| imports | 413 | src/components/status-dot/StatusDot.vue |
| imports | 414 | src/components/status-dot/index.ts |
| imports | 415 | src/components/surface/Surface.vue |
| imports | 416 | src/components/surface/index.ts |
| imports | 417 | src/components/switch/Switch.vue |
| imports | 418 | src/components/switch/index.ts |
| imports | 419 | src/components/table/Table.vue |
| imports | 420 | src/components/table/TableBody.vue |
| imports | 421 | src/components/table/TableCaption.vue |
| imports | 422 | src/components/table/TableCell.vue |
| imports | 423 | src/components/table/TableEmpty.vue |
| imports | 424 | src/components/table/TableHead.vue |
| imports | 425 | src/components/table/TableHeader.vue |
| imports | 426 | src/components/table/TableRow.vue |
| imports | 427 | src/components/table/index.ts |
| imports | 428 | src/components/tabs/SegmentedTabs.vue |
| imports | 429 | src/components/tabs/composables/useEyeglassLive.ts |
| imports | 430 | src/components/tabs/composables/useTabDragMorph.ts |
| imports | 431 | src/components/tabs/composables/useTabResponsive.ts |
| imports | 432 | src/components/tabs/composables/useTabRovingFocus.ts |
| imports | 433 | src/components/tabs/constants.ts |
| imports | 434 | src/components/tabs/index.ts |
| imports | 435 | src/components/tags-input/TagsInput.vue |
| imports | 436 | src/components/tags-input/TagsInputInput.vue |
| imports | 437 | src/components/tags-input/TagsInputItem.vue |
| imports | 438 | src/components/tags-input/TagsInputItemDelete.vue |
| imports | 439 | src/components/tags-input/TagsInputItemText.vue |
| imports | 440 | src/components/tags-input/index.ts |
| imports | 441 | src/components/textarea/Textarea.vue |
| imports | 442 | src/components/textarea/index.ts |
| imports | 443 | src/components/timeline/ContinuousMarkers.vue |
| imports | 444 | src/components/timeline/ContinuousRail.vue |
| imports | 445 | src/components/timeline/ContinuousTimeline.vue |
| imports | 446 | src/components/timeline/GlassTimeline.vue |
| imports | 447 | src/components/timeline/ScrubberTimeline.vue |
| imports | 448 | src/components/timeline/SegmentedTimeline.vue |
| imports | 449 | src/components/timeline/geometry.ts |
| imports | 450 | src/components/timeline/index.ts |
| imports | 451 | src/components/timeline/types.ts |
| imports | 452 | src/components/toast/Toast.vue |
| imports | 453 | src/components/toast/ToastAction.vue |
| imports | 454 | src/components/toast/ToastClose.vue |
| imports | 455 | src/components/toast/ToastDescription.vue |
| imports | 456 | src/components/toast/ToastTitle.vue |
| imports | 457 | src/components/toast/Toaster.vue |
| imports | 458 | src/components/toast/index.ts |
| imports | 459 | src/components/toast/use-toast.ts |
| imports | 460 | src/components/toggle-group/ToggleGroup.vue |
| imports | 461 | src/components/toggle-group/ToggleGroupItem.vue |
| imports | 462 | src/components/toggle-group/index.ts |
| imports | 463 | src/components/toggle-group/toggleGroupContext.ts |
| imports | 464 | src/components/toggle/Toggle.vue |
| imports | 465 | src/components/toggle/index.ts |
| imports | 466 | src/components/tooltip/Tooltip.vue |
| imports | 467 | src/components/tooltip/TooltipContent.vue |
| imports | 468 | src/components/tooltip/TooltipProvider.vue |
| imports | 469 | src/components/tooltip/TooltipTrigger.vue |
| imports | 470 | src/components/tooltip/index.ts |
| imports | 471 | src/components/typewriter/TypewriterText.vue |
| imports | 472 | src/components/typewriter/composables/index.ts |
| imports | 473 | src/components/typewriter/composables/useTypewriter.ts |
| imports | 474 | src/components/typewriter/index.ts |
| imports | 475 | src/components/typewriter/types.ts |
| imports | 476 | src/components/typewriter/utils/keyboard.ts |
| imports | 477 | src/components/typewriter/utils/pausePatterns.ts |
| imports | 478 | src/components/typewriter/utils/timing.ts |
| imports | 479 | src/components/typewriter/utils/typoStateMachine.ts |
| imports | 480 | src/components/watercolor-dot/WatercolorDot.vue |
| imports | 481 | src/components/watercolor-dot/index.ts |
| imports | 482 | src/components/watercolor-dot/prng.ts |
| imports | 483 | src/components/watercolor-dot/useWatercolorBlob.ts |
| imports | 484 | src/composables/color/accent-tone-solve.ts |
| imports | 485 | src/composables/color/index.ts |
| imports | 486 | src/composables/color/spectrum-walk.ts |
| imports | 487 | src/composables/color/useAccentTone.ts |
| imports | 488 | src/composables/context/createContext.ts |
| imports | 489 | src/composables/context/index.ts |
| imports | 490 | src/composables/dark/darkModeSyncScript.ts |
| imports | 491 | src/composables/dark/index.ts |
| imports | 492 | src/composables/dark/installDarkModeSync.ts |
| imports | 493 | src/composables/dark/useGlobalDark.ts |
| imports | 494 | src/composables/dom/index.ts |
| imports | 495 | src/composables/dom/useBreakpoint.ts |
| imports | 496 | src/composables/dom/useClipboard.ts |
| imports | 497 | src/composables/dom/useDocumentVisibility.ts |
| imports | 498 | src/composables/dom/useDragVelocity.ts |
| imports | 499 | src/composables/dom/useIdleReady.ts |
| imports | 500 | src/composables/dom/useResizeObserver.ts |
| imports | 501 | src/composables/dom/useResolveTokenColor.ts |
| imports | 502 | src/composables/dom/useTokenColor.ts |
| imports | 503 | src/composables/dom/useTouchGate.ts |
| imports | 504 | src/composables/dom/useUserInvalidAria.ts |
| imports | 505 | src/composables/dom/useViewportReady.ts |
| imports | 506 | src/composables/glass/ambientHueHistogram.ts |
| imports | 507 | src/composables/glass/backdropLuminanceSample.ts |
| imports | 508 | src/composables/glass/backdropSampleMath.ts |
| imports | 509 | src/composables/glass/canvas2d/index.ts |
| imports | 510 | src/composables/glass/canvas2d/resolveCanvasColor.ts |
| imports | 511 | src/composables/glass/canvas2d/useCanvas2D.ts |
| imports | 512 | src/composables/glass/index.ts |
| imports | 513 | src/composables/glass/textureUpload.ts |
| imports | 514 | src/composables/glass/useGlassBackdropLuminance.ts |
| imports | 515 | src/composables/glass/useSpecularPointer.ts |
| imports | 516 | src/composables/glass/useSpecularTracking.ts |
| imports | 517 | src/composables/glass/vSpecular.ts |
| imports | 518 | src/composables/glass/wave/index.ts |
| imports | 519 | src/composables/glass/wave/waveField.glsl.ts |
| imports | 520 | src/composables/glass/wave/waveField.ts |
| imports | 521 | src/composables/glass/wave/waveField.wgsl.ts |
| imports | 522 | src/composables/glass/webgl/backingSize.ts |
| imports | 523 | src/composables/glass/webgl/compile.ts |
| imports | 524 | src/composables/glass/webgl/createCanvasLifecycle.ts |
| imports | 525 | src/composables/glass/webgl/shaders/flow.glsl.ts |
| imports | 526 | src/composables/glass/webgl/shaders/flow.wgsl.ts |
| imports | 527 | src/composables/glass/webgl/shaders/glass-refract.glsl.ts |
| imports | 528 | src/composables/glass/webgl/shaders/procedural-color.glsl.ts |
| imports | 529 | src/composables/glass/webgl/useWebGLCanvas.ts |
| imports | 530 | src/composables/glass/webgl/visibility.ts |
| imports | 531 | src/composables/glass/webgpu/index.ts |
| imports | 532 | src/composables/glass/webgpu/useGpuSubstrate.ts |
| imports | 533 | src/composables/glass/webgpu/useWebGPUCanvas.ts |
| imports | 534 | src/composables/glass/webgpu/webgpuCanvasTypes.ts |
| imports | 535 | src/composables/glass/webgpu/webgpuDevice.ts |
| imports | 536 | src/composables/index.ts |
| imports | 537 | src/composables/keyboard/index.ts |
| imports | 538 | src/composables/keyboard/useKeyboardShortcuts.ts |
| imports | 539 | src/composables/motion/bloomUpField.ts |
| imports | 540 | src/composables/motion/constants.ts |
| imports | 541 | src/composables/motion/core/index.ts |
| imports | 542 | src/composables/motion/core/writeVelocityWeight.ts |
| imports | 543 | src/composables/motion/curves.ts |
| imports | 544 | src/composables/motion/gooBarbellGeometry.ts |
| imports | 545 | src/composables/motion/index.ts |
| imports | 546 | src/composables/motion/morphSignatures.ts |
| imports | 547 | src/composables/motion/motionTempo.ts |
| imports | 548 | src/composables/motion/pointerFieldMappings.ts |
| imports | 549 | src/composables/motion/scrollReader.ts |
| imports | 550 | src/composables/motion/springPresets.ts |
| imports | 551 | src/composables/motion/suite.ts |
| imports | 552 | src/composables/motion/supportsCssTimeline.ts |
| imports | 553 | src/composables/motion/useAnimatedNumber.ts |
| imports | 554 | src/composables/motion/useAnimatedNumberMap.ts |
| imports | 555 | src/composables/motion/useBloomUp.ts |
| imports | 556 | src/composables/motion/useCharStagger.ts |
| imports | 557 | src/composables/motion/useCountup.ts |
| imports | 558 | src/composables/motion/useDockCtaReceive.ts |
| imports | 559 | src/composables/motion/useDragMorph.ts |
| imports | 560 | src/composables/motion/useElementMorph.ts |
| imports | 561 | src/composables/motion/useGooMorph.ts |
| imports | 562 | src/composables/motion/useIntersectionPause.ts |
| imports | 563 | src/composables/motion/useLeadTrail.ts |
| imports | 564 | src/composables/motion/useLiquidFlex.ts |
| imports | 565 | src/composables/motion/useLiquidPress.ts |
| imports | 566 | src/composables/motion/useLiquidReveal.ts |
| imports | 567 | src/composables/motion/useNumericTransition.ts |
| imports | 568 | src/composables/motion/usePointerVelocityField.ts |
| imports | 569 | src/composables/motion/usePrioritizedTask.ts |
| imports | 570 | src/composables/motion/useRAFLoop.ts |
| imports | 571 | src/composables/motion/useRoutePointer.ts |
| imports | 572 | src/composables/motion/useScrollChrome.ts |
| imports | 573 | src/composables/motion/useScrollPin.ts |
| imports | 574 | src/composables/motion/useScrollProgress.ts |
| imports | 575 | src/composables/motion/useScrollScene.ts |
| imports | 576 | src/composables/motion/useScrollTrigger.ts |
| imports | 577 | src/composables/motion/useSelectionGroup.ts |
| imports | 578 | src/composables/motion/useSelectionIndicator.ts |
| imports | 579 | src/composables/motion/useSpring.ts |
| imports | 580 | src/composables/motion/useSpringMount.ts |
| imports | 581 | src/composables/motion/useSpringPress.ts |
| imports | 582 | src/composables/motion/useStagger.ts |
| imports | 583 | src/composables/motion/useStaggerReveal.ts |
| imports | 584 | src/composables/motion/useTextHighlight.ts |
| imports | 585 | src/composables/motion/useViewTransition.ts |
| imports | 586 | src/composables/motion/useYieldToMain.ts |
| imports | 587 | src/composables/motion/vReveal.ts |
| imports | 588 | src/composables/reactive/index.ts |
| imports | 589 | src/composables/reactive/useInterval.ts |
| imports | 590 | src/composables/reactive/useTimer.ts |
| imports | 591 | src/composables/sidebar/index.ts |
| imports | 592 | src/composables/sidebar/types.ts |
| imports | 593 | src/composables/sidebar/useClickDelegate.ts |
| imports | 594 | src/composables/sidebar/useLazyLoader.ts |
| imports | 595 | src/composables/sidebar/useScrollTo.ts |
| imports | 596 | src/composables/sidebar/useScrollTracker.ts |
| imports | 597 | src/composables/sidebar/useSidebarFollow.ts |
| imports | 598 | src/composables/sidebar/useSidebarState.ts |
| imports | 599 | src/composables/sidebar/useTreeIndex.ts |
| imports | 600 | src/composables/virtual/index.ts |
| imports | 601 | src/composables/virtual/useVirtualSectionWindow.ts |
| imports | 602 | src/composables/virtual/useWindowedStore.ts |
| imports | 603 | src/composables/virtual/virtualSectionLayout.ts |
| imports | 604 | src/forms.ts |
| imports | 605 | src/html-attributes.d.ts |
| imports | 606 | src/index.ts |
| imports | 607 | src/styles/animations.css |
| imports | 608 | src/styles/border-progress.css |
| imports | 609 | src/styles/card-scroll.css |
| imports | 610 | src/styles/cards.css |
| imports | 611 | src/styles/completion-seal.css |
| imports | 612 | src/styles/configurator.css |
| imports | 613 | src/styles/dialog-placement.css |
| imports | 614 | src/styles/dock-controls.css |
| imports | 615 | src/styles/dock-controls/dark-mode-toggle.css |
| imports | 616 | src/styles/dock-controls/icon-button.css |
| imports | 617 | src/styles/dock-controls/tab-button.css |
| imports | 618 | src/styles/dock-controls/touch-floor.css |
| imports | 619 | src/styles/dock-controls/triggers.css |
| imports | 620 | src/styles/dock.css |
| imports | 621 | src/styles/dock/adaptive-legibility.css |
| imports | 622 | src/styles/dock/crossfade.css |
| imports | 623 | src/styles/dock/cta-seat.css |
| imports | 624 | src/styles/dock/density.css |
| imports | 625 | src/styles/dock/dock.css |
| imports | 626 | src/styles/dock/fisheye.css |
| imports | 627 | src/styles/dock/layer-group.css |
| imports | 628 | src/styles/dock/layers.css |
| imports | 629 | src/styles/dock/morph.css |
| imports | 630 | src/styles/dock/overflow.css |
| imports | 631 | src/styles/dock/popover.css |
| imports | 632 | src/styles/dock/search.css |
| imports | 633 | src/styles/dock/section.css |
| imports | 634 | src/styles/dock/shape.css |
| imports | 635 | src/styles/dock/shell-regions.css |
| imports | 636 | src/styles/dock/shell.css |
| imports | 637 | src/styles/draw-in.css |
| imports | 638 | src/styles/drawer.css |
| imports | 639 | src/styles/feedback-tone.css |
| imports | 640 | src/styles/fonts.css |
| imports | 641 | src/styles/glass-refract.css |
| imports | 642 | src/styles/glass-specular-track.css |
| imports | 643 | src/styles/glass.css |
| imports | 644 | src/styles/glass/a11y-fallback.css |
| imports | 645 | src/styles/glass/accent-tone.css |
| imports | 646 | src/styles/glass/control-surfaces.css |
| imports | 647 | src/styles/glass/deep.css |
| imports | 648 | src/styles/glass/defined.css |
| imports | 649 | src/styles/glass/glass-atom.css |
| imports | 650 | src/styles/glass/glass-capsule.css |
| imports | 651 | src/styles/glass/glass-chip.css |
| imports | 652 | src/styles/glass/grain-overlay.css |
| imports | 653 | src/styles/glass/ladder-undershadow.css |
| imports | 654 | src/styles/glass/ladder.css |
| imports | 655 | src/styles/glass/liquid-enter.css |
| imports | 656 | src/styles/glass/liquid-fill.css |
| imports | 657 | src/styles/glass/material.css |
| imports | 658 | src/styles/glass/progress-rail.css |
| imports | 659 | src/styles/glass/reveal.css |
| imports | 660 | src/styles/glass/rim.css |
| imports | 661 | src/styles/glass/squircle.css |
| imports | 662 | src/styles/glass/surface-axis.css |
| imports | 663 | src/styles/glass/surfaces-pager.css |
| imports | 664 | src/styles/glass/surfaces.css |
| imports | 665 | src/styles/icon-chip.css |
| imports | 666 | src/styles/index.css |
| imports | 667 | src/styles/instrument-chassis.css |
| imports | 668 | src/styles/menu.css |
| imports | 669 | src/styles/paper.css |
| imports | 670 | src/styles/scroll-choreography.css |
| imports | 671 | src/styles/scroll-chrome.css |
| imports | 672 | src/styles/scroll-driven.css |
| imports | 673 | src/styles/segmented-tabs.css |
| imports | 674 | src/styles/select.css |
| imports | 675 | src/styles/tabs/segmented-tabs-drag.css |
| imports | 676 | src/styles/theme.css |
| imports | 677 | src/styles/theme/bridges.css |
| imports | 678 | src/styles/theme/dark.css |
| imports | 679 | src/styles/theme/literals.css |
| imports | 680 | src/styles/theme/radius.css |
| imports | 681 | src/styles/tokens.css |
| imports | 682 | src/styles/tokens.ts |
| imports | 683 | src/styles/tokens/color-radius.css |
| imports | 684 | src/styles/tokens/dark-arm-glass.css |
| imports | 685 | src/styles/tokens/dark-arm.css |
| imports | 686 | src/styles/tokens/glass-deep.css |
| imports | 687 | src/styles/tokens/glass-fx.css |
| imports | 688 | src/styles/tokens/glass.css |
| imports | 689 | src/styles/tokens/light-dark.css |
| imports | 690 | src/styles/tokens/motion-registers.css |
| imports | 691 | src/styles/tokens/offsets.css |
| imports | 692 | src/styles/tokens/on-glass-fg.css |
| imports | 693 | src/styles/tokens/property-regs-specular.css |
| imports | 694 | src/styles/tokens/property-regs.css |
| imports | 695 | src/styles/tokens/scale-paper.css |
| imports | 696 | src/styles/tokens/scheme-motion.css |
| imports | 697 | src/styles/tokens/scheme-spring.css |
| imports | 698 | src/styles/tokens/scroll-tokens.css |
| imports | 699 | src/styles/tokens/shadow.css |
| imports | 700 | src/styles/tokens/sizing-config.css |
| imports | 701 | src/styles/tokens/sizing.css |
| imports | 702 | src/styles/transitions.css |
| imports | 703 | src/styles/typography.css |
| imports | 704 | src/styles/typography/scale.css |
| imports | 705 | src/styles/typography/semantic.css |
| imports | 706 | src/styles/typography/utilities.css |
| imports | 707 | src/styles/utilities.css |
| imports | 708 | src/styles/utilities/a11y-overrides.css |
| imports | 709 | src/styles/utilities/animate.css |
| imports | 710 | src/styles/utilities/base-misc.css |
| imports | 711 | src/styles/utilities/base.css |
| imports | 712 | src/styles/utilities/btn.css |
| imports | 713 | src/styles/utilities/components.css |
| imports | 714 | src/styles/utilities/metal.css |
| imports | 715 | src/styles/view-transition.css |
| imports | 716 | src/styles/viz-reveal.css |
| tests | 1 | tests/styles/token-graph.test.ts |
| build | 1 | src/styles/index.css |
| build | 2 | vite.style-assets.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P015/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every live token has one semantic definition, typed domain, computed consumer, and accessible mode resolution; no alias is needed to preserve an old name.

**Required mutation bite:** Create an old→new token alias and a definition with no computed read; both must fail with exact graph paths.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P015`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| design.token-graph | device-free | Every semantic token has one definition, typed domain, live consumer, valid dark/contrast resolution, and no alias cycle or dead rung. | Create a token alias cycle.; Add a defined token with no computed consumer. |

## π obligation

Device-free: Token graph semantics are device-free here; painted material waves validate resolved values.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P014 | The sole verifier discovers the settled semantic graph rather than pre-move paths, every external predicate is executable through its owning wave, every mutation remains discriminating, and no historical command, family command, table roster, or fixed subject count returns. |

Declared semantic locks: `global-tokens`. The cursor also acquires 721 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
