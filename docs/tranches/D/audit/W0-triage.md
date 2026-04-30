# D.W0.B - C-Forwarded Candidate Triage

Binding action ledger for C's 101 forwarded library-orphan candidates after
the D.W0 hardened re-grep. Rows use D's current action vocabulary:

- `wire`: add or extend a Playwright-walked demo story in D.W1.
- `keep-current`: preserve because there is a current source/demo/external
  consumer; W3 writes consumer-evidence where the proof is not a durable
  story.
- `delete`: remove in D.W2 after re-running the cited grep on current master.

`W0-already-resolved.md` contains 36 rows that flipped to `keep` or were
already deleted. This triage contains the remaining 65 rows. **36 + 65 = 101**.

## Distribution

| Action | Rows | Destination |
|---|---:|---|
| `wire` | 12 | D.W1 |
| `keep-current` | 21 | D.W3 evidence docs where needed |
| `delete` | 32 | D.W2 |
| **Total** | **65** | |

## Custom-Surface Rows

| Candidate | D.W0 verdict | Sites | Action | Rationale |
|---|---|---:|---|---|
| `DockDropdownTrigger` | library-orphan | 0 | wire | Dock trigger belongs with the dock subset story; semantic value beyond a facade. |
| `DockSelectTrigger` | library-orphan | 0 | wire | Same dock subset as `DockDropdownTrigger`; D.W1.D exercises both. |
| `ExpandableContainer` | keep-current | 1 | keep-current | Current demo site in `demo/stories/containers/collapsible.vue`; W3 proof is enough. |
| `GlassCarousel` | library-orphan | 0 | wire | Package-level primitive; D.W1.B creates a carousel story. |
| `GlassCarouselItem` | library-orphan | 0 | wire | Same carousel package; story must exercise item slots. |
| `useGlassCarousel` | keep-current | 1 | wire | Source-consumed by `GlassCarousel`; D.W1.B story must exercise the composable controls. |
| `GlassPanel` | library-orphan | 0 | wire | Owns the glass renderer substrate; semantic component, not a facade. |
| `MetaballCanvas` | library-orphan | 0 | wire | E expects a metaballs package boundary; D must either story-wire or later delete with evidence. W0 chooses story-wire. |
| `useMetaballs` | keep-current | 1 | wire | Source-consumed by `MetaballCanvas`; the same story wires the composable. |
| `buildIndex` | keep-current | 1 | wire | Search helper is source-consumed only; D.W1.A story controls should invoke it directly. |
| `clearSearchCache` | keep-current | 1 | wire | Search helper is source-consumed only; D.W1.A story controls should invoke it directly. |
| `FuzzySearch` | keep-current | 1 | wire | One external consumer exists; D.W1.A still adds a library-owned story for the search package. |
| `ToggleChip` | keep-current | 1 | wire | Current demo coverage is single-site; D.W1.E extends the primitive toggle story. |

## Composable Rows

| Candidate | D.W0 verdict | Action | Rationale |
|---|---|---|---|
| `createGlassFilter` | keep-current | keep-current | Source-consumed by `GlassPanel`; W3 cites the source consumer unless W1 panel story makes it durable enough. |
| `destroyGlassFilter` | keep-current | keep-current | Same `GlassPanel` source consumer. |
| `GlassFilterState` | keep-current | keep-current | Same `GlassPanel` source consumer. |
| `GlassRendererOptions` | library-orphan | delete | Public type has no current source, demo, or external consumer. |
| `GlassTier` | keep-current | keep-current | Same `GlassPanel` source consumer. |
| `useGlassRenderer` | keep-current | keep-current | Same `GlassPanel` source consumer. |
| `useInfiniteScroll` | inline-and-remove | delete | Local `src/composables/infinite-scroll` copy is private one-site substrate; custom package re-export remains the public path. |
| `useHeightTransition` | library-orphan | delete | No current consumer. |
| `useHoverPopover` | library-orphan | delete | No current consumer. |
| `useHoverToggle` | library-orphan | delete | No current consumer. |
| `useLeaveTimer` | keep-current | keep-current | Source-consumed by `useHoverPopover`; if `useHoverPopover` deletes, re-check before action. |
| `useTouchGate` | library-orphan | delete | No current consumer. |
| `AnimatedNumber` | library-orphan | delete | No current consumer. |
| `useAnimatedNumber` | library-orphan | delete | No current consumer after current master re-grep. |
| `UseAnimatedNumberOptions` | library-orphan | delete | No current consumer. |
| `useDarkModeSync` | library-orphan | delete | No current consumer. |
| `useScrollProgress` | keep-current | keep-current | Current demo story `demo/stories/motion/scroll-type.vue`. |
| `UseScrollProgressOptions` | library-orphan | delete | No current consumer. |
| `SpringOrchestrator` | library-orphan | delete | No current consumer. |
| `SpringSnapshot` | keep-current | keep-current | Current demo story `demo/stories/motion/springs.vue`. |
| `UseSpringOrchestratorOptions` | library-orphan | delete | No current consumer. |
| `StaggerRevealApi` | library-orphan | delete | No current consumer. |
| `useStaggerReveal` | keep-current | keep-current | Current demo story `demo/stories/motion/stagger.vue`. |
| `UseStaggerRevealOptions` | library-orphan | delete | No current consumer. |
| `OffsetPaginationOptions` | library-orphan | delete | No current consumer. |
| `hashString` | library-orphan | delete | Became zero-site after `6104ebb` removed `useWatercolorBlob`. |
| `mulberry32` | library-orphan | delete | Became zero-site after `6104ebb` removed `useWatercolorBlob`. |
| `radiiToCSS` | library-orphan | delete | Became zero-site after `6104ebb` removed `useWatercolorBlob`. |
| `randomRadii` | library-orphan | delete | Became zero-site after `6104ebb` removed `useWatercolorBlob`. |
| `SortableItemBinding` | library-orphan | delete | No current consumer. |
| `useSortable` | keep-current | keep-current | Source-consumed by `SortableList`; D.W1.B story extends sortable coverage. |
| `UseSortableOptions` | library-orphan | delete | No current consumer. |
| `UseSortableReturn` | keep-current | keep-current | Source-consumed by `sortable-list/context.ts`. |
| `UseGlobalDarkOptions` | library-orphan | delete | No current consumer of the named public type export. |
| `formatCombo` | library-orphan | delete | No current consumer. |
| `formatComboParts` | library-orphan | delete | No current consumer. |
| `isMac` | keep-current | keep-current | External symbol-only consumer in `words/frontend`; W3 must cite fresh grep proof. |
| `RegisteredShortcut` | library-orphan | delete | No current consumer. |
| `ShortcutOptions` | library-orphan | delete | No current consumer. |
| `useRegisteredShortcuts` | library-orphan | delete | No current consumer. |
| `VirtualSectionWindowOptions` | library-orphan | delete | No current consumer. |
| `useWindowedStore` | keep-current | keep-current | External consumer in `words/frontend/src/stores/search/modes/wordlist.ts`. |
| `UseWindowedStoreOptions` | library-orphan | delete | No current consumer. |
| `WindowedStore` | library-orphan | delete | No current consumer. |
| `buildSectionLayout` | keep-current | keep-current | Source-consumed by `useVirtualSectionWindow`. |
| `findSectionOffset` | keep-current | keep-current | Source-consumed by `useVirtualSectionWindow`. |
| `ForcedSectionWindowRange` | keep-current | keep-current | Source-consumed by `useVirtualSectionWindow`. |
| `resolveActiveSection` | keep-current | keep-current | Source-consumed by `useVirtualSectionWindow`. |
| `resolveSectionWindow` | keep-current | keep-current | Source-consumed by `useVirtualSectionWindow`. |
| `SectionLayout` | keep-current | keep-current | Source-consumed by `useVirtualSectionWindow`. |
| `SectionLayoutEntry` | library-orphan | delete | No current consumer. |
| `SectionWindowRange` | keep-current | keep-current | Source-consumed by `useVirtualSectionWindow`. |

## D.W0-Discovered Rows Outside The 101

The integrated audit also found additional current rows that were outside C's
101-row forwarded ledger, especially UI subcomponents and style-surface
orphans. These are not ignored:

- UI `library-orphan` rows are covered by `W0-facade-list.md` and route to
  D.W2.B when they are zero-value facades.
- Style `library-orphan` rows route through D.W2.D only after a second grep
  confirms the selector or keyframe is not part of a required transition
  contract.
- Any extra `keep-current` rows route to D.W3 only when they lack a durable
  story or internal source consumer citation.
