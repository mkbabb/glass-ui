# A.D.research.03 — Dead / Contrived / Shim / Legacy Code Hunt

## Pass 1 — Comment-marker hunt

| file:line | marker | text | verdict |
|---|---|---|---|
| `src/components/custom/sidebar/composables/useTreeIndex.ts:96` | `@deprecated` | "Prefer `useTreeIndex` which also returns helper functions." | leave-with-rationale (interior JSDoc, not dead path) |

No `// removed`, `// legacy`, `// old`, `// will remove`, `// backwards compat`, `// migration`, `// transitional`, `// TODO`, `// FIXME`, `// XXX`, `// HACK`. No `_unused`, `_legacy`, `_old` identifier prefixes. No `process.env.NODE_ENV` gates. **Codebase is comment-clean.**

## Pass 2 — Façade + shim audit

### Minimal-substance components

| file | lines | template | verdict | rationale |
|---|---|---|---|---|
| `src/components/ui/avatar/AvatarImage.vue` | 9 | `<AvatarImage v-bind="props" class="..." />` | inline | Façade wrapping reka-ui's `AvatarImage` with single `object-cover` class. Zero added semantic. Delete. |
| `src/components/ui/select/SelectValue.vue` | 11 | `<SelectValue v-bind="props"><slot/></SelectValue>` | inline | Pure proxy. Zero added logic. Delete. |
| `src/components/ui/number-field/NumberFieldInput.vue` | 8 | `<NumberFieldInput :class="cn(...)" />` | inline | Reka-ui + cn() class wrapping. No component logic. |
| `src/components/ui/select/SelectLabel.vue` | 13 | `<SelectLabel v-bind="props"><slot/></SelectLabel>` | inline | Passthrough. |

**Finding**: ~20 ui components are 8–19 line façades (`SelectGroup`, `SelectSeparator`, `SheetClose`, `DrawerHeader`, `CardContent`, `TableCell`, etc.) doing nothing but `v-bind` + slot forwarding to reka-ui primitives. They add **0 semantic value** and increase import surface.

**Proposal**: Phase out. Consumers should import reka-ui directly for trivial passthroughs. Keep only components that add meaningful styling/logic (`Button` with CVA, `Badge` with variants).

## Pass 3 — Contrived complexity

### Components > 200 lines audited

| file | lines | shape | verdict |
|---|---|---|---|
| `src/components/custom/dock/GlassDock.vue` | 336 | Orientation-aware dock with state composables, ref-counted keepOpen/release, click-away, pinning, animation gating | **Not contrived.** Essential complexity. Composables cleanly factored. Keep. |
| `src/components/custom/search/FuzzySearch.vue` | 589 | Search UI with inline + expanded modal variants sharing 80% template | **Separable.** Split into `FuzzySearchInline.vue` (~200 lines) + wrapper. Highlight logic moves to `composables/search/`. |
| `src/components/custom/dock/DockLayerGroup.vue` | 205 | Multi-layer grid + tab switching + crossfade + FLIP animation + rail rendering | Not contrived. FLIP logic in dedicated composable. Keep. |
| `src/components/custom/sidebar/ProgressiveSidebar.vue` | 256 | Sidebar + scroll tracking + tree index + virtual windowing + section caching | Not contrived. Logic distributed across composables. Keep. |

### Composable complexity

| file | lines | verdict |
|---|---|---|
| `src/composables/sortable/useSortable.ts` | 607 | Pointer capture + ghost DOM cloning + cross-list drop detection | Not contrived. Inherent to drag-reorder + cross-list. Keep. |
| `src/composables/virtual/useVirtualSectionWindow.ts` | 338 | Scroll-driven virtualization + ResizeObserver + RAF scheduling | Not contrived. Mirrors DOM model. Keep. |

**Verdict**: No hand-rolled complexity disguising simple functionality.

## Pass 4 — Library-substrate redundancy

### Raw `addEventListener` instead of `@vueuse/useEventListener`

15+ direct `addEventListener` sites across the codebase. **All justified**:
- `useSortable.ts:359-363` — pointer capture requires manual cleanup before re-capture; `useEventListener` doesn't gain readability.
- `useHeightTransition.ts` — one-shot transitionend handler; could use `useEventListener` (minor cosmetic gain).
- `DockPopover.vue` — capture-phase listener; explicit.
- `useVirtualSectionWindow.ts` — passive scroll handler; minor refactor candidate.

### Custom clipboard / dark mode

| file | rationale |
|---|---|
| `useClipboard.ts` | Implements iOS Safari workaround `@vueuse` doesn't cover. Justified. |
| `useGlobalDark.ts` | Adds Safari-specific `colorScheme` mirror + reflow force. Justified. |

**Finding**: No reimplementation of reka-ui Dialog/Popover/Tooltip. `DockPopover` is action-bar-specific (not a Dialog reimplementation).

## Pass 5 — Tailwind/CSS redundancy

### Scoped `<style>` blocks duplicating Tailwind utilities

69 instances of `display: flex; align-items; justify-content; gap; padding` patterns inside scoped style blocks across:
- `src/components/custom/dock/DockSelectTrigger.vue`
- `src/components/custom/dock/DockDropdownTrigger.vue`
- `src/components/custom/dock/DockIconButton.vue`
- `src/components/custom/dock/DockPopover.vue`
- `src/components/custom/dock/GlassDock.vue`
- `src/components/custom/dock/DockLayerGroup.vue`
- `src/components/custom/tabs/UnderlineTabs.vue`
- `src/components/custom/tabs/BouncyToggle.vue`
- `src/components/custom/search/FuzzySearch.vue`

**Example pattern** (`DockSelectTrigger.vue`):
```vue
<style scoped>
.dock-select-trigger {
    display: inline-flex;       /* → inline-flex */
    align-items: center;        /* → items-center */
    justify-content: center;    /* → justify-center */
    flex-shrink: 0;             /* → flex-shrink-0 */
    gap: 0.25rem;               /* → gap-1 */
    padding: 0.25rem 0.5rem;    /* → px-2 py-1 */
}
</style>
```

These can migrate to Tailwind classes; ~80 lines of CSS savings. Low priority (no functional change), but reduces dist CSS size.

## Pass 6 — Structural anomaly: sidebar composables nested in component package

| file | exports |
|---|---|
| `src/components/custom/sidebar/index.ts` lines 2-6 | useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex (re-forwarded from `./composables/*`) |
| `src/composables/index.ts` lines 16-24 | Same symbols, re-exported from `../components/custom/sidebar` |

**Issue**: Sidebar composables live at `src/components/custom/sidebar/composables/` but are re-exported all the way up to `src/composables/index.ts`. Breaks CLAUDE.md's documented structure ("composables in `src/composables/`, not buried in component packages").

**Proposal**: Move `src/components/custom/sidebar/composables/*.ts` → `src/composables/sidebar/`. Update imports.

Dock composables have a similar but less egregious shape (`src/components/custom/dock/composables/`); intentional per CLAUDE.md as the dock package is monolithic.

## Pass 7 — Type alias overfitting

No single-use type aliases. All exported types have ≥ 2 import sites and semantic names.

## Top-10 actionable items

### 1. Delete façade passthrough components (ui/)
- ~20+ components: SelectLabel, SelectValue, SelectGroup, SelectSeparator, SheetClose, CardContent, AvatarImage, etc.
- ~250 lines saved
- Cross-reference C.W0 orphan verdicts; if marked library-orphan, delete. Otherwise demo-wire 1-2 examples.

### 2. Split FuzzySearch into inline + expanded variants
- `src/components/custom/search/FuzzySearch.vue` (589 lines)
- ~250 lines saved via decomposition
- Pure template refactor; no new logic

### 3. Migrate dock-layer scoped styles to Tailwind classes
- 6 dock files with scoped style blocks
- ~80 lines CSS saved
- Mechanical class replacement

### 4. Hoist sidebar composables to `src/composables/sidebar/`
- Aligns codebase with CLAUDE.md's stated structure
- Update imports across sidebar component + composables/index.ts

### 5. Reduce sidebar/dock composable export duplication
- Remove duplicate export lines after item 4
- ~15 lines saved

### 6. Extract DockPopover click-away into reusable composable
- `src/components/custom/dock/DockPopover.vue` (271 lines)
- Extract `usePopoverGroup()`; ~40 lines saved
- Click-away + mutual-exclusivity is dock-specific but pattern is reusable

### 7. Remove typewriter utilities if TypewriterText is deleted
- `src/components/custom/typewriter/utils/` (4 files, ~150 lines)
- Conditional on C.W0 verdict for TypewriterText (library-orphan)

### 8. Audit useAnimatedNumber + useSpringOrchestrator consolidation
- Both animate numeric values; potential merger
- Both currently used; check call-site count

### 9. Migrate useHeightTransition to useEventListener
- ~10 lines saved; trivial refactor
- Improves @vueuse ecosystem composability

### 10. Dedup dock composables index.ts
- Remove duplicate exports between `dock/index.ts` and `dock/composables/index.ts`
- ~8 lines saved

## Summary

- **Pass 1**: comment-clean codebase
- **Pass 2**: 20 façade ui components are zero-value passthroughs — strong delete candidates
- **Pass 3**: no contrived complexity; large components/composables justified
- **Pass 4**: no reka-ui or @vueuse reimplementation; raw addEventListener calls all justified
- **Pass 5**: 69 instances of Tailwind-replacement-able CSS in scoped style blocks
- **Pass 6**: sidebar composables wrongly nested; should hoist per CLAUDE.md
- **Pass 7**: no type alias overfitting

**Highest-value cleanup**: items 1 (façade deletion), 2 (FuzzySearch split), 4 (sidebar hoist). All cross-tranche debt deferred to D.
