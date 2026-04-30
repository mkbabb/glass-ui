# D.W0.A.3 — Hardened Overfitting Audit: `src/composables/`

Scope: named exports under `src/composables/`, counted across `src/`, `demo/`, `../fourier-analysis/web/src/`, `../words/frontend/src/`, and `../bbnf-lang/playground/src/`.

Method refinements applied for D.W0:

- Public-surface checks go through `src/index.ts` and `src/composables/index.ts`; sub-barrels are used only to resolve whether a `src/composables/` export reaches the public API.
- Usage counts exclude the defining export file and `index.ts` barrels so re-export chains do not auto-keep a symbol.
- For every symbol, the symbol-only source grep is separate from the import/export grep so source consumers that do not import directly from the defining file are counted.

Consumer directories checked:

```sh
for d in ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src; do [ -d "$d" ] && printf 'present %s\n' "$d" || printf 'missing %s\n' "$d"; done
```

Result: all three consumer directories are present.

Enumeration command:

```sh
rg -n '^export\s+(async\s+)?(type|interface|function|const|class)\s+[A-Za-z_$][A-Za-z0-9_$]*' src/composables --glob '*.ts' --glob '!**/index.ts'
```

Public-surface commands:

```sh
rg -n 'export \* from "\./composables"' src/index.ts
rg -n 'export \* from "\./interaction"|export \* from "\./sortable"|export \* from "\./useKeyboardShortcuts"|export \* from "\./useWatercolorBlob"|export \* from "\./glass"|export \* from "\./motion"|export \* from "\./pagination"|export \* from "\./prng"|export \* from "\./virtual"|copyToClipboard|useGlobalDark|useCharSplit' src/composables/index.ts
rg -n 'export' src/composables/*/index.ts
```

Per-symbol count commands, substituting the audited symbol for `SYMBOL`:

```sh
rg -l '\bSYMBOL\b' src/ --glob '!**/index.ts'
rg -n '^export\s+(async\s+)?(type|interface|function|const|class)\s+SYMBOL\b' src/ --glob '*.ts' --glob '!**/index.ts'
rg -l '\bSYMBOL\b' demo/
rg -l '\bSYMBOL\b' ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src
rg -l '\b(import|export)\b[^\n]*\bSYMBOL\b' src/ demo/ ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src
```

The first command is the W0-refined symbol-only source grep. The second command identifies export definition files removed from usage counts. `index.ts` barrels are also removed from usage counts. The final command is the separate import/export grep used to verify that symbol-only counts are not just import-chain artefacts.

## C.W0 vs D.W0

| metric | C.W0 composables | D.W0 composables | delta |
|---|---:|---:|---:|
| audited rows | 74 | 73 | -1 current export |
| keep | 11 | 12 | +1 |
| generalize | 0 | 25 | +25 |
| library-orphan | 63 | 29 | -34 |
| inline-and-remove | 0 | 1 | +1 |
| delete-unused | 0 | 6 | +6 |
| actionable rows (`library-orphan` + `inline-and-remove` + `delete-unused`) | 63 | 36 | -27 |

False-negative recovery delta: **34 fewer `library-orphan` rows** after the hardened symbol-only source grep and external consumer sweep.

## Verdict Distribution

| verdict | count |
|---|---:|
| keep | 12 |
| generalize | 25 |
| library-orphan | 29 |
| inline-and-remove | 1 |
| delete-unused | 6 |
| **total** | **73** |

## Audit Table

`src`, `demo`, and `external` count distinct non-definition, non-barrel files. Evidence lists the files that make up those counts; `-` means the cited grep returned no counted usage files after exclusions.

| artefact | kind | def-site | public | src | demo | external | total | d-w0 verdict | evidence |
|---|---|---|---|---:|---:|---:|---:|---|---|
| `createGlassFilter` | function | `src/composables/glass/useGlassRenderer.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/components/custom/glass-panel/GlassPanel.vue`; demo: -; external: - |
| `destroyGlassFilter` | function | `src/composables/glass/useGlassRenderer.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/components/custom/glass-panel/GlassPanel.vue`; demo: -; external: - |
| `GlassFilterState` | interface | `src/composables/glass/useGlassRenderer.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/components/custom/glass-panel/GlassPanel.vue`; demo: -; external: - |
| `GlassRendererOptions` | interface | `src/composables/glass/useGlassRenderer.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `GlassTier` | type | `src/composables/glass/useGlassRenderer.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/components/custom/glass-panel/GlassPanel.vue`; demo: -; external: - |
| `useGlassRenderer` | function | `src/composables/glass/useGlassRenderer.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/components/custom/glass-panel/GlassPanel.vue`; demo: -; external: - |
| `createFrostProgram` | function | `src/composables/glass/webgl/frostShader.ts` | no | 0 | 0 | 0 | 0 | delete-unused | src: -; demo: -; external: - |
| `FRAGMENT_SHADER` | const | `src/composables/glass/webgl/frostShader.ts` | no | 2 | 0 | 0 | 2 | keep | src: `src/components/custom/aurora/composables/runtime.ts`, `src/components/custom/metaballs/useMetaballs.ts`; demo: -; external: - |
| `FrostUniforms` | interface | `src/composables/glass/webgl/frostShader.ts` | no | 0 | 0 | 0 | 0 | delete-unused | src: -; demo: -; external: - |
| `getFrostUniforms` | function | `src/composables/glass/webgl/frostShader.ts` | no | 0 | 0 | 0 | 0 | delete-unused | src: -; demo: -; external: - |
| `VERTEX_SHADER` | const | `src/composables/glass/webgl/frostShader.ts` | no | 2 | 0 | 0 | 2 | keep | src: `src/components/custom/aurora/composables/runtime.ts`, `src/components/custom/metaballs/useMetaballs.ts`; demo: -; external: - |
| `InfiniteScrollOptions` | interface | `src/composables/infinite-scroll/types.ts` | no | 2 | 0 | 0 | 2 | keep | src: `src/components/custom/infinite-scroll/composables/useInfiniteScroll.ts`, `src/composables/infinite-scroll/useInfiniteScroll.ts`; demo: -; external: - |
| `InfiniteScrollReturn` | interface | `src/composables/infinite-scroll/types.ts` | no | 2 | 0 | 0 | 2 | keep | src: `src/components/custom/infinite-scroll/composables/useInfiniteScroll.ts`, `src/composables/infinite-scroll/useInfiniteScroll.ts`; demo: -; external: - |
| `useInfiniteScroll` | function | `src/composables/infinite-scroll/useInfiniteScroll.ts` | no | 1 | 0 | 0 | 1 | inline-and-remove | src: `src/components/custom/infinite-scroll/InfiniteScroll.vue`; demo: -; external: - |
| `useHeightTransition` | function | `src/composables/interaction/useHeightTransition.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useHoverPopover` | function | `src/composables/interaction/useHoverPopover.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useHoverToggle` | function | `src/composables/interaction/useHoverToggle.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `UseHoverToggleOptions` | interface | `src/composables/interaction/useHoverToggle.ts` | no | 0 | 0 | 0 | 0 | delete-unused | src: -; demo: -; external: - |
| `UseHoverToggleReturn` | interface | `src/composables/interaction/useHoverToggle.ts` | no | 0 | 0 | 0 | 0 | delete-unused | src: -; demo: -; external: - |
| `useLeaveTimer` | function | `src/composables/interaction/useLeaveTimer.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/interaction/useHoverPopover.ts`; demo: -; external: - |
| `useTouchGate` | function | `src/composables/interaction/useTouchGate.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `AnimatedNumber` | interface | `src/composables/motion/useAnimatedNumber.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useAnimatedNumber` | function | `src/composables/motion/useAnimatedNumber.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `UseAnimatedNumberOptions` | interface | `src/composables/motion/useAnimatedNumber.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useDarkModeSync` | function | `src/composables/motion/useDarkModeSync.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useScrollProgress` | function | `src/composables/motion/useScrollProgress.ts` | yes | 0 | 1 | 0 | 1 | generalize | src: -; demo: `demo/stories/motion/scroll-type.vue`; external: - |
| `UseScrollProgressOptions` | interface | `src/composables/motion/useScrollProgress.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `SpringOrchestrator` | interface | `src/composables/motion/useSpringOrchestrator.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `SpringSnapshot` | type | `src/composables/motion/useSpringOrchestrator.ts` | yes | 0 | 1 | 0 | 1 | generalize | src: -; demo: `demo/stories/motion/springs.vue`; external: - |
| `useSpringOrchestrator` | function | `src/composables/motion/useSpringOrchestrator.ts` | yes | 1 | 1 | 0 | 2 | keep | src: `src/composables/motion/useAnimatedNumber.ts`; demo: `demo/stories/motion/springs.vue`; external: - |
| `UseSpringOrchestratorOptions` | interface | `src/composables/motion/useSpringOrchestrator.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `StaggerRevealApi` | interface | `src/composables/motion/useStaggerReveal.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useStaggerReveal` | function | `src/composables/motion/useStaggerReveal.ts` | yes | 0 | 1 | 0 | 1 | generalize | src: -; demo: `demo/stories/motion/stagger.vue`; external: - |
| `UseStaggerRevealOptions` | interface | `src/composables/motion/useStaggerReveal.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `OffsetPaginationOptions` | interface | `src/composables/pagination/useOffsetPagination.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useOffsetPagination` | function | `src/composables/pagination/useOffsetPagination.ts` | yes | 0 | 0 | 2 | 2 | keep | src: -; demo: -; external: `../fourier-analysis/web/src/components/visualization/gallery/AdminFlaggedPanel.vue`, `../fourier-analysis/web/src/components/visualization/gallery/AdminUserList.vue` |
| `hashString` | function | `src/composables/prng.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/useWatercolorBlob.ts`; demo: -; external: - |
| `mulberry32` | function | `src/composables/prng.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/useWatercolorBlob.ts`; demo: -; external: - |
| `radiiToCSS` | function | `src/composables/prng.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/useWatercolorBlob.ts`; demo: -; external: - |
| `randomRadii` | function | `src/composables/prng.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/useWatercolorBlob.ts`; demo: -; external: - |
| `SortableContainerBinding` | interface | `src/composables/sortable/useSortable.ts` | no | 0 | 0 | 0 | 0 | delete-unused | src: -; demo: -; external: - |
| `SortableId` | type | `src/composables/sortable/useSortable.ts` | yes | 2 | 0 | 0 | 2 | keep | src: `src/components/custom/sortable-list/SortableItem.vue`, `src/components/custom/sortable-list/SortableList.vue`; demo: -; external: - |
| `SortableItemBinding` | interface | `src/composables/sortable/useSortable.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useSortable` | function | `src/composables/sortable/useSortable.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/components/custom/sortable-list/SortableList.vue`; demo: -; external: - |
| `UseSortableOptions` | interface | `src/composables/sortable/useSortable.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `UseSortableReturn` | interface | `src/composables/sortable/useSortable.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/components/custom/sortable-list/context.ts`; demo: -; external: - |
| `useCharSplit` | function | `src/composables/useCharSplit.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/motion/useAnimatedNumber.ts`; demo: -; external: - |
| `copyToClipboard` | function | `src/composables/useClipboard.ts` | yes | 0 | 0 | 3 | 3 | keep | src: -; demo: -; external: `../bbnf-lang/playground/src/views/playground/PlaygroundPage.vue`, `../fourier-analysis/web/src/components/morph/FourierMorphDemo.vue`, `../fourier-analysis/web/src/composables/useMorphConfig.ts` |
| `useGlobalDark` | const | `src/composables/useGlobalDark.ts` | yes | 2 | 1 | 5 | 8 | keep | src: `src/components/custom/controls/DarkModeToggle.vue`, `src/composables/motion/useDarkModeSync.ts`; demo: `demo/configurator/useConfigurator.ts`; external: `../bbnf-lang/playground/src/components/editors/MonacoEditor.vue`, `../fourier-analysis/web/src/components/layout/DarkModeToggle.vue`, `../words/frontend/src/App.vue`, `../words/frontend/src/composables/useStateSync.ts`, `../words/frontend/src/stores/ui/ui-state.ts` |
| `UseGlobalDarkOptions` | interface | `src/composables/useGlobalDark.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `formatCombo` | function | `src/composables/useKeyboardShortcuts.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `formatComboParts` | function | `src/composables/useKeyboardShortcuts.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `isMac` | const | `src/composables/useKeyboardShortcuts.ts` | yes | 0 | 0 | 1 | 1 | generalize | src: -; demo: -; external: `../words/frontend/src/components/custom/wordlist/modals/EditWordNotesModal.vue` |
| `RegisteredShortcut` | interface | `src/composables/useKeyboardShortcuts.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `registerShortcut` | function | `src/composables/useKeyboardShortcuts.ts` | yes | 1 | 2 | 0 | 3 | keep | src: `src/components/custom/expandable-container/ExpandableContainer.vue`; demo: `demo/layout/AppShell.vue`, `demo/stories/aurora.vue`; external: - |
| `ShortcutOptions` | interface | `src/composables/useKeyboardShortcuts.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useRegisteredShortcuts` | function | `src/composables/useKeyboardShortcuts.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useWatercolorBlob` | function | `src/composables/useWatercolorBlob.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `UseWatercolorBlobOptions` | interface | `src/composables/useWatercolorBlob.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useVirtualSectionWindow` | function | `src/composables/virtual/useVirtualSectionWindow.ts` | yes | 0 | 0 | 2 | 2 | keep | src: -; demo: -; external: `../fourier-analysis/web/src/components/paper/PaperView.vue`, `../words/frontend/src/components/custom/definition/components/content/DefinitionContentView.vue` |
| `VirtualSectionWindowOptions` | interface | `src/composables/virtual/useVirtualSectionWindow.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `useWindowedStore` | function | `src/composables/virtual/useWindowedStore.ts` | yes | 0 | 0 | 1 | 1 | generalize | src: -; demo: -; external: `../words/frontend/src/stores/search/modes/wordlist.ts` |
| `UseWindowedStoreOptions` | interface | `src/composables/virtual/useWindowedStore.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `WindowedStore` | interface | `src/composables/virtual/useWindowedStore.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `buildSectionLayout` | function | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: - |
| `findSectionOffset` | function | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: - |
| `FlatSection` | interface | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 1 | 2 | keep | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: `../words/frontend/src/components/custom/definition/composables/flattenDefinitions.ts` |
| `ForcedSectionWindowRange` | interface | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: - |
| `resolveActiveSection` | function | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: - |
| `resolveSectionWindow` | function | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: - |
| `SectionLayout` | interface | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: - |
| `SectionLayoutEntry` | interface | `src/composables/virtual/virtualSectionLayout.ts` | yes | 0 | 0 | 0 | 0 | library-orphan | src: -; demo: -; external: - |
| `SectionWindowRange` | interface | `src/composables/virtual/virtualSectionLayout.ts` | yes | 1 | 0 | 0 | 1 | generalize | src: `src/composables/virtual/useVirtualSectionWindow.ts`; demo: -; external: - |

## Notes

- The local `src/composables/infinite-scroll/` exports are not public through `src/composables/index.ts`; the current public `useInfiniteScroll` path is the custom infinite-scroll composables re-export. This audit still counts the local `src/composables/` files because they are exported from their own module files.
- `src/composables/glass/webgl/frostShader.ts` is not public through `src/composables/glass/index.ts`. Its shader constants are kept because current source components use them; the unused program/uniform helpers remain `delete-unused`.
- `isMac` has an external symbol-only consumer in `../words/frontend/src/components/custom/wordlist/modals/EditWordNotesModal.vue`; the import grep does not catch it, which is exactly the D.W0.A.3 refinement case.
