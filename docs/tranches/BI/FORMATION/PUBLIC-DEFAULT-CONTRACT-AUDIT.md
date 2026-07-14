# Public default contract audit

**Source base:** `26c5ae686fd0f1181083aebda1215b00524555f1`
**Status:** formation research only; no implementation or execution PASS credit
**Vue component files scanned:** 213
**Files with discovered defaults:** 86
**Default expressions:** 291
**Behavior/mode candidates:** 64

Parse every tracked Vue script under src/components at the frozen source base. Enumerate withDefaults, defineModel default, and runtime defineProps default expressions by AST occurrence. Separately scan every current src+demo Vue opening tag with a quote-aware parser to record direct component use and whether the prop is explicit, omitted, or hidden behind a spread. Assign every row one authored product disposition and exact canonical owner; generic domain text never overrides the explicit RED/delete cases. Tag spelling is diagnostic only, frozen counts never become a gate, and runtime composition remains authoritative.

This ledger is never a file roster or completeness oracle. The future verifier rediscovers effective defaults from the current compiler/import/render/route graph and validates their composed product behavior; this frozen audit proves the formation inspected every current explicit declaration and did not let a story override hide the omission path.

| ID | Component | Path:line | Prop/model | Default | Domain | Demo omission/total | Status | Disposition | Findings | Owners |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PDC-001 | AnimatedDigit | src/components/custom/animated-digit/AnimatedDigit.vue:60 | placeholder | `"—"` | PRESENTATION_DEFAULT | 2/3 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P078, BI.W-P006, BI.W-P008 |
| PDC-002 | AnimatedDigit | src/components/custom/animated-digit/AnimatedDigit.vue:61 | mode | `"absolute"` | HOST_MODE_OR_SEMANTIC_SHAPE | 3/3 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P078, BI.W-P006, BI.W-P008 |
| PDC-003 | Aurora | src/components/custom/aurora/Aurora.vue:95 | opacityCeiling | `1` | DATA_OR_CONFIGURATION_DEFAULT | 4/11 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P046, BI.W-P008 |
| PDC-004 | Aurora | src/components/custom/aurora/Aurora.vue:98 | config | `() => DEFAULT_AURORA_CONFIG` | DATA_OR_CONFIGURATION_DEFAULT | 0/11 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P046, BI.W-P008 |
| PDC-005 | Aurora | src/components/custom/aurora/Aurora.vue:99 | renderMode | `"auto"` | HOST_MODE_OR_SEMANTIC_SHAPE | 11/11 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P046, BI.W-P008 |
| PDC-006 | ColorSwatch | src/components/custom/color-swatch/ColorSwatch.vue:48 | showHex | `false` | DATA_OR_CONFIGURATION_DEFAULT | 1/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P081, BI.W-P006, BI.W-P008 |
| PDC-007 | ColorSwatch | src/components/custom/color-swatch/ColorSwatch.vue:48 | size | `"md"` | PRESENTATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P081, BI.W-P006, BI.W-P008 |
| PDC-008 | ColorSwatch | src/components/custom/color-swatch/ColorSwatch.vue:52 | modelValue | `"#000000"` | PUBLIC_STATE_SEED | 0/2 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P081, BI.W-P006, BI.W-P008 |
| PDC-009 | Configurator | src/components/custom/configurator/Configurator.vue:122 | scrollMode | `"auto"` | HOST_MODE_OR_SEMANTIC_SHAPE | 1/3 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P052, BI.W-P059, BI.W-P006, BI.W-P008 |
| PDC-010 | Configurator | src/components/custom/configurator/Configurator.vue:123 | size | `"md"` | PRESENTATION_DEFAULT | 2/3 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P052, BI.W-P059, BI.W-P006, BI.W-P008 |
| PDC-011 | Configurator | src/components/custom/configurator/Configurator.vue:124 | asideSide | `"right"` | DATA_OR_CONFIGURATION_DEFAULT | 2/3 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P052, BI.W-P059, BI.W-P006, BI.W-P008 |
| PDC-012 | Configurator | src/components/custom/configurator/Configurator.vue:125 | galleryPlacement | `"aside"` | DATA_OR_CONFIGURATION_DEFAULT | 1/3 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P052, BI.W-P059, BI.W-P006, BI.W-P008 |
| PDC-013 | ConfiguratorLayer | src/components/custom/configurator/ConfiguratorLayer.vue:63 | defaultOpen | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 22/26 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P052, BI.W-P059, BI.W-P006, BI.W-P008 |
| PDC-014 | ConfiguratorLayer | src/components/custom/configurator/ConfiguratorLayer.vue:72 | open | `undefined` | BEHAVIOR_MOTION_OR_INTERACTION | 26/26 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P052, BI.W-P059, BI.W-P006, BI.W-P008 |
| PDC-015 | Constellation | src/components/custom/constellation/Constellation.vue:48 | count | `64` | BOUNDS_TIMING_OR_CAPACITY | 0/8 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-016 | Constellation | src/components/custom/constellation/Constellation.vue:49 | link | `132` | DATA_OR_CONFIGURATION_DEFAULT | 0/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-017 | Constellation | src/components/custom/constellation/Constellation.vue:50 | speed | `0.16` | DATA_OR_CONFIGURATION_DEFAULT | 8/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-018 | Constellation | src/components/custom/constellation/Constellation.vue:51 | parallax | `DEFAULT_PARALLAX` | DATA_OR_CONFIGURATION_DEFAULT | 8/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-019 | Constellation | src/components/custom/constellation/Constellation.vue:52 | pointerReactive | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 1/8 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-020 | Constellation | src/components/custom/constellation/Constellation.vue:53 | warpOnClick | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 6/8 | CURRENT_RED | OPTIONAL_DECORATIVE_VERSUS_INTERACTIVE_CONTRACT_REPAIR_REQUIRED | RDA-016 | BI.W-P048, BI.W-P059, BI.W-P061, BI.W-P062 |
| PDC-021 | Constellation | src/components/custom/constellation/Constellation.vue:54 | wander | `false` | DATA_OR_CONFIGURATION_DEFAULT | 7/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-022 | Constellation | src/components/custom/constellation/Constellation.vue:55 | gravityWell | `false` | DATA_OR_CONFIGURATION_DEFAULT | 7/8 | CURRENT_RED | OPTIONAL_DECORATIVE_VERSUS_INTERACTIVE_CONTRACT_REPAIR_REQUIRED | RDA-016 | BI.W-P048, BI.W-P059, BI.W-P061, BI.W-P062 |
| PDC-023 | Constellation | src/components/custom/constellation/Constellation.vue:56 | opacityCeiling | `1` | DATA_OR_CONFIGURATION_DEFAULT | 5/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-024 | Constellation | src/components/custom/constellation/Constellation.vue:57 | pinned | `false` | DATA_OR_CONFIGURATION_DEFAULT | 7/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-025 | Constellation | src/components/custom/constellation/Constellation.vue:58 | accentEdges | `false` | DATA_OR_CONFIGURATION_DEFAULT | 7/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-026 | Constellation | src/components/custom/constellation/Constellation.vue:59 | pinnedDrift | `false` | DATA_OR_CONFIGURATION_DEFAULT | 7/8 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-027 | Constellation | src/components/custom/constellation/Constellation.vue:60 | warpAutoRelease | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 7/8 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P048, BI.W-P006, BI.W-P008 |
| PDC-028 | Constellation | src/components/custom/constellation/Constellation.vue:61 | backgroundInteractive | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 7/8 | CURRENT_RED | OPTIONAL_DECORATIVE_VERSUS_INTERACTIVE_CONTRACT_REPAIR_REQUIRED | RDA-016 | BI.W-P048, BI.W-P059, BI.W-P061, BI.W-P062 |
| PDC-029 | DarkModeToggle | src/components/custom/controls/DarkModeToggle.vue:37 | passive | `false` | DATA_OR_CONFIGURATION_DEFAULT | 4/5 | CURRENT_RED | FALSE_AFFORDANCE_OPTION_DELETE_REQUIRED | RDA-034 | BI.W-P059, BI.W-P062, BI.W-P082 |
| PDC-030 | DarkModeToggle | src/components/custom/controls/DarkModeToggle.vue:38 | size | `"md"` | PRESENTATION_DEFAULT | 0/5 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P082, BI.W-P006, BI.W-P008 |
| PDC-031 | DarkModeToggle | src/components/custom/controls/DarkModeToggle.vue:39 | disableTransitions | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 4/5 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P082, BI.W-P006, BI.W-P008 |
| PDC-032 | DarkModeToggle | src/components/custom/controls/DarkModeToggle.vue:40 | eclipse | `false` | PRESENTATION_DEFAULT | 5/5 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P082, BI.W-P006, BI.W-P008 |
| PDC-033 | DeckPager | src/components/custom/deck/DeckPager.vue:28 | ariaLabel | `"Slides"` | HOST_MODE_OR_SEMANTIC_SHAPE | 1/1 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P121, BI.W-P008 |
| PDC-034 | DeckPager | src/components/custom/deck/DeckPager.vue:28 | ring | `false` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P121, BI.W-P008 |
| PDC-035 | DeckPager | src/components/custom/deck/DeckPager.vue:34 | index | `0` | PUBLIC_STATE_SEED | 1/1 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P121, BI.W-P008 |
| PDC-036 | DockBackgroundToggle | src/components/custom/dock/DockBackgroundToggle.vue:43 | paused | `false` | PUBLIC_STATE_SEED | 4/4 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-037 | DockBackgroundToggle | src/components/custom/dock/DockBackgroundToggle.vue:44 | pauseLabel | `"Pause background animation"` | DATA_OR_CONFIGURATION_DEFAULT | 4/4 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-038 | DockBackgroundToggle | src/components/custom/dock/DockBackgroundToggle.vue:45 | playLabel | `"Resume background animation"` | DATA_OR_CONFIGURATION_DEFAULT | 4/4 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-039 | DockControl | src/components/custom/dock/DockControl.vue:68 | shape | `"icon"` | PRESENTATION_DEFAULT | 114/120 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-040 | DockControl | src/components/custom/dock/DockControl.vue:69 | compact | `false` | DATA_OR_CONFIGURATION_DEFAULT | 118/120 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-041 | DockControl | src/components/custom/dock/DockControl.vue:70 | active | `false` | PUBLIC_STATE_SEED | 116/120 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-042 | DockControl | src/components/custom/dock/DockControl.vue:71 | type | `"button"` | HOST_MODE_OR_SEMANTIC_SHAPE | 94/120 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-043 | DockControl | src/components/custom/dock/DockControl.vue:72 | disabled | `false` | PUBLIC_STATE_SEED | 115/120 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-044 | DockControl | src/components/custom/dock/DockControl.vue:73 | as | `"button"` | HOST_MODE_OR_SEMANTIC_SHAPE | 118/120 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-045 | DockControl | src/components/custom/dock/DockControl.vue:74 | asChild | `false` | HOST_MODE_OR_SEMANTIC_SHAPE | 118/120 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-046 | DockCrossfade | src/components/custom/dock/DockCrossfade.vue:46 | reserve | `"block"` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-047 | DockLayerGroup | src/components/custom/dock/DockLayerGroup.vue:59 | showRail | `true` | DATA_OR_CONFIGURATION_DEFAULT | 3/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-048 | DockLayerGroup | src/components/custom/dock/DockLayerGroup.vue:60 | railPosition | `"start"` | DATA_OR_CONFIGURATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-049 | DockSection | src/components/custom/dock/DockSection.vue:57 | ariaLabel | `"Dock sections"` | HOST_MODE_OR_SEMANTIC_SHAPE | 0/3 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-050 | DockSeparator | src/components/custom/dock/DockSeparator.vue:52 | anchor | `false` | DATA_OR_CONFIGURATION_DEFAULT | 14/14 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-051 | DockStack | src/components/custom/dock/DockStack.vue:65 | mode | `"stack"` | HOST_MODE_OR_SEMANTIC_SHAPE | 1/3 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-052 | DockStack | src/components/custom/dock/DockStack.vue:66 | coreLabel | `"Open stack"` | DATA_OR_CONFIGURATION_DEFAULT | 0/3 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-053 | DockStack | src/components/custom/dock/DockStack.vue:67 | visibleCount | `3` | BOUNDS_TIMING_OR_CAPACITY | 3/3 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-054 | DockStack | src/components/custom/dock/DockStack.vue:68 | wrap | `false` | DATA_OR_CONFIGURATION_DEFAULT | 3/3 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-055 | DockStack | src/components/custom/dock/DockStack.vue:69 | position | `"end"` | PRESENTATION_DEFAULT | 1/3 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-056 | DockTrigger | src/components/custom/dock/DockTrigger.vue:39 | for | `"select"` | DATA_OR_CONFIGURATION_DEFAULT | 0/4 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P006, BI.W-P008 |
| PDC-057 | GlassDock | src/components/custom/dock/GlassDock.vue:62 | autoLuminance | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 33/33 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P008 |
| PDC-058 | EasingConfigurator | src/components/custom/easing/EasingConfigurator.vue:38 | label | `"Easing"` | DATA_OR_CONFIGURATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-059 | EasingConfigurator | src/components/custom/easing/EasingConfigurator.vue:39 | name | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-060 | EasingConfigurator | src/components/custom/easing/EasingConfigurator.vue:40 | mode | `"bezier"` | HOST_MODE_OR_SEMANTIC_SHAPE | 0/1 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-061 | EasingConfigurator | src/components/custom/easing/EasingConfigurator.vue:41 | preset | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-062 | EasingConfigurator | src/components/custom/easing/EasingConfigurator.vue:42 | steps | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-063 | EasingConfigurator | src/components/custom/easing/EasingConfigurator.vue:43 | term | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-064 | EasingPicker | src/components/custom/easing/EasingPicker.vue:67 | mode | `"bezier"` | HOST_MODE_OR_SEMANTIC_SHAPE | 0/2 | CURRENT_RED | DEFAULT_EDITOR_MODE_SEMANTICS_REPAIR_REQUIRED | RDA-027 | BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P124 |
| PDC-065 | EasingPicker | src/components/custom/easing/EasingPicker.vue:68 | preset | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-066 | EasingPicker | src/components/custom/easing/EasingPicker.vue:69 | steps | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-067 | EasingPicker | src/components/custom/easing/EasingPicker.vue:70 | term | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-068 | EasingPicker | src/components/custom/easing/EasingPicker.vue:71 | readout | `true` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-069 | EasingPicker | src/components/custom/easing/EasingPicker.vue:72 | playback | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 2/2 | CURRENT_RED | DEFAULT_PREVIEW_AUTHORITY_REPAIR_REQUIRED | RDA-030 | BI.W-P014, BI.W-P022, BI.W-P025, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P124 |
| PDC-070 | EasingPicker | src/components/custom/easing/EasingPicker.vue:73 | label | `"Easing curve"` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P124, BI.W-P008 |
| PDC-071 | ExpandableContainer | src/components/custom/expandable-container/ExpandableContainer.vue:157 | buttonPosition | `"right"` | DATA_OR_CONFIGURATION_DEFAULT | 4/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P110, BI.W-P006, BI.W-P008 |
| PDC-072 | ExpandableContainer | src/components/custom/expandable-container/ExpandableContainer.vue:158 | expandLabel | `"Fullscreen"` | DATA_OR_CONFIGURATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P110, BI.W-P006, BI.W-P008 |
| PDC-073 | ExpandableContainer | src/components/custom/expandable-container/ExpandableContainer.vue:159 | collapseLabel | `"Exit fullscreen"` | DATA_OR_CONFIGURATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P110, BI.W-P006, BI.W-P008 |
| PDC-074 | ExpandableContainer | src/components/custom/expandable-container/ExpandableContainer.vue:160 | surface | `"glass"` | PRESENTATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P110, BI.W-P006, BI.W-P008 |
| PDC-075 | ExpandableContainer | src/components/custom/expandable-container/ExpandableContainer.vue:176 | open | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 6/6 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P110, BI.W-P006, BI.W-P008 |
| PDC-076 | FadingScroll | src/components/custom/fading-scroll/FadingScroll.vue:31 | axis | `"x"` | DATA_OR_CONFIGURATION_DEFAULT | 0/7 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P111, BI.W-P008 |
| PDC-077 | FadingScroll | src/components/custom/fading-scroll/FadingScroll.vue:31 | fadeEnd | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 7/7 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P111, BI.W-P008 |
| PDC-078 | FadingScroll | src/components/custom/fading-scroll/FadingScroll.vue:31 | fadeStart | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 7/7 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P111, BI.W-P008 |
| PDC-079 | FourierField | src/components/custom/fourier-field/FourierField.vue:59 | seed | `""` | DATA_OR_CONFIGURATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P049, BI.W-P006, BI.W-P008 |
| PDC-080 | FourierField | src/components/custom/fourier-field/FourierField.vue:60 | freeze | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 1/1 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P049, BI.W-P006, BI.W-P008 |
| PDC-081 | GooFilter | src/components/custom/goo-filter/GooFilter.vue:76 | extra | `() => []` | DATA_OR_CONFIGURATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P118, BI.W-P121, BI.W-P008 |
| PDC-082 | HandMark | src/components/custom/handmark/HandMark.vue:47 | brush | `"pen"` | PRESENTATION_DEFAULT | 3/16 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-083 | HandMark | src/components/custom/handmark/HandMark.vue:48 | shape | `"underline"` | PRESENTATION_DEFAULT | 12/16 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-084 | HandMark | src/components/custom/handmark/HandMark.vue:49 | color | `"currentColor"` | PRESENTATION_DEFAULT | 9/16 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-085 | HandMark | src/components/custom/handmark/HandMark.vue:50 | seed | `1` | DATA_OR_CONFIGURATION_DEFAULT | 12/16 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-086 | HandMark | src/components/custom/handmark/HandMark.vue:51 | animation | `"none"` | BEHAVIOR_MOTION_OR_INTERACTION | 15/16 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-087 | HandMark | src/components/custom/handmark/HandMark.vue:52 | drawMs | `800` | BOUNDS_TIMING_OR_CAPACITY | 16/16 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-088 | HandMark | src/components/custom/handmark/HandMark.vue:53 | drawDelayMs | `0` | BOUNDS_TIMING_OR_CAPACITY | 16/16 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-089 | HandMark | src/components/custom/handmark/HandMark.vue:54 | appear | `"visible"` | DATA_OR_CONFIGURATION_DEFAULT | 15/16 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-090 | HandMark | src/components/custom/handmark/HandMark.vue:55 | boilFps | `8` | DATA_OR_CONFIGURATION_DEFAULT | 16/16 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-091 | HandMark | src/components/custom/handmark/HandMark.vue:56 | boilFrames | `3` | DATA_OR_CONFIGURATION_DEFAULT | 16/16 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-092 | HandMark | src/components/custom/handmark/HandMark.vue:57 | jagged | `false` | DATA_OR_CONFIGURATION_DEFAULT | 16/16 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P008 |
| PDC-093 | HeaderRibbon | src/components/custom/header-ribbon/HeaderRibbon.vue:54 | placement | `"left"` | PRESENTATION_DEFAULT | 0/2 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P114, BI.W-P008 |
| PDC-094 | HeaderRibbon | src/components/custom/header-ribbon/HeaderRibbon.vue:55 | hideTimeoutMs | `2000` | BOUNDS_TIMING_OR_CAPACITY | 2/2 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P114, BI.W-P008 |
| PDC-095 | InfiniteScroll | src/components/custom/infinite-scroll/InfiniteScroll.vue:15 | threshold | `200` | BOUNDS_TIMING_OR_CAPACITY | 0/1 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P112, BI.W-P008 |
| PDC-096 | ChassisDivider | src/components/custom/instrument-chassis/ChassisDivider.vue:31 | orientation | `"horizontal"` | HOST_MODE_OR_SEMANTIC_SHAPE | 0/2 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P122, BI.W-P006, BI.W-P008 |
| PDC-097 | InstrumentChassis | src/components/custom/instrument-chassis/InstrumentChassis.vue:94 | variant | `"glass"` | PRESENTATION_DEFAULT | 3/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P122, BI.W-P006, BI.W-P008 |
| PDC-098 | MetricBadge | src/components/custom/metric-badge/MetricBadge.vue:42 | size | `'md'` | PRESENTATION_DEFAULT | 18/45 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-099 | MetricCell | src/components/custom/metric-cell/MetricCell.vue:97 | iconSize | `14` | DATA_OR_CONFIGURATION_DEFAULT | 7/7 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-100 | MetricCell | src/components/custom/metric-cell/MetricCell.vue:98 | iconStrokeWidth | `2` | DATA_OR_CONFIGURATION_DEFAULT | 7/7 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-101 | MetricCell | src/components/custom/metric-cell/MetricCell.vue:99 | appearance | `"dashboard"` | PRESENTATION_DEFAULT | 4/7 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-102 | MetricRow | src/components/custom/metric-stack/MetricRow.vue:97 | iconSize | `16` | DATA_OR_CONFIGURATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-103 | MetricRow | src/components/custom/metric-stack/MetricRow.vue:98 | iconStrokeWidth | `2` | DATA_OR_CONFIGURATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-104 | MetricRow | src/components/custom/metric-stack/MetricRow.vue:99 | digitCount | `3` | DATA_OR_CONFIGURATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-105 | MetricRow | src/components/custom/metric-stack/MetricRow.vue:100 | colorTinted | `false` | DATA_OR_CONFIGURATION_DEFAULT | 5/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-106 | MetricRow | src/components/custom/metric-stack/MetricRow.vue:101 | active | `false` | PUBLIC_STATE_SEED | 5/6 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-107 | MetricRow | src/components/custom/metric-stack/MetricRow.vue:102 | protagonist | `false` | DATA_OR_CONFIGURATION_DEFAULT | 6/6 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-108 | MetricStack | src/components/custom/metric-stack/MetricStack.vue:82 | containerName | `"metric-stack"` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-109 | MetricStack | src/components/custom/metric-stack/MetricStack.vue:83 | rows | `4` | DATA_OR_CONFIGURATION_DEFAULT | 0/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-110 | MetricStack | src/components/custom/metric-stack/MetricStack.vue:84 | as | `"div"` | HOST_MODE_OR_SEMANTIC_SHAPE | 2/2 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-111 | MetricStack | src/components/custom/metric-stack/MetricStack.vue:85 | register | `"audacious"` | PRESENTATION_DEFAULT | 1/2 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P117, BI.W-P006, BI.W-P008 |
| PDC-112 | PagerDots | src/components/custom/pager-dots/PagerDots.vue:77 | orientation | `"horizontal"` | HOST_MODE_OR_SEMANTIC_SHAPE | 3/4 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P118, BI.W-P006, BI.W-P008 |
| PDC-113 | PagerDots | src/components/custom/pager-dots/PagerDots.vue:78 | ring | `true` | PRESENTATION_DEFAULT | 4/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P118, BI.W-P006, BI.W-P008 |
| PDC-114 | PagerDots | src/components/custom/pager-dots/PagerDots.vue:79 | pattern | `"tabs"` | DATA_OR_CONFIGURATION_DEFAULT | 4/4 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P118, BI.W-P006, BI.W-P008 |
| PDC-115 | PagerDots | src/components/custom/pager-dots/PagerDots.vue:80 | ariaLabel | `"Pager"` | HOST_MODE_OR_SEMANTIC_SHAPE | 0/4 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P118, BI.W-P006, BI.W-P008 |
| PDC-116 | PagerDots | src/components/custom/pager-dots/PagerDots.vue:86 | active | `0` | PUBLIC_STATE_SEED | 0/4 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P118, BI.W-P006, BI.W-P008 |
| PDC-117 | Pulse | src/components/custom/pulse/Pulse.vue:52 | variant | `'dots'` | PRESENTATION_DEFAULT | 0/15 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P076, BI.W-P006, BI.W-P008 |
| PDC-118 | Pulse | src/components/custom/pulse/Pulse.vue:53 | count | `3` | BOUNDS_TIMING_OR_CAPACITY | 11/15 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P076, BI.W-P006, BI.W-P008 |
| PDC-119 | Pulse | src/components/custom/pulse/Pulse.vue:54 | speed | `'normal'` | DATA_OR_CONFIGURATION_DEFAULT | 6/15 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P076, BI.W-P006, BI.W-P008 |
| PDC-120 | Pulse | src/components/custom/pulse/Pulse.vue:55 | intensity | `'normal'` | PRESENTATION_DEFAULT | 15/15 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P076, BI.W-P006, BI.W-P008 |
| PDC-121 | Pulse | src/components/custom/pulse/Pulse.vue:56 | once | `false` | DATA_OR_CONFIGURATION_DEFAULT | 15/15 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P076, BI.W-P006, BI.W-P008 |
| PDC-122 | FuzzySearch | src/components/custom/search/FuzzySearch.vue:39 | placeholder | `"Search…"` | PRESENTATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-123 | FuzzySearch | src/components/custom/search/FuzzySearch.vue:39 | size | `"md"` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-124 | FuzzySearch | src/components/custom/search/FuzzySearch.vue:39 | surface | `"glass"` | PRESENTATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-125 | FuzzySearch | src/components/custom/search/FuzzySearch.vue:39 | variant | `"inline"` | PRESENTATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-126 | SearchBar | src/components/custom/search/SearchBar.vue:53 | modelValue | `""` | PUBLIC_STATE_SEED | 4/4 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-127 | SearchBar | src/components/custom/search/SearchBar.vue:54 | placeholder | `"Search…"` | PRESENTATION_DEFAULT | 0/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-128 | SearchBar | src/components/custom/search/SearchBar.vue:55 | tag | `"div"` | HOST_MODE_OR_SEMANTIC_SHAPE | 4/4 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-129 | SearchBar | src/components/custom/search/SearchBar.vue:56 | size | `"md"` | PRESENTATION_DEFAULT | 0/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-130 | SearchBar | src/components/custom/search/SearchBar.vue:57 | surface | `"glass"` | PRESENTATION_DEFAULT | 0/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-131 | SearchBar | src/components/custom/search/SearchBar.vue:58 | variant | `"inline"` | PRESENTATION_DEFAULT | 4/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P099, BI.W-P006, BI.W-P008 |
| PDC-132 | SortableHandle | src/components/custom/sortable-list/SortableHandle.vue:27 | as | `"span"` | HOST_MODE_OR_SEMANTIC_SHAPE | 4/5 | CURRENT_RED | SEMANTIC_HOST_DEFAULT_REPAIR_REQUIRED | RDA-013 | BI.W-P007, BI.W-P062 |
| PDC-133 | SortableItem | src/components/custom/sortable-list/SortableItem.vue:26 | as | `"div"` | HOST_MODE_OR_SEMANTIC_SHAPE | 5/7 | CURRENT_RED | SEMANTIC_HOST_DEFAULT_REPAIR_REQUIRED | RDA-013 | BI.W-P007, BI.W-P062 |
| PDC-134 | SortableList | src/components/custom/sortable-list/SortableList.vue:54 | handleSelector | `"[data-sortable-handle]"` | DATA_OR_CONFIGURATION_DEFAULT | 6/7 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P007 |
| PDC-135 | SortableList | src/components/custom/sortable-list/SortableList.vue:55 | axis | `"y"` | DATA_OR_CONFIGURATION_DEFAULT | 7/7 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P007 |
| PDC-136 | SortableList | src/components/custom/sortable-list/SortableList.vue:56 | as | `"div"` | HOST_MODE_OR_SEMANTIC_SHAPE | 4/7 | CURRENT_RED | SEMANTIC_HOST_DEFAULT_REPAIR_REQUIRED | RDA-013 | BI.W-P007, BI.W-P062 |
| PDC-137 | SpaView | src/components/custom/spa-view/SpaView.vue:58 | transition | `"fade"` | BEHAVIOR_MOTION_OR_INTERACTION | 1/1 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P113, BI.W-P008 |
| PDC-138 | SplitChars | src/components/custom/split-chars/SplitChars.vue:62 | as | `"span"` | HOST_MODE_OR_SEMANTIC_SHAPE | 2/4 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P079, BI.W-P006, BI.W-P008 |
| PDC-139 | SplitChars | src/components/custom/split-chars/SplitChars.vue:62 | by | `"char"` | DATA_OR_CONFIGURATION_DEFAULT | 2/4 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P079, BI.W-P006, BI.W-P008 |
| PDC-140 | SplitChars | src/components/custom/split-chars/SplitChars.vue:62 | stagger | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 3/4 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P079, BI.W-P006, BI.W-P008 |
| PDC-141 | StackedIconGroup | src/components/custom/stacked-icons/StackedIconGroup.vue:65 | maxVisible | `3` | BOUNDS_TIMING_OR_CAPACITY | 0/5 | CURRENT_RED | ZERO_DEMAND_FALSE_DEFAULT_CONCEPT_DELETE_REQUIRED | RDA-037 | BI.W-P059, BI.W-P061, BI.W-P083 |
| PDC-142 | StackedIconGroup | src/components/custom/stacked-icons/StackedIconGroup.vue:66 | orientation | `'horizontal'` | HOST_MODE_OR_SEMANTIC_SHAPE | 3/5 | CURRENT_RED | ZERO_DEMAND_FALSE_DEFAULT_CONCEPT_DELETE_REQUIRED | RDA-037 | BI.W-P059, BI.W-P061, BI.W-P083 |
| PDC-143 | StackedIconGroup | src/components/custom/stacked-icons/StackedIconGroup.vue:67 | reversed | `false` | DATA_OR_CONFIGURATION_DEFAULT | 5/5 | CURRENT_RED | ZERO_DEMAND_FALSE_DEFAULT_CONCEPT_DELETE_REQUIRED | RDA-037 | BI.W-P059, BI.W-P061, BI.W-P083 |
| PDC-144 | StackedIconGroup | src/components/custom/stacked-icons/StackedIconGroup.vue:68 | size | `'md'` | PRESENTATION_DEFAULT | 0/5 | CURRENT_RED | ZERO_DEMAND_FALSE_DEFAULT_CONCEPT_DELETE_REQUIRED | RDA-037 | BI.W-P059, BI.W-P061, BI.W-P083 |
| PDC-145 | StackedIconGroup | src/components/custom/stacked-icons/StackedIconGroup.vue:69 | expandOnHover | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 4/5 | CURRENT_RED | ZERO_DEMAND_FALSE_DEFAULT_CONCEPT_DELETE_REQUIRED | RDA-037 | BI.W-P059, BI.W-P061, BI.W-P083 |
| PDC-146 | StackedIconGroup | src/components/custom/stacked-icons/StackedIconGroup.vue:70 | as | `'div'` | HOST_MODE_OR_SEMANTIC_SHAPE | 5/5 | CURRENT_RED | ZERO_DEMAND_FALSE_DEFAULT_CONCEPT_DELETE_REQUIRED | RDA-037 | BI.W-P059, BI.W-P061, BI.W-P083 |
| PDC-147 | StatusDot | src/components/custom/status-dot/StatusDot.vue:51 | variant | `"active"` | PRESENTATION_DEFAULT | 0/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P077, BI.W-P006, BI.W-P008 |
| PDC-148 | StatusDot | src/components/custom/status-dot/StatusDot.vue:52 | pulse | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 3/4 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P077, BI.W-P006, BI.W-P008 |
| PDC-149 | StatusDot | src/components/custom/status-dot/StatusDot.vue:53 | size | `"sm"` | PRESENTATION_DEFAULT | 2/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P077, BI.W-P006, BI.W-P008 |
| PDC-150 | SegmentedTabs | src/components/custom/tabs/SegmentedTabs.vue:124 | variant | `"pill"` | PRESENTATION_DEFAULT | 9/20 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P092, BI.W-P006, BI.W-P008 |
| PDC-151 | SegmentedTabs | src/components/custom/tabs/SegmentedTabs.vue:125 | orientation | `"horizontal"` | HOST_MODE_OR_SEMANTIC_SHAPE | 18/20 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P092, BI.W-P006, BI.W-P008 |
| PDC-152 | SegmentedTabs | src/components/custom/tabs/SegmentedTabs.vue:126 | responsive | `false` | DATA_OR_CONFIGURATION_DEFAULT | 18/20 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P092, BI.W-P006, BI.W-P008 |
| PDC-153 | ContinuousTimeline | src/components/custom/timeline/ContinuousTimeline.vue:77 | disablePopover | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 0/0 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P120, BI.W-P008 |
| PDC-154 | GlassTimeline | src/components/custom/timeline/GlassTimeline.vue:67 | variant | `"scrubber"` | PRESENTATION_DEFAULT | 1/4 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P120, BI.W-P008 |
| PDC-155 | GlassTimeline | src/components/custom/timeline/GlassTimeline.vue:68 | modelValue | `0` | PUBLIC_STATE_SEED | 2/4 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P120, BI.W-P008 |
| PDC-156 | GlassTimeline | src/components/custom/timeline/GlassTimeline.vue:69 | disablePopover | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 4/4 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P120, BI.W-P008 |
| PDC-157 | ScrubberTimeline | src/components/custom/timeline/ScrubberTimeline.vue:54 | modelValue | `0` | PUBLIC_STATE_SEED | 0/0 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P120, BI.W-P008 |
| PDC-158 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:73 | text | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 1/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-159 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:74 | words | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 1/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-160 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:75 | ngramSize | `() => ({ min: 1, max: 3 })` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-161 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:76 | baseSpeed | `150` | DATA_OR_CONFIGURATION_DEFAULT | 0/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-162 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:77 | variance | `0.4` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-163 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:78 | errorRate | `0.015` | DATA_OR_CONFIGURATION_DEFAULT | 0/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-164 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:79 | firstAnimationSpeedFactor | `0.6` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-165 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:80 | maxCharsBeforeNotice | `4` | BOUNDS_TIMING_OR_CAPACITY | 2/2 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-166 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:81 | continueAfterTypoProbability | `0.6` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-167 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:82 | sequentialTypoDecay | `0.3` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-168 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:83 | correctionSpeedMultiplier | `0.5` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-169 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:84 | cursorVisible | `true` | DATA_OR_CONFIGURATION_DEFAULT | 0/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-170 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:85 | cursorBlink | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 0/2 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-171 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:86 | cursorChar | `"\|"` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-172 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:87 | startDelay | `0` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-173 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:88 | loop | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 1/2 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-174 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:89 | pauseAfterType | `3000` | BOUNDS_TIMING_OR_CAPACITY | 1/2 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-175 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:90 | pauseAfterDelete | `800` | BOUNDS_TIMING_OR_CAPACITY | 1/2 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-176 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:91 | deletingSpeed | `70` | BOUNDS_TIMING_OR_CAPACITY | 2/2 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-177 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:92 | interactive | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 0/2 | CURRENT_RED | HIDDEN_DEFAULT_INTERACTION_DELETE_REQUIRED | RDA-035 | BI.W-P059, BI.W-P062, BI.W-P080 |
| PDC-178 | TypewriterText | src/components/custom/typewriter/TypewriterText.vue:93 | respectReducedMotion | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 2/2 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P080, BI.W-P008 |
| PDC-179 | WatercolorDot | src/components/custom/watercolor-dot/WatercolorDot.vue:62 | variant | `"solid"` | PRESENTATION_DEFAULT | 4/5 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P006, BI.W-P008 |
| PDC-180 | WatercolorDot | src/components/custom/watercolor-dot/WatercolorDot.vue:63 | animate | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 2/5 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P006, BI.W-P008 |
| PDC-181 | WatercolorDot | src/components/custom/watercolor-dot/WatercolorDot.vue:64 | tag | `"div"` | HOST_MODE_OR_SEMANTIC_SHAPE | 5/5 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P006, BI.W-P008 |
| PDC-182 | WatercolorDot | src/components/custom/watercolor-dot/WatercolorDot.vue:65 | cycleDuration | `4000` | BOUNDS_TIMING_OR_CAPACITY | 5/5 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P051, BI.W-P006, BI.W-P008 |
| PDC-183 | WatercolorDot | src/components/custom/watercolor-dot/WatercolorDot.vue:66 | range | `() => [20, 80]` | DATA_OR_CONFIGURATION_DEFAULT | 5/5 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P006, BI.W-P008 |
| PDC-184 | WatercolorDot | src/components/custom/watercolor-dot/WatercolorDot.vue:67 | seed | `""` | DATA_OR_CONFIGURATION_DEFAULT | 0/5 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P051, BI.W-P006, BI.W-P008 |
| PDC-185 | ModalOverlay | src/components/ui/_shared/ModalOverlay.vue:81 | scrim | `"glass"` | DATA_OR_CONFIGURATION_DEFAULT | 0/0 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P006, BI.W-P008 |
| PDC-186 | ModalOverlay | src/components/ui/_shared/ModalOverlay.vue:82 | animate | `"fade"` | BEHAVIOR_MOTION_OR_INTERACTION | 0/0 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P006, BI.W-P008 |
| PDC-187 | ModalOverlay | src/components/ui/_shared/ModalOverlay.vue:83 | layout | `"centered"` | DATA_OR_CONFIGURATION_DEFAULT | 0/0 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P006, BI.W-P008 |
| PDC-188 | Avatar | src/components/ui/avatar/Avatar.vue:12 | size | `'sm'` | PRESENTATION_DEFAULT | 1/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P071, BI.W-P006, BI.W-P008 |
| PDC-189 | Avatar | src/components/ui/avatar/Avatar.vue:13 | shape | `'circle'` | PRESENTATION_DEFAULT | 4/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P071, BI.W-P006, BI.W-P008 |
| PDC-190 | Button | src/components/ui/button/Button.vue:74 | as | `'button'` | HOST_MODE_OR_SEMANTIC_SHAPE | 160/160 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P065, BI.W-P006, BI.W-P008 |
| PDC-191 | Card | src/components/ui/card/Card.vue:192 | tier | `"resting"` | PRESENTATION_DEFAULT | 27/46 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-192 | Card | src/components/ui/card/Card.vue:193 | surface | `"glass"` | PRESENTATION_DEFAULT | 26/46 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-193 | Card | src/components/ui/card/Card.vue:194 | deep | `false` | PRESENTATION_DEFAULT | 46/46 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-194 | Card | src/components/ui/card/Card.vue:195 | shadow | `true` | PRESENTATION_DEFAULT | 43/46 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-195 | Card | src/components/ui/card/Card.vue:196 | grain | `true` | PRESENTATION_DEFAULT | 41/46 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-196 | Card | src/components/ui/card/Card.vue:197 | grid | `false` | DATA_OR_CONFIGURATION_DEFAULT | 46/46 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-197 | Card | src/components/ui/card/Card.vue:198 | specular | `"off"` | PRESENTATION_DEFAULT | 46/46 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-198 | Card | src/components/ui/card/Card.vue:199 | metal | `"gold"` | PRESENTATION_DEFAULT | 46/46 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-199 | Card | src/components/ui/card/Card.vue:200 | as | `"div"` | HOST_MODE_OR_SEMANTIC_SHAPE | 43/46 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P006, BI.W-P008 |
| PDC-200 | ScrollCard | src/components/ui/card/ScrollCard.vue:57 | tier | `"resting"` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P008 |
| PDC-201 | ScrollCard | src/components/ui/card/ScrollCard.vue:58 | surface | `"glass"` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P008 |
| PDC-202 | ScrollCard | src/components/ui/card/ScrollCard.vue:59 | shadow | `true` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P008 |
| PDC-203 | ScrollCard | src/components/ui/card/ScrollCard.vue:60 | specular | `"off"` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P109, BI.W-P008 |
| PDC-204 | ScrollCard | src/components/ui/card/ScrollCard.vue:61 | maxHeight | `"18rem"` | BOUNDS_TIMING_OR_CAPACITY | 0/1 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P109, BI.W-P008 |
| PDC-205 | Carousel | src/components/ui/carousel/Carousel.vue:9 | orientation | `'horizontal'` | HOST_MODE_OR_SEMANTIC_SHAPE | 4/5 | REVIEWED_ENROLLMENT | HOST_MODE_OR_SEMANTIC_SHAPE_ENROLLED | — | BI.W-P119, BI.W-P006, BI.W-P008 |
| PDC-206 | Carousel | src/components/ui/carousel/Carousel.vue:20 | active | `0` | PUBLIC_STATE_SEED | 5/5 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P119, BI.W-P006, BI.W-P008 |
| PDC-207 | CarouselContent | src/components/ui/carousel/CarouselContent.vue:41 | arrival | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 2/5 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P119, BI.W-P006, BI.W-P008 |
| PDC-208 | CarouselNext | src/components/ui/carousel/CarouselNext.vue:13 | variant | `'outline'` | PRESENTATION_DEFAULT | 0/0 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P119, BI.W-P006, BI.W-P008 |
| PDC-209 | CarouselPager | src/components/ui/carousel/CarouselPager.vue:15 | showCounter | `true` | DATA_OR_CONFIGURATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P119, BI.W-P006, BI.W-P008 |
| PDC-210 | CarouselPrevious | src/components/ui/carousel/CarouselPrevious.vue:13 | variant | `'outline'` | PRESENTATION_DEFAULT | 0/0 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P119, BI.W-P006, BI.W-P008 |
| PDC-211 | GlassCarouselPager | src/components/ui/carousel/GlassCarouselPager.vue:34 | orientation | `"horizontal"` | HOST_MODE_OR_SEMANTIC_SHAPE | 0/0 | CURRENT_RED | ZERO_CONSUMER_MEMBER_FORK_DELETE_REQUIRED | RDA-038 | BI.W-P059, BI.W-P061, BI.W-P119 |
| PDC-212 | GlassCarouselPager | src/components/ui/carousel/GlassCarouselPager.vue:35 | showCounter | `true` | DATA_OR_CONFIGURATION_DEFAULT | 0/0 | CURRENT_RED | ZERO_CONSUMER_MEMBER_FORK_DELETE_REQUIRED | RDA-038 | BI.W-P059, BI.W-P061, BI.W-P119 |
| PDC-213 | GlassCarouselPager | src/components/ui/carousel/GlassCarouselPager.vue:36 | loop | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 0/0 | CURRENT_RED | ZERO_CONSUMER_MEMBER_FORK_DELETE_REQUIRED | RDA-038 | BI.W-P059, BI.W-P061, BI.W-P119 |
| PDC-214 | ComboboxList | src/components/ui/combobox/ComboboxList.vue:9 | position | `'popper'` | PRESENTATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P096, BI.W-P006, BI.W-P008 |
| PDC-215 | ComboboxList | src/components/ui/combobox/ComboboxList.vue:10 | align | `'center'` | DATA_OR_CONFIGURATION_DEFAULT | 2/2 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P096, BI.W-P006, BI.W-P008 |
| PDC-216 | ComboboxList | src/components/ui/combobox/ComboboxList.vue:11 | sideOffset | `4` | BOUNDS_TIMING_OR_CAPACITY | 2/2 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P096, BI.W-P006, BI.W-P008 |
| PDC-217 | Command | src/components/ui/command/Command.vue:13 | open | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 1/1 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P108, BI.W-P006, BI.W-P008 |
| PDC-218 | Command | src/components/ui/command/Command.vue:14 | modelValue | `''` | PUBLIC_STATE_SEED | 1/1 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P108, BI.W-P006, BI.W-P008 |
| PDC-219 | Command | src/components/ui/command/Command.vue:15 | surface | `'glass'` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P108, BI.W-P006, BI.W-P008 |
| PDC-220 | CommandDialog | src/components/ui/command/CommandDialog.vue:13 | surface | `'glass'` | PRESENTATION_DEFAULT | 0/0 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P108, BI.W-P008 |
| PDC-221 | CommandList | src/components/ui/command/CommandList.vue:15 | disableOutsidePointerEvents | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 1/1 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P108, BI.W-P006, BI.W-P008 |
| PDC-222 | CommandList | src/components/ui/command/CommandList.vue:16 | surface | `'glass'` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P108, BI.W-P006, BI.W-P008 |
| PDC-223 | DataTable | src/components/ui/data-table/DataTable.vue:59 | isLoading | `false` | PUBLIC_STATE_SEED | 1/1 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P116, BI.W-P006, BI.W-P008 |
| PDC-224 | DataTable | src/components/ui/data-table/DataTable.vue:60 | rowKey | `"_id"` | DATA_OR_CONFIGURATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P116, BI.W-P006, BI.W-P008 |
| PDC-225 | DataTable | src/components/ui/data-table/DataTable.vue:61 | infinite | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 1/1 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P116, BI.W-P006, BI.W-P008 |
| PDC-226 | DataTable | src/components/ui/data-table/DataTable.vue:62 | hasMore | `false` | PUBLIC_STATE_SEED | 1/1 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P116, BI.W-P006, BI.W-P008 |
| PDC-227 | DataTable | src/components/ui/data-table/DataTable.vue:63 | responsive | `false` | DATA_OR_CONFIGURATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P116, BI.W-P006, BI.W-P008 |
| PDC-228 | DataTable | src/components/ui/data-table/DataTable.vue:64 | cardBreakpoint | `640` | BOUNDS_TIMING_OR_CAPACITY | 1/1 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P116, BI.W-P006, BI.W-P008 |
| PDC-229 | DialogContent | src/components/ui/dialog/DialogContent.vue:107 | placement | `'center'` | PRESENTATION_DEFAULT | 9/14 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P106, BI.W-P006, BI.W-P008 |
| PDC-230 | DialogContent | src/components/ui/dialog/DialogContent.vue:107 | showClose | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 9/14 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P106, BI.W-P006, BI.W-P008 |
| PDC-231 | DialogContent | src/components/ui/dialog/DialogContent.vue:107 | stage | `'none'` | DATA_OR_CONFIGURATION_DEFAULT | 14/14 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P106, BI.W-P006, BI.W-P008 |
| PDC-232 | DialogContent | src/components/ui/dialog/DialogContent.vue:107 | surface | `'glass'` | PRESENTATION_DEFAULT | 8/14 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P106, BI.W-P006, BI.W-P008 |
| PDC-233 | Drawer | src/components/ui/drawer/Drawer.vue:66 | mode | `'modal'` | HOST_MODE_OR_SEMANTIC_SHAPE | 2/3 | CURRENT_RED | MODE_DERIVED_DEFAULT_CONTRACT_REPAIR_REQUIRED | RDA-036 | BI.W-P032, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P107 |
| PDC-234 | Drawer | src/components/ui/drawer/Drawer.vue:67 | open | `undefined` | BEHAVIOR_MOTION_OR_INTERACTION | 3/3 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P107, BI.W-P008 |
| PDC-235 | Drawer | src/components/ui/drawer/Drawer.vue:68 | defaultOpen | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 3/3 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P107, BI.W-P008 |
| PDC-236 | Drawer | src/components/ui/drawer/Drawer.vue:69 | modal | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 3/3 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P107, BI.W-P008 |
| PDC-237 | Drawer | src/components/ui/drawer/Drawer.vue:70 | snapPoints | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 2/3 | CURRENT_RED | MODE_DERIVED_DEFAULT_CONTRACT_REPAIR_REQUIRED | RDA-036 | BI.W-P032, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P107 |
| PDC-238 | Drawer | src/components/ui/drawer/Drawer.vue:71 | activeSnapPoint | `undefined` | PUBLIC_STATE_SEED | 3/3 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P107, BI.W-P008 |
| PDC-239 | Drawer | src/components/ui/drawer/Drawer.vue:72 | direction | `'bottom'` | HOST_MODE_OR_SEMANTIC_SHAPE | 3/3 | CURRENT_RED | MODE_DERIVED_DEFAULT_CONTRACT_REPAIR_REQUIRED | RDA-036 | BI.W-P032, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P107 |
| PDC-240 | Drawer | src/components/ui/drawer/Drawer.vue:73 | stage | `undefined` | DATA_OR_CONFIGURATION_DEFAULT | 3/3 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P107, BI.W-P008 |
| PDC-241 | DrawerContent | src/components/ui/drawer/DrawerContent.vue:52 | showOverlay | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 2/3 | CURRENT_RED | MODE_DERIVED_DEFAULT_CONTRACT_REPAIR_REQUIRED | RDA-036 | BI.W-P032, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P107 |
| PDC-242 | DrawerContent | src/components/ui/drawer/DrawerContent.vue:52 | surface | `'glass'` | PRESENTATION_DEFAULT | 3/3 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P107, BI.W-P006, BI.W-P008 |
| PDC-243 | DropdownMenu | src/components/ui/dropdown-menu/DropdownMenu.vue:13 | trigger | `'click'` | BEHAVIOR_MOTION_OR_INTERACTION | 6/7 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P105, BI.W-P008 |
| PDC-244 | DropdownMenuContent | src/components/ui/dropdown-menu/DropdownMenuContent.vue:20 | sideOffset | `4` | BOUNDS_TIMING_OR_CAPACITY | 7/7 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P105, BI.W-P006, BI.W-P008 |
| PDC-245 | DropdownMenuContent | src/components/ui/dropdown-menu/DropdownMenuContent.vue:26 | align | `'start'` | DATA_OR_CONFIGURATION_DEFAULT | 6/7 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P105, BI.W-P006, BI.W-P008 |
| PDC-246 | DropdownMenuContent | src/components/ui/dropdown-menu/DropdownMenuContent.vue:27 | surface | `'glass'` | PRESENTATION_DEFAULT | 7/7 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P105, BI.W-P006, BI.W-P008 |
| PDC-247 | Popover | src/components/ui/popover/Popover.vue:35 | trigger | `"click"` | BEHAVIOR_MOTION_OR_INTERACTION | 12/24 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P103, BI.W-P008 |
| PDC-248 | Popover | src/components/ui/popover/Popover.vue:36 | openDelay | `250` | BEHAVIOR_MOTION_OR_INTERACTION | 22/24 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P103, BI.W-P008 |
| PDC-249 | Popover | src/components/ui/popover/Popover.vue:37 | closeDelay | `150` | BEHAVIOR_MOTION_OR_INTERACTION | 24/24 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P103, BI.W-P008 |
| PDC-250 | Popover | src/components/ui/popover/Popover.vue:38 | keepDockOpen | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 21/24 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P103, BI.W-P008 |
| PDC-251 | PopoverContent | src/components/ui/popover/PopoverContent.vue:47 | align | `"center"` | DATA_OR_CONFIGURATION_DEFAULT | 18/24 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P103, BI.W-P006, BI.W-P008 |
| PDC-252 | PopoverContent | src/components/ui/popover/PopoverContent.vue:48 | sideOffset | `4` | BOUNDS_TIMING_OR_CAPACITY | 20/24 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P103, BI.W-P006, BI.W-P008 |
| PDC-253 | PopoverContent | src/components/ui/popover/PopoverContent.vue:49 | portal | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 24/24 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P103, BI.W-P006, BI.W-P008 |
| PDC-254 | PopoverContent | src/components/ui/popover/PopoverContent.vue:50 | surface | `"glass"` | PRESENTATION_DEFAULT | 24/24 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P103, BI.W-P006, BI.W-P008 |
| PDC-255 | Progress | src/components/ui/progress/Progress.vue:56 | modelValue | `0` | PUBLIC_STATE_SEED | 3/11 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P075, BI.W-P008 |
| PDC-256 | Progress | src/components/ui/progress/Progress.vue:57 | variant | `"default"` | PRESENTATION_DEFAULT | 6/11 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P075, BI.W-P008 |
| PDC-257 | Progress | src/components/ui/progress/Progress.vue:58 | segments | `() => []` | DATA_OR_CONFIGURATION_DEFAULT | 10/11 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P075, BI.W-P008 |
| PDC-258 | Progress | src/components/ui/progress/Progress.vue:59 | currentSegmentKey | `null` | PUBLIC_STATE_SEED | 10/11 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P075, BI.W-P008 |
| PDC-259 | Progress | src/components/ui/progress/Progress.vue:60 | activeProgress | `0` | PUBLIC_STATE_SEED | 10/11 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P075, BI.W-P008 |
| PDC-260 | Progress | src/components/ui/progress/Progress.vue:61 | indeterminate | `false` | PUBLIC_STATE_SEED | 10/11 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P075, BI.W-P008 |
| PDC-261 | ProgressSectioned | src/components/ui/progress/ProgressSectioned.vue:48 | segments | `() => []` | DATA_OR_CONFIGURATION_DEFAULT | 0/0 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P075, BI.W-P006, BI.W-P008 |
| PDC-262 | ProgressSectioned | src/components/ui/progress/ProgressSectioned.vue:49 | currentSegmentKey | `null` | PUBLIC_STATE_SEED | 0/0 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P075, BI.W-P006, BI.W-P008 |
| PDC-263 | ProgressSectioned | src/components/ui/progress/ProgressSectioned.vue:50 | activeProgress | `0` | PUBLIC_STATE_SEED | 0/0 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P075, BI.W-P006, BI.W-P008 |
| PDC-264 | Section | src/components/ui/section/Section.vue:60 | tone | `"heading"` | PRESENTATION_DEFAULT | 4/5 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P064, BI.W-P006, BI.W-P008 |
| PDC-265 | Section | src/components/ui/section/Section.vue:61 | gap | `"regular"` | DATA_OR_CONFIGURATION_DEFAULT | 4/5 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P064, BI.W-P006, BI.W-P008 |
| PDC-266 | Section | src/components/ui/section/Section.vue:62 | backdrop | `"none"` | PRESENTATION_DEFAULT | 4/5 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P064, BI.W-P006, BI.W-P008 |
| PDC-267 | SelectContent | src/components/ui/select/SelectContent.vue:38 | position | `'popper'` | PRESENTATION_DEFAULT | 5/5 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P095, BI.W-P006, BI.W-P008 |
| PDC-268 | SelectContent | src/components/ui/select/SelectContent.vue:46 | align | `'start'` | DATA_OR_CONFIGURATION_DEFAULT | 5/5 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P095, BI.W-P006, BI.W-P008 |
| PDC-269 | SelectContent | src/components/ui/select/SelectContent.vue:47 | collisionPadding | `16` | DATA_OR_CONFIGURATION_DEFAULT | 5/5 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P095, BI.W-P006, BI.W-P008 |
| PDC-270 | SelectContent | src/components/ui/select/SelectContent.vue:48 | surface | `'glass'` | PRESENTATION_DEFAULT | 5/5 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P095, BI.W-P006, BI.W-P008 |
| PDC-271 | SelectTrigger | src/components/ui/select/SelectTrigger.vue:38 | size | `'default'` | PRESENTATION_DEFAULT | 3/3 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P095, BI.W-P006, BI.W-P008 |
| PDC-272 | SelectTrigger | src/components/ui/select/SelectTrigger.vue:38 | variant | `'default'` | PRESENTATION_DEFAULT | 3/3 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P095, BI.W-P006, BI.W-P008 |
| PDC-273 | Skeleton | src/components/ui/skeleton/Skeleton.vue:46 | surface | `'opaque'` | PRESENTATION_DEFAULT | 28/28 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P070, BI.W-P006, BI.W-P008 |
| PDC-274 | Skeleton | src/components/ui/skeleton/Skeleton.vue:46 | variant | `'pulse'` | PRESENTATION_DEFAULT | 12/28 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P070, BI.W-P006, BI.W-P008 |
| PDC-275 | Slider | src/components/ui/slider/Slider.vue:45 | keepDockOpen | `true` | BEHAVIOR_MOTION_OR_INTERACTION | 20/20 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P093, BI.W-P006, BI.W-P008 |
| PDC-276 | Surface | src/components/ui/surface/Surface.vue:61 | tier | `"resting"` | PRESENTATION_DEFAULT | 4/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P063, BI.W-P006, BI.W-P008 |
| PDC-277 | Surface | src/components/ui/surface/Surface.vue:62 | surface | `"glass"` | PRESENTATION_DEFAULT | 4/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P063, BI.W-P006, BI.W-P008 |
| PDC-278 | Surface | src/components/ui/surface/Surface.vue:63 | deep | `false` | PRESENTATION_DEFAULT | 5/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P063, BI.W-P006, BI.W-P008 |
| PDC-279 | Surface | src/components/ui/surface/Surface.vue:64 | shadow | `false` | PRESENTATION_DEFAULT | 5/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P063, BI.W-P006, BI.W-P008 |
| PDC-280 | Surface | src/components/ui/surface/Surface.vue:65 | grain | `false` | PRESENTATION_DEFAULT | 5/6 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P063, BI.W-P006, BI.W-P008 |
| PDC-281 | Surface | src/components/ui/surface/Surface.vue:66 | as | `"div"` | HOST_MODE_OR_SEMANTIC_SHAPE | 6/6 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P063, BI.W-P006, BI.W-P008 |
| PDC-282 | TableEmpty | src/components/ui/table/TableEmpty.vue:13 | colspan | `1` | DATA_OR_CONFIGURATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | DATA_OR_CONFIGURATION_DEFAULT_ENROLLED | — | BI.W-P115, BI.W-P006, BI.W-P008 |
| PDC-283 | Textarea | src/components/ui/textarea/Textarea.vue:45 | autosize | `false` | BEHAVIOR_MOTION_OR_INTERACTION | 5/6 | REVIEWED_ENROLLMENT | BEHAVIOR_OR_MODE_DEFAULT_ENROLLED | — | BI.W-P068, BI.W-P006, BI.W-P008 |
| PDC-284 | Toast | src/components/ui/toast/Toast.vue:41 | tone | `'neutral'` | PRESENTATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P074, BI.W-P006, BI.W-P008 |
| PDC-285 | Toast | src/components/ui/toast/Toast.vue:42 | surface | `'glass'` | PRESENTATION_DEFAULT | 0/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P074, BI.W-P006, BI.W-P008 |
| PDC-286 | Toaster | src/components/ui/toast/Toaster.vue:21 | position | `'bottom-right'` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P074, BI.W-P006, BI.W-P008 |
| PDC-287 | Toggle | src/components/ui/toggle/Toggle.vue:12 | variant | `'default'` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P089, BI.W-P006, BI.W-P008 |
| PDC-288 | Toggle | src/components/ui/toggle/Toggle.vue:13 | size | `'md'` | PRESENTATION_DEFAULT | 1/1 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P089, BI.W-P006, BI.W-P008 |
| PDC-289 | Toggle | src/components/ui/toggle/Toggle.vue:14 | disabled | `false` | PUBLIC_STATE_SEED | 1/1 | REVIEWED_ENROLLMENT | PUBLIC_STATE_SEED_ENROLLED | — | BI.W-P089, BI.W-P006, BI.W-P008 |
| PDC-290 | TooltipContent | src/components/ui/tooltip/TooltipContent.vue:16 | sideOffset | `4` | BOUNDS_TIMING_OR_CAPACITY | 7/14 | REVIEWED_ENROLLMENT | BOUNDS_TIMING_OR_CAPACITY_ENROLLED | — | BI.W-P104, BI.W-P006, BI.W-P008 |
| PDC-291 | TooltipContent | src/components/ui/tooltip/TooltipContent.vue:17 | surface | `'glass'` | PRESENTATION_DEFAULT | 14/14 | REVIEWED_ENROLLMENT | PRESENTATION_DEFAULT_ENROLLED | — | BI.W-P104, BI.W-P006, BI.W-P008 |

## Reviewed reasoning

### PDC-001 — AnimatedDigit.placeholder

**Basis:** AnimatedDigit.placeholder="—" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The placeholder omission value derives from the animated-digit owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-002 — AnimatedDigit.mode

**Basis:** AnimatedDigit.mode="absolute" is a host mode or semantic shape with 3 direct demo occurrence(s), 3 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, AnimatedDigit.mode resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-003 — Aurora.opacityCeiling

**Basis:** Aurora.opacityCeiling=1 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The opacityCeiling omission value derives from the aurora owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-004 — Aurora.config

**Basis:** Aurora.config=() => DEFAULT_AURORA_CONFIG is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The config omission value derives from the aurora owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-005 — Aurora.renderMode

**Basis:** Aurora.renderMode="auto" is a host mode or semantic shape with 11 direct demo occurrence(s), 11 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Aurora.renderMode resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-006 — ColorSwatch.showHex

**Basis:** ColorSwatch.showHex=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The showHex omission value derives from the color-swatch owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-007 — ColorSwatch.size

**Basis:** ColorSwatch.size="md" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the color-swatch owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-008 — ColorSwatch.modelValue

**Basis:** ColorSwatch.modelValue="#000000" is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The modelValue omission value derives from the color-swatch owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-009 — Configurator.scrollMode

**Basis:** Configurator.scrollMode="auto" is a host mode or semantic shape with 3 direct demo occurrence(s), 1 exercising omission, 2 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Configurator.scrollMode resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-010 — Configurator.size

**Basis:** Configurator.size="md" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the configurator owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-011 — Configurator.asideSide

**Basis:** Configurator.asideSide="right" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The asideSide omission value derives from the configurator owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-012 — Configurator.galleryPlacement

**Basis:** Configurator.galleryPlacement="aside" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The galleryPlacement omission value derives from the configurator owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-013 — ConfiguratorLayer.defaultOpen

**Basis:** ConfiguratorLayer.defaultOpen=true is a behavior motion or interaction with 26 direct demo occurrence(s), 22 exercising omission, 4 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, ConfiguratorLayer.defaultOpen resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-014 — ConfiguratorLayer.open

**Basis:** ConfiguratorLayer.open=undefined is a behavior motion or interaction with 26 direct demo occurrence(s), 26 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, ConfiguratorLayer.open resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-015 — Constellation.count

**Basis:** Constellation.count=64 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The count omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-016 — Constellation.link

**Basis:** Constellation.link=132 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The link omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-017 — Constellation.speed

**Basis:** Constellation.speed=0.16 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The speed omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-018 — Constellation.parallax

**Basis:** Constellation.parallax=DEFAULT_PARALLAX is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The parallax omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-019 — Constellation.pointerReactive

**Basis:** Constellation.pointerReactive=true is a behavior motion or interaction with 8 direct demo occurrence(s), 1 exercising omission, 7 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Constellation.pointerReactive resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-020 — Constellation.warpOnClick

**Basis:** Constellation.warpOnClick is omission-safe at false, but explicit first-party activation creates the RDA-016 contradiction: an aria-hidden/decorative canvas carries pointer affordance and a warp/well action whose GPU fork cannot paint the advertised overlay. A false default does not make the opt-in public branch valid.

**Acceptance:** The retained Canvas2D Constellation chooses one contract. Decorative and aria-hidden instances delete warpOnClick/gravity-well activation, cursor, listener, and interactive prose; a deliberately interactive instance exposes one named keyboard/touch/pointer command with causal state through the same warp owner. The omission default and every explicit override are directly exercised.

### PDC-021 — Constellation.wander

**Basis:** Constellation.wander=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The wander omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-022 — Constellation.gravityWell

**Basis:** Constellation.gravityWell is omission-safe at false, but explicit first-party activation creates the RDA-016 contradiction: an aria-hidden/decorative canvas carries pointer affordance and a warp/well action whose GPU fork cannot paint the advertised overlay. A false default does not make the opt-in public branch valid.

**Acceptance:** The retained Canvas2D Constellation chooses one contract. Decorative and aria-hidden instances delete warpOnClick/gravity-well activation, cursor, listener, and interactive prose; a deliberately interactive instance exposes one named keyboard/touch/pointer command with causal state through the same warp owner. The omission default and every explicit override are directly exercised.

### PDC-023 — Constellation.opacityCeiling

**Basis:** Constellation.opacityCeiling=1 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The opacityCeiling omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-024 — Constellation.pinned

**Basis:** Constellation.pinned=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The pinned omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-025 — Constellation.accentEdges

**Basis:** Constellation.accentEdges=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The accentEdges omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-026 — Constellation.pinnedDrift

**Basis:** Constellation.pinnedDrift=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 8 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The pinnedDrift omission value derives from the constellation owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-027 — Constellation.warpAutoRelease

**Basis:** Constellation.warpAutoRelease=false is a behavior motion or interaction with 8 direct demo occurrence(s), 7 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Constellation.warpAutoRelease resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-028 — Constellation.backgroundInteractive

**Basis:** Constellation.backgroundInteractive is omission-safe at false, but explicit first-party activation creates the RDA-016 contradiction: an aria-hidden/decorative canvas carries pointer affordance and a warp/well action whose GPU fork cannot paint the advertised overlay. A false default does not make the opt-in public branch valid.

**Acceptance:** The retained Canvas2D Constellation chooses one contract. Decorative and aria-hidden instances delete warpOnClick/gravity-well activation, cursor, listener, and interactive prose; a deliberately interactive instance exposes one named keyboard/touch/pointer command with causal state through the same warp owner. The omission default and every explicit override are directly exercised.

### PDC-029 — DarkModeToggle.passive

**Basis:** passive defaults false, but the public option retains the same click/pointer styling and handlers on a div that intentionally performs no theme action. Omission safety cannot legitimize a consumerless no-op branch.

**Acceptance:** Delete passive and its story/branch without alias. DarkModeToggle has one native pressed-command path; any separately needed decorative icon has no pointer cursor, focus style, activation handler, operable name, or Toggle identity.

### PDC-030 — DarkModeToggle.size

**Basis:** DarkModeToggle.size="md" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the dark-mode-toggle owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-031 — DarkModeToggle.disableTransitions

**Basis:** DarkModeToggle.disableTransitions=false is a behavior motion or interaction with 5 direct demo occurrence(s), 4 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, DarkModeToggle.disableTransitions resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-032 — DarkModeToggle.eclipse

**Basis:** DarkModeToggle.eclipse=false is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The eclipse omission value derives from the dark-mode-toggle owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-033 — DeckPager.ariaLabel

**Basis:** DeckPager.ariaLabel="Slides" is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The ariaLabel omission value derives from the deck owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-034 — DeckPager.ring

**Basis:** DeckPager.ring=false is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The ring omission value derives from the deck owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-035 — DeckPager.index

**Basis:** DeckPager.index=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The index omission value derives from the deck owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-036 — DockBackgroundToggle.paused

**Basis:** DockBackgroundToggle.paused=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The paused omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-037 — DockBackgroundToggle.pauseLabel

**Basis:** DockBackgroundToggle.pauseLabel="Pause background animation" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The pauseLabel omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-038 — DockBackgroundToggle.playLabel

**Basis:** DockBackgroundToggle.playLabel="Resume background animation" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The playLabel omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-039 — DockControl.shape

**Basis:** DockControl.shape="icon" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 123 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The shape omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-040 — DockControl.compact

**Basis:** DockControl.compact=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 123 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The compact omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-041 — DockControl.active

**Basis:** DockControl.active=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 123 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The active omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-042 — DockControl.type

**Basis:** DockControl.type="button" is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 123 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The type omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-043 — DockControl.disabled

**Basis:** DockControl.disabled=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 123 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The disabled omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-044 — DockControl.as

**Basis:** DockControl.as="button" is a host mode or semantic shape with 120 direct demo occurrence(s), 118 exercising omission, 2 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, DockControl.as resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-045 — DockControl.asChild

**Basis:** DockControl.asChild=false is a host mode or semantic shape with 120 direct demo occurrence(s), 118 exercising omission, 0 explicit override(s), and 2 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, DockControl.asChild resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-046 — DockCrossfade.reserve

**Basis:** DockCrossfade.reserve="block" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The reserve omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-047 — DockLayerGroup.showRail

**Basis:** DockLayerGroup.showRail=true is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The showRail omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-048 — DockLayerGroup.railPosition

**Basis:** DockLayerGroup.railPosition="start" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The railPosition omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-049 — DockSection.ariaLabel

**Basis:** DockSection.ariaLabel="Dock sections" is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The ariaLabel omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-050 — DockSeparator.anchor

**Basis:** DockSeparator.anchor=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 15 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The anchor omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-051 — DockStack.mode

**Basis:** DockStack.mode="stack" is a host mode or semantic shape with 3 direct demo occurrence(s), 1 exercising omission, 2 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, DockStack.mode resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-052 — DockStack.coreLabel

**Basis:** DockStack.coreLabel="Open stack" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The coreLabel omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-053 — DockStack.visibleCount

**Basis:** DockStack.visibleCount=3 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The visibleCount omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-054 — DockStack.wrap

**Basis:** DockStack.wrap=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The wrap omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-055 — DockStack.position

**Basis:** DockStack.position="end" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The position omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-056 — DockTrigger.for

**Basis:** DockTrigger.for="select" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The for omission value derives from the dock owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-057 — GlassDock.autoLuminance

**Basis:** GlassDock.autoLuminance=true is a behavior motion or interaction with 33 direct demo occurrence(s), 33 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, GlassDock.autoLuminance resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-058 — EasingConfigurator.label

**Basis:** EasingConfigurator.label="Easing" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The label omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-059 — EasingConfigurator.name

**Basis:** EasingConfigurator.name=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The name omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-060 — EasingConfigurator.mode

**Basis:** EasingConfigurator.mode="bezier" is a host mode or semantic shape with 1 direct demo occurrence(s), 0 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, EasingConfigurator.mode resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-061 — EasingConfigurator.preset

**Basis:** EasingConfigurator.preset=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The preset omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-062 — EasingConfigurator.steps

**Basis:** EasingConfigurator.steps=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The steps omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-063 — EasingConfigurator.term

**Basis:** EasingConfigurator.term=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The term omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-064 — EasingPicker.mode

**Basis:** Bezier is the public default while every current direct picker occurrence explicitly selects a mode. The exercised Bezier default surface has two causal SVG handles absent from the focus/role/value tree; explicit story coverage cannot launder the omission path.

**Acceptance:** A direct default-mode EasingPicker scenario discovers two named bounded value controls with focus, visible focus, Arrow adjustment, and pointer/touch parity through setHandle. Explicit Steps/Spring modes retain their own coherent semantics, and mode omission is never inferred as PASS from an explicit-mode story.

### PDC-065 — EasingPicker.preset

**Basis:** EasingPicker.preset=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The preset omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-066 — EasingPicker.steps

**Basis:** EasingPicker.steps=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The steps omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-067 — EasingPicker.term

**Basis:** EasingPicker.term=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The term omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-068 — EasingPicker.readout

**Basis:** EasingPicker.readout=true is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The readout omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-069 — EasingPicker.playback

**Basis:** Playback defaults on and all current picker uses inherit it, but the exercised preview owns an undeclared fixed 1200ms rAF loop with no playing/restart/PRM state. A default-on temporal episode requires its own direct lifecycle evidence.

**Acceptance:** The default preview is a bounded editor-local normalized one-shot with explicit playing/restart/interruption state, reactive PRM immediate completion, teardown, and one writer; hiding it requires an explicit product decision and restoring an unlabeled fixed clock turns temporal/scenario evidence RED.

### PDC-070 — EasingPicker.label

**Basis:** EasingPicker.label="Easing curve" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The label omission value derives from the easing owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-071 — ExpandableContainer.buttonPosition

**Basis:** ExpandableContainer.buttonPosition="right" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The buttonPosition omission value derives from the expandable-container owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-072 — ExpandableContainer.expandLabel

**Basis:** ExpandableContainer.expandLabel="Fullscreen" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The expandLabel omission value derives from the expandable-container owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-073 — ExpandableContainer.collapseLabel

**Basis:** ExpandableContainer.collapseLabel="Exit fullscreen" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The collapseLabel omission value derives from the expandable-container owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-074 — ExpandableContainer.surface

**Basis:** ExpandableContainer.surface="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the expandable-container owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-075 — ExpandableContainer.open

**Basis:** ExpandableContainer.open=false is a behavior motion or interaction with 6 direct demo occurrence(s), 6 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, ExpandableContainer.open resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-076 — FadingScroll.axis

**Basis:** FadingScroll.axis="x" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 10 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The axis omission value derives from the fading-scroll owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-077 — FadingScroll.fadeEnd

**Basis:** FadingScroll.fadeEnd=true is a behavior motion or interaction with 7 direct demo occurrence(s), 7 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, FadingScroll.fadeEnd resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-078 — FadingScroll.fadeStart

**Basis:** FadingScroll.fadeStart=true is a behavior motion or interaction with 7 direct demo occurrence(s), 7 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, FadingScroll.fadeStart resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-079 — FourierField.seed

**Basis:** FourierField.seed="" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The seed omission value derives from the fourier-field owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-080 — FourierField.freeze

**Basis:** FourierField.freeze=false is a behavior motion or interaction with 1 direct demo occurrence(s), 1 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, FourierField.freeze resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-081 — GooFilter.extra

**Basis:** GooFilter.extra=() => [] is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The extra omission value derives from the goo-filter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-082 — HandMark.brush

**Basis:** HandMark.brush="pen" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The brush omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-083 — HandMark.shape

**Basis:** HandMark.shape="underline" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The shape omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-084 — HandMark.color

**Basis:** HandMark.color="currentColor" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The color omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-085 — HandMark.seed

**Basis:** HandMark.seed=1 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The seed omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-086 — HandMark.animation

**Basis:** HandMark.animation="none" is a behavior motion or interaction with 16 direct demo occurrence(s), 15 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, HandMark.animation resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-087 — HandMark.drawMs

**Basis:** HandMark.drawMs=800 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The drawMs omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-088 — HandMark.drawDelayMs

**Basis:** HandMark.drawDelayMs=0 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The drawDelayMs omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-089 — HandMark.appear

**Basis:** HandMark.appear="visible" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The appear omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-090 — HandMark.boilFps

**Basis:** HandMark.boilFps=8 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The boilFps omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-091 — HandMark.boilFrames

**Basis:** HandMark.boilFrames=3 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The boilFrames omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-092 — HandMark.jagged

**Basis:** HandMark.jagged=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 16 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The jagged omission value derives from the handmark owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-093 — HeaderRibbon.placement

**Basis:** HeaderRibbon.placement="left" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The placement omission value derives from the header-ribbon owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-094 — HeaderRibbon.hideTimeoutMs

**Basis:** HeaderRibbon.hideTimeoutMs=2000 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The hideTimeoutMs omission value derives from the header-ribbon owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-095 — InfiniteScroll.threshold

**Basis:** InfiniteScroll.threshold=200 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The threshold omission value derives from the infinite-scroll owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-096 — ChassisDivider.orientation

**Basis:** ChassisDivider.orientation="horizontal" is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The orientation omission value derives from the instrument-chassis owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-097 — InstrumentChassis.variant

**Basis:** InstrumentChassis.variant="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the instrument-chassis owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-098 — MetricBadge.size

**Basis:** MetricBadge.size='md' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 45 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-099 — MetricCell.iconSize

**Basis:** MetricCell.iconSize=14 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The iconSize omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-100 — MetricCell.iconStrokeWidth

**Basis:** MetricCell.iconStrokeWidth=2 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The iconStrokeWidth omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-101 — MetricCell.appearance

**Basis:** MetricCell.appearance="dashboard" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The appearance omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-102 — MetricRow.iconSize

**Basis:** MetricRow.iconSize=16 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The iconSize omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-103 — MetricRow.iconStrokeWidth

**Basis:** MetricRow.iconStrokeWidth=2 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The iconStrokeWidth omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-104 — MetricRow.digitCount

**Basis:** MetricRow.digitCount=3 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The digitCount omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-105 — MetricRow.colorTinted

**Basis:** MetricRow.colorTinted=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The colorTinted omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-106 — MetricRow.active

**Basis:** MetricRow.active=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The active omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-107 — MetricRow.protagonist

**Basis:** MetricRow.protagonist=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The protagonist omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-108 — MetricStack.containerName

**Basis:** MetricStack.containerName="metric-stack" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The containerName omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-109 — MetricStack.rows

**Basis:** MetricStack.rows=4 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The rows omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-110 — MetricStack.as

**Basis:** MetricStack.as="div" is a host mode or semantic shape with 2 direct demo occurrence(s), 2 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, MetricStack.as resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-111 — MetricStack.register

**Basis:** MetricStack.register="audacious" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The register omission value derives from the metric owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-112 — PagerDots.orientation

**Basis:** PagerDots.orientation="horizontal" is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The orientation omission value derives from the pager-dots owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-113 — PagerDots.ring

**Basis:** PagerDots.ring=true is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The ring omission value derives from the pager-dots owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-114 — PagerDots.pattern

**Basis:** PagerDots.pattern="tabs" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The pattern omission value derives from the pager-dots owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-115 — PagerDots.ariaLabel

**Basis:** PagerDots.ariaLabel="Pager" is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The ariaLabel omission value derives from the pager-dots owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-116 — PagerDots.active

**Basis:** PagerDots.active=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The active omission value derives from the pager-dots owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-117 — Pulse.variant

**Basis:** Pulse.variant='dots' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 15 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the pulse owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-118 — Pulse.count

**Basis:** Pulse.count=3 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 15 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The count omission value derives from the pulse owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-119 — Pulse.speed

**Basis:** Pulse.speed='normal' is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 15 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The speed omission value derives from the pulse owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-120 — Pulse.intensity

**Basis:** Pulse.intensity='normal' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 15 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The intensity omission value derives from the pulse owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-121 — Pulse.once

**Basis:** Pulse.once=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 15 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The once omission value derives from the pulse owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-122 — FuzzySearch.placeholder

**Basis:** FuzzySearch.placeholder="Search…" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The placeholder omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-123 — FuzzySearch.size

**Basis:** FuzzySearch.size="md" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-124 — FuzzySearch.surface

**Basis:** FuzzySearch.surface="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-125 — FuzzySearch.variant

**Basis:** FuzzySearch.variant="inline" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-126 — SearchBar.modelValue

**Basis:** SearchBar.modelValue="" is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The modelValue omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-127 — SearchBar.placeholder

**Basis:** SearchBar.placeholder="Search…" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The placeholder omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-128 — SearchBar.tag

**Basis:** SearchBar.tag="div" is a host mode or semantic shape with 4 direct demo occurrence(s), 4 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, SearchBar.tag resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-129 — SearchBar.size

**Basis:** SearchBar.size="md" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-130 — SearchBar.surface

**Basis:** SearchBar.surface="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-131 — SearchBar.variant

**Basis:** SearchBar.variant="inline" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the search owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-132 — SortableHandle.as

**Basis:** SortableHandle.as defaults to "span"; the composed public default therefore resolves reorder handles/items/list to span/div hosts while the current engine supplies pointer-only drag. The direct story proved causal reorder without list/listitem/native-button or keyboard transaction semantics.

**Acceptance:** The default SortableList renders a semantic list, stable listitems, and named native button handles. Space/Enter lift/drop, Arrow/Home/End travel, Escape cancel, focus, announcements, pointer, and touch converge on one transaction; polymorphic overrides must preserve equivalent semantics rather than inherit generic hosts.

### PDC-133 — SortableItem.as

**Basis:** SortableItem.as defaults to "div"; the composed public default therefore resolves reorder handles/items/list to span/div hosts while the current engine supplies pointer-only drag. The direct story proved causal reorder without list/listitem/native-button or keyboard transaction semantics.

**Acceptance:** The default SortableList renders a semantic list, stable listitems, and named native button handles. Space/Enter lift/drop, Arrow/Home/End travel, Escape cancel, focus, announcements, pointer, and touch converge on one transaction; polymorphic overrides must preserve equivalent semantics rather than inherit generic hosts.

### PDC-134 — SortableList.handleSelector

**Basis:** SortableList.handleSelector="[data-sortable-handle]" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The handleSelector omission value derives from the sortable-list owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-135 — SortableList.axis

**Basis:** SortableList.axis="y" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The axis omission value derives from the sortable-list owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-136 — SortableList.as

**Basis:** SortableList.as defaults to "div"; the composed public default therefore resolves reorder handles/items/list to span/div hosts while the current engine supplies pointer-only drag. The direct story proved causal reorder without list/listitem/native-button or keyboard transaction semantics.

**Acceptance:** The default SortableList renders a semantic list, stable listitems, and named native button handles. Space/Enter lift/drop, Arrow/Home/End travel, Escape cancel, focus, announcements, pointer, and touch converge on one transaction; polymorphic overrides must preserve equivalent semantics rather than inherit generic hosts.

### PDC-137 — SpaView.transition

**Basis:** SpaView.transition="fade" is a behavior motion or interaction with 1 direct demo occurrence(s), 1 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, SpaView.transition resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-138 — SplitChars.as

**Basis:** SplitChars.as="span" is a host mode or semantic shape with 4 direct demo occurrence(s), 2 exercising omission, 2 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, SplitChars.as resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-139 — SplitChars.by

**Basis:** SplitChars.by="char" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The by omission value derives from the split-chars owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-140 — SplitChars.stagger

**Basis:** SplitChars.stagger=true is a behavior motion or interaction with 4 direct demo occurrence(s), 3 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, SplitChars.stagger resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-141 — StackedIconGroup.maxVisible

**Basis:** StackedIconGroup.maxVisible belongs to a zero-external-import layout wrapper already allocated to deletion. In its direct story, seven items/maxVisible=3 render only three item pucks plus +4; hidden items are sliced out before rendering and effective overlap is 0px, so expandOnHover's advertised reveal/stack is structurally impossible.

**Acceptance:** Delete the component, /stacked-icons export, all six default declarations, hover CSS, dedicated story branch, tests, types, and docs; migrate local avatar/display sites to ordinary owner composition. No alias, private wrapper, or repaired novelty survives.

### PDC-142 — StackedIconGroup.orientation

**Basis:** StackedIconGroup.orientation belongs to a zero-external-import layout wrapper already allocated to deletion. In its direct story, seven items/maxVisible=3 render only three item pucks plus +4; hidden items are sliced out before rendering and effective overlap is 0px, so expandOnHover's advertised reveal/stack is structurally impossible.

**Acceptance:** Delete the component, /stacked-icons export, all six default declarations, hover CSS, dedicated story branch, tests, types, and docs; migrate local avatar/display sites to ordinary owner composition. No alias, private wrapper, or repaired novelty survives.

### PDC-143 — StackedIconGroup.reversed

**Basis:** StackedIconGroup.reversed belongs to a zero-external-import layout wrapper already allocated to deletion. In its direct story, seven items/maxVisible=3 render only three item pucks plus +4; hidden items are sliced out before rendering and effective overlap is 0px, so expandOnHover's advertised reveal/stack is structurally impossible.

**Acceptance:** Delete the component, /stacked-icons export, all six default declarations, hover CSS, dedicated story branch, tests, types, and docs; migrate local avatar/display sites to ordinary owner composition. No alias, private wrapper, or repaired novelty survives.

### PDC-144 — StackedIconGroup.size

**Basis:** StackedIconGroup.size belongs to a zero-external-import layout wrapper already allocated to deletion. In its direct story, seven items/maxVisible=3 render only three item pucks plus +4; hidden items are sliced out before rendering and effective overlap is 0px, so expandOnHover's advertised reveal/stack is structurally impossible.

**Acceptance:** Delete the component, /stacked-icons export, all six default declarations, hover CSS, dedicated story branch, tests, types, and docs; migrate local avatar/display sites to ordinary owner composition. No alias, private wrapper, or repaired novelty survives.

### PDC-145 — StackedIconGroup.expandOnHover

**Basis:** StackedIconGroup.expandOnHover belongs to a zero-external-import layout wrapper already allocated to deletion. In its direct story, seven items/maxVisible=3 render only three item pucks plus +4; hidden items are sliced out before rendering and effective overlap is 0px, so expandOnHover's advertised reveal/stack is structurally impossible.

**Acceptance:** Delete the component, /stacked-icons export, all six default declarations, hover CSS, dedicated story branch, tests, types, and docs; migrate local avatar/display sites to ordinary owner composition. No alias, private wrapper, or repaired novelty survives.

### PDC-146 — StackedIconGroup.as

**Basis:** StackedIconGroup.as belongs to a zero-external-import layout wrapper already allocated to deletion. In its direct story, seven items/maxVisible=3 render only three item pucks plus +4; hidden items are sliced out before rendering and effective overlap is 0px, so expandOnHover's advertised reveal/stack is structurally impossible.

**Acceptance:** Delete the component, /stacked-icons export, all six default declarations, hover CSS, dedicated story branch, tests, types, and docs; migrate local avatar/display sites to ordinary owner composition. No alias, private wrapper, or repaired novelty survives.

### PDC-147 — StatusDot.variant

**Basis:** StatusDot.variant="active" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the status-dot owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-148 — StatusDot.pulse

**Basis:** StatusDot.pulse=false is a behavior motion or interaction with 4 direct demo occurrence(s), 3 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, StatusDot.pulse resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-149 — StatusDot.size

**Basis:** StatusDot.size="sm" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the status-dot owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-150 — SegmentedTabs.variant

**Basis:** SegmentedTabs.variant="pill" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 20 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the tabs owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-151 — SegmentedTabs.orientation

**Basis:** SegmentedTabs.orientation="horizontal" is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 20 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The orientation omission value derives from the tabs owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-152 — SegmentedTabs.responsive

**Basis:** SegmentedTabs.responsive=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 20 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The responsive omission value derives from the tabs owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-153 — ContinuousTimeline.disablePopover

**Basis:** ContinuousTimeline.disablePopover=false is a behavior motion or interaction with 0 direct demo occurrence(s), 0 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, ContinuousTimeline.disablePopover resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-154 — GlassTimeline.variant

**Basis:** GlassTimeline.variant="scrubber" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the timeline owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-155 — GlassTimeline.modelValue

**Basis:** GlassTimeline.modelValue=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 4 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The modelValue omission value derives from the timeline owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-156 — GlassTimeline.disablePopover

**Basis:** GlassTimeline.disablePopover=false is a behavior motion or interaction with 4 direct demo occurrence(s), 4 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, GlassTimeline.disablePopover resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-157 — ScrubberTimeline.modelValue

**Basis:** ScrubberTimeline.modelValue=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The modelValue omission value derives from the timeline owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-158 — TypewriterText.text

**Basis:** TypewriterText.text=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The text omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-159 — TypewriterText.words

**Basis:** TypewriterText.words=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The words omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-160 — TypewriterText.ngramSize

**Basis:** TypewriterText.ngramSize=() => ({ min: 1, max: 3 }) is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The ngramSize omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-161 — TypewriterText.baseSpeed

**Basis:** TypewriterText.baseSpeed=150 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The baseSpeed omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-162 — TypewriterText.variance

**Basis:** TypewriterText.variance=0.4 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variance omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-163 — TypewriterText.errorRate

**Basis:** TypewriterText.errorRate=0.015 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The errorRate omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-164 — TypewriterText.firstAnimationSpeedFactor

**Basis:** TypewriterText.firstAnimationSpeedFactor=0.6 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The firstAnimationSpeedFactor omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-165 — TypewriterText.maxCharsBeforeNotice

**Basis:** TypewriterText.maxCharsBeforeNotice=4 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The maxCharsBeforeNotice omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-166 — TypewriterText.continueAfterTypoProbability

**Basis:** TypewriterText.continueAfterTypoProbability=0.6 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The continueAfterTypoProbability omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-167 — TypewriterText.sequentialTypoDecay

**Basis:** TypewriterText.sequentialTypoDecay=0.3 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The sequentialTypoDecay omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-168 — TypewriterText.correctionSpeedMultiplier

**Basis:** TypewriterText.correctionSpeedMultiplier=0.5 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The correctionSpeedMultiplier omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-169 — TypewriterText.cursorVisible

**Basis:** TypewriterText.cursorVisible=true is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The cursorVisible omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-170 — TypewriterText.cursorBlink

**Basis:** TypewriterText.cursorBlink=true is a behavior motion or interaction with 2 direct demo occurrence(s), 0 exercising omission, 2 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, TypewriterText.cursorBlink resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-171 — TypewriterText.cursorChar

**Basis:** TypewriterText.cursorChar="|" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The cursorChar omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-172 — TypewriterText.startDelay

**Basis:** TypewriterText.startDelay=0 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The startDelay omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-173 — TypewriterText.loop

**Basis:** TypewriterText.loop=false is a behavior motion or interaction with 2 direct demo occurrence(s), 1 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, TypewriterText.loop resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-174 — TypewriterText.pauseAfterType

**Basis:** TypewriterText.pauseAfterType=3000 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The pauseAfterType omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-175 — TypewriterText.pauseAfterDelete

**Basis:** TypewriterText.pauseAfterDelete=800 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The pauseAfterDelete omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-176 — TypewriterText.deletingSpeed

**Basis:** TypewriterText.deletingSpeed=70 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The deletingSpeed omission value derives from the typewriter owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-177 — TypewriterText.interactive

**Basis:** interactive defaults true while both direct first-party Typewriter instances explicitly set it false. External omission therefore receives pointer-only per-glyph backspace that no direct story, keyboard model, focus model, or product owner demonstrates.

**Acceptance:** Delete interactive and per-character click-backspace unless a separately authorized coherent rewind/edit concept supplies one named semantic control or full text-editing composite, keyboard/pointer parity, causal readback, and a direct default scenario. Ordinary glyphs remain text.

### PDC-178 — TypewriterText.respectReducedMotion

**Basis:** TypewriterText.respectReducedMotion=true is a behavior motion or interaction with 2 direct demo occurrence(s), 2 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, TypewriterText.respectReducedMotion resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-179 — WatercolorDot.variant

**Basis:** WatercolorDot.variant="solid" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the watercolor-dot owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-180 — WatercolorDot.animate

**Basis:** WatercolorDot.animate=false is a behavior motion or interaction with 5 direct demo occurrence(s), 2 exercising omission, 3 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, WatercolorDot.animate resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-181 — WatercolorDot.tag

**Basis:** WatercolorDot.tag="div" is a host mode or semantic shape with 5 direct demo occurrence(s), 5 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, WatercolorDot.tag resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-182 — WatercolorDot.cycleDuration

**Basis:** WatercolorDot.cycleDuration=4000 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The cycleDuration omission value derives from the watercolor-dot owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-183 — WatercolorDot.range

**Basis:** WatercolorDot.range=() => [20, 80] is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The range omission value derives from the watercolor-dot owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-184 — WatercolorDot.seed

**Basis:** WatercolorDot.seed="" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The seed omission value derives from the watercolor-dot owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-185 — ModalOverlay.scrim

**Basis:** ModalOverlay.scrim="glass" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The scrim omission value derives from the ModalOverlay owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-186 — ModalOverlay.animate

**Basis:** ModalOverlay.animate="fade" is a behavior motion or interaction with 0 direct demo occurrence(s), 0 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, ModalOverlay.animate resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-187 — ModalOverlay.layout

**Basis:** ModalOverlay.layout="centered" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The layout omission value derives from the ModalOverlay owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-188 — Avatar.size

**Basis:** Avatar.size='sm' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the avatar owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-189 — Avatar.shape

**Basis:** Avatar.shape='circle' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 6 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The shape omission value derives from the avatar owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-190 — Button.as

**Basis:** Button.as='button' is a host mode or semantic shape with 160 direct demo occurrence(s), 160 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Button.as resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-191 — Card.tier

**Basis:** Card.tier="resting" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The tier omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-192 — Card.surface

**Basis:** Card.surface="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-193 — Card.deep

**Basis:** Card.deep=false is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The deep omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-194 — Card.shadow

**Basis:** Card.shadow=true is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The shadow omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-195 — Card.grain

**Basis:** Card.grain=true is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The grain omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-196 — Card.grid

**Basis:** Card.grid=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The grid omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-197 — Card.specular

**Basis:** Card.specular="off" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The specular omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-198 — Card.metal

**Basis:** Card.metal="gold" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 47 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The metal omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-199 — Card.as

**Basis:** Card.as="div" is a host mode or semantic shape with 46 direct demo occurrence(s), 43 exercising omission, 3 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Card.as resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-200 — ScrollCard.tier

**Basis:** ScrollCard.tier="resting" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The tier omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-201 — ScrollCard.surface

**Basis:** ScrollCard.surface="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-202 — ScrollCard.shadow

**Basis:** ScrollCard.shadow=true is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The shadow omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-203 — ScrollCard.specular

**Basis:** ScrollCard.specular="off" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The specular omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-204 — ScrollCard.maxHeight

**Basis:** ScrollCard.maxHeight="18rem" is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The maxHeight omission value derives from the card owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-205 — Carousel.orientation

**Basis:** Carousel.orientation='horizontal' is classified as host mode or semantic shape from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The orientation omission value derives from the carousel owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-206 — Carousel.active

**Basis:** Carousel.active=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The active omission value derives from the carousel owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-207 — CarouselContent.arrival

**Basis:** CarouselContent.arrival=false is a behavior motion or interaction with 5 direct demo occurrence(s), 2 exercising omission, 3 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, CarouselContent.arrival resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-208 — CarouselNext.variant

**Basis:** CarouselNext.variant='outline' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 0 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the carousel owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-209 — CarouselPager.showCounter

**Basis:** CarouselPager.showCounter=true is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The showCounter omission value derives from the carousel owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-210 — CarouselPrevious.variant

**Basis:** CarouselPrevious.variant='outline' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 0 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the carousel owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-211 — GlassCarouselPager.orientation

**Basis:** GlassCarouselPager.orientation configures an exported pager with zero source, demo, test, or external runtime consumers. The live Carousel story exercises CarouselPager 1 / 6→2 / 6 with stable native-button focus and renders no GlassCarouselPager; the unused member independently forks counter/navigation/loop semantics.

**Acceptance:** Delete GlassCarouselPager and both exports without alias. Keep the exercised CarouselPager and shared PagerDots as the only previous/next/counter/direct-position projections over one Carousel identity, loop, focus, announcement, drag, and autoplay-pause owner.

### PDC-212 — GlassCarouselPager.showCounter

**Basis:** GlassCarouselPager.showCounter configures an exported pager with zero source, demo, test, or external runtime consumers. The live Carousel story exercises CarouselPager 1 / 6→2 / 6 with stable native-button focus and renders no GlassCarouselPager; the unused member independently forks counter/navigation/loop semantics.

**Acceptance:** Delete GlassCarouselPager and both exports without alias. Keep the exercised CarouselPager and shared PagerDots as the only previous/next/counter/direct-position projections over one Carousel identity, loop, focus, announcement, drag, and autoplay-pause owner.

### PDC-213 — GlassCarouselPager.loop

**Basis:** GlassCarouselPager.loop configures an exported pager with zero source, demo, test, or external runtime consumers. The live Carousel story exercises CarouselPager 1 / 6→2 / 6 with stable native-button focus and renders no GlassCarouselPager; the unused member independently forks counter/navigation/loop semantics.

**Acceptance:** Delete GlassCarouselPager and both exports without alias. Keep the exercised CarouselPager and shared PagerDots as the only previous/next/counter/direct-position projections over one Carousel identity, loop, focus, announcement, drag, and autoplay-pause owner.

### PDC-214 — ComboboxList.position

**Basis:** ComboboxList.position='popper' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The position omission value derives from the combobox owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-215 — ComboboxList.align

**Basis:** ComboboxList.align='center' is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The align omission value derives from the combobox owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-216 — ComboboxList.sideOffset

**Basis:** ComboboxList.sideOffset=4 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The sideOffset omission value derives from the combobox owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-217 — Command.open

**Basis:** Command.open=true is a behavior motion or interaction with 1 direct demo occurrence(s), 1 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Command.open resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-218 — Command.modelValue

**Basis:** Command.modelValue='' is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The modelValue omission value derives from the command owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-219 — Command.surface

**Basis:** Command.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the command owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-220 — CommandDialog.surface

**Basis:** CommandDialog.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 0 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the command owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-221 — CommandList.disableOutsidePointerEvents

**Basis:** CommandList.disableOutsidePointerEvents=false is a behavior motion or interaction with 1 direct demo occurrence(s), 1 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, CommandList.disableOutsidePointerEvents resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-222 — CommandList.surface

**Basis:** CommandList.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the command owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-223 — DataTable.isLoading

**Basis:** DataTable.isLoading=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The isLoading omission value derives from the data-table owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-224 — DataTable.rowKey

**Basis:** DataTable.rowKey="_id" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The rowKey omission value derives from the data-table owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-225 — DataTable.infinite

**Basis:** DataTable.infinite=false is a behavior motion or interaction with 1 direct demo occurrence(s), 1 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, DataTable.infinite resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-226 — DataTable.hasMore

**Basis:** DataTable.hasMore=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The hasMore omission value derives from the data-table owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-227 — DataTable.responsive

**Basis:** DataTable.responsive=false is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The responsive omission value derives from the data-table owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-228 — DataTable.cardBreakpoint

**Basis:** DataTable.cardBreakpoint=640 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The cardBreakpoint omission value derives from the data-table owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-229 — DialogContent.placement

**Basis:** DialogContent.placement='center' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 19 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The placement omission value derives from the dialog owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-230 — DialogContent.showClose

**Basis:** DialogContent.showClose=true is a behavior motion or interaction with 14 direct demo occurrence(s), 9 exercising omission, 5 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, DialogContent.showClose resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-231 — DialogContent.stage

**Basis:** DialogContent.stage='none' is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 19 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The stage omission value derives from the dialog owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-232 — DialogContent.surface

**Basis:** DialogContent.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 19 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the dialog owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-233 — Drawer.mode

**Basis:** Drawer.mode participates in a composed omission contract. The live fixed/content-sized modal story says no snap dragging, yet bottom/top omission synthesizes [0.12,0.5,1], renders an aria-hidden pointer-only handle, and a real drag moved 1→0.5. live-behind overlay/stage/detents are not independent props a consumer must remember to synchronize by folklore.

**Acceptance:** Resolve mode atomically: ordinary modal/content-sized omission means one full rest, modal isolation, its truthful scrim/stage, and no handle; live-behind may default to its declared ladder and no occluding overlay. Explicit multi-detent mode exposes a named slider-equivalent grip whose keyboard/pointer/touch paths share activeSnapPoint, paint, focus, announcement, interruption, and PRM state.

### PDC-234 — Drawer.open

**Basis:** Drawer.open=undefined is a behavior motion or interaction with 3 direct demo occurrence(s), 3 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Drawer.open resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-235 — Drawer.defaultOpen

**Basis:** Drawer.defaultOpen=false is a behavior motion or interaction with 3 direct demo occurrence(s), 3 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Drawer.defaultOpen resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-236 — Drawer.modal

**Basis:** Drawer.modal=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The modal omission value derives from the drawer owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-237 — Drawer.snapPoints

**Basis:** Drawer.snapPoints participates in a composed omission contract. The live fixed/content-sized modal story says no snap dragging, yet bottom/top omission synthesizes [0.12,0.5,1], renders an aria-hidden pointer-only handle, and a real drag moved 1→0.5. live-behind overlay/stage/detents are not independent props a consumer must remember to synchronize by folklore.

**Acceptance:** Resolve mode atomically: ordinary modal/content-sized omission means one full rest, modal isolation, its truthful scrim/stage, and no handle; live-behind may default to its declared ladder and no occluding overlay. Explicit multi-detent mode exposes a named slider-equivalent grip whose keyboard/pointer/touch paths share activeSnapPoint, paint, focus, announcement, interruption, and PRM state.

### PDC-238 — Drawer.activeSnapPoint

**Basis:** Drawer.activeSnapPoint=undefined is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The activeSnapPoint omission value derives from the drawer owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-239 — Drawer.direction

**Basis:** Drawer.direction participates in a composed omission contract. The live fixed/content-sized modal story says no snap dragging, yet bottom/top omission synthesizes [0.12,0.5,1], renders an aria-hidden pointer-only handle, and a real drag moved 1→0.5. live-behind overlay/stage/detents are not independent props a consumer must remember to synchronize by folklore.

**Acceptance:** Resolve mode atomically: ordinary modal/content-sized omission means one full rest, modal isolation, its truthful scrim/stage, and no handle; live-behind may default to its declared ladder and no occluding overlay. Explicit multi-detent mode exposes a named slider-equivalent grip whose keyboard/pointer/touch paths share activeSnapPoint, paint, focus, announcement, interruption, and PRM state.

### PDC-240 — Drawer.stage

**Basis:** Drawer.stage=undefined is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The stage omission value derives from the drawer owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-241 — DrawerContent.showOverlay

**Basis:** DrawerContent.showOverlay participates in a composed omission contract. The live fixed/content-sized modal story says no snap dragging, yet bottom/top omission synthesizes [0.12,0.5,1], renders an aria-hidden pointer-only handle, and a real drag moved 1→0.5. live-behind overlay/stage/detents are not independent props a consumer must remember to synchronize by folklore.

**Acceptance:** Resolve mode atomically: ordinary modal/content-sized omission means one full rest, modal isolation, its truthful scrim/stage, and no handle; live-behind may default to its declared ladder and no occluding overlay. Explicit multi-detent mode exposes a named slider-equivalent grip whose keyboard/pointer/touch paths share activeSnapPoint, paint, focus, announcement, interruption, and PRM state.

### PDC-242 — DrawerContent.surface

**Basis:** DrawerContent.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the drawer owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-243 — DropdownMenu.trigger

**Basis:** DropdownMenu.trigger='click' is a behavior motion or interaction with 7 direct demo occurrence(s), 6 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, DropdownMenu.trigger resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-244 — DropdownMenuContent.sideOffset

**Basis:** DropdownMenuContent.sideOffset=4 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 9 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The sideOffset omission value derives from the dropdown-menu owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-245 — DropdownMenuContent.align

**Basis:** DropdownMenuContent.align='start' is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 9 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The align omission value derives from the dropdown-menu owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-246 — DropdownMenuContent.surface

**Basis:** DropdownMenuContent.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 9 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the dropdown-menu owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-247 — Popover.trigger

**Basis:** Popover.trigger="click" is a behavior motion or interaction with 24 direct demo occurrence(s), 12 exercising omission, 12 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Popover.trigger resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-248 — Popover.openDelay

**Basis:** Popover.openDelay=250 is a behavior motion or interaction with 24 direct demo occurrence(s), 22 exercising omission, 2 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Popover.openDelay resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-249 — Popover.closeDelay

**Basis:** Popover.closeDelay=150 is a behavior motion or interaction with 24 direct demo occurrence(s), 24 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Popover.closeDelay resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-250 — Popover.keepDockOpen

**Basis:** Popover.keepDockOpen=false is a behavior motion or interaction with 24 direct demo occurrence(s), 21 exercising omission, 3 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Popover.keepDockOpen resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-251 — PopoverContent.align

**Basis:** PopoverContent.align="center" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 30 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The align omission value derives from the popover owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-252 — PopoverContent.sideOffset

**Basis:** PopoverContent.sideOffset=4 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 30 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The sideOffset omission value derives from the popover owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-253 — PopoverContent.portal

**Basis:** PopoverContent.portal=true is a behavior motion or interaction with 24 direct demo occurrence(s), 24 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, PopoverContent.portal resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-254 — PopoverContent.surface

**Basis:** PopoverContent.surface="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 30 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the popover owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-255 — Progress.modelValue

**Basis:** Progress.modelValue=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The modelValue omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-256 — Progress.variant

**Basis:** Progress.variant="default" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-257 — Progress.segments

**Basis:** Progress.segments=() => [] is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The segments omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-258 — Progress.currentSegmentKey

**Basis:** Progress.currentSegmentKey=null is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The currentSegmentKey omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-259 — Progress.activeProgress

**Basis:** Progress.activeProgress=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The activeProgress omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-260 — Progress.indeterminate

**Basis:** Progress.indeterminate=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 11 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The indeterminate omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-261 — ProgressSectioned.segments

**Basis:** ProgressSectioned.segments=() => [] is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The segments omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-262 — ProgressSectioned.currentSegmentKey

**Basis:** ProgressSectioned.currentSegmentKey=null is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The currentSegmentKey omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-263 — ProgressSectioned.activeProgress

**Basis:** ProgressSectioned.activeProgress=0 is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The activeProgress omission value derives from the progress owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-264 — Section.tone

**Basis:** Section.tone="heading" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The tone omission value derives from the section owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-265 — Section.gap

**Basis:** Section.gap="regular" is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The gap omission value derives from the section owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-266 — Section.backdrop

**Basis:** Section.backdrop="none" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 5 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The backdrop omission value derives from the section owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-267 — SelectContent.position

**Basis:** SelectContent.position='popper' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 10 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The position omission value derives from the select owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-268 — SelectContent.align

**Basis:** SelectContent.align='start' is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 10 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The align omission value derives from the select owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-269 — SelectContent.collisionPadding

**Basis:** SelectContent.collisionPadding=16 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 10 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The collisionPadding omission value derives from the select owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-270 — SelectContent.surface

**Basis:** SelectContent.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 10 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the select owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-271 — SelectTrigger.size

**Basis:** SelectTrigger.size='default' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 9 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the select owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-272 — SelectTrigger.variant

**Basis:** SelectTrigger.variant='default' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 9 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the select owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-273 — Skeleton.surface

**Basis:** Skeleton.surface='opaque' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 32 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the skeleton owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-274 — Skeleton.variant

**Basis:** Skeleton.variant='pulse' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 32 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the skeleton owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-275 — Slider.keepDockOpen

**Basis:** Slider.keepDockOpen=true is a behavior motion or interaction with 20 direct demo occurrence(s), 20 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Slider.keepDockOpen resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-276 — Surface.tier

**Basis:** Surface.tier="resting" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The tier omission value derives from the surface owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-277 — Surface.surface

**Basis:** Surface.surface="glass" is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the surface owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-278 — Surface.deep

**Basis:** Surface.deep=false is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The deep omission value derives from the surface owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-279 — Surface.shadow

**Basis:** Surface.shadow=false is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The shadow omission value derives from the surface owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-280 — Surface.grain

**Basis:** Surface.grain=false is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 7 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The grain omission value derives from the surface owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-281 — Surface.as

**Basis:** Surface.as="div" is a host mode or semantic shape with 6 direct demo occurrence(s), 6 exercising omission, 0 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Surface.as resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-282 — TableEmpty.colspan

**Basis:** TableEmpty.colspan=1 is classified as data or configuration default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The colspan omission value derives from the table owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-283 — Textarea.autosize

**Basis:** Textarea.autosize=false is a behavior motion or interaction with 6 direct demo occurrence(s), 5 exercising omission, 1 explicit override(s), and 0 spread-indeterminate use(s). It receives no PASS merely from its literal or from a sibling mode.

**Acceptance:** When omitted, Textarea.autosize resolves exactly one documented product state through the same owner as every explicit override. Current direct or composed stories exercise causality, reset/interruption where applicable, keyboard/pointer/touch equivalence for operable behavior, PRM/contrast/adaptive modes, and truthful readback; a hidden omission branch, stale prose, or unrelated visual change turns its owning scenario RED.

### PDC-284 — Toast.tone

**Basis:** Toast.tone='neutral' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The tone omission value derives from the notification-toast owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-285 — Toast.surface

**Basis:** Toast.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 2 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the notification-toast owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-286 — Toaster.position

**Basis:** Toaster.position='bottom-right' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 1 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The position omission value derives from the notification-toast owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-287 — Toggle.variant

**Basis:** Toggle.variant='default' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The variant omission value derives from the toggle owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-288 — Toggle.size

**Basis:** Toggle.size='md' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The size omission value derives from the toggle owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-289 — Toggle.disabled

**Basis:** Toggle.disabled=false is classified as public state seed from its exact AST occurrence. Direct-tag discovery found 3 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The disabled omission value derives from the toggle owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-290 — TooltipContent.sideOffset

**Basis:** TooltipContent.sideOffset=4 is classified as bounds timing or capacity from its exact AST occurrence. Direct-tag discovery found 17 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The sideOffset omission value derives from the tooltip owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.

### PDC-291 — TooltipContent.surface

**Basis:** TooltipContent.surface='glass' is classified as presentation default from its exact AST occurrence. Direct-tag discovery found 17 first-party occurrence(s); this is a review receipt, not evidence that tag spelling or cardinality defines runtime reachability.

**Acceptance:** The surface omission value derives from the tooltip owner, remains type/documentation/runtime congruent, has an explicit override path only where product variation is real, and is exercised through current composed stories when it changes semantics, geometry, material, timing, or state. Moving the component or changing syntax cannot erase enrollment.
