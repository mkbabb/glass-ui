# E.W0 Contract Ledger

Baseline: current `HEAD` `99e2998` plus dirty worktree on 2026-05-02.

## Decisions

| Surface | Current public path | Consumer evidence | E destination | W1 action | Proof gate |
|---|---|---|---|---|---|
| UI primitives (`Accordion`, `Alert`, `Avatar`, `Badge`, `Button`, `Card`, `Carousel`, `Checkbox`, `Collapsible`, `Combobox`, `Command`, `ContextMenu`, `DataTable`, `Dialog`, `Drawer`, `DropdownMenu`, `HoverCard`, `Input`, `Label`, `MultiSelect`, `Notification`, `NumberField`, `Popover`, `Progress`, `RadioGroup`, `Select`, `Separator`, `Sheet`, `Skeleton`, `Slider`, `Switch`, `Table`, `Tabs`, `TagsInput`, `Textarea`, `Toast`, `Toggle`, `ToggleGroup`, `Tooltip`) | root via `src/index.ts` -> `src/components/ui` | all three consumers import UI primitives from root | `core` | keep on root allowlist | `tests/public-surface.spec.ts`; consumer root imports limited to these plus approved utilities |
| `cn` | root via `src/utils` | used broadly in `words/frontend` | `core` | keep root export | public surface + consumer build |
| `useGlobalDark` | root via `src/composables` | used in all consumers | `core` | keep root export | public surface + consumer build |
| `toast`, `useToast` | root via `src/components/ui/toast` | used in `fourier-analysis` and `words` | `core` | keep root export | public surface + consumer build |
| keyboard/timer/touch/glass/motion utilities | root via `src/composables` | test-backed; no E consumer migration target | `core` for E | keep root export, re-audit W4 | public surface + W4 residual audit |
| `GlassDock`, `DockIconButton`, `DockPopover`, `DockLayer*`, dock trigger helpers | root via `src/components/custom/dock` | `fourier`, `words`, `bbnf`, demo routes | `subpath:dock` | create `src/dock.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `FuzzySearch`, `SearchBar`, `useFuzzySearch`, search index/types | root via `src/components/custom/search` | `bbnf` docs sidebar; demo | `subpath:search` | create `src/search.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `ProgressiveSidebar`, sidebar types, `useScrollTracker`, `useSidebarFollow`, `useSidebarState`, `useTreeIndex`, `buildTreeIndex`, `isActive`, `isInActiveChain` | root via custom/sidebar and composables/sidebar | `words` navigation, `bbnf` docs sidebar | `subpath:sidebar` | create `src/sidebar.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `DarkModeToggle` | root via custom/controls | `bbnf`, dirty style/tests | `subpath:controls` | create `src/controls.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `ConfirmDialog` | root via custom/confirm-dialog | `words` | `subpath:confirm-dialog` | create `src/confirm-dialog.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `InfiniteScroll`, `useInfiniteScroll` | root via custom/infinite-scroll and composables | `fourier` gallery | `subpath:infinite-scroll` | create `src/infinite-scroll.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `UnderlineTabs`, `BouncyTabs`, `BouncyToggle` | root via custom/tabs | `fourier`, `words` | `subpath:tabs` | create `src/tabs.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `TypewriterText` and typewriter helpers | root via custom/typewriter | `words`; demo | `subpath:typewriter` | create `src/typewriter.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `StackedIconGroup` | root via custom/stacked-icons | `words` | `subpath:stacked-icons` | create `src/stacked-icons.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `useVirtualSectionWindow`, `useWindowedStore`, virtual layout helpers/types | root via composables/virtual | `words` | `subpath:virtual` | create `src/virtual.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `useOffsetPagination` | root via composables/pagination | `fourier` admin gallery | `subpath:pagination` | create `src/pagination.ts`; remove from root; migrate consumers | package probe + W2 builds |
| `Aurora` and aurora runtime | root via custom/aurora | demo; no current external root import found | `subpath:aurora` | create `src/aurora.ts`; remove from root | package probe |
| `GlassCarousel` and glass carousel helpers | root via custom/glass-carousel | demo; no current external root import found | `subpath:glass-carousel` | create `src/glass-carousel.ts`; remove from root | package probe |
| `MetricBadge` | root via custom/metric-badge | demo/tests; dirty style work | `subpath:metric-badge` | create `src/metric-badge.ts`; remove from root tests | package probe + smoke test |
| `StatusDot` | root via custom/status-dot | demo/tests; no current external root import found | `subpath:status-dot` | create `src/status-dot.ts`; remove from root tests | package probe + smoke test |
| `Pulse` | root via custom/pulse | demo/tests; no current external root import found | `subpath:pulse` | create `src/pulse.ts`; remove from root tests | package probe + smoke test |
| `PaperBackdrop` | root via custom/paper-backdrop | demo/tests; no current external root import found | `subpath:paper-backdrop` | create `src/paper-backdrop.ts`; remove from root tests | package probe + smoke test |
| `ToggleChip` | root via custom/toggle-chip | demo/tests; no current external root import found | `subpath:toggle-chip` | create `src/toggle-chip.ts`; remove from root tests | package probe + smoke test |
| `GlassPanel` | root via custom/glass-panel | demo; no current external root import found | `subpath:glass-panel` | create `src/glass-panel.ts`; remove from root | package probe |
| `MetaballCanvas` | root via custom/metaballs | demo; no current external root import found | `subpath:metaballs` | create `src/metaballs.ts`; remove from root | package probe |
| `SortableList` | root via custom/sortable-list | demo; no current external root import found | `subpath:sortable-list` | create `src/sortable-list.ts`; remove from root | package probe |
| `GlassTimeline` | root via custom/timeline | demo; no current external root import found | `subpath:timeline` | create `src/timeline.ts`; remove from root | package probe |
| `LabeledInput` and labeled field exports | root via custom/labeled-field | demo; no current external root import found | `subpath:labeled-field` | create `src/labeled-field.ts`; remove from root | package probe |
| `ExpandableContainer` | root via custom/expandable-container | demo; no current external root import found | `subpath:expandable-container` | create `src/expandable-container.ts`; remove from root | package probe |
| `IconTooltip` | root via custom/icon-tooltip | demo; no current external root import found | `subpath:icon-tooltip` | create `src/icon-tooltip.ts`; remove from root | package probe |

## Notes

- This ledger deliberately keeps root broad enough for current UI primitives and common utilities, but removes custom/domain surfaces that pull dock/search/sidebar/shader-style module graphs.
- Sidebar pure helpers remain in `subpath:sidebar` because current consumers use them directly.
