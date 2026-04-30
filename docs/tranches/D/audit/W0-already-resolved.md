# D.W0.B - Already-Resolved C-Forwarded Rows

C forwarded 101 library-orphan candidates into D. Current D.W0 re-grep
flipped the rows below to already resolved: they now have at least two
current sites, or they were deleted by `6104ebb` while W0 was running. These
rows do not need W1 wiring or W2 deletion.

## Count

| Source | Rows |
|---|---:|
| Custom rows flipped to `keep` | 25 |
| Composable rows flipped to `keep` or deleted by `6104ebb` | 11 |
| **Total** | **36** |

`W0-triage.md` contains the remaining 65 C-forwarded rows. **36 + 65 = 101**.

## Custom Rows

| Candidate | D.W0 verdict | Current proof |
|---|---|---|
| `createAurora` | keep | 2 source + 1 demo sites in `W0-overfitting-custom.md`. |
| `ConfirmDialog` | keep | 2 demo + 5 external consumer sites. |
| `DockIconButton` | keep | 1 source + 7 external consumer sites. |
| `DockLayer` | keep | 1 source + 2 demo sites. |
| `DockLayerGroup` | keep | 1 source + 2 demo sites. |
| `DockPopover` | keep | 1 demo + 2 external consumer sites. |
| `InfiniteScroll` | keep | 1 demo + 1 external consumer site. |
| `fuzzyMatch` | keep | 1 source + 3 external consumer sites. |
| `SearchBar` | keep | 1 demo + 2 external consumer sites. |
| `searchIndex` | keep | 1 source + 3 external consumer sites. |
| `useFuzzySearch` | keep | 1 source + 1 external consumer site. |
| `ProgressiveSidebar` | keep | 1 demo + 2 external consumer sites. |
| `useScrollTracker` | keep | 2 external consumer sites. |
| `useSidebarFollow` | keep | 2 external consumer sites. |
| `useSidebarState` | keep | 1 source + 1 demo + 3 external consumer sites. |
| `useTreeIndex` | keep | 1 source + 2 external consumer sites. |
| `SORTABLE_CONTEXT` | keep | 2 source sites. |
| `SortableHandle` | keep | 2 source + 1 demo sites. |
| `SortableItem` | keep | 2 source + 1 demo sites. |
| `SortableList` | keep | 2 source + 1 demo sites. |
| `StackedIconGroup` | keep | 1 demo + 2 external consumer sites. |
| `UnderlineTabs` | keep | 3 external consumer sites. |
| `GlassTimeline` | keep | 1 demo + 1 external consumer site. |
| `TypewriterText` | keep | 2 external consumer sites. |
| `useTypewriter` | keep | 1 source + 5 external consumer sites. |

## Composable Rows

| Candidate | D.W0 verdict | Current proof |
|---|---|---|
| `useSpringOrchestrator` | keep | 1 source + 1 demo site. |
| `useOffsetPagination` | keep | 2 external consumer sites. |
| `SortableId` | keep | 2 source sites. |
| `useGlobalDark` | keep | 2 source + 1 demo + 5 external consumer sites. |
| `registerShortcut` | keep | 1 source + 2 demo sites. |
| `useVirtualSectionWindow` | keep | 2 external consumer sites. |
| `FlatSection` | keep | 1 source + 1 external consumer site. |
| `useCharSplit` | deleted | Removed by `6104ebb`; `rg -n "useCharSplit" src demo ../fourier-analysis/web/src ../words/frontend/src ../bbnf-lang/playground/src` has no glass-ui consumer. |
| `copyToClipboard` | deleted | Removed by `6104ebb`; remaining `copyToClipboard` matches are local consumer helper names, not glass-ui imports. |
| `useWatercolorBlob` | deleted | Removed by `6104ebb`; no current source/demo/external matches. |
| `UseWatercolorBlobOptions` | deleted | Removed by `6104ebb`; no current source/demo/external matches. |

## Notes

- C.W0's prose also mentioned `Pulse` and `StatusDot`, but C's close ledger
  says 101 forwarded rows = 38 custom + 63 composables. The 38 custom-row
  arithmetic excludes `Pulse` and `StatusDot`; both already have current
  primitive stories and are outside the 101-row close check.
