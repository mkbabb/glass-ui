# BI.W-P057 — Rendered story manifest and public-concept bijection

**Status:** PLANNED
**Topological stratum:** BI.S12
**Formation family:** demo
**Core centers:** C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P057`

## Intent

Generate story metadata from rendered modules and final entry concepts so imports, routes, and public exports cannot drift apart.

## Exact scope

- Define a typed story schema for concept ID, category, component imports, rendered parts, scenarios, modes, and specialized-stage rationale.
- Generate route/landing/search projections from one manifest authority while verifying component modules actually render.
- Require every retained public concept to have rendered reach or an explicit no-story product rationale; reject phantom/dead routes.
- Delete FOLDED_STORY_IDS, FOLDED_MEMBER_FAMILY, RELOCATED_STORY_ROUTES, the router redirect loops that consume them, and dead member rows; family pages may compose private specimens, but retired public paths receive no alias or migration route.
- Remove filename-count and prose-presence story checks and require each retained manifest row to resolve directly to the mounted owner.

## File manifest (152)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/router.ts | — | 7f88ba5492b7d6a17bc890f3898edd7d8749dfc2 | source base |
| 2 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 3 | repair | demo/stories/compositions/chassis.vue | — | 1e40177de1d581b4731c53f16600982e1592a005 | source base |
| 4 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 5 | repair | demo/stories/compositions/form-validation.vue | — | 002cb58ae3e2c27bcccd4fa22703f7447a6cbf0a | source base |
| 6 | repair | demo/stories/compositions/gate-pattern.vue | — | 3b7062ae79091429f1685e72afd1f1a22edcd945 | source base |
| 7 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 8 | repair | demo/stories/containers/accordion.vue | — | a012fa904418def9518038bdd837c04e23cc155c | source base |
| 9 | repair | demo/stories/containers/card-pressable.vue | — | 7486ccdd103aa62b9cb41326445bb4b48bb4d1dc | source base |
| 10 | repair | demo/stories/containers/collapsible.vue | — | 82f8a2682bdc0128a826ef1e57ebe3f12f2df3a9 | source base |
| 11 | repair | demo/stories/containers/command.vue | — | 7067af923a628500716d7fb0c54a4d4965f520d1 | source base |
| 12 | repair | demo/stories/containers/configurator.vue | — | 887b9cbd50fada0688b1f5f021e461c980d4390f | source base |
| 13 | repair | demo/stories/containers/context-menu.vue | — | f7d6fb6f9734f01270dd5fc48a45b65977a4fb9f | source base |
| 14 | repair | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 15 | repair | demo/stories/containers/drawer.vue | — | b0b1fbdb6d48732d70330550ac61277f7592ca72 | source base |
| 16 | repair | demo/stories/containers/dropdown-menu.vue | — | 9057dacd0e81425206b638869ad6369e03e929d1 | source base |
| 17 | repair | demo/stories/containers/expandable-container.vue | — | c9af261acd7645d6554af40df87d84c834c5b517 | source base |
| 18 | repair | demo/stories/containers/hover-card.vue | — | 717b04d3220f4a89414ea02df7e058bb31abae7f | source base |
| 19 | repair | demo/stories/containers/hover-popover.vue | — | 8364ae7c7fa3aaf07de168d90e7a0e597f6d9864 | source base |
| 20 | repair | demo/stories/containers/icon-tooltip.vue | — | 2f0819ed127121ef20384e894b108382cbea9071 | source base |
| 21 | repair | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 22 | repair | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 23 | repair | demo/stories/containers/spa-view.vue | — | 5bbafefd0eeb58d0cbfed909aec32eaa981a648d | source base |
| 24 | repair | demo/stories/containers/tooltip.vue | — | 0b436063aac06de803e4bfb779094bb579f8ce1e | source base |
| 25 | repair | demo/stories/data/avatar.vue | — | 2cc58a59a3153e9f6fa88c311f6bbabd96cd2c06 | source base |
| 26 | repair | demo/stories/data/data-table.vue | — | b47491c40e8d819de70a227b54c02df4f732f3f0 | source base |
| 27 | repair | demo/stories/data/infinite-scroll.vue | — | faea27c9c706cc99221d59aa6e94219b6eaee43b | source base |
| 28 | repair | demo/stories/data/instrument-chassis.vue | — | 5439f87b703c75b49e6009a7a188de721529fd18 | source base |
| 29 | repair | demo/stories/data/metric-cell.vue | — | ba851ae5f53abdb3aaf555eb5722ef19f374576e | source base |
| 30 | repair | demo/stories/data/metric-stack.vue | — | 373c38180f5cdc3071b23962b40f501614c84458 | source base |
| 31 | repair | demo/stories/data/metrics.vue | — | ac6aef681c76679bb8c4865659182fffe0aec0f8 | source base |
| 32 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 33 | repair | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 34 | repair | demo/stories/data/table.vue | — | 58c29de2277622d630fc2074b40a7401a2c48688 | source base |
| 35 | repair | demo/stories/data/tags-input.vue | — | 82920c7ce0a17d515f6815d03da15cddff321587 | source base |
| 36 | repair | demo/stories/data/timeline.vue | — | cbea77cde25c94bbf1e42dbbb67530935c09fe93 | source base |
| 37 | repair | demo/stories/data/TimelineContinuousBody.vue | — | ff412634257566da40a4891789203c7e7c36c904 | source base |
| 38 | repair | demo/stories/data/TimelineSegmentedBody.vue | — | 9546a0e569cdd42f7e964e8a19a8c1408c27c4de | source base |
| 39 | repair | demo/stories/data/virtual-section.vue | — | 4fe0827b08bc8d2098782789a40a979b65131d8b | source base |
| 40 | repair | demo/stories/display/atoms.vue | — | 86c4bec56ef905b07f53a92347e9a7419b65ab29 | source base |
| 41 | repair | demo/stories/display/badge.vue | — | 2cc390d89ae7e0025b00b6d7dac973ba36d09a85 | source base |
| 42 | repair | demo/stories/display/buttons.tile.vue | — | 6cf26e0f64ca06468274d699400e10d395d0362c | source base |
| 43 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 44 | repair | demo/stories/display/card.tile.vue | — | 71c976ca2df650772d5f3e43a757a6b96394e192 | source base |
| 45 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 46 | repair | demo/stories/display/dark-mode-toggle.vue | — | f5ea043e2dc9557a41c661d91898cd8cf27d23a7 | source base |
| 47 | repair | demo/stories/display/metric-badge.vue | — | 0ce729be9d5638820a513e649ae011004a647229 | source base |
| 48 | repair | demo/stories/display/pulse.vue | — | 5e76ed2b48174dc07bc873c73b15b7041ec01abe | source base |
| 49 | repair | demo/stories/display/section.vue | — | 01838e08d6c9a87f2aa857ef8ca3e7e9a429d39e | source base |
| 50 | repair | demo/stories/display/separator.vue | — | baa51f9a5bc48a5209eccb267d87f0661f936ce0 | source base |
| 51 | repair | demo/stories/display/stacked-icons.vue | — | 09b5480b44c54961ed0c95bf5e95eab993cde156 | source base |
| 52 | repair | demo/stories/display/status-dot.vue | — | b77693f1ca47379b82834971061e67356c1503cb | source base |
| 53 | repair | demo/stories/dock/controls.vue | — | 095063fe157f5fdfa8408e58f5e36556479d56b8 | source base |
| 54 | repair | demo/stories/dock/cta-receive.vue | — | b935d88e93b2f3f210d79025749961e824e84a7c | source base |
| 55 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 56 | repair | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 57 | repair | demo/stories/dock/layers.vue | — | 11004b992842ec990758800b9ebbb1d1f2184067 | source base |
| 58 | repair | demo/stories/dock/overflow.vue | — | 90a35aabc6b8a25cdcef4f948b7d6bd2fd332223 | source base |
| 59 | repair | demo/stories/dock/overview.tile.vue | — | d1b9b592db308638a76a613635e566756936a930 | source base |
| 60 | repair | demo/stories/dock/overview.vue | — | 5dd032e75dd1c907f6c62eec290e20460ba154b8 | source base |
| 61 | repair | demo/stories/dock/rail.vue | — | f843e4e6adc30faad601cf75ece55aa37dd92272 | source base |
| 62 | repair | demo/stories/dock/sections.vue | — | 4834ba79ba910ee7a9938e210fdd94fa54e97e7d | source base |
| 63 | repair | demo/stories/feedback/alert.vue | — | d628cf79272b92e3c9e1a2e508ff0ae65c34edaf | source base |
| 64 | repair | demo/stories/feedback/completion-seal.vue | — | ad68e93be233b9d829906d6d45966249f802d230 | source base |
| 65 | repair | demo/stories/feedback/confirm-dialog.vue | — | dd4cd511fcc738f1d30c2b76e352f364425a17e2 | source base |
| 66 | repair | demo/stories/feedback/notification.vue | — | c045a0972e14e35eb96a91fb85de3c82a9075d17 | source base |
| 67 | repair | demo/stories/feedback/progress.vue | — | 1584fe98ba3c4146a60ff9b58750eb2c1b4420b6 | source base |
| 68 | repair | demo/stories/feedback/skeleton.vue | — | fb8ba6c20de783088b1c6bbee7af01c4ff732679 | source base |
| 69 | repair | demo/stories/feedback/toast.vue | — | 417f1d0a506f018bec760b95647ee2252498bf4b | source base |
| 70 | repair | demo/stories/feedback/toaster.vue | — | 5e22100e62b79c1695df757f8ca90d470986e6cb | source base |
| 71 | repair | demo/stories/forms/checks.vue | — | 04ec086e401a31129dc06379ef0b9db93f3e0d2b | source base |
| 72 | repair | demo/stories/forms/combobox.vue | — | 857ff5e276a3da069b9ae7f1166f5c7d7062d057 | source base |
| 73 | repair | demo/stories/forms/inputs.tile.vue | — | b18ac13b8dd7009df86814ae257616dfd6f37216 | source base |
| 74 | repair | demo/stories/forms/inputs.vue | — | 710a5484ef5c868f89a7ae6d141ef4ae6ad356e2 | source base |
| 75 | repair | demo/stories/forms/label.vue | — | ff08672dda7fc3631d36c3cf15b67b715c96e671 | source base |
| 76 | repair | demo/stories/forms/labeled-field.vue | — | e1e428d93503b932882d8daca37d0fb2592571f3 | source base |
| 77 | repair | demo/stories/forms/number-field.vue | — | 02a660baf3648e235ddd421edcd712775e3a48a6 | source base |
| 78 | repair | demo/stories/forms/select.vue | — | 831a46d8d8aed8a4c74eabd9d71c936b4ed72492 | source base |
| 79 | repair | demo/stories/forms/selectable-chip.vue | — | 38a31fcb4dd3a1d5438746f386d50dc8925ff91a | source base |
| 80 | repair | demo/stories/forms/slider.vue | — | 7ba393813177863acc6ac6a34292570759e6f5ec | source base |
| 81 | repair | demo/stories/forms/textarea.vue | — | 16be74fb5191866c650e157e8c4225b10bf28653 | source base |
| 82 | repair | demo/stories/forms/toggle-chip.vue | — | 53a4e6ae8ad38c21582673faa712354eeaf50fcb | source base |
| 83 | repair | demo/stories/forms/toggle.vue | — | 722406a90459974c446cd5c2ba961f6fa18ae67c | source base |
| 84 | repair | demo/stories/foundations/chart-chassis-palette.vue | — | efc049f29ea84e68a9e615ca4b68c0633ac4d94c | source base |
| 85 | repair | demo/stories/foundations/colors.vue | — | e135a8684cba765b758f96bbf2ae5a4d72f5831b | source base |
| 86 | repair | demo/stories/foundations/css-utilities.vue | — | 8356a9f2abf2b39c93acd8b5c02400723337d41e | source base |
| 87 | repair | demo/stories/foundations/icons.vue | — | a0dfdf9a4e4f6943b3a675645ed144733a2156aa | source base |
| 88 | repair | demo/stories/foundations/intro.vue | — | 4f4356e8b8fa4617908d22300b7ee0291822f25b | source base |
| 89 | repair | demo/stories/foundations/motion.vue | — | 137d730ba1e4f20e9d3a186e5d8462e3192db3d8 | source base |
| 90 | repair | demo/stories/foundations/overlays-scrims.vue | — | b4ba9269ca9b4a7316b9eae8f10603e9ca508293 | source base |
| 91 | repair | demo/stories/foundations/paper-glass.vue | — | 2301793abe89df723239e3600d526c54a5d06da6 | source base |
| 92 | repair | demo/stories/foundations/paper-texture.vue | — | 9295a43a73256d75d35fd0c1781ee2bcb3a39f1e | source base |
| 93 | repair | demo/stories/foundations/radii.vue | — | 9ac8e4263414017f8e04d818c374d2d8fd7f9687 | source base |
| 94 | repair | demo/stories/foundations/shadows.vue | — | 9603298a8cfaee80168b9956297b952139d7f615 | source base |
| 95 | repair | demo/stories/foundations/surface-taxonomy.vue | — | 884041cef453dd00977463b403a3c1ed9f1dee59 | source base |
| 96 | repair | demo/stories/foundations/surface-tints.vue | — | bbb5f37280d6b8118c48f335bc2044afd17bc667 | source base |
| 97 | repair | demo/stories/foundations/typography.vue | — | f4aa9d7df182b7ed4fff85c82a8420ca92bae353 | source base |
| 98 | modify | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 99 | create | demo/stories/manifest/generate.ts | — | — | source base |
| 100 | repair | demo/stories/manifest/lazy.ts | — | 29871b7cdfa23fdc3a6cfe7f021e0f647ab2eac6 | source base |
| 101 | create | demo/stories/manifest/schema.ts | — | — | source base |
| 102 | repair | demo/stories/motion/animated-digit.vue | — | 037ce8e85cfc0777dc4f8c60a991c5e3fb889e34 | source base |
| 103 | repair | demo/stories/motion/countup.vue | — | 9e211d7ed538441aa2b4c69c757c0faf2fd8159c | source base |
| 104 | repair | demo/stories/motion/curve-families.ts | — | 5e4788036e5440186aa8de36d6296992d3e2729b | source base |
| 105 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 106 | repair | demo/stories/motion/deck.vue | — | fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0 | source base |
| 107 | repair | demo/stories/motion/handmark.vue | — | b7540e930d7ee9d6859af664a567c2efedec4335 | source base |
| 108 | repair | demo/stories/motion/reveal.vue | — | 320488b618f973731b8ac350ec44c256baeccaa9 | source base |
| 109 | repair | demo/stories/motion/scroll.vue | — | 14f381aa282422f73b5238d725b21258ecd9f599 | source base |
| 110 | repair | demo/stories/motion/ScrollChoreographyBody.vue | — | b858ac6530a4639409d25655316ac0503970142d | source base |
| 111 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 112 | repair | demo/stories/motion/ScrollReaderBody.vue | — | 4d3ec8ced13c59a194437e45dd25813027bf0684 | source base |
| 113 | repair | demo/stories/motion/split-chars.vue | — | 6d46a23e25428031f226056dc6f7f24094ad489f | source base |
| 114 | repair | demo/stories/motion/springs.vue | — | 19c32798d794a7d6e5f4c9e90adc740efdcfacb5 | source base |
| 115 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 116 | repair | demo/stories/motion/text-motion.vue | — | bf6ef80875b5cdb6af038fd2f378f55e164edf7b | source base |
| 117 | repair | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 118 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 119 | repair | demo/stories/navigation/header-ribbon.vue | — | 73618bbe3e1543d29a247fa35287fd908296e5ad | source base |
| 120 | repair | demo/stories/navigation/tabs.vue | — | d849c1b15f01f63b358ffed4cf82e61faed7bebb | source base |
| 121 | repair | demo/stories/navigation/toc-tracking.vue | — | c9cf1693a0b1d05e7067be0faca2723e77effcf5 | source base |
| 122 | repair | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 123 | repair | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 124 | repair | demo/stories/substrates/aurora/AuroraStage.vue | — | 1511aabb33b2c5846151a07740354fe0af8efca2 | source base |
| 125 | repair | demo/stories/substrates/aurora/config/CompositionLayer.vue | — | 006b7735eaf3b6d90a881b15435dcb9c157a46aa | source base |
| 126 | repair | demo/stories/substrates/aurora/config/FlowLayer.vue | — | 5b6a771e32fd19376a182f3bed491397145f99b2 | source base |
| 127 | repair | demo/stories/substrates/aurora/config/NucleiLayer.vue | — | 4438e6a419d01461e7f2b1c72eeed053038505d6 | source base |
| 128 | repair | demo/stories/substrates/aurora/config/options.ts | — | 2fb120cd0b760df8bb8f778b8b9eb16ad15dd0a3 | source base |
| 129 | repair | demo/stories/substrates/aurora/config/PaletteLayer.vue | — | 59bdf9371357bf749664fc017cbe03e7c657c45d | source base |
| 130 | repair | demo/stories/substrates/aurora/config/TextureLayer.vue | — | 5a24b0210d62fd9ea5cee40085eef2217e1bd0da | source base |
| 131 | repair | demo/stories/substrates/aurora/config/usePaletteStops.ts | — | 52d4541130ba2e0dec4d5563f630bec6bc4426bd | source base |
| 132 | repair | demo/stories/substrates/aurora/NucleiOverlay.vue | — | 7da942d2f050904d101f2303859358a58013c562 | source base |
| 133 | repair | demo/stories/substrates/aurora/OklchStopRow.vue | — | 04bc76245b45f57ec97a846de7b77a6a31d55c28 | source base |
| 134 | repair | demo/stories/substrates/aurora/PresetPickerRow.vue | — | 54862db17b5598523816cfc15ea18927a76c1b09 | source base |
| 135 | repair | demo/stories/substrates/aurora/presets.ts | — | 74bd131a3d369e14ee35a26915db3afc178ee0b0 | source base |
| 136 | repair | demo/stories/substrates/aurora/sections/AuroraColorSection.vue | — | 46b7ccf650fdfc2ded62b81887a57ec5fce7f759 | source base |
| 137 | repair | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue | — | 28724c06ddb8640c9f744ba4404e35b3fdf80730 | source base |
| 138 | repair | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue | — | b6bf718d53e096646d18ee29526283923c5e780a | source base |
| 139 | repair | demo/stories/substrates/aurora/usePresetThumbnails.ts | — | 046828d30809b70bf1ae8d55019ccb2069e94ef9 | source base |
| 140 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 141 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 142 | repair | demo/stories/substrates/fGlyphPoints.ts | — | e5196c3fbe8be2521c08eb76f952d584529a1034 | source base |
| 143 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 144 | repair | demo/stories/substrates/fourier-paths.ts | — | 9cfcca76ea386f8773c805a4562252621039c077 | source base |
| 145 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 146 | repair | demo/stories/substrates/glass-panel.vue | — | ff1fe558ecfd84fd3543b4c7162cfe1030da6cca | source base |
| 147 | repair | demo/stories/substrates/liquid-grid.vue | — | ea23a95d86d099db8af3554bf94d2d34b3daf939 | source base |
| 148 | repair | demo/stories/substrates/presets.ts | — | 495f075c40c737978133d8888c6ab090bb94f241 | source base |
| 149 | repair | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 150 | repair | demo/vite.demo-dist.config.ts | — | 09244211a97a27c9df46b0c931dc01920871290a | source base |
| 151 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 152 | modify | tests/demo/story-bijection.test.ts | — | — | BI.W-P012 |

## Repair manifest (150)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/compositions/auth-shell.vue |
| imports | 2 | demo/stories/compositions/chassis.vue |
| imports | 3 | demo/stories/compositions/empty-states.vue |
| imports | 4 | demo/stories/compositions/form-validation.vue |
| imports | 5 | demo/stories/compositions/gate-pattern.vue |
| imports | 6 | demo/stories/compositions/settings.vue |
| imports | 7 | demo/stories/containers/accordion.vue |
| imports | 8 | demo/stories/containers/card-pressable.vue |
| imports | 9 | demo/stories/containers/collapsible.vue |
| imports | 10 | demo/stories/containers/command.vue |
| imports | 11 | demo/stories/containers/configurator.vue |
| imports | 12 | demo/stories/containers/context-menu.vue |
| imports | 13 | demo/stories/containers/dialog.vue |
| imports | 14 | demo/stories/containers/drawer.vue |
| imports | 15 | demo/stories/containers/dropdown-menu.vue |
| imports | 16 | demo/stories/containers/expandable-container.vue |
| imports | 17 | demo/stories/containers/hover-card.vue |
| imports | 18 | demo/stories/containers/hover-popover.vue |
| imports | 19 | demo/stories/containers/icon-tooltip.vue |
| imports | 20 | demo/stories/containers/popover.vue |
| imports | 21 | demo/stories/containers/sheet.vue |
| imports | 22 | demo/stories/containers/spa-view.vue |
| imports | 23 | demo/stories/containers/tooltip.vue |
| imports | 24 | demo/stories/data/TimelineContinuousBody.vue |
| imports | 25 | demo/stories/data/TimelineSegmentedBody.vue |
| imports | 26 | demo/stories/data/avatar.vue |
| imports | 27 | demo/stories/data/data-table.vue |
| imports | 28 | demo/stories/data/infinite-scroll.vue |
| imports | 29 | demo/stories/data/instrument-chassis.vue |
| imports | 30 | demo/stories/data/metric-cell.vue |
| imports | 31 | demo/stories/data/metric-stack.vue |
| imports | 32 | demo/stories/data/metrics.vue |
| imports | 33 | demo/stories/data/search.vue |
| imports | 34 | demo/stories/data/sortable-list.vue |
| imports | 35 | demo/stories/data/table.vue |
| imports | 36 | demo/stories/data/tags-input.vue |
| imports | 37 | demo/stories/data/timeline.vue |
| imports | 38 | demo/stories/data/virtual-section.vue |
| imports | 39 | demo/stories/display/atoms.vue |
| imports | 40 | demo/stories/display/badge.vue |
| imports | 41 | demo/stories/display/buttons.tile.vue |
| imports | 42 | demo/stories/display/buttons.vue |
| imports | 43 | demo/stories/display/card.tile.vue |
| imports | 44 | demo/stories/display/card.vue |
| imports | 45 | demo/stories/display/dark-mode-toggle.vue |
| imports | 46 | demo/stories/display/metric-badge.vue |
| imports | 47 | demo/stories/display/pulse.vue |
| imports | 48 | demo/stories/display/section.vue |
| imports | 49 | demo/stories/display/separator.vue |
| imports | 50 | demo/stories/display/stacked-icons.vue |
| imports | 51 | demo/stories/display/status-dot.vue |
| imports | 52 | demo/stories/dock/DockStage.vue |
| imports | 53 | demo/stories/dock/controls.vue |
| imports | 54 | demo/stories/dock/cta-receive.vue |
| imports | 55 | demo/stories/dock/dock-search.vue |
| imports | 56 | demo/stories/dock/layers.vue |
| imports | 57 | demo/stories/dock/overflow.vue |
| imports | 58 | demo/stories/dock/overview.tile.vue |
| imports | 59 | demo/stories/dock/overview.vue |
| imports | 60 | demo/stories/dock/rail.vue |
| imports | 61 | demo/stories/dock/sections.vue |
| imports | 62 | demo/stories/feedback/alert.vue |
| imports | 63 | demo/stories/feedback/completion-seal.vue |
| imports | 64 | demo/stories/feedback/confirm-dialog.vue |
| imports | 65 | demo/stories/feedback/notification.vue |
| imports | 66 | demo/stories/feedback/progress.vue |
| imports | 67 | demo/stories/feedback/skeleton.vue |
| imports | 68 | demo/stories/feedback/toast.vue |
| imports | 69 | demo/stories/feedback/toaster.vue |
| imports | 70 | demo/stories/forms/checks.vue |
| imports | 71 | demo/stories/forms/combobox.vue |
| imports | 72 | demo/stories/forms/inputs.tile.vue |
| imports | 73 | demo/stories/forms/inputs.vue |
| imports | 74 | demo/stories/forms/label.vue |
| imports | 75 | demo/stories/forms/labeled-field.vue |
| imports | 76 | demo/stories/forms/number-field.vue |
| imports | 77 | demo/stories/forms/select.vue |
| imports | 78 | demo/stories/forms/selectable-chip.vue |
| imports | 79 | demo/stories/forms/slider.vue |
| imports | 80 | demo/stories/forms/textarea.vue |
| imports | 81 | demo/stories/forms/toggle-chip.vue |
| imports | 82 | demo/stories/forms/toggle.vue |
| imports | 83 | demo/stories/foundations/chart-chassis-palette.vue |
| imports | 84 | demo/stories/foundations/colors.vue |
| imports | 85 | demo/stories/foundations/css-utilities.vue |
| imports | 86 | demo/stories/foundations/icons.vue |
| imports | 87 | demo/stories/foundations/intro.vue |
| imports | 88 | demo/stories/foundations/motion.vue |
| imports | 89 | demo/stories/foundations/overlays-scrims.vue |
| imports | 90 | demo/stories/foundations/paper-glass.vue |
| imports | 91 | demo/stories/foundations/paper-texture.vue |
| imports | 92 | demo/stories/foundations/radii.vue |
| imports | 93 | demo/stories/foundations/shadows.vue |
| imports | 94 | demo/stories/foundations/surface-taxonomy.vue |
| imports | 95 | demo/stories/foundations/surface-tints.vue |
| imports | 96 | demo/stories/foundations/typography.vue |
| imports | 97 | demo/stories/manifest.ts |
| imports | 98 | demo/stories/manifest/lazy.ts |
| imports | 99 | demo/stories/motion/ScrollChoreographyBody.vue |
| imports | 100 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 101 | demo/stories/motion/ScrollReaderBody.vue |
| imports | 102 | demo/stories/motion/animated-digit.vue |
| imports | 103 | demo/stories/motion/countup.vue |
| imports | 104 | demo/stories/motion/curve-families.ts |
| imports | 105 | demo/stories/motion/curve-gallery.vue |
| imports | 106 | demo/stories/motion/deck.vue |
| imports | 107 | demo/stories/motion/handmark.vue |
| imports | 108 | demo/stories/motion/reveal.vue |
| imports | 109 | demo/stories/motion/scroll.vue |
| imports | 110 | demo/stories/motion/split-chars.vue |
| imports | 111 | demo/stories/motion/springs.vue |
| imports | 112 | demo/stories/motion/tempo.vue |
| imports | 113 | demo/stories/motion/text-motion.vue |
| imports | 114 | demo/stories/motion/typewriter.vue |
| imports | 115 | demo/stories/navigation/carousel.vue |
| imports | 116 | demo/stories/navigation/header-ribbon.vue |
| imports | 117 | demo/stories/navigation/tabs.vue |
| imports | 118 | demo/stories/navigation/toc-tracking.vue |
| imports | 119 | demo/stories/substrates/VizStudio.vue |
| imports | 120 | demo/stories/substrates/aurora.vue |
| imports | 121 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 122 | demo/stories/substrates/aurora/AuroraStage.vue |
| imports | 123 | demo/stories/substrates/aurora/NucleiOverlay.vue |
| imports | 124 | demo/stories/substrates/aurora/OklchStopRow.vue |
| imports | 125 | demo/stories/substrates/aurora/PresetPickerRow.vue |
| imports | 126 | demo/stories/substrates/aurora/config/CompositionLayer.vue |
| imports | 127 | demo/stories/substrates/aurora/config/FlowLayer.vue |
| imports | 128 | demo/stories/substrates/aurora/config/NucleiLayer.vue |
| imports | 129 | demo/stories/substrates/aurora/config/PaletteLayer.vue |
| imports | 130 | demo/stories/substrates/aurora/config/TextureLayer.vue |
| imports | 131 | demo/stories/substrates/aurora/config/options.ts |
| imports | 132 | demo/stories/substrates/aurora/config/usePaletteStops.ts |
| imports | 133 | demo/stories/substrates/aurora/presets.ts |
| imports | 134 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue |
| imports | 135 | demo/stories/substrates/aurora/sections/AuroraCompositionSection.vue |
| imports | 136 | demo/stories/substrates/aurora/sections/AuroraMotionSection.vue |
| imports | 137 | demo/stories/substrates/aurora/usePresetThumbnails.ts |
| imports | 138 | demo/stories/substrates/blob.vue |
| imports | 139 | demo/stories/substrates/constellation.vue |
| imports | 140 | demo/stories/substrates/fGlyphPoints.ts |
| imports | 141 | demo/stories/substrates/fourier-field.vue |
| imports | 142 | demo/stories/substrates/fourier-paths.ts |
| imports | 143 | demo/stories/substrates/glass-material.vue |
| imports | 144 | demo/stories/substrates/glass-panel.vue |
| imports | 145 | demo/stories/substrates/liquid-grid.vue |
| imports | 146 | demo/stories/substrates/presets.ts |
| tests | 1 | tests/demo/story-bijection.test.ts |
| build | 1 | demo/router.ts |
| build | 2 | demo/vite.demo-dist.config.ts |
| docs | 1 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P057/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Public concepts, story modules, rendered components, and direct canonical routes form a generated semantic mapping with no import-only, phantom, dead-member, folded, relocated, alias, shim, or compatibility-route success.

**Required mutation bite:** Import a component without rendering it, or restore one old-path redirect through FOLDED_STORY_IDS/RELOCATED_STORY_ROUTES; reachability/clean-break checks must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P057`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |

## π obligation

Device-free: Manifest/render reachability is device-free through AST plus mounted-component probes; visual scenarios are separate.

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P055 | Every story composition uses one semantic chassis grammar, leads with a visible live product witness, and has no second page/hero/section/specimen authority. |

Declared semantic locks: `demo-manifest`. The cursor also acquires 152 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
