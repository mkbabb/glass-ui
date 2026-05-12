# M.W1 Lane B — value.js v1.0 standardization sweep

**Lane**: per-consumer v1.0 standardization for value.js.
**Repo**: `/Users/mkbabb/Programming/value.js`.
**Date**: 2026-05-12.
**Operator**: cross-repo multi-writer (single-peer) on the Lane B agent dispatch.

## Disposition

PASS. value.js demo migrated to glass-ui v1.0.4 subpath shape; library
build and demo (gh-pages mode) build both green; full retired-symbol grep
is zero. Three composables that had upstream retired in glass-ui's D-II
tranche (`usePopupMutex`, `useLayerTransition`, `copyToClipboard`) were
inlined as local forks in value.js — substrate ownership now sits with
the consumer, matching the L invariant 8 substrate-without-consumer
disposition for the retired primitives.

## Pre-lane state

### Retired-subpath grep (before)

```
$ rg '@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)' /Users/mkbabb/Programming/value.js
# zero hits (value.js had never adopted the K.WS transitional subpath shape)
```

### Retired-root-barrel-symbol grep (before)

```
$ rg 'from "@mkbabb/glass-ui"' demo/ | rg '\b(Input|Textarea|Combobox|...)\b'
demo/@/components/ui/input/index.ts:     export { Input } from "@mkbabb/glass-ui";
demo/@/components/ui/textarea/index.ts:  export { Textarea } from "@mkbabb/glass-ui";
demo/@/components/custom/dark-mode-toggle/index.ts:
                                         export { DarkModeToggle, useGlobalDark } from "@mkbabb/glass-ui";
demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:
                                         (DockDropdownTrigger import — root-barrel symbol)
# 4 files
```

In addition the demo had 23 further sites importing custom-package symbols
that were NEVER on the root barrel at v1.0 (`GlassDock`, `DockIconButton`,
`DockSelectTrigger`, `DockDropdownTrigger`, `BouncyTabs`, `SearchBar`,
`ConfirmDialog`, `GlassCarousel*`, `useAurora`, `AuroraConfig`,
`useLayerTransition`, `useGlobalDark`, `DockLayer*`, `DockPopover`). These
were latent breaks that the file-link `file:../glass-ui` masked at HEAD
because the linked glass-ui repo's `dist/` was last built before the L.W1
Phase 2 root-barrel curation landed. Once tsc actually resolved through
the v1.0 dist/index.d.ts, every one of them surfaced as an
`ERR_PACKAGE_PATH_NOT_EXPORTED` or
`has no exported member named '<Symbol>'` error.

### Version-coherence snapshot

| Dep | value.js pin | resolved | gate |
|---|---|---|---|
| `@mkbabb/glass-ui` | `file:../glass-ui` | v1.0.4 (HEAD) | PASS — meets ≥ v1.0.4 |
| `vue` | `^3.5.18` | 3.5.18 | PASS — ≥ 3.5 |
| `tailwindcss` | `^4.1.11` | 4.1.11 | PASS — ≥ v4 |
| `reka-ui` | `^2.0.0` | 2.0.0 | PASS — ≥ 2.0 |
| `@vueuse/core` | `^14.2.1` | 14.2.1 | PASS — ≥ 14.0 |
| `embla-carousel-vue` | `^8.6.0` | 8.6.0 | PASS |
| `vaul-vue` | `^0.2.0` | 0.2.0 | PASS |
| `class-variance-authority` | `^0.7.1` | 0.7.1 | PASS |
| `lucide-vue-next` | `^0.525.0` | 0.525.0 | PASS |

No `package.json` changes required.

## File changes summary

### Root-barrel → subpath rewrites (mechanical L MIGRATION.md §1)

| File | Symbols moved | New subpath |
|---|---|---|
| `demo/@/components/ui/input/index.ts` | `Input` | `/forms` |
| `demo/@/components/ui/textarea/index.ts` | `Textarea` | `/forms` |
| `demo/@/components/custom/dark-mode-toggle/index.ts` | `DarkModeToggle` + `useGlobalDark` | `/controls` + `/dark` (split) |
| `demo/@/components/custom/dock/index.ts` | `GlassDock`, `DockLayerGroup`, `DockLayer` | `/dock` |
| `demo/@/components/custom/dock/Dock.vue` | `DockIconButton`, `DockSelectTrigger`, `BouncyTabs` | `/dock`, `/tabs` |
| `demo/@/components/custom/dock/layers/ActionBarLayer.vue` | `DockIconButton`; `useLayerTransition` inlined locally | `/dock` + local fork |
| `demo/@/components/custom/dock/layers/SlugEditLayer.vue` | `DockIconButton` | `/dock` |
| `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue` | `DockDropdownTrigger` | `/dock` |
| `demo/@/components/custom/generate/GenerateControls.vue` | `DockIconButton` | `/dock` |
| `demo/@/components/custom/gradient/GradientVisualizer.vue` | `DockIconButton` | `/dock` |
| `demo/@/components/custom/image-palette-extractor/ExtractControls.vue` | `DockIconButton` (`useTouchGate` stays on root) | `/dock` |
| `demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue` | `DockIconButton` | `/dock` |
| `demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue` | `DockIconButton` | `/dock` |
| `demo/@/components/custom/mix/MixResultDisplay.vue` | `DockIconButton` | `/dock` |
| `demo/@/components/custom/mix/MixSourceSelector.vue` | `BouncyTabs` | `/tabs` |
| `demo/@/components/custom/palette-browser/AdminUsersPanel.vue` | `ConfirmDialog` | `/confirm-dialog` |
| `demo/@/components/custom/palette-browser/PaletteControlsBar.vue` | `SearchBar` | `/search` |
| `demo/@/components/custom/palette-browser/PaletteDialog.vue` | `ConfirmDialog` | `/confirm-dialog` |
| `demo/@/components/custom/palette-browser/PaletteSlugBar.vue` | `SearchBar` | `/search` |
| `demo/@/components/custom/panes/AuroraPane.vue` | `GlassDock`, `AuroraConfig` | `/dock`, `/aurora` |
| `demo/@/components/custom/panes/BlobPane.vue` | `GlassDock` | `/dock` |
| `demo/@/components/custom/panes/BrowsePane.vue` | `DockIconButton` | `/dock` |
| `demo/@/components/custom/panes/PalettesPane.vue` | `ConfirmDialog` | `/confirm-dialog` |
| `demo/@/components/custom/panes/PaneSearchBar.vue` | `SearchBar` | `/search` |
| `demo/@/components/custom/panes/PaneSegmentedControl.vue` | `BouncyTabs` | `/tabs` |
| `demo/@/components/custom/color-picker/controls/ComponentSliders.vue` | `GlassCarousel`, `GlassCarouselItem` | `/glass-carousel` |
| `demo/color-picker/App.vue` | `useAurora`, `AuroraConfig` | `/aurora` |

### Local forks (consumer-owned substrate per L invariant 8)

| File | Source | Rationale |
|---|---|---|
| `demo/@/composables/useClipboard.ts` | inlined ~25 LOC (async clipboard + execCommand fallback) | `copyToClipboard` was never on the v1.0 public surface; previously was reachable only because the linked glass-ui dist still carried a stale symbol. Local fork is the canonical disposition. |
| `demo/@/components/custom/dock/composables/usePopupMutex.ts` | inlined ~80 LOC (single-open mutex with swap delay) | Retired upstream at glass-ui's D-II tranche (`H-deep-audit-ζ-cross-tranche-debt.md` enumerates the removal); demo is the lone consumer. |
| `demo/@/components/custom/dock/composables/useLayerTransition.ts` | inlined ~115 LOC with the legacy `layerProps()` API the consumer needs | Upstream still ships a `useLayerTransition` but it returns only `currentLayer` / `leavingLayer` refs; the demo's `ActionBarLayer.vue` destructures `layerProps()`. Local fork keeps the v0.9-era API the consumer was written against. |

### Dead-barrel deletions

| File | Reason |
|---|---|
| `demo/@/components/custom/dock/composables/useDockTransition.ts` | Re-export shim for `useDockTransition` — symbol retired upstream at D-II tranche; zero local consumers. |
| `demo/@/components/custom/dock/composables/useDockState.ts` | Re-export shim for `useDockState` — symbol still exists in glass-ui src but is NOT public on `/dock` (or any subpath); zero local consumers. |
| `demo/@/components/ui/scroll-area/index.ts` | Re-export shim for `ScrollArea`/`ScrollBar` — glass-ui ships `<ScrollPane>` (not the shadcn `ScrollArea` family); zero local consumers; the barrel was broken latent dead code. |

### Other repairs

| File | Change | Reason |
|---|---|---|
| `demo/@/components/custom/dock/index.ts` | dropped `DockPopover` from the re-export list | retired upstream at D-II tranche; zero local consumers. |
| `demo/@/components/ui/context-menu/index.ts` | dropped `ContextMenuGroup` + `ContextMenuSub` | never exported by glass-ui's `context-menu` package barrel; tsc surfaced the bug; zero local consumers. |
| `demo/@/components/ui/select/index.ts` | dropped `SelectItemText` | never exported by glass-ui's `select` package barrel; zero local consumers. |

## Cross-cutting duplication disposition

Audit per M.Rε §B. Default to KEEP-AS-IS or DOCUMENT-AS-DIFFERENT;
ELEVATE only on clear simplicity win.

| Surface | Glass-ui equivalent | Disposition | Rationale |
|---|---|---|---|
| `demo/@/components/ui/carousel/` (Carousel + CarouselContent + CarouselItem + CarouselPrevious + CarouselNext + useCarousel) | `@mkbabb/glass-ui/carousel` | **KEEP-AS-IS** | Local fork mirrors the canonical shadcn-vue carousel; demo composes it tightly with custom styling. Switching to glass-ui's `Carousel` family would still need a per-call-site sweep AND would couple the demo to a v1.0 vueuse-bearing subpath. No simplicity win. |
| `demo/@/components/ui/{button,card,dialog,...}/index.ts` (44 re-export barrels) | direct `@mkbabb/glass-ui` import | **KEEP-AS-IS** | Shadcn pattern — local barrels let consumers customise per-component without changing import sites. Idiomatic across the entire glass-ui ecosystem (speedtest, words, fourier all follow the same pattern). |
| `usePopupMutex` (local fork) | none (retired upstream) | **DOCUMENT-AS-DIFFERENT** | No upstream substrate; local ownership is the only path. Documented inline. |
| `useLayerTransition` (local fork with `layerProps`) | `@mkbabb/glass-ui/...` (no public subpath; src-only) | **DOCUMENT-AS-DIFFERENT** | API divergence: consumer needs the v0.9-era `layerProps()` return; upstream evolved away from it. Local fork is bounded (~115 LOC). ELEVATE rejected because re-introducing `layerProps` upstream would re-open substrate-without-consumer scope. |
| `copyToClipboard` (local) | none (never public at v1.0) | **DOCUMENT-AS-DIFFERENT** | Same disposition as `usePopupMutex`. |
| `demo/@/components/custom/dark-mode-toggle/index.ts` re-exports `DarkModeToggle` + `useGlobalDark` | `/controls` + `/dark` | **KEEP-AS-IS** | Convenience barrel that lets template authors keep one import line; the underlying subpaths are correct now. |

No ELEVATE actions taken. Lane B is strictly migration + local-fork
hygiene.

## Verification

| Step | Command | Exit code | Notes |
|---|---|---|---|
| Install | `npm install` | 0 | 82 packages added, 634 total audited. |
| Typecheck | `npx tsc --noEmit` (no `vue-tsc` in the project's devDeps) | **0** | Pre-existing unrelated `exactOptionalPropertyTypes` warnings in demo composables remain (none touched by this lane). Zero glass-ui-related errors after migration. |
| Library build | `npm run build` (= `vite build --mode production`) | 0 | `dist/value.js` 139.31 KB raw / 39.56 KB gz; full library + d.ts emit. |
| Demo build | `npm run gh-pages` (`vite build --mode gh-pages`) | 0 | Full demo graph compiles; main index chunk 566.90 KB / 172.48 KB gz; CSS bundle 220.39 KB / 36.09 KB gz. |

### Post-migration retired-symbol grep (must be zero — all CLEAN)

```
$ rg '@mkbabb/glass-ui/(virtual|pagination|composables/dark|composables/keyboard)' /Users/mkbabb/Programming/value.js
# zero hits

$ rg 'from "@mkbabb/glass-ui"' src/ demo/ | rg '\b(Input|Textarea|Combobox|Carousel|useCarousel|useGlobalDark|registerShortcut|useRegisteredShortcuts|formatCombo|formatComboParts|isMac|useKeyboardShortcuts)\b'
# zero hits

$ rg '\b(useOffsetPagination|useVirtualSectionWindow|useWindowedStore|buildSectionLayout|findSectionOffset|resolveActiveSection|resolveSectionWindow|DockShowcaseFrame)\b' src/ demo/
# zero hits
```

The only remaining root-barrel imports in the demo are `useTouchGate`
(3 sites), which is correctly on the v1.0 vueuse-free root barrel.

## Open questions for orchestrator

1. **Local `useLayerTransition` fork carries the v0.9-era `layerProps()`
   API; upstream returns only `currentLayer` / `leavingLayer` refs.**
   No action requested — DOCUMENT-AS-DIFFERENT — but worth noting if M
   sweeps later consider re-elevating a `layerProps`-bearing variant
   back upstream. Two consumers minimum required per L invariant 8.

2. **`useDockState` exists in glass-ui src but is not exported via any
   subpath.** Per L invariant 8 this would normally retire — but
   `<GlassDock>` itself uses it internally. Substrate is correctly
   private. Flagging only in case the audit traverses src/-only
   composables.

3. **value.js's `demo/@/components/ui/scroll-area/index.ts` was a
   broken `ScrollArea` re-export.** glass-ui ships `<ScrollPane>`,
   not the shadcn `ScrollArea` family. Zero local consumers → deleted.
   Worth raising as a tombstone in the L MIGRATION.md `at-a-glance`
   list if other peer repos exhibit the same shape.

4. **Demo's `demo/@/components/ui/carousel/` is a self-contained
   shadcn-style fork** (its own `useCarousel` + `embla-carousel-vue`
   integration). No coupling to `@mkbabb/glass-ui/carousel`. KEEP-AS-IS
   per disposition — but multiple peer repos likely carry the same
   substrate. M.Rε §B-tier audit may want to canonicalise.

## Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/value.js status --short
 M demo/@/components/custom/color-picker/controls/ComponentSliders.vue
 M demo/@/components/custom/dark-mode-toggle/index.ts
 M demo/@/components/custom/dock/Dock.vue
 M demo/@/components/custom/dock/composables/useDockActionBar.ts        (pre-existing)
 D demo/@/components/custom/dock/composables/useDockState.ts
 D demo/@/components/custom/dock/composables/useDockTransition.ts
 M demo/@/components/custom/dock/composables/useLayerTransition.ts
 M demo/@/components/custom/dock/composables/usePopupMutex.ts
 M demo/@/components/custom/dock/index.ts
 M demo/@/components/custom/dock/layers/ActionBarLayer.vue
 M demo/@/components/custom/dock/layers/SlugEditLayer.vue
 M demo/@/components/custom/dock/menus/MobileMenuDropdown.vue
 M demo/@/components/custom/generate/GenerateControls.vue
 M demo/@/components/custom/gradient/GradientVisualizer.vue
 M demo/@/components/custom/image-palette-extractor/ExtractControls.vue
 M demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue
 M demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue
 M demo/@/components/custom/mix/MixResultDisplay.vue
 M demo/@/components/custom/mix/MixSourceSelector.vue
 M demo/@/components/custom/palette-browser/AdminUsersPanel.vue
 M demo/@/components/custom/palette-browser/PaletteControlsBar.vue
 M demo/@/components/custom/palette-browser/PaletteDialog.vue
 M demo/@/components/custom/palette-browser/PaletteSlugBar.vue
 M demo/@/components/custom/panes/AuroraPane.vue
 M demo/@/components/custom/panes/BlobPane.vue
 M demo/@/components/custom/panes/BrowsePane.vue
 M demo/@/components/custom/panes/PalettesPane.vue
 M demo/@/components/custom/panes/PaneSearchBar.vue
 M demo/@/components/custom/panes/PaneSegmentedControl.vue
 M demo/@/components/ui/context-menu/index.ts
 M demo/@/components/ui/input/index.ts
 D demo/@/components/ui/scroll-area/index.ts
 M demo/@/components/ui/select/index.ts
 M demo/@/components/ui/textarea/index.ts
 M demo/@/composables/useClipboard.ts
 M demo/color-picker/App.vue
 M package-lock.json                                                    (touched by `npm install`)
 M plugins/vite-source-export.ts                                        (pre-existing)
 M src/index.ts                                                         (pre-existing)
 M src/parsing/units.ts                                                 (pre-existing)
 M src/units/normalize.ts                                               (pre-existing)
?? .gitmodules                                                          (pre-existing untracked)
?? demo/DESIGN.md                                                       (pre-existing untracked)
?? docs/instructions/                                                   (pre-existing untracked)
?? docs/precepts/                                                       (pre-existing untracked)
?? src/parsing/animation-shorthand.ts                                   (pre-existing untracked)
?? src/parsing/extract.ts                                               (pre-existing untracked)
?? src/parsing/serialize.ts                                             (pre-existing untracked)
?? src/parsing/stylesheet.ts                                            (pre-existing untracked)
?? src/units/interpolate.ts                                             (pre-existing untracked)
```

Lane B touched **37 files** (33 modified, 3 deleted, 1 created — the
local `useLayerTransition` fork is `M` in status because the file
already existed as a re-export shim, but the contents are entirely new).
The pre-existing modifications under `src/`, `plugins/`, and the
parsing/units helpers were untouched by this lane; they belong to the
unrelated value.js parsing work the user had in progress before the
lane opened.

Per agent dispatch clause: NO staging, NO commits, NO checkout. The
orchestrator owns the index.
