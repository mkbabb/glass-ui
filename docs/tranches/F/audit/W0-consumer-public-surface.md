# F.W0 Consumer And Public Surface Ledger

W0 audited active sibling consumers and the package export surface. The current package root is already narrow, but two active consumers still import non-core symbols from the root. W1 must migrate the consumers and add a static policy gate; no compatibility shim is allowed.

## Active Consumers

| Consumer | Root import state | Style import state | W1 action |
|---|---|---|---|
| `../fourier-analysis/web/src` | root imports are core-only | uses `@mkbabb/glass-ui/styles` | keep as control lane; static and build proof only |
| `../words/frontend/src` | root imports are core-only | uses `@mkbabb/glass-ui/styles` | keep as control lane; static and build proof only |
| `../bbnf-lang/playground/src` | imports non-core root symbols | uses `@mkbabb/glass-ui/styles` | migrate to explicit subpaths and build |
| `../speedtest/src` | imports non-core root symbols | uses `@mkbabb/glass-ui/styles`; also has source-relative Tailwind source/test imports | migrate to explicit subpaths, remove source-relative dependency, and build |

## Non-Core Root Drift

| Symbol | Required public path |
|---|---|
| `GlassDock`, `DockIconButton`, `DockLayer`, `DockLayerGroup`, `DockPopover`, `DockTabButton` | `@mkbabb/glass-ui/dock` |
| `UnderlineTabs`, `BouncyTabs`, `BouncyToggle` | `@mkbabb/glass-ui/tabs` |
| `DarkModeToggle` | `@mkbabb/glass-ui/controls` |
| `FuzzySearch`, `useFuzzySearch`, `SearchableItem` | `@mkbabb/glass-ui/search` |
| `SidebarSection`, `buildTreeIndex`, `useScrollTracker` | `@mkbabb/glass-ui/sidebar` |
| `InfiniteScroll` | `@mkbabb/glass-ui/infinite-scroll` |
| `Aurora`, `AuroraConfig` | `@mkbabb/glass-ui/aurora` |
| `MetricBadge` | `@mkbabb/glass-ui/metric-badge` |
| `Pulse` | `@mkbabb/glass-ui/pulse` |
| `ToggleChip` | `@mkbabb/glass-ui/toggle-chip` |
| `ExpandableContainer` | `@mkbabb/glass-ui/expandable-container` |
| `IconTooltip` | `@mkbabb/glass-ui/icon-tooltip` |

## Root Surface To Keep

The root remains the core contract:

- UI primitive exports from `src/components/ui`.
- `cn`.
- `useGlobalDark`.
- toast APIs.
- timer/motion utilities currently backed by active package evidence: `useTimer`, `useInterval`, `useRAFLoop`, `useIntersectionPause`, `useAnimatedNumber`, `DAMPING`, `SNAP_THRESHOLD`, `useDarkModeSync`, and `registerShortcut`.

## Public Surface Decisions

| Surface | W0 finding | F action |
|---|---|---|
| `src/index.ts` | root is narrow, but README and consumers still imply a wider root | W1 migrates consumers and docs; W6 re-audits before any root change |
| `src/composables/index.ts` | broad internal barrel has no explicit public subpath | W3/W6 either fence as internal or promote only evidence-backed symbols |
| `src/components/custom/dock/index.ts` | subpath exposes internal dock composables/state | W2 narrows or proves every subpath export |
| Story-only subpaths | some packages appear story/test-only | W6 public-surface audit keeps only source/story/test/consumer-backed surface |

## Docs Drift To Correct In W1

- README examples still show non-core root imports such as `GlassDock`, `DarkModeToggle`, and `useDockState`.
- README/docs mention deleted utilities such as clipboard/copy/watercolor/interaction paths.
- W1 static gate must include README/doc grep checks for retired import examples.

## W1 Static Policy Requirements

The new policy must reject:

1. non-core symbols imported from `@mkbabb/glass-ui`;
2. style paths other than `@mkbabb/glass-ui/styles`;
3. source-relative imports into `glass-ui/src`;
4. local aliases that hide package drift;
5. undocumented consumer exceptions.
