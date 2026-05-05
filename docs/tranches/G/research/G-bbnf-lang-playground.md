# Lane G — bbnf-lang/playground

Scope: `/Users/mkbabb/Programming/bbnf-lang/playground/` against glass-ui canon at `/Users/mkbabb/Programming/glass-ui/` (master @ `badc536`). Read-only; sole writable artefact is this report. Single lane covers all four slices (`ui/`, custom, views, styles).

bbnf-lang/playground is the only consumer that combines glass-ui + keyframes.js + value.js + Monaco editor + a Rust→WASM grammar engine in the same shell. Its load-bearing axes are **multi-pane editor composition** (split pane + tab + glass dock + walkthrough overlay), **code-rendering surfaces** (Monaco theming + ad-hoc fenced-code prose), and **mathematical / formal-grammar typography** (BBNF grammar productions, AST trees, parser flow charts, benchmark visualisations). Token overrides live in `src/assets/styles/preset-bbnf.css` and `src/assets/styles/main.css` only — there is no `tailwind.config.*`; Tailwind v4 + `@theme` is the only build path.

## 1. Drift findings

### Axis 1 — Token alignment

| # | Site | Drift | Replacement |
|--|--|--|--|
| 1.1 | `src/assets/styles/preset-bbnf.css:24-31, 55-62` | Six `--pastel-*` accents declared as raw `hsl()` literals at `:root`, not stepped through canon's accent vocabulary (`--accent-*`, `--success`, `--warning`, `--info`, viz-basis). | Move to a named consumer preset namespace (`--bbnf-pastel-*`) and bridge into canon via `@theme` only at the rung consumed (`--color-bbnf-green` etc). The current six map 1:1 onto canon's accent palette so consider absorbing into a "pastel-set" rainbow extension if W1 lands a pastel vocabulary. |
| 1.2 | `src/assets/styles/preset-bbnf.css:37-38` | `--shadow-card: 3px 3px 0px 0px;` + `--shadow-hover: 5px 7px 0px 0px;` overrides canon's elevation shadow with cartoon offsets. The shape is an offset cartoon shadow; canon already exposes `--shadow-cartoon` / `--shadow-cartoon-hover` (3px/4px) as that vocabulary. The hover token shape `5px 7px` (asymmetric) has no canon counterpart. | Adopt `--shadow-cartoon{,-hover}` instead of redefining `--shadow-card`. The asymmetric hover shape is a candidate for a `--shadow-cartoon-lg` rung (synthesis gap 2 territory); cite as cross-lane evidence for accent-tinted cartoon-shadow extension. |
| 1.3 | `src/assets/styles/preset-bbnf.css:41-46` | Glass token overrides (`--glass-opacity-light`, `--glass-opacity-medium`, `--glass-bg`, `--glass-bg-medium`, `--glass-blur`, `--glass-blur-heavy`) — all primitive names that do not match canon's tier-named API (`--glass-bg-{subtle,default,medium,elevated}`, `--glass-blur-{subtle,default,medium,elevated}`). | Map to tier-named tokens; current overrides land on `--glass-bg-default` + `--glass-bg-medium` and `--glass-blur-default` + a custom `--glass-blur-heavy` (saturate(1.2)) rung. The `saturate(1.2)` is a legit canon-side gap if it earns a second consumer — flag for synthesis. |
| 1.4 | `src/assets/styles/preset-bbnf.css:49-50` | `--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)` redeclares canon's `--ease-standard`. `--duration-hero: 700ms` invents a duration rung that overlaps `--duration-xl` / `--duration-xxl`. | Drop `--ease-smooth`; reference `--ease-standard` directly. `--duration-hero` survives only if `700ms` is a hero-specific rung — otherwise reuse `--duration-xl`. |
| 1.5 | `src/assets/styles/main.css:32-34, 39-43` | `var(--shadow)` referenced as a hue (`color-mix(in srgb, var(--shadow) 8%, transparent)`). `--shadow` exists in canon (`tokens.css:174`) as `hsl(24 10% 10%)` — a brown-black, not the canonical "shadow color" hook (`--shadow-color`). | Use `--shadow-color` (canon's documented elevation hue hook) instead. |
| 1.6 | `src/assets/styles/main.css:111-114, 121-125, 132-135` | `.prose h1/h2/h3` use bottom `linear-gradient` background as a heading rule with hand-rolled stops (`15% / 85%`, `8% / 92%`). Canon ships `.divider-h-tapered` (utilities.css:305) with stops `3% / 15% / 85% / 97%` for exactly this shape. | Compose: `<h1 class="text-display-3"><span>title</span></h1>` + `<div class="divider-h-tapered" />` underneath, OR ship a `.heading-rule-tapered` `@utility` that absorbs the recipe; six sites here + D's lined paper rule is a credible second consumer. |
| 1.7 | `src/assets/styles/main.css:147-150, 197, 204, 207, 215, 246-249, 260` | Twelve uses of raw `color-mix(in srgb, var(--foreground|muted|border|card|pastel-*) N%, transparent)` in `.prose *` rules — open-coding canon's recipe without the semantic alias. | Lift via existing `--border-opacity-{light,medium,strong}` for border tints; for accent tints use `bg-pastel-*` Tailwind utilities (already wired via preset-bbnf). |
| 1.8 | `src/components/docs/BenchChart.vue:170` | `style="background: hsl(45 90% 55% / 0.2); color: hsl(45 90% 55%)"` — gold tier-badge inlined as raw HSL. Canon ships `--color-gold` / `--color-gold-light` / `--color-gold-dark`. | Replace inline `style` with `var(--color-gold)`. |
| 1.9 | `src/components/walkthrough/WalkthroughOverlay.vue:18, 33, 38, 78` + `src/components/landing/HeroSection.vue:108-113` + many | `bg-pastel-green/N`, `border-pastel-green/N`, `text-pastel-green` etc. (≥ 30 sites across landing + docs + walkthrough). The classes are wired via preset-bbnf `@theme` so they work, but the *vocabulary* duplicates canon's accent positions (success/warning/info/destructive). The `pastel-green` always means "OK / success", `pastel-blue` always means "info / link", `pastel-pink` always "warning-soft"; this is a semantic remap. | Either retag bbnf surfaces semantically (`bg-success/N`) and let the consumer remap accent hue at `:root`, OR keep `--pastel-*` as a brand axis and accept the parallel vocabulary. Synthesis gap 24 (`Badge tone="success/warning/destructive/info"`) directly absorbs this. |
| 1.10 | `src/components/landing/CodeCardFan.vue:68` | `transition: transform 0.6s var(--ease-spring)` — `--ease-spring` does not exist in canon; canon offers `--spring-{smooth,snappy,bouncy,gentle}`. Silent drop to browser default `ease`. | Replace with `var(--spring-bouncy)` (the closest parametric match) or `var(--ease-apple-spring)`. |
| 1.11 | `src/components/layout/NavBar.vue:242` + `src/components/custom/header-ribbon/HeaderRibbon.vue:126, 150, 151, 166, 167` + `src/views/DocsPage.vue:175` | Hand-rolled `cubic-bezier(0.4, 0, 0.2, 1)` strings (7 sites). Same value as `--ease-standard`. | Replace with `var(--ease-standard)`. |
| 1.12 | `src/components/landing/TypewriterText.vue:48-58, 62-72` + `src/components/custom/bbnf-logo/BbnfLogo.vue:36-47` | `.tw-rainbow` and `.tw-golden` / `.bbnf-shimmer` declare hand-rolled hex stops (`#ff6b6b…`, `#c49a2e/#e8c84a/#d4a832`). Canon ships `--color-rainbow-vivid-*` and `--color-gold{,-light,-dark}` plus `.gold-shimmer` text utility. | Replace `.bbnf-shimmer` with canon `.gold-shimmer`; replace `.tw-rainbow` stops with `var(--color-rainbow-vivid-{1..6})` (synthesis gap 9 prerequisite — `.text-rainbow-pastel` would help here). |

### Axis 2 — Utility & `@apply` hygiene

| # | Site | Drift | Replacement |
|--|--|--|--|
| 2.1 | `src/assets/styles/main.css:50-60` | `card-base` / `card-subtle` / `card-elevated` `@utility` redefine glass-ui's tier substrate with `bg-card/N + backdrop-blur-N + border-white/N`. 8 consumer call sites (`FeatureCards`, `DemoCards`, `LivePreviewStrip`, `CodeCardGrid`, `CodeCardFan`, `DocsPage`, plus internal `.card-base` references). | DESIGN.md `Migration Tasks:25` already names this — replace with `glass-subtle` / `glass-default` / `glass-elevated`. The drift is the largest in lane G by call-site count. |
| 2.2 | `src/assets/styles/main.css:31-43` | `shadow-card` / `shadow-card-hover` `@utility` redeclares canon's cartoon-shadow recipe (3px hard offset + alpha) using consumer's `--shadow-card` override. Canon's `.shadow-cartoon-{sm,md,lg}` utilities (`utilities.css:266-291`) provide the same shape with `--shadow-cartoon-color` accent hook. | Adopt `.shadow-cartoon-md` directly, or expose a per-card accent-tinted variant via the synthesis gap 2 (`--cartoon-accent-color`). 4 consumer call sites (FeatureCards, DemoCards, plus internal). |
| 2.3 | `src/assets/styles/main.css:45-48` | `tapered-rule` `@utility` reimplements `.divider-h-tapered`. 5 call sites (`HeroSection`, `LandingPage` x4). | Use `.divider-h-tapered` (utilities.css:305). |
| 2.4 | `src/assets/styles/main.css:66-71, 73-80` | `btn-ghost` and `btn-cta` `@utility`. `btn-ghost` reinvents `Button variant="ghost"` four-state contract. `btn-cta` is a custom transport-tier hero button (`hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0`) — synthesis gap 38 territory (`Button variant="transport"|"rainbow"`). 4 call sites total. | btn-ghost → drop and use `<Button variant="ghost">`. btn-cta → propose as second consumer of synthesis gap 38, OR ship as `Button variant="cta" size="lg"` if speedtest doesn't already cover. |
| 2.5 | `src/assets/styles/main.css:27-29` | `instrument-serif` `@utility` aliases `--font-serif` (which preset-bbnf already pins to Instrument Serif). 37 call sites across the codebase. | Drop the alias — use Tailwind `font-serif` directly, OR keep as a stable migration alias and document. |
| 2.6 | `src/assets/styles/main.css:402-407` | `@layer components { .dock-badge { @apply px-1.5 whitespace-nowrap tabular-nums; color: color-mix(...) } }` — consumer `@layer components` redefining glass-ui's component-layer naming convention. Single call site (`DebugPanel.vue:50`). | Drop and use `<MetricBadge size="sm">` (synthesis gap 26) once it lands; until then inline the three rules. |
| 2.7 | `src/components/landing/FeatureCards.vue:71` + `src/components/landing/DemoCards.vue:96` | `class="code-badge"` — references a utility that **does not exist in canon** (per `tests/public-surface.spec.ts:213-221` `retiredRootUtilities`). Silent failure: rule applies no styling, only the per-card `:class="part.codeClass"` (`text-pastel-*/N bg-pastel-*/N border-pastel-*/N`) carries the look. 6 invocations across two consumer surfaces. | Either re-add `.code-badge` to glass-ui canon (synthesis cross-lane: F's silent-failure register, A axis 2 dead-utility ledger) OR drop `class="code-badge"` from both call sites since the colour classes already do the work. F lane already flags this exact pattern as silent failure. |
| 2.8 | `src/lib/toneMaps.ts:42-44` returns `"gold-shimmer"` and `"blue-shimmer"`. `.gold-shimmer` exists (utilities.css:124) but `.blue-shimmer` is in `retiredRootUtilities`. Used at `LivePreviewStrip.vue` preset selector + `ExampleSelector.vue:60, 77, 81` + `ControlsBar.vue:81` → 5 call sites consuming `shimmerClass()`. | Either ship `.blue-shimmer` (sibling of `.gold-shimmer`) — or build the synthesis-gap-9 `.text-shimmer-{vivid,pastel}` family. F lane evidences the same gap; this is a second consumer. |
| 2.9 | `src/views/DocsPage.vue:144-167` | 23-line `.sidebar-toggle-btn` scoped recipe with raw `color-mix`, sticky positioning, `:hover/:active` recreating `Button` four-state plus hover lift. | `<Button variant="ghost" size="icon">` with sticky positioning on the wrapper. |
| 2.10 | `src/views/playground/PlaygroundPage.vue:131-145` (split-pane divider) | 14-line custom button-as-handle with `bg-card/35`, `bg-card/70 backdrop-blur-xl`, `focus-visible:ring-2 focus-visible:ring-ring/50`, plus `cursor-col-resize`. Reinvents the focus-visible token shape. | Reuse `.focus-ring` + `.glass-subtle` + a `Button variant="ghost"` shell. The pointer-capture and keyboard-arrow handling is real consumer logic (split-pane resize) — keep that. |
| 2.11 | `src/components/layout/FormatterSettings.vue:50-54` | 5-line ad-hoc trigger button with `border-border/35`, `bg-background/30`, `hover:border-border/55`, `hover:bg-background/45` open-coding both the four-state contract and a per-state colour mix. | Pattern is `Button variant="outline"` plus the `aria-expanded` toggle that `Dialog` already wires via `data-state`. |
| 2.12 | `src/components/landing/CodeCardGrid.vue:18-22` + `src/components/landing/CodeCardFan.vue:46-53` + `src/views/playground/PlaygroundPage.vue:138` + `src/components/landing/FooterSection.vue:7` + 4 more | `bg-card/N + backdrop-blur-{md,lg,xl}` recipes inline, ≥ 12 sites. Each is a glass-tier surface bypassing canonical `.glass-{subtle,default,medium,elevated}`. | Adopt the matching tier class. The two code-card landing components are particularly load-bearing (the 3-D fan and 2-col grid both hold one styling rule that should be `.glass-medium`). |

### Axis 3 — Interactive consistency

| # | Site | Drift | Replacement |
|--|--|--|--|
| 3.1 | 18 sites with raw `active:scale-{95,90,[0.95],[0.97],[0.98]}` (Walkthrough{Overlay,Controls}, NavBar, FormatterSettings, DocsSidebar, LiveBench, RunnableCode, DocsPage sidebar-toggle-btn, BenchChart, LivePreviewStrip ×2). | Five different press scales picked ad hoc, none routing through `--scale-press*`. | Adopt `.active-scale` (or canon `--scale-press` token). Cross-references synthesis line 63 — `.active-scale` was retired in F W4 and consumers are stranded. |
| 3.2 | `src/views/playground/PlaygroundPage.vue:134` | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50` — bespoke focus ring not aligned with canon's `--focus-ring-shadow`. | Apply `.focus-ring` utility. |
| 3.3 | `src/components/walkthrough/WalkthroughOverlay.vue:55, 57` + `src/components/docs/LiveBench.vue:75-76` + `src/components/docs/RunnableCode.vue:84-86` | `disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none` and `disabled:opacity-40 disabled:cursor-not-allowed`. Two ad-hoc opacity rungs (30, 40) instead of canon's `--opacity-disabled` (0.5). | Adopt `.disabled-base` (currently in retired-utility ledger; needs re-add per synthesis line 63). |
| 3.4 | `src/components/landing/HeroSection.vue:106-122` (the two CTA `router-link`) | The `btn-cta` class plus `bg-pastel-green/10 border border-pastel-green/30` plus an inner shimmer overlay div (~7 lines per CTA). Two near-identical CTA copies differing only in tint. | A `<Button variant="cta" tone="green|blue">` covers both. Synthesis gap 38 + 9 (`Button variant="rainbow"` plus shimmer overlay). |
| 3.5 | `src/components/walkthrough/WalkthroughOverlay.vue:71-83` (Next/Finish button pair) | `flex items-center gap-1 text-xs text-foreground font-medium hover:text-pastel-green transition-all active:scale-95` open-codes a small text-button shape twice. | `<Button variant="ghost" size="sm">` with content slot. |
| 3.6 | `src/components/docs/FlowChart.vue:117-126` | `.flow-node--clickable:hover { filter: brightness(1.1); transform: scale(1.01); border-color: ...; box-shadow: 0 0 0 1px ... }` — raw hover lift + box-shadow tween. Cartoon-card territory. | `Card variant="cartoon" clickable` once that variant carries the four-state contract; until then the recipe should `@apply hover-lift-md` or similar. |
| 3.7 | `src/components/layout/ErrorDialog.vue:43-46` (DialogTrigger) | Custom `flex items-center gap-1 rounded-xl px-2 py-1 text-sm text-destructive transition-colors hover:bg-destructive/8 hover:text-destructive/80` — destructive-tinted button without the four-state CVA. | `<Button variant="ghost" tone="destructive">` if the gap-24 tone variants land, OR use `class="btn-pill"` plus inline tone colour. |

### Axis 4 — Variant orthogonality and rooting

| # | Site | Drift | Replacement |
|--|--|--|--|
| 4.1 | `src/components/editors/EditorPanel.vue:38` | `<Card variant="pane" class="!shadow-none">` — uses `!important` to defeat the variant's default shadow. The variant ships a `flush?: boolean` prop expressly for this case (`Card.vue:31, 45`). | `<Card variant="pane" flush>`. |
| 4.2 | `src/components/layout/NavBar.vue:144-167` | Custom dropdown rendered as `<div class="absolute … bg-card/95 backdrop-blur-xl shadow-lg p-1 z-[var(--z-popover)]">` with manual transition. DESIGN.md `Migration Tasks:25` already calls this out. | `<DropdownMenu>` from glass-ui. |
| 4.3 | `src/components/layout/NavBar.vue:230-263` | Scoped `.attribution-card` reproduces a HoverCard inside NavBar (`position:absolute`, `transform: scale(0.92) translateY(6px)`, hand-rolled `is-open` toggle). DESIGN.md flags it. | `<HoverCard>`. The hover delay/show logic via `onClickOutside` + manual timer is the work item. |
| 4.4 | `src/views/playground/RightPane.vue:82-121` | `HoverCardRoot` + `HoverCardPortal` + `HoverCardContent` from `reka-ui` directly — bypassing glass-ui's `<HoverCard>` re-export. Plus inline `class="z-[var(--z-hovercard)] w-72 rounded-xl border border-border/40 bg-card/90 p-4 shadow-lg backdrop-blur-xl"` redeclaring the elevated-glass tier with raw values. | Use `<HoverCard>` + `<HoverCardContent>` from `@mkbabb/glass-ui` once the latter exposes a `content-class` slot prop (synthesis gap 42). |
| 4.5 | `src/views/playground/PlaygroundPage.vue:131-145` (split-pane divider) | Inline `class="bg-card/35"` on a Tooltip-wrapped button; the inner `bg-card/70 backdrop-blur-xl` is a second blur layer. | Consolidate onto a single `.glass-default` surface; the divider is otherwise a unique consumer composable. |
| 4.6 | `src/components/docs/TabBar.vue` | A 4-line custom segmented control rendered with `border-b border-border/20 overflow-x-auto` + per-tab underline. Two consumers: `CodeTabs` and `BenchChart`. | `<Tabs variant="underline">` (synthesis gap 15: `Tabs variant="underline"|"pill"`). |
| 4.7 | `src/components/editors/EditorPanel.vue:67-79` (in-pane tab switcher) | A second tab-switcher pattern, this one styled as inline pill-buttons (`flex items-center gap-1 rounded-md px-2 py-0.5`) with redo-arrow icon and per-tab tone colour driven by inline `:style`. The tabs are mutually exclusive with the `slot="key"` content swap below. | `<Tabs variant="pill" tone-via-prop>`; the redo-arrow + colour-driven prefix is a content slot job. |

### Axis 5 — Overlay and motion vocabulary

| # | Site | Drift | Replacement |
|--|--|--|--|
| 5.1 | 7 sites (NavBar, HeaderRibbon ×4, DocsPage scoped, main.css) | `cubic-bezier(0.4, 0, 0.2, 1)` hand-rolled (covered axis-1 row 1.11). | `var(--ease-standard)`. |
| 5.2 | 16 `transition-all` Tailwind utilities (HeroSection, CodeCardGrid, FeatureCards, DemoCards, LivePreviewStrip, CodeCardFan, NavBar, FormatterSettings, WalkthroughControls, WalkthroughOverlay ×6, DocsSidebar ×2, LiveBench, RunnableCode, FlowChart, BenchChart, PlaygroundPage divider, plus `main.css` ×2). | `transition: all` triggers reflow on every animatable property, expensive on Monaco-adjacent surfaces. | Replace each with the specific properties (`transition-[colors,transform]` on most). |
| 5.3 | `src/assets/styles/main.css:83-99` + `src/components/walkthrough/WalkthroughOverlay.vue` + `src/components/landing/DemoCards.vue:113-146` (sweep keyframe) + `src/components/landing/TypewriterText.vue:43-73` (rainbow-shift, shimmer) + `src/components/custom/bbnf-logo/BbnfLogo.vue:36-47` | Five custom `@keyframes` blocks: `description-marquee` (5.5s), `sweep` (20s), `rainbow-shift` (4s), `shimmer` (5s, dup-defined twice in BbnfLogo and TypewriterText), `blink` (1.06s step-end). | Three of five align with canonical patterns: `shimmer` ≈ `gold-shimmer-slide` (`var(--duration-shimmer)`). The other two (`description-marquee`, `sweep`) are valid consumer-specific choreography but should be enumerated, not inlined. The duplicate `shimmer @keyframes` between TypewriterText and BbnfLogo is a clean factoring opportunity. |
| 5.4 | `src/views/DocsPage.vue:170-184` | `mobile-drawer` Vue `<Transition>` with bespoke `cubic-bezier(0.4, 0, 0.2, 1)` translate-X + opacity. Canon ships `Sheet side="left"` + `slide-in-from-side` + `--z-modal`. | Replace with `<Sheet>` (or at minimum `slide-in-from-side`). |
| 5.5 | `src/assets/styles/main.css:91-99` + `src/components/landing/DemoCards.vue:112-146` + `src/components/walkthrough/WalkthroughOverlay.vue` (the progress dots, lines 61-67 transition) | `hover-card` Vue `<Transition>` and `mobile-pane` `<Transition>` and `nav-dropdown` `<Transition>` and `page-fade` `<Transition>` — four named transition classes redefined. Canon ships `popover-animate`, `dialog-scale`, `fade`, `fade-slide`, `slide-in-from-side`, `dropdown` named transitions. | Map each: hover-card → `fade-slide`; mobile-pane → `fade-slide`; nav-dropdown → `dropdown`; page-fade → `fade`. |
| 5.6 | `src/components/walkthrough/WalkthroughControls.vue` + `src/components/walkthrough/WalkthroughOverlay.vue` | The "annotation card hovering above content" pattern uses `bottom-20 left-1/2 -translate-x-1/2 z-[var(--z-overlay)]` + a `<Toast>`-style content card with progress strip. The whole composition is conceptually `<Toast variant="walkthrough">` — synthesis gap 22 (`Toast variant="inverse">`) is a near sibling, but walkthrough-style annotations are a distinct primitive. | Note as new gap: `<WalkthroughAnnotation>` / `<TourStep>` carrying step-num pill + progress strip + prev/next + close. Could be ≥2 consumer prospective. |
| 5.7 | `src/components/walkthrough/WalkthroughOverlay.vue:18-23` | `<div class="absolute top-0 left-0 right-0 z-[var(--z-overlay)] h-0.5 bg-muted/30"><div class="h-full bg-pastel-green transition-all duration-500 ease-out" :style="{ width: ... }"></div></div>` — open-coded `<Progress>`. | `<Progress :value :tone>`. |

### Axis 6 — Typographic and structural hierarchy

| # | Site | Drift | Replacement |
|--|--|--|--|
| 6.1 | `src/components/landing/HeroSection.vue:59` + `src/components/landing/TypewriterText.vue:21, 28, 31` | `text-display-2 sm:text-display-3` — only 4 sites in the codebase that actually consume `.text-display-*`. The hero correctly anchors on canon. | OK — keep. |
| 6.2 | `src/components/editors/EditorPanel.vue:42-46` (active tab title) + `src/components/layout/FormatterSettings.vue:65, 70, 77` + `src/components/layout/ErrorDialog.vue:54` + 4 more "instrument-serif text-{xl,3xl}" patterns | The active editor pane title renders at `text-3xl tracking-tight` via instrument-serif — that is heading-tier display weight without going through `.text-heading` or `.text-title`. 8+ display-tier sites bypass the `.text-{display,title,heading,subheading}` cascade. | Map each: editor-pane-title → `.text-pane-title` (typography.css:259), dialog titles → `.text-title`. |
| 6.3 | `src/components/docs/DocsSidebar.vue:232` | `instrument-serif text-xs uppercase tracking-wider` — the canonical `.section-label` shape. Single site here, but the same shape is also at `src/views/DocsPage.vue:96` (`text-[0.625rem] font-mono uppercase tracking-wider`), `src/components/layout/ErrorDialog.vue:65` (`text-xs font-medium uppercase tracking-wider`), `src/components/docs/LiveBench.vue:90, 96` (×2 `text-[0.625rem] uppercase tracking-wider`), `src/components/docs/RunnableCode.vue:66, 74` (×2 `text-xs font-mono font-semibold uppercase tracking-wider`), `src/components/docs/BenchChart.vue:169` (`text-[0.5625rem] font-bold uppercase tracking-wider`), and `src/assets/styles/main.css:183, 228` (×2). 11+ sites; mono / serif inconsistent. | All collapse onto `.section-label` (typography.css:286). Cross-lane: B has 10×, D has 18+, C scattered — bbnf adds 11 to the synthesis gap-1 total. |
| 6.4 | `src/components/landing/CodeCardGrid.vue:27` (`text-[0.625rem]`), 7 more sites with `text-[0.625rem]/[0.6875rem]/[0.5625rem]` (DocsSidebar, BenchChart ×3, LiveBench ×3, DebugPanel, RightPane WASM badge, DocsPage section badge). | Ad-hoc tiny-text rungs (10px, 11px, 9px) instead of canonical `--type-{micro,caption}` (which DESIGN.md `Migration Tasks` already names). 9 sites. | `.text-micro` / `.text-2xs`. |
| 6.5 | `src/components/landing/FeatureCards.vue:66` (`text-base sm:text-lg`) + `src/components/landing/DemoCards.vue:74` (`text-2xl sm:text-3xl`) + `src/components/docs/DocsPage.vue:127` (`text-xl`) + `src/components/walkthrough/WalkthroughControls.vue:14` (`text-sm`) + walkthroughs + landing copy | 8+ heading or body sites use raw Tailwind `text-{xs..3xl}` instead of `.text-{body,prose,subheading,heading,title}`. | Map each. |
| 6.6 | `src/components/debug/DebugPanel.vue:65` | `<kbd class="mx-0.5 rounded border border-border/40 bg-muted/30 px-1 py-0.5 text-[0.625rem] font-mono">` — full open-coding of canon's `.kbd` (utilities.css:134). Single site. | `<kbd class="kbd">`. |
| 6.7 | `src/components/landing/HeroSection.vue:115, 117` (CTA headings — `instrument-serif text-lg`) + several other CTA labels | The CTA-button text is rendered as Instrument Serif at `text-lg`, large display tier in a button. No mapping to canonical `.text-display-*`. | Likely a `Button variant="cta"` slot styled internally. |
| 6.8 | `src/components/docs/BenchChart.vue:87, 93` (`text-2xl font-mono font-semibold`) + `src/components/docs/LiveBench.vue:88, 94` (same shape) | Big stat numerals: `text-2xl font-mono font-semibold tabular-nums` plus `style="color: var(--color-pastel-cyan)"`. 4 sites that read as `.text-display-stat` (synthesis gap 35). | `.text-display-stat` once shipped. Currently second consumer of the proposal (D has 9 sites). |

### Axis 7 — Accessibility resilience

| # | Site | Drift | Replacement |
|--|--|--|--|
| 7.1 | `src/assets/styles/main.css:51, 55, 59` + 12 inline `bg-card/N backdrop-blur-{lg,xl}` sites | Glass surfaces reimplemented inline; none carry fallback for `prefers-reduced-transparency` / `@supports not (backdrop-filter)`. Canon's `.glass-*` classes embed the fallback. | Adopt `.glass-{subtle,default,medium,elevated}`. (Same fix as 2.1 / 2.12.) |
| 7.2 | `src/components/walkthrough/WalkthroughOverlay.vue:65` (progress-pill width animation) + `src/components/landing/CodeCardGrid.vue:12-13` (`opacity-100 translate-y-0` entrance) + `src/components/landing/HeroSection.vue:50-57` (entrance reveal) + `src/components/landing/CodeCardFan.vue:29-30` (parallax + 3D) | Spatial motion not bracketed by `prefers-reduced-motion`. The 3D `cardTransform` in CodeCardFan and the typewriter's morph flight in `useHeroSequence` are particularly motion-heavy. | Wrap in `@media (prefers-reduced-motion: reduce)` opacity-only fallback. |
| 7.3 | `src/components/editors/MonacoEditor.vue:67-72` | Hard-coded `theme: isDark.value ? "dark-theme" : "light-theme"` (Dracula/GitHub) — does not surface a high-contrast variant for `prefers-contrast: more`. | Add a high-contrast theme registration plus `useMediaQuery("(prefers-contrast: more)")` switch. |

## 2. Glass-ui gaps surfaced by bbnf-lang/playground

This consumer is uniquely positioned to expose gaps in **code-rendering**, **multi-pane editor composition**, and **formal-grammar visualisation**.

### 2.1 Monaco theming bridge — `<MonacoSurface>` / `useMonacoTheme()`

bbnf-lang/playground is the only consumer that wires Monaco. `MonacoEditor.vue:5-11, 67-95, 252-255` shows: dual hard-coded JSON themes, manual `useGlobalDark` watch, `fontFamily: "Fira Code, monospace"` baked, `padding: { top: 12, bottom: 12 }`, scrollbar geometry baked. Every consumer that ships Monaco will rebuild this. Glass-ui already owns the light/dark coupling (`useGlobalDark`) and the focus-ring tokens — they should also own a `useMonacoTheme()` composable that:
- maps `--background`, `--foreground`, `--border`, `--muted`, `--pastel-*` (or accent set) onto `monaco.editor.IStandaloneThemeData.colors`,
- registers `dark-theme` and `light-theme` from a single token-derived recipe,
- exposes a `prefers-contrast: more` rung,
- returns the theme name reactive to `useGlobalDark`.

Call sites: 1 consumer site today, but cross-cuts D's prospective Latex paper editor and E's keyframes Monaco demo (synthesis risk-register E). Counts as ≥2 prospective consumers if any other consumer touches Monaco.

### 2.2 Mathematical / formal-grammar typography (`<MathSurface>`, `<MathFormula>`, syntax-highlight runtime)

The synthesis gap 10 (`<MathSurface>` + math.css + `<MathFormula>` + `--type-formula`) shows up in this consumer in three forms:

- **Grammar production rules in prose**: `src/lib/markdown.ts:72-79` defines a `bbnf` syntax-highlight rule set (`@directive`, `group/indent/sep` builtins, regex slashes, operators). This is a runtime BBNF tokenizer co-located with markdown render. Rust + TS + JSON + CSS + TOML + Bash are all defined alongside (`langRules`, lines 49-105). The whole highlighter is a 65-line lookup-table that synthesis gap 11 (`spectrumColor`/`NAMED_EASING_BEZIER` runtime utilities) does not cover — it would be a `runtimeHighlighter` peer.
- **AST tree visualisation**: `src/components/landing/LivePreviewStrip.vue:136-188` ships three more open-coded highlighters (`highlightGrammar`, `highlightInput`, `highlightJson`) that duplicate the first set inline. 5+ regex-based tokenizers across the consumer.
- **Production-rule cards**: `src/lib/heroCards.ts:1-104` encodes a 4-card layout (`Grammar`, `Input`, `Parsed AST`, `Formatted`) with per-span `cls` classes (`hl-type`, `hl-string`, `hl-operator`, `hl-decorator`, `hl-builtin`, `hl-number`, `hl-keyword`, `hl-comment`, `hl-regex`). Same vocabulary as the Monaco BBNF Monarch (`src/components/editors/bbnfMonarch.ts`).

**Proposed primitive**: `<CodeBlock language>` + `runtimeHighlight()` API in glass-ui's runtime tokens module, where the `hl-*` class set lives in canon and consumers register language rule sets. The `hl-{string,number,keyword,operator,comment,type,decorator,regex,builtin}` family is then one canonical CSS group. 12+ consumer call sites here; C's syntax-highlighting (latex paper) is the second prospective consumer.

### 2.3 Split-pane composable + `<SplitPane>` primitive

`src/composables/useSplitPane.ts` is 209 lines covering:
- desktop/mobile axis switching via `useMediaQuery`,
- per-axis ratio persisted to localStorage (separate keys),
- pointer drag with `setPointerCapture`,
- arrow-key fine adjust + Home/End,
- min-pane clamp (`DESKTOP_MIN_PANE_PX` / `MOBILE_MIN_PANE_PX`),
- ResizeObserver re-clamping.

The composable is paired with the `PlaygroundPage.vue:131-145` divider button (the visible handle). The composable is genuinely reusable — every dual-pane editor consumer in glass-ui's prospective lineup (a future "diff viewer", any IDE-style consumer) needs the same logic. Synthesis already has gap 17 (`pane-swap-scale` transition + `.collapse-x` utility + `useCollapse({ axis })`) which is adjacent; bbnf evidence narrows that gap toward a full **`useSplitPane({ axis, persistKey })`** + **`<SplitPane>`** + **`<SplitPaneDivider>`** triple.

Call sites: 1 here, prospective ≥2 across IDE-shaped consumers.

### 2.4 `<KeyboardShortcutsModal>` analogue — `<WalkthroughTour>` / step-pill annotation primitive

Synthesis gap 20 lists `<KeyboardShortcutsModal>` (E, B). bbnf's walkthrough overlay (`src/components/walkthrough/WalkthroughOverlay.vue` + `WalkthroughControls.vue`) is a sibling primitive: an in-app guided tour with step pill + progress dots + prev/next + close, anchored above the playground. The composable shape (`useWalkthrough` returning `currentStep`, `currentStepIndex`, `totalSteps`, `progress`, `nextStep/prevStep/exitDemo`) is generic.

Bbnf is the second consumer of "structured in-app instruction surface" (with E's ShortcutsModal as the first). Synthesis can either expand gap 20 to a "instructional-overlay family" or split out `<WalkthroughTour>` separately. ≥2 prospective consumers (E keyframes demos + this one).

### 2.5 Live-eval feedback — diagnostic chip pattern

`src/views/playground/RightPane.vue:82-121` (`gorgeous (WASM)` HoverCard with parse-time/format-time/total/input-bytes telemetry) plus `src/components/debug/DebugPanel.vue:38-42` (status text with `text-pastel-{green,amber}` driven by `snap.completed`/`snap.isError`) plus `src/components/layout/ControlsBar.vue:53-62` (the "OK" pill rendered when `errors.length === 0`) plus `src/components/walkthrough/WalkthroughOverlay.vue:33-35` (step-num bullet) form a recurring **status-pill** vocabulary. Synthesis gap 21 (`<StatusDot variant="progress">`) is the dot version; bbnf evidences a fuller need:

- `<StatusPill tone="success|warning|destructive|info" :icon :badge>` — used 4+ times in this consumer.
- `<TelemetryHoverCard>` — the gorgeous-(WASM) hovercard is generic shape (label + 4-row `Parse / Format / Total / Input` grid + external link).

≥3 call sites here for status-pill, 1 for telemetry hovercard. The status-pill is a strong ≥2-consumer absorption candidate (B speedtest's ok/error dock badge is the same).

### 2.6 Section-themed badge (icon + tone + label)

`src/lib/sectionTheme.ts:20-51` defines a per-section `SectionTheme { color, iconPath, iconPath2?, iconSrc? }` table consumed at `DocsPage.vue:94-114` (the floating section badge in the article corner) and `DocsSidebar.vue:217-234` (sidebar section header). Pattern: small SVG glyph + tone-colour + label, rendered as a rounded-full chip with `bg-color/N` + `border-color/N`. Same shape appears in `ExampleSelector.vue:93-100` (tag chip with `tagToneStyle`), `InlineRichText.vue:54-71` (inline code chip with `tokenToneMap`).

5+ chip-with-tone-and-icon sites. Synthesis gap 13 (`<ColorPill>` / `Badge variant="color"`) directly absorbs but does not currently include the *icon* slot — bbnf evidences a `<Badge variant="section" :icon :tone>` extension. Cross-lane: D's per-tier badge (`<TierBadge>` synthesis gap 37) is a sibling.

### 2.7 Bench bar / parser-comparison bar primitive

`src/components/docs/BenchChart.vue` is 220 lines of bespoke horizontal-bar chart with hover tooltip, mobile-stack vs desktop-row responsive shape, "is-ours" marker badge, "is-winner" highlight, and per-series colour. Pure data-viz primitive that bbnf needs but B's speedtest also needs (synthesis B-lane meter chassis territory). The runtime side (`useChartData`, `getBarColor`, `formatValue`) is thin glue.

Two consumers (B + bbnf-lang/playground) want a `<HorizontalBarChart>` / `<MetricList>` primitive. The exact synthesis gap doesn't yet enumerate it — propose as new gap.

### 2.8 Flow chart / pipeline visualisation primitive

`src/components/docs/FlowChart.vue` (133 lines) renders a vertical pipeline of node pills with arrow connectors, each node having `label / detail / color / href`. Used inside docs to visualise the parser/printer pipeline. The shape is generic enough that any consumer documenting a pipeline (E's keyframes timeline pipeline, F's color pipeline) could share it. Synthesis gap 18 (`<KeyframeTimeline>` family) is a sibling but oriented to time. Propose a co-equal `<PipelineFlow>` / `<NodeChain>`.

### 2.9 Live-runnable code primitive (`<RunnableCode>`)

`src/components/docs/RunnableCode.vue` (105 lines) embeds a grammar / input / output triple with a Run button that drives the WASM module. The harness is bbnf-specific but the *shape* — three labeled code blocks + run button + collapsing output — is a generic "live snippet" primitive matching synthesis gap 18's prospective `<KeyframeTimeline>` / `<BezierCurveCanvas>` pairing. Propose `<LiveSnippet>` if a second consumer surfaces.

## 3. Union candidates

Same pattern, different vocabulary:

| Pattern | bbnf form | Glass-ui canon | Canonical proposal |
|--|--|--|--|
| Cartoon offset shadow | `--shadow-card: 3px 3px 0px 0px` + `--shadow-hover: 5px 7px 0px 0px` (preset-bbnf.css:37-38) | `--shadow-cartoon` (3px) + `--shadow-cartoon-hover` (4px) (tokens.css:223-224) | Adopt canon names; canon's hover step is 4px while bbnf wants 5px+7px asymmetric — that asymmetric "hover-lift cartoon" rung is a candidate `--shadow-cartoon-lg` extension matching synthesis gap 2. |
| Smooth-out easing | `--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)` (preset-bbnf.css:49) | `--ease-standard` (same value) | Drop bbnf alias; reference canon. |
| Spring easing | `--ease-spring` (referenced at CodeCardFan.vue:68 — does not exist anywhere → silent failure) | `--spring-{smooth,snappy,bouncy,gentle}` (canon §2 of tokens) | bbnf accidentally invented; it should be `--spring-bouncy`. |
| Card tier substrate | `card-base` / `card-subtle` / `card-elevated` `@utility` (main.css:50-60) | `.glass-{subtle,default,medium,elevated}` | Adopt canon. DESIGN.md `Migration Tasks` already endorses this. |
| Cartoon-tinted shadow | `shadow-card` + `shadow-card-hover` `@utility` (main.css:31-43) | `.shadow-cartoon-{sm,md,lg}` (utilities.css:266-291) plus the synthesis gap-2 `--cartoon-accent-color` hook | Adopt canon, then opt into the accent-tint hook once gap 2 lands. |
| Tapered horizontal rule | `tapered-rule` `@utility` (main.css:45-48) | `.divider-h-tapered` (utilities.css:305) | Adopt canon (5 sites). |
| CTA hero button | `btn-cta` (main.css:73-80) | `Button variant=…` | Synthesis gap 38 (`Button variant="transport"|"rainbow"`) absorbs. |
| Ghost button | `btn-ghost` (main.css:66-71) | `Button variant="ghost"` | Drop alias. |
| Brand serif font | `instrument-serif` `@utility` (main.css:27-29) | `font-serif` Tailwind utility / `--font-serif` token | Drop alias once consumers can rely on the preset's font remap. 37 sites. |
| Gold-shimmer text | `.bbnf-shimmer` scoped-style (BbnfLogo.vue:36-47), `.tw-golden` (TypewriterText.vue:62-73), `gold-shimmer` mention via `shimmerClass` | `.gold-shimmer` (utilities.css:124) | All three converge on canon. |
| Blue-shimmer text | `shimmerClass(name) → "blue-shimmer"` (toneMaps.ts:43) | `.blue-shimmer` retired (tests/public-surface.spec.ts:215) — silent failure | Either re-add `.blue-shimmer` or land synthesis gap 9's pastel-shimmer set. F lane evidence + bbnf evidence ⇒ ≥ 2 consumers. |
| Code-badge inline pill | `class="code-badge"` (FeatureCards.vue:71, DemoCards.vue:96 — silent failure) | `.code-badge` retired | Re-add canonical `.code-badge` `@utility` paired with `.inline-pill`; F lane already surfaces this. |
| `.section-label` shape | 11+ ad-hoc `instrument-serif text-xs uppercase tracking-wider` and `text-[0.625rem] font-mono uppercase tracking-wider` recipes | `.section-label` (typography.css:286) | Adopt canon (synthesis gap 1 — drift, not gap). |
| `.kbd` shape | `<kbd class="… text-[0.625rem] font-mono">` (DebugPanel.vue:65) | `.kbd` (utilities.css:134) | Adopt canon. |
| `.metric-badge` shape | `dock-badge` `@layer components` (main.css:402-407) | `.metric-badge` (utilities.css:151) + synthesis gap 26 (`MetricBadge size="xl"`) | Adopt canon. |
| Glass-medium recipe | inline `bg-card/{60,80,90,95} backdrop-blur-{lg,xl}` (12+ sites) | `.glass-{subtle,default,medium,elevated}` | Adopt canon. |
| Vue `<Transition>` named classes | `hover-card`, `mobile-pane`, `nav-dropdown`, `page-fade`, `mobile-drawer` | `popover-animate`, `dialog-scale`, `fade`, `fade-slide`, `slide-in-from-side`, `dropdown` | Map per the table in axis 5. |
| Hard-coded ease string | 7 `cubic-bezier(0.4, 0, 0.2, 1)` literals | `var(--ease-standard)` | Drop literals. |

## 4. Design-language signal toward the new axes

### Cream
- No cream rendering surface. preset-bbnf overrides glass tier into a Card-pastel substrate but never visits cream hue 48. **Bbnf does not signal cream.**
- Library primitive: N/A.

### Colorful flourishes
- **Strong signal**, mostly bypassing canon:
  - `TypewriterText.vue:48-58` `.tw-rainbow` open-codes a 6-stop rainbow gradient (`#ff6b6b, #ffd93d, #6bff6b, #6bc5ff, #c56bff, #ff6b6b`) — synthesis gap 9's vivid rainbow scope.
  - `BbnfLogo.vue:36-47` and `TypewriterText.vue:62-73` independently re-ship the same gold shimmer recipe; canon `.gold-shimmer` already exists.
  - `LivePreviewStrip.vue:262-272` segmented preset selector with `bg-pastel-green/20` + `text-pastel-green` semantic-tinted pill — colourful flourish at small scale.
  - 4 colour shimmers per demo card (`shimmer-{green,amber,blue,pink}` keyframes in `DemoCards.vue:122-141`) — pastel-tinted gradient sweeps.
  - The `.tw-golden` class is the brand "BBNF" type-as-icon.
- Reinventing or hard-coded: yes, all of the above bypass canon.
- Library primitive: synthesis gap 9 (`.bg-rainbow-{vivid,pastel}`, `.text-rainbow-pastel`, `.text-shimmer-gold`) — bbnf is a third+ consumer.

### Mathematical
- **Strongest signal in this consumer**:
  - The product is *literally* a grammar-driven parser + formatter for formal languages. Every component renders BBNF / JSON / CSS / Math / Google-Sheets / Hello / "BBNF in BBNF" with a per-language tone and icon.
  - `src/composables/examples/math.ts` (referenced from `examples/index.ts`) holds a math grammar; `LivePreviewStrip.vue:33-41` ships an arithmetic-grammar preset.
  - `useChartData.ts` (docs) emits proportional bars with `tabular-nums`.
  - `BenchChart.vue:107-156` uses `tabular-nums` + mono numerals as canonical "math display".
  - `markdown.ts:248-254` post-processes prose to wrap `\d+(\.\d+)?\s*(MB\/s|GB\/s|ops\/s|ms|µs|KB|MB|GB|x)` into `<span class="perf-number">…</span> <span class="perf-unit">…</span>` — a true-math typography rule (numeric + unit pair).
  - The whole `code-tabs` / `runnable-code` / `bench-chart` / `live-bench` / `flow-chart` markdown-fence vocabulary is a **formal-grammar prose extension** (markdown.ts:179-240).
- Reinventing: yes — `.perf-number / .perf-unit` is the closest bbnf gets to math typography; canon `--type-formula` (synthesis gap 10) has not landed.
- Library primitive: **strongest direct demand for synthesis gap 10**. The math.css opt-in stylesheet should ship `.perf-number` / `.perf-unit` / `.formula-block` / `.production-rule` (BBNF productions are a textual analogue of a math display block). Concretely: `.production-rule { font-family: var(--font-mono); display: grid; grid-template-columns: max-content auto; gap: 0 0.5em; }` plus `.production-rule .lhs::after { content: " ::= "; color: var(--muted-foreground); }`. Bbnf is C lane's strongest cross-evidence consumer for math.css.

### Cartoon-shadow accent extension (no new bevel vocabulary)
- **Heavy signal**:
  - `--shadow-card: 3px 3px 0px 0px` + `--shadow-hover: 5px 7px 0px 0px` (preset-bbnf.css:37-38) — exactly the synthesis gap-2 vocabulary, but anchored to a brown `--shadow` hue rather than an accent.
  - 14+ `card-base / shadow-card / shadow-card-hover` consumer sites (FeatureCards, DemoCards, LivePreviewStrip, plus the docs `.code-card` and `prose .code-card` derivatives in main.css:162-179).
  - `prose table` (main.css:218-221) gets a 2px x 2px x 0px x 0px hard offset shadow — a tiny cartoon-shadow.
- Reinventing: yes — bbnf hard-codes the offsets on a per-utility basis instead of the canon hook.
- Library primitive: synthesis gap 2 (`--shadow-cartoon-accent` + `--cartoon-accent-color`) absorbs cleanly. Bbnf becomes the fifth consumer (after F, B, C, D).

### Bold / audacious large typography
- **Strong signal**:
  - Hero `text-display-2 sm:text-display-3` + Instrument Serif (HeroSection.vue:59) — the largest type rung in any consumer.
  - The typewriter's morph-to-navbar choreography (`useHeroSequence.ts:96-133`) treats type as a flying object, with `position: fixed` + transform interpolation between the typewriter and the navbar logo.
  - Editor pane title `instrument-serif text-3xl tracking-tight` (EditorPanel.vue:42-46) is a "display tier in a tab strip" — exactly the "big type as chrome" idiom.
  - Footer `BbnfLogo size="sm"` + giant-letter typographic icon as the brand mark (BbnfLogo.vue:23-32 — `xs..2xl` size set yields `text-9xl` at the largest).
  - `BenchChart.vue:171` pulls `font-bold uppercase tracking-wider` for the BBNF tier-badge.
- Reinventing: typography is bypassing `.text-display-{1..5}` partially (only 4 sites consume canon). Display-mega/ultra is not yet evidenced by need but the morphing-display-into-icon pattern is strong.
- Library primitive: synthesis gap 6 (`--type-display-mega` / `display-ultra` + `<DisplayHero>` + per-rung Fraunces axes) — bbnf's hero needs `<DisplayHero>` with a morph-to-icon capability. The hero animation also shows the typographic-icon idiom (synthesis gap 10 `<TypographicIcon>`).

### Large / audacious iconography
- **Moderate signal**:
  - `BbnfLogo.vue` ships its own `xs..2xl` size grid (h-4..h-20) — a parallel `--icon-{xs..2xl}` ladder anchored to the brand mark.
  - `EditorPanel.vue:44, 46` renders the BbnfLogo at `size="sm"` as an inline glyph in the language-badge corner.
  - `BbnfLogo size="xl"` (HeroSection.vue:85, 95) renders a `h-14 w-14` icon — the morph-target.
  - 5+ `lucide-vue-next` icons at `h-3.5 w-3.5` to `h-6 w-6`, plus `BbnfLogo size="md"` at `h-7 w-7`. Predominantly small-tier iconography.
  - `Bug` empty-state icon (DebugPanel.vue:62) at `h-10 w-10`.
- Reinventing: bbnf has its own size grid that doesn't bridge to canon's `--icon-{xs..xl}`.
- Library primitive: synthesis gap 7 (`--icon-{2xl,3xl,mega}` + `<IconStamp>` + generated `.icon-{xs..mega}` utilities) absorbs. Bbnf is a fourth consumer.

### Motion
- **Strong signal**:
  - `useScrollTimeline` and `useScrollMorph` consumed alongside `useHeroSequence` — three bespoke composables on top of `keyframes.js` and `value.js`.
  - The morph choreography (`useHeroSequence.ts:96-133`) is unique to bbnf and probably not generalisable.
  - The 3D `CodeCardFan.vue` `cardTransform(i)` parametric layout with mouse-parallax (`useMouseParallax`) — generic enough to be a `<CardFan>` primitive but probably consumer-only.
  - `description-marquee` keyframe for over-flow descriptions in select items (ExampleSelector.vue:117-130) — niche but a candidate `.text-marquee` utility.
- Reinventing: yes — five `@keyframes` blocks defined locally; some duplicate canon (shimmer×2).
- Library primitive: gap 17 (`pane-swap-scale` transition + `useCollapse({ axis })`) is adjacent. The unique bbnf contribution is the **morph-text-into-icon** pattern (synthesis gap 6 / `<DisplayHero>` extension) — propose `useScrollMorph` as a public composable shape if a second consumer surfaces.

## 5. Risk register (do NOT promote)

Stays as bbnf-lang/playground consumer-specific:

- **`--pastel-{green,blue,purple,amber,pink,cyan}` palette** (preset-bbnf.css:24-31, 55-62) — brand palette; live as a consumer preset (synthesis "Presets in consumers" feedback).
- **`--shadow-card: 3px 3px 0px 0px` / `--shadow-hover: 5px 7px 0px 0px` literal offsets** — keep the consumer override, but the *vocabulary* (`--shadow-card`) should not collide with canon's `--shadow-card` semantic alias.
- **BBNF Monarch tokenizer** (`src/components/editors/bbnfMonarch.ts`) — language-specific; risk-register E entry already covers Monaco-tokenizer territory.
- **`useHeroSequence` morph orchestration** with phase A/B/C and `lockParent`/`unlockParent` — bbnf-specific scroll choreography.
- **`useTypewriter` autonomous loop with jitter + force-control** — could ship as a generalised `<Typewriter>` if E adopts it, but for now bbnf-specific.
- **`useWalkthrough` step-graph composable** with `currentDemo`/`currentStep` and `bbnf-playground-state` localStorage key — instructional-tour composable; could promote if a second consumer materialises (E's keyframes already has demos).
- **Markdown post-processor for `.bbnf` file links + term-tooltip annotation** (`markdown.ts:256-296`) — bbnf-specific term registry (`lookupTerm`/`lookupFileUrl`).
- **`.code-tabs`, `.bench-chart`, `.live-bench`, `.flow-chart`, `.runnable-code` markdown fence vocabulary** — bbnf-specific docs DSL; the *primitives* it produces (CodeTabs, BenchChart, LiveBench, FlowChart, RunnableCode) are gap candidates if a second consumer surfaces.
- **WASM/`gorgeous` integration** (`composables/wasm/*`, telemetry hovercard) — bbnf-specific.
- **`getSectionTheme` per-section icon+colour map** (`src/lib/sectionTheme.ts`) — bbnf-specific brand vocabulary.
- **Mobile pane segmented control** (main.css:354-396) — playground-specific UI.
- **`prose .code-card` + `prose .code-tabs` post-render hydration** (markdown.ts + `useMarkdownComponents`) — bbnf-specific docs surface.
- **`LivePreviewStrip` 8-second auto-cycling preset** — landing-page-specific.

## 6. One-line tally

Drift rows: 47. Glass-ui gaps surfaced: 9 (Monaco theming bridge; math/grammar typography + runtime highlighter; `<SplitPane>` / `useSplitPane`; `<WalkthroughTour>` step-pill; `<StatusPill>` + `<TelemetryHoverCard>`; section-themed `<Badge variant="section">`; `<HorizontalBarChart>`; `<PipelineFlow>`; `<LiveSnippet>`). Union candidates: 18. Design-signal axes evidenced: 6 of 7 (cream absent). 2 silent failures (`.code-badge` × 6 sites, `.blue-shimmer` × 5 sites). 1 invented-but-undefined token (`--ease-spring` × 1 site).

## 7. Synthesis appendix

Mapping bbnf-lang/playground evidence onto the existing `00-synthesis.md` gap ledger:

**(a) Corroborate with new sites:**

- **Gap 1** (`.section-label` migration — drift): adds 11 sites in bbnf — DocsSidebar.vue:232, DocsPage.vue:96, ErrorDialog.vue:65, LiveBench.vue:90, LiveBench.vue:96, RunnableCode.vue:66, RunnableCode.vue:74, BenchChart.vue:169, main.css:183, main.css:228, plus the `dock-badge` `@layer components`. Cross-lane total now ≥ 41 (B 10, D 18+, C scattered, bbnf 11).
- **Gap 2** (`--shadow-cartoon-accent` + `--cartoon-accent-color`): adds 14+ bbnf sites consuming `--shadow-card 3px 3px 0px 0px` accent-shaped shadows. Cross-lane total now 27+ (F 5, B chassis, C 5+, D 8+, bbnf 14+). Bbnf adds a unique signal — the asymmetric `5px 7px` hover step suggests `--shadow-cartoon-lg` is a needed third rung.
- **Gap 4** (`paper-1..4` tier + `Card variant="paper"`): bbnf does not directly evidence paper tier — it's pure glass-and-cartoon. Skip.
- **Gap 6** (display-mega/ultra + `<DisplayHero>`): adds the morphing-typography-into-icon pattern (`useHeroSequence`); the editor pane-title `text-3xl` chrome use; the BbnfLogo `2xl` rung at `text-9xl`. Cross-lane total now 16+. Bbnf narrows the gap — it wants a `<DisplayHero>` with a `morphTo: HTMLElement` slot.
- **Gap 7** (`--icon-{2xl,3xl,mega}` + `<IconStamp>`): bbnf has its own h-4..h-20 size grid in `BbnfLogo.vue:12-19`. Adds 1 prospective consumer with native size-grid demand.
- **Gap 9** (rainbow utilities + `--rainbow-pastel-*` `@theme` exposure): adds bbnf's `.tw-rainbow` 6-stop vivid rainbow + 4 demo-card per-tone sweeps + `BbnfLogo` gold shimmer. Cross-lane total now 17+ (incl. 3 silent failures across F + bbnf 2).
- **Gap 10** (`<MathSurface>` + math.css + `--type-formula`): bbnf is the **strongest** evidencing consumer for the production-rule typography use-case. `.perf-number` + `.perf-unit` post-processor (`markdown.ts:248-254`) is a working math-typography prototype. Adds 5+ math-grammar surfaces (live preview, hero cards, four code-card ASTs, the WASM telemetry table) — narrows the gap to include `.production-rule` / `.formula-block` plus a `runtimeHighlight()` API.
- **Gap 11** (spectrum/rainbow runtime utilities, NAMED_EASING_BEZIER, etc.): bbnf adds a syntax-highlighter runtime (`runtimeHighlight` + 8 language rule sets in `markdown.ts:49-105`) and 2 inline tokenizers in `LivePreviewStrip.vue` and `bbnfMonarch.ts`. Suggests **a separate runtime gap** (`runtimeHighlight()` + `LANGUAGE_RULES`) rather than folding under gap 11.
- **Gap 13** (`<ColorPill>` / `Badge variant="color"`): adds `tagToneStyle` + `tokenToneMap` chip-style sites (5+). The `tagToneStyle` includes `boxShadow: inset 0 1px 0 ...` for a 1-px highlight — bbnf adds a "highlight-rim" variant signal.
- **Gap 15** (`Tabs variant="underline"|"pill"`): adds `src/components/docs/TabBar.vue` (underline pattern, 2 consumers: CodeTabs + BenchChart) plus `EditorPanel.vue:67-79` (pill pattern, used at every editor-pane). Cross-lane total now 8+ (E 4, F 2, bbnf 4).
- **Gap 22** (`Toast variant="inverse">`): WalkthroughOverlay annotation card is a near-toast with progress strip and prev/next — propose splitting toast variants or adding `<WalkthroughTour>` cleanly.
- **Gap 24** (`Badge tone="success|warning|destructive|info"`): adds 4+ bbnf sites where `text-pastel-green` consistently means "success/OK" and `text-pastel-blue` means "info/link" — the semantic-remap absorbing into canonical tone.
- **Gap 26** (`MetricBadge size="xl"`): bbnf's `dock-badge` (DebugPanel.vue:50) is a sibling. Adds 1 site.
- **Gap 35** (`.text-display-stat`): adds 4+ sites in bbnf — BenchChart `text-2xl font-mono font-semibold` ×2 and LiveBench ×2 of the same shape. Now 13+ total (D 9, bbnf 4).
- **Gap 38** (`Button variant="transport"|"rainbow"`): adds bbnf's `btn-cta` hero-button (2 CTA sites, hero green + hero blue) plus the demo-shimmer-cards. Cross-lane total now 7+.
- **Gap 41** (`DockLayerGroup :keepOpenWhile`): bbnf already manually injects `dockKeepOpen` / `dockRelease` in `ErrorDialog.vue:17-23`, `ExampleSelector.vue:17-23`, `FormatterSettings.vue:12-18` — three watcher hooks per consumer matching the F-lane pattern exactly. Cross-lane total now 6 (F 3, bbnf 3).
- **Gap 42** (slot-class props on reka wrappers): bbnf bypasses `<HoverCard>` entirely at `RightPane.vue:82-121` because `HoverCardContent` from glass-ui doesn't expose a content-class prop — so consumer goes direct to `reka-ui`. Direct evidence of the gap.

**(b) Contradicts / narrows:**

- **Gap 8** (`Switch variant="skeuo"`): bbnf has no skeuo controls — neither evidence nor demand. Narrows the gap toward A's self-evidence + D's prospective need; bbnf is not a consumer here.
- **Gap 14** (`<NotificationDot>` / `DockIconButton :badge`): bbnf doesn't render notification badges; Loader2/AlertCircle/OK-pill carry status differently. Narrows scope.
- **Gap 17** (`pane-swap-scale` + `.collapse-x` + `useCollapse({ axis })`): bbnf has `useSplitPane` (209 lines) that is a *different* primitive — full split-pane resize, not collapse. Suggests gap 17 should split into `<SplitPane>` (axis + persistKey + pointer-capture + arrow-keys) + `<Collapse>` separately.
- **Gap 18** (`<KeyframeTimeline>` + `<BezierCurveCanvas>`): bbnf has `WalkthroughOverlay` (step-pill + progress-dots + prev/next) — a *different* timeline use-case. Suggests a `<StepTimeline>` peer to `<KeyframeTimeline>`.
- **Gap 23** (`<FlourishDivider>` + `.divider-flourish-*`): bbnf uses pure `.tapered-rule` — narrowed scope; bbnf doesn't ask for the flourish variant.
- **Gap 36** (`<DataList>` / key-value tooltip body): bbnf does evidence this — the `gorgeous (WASM)` HoverCard at RightPane.vue:104-109 is a 4-row `Parse / Format / Total / Input` `<DataList>`. Adds 1 site, broadens scope toward telemetry.

**(c) New gaps not yet in synthesis:**

- **`useMonacoTheme()` composable** + token-to-Monaco bridge — bbnf is the only Monaco consumer today; ≥ 2 prospective if any code-rendering consumer surfaces (D's prospective Latex paper editor, E's keyframes Monaco demo).
- **`useSplitPane({ axis, persistKey, minPanePx })` + `<SplitPane>` + `<SplitPaneDivider>`** — full split-pane primitive distinct from gap 17's collapse.
- **`runtimeHighlight()` + `LANGUAGE_RULES` runtime-token module addition** — an 8-language rule-table API consumed by markdown post-processing, AST display, and grammar-card rendering. Distinct from gap 11's `spectrumColor`/`NAMED_EASING_BEZIER`.
- **`<ProductionRule>` / `.production-rule`** — a textual "math display" sibling: `lhs ::= rhs` typography for any formal-language documentation. Slot under math.css (gap 10) but with its own primitive shape.
- **`<HorizontalBarChart>` / `<MetricList>`** — already implicit in B + bbnf; both consumers want it. ≥ 2 consumers, qualifies for promotion.
- **`<PipelineFlow>` / `<NodeChain>`** — vertical pipeline of node pills + connectors. 1 site here, ≥ 2 if any future consumer documents a pipeline.
- **`<LiveSnippet>` / `<RunnableCode>`** — embedded run-with-output snippet. 1 site, prospective ≥ 2.
- **`<WalkthroughTour>` / `<TourStep>` family** — annotation card + progress dots + prev/next; ≥ 2 prospective with E.
- **`<StatusPill tone>` (without dot)** — 4 sites here, ≥ 2 cross-lane (B's dock OK badge).
- **`<TelemetryHoverCard>`** — 1 site here, prospective.

Bbnf-lang/playground's strongest unique contribution to the W0 ledger is on **mathematical typography** (gap 10 — concrete production-rule + perf-number prototypes), **multi-pane editor composition** (new `<SplitPane>` gap), and **code-rendering surfaces** (`useMonacoTheme()` + `runtimeHighlight()` as new gaps). The bbnf consumer does not signal cream and only weakly signals iconography or skeuo; the cartoon-shadow / colourful-flourish / large-typography axes corroborate existing synthesis.
