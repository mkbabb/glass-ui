# BI.W-P006 — MS2 — dissolve generic utils into semantic owners

**Status:** PLANNED
**Topological stratum:** BI.S03
**Formation family:** structure
**Core centers:** C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P006`

## Intent

Remove src/utils as a generic home and place each surviving function with the concept that owns its semantics.

## Exact scope

- Move cn into the component styling substrate, coalesceMetric into the metric family, and PRNG into procedural math ownership.
- Repoint every syntax-level importer before deleting src/utils and its barrel.
- Delete any utility with no runtime consumer instead of preserving a convenience export.
- Keep public behavior only through its semantic entry; do not create a shared compatibility barrel.

## File manifest (226)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/code/Code.vue | — | bc7bf54d7bdc59ceac49aa0857c464d4c6c2de9f | source base |
| 2 | repair | demo/chassis/code/CodeBlock.vue | — | cb7518f7dac78b6d7f446c3ce940332427ac220f | source base |
| 3 | repair | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 4 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 5 | repair | demo/chassis/landing/SectionPreviewCard.vue | — | 7809e9f4ceff868495b4b8706e5a412ea1808dcd | source base |
| 6 | repair | demo/chassis/page/StoryPage.vue | — | 0fe1e8036e707a34599b151634d5672a12ff4428 | source base |
| 7 | repair | demo/chassis/section/StorySection.vue | — | 88820a176ed137574e7b228435a5c26510c86653 | source base |
| 8 | repair | demo/chassis/showcase/ShowcaseFrame.vue | — | f3ca53e001a4ccebf55c203b2c204d6eafc42a58 | source base |
| 9 | repair | demo/chassis/showcase/SpecimenFrame.vue | — | b21dc3b68ea45cb5daf015809f0f4398f34e4809 | source base |
| 10 | repair | demo/chassis/showcase/TokenLadder.vue | — | c39159dd33f71a950efae5260422bbda0d1d6b9c | source base |
| 11 | repair | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 12 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 13 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 14 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 15 | repair | demo/stories/data/avatar.vue | — | 2cc58a59a3153e9f6fa88c311f6bbabd96cd2c06 | source base |
| 16 | repair | demo/stories/data/data-table.vue | — | b47491c40e8d819de70a227b54c02df4f732f3f0 | source base |
| 17 | repair | demo/stories/data/infinite-scroll.vue | — | faea27c9c706cc99221d59aa6e94219b6eaee43b | source base |
| 18 | repair | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 19 | repair | demo/stories/data/table.vue | — | 58c29de2277622d630fc2074b40a7401a2c48688 | source base |
| 20 | repair | demo/stories/data/tags-input.vue | — | 82920c7ce0a17d515f6815d03da15cddff321587 | source base |
| 21 | repair | demo/stories/data/timeline.vue | — | cbea77cde25c94bbf1e42dbbb67530935c09fe93 | source base |
| 22 | repair | demo/stories/data/TimelineContinuousBody.vue | — | ff412634257566da40a4891789203c7e7c36c904 | source base |
| 23 | repair | demo/stories/data/TimelineSegmentedBody.vue | — | 9546a0e569cdd42f7e964e8a19a8c1408c27c4de | source base |
| 24 | repair | demo/stories/data/virtual-section.vue | — | 4fe0827b08bc8d2098782789a40a979b65131d8b | source base |
| 25 | repair | demo/stories/display/badge.vue | — | 2cc390d89ae7e0025b00b6d7dac973ba36d09a85 | source base |
| 26 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 27 | repair | demo/stories/dock/layers.vue | — | 11004b992842ec990758800b9ebbb1d1f2184067 | source base |
| 28 | repair | demo/stories/forms/slider.vue | — | 7ba393813177863acc6ac6a34292570759e6f5ec | source base |
| 29 | repair | demo/stories/foundations/colors.vue | — | e135a8684cba765b758f96bbf2ae5a4d72f5831b | source base |
| 30 | repair | demo/stories/foundations/motion.vue | — | 137d730ba1e4f20e9d3a186e5d8462e3192db3d8 | source base |
| 31 | repair | demo/stories/foundations/paper-glass.vue | — | 2301793abe89df723239e3600d526c54a5d06da6 | source base |
| 32 | repair | demo/stories/foundations/radii.vue | — | 9ac8e4263414017f8e04d818c374d2d8fd7f9687 | source base |
| 33 | repair | demo/stories/foundations/shadows.vue | — | 9603298a8cfaee80168b9956297b952139d7f615 | source base |
| 34 | repair | demo/stories/foundations/typography.vue | — | f4aa9d7df182b7ed4fff85c82a8420ca92bae353 | source base |
| 35 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 36 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 37 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 38 | repair | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 39 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 40 | repair | demo/stories/substrates/aurora/PresetPickerRow.vue | — | 54862db17b5598523816cfc15ea18927a76c1b09 | source base |
| 41 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 42 | repair | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 43 | repair | docs/STRUCTURE.md | — | — | BI.W-P005 |
| 44 | create | src/components/_shared/class-names.ts | — | — | source base |
| 45 | repair | src/components/custom/animated-digit/AnimatedDigit.vue | — | d4cfc7c55ba0c7732474b15b0795a8f5f8de52ff | source base |
| 46 | repair | src/components/custom/blob/composables/useBlobSatellites.ts | — | d732434684420e8a09658f626f23d68d9bdfb375 | source base |
| 47 | repair | src/components/custom/border-progress/BorderProgress.vue | — | a360d02582d024d5fece6be3140ad89cb6afdd63 | source base |
| 48 | repair | src/components/custom/chip/Chip.vue | — | a8399390d73200c3e359543f7800effd4c67df33 | source base |
| 49 | repair | src/components/custom/color-swatch/ColorSwatch.vue | — | 75364e6a822c4452d949bfa18468b8cf5043c8c6 | source base |
| 50 | repair | src/components/custom/completion-seal/CompletionSeal.vue | — | 389d4b73cc9b4fb9d0a317c6a1cd0b32fcc42628 | source base |
| 51 | repair | src/components/custom/configurator/Configurator.vue | — | 555fb20d4e71b6759906e5f20c388048f3f75116 | source base |
| 52 | repair | src/components/custom/configurator/ConfiguratorLayer.vue | — | e96685e03cf5cd286511381c56c28039ab751bd6 | source base |
| 53 | repair | src/components/custom/configurator/ConfiguratorRow.vue | — | 07cfd90e82319ff4ff4212dca8f60b45cc139789 | source base |
| 54 | repair | src/components/custom/constellation/composables/useConstellation.ts | — | f72a66f59465ee96bff2d6f3bdd8deee87f83c83 | source base |
| 55 | repair | src/components/custom/constellation/Constellation.vue | — | 0fe8406e756731d5c48e5b611563fdedfb946733 | source base |
| 56 | repair | src/components/custom/controls/DarkModeToggle.vue | — | 3b1925a6bd9ae1d2ae39c4d2f45120bbe5900343 | source base |
| 57 | repair | src/components/custom/dock/DockControl.vue | — | 495ecf7d70ad258d121b8af663e00d715227fe27 | source base |
| 58 | repair | src/components/custom/dock/DockTrigger.vue | — | 312e4c485a6d1475a2499e5acfd7423550664857 | source base |
| 59 | repair | src/components/custom/expandable-container/ExpandableContainer.vue | — | 362e43da205eca6b0e7f71a7c8e6935f8f6f2445 | source base |
| 60 | repair | src/components/custom/fourier-field/FourierField.vue | — | f01c9228c2cffcc166435934bd131517f9874a26 | source base |
| 61 | repair | src/components/custom/handmark/geometry.ts | — | 64cf0114fa7c300645977e5964ce3eb62c571a7a | source base |
| 62 | repair | src/components/custom/handmark/ink.ts | — | 93306f30bd45a2f31571b5617684660547559ed2 | source base |
| 63 | repair | src/components/custom/handmark/noise.ts | — | 207554b607558ea5dd208bd8752431d6d3af802f | source base |
| 64 | repair | src/components/custom/handmark/README.md | — | 13b2a485604f3f9116c239bba17b29451fca6c71 | source base |
| 65 | repair | src/components/custom/icon-chip/IconChip.vue | — | 4d00976763c59a7b03895dcbb6a6144aa4365ed3 | source base |
| 66 | repair | src/components/custom/instrument-chassis/ChassisDivider.vue | — | 3b71133ae56c75a805fc3af9c3eccdac302e7ff3 | source base |
| 67 | repair | src/components/custom/instrument-chassis/InstrumentChassis.vue | — | 3175b39876ffc9bf02ffaee6e93278baae25aa47 | source base |
| 68 | repair | src/components/custom/labeled-field/LabeledField.vue | — | dd5884df7472e304a55812f68b81f5454edb73bc | source base |
| 69 | repair | src/components/custom/metric-badge/MetricBadge.vue | — | 3205586972955f4c6b06bf0aca307ef678a09bd3 | source base |
| 70 | repair | src/components/custom/metric-cell/MetricCell.vue | — | df7e8059d2982d2a8ae77e56d09266fa59f0016f | source base |
| 71 | repair | src/components/custom/metric-stack/MetricRow.vue | — | 4c8361de194b834886a7207a04922ac2efb009fe | source base |
| 72 | repair | src/components/custom/metric-stack/MetricStack.vue | — | 2ba2837163ce4088de6e908f59fb71b60f995840 | source base |
| 73 | repair | src/components/custom/pager-dots/PagerDots.vue | — | 7f64913d8ded8cbfe3044c004ab4568e5446bb8d | source base |
| 74 | repair | src/components/custom/paper-backdrop/PaperBackdrop.vue | — | 67da4e40c936460679176193482d07b8c5c233b2 | source base |
| 75 | repair | src/components/custom/pulse/Pulse.vue | — | 9be1df8a6815fa6d16c79205a52f6bed28056e45 | source base |
| 76 | repair | src/components/custom/search/FuzzySearch.vue | — | e5d266dd61636307abb9cfb73771255060100c9f | source base |
| 77 | repair | src/components/custom/search/SearchBar.vue | — | e2edd04ac95c6b447132bcee1ba54144b29b1897 | source base |
| 78 | repair | src/components/custom/split-chars/SplitChars.vue | — | c37b16229260d353c26467cc05529ac8568d7e61 | source base |
| 79 | repair | src/components/custom/status-dot/StatusDot.vue | — | 66832a931100678b03225c6f10dc289f7697bad7 | source base |
| 80 | repair | src/components/custom/tabs/SegmentedTabs.vue | — | 9f1a9faab3e1e32c50a9413799a5fac95481c3b3 | source base |
| 81 | repair | src/components/custom/typewriter/composables/useTypewriter.ts | — | 329a453287461f112c32dbe8ec84f5602551dc60 | source base |
| 82 | repair | src/components/custom/typewriter/index.ts | — | c9d309e329db46389f1bb95742bd6372df19947c | source base |
| 83 | repair | src/components/custom/typewriter/types.ts | — | 8a95a276b82a04ce413307be0b80aea81860776c | source base |
| 84 | repair | src/components/custom/watercolor-dot/prng.ts | — | 6f0e49a388729cd630e0eda355d0c4ad113b044a | source base |
| 85 | repair | src/components/custom/watercolor-dot/WatercolorDot.vue | — | e704f14890b0d709ece0494edb4fee011592f522 | source base |
| 86 | create | src/components/metric/coalesce-metric.ts | — | — | source base |
| 87 | repair | src/components/ui/_shared/ModalOverlay.vue | — | 369673b98aee28f187b8f9f82f222351c41beb9f | source base |
| 88 | repair | src/components/ui/accordion/AccordionContent.vue | — | b6d561c150283e4b74cab04316f022b65dfaea5b | source base |
| 89 | repair | src/components/ui/accordion/AccordionItem.vue | — | 9446dff2398e88f9bf1deadb67b717c67c7f9edb | source base |
| 90 | repair | src/components/ui/accordion/AccordionTrigger.vue | — | ae2a980fedaf97a320e87f3c3a5de932339d7ef2 | source base |
| 91 | repair | src/components/ui/alert/Alert.vue | — | 6c6256b997d2667903ff637cfe6b8e2639374626 | source base |
| 92 | repair | src/components/ui/alert/AlertDescription.vue | — | 772d9f3dde2cc2f6ae4e54590be242bee6b678a6 | source base |
| 93 | repair | src/components/ui/alert/AlertTitle.vue | — | e672ce73b02093884d94a13f2300be4d416abf2f | source base |
| 94 | repair | src/components/ui/avatar/Avatar.vue | — | 42d2beaeb995e36834ac9a34180915425fda6054 | source base |
| 95 | repair | src/components/ui/badge/Badge.vue | — | 9b388e0b8c459a4ef79aa3d8165fb94c00803e8c | source base |
| 96 | repair | src/components/ui/button/Button.vue | — | ee0f8139358617f8bdb16ef8225381f4be2777df | source base |
| 97 | repair | src/components/ui/card/Card.vue | — | c406a418ee4166cfa0a77adc15354e5454be1081 | source base |
| 98 | repair | src/components/ui/card/CardAction.vue | — | c9f5755457cc170fc2f880a133a61c9ece44af43 | source base |
| 99 | repair | src/components/ui/card/CardContent.vue | — | e3eb31ab07f76e72eafe85f05bb946ccf911bf94 | source base |
| 100 | repair | src/components/ui/card/CardDescription.vue | — | e8c6afca415c07750a07d18c35545c2a00227983 | source base |
| 101 | repair | src/components/ui/card/CardFooter.vue | — | 84f5335d155452b9c4b18d93e640daec1ae106f4 | source base |
| 102 | repair | src/components/ui/card/CardHeader.vue | — | 3fd714ddba54806c00cf1d45427c82c0348cb076 | source base |
| 103 | repair | src/components/ui/card/CardTitle.vue | — | 2f6a5165f93b609979188888a0797b6433034e66 | source base |
| 104 | repair | src/components/ui/card/ScrollCardHeader.vue | — | 9dd9f411ae37edb38cf621d049cac45207943868 | source base |
| 105 | repair | src/components/ui/carousel/Carousel.vue | — | 1c6a573270969178ff32637f7bedf4d8dd73e245 | source base |
| 106 | repair | src/components/ui/carousel/CarouselContent.vue | — | b3001d0a0e1dca90353f475d2f4ff8c4e8bd235a | source base |
| 107 | repair | src/components/ui/carousel/CarouselItem.vue | — | 9ca085a4cabe34f288b80c711e88b1376aaeaa80 | source base |
| 108 | repair | src/components/ui/carousel/CarouselNext.vue | — | 2cdce8639d918f66002be81581819f882fc825e7 | source base |
| 109 | repair | src/components/ui/carousel/CarouselPager.vue | — | 4b88eb77803f4ec01d94a223b18c82afe4e79d3b | source base |
| 110 | repair | src/components/ui/carousel/CarouselPrevious.vue | — | 3509b3aa8ebe31d2bf5dab8861c2d9fefcef150c | source base |
| 111 | repair | src/components/ui/carousel/GlassCarouselPager.vue | — | 4a15db16aa7754149ef73ddb6682bf8efdfce456 | source base |
| 112 | repair | src/components/ui/checkbox/Checkbox.vue | — | 2d3e4e17b13ca486d8e3afbe68744b09831088c7 | source base |
| 113 | repair | src/components/ui/collapsible/CollapsibleTrigger.vue | — | e1ffa3ba72d7953b844fc9fa40fcc6cf519c97af | source base |
| 114 | repair | src/components/ui/combobox/ComboboxAnchor.vue | — | eaf9dd5a1534b0def2efa2aeb5ade4fafe89ed66 | source base |
| 115 | repair | src/components/ui/combobox/ComboboxEmpty.vue | — | b99d936d78543cdda7af933e1c17a14aeacbf5e2 | source base |
| 116 | repair | src/components/ui/combobox/ComboboxGroup.vue | — | a49c2048b98ce2fbd45b3368fdd94e4ef01223f6 | source base |
| 117 | repair | src/components/ui/combobox/ComboboxInput.vue | — | f267ed6f321d5fc5c374a0fcb9bb96c1206a4976 | source base |
| 118 | repair | src/components/ui/combobox/ComboboxItem.vue | — | dca7bef8ad4a878ce411974abab8f98761af1a15 | source base |
| 119 | repair | src/components/ui/combobox/ComboboxItemIndicator.vue | — | c3451cb7f9014941502960560af42369a32cbe2e | source base |
| 120 | repair | src/components/ui/combobox/ComboboxList.vue | — | 87a5a1da07b6b1869ab0cae1f3c8c369250ea729 | source base |
| 121 | repair | src/components/ui/combobox/ComboboxSeparator.vue | — | c96f8bd8ced180153292490b752f28b18274ac2f | source base |
| 122 | repair | src/components/ui/combobox/ComboboxViewport.vue | — | 4a9eaf12375d5781bb56d153acb18d615aa45bf1 | source base |
| 123 | repair | src/components/ui/command/Command.vue | — | b7775873cfcb9353a8b5215eafc62f404511fe28 | source base |
| 124 | repair | src/components/ui/command/CommandEmpty.vue | — | 8a0cbcacaf541bb45bb55afb8120f7c68f4d9b54 | source base |
| 125 | repair | src/components/ui/command/CommandGroup.vue | — | d4c7de571c2a0f0b39c2729fc38dbc528ec8e43f | source base |
| 126 | repair | src/components/ui/command/CommandInput.vue | — | 3c53f96a47cbb12de61a8676bca3d542d3cb7002 | source base |
| 127 | repair | src/components/ui/command/CommandItem.vue | — | fd3ea61139ab28c2c33dfc6025d2a9273a8c03da | source base |
| 128 | repair | src/components/ui/command/CommandList.vue | — | 83024facc42051d0c44adbe836832ab9f6e4fde6 | source base |
| 129 | repair | src/components/ui/command/CommandSeparator.vue | — | b94086b22a785db5da1d290654387caca3ad52ce | source base |
| 130 | repair | src/components/ui/command/CommandShortcut.vue | — | 58f13f4c12b7f8768c5a351d0b4ff50a02157131 | source base |
| 131 | repair | src/components/ui/data-table/DataTable.vue | — | a50d41b0e257856821ab31d78785f13ccb10f3fa | source base |
| 132 | repair | src/components/ui/data-table/DataTablePagination.vue | — | 280c67ec5442526e45e0fe306dab4de63dbe31e6 | source base |
| 133 | repair | src/components/ui/dialog/DialogContent.vue | — | dd1cfe888e62bf1229d0c50c13e50fd1c129aaff | source base |
| 134 | repair | src/components/ui/dialog/DialogDescription.vue | — | c0d3aa71a8f2da35646de30f1a651485981162dc | source base |
| 135 | repair | src/components/ui/dialog/DialogFooter.vue | — | 5aaecdea320c2a68cbe2b47379ad8480c312882f | source base |
| 136 | repair | src/components/ui/dialog/DialogHeader.vue | — | 12916fa49e769a271e911016aba07f04d824b0c5 | source base |
| 137 | repair | src/components/ui/dialog/DialogScrollContent.vue | — | cc3695bd9435280158ea7a4522259d9b248556c8 | source base |
| 138 | repair | src/components/ui/dialog/DialogTitle.vue | — | 9bd602ab5381d9a92f141a66496355460e9475c5 | source base |
| 139 | repair | src/components/ui/drawer/DrawerContent.vue | — | a2f3da9b5489ab9ad8cfbfc303be93540a97d6a3 | source base |
| 140 | repair | src/components/ui/drawer/DrawerDescription.vue | — | 135cf1080bec706ce280b956a2f7bf22ce862fa2 | source base |
| 141 | repair | src/components/ui/drawer/DrawerFooter.vue | — | 1215ca8d13ec2683cc7c43969669b23e6acf17df | source base |
| 142 | repair | src/components/ui/drawer/DrawerHeader.vue | — | d9f0a148d828f490a8adec7d05e70743a996ed45 | source base |
| 143 | repair | src/components/ui/drawer/DrawerOverlay.vue | — | 5931af628f4a3fb77eb3b2c85fc0fd895dcab1a0 | source base |
| 144 | repair | src/components/ui/drawer/DrawerTitle.vue | — | 849ffff60b680fa26d914b574ad57d5d63645a87 | source base |
| 145 | repair | src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue | — | de3aeca77c20bf94f0189502b56793eb4b260072 | source base |
| 146 | repair | src/components/ui/dropdown-menu/DropdownMenuContent.vue | — | 0dd69ffb3c9d3156e04f85313a9829b622552bb8 | source base |
| 147 | repair | src/components/ui/dropdown-menu/DropdownMenuItem.vue | — | 5cdcfcaf09af8c3193105e5469d95ebd12b6cfe9 | source base |
| 148 | repair | src/components/ui/dropdown-menu/DropdownMenuLabel.vue | — | bc0a57b1212af9071cd9bb73c6726a4392239ec7 | source base |
| 149 | repair | src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue | — | 056253af932ec296df974d6d59e7b0303a7df2fe | source base |
| 150 | repair | src/components/ui/dropdown-menu/DropdownMenuSeparator.vue | — | 69a5ef10aeccf219f52620f940eb7bcc68eb1a6a | source base |
| 151 | repair | src/components/ui/dropdown-menu/DropdownMenuShortcut.vue | — | 9f9c427cf8b82bf217df71021d48326bacf7aab2 | source base |
| 152 | repair | src/components/ui/dropdown-menu/DropdownMenuSubContent.vue | — | 9e7de1ebc183a094b97da2a07f1bbdd5e4979cd3 | source base |
| 153 | repair | src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue | — | d29325026fd6318590b871d6dc609b307ec6118b | source base |
| 154 | repair | src/components/ui/input/Input.vue | — | 35e7aeb00d7fa99c730afcb1745bed422134838a | source base |
| 155 | repair | src/components/ui/label/Label.vue | — | 07d3ed67375e841387ba24cff46023efe3bbfdf9 | source base |
| 156 | repair | src/components/ui/number-field/NumberField.vue | — | 36783d46d37e8e07e9b4654b65836971d5531f8c | source base |
| 157 | repair | src/components/ui/number-field/NumberFieldContent.vue | — | 7beb7e9ec9abfbf6ed1fd0a9b129c44e8467b882 | source base |
| 158 | repair | src/components/ui/number-field/NumberFieldDecrement.vue | — | fab1bbba0f8892e752cf3666ea9debe16f3f0f2f | source base |
| 159 | repair | src/components/ui/number-field/NumberFieldIncrement.vue | — | e2a7322f6bddf756c7f11a8e3c6611c0823eb7d0 | source base |
| 160 | repair | src/components/ui/number-field/NumberFieldInput.vue | — | 785954a03f51cec8034eecf207cccdc5786666ff | source base |
| 161 | repair | src/components/ui/popover/PopoverContent.vue | — | 0a4d55ad53c6935eab100d0543394ca111ba1d2f | source base |
| 162 | repair | src/components/ui/progress/ProgressDefault.vue | — | 5f2235acf779516bb033408e08e5da129adb6687 | source base |
| 163 | repair | src/components/ui/progress/ProgressGradient.vue | — | 9914d2d8a042079cc3d9832821719562665abb81 | source base |
| 164 | repair | src/components/ui/progress/ProgressLiquid.vue | — | 7c6077a0381732690431811a44b1f2c7f2ff2018 | source base |
| 165 | repair | src/components/ui/progress/ProgressSectioned.vue | — | 4209642cb5c723639aa771ed2f26c73054c3b73b | source base |
| 166 | repair | src/components/ui/radio-group/RadioGroup.vue | — | f1786f1d76f6b3399f229c3c63a8bffaf06d767d | source base |
| 167 | repair | src/components/ui/radio-group/RadioGroupItem.vue | — | c66d878114fe2d854727f2bf8c1f66c73eef3db7 | source base |
| 168 | repair | src/components/ui/section/Section.vue | — | 8a1db9d2316eef73a36bbdf9ce52e07aa311324b | source base |
| 169 | repair | src/components/ui/select/SelectContent.vue | — | cd972083d9ccf283eefa29bf949973185fa661f0 | source base |
| 170 | repair | src/components/ui/select/SelectGroup.vue | — | 1537a3609ec2ca117eb53aa4b3e7616507ffa076 | source base |
| 171 | repair | src/components/ui/select/SelectItem.vue | — | b61d808f0acca97ecadaefc0b517e490137b4591 | source base |
| 172 | repair | src/components/ui/select/SelectLabel.vue | — | a29e4ca1e169b9c06c9b7066472050e74353565a | source base |
| 173 | repair | src/components/ui/select/SelectScrollDownButton.vue | — | f9d8b452a3f0a544f86bb5db4d10f1ef5104502c | source base |
| 174 | repair | src/components/ui/select/SelectScrollUpButton.vue | — | 130a93c31a39804e7ee044d3bd5028dee0fafc6d | source base |
| 175 | repair | src/components/ui/select/SelectSeparator.vue | — | de130151caf846cfb19bceb76de070f0cea721b0 | source base |
| 176 | repair | src/components/ui/select/SelectTrigger.vue | — | 99c5f4bbeb86b388a8fbc248a0628924f855aeea | source base |
| 177 | repair | src/components/ui/separator/Separator.vue | — | ebc1e4a322603edc609c27d66b8969fcca534d0d | source base |
| 178 | repair | src/components/ui/skeleton/Skeleton.vue | — | 6d0689cd7d8d998967223fb472c7a088d187e291 | source base |
| 179 | repair | src/components/ui/slider/Slider.vue | — | 1a5d1630355b78f78bf9ecf33fe45b28aeaaa50f | source base |
| 180 | repair | src/components/ui/surface/Surface.vue | — | 4859c7c08e07914464c2ac349fac8befb68b699c | source base |
| 181 | repair | src/components/ui/switch/Switch.vue | — | ff014cfc41df2195945fb97cfec3ec810ed4b580 | source base |
| 182 | repair | src/components/ui/table/Table.vue | — | 9b3d23f0b30373ff38176a7a07b44040655ad4fc | source base |
| 183 | repair | src/components/ui/table/TableBody.vue | — | 230a49fafa3941f64959d5b8a5d0d58d429e0193 | source base |
| 184 | repair | src/components/ui/table/TableCaption.vue | — | 7b03b0ac32a5b61d3998db46528d5c1a302c579d | source base |
| 185 | repair | src/components/ui/table/TableCell.vue | — | 24c465aae6219d3755f3f7bba49090929c40c87f | source base |
| 186 | repair | src/components/ui/table/TableEmpty.vue | — | 355f0649affce81fa82909eafc5bdd165fdd103f | source base |
| 187 | repair | src/components/ui/table/TableHead.vue | — | 6a3795cf3d9153bbda858e50ca1cb2dd7c0bf0f1 | source base |
| 188 | repair | src/components/ui/table/TableHeader.vue | — | 82e7cc2fa16b43b2143f46605a3ef0f879652a89 | source base |
| 189 | repair | src/components/ui/table/TableRow.vue | — | ac2d7b32d95771b81de2590c7b64e7ce445b755e | source base |
| 190 | repair | src/components/ui/tags-input/TagsInput.vue | — | 0c3e553bf9c0aabd83bffda1b6bb511f23e80162 | source base |
| 191 | repair | src/components/ui/tags-input/TagsInputInput.vue | — | 566d3923ee06853b30196af0189241a2c131735a | source base |
| 192 | repair | src/components/ui/tags-input/TagsInputItem.vue | — | 4469b14a4643d63668523634cd98ab275bba7b31 | source base |
| 193 | repair | src/components/ui/tags-input/TagsInputItemDelete.vue | — | ed7d5fd2d8947051fceabfbbdf412343161e76c0 | source base |
| 194 | repair | src/components/ui/tags-input/TagsInputItemText.vue | — | 8104cd24d9c30e9798ede18e59cee1321a21c2f8 | source base |
| 195 | repair | src/components/ui/textarea/Textarea.vue | — | e562281db65f8002b8e490f45cbb8db33b06fdf2 | source base |
| 196 | repair | src/components/ui/toast/Toast.vue | — | ce6204bbf5860a751182831de9d5a4e2efb3d58b | source base |
| 197 | repair | src/components/ui/toast/ToastAction.vue | — | 4190a09c89e51b3c3acff76861a154ad4b953540 | source base |
| 198 | repair | src/components/ui/toast/ToastClose.vue | — | 80c5e7ce9e73be288ee8d3cb1885cc2121b30021 | source base |
| 199 | repair | src/components/ui/toast/ToastDescription.vue | — | 0d5dcb97d81ee3612f08e64e4205f0524c4877ae | source base |
| 200 | repair | src/components/ui/toast/Toaster.vue | — | a799458d3770a18a6633fcad77f19c6f50d43c67 | source base |
| 201 | repair | src/components/ui/toast/ToastTitle.vue | — | 1db7eada348e3f92cf3466cb40623da49eb8bda2 | source base |
| 202 | repair | src/components/ui/toggle-group/ToggleGroup.vue | — | dcb7bbb3f19740dfed74fadd18c1e2186d79ce83 | source base |
| 203 | repair | src/components/ui/toggle-group/ToggleGroupItem.vue | — | 196a0df00330838f11c2a6a88518b56db4359826 | source base |
| 204 | repair | src/components/ui/toggle/Toggle.vue | — | c225306543fe4c6d32cb97b2b2cdb7620803d18f | source base |
| 205 | repair | src/components/ui/tooltip/TooltipContent.vue | — | 74478946f0c3ae8b1e13c1541774bfb4f501ce87 | source base |
| 206 | create | src/composables/glass/procedural/prng.ts | — | — | source base |
| 207 | modify | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 208 | delete | src/utils/cn.ts | — | e9e794f240d88f19dc052eeb88676cc5d4610057 | source base |
| 209 | delete | src/utils/coalesceMetric.ts | — | bda62b306069799a65931c3d0aa54c914f1f5ef5 | source base |
| 210 | delete | src/utils/index.ts | — | 8d472c6d351b78edae5f5df4b646e4c17b57a715 | source base |
| 211 | delete | src/utils/prng.ts | — | c0770b90d563ecad71b411a5b9f739cadd4ac3b1 | source base |
| 212 | repair | tests/components/custom/constellation/constellationField.test.ts | — | d3e1f907148154c52d2601bb51e4d9d0e6d5a9d3 | source base |
| 213 | repair | tests/components/custom/metric-badge/zero-value.test.ts | — | b066161d3eba0cda63abc700f3dc4e44c26e87f9 | source base |
| 214 | repair | tests/components/custom/search/search-contracts.test.ts | — | be4e63a197aa3c42e6bbaced0dd1cb6beeb3e0d3 | source base |
| 215 | repair | tests/composables.smoke.spec.ts | — | 6ae97daf3ef786b4be90ca5409ad01e50ac250fc | source base |
| 216 | repair | tests/composables/motion/text-highlight-home.test.ts | — | 42cd25b5513a90bfedfb88b740f9d8edcc80bac9 | source base |
| 217 | repair | tests/composables/motion/useBloomUp.test.ts | — | 15b813dc5821894a96270cbfe133ccd669ceb437 | source base |
| 218 | repair | tests/composables/motion/useCharStagger.test.ts | — | 3361f5f14509c28bf81558a6d74b95878353f073 | source base |
| 219 | repair | tests/composables/motion/usePointerVelocityField.test.ts | — | ec6a1636acd56b64202fc3d87bd88154489f214a | source base |
| 220 | repair | tests/composables/motion/useScrollTrigger.test.ts | — | 6d4b677242070a7942c5ffea9dd12d1e4fb1dd73 | source base |
| 221 | repair | tests/composables/motion/useTextHighlight.test.ts | — | 644b3fde942c00a45ff4caeee76f9e10085557f8 | source base |
| 222 | repair | tests/composables/sidebar/useLazyLoader.test.ts | — | 07478422003cb264f9a0cb54cb072e591a234fc0 | source base |
| 223 | repair | tests/composables/sidebar/useScrollTracker.test.ts | — | b806d4b49c08482b4ca76724f779717bbafc81e0 | source base |
| 224 | repair | tests/composables/useTokenColor.test.ts | — | 51edac5bb533f0e72273949547a1406a988b2473 | source base |
| 225 | repair | tests/structure/manifest.test.ts | — | — | BI.W-P005 |
| 226 | repair | tests/utils/cn.test.ts | — | 1e34ba591edb10fb3326db2150659be0ba5092b2 | source base |

## Repair manifest (220)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/code/Code.vue |
| imports | 2 | demo/chassis/code/CodeBlock.vue |
| imports | 3 | demo/chassis/hero/StoryHeader.vue |
| imports | 4 | demo/chassis/hero/StoryHero.vue |
| imports | 5 | demo/chassis/landing/SectionPreviewCard.vue |
| imports | 6 | demo/chassis/page/StoryPage.vue |
| imports | 7 | demo/chassis/section/StorySection.vue |
| imports | 8 | demo/chassis/showcase/ShowcaseFrame.vue |
| imports | 9 | demo/chassis/showcase/SpecimenFrame.vue |
| imports | 10 | demo/chassis/showcase/TokenLadder.vue |
| imports | 11 | demo/shell/SidebarDock.vue |
| imports | 12 | demo/stories/compositions/auth-shell.vue |
| imports | 13 | demo/stories/compositions/empty-states.vue |
| imports | 14 | demo/stories/compositions/settings.vue |
| imports | 15 | demo/stories/data/TimelineContinuousBody.vue |
| imports | 16 | demo/stories/data/TimelineSegmentedBody.vue |
| imports | 17 | demo/stories/data/avatar.vue |
| imports | 18 | demo/stories/data/data-table.vue |
| imports | 19 | demo/stories/data/infinite-scroll.vue |
| imports | 20 | demo/stories/data/sortable-list.vue |
| imports | 21 | demo/stories/data/table.vue |
| imports | 22 | demo/stories/data/tags-input.vue |
| imports | 23 | demo/stories/data/timeline.vue |
| imports | 24 | demo/stories/data/virtual-section.vue |
| imports | 25 | demo/stories/display/badge.vue |
| imports | 26 | demo/stories/display/buttons.vue |
| imports | 27 | demo/stories/dock/layers.vue |
| imports | 28 | demo/stories/forms/slider.vue |
| imports | 29 | demo/stories/foundations/colors.vue |
| imports | 30 | demo/stories/foundations/motion.vue |
| imports | 31 | demo/stories/foundations/paper-glass.vue |
| imports | 32 | demo/stories/foundations/radii.vue |
| imports | 33 | demo/stories/foundations/shadows.vue |
| imports | 34 | demo/stories/foundations/typography.vue |
| imports | 35 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 36 | demo/stories/motion/curve-gallery.vue |
| imports | 37 | demo/stories/motion/springs.vue |
| imports | 38 | demo/stories/motion/typewriter.vue |
| imports | 39 | demo/stories/navigation/carousel.vue |
| imports | 40 | demo/stories/substrates/VizStudio.vue |
| imports | 41 | demo/stories/substrates/aurora/PresetPickerRow.vue |
| imports | 42 | demo/stories/substrates/fourier-field.vue |
| imports | 43 | src/components/custom/animated-digit/AnimatedDigit.vue |
| imports | 44 | src/components/custom/blob/composables/useBlobSatellites.ts |
| imports | 45 | src/components/custom/border-progress/BorderProgress.vue |
| imports | 46 | src/components/custom/chip/Chip.vue |
| imports | 47 | src/components/custom/color-swatch/ColorSwatch.vue |
| imports | 48 | src/components/custom/completion-seal/CompletionSeal.vue |
| imports | 49 | src/components/custom/configurator/Configurator.vue |
| imports | 50 | src/components/custom/configurator/ConfiguratorLayer.vue |
| imports | 51 | src/components/custom/configurator/ConfiguratorRow.vue |
| imports | 52 | src/components/custom/constellation/Constellation.vue |
| imports | 53 | src/components/custom/constellation/composables/useConstellation.ts |
| imports | 54 | src/components/custom/controls/DarkModeToggle.vue |
| imports | 55 | src/components/custom/dock/DockControl.vue |
| imports | 56 | src/components/custom/dock/DockTrigger.vue |
| imports | 57 | src/components/custom/expandable-container/ExpandableContainer.vue |
| imports | 58 | src/components/custom/fourier-field/FourierField.vue |
| imports | 59 | src/components/custom/handmark/README.md |
| imports | 60 | src/components/custom/handmark/geometry.ts |
| imports | 61 | src/components/custom/handmark/ink.ts |
| imports | 62 | src/components/custom/handmark/noise.ts |
| imports | 63 | src/components/custom/icon-chip/IconChip.vue |
| imports | 64 | src/components/custom/instrument-chassis/ChassisDivider.vue |
| imports | 65 | src/components/custom/instrument-chassis/InstrumentChassis.vue |
| imports | 66 | src/components/custom/labeled-field/LabeledField.vue |
| imports | 67 | src/components/custom/metric-badge/MetricBadge.vue |
| imports | 68 | src/components/custom/metric-cell/MetricCell.vue |
| imports | 69 | src/components/custom/metric-stack/MetricRow.vue |
| imports | 70 | src/components/custom/metric-stack/MetricStack.vue |
| imports | 71 | src/components/custom/pager-dots/PagerDots.vue |
| imports | 72 | src/components/custom/paper-backdrop/PaperBackdrop.vue |
| imports | 73 | src/components/custom/pulse/Pulse.vue |
| imports | 74 | src/components/custom/search/FuzzySearch.vue |
| imports | 75 | src/components/custom/search/SearchBar.vue |
| imports | 76 | src/components/custom/split-chars/SplitChars.vue |
| imports | 77 | src/components/custom/status-dot/StatusDot.vue |
| imports | 78 | src/components/custom/tabs/SegmentedTabs.vue |
| imports | 79 | src/components/custom/typewriter/composables/useTypewriter.ts |
| imports | 80 | src/components/custom/typewriter/index.ts |
| imports | 81 | src/components/custom/typewriter/types.ts |
| imports | 82 | src/components/custom/watercolor-dot/WatercolorDot.vue |
| imports | 83 | src/components/custom/watercolor-dot/prng.ts |
| imports | 84 | src/components/ui/_shared/ModalOverlay.vue |
| imports | 85 | src/components/ui/accordion/AccordionContent.vue |
| imports | 86 | src/components/ui/accordion/AccordionItem.vue |
| imports | 87 | src/components/ui/accordion/AccordionTrigger.vue |
| imports | 88 | src/components/ui/alert/Alert.vue |
| imports | 89 | src/components/ui/alert/AlertDescription.vue |
| imports | 90 | src/components/ui/alert/AlertTitle.vue |
| imports | 91 | src/components/ui/avatar/Avatar.vue |
| imports | 92 | src/components/ui/badge/Badge.vue |
| imports | 93 | src/components/ui/button/Button.vue |
| imports | 94 | src/components/ui/card/Card.vue |
| imports | 95 | src/components/ui/card/CardAction.vue |
| imports | 96 | src/components/ui/card/CardContent.vue |
| imports | 97 | src/components/ui/card/CardDescription.vue |
| imports | 98 | src/components/ui/card/CardFooter.vue |
| imports | 99 | src/components/ui/card/CardHeader.vue |
| imports | 100 | src/components/ui/card/CardTitle.vue |
| imports | 101 | src/components/ui/card/ScrollCardHeader.vue |
| imports | 102 | src/components/ui/carousel/Carousel.vue |
| imports | 103 | src/components/ui/carousel/CarouselContent.vue |
| imports | 104 | src/components/ui/carousel/CarouselItem.vue |
| imports | 105 | src/components/ui/carousel/CarouselNext.vue |
| imports | 106 | src/components/ui/carousel/CarouselPager.vue |
| imports | 107 | src/components/ui/carousel/CarouselPrevious.vue |
| imports | 108 | src/components/ui/carousel/GlassCarouselPager.vue |
| imports | 109 | src/components/ui/checkbox/Checkbox.vue |
| imports | 110 | src/components/ui/collapsible/CollapsibleTrigger.vue |
| imports | 111 | src/components/ui/combobox/ComboboxAnchor.vue |
| imports | 112 | src/components/ui/combobox/ComboboxEmpty.vue |
| imports | 113 | src/components/ui/combobox/ComboboxGroup.vue |
| imports | 114 | src/components/ui/combobox/ComboboxInput.vue |
| imports | 115 | src/components/ui/combobox/ComboboxItem.vue |
| imports | 116 | src/components/ui/combobox/ComboboxItemIndicator.vue |
| imports | 117 | src/components/ui/combobox/ComboboxList.vue |
| imports | 118 | src/components/ui/combobox/ComboboxSeparator.vue |
| imports | 119 | src/components/ui/combobox/ComboboxViewport.vue |
| imports | 120 | src/components/ui/command/Command.vue |
| imports | 121 | src/components/ui/command/CommandEmpty.vue |
| imports | 122 | src/components/ui/command/CommandGroup.vue |
| imports | 123 | src/components/ui/command/CommandInput.vue |
| imports | 124 | src/components/ui/command/CommandItem.vue |
| imports | 125 | src/components/ui/command/CommandList.vue |
| imports | 126 | src/components/ui/command/CommandSeparator.vue |
| imports | 127 | src/components/ui/command/CommandShortcut.vue |
| imports | 128 | src/components/ui/data-table/DataTable.vue |
| imports | 129 | src/components/ui/data-table/DataTablePagination.vue |
| imports | 130 | src/components/ui/dialog/DialogContent.vue |
| imports | 131 | src/components/ui/dialog/DialogDescription.vue |
| imports | 132 | src/components/ui/dialog/DialogFooter.vue |
| imports | 133 | src/components/ui/dialog/DialogHeader.vue |
| imports | 134 | src/components/ui/dialog/DialogScrollContent.vue |
| imports | 135 | src/components/ui/dialog/DialogTitle.vue |
| imports | 136 | src/components/ui/drawer/DrawerContent.vue |
| imports | 137 | src/components/ui/drawer/DrawerDescription.vue |
| imports | 138 | src/components/ui/drawer/DrawerFooter.vue |
| imports | 139 | src/components/ui/drawer/DrawerHeader.vue |
| imports | 140 | src/components/ui/drawer/DrawerOverlay.vue |
| imports | 141 | src/components/ui/drawer/DrawerTitle.vue |
| imports | 142 | src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue |
| imports | 143 | src/components/ui/dropdown-menu/DropdownMenuContent.vue |
| imports | 144 | src/components/ui/dropdown-menu/DropdownMenuItem.vue |
| imports | 145 | src/components/ui/dropdown-menu/DropdownMenuLabel.vue |
| imports | 146 | src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue |
| imports | 147 | src/components/ui/dropdown-menu/DropdownMenuSeparator.vue |
| imports | 148 | src/components/ui/dropdown-menu/DropdownMenuShortcut.vue |
| imports | 149 | src/components/ui/dropdown-menu/DropdownMenuSubContent.vue |
| imports | 150 | src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue |
| imports | 151 | src/components/ui/input/Input.vue |
| imports | 152 | src/components/ui/label/Label.vue |
| imports | 153 | src/components/ui/number-field/NumberField.vue |
| imports | 154 | src/components/ui/number-field/NumberFieldContent.vue |
| imports | 155 | src/components/ui/number-field/NumberFieldDecrement.vue |
| imports | 156 | src/components/ui/number-field/NumberFieldIncrement.vue |
| imports | 157 | src/components/ui/number-field/NumberFieldInput.vue |
| imports | 158 | src/components/ui/popover/PopoverContent.vue |
| imports | 159 | src/components/ui/progress/ProgressDefault.vue |
| imports | 160 | src/components/ui/progress/ProgressGradient.vue |
| imports | 161 | src/components/ui/progress/ProgressLiquid.vue |
| imports | 162 | src/components/ui/progress/ProgressSectioned.vue |
| imports | 163 | src/components/ui/radio-group/RadioGroup.vue |
| imports | 164 | src/components/ui/radio-group/RadioGroupItem.vue |
| imports | 165 | src/components/ui/section/Section.vue |
| imports | 166 | src/components/ui/select/SelectContent.vue |
| imports | 167 | src/components/ui/select/SelectGroup.vue |
| imports | 168 | src/components/ui/select/SelectItem.vue |
| imports | 169 | src/components/ui/select/SelectLabel.vue |
| imports | 170 | src/components/ui/select/SelectScrollDownButton.vue |
| imports | 171 | src/components/ui/select/SelectScrollUpButton.vue |
| imports | 172 | src/components/ui/select/SelectSeparator.vue |
| imports | 173 | src/components/ui/select/SelectTrigger.vue |
| imports | 174 | src/components/ui/separator/Separator.vue |
| imports | 175 | src/components/ui/skeleton/Skeleton.vue |
| imports | 176 | src/components/ui/slider/Slider.vue |
| imports | 177 | src/components/ui/surface/Surface.vue |
| imports | 178 | src/components/ui/switch/Switch.vue |
| imports | 179 | src/components/ui/table/Table.vue |
| imports | 180 | src/components/ui/table/TableBody.vue |
| imports | 181 | src/components/ui/table/TableCaption.vue |
| imports | 182 | src/components/ui/table/TableCell.vue |
| imports | 183 | src/components/ui/table/TableEmpty.vue |
| imports | 184 | src/components/ui/table/TableHead.vue |
| imports | 185 | src/components/ui/table/TableHeader.vue |
| imports | 186 | src/components/ui/table/TableRow.vue |
| imports | 187 | src/components/ui/tags-input/TagsInput.vue |
| imports | 188 | src/components/ui/tags-input/TagsInputInput.vue |
| imports | 189 | src/components/ui/tags-input/TagsInputItem.vue |
| imports | 190 | src/components/ui/tags-input/TagsInputItemDelete.vue |
| imports | 191 | src/components/ui/tags-input/TagsInputItemText.vue |
| imports | 192 | src/components/ui/textarea/Textarea.vue |
| imports | 193 | src/components/ui/toast/Toast.vue |
| imports | 194 | src/components/ui/toast/ToastAction.vue |
| imports | 195 | src/components/ui/toast/ToastClose.vue |
| imports | 196 | src/components/ui/toast/ToastDescription.vue |
| imports | 197 | src/components/ui/toast/ToastTitle.vue |
| imports | 198 | src/components/ui/toast/Toaster.vue |
| imports | 199 | src/components/ui/toggle-group/ToggleGroup.vue |
| imports | 200 | src/components/ui/toggle-group/ToggleGroupItem.vue |
| imports | 201 | src/components/ui/toggle/Toggle.vue |
| imports | 202 | src/components/ui/tooltip/TooltipContent.vue |
| imports | 203 | src/index.ts |
| imports | 204 | tests/components/custom/constellation/constellationField.test.ts |
| imports | 205 | tests/components/custom/metric-badge/zero-value.test.ts |
| imports | 206 | tests/components/custom/search/search-contracts.test.ts |
| imports | 207 | tests/composables.smoke.spec.ts |
| imports | 208 | tests/composables/motion/text-highlight-home.test.ts |
| imports | 209 | tests/composables/motion/useBloomUp.test.ts |
| imports | 210 | tests/composables/motion/useCharStagger.test.ts |
| imports | 211 | tests/composables/motion/usePointerVelocityField.test.ts |
| imports | 212 | tests/composables/motion/useScrollTrigger.test.ts |
| imports | 213 | tests/composables/motion/useTextHighlight.test.ts |
| imports | 214 | tests/composables/sidebar/useLazyLoader.test.ts |
| imports | 215 | tests/composables/sidebar/useScrollTracker.test.ts |
| imports | 216 | tests/composables/useTokenColor.test.ts |
| imports | 217 | tests/utils/cn.test.ts |
| tests | 1 | tests/structure/manifest.test.ts |
| build | 1 | src/index.ts |
| docs | 1 | docs/STRUCTURE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P006/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** No generic utils root or pass-through barrel exists; every surviving helper has one semantic owner and live consumer.

**Required mutation bite:** Restore src/utils/index.ts re-exporting one moved helper and require both topology and import-boundary families to fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P006`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.import-boundaries | device-free | Imports flow through declared public family or private owner boundaries without nested source entrypoints, cycles, or alias-dependent package behavior. | Import a sibling family's internal file.; Create an SCC between motion and glass. |

## π obligation

Device-free: Pure helper relocation is paint-neutral; behavior is covered by owner tests.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P005 | Structural scope is derived from syntax and ownership, so a new/moved file joins the manifest or makes validation red without changing a baseline number. |

Declared semantic locks: `root-barrel`, `structure-authority`. The cursor also acquires 226 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
