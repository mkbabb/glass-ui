# J.R5 — Style self-audit (glass-ui)

## Preamble

- **Target**: `@mkbabb/glass-ui` (this repo).
- **Revision**: HEAD `950d1f4` (post-I close ceremony).
- **Method**: 7 canonical axes (per `docs/audits/style-audit.md`) applied to all four sub-slices — `src/components/ui/`, `src/components/custom/`, `src/styles/`, `demo/`. Single merged deliverable per J planning brief; J is pre-research and the canonical 4-lane fanout collapses here.
- **Read-only**. Drift findings cite `file:line` + count; library-needed patterns appear under *Glass-ui gaps*.
- **Hot leads verified clean** before audit:
  - `button.ai`, `card.subtle` CVA branches: 0 hits across `src` + `demo` (W7 absorb confirmed).
  - `--cartoon-shadow*` aliases, `--accent-pink`, `--easing-accent`: 0 hits.
  - Raw `'dockKeepOpen'` / `'dockRelease'` injection keys: 0 hits.
  - CI `recovery-diary-scrub` job: present in `.github/workflows/lint.yml`.
  - W3.β `cartoon-surface` utility: consumed by Button/Select/Input/NumberField cartoon variants — no inlined recipes remain.

---

## Drift findings grouped by axis

### Axis 1 — Token alignment

| Finding | Sites | Replacement |
|---|---|---|
| Raw `rgba(0, 0, 0, …)` literal where token recipe is `color-mix(in srgb, var(--shadow-color) N%, transparent)` | `src/styles/theme.css:242,243` (`--shadow-soft`, `--shadow-elevated` light); `src/styles/tokens.css:563,564` (dark mirrors); `src/components/custom/tabs/BouncyToggle.vue:266` (slider shadow); `src/components/custom/typewriter/TypewriterText.vue:238` (cursor bg) | `color-mix(in srgb, var(--shadow-color) N%, transparent)` |
| Hand-rolled `cubic-bezier(0.34, 1.56, 0.64, 1)` for tab indicator transitions | `src/components/custom/tabs/UnderlineTabs.vue:85,86` (×2 in same declaration) | `--ease-apple-spring` (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`) — the audit's named overshoot bezier |
| Hand-rolled `cubic-bezier(0.175, 0.885, 0.32, 1.275)` literal for WAAPI press animation | `src/components/custom/tabs/BouncyToggle.vue:119` | Read from `getComputedStyle(documentElement).getPropertyValue('--ease-apple-spring').trim()` (the demo `motion.vue:34-36` already does this) |
| Literal duration ms with token easing — duration token bypassed | `src/components/custom/controls/DarkModeToggle.vue:97,102` (`750ms`, `500ms`); `src/components/custom/sidebar/ProgressiveSidebar.vue:219,220` (`0.4s`, `0.3s`); `src/components/custom/search/FuzzySearch.vue:564,569,570` (`0.2s` ×3, `0.25s`) | `--duration-{slow,panel}` for 750/500ms; `--duration-{slow,normal}` for 400/300ms; `--duration-fast` for 200ms |
| Literal `hsl()` paper bg color where the warm-cream ramp owns it | `src/styles/paper.css:67,113` (`hsl(48 12% 97%)` for `.paper-2` / `.paper-card`); `paper.css:73` (`hsl(48 10% 95%)` for `.paper-3`); `paper.css:80` (`hsl(48 8% 92%)` for `.paper-4`) | Step through `--neutral-1` … `--neutral-3`, or introduce per-rung `--paper-{2,3,4}-bg` tokens (currently the rungs hardcode against the light `--neutral` axis but the dark-mode block `:where(.dark)` re-issues bespoke literals — drift mirrored in dark) |
| Inline `color-mix(in srgb, var(--foreground) N%, transparent)` recipe repeated raw across components | 36 sites in `src/components` (Slider, BouncyToggle, UnderlineTabs, ProgressiveSidebar, FuzzySearch, etc.) — coalesced via `grep -rEn "color-mix\\(in srgb, var\\(--foreground\\)" src/components` | A named token family — see *Glass-ui gaps* row 1 |
| Inline `color-mix(in srgb, var(--muted) {30,40,50}%, transparent)` for hover/active fills | 9 sites (BouncyToggle:249, ProgressiveSidebar:165,198,209, FuzzySearch:281,332,369,557, Slider:98) | Promote `--accent-hover-{soft,strong}` and `--muted-soft` aliases — see *gaps* |
| `bg-black/{40,50,80}` literal alpha for modal/drawer overlays | `src/components/ui/dialog/DialogContent.vue:45` (`bg-black/50`); `dialog/DialogScrollContent.vue:34` (`bg-black/40`); `sheet/SheetContent.vue:41` (`bg-black/50`); `drawer/DrawerOverlay.vue:17` (`bg-black/80`); `src/components/custom/confirm-dialog/ConfirmDialog.vue:5` (`bg-black/50`) | Substrate-aware overlay token (e.g. `--overlay-scrim`) that resolves to `color-mix(in srgb, var(--shadow-color) 50%, transparent)` so dark mode lifts properly — currently dark-mode dialogs overscrim |
| `bg-white/10`, `text-white` literal in Notification.vue | `src/components/ui/notification/Notification.vue:25` (`bg-white/10` close button); lines 52-55 (`text-white` inside semantic-color bg) | Use `text-{success,destructive,info,warning}-foreground` after extending tokens (no semantic foreground exists — see *gaps*) |
| Magic ms in dock animation outside the dock motion vocabulary | `src/styles/dock.css:735` (`sparkle-sweep 600ms var(--ease-out-expo)`) | Promote `--duration-sparkle` token (DESIGN.md§ enumerates the canonical durations and 600ms isn't on the list); or document 600ms as the published reservation per W2.7 §17 |
| `--border-opacity-{light,medium,strong}` named in audit doc but not present in `tokens.css` | tokens.css 0 hits | Either ship the alias family or strip the row from the audit "Token namespaces" table — see *Glass-ui gaps* |

### Axis 2 — Utility & @apply hygiene

| Finding | Sites | Replacement |
|---|---|---|
| Components reinvent `popover-animate slide-in-from-side` instead of consuming the canonical utilities | `src/components/ui/hover-card/HoverCardContent.vue:36`; `combobox/ComboboxList.vue:24`; `context-menu/ContextMenuContent.vue:29`; `context-menu/ContextMenuSubContent.vue:28`; `dropdown-menu/DropdownMenuSubContent.vue:26`; `tooltip/TooltipContent.vue:27`; `select/SelectContent.vue:45-48`; (only `dropdown-menu/DropdownMenuContent.vue:36` + `popover/PopoverContent.vue:44,59` consume the canonical utility) | `popover-animate slide-in-from-side` from `src/styles/utilities.css:24-30` — saves ~12-class repetitions per site |
| `glass-elevated` already includes `backdrop-filter: var(--glass-blur-elevated)` (per `glass.css:33-40`) but components composite it twice | `popover/PopoverContent.vue:44,59`; `context-menu/ContextMenuContent.vue:29`; `context-menu/ContextMenuSubContent.vue:28`; `combobox/ComboboxList.vue:24` (uses raw `bg-[var(--glass-bg-elevated)] [backdrop-filter:…] border-[var(--glass-border-elevated)]` instead of `glass-elevated`) | Drop the duplicate `[backdrop-filter:var(--glass-blur-elevated)]` → composes only `glass-elevated`; ComboboxList collapses to `glass-elevated` plus geometry |
| Component-local `@keyframes` duplicating canonical animation vocabulary | `src/components/ui/skeleton/Skeleton.vue:40-43` (`skeleton-shimmer-slide`) — duplicates `gold-shimmer-slide` in `animations.css:139-142` (identical 200%→-200% sweep); `Skeleton.vue:30-38` recipe also duplicates `text-shimmer-gold` in `utilities.css:144-151` | Extend `gold-shimmer-slide` rename to `bg-shimmer-slide` (single shared keyframe) and consume from Skeleton |
| `text-xs font-mono uppercase tracking-wider` mono-label recipe instead of `.section-label` utility | `demo/configurator/Configurator.vue:144,183,232,269,318` (5 sites within one file); compositions/`settings.vue` and `hero-quiet.vue` already use `.section-label` correctly | `.section-label` (typography.css:317-323) — already canonical at consumer sites |
| `text-shimmer-blue` / `text-shimmer-vivid` / `text-shimmer-pastel` / `bg-rainbow-pastel` / `text-rainbow-pastel` defined in story `<style scoped>` | `demo/stories/foundations/flourishes.vue:245-328` (5 ad-hoc utilities, 84 LOC) | Promote to `utilities.css` since `.text-shimmer-gold`, `.bg-rainbow{,-vivid}` already exist there — vivid + pastel are foundations gaps in the canonical surface |
| Story `<style scoped>` keyframes duplicating canonical animation grammar | `demo/stories/motion/confetti.vue:213-228` (`story-confetti-burst`) | Acceptable as a story-local pattern, but lift to `animations.css` if a confetti primitive is contemplated |
| `transition-all` Tailwind utility (replaces named property + token duration + token easing) | `src/components/ui/tabs/index.ts:31`; `select/index.ts:19`; `accordion/AccordionTrigger.vue:26`; `accordion/AccordionContent.vue:18`; `progress/Progress.vue:51,52`; `collapsible/CollapsibleContent.vue:8`; `demo/stories/navigation/carousel.vue:111`; `demo/stories/motion/stagger.vue:86` | Named property list (`transition-[background,box-shadow,border-color]`) + token duration + token easing — Tabs index already shows the pattern except it leads with `transition-all` |

### Axis 3 — Interactive consistency

| Finding | Sites | Replacement |
|---|---|---|
| `focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]` repeated raw across CVAs instead of `.focus-ring` utility composition | 16 sites (button/index.ts:9, select/index.ts:19, input/index.ts:17, number-field/index.ts:37,39, checkbox/Checkbox.vue:24, switch/Switch.vue:29, radio-group/RadioGroupItem.vue:28, toggle/index.ts:6, badge/index.ts:6, dropdown-menu/DropdownMenuItem.vue:21, sheet/SheetContent.vue:50, dialog/DialogContent.vue:54, dialog/DialogScrollContent.vue:57, toast/ToastAction.vue:23, toast/ToastClose.vue:24, custom/toggle-chip/index.ts:20) | `.focus-ring` from `utilities.css:46-50` (auto-activates on `:focus-visible`) — saves ~4 classes per site, single source of focus-ring opinion |
| Hardcoded `transform: scale(0.95)` / `scale(0.96)` / `scale(0.97)` / `scale(1.03)` / `scale(1.08)` / `scale(1.18)` instead of `--scale-press*` / `--scale-hover*` token | `custom/confirm-dialog/ConfirmDialog.vue:86`; `custom/search/FuzzySearch.vue:589,598`; `custom/live-snippet/LiveSnippet.vue:135`; `custom/glass-carousel/GlassCarouselItem.vue:69,73`; `custom/timeline/TimelineMarker.vue:113,117,122,126` (10 sites) | `var(--scale-press)` / `var(--scale-hover)` / `var(--scale-press-btn)` — Slider.vue:202 + DockTabButton scoped CSS are consistent precedents |
| WAAPI animation literal scale offsets (matches token `--scale-press` 0.95 conceptually but bypass it) | `custom/tabs/BouncyToggle.vue:113,114` (`scale(0.93)`, `scale(1.02)` press feedback) | Read tokens via `getComputedStyle()` — same fix path as the cubic-bezier audit row |

### Axis 4 — Variant orthogonality and rooting

| Finding | Sites | Replacement |
|---|---|---|
| `button.cartoon` / `select.cartoon` / `input.cartoon` / `number-field-input.cartoon` correctly hoist `cartoon-surface` (W3.β complete) — 0 residual inlined recipes | `src/components/ui/{button,select,input,number-field}/index.ts` | (clean — verified) |
| `:deep()` against intra-component slot (acceptable per audit definition) — none target reka-ui internals | `glass-carousel/GlassCarousel.vue:198,202,212,216` (against `.glass-carousel-item` — sibling component); `math-surface/MathSurface.vue:77` (against `.katex` — KaTeX output, third-party but not reka-ui); `demo/stories/compositions/instrument-chassis.vue:269-271` (against `instrument-strip/dial/control` story-local recipe) | (no rerooting needed — patches are at intra-package level) |
| Sheet uses `z-modal` while Dialog uses `z-modal` AND scrolling Dialog and Drawer overlays use `z-overlay` — but Drawer *content* uses `z-overlay` instead of `z-modal` | `drawer/DrawerContent.vue:20` (`z-overlay`) vs `sheet/index.ts:13` (`z-modal`) — both side-drawer pattern, inconsistent z-tier | Pick one: sheet + drawer are coequal "side panel" — both should be `z-modal` per DESIGN.md ## Z-Index table |
| `Card variant="pane"` uses raw `bg-[var(--glass-bg-subtle)] [backdrop-filter:var(--glass-blur-subtle)] border border-[var(--glass-border-subtle)]` instead of the `glass-subtle` utility | `card/index.ts:27-30` | `glass-subtle rounded-xl transition-shadow` (matches `cartoon` precedent at line 31). The W3 doc says Card pane is "explicit subtle-tier with token bypass" — but the bypass is a 5-class repetition of glass-subtle |

### Axis 5 — Overlay and motion vocabulary

| Finding | Sites | Replacement |
|---|---|---|
| Overlay components use `rounded-xl` (primitive radius) instead of canonical semantic alias `rounded-panel` / `rounded-dialog` / `rounded-card` | 11 ui/ overlay sites: `popover/PopoverContent.vue:44,59`; `dropdown-menu/DropdownMenuContent.vue:36`, `DropdownMenuSubContent.vue:26`; `hover-card/HoverCardContent.vue:36`; `combobox/ComboboxList.vue:24`; `context-menu/ContextMenuContent.vue:29`; `dialog/DialogContent.vue:37,38`; `card/Card.vue:32`; `card/index.ts:26,28,31`; `select/SelectContent.vue:45`; `tooltip/TooltipContent.vue:27` (rounded-lg) | Popover/Dropdown/HoverCard/Combobox/ContextMenu/Select-content → `rounded-panel`; Dialog → `rounded-dialog`; Card → `rounded-card`; Tooltip → keep `rounded-lg` since no `--radius-tooltip` exists (ship one or accept) |
| `bg-black/{40,50,80}` overlay scrim instead of token-driven recipe (axis 1 row also flags as token alignment) | 5 sites (Dialog, DialogScroll, Sheet, Drawer, ConfirmDialog) | Single `--overlay-scrim` token + utility `.overlay-scrim` |
| `Sheet` ships open/close vocabulary as raw `data-[state=open]:animate-in …` slot list of 12 classes instead of composing with `popover-animate` (sheet uses `slide-out-to-{side}` not `slide-in-from-side` so isn't a perfect match — but the *pattern* is the same shape) | `sheet/index.ts:13`; `sheet/SheetContent.vue:41` (overlay) | Add a `.sheet-animate` utility that sets the open/close + slide-out vocabulary, mirror of `.popover-animate` for sheets |
| Tooltip uses `rounded-lg` (primitive) where every other glass-elevated overlay uses `rounded-xl` — small geometry inconsistency | `tooltip/TooltipContent.vue:27` | Either tooltips are intentionally tighter (in which case ship `--radius-tooltip` = `--radius-lg`) or align to `rounded-panel` |
| `transition-all` on Tabs/Select/Accordion CVAs (axis 2 row also) blends transform + box-shadow + colors with one timing | (covered above) | Decompose to `transition-[background,box-shadow,border-color]` — Toggle's `card` variant at toggle/index.ts:16 is the precedent |

### Axis 6 — Typographic and structural hierarchy

| Finding | Sites | Replacement |
|---|---|---|
| Configurator section titles use `text-xs font-mono uppercase tracking-wider text-muted-foreground` instead of `.section-label` (axis 2 row also lists this) | `demo/configurator/Configurator.vue:144,183,232,269,318` (5 sites) | `.section-label` |
| Configurator description text at `text-[0.6875rem]` (= `--type-micro`) and `text-2xl` (≈ `--type-subheading` 20.4px or `--type-heading` 25.9px) | `demo/configurator/Configurator.vue:133` (title `text-2xl` w/ `font-display`); 156, 167, 175, 346 (`text-[0.6875rem]`) | `.text-heading` for `text-2xl`; `.text-micro` for `text-[0.6875rem]` |
| Story content inline literal type sizes | `demo/stories/compositions/auth-shell.vue:52` (`text-4xl`); `demo/stories/navigation/carousel.vue:57` (`text-2xl`); `demo/stories/foundations/golden-ratio.vue:125`, `primitives/live-snippet.vue:123`, `compositions/math-paper.vue:75` (`text-[1.15rem]`, `!text-[1.4rem]`, `!text-[1.6rem]`) | `.text-display-{1..5}`, `.text-heading`, `.text-prose` — but several of the `!text-[…]` cases are intentional overrides of `.text-display-stat` for fit-to-cell sizing; document the override pattern in DESIGN.md if it's the canonical escape hatch |
| Typography section in foundations/flourishes.vue defines `.text-shimmer-{blue,vivid,pastel}` shimmer recipes locally where `.text-shimmer-gold` is canonical (axis 2 row) | `demo/stories/foundations/flourishes.vue:245-297` | Promote vivid + pastel to `utilities.css` |

### Axis 7 — Accessibility resilience

| Finding | Sites | Replacement |
|---|---|---|
| `cream-surface` lifts border opacity under `prefers-contrast: more` (paper.css `:65-70`) but `paper-{1..4}` and `paper-card` only lift in the contrast cascade — *no* `prefers-reduced-transparency` opacity-zero on `.paper-card::after` is present (paper.css:148-154 covers `.paper-underpaint`/`.paper-grain-overlay`/`.paper-card` ✓). Glass tiers at `glass.css:218-233` honor reduced-transparency. Verified clean | (no drift) | (clean) |
| `prefers-reduced-motion` overrides — `.paper-underpaint` carries an empty animation override; `transitions.css:144-193` covers all named transitions; `animations.css:165-198` covers sparkle/rainbow/idle keyframes; `utilities.css:438-449` handles wildcard. Spot-check: WAAPI animations in BouncyToggle (`animatePress`) bypass the `*:not([data-allow-motion])` guard since WAAPI bypasses CSS — uses literal cubic-bezier without runtime PRM check | `custom/tabs/BouncyToggle.vue:104-122` | Wrap `animatePress` body in `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;` early-out (idle-bob, sparkle-sweep, rainbow-drift CSS keyframes already PRM-gated) |
| `data-allow-motion` escape hatch — referenced in `utilities.css:439`/`445` but no documented canonical attribute users in source | (0 explicit `data-allow-motion="true"` author sites in source/demo) | Document or remove the escape — current state is invisible except as a global wildcard |
| `cream-surface[data-tone="warm"]` swaps `--cream-warm` background but `--cream-warm` light is `hsl(40 18% 96%)` (warm) and dark is `hsl(28 6% 8%)` (warm-dark) — the dark recipe still tilts warm so the unwind is correct | tokens.css:152, 533 | (clean) |
| Skeleton `prefers-reduced-motion` correctly halts shimmer | `Skeleton.vue:45-49` | (clean) |

---

## Glass-ui gaps surfaced

| Pattern | Sites count | Proposed addition | Rationale |
|---|---|---|---|
| `color-mix(in srgb, var(--foreground) N%, transparent)` recipe — the foreground-tinted overlay/border family | 36+ in components, 20+ in styles | Add a `--surface-tint-{4,6,8,10,12,15,18,22,25}` family OR ship the named `--border-opacity-{light,medium,strong}` family the audit doc references but doesn't deliver. Surface this as utilities `bg-tint-N` / `border-tint-N` in theme.css | Today every component picks its own integer percentage; without the family the warm-cream identity drift compounds (e.g. card pane vs glass-bg-subtle). The audit doc names `--border-opacity-{light,medium,strong}` in the Token namespaces table but tokens.css doesn't ship it — either honor the audit doc or strike the row |
| Substrate-aware modal scrim | 5 (Dialog, DialogScroll, Sheet, Drawer, ConfirmDialog use `bg-black/{40,50,80}`) | `--overlay-scrim`, `--overlay-scrim-strong`, `--overlay-scrim-subtle` tokens with light = `color-mix(in srgb, var(--shadow-color) {40,50,80}%, transparent)` and dark unwound automatically. Optional `.overlay-scrim` `@layer components` utility | The current `bg-black/50` overscrims dark mode (already-dark page + 50% black = excessive); the recipe is the same pattern in 5 sites |
| `--duration-sparkle` (or canonical 600ms-tier name) | 1 (`dock.css:735`) plus implied future consumers per W2.7 §17 disco reservation | A `--duration-sparkle: 600ms` token in `:root §1` + theme.css bridge | The DESIGN.md duration table lists 8 timings + shimmer triplet + `--duration-popup-swap`; the sparkle 600ms is the 11th name and lives uncoded |
| Notification semantic foreground colors | 1 (Notification.vue:52-55 hardcodes `text-white` over `bg-{success,destructive,warning,info}/90`) | `--success-foreground`, `--destructive-foreground` (already exists), `--warning-foreground`, `--info-foreground` to round out the family | The destructive pair already exists, leaving warning/info/success unpaired in tokens.css §6 |
| `--radius-tooltip` semantic alias | 1 (`tooltip/TooltipContent.vue:27` is the sole `rounded-lg` overlay vs the 8 `rounded-xl` overlays) | `--radius-tooltip: var(--radius-lg)` in tokens §4 + theme.css bridge | The "tooltip is tighter" pattern is intentional but uncodified — every other overlay has a semantic radius |
| `.sheet-animate` companion to `.popover-animate` | Sheet ships open/close vocabulary inline at `sheet/index.ts:13` + sheet overlay at `SheetContent.vue:41` (both ~12-class slot lists) | A `.sheet-animate` utility in `utilities.css` that bundles the slide-out-to-{side} + animate-in/out vocabulary | `popover-animate` covers fade+zoom but not slide-out-to-side; sheet/drawer share that grammar |
| `.text-shimmer-vivid`, `.text-shimmer-pastel`, `.text-rainbow-pastel`, `.bg-rainbow-pastel` | 5 ad-hoc recipes (84 LOC) in `demo/stories/foundations/flourishes.vue:245-328` | Promote to `utilities.css` as siblings of the existing `.text-shimmer-gold` + `.bg-rainbow{,-vivid}` | The vivid + pastel rainbow palette already exists in `tokens.css §14`; the shimmer wrappers are the next obvious layer |
| WAAPI runtime token reader helper | 2 (`BouncyToggle.vue:119` literal cubic-bezier; `motion.vue:34-36` correct read pattern) | A small helper `cssVar(name: string): string` exported from `composables/utils/` that wraps `getComputedStyle(documentElement).getPropertyValue(name).trim()` | WAAPI animations need literal CSS strings; today consumers either inline the token literal (drift) or reimplement the read |
| Audacious primary button + dock-tab `data-tier="primary"` reservation | The disco-grain + sparkle-sweep + specular highlight composite lives only in `dock.css:659-744` for `.dock-tab-button[data-tier="primary"]` — the same recipe applied to a generic Button would compose audacious-tier CTAs | A `Button variant="primary-audacious"` (or `data-tier="primary"`) variant that shares the dock recipe | Only `<DockTabButton>` participates today; the speedtest "Test Again" + dashboard primary CTAs would consume it |
| Slider keep-dock-open is single-package; `<DockPopover>` and `<Slider keep-dock-open>` are the only two `dockKeepOpenSink` consumers but the API is documented as future-extensible | Sites: `Slider.vue:46-66`; `DockPopover.vue:49-63` | Either accept as 2-consumer mature substrate (per overfitting audit ≥2 rule) or document the future `<NumberField keep-dock-open>` extension explicitly | Currently invisible whether the API is reusable or speculative |

---

## Union candidates (same pattern, two vocabularies)

| Pattern A | Pattern B | Proposed canonical |
|---|---|---|
| `popover-animate slide-in-from-side` consumed (DropdownMenuContent, PopoverContent — 3 sites) | The same 12-class slot list emitted raw (HoverCard, Combobox, ContextMenu, ContextMenuSub, DropdownMenuSub, Tooltip, SelectContent — 7 sites) | All overlays consume `popover-animate slide-in-from-side` — collapses to one vocabulary, ~80 LOC saved |
| `glass-elevated` utility class | `bg-[var(--glass-bg-elevated)] [backdrop-filter:var(--glass-blur-elevated)] border-[var(--glass-border-elevated)]` raw | `glass-elevated` everywhere; ComboboxList is the lone holdout |
| `.focus-ring` utility (`utilities.css:46`) | `focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]` (16 sites) | `.focus-ring` everywhere — saves 4 classes × 16 sites = 64 token slot-list duplications |
| `.section-label` utility (`typography.css:317`) | `text-xs font-mono uppercase tracking-wider text-muted-foreground` (5 sites in Configurator) | `.section-label` everywhere |
| `cartoon-surface` utility (`utilities.css:12`) — the W3.β hoist | (no drift; clean — verified) | (clean) |
| `--scale-press` token | Hardcoded `scale(0.95)` / `scale(0.96)` / `scale(0.97)` (10 sites) | `--scale-press` everywhere |
| `rounded-panel` semantic alias for popover-tier overlays | `rounded-xl` primitive (8 sites — Popover, DropdownMenu, HoverCard, ContextMenu, Combobox, SelectContent, Tooltip uses `rounded-lg`) | `rounded-panel` everywhere; tooltip earns its own `--radius-tooltip` |
| Cubic-bezier token `--ease-apple-spring` | Literal `cubic-bezier(0.34, 1.56, 0.64, 1)` (2 sites in UnderlineTabs.vue) and literal `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (1 site in BouncyToggle.vue) | `--ease-apple-spring` everywhere; for WAAPI consumers, ship a `cssVar()` helper |

---

## Closing one-line tally

**7 axes audited × 4 sub-slices ⇒ 32 distinct drift rows + 9 glass-ui gaps + 8 union candidates; canonical replacement named for every drift row; substrate convergence is broadly intact (cartoon hoist + cream tier + cartoon-shadow family clean) but interactive vocabulary leaks heavily through the 16-site `focus-visible:shadow-[…]` repeat and the 7-site `popover-animate` reinvention — both single-token-or-utility fixes.**

---

## Proposed J wave shape contribution

**J should reserve a wave for vocabulary convergence (call it J.W-vocab).** Three sub-buckets fall out of the data:

1. **Sub-bucket vocab.α — overlay convergence** (single-pass, mechanical):
   - All overlay components consume `popover-animate slide-in-from-side` (HoverCard, Combobox, ContextMenu, ContextMenuSub, DropdownMenuSub, Tooltip, SelectContent — 7 sites).
   - Every overlay replaces `rounded-xl` with `rounded-panel` (8 sites); Tooltip earns `--radius-tooltip`.
   - Drop redundant `[backdrop-filter:var(--glass-blur-elevated)]` on every site that already composes `glass-elevated`.
   - Ship `--overlay-scrim` token + `.overlay-scrim` utility; Dialog/Sheet/Drawer/DialogScroll/ConfirmDialog consume it.
   - Ship `.sheet-animate` companion utility.

2. **Sub-bucket vocab.β — interactive token reach-in** (single-pass):
   - Replace 16 raw `focus-visible:shadow-[var(--focus-ring-shadow)]` occurrences with `.focus-ring` consumption (or, where the CVA composes its own outline cascade, consume the utility from the wrapper instead of the CVA base).
   - Replace 10 hardcoded `scale(0.9N)` / `scale(1.0N)` with `--scale-press*` / `--scale-hover*` tokens.
   - Promote `--ease-apple-spring` token use in UnderlineTabs.vue (CSS) and ship a `cssVar()` composable helper for BouncyToggle's WAAPI consumer.
   - Replace 9 `color-mix(in srgb, var(--muted) {30,40,50}%, transparent)` with a `--muted-soft`/`--muted-medium` family.

3. **Sub-bucket vocab.γ — token gaps that block convergence** (precedes α + β):
   - Either ship `--border-opacity-{light,medium,strong}` (the audit doc names it; tokens.css doesn't deliver it) or strip it from `docs/audits/style-audit.md` table.
   - Ship `--surface-tint-{4,6,8,10,12,15,18,22,25}` (or equivalent) so the 36 raw `color-mix(--foreground) N%` recipes have a vocabulary to consume.
   - Ship `--duration-sparkle` (600ms tier) per dock.css:735.
   - Ship `--success-foreground`, `--warning-foreground`, `--info-foreground` to round out the semantic-foreground family.

**Sequencing**: vocab.γ first (token surface) → vocab.β (interactive reach-in) → vocab.α (overlay convergence). All three are mechanical search-and-replace tranches once the named replacements exist; risk is low (CI typecheck + tests catch the misses); leverage is high (each row removes ≥ 7 sites of drift per row).

**Out-of-scope for J.W-vocab but worth flagging**:
- The audacious primary-button extraction (dock-tab `data-tier="primary"` → `Button variant="primary-audacious"`) is its own gestalt — better as a dedicated wave with a story.
- The literal `hsl(48 …)` in paper.css for paper-2/3/4 is a minor rung-aliasing fix but the dark-mode cascade already inlines its own literals; either both rip out together or both stay (current state has implicit consistency through duplication).
- The Card pane variant's 5-class glass-subtle bypass at `card/index.ts:27-30` — leave alone unless a consumer needs it; W3 documented it as intentional but the audit flags as drift. Reconcile by either (a) removing the bypass and consuming `glass-subtle`, or (b) updating DESIGN.md to name the bypass as canonical.
