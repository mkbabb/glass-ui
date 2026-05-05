# W5 — bbnf-lang/playground consumer migration ledger

**Status**: drafted at G.W5 close — proof-by-ledger, no consumer-repo edits.

**Consumer path**: `/Users/mkbabb/Programming/bbnf-lang/playground`
**Consumer HEAD at audit time**: `955ffaf0` (2026-05-04, per `W0-baseline-drift.md`).
**Lane research source**: `docs/tranches/G/research/G-bbnf-lang-playground.md` (47 drift rows + 9 surfaced gaps + 18 union candidates + 2 silent failures).
**Pinned baseline drift count at HEAD (W0.γ)**: **58 unique-row** / **62 axis-row**. Both columns binding per `W0-challenge.md` §D — unique-row for migration accounting, axis-row for axis-coverage hard gates.
**Glass-ui canon at audit time**: `master @ badc536` (v0.5.0); W1–W4 deltas pinned at the W3-component-proof + W4-story HEAD.
**Lines projected for retirement**: ≈ 320 lines (`main.css` `@utility` redeclarations + `preset-bbnf.css` token shadows + bespoke `<Transition>` blocks + four open-coded highlighters).

---

## 1. Migration table

One row per drift finding from lane G's seven-axis itemization plus the silent-failure register. Drift numbering matches `research/G-bbnf-lang-playground.md` axis tags (`1.1 … 7.3`); silent-failure rows are tagged `S6` / `S7` per `W0-silent-failures.md`.

### Axis 1 — Token alignment

| drift # | site (file:line) | current pattern | canonical replacement | canon source (file:line in glass-ui src) | projected delta |
|---:|---|---|---|---|---:|
| 1.1 | `src/assets/styles/preset-bbnf.css:24-31, 55-62` | 6 `--pastel-*` accents declared as raw `hsl()` literals at `:root` and `.dark` | keep as consumer brand preset (risk register) — but rename namespace to `--bbnf-pastel-*` to avoid colliding with canon's accent vocabulary; bridge into `@theme` only at the rung consumed | `src/styles/tokens.css` (canon `--accent-*`/`--success`/`--warning`/`--info` palette) | 0 (kept) |
| 1.2 | `src/assets/styles/preset-bbnf.css:37-38` | `--shadow-card: 3px 3px 0px 0px hsl(var(--shadow-color)/0.10)` + `--shadow-hover: 5px 7px 0px 0px ...` overriding canon's elevation shadow with cartoon offsets | adopt canon `--shadow-cartoon-md` (3px) + `--shadow-cartoon-lg` (5px asymmetric) | `src/styles/tokens.css` `--shadow-cartoon-{md,lg}` rungs (W1) | -2 token redeclarations |
| 1.3 | `src/assets/styles/preset-bbnf.css:41-46` | 6 glass token overrides on legacy `--glass-{opacity,bg,blur}-{light,medium,heavy}` names | retire — canon ships tier-named API `--glass-{bg,blur,opacity}-{subtle,default,medium,elevated}` | `src/styles/tokens.css` glass-tier block (post-F.W2) | -6 redeclarations |
| 1.4 | `src/assets/styles/preset-bbnf.css:49-50` | `--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)` + `--duration-hero: 700ms` | drop `--ease-smooth` (canon `--ease-standard` is identical); drop `--duration-hero` if not a hero-specific rung — fold into `--duration-xl`/`--duration-xxl` | `src/styles/tokens.css` motion section | -2 redeclarations |
| 1.5 | `src/assets/styles/main.css:32-34, 39-43` | `var(--shadow)` referenced as a hue inside `color-mix(in srgb, var(--shadow) 8%, transparent)` | use `--shadow-color` (canon's documented elevation hue hook) | `src/styles/tokens.css:174` `--shadow` retained per W0 challenge §B.1 / R1; `--shadow-color` is the hue hook | rename, no count change |
| 1.6 | `src/assets/styles/main.css:111-114, 121-125, 132-135` | `.prose h1/h2/h3` use bottom `linear-gradient` background with hand-rolled stops (`15% / 85%`, `8% / 92%`) — heading-rule shape | compose with canonical `.divider-h-tapered` underneath the heading, OR ship `@utility heading-rule-tapered` if the recipe earns its second consumer | `src/styles/utilities.css:305` `.divider-h-tapered` | -3 bespoke gradient blocks |
| 1.7 | `src/assets/styles/main.css:147-150, 197, 204, 207, 215, 246-249, 260` | 12 raw `color-mix(in srgb, var(--foreground|muted|border|card|pastel-*) N%, transparent)` open-codings | use canon `--border-opacity-{light,medium,strong}` for border tints; for accent tints use `bg-pastel-*` Tailwind utilities (already wired) | `src/styles/tokens.css` `--border-opacity-*` block | -12 open-codes |
| 1.8 | `src/components/docs/BenchChart.vue:170` | inline `style="background: hsl(45 90% 55% / 0.2); color: hsl(45 90% 55%)"` — gold tier-badge as raw HSL | replace with `var(--color-gold)` + `var(--color-gold-light)` | `src/styles/tokens.css` gold family (canon) | -1 raw HSL |
| 1.9 | `src/components/walkthrough/WalkthroughOverlay.vue:18, 33, 38, 78` + `src/components/landing/HeroSection.vue:108-113` (≥ 30 sites total) | `bg-pastel-{green,blue,pink,...}/N` etc. — semantic remap (green = success, blue = info, pink = warning) | retag with canonical tone (`Badge tone="success/info/warning/destructive"`); keep `--bbnf-pastel-*` for non-semantic brand surfaces | `src/components/ui/badge/` `tone` prop (W3); `src/styles/tokens.css` semantic accent set | 0 (covered by 4.x rows) |
| 1.10 | `src/components/landing/CodeCardFan.vue:68` | `transition: transform 0.6s var(--ease-spring)` — `--ease-spring` consumer reference; canon `--ease-spring` resolves to `--spring-snappy` since v0.4 (not the bouncy intent the consumer wants) | rename consumer-side to `var(--spring-bouncy)` (closest parametric match) or `var(--ease-apple-spring)` | `src/styles/tokens.css` `--spring-bouncy` / `--ease-apple-spring` (W1) | -1 silent-token reference |
| 1.11 | `src/components/layout/NavBar.vue:242` + `src/components/custom/header-ribbon/HeaderRibbon.vue:126, 150, 151, 166, 167` + `src/views/DocsPage.vue:175` (7 sites) | hand-rolled `cubic-bezier(0.4, 0, 0.2, 1)` literals — same value as canon `--ease-standard` | replace each with `var(--ease-standard)` | `src/styles/tokens.css` `--ease-standard` (canon) | -7 literals |
| 1.12 | `src/components/landing/TypewriterText.vue:48-58, 62-72` + `src/components/custom/bbnf-logo/BbnfLogo.vue:36-47` | `.tw-rainbow` 6-stop hex (`#ff6b6b…`) + `.tw-golden` / `.bbnf-shimmer` re-shipping gold-shimmer recipe | use `var(--color-rainbow-vivid-{1..6})` for the rainbow stops; replace `.bbnf-shimmer` with canon `.text-shimmer-gold` (renamed from `.gold-shimmer` in W2) | `src/styles/tokens.css` rainbow-vivid block; `src/styles/utilities.css` `.text-shimmer-gold` (W2) | -3 hand-rolled keyframes |

### Axis 2 — Utility & `@apply` hygiene

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected delta |
|---:|---|---|---|---|---:|
| 2.1 | `src/assets/styles/main.css:50-60` (8 call sites in FeatureCards, DemoCards, LivePreviewStrip, CodeCardGrid, CodeCardFan, DocsPage, etc.) | `@utility card-base / card-subtle / card-elevated` redefining tier substrate with `bg-card/N + backdrop-blur-N + border-white/N` | adopt `.glass-{subtle,default,medium,elevated}` per tier | `src/styles/glass.css` (canon) | -3 `@utility` blocks; -8 call-site rewrites |
| 2.2 | `src/assets/styles/main.css:31-43` (4 call sites: FeatureCards, DemoCards, internal `prose .code-card`, prose table) | `@utility shadow-card / shadow-card-hover` reimplementing cartoon-shadow recipe with consumer's `--shadow-card` override | adopt `.shadow-cartoon-md` directly (and `.shadow-cartoon-lg` for the asymmetric hover step) | `src/styles/utilities.css:266-291` `.shadow-cartoon-{sm,md,lg}` | -2 `@utility` blocks |
| 2.3 | `src/assets/styles/main.css:45-48` (5 call sites: HeroSection, LandingPage ×4) | `@utility tapered-rule` reimplementing `.divider-h-tapered` | adopt canon `.divider-h-tapered` | `src/styles/utilities.css:305` | -1 `@utility` block |
| 2.4 | `src/assets/styles/main.css:66-71, 73-80` (4 call sites — landing CTAs + ghost buttons) | `@utility btn-ghost` reinventing `Button variant="ghost"`; `@utility btn-cta` open-coding hero transport-tier button | `<Button variant="ghost">` for ghost; `<Button variant="cta">` (W3 gap-38 transport-tier) for the hero CTA | `src/components/ui/button/` `cta` variant (W3) | -2 `@utility` blocks |
| 2.5 | `src/assets/styles/main.css:27-29` (37 call sites) | `@utility instrument-serif` aliasing `--font-serif` (which preset-bbnf already pins to Instrument Serif) | drop the alias — use Tailwind `font-serif` directly | `src/styles/theme.css` `@theme` font-serif binding | -1 alias; 37 site rewrites |
| 2.6 | `src/assets/styles/main.css:402-407` (1 call site at `DebugPanel.vue:50`) | `@layer components { .dock-badge { @apply px-1.5 whitespace-nowrap tabular-nums; ... } }` — consumer redefining glass-ui's component-layer naming | `<MetricBadge size="sm">` | `src/components/custom/metric-badge/MetricBadge.vue` (W3) | -1 `@layer components` rule |
| **2.7 (S6)** | `src/components/landing/FeatureCards.vue:71` + `src/components/landing/DemoCards.vue:96` (6 invocations across 2 surfaces — 3 cards each) | `class="code-badge"` — silent failure (utility never landed in canon, in `retiredRootUtilities`) | adopt canonical `.code-badge` shipped in W2 | `src/styles/utilities.css` `.code-badge` (W2 ship per `W0-silent-failures.md` S6 + `W0-challenge.md` §B.3) | -2 broken refs become live; +0 lines |
| **2.8 (S7)** | `src/lib/toneMaps.ts:42-44` runtime returns `"gold-shimmer"` / `"blue-shimmer"`; consumed at `ExampleSelector.vue:60, 77`, `ControlsBar.vue:81` (3 `shimmerClass()` call sites) | `shimmerClass()` returning retired `"blue-shimmer"` literal | rename `toneMaps.ts:43` return value from `"blue-shimmer"` → `"text-shimmer-blue"`; rename `toneMaps.ts:42` return from `"gold-shimmer"` → `"text-shimmer-gold"` | `src/styles/utilities.css` `.text-shimmer-{gold,blue,vivid,pastel}` family (W2 ship per `W0-silent-failures.md` S1+S7 + `W0-challenge.md` §B.3) | -2 retired-class returns; 3 call sites resolve live |
| 2.9 | `src/views/DocsPage.vue:144-167` (1 site) | 23-line `.sidebar-toggle-btn` scoped recipe with raw `color-mix`, sticky positioning, `:hover/:active` recreating `Button` four-state plus hover lift | `<Button variant="ghost" size="icon">` with sticky positioning on the wrapper | `src/components/ui/button/` (canon) | -23 lines scoped style |
| 2.10 | `src/views/playground/PlaygroundPage.vue:131-145` (1 site — split-pane handle) | 14-line custom button-as-handle with `bg-card/35`, `bg-card/70 backdrop-blur-xl`, `focus-visible:ring-2 focus-visible:ring-ring/50` | reuse `.focus-ring` + `.glass-subtle` + `<Button variant="ghost">` shell; pointer-capture and arrow-key handling stays consumer-side (genuine domain logic) | `src/styles/utilities.css` `.focus-ring`; `src/styles/glass.css` `.glass-subtle` | -14 lines hand-rolled chrome |
| 2.11 | `src/components/layout/FormatterSettings.vue:50-54` (1 site) | 5-line ad-hoc trigger button with `border-border/35`, `bg-background/30`, `hover:border-border/55`, `hover:bg-background/45` | `<Button variant="outline">` plus `aria-expanded` (already wired by Dialog `data-state`) | `src/components/ui/button/` (canon) | -5 lines |
| 2.12 | `src/components/landing/CodeCardGrid.vue:18-22` + `src/components/landing/CodeCardFan.vue:46-53` + `src/views/playground/PlaygroundPage.vue:138` + `src/components/landing/FooterSection.vue:7` + 4 more (≥ 12 sites) | `bg-card/N + backdrop-blur-{md,lg,xl}` recipes inline — glass-tier surfaces bypassing `.glass-*` | adopt the matching tier class (`.glass-medium` for the load-bearing code-card surfaces; `.glass-default` elsewhere) | `src/styles/glass.css` (canon) | -12 inline glass recipes |

### Axis 3 — Interactive consistency

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected delta |
|---:|---|---|---|---|---:|
| 3.1 | 18 sites with raw `active:scale-{95,90,[0.95],[0.97],[0.98]}` (Walkthrough{Overlay,Controls}, NavBar, FormatterSettings, DocsSidebar, LiveBench, RunnableCode, DocsPage sidebar-toggle-btn, BenchChart, LivePreviewStrip ×2, etc.) | 5 different press scales picked ad hoc, none routing through `--scale-press*` | use Tailwind one-liner `active:scale-[var(--scale-press)]` OR the `.interactive-item` composite for the four-state contract | `src/styles/tokens.css` `--scale-press`; `src/styles/utilities.css:34-57` `.interactive-item` | -18 ad-hoc literals |
| 3.2 | `src/views/playground/PlaygroundPage.vue:134` | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50` — bespoke focus ring | `.focus-ring` utility | `src/styles/utilities.css` `.focus-ring` | -1 ad-hoc focus ring |
| 3.3 | `src/components/walkthrough/WalkthroughOverlay.vue:55, 57` + `src/components/docs/LiveBench.vue:75-76` + `src/components/docs/RunnableCode.vue:84-86` | 2 ad-hoc disabled-opacity rungs (30, 40) instead of canon's `--opacity-disabled` (0.5) | use Tailwind one-liner `disabled:opacity-50 disabled:pointer-events-none` (per `W0-challenge.md` §E.6 — `.active-scale`/`.disabled-base` not re-added) | `src/styles/tokens.css` `--opacity-disabled` | -3 ad-hoc rungs |
| 3.4 | `src/components/landing/HeroSection.vue:106-122` (2 CTAs) | `btn-cta` + `bg-pastel-green/10 border border-pastel-green/30` + inner shimmer overlay (~7 lines per CTA) | `<Button variant="cta" tone="green\|blue">` with shimmer overlay slot (W3 gap-38) | `src/components/ui/button/` `cta` variant (W3) | -14 lines (2 CTA blocks) |
| 3.5 | `src/components/walkthrough/WalkthroughOverlay.vue:71-83` (Next/Finish pair) | `flex items-center gap-1 text-xs text-foreground font-medium hover:text-pastel-green transition-all active:scale-95` open-coded twice | `<Button variant="ghost" size="sm">` with content slot | `src/components/ui/button/` (canon) | -2 ad-hoc text-buttons |
| 3.6 | `src/components/docs/FlowChart.vue:117-126` | raw `.flow-node--clickable:hover { filter: brightness(1.1); transform: scale(1.01); border-color: ...; box-shadow: 0 0 0 1px ... }` | `<Card variant="cartoon" clickable>` once that variant lands; until then `@apply hover-lift-md` | `src/components/ui/card/` `cartoon` variant + `src/styles/utilities.css` `.hover-lift-md` | -1 hover recipe |
| 3.7 | `src/components/layout/ErrorDialog.vue:43-46` (DialogTrigger) | custom destructive-tinted button without four-state CVA | `<Button variant="ghost" tone="destructive">` (W3 gap-24 tone variants) | `src/components/ui/button/` `tone` prop (W3) | -1 ad-hoc trigger |

### Axis 4 — Variant orthogonality and rooting

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected delta |
|---:|---|---|---|---|---:|
| 4.1 | `src/components/editors/EditorPanel.vue:38` | `<Card variant="pane" class="!shadow-none">` — `!important` defeating the variant default shadow | `<Card variant="pane" flush>` — the `flush?: boolean` prop exists for exactly this case | `src/components/ui/card/Card.vue:31, 45` `flush` prop (canon, pre-G) | -1 `!important` override |
| 4.2 | `src/components/layout/NavBar.vue:144-167` | custom dropdown rendered as `<div class="absolute … bg-card/95 backdrop-blur-xl shadow-lg p-1 z-[var(--z-popover)]">` with manual transition | `<DropdownMenu>` from glass-ui | `src/components/ui/dropdown-menu/` (canon) | -23 lines bespoke dropdown |
| 4.3 | `src/components/layout/NavBar.vue:230-263` | scoped `.attribution-card` reproducing HoverCard inside NavBar with hand-rolled `is-open` toggle | `<HoverCard>` from glass-ui | `src/components/ui/hover-card/` (canon) | -33 lines bespoke hovercard |
| 4.4 | `src/views/playground/RightPane.vue:82-121` | direct `reka-ui` `HoverCardRoot/Portal/Content` import bypassing glass-ui wrapper because `<HoverCardContent>` lacked content-class slot prop; inline `class="z-[var(--z-hovercard)] w-72 rounded-xl border border-border/40 bg-card/90 p-4 shadow-lg backdrop-blur-xl"` | `<HoverCard>` + `<HoverCardContent>` from `@mkbabb/glass-ui` with the new `closeIconClass` / content-class slot prop | `src/components/ui/hover-card/HoverCardContent.vue` `contentClass`/`closeIconClass` slot prop (W3 gap-42) | -39 lines inline tier reimpl |
| 4.5 | `src/views/playground/PlaygroundPage.vue:131-145` | inline `class="bg-card/35"` on a Tooltip-wrapped button; inner `bg-card/70 backdrop-blur-xl` is a second blur layer | consolidate onto a single `.glass-default` surface; `<SplitPane>` primitive (lane-G new gap, risk register) carries the divider | `src/styles/glass.css` `.glass-default` | -1 doubled blur layer |
| 4.6 | `src/components/docs/TabBar.vue` (2 consumers: CodeTabs + BenchChart) | 4-line custom segmented control with `border-b border-border/20 overflow-x-auto` + per-tab underline | `<Tabs variant="underline">` | `src/components/ui/tabs/` `variant` CVA (W3 gap-15) | -1 bespoke tab strip |
| 4.7 | `src/components/editors/EditorPanel.vue:67-79` | second tab-switcher (inline pill-buttons `flex items-center gap-1 rounded-md px-2 py-0.5`) with redo-arrow icon and per-tab tone driven by inline `:style` | `<Tabs variant="pill">` with content slot for redo-arrow + colour-driven prefix | `src/components/ui/tabs/` `variant` CVA (W3 gap-15) | -1 bespoke pill switcher |

### Axis 5 — Overlay and motion vocabulary

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected delta |
|---:|---|---|---|---|---:|
| 5.1 | 7 sites (`NavBar.vue:242`, `HeaderRibbon.vue:126, 150, 151, 166, 167`, `DocsPage.vue:175`) | hand-rolled `cubic-bezier(0.4, 0, 0.2, 1)` literal | `var(--ease-standard)` (covered by 1.11) | `src/styles/tokens.css` `--ease-standard` | -7 literals (counted in 1.11) |
| 5.2 | 23 sites with `transition-all` Tailwind utility (HeroSection, CodeCardGrid, FeatureCards, DemoCards, LivePreviewStrip, CodeCardFan, NavBar, FormatterSettings, WalkthroughControls, WalkthroughOverlay ×6, DocsSidebar ×2, LiveBench, RunnableCode, FlowChart, BenchChart, PlaygroundPage divider, plus `main.css` ×2) | `transition: all` triggers reflow on every animatable property (expensive on Monaco-adjacent surfaces) | replace each with property-specific transitions (`transition-[colors,transform]` on most) | (general principle — no canon utility, just performance hygiene) | -23 over-broad transitions |
| 5.3 | `src/assets/styles/main.css:83-99` + `WalkthroughOverlay.vue` + `DemoCards.vue:113-146` (sweep) + `TypewriterText.vue:43-73` (rainbow-shift, shimmer) + `BbnfLogo.vue:36-47` (shimmer dup) | 5 custom `@keyframes`: `description-marquee`, `sweep`, `rainbow-shift`, `shimmer` (dup-defined twice), `blink` (1.06s step-end) | `shimmer` → canon `gold-shimmer-slide` (`var(--duration-shimmer)`); `rainbow-shift` → canon `.text-rainbow-pastel` flow; `description-marquee` and `sweep` are valid consumer-specific choreography (keep but enumerate, don't inline); dedupe the duplicate `shimmer` keyframe between TypewriterText and BbnfLogo | `src/styles/animations.css` (canon) | -2 keyframe duplications |
| 5.4 | `src/views/DocsPage.vue:170-184` | `mobile-drawer` Vue `<Transition>` with bespoke `cubic-bezier(0.4, 0, 0.2, 1)` translate-X + opacity | `<Sheet side="left">` with canonical `slide-in-from-side` | `src/components/ui/sheet/Sheet.vue` `side="left"` (canon, pre-G) | -1 bespoke `<Transition>` (~14 lines) |
| 5.5 | `src/assets/styles/main.css:91-99` + `DemoCards.vue:112-146` + `WalkthroughOverlay.vue:61-67` | 4 named transition classes redefined: `hover-card`, `mobile-pane`, `nav-dropdown`, `page-fade` | map: `hover-card` → `popover-animate` / `fade-slide`; `mobile-pane` → `fade-slide`; `nav-dropdown` → `dropdown`; `page-fade` → `fade` | `src/styles/transitions.css` (canon) | -4 redeclared `<Transition>` classes |
| 5.6 | `src/components/walkthrough/WalkthroughControls.vue` + `src/components/walkthrough/WalkthroughOverlay.vue` | "annotation card hovering above content" pattern uses `bottom-20 left-1/2 -translate-x-1/2 z-[var(--z-overlay)]` + Toast-style content card | flag as new gap `<WalkthroughTour>` / `<TourStep>` (lane-G surfaced gap §2.4); risk register until ≥ 2 prospective consumers | (consumer-side; risk register) | 0 (kept) |
| 5.7 | `src/components/walkthrough/WalkthroughOverlay.vue:18-23` | open-coded progress strip: `<div class="absolute top-0 left-0 right-0 z-[var(--z-overlay)] h-0.5 bg-muted/30"><div class="h-full bg-pastel-green transition-all duration-500 ease-out" :style="{ width: ... }"></div></div>` | `<Progress :value :tone>` | `src/components/ui/progress/Progress.vue` (canon) | -6 lines open-coded progress |

### Axis 6 — Typographic and structural hierarchy

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected delta |
|---:|---|---|---|---|---:|
| 6.1 | `src/components/landing/HeroSection.vue:59` + `src/components/landing/TypewriterText.vue:21, 28, 31` (4 sites) | `text-display-2 sm:text-display-3` — already canon-anchored | OK — keep | — | 0 (already canonical) |
| 6.2 | `src/components/editors/EditorPanel.vue:42-46` + `src/components/layout/FormatterSettings.vue:65, 70, 77` + `src/components/layout/ErrorDialog.vue:54` + 4 more (8 sites) | `instrument-serif text-{xl,3xl}` heading sites bypassing `.text-{display,title,heading,subheading}` cascade | map per canon hierarchy: editor-pane-title → `.text-pane-title`; dialog titles → `.text-title`; formatter-settings sections → `.text-heading` / `.text-subheading` | `src/styles/typography.css:259` `.text-pane-title`, `.text-{display,title,heading,subheading}` (canon) | -8 ad-hoc heading shapes |
| 6.3 | `DocsSidebar.vue:232`, `DocsPage.vue:96`, `ErrorDialog.vue:65`, `LiveBench.vue:90, 96` (×2), `RunnableCode.vue:66, 74` (×2), `BenchChart.vue:169`, `main.css:183, 228` (×2), plus 2 inline `dock-badge` repeats (13 sites total at HEAD) | 13 ad-hoc `instrument-serif text-xs uppercase tracking-wider` + `text-[0.625rem] font-mono uppercase tracking-wider` recipes — re-implementing `.section-label` shape with mono/serif inconsistencies | `.section-label` (canon) | `src/styles/typography.css:286` `.section-label` | -13 ad-hoc recipes |
| 6.4 | `CodeCardGrid.vue:27`, plus 7 more sites (DocsSidebar, BenchChart ×3, LiveBench ×3, DebugPanel, RightPane WASM badge, DocsPage section badge — 9 sites total ad-hoc) | ad-hoc tiny-text rungs `text-[0.625rem] / [0.6875rem] / [0.5625rem]` (10px, 11px, 9px) | `.text-micro` / `.text-2xs` per canon `--type-{micro,caption}` | `src/styles/typography.css` `.text-micro` / `.text-2xs` (W2) | -9 ad-hoc tiny-text rungs |
| 6.5 | `FeatureCards.vue:66`, `DemoCards.vue:74`, `DocsPage.vue:127`, `WalkthroughControls.vue:14` + 4 more (8 sites total — also covers the 18 ad-hoc `text-[Npx]` font-size sites flagged in W5.md highlights) | raw Tailwind `text-{xs..3xl}` heading or body sizes instead of `--type-*` rungs / `.text-{body,prose,subheading,heading,title}` | map each to canonical `--type-*` rung utility | `src/styles/typography.css` (canon `.text-*` cascade) | -18 ad-hoc `text-[Npx]` literals |
| 6.6 | `src/components/debug/DebugPanel.vue:65` (1 site) | `<kbd class="mx-0.5 rounded border border-border/40 bg-muted/30 px-1 py-0.5 text-[0.625rem] font-mono">` open-coding `.kbd` | `<kbd class="kbd">` | `src/styles/utilities.css:134` `.kbd` (canon) | -1 ad-hoc kbd |
| 6.7 | `src/components/landing/HeroSection.vue:115, 117` (2 sites) | CTA `instrument-serif text-lg` — display tier inside button | covered by W3 gap-38 `Button variant="cta"` slot styling | `src/components/ui/button/` `cta` variant (W3) | 0 (covered by 3.4 / 2.4) |
| 6.8 | `BenchChart.vue:87, 93` + `LiveBench.vue:88, 94` (4 sites) | big stat numerals `text-2xl font-mono font-semibold tabular-nums` + inline `style="color: var(--color-pastel-cyan)"` | `.text-display-stat` (W2 gap-35); inline tone via tone prop or token | `src/styles/typography.css` `.text-display-stat` (W2) | -4 ad-hoc stat shapes |

### Axis 7 — Accessibility resilience

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected delta |
|---:|---|---|---|---|---:|
| 7.1 | `src/assets/styles/main.css:51, 55, 59` + 12 inline `bg-card/N backdrop-blur-{lg,xl}` sites | glass surfaces reimplemented inline; no `prefers-reduced-transparency` / `@supports not (backdrop-filter)` fallbacks | adopt `.glass-{subtle,default,medium,elevated}` (a11y baked-in) — covered by 2.1 / 2.12 | `src/styles/glass.css` (canon) | 0 (covered by 2.x) |
| 7.2 | `WalkthroughOverlay.vue:65` + `CodeCardGrid.vue:12-13` + `HeroSection.vue:50-57` + `CodeCardFan.vue:29-30` (4 sites with motion-heavy entrances + 3D/parallax) | spatial motion not bracketed by `prefers-reduced-motion` | wrap each in `@media (prefers-reduced-motion: reduce) { ... opacity-only fallback ... }` | (general principle; canon's transitions/animations.css already PRM-gated) | -4 unguarded motion sites |
| 7.3 | `src/components/editors/MonacoEditor.vue:67-72` | hard-coded `theme: isDark.value ? "dark-theme" : "light-theme"` — no `prefers-contrast: more` rung | adopt `useMonacoTheme()` composable (W3 lane 5) which registers PCM-aware themes from token-derived recipes | `src/composables/monaco/useMonacoTheme.ts` (W3 gap-44) | -6 lines hard-coded; see §4 below |

---

## 2. Silent-failure resolutions

Two silent-failure rows from `W0-silent-failures.md` resolve via this consumer's migration:

### S6 — `code-badge`

| Site | Current | Resolution | Canon source |
|---|---|---|---|
| `src/components/landing/FeatureCards.vue:71` | `class="code-badge"` (silently broken — utility absent from canon, in `retiredRootUtilities`) | adopt canonical `.code-badge` shipped in W2 | `src/styles/utilities.css` `.code-badge` (W2 ship per `W0-challenge.md` §B.3) |
| `src/components/landing/DemoCards.vue:96` | `class="code-badge"` (same) | same | same |

**Invocation count**: 2 file references × 3 cards each = **6 invocations** restored to live styling. ≥ 2 bar cleared per `W0-silent-failures.md` S6 (2 consumer sites + 4 prospective speedtest adoptions).

### S7 — `blue-shimmer` → `text-shimmer-blue`

| Site | Current | Resolution | Canon source |
|---|---|---|---|
| `src/lib/toneMaps.ts:42` | `if (color === "gold") return "gold-shimmer";` | rename return literal to `"text-shimmer-gold"` | `src/styles/utilities.css` `.text-shimmer-gold` family (W2 — renamed per `W0-challenge.md` §B.3) |
| `src/lib/toneMaps.ts:43` | `if (color === "blue") return "blue-shimmer";` | rename return literal to `"text-shimmer-blue"` | `src/styles/utilities.css` `.text-shimmer-blue` (W2 — sibling of `.text-shimmer-gold` per S7 family-naming decision) |
| `src/components/layout/ExampleSelector.vue:60` | `:class="shimmerClass(currentExample.name)"` | no edit (consumes `toneMaps.ts` runtime) | resolves transitively |
| `src/components/layout/ExampleSelector.vue:77` | `:class="shimmerClass(...)"` | no edit | same |
| `src/components/layout/ControlsBar.vue:81` | `:class="shimmerClass(...)"` | no edit | same |

**Result**: 1 runtime definition site + 3 call sites resolved. The `--shimmer-blue-{dark,mid,light}` tokens declared in W1 + the `.text-shimmer-blue` utility shipped in W2 cover symmetric `gold/blue/vivid/pastel` shimmer family per `W0-challenge.md` §E.3.

---

## 3. Components to swap (W3 absorption targets)

The W3 component family lands the bespoke recipes that bbnf currently hand-rolls:

| Bespoke pattern | bbnf site(s) | W3 component replacement | Lane / gap |
|---|---|---|---|
| `<Card variant="pane" class="!shadow-none">` defeating shadow | `EditorPanel.vue:38` | `<Card flush>` prop | pre-G canon (drift 4.1) |
| Custom dropdown div + transition | `NavBar.vue:144-167` | `<DropdownMenu>` | canon, pre-G (drift 4.2) |
| Direct `reka-ui` HoverCard import (bypassing glass-ui) | `RightPane.vue:82-121` | `<HoverCard>` + `closeIconClass` / `contentClass` slot prop | W3 lane-D' / gap 42 (drift 4.4) |
| Custom segmented underline tab strip | `TabBar.vue` (CodeTabs + BenchChart) | `<Tabs variant="underline">` | W3 lane / gap 15 (drift 4.6) |
| Inline pill tab switcher | `EditorPanel.vue:67-79` | `<Tabs variant="pill">` | W3 lane / gap 15 (drift 4.7) |
| Mobile drawer Vue `<Transition>` | `DocsPage.vue:170-184` | `<Sheet side="left">` | canon, pre-G (drift 5.4) |
| `.dock-badge` `@layer components` rule | `main.css:402-407` (1 call site at `DebugPanel.vue:50`) | `<MetricBadge size="sm">` | W3 / gap 26 (drift 2.6) |
| `dockKeepOpen` / `dockRelease` watcher hooks | `ErrorDialog.vue:17-23`, `ExampleSelector.vue:17-23`, `FormatterSettings.vue:12-18` (3 sites) | `<DockLayerGroup :keepOpenWhile>` | W3 / gap 41 (drift 5.6 sibling) |
| Hard-coded Monaco light/dark themes (`MonacoEditor.vue:67-72`) | bbnf only consumer of Monaco today | `useMonacoTheme()` composable | W3 lane 5 / gap 44 (drift 7.3) |
| Vertical pipeline of node pills + arrows | `FlowChart.vue` (133 lines, 4 doc-fence call sites) | `<PipelineFlow>` / `<NodeChain>` | W3 lane 5 / gap 45 |
| Embedded run-with-output snippet | `RunnableCode.vue` (105 lines, 4 internal slot uses) | `<LiveSnippet>` | W3 lane 5 / gap 46 |
| Hero CTA `btn-cta` open-code (2 sites) | `HeroSection.vue:106-122` | `<Button variant="cta">` (transport-tier with shimmer overlay slot) | W3 / gap 38 (drift 2.4 / 3.4) |
| Semantic-tone tinted pill chips (`text-pastel-green` = success, etc.) | ≥ 4 sites incl. `ControlsBar.vue:53-62`, `DebugPanel.vue:38-42` | `<Badge tone="success\|info\|warning\|destructive">` | W3 / gap 24 (drift 1.9) |

---

## 4. Token redeclaration retirement

Explicit list of redeclared tokens / overrides in `preset-bbnf.css` and `main.css` whose canon equivalents subsume them after W1–W2 land:

### `preset-bbnf.css`

| Lines | Override | Canon equivalent | Disposition |
|---:|---|---|---|
| **12-13, 24-25, 55-56** (4 sites) | `--accent-red` redeclarations across `:root` + `.dark` blocks | canon retains `--accent-red` per `W0-challenge.md` §B.1 / R4 (synthesis claim of consumer-brand-only was rescinded — fourier-analysis has 12 component sites) | **drop** the 4 redundant local redeclarations; canon provides the truth |
| 24-31, 55-62 | `--pastel-{green,blue,purple,amber,pink,cyan}` × 6 (light + dark = 12 lines) | brand palette — keep as consumer preset namespace (rename to `--bbnf-pastel-*` recommended; bridge into `@theme` only at consumed rungs) | **keep** under risk register; rename namespace |
| 37-38 | `--shadow-card` + `--shadow-hover` (cartoon offsets) | canon `--shadow-cartoon-md` (3px) + `--shadow-cartoon-lg` (5px asymmetric) — both shipped in W1 per `W0-challenge.md` §B.4 row | **drop** + adopt `--shadow-cartoon-{md,lg}` |
| 41-46 | 6 legacy `--glass-{opacity,bg,blur}-{light,medium,heavy}` overrides | canon tier-named API `--glass-{bg,blur,opacity}-{subtle,default,medium,elevated}` (post-F.W2) | **drop** all 6; map call sites to tier names |
| 49-50 | `--ease-smooth: cubic-bezier(0.4,0,0.2,1)`, `--duration-hero: 700ms` | canon `--ease-standard` is identical; `--duration-hero` is not a hero-specific rung — fold into `--duration-xl`/`--duration-xxl` | **drop** both |

**`preset-bbnf.css` retirement total: 16 token-line drops + 4 `--accent-red` site drops** ≈ 24 lines.

### `main.css`

| Lines | Override | Canon equivalent | Disposition |
|---:|---|---|---|
| 27-29 | `@utility instrument-serif` (37 call sites) | Tailwind `font-serif` direct | **drop** the alias; rewrite 37 call sites |
| 31-43 | `@utility shadow-card / shadow-card-hover` | `.shadow-cartoon-{md,lg}` (canon) | **drop** both `@utility` blocks |
| 32-34, 39-43 | `var(--shadow)` referenced as hue inside `color-mix(...)` | `--shadow-color` (the documented elevation hue hook) | **rename** in place |
| 45-48 | `@utility tapered-rule` (5 call sites) | `.divider-h-tapered` | **drop** alias |
| 50-60 | `@utility card-base / card-subtle / card-elevated` (8 call sites) | `.glass-{subtle,default,medium,elevated}` | **drop** all three |
| 66-71, 73-80 | `@utility btn-ghost` + `@utility btn-cta` (4 call sites) | `<Button variant="ghost">` + `<Button variant="cta">` (W3) | **drop** both |
| 83-99 | 5 `@keyframes` blocks (`description-marquee`, `sweep`, `rainbow-shift`, `shimmer`, `blink`) | `shimmer` and `rainbow-shift` overlap canon — dedupe; `description-marquee` + `sweep` + `blink` are consumer choreography (keep but enumerate) | **dedupe** 2 of 5 |
| 91-99 | 4 named `<Transition>` classes redefined (`hover-card`, `mobile-pane`, `nav-dropdown`, `page-fade`) | canon `popover-animate` / `fade-slide` / `dropdown` / `fade` | **drop** all 4 |
| 111-114, 121-125, 132-135 | `.prose h1/h2/h3` heading-rule linear-gradient (3 blocks) | `.divider-h-tapered` underneath | **drop** all 3 |
| 147-150, 197, 204, 207, 215, 246-249, 260 | 12 raw `color-mix(in srgb, ... N%, transparent)` open-codes | `--border-opacity-*` + `bg-pastel-*` Tailwind utilities | **drop** all 12 |
| 402-407 | `@layer components { .dock-badge { ... } }` | `<MetricBadge size="sm">` (W3 gap-26) | **drop** entire `@layer components` rule |

**`main.css` retirement total: ~80 utility/keyframe/transition lines + 12 color-mix open-codes** ≈ 100 lines plus 37 alias rewrites.

### Cross-file literals

| Pattern | Sites | Canon equivalent | Disposition |
|---|---:|---|---|
| `cubic-bezier(0.4, 0, 0.2, 1)` literal | 7 (NavBar:242, HeaderRibbon:126, 150, 151, 166, 167, DocsPage:175) | `var(--ease-standard)` | **rename** all 7 |
| `transition-all` Tailwind utility | 23 (across 18 components — drift 5.2) | property-specific transitions | **rewrite** all 23 |
| Raw `active:scale-{95,90,[0.95-0.98]}` | 18 (across 11 components — drift 3.1) | `active:scale-[var(--scale-press)]` or `.interactive-item` | **rewrite** all 18 |

---

## 5. Risk-register confirmations

Patterns lane G flagged consumer-only that must **not** be touched in the migration (kept as bbnf brand / domain territory):

| Item | Lane G §5 reference | Rationale |
|---|---|---|
| `--bbnf-pastel-*` palette (after rename) | preset-bbnf.css:24-31, 55-62 | brand palette; lives as consumer preset per `feedback_presets_in_consumer` |
| `--shadow-card 3px 3px 0px 0px` literal offset | preset-bbnf.css:37-38 (after canon-name adoption) | the shape is a `--shadow-cartoon-md` rung; the *consumer's choice of accent hue* stays consumer-side |
| **Full Monaco theming bridge body** (`useMonacoTheme()` composable extension) | research §2.1 | shipped in canon as W3 gap-44, but bbnf-specific theme JSON content + Monarch tokenizer (`bbnfMonarch.ts`) stays consumer-side — only the composable + token-bridge ships |
| **BBNF Monarch tokenizer** | `src/components/editors/bbnfMonarch.ts` | language-specific syntax-highlighter; risk register E sibling |
| **Formal-grammar parsing primitives** (BBNF/JSON/CSS/Math/Sheets/Hello + production-rule rendering) | research §2.2 | bbnf is the only formal-grammar consumer; `<ProductionRule>` / `.production-rule` defers to consumer-promotion if a second consumer surfaces |
| **`useHeroSequence` morph orchestration** with phase A/B/C and `lockParent`/`unlockParent` | research §2.4 / §5 | bbnf-specific scroll choreography |
| **`useTypewriter` autonomous loop** with jitter + force-control | research §5 | bbnf-specific; could promote if E adopts |
| **`useWalkthrough` step-graph** + `bbnf-playground-state` localStorage key | research §5 | instructional-tour composable; promotes only if 2nd consumer materialises |
| **`<WalkthroughTour>` / `<TourStep>` family** | research §2.4 | new gap surfaced by bbnf, prospective ≥ 2 with E — risk register until W6 confirms |
| **Markdown post-processor** for `.bbnf` file links + term-tooltip annotation | `markdown.ts:256-296` | bbnf-specific term registry (`lookupTerm`/`lookupFileUrl`) |
| **`<SplitPane>` / `useSplitPane({ axis, persistKey, minPanePx })`** | research §2.3 | single-consumer today (1 live site at `PlaygroundPage.vue:131-145`); risk register per `00-synthesis.md` Pass-2 ¶15 — promote only if 2nd consumer surfaces |
| **`runtimeHighlight()` + `LANGUAGE_RULES`** runtime-token module | research §2.2 / §C | single-consumer (bbnf); 8-language rule-table API; risk register per Pass-2 ¶19 |
| **`<HorizontalBarChart>` / `<MetricList>`** | research §2.7 | proposed gap; risk register pending B speedtest second-consumer confirmation |
| **`<TelemetryHoverCard>`** (4-row Parse/Format/Total/Input grid) | research §2.5 | 1 site here, prospective only |
| **WASM/`gorgeous` integration** | `composables/wasm/*` | bbnf-specific |
| **`getSectionTheme` per-section icon+colour map** | `src/lib/sectionTheme.ts` | bbnf-specific brand vocabulary |
| **Mobile pane segmented control** | `main.css:354-396` | playground-specific UI |
| **`.code-tabs` / `.bench-chart` / `.live-bench` / `.flow-chart` / `.runnable-code` markdown fence vocabulary** | `markdown.ts:179-240` | bbnf-specific docs DSL; the *primitives* it produces are gap candidates (see §3 above) |
| **`LivePreviewStrip` 8-second auto-cycling preset** | landing | landing-page-specific |

---

## 6. Projected post-migration drift

Pinned baseline: **58 unique-row** (W0.γ HEAD `955ffaf0`).

| Axis | Baseline | Projected delta after migration | Residual |
|---:|---:|---:|---:|
| 1 — Token alignment | 12 | -11 (1.2…1.12 absorbed; 1.1 kept as preset rename) | **1** |
| 2 — Utility hygiene | 12 | -12 (all 12 absorbed; 2.7 + 2.8 are S6/S7 silent-failure resolutions) | **0** |
| 3 — Interactive consistency | 7 | -7 | **0** |
| 4 — Variant rooting | 7 | -7 | **0** |
| 5 — Motion vocabulary | 8 | -7 (5.6 stays as `<WalkthroughTour>` risk register) | **1** |
| 6 — Typographic hierarchy | 9 | -8 (6.1 already canonical; rest absorbed) | **0** |
| 7 — Accessibility | 3 | -3 | **0** |
| design-lang | 4 | -4 (all 4 absorbed via gap promotions) | **0** |
| **Σ** | **58 unique** (62 axis-row) | **-56 unique** | **2 unique** |

**Projected post-migration drift count: 2 unique-row** (1.1 brand-pastel rename retained as preset namespace; 5.6 walkthrough overlay annotation pattern retained pending `<WalkthroughTour>` ≥ 2 bar). Both residuals are explicitly named in `W0-challenge.md` §C as risk-register-pending and do not block the consumer's follow-up tranche acceptance.

This becomes bbnf-lang/playground's own follow-up tranche acceptance criterion: **≤ 2 residual drift rows** after migrating against this ledger.

---

## 7. Authority

Ledger authority: G.W5 orchestrator (agent G.W5.bbnf, 2026-05-04).
Inputs: `research/G-bbnf-lang-playground.md`; `audit/W0-baseline-drift.md` (58 unique-row pin); `audit/W0-silent-failures.md` (S6 + S7 resolutions); `audit/W0-challenge.md` §B.1 (`--accent-red` rescission), §B.3 (silent-failure family naming), §B.4 (`--shadow-cartoon-lg` token), §C (risk-register triggers), §E (binding decisions); `waves/W5.md` (ledger draft).

No consumer-repo edits land as part of this tranche. The follow-up tranche owned by bbnf-lang/playground executes the migration table.
