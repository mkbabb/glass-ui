# BI.W-P009 — MS5 — dissolve pure root barrels

**Status:** PLANNED
**Topological stratum:** BI.S05
**Formation family:** structure
**Core centers:** C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P009`

## Intent

Remove pass-through src/<name>.ts authorities and point the generated entry graph at semantic implementation homes.

## Exact scope

- Delete pure pass-through roots for axes, dark, keyboard, sidebar, infinite-scroll, carousel, motion, and motion-core.
- Move the tokens JS projection under styles and keep genuine forms aggregation only while it owns multiple concepts.
- Repoint generated entries and every internal reader; do not preserve source aliases.
- Evaluate zero-consumer axes as a product decision rather than preserving it for exact reproduction by default.

## File manifest (1397)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/App.vue | — | e1b22a59dd425c2a6b1cfa23d34c539062045fc4 | source base |
| 2 | repair | demo/capture/capture.css | — | 72ec7a39ba444a7c373e7762d7f87f449db9658b | source base |
| 3 | repair | demo/capture/engine-badge.ts | — | 167b4893d47b49011924f1d5f497c2d752a447c0 | source base |
| 4 | repair | demo/chassis/body/story-body.ts | — | 0f884b7904f66e80a0b6233ed41c5aa226119fd4 | source base |
| 5 | repair | demo/chassis/body/StoryBodyRenderer.vue | — | 1b5b922f042e7e6c37302be8614c05145d148368 | source base |
| 6 | repair | demo/chassis/code/Code.vue | — | bc7bf54d7bdc59ceac49aa0857c464d4c6c2de9f | source base |
| 7 | repair | demo/chassis/code/CodeBlock.vue | — | cb7518f7dac78b6d7f446c3ce940332427ac220f | source base |
| 8 | repair | demo/chassis/code/hljs-house-theme.css | — | 05baff4653f22c24b0fbc66117227ee8b5de4a61 | source base |
| 9 | repair | demo/chassis/code/useCodeHighlight.ts | — | 752e90eb93f2b13b3dd166e2af5c231a753703e7 | source base |
| 10 | repair | demo/chassis/family/FamilyTabs.vue | — | 2c4640256fc8edaa3de8d9f589cc49829372a324 | source base |
| 11 | repair | demo/chassis/family/story-nested.ts | — | d6599494bd2ef23d6ce7c0ac8109fd682cbd9c1b | source base |
| 12 | repair | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 13 | repair | demo/chassis/hero/category-hero.ts | — | a6c576bb063cdd67aea4ea13decc13d8f8b4b5e0 | source base |
| 14 | repair | demo/chassis/hero/focal.ts | — | 9ad415a77a918ad566bc39d36b921b0a9aa59cae | source base |
| 15 | repair | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 16 | repair | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 17 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 18 | repair | demo/chassis/hero/warm-field.ts | — | 69479e6b06d5a0dc0577ddca31dd8d467d9fe517 | source base |
| 19 | repair | demo/chassis/index.ts | — | 42987c17afc66e4d3e25ecd37e3ce6dcf0937e32 | source base |
| 20 | repair | demo/chassis/landing/SectionLanding.vue | — | aa70cb4d1b1e105017218f47ff1f4eab75f7439a | source base |
| 21 | repair | demo/chassis/landing/SectionPreviewCard.vue | — | 7809e9f4ceff868495b4b8706e5a412ea1808dcd | source base |
| 22 | repair | demo/chassis/landing/storyTile.ts | — | b0331b869d51533ee7e0bbbacf6ff0c1a8dd6e74 | source base |
| 23 | repair | demo/chassis/landing/vizPreviewStill.ts | — | 0b8f78dca4c032effd6059d416f9b758045bed79 | source base |
| 24 | repair | demo/chassis/page/StoryPage.vue | — | 0fe1e8036e707a34599b151634d5672a12ff4428 | source base |
| 25 | repair | demo/chassis/PermutationGrid.vue | — | 60cb9b610e5542b71a6c185575609e2f106c54a3 | source base |
| 26 | repair | demo/chassis/play/StoryPlayButton.vue | — | 5b52d114fba6b496b6f781cbd220c7aebb6dd7ab | source base |
| 27 | repair | demo/chassis/section/StorySection.vue | — | 88820a176ed137574e7b228435a5c26510c86653 | source base |
| 28 | repair | demo/chassis/section/useSectionReveal.ts | — | e86e5240dbce917231278703558733326ffc8259 | source base |
| 29 | repair | demo/chassis/showcase/ShowcaseFrame.vue | — | f3ca53e001a4ccebf55c203b2c204d6eafc42a58 | source base |
| 30 | repair | demo/chassis/showcase/SpecimenFrame.vue | — | b21dc3b68ea45cb5daf015809f0f4398f34e4809 | source base |
| 31 | repair | demo/chassis/showcase/TokenLadder.vue | — | c39159dd33f71a950efae5260422bbda0d1d6b9c | source base |
| 32 | repair | demo/chassis/useStoryNavigation.ts | — | 66cd02992b1e1e7f490efa60ffd9232a638e723b | source base |
| 33 | repair | demo/configurator/index.ts | — | 1d56ea76808acbfa9a4ed8151156b4be902f4fc7 | source base |
| 34 | repair | demo/configurator/preset-editor/css-writers.ts | — | db170ca45dda00950c42b53c86b439f63ce8bf60 | source base |
| 35 | repair | demo/configurator/preset-editor/defaults.ts | — | 31311a7574621ad58d080b45cb4ea7e5efdb5a66 | source base |
| 36 | repair | demo/configurator/preset-editor/persistence.ts | — | 4277a40af129bffc4d9eb2ee2fd3cbc05c08e7ae | source base |
| 37 | repair | demo/configurator/preset-editor/store.ts | — | 13f1c61e8b5e3e93ab5c03ff081ea651ce42d24f | source base |
| 38 | repair | demo/configurator/preset-editor/stylesheet-swap.ts | — | 8a056e89fe3209c10f4d717798bc03c1f83fbbf2 | source base |
| 39 | repair | demo/configurator/preset-editor/types.ts | — | 1a554909bb0d15212a945788e584c2e19de8beac | source base |
| 40 | repair | demo/configurator/PresetEditor.vue | — | f3a5e6a034885c9d832ecdcfcae94efd0030e107 | source base |
| 41 | repair | demo/configurator/presets/manifest.ts | — | 981a2685997f3976d507293a709bf6c517c831ef | source base |
| 42 | repair | demo/configurator/presets/neutral.css | — | 9d123feca1ed9b51f746fb8078c87bbda4ce9b11 | source base |
| 43 | repair | demo/configurator/useConfiguratorOpen.ts | — | cc662957025a0aa3cb7fc3e6be878798f3730a70 | source base |
| 44 | repair | demo/configurator/usePresetEditor.ts | — | 8f86bf48a665d0705be6f4cd1aa41eac9f1ae75c | source base |
| 45 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 46 | repair | demo/main.ts | — | 52322d0a200903207f071f4e218987f1f32f456d | source base |
| 47 | repair | demo/router.ts | — | 7f88ba5492b7d6a17bc890f3898edd7d8749dfc2 | source base |
| 48 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 49 | repair | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 50 | repair | demo/shell/dock-layer-contexts.ts | — | a89627e10ced4c94b5ba249f439316e81dd0e00a | source base |
| 51 | repair | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 52 | repair | demo/shell/NotFound.vue | — | 46ce8b6fe07e7bbc8fc8430ab29809ce7d9042a1 | source base |
| 53 | repair | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 54 | repair | demo/shell/useContextualDockLayers.ts | — | 3593d181db2a3d7141a29d2667a2d83d75da7c27 | source base |
| 55 | repair | demo/shell/useShellNavDock.ts | — | ebc895e0b3bc51abcac8306b45705b33e98c122a | source base |
| 56 | repair | demo/shell/useShellScrollProgress.ts | — | 6a91376e18030fac65507ee8b15bfa23f37950b9 | source base |
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
| 153 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
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
| 206 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 207 | repair | scripts/__tests__/proof-vt-names.test.ts | — | fb0c8d740bc40e0312d8ab5fa5c1696b5b8c09fd | source base |
| 208 | repair | scripts/audit-stash-list.mjs | — | 95328c3f00d9f547093daad69524b1fee0da22b6 | source base |
| 209 | repair | scripts/aurora-arresting-metric.mjs | — | 929c30e669a8366f7c1f68cd9948a6606b12eea3 | source base |
| 210 | repair | scripts/aurora-profile/harness-browser.mjs | — | bc70de727a6bd88b3c1e0190de059975bed7c065 | source base |
| 211 | repair | scripts/constellation.mjs | — | f5adb9a095bceaf911a6b6c29a7b7461bb81ecd0 | source base |
| 212 | repair | scripts/fixtures/strict-templates.fixture.vue | — | e33b1a0a608cb54cd8c75d3b01ada38d56e98ced | source base |
| 213 | repair | scripts/fixtures/tsconfig.strict-fixture.json | — | dfa69908a77d40a235e44d97d524e962cc2a1882 | source base |
| 214 | repair | scripts/flatten-subpath-types.mjs | — | 23b1313a92cad712687368227a3629919ad4b11a | source base |
| 215 | repair | scripts/install-hooks.mjs | — | dfc831cc5de98b5bd5ddbf202d6f62dc54463d47 | source base |
| 216 | repair | scripts/lib/canon-doc.mjs | — | 3745b1f4f7a3a6e17d25c490bdfb2f45c3b349ab | source base |
| 217 | repair | scripts/lib/critical-path-walk.mjs | — | cc217a22099eef2528838ef55fc365a7bdafc5f3 | source base |
| 218 | repair | scripts/lib/design-docs.mjs | — | 8070b91cec6107c0605c3738c640193f6ce93501 | source base |
| 219 | repair | scripts/lib/detect/comment-strip.mjs | — | 4e80026023b6cbed359046eaf4578dd9e54b1a19 | source base |
| 220 | repair | scripts/lib/detect/index.mjs | — | 064a7959eb72be48405d703f23382d5ef6501116 | source base |
| 221 | repair | scripts/lib/detect/markdown-table.mjs | — | f552d4bee38a9fbc6efd374d36bbfc997c180f53 | source base |
| 222 | repair | scripts/lib/detect/wave-id.mjs | — | 70bf8c316619366fc694da96853aeaffc66255af | source base |
| 223 | repair | scripts/lib/fold-ledger-core.mjs | — | af33745c80dc7799a0ccf5a930e828e9aa0af529 | source base |
| 224 | repair | scripts/lib/gesture-frame-recorder.mjs | — | 64e71c41978c241b1c555fa24381ee47fbd87fb4 | source base |
| 225 | repair | scripts/lib/gl-renderer-probe.mjs | — | 3a73e168801e0d3075fb95c82b27207a7dbc142d | source base |
| 226 | repair | scripts/lib/minify-css.mjs | — | 62b2954b7ca1877f9cb03767ac60c7edde57741b | source base |
| 227 | repair | scripts/lib/paint-arm.mjs | — | c2364b60eb0bbb020aa1298f493ebdac2fbf4ffc | source base |
| 228 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 229 | repair | scripts/lib/surface-closure.mjs | — | 76102745ee8189d149812165c72e407fa53a8d80 | source base |
| 230 | repair | scripts/lib/token-manifest.mjs | — | d9546a1ee96205141b1764c591f5b656e4ec1a4a | source base |
| 231 | repair | scripts/lighthouse/consumer-app/App.vue | — | 65d0bcd9dbd00eda5cc467ce5bd38e1fa1cf4937 | source base |
| 232 | repair | scripts/lighthouse/consumer-app/index.html | — | e75dffefb83af9c7c543f4dbe3f711efdbd307f3 | source base |
| 233 | repair | scripts/lighthouse/consumer-app/main.ts | — | b8d68af8b18067c45203735a088ef1325d1578b4 | source base |
| 234 | repair | scripts/lighthouse/consumer-app/vite.config.mts | — | 274317c69cbd6ea562e83bf89262bf2ed70c7e72 | source base |
| 235 | repair | scripts/lighthouse/floor.baseline.json | — | eb48a1b31649e44e83933fbeaa0bb6733922f6cc | source base |
| 236 | repair | scripts/lighthouse/preview-build.config.mts | — | ec07afa8ab8b66161a46b018d9afef77b37ef3fa | source base |
| 237 | repair | scripts/lighthouse/protocol.mjs | — | c3a5f7b15e7e1cb29fd268b07d227c435e859182 | source base |
| 238 | repair | scripts/no-masking-manifest.mjs | — | fbe95f0e90458fa3b464b72d4301b6f70e5f9287 | source base |
| 239 | repair | scripts/profile-aurora.mjs | — | f063e00cc23e970c1058c76efbd38d5d0060b6c0 | source base |
| 240 | repair | scripts/profile-bundle.mjs | — | 34419261975b16924dead033076a9ea85980c274 | source base |
| 241 | repair | scripts/read-blob-shaders.mjs | — | 831d08fc9942b9a85f955046b45dd15131eb5a31 | source base |
| 242 | repair | scripts/read-css-monoliths.mjs | — | 58c29c3383a68d847f2042f28091b513c1f0d2c4 | source base |
| 243 | repair | scripts/read-dock-css.mjs | — | 19ce66080431238144a190009faeccc0c5dacf6c | source base |
| 244 | repair | scripts/reflect-capture-verify.mjs | — | de96afa9de19be5536b23eff31dff1e22c597e25 | source base |
| 245 | repair | scripts/regen-exports.mjs | — | 1444acba4a0a0c93f960c40f52876a51b4d666d8 | source base |
| 246 | repair | scripts/regen-primitives.mjs | — | 45a78e73bcd69238461e7fab22679b05acf10295 | source base |
| 247 | repair | scripts/regen-spring-tokens.mjs | — | caa54e9d4d643d5b370b3d2a8b4bcae705ebbdfb | source base |
| 248 | repair | scripts/regen-structure.mjs | — | 1c1f7abc56fe63a6f583c89d248e2eb777aeb409 | source base |
| 249 | repair | scripts/release.sh | — | 5db6c889f9e2b878591646fb3a98fd3fb61ec1af | source base |
| 250 | repair | scripts/token-manifest-allowlist.json | — | 6532f08ffd1b30a75ef19ccfad6ccbea790625cf | source base |
| 251 | repair | scripts/verify-export-types.mjs | — | 41451980f1d14df20fe2b98cf5cabc92e8c1065d | source base |
| 252 | repair | scripts/verify-siblings-intact.mjs | — | ff84e9243ff933845b28ef71cef39b9b4efed398 | source base |
| 253 | repair | scripts/worktree-gc.mjs | — | a998c2b6b7f28447fde809548822bdccacd36189 | source base |
| 254 | delete | src/axes.ts | — | 6e424539d4cca95cf0e2a116704ed005c3e3be7b | source base |
| 255 | delete | src/carousel.ts | — | 88f39069fc6dc25e1748b574843357da6d6fd79a | source base |
| 256 | repair | src/components/_shared/axes.ts | — | — | BI.W-P008 |
| 257 | repair | src/components/_shared/index.ts | — | — | BI.W-P008 |
| 258 | repair | src/components/_shared/menuItemVariants.ts | — | — | BI.W-P008 |
| 259 | repair | src/components/_shared/ModalOverlay.vue | — | — | BI.W-P008 |
| 260 | repair | src/components/_shared/useControlSize.ts | — | — | BI.W-P008 |
| 261 | repair | src/components/_shared/useMotionAxis.ts | — | — | BI.W-P008 |
| 262 | repair | src/components/_shared/useStalePropWarning.ts | — | — | BI.W-P008 |
| 263 | repair | src/components/_shared/useSurfaceAxis.ts | — | — | BI.W-P008 |
| 264 | repair | src/components/accordion/Accordion.vue | — | — | BI.W-P008 |
| 265 | repair | src/components/accordion/AccordionContent.vue | — | — | BI.W-P008 |
| 266 | repair | src/components/accordion/AccordionItem.vue | — | — | BI.W-P008 |
| 267 | repair | src/components/accordion/AccordionTrigger.vue | — | — | BI.W-P008 |
| 268 | repair | src/components/accordion/index.ts | — | — | BI.W-P008 |
| 269 | repair | src/components/alert/Alert.vue | — | — | BI.W-P008 |
| 270 | repair | src/components/alert/AlertDescription.vue | — | — | BI.W-P008 |
| 271 | repair | src/components/alert/AlertTitle.vue | — | — | BI.W-P008 |
| 272 | repair | src/components/alert/index.ts | — | — | BI.W-P008 |
| 273 | repair | src/components/animated-digit/AnimatedDigit.vue | — | — | BI.W-P008 |
| 274 | repair | src/components/animated-digit/index.ts | — | — | BI.W-P008 |
| 275 | repair | src/components/animated-digit/README.md | — | — | BI.W-P008 |
| 276 | repair | src/components/aurora/Aurora.vue | — | — | BI.W-P008 |
| 277 | repair | src/components/aurora/composables/atoms-fields.ts | — | — | BI.W-P008 |
| 278 | repair | src/components/aurora/composables/atoms.ts | — | — | BI.W-P008 |
| 279 | repair | src/components/aurora/composables/auroraFallbackGround.ts | — | — | BI.W-P008 |
| 280 | repair | src/components/aurora/composables/auroraImageSource.ts | — | — | BI.W-P008 |
| 281 | repair | src/components/aurora/composables/color.ts | — | — | BI.W-P008 |
| 282 | repair | src/components/aurora/composables/configSource.ts | — | — | BI.W-P008 |
| 283 | repair | src/components/aurora/composables/frameLoop.ts | — | — | BI.W-P008 |
| 284 | repair | src/components/aurora/composables/glSetup.ts | — | — | BI.W-P008 |
| 285 | repair | src/components/aurora/composables/runtime.ts | — | — | BI.W-P008 |
| 286 | repair | src/components/aurora/composables/uniformBridge.ts | — | — | BI.W-P008 |
| 287 | repair | src/components/aurora/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 288 | repair | src/components/aurora/composables/uniformBridgeWGPUImage.ts | — | — | BI.W-P008 |
| 289 | repair | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 290 | repair | src/components/aurora/composables/useCursorInteraction.ts | — | — | BI.W-P008 |
| 291 | repair | src/components/aurora/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 292 | repair | src/components/aurora/constants/budget.ts | — | — | BI.W-P008 |
| 293 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 294 | repair | src/components/aurora/constants/renderMode.ts | — | — | BI.W-P008 |
| 295 | repair | src/components/aurora/constants/shaders/aurora-image.frag.ts | — | — | BI.W-P008 |
| 296 | repair | src/components/aurora/constants/shaders/aurora-image.wgsl.ts | — | — | BI.W-P008 |
| 297 | repair | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts | — | — | BI.W-P008 |
| 298 | repair | src/components/aurora/constants/shaders/aurora.frag.ts | — | — | BI.W-P008 |
| 299 | repair | src/components/aurora/constants/shaders/aurora.vert.ts | — | — | BI.W-P008 |
| 300 | repair | src/components/aurora/constants/shaders/aurora.wgsl.ts | — | — | BI.W-P008 |
| 301 | repair | src/components/aurora/constants/shaders/brush.glsl.ts | — | — | BI.W-P008 |
| 302 | repair | src/components/aurora/constants/shaders/composition.glsl.ts | — | — | BI.W-P008 |
| 303 | repair | src/components/aurora/constants/shaders/flow.glsl.ts | — | — | BI.W-P008 |
| 304 | repair | src/components/aurora/constants/shaders/mediums.glsl.ts | — | — | BI.W-P008 |
| 305 | repair | src/components/aurora/constants/shaders/metal-medium.glsl.ts | — | — | BI.W-P008 |
| 306 | repair | src/components/aurora/constants/shaders/oil-modes.glsl.ts | — | — | BI.W-P008 |
| 307 | repair | src/components/aurora/constants/shaders/procedural-color.wgsl.ts | — | — | BI.W-P008 |
| 308 | repair | src/components/aurora/constants/shaders/tonemap.glsl.ts | — | — | BI.W-P008 |
| 309 | repair | src/components/aurora/constants/shaders/vangogh-medium.glsl.ts | — | — | BI.W-P008 |
| 310 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 311 | repair | src/components/aurora/index.ts | — | — | BI.W-P008 |
| 312 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 313 | repair | src/components/aurora/RESEARCH.md | — | — | BI.W-P008 |
| 314 | repair | src/components/avatar/Avatar.vue | — | — | BI.W-P008 |
| 315 | repair | src/components/avatar/AvatarFallback.vue | — | — | BI.W-P008 |
| 316 | repair | src/components/avatar/AvatarImage.vue | — | — | BI.W-P008 |
| 317 | repair | src/components/avatar/index.ts | — | — | BI.W-P008 |
| 318 | repair | src/components/badge/Badge.vue | — | — | BI.W-P008 |
| 319 | repair | src/components/badge/index.ts | — | — | BI.W-P008 |
| 320 | repair | src/components/blob/Blob.vue | — | — | BI.W-P008 |
| 321 | repair | src/components/blob/composables/buildMetaballProgram.ts | — | — | BI.W-P008 |
| 322 | repair | src/components/blob/composables/easing.ts | — | — | BI.W-P008 |
| 323 | repair | src/components/blob/composables/satelliteKinematics.ts | — | — | BI.W-P008 |
| 324 | repair | src/components/blob/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 325 | repair | src/components/blob/composables/uploadBlobUniforms.ts | — | — | BI.W-P008 |
| 326 | repair | src/components/blob/composables/useBlobMood.ts | — | — | BI.W-P008 |
| 327 | repair | src/components/blob/composables/useBlobPointer.ts | — | — | BI.W-P008 |
| 328 | repair | src/components/blob/composables/useBlobSatellites.ts | — | — | BI.W-P008 |
| 329 | repair | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 330 | repair | src/components/blob/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 331 | repair | src/components/blob/config.ts | — | — | BI.W-P008 |
| 332 | repair | src/components/blob/constants.ts | — | — | BI.W-P008 |
| 333 | repair | src/components/blob/index.ts | — | — | BI.W-P008 |
| 334 | repair | src/components/blob/presets.ts | — | — | BI.W-P008 |
| 335 | repair | src/components/blob/README.md | — | — | BI.W-P008 |
| 336 | repair | src/components/blob/RESEARCH.md | — | — | BI.W-P008 |
| 337 | repair | src/components/blob/shaders/metaball-noise.wgsl.ts | — | — | BI.W-P008 |
| 338 | repair | src/components/blob/shaders/metaball-palette.wgsl.ts | — | — | BI.W-P008 |
| 339 | repair | src/components/blob/shaders/metaball-uniforms.glsl.ts | — | — | BI.W-P008 |
| 340 | repair | src/components/blob/shaders/metaball.frag.ts | — | — | BI.W-P008 |
| 341 | repair | src/components/blob/shaders/metaball.vert.ts | — | — | BI.W-P008 |
| 342 | repair | src/components/blob/shaders/metaball.wgsl.ts | — | — | BI.W-P008 |
| 343 | repair | src/components/blob/shaders/oklch-perturb.glsl.ts | — | — | BI.W-P008 |
| 344 | repair | src/components/blob/shaders/sdf-body.glsl.ts | — | — | BI.W-P008 |
| 345 | repair | src/components/blob/shaders/watercolor-edges.glsl.ts | — | — | BI.W-P008 |
| 346 | repair | src/components/blob/types.ts | — | — | BI.W-P008 |
| 347 | repair | src/components/border-progress/BorderProgress.vue | — | — | BI.W-P008 |
| 348 | repair | src/components/border-progress/composables/useBorderSpectrum.ts | — | — | BI.W-P008 |
| 349 | repair | src/components/border-progress/constants.ts | — | — | BI.W-P008 |
| 350 | repair | src/components/border-progress/index.ts | — | — | BI.W-P008 |
| 351 | repair | src/components/border-progress/README.md | — | — | BI.W-P008 |
| 352 | repair | src/components/button/Button.vue | — | — | BI.W-P008 |
| 353 | repair | src/components/button/index.ts | — | — | BI.W-P008 |
| 354 | repair | src/components/card/Card.vue | — | — | BI.W-P008 |
| 355 | repair | src/components/card/CardAction.vue | — | — | BI.W-P008 |
| 356 | repair | src/components/card/CardContent.vue | — | — | BI.W-P008 |
| 357 | repair | src/components/card/CardDescription.vue | — | — | BI.W-P008 |
| 358 | repair | src/components/card/CardFooter.vue | — | — | BI.W-P008 |
| 359 | repair | src/components/card/CardHeader.vue | — | — | BI.W-P008 |
| 360 | repair | src/components/card/CardTitle.vue | — | — | BI.W-P008 |
| 361 | repair | src/components/card/index.ts | — | — | BI.W-P008 |
| 362 | repair | src/components/card/ScrollCard.vue | — | — | BI.W-P008 |
| 363 | repair | src/components/card/ScrollCardHeader.vue | — | — | BI.W-P008 |
| 364 | repair | src/components/carousel/Carousel.vue | — | — | BI.W-P008 |
| 365 | repair | src/components/carousel/CarouselContent.vue | — | — | BI.W-P008 |
| 366 | repair | src/components/carousel/CarouselItem.vue | — | — | BI.W-P008 |
| 367 | repair | src/components/carousel/CarouselNext.vue | — | — | BI.W-P008 |
| 368 | repair | src/components/carousel/CarouselPager.vue | — | — | BI.W-P008 |
| 369 | repair | src/components/carousel/CarouselPrevious.vue | — | — | BI.W-P008 |
| 370 | repair | src/components/carousel/GlassCarouselPager.vue | — | — | BI.W-P008 |
| 371 | repair | src/components/carousel/index.ts | — | — | BI.W-P008 |
| 372 | repair | src/components/carousel/interface.ts | — | — | BI.W-P008 |
| 373 | repair | src/components/carousel/useCarousel.ts | — | — | BI.W-P008 |
| 374 | repair | src/components/checkbox/Checkbox.vue | — | — | BI.W-P008 |
| 375 | repair | src/components/checkbox/index.ts | — | — | BI.W-P008 |
| 376 | repair | src/components/chip/Chip.vue | — | — | BI.W-P008 |
| 377 | repair | src/components/chip/chipVariants.ts | — | — | BI.W-P008 |
| 378 | repair | src/components/chip/index.ts | — | — | BI.W-P008 |
| 379 | repair | src/components/chip/README.md | — | — | BI.W-P008 |
| 380 | repair | src/components/chip/types.ts | — | — | BI.W-P008 |
| 381 | repair | src/components/collapsible/Collapsible.vue | — | — | BI.W-P008 |
| 382 | repair | src/components/collapsible/CollapsibleContent.vue | — | — | BI.W-P008 |
| 383 | repair | src/components/collapsible/CollapsibleTrigger.vue | — | — | BI.W-P008 |
| 384 | repair | src/components/collapsible/index.ts | — | — | BI.W-P008 |
| 385 | repair | src/components/color-swatch/ColorSwatch.vue | — | — | BI.W-P008 |
| 386 | repair | src/components/color-swatch/index.ts | — | — | BI.W-P008 |
| 387 | repair | src/components/color-swatch/README.md | — | — | BI.W-P008 |
| 388 | repair | src/components/combobox/Combobox.vue | — | — | BI.W-P008 |
| 389 | repair | src/components/combobox/ComboboxAnchor.vue | — | — | BI.W-P008 |
| 390 | repair | src/components/combobox/ComboboxEmpty.vue | — | — | BI.W-P008 |
| 391 | repair | src/components/combobox/ComboboxGroup.vue | — | — | BI.W-P008 |
| 392 | repair | src/components/combobox/ComboboxInput.vue | — | — | BI.W-P008 |
| 393 | repair | src/components/combobox/ComboboxItem.vue | — | — | BI.W-P008 |
| 394 | repair | src/components/combobox/ComboboxItemIndicator.vue | — | — | BI.W-P008 |
| 395 | repair | src/components/combobox/ComboboxList.vue | — | — | BI.W-P008 |
| 396 | repair | src/components/combobox/ComboboxSeparator.vue | — | — | BI.W-P008 |
| 397 | repair | src/components/combobox/ComboboxViewport.vue | — | — | BI.W-P008 |
| 398 | repair | src/components/combobox/index.ts | — | — | BI.W-P008 |
| 399 | repair | src/components/command/Command.vue | — | — | BI.W-P008 |
| 400 | repair | src/components/command/CommandDialog.vue | — | — | BI.W-P008 |
| 401 | repair | src/components/command/CommandEmpty.vue | — | — | BI.W-P008 |
| 402 | repair | src/components/command/CommandGroup.vue | — | — | BI.W-P008 |
| 403 | repair | src/components/command/CommandInput.vue | — | — | BI.W-P008 |
| 404 | repair | src/components/command/CommandItem.vue | — | — | BI.W-P008 |
| 405 | repair | src/components/command/CommandList.vue | — | — | BI.W-P008 |
| 406 | repair | src/components/command/CommandSeparator.vue | — | — | BI.W-P008 |
| 407 | repair | src/components/command/CommandShortcut.vue | — | — | BI.W-P008 |
| 408 | repair | src/components/command/index.ts | — | — | BI.W-P008 |
| 409 | repair | src/components/completion-seal/CompletionSeal.vue | — | — | BI.W-P008 |
| 410 | repair | src/components/completion-seal/composables/useCompletionSeal.ts | — | — | BI.W-P008 |
| 411 | repair | src/components/completion-seal/constants.ts | — | — | BI.W-P008 |
| 412 | repair | src/components/completion-seal/index.ts | — | — | BI.W-P008 |
| 413 | repair | src/components/completion-seal/README.md | — | — | BI.W-P008 |
| 414 | repair | src/components/configurator/Configurator.vue | — | — | BI.W-P008 |
| 415 | repair | src/components/configurator/ConfiguratorLayer.vue | — | — | BI.W-P008 |
| 416 | repair | src/components/configurator/ConfiguratorRow.vue | — | — | BI.W-P008 |
| 417 | repair | src/components/configurator/index.ts | — | — | BI.W-P008 |
| 418 | repair | src/components/configurator/size.ts | — | — | BI.W-P008 |
| 419 | repair | src/components/configurator/useConfiguratorState.ts | — | — | BI.W-P008 |
| 420 | repair | src/components/constellation/composables/constellationGLSetup.ts | — | — | BI.W-P008 |
| 421 | repair | src/components/constellation/composables/constellationWGPUSetup.ts | — | — | BI.W-P008 |
| 422 | repair | src/components/constellation/composables/createConstellationField.ts | — | — | BI.W-P008 |
| 423 | repair | src/components/constellation/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 424 | repair | src/components/constellation/composables/useConstellation.ts | — | — | BI.W-P008 |
| 425 | repair | src/components/constellation/constants.ts | — | — | BI.W-P008 |
| 426 | repair | src/components/constellation/Constellation.vue | — | — | BI.W-P008 |
| 427 | repair | src/components/constellation/constellationField.ts | — | — | BI.W-P008 |
| 428 | repair | src/components/constellation/constellationInteraction.ts | — | — | BI.W-P008 |
| 429 | repair | src/components/constellation/constellationRender.ts | — | — | BI.W-P008 |
| 430 | repair | src/components/constellation/constellationTypes.ts | — | — | BI.W-P008 |
| 431 | repair | src/components/constellation/constellationWell.ts | — | — | BI.W-P008 |
| 432 | repair | src/components/constellation/index.ts | — | — | BI.W-P008 |
| 433 | repair | src/components/constellation/README.md | — | — | BI.W-P008 |
| 434 | repair | src/components/constellation/shaders/constellation-lines.glsl.ts | — | — | BI.W-P008 |
| 435 | repair | src/components/constellation/shaders/constellation-lines.wgsl.ts | — | — | BI.W-P008 |
| 436 | repair | src/components/constellation/shaders/constellation-points.glsl.ts | — | — | BI.W-P008 |
| 437 | repair | src/components/constellation/shaders/constellation-points.wgsl.ts | — | — | BI.W-P008 |
| 438 | repair | src/components/controls/DarkModeToggle.vue | — | — | BI.W-P008 |
| 439 | repair | src/components/controls/index.ts | — | — | BI.W-P008 |
| 440 | repair | src/components/controls/README.md | — | — | BI.W-P008 |
| 441 | repair | src/components/data-table/composables/useDataTableResponsive.ts | — | — | BI.W-P008 |
| 442 | repair | src/components/data-table/composables/useDataTableRowIdentity.ts | — | — | BI.W-P008 |
| 443 | repair | src/components/data-table/DataTable.vue | — | — | BI.W-P008 |
| 444 | repair | src/components/data-table/DataTablePagination.vue | — | — | BI.W-P008 |
| 445 | repair | src/components/data-table/index.ts | — | — | BI.W-P008 |
| 446 | repair | src/components/data-table/types.ts | — | — | BI.W-P008 |
| 447 | repair | src/components/deck/composables/useDeck.ts | — | — | BI.W-P008 |
| 448 | repair | src/components/deck/composables/useDeckKeyboard.ts | — | — | BI.W-P008 |
| 449 | repair | src/components/deck/composables/useDeckSpring.ts | — | — | BI.W-P008 |
| 450 | repair | src/components/deck/constants.ts | — | — | BI.W-P008 |
| 451 | repair | src/components/deck/DeckPager.vue | — | — | BI.W-P008 |
| 452 | repair | src/components/deck/index.ts | — | — | BI.W-P008 |
| 453 | repair | src/components/deck/README.md | — | — | BI.W-P008 |
| 454 | repair | src/components/dialog/Dialog.vue | — | — | BI.W-P008 |
| 455 | repair | src/components/dialog/DialogClose.vue | — | — | BI.W-P008 |
| 456 | repair | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 457 | repair | src/components/dialog/DialogDescription.vue | — | — | BI.W-P008 |
| 458 | repair | src/components/dialog/DialogFooter.vue | — | — | BI.W-P008 |
| 459 | repair | src/components/dialog/DialogHeader.vue | — | — | BI.W-P008 |
| 460 | repair | src/components/dialog/DialogScrollContent.vue | — | — | BI.W-P008 |
| 461 | repair | src/components/dialog/DialogTitle.vue | — | — | BI.W-P008 |
| 462 | repair | src/components/dialog/DialogTrigger.vue | — | — | BI.W-P008 |
| 463 | repair | src/components/dialog/index.ts | — | — | BI.W-P008 |
| 464 | repair | src/components/dock/composables/dockContext.ts | — | — | BI.W-P008 |
| 465 | repair | src/components/dock/composables/dockCrossfadeContext.ts | — | — | BI.W-P008 |
| 466 | repair | src/components/dock/composables/dockMorphContext.ts | — | — | BI.W-P008 |
| 467 | repair | src/components/dock/composables/dockMorphMeasure.ts | — | — | BI.W-P008 |
| 468 | repair | src/components/dock/composables/index.ts | — | — | BI.W-P008 |
| 469 | repair | src/components/dock/composables/isTeleportedTarget.ts | — | — | BI.W-P008 |
| 470 | repair | src/components/dock/composables/useDockClickIntegrity.ts | — | — | BI.W-P008 |
| 471 | repair | src/components/dock/composables/useDockFisheye.ts | — | — | BI.W-P008 |
| 472 | repair | src/components/dock/composables/useDockHold.ts | — | — | BI.W-P008 |
| 473 | repair | src/components/dock/composables/useDockOverflowFit.ts | — | — | BI.W-P008 |
| 474 | repair | src/components/dock/composables/useDockPopover.ts | — | — | BI.W-P008 |
| 475 | repair | src/components/dock/composables/useDockSearch.ts | — | — | BI.W-P008 |
| 476 | repair | src/components/dock/composables/useDockShellProps.ts | — | — | BI.W-P008 |
| 477 | repair | src/components/dock/composables/useDockSpring.ts | — | — | BI.W-P008 |
| 478 | repair | src/components/dock/composables/useDockState.ts | — | — | BI.W-P008 |
| 479 | repair | src/components/dock/composables/useDockTouchGate.ts | — | — | BI.W-P008 |
| 480 | repair | src/components/dock/constants.ts | — | — | BI.W-P008 |
| 481 | repair | src/components/dock/DockBackgroundToggle.vue | — | — | BI.W-P008 |
| 482 | repair | src/components/dock/DockControl.vue | — | — | BI.W-P008 |
| 483 | repair | src/components/dock/DockCrossfade.vue | — | — | BI.W-P008 |
| 484 | repair | src/components/dock/DockLayer.vue | — | — | BI.W-P008 |
| 485 | repair | src/components/dock/DockLayerGroup.vue | — | — | BI.W-P008 |
| 486 | repair | src/components/dock/DockSection.vue | — | — | BI.W-P008 |
| 487 | repair | src/components/dock/DockSeparator.vue | — | — | BI.W-P008 |
| 488 | repair | src/components/dock/DockStack.vue | — | — | BI.W-P008 |
| 489 | repair | src/components/dock/DockTrigger.vue | — | — | BI.W-P008 |
| 490 | repair | src/components/dock/GlassDock.vue | — | — | BI.W-P008 |
| 491 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 492 | repair | src/components/dock/README.md | — | — | BI.W-P008 |
| 493 | repair | src/components/drawer/composables/drawerSnapContext.ts | — | — | BI.W-P008 |
| 494 | repair | src/components/drawer/composables/useDrawerSnap.ts | — | — | BI.W-P008 |
| 495 | repair | src/components/drawer/constants.ts | — | — | BI.W-P008 |
| 496 | repair | src/components/drawer/Drawer.vue | — | — | BI.W-P008 |
| 497 | repair | src/components/drawer/DrawerContent.vue | — | — | BI.W-P008 |
| 498 | repair | src/components/drawer/DrawerDescription.vue | — | — | BI.W-P008 |
| 499 | repair | src/components/drawer/DrawerFooter.vue | — | — | BI.W-P008 |
| 500 | repair | src/components/drawer/DrawerHeader.vue | — | — | BI.W-P008 |
| 501 | repair | src/components/drawer/DrawerOverlay.vue | — | — | BI.W-P008 |
| 502 | repair | src/components/drawer/DrawerTitle.vue | — | — | BI.W-P008 |
| 503 | repair | src/components/drawer/index.ts | — | — | BI.W-P008 |
| 504 | repair | src/components/dropdown-menu/DropdownMenu.vue | — | — | BI.W-P008 |
| 505 | repair | src/components/dropdown-menu/DropdownMenuCheckboxItem.vue | — | — | BI.W-P008 |
| 506 | repair | src/components/dropdown-menu/DropdownMenuContent.vue | — | — | BI.W-P008 |
| 507 | repair | src/components/dropdown-menu/DropdownMenuGroup.vue | — | — | BI.W-P008 |
| 508 | repair | src/components/dropdown-menu/DropdownMenuItem.vue | — | — | BI.W-P008 |
| 509 | repair | src/components/dropdown-menu/DropdownMenuLabel.vue | — | — | BI.W-P008 |
| 510 | repair | src/components/dropdown-menu/DropdownMenuRadioGroup.vue | — | — | BI.W-P008 |
| 511 | repair | src/components/dropdown-menu/DropdownMenuRadioItem.vue | — | — | BI.W-P008 |
| 512 | repair | src/components/dropdown-menu/DropdownMenuSeparator.vue | — | — | BI.W-P008 |
| 513 | repair | src/components/dropdown-menu/DropdownMenuShortcut.vue | — | — | BI.W-P008 |
| 514 | repair | src/components/dropdown-menu/DropdownMenuSub.vue | — | — | BI.W-P008 |
| 515 | repair | src/components/dropdown-menu/DropdownMenuSubContent.vue | — | — | BI.W-P008 |
| 516 | repair | src/components/dropdown-menu/DropdownMenuSubTrigger.vue | — | — | BI.W-P008 |
| 517 | repair | src/components/dropdown-menu/DropdownMenuTrigger.vue | — | — | BI.W-P008 |
| 518 | repair | src/components/dropdown-menu/index.ts | — | — | BI.W-P008 |
| 519 | repair | src/components/dropdown-menu/useMenuTrigger.ts | — | — | BI.W-P008 |
| 520 | repair | src/components/easing/composables/useEasingPicker.ts | — | — | BI.W-P008 |
| 521 | repair | src/components/easing/constants.ts | — | — | BI.W-P008 |
| 522 | repair | src/components/easing/EasingConfigurator.vue | — | — | BI.W-P008 |
| 523 | repair | src/components/easing/EasingPicker.vue | — | — | BI.W-P008 |
| 524 | repair | src/components/easing/index.ts | — | — | BI.W-P008 |
| 525 | repair | src/components/easing/README.md | — | — | BI.W-P008 |
| 526 | repair | src/components/expandable-container/ExpandableContainer.vue | — | — | BI.W-P008 |
| 527 | repair | src/components/expandable-container/index.ts | — | — | BI.W-P008 |
| 528 | repair | src/components/expandable-container/README.md | — | — | BI.W-P008 |
| 529 | repair | src/components/fading-scroll/composables/useFadingScroll.ts | — | — | BI.W-P008 |
| 530 | repair | src/components/fading-scroll/constants.ts | — | — | BI.W-P008 |
| 531 | repair | src/components/fading-scroll/FadingScroll.vue | — | — | BI.W-P008 |
| 532 | repair | src/components/fading-scroll/index.ts | — | — | BI.W-P008 |
| 533 | repair | src/components/fading-scroll/README.md | — | — | BI.W-P008 |
| 534 | repair | src/components/focus-scope/FocusScope.vue | — | — | BI.W-P008 |
| 535 | repair | src/components/focus-scope/index.ts | — | — | BI.W-P008 |
| 536 | repair | src/components/fourier-field/composables/fourierFieldGLSetup.ts | — | — | BI.W-P008 |
| 537 | repair | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts | — | — | BI.W-P008 |
| 538 | repair | src/components/fourier-field/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 539 | repair | src/components/fourier-field/composables/useFourierField.ts | — | — | BI.W-P008 |
| 540 | repair | src/components/fourier-field/constants.ts | — | — | BI.W-P008 |
| 541 | repair | src/components/fourier-field/FourierField.vue | — | — | BI.W-P008 |
| 542 | repair | src/components/fourier-field/index.ts | — | — | BI.W-P008 |
| 543 | repair | src/components/fourier-field/math.ts | — | — | BI.W-P008 |
| 544 | repair | src/components/fourier-field/presets.ts | — | — | BI.W-P008 |
| 545 | repair | src/components/fourier-field/README.md | — | — | BI.W-P008 |
| 546 | repair | src/components/fourier-field/shaders/fourier-field.compute.wgsl.ts | — | — | BI.W-P008 |
| 547 | repair | src/components/fourier-field/shaders/fourier-field.glsl.ts | — | — | BI.W-P008 |
| 548 | repair | src/components/fourier-field/shaders/fourier-field.render.wgsl.ts | — | — | BI.W-P008 |
| 549 | repair | src/components/fourier-field/shaders/fourier-field.ribbon.ts | — | — | BI.W-P008 |
| 550 | repair | src/components/goo-filter/GooFilter.vue | — | — | BI.W-P008 |
| 551 | repair | src/components/goo-filter/index.ts | — | — | BI.W-P008 |
| 552 | repair | src/components/goo-filter/README.md | — | — | BI.W-P008 |
| 553 | repair | src/components/handmark/brush.ts | — | — | BI.W-P008 |
| 554 | repair | src/components/handmark/composables/useHandMark.ts | — | — | BI.W-P008 |
| 555 | repair | src/components/handmark/constants.ts | — | — | BI.W-P008 |
| 556 | repair | src/components/handmark/freehand.ts | — | — | BI.W-P008 |
| 557 | repair | src/components/handmark/geometry.ts | — | — | BI.W-P008 |
| 558 | repair | src/components/handmark/HandMark.vue | — | — | BI.W-P008 |
| 559 | repair | src/components/handmark/index.ts | — | — | BI.W-P008 |
| 560 | repair | src/components/handmark/ink.ts | — | — | BI.W-P008 |
| 561 | repair | src/components/handmark/noise.ts | — | — | BI.W-P008 |
| 562 | repair | src/components/handmark/README.md | — | — | BI.W-P008 |
| 563 | repair | src/components/handmark/texture.ts | — | — | BI.W-P008 |
| 564 | repair | src/components/handmark/types.ts | — | — | BI.W-P008 |
| 565 | repair | src/components/header-ribbon/HeaderRibbon.vue | — | — | BI.W-P008 |
| 566 | repair | src/components/header-ribbon/index.ts | — | — | BI.W-P008 |
| 567 | repair | src/components/header-ribbon/README.md | — | — | BI.W-P008 |
| 568 | repair | src/components/header-ribbon/types.ts | — | — | BI.W-P008 |
| 569 | repair | src/components/icon-chip/IconChip.vue | — | — | BI.W-P008 |
| 570 | repair | src/components/icon-chip/index.ts | — | — | BI.W-P008 |
| 571 | repair | src/components/icon-chip/README.md | — | — | BI.W-P008 |
| 572 | repair | src/components/icon-chip/types.ts | — | — | BI.W-P008 |
| 573 | repair | src/components/icon-tooltip/IconTooltip.vue | — | — | BI.W-P008 |
| 574 | repair | src/components/icon-tooltip/index.ts | — | — | BI.W-P008 |
| 575 | repair | src/components/icon-tooltip/README.md | — | — | BI.W-P008 |
| 576 | repair | src/components/index.ts | — | — | BI.W-P008 |
| 577 | repair | src/components/infinite-scroll/composables/index.ts | — | — | BI.W-P008 |
| 578 | repair | src/components/infinite-scroll/composables/types.ts | — | — | BI.W-P008 |
| 579 | repair | src/components/infinite-scroll/composables/useInfiniteScroll.ts | — | — | BI.W-P008 |
| 580 | repair | src/components/infinite-scroll/index.ts | — | — | BI.W-P008 |
| 581 | repair | src/components/infinite-scroll/InfiniteScroll.vue | — | — | BI.W-P008 |
| 582 | repair | src/components/input/index.ts | — | — | BI.W-P008 |
| 583 | repair | src/components/input/Input.vue | — | — | BI.W-P008 |
| 584 | repair | src/components/instrument-chassis/ChassisDivider.vue | — | — | BI.W-P008 |
| 585 | repair | src/components/instrument-chassis/index.ts | — | — | BI.W-P008 |
| 586 | repair | src/components/instrument-chassis/InstrumentChassis.vue | — | — | BI.W-P008 |
| 587 | repair | src/components/instrument-chassis/README.md | — | — | BI.W-P008 |
| 588 | repair | src/components/label/index.ts | — | — | BI.W-P008 |
| 589 | repair | src/components/label/Label.vue | — | — | BI.W-P008 |
| 590 | repair | src/components/labeled-field/index.ts | — | — | BI.W-P008 |
| 591 | repair | src/components/labeled-field/LabeledField.vue | — | — | BI.W-P008 |
| 592 | repair | src/components/labeled-field/LabeledInput.vue | — | — | BI.W-P008 |
| 593 | repair | src/components/labeled-field/LabeledSelect.vue | — | — | BI.W-P008 |
| 594 | repair | src/components/labeled-field/LabeledSlider.vue | — | — | BI.W-P008 |
| 595 | repair | src/components/labeled-field/LabeledSwitch.vue | — | — | BI.W-P008 |
| 596 | repair | src/components/labeled-field/README.md | — | — | BI.W-P008 |
| 597 | repair | src/components/liquid-grid/composables/liquidGrid.ts | — | — | BI.W-P008 |
| 598 | repair | src/components/liquid-grid/composables/liquidGridGLSetup.ts | — | — | BI.W-P008 |
| 599 | repair | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts | — | — | BI.W-P008 |
| 600 | repair | src/components/liquid-grid/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 601 | repair | src/components/liquid-grid/composables/useLiquidGrid.ts | — | — | BI.W-P008 |
| 602 | repair | src/components/liquid-grid/constants.ts | — | — | BI.W-P008 |
| 603 | repair | src/components/liquid-grid/index.ts | — | — | BI.W-P008 |
| 604 | repair | src/components/liquid-grid/LiquidGrid.vue | — | — | BI.W-P008 |
| 605 | repair | src/components/liquid-grid/README.md | — | — | BI.W-P008 |
| 606 | repair | src/components/liquid-grid/shaders/liquid-grid.glsl.ts | — | — | BI.W-P008 |
| 607 | repair | src/components/liquid-grid/shaders/liquid-grid.wgsl.ts | — | — | BI.W-P008 |
| 608 | repair | src/components/metric-badge/index.ts | — | — | BI.W-P008 |
| 609 | repair | src/components/metric-badge/MetricBadge.vue | — | — | BI.W-P008 |
| 610 | repair | src/components/metric-badge/README.md | — | — | BI.W-P008 |
| 611 | repair | src/components/metric-cell/index.ts | — | — | BI.W-P008 |
| 612 | repair | src/components/metric-cell/MetricCell.vue | — | — | BI.W-P008 |
| 613 | repair | src/components/metric-cell/README.md | — | — | BI.W-P008 |
| 614 | repair | src/components/metric-stack/index.ts | — | — | BI.W-P008 |
| 615 | repair | src/components/metric-stack/MetricRow.vue | — | — | BI.W-P008 |
| 616 | repair | src/components/metric-stack/MetricStack.vue | — | — | BI.W-P008 |
| 617 | repair | src/components/metric-stack/README.md | — | — | BI.W-P008 |
| 618 | repair | src/components/notification/index.ts | — | — | BI.W-P008 |
| 619 | repair | src/components/notification/Notification.vue | — | — | BI.W-P008 |
| 620 | repair | src/components/number-field/index.ts | — | — | BI.W-P008 |
| 621 | repair | src/components/number-field/NumberField.vue | — | — | BI.W-P008 |
| 622 | repair | src/components/number-field/NumberFieldContent.vue | — | — | BI.W-P008 |
| 623 | repair | src/components/number-field/NumberFieldDecrement.vue | — | — | BI.W-P008 |
| 624 | repair | src/components/number-field/NumberFieldIncrement.vue | — | — | BI.W-P008 |
| 625 | repair | src/components/number-field/NumberFieldInput.vue | — | — | BI.W-P008 |
| 626 | repair | src/components/pager-dots/composables/usePagerWorm.ts | — | — | BI.W-P008 |
| 627 | repair | src/components/pager-dots/constants.ts | — | — | BI.W-P008 |
| 628 | repair | src/components/pager-dots/index.ts | — | — | BI.W-P008 |
| 629 | repair | src/components/pager-dots/PagerDots.vue | — | — | BI.W-P008 |
| 630 | repair | src/components/pager-dots/pagerWindow.ts | — | — | BI.W-P008 |
| 631 | repair | src/components/pager-dots/README.md | — | — | BI.W-P008 |
| 632 | repair | src/components/paper-backdrop/index.ts | — | — | BI.W-P008 |
| 633 | repair | src/components/paper-backdrop/PaperBackdrop.vue | — | — | BI.W-P008 |
| 634 | repair | src/components/paper-backdrop/README.md | — | — | BI.W-P008 |
| 635 | repair | src/components/popover/index.ts | — | — | BI.W-P008 |
| 636 | repair | src/components/popover/Popover.vue | — | — | BI.W-P008 |
| 637 | repair | src/components/popover/PopoverContent.vue | — | — | BI.W-P008 |
| 638 | repair | src/components/popover/popoverContext.ts | — | — | BI.W-P008 |
| 639 | repair | src/components/popover/PopoverTrigger.vue | — | — | BI.W-P008 |
| 640 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 641 | repair | src/components/progress/index.ts | — | — | BI.W-P008 |
| 642 | repair | src/components/progress/Progress.vue | — | — | BI.W-P008 |
| 643 | repair | src/components/progress/ProgressDefault.vue | — | — | BI.W-P008 |
| 644 | repair | src/components/progress/ProgressGradient.vue | — | — | BI.W-P008 |
| 645 | repair | src/components/progress/ProgressLiquid.vue | — | — | BI.W-P008 |
| 646 | repair | src/components/progress/ProgressSectioned.vue | — | — | BI.W-P008 |
| 647 | repair | src/components/progress/useProgressGeometry.ts | — | — | BI.W-P008 |
| 648 | repair | src/components/pulse/index.ts | — | — | BI.W-P008 |
| 649 | repair | src/components/pulse/Pulse.vue | — | — | BI.W-P008 |
| 650 | repair | src/components/pulse/README.md | — | — | BI.W-P008 |
| 651 | repair | src/components/radio-group/index.ts | — | — | BI.W-P008 |
| 652 | repair | src/components/radio-group/RadioGroup.vue | — | — | BI.W-P008 |
| 653 | repair | src/components/radio-group/RadioGroupItem.vue | — | — | BI.W-P008 |
| 654 | repair | src/components/search/composables/fuzzySearchIndex.ts | — | — | BI.W-P008 |
| 655 | repair | src/components/search/composables/index.ts | — | — | BI.W-P008 |
| 656 | repair | src/components/search/composables/types.ts | — | — | BI.W-P008 |
| 657 | repair | src/components/search/composables/useFuzzySearch.ts | — | — | BI.W-P008 |
| 658 | repair | src/components/search/FuzzySearch.vue | — | — | BI.W-P008 |
| 659 | repair | src/components/search/index.ts | — | — | BI.W-P008 |
| 660 | repair | src/components/search/SearchBar.vue | — | — | BI.W-P008 |
| 661 | repair | src/components/search/searchVariants.ts | — | — | BI.W-P008 |
| 662 | repair | src/components/section/index.ts | — | — | BI.W-P008 |
| 663 | repair | src/components/section/Section.vue | — | — | BI.W-P008 |
| 664 | repair | src/components/select/index.ts | — | — | BI.W-P008 |
| 665 | repair | src/components/select/Select.vue | — | — | BI.W-P008 |
| 666 | repair | src/components/select/SelectContent.vue | — | — | BI.W-P008 |
| 667 | repair | src/components/select/SelectGroup.vue | — | — | BI.W-P008 |
| 668 | repair | src/components/select/SelectItem.vue | — | — | BI.W-P008 |
| 669 | repair | src/components/select/SelectLabel.vue | — | — | BI.W-P008 |
| 670 | repair | src/components/select/SelectScrollDownButton.vue | — | — | BI.W-P008 |
| 671 | repair | src/components/select/SelectScrollUpButton.vue | — | — | BI.W-P008 |
| 672 | repair | src/components/select/SelectSeparator.vue | — | — | BI.W-P008 |
| 673 | repair | src/components/select/SelectTrigger.vue | — | — | BI.W-P008 |
| 674 | repair | src/components/select/SelectValue.vue | — | — | BI.W-P008 |
| 675 | repair | src/components/separator/index.ts | — | — | BI.W-P008 |
| 676 | repair | src/components/separator/Separator.vue | — | — | BI.W-P008 |
| 677 | repair | src/components/skeleton/index.ts | — | — | BI.W-P008 |
| 678 | repair | src/components/skeleton/Skeleton.vue | — | — | BI.W-P008 |
| 679 | repair | src/components/slider/index.ts | — | — | BI.W-P008 |
| 680 | repair | src/components/slider/Slider.vue | — | — | BI.W-P008 |
| 681 | repair | src/components/sortable-list/composables/dragController.ts | — | — | BI.W-P007 |
| 682 | repair | src/components/sortable-list/composables/dropResolver.ts | — | — | BI.W-P007 |
| 683 | repair | src/components/sortable-list/composables/ghostRenderer.ts | — | — | BI.W-P007 |
| 684 | repair | src/components/sortable-list/composables/index.ts | — | — | BI.W-P007 |
| 685 | repair | src/components/sortable-list/composables/touchGate.ts | — | — | BI.W-P007 |
| 686 | repair | src/components/sortable-list/composables/transitionTiming.ts | — | — | BI.W-P007 |
| 687 | repair | src/components/sortable-list/composables/types.ts | — | — | BI.W-P007 |
| 688 | repair | src/components/sortable-list/composables/useSortable.ts | — | — | BI.W-P007 |
| 689 | repair | src/components/sortable-list/context.ts | — | — | BI.W-P007 |
| 690 | repair | src/components/sortable-list/index.ts | — | — | BI.W-P007 |
| 691 | repair | src/components/sortable-list/README.md | — | — | BI.W-P007 |
| 692 | repair | src/components/sortable-list/SortableHandle.vue | — | — | BI.W-P007 |
| 693 | repair | src/components/sortable-list/SortableItem.vue | — | — | BI.W-P007 |
| 694 | repair | src/components/sortable-list/SortableList.vue | — | — | BI.W-P007 |
| 695 | repair | src/components/spa-view/index.ts | — | — | BI.W-P008 |
| 696 | repair | src/components/spa-view/README.md | — | — | BI.W-P008 |
| 697 | repair | src/components/spa-view/SpaView.vue | — | — | BI.W-P008 |
| 698 | repair | src/components/split-chars/index.ts | — | — | BI.W-P008 |
| 699 | repair | src/components/split-chars/README.md | — | — | BI.W-P008 |
| 700 | repair | src/components/split-chars/SplitChars.vue | — | — | BI.W-P008 |
| 701 | repair | src/components/stacked-icons/index.ts | — | — | BI.W-P008 |
| 702 | repair | src/components/stacked-icons/README.md | — | — | BI.W-P008 |
| 703 | repair | src/components/stacked-icons/StackedIconGroup.vue | — | — | BI.W-P008 |
| 704 | repair | src/components/stacked-icons/types.ts | — | — | BI.W-P008 |
| 705 | repair | src/components/status-dot/index.ts | — | — | BI.W-P008 |
| 706 | repair | src/components/status-dot/README.md | — | — | BI.W-P008 |
| 707 | repair | src/components/status-dot/StatusDot.vue | — | — | BI.W-P008 |
| 708 | repair | src/components/surface/index.ts | — | — | BI.W-P008 |
| 709 | repair | src/components/surface/Surface.vue | — | — | BI.W-P008 |
| 710 | repair | src/components/switch/index.ts | — | — | BI.W-P008 |
| 711 | repair | src/components/switch/Switch.vue | — | — | BI.W-P008 |
| 712 | repair | src/components/table/index.ts | — | — | BI.W-P008 |
| 713 | repair | src/components/table/Table.vue | — | — | BI.W-P008 |
| 714 | repair | src/components/table/TableBody.vue | — | — | BI.W-P008 |
| 715 | repair | src/components/table/TableCaption.vue | — | — | BI.W-P008 |
| 716 | repair | src/components/table/TableCell.vue | — | — | BI.W-P008 |
| 717 | repair | src/components/table/TableEmpty.vue | — | — | BI.W-P008 |
| 718 | repair | src/components/table/TableHead.vue | — | — | BI.W-P008 |
| 719 | repair | src/components/table/TableHeader.vue | — | — | BI.W-P008 |
| 720 | repair | src/components/table/TableRow.vue | — | — | BI.W-P008 |
| 721 | repair | src/components/tabs/composables/useEyeglassLive.ts | — | — | BI.W-P008 |
| 722 | repair | src/components/tabs/composables/useTabDragMorph.ts | — | — | BI.W-P008 |
| 723 | repair | src/components/tabs/composables/useTabResponsive.ts | — | — | BI.W-P008 |
| 724 | repair | src/components/tabs/composables/useTabRovingFocus.ts | — | — | BI.W-P008 |
| 725 | repair | src/components/tabs/constants.ts | — | — | BI.W-P008 |
| 726 | repair | src/components/tabs/index.ts | — | — | BI.W-P008 |
| 727 | repair | src/components/tabs/README.md | — | — | BI.W-P008 |
| 728 | repair | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 729 | repair | src/components/tags-input/index.ts | — | — | BI.W-P008 |
| 730 | repair | src/components/tags-input/TagsInput.vue | — | — | BI.W-P008 |
| 731 | repair | src/components/tags-input/TagsInputInput.vue | — | — | BI.W-P008 |
| 732 | repair | src/components/tags-input/TagsInputItem.vue | — | — | BI.W-P008 |
| 733 | repair | src/components/tags-input/TagsInputItemDelete.vue | — | — | BI.W-P008 |
| 734 | repair | src/components/tags-input/TagsInputItemText.vue | — | — | BI.W-P008 |
| 735 | repair | src/components/textarea/index.ts | — | — | BI.W-P008 |
| 736 | repair | src/components/textarea/Textarea.vue | — | — | BI.W-P008 |
| 737 | repair | src/components/timeline/ContinuousMarkers.vue | — | — | BI.W-P008 |
| 738 | repair | src/components/timeline/ContinuousRail.vue | — | — | BI.W-P008 |
| 739 | repair | src/components/timeline/ContinuousTimeline.vue | — | — | BI.W-P008 |
| 740 | repair | src/components/timeline/geometry.ts | — | — | BI.W-P008 |
| 741 | repair | src/components/timeline/GlassTimeline.vue | — | — | BI.W-P008 |
| 742 | repair | src/components/timeline/index.ts | — | — | BI.W-P008 |
| 743 | repair | src/components/timeline/README.md | — | — | BI.W-P008 |
| 744 | repair | src/components/timeline/ScrubberTimeline.vue | — | — | BI.W-P008 |
| 745 | repair | src/components/timeline/SegmentedTimeline.vue | — | — | BI.W-P008 |
| 746 | repair | src/components/timeline/types.ts | — | — | BI.W-P008 |
| 747 | repair | src/components/toast/index.ts | — | — | BI.W-P008 |
| 748 | repair | src/components/toast/Toast.vue | — | — | BI.W-P008 |
| 749 | repair | src/components/toast/ToastAction.vue | — | — | BI.W-P008 |
| 750 | repair | src/components/toast/ToastClose.vue | — | — | BI.W-P008 |
| 751 | repair | src/components/toast/ToastDescription.vue | — | — | BI.W-P008 |
| 752 | repair | src/components/toast/Toaster.vue | — | — | BI.W-P008 |
| 753 | repair | src/components/toast/ToastTitle.vue | — | — | BI.W-P008 |
| 754 | repair | src/components/toast/use-toast.ts | — | — | BI.W-P008 |
| 755 | repair | src/components/toggle-group/index.ts | — | — | BI.W-P008 |
| 756 | repair | src/components/toggle-group/ToggleGroup.vue | — | — | BI.W-P008 |
| 757 | repair | src/components/toggle-group/toggleGroupContext.ts | — | — | BI.W-P008 |
| 758 | repair | src/components/toggle-group/ToggleGroupItem.vue | — | — | BI.W-P008 |
| 759 | repair | src/components/toggle/index.ts | — | — | BI.W-P008 |
| 760 | repair | src/components/toggle/Toggle.vue | — | — | BI.W-P008 |
| 761 | repair | src/components/tooltip/index.ts | — | — | BI.W-P008 |
| 762 | repair | src/components/tooltip/Tooltip.vue | — | — | BI.W-P008 |
| 763 | repair | src/components/tooltip/TooltipContent.vue | — | — | BI.W-P008 |
| 764 | repair | src/components/tooltip/TooltipProvider.vue | — | — | BI.W-P008 |
| 765 | repair | src/components/tooltip/TooltipTrigger.vue | — | — | BI.W-P008 |
| 766 | repair | src/components/typewriter/composables/index.ts | — | — | BI.W-P008 |
| 767 | repair | src/components/typewriter/composables/useTypewriter.ts | — | — | BI.W-P008 |
| 768 | repair | src/components/typewriter/index.ts | — | — | BI.W-P008 |
| 769 | repair | src/components/typewriter/types.ts | — | — | BI.W-P008 |
| 770 | repair | src/components/typewriter/TypewriterText.vue | — | — | BI.W-P008 |
| 771 | repair | src/components/typewriter/utils/keyboard.ts | — | — | BI.W-P008 |
| 772 | repair | src/components/typewriter/utils/pausePatterns.ts | — | — | BI.W-P008 |
| 773 | repair | src/components/typewriter/utils/timing.ts | — | — | BI.W-P008 |
| 774 | repair | src/components/typewriter/utils/typoStateMachine.ts | — | — | BI.W-P008 |
| 775 | repair | src/components/watercolor-dot/index.ts | — | — | BI.W-P008 |
| 776 | repair | src/components/watercolor-dot/prng.ts | — | — | BI.W-P008 |
| 777 | repair | src/components/watercolor-dot/useWatercolorBlob.ts | — | — | BI.W-P008 |
| 778 | repair | src/components/watercolor-dot/WatercolorDot.vue | — | — | BI.W-P008 |
| 779 | repair | src/composables/color/accent-tone-solve.ts | — | d79c1758322bb095bb231703b724e1ca43aceb26 | source base |
| 780 | repair | src/composables/color/index.ts | — | 50c3688ba72f56ad962941f88e3535a161827a10 | source base |
| 781 | repair | src/composables/color/spectrum-walk.ts | — | cfd59489e0d18b9bff928e69de4e6edb0cdaa026 | source base |
| 782 | repair | src/composables/color/useAccentTone.ts | — | 6fb5b033fd4763223fae17425331dae3c302c5dd | source base |
| 783 | repair | src/composables/context/createContext.ts | — | ec0a54b52bab69e9904fec8a36fe9504df79b2df | source base |
| 784 | repair | src/composables/context/index.ts | — | 34c264e4f0279b5ef1fa47ddbcbed62535895f56 | source base |
| 785 | repair | src/composables/dark/darkModeSyncScript.ts | — | 06a2c238edc09bacf7200085fa0f1d4f106991f1 | source base |
| 786 | repair | src/composables/dark/index.ts | — | a59b74e6de4b8e52b91969030ba667dfb19706db | source base |
| 787 | repair | src/composables/dark/installDarkModeSync.ts | — | c33b9e18f0cc714b2075a1a80b486c6ff8057817 | source base |
| 788 | repair | src/composables/dark/useGlobalDark.ts | — | 95526044fece57bd864c13cf97082330604d706d | source base |
| 789 | repair | src/composables/dom/index.ts | — | 6373a9d811282817966f2ec6c7eb2432d757e0eb | source base |
| 790 | repair | src/composables/dom/useBreakpoint.ts | — | 4bdab7c3e276a49f64efb9955fbd710bfe6d2d9c | source base |
| 791 | repair | src/composables/dom/useClipboard.ts | — | 42e0fa18328e9c85123bf40faf94692a2368b859 | source base |
| 792 | repair | src/composables/dom/useDocumentVisibility.ts | — | 4df07abe9a6e339a1d19a4564074eff5dccdf3e3 | source base |
| 793 | repair | src/composables/dom/useDragVelocity.ts | — | fae0e47276b1f15a8bef19271c829ff93bb98623 | source base |
| 794 | repair | src/composables/dom/useIdleReady.ts | — | a961ccf4530045be786c84742587ea3d7056ce7b | source base |
| 795 | repair | src/composables/dom/useResizeObserver.ts | — | 5d2737df433400a04a54348547c58f491cad69fb | source base |
| 796 | repair | src/composables/dom/useResolveTokenColor.ts | — | 07f5e36ba049bbcb2fb12634bd6e5b70f6f2e455 | source base |
| 797 | repair | src/composables/dom/useTokenColor.ts | — | 88b514b81e6091e46ef8cb0c11c5f6f458c4ce6e | source base |
| 798 | repair | src/composables/dom/useTouchGate.ts | — | 756e97f3f49c1512ec8d339dd47a9054c28de047 | source base |
| 799 | repair | src/composables/dom/useUserInvalidAria.ts | — | 09f551e245747f955595daf64d799e972e7fec79 | source base |
| 800 | repair | src/composables/dom/useViewportReady.ts | — | e44411dc9238514267771ed9553a5fb22ef28897 | source base |
| 801 | repair | src/composables/glass/ambientHueHistogram.ts | — | 92c767ec8f3d6a6d1fd29353045c0b4645454bad | source base |
| 802 | repair | src/composables/glass/backdropLuminanceSample.ts | — | 3e327f311faa8ab53681165e7cd7cf063b20c85f | source base |
| 803 | repair | src/composables/glass/backdropSampleMath.ts | — | 57497e2e22cf378119e40e34e5e8486dae16273a | source base |
| 804 | repair | src/composables/glass/canvas2d/index.ts | — | 3a9f176bdce15830981142fb9d5983049d2dd586 | source base |
| 805 | repair | src/composables/glass/canvas2d/resolveCanvasColor.ts | — | fb5d2f75f7502a2b0d894cb2f10f9d7087730494 | source base |
| 806 | repair | src/composables/glass/canvas2d/useCanvas2D.ts | — | e98f4246dd0f00c6c23253f1d5c5984f7f763268 | source base |
| 807 | repair | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 808 | repair | src/composables/glass/textureUpload.ts | — | 80f8f00f172e879ce04bf77158fa121e38c850b0 | source base |
| 809 | repair | src/composables/glass/useGlassBackdropLuminance.ts | — | 12151a231133ba70d8e0436fdfb20911c854c31a | source base |
| 810 | repair | src/composables/glass/useSpecularPointer.ts | — | a14019910975a5f28ca4736dd97dd42934fc9fd4 | source base |
| 811 | repair | src/composables/glass/useSpecularTracking.ts | — | 01f066c30062bdccb6583061e728dd45d8e60fd2 | source base |
| 812 | repair | src/composables/glass/vSpecular.ts | — | 85cb68a2334703507752c2998feda36dfcc4d56c | source base |
| 813 | repair | src/composables/glass/wave/index.ts | — | 47484c4b2688c5145533f591197ea8af715f5a5e | source base |
| 814 | repair | src/composables/glass/wave/waveField.glsl.ts | — | b409baa3b516ac90df3a9feb373b8704e09a75fd | source base |
| 815 | repair | src/composables/glass/wave/waveField.ts | — | 70fce50e2348af11b3526e787ff315ba11f62c4d | source base |
| 816 | repair | src/composables/glass/wave/waveField.wgsl.ts | — | 424e60e92d462f673fec790f40de4c53d90b170d | source base |
| 817 | repair | src/composables/glass/webgl/backingSize.ts | — | 5557af8fc5431c60e4453480f936a4ea83eec949 | source base |
| 818 | repair | src/composables/glass/webgl/compile.ts | — | 586ddefdf8c953c21fce4907510b6b6966085c2d | source base |
| 819 | repair | src/composables/glass/webgl/createCanvasLifecycle.ts | — | 06a2ae83fe8309bf7d42335488a689e99de43903 | source base |
| 820 | repair | src/composables/glass/webgl/shaders/flow.glsl.ts | — | 6d5ba6b66d453b21e6a1945b6cbfa560b584b5d8 | source base |
| 821 | repair | src/composables/glass/webgl/shaders/flow.wgsl.ts | — | 316a8152fca9a183a566965e606091ab2a2298fa | source base |
| 822 | repair | src/composables/glass/webgl/shaders/glass-refract.glsl.ts | — | 661d6430f6e1166d0e053e652ecbd84b0c1c101d | source base |
| 823 | repair | src/composables/glass/webgl/shaders/procedural-color.glsl.ts | — | b69cec45a95d498d3d03eedc580b4870f6e699a6 | source base |
| 824 | repair | src/composables/glass/webgl/useWebGLCanvas.ts | — | e6614e08dfb2a5104afe33eb07a0046fc0b62777 | source base |
| 825 | repair | src/composables/glass/webgl/visibility.ts | — | b1f5e5fd6a2beaed657031ecf6af40793a05feae | source base |
| 826 | repair | src/composables/glass/webgpu/glassShader.wgsl | — | b53c0d0b305fa40e8c973f4fa56f4118a4cb6c56 | source base |
| 827 | repair | src/composables/glass/webgpu/index.ts | — | ba02680ea91177d79964fa2a96875ecfd10d2422 | source base |
| 828 | repair | src/composables/glass/webgpu/useGpuSubstrate.ts | — | 50e6d5e382d5ad774377c3277ad666b5424fcbcd | source base |
| 829 | repair | src/composables/glass/webgpu/useWebGPUCanvas.ts | — | 44b6d570e621c80f2bf4f4fb319ff9ccdd15e06a | source base |
| 830 | repair | src/composables/glass/webgpu/webgpuCanvasTypes.ts | — | 59c057ee8e4197be8f2b30945e1ee4c4d9d372ab | source base |
| 831 | repair | src/composables/glass/webgpu/webgpuDevice.ts | — | 1acf4002bb1ac6b8263cb858b7ba6ec3dd11a719 | source base |
| 832 | repair | src/composables/index.ts | — | 36c594feac670ff7cd7afd700aa6d8e90c4860ac | source base |
| 833 | repair | src/composables/keyboard/index.ts | — | f3ccb2a6111e6ce6f770ec1dd1298750ae70edb6 | source base |
| 834 | repair | src/composables/keyboard/useKeyboardShortcuts.ts | — | 5147dfd788e4fbb9ceaad38d508a78a4fae1516e | source base |
| 835 | repair | src/composables/motion/bloomUpField.ts | — | c11a3d98e030f0918bc09b6b9d23c37e48b1c8cc | source base |
| 836 | repair | src/composables/motion/constants.ts | — | d5d04eb8a4a2cc03d98759dc7ef8a78630bb7f9f | source base |
| 837 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 838 | repair | src/composables/motion/core/writeVelocityWeight.ts | — | c6987e46bad64074b4b21c491179a4441e7f5515 | source base |
| 839 | repair | src/composables/motion/curves.ts | — | d0823817eb3a97512ec410c48f410ab0c580424c | source base |
| 840 | repair | src/composables/motion/gooBarbellGeometry.ts | — | 2058899e104cb7b0f3f06dad41754b3e80190207 | source base |
| 841 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 842 | repair | src/composables/motion/morphSignatures.ts | — | bd3085c3ef919f8c00d14bce0033b8ab157f40ee | source base |
| 843 | repair | src/composables/motion/motionTempo.ts | — | 6b3b8c742162eb4899be3b77df6d382ba9c3112b | source base |
| 844 | repair | src/composables/motion/pointerFieldMappings.ts | — | 4109208b147c0823e39f31324e7b5c6ea5e9ecd6 | source base |
| 845 | repair | src/composables/motion/README.md | — | 2afdb4f2b56ebd4823430ff2d440296ff2731733 | source base |
| 846 | repair | src/composables/motion/scrollReader.ts | — | 6efbc1b4b32516b9571c63c59a0ca5694972243b | source base |
| 847 | repair | src/composables/motion/springPresets.ts | — | 67c33531dbed67a2b7a172d16bf8213812f0a37c | source base |
| 848 | repair | src/composables/motion/suite.ts | — | 22525bab8bf45908aa8de473883143bb9b95883f | source base |
| 849 | repair | src/composables/motion/supportsCssTimeline.ts | — | 139436181337b0d91ad356e4cc4ceee49689778a | source base |
| 850 | repair | src/composables/motion/useAnimatedNumber.ts | — | bf3aa656ce11684a2d7ce3d908d19dc741205b6d | source base |
| 851 | repair | src/composables/motion/useAnimatedNumberMap.ts | — | d15b91398f8b8ebf0a00f87fcf9e2a8b6a5f3466 | source base |
| 852 | repair | src/composables/motion/useBloomUp.ts | — | 5b6528d4357819afab30efe397ba7b0d759bde15 | source base |
| 853 | repair | src/composables/motion/useCharStagger.ts | — | 5238e20760401b503b13535e0330939fd742b94c | source base |
| 854 | repair | src/composables/motion/useCountup.ts | — | 8fced7e9e5bf95d85cf2dae69fb748b45baae53e | source base |
| 855 | repair | src/composables/motion/useDockCtaReceive.ts | — | 9ad016d7a426f05133188f346ca18a26f38d1323 | source base |
| 856 | repair | src/composables/motion/useDragMorph.ts | — | f1e4b1f3c0e570c278d7929f7fc319ba5b72a80f | source base |
| 857 | repair | src/composables/motion/useElementMorph.ts | — | cdffcc2fd2fbac8c670eab931f946299adb35463 | source base |
| 858 | repair | src/composables/motion/useGooMorph.ts | — | bca98104d3b8c2a7fdf9071358b71d65b00bc5ae | source base |
| 859 | repair | src/composables/motion/useIntersectionPause.ts | — | 2c5da0c7f0d46678ecd11ab31690e2d838755fa1 | source base |
| 860 | repair | src/composables/motion/useLeadTrail.ts | — | 492e6149e8cb5146cf2ae8ba00ef2988117a755f | source base |
| 861 | repair | src/composables/motion/useLiquidFlex.ts | — | e3f6ca86fc2d8edf5df8f6989d424da6697fb512 | source base |
| 862 | repair | src/composables/motion/useLiquidPress.ts | — | 986bc0ac1dbe15a0e2f9c5833c1036fedc797606 | source base |
| 863 | repair | src/composables/motion/useLiquidReveal.ts | — | e0b07d8def7b5a2bb383845f1f96ceee663729f8 | source base |
| 864 | repair | src/composables/motion/useNumericTransition.ts | — | 3b0f52060d5c8e78c5e6a697e51412794d89e27b | source base |
| 865 | repair | src/composables/motion/usePointerVelocityField.ts | — | 48ff6c9563de5797f7431f2c4bb542a3360673d9 | source base |
| 866 | repair | src/composables/motion/usePrioritizedTask.ts | — | da55faaa1e432f14b6884e701b56e14048059c85 | source base |
| 867 | repair | src/composables/motion/useRAFLoop.ts | — | b78fb56ea89699694dcbb65debf3ec2233f2e4a7 | source base |
| 868 | repair | src/composables/motion/useRoutePointer.ts | — | 5ce142b544148877b2cba149f1c700b6e615d226 | source base |
| 869 | repair | src/composables/motion/useScrollChrome.ts | — | eaa32a4fb96d0fc0b281cc6e4b6128c6b0f55613 | source base |
| 870 | repair | src/composables/motion/useScrollPin.ts | — | 94e393c719f9ec5328448481276e86641a078abb | source base |
| 871 | repair | src/composables/motion/useScrollProgress.ts | — | 3e9b7b012db55b46012ad728d943caf900e46a75 | source base |
| 872 | repair | src/composables/motion/useScrollScene.ts | — | 44a929c513b92f9a030b28c6cc71a7bbff6ff3ee | source base |
| 873 | repair | src/composables/motion/useScrollTrigger.ts | — | 0d05d75097f9e31d32c603032cf6efb0e5f4142e | source base |
| 874 | repair | src/composables/motion/useSelectionGroup.ts | — | 0808a63f3719c2196de1be3ee39738e46afa1049 | source base |
| 875 | repair | src/composables/motion/useSelectionIndicator.ts | — | ddcb73a970cab55abe52d4a0dee65e06c2185ebc | source base |
| 876 | repair | src/composables/motion/useSpring.ts | — | 73092bbc5bd6b12f0c13a37886551e9fc5b8a871 | source base |
| 877 | repair | src/composables/motion/useSpringMount.ts | — | 4a62de1fc2d424cc31dd6d4c60899e914fa25d86 | source base |
| 878 | repair | src/composables/motion/useSpringPress.ts | — | a44c23fe34aaa42bbf30f35f882925b501bc05a3 | source base |
| 879 | repair | src/composables/motion/useStagger.ts | — | 5a2264e076653ab79c9d47d9e5b04ea1daf32ba8 | source base |
| 880 | repair | src/composables/motion/useStaggerReveal.ts | — | 270369b8d5817855df8c2a6bcb1a0c058ecd84ac | source base |
| 881 | repair | src/composables/motion/useTextHighlight.ts | — | 1390473cd2bb08819c71a25aa8306e5696976451 | source base |
| 882 | repair | src/composables/motion/useViewTransition.ts | — | e0dea38a9178c18a1396f946a7fdd04310c098f8 | source base |
| 883 | repair | src/composables/motion/useYieldToMain.ts | — | 40d547368a6e3eb57e6a0d4a14e54ba5c944c507 | source base |
| 884 | repair | src/composables/motion/vReveal.ts | — | 9055a6874d3280a81c505fe170063701c666d49b | source base |
| 885 | repair | src/composables/reactive/index.ts | — | b6b231f978db6f87bafaf97493d2995dd86e39a8 | source base |
| 886 | repair | src/composables/reactive/useInterval.ts | — | 5814b43b5b020c45b4519bc2a61aad7e48b40e35 | source base |
| 887 | repair | src/composables/reactive/useTimer.ts | — | 30b9fc2b0078a483ac77e0b5e219ad94c79b5c7b | source base |
| 888 | repair | src/composables/sidebar/index.ts | — | c2ed3d3f6431dcba004147da0b08993e35ad9c66 | source base |
| 889 | repair | src/composables/sidebar/types.ts | — | 076ce0e32d9aa67ffcd92a081d1262a507b3ceba | source base |
| 890 | repair | src/composables/sidebar/useClickDelegate.ts | — | eee36f2f0cd83ddd6d278ffa875ad32a4226d9d4 | source base |
| 891 | repair | src/composables/sidebar/useLazyLoader.ts | — | f5730e3151667465d5626c0082495c37b22b0a1f | source base |
| 892 | repair | src/composables/sidebar/useScrollTo.ts | — | d4c987073e0a1eac215bb3fba89078aef671eafb | source base |
| 893 | repair | src/composables/sidebar/useScrollTracker.ts | — | 326d8c871c6ff733f4888b60fa985ddd4f0d910a | source base |
| 894 | repair | src/composables/sidebar/useSidebarFollow.ts | — | 1ee7fd89620aaf9854875c2f9de8c1345f9d090c | source base |
| 895 | repair | src/composables/sidebar/useSidebarState.ts | — | f33701e87940228c00f1611154b03bdc52fe8825 | source base |
| 896 | repair | src/composables/sidebar/useTreeIndex.ts | — | 4aa738681d545cd3f9c135601c58dddc5e3415c6 | source base |
| 897 | repair | src/composables/virtual/index.ts | — | da20fb9d9abb350bb85a16c543104200c7484a77 | source base |
| 898 | repair | src/composables/virtual/useVirtualSectionWindow.ts | — | e287ce517d483df6ea5d21e7fd8dc15d84a5c1d7 | source base |
| 899 | repair | src/composables/virtual/useWindowedStore.ts | — | bcda77d442625662210fa2a857e6380e4ca83577 | source base |
| 900 | repair | src/composables/virtual/virtualSectionLayout.ts | — | 531c96d53f5de9e00c9399aeef8d26df72d7144d | source base |
| 901 | delete | src/dark.ts | — | 1342dbde7a443ccbf2003cd25f91274d888e32a5 | source base |
| 902 | repair | src/fonts/fira-code/fira-code-latin-ext.woff2 | — | eac15ae2503647f12c2d291bafbbc23828a00e16 | source base |
| 903 | repair | src/fonts/fira-code/fira-code-latin.woff2 | — | ed70084f325626a627a13f8c37af71e798dd6efe | source base |
| 904 | repair | src/fonts/fira-code/OFL.txt | — | 805e0b38b5cfbf78c7269d42ef7096699eec6559 | source base |
| 905 | repair | src/fonts/plus-jakarta-sans/OFL.txt | — | ea69b0ca12a02556c436680ea0a159efb7a748fa | source base |
| 906 | repair | src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin-ext.woff2 | — | f82597ce4a5f5478b12b9213cc446aabdae73b0d | source base |
| 907 | repair | src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin.woff2 | — | a180dc40f205fc48979a75ccbe8a10221a71a4ba | source base |
| 908 | repair | src/fonts/README.md | — | 8781486afac685bcead657234072a245f5a98211 | source base |
| 909 | repair | src/forms.ts | — | 4955d3c3fa9784e7f0b13fb446b61b70a53fa14f | source base |
| 910 | repair | src/html-attributes.d.ts | — | a33346edb04d9a0ac20b477b428e635e2e1c4f8a | source base |
| 911 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 912 | delete | src/infinite-scroll.ts | — | 11475436093c5465f92ad17c91e2f4e0578cb3d8 | source base |
| 913 | delete | src/keyboard.ts | — | 25b8db19460c18d08b965cad891b01f87955a92d | source base |
| 914 | delete | src/motion-core.ts | — | 2bce474e4ad1cdd6b964041768bd7a2d61985a32 | source base |
| 915 | delete | src/motion.ts | — | 4d24e9143ace33771091ca49f8f5b9c7fff2f640 | source base |
| 916 | delete | src/sidebar.ts | — | 43d17d04882fbaceffae60a41a74c58ecfeba0d4 | source base |
| 917 | repair | src/styles/animations.css | — | 74791f2e0ed4e8b8d56c717f2da2180dc3952c56 | source base |
| 918 | repair | src/styles/border-progress.css | — | 2f43dde09504bcecb92655b8950e2315b10680ef | source base |
| 919 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 920 | repair | src/styles/cards.css | — | 5f90bdc6ab6ffc4df27022da5ab56defc2320e32 | source base |
| 921 | repair | src/styles/completion-seal.css | — | 60491778dc7fdc68bf7ce95a976c8633d3022adb | source base |
| 922 | repair | src/styles/configurator.css | — | 251d50ff9b2ec84111ce2949a0fe6e53190f73ad | source base |
| 923 | repair | src/styles/dialog-placement.css | — | d10e5955e001e14191a66ed87018442c54d2ee46 | source base |
| 924 | repair | src/styles/dock-controls.css | — | 892dba3b514be6bd6b8aa3b12028ae16f5035886 | source base |
| 925 | repair | src/styles/dock-controls/dark-mode-toggle.css | — | 5fbc619e31c5f3b4da06579263f621a286135f50 | source base |
| 926 | repair | src/styles/dock-controls/icon-button.css | — | 0f9126bd8a22b598c79046410fd83f64f02ec3a0 | source base |
| 927 | repair | src/styles/dock-controls/tab-button.css | — | 912bace2d0d359b7570080fa08ba524cfbb42f4d | source base |
| 928 | repair | src/styles/dock-controls/touch-floor.css | — | d9eb7500b2008e86ade95a8d61fe255993b1722c | source base |
| 929 | repair | src/styles/dock-controls/triggers.css | — | 07a870beb2ac348343c7309203adef7d43abdded | source base |
| 930 | repair | src/styles/dock.css | — | 48500f263d1a0041be31ac998b53f86fab9ed2fb | source base |
| 931 | repair | src/styles/dock/adaptive-legibility.css | — | f4854e66920f232e6eb9fd5176b89a732148399f | source base |
| 932 | repair | src/styles/dock/crossfade.css | — | 5ba361dc5303a4414d4c6e92baa61328f063bbb7 | source base |
| 933 | repair | src/styles/dock/cta-seat.css | — | c19816efff5f556f112a4091e9e784d57c3902e8 | source base |
| 934 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 935 | repair | src/styles/dock/dock.css | — | 83e358cc6e6d382a9c84f136972fe522470ea11c | source base |
| 936 | repair | src/styles/dock/fisheye.css | — | 1c346c4a7948f3d6da886ad7d50161160489f785 | source base |
| 937 | repair | src/styles/dock/layer-group.css | — | 9a74c7d5f58ab2519771ebf8ab6994dbe6327dfd | source base |
| 938 | repair | src/styles/dock/layers.css | — | 0c915d1d614a7b450020ba281acc18e798898d86 | source base |
| 939 | repair | src/styles/dock/morph.css | — | 66e6c079aded40032cd2da310ca8284a592f3ec1 | source base |
| 940 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 941 | repair | src/styles/dock/popover.css | — | 5f9899bc157e13c39c460008bba052ba38bc5b78 | source base |
| 942 | repair | src/styles/dock/search.css | — | e2d2658c4119e5d6ea65fbc95480d9b95b49581c | source base |
| 943 | repair | src/styles/dock/section.css | — | 381e3ffae1d08c0bdd4664d78fcd493043bff14c | source base |
| 944 | repair | src/styles/dock/shape.css | — | 373e9d2f02d923d0c802de9059d50cc4e5f03e70 | source base |
| 945 | repair | src/styles/dock/shell-regions.css | — | e722ea40759f97036887c2e63a4b517858551609 | source base |
| 946 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 947 | repair | src/styles/draw-in.css | — | 1f845c43cfd1beec3a9fa7177857ff81cf29c704 | source base |
| 948 | repair | src/styles/drawer.css | — | 9c49e90f5591f31b54bd511eb161f4dada359928 | source base |
| 949 | repair | src/styles/feedback-tone.css | — | e90895f604c82965e689083aaa08e7dcb1d1642b | source base |
| 950 | repair | src/styles/fonts.css | — | 65e7cb7241aa36ca5262ff61fc6b6c2410871ead | source base |
| 951 | repair | src/styles/glass-refract.css | — | 503b21d79f89d34f6c624bf43c6f9bfdd463243c | source base |
| 952 | repair | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 953 | repair | src/styles/glass.css | — | cdcb5f277c6f9cfea04abf76cc3a6cebfad1904e | source base |
| 954 | repair | src/styles/glass/a11y-fallback.css | — | c6bf39491d993644c8abeff837db5ace5225ca79 | source base |
| 955 | repair | src/styles/glass/accent-tone.css | — | a3b375be285ae44c17e16087551f1d36eec3ea36 | source base |
| 956 | repair | src/styles/glass/control-surfaces.css | — | 2db5c477d919ee795d0a5b7d212cf39f835fdb85 | source base |
| 957 | repair | src/styles/glass/deep.css | — | 83468cc7580027c2481ccb9193360e7fe6949a50 | source base |
| 958 | repair | src/styles/glass/defined.css | — | d8cd8460f4965fe1b3736a457aa4fa8b23e1fdbe | source base |
| 959 | repair | src/styles/glass/glass-atom.css | — | 23cce66348e3eb0c7a5219f81110570646c54491 | source base |
| 960 | repair | src/styles/glass/glass-capsule.css | — | e4b8752455d971311dc67b82a7b531a2baa4073e | source base |
| 961 | repair | src/styles/glass/glass-chip.css | — | 78c37cea99d056fcfd8ed0219a094325645f9c53 | source base |
| 962 | repair | src/styles/glass/grain-overlay.css | — | a6ccc7a3f69f9be0f9de15e254eb6016611c9df5 | source base |
| 963 | repair | src/styles/glass/ladder-undershadow.css | — | a00d643179a4abec099edc5178ca5d71d173b7a1 | source base |
| 964 | repair | src/styles/glass/ladder.css | — | 2b65407c1d361a0edfcde6703c4734dabbc020db | source base |
| 965 | repair | src/styles/glass/liquid-enter.css | — | 49d182d37feebca6ab412a037bdd221eea71146f | source base |
| 966 | repair | src/styles/glass/liquid-fill.css | — | a87e87acb1f208806d94d4aacbff2cf845e1285c | source base |
| 967 | repair | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 968 | repair | src/styles/glass/progress-rail.css | — | 02f64c4cb98bf7667c4151a0d7012a5eb5c6d34f | source base |
| 969 | repair | src/styles/glass/reveal.css | — | a32836b1ee395accfb63cfd3477fba329d486b9c | source base |
| 970 | repair | src/styles/glass/rim.css | — | 7bc5038ea6041aa7421ca3e35a8a11db0ca38e55 | source base |
| 971 | repair | src/styles/glass/squircle.css | — | 569730e4a98a6a49e40c590bb553e063b4509cea | source base |
| 972 | repair | src/styles/glass/surface-axis.css | — | 5570ec55144da937de524b9808652227af827dfb | source base |
| 973 | repair | src/styles/glass/surfaces-pager.css | — | 2b9ec169731026dbe41123f3ad1b8337e214a3d9 | source base |
| 974 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 975 | repair | src/styles/icon-chip.css | — | 207ddee8a8c3bd4ca7446defb9cb7288e63f0148 | source base |
| 976 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 977 | repair | src/styles/instrument-chassis.css | — | 74f1d80cd4db15c2cdd7a49b5eb90cd03d6493e2 | source base |
| 978 | repair | src/styles/menu.css | — | b857356e839255ecff703eb38e8368445e7c8598 | source base |
| 979 | repair | src/styles/paper.css | — | 0c18d49faaaa9d6c98b8f1195f876c14c961d3d0 | source base |
| 980 | repair | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 981 | repair | src/styles/scroll-chrome.css | — | 3b175f8939c22a00c6ea0bbc298e34ac6b3d7273 | source base |
| 982 | repair | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 983 | repair | src/styles/segmented-tabs.css | — | 3139afb08242087d5b853acc54713acda9fd18c0 | source base |
| 984 | repair | src/styles/select.css | — | 4d78552ece9bcaa1a500ef9b2c7db80a4500ef47 | source base |
| 985 | repair | src/styles/tabs/segmented-tabs-drag.css | — | 6c50427c9d299238b4ab086ffdf977820d31a9b8 | source base |
| 986 | repair | src/styles/theme.css | — | 7f77e670edffad3948c77f89e58d4a6d5769f91a | source base |
| 987 | repair | src/styles/theme/bridges.css | — | 3ba96c25d80207be2c068037f267cce934835997 | source base |
| 988 | repair | src/styles/theme/dark.css | — | a97560933c093ca5248ff5db982b9c376e64cd27 | source base |
| 989 | repair | src/styles/theme/literals.css | — | 552cab919166035c740c3bcd92d40fbd471c49f5 | source base |
| 990 | repair | src/styles/theme/radius.css | — | cb3901257cbeeec78182199bdf7abc145b655132 | source base |
| 991 | repair | src/styles/tokens.css | — | 5194cd72e66628a48dda4b45c447a723893b86bf | source base |
| 992 | repair | src/styles/tokens/color-radius.css | — | 39abb72a24aa29eeac358f0a2c2cc3eee480aea9 | source base |
| 993 | repair | src/styles/tokens/dark-arm-glass.css | — | 4b471daf200330334464e24865631dc9ba0be2d2 | source base |
| 994 | repair | src/styles/tokens/dark-arm.css | — | e776b8ded03aeadd57fc3ceea0c86f06dc2dd7e4 | source base |
| 995 | repair | src/styles/tokens/glass-deep.css | — | cf405ca85c204eb146687458a86559fa0385f352 | source base |
| 996 | repair | src/styles/tokens/glass-fx.css | — | e20e236bcd7b013bc41ecd3ca45e77fdbbd17edb | source base |
| 997 | repair | src/styles/tokens/glass.css | — | 5c09fd47c15544fb9e5d89202f0ef99c48208e1f | source base |
| 998 | repair | src/styles/tokens/light-dark.css | — | b23e6baa9e9e4bfb44c26a0cf41c634823b228df | source base |
| 999 | repair | src/styles/tokens/motion-registers.css | — | 1da1345f11e6ae0fff495540ae9a2b5ef574997a | source base |
| 1000 | repair | src/styles/tokens/offsets.css | — | 4f42a96aa25112af9b9ffe57b998a156a777cd6b | source base |
| 1001 | repair | src/styles/tokens/on-glass-fg.css | — | ba1782dbf7bde52725a3219a332676f49e4e78a6 | source base |
| 1002 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 1003 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 1004 | repair | src/styles/tokens/scale-paper.css | — | 22c3dbd40b171fb27aea58b56dc6a42d98c36f19 | source base |
| 1005 | repair | src/styles/tokens/scheme-motion.css | — | 6ecd8522a29347e308e2db8c6ae1810de3d6d84c | source base |
| 1006 | repair | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 1007 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 1008 | repair | src/styles/tokens/shadow.css | — | 021c5321af39c05176a8f697d08ac3678a42902a | source base |
| 1009 | repair | src/styles/tokens/sizing-config.css | — | 13f28e1a3345829223193904a38c3bf49be904e2 | source base |
| 1010 | repair | src/styles/tokens/sizing.css | — | 5533cc15289a1eb49d904b8d6ebb73e9c32abb88 | source base |
| 1011 | repair | src/styles/transitions.css | — | ff60e1b4e192a5ecb06479f9582c5e52bbf15c63 | source base |
| 1012 | repair | src/styles/typography.css | — | 78204d4626f1bbe7cb1490184fad019d5c4d7de8 | source base |
| 1013 | repair | src/styles/typography/scale.css | — | 60aa59d15c74d55f0a814760d77ca624960a6f0b | source base |
| 1014 | repair | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 1015 | repair | src/styles/typography/utilities.css | — | 4415aa88142764007bb0e7fa998be59d5ea0cfb4 | source base |
| 1016 | repair | src/styles/utilities.css | — | 1de6b90c29c15fcba50c8595cd2932f37f80d7b6 | source base |
| 1017 | repair | src/styles/utilities/a11y-overrides.css | — | dd89b1d7c21f30807080f0627cac012698b3ce9c | source base |
| 1018 | repair | src/styles/utilities/animate.css | — | 0c6a4aa2a584c1732b9c3c512f79d9901ef479ac | source base |
| 1019 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 1020 | repair | src/styles/utilities/base.css | — | e9533d6b79fe947214f0b7580aae5a6f4de0bbfb | source base |
| 1021 | repair | src/styles/utilities/btn.css | — | fec2e900e2ede466be467d9c4768067751f00d69 | source base |
| 1022 | repair | src/styles/utilities/components.css | — | 79fdb388d65dbd43fc11a706d0ec7b0a9909445d | source base |
| 1023 | repair | src/styles/utilities/metal.css | — | da9b6ae944b06e610269fc568f41201ee1c67da6 | source base |
| 1024 | repair | src/styles/view-transition.css | — | fc0af7fbfd5ad5dbf2d76576f7a4409e8207adbf | source base |
| 1025 | repair | src/styles/viz-reveal.css | — | 50809db823fb350416cdccd1dcdea63c98e7c52e | source base |
| 1026 | repair | src/subpaths/animated-digit.ts | — | 848f4cfe9208c2eb22cd8dde4b1542b0b2ad50a1 | source base |
| 1027 | repair | src/subpaths/aurora.ts | — | c6c03076597e850611134f420b9e50c8fc00344f | source base |
| 1028 | repair | src/subpaths/badge.ts | — | 63f2c2a585fd0e8bca2e74ab32609eb59b4d9cd7 | source base |
| 1029 | repair | src/subpaths/blob-config.ts | — | 99bca3465c5d8bdca0e7638bf9e89e18e99ec96c | source base |
| 1030 | repair | src/subpaths/blob.ts | — | 9272a912f8ebad16dcbbc282686ad8d16a66c0c8 | source base |
| 1031 | repair | src/subpaths/button.ts | — | 41ed89907d3396c5082be9465938c368d09ec08b | source base |
| 1032 | repair | src/subpaths/canvas.ts | — | 7a6c20b5a9239e3845d05af8ab59d7eff0e48cb5 | source base |
| 1033 | repair | src/subpaths/card.ts | — | b2590a704361a5f7579d0538c23d2f3c16edcb22 | source base |
| 1034 | repair | src/subpaths/chip.ts | — | 225226c8e3a314f7baedd3eb565bb8ea2936b834 | source base |
| 1035 | repair | src/subpaths/collapsible.ts | — | 618a3e2b5df37677129aba45449fb931183ba228 | source base |
| 1036 | repair | src/subpaths/color-swatch.ts | — | 10d34220cc949c2e7e57448cda492725e5cccb9e | source base |
| 1037 | repair | src/subpaths/color.ts | — | ba3de0188a650026490342281580a5adc82bc37c | source base |
| 1038 | repair | src/subpaths/command.ts | — | 9167f39e6890a4e1642af6dd5571caae32105479 | source base |
| 1039 | repair | src/subpaths/completion-seal.ts | — | bd2db1fe3a1b84e722336134bf91ae200f9d32cc | source base |
| 1040 | repair | src/subpaths/configurator.ts | — | 4badf06721af4c0732d3fe08f7c0424bb42d2b1a | source base |
| 1041 | repair | src/subpaths/constellation.ts | — | 6381d83abc8d5fa5047fb5a1aa8603033ca371b7 | source base |
| 1042 | repair | src/subpaths/controls.ts | — | 9ea9bdc5b27e2b31c8f3c0e673108169bd74f910 | source base |
| 1043 | repair | src/subpaths/data-table.ts | — | d9705afdb5e412cfd1c8e4e5c01b884fabfb7d4d | source base |
| 1044 | repair | src/subpaths/deck.ts | — | 46e206f13f6943a2135e7ddebba79a22f7ed022d | source base |
| 1045 | repair | src/subpaths/dialog.ts | — | 742850bdeb876da81e12d478a057c06590d2b6ac | source base |
| 1046 | repair | src/subpaths/dock.ts | — | 444b9863206c8990a652d5f500b745e5aec9acf2 | source base |
| 1047 | repair | src/subpaths/dom.ts | — | fc7d93c2da41a750cb2776f2fb770913b81eca3e | source base |
| 1048 | repair | src/subpaths/drawer.ts | — | a5951edb1362da6606cb5a8e1d24cc459ae8ced2 | source base |
| 1049 | repair | src/subpaths/dropdown-menu.ts | — | 40a230d20909814770de6837569662f5637fef75 | source base |
| 1050 | repair | src/subpaths/easing.ts | — | 2a3394cce944db69710f3fcbadc3124ab3250a91 | source base |
| 1051 | repair | src/subpaths/expandable-container.ts | — | 42b88c0b50ef3153fbd103d91eb0a5101805e2e4 | source base |
| 1052 | repair | src/subpaths/fading-scroll.ts | — | a0638a9dd8b4e5a87280dc5924e26be3ce251446 | source base |
| 1053 | repair | src/subpaths/focus-scope.ts | — | 7f4f9d6b02dd6d65a8fbd08275b8dea2c548f8b5 | source base |
| 1054 | repair | src/subpaths/fourier-field.ts | — | e05f9854db316e333be54d855b7be7137b923ab9 | source base |
| 1055 | repair | src/subpaths/fourier-math.ts | — | 29bce816d968d96e570aab7ef5bcd8cf7ea162f2 | source base |
| 1056 | repair | src/subpaths/handmark.ts | — | 9e9940a92b68da37ba5f22a83805b217f1222bfc | source base |
| 1057 | repair | src/subpaths/header-ribbon.ts | — | 33c6084a7c290d3ad8b97efbda637a416988e1c3 | source base |
| 1058 | repair | src/subpaths/icon-chip.ts | — | 2d7ab9af1441368eed14077a27fca523d9cbf383 | source base |
| 1059 | repair | src/subpaths/icon-tooltip.ts | — | 3dac3b856997908cac9b71da5a9e870121d43875 | source base |
| 1060 | repair | src/subpaths/instrument-chassis.ts | — | 10ec4e799cd750e4a412024178cf61824c7cc9c4 | source base |
| 1061 | repair | src/subpaths/label.ts | — | 80dd5fe04fe44ed3f47417d4a0c83453472eea87 | source base |
| 1062 | repair | src/subpaths/labeled-field.ts | — | c81ba27ebc4cdb099f7403505eee0734a109ca04 | source base |
| 1063 | repair | src/subpaths/liquid-grid.ts | — | 62167b0b126681a709cd33da2033c8e04c0b5099 | source base |
| 1064 | repair | src/subpaths/metric-badge.ts | — | 3b096e2f13a8eb059c92e18ba50c7bc83c3f8f5c | source base |
| 1065 | repair | src/subpaths/metric-cell.ts | — | cf49c273877dd36cdb2bb916606290c97b973fdf | source base |
| 1066 | repair | src/subpaths/metric-stack.ts | — | 6d9dd1c934f45a828cbe0bbcbd5e13ac089d08db | source base |
| 1067 | repair | src/subpaths/motion-curves.ts | — | d087ee37dbb3f2267209c67c3f79629af160541f | source base |
| 1068 | repair | src/subpaths/notification.ts | — | 2b1caf4d5de7078e49879591f6b3d826d47b759c | source base |
| 1069 | repair | src/subpaths/number-field.ts | — | 44bada1549be72eaf7cb2af6cb9f025e9b5ffcb6 | source base |
| 1070 | repair | src/subpaths/pager-dots.ts | — | ebaf0bcce5c747cec3a7b81285eabff4c55a89ad | source base |
| 1071 | repair | src/subpaths/paper-backdrop.ts | — | aa4fc4f16bf0971c55986a67ef71e144b088b5bf | source base |
| 1072 | repair | src/subpaths/popover.ts | — | 3cf63111a5a30faf5e87d16fb801286c080ffc97 | source base |
| 1073 | repair | src/subpaths/progress.ts | — | 887c2469176ecf5ff5cc2970acba30e7d83e9a1d | source base |
| 1074 | repair | src/subpaths/pulse.ts | — | 909b4c0895141864318ad35672071780f983794c | source base |
| 1075 | repair | src/subpaths/reactive.ts | — | f25f5334a9af6ca558fea84e657f44892563b589 | source base |
| 1076 | repair | src/subpaths/search.ts | — | c30a40fddfe8fd36f7b6be4d629a2cf230ad8a4a | source base |
| 1077 | repair | src/subpaths/select.ts | — | 6275fcb63a4f2ebe6beafd6577d98653d43e6f28 | source base |
| 1078 | repair | src/subpaths/separator.ts | — | c6997658eec7ce26d91bbdbd86be304eb680e8f8 | source base |
| 1079 | repair | src/subpaths/slider.ts | — | d144438c5d626c3aa491e5491897553320b65388 | source base |
| 1080 | repair | src/subpaths/sortable-list.ts | — | eb0efa74485731dd69c2319d90674220bf0acb29 | source base |
| 1081 | repair | src/subpaths/spa-view.ts | — | 1cca5d5b5b3ac79a19ab37d0e09f38c87fd86d5f | source base |
| 1082 | repair | src/subpaths/stacked-icons.ts | — | 9f5490966f6d44e64e578c157756f8359a860654 | source base |
| 1083 | repair | src/subpaths/status-dot.ts | — | eba25ba4ee99ea655a92fd8bfcdb02c143de7a3a | source base |
| 1084 | repair | src/subpaths/surface.ts | — | 92a9fccee189d4dd63db59e293ce5671202793b5 | source base |
| 1085 | repair | src/subpaths/switch.ts | — | 7898d01f1593b0a1a1adbe671b85329acddf1e83 | source base |
| 1086 | repair | src/subpaths/tabs.ts | — | c5f525eba83ddc75d359ed3a8e5d09cb93db93d9 | source base |
| 1087 | repair | src/subpaths/timeline.ts | — | c33abf1826ab06973ea7848bccb90bdc74dd45a0 | source base |
| 1088 | repair | src/subpaths/toast.ts | — | 38b49ad0f6e20d8ec2f8df43ec0726776723b5d8 | source base |
| 1089 | repair | src/subpaths/toggle-group.ts | — | c826984e58f0497b8eeaa0ab54c7cc6ed4e6d11b | source base |
| 1090 | repair | src/subpaths/tooltip.ts | — | 3db7bb5ecc5b4bd4e0df6859bbef6648892500d5 | source base |
| 1091 | repair | src/subpaths/typewriter.ts | — | b7f8a157122d467a230fb14def37941dbc8fb326 | source base |
| 1092 | repair | src/subpaths/watercolor-dot.ts | — | b3c08013744288dfed329041f513dc56e37449c8 | source base |
| 1093 | rename | src/tokens.ts | src/styles/tokens.ts | 0880a6555e95b80e00d816f7eb723573bc9703aa | source base |
| 1094 | repair | tests-visual/_aur-vangogh-harness.html | — | 7296713262f4fa2deca1c75e20d1730133aa1f22 | source base |
| 1095 | repair | tests-visual/_aur-vangogh-harness.ts | — | 11b894edbdf02e9e33270dc03bcc8afa3790ba9a | source base |
| 1096 | repair | tests-visual/_cfg-readback.spec.ts | — | b4828c36ad7bd45767c10b1d29cfd332bc8c954b | source base |
| 1097 | repair | tests-visual/_cohere-capture.spec.ts | — | 023efab8ce504a89f9f8bbaf72c41a5e1ecd1af5 | source base |
| 1098 | repair | tests-visual/_cohere-debug.spec.ts | — | 40f2a8d8c05d836262c14b46c408b5a103011df3 | source base |
| 1099 | repair | tests-visual/_cohere-shadow-debug.spec.ts | — | 02526e5fa95f3c19ca003077267ccd292d316d95 | source base |
| 1100 | repair | tests-visual/_dock-context-capture.spec.ts | — | b5945bacfbcf1c85f806a449e939951b02d40f3e | source base |
| 1101 | repair | tests-visual/_egg-capture.spec.ts | — | 28993d07c7706941b62b79f8e855b37308891d15 | source base |
| 1102 | repair | tests-visual/_fix-glassui-dark-capture.spec.ts | — | 333eca338a3c32cd6fc74b66f5757a6c61abbec3 | source base |
| 1103 | repair | tests-visual/_metric-zero-capture.spec.ts | — | 392d9e98ffef0d3910bc57a25eaff9165d9158df | source base |
| 1104 | repair | tests-visual/_prim-polish-capture.spec.ts | — | d9720ad14e22c85124b1ed9680060ccd0cc86eae | source base |
| 1105 | repair | tests-visual/_r4-shell-config-capture.spec.ts | — | 3e38aadc5c18aa0ad996fb5e1c92ce344535091f | source base |
| 1106 | repair | tests-visual/_sb-stage-capture.spec.ts | — | b5ecfa66db4cb0b9e6500e314fe4d8b3341da9fe | source base |
| 1107 | repair | tests-visual/_sb1-capture.spec.ts | — | 819af37be9894fdabe7fcb77ce7deb20bcb72497 | source base |
| 1108 | repair | tests-visual/_veil-capture.spec.ts | — | bb9c521576107891b0dd969017af3ecceb134f20 | source base |
| 1109 | repair | tests-visual/_wdelta0-capture.spec.ts | — | 5ff9ab6945ef5121602d31bf9ec89ee71acccfc0 | source base |
| 1110 | repair | tests-visual/.gitignore | — | 0df4d60a5e0bc09cc43df92de3261584b589f883 | source base |
| 1111 | repair | tests-visual/a11y-slider.spec.ts | — | c341b084d8724efbd6af4c488c3fee1d475560e6 | source base |
| 1112 | repair | tests-visual/a11y-splitchars.spec.ts | — | 670ba03f72736efeb13492447fc17e3dad5707b6 | source base |
| 1113 | repair | tests-visual/adaptive-glass-live.spec.ts | — | d89ce7c74d40adf5b29e6b5ab93b287d9ab068cc | source base |
| 1114 | repair | tests-visual/adaptive-glass.spec.ts | — | 0be3d7ce9e9200523796ae5f8bcb00b3728ca1b5 | source base |
| 1115 | repair | tests-visual/affordance-contrast-gold.spec.ts | — | 0e48ade6e95bbcb26ad6404a1ec6d435d791cbd1 | source base |
| 1116 | repair | tests-visual/affordance-map.spec.ts | — | b245315b4819778e9254eaaa5a96c71dd9ff0e63 | source base |
| 1117 | repair | tests-visual/aria-orientation.spec.ts | — | a1d9c8d95e97ac85c8e3230df6450647f24eda89 | source base |
| 1118 | repair | tests-visual/atlas-flip.spec.ts | — | 2657c8d1ca6c3399c78d7b8d2af9ecf6f0854be9 | source base |
| 1119 | repair | tests-visual/aurora-arresting-readback.ts | — | 0e6eb7e40a9314d49e81f5367e9938efe522215c | source base |
| 1120 | repair | tests-visual/aurora-arresting.spec.ts | — | e5ae1cd8ced631523030f873bc825ebbfb08fa6c | source base |
| 1121 | repair | tests-visual/aurora-atoms-render.spec.ts | — | 61d9e7f3bf3c446d99ace628f21949c9ca9d54d6 | source base |
| 1122 | repair | tests-visual/aurora-entrance.spec.ts | — | 63e20546f3eccc7e461f3da0215599a5a5a4494a | source base |
| 1123 | repair | tests-visual/aurora-mediums-substrate.spec.ts | — | 0e8fc5c70d5a2ee775de0d9765329d88d12a6048 | source base |
| 1124 | repair | tests-visual/aurora-painterly-statistics.spec.ts | — | 5acfad69ee6e6031507cbcc7947cc5219d66fafa | source base |
| 1125 | repair | tests-visual/aurora-studio.spec.ts | — | c16e067f64d6d9216b514b185b260afa961c8f54 | source base |
| 1126 | repair | tests-visual/aurora-swraster.spec.ts | — | ddb4d2ffbdc664a64bc242dc479f81073864f492 | source base |
| 1127 | repair | tests-visual/aurora-vibrancy.spec.ts | — | 8a2082909b9c29c30716431696d6db697dd741f1 | source base |
| 1128 | repair | tests-visual/auth-shell-bg.spec.ts | — | 9ddc84b0f573b149c875feec85f55c80fbdb0ac2 | source base |
| 1129 | repair | tests-visual/ba-animate.spec.ts | — | a1b08aed681711c85f005e29b1d48042683d1459 | source base |
| 1130 | repair | tests-visual/badge-align.spec.ts | — | 180f81ec60a7301c9ce3f4a81c7726042f79098b | source base |
| 1131 | repair | tests-visual/blob-config-delta.spec.ts | — | 8d926c4db8d0022dc359e4348c7362dead321bb4 | source base |
| 1132 | repair | tests-visual/blob-mood-live.spec.ts | — | 3c47e99dc4456c8366844b5e3a2c208205781cd3 | source base |
| 1133 | repair | tests-visual/blob-page.spec.ts | — | 5807955224c4ec726695ec467760756a205d4c02 | source base |
| 1134 | repair | tests-visual/blob-pause-seam.spec.ts | — | de54bae88366e78ab1bd1d3834363d6929fe833b | source base |
| 1135 | repair | tests-visual/blob-render.spec.ts | — | 24884ea4817f253f9e2193a1000c1a9617c4cf47 | source base |
| 1136 | repair | tests-visual/blob-studio.spec.ts | — | 35e20adb988e2b4d6be810268a592fab9361fd9c | source base |
| 1137 | repair | tests-visual/blob-warm-default.spec.ts | — | 53e3cc4993992717d7acf0d3f02487fe8d1d45f7 | source base |
| 1138 | repair | tests-visual/blob3-interaction-capture.spec.ts | — | 1053c4917af2f7c2d26c2da2ed2d33b33900f1c1 | source base |
| 1139 | repair | tests-visual/border-progress.spec.ts | — | 514e7984a1fa5d3b7d6138e82f112e4fde49b0d1 | source base |
| 1140 | repair | tests-visual/button-glass.spec.ts | — | 118b4dd322baad2d283ea8825081d5d2c196fd5e | source base |
| 1141 | repair | tests-visual/card-composite.spec.ts | — | e1a626ca9281cf96b7bd38d502709c694442f79d | source base |
| 1142 | repair | tests-visual/card-padding.spec.ts | — | d36cc6d93bd6df9c2796a20608867163051719ec | source base |
| 1143 | repair | tests-visual/carousel-rebuild.spec.ts | — | 9ae3e8f745cf47c2ab23ffab37d7003b217765ed | source base |
| 1144 | repair | tests-visual/code-blocks.spec.ts | — | ae84818502b54e0e84a155c83228ddc72fcdc526 | source base |
| 1145 | repair | tests-visual/coherence-congruence.spec.ts | — | db4e05a2271b1e11ba66efc1544b79efbc1610ea | source base |
| 1146 | repair | tests-visual/completion-seal.spec.ts | — | 175ce73081357004fcdba47ac1e1a5a754f03617 | source base |
| 1147 | repair | tests-visual/config-chassis.spec.ts | — | 0430686e92aa805706ed228803144a1f06775479 | source base |
| 1148 | repair | tests-visual/config-in-sheet.spec.ts | — | 5d2c28513552d0c1968f04fa7b281bfd901d8e28 | source base |
| 1149 | repair | tests-visual/config-right.spec.ts | — | 3ad7ff83c113bbc2ec9fba9fe845617bf23b21cd | source base |
| 1150 | repair | tests-visual/constellation-egg-live.spec.ts | — | 1c12e57ace6e7e8b236929875b76e514721fe2dc | source base |
| 1151 | repair | tests-visual/constellation-gen-live.spec.ts | — | 67f32fd526cec94d75c5c052fe757a76a2dad1e7 | source base |
| 1152 | repair | tests-visual/constellation-refit-live.spec.ts | — | 55d3bdaef425d6a52ca70445d0f0c15e6a6f44b7 | source base |
| 1153 | repair | tests-visual/constellation-warp-live.spec.ts | — | 969427869a033734befba4e0c43126a7a95dc161 | source base |
| 1154 | repair | tests-visual/constellation.spec.ts | — | cc085c45d06915d0eaaba396b8f978f8c0d77ba7 | source base |
| 1155 | repair | tests-visual/control-tokens.spec.ts | — | 6d1bc784ee1719dba3564f631707dd0bde5feb8c | source base |
| 1156 | repair | tests-visual/css-critical.spec.ts | — | 0cffacfa264d0cb5babd02ad906339986b2d0af6 | source base |
| 1157 | repair | tests-visual/customizability.spec.ts | — | f62e8f9003958e861923369d65d2cd12d25af8ce | source base |
| 1158 | repair | tests-visual/dark-material.spec.ts | — | 27ffd48835a6f437a3110b2b5e47537a7e07ce85 | source base |
| 1159 | repair | tests-visual/dark-semantic-contrast.spec.ts | — | 4594403a2c410fe478e8c70cee05815d33b2015e | source base |
| 1160 | repair | tests-visual/deck-slide.spec.ts | — | 4e952f5325fbbdcd037cdc565e5d9f0d238f6b76 | source base |
| 1161 | repair | tests-visual/demo-affordances.spec.ts | — | 0f0d1eae324da2447810e5faf8cf7496c8ebe181 | source base |
| 1162 | repair | tests-visual/demo-control-live.spec.ts | — | c73113ede982e8ce2466cc8e244bc3892d576e95 | source base |
| 1163 | repair | tests-visual/demo-design.spec.ts | — | 4da0df814a2cdc54cb20d90f767b1bbc19d6e952 | source base |
| 1164 | repair | tests-visual/desktop-fluid-type.spec.ts | — | 0bf78165ba11359820024b496d7a041668812caa | source base |
| 1165 | repair | tests-visual/dialog-glass.spec.ts | — | 7756d5cfd41fe64b501846a5fcee8279e546c6b8 | source base |
| 1166 | repair | tests-visual/disclosure-rotate.spec.ts | — | 8429592df645ab2926d9fa7420e21121af17b024 | source base |
| 1167 | repair | tests-visual/display-tracking.spec.ts | — | 65e464f111f308c72f598e5559cde6b3913a65ac | source base |
| 1168 | repair | tests-visual/dock-animation-live.spec.ts | — | aeed5c5b31837e1ab33d56501313fe331f6b8700 | source base |
| 1169 | repair | tests-visual/dock-cockpit.spec.ts | — | abee39488f588c33af41cff1934db24dd72d0faf | source base |
| 1170 | repair | tests-visual/dock-items-lag-capture.spec.ts | — | ddc14263ded7051ff6d30a808dbb808d4b6ada28 | source base |
| 1171 | repair | tests-visual/dock-luma-share.spec.ts | — | c61c82e5396b2f7c7dc886c0617bfca7dd528ab3 | source base |
| 1172 | repair | tests-visual/dock-morph-family.spec.ts | — | ffe98a678e60db521855fd4ba7e638648150c3dc | source base |
| 1173 | repair | tests-visual/dock-morph-insitu.spec.ts | — | d5cabda1f91d04306f66ae22927704b43e870922 | source base |
| 1174 | repair | tests-visual/dock-plate-clearance.spec.ts | — | 45cc36fa6c2a5407354e281740db6957ef3d6907 | source base |
| 1175 | repair | tests-visual/dock-rail-cohesion.spec.ts | — | 88871b4e5c5da869ede105654a3f650fdbcf41e3 | source base |
| 1176 | repair | tests-visual/dock-sections.spec.ts | — | d7df43b6a54efb1fed3067fe47961ce4dfb96b49 | source base |
| 1177 | repair | tests-visual/dock-with-slider-live.spec.ts | — | 42f5e5f5add0d6f10004e0e7b65db6b186898a12 | source base |
| 1178 | repair | tests-visual/dock-wrap-content-driven.spec.ts | — | d19701741e764f2455d1707c1a3d223b1702dcea | source base |
| 1179 | repair | tests-visual/dockmorph-cta.spec.ts | — | 61a78dc6cee1fdef62846a1fa7b86f2c5c06bf42 | source base |
| 1180 | repair | tests-visual/drag-morph.spec.ts | — | 9f4582adc79f5d3a00b5173b94f47cd691a0a541 | source base |
| 1181 | repair | tests-visual/easing-primitive.spec.ts | — | b81d106ff88cc2b894c0cfbbce806abc8ccd8c80 | source base |
| 1182 | repair | tests-visual/emission.spec.ts | — | 51fdfe1a13e052c61662e744dfc262a09859a6ed | source base |
| 1183 | repair | tests-visual/esc-stack.spec.ts | — | 493076f60e94f2e2383d1a31e171a6a3a04d21b3 | source base |
| 1184 | repair | tests-visual/expandable-container.spec.ts | — | f960403661eaa6e66deca5a23a72ddcfa641de13 | source base |
| 1185 | repair | tests-visual/eyebrow-union.spec.ts | — | f2f440e4a1d80353e0b3cc7e308b6d8146aaa66b | source base |
| 1186 | repair | tests-visual/fading-scroll.spec.ts | — | 94d222c96dc8059ecca56de16338c981be85d058 | source base |
| 1187 | repair | tests-visual/fixtures/aurora-ref-mesh-gradient.png | — | 7250cbaa672993c9454394064ded15492d586da3 | source base |
| 1188 | repair | tests-visual/fixtures/aurora-ref-oil-pastel.png | — | ac9a7bdb89574a33582f030fab61a31bb120eb6e | source base |
| 1189 | repair | tests-visual/fixtures/aurora-ref-skyscape.png | — | 6b9aaa71536b2bdbde44aadafab4f6c21ce34fed | source base |
| 1190 | repair | tests-visual/fixtures/blob-default-charcoal-HEAD.png | — | 79e18dfe6c26a9deb5e8508324e134b69907fcdd | source base |
| 1191 | repair | tests-visual/fixtures/dock-entering-child-lag.html | — | 29c409e5d8082a3fd3ce8f5580a70f8340b048cd | source base |
| 1192 | repair | tests-visual/fixtures/starry-night-crop.png | — | 3f2ba23afa095c42223299936c38b10ce1c5a789 | source base |
| 1193 | repair | tests-visual/font-cascade-live.spec.ts | — | 2f14eb18fd5bdbf7db106d1a272bd904e965e7d3 | source base |
| 1194 | repair | tests-visual/forced-colors-skin.spec.ts | — | b2ede17824eea1ea98996c7a09f5c57bb0e32518 | source base |
| 1195 | repair | tests-visual/ghost-dashed.spec.ts | — | 691524771e4aba3646ed30884efd100e59c5ace2 | source base |
| 1196 | repair | tests-visual/glass-accent.spec.ts | — | abc31bc4879766480dfdc5bfa2013a0f83d67966 | source base |
| 1197 | repair | tests-visual/glass-cal.spec.ts | — | 586a916e5f24359db66183219e2f1f6c40e96eac | source base |
| 1198 | repair | tests-visual/glass-cohesion.spec.ts | — | b3778f770b4c280efbe0d742db06dc28090458ce | source base |
| 1199 | repair | tests-visual/glass-depth.spec.ts | — | 39272539ffb95f06ff47d8a242df6ee5619036f7 | source base |
| 1200 | repair | tests-visual/glass-glow-fix.spec.ts | — | 7a37b6aed974a86f65ef678df3a03afd49427d97 | source base |
| 1201 | repair | tests-visual/glass-identity.spec.ts | — | fbf3adcdc84a7db84260de4324686971156a387a | source base |
| 1202 | repair | tests-visual/glass-legibility.spec.ts | — | e8160fb05cbcda4494511ee0ca0395507768e646 | source base |
| 1203 | repair | tests-visual/glass-material-demo.spec.ts | — | 4911d6a212ce18e67e46cc119b7d58bf2ce747de | source base |
| 1204 | repair | tests-visual/glass-prune.spec.ts | — | ca8fb6268cf6706dee89b0952e6cd7703d3c51f0 | source base |
| 1205 | repair | tests-visual/goo-dot.spec.ts | — | 030d7434ed2e537dc6035a9b38f454f84b573217 | source base |
| 1206 | repair | tests-visual/goo-redress.spec.ts | — | 727564c6ca2baa166340e30646a9e6ac0a284900 | source base |
| 1207 | repair | tests-visual/gooblob-meatball.spec.ts | — | 65024c81540b7f5a488988b55d0e422471f7b40a | source base |
| 1208 | repair | tests-visual/gooblob-plain.spec.ts | — | d425e8c4ee626a29a37f74ff4fac5b4614855672 | source base |
| 1209 | repair | tests-visual/handmark.spec.ts | — | c8ba1221c5f5a419944c05930b2bdf68df57c41e | source base |
| 1210 | repair | tests-visual/hierarchy.spec.ts | — | 5ed72eef2b9f5d2f966ec1fa6f8e0ef679a4ff42 | source base |
| 1211 | repair | tests-visual/icon-chip.spec.ts | — | e9084f25c76b4fcf80160ca4804d24862f412b74 | source base |
| 1212 | repair | tests-visual/lensing.spec.ts | — | a8527e8cf5480cf9a84ffc96e1a2fdf635457eac | source base |
| 1213 | repair | tests-visual/liquid-grid-viz.spec.ts | — | ed1a0653c532726ea7d8a733a512da8ede06bf5e | source base |
| 1214 | repair | tests-visual/liquid-hover.spec.ts | — | a3bb1a188f9e2ecdb5bb8e8e4c8f8f573234aa51 | source base |
| 1215 | repair | tests-visual/liquid-reveal.spec.ts | — | 448b15b8d51772cf63597b98205396b679d0d77b | source base |
| 1216 | repair | tests-visual/liquid-weight-default.spec.ts | — | 148b21a4f1165f1addf6c082d7080e80aa98b2e0 | source base |
| 1217 | repair | tests-visual/menu-glass.spec.ts | — | 6670a5236addae402db86f82009ab5a248fd18ed | source base |
| 1218 | repair | tests-visual/metal-shimmer.spec.ts | — | 5c5ad6fa344800d722cb37fdee1a05aa20a517d9 | source base |
| 1219 | repair | tests-visual/metric-hover.spec.ts | — | 6021248b3e24f5c244ae145bb2b4689c076390e7 | source base |
| 1220 | repair | tests-visual/motion-axis.spec.ts | — | 064f287ec2b975423d5b1edba7a26f46665b4960 | source base |
| 1221 | repair | tests-visual/motion-demo.spec.ts | — | e91df9d27c6bd19de4e8b2b5219e265d190e85c4 | source base |
| 1222 | repair | tests-visual/motion-one-clock.spec.ts | — | c7805ad46bd6ad69f7cdefb067e8886ac908fd96 | source base |
| 1223 | repair | tests-visual/motion2.spec.ts | — | 23cc31af8db82cd8f8fa4ca1c8c8cc12f538cb53 | source base |
| 1224 | repair | tests-visual/nav-dock-fix.spec.ts | — | e801dff585195363085061527e66077507a6d44f | source base |
| 1225 | repair | tests-visual/nested-backdrop-budget.spec.ts | — | 04a5573f0398caca362103bb8b27eb26a68ab1a1 | source base |
| 1226 | repair | tests-visual/no-gray.spec.ts | — | e5cddd233ea4eafd9c33daa6151c3587ba2b2296 | source base |
| 1227 | repair | tests-visual/no-shadcn-default.spec.ts | — | f67adc4ef1cccc8c71de675bc759f646bf34314c | source base |
| 1228 | repair | tests-visual/on-glass-fg.spec.ts | — | 1abc405eb7e9eb38b9864548b877b26e434d06f6 | source base |
| 1229 | repair | tests-visual/package.json | — | 2bb9d06edad2b219f3eb57954074b994dd24edd2 | source base |
| 1230 | repair | tests-visual/page-chassis.spec.ts | — | 27b8703f375e90ae36f7295e7f2813632ab30e99 | source base |
| 1231 | repair | tests-visual/page-hierarchy.spec.ts | — | 4f71c39ac231d4c1dd0df4e344dce90df8fb641f | source base |
| 1232 | repair | tests-visual/pager-ring.spec.ts | — | f11cde983aafdafd993832e6c61d21c3cbe1f0e7 | source base |
| 1233 | repair | tests-visual/pager-worm.spec.ts | — | c3d99397aa3e3ad7db3c6e5106f657e01610d085 | source base |
| 1234 | repair | tests-visual/paper-grid.spec.ts | — | 799f3b9d1a2e23cfc82e9bee335cdb3f2255478d | source base |
| 1235 | repair | tests-visual/perf-producer.spec.ts | — | 43c2e078b8fc4f0046235336ab4773a75c19ebbf | source base |
| 1236 | repair | tests-visual/phase-palette.spec.ts | — | af9849858cbcb471219ffbdece6e2b72a78b88ea | source base |
| 1237 | repair | tests-visual/pi-manifest.ts | — | 088161a77e6ddd731053c5b4edb076d0f0c0cd40 | source base |
| 1238 | repair | tests-visual/pi-runner-manifest.mjs | — | 01d2a772ace680a3a705a465f53a79e976290bde | source base |
| 1239 | repair | tests-visual/playwright.config.ts | — | 360ab7c98cdf22d96db6c49d51ac6d42092a0117 | source base |
| 1240 | repair | tests-visual/press-unify.spec.ts | — | 35f0d5260a5d90bc09f4538f8a5867fbd99e7458 | source base |
| 1241 | repair | tests-visual/progress-gradient.spec.ts | — | 196bd645f5febe0f2fa37a498496e6e840d7aa9f | source base |
| 1242 | repair | tests-visual/radio-fix.spec.ts | — | 651bf4d4823b67b43d96a35d968fd60ef103d780 | source base |
| 1243 | repair | tests-visual/reflect-aurora-selects.spec.ts | — | 1ab30ce666e494df59bf52e5e6446371b8ac79da | source base |
| 1244 | repair | tests-visual/reflect-aurora.spec.ts | — | 72c2958bc77c2a0824a18a2078553fac299b6a20 | source base |
| 1245 | repair | tests-visual/reflect-medium.spec.ts | — | db487d5450b22d3b9da18f0c3db9710dacda9df7 | source base |
| 1246 | repair | tests-visual/reflect-medium2.spec.ts | — | 803af01a6d5a1c55bf6830e8fdfcd039e0477ee5 | source base |
| 1247 | repair | tests-visual/register-ios.spec.ts | — | 27dc1d3e34a285fe7c3f7d8c5cf8d18342c6f967 | source base |
| 1248 | repair | tests-visual/safari-webgl.spec.ts | — | e332d82d411c6bdbf1d821b57253ff8f3fe28f09 | source base |
| 1249 | repair | tests-visual/scroll-motion.spec.ts | — | 64956bf0b385a11c1bb817db875df5e509942033 | source base |
| 1250 | repair | tests-visual/search-custom.spec.ts | — | 78dee2c7bb948593b876cbfbeba5ffbbbb30c5fd | source base |
| 1251 | repair | tests-visual/search.spec.ts | — | 81e4ae50d8561c1d2830df7000a9100c3d95b322 | source base |
| 1252 | repair | tests-visual/selection-card.spec.ts | — | 3714139e0b65c5fddf60a1698b85ffd25270a722 | source base |
| 1253 | repair | tests-visual/separator.spec.ts | — | 5a05b6bc06b9a7d749e211d73ae1518caec8d58c | source base |
| 1254 | repair | tests-visual/served-app-sentinel.ts | — | 6a7eaec928b56afe48e5201445925e87d760d9a5 | source base |
| 1255 | repair | tests-visual/shadow-grammar.spec.ts | — | 362342ca50cab94bda1a379320e7b0723aad9223 | source base |
| 1256 | repair | tests-visual/sheet-inset.spec.ts | — | b9ffc844f59a9ddd481f7028427ed0ccd1a44c7a | source base |
| 1257 | repair | tests-visual/sheet-radius.spec.ts | — | d8f741c17f51e2eca20c9c9819793ab015dcfc05 | source base |
| 1258 | repair | tests-visual/shell-config.spec.ts | — | 761c8f3e8c8b9229cf220249955239df5dc28d85 | source base |
| 1259 | repair | tests-visual/shell-hold.spec.ts | — | ad0349c034d2489fb0b4c66910b7594468c698c1 | source base |
| 1260 | repair | tests-visual/shell-identity.spec.ts | — | d85db7a31bc77606c72583a82fe9466fa8c64020 | source base |
| 1261 | repair | tests-visual/slider-spectrum-fallback.spec.ts | — | b75318810076b209c66a8b05551a1fe1158cd327 | source base |
| 1262 | repair | tests-visual/specular-coalesce.spec.ts | — | cc23c1836ab83078cee7c3301766160290857b41 | source base |
| 1263 | repair | tests-visual/spring-ease.spec.ts | — | bd09fa833a8180fed1ca00a575fa4ba7a0708dfa | source base |
| 1264 | repair | tests-visual/squircle-language.spec.ts | — | 9fa312b0d69e5d7313dacee6df128dbba6bf8f0d | source base |
| 1265 | repair | tests-visual/stage-field-clamp.spec.ts | — | 895a6b4c1a8217c1aa844acd1f248d6e9f1fe8e5 | source base |
| 1266 | repair | tests-visual/stage.spec.ts | — | b4c219bd0beb49c8aabf89fa5efcf0350e092e7d | source base |
| 1267 | repair | tests-visual/storybook-meta.spec.ts | — | 24ac892fc46cd02a7e852f715f4254b282d61e7b | source base |
| 1268 | repair | tests-visual/substrate-cohesion.spec.ts | — | bf042da59c96872a096d87c5c0539dc992c2d7c6 | source base |
| 1269 | repair | tests-visual/substrate-paints-color.spec.ts | — | fb966540fa32b9a578dd425db140e717684b9cd2 | source base |
| 1270 | repair | tests-visual/suffuse.spec.ts | — | 42820647d1637c5c54eaed5d9c554fa986b06de9 | source base |
| 1271 | repair | tests-visual/suffuse2.spec.ts | — | cd33f9cec6ceec8b4941e11072a852524d5569c4 | source base |
| 1272 | repair | tests-visual/surface-axis.spec.ts | — | 914d4eb3581eeeb2f4e49dd9f0bf07949713fb22 | source base |
| 1273 | repair | tests-visual/tabs-std.spec.ts | — | f04eaad2016fb50999ad964925858e9326b80900 | source base |
| 1274 | repair | tests-visual/teal-navy-purge.spec.ts | — | 89eb2199031476e1cbb9d1c1496ee454450875d4 | source base |
| 1275 | repair | tests-visual/touch-target.spec.ts | — | fd490ce7d6431c68ef143c407817541394f10738 | source base |
| 1276 | repair | tests-visual/tunable-anim.spec.ts | — | 8bc350c25fd2034d80e0cad1883963dcb43dbf0a | source base |
| 1277 | repair | tests-visual/viz-configurator-suite.spec.ts | — | ab2f4bafa6c5e50fd77efe1da41bdd4ba6c2ef97 | source base |
| 1278 | repair | tests-visual/viz-fourier-ribbon.spec.ts | — | 8e8c36b27b37e5998d072a7e59b4ef854e7728ae | source base |
| 1279 | repair | tests-visual/viz-interaction.spec.ts | — | 320a60d881ae33ce9cbf6bd461d2a81f245ea329 | source base |
| 1280 | repair | tests-visual/viz-paint-records.spec.ts | — | 99729f12b7387a13c8695c3bb25a8d4e1915dde6 | source base |
| 1281 | repair | tests-visual/w38-binding.spec.ts | — | 812b330bcc3765615bdd794378f56fbdde0bfd04 | source base |
| 1282 | repair | tests-visual/w38-w47-verify.spec.ts | — | b90e86079dc2aa59c8c987a97ffd4d3eff98f677 | source base |
| 1283 | repair | tests-visual/webgpu-everywhere.spec.ts | — | 89191ad79581e316474d0675556cb5c579d7ac15 | source base |
| 1284 | repair | tests/components.smoke.spec.ts | — | 5304d14c6a7c73526705365a184d86aa0b7211b7 | source base |
| 1285 | repair | tests/components/custom/animated-digit/AnimatedDigit.test.ts | — | c17a0ae029303bfc60dbf6df2fc4712c442480c9 | source base |
| 1286 | repair | tests/components/custom/aurora/atoms.test.ts | — | 7352fd624be903587619d067b19f783fba20266b | source base |
| 1287 | repair | tests/components/custom/aurora/color-equivalence.test.ts | — | a68b05a055de9809a0bfec117c7393e94f49cad5 | source base |
| 1288 | repair | tests/components/custom/aurora/derive-aurora.test.ts | — | 1b49b6149601e0b325c800b5c43ab9300466ba0b | source base |
| 1289 | repair | tests/components/custom/aurora/derive-color.test.ts | — | c26334a95550e3fbfe147f140e01746b9f3ee63e | source base |
| 1290 | repair | tests/components/custom/aurora/interaction-prm.test.ts | — | b858011363f225b74304960fbd93ca44152f6816 | source base |
| 1291 | repair | tests/components/custom/aurora/mediums-extraction.test.ts | — | fa34717672e69e80f10f5cb9bd187dcebdd2d662 | source base |
| 1292 | repair | tests/components/custom/aurora/painterly.test.ts | — | 458e527eb2828dc5dce700b24c0f4b666ec700fc | source base |
| 1293 | repair | tests/components/custom/aurora/render-mode.test.ts | — | d5580f4d6c1339943c938e5c4fc57fcea2176b4b | source base |
| 1294 | repair | tests/components/custom/blob/blob-color-equivalence.test.ts | — | b0cadf70ab8e58e5b48cfd384bb7f46f7fb4db78 | source base |
| 1295 | repair | tests/components/custom/blob/metaball-color.glsl-port.ts | — | 7aa98f768279e47a2be1eb0ceba3017917dc2bb2 | source base |
| 1296 | repair | tests/components/custom/blob/resolveColor.test.ts | — | c35051dda726cac85bf26ff3db7504b6e4e548c6 | source base |
| 1297 | repair | tests/components/custom/border-progress/spectrum-walk.test.ts | — | a6a9e3dc7a3adc0cde80798fbd00ff0605d637df | source base |
| 1298 | repair | tests/components/custom/configurator/ConfiguratorLayer.model.test.ts | — | f5579a38d99a4d6417f2b259c22a997f7eb06d32 | source base |
| 1299 | repair | tests/components/custom/constellation/constellationField.test.ts | — | d3e1f907148154c52d2601bb51e4d9d0e6d5a9d3 | source base |
| 1300 | repair | tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts | — | a9bfa90fce482178b9a193f5ff2115e28891b0e4 | source base |
| 1301 | repair | tests/components/custom/dock/DockBackgroundToggle.a11y.test.ts | — | 08d99a61f41c114ea5ea4246e0e1a1dfa8de16af | source base |
| 1302 | repair | tests/components/custom/dock/dockCrossfadeContext.readonly.test-d.ts | — | 8b24fa8ef12708be6e88f566ef93bdb8655e91cd | source base |
| 1303 | repair | tests/components/custom/dock/DockLayerRail.a11y.test.ts | — | b5c60edf33885aa18e26d4ea60bb8de2cec018a0 | source base |
| 1304 | repair | tests/components/custom/dock/GlassDock.motion-parity.test.ts | — | 03f68a301ae1eb8552f390992429ef9477d6821e | source base |
| 1305 | repair | tests/components/custom/dock/GlassDock.scroll-overflow.test.ts | — | 8fd7eca10e3550a0f9d36a15c1be344f61f93bbc | source base |
| 1306 | repair | tests/components/custom/dock/GlassDock.touch-gate.test.ts | — | fe14f7a625798be9f7d8b4292a85012b38eb129d | source base |
| 1307 | repair | tests/components/custom/dock/GlassDock.vertical-collapse.test.ts | — | 6d1f3c15a7ea7f615cee2b7bcc51a85152b7a51f | source base |
| 1308 | repair | tests/components/custom/dock/GlassDock.vt-names.test.ts | — | b308deafe24c0c1e6ea26c399cd5ca3527d0b0a9 | source base |
| 1309 | repair | tests/components/custom/fourier-field/FourierField.smoke.test.ts | — | 35b7b08dab35704672aba083df6dfb671de9dc77 | source base |
| 1310 | repair | tests/components/custom/handmark/brush.test.ts | — | cd67037e43189bd2e5cdae50619d079654ee38ce | source base |
| 1311 | repair | tests/components/custom/handmark/geometry.test.ts | — | d458292e5c724aa547445a6a92e6e39d204a2f44 | source base |
| 1312 | repair | tests/components/custom/handmark/HandMark.test.ts | — | 14998dc8109c3a75f1aa1afd768d561c7dc4fd18 | source base |
| 1313 | repair | tests/components/custom/handmark/highlight.test.ts | — | 5dc0ef26d34779a62ff8de47c993c41404093f5e | source base |
| 1314 | repair | tests/components/custom/handmark/hull-guard.test.ts | — | b0f7086b364216f140a8001aea7204dcfacbcf83 | source base |
| 1315 | repair | tests/components/custom/handmark/morphology.test.ts | — | 2b4adc690792b3d065873906bd4de48e299c06d9 | source base |
| 1316 | repair | tests/components/custom/handmark/texture.test.ts | — | 37ba2e2fc636d34d0865e2f38a4f5c452adf9247 | source base |
| 1317 | repair | tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts | — | d47daaf66a594f8133cbd6f56be59f7457c07617 | source base |
| 1318 | repair | tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts | — | fc0652a635d4106c73eebd8bccfb5424c7500fff | source base |
| 1319 | repair | tests/components/custom/metric-badge/zero-value.test.ts | — | b066161d3eba0cda63abc700f3dc4e44c26e87f9 | source base |
| 1320 | repair | tests/components/custom/metric-stack/MetricStack.test.ts | — | 63d504f2f5c2f5dbe6a83189f8c85d2cdf25aec5 | source base |
| 1321 | repair | tests/components/custom/search/fuzzySearchIndex.test.ts | — | cd08efe8cb9e431722558dc8a32c2fbf751594f9 | source base |
| 1322 | repair | tests/components/custom/search/search-contracts.test.ts | — | be4e63a197aa3c42e6bbaced0dd1cb6beeb3e0d3 | source base |
| 1323 | repair | tests/components/custom/search/useFuzzySearch.test.ts | — | 0f2858f939bc05f7ee30d47f7921201f67421c43 | source base |
| 1324 | repair | tests/components/custom/tabs/segmented-tabs.test.ts | — | d11db3c0963f1fbc1f907b66268ab89d226fcd0f | source base |
| 1325 | repair | tests/components/custom/timeline/aria-valuenow.test.ts | — | 684dcd616087f7c33319dfb2cfdfc4fda7110bc6 | source base |
| 1326 | repair | tests/components/custom/timeline/continuous-stitched-gradient.test.ts | — | 15402c4fbfed276575d0994da658cfb47127ce93 | source base |
| 1327 | repair | tests/components/custom/timeline/continuous-structural-split.test.ts | — | b39cb22a8818c33ce5bc9168ed499ae5a2d07bfc | source base |
| 1328 | repair | tests/components/ui/_shared/ModalOverlay.test.ts | — | 6a68289d6258e27966a722abbcc714d3e5a6b8cd | source base |
| 1329 | repair | tests/components/ui/button/Button.test.ts | — | 5e6711ef187002c983f76139604bc414c40da4e1 | source base |
| 1330 | repair | tests/components/ui/card/Card.test.ts | — | f50d2c31f516e623ed27acd7d7a54df0b6a78134 | source base |
| 1331 | repair | tests/components/ui/data-table/DataTable.test.ts | — | 79e5a388bf05c5b83b5f7043137b32ba5ff13bc7 | source base |
| 1332 | repair | tests/components/ui/data-table/useDataTableResponsive.test.ts | — | b0c80104624f32dd0803c5df0b41b1a3341e9311 | source base |
| 1333 | repair | tests/components/ui/data-table/useDataTableRowIdentity.test.ts | — | 18c73842d0845d7cdd788e8b17a816c38dc8f021 | source base |
| 1334 | repair | tests/components/ui/dialog/dialog-show-close.test.ts | — | 6d769dffb48a42931883cf587152143aceedcdd4 | source base |
| 1335 | repair | tests/components/ui/dialog/dialog-spring.test.ts | — | 497f321989249d0c1449780281c94fdbece6c122 | source base |
| 1336 | repair | tests/components/ui/progress/Progress.test.ts | — | 85688543b633a60e6bf4f989cdd6aa7c6192e6cd | source base |
| 1337 | repair | tests/components/ui/reka-binding-idiom.test.ts | — | 544ecfe931bc9b44fb59cc772b5a0b95a8d02485 | source base |
| 1338 | repair | tests/components/ui/skeleton/Skeleton.test.ts | — | 886d46e61aa6e144ac0c8823410ef74b5bcd8142 | source base |
| 1339 | repair | tests/components/ui/slider/dock-hold-contract.test.ts | — | b5205fa8e1a0d06c38ab835e8de4171950701de7 | source base |
| 1340 | repair | tests/composables.smoke.spec.ts | — | 6ae97daf3ef786b4be90ca5409ad01e50ac250fc | source base |
| 1341 | repair | tests/composables/color/use-accent-tone.test.ts | — | 6f3e0d9500845f11f9565f9e6a3f89210a295f28 | source base |
| 1342 | repair | tests/composables/color/warm-catch-light.test.ts | — | 412efd14ac67a21eef6751564b59959a7b472d4d | source base |
| 1343 | repair | tests/composables/dark/darkModeSyncScript.test.ts | — | 8c16fe9f24429fe4f1cb942067fb1cb8b996fd73 | source base |
| 1344 | repair | tests/composables/dom/useTokenColor.test.ts | — | 12e1aef73f751fcbabfef639ac1d23e86de19529 | source base |
| 1345 | repair | tests/composables/glass/canvas2d/resolveCanvasColor.test.ts | — | c1e4b48260fc6e5e9540dd4f63e40996d2bd4078 | source base |
| 1346 | repair | tests/composables/glass/canvas2d/useCanvas2D.test.ts | — | c9973e4277b2d48c96d2e1d1641d0a361ec67e2c | source base |
| 1347 | repair | tests/composables/glass/webgl/useWebGLCanvas.test.ts | — | 47b5627a34d187e0db153d413bde295f79804695 | source base |
| 1348 | repair | tests/composables/glass/webgpu/useWebGPUCanvas.test.ts | — | b60128c32911ceec0300c5954d1f2a9c22a3fc5d | source base |
| 1349 | repair | tests/composables/motion/convergence.test.ts | — | 67bed1e23561fb2d776c4fed25c482ac43034b1e | source base |
| 1350 | repair | tests/composables/motion/curves.test.ts | — | a6ecf908906850aea7d687832831f4063816a2c9 | source base |
| 1351 | repair | tests/composables/motion/scroll-reveal-once.test.ts | — | 5f0b81ad16b4d4b146f25591ffdb2136d0630bd4 | source base |
| 1352 | repair | tests/composables/motion/suite.test.ts | — | 26de5de23a966514a9273dd410f6e73165883a16 | source base |
| 1353 | repair | tests/composables/motion/text-highlight-home.test.ts | — | 42cd25b5513a90bfedfb88b740f9d8edcc80bac9 | source base |
| 1354 | repair | tests/composables/motion/useBloomUp.test.ts | — | 15b813dc5821894a96270cbfe133ccd669ceb437 | source base |
| 1355 | repair | tests/composables/motion/useCharStagger.test.ts | — | 3361f5f14509c28bf81558a6d74b95878353f073 | source base |
| 1356 | repair | tests/composables/motion/usePointerVelocityField.test.ts | — | ec6a1636acd56b64202fc3d87bd88154489f214a | source base |
| 1357 | repair | tests/composables/motion/useScrollTrigger.test.ts | — | 6d4b677242070a7942c5ffea9dd12d1e4fb1dd73 | source base |
| 1358 | repair | tests/composables/motion/useTextHighlight.test.ts | — | 644b3fde942c00a45ff4caeee76f9e10085557f8 | source base |
| 1359 | repair | tests/composables/sidebar/useLazyLoader.test.ts | — | 07478422003cb264f9a0cb54cb072e591a234fc0 | source base |
| 1360 | repair | tests/composables/sidebar/useScrollTo.test.ts | — | 4936502451597f44514ab26c9d61fb93c3bae6b2 | source base |
| 1361 | repair | tests/composables/sidebar/useScrollTracker.test.ts | — | b806d4b49c08482b4ca76724f779717bbafc81e0 | source base |
| 1362 | repair | tests/composables/sortable/drag-ring-radius.test.ts | — | c742290ac628673560da6920e59baaed0551141a | source base |
| 1363 | repair | tests/composables/useAnimatedNumber.test.ts | — | 60a0f98bc090e55bb87be28564230ffd75683fda | source base |
| 1364 | repair | tests/composables/useCountup.test.ts | — | 359d2445426941c66f69286a1307362d4f23dcba | source base |
| 1365 | repair | tests/composables/useIntersectionPause.test.ts | — | 6e2821bceb7514b22ddc0d9bfe461cb63fd4f8df | source base |
| 1366 | repair | tests/composables/useInterval.test.ts | — | 669b7afe7a216e6e7bcf4310562462627ad45376 | source base |
| 1367 | repair | tests/composables/useKeyboardShortcuts.test.ts | — | ccac1f0c1b50fc1e3280b91132e40097556cb9f1 | source base |
| 1368 | repair | tests/composables/useNumericTransition.test.ts | — | 413c5ccffb14508e882a9c2d0d29e5257933154c | source base |
| 1369 | repair | tests/composables/usePrioritizedTask.test.ts | — | 21de4269c04fcc492749adb6be662ead48f143f6 | source base |
| 1370 | repair | tests/composables/useRAFLoop.test.ts | — | 71eb7b207cab9d9559e11e28cd20a8081baf2c14 | source base |
| 1371 | repair | tests/composables/useSpring.test.ts | — | 57c48bf3cdca31628f867b69a0f8ee43879479c1 | source base |
| 1372 | repair | tests/composables/useSpringMount.test.ts | — | 5129a7ac8a43a9bbbcdda557e6b2d96fe9c847f3 | source base |
| 1373 | repair | tests/composables/useSpringPress.test.ts | — | 5cc0d1bdecdab70f901cbc7fbc3736c2aa6fe570 | source base |
| 1374 | repair | tests/composables/useTimer.test.ts | — | b45ac54237f06299dd3f5767e45d8a6640ce3d69 | source base |
| 1375 | repair | tests/composables/useTokenColor.test.ts | — | 51edac5bb533f0e72273949547a1406a988b2473 | source base |
| 1376 | repair | tests/composables/useTouchGate.test.ts | — | 0ed637069b4231c2371c9af4869390a8fe4855d1 | source base |
| 1377 | repair | tests/composables/useViewTransition.test.ts | — | efabdb13327b0055713d403ae32af5fb4f03c4b2 | source base |
| 1378 | repair | tests/composables/useYieldToMain.test.ts | — | 671be8b9df276c8a43220847e1e68e46913ffd9d | source base |
| 1379 | repair | tests/composables/virtual/virtualSectionLayout.test.ts | — | 1665d0e4573bf2d65c1a87f325a77521bdfc34cb | source base |
| 1380 | repair | tests/composables/vReveal.test.ts | — | 9f546033b5043dc7021a85d26cdc2e9f3ce54e0d | source base |
| 1381 | repair | tests/configurator-recursion.spec.ts | — | 6e20544f70859c70722c8fd1e62a371e72d5d57f | source base |
| 1382 | repair | tests/lifecycle-cleanup.spec.ts | — | fdec64429520c0ce138839f13673a146c915b062 | source base |
| 1383 | repair | tests/menuItemVariants.spec.ts | — | 7808089de5f68f96dc31c842a85bc4c1c9c07468 | source base |
| 1384 | repair | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |
| 1385 | repair | tests/scripts/demo-dock-nav.detect.test.ts | — | 7277822ba72332f97791c4caf343ffe2a347386a | source base |
| 1386 | repair | tests/scripts/proof-animation-coherence.detect.test.ts | — | d9d97254cf74628b1886421003e58c2112558cdd | source base |
| 1387 | repair | tests/scripts/proof-demo-control-live.detect.test.ts | — | 296982276ddf961c7ad999b65f58571ee38cc570 | source base |
| 1388 | repair | tests/scripts/proof-slider-two-only.detect.test.ts | — | 001a8dafbaf1409a582e3050cbd9bdef726666a1 | source base |
| 1389 | repair | tests/scripts/proof-xr-producer-repairs.detect.test.ts | — | 99587e25aff960ecb8dd2df72aacfb7b7e75f8aa | source base |
| 1390 | repair | tests/scripts/storybook-complete.detect.test.ts | — | 9bdf1ba970e751915127e5c4c686cc2bf4c094ab | source base |
| 1391 | repair | tests/setup.ts | — | baf7ab6356c5d6364136262d815c740f3978e631 | source base |
| 1392 | repair | tests/shims.d.ts | — | b3315ed9f10a82279299c9d213a4562cf43b7f9a | source base |
| 1393 | repair | tests/stories.smoke.spec.ts | — | a71c20a7d7501d8efb8202c78caa9818ac1692a6 | source base |
| 1394 | repair | tests/structure/manifest.test.ts | — | — | BI.W-P005 |
| 1395 | repair | tests/utils/cn.test.ts | — | 1e34ba591edb10fb3326db2150659be0ba5092b2 | source base |
| 1396 | repair | tests/utils/mountComposable.ts | — | 997042f9ecfe288d05d198ea9c2f9c066e7ad5d9 | source base |
| 1397 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |

## Repair manifest (1399)

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
| imports | 204 | scripts/__tests__/proof-vt-names.test.ts |
| imports | 205 | scripts/audit-stash-list.mjs |
| imports | 206 | scripts/aurora-arresting-metric.mjs |
| imports | 207 | scripts/aurora-profile/harness-browser.mjs |
| imports | 208 | scripts/constellation.mjs |
| imports | 209 | scripts/fixtures/strict-templates.fixture.vue |
| imports | 210 | scripts/fixtures/tsconfig.strict-fixture.json |
| imports | 211 | scripts/flatten-subpath-types.mjs |
| imports | 212 | scripts/install-hooks.mjs |
| imports | 213 | scripts/lib/canon-doc.mjs |
| imports | 214 | scripts/lib/critical-path-walk.mjs |
| imports | 215 | scripts/lib/design-docs.mjs |
| imports | 216 | scripts/lib/detect/comment-strip.mjs |
| imports | 217 | scripts/lib/detect/index.mjs |
| imports | 218 | scripts/lib/detect/markdown-table.mjs |
| imports | 219 | scripts/lib/detect/wave-id.mjs |
| imports | 220 | scripts/lib/fold-ledger-core.mjs |
| imports | 221 | scripts/lib/gesture-frame-recorder.mjs |
| imports | 222 | scripts/lib/gl-renderer-probe.mjs |
| imports | 223 | scripts/lib/minify-css.mjs |
| imports | 224 | scripts/lib/paint-arm.mjs |
| imports | 225 | scripts/lib/subpath-policy.mjs |
| imports | 226 | scripts/lib/surface-closure.mjs |
| imports | 227 | scripts/lib/token-manifest.mjs |
| imports | 228 | scripts/lighthouse/consumer-app/App.vue |
| imports | 229 | scripts/lighthouse/consumer-app/index.html |
| imports | 230 | scripts/lighthouse/consumer-app/main.ts |
| imports | 231 | scripts/lighthouse/consumer-app/vite.config.mts |
| imports | 232 | scripts/lighthouse/floor.baseline.json |
| imports | 233 | scripts/lighthouse/preview-build.config.mts |
| imports | 234 | scripts/lighthouse/protocol.mjs |
| imports | 235 | scripts/no-masking-manifest.mjs |
| imports | 236 | scripts/profile-aurora.mjs |
| imports | 237 | scripts/profile-bundle.mjs |
| imports | 238 | scripts/read-blob-shaders.mjs |
| imports | 239 | scripts/read-css-monoliths.mjs |
| imports | 240 | scripts/read-dock-css.mjs |
| imports | 241 | scripts/reflect-capture-verify.mjs |
| imports | 242 | scripts/regen-exports.mjs |
| imports | 243 | scripts/regen-primitives.mjs |
| imports | 244 | scripts/regen-spring-tokens.mjs |
| imports | 245 | scripts/regen-structure.mjs |
| imports | 246 | scripts/release.sh |
| imports | 247 | scripts/token-manifest-allowlist.json |
| imports | 248 | scripts/verify-export-types.mjs |
| imports | 249 | scripts/verify-siblings-intact.mjs |
| imports | 250 | scripts/worktree-gc.mjs |
| imports | 251 | src/axes.ts |
| imports | 252 | src/carousel.ts |
| imports | 253 | src/components/PROCEDURAL-SUITE.md |
| imports | 254 | src/components/_shared/ModalOverlay.vue |
| imports | 255 | src/components/_shared/axes.ts |
| imports | 256 | src/components/_shared/index.ts |
| imports | 257 | src/components/_shared/menuItemVariants.ts |
| imports | 258 | src/components/_shared/useControlSize.ts |
| imports | 259 | src/components/_shared/useMotionAxis.ts |
| imports | 260 | src/components/_shared/useStalePropWarning.ts |
| imports | 261 | src/components/_shared/useSurfaceAxis.ts |
| imports | 262 | src/components/accordion/Accordion.vue |
| imports | 263 | src/components/accordion/AccordionContent.vue |
| imports | 264 | src/components/accordion/AccordionItem.vue |
| imports | 265 | src/components/accordion/AccordionTrigger.vue |
| imports | 266 | src/components/accordion/index.ts |
| imports | 267 | src/components/alert/Alert.vue |
| imports | 268 | src/components/alert/AlertDescription.vue |
| imports | 269 | src/components/alert/AlertTitle.vue |
| imports | 270 | src/components/alert/index.ts |
| imports | 271 | src/components/animated-digit/AnimatedDigit.vue |
| imports | 272 | src/components/animated-digit/README.md |
| imports | 273 | src/components/animated-digit/index.ts |
| imports | 274 | src/components/aurora/Aurora.vue |
| imports | 275 | src/components/aurora/DESIGN.md |
| imports | 276 | src/components/aurora/README.md |
| imports | 277 | src/components/aurora/RESEARCH.md |
| imports | 278 | src/components/aurora/composables/atoms-fields.ts |
| imports | 279 | src/components/aurora/composables/atoms.ts |
| imports | 280 | src/components/aurora/composables/auroraFallbackGround.ts |
| imports | 281 | src/components/aurora/composables/auroraImageSource.ts |
| imports | 282 | src/components/aurora/composables/color.ts |
| imports | 283 | src/components/aurora/composables/configSource.ts |
| imports | 284 | src/components/aurora/composables/frameLoop.ts |
| imports | 285 | src/components/aurora/composables/glSetup.ts |
| imports | 286 | src/components/aurora/composables/runtime.ts |
| imports | 287 | src/components/aurora/composables/uniformBridge.ts |
| imports | 288 | src/components/aurora/composables/uniformBridgeWGPU.ts |
| imports | 289 | src/components/aurora/composables/uniformBridgeWGPUImage.ts |
| imports | 290 | src/components/aurora/composables/useAurora.ts |
| imports | 291 | src/components/aurora/composables/useCursorInteraction.ts |
| imports | 292 | src/components/aurora/composables/wgpuSetup.ts |
| imports | 293 | src/components/aurora/constants/budget.ts |
| imports | 294 | src/components/aurora/constants/presets.ts |
| imports | 295 | src/components/aurora/constants/renderMode.ts |
| imports | 296 | src/components/aurora/constants/shaders/aurora-image.frag.ts |
| imports | 297 | src/components/aurora/constants/shaders/aurora-image.wgsl.ts |
| imports | 298 | src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts |
| imports | 299 | src/components/aurora/constants/shaders/aurora.frag.ts |
| imports | 300 | src/components/aurora/constants/shaders/aurora.vert.ts |
| imports | 301 | src/components/aurora/constants/shaders/aurora.wgsl.ts |
| imports | 302 | src/components/aurora/constants/shaders/brush.glsl.ts |
| imports | 303 | src/components/aurora/constants/shaders/composition.glsl.ts |
| imports | 304 | src/components/aurora/constants/shaders/flow.glsl.ts |
| imports | 305 | src/components/aurora/constants/shaders/mediums.glsl.ts |
| imports | 306 | src/components/aurora/constants/shaders/metal-medium.glsl.ts |
| imports | 307 | src/components/aurora/constants/shaders/oil-modes.glsl.ts |
| imports | 308 | src/components/aurora/constants/shaders/procedural-color.wgsl.ts |
| imports | 309 | src/components/aurora/constants/shaders/tonemap.glsl.ts |
| imports | 310 | src/components/aurora/constants/shaders/vangogh-medium.glsl.ts |
| imports | 311 | src/components/aurora/index.ts |
| imports | 312 | src/components/avatar/Avatar.vue |
| imports | 313 | src/components/avatar/AvatarFallback.vue |
| imports | 314 | src/components/avatar/AvatarImage.vue |
| imports | 315 | src/components/avatar/index.ts |
| imports | 316 | src/components/badge/Badge.vue |
| imports | 317 | src/components/badge/index.ts |
| imports | 318 | src/components/blob/Blob.vue |
| imports | 319 | src/components/blob/README.md |
| imports | 320 | src/components/blob/RESEARCH.md |
| imports | 321 | src/components/blob/composables/buildMetaballProgram.ts |
| imports | 322 | src/components/blob/composables/easing.ts |
| imports | 323 | src/components/blob/composables/satelliteKinematics.ts |
| imports | 324 | src/components/blob/composables/uniformBridgeWGPU.ts |
| imports | 325 | src/components/blob/composables/uploadBlobUniforms.ts |
| imports | 326 | src/components/blob/composables/useBlobMood.ts |
| imports | 327 | src/components/blob/composables/useBlobPointer.ts |
| imports | 328 | src/components/blob/composables/useBlobSatellites.ts |
| imports | 329 | src/components/blob/composables/useMetaballRenderer.ts |
| imports | 330 | src/components/blob/composables/wgpuSetup.ts |
| imports | 331 | src/components/blob/config.ts |
| imports | 332 | src/components/blob/constants.ts |
| imports | 333 | src/components/blob/index.ts |
| imports | 334 | src/components/blob/presets.ts |
| imports | 335 | src/components/blob/shaders/metaball-noise.wgsl.ts |
| imports | 336 | src/components/blob/shaders/metaball-palette.wgsl.ts |
| imports | 337 | src/components/blob/shaders/metaball-uniforms.glsl.ts |
| imports | 338 | src/components/blob/shaders/metaball.frag.ts |
| imports | 339 | src/components/blob/shaders/metaball.vert.ts |
| imports | 340 | src/components/blob/shaders/metaball.wgsl.ts |
| imports | 341 | src/components/blob/shaders/oklch-perturb.glsl.ts |
| imports | 342 | src/components/blob/shaders/sdf-body.glsl.ts |
| imports | 343 | src/components/blob/shaders/watercolor-edges.glsl.ts |
| imports | 344 | src/components/blob/types.ts |
| imports | 345 | src/components/border-progress/BorderProgress.vue |
| imports | 346 | src/components/border-progress/README.md |
| imports | 347 | src/components/border-progress/composables/useBorderSpectrum.ts |
| imports | 348 | src/components/border-progress/constants.ts |
| imports | 349 | src/components/border-progress/index.ts |
| imports | 350 | src/components/button/Button.vue |
| imports | 351 | src/components/button/index.ts |
| imports | 352 | src/components/card/Card.vue |
| imports | 353 | src/components/card/CardAction.vue |
| imports | 354 | src/components/card/CardContent.vue |
| imports | 355 | src/components/card/CardDescription.vue |
| imports | 356 | src/components/card/CardFooter.vue |
| imports | 357 | src/components/card/CardHeader.vue |
| imports | 358 | src/components/card/CardTitle.vue |
| imports | 359 | src/components/card/ScrollCard.vue |
| imports | 360 | src/components/card/ScrollCardHeader.vue |
| imports | 361 | src/components/card/index.ts |
| imports | 362 | src/components/carousel/Carousel.vue |
| imports | 363 | src/components/carousel/CarouselContent.vue |
| imports | 364 | src/components/carousel/CarouselItem.vue |
| imports | 365 | src/components/carousel/CarouselNext.vue |
| imports | 366 | src/components/carousel/CarouselPager.vue |
| imports | 367 | src/components/carousel/CarouselPrevious.vue |
| imports | 368 | src/components/carousel/GlassCarouselPager.vue |
| imports | 369 | src/components/carousel/index.ts |
| imports | 370 | src/components/carousel/interface.ts |
| imports | 371 | src/components/carousel/useCarousel.ts |
| imports | 372 | src/components/checkbox/Checkbox.vue |
| imports | 373 | src/components/checkbox/index.ts |
| imports | 374 | src/components/chip/Chip.vue |
| imports | 375 | src/components/chip/README.md |
| imports | 376 | src/components/chip/chipVariants.ts |
| imports | 377 | src/components/chip/index.ts |
| imports | 378 | src/components/chip/types.ts |
| imports | 379 | src/components/collapsible/Collapsible.vue |
| imports | 380 | src/components/collapsible/CollapsibleContent.vue |
| imports | 381 | src/components/collapsible/CollapsibleTrigger.vue |
| imports | 382 | src/components/collapsible/index.ts |
| imports | 383 | src/components/color-swatch/ColorSwatch.vue |
| imports | 384 | src/components/color-swatch/README.md |
| imports | 385 | src/components/color-swatch/index.ts |
| imports | 386 | src/components/combobox/Combobox.vue |
| imports | 387 | src/components/combobox/ComboboxAnchor.vue |
| imports | 388 | src/components/combobox/ComboboxEmpty.vue |
| imports | 389 | src/components/combobox/ComboboxGroup.vue |
| imports | 390 | src/components/combobox/ComboboxInput.vue |
| imports | 391 | src/components/combobox/ComboboxItem.vue |
| imports | 392 | src/components/combobox/ComboboxItemIndicator.vue |
| imports | 393 | src/components/combobox/ComboboxList.vue |
| imports | 394 | src/components/combobox/ComboboxSeparator.vue |
| imports | 395 | src/components/combobox/ComboboxViewport.vue |
| imports | 396 | src/components/combobox/index.ts |
| imports | 397 | src/components/command/Command.vue |
| imports | 398 | src/components/command/CommandDialog.vue |
| imports | 399 | src/components/command/CommandEmpty.vue |
| imports | 400 | src/components/command/CommandGroup.vue |
| imports | 401 | src/components/command/CommandInput.vue |
| imports | 402 | src/components/command/CommandItem.vue |
| imports | 403 | src/components/command/CommandList.vue |
| imports | 404 | src/components/command/CommandSeparator.vue |
| imports | 405 | src/components/command/CommandShortcut.vue |
| imports | 406 | src/components/command/index.ts |
| imports | 407 | src/components/completion-seal/CompletionSeal.vue |
| imports | 408 | src/components/completion-seal/README.md |
| imports | 409 | src/components/completion-seal/composables/useCompletionSeal.ts |
| imports | 410 | src/components/completion-seal/constants.ts |
| imports | 411 | src/components/completion-seal/index.ts |
| imports | 412 | src/components/configurator/Configurator.vue |
| imports | 413 | src/components/configurator/ConfiguratorLayer.vue |
| imports | 414 | src/components/configurator/ConfiguratorRow.vue |
| imports | 415 | src/components/configurator/index.ts |
| imports | 416 | src/components/configurator/size.ts |
| imports | 417 | src/components/configurator/useConfiguratorState.ts |
| imports | 418 | src/components/constellation/Constellation.vue |
| imports | 419 | src/components/constellation/README.md |
| imports | 420 | src/components/constellation/composables/constellationGLSetup.ts |
| imports | 421 | src/components/constellation/composables/constellationWGPUSetup.ts |
| imports | 422 | src/components/constellation/composables/createConstellationField.ts |
| imports | 423 | src/components/constellation/composables/uniformBridgeWGPU.ts |
| imports | 424 | src/components/constellation/composables/useConstellation.ts |
| imports | 425 | src/components/constellation/constants.ts |
| imports | 426 | src/components/constellation/constellationField.ts |
| imports | 427 | src/components/constellation/constellationInteraction.ts |
| imports | 428 | src/components/constellation/constellationRender.ts |
| imports | 429 | src/components/constellation/constellationTypes.ts |
| imports | 430 | src/components/constellation/constellationWell.ts |
| imports | 431 | src/components/constellation/index.ts |
| imports | 432 | src/components/constellation/shaders/constellation-lines.glsl.ts |
| imports | 433 | src/components/constellation/shaders/constellation-lines.wgsl.ts |
| imports | 434 | src/components/constellation/shaders/constellation-points.glsl.ts |
| imports | 435 | src/components/constellation/shaders/constellation-points.wgsl.ts |
| imports | 436 | src/components/controls/DarkModeToggle.vue |
| imports | 437 | src/components/controls/README.md |
| imports | 438 | src/components/controls/index.ts |
| imports | 439 | src/components/data-table/DataTable.vue |
| imports | 440 | src/components/data-table/DataTablePagination.vue |
| imports | 441 | src/components/data-table/composables/useDataTableResponsive.ts |
| imports | 442 | src/components/data-table/composables/useDataTableRowIdentity.ts |
| imports | 443 | src/components/data-table/index.ts |
| imports | 444 | src/components/data-table/types.ts |
| imports | 445 | src/components/deck/DeckPager.vue |
| imports | 446 | src/components/deck/README.md |
| imports | 447 | src/components/deck/composables/useDeck.ts |
| imports | 448 | src/components/deck/composables/useDeckKeyboard.ts |
| imports | 449 | src/components/deck/composables/useDeckSpring.ts |
| imports | 450 | src/components/deck/constants.ts |
| imports | 451 | src/components/deck/index.ts |
| imports | 452 | src/components/dialog/Dialog.vue |
| imports | 453 | src/components/dialog/DialogClose.vue |
| imports | 454 | src/components/dialog/DialogContent.vue |
| imports | 455 | src/components/dialog/DialogDescription.vue |
| imports | 456 | src/components/dialog/DialogFooter.vue |
| imports | 457 | src/components/dialog/DialogHeader.vue |
| imports | 458 | src/components/dialog/DialogScrollContent.vue |
| imports | 459 | src/components/dialog/DialogTitle.vue |
| imports | 460 | src/components/dialog/DialogTrigger.vue |
| imports | 461 | src/components/dialog/index.ts |
| imports | 462 | src/components/dock/DockBackgroundToggle.vue |
| imports | 463 | src/components/dock/DockControl.vue |
| imports | 464 | src/components/dock/DockCrossfade.vue |
| imports | 465 | src/components/dock/DockLayer.vue |
| imports | 466 | src/components/dock/DockLayerGroup.vue |
| imports | 467 | src/components/dock/DockSection.vue |
| imports | 468 | src/components/dock/DockSeparator.vue |
| imports | 469 | src/components/dock/DockStack.vue |
| imports | 470 | src/components/dock/DockTrigger.vue |
| imports | 471 | src/components/dock/GlassDock.vue |
| imports | 472 | src/components/dock/README.md |
| imports | 473 | src/components/dock/composables/dockContext.ts |
| imports | 474 | src/components/dock/composables/dockCrossfadeContext.ts |
| imports | 475 | src/components/dock/composables/dockMorphContext.ts |
| imports | 476 | src/components/dock/composables/dockMorphMeasure.ts |
| imports | 477 | src/components/dock/composables/index.ts |
| imports | 478 | src/components/dock/composables/isTeleportedTarget.ts |
| imports | 479 | src/components/dock/composables/useDockClickIntegrity.ts |
| imports | 480 | src/components/dock/composables/useDockFisheye.ts |
| imports | 481 | src/components/dock/composables/useDockHold.ts |
| imports | 482 | src/components/dock/composables/useDockOverflowFit.ts |
| imports | 483 | src/components/dock/composables/useDockPopover.ts |
| imports | 484 | src/components/dock/composables/useDockSearch.ts |
| imports | 485 | src/components/dock/composables/useDockShellProps.ts |
| imports | 486 | src/components/dock/composables/useDockSpring.ts |
| imports | 487 | src/components/dock/composables/useDockState.ts |
| imports | 488 | src/components/dock/composables/useDockTouchGate.ts |
| imports | 489 | src/components/dock/constants.ts |
| imports | 490 | src/components/dock/index.ts |
| imports | 491 | src/components/drawer/Drawer.vue |
| imports | 492 | src/components/drawer/DrawerContent.vue |
| imports | 493 | src/components/drawer/DrawerDescription.vue |
| imports | 494 | src/components/drawer/DrawerFooter.vue |
| imports | 495 | src/components/drawer/DrawerHeader.vue |
| imports | 496 | src/components/drawer/DrawerOverlay.vue |
| imports | 497 | src/components/drawer/DrawerTitle.vue |
| imports | 498 | src/components/drawer/composables/drawerSnapContext.ts |
| imports | 499 | src/components/drawer/composables/useDrawerSnap.ts |
| imports | 500 | src/components/drawer/constants.ts |
| imports | 501 | src/components/drawer/index.ts |
| imports | 502 | src/components/dropdown-menu/DropdownMenu.vue |
| imports | 503 | src/components/dropdown-menu/DropdownMenuCheckboxItem.vue |
| imports | 504 | src/components/dropdown-menu/DropdownMenuContent.vue |
| imports | 505 | src/components/dropdown-menu/DropdownMenuGroup.vue |
| imports | 506 | src/components/dropdown-menu/DropdownMenuItem.vue |
| imports | 507 | src/components/dropdown-menu/DropdownMenuLabel.vue |
| imports | 508 | src/components/dropdown-menu/DropdownMenuRadioGroup.vue |
| imports | 509 | src/components/dropdown-menu/DropdownMenuRadioItem.vue |
| imports | 510 | src/components/dropdown-menu/DropdownMenuSeparator.vue |
| imports | 511 | src/components/dropdown-menu/DropdownMenuShortcut.vue |
| imports | 512 | src/components/dropdown-menu/DropdownMenuSub.vue |
| imports | 513 | src/components/dropdown-menu/DropdownMenuSubContent.vue |
| imports | 514 | src/components/dropdown-menu/DropdownMenuSubTrigger.vue |
| imports | 515 | src/components/dropdown-menu/DropdownMenuTrigger.vue |
| imports | 516 | src/components/dropdown-menu/index.ts |
| imports | 517 | src/components/dropdown-menu/useMenuTrigger.ts |
| imports | 518 | src/components/easing/EasingConfigurator.vue |
| imports | 519 | src/components/easing/EasingPicker.vue |
| imports | 520 | src/components/easing/README.md |
| imports | 521 | src/components/easing/composables/useEasingPicker.ts |
| imports | 522 | src/components/easing/constants.ts |
| imports | 523 | src/components/easing/index.ts |
| imports | 524 | src/components/expandable-container/ExpandableContainer.vue |
| imports | 525 | src/components/expandable-container/README.md |
| imports | 526 | src/components/expandable-container/index.ts |
| imports | 527 | src/components/fading-scroll/FadingScroll.vue |
| imports | 528 | src/components/fading-scroll/README.md |
| imports | 529 | src/components/fading-scroll/composables/useFadingScroll.ts |
| imports | 530 | src/components/fading-scroll/constants.ts |
| imports | 531 | src/components/fading-scroll/index.ts |
| imports | 532 | src/components/focus-scope/FocusScope.vue |
| imports | 533 | src/components/focus-scope/index.ts |
| imports | 534 | src/components/fourier-field/FourierField.vue |
| imports | 535 | src/components/fourier-field/README.md |
| imports | 536 | src/components/fourier-field/composables/fourierFieldGLSetup.ts |
| imports | 537 | src/components/fourier-field/composables/fourierFieldWGPUSetup.ts |
| imports | 538 | src/components/fourier-field/composables/uniformBridgeWGPU.ts |
| imports | 539 | src/components/fourier-field/composables/useFourierField.ts |
| imports | 540 | src/components/fourier-field/constants.ts |
| imports | 541 | src/components/fourier-field/index.ts |
| imports | 542 | src/components/fourier-field/math.ts |
| imports | 543 | src/components/fourier-field/presets.ts |
| imports | 544 | src/components/fourier-field/shaders/fourier-field.compute.wgsl.ts |
| imports | 545 | src/components/fourier-field/shaders/fourier-field.glsl.ts |
| imports | 546 | src/components/fourier-field/shaders/fourier-field.render.wgsl.ts |
| imports | 547 | src/components/fourier-field/shaders/fourier-field.ribbon.ts |
| imports | 548 | src/components/goo-filter/GooFilter.vue |
| imports | 549 | src/components/goo-filter/README.md |
| imports | 550 | src/components/goo-filter/index.ts |
| imports | 551 | src/components/handmark/HandMark.vue |
| imports | 552 | src/components/handmark/README.md |
| imports | 553 | src/components/handmark/brush.ts |
| imports | 554 | src/components/handmark/composables/useHandMark.ts |
| imports | 555 | src/components/handmark/constants.ts |
| imports | 556 | src/components/handmark/freehand.ts |
| imports | 557 | src/components/handmark/geometry.ts |
| imports | 558 | src/components/handmark/index.ts |
| imports | 559 | src/components/handmark/ink.ts |
| imports | 560 | src/components/handmark/noise.ts |
| imports | 561 | src/components/handmark/texture.ts |
| imports | 562 | src/components/handmark/types.ts |
| imports | 563 | src/components/header-ribbon/HeaderRibbon.vue |
| imports | 564 | src/components/header-ribbon/README.md |
| imports | 565 | src/components/header-ribbon/index.ts |
| imports | 566 | src/components/header-ribbon/types.ts |
| imports | 567 | src/components/icon-chip/IconChip.vue |
| imports | 568 | src/components/icon-chip/README.md |
| imports | 569 | src/components/icon-chip/index.ts |
| imports | 570 | src/components/icon-chip/types.ts |
| imports | 571 | src/components/icon-tooltip/IconTooltip.vue |
| imports | 572 | src/components/icon-tooltip/README.md |
| imports | 573 | src/components/icon-tooltip/index.ts |
| imports | 574 | src/components/index.ts |
| imports | 575 | src/components/infinite-scroll/InfiniteScroll.vue |
| imports | 576 | src/components/infinite-scroll/composables/index.ts |
| imports | 577 | src/components/infinite-scroll/composables/types.ts |
| imports | 578 | src/components/infinite-scroll/composables/useInfiniteScroll.ts |
| imports | 579 | src/components/infinite-scroll/index.ts |
| imports | 580 | src/components/input/Input.vue |
| imports | 581 | src/components/input/index.ts |
| imports | 582 | src/components/instrument-chassis/ChassisDivider.vue |
| imports | 583 | src/components/instrument-chassis/InstrumentChassis.vue |
| imports | 584 | src/components/instrument-chassis/README.md |
| imports | 585 | src/components/instrument-chassis/index.ts |
| imports | 586 | src/components/label/Label.vue |
| imports | 587 | src/components/label/index.ts |
| imports | 588 | src/components/labeled-field/LabeledField.vue |
| imports | 589 | src/components/labeled-field/LabeledInput.vue |
| imports | 590 | src/components/labeled-field/LabeledSelect.vue |
| imports | 591 | src/components/labeled-field/LabeledSlider.vue |
| imports | 592 | src/components/labeled-field/LabeledSwitch.vue |
| imports | 593 | src/components/labeled-field/README.md |
| imports | 594 | src/components/labeled-field/index.ts |
| imports | 595 | src/components/liquid-grid/LiquidGrid.vue |
| imports | 596 | src/components/liquid-grid/README.md |
| imports | 597 | src/components/liquid-grid/composables/liquidGrid.ts |
| imports | 598 | src/components/liquid-grid/composables/liquidGridGLSetup.ts |
| imports | 599 | src/components/liquid-grid/composables/liquidGridWGPUSetup.ts |
| imports | 600 | src/components/liquid-grid/composables/uniformBridgeWGPU.ts |
| imports | 601 | src/components/liquid-grid/composables/useLiquidGrid.ts |
| imports | 602 | src/components/liquid-grid/constants.ts |
| imports | 603 | src/components/liquid-grid/index.ts |
| imports | 604 | src/components/liquid-grid/shaders/liquid-grid.glsl.ts |
| imports | 605 | src/components/liquid-grid/shaders/liquid-grid.wgsl.ts |
| imports | 606 | src/components/metric-badge/MetricBadge.vue |
| imports | 607 | src/components/metric-badge/README.md |
| imports | 608 | src/components/metric-badge/index.ts |
| imports | 609 | src/components/metric-cell/MetricCell.vue |
| imports | 610 | src/components/metric-cell/README.md |
| imports | 611 | src/components/metric-cell/index.ts |
| imports | 612 | src/components/metric-stack/MetricRow.vue |
| imports | 613 | src/components/metric-stack/MetricStack.vue |
| imports | 614 | src/components/metric-stack/README.md |
| imports | 615 | src/components/metric-stack/index.ts |
| imports | 616 | src/components/notification/Notification.vue |
| imports | 617 | src/components/notification/index.ts |
| imports | 618 | src/components/number-field/NumberField.vue |
| imports | 619 | src/components/number-field/NumberFieldContent.vue |
| imports | 620 | src/components/number-field/NumberFieldDecrement.vue |
| imports | 621 | src/components/number-field/NumberFieldIncrement.vue |
| imports | 622 | src/components/number-field/NumberFieldInput.vue |
| imports | 623 | src/components/number-field/index.ts |
| imports | 624 | src/components/pager-dots/PagerDots.vue |
| imports | 625 | src/components/pager-dots/README.md |
| imports | 626 | src/components/pager-dots/composables/usePagerWorm.ts |
| imports | 627 | src/components/pager-dots/constants.ts |
| imports | 628 | src/components/pager-dots/index.ts |
| imports | 629 | src/components/pager-dots/pagerWindow.ts |
| imports | 630 | src/components/paper-backdrop/PaperBackdrop.vue |
| imports | 631 | src/components/paper-backdrop/README.md |
| imports | 632 | src/components/paper-backdrop/index.ts |
| imports | 633 | src/components/popover/Popover.vue |
| imports | 634 | src/components/popover/PopoverContent.vue |
| imports | 635 | src/components/popover/PopoverTrigger.vue |
| imports | 636 | src/components/popover/index.ts |
| imports | 637 | src/components/popover/popoverContext.ts |
| imports | 638 | src/components/progress/Progress.vue |
| imports | 639 | src/components/progress/ProgressDefault.vue |
| imports | 640 | src/components/progress/ProgressGradient.vue |
| imports | 641 | src/components/progress/ProgressLiquid.vue |
| imports | 642 | src/components/progress/ProgressSectioned.vue |
| imports | 643 | src/components/progress/index.ts |
| imports | 644 | src/components/progress/useProgressGeometry.ts |
| imports | 645 | src/components/pulse/Pulse.vue |
| imports | 646 | src/components/pulse/README.md |
| imports | 647 | src/components/pulse/index.ts |
| imports | 648 | src/components/radio-group/RadioGroup.vue |
| imports | 649 | src/components/radio-group/RadioGroupItem.vue |
| imports | 650 | src/components/radio-group/index.ts |
| imports | 651 | src/components/search/FuzzySearch.vue |
| imports | 652 | src/components/search/SearchBar.vue |
| imports | 653 | src/components/search/composables/fuzzySearchIndex.ts |
| imports | 654 | src/components/search/composables/index.ts |
| imports | 655 | src/components/search/composables/types.ts |
| imports | 656 | src/components/search/composables/useFuzzySearch.ts |
| imports | 657 | src/components/search/index.ts |
| imports | 658 | src/components/search/searchVariants.ts |
| imports | 659 | src/components/section/Section.vue |
| imports | 660 | src/components/section/index.ts |
| imports | 661 | src/components/select/Select.vue |
| imports | 662 | src/components/select/SelectContent.vue |
| imports | 663 | src/components/select/SelectGroup.vue |
| imports | 664 | src/components/select/SelectItem.vue |
| imports | 665 | src/components/select/SelectLabel.vue |
| imports | 666 | src/components/select/SelectScrollDownButton.vue |
| imports | 667 | src/components/select/SelectScrollUpButton.vue |
| imports | 668 | src/components/select/SelectSeparator.vue |
| imports | 669 | src/components/select/SelectTrigger.vue |
| imports | 670 | src/components/select/SelectValue.vue |
| imports | 671 | src/components/select/index.ts |
| imports | 672 | src/components/separator/Separator.vue |
| imports | 673 | src/components/separator/index.ts |
| imports | 674 | src/components/skeleton/Skeleton.vue |
| imports | 675 | src/components/skeleton/index.ts |
| imports | 676 | src/components/slider/Slider.vue |
| imports | 677 | src/components/slider/index.ts |
| imports | 678 | src/components/sortable-list/README.md |
| imports | 679 | src/components/sortable-list/SortableHandle.vue |
| imports | 680 | src/components/sortable-list/SortableItem.vue |
| imports | 681 | src/components/sortable-list/SortableList.vue |
| imports | 682 | src/components/sortable-list/composables/dragController.ts |
| imports | 683 | src/components/sortable-list/composables/dropResolver.ts |
| imports | 684 | src/components/sortable-list/composables/ghostRenderer.ts |
| imports | 685 | src/components/sortable-list/composables/index.ts |
| imports | 686 | src/components/sortable-list/composables/touchGate.ts |
| imports | 687 | src/components/sortable-list/composables/transitionTiming.ts |
| imports | 688 | src/components/sortable-list/composables/types.ts |
| imports | 689 | src/components/sortable-list/composables/useSortable.ts |
| imports | 690 | src/components/sortable-list/context.ts |
| imports | 691 | src/components/sortable-list/index.ts |
| imports | 692 | src/components/spa-view/README.md |
| imports | 693 | src/components/spa-view/SpaView.vue |
| imports | 694 | src/components/spa-view/index.ts |
| imports | 695 | src/components/split-chars/README.md |
| imports | 696 | src/components/split-chars/SplitChars.vue |
| imports | 697 | src/components/split-chars/index.ts |
| imports | 698 | src/components/stacked-icons/README.md |
| imports | 699 | src/components/stacked-icons/StackedIconGroup.vue |
| imports | 700 | src/components/stacked-icons/index.ts |
| imports | 701 | src/components/stacked-icons/types.ts |
| imports | 702 | src/components/status-dot/README.md |
| imports | 703 | src/components/status-dot/StatusDot.vue |
| imports | 704 | src/components/status-dot/index.ts |
| imports | 705 | src/components/surface/Surface.vue |
| imports | 706 | src/components/surface/index.ts |
| imports | 707 | src/components/switch/Switch.vue |
| imports | 708 | src/components/switch/index.ts |
| imports | 709 | src/components/table/Table.vue |
| imports | 710 | src/components/table/TableBody.vue |
| imports | 711 | src/components/table/TableCaption.vue |
| imports | 712 | src/components/table/TableCell.vue |
| imports | 713 | src/components/table/TableEmpty.vue |
| imports | 714 | src/components/table/TableHead.vue |
| imports | 715 | src/components/table/TableHeader.vue |
| imports | 716 | src/components/table/TableRow.vue |
| imports | 717 | src/components/table/index.ts |
| imports | 718 | src/components/tabs/README.md |
| imports | 719 | src/components/tabs/SegmentedTabs.vue |
| imports | 720 | src/components/tabs/composables/useEyeglassLive.ts |
| imports | 721 | src/components/tabs/composables/useTabDragMorph.ts |
| imports | 722 | src/components/tabs/composables/useTabResponsive.ts |
| imports | 723 | src/components/tabs/composables/useTabRovingFocus.ts |
| imports | 724 | src/components/tabs/constants.ts |
| imports | 725 | src/components/tabs/index.ts |
| imports | 726 | src/components/tags-input/TagsInput.vue |
| imports | 727 | src/components/tags-input/TagsInputInput.vue |
| imports | 728 | src/components/tags-input/TagsInputItem.vue |
| imports | 729 | src/components/tags-input/TagsInputItemDelete.vue |
| imports | 730 | src/components/tags-input/TagsInputItemText.vue |
| imports | 731 | src/components/tags-input/index.ts |
| imports | 732 | src/components/textarea/Textarea.vue |
| imports | 733 | src/components/textarea/index.ts |
| imports | 734 | src/components/timeline/ContinuousMarkers.vue |
| imports | 735 | src/components/timeline/ContinuousRail.vue |
| imports | 736 | src/components/timeline/ContinuousTimeline.vue |
| imports | 737 | src/components/timeline/GlassTimeline.vue |
| imports | 738 | src/components/timeline/README.md |
| imports | 739 | src/components/timeline/ScrubberTimeline.vue |
| imports | 740 | src/components/timeline/SegmentedTimeline.vue |
| imports | 741 | src/components/timeline/geometry.ts |
| imports | 742 | src/components/timeline/index.ts |
| imports | 743 | src/components/timeline/types.ts |
| imports | 744 | src/components/toast/Toast.vue |
| imports | 745 | src/components/toast/ToastAction.vue |
| imports | 746 | src/components/toast/ToastClose.vue |
| imports | 747 | src/components/toast/ToastDescription.vue |
| imports | 748 | src/components/toast/ToastTitle.vue |
| imports | 749 | src/components/toast/Toaster.vue |
| imports | 750 | src/components/toast/index.ts |
| imports | 751 | src/components/toast/use-toast.ts |
| imports | 752 | src/components/toggle-group/ToggleGroup.vue |
| imports | 753 | src/components/toggle-group/ToggleGroupItem.vue |
| imports | 754 | src/components/toggle-group/index.ts |
| imports | 755 | src/components/toggle-group/toggleGroupContext.ts |
| imports | 756 | src/components/toggle/Toggle.vue |
| imports | 757 | src/components/toggle/index.ts |
| imports | 758 | src/components/tooltip/Tooltip.vue |
| imports | 759 | src/components/tooltip/TooltipContent.vue |
| imports | 760 | src/components/tooltip/TooltipProvider.vue |
| imports | 761 | src/components/tooltip/TooltipTrigger.vue |
| imports | 762 | src/components/tooltip/index.ts |
| imports | 763 | src/components/typewriter/TypewriterText.vue |
| imports | 764 | src/components/typewriter/composables/index.ts |
| imports | 765 | src/components/typewriter/composables/useTypewriter.ts |
| imports | 766 | src/components/typewriter/index.ts |
| imports | 767 | src/components/typewriter/types.ts |
| imports | 768 | src/components/typewriter/utils/keyboard.ts |
| imports | 769 | src/components/typewriter/utils/pausePatterns.ts |
| imports | 770 | src/components/typewriter/utils/timing.ts |
| imports | 771 | src/components/typewriter/utils/typoStateMachine.ts |
| imports | 772 | src/components/watercolor-dot/WatercolorDot.vue |
| imports | 773 | src/components/watercolor-dot/index.ts |
| imports | 774 | src/components/watercolor-dot/prng.ts |
| imports | 775 | src/components/watercolor-dot/useWatercolorBlob.ts |
| imports | 776 | src/composables/color/accent-tone-solve.ts |
| imports | 777 | src/composables/color/index.ts |
| imports | 778 | src/composables/color/spectrum-walk.ts |
| imports | 779 | src/composables/color/useAccentTone.ts |
| imports | 780 | src/composables/context/createContext.ts |
| imports | 781 | src/composables/context/index.ts |
| imports | 782 | src/composables/dark/darkModeSyncScript.ts |
| imports | 783 | src/composables/dark/index.ts |
| imports | 784 | src/composables/dark/installDarkModeSync.ts |
| imports | 785 | src/composables/dark/useGlobalDark.ts |
| imports | 786 | src/composables/dom/index.ts |
| imports | 787 | src/composables/dom/useBreakpoint.ts |
| imports | 788 | src/composables/dom/useClipboard.ts |
| imports | 789 | src/composables/dom/useDocumentVisibility.ts |
| imports | 790 | src/composables/dom/useDragVelocity.ts |
| imports | 791 | src/composables/dom/useIdleReady.ts |
| imports | 792 | src/composables/dom/useResizeObserver.ts |
| imports | 793 | src/composables/dom/useResolveTokenColor.ts |
| imports | 794 | src/composables/dom/useTokenColor.ts |
| imports | 795 | src/composables/dom/useTouchGate.ts |
| imports | 796 | src/composables/dom/useUserInvalidAria.ts |
| imports | 797 | src/composables/dom/useViewportReady.ts |
| imports | 798 | src/composables/glass/ambientHueHistogram.ts |
| imports | 799 | src/composables/glass/backdropLuminanceSample.ts |
| imports | 800 | src/composables/glass/backdropSampleMath.ts |
| imports | 801 | src/composables/glass/canvas2d/index.ts |
| imports | 802 | src/composables/glass/canvas2d/resolveCanvasColor.ts |
| imports | 803 | src/composables/glass/canvas2d/useCanvas2D.ts |
| imports | 804 | src/composables/glass/index.ts |
| imports | 805 | src/composables/glass/textureUpload.ts |
| imports | 806 | src/composables/glass/useGlassBackdropLuminance.ts |
| imports | 807 | src/composables/glass/useSpecularPointer.ts |
| imports | 808 | src/composables/glass/useSpecularTracking.ts |
| imports | 809 | src/composables/glass/vSpecular.ts |
| imports | 810 | src/composables/glass/wave/index.ts |
| imports | 811 | src/composables/glass/wave/waveField.glsl.ts |
| imports | 812 | src/composables/glass/wave/waveField.ts |
| imports | 813 | src/composables/glass/wave/waveField.wgsl.ts |
| imports | 814 | src/composables/glass/webgl/backingSize.ts |
| imports | 815 | src/composables/glass/webgl/compile.ts |
| imports | 816 | src/composables/glass/webgl/createCanvasLifecycle.ts |
| imports | 817 | src/composables/glass/webgl/shaders/flow.glsl.ts |
| imports | 818 | src/composables/glass/webgl/shaders/flow.wgsl.ts |
| imports | 819 | src/composables/glass/webgl/shaders/glass-refract.glsl.ts |
| imports | 820 | src/composables/glass/webgl/shaders/procedural-color.glsl.ts |
| imports | 821 | src/composables/glass/webgl/useWebGLCanvas.ts |
| imports | 822 | src/composables/glass/webgl/visibility.ts |
| imports | 823 | src/composables/glass/webgpu/glassShader.wgsl |
| imports | 824 | src/composables/glass/webgpu/index.ts |
| imports | 825 | src/composables/glass/webgpu/useGpuSubstrate.ts |
| imports | 826 | src/composables/glass/webgpu/useWebGPUCanvas.ts |
| imports | 827 | src/composables/glass/webgpu/webgpuCanvasTypes.ts |
| imports | 828 | src/composables/glass/webgpu/webgpuDevice.ts |
| imports | 829 | src/composables/index.ts |
| imports | 830 | src/composables/keyboard/index.ts |
| imports | 831 | src/composables/keyboard/useKeyboardShortcuts.ts |
| imports | 832 | src/composables/motion/README.md |
| imports | 833 | src/composables/motion/bloomUpField.ts |
| imports | 834 | src/composables/motion/constants.ts |
| imports | 835 | src/composables/motion/core/index.ts |
| imports | 836 | src/composables/motion/core/writeVelocityWeight.ts |
| imports | 837 | src/composables/motion/curves.ts |
| imports | 838 | src/composables/motion/gooBarbellGeometry.ts |
| imports | 839 | src/composables/motion/index.ts |
| imports | 840 | src/composables/motion/morphSignatures.ts |
| imports | 841 | src/composables/motion/motionTempo.ts |
| imports | 842 | src/composables/motion/pointerFieldMappings.ts |
| imports | 843 | src/composables/motion/scrollReader.ts |
| imports | 844 | src/composables/motion/springPresets.ts |
| imports | 845 | src/composables/motion/suite.ts |
| imports | 846 | src/composables/motion/supportsCssTimeline.ts |
| imports | 847 | src/composables/motion/useAnimatedNumber.ts |
| imports | 848 | src/composables/motion/useAnimatedNumberMap.ts |
| imports | 849 | src/composables/motion/useBloomUp.ts |
| imports | 850 | src/composables/motion/useCharStagger.ts |
| imports | 851 | src/composables/motion/useCountup.ts |
| imports | 852 | src/composables/motion/useDockCtaReceive.ts |
| imports | 853 | src/composables/motion/useDragMorph.ts |
| imports | 854 | src/composables/motion/useElementMorph.ts |
| imports | 855 | src/composables/motion/useGooMorph.ts |
| imports | 856 | src/composables/motion/useIntersectionPause.ts |
| imports | 857 | src/composables/motion/useLeadTrail.ts |
| imports | 858 | src/composables/motion/useLiquidFlex.ts |
| imports | 859 | src/composables/motion/useLiquidPress.ts |
| imports | 860 | src/composables/motion/useLiquidReveal.ts |
| imports | 861 | src/composables/motion/useNumericTransition.ts |
| imports | 862 | src/composables/motion/usePointerVelocityField.ts |
| imports | 863 | src/composables/motion/usePrioritizedTask.ts |
| imports | 864 | src/composables/motion/useRAFLoop.ts |
| imports | 865 | src/composables/motion/useRoutePointer.ts |
| imports | 866 | src/composables/motion/useScrollChrome.ts |
| imports | 867 | src/composables/motion/useScrollPin.ts |
| imports | 868 | src/composables/motion/useScrollProgress.ts |
| imports | 869 | src/composables/motion/useScrollScene.ts |
| imports | 870 | src/composables/motion/useScrollTrigger.ts |
| imports | 871 | src/composables/motion/useSelectionGroup.ts |
| imports | 872 | src/composables/motion/useSelectionIndicator.ts |
| imports | 873 | src/composables/motion/useSpring.ts |
| imports | 874 | src/composables/motion/useSpringMount.ts |
| imports | 875 | src/composables/motion/useSpringPress.ts |
| imports | 876 | src/composables/motion/useStagger.ts |
| imports | 877 | src/composables/motion/useStaggerReveal.ts |
| imports | 878 | src/composables/motion/useTextHighlight.ts |
| imports | 879 | src/composables/motion/useViewTransition.ts |
| imports | 880 | src/composables/motion/useYieldToMain.ts |
| imports | 881 | src/composables/motion/vReveal.ts |
| imports | 882 | src/composables/reactive/index.ts |
| imports | 883 | src/composables/reactive/useInterval.ts |
| imports | 884 | src/composables/reactive/useTimer.ts |
| imports | 885 | src/composables/sidebar/index.ts |
| imports | 886 | src/composables/sidebar/types.ts |
| imports | 887 | src/composables/sidebar/useClickDelegate.ts |
| imports | 888 | src/composables/sidebar/useLazyLoader.ts |
| imports | 889 | src/composables/sidebar/useScrollTo.ts |
| imports | 890 | src/composables/sidebar/useScrollTracker.ts |
| imports | 891 | src/composables/sidebar/useSidebarFollow.ts |
| imports | 892 | src/composables/sidebar/useSidebarState.ts |
| imports | 893 | src/composables/sidebar/useTreeIndex.ts |
| imports | 894 | src/composables/virtual/index.ts |
| imports | 895 | src/composables/virtual/useVirtualSectionWindow.ts |
| imports | 896 | src/composables/virtual/useWindowedStore.ts |
| imports | 897 | src/composables/virtual/virtualSectionLayout.ts |
| imports | 898 | src/dark.ts |
| imports | 899 | src/fonts/README.md |
| imports | 900 | src/fonts/fira-code/OFL.txt |
| imports | 901 | src/fonts/fira-code/fira-code-latin-ext.woff2 |
| imports | 902 | src/fonts/fira-code/fira-code-latin.woff2 |
| imports | 903 | src/fonts/plus-jakarta-sans/OFL.txt |
| imports | 904 | src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin-ext.woff2 |
| imports | 905 | src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin.woff2 |
| imports | 906 | src/forms.ts |
| imports | 907 | src/html-attributes.d.ts |
| imports | 908 | src/index.ts |
| imports | 909 | src/infinite-scroll.ts |
| imports | 910 | src/keyboard.ts |
| imports | 911 | src/motion-core.ts |
| imports | 912 | src/motion.ts |
| imports | 913 | src/sidebar.ts |
| imports | 914 | src/styles/animations.css |
| imports | 915 | src/styles/border-progress.css |
| imports | 916 | src/styles/card-scroll.css |
| imports | 917 | src/styles/cards.css |
| imports | 918 | src/styles/completion-seal.css |
| imports | 919 | src/styles/configurator.css |
| imports | 920 | src/styles/dialog-placement.css |
| imports | 921 | src/styles/dock-controls.css |
| imports | 922 | src/styles/dock-controls/dark-mode-toggle.css |
| imports | 923 | src/styles/dock-controls/icon-button.css |
| imports | 924 | src/styles/dock-controls/tab-button.css |
| imports | 925 | src/styles/dock-controls/touch-floor.css |
| imports | 926 | src/styles/dock-controls/triggers.css |
| imports | 927 | src/styles/dock.css |
| imports | 928 | src/styles/dock/adaptive-legibility.css |
| imports | 929 | src/styles/dock/crossfade.css |
| imports | 930 | src/styles/dock/cta-seat.css |
| imports | 931 | src/styles/dock/density.css |
| imports | 932 | src/styles/dock/dock.css |
| imports | 933 | src/styles/dock/fisheye.css |
| imports | 934 | src/styles/dock/layer-group.css |
| imports | 935 | src/styles/dock/layers.css |
| imports | 936 | src/styles/dock/morph.css |
| imports | 937 | src/styles/dock/overflow.css |
| imports | 938 | src/styles/dock/popover.css |
| imports | 939 | src/styles/dock/search.css |
| imports | 940 | src/styles/dock/section.css |
| imports | 941 | src/styles/dock/shape.css |
| imports | 942 | src/styles/dock/shell-regions.css |
| imports | 943 | src/styles/dock/shell.css |
| imports | 944 | src/styles/draw-in.css |
| imports | 945 | src/styles/drawer.css |
| imports | 946 | src/styles/feedback-tone.css |
| imports | 947 | src/styles/fonts.css |
| imports | 948 | src/styles/glass-refract.css |
| imports | 949 | src/styles/glass-specular-track.css |
| imports | 950 | src/styles/glass.css |
| imports | 951 | src/styles/glass/a11y-fallback.css |
| imports | 952 | src/styles/glass/accent-tone.css |
| imports | 953 | src/styles/glass/control-surfaces.css |
| imports | 954 | src/styles/glass/deep.css |
| imports | 955 | src/styles/glass/defined.css |
| imports | 956 | src/styles/glass/glass-atom.css |
| imports | 957 | src/styles/glass/glass-capsule.css |
| imports | 958 | src/styles/glass/glass-chip.css |
| imports | 959 | src/styles/glass/grain-overlay.css |
| imports | 960 | src/styles/glass/ladder-undershadow.css |
| imports | 961 | src/styles/glass/ladder.css |
| imports | 962 | src/styles/glass/liquid-enter.css |
| imports | 963 | src/styles/glass/liquid-fill.css |
| imports | 964 | src/styles/glass/material.css |
| imports | 965 | src/styles/glass/progress-rail.css |
| imports | 966 | src/styles/glass/reveal.css |
| imports | 967 | src/styles/glass/rim.css |
| imports | 968 | src/styles/glass/squircle.css |
| imports | 969 | src/styles/glass/surface-axis.css |
| imports | 970 | src/styles/glass/surfaces-pager.css |
| imports | 971 | src/styles/glass/surfaces.css |
| imports | 972 | src/styles/icon-chip.css |
| imports | 973 | src/styles/index.css |
| imports | 974 | src/styles/instrument-chassis.css |
| imports | 975 | src/styles/menu.css |
| imports | 976 | src/styles/paper.css |
| imports | 977 | src/styles/scroll-choreography.css |
| imports | 978 | src/styles/scroll-chrome.css |
| imports | 979 | src/styles/scroll-driven.css |
| imports | 980 | src/styles/segmented-tabs.css |
| imports | 981 | src/styles/select.css |
| imports | 982 | src/styles/tabs/segmented-tabs-drag.css |
| imports | 983 | src/styles/theme.css |
| imports | 984 | src/styles/theme/bridges.css |
| imports | 985 | src/styles/theme/dark.css |
| imports | 986 | src/styles/theme/literals.css |
| imports | 987 | src/styles/theme/radius.css |
| imports | 988 | src/styles/tokens.css |
| imports | 989 | src/styles/tokens/color-radius.css |
| imports | 990 | src/styles/tokens/dark-arm-glass.css |
| imports | 991 | src/styles/tokens/dark-arm.css |
| imports | 992 | src/styles/tokens/glass-deep.css |
| imports | 993 | src/styles/tokens/glass-fx.css |
| imports | 994 | src/styles/tokens/glass.css |
| imports | 995 | src/styles/tokens/light-dark.css |
| imports | 996 | src/styles/tokens/motion-registers.css |
| imports | 997 | src/styles/tokens/offsets.css |
| imports | 998 | src/styles/tokens/on-glass-fg.css |
| imports | 999 | src/styles/tokens/property-regs-specular.css |
| imports | 1000 | src/styles/tokens/property-regs.css |
| imports | 1001 | src/styles/tokens/scale-paper.css |
| imports | 1002 | src/styles/tokens/scheme-motion.css |
| imports | 1003 | src/styles/tokens/scheme-spring.css |
| imports | 1004 | src/styles/tokens/scroll-tokens.css |
| imports | 1005 | src/styles/tokens/shadow.css |
| imports | 1006 | src/styles/tokens/sizing-config.css |
| imports | 1007 | src/styles/tokens/sizing.css |
| imports | 1008 | src/styles/transitions.css |
| imports | 1009 | src/styles/typography.css |
| imports | 1010 | src/styles/typography/scale.css |
| imports | 1011 | src/styles/typography/semantic.css |
| imports | 1012 | src/styles/typography/utilities.css |
| imports | 1013 | src/styles/utilities.css |
| imports | 1014 | src/styles/utilities/a11y-overrides.css |
| imports | 1015 | src/styles/utilities/animate.css |
| imports | 1016 | src/styles/utilities/base-misc.css |
| imports | 1017 | src/styles/utilities/base.css |
| imports | 1018 | src/styles/utilities/btn.css |
| imports | 1019 | src/styles/utilities/components.css |
| imports | 1020 | src/styles/utilities/metal.css |
| imports | 1021 | src/styles/view-transition.css |
| imports | 1022 | src/styles/viz-reveal.css |
| imports | 1023 | src/subpaths/animated-digit.ts |
| imports | 1024 | src/subpaths/aurora.ts |
| imports | 1025 | src/subpaths/badge.ts |
| imports | 1026 | src/subpaths/blob-config.ts |
| imports | 1027 | src/subpaths/blob.ts |
| imports | 1028 | src/subpaths/button.ts |
| imports | 1029 | src/subpaths/canvas.ts |
| imports | 1030 | src/subpaths/card.ts |
| imports | 1031 | src/subpaths/chip.ts |
| imports | 1032 | src/subpaths/collapsible.ts |
| imports | 1033 | src/subpaths/color-swatch.ts |
| imports | 1034 | src/subpaths/color.ts |
| imports | 1035 | src/subpaths/command.ts |
| imports | 1036 | src/subpaths/completion-seal.ts |
| imports | 1037 | src/subpaths/configurator.ts |
| imports | 1038 | src/subpaths/constellation.ts |
| imports | 1039 | src/subpaths/controls.ts |
| imports | 1040 | src/subpaths/data-table.ts |
| imports | 1041 | src/subpaths/deck.ts |
| imports | 1042 | src/subpaths/dialog.ts |
| imports | 1043 | src/subpaths/dock.ts |
| imports | 1044 | src/subpaths/dom.ts |
| imports | 1045 | src/subpaths/drawer.ts |
| imports | 1046 | src/subpaths/dropdown-menu.ts |
| imports | 1047 | src/subpaths/easing.ts |
| imports | 1048 | src/subpaths/expandable-container.ts |
| imports | 1049 | src/subpaths/fading-scroll.ts |
| imports | 1050 | src/subpaths/focus-scope.ts |
| imports | 1051 | src/subpaths/fourier-field.ts |
| imports | 1052 | src/subpaths/fourier-math.ts |
| imports | 1053 | src/subpaths/handmark.ts |
| imports | 1054 | src/subpaths/header-ribbon.ts |
| imports | 1055 | src/subpaths/icon-chip.ts |
| imports | 1056 | src/subpaths/icon-tooltip.ts |
| imports | 1057 | src/subpaths/instrument-chassis.ts |
| imports | 1058 | src/subpaths/label.ts |
| imports | 1059 | src/subpaths/labeled-field.ts |
| imports | 1060 | src/subpaths/liquid-grid.ts |
| imports | 1061 | src/subpaths/metric-badge.ts |
| imports | 1062 | src/subpaths/metric-cell.ts |
| imports | 1063 | src/subpaths/metric-stack.ts |
| imports | 1064 | src/subpaths/motion-curves.ts |
| imports | 1065 | src/subpaths/notification.ts |
| imports | 1066 | src/subpaths/number-field.ts |
| imports | 1067 | src/subpaths/pager-dots.ts |
| imports | 1068 | src/subpaths/paper-backdrop.ts |
| imports | 1069 | src/subpaths/popover.ts |
| imports | 1070 | src/subpaths/progress.ts |
| imports | 1071 | src/subpaths/pulse.ts |
| imports | 1072 | src/subpaths/reactive.ts |
| imports | 1073 | src/subpaths/search.ts |
| imports | 1074 | src/subpaths/select.ts |
| imports | 1075 | src/subpaths/separator.ts |
| imports | 1076 | src/subpaths/slider.ts |
| imports | 1077 | src/subpaths/sortable-list.ts |
| imports | 1078 | src/subpaths/spa-view.ts |
| imports | 1079 | src/subpaths/stacked-icons.ts |
| imports | 1080 | src/subpaths/status-dot.ts |
| imports | 1081 | src/subpaths/surface.ts |
| imports | 1082 | src/subpaths/switch.ts |
| imports | 1083 | src/subpaths/tabs.ts |
| imports | 1084 | src/subpaths/timeline.ts |
| imports | 1085 | src/subpaths/toast.ts |
| imports | 1086 | src/subpaths/toggle-group.ts |
| imports | 1087 | src/subpaths/tooltip.ts |
| imports | 1088 | src/subpaths/typewriter.ts |
| imports | 1089 | src/subpaths/watercolor-dot.ts |
| imports | 1090 | src/tokens.ts |
| imports | 1091 | tests-visual/.gitignore |
| imports | 1092 | tests-visual/_aur-vangogh-harness.html |
| imports | 1093 | tests-visual/_aur-vangogh-harness.ts |
| imports | 1094 | tests-visual/_cfg-readback.spec.ts |
| imports | 1095 | tests-visual/_cohere-capture.spec.ts |
| imports | 1096 | tests-visual/_cohere-debug.spec.ts |
| imports | 1097 | tests-visual/_cohere-shadow-debug.spec.ts |
| imports | 1098 | tests-visual/_dock-context-capture.spec.ts |
| imports | 1099 | tests-visual/_egg-capture.spec.ts |
| imports | 1100 | tests-visual/_fix-glassui-dark-capture.spec.ts |
| imports | 1101 | tests-visual/_metric-zero-capture.spec.ts |
| imports | 1102 | tests-visual/_prim-polish-capture.spec.ts |
| imports | 1103 | tests-visual/_r4-shell-config-capture.spec.ts |
| imports | 1104 | tests-visual/_sb-stage-capture.spec.ts |
| imports | 1105 | tests-visual/_sb1-capture.spec.ts |
| imports | 1106 | tests-visual/_veil-capture.spec.ts |
| imports | 1107 | tests-visual/_wdelta0-capture.spec.ts |
| imports | 1108 | tests-visual/a11y-slider.spec.ts |
| imports | 1109 | tests-visual/a11y-splitchars.spec.ts |
| imports | 1110 | tests-visual/adaptive-glass-live.spec.ts |
| imports | 1111 | tests-visual/adaptive-glass.spec.ts |
| imports | 1112 | tests-visual/affordance-contrast-gold.spec.ts |
| imports | 1113 | tests-visual/affordance-map.spec.ts |
| imports | 1114 | tests-visual/aria-orientation.spec.ts |
| imports | 1115 | tests-visual/atlas-flip.spec.ts |
| imports | 1116 | tests-visual/aurora-arresting-readback.ts |
| imports | 1117 | tests-visual/aurora-arresting.spec.ts |
| imports | 1118 | tests-visual/aurora-atoms-render.spec.ts |
| imports | 1119 | tests-visual/aurora-entrance.spec.ts |
| imports | 1120 | tests-visual/aurora-mediums-substrate.spec.ts |
| imports | 1121 | tests-visual/aurora-painterly-statistics.spec.ts |
| imports | 1122 | tests-visual/aurora-studio.spec.ts |
| imports | 1123 | tests-visual/aurora-swraster.spec.ts |
| imports | 1124 | tests-visual/aurora-vibrancy.spec.ts |
| imports | 1125 | tests-visual/auth-shell-bg.spec.ts |
| imports | 1126 | tests-visual/ba-animate.spec.ts |
| imports | 1127 | tests-visual/badge-align.spec.ts |
| imports | 1128 | tests-visual/blob-config-delta.spec.ts |
| imports | 1129 | tests-visual/blob-mood-live.spec.ts |
| imports | 1130 | tests-visual/blob-page.spec.ts |
| imports | 1131 | tests-visual/blob-pause-seam.spec.ts |
| imports | 1132 | tests-visual/blob-render.spec.ts |
| imports | 1133 | tests-visual/blob-studio.spec.ts |
| imports | 1134 | tests-visual/blob-warm-default.spec.ts |
| imports | 1135 | tests-visual/blob3-interaction-capture.spec.ts |
| imports | 1136 | tests-visual/border-progress.spec.ts |
| imports | 1137 | tests-visual/button-glass.spec.ts |
| imports | 1138 | tests-visual/card-composite.spec.ts |
| imports | 1139 | tests-visual/card-padding.spec.ts |
| imports | 1140 | tests-visual/carousel-rebuild.spec.ts |
| imports | 1141 | tests-visual/code-blocks.spec.ts |
| imports | 1142 | tests-visual/coherence-congruence.spec.ts |
| imports | 1143 | tests-visual/completion-seal.spec.ts |
| imports | 1144 | tests-visual/config-chassis.spec.ts |
| imports | 1145 | tests-visual/config-in-sheet.spec.ts |
| imports | 1146 | tests-visual/config-right.spec.ts |
| imports | 1147 | tests-visual/constellation-egg-live.spec.ts |
| imports | 1148 | tests-visual/constellation-gen-live.spec.ts |
| imports | 1149 | tests-visual/constellation-refit-live.spec.ts |
| imports | 1150 | tests-visual/constellation-warp-live.spec.ts |
| imports | 1151 | tests-visual/constellation.spec.ts |
| imports | 1152 | tests-visual/control-tokens.spec.ts |
| imports | 1153 | tests-visual/css-critical.spec.ts |
| imports | 1154 | tests-visual/customizability.spec.ts |
| imports | 1155 | tests-visual/dark-material.spec.ts |
| imports | 1156 | tests-visual/dark-semantic-contrast.spec.ts |
| imports | 1157 | tests-visual/deck-slide.spec.ts |
| imports | 1158 | tests-visual/demo-affordances.spec.ts |
| imports | 1159 | tests-visual/demo-control-live.spec.ts |
| imports | 1160 | tests-visual/demo-design.spec.ts |
| imports | 1161 | tests-visual/desktop-fluid-type.spec.ts |
| imports | 1162 | tests-visual/dialog-glass.spec.ts |
| imports | 1163 | tests-visual/disclosure-rotate.spec.ts |
| imports | 1164 | tests-visual/display-tracking.spec.ts |
| imports | 1165 | tests-visual/dock-animation-live.spec.ts |
| imports | 1166 | tests-visual/dock-cockpit.spec.ts |
| imports | 1167 | tests-visual/dock-items-lag-capture.spec.ts |
| imports | 1168 | tests-visual/dock-luma-share.spec.ts |
| imports | 1169 | tests-visual/dock-morph-family.spec.ts |
| imports | 1170 | tests-visual/dock-morph-insitu.spec.ts |
| imports | 1171 | tests-visual/dock-plate-clearance.spec.ts |
| imports | 1172 | tests-visual/dock-rail-cohesion.spec.ts |
| imports | 1173 | tests-visual/dock-sections.spec.ts |
| imports | 1174 | tests-visual/dock-with-slider-live.spec.ts |
| imports | 1175 | tests-visual/dock-wrap-content-driven.spec.ts |
| imports | 1176 | tests-visual/dockmorph-cta.spec.ts |
| imports | 1177 | tests-visual/drag-morph.spec.ts |
| imports | 1178 | tests-visual/easing-primitive.spec.ts |
| imports | 1179 | tests-visual/emission.spec.ts |
| imports | 1180 | tests-visual/esc-stack.spec.ts |
| imports | 1181 | tests-visual/expandable-container.spec.ts |
| imports | 1182 | tests-visual/eyebrow-union.spec.ts |
| imports | 1183 | tests-visual/fading-scroll.spec.ts |
| imports | 1184 | tests-visual/fixtures/aurora-ref-mesh-gradient.png |
| imports | 1185 | tests-visual/fixtures/aurora-ref-oil-pastel.png |
| imports | 1186 | tests-visual/fixtures/aurora-ref-skyscape.png |
| imports | 1187 | tests-visual/fixtures/blob-default-charcoal-HEAD.png |
| imports | 1188 | tests-visual/fixtures/dock-entering-child-lag.html |
| imports | 1189 | tests-visual/fixtures/starry-night-crop.png |
| imports | 1190 | tests-visual/font-cascade-live.spec.ts |
| imports | 1191 | tests-visual/forced-colors-skin.spec.ts |
| imports | 1192 | tests-visual/ghost-dashed.spec.ts |
| imports | 1193 | tests-visual/glass-accent.spec.ts |
| imports | 1194 | tests-visual/glass-cal.spec.ts |
| imports | 1195 | tests-visual/glass-cohesion.spec.ts |
| imports | 1196 | tests-visual/glass-depth.spec.ts |
| imports | 1197 | tests-visual/glass-glow-fix.spec.ts |
| imports | 1198 | tests-visual/glass-identity.spec.ts |
| imports | 1199 | tests-visual/glass-legibility.spec.ts |
| imports | 1200 | tests-visual/glass-material-demo.spec.ts |
| imports | 1201 | tests-visual/glass-prune.spec.ts |
| imports | 1202 | tests-visual/goo-dot.spec.ts |
| imports | 1203 | tests-visual/goo-redress.spec.ts |
| imports | 1204 | tests-visual/gooblob-meatball.spec.ts |
| imports | 1205 | tests-visual/gooblob-plain.spec.ts |
| imports | 1206 | tests-visual/handmark.spec.ts |
| imports | 1207 | tests-visual/hierarchy.spec.ts |
| imports | 1208 | tests-visual/icon-chip.spec.ts |
| imports | 1209 | tests-visual/lensing.spec.ts |
| imports | 1210 | tests-visual/liquid-grid-viz.spec.ts |
| imports | 1211 | tests-visual/liquid-hover.spec.ts |
| imports | 1212 | tests-visual/liquid-reveal.spec.ts |
| imports | 1213 | tests-visual/liquid-weight-default.spec.ts |
| imports | 1214 | tests-visual/menu-glass.spec.ts |
| imports | 1215 | tests-visual/metal-shimmer.spec.ts |
| imports | 1216 | tests-visual/metric-hover.spec.ts |
| imports | 1217 | tests-visual/motion-axis.spec.ts |
| imports | 1218 | tests-visual/motion-demo.spec.ts |
| imports | 1219 | tests-visual/motion-one-clock.spec.ts |
| imports | 1220 | tests-visual/motion2.spec.ts |
| imports | 1221 | tests-visual/nav-dock-fix.spec.ts |
| imports | 1222 | tests-visual/nested-backdrop-budget.spec.ts |
| imports | 1223 | tests-visual/no-gray.spec.ts |
| imports | 1224 | tests-visual/no-shadcn-default.spec.ts |
| imports | 1225 | tests-visual/on-glass-fg.spec.ts |
| imports | 1226 | tests-visual/package.json |
| imports | 1227 | tests-visual/page-chassis.spec.ts |
| imports | 1228 | tests-visual/page-hierarchy.spec.ts |
| imports | 1229 | tests-visual/pager-ring.spec.ts |
| imports | 1230 | tests-visual/pager-worm.spec.ts |
| imports | 1231 | tests-visual/paper-grid.spec.ts |
| imports | 1232 | tests-visual/perf-producer.spec.ts |
| imports | 1233 | tests-visual/phase-palette.spec.ts |
| imports | 1234 | tests-visual/pi-manifest.ts |
| imports | 1235 | tests-visual/pi-runner-manifest.mjs |
| imports | 1236 | tests-visual/playwright.config.ts |
| imports | 1237 | tests-visual/press-unify.spec.ts |
| imports | 1238 | tests-visual/progress-gradient.spec.ts |
| imports | 1239 | tests-visual/radio-fix.spec.ts |
| imports | 1240 | tests-visual/reflect-aurora-selects.spec.ts |
| imports | 1241 | tests-visual/reflect-aurora.spec.ts |
| imports | 1242 | tests-visual/reflect-medium.spec.ts |
| imports | 1243 | tests-visual/reflect-medium2.spec.ts |
| imports | 1244 | tests-visual/register-ios.spec.ts |
| imports | 1245 | tests-visual/safari-webgl.spec.ts |
| imports | 1246 | tests-visual/scroll-motion.spec.ts |
| imports | 1247 | tests-visual/search-custom.spec.ts |
| imports | 1248 | tests-visual/search.spec.ts |
| imports | 1249 | tests-visual/selection-card.spec.ts |
| imports | 1250 | tests-visual/separator.spec.ts |
| imports | 1251 | tests-visual/served-app-sentinel.ts |
| imports | 1252 | tests-visual/shadow-grammar.spec.ts |
| imports | 1253 | tests-visual/sheet-inset.spec.ts |
| imports | 1254 | tests-visual/sheet-radius.spec.ts |
| imports | 1255 | tests-visual/shell-config.spec.ts |
| imports | 1256 | tests-visual/shell-hold.spec.ts |
| imports | 1257 | tests-visual/shell-identity.spec.ts |
| imports | 1258 | tests-visual/slider-spectrum-fallback.spec.ts |
| imports | 1259 | tests-visual/specular-coalesce.spec.ts |
| imports | 1260 | tests-visual/spring-ease.spec.ts |
| imports | 1261 | tests-visual/squircle-language.spec.ts |
| imports | 1262 | tests-visual/stage-field-clamp.spec.ts |
| imports | 1263 | tests-visual/stage.spec.ts |
| imports | 1264 | tests-visual/storybook-meta.spec.ts |
| imports | 1265 | tests-visual/substrate-cohesion.spec.ts |
| imports | 1266 | tests-visual/substrate-paints-color.spec.ts |
| imports | 1267 | tests-visual/suffuse.spec.ts |
| imports | 1268 | tests-visual/suffuse2.spec.ts |
| imports | 1269 | tests-visual/surface-axis.spec.ts |
| imports | 1270 | tests-visual/tabs-std.spec.ts |
| imports | 1271 | tests-visual/teal-navy-purge.spec.ts |
| imports | 1272 | tests-visual/touch-target.spec.ts |
| imports | 1273 | tests-visual/tunable-anim.spec.ts |
| imports | 1274 | tests-visual/viz-configurator-suite.spec.ts |
| imports | 1275 | tests-visual/viz-fourier-ribbon.spec.ts |
| imports | 1276 | tests-visual/viz-interaction.spec.ts |
| imports | 1277 | tests-visual/viz-paint-records.spec.ts |
| imports | 1278 | tests-visual/w38-binding.spec.ts |
| imports | 1279 | tests-visual/w38-w47-verify.spec.ts |
| imports | 1280 | tests-visual/webgpu-everywhere.spec.ts |
| imports | 1281 | tests/components.smoke.spec.ts |
| imports | 1282 | tests/components/custom/animated-digit/AnimatedDigit.test.ts |
| imports | 1283 | tests/components/custom/aurora/atoms.test.ts |
| imports | 1284 | tests/components/custom/aurora/color-equivalence.test.ts |
| imports | 1285 | tests/components/custom/aurora/derive-aurora.test.ts |
| imports | 1286 | tests/components/custom/aurora/derive-color.test.ts |
| imports | 1287 | tests/components/custom/aurora/interaction-prm.test.ts |
| imports | 1288 | tests/components/custom/aurora/mediums-extraction.test.ts |
| imports | 1289 | tests/components/custom/aurora/painterly.test.ts |
| imports | 1290 | tests/components/custom/aurora/render-mode.test.ts |
| imports | 1291 | tests/components/custom/blob/blob-color-equivalence.test.ts |
| imports | 1292 | tests/components/custom/blob/metaball-color.glsl-port.ts |
| imports | 1293 | tests/components/custom/blob/resolveColor.test.ts |
| imports | 1294 | tests/components/custom/border-progress/spectrum-walk.test.ts |
| imports | 1295 | tests/components/custom/configurator/ConfiguratorLayer.model.test.ts |
| imports | 1296 | tests/components/custom/constellation/constellationField.test.ts |
| imports | 1297 | tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts |
| imports | 1298 | tests/components/custom/dock/DockBackgroundToggle.a11y.test.ts |
| imports | 1299 | tests/components/custom/dock/DockLayerRail.a11y.test.ts |
| imports | 1300 | tests/components/custom/dock/GlassDock.motion-parity.test.ts |
| imports | 1301 | tests/components/custom/dock/GlassDock.scroll-overflow.test.ts |
| imports | 1302 | tests/components/custom/dock/GlassDock.touch-gate.test.ts |
| imports | 1303 | tests/components/custom/dock/GlassDock.vertical-collapse.test.ts |
| imports | 1304 | tests/components/custom/dock/GlassDock.vt-names.test.ts |
| imports | 1305 | tests/components/custom/dock/dockCrossfadeContext.readonly.test-d.ts |
| imports | 1306 | tests/components/custom/fourier-field/FourierField.smoke.test.ts |
| imports | 1307 | tests/components/custom/handmark/HandMark.test.ts |
| imports | 1308 | tests/components/custom/handmark/brush.test.ts |
| imports | 1309 | tests/components/custom/handmark/geometry.test.ts |
| imports | 1310 | tests/components/custom/handmark/highlight.test.ts |
| imports | 1311 | tests/components/custom/handmark/hull-guard.test.ts |
| imports | 1312 | tests/components/custom/handmark/morphology.test.ts |
| imports | 1313 | tests/components/custom/handmark/texture.test.ts |
| imports | 1314 | tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts |
| imports | 1315 | tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts |
| imports | 1316 | tests/components/custom/metric-badge/zero-value.test.ts |
| imports | 1317 | tests/components/custom/metric-stack/MetricStack.test.ts |
| imports | 1318 | tests/components/custom/search/fuzzySearchIndex.test.ts |
| imports | 1319 | tests/components/custom/search/search-contracts.test.ts |
| imports | 1320 | tests/components/custom/search/useFuzzySearch.test.ts |
| imports | 1321 | tests/components/custom/tabs/segmented-tabs.test.ts |
| imports | 1322 | tests/components/custom/timeline/aria-valuenow.test.ts |
| imports | 1323 | tests/components/custom/timeline/continuous-stitched-gradient.test.ts |
| imports | 1324 | tests/components/custom/timeline/continuous-structural-split.test.ts |
| imports | 1325 | tests/components/ui/_shared/ModalOverlay.test.ts |
| imports | 1326 | tests/components/ui/button/Button.test.ts |
| imports | 1327 | tests/components/ui/card/Card.test.ts |
| imports | 1328 | tests/components/ui/data-table/DataTable.test.ts |
| imports | 1329 | tests/components/ui/data-table/useDataTableResponsive.test.ts |
| imports | 1330 | tests/components/ui/data-table/useDataTableRowIdentity.test.ts |
| imports | 1331 | tests/components/ui/dialog/dialog-show-close.test.ts |
| imports | 1332 | tests/components/ui/dialog/dialog-spring.test.ts |
| imports | 1333 | tests/components/ui/progress/Progress.test.ts |
| imports | 1334 | tests/components/ui/reka-binding-idiom.test.ts |
| imports | 1335 | tests/components/ui/skeleton/Skeleton.test.ts |
| imports | 1336 | tests/components/ui/slider/dock-hold-contract.test.ts |
| imports | 1337 | tests/composables.smoke.spec.ts |
| imports | 1338 | tests/composables/color/use-accent-tone.test.ts |
| imports | 1339 | tests/composables/color/warm-catch-light.test.ts |
| imports | 1340 | tests/composables/dark/darkModeSyncScript.test.ts |
| imports | 1341 | tests/composables/dom/useTokenColor.test.ts |
| imports | 1342 | tests/composables/glass/canvas2d/resolveCanvasColor.test.ts |
| imports | 1343 | tests/composables/glass/canvas2d/useCanvas2D.test.ts |
| imports | 1344 | tests/composables/glass/webgl/useWebGLCanvas.test.ts |
| imports | 1345 | tests/composables/glass/webgpu/useWebGPUCanvas.test.ts |
| imports | 1346 | tests/composables/motion/convergence.test.ts |
| imports | 1347 | tests/composables/motion/curves.test.ts |
| imports | 1348 | tests/composables/motion/scroll-reveal-once.test.ts |
| imports | 1349 | tests/composables/motion/suite.test.ts |
| imports | 1350 | tests/composables/motion/text-highlight-home.test.ts |
| imports | 1351 | tests/composables/motion/useBloomUp.test.ts |
| imports | 1352 | tests/composables/motion/useCharStagger.test.ts |
| imports | 1353 | tests/composables/motion/usePointerVelocityField.test.ts |
| imports | 1354 | tests/composables/motion/useScrollTrigger.test.ts |
| imports | 1355 | tests/composables/motion/useTextHighlight.test.ts |
| imports | 1356 | tests/composables/sidebar/useLazyLoader.test.ts |
| imports | 1357 | tests/composables/sidebar/useScrollTo.test.ts |
| imports | 1358 | tests/composables/sidebar/useScrollTracker.test.ts |
| imports | 1359 | tests/composables/sortable/drag-ring-radius.test.ts |
| imports | 1360 | tests/composables/useAnimatedNumber.test.ts |
| imports | 1361 | tests/composables/useCountup.test.ts |
| imports | 1362 | tests/composables/useIntersectionPause.test.ts |
| imports | 1363 | tests/composables/useInterval.test.ts |
| imports | 1364 | tests/composables/useKeyboardShortcuts.test.ts |
| imports | 1365 | tests/composables/useNumericTransition.test.ts |
| imports | 1366 | tests/composables/usePrioritizedTask.test.ts |
| imports | 1367 | tests/composables/useRAFLoop.test.ts |
| imports | 1368 | tests/composables/useSpring.test.ts |
| imports | 1369 | tests/composables/useSpringMount.test.ts |
| imports | 1370 | tests/composables/useSpringPress.test.ts |
| imports | 1371 | tests/composables/useTimer.test.ts |
| imports | 1372 | tests/composables/useTokenColor.test.ts |
| imports | 1373 | tests/composables/useTouchGate.test.ts |
| imports | 1374 | tests/composables/useViewTransition.test.ts |
| imports | 1375 | tests/composables/useYieldToMain.test.ts |
| imports | 1376 | tests/composables/vReveal.test.ts |
| imports | 1377 | tests/composables/virtual/virtualSectionLayout.test.ts |
| imports | 1378 | tests/configurator-recursion.spec.ts |
| imports | 1379 | tests/lifecycle-cleanup.spec.ts |
| imports | 1380 | tests/menuItemVariants.spec.ts |
| imports | 1381 | tests/public-surface.spec.ts |
| imports | 1382 | tests/scripts/demo-dock-nav.detect.test.ts |
| imports | 1383 | tests/scripts/proof-animation-coherence.detect.test.ts |
| imports | 1384 | tests/scripts/proof-demo-control-live.detect.test.ts |
| imports | 1385 | tests/scripts/proof-slider-two-only.detect.test.ts |
| imports | 1386 | tests/scripts/proof-xr-producer-repairs.detect.test.ts |
| imports | 1387 | tests/scripts/storybook-complete.detect.test.ts |
| imports | 1388 | tests/setup.ts |
| imports | 1389 | tests/shims.d.ts |
| imports | 1390 | tests/stories.smoke.spec.ts |
| imports | 1391 | tests/utils/cn.test.ts |
| imports | 1392 | tests/utils/mountComposable.ts |
| tests | 1 | tests/public-surface.spec.ts |
| tests | 2 | tests/structure/manifest.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| docs | 1 | MIGRATION.md |
| docs | 2 | docs/STRUCTURE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P009/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every public entry resolves directly to a semantic owner; no pass-through root file or compatibility source path exists.

**Required mutation bite:** Restore src/motion.ts as a pure export-star mirror and require entry/topology evidence to turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P009`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |
| integrity.types | device-free | Library, tests, and declaration-build TypeScript programs agree without suppressions or generated declaration holes. | Remove one public return member from its declaration.; Insert an expect-error that no longer suppresses a real error. |

## π obligation

Device-free: Entrypoint source movement has no intended paint delta.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P008 | There is one flat component concept graph and one generated JS/d.ts entry authority; no ui/custom path or hidden reader survives. |

Declared semantic locks: `entry-graph`, `package-manifest`, `root-barrel`. The cursor also acquires 1398 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
