# E.W0 Consumer Imports

Baseline: current `HEAD` `99e2998` plus dirty worktree on 2026-05-02.

Commands:

```bash
rg -n 'from ["'\"']@mkbabb/glass-ui["'\"']|import ["'\"']@mkbabb/glass-ui|@mkbabb/glass-ui/styles|@mkbabb/glass-ui/.+styles' ../fourier-analysis/web ../words/frontend ../bbnf-lang/playground
```

## Summary

| Consumer | Root import declarations | Unique root symbols | Style imports | Native build |
|---|---:|---:|---:|---|
| `../fourier-analysis/web` | 19 | about 30 | 1 approved `@mkbabb/glass-ui/styles` | `npm run build` -> `vue-tsc -b && vite build` |
| `../words/frontend` | 99 | about 74 | 1 approved `@mkbabb/glass-ui/styles` | `npm run build` -> `vue-tsc --noEmit && vite build` |
| `../bbnf-lang/playground` | 15 | about 26 | 1 approved `@mkbabb/glass-ui/styles` | `npm run build` -> `vite build` |

All non-style package imports currently use the root. No consumer currently imports a non-style `@mkbabb/glass-ui/<subpath>`.

## Root Symbols To Keep Approved

- UI primitives and their type exports.
- `cn`
- `useGlobalDark`
- `toast`, `useToast`

## Root Symbols To Migrate In W2

| Destination | Symbols seen in consumers |
|---|---|
| `@mkbabb/glass-ui/dock` | `GlassDock`, `DockIconButton`, `DockPopover` |
| `@mkbabb/glass-ui/search` | `FuzzySearch`, `useFuzzySearch`, `SearchableItem` |
| `@mkbabb/glass-ui/sidebar` | `buildTreeIndex`, `useScrollTracker`, `useSidebarFollow`, `useTreeIndex`, `SidebarSection`, `TreeNode` |
| `@mkbabb/glass-ui/controls` | `DarkModeToggle` |
| `@mkbabb/glass-ui/confirm-dialog` | `ConfirmDialog` |
| `@mkbabb/glass-ui/infinite-scroll` | `InfiniteScroll` |
| `@mkbabb/glass-ui/tabs` | `UnderlineTabs`, `BouncyToggle` |
| `@mkbabb/glass-ui/stacked-icons` | `StackedIconGroup` |
| `@mkbabb/glass-ui/typewriter` | `TypewriterText` |
| `@mkbabb/glass-ui/virtual` | `useVirtualSectionWindow`, `useWindowedStore`, virtual types |
| `@mkbabb/glass-ui/pagination` | `useOffsetPagination` |

## Exact Import Locations

`fourier-analysis/web` root imports:

```text
src/App.vue
src/components/equation/EquationView.vue
src/components/layout/AppHeader.vue
src/components/layout/DarkModeToggle.vue
src/components/morph/MorphPhaseConfig.vue
src/components/ui/CollapsibleSection.vue
src/components/ui/tooltip/Tooltip.vue
src/components/visualization/AnimationControls.vue
src/components/visualization/CanvasControlsDock.vue
src/components/visualization/ContourSettings.vue
src/components/visualization/EditorControlsDock.vue
src/components/visualization/GalleryView.vue
src/components/visualization/SpeedSelect.vue
src/components/visualization/VisualizationView.vue
src/components/visualization/gallery/AdminFlaggedPanel.vue
src/components/visualization/gallery/AdminUserList.vue
src/components/visualization/gallery/GalleryInfiniteGrid.vue
src/components/visualization/gallery/GallerySearchBar.vue
src/composables/useToast.ts
```

`words/frontend` has 99 root declarations. W2 should transform them mechanically by symbol map and preserve unrelated dirty work in that repo.

`bbnf-lang/playground` root imports:

```text
src/App.vue
src/components/debug/DebugToolbar.vue
src/components/docs/DocsSidebar.vue
src/components/editors/EditorPanel.vue
src/components/editors/MonacoEditor.vue
src/components/layout/ActionButtons.vue
src/components/layout/ControlsBar.vue
src/components/layout/EntryRuleSelector.vue
src/components/layout/ErrorDialog.vue
src/components/layout/ExampleSelector.vue
src/components/layout/FormatterSettings.vue
src/components/layout/NavBar.vue
src/views/playground/PlaygroundPage.vue
```

## Dirty Consumer State

- `fourier-analysis` and `words` are already dirty with unrelated work. W2 must stage/commit only the package-import migration slice if commits are made.
- `bbnf-lang/playground` is clean inside the playground subdir; the parent repo has unrelated untracked benchmark docs.
