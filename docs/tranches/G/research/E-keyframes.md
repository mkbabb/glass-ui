# Tranche G — Research lane E: keyframes.js

Scope: `/Users/mkbabb/Programming/keyframes.js/`. Read-only. Glass-ui rev: post-`badc536` (v0.5.0). Consumer is the motion-engine reference: `@mkbabb/keyframes.js` (the lib itself + Vue demo apps cube/easing/playground/simple/square/amiga that compose `EditorShell` over `AnimationGroup`/`Animation`/`SmoothProgress`/`Timeline`). The demo pulls glass-ui directly for `Card`, `Slider`, `Button`, `GlassDock`, `DockLayer*`, `DockIconButton`, `DockSelectTrigger`, `DockDropdownTrigger`, `Tabs`, `Select`, `Dialog`, `IconTooltip`, `DarkModeToggle`, `useTouchGate`, `useKeyboardShortcuts`, plus the kbd/glass-card/status-dot/scroll-fade utility classes.

The slot is unique because keyframes.js is glass-ui's own motion engine: `useAnimatedNumber` already wraps `SmoothProgress`. The consumer therefore evidences (a) how a curve/timeline UI dresses itself in glass-ui surfaces and (b) which tokens glass-ui's own canon should expose to make that dressing first-class.

---

## 1. Drift findings

### Axis 1 — Token alignment

| # | Site | Drift | Replacement |
|---|------|-------|-------------|
| 1 | `demo/@/styles/style.css:7` | `--font-serif: "Instrument Serif"` overridden inside `@theme {}` — a Tailwind v4 footgun the canon explicitly warns about (DESIGN.md §Typography). The `:root` block below already overrides `--ppmycota-primary`/`--axis-*` correctly; only this stray sits in `@theme`. | Move `--font-serif` override to `:root {}` block (still in same file, rows 14-48). |
| 2 | `demo/@/styles/style.css:39-40,52-53` | `--color-progress`/`--color-slider-track` are app-level brand tokens. Naming matches glass-ui style but they shadow the slider's `--slider-thumb-bg` / `--slider-track-bg` indirectly. No drift; legit consumer preset. | Keep — but glass-ui should ship a `--viz-progress` semantic alias for consumers that want a global "progress accent" and hand it through to `--slider-thumb-bg` by default (see Gap 2.1). |
| 3 | `demo/@/styles/utils.css:7-17` | `.tab-trigger-base` reproduces `.glass-ui-tab` semantics (inactive muted, active foreground+600, hover lift) using its own `transition: all` + `var(--duration-fast)` recipe. | Promote to `<TabsTrigger variant="pill" \| "underline">` on glass-ui `Tabs`, or expose `.tab-trigger-{pill,underline}` utility — see Gap 2.7. |
| 4 | `demo/@/styles/utils.css:48-81` | `.btn-playback` + `.btn-playback-accent` reinvents Button four-state contract: `:focus-visible` → `var(--focus-ring-shadow)`, `:active` → `transform: scale(var(--scale-press))`, `:disabled` → `opacity: 0.5; pointer-events: none`. All four already live on `Button` + `.btn-pill`. | Replace with `<Button variant="accent" size="sm" class="btn-pill">` or library `transport` variant (see Gap 2.4). The accent path bakes `--accent-red` into `bg`/`color`/`border` via three `color-mix` recipes — that's a `transport` semantic, not a new variant. |
| 5 | `demo/@/styles/utils.css:135-138` | `[data-state="active"][role="tabpanel"] { animation: enter ... }` redefines `tab-fade` with `--tw-enter-*` tw-animate-css overrides. `transitions.css:90-98` already exposes `tab-fade`. | Delete; rely on `<Transition name="tab-fade">` wrapping `TabsContent` (or extend tw-animate-css preset upstream — also acceptable). |
| 6 | `demo/easing/EasingTarget.vue:344,360-407` | Hardcoded `var(--color-progress) N%` glow recipes for ball/track. Repeats the canonical `color-mix(in srgb, var(--FG) N%, transparent)` pattern verbatim with a project token. Not drift — but the *pattern* is reinvented in 6 places (track-line, marker-start, marker-end, ball glow, active glow, muted bg). | Surface a `.viz-track` + `.viz-marker` set or token `--viz-glow-*-mix` per Gap 2.2. |
| 7 | `demo/@/components/custom/EasingCurveCanvas.vue:296` | `stroke: var(--ppmycota-primary, var(--foreground))` for the bezier curve path, repeats at line 328. Brand-color override is fine; the *fallback* leaves canvas color hardcoded to `--foreground`. | Glass-ui exposes `--easing-accent: hsl(248 88% 71%)` in `tokens.css:209` already. Switch fallback to `var(--easing-accent, var(--foreground))` and document the token in DESIGN.md (currently undocumented). |
| 8 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:215-229` | `CSSKeyframesAnimation.fromString(/*css*/'@keyframes twist {…}')` hand-rolls a `rotateY(0/-180/-360)` flip with `easeOutCubic` for the reset icon, and a 5-stop translate-rotate for trash. Both run via the engine, not via library tokens — `--duration-fast` / `--spring-bouncy` would have done it via a `<Transition>`. | Either expose a library "icon-feedback" composable (Gap 2.6) or refactor to `import { CSSKeyframesAnimation } from "@mkbabb/keyframes.js"` + token-bound durations (`{ duration: 200, timingFunction: "ease-spring-bouncy" }`). The consumer is the *engine*; doing this ad-hoc here is fine but the *token coupling* is missing. |
| 9 | `demo/cube/CubeTarget.vue:139-146` | `@keyframes idle-bob { 0% transform: translateY(0); 100% translateY(5px); }`, applied 3s `var(--ease-standard) infinite alternate`. Generic "breathe" animation duplicating `weight-breathe` axis (vertical translate vs wght). | Add `@keyframes idle-bob` (or generalize as `breathe-y`/`hover-bob`) to `animations.css` with `--motion-bob-distance` token. Two demos animate idle hover this way (this one + `EditorStartScreen.vue` chevron). |
| 10 | `demo/app/App.vue:393-410` | `.scene-enter-active` hand-rolls a `pane-swap`-shaped transition with `var(--ease-spring)` + `--duration-slow` enter / `--duration-normal` exit + `scale(0.97)→scale(1.02)` accent. Close to `.pane-swap` (`transitions.css:101`) but with scale instead of translate-X. | Keep as consumer preset, but glass-ui should ship a `pane-swap-scale` variant (Gap 2.8) since this exact shape appears in cube↔easing↔playground scene transitions. |
| 11 | `demo/@/components/custom/orbital-drag/OrbitalDrag.vue:58` | `transform: translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) ...` — string-built per render. | No glass-ui replacement; this is correct OrbitalDrag behavior. Listed only to flag that `preserve-3d` (`utilities.css:90`) is the only 3D primitive lib offers — a `--axis-{x,y,z}` token group on the lib side is a worthwhile Tranche-G addition (Gap 2.5). |
| 12 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:255-264` | Conic-gradient progress dot driven by `--dot-p` CSS var (`background: conic-gradient(var(--color-progress) var(--deg), color-mix(...))` + radial glow via `box-shadow`). Beautiful, consumer-novel pattern. | Glass-ui has `<StatusDot variant="active|paused|idle|error|custom" pulse>` (`StatusDot.vue:1-85`) — but no progress-dot variant. Promote (Gap 2.3). |

### Axis 2 — Utility & `@apply` hygiene

| # | Site | Drift | Replacement |
|---|------|-------|-------------|
| 13 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:36-46` | Zoom mini-bar built from `relative flex-1 h-1.5 rounded-full bg-muted/50 border border-border/30` + an absolute `bg-primary/40` indicator. Reinvents `.progress-rail` shape — i.e. `<Progress variant="default">` with explicit width inline. | Use `<Progress variant="gradient" :model-value="(panOffset/100)*100" :style="{...}">` (DESIGN.md §Progress, Tranche-G API). Three sites do this rail-style mini-bar (this, the easing duration slider visuals, and the keyframe percent caret). |
| 14 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:51-63` | `class="timeline-track relative rounded-lg border border-border bg-muted/50 hover:bg-muted/70 transition-all duration-fast cursor-pointer select-none overflow-x-clip overflow-y-visible touch-none"` — utility soup for a track surface. | The Slider variant `timeline` (DESIGN.md §Variant Taxonomy / Slider variants) provides the surface; consumer needs a *non-thumb track* surface utility. Propose `.viz-track` (Gap 2.2). |
| 15 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:236` | `const RIBBON_BUTTON_CLASS = "h-8 gap-1.5 instrument-serif text-base rounded-full btn-interactive"` constructed once and applied to four ribbon Buttons. | This is `<Button variant="ghost" size="sm" class="btn-pill">` minus the `instrument-serif` font — once `--font-display`/`--font-serif` is set per consumer there's no reason to compose this manually. Drop class into a one-line `RibbonButton` shim instead, or accept here. Not promotable — `instrument-serif` is consumer-specific. |
| 16 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:171-182` | Hidden inline `<svg>` with `<linearGradient id="rainbow-gradient">` referencing `--rainbow-{red,orange,yellow,green,blue,violet}` — used as `stroke: url(#rainbow-gradient)` on `<Paintbrush>` icon. Pattern useful enough to factor. | Promote: glass-ui exposes the rainbow tokens already; ship a `<RainbowGradientDef />` component or a `.rainbow-stroke` utility consuming `var(--rainbow-*)`. Two demos use rainbow strokes for action icons (here + cube's "Apply CSS" Sparkles); see Gap 2.9. |
| 17 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:188-199` | Toaster classes manually composed: `'bg-foreground text-background rounded-xl instrument-serif px-4 py-3 grid grid-cols-1 gap-1 shadow-lg lg:w-80 w-64 max-w-[90vw]'`. | Glass-ui `Toast` + `.glass-elevated` would render this; the `bg-foreground text-background` inversion is the only twist — promote as `<Toast variant="inverse">` (Gap 2.10). |
| 18 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:88-101` | Diamond marker built as `'rotate-45 rounded-sm cursor-grab border-2 transition-all'` + size-state classes. The `rotate-45` rounded-sm idiom is *the* keyframe-marker visual language. | Glass-ui has no `KeyframeMarker` primitive. Promote — the marker, plus `<TimelineCaret>` and the playhead, form a `<KeyframeTimeline>` family (Gap 2.11). Three sites in this consumer alone (marker, expanded marker, the percent caret). |
| 19 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:144-153` | Custom `transition-[max-height,opacity] duration-slow ease-standard` on the bottom timeline collapse drawer. | Already `pane-slide` (`transitions.css:593` row in DESIGN.md). Either swap to `<Transition name="pane-slide">` or accept as inline shorthand. |

### Axis 3 — Interactive consistency

| # | Site | Drift | Replacement |
|---|------|-------|-------------|
| 20 | `demo/easing/EasingTarget.vue:280-313` | Custom pointer-capture drag with rubber-band + EMA smoothing on the singular ball. State machine is identical to `useDragCapture` (consumer composable). Ball uses `transform: translateX(${px}px)` directly. | Keep ball logic — but `var(--scale-press)` could plausibly be applied on grab. Currently no press feedback, only `cursor-grabbing`. Add `:active` hook. |
| 21 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:99-101` | Marker hover: `'border-foreground/50 hover:border-primary hover:scale-105'`, selected `'bg-primary border-primary scale-125'`. Active scale `1.25` is double `--scale-hover` (1.08). | Document a `--scale-hover-marker: 1.25` family token, OR keep as ad-hoc — but `1.05` for hover should be `var(--scale-hover, 1.08)` for consistency. |
| 22 | `demo/@/components/custom/animation-controls/timeline/TimelineCaret.vue:20` | Edit-input uses `focus:ring-1 focus:ring-primary` instead of `var(--focus-ring-shadow)`. | Wrap in `.focus-ring` utility (`utilities.css:27`) or use `<Input>` directly with `class="font-mono text-2xs h-5 w-10"`. |
| 23 | `demo/@/components/custom/EditableLabel.vue:11` | `'border-b border-primary outline-none'` rename input — no focus ring. | Same: route through `<Input>` + `--focus-ring-shadow`. |

### Axis 4 — Variant orthogonality and rooting

| # | Site | Drift | Replacement |
|---|------|-------|-------------|
| 24 | `demo/@/components/custom/animation-controls/controls/PlaybackRibbon.vue:148-157` | `.timeline-green` wrapper sets `--slider-track-bg` / `--slider-range-bg` / `--slider-thumb-bg` to compose a green slider. This is *exactly* the documented restyling path (DESIGN.md §Slider variants — "Restyle on a wrapper, never via :deep()"). Zero `:deep()` in the entire keyframes.js demo tree. | No drift. Reference implementation. |
| 25 | `demo/@/components/custom/animation-controls/controls/AnimationControls.vue:226-236` | Tabs overflow mask classes `.tabs-overflow-{right,left,both}` reinvent the `.scroll-fade-{x,both}` utilities (`utilities.css:103-121`). | Replace with `useScrollFade({ classPrefix: "scroll-fade", axis: "x" })` (already does this!) but the ad-hoc classes here use `--tabs-mask-fade: 2.5rem` because the canon `--mask-fade-width: 1rem` is too narrow for tab labels. Surface `--mask-fade-width-wide` or accept consumer override. |
| 26 | `demo/@/components/custom/dock/TopDock.vue:111` | `style="top: calc(var(--work-area-top-offset, 0px) + var(--dock-margin) / 4);"` — reaches into glass-ui's `--dock-margin` (correct token) for inline positioning. | Fine; `--dock-margin` is canon. |
| 27 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:1-9` | Fixed-bottom dock wrapper doesn't use `position="fixed"` prop; instead wraps `<GlassDock>` in `<div class="fixed left-0 right-0 z-dock">`. `:always-expanded="true"` is set, no rationale loss. | `<GlassDock position="fixed" always-expanded>` would consolidate. The wrapper currently inserts `pb-[max(calc(var(--dock-margin)/2),env(safe-area-inset-bottom))]` for iOS — that's a real gap (Gap 2.12). |

### Axis 5 — Overlay and motion vocabulary

| # | Site | Drift | Replacement |
|---|------|-------|-------------|
| 28 | `demo/app/App.vue:21,46`, `demo/cube/App.vue:22,70` | Manually-written `class="z-modal min-w-[17rem] instrument-serif text-base p-1.5"` on `<DropdownMenuContent>` / `<HoverCardContent>`. The `z-modal` is wrong for popovers (canon: `--z-popover`/70 or `--z-hovercard`/60). Modal z is for dialogs. | Drop the `z-modal` class entirely — `DropdownMenuContent` already lands at `--z-popover` (`tokens.css:103`). Same for `HoverCardContent` → `--z-hovercard`. Three sites. |
| 29 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:437-440` | Custom `kf-editor-enter-active` / `-leave-active` Vue Transition: `opacity + transform translateY(±4-8px)` over `--duration-fast` / `--duration-instant`. | Same shape as `fade-slide` (`transitions.css:14-31`). Replace with `<Transition name="fade-slide">`. |
| 30 | `demo/@/components/custom/header-ribbon/HeaderRibbon.vue:122-152` | Custom max-width/opacity collapse on hover — bespoke shape that doesn't map to any reusable transition class. | Promotable as `<RevealOnHover>` composable or `.collapse-x` utility (Gap 2.13). Two sites: HeaderRibbon + DockLayer-collapsed in `TopDock.vue`. |
| 31 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:493-506` | Desktop pane reveal uses `transform: translateX(-110%) rotate(-2deg)` over `--duration-slow var(--spring-snappy)` for enter, `--duration-fast var(--ease-in)` for leave. Exact match for `pane-left` (DESIGN.md §Motion). | Replace with `<Transition name="pane-left">` + grid-row collapse separately. |
| 32 | `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:454-470` | Mobile pane open/close uses `grid-template-rows: 1fr ↔ 0fr` over `--duration-panel`. | Canon — `expand-fade` covers this; here it's a grid-row variant. Acceptable inline. |
| 33 | `demo/@/components/custom/EasingCurveCanvas.vue:329-331` | `.traveling-dot { transition: none; }` — explicitly disables transitions. | Documenting deliberate intent (the dot is per-frame rAF-driven). Fine. Worth noting that the lib has no canonical "no-transition" utility for explicit per-frame consumers; `--duration-instant` (0.1s) isn't 0. Surface `.no-transition` utility from `utilities.css:333-338` for general use. |

### Axis 6 — Typographic and structural hierarchy

| # | Site | Drift | Replacement |
|---|------|-------|-------------|
| 34 | `demo/@/styles/style.css:84-87` | `.instrument-serif { font-family: var(--font-serif); letter-spacing: 0.02em; }` is applied 50+ times across the consumer (53 occurrences). | This is a complete consumer-side override of `--font-display`/`--font-serif`. Glass-ui's `text-display` / `text-title` / `text-heading` semantic classes already exist and would scale automatically. The use is a brand identity, not drift — but `letter-spacing: 0.02em` is reinventing `--tracking-snug: -0.01em` neighborhood; consider `--tracking-prose: 0.02em` consumer token. |
| 35 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:105,150` | `<span class="font-mono text-xs font-semibold">` for percent labels. | Should be `<span class="text-mono-small">` (`typography.css:225-229`) or `.text-mono-caption`. The `font-semibold` divergence is a real gap — `text-mono-{caption,small,micro}` lock weight via the family. |
| 36 | `demo/@/components/custom/animation-controls/timeline/TimelineCaret.vue:9,19` | `font-mono text-2xs` (`text-2xs` is custom — 10px). | Glass-ui ships `--type-admin-label: 0.625rem` (10px) + `.text-admin-label` utility. Use that instead of bespoke `text-2xs`. Three sites: caret label, caret input, AssetPropertiesPanel labels. |
| 37 | `demo/@/components/custom/asset-manager/AssetPropertiesPanel.vue:7,15,23,32,40,49` | Eight `<label class="font-mono text-2xs text-muted-foreground">` instances for axis-form labels. | Replace with `.text-admin-label` (canonical) or `.section-label` (`typography.css:286-292`). |
| 38 | `demo/@/components/custom/animation-controls/controls/AnimationControlsControls.vue:13,21,33,49,61,69` | `label-class="font-mono text-base text-muted-foreground"` repeated for every `LabeledInput`/`LabeledSelect`. `text-base` is body-size mono, not an existing semantic class. | Document `.text-mono-body` (mono at `--type-body`, no caps). Otherwise this becomes a project-side `--label-class` token. |
| 39 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:33,43,116,122` | `class="instrument-serif text-lg"` / `text-xl` in dock-internal labels. | `text-lg` / `text-xl` are Tailwind raw sizes; canon expects `text-subheading` / `text-heading`. Style guide is a sliding scale here — `instrument-serif text-lg` is a deliberate display voice in dock contexts. Promote a dock-display utility (Gap 2.7 sibling) or accept as consumer signature. |

### Axis 7 — Accessibility resilience

| # | Site | Drift | Replacement |
|---|------|-------|-------------|
| 40 | `demo/@/components/custom/EasingCurveCanvas.vue:264-340` | SVG curve canvas: no `aria-label` on `<svg>` despite being interactive (pointer-down/move/up). | Add `aria-label="Easing curve editor"` + `role="application"`. Not a glass-ui concern but worth flagging for mathematical-axis components. |
| 41 | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:255-264` | `.status-dot[style*="--dot-p"]` driven via inline style — no `prefers-reduced-motion` fallback for the conic gradient hue rotation. The shadow/glow do animate (`box-shadow`, `background`). | The dot's style is reactive (`--dot-p` updates per-frame), not animated — no `prefers-reduced-motion` violation. But the conic-gradient *itself* adds a perception of motion. Add `@media (prefers-reduced-motion) { .status-dot[style*="--dot-p"] { background: var(--color-progress); box-shadow: none; } }` alongside the canon `prefers-reduced-motion` block. |
| 42 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:80-83` | Playhead is a `w-0.5 bg-primary` div — invisible at high contrast if primary == background (it shouldn't, but consumers override). | Use `var(--easing-accent)` or token-bound playhead color. |

---

## 2. Glass-ui gaps surfaced by keyframes.js

Each row meets the ≥3 sites or ≥2 prospective consumers bar. "Sites" enumerates real call sites; "Need" is the load-bearing rationale.

### 2.1 Progress rail / generic mini-bar component

**Need.** Three+ places render a "filled rail" that is not a Slider thumb: timeline zoom indicator (`KeyframeTimeline.vue:36-46`), animation-progress conic dot has a horizontal cousin in the AssetViewport (`AssetViewport.vue:50` selection bar), and the MenuBar progress dot would degenerate to a rail when the dock is too narrow. Speedtest tranche-N's gradient `<Progress variant="gradient">` (DESIGN.md §Progress) covers the simple case — but consumers also want a *bidirectional/zoomable* rail with selectable subrange. Keyframes timeline zoom is the canonical demo.

**Sites.** `KeyframeTimeline.vue:36-46`, `AssetViewport.vue:50`, `AnimationVisualizer.vue:26-31`.

**Proposal.** Extend `<Progress>` with `variant="range"` that accepts `:start`/`:end` props and renders a sub-range rail. Or: ship a `.progress-rail` utility analogous to `.input-bar`.

### 2.2 Visualization track surface (`.viz-track` / `.viz-marker`)

**Need.** EasingTarget renders one track-line + four marker variants (start, end, ball-active, ball-muted), each with a `color-mix(in srgb, var(--color-progress) N%, transparent)` recipe. KeyframeTimeline does the same for its track + markers. AssetViewport shows similar handles. The pattern is "horizontal rail in the body of a glass surface, decorated with positional dots."

**Sites.** `EasingTarget.vue:336-407` (track-line + 4 markers), `KeyframeTimeline.vue:51-63` (timeline-track), `AssetViewport.vue:50-59` (selection markers + tooltip).

**Proposal.** Promote `.viz-track`, `.viz-marker`, `.viz-marker--start`, `.viz-marker--end`, `.viz-ball` utility set into `utilities.css`, parameterized via `--viz-color` (default `var(--easing-accent)`).

### 2.3 Progress-dot (StatusDot extension)

**Need.** The conic-gradient progress dot at `AnimationMenuBar.vue:255-264` is gorgeous: `--dot-p` 0..1 drives `--deg`, glow spread, and blur. This is `StatusDot` evolved into a circular progress glyph. Two prospective consumers: this menu, plus speedtest's stage/phase indicators that today use `<Pulse>` for indeterminate progress.

**Sites.** `AnimationMenuBar.vue:50-60` (per-animation progress in select item), `AnimationMenuBar.vue:255-264` (style block).

**Proposal.** `<StatusDot variant="progress" :model-value="0..1" :color="..." pulse>` rendering the conic-gradient + glow stack. Alternative: `<ProgressDot>` companion in `pulse/` package since `Pulse` already covers indeterminate.

### 2.4 `Button variant="transport"` / playback variant

**Need.** `.btn-playback` + `.btn-playback-accent` (`utils.css:48-81`) is a complete copy of buttonVariants four-state contract with an accent-color override. Two demos use it (PlaybackRibbon `Play/Pause` + `Reverse`). Cube demo uses inline `Button class="dock-play-btn ... rainbow-vivid"` for its play button. Speedtest uses `<Button variant="accent">` for retest.

**Sites.** `PlaybackRibbon.vue:25-50` (Play/Pause + Reverse buttons), `AnimationMenuBar.vue:91-104,127-136` (rainbow play button — collapsed + expanded), `utils.css:48-81` (CSS class).

**Proposal.** Add `transport` variant to `buttonVariants` keyed off `--accent-red` / `--easing-accent`, OR document the existing `accent` variant works once `--accent` is overridden (current `Button.accent` reads `--accent` which is the neutral cream-3 — not what playback needs). The gap is that `accent` should accept a `:color` slot or there should be a `vibrant` semantic alongside `accent`.

### 2.5 3D axis token group + `.preserve-3d` ergonomics

**Need.** `--axis-x: hsl(0 72% 54%)` / `--axis-y: hsl(120 47% 47%)` / `--axis-z: hsl(240 76% 58%)` / `--axis-w: var(--foreground)` (style.css:33-36). These mirror the standard 3D-tooling convention (red-X, green-Y, blue-Z). Used in MatrixEditor, CubeTarget axis lines, OrbitalDrag handle indicators (potential).

**Sites.** `style.css:33-36`, `CubeTarget.vue:200-209`, `MatrixEditor.vue:140-148`, plus implicit OrbitalDrag visualization. Speedtest doesn't use 3D, but the *next* glass-ui demo (Math-paper, per `manifest.ts`) absolutely does for surface plots / parametric curves.

**Proposal.** Add `--axis-{x,y,z,w}` to `tokens.css §6b` next to `--viz-fourier`/`--viz-chebyshev`. They're a third axis of the viz-basis (literally — they ARE axes). Coupled with `.preserve-3d` it gives consumers a coherent 3D-viz vocabulary.

### 2.6 Icon-feedback animation primitive

**Need.** `AnimationMenuBar.vue:211-247` builds reset-icon spin (rotateY 360° + scale 0.85→1) and trash-icon shake animations via `CSSKeyframesAnimation` directly. The two patterns ("twist" + "shake") are reusable across any "destructive action confirmed" UI. Glass-ui ships `shake` keyframe (`animations.css:117-134`) but no Vue-level binding.

**Sites.** `AnimationMenuBar.vue:74-90,231-247` (reset + trash), CopyButton (`CopyButton.vue` — reads as having a similar feedback animation per CLAUDE.md).

**Proposal.** Composable `useIconFeedback(iconRef, preset: "spin" | "shake" | "twist")` that wraps `CSSKeyframesAnimation` from keyframes.js. Now that keyframes.js IS a peer dep (via `useAnimatedNumber`), this is cheap to ship.

### 2.7 Tabs variants — `pill` + `underline`

**Need.** `tab-trigger-base` + `tab-trigger-pill` + `tab-trigger-underline` (`utils.css:7-46`) define active/inactive/hover for two tab visual languages. Used in: cube App tabs (underline), Asset playground tabs (pill), CubeScene matrix tab (underline), AnimationControls tabs (pill).

**Sites.** `cube/App.vue:106`, `playground/App.vue:8`, `CubeScene.vue:139`, `AnimationControls.vue:170` (`tabClasses = "tab-trigger-base tab-trigger-pill"`). Four sites in this consumer alone.

**Proposal.** `<TabsTrigger variant="pill" | "underline">` on `Tabs` package. Or expose as utility classes in `utilities.css`. The TopDock also uses `BouncyTabs`-style tabs (DESIGN.md §Component Catalog) — there's overlap. Audit `BouncyTabs` first.

### 2.8 `pane-swap-scale` transition

**Need.** `App.vue:393-410` `.scene-enter-active` and `.scene-leave-active` define an out-in scene swap with `scale(0.97)→scale(1.02)` accents instead of translate-X. Same shape as `pane-swap` (translate-X) but with scale, applied to scene-level transitions where horizontal slide doesn't read.

**Sites.** `App.vue:393-410` (cube↔easing↔playground), and prospective: any speedtest dashboard scene swap.

**Proposal.** Add `pane-swap-scale` to `transitions.css` (mirror `pane-swap` but transform = scale), or generalize `pane-swap` to a CSS variable controlling the axis (`--pane-swap-axis: scale | x | y`).

### 2.9 Rainbow gradient SVG def + `.rainbow-stroke` utility

**Need.** Inline SVG `<linearGradient id="rainbow-gradient">` referencing `--rainbow-{red,orange,...,violet}` (`AnimationControlsGroup.vue:171-182`), used as `stroke: url(#rainbow-gradient)` on a Lucide icon. The lib already has the rainbow tokens; the SVG plumbing is reusable.

**Sites.** `AnimationControlsGroup.vue:91,174-179` (Apply CSS Paintbrush). Prospective: Cube's "rainbow-vivid" / "rainbow-pastel" play button (uses the *background* via classes that aren't shipped — see line below).

**Sub-finding.** `rainbow-vivid` and `rainbow-pastel` classes are referenced (`AnimationMenuBar.vue:97,130`, `AnimationControlsGroup.vue:87`) but I find **no source definition** in either repo. They must come from `@apply` in tw-animate-css or a stray utility. **Verify and ship as canon `.rainbow-bg-{vivid,pastel}` utility** (Gap 2.9b).

**Proposal.** `<RainbowGradientDef />` SFC + `.rainbow-stroke` utility (`stroke: url(#rainbow-gradient)`). Pair with `.rainbow-bg-vivid` / `.rainbow-bg-pastel` (linear-gradient through the seven hues) — these clearly *exist* in consumer use and have *no* declared source.

### 2.10 `Toast variant="inverse"`

**Need.** `'bg-foreground text-background rounded-xl instrument-serif px-4 py-3 grid grid-cols-1 gap-1 shadow-lg'` (`AnimationControlsGroup.vue:191`). Inverted-glass toast — high-contrast, opposite-of-glass aesthetic. Useful for ephemeral confirmations that should pop above any glass surface.

**Sites.** `AnimationControlsGroup.vue:188-199` (single but global Toaster); pattern repeats anywhere a "command landed" confirmation is needed. Two prospective: "Copied" toast across consumers, "Saved" toast in editor shells.

**Proposal.** `<Toast variant="default" | "inverse" | "elevated">`.

### 2.11 KeyframeTimeline / TimelineMarker primitives

**Need.** The diamond keyframe marker (`rotate-45 rounded-sm border-2`), the percent caret below it, the playhead bar, and the tick-mark grid form a complete *timeline scrubber* family. Three custom components (`KeyframeTimeline.vue`, `TimelineCaret.vue`, `TimelineEngine`) plus the `useZoomPan` composable.

**Sites.** `KeyframeTimeline.vue:88-101` (marker), `KeyframeTimeline.vue:80-83` (playhead), `KeyframeTimeline.vue:65-77` (tick + label), `TimelineCaret.vue:7-28` (caret), `useZoomPan.ts` (zoom + pan). Math-paper / future scope-trace consumer would reuse all four.

**Proposal.** Add `timeline/` custom package: `<KeyframeTimeline>`, `<TimelineMarker variant="diamond" | "circle">`, `<TimelinePlayhead>`, `<TimelineRuler>` (tick + label). The `Slider variant="timeline"` already implies the surface — this turns it into a composable family.

### 2.12 `GlassDock` safe-area-inset for fixed iOS docks

**Need.** `AnimationMenuBar.vue:1-9` wraps its dock in:
```
class="px-2 py-1.5 pb-[max(calc(var(--dock-margin)/2),env(safe-area-inset-bottom))] m-0 fixed left-0 right-0 z-dock"
```
The `pb-[max(calc(...),env(safe-area-inset-bottom))]` is the iOS-PWA-bottom-bar gate; canon `<GlassDock position="fixed">` doesn't include it. Two consumers (this + speedtest) ship fixed-bottom docks on iOS.

**Sites.** `AnimationMenuBar.vue:3` (this), prospective speedtest mobile dock, prospective dashboard mobile dock.

**Proposal.** `GlassDock position="fixed"` should auto-apply safe-area padding. Or expose `--dock-safe-area-bottom: max(var(--dock-margin), env(safe-area-inset-bottom))` token.

### 2.13 `.collapse-x` / `<RevealOnHover>`

**Need.** HeaderRibbon's hover-reveal collapses items horizontally with `max-width: 0 ↔ var(--header-max-width); opacity: 0 ↔ 1` over `--duration-slow var(--ease-standard)`. Same shape inside `TopDock` collapse → expand width FLIP.

**Sites.** `HeaderRibbon.vue:122-152` (left+right variants), `useDockTransition` (canon — already does width FLIP), prospective sidebar mini-rail collapses.

**Proposal.** `.collapse-x` utility that accepts a `--collapse-x-width` custom property + transitions max-width/opacity. Or surface the existing `useDockTransition` axis machinery as a standalone `useCollapse({ axis: "x" })` composable (it's currently dock-internal).

---

## 3. Union candidates

These are patterns where both libraries already have *a* form, just not the same.

### 3.1 Rainbow pastel/vivid backgrounds

- Glass-ui: `--rainbow-{red,orange,yellow,green,blue,indigo,violet}` + `--rainbow-pastel-*` tokens (`tokens.css:421-436`).
- Keyframes.js: `.rainbow-vivid` / `.rainbow-pastel` classes used as button backgrounds (3 sites). Source not located in repo.
- Canonical: `.rainbow-bg-vivid` / `.rainbow-bg-pastel` shipped in `utilities.css`, paired with `--rainbow-gradient-{vivid,pastel}` aggregate gradient tokens. The `rainbow-vivid` is treated as a destination state (playing) and `rainbow-pastel` as a rest state — encode that semantics-pair in the API.

### 3.2 SmoothProgress wrapping / progress smoothing

- Glass-ui: `useAnimatedNumber` (`composables/motion/useAnimatedNumber.ts`) wraps `SmoothProgress` for hero numerics.
- Keyframes.js: raw `SmoothProgress` import + per-frame `play(onFrame)` in 4+ places (timeline scrub interpolation, EasingTarget rubber-band smoothing at line 197 with manual `lastV * 0.6 + instantV * 0.4`).
- Canonical: `useAnimatedNumber` is the wrapping. The consumer's hand-rolled EMA (`AnimationVisualizer.vue:121`, `OrbitalDrag.vue:148`) duplicates `SmoothProgress` math. Document `useAnimatedNumber({ mode: "absolute", damping: 0.6 })` as the canonical EMA replacement.

### 3.3 `.preserve-3d` + `--axis-*`

- Glass-ui: `.preserve-3d { transform-style: preserve-3d }` (`utilities.css:90-92`). No axis colors.
- Keyframes.js: Both — `.preserve-3d` used at three sites in CubeTarget; axis colors duplicate the standard 3D convention.
- Canonical: keep `.preserve-3d`; add `--axis-{x,y,z,w}` tokens (Gap 2.5).

### 3.4 KBD / keyboard-shortcut visualization

- Glass-ui: `.kbd` utility (`utilities.css:134-148`) + `useKeyboardShortcuts` registry + `formatComboParts`.
- Keyframes.js: `KeyboardShortcutsModal.vue` consumes `useRegisteredShortcuts()` + `formatComboParts()` from glass-ui correctly. **Reference implementation.**
- Canonical: glass-ui should ship `<KeyboardShortcutsModal>` (or `<ShortcutsHelp>`) as a public component since the consumer-side modal is ~70 lines and pure orchestration. Speedtest also has one. Promote.

### 3.5 Per-character stagger / `char-stagger`

- Glass-ui: `.char-stagger > .char` (`typography.css:299-304`) animates `fade-in` with `--char-index` delay.
- Keyframes.js: `AnimatedText.vue` builds per-char dot fade with `animation-delay: ${i * 100}ms` directly. (Line 85 references `dotFade v-bind("duration")`.)
- Canonical: `.char-stagger` covers it — the consumer should switch.

---

## 4. Design-language signal toward the new axes

The brief calls out: cream, colorful flourishes, mathematical, modern skeuomorphic shadowing, bold/audacious large type, large/audacious iconography, motion. Keyframes.js is mostly silent on cream and skeuomorphic shadowing; it is *the* reference for motion and mathematical and very loud on bold iconography.

### Cream

Not evidenced. The consumer overrides background via `color-scheme: light/dark` and uses neutrals through glass-ui defaults. No cream-specific tokens. Skip — speedtest and dashboard are better lanes for cream signal.

### Colorful flourishes

- **Rainbow play-button cycling.** `AnimationMenuBar.vue:97,130`: play button toggles between `rainbow-vivid` (playing) and `rainbow-pastel` (paused) — same button, different gradient. Communicates state via *color saturation*. **Reinvented** (those classes have no canonical source). Library primitive: `<Button>` `vibrant`/`muted` color modifiers, OR `.rainbow-bg-{vivid,pastel}` utility (Gap 2.9b).
- **Rainbow icon stroke.** `AnimationControlsGroup.vue:91` Paintbrush icon strokes through `url(#rainbow-gradient)` as a "permanent flourish" mode marker. Reinvented (inline SVG def). Library primitive: `<RainbowGradientDef>` SFC + `.rainbow-stroke` utility (Gap 2.9).
- **Conic gradient progress dot.** `AnimationMenuBar.vue:259-264` blends `var(--color-progress)` with a 15%-mix transparent in a conic gradient + matching glow. Hardcoded to `--color-progress` (consumer token). Library primitive: `<StatusDot variant="progress">` (Gap 2.3).
- **Gold shimmer on label.** `AnimationControlsControls.vue:69` — `class="gold-shimmer"` on the easing label when current curve is a "detail" function. Uses canonical `.gold-shimmer` utility. **Reference implementation.**

### Mathematical

This is the consumer's *strongest* axis. Glass-ui must absorb most of these patterns or watch math-paper rebuild them.

- **EasingCurveCanvas** (`EasingCurveCanvas.vue:264-342`). Full bezier-curve editor with draggable handles, axis labels (mono `--font-mono`), gridlines (4 verticals, 4 horizontals at 0.25 spacing), traveling progress dot, viewBox auto-clamp for overshoot easings (`MAX_OVERSHOOT = 0.6`). Reinvented top-to-bottom. Library primitive: `<BezierCurveCanvas>` in a `math-paper/` package — three known consumers (this, the demo storybook's "Easing" story, and an inevitable speedtest jitter visualization). Tokens to surface: `--curve-stroke-width: 0.04` (SVG units), `--curve-handle-radius: 0.04`, `--curve-handle-hover-radius: 0.055`, `--curve-grid-stroke: 0.008`. Or expose just the SVG primitive + handle interaction composable (`useBezierEditor`).
- **Generated curve SVG paths.** `timingCurveUtils.ts:1-54` — `generateCurveSVGPath(fn, n=32)` samples a 1D function into a polyline path string; `generateStepSVGPath(n)` builds explicit staircase path for steps timing. Both are pure utilities. Three consumers: this consumer (twice — main canvas + EasingSelect mini-curves), the math-paper demo, and any future spectral visualizer.
- **Named-easing → bezier mapping.** `animationDescriptions.ts:53-84` — `NAMED_EASING_BEZIER: Record<string, [n,n,n,n]>` for 27 named functions. This is reference data, not glass-ui's domain — but glass-ui *does* expose `--ease-{out-expo,apple,apple-spring}` cubic-beziers (`tokens.css:69-85`). The consumer's table is broader. **Library primitive:** ship the table (read-only) under `@mkbabb/glass-ui/tokens` next to `chartHeights` (`tokens.ts`) so non-keyframes consumers can render preview curves.
- **Easing curve groups (taxonomy).** `easingGroups.ts:28-107` — 10 families × 3-7 curves each. Reusable as a sidebar/select dataset. Library primitive: alongside the bezier table.
- **Matrix editor.** `MatrixEditor.vue` — 4×4 grid editor for `matrix3d`. Niche but reference quality. Likely stays consumer-side.
- **Step function rendering.** Different chart shape for `steps` timing (staircase vs smooth curve). Library primitive: `<StepCurveCanvas>` companion to bezier.
- **Math typography.** Computer Modern serif body (canonical `--font-serif`) + italic for math tokens — already in glass-ui (`.text-math`, `.text-math-body` at `typography.css:202-212`). Consumer doesn't use these utilities; opportunity to retrofit.

### Modern skeuomorphic with shadowing

- **Cartoon offset shadow on Card.** Consumer uses `glass-card` (`Card variant="default"` shorthand), inheriting cartoon offset shadow from `tokens.css:223-224`. Canonical use, no drift. Reference implementation.
- **Conic-gradient progress dot with radial glow.** `AnimationMenuBar.vue:255-264`. Glow is a soft radial shadow; the dot itself is flat. This is mild skeuomorphism — "lit indicator". Library primitive: see Gap 2.3.
- **Track marker shadow.** `EasingTarget.vue:362,378` — `box-shadow: 0 2px 10px color-mix(...progress 35%, transparent)` on active ball, scaled-up `0 4px 20px ...40%` on singular ball. Soft drop shadow with color-tinted alpha. **Reinvented** (token-less). Library primitive: `--shadow-glow-sm/md/lg` family parameterized by `--shadow-glow-color`. Three sites in this consumer.

### Bold / audacious / large typography

- **Display Title in toast.** `AnimationControlsGroup.vue:191` — toast sets `font-bold text-base` for title. Modest. The consumer's overall type voice is *intentionally restrained* — mono labels + small serif body + tiny `text-2xs` percentages.
- **Pane title in scenes.** `EditorStartScreen` (per CLAUDE.md ref) likely uses `text-pane-title` (`typography.css:269-283`) which already exists. Need to confirm.
- The consumer does NOT push large-type signals — this lane is weak here. Speedtest and dashboard are stronger bold-type sources.

### Large / audacious iconography

This is the consumer's second-strongest axis.

- **Bold play / pause icons.** `AnimationMenuBar.vue:101-103` and `:134-135` — `<Pause class="icon-lg" />` / `<Play class="icon-lg pl-0.5" />` on a `w-10 h-10 rounded-full` button. The `pl-0.5` offset corrects the optical-centering of the play triangle. **Idiomatic.** Glass-ui canon: `--icon-lg: 1.25rem` on a 2.5rem button — yes, that's the existing geometry. Library primitive: `<DockIconButton variant="play" \| "pause">` would absorb the optical offset. Or a `<PlayPauseButton>` component since the pair is so universal.
- **Reset / trash with feedback.** `AnimationMenuBar.vue:74-89` — RotateCcw + Trash icons get full `icon-lg` size and animation feedback on click (Gap 2.6). Reference implementation.
- **Scene icons (asset PNG/SVG).** `TopDock.vue:19-23,170-191` — scene selector inline-renders `cube-icon-sm.png`, `amiga-icon-sm.png`, `square-icon-sm.png`, `easing-icon-sm.svg` at `w-5 h-5`. Library primitive: nothing needed here — `<DockSelectTrigger>` already accepts arbitrary children. Reference for "icon + label" dock selectors.
- **Lucide everywhere.** ChevronDown, ChevronRight, ChevronUp, Home, Layers, RotateCcw, Trash, Copy, Sparkles, Paintbrush, Camera, Download, Upload, FilePlus2, Pause, Play, ArrowLeftRight, Lock, LockOpen, Pencil, ArrowLeft, Activity, Braces, Clock, Grid3X3, SlidersHorizontal, PanelLeftClose/Open, X, Maximize2, Minimize2, Loader2 — 30+ Lucide icons. All sized via `icon-{xs,sm,md,lg,xl}` utilities. **Reference implementation** for the canonical icon-token usage.
- **Stacked rainbow play button.** `AnimationMenuBar.vue:91-104` is large (`w-10 h-10`), pill-rounded, gradient-filled, white icon. This is *the* "audacious play button" pattern. Library primitive: see Gap 2.4.
- **Conic-gradient dot (effective icon).** `AnimationMenuBar.vue:255` — at 2.5rem (`w-2.5 h-2.5`) the conic dot is a tiny dot. But the same pattern at `w-6 h-6` becomes a "ring loader" / "scrub indicator". Promote (Gap 2.3) and let consumers pick size.

### Motion (the headline axis for this lane)

The consumer's motion vocabulary is **richer than glass-ui's published tokens** in three places:

1. **Easing-name vocabulary** — 30+ named easings (TIMING_DESCRIPTIONS at `animationDescriptions.ts:15-51`) vs glass-ui's ~10 (smooth/snappy/bouncy/gentle springs + standard/out/in/out-expo/apple/apple-spring beziers). Glass-ui's curated set is *intentionally* small, but it should publish the consumer's expansion table as runtime data so storybook stories can build "all easings" galleries without rebuilding the table.

2. **Step function as first-class easing.** `step-start`, `step-end`, `steps(n, jump-{start,end,none,both})` — discrete-time curves. Glass-ui has zero step utilities. The four `jump-*` modes affect frame quantization. **Library primitive:** `--ease-step-start`, `--ease-step-end` tokens (one-step trivial cases) + a `<StepEasing>` component for n>1.

3. **Bezier visualization.** As above (Mathematical). The consumer's `EasingCurveCanvas` *is* the missing primitive.

4. **Motion-driven UI state machines.** `useTouchGate` + `useDragCapture` (consumer composable) + `useRafLoop` (consumer composable, near-duplicate of glass-ui patterns). `useRafLoop` (`useRafLoop.ts:1-62`) is a generic guard-driven rAF loop primitive — should be public glass-ui (`@mkbabb/glass-ui/composables`). Two consumer sites internally + every speedtest live-progress refresh + every dashboard heartbeat would use it.

5. **Spring tokens are stable** (`tokens.css §2`). The consumer uses `--spring-snappy` once (line 498 of AnimationControlsGroup) and `--spring-smooth`/`--spring-bouncy`/`--spring-gentle` zero times — instead leaning on the cubic-beziers via `--ease-spring`/`--ease-decelerate`/`--ease-accelerate` aliases at `tokens.css:86-88`. That lane works. Don't churn springs.

6. **Reduced motion.** Consumer disables `.idle-bob` and decorative animations correctly via `prefers-reduced-motion` (in glass-ui's `utilities.css:319-329` global rule). Reference implementation.

7. **Crucial absence on glass-ui side.** No public *easing curve preview* component. Storybook's Motion category exists per `manifest.ts` but renders curves how? — likely via consumer-style hand-rolled SVG. The bezier canvas + step canvas + named-easing select + duration slider is a **complete motion-vocabulary explorer** — promote it.

---

## 5. Risk register

These should remain consumer presets, NOT promote to glass-ui.

1. **`instrument-serif` font family.** It's a brand identity. Glass-ui's `--font-display` / `--font-serif` tokens already let consumers swap. Don't ship `instrument-serif` as a class.
2. **`btn-playback-accent` red color (`--accent-red`).** Domain-specific — destructive playback for keyframes. Glass-ui's `destructive` variant covers half of this; the rest is consumer brand.
3. **`--ppmycota-primary` and ppmycota mode toggles.** Brand cosmetic; stay consumer-side.
4. **`--axis-x/y/z/w` colors (red/green/blue/foreground).** I argued for promoting these (Gap 2.5), but they encode a *3D-math convention*. If glass-ui ships them, document that they're standard 3D-tooling axis colors, not arbitrary brand. If that's a stretch, leave consumer-side.
5. **Matrix editor.** `MatrixEditor.vue` — narrow domain.
6. **Orbital-drag pinch/inertia/quaternion.** Three composables (`useOrbitalInertia`, `useOrbitalPointer`, `useOrbitalPinch`). Niche; don't promote.
7. **Monaco-based CSS editor.** `CSSCodeEditor.vue` — heavy dep, niche. Stay consumer-side.
8. **Animation-store layer (`stores/`).** localStorage-keyed persistence for animation options, hash-sharing, scene playback. Domain-specific.
9. **scene routing (`useSceneRouter`, `useSceneUrl`).** Demo-app-specific.
10. **html2canvas-based keyframe previews.** `KeyframeTimeline.vue:282-296` — heavy dep; niche.
11. **Step easing parameterization (jump-*).** Real motion semantics, but at a level of detail glass-ui's curated motion vocabulary deliberately avoids. Maybe surface as runtime data only (read-only constants), not as `--ease-*` tokens.
12. **`useTransformState` (cube matrix sliders).** Bound to MatrixEditor — niche.

---

## 6. Tally

Drift findings: 42 · Glass-ui gaps: 13 · Union candidates: 5 · Design-language axes signaled: 5 of 7 (motion + mathematical + iconography strong; colorful flourishes medium; cream + skeuomorphic + bold-type weak).
