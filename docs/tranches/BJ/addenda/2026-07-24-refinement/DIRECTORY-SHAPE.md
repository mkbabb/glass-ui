# D3 · DIRECTORY-SHAPE MEASUREMENT — glass-ui @ `0371836d`

Read-only. No repo file touched. Generator: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/wf/dirshape.mjs` → `.../wf/dirshape.json`. Excluded from every count: `node_modules .git dist dist-demo .cache .tmp test-results .playwright* .ruff_cache .claude *-chrome-profile`. (`.claude/worktrees` alone carries 1370 further `index.ts` — it is stale worktree copy, not repo shape.)

---

## 1 · ZONE SHAPE

`for z in …; do d=$(find $z -type d|wc -l); f=$(find $z -type f|wc -l); done`

| zone | dirs (incl. self) | files | max depth (path segments) | deepest file |
|---|---:|---:|---:|---|
| `src` (all) | 127 | 694 | 6 | `src/components/aurora/constants/shaders/aurora-image.frag.ts` |
| `src/components` | 94 | 505 | 6 | ↑ |
| `src/composables` | 23 | 103 | 6 | `src/composables/glass/webgl/shaders/flow.glsl.ts` |
| `src/styles` | 6 | 76 | 4 | `src/styles/glass/a11y-fallback.css` |
| `src/fonts` | 3 | 7 | 4 | `src/fonts/fira-code/OFL.txt` |
| `demo` | 40 | 196 | 6 | `demo/stories/substrates/aurora/config/ColorSwatch.vue` |
| `tests` | 53 | 217 | 5 | `tests/components/custom/animated-digit/AnimatedDigit.test.ts` |
| `tests-visual` | 11 (7 real + `.cache`,`test-results`) | 223 (194 real) | 7 | `tests-visual/docs/tranches/AX/audit/screens/W38-aurora-after-dark.png` |
| `scripts` | 2 | 13 | 3 | `scripts/lib/canon-doc.mjs` |
| `docs` | 873 | 18280 | 9 | `docs/tranches/AS/audit/visual/archive/2026-06-03/aurora/*.png` |

**`src/lib` does not exist** (`ls src/lib` → No such file or directory).

File-type census — `find src -type f | sed 's/.*\.//' | sort | uniq -c`:
`src` = 362 ts · 174 vue · 124 css · 28 md · 4 woff2 · 2 txt. `demo` = 149 vue · 41 ts · 6 css.

---

## 2 · DIRECTORY-SIZE DISTRIBUTION (direct **file** children)

`find $z -type d -exec sh -c 'find "$1" -maxdepth 1 -type f | wc -l' _ {} \; | awk …`

| zone | 0 | 1 | 2–4 | 5–9 | 10–19 | 20+ |
|---|---:|---:|---:|---:|---:|---:|
| `src/components` | 0 | 7 | 46 | 26 | 15 | 0 |
| `src/composables` | 1 | 1 | 12 | 7 | 2 | 0 |
| `src/styles` | 0 | 0 | 2 | 1 | 0 | **3** |
| `demo` | 1 | 6 | 15 | 12 | 6 | 0 |
| `tests` | 2 | **23** | 17 | 3 | 7 | 1 |
| `tests-visual` | 4 | 3 | 1 | 1 | 0 | 2 |
| `scripts` | 0 | 0 | 1 | 1 | 0 | 0 |

`src/styles` is the only zone where 20+ is the modal bucket (3 of 6 dirs). `tests` is the only zone where 1-file is the modal bucket (23 of 53).

---

## 3 · LONG-RUNNING DIRECTORIES (≥10 direct children, files+dirs), non-`docs`

49 total. Those with **≥10 direct files** listed in full:

| dir | files | subdirs |
|---|---:|---:|
| `tests-visual` | 186 | 2 |
| repo root `.` | 71 | 7 |
| `tests/components` | 50 | 4 |
| `src/styles` | 20 | 5 |
| `src/styles/glass` | 22 | 0 |
| `src/styles/tokens` | 20 | 0 |
| `src/components/dropdown-menu` | 17 | 0 |
| `src/components/aurora/composables` | 16 | 0 |
| `src/components/dock/styles` | 15 | 1 |
| `src/components/dock/composables` | 15 | 0 |
| `demo/stories/containers` | 14 | 0 |
| `src/components/aurora/constants/shaders` | 14 | 0 |
| `demo/stories/foundations` | 13 | 0 |
| `src/components/command` | 13 | 0 |
| `src/components/dialog` | 13 | 0 |
| `tests/components/custom/aurora` | 13 | 0 |
| `tests/components/custom/dock` | 13 | 0 |
| `tests/demo` | 13 | 0 |
| `src/components/blob/composables` | 12 | 0 |
| `src/composables/dom` | 12 | 0 |
| `src/components/dock` | 11 | 2 |
| `src/components/handmark` | 11 | 1 |
| `demo/stories/data` | 11 | 1 |
| `demo/stories/motion` | 11 | 1 |
| `demo/stories/forms` | 11 | 0 |
| `src/components/select` | 11 | 0 |
| `tests/composables/motion` | 11 | 0 |
| `src/components/drawer` | 10 | 1 |
| `src/components/constellation` | 9 | 1 |
| `demo/shell` | 9 | 1 |
| `demo/stories/dock` | 9 | 1 |
| `scripts` | 9 | 1 |
| `src/components/card` | 10 | 0 |
| `src/components/timeline` | 10 | 0 |
| `demo/stories/display` | 10 | 0 |
| `src/composables/motion/core` | 10 | 0 |
| `tests/components/ui/dialog` | 10 | 0 |
| `tests/styles` | 10 | 0 |

Dirs that are ≥10 only via **subdirs**: `src/components` (2f + 63d), `tests/components/custom` (0f + 16d), `demo/stories` (1f + 12d), `tests/components/ui` (1f + 12d), `demo/chassis` (4f + 9d), `tests` (6f + 8d), `src/composables/motion` (2f + 8d), `src/components/_shared` (10f + 4d), `src/composables/glass` (8f + 4d), `tests/composables` (13f + 7d), `demo` (5f + 6d).

### File lists for the ≥10-file dirs

```
src/styles/                 accessibility.css animations.css draw-in.css fonts.css glass-refract.css
                            glass-specular-track.css glass.css index.css paper.css scroll-choreography.css
                            scroll-chrome.css scroll-driven.css theme.css tokens.css tokens.ts
                            transitions.css typography.css utilities.css view-transition.css viz-reveal.css
                            [dirs] glass theme tokens typography utilities

src/styles/glass/           a11y-fallback.css control-surfaces.css deep.css defined.css glass-atom.css
                            glass-capsule.css glass-chip.css grain-overlay.css ladder-undershadow.css
                            ladder.css liquid-enter.css liquid-fill.css material-roles.css material.css
                            reveal.css rim.css squircle.css surface-axis.css surfaces-pager.css
                            surfaces.css track-well.css value-marks.css

src/styles/tokens/          color-radius.css dark-arm-glass.css dark-arm.css glass-deep.css glass-fx.css
                            glass.css light-dark.css manifest.ts motion-registers.css offsets.css
                            on-glass-fg.css property-regs-specular.css property-regs.css scale-paper.css
                            scheme-motion.css scheme-spring.css scroll-tokens.css shadow.css
                            sizing-config.css sizing.css

src/components/dropdown-menu/  DropdownMenu.vue + {CheckboxItem,Content,Group,Item,Label,RadioGroup,
                            RadioItem,Separator,Shortcut,Sub,SubContent,SubTrigger,Trigger}.vue
                            index.ts styles.css useMenuTrigger.ts

src/components/aurora/composables/  atoms-fields.ts atoms.ts auroraFallbackGround.ts auroraImageSource.ts
                            color.ts configSource.ts frameLoop.ts glSetup.ts runtime.ts textureUpload.ts
                            uniformBridge.ts uniformBridgeWGPU.ts uniformBridgeWGPUImage.ts useAurora.ts
                            useCursorInteraction.ts wgpuSetup.ts

src/components/aurora/constants/shaders/  aurora-image.frag.ts aurora-image.wgsl.ts aurora-mediums.wgsl.ts
                            aurora.frag.ts aurora.vert.ts aurora.wgsl.ts brush.glsl.ts composition.glsl.ts
                            flow.glsl.ts mediums.glsl.ts metal-medium.glsl.ts oil-modes.glsl.ts
                            tonemap.glsl.ts vangogh-medium.glsl.ts

src/components/dock/styles/ adaptive-legibility.css controls.css crossfade.css cta-seat.css density.css
                            dock.css index.css layer-group.css layers.css morph.css overflow.css
                            search.css shape.css shell-regions.css shell.css   [dir] controls/

src/components/dock/composables/  dockContext.ts dockCrossfadeContext.ts dockMorphMeasure.ts
                            dockRailContext.ts index.ts isTeleportedTarget.ts useDockClickIntegrity.ts
                            useDockHold.ts useDockMorph.ts useDockOverflowFit.ts useDockSearch.ts
                            useDockShellProps.ts useDockSpring.ts useDockState.ts useDockTouchGate.ts

src/components/dock/        DockBackgroundToggle.vue DockControl.vue DockCrossfade.vue DockLayer.vue
                            DockLayerGroup.vue DockSeparator.vue DockTrigger.vue GlassDock.vue README.md
                            constants.ts index.ts   [dirs] composables styles

src/components/command/     Command.vue CommandDialog.vue CommandEmpty.vue CommandGroup.vue
                            CommandInput.vue CommandItem.vue CommandList.vue CommandSeparator.vue
                            CommandShortcut.vue dialogContext.ts index.ts styles.css types.ts

src/components/dialog/      Dialog.vue DialogClose.vue DialogContent.vue DialogDescription.vue
                            DialogFooter.vue DialogHeader.vue DialogTitle.vue DialogTrigger.vue
                            ModalOverlay.vue dialogStageContext.ts index.ts placement.css sheet-motion.ts

src/components/select/      Select.vue Select{Content,Group,Item,Label,ScrollDownButton,ScrollUpButton,
                            Separator,Trigger,Value}.vue index.ts

src/components/card/        Card.vue Card{Action,Content,Description,Footer,Header,Title}.vue
                            card-scroll.css index.ts styles.css

src/components/timeline/    ContinuousMarkers.vue ContinuousRail.vue ContinuousTimeline.vue
                            GlassTimeline.vue README.md ScrubberTimeline.vue SegmentedTimeline.vue
                            geometry.ts index.ts types.ts

src/components/drawer/      Drawer.vue Drawer{Content,Description,Footer,Header,Overlay,Title}.vue
                            constants.ts index.ts styles.css   [dir] composables/

src/components/handmark/    HandMark.vue README.md brush.ts constants.ts freehand.ts geometry.ts index.ts
                            ink.ts noise.ts texture.ts types.ts   [dir] composables/

src/components/blob/composables/  blobSimulation.ts buildMetaballProgram.ts easing.ts resolveBlobSurface.ts
                            satelliteKinematics.ts uniformBridgeWGPU.ts uploadBlobUniforms.ts useBlobMood.ts
                            useBlobPointer.ts useBlobSatellites.ts useMetaballRenderer.ts wgpuSetup.ts

src/composables/dom/        index.ts useBreakpoint.ts useClipboard.ts useDocumentVisibility.ts
                            useDragVelocity.ts useIdleReady.ts useResizeObserver.ts useResolveTokenColor.ts
                            useTokenColor.ts useTouchGate.ts useUserInvalidAria.ts useViewportReady.ts

src/composables/motion/core/  asElement.ts constants.ts index.ts motionTempo.ts useIntersectionPause.ts
                            useRAFLoop.ts useReducedMotion.ts useViewTransition.ts useYieldToMain.ts
                            writeVelocityWeight.ts

src/components/_shared/     axes.ts class-names.ts control-size.ts floating.ts index.ts interaction.ts
                            primitive.ts resolveSurfaceClass.ts selection.ts useMotionAxis.ts
                            [dirs] disclosure feedback field menu

demo/stories/containers/    accordion.vue collapsible.vue command.vue configurator.vue context-menu.vue
                            dialog.vue drawer.vue dropdown-menu.vue expandable-container.vue
                            hover-card.vue hover-popover.vue popover.vue sheet.vue tooltip.vue

demo/stories/foundations/   chart-palette.vue colors.vue css-utilities.vue icons.vue intro.vue motion.vue
                            overlays-scrims.vue paper-glass.vue paper-texture.vue radii.vue shadows.vue
                            surface-tints.vue typography.vue

demo/stories/forms/         checks.vue chip.vue inputs.tile.vue inputs.vue label.vue labeled-field.vue
                            number-field.vue select.vue slider.vue textarea.vue toggle.vue

demo/stories/data/          avatar.vue data-table.vue infinite-scroll.vue instrument-chassis.vue metric.vue
                            search.vue sortable-list.vue table.vue tags-input.vue timeline.vue
                            virtual-section.vue   [dir] timeline/

demo/stories/motion/        animated-digit.vue countup.vue curve-gallery.vue deck.vue handmark.vue
                            reveal.vue scroll.vue springs.vue tempo.vue text-motion.vue typewriter.vue
                            [dir] scroll/

demo/stories/display/       atoms.vue badge.vue buttons.tile.vue buttons.vue card.tile.vue card.vue
                            dark-mode-toggle.vue separator.vue status-dot.vue surface.vue

tests/components/           50 flat files: 43 *.contract.test.ts + 6 *.public-contracts.test-d.ts +
                            carousel.arrival / dialog.confirm-preset / infinite-scroll.announce /
                            pager-dots.morph / toast.queue   [dirs] _shared a11y custom ui
                            [2026-08-09 · BK #65 W-GATE-COLLAPSE @ 30de3260 — STRIKE IN PLACE:
                            pager-dots.morph and pager-dots.contract (the latter counted inside
                            the "43 *.contract.test.ts") LEFT this flat list. RT-40-A re-homed
                            both, byte-pure, to tests/components/pager-dots/, so [dirs] gains
                            pager-dots and the flat count reads 47 -> 45 at that cut (measured,
                            git ls-files). The 50 and the [dirs] set are a 2026-07-24 snapshot
                            already stale for other rows' reasons; this bracket restates only
                            #65's act and does not re-baseline the line.]
tests/composables/          13 flat use*.test.ts + vReveal.test.ts  [dirs] color dark dom glass motion sidebar sortable
tests/demo/                 13 flat *.test.ts
tests/styles/               10 files incl. tokenGraphDetector.ts (a non-test helper)
tests/components/ui/dialog/ 10 files
tests/components/custom/aurora/  13   ·  tests/components/custom/dock/ 13
```

---

## 4 · SINGLETON DIRECTORIES (exactly 1 file, 0 subdirs) — 35 non-docs

| src (13) | tests (22) |
|---|---|
| `src/components/_shared/feedback/feedback-tone.css` | `tests/components/a11y/decorative-icon-sweep.test.ts` |
| `src/components/completion-seal/composables/useCompletionSeal.ts` | `tests/components/custom/animated-digit/AnimatedDigit.test.ts` |
| `src/components/easing/composables/useEasingPicker.ts` | `tests/components/custom/deck/Deck.contract.test.ts` |
| `src/components/fading-scroll/composables/useFadingScroll.ts` | `tests/components/custom/dropdown-menu/DropdownMenuTrigger.action.test.ts` |
| `src/components/handmark/composables/useHandMark.ts` | `tests/components/custom/fourier-field/FourierField.smoke.test.ts` |
| `src/components/pager-dots/composables/usePagerWorm.ts` | `tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts` |
| `src/components/typewriter/composables/useTypewriter.ts` | `tests/components/custom/tabs/segmented-tabs.test.ts` |
| `src/composables/motion/engage/engageEnvelopes.ts` | `tests/components/custom/typewriter/TypewriterText.contract.test.ts` |
| `demo/chassis/page/StoryPage.vue` | `tests/components/ui/_shared/useMotionAxis.test.ts` |
| `demo/chassis/play/StoryPlayButton.vue` | `tests/components/ui/{alert/Alert, button/Button, card/Card, command/CommandDialog, progress/Progress, skeleton/Skeleton, surface/Surface, toggle-group/ToggleGroup}.test.ts` (8) |
| `demo/chassis/section/StorySection.vue` | `tests/composables/dark/darkModeSyncScript.test.ts` |
| `demo/stories/dock/_frame/DockStage.vue` | `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` |
| `demo/stories/manifest/lazy.ts` | `tests/composables/sortable/drag-ring-radius.test.ts` |
| | `tests/governance/fixtures/captureEventMethod.ts` |
| | `tests/scripts/profile-bundle-value-js.test.ts` |

**1 file + subdirs (3):** `demo/stories/manifest.ts` [+12 dirs] · `src/fonts/README.md` [+2] · `tests/components/ui/reka-binding-idiom.test.ts` [+12].

**Empty-of-files dirs (3 non-docs):** `src/composables/glass/procedural` counted 3 files — actual zeros are `demo/` bucket-0 = 1, `tests` bucket-0 = 2, `src/composables` bucket-0 = 1 (container-only dirs: `src/composables/glass`(no—8f), see `tests/components/custom`, `tests/components/ui`, `demo/stories`).

Of the **18** `src/components/*/composables/` dirs, **7 hold exactly one file** (completion-seal, easing, fading-scroll, handmark, pager-dots, typewriter, + `_shared/feedback`).

---

## 5 · MODULE-NAME REPETITION — the rename list

Detector: basename stem normalized (camel/kebab/snake stripped, lowercased) vs. parent-dir name; classes PREFIX-FULL / SUFFIX-FULL / CONTAINS-FULL / PREFIX-TOKENS / PREFIX-PARTIAL. **260** immediate-parent hits outside `docs`/`tests-visual` after removing 3 false positives (`constellation/constants.ts`, `typewriter/types.ts`, `containers/context-menu.vue` — accidental substring, not module repetition).

Class counts: PREFIX-FULL 178 · CONTAINS-FULL 37 · SUFFIX-FULL 36 · PREFIX-TOKENS 8 · PREFIX-PARTIAL 1 (real: `tests/governance/governedInvariant.ts`).

### 5a · `src/components` — 128 hits

| dir | n | renames (basename → stripped stem) |
|---|---:|---|
| `dropdown-menu/` | 13 | `DropdownMenu{CheckboxItem,Content,Group,Item,Label,RadioGroup,RadioItem,Separator,Shortcut,Sub,SubContent,SubTrigger,Trigger}.vue` → `{CheckboxItem,…,Trigger}.vue` |
| `select/` | 9 | `Select{Content,Group,Item,Label,ScrollDownButton,ScrollUpButton,Separator,Trigger,Value}.vue` → `{Content,…,Value}.vue` |
| `command/` | 8 | `Command{Dialog,Empty,Group,Input,Item,List,Separator,Shortcut}.vue` → `{Dialog,…,Shortcut}.vue` |
| `dialog/` | 8 | `Dialog{Close,Content,Description,Footer,Header,Title,Trigger}.vue` → `{Close,…}.vue`; `dialogStageContext.ts` → `stageContext.ts` |
| `dock/` | 8 | `Dock{BackgroundToggle,Control,Crossfade,Layer,LayerGroup,Separator,Trigger}.vue` → `{BackgroundToggle,…}.vue`; `GlassDock.vue` → suffix-repeat |
| `card/` | 7 | `Card{Action,Content,Description,Footer,Header,Title}.vue` → `{Action,…}.vue`; `card-scroll.css` → `scroll.css` |
| `table/` | 7 | `Table{Body,Caption,Cell,Empty,Head,Header,Row}.vue` → `{Body,…,Row}.vue` |
| `drawer/` | 6 | `Drawer{Content,Description,Footer,Header,Overlay,Title}.vue` → `{Content,…}.vue` |
| `toast/` | 6 | `Toast{Action,Close,Description,Title}.vue` → `{Action,…}.vue`; `Toaster.vue`; `use-toast.ts` → `use.ts` |
| `constellation/` | 5 | `constellation{Field,Interaction,Render,Types,Well}.ts` → `{field,interaction,render,types,well}.ts` |
| `carousel/` | 4 | `Carousel{Content,Item,Pager}.vue` → `{Content,Item,Pager}.vue`; `useCarousel.ts` |
| `labeled-field/` | 4 | `Labeled{Input,Select,Slider,Switch}.vue` → `{Input,Select,Slider,Switch}.vue` |
| `metric/` | 4 | `Metric{Cell,Row,Stack}.vue` → `{Cell,Row,Stack}.vue`; `coalesce-metric.ts` → `coalesce.ts` |
| `number-field/` | 4 | `NumberField{Content,Decrement,Increment,Input}.vue` → `{Content,…}.vue` |
| `tags-input/` | 4 | `TagsInput{Input,Item,ItemDelete,ItemText}.vue` → `{Input,Item,ItemDelete,ItemText}.vue` |
| `timeline/` | 4 | `{Continuous,Glass,Scrubber,Segmented}Timeline.vue` → suffix-repeat |
| `accordion/` | 3 | `Accordion{Content,Item,Trigger}.vue` |
| `configurator/` | 3 | `Configurator{Layer,Row}.vue`; `useConfiguratorState.ts` |
| `popover/` | 3 | `Popover{Content,Trigger}.vue`; `popoverContext.ts` → `context.ts` |
| `tooltip/` | 3 | `Tooltip{Content,Provider,Trigger}.vue` |
| `_shared/field/` | 3 | `field-control.css`→`control.css`; `field-surfaces.css`→`surfaces.css`; `fieldControl.ts`→`control.ts` |
| `alert/` 2 · `avatar/` 2 · `collapsible/` 2 · `easing/` 2 · `search/` 2 · `sortable-list/` 2 · `toggle-group/` 2 | 14 | `Alert{Description,Title}`; `Avatar{Fallback,Image}`; `Collapsible{Content,Trigger}`; `Easing{Configurator,Picker}`; `SearchBar`+`searchVariants`; `Sortable{Handle,Item}`; `toggleGroupContext`+`ToggleGroupItem` |
| `chip/` `pagerWindow` `radio-group/` `tabs/` `typewriter/` `_shared/{disclosure,feedback,menu}/` | 8 | `chipVariants.ts`→`variants.ts`; `pagerWindow.ts`→`window.ts`; `RadioGroupItem.vue`→`Item.vue`; `SegmentedTabs.vue`; `TypewriterText.vue`→`Text.vue`; `disclosure-context.ts`→`context.ts`; `feedback-tone.css`→`tone.css`; `menuRowClass.ts`→`rowClass.ts` |

### 5b · `src/composables` + `src/styles` — 25 hits

```
context/createContext.ts            -> create.ts
dark/darkModeSyncScript.ts          -> modeSyncScript.ts   dark/useGlobalDark.ts   dark/installDarkModeSync.ts
glass/useGlassBackdropLuminance.ts  glass/canvas2d/useCanvas2D.ts -> use.ts
glass/webgl/useWebGLCanvas.ts       glass/webgpu/useWebGPUCanvas.ts
glass/webgpu/webgpuCanvasTypes.ts   -> canvasTypes.ts       glass/webgpu/webgpuDevice.ts -> device.ts
keyboard/useKeyboardShortcuts.ts    -> useShortcuts.ts
motion/engage/engageEnvelopes.ts    -> envelopes.ts
motion/morph/useDragMorph.ts  useElementMorph.ts
motion/number/useAnimatedNumber.ts  useAnimatedNumberMap.ts
motion/pointer/pointerFieldMappings.ts -> fieldMappings.ts  usePointerVelocityField.ts  useRoutePointer.ts
motion/reveal/useLiquidReveal.ts    vReveal.ts
motion/scroll/scrollReader.ts -> reader.ts  useScroll{Chrome,Pin,Progress,Scene,Trigger}.ts   (6)
motion/spring/springPresets.ts -> presets.ts  springProjection.ts -> projection.ts
                                    useSpring.ts  useSpringMount.ts  useSpringPress.ts       (5)
sidebar/useSidebarFollow.ts  useSidebarState.ts
styles/glass/glass-{atom,capsule,chip}.css -> {atom,capsule,chip}.css                        (3)
styles/tokens/scroll-tokens.css -> scroll.css
```

### 5c · `demo` — 29 hits

```
chassis/body/story-body.ts -> story.ts       chassis/body/StoryBodyRenderer.vue
chassis/code/CodeBlock.vue -> Block.vue      chassis/code/useCodeHighlight.ts
chassis/family/FamilyTabs.vue -> Tabs.vue
chassis/hero/{aurora-hero.ts,category-hero.ts,story-hero.css,StoryHero.vue} -> {aurora.ts,category.ts,story.css,Story.vue}
chassis/landing/{CatalogLanding,SectionLanding}.vue      chassis/page/StoryPage.vue
chassis/play/StoryPlayButton.vue   chassis/section/StorySection.vue
chassis/showcase/ShowcaseFrame.vue -> Frame.vue
composables/virtual/{useVirtualSectionWindow.ts, virtualSectionLayout.ts -> sectionLayout.ts}
shell/AppShell.vue   shell/useShellNavDock.ts   shell/configurator/useConfiguratorOpen.ts
stories/data/data-table.vue -> table.vue
stories/data/timeline/Timeline{Continuous,Segmented}Body.vue -> {Continuous,Segmented}Body.vue
stories/dock/dock-search.vue -> search.vue   stories/motion/text-motion.vue -> text.vue
stories/motion/scroll/Scroll{Choreography,Native,Reader}Body.vue -> {Choreography,Native,Reader}Body.vue
stories/substrates/aurora/{AuroraConfigDock,AuroraStage}.vue -> {ConfigDock,Stage}.vue
stories/substrates/fourier-field/fourier-paths.ts -> paths.ts
demo/vite.demo-dist.config.ts
```

### 5d · `tests` — 78 hits (worst: `custom/dock/` 13, `ui/dialog/` 7, `custom/{aurora,blob,drawer,search}/` 3 each)

```
custom/dock/       Dock{BackgroundToggle,Control,LayerRail}.a11y.test.ts · dock{CrossfadeContext.readonly.test-d,
                   MorphMeasure}.test.ts · GlassDock.{backdrop-mode,interaction-manual,motion-parity,
                   press-keepalive,scroll-overflow,touch-gate,vertical-collapse,vt-names}.test.ts     (13)
ui/dialog/         dialog-{attrs,close-contrast,focus-return,graded-edge,show-close,spring,stage-ownership}.test.ts (7)
custom/aurora/     Aurora.{init-error,opacity-ceiling}.test.ts · derive-aurora.test.ts                 (3)
custom/blob/       blob-{color-equivalence,surface}.test.ts · Blob.interaction.test.ts                 (3)
custom/drawer/     Drawer.{detents,motion-lifecycle,reserve}.test.ts                                   (3)
custom/search/     fuzzySearchIndex · search-contracts · useFuzzySearch                                (3)
custom/{configurator 2, constellation 2, deck 1, dropdown-menu 1, fourier-field 1, tabs 1, timeline 1, typewriter 1}
ui/{command 1, data-table 2, slider 1}   composables/{dark 1, glass/canvas2d 1, glass/webgl 1, glass/webgpu 1, motion 1}
governance/governedInvariant.ts -> invariant.ts
```

### 5e · ANCESTOR-LEVEL repetition (module name repeated ≥2 levels up) — 50

Not caught by parent-only matching. `find`-equivalent: stem contains a non-immediate ancestor dir name.

| ancestor | n | files |
|---|---:|---|
| `dock/` (via `composables/`) | 13 | `dockContext, dockCrossfadeContext, dockMorphMeasure, dockRailContext, useDock{ClickIntegrity,Hold,Morph,OverflowFit,Search,ShellProps,Spring,State,TouchGate}` |
| `blob/` | 6 | `blobSimulation, resolveBlobSurface, uploadBlobUniforms, useBlob{Mood,Pointer,Satellites}` |
| `aurora/` | 6 | `composables/{auroraFallbackGround,auroraImageSource,useAurora}` + `constants/shaders/aurora-{image.frag,image.wgsl,mediums.wgsl}` (**2 levels up**) |
| `aurora/` (demo) | 3 | `sections/Aurora{Color,Composition,Motion}Section.vue` |
| `fourier-field/` | 3 | `fourierFieldGLSetup, fourierFieldWGPUSetup, useFourierField` |
| `constellation/` 2 · `data-table/` 2 · `deck/` 2 · `drawer/` 2 · `search/` 2 · `motion/` 2 | 12 | `createConstellationField, useConstellation, useDataTable{Responsive,RowIdentity}, useDeck, useDeckKeyboard, drawerSnapContext, useDrawerSnap, fuzzySearchIndex, useFuzzySearch, motionTempo, useReducedMotion` |
| `completion-seal/ easing/ fading-scroll/ handmark/ infinite-scroll/ typewriter/ dock(demo)/` | 7 | `useCompletionSeal, useEasingPicker, useFadingScroll, useHandMark, useInfiniteScroll, useTypewriter, _frame/DockStage.vue` |

---

## 6 · TEST FILES INSIDE `src/` — **ZERO**

```
$ find src demo -type f \( -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*' \
      -o -name '*_test.*' -o -name '*.bench.*' \)
(no output)
$ grep -rlE "from ['\"](vitest|@jest|jest|@testing-library)" src demo
(no output)
```

Edict-4 violation count in `src/` and `demo/`: **0**. No target paths owed.

**Isomorphism is nonetheless broken in the other direction** (`node` walk, `fs.existsSync` twin check):

- `tests` has 52 subdirs; **39 have no `src/` twin**. The break is a two-level interposition `tests/components/{ui,custom,a11y,_shared}/…` that does not exist in `src/components/`, plus `tests/{demo,gates,governance,scripts,utils}` and `tests/composables/sortable` (no `src/composables/sortable`).
- `src` has 126 subdirs; **113 have no `tests/` twin**.
- Non-test files living in `tests/`: `tests/styles/tokenGraphDetector.ts`, `tests/governance/fixtures/captureEventMethod.ts`, `tests/shims.d.ts`, `tests/setup.ts`.
- One hidden dir: `tests/components/custom/timeline/.bench`.

---

## 7 · BARRELS — 82 `index.ts` (0 `index.js` / `index.vue`)

`find src demo -name 'index.ts' | wc -l` → 82. All 63 `src/components/*/` dirs have one (`for d in src/components/*/; do [ -f "$d/index.ts" ] || echo "$d"; done` → empty).

**Pure re-export: 76. Carrying non-re-export code: 6.**

| barrel | residual non-export lines | what |
|---|---:|---|
| `src/composables/color/index.ts` | 171 (of 355) | OKLab/OKLCh conversion functions, `ColorResolver` seam, 9 exported decls, 27 local decls; imports `@mkbabb/value.js/color` |
| `src/components/badge/index.ts` | 44 (of 50) | `BASE`/`VARIANT`/`TONE`/`SIZE`/`SURFACE` class maps + `badgeVariants()` |
| `src/components/alert/index.ts` | 27 (of 35) | `BASE`/`TONE` class maps + `alertVariants()` |
| `src/components/fourier-field/index.ts` | 12 (of 54) | type re-declarations composed from `./constants`, `./math`, `../../composables/color` |
| `src/components/drawer/index.ts` | 3 (of 40) | `DrawerDirection` / `DrawerMode` / `DrawerStage` type unions declared in the barrel |
| `src/composables/motion/core/index.ts` | 1 (of 105) | comment only |

Largest re-export fan-out: `src/index.ts` 33 `export … from` / 273 lines · `src/components/index.ts` 31 / 39 · `src/composables/motion/core/index.ts` 19 · `src/components/select/index.ts` 15 · `src/components/dock/index.ts` 12 / 97 lines.

Nested barrels (a barrel under a barrel): `src/components/{dock,infinite-scroll,search}/composables/index.ts`, `src/composables/{glass/canvas2d,motion/core}/index.ts`, `demo/{composables/virtual,shell/configurator}/index.ts`.

---

## 8 · DEEPEST PATHS, TOP 20

**Code zones** (`docs/` excluded) — `find` + segment count:

| depth | path |
|---:|---|
| 7 | `tests-visual/docs/tranches/AX/audit/screens/W38-aurora-after-{dark,light}.png` (2) |
| 6 | `demo/stories/substrates/aurora/config/{ColorSwatch.vue, CompositionLayer.vue, FlowLayer.vue, NucleiLayer.vue, TextureLayer.vue, options.ts, usePaletteStops.ts}` (7) |
| 6 | `demo/stories/substrates/aurora/sections/Aurora{Color,Composition,Motion}Section.vue` (3) |
| 6 | `src/components/aurora/constants/shaders/{aurora-image.frag.ts, aurora-image.wgsl.ts, aurora-mediums.wgsl.ts, aurora.frag.ts, aurora.vert.ts, aurora.wgsl.ts, brush.glsl.ts, composition.glsl.ts}` (8, +6 more at same depth) |
| 6 | `src/composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` |
| 6 | `src/components/dock/styles/controls/*` |

Whole repo including `docs/`: all top-20 are depth-9 PNGs under `docs/tranches/AS/audit/visual/archive/2026-06-03/{aurora,blob}/`.

Max depth by zone: `src` 6 · `demo` 6 · `tests` 5 · `tests-visual` 7 · `scripts` 3 · `docs` 9.

---

## 9 · ADJACENT STRUCTURAL FACTS

**Sibling file + directory sharing a stem** (12):

```
src/components/dock/styles/controls.css  <->  src/components/dock/styles/controls/
src/styles/glass.css      <-> src/styles/glass/        src/styles/theme.css      <-> src/styles/theme/
src/styles/tokens.css     <-> src/styles/tokens/       src/styles/tokens.ts      <-> src/styles/tokens/
src/styles/typography.css <-> src/styles/typography/   src/styles/utilities.css  <-> src/styles/utilities/
demo/stories/manifest.ts               <-> demo/stories/manifest/
demo/stories/data/timeline.vue         <-> demo/stories/data/timeline/
demo/stories/motion/scroll.vue         <-> demo/stories/motion/scroll/
demo/stories/substrates/aurora.vue     <-> demo/stories/substrates/aurora/
demo/stories/substrates/fourier-field.vue <-> demo/stories/substrates/fourier-field/
```

**Duplicate basenames in `src` + `demo`** — `find src demo -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.css' \) -exec basename {} \; | sort | uniq -c | sort -rn`:

`index.ts` 82 · `types.ts` 21 · `styles.css` 20 · `constants.ts` 13 · `uniformBridgeWGPU.ts` 3 · `presets.ts` 3 · `manifest.ts` 3 · `context.ts` 3 · `wgpuSetup.ts` 2 · `utilities.css` 2 · `prng.ts` 2 · `index.css` 2 · `glass.css` 2 · `geometry.ts` 2 · `flow.glsl.ts` 2.

**Existing sub-module conventions in `src/components`** (`find src/components -maxdepth 2 -type d -name X`):
`composables/` 18 · `styles/` 2 (dock, tabs) · `shaders/` 3 (aurora under `constants/`, blob, fourier-field) · `constants/` 1 (aurora) · `utils/` 1 (typewriter).

**Vue-filename idiom split, per component dir** — of 174 `.vue` in `src`, module-prefixed sub-parts vs. un-prefixed:
prefixed dirs = accordion 3, alert 2, avatar 2, card 6, carousel 3, collapsible 2, command 8, configurator 2, dialog 7, dock 7, drawer 6, dropdown-menu 13, easing 2, metric 3, number-field 4, popover 2, radio-group 1, search 1, select 9, table 7, tags-input 4, toast 5, toggle-group 1, tooltip 3, typewriter 1 (**104**).
un-prefixed sub-parts = `timeline` 6 (`ContinuousMarkers, ContinuousRail, ContinuousTimeline, GlassTimeline, ScrubberTimeline, SegmentedTimeline`), `labeled-field` 4, `sortable-list` 2, `dialog` 1 (`ModalOverlay`), `dock` 1 (`GlassDock`), `handmark` 1, `tabs` 1 (`SegmentedTabs`) — **16**.

**Component-local prose in `src`** — 28 `.md`: 26 component `README.md`/`DESIGN.md`, `src/components/PROCEDURAL-SUITE.md`, `src/composables/motion/README.md`, `src/fonts/README.md`.

**Repo root** carries 71 direct files, of which **41 are loose `.png`/`.jpeg` capture artefacts** (`ls *.png *.jpeg | wc -l`) alongside 7 `vite.*.ts` configs and 4 `tsconfig*.json`.