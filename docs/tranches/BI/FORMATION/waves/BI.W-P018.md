# BI.W-P018 — Depth, concentricity, radius, and shadow grammar

**Status:** PLANNED
**Topological stratum:** BI.S11
**Formation family:** design-foundation
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P018`

## Intent

Make elevation and nested geometry monotonic, concentric, and restrained across components and overlays.

## Exact scope

- Derive child radii/insets from parent geometry and semantic size rather than independent literals.
- Collapse cartoon/glass/elevation shadow aliases into one semantic depth grammar.
- Remove double shadows, glow stacks, dead radius variants, and shape mismatches at narrow/coarse sizes.
- Measure overlay/content ordering on representative nested scenarios.

## File manifest (326)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 2 | create | src/components/_shared/geometry.ts | — | — | source base |
| 3 | repair | src/components/_shared/ModalOverlay.vue | — | — | BI.W-P008 |
| 4 | repair | src/components/accordion/Accordion.vue | — | — | BI.W-P008 |
| 5 | repair | src/components/accordion/AccordionContent.vue | — | — | BI.W-P008 |
| 6 | repair | src/components/accordion/AccordionItem.vue | — | — | BI.W-P008 |
| 7 | repair | src/components/accordion/AccordionTrigger.vue | — | — | BI.W-P008 |
| 8 | repair | src/components/alert/Alert.vue | — | — | BI.W-P008 |
| 9 | repair | src/components/alert/AlertDescription.vue | — | — | BI.W-P008 |
| 10 | repair | src/components/alert/AlertTitle.vue | — | — | BI.W-P008 |
| 11 | repair | src/components/animated-digit/AnimatedDigit.vue | — | — | BI.W-P008 |
| 12 | repair | src/components/aurora/Aurora.vue | — | — | BI.W-P008 |
| 13 | repair | src/components/avatar/Avatar.vue | — | — | BI.W-P008 |
| 14 | repair | src/components/avatar/AvatarFallback.vue | — | — | BI.W-P008 |
| 15 | repair | src/components/avatar/AvatarImage.vue | — | — | BI.W-P008 |
| 16 | repair | src/components/badge/Badge.vue | — | — | BI.W-P008 |
| 17 | repair | src/components/blob/Blob.vue | — | — | BI.W-P008 |
| 18 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 19 | repair | src/components/button/Button.vue | — | — | BI.W-P008 |
| 20 | repair | src/components/card/Card.vue | — | — | BI.W-P008 |
| 21 | repair | src/components/card/CardAction.vue | — | — | BI.W-P008 |
| 22 | repair | src/components/card/CardContent.vue | — | — | BI.W-P008 |
| 23 | repair | src/components/card/CardDescription.vue | — | — | BI.W-P008 |
| 24 | repair | src/components/card/CardFooter.vue | — | — | BI.W-P008 |
| 25 | repair | src/components/card/CardHeader.vue | — | — | BI.W-P008 |
| 26 | repair | src/components/card/CardTitle.vue | — | — | BI.W-P008 |
| 27 | repair | src/components/card/ScrollCard.vue | — | — | BI.W-P008 |
| 28 | repair | src/components/card/ScrollCardHeader.vue | — | — | BI.W-P008 |
| 29 | repair | src/components/carousel/Carousel.vue | — | — | BI.W-P008 |
| 30 | repair | src/components/carousel/CarouselContent.vue | — | — | BI.W-P008 |
| 31 | repair | src/components/carousel/CarouselItem.vue | — | — | BI.W-P008 |
| 32 | repair | src/components/carousel/CarouselNext.vue | — | — | BI.W-P008 |
| 33 | repair | src/components/carousel/CarouselPager.vue | — | — | BI.W-P008 |
| 34 | repair | src/components/carousel/CarouselPrevious.vue | — | — | BI.W-P008 |
| 35 | repair | src/components/carousel/GlassCarouselPager.vue | — | — | BI.W-P008 |
| 36 | repair | src/components/checkbox/Checkbox.vue | — | — | BI.W-P008 |
| 37 | repair | src/components/chip/Chip.vue | — | — | BI.W-P008 |
| 38 | repair | src/components/collapsible/Collapsible.vue | — | — | BI.W-P008 |
| 39 | repair | src/components/collapsible/CollapsibleContent.vue | — | — | BI.W-P008 |
| 40 | repair | src/components/collapsible/CollapsibleTrigger.vue | — | — | BI.W-P008 |
| 41 | repair | src/components/color-swatch/ColorSwatch.vue | — | — | BI.W-P008 |
| 42 | repair | src/components/combobox/Combobox.vue | — | — | BI.W-P008 |
| 43 | repair | src/components/combobox/ComboboxAnchor.vue | — | — | BI.W-P008 |
| 44 | repair | src/components/combobox/ComboboxEmpty.vue | — | — | BI.W-P008 |
| 45 | repair | src/components/combobox/ComboboxGroup.vue | — | — | BI.W-P008 |
| 46 | repair | src/components/combobox/ComboboxInput.vue | — | — | BI.W-P008 |
| 47 | repair | src/components/combobox/ComboboxItem.vue | — | — | BI.W-P008 |
| 48 | repair | src/components/combobox/ComboboxItemIndicator.vue | — | — | BI.W-P008 |
| 49 | repair | src/components/combobox/ComboboxList.vue | — | — | BI.W-P008 |
| 50 | repair | src/components/combobox/ComboboxSeparator.vue | — | — | BI.W-P008 |
| 51 | repair | src/components/combobox/ComboboxViewport.vue | — | — | BI.W-P008 |
| 52 | repair | src/components/command/Command.vue | — | — | BI.W-P008 |
| 53 | repair | src/components/command/CommandDialog.vue | — | — | BI.W-P008 |
| 54 | repair | src/components/command/CommandEmpty.vue | — | — | BI.W-P008 |
| 55 | repair | src/components/command/CommandGroup.vue | — | — | BI.W-P008 |
| 56 | repair | src/components/command/CommandInput.vue | — | — | BI.W-P008 |
| 57 | repair | src/components/command/CommandItem.vue | — | — | BI.W-P008 |
| 58 | repair | src/components/command/CommandList.vue | — | — | BI.W-P008 |
| 59 | repair | src/components/command/CommandSeparator.vue | — | — | BI.W-P008 |
| 60 | repair | src/components/command/CommandShortcut.vue | — | — | BI.W-P008 |
| 61 | repair | src/components/completion-seal/CompletionSeal.vue | — | — | BI.W-P008 |
| 62 | repair | src/components/configurator/Configurator.vue | — | — | BI.W-P008 |
| 63 | repair | src/components/configurator/ConfiguratorLayer.vue | — | — | BI.W-P008 |
| 64 | repair | src/components/configurator/ConfiguratorRow.vue | — | — | BI.W-P008 |
| 65 | repair | src/components/constellation/Constellation.vue | — | — | BI.W-P008 |
| 66 | repair | src/components/controls/DarkModeToggle.vue | — | — | BI.W-P008 |
| 67 | repair | src/components/data-table/DataTable.vue | — | — | BI.W-P008 |
| 68 | repair | src/components/data-table/DataTablePagination.vue | — | — | BI.W-P008 |
| 69 | repair | src/components/deck/DeckPager.vue | — | — | BI.W-P008 |
| 70 | repair | src/components/dialog/Dialog.vue | — | — | BI.W-P008 |
| 71 | repair | src/components/dialog/DialogClose.vue | — | — | BI.W-P008 |
| 72 | repair | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 73 | repair | src/components/dialog/DialogDescription.vue | — | — | BI.W-P008 |
| 74 | repair | src/components/dialog/DialogFooter.vue | — | — | BI.W-P008 |
| 75 | repair | src/components/dialog/DialogHeader.vue | — | — | BI.W-P008 |
| 76 | repair | src/components/dialog/DialogScrollContent.vue | — | — | BI.W-P008 |
| 77 | repair | src/components/dialog/DialogTitle.vue | — | — | BI.W-P008 |
| 78 | repair | src/components/dialog/DialogTrigger.vue | — | — | BI.W-P008 |
| 79 | repair | src/components/dock/DockBackgroundToggle.vue | — | — | BI.W-P008 |
| 80 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 81 | repair | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 82 | repair | src/components/dock/DockLayer.vue | — | — | BI.W-P008 |
| 83 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 84 | repair | src/components/dock/DockSection.vue | — | — | BI.W-P008 |
| 85 | repair | src/components/dock/DockSeparator.vue | — | — | BI.W-P008 |
| 86 | repair | src/components/dock/DockStack.vue | — | — | BI.W-P008 |
| 87 | repair | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 88 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 89 | repair | src/components/drawer/Drawer.vue | — | — | BI.W-P008 |
| 90 | repair | src/components/drawer/DrawerContent.vue | — | — | BI.W-P008 |
| 91 | repair | src/components/drawer/DrawerDescription.vue | — | — | BI.W-P008 |
| 92 | repair | src/components/drawer/DrawerFooter.vue | — | — | BI.W-P008 |
| 93 | repair | src/components/drawer/DrawerHeader.vue | — | — | BI.W-P008 |
| 94 | repair | src/components/drawer/DrawerOverlay.vue | — | — | BI.W-P008 |
| 95 | repair | src/components/drawer/DrawerTitle.vue | — | — | BI.W-P008 |
| 96 | repair | src/components/dropdown-menu/DropdownMenu.vue | — | — | BI.W-P008 |
| 97 | repair | src/components/dropdown-menu/DropdownMenuCheckboxItem.vue | — | — | BI.W-P008 |
| 98 | repair | src/components/dropdown-menu/DropdownMenuContent.vue | — | — | BI.W-P008 |
| 99 | repair | src/components/dropdown-menu/DropdownMenuGroup.vue | — | — | BI.W-P008 |
| 100 | repair | src/components/dropdown-menu/DropdownMenuItem.vue | — | — | BI.W-P008 |
| 101 | repair | src/components/dropdown-menu/DropdownMenuLabel.vue | — | — | BI.W-P008 |
| 102 | repair | src/components/dropdown-menu/DropdownMenuRadioGroup.vue | — | — | BI.W-P008 |
| 103 | repair | src/components/dropdown-menu/DropdownMenuRadioItem.vue | — | — | BI.W-P008 |
| 104 | repair | src/components/dropdown-menu/DropdownMenuSeparator.vue | — | — | BI.W-P008 |
| 105 | repair | src/components/dropdown-menu/DropdownMenuShortcut.vue | — | — | BI.W-P008 |
| 106 | repair | src/components/dropdown-menu/DropdownMenuSub.vue | — | — | BI.W-P008 |
| 107 | repair | src/components/dropdown-menu/DropdownMenuSubContent.vue | — | — | BI.W-P008 |
| 108 | repair | src/components/dropdown-menu/DropdownMenuSubTrigger.vue | — | — | BI.W-P008 |
| 109 | repair | src/components/dropdown-menu/DropdownMenuTrigger.vue | — | — | BI.W-P008 |
| 110 | repair | src/components/easing/EasingConfigurator.vue | — | — | BI.W-P008 |
| 111 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 112 | repair | src/components/expandable-container/ExpandableContainer.vue | — | — | BI.W-P008 |
| 113 | repair | src/components/fading-scroll/FadingScroll.vue | — | — | BI.W-P008 |
| 114 | repair | src/components/focus-scope/FocusScope.vue | — | — | BI.W-P008 |
| 115 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 116 | repair | src/components/goo-filter/GooFilter.vue | — | — | BI.W-P008 |
| 117 | repair | src/components/handmark/HandMark.vue | — | — | BI.W-P008 |
| 118 | repair | src/components/header-ribbon/HeaderRibbon.vue | — | — | BI.W-P008 |
| 119 | repair | src/components/icon-chip/IconChip.vue | — | — | BI.W-P008 |
| 120 | repair | src/components/icon-tooltip/IconTooltip.vue | — | — | BI.W-P008 |
| 121 | repair | src/components/infinite-scroll/InfiniteScroll.vue | — | — | BI.W-P008 |
| 122 | repair | src/components/input/Input.vue | — | — | BI.W-P008 |
| 123 | repair | src/components/instrument-chassis/ChassisDivider.vue | — | — | BI.W-P008 |
| 124 | repair | src/components/instrument-chassis/InstrumentChassis.vue | — | — | BI.W-P008 |
| 125 | repair | src/components/label/Label.vue | — | — | BI.W-P008 |
| 126 | repair | src/components/labeled-field/LabeledField.vue | — | — | BI.W-P008 |
| 127 | repair | src/components/labeled-field/LabeledInput.vue | — | — | BI.W-P008 |
| 128 | repair | src/components/labeled-field/LabeledSelect.vue | — | — | BI.W-P008 |
| 129 | repair | src/components/labeled-field/LabeledSlider.vue | — | — | BI.W-P008 |
| 130 | repair | src/components/labeled-field/LabeledSwitch.vue | — | — | BI.W-P008 |
| 131 | repair | src/components/liquid-grid/LiquidGrid.vue | — | — | BI.W-P008 |
| 132 | repair | src/components/metric-badge/MetricBadge.vue | — | — | BI.W-P008 |
| 133 | repair | src/components/metric-cell/MetricCell.vue | — | — | BI.W-P008 |
| 134 | repair | src/components/metric-stack/MetricRow.vue | — | — | BI.W-P008 |
| 135 | repair | src/components/metric-stack/MetricStack.vue | — | — | BI.W-P008 |
| 136 | repair | src/components/notification/Notification.vue | — | — | BI.W-P008 |
| 137 | repair | src/components/number-field/NumberField.vue | — | — | BI.W-P008 |
| 138 | repair | src/components/number-field/NumberFieldContent.vue | — | — | BI.W-P008 |
| 139 | repair | src/components/number-field/NumberFieldDecrement.vue | — | — | BI.W-P008 |
| 140 | repair | src/components/number-field/NumberFieldIncrement.vue | — | — | BI.W-P008 |
| 141 | repair | src/components/number-field/NumberFieldInput.vue | — | — | BI.W-P008 |
| 142 | repair | src/components/pager-dots/PagerDots.vue | — | — | BI.W-P008 |
| 143 | repair | src/components/paper-backdrop/PaperBackdrop.vue | — | — | BI.W-P008 |
| 144 | repair | src/components/popover/Popover.vue | — | — | BI.W-P008 |
| 145 | repair | src/components/popover/PopoverContent.vue | — | — | BI.W-P008 |
| 146 | repair | src/components/popover/PopoverTrigger.vue | — | — | BI.W-P008 |
| 147 | repair | src/components/progress/Progress.vue | — | — | BI.W-P008 |
| 148 | repair | src/components/progress/ProgressDefault.vue | — | — | BI.W-P008 |
| 149 | repair | src/components/progress/ProgressGradient.vue | — | — | BI.W-P008 |
| 150 | repair | src/components/progress/ProgressLiquid.vue | — | — | BI.W-P008 |
| 151 | repair | src/components/progress/ProgressSectioned.vue | — | — | BI.W-P008 |
| 152 | repair | src/components/pulse/Pulse.vue | — | — | BI.W-P008 |
| 153 | repair | src/components/radio-group/RadioGroup.vue | — | — | BI.W-P008 |
| 154 | repair | src/components/radio-group/RadioGroupItem.vue | — | — | BI.W-P008 |
| 155 | repair | src/components/search/FuzzySearch.vue | — | — | BI.W-P008 |
| 156 | repair | src/components/search/SearchBar.vue | — | — | BI.W-P008 |
| 157 | repair | src/components/section/Section.vue | — | — | BI.W-P008 |
| 158 | repair | src/components/select/Select.vue | — | — | BI.W-P008 |
| 159 | repair | src/components/select/SelectContent.vue | — | — | BI.W-P008 |
| 160 | repair | src/components/select/SelectGroup.vue | — | — | BI.W-P008 |
| 161 | repair | src/components/select/SelectItem.vue | — | — | BI.W-P008 |
| 162 | repair | src/components/select/SelectLabel.vue | — | — | BI.W-P008 |
| 163 | repair | src/components/select/SelectScrollDownButton.vue | — | — | BI.W-P008 |
| 164 | repair | src/components/select/SelectScrollUpButton.vue | — | — | BI.W-P008 |
| 165 | repair | src/components/select/SelectSeparator.vue | — | — | BI.W-P008 |
| 166 | repair | src/components/select/SelectTrigger.vue | — | — | BI.W-P008 |
| 167 | repair | src/components/select/SelectValue.vue | — | — | BI.W-P008 |
| 168 | repair | src/components/separator/Separator.vue | — | — | BI.W-P008 |
| 169 | repair | src/components/skeleton/Skeleton.vue | — | — | BI.W-P008 |
| 170 | repair | src/components/slider/Slider.vue | — | — | BI.W-P008 |
| 171 | repair | src/components/sortable-list/SortableHandle.vue | — | — | BI.W-P007 |
| 172 | repair | src/components/sortable-list/SortableItem.vue | — | — | BI.W-P007 |
| 173 | repair | src/components/sortable-list/SortableList.vue | — | — | BI.W-P007 |
| 174 | repair | src/components/spa-view/SpaView.vue | — | — | BI.W-P008 |
| 175 | repair | src/components/split-chars/SplitChars.vue | — | — | BI.W-P008 |
| 176 | repair | src/components/stacked-icons/StackedIconGroup.vue | — | — | BI.W-P008 |
| 177 | repair | src/components/status-dot/StatusDot.vue | — | — | BI.W-P008 |
| 178 | repair | src/components/surface/Surface.vue | — | — | BI.W-P008 |
| 179 | repair | src/components/switch/Switch.vue | — | — | BI.W-P008 |
| 180 | repair | src/components/table/Table.vue | — | — | BI.W-P008 |
| 181 | repair | src/components/table/TableBody.vue | — | — | BI.W-P008 |
| 182 | repair | src/components/table/TableCaption.vue | — | — | BI.W-P008 |
| 183 | repair | src/components/table/TableCell.vue | — | — | BI.W-P008 |
| 184 | repair | src/components/table/TableEmpty.vue | — | — | BI.W-P008 |
| 185 | repair | src/components/table/TableHead.vue | — | — | BI.W-P008 |
| 186 | repair | src/components/table/TableHeader.vue | — | — | BI.W-P008 |
| 187 | repair | src/components/table/TableRow.vue | — | — | BI.W-P008 |
| 188 | repair | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 189 | repair | src/components/tags-input/TagsInput.vue | — | — | BI.W-P008 |
| 190 | repair | src/components/tags-input/TagsInputInput.vue | — | — | BI.W-P008 |
| 191 | repair | src/components/tags-input/TagsInputItem.vue | — | — | BI.W-P008 |
| 192 | repair | src/components/tags-input/TagsInputItemDelete.vue | — | — | BI.W-P008 |
| 193 | repair | src/components/tags-input/TagsInputItemText.vue | — | — | BI.W-P008 |
| 194 | repair | src/components/textarea/Textarea.vue | — | — | BI.W-P008 |
| 195 | repair | src/components/timeline/ContinuousMarkers.vue | — | — | BI.W-P008 |
| 196 | repair | src/components/timeline/ContinuousRail.vue | — | — | BI.W-P008 |
| 197 | repair | src/components/timeline/ContinuousTimeline.vue | — | — | BI.W-P008 |
| 198 | repair | src/components/timeline/GlassTimeline.vue | — | — | BI.W-P008 |
| 199 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 200 | repair | src/components/timeline/SegmentedTimeline.vue | — | — | BI.W-P008 |
| 201 | repair | src/components/toast/Toast.vue | — | — | BI.W-P008 |
| 202 | repair | src/components/toast/ToastAction.vue | — | — | BI.W-P008 |
| 203 | repair | src/components/toast/ToastClose.vue | — | — | BI.W-P008 |
| 204 | repair | src/components/toast/ToastDescription.vue | — | — | BI.W-P008 |
| 205 | repair | src/components/toast/Toaster.vue | — | — | BI.W-P008 |
| 206 | repair | src/components/toast/ToastTitle.vue | — | — | BI.W-P008 |
| 207 | repair | src/components/toggle-group/ToggleGroup.vue | — | — | BI.W-P008 |
| 208 | repair | src/components/toggle-group/ToggleGroupItem.vue | — | — | BI.W-P008 |
| 209 | repair | src/components/toggle/Toggle.vue | — | — | BI.W-P008 |
| 210 | repair | src/components/tooltip/Tooltip.vue | — | — | BI.W-P008 |
| 211 | repair | src/components/tooltip/TooltipContent.vue | — | — | BI.W-P008 |
| 212 | repair | src/components/tooltip/TooltipProvider.vue | — | — | BI.W-P008 |
| 213 | repair | src/components/tooltip/TooltipTrigger.vue | — | — | BI.W-P008 |
| 214 | repair | src/components/typewriter/TypewriterText.vue | — | — | BI.W-P008 |
| 215 | repair | src/components/watercolor-dot/WatercolorDot.vue | — | — | BI.W-P008 |
| 216 | repair | src/styles/animations.css | — | 74791f2e0ed4e8b8d56c717f2da2180dc3952c56 | source base |
| 217 | repair | src/styles/border-progress.css | — | 2f43dde09504bcecb92655b8950e2315b10680ef | source base |
| 218 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 219 | repair | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 220 | repair | src/styles/completion-seal.css | — | 60491778dc7fdc68bf7ce95a976c8633d3022adb | source base |
| 221 | repair | src/styles/configurator.css | — | 251d50ff9b2ec84111ce2949a0fe6e53190f73ad | source base |
| 222 | repair | src/styles/dialog-placement.css | — | d10e5955e001e14191a66ed87018442c54d2ee46 | source base |
| 223 | repair | src/styles/dock-controls.css | — | 892dba3b514be6bd6b8aa3b12028ae16f5035886 | source base |
| 224 | repair | src/styles/dock-controls/dark-mode-toggle.css | — | 5fbc619e31c5f3b4da06579263f621a286135f50 | source base |
| 225 | repair | src/styles/dock-controls/icon-button.css | — | 0f9126bd8a22b598c79046410fd83f64f02ec3a0 | source base |
| 226 | repair | src/styles/dock-controls/tab-button.css | — | 912bace2d0d359b7570080fa08ba524cfbb42f4d | source base |
| 227 | repair | src/styles/dock-controls/touch-floor.css | — | d9eb7500b2008e86ade95a8d61fe255993b1722c | source base |
| 228 | repair | src/styles/dock-controls/triggers.css | — | 07a870beb2ac348343c7309203adef7d43abdded | source base |
| 229 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 230 | repair | src/styles/dock/adaptive-legibility.css | — | f4854e66920f232e6eb9fd5176b89a732148399f | source base |
| 231 | repair | src/styles/dock/crossfade.css | — | 5ba361dc5303a4414d4c6e92baa61328f063bbb7 | source base |
| 232 | repair | src/styles/dock/cta-seat.css | — | c19816efff5f556f112a4091e9e784d57c3902e8 | source base |
| 233 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 234 | repair | src/styles/dock/dock.css | — | 83e358cc6e6d382a9c84f136972fe522470ea11c | source base |
| 235 | repair | src/styles/dock/fisheye.css | — | 1c346c4a7948f3d6da886ad7d50161160489f785 | source base |
| 236 | repair | src/styles/dock/layer-group.css | — | 9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd | source base |
| 237 | repair | src/styles/dock/layers.css | — | 0c915d1d614a7b450020ba281acc18e798898d86 | source base |
| 238 | repair | src/styles/dock/morph.css | — | 66e6c079aded40032cd2da310ca8284a592f3ec1 | source base |
| 239 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 240 | repair | src/styles/dock/popover.css | — | 5f9899bc157e13c39c460008bba052ba38bc5b78 | source base |
| 241 | repair | src/styles/dock/search.css | — | e2d2658c4119e5d6ea65fbc95480d9b95b49581c | source base |
| 242 | repair | src/styles/dock/section.css | — | 381e3ffae1d08c0bdd4664d78fcd493043bff14c | source base |
| 243 | repair | src/styles/dock/shape.css | — | 373e9d2f02d923d0c802de9059d50cc4e5f03e70 | source base |
| 244 | repair | src/styles/dock/shell-regions.css | — | e722ea40759f97036887c2e63a4b517858551609 | source base |
| 245 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 246 | repair | src/styles/draw-in.css | — | 1f845c43cfd1beec3a9fa7177857ff81cf29c704 | source base |
| 247 | repair | src/styles/drawer.css | — | 9c49e90f5591f31b54bd511eb161f4dada359928 | source base |
| 248 | repair | src/styles/feedback-tone.css | — | e90895f604c82965e689083aaa08e7dcb1d1642b | source base |
| 249 | repair | src/styles/fonts.css | — | 65e7cb7241aa36ca5262ff61fc6b6c2410871ead | source base |
| 250 | repair | src/styles/glass-refract.css | — | 503b21d79f89d34f6c624bf43c6f9bfdd463243c | source base |
| 251 | repair | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 252 | repair | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 253 | repair | src/styles/glass/a11y-fallback.css | — | c6bf39491d993644c8abeff837db5ace5225ca79 | source base |
| 254 | repair | src/styles/glass/accent-tone.css | — | a3b375be285ae44c17e16087551f1d36eec3ea36 | source base |
| 255 | repair | src/styles/glass/control-surfaces.css | — | 2db5c477d919ee795d0a5b7d212cf39f835fdb85 | source base |
| 256 | repair | src/styles/glass/deep.css | — | 83468cc7580027c2481ccb9193360e7fe6949a50 | source base |
| 257 | repair | src/styles/glass/defined.css | — | d8cd8460f4965fe1b3736a457aa4fa8b23e1fdbe | source base |
| 258 | repair | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 259 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 260 | repair | src/styles/glass/glass-chip.css | — | 78c37cea99d056fcfd8ed0219a094325645f9c53 | source base |
| 261 | repair | src/styles/glass/grain-overlay.css | — | a6ccc7a3f69f9be0f9de15e254eb6016611c9df5 | source base |
| 262 | repair | src/styles/glass/ladder-undershadow.css | — | a00d643179a4abec099edc5178ca5d71d173b7a1 | source base |
| 263 | repair | src/styles/glass/ladder.css | — | 2b65407c1d361a0edfcde6703c4734dabbc020db | source base |
| 264 | repair | src/styles/glass/liquid-enter.css | — | 49d182d37feebca6ab412a037bdd221eea71146f | source base |
| 265 | repair | src/styles/glass/liquid-fill.css | — | a87e87acb1f208806d94d4aacbff2cf845e1285c | source base |
| 266 | repair | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 267 | repair | src/styles/glass/progress-rail.css | — | 02f64c4cb98bf7667c4151a0d7012a5eb5c6d34f | source base |
| 268 | repair | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 269 | repair | src/styles/glass/rim.css | — | 7bc5038ea6041aa7421ca3e35a8a11db0ca38e55 | source base |
| 270 | repair | src/styles/glass/squircle.css | — | 569730e4a98a6a49e40c590bb553e063b4509cea | source base |
| 271 | repair | src/styles/glass/surface-axis.css | — | 5570ec55144da937de524b9808652227af827dfb | source base |
| 272 | repair | src/styles/glass/surfaces-pager.css | — | 2b9ec169731026dbe41123f3ad1b8337e214a3d9 | source base |
| 273 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 274 | repair | src/styles/icon-chip.css | — | 207ddee8a8c3bd4ca7446defb9cb7288e63f0148 | source base |
| 275 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 276 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 277 | create | src/styles/material/depth.css | — | — | source base |
| 278 | repair | src/styles/menu.css | — | b857356e839255ecff703eb38e8368445e7c8598 | source base |
| 279 | repair | src/styles/paper.css | — | 0c18d49faaaa9d6c98b8f1195f876c14c961d3d0 | source base |
| 280 | repair | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 281 | repair | src/styles/scroll-chrome.css | — | 3b175f8939c22a00c6ea0bbc298e34ac6b3d7273 | source base |
| 282 | repair | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 283 | repair | src/styles/segmented-tabs.css | — | 3139afb08242087d5b853acc54713acda9fd18c0 | source base |
| 284 | repair | src/styles/select.css | — | 4d78552ece9bcaa1a500ef9b2c7db80a4500ef47 | source base |
| 285 | repair | src/styles/tabs/segmented-tabs-drag.css | — | 6c50427c9d299238b4ab086ffdf977820d31a9b8 | source base |
| 286 | repair | src/styles/theme.css | — | 7f77e670edffad3948c77f89e58d4a6d5769f91a | source base |
| 287 | repair | src/styles/theme/bridges.css | — | 3ba96c25d80207be2c068037f267cce934835997 | source base |
| 288 | repair | src/styles/theme/dark.css | — | a97560933c093ca5248ff5db982b9c376e64cd27 | source base |
| 289 | repair | src/styles/theme/literals.css | — | 552cab919166035c740c3bcd92d40fbd471c49f5 | source base |
| 290 | modify | src/styles/theme/radius.css | — | cb3901257cbeeec78182199bdf7abc145b655132 | source base |
| 291 | repair | src/styles/tokens.css | — | 5194cd72e66628a48dda4b45c447a723893b86bf | source base |
| 292 | repair | src/styles/tokens/color-radius.css | — | 39abb72a24aa29eeac358f0a2c2cc3eee480aea9 | source base |
| 293 | repair | src/styles/tokens/dark-arm-glass.css | — | 4b471daf200330334464e24865631dc9ba0be2d2 | source base |
| 294 | repair | src/styles/tokens/dark-arm.css | — | e776b8ded03aeadd57fc3ceea0c86f06dc2dd7e4 | source base |
| 295 | repair | src/styles/tokens/glass-deep.css | — | cf405ca85c204eb146687458a86559fa0385f352 | source base |
| 296 | repair | src/styles/tokens/glass-fx.css | — | e20e236bcd7b013bc41ecd3ca45e77fdbbd17edb | source base |
| 297 | repair | src/styles/tokens/glass.css | — | 5c09fd47c15544fb9e5d89202f0ef99c48208e1f | source base |
| 298 | repair | src/styles/tokens/light-dark.css | — | b23e6baa9e9e4bfb44c26a0cf41c634823b228df | source base |
| 299 | repair | src/styles/tokens/motion-registers.css | — | 1da1345f11e6ae0fff495540ae9a2b5ef574997a | source base |
| 300 | repair | src/styles/tokens/offsets.css | — | 4f42a96aa25112af9b9ffe57b998a156a777cd6b | source base |
| 301 | repair | src/styles/tokens/on-glass-fg.css | — | ba1782dbf7bde52725a3219a332676f49e4e78a6 | source base |
| 302 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 303 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 304 | repair | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 305 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 306 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 307 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 308 | modify | src/styles/tokens/shadow.css | — | 021c5321af39c05176a8f697d08ac3678a42902a | source base |
| 309 | repair | src/styles/tokens/sizing-config.css | — | 13f28e1a3345829223193904a38c3bf49be904e2 | source base |
| 310 | repair | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 311 | repair | src/styles/transitions.css | — | ff60e1b4e192a5ecb06479f9582c5e52bbf15c63 | source base |
| 312 | repair | src/styles/typography.css | — | 78204d4626f1bbe7cb1490184fad019d5c4d7de8 | source base |
| 313 | repair | src/styles/typography/scale.css | — | 60aa59d15c74d55f0a814760d77ca624960a6f0b | source base |
| 314 | repair | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 315 | repair | src/styles/typography/utilities.css | — | 4415aa88142764007bb0e7fa998be59d5ea0cfb4 | source base |
| 316 | repair | src/styles/utilities.css | — | 1de6b90c29c15fcba50c8595cd2932f37f80d7b6 | source base |
| 317 | repair | src/styles/utilities/a11y-overrides.css | — | dd89b1d7c21f30807080f0627cac012698b3ce9c | source base |
| 318 | repair | src/styles/utilities/animate.css | — | 0c6a4aa2a584c1732b9c3c512f79d9901ef479ac | source base |
| 319 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 320 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 321 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 322 | repair | src/styles/utilities/components.css | — | 79fdb388d65dbd43fc11a706d0ec7b0a9909445d | source base |
| 323 | modify | src/styles/utilities/metal.css | — | da9b6ae944b06e610269fc568f41201ee1c67da6 | source base |
| 324 | repair | src/styles/view-transition.css | — | fc0af7fbfd5ad5dbf2d76576f7a4409e8207adbf | source base |
| 325 | repair | src/styles/viz-reveal.css | — | 50809db823fb350416cdccd1dcdea63c98e7c52e | source base |
| 326 | create | tests-visual/depth-grammar.spec.ts | — | — | source base |

## Repair manifest (324)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | src/components/_shared/ModalOverlay.vue |
| imports | 2 | src/components/accordion/Accordion.vue |
| imports | 3 | src/components/accordion/AccordionContent.vue |
| imports | 4 | src/components/accordion/AccordionItem.vue |
| imports | 5 | src/components/accordion/AccordionTrigger.vue |
| imports | 6 | src/components/alert/Alert.vue |
| imports | 7 | src/components/alert/AlertDescription.vue |
| imports | 8 | src/components/alert/AlertTitle.vue |
| imports | 9 | src/components/animated-digit/AnimatedDigit.vue |
| imports | 10 | src/components/aurora/Aurora.vue |
| imports | 11 | src/components/avatar/Avatar.vue |
| imports | 12 | src/components/avatar/AvatarFallback.vue |
| imports | 13 | src/components/avatar/AvatarImage.vue |
| imports | 14 | src/components/badge/Badge.vue |
| imports | 15 | src/components/blob/Blob.vue |
| imports | 16 | src/components/border-progress/BorderProgress.vue |
| imports | 17 | src/components/button/Button.vue |
| imports | 18 | src/components/card/Card.vue |
| imports | 19 | src/components/card/CardAction.vue |
| imports | 20 | src/components/card/CardContent.vue |
| imports | 21 | src/components/card/CardDescription.vue |
| imports | 22 | src/components/card/CardFooter.vue |
| imports | 23 | src/components/card/CardHeader.vue |
| imports | 24 | src/components/card/CardTitle.vue |
| imports | 25 | src/components/card/ScrollCard.vue |
| imports | 26 | src/components/card/ScrollCardHeader.vue |
| imports | 27 | src/components/carousel/Carousel.vue |
| imports | 28 | src/components/carousel/CarouselContent.vue |
| imports | 29 | src/components/carousel/CarouselItem.vue |
| imports | 30 | src/components/carousel/CarouselNext.vue |
| imports | 31 | src/components/carousel/CarouselPager.vue |
| imports | 32 | src/components/carousel/CarouselPrevious.vue |
| imports | 33 | src/components/carousel/GlassCarouselPager.vue |
| imports | 34 | src/components/checkbox/Checkbox.vue |
| imports | 35 | src/components/chip/Chip.vue |
| imports | 36 | src/components/collapsible/Collapsible.vue |
| imports | 37 | src/components/collapsible/CollapsibleContent.vue |
| imports | 38 | src/components/collapsible/CollapsibleTrigger.vue |
| imports | 39 | src/components/color-swatch/ColorSwatch.vue |
| imports | 40 | src/components/combobox/Combobox.vue |
| imports | 41 | src/components/combobox/ComboboxAnchor.vue |
| imports | 42 | src/components/combobox/ComboboxEmpty.vue |
| imports | 43 | src/components/combobox/ComboboxGroup.vue |
| imports | 44 | src/components/combobox/ComboboxInput.vue |
| imports | 45 | src/components/combobox/ComboboxItem.vue |
| imports | 46 | src/components/combobox/ComboboxItemIndicator.vue |
| imports | 47 | src/components/combobox/ComboboxList.vue |
| imports | 48 | src/components/combobox/ComboboxSeparator.vue |
| imports | 49 | src/components/combobox/ComboboxViewport.vue |
| imports | 50 | src/components/command/Command.vue |
| imports | 51 | src/components/command/CommandDialog.vue |
| imports | 52 | src/components/command/CommandEmpty.vue |
| imports | 53 | src/components/command/CommandGroup.vue |
| imports | 54 | src/components/command/CommandInput.vue |
| imports | 55 | src/components/command/CommandItem.vue |
| imports | 56 | src/components/command/CommandList.vue |
| imports | 57 | src/components/command/CommandSeparator.vue |
| imports | 58 | src/components/command/CommandShortcut.vue |
| imports | 59 | src/components/completion-seal/CompletionSeal.vue |
| imports | 60 | src/components/configurator/Configurator.vue |
| imports | 61 | src/components/configurator/ConfiguratorLayer.vue |
| imports | 62 | src/components/configurator/ConfiguratorRow.vue |
| imports | 63 | src/components/constellation/Constellation.vue |
| imports | 64 | src/components/controls/DarkModeToggle.vue |
| imports | 65 | src/components/data-table/DataTable.vue |
| imports | 66 | src/components/data-table/DataTablePagination.vue |
| imports | 67 | src/components/deck/DeckPager.vue |
| imports | 68 | src/components/dialog/Dialog.vue |
| imports | 69 | src/components/dialog/DialogClose.vue |
| imports | 70 | src/components/dialog/DialogContent.vue |
| imports | 71 | src/components/dialog/DialogDescription.vue |
| imports | 72 | src/components/dialog/DialogFooter.vue |
| imports | 73 | src/components/dialog/DialogHeader.vue |
| imports | 74 | src/components/dialog/DialogScrollContent.vue |
| imports | 75 | src/components/dialog/DialogTitle.vue |
| imports | 76 | src/components/dialog/DialogTrigger.vue |
| imports | 77 | src/components/dock/DockBackgroundToggle.vue |
| imports | 78 | src/components/dock/DockControl.vue |
| imports | 79 | src/components/dock/DockCrossfade.vue |
| imports | 80 | src/components/dock/DockLayer.vue |
| imports | 81 | src/components/dock/DockLayerGroup.vue |
| imports | 82 | src/components/dock/DockSection.vue |
| imports | 83 | src/components/dock/DockSeparator.vue |
| imports | 84 | src/components/dock/DockStack.vue |
| imports | 85 | src/components/dock/DockTrigger.vue |
| imports | 86 | src/components/dock/GlassDock.vue |
| imports | 87 | src/components/drawer/Drawer.vue |
| imports | 88 | src/components/drawer/DrawerContent.vue |
| imports | 89 | src/components/drawer/DrawerDescription.vue |
| imports | 90 | src/components/drawer/DrawerFooter.vue |
| imports | 91 | src/components/drawer/DrawerHeader.vue |
| imports | 92 | src/components/drawer/DrawerOverlay.vue |
| imports | 93 | src/components/drawer/DrawerTitle.vue |
| imports | 94 | src/components/dropdown-menu/DropdownMenu.vue |
| imports | 95 | src/components/dropdown-menu/DropdownMenuCheckboxItem.vue |
| imports | 96 | src/components/dropdown-menu/DropdownMenuContent.vue |
| imports | 97 | src/components/dropdown-menu/DropdownMenuGroup.vue |
| imports | 98 | src/components/dropdown-menu/DropdownMenuItem.vue |
| imports | 99 | src/components/dropdown-menu/DropdownMenuLabel.vue |
| imports | 100 | src/components/dropdown-menu/DropdownMenuRadioGroup.vue |
| imports | 101 | src/components/dropdown-menu/DropdownMenuRadioItem.vue |
| imports | 102 | src/components/dropdown-menu/DropdownMenuSeparator.vue |
| imports | 103 | src/components/dropdown-menu/DropdownMenuShortcut.vue |
| imports | 104 | src/components/dropdown-menu/DropdownMenuSub.vue |
| imports | 105 | src/components/dropdown-menu/DropdownMenuSubContent.vue |
| imports | 106 | src/components/dropdown-menu/DropdownMenuSubTrigger.vue |
| imports | 107 | src/components/dropdown-menu/DropdownMenuTrigger.vue |
| imports | 108 | src/components/easing/EasingConfigurator.vue |
| imports | 109 | src/components/easing/EasingPicker.vue |
| imports | 110 | src/components/expandable-container/ExpandableContainer.vue |
| imports | 111 | src/components/fading-scroll/FadingScroll.vue |
| imports | 112 | src/components/focus-scope/FocusScope.vue |
| imports | 113 | src/components/fourier-field/FourierField.vue |
| imports | 114 | src/components/goo-filter/GooFilter.vue |
| imports | 115 | src/components/handmark/HandMark.vue |
| imports | 116 | src/components/header-ribbon/HeaderRibbon.vue |
| imports | 117 | src/components/icon-chip/IconChip.vue |
| imports | 118 | src/components/icon-tooltip/IconTooltip.vue |
| imports | 119 | src/components/infinite-scroll/InfiniteScroll.vue |
| imports | 120 | src/components/input/Input.vue |
| imports | 121 | src/components/instrument-chassis/ChassisDivider.vue |
| imports | 122 | src/components/instrument-chassis/InstrumentChassis.vue |
| imports | 123 | src/components/label/Label.vue |
| imports | 124 | src/components/labeled-field/LabeledField.vue |
| imports | 125 | src/components/labeled-field/LabeledInput.vue |
| imports | 126 | src/components/labeled-field/LabeledSelect.vue |
| imports | 127 | src/components/labeled-field/LabeledSlider.vue |
| imports | 128 | src/components/labeled-field/LabeledSwitch.vue |
| imports | 129 | src/components/liquid-grid/LiquidGrid.vue |
| imports | 130 | src/components/metric-badge/MetricBadge.vue |
| imports | 131 | src/components/metric-cell/MetricCell.vue |
| imports | 132 | src/components/metric-stack/MetricRow.vue |
| imports | 133 | src/components/metric-stack/MetricStack.vue |
| imports | 134 | src/components/notification/Notification.vue |
| imports | 135 | src/components/number-field/NumberField.vue |
| imports | 136 | src/components/number-field/NumberFieldContent.vue |
| imports | 137 | src/components/number-field/NumberFieldDecrement.vue |
| imports | 138 | src/components/number-field/NumberFieldIncrement.vue |
| imports | 139 | src/components/number-field/NumberFieldInput.vue |
| imports | 140 | src/components/pager-dots/PagerDots.vue |
| imports | 141 | src/components/paper-backdrop/PaperBackdrop.vue |
| imports | 142 | src/components/popover/Popover.vue |
| imports | 143 | src/components/popover/PopoverContent.vue |
| imports | 144 | src/components/popover/PopoverTrigger.vue |
| imports | 145 | src/components/progress/Progress.vue |
| imports | 146 | src/components/progress/ProgressDefault.vue |
| imports | 147 | src/components/progress/ProgressGradient.vue |
| imports | 148 | src/components/progress/ProgressLiquid.vue |
| imports | 149 | src/components/progress/ProgressSectioned.vue |
| imports | 150 | src/components/pulse/Pulse.vue |
| imports | 151 | src/components/radio-group/RadioGroup.vue |
| imports | 152 | src/components/radio-group/RadioGroupItem.vue |
| imports | 153 | src/components/search/FuzzySearch.vue |
| imports | 154 | src/components/search/SearchBar.vue |
| imports | 155 | src/components/section/Section.vue |
| imports | 156 | src/components/select/Select.vue |
| imports | 157 | src/components/select/SelectContent.vue |
| imports | 158 | src/components/select/SelectGroup.vue |
| imports | 159 | src/components/select/SelectItem.vue |
| imports | 160 | src/components/select/SelectLabel.vue |
| imports | 161 | src/components/select/SelectScrollDownButton.vue |
| imports | 162 | src/components/select/SelectScrollUpButton.vue |
| imports | 163 | src/components/select/SelectSeparator.vue |
| imports | 164 | src/components/select/SelectTrigger.vue |
| imports | 165 | src/components/select/SelectValue.vue |
| imports | 166 | src/components/separator/Separator.vue |
| imports | 167 | src/components/skeleton/Skeleton.vue |
| imports | 168 | src/components/slider/Slider.vue |
| imports | 169 | src/components/sortable-list/SortableHandle.vue |
| imports | 170 | src/components/sortable-list/SortableItem.vue |
| imports | 171 | src/components/sortable-list/SortableList.vue |
| imports | 172 | src/components/spa-view/SpaView.vue |
| imports | 173 | src/components/split-chars/SplitChars.vue |
| imports | 174 | src/components/stacked-icons/StackedIconGroup.vue |
| imports | 175 | src/components/status-dot/StatusDot.vue |
| imports | 176 | src/components/surface/Surface.vue |
| imports | 177 | src/components/switch/Switch.vue |
| imports | 178 | src/components/table/Table.vue |
| imports | 179 | src/components/table/TableBody.vue |
| imports | 180 | src/components/table/TableCaption.vue |
| imports | 181 | src/components/table/TableCell.vue |
| imports | 182 | src/components/table/TableEmpty.vue |
| imports | 183 | src/components/table/TableHead.vue |
| imports | 184 | src/components/table/TableHeader.vue |
| imports | 185 | src/components/table/TableRow.vue |
| imports | 186 | src/components/tabs/SegmentedTabs.vue |
| imports | 187 | src/components/tags-input/TagsInput.vue |
| imports | 188 | src/components/tags-input/TagsInputInput.vue |
| imports | 189 | src/components/tags-input/TagsInputItem.vue |
| imports | 190 | src/components/tags-input/TagsInputItemDelete.vue |
| imports | 191 | src/components/tags-input/TagsInputItemText.vue |
| imports | 192 | src/components/textarea/Textarea.vue |
| imports | 193 | src/components/timeline/ContinuousMarkers.vue |
| imports | 194 | src/components/timeline/ContinuousRail.vue |
| imports | 195 | src/components/timeline/ContinuousTimeline.vue |
| imports | 196 | src/components/timeline/GlassTimeline.vue |
| imports | 197 | src/components/timeline/ScrubberTimeline.vue |
| imports | 198 | src/components/timeline/SegmentedTimeline.vue |
| imports | 199 | src/components/toast/Toast.vue |
| imports | 200 | src/components/toast/ToastAction.vue |
| imports | 201 | src/components/toast/ToastClose.vue |
| imports | 202 | src/components/toast/ToastDescription.vue |
| imports | 203 | src/components/toast/ToastTitle.vue |
| imports | 204 | src/components/toast/Toaster.vue |
| imports | 205 | src/components/toggle-group/ToggleGroup.vue |
| imports | 206 | src/components/toggle-group/ToggleGroupItem.vue |
| imports | 207 | src/components/toggle/Toggle.vue |
| imports | 208 | src/components/tooltip/Tooltip.vue |
| imports | 209 | src/components/tooltip/TooltipContent.vue |
| imports | 210 | src/components/tooltip/TooltipProvider.vue |
| imports | 211 | src/components/tooltip/TooltipTrigger.vue |
| imports | 212 | src/components/typewriter/TypewriterText.vue |
| imports | 213 | src/components/watercolor-dot/WatercolorDot.vue |
| imports | 214 | src/styles/animations.css |
| imports | 215 | src/styles/border-progress.css |
| imports | 216 | src/styles/card-scroll.css |
| imports | 217 | src/styles/cards.css |
| imports | 218 | src/styles/completion-seal.css |
| imports | 219 | src/styles/configurator.css |
| imports | 220 | src/styles/dialog-placement.css |
| imports | 221 | src/styles/dock-controls.css |
| imports | 222 | src/styles/dock-controls/dark-mode-toggle.css |
| imports | 223 | src/styles/dock-controls/icon-button.css |
| imports | 224 | src/styles/dock-controls/tab-button.css |
| imports | 225 | src/styles/dock-controls/touch-floor.css |
| imports | 226 | src/styles/dock-controls/triggers.css |
| imports | 227 | src/styles/dock.css |
| imports | 228 | src/styles/dock/adaptive-legibility.css |
| imports | 229 | src/styles/dock/crossfade.css |
| imports | 230 | src/styles/dock/cta-seat.css |
| imports | 231 | src/styles/dock/density.css |
| imports | 232 | src/styles/dock/dock.css |
| imports | 233 | src/styles/dock/fisheye.css |
| imports | 234 | src/styles/dock/layer-group.css |
| imports | 235 | src/styles/dock/layers.css |
| imports | 236 | src/styles/dock/morph.css |
| imports | 237 | src/styles/dock/overflow.css |
| imports | 238 | src/styles/dock/popover.css |
| imports | 239 | src/styles/dock/search.css |
| imports | 240 | src/styles/dock/section.css |
| imports | 241 | src/styles/dock/shape.css |
| imports | 242 | src/styles/dock/shell-regions.css |
| imports | 243 | src/styles/dock/shell.css |
| imports | 244 | src/styles/draw-in.css |
| imports | 245 | src/styles/drawer.css |
| imports | 246 | src/styles/feedback-tone.css |
| imports | 247 | src/styles/fonts.css |
| imports | 248 | src/styles/glass-refract.css |
| imports | 249 | src/styles/glass-specular-track.css |
| imports | 250 | src/styles/glass.css |
| imports | 251 | src/styles/glass/a11y-fallback.css |
| imports | 252 | src/styles/glass/accent-tone.css |
| imports | 253 | src/styles/glass/control-surfaces.css |
| imports | 254 | src/styles/glass/deep.css |
| imports | 255 | src/styles/glass/defined.css |
| imports | 256 | src/styles/glass/glass-atom.css |
| imports | 257 | src/styles/glass/glass-capsule.css |
| imports | 258 | src/styles/glass/glass-chip.css |
| imports | 259 | src/styles/glass/grain-overlay.css |
| imports | 260 | src/styles/glass/ladder-undershadow.css |
| imports | 261 | src/styles/glass/ladder.css |
| imports | 262 | src/styles/glass/liquid-enter.css |
| imports | 263 | src/styles/glass/liquid-fill.css |
| imports | 264 | src/styles/glass/material.css |
| imports | 265 | src/styles/glass/progress-rail.css |
| imports | 266 | src/styles/glass/reveal.css |
| imports | 267 | src/styles/glass/rim.css |
| imports | 268 | src/styles/glass/squircle.css |
| imports | 269 | src/styles/glass/surface-axis.css |
| imports | 270 | src/styles/glass/surfaces-pager.css |
| imports | 271 | src/styles/glass/surfaces.css |
| imports | 272 | src/styles/icon-chip.css |
| imports | 273 | src/styles/index.css |
| imports | 274 | src/styles/instrument-chassis.css |
| imports | 275 | src/styles/menu.css |
| imports | 276 | src/styles/paper.css |
| imports | 277 | src/styles/scroll-choreography.css |
| imports | 278 | src/styles/scroll-chrome.css |
| imports | 279 | src/styles/scroll-driven.css |
| imports | 280 | src/styles/segmented-tabs.css |
| imports | 281 | src/styles/select.css |
| imports | 282 | src/styles/tabs/segmented-tabs-drag.css |
| imports | 283 | src/styles/theme.css |
| imports | 284 | src/styles/theme/bridges.css |
| imports | 285 | src/styles/theme/dark.css |
| imports | 286 | src/styles/theme/literals.css |
| imports | 287 | src/styles/theme/radius.css |
| imports | 288 | src/styles/tokens.css |
| imports | 289 | src/styles/tokens/color-radius.css |
| imports | 290 | src/styles/tokens/dark-arm-glass.css |
| imports | 291 | src/styles/tokens/dark-arm.css |
| imports | 292 | src/styles/tokens/glass-deep.css |
| imports | 293 | src/styles/tokens/glass-fx.css |
| imports | 294 | src/styles/tokens/glass.css |
| imports | 295 | src/styles/tokens/light-dark.css |
| imports | 296 | src/styles/tokens/motion-registers.css |
| imports | 297 | src/styles/tokens/offsets.css |
| imports | 298 | src/styles/tokens/on-glass-fg.css |
| imports | 299 | src/styles/tokens/property-regs-specular.css |
| imports | 300 | src/styles/tokens/property-regs.css |
| imports | 301 | src/styles/tokens/scale-paper.css |
| imports | 302 | src/styles/tokens/scheme-motion.css |
| imports | 303 | src/styles/tokens/scheme-spring.css |
| imports | 304 | src/styles/tokens/scroll-tokens.css |
| imports | 305 | src/styles/tokens/shadow.css |
| imports | 306 | src/styles/tokens/sizing-config.css |
| imports | 307 | src/styles/tokens/sizing.css |
| imports | 308 | src/styles/transitions.css |
| imports | 309 | src/styles/typography.css |
| imports | 310 | src/styles/typography/scale.css |
| imports | 311 | src/styles/typography/semantic.css |
| imports | 312 | src/styles/typography/utilities.css |
| imports | 313 | src/styles/utilities.css |
| imports | 314 | src/styles/utilities/a11y-overrides.css |
| imports | 315 | src/styles/utilities/animate.css |
| imports | 316 | src/styles/utilities/base-misc.css |
| imports | 317 | src/styles/utilities/base.css |
| imports | 318 | src/styles/utilities/btn.css |
| imports | 319 | src/styles/utilities/components.css |
| imports | 320 | src/styles/utilities/metal.css |
| imports | 321 | src/styles/view-transition.css |
| imports | 322 | src/styles/viz-reveal.css |
| tests | 1 | tests-visual/depth-grammar.spec.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P018/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Nested geometry is concentric and depth signals increase monotonically by semantic level without a second shadow authority.

**Required mutation bite:** Set an inner control radius larger than its containing surface and require geometric sampling to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P018`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |
| design.token-graph | device-free | Every semantic token has one definition, typed domain, live consumer, valid dark/contrast resolution, and no alias cycle or dead rung. | Create a token alias cycle.; Add a defined token with no computed consumer. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: depth-controls, depth-card-overlay, depth-dark, depth-narrow
Observables: radius concentricity, edge/shadow ordering, absence of glow/double shadow
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P016 | Material level follows semantic function and remains perceptually ordered in every supported appearance/accessibility state; any adaptive-luminance claim is backed by a fresh live sample with explicit provenance or an observable typed failure. |

Declared semantic locks: `global-material`, `global-tokens`. The cursor also acquires 326 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
