# Q.Rκ — fourier-analysis + words/frontend cosmetic regression sweep

**Lane**: Q.Rκ — paired smaller-consumer cosmetic-regression attribution.
**Date**: 2026-05-18.
**Mode**: READ-ONLY. No mutating git. No source edits in either consumer or in glass-ui.
**Verdict in one line**: Both consumers run on glass-ui HEAD (v1.8.5) and show a small, well-bounded set of cosmetic regressions — none of them in the AB+1/AC/AD/P/AF substrate primitives, all of them either in pre-existing stale tier-class references (Qγ-class drift) or in token cascades the recent dock/typography commits never reached. Two of the findings are unambiguous fold-ins for Q.W3/W4; the rest are revert-equivalent (the consumer is the canonical writer and the library is doing the right thing).

---

## §1 — Surface inventory

### §1.1 fourier-analysis surface inventory

Consumer path: `/Users/mkbabb/Programming/fourier-analysis/web/`.
glass-ui link: `"@mkbabb/glass-ui": "file:../../glass-ui"` → resolves to HEAD v1.8.5.
Total glass-ui-consuming sites: 26 SFCs/TS files (per `grep -l '@mkbabb/glass-ui' src -r`).

Surface buckets:

- **Dock (3 sites)** — `CanvasControlsDock.vue`, `EditorControlsDock.vue`, `AnimationControls.vue`. All consume `GlassDock` + `DockIconButton` from `@mkbabb/glass-ui/dock`. `AnimationControls.vue` additionally composes a custom `<GlassTimeline>` SFC inside an expanded dock; `CanvasControlsDock.vue` + `EditorControlsDock.vue` embed `HoverPopover` triggers.
- **Slider scrubber (2 sites)** — `GlassTimeline.vue` (consumed inside `AnimationControls.vue`) + `ConvergenceTimeline.vue` (under `equation/convergence/`). Both compose `<Slider variant="glass-scrubber">` from the root barrel after the P.W5 migration from the local shadow recipe.
- **Tabs (3 sites)** — `EquationView.vue`, `VisualizationView.vue`, `GalleryView.vue`. All compose `UnderlineTabs` from `@mkbabb/glass-ui/tabs`.
- **Select (1 site)** — `SpeedSelect.vue` composes the four-piece `Select / SelectTrigger / SelectValue / SelectContent / SelectItem` family.
- **Tooltip shim (cross-cutting)** — `components/ui/tooltip/Tooltip.vue` wraps `Tooltip + TooltipTrigger + TooltipContent` behind a single-prop API. `App.vue` mounts a single `<TooltipProvider :delay-duration="400" :skip-delay-duration="200">` at the root.
- **Toast** — `Toaster` mounted at `App.vue` once.
- **HoverCard** — `EquationView.vue` (Info icon for tier explanation).
- **HoverPopover (custom subpath)** — `CanvasControlsDock.vue` + `EditorControlsDock.vue` for inline popovers anchored to dock buttons.
- **Composables/utils** — `useClipboard` (`EquationResult.vue`), `useToast` (`useToast.ts`), `useOffsetPagination` (`useOffsetPagination.ts`), `useMorphConfig` (`useMorphConfig.ts`), `cn` (cross-cutting).
- **Local "ui/" shim layer** — fourier carries its own `components/ui/tooltip/Tooltip.vue` (re-skinned shim) and `components/ui/CollapsibleSection.vue`, `components/ui/SliderControl.vue` (consumer-owned, not part of glass-ui). The library does NOT control these surfaces — they are local primitives sitting on top of glass-ui tokens.
- **Tier-class consumers (stale)** — `PaperView.vue`, `FullscreenViewer.vue`, `EquationPanel.vue`, `EquationModeToggle.vue`, `ConvergenceLegend.vue`, `MobileFloatingToc.vue`, `GallerySearchBar.vue` paint `.glass-subtle` (5 sites) or `.glass-medium` (3 sites) — both legacy names. See §2.1 R-F1.

**NOT consumed in this codebase** (zero call sites at HEAD): `<Progress>`, `<MetricRow>`, `<MetricStack>`, `<MetricBadge>`, `<MetricCell>`, `<DataTable>`, `<ContinuousTimeline>`, `<HeaderRibbon>`, `<StatusDot>`, `<Toggle variant="card">`, `<ToggleGroup>`, `<ContextMenu>`, `<Card variant="pane">`, `--dock-label`, `--continuous-fill-opacity`, `--phase-color`, `--mask-fade-width`. The AF.W1 + 9ba68ca + d244dd5 + 1c6c3e5 + 3cb70db + b8a61ec primitive families therefore have NO direct call site in this consumer — those four commits are NOOPs for fourier.

### §1.2 words/frontend surface inventory

Consumer path: `/Users/mkbabb/Programming/words/frontend/`.
glass-ui link: workspace-resolved monorepo dep (the `words/` mono lives at `/Users/mkbabb/Programming/words`; the consumer is `frontend/`). At HEAD it resolves to glass-ui v1.8.5 per the M.W0 migration that already landed.
Total glass-ui-consuming sites: 87 SFCs/TS files (per grep). Largest single consumer of glass-ui in the field; >2× the fourier surface.

Surface buckets:

- **Dock (2 sites)** — `WordListView.vue` (a `Teleport`ed `<GlassDock always-expanded>` at the bottom of the wordlist view) and `ThemeSelector.vue` (a manual-controlled `GlassDock` at top-right of the definition card).
- **Sidebar (heavy)** — own `Sidebar.vue` + `progressive-sidebar` family + 8 `sidebar/*.vue` SFCs; consume `useScrollTracker`, `useSidebarFollow`, `useTreeIndex` from `@mkbabb/glass-ui/sidebar`.
- **Cards** — `ThemedCard` wraps glass-ui `Card`; `DefinitionSkeleton.vue` + `ThesaurusView.vue` use `Card` directly (no `variant="pane"` anywhere — good).
- **Dropdowns** — used widely (`SidebarWordListItem.vue`, `WordlistGrid.vue`, `WordlistTargetForm.vue`, `UserMenu.vue`).
- **Dialogs** — `Modal.vue` (own wrapper around `Dialog + DialogContent`); modal family across `wordlist/modals/*.vue` mostly composes `Dialog` indirectly via `Modal.vue`.
- **HoverCard / Tooltip** — wide use across definition + sidebar.
- **Tabs** — `ProviderViewTabs.vue` uses `Tabs + TabsContent` from the root; `SearchControls.vue` uses `Tabs` directly; `WordlistControlsPanel.vue` + `LookupControlsPanel.vue` use `BouncyToggle` from `@mkbabb/glass-ui/tabs`.
- **Carousel** — `ImageCarousel.vue` consumes the `@mkbabb/glass-ui/carousel` subpath.
- **Forms** — `Input` + `Textarea` from `@mkbabb/glass-ui/forms` (4 modal sites).
- **Confirm dialog** — `ConfirmDialog` from `@mkbabb/glass-ui/confirm-dialog` (4 sites).
- **Custom subpaths used** — `/dock`, `/forms`, `/dark`, `/carousel`, `/confirm-dialog`, `/controls` (DarkModeToggle), `/typewriter`, `/stacked-icons`, `/tabs`, `/sidebar`.
- **Stale tier-class consumers** — `ThemeSelector.vue` paints `.glass-medium` on two flyouts (lines 92 + 126); `WordLookupPopover.vue` uses `.glass-medium` twice (lines 8 + 21). See §2.2 R-W1.

**NOT consumed in this codebase**: `<Progress>`, `<MetricRow>`, `<MetricStack>`, `<MetricBadge>`, `<MetricCell>`, `<DataTable>`, `<ContinuousTimeline>`, `<HeaderRibbon>`, `<Toggle variant="card">`, `<ToggleGroup>`, `<Card variant="pane">`, `--dock-label`, `--continuous-fill-opacity`, `--phase-color`. The recent AF.W1 + 9ba68ca + d244dd5 + 1c6c3e5 + 3cb70db + b8a61ec primitive families therefore have NO direct call site in words/frontend either.

---

## §2 — Per-surface regression matrices

### §2.1 fourier-analysis regression matrix

Recent glass-ui commits walked: `7e2e385`, `63c88b7` (AF.W1), `d244dd5`, `9ba68ca`, `beec35e`, `3cb70db`, `099d51e`, `b8a61ec`, `bbb51e8`, `1c6c3e5`, plus AB+1/AC/AD/P/AF tranches.

7-column attribution matrix — id, consumer site, cosmetic axis, observed effect, attributed glass-ui commit, severity, fold-in/revert verdict.

| ID | Site | Axis | Observed effect | Attributed commit | Severity | Fold-in / revert |
|---|---|---|---|---|---|---|
| **F-1** | `PaperView.vue:335`, `FullscreenViewer.vue:54`, `EquationPanel.vue:67`, `EquationModeToggle.vue:8`, `ConvergenceLegend.vue:17` (5 sites) | Glass tier | `.glass-subtle` paints nothing — class retired at glass-ui v0.8.0 (`eb9c44c refactor: rename glass-tier ladder to wash\|quiet\|resting\|floating`). The surface degrades to background/border-only, no backdrop-filter and no surface tint. | `eb9c44c` (v0.8.0 — pre-AB+1, predates the commits in scope) | High (visually missing glass effect on 5 chrome surfaces) | Consumer fix — rename to `.glass-wash` per the documented MIGRATION.md path. Library is correct (v1.0 invariant 16 — no legacy aliases). |
| **F-2** | `MobileFloatingToc.vue:94`, `:101`, `:117`, `GallerySearchBar.vue:74` (4 sites) | Glass tier | `.glass-medium` paints nothing — not a documented tier name (the ladder is wash/quiet/resting/floating/overlay; `.glass-medium` was never canonical at any point reachable from glass-ui HEAD). | Pre-existing drift; not a recent-commit regression | High (4 chrome surfaces invisible) | Consumer fix — pick `glass-quiet` or `glass-resting` per the surface depth contract. Cross-walks with the words/frontend R-W1 finding below. |
| **F-3** | `GlassTimeline.vue:102` (`.timeline-row:has(.glass-slider[data-held])`) | Dock-keep-open contract | Selector is correct — the Slider variant emits `data-held` per the K.W7 contract. Verified against `src/components/ui/slider/` HEAD. No regression. | N/A | N/A (zero finding) | None — confirms the contract is consumed correctly. |
| **F-4** | `AnimationControls.vue:368` (`transition: opacity var(--duration-mid, 0.24s)`) | Animation duration token | `--duration-mid` is not in glass-ui tokens (the canon is `--duration-fast: 0.2s` / `--duration-normal: 0.3s` / `--duration-slow: 0.45s`). The CSS-var fallback to 0.24s lands — visual effect is correct (0.24s halfway between fast + normal) but the var name is dangling. | Pre-existing — `--duration-mid` was never a glass-ui token; recent commits did not change the duration triad. | Low (visual is fine; the token name is just dead) | Consumer fix — `var(--duration-normal, 0.3s)` is the closest canonical reference; or accept the fallback as load-bearing. Library is correct. |
| **F-5** | `ConvergenceTimeline.vue:130` (`--slider-scrub-track-height: 20px`), `GlassTimeline.vue:125` (`--slider-scrub-track-height: 24px`) | Slider scrubber sizing | The variant exposes the knob; both consumer overrides land. No regression. | N/A | N/A | None. |
| **F-6** | `AnimationControls.vue:9-11` (`<GlassDock class="animation-dock" :collapse-delay="2000" :start-collapsed="true">`) | Dock edge-fade retire | `099d51e` removed the 1rem `mask-image` linear-gradient on `.dock-layers` + `.glass-dock.vertical`. The fourier `animation-dock` paints a horizontal-axis dock and now reads the rightmost icon (the three-dot menu) without the prior 1rem alpha-ramp. This is the documented intent of `099d51e` (the prior ramp shadowed edge controls); fourier's three-dot menu was a victim of that ramp, so the fix is net-positive for this consumer. | `099d51e` | Net-positive (no negative regression — net improvement) | None (forward-improvement). |
| **F-7** | `EquationModeToggle.vue:57-60` (`.eq-toggle-btn.is-active { color: #f0b632 }`) | Active-state vocab | The toggle composes `.glass-subtle` (R-F1, broken) + a local `.is-active` marker. The vocab is fourier-private, not glass-ui's canon (`data-state="active"` / `data-active`). No glass-ui regression here. | N/A | N/A | None — consumer-private vocab; not in scope. |
| **F-8** | `CanvasControlsDock.vue:100-105`, `EditorControlsDock.vue:168-173` (`.dock-separator` width 1px / height 1.5rem / `color-mix(in srgb, var(--foreground) 20%, transparent)`) | Dock separator | Local rule duplicating glass-ui's `.dock-separator` (defined in `src/styles/dock.css`). The local rule overrides the library's via scoped-style specificity; nothing breaks visually. The local rule is identical-or-near-identical to the library version, so the two stay in lockstep by accident. Note: this is the same class of duplication Q-coh-5 catches in glass-ui's own dock.css after `beec35e`. | Pre-existing | Low (duplication, not a regression) | Consumer cleanup — drop the local `.dock-separator` block and rely on the library class. Not blocking. |
| **F-9** | `AnimationControls.vue:191` (`box-shadow: var(--shadow-elevated)`) on `.menu-popup` | Shadow token | `--shadow-elevated` is defined locally in `fourier-overrides.css:121, 175` (light + dark). No library dependency. | N/A | N/A | None. |
| **F-10** | `ConvergenceTimeline.vue:107-116` (custom `.play-btn` with `1.5px border-color: color-mix(in srgb, var(--foreground) 10%, transparent)` + `backdrop-filter: blur(8px)`) | Glass-equivalence | A consumer-private mini-glass recipe that bypasses the glass tier ladder entirely. Functions; not a regression. Could compose `.glass-quiet` for consistency. | N/A | Low (composition opportunity, not a regression) | Consumer cleanup. |
| **F-11** | All three dock sites — `CanvasControlsDock.vue`, `EditorControlsDock.vue`, `AnimationControls.vue` | Dock label typography | `bbb51e8` flipped `.dock-label` `font-weight: 500 → 400`. None of fourier's dock sites use the `.dock-label` register (no `DockTabButton` consumers, only `DockIconButton` — icons only, no label register). | `bbb51e8` | None (zero call sites for the affected utility) | None — NOOP for fourier. |
| **F-12** | `EditorControlsDock.vue:47` (`<GlassDock :collapse-delay="2000" :start-collapsed="true" fit-content>`) | Dock layer-visibility | `beec35e` changed inactive `.dock-layer-item-host` to `visibility:hidden`. Fourier never uses `DockLayerGroup` or `DockLayer` (only the default + `#collapsed` slot pair on `GlassDock`). The change affects multi-layer docks only. | `beec35e` | None (zero call sites for the affected primitive) | None — NOOP for fourier. |
| **F-13** | `AnimationControls.vue:130-148` (`.play-btn` audacious-rainbow recipe inline) | Audacious button vocab | Recipe predates the canonical `btn-audacious` utility (K.W6 `154d1d2`). The consumer rolls its own — fine, but the library now has a canonical extraction at `@utility btn-audacious`. | N/A (this is a pre-canon recipe) | Low (composition opportunity) | Consumer migration — optional. |
| **F-14** | `App.vue:22` (`<TooltipProvider :delay-duration="400" :skip-delay-duration="200">`) | Tooltip provider | `delay-duration=400` is unusually slow — the glass-ui default is 200ms (per the V.W3 vocab). Tooltips will feel sluggish on this consumer. | Consumer choice; not a glass-ui regression | Low | Consumer dial — bring to 200ms for parity with the library default, or accept as intentional. |
| **F-15** | `App.vue:30` (`<Toaster />` placed OUTSIDE the `<TooltipProvider>` block, dist mode) | Toaster placement | Cosmetically fine; the toast root is portal-mounted and does not require tooltip context. No regression. | N/A | N/A | None. |

**fourier-analysis count of regressions**: 9 cosmetic findings with a verdict (F-1, F-2, F-4, F-8, F-9 NOOP, F-10, F-13, F-14; plus 2 strict zero-impact NOOPs F-11/F-12 that the audit explicitly verified). Of the 9, two (F-1, F-2) are HIGH-severity stale-tier-class drift; one (F-6) is net-positive forward improvement; the rest are LOW.

### §2.2 words/frontend regression matrix

Recent glass-ui commits walked: same set.

| ID | Site | Axis | Observed effect | Attributed commit | Severity | Fold-in / revert |
|---|---|---|---|---|---|---|
| **W-1** | `ThemeSelector.vue:92` (theme flyout), `:126` (provider-version flyout); `WordLookupPopover.vue:8` (chip), `:21` (panel) (4 sites) | Glass tier | `.glass-medium` paints nothing. Same root cause as F-2: never a canonical glass tier name. M.W0 batch-migrated `glass-subtle → glass-wash` in this consumer (commit `0f16925`) but the four `glass-medium` sites slipped through. | Pre-existing drift; not a recent-commit regression | High (4 popover surfaces invisible) | Consumer fix — pick `glass-quiet` (popover dropdown tier) or `glass-resting` per the surface ladder. Library is correct. |
| **W-2** | `WordListView.vue:109` (`<GlassDock always-expanded>` Teleported to body, bottom-center) | Dock edge-fade retire | `099d51e` removed the horizontal `.dock-layers` 1rem mask-image ramp. Words' bottom dock had the prior 1rem alpha-ramp painting on the leftmost (`Select`) and rightmost (`Review N Due` button) controls. After `099d51e` the rail ends paint sharp. Net-positive — words was explicitly cited in the K-cluster as a victim of this same ramp via Qζ probe; this is the documented fix. | `099d51e` | Net-positive (forward improvement) | None (forward-improvement). |
| **W-3** | `WordListView.vue:109` | Dock layer-visibility | `beec35e` changed inactive `.dock-layer-item-host`. Words' dock has no `DockLayerGroup` — single default slot only. NOOP. | `beec35e` | None (zero call sites for the affected primitive) | None. |
| **W-4** | `ThemeSelector.vue:6` (`<GlassDock ref="dockRef" manual :start-collapsed="!editModeEnabled">`) | Dock label typography | `bbb51e8` flipped `.dock-label` 500 → 400. ThemeSelector uses `DockIconButton` only, never `DockTabButton`. NOOP. | `bbb51e8` | None | None. |
| **W-5** | `SidebarWordListItem.vue:46-57` (own progress-bar recipe — `h-0.5 w-full rounded-full bg-muted/50` + width-driven inner gradient) | Progress fill | The AF.W1 (`63c88b7`) progress rounded leading-edge change applies to `<Progress>` + `.progress-sectioned-fill`. Words rolls its own progress bar (no glass-ui `<Progress>` consumer at HEAD). NOOP for this site. | `63c88b7` | None (zero call sites for the affected primitive) | None. |
| **W-6** | `LoadingProgress.vue:22-32` (own progress recipe, width-driven) | Progress fill | Same as W-5 — local recipe, not the library `<Progress>`. NOOP. | `63c88b7` | None | None. |
| **W-7** | `Sidebar.vue:38` (`'... glass-wash transform-gpu transition-[transform,opacity,box-shadow] duration-slow ease-spring-smooth ...'`) | Glass tier | `.glass-wash` paints correctly. No regression. | N/A | N/A | None. |
| **W-8** | `App.vue:2` (`<TooltipProvider :delay-duration="200">`) | Tooltip provider | Default-aligned — 200ms matches library default. No regression. | N/A | N/A | None. |
| **W-9** | `WordListView.vue:113` (`:variant="isReviewMode ? 'default' : 'ghost'"`), other Buttons | Button variants | `default`, `ghost` are canonical at HEAD. No regression. | N/A | N/A | None. |
| **W-10** | `ProviderViewTabs.vue:2` (`<Tabs>` from root barrel) | Tabs vocab | The canonical Tabs ship the `data-state="active"` vocab per V.W3 `3e925e1`. The consumer reads the active state via the standard reka-ui state attribute (verified in `WordListView.vue`'s Button toggle). No regression. | N/A | N/A | None. |
| **W-11** | `WordlistControlsPanel.vue:118`, `LookupControlsPanel.vue:67` (`<BouncyToggle>`) | BouncyToggle active state | V.W3 canonicalised the active-state vocab. Consumer reads state via the component's own emits. No regression. | `3e925e1` | N/A | None. |
| **W-12** | `ImageCarousel.vue:89-90` (`<Carousel> + CarouselApi from @mkbabb/glass-ui/carousel`) | Carousel surface | Carousel package family ships via the `/carousel` subpath at HEAD (per L.W1 Lane C + v1.0.4 per MIGRATION.md §1.2). No regression. | N/A | N/A | None. |
| **W-13** | `Modal.vue:21` (`<Dialog>` + `<DialogContent>`) | Dialog wrap | The cf3bf37 typography refit + 43bee82 ModalOverlay extraction are upstream V.W3 changes that ship glass-ui-side. Modal.vue uses the components without overriding their internals. No regression. | `cf3bf37`, `43bee82` (V.W3) | N/A | None. |
| **W-14** | `SidebarContent.vue:20-103` (8 button declarations duplicating the same focus-ring + transition recipe) | Composition discipline | Consumer-side repetition (8× the same long class string). Not a glass-ui regression. Composition opportunity (could lift to a local utility). | N/A | Low (consumer cleanup opportunity) | Consumer cleanup. |
| **W-15** | `App.vue:8` (`<Toaster />` mounted INSIDE the `<TooltipProvider>` block) | Toaster placement | Inverse of fourier F-15. Both placements work; the toast root is portal-mounted. No regression. | N/A | N/A | None. |
| **W-16** | `assets/index.css:6` (`@variant dark (&:where(.dark, .dark *));`) | Dark variant wiring | Per the consumer wiring contract documented in CLAUDE.md §Consumer wiring. Correct. | N/A | N/A | None. |
| **W-17** | `NotificationToast.vue:70, 84` (`transition: opacity 0.3s var(--spring-bouncy), transform 0.3s var(--spring-bouncy)`) | Easing token | `--spring-bouncy` is exposed by glass-ui (verified via assets/transitions.css consumers). No regression. | N/A | N/A | None. |
| **W-18** | `Sidebar.vue:20-23` (`enter-active-class="transition-opacity duration-400 ease-spring-smooth"`) | Duration token | `duration-400` is a Tailwind class (400ms), not a glass-ui `--duration-*` token. Works as a Tailwind utility. No regression — but the consumer's other transitions use the canonical `duration-fast/normal/slow` tokens, so the one outlier could be normalised. | N/A | Low | Consumer normalisation opportunity. |
| **W-19** | `SidebarHeader.vue:80` (`import { DarkModeToggle } from '@mkbabb/glass-ui/controls'`) | Controls subpath | The `controls` subpath is the documented home for `DarkModeToggle` at v1.0. Correct. | N/A | N/A | None. |
| **W-20** | `ImageCarousel.vue:44, 54, 66` (`.glass-overlay` for prev/next + slide counter) | Glass tier overlay | `.glass-overlay` is the canonical 5th-rung tier at HEAD (per CLAUDE.md §src/styles/glass.css). Correct. | N/A | N/A | None. |
| **W-21** | `WordHeader.vue:226` (`CardHeader, CardTitle, HoverCard, ..., Popover, ..., Tooltip, ...` — 10 named imports from one root-barrel line) | Import surface | Root barrel correctly re-exports these. No regression. | N/A | N/A | None. |
| **W-22** | `DefinitionSkeleton.vue:4-54` (`<Card>` + `<CardHeader>` + `<CardContent>` + `<Skeleton>`) | Card primitive | Used with NO `variant=` prop — falls through to the `tier:"resting" + shadow:true` default per V.W3 4-state contract. No regression (this is the documented default; matches Qα Q-card-2 baseline). | N/A | N/A | None. |

**words/frontend count of regressions**: 5 cosmetic findings with a verdict (W-1 HIGH; W-14, W-18 LOW; W-2 net-positive; W-22 verified-no-regression). Of the 5, one (W-1) is HIGH-severity stale-tier-class drift (4 sites — overlaps with the M.W0 batch's missed tail); one (W-2) is forward improvement; the rest are LOW or already canonical.

---

## §3 — Wave fold-in recommendations (combined)

User directive: fold-in vs revert per finding, BINDING. The recommendations below are bucketed by Q wave per the Q.md plan.

### Fold into Q.W4 (style + token co-location — token-home drift sweep)

The Q.W4 "legacy cosmetic sweep" charter already covers tier-class drift in 5-consumer fleet. The two HIGH findings here (F-1 + F-2 + W-1) are the consumer-side tails of the same M.W0 (`glass-subtle → glass-wash`) migration that landed in words but missed:

- **F-1** (fourier-analysis × 5 sites) — `.glass-subtle` → `.glass-wash`. Direct rename per MIGRATION.md.
- **F-2** (fourier-analysis × 4 sites) — `.glass-medium` → `.glass-quiet` (popover-tier) for `MobileFloatingToc.vue` + `GallerySearchBar.vue`. The four sites are visual-state-equivalent to dropdown surfaces; `quiet` is the canonical home for the popover ladder rung.
- **W-1** (words/frontend × 4 sites) — `.glass-medium` → `.glass-quiet` for `ThemeSelector.vue` (×2) + `WordLookupPopover.vue` (×2). Same tier; same MIGRATION.md path.

Q.W4 ALREADY closes this class for the library side (token co-location + cosmetic-sweep). The consumer-side complement is a one-PR-per-consumer migration:

- `fourier-analysis`: 9-site sed rewrite (`glass-subtle → glass-wash` × 5; `glass-medium → glass-quiet` × 4).
- `words/frontend`: 4-site sed rewrite (`glass-medium → glass-quiet` × 4).

Recommend: lift these into the Q.W4 close as a documented consumer-side coda — same wave letter, separate PRs, owned by Q.W4. No library-side change needed; the canon is already correct.

### Fold into Q.W3 (cohesion transpositions — dock-duplication consolidation)

- **F-8** (fourier-analysis) — local `.dock-separator` block in `CanvasControlsDock.vue` + `EditorControlsDock.vue` duplicates the library's `.dock-separator` rule. The Q.W3 charter calls out `beec35e`-style dock-duplication consolidation in glass-ui's own dock.css; the consumer-side analogue is to drop the local duplicate. Two-site delete, no behavioural change.

Q.W3 fold-in: optional consumer-side cleanup; not a regression, just a substrate-without-consumer-binary cleanup opportunity.

### Forward-improvement (NO fold-in; document only)

- **F-6** (fourier-analysis `AnimationControls.vue`) + **W-2** (words/frontend `WordListView.vue` bottom dock) — both consumers gain a NET-POSITIVE cosmetic outcome from `099d51e`. The 1rem edge-fade ramp that was painting a stray directional shadow on the rightmost (fourier: three-dot menu; words: Review-N-Due button) and leftmost (words: Select toggle) dock controls is gone. Document in the Qκ verdict; no consumer-side action.

### LOW-severity consumer-cleanup (no wave fold-in; consumer-side hygiene)

- **F-4** — `var(--duration-mid, 0.24s)` dangling-token reference. One-site rename to `--duration-normal` recommended; fallback already lands.
- **F-10** — `.play-btn` mini-glass recipe in `ConvergenceTimeline.vue` could compose `.glass-quiet`; visual parity but composition discipline.
- **F-13** — `.play-btn` audacious-rainbow recipe in `AnimationControls.vue` predates the canonical `btn-audacious` utility. Optional refactor.
- **F-14** — `<TooltipProvider :delay-duration="400">` is 2× the library default (200ms). Consumer dial; not a regression.
- **W-14** — `SidebarContent.vue` 8-site button class duplication. Composition opportunity.
- **W-18** — `Sidebar.vue` `duration-400` Tailwind class vs `duration-normal` canon. Normalisation opportunity.

These six findings are NOT wave fold-ins. They are consumer-side hygiene items that the consumer's own backlog should track. The library is canonical.

### Verified zero-regression (NOOPs; commit-specific calluses)

- AF.W1 (`63c88b7`) — rounded progress fills, MetricBadge label weight, MetricRow conjoin, timeline tick: **NOOP** for both consumers (zero call sites).
- `9ba68ca` + `d244dd5` — metric-stack register + result-clamp: **NOOP** for both (zero call sites).
- `1c6c3e5` — DataTable responsive card-per-row: **NOOP** for both (zero call sites).
- `3cb70db` — timeline stitched gradient + glassy dots: **NOOP** for both (zero `ContinuousTimeline` call sites).
- `b8a61ec` — `--continuous-fill-opacity` cascade: **NOOP** for both.
- `bbb51e8` — `.dock-label` weight 500 → 400: **NOOP** for both (no `DockTabButton` consumer in either; only `DockIconButton` use).
- `beec35e` (toggle.card portion) — **NOOP** (zero `<Toggle variant="card">` consumers).
- `beec35e` (dock-layer visibility portion) — **NOOP** for both (no `DockLayerGroup` consumers).

These NOOPs are forensically important: they confirm that the four most recent feature commits (`63c88b7`, `9ba68ca`, `d244dd5`, `1c6c3e5`) plus the three substrate-tightening fixes (`3cb70db`, `b8a61ec`, `bbb51e8`) caused **zero** cosmetic regressions in fourier-analysis or words/frontend. The cosmetic-regression surface in both consumers is dominated by pre-existing stale-tier-class drift from a much older migration (`eb9c44c` v0.8.0 — the wash/quiet/resting/floating ladder rename), not by the recent post-P shadow cohort.

---

## §4 — Severity summary

### §4.1 fourier-analysis

| Severity | Count | IDs |
|---|---|---|
| HIGH | 9 sites across 2 findings | F-1 (5 sites), F-2 (4 sites) |
| Net-positive | 1 finding | F-6 |
| LOW | 4 findings | F-4, F-8, F-10, F-13, F-14 |
| NOOP (verified zero-impact) | 4 findings | F-11, F-12, F-5, F-3 |
| Consumer choice (no regression) | 2 findings | F-9, F-15 |

### §4.2 words/frontend

| Severity | Count | IDs |
|---|---|---|
| HIGH | 4 sites across 1 finding | W-1 (4 sites) |
| Net-positive | 1 finding | W-2 |
| LOW | 2 findings | W-14, W-18 |
| NOOP (verified zero-impact) | 8 findings | W-3, W-4, W-5, W-6, W-10, W-11, W-12, W-13 |
| Verified canonical (no regression) | 8 findings | W-7, W-8, W-9, W-15, W-16, W-17, W-19, W-20, W-21, W-22 |

### §4.3 Combined

| Severity | Combined count |
|---|---|
| HIGH (consumer-side glass-tier drift) | 3 findings, 13 sites total (F-1: 5, F-2: 4, W-1: 4) |
| Net-positive forward improvements | 2 findings (F-6, W-2) — both stem from `099d51e` |
| LOW consumer-hygiene | 6 findings (F-4, F-8, F-10, F-13, F-14, W-14, W-18) |
| NOOP (zero call sites for the change) | 12 findings — confirms recent substrate work shipped clean |

### §4.4 Wave-letter fold-in count

| Wave | Count | Items |
|---|---|---|
| Q.W3 | 1 finding, 2 sites (fourier) | F-8 (optional dock-separator dedupe) |
| Q.W4 | 3 findings, 13 sites combined | F-1 (5), F-2 (4), W-1 (4) — consumer-side coda of M.W0 + glass-tier rename |
| No wave (consumer hygiene) | 6 findings | F-4, F-10, F-13, F-14, W-14, W-18 |
| No wave (forward-improvement, document only) | 2 findings | F-6, W-2 |

---

## §5 — Audit hygiene notes

- This lane took the consumer histories at HEAD (`fourier-analysis @ 4df1a06`, `words/frontend @ 5c1b2b8`) and the glass-ui mainline at `d244dd5` (the v1.8.5 patch beyond P close). Both consumers run `"@mkbabb/glass-ui": "file:..."` workspace-style links per the cross-repo dev-resolution contract Q.W0 documents.
- Skipped: P0 resolver issues (handled in Q.W1 per Qα §2.1 + §2.2). The cosmetic surfaces walked here ALL render correctly once the resolver desync is past.
- Read-only: no git mutations in any repo; no source edits in either consumer or glass-ui.
- The CLAUDE.md M.W0 entry references `glass-subtle → glass-wash` as a v1.0 rename. Both consumers participated in M.W0 (per their respective consumer commits — fourier `301a95e`, words `0f16925`) but each carries a small tail of stale tier-class names that the M.W0 sweep missed. The consumer-side tails (13 sites combined: F-1 + F-2 + W-1) are the dominant cosmetic-regression surface this lane uncovered.
- The recent post-P shadow cohort (`bbb51e8` through `7e2e385`) caused **zero** cosmetic regressions in these two consumers — every commit in scope either had zero call sites (NOOP) or improved the consumer surface (net-positive). The cohort's own design intent — "no regressions in speedtest/value.js/demo" per the `7e2e385` merge body — extends cleanly to fourier + words.
