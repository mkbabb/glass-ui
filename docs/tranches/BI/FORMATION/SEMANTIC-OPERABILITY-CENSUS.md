# Semantic operability census — composed controls, not source rosters

**Status:** formation research only; not execution PASS and not native-browser π
**Bound source:** `26c5ae686fd0f1181083aebda1215b00524555f1`
**Vue files scanned:** 370
**Event-host rows:** 184 across 88 files
**Imperative/render-function rows:** 18 across 14 files
**Current RED source hosts:** 14 (12 template + 2 imperative), representing 9 distinct findings

## First-principles rule

An event directive is neither proof of interactivity nor proof of accessibility. A native `button` still needs a name, truthful state, causal effect, focus, target geometry, and disabled/error behavior. A generic `div` can be a valid slider or composite host when its complete role/value/focus/keyboard contract is real. A custom component can delegate correctly to a native descendant, or conceal a pointer-only `th`, `tr`, SVG handle, character span, canvas hit layer, or no-op branch. Therefore execution must rediscover composed controls from current route/import/render reachability. This frozen-source census is an audit input, never a file roster or cardinality gate.

## What the complete census exposed

The quote-aware scan found 184 template rows; the earlier first-`>` regex missed handlers whose quoted Vue expressions contained `=>`. The AST pass found 18 additional imperative/render-function rows, including a multiline Dock outside-dismissal listener and a native render-function button invisible to template scans. 46 template rows are intrinsic controls and 103 use typed Button/DockControl/Card facades, but neither class receives blanket PASS. Current RED hosts expose Blob's click surface, DataTable sort/select, Timeline event choices, EasingPicker handles, SortableList reorder, Typewriter's hidden default, DarkMode's no-op, Constellation's inert decorative click action, and Drawer's aria-hidden detent plus false fixed-mode claim. HeaderRibbon, semantic Timeline markers, PagerDots, Dock composites, Slider touch arbitration, Aurora's parallel Nuclei controls, and the SpaView render-function button are retained as positive delegation/alternative examples whose rendered semantics—not wrapper spellings—must remain operable.

## Disposition counts

| disposition | rows |
| --- | --- |
| ARIA_COMPOSITE_DESCENDANT_ENROLLED | 1 |
| ARIA_COMPOSITE_HOST_ENROLLED | 2 |
| CONDITIONAL_PRESS_PHYSICS_INTERNAL_ENROLLED | 1 |
| FALSE_AFFORDANCE_BRANCH_REPAIR_REQUIRED | 1 |
| LATENT_POINTER_ONLY_DEFAULT_REPAIR_REQUIRED | 2 |
| NATIVE_CONTROL_ENROLLED | 46 |
| POINTER_ONLY_ACTIVATION_REPAIR_REQUIRED | 3 |
| POINTER_ONLY_DESCENDANTS_REPAIR_REQUIRED | 1 |
| POINTER_ONLY_REORDER_REPAIR_REQUIRED | 1 |
| POINTER_ONLY_TABLE_BEHAVIOR_REPAIR_REQUIRED | 4 |
| POLYMORPHIC_NATIVE_CONTROL_INTERNAL_ENROLLED | 2 |
| PROPAGATION_ONLY_NOT_AN_OPERABLE_SURFACE | 3 |
| SEMANTIC_COMPOSITE_HOST_ENROLLED | 4 |
| SEMANTIC_DESCENDANT_DELEGATION_ENROLLED | 6 |
| SEMANTIC_DIRECT_MANIPULATION_HOST_ENROLLED | 1 |
| STRUCTURAL_COMPOSITE_EVENT_ENROLLED | 2 |
| STRUCTURAL_ESCAPE_LISTENER_ENROLLED | 1 |
| TYPED_CONTROL_COMPONENT_ENROLLED | 103 |

## Complete row ledger

| ID | source host | events | disposition | finding | owners |
| --- | --- | --- | --- | --- | --- |
| SOH-001 | demo/chassis/code/CodeBlock.vue:93 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-002 | demo/chassis/play/StoryPlayButton.vue:63 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-003 | demo/configurator/PresetEditor.vue:395 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-004 | demo/shell/BottomDock.vue:199 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-005 | demo/shell/BottomDock.vue:223 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-006 | demo/shell/BottomDock.vue:239 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-007 | demo/shell/BottomDock.vue:264 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-008 | demo/shell/BottomDock.vue:280 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-009 | demo/shell/NotFound.vue:19 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-010 | demo/shell/SidebarDock.vue:227 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-011 | demo/shell/SidebarDock.vue:281 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-012 | demo/stories/compositions/gate-pattern.vue:100 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-013 | demo/stories/compositions/gate-pattern.vue:103 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-014 | demo/stories/containers/card-pressable.vue:54 <Card> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-015 | demo/stories/containers/card-pressable.vue:104 <Card> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-016 | demo/stories/containers/configurator.vue:223 <button> | click.stop | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-017 | demo/stories/containers/dialog.vue:136 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-018 | demo/stories/containers/dialog.vue:161 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-019 | demo/stories/containers/dialog.vue:169 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-020 | demo/stories/containers/drawer.vue:154 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-021 | demo/stories/containers/drawer.vue:170 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-022 | demo/stories/containers/drawer.vue:178 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-023 | demo/stories/containers/drawer.vue:186 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-024 | demo/stories/containers/expandable-container.vue:90 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-025 | demo/stories/containers/expandable-container.vue:122 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-026 | demo/stories/data/infinite-scroll.vue:72 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-027 | demo/stories/data/instrument-chassis.vue:131 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-028 | demo/stories/data/timeline.vue:124 <li> | click | POINTER_ONLY_ACTIVATION_REPAIR_REQUIRED | RDA-033 | BI.W-P059, BI.W-P062, BI.W-P120 |
| SOH-029 | demo/stories/data/TimelineContinuousBody.vue:164 <GlassTimeline> | click | SEMANTIC_DESCENDANT_DELEGATION_ENROLLED | — | BI.W-P062, BI.W-P120 |
| SOH-030 | demo/stories/data/TimelineContinuousBody.vue:224 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-031 | demo/stories/data/TimelineContinuousBody.vue:231 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-032 | demo/stories/data/TimelineSegmentedBody.vue:147 <GlassTimeline> | click | SEMANTIC_DESCENDANT_DELEGATION_ENROLLED | — | BI.W-P062, BI.W-P120 |
| SOH-033 | demo/stories/data/TimelineSegmentedBody.vue:192 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-034 | demo/stories/data/TimelineSegmentedBody.vue:199 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-035 | demo/stories/data/virtual-section.vue:87 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-036 | demo/stories/display/buttons.vue:98 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-037 | demo/stories/dock/controls.vue:107 <div> | keydown | ARIA_COMPOSITE_HOST_ENROLLED | — | BI.W-P033, BI.W-P042, BI.W-P062 |
| SOH-038 | demo/stories/dock/controls.vue:114 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-039 | demo/stories/dock/cta-receive.vue:104 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-040 | demo/stories/dock/cta-receive.vue:114 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-041 | demo/stories/dock/cta-receive.vue:119 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-042 | demo/stories/dock/dock-search.vue:171 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-043 | demo/stories/dock/dock-search.vue:187 <input> | keydown | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-044 | demo/stories/dock/dock-search.vue:212 <li> | click | ARIA_COMPOSITE_DESCENDANT_ENROLLED | — | BI.W-P038, BI.W-P040, BI.W-P042, BI.W-P062 |
| SOH-045 | demo/stories/dock/layers.vue:91 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-046 | demo/stories/dock/layers.vue:110 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-047 | demo/stories/dock/layers.vue:186 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-048 | demo/stories/dock/layers.vue:288 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-049 | demo/stories/dock/overflow.vue:100 <div> | keydown | ARIA_COMPOSITE_HOST_ENROLLED | — | BI.W-P033, BI.W-P042, BI.W-P062 |
| SOH-050 | demo/stories/dock/overflow.vue:107 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-051 | demo/stories/dock/overview.vue:159 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-052 | demo/stories/dock/overview.vue:371 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-053 | demo/stories/dock/rail.vue:102 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-054 | demo/stories/feedback/completion-seal.vue:25 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-055 | demo/stories/feedback/confirm-dialog.vue:110 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-056 | demo/stories/feedback/confirm-dialog.vue:146 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-057 | demo/stories/feedback/confirm-dialog.vue:154 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-058 | demo/stories/feedback/confirm-dialog.vue:188 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-059 | demo/stories/feedback/confirm-dialog.vue:221 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-060 | demo/stories/feedback/confirm-dialog.vue:228 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-061 | demo/stories/feedback/confirm-dialog.vue:251 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-062 | demo/stories/feedback/confirm-dialog.vue:274 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-063 | demo/stories/feedback/confirm-dialog.vue:281 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-064 | demo/stories/feedback/notification.vue:99 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-065 | demo/stories/feedback/notification.vue:100 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-066 | demo/stories/feedback/notification.vue:101 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-067 | demo/stories/feedback/notification.vue:102 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-068 | demo/stories/feedback/progress.vue:92 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-069 | demo/stories/feedback/progress.vue:99 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-070 | demo/stories/feedback/toast.vue:139 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-071 | demo/stories/feedback/toast.vue:140 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-072 | demo/stories/feedback/toast.vue:141 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-073 | demo/stories/feedback/toast.vue:142 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-074 | demo/stories/feedback/toast.vue:143 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-075 | demo/stories/feedback/toast.vue:144 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-076 | demo/stories/feedback/toast.vue:145 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-077 | demo/stories/feedback/toaster.vue:48 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-078 | demo/stories/forms/combobox.vue:158 <button> | click.stop | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-079 | demo/stories/forms/labeled-field.vue:92 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-080 | demo/stories/forms/labeled-field.vue:117 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-081 | demo/stories/foundations/motion.vue:132 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-082 | demo/stories/motion/animated-digit.vue:47 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-083 | demo/stories/motion/countup.vue:37 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-084 | demo/stories/motion/countup.vue:38 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-085 | demo/stories/motion/countup.vue:39 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-086 | demo/stories/motion/curve-gallery.vue:228 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-087 | demo/stories/motion/curve-gallery.vue:301 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-088 | demo/stories/motion/deck.vue:196 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-089 | demo/stories/motion/deck.vue:200 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-090 | demo/stories/motion/handmark.vue:78 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-091 | demo/stories/motion/reveal.vue:62 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-092 | demo/stories/motion/reveal.vue:86 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-093 | demo/stories/motion/ScrollNativeBody.vue:135 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-094 | demo/stories/motion/ScrollReaderBody.vue:138 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-095 | demo/stories/motion/ScrollReaderBody.vue:162 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-096 | demo/stories/motion/split-chars.vue:57 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-097 | demo/stories/motion/springs.vue:188 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-098 | demo/stories/motion/springs.vue:288 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-099 | demo/stories/motion/springs.vue:302 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-100 | demo/stories/motion/tempo.vue:80 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-101 | demo/stories/motion/tempo.vue:81 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-102 | demo/stories/motion/tempo.vue:82 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-103 | demo/stories/motion/typewriter.vue:162 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-104 | demo/stories/substrates/aurora/AuroraConfigDock.vue:208 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-105 | demo/stories/substrates/aurora/config/NucleiLayer.vue:37 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-106 | demo/stories/substrates/aurora/config/NucleiLayer.vue:59 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-107 | demo/stories/substrates/aurora/config/PaletteLayer.vue:122 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-108 | demo/stories/substrates/aurora/config/PaletteLayer.vue:137 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-109 | demo/stories/substrates/aurora/config/PaletteLayer.vue:149 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-110 | demo/stories/substrates/aurora/config/PaletteLayer.vue:165 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-111 | demo/stories/substrates/aurora/OklchStopRow.vue:139 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-112 | demo/stories/substrates/aurora/PresetPickerRow.vue:51 <button> | click, keydown | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-113 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue:198 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-114 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue:213 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-115 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue:225 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-116 | demo/stories/substrates/aurora/sections/AuroraColorSection.vue:241 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-117 | demo/stories/substrates/blob.vue:491 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-118 | demo/stories/substrates/blob.vue:538 <Blob> | click | POINTER_ONLY_ACTIVATION_REPAIR_REQUIRED | RDA-031 | BI.W-P047, BI.W-P059, BI.W-P062 |
| SOH-119 | demo/stories/substrates/blob.vue:557 <button> | click.stop | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-120 | demo/stories/substrates/glass-material.vue:284 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-121 | src/components/custom/blob/Blob.vue:316 <div> | click | POINTER_ONLY_ACTIVATION_REPAIR_REQUIRED | RDA-031 | BI.W-P047, BI.W-P059, BI.W-P062 |
| SOH-122 | src/components/custom/configurator/Configurator.vue:291 <button> | click.stop | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-123 | src/components/custom/configurator/ConfiguratorLayer.vue:112 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-124 | src/components/custom/configurator/ConfiguratorRow.vue:134 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-125 | src/components/custom/controls/DarkModeToggle.vue:135 <component> | click, pointerdown | FALSE_AFFORDANCE_BRANCH_REPAIR_REQUIRED | RDA-034 | BI.W-P059, BI.W-P062, BI.W-P082 |
| SOH-126 | src/components/custom/dock/DockBackgroundToggle.vue:59 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-127 | src/components/custom/dock/DockControl.vue:145 <Primitive> | pointerdown | POLYMORPHIC_NATIVE_CONTROL_INTERNAL_ENROLLED | — | BI.W-P027, BI.W-P033, BI.W-P042, BI.W-P062 |
| SOH-128 | src/components/custom/dock/DockLayerGroup.vue:198 <div> | keydown | SEMANTIC_COMPOSITE_HOST_ENROLLED | — | BI.W-P035, BI.W-P037, BI.W-P042, BI.W-P062 |
| SOH-129 | src/components/custom/dock/DockLayerGroup.vue:216 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-130 | src/components/custom/dock/DockStack.vue:127 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-131 | src/components/custom/dock/DockStack.vue:152 <div> | keydown.escape | STRUCTURAL_ESCAPE_LISTENER_ENROLLED | — | BI.W-P037, BI.W-P040, BI.W-P042, BI.W-P062 |
| SOH-132 | src/components/custom/dock/DockStack.vue:170 <DockControl> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-133 | src/components/custom/dock/GlassDock.vue:307 <div> | touchstart, pointerdown.capture, click.capture | STRUCTURAL_COMPOSITE_EVENT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P062 |
| SOH-134 | src/components/custom/dock/GlassDock.vue:410 <div> | click | STRUCTURAL_COMPOSITE_EVENT_ENROLLED | — | BI.W-P033, BI.W-P034, BI.W-P035, BI.W-P036, BI.W-P037, BI.W-P038, BI.W-P039, BI.W-P040, BI.W-P041, BI.W-P042, BI.W-P062 |
| SOH-135 | src/components/custom/easing/EasingPicker.vue:218 <svg> | pointerdown | POINTER_ONLY_DESCENDANTS_REPAIR_REQUIRED | RDA-027 | BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P124 |
| SOH-136 | src/components/custom/easing/EasingPicker.vue:330 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-137 | src/components/custom/easing/EasingPicker.vue:342 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-138 | src/components/custom/expandable-container/ExpandableContainer.vue:18 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-139 | src/components/custom/expandable-container/ExpandableContainer.vue:84 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-140 | src/components/custom/header-ribbon/HeaderRibbon.vue:30 <div> | click | SEMANTIC_DESCENDANT_DELEGATION_ENROLLED | — | BI.W-P062, BI.W-P114 |
| SOH-141 | src/components/custom/pager-dots/PagerDots.vue:246 <div> | keydown | SEMANTIC_COMPOSITE_HOST_ENROLLED | — | BI.W-P062, BI.W-P118 |
| SOH-142 | src/components/custom/pager-dots/PagerDots.vue:321 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-143 | src/components/custom/search/FuzzySearch.vue:134 <input> | keydown | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-144 | src/components/custom/search/FuzzySearch.vue:140 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-145 | src/components/custom/search/FuzzySearch.vue:146 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-146 | src/components/custom/search/FuzzySearch.vue:156 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-147 | src/components/custom/search/FuzzySearch.vue:186 <input> | keydown | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-148 | src/components/custom/search/FuzzySearch.vue:190 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-149 | src/components/custom/search/FuzzySearch.vue:195 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-150 | src/components/custom/sortable-list/SortableItem.vue:36 <component> | pointerdown | POINTER_ONLY_REORDER_REPAIR_REQUIRED | RDA-013 | BI.W-P007, BI.W-P062 |
| SOH-151 | src/components/custom/tabs/SegmentedTabs.vue:349 <div> | keydown, pointerdown | SEMANTIC_COMPOSITE_HOST_ENROLLED | — | BI.W-P062, BI.W-P092 |
| SOH-152 | src/components/custom/tabs/SegmentedTabs.vue:427 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-153 | src/components/custom/tabs/SegmentedTabs.vue:453 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-154 | src/components/custom/timeline/ContinuousMarkers.vue:91 <button> | click, keydown | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-155 | src/components/custom/timeline/ContinuousMarkers.vue:156 <button> | click, keydown | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-156 | src/components/custom/timeline/ContinuousTimeline.vue:192 <ContinuousMarkers> | click | SEMANTIC_DESCENDANT_DELEGATION_ENROLLED | — | BI.W-P062, BI.W-P120 |
| SOH-157 | src/components/custom/timeline/GlassTimeline.vue:90 <ContinuousTimeline> | click | SEMANTIC_DESCENDANT_DELEGATION_ENROLLED | — | BI.W-P062, BI.W-P120 |
| SOH-158 | src/components/custom/timeline/GlassTimeline.vue:112 <SegmentedTimeline> | click | SEMANTIC_DESCENDANT_DELEGATION_ENROLLED | — | BI.W-P062, BI.W-P120 |
| SOH-159 | src/components/custom/timeline/ScrubberTimeline.vue:201 <div> | pointerdown, keydown | SEMANTIC_DIRECT_MANIPULATION_HOST_ENROLLED | — | BI.W-P062, BI.W-P120 |
| SOH-160 | src/components/custom/timeline/SegmentedTimeline.vue:95 <button> | click, keydown | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |
| SOH-161 | src/components/custom/typewriter/TypewriterText.vue:3 <span> | click | LATENT_POINTER_ONLY_DEFAULT_REPAIR_REQUIRED | RDA-035 | BI.W-P059, BI.W-P062, BI.W-P080 |
| SOH-162 | src/components/custom/typewriter/TypewriterText.vue:12 <span> | click | LATENT_POINTER_ONLY_DEFAULT_REPAIR_REQUIRED | RDA-035 | BI.W-P059, BI.W-P062, BI.W-P080 |
| SOH-163 | src/components/ui/button/Button.vue:242 <Primitive> | pointerdown | POLYMORPHIC_NATIVE_CONTROL_INTERNAL_ENROLLED | — | BI.W-P027, BI.W-P062, BI.W-P065 |
| SOH-164 | src/components/ui/card/Card.vue:367 <Surface> | pointerdown | CONDITIONAL_PRESS_PHYSICS_INTERNAL_ENROLLED | — | BI.W-P027, BI.W-P062, BI.W-P109 |
| SOH-165 | src/components/ui/carousel/Carousel.vue:82 <div> | keydown | SEMANTIC_COMPOSITE_HOST_ENROLLED | — | BI.W-P062, BI.W-P119 |
| SOH-166 | src/components/ui/carousel/CarouselNext.vue:20 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-167 | src/components/ui/carousel/CarouselPager.vue:64 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-168 | src/components/ui/carousel/CarouselPager.vue:88 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-169 | src/components/ui/carousel/CarouselPrevious.vue:20 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-170 | src/components/ui/carousel/GlassCarouselPager.vue:100 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-171 | src/components/ui/carousel/GlassCarouselPager.vue:121 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-172 | src/components/ui/data-table/DataTable.vue:182 <div> | click | POINTER_ONLY_TABLE_BEHAVIOR_REPAIR_REQUIRED | RDA-032 | BI.W-P059, BI.W-P062, BI.W-P116 |
| SOH-173 | src/components/ui/data-table/DataTable.vue:199 <div> | click.stop(propagation-only) | PROPAGATION_ONLY_NOT_AN_OPERABLE_SURFACE | — | BI.W-P116 |
| SOH-174 | src/components/ui/data-table/DataTable.vue:263 <TableHead> | click | POINTER_ONLY_TABLE_BEHAVIOR_REPAIR_REQUIRED | RDA-032 | BI.W-P059, BI.W-P062, BI.W-P116 |
| SOH-175 | src/components/ui/data-table/DataTable.vue:305 <TableRow> | click | POINTER_ONLY_TABLE_BEHAVIOR_REPAIR_REQUIRED | RDA-032 | BI.W-P059, BI.W-P062, BI.W-P116 |
| SOH-176 | src/components/ui/data-table/DataTable.vue:324 <TableCell> | click.stop(propagation-only) | PROPAGATION_ONLY_NOT_AN_OPERABLE_SURFACE | — | BI.W-P116 |
| SOH-177 | src/components/ui/data-table/DataTable.vue:335 <TableRow> | click | POINTER_ONLY_TABLE_BEHAVIOR_REPAIR_REQUIRED | RDA-032 | BI.W-P059, BI.W-P062, BI.W-P116 |
| SOH-178 | src/components/ui/data-table/DataTable.vue:355 <TableCell> | click.stop(propagation-only) | PROPAGATION_ONLY_NOT_AN_OPERABLE_SURFACE | — | BI.W-P116 |
| SOH-179 | src/components/ui/data-table/DataTablePagination.vue:60 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-180 | src/components/ui/data-table/DataTablePagination.vue:69 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-181 | src/components/ui/data-table/DataTablePagination.vue:81 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-182 | src/components/ui/data-table/DataTablePagination.vue:92 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-183 | src/components/ui/data-table/DataTablePagination.vue:101 <Button> | click | TYPED_CONTROL_COMPONENT_ENROLLED | — | BI.W-P062 |
| SOH-184 | src/components/ui/notification/Notification.vue:23 <button> | click | NATIVE_CONTROL_ENROLLED | — | BI.W-P062 |

## Imperative and render-function ledger

The TypeScript AST pass covers source units, not a hand-authored call roster. A document listener may be a lifecycle observer, a host listener may delegate to a semantic descendant, and an imperative gesture may reveal a missing control; each receives one explicit disposition rather than being counted uniformly as accessibility evidence.

| ID | source occurrence | event | syntax | disposition | finding | owners |
| --- | --- | --- | --- | --- | --- | --- |
| IOH-001 | demo/stories/containers/spa-view.vue:36 h("button") | click | INTRINSIC_RENDER_FUNCTION_HANDLER | NATIVE_RENDER_FUNCTION_CONTROL_ENROLLED | — | BI.W-P059, BI.W-P062, BI.W-P113 |
| IOH-002 | src/components/custom/aurora/composables/useCursorInteraction.ts:206 el | pointerdown | IMPERATIVE_DOM_LISTENER | PARALLEL_SEMANTIC_AUTHORING_ALTERNATIVE_ENROLLED | — | BI.W-P046, BI.W-P059, BI.W-P062 |
| IOH-003 | src/components/custom/aurora/composables/useCursorInteraction.ts:209 el | contextmenu | IMPERATIVE_DOM_LISTENER | PARALLEL_SEMANTIC_AUTHORING_ALTERNATIVE_ENROLLED | — | BI.W-P046, BI.W-P059, BI.W-P062 |
| IOH-004 | src/components/custom/constellation/composables/useConstellation.ts:282 target | pointerdown | IMPERATIVE_DOM_LISTENER | INERT_DECORATIVE_POINTER_ACTION_REPAIR_REQUIRED | RDA-016 | BI.W-P048, BI.W-P059, BI.W-P061, BI.W-P062 |
| IOH-005 | src/components/custom/deck/composables/useDeckKeyboard.ts:98 bound | keydown | IMPERATIVE_DOM_LISTENER | SEMANTIC_REGION_KEYBOARD_DELEGATION_ENROLLED | — | BI.W-P062, BI.W-P121 |
| IOH-006 | src/components/custom/dock/composables/useDockHold.ts:120 host | pointerdown | IMPERATIVE_DOM_LISTENER | NATIVE_DESCENDANT_GESTURE_LIFECYCLE_ENROLLED | — | BI.W-P033, BI.W-P042, BI.W-P062 |
| IOH-007 | src/components/custom/dock/composables/useDockHold.ts:121 host | touchstart | IMPERATIVE_DOM_LISTENER | NATIVE_DESCENDANT_GESTURE_LIFECYCLE_ENROLLED | — | BI.W-P033, BI.W-P042, BI.W-P062 |
| IOH-008 | src/components/custom/dock/composables/useDockPopover.ts:207 document | pointerdown | IMPERATIVE_DOM_LISTENER | DOCUMENT_OUTSIDE_DISMISSAL_OBSERVER_ENROLLED | — | BI.W-P037, BI.W-P040, BI.W-P042, BI.W-P062 |
| IOH-009 | src/components/custom/dock/composables/useDockState.ts:352 document | pointerdown | IMPERATIVE_DOM_LISTENER | DOCUMENT_OUTSIDE_DISMISSAL_OBSERVER_ENROLLED | — | BI.W-P037, BI.W-P040, BI.W-P042, BI.W-P062 |
| IOH-010 | src/components/ui/drawer/composables/useDrawerSnap.ts:330 handle | pointerdown | IMPERATIVE_DOM_LISTENER | ARIA_HIDDEN_POINTER_ONLY_DETENT_REPAIR_REQUIRED | RDA-036 | BI.W-P032, BI.W-P059, BI.W-P061, BI.W-P062, BI.W-P107 |
| IOH-011 | src/components/ui/slider/Slider.vue:157 root | touchstart | IMPERATIVE_DOM_LISTENER | SEMANTIC_SLIDER_TOUCH_ARBITRATION_ENROLLED | — | BI.W-P032, BI.W-P062, BI.W-P093 |
| IOH-012 | src/composables/dom/useDragVelocity.ts:197 boundHost | pointerdown | IMPERATIVE_DOM_LISTENER | CONSUMER_BOUND_DIRECT_MANIPULATION_INFRASTRUCTURE_ENROLLED | — | BI.W-P032, BI.W-P062 |
| IOH-013 | src/composables/dom/useTouchGate.ts:36 document | touchstart | IMPERATIVE_DOM_LISTENER | GLOBAL_INPUT_MODALITY_OBSERVER_NOT_A_CONTROL | — | BI.W-P032, BI.W-P062 |
| IOH-014 | src/composables/motion/useDragMorph.ts:327 node | pointerdown | IMPERATIVE_DOM_LISTENER | CONSUMER_BOUND_DIRECT_MANIPULATION_INFRASTRUCTURE_ENROLLED | — | BI.W-P032, BI.W-P062 |
| IOH-015 | src/composables/sidebar/useClickDelegate.ts:27 el | click | IMPERATIVE_DOM_LISTENER | NATIVE_DESCENDANT_CLICK_DELEGATION_ENROLLED | — | BI.W-P030, BI.W-P059, BI.W-P062 |
| IOH-016 | src/composables/sidebar/useSidebarFollow.ts:189 currentSidebar | touchstart | IMPERATIVE_DOM_LISTENER | MANUAL_SCROLL_OVERRIDE_OBSERVER_NOT_A_CONTROL | — | BI.W-P030, BI.W-P062 |
| IOH-017 | src/composables/sidebar/useSidebarFollow.ts:190 currentSidebar | pointerdown | IMPERATIVE_DOM_LISTENER | MANUAL_SCROLL_OVERRIDE_OBSERVER_NOT_A_CONTROL | — | BI.W-P030, BI.W-P062 |
| IOH-018 | src/composables/sidebar/useSidebarFollow.ts:191 currentSidebar | keydown | IMPERATIVE_DOM_LISTENER | MANUAL_SCROLL_OVERRIDE_OBSERVER_NOT_A_CONTROL | — | BI.W-P030, BI.W-P062 |

## Runtime transposition

The sole verifier does not load this ledger as an allowlist. The current compiler/import/route graph enrolls every rendered operable descendant, then generic semantic checks and owner-specific scenarios apply. Moving a defect to another file, changing a native tag to a polymorphic wrapper, hiding an interactive default from first-party stories, or crediting a host image/group while a descendant remains pointer-only must stay RED without adding a row or command identity.
