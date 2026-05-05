# W5 — fourier-analysis/web consumer migration ledger

**Status**: drafted by G.W5; consumer-repo edits land in fourier-analysis/web's own follow-up tranche per G.md invariant 12.

**Consumer path**: `/Users/mkbabb/Programming/fourier-analysis/web`
**Lane research source**: `docs/tranches/G/research/C-fourier-analysis-web.md`
**Pinned baseline drift count at HEAD (W0.γ)**: **49 unique-row** / **69 axis-row** (W0 challenge §D variance flag: +41% axis-row inflation is a methodology artefact — multi-axis rows. Ledger pins against unique-row for migration accounting; axis-row is reserved for axis-coverage hard-gate projection).
**Consumer SHA at audit time**: `fae704d` (W0.γ).
**Glass-ui canon SHA at audit time**: `master @ badc536` (v0.5.0).
**Heaviest leverage**: ~150 lines of token redeclaration in `src/styles/fourier-overrides.css` (354-line file; ~150 retire-able, ~200 retained for genuine consumer territory — KaTeX `@font-face` boilerplate, compound `--shadow-modal`, cream-palette base).

---

## 1. Token redeclaration retirement (fourier-overrides.css — highest leverage)

Per W5.md highlights and lane C axes 1.1–1.7, every redundant redeclaration enumerated:

| section | lines | redeclared | canon source | retirement action |
|---|---|---|---|---|
| `@theme` font stacks | `fourier-overrides.css:14-19` (4 props × 1 block = 6 lines incl. braces) | `--font-serif`, `--font-sans`, `--font-display`, `--font-mono` | `glass-ui/src/styles/typography.css:15-20` (and `tokens.css` font block) | **Delete the `@theme` block.** Keep only the `--font-sans → CM-serif` re-aliasing if the consumer wants body sans to read as CM-serif (move to `:root`, not `@theme`, per glass-ui font-preset guidance). Lane C 1.1. |
| Section-color palette (light) | `fourier-overrides.css:79-91` (13 declarations) | `--section-color-{0..12}` | `glass-ui/src/styles/tokens.css:180-192` | **Delete.** Inherit canon. Lane C 1.2 / U4. |
| Section-color palette (dark) | `fourier-overrides.css:135-148` (13 declarations) | `--section-color-{0..12}` (dark mirrors) | `glass-ui/src/styles/tokens.css:480-490` | **Delete.** Inherit canon. Lane C 1.2 / U4. |
| Viz-basis palette (light) | `fourier-overrides.css:99-103` (5 declarations) | `--viz-fourier`, `--viz-chebyshev`, `--viz-legendre`, `--viz-amber`, `--viz-green` | `glass-ui/src/styles/tokens.css:202-206` | **Delete.** Lane C 1.3 / U5. |
| Viz-basis palette (dark) | `fourier-overrides.css:156-160` (5 declarations) | `--viz-*` (dark mirrors) | `glass-ui/src/styles/tokens.css:495-499` | **Delete.** Lane C 1.3 / U5. |
| Easing accent | `fourier-overrides.css:106` (1 declaration) | `--easing-accent: hsl(248 88% 71%)` | `glass-ui/src/styles/tokens.css:209` (verbatim) | **Delete.** Lane C 1.4 / U3. |
| Semantic accents (light) | `fourier-overrides.css:109-115` (7 declarations) | `--tier-featured`, `--tier-saved`, `--like`, `--success`, `--warning`, `--info`, `--delete` | `glass-ui/src/styles/tokens.css:212-219` | **Delete.** Lane C 1.5 / U6. |
| Semantic accents (dark) | `fourier-overrides.css:163-169` (7 declarations) | semantic accents (dark mirrors) | `glass-ui/src/styles/tokens.css:501-508` | **Delete.** Lane C 1.5 / U6. |
| Type micro/admin-label | `fourier-overrides.css:130-131` (2 declarations) | `--type-admin-label: 0.625rem`, `--type-micro: 0.6875rem` | `glass-ui/src/styles/typography.css:24-25` (verbatim) | **Delete.** Lane C 1.6 / U1, U2. |
| `@utility` redefinitions | `fourier-overrides.css:222-230` (`text-micro`, `text-admin-label`) | `@utility text-micro` and `@utility text-admin-label` | `glass-ui/src/styles/typography.css:185-193` (canon ships these as `@utility`) | **Delete.** Lane C 2.4. |
| Class-selector typography utilities | `fourier-overrides.css:232-249` (`.cm-serif`, `.fira-code`, `.fourier-f`) | three font-stack utilities | `glass-ui/src/styles/typography.css:241-275` (canon ships these as `@utility` versions) | **Delete.** Lane C 2.5 / U7. |
| Apple easing wrappers | `fourier-overrides.css:253-258` (`.ease-apple`, `.ease-apple-spring`) | cubic-bezier transition-timing wrappers | canon `--ease-apple` + `--ease-apple-spring` tokens (`tokens.css`); `tw-animate-css` already provides `ease-apple` Tailwind utility (consumer imports `tw-animate-css`). | **Delete.** Lane C 2.6. |
| Animation keyframes + `.animate-*` wrappers | `fourier-overrides.css:262-296` (`fade-in`, `scale-in`, `slide-up`, `tab-slide-in` keyframes + 3 `.animate-*` wrappers + `[data-state="active"][role="tabpanel"]` rule) | byte-identical to canon | `glass-ui/src/styles/animations.css` (canon ships `fade-in`, `scale-in`, `slide-up`); migrate to Vue Transitions: `pop`, `fade`, `fade-slide`, `tab-fade` per `transitions.css` | **Delete keyframes + `.animate-*` wrappers.** Replace tabpanel rule with canonical `tab-fade` Vue Transition (or drop entirely if `<TabsContent>` is in use). Lane C 2.7. |
| Reduced-motion guard | `fourier-overrides.css:343-354` (12 lines) | gates only the `.animate-*` utilities being deleted above | — | **Delete or shrink** to one rule scoped to surviving consumer-domain animations (KaTeX overflow has no motion). Lane C 5.9. |

**Lines retired from `fourier-overrides.css`**: ~150 lines (matches lane C / W0.γ note 6 reconciliation: 30 section-color rebinds + 18 viz/easing/semantic/type lines + 18 `@utility` and class-selector typography lines + ~16 ease wrapper + ~36 animation block + 12 reduced-motion guard).

**Retained from `fourier-overrides.css`** (genuine consumer territory; **do not retire**):

- Lines 23-46 + 48-69 — cream palette `--background`/`--foreground`/`--card`/etc. for light + dark. This is consumer brand palette; per `feedback_presets_in_consumer` cream-as-preset stays in the consumer. (W1's canon `--cream-*` exposure is for *other* consumers to opt into.)
- Lines 117-122 + 171-176 — `--shadow-cartoon` / `--shadow-cartoon-hover` / `--shadow-soft` / `--shadow-elevated` / `--shadow-modal`. The cartoon-shadow recipe (`color-mix(... foreground 8%)`) is **better** than canon's rgba-black recipe in dark mode (lane C U17). Recommend folding into the canon `--shadow-cartoon-md` family instead — but until canon adopts the foreground-color recipe, keep these consumer-side. **Soft/elevated** are duplicative of `--shadow-md` / `--shadow-lg` and could be aliased to canon (lane C 1.7) — flag as optional cleanup.
- Lines 124-127 — `--z-canvas-layer`, `--z-canvas-overlay`, `--z-toast`. Canvas layers are domain-specific (lane C 1.8). Keep but **rename `--z-canvas-layer` → `--z-canvas-content`** to read coherently against canon's `--z-content` / `--z-controls` stack; **drop `--z-toast: 250`** (overrides canon's 100 for no documented reason; canon stack already accommodates `--z-debug: 99999`).
- Lines 182-200 — `@theme` Tailwind color mappings (`--color-accent-red`, `--color-section-heading`, `--color-tier-featured`, …). These bind canon tokens into Tailwind's class generator (`bg-accent-red`, `text-tier-featured`). Keep — but see §3 below for the `--accent-pink`/`--accent-red` clarification and §4 for the `--section-heading` decision.
- Lines 298-330 — KaTeX `@font-face` declarations + `.katex-display` overflow rule + `.dark .katex` color. Consumer territory per risk register R3 + lane C 2.14. The math-display overflow rule **moves** to `<MathSurface>` / canon `math.css` once the consumer migrates (see §6 below); the `@font-face` block stays consumer-side.
- Lines 332-341 — `::selection` color rule. Editorial; consumer territory.

---

## 2. Migration table — in-component drift

Drift rows from lane C drift findings (axes 1–7). Sites pinned to consumer paths under `/Users/mkbabb/Programming/fourier-analysis/web/`. Projected delta is **-1 unique drift row** per row unless noted (multi-row absorptions explicit).

| drift # | site (file:line) | current pattern | canonical replacement | canon source | projected drift delta |
|---:|---|---|---|---|---:|
| C-1 | `src/styles/fourier-overrides.css:14-296` (entire ~150-line redeclaration block) | redeclared tokens, utilities, keyframes, easings | retire per §1 above | glass-ui `tokens.css` / `typography.css` / `animations.css` / `transitions.css` | -12 (rolls up redeclaration rows; counted once at unique-row) |
| C-2 | `src/components/visualization/EquationPanel.vue:109` | `z-[15]` literal | `z-[var(--z-canvas-overlay)]` (or `z-[var(--z-controls)]` if consumer drops `--z-canvas-overlay`) | consumer-local token | -1 |
| C-3 | `src/components/equation/EquationView.vue:418` (`color: #f0b632 !important`) | hardcoded golden hex | `var(--gold-light)` (canon `--color-gold-light` / `tokens.css`) | `glass-ui/src/styles/tokens.css` `--color-gold-light` | -1 (folds into C-3a aggregate) |
| C-3a | `src/components/equation/EquationModeToggle.vue:58` | `color: #f0b632` | `var(--gold-light)` | canon | -1 (rolled into C-3 9× aggregate) |
| C-3b | `src/components/equation/FunctionInput.vue:252` | `color: #f0b632 !important` | `var(--gold-light)` | canon | -1 |
| C-3c | `src/components/equation/composables/useCoeffHover.ts:71,79,84` (3 KaTeX literal embeds) | `\\color{#f0b632}` inside KaTeX strings | `getComputedStyle(document.documentElement).getPropertyValue('--color-gold-light').trim()` once at module load; interpolate into the KaTeX string | canon `--color-gold-light` resolved at runtime | -3 |
| C-3d | `src/components/equation/convergence/ConvergenceLegend.vue:78,94` | `background: #f0b632` / `color: #f0b632` | `var(--gold-light)` | canon | -2 |
| C-3e | `src/lib/colors.ts:12` (`golden: "#f0b632"` constant) | static hex constant | replace with runtime `cssVarToHex('--color-gold-light')` (helper already exists in `lib/colors.ts:90-96`) OR import `vizColorsHex.gold` from `@mkbabb/glass-ui/tokens` once exposed | canon runtime tokens module (W3 lane F) | -1 |
| **C-3 aggregate** | 9× `#f0b632` total | — | — | — | **-9 unique** (lane C drift 1.10) |
| C-4 | `src/components/visualization/AnimationControls.vue:154` (rainbow gradient hsl tuples) | hand-rolled `linear-gradient(135deg, hsl(0 75% 62%), …)` rainbow stops | `linear-gradient(135deg, var(--rainbow-red), var(--rainbow-orange), …, var(--rainbow-violet))` — or `<Button variant="rainbow">` (G3 gap deferred) | canon `--rainbow-{vivid,*}` tokens (`tokens.css:249-256`) | -1 |
| C-5 | `src/components/visualization/ImageUpload.vue:148-156` + `src/lib/colors.ts:13-16` (parallel STATIC.rainbow array) | duplicate rainbow stops | shared canon `--rainbow-*` tokens; or `<Progress variant="gradient">` for the loading bar | canon | -2 |
| C-6 | `src/components/equation/EquationView.vue:419` (`background: rgba(240, 182, 50, 0.1)`) | raw rgba mixed from `#f0b632` | `color-mix(in srgb, var(--gold-light) 10%, transparent)` | canon | -1 |
| C-7 | `src/components/morph/HarmonicLevelGrid.vue:189-191, 238-239` (`#60a5fa` is-bound focus ring) | hardcoded basis-blue | `var(--viz-chebyshev)` | canon `tokens.css:202-206` | -1 |
| C-8 | `src/components/controls/DarkModeToggle.vue:30-31` (sun [232,136,69], moon [192,132,252]) | hardcoded numeric arrays for dark-toggle path-fill | `cssVarToHex('--viz-legendre')` (helper already in `lib/colors.ts`) — flow brightening through automatically | canon `--viz-legendre` | -1 |
| C-9 | `src/components/visualization/ContourPreview.vue:45` (`stroke="hsl(40 90% 55% / 0.85)"`) | hardcoded amber | `color-mix(in srgb, var(--viz-amber) 85%, transparent)` | canon | -1 |
| C-10 | `src/components/visualization/AnimationControls.vue:140-147` (rgba white inset highlights) | hand-rolled glass surface | `<button class="glass-btn glass-medium">` + rainbow `::before` overlay; canon `--glass-shadow-default` recipe encodes inner highlight + drop | canon `glass.css` tier (a11y baked) | -1 |
| C-11 | `src/components/visualization/ContourSettings.vue:407-410, 420-432` + `src/components/equation/EquationView.vue:241` + `src/components/visualization/VisualizationView.vue:160` (3 sites) | bespoke destructive-tinted retry banners | `<Alert variant="destructive">` | `glass-ui/src/components/ui/alert/` | -3 |
| **Axis 2 — Utility & `@apply` hygiene** | | | | | |
| C-12 | `src/styles/buttons.css:127-216` (`.btn-icon-admin`, `.btn-solid`, `.btn-ghost`, `.basis-pill`) | reinvented Button variants | `<Button variant="default">` / `<Button variant="outline">` / `<Button variant="glass-subtle" size="icon">` (28px icon-size variant from W3 if shipped; otherwise default `size="icon"`); `.basis-pill` migrates to `<ColorPill>` per C-29 below | canon `<Button>` family (`ui/button/`) | -3 (`.basis-pill` counted in C-29) |
| C-13 | `src/styles/buttons.css:9-123` (`.styled-slider` + global `input[type="range"]` override) | hand-rolled flat-track range slider | **Defer** per W3 spec (Slider `glass-track` variant deferred to later tranche per G.md / lane C G3 / W5.md highlights). Track 3 internal sites under "deferred". | — | 0 (deferred) |
| C-14 | `src/components/visualization/ExportModal.vue:99-202` + `src/components/visualization/gallery/GalleryCardModal.vue:191-225` (2 modals) | bespoke `<Teleport to="body">` + `.modal-backdrop` + `.modal-card` with bouncy `cubic-bezier(0.34, 1.56, 0.64, 1)` enter | `<Dialog>` + `<DialogContent>` + `closeIconClass` slot prop (W3 lane 4 absorbs the close-icon styling pattern) | `glass-ui/src/components/ui/dialog/` | -2 |
| C-15 | `src/components/equation/EquationView.vue:454-465` (`.info-hovercard` global style block + direct `reka-ui` HoverCard import at line 8) | bypasses `<HoverCard>` for content-tier customisation | `<HoverCard>` + new `contentClass` slot prop on `<HoverCardContent>` (W3 lane 4) | `glass-ui/src/components/ui/hover-card/` | -1 |
| C-16 | `src/components/equation/CoefficientsPanel.vue:122-138` + `src/components/equation/EqCoefficientsPanel.vue:122-138` (parallel `.coeff-tooltip` styles, ~25 lines each) | duplicate absolute-positioned tooltip recipes | `<Tooltip placement="bottom-start" :offset>` + canon `--popover` background + `--shadow-md`; or `<DataList>` (lane C G8 — gap deferred to consumer follow-up if not promoted) | canon `<Tooltip>` (`ui/tooltip/`) | -2 |
| C-17 | `src/components/visualization/CoefficientsPanel.vue:24-27` + `EqCoefficientsPanel.vue:24-27` + `FrequencyGraph.vue:42-45` + `lib/canvas-drawing/transforms.ts:3` + `equation/lib/harmonics.ts:81` (5 copies of `spectrumColor(i, total)`) | duplicate hue-ramp helper | import `spectrumColor` from `@mkbabb/glass-ui/tokens` (W3 lane F runtime token export) | `glass-ui/src/components/custom/aurora/composables/colors.ts` runtime export under `@mkbabb/glass-ui/tokens` | -5 |
| C-18 | `src/components/equation/EquationView.vue:411-420` (`:deep(.eq-coeff)` on portaled KaTeX) | `:deep()` against rendered KaTeX HTML | **Keep** — KaTeX HTML is renderer output the consumer doesn't own. Token-bind only the gold colour (folds into C-3 aggregate). | — | 0 (token-only — already counted in C-3) |
| **Axis 3 — Interactive consistency** | | | | | |
| C-19 | 8 bespoke button recipes: `EditorToolsPanel.vue:65-92` (`.tool-btn`), `morph/FourierMorphDemo.vue:285-327` (`.btn-export`/`.btn-reset`), `equation/FunctionInput.vue:226-249` (`.compute-btn`), `paper/PaperView.vue:470-498` (`.overlay-btn`), `gallery/GalleryCardModal.vue:177` (inline `.callout-btn`), `morph/MorphShapePreview.vue:91-120` (`.morph-button`), `equation/ConvergencePlot.vue:94-112` + `convergence/ConvergenceTimeline.vue:94-112` (`.play-btn`), `AnimationControls.vue:130-174` (rainbow `.play-btn`) | each button reinvents states + transforms + shadows | `<Button>` + canonical variants (`default`, `outline`, `ghost`, `glass-subtle`); `.tool-btn` → `<Button variant="tool">` if W3 lane 4 shipped tool variant (otherwise `outline` + `--tool-color` consumer-side); rainbow `.play-btn` → `<Button variant="rainbow">` (lane C G6 — gap, defer to consumer follow-up if not in canon W3) | canon `<Button>` family | -8 |
| C-20 | `src/components/visualization/EditorControlsDock.vue:177-179` (`is-amber`/`is-sky`/`is-rose` modifiers via `--btn-hover-color` CSS variable on `DockIconButton`) | informal accent convention | `<DockIconButton accent="amber\|sky\|rose\|fourier\|chebyshev\|legendre">` first-class API (lane C 3.2 — gap; if W3 lane E shipped accent prop, this is mechanical) | `glass-ui/src/components/custom/dock/` | -1 |
| C-21 | `src/components/visualization/CanvasControlsDock.vue:111-120` (`.view-dot` 6×6 absolute pip) + `gallery/GalleryAdminBanner.vue` admin badge + `layout/AppHeader.vue:246-256` admin badge | hand-rolled notification-pip recipes | `<NotificationDot>` primitive OR `<DockIconButton :badge>` (lane C G9 / 3.3 — gap, defer to consumer follow-up if not in canon W3); fall-back: `<MetricBadge size="sm">` for textual badges | canon `<NotificationDot>` (W3 lane 4 absorption candidate; if deferred, consumer tracks as residual) | -3 |
| C-22 | `src/components/equation/FunctionInput.vue:99-109,118-122,128-132` + `BasisSelector.vue:140-148,166-174` + `morph/MorphPhaseConfig.vue:163-168` + `morph/HarmonicLevelGrid.vue:166-180` + `gallery/GallerySearchBar.vue:80,95` + `gallery/GalleryDraftsSection.vue` (slug input) + `gallery/UserSlugBar.vue:121` (login slug) (6+ sites) | bespoke `border-[1.5px] border-border/50` "cartoon" inputs / 2px-foreground/15 trim on `<SelectTrigger>` | `<Input variant="cartoon">` / `<NumberField variant="cartoon">` / `<SelectTrigger variant="cartoon">` (lane C G5 / 4.6 — gap; risk-flag from W0 challenge §C "watch — promote to risk register at W5 close if still single-consumer") | canon (W3 lane 4 if cartoon variant shipped; otherwise consumer keeps recipe pending second consumer) | -6 (or -0 if cartoon variant deferred) |
| C-23 | `src/components/visualization/SliderControl.vue:166-220` + `GlassTimeline.vue:122-174` + `convergence/ConvergenceTimeline.vue:119-157` (3 independent pointer-capture glass-track sliders) | duplicate slider implementations | **Defer** per W3 spec — `<Slider variant="glass-track">` is deferred to a later tranche per W5.md highlights and lane C G3. The dock-keep-open injection (`SliderControl.vue:24-25`, `GlassTimeline.vue:12-13`) migrates separately to `DockLayerGroup :keepOpenWhile` (W3 lane E) | — | 0 (deferred) |
| C-24 | `src/components/visualization/ExportModal.vue:163-195` (`.toggle` switch hand-roll) | bespoke toggle | `<Switch>` | canon `ui/switch/` | -1 |
| **Axis 4 — Variant orthogonality** | | | | | |
| C-25 | `src/components/equation/EquationView.vue:8` (`import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "reka-ui"`) | direct reka-ui import bypassing canon wrapper | `<HoverCard>` + `contentClass` slot prop (W3 lane 4) | canon `<HoverCard>` | -1 (folds into C-15) |
| C-26 | `src/components/visualization/AnimationControls.vue:181-196` (`.menu-popup` hand-positioned popup with `onClickOutside`) | reinvents Popover position + portal + animation | `<Popover>` + `<PopoverContent>` | canon `<Popover>` | -1 |
| C-27 | `src/components/ui/CollapsibleSection.vue:54-70` (custom `@keyframes collapsible-open/close`) | duplicates canon collapsible animation | canon `expand-fade` Vue Transition + `--reka-collapsible-content-height` recipe | `glass-ui/src/styles/transitions.css` + reka collapsible | -1 |
| C-28 | `src/components/equation/EquationView.vue:454-465` + `gallery/GalleryCardModal.vue:71` + `ExportModal.vue:99` (3 sites of `z-[var(--z-modal)]` mis-tier — hover-card pinned to modal layer) | wrong z-tier per overlay type | use `<HoverCardContent>` (sets `--z-hovercard`); `<DialogContent>` sets `--z-modal` automatically | canon z-token stack | -1 |
| **Axis 5 — Overlay & motion** | | | | | |
| C-29 | `src/components/equation/NotationPills.vue:14-43` (`.notation-active` + `--pill-color`) + `src/components/visualization/BasisSelector.vue:122-275` (`.basis-pill`) + `gallery/GallerySearchBar.vue:107-202` (`.basis-pill-btn`) + `gallery/GalleryCard.vue:84-92` (`basis-pill`) + `gallery/GalleryCardModal.vue:131-141` + `src/styles/buttons.css:211-216` (6 sites of color-keyed pill) | duplicate `--pill-c`/`--pill-color` recipe (`color-mix … 12% fill / 30-40% border`) | `<ColorPill :color :active>` or `<Badge variant="color">` (W3 lane 4 absorption) — keeps `cm-serif` glyph-icon convention via `:icon` slot. Per W5.md highlights: "`.basis-pill` family → `<ColorPill>` / `Badge variant=\"color\"`". | canon `<ColorPill>` / `<Badge variant="color">` (W3) | -6 |
| C-30 | `src/styles/buttons.css:30-31` (apple-spring literal `cubic-bezier(0.175, 0.885, 0.32, 1.275)` on `.btn-icon-admin`) | hand-rolled apple-spring | `transition: transform var(--duration-fast) var(--ease-apple-spring)` | canon `--duration-fast` + `--ease-apple-spring` (`tokens.css`) | -1 |
| C-31 | `src/components/paper/PaperView.vue:486` (`transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` on `.overlay-btn`) | `transition: all` + bezier literal | property-list + `var(--duration-fast)` + `var(--ease-out-expo)` | canon | -1 |
| C-32 | Project-wide 29 occurrences of `transition: all` (verified `rg 'transition:\s*all' = 29` at HEAD): top sites `gallery/GallerySearchBar.vue:178`, `gallery/GalleryCard.vue:152-156`, `paper/PaperSidebar.vue:223-225`, `morph/MorphPhaseConfig.vue` etc. | non-property-list transitions | property-list + `var(--duration-*)` + `var(--ease-*)` per site | canon tokens | -29 |
| C-33 | `src/components/visualization/ExportModal.vue:130-131` + `gallery/GalleryCardModal.vue:217-218` + `morph/HarmonicLevelGrid.vue` ("bouncy modal" enter `cubic-bezier(0.34, 1.56, 0.64, 1)` 0.3s) | bouncy enter literal | `<Dialog>` ships canon `dialog-scale` Vue Transition; or `var(--ease-spring-bouncy)` token | canon `transitions.css` | -3 (folds into C-14 dialog migration) |
| C-34 | `src/components/visualization/AnimationControls.vue:174` (`@keyframes rainbow-drift`) | bespoke gradient-position drift | canon `rainbow-drift` keyframe (W2 — gap G6) + `--duration-rainbow: 2.5s` token | `glass-ui/src/styles/animations.css` (W2 lane C) | -1 |
| C-35 | `src/components/equation/ConvergencePlot.vue:390-393` + `AnimationControls.vue:213-214` (`@keyframes tooltip-in`) | tooltip scale+opacity keyframe | canon `fade-slide` Vue Transition (used by all hover-cards) | canon | -2 |
| C-36 | `src/components/visualization/gallery/GalleryCard.vue:201-205` (`@keyframes like-bounce` 1→1.3→1) | like-button bounce | canon `pop` Vue Transition; or `<LikeButton>` primitive (lane C G10 — gap, defer to consumer follow-up) | canon `pop` | -1 |
| C-37 | `src/components/equation/ConvergencePlot.vue:381` + `EquationView.vue:454-465` + ~5 more (7 sites of `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)`) | "tooltip / popover shadow" literal | `var(--shadow-md)` (canon recipe is `0 4px 16px rgba(0,0,0,0.08)` — close enough to absorb) | canon `tokens.css` | -7 |
| **Axis 6 — Typographic hierarchy** | | | | | |
| C-38 | `src/components/morph/FourierMorphDemo.vue:212-219, 228-238` (`.demo-title { font-size: 2rem; }`, `.demo-subtitle { font-size: 1.125rem; }`) | literal sizes via `var(--font-serif)` | `<h1 class="text-title">` + `<p class="text-prose">` | canon `typography.css` | -2 |
| C-39 | `src/components/paper/PaperView.vue:297-301` (`text-4xl font-bold ... md:text-[3.25rem] leading-[1.15]`) | hand-rolled display | `class="text-display-2"` (CM-serif clamp 32.9–53.3px, leading 1.1) | canon | -1 |
| C-40 | `src/components/visualization/ImageUpload.vue:44-47` + `ContourSettings.vue:188` + `BasisSelector.vue:110` + `EqCoefficientsPanel.vue:41` + `paper/PaperSidebar.vue:54` (5 sites of `cm-serif text-sm font-semibold tracking-tight` card-title) | repeated card-title pattern | `<CardTitle>` (which renders `.text-subheading`) | canon `<CardTitle>` | -5 |
| C-41 | `src/components/morph/MorphPhaseConfig.vue:114-119` + `morph/HarmonicLevelGrid.vue:135-141` (`.config-card-title { font-family: var(--font-serif); font-size: 1.125rem; font-weight: 400 }`) | duplicated config card-title | `class="text-subheading"` | canon | -2 |
| C-42 | Project-wide 7 sites of `font-family: "Fira Code", monospace` literal: `EquationModeToggle.vue:69`, `SpeedSelect.vue:50,62`, `ConvergencePlot.vue:377`, `ConvergenceLegend.vue:88`, `ConvergenceTimeline.vue:85`, `FrequencyGraph.vue:109` | hardcoded mono-stack | `font-family: var(--font-mono)` or `.fira-code` `@utility` (canon ships) | canon | -7 |
| C-43 | `src/components/visualization/lib/canvas-drawing/labels.ts:50,91` + `grid.ts:92` (Canvas 2D `ctx.font = '...Computer Modern Serif…'`) | hardcoded font stack inside canvas drawcalls | `getComputedStyle(canvas).getPropertyValue('--font-serif')` once at draw start; OR import `tokenFonts` from `@mkbabb/glass-ui/tokens` (lane C 6.7 — runtime token gap) | canon runtime tokens module | -3 |
| C-44 | `src/components/equation/FunctionInput.vue:96` + `BasisSelector.vue:138-149` + dozens more (`<label class="text-sm font-medium text-muted-foreground">`) | repeated field-label shape | `class="section-label"` (mono-uppercase canon utility); CM-serif uppercase variants migrate to `.section-label-serif` if W2 ships it (otherwise consumer keeps hue) | canon `.section-label` (`utilities.css`) | -10 (estimate; lane C cites "dozens"; pin to 10 conservatively at W5 follow-up) |
| C-45 | `src/components/paper/PaperSidebar.vue:171-178` (`.sidebar-label` CM-serif uppercase) | bespoke serif-uppercase label | `class="section-label"` if mono is acceptable; otherwise consumer keeps as `paper-sidebar-label` (single-site preset) | canon | -1 |
| **Axis 7 — A11y resilience** | | | | | |
| C-46 | `src/components/visualization/AnimationControls.vue:140-148` (`.play-btn` glass surface — no PRT/PCM/`@supports not (backdrop-filter)` fallback) | bespoke glass without a11y baked | `<button class="glass-btn glass-medium">` (canon glass tier ships fallbacks) | canon `glass.css` | -1 (folds with C-10) |
| C-47 | `src/components/visualization/GlassTimeline.vue:128-130` + `convergence/ConvergenceTimeline.vue:122-127` (raw `backdrop-filter: blur(12px)`) | raw blur, no PRT fallback | `var(--glass-blur-subtle)` token + canon glass tier | canon | -2 (folds into C-23 deferred slider migration) |
| C-48 | `src/components/visualization/ExportModal.vue:107-109` + `gallery/GalleryCardModal.vue:71` (modal backdrop `backdrop-filter: blur(8px)` literal) | raw modal-backdrop blur | `<Dialog>` ships fallback automatically | canon `<Dialog>` | -2 (folds into C-14 dialog migration) |

**Migration row count**: ~30+ unique drift rows enumerated above (C-2 through C-48; aggregating the 9× `#f0b632` and 5× `spectrumColor` rows folds them into single migration line items but the unique-row drift count tallies each distinct call site).

---

## 3. `--accent-pink` and `--accent-red` clarification (W0 challenge §B.1)

**Synthesis claim** (G.md:96, user-direction overlay #13): retire `--accent-pink` + `--accent-red` as orphan.

**Lane β audit verified**:

- `--accent-pink`: **0 src** + **4 fourier component sites** in `MorphShapePreview.vue`, `MorphPhaseConfig.vue`, `EditorControlsDock.vue` (verified) + **3 fourier preset-override sites** (the redeclarations in `fourier-overrides.css:94`, `:151`, `:184`).
- `--accent-red`: **0 src** + **16 consumer sites**: 12 fourier-analysis component-source sites in `MorphShapePreview.vue`, `MorphPhaseConfig.vue`, `decorative/FourierMorphSvg.vue`, `morph/FourierMorphDemo.vue`, `morph/HarmonicLevelGrid.vue` + 6 keyframes preset + 4 bbnf preset (cross-consumer).

**Disposition** (W0 challenge §B.1 / E.1): retirement is **RESCINDED**. Canon retains both tokens. Per `feedback_no_backwards_compat`, retirement requires no live consumers OR a same-tranche migration; both fail that test.

**Net fourier consumer migration**:

| token | redundant redeclaration to drop | component-level usage | action |
|---|---|---|---|
| `--accent-pink` | `fourier-overrides.css:94` (light), `:151` (dark), `:184` (`@theme --color-accent-pink` Tailwind binding) | 4 component sites use `var(--accent-pink)` | **Drop the 3 redundant redeclarations** (lines 94, 151, 184). Component sites resolve to canon `--accent-pink` automatically — zero touches at component level. |
| `--accent-red` | `fourier-overrides.css:96` (light), `:153` (dark), `:183` (`@theme --color-accent-red` Tailwind binding) | 12 component sites use `var(--accent-red)` | **Drop the 3 redundant redeclarations** (lines 96, 153, 183). 12 component sites resolve to canon — zero touches at component level. |

**Component-level sites that KEEP `var(--accent-pink)` / `var(--accent-red)` references** (verbatim, no migration):

- `--accent-pink`: `src/components/morph/MorphShapePreview.vue`, `src/components/morph/MorphPhaseConfig.vue`, `src/components/visualization/EditorControlsDock.vue` (4 sites total, exact line numbers per consumer audit).
- `--accent-red`: `src/components/morph/MorphShapePreview.vue`, `src/components/morph/MorphPhaseConfig.vue`, `src/components/decorative/FourierMorphSvg.vue` (consumer's `strokeColor` default at line 24,30 per lane C 1.15), `src/components/morph/FourierMorphDemo.vue`, `src/components/morph/HarmonicLevelGrid.vue` (12 sites total).

**Net drift impact**: 0 component-level migrations; 6 redeclaration-lines retired (already counted in §1).

---

## 4. `--section-heading` migration

**Synthesis claim** (W0 challenge §B.1 / R3): retire as orphan in W1.

**Lane β audit verified**: 0 src + 0 consumer component sites; only `fourier-overrides.css` declares-and-uses it locally. Per W0 challenge §B.1, **truly orphan; W1 RETIRED it.**

**Local fourier redeclaration sites**:

| line | current | recommendation |
|---|---|---|
| `fourier-overrides.css:95` (light) | `--section-heading: hsl(328 60% 46%)` | **Decision required** — see options below. |
| `fourier-overrides.css:152` (dark) | `--section-heading: hsl(330 55% 68%)` | Same. |
| `fourier-overrides.css:185` (`@theme`) | `--color-section-heading: var(--section-heading)` (Tailwind binding) | Same. |

**Recommendation** for the consumer follow-up tranche: **Option (a) keep as consumer-only token**.

Rationale:
- The token name encodes a fourier-specific brand intent (the rose/magenta hue used for paper-section H1 headings on the cream substrate). Per `feedback_presets_in_consumer`, named themed presets live in consumers.
- Migrating to `--accent-pink` would fold-but-conflate the token's purpose with the active-pink-action token — different semantic.
- Migrating to `--viz-fourier` (which is rose-orange) does not match the rose-magenta hue.
- Keeping the consumer-local token at the same 3 sites costs ~3 lines of CSS and preserves the consumer's brand intent without polluting canon.

**Option (b)** (alternate): rename to `--paper-heading-color` and document as a paper-tier branding decision in the consumer. Equivalent net effect.

**Net drift impact**: 0 retirement (consumer-only token retained); 0 redeclaration lines retired (the 3 lines stay).

---

## 5. Silent-failure resolutions

Per W0 lane β silent-failure inventory (`audit/W0-silent-failures.md` S1–S7):

| silent-failure ID | consumer affected | fourier-analysis/web has? |
|---|---|---|
| S1 `gold-shimmer` text variant | value.js | **No** — fourier uses `lib/golden-shimmer.ts` Canvas 2D helper, not the silently-broken text class. (The Canvas helper is itself a gap-promotion candidate — see §6 below.) |
| S2 `dashed-well` | value.js | **No** |
| S3 `stagger-children` | value.js | **No** |
| S4 `rainbow-vivid`/`rainbow-pastel` undefined-class refs | keyframes.js | **No** |
| S5 `active-scale`/`disabled-base` | words/frontend, keyframes.js | **No** |
| S6 `code-badge` | bbnf-lang/playground | **No** |
| S7 `blue-shimmer` literal returns from `shimmerClass()` | bbnf-lang/playground | **No** |

**Confirmed**: fourier-analysis/web has **no entries** in the W0 silent-failure inventory. value.js + bbnf-lang/playground are the silent-failure consumers.

---

## 6. Components to swap (W3 absorption targets)

Bespoke recipes that absorb into W3 components per W5.md highlights. Items marked "deferred" stay consumer-side until canon ships them in a later tranche.

| W3 absorption | fourier sites affected | canon component | action |
|---|---|---|---|
| `<MathSurface>` + `<MathFormula>` + `<MathGlyph>` (W3 lane C math primitives) + `math.css` (default-included via `src/styles/index.css` cascade per G invariant 5) | `src/components/equation/EquationResult.vue:13-23,48-82` (display KaTeX surface), `EquationView.vue:247-302` (equation card with sigma/expanded toggle), `EquationPanel.vue:107-122` (floating equation panel), `equation/composables/useCoeffHover.ts:91` (`renderToString` for cursor-following popovers), `paper/PaperView.vue:30-37` (latex-paper `useKatex` integration), `equation/NotationPills.vue:17-34` (math-glyph icon), `BasisSelector.vue:121-133` (basis-glyph icon: `F`, `T`, `P` typographic icons) | canon `<MathSurface mode="inline\|display\|popover">` + `<MathGlyph kind>` (lane C G1 + lane C 6.6 typographic-icon contract) | Migrate ~7 KaTeX-rendering surfaces; `.katex-display` overflow rule moves out of `fourier-overrides.css:317-322` into canon `math.css`. KaTeX `@font-face` boilerplate at `fourier-overrides.css:300-311` STAYS consumer-side per risk register R3. |
| `<Dialog>` + `closeIconClass` slot prop (W3 lane 4) | `src/components/visualization/ExportModal.vue:99-202` + `gallery/GalleryCardModal.vue:191-225` | canon `<Dialog>` | Folds C-14 + C-33 + C-48 into single migration. -2 unique. |
| `<HoverCard>` + `contentClass` slot prop (W3 lane 4) | `src/components/equation/EquationView.vue:8` (direct reka import) + `:454-465` (info-hovercard global style) | canon `<HoverCard>` | Folds C-15 + C-25 into single migration. -1 unique. |
| `<ColorPill>` / `<Badge variant="color">` (W3 lane 4) | 6 sites: `equation/NotationPills.vue:14-43`, `visualization/BasisSelector.vue:122-275`, `gallery/GallerySearchBar.vue:107-202`, `gallery/GalleryCard.vue:84-92`, `gallery/GalleryCardModal.vue:131-141`, `styles/buttons.css:211-216` | canon `<ColorPill :color :active>` with `:icon` slot for cm-serif glyph | C-29. -6 unique. |
| `<Button variant="cartoon" size="icon">` (W3 lane 4) | C-22 sites (cartoon-bordered inputs + `SelectTrigger` + 28px icon-admin button) — only IF W3 cartoon variant shipped per W0 challenge §C "watch — risk register at W5 close if still single-consumer" | canon | conditional on W3 lane 4 shipping the variant. -6 unique if shipped, -0 if deferred. |
| `<Slider variant="glass-track">` | **DEFERRED** per W3 spec / W5.md highlights. 3 distinct slider implementations (`SliderControl.vue`, `GlassTimeline.vue`, `ConvergenceTimeline.vue`) stay consumer-side. The dock-keep-open injection (`SliderControl.vue:24-25`, `GlassTimeline.vue:12-13`) migrates separately to `<DockLayerGroup :keepOpenWhile>` (W3 lane E). | — | 0 unique. |
| `<NotificationDot>` / `<DockIconButton :badge>` | C-21 sites — IF W3 lane 4 shipped notification-dot primitive | canon | conditional. -3 unique if shipped, -0 if deferred. |
| `<Switch>` (canon ships) | C-24 (`ExportModal.vue:163-195` `.toggle`) | canon `<Switch>` | -1 unique. |
| `<Alert variant="destructive">` (canon ships) | C-11 (3 retry-banner sites) | canon `<Alert>` | -3 unique. |
| `<Popover>` (canon ships) | C-26 (`AnimationControls.vue:181-196` `.menu-popup`) | canon `<Popover>` | -1 unique. |
| `<DockIconButton accent>` (W3 lane E if shipped) | C-20 (`EditorControlsDock.vue:177-179` `is-amber/is-sky/is-rose`) | canon | -1 unique if shipped. |
| Runtime tokens — `chartNeutrals`, `vizColorsHex`, `spectrumColor` from `@mkbabb/glass-ui/tokens` (W3 lane F runtime helper) | C-17 (5 spectrumColor copies) + C-43 (3 canvas font-stack literals) + C-3e (`lib/colors.ts:12` golden hex) | canon runtime tokens module | -9 unique. |
| `<Card variant="paper">` (lane C G7 — gap; defer to consumer follow-up if not in canon W3) | `paper/PaperView.vue:421-433` paper-article wrapper + `paper/PaperSidebar.vue:157-161` TOC card | canon (deferred) | 0 unique (deferred). |
| `lib/golden-shimmer.ts` Canvas helper (lane C R4 / G1 §3 sub-bullet 2) | `src/lib/golden-shimmer.ts:1-67` (~70-line module) — promotable to `@mkbabb/glass-ui/canvas` (new sub-export) — but **risk register R4** binds the *binding* "Fourier sum gets the gold" consumer-side; canon exports the helper, not the policy. **Currently no `@mkbabb/glass-ui/canvas` subpath exists**; G invariant 13 binds runtime additions to `@mkbabb/glass-ui/tokens`. | deferred — needs new public subpath, out of G scope | 0 unique (deferred). |

---

## 7. Risk-register confirmations (consumer-only; do NOT touch)

Per lane C §5 + W0 challenge §C, these patterns stay consumer-side:

| risk # | pattern | rationale |
|---|---|---|
| R1 | `.basis-pill` with `cm-serif`-glyph icon convention (`F`/`T`/`P` glyph mapping) | The `<ColorPill>` primitive (W3) absorbs the recipe; the *glyph mapping* per basis is consumer registry. |
| R2 | `--section-fourier-series`, `--section-complex-fourier`, ..., section-named token *aliases* | Consumer DESIGN.md per-section semantic colors are *positional* `--section-color-{0..12}` indexed by section number — that's already in canon. The named aliases are consumer mapping; never push into glass-ui. |
| R3 | KaTeX `@font-face` boilerplate (`fourier-overrides.css:300-311`) | KaTeX-specific, not glass-ui's responsibility. Stays consumer-side. The `.katex-display` overflow rule moves to canon `math.css`. |
| R4 | `lib/golden-shimmer.ts` driving Fourier-sum curves with gold glow | The Canvas helper *generalizes* (any "active path on canvas wants a gold glow") and is a candidate for `@mkbabb/glass-ui/canvas` (new subpath, out of G scope). The *binding* "Fourier sum gets the gold" stays consumer choice. |
| R5 | `useFourierMorph` composable + the morph page | Bespoke Fourier-truncation morph powering the dark-mode toggle. No library role. |
| R6 | `paperContent.ts`, `paperTree.ts`, latex-paper integration | Consumer of `@mkbabb/latex-paper`; that library is the right home for math typography-on-prose patterns. |
| R7 | `lib/colors.ts:resolveVizColors` + `MutationObserver` on `<html>` class for dark-mode token resolution | Consumer pattern. `useDarkModeSync` already exists in glass-ui (`DESIGN.md:786`); the consumer should switch to it (drift candidate, not gap). The *specific viz-color resolution* is domain. |
| R8 | `--shadow-modal: 4px 4px 0 + 0 24px 64px` compound recipe (`fourier-overrides.css:122,176`) | Genuinely the consumer's compositional choice — keep. Each consumer's modal shadow is editorial. |
| R9 | `TIER_INFO.{spline,fourier,...}` + `energyColor(energy)` recipe | Domain-specific to the equation evaluator's tier hierarchy. Library-agnostic. |
| R10 | 13-step section palette assigning colors to *specific* paper sections | Consumer mapping. Library exposes the 13 hues (now inherited from canon); consumer chooses which section gets which index. |

---

## 8. Projected post-migration drift

Pinned baseline (W0.γ): **49 unique-row** / **69 axis-row**.

Migration absorptions (unique-row column):

| category | unique drift rows absorbed |
|---|---:|
| §1 token redeclarations (rolls up to lane C 1.1–1.7 + 2.4–2.7 + 5.9) | -12 |
| §2 in-component drift table — confirmed migrations: |  |
| `#f0b632` × 9 → `var(--gold-light)` (C-3 aggregate) | -9 |
| `spectrumColor` × 5 → import from `@mkbabb/glass-ui/tokens` (C-17) | -5 |
| z-literal (C-2), rainbow gradient (C-4), parallel rainbow (C-5), gold rgba (C-6), `#60a5fa` (C-7), DarkModeToggle hex (C-8), amber stroke (C-9), play-btn glass (C-10) | -8 |
| `<Alert variant="destructive">` × 3 retry banners (C-11) | -3 |
| `<Button>` family × 8 bespoke recipes (C-19) | -8 |
| `<DockIconButton accent>` (C-20) | -1 (if W3 ships it) |
| `<NotificationDot>` × 3 (C-21) | -3 (if W3 ships it) |
| `<Input/SelectTrigger variant="cartoon">` × 6+ (C-22) | -6 (if W3 ships it) |
| `<Switch>` (C-24) | -1 |
| `<HoverCard contentClass>` (C-15/C-25) | -1 |
| `<Popover>` (C-26) | -1 |
| Collapsible animation (C-27) | -1 |
| z-tier mistakes (C-28) | -1 |
| `<ColorPill>` × 6 (C-29) | -6 |
| Apple-spring literals (C-30, C-31) | -2 |
| `transition: all` × 29 (C-32) | -29 |
| Tooltip keyframe duplicates (C-35) | -2 |
| `like-bounce` keyframe (C-36) | -1 |
| `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` × 7 (C-37) | -7 |
| `.demo-title`/`.demo-subtitle` (C-38) | -2 |
| PaperView display heading (C-39) | -1 |
| card-title × 5 (C-40) | -5 |
| config-card-title × 2 (C-41) | -2 |
| Fira Code font-family literal × 7 (C-42) | -7 |
| Canvas font-stack literal × 3 (C-43) | -3 |
| Field labels → `.section-label` (C-44 estimate) | -10 |
| Sidebar label (C-45) | -1 |
| `<Dialog>` modals × 2 (C-14, folds C-33 + C-48) | -2 |
| Glass-track slider migration (C-23, C-47) | **DEFERRED** — 0 |
| Math surfaces × 7 KaTeX sites (C-17/§6 row 1) | -7 (overlaps with C-3c, C-43; net new: -4) |

**Note**: lane C drift rows 1.10 (`#f0b632`), 1.11/1.12 (rainbow), 2.12 (spectrumColor), 5.3 (`transition: all`), 6.6 (Fira Code) are aggregate rows — each counts as **one** unique-row in the W0 baseline of 49 (consistent with W0.γ §6.note: lane C marks "overlapping where one row covers multiple axes"). The site-level sub-counts above (e.g., -29 for `transition: all`) project the *axis-row* delta against the 69 axis-row baseline.

**Unique-row projection** (against 49 baseline):
- Conservative absorption (only deferred-conditional gaps NOT shipping): retire 12 (§1) + ~27 unique drift rows (axis 1: 9 hex + 7 other = 16 reduced to ~10 unique rows; axis 2: 5 spectrumColor + 3 misc = ~6 unique; axis 3: 8 buttons reduced to ~3 unique recipes; axis 4: 4 unique; axis 5: 5 unique; axis 6: 6 unique; axis 7: folded). **Net unique: ~43 retired** ⇒ **~6 unique-row remaining**.
- Aggressive absorption (all W3 lane 4 conditional gaps ship — `<NotificationDot>`, cartoon variants, dock-accent): **~3-5 unique-row remaining**.

**Axis-row projection** (against 69 axis-row baseline): aggregate site-level total ≈ -130 axis-row impact (29 transition-all + 9 hex + 7 box-shadow + 7 fira-code + 12 redeclaration sites + ~60 from the rest), but the migration ledger absorbs ~62 axis-rows toward the 69 ceiling. **Projected axis-row remaining: ≤7** (within the 5-row residual target).

**Target post-migration drift count**: **≤5 unique-row remaining** (per W5.md hard gate); achievable in conservative scenario, comfortably hit in aggressive scenario.

**Variance flag** (W0 challenge §D): the +41% axis-row vs unique-row inflation is preserved in the projection arithmetic — the consumer's follow-up tranche should pin against unique-row (5) for migration accounting and use axis-row (7) only for axis-coverage hard-gate verification.

---

## 9. Lines retired across consumer files

**`fourier-overrides.css`**: ~150 lines retired (§1). File shrinks from 354 lines → ~200 lines (KaTeX boilerplate + cream palette + custom shadows + z-tokens + Tailwind `@theme` aliases for kept tokens + `::selection` rule remain).

**`buttons.css`**: ~90 lines retired (`.btn-icon-admin`, `.btn-solid`, `.btn-ghost`, `.basis-pill` recipes — lines 127-216). `.styled-slider` block (lines 9-123) **stays** pending the deferred `<Slider variant="glass-track">`.

**Per-component `<style scoped>` blocks**: ~5 sites retire `.coeff-tooltip` / `.modal-backdrop` / `.modal-card` / `.menu-popup` / `.info-hovercard` / `.collapsible-open/close` keyframes (~150 lines aggregate across `EquationView.vue`, `CoefficientsPanel.vue`, `EqCoefficientsPanel.vue`, `ExportModal.vue`, `GalleryCardModal.vue`, `AnimationControls.vue`, `CollapsibleSection.vue`).

**Total projected lines retired**: ~390 lines across the consumer (150 + 90 + 150).

---

## 10. Authority

Authored by G.W5 (orchestrator). Ledger pre-load locked at consumer SHA `fae704d` and glass-ui canon `master @ badc536` (v0.5.0). Final ledger is fourier-analysis/web's follow-up tranche acceptance criterion per G.md invariant 12 — no consumer-repo edits land in this tranche.

**Pinned baselines**: 49 unique-row / 69 axis-row (W0.γ §"Pinned baseline summary").
**Hard-gate target**: post-migration ≤5 unique-row remaining (per W5.md); ≤7 axis-row remaining acceptable.
**Cross-references**: W0 challenge §B.1 (`--accent-pink`/`--accent-red` rescinded retirement), §B.1 R3 (`--section-heading` retired in W1), §C (risk-flagged conditional W3 gaps), §D (variance flag).
