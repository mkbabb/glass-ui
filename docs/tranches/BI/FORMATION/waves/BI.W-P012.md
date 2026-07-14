# BI.W-P012 — MS8 — demo terminal and private-chassis re-home

**Status:** PLANNED
**Topological stratum:** BI.S05
**Formation family:** structure
**Core centers:** C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P012`

## Intent

Make demo shell/chassis/stories the terminal home for demo-only composition and remove phantom route helpers.

## Exact scope

- Move demo configurator implementation under shell ownership and re-home route-specific helpers to their owning story/chassis.
- Provide terminal demo homes consumed by the separately owned SpaView and CompletionSeal disposition waves; HeaderRibbon remains public because keyframes.js is an actual tracked consumer.
- Preserve one route manifest and prove disk/render bijection; no glob special-case may hide a phantom route.
- Repoint every demo scenario and capture registration to semantic IDs rather than file paths.

## File manifest (208)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/App.vue | — | e1b22a59dd425c2a6b1cfa23d34c539062045fc4 | source base |
| 2 | repair | demo/capture/capture.css | — | 72ec7a39ba444a7c373e7762d7f87f449db9658b | source base |
| 3 | repair | demo/capture/engine-badge.ts | — | 167b4893d47b49011924f1d5f497c2d752a447c0 | source base |
| 4 | modify | demo/chassis/body/story-body.ts | — | 0f884b7904f66e80a0b6233ed41c5aa226119fd4 | source base |
| 5 | modify | demo/chassis/body/StoryBodyRenderer.vue | — | 1b5b922f042e7e6c37302be8614c05145d148368 | source base |
| 6 | modify | demo/chassis/code/Code.vue | — | bc7bf54d7bdc59ceac49aa0857c464d4c6c2de9f | source base |
| 7 | modify | demo/chassis/code/CodeBlock.vue | — | cb7518f7dac78b6d7f446c3ce940332427ac220f | source base |
| 8 | modify | demo/chassis/code/hljs-house-theme.css | — | 05baff4653f22c24b0fbc66117227ee8b5de4a61 | source base |
| 9 | modify | demo/chassis/code/useCodeHighlight.ts | — | 752e90eb93f2b13b3dd166e2af5c231a753703e7 | source base |
| 10 | modify | demo/chassis/family/FamilyTabs.vue | — | 2c4640256fc8edaa3de8d9f589cc49829372a324 | source base |
| 11 | modify | demo/chassis/family/story-nested.ts | — | d6599494bd2ef23d6ce7c0ac8109fd682cbd9c1b | source base |
| 12 | modify | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 13 | modify | demo/chassis/hero/category-hero.ts | — | a6c576bb063cdd67aea4ea13decc13d8f8b4b5e0 | source base |
| 14 | modify | demo/chassis/hero/focal.ts | — | 9ad415a77a918ad566bc39d36b921b0a9aa59cae | source base |
| 15 | modify | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 16 | modify | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 17 | modify | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 18 | modify | demo/chassis/hero/warm-field.ts | — | 69479e6b06d5a0dc0577ddca31dd8d467d9fe517 | source base |
| 19 | modify | demo/chassis/index.ts | — | 42987c17afc66e4d3e25ecd37e3ce6dcf0937e32 | source base |
| 20 | modify | demo/chassis/landing/SectionLanding.vue | — | aa70cb4d1b1e105017218f47ff1f4eab75f7439a | source base |
| 21 | modify | demo/chassis/landing/SectionPreviewCard.vue | — | 7809e9f4ceff868495b4b8706e5a412ea1808dcd | source base |
| 22 | modify | demo/chassis/landing/storyTile.ts | — | b0331b869d51533ee7e0bbbacf6ff0c1a8dd6e74 | source base |
| 23 | modify | demo/chassis/landing/vizPreviewStill.ts | — | 0b8f78dca4c032effd6059d416f9b758045bed79 | source base |
| 24 | modify | demo/chassis/page/StoryPage.vue | — | 0fe1e8036e707a34599b151634d5672a12ff4428 | source base |
| 25 | modify | demo/chassis/PermutationGrid.vue | — | 60cb9b610e5542b71a6c185575609e2f106c54a3 | source base |
| 26 | modify | demo/chassis/play/StoryPlayButton.vue | — | 5b52d114fba6b496b6f781cbd220c7aebb6dd7ab | source base |
| 27 | modify | demo/chassis/section/StorySection.vue | — | 88820a176ed137574e7b228435a5c26510c86653 | source base |
| 28 | modify | demo/chassis/section/useSectionReveal.ts | — | e86e5240dbce917231278703558733326ffc8259 | source base |
| 29 | modify | demo/chassis/showcase/ShowcaseFrame.vue | — | f3ca53e001a4ccebf55c203b2c204d6eafc42a58 | source base |
| 30 | modify | demo/chassis/showcase/SpecimenFrame.vue | — | b21dc3b68ea45cb5daf015809f0f4398f34e4809 | source base |
| 31 | modify | demo/chassis/showcase/TokenLadder.vue | — | c39159dd33f71a950efae5260422bbda0d1d6b9c | source base |
| 32 | modify | demo/chassis/useStoryNavigation.ts | — | 66cd02992b1e1e7f490efa60ffd9232a638e723b | source base |
| 33 | rename | demo/configurator/index.ts | demo/shell/configurator/index.ts | 1d56ea76808acbfa9a4ed8151156b4be902f4fc7 | source base |
| 34 | rename | demo/configurator/preset-editor/css-writers.ts | demo/shell/configurator/preset-editor/css-writers.ts | db170ca45dda00950c42b53c86b439f63ce8bf60 | source base |
| 35 | rename | demo/configurator/preset-editor/defaults.ts | demo/shell/configurator/preset-editor/defaults.ts | 31311a7574621ad58d080b45cb4ea7e5efdb5a66 | source base |
| 36 | rename | demo/configurator/preset-editor/persistence.ts | demo/shell/configurator/preset-editor/persistence.ts | 4277a40af129bffc4d9eb2ee2fd3cbc05c08e7ae | source base |
| 37 | rename | demo/configurator/preset-editor/store.ts | demo/shell/configurator/preset-editor/store.ts | 13f1c61e8b5e3e93ab5c03ff081ea651ce42d24f | source base |
| 38 | rename | demo/configurator/preset-editor/stylesheet-swap.ts | demo/shell/configurator/preset-editor/stylesheet-swap.ts | 8a056e89fe3209c10f4d717798bc03c1f83fbbf2 | source base |
| 39 | rename | demo/configurator/preset-editor/types.ts | demo/shell/configurator/preset-editor/types.ts | 1a554909bb0d15212a945788e584c2e19de8beac | source base |
| 40 | rename | demo/configurator/PresetEditor.vue | demo/shell/configurator/PresetEditor.vue | f3a5e6a034885c9d832ecdcfcae94efd0030e107 | source base |
| 41 | rename | demo/configurator/presets/manifest.ts | demo/shell/configurator/presets/manifest.ts | 981a2685997f3976d507293a709bf6c517c831ef | source base |
| 42 | rename | demo/configurator/presets/neutral.css | demo/shell/configurator/presets/neutral.css | 9d123feca1ed9b51f746fb8078c87bbda4ce9b11 | source base |
| 43 | rename | demo/configurator/useConfiguratorOpen.ts | demo/shell/configurator/useConfiguratorOpen.ts | cc662957025a0aa3cb7fc3e6be878798f3730a70 | source base |
| 44 | rename | demo/configurator/usePresetEditor.ts | demo/shell/configurator/usePresetEditor.ts | 8f86bf48a665d0705be6f4cd1aa41eac9f1ae75c | source base |
| 45 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 46 | repair | demo/main.ts | — | 52322d0a200903207f071f4e218987f1f32f456d | source base |
| 47 | modify | demo/router.ts | — | 7f88ba5492b7d6a17bc890f3898edd7d8749dfc2 | source base |
| 48 | modify | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 49 | modify | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 50 | modify | demo/shell/dock-layer-contexts.ts | — | a89627e10ced4c94b5ba249f439316e81dd0e00a | source base |
| 51 | modify | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 52 | modify | demo/shell/NotFound.vue | — | 46ce8b6fe07e7bbc8fc8430ab29809ce7d9042a1 | source base |
| 53 | modify | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 54 | modify | demo/shell/useContextualDockLayers.ts | — | 3593d181db2a3d7141a29d2667a2d83d75da7c27 | source base |
| 55 | modify | demo/shell/useShellNavDock.ts | — | ebc895e0b3bc51abcac8306b45705b33e98c122a | source base |
| 56 | modify | demo/shell/useShellScrollProgress.ts | — | 6a91376e18030fac65507ee8b15bfa23f37950b9 | source base |
| 57 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 58 | repair | demo/stories/compositions/chassis.vue | — | 1e40177de1d581b4731c53f16600982e1592a005 | source base |
| 59 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 60 | repair | demo/stories/compositions/form-validation.vue | — | 002cb58ae3e2c27bcccd4fa22703f7447a6cbf0a | source base |
| 61 | repair | demo/stories/compositions/gate-pattern.vue | — | 3b7062ae79091429f1685e72afd1f1a22edcd945 | source base |
| 62 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 63 | repair | demo/stories/containers/accordion.vue | — | a012fa904418def9518038bdd837c04e23cc155c | source base |
| 64 | repair | demo/stories/containers/card-pressable.vue | — | 7486ccdd103aa62b9cb41326445bb4b48bb4d1dc | source base |
| 65 | repair | demo/stories/containers/collapsible.vue | — | 82f8a2682bdc0128a826ef1e57ebe3f12f2df3a9 | source base |
| 66 | repair | demo/stories/containers/command.vue | — | 7067af923a628500716d7fb0c54a4d4965f520d1 | source base |
| 67 | repair | demo/stories/containers/configurator.vue | — | 887b9cbd50fada0688b1f5f021e461c980d4390f | source base |
| 68 | repair | demo/stories/containers/context-menu.vue | — | f7d6fb6f9734f01270dd5fc48a45b65977a4fb9f | source base |
| 69 | repair | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 70 | repair | demo/stories/containers/drawer.vue | — | b0b1fbdb6d48732d70330550ac61277f7592ca72 | source base |
| 71 | repair | demo/stories/containers/dropdown-menu.vue | — | 9057dacd0e81425206b638869ad6369e03e929d1 | source base |
| 72 | repair | demo/stories/containers/expandable-container.vue | — | c9af261acd7645d6554af40df87d84c834c5b517 | source base |
| 73 | repair | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 74 | repair | demo/stories/containers/hover-popover.vue | — | 8364ae7c7fa3aaf07de168d90e7a0e597f6d9864 | source base |
| 75 | repair | demo/stories/containers/icon-tooltip.vue | — | 2f0819ed127121ef20384e894b108382cbea9071 | source base |
| 76 | repair | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 77 | repair | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 78 | repair | demo/stories/containers/spa-view.vue | — | 5bbafefd0eeb58d0cbfed909aec32eaa981a648d | source base |
| 79 | repair | demo/stories/containers/tooltip.vue | — | 0b436063aac06de803e4bfb779094bb579f8ce1e | source base |
| 80 | repair | demo/stories/data/avatar.vue | — | 2cc58a59a3153e9f6fa88c311f6bbabd96cd2c06 | source base |
| 81 | repair | demo/stories/data/data-table.vue | — | b47491c40e8d819de70a227b54c02df4f732f3f0 | source base |
| 82 | repair | demo/stories/data/infinite-scroll.vue | — | faea27c9c706cc99221d59aa6e94219b6eaee43b | source base |
| 83 | repair | demo/stories/data/instrument-chassis.vue | — | 5439f87b703c75b49e6009a7a188de721529fd18 | source base |
| 84 | repair | demo/stories/data/metric-cell.vue | — | ba851ae5f53abdb3aaf555eb5722ef19f374576e | source base |
| 85 | repair | demo/stories/data/metric-stack.vue | — | 373c38180f5cdc3071b23962b40f501614c84458 | source base |
| 86 | repair | demo/stories/data/metrics.vue | — | ac6aef681c76679bb8c4865659182fffe0aec0f8 | source base |
| 87 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 88 | repair | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 89 | repair | demo/stories/data/table.vue | — | 58c29de2277622d630fc2074b40a7401a2c48688 | source base |
| 90 | repair | demo/stories/data/tags-input.vue | — | 82920c7ce0a17d515f6815d03da15cddff321587 | source base |
| 91 | repair | demo/stories/data/timeline.vue | — | cbea77cde25c94bbf1e42dbbb67530935c09fe93 | source base |
| 92 | repair | demo/stories/data/TimelineContinuousBody.vue | — | ff412634257566da40a4891789203c7e7c36c904 | source base |
| 93 | repair | demo/stories/data/TimelineSegmentedBody.vue | — | 9546a0e569cdd42f7e964e8a19a8c1408c27c4de | source base |
| 94 | repair | demo/stories/data/virtual-section.vue | — | 4fe0827b08bc8d2098782789a40a979b65131d8b | source base |
| 95 | repair | demo/stories/display/atoms.vue | — | 86c4bec56ef905b07f53a92347e9a7419b65ab29 | source base |
| 96 | repair | demo/stories/display/badge.vue | — | 2cc390d89ae7e0025b00b6d7dac973ba36d09a85 | source base |
| 97 | repair | demo/stories/display/buttons.tile.vue | — | 6cf26e0f64ca06468274d699400e10d395d0362c | source base |
| 98 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 99 | repair | demo/stories/display/card.tile.vue | — | 71c976ca2df650772d5f3e43a757a6b96394e192 | source base |
| 100 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 101 | repair | demo/stories/display/dark-mode-toggle.vue | — | f5ea043e2dc9557a41c661d91898cd8cf27d23a7 | source base |
| 102 | repair | demo/stories/display/metric-badge.vue | — | 0ce729be9d5638820a513e649ae011004a647229 | source base |
| 103 | repair | demo/stories/display/pulse.vue | — | 5e76ed2b48174dc07bc873c73b15b7041ec01abe | source base |
| 104 | repair | demo/stories/display/section.vue | — | 01838e08d6c9a87f2aa857ef8ca3e7e9a429d39e | source base |
| 105 | repair | demo/stories/display/separator.vue | — | baa51f9a5bc48a5209eccb267d87f0661f936ce0 | source base |
| 106 | repair | demo/stories/display/stacked-icons.vue | — | 09b5480b44c54961ed0c95bf5e95eab993cde156 | source base |
| 107 | repair | demo/stories/display/status-dot.vue | — | b77693f1ca47379b82834971061e67356c1503cb | source base |
| 108 | repair | demo/stories/dock/controls.vue | — | 095063fe157f5fdfa8408e58f5e36556479d56b8 | source base |
| 109 | repair | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 110 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 111 | repair | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 112 | repair | demo/stories/dock/layers.vue | — | 11004b992842ec990758800b9ebbb1d1f2184067 | source base |
| 113 | repair | demo/stories/dock/overflow.vue | — | 90a35aabc6b8a25cdcef4f948b7d6bd2fd332223 | source base |
| 114 | repair | demo/stories/dock/overview.tile.vue | — | d1b9b592db308638a76a613635e566756936a930 | source base |
| 115 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 116 | repair | demo/stories/dock/rail.vue | — | f843e4e6adc30faad601cf75ece55aa37dd92272 | source base |
| 117 | repair | demo/stories/dock/sections.vue | — | 4834ba79ba910ee7a9938e210fdd94fa54e97e7d | source base |
| 118 | repair | demo/stories/feedback/alert.vue | — | d628cf79272b92e3c9e1a2e508ff0ae65c34edaf | source base |
| 119 | repair | demo/stories/feedback/completion-seal.vue | — | ad68e93be233b9d829906d6d45966249f802d230 | source base |
| 120 | repair | demo/stories/feedback/confirm-dialog.vue | — | dd4cd511fcc738f1d30c2b76e352f364425a17e2 | source base |
| 121 | repair | demo/stories/feedback/notification.vue | — | c045a0972e14e35eb96a91fb85de3c82a9075d17 | source base |
| 122 | repair | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 123 | repair | demo/stories/feedback/skeleton.vue | — | fb8ba6c20de783088b1c6bbee7af01c4ff732679 | source base |
| 124 | repair | demo/stories/feedback/toast.vue | — | 417f1d0a506f018bec760b95647ee2252498bf4b | source base |
| 125 | repair | demo/stories/feedback/toaster.vue | — | 5e22100e62b79c1695df757f8ca90d470986e6cb | source base |
| 126 | repair | demo/stories/forms/checks.vue | — | 04ec086e401a31129dc06379ef0b9db93f3e0d2b | source base |
| 127 | repair | demo/stories/forms/combobox.vue | — | 857ff5e276a3da069b9ae7f1166f5c7d7062d057 | source base |
| 128 | repair | demo/stories/forms/inputs.tile.vue | — | b18ac13b8dd7009df86814ae257616dfd6f37216 | source base |
| 129 | repair | demo/stories/forms/inputs.vue | — | 710a5484ef5c868f89a7ae6d141ef4ae6ad356e2 | source base |
| 130 | repair | demo/stories/forms/label.vue | — | ff08672dda7fc3631d36c3cf15b67b715c96e671 | source base |
| 131 | repair | demo/stories/forms/labeled-field.vue | — | e1e428d93503b932882d8daca37d0fb2592571f3 | source base |
| 132 | repair | demo/stories/forms/number-field.vue | — | 02a660baf3648e235ddd421edcd712775e3a48a6 | source base |
| 133 | repair | demo/stories/forms/select.vue | — | 831a46d8d8aed8a4c74eabd9d71c936b4ed72492 | source base |
| 134 | repair | demo/stories/forms/selectable-chip.vue | — | 38a31fcb4dd3a1d5438746f386d50dc8925ff91a | source base |
| 135 | repair | demo/stories/forms/slider.vue | — | 7ba393813177863acc6ac6a34292570759e6f5ec | source base |
| 136 | repair | demo/stories/forms/textarea.vue | — | 16be74fb5191866c650e157e8c4225b10bf28653 | source base |
| 137 | repair | demo/stories/forms/toggle-chip.vue | — | 53a4e6ae8ad38c21582673faa712354eeaf50fcb | source base |
| 138 | repair | demo/stories/forms/toggle.vue | — | 722406a90459974c446cd5c2ba961f6fa18ae67c | source base |
| 139 | repair | demo/stories/foundations/chart-chassis-palette.vue | — | efc049f29ea84e68a9e615ca4b68c0633ac4d94c | source base |
| 140 | repair | demo/stories/foundations/colors.vue | — | e135a8684cba765b758f96bbf2ae5a4d72f5831b | source base |
| 141 | repair | demo/stories/foundations/css-utilities.vue | — | 8356a9f2abf2b39c93acd8b5c02400723337d41e | source base |
| 142 | repair | demo/stories/foundations/icons.vue | — | a0dfdf9a4e4f6943b3a675645ed144733a2156aa | source base |
| 143 | repair | demo/stories/foundations/intro.vue | — | 4f4356e8b8fa4617908d22300b7ee0291822f25b | source base |
| 144 | repair | demo/stories/foundations/motion.vue | — | 137d730ba1e4f20e9d3a186e5d8462e3192db3d8 | source base |
| 145 | repair | demo/stories/foundations/overlays-scrims.vue | — | b4ba9269ca9b4a7316b9eae8f10603e9ca508293 | source base |
| 146 | repair | demo/stories/foundations/paper-glass.vue | — | 2301793abe89df723239e3600d526c54a5d06da6 | source base |
| 147 | repair | demo/stories/foundations/paper-texture.vue | — | 9295a43a73256d75d35fd0c1781ee2bcb3a39f1e | source base |
| 148 | repair | demo/stories/foundations/radii.vue | — | 9ac8e4263414017f8e04d818c374d2d8fd7f9687 | source base |
| 149 | repair | demo/stories/foundations/shadows.vue | — | 9603298a8cfaee80168b9956297b952139d7f615 | source base |
| 150 | repair | demo/stories/foundations/surface-taxonomy.vue | — | 884041cef453dd00977463b403a3c1ed9f1dee59 | source base |
| 151 | repair | demo/stories/foundations/surface-tints.vue | — | bbb5f37280d6b8118c48f335bc2044afd17bc667 | source base |
| 152 | repair | demo/stories/foundations/typography.vue | — | f4aa9d7df182b7ed4fff85c82a8420ca92bae353 | source base |
| 153 | modify | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 154 | repair | demo/stories/manifest/lazy.ts | — | 29871b7cdfa23fdc3a6cfe7f021e0f647ab2eac6 | source base |
| 155 | repair | demo/stories/motion/animated-digit.vue | — | 037ce8e85cfc0777dc4f8c60a991c5e3fb889e34 | source base |
| 156 | repair | demo/stories/motion/countup.vue | — | 9e211d7ed538441aa2b4c69c757c0faf2fd8159c | source base |
| 157 | repair | demo/stories/motion/curve-families.ts | — | 5e4788036e5440186aa8de36d6296992d3e2729b | source base |
| 158 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 159 | repair | demo/stories/motion/deck.vue | — | fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0 | source base |
| 160 | repair | demo/stories/motion/handmark.vue | — | b7540e930d7ee9d6859af664a567c2efedec4335 | source base |
| 161 | repair | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 162 | repair | demo/stories/motion/scroll.vue | — | 14f381aa282422f73b5238d725b21258ecd9f599 | source base |
| 163 | repair | demo/stories/motion/ScrollChoreographyBody.vue | — | b858ac6530a4639409d25655316ac0503970142d | source base |
| 164 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 165 | repair | demo/stories/motion/ScrollReaderBody.vue | — | 4d3ec8ced13c59a194437e45dd25813027bf0684 | source base |
| 166 | repair | demo/stories/motion/split-chars.vue | — | 6d46a23e25428031f226056dc6f7f24094ad489f | source base |
| 167 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 168 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 169 | repair | demo/stories/motion/text-motion.vue | — | bf6ef80875b5cdb6af038fd2f378f55e164edf7b | source base |
| 170 | repair | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 171 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 172 | repair | demo/stories/navigation/header-ribbon.vue | — | 73618bbe3e1543d29a247fa35287fd908296e5ad | source base |
| 173 | repair | demo/stories/navigation/tabs.vue | — | d849c1b15f01f63b358ffed4cf82e61faed7bebb | source base |
| 174 | repair | demo/stories/navigation/toc-tracking.vue | — | c9cf1693a0b1d05e7067be0faca2723e77effcf5 | source base |
| 175 | repair | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 176 | repair | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 177 | repair | demo/stories/substrates/aurora/AuroraStage.vue | — | 1511aabb33b2c5846151a07740354fe0af8efca2 | source base |
| 178 | repair | demo/stories/substrates/aurora/config/CompositionLayer.vue | — | 006b7735eaf3b6d90a881b15435dcb9c157a46aa | source base |
| 179 | repair | demo/stories/substrates/aurora/config/FlowLayer.vue | — | 5b6a771e32fd19376a182f3bed491397145f99b2 | source base |
| 180 | repair | demo/stories/substrates/aurora/config/NucleiLayer.vue | — | 4438e6a419d01461e7f2b1c72eeed053038505d6 | source base |
| 181 | repair | demo/stories/substrates/aurora/config/options.ts | — | 2fb120cd0b760df8bb8f778b8b9eb16ad15dd0a3 | source base |
| 182 | repair | demo/stories/substrates/aurora/config/PaletteLayer.vue | — | 59bdf9371357bf749664fc017cbe03e7c657c45d | source base |
| 183 | repair | demo/stories/substrates/aurora/config/TextureLayer.vue | — | 5a24b0210d62fd9ea5cee40085eef2217e1bd0da | source base |
| 184 | repair | demo/stories/substrates/aurora/config/usePaletteStops.ts | — | 52d4541130ba2e0dec4d5563f630bec6bc4426bd | source base |
| 185 | repair | demo/stories/substrates/aurora/NucleiOverlay.vue | — | 7da942d2f050904d101f2303859358a58013c562 | source base |
| 186 | repair | demo/stories/substrates/aurora/OklchStopRow.vue | — | 04bc76245b45f57ec97a846de7b77a6a31d55c28 | source base |
| 187 | repair | demo/stories/substrates/aurora/PresetPickerRow.vue | — | 54862db17b5598523816cfc15ea18927a76c1b09 | source base |
| 188 | repair | demo/stories/substrates/aurora/presets.ts | — | 74bd131a3d369e14ee35a26915db3afc178ee0b0 | source base |
| 189 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 190 | repair | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue | — | 28724c06ddb8640c9f744ba4404e35b3fdf80730 | source base |
| 191 | repair | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue | — | b6bf718d53e096646d18ee29526283923c5e780a | source base |
| 192 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 193 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 194 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 195 | repair | demo/stories/substrates/fGlyphPoints.ts | — | e5196c3fbe8be2521c08eb76f952d584529a1034 | source base |
| 196 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 197 | repair | demo/stories/substrates/fourier-paths.ts | — | 9cfcca76ea386f8773c805a4562252621039c077 | source base |
| 198 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 199 | repair | demo/stories/substrates/glass-panel.vue | — | ff1fe558ecfd84fd3543b4c7162cfe1030da6cca | source base |
| 200 | repair | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 201 | repair | demo/stories/substrates/presets.ts | — | 495f075c40c737978133d8888c6ab090bb94f241 | source base |
| 202 | repair | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 203 | repair | demo/vite.demo-dist.config.ts | — | 09244211a97a27c9df46b0c931dc01920871290a | source base |
| 204 | repair | docs/STRUCTURE.md | — | — | BI.W-P005 |
| 205 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 206 | create | tests-visual/demo-shell.spec.ts | — | — | source base |
| 207 | create | tests/demo/story-bijection.test.ts | — | — | source base |
| 208 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (209)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/App.vue |
| imports | 2 | demo/capture/capture.css |
| imports | 3 | demo/capture/engine-badge.ts |
| imports | 4 | demo/chassis/PermutationGrid.vue |
| imports | 5 | demo/chassis/body/StoryBodyRenderer.vue |
| imports | 6 | demo/chassis/body/story-body.ts |
| imports | 7 | demo/chassis/code/Code.vue |
| imports | 8 | demo/chassis/code/CodeBlock.vue |
| imports | 9 | demo/chassis/code/hljs-house-theme.css |
| imports | 10 | demo/chassis/code/useCodeHighlight.ts |
| imports | 11 | demo/chassis/family/FamilyTabs.vue |
| imports | 12 | demo/chassis/family/story-nested.ts |
| imports | 13 | demo/chassis/hero/StoryHeader.vue |
| imports | 14 | demo/chassis/hero/StoryHero.vue |
| imports | 15 | demo/chassis/hero/aurora-hero.ts |
| imports | 16 | demo/chassis/hero/category-hero.ts |
| imports | 17 | demo/chassis/hero/focal.ts |
| imports | 18 | demo/chassis/hero/story-hero.css |
| imports | 19 | demo/chassis/hero/warm-field.ts |
| imports | 20 | demo/chassis/index.ts |
| imports | 21 | demo/chassis/landing/SectionLanding.vue |
| imports | 22 | demo/chassis/landing/SectionPreviewCard.vue |
| imports | 23 | demo/chassis/landing/storyTile.ts |
| imports | 24 | demo/chassis/landing/vizPreviewStill.ts |
| imports | 25 | demo/chassis/page/StoryPage.vue |
| imports | 26 | demo/chassis/play/StoryPlayButton.vue |
| imports | 27 | demo/chassis/section/StorySection.vue |
| imports | 28 | demo/chassis/section/useSectionReveal.ts |
| imports | 29 | demo/chassis/showcase/ShowcaseFrame.vue |
| imports | 30 | demo/chassis/showcase/SpecimenFrame.vue |
| imports | 31 | demo/chassis/showcase/TokenLadder.vue |
| imports | 32 | demo/chassis/useStoryNavigation.ts |
| imports | 33 | demo/configurator/PresetEditor.vue |
| imports | 34 | demo/configurator/index.ts |
| imports | 35 | demo/configurator/preset-editor/css-writers.ts |
| imports | 36 | demo/configurator/preset-editor/defaults.ts |
| imports | 37 | demo/configurator/preset-editor/persistence.ts |
| imports | 38 | demo/configurator/preset-editor/store.ts |
| imports | 39 | demo/configurator/preset-editor/stylesheet-swap.ts |
| imports | 40 | demo/configurator/preset-editor/types.ts |
| imports | 41 | demo/configurator/presets/manifest.ts |
| imports | 42 | demo/configurator/presets/neutral.css |
| imports | 43 | demo/configurator/useConfiguratorOpen.ts |
| imports | 44 | demo/configurator/usePresetEditor.ts |
| imports | 45 | demo/demo.css |
| imports | 46 | demo/main.ts |
| imports | 47 | demo/router.ts |
| imports | 48 | demo/shell/AppShell.vue |
| imports | 49 | demo/shell/BottomDock.vue |
| imports | 50 | demo/shell/NotFound.vue |
| imports | 51 | demo/shell/SidebarDock.vue |
| imports | 52 | demo/shell/dock-layer-contexts.ts |
| imports | 53 | demo/shell/dock-nav.css |
| imports | 54 | demo/shell/useContextualDockLayers.ts |
| imports | 55 | demo/shell/useShellNavDock.ts |
| imports | 56 | demo/shell/useShellScrollProgress.ts |
| imports | 57 | demo/stories/compositions/auth-shell.vue |
| imports | 58 | demo/stories/compositions/chassis.vue |
| imports | 59 | demo/stories/compositions/empty-states.vue |
| imports | 60 | demo/stories/compositions/form-validation.vue |
| imports | 61 | demo/stories/compositions/gate-pattern.vue |
| imports | 62 | demo/stories/compositions/settings.vue |
| imports | 63 | demo/stories/containers/accordion.vue |
| imports | 64 | demo/stories/containers/card-pressable.vue |
| imports | 65 | demo/stories/containers/collapsible.vue |
| imports | 66 | demo/stories/containers/command.vue |
| imports | 67 | demo/stories/containers/configurator.vue |
| imports | 68 | demo/stories/containers/context-menu.vue |
| imports | 69 | demo/stories/containers/dialog.vue |
| imports | 70 | demo/stories/containers/drawer.vue |
| imports | 71 | demo/stories/containers/dropdown-menu.vue |
| imports | 72 | demo/stories/containers/expandable-container.vue |
| imports | 73 | demo/stories/containers/hover-card.vue |
| imports | 74 | demo/stories/containers/hover-popover.vue |
| imports | 75 | demo/stories/containers/icon-tooltip.vue |
| imports | 76 | demo/stories/containers/popover.vue |
| imports | 77 | demo/stories/containers/sheet.vue |
| imports | 78 | demo/stories/containers/spa-view.vue |
| imports | 79 | demo/stories/containers/tooltip.vue |
| imports | 80 | demo/stories/data/TimelineContinuousBody.vue |
| imports | 81 | demo/stories/data/TimelineSegmentedBody.vue |
| imports | 82 | demo/stories/data/avatar.vue |
| imports | 83 | demo/stories/data/data-table.vue |
| imports | 84 | demo/stories/data/infinite-scroll.vue |
| imports | 85 | demo/stories/data/instrument-chassis.vue |
| imports | 86 | demo/stories/data/metric-cell.vue |
| imports | 87 | demo/stories/data/metric-stack.vue |
| imports | 88 | demo/stories/data/metrics.vue |
| imports | 89 | demo/stories/data/search.vue |
| imports | 90 | demo/stories/data/sortable-list.vue |
| imports | 91 | demo/stories/data/table.vue |
| imports | 92 | demo/stories/data/tags-input.vue |
| imports | 93 | demo/stories/data/timeline.vue |
| imports | 94 | demo/stories/data/virtual-section.vue |
| imports | 95 | demo/stories/display/atoms.vue |
| imports | 96 | demo/stories/display/badge.vue |
| imports | 97 | demo/stories/display/buttons.tile.vue |
| imports | 98 | demo/stories/display/buttons.vue |
| imports | 99 | demo/stories/display/card.tile.vue |
| imports | 100 | demo/stories/display/card.vue |
| imports | 101 | demo/stories/display/dark-mode-toggle.vue |
| imports | 102 | demo/stories/display/metric-badge.vue |
| imports | 103 | demo/stories/display/pulse.vue |
| imports | 104 | demo/stories/display/section.vue |
| imports | 105 | demo/stories/display/separator.vue |
| imports | 106 | demo/stories/display/stacked-icons.vue |
| imports | 107 | demo/stories/display/status-dot.vue |
| imports | 108 | demo/stories/dock/DockStage.vue |
| imports | 109 | demo/stories/dock/controls.vue |
| imports | 110 | demo/stories/dock/cta-receive.vue |
| imports | 111 | demo/stories/dock/dock-search.vue |
| imports | 112 | demo/stories/dock/layers.vue |
| imports | 113 | demo/stories/dock/overflow.vue |
| imports | 114 | demo/stories/dock/overview.tile.vue |
| imports | 115 | demo/stories/dock/overview.vue |
| imports | 116 | demo/stories/dock/rail.vue |
| imports | 117 | demo/stories/dock/sections.vue |
| imports | 118 | demo/stories/feedback/alert.vue |
| imports | 119 | demo/stories/feedback/completion-seal.vue |
| imports | 120 | demo/stories/feedback/confirm-dialog.vue |
| imports | 121 | demo/stories/feedback/notification.vue |
| imports | 122 | demo/stories/feedback/progress.vue |
| imports | 123 | demo/stories/feedback/skeleton.vue |
| imports | 124 | demo/stories/feedback/toast.vue |
| imports | 125 | demo/stories/feedback/toaster.vue |
| imports | 126 | demo/stories/forms/checks.vue |
| imports | 127 | demo/stories/forms/combobox.vue |
| imports | 128 | demo/stories/forms/inputs.tile.vue |
| imports | 129 | demo/stories/forms/inputs.vue |
| imports | 130 | demo/stories/forms/label.vue |
| imports | 131 | demo/stories/forms/labeled-field.vue |
| imports | 132 | demo/stories/forms/number-field.vue |
| imports | 133 | demo/stories/forms/select.vue |
| imports | 134 | demo/stories/forms/selectable-chip.vue |
| imports | 135 | demo/stories/forms/slider.vue |
| imports | 136 | demo/stories/forms/textarea.vue |
| imports | 137 | demo/stories/forms/toggle-chip.vue |
| imports | 138 | demo/stories/forms/toggle.vue |
| imports | 139 | demo/stories/foundations/chart-chassis-palette.vue |
| imports | 140 | demo/stories/foundations/colors.vue |
| imports | 141 | demo/stories/foundations/css-utilities.vue |
| imports | 142 | demo/stories/foundations/icons.vue |
| imports | 143 | demo/stories/foundations/intro.vue |
| imports | 144 | demo/stories/foundations/motion.vue |
| imports | 145 | demo/stories/foundations/overlays-scrims.vue |
| imports | 146 | demo/stories/foundations/paper-glass.vue |
| imports | 147 | demo/stories/foundations/paper-texture.vue |
| imports | 148 | demo/stories/foundations/radii.vue |
| imports | 149 | demo/stories/foundations/shadows.vue |
| imports | 150 | demo/stories/foundations/surface-taxonomy.vue |
| imports | 151 | demo/stories/foundations/surface-tints.vue |
| imports | 152 | demo/stories/foundations/typography.vue |
| imports | 153 | demo/stories/manifest.ts |
| imports | 154 | demo/stories/manifest/lazy.ts |
| imports | 155 | demo/stories/motion/ScrollChoreographyBody.vue |
| imports | 156 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 157 | demo/stories/motion/ScrollReaderBody.vue |
| imports | 158 | demo/stories/motion/animated-digit.vue |
| imports | 159 | demo/stories/motion/countup.vue |
| imports | 160 | demo/stories/motion/curve-families.ts |
| imports | 161 | demo/stories/motion/curve-gallery.vue |
| imports | 162 | demo/stories/motion/deck.vue |
| imports | 163 | demo/stories/motion/handmark.vue |
| imports | 164 | demo/stories/motion/reveal.vue |
| imports | 165 | demo/stories/motion/scroll.vue |
| imports | 166 | demo/stories/motion/split-chars.vue |
| imports | 167 | demo/stories/motion/springs.vue |
| imports | 168 | demo/stories/motion/tempo.vue |
| imports | 169 | demo/stories/motion/text-motion.vue |
| imports | 170 | demo/stories/motion/typewriter.vue |
| imports | 171 | demo/stories/navigation/carousel.vue |
| imports | 172 | demo/stories/navigation/header-ribbon.vue |
| imports | 173 | demo/stories/navigation/tabs.vue |
| imports | 174 | demo/stories/navigation/toc-tracking.vue |
| imports | 175 | demo/stories/substrates/VizStudio.vue |
| imports | 176 | demo/stories/substrates/aurora.vue |
| imports | 177 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 178 | demo/stories/substrates/aurora/AuroraStage.vue |
| imports | 179 | demo/stories/substrates/aurora/NucleiOverlay.vue |
| imports | 180 | demo/stories/substrates/aurora/OklchStopRow.vue |
| imports | 181 | demo/stories/substrates/aurora/PresetPickerRow.vue |
| imports | 182 | demo/stories/substrates/aurora/config/CompositionLayer.vue |
| imports | 183 | demo/stories/substrates/aurora/config/FlowLayer.vue |
| imports | 184 | demo/stories/substrates/aurora/config/NucleiLayer.vue |
| imports | 185 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| imports | 186 | demo/stories/substrates/aurora/config/TextureLayer.vue |
| imports | 187 | demo/stories/substrates/aurora/config/options.ts |
| imports | 188 | demo/stories/substrates/aurora/config/usePaletteStops.ts |
| imports | 189 | demo/stories/substrates/aurora/presets.ts |
| imports | 190 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 191 | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue |
| imports | 192 | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue |
| imports | 193 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 194 | demo/stories/substrates/blob.vue |
| imports | 195 | demo/stories/substrates/constellation.vue |
| imports | 196 | demo/stories/substrates/fGlyphPoints.ts |
| imports | 197 | demo/stories/substrates/fourier-field.vue |
| imports | 198 | demo/stories/substrates/fourier-paths.ts |
| imports | 199 | demo/stories/substrates/glass-material.vue |
| imports | 200 | demo/stories/substrates/glass-panel.vue |
| imports | 201 | demo/stories/substrates/liquid-grid.vue |
| imports | 202 | demo/stories/substrates/presets.ts |
| imports | 203 | demo/vite.demo-dist.config.ts |
| tests | 1 | tests-visual/demo-shell.spec.ts |
| tests | 2 | tests/demo/story-bijection.test.ts |
| build | 1 | demo/vite.demo-dist.config.ts |
| build | 2 | vite.config.ts |
| docs | 1 | MIGRATION.md |
| docs | 2 | docs/STRUCTURE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P012/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Demo-only concepts have one private terminal home and every manifest route resolves to rendered code without a public export side effect.

**Required mutation bite:** Add a manifest route whose component glob misses and require story-bijection evidence to turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P012`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: demo-shell-route-hold, demo-route-bijection, demo-narrow-navigation
Observables: route stability, rendered component reachability, focus and dock navigation
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P008 | There is one flat component concept graph and one generated JS/d.ts entry authority; no ui/custom path or hidden reader survives. |

Declared semantic locks: `demo-manifest`, `demo-shell`. The cursor also acquires 220 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
