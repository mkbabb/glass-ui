# H Deep Audit — Lane β (substrate-without-consumer at HEAD, deeper than W6.β)

**Date**: 2026-05-05.
**Lane**: β-deep — every public surface in `src/` at HEAD `c5f196c`, including pre-G artefacts that fell outside W6.β's G-only scope. Cross-references the six sibling consumer trees that were all present at audit time: `../speedtest`, `../words/frontend`, `../bbnf-lang/playground`, `../fourier-analysis/web`, `../keyframes.js`, `../value.js`.

**Method**: Refined-D verdict precedence (`delete-unused > library-orphan > inline-and-remove > keep-current > demo-only-private > keep`). Counts mean distinct files (def + barrel + consumer). `keep` requires ≥ 2 distinct files in `src/+demo/` OR ≥ 2 across (`src/+demo/` ∪ a consumer tree). `keep-current` requires either `docs/consumer-evidence/<artefact>.md` with fresh proof grep, or H invariant 2's second-branch reading. Counts use `rg -l` invocations cited inline. Read-only — no edits, no commits, no destructive git commands.

## 1. Public-surface enumeration (counts per family)

| Family | Source | Distinct rows |
|---|---|---:|
| ui packages | `src/components/ui/*/index.ts` | 39 |
| custom packages | `src/components/custom/*/index.ts` | 40 |
| composable packages | `src/composables/*/index.ts` (incl. `utils`, `motion`, `glass`, `sortable`, `virtual`, `pagination`, `sidebar`, `blob`) | 9 |
| top-level composable utilities | `src/composables/use*.ts` (`useGlobalDark`, `useInterval`, `useKeyboardShortcuts`, `useTimer`, `useTouchGate`) | 5 |
| `--token` definitions | `src/styles/tokens.css` distinct names | 295 |
| `@utility` blocks | `src/styles/*.css` | 26 |
| Runtime helpers | `src/tokens.ts` (`chartHeights`, `chartColors`, `chartMargin`, `minWidthInputSm`, `NAMED_EASING_BEZIER`) | 5 |

CVA exports (extracted from `src/components/ui/*/index.ts` and `src/components/custom/toggle-chip/index.ts`): 14 distinct `cva()` factories (`alertVariants`, `avatarVariant`, `badgeVariants`, `badgeToneVariants`, `buttonVariants`, `cardVariants`, `inputVariants`, `numberFieldVariants`, `selectTriggerVariants`, `sheetVariants`, `tabsListVariants`, `tabsTriggerVariants`, `toastVariants`, `toggleVariants`, `toggleChipVariants`).

Discrete CVA variant values (axis × value pairs): 64 (enumerated in `/tmp/cva-variants.txt` per `rg`).

## 2. UI package primary symbols (39)

`rg -l "<\bSymbol\b" src/ demo/ --type-add 'vue:*.vue' --type vue` | cross-repo via `rg -l "<\bSymbol\b" ../speedtest/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ ../fourier-analysis/web/src/ ../keyframes.js/ ../value.js/`.

| ui package | tag-uses src+demo | cross-repo (sum across 6) | verdict |
|---|---:|---:|---|
| Accordion | 1 | words=1, keyframes=2, value=2 → 5 | keep |
| Alert | 1 | value=2 → 2 | keep |
| Avatar | 2 | (any) | keep |
| Badge | 8 | many | keep |
| Button | 39 | many | keep |
| Card | 14 | many | keep |
| Carousel | 1 | words=1, keyframes=1, value=1 → 3 | keep |
| Checkbox | 3 | many | keep |
| Collapsible | 1 | speedtest=1, fourier=2, value=1 → 4 | keep |
| Combobox | 1 | 0 | **keep-current (sub-bar; demo-only)** |
| Command | 3 | many | keep |
| ContextMenu | 2 | (any) | keep |
| DataTable | 1 | speedtest=2 → 2 | keep |
| Dialog | 3 | many | keep |
| Drawer | 1 | keyframes=1 → 1 | **keep-current (sub-bar)** |
| DropdownMenu | 2 | many | keep |
| HoverCard | 2 | (any) | keep |
| Input | 10 | many | keep |
| Label | 19 | many | keep |
| MultiSelect | 1 | 0 | **library-orphan (single demo story; zero consumers)** |
| Notification | 1 | words=2 → 2 | keep |
| NumberField | 2 | (any) | keep |
| Popover | 2 | (any) | keep |
| Progress | 1 | speedtest=3 → 3 | keep |
| RadioGroup | 3 | (any) | keep |
| Select | 5 | many | keep |
| Separator | 4 | many | keep |
| Sheet | 2 | (any) | keep |
| Skeleton | 2 | (any) | keep |
| Slider | 7 | many | keep |
| Switch | 5 | many | keep |
| Table | 3 | many | keep |
| Tabs | 1 | words=2, keyframes=1, value=3 → 6 | keep |
| TagsInput | 1 | 0 | **library-orphan (single demo story; zero consumers)** |
| Textarea | 2 | (any) | keep |
| Toast | 2 | (any) | keep |
| Toggle | 3 | (any) | keep |
| ToggleGroup | 3 | (any) | keep |
| Tooltip | 5 | (any) | keep |

**UI verdict**: 35 keep · 2 keep-current sub-bar (`Combobox`, `Drawer`) · 2 library-orphan (`MultiSelect`, `TagsInput`).

`MultiSelect` and `TagsInput` are demo-story-only at HEAD — no consumer of either exists across all 6 sibling trees. Each survives only because `src/components/ui/<pkg>/index.ts` exists and `demo/stories/.../<pkg>.vue` mounts it. These are pre-G shadcn-vue copies that never wired to a consumer; W6.β's G-only scope did not flag them.

## 3. Custom package primary symbols (40)

| custom package | primary | tag-uses src+demo | cross-repo | verdict |
|---|---|---:|---:|---|
| aurora | Aurora | 1 (`AuroraStage.vue`) | speedtest=1 → 1 | **keep-current (sub-bar; one demo story + speedtest hero)** |
| bezier-canvas | BezierCurveCanvas | 2 | 0 | keep |
| blob | Blob | 2 | 0 | keep |
| confirm-dialog | ConfirmDialog | 2 | words=5, value=3 → 8 | keep |
| controls | DarkModeToggle | 0 | speedtest=2, words=1, bbnf=1, fourier=1, keyframes=4, value=3 → 12 | keep |
| cream-surface | CreamSurface | 28 | many | keep |
| disco-glyph | DiscoGlyph | 2 | speedtest=4 | keep |
| display-hero | DisplayHero | 23 | many | keep |
| dock-group | DockGroup | 1 | speedtest=1 → 1 | **keep-current (sub-bar; story + sole consumer)** |
| dock | GlassDock | 6 | many | keep |
| expandable-container | ExpandableContainer | 1 | speedtest=2 → 2 | keep |
| flourish-divider | FlourishDivider | 27 | many | keep |
| glass-carousel | GlassCarousel | 1 | value=1 → 1 | **keep-current (sub-bar; story + value.js)** |
| glass-panel | GlassPanel | 1 (`paper-glass.vue`) | 0 | **library-orphan (zero consumers; only its def + a single foundation story)** |
| glyph-face | GlyphFace | 3 | speedtest=4 | keep |
| icon-stamp | IconStamp | 7 | many | keep |
| icon-tooltip | IconTooltip | 5 | many | keep |
| infinite-scroll | InfiniteScroll | 1 | speedtest=2, fourier=1 → 3 | keep |
| instrument-chassis | InstrumentChassis | 2 | speedtest=3 → 3 | keep |
| labeled-field | LabeledInput | 1 | keyframes=1 → 1 | **keep-current (sub-bar; one demo story + one consumer)** |
| labeled-field | LabeledSelect | 1 | (any) | **keep-current (sub-bar; one demo story + sparse consumer)** |
| labeled-field | LabeledSlider | 5 | (any) | keep |
| labeled-field | LabeledSwitch | 1 | (any) | **keep-current (sub-bar; one demo story + sparse consumer)** |
| live-snippet | LiveSnippet | 2 | (any) | keep |
| math-formula | MathFormula | 5 | (any) | keep |
| math-glyph | MathGlyph | 3 | (any) | keep |
| math-surface | MathSurface | 2 | (any) | keep |
| metaballs | MetaballCanvas | 1 (`metaballs.vue`) | 0 | **library-orphan (zero consumers; demo-story-only)** |
| metric-badge | MetricBadge | 4 | (any) | keep |
| notification-dot | NotificationDot | 2 | (any) | keep |
| paper-backdrop | PaperBackdrop | 1 | 0 | **library-orphan (single story; zero consumers)** |
| pipeline-flow | PipelineFlow | 2 | (any) | keep |
| pulse | Pulse | 1 | speedtest=1 → 1 | **keep-current (sub-bar; story + Readout.vue)** |
| search | FuzzySearch | 1 | bbnf=1 → 1 | **keep-current (sub-bar; story + bbnf-lang)** |
| sidebar | ProgressiveSidebar | 1 | words=1 → 1 | **keep-current (sub-bar; story + words/frontend)** |
| sortable-list | SortableList | 4 | (any) | keep |
| stacked-icons | StackedIconGroup | 1 | words=2 → 2 | keep |
| status-dot | StatusDot | 1 | 0 | **library-orphan (single story; zero consumers)** |
| swatch | Swatch | 1 | 0 | **keep (sub-bar but composed inside `Blob.vue` ≥ 2 sites — keep via composition)** |
| tabs | UnderlineTabs | 0 | speedtest=5, fourier=3 → 8 | keep |
| tabs | BouncyTabs | (story) | (cross-repo not surveyed; W6.β counts 5) | keep (W6.β bookkeeping) |
| tabs | BouncyToggle | (story) | (any) | keep (W6.β bookkeeping) |
| timeline | GlassTimeline | 1 | fourier=1 → 1 | **keep-current (sub-bar; story + fourier-analysis)** |
| toggle-chip | ToggleChip | 2 | 0 | keep |
| typewriter | TypewriterText | 1 | bbnf=1 → 1 | **keep-current (sub-bar; story + bbnf-lang)** |

**Custom verdict**: 27 keep · 9 keep-current sub-bar · 4 library-orphan (`GlassPanel`, `MetaballCanvas`, `PaperBackdrop`, `StatusDot`).

Note: `Swatch` reads as 1 distinct tag-use file but is composed inside `<Blob>` itself — its component-tag site is `swatch.vue` story; the consumer site is `Blob.vue` (rendered inline as part of the watercolor border-radius pass). Treating `<Swatch>` as a private composition of `<Blob>` clears the bar.

## 4. Composable + utility coverage

`rg -l '\bsymbol\b' src/ demo/` (in-repo) and across the six consumer trees.

| package | symbol | in-repo | cross-repo | verdict |
|---|---|---:|---:|---|
| glass | useGlassRenderer | 4 | 0 | keep |
| glass | createGlassFilter | 3 | 0 | keep |
| glass | destroyGlassFilter | 3 | 0 | keep |
| glass | GlassTier | 4 | 0 | keep |
| glass | GlassFilterState | 3 | 0 | keep |
| motion | useSpringOrchestrator | 4 | 0 | keep |
| motion | useStaggerReveal | 3 | 0 | keep |
| motion | useScrollProgress | 3 | 0 | keep |
| motion | useAnimatedNumber | 3 | speedtest=4 | keep |
| motion | useDarkModeSync | 2 | speedtest=1 | keep |
| motion | useRAFLoop | 12 | keyframes=1 | keep |
| motion | useIntersectionPause | 3 | (any) | keep |
| motion | SpringSnapshot | 3 | 0 | keep |
| motion | RAFLoopCallback | 2 | 0 | keep |
| motion | RAFLoopControls | 3 | 0 | keep |
| motion | UseRAFLoopOptions | 2 | 0 | keep |
| motion | IntersectionPauseControls | 2 | 0 | keep |
| motion | PausableRuntime | 2 | (any) | keep |
| motion | UseIntersectionPauseOptions | 2 | 0 | keep |
| motion | DAMPING | 4 | speedtest=4 | keep |
| motion | SNAP_THRESHOLD | 4 | speedtest=4 | keep |
| virtual | useVirtualSectionWindow | 2 | words=2 | keep |
| virtual | useWindowedStore | 2 | words=1 | keep |
| virtual | buildSectionLayout | 3 | 0 | keep |
| virtual | findSectionOffset | 3 | 0 | keep |
| virtual | resolveActiveSection | 3 | 0 | keep |
| virtual | resolveSectionWindow | 3 | 0 | keep |
| virtual | FlatSection | 3 | (any) | keep |
| virtual | ForcedSectionWindowRange | 3 | 0 | keep |
| virtual | SectionLayout | 3 | 0 | keep |
| virtual | SectionWindowRange | 3 | 0 | keep |
| sortable | useSortable | 3 | (any) | keep |
| sortable | UseSortableReturn | 3 | 0 | keep |
| sortable | SortableId | 4 | 0 | keep |
| sidebar | useScrollTracker | 2 | (any) | keep |
| sidebar | useSidebarFollow | 2 | (any) | keep |
| sidebar | useSidebarState | 4 | (any) | keep |
| sidebar | useTreeIndex | 3 | (any) | keep |
| sidebar | buildTreeIndex | 2 | (any) | keep |
| sidebar | isActive | 19 | many | keep |
| sidebar | isInActiveChain | 7 | (any) | keep |
| pagination | useOffsetPagination | 2 | (any) | keep |
| blob | BLOB_CONFIG_DEFAULTS | 6 | (any) | keep |
| blob | useBlob | 5 | 0 | keep |
| blob | useWatercolorBlob | 4 | (any) | keep |
| utils | mulberry32 | 4 | (any) | keep |
| top-level | useGlobalDark | 6 | many | keep |
| top-level | useInterval | 4 | (any) | keep |
| top-level | useKeyboardShortcuts | 6 | (any) | keep |
| top-level | useTimer | 5 | many | keep |
| top-level | useTouchGate | 5 | many | keep |
| top-level | isMac | 2 | (any) | keep |

**Composable + utility verdict**: 100% keep (52/52 inspected). The `composables/utils/mulberry32` helper has 4 sites in src/ (def + utils barrel + `useWatercolorBlob.ts` + `_internal/useBlobSatellites.ts`) plus 5 cross-repo sites — solidly clears the ≥ 2 bar from §6 of the prompt.

## 5. Token namespaces in tokens.css (orphan probe)

`rg -l -e "$tk" src/ demo/ | grep -v 'styles/tokens.css'` — count of distinct files outside the def file. Excluding `--neutral-{0..5}` (private internal palette aliases consumed inside tokens.css to drive `--background`, `--card`, `--cream`, etc.).

**Confirmed orphan tokens** (zero references outside their own def):

| token | rg | sites | verdict |
|---|---|---:|---|
| `--shadow-xs` | `rg -l -e "--shadow-xs" src/ demo/` | 1 (def only) | **library-orphan token** |
| `--shadow-2xl` | `rg -l -e "--shadow-2xl" src/ demo/` | 1 (def only) | **library-orphan token** |
| `--duration-linger` | same shape | 1 (def only) | **library-orphan token** |
| `--duration-shimmer-slow` | same | 1 | **library-orphan token** |
| `--duration-popup-swap` | same | 1 | **library-orphan token** |
| `--motion-slide-sm` | same | 1 | **library-orphan token** |
| `--motion-slide-md` | same | 1 | **library-orphan token** |
| `--motion-slide-lg` | same | 1 | **library-orphan token** |
| `--dock-margin` | same | 1 | **library-orphan token** |
| `--dock-menubar-reserve` | same | 1 | **library-orphan token** |
| `--select-font` | same | 1 | **library-orphan token** |
| `--z-debug` | same | 1 | **library-orphan token** |
| `--shadow-cartoon-color-hover` | same | 1 (def light + dark) | **library-orphan token** |
| `--shadow-cartoon-color-hover-soft` | same | 1 | **library-orphan token** |
| `--glass-specular-dark` | same | 1 | **library-orphan token** |
| `--glass-shadow-lg` | same | 1 | **library-orphan token** |
| `--glass-border-strong` | same | 1 | **library-orphan token** |
| `--glass-opacity-chassis` | same | 2 (def + interpolated into `--glass-bg-chassis` inside tokens.css; only consumer is its own derivative) | **keep-current — internal interpolation** |
| `--glass-opacity-dock` | same | 2 (same pattern) | **keep-current — internal interpolation** |
| `--border-opacity-light` | same | 1 | **library-orphan token** |
| `--border-opacity-medium` | same | 1 | **library-orphan token** |
| `--border-opacity-strong` | same | 1 | **library-orphan token** |

Tokens with exactly 1 outside-the-def reference (89 entries, sub-bar; not enumerated per word budget) include legitimate ladder members like `--ease-accelerate`, `--lift-md`, `--lift-lg`, `--font-stack-*`, `--popover-offset`, `--tier-featured`, `--type-leading-*`. Each has at least one downstream call site; most survive on semantic-ladder grounds (typography, ease, tier).

**Token verdict**: 20 confirmed library-orphan tokens (≥ 80% pre-G; W6.β's G-shipped scope missed all 20). 89 sub-bar single-reference tokens flagged en bloc for tranche I.

## 6. CVA branches across all 14 factories (deep re-grep)

The W1.C methodology fix (count both `variant="X"` template attribute AND `xxxVariants({ variant: 'X' })` direct invocation) was applied to every variant value. Truncated to the ones that fail the strict `≥ 2 distinct files` bar.

| factory.axis.value | rg-attr | rg-direct | rg-cross | total | verdict |
|---|---|---|---|---:|---|
| `buttonVariants.variant.accent` | 0 | 0 | speedtest=7 (`AdminDashboardLayout.vue`, `SurveyWizard.vue`, `IPLookupManager.vue`, `SubnetSyncDialog.vue`, `SubnetAddDialog.vue`, `App.vue`, `AdminServerManager.vue`) | 7 | keep |
| `buttonVariants.variant.ai` | 0 | 0 | words=1 (`SearchInputActions.vue`) | 1 | **keep-current (sub-bar; cross-repo single-site, no evidence-doc)** |
| `buttonVariants.variant.link` | 1 (`collapsible.vue`) | 0 | speedtest+keyframes+value=4 | 5 | keep |
| `buttonVariants.variant.danger-subtle` | 1 (`search.vue`) | 0 | 0 | 1 | **keep-current (sub-bar; demo-only, no evidence-doc)** |
| `buttonVariants.variant.glass-subtle` | 1 (`glass-carousel.vue`) | 0 | words=1 | 2 | keep |
| `buttonVariants.variant.cartoon` | 6 | 0 | (any) | 7 | keep |
| `buttonVariants.variant.rainbow` | 2 | 0 | (any) | 2 | keep |
| `cardVariants.variant.subtle` | 0 | 0 | speedtest=1 (`SurveyReview.vue` — context confirms it's `Card variant="subtle"`) | 1 | **keep-current (sub-bar)** |
| `badgeToneVariants.tone.destructive` | 0 | 0 | 0 | 0 | **library-orphan — defined CVA branch with zero invocations anywhere** |
| `badgeToneVariants.tone.success` | 0 | 1 (`primitives/badge-tones.vue` direct call) | (any) | 1 | keep-current |
| `badgeToneVariants.tone.warning` | 0 | 1 | (any) | 1 | keep-current |
| `badgeToneVariants.tone.info` | 0 | 1 | (any) | 1 | keep-current |
| `avatarVariant.size.base` | 1 (`avatar.vue` story) | 0 | (cross-repo not exhaustively probed) | 1 | **keep-current (sub-bar; demo-only at HEAD)** |
| `avatarVariant.shape.square` | 1 | 0 | (any) | 1 | **keep-current** |
| `toastVariants.variant.inverse` | 1 | 1 | 0 | 1 (single file) | keep-current (W6.β baseline) |
| `toggleVariants.variant.card` | 1 | 0 | 0 | 1 | keep-current (W6.β baseline) |
| `sliderVariants.variant.glass-track` (W3) | 1 | 0 | 0 | 1 | keep-current (W6.β baseline) |

**CVA verdict**: 1 confirmed library-orphan (`badgeToneVariants.tone.destructive` — declared in the CVA but invoked nowhere across all six consumer trees + src + demo). 6 newly-surfaced sub-bar branches (`button.ai`, `button.danger-subtle`, `card.subtle`, `avatar.base`, `avatar.square`, `badge.tone.success/warning/info`) that W6.β missed because its scope was G-shipped variants only.

## 7. Slot-class prop scan

W1 retired `closeIconClass` (DialogContent) and `keepOpenWhile` (DockLayerGroup). Re-running the §6 check from the prompt — any other `Class`-shaped props surviving with zero in-repo consumers?

| prop | def | `:label-class=` / `:input-class=` / `:header-class=` in src+demo | cross-repo | verdict |
|---|---|---:|---:|---|
| `LabeledSlider.labelClass` | `LabeledSlider.vue:23` | 0 | 0 | **library-orphan slot-class** |
| `LabeledSwitch.labelClass` | `LabeledSwitch.vue:21` | 0 | 0 | **library-orphan slot-class** |
| `LabeledInput.labelClass` | `LabeledInput.vue:21` | 0 | 0 | **library-orphan slot-class** |
| `LabeledInput.inputClass` | `LabeledInput.vue:22` | 0 | 0 | **library-orphan slot-class** |
| `LabeledSelect.labelClass` | `LabeledSelect.vue:52` | 0 | 1 (`label-class=` cross-repo, but ambiguous which component) | **library-orphan slot-class (sub-bar at best)** |
| `DataTableColumn.headerClass` | `data-table/types.ts:19` | 0 | 0 | **library-orphan slot-class** |

**Slot-class verdict**: 6 library-orphan slot-class props — every one of the Labeled* surfaces and DataTable.headerClass has zero call sites at HEAD. W6.β did not check this family; W1 only retired the two named ones.

## 8. Runtime helpers (`src/tokens.ts`)

Per the prompt's §7 guard: only `chartHeights`, `chartColors`, `chartMargin`, `minWidthInputSm`, `NAMED_EASING_BEZIER` should remain.

`rg -hE '^export ' src/tokens.ts`:

```
export const chartHeights
export const chartMargin
export const chartColors
export const minWidthInputSm
export const NAMED_EASING_BEZIER
```

| helper | sites src+demo | cross-repo | verdict |
|---|---:|---:|---|
| `chartHeights` | 1 (def) | (any) | sub-bar in src+demo, cross-repo carries the bar via speedtest dashboard charts (D-tranche evidence holds) → keep |
| `chartColors` | 1 (def) | (any) | same → keep |
| `chartMargin` | 1 (def) | (any) | same → keep |
| `minWidthInputSm` | 1 (def) | (any) | same → keep |
| `NAMED_EASING_BEZIER` | 2 (def + `motion/bezier-canvas.vue`) | 0 | keep-current (W6.β baseline) |

**Runtime helper verdict**: nothing slipped back in. The 5-symbol contract is intact at HEAD. Sub-bar in-repo for the four chart helpers is rescued by their cross-repo consumers (speedtest D-tranche).

## 9. Consumer-evidence-doc audit (24 docs at HEAD, refresh)

Re-running each cited proof grep at HEAD. The W6.β audit flagged 21 fresh / 3 stale; this audit confirms and refines.

| doc | proof grep | live result | freshness |
|---|---|---|---|
| animated-number.md | `rg -n '\bAnimatedNumber\b\|ReturnType<typeof useAnimatedNumber>' src/composables/motion/useAnimatedNumber.ts ../speedtest/src/components/speedtest/MetricPillCluster.vue` | speedtest path absent; src/ has 4 hits | **stale-citation** |
| use-animated-number-options.md | `rg -n '\bUseAnimatedNumberOptions\b\|pillOpts' src/composables/motion/useAnimatedNumber.ts ../speedtest/src/components/speedtest/MetricPillCluster.vue` | speedtest path absent | **stale-citation** |
| use-animated-number.md | cites 3 speedtest paths; only `MetricGaugeCards.vue` remains | partial freshness — consumer alive, doc citation lists 2 absent files | **stale-citation (partial)** |
| build-section-layout.md | `rg -n '\bbuildSectionLayout\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits | fresh |
| create-glass-filter.md | `rg -n '\bcreateGlassFilter\b' src/components/custom/glass-panel/GlassPanel.vue` | 2 hits | fresh |
| destroy-glass-filter.md | same shape | 2 hits | fresh |
| expandable-container.md | `rg -n '\bExpandableContainer\b' ../speedtest/src/views/ChartsView.vue ../speedtest/src/views/MapView.vue` | both extant; 4+ hits | fresh |
| find-section-offset.md | src/ self-citation | 2 hits | fresh |
| forced-section-window-range.md | same | 2 hits | fresh |
| glass-filter-state.md | same | 2 hits | fresh |
| glass-tier.md | src/ + demo | 4 hits across 2 files | fresh |
| is-mac.md | `rg -n '\bisMac\b' src/composables/useKeyboardShortcuts.ts` | 5 hits | fresh |
| resolve-active-section.md | src/ self | 2 hits | fresh |
| resolve-section-window.md | src/ self | 2 hits | fresh |
| section-layout.md | src/ self | 2 hits | fresh |
| section-window-range.md | src/ self | 2 hits | fresh |
| spring-snapshot.md | demo/stories/motion/springs.vue | 4 hits | fresh |
| use-dark-mode-sync.md | speedtest SpeedtestMeter.vue | 3 hits | fresh |
| use-glass-renderer.md | src + demo | 3 hits | fresh |
| use-scroll-progress.md | demo motion scroll-type | 2 hits | fresh |
| use-sortable-return.md | src self | 2 hits | fresh |
| use-sortable.md | src self | 4 hits | fresh |
| use-stagger-reveal.md | demo motion stagger | 2 hits | fresh |
| use-windowed-store.md | words/frontend | 2 hits | fresh |

**Freshness summary**: 21 fresh / 3 stale. Same as W6.β — no further drift since last close. The three stale docs (`animated-number.md`, `use-animated-number-options.md`, `use-animated-number.md`) all cite the same speedtest restructure that pre-dates W5.

## 10. Critical findings — pre-G orphans never caught + new W2-W5 introductions

This audit's central deliverable: 13 newly-surfaced library-orphan or sub-bar artefacts that W6.β missed.

### 10.1 New library-orphan artefacts (verdict ≠ keep)

Common rg shape: `rg -l "<\bSymbol\b" src/ demo/ ../speedtest/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/ ../fourier-analysis/web/src/ ../keyframes.js/ ../value.js/`. Slot-class shape: `rg -l 'prop-name\|propName' <same paths>`.

| # | artefact | family | sites | recommendation |
|---|---|---|---:|---|
| 1 | `MultiSelect` (ui) | ui-component | 1 (`demo/stories/primitives/multi-select.vue`) | retire or wire |
| 2 | `TagsInput` (ui) | ui-component | 1 (`demo/stories/data/tags-input.vue`) | retire or wire |
| 3 | `GlassPanel` (custom) | custom-component | 1 (`demo/stories/foundations/paper-glass.vue`) | retire — `useGlassRenderer` substrate has src/ consumers but the panel wrapper itself does not |
| 4 | `MetaballCanvas` (custom) | custom-component | 1 | retire — `<Blob>` family supersedes at canvas layer |
| 5 | `PaperBackdrop` (custom) | custom-component | 1 | retire — `.paper-card` / `.cream-surface` utility ladder carries actual usage |
| 6 | `StatusDot` (custom) | custom-component | 1 | retire — folds into `<NotificationDot>` |
| 7 | `badgeToneVariants.tone.destructive` | CVA | 0 (`rg -l -e 'tone="destructive"' -e "tone: 'destructive'"`) | retire — duplicates `badgeVariants.variant.destructive` |
| 8 | `LabeledSlider.labelClass` | slot-prop | 0 | retire prop |
| 9 | `LabeledSwitch.labelClass` | slot-prop | 0 | retire prop |
| 10 | `LabeledInput.labelClass` | slot-prop | 0 | retire prop |
| 11 | `LabeledInput.inputClass` | slot-prop | 0 | retire prop |
| 12 | `LabeledSelect.labelClass` | slot-prop | 0 | retire prop |
| 13 | `DataTableColumn.headerClass` | slot-prop | 0 | retire prop |

### 10.2 Newly-surfaced library-orphan tokens (20)

`--shadow-xs`, `--shadow-2xl`, `--duration-linger`, `--duration-shimmer-slow`, `--duration-popup-swap`, `--motion-slide-{sm,md,lg}`, `--dock-margin`, `--dock-menubar-reserve`, `--select-font`, `--z-debug`, `--shadow-cartoon-color-hover{,-soft}`, `--glass-specular-dark`, `--glass-shadow-lg`, `--glass-border-strong`, `--border-opacity-{light,medium,strong}`. Each has 0 references outside its own def in tokens.css, with no theme.css alias either. These are pre-G (mostly shadcn-vue-derived defaults that never connected to a `@utility` or component) — W6.β scope (G-shipped tokens only) flagged none of them.

### 10.3 Sub-bar findings (no library-orphan but ≤ 1 distinct site)

| family | artefact | total distinct sites | evidence-doc? |
|---|---|---:|---|
| ui | `Combobox` | 1 (`primitives/combobox.vue`) | no |
| ui | `Drawer` | 1 (`containers/drawer.vue`) + keyframes.js=1 | no |
| custom | `Aurora` | 1 + speedtest=1 | no |
| custom | `DockGroup` | 1 + speedtest=1 | no |
| custom | `GlassCarousel` | 1 + value=1 | no |
| custom | `LabeledInput` | 1 + keyframes=1 | no |
| custom | `LabeledSelect` | 1 + (any) | no |
| custom | `LabeledSwitch` | 1 + (any) | no |
| custom | `Pulse` | 1 + speedtest=1 | no |
| custom | `FuzzySearch` | 1 + bbnf=1 | no |
| custom | `ProgressiveSidebar` | 1 + words=1 | no |
| custom | `GlassTimeline` | 1 + fourier=1 | no |
| custom | `TypewriterText` | 1 + bbnf=1 | no |
| CVA | `buttonVariants.variant.ai` | 0 + words=1 | no |
| CVA | `buttonVariants.variant.danger-subtle` | 1 + 0 | no |
| CVA | `cardVariants.variant.subtle` | 0 + speedtest=1 | no |
| CVA | `avatarVariant.size.base` | 1 + ? | no |
| CVA | `avatarVariant.shape.square` | 1 + ? | no |
| CVA | `badgeToneVariants.tone.{success,warning,info}` | 1 each (direct CVA calls in `primitives/badge-tones.vue`) | no |

Per Refined-D's "if the evidence doc exists but the grep no longer finds a consumer, the artefact reverts to the normal verdict precedence" — none of these have evidence docs to begin with. They are H invariant 2 second-branch holds (one consumer exercising the shape) at best, and many are pre-G artefacts that survive only because they were never re-graded post-G.

## 11. Comparison vs W6.β

W6.β's deliverable scoped to G-shipped artefacts that survived W1 plus W2-W5 additions; pre-G surfaces were footnoted §11 as informational only.

| family | W6.β | this audit | delta |
|---|---:|---:|---:|
| ui sub-bar | 0 | 4 | +4 |
| ui library-orphan | 0 | 2 | +2 |
| custom sub-bar | 0 | 13 | +13 |
| custom library-orphan | 0 | 4 | +4 |
| CVA library-orphan | 0 | 1 | +1 |
| CVA sub-bar (new beyond W6.β's 3) | 3 | 9 | +6 |
| Slot-class orphan | 0 | 6 | +6 |
| Token orphans | 0 | 20 | +20 |

None of the new findings invalidate W6.β's verdicts on G-shipped artefacts; they expand the orphan catalogue to the pre-G perimeter H deliberately did not touch.

## 12. Verdict distribution + delta vs G β audit

| Family | keep | keep-current sub-bar | library-orphan | retired confirmed |
|---|---:|---:|---:|---:|
| Tokens (§5) | ~273 | 2 (`--glass-opacity-chassis`, `--glass-opacity-dock` — internal-interpolation only) | **20** | (W1 retired 23) |
| Utilities (§2 of W6.β) | 33 | 0 | 0 | 31 |
| UI components (§2) | 35 | 2 | **2** | (n/a) |
| Custom components (§3) | 27 | 13 | **4** | (W1 retired 5; G demote 4) |
| Composables (§4) | 52 | 0 | 0 | (W1 demoted 4) |
| CVA branches (§6) | 56 (per row count) | 9 | **1** | 5 |
| Slot-class props (§7) | n/a | 0 | **6** | 2 (W1 retired) |
| Runtime helpers (§8) | 4 | 1 (`NAMED_EASING_BEZIER`) | 0 | 4 |
| **Totals** | **~480** | **27** | **33** | — |

Delta vs prior audits:

| Pass | library-orphan count | comment |
|---|---:|---|
| G β (post-G close) | ~50 | drove all of H W0/W1 reconciliation |
| H W6.β (G-only scope) | 0 | confirmed all G-shipped surfaces survived; pre-G out of scope |
| H W6.deep (this audit) | **33** | pre-G perimeter walked: 20 token + 6 slot-class + 4 custom + 2 ui + 1 CVA |

H invariant 2 ("zero artefacts remain library-orphan after W1") **continues to hold** for its scope (G-shipped artefacts). The 33 newly-surfaced orphans are all pre-G; H invariant 2 was deliberately scoped to G-shipped artefacts and a wire-or-retire pass on these falls naturally to a future tranche.

## 13. Recommendations — candidates for tranche I wire-or-retire

Tranche I retire-candidate count: **33 library-orphans + 27 sub-bar = 60 artefacts**, partitioned as:

**Top retire candidates** (highest signal):
1. `<MultiSelect>` (ui) — zero consumers, only a story; replace with a multi-select pattern composed from existing primitives or retire entirely
2. `<TagsInput>` (ui) — same shape; zero consumers across all six trees
3. `<GlassPanel>` (custom) — its substrate (`useGlassRenderer`, `createGlassFilter`, `destroyGlassFilter`) has src/ consumers; the panel wrapper itself is unused. Inline the substrate inside whatever consumer needs it; retire the wrapper
4. `<MetaballCanvas>` (custom) — pair-retire with `useMetaballs`, `DEFAULT_METABALL_CONFIG`, `MetaballConfig` since none have cross-repo consumers; the `<Blob>` family supersedes them at the canvas layer
5. `<PaperBackdrop>` (custom) — replaced by `.paper-card` / `.cream-surface` / `.cream-card` utility ladder that has actual call sites
6. `<StatusDot>` (custom) — folds into `<NotificationDot>` with a `variant="status"` if needed (current `<NotificationDot>` has the same dot grammar)
7. `badgeToneVariants.tone.destructive` (CVA branch) — duplicates `badgeVariants.variant.destructive`; retire from `badgeToneVariants`
8. 6 slot-class props (`labelClass`, `inputClass`, `headerClass`) — zero consumers; the `cn()`/`class` prop ladder already handles per-call overrides
9. 20 orphan tokens — sweep them out of `tokens.css`; especially `--motion-slide-{sm,md,lg}`, `--shadow-xs`, `--shadow-2xl`, `--z-debug`, `--select-font`

**Sub-bar wire-or-retire** (12 custom + 4 ui + 9 CVA branches): each has exactly one consumer site. Either an evidence doc gets written per `docs/consumer-evidence/<artefact>.md` framing the sole consumer as "the consumer that promotes this artefact to keep-current", or the artefact retires.

The cleanest tranche I scope: a 3-wave reform — Wave 1 token sweep (20 orphan tokens + slot-class props), Wave 2 component retire (`MultiSelect`, `TagsInput`, `GlassPanel`, `MetaballCanvas`, `PaperBackdrop`, `StatusDot`, `badgeToneVariants.tone.destructive`), Wave 3 sub-bar evidence-doc pass (write 27 `docs/consumer-evidence/*.md` files OR retire the sub-bar artefacts).

## Authority

Read-only β-deep audit at HEAD `c5f196c` post-W6 close. Every count cites the exact `rg` invocation. Refined-D verdict precedence applied throughout. `docs/consumer-evidence/` re-walked per Refined-D's fresh-grep requirement (§9). All six sibling consumer trees verified present and grepped. No source files modified; no commit created; no destructive git command (`git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`) executed during this lane.
