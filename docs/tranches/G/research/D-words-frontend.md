# Tranche G — Research Lane D — words/frontend

Scope: `/Users/mkbabb/Programming/words/frontend/` (all four slices: `ui/` is absent so consumer slice (a) collapses; custom + views + styles all covered). Glass-ui canon: `master @ badc536`. Read-only audit; only the report file is written.

The consumer is the most prose-typographic in the portfolio: dictionary entries, etymology, IPA/phonetic pronunciations, definition clusters, mastery tiers, review cards. Its evidence on `paper`, `cream`, and `bold/audacious large type` is load-bearing for tranche G — but the consumer reinvented a parallel paper system rather than overriding glass-ui's, and that fork is the dominant theme of this report.

---

## 1. Drift findings (axes 1–7)

### Axis 1 — Token alignment

| File:line | Drift | Canonical replacement |
|---|---|---|
| `src/assets/theme.css:39-48` | Pre-computed `--color-card-82/92/96`, `--color-foreground-{6,8,10,12,18}` literals shadow the canonical `color-mix` recipes glass-ui already exposes via `--glass-bg-*` and `--glass-border-*` per tier | Override `--glass-opacity-{subtle,default,medium,elevated}` instead; consume `--glass-bg-*` and `--glass-border-*` |
| `src/assets/theme.css:60-82` | Light-mode color palette redeclared with per-token HSL — `--background hsl(48 15% 98%)`, `--foreground`, `--card`, `--muted`, etc. are exactly the *same shape* as glass-ui's warm-cream defaults at `tokens.css:145-174`, but slightly different L* values | Either set only the deltas, or accept the canon — the consumer's `--background hsl(48 15% 98%)` vs canon `hsl(48 12% 98%)` is 3% saturation drift with no rationale |
| `src/assets/theme.css:84-89` | `--shadow-cartoon-color: rgb(0 0 0 / 0.12)` raw rgba duplicates `tokens.css:257-260` exactly; consumer has not overridden, just restated | Delete — fall through to canon |
| `src/components/custom/animation/AnimatedText.vue:131-153` | `text-shadow` ladder uses `rgba(200, 200, 200, …)` and `rgba(40, 40, 40, …)` raw literals across 8 stops × 2 modes | `--depth-color-shadow` token — glass-ui already exposes `.depth-text` at `utilities.css:71-87` with this exact pattern token-driven |
| `src/components/custom/wordlist/modals/WordDetailModal.vue:246-274` | `.status-badge-{hot,cold,leech}` use raw hex `#f59e0b`, `#0ea5e9` and `rgb(217 119 6)`/`rgb(2 132 199)` for "amber" + "sky" tones | Tokenize via `--warning`/`--info` (already in canon at `tokens.css:215-217`) or section palette stops |
| `src/components/custom/wordlist/modals/ReviewSessionComplete.vue:95` | Confetti palette is 7 raw hex strings `'#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'` | `--rainbow-{red,orange,yellow,green,blue,indigo,violet}` (canon `tokens.css:421-428`) — exact 7-color rainbow already exists |
| `src/components/custom/sidebar/YoshiAvatar.vue:92-94` | Yoshi `box-shadow` keyframe uses raw `rgba(234, 179, 8, …)` for amber glow | `--color-gold` (canon) or `--rainbow-yellow` |
| `src/components/custom/loading/LoadingProgress.vue:25` | `boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'` raw white at 50% | `color-mix(in srgb, var(--background) 50%, transparent)` |
| `src/components/custom/wordlist/modals/WordDetailModal.vue:269-275` | `:global(.dark) .status-badge-hot { color: rgb(251 191 36); }` bakes a fixed hex into `.dark` cascade | Use `--warning` already inverted in `.dark` block of `tokens.css:505` |
| `src/components/custom/wordlist/sorting/WordListSortBuilder.vue:296`, `TimeMachineVersionCard.vue:247,250,262,265` | `transition: all 0.3s var(--spring-bouncy)` and similar — token used for easing, but `all` is the property | Name the property explicitly (`transition-property: transform, opacity` or similar) |
| `src/assets/theme.css:81` | `--radius: 8px` — overrides canon `0.625rem` (10px). Intentional but unflagged | Document the override or accept canon (warm-cream identity at `0.625rem` is the library default) |

### Axis 2 — Utility & `@apply` hygiene

| File:line | Drift | Canonical replacement |
|---|---|---|
| `src/assets/index.css:161-177` | `.dialog-surface`, `.popover-surface`, `.card-surface` are project utilities that compose `bg-background/{92,94,95}` + `backdrop-blur-{sm,xl}` + `shadow-{2xl,xl,card}` + `var(--paper-clean-texture)` | Use canon `glass-elevated` / `glass-medium` / `glass-default` (canon `glass.css`); paper texture via canonical `paper-grain-overlay` (canon `paper.css:29`) |
| `src/assets/index.css:182-185` | `.word-card` deliberately *avoids* `backdrop-blur` for virtualized lists ("paper texture without blur") | Glass-ui has no `paper-only` surface utility — every glass tier carries blur. **Real gap, see §2 below.** |
| `src/assets/index.css:188-192` | `.paper-texture-overlay { background-image: var(--paper-clean-texture); background-blend-mode: multiply; }` | Canon `.paper-texture` (`cards.css:6-12`) is identical, except canon uses `--paper-texture-size` and exposes the dark `screen` blend at `cards.css:14`. Consumer just restated |
| `src/assets/index.css:195-207` | `.review-progress-gradient`, `.mastery-bar-{gold,silver,bronze}` are linear-gradient utilities | Local domain — keep, but emit via consumer preset, not in `index.css` library-cascade slot |
| `src/assets/themed-cards/card-base.css:1-115` | Entire `.themed-card` system: `[data-theme=gold|silver|bronze]` × light/dark, metallic overlay `::before`, theme-specific border-color overrides on cartoon shadows | This *is* a generic mastery-tier card pattern — but bound to lexicon-domain semantics. Consumer preset, not promotion candidate. **Risk register §5.** |
| `tailwind.config.ts:16-141` | `addUtilities({ ... })` block defines 40+ utilities: `.delay-{0,150,300}`, `.animate-show*`, `.scroll-shrunk`, `.scroll-normal`, `.icons-{hidden,visible}`, `.texture-paper-*`, `.texture-{subtle,medium,strong}`, `.mastery-*`, `.bg-mastery-*`, `.border-mastery-*`, `.state-*`, `.bg-state-*`, `.review-btn-{again,hard,good,easy}`, `.stat-mastery`, `.def-{spacing,item-spacing,padding,border-subtle,border-normal}` | Many of these are *patterns* (`.animate-show` = `@apply animate-scale-in`); some are dead aliases. `.review-btn-*`, `.mastery-*`, `.state-*` are lexicon-domain. **Remove the wrapper-only ones; promote the texture utilities (see §2)** |
| `src/components/custom/sidebar/SidebarContent.vue:20,58,75,103` | Same 40-character class string repeated 4× (`focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-border/40 bg-background/95 text-sm font-medium shadow-cartoon-sm transition-[…] hover:-translate-y-0.5 hover:shadow-cartoon-md hover:border-border/60 hover:bg-background`) | Local utility or component — the four call sites all build the same icon-control button. **Consumer preset, not promotion**, but the sites should be coalesced. |
| `src/components/custom/wordlist/list/WordList.vue:214-247` | `.wordlist-paper`, `.wordlist-paper__line`, `.wordlist-paper__line::before` — lined-paper effect with tapered gradient horizontal rules | Genuinely novel "ruled paper" pattern. **Glass-ui gap §2** |
| `src/assets/transitions.css:91-118` | `.slide-up-*`, `.dock-fade-*` Vue Transition class triplets | Glass-ui canon has `fade-slide`, `pop`, `dialog-scale`, `dropdown`, `tab-fade` (`transitions.css`) — `slide-up` overlaps `fade-slide`; `dock-fade` is dock-specific and may already be served by `useDockTransition`/`useLayerTransition` |
| `src/assets/transitions.css:122-138` | `.rainbow-shimmer` linear-gradient + `rainbow-slide` keyframe | Canon has `--rainbow-*` palette + `gold-shimmer` utility (`utilities.css:124-131`). A `rainbow-shimmer` utility would be a one-line addition in canon |

### Axis 3 — Interactive consistency

| File:line | Drift | Canonical replacement |
|---|---|---|
| `src/components/custom/sidebar/SidebarContent.vue:20,58,75,103`, `SidebarLookupView.vue:47,86`, `SidebarHeader.vue:66`, `SidebarWordListView.vue:60` (8+ sites) | Custom four-state icon button: `border + bg-background/95 + shadow-cartoon-sm + hover:-translate-y-0.5 + hover:shadow-cartoon-md` | The pattern is a "cartoon icon button". Canon `.glass-btn` is circular-only and uses glass tiers, not cartoon. **Glass-ui gap §2 — `.cartoon-btn` / `.btn-cartoon-icon`** |
| `src/components/custom/wordlist/list/WordListRow.vue:1-50` | Word-row is a `<div>` with hover + selected + focus-visible reimplemented inline; no `interactive-item` class | `.interactive-item` (canon `utilities.css:34-57`) — the bg-tint hover + active scale + focus-visible is exactly what's reinvented |
| `src/components/custom/sidebar/SidebarWordListItem.vue:8` | Composes `'text-left active-scale focus-ring disabled-base'` | `.active-scale` and `.disabled-base` are no longer defined in glass-ui canon (removed in tranche F per `docs/tranches/F/audit/W0-style-theme-ledger.md:18`). Either re-promote them or migrate to `.interactive-item` (which folds active + disabled) |
| `src/components/custom/pwa/PWAInstallPrompt.vue:59,116,124,141`, `PWANotificationPrompt.vue:66,75` (6 sites) | Same `active-scale focus-ring` composition | Same — tokens removed from canon but referenced in consumer |
| `src/components/custom/wordlist/modals/ReviewQualityButtons.vue:9-10` | Bespoke quality-grade buttons with `hover:-translate-y-0.5 hover:shadow-cartoon-lg active:scale-[0.96]` | Composable: `.hover-lift-md` + `<Button variant="...">` — but the four review tones (`again/hard/good/easy`) are themselves a domain palette. **Risk register §5.** |
| `src/components/custom/icons/FancyF.vue:5` | `transition-fast hover:scale-105 active:scale-95` | `transition-fast` is not a glass-ui canonical class — appears to be locally defined or from `tw-animate-css`. Replace with explicit `transition-transform duration-fast` |

### Axis 4 — Variant orthogonality and rooting

| File:line | Drift | Canonical replacement |
|---|---|---|
| `src/components/custom/card/Card.vue:1-72` | Local `Card` component — *not* glass-ui's. Wraps the same `rounded-2xl border bg-card` shell with embedded texture system | Glass-ui's `<Card>` exposes `variant="default \| pane \| cartoon \| plain \| flush"` (canon `DESIGN.md:537-543`). Local Card duplicates without inheriting variants. The "paper texture" prop is the missing piece — see §2 |
| `src/components/custom/card/ThemedCard.vue:1-113` | Wraps local `Card` and adds `[data-theme]` system, `BorderShimmer`, `StarIcon` | Conceptually a `Card variant="cartoon"` (already in canon) + a *mastery tier* token. Mastery tiers are domain-specific (gold/silver/bronze = SRS levels), so the wrapper stays consumer-side, but the *cartoon underlay* is canon |
| `src/components/custom/texture/TextureCard.vue:146` | `:deep(*:not(.absolute))` — the only `:deep()` in the consumer | A slot-class prop or `position: relative` on slotted children would replace it. Marginal; doesn't block tranche G |
| `src/components/custom/wordlist/WordlistGrid.vue:8-13` | `<ThemedCard … :texture-enabled="false" hide-star :border-shimmer="false">` — explicitly disables three of ThemedCard's three flourishes, then reapplies cartoon shadow externally | The grid card is effectively `Card variant="cartoon"` + mastery border tint. ThemedCard is being used as a *negation* — orthogonality has collapsed |

### Axis 5 — Overlay and motion vocabulary

| File:line | Drift | Canonical replacement |
|---|---|---|
| `src/assets/index.css:161-177` | `.dialog-surface`, `.popover-surface` are bespoke surface utilities used on `<DialogContent>`, `<PopoverContent>`, `<DropdownMenuContent>`, `<HoverCardContent>` (`REFACTOR_PLAN.md` confirms this) | The components already accept `class` and forward to canon glass tiers. Replace by setting `class="glass-elevated"` / `glass-medium` and using `paper-grain-overlay` |
| `src/components/custom/definition/components/versioning/TimeMachineOverlay.vue:17` | `bg-background/60 dark:bg-background/70 backdrop-blur-2xl` for full-screen overlay | Canon `.glass-elevated` + `--z-modal`; `backdrop-blur-2xl` is a Tailwind primitive escape that bypasses the four-tier blur token |
| `src/components/custom/definition/components/versioning/TimeMachineOverlay.vue:273` | `el.querySelector('[class*="backdrop-blur"]')` — JS searches by Tailwind utility name | Brittle. Once consumer migrates to glass tiers, replace with a stable selector or ref |
| `src/components/custom/wordlist/sorting/WordListSortBuilder.vue:296`, `TimeMachineVersionCard.vue:247,262` | `transition: all 0.3s var(--spring-bouncy)` — `all` not named property | Spell out the property: `transform, opacity, box-shadow` |
| `src/assets/index.css:21-83` | Custom keyframes `shimmer`, `sparkle-slide`, `bounce-in`, `bounce-out`, `shrink-bounce`, `icon-fade`, `elastic-bounce`, `spin-slow`, `wiggle`, `wiggle-bounce`, `tab-content-in`, `hovercard-in`, `hovercard-out` — bound to `@theme inline { --animate-* }` at lines 86-100 | Canon already defines `dialog-in`, `floating-panel-in`, `fade-in`, `scale-in`, `slide-up`, `dock-in`, `shimmer`, `shimmer-sweep`, `shake`, `weight-{breathe,reveal}`. Consumer's `bounce-in/out`, `wiggle*`, `elastic-bounce` overlap canonical entrances. `hovercard-in/out` overlaps `pop` + `fade-slide`. **Some genuinely missing** — `wiggle`, `sparkle-slide` are domain-mascot motion (Yoshi) — keep |
| `src/assets/transitions.css:122-138` | `.rainbow-shimmer` keyframe + `rainbow-slide` | Canon has `gold-shimmer` (`utilities.css:124-131`); a sibling `rainbow-shimmer` is a small canonical addition |
| `src/assets/transitions.css:158-172` | `.confetti-piece` + `confetti-fall` keyframe | Reusable across consumers — see §2 |
| `src/views/Home.vue:206-220` | Per-component `<style scoped>` keyframe `cardFadeIn` (translateY 20px + opacity) | Overlaps canon `slide-up` in `animations.css` |
| `src/components/custom/definition/components/content/DefinitionItem.vue:344-352` | Local `defFadeIn` keyframe (translateY 6px + opacity) | Identical to canon `fade-in` |
| `src/components/custom/definition/components/content/DefinitionContentView.vue:273-281` | Local `clusterSlideIn` (translateY 12px + opacity) | Almost canon `slide-up`; same shape, different magnitude — promote a `--motion-slide-md`-sized variant |

### Axis 6 — Typographic and structural hierarchy

This is the lane's load-bearing axis. Findings here drive most of §2.

| File:line | Drift | Canonical replacement |
|---|---|---|
| `src/assets/theme.css:5-7` | `--font-serif: "Fraunces"; --font-sans: "Fraunces"; --font-display: "Fraunces"` — all three semantic stacks collapsed to one face | Conceptually this *is* the brand-uniform-display preset, but the library has `data-typography-preset="brand-uniform-sans"` (canon `typography.css:58-63`) for the *opposite* collapse. **Glass-ui gap: `brand-uniform-display` preset** |
| `src/assets/theme.css:5` | Fraunces stack omits `font-variation-settings`, freezing WONK + SOFT axes at default | `--font-display-variation-settings` (canon `typography.css:21`) is `"WONK" 1, "SOFT" 0`. Consumer leaves it default but never *uses* it via `.text-display-*`. The Fraunces axes are unrealized — see §4 |
| `src/components/custom/animation/AnimatedText.vue:158` | `font-variation-settings: 'wght' 900` — only WGHT used; WONK/SOFT/opsz ignored on the most prominent display surface in the app | Canon `text-display-{1..5}` would auto-set WONK 1 SOFT 0 + optical sizing. **§4 — Fraunces axes evidence** |
| `src/components/custom/wordlist/views/WordlistDashboard.vue:25,31,37` | `text-4xl font-bold tracking-tight leading-none font-serif` for big stat numbers (3 sites in one file) | Canon `.text-title` (32.9px, 700) or `.text-display` (clamp 25.9-41.9px, 350 + WONK 1) — tabular numerics with display weight |
| `src/components/custom/wordlist/WordlistStatsBar.vue:7,14,25,36` | `.text-title font-bold tabular-nums` (4 sites) — the canonical `.text-title` already sets weight 700 + serif; `font-bold` is redundant; `font-serif` would already be implicit | Use `.text-title` alone |
| `src/views/NotFound.vue:3` | `text-6xl font-bold` for "404" | Canon `.text-display-3` or `.text-display-4` |
| `src/components/custom/definition/components/Etymology.vue:6` | `text-3xl font-semibold tracking-wide` for the "Etymology" heading | Canon `.text-heading` (1.618rem display weight 500) — this is the most literary heading in the app, deserves the display voice + WONK |
| `src/components/custom/definition/components/AnimatedTitle.vue:6` | `text-pane-title font-bold` — `text-pane-title` is the canon class (`typography.css:269`), but `font-bold` overrides the canon's `--font-display-weight: 400` | Drop `font-bold`; if the consumer wants weight 700, override `--font-display-weight` per surface |
| `src/components/custom/definition/components/WordHeader.vue:151` | `font-mono text-sm` for IPA pronunciation rendering | Canon `.text-mono-small` (`typography.css:225-229`) covers exactly this. Used heavily in WordHeader's pronunciation popover at lines 181-203 — 4+ sites in one component |
| `src/components/custom/definition/components/WordHeader.vue:154,156` | `text-micro font-sans` for `+N` pronunciation count badge and `IPA`/`Ph.` mode chip | These are admin-label-tier — canon `.text-admin-label` (`typography.css:190-197`) is mono caps at 10px. Closer match would be `.text-mono-caption` (`typography.css:217-223`) |
| `src/components/custom/definition/components/content/DefinitionItem.vue:86` | `text-base leading-relaxed font-serif` — definition body text | Canon `.text-prose` (1.125rem, 1.618 leading) is *purpose-built* for long-form reading. Bigger and more readable. Definition body is the most-read text in the app and bypasses prose typography |
| `src/components/custom/definition/components/Etymology.vue:20,25` | Same `text-base leading-relaxed` for etymology body | Same — `.text-prose` |
| `src/components/custom/definition/components/ProviderDataView.vue:45,50,121,126` | Same `font-serif text-base leading-relaxed` × 4 | Same — `.text-prose` |
| `src/components/custom/wordlist/cards/WordPreviewList.vue:75,161,16` | `font-serif text-{lg,sm} font-semibold` for word entries | Canon `.text-subheading` / `.text-heading` |
| `src/components/custom/wordlist/list/WordListRow.vue:16` | `font-serif text-base sm:text-lg leading-snug` for word display in a virtualized row of 100+ rows | Canon `.text-prose` or `.text-body` would standardize. The `text-base sm:text-lg` responsive bump is a real consumer choice |
| `src/components/custom/wordlist/modals/ReviewModal.vue:39,41`, `ReviewSessionComplete.vue:19,23,27,50,54`, `WordListUploadModal.vue:27`, `CreateWordListModal.vue:11`, `EditWordlistModal.vue:11` (9+ sites) | `text-{xl,2xl,lg} font-{semibold,bold}` for modal titles | Canon `.text-heading` / `.text-subheading` |
| `src/components/custom/loading/LoadingProgress.vue:127` | `text-2xl font-bold tracking-tight` (commented out, but framed as canonical) | `.text-heading` |
| `src/components/custom/navigation/components/SidebarHoverCard.vue:14`, `PartOfSpeechPreview.vue:6`, `SidebarCluster.vue:22,28`, `SidebarPartOfSpeech.vue:15`, `WordlistControlsPanel.vue:345`, `LookupControlsPanel.vue:48`, `VersionDiffViewer.vue:79,109,130,152`, `WordHeader.vue:70,96,128`, `DefinitionCluster.vue:27`, `ExampleListEditable.vue:6`, `WordlistStatsBar.vue:19,29,40` (18+ sites) | Pattern: `text-{xs,sm,2xs} font-{medium,semibold,bold} uppercase tracking-{wider,widest}` — mono section labels reinvented | Canon `.section-label` (`typography.css:286-292`) is mono caps at 12px with muted-foreground — exact match. Consumer used `.section-label` only at 9 sites, reinvented at 18+ sites |
| `src/components/custom/sidebar/SidebarHeader.vue:17,26` | `font-mono text-sm` for `@mbabb` author handle | Canon `.text-mono-small` |
| `src/components/custom/wordlist/list/WordListRow.vue:34` | `text-2xs text-muted-foreground/60 tabular-nums` for review interval telemetry | Canon `.text-mono-micro` (`typography.css:231-236`) for tabular-numeric inline telemetry |
| `src/components/custom/wordlist/modals/WordDetailModal.vue:69,89,109` | `text-sm font-serif` and `text-sm font-serif leading-relaxed` for stats grid + notes | `.text-small` already serif by default; `.text-prose` for notes |

### Axis 7 — Accessibility resilience

| File:line | Drift / observation | Canonical replacement |
|---|---|---|
| `src/assets/index.css:103-120` | Reduced-motion media-query collapses 13 project animations to 0.01ms — well-formed, but blocks every project-defined motion separately | Canon transitions in `transitions.css` already gate themselves; consumer's bespoke keyframes need this manual gate. Removing the bespoke keyframes (axis 5) would shrink this block |
| `src/components/custom/animation/AnimatedText.vue:130-153` | `text-shadow` ladder hard-codes `rgba(200, 200, 200, …)` (light) and `rgba(40, 40, 40, …)` (dark) — bypasses any `prefers-contrast: more` boost | Promote the ladder to use `--depth-color-shadow` (canon `.depth-text` does this) |
| `src/assets/index.css:182-185` | `.word-card` deliberately omits `backdrop-blur` and blend-mode — *correct* perf decision for virtualized 100+ cards. But there's no `@supports` or transparency-reduce gate | Canon glass tiers respect `prefers-reduced-transparency`. A new `paper-only` tier (§2) should also gate |
| `src/components/custom/wordlist/modals/WordDetailModal.vue:269-275` | `:global(.dark) .status-badge-{hot,cold} { color: rgb(…); }` bakes light-mode foreground into dark cascade overrides | Use `--warning` / `--info` (already inverted in `.dark` block of canon `tokens.css`) |

---

## 2. Glass-ui gaps surfaced by words/frontend

The consumer reinvented an entire 4-level paper-surface system (`paper-surface`, `card-surface`, `popover-surface`, `dialog-surface`) parallel to glass-ui's 4-tier glass system because **glass tiers always bring backdrop-blur**, which is GPU-expensive in Safari for virtualized grids. The consumer's `word-card` utility (`src/assets/index.css:182-185`) is the explicit workaround. This is the lane's most legitimate gap.

### Gap 2.1 — Paper-tier surfaces (no-blur counterpart to glass tiers)

**Pattern.** Four-level "paper substrate" — opaque or near-opaque cards with paper texture, *no backdrop-blur*. Used heavily in virtualized lists and prose surfaces where blur is either prohibitive (perf) or wrong (the metaphor is "ink on paper", not "frosted glass on paper").

**Call sites (≥3):**
- `src/assets/index.css:173-177` — `.card-surface` (Level 2: blur-sm + 92% bg + paper texture + cartoon shadow)
- `src/assets/index.css:182-185` — `.word-card` (paper-only, *no blur*, used in `WordList.vue` virtualized rows for 100+ cards)
- `src/assets/index.css:188-192` — `.paper-texture-overlay` (paper without surface chrome)
- `src/components/custom/wordlist/list/WordList.vue:214-247` — `.wordlist-paper` + ruled-line `::before` (lined notebook paper effect)
- `REFACTOR_PLAN.md` Phase 2 explicitly enumerates `paper-surface` (Level 1, no blur, 98% bg) as a planned-but-missing tier
- `src/views/Login.vue:5-7`, `Signup.vue:5` — inline `style="backgroundImage: var(--paper-clean-texture)"` on the auth shell
- `src/App.vue:86-95` — `.app-shell::before` global paper underpaint (matches canon `paper-underpaint` exactly)

**Proposed placement.** New tier in `glass.css` and a paper-utility family in `paper.css`:

- `--paper-bg-{1,2,3,4}` — opacity 1.00, 0.98, 0.92, 0.94 (mirrors REFACTOR_PLAN levels 0-4)
- `.paper-1` / `.paper-2` / `.paper-3` / `.paper-4` — paper texture + opacity step + elevation shadow + `paper-grain-overlay`, **no `backdrop-filter`**. `.paper-2` carries cartoon shadow by default; `.paper-3/4` carry elevated shadow.
- `.paper-card` shorthand — equivalent to canon `.glass-card` but blur-free
- Variant `<Card variant="paper">` and `<Card variant="paper-flush">` for surface composition
- The four glass tiers stay glass; consumers pick `glass-*` for floating surfaces, `paper-*` for substrate. The `.glass-card` / `.paper-card` pair becomes the substrate-vs-overlay choice.

**Cream identity binding.** Tranche G's "cream" axis lives here. `--paper-bg-1` defaults to `var(--neutral-0)` (warm cream 98% L) — the library's identity is already cream, paper tiers make it tangible. A consumer cream-preset just shifts `--paper-bg-1..4` without re-declaring the texture system.

### Gap 2.2 — Ruled-paper (lined notebook) variant

**Pattern.** Horizontal rules drawn between rows with tapered linear gradients (transparent → border-color → transparent), centered in the row gutter — evokes lined notebook paper.

**Call sites:**
- `src/components/custom/wordlist/list/WordList.vue:223-246` — `.wordlist-paper__line::before` with full tapered-line implementation
- `tailwind.config.ts` exposes `.divider-h` / `.divider-h-tapered` (canon `utilities.css:294-310`) — already canonical for *one-off* dividers, but not as a *row-gutter rule* in a list
- This is repeated in concept (not code) for `WordListRow` separators and Etymology section break (`Etymology.vue:1-50` uses a top border for the same effect)

**Proposed placement.** Either:
- A new `.paper-rule` utility in `paper.css` that draws the tapered line; or
- A `<Card variant="ruled">` that gives each child a top-border via the same gradient.

The minimum-invasive option is a one-utility addition — the consumer's CSS is already the right shape. Given paper substrate is going into canon (gap 2.1), `.paper-rule` complements the paper tier.

### Gap 2.3 — Cartoon-styled icon button (`.cartoon-btn` / `.btn-cartoon-icon`)

**Pattern.** Icon-only square button, bordered, paper-bg, cartoon shadow on rest, lift + bigger cartoon shadow on hover, focus ring. Distinct from `.glass-btn` (circular, glass-tier) and from `<Button variant="ghost">` (no shadow).

**Call sites (≥3, in fact 8+ in the consumer):**
- `src/components/custom/sidebar/SidebarContent.vue:20,58,75,103` — exact 4 sites with the same long class chain
- `src/components/custom/sidebar/SidebarLookupView.vue:47,86`
- `src/components/custom/sidebar/SidebarHeader.vue:66`
- `src/components/custom/sidebar/SidebarWordListView.vue:60`
- `src/components/custom/definition/components/WordHeader.vue:24` — Plus button, same shape
- `src/components/custom/wordlist/views/WordListView.vue:126,134` — manual icon dock buttons

**Proposed placement.** A new `Button` variant `cartoon` (already hinted at in canon `Card variant="cartoon"`) that composes:
- `bg-card` + 1.5px `--border` + `--shadow-cartoon-sm` rest
- hover: `--lift-sm` + `--shadow-cartoon-md`
- active: `scale(--scale-press-btn)`
- focus-visible: `--focus-ring-shadow`
- size variants follow existing button sizes; for icon-only the existing `size="icon"` (40×40) plays.

Distinct from `.glass-btn` (frosted) and `.btn-pill` (gradient bg). Tranche G's "modern skeuomorphic with shadowing" axis — the cartoon icon button is the canonical instance.

### Gap 2.4 — `brand-uniform-display` typography preset

**Pattern.** Collapse `--font-display`, `--font-serif`, `--font-sans` all to a *display* face (e.g. Fraunces) — the inverse of canon's `data-typography-preset="brand-uniform-sans"` (`typography.css:58-63`).

**Call sites:**
- `src/assets/theme.css:5-7` — three lines collapsing all stacks to Fraunces
- `latex-paper`'s shared theme (sibling repo) does the same per `index.css:5`
- Future consumers pursuing a literary-magazine identity would need this

**Proposed placement.** Add to canon `typography.css` immediately under the `brand-uniform-sans` block:

```css
:root[data-typography-preset="brand-uniform-display"] {
    --font-serif: var(--font-display);
    --font-sans: var(--font-display);
    --font-display-weight: 400;
}
```

Two presets exposing the symmetric collapse direction. Documents the design decision, removes per-consumer redeclaration.

### Gap 2.5 — Drop-cap / lettrine first-letter utility

**Pattern.** None evident — but Etymology and Definition body have the *space* for one and the consumer has not exposed it. The Fraunces font carries a stylistic-set for ornamental glyphs (`ss01` swashes, etc.) that go unused.

**Call sites the addition would unlock:**
- `src/components/custom/definition/components/Etymology.vue:20` — etymology paragraph
- `src/components/custom/definition/components/content/DefinitionItem.vue:86` — definition body
- `src/components/custom/definition/components/ProviderDataView.vue:45,121` — provider definition body

**Proposed placement.** A `.text-prose-lettrine` utility (or `.first-letter-display`) in canon `typography.css`:

```css
@utility text-prose-lettrine {
    & > :first-child::first-letter {
        font-family: var(--font-display);
        font-size: 3em;
        line-height: 0.9;
        float: left;
        padding-right: 0.1em;
        margin-top: 0.1em;
        font-variation-settings: "WONK" 1, "SOFT" 100;
        font-weight: 500;
    }
}
```

Tranche G's "large/audacious typography" + "colorful flourishes" axes — drop caps are the canonical literary flourish. Whether words/frontend ever turns it on, exposing it makes Fraunces' axes legible.

### Gap 2.6 — Pronunciation rendering (mono small + side-by-side variant lists)

**Pattern.** The most lexicon-specific surface, but with general-purpose primitives underneath: mono text + chip stack + variant comma-split.

**Call sites:**
- `src/components/custom/definition/components/WordHeader.vue:144-211` — pronunciation popover (IPA + phonetic, both with comma-split variant lists, both as mono pills)
- `src/components/custom/definition/components/WordHeader.vue:62-141` — language badges with stacked-icon group (already using canon `StackedIconGroup`)

**Proposed placement.** No new component, but reinforce the canonical pattern: **mono small + stacked pill list + section-label divider** is the right vocabulary. The consumer's pronunciation popover is the case study showing `.text-mono-small` + `.section-label` + `<StackedIconGroup>` should be promoted in stories. Could become a canon story `compositions/dictionary-pronunciation` to evidence the composition.

### Gap 2.7 — `confetti-piece` celebration motion

**Pattern.** CSS-only celebration confetti with falling + rotation keyframes, fixed positioning.

**Call sites:**
- `src/assets/transitions.css:158-172` — `.confetti-piece` + `confetti-fall` keyframe
- `src/components/custom/wordlist/modals/ReviewSessionComplete.vue:95` — 7 hardcoded color hex

**Proposed placement.** A `confetti.css` micro-utility in canon, parameterized by `--confetti-color` (defaults rotate through `--rainbow-*`), `--confetti-duration` (defaults `--duration-xxl`), `--confetti-rotations` (default 720°). Used by any "session complete", "task done", "achievement" surface — generic across consumers.

### Gap 2.8 — Definition list / etymology block primitive

**Pattern.** Bordered + paper-textured block with a horizontal rule above, semantic-label, body text. Used identically for Etymology, Definition body, Synonym chooser comparative, Phrases & Idioms.

**Call sites (≥3):**
- `src/components/custom/definition/components/Etymology.vue:1-50`
- `src/components/custom/definition/components/content/DefinitionItem.vue:64-90` (the `border-l-2 border-accent pl-4` left-rule)
- `src/components/custom/definition/components/editing/SynonymChooser.vue:12`
- `src/components/custom/definition/components/PhrasesSection.vue` (referenced from `DefinitionContentView.vue:124`)

**Proposed placement.** No new component is needed — the right primitive is `<Card variant="pane">` + section-label header + `.text-prose` body. This gap is **storybook + docs**: a `compositions/prose-block` story demonstrates the pattern using existing primitives, removing the "build it from scratch" temptation.

---

## 3. Union candidates

Same pattern, both vocabularies, different names — propose canonical.

| Pattern | Glass-ui name (canon) | Consumer name | Sites | Canonical |
|---|---|---|---|---|
| Paper texture overlay | `.paper-texture` (`cards.css:6-12`) + `paper-grain-overlay` (`paper.css:29`) | `.paper-texture-overlay` (`index.css:188-192`) | Canon: 0 consumers in this lane; Consumer: 8+ via `card-surface`/`dialog-surface`/`popover-surface`/`word-card` chains | Keep canon `.paper-texture` (matches semantic naming with `.glass-*`); consumer `paper-texture-overlay` is alias bloat |
| Lined-paper / horizontal-rule divider | `.divider-h-tapered` (`utilities.css:305`) | `.wordlist-paper__line::before` (`WordList.vue:227-246`) | Canon: divider as standalone; Consumer: applied as repeating row-gutter pseudo-element | New `.paper-rule` in canon paper.css (see gap 2.2); the `divider-h-tapered` becomes its underlying primitive |
| Mono section label | `.section-label` (`typography.css:286-292`) | `text-{xs,sm,2xs} font-{medium,semibold,bold} uppercase tracking-{wider,widest}` ad-hoc | Canon: 9 sites in consumer; ad-hoc: 18+ sites | `.section-label` — existing canon, push migration |
| Mono caption (rare-numeric inline) | `.text-mono-{caption,small,micro}` (`typography.css:217-236`) | `font-mono text-{xs,sm}` ad-hoc | Canon: 0 hits; ad-hoc: 6+ | `.text-mono-{caption,small}` — existing canon |
| Tabular numerics | `.tabular-nums` (`typography.css:295-297`) | `tabular-nums` (Tailwind utility) | Both work; consumer uses Tailwind directly at 25+ sites | Keep canon class; both resolve to `font-variant-numeric: tabular-nums` |
| Cartoon shadow (button) | `.shadow-cartoon-{sm,md,lg}` (`utilities.css:266-292`) | Same | Both use the same canon name everywhere | No drift |
| Bouncy spring | `--spring-bouncy` (`tokens.css:66`) | Same | Used directly in consumer at 4 sites | No drift |
| Glass overlay | `.glass-overlay` (assumed canon) | Same — `Sidebar.vue:30` calls it | Single-use; class exists in canon | No drift |
| Active/disabled atoms | `.active-scale`, `.disabled-base` (REMOVED from canon in tranche F) | Same names referenced by 7 consumer sites | Consumer broken: classes referenced but undefined | **Fix:** either re-add to canon (cheap) or migrate consumer to `.interactive-item` |
| Pane title | `.text-pane-title` (`typography.css:269-283`) | Same — `AnimatedTitle.vue:6` | Used once, with `font-bold` override that conflicts with `--font-display-weight: 400` | Keep canon; remove `font-bold` override in consumer |
| Themed-card system | `Card variant="cartoon"` (canon) | `[data-theme=gold|silver|bronze]` (`themed-cards/`) | Canon: generic cartoon variant. Consumer: 3-tier mastery palette + metallic gradient overlay | Domain-bound — keep consumer-side (risk register §5) |
| Animation: `wiggle` / `bounce-in` | Canon: `dialog-in`, `pop`, `slide-up`, `dock-in`, `floating-panel-in` | Consumer: `bounce-in`, `bounce-out`, `wiggle`, `wiggle-bounce`, `elastic-bounce`, `shrink-bounce` | Canon: 0 in this lane; Consumer: 13 keyframes in `index.css` | Mascot-specific keep (`wiggle` for Yoshi); **`bounce-in`/`bounce-out` overlap canon `pop` and could go away** |

---

## 4. Design-language signal toward the new axes

### Cream
- **Where evidenced:** `src/assets/theme.css:60-82` and `:99-122` — `--background hsl(48 15% 98%)`, `--card hsl(48 12% 99%)`, `--muted hsl(48 8% 96.1%)`, `--border hsl(48 5% 89.8%)` — full hue-48 (warm yellow-cream) palette already shipped. Dark variant at hue 24 (warm-charcoal). The consumer's identity *is* cream.
- **Reinvented?** Yes — exactly the same hue family as canon's warm-cream identity (`tokens.css:145-150` declares `--neutral-0..5` at hue 48), but with slightly shifted L* and S* values. The consumer is reinventing canon by 1-3% drift.
- **Library primitive that absorbs it:** Canon's `--neutral-0..5` warm-cream scale is *already* the cream identity. A `data-cream-preset="literary"` (or just inheriting canon defaults) would close the gap. The "cream" axis is **already the library's identity** — tranche G should crystallize this with a named preset rather than reinventing.

### Paper
- **Where evidenced:** Pervasive. `src/App.vue:86-95` (global underpaint), `src/components/custom/texture/*` (texture system), `src/composables/useTextureSystem.ts:1-160` (reactive texture state), `tailwind.config.ts:53-60` (texture utility classes), `src/assets/themed-cards/card-base.css:27-48` (paper + repeating-linear-gradient overlay), `src/assets/index.css:161-192` (4 levels of paper-suffused surface).
- **Reinvented?** Yes, comprehensively. The consumer ships **four paper textures** (`clean`, `aged`, `handmade`, `kraft`), **three intensities** (`subtle`, `medium`, `strong`), **a Vue composable** for runtime texture switching, and **four surface tiers** all with paper. Canon ships two textures (`clean`, `aged`) and one paper-overlay utility.
- **Library primitive that absorbs it:**
  - **Token additions:** `--paper-handmade-texture`, `--paper-kraft-texture` (canon already has `--paper-clean-texture` and `--paper-aged-texture`). Open question: do consumers actually use 4 textures, or do they pick one? Words/frontend's `useTextureSystem` defaults to `clean`/`subtle` (`useTextureSystem.ts:11-13`) and the runtime switching mechanism appears unused at call sites — they pass static `texture-type="clean"` props. **Probably keep two canonical textures, allow consumer presets to extend.**
  - **Surface utility:** the `paper-1..4` tiers proposed in §2.1 absorb the consumer's `paper-surface`/`card-surface`/`popover-surface`/`dialog-surface` ladder.
  - **Texture system composable:** the runtime-switching `useTextureSystem` is general-purpose and could be canonicalized as `composables/texture/useTexture.ts`, but evidence of cross-consumer use is thin (the consumer doesn't even use the runtime switching). **Skip — keep consumer-side until a second consumer needs it.**

### Bold / audacious large type
- **Where evidenced:**
  - `src/components/custom/animation/AnimatedText.vue:64,131-153` — `text-7xl font-black` with 8-stop layered text-shadow ("depth-text") for hero word display
  - `src/components/custom/wordlist/views/WordlistDashboard.vue:25,31,37` — `text-4xl font-bold tracking-tight leading-none` × 3 for stat-display numerics
  - `src/components/custom/definition/components/AnimatedTitle.vue:6` — `text-pane-title font-bold` for the focal word (largest typographic element on the dictionary view, animated character-by-character via `TypewriterText`)
  - `src/components/custom/icons/FancyF.vue:21-22` — `text-3xl/4xl` Fraktur F (KaTeX-rendered, the brand mark)
- **Reinvented?**
  - The depth-text in `AnimatedText.vue` is exactly canon's `.depth-text` (`utilities.css:71-87`) — but with hardcoded greys instead of tokenized `--depth-color-shadow`. The consumer reinvented the ladder.
  - The stat numbers reinvent `.text-title` (32.9px serif weight 700).
  - Big focal type misses Fraunces axes (no WONK/SOFT in any of these sites).
- **Library primitive that absorbs it:**
  - **`.text-display-{1..5}`** already covers the 25-110px clamp range with WONK 1 + SOFT 0 axes. Tranche G should encourage consumers to *use* them — the storybook story for typography axes (`Foundations/Typography`) is the canon proof.
  - **`.depth-text`** already canonical; just retire consumer's hardcoded ladder.
  - **A new `.text-display-stat`** utility (display font + tabular-nums + leading-none + tight tracking + weight 700) would absorb the dashboard / stats-bar pattern at `WordlistStatsBar.vue:7,14,25,36` and `WordlistDashboard.vue:25,31,37`. Effectively `.text-title.tabular-nums` with leading collapsed — possibly just a `.text-title-stat` semantic utility.
  - **WONK + SOFT axes:** the consumer never sets `font-variation-settings` for Fraunces beyond `wght`. Tranche G's "audacious typography" axis lights up by setting WONK 1 SOFT 0 on display headings (`text-display-*` already does this) and exposing a `.text-wonk-hover` interactive mode (canon already has it at `DESIGN.md:373`). Storybook story `Foundations/Typography` should foreground the WONK toggle.

### Modern skeuomorphic with shadowing
- **Where evidenced:**
  - Cartoon shadows applied across 18+ sites in 11 files (per REFACTOR_PLAN's audit list)
  - `src/components/custom/sidebar/SidebarContent.vue:20,58,75,103` — cartoon-shadow icon buttons (4×)
  - `src/components/custom/animation/AnimatedText.vue:130-153` — 8-stop layered text-shadow for 3D-extruded type
  - `src/components/custom/icons/StarIcon.vue:22` — `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))` on SVG mastery stars
- **Reinvented?** The cartoon shadow is canon (`--shadow-cartoon-{sm,md,lg}`), but the **cartoon-icon-button composition** is reinvented at 8+ sites. See gap 2.3.
- **Library primitive that absorbs it:**
  - **`Button variant="cartoon"`** + `size="icon"` (gap 2.3) — the canonical instance of the modern-skeuomorphic axis.
  - **Existing `.depth-text`** for 3D extruded type.
  - **A new `Card variant="cartoon-paper"`** (cartoon shadow + paper texture, no glass blur) — the union of paper + cartoon for surfaces. Currently the consumer composes this manually as `card-surface` (their custom utility) + `shadow-cartoon-sm` everywhere.

### Colorful flourishes
- **Where evidenced:**
  - `src/components/custom/sidebar/GoldenSidebarSection.vue:8-26` — gold-tinted accordion section (`text-[var(--color-gold)]`, `bg-[var(--color-gold)]/8`, `border-[var(--color-gold)]/20`) — the *one* deliberately colored navigation surface
  - `src/components/custom/animation/BorderShimmer.vue:1-150` — SVG-rect-stroke perimeter sweep with golden default color, used as `<BorderShimmer color="rgb(251 191 36)">` on themed cards
  - `src/components/custom/wordlist/modals/ReviewSessionComplete.vue:95` — confetti palette
  - `src/assets/transitions.css:122-138` — `.rainbow-shimmer` linear-gradient sweep across destructive→gold→young→primary→easy→destructive
  - `src/components/custom/icons/FancyF.vue:23,47` — `shimmer-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text` for AI-suggestions mode
- **Reinvented?**
  - `BorderShimmer` is a SVG-stroke perimeter sweep — *not* in canon. New primitive.
  - `rainbow-shimmer` linear-gradient is the rainbow-tier sibling of canon's `.gold-shimmer` (`utilities.css:124-131`); easy canon addition.
  - Confetti is canon-gap 2.7.
  - `shimmer-text` for AI mode references a class not present in glass-ui canon (consumer has not redefined locally — appears broken or relying on Tailwind from-via-to + `bg-clip-text`).
- **Library primitive that absorbs it:**
  - **`<BorderShimmer>` component** — golden perimeter glow that traces a card's border. General across consumers (achievement framing, focus reveal). Promote to `components/custom/border-shimmer/`.
  - **`.rainbow-shimmer` utility** — direct sibling to `.gold-shimmer`, adding rainbow gradient stops + the same shimmer-slide keyframe.
  - **`.confetti-piece` utility** — gap 2.7 above.
  - **An `ai`-themed shimmer text** — canon already has `Button variant="ai"` (amber-tinted at `DESIGN.md:407`). The matching `.text-ai-shimmer` utility (golden gradient with shimmer-slide animation) would absorb FancyF's pattern.

### Mathematical
- **Where evidenced:**
  - KaTeX renders `katex.min.css` and the brand glyph ℱ uses KaTeX-Fraktur (`FancyF.vue:98`)
  - `frequencyTemperatureStyle` (`DefinitionItem.vue:64,228-232`) — left-border color is a continuous mapping from frequency_score 0..1 via `temperatureColor(score)` (`utils/animations.ts`)
  - `FrequencySlider` (referenced from `DefinitionItem.vue:46`) — temperature-color slider
  - `latex-paper` workspace dependency (`package.json:20`)
- **Reinvented?** No. Consumer leans on KaTeX and a sibling `latex-paper` package. Math typography mostly lives there.
- **Library primitive that absorbs it:**
  - **`.text-math` and `.text-math-body`** (canon `typography.css:202-212`) already exist. The consumer doesn't use them.
  - **A `--temperature-{cold,cool,neutral,warm,hot}` palette** could canonicalize the score→color mapping. Currently `temperatureColor(score)` is a JS helper; tokenizing it across `utils/animations.ts` and any future consumer would be possible — but evidence is thin (only one site).

### Large / audacious iconography
- **Where evidenced:**
  - `src/components/custom/icons/StarIcon.vue:43-49` — large star icon for mastery tier (`drop-shadow-xl` + `star-shimmer-{gold,silver,bronze}`)
  - `src/components/custom/icons/FancyF.vue:21-22` — text-3xl / text-4xl Fraktur brand mark
  - `src/components/custom/icons/FloridifyIcon.vue:1-58` — combined logotype with the F + Fraunces "loridify" word, expanding state
  - Lucide icons used at canonical sizes via `:size="16"` props throughout
- **Reinvented?** The star-shimmer animation set (`src/assets/transitions.css:24-78`) — gold/silver/bronze brightness pulses tied to mastery. Domain-specific (SRS achievement system).
- **Library primitive that absorbs it:**
  - **`.icon-{xs,sm,md,lg,xl}`** canon already covers 12-24px. The consumer uses inline `h-4 w-4`/`h-7 w-7` rather than the canon utility — a usage gap, not a primitive gap.
  - **A `<StarIcon>`-style mastery-tier component** — domain. Stays consumer-side.
  - **Storybook should evidence audacious icon scale:** `Foundations/Icons` story should show 24/32/48/64px sizes with semantic intent (`xs..xl` only goes to 24px; tranche G could add `--icon-2xl: 2rem`, `--icon-3xl: 3rem` for the audacious tier).

---

## 5. Risk register

Patterns that should remain consumer-side, not promote.

| Pattern | Reason |
|---|---|
| `mastery-{default,bronze,silver,gold}` palette + `bg-mastery-*`/`border-mastery-*` utilities (`tailwind.config.ts:62-73`, `theme.css:20-23`) | SRS-specific. The 4-tier mastery scheme is lexicon-domain and won't generalize to non-language consumers. Keep as preset. |
| `card-state-{new,learning,young,mature,relearning}` palette (`tailwind.config.ts:76-85`, `theme.css:25-30`) | Anki / SRS card state vocabulary. Domain-specific. |
| `review-{again,hard,good,easy}` button variants and palette (`tailwind.config.ts:88-127`, `theme.css:32-36`) | SM-2/FSRS quality-grade buttons. Domain. |
| `themed-cards/` system: `[data-theme=gold|silver|bronze]` × light/dark with metallic gradient overlay (`themed-cards/card-base.css:1-115`, `variables.css:1-77`) | The metallic gradient + paper-texture-tile overlay is a real visual achievement, but the gold-silver-bronze tier semantics are bound to mastery progression. The *technique* (data-theme tokens + gradient overlay + paper underlay) could become a documented preset pattern in canon storybook, but the specific gold-silver-bronze tokens stay consumer. |
| `wordlist-paper` lined notebook effect (`WordList.vue:227-246`) — *the implementation* | The canon promotion is the `paper-rule` utility (gap 2.2). The full lined-notebook list is a composition; document via storybook. |
| `--paper-handmade-texture`, `--paper-kraft-texture` runtime switching | Evidence of *consumers actually switching textures at runtime* is zero (consumer ships the composable but always passes static `clean`/`subtle`). Promote textures-as-tokens, not the switching composable. |
| `useTextureSystem` composable | Same — the API exists, no caller exercises it. Don't promote until a second consumer needs runtime switching. |
| `BorderShimmer` color defaults (gold-tinted) | The component itself is general; the gold-by-default is a consumer choice. Keep `<BorderShimmer color="…">` parameterized, no default opinionated color in canon. |
| `confetti` color palette (rainbow) | The 7-color rainbow defaults make sense in canon (`--rainbow-*` already exist) — confetti utility is general (gap 2.7). |
| `.review-progress-gradient`, `.mastery-bar-{gold,silver,bronze}` linear-gradient utilities (`index.css:195-207`) | SRS-domain colors. Keep. |
| `.glass-overlay` (canon class, used at `Sidebar.vue:30`) | Already canon. |
| `--layout-header-h`, `--layout-header-h-compact`, `--layout-header-h-tall` (`theme.css:94-97`) | App-shell-specific layout token. Domain. |

---

## 6. One-line tally

Drift findings: **38** (axis-1: 11, axis-2: 10, axis-3: 6, axis-4: 4, axis-5: 11, axis-6: 16, axis-7: 4) · Gaps: **8** (paper-tier surfaces, ruled-paper utility, cartoon-icon button, brand-uniform-display preset, drop-cap utility, pronunciation composition story, confetti utility, prose-block composition story) · Union candidates: **12** · Design-signal evidence sites: **45+** across 6 axes · Risk-register entries: **10** (mostly SRS-domain).
