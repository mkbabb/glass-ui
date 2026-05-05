# Tranche G — Research Lane C — fourier-analysis/web

Scope: `/Users/mkbabb/Programming/fourier-analysis/web/`. Read-only. Glass-ui revision: `master @ badc536`. Audited slices: `src/components/ui/`, `src/components/{decorative,equation,layout,morph,paper,visualization}/`, `src/styles/`, `src/App.vue`, `src/router/`, `src/lib/{colors,golden-shimmer}.ts`. Cross-axis emphasis: math typesetting, basis-color encoding, golden flourish — fourier-analysis is the most mathematically charged consumer in the set, and the only one with KaTeX in production.

The dominant finding is structural: glass-ui already exposes the entire token vocabulary fourier-analysis/web invented in `fourier-overrides.css` (`--section-color-{0..12}`, `--viz-{fourier,chebyshev,legendre,amber,green}`, `--tier-{featured,saved}`, `--like`, `--success`, `--warning`, `--info`, `--delete`, `--easing-accent`, `--type-{micro,admin-label}`, `.cm-serif`, `.fira-code`, `.fourier-f`, the CM-serif font stack). The consumer redeclares them verbatim because the override file predates the canon catching up. Closing this loop is the single highest-leverage move in the consumer.

---

## 1. Drift findings (axes 1–7)

### Axis 1 — Token alignment

| # | Site | Drift | Canonical replacement |
|---|---|---|---|
| 1.1 | `src/styles/fourier-overrides.css:14-19` | `@theme { --font-serif/--font-sans/--font-display/--font-mono: ... }` redeclares glass-ui canon byte-for-byte (compare `glass-ui/src/styles/typography.css:15-20`) | Delete the `@theme` block. Glass-ui's `tokens.css` and `typography.css` already set the same stacks. Aliasing `--font-sans` to CM-serif is the only intentional override and should move to `:root` per glass-ui's font-preset guidance (`DESIGN.md` §Typography). |
| 1.2 | `src/styles/fourier-overrides.css:79-91` and `135-148` | `--section-color-{0..12}` redeclared with the same hsl tuples as `glass-ui/src/styles/tokens.css:180-192` | Delete. Inherit from glass-ui. |
| 1.3 | `src/styles/fourier-overrides.css:99-103` and `156-160` | `--viz-fourier`, `--viz-chebyshev`, `--viz-legendre`, `--viz-amber`, `--viz-green` redeclared identically to `glass-ui/src/styles/tokens.css:202-206` | Delete. |
| 1.4 | `src/styles/fourier-overrides.css:106` | `--easing-accent: hsl(248 88% 71%)` matches glass-ui `tokens.css:209` | Delete. |
| 1.5 | `src/styles/fourier-overrides.css:109-115` and `163-169` | `--tier-featured`, `--tier-saved`, `--like`, `--success`, `--warning`, `--info`, `--delete` redeclared identically to glass-ui `tokens.css:212-219` | Delete. |
| 1.6 | `src/styles/fourier-overrides.css:130-131` | `--type-admin-label`, `--type-micro` redeclared identically to glass-ui `typography.css:24-25` | Delete. |
| 1.7 | `src/styles/fourier-overrides.css:118-122`, `172-176` | `--shadow-cartoon`, `--shadow-soft`, `--shadow-elevated`, `--shadow-modal` redefined locally with different recipes than glass-ui (`shadow-cartoon-{sm,md,lg}` use rgba black, not foreground color-mix). The tokens are *aliased* to project-specific values | Two of the four shadows are duplicates of glass-ui semantics: keep `--shadow-soft`, `--shadow-elevated` only if their offsets differ intentionally. `--shadow-cartoon` should map to `var(--shadow-cartoon-md)` (glass-ui) — the consumer's `3px 3px 0` flat-offset is the same family glass-ui exposes as `--shadow-card`. `--shadow-modal` is unique (compounded cartoon + drop) and is a legitimate consumer recipe. |
| 1.8 | `src/styles/fourier-overrides.css:124-127` | Custom `--z-canvas-layer: 1`, `--z-canvas-overlay: 20`, `--z-toast: 250` | `--z-canvas-layer` and `--z-canvas-overlay` are domain-specific surfaces under the canvas — keep, but rename `--z-canvas-layer` → `--z-canvas-content` and place between `--z-content` (10) and `--z-controls` (20) so the stack reads coherently. `--z-toast: 250` overrides glass-ui's 100 — drop unless there's a documented reason; the rest of the stack tops out at `--z-debug: 99999` already. |
| 1.9 | `src/components/visualization/EquationPanel.vue:109` | `z-[15]` literal | Use `z-[var(--z-canvas-overlay)]` (the consumer's own token) or `z-[var(--z-controls)]`. |
| 1.10 | `src/components/equation/EquationView.vue:418`, `EquationModeToggle.vue:58`, `FunctionInput.vue:252`, `composables/useCoeffHover.ts:71,79,84`, `convergence/ConvergenceLegend.vue:78,94`, `lib/colors.ts:12` | Hardcoded golden hex `#f0b632` repeated across nine sites for the "sigma highlight" colour | Already exposed: glass-ui `--color-gold` (`hsl(43 74% 49%)`), `--color-gold-light` (`hsl(51 100% 50%)`). The consumer's `#f0b632` ≈ `hsl(43 87% 57%)` lives between the two. Promote a `--color-equation-accent` (or alias `--color-gold-light`) and reference it. The `useCoeffHover` ts file embeds it inside KaTeX `\color{#f0b632}` — those four call sites can read `getComputedStyle(document.documentElement).getPropertyValue('--color-gold-light').trim()` once at module load. |
| 1.11 | `src/components/visualization/AnimationControls.vue:154` | Inline rainbow gradient hsl tuples (`hsl(0 75% 62%)` … `hsl(330 65% 58%)`) hand-rolled | glass-ui exposes `--rainbow-{red,orange,yellow,green,blue,indigo,violet}` (`tokens.css:249-256`). Replace with a `linear-gradient(135deg, var(--rainbow-red) ... var(--rainbow-violet))`. |
| 1.12 | `src/components/visualization/ImageUpload.vue:148-156` | Rainbow gradient hardcoded as `#f87171, #fbbf24, ... #f87171` — and a duplicate appears in `lib/colors.ts:13-16` as a `STATIC.rainbow` array | Same as 1.11. The consumer maintains *two* parallel rainbow stops definitions. |
| 1.13 | `src/components/equation/EquationView.vue:419` | `background: rgba(240, 182, 50, 0.1)` raw rgba | `color-mix(in srgb, var(--color-gold-light) 10%, transparent)`. |
| 1.14 | `src/components/morph/HarmonicLevelGrid.vue:189-191`, `238-239` | Hardcoded `#60a5fa` (rgba 96, 165, 250) for the "is-bound" focus ring | Use `var(--viz-chebyshev)` — the basis-blue palette token is already in scope and was *intended* for exactly this. |
| 1.15 | `src/components/decorative/FourierMorphSvg.vue:24,30` | `strokeColor` defaults: `var(--accent-red)` (project token, fine). The DarkModeToggle hardcodes `[232, 136, 69]` (sun) and `[192, 132, 252]` (moon) at `DarkModeToggle.vue:30-31` with a comment that moon "matches VIZ_COLORS.legendre" | Resolve at runtime via `cssVarToHex('--viz-legendre')` (already done elsewhere in `lib/colors.ts`) so the dark-mode brightening flows through automatically. |
| 1.16 | `src/components/visualization/ContourPreview.vue:45` | `stroke="hsl(40 90% 55% / 0.85)"` hardcoded amber | `var(--viz-amber)` with alpha via `color-mix`. |
| 1.17 | `src/components/visualization/AnimationControls.vue:140-147` | `rgba(255,255,255,*)` literals for inset highlights / borders on `.play-btn` | Glass-ui's `--glass-highlight` is exactly this recipe. Use `var(--glass-shadow-default)` which already encodes inner highlight + drop. |
| 1.18 | `src/components/visualization/ContourSettings.vue:407-410`, `420-432` | Retry banner rolls its own `--destructive`-tinted recipes | Glass-ui exposes `<Alert variant="destructive">` (already in `ui/alert/`). Replace the manual banner. Cited gap below — but qualifies as drift because the destructive-banner pattern repeats in `EquationView.vue:241` and `VisualizationView.vue:160`. |

### Axis 2 — Utility & `@apply` hygiene

| # | Site | Drift | Canonical replacement |
|---|---|---|---|
| 2.1 | `src/styles/buttons.css:127-216` | `@layer components { .btn-icon-admin, .btn-solid, .btn-ghost, .basis-pill }` reinvent variants of `<Button>` | `.btn-solid` → `<Button variant="default">`. `.btn-ghost` → `<Button variant="outline">` (the consumer's ghost has a 2px border, not glass-ui's). `.btn-icon-admin` → `<Button variant="glass-subtle" size="icon">` once a 28px icon size lands (gap below). `.basis-pill` is a real domain primitive — keep as a project utility but document why. |
| 2.2 | `src/styles/buttons.css:9-123` | Range slider styling (`.styled-slider`) hand-rolls a flat track + invisible thumb that appears on hover, plus `input[type="range"]:not(.styled-slider)` global override | Glass-ui ships `<Slider>` with three variants (`standard`, `spectrum`, `timeline`). The consumer's "styled-slider" is morally `timeline` with a thinner thumb and a `--slider-color` knob. Either (a) migrate to `<Slider variant="timeline">` and expose `--slider-color` on the wrapper, or (b) propose a `compact` variant carrying the consumer's recipe. Both `SliderControl.vue` and `GlassTimeline.vue` use the pointer-capture pattern with `.glass-track` — glass-ui should absorb this (gap below). |
| 2.3 | `src/components/visualization/ExportModal.vue:99-202` and `gallery/GalleryCardModal.vue:191-225` | Two parallel `.modal-backdrop` / `.modal-card` Teleport modals, each with their own bouncy enter (`cubic-bezier(0.34, 1.56, 0.64, 1)`) and shared shadow recipe | `<Dialog>` + `<DialogContent variant="elevated">`. Both modals are listed in the consumer's `DESIGN.md` migration tasks already. |
| 2.4 | `src/styles/fourier-overrides.css:222-230` | `@utility text-micro`, `@utility text-admin-label` redefined | Glass-ui `typography.css:185-193` exposes both verbatim. Delete. |
| 2.5 | `src/styles/fourier-overrides.css:232-249` | `.cm-serif`, `.fira-code`, `.fourier-f` declared as plain class selectors | Glass-ui exposes all three as `@utility`s in `typography.css:241-275`. Delete the consumer copies. |
| 2.6 | `src/styles/fourier-overrides.css:253-258` | `.ease-apple`, `.ease-apple-spring` cubic-bezier wrappers | Glass-ui `tokens.css` exposes `--ease-apple` and `--ease-apple-spring` — utilities can be `transition-timing-function: var(--ease-apple)` directly, or `tw-animate-css` already provides `ease-apple` Tailwind utility (consumer imports `tw-animate-css` at `style.css:2`). Drop. |
| 2.7 | `src/styles/fourier-overrides.css:262-296` | `@keyframes fade-in`, `scale-in`, `slide-up`, `tab-slide-in` and their `.animate-*` wrappers | Glass-ui `animations.css` exposes `fade-in`, `scale-in`, `slide-up` keyframes already (`DESIGN.md:603-606`). The consumer's are byte-identical. Listed in consumer DESIGN.md migration tasks. |
| 2.8 | `src/components/equation/EquationView.vue:441-449`, `VisualizationView.vue:392-406`, `gallery/GalleryFeaturedCarousel.vue:N/A` (multiple) | Per-component re-definitions of `pop`, `slide-down`, `fade`, `panel-swap`, `share-pop`, `expand-pop`, `fs-enter`, `modal`, `toc-expand`, `filter-drawer`, `coeff-list`, `popup`, `icon-swap`, `rainbow-fade` Vue Transition class pairs | Glass-ui `transitions.css` exposes the canonical set: `fade`, `fade-slide`, `expand-fade`, `dialog-scale`, `pop`, `dropdown`, `tab-fade`, `pane-swap`, `metric-swap`, `pane-slide`, `pane-left`, `pane-right`. Most consumer transitions map to one of these (e.g. `slide-down` ≈ `expand-fade`, `panel-swap` ≈ `pane-swap`, `modal` ≈ `dialog-scale`, `pop` is identical, `icon-swap` ≈ `fade`). One genuinely new pattern is **`rainbow-fade`** for the rainbow loading bar — propose as a gap. |
| 2.9 | `src/components/visualization/ImageUpload.vue:131-163` | `.rainbow-track` / `.rainbow-bar` / `@keyframes rainbow-slide` | A loading-progress utility that fits `<Progress variant="gradient">` (just landed in tranche F per `DESIGN.md`). Consumer can paint via `--progress-fill: linear-gradient(...rainbow-stops)` once rainbow tokens are referenced. |
| 2.10 | `src/components/equation/EquationView.vue:454-465` | `.info-hovercard` portaled style at the global `<style>` level redefining `--popover` background + `--border` 1.5px ring + `--shadow-modal` | Use `<HoverCard>` + `<HoverCardContent variant="elevated">`. The consumer is mixing reka-ui's HoverCardRoot directly (line 8: `import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "reka-ui"`) instead of glass-ui's `HoverCard` wrapper. Listed in axis 4. |
| 2.11 | `src/components/equation/CoefficientsPanel.vue` and `EqCoefficientsPanel.vue` | Both files define identical `.coeff-tooltip` styles (positioned absolute, `var(--popover)` bg, `1.5px var(--border)`, `0 4px 12px rgba(0,0,0,0.12)`) | `<Tooltip>` would do the lift. Both files duplicate ~25 lines of CSS and the entire spectrum-color recipe. |
| 2.12 | `src/components/visualization/CoefficientsPanel.vue:24-27` AND `EqCoefficientsPanel.vue:24-27` AND `FrequencyGraph.vue:42-45` AND `lib/canvas-drawing/transforms.ts:3` AND `equation/lib/harmonics.ts:81` | Five copies of `spectrumColor(i, total): hsl((1 - i/(total-1)) * 300, 85%, 55%)` | Single utility — propose `spectrumColor` as a runtime export from `@mkbabb/glass-ui/tokens` (gap below). It's pure math against a 0..300° hue ramp at fixed sat/lightness. |
| 2.13 | `src/components/equation/EquationView.vue:411-420` | `:deep(.eq-coeff)` styles on portaled KaTeX HTML | Legitimate `:deep()` on rendered KaTeX output (which the consumer doesn't own). Keep — but the golden hover colour should reference a token (axis 1.10). |
| 2.14 | `src/styles/fourier-overrides.css:300-330` | `@font-face` declarations for KaTeX font families and `.katex` global tweaks | Glass-ui has no opinion on KaTeX. Keep as consumer responsibility, but raise as a gap because *every* mathematical glass-ui consumer will write the same boilerplate. |

### Axis 3 — Interactive consistency

| # | Site | Drift | Canonical replacement |
|---|---|---|---|
| 3.1 | `src/components/visualization/EditorToolsPanel.vue:65-92` (`.tool-btn`), `morph/FourierMorphDemo.vue:285-327` (`.btn-export`/`.btn-reset`), `equation/FunctionInput.vue:226-249` (`.compute-btn`), `paper/PaperView.vue:470-498` (`.overlay-btn`), `gallery/GalleryCardModal.vue:177` (`.callout-btn` inline), `morph/MorphShapePreview.vue:91-120` (`.morph-button`), `equation/ConvergencePlot.vue:94-112` and `convergence/ConvergenceTimeline.vue:94-112` (`.play-btn`), `AnimationControls.vue:130-174` (the rainbow `.play-btn`) | Eight bespoke button recipes, each with its own hover scale/transform/border-color/shadow contract | All map to `<Button>` + a CVA variant or to `.btn-pill` + a wrapper. The most distinctive — `.tool-btn` (border tints on hover with a `--tool-color` CSS variable) and the rainbow `.play-btn` — would absorb cleanly into a new `<Button variant="tool">` (gap) and `<Button variant="rainbow">` (gap). |
| 3.2 | `src/components/visualization/EditorControlsDock.vue:177-179` | `--btn-hover-color` CSS variable convention (`is-amber`, `is-sky`, `is-rose` modifiers on `DockIconButton`) | First-class API: extend `DockIconButton` with `accent?: "amber" \| "sky" \| "rose" \| "fourier" \| "chebyshev" \| "legendre"` driven by viz-* tokens. Currently the consumer "tints" by setting a custom property the dock button doesn't formally know about. Half a dozen call sites (EditorControlsDock alone uses three; CanvasControlsDock is candidate via the active-state amber dot at line 117-120). |
| 3.3 | `src/components/visualization/CanvasControlsDock.vue:111-120` | Notification dot (`view-dot`) — 6×6 absolute pip, viz-amber bg with glow, attached to a dock-icon trigger to indicate non-default state | Promote to `<DockIconButton :badge>`/`<NotificationDot>` (gap). Pattern: any toggle in a dock that has an "active overlay state" wants a tiny pip. Cited again at `gallery/GalleryAdminBanner.vue` (admin badge), `layout/AppHeader.vue:246-256` (admin badge). |
| 3.4 | `src/components/equation/FunctionInput.vue:99-109,118-122,128-132` and `BasisSelector.vue:140-148,166-174` | Bespoke inline `<input>` styling: `bg-muted/40 border-[1.5px] border-border/50 focus:border-primary/50 fira-code` recipes | Glass-ui `<Input>` + a `mono`/`fira-code` font prop, or compose via a `<NumberField>` for the numeric inputs. The consumer's `.inline-number` at `SliderControl.vue:141-162` and `BasisSelector.vue:194-215` is a lifted `<NumberField>` minus chrome. |
| 3.5 | `src/components/visualization/SliderControl.vue:166-220` and `GlassTimeline.vue:122-174` and `convergence/ConvergenceTimeline.vue:119-157` | Three independent implementations of a "pointer-capture glass track + thin thumb" slider, each ~80 lines of CSS. They differ only in track height (16/24/20px) and thumb dimensions | Lift the entire pattern as a new `<Slider variant="glass-track">` with size variants (`sm`/`md`/`lg`). Note the dock-integration injects (`dockKeepOpen`/`dockRelease`) at `SliderControl.vue:24-25` and `GlassTimeline.vue:12-13` — that pattern (slider scrubbing pins a parent dock open) is also gap-worthy. |
| 3.6 | `src/components/visualization/ExportModal.vue:163-195` | Hand-rolled `.toggle` switch | `<Switch>` exists in glass-ui (`ui/switch/`). |
| 3.7 | `src/components/visualization/CanvasControlsDock.vue:88-91`, `EditorControlsDock.vue:48-58` | Collapsed-summary slot with arbitrary content (`<Maximize2 + Pencil>` icons; or a `Wand2 + dock-badge + Save` row) | First-class glass-ui contract. Already supported via `<template #collapsed>`. No drift, listed for completeness. |
| 3.8 | `src/components/equation/FunctionInput.vue:151-163` and `BasisSelector.vue:124-131` and `gallery/GallerySearchBar.vue:108-117` | Three independent "color-keyed pill" recipes (`.basis-pill`, `.notation-active`, `.basis-pill-btn`) all using the `--pill-c` / `--pill-color` CSS variable + `color-mix(... 12%, transparent)` for fill, `... 40%` for border, `... 100%` for text | Pattern is canonical; promote to a `<ColorPill>` or extend `<Badge variant="color">`. See gap below. |

### Axis 4 — Variant orthogonality and rooting

| # | Site | Drift | Canonical replacement |
|---|---|---|---|
| 4.1 | `src/components/equation/EquationView.vue:8` | `import { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent } from "reka-ui"` — bypasses glass-ui's wrapper to render an info popover with a custom tier (line 282-300, `class="info-hovercard"` + 1.5px border + `--popover` bg) | `<HoverCard>` from glass-ui already wraps all four. The reason the author bypassed it is the global portaled style override — surface-tier glass + custom border don't compose easily on the wrapper. Symptom of a missing slot-class prop on `HoverCardContent` (e.g., `content-class`). |
| 4.2 | `src/components/visualization/AnimationControls.vue:181-196` (`.menu-popup`) | A custom popup with rounded-xl card + foreground/15 border + `var(--shadow-elevated)`, hand-positioned `bottom-full + 0.5rem`, `--z-popover` | `<Popover>` would handle position + portal + animation in one. The current pattern uses `onClickOutside` + a `relative` anchor element — exactly what `<Popover>` solves. |
| 4.3 | `src/components/equation/EqCoefficientsPanel.vue` and `visualization/CoefficientsPanel.vue` | Both use `<CollapsibleSection>` (consumer-owned wrapper around glass-ui `Collapsible`) plus their own `.coeff-row` + `.coeff-tooltip` — the tooltip styling overrides glass-ui's tooltip recipe and bypasses `<Tooltip>` because of placement constraints | Promote a `<DataRow>` or expose `<Tooltip>` with `placement="bottom-start"` + `:offset` props. |
| 4.4 | `src/components/ui/CollapsibleSection.vue:54-70` | Custom `@keyframes collapsible-open/close` and `data-state="open"` animations | Already exists as `expand-fade` Vue Transition + `--reka-collapsible-content-height` recipe in glass-ui. |
| 4.5 | `src/components/ui/SliderControl.vue:166-220`, `GlassTimeline.vue:122-174` | Components named "Slider" but built atop a raw `<div>` with role="slider", not the `<Slider>` reka-ui primitive | Architectural choice (the consumer wants the glass-track aesthetic that the existing slider variants don't provide). Patch on the glass-ui side, not the consumer leaf — see gap. |
| 4.6 | `src/components/visualization/ContourSettings.vue:204` | `<SelectTrigger class="w-full h-10 text-sm border-2 border-foreground/15 rounded-lg">` — 2px foreground/15 border on a select trigger | The consumer wants a "cartoon-bordered select." Glass-ui's select is glass-tier; a `variant="cartoon"` on `SelectTrigger` would carry the 2px border + `var(--shadow-cartoon-md)` that this consumer (and `gallery/GallerySearchBar.vue:80,95`) repeat. |
| 4.7 | `src/components/equation/EquationView.vue:454-465` (global style) and `gallery/GalleryCardModal.vue:71` and `ExportModal.vue:99` | Three different `z-[var(--z-modal)]` flexes. The hover-card from EquationView pinned to `var(--z-modal)` (it's a hover, not a dialog) | Use the proper z-tier per overlay type — `<HoverCardContent>` would set `--z-hovercard`. |

### Axis 5 — Overlay and motion vocabulary

| # | Site | Drift | Canonical replacement |
|---|---|---|---|
| 5.1 | `src/styles/buttons.css:30-31` | `transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)` — apple-spring repeated as a literal | `transition: transform var(--duration-fast) var(--ease-apple-spring)` — both tokens exist in glass-ui. |
| 5.2 | `src/components/paper/PaperView.vue:486` | `transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)` on `.overlay-btn` | `transition: transform var(--duration-fast) var(--ease-out-expo), color var(--duration-fast) var(--ease-out-expo)` — never `all`. |
| 5.3 | Project-wide (29 occurrences): `transition: all` literal | See `GallerySearchBar.vue:178` (`transition: all 0.3s cubic-bezier(0.22, 1.6, 0.36, 1)`), `gallery/GalleryCard.vue:152-156`, `paper/PaperSidebar.vue:223-225`, `morph/MorphPhaseConfig.vue` | Replace each `transition: all` with a property list + `var(--duration-*)` + `var(--ease-*)` per axis 5 of the audit prompt. |
| 5.4 | `src/components/visualization/ExportModal.vue:130-131`, `gallery/GalleryCardModal.vue:217-218`, `morph/HarmonicLevelGrid.vue` | "Bouncy modal" enter — `cubic-bezier(0.34, 1.56, 0.64, 1)` 0.3s | `--spring-bouncy` Tailwind utility / token already exists. The transitions cluster `dialog-scale` is the named glass-ui canonical — both modals should use it via `<Dialog>`. |
| 5.5 | `src/components/visualization/AnimationControls.vue:174` | `@keyframes rainbow-drift` — gradient-position drift over 2.5s | Glass-ui `animations.css` owns `gold-shimmer-slide`. A `rainbow-drift` keyframe (rainbow play button + the load bar at `ImageUpload.vue:160`) belongs in glass-ui. |
| 5.6 | `src/components/equation/ConvergencePlot.vue:390-393` and `AnimationControls.vue:213-214` | Tooltip `@keyframes tooltip-in` 0.1-0.15s scale + opacity | Glass-ui's `fade-slide` is the canonical hover-card animation. Both can drop the keyframe. |
| 5.7 | `src/components/visualization/gallery/GalleryCard.vue:201-205` | `@keyframes like-bounce` (1 → 1.3 → 1, 0.3s bouncy) | Glass-ui `pop` Vue Transition is morally identical; or expose a `<Like>` primitive (gap below). |
| 5.8 | `src/components/equation/ConvergencePlot.vue:381` and `EquationView.vue:454-465` | `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)` repeated as a literal across ~7 sites for "tooltip / popover shadow" | `var(--glass-shadow-medium)` or `var(--shadow-md)`. The `0 4px 12px rgba(0,0,0,0.12)` recipe is essentially `--shadow-md` (`0 4px 16px rgba(0,0,0,0.08)`). Pick one. |
| 5.9 | `src/styles/fourier-overrides.css:343-354` | Reduced-motion guard scopes only the consumer's `.animate-*` utilities | Once the consumer drops its custom keyframes (axis 2.7) the reduced-motion block can shrink to one `[data-state="active"][role="tabpanel"]` rule or vanish. |

### Axis 6 — Typographic and structural hierarchy

| # | Site | Drift | Canonical replacement |
|---|---|---|---|
| 6.1 | `src/components/morph/FourierMorphDemo.vue:212-219, 228-238` | `.demo-title { font-family: var(--font-serif); font-size: 2rem; }` and `.demo-subtitle { font-size: 1.125rem; }` literals | `<h1 class="text-title">` (2.058rem CM-serif) and `<p class="text-prose">` (1.125rem). Already in canon. |
| 6.2 | `src/components/paper/PaperView.vue:297-301` | `<h1 class="cm-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-[3.25rem] leading-[1.15]">` for the "An Introduction to Fourier Analysis" page header | `class="text-display-2"` (clamp 32.9–53.3px CM-serif, leading 1.1, tight tracking). The consumer's `md:text-[3.25rem]` stop is right inside that clamp. |
| 6.3 | `src/components/visualization/ImageUpload.vue:44-47`, `ContourSettings.vue:188`, `BasisSelector.vue:110`, `EqCoefficientsPanel.vue:41`, `paper/PaperSidebar.vue:54` | `<h3 class="cm-serif ... text-sm font-semibold tracking-tight">` repeated as a card-title pattern | `<CardTitle>` or extend `<CollapsibleSection title="...">` to render with `.text-subheading`. The consumer's pattern is "small caps section label" but executed with a body weight. |
| 6.4 | `src/components/morph/MorphPhaseConfig.vue:114-119` | `.config-card-title { font-family: var(--font-serif); font-size: 1.125rem; font-weight: 400; }` | `class="text-subheading"`. |
| 6.5 | `src/components/morph/HarmonicLevelGrid.vue:135-141` | Same as 6.4. | Same. |
| 6.6 | Project-wide | `font-family: "Fira Code", monospace` literal repeated 7 times: `EquationModeToggle.vue:69`, `SpeedSelect.vue:50,62`, `ConvergencePlot.vue:377`, `ConvergenceLegend.vue:88`, `ConvergenceTimeline.vue:85`, `FrequencyGraph.vue:109` (canvas), plus `lib/canvas-drawing/labels.ts:50,91` and `grid.ts:92` (canvas) | `font-family: var(--font-mono)` for CSS sites; canvas reads via `getComputedStyle`. Or use `.fira-code` utility (already a glass-ui `@utility`). |
| 6.7 | `src/components/visualization/lib/canvas-drawing/labels.ts:50,91` and `grid.ts:92` | Hardcoded `'Computer Modern Serif', Georgia, serif` font stack inside Canvas 2D `ctx.font` strings | Read from `getComputedStyle(canvas).getPropertyValue('--font-serif')` once at draw start, or expose a `tokenFonts` constant from `@mkbabb/glass-ui/tokens` (the runtime tokens module). Listed as gap. |
| 6.8 | `src/components/equation/FunctionInput.vue:96`, `BasisSelector.vue:138-149` | `<label class="text-sm font-medium text-muted-foreground">` repeated dozens of times | A `<FieldLabel>` would dedupe; or `class="section-label"` (already a glass-ui utility — `.section-label` mono-cased label, `DESIGN.md:368`). Some of these use `cm-serif` rather than mono — different intent. |
| 6.9 | `src/components/paper/PaperSidebar.vue:171-178` | `.sidebar-label { @apply text-sm; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: ... }` | `class="section-label"` is the glass-ui canonical mono-uppercase label. The consumer's is CM-serif uppercase with caps tracking — close enough that a `section-label-serif` variant would absorb. |

### Axis 7 — Accessibility resilience

| # | Site | Drift | Canonical replacement |
|---|---|---|---|
| 7.1 | `src/components/visualization/AnimationControls.vue:140-148` | `.play-btn` rolls a glass surface (rgba white border, backdrop-filter blur+sat, manual inset highlight) | Use `<button class="glass-btn glass-medium">` + the rainbow gradient as a `::before` overlay. Currently no `prefers-reduced-transparency` fallback, no `@supports not (backdrop-filter)` fallback. |
| 7.2 | `src/components/visualization/GlassTimeline.vue:128-130`, `convergence/ConvergenceTimeline.vue:122-127` | `backdrop-filter: blur(12px)` raw on the timeline track | `var(--glass-blur-subtle)`. No reduced-transparency fallback. |
| 7.3 | `src/components/visualization/ExportModal.vue:107-109` and `gallery/GalleryCardModal.vue:71` | `backdrop-filter: blur(8px)` modal backdrop literal | Glass-ui `<Dialog>` handles fallback. |
| 7.4 | `src/components/visualization/EquationPanel.vue` (uses `glass-subtle` correctly) | One of the only consumer surfaces that does it right. No drift — listed for contrast. |

---

## 2. Glass-ui gaps surfaced by fourier-analysis/web

Each gap cites ≥3 call sites or qualifies as a primitive.

### G1 — Math typography surfaces (KaTeX integration)

The consumer wires KaTeX entirely on its own:

- `src/components/equation/EquationResult.vue:13-23,48-82` — `<EquationResult>` renders display KaTeX with horizontal scroll, custom `font-size: 1.4em → 1.8em` responsive scale, copy button.
- `src/components/equation/ConvergencePlot.vue:243-245` — `renderKatexInline` helper.
- `src/components/equation/composables/useCoeffHover.ts:91` — `katex.renderToString(lines.join(" \\\\ "), ...)` for cursor-following equation popovers.
- `src/components/visualization/EquationPanel.vue:23-34, 116-122` — display-mode render + scoped overrides.
- `src/components/paper/PaperView.vue:30-37` (via `useKatex` from `@mkbabb/latex-paper`) — paper-wide macro registry.
- `src/styles/fourier-overrides.css:300-330` — boilerplate `@font-face` for the 12 KaTeX font families + `.katex-display` overrides.

Glass-ui has no math story. Consumer-owned today, but the *boundary tokens* are universal:

**Proposal:** add `glass-ui/src/styles/math.css` (opt-in via `@import "@mkbabb/glass-ui/styles/math"`) exposing:

- `--type-math-inline` (default `1em`), `--type-math-display` (clamp 1.1em → 1.8em — match the consumer's responsive ladder), `--type-math-popover` (1em).
- `.math-display { overflow-x: auto; padding: 0.75rem 0; margin: 1rem 0; }` rule and a paired `.math-display .katex { font-size: var(--type-math-display); }`.
- `.math-inline-pill` — chip-shaped inline math container; absorbs the `useCoeffHover` popover pattern + the `coeff-popover` of `EquationView.vue:390-419`.
- A `<MathSurface>` Vue wrapper (`ui/math-surface/`) with `mode="inline" | "display" | "popover"` slots that can be a host for KaTeX HTML or any pre-rendered TeX.

This is a tier surface (math is a first-class typographic body in this consumer) rather than a component, so primary placement is in `styles/`. The `<MathSurface>` wrapper is a small ergonomic shell.

Cited in: 7+ sites listed above. Latex-paper already exposes `useKatex` — glass-ui's role is *the surface*, not the renderer.

### G2 — Spectrum / gradient color utilities

`spectrumColor(i, total)` defined identically in five places (axis 2.12). The function is a hue ramp `0..300°` at fixed sat/lightness; it encodes "Fourier basis as visible spectrum" — exactly the colorful-flourish, mathematical-heavy axis the tranche calls out.

**Proposal:** add to `@mkbabb/glass-ui/tokens` (the runtime export module already exists for chart constants):

```ts
export function spectrumColor(i: number, total: number, alpha = 1): string;
export const VIZ_BASIS_COLORS: { fourier: string; chebyshev: string; legendre: string; amber: string; green: string };
```

The first absorbs five consumer copies. The second answers a CSS-resolution problem the consumer solved with `lib/colors.ts:resolveVizColors()` + a `MutationObserver` on `<html class>` (`App.vue:11-16`). Glass-ui's runtime tokens module should expose hex constants resolved at *build* time so canvas consumers don't need the runtime computeStyle dance — this exists already for `chartColors` (`DESIGN.md:817-826`); extend with `vizColors`.

Cited in: 5 spectrumColor copies + the runtime resolution dance in `App.vue:8-17`, `lib/colors.ts:90-96`, `BasisCanvas.vue` (referenced by `lib/canvas-drawing`).

### G3 — Pointer-capture glass-track slider

Three independent implementations of the same pattern:

- `src/components/ui/SliderControl.vue:80-220` — labelled glass-track with optional dock-keep-open injection.
- `src/components/visualization/GlassTimeline.vue:55-176` — caret-on-hover variant.
- `src/components/equation/convergence/ConvergenceTimeline.vue:42-167` — narrower variant.

All share: 16-24px tall track, `color-mix(in srgb, var(--foreground) 5%, transparent)` rest bg, `--track-color`/`--slider-color` accent, hover-only thin thumb (4-6px wide rod), pointer-capture, optional inject of `dockKeepOpen`/`dockRelease`.

**Proposal:** `<Slider variant="glass-track">` size `sm | md | lg` with a `--slider-accent` token. Or a new `<GlassTrack>` primitive next to `dock/`. The dock-injection convention should become an explicit prop `:keep-dock-open` on Slider that resolves the inject at the slider end. Glass-ui already exposes the `dockKeepOpen`/`dockRelease` injection contract via its dock components — both halves should round-trip.

Cited in: three sites above plus `EditorControlsDock.vue:106-111` (range input inside a dock popover, axis 2.2 noted) and `EditorToolsPanel.vue:48-55` (range input inside a tool button card).

### G4 — Color-keyed pill (`--pill-c` / basis-pill family)

Identical recipe at:

- `src/components/equation/NotationPills.vue:14-43` (`.notation-active` + `--pill-color`).
- `src/components/visualization/BasisSelector.vue:122-275` (`.basis-pill` + `--pill-color`).
- `src/components/visualization/gallery/GallerySearchBar.vue:107-202` (`.basis-pill-btn` + `--pill-c`).
- `src/components/visualization/gallery/GalleryCard.vue:84-92` (display-only `basis-pill`).
- `src/components/visualization/gallery/GalleryCardModal.vue:131-141`.
- `src/styles/buttons.css:211-216` (cursor-side `.basis-pill` with `--pill-c`).

Recipe: `bg: color-mix(... pill-c 12%, transparent); border: 2px solid color-mix(... pill-c 30-40%, transparent); color: var(--pill-c)`. Active state amplifies; hover lifts border opacity.

**Proposal:** new `<ColorPill>` (or `Badge variant="color"`) primitive in `ui/color-pill/`:

```vue
<ColorPill :color="var(--viz-fourier)" :active>fourier</ColorPill>
```

Token: `--color-pill-fill-alpha: 12%`, `--color-pill-border-alpha: 30%`, `--color-pill-active-fill-alpha: 18%`. The 30/12 split is glass-ui-typical and worth pinning.

Cited in: six sites above. This is the dominant pattern in fourier-analysis for representing "basis" / "tier" / "notation mode" — a *categorical* color encoding that's missing from glass-ui's badge/toggle vocabulary.

### G5 — Cartoon select / cartoon input shape

Multiple sites override `<SelectTrigger>` / inputs with a 2px foreground/15 cartoon border:

- `src/components/visualization/ContourSettings.vue:204` — `class="w-full h-10 text-sm border-2 border-foreground/15 rounded-lg"`.
- `src/components/visualization/gallery/GallerySearchBar.vue:80,95` — same recipe at 1px / smaller.
- `src/components/equation/FunctionInput.vue:101-104,118-121,128-131` — bare `<input>` with `border-[1.5px] border-border/50` cartoon trim.
- `src/components/morph/MorphPhaseConfig.vue:163-168` — number input with same recipe.
- `src/components/morph/HarmonicLevelGrid.vue:166-180` — same.

**Proposal:** add `<Input variant="cartoon">`, `<SelectTrigger variant="cartoon">`, `<NumberField variant="cartoon">` — all sharing 1.5/2px foreground/15 border + `var(--shadow-cartoon-sm)` (already in glass-ui). Surface tier × structural variant: this is a structural variant (geometry) per `DESIGN.md:524-557`.

Cited in: five sites above; also `gallery/GalleryDraftsSection.vue` (the slug input), `gallery/UserSlugBar.vue:121` (login slug input).

### G6 — Rainbow gradient utility + rainbow-drift animation

Two deployments of "rainbow as feedback":

- `src/components/visualization/AnimationControls.vue:154` — rainbow gradient on a play button, animated by `@keyframes rainbow-drift` (background-position 0% → 100% → 0% over 2.5s while playing).
- `src/components/visualization/ImageUpload.vue:148-163` — rainbow `linear-gradient` on a 6px-tall progress bar, animated by `@keyframes rainbow-slide` 1.4s linear infinite.

Glass-ui has the rainbow palette tokens (vivid + pastel, `tokens.css:249-256`) but no rainbow utility. The colorful-flourish axis is precisely this idiom.

**Proposal:**

- `.bg-rainbow` `@utility` — `linear-gradient(135deg, var(--rainbow-red), var(--rainbow-orange), var(--rainbow-yellow), var(--rainbow-green), var(--rainbow-blue), var(--rainbow-indigo), var(--rainbow-violet))` with `background-size: 200% 200%`.
- `@keyframes rainbow-drift` (background-position drift) and `.animate-rainbow-drift` utility, `--duration-rainbow: 2.5s` token.
- `<Progress variant="rainbow">` for the loading-bar variant — extends the gradient-progress contract already in tranche F.

Cited in: two consumer sites above — and the latent demand from glass-ui's own `Aurora` component (rainbow-drifting backgrounds are a glass-ui idiom already).

### G7 — Cartoon page-frame / paper article surface

`src/components/paper/PaperView.vue:421-433`:
```css
.paper-article {
    border-radius: 0.75rem;
    border: 2px solid color-mix(in srgb, var(--foreground) 15%, transparent);
    background: var(--card);
    box-shadow: 3px 3px 0px 0px color-mix(in srgb, var(--foreground) 8%, transparent);
    padding: 1.25rem 1rem;
}
```

The same recipe shows up at `paper/PaperSidebar.vue:157-161` (the TOC card), `equation/EquationView.vue` (`cartoon-card`), and is the base of glass-ui's `--shadow-cartoon` family. The consumer is *almost* using the canon — it just inlines the `3px 3px 0` recipe instead of `var(--shadow-cartoon-sm)` and uses a different `card-radius`.

**Proposal:** `<Card variant="paper">` — paper-specific surface that composes `.cartoon-card` + the consumer's larger padding + `paper-texture`. A `<PaperSurface>` page wrapper in `custom/paper/` would absorb the `PaperView.vue` chrome (the bottom overlay, the gradient mask edges, etc.). This is the most direct route to a *paper* axis on the design language as the tranche calls out.

Cited in: three sites above plus the entire `latex-paper` consumer ecosystem. fourier-analysis/web pulls latex-paper as an explicit dep; the glass-ui paper surface and latex-paper's typography are complementary.

### G8 — Tooltip-anchored info bubble pattern

`src/components/equation/CoefficientsPanel.vue:122-138` and `EqCoefficientsPanel.vue:122-138` both inline a 25-line `.coeff-tooltip` recipe (absolute, `var(--popover)` bg, `1.5px var(--border)`, `0.5rem 0.625rem` pad, `box-shadow: 0 4px 12px rgba(0,0,0,0.12)`, displayed via `:hover` instead of focus). The same shape repeats in `gallery/GalleryAdminBanner.vue:36-60` (the stat panels), `equation/InfoCard.vue:17-39`, `paper/PaperSidebar.vue` (Tooltip with `text=getPreview`).

The pattern is: a structured key/value grid with a colored dot + label header, monospace values, muted labels. Functionally a `<DataTooltip>` or `<KVList>` primitive.

**Proposal:** a small `<DataList>` component (`ui/data-list/`) that renders the canonical `grid grid-cols-[auto_1fr]` key/value layout and is the typed body of a `<Tooltip>`/`<HoverCard>`. Extracted, the consumer's two `coeff-tooltip` definitions collapse to ~3 lines.

### G9 — Dock notification dot

`src/components/visualization/CanvasControlsDock.vue:111-120` — 6×6 absolute pip on a dock trigger. Same notion at `gallery/GalleryAdminBanner.vue:23-25` (admin banner Shield icon), `layout/AppHeader.vue:246-256` (admin badge, 1.75rem rounded-pill), `visualization/CanvasControlsDock.vue:88-91` (collapsed-summary opacity-40 cue).

**Proposal:** `<NotificationDot>` (or `<DockIconButton :badge>`) primitive. `--notification-dot-size: 6px`, `--notification-dot-glow-blur: 4px`, `--notification-dot-color: var(--viz-amber)` defaults.

Cited in: four sites above.

### G10 — Like / heart action

`src/components/visualization/gallery/GalleryCard.vue:103-110, 195-208`, `GalleryCardModal.vue:115-124`. Pattern: heart icon + count + animated bounce on activation, `var(--like)` accent.

**Proposal:** `<LikeButton :liked :count @toggle>` in `custom/like/`. The bounce keyframe absorbs into the existing `pop` Vue Transition. Two cited call sites here, plus this is a pattern that recurs across consumers (gallery, social tooling) — qualifies as a primitive other proposals consume.

### G11 — Tier badge (Crown / Bookmark)

`src/components/visualization/gallery/GalleryCard.vue:113-117`, `GalleryCardModal.vue:90-99`, `GalleryFeaturedCarousel.vue:23` (header), `GalleryAdminBanner.vue:25` (admin Shield variant). The icon-on-color pattern (`Crown` for featured, `Bookmark` for saved) bound to `--tier-featured` / `--tier-saved` is reusable.

**Proposal:** `<TierBadge :tier="featured | saved">` with default lucide icons mapped per tier, themable via the existing `--tier-*` tokens. Cited in 4 sites.

---

## 3. Union candidates

Same pattern, both vocabularies, different names. Propose canonical.

| # | Glass-ui | Consumer | Proposal |
|---|---|---|---|
| U1 | `--type-micro` (typography.css:24) | `--type-micro` (fourier-overrides.css:131) — verbatim duplicate | Drop consumer copy. |
| U2 | `--type-admin-label` + `.text-admin-label` (typography.css:25, 190-193) | `--type-admin-label` + `@utility text-admin-label` (fourier-overrides.css:130, 227-230) — verbatim | Drop consumer. |
| U3 | `--easing-accent` (tokens.css:209) | `--easing-accent` (fourier-overrides.css:106) — verbatim | Drop consumer. |
| U4 | `--section-color-{0..12}` light/dark (tokens.css:180-192, 480-490) | identical (fourier-overrides.css:79-91, 135-148) | Drop consumer. |
| U5 | `--viz-{fourier,chebyshev,legendre,amber,green}` light/dark (tokens.css:202-206, 495-499) | identical (fourier-overrides.css:99-103, 156-160) | Drop consumer. |
| U6 | `--tier-{featured,saved}`, `--like`, `--success`, `--warning`, `--info`, `--delete` (tokens.css:212-219, 501-508) | identical (fourier-overrides.css:109-115, 163-169) | Drop consumer. |
| U7 | `.cm-serif`, `.fira-code`, `.fourier-f` (typography.css:241-275) | same (fourier-overrides.css:232-249) | Drop consumer. |
| U8 | `.text-display-2` (typography.css) — clamp display, CM-serif | `<h1 class="cm-serif text-4xl ... md:text-[3.25rem] leading-[1.15]">` at PaperView.vue:297 | Use `.text-display-2`. |
| U9 | `.glass-card` / `.cartoon-card` / `<Card variant="cartoon">` | `.cartoon-card` (consumer references it directly, ~16 sites) | Already converged — consumer uses glass-ui's `cartoon-card`. No drift; listed for confidence. |
| U10 | `<Slider variant="timeline">` | `.glass-track` + manual pointer-capture (3 implementations) | Add a `glass-track` slider variant per gap G3. |
| U11 | `--color-gold` / `--color-gold-light` (tokens.css) | `#f0b632` literal (9 sites — see drift 1.10) | Replace with token reference. |
| U12 | `<Badge>` + variants (ui/badge) | `.basis-pill` / `.notation-active` / `.basis-pill-btn` (6 sites) | Add `<ColorPill>` primitive per gap G4 — consumer's pill family is a *categorical* color-encoded badge. |
| U13 | `<Dialog>` (ui/dialog) | Bespoke `<Teleport to="body">` + `.modal-backdrop` + `.modal-card` (2 components) | Migrate to `<Dialog>`, listed in the consumer's own DESIGN.md migration checklist. |
| U14 | `<Switch>` (ui/switch) | Hand-rolled `.toggle` (ExportModal.vue:163-195) | Use `<Switch>`. |
| U15 | `<Alert variant="destructive">` | Bespoke retry banner (ContourSettings.vue:399-444), error card patterns at EquationView.vue:227-232,241-244, VisualizationView.vue:159-170 | Migrate. |
| U16 | `<HoverCard>` wrapper | Direct reka-ui imports at EquationView.vue:8 | Add a slot-class prop on `HoverCardContent` and migrate. |
| U17 | `--shadow-card` (`4px 4px 0px 0px rgba(0,0,0,0.50)`) and `--shadow-cartoon-sm/md/lg` (offset rgba) | `--shadow-cartoon` (`3px 3px 0 0 color-mix(... foreground 8%)`) | Two cartoon-shadow vocabularies live in parallel. The consumer's foreground-color recipe is *better* in dark mode (the rgba black recipe stays black on dark bg). Glass-ui should adopt `color-mix(... foreground 8%)` as the default. |

---

## 4. Design-language signal toward the new axes

This is the load-bearing section for tranche G's mathematical pivot.

### Axis: **Cream** (new)

Consumer evidence:

- `src/styles/fourier-overrides.css:24-46` — full warm-cream palette: `--background: hsl(48 15% 98%)`, `--foreground: hsl(24 10% 10%)`, `--card: hsl(48 12% 99%)`, `--muted: hsl(48 8% 96.1%)`, `--border: hsl(48 8% 88%)`. Hue 48 (warm yellow-cream) for backgrounds; hue 24 (warm brown) for text.
- `:48-69` — dark mode mirrors with hue 24 / 48 swap.
- `src/App.vue:23` — `paper-texture` class on the root, applied across the whole app.
- `src/styles/ios-fixes.css:9-13` — root font scale starts at `1.125rem` (18px) on mobile and drops to 1rem on desktop — the cream surface is intended to read like a printed page.

Locally hard-coded. **Library absorption:** glass-ui already has `paper-texture` and a `paper-clean` token recipe. Tranche G should add a `cream` preset CSS file (`presets/cream.css`) under `demo/presets/` mirroring `demo/presets/neutral.css` — it's *exactly* the consumer's `:root` and `.dark` blocks. The library's default tokens evolve in `src/styles/` (per the user-memory `feedback_presets_in_consumer`) so the cream values themselves shouldn't move into `tokens.css`, but the *mechanism* — making `--background` hue/sat/lightness easy to override without disrupting `--card` and `--muted` — should be documented.

Two prospective call sites: fourier-analysis itself (`fourier-overrides.css:24-69`) plus paper consumers in latex-paper. The cream preset belongs in glass-ui's preset family.

### Axis: **Colorful flourishes** (new)

Consumer evidence — extensive, this consumer is *the* exemplar:

- `src/styles/fourier-overrides.css:79-103` — 13-step section-color palette tied to navigation; rendered as colored TOC links at `paper/PaperSidebar.vue:72`, mobile floating TOC at `MobileFloatingToc.vue:134`. Each section of the paper has an identity color.
- `src/components/equation/FrequencyGraph.vue:42-45` and four other sites — `spectrumColor(i, total)` rendering the Fourier spectrum as a 0-300° hue ramp (axis 2.12).
- `src/components/visualization/AnimationControls.vue:149-167` — rainbow play button with `rainbow-drift` keyframes, gradient stops at hue 0/35/55/140/210/275/330.
- `src/components/visualization/ImageUpload.vue:142-163` — rainbow loading bar at six color stops (red → yellow → green → blue → purple → pink → red).
- `src/components/equation/EqCoefficientsPanel.vue:24-27` — coefficients rendered as bars with spectrum-colored fills, sized by amplitude.
- `src/components/equation/ConvergencePlot.vue:194` — each Fourier harmonic curve rendered in its own spectrum color.
- `src/components/visualization/lib/canvas-drawing/transforms.ts:3` — same spectrumColor on canvas.

This is *colorful flourish in service of math*: every spectrum visualization assigns a color per term/harmonic; each section of the paper is hue-stamped; the rainbow is reserved for "playing" and "loading" feedback.

**Library absorption:**
- The `--rainbow-*` and `--rainbow-pastel-*` tokens already in glass-ui (`tokens.css:249-256`) are the foundation. Tranche G should:
  - Add `.bg-rainbow` and `.bg-rainbow-pastel` `@utility`s.
  - Add `<Progress variant="rainbow">` per gap G6.
  - Add `spectrumColor(i, total, alpha?)` to the `tokens` runtime export per gap G2 — single function, five copies retired.
  - Add `--color-equation-accent` (or alias `--color-gold-light`) for the consistent "active-coefficient" gold across nine consumer sites (drift 1.10).
- The section-color ramp is already in glass-ui — but no consumer uses it without redeclaration. The drift findings 1.2–1.6 close that loop; once they do, every section-keyed surface in fourier-analysis/web binds to glass-ui automatically.

Two prospective call sites for the spectrum/rainbow utilities: fourier-analysis's frequency graphs (5 internal call sites) + glass-ui's own demo storybook (Foundations/Colors/viz-basis category at `manifest.ts`).

### Axis: **Mathematical** (new — the heaviest axis here)

This is the consumer's defining identity. Evidence is dense:

**Formula rendering surfaces.** `EquationResult.vue:48-95` — the cartoon-card-bordered display KaTeX that scrolls horizontally and grows with viewport (1.4em → 1.8em). `EquationView.vue:247-302` — the equation card with sigma/expanded toggle, info hover-card, copy button, hover-driven coefficient popover. `EquationPanel.vue:107-122` — the floating equation panel anchored to the visualization canvas.

**Inline-math and chip-math.** `EquationModeToggle.vue:8-26` — `Σ` vs `a + b` toggle, golden-active. `NotationPills.vue:17-34` — pill that displays a math glyph (e.g. trigonometric, complex) as its icon plus a label. `BasisSelector.vue:121-133` — basis pills with a serif glyph (`F`, `T`, `P`) as the icon — the icon is *typography*, not a lucide.

**Math-as-iconography.** `decorative/FourierMorphSvg.vue:1-42` — the Fourier-decomposed SVG shape at variable harmonic level; consumed by `morph/HarmonicLevelGrid.vue:64-73` as a 12-cell preview grid where each cell is the same shape at a different `n=` truncation.

**Mathematical UI primitives.** Coefficient bars (`EqCoefficientsPanel.vue`, `CoefficientsPanel.vue`), the convergence plot (`ConvergencePlot.vue`), the frequency graph (`FrequencyGraph.vue`), the gallery card *parameter card* showing `N=15` in golden monospace (`GalleryCardModal.vue:151-153`), the harmonic-level grid morphing the same shape across 12 truncation levels (`HarmonicLevelGrid.vue`).

**Golden-ratio and golden flourish.** `--color-gold-light` ≈ `#f0b632` is reserved for "the equation" — applied to the active sigma toggle, the coefficient hover gloss, the convergence sum curve (`ConvergencePlot.vue:208-220` via `applyGoldenShimmer`). The shimmer halo at `lib/golden-shimmer.ts:18-65` is a Canvas helper that gives the resolved Fourier sum a gold glow that breathes between 0.85 and 1.0 alpha at a 200ms period.

**Math typography choices.** Computer Modern (CM-serif) for body and headings; Fira Code (mono with `liga`/`calt`) for variable names and numeric values; the entire consumer pre-sets `font-feature-settings: "liga"` (`paper/PaperView.vue:421`, `layout/AppHeader.vue:135`).

**Library absorption:**

1. **`<MathSurface>` + math.css** (gap G1) — the formula-display surface tier. Owns `.math-display`, `.math-inline-pill`, the responsive font-size ladder, the horizontal-scroll affordance, the consumer's KaTeX `@font-face` boilerplate. This is the single largest math-axis primitive; absorbs ~50 lines of CSS spread across four files.
2. **Golden shimmer canvas helper** — `lib/golden-shimmer.ts:1-67` is a clean ~70-line module that should ship from `@mkbabb/glass-ui/canvas` (a new sub-export). Glass-ui already exposes runtime tokens for canvas; the next axis is canvas *helpers*. The helper takes a `{ hovered, playing, baseWidth, hoverWidth }` config and stamps the gold-tier visual on any 2D context — directly applicable to *any* "active math curve" canvas any glass-ui consumer would draw. Three internal call sites: `ConvergencePlot.vue:210-220`, plus `BasisCanvas.vue` and `lib/canvas-drawing/labels.ts` per the comment at `golden-shimmer.ts:1-7`.
3. **Math-glyph icon contract.** `NotationPills.vue:28-31` and `BasisSelector.vue:129` both render a single serif glyph as the chip's "icon" via `<span class="cm-serif font-semibold text-[1.3em]">`. This is "typography-as-icon" — exactly the *audacious iconography* axis. Glass-ui should have a `<MathGlyph kind="series" | "transform" | ...>` or, more lightly, a `<TypographicIcon char="F" font="display | serif" weight="600">` slot-friendly primitive. Cited at the two NotationPills/BasisSelector sites + `gallery/GalleryCard.vue:90` + `GalleryCardModal.vue:138` + `GallerySearchBar.vue:115` (all five render `<span class="cm-serif font-semibold">...</span>` as a basis icon).
4. **`<HarmonicLevelGrid>` style — math-truncation preview grid.** Consumer-specific (it grows shapes from a Fourier truncation table) but the *visual contract* is reusable: a horizontally-scrollable strip of `48-64px` cells, each with a small SVG preview + a `n=N` mono label, two-tier highlighting (`is-bound` for the low/high markers, `active` for the current level). This is the "scrubbable preview row" pattern that any `<Filmstrip>` would render. Cite as a candidate for a new `custom/filmstrip/` primitive.
5. **Golden-ratio plot framing** — `EquationResult.vue:65-80` (`.eq-scroll-region :deep(.katex)` with viewport-stop `clamp` ladder) explicitly uses 1.4em → 1.8em which is φ-anchored. The math-display tokens proposed in G1 should snap to glass-ui's golden ladder (`--type-prose` 1.125rem → `--type-subheading` 1.272rem → `--type-heading` 1.618rem). The math display sizes are golden ratios already; making this explicit in math.css ties into the golden-typography canon glass-ui already publishes.

### Axis: **Modern skeuomorphic with shadowing**

Consumer evidence:

- `src/components/visualization/AnimationControls.vue:140-174` — the rainbow `.play-btn`: rgba(255,255,255,0.25) border, `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))` for the body, inset highlights on top and bottom (lines 147), a shimmery rainbow `::before`, a glass top-light `::after`. This is full glass + skeuomorphic gloss.
- `paper/PaperView.vue:421-433` — paper article with `2px solid color-mix(... foreground 15%)` border + `3px 3px 0px 0px color-mix(... foreground 8%)` cartoon shadow — printed-paper skeuomorphism.
- `gallery/GalleryCard.vue:150-177` — cartoon card with offset shadow + tier-color halo (`box-shadow: 0 0 12px color-mix(... tier-featured 30%, transparent)` for featured tier).

The skeuomorphic contract here is "card stack" + "physical paper" + "rainbow plastic button." Glass-ui already has glass-tier + cartoon-tier + paper-texture; the *colorful gloss button* is the missing piece.

**Library absorption:** `<Button variant="rainbow">` or `<Button variant="iridescent">` carrying the rainbow-drift gradient + glass top-light + inset highlight. Two prospective call sites: the AnimationControls play button + a "publish" CTA pattern that the consumer doesn't have but would obviously fit (`gallery/GalleryCardModal.vue:177` — the "Open Visualizer" CTA is essentially a desaturated version of this).

### Axis: **Bold / audacious large type**

Consumer evidence is moderate — the paper title is 3.25rem at desktop, ~`text-display-2` territory:

- `paper/PaperView.vue:297-301` — single `<h1>` at `md:text-[3.25rem]`.
- `morph/FourierMorphDemo.vue:213-219, 228-238` — title at 2rem desktop, subtitle at 1.125rem. Modest.
- `gallery/GalleryAdminBanner.vue:26` — admin section subheading at `text-sm`. Audacious typography is *not* a strong signal in fourier-analysis/web — this is an academic consumer.

**Library absorption:** the existing `.text-display-{1..5}` ladder covers all consumer sites. Drift 6.2 closes the only ad-hoc usage. No new tokens needed for this axis from this consumer alone — *audacity* is more visible in other consumers.

### Axis: **Large / audacious iconography**

Consumer evidence:

- `decorative/FourierMorphSvg.vue` — the morphing-Fourier sun-moon dark mode toggle is *the* example of iconography-as-mathematical-act in this codebase. The icon literally renders by Fourier-truncating an SVG path.
- `morph/MorphShapePreview.vue:91-110` — 120-180px square button containing the morph icon.
- `decorative/SvgFilters.vue:57-178` — `feTurbulence` + `feDisplacementMap` filters that wobble the title heading and the celestial toggle at ~6fps for a hand-drawn boil effect.
- `BasisSelector.vue:217-230` — basis icons rendered at 1.5em-2.2em (Fourier `F` glyph at 2.2em with negative margin shrinking it back into the chip). This is *typography-as-icon* at deliberate scale.
- `paper/PaperView.vue:300` — `<span class="fourier-f">ℱ</span>ourier analysis` — literal mathematical symbol-as-letter at 1.35em scale (per `fourier-f` utility at `fourier-overrides.css:243-249`, also in glass-ui at `typography.css:253-275`).
- `gallery/GalleryCardModal.vue:180` — the "Open Visualizer" CTA leads with `<span class="fourier-f">ℱ</span>` at body-size, again as iconography.

**Library absorption:** glass-ui already has the `fourier-f` utility (typography.css:253-275). What's missing:

1. **A `<TypographicIcon>` (or `<MathGlyph>`) primitive** carrying glyph + font + scale + axes. Cited 5+ times above as a typography-as-icon pattern.
2. **A pencil-boil filter token contract** — the consumer uses `@mkbabb/pencil-boil` directly (`SvgFilters.vue:2`) but the SVG `<defs>` for `title-boil`, `wobble-celestial`, `paper-grain`, `canvas-grain` is hand-rolled. Glass-ui could expose `<SvgFilters>` (similar to existing `<SvgFilters>` in the consumer) shipping a canonical set: `paper-grain`, `pencil-wobble`, `canvas-grain`. The boil-frame timing convention (~6fps via `useLineBoil`) is consumer-specific but the filter primitives are not.

For audacious iconography in the *strong* sense (very large, deliberate iconography filling space), the consumer evidence is in the *morph* page (180-px morph button) and the dark-mode toggle — these are both `--toggle-size: 5rem` (80px) at desktop, which is dock-control + glass-pill territory. Glass-ui's `DockIconButton` at `--size-icon-btn: 2.5rem` is half this; an `<IconButton size="hero">` at `5rem` (matching consumer `--toggle-size`) would close the gap.

---

## 5. Risk register

Patterns that should remain consumer-side rather than enter glass-ui.

| # | Pattern | Reason |
|---|---|---|
| R1 | `.basis-pill` with the specific `cm-serif`-glyph icon convention | Domain-specific to harmonic decomposition. The general `<ColorPill>` (gap G4) absorbs the recipe; the *glyph mapping* (`F` for Fourier, `T` for Chebyshev, `P` for Legendre) is consumer registry. |
| R2 | `--section-fourier-series`, `--section-complex-fourier`, `--section-fft`, ... section-named tokens | Consumer DESIGN.md mentions "13 per-section semantic colors" but the implementation uses *positional* `--section-color-{0..12}` indexed by `si` (section index) — that's already in glass-ui. The named aliases are a *consumer mapping*; never push them into glass-ui. |
| R3 | KaTeX `@font-face` boilerplate (`fourier-overrides.css:300-311`) | The 12-family declaration is KaTeX-specific, not glass-ui's responsibility. *But* a `.katex-display` overflow rule belongs in math.css (gap G1). |
| R4 | `lib/golden-shimmer.ts` driving Fourier-sum curves | The function generalizes (any "active path on canvas wants a gold glow") so it's a candidate for `@mkbabb/glass-ui/canvas`. The *binding* "Fourier sum gets the gold" is consumer choice. Library exports the helper, not the policy. |
| R5 | `useFourierMorph` and the morph page in general | The Fourier-truncation morph that powers the dark-mode toggle is bespoke to this consumer; no library role. |
| R6 | `paperContent.ts`, `paperTree.ts`, the entire latex-paper integration | Consumer of `@mkbabb/latex-paper`; that library is the right home for math typography-on-prose patterns, not glass-ui. |
| R7 | `lib/colors.ts:resolveVizColors` + the `MutationObserver` on `<html>` class for dark-mode token resolution | Consumer pattern. `useDarkModeSync` (per `DESIGN.md:786`) already exists in glass-ui — the consumer should switch to it (drift candidate, not gap). The *specific viz-color resolution* is domain. |
| R8 | The `--shadow-modal: 4px 4px 0 + 0 24px 64px` compound recipe | Genuinely the consumer's compositional choice — keep. Each consumer's modal shadow is editorial. |
| R9 | Equation tier metadata (`TIER_INFO.spline`, `TIER_INFO.fourier`...) and `energyColor(energy)` recipe | Domain-specific to the equation evaluator's tier hierarchy. Library agnostic. |
| R10 | The 13-step section palette assigning colors to specific paper sections | Consumer mapping. Library exposes the 13 hues; consumer chooses which section gets which index. |

---

## 6. One-line tally

Drift: **49** findings (axis 1: 18, axis 2: 14, axis 3: 8, axis 4: 7, axis 5: 9, axis 6: 9, axis 7: 4 — overlapping where one row covers multiple axes); Gaps: **11** (G1–G11); Union: **17** (U1–U17); Design-signal: **6 axes** with concrete primitives proposed; Risk: **10** (R1–R10).
