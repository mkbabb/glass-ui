# Glass UI library and demo import DAG — corrected v2

Observed: 2026-07-28T18:07:35.341Z

Graph receipt: `1f8124e4c3e1a87a5bcc79c8b6ce89b0c8862a044017d63ce6197057ee1581ed`

## Scope and result

This is a complete file inventory for `src/` and `demo/`. Edges cover
static imports, export-from declarations, literal dynamic imports, CSS imports,
local CSS assets, Vue external block sources, and expanded literal Vite
`import.meta.glob` targets. External package edges remain explicit. An
unresolved relative, `@glass`, or glob edge is a graph defect, not silently
discarded.

| Measure | Count |
| --- | ---: |
| Nodes | 890 |
| Internal edges | 2308 |
| External edges | 623 |
| Repository-boundary edges | 1 |
| Unresolved internal edges | 0 |
| Unresolved glob patterns | 0 |
| Leaf modules | 112 |
| Review batches | 5 |
| File cycles | 10 |
| Cross-module edge pairs | 518 |
| Module cycles | 3 |
| Isolated nodes | 34 |
| Tests under product roots | 0 |
| Module-prefix candidates | 146 |

## Review batches

Every node belongs to exactly one leaf module and every leaf module belongs to
exactly one review batch. Reviewers must account for every batch; they may split
a batch along the recorded leaf-module boundaries when its local dependency
shape demands it.

| Batch | Leaf modules | Nodes | Lines |
| --- | ---: | ---: | ---: |
| `components` | 64 | 505 | 60573 |
| `composables` | 9 | 103 | 16219 |
| `demo` | 28 | 191 | 31941 |
| `root-and-build` | 5 | 15 | 1570 |
| `styles` | 6 | 76 | 12879 |

## Cycles

| Cycle | Members |
| --- | --- |
| C01 | `demo/chassis/landing/SectionPreviewCard.vue`<br>`demo/chassis/landing/storyTile.ts`<br>`demo/chassis/page/StoryPage.vue`<br>`demo/chassis/useStoryNavigation.ts`<br>`demo/stories/compositions/auth-shell.vue`<br>`demo/stories/compositions/chassis.vue`<br>`demo/stories/compositions/empty-states.vue`<br>`demo/stories/compositions/form-validation.vue`<br>`demo/stories/compositions/gate-pattern.vue`<br>`demo/stories/compositions/settings.vue`<br>`demo/stories/containers/accordion.vue`<br>`demo/stories/containers/collapsible.vue`<br>`demo/stories/containers/command.vue`<br>`demo/stories/containers/configurator.vue`<br>`demo/stories/containers/context-menu.vue`<br>`demo/stories/containers/dialog.vue`<br>`demo/stories/containers/drawer.vue`<br>`demo/stories/containers/dropdown-menu.vue`<br>`demo/stories/containers/expandable-container.vue`<br>`demo/stories/containers/hover-card.vue`<br>`demo/stories/containers/hover-popover.vue`<br>`demo/stories/containers/popover.vue`<br>`demo/stories/containers/sheet.vue`<br>`demo/stories/containers/tooltip.vue`<br>`demo/stories/data/avatar.vue`<br>`demo/stories/data/data-table.vue`<br>`demo/stories/data/infinite-scroll.vue`<br>`demo/stories/data/instrument-chassis.vue`<br>`demo/stories/data/metric.vue`<br>`demo/stories/data/search.vue`<br>`demo/stories/data/sortable-list.vue`<br>`demo/stories/data/table.vue`<br>`demo/stories/data/tags-input.vue`<br>`demo/stories/data/timeline.vue`<br>`demo/stories/data/virtual-section.vue`<br>`demo/stories/display/atoms.vue`<br>`demo/stories/display/badge.vue`<br>`demo/stories/display/buttons.vue`<br>`demo/stories/display/card.vue`<br>`demo/stories/display/dark-mode-toggle.vue`<br>`demo/stories/display/separator.vue`<br>`demo/stories/display/status-dot.vue`<br>`demo/stories/display/surface.vue`<br>`demo/stories/dock/controls.vue`<br>`demo/stories/dock/cta-receive.vue`<br>`demo/stories/dock/dock-search.vue`<br>`demo/stories/dock/layers.vue`<br>`demo/stories/dock/overflow.vue`<br>`demo/stories/dock/overview.vue`<br>`demo/stories/dock/rail.vue`<br>`demo/stories/dock/sections.vue`<br>`demo/stories/feedback/alert.vue`<br>`demo/stories/feedback/completion-seal.vue`<br>`demo/stories/feedback/confirm-dialog.vue`<br>`demo/stories/feedback/progress.vue`<br>`demo/stories/feedback/skeleton.vue`<br>`demo/stories/feedback/toast.vue`<br>`demo/stories/feedback/toaster.vue`<br>`demo/stories/forms/checks.vue`<br>`demo/stories/forms/chip.vue`<br>`demo/stories/forms/inputs.vue`<br>`demo/stories/forms/label.vue`<br>`demo/stories/forms/labeled-field.vue`<br>`demo/stories/forms/number-field.vue`<br>`demo/stories/forms/select.vue`<br>`demo/stories/forms/slider.vue`<br>`demo/stories/forms/textarea.vue`<br>`demo/stories/forms/toggle.vue`<br>`demo/stories/foundations/chart-palette.vue`<br>`demo/stories/foundations/colors.vue`<br>`demo/stories/foundations/css-utilities.vue`<br>`demo/stories/foundations/icons.vue`<br>`demo/stories/foundations/intro.vue`<br>`demo/stories/foundations/motion.vue`<br>`demo/stories/foundations/overlays-scrims.vue`<br>`demo/stories/foundations/paper-glass.vue`<br>`demo/stories/foundations/paper-texture.vue`<br>`demo/stories/foundations/radii.vue`<br>`demo/stories/foundations/shadows.vue`<br>`demo/stories/foundations/surface-tints.vue`<br>`demo/stories/foundations/typography.vue`<br>`demo/stories/manifest.ts`<br>`demo/stories/motion/animated-digit.vue`<br>`demo/stories/motion/countup.vue`<br>`demo/stories/motion/curve-gallery.vue`<br>`demo/stories/motion/deck.vue`<br>`demo/stories/motion/handmark.vue`<br>`demo/stories/motion/reveal.vue`<br>`demo/stories/motion/scroll.vue`<br>`demo/stories/motion/springs.vue`<br>`demo/stories/motion/tempo.vue`<br>`demo/stories/motion/text-motion.vue`<br>`demo/stories/motion/typewriter.vue`<br>`demo/stories/navigation/carousel.vue`<br>`demo/stories/navigation/header-ribbon.vue`<br>`demo/stories/navigation/pager-dots.vue`<br>`demo/stories/navigation/tabs.vue`<br>`demo/stories/navigation/toc-tracking.vue`<br>`demo/stories/substrates/_frame/VizStudio.vue`<br>`demo/stories/substrates/aurora.vue`<br>`demo/stories/substrates/blob.vue`<br>`demo/stories/substrates/constellation.vue`<br>`demo/stories/substrates/fourier-field.vue`<br>`demo/stories/substrates/glass-material.vue`<br>`demo/stories/substrates/glass-panel.vue` |
| C02 | `src/components/drawer/Drawer.vue`<br>`src/components/drawer/DrawerContent.vue`<br>`src/components/drawer/DrawerOverlay.vue`<br>`src/components/drawer/composables/drawerSnapContext.ts`<br>`src/components/drawer/composables/useDrawerSnap.ts`<br>`src/components/drawer/constants.ts`<br>`src/components/drawer/index.ts` |
| C03 | `src/components/constellation/constants.ts`<br>`src/components/constellation/constellationField.ts`<br>`src/components/constellation/constellationInteraction.ts`<br>`src/components/constellation/constellationWell.ts` |
| C04 | `src/components/aurora/composables/frameLoop.ts`<br>`src/components/aurora/composables/glSetup.ts`<br>`src/components/aurora/composables/uniformBridge.ts` |
| C05 | `src/components/tabs/SegmentedTabs.vue`<br>`src/components/tabs/composables/useTabDragMorph.ts`<br>`src/components/tabs/composables/useTabResponsive.ts` |
| C06 | `src/components/_shared/interaction.ts`<br>`src/components/_shared/selection.ts` |
| C07 | `src/components/alert/Alert.vue`<br>`src/components/alert/index.ts` |
| C08 | `src/components/badge/Badge.vue`<br>`src/components/badge/index.ts` |
| C09 | `src/composables/color/accent-tone-solve.ts`<br>`src/composables/color/useAccentTone.ts` |
| C10 | `src/composables/glass/webgl/createCanvasLifecycle.ts`<br>`src/composables/glass/webgl/visibility.ts` |

## Module cycles

Module SCCs expose dependency knots that file-only cycles can hide. The
adjudication must account for each cross-module member and cut direction.

| Module cycle | Members |
| --- | --- |
| M01 | `demo/chassis`<br>`demo/chassis/landing`<br>`demo/chassis/page`<br>`demo/stories`<br>`demo/stories/compositions`<br>`demo/stories/containers`<br>`demo/stories/data`<br>`demo/stories/display`<br>`demo/stories/dock`<br>`demo/stories/feedback`<br>`demo/stories/forms`<br>`demo/stories/foundations`<br>`demo/stories/motion`<br>`demo/stories/navigation`<br>`demo/stories/substrates` |
| M02 | `src/components/_shared`<br>`src/components/dock`<br>`src/components/dropdown-menu`<br>`src/components/search`<br>`src/components/select`<br>`src/components/tabs`<br>`src/components/tooltip`<br>`src/composables/glass`<br>`src/composables/motion` |
| M03 | `demo`<br>`demo/shell` |

## Mechanical module-prefix candidates

These are candidates, not automatic renames. The three-pass review must reject
false positives and apply the generalized rule: once a directory supplies the
module name, child filenames do not repeat it.

| Path | Repeated directory prefix | Candidate basename |
| --- | --- | --- |
| `src/components/_shared/disclosure/disclosure-context.ts` | `disclosure` | `context` |
| `src/components/_shared/field/field-control.css` | `field` | `control` |
| `src/components/_shared/field/field-surfaces.css` | `field` | `surfaces` |
| `src/components/_shared/field/fieldControl.ts` | `field` | `control` |
| `src/components/_shared/menu/menuRowClass.ts` | `menu` | `row-class` |
| `src/components/accordion/AccordionContent.vue` | `accordion` | `content` |
| `src/components/accordion/AccordionItem.vue` | `accordion` | `item` |
| `src/components/accordion/AccordionTrigger.vue` | `accordion` | `trigger` |
| `src/components/alert/AlertDescription.vue` | `alert` | `description` |
| `src/components/alert/AlertTitle.vue` | `alert` | `title` |
| `src/components/avatar/AvatarFallback.vue` | `avatar` | `fallback` |
| `src/components/avatar/AvatarImage.vue` | `avatar` | `image` |
| `src/components/card/card-scroll.css` | `card` | `scroll` |
| `src/components/card/CardAction.vue` | `card` | `action` |
| `src/components/card/CardContent.vue` | `card` | `content` |
| `src/components/card/CardDescription.vue` | `card` | `description` |
| `src/components/card/CardFooter.vue` | `card` | `footer` |
| `src/components/card/CardHeader.vue` | `card` | `header` |
| `src/components/card/CardTitle.vue` | `card` | `title` |
| `src/components/carousel/CarouselContent.vue` | `carousel` | `content` |
| `src/components/carousel/CarouselItem.vue` | `carousel` | `item` |
| `src/components/carousel/CarouselPager.vue` | `carousel` | `pager` |
| `src/components/chip/chipVariants.ts` | `chip` | `variants` |
| `src/components/collapsible/CollapsibleContent.vue` | `collapsible` | `content` |
| `src/components/collapsible/CollapsibleTrigger.vue` | `collapsible` | `trigger` |
| `src/components/command/CommandDialog.vue` | `command` | `dialog` |
| `src/components/command/CommandEmpty.vue` | `command` | `empty` |
| `src/components/command/CommandGroup.vue` | `command` | `group` |
| `src/components/command/CommandInput.vue` | `command` | `input` |
| `src/components/command/CommandItem.vue` | `command` | `item` |
| `src/components/command/CommandList.vue` | `command` | `list` |
| `src/components/command/CommandSeparator.vue` | `command` | `separator` |
| `src/components/command/CommandShortcut.vue` | `command` | `shortcut` |
| `src/components/configurator/ConfiguratorLayer.vue` | `configurator` | `layer` |
| `src/components/configurator/ConfiguratorRow.vue` | `configurator` | `row` |
| `src/components/constellation/constellationField.ts` | `constellation` | `field` |
| `src/components/constellation/constellationInteraction.ts` | `constellation` | `interaction` |
| `src/components/constellation/constellationRender.ts` | `constellation` | `render` |
| `src/components/constellation/constellationTypes.ts` | `constellation` | `types` |
| `src/components/constellation/constellationWell.ts` | `constellation` | `well` |
| `src/components/dialog/DialogClose.vue` | `dialog` | `close` |
| `src/components/dialog/DialogContent.vue` | `dialog` | `content` |
| `src/components/dialog/DialogDescription.vue` | `dialog` | `description` |
| `src/components/dialog/DialogFooter.vue` | `dialog` | `footer` |
| `src/components/dialog/DialogHeader.vue` | `dialog` | `header` |
| `src/components/dialog/dialogStageContext.ts` | `dialog` | `stage-context` |
| `src/components/dialog/DialogTitle.vue` | `dialog` | `title` |
| `src/components/dialog/DialogTrigger.vue` | `dialog` | `trigger` |
| `src/components/dock/DockBackgroundToggle.vue` | `dock` | `background-toggle` |
| `src/components/dock/DockControl.vue` | `dock` | `control` |
| `src/components/dock/DockCrossfade.vue` | `dock` | `crossfade` |
| `src/components/dock/DockLayer.vue` | `dock` | `layer` |
| `src/components/dock/DockLayerGroup.vue` | `dock` | `layer-group` |
| `src/components/dock/DockSeparator.vue` | `dock` | `separator` |
| `src/components/dock/DockTrigger.vue` | `dock` | `trigger` |
| `src/components/drawer/DrawerContent.vue` | `drawer` | `content` |
| `src/components/drawer/DrawerDescription.vue` | `drawer` | `description` |
| `src/components/drawer/DrawerFooter.vue` | `drawer` | `footer` |
| `src/components/drawer/DrawerHeader.vue` | `drawer` | `header` |
| `src/components/drawer/DrawerOverlay.vue` | `drawer` | `overlay` |
| `src/components/drawer/DrawerTitle.vue` | `drawer` | `title` |
| `src/components/dropdown-menu/DropdownMenuCheckboxItem.vue` | `dropdown-menu` | `checkbox-item` |
| `src/components/dropdown-menu/DropdownMenuContent.vue` | `dropdown-menu` | `content` |
| `src/components/dropdown-menu/DropdownMenuGroup.vue` | `dropdown-menu` | `group` |
| `src/components/dropdown-menu/DropdownMenuItem.vue` | `dropdown-menu` | `item` |
| `src/components/dropdown-menu/DropdownMenuLabel.vue` | `dropdown-menu` | `label` |
| `src/components/dropdown-menu/DropdownMenuRadioGroup.vue` | `dropdown-menu` | `radio-group` |
| `src/components/dropdown-menu/DropdownMenuRadioItem.vue` | `dropdown-menu` | `radio-item` |
| `src/components/dropdown-menu/DropdownMenuSeparator.vue` | `dropdown-menu` | `separator` |
| `src/components/dropdown-menu/DropdownMenuShortcut.vue` | `dropdown-menu` | `shortcut` |
| `src/components/dropdown-menu/DropdownMenuSub.vue` | `dropdown-menu` | `sub` |
| `src/components/dropdown-menu/DropdownMenuSubContent.vue` | `dropdown-menu` | `sub-content` |
| `src/components/dropdown-menu/DropdownMenuSubTrigger.vue` | `dropdown-menu` | `sub-trigger` |
| `src/components/dropdown-menu/DropdownMenuTrigger.vue` | `dropdown-menu` | `trigger` |
| `src/components/easing/EasingConfigurator.vue` | `easing` | `configurator` |
| `src/components/easing/EasingPicker.vue` | `easing` | `picker` |
| `src/components/metric/MetricCell.vue` | `metric` | `cell` |
| `src/components/metric/MetricRow.vue` | `metric` | `row` |
| `src/components/metric/MetricStack.vue` | `metric` | `stack` |
| `src/components/number-field/NumberFieldContent.vue` | `number-field` | `content` |
| `src/components/number-field/NumberFieldDecrement.vue` | `number-field` | `decrement` |
| `src/components/number-field/NumberFieldIncrement.vue` | `number-field` | `increment` |
| `src/components/number-field/NumberFieldInput.vue` | `number-field` | `input` |
| `src/components/popover/PopoverContent.vue` | `popover` | `content` |
| `src/components/popover/popoverContext.ts` | `popover` | `context` |
| `src/components/popover/PopoverTrigger.vue` | `popover` | `trigger` |
| `src/components/radio-group/RadioGroupItem.vue` | `radio-group` | `item` |
| `src/components/search/SearchBar.vue` | `search` | `bar` |
| `src/components/search/searchVariants.ts` | `search` | `variants` |
| `src/components/select/SelectContent.vue` | `select` | `content` |
| `src/components/select/SelectGroup.vue` | `select` | `group` |
| `src/components/select/SelectItem.vue` | `select` | `item` |
| `src/components/select/SelectLabel.vue` | `select` | `label` |
| `src/components/select/SelectScrollDownButton.vue` | `select` | `scroll-down-button` |
| `src/components/select/SelectScrollUpButton.vue` | `select` | `scroll-up-button` |
| `src/components/select/SelectSeparator.vue` | `select` | `separator` |
| `src/components/select/SelectTrigger.vue` | `select` | `trigger` |
| `src/components/select/SelectValue.vue` | `select` | `value` |
| `src/components/table/TableBody.vue` | `table` | `body` |
| `src/components/table/TableCaption.vue` | `table` | `caption` |
| `src/components/table/TableCell.vue` | `table` | `cell` |
| `src/components/table/TableEmpty.vue` | `table` | `empty` |
| `src/components/table/TableHead.vue` | `table` | `head` |
| `src/components/table/TableHeader.vue` | `table` | `header` |
| `src/components/table/TableRow.vue` | `table` | `row` |
| `src/components/tags-input/TagsInputInput.vue` | `tags-input` | `input` |
| `src/components/tags-input/TagsInputItem.vue` | `tags-input` | `item` |
| `src/components/tags-input/TagsInputItemDelete.vue` | `tags-input` | `item-delete` |
| `src/components/tags-input/TagsInputItemText.vue` | `tags-input` | `item-text` |
| `src/components/toast/ToastAction.vue` | `toast` | `action` |
| `src/components/toast/ToastClose.vue` | `toast` | `close` |
| `src/components/toast/ToastDescription.vue` | `toast` | `description` |
| `src/components/toast/ToastTitle.vue` | `toast` | `title` |
| `src/components/toggle-group/toggleGroupContext.ts` | `toggle-group` | `context` |
| `src/components/toggle-group/ToggleGroupItem.vue` | `toggle-group` | `item` |
| `src/components/tooltip/TooltipContent.vue` | `tooltip` | `content` |
| `src/components/tooltip/TooltipProvider.vue` | `tooltip` | `provider` |
| `src/components/tooltip/TooltipTrigger.vue` | `tooltip` | `trigger` |
| `src/components/typewriter/TypewriterText.vue` | `typewriter` | `text` |
| `src/composables/dark/darkModeSyncScript.ts` | `dark` | `mode-sync-script` |
| `src/composables/glass/webgpu/webgpuCanvasTypes.ts` | `webgpu` | `canvas-types` |
| `src/composables/glass/webgpu/webgpuDevice.ts` | `webgpu` | `device` |
| `src/composables/motion/pointer/pointerFieldMappings.ts` | `pointer` | `field-mappings` |
| `src/composables/motion/scroll/scrollReader.ts` | `scroll` | `reader` |
| `src/composables/motion/spring/springPresets.ts` | `spring` | `presets` |
| `src/composables/motion/spring/springProjection.ts` | `spring` | `projection` |
| `src/fonts/fira-code/fira-code-latin-ext.woff2` | `fira-code` | `latin-ext` |
| `src/fonts/fira-code/fira-code-latin.woff2` | `fira-code` | `latin` |
| `src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin-ext.woff2` | `plus-jakarta-sans` | `latin-ext` |
| `src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin.woff2` | `plus-jakarta-sans` | `latin` |
| `src/styles/glass/glass-atom.css` | `glass` | `atom` |
| `src/styles/glass/glass-capsule.css` | `glass` | `capsule` |
| `src/styles/glass/glass-chip.css` | `glass` | `chip` |
| `demo/chassis/code/CodeBlock.vue` | `code` | `block` |
| `demo/chassis/family/FamilyTabs.vue` | `family` | `tabs` |
| `demo/chassis/showcase/ShowcaseFrame.vue` | `showcase` | `frame` |
| `demo/composables/virtual/virtualSectionLayout.ts` | `virtual` | `section-layout` |
| `demo/stories/data/data-table.vue` | `data` | `table` |
| `demo/stories/data/timeline/TimelineContinuousBody.vue` | `timeline` | `continuous-body` |
| `demo/stories/data/timeline/TimelineSegmentedBody.vue` | `timeline` | `segmented-body` |
| `demo/stories/dock/dock-search.vue` | `dock` | `search` |
| `demo/stories/motion/scroll/ScrollChoreographyBody.vue` | `scroll` | `choreography-body` |
| `demo/stories/motion/scroll/ScrollNativeBody.vue` | `scroll` | `native-body` |
| `demo/stories/motion/scroll/ScrollReaderBody.vue` | `scroll` | `reader-body` |
| `demo/stories/substrates/aurora/AuroraConfigDock.vue` | `aurora` | `config-dock` |
| `demo/stories/substrates/aurora/AuroraStage.vue` | `aurora` | `stage` |

## Leaf-module ledger

| Module | Batch | Nodes | Lines | Edges in | Edges out | External edges |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `src/components/aurora` | `components` | 37 | 9242 | 102 | 99 | 6 |
| `src/components/dock` | `components` | 45 | 8091 | 92 | 87 | 27 |
| `src/composables/motion` | `composables` | 41 | 7226 | 152 | 76 | 33 |
| `src/components/blob` | `components` | 28 | 6056 | 73 | 81 | 7 |
| `demo/stories/substrates` | `demo` | 27 | 5803 | 39 | 120 | 25 |
| `src/composables/glass` | `composables` | 26 | 4766 | 78 | 32 | 6 |
| `src/styles/tokens` | `styles` | 20 | 4551 | 20 | 0 | 1 |
| `src/styles/glass` | `styles` | 22 | 3358 | 22 | 0 | 0 |
| `src/components/constellation` | `components` | 11 | 3004 | 28 | 35 | 2 |
| `src/components/fourier-field` | `components` | 13 | 2963 | 27 | 48 | 2 |
| `demo/stories/containers` | `demo` | 14 | 2905 | 14 | 74 | 15 |
| `demo/stories/data` | `demo` | 13 | 2864 | 14 | 61 | 14 |
| `demo/stories/dock` | `demo` | 10 | 2505 | 17 | 52 | 17 |
| `src/styles/_root` | `styles` | 20 | 2409 | 18 | 93 | 8 |
| `demo/stories/motion` | `demo` | 14 | 2407 | 17 | 77 | 17 |
| `src/components/handmark` | `components` | 12 | 2318 | 28 | 29 | 5 |
| `src/components/timeline` | `components` | 10 | 2280 | 21 | 22 | 4 |
| `demo/stories/foundations` | `demo` | 13 | 1806 | 14 | 49 | 6 |
| `src/components/drawer` | `components` | 12 | 1625 | 22 | 30 | 15 |
| `demo/shell` | `demo` | 9 | 1601 | 13 | 38 | 13 |
| `src/composables/dom` | `composables` | 12 | 1590 | 31 | 11 | 9 |
| `src/components/tabs` | `components` | 9 | 1551 | 16 | 16 | 4 |
| `src/components/configurator` | `components` | 7 | 1534 | 20 | 14 | 7 |
| `src/components/_shared` | `components` | 19 | 1421 | 307 | 7 | 5 |
| `src/components/typewriter` | `components` | 9 | 1418 | 22 | 22 | 2 |
| `demo/stories/forms` | `demo` | 11 | 1350 | 15 | 48 | 11 |
| `demo/shell/configurator` | `demo` | 12 | 1315 | 23 | 31 | 4 |
| `src/styles/utilities` | `styles` | 7 | 1260 | 7 | 0 | 0 |
| `demo/stories/compositions` | `demo` | 6 | 1169 | 6 | 39 | 8 |
| `src/components/sortable-list` | `components` | 13 | 1168 | 26 | 25 | 7 |
| `src/composables/sidebar` | `composables` | 9 | 1152 | 18 | 16 | 7 |
| `demo/stories` | `demo` | 1 | 1118 | 7 | 111 | 2 |
| `demo/stories/feedback` | `demo` | 8 | 1107 | 9 | 33 | 7 |
| `src/components/easing` | `components` | 6 | 1090 | 9 | 14 | 5 |
| `src/components/dialog` | `components` | 13 | 1072 | 29 | 30 | 16 |
| `demo/stories/display` | `demo` | 10 | 1047 | 15 | 41 | 6 |
| `src/components/dropdown-menu` | `components` | 17 | 1030 | 37 | 62 | 20 |
| `demo/chassis/hero` | `demo` | 7 | 930 | 18 | 15 | 2 |
| `src/components/pager-dots` | `components` | 6 | 926 | 7 | 8 | 2 |
| `demo/stories/navigation` | `demo` | 5 | 911 | 5 | 21 | 5 |
| `src/components/data-table` | `components` | 6 | 794 | 10 | 11 | 4 |
| `src/styles/theme` | `styles` | 4 | 693 | 4 | 0 | 0 |
| `src/components/completion-seal` | `components` | 6 | 660 | 7 | 7 | 2 |
| `src/components/slider` | `components` | 3 | 652 | 14 | 11 | 3 |
| `src/components/select` | `components` | 11 | 611 | 22 | 36 | 22 |
| `src/styles/typography` | `styles` | 3 | 608 | 3 | 0 | 0 |
| `src/composables/color` | `composables` | 4 | 604 | 23 | 5 | 6 |
| `demo/chassis/landing` | `demo` | 5 | 596 | 9 | 13 | 4 |
| `src/components/search` | `components` | 7 | 569 | 15 | 16 | 4 |
| `src/components/toast` | `components` | 8 | 568 | 16 | 21 | 14 |
| `demo/composables/virtual` | `demo` | 3 | 543 | 5 | 5 | 1 |
| `src/components/watercolor-dot` | `components` | 4 | 513 | 9 | 8 | 2 |
| `demo/chassis/code` | `demo` | 4 | 506 | 5 | 8 | 9 |
| `src/components/carousel` | `components` | 8 | 498 | 18 | 22 | 9 |
| `demo` | `root-and-build` | 5 | 492 | 4 | 18 | 9 |
| `src/components/command` | `components` | 13 | 490 | 20 | 42 | 18 |
| `src/components/labeled-field` | `components` | 8 | 447 | 29 | 24 | 4 |
| `demo/chassis/body` | `demo` | 2 | 442 | 7 | 3 | 2 |
| `src/components/card` | `components` | 10 | 418 | 23 | 17 | 7 |
| `src/components/metric` | `components` | 9 | 417 | 16 | 17 | 4 |
| `src/components/fading-scroll` | `components` | 5 | 396 | 11 | 6 | 2 |
| `src` | `root-and-build` | 3 | 375 | 1 | 45 | 2 |
| `src/components/popover` | `components` | 5 | 344 | 14 | 15 | 7 |
| `src/composables/dark` | `composables` | 4 | 338 | 9 | 4 | 3 |
| `src/components/chip` | `components` | 6 | 333 | 12 | 10 | 3 |
| `src/components/toggle-group` | `components` | 5 | 328 | 12 | 15 | 4 |
| `src/components/tags-input` | `components` | 8 | 316 | 11 | 17 | 12 |
| `src/components/expandable-container` | `components` | 4 | 309 | 3 | 4 | 3 |
| `src/components/progress` | `components` | 3 | 309 | 6 | 6 | 3 |
| `src/fonts/fira-code` | `root-and-build` | 3 | 297 | 2 | 0 | 0 |
| `src/components/button` | `components` | 3 | 296 | 58 | 6 | 2 |
| `src/composables/keyboard` | `composables` | 2 | 295 | 4 | 1 | 2 |
| `src/components/accordion` | `components` | 5 | 294 | 7 | 13 | 9 |
| `src/fonts/plus-jakarta-sans` | `root-and-build` | 3 | 285 | 2 | 0 | 0 |
| `src/components/deck` | `components` | 5 | 282 | 5 | 4 | 2 |
| `src/components/status-dot` | `components` | 4 | 281 | 6 | 4 | 1 |
| `demo/capture` | `demo` | 2 | 264 | 2 | 0 | 0 |
| `src/components/instrument-chassis` | `components` | 5 | 262 | 5 | 4 | 2 |
| `src/components/scroll-progress-rim` | `components` | 4 | 252 | 5 | 3 | 1 |
| `src/components/number-field` | `components` | 8 | 250 | 11 | 19 | 12 |
| `src/components/avatar` | `components` | 5 | 236 | 8 | 5 | 6 |
| `src/components/radio-group` | `components` | 4 | 228 | 7 | 10 | 4 |
| `src/components/tooltip` | `components` | 5 | 194 | 12 | 9 | 6 |
| `src/components/table` | `components` | 9 | 186 | 14 | 18 | 8 |
| `src/components/infinite-scroll` | `components` | 5 | 183 | 7 | 6 | 3 |
| `src/components/collapsible` | `components` | 4 | 176 | 6 | 11 | 6 |
| `src/components/dark-mode-toggle` | `components` | 4 | 172 | 4 | 4 | 1 |
| `demo/chassis` | `demo` | 4 | 166 | 10 | 5 | 5 |
| `src/components/switch` | `components` | 3 | 164 | 11 | 5 | 2 |
| `src/components/separator` | `components` | 2 | 156 | 6 | 3 | 2 |
| `src/composables/reactive` | `composables` | 3 | 154 | 4 | 2 | 2 |
| `demo/chassis/showcase` | `demo` | 2 | 152 | 31 | 3 | 2 |
| `src/components/header-ribbon` | `components` | 5 | 136 | 5 | 6 | 2 |
| `src/fonts` | `root-and-build` | 1 | 121 | 0 | 0 | 0 |
| `src/components/checkbox` | `components` | 3 | 120 | 6 | 4 | 3 |
| `src/components/_root` | `components` | 2 | 119 | 0 | 31 | 0 |
| `src/components/alert` | `components` | 4 | 115 | 7 | 8 | 3 |
| `src/components/animated-digit` | `components` | 3 | 114 | 2 | 3 | 1 |
| `src/components/surface` | `components` | 2 | 112 | 12 | 7 | 2 |
| `demo/chassis/page` | `demo` | 1 | 108 | 97 | 7 | 1 |
| `src/components/skeleton` | `components` | 2 | 97 | 5 | 2 | 1 |
| `demo/chassis/family` | `demo` | 2 | 94 | 7 | 2 | 2 |
| `src/components/label` | `components` | 2 | 94 | 21 | 2 | 2 |
| `src/composables/context` | `composables` | 2 | 94 | 10 | 1 | 1 |
| `src/components/badge` | `components` | 2 | 89 | 11 | 4 | 1 |
| `src/components/input` | `components` | 3 | 85 | 16 | 7 | 3 |
| `src/components/textarea` | `components` | 3 | 85 | 9 | 7 | 3 |
| `demo/examples` | `demo` | 3 | 75 | 6 | 6 | 0 |
| `demo/chassis/play` | `demo` | 1 | 67 | 1 | 1 | 2 |
| `demo/chassis/section` | `demo` | 1 | 64 | 87 | 1 | 1 |
| `src/components/paper-backdrop` | `components` | 3 | 34 | 2 | 1 | 1 |
| `demo/stories/manifest` | `demo` | 1 | 26 | 1 | 0 | 1 |

## Machine-readable evidence

`IMPORT-DAG-V2.json` contains every node, file edge, cross-module edge,
file/module strongly connected component, isolated node, fan-in/fan-out
ranking, module-prefix candidate, and complete leaf-module assignment. It is
the corrected review substrate; this summary is only its human index.
