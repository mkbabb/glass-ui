# O.W4 Lane A—/api discovery promotions proof

**Lane**: A—close the 3 `/api` discovery gaps surfaced by Rγ §3.3.
**Scope**: `src/api/index.ts` (+ canonical-home barrels as needed).
**Surface delta**: 37 → 49 (41 types + 8 constants); +12 types, +0 constants.

## § Disposition

### Cohort 1—Sidebar domain (6 types)

Sourced from `src/components/custom/sidebar/types.ts`; already re-exported from `src/components/custom/sidebar/index.ts` (no barrel edits required).

| Type | Role |
|---|---|
| `SidebarState` | Composable-return canon (`useSidebarState`); parallels `ConfiguratorState<T>` semantically per Rγ §2.2. |
| `SidebarSection` | Row shape (extends `TreeNode` with `title` + optional `children`). |
| `TreeNode` | Minimal tree-node interface (`id` + optional `children`). |
| `TreeIndexEntry<T>` | Flat-index entry—`{node, depth, rootId, parentId, rootIndex}`. |
| `SidebarIndexEntry` | `TreeIndexEntry<SidebarSection>` alias. |
| `ScrollTrackerOptions` | `{rootMargin?, threshold?}` knob shape for `useSidebarFollow`. |

### Cohort 2—Search domain (5 types)

Sourced from `src/components/custom/search/composables/types.ts` + `composables/fuzzySearchIndex.ts` + `composables/useFuzzySearch.ts`; all already re-exported from `src/components/custom/search/index.ts` (no barrel edits required).

| Type | Role |
|---|---|
| `SearchableItem` | Input row shape (consumers feed `buildIndex` / `useFuzzySearch` arrays of these). |
| `SearchResult<T>` | Scored-match payload returned by `searchIndex` + the reactive composable. |
| `FuzzySearchState<T>` | Composable-return canon for `useFuzzySearch`—paired with the `ConfiguratorState` / `SidebarState` shape canon. |
| `UseFuzzySearchOptions<T>` | Reactive composable knob bag. |
| `SearchIndex<T>` | Prebuilt-index handle for the imperative `searchIndex(...)` caller. |

### Cohort 3—Props / variants triad (3 types)

Three discrete adds; the third (`MenuItemVariants`) needed a new sub-internal barrel.

| Type | Source | Notes |
|---|---|---|
| `GlassPanelProps` | `src/components/custom/glass-panel/GlassPanel.vue` (re-exported from `glass-panel/index.ts`) | Props sibling of the already-promoted `GlassPanelVariant`; consumer wraps `<GlassPanel>` and forwards prop bag. |
| `ToastType` | `src/components/ui/toast/use-toast.ts` (already aliased on toast barrel: `export type { Toast as ToastType, ToastVariant }`) | Canonical toast row shape; paired with already-promoted `ToastVariant` enum. |
| `MenuItemVariants` | `src/components/ui/_shared/menuItemVariants.ts` (new barrel `_shared/index.ts` exposes it) | CVA-derived union; 11-site consumer footprint (command + dropdown-menu + context-menu + combobox + select). `_shared/` stays runtime-private (not re-exported via `ui/index.ts`); the new `_shared/index.ts` exists ONLY so `/api` can pin the canonical type from a stable barrel home. |

### Before / after surface count

- **Before (M.W2 Lane B close, v1.0.5)**: 37 symbols—29 types + 8 constants.
- **After (O.W4 Lane A close)**: 49 symbols—41 types + 8 constants.
- **Delta**: +12 types.

## § File changes summary

| File | Change |
|---|---|
| `src/api/index.ts` | +65 / −4 lines. Preamble surface-count + scope-criteria block updated. 3 new sections (Sidebar domain, Search domain, Props triad) + 1-line `MenuItemVariants` re-export adjacent to the existing CVA Variants block. |
| `src/components/ui/_shared/index.ts` | NEW. 11-line barrel exposing `menuItemVariants` (CVA) + `MenuItemVariants` (type). Not added to `ui/index.ts`—`_shared/` runtime privacy preserved. |

Total: 2 files changed (1 modified + 1 created). Zero `.vue` files touched; zero implementation source modified; bounds respected.

## § Verification

```
$ npm run typecheck
> vue-tsc --noEmit
(clean—no output)

$ NODE_OPTIONS="--max-old-space-size=8192" npm run build
✓ built in 27.60s
[vite:dts] Declaration files built in 26476ms.

$ npm run verify-export-types
> node scripts/verify-export-types.mjs
All package export targets and type resolutions are valid.

$ npm test
> vitest run
 Test Files  30 passed (30)
      Tests  348 passed (348)
```

### Distribution probe

All 12 promoted types emit into `dist/api.d.ts`:

```
$ grep -E "MenuItemVariants|SidebarState|SidebarSection|TreeNode|TreeIndexEntry|SidebarIndexEntry|ScrollTrackerOptions|SearchableItem|SearchResult|FuzzySearchState|UseFuzzySearchOptions|SearchIndex|GlassPanelProps|ToastType" dist/api.d.ts
export declare interface FuzzySearchState<T extends SearchableItem = SearchableItem> { ... }
export declare interface GlassPanelProps { ... }
export declare type MenuItemVariants = VariantProps<typeof menuItemVariants>;
export declare interface ScrollTrackerOptions { ... }
export declare interface SearchableItem { ... }
export declare type SearchIndex<T extends SearchableItem = SearchableItem> = IndexEntry<T>[];
export declare interface SearchResult<T extends SearchableItem = SearchableItem> { ... }
export declare type SidebarIndexEntry = TreeIndexEntry<SidebarSection>;
export declare interface SidebarSection extends TreeNode { ... }
export declare interface SidebarState { ... }
export declare interface ToastType { ... }
export declare interface TreeIndexEntry<T extends TreeNode = TreeNode> { ... }
export declare interface TreeNode { ... }
export declare interface UseFuzzySearchOptions<T extends SearchableItem = SearchableItem> { ... }
```

All 12 promoted types resolve through `@mkbabb/glass-ui/api`; the L.W0 Lane III subpath probe (`verify-export-types`) is green.

## § Open questions for orchestrator

1. **Surface-count call-out in CLAUDE.md**: the doc currently states "37 flat JS subpaths"—that count is unchanged (no new subpaths created; `_shared/index.ts` is internal, never published to `package.json` exports). The `/api` surface-symbol count moves 37 → 49; CLAUDE.md only references the `/api` count once (`src/api/` directory comment line: "32 canonical public symbols (28 types + 4 constants)"—stale even pre-O.W4, since M.W2 already moved it to 37). Recommend orchestrator update CLAUDE.md `src/api/` comment to "49 canonical public symbols (41 types + 8 constants)" at W4 close commit.

2. **`_shared/` privacy axis**: Rγ §2.4 raised the question whether `_shared/` should remain runtime-private. This lane preserves status-quo—the new `_shared/index.ts` is consumed ONLY by `src/api/index.ts`; `ui/index.ts` still does NOT re-export `_shared/*`, so `menuItemVariants` (the CVA runtime) remains internally-used-only. If the team later decides to publish a `@mkbabb/glass-ui/menu` substrate, the barrel is ready to lift; until then it is `/api`-only.

3. **Semver framing**: 12 type-only `/api` additions are strictly additive (no removed surface, no changed shapes). v1.2.4 patch tag is appropriate per W4 §gate (f) clause 1. If Lane C's `avatarVariant` rename also lands, the joint release moves to v1.3.0 per gate (f) clause 2.

## § Worktree diff verification

```
$ git status
On branch worktree-agent-afab4a62608906c68
Changes not staged for commit:
        modified:   src/api/index.ts

Untracked files:
        src/components/ui/_shared/index.ts

$ git diff --stat src/api/index.ts
 src/api/index.ts | 69 ++++++++++++++++++++++++++++++++++++++++++++++++++++----
 1 file changed, 65 insertions(+), 4 deletions(-)
```

Read-only git only; no `git add`, `git commit`, `git checkout`, `git stash`, `git reset`, `git restore` executed by this lane. Orchestrator owns the index.

Bounds respected: `src/api/index.ts` (in-scope) + `src/components/ui/_shared/index.ts` (new barrel—within "package barrels under … `src/components/ui/_shared/` (only as needed to re-export the promoted types)" per the lane brief). No component implementation files touched; Lane B (`dock/`, `aurora/composables/`, `motion/useDarkModeSync.ts`) and Lane C (`avatar/`, MIGRATION.md, decision-docs) bounds untouched.
