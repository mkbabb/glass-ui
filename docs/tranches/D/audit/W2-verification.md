# D.W2 Verification

Close artefact for D.W2 — Delete Pass + Facade Sweep + Sidebar Hoist.

## Integrated commits

| Sub-phase | Commit | Result |
|---|---:|---|
| W2.C sidebar hoist | `0b66855` | Moved sidebar composables to `src/composables/sidebar/`, trimmed `src/components/custom/sidebar/` to component + types, and split the demo import. |
| W2.B ui facades | `0f4e3d1` | Deleted the 5 facades that still had zero consumers after fresh grep. |
| W2.D styles | `b0debec` | Deleted zero-site style-surface rules and keyframes after fresh source/demo grep. |
| W2.A composables | `698d022` | Removed orphan composable exports and duplicate local infinite-scroll composable surface. |
| W2.A scope reveal | `a9291f6` | Restored `useAnimatedNumber` / `AnimatedNumber` / `UseAnimatedNumberOptions` after current speedtest consumer evidence surfaced. |
| W2.A scope reveal | `8ec807b` | Restored `useDarkModeSync` after current speedtest meter consumer evidence surfaced. |
| W2.E consolidation | `42db7bc` | Reconciled `CLAUDE.md` structure/counts and recorded integrated verification. |

## Scope Reveals

### Sidebar import split

W2.C found one live demo import that W0.D did not enumerate. The demo now imports `ProgressiveSidebar` and sidebar component types from `@/components/custom/sidebar`, while importing `useSidebarState` from `@/composables/sidebar`.

Verification:

```bash
test ! -d src/components/custom/sidebar/composables
rg 'components/custom/sidebar/composables|from "@/components/custom/sidebar/composables"|from "../components/custom/sidebar/composables"' src demo
```

Result: old directory absent; stale import grep empty.

### Facade flips

W2.B re-grepped every W0.C facade delete row against current source and consumer trees. Five remained zero-consumer and were deleted:

- `ContextMenuGroup`
- `ContextMenuPortal`
- `ContextMenuSub`
- `SelectItemText`
- `TableFooter`

The remaining 34 W0.C delete rows flipped to keep-current because fresh grep found source or consumer usage.

### Composable flips

W2.A deleted the orphan composable/type/helper names that stayed unused after current-master grep, but fresh cross-workspace grep surfaced current speedtest usage for:

- `useAnimatedNumber`
- `AnimatedNumber`
- `UseAnimatedNumberOptions`
- `useDarkModeSync`

Proof paths:

```text
/Users/mkbabb/Programming/speedtest/src/components/dashboard/charts/MetricGaugeCards.vue
/Users/mkbabb/Programming/speedtest/src/components/speedtest/MetricPillCluster.vue
/Users/mkbabb/Programming/speedtest/src/components/speedtest/SpeedtestResults.vue
/Users/mkbabb/Programming/speedtest/src/components/speedtest/SpeedtestMeter.vue
```

Those symbols are retained and will receive W3 current-consumer evidence docs.

## Public Surface Checks

Re-export resolution:

```bash
rg "export \* from" src/index.ts src/components/index.ts src/components/custom/index.ts src/components/ui/index.ts src/composables/index.ts
node <star-export-resolution-check>
```

Result: all star re-exports resolve.

Post-W2 counts:

```text
custom dirs: 26
custom public exports: 24
ui dirs: 39
ui public exports: 39
composable top exports: 9
composable files: 23
```

`CLAUDE.md` now records those counts and the sidebar composable hoist.

## Deleted Declaration Surface

Adjusted for the two speedtest-backed W2.A flips, the actual-deleted symbol check covered 33 names and found zero declaration leaks:

```text
GlassRendererOptions
useHeightTransition
useHoverPopover
useHoverToggle
useTouchGate
UseScrollProgressOptions
SpringOrchestrator
UseSpringOrchestratorOptions
StaggerRevealApi
UseStaggerRevealOptions
OffsetPaginationOptions
hashString
mulberry32
radiiToCSS
randomRadii
SortableItemBinding
UseSortableOptions
UseGlobalDarkOptions
formatCombo
formatComboParts
RegisteredShortcut
ShortcutOptions
useRegisteredShortcuts
VirtualSectionWindowOptions
UseWindowedStoreOptions
WindowedStore
SectionLayoutEntry
useLeaveTimer
ContextMenuGroup
ContextMenuPortal
ContextMenuSub
SelectItemText
TableFooter
```

Command result:

```text
actual-deleted-symbol d.ts check: 33/33 absent
```

## Build Evidence

Library:

```text
npm run typecheck: exit 0
npm run build: exit 0
dist/glass-ui.js 369.04 kB / 370036 bytes
dist/glass-ui.css 39.81 kB / 39809 bytes
```

Bundle delta:

```text
c-close JS: 381.42 kB
d.W2 JS: 369.04 kB
delta: -12.38 kB
```

Consumers:

```text
/Users/mkbabb/Programming/fourier-analysis/web: npm run build exit 0
/Users/mkbabb/Programming/words/frontend: npm run build exit 0
/Users/mkbabb/Programming/bbnf-lang/playground: npm run build exit 0
/Users/mkbabb/Programming/speedtest: npm run build exit 0
```

The speedtest build is additional evidence beyond the W2 hard gate because W2.A scope reveal found live speedtest imports.

## Browser Evidence

In-app browser session against `http://127.0.0.1:5173/`:

```text
manifest route walk: 71/71 routes
story fallbacks: 0
new console errors: 0
```

Representative W2-touched surfaces included sidebar, infinite scroll, search, context menu, select, table, and motion transition routes through the full manifest walk.

## Gate Result

W2 hard gate closed:

- Typecheck and build clean.
- Bundle smaller than `c-close`.
- Required three consumer builds clean; speedtest also clean due scope reveal.
- Sidebar composables live at `src/composables/sidebar/`; old component-local composable directory is gone.
- Stale sidebar import grep empty.
- Actual-deleted symbols absent from `dist/index.d.ts`.
- `CLAUDE.md` counts match filesystem/export reality.
