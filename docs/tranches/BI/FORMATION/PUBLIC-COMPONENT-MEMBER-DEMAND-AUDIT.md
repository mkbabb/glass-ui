# Public component-member demand audit

Resolve every published entry barrel recursively to exact local Vue SFC or direct Reka component exports; bind exact named imports in nine read-only tracked HEADs; give tests, type imports, re-export projections, unused imports, sibling members, and path existence zero runtime-demand credit; separately preserve foreign demos, first-party demo tags, and internal composition as product-judgment evidence.

No count is a gate. External runtime demand prevents silent deletion but does not freeze API design; absence of demand does not itself delete a sound primitive. Every member still requires an authored keep, fold, privatize, migrate, or delete judgment with an executable owning wave and non-vacuous scenario predicate.

Counts: publishedEntryPoints=78, publicComponentMembers=213, localVueMembers=207, upstreamRekaMembers=6, rootPublishedMembers=125, exactExternalRuntimeDemandMembers=102, foreignDemoOnlyOrAlsoMembers=61, firstPartyDemoMembers=193, internalCompositionMembers=65, zeroCausalRuntimeDemandMembers=111, zeroAnyRenderedOrRuntimeWitnessMembers=10, membersWithWrongOrRetiredSpecifierEvidence=5, unmatchedForeignNamedBindings=354.

Discovery dispositions: CONSUMER_BOUND_RETAIN_OR_MIGRATE=101, DELETE_EXACT_MEMBER=1, DELETE_WITH_OWNING_CONCEPT_MEMBER=4, DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED=89, INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED=9, ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED=9.

## Exact members

| id | member | source | published at | concept/action | causal external | foreign demo | first-party demo | internal composition | discovery disposition | owners |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PCM-001 | Accordion | src/components/ui/accordion/Accordion.vue | @mkbabb/glass-ui | accordion/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P102 |
| PCM-002 | AccordionContent | src/components/ui/accordion/AccordionContent.vue | @mkbabb/glass-ui | accordion/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P102 |
| PCM-003 | AccordionItem | src/components/ui/accordion/AccordionItem.vue | @mkbabb/glass-ui | accordion/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P102 |
| PCM-004 | AccordionTrigger | src/components/ui/accordion/AccordionTrigger.vue | @mkbabb/glass-ui | accordion/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P102 |
| PCM-005 | Alert | src/components/ui/alert/Alert.vue | @mkbabb/glass-ui | alert/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P073 |
| PCM-006 | AlertDescription | src/components/ui/alert/AlertDescription.vue | @mkbabb/glass-ui | alert/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P073 |
| PCM-007 | AlertTitle | src/components/ui/alert/AlertTitle.vue | @mkbabb/glass-ui | alert/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P073 |
| PCM-008 | AnimatedDigit | src/components/custom/animated-digit/AnimatedDigit.vue | @mkbabb/glass-ui/animated-digit | animated-digit/modify | 2 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P078 |
| PCM-009 | Aurora | src/components/custom/aurora/Aurora.vue | @mkbabb/glass-ui/aurora | aurora/modify | 1 | 1 | 10 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P046 |
| PCM-010 | Avatar | src/components/ui/avatar/Avatar.vue | @mkbabb/glass-ui | avatar/modify | 1 | 1 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P071 |
| PCM-011 | AvatarFallback | src/components/ui/avatar/AvatarFallback.vue | @mkbabb/glass-ui | avatar/modify | 1 | 0 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P071 |
| PCM-012 | AvatarImage | src/components/ui/avatar/AvatarImage.vue | @mkbabb/glass-ui | avatar/modify | 1 | 1 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P071 |
| PCM-013 | Badge | src/components/ui/badge/Badge.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/badge | badge/modify | 17 | 0 | 7 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P072 |
| PCM-014 | Blob | src/components/custom/blob/Blob.vue | @mkbabb/glass-ui/blob | blob/modify | 0 | 1 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P047 |
| PCM-015 | Button | src/components/ui/button/Button.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/button | button/modify | 84 | 14 | 45 | 8 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P065 |
| PCM-016 | Card | src/components/ui/card/Card.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 24 | 12 | 19 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P109 |
| PCM-017 | CardAction | src/components/ui/card/CardAction.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P109 |
| PCM-018 | CardContent | src/components/ui/card/CardContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 4 | 7 | 7 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P109 |
| PCM-019 | CardDescription | src/components/ui/card/CardDescription.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 1 | 0 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P109 |
| PCM-020 | CardFooter | src/components/ui/card/CardFooter.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P109 |
| PCM-021 | CardHeader | src/components/ui/card/CardHeader.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 1 | 0 | 4 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P109 |
| PCM-022 | CardTitle | src/components/ui/card/CardTitle.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 1 | 1 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P109 |
| PCM-023 | Carousel | src/components/ui/carousel/Carousel.vue | @mkbabb/glass-ui/carousel | carousel/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P119 |
| PCM-024 | CarouselContent | src/components/ui/carousel/CarouselContent.vue | @mkbabb/glass-ui/carousel | carousel/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P119 |
| PCM-025 | CarouselItem | src/components/ui/carousel/CarouselItem.vue | @mkbabb/glass-ui/carousel | carousel/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P119 |
| PCM-026 | CarouselNext | src/components/ui/carousel/CarouselNext.vue | @mkbabb/glass-ui/carousel | carousel/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P119 |
| PCM-027 | CarouselPager | src/components/ui/carousel/CarouselPager.vue | @mkbabb/glass-ui/carousel | carousel/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P119 |
| PCM-028 | CarouselPrevious | src/components/ui/carousel/CarouselPrevious.vue | @mkbabb/glass-ui/carousel | carousel/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P119 |
| PCM-029 | ChassisDivider | src/components/custom/instrument-chassis/ChassisDivider.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/instrument-chassis | instrument-chassis/modify | 1 | 0 | 1 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P122 |
| PCM-030 | Checkbox | src/components/ui/checkbox/Checkbox.vue | @mkbabb/glass-ui | checkbox/modify | 3 | 0 | 3 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P086 |
| PCM-031 | Chip | src/components/custom/chip/Chip.vue | @mkbabb/glass-ui/chip | chip/modify | 0 | 0 | 3 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P091 |
| PCM-032 | Collapsible | src/components/ui/collapsible/Collapsible.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/collapsible | collapsible/modify | 7 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P101 |
| PCM-033 | CollapsibleContent | src/components/ui/collapsible/CollapsibleContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/collapsible | collapsible/modify | 7 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P101 |
| PCM-034 | CollapsibleTrigger | src/components/ui/collapsible/CollapsibleTrigger.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/collapsible | collapsible/modify | 6 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P101 |
| PCM-035 | ColorSwatch | src/components/custom/color-swatch/ColorSwatch.vue | @mkbabb/glass-ui/color-swatch | color-swatch/rename | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P081 |
| PCM-036 | Combobox | src/components/ui/combobox/Combobox.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-037 | ComboboxAnchor | src/components/ui/combobox/ComboboxAnchor.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-038 | ComboboxCancel | external:reka-ui#ComboboxCancel | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-039 | ComboboxEmpty | src/components/ui/combobox/ComboboxEmpty.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-040 | ComboboxGroup | src/components/ui/combobox/ComboboxGroup.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-041 | ComboboxInput | src/components/ui/combobox/ComboboxInput.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-042 | ComboboxItem | src/components/ui/combobox/ComboboxItem.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-043 | ComboboxItemIndicator | src/components/ui/combobox/ComboboxItemIndicator.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-044 | ComboboxList | src/components/ui/combobox/ComboboxList.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-045 | ComboboxSeparator | src/components/ui/combobox/ComboboxSeparator.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-046 | ComboboxTrigger | external:reka-ui#ComboboxTrigger | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-047 | ComboboxViewport | src/components/ui/combobox/ComboboxViewport.vue | @mkbabb/glass-ui/forms | combobox/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P096 |
| PCM-048 | Command | src/components/ui/command/Command.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 2 | 0 | 1 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P108 |
| PCM-049 | CommandDialog | src/components/ui/command/CommandDialog.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P108 |
| PCM-050 | CommandEmpty | src/components/ui/command/CommandEmpty.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 1 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P108 |
| PCM-051 | CommandGroup | src/components/ui/command/CommandGroup.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 1 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P108 |
| PCM-052 | CommandInput | src/components/ui/command/CommandInput.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 1 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P108 |
| PCM-053 | CommandItem | src/components/ui/command/CommandItem.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 2 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P108 |
| PCM-054 | CommandList | src/components/ui/command/CommandList.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 2 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P108 |
| PCM-055 | CommandSeparator | src/components/ui/command/CommandSeparator.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P108 |
| PCM-056 | CommandShortcut | src/components/ui/command/CommandShortcut.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/command | command/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P108 |
| PCM-057 | CompletionSeal | src/components/custom/completion-seal/CompletionSeal.vue | @mkbabb/glass-ui/completion-seal | completion-seal/rename | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P123 |
| PCM-058 | Configurator | src/components/custom/configurator/Configurator.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/configurator | configurator/modify | 2 | 0 | 5 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P052, BI.W-P059 |
| PCM-059 | ConfiguratorLayer | src/components/custom/configurator/ConfiguratorLayer.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/configurator | configurator/modify | 7 | 0 | 6 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P052, BI.W-P059 |
| PCM-060 | ConfiguratorRow | src/components/custom/configurator/ConfiguratorRow.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/configurator | configurator/modify | 3 | 1 | 5 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P052, BI.W-P059 |
| PCM-061 | Constellation | src/components/custom/constellation/Constellation.vue | @mkbabb/glass-ui/constellation | constellation/modify | 1 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P048 |
| PCM-062 | DarkModeToggle | src/components/custom/controls/DarkModeToggle.vue | @mkbabb/glass-ui/controls | dark-mode-toggle/rename | 9 | 5 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P082 |
| PCM-063 | DataTable | src/components/ui/data-table/DataTable.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/data-table | data-table/modify | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P116 |
| PCM-064 | DataTablePagination | src/components/ui/data-table/DataTablePagination.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/data-table | data-table/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P116 |
| PCM-065 | DeckPager | src/components/custom/deck/DeckPager.vue | @mkbabb/glass-ui/deck | deck/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P121 |
| PCM-066 | Dialog | src/components/ui/dialog/Dialog.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 12 | 3 | 8 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P106 |
| PCM-067 | DialogClose | src/components/ui/dialog/DialogClose.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 0 | 0 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P106 |
| PCM-068 | DialogContent | src/components/ui/dialog/DialogContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 12 | 3 | 8 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P106 |
| PCM-069 | DialogDescription | src/components/ui/dialog/DialogDescription.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 10 | 3 | 8 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P106 |
| PCM-070 | DialogFooter | src/components/ui/dialog/DialogFooter.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 9 | 2 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P106 |
| PCM-071 | DialogHeader | src/components/ui/dialog/DialogHeader.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 9 | 1 | 6 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P106 |
| PCM-072 | DialogScrollContent | src/components/ui/dialog/DialogScrollContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P106 |
| PCM-073 | DialogTitle | src/components/ui/dialog/DialogTitle.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 11 | 3 | 8 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P106 |
| PCM-074 | DialogTrigger | src/components/ui/dialog/DialogTrigger.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dialog | dialog/modify | 0 | 1 | 4 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P106 |
| PCM-075 | DockBackgroundToggle | src/components/custom/dock/DockBackgroundToggle.vue | @mkbabb/glass-ui/dock | dock/modify | 0 | 0 | 4 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-076 | DockControl | src/components/custom/dock/DockControl.vue | @mkbabb/glass-ui/dock | dock/modify | 0 | 0 | 13 | 2 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-077 | DockCrossfade | src/components/custom/dock/DockCrossfade.vue | @mkbabb/glass-ui/dock | dock/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-078 | DockLayer | src/components/custom/dock/DockLayer.vue | @mkbabb/glass-ui/dock | dock/modify | 1 | 0 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-079 | DockLayerGroup | src/components/custom/dock/DockLayerGroup.vue | @mkbabb/glass-ui/dock | dock/modify | 1 | 0 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-080 | DockSection | src/components/custom/dock/DockSection.vue | @mkbabb/glass-ui/dock | dock/modify | 0 | 0 | 3 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-081 | DockSeparator | src/components/custom/dock/DockSeparator.vue | @mkbabb/glass-ui/dock | dock/modify | 3 | 10 | 6 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-082 | DockStack | src/components/custom/dock/DockStack.vue | @mkbabb/glass-ui/dock | dock/modify | 0 | 0 | 3 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-083 | DockTrigger | src/components/custom/dock/DockTrigger.vue | @mkbabb/glass-ui/dock | dock/modify | 0 | 0 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-084 | Drawer | src/components/ui/drawer/Drawer.vue | @mkbabb/glass-ui/drawer | drawer/modify | 4 | 1 | 1 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P107 |
| PCM-085 | DrawerClose | external:reka-ui#DialogClose | @mkbabb/glass-ui/drawer | drawer/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P107 |
| PCM-086 | DrawerContent | src/components/ui/drawer/DrawerContent.vue | @mkbabb/glass-ui/drawer | drawer/modify | 4 | 1 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P107 |
| PCM-087 | DrawerDescription | src/components/ui/drawer/DrawerDescription.vue | @mkbabb/glass-ui/drawer | drawer/modify | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P107 |
| PCM-088 | DrawerFooter | src/components/ui/drawer/DrawerFooter.vue | @mkbabb/glass-ui/drawer | drawer/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P107 |
| PCM-089 | DrawerHeader | src/components/ui/drawer/DrawerHeader.vue | @mkbabb/glass-ui/drawer | drawer/modify | 1 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P107 |
| PCM-090 | DrawerOverlay | src/components/ui/drawer/DrawerOverlay.vue | @mkbabb/glass-ui/drawer | drawer/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P107 |
| PCM-091 | DrawerPortal | external:reka-ui#DialogPortal | @mkbabb/glass-ui/drawer | drawer/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P107 |
| PCM-092 | DrawerTitle | src/components/ui/drawer/DrawerTitle.vue | @mkbabb/glass-ui/drawer | drawer/modify | 4 | 1 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P107 |
| PCM-093 | DrawerTrigger | external:reka-ui#DialogTrigger | @mkbabb/glass-ui/drawer | drawer/modify | 1 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P107 |
| PCM-094 | DropdownMenu | src/components/ui/dropdown-menu/DropdownMenu.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 13 | 1 | 4 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P105 |
| PCM-095 | DropdownMenuCheckboxItem | src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 1 | 0 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P105 |
| PCM-096 | DropdownMenuContent | src/components/ui/dropdown-menu/DropdownMenuContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 13 | 1 | 4 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P105 |
| PCM-097 | DropdownMenuGroup | src/components/ui/dropdown-menu/DropdownMenuGroup.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-098 | DropdownMenuItem | src/components/ui/dropdown-menu/DropdownMenuItem.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 11 | 1 | 3 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P105 |
| PCM-099 | DropdownMenuLabel | src/components/ui/dropdown-menu/DropdownMenuLabel.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 3 | 0 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P105 |
| PCM-100 | DropdownMenuPortal | external:reka-ui#DropdownMenuPortal | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 0 | 0 | ZERO_CAUSAL_DEMAND_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-101 | DropdownMenuRadioGroup | src/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 3 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-102 | DropdownMenuRadioItem | src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 3 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-103 | DropdownMenuSeparator | src/components/ui/dropdown-menu/DropdownMenuSeparator.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 5 | 1 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P105 |
| PCM-104 | DropdownMenuShortcut | src/components/ui/dropdown-menu/DropdownMenuShortcut.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-105 | DropdownMenuSub | src/components/ui/dropdown-menu/DropdownMenuSub.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-106 | DropdownMenuSubContent | src/components/ui/dropdown-menu/DropdownMenuSubContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-107 | DropdownMenuSubTrigger | src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P105 |
| PCM-108 | DropdownMenuTrigger | src/components/ui/dropdown-menu/DropdownMenuTrigger.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/dropdown-menu | dropdown-menu/modify | 7 | 0 | 3 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P105 |
| PCM-109 | EasingConfigurator | src/components/custom/easing/EasingConfigurator.vue | @mkbabb/glass-ui/easing | easing/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P124 |
| PCM-110 | EasingPicker | src/components/custom/easing/EasingPicker.vue | @mkbabb/glass-ui/easing | easing/modify | 0 | 3 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P124 |
| PCM-111 | ExpandableContainer | src/components/custom/expandable-container/ExpandableContainer.vue | @mkbabb/glass-ui/expandable-container | expandable-container/modify | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P110 |
| PCM-112 | FadingScroll | src/components/custom/fading-scroll/FadingScroll.vue | @mkbabb/glass-ui/fading-scroll | fading-scroll/modify | 3 | 2 | 7 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P111 |
| PCM-113 | FocusScope | src/components/ui/focus-scope/FocusScope.vue | @mkbabb/glass-ui/focus-scope | focus-scope/rename | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P100 |
| PCM-114 | FourierField | src/components/custom/fourier-field/FourierField.vue | @mkbabb/glass-ui/fourier-field | fourier-field/modify | 2 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P049 |
| PCM-115 | FuzzySearch | src/components/custom/search/FuzzySearch.vue | @mkbabb/glass-ui/search | search/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P099 |
| PCM-116 | GlassCarouselPager | src/components/ui/carousel/GlassCarouselPager.vue | @mkbabb/glass-ui/carousel | carousel/modify | 0 | 0 | 0 | 0 | DELETE_EXACT_MEMBER | BI.W-P119 |
| PCM-117 | GlassDock | src/components/custom/dock/GlassDock.vue | @mkbabb/glass-ui/dock | dock/modify | 10 | 3 | 13 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042 |
| PCM-118 | GlassTimeline | src/components/custom/timeline/GlassTimeline.vue | @mkbabb/glass-ui/timeline | timeline/modify | 1 | 0 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P120 |
| PCM-119 | GooFilter | src/components/custom/goo-filter/GooFilter.vue | @mkbabb/glass-ui/dock | goo-filter/rehome | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P118, BI.W-P121 |
| PCM-120 | HandMark | src/components/custom/handmark/HandMark.vue | @mkbabb/glass-ui/handmark | handmark/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P051 |
| PCM-121 | HeaderRibbon | src/components/custom/header-ribbon/HeaderRibbon.vue | @mkbabb/glass-ui/header-ribbon | header-ribbon/modify | 0 | 1 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P114 |
| PCM-122 | IconChip | src/components/custom/icon-chip/IconChip.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/icon-chip | chip/delete | 0 | 0 | 39 | 1 | DELETE_WITH_OWNING_CONCEPT_MEMBER | BI.W-P091 |
| PCM-123 | IconTooltip | src/components/custom/icon-tooltip/IconTooltip.vue | @mkbabb/glass-ui/icon-tooltip | tooltip/delete | 2 | 5 | 2 | 1 | DELETE_WITH_OWNING_CONCEPT_MEMBER | BI.W-P104 |
| PCM-124 | InfiniteScroll | src/components/custom/infinite-scroll/InfiniteScroll.vue | @mkbabb/glass-ui/infinite-scroll | infinite-scroll/modify | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P112 |
| PCM-125 | InkMark | src/components/custom/handmark/HandMark.vue | @mkbabb/glass-ui/handmark | handmark/modify | 2 | 0 | 0 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P051 |
| PCM-126 | Input | src/components/ui/input/Input.vue | @mkbabb/glass-ui/forms | input/modify | 16 | 5 | 11 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P067 |
| PCM-127 | InstrumentChassis | src/components/custom/instrument-chassis/InstrumentChassis.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/instrument-chassis | instrument-chassis/modify | 5 | 0 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P122 |
| PCM-128 | Label | src/components/ui/label/Label.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/label | label/modify | 9 | 1 | 18 | 5 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P066 |
| PCM-129 | LabeledField | src/components/custom/labeled-field/LabeledField.vue | @mkbabb/glass-ui/labeled-field | labeled-field/modify | 3 | 1 | 2 | 4 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P098 |
| PCM-130 | LabeledInput | src/components/custom/labeled-field/LabeledInput.vue | @mkbabb/glass-ui/labeled-field | labeled-field/modify | 0 | 1 | 3 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P098 |
| PCM-131 | LabeledSelect | src/components/custom/labeled-field/LabeledSelect.vue | @mkbabb/glass-ui/labeled-field | labeled-field/modify | 0 | 2 | 8 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P098 |
| PCM-132 | LabeledSlider | src/components/custom/labeled-field/LabeledSlider.vue | @mkbabb/glass-ui/labeled-field | labeled-field/modify | 0 | 3 | 14 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P098 |
| PCM-133 | LabeledSwitch | src/components/custom/labeled-field/LabeledSwitch.vue | @mkbabb/glass-ui/labeled-field | labeled-field/modify | 0 | 1 | 5 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P098 |
| PCM-134 | LiquidGrid | src/components/custom/liquid-grid/LiquidGrid.vue | @mkbabb/glass-ui/liquid-grid | liquid-grid/modify | 0 | 0 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P050 |
| PCM-135 | MetricBadge | src/components/custom/metric-badge/MetricBadge.vue | @mkbabb/glass-ui/metric-badge | metric/rename | 14 | 1 | 2 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P117 |
| PCM-136 | MetricCell | src/components/custom/metric-cell/MetricCell.vue | @mkbabb/glass-ui/metric-cell | metric/rename | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P117 |
| PCM-137 | MetricRow | src/components/custom/metric-stack/MetricRow.vue | @mkbabb/glass-ui/metric-stack | metric/rename | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P117 |
| PCM-138 | MetricStack | src/components/custom/metric-stack/MetricStack.vue | @mkbabb/glass-ui/metric-stack | metric/rename | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P117 |
| PCM-139 | Notification | src/components/ui/notification/Notification.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/notification | notification-toast/delete | 0 | 0 | 1 | 0 | DELETE_WITH_OWNING_CONCEPT_MEMBER | BI.W-P074 |
| PCM-140 | NumberField | src/components/ui/number-field/NumberField.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/number-field | number-field/modify | 5 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P094 |
| PCM-141 | NumberFieldContent | src/components/ui/number-field/NumberFieldContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/number-field | number-field/modify | 5 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P094 |
| PCM-142 | NumberFieldDecrement | src/components/ui/number-field/NumberFieldDecrement.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/number-field | number-field/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P094 |
| PCM-143 | NumberFieldIncrement | src/components/ui/number-field/NumberFieldIncrement.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/number-field | number-field/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P094 |
| PCM-144 | NumberFieldInput | src/components/ui/number-field/NumberFieldInput.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/number-field | number-field/modify | 5 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P094 |
| PCM-145 | PagerDots | src/components/custom/pager-dots/PagerDots.vue | @mkbabb/glass-ui/pager-dots | pager-dots/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P118 |
| PCM-146 | PaperBackdrop | src/components/custom/paper-backdrop/PaperBackdrop.vue | @mkbabb/glass-ui/paper-backdrop | paper-backdrop/modify | 2 | 0 | 1 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P084 |
| PCM-147 | Popover | src/components/ui/popover/Popover.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/popover | popover/modify | 12 | 1 | 5 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P103 |
| PCM-148 | PopoverContent | src/components/ui/popover/PopoverContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/popover | popover/modify | 12 | 1 | 5 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P103 |
| PCM-149 | PopoverTrigger | src/components/ui/popover/PopoverTrigger.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/popover | popover/modify | 12 | 1 | 5 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P103 |
| PCM-150 | Progress | src/components/ui/progress/Progress.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/progress | progress/modify | 5 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P075 |
| PCM-151 | ProgressDefault | src/components/ui/progress/ProgressDefault.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/progress | progress/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P075 |
| PCM-152 | ProgressGradient | src/components/ui/progress/ProgressGradient.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/progress | progress/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P075 |
| PCM-153 | ProgressLiquid | src/components/ui/progress/ProgressLiquid.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/progress | progress/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P075 |
| PCM-154 | ProgressSectioned | src/components/ui/progress/ProgressSectioned.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/progress | progress/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P075 |
| PCM-155 | Pulse | src/components/custom/pulse/Pulse.vue | @mkbabb/glass-ui/pulse | pulse/modify | 5 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P076 |
| PCM-156 | RadioGroup | src/components/ui/radio-group/RadioGroup.vue | @mkbabb/glass-ui | radio-group/modify | 0 | 0 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P087 |
| PCM-157 | RadioGroupItem | src/components/ui/radio-group/RadioGroupItem.vue | @mkbabb/glass-ui | radio-group/modify | 0 | 0 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P087 |
| PCM-158 | ScrollCard | src/components/ui/card/ScrollCard.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P109 |
| PCM-159 | ScrollCardHeader | src/components/ui/card/ScrollCardHeader.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/card | card/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P109 |
| PCM-160 | SearchBar | src/components/custom/search/SearchBar.vue | @mkbabb/glass-ui/search | search/modify | 0 | 4 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P099 |
| PCM-161 | Section | src/components/ui/section/Section.vue | @mkbabb/glass-ui | section/modify | 0 | 0 | 97 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P064 |
| PCM-162 | SegmentedTabs | src/components/custom/tabs/SegmentedTabs.vue | @mkbabb/glass-ui/tabs | tabs/modify | 7 | 3 | 7 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P092 |
| PCM-163 | Select | src/components/ui/select/Select.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 12 | 3 | 6 | 3 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-164 | SelectContent | src/components/ui/select/SelectContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 12 | 3 | 6 | 3 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-165 | SelectGroup | src/components/ui/select/SelectGroup.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 1 | 3 | 1 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-166 | SelectItem | src/components/ui/select/SelectItem.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 12 | 3 | 6 | 3 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-167 | SelectLabel | src/components/ui/select/SelectLabel.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 1 | 1 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-168 | SelectScrollDownButton | src/components/ui/select/SelectScrollDownButton.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P095 |
| PCM-169 | SelectScrollUpButton | src/components/ui/select/SelectScrollUpButton.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 0 | 0 | 0 | 1 | INTERNAL_COMPOSITION_PUBLICATION_JUDGMENT_REQUIRED | BI.W-P095 |
| PCM-170 | SelectSeparator | src/components/ui/select/SelectSeparator.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 1 | 1 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-171 | SelectTrigger | src/components/ui/select/SelectTrigger.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 12 | 1 | 4 | 3 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-172 | SelectValue | src/components/ui/select/SelectValue.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/select | select/modify | 10 | 3 | 6 | 3 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P095 |
| PCM-173 | Separator | src/components/ui/separator/Separator.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/separator | separator/modify | 6 | 4 | 3 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P069 |
| PCM-174 | Skeleton | src/components/ui/skeleton/Skeleton.vue | @mkbabb/glass-ui | skeleton/modify | 3 | 0 | 1 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P070 |
| PCM-175 | Slider | src/components/ui/slider/Slider.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/slider | slider/modify | 17 | 3 | 6 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P093 |
| PCM-176 | SortableHandle | src/components/custom/sortable-list/SortableHandle.vue | @mkbabb/glass-ui/sortable-list | sortable-list/modify | 3 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P007 |
| PCM-177 | SortableItem | src/components/custom/sortable-list/SortableItem.vue | @mkbabb/glass-ui/sortable-list | sortable-list/modify | 3 | 0 | 3 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P007 |
| PCM-178 | SortableList | src/components/custom/sortable-list/SortableList.vue | @mkbabb/glass-ui/sortable-list | sortable-list/modify | 3 | 0 | 3 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P007 |
| PCM-179 | SpaView | src/components/custom/spa-view/SpaView.vue | @mkbabb/glass-ui/spa-view | spa-view/rename | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P113 |
| PCM-180 | SplitChars | src/components/custom/split-chars/SplitChars.vue | @mkbabb/glass-ui | split-chars/modify | 0 | 0 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P079 |
| PCM-181 | StackedIconGroup | src/components/custom/stacked-icons/StackedIconGroup.vue | @mkbabb/glass-ui/stacked-icons | stacked-icons/delete | 0 | 0 | 1 | 0 | DELETE_WITH_OWNING_CONCEPT_MEMBER | BI.W-P083 |
| PCM-182 | StatusDot | src/components/custom/status-dot/StatusDot.vue | @mkbabb/glass-ui/status-dot | status-dot/modify | 11 | 2 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P077 |
| PCM-183 | Surface | src/components/ui/surface/Surface.vue | @mkbabb/glass-ui/surface | surface/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P063 |
| PCM-184 | Switch | src/components/ui/switch/Switch.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/switch | switch/modify | 5 | 0 | 7 | 1 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P088 |
| PCM-185 | Table | src/components/ui/table/Table.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 2 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-186 | TableBody | src/components/ui/table/TableBody.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-187 | TableCaption | src/components/ui/table/TableCaption.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-188 | TableCell | src/components/ui/table/TableCell.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 2 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-189 | TableEmpty | src/components/ui/table/TableEmpty.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-190 | TableHead | src/components/ui/table/TableHead.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-191 | TableHeader | src/components/ui/table/TableHeader.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-192 | TableRow | src/components/ui/table/TableRow.vue | @mkbabb/glass-ui | table/modify | 0 | 0 | 1 | 2 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P115 |
| PCM-193 | TagsInput | src/components/ui/tags-input/TagsInput.vue | @mkbabb/glass-ui | tags-input/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P097 |
| PCM-194 | TagsInputInput | src/components/ui/tags-input/TagsInputInput.vue | @mkbabb/glass-ui | tags-input/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P097 |
| PCM-195 | TagsInputItem | src/components/ui/tags-input/TagsInputItem.vue | @mkbabb/glass-ui | tags-input/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P097 |
| PCM-196 | TagsInputItemDelete | src/components/ui/tags-input/TagsInputItemDelete.vue | @mkbabb/glass-ui | tags-input/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P097 |
| PCM-197 | TagsInputItemText | src/components/ui/tags-input/TagsInputItemText.vue | @mkbabb/glass-ui | tags-input/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P097 |
| PCM-198 | Textarea | src/components/ui/textarea/Textarea.vue | @mkbabb/glass-ui/forms | textarea/modify | 1 | 0 | 3 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P068 |
| PCM-199 | Toast | src/components/ui/toast/Toast.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toast | notification-toast/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P074 |
| PCM-200 | ToastAction | src/components/ui/toast/ToastAction.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toast | notification-toast/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P074 |
| PCM-201 | ToastClose | src/components/ui/toast/ToastClose.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toast | notification-toast/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P074 |
| PCM-202 | ToastDescription | src/components/ui/toast/ToastDescription.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toast | notification-toast/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P074 |
| PCM-203 | Toaster | src/components/ui/toast/Toaster.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toast | notification-toast/modify | 2 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P074 |
| PCM-204 | ToastTitle | src/components/ui/toast/ToastTitle.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toast | notification-toast/modify | 0 | 0 | 1 | 1 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P074 |
| PCM-205 | Toggle | src/components/ui/toggle/Toggle.vue | @mkbabb/glass-ui | toggle/modify | 0 | 0 | 1 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P089 |
| PCM-206 | ToggleGroup | src/components/ui/toggle-group/ToggleGroup.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toggle-group | toggle-group/modify | 17 | 1 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P090 |
| PCM-207 | ToggleGroupItem | src/components/ui/toggle-group/ToggleGroupItem.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/toggle-group | toggle-group/modify | 17 | 1 | 4 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P090 |
| PCM-208 | Tooltip | src/components/ui/tooltip/Tooltip.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/tooltip | tooltip/modify | 1 | 1 | 4 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P104 |
| PCM-209 | TooltipContent | src/components/ui/tooltip/TooltipContent.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/tooltip | tooltip/modify | 1 | 1 | 4 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P104 |
| PCM-210 | TooltipProvider | src/components/ui/tooltip/TooltipProvider.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/tooltip | tooltip/modify | 3 | 2 | 5 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P104 |
| PCM-211 | TooltipTrigger | src/components/ui/tooltip/TooltipTrigger.vue | @mkbabb/glass-ui, @mkbabb/glass-ui/tooltip | tooltip/modify | 1 | 1 | 4 | 2 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P104 |
| PCM-212 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue | @mkbabb/glass-ui/typewriter | typewriter/modify | 1 | 0 | 1 | 0 | CONSUMER_BOUND_RETAIN_OR_MIGRATE | BI.W-P080 |
| PCM-213 | WatercolorDot | src/components/custom/watercolor-dot/WatercolorDot.vue | @mkbabb/glass-ui/watercolor-dot | watercolor-dot/modify | 0 | 11 | 2 | 0 | DEMO_VISIBLE_PRODUCT_JUDGMENT_REQUIRED | BI.W-P051 |

The JSON preserves every exact import and tag witness. This discovery pass deliberately does not convert demo visibility or internal composition into publication demand and does not let a used sibling donate demand.
