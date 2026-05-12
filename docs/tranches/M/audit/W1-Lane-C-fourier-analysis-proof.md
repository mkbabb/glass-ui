# M.W1 Lane C — fourier-analysis/web v1.0 standardization sweep proof

## § Disposition

- **Entry state**: fourier-analysis parent repo dirty with substantial in-flight v1.0
  migration work (74 `web/` paths touched: 38 modified + 36 deleted, plus 2 added in
  the API+nginx+infra layer that are out of scope). Web subdir already on glass-ui
  v1.0.4 (symlinked to `../../../../glass-ui`). M.W0 Lane IV had previously absorbed
  `useOffsetPagination` (2× call sites + 1× local fork at
  `web/src/composables/useOffsetPagination.ts`) and migrated `useGlobalDark` to the
  flat `/dark` subpath. The user had additionally completed an ambitious in-flight
  consolidation, deleting most local `web/src/components/ui/*` copies in favor of
  glass-ui adoption.
- **Final state**: PASS. All retired-symbol grep checks return 0 hits. All vueuse-bearing
  imports are on flat subpaths. DockPopover sites swapped to `HoverPopover` (4 sites
  across 2 files). Typecheck PASS. Build PASS in 3.76s.

## § Pre-lane state

### Glass-ui resolution
- `web/package.json` pins `"@mkbabb/glass-ui": "file:../../glass-ui"`.
- `web/node_modules/@mkbabb/glass-ui/package.json` resolves to **v1.0.4**.
- Peer-dep coherence (all installed): vue **3.5.30**, tailwindcss **4.2.1**, reka-ui **2.9.2**, @vueuse/core **14.2.1**. All ≥ minimum.

### Root-barrel imports surveyed (post-W0)

Eight call sites import from the `@mkbabb/glass-ui` root barrel. All are vueuse-FREE
per L invariant 6 (no `Input`/`Textarea`/`Combobox*`/`Carousel*`/`useCarousel`/`useGlobalDark`/keyboard symbols on root). Symbol breakdown:

| File | Symbols | vueuse-bearing? |
|---|---|---|
| `web/src/App.vue` | `TooltipProvider`, `Toaster` | no |
| `web/src/composables/useToast.ts` | `toast`, `useToast`, `type ToastVariant` | no |
| `web/src/components/layout/AppHeader.vue` | `DropdownMenu*`, `HoverCard*` | no |
| `web/src/components/morph/MorphPhaseConfig.vue` | `Select*` | no |
| `web/src/components/ui/tooltip/Tooltip.vue` | `Tooltip`, `TooltipTrigger`, `TooltipContent` | no |
| `web/src/components/visualization/SpeedSelect.vue` | `Select*` | no |
| `web/src/components/visualization/ContourSettings.vue` | `Collapsible*`, `Select*` | no |
| `web/src/components/visualization/gallery/GallerySearchBar.vue` | `Select*` | no |

No migration required for any root-barrel call site.

### Already-on-subpath imports (correct shape, no change needed)

- `useGlobalDark` from `@mkbabb/glass-ui/dark` (1× site — DarkModeToggle.vue; W0 Lane IV).
- `UnderlineTabs` from `@mkbabb/glass-ui/tabs` (3× sites — EquationView, GalleryView, VisualizationView).
- `GlassDock` / `DockIconButton` from `@mkbabb/glass-ui/dock` (3× sites).
- `InfiniteScroll` from `@mkbabb/glass-ui/infinite-scroll` (1× site — GalleryInfiniteGrid.vue).

### DockPopover sites pending swap (4× across 2 files)

- `web/src/components/visualization/CanvasControlsDock.vue` — 1× (view options popover).
- `web/src/components/visualization/EditorControlsDock.vue` — 3× (magnet slider, overlay stack; 2 visible at template + 1 already-deleted local file).

The local `web/src/components/visualization/DockPopover.vue` was already in the deleted
set at HEAD (pre-Lane), confirming the user's trajectory of removing the local fork in
favor of upstream. glass-ui v1.0 ships `HoverPopover` (reka-ui `HoverCard`-backed) as
the canonical hover-triggered floating-label primitive; `direction="up|down"` maps to
`side="top|bottom"` with `align="center"` and `keep-dock-open` for parent-dock interop.

### Retired-symbol final-verify (pre-Lane grep)

- `@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)` → 0 hits in `web/src/` (W0 cleared).
- `useOffsetPagination` → 2 call sites consume the local fork via `@/composables/useOffsetPagination` (no glass-ui import).
- `useVirtualSectionWindow` → 1 call site at `PaperView.vue:10` consumes it from `@mkbabb/latex-paper/vue` (NOT glass-ui — unrelated to v1.0 retirement; latex-paper still exports it).

### Deleted-files context (pre-Lane)

The dirty status shows the user had completed an aggressive in-flight consolidation
prior to Lane C:

- `web/src/components/ui/{BouncyToggle,GlassDock,UnderlineTabs,ToastContainer}.vue` deleted (local-copy → glass-ui adoption).
- `web/src/components/ui/{collapsible,select,slider}/` directories deleted (same).
- `web/src/components/visualization/DockPopover.vue` deleted (pre-empted Lane C swap).
- `web/src/components/visualization/lib/dock-buttons.css` deleted.
- `web/src/composables/useDockState.ts` deleted (now consumed via glass-ui's dock substrate).
- Auth-related local composables (`useAdminAuth`, `useSession`, `useUserAuth`) deleted.

Lane C composes ON TOP of this in-flight work, completing only the DockPopover → HoverPopover swap that remained at HEAD.

## § File changes summary (Lane C edits)

| File | Action | Lane delta |
|---|---|---|
| `web/src/components/visualization/CanvasControlsDock.vue` | MODIFIED | Swap `DockPopover direction="up"` (1×) → `HoverPopover side="top" align="center" keep-dock-open`. Trigger wrapped in `<DockIconButton class="view-btn-wrap">`. Body content moved into `#content` slot. Import line: drop `DockPopover`, add `HoverPopover` from `@mkbabb/glass-ui/hover-popover`. |
| `web/src/components/visualization/EditorControlsDock.vue` | MODIFIED | Swap `DockPopover direction="up"` (2×: magnet slider, overlay stack) → `HoverPopover side="top" align="center" keep-dock-open`. Raw `<Magnet :size="20" />` + `<Eye :size="20" />` triggers wrapped in `<DockIconButton aria-label="…">` per HoverPopover's `as-child` trigger contract. Body content moved into `#content` slot. Import line: drop `DockPopover`, add `HoverPopover` from `@mkbabb/glass-ui/hover-popover`. |

Lane C touched only those 2 files. All other modified/deleted paths in `web/` belong to the
user's pre-existing in-flight work (see Pre-lane § "Deleted-files context"); Lane C did
not edit them.

## § Cross-cutting duplication disposition

| Local artefact | Status | Disposition | Rationale |
|---|---|---|---|
| `web/src/composables/useOffsetPagination.ts` | KEEP-AS-IS | Local consumer-owned fork | Per MIGRATION.md §3.1 — glass-ui v1.0 retired the substrate (0 production consumers across the constellation). Local fork is the canonical migration. File header comment cites the rationale. 2 call sites (`AdminFlaggedPanel`, `AdminUserList`). |
| `web/src/components/ui/tooltip/Tooltip.vue` | KEEP-AS-IS | Local DOMAIN-SPECIFIC shim | Wraps the 3 glass-ui Tooltip primitives (`Tooltip` + `TooltipTrigger` + `TooltipContent`) behind a single-component API (`<Tooltip text="…" side="…">`). Repository-wide usage idiom (~10+ call sites). Different shape from glass-ui — no library equivalent. |
| `web/src/components/ui/CollapsibleSection.vue` | KEEP-AS-IS | Local DOMAIN-SPECIFIC shim | Composes glass-ui `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent` with title/subtitle + scroll-into-view behavior on open. Library Collapsible is a primitive; this is a sectioned-card wrapper. |
| `web/src/components/ui/SliderControl.vue` | DOCUMENT-AS-DIFFERENT | Domain-specific glass-track slider | NOT a glass-ui Slider equivalent. Custom glass-track render with inline number input + dock-keep-open integration via `inject("dockKeepOpen"/"dockRelease")`. The library `Slider` primitive (reka-ui SliderRoot wrapper) is the standard scrub control; this is the timeline-tier visual variant the consumer needs. |
| `web/src/components/ui/PathPreview.vue` | KEEP-AS-IS (out-of-scope for Lane C) | Domain-specific contour-path preview | No glass-ui equivalent; SVG path renderer for contour data. |
| `web/src/components/visualization/GlassTimeline.vue` | DOCUMENT-AS-DIFFERENT | Domain-specific timeline | Different shape from glass-ui's `<GlassTimeline>` (live audio-visualization waveform-strip vs. glass-ui's generic timeline primitive). Same name, different substrate. Not a candidate for elevation. |

No new ELEVATE-via-glass-ui-subpath candidates were identified for Lane C scope.

## § Verification

### Final-grep checks (MIGRATION.md verification checklist)

```bash
# 1. No root-barrel imports of moved symbols
$ rg 'from "@mkbabb/glass-ui"' web/src/ | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
(no output — exit 1)

# 2. No retired nested subpath imports
$ rg '"@mkbabb/glass-ui/composables/(dark|keyboard)"' web/src/
(no output — exit 1)

# 3. No retired composable imports (live)
$ rg -n '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow)\b' web/src/
# Live hits: only the local fork file at `composables/useOffsetPagination.ts` (legitimate
# consumer-owned fork per MIGRATION.md §3.1) + 2 call sites consuming THAT fork via
# `@/composables/useOffsetPagination` (NOT @mkbabb/glass-ui). Zero glass-ui imports.
# PaperView.vue's `useVirtualSectionWindow` comes from `@mkbabb/latex-paper/vue` — NOT
# glass-ui. Out of scope.

# 4. No retired subpath imports
$ rg '"@mkbabb/glass-ui/(pagination|virtual)"' web/src/
(no output — exit 1)

# 5. No DockPopover references
$ rg -n 'DockPopover' web/src/
(no output — exit 1)
```

All five grep checks PASS.

### Build / typecheck

```bash
$ cd web && npx vue-tsc --noEmit
EXIT=0

$ cd web && npm run build
vite v7.3.1 building client environment for production...
✓ 4801 modules transformed.
…
dist/index-UfDvViTd.js   923.78 kB │ gzip: 371.25 kB
✓ built in 3.76s
EXIT=0
```

Note: the chunk-size-warning + the pre-existing `bg-[var(...)]` CSS warning are NOT
Lane-C-introduced — they are inherited from the consumer's existing Vue/Tailwind code
in unrelated files. No `--no-verify`, no bypass.

### v1.0-surface compliance grep

```bash
$ rg -n 'from "@mkbabb/glass-ui' web/src/ | sort -u
```

8 root-barrel sites (all vueuse-FREE), 3× `/dock`, 3× `/tabs`, 1× `/dark`, 1× `/infinite-scroll`, 2× `/hover-popover` (NEW — Lane C). All on canonical v1.0 subpaths.

## § Open questions for orchestrator

None — the lane closed cleanly.

Two contextual notes (not blockers):

1. The dirty state in `web/` is dominated by the user's pre-existing in-flight
   consolidation (deleting local `ui/*` copies in favor of glass-ui). Lane C
   composed two surgical DockPopover→HoverPopover edits on top of that surface
   without touching the broader trajectory. If the orchestrator wants the lane
   commit to be ATOMIC (only Lane C changes), the commit hook will need to
   include only `web/src/components/visualization/{Canvas,Editor}ControlsDock.vue`
   plus the deleted `web/src/components/visualization/DockPopover.vue` (which
   was already in the deleted set pre-Lane but is the natural pair of the swap).

2. `web/src/components/visualization/GlassTimeline.vue` collides on name with
   glass-ui's `<GlassTimeline>` primitive but is a different substrate (live
   audio-visualization waveform-strip vs. generic event timeline). Not a Lane C
   concern; flagged as a future naming-collision discussion.

## § Worktree diff verification (web/ paths only)

`git -C /Users/mkbabb/Programming/fourier-analysis status --short` (filtered to `web/` paths):

```
 M web/index.html                                                       (pre-Lane)
 M web/src/App.vue                                                      (pre-Lane)
 D web/src/components/FourierMorphDemo.vue                              (pre-Lane)
 D web/src/components/FourierShapeExtractor.vue                         (pre-Lane)
 M web/src/components/decorative/FourierMorphSvg.vue                    (pre-Lane)
 M web/src/components/equation/ConvergencePlot.vue                      (pre-Lane)
 M web/src/components/equation/EqCoefficientsPanel.vue                  (pre-Lane)
 M web/src/components/equation/EquationModeToggle.vue                   (pre-Lane)
 M web/src/components/equation/EquationResult.vue                       (pre-Lane)
 M web/src/components/equation/EquationView.vue                         (pre-Lane)
 M web/src/components/equation/FrequencyGraph.vue                       (pre-Lane)
 M web/src/components/equation/FunctionInput.vue                        (pre-Lane)
 M web/src/components/layout/AppHeader.vue                              (pre-Lane)
 M web/src/components/layout/DarkModeToggle.vue                         (pre-Lane W0 Lane IV)
 D web/src/components/layout/composables/useHoverCard.ts                (pre-Lane)
 M web/src/components/morph/HarmonicLevelGrid.vue                       (pre-Lane)
 M web/src/components/morph/MorphPhaseConfig.vue                        (pre-Lane)
 M web/src/components/paper/MobileFloatingToc.vue                       (pre-Lane)
 M web/src/components/paper/PaperArticleWindow.vue                      (pre-Lane)
 M web/src/components/paper/PaperSearch.vue                             (pre-Lane)
 M web/src/components/paper/PaperSidebar.vue                            (pre-Lane)
 M web/src/components/paper/PaperView.vue                               (pre-Lane)
 D web/src/components/paper/paperSearchIndex.ts                         (pre-Lane)
 D web/src/components/paper/usePaperSearch.ts                           (pre-Lane)
 D web/src/components/ui/BouncyToggle.vue                               (pre-Lane consolidation)
 D web/src/components/ui/GlassDock.vue                                  (pre-Lane consolidation)
 M web/src/components/ui/SliderControl.vue                              (pre-Lane)
 D web/src/components/ui/ToastContainer.vue                             (pre-Lane consolidation)
 D web/src/components/ui/UnderlineTabs.vue                              (pre-Lane consolidation)
 D web/src/components/ui/collapsible/...                                (pre-Lane consolidation)
 D web/src/components/ui/select/...                                     (pre-Lane consolidation)
 D web/src/components/ui/slider/...                                     (pre-Lane consolidation)
 M web/src/components/ui/tooltip/Tooltip.vue                            (pre-Lane)
 M web/src/components/visualization/AnimationControls.vue               (pre-Lane)
 M web/src/components/visualization/BasisSelector.vue                   (pre-Lane)
 M web/src/components/visualization/CanvasControlsDock.vue              (LANE C — DockPopover→HoverPopover)
 M web/src/components/visualization/CoefficientsPanel.vue               (pre-Lane)
 M web/src/components/visualization/ContourEditorCanvas.vue             (pre-Lane)
 M web/src/components/visualization/ContourPreview.vue                  (pre-Lane)
 M web/src/components/visualization/ContourSettings.vue                 (pre-Lane)
 D web/src/components/visualization/DockPopover.vue                     (pre-Lane consolidation; natural pair of Lane C swap)
 M web/src/components/visualization/EasingPicker.vue                    (pre-Lane)
 M web/src/components/visualization/EditorControlsDock.vue              (LANE C — DockPopover→HoverPopover)
 M web/src/components/visualization/EditorToolsPanel.vue                (pre-Lane)
 M web/src/components/visualization/EquationPanel.vue                   (pre-Lane)
 M web/src/components/visualization/ExportModal.vue                     (pre-Lane)
 M web/src/components/visualization/FullscreenViewer.vue                (pre-Lane)
 M web/src/components/visualization/GalleryView.vue                     (pre-Lane)
 M web/src/components/visualization/GlassTimeline.vue                   (pre-Lane)
 M web/src/components/visualization/ImageUpload.vue                     (pre-Lane)
 M web/src/components/visualization/SpeedSelect.vue                     (pre-Lane)
 M web/src/components/visualization/VisualizationView.vue               (pre-Lane)
 M web/src/components/visualization/gallery/GalleryCard.vue             (pre-Lane)
 M web/src/components/visualization/gallery/GalleryCardModal.vue        (pre-Lane)
 M web/src/components/visualization/gallery/GalleryFeaturedCarousel.vue (pre-Lane)
 M web/src/components/visualization/gallery/GalleryGrid.vue             (pre-Lane)
 M web/src/components/visualization/gallery/GallerySearchBar.vue        (pre-Lane)
 M web/src/components/visualization/gallery/UserSlugBar.vue             (pre-Lane)
 D web/src/components/visualization/lib/dock-buttons.css                (pre-Lane consolidation)
 D web/src/composables/useAdminAuth.ts                                  (pre-Lane)
 D web/src/composables/useDockState.ts                                  (pre-Lane consolidation)
 M web/src/composables/useMorphConfig.ts                                (pre-Lane)
 D web/src/composables/useSession.ts                                    (pre-Lane)
 M web/src/composables/useToast.ts                                      (pre-Lane W0)
 D web/src/composables/useUserAuth.ts                                   (pre-Lane)
 M web/src/lib/api.ts                                                   (pre-Lane)
 M web/src/lib/types.ts                                                 (pre-Lane)
 D web/src/lib/utils.ts                                                 (pre-Lane)
 M web/src/router/index.ts                                              (pre-Lane)
 M web/src/stores/gallery.ts                                            (pre-Lane)
 M web/src/style.css                                                    (pre-Lane)
 M web/tsconfig.tsbuildinfo                                             (build artefact)
```

Parent-repo's `api/`, `nginx/`, `docker-compose*`, `.env*`, `DESIGN.md`, `scripts/dev.sh`,
and `docs/` paths are NOT Lane C scope and were not touched.
