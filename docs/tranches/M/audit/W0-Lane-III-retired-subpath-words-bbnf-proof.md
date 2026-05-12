# M.W0 Lane III — Retired-subpath drift fix in words/frontend + bbnf-buddy

Cross-repo multi-writer implementation lane. Closes retired-subpath drift in
words/frontend, verifies bbnf-buddy carries no retired-subpath imports, and
fixes the broken `file:./glass-ui` pin in words/frontend.

Status — words/frontend: retired-subpath sweep clean; v1.0 root-barrel
vueuse-bearing imports migrated to their subpaths; package.json pin
re-pointed to `file:../../glass-ui` (workspace-hoisted to
`words/node_modules/@mkbabb/glass-ui -> ../../../glass-ui`); typecheck +
build blocked by a glass-ui v1.0 packaging defect (Carousel components
unreachable on `/carousel` subpath) AND by pre-existing words/frontend
`glass-subtle` button-variant baseline drift.

Status — bbnf-buddy: retired-subpath sweep already clean (zero matches at
HEAD per Rα §A.5 reverification); 2 root-barrel `useGlobalDark` sites
migrated to `/dark`. typecheck + build blocked by broader pre-existing v1.0
root-barrel-curation drift (~14 surfaces — `GlassDock`, `DockIconButton`,
`DockDropdownTrigger`, `BouncyTabs`, `ScrollArea`, `ToggleChip`,
`SortableList`, `SortableItem`, `SortableHandle`, `DarkModeToggle`,
`useGlobalDark` in SettingsPanel, `useLeaveTimer`) that fall under L
invariant 6 (per-package subpaths) — out of M.W0 Lane III scope.

---

## Disposition

### words/frontend — choice rationale (V2.d gestalt)

The dispatch presented two migration options for `useVirtualSectionWindow` /
`useWindowedStore` / `FlatSection`:

- **Option A** — adopt `@tanstack/vue-virtual` (already a dep at
  `package.json:22`).
- **Option B** — copy the v0.9.4 reference implementations from glass-ui
  history into the consumer source tree.

**Chosen — Option B (copy reference).** Rationale:

1. The existing consumer surface uses `useWindowedStore`'s precise contract
   — `appendIfCurrent`, `generation`, `windowStart`, `set(replace=false)`,
   `prepend(items, newWindowStart)` — bound to Pinia store internals in
   `src/stores/search/modes/wordlist.ts:90-95` (wordlist mode store) plus
   `useVirtualSectionWindow`'s `measureSection` + `ensureTargetWindow`
   provide-injected into the definition view at
   `src/components/custom/definition/components/content/DefinitionContentView.vue:223-244`.
2. Substituting `@tanstack/vue-virtual` would require a wholesale rewrite
   of the store's append/prepend/reset semantics (generation-token race
   protection, sliding-window LRU eviction) and the definition view's
   warm-target window protocol — substantially more work than V0 scope,
   and would risk regressing the streaming-aware `appendIfCurrent` logic
   that powers concurrent search/wordlist fetches.
3. Per MIGRATION.md §3.2-3.4, the v0.9.4 reference files are pure (no
   glass-ui-private dependencies; vueuse-free). Verified via
   `rg '@vueuse' <files>` — zero matches.
4. The consumer already has a `src/composables/virtual/` directory housing
   a project-specific `useVirtualGrid` (`@tanstack/vue-virtual` wrapper for
   the wordlist grid view) — the idiomatic home for the section-window
   reference impls. V3 (NO legacy code): the three files were transposed
   verbatim, not re-aliased; co-located with `useVirtualGrid` under
   `src/composables/virtual/`; the package barrel re-exports them under
   the same `@/composables/virtual` consumer path.

The existing `@tanstack/vue-virtual` adoption remains for the wordlist
grid view (already wired); the section-window primitives compose
side-by-side, not by replacement.

### bbnf-buddy — choice rationale

Dispatch claimed 2 retired-subpath imports per the Rα §A.5 audit plan.
Reverified at HEAD: `rg '@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)' src/`
returns ZERO matches. The plan was incorrect; nothing to migrate on the
retired-subpath axis.

Two `useGlobalDark` root-barrel imports were migrated to
`@mkbabb/glass-ui/dark` per MIGRATION.md §1.3 / L invariant 6:
`src/main.ts:3` and `src/components/CodeEditor.vue:20`.

A third `useGlobalDark` root-barrel import at
`src/editor/components/SettingsPanel.vue:13` falls inside a `SettingsPanel`
that also imports `DarkModeToggle` from the root barrel — both belong to
the broader bbnf-buddy v1.0 root-barrel-curation drift documented under §
Open questions and NOT migrated here (separate import-statement context
would require simultaneous `DarkModeToggle` → `/controls` migration, which
fans out into ~14 other unrelated drift sites). Out of M.W0 Lane III
scope.

### words/frontend symlink fix

The pin at `package.json:18` was `"@mkbabb/glass-ui": "file:./glass-ui"`,
pointing to a non-existent path at the words/frontend root (no symlink, no
checkout directory). Re-pointed to `"file:../../glass-ui"` — the canonical
relative path from `words/frontend/` to `Programming/glass-ui/`. `words/`
is an npm workspace (`words/package.json` declares `"workspaces":
["frontend"]`), so npm hoists deps to `/Users/mkbabb/Programming/words/node_modules/`
and creates the package symlink there. Post-fix verification:
`words/node_modules/@mkbabb/glass-ui -> ../../../glass-ui` (target =
`Programming/glass-ui/` = the live source).

No broken symlink file existed at `words/frontend/glass-ui` to remove —
only the package.json pin was stale.

---

## File changes summary

| Repo | Path | Change |
|------|------|--------|
| words/frontend | `package.json` | pin `@mkbabb/glass-ui` `file:./glass-ui` → `file:../../glass-ui` |
| words/frontend | `src/App.vue` | split `useGlobalDark` to `/dark` |
| words/frontend | `src/composables/useStateSync.ts` | `useGlobalDark` → `/dark` |
| words/frontend | `src/composables/virtual/useVirtualSectionWindow.ts` | NEW — verbatim transpose from glass-ui v0.9.4 |
| words/frontend | `src/composables/virtual/useWindowedStore.ts` | NEW — verbatim transpose from glass-ui v0.9.4 |
| words/frontend | `src/composables/virtual/virtualSectionLayout.ts` | NEW — verbatim transpose from glass-ui v0.9.4 |
| words/frontend | `src/composables/virtual/index.ts` | re-export the 3 transposed surfaces alongside existing `useVirtualGrid` |
| words/frontend | `src/stores/search/modes/wordlist.ts` | `useWindowedStore` import: `@mkbabb/glass-ui/virtual` → `@/composables/virtual` |
| words/frontend | `src/components/custom/definition/composables/flattenDefinitions.ts` | `type FlatSection`: `@mkbabb/glass-ui/virtual` → `@/composables/virtual` |
| words/frontend | `src/components/custom/definition/components/content/DefinitionContentView.vue` | `useVirtualSectionWindow`: `@mkbabb/glass-ui/virtual` → `@/composables/virtual` |
| words/frontend | `src/components/custom/definition/components/media/ImageCarousel.vue` | Carousel + `CarouselApi`: root → `/carousel` (see § Open questions — `Carousel*` components are NOT actually exported from `/carousel`; glass-ui v1.0 defect) |
| words/frontend | `src/components/custom/search/components/ExpandModal.vue` | split `Textarea` to `/forms` |
| words/frontend | `src/components/custom/wordlist/WordlistTargetForm.vue` | split `Input` to `/forms` |
| words/frontend | `src/components/custom/wordlist/modals/CreateWordListModal.vue` | split `Input` to `/forms` |
| words/frontend | `src/components/custom/wordlist/modals/EditWordlistModal.vue` | split `Input` + `Textarea` to `/forms` |
| words/frontend | `src/components/custom/wordlist/modals/EditWordNotesModal.vue` | split `Textarea` to `/forms` |
| bbnf-buddy | `src/main.ts` | `useGlobalDark`: root → `/dark` |
| bbnf-buddy | `src/components/CodeEditor.vue` | `useGlobalDark`: root → `/dark` |

Other files in `git status` output (words/frontend ~20 files; bbnf-buddy
~18 files) are pre-existing dirty state from prior agents and NOT touched
by this lane.

---

## Verification

### Retired-subpath sweep (final, post-migration)

```
$ rg -n '@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)' \
    /Users/mkbabb/Programming/words/frontend/src/
(no matches; exit 1)

$ rg -n '@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)' \
    /Users/mkbabb/Programming/bbnf-buddy/src/
(no matches; exit 1)
```

Zero retired-subpath imports across both consumers — primary lane goal met.

### Root-barrel retired-symbol sweep (final)

```
$ rg -n '"@mkbabb/glass-ui"' /Users/mkbabb/Programming/words/frontend/src/ \
    | rg '(Input|Textarea|Combobox|Carousel|useGlobalDark|useKeyboardShortcuts|registerShortcut|formatCombo|useRegisteredShortcuts)'
(no matches)

$ rg -n '"@mkbabb/glass-ui"' /Users/mkbabb/Programming/bbnf-buddy/src/ \
    | rg '(Input|Textarea|Combobox|Carousel|useGlobalDark|useKeyboardShortcuts|registerShortcut|formatCombo|useRegisteredShortcuts)'
(no matches in src/main.ts or src/components/CodeEditor.vue — the 2 sites
migrated; SettingsPanel.vue is part of broader root-barrel drift — see
§ Open questions)
```

NOTE: bbnf-buddy `src/editor/components/SettingsPanel.vue:13` still has
`useGlobalDark` from root barrel, but only as part of a multi-symbol import
that also includes `DarkModeToggle` (not on root barrel at v1.0). Splitting
just `useGlobalDark` would leave the file in a broken state — must be done
in tandem with `DarkModeToggle` → `/controls` and other Dock/Sortable/Tabs
migrations. Documented as out-of-scope.

### words/frontend — `npm install`

```
$ cd /Users/mkbabb/Programming/words/frontend && npm install
added 117 packages, and audited 523 packages in 5s
(exit 0)
```

Workspace-hoisted symlink verified post-install:

```
$ ls -la /Users/mkbabb/Programming/words/node_modules/@mkbabb/glass-ui
lrwxr-xr-x  ... @mkbabb/glass-ui -> ../../../glass-ui
```

### words/frontend — `npm run type-check`

```
$ cd /Users/mkbabb/Programming/words/frontend && npm run type-check
(exit 2 — FAIL)
```

Errors:

| Error | Source | Cause |
|-------|--------|-------|
| `ImageCarousel.vue(84,5): error TS2305: Module '"@mkbabb/glass-ui/carousel"' has no exported member 'Carousel'.` (and 4 sibling Carousel components) | glass-ui v1.0 packaging defect — see § Open questions | **glass-ui bug** |
| `ActionButton.vue(34,73): error TS2769: '"glass-subtle"' is not assignable to 'ButtonVariants'.` | words/frontend HEAD (pre-existing) | NOT touched by M.W0 Lane III |
| `SearchControls.vue(71,37): error TS2322: Type '"glass-subtle"' is not assignable to 'ButtonVariants'.` | words/frontend HEAD (pre-existing) | NOT touched by M.W0 Lane III |
| `SearchInputActions.vue(42,18): error TS2322: Type '"ai" \| "glass-subtle"' is not assignable to 'ButtonVariants'.` | words/frontend HEAD (pre-existing) | NOT touched by M.W0 Lane III |

The `glass-subtle` button-variant errors verified pre-existing via
`git log --oneline -- <file>` (all three files unchanged in M.W0 Lane III).
These reflect words/frontend referencing a button variant
(`glass-subtle`) that does not exist in glass-ui v1.0
(`buttonVariants` enumerated in CLAUDE.md:284 — `default`,
`primary-audacious`, `destructive`, `outline`, `secondary`, `accent`,
`ghost`, `glass`, `glass-wash`, `ai`, `link`).

### words/frontend — `npm run build`

```
$ cd /Users/mkbabb/Programming/words/frontend && npm run build
(exit 2 — FAIL; same vue-tsc errors as type-check; build script chains
`vue-tsc --noEmit && vite build`)
```

### bbnf-buddy — `npm install`

```
$ cd /Users/mkbabb/Programming/bbnf-buddy && npm install
added 70 packages, and audited 230 packages in 4s
(exit 0)
```

(Lockfile staleness ` 0.3.0 → 1.0.3` for glass-ui — pre-existing; npm
install just refreshed it.)

### bbnf-buddy — `npm run typecheck`

```
$ cd /Users/mkbabb/Programming/bbnf-buddy && npm run typecheck
(exit 2 — FAIL)
```

24 errors, NONE from this lane. All errors are pre-existing v1.0
root-barrel-curation drift:

- `'@mkbabb/glass-ui' has no exported member` — `GlassDock` (2 sites),
  `DockIconButton` (6 sites), `DockDropdownTrigger` (3 sites), `BouncyTabs`,
  `ScrollArea`, `ToggleChip` (2 sites), `SortableList` (2 sites),
  `SortableItem` (2 sites), `SortableHandle` (2 sites), `DarkModeToggle`,
  `useGlobalDark` (SettingsPanel only)
- `'@mkbabb/glass-ui' has no exported member 'useLeaveTimer'` — NOT a
  glass-ui symbol at any version (per
  `rg 'useLeaveTimer' /Users/mkbabb/Programming/glass-ui/src/` — zero
  matches). bbnf-buddy-internal phantom dep.
- `src/composables/wasm/morph.ts(177,9)` — non-glass-ui-related TS error
  in WASM type bindings.

### bbnf-buddy — `npm run build`

```
$ cd /Users/mkbabb/Programming/bbnf-buddy && npm run build
✗ Build failed in 4.39s
error during build:
src/components/EmotionStateSelect.vue: "ToggleChip" is not exported by
"../glass-ui/dist/glass-ui.js"
(exit 1 — FAIL; pre-existing root-barrel drift)
```

Both build failures are pre-existing — same root cause as the typecheck
errors above. No regression introduced by M.W0 Lane III.

---

## Open questions for orchestrator

### Q1 — glass-ui v1.0 packaging defect: Carousel components have no public path

MIGRATION.md §1.2 claims:

> Carousel → /carousel
> Affected symbols: Carousel, CarouselContent, CarouselDots, CarouselItem,
> CarouselNext, CarouselPager, CarouselPrevious, GlassCarouselPager,
> useCarousel, type CarouselApi.

Runtime verification at HEAD (`/Users/mkbabb/Programming/glass-ui/src/carousel.ts`):

```ts
export { useCarousel } from "./components/ui/carousel/useCarousel";
export type { CarouselApi } from "./components/ui/carousel";
```

Only `useCarousel` and `CarouselApi` are exposed on `/carousel`. The
component family (`Carousel`, `CarouselContent`, `CarouselItem`,
`CarouselNext`, `CarouselPrevious`, `CarouselDots`, `CarouselPager`,
`GlassCarouselPager`) lives in `src/components/ui/carousel/index.ts`
but is NOT re-exported on any v1.0 public subpath. Root-barrel runtime
probe (`node -e "import('@mkbabb/glass-ui').then(m => 'Carousel' in m)"`)
returns `false` — confirms the components are unreachable at v1.0 via
either root barrel or `/carousel`.

The migration of ImageCarousel.vue to `/carousel` is what MIGRATION.md
prescribes; the fact that it doesn't resolve is a glass-ui-side defect
(missing re-exports in `src/carousel.ts`). Two possible orchestrator
remediation paths:

1. **Fix in glass-ui** (out of M.W0 Lane III scope): add
   `export { Carousel, CarouselContent, CarouselDots, CarouselItem,
   CarouselNext, CarouselPager, CarouselPrevious, GlassCarouselPager }
   from "./components/ui/carousel";` to `src/carousel.ts` and rebuild.
   Aligns implementation with MIGRATION.md §1.2.
2. **Update MIGRATION.md + retire Carousel components from public surface**
   — if the intent was to expose only `useCarousel` + `CarouselApi` (and
   route Carousel composition through `<GlassCarousel>` from
   `/glass-carousel`), update MIGRATION.md to drop the component list and
   document the substitution path. Consumers using base Carousel components
   (words/frontend ImageCarousel.vue) would migrate to `<GlassCarousel>` or
   embla-carousel-vue directly.

ImageCarousel.vue currently imports from `/carousel` (the canonical path
per the migration doc); it fails typecheck + build until glass-ui ships
the missing re-exports OR ImageCarousel.vue is rewritten to a different
substrate.

### Q2 — bbnf-buddy broader v1.0 root-barrel drift (pre-existing)

bbnf-buddy carries ~14 root-barrel imports of symbols that retired from
the root barrel at v1.0:

- Dock substrate (`/dock`): `GlassDock`, `DockIconButton`,
  `DockDropdownTrigger` — ~12 sites across `src/editor/components/dock/`.
- Tabs substrate (`/tabs`): `BouncyTabs` (EditorPanel.vue).
- Sortable substrate (`/sortable-list`): `SortableList`, `SortableItem`,
  `SortableHandle` — 2 files (BehaviorsEditor.vue, LayersPanel/LayerRow.vue,
  LayersPanel.vue).
- Toggle-chip substrate (`/toggle-chip`): `ToggleChip` — 2 sites
  (EmotionStateSelect.vue, OffsetPicker.vue).
- Controls substrate (`/controls`): `DarkModeToggle` (SettingsPanel.vue).
- Scroll substrate: `ScrollArea` (EditorPanel.vue) — wait, this is NOT a
  glass-ui symbol at v1.0; the actual name is `ScrollPane` per the
  vue-tsc hint. bbnf-buddy is consuming a removed name.
- Pre-v1.0 phantom: `useLeaveTimer` — never a glass-ui export. bbnf-buddy
  internal dep mistake; root cause separate from v1.0.

These all fall under L invariant 6 (per-package subpath migration) but
were NOT in the M.W0 Lane III scope (specifically retired-subpath +
vueuse-bearing-root-barrel drift). Recommend a follow-up lane scoped to
"bbnf-buddy v1.0 root-barrel-to-subpath migration" if bbnf-buddy is to
build green again on glass-ui v1.0.

### Q3 — words/frontend `glass-subtle` button variant (pre-existing)

words/frontend references a `glass-subtle` button variant in 3 files
(`ActionButton.vue`, `SearchControls.vue`, `SearchInputActions.vue`) that
does NOT exist in glass-ui v1.0's `buttonVariants` CVA. Either:

1. words/frontend adds a local CVA extension that augments the
   ButtonVariants union with `glass-subtle` + `danger-subtle`, or
2. glass-ui adds those variants to its canonical CVA (would require
   design review per the M-tranche button audit).

Out of M.W0 Lane III scope — flagged here for orchestrator triage.

---

## Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/words/frontend status --short -- .
 M package.json
 M src/App.vue
 M src/components/custom/definition/components/AnimatedTitle.vue           [pre-existing]
 M src/components/custom/definition/components/ThemeSelector.vue           [pre-existing]
 M src/components/custom/definition/components/WordHeader.vue              [pre-existing]
 M src/components/custom/definition/components/content/DefinitionContentView.vue
 M src/components/custom/definition/components/media/ImageCarousel.vue
 M src/components/custom/definition/components/metadata/ProviderIcons.vue  [pre-existing]
 M src/components/custom/definition/composables/flattenDefinitions.ts
 M src/components/custom/navigation/ProgressiveSidebar.vue                 [pre-existing]
 M src/components/custom/navigation/composables/useSidebarState.ts         [pre-existing]
 M src/components/custom/search/SearchBar.vue                              [pre-existing]
 M src/components/custom/search/components/ExpandModal.vue
 M src/components/custom/search/components/controls/LookupControlsPanel.vue [pre-existing]
 M src/components/custom/search/components/controls/WordlistControlsPanel.vue [pre-existing]
 M src/components/custom/search/composables/useSearchBarScroll.ts          [pre-existing]
 M src/components/custom/search/utils/scroll.ts                            [pre-existing]
 M src/components/custom/sidebar/SidebarContent.vue                        [pre-existing]
 M src/components/custom/sidebar/SidebarHeader.vue                         [pre-existing]
 M src/components/custom/sidebar/SidebarWordListItem.vue                   [pre-existing]
 M src/components/custom/sidebar/SidebarWordListView.vue                   [pre-existing]
 M src/components/custom/wordlist/WordlistTargetForm.vue
 M src/components/custom/wordlist/modals/CreateWordListModal.vue
 M src/components/custom/wordlist/modals/EditWordNotesModal.vue
 M src/components/custom/wordlist/modals/EditWordlistModal.vue
 M src/components/custom/wordlist/views/WordListView.vue                   [pre-existing]
 M src/components/custom/wordlist/views/WordlistDashboard.vue              [pre-existing]
 M src/composables/useStateSync.ts
 M src/composables/virtual/index.ts
 M src/stores/search/modes/wordlist.ts
 M src/styles/ios-pwa.css                                                  [pre-existing]
?? src/composables/virtual/useVirtualSectionWindow.ts                      [NEW]
?? src/composables/virtual/useWindowedStore.ts                             [NEW]
?? src/composables/virtual/virtualSectionLayout.ts                         [NEW]

$ git -C /Users/mkbabb/Programming/bbnf-buddy status --short
 M package-lock.json    [npm install refreshed glass-ui pin metadata; pre-existing staleness]
 M src/App.vue                                                            [pre-existing]
 M src/components/CodeEditor.vue
 M src/editor/components/BehaviorsEditor.vue                              [pre-existing]
 M src/editor/components/BodyEditor.vue                                   [pre-existing]
 M src/editor/components/EditorPanel.vue                                  [pre-existing]
 M src/editor/components/OffsetEditor/OffsetEditor.vue                    [pre-existing]
 M src/editor/components/animation/EasingSelect.vue                       [pre-existing]
 M src/editor/components/dock/BottomDock.vue                              [pre-existing]
 M src/editor/components/dock/DockAnimationTimeline.vue                   [pre-existing]
 M src/editor/components/dock/DockNavigation.vue                          [pre-existing]
 M src/editor/components/dock/DockPoses/PoseActionsPopover.vue            [pre-existing]
 M src/editor/components/dock/DockPoses/SnapshotPopover.vue               [pre-existing]
 M src/editor/components/dock/DockUndoRedo.vue                            [pre-existing]
 M src/editor/components/dock/DockViewControls.vue                        [pre-existing]
 M src/editor/components/dock/FormPicker.vue                              [pre-existing]
 M src/editor/components/dock/tools/AlignDerivativesButton.vue            [pre-existing]
 M src/editor/components/dock/tools/MagnetToolButton.vue                  [pre-existing]
 M src/editor/components/dock/tools/ToolsLayer.vue                        [pre-existing]
 M src/main.ts
 M src/poses/css.ts                                                       [pre-existing]
 M src/styles/utilities.css                                               [pre-existing]

$ git -C /Users/mkbabb/Programming/glass-ui status --short
 ? docs/precepts
?? docs/tranches/M/audit/
```

Glass-ui worktree shows only the M-tranche audit directory plus a
docs/precepts notation — no `src/` or `docs/precepts/` modifications.
The proof doc itself is the only artefact this lane writes inside glass-ui
(per the dispatch's MAY-CREATE clause).

[pre-existing] tags identify files modified prior to M.W0 Lane III dispatch
(verified via `git diff HEAD -- <file>` showing the file had pending diff
before this lane's first edit). The lane's strict scope is files marked
without that tag, plus the three NEW transposed files.
