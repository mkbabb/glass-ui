# F.W0 Component Contract Ledger

W0 classifies component and composable risks by correctness impact, not by file size alone. W3 owns these repairs after W2 dock work lands.

## Unsafe Or Brittle HTML Boundaries

| File | Current behavior | Risk | W3 action |
|---|---|---|---|
| `src/components/custom/search/FuzzySearch.vue` | renders generated highlight HTML with `v-html` | highlight logic and DOM rendering are coupled; sanitizer contract is implicit | replace with segment rendering or a tested local sanitizer boundary |
| `src/components/custom/sidebar/ProgressiveSidebar.vue` | accepts `renderTitle(title): string` and injects it | consumer string HTML is unsafe unless explicitly trusted | convert to slot/segment contract or mark/sanitize trusted HTML |
| `src/components/ui/multi-select/MultiSelect.vue` | accepts `icon?: string` and renders raw HTML | icon API encourages arbitrary HTML | switch to component/slot/plain-text icon contract |
| `src/components/custom/dock/DockLayerGroup.vue` | renders string icons with an HTML branch | dock layers inherit an unsafe icon escape hatch | remove HTML branch; allow component icons or plain text only |

## State And Lifecycle Contracts

| File | Current behavior | W3/W2 action |
|---|---|---|
| `src/components/custom/search/fuzzySearchIndex.ts` | module cache is keyed too narrowly by query and can ignore index identity/max results | make cache instance/source-version scoped or remove it |
| `src/components/custom/search/useFuzzySearch.ts` | debounce timer is not guaranteed to clear on scope disposal; cache invalidation does not track item changes | clean timers and invalidate on source changes |
| `src/components/ui/data-table/DataTable.vue` | default row key can be `undefined`; duplicate keys are not guarded | require or derive stable row identity with tests/dev warnings |
| `src/components/custom/typewriter/TypewriterText.vue` | timeouts are not tracked through shared timer lifecycle | route through `useTimer` or explicit cleanup |
| `src/components/custom/expandable-container/ExpandableContainer.vue` | body overflow lock can clobber prior state | use ref-counted body lock that restores previous value |
| `src/components/custom/carousel/useGlassCarousel.ts` | cleanup can detach from the wrong viewport element | store the bound element and remove listeners from it |
| `src/components/custom/dock/composables/useDockState.ts` | document listener install is deferred and can outlive state changes | W2 owns click-away lifecycle and transition guard repair |
| `src/components/custom/dock/DockPopover.vue` | next-tick click-away setup and global registry can leak/couple instances | W2 owns scoped registry and cleanup |

## Large Files

| File | Lines observed | W0 decision |
|---|---:|---|
| `src/components/custom/aurora/shaders/aurora.frag.ts` | 773 | W5 audits liveness and only splits if shader ownership improves |
| `demo/configurator/useConfigurator.ts` | 645 | W4 splits only if token authority/configurator proof needs it |
| `src/styles/dock.css` | 636 | W2/W4 converge dock CSS authority instead of trimming mechanically |
| `src/composables/sortable/useSortable.ts` | 607 | W3 may extract pure reorder/drop math if tests cover behavior |
| `demo/stories/aurora/AuroraConfigDock.vue` | 595 | W5 splits into colocated layer editors |
| `src/components/custom/search/FuzzySearch.vue` | 589 | W3 split is approved if it separates input, result, modal, and highlight contracts |

## Dead Or Unowned Directories

W3 must delete or give consumed ownership to:

- `src/components/custom/animation`
- `src/components/custom/form`
- `src/components/custom/rail`

## W3 Proof Requirements

- `rg 'v-html' src demo` returns only documented trusted/sanitized boundaries.
- Search cache tests prove no stale data across index/item changes.
- Data table row tests prove stable keys under sort/filter/re-render.
- Lifecycle tests or runtime smoke prove timers/listeners/body lock restore cleanly.
- New subcomponents are colocated under their feature and consumed immediately.
