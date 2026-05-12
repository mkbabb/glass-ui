# M.W0 Lane IV — Retired-subpath drift fix in fourier-analysis/web

Lane scope: migrate fourier-analysis/web off the retired `@mkbabb/glass-ui/pagination`
subpath (and adjacent retired root-barrel symbols), per glass-ui v1.0 cut.

## § Disposition

Three call sites needed migration:

1. `src/components/visualization/gallery/AdminFlaggedPanel.vue` — imported
   `useOffsetPagination` from the retired `@mkbabb/glass-ui/pagination` subpath.
2. `src/components/visualization/gallery/AdminUserList.vue` — same.
3. `src/components/layout/DarkModeToggle.vue` — imported `useGlobalDark` from the
   v1.0-retired ROOT BARREL (moved to `/dark` per MIGRATION.md §1.3). Found via
   exhaustive sweep per the lane brief.

### Choice rationale: local composable (not vueuse, not external lib)

The orchestrator brief recommended trying `@vueuse/core`'s `useOffsetPagination`
as a 1:1 swap since `@vueuse/core ^14.0` is already a fourier-analysis/web
dependency. Inspected the vueuse signature at
`/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@vueuse/core/dist/index.d.ts:3739–3779`:

```ts
interface UseOffsetPaginationOptions {
  total?: MaybeRefOrGetter<number>;
  pageSize?: MaybeRefOrGetter<number>;
  page?: MaybeRef<number>;
  onPageChange?: (returnValue) => unknown;
  onPageSizeChange?: (returnValue) => unknown;
  onPageCountChange?: (returnValue) => unknown;
}
interface UseOffsetPaginationReturn {
  currentPage: Ref<number>;
  currentPageSize: Ref<number>;
  pageCount: ComputedRef<number>;
  isFirstPage: ComputedRef<boolean>;
  isLastPage: ComputedRef<boolean>;
  prev: () => void;
  next: () => void;
}
```

vs the glass-ui v0.9.3 shape consumed by the admin call sites:

```ts
// Input
{ fetchFn: (limit, offset) => Promise<{ data, total }>; pageSize? }
// Output
{ items, total, page, pageCount, loading, hasNext, hasPrev,
  loadPage(p?), nextPage, prevPage }
```

These are NOT 1:1 swappable — they are different primitives:

- vueuse is a **passive** page-state primitive: external `total` ref, no
  fetch loader, no `items`/`loading`/`error` lifecycle.
- glass-ui v0.9.3 is an **active** fetchFn-driven loader: it owns the
  network call, the result buffer, and the loading state.

The admin call sites use `items`, `total`, `loading`, `hasNext`, `hasPrev`,
`loadPage`, `nextPage`, `prevPage` — every output property is the active
shape. They also call `loadPage(1)` on mount AND on filter/sort changes,
which is the explicit fetch-invalidation idiom of the active shape.

Adapting the call sites to vueuse would require ~40 LOC per site:
hand-wiring a separate `loading` ref + `items` ref + watch-driven
re-fetch on `currentPage`/`currentPageSize` change + manual `total`
write-back. That is more code than the composable itself, AND it is a
workaround (V2 forbids) — adapting the consumer to fit a primitive that
doesn't match the use case.

Per MIGRATION.md §3.1 the canonical migration is: "copy from v0.9.3
source if you want the exact shape." The v0.9.3 file is 60 LOC of pure
Vue 3 with no glass-ui-private substrate. Forked verbatim into
`fourier-analysis/web/src/composables/useOffsetPagination.ts` with a
header comment documenting the migration provenance.

This is V4 (architectural transposition): the composable always belonged
to the consumer's app layer — glass-ui v1.0 audit found it had 0
production consumers across the glass-ui constellation, which is why
the subpath retired. Moving it to the consumer is the right home.

## § File changes summary

| File | Change kind | Description |
|---|---|---|
| `web/src/composables/useOffsetPagination.ts` | NEW | Local fork of glass-ui v0.9.3 `useOffsetPagination` (60 LOC, pure Vue 3, no glass-ui substrate). Header comment documents migration provenance and rationale for not using vueuse. |
| `web/src/components/visualization/gallery/AdminFlaggedPanel.vue` | EDIT (1 line) | Import path: `@mkbabb/glass-ui/pagination` → `@/composables/useOffsetPagination`. |
| `web/src/components/visualization/gallery/AdminUserList.vue` | EDIT (1 line) | Same import-path swap. |
| `web/src/components/layout/DarkModeToggle.vue` | EDIT (1 line) | Import path: `@mkbabb/glass-ui` → `@mkbabb/glass-ui/dark` (v1.0 vueuse-bearing surface moved to flat subpath per MIGRATION.md §1.3). |

Total: 1 new file, 3 import-path edits, 0 logic changes at call sites.

## § Verification

### Retired-symbol grep (must be 0)

```
$ rg -n '@mkbabb/glass-ui/(pagination|virtual|composables/(dark|keyboard))' web/src/
web/src/composables/useOffsetPagination.ts:11: * v1.0 cut — the upstream subpath `@mkbabb/glass-ui/pagination` was retired
```

The sole hit is the documentation comment in the local composable's header
explaining provenance — NOT an import. Confirms 0 retired-subpath IMPORTS.

```
$ rg -n 'from "@mkbabb/glass-ui"' web/src/ | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts|useOffsetPagination)\b'
(no matches)
```

0 retired root-barrel symbol imports remain.

```
$ rg -n '\b(useOffsetPagination|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow|FlatSection|SectionLayout|SectionWindowRange|ForcedSectionWindowRange)\b' web/src/
```

Only resolves to the local composable + the two admin call sites that
now import from `@/composables/useOffsetPagination`. No glass-ui-sourced
retired-symbol hits.

Note on `useVirtualSectionWindow`: appears at
`web/src/components/paper/PaperView.vue:10`, imported from
`@mkbabb/latex-paper/vue` — **different upstream package** (latex-paper,
not glass-ui). Name collision only; out of scope for this lane.

### Typecheck

```
$ npx vue-tsc --noEmit
src/components/visualization/CanvasControlsDock.vue(7,10): error TS2305: Module '"@mkbabb/glass-ui/dock"' has no exported member 'DockPopover'.
src/components/visualization/EditorControlsDock.vue(2,21): error TS2305: Module '"@mkbabb/glass-ui/dock"' has no exported member 'DockPopover'.
EXIT=2
```

Two errors, both **PRE-EXISTING and OUT-OF-SCOPE for Lane IV**:

- `DockPopover` was renamed to `HoverPopover` at glass-ui commit `deba31d`
  (tranche-J W3 "dock cornerstone + DockPopover→HoverPopover"). These
  two consumer files are in an in-flight refactor state (verified via
  `git diff HEAD` on `CanvasControlsDock.vue` — the worktree already had
  the `import { ..., DockPopover, ... } from "@mkbabb/glass-ui/dock"`
  line added as part of orchestrator/other-lane work BEFORE this lane
  began).
- Confirmed zero typecheck errors on the files in Lane IV scope
  (`AdminFlaggedPanel.vue`, `AdminUserList.vue`, `DarkModeToggle.vue`,
  `useOffsetPagination.ts`) via `cat /tmp/fourier-tsc.log | rg`.

### Build

```
$ npx vite build
✗ Build failed in 3.46s
error during build:
EditorControlsDock.vue ... "DockPopover" is not exported by ... glass-ui/dist/dock.js
EXIT=1
```

Same `DockPopover` blocker — pre-existing, outside Lane IV scope.
Lane IV files do not contribute to this failure.

## § Open questions for orchestrator

1. **`DockPopover` drift (pre-existing).** Three consumer files reference
   `DockPopover` from `@mkbabb/glass-ui/dock`, which no longer exists at
   glass-ui v1.0 (renamed to `HoverPopover` at tranche-J):
   - `web/src/components/visualization/CanvasControlsDock.vue:7`
   - `web/src/components/visualization/EditorControlsDock.vue:2`
   - Plus `web/src/components/visualization/DockPopover.vue` (the local
     copy) was DELETED in the working tree — see `git status` showing
     `D src/components/visualization/DockPopover.vue`.

   This blocks `npm run build` and `npm run typecheck`. NOT introduced
   by Lane IV. Suggest dispatching a follow-on lane to swap
   `DockPopover` → `HoverPopover` from `@mkbabb/glass-ui/hover-popover`
   across these two consumer files. (Confirm the HoverPopover prop API
   matches the DockPopover usage before swapping.)

2. **Worktree was dirty on entry.** This worktree had a large
   in-progress refactor (49+ modified/deleted/added files) BEFORE Lane IV
   work began — including additions like `AdminFlaggedPanel.vue` and
   `AdminUserList.vue` themselves (both `??` untracked). Lane IV
   operated only on the four files in its scope; all other dirty paths
   are external. Orchestrator should be aware that fourier-analysis/web
   currently carries unrelated in-flight work.

## § Worktree diff verification

### fourier-analysis/web (Lane IV scope only)

```
$ git -C /Users/mkbabb/Programming/fourier-analysis/web status --short \
    src/components/visualization/gallery/AdminFlaggedPanel.vue \
    src/components/visualization/gallery/AdminUserList.vue \
    src/composables/useOffsetPagination.ts \
    src/components/layout/DarkModeToggle.vue
 M src/components/layout/DarkModeToggle.vue
?? src/components/visualization/gallery/AdminFlaggedPanel.vue
?? src/components/visualization/gallery/AdminUserList.vue
?? src/composables/useOffsetPagination.ts
```

Lane IV touched exactly these four files. `AdminFlaggedPanel.vue`,
`AdminUserList.vue`, and `useOffsetPagination.ts` show as `??` because
the first two were already untracked from prior in-flight work, and
the third is my new file. `DarkModeToggle.vue` shows ` M` (modified)
because it was already tracked-and-modified; Lane IV added the import
path swap on top of an in-progress edit.

Full worktree status carries unrelated dirty paths from external work
(see § Open questions point 2). Not reproduced here — out of Lane IV
scope.

### glass-ui (audit dir only)

```
$ git -C /Users/mkbabb/Programming/glass-ui status --short
 ? docs/precepts
?? docs/tranches/M/audit/
```

Only the new audit file dir for this proof. No glass-ui src/ or
docs/precepts/ touched (Lane IV is consumer-side only).

## Summary for orchestrator

- **Retired-import migration count:** 3 call sites migrated.
  - 2x `useOffsetPagination` from `@mkbabb/glass-ui/pagination` → local
    `@/composables/useOffsetPagination`.
  - 1x `useGlobalDark` from `@mkbabb/glass-ui` → `@mkbabb/glass-ui/dark`.
- **Final retired-import grep:** 0 retired-symbol imports from glass-ui
  remain in `fourier-analysis/web/src/`.
- **Build/typecheck pass status:** BLOCKED by pre-existing `DockPopover`
  drift in two unrelated consumer files (out of Lane IV scope; see
  Open questions §1). Lane IV files compile cleanly.
- **Blockers:** `DockPopover` → `HoverPopover` swap is the only blocker
  on a green build. Recommend dispatching a follow-on lane.
