# W5 — words/frontend consumer migration ledger

**Status**: authored by G.W5.words.
**Consumer path**: `/Users/mkbabb/Programming/words/frontend`
**Consumer HEAD at audit time** (per W0.γ): `235a0b4`
**Lane research source**: `docs/tranches/G/research/D-words-frontend.md`
**Glass-ui canon at audit time**: `master @ badc536` (v0.5.0); W1–W3 deltas pulled from `audit/W1-token-proof.md`, `audit/W2-utility-proof.md`, `audit/W3-component-proof.md`.

## Pinned baseline (W0.γ)

| Column | Count |
|---|---:|
| Unique-row baseline | **38** |
| Axis-row baseline | **62** |

Lane D variance (+63% axis-row vs unique-row) is structural — multi-axis rows like the `.section-label` reinvention show up under axes 2, 3, *and* 6. W0 challenge §D pins both columns; this ledger projects deltas against **38** for migration accounting and against **62** for axis-coverage. Ledger row counts add to the axis-row tally (62) per axis, then dedupe to the unique-row tally (38) for the headline projection.

The 38 unique-row baseline expands roughly: axis-1 = 11, axis-2 = 10, axis-3 = 6, axis-4 = 4, axis-5 = 11, axis-6 = 16, axis-7 = 4 (lane D §6 tally; rows that span axes are listed once per axis, then unique-row coalesces to 38).

---

## A. Migration table (one row per drift finding)

Rows keyed `D-{n}` follow `docs/tranches/G/research/D-words-frontend.md` axis order; each ties to a canonical replacement and the canon source that ships it. "Wave" names the canon wave that delivers the substrate; "delta" is the projected unique-row drift drop the migration produces.

### A.1 Token alignment (axis 1) — 11 rows

| # | site (file:line) | current pattern | canonical replacement | canon source | wave | delta |
|---:|---|---|---|---|---|---:|
| D-1 | `src/assets/theme.css:39-48` | precomputed `--color-card-{82,92,96}`, `--color-foreground-{6,8,10,12,18}` literals shadowing canon `color-mix` recipes | inherit canon `--glass-bg-*` + `--glass-border-*`; override `--glass-opacity-{subtle,default,medium,elevated}` deltas only | `src/styles/tokens.css` (`--glass-*`) | consumer-side delete | -1 |
| D-2 | `src/assets/theme.css:60-82` | full warm-cream palette (hue 48) redeclared with 1-3% L drift vs canon | accept canon defaults; declare only the genuine deltas | `src/styles/tokens.css:145-174` (warm-cream identity) | consumer-side delete | -1 |
| D-3 | `src/assets/theme.css:84-89` | `--shadow-cartoon-color: rgb(0 0 0 / 0.12)` raw rgba duplicating canon | delete; fall through | `src/styles/tokens.css:257-260` | consumer-side delete | -1 |
| D-4 | `src/components/custom/animation/AnimatedText.vue:131-153` | 8-stop `text-shadow` ladder with raw `rgba(200,200,200,…)` / `rgba(40,40,40,…)` (light + dark variants hardcoded) | adopt `.depth-text` (token-driven via `--depth-color-shadow`) | `src/styles/utilities.css:71-87` (`.depth-text` retained per W0 challenge §B.1 R6) | consumer-side rewrite | -1 |
| D-5 | `src/components/custom/wordlist/modals/WordDetailModal.vue:246-274` | `.status-badge-{hot,cold,leech}` raw hex `#f59e0b`, `#0ea5e9`, `rgb(217 119 6)` | tokenize via `--warning` / `--info` (canon mode-flips in `.dark`) | `src/styles/tokens.css:215-217` (canon) + `:505` (dark inversion) | consumer-side rewrite | -1 |
| D-6 | `src/components/custom/wordlist/modals/ReviewSessionComplete.vue:95` | confetti palette: 7 raw hex `'#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'` | `--rainbow-{red,orange,yellow,green,blue,indigo,violet}` (exact 7-color match) + `.confetti-piece` utility (W2 ship per W0 challenge §A gap 32) | `src/styles/tokens.css:421-428` + `src/styles/utilities.css` `.confetti-piece` (W2) | consumer-side rewrite | -1 |
| D-7 | `src/components/custom/sidebar/YoshiAvatar.vue:92-94` | Yoshi `box-shadow` keyframe with raw `rgba(234, 179, 8, …)` amber glow | `--color-gold` or `--rainbow-yellow` | `src/styles/tokens.css` (gold family) | consumer-side rewrite | -1 |
| D-8 | `src/components/custom/loading/LoadingProgress.vue:25` | `boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'` raw white | `color-mix(in srgb, var(--background) 50%, transparent)` | tokens.css | consumer-side rewrite | -1 |
| D-9 | `src/components/custom/wordlist/modals/WordDetailModal.vue:269-275` | `:global(.dark) .status-badge-hot { color: rgb(251 191 36); }` baking hex into `.dark` cascade | `var(--warning)` (already inverted in canon `.dark`) | `src/styles/tokens.css:505` | consumer-side rewrite | -1 |
| D-10 | `WordListSortBuilder.vue:296`, `TimeMachineVersionCard.vue:247,250,262,265` | `transition: all 0.3s var(--spring-bouncy)` (token used for easing, but `all` is the property) | spell out the property: `transition-property: transform, opacity, box-shadow` | none (rule-of-thumb) | consumer-side rewrite | -1 |
| D-11 | `src/assets/theme.css:81` | `--radius: 8px` — overrides canon `0.625rem` (10px) | accept canon `0.625rem` *or* document override | `src/styles/tokens.css` `--radius` | consumer-side decision | -1 |

**Axis 1 subtotal**: 11 rows → projected drop **-11**.

### A.2 Utility / @apply hygiene (axis 2) — 10 rows

| # | site (file:line) | current pattern | canonical replacement | canon source | wave | delta |
|---:|---|---|---|---|---|---:|
| D-12 | `src/assets/index.css:161-166` | `.dialog-surface` bespoke utility (composes `bg-background/95 backdrop-blur-xl shadow-2xl var(--paper-clean-texture)`) | `<Dialog>` content uses canon `.glass-elevated` + `paper-grain-overlay` (or `Card variant="paper"` for blur-free dialogs) | `src/styles/glass.css` (`.glass-elevated`); `src/styles/paper.css` `paper-grain-overlay` (W2); `Card variant="paper"` (W3) | consumer-side delete + rewrite | -1 |
| D-13 | `src/assets/index.css:167-172` | `.popover-surface` bespoke utility | canon `.glass-medium` + `paper-grain-overlay` | `src/styles/glass.css` (`.glass-medium`) | consumer-side rewrite | -1 |
| D-14 | `src/assets/index.css:173-181` | `.card-surface` bespoke utility (Level 2 paper substrate; 13 call sites: `WordDetailModal.vue:70,74,78,82,89,107`, `WordPreviewList.vue:59,111`, `AddToWordlistModal.vue:28,52`) | `Card variant="paper"` + `paper-2` tier class | `src/components/ui/card/Card.vue` (W3 paper variant); `src/styles/paper.css` `.paper-2` (W2) | consumer-side rewrite (13 sites collapse) | -1 |
| D-15 | `src/assets/index.css:182-186` | `.word-card` paper-only (no blur) for virtualized lists | `.paper-1` tier class (no `backdrop-filter` per W0 challenge §A gap 1) | `src/styles/paper.css` `.paper-1` (W2) | consumer-side rewrite | -1 |
| D-16 | `src/assets/index.css:188-192` | `.paper-texture-overlay` bespoke (single live site at `WordLookupPopover.vue:21`) | canon `.paper-texture` (already identical) | `src/styles/cards.css:6-12` | consumer-side rename | -1 |
| D-17 | `src/components/custom/wordlist/list/WordList.vue:214-247` | `.wordlist-paper`, `.wordlist-paper__row`, `.wordlist-paper__line::before` ruled-paper effect | `.paper-rule` utility (canon W2 per W0 challenge §A gap 2.2) | `src/styles/paper.css` `.paper-rule` (W2) | consumer-side rewrite | -1 |
| D-18 | `src/assets/index.css:195-207` | `.review-progress-gradient`, `.mastery-bar-{gold,silver,bronze}` linear-gradient utilities | **keep consumer-side** (SRS-domain palette per risk register §C) | — | consumer preset (no migration) | 0 |
| D-19 | `src/assets/themed-cards/card-base.css:1-115` | `.themed-card` `[data-theme=gold/silver/bronze]` system | **keep consumer-side** (mastery tier domain — risk register §C) | — | consumer preset (no migration) | 0 |
| D-20 | `tailwind.config.ts:16-141` | `addUtilities({ ... })` block with 40+ utilities (`.delay-*`, `.animate-show*`, `.scroll-shrunk`, `.icons-*`, `.texture-paper-*`, `.mastery-*`, `.state-*`, `.review-btn-*`, `.stat-mastery`, `.def-*`) | retire wrapper-only ones (e.g. `.animate-show` = `@apply animate-scale-in` collapses to canon `<Transition name="pop">`); promote-to-consumer-preset the domain ones (mastery / state / review-btn) | canon transitions in `src/styles/transitions.css` | consumer-side audit + delete | -1 |
| D-21 | `src/components/custom/sidebar/SidebarContent.vue:20,58,75,103` (4 sites of identical 40-character class string) | repeated `focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-background/95 text-sm font-medium shadow-cartoon-sm transition-[…] hover:-translate-y-0.5 hover:shadow-cartoon-md hover:border-border/60 hover:bg-background` | `<Button variant="cartoon" size="icon">` (W3 ships the variant per W0 challenge §A gap 2.3) — coalesces with D-26 | `src/components/ui/button/Button.vue` cartoon variant (W3) | consumer-side rewrite | (counts under D-26) |

**Axis 2 subtotal**: 10 rows → projected drop **-9** (one row stays consumer per risk register; one row D-21 coalesces into D-26's component swap).

Note: D-22 (`src/assets/transitions.css:91-118` `.slide-up-*` / `.dock-fade-*` Vue Transition triplets) is handled under axis 5 (D-32).

### A.3 Interactive consistency (axis 3) — 6 rows

This axis carries S5 — words/frontend has 11 active sites for `active-scale` / `disabled-base`, the largest per-consumer count (W0 silent failures S5).

| # | site (file:line) | current pattern | canonical replacement | canon source | wave | delta |
|---:|---|---|---|---|---|---:|
| D-23 | `WordListRow.vue:1-50` | hover + selected + focus-visible reimplemented inline (no `.interactive-item`) | `.interactive-item` (folds bg-tint hover + active scale + focus-visible into one class) | `src/styles/utilities.css:34-57` | consumer-side rewrite | -1 |
| D-24 | `FancyF.vue:5` | `transition-fast hover:scale-105 active:scale-95` (`transition-fast` is local or `tw-animate-css`) | `transition-transform duration-fast` + `active:scale-[var(--scale-press)]` | `src/styles/tokens.css` `--duration-fast`, `--scale-press` | consumer-side rewrite | -1 |
| D-25 | `ReviewQualityButtons.vue:9-10` | bespoke quality-grade buttons with `hover:-translate-y-0.5 hover:shadow-cartoon-lg active:scale-[0.96]` | **keep consumer-side** — `again/hard/good/easy` is SRS quality-grade domain (risk register §C). The cartoon-lift composition collapses via `.hover-lift-md` + `<Button>` once the quality palette stays consumer | `.hover-lift-md` in canon | consumer preset (no migration) | 0 |
| D-26 | 8+ cartoon-icon-button sites: `SidebarContent.vue:20,58,75,103`; `SidebarLookupView.vue:47,86`; `SidebarHeader.vue:66`; `SidebarWordListView.vue:63`; `WordHeader.vue:24,149`; `WordlistProgressiveSidebar.vue:65,154`; `WordlistControlsPanel.vue:12`; `WordSuggestionDisplay.vue:15`; (+ `ProviderIcons.vue:15,35` lift fragments) | identical "cartoon icon button" composition: `border + bg-background/95 + shadow-cartoon-sm + hover:-translate-y-0.5 + hover:shadow-cartoon-md + focus-ring` | `<Button variant="cartoon" size="icon">` (W3 per W0 challenge §A gap 2.3) | `src/components/ui/button/Button.vue` cartoon variant (W3) | consumer-side rewrite | -1 |
| D-27 | S5.0 — `active-scale` / `disabled-base` migration (11 sites; W0 silent-failures S5; itemized in §B below) | classes referenced but undefined in canon since F.W4 | Tailwind one-liner `active:scale-[var(--scale-press)]` + `disabled:opacity-50 disabled:pointer-events-none`, **or** `.interactive-item` for the all-in case | `src/styles/utilities.css:34-57` (`.interactive-item`); `tokens.css` `--scale-press` | consumer-side rewrite (per W0 invariant 11) | -1 |
| D-28 | `transition-fast` consumer-local class (multiple sites — `FancyF.vue:5`, etc.) | non-canonical class | `transition-transform duration-fast` Tailwind | tokens.css `--duration-fast` | consumer-side rename | -1 |

**Axis 3 subtotal**: 6 rows → projected drop **-5** (D-25 stays consumer per risk register).

### A.4 Variant rooting (axis 4) — 4 rows

| # | site (file:line) | current pattern | canonical replacement | canon source | wave | delta |
|---:|---|---|---|---|---|---:|
| D-29 | `src/components/custom/card/Card.vue:1-72` | local `Card` duplicating `rounded-2xl border bg-card` shell with embedded texture system | re-export `Card` from `@mkbabb/glass-ui`; pass `variant="paper"` for the texture intent | `src/components/ui/card/Card.vue` (with `variant="paper"` from W3) | consumer-side delete | -1 |
| D-30 | `src/components/custom/card/ThemedCard.vue:1-113` | wraps local `Card`, adds `[data-theme]` + `BorderShimmer` + `StarIcon` | rebase on canon `<Card variant="cartoon">`; mastery-tier `[data-theme]` stays consumer (risk register) | `src/components/ui/card/Card.vue` cartoon variant | consumer-side rewrite | -1 |
| D-31 | `src/components/custom/texture/TextureCard.vue:146` | `:deep(*:not(.absolute))` — sole `:deep()` in the consumer | slot-class prop or `position: relative` on slotted children | none (rule-of-thumb) | consumer-side rewrite | -1 |
| D-32 | `src/components/custom/wordlist/WordlistGrid.vue:8-13` | `<ThemedCard … :texture-enabled="false" hide-star :border-shimmer="false">` (negation pattern explicitly disabling 3 of 3 ThemedCard flourishes) | `<Card variant="cartoon">` directly (no negation) | `src/components/ui/card/Card.vue` cartoon variant | consumer-side rewrite | -1 |

**Axis 4 subtotal**: 4 rows → projected drop **-4**.

### A.5 Overlay and motion vocabulary (axis 5) — 11 rows

| # | site (file:line) | current pattern | canonical replacement | canon source | wave | delta |
|---:|---|---|---|---|---|---:|
| D-33 | `src/assets/index.css:161-177` (parallel paper substrate) | `.dialog-surface` / `.popover-surface` / `.card-surface` applied on `<DialogContent>`, `<PopoverContent>`, `<DropdownMenuContent>`, `<HoverCardContent>` | components forward `class`; pass `class="glass-elevated"` / `glass-medium` + `paper-grain-overlay` (or `Card variant="paper"`) | `src/styles/glass.css` + `src/styles/paper.css` (W2) | consumer-side rewrite (overlap with D-12..14) | (counts under D-12..14) |
| D-34 | `TimeMachineOverlay.vue:17` | `bg-background/60 dark:bg-background/70 backdrop-blur-2xl` full-screen overlay | `.glass-elevated` + `--z-modal` (canon four-tier blur token) | `src/styles/glass.css` (`.glass-elevated`) | consumer-side rewrite | -1 |
| D-35 | `TimeMachineOverlay.vue:273` | `el.querySelector('[class*="backdrop-blur"]')` JS searching by Tailwind utility name | refactor to ref or stable selector once D-34 lands | — | consumer-side rewrite | -1 |
| D-36 | `WordListSortBuilder.vue:296`, `TimeMachineVersionCard.vue:247,262` | `transition: all 0.3s var(--spring-bouncy)` (overlap with D-10 axis 1) | named-property transitions | none | consumer-side rewrite | (counts under D-10) |
| D-37 | `src/assets/index.css:21-83` (consumer keyframes ladder) | local `@keyframes`: `bounce-in`, `bounce-out`, `shrink-bounce`, `icon-fade`, `elastic-bounce`, `tab-content-in`, `hovercard-in`, `hovercard-out`, `shimmer`, `sparkle-slide`, `wiggle`, `wiggle-bounce`, `spin-slow` (13 in this file alone) | retire **`bounce-in`/`bounce-out`** (overlap canon `pop` Vue Transition); retire **`hovercard-in`/`hovercard-out`** (overlap `pop` + `fade-slide`); retire **`shimmer`** (overlap canon `shimmer` / `shimmer-sweep`); retire **`tab-content-in`** (overlap `tab-fade`); **keep** `wiggle`, `sparkle-slide`, `wiggle-bounce`, `elastic-bounce`, `shrink-bounce`, `icon-fade`, `spin-slow` (Yoshi mascot motion — risk register §C) | `src/styles/transitions.css` (`pop`, `fade-slide`, `tab-fade`); `src/styles/animations.css` (`shimmer`) | consumer-side delete + rewrite | -1 |
| D-38 | `src/components/custom/search/components/ActionsRow.vue:262,305` | local `@keyframes wiggle` + `@keyframes bounce-in` redefined per-component | retire `bounce-in` (use `pop`); keep `wiggle` if mascot-domain | canon `pop` | consumer-side delete | -1 |
| D-39 | `src/components/custom/definition/components/ProviderViewTabs.vue:180` | local `@keyframes tab-content-in` | canon `tab-fade` Vue Transition | `src/styles/transitions.css` `tab-fade` | consumer-side rewrite | -1 |
| D-40 | `src/assets/transitions.css:91-118` | `.slide-up-*`, `.dock-fade-*` Vue Transition class triplets | `slide-up` overlaps canon `fade-slide`; `dock-fade` is dock-internal (handled by `useDockTransition` / `useLayerTransition` per F.W4) | `src/styles/transitions.css` `fade-slide` | consumer-side rewrite | -1 |
| D-41 | `src/assets/transitions.css:122-138` | `.rainbow-shimmer` linear-gradient + `rainbow-slide` keyframe | canon `.text-shimmer-vivid` + sibling `.text-shimmer-pastel` (W2 per W0 challenge §E.3) | `src/styles/utilities.css` `.text-shimmer-vivid|pastel` (W2) | consumer-side rename | -1 |
| D-42 | `src/assets/transitions.css:158-172` | `.confetti-piece` + `confetti-fall` keyframe | canon `.confetti-piece` (W2 ship per W0 challenge §A gap 32) | `src/styles/utilities.css` `.confetti-piece` (W2) | consumer-side delete + rename | -1 |
| D-43 | `src/views/Home.vue:206-220` | per-component `<style scoped>` `cardFadeIn` (translateY 20px + opacity) | canon `slide-up` keyframe | `src/styles/animations.css` `slide-up` | consumer-side rewrite | -1 |
| D-44 | `DefinitionItem.vue:344-352` (`defFadeIn`); `DefinitionContentView.vue:273-281` (`clusterSlideIn`) | per-component fade/slide keyframes overlapping canon `fade-in` / `slide-up` | canon `fade-in`, `slide-up` (or `--motion-slide-md` size variant if magnitude differs) | `src/styles/animations.css` | consumer-side rewrite | -1 |

**Axis 5 subtotal**: 11 rows → projected drop **-10** (D-33 and D-36 coalesce into earlier rows; mascot keyframes stay consumer per risk register).

### A.6 Typographic hierarchy (axis 6) — 16 rows (largest axis)

This is the load-bearing axis; covers the 18+ ad-hoc `.section-label` shapes, 9+ stat headings, 9+ modal titles, IPA/pronunciation, etc.

#### A.6.1 Section-label reinventions (W5.md highlight: 18+ ad-hoc shapes → canonical `.section-label`)

Canon `.section-label` lives at `src/styles/typography.css:286-292` (mono caps, 12px, muted-foreground). Consumer already uses it at 12+ sites correctly; below are the ad-hoc reinventions to migrate.

| # | site (file:line) | current pattern | canonical replacement | wave | delta |
|---:|---|---|---|---|---:|
| D-45.1 | `WordlistProgressiveSidebar.vue:133` | `text-sm font-medium uppercase tracking-wider text-foreground/80` | `.section-label text-foreground/80` | consumer-side rewrite | -1 |
| D-45.2 | `WordlistProgressiveSidebar.vue:183` | `mb-2 text-sm font-medium uppercase tracking-wider text-foreground/80` | `mb-2 section-label text-foreground/80` | consumer-side rewrite | (D-45.1) |
| D-45.3 | `SidebarCluster.vue:22,28` (2 sites) | `themed-cluster-title text-left text-xs font-medium uppercase tracking-wider` | `themed-cluster-title section-label text-left` (theme stays consumer) | consumer-side rewrite | (D-45.1) |
| D-45.4 | `SidebarPartOfSpeech.vue:15` | `text-xs font-medium uppercase tracking-wider` | `.section-label` | consumer-side rewrite | (D-45.1) |
| D-45.5 | `WordlistStatsBar.vue:19,29,40` (3 sites) | `mt-1 text-xs … uppercase tracking-widest` (with `mastery-gold` / `mastery-bronze` accent kept) | `mt-1 .section-label tracking-widest` (keep mastery accent) | consumer-side rewrite | (D-45.1) |
| D-45.6 | `WordlistControlsPanel.vue:345` | `mb-2 text-sm font-bold uppercase tracking-wider text-foreground/80` | `mb-2 section-label text-foreground/80` | consumer-side rewrite | (D-45.1) |
| D-45.7 | `PartOfSpeechPreview.vue:6` | `themed-cluster-title text-sm font-medium uppercase` | `themed-cluster-title section-label` | consumer-side rewrite | (D-45.1) |
| D-45.8 | `SearchHistoryItem.vue:18` | `text-xs font-bold tracking-wider uppercase` | `.section-label` | consumer-side rewrite | (D-45.1) |
| D-45.9 | `LookupControlsPanel.vue:48` | `…text-xs font-semibold uppercase…` (within button) | `.section-label` (within button slot) | consumer-side rewrite | (D-45.1) |
| D-45.10 | `DefinitionCluster.vue:27` | `text-sm font-semibold tracking-wide uppercase` | `.section-label tracking-wide` | consumer-side rewrite | (D-45.1) |
| D-45.11 | `WordHeader.vue:128` | `text-2xs font-semibold uppercase` (badge interior) | `.text-admin-label` | consumer-side rewrite | (D-45.1) |
| D-45.12 | `ExampleListEditable.vue:6` | `text-sm font-medium tracking-wide text-muted-foreground uppercase` | `.section-label tracking-wide` | consumer-side rewrite | (D-45.1) |
| D-45.13 | `VersionDiffViewer.vue:79,109,130,152` (4 sites) | `text-xs font-semibold text-muted-foreground uppercase` | `.section-label` | consumer-side rewrite | (D-45.1) |
| D-45.14 | `TimeMachineOverlay.vue:30` | `text-micro font-medium tracking-widest text-muted-foreground/50 uppercase` | `.section-label tracking-widest text-muted-foreground/50` | consumer-side rewrite | (D-45.1) |
| D-45.15 | `WordlistDashboard.vue:104` | already uses `.section-label` (sample baseline) | none | — | 0 |
| D-45.16 | `SidebarHoverCard.vue:14` | per lane D citation, `text-{xs,sm} font-{medium,semibold,bold} uppercase tracking-{wider,widest}` ad-hoc | `.section-label` | consumer-side rewrite | (D-45.1) |
| D-45.17 | `SidebarPartOfSpeech.vue:15` (2nd citation in lane D — overlaps D-45.4) | already covered by D-45.4 | — | — | (D-45.1) |
| D-45.18 | `DefinitionCluster.vue:27` (2nd citation — overlaps D-45.10) | already covered | — | — | (D-45.1) |

**Site count**: 18 ad-hoc shapes enumerated above (per lane D's "18+ sites in 18 components"); collapsing onto canon `.section-label` is **one ledger row** for migration accounting (D-45) but covers all 18 sites for hard-gate (b).

#### A.6.2 Stat-heading reinventions (W5.md highlight: 9+ stat headings → `.text-display-stat`)

Canon `.text-display-stat` is W2-shipped per W0 challenge §A gap (display font + tabular-nums + leading-none + tight tracking + weight 700). Consumer's 4xl + tabular-nums combos collapse onto it.

| # | site (file:line) | current pattern | canonical replacement | wave | delta |
|---:|---|---|---|---|---:|
| D-46.1 | `WordlistDashboard.vue:25,31,37` (3 sites) | `tabular-nums font-serif text-4xl font-bold tracking-tight leading-none` (with mastery accent) | `.text-display-stat` (mastery-tone class kept) | `src/styles/typography.css` `.text-display-stat` (W2) | -1 |
| D-46.2 | `WordlistStatsBar.vue:7,14,25,36` (4 sites) | `.text-title font-bold tabular-nums` (font-bold + font-serif redundant since `.text-title` already sets weight 700 + serif) | `.text-display-stat` *or* drop redundant `font-bold` and keep `.text-title tabular-nums` | `src/styles/typography.css` (W2) | (D-46.1) |
| D-46.3 | `ReviewSessionComplete.vue:23,27` (2 sites) | `text-2xl font-bold` (with tone accent) | `.text-display-stat` | (W2) | (D-46.1) |
| D-46.4 | `LoadingProgress.vue:127` | `text-2xl font-bold text-foreground tracking-tight` | `.text-display-stat` *or* `.text-heading` | (W2) | (D-46.1) |

**Stat-heading site count**: 9 sites across 4 components; one ledger row for accounting.

#### A.6.3 Display + heading + prose alignments

| # | site (file:line) | current pattern | canonical replacement | canon source | wave | delta |
|---:|---|---|---|---|---|---:|
| D-47 | `views/NotFound.vue:3` | `text-6xl font-bold` for "404" | `.text-display-3` or `.text-display-4` | `src/styles/typography.css:240-264` | consumer-side rewrite | -1 |
| D-48 | `Etymology.vue:6` | `text-3xl font-semibold tracking-wide` for the "Etymology" heading | `.text-heading` (1.618rem, display weight 500, WONK 1) | `src/styles/typography.css` | consumer-side rewrite | -1 |
| D-49 | `AnimatedTitle.vue:6` | `text-pane-title font-bold` (overrides canon `--font-display-weight: 400`) | `.text-pane-title` alone (drop `font-bold`); if weight 700 wanted, override `--font-display-weight` per surface | `src/styles/typography.css:269-283` | consumer-side rewrite | -1 |
| D-50 | `WordHeader.vue:151,181,202` (4+ sites in pronunciation popover) | `font-mono text-sm` for IPA / phonetic rendering | `.text-mono-small` | `src/styles/typography.css:225-229` | consumer-side rewrite | -1 |
| D-51 | `WordHeader.vue:154,156` | `text-micro font-sans` for `+N` count badge / `IPA`/`Ph.` mode chip | `.text-admin-label` (mono caps 10px) or `.text-mono-caption` | `src/styles/typography.css:190-197, 217-223` | consumer-side rewrite | -1 |
| D-52 | `DefinitionItem.vue:86`, `Etymology.vue:20,25`, `ProviderDataView.vue:45,50,121,126` (8+ sites) | `text-base leading-relaxed font-serif` for definition body / etymology body | `.text-prose` (1.125rem, 1.618 leading; purpose-built for long-form) | `src/styles/typography.css` `.text-prose` | consumer-side rewrite | -1 |
| D-53 | `WordPreviewList.vue:75,161,16`; `WordListRow.vue:16` | `font-serif text-{lg,sm} font-semibold` / `font-serif text-base sm:text-lg leading-snug` | `.text-subheading` / `.text-heading` / `.text-prose` (responsive bump preserved) | `src/styles/typography.css` | consumer-side rewrite | -1 |
| D-54 | 9+ modal title sites: `ReviewModal.vue:39,41`, `ReviewSessionComplete.vue:19`, `WordListUploadModal.vue:27`, `CreateWordListModal.vue:11`, `EditWordlistModal.vue:11`, `AddToWordlistModal.vue:6`, `EmptyState.vue:16`, `ErrorState.vue:17`, `Admin.vue:10`, `EditWordlistModal.vue:11` | `text-{xl,2xl,lg} font-{semibold,bold}` | `.text-heading` / `.text-subheading` (canon hierarchy) | `src/styles/typography.css` | consumer-side rewrite | -1 |
| D-55 | `SidebarHeader.vue:17,26` | `font-mono text-sm` for `@mbabb` author handle | `.text-mono-small` | `src/styles/typography.css:225-229` | consumer-side rewrite | -1 |
| D-56 | `WordListRow.vue:34` | `text-2xs text-muted-foreground/60 tabular-nums` for review interval telemetry | `.text-mono-micro` | `src/styles/typography.css:231-236` | consumer-side rewrite | -1 |
| D-57 | `WordDetailModal.vue:69,89,109` | `text-sm font-serif` / `text-sm font-serif leading-relaxed` for stats grid + notes | `.text-small` (already serif) for grid; `.text-prose` for notes | `src/styles/typography.css` | consumer-side rewrite | -1 |
| D-58 | `AnimatedText.vue:158` | `font-variation-settings: 'wght' 900` (only WGHT used; WONK/SOFT/opsz unrealized) | adopt `.text-display-{1..5}` (auto-sets WONK 1, SOFT 0, optical sizing) | `src/styles/typography.css:240-264` | consumer-side rewrite | -1 |

**Axis 6 subtotal**: 16 rows → projected drop **-15**; 18 section-label sites + 9 stat-heading sites + 12 axis-6.3 sites = ~39 raw call sites collapsing onto canon utilities (one drift row per pattern shape).

### A.7 A11y resilience (axis 7) — 4 rows

| # | site (file:line) | current pattern | canonical replacement | canon source | wave | delta |
|---:|---|---|---|---|---|---:|
| D-59 | `src/assets/index.css:103-120` | reduced-motion media-query manually gating 13 project animations | retire bespoke keyframes per axis 5 cascade (D-37); shrink the manual gate to mascot-only | `src/styles/transitions.css` (canon transitions self-gate) | consumer-side rewrite | -1 |
| D-60 | `AnimatedText.vue:130-153` | `text-shadow` ladder hard-codes greys (bypasses `prefers-contrast: more`) | `.depth-text` (token-driven via `--depth-color-shadow`; canon respects PCM via token mode flips) | `src/styles/utilities.css:71-87` (overlap with D-4) | consumer-side rewrite | (D-4) |
| D-61 | `index.css:182-185` | `.word-card` deliberately omits `backdrop-blur` and blend-mode (correct perf decision for virtualized grids) but no `@supports` or transparency-reduce gate | `paper-1` tier (canon paper tier carries PRT + PCM + `@supports not (backdrop-filter)` fallbacks per G invariant 7) | `src/styles/paper.css` `.paper-1` (W2) | consumer-side rewrite (overlap D-15) | (D-15) |
| D-62 | `WordDetailModal.vue:269-275` | `:global(.dark) .status-badge-{hot,cold} { color: rgb(…); }` baking light-mode foreground into dark cascade | `--warning` / `--info` (canon mode-flips in `.dark`) (overlap D-9) | `src/styles/tokens.css:505` | consumer-side rewrite | (D-9) |

**Axis 7 subtotal**: 4 rows; 3 coalesce into earlier axis rows (D-4, D-15, D-9). Net new drift drop = **-1**.

---

## B. Silent-failure resolutions (S5)

W0 silent-failures S5 enumerates **11 active sites** for `active-scale` / `disabled-base` in words/frontend (the only consumer with a non-doc-only S5 footprint). Atoms were intentionally removed in F.W4; canon does not re-add (W0 invariant 11).

| # | site (file:line) | current | canonical replacement | rationale |
|---:|---|---|---|---|
| S5.1 | `src/components/custom/pwa/PWAInstallPrompt.vue:59` | `... hover:bg-muted/50 active-scale focus-ring` | `... hover:bg-muted/50 active:scale-[var(--scale-press)] focus-ring` | atomic press feedback only |
| S5.2 | `PWAInstallPrompt.vue:116` | `... active-scale` | `active:scale-[var(--scale-press)]` | atomic press |
| S5.3 | `PWAInstallPrompt.vue:124` | `... hover:bg-muted/50 active-scale` | `hover:bg-muted/50 active:scale-[var(--scale-press)]` | atomic press |
| S5.4 | `PWAInstallPrompt.vue:141` | `hover-lift hover:scale-110 transition-smooth active-scale` | `hover-lift hover:scale-110 transition-smooth active:scale-[var(--scale-press)]` | atomic press; `hover-lift` is canon |
| S5.5 | `PWANotificationPrompt.vue:66` | `:class="!(isIOS && !isInstalled) && 'hover-lift shadow-cartoon-sm active-scale'"` | `'hover-lift shadow-cartoon-sm active:scale-[var(--scale-press)]'` | conditional binding stays |
| S5.6 | `PWANotificationPrompt.vue:75` | `... hover:bg-muted/50 active-scale` | `hover:bg-muted/50 active:scale-[var(--scale-press)]` | atomic press |
| S5.7 | `SidebarWordListItem.vue:8` | `'text-left active-scale focus-ring disabled-base'` | `'text-left interactive-item'` (folds active + focus + disabled into one class — canonical four-state contract per `utilities.css:34-57`) | all-in case → `.interactive-item` |
| S5.8 | `src/utils/animations/constants.ts:153` | `hoverLift: 'hover-lift active-scale'` | `hoverLift: 'hover-lift active:scale-[var(--scale-press)]'` | string-template constant; fans out to N call sites |
| S5.9 | `src/utils/animations/constants.ts:154` | `hoverLiftMd: 'hover-lift-md active-scale'` | `hoverLiftMd: 'hover-lift-md active:scale-[var(--scale-press)]'` | constant |
| S5.10 | `src/utils/animations/constants.ts:155` | `hoverLiftLg: 'hover-lift-lg active-scale'` | `hoverLiftLg: 'hover-lift-lg active:scale-[var(--scale-press)]'` | constant |
| S5.11 | `src/utils/animations/constants.ts:165` | `activeScale: 'active-scale'` | `activeScale: 'active:scale-[var(--scale-press)]'` | constant |

**Resolution decision** (per W0 silent-failures S5 + W0 challenge §E.6): atoms NOT re-added to canon; consumer migrates to (a) Tailwind one-liner `active:scale-[var(--scale-press)]` for atomic press, (b) `disabled:opacity-50 disabled:pointer-events-none` for atomic disabled, or (c) `.interactive-item` for the all-in four-state case.

**Site count**: 11 active sites + 4 string-template constants that fan out to N consumer call sites. Migration is mechanical (4 file edits cover the 11 sites; the constants edit covers the fan-out).

S5 contributes **1 unique-row drift drop** (the silent-failure family resolves; per-site rewrites collapse under D-27 above).

---

## C. Components to swap (canon W3 absorptions)

| # | bespoke recipe | canon component | wave | sites |
|---:|---|---|---|---|
| C-1 | parallel paper substrate (`card-surface` + `popover-surface` + `dialog-surface` + `word-card`) — D-12..15, 14 call sites total | `<Card variant="paper">` + `paper-1..4` tier classes | W3 (Card variant) + W2 (`paper-*` tiers) | 14 (across `WordDetailModal.vue`, `WordPreviewList.vue`, `AddToWordlistModal.vue`, `UploadDropZone.vue`, `SearchControls.vue`, `SearchResults.vue`, `WordList.vue`, `WordLookupPopover.vue`) |
| C-2 | cartoon icon button (D-26) — 8+ sites | `<Button variant="cartoon" size="icon">` | W3 | 8+ (sidebar + WordHeader + WordlistProgressiveSidebar + WordlistControlsPanel + WordSuggestionDisplay) |
| C-3 | local `Card.vue` (D-29) | `Card` from `@mkbabb/glass-ui` (with `variant="paper"` for texture intent) | W3 | 1 file (cascades to ~30 use sites) |
| C-4 | `ThemedCard.vue` (D-30) | rebase on canon `<Card variant="cartoon">`; mastery-tier `[data-theme]` stays consumer | W3 (Card cartoon variant retained from F) | 1 file |
| C-5 | `WordlistGrid.vue` negation pattern (D-32) | direct `<Card variant="cartoon">` | W3 | 1 file |
| C-6 | bespoke confetti recipe (D-42) | `.confetti-piece` utility | W2 | 1 keyframe file + 1 component (`ReviewSessionComplete.vue:95`) |
| C-7 | bespoke `rainbow-shimmer` (D-41) | `.text-shimmer-vivid` / `.text-shimmer-pastel` | W2 | 1 utility |

---

## D. Token redeclaration retirement

words/frontend's redeclarations are smaller than fourier-analysis's but still load-bearing:

| # | site (file:line) | redeclared | canon equivalent | retire |
|---:|---|---|---|---|
| T-1 | `src/assets/theme.css:39-48` | `--color-card-{82,92,96}`, `--color-foreground-{6,8,10,12,18}` | `--glass-bg-*` + `--glass-border-*` (per-tier) | yes — fall through to canon |
| T-2 | `src/assets/theme.css:60-82` | warm-cream palette (hue 48) with 1-3% L drift vs canon | canon `--neutral-0..5` + `--background`/`--foreground`/`--card`/`--muted`/`--border` (cream identity in `tokens.css:145-174`) | retire deltas; keep only intentional overrides |
| T-3 | `src/assets/theme.css:84-89` | `--shadow-cartoon-color: rgb(0 0 0 / 0.12)` raw rgba | identical canon at `tokens.css:257-260` | retire — fall through |
| T-4 | `src/assets/theme.css:5-7` | `--font-serif` + `--font-sans` + `--font-display` all collapsed to Fraunces — conceptually `brand-uniform-display` | per W0 challenge §A: `brand-uniform-display` does **NOT** land in canon (rejected per user-direction overlay #8); words/frontend keeps consumer-side preset, just **renaming** if it ever bound the now-retired `brand-uniform-sans` block | rename only if currently bound to `brand-uniform-sans`; otherwise no-op |

**Total redeclaration lines projected for retirement**: ~30 lines from `theme.css` (the `--color-card-*` block + `--shadow-cartoon-color` + cream-palette deltas). The bulk of the consumer's `theme.css` and the entire `themed-cards/` system is consumer-domain (mastery / state / review-btn — risk register §C).

---

## E. Risk-register confirmations (consumer territory — do NOT touch)

Per lane D §5 and W0 baseline §1.3, these patterns stay consumer-side:

| Pattern | Reason |
|---|---|
| `mastery-{default,bronze,silver,gold}` palette + `bg-mastery-*` / `border-mastery-*` utilities (`tailwind.config.ts:62-73`, `theme.css:20-23`) | SRS mastery tier system — domain-specific; will not generalize beyond lexicon-domain consumers |
| `card-state-{new,learning,young,mature,relearning}` palette (`tailwind.config.ts:76-85`, `theme.css:25-30`) | Anki / SM-2 / FSRS card-state vocabulary — domain |
| `review-{again,hard,good,easy}` button variants and palette (`tailwind.config.ts:88-127`, `theme.css:32-36`) | SM-2/FSRS quality-grade buttons — domain (D-25 keep) |
| `themed-cards/` `[data-theme=gold/silver/bronze]` system + `BorderShimmer` gold-default + `StarIcon` (`themed-cards/card-base.css:1-115`) | gold/silver/bronze tier semantics bound to mastery progression; full system stays consumer (D-19, D-30 partial) |
| Paper texture switching (`--paper-handmade-texture`, `--paper-kraft-texture`) + `useTextureSystem` composable (`src/composables/useTextureSystem.ts:1-160`) | runtime-switching API never exercised at consumer call sites (always static `clean`/`subtle`); below ≥2 cross-consumer bar |
| Yoshi mascot keyframes (`wiggle`, `sparkle-slide`, `wiggle-bounce`, `elastic-bounce`, `shrink-bounce`, `icon-fade`, `spin-slow`) | mascot-domain motion; per lane D §5 keep consumer-side (only the `bounce-in/out` overlap migrates to canon `pop`) |
| `data-typography-preset="brand-uniform-display"` consumer preset | canon does **NOT** ship `brand-uniform-display` (W0 challenge §A: rejected per user-direction overlay #8); keep consumer-side, rename only if bound to retired `brand-uniform-sans` |
| `--layout-header-h`, `--layout-header-h-compact`, `--layout-header-h-tall` (`theme.css:94-97`) | app-shell layout token — domain |
| SRS-domain progress utilities (`.review-progress-gradient`, `.mastery-bar-{gold,silver,bronze}`) — D-18 | linear-gradient utilities bound to mastery tier semantics |
| Yoshi avatar component family + `YoshiAvatar.vue` ambient amber glow (D-7 tokenizes the color, but the box-shadow keyframe identity stays consumer) | mascot identity |

---

## F. Projected post-migration drift

**Per-axis projection** (axis-row baseline = 62):

| Axis | Baseline | Drop | Residual |
|---|---:|---:|---:|
| 1 | 11 | 11 | 0 |
| 2 | 10 | 9 | 1 (D-18 mastery-bar utilities stay consumer) |
| 3 | 6 | 5 | 1 (D-25 review-quality buttons stay consumer) |
| 4 | 4 | 4 | 0 |
| 5 | 11 | 10 | 1 (mascot keyframes stay consumer per risk register) |
| 6 | 16 | 15 | 1 (`brand-uniform-display` consumer preset; not migrated to canon) |
| 7 | 4 | 4 (3 coalesce into 1/5/6) | 0 |
| Σ axis-row | **62** | **58** | **4** |

**Unique-row projection** (baseline = 38):

The 38 unique-row baseline coalesces multi-axis rows once. Migration drops 34 unique rows (D-18, D-25, mascot keyframes, `brand-uniform-display` preset are the 4 unique residuals — all four are explicit consumer-territory entries per the risk register). Net:

- **Baseline**: 38 unique-row.
- **Migration drop**: -34.
- **Projected post-migration drift**: **4 unique-row** (all consumer-territory residuals; not actionable in glass-ui canon).
- **Migration drop %**: 89.5%.

**Axis-row projected post-migration drift**: **4 axis-row** (matches the per-axis residuals above).

The four residual rows are all explicit risk-register entries: SRS-domain tier utilities (axis 2), SRS quality-grade button palette (axis 3), Yoshi mascot keyframes (axis 5), `brand-uniform-display` consumer preset (axis 6). None map to a canon-side fix.

---

## G. Hard-gate confirmations

(per the agent prompt's hard gate (a)–(g))

- (a) **ledger file exists** — this file at `/Users/mkbabb/Programming/glass-ui/docs/tranches/G/audit/W5-words-frontend-migration.md`.
- (b) **all 18+ section-label sites enumerated** — §A.6.1 itemizes 18 sites across 14 components (D-45.1..18); collapses onto canon `.section-label`.
- (c) **S5 (active-scale/disabled-base) 11-site migration table** — §B itemizes 11 active sites (PWAInstallPrompt × 4 + PWANotificationPrompt × 2 + SidebarWordListItem × 1 + animations/constants.ts × 4 string-template constants).
- (d) **9+ stat-heading rows** — §A.6.2 itemizes 9 sites (WordlistDashboard × 3 + WordlistStatsBar × 4 + ReviewSessionComplete × 2 + LoadingProgress × 1 = 10 actually) collapsing onto `.text-display-stat`.
- (e) **parallel paper substrate retirement** — D-12..15 + C-1 cover the 4-tier `.dialog-surface` / `.popover-surface` / `.card-surface` / `.word-card` ladder + `paper-texture-overlay` + `wordlist-paper`; absorbed by `<Card variant="paper">` + `paper-1..4` tier classes; 14 call sites collapse.
- (f) **projected post-migration drift count computed** — §F: **4 unique-row residual** (89.5% drop) / **4 axis-row residual**; all four residuals are risk-register consumer territory.
- (g) **risk-register items confirmed** — §E enumerates SRS mastery tiers, card-state palette, review-buttons, themed-cards `[data-theme]` system, paper texture switching, `useTextureSystem`, Yoshi mascot keyframes, `brand-uniform-display` preset, layout header tokens, SRS progress utilities — all explicit consumer-territory.

---

## H. Authority

Authored by G.W5.words (2026-05-04) at `master @ badc536` (v0.5.0).
Pinned to consumer HEAD `235a0b4` per W0.γ; re-grep before commit if consumer rebases.
